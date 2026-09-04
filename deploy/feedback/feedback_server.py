#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
feedback_server.py · 标准术语「反馈收集服务」（零第三方依赖，纯 Python 标准库）

路由：
  POST /feedback/            接收前端反馈（JSON：page/title/desc/contact/shot）
  GET  /feedback/files/<name> 查看历史截图（兼容旧数据，新反馈不再存盘）
  GET  /feedback/stats       读取访问计数（total / today，只读）
  POST /feedback/stats/ping  记一次访问（会话去重由前端负责，服务端限频兜底）

行为：
  1. 截图 base64 解码后直接内嵌到邮件（CID inline），不写磁盘
  2. 追加一条文本记录到 storage_dir/records.jsonl（不含图片）
  3. 通过 SMTP 发送 HTML 邮件，正文含页面 / 描述 / 联系方式 + 内联截图
  4. 防护：单 IP 限频、请求体大小上限、描述长度上限、截图 base64 上限

配置：同目录 feedback_config.json（模板见 feedback_config.example.json）
用法：python3 feedback_server.py [端口]   # 默认 8899，仅监听 127.0.0.1
"""
import base64
import html
import json
import os
import re
import ssl
import smtplib
import sys
import threading
import time
import uuid
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote, urlparse

BASE = os.path.dirname(os.path.abspath(__file__))
CONFIG_FILE = os.path.join(BASE, 'feedback_config.json')

DEFAULT_CONFIG = {
    "smtp_host": "smtp.qq.com",
    "smtp_port": 465,
    "sender": "",          # 发信邮箱（QQ 邮箱）
    "auth_code": "",       # SMTP 授权码（非登录密码）
    "to": "",              # 收信邮箱（可多个，逗号分隔）
    "storage_dir": os.path.join(BASE, 'feedback_data'),  # 仅存 records.jsonl
    "base_url": "http://127.0.0.1:8899",  # 兼容旧截图链接
    "max_body": 6 * 1024 * 1024,    # 单请求体上限（字节）
    "max_shot": 3 * 1024 * 1024,    # 单张截图 base64 上限（字节）—— 内嵌邮件不宜过大
    "per_ip_limit": 5,              # 单 IP 时间窗内最多提交次数
    "per_ip_window": 3600,          # 限频时间窗（秒）
    "stats_init_total": 2459,       # 访问计数初始值（stats.json 不存在时播种）
}


def load_config():
    cfg = dict(DEFAULT_CONFIG)
    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
                cfg.update(json.load(f))
            print('已加载配置:', CONFIG_FILE)
        except Exception as e:
            print('配置读取失败（使用默认）:', e)
    cfg['storage_dir'] = os.path.abspath(cfg['storage_dir'])
    os.makedirs(cfg['storage_dir'], exist_ok=True)
    return cfg


CFG = load_config()

_IP_HITS = {}


def throttled(ip):
    now = time.time()
    hits = [t for t in _IP_HITS.get(ip, []) if now - t < CFG['per_ip_window']]
    if len(hits) >= CFG['per_ip_limit']:
        return True
    hits.append(now)
    _IP_HITS[ip] = hits
    return False


# ---------------- 访问计数（自托管，存储 storage_dir/stats.json） ----------------

STATS_LOCK = threading.Lock()
STATS_FILE = os.path.join(CFG['storage_dir'], 'stats.json')
_PING_HITS = {}


def _today():
    return time.strftime('%Y-%m-%d')


def load_stats():
    """读取计数；文件不存在则按初始值播种；跨天自动归零今日值。"""
    data = {'total': int(CFG['stats_init_total']), 'date': _today(), 'today': 0}
    try:
        with open(STATS_FILE, 'r', encoding='utf-8') as f:
            data.update(json.load(f))
    except Exception:
        pass
    if data.get('date') != _today():
        data['date'] = _today()
        data['today'] = 0
    return data


def save_stats(data):
    tmp = STATS_FILE + '.tmp'
    with open(tmp, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False)
    os.replace(tmp, STATS_FILE)


def stats_snapshot(ping=False):
    """返回当前计数快照；ping=True 时总访问与今日访问各 +1（带锁，防并发丢计数）。"""
    with STATS_LOCK:
        data = load_stats()
        if ping:
            data['total'] = int(data.get('total', CFG['stats_init_total'])) + 1
            data['today'] = int(data.get('today', 0)) + 1
            save_stats(data)
        return {
            'ok': True,
            'total': int(data.get('total', CFG['stats_init_total'])),
            'today': int(data.get('today', 0)),
            'date': data.get('date', _today()),
        }


def ping_throttled(ip):
    """ping 独立限频：10 秒窗口内超过 2 次只读不自增（防脚本刷数，正常访客无感）。"""
    now = time.time()
    hits = [t for t in _PING_HITS.get(ip, []) if now - t < 10]
    _PING_HITS[ip] = hits + [now]
    return len(hits) >= 2


def build_html(page, title, desc, contact, has_shot):
    """生成 HTML 邮件正文，用户输入均转义防注入。"""
    rows = []
    rows.append('<p><b>页面：</b>%s</p>' % html.escape(page or '(未知)'))
    if title:
        rows.append('<p><b>页面标题：</b>%s</p>' % html.escape(title))
    rows.append('<p><b>问题描述：</b></p>')
    rows.append('<div style="background:#f7f5f0;padding:12px 16px;border-radius:8px;'
                'border-left:3px solid #0e6b5b;white-space:pre-wrap;word-break:break-all;">%s</div>'
                % html.escape(desc))
    if contact:
        rows.append('<p><b>联系方式：</b>%s</p>' % html.escape(contact))
    if has_shot:
        cid = uuid.uuid4().hex
        rows.append('<p><b>截图：</b></p>')
        rows.append('<img src="cid:%s" alt="screenshot" style="max-width:100%%;'
                    'border-radius:8px;border:1px solid #e2dccd;">' % cid)
    else:
        cid = None
    body = '''<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
color:#2d2a24;line-height:1.7;max-width:680px;margin:0 auto;padding:20px;">
<h2 style="color:#0e6b5b;margin-top:0;">标准术语 · 用户反馈</h2>
%s
<hr style="border:none;border-top:1px solid #e2dccd;margin:24px 0;">
<p style="color:#999;font-size:12px;">来自 standard-term 反馈系统 · %s</p>
</body></html>''' % (''.join(rows), time.strftime('%Y-%m-%d %H:%M:%S'))
    return body, cid


def send_mail(subject, page, title, desc, contact, shot_bytes=None, shot_ext='jpg'):
    """发送 HTML 邮件，截图以 CID 内联方式嵌入（不落盘）。"""
    cfg = CFG
    if not (cfg['sender'] and cfg['auth_code'] and cfg['to']):
        return False, 'SMTP 未配置（feedback_config.json）'

    html_body, cid = build_html(page, title, desc, contact, shot_bytes is not None)

    msg = MIMEMultipart('related')
    msg['From'] = cfg['sender']
    msg['To'] = cfg['to']
    msg['Subject'] = subject
    msg.attach(MIMEText(html_body, 'html', 'utf-8'))

    if shot_bytes and cid:
        img = MIMEImage(shot_bytes, _subtype=shot_ext)
        img.add_header('Content-ID', '<%s>' % cid)
        img.add_header('Content-Disposition', 'inline', filename='screenshot.%s' % shot_ext)
        msg.attach(img)

    ctx = ssl.create_default_context()
    try:
        with smtplib.SMTP_SSL(cfg['smtp_host'], int(cfg['smtp_port']), timeout=25, context=ctx) as s:
            s.login(cfg['sender'], cfg['auth_code'])
            s.send_message(msg)
        return True, 'ok'
    except Exception as e:
        return False, str(e)


class Handler(BaseHTTPRequestHandler):
    protocol_version = 'HTTP/1.1'

    def log_message(self, *args):  # 静默访问日志
        pass

    def _cors(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def _send_json(self, code, obj):
        data = json.dumps(obj, ensure_ascii=False).encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(data)))
        self._cors()
        self.end_headers()
        self.wfile.write(data)

    def _serve_file(self, name):
        """兼容旧截图文件（新反馈不再存盘，仅历史数据可能存在）。"""
        name = os.path.basename(unquote(name))
        if not re.fullmatch(r'fd_[0-9a-f]{16}\.(jpg|png)', name):
            return self._send_json(404, {'ok': False, 'error': 'not found'})
        fp = os.path.join(CFG['storage_dir'], name)
        if not os.path.isfile(fp):
            return self._send_json(404, {'ok': False, 'error': 'not found'})
        with open(fp, 'rb') as f:
            data = f.read()
        self.send_response(200)
        self.send_header('Content-Type', 'image/jpeg' if name.endswith('.jpg') else 'image/png')
        self.send_header('Content-Length', str(len(data)))
        self._cors()
        self.end_headers()
        self.wfile.write(data)

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_GET(self):
        u = urlparse(self.path)
        if u.path.startswith('/feedback/files/'):
            self._serve_file(u.path[len('/feedback/files/'):])
            return
        if u.path.rstrip('/') == '/feedback/stats':
            return self._send_json(200, stats_snapshot(ping=False))
        self._send_json(404, {'ok': False, 'error': 'not found'})

    def do_POST(self):
        u = urlparse(self.path)
        if u.path.rstrip('/') == '/feedback/stats/ping':
            ip = self.client_address[0]
            return self._send_json(200, stats_snapshot(ping=not ping_throttled(ip)))

        ip = self.client_address[0]
        if throttled(ip):
            return self._send_json(429, {'ok': False, 'error': '提交太频繁，请稍后再试'})

        if u.path.rstrip('/') != '/feedback':
            return self._send_json(404, {'ok': False, 'error': 'not found'})

        length = int(self.headers.get('Content-Length', 0))
        if length <= 0 or length > CFG['max_body']:
            return self._send_json(413, {'ok': False, 'error': '请求过大'})

        try:
            body = json.loads(self.rfile.read(length).decode('utf-8'))
        except Exception:
            return self._send_json(400, {'ok': False, 'error': '无效的请求数据'})

        page = str(body.get('page', '')).strip()[:200]
        title = str(body.get('title', '')).strip()[:200]
        desc = str(body.get('desc', '')).strip()
        contact = str(body.get('contact', '')).strip()[:120]
        shot = str(body.get('shot', '') or '')

        if not desc:
            return self._send_json(400, {'ok': False, 'error': '缺少问题描述'})
        if len(desc) > 2000:
            return self._send_json(400, {'ok': False, 'error': '描述过长'})

        # 截图解码到内存（不写磁盘），超限则不带截图
        shot_bytes = None
        shot_ext = 'jpg'
        if shot and len(shot) <= CFG['max_shot']:
            m = re.match(r'^data:image/(jpeg|png);base64,(.+)$', shot, re.S)
            if m:
                try:
                    shot_bytes = base64.b64decode(m.group(2))
                    shot_ext = 'jpg' if m.group(1) == 'jpeg' else 'png'
                except Exception:
                    shot_bytes = None

        # 落盘文本记录（不含图片）
        os.makedirs(CFG['storage_dir'], exist_ok=True)
        rec = {
            'ts': time.strftime('%Y-%m-%d %H:%M:%S'),
            'ip': ip, 'page': page, 'title': title,
            'desc': desc, 'contact': contact, 'has_shot': shot_bytes is not None,
        }
        with open(os.path.join(CFG['storage_dir'], 'records.jsonl'), 'a', encoding='utf-8') as f:
            f.write(json.dumps(rec, ensure_ascii=False) + '\n')

        # 发邮件（截图内联）
        subject = ('[标准术语反馈] ' + (page or '未知页面'))[:100]
        ok, err = send_mail(subject, page, title, desc, contact, shot_bytes, shot_ext)

        print('[feedback] %s %s page=%s shot=%sKB mail=%s' % (
            rec['ts'], ip, page,
            ('%d' % (len(shot_bytes) // 1024)) if shot_bytes else 'none',
            'ok' if ok else 'fail'))
        return self._send_json(200, {
            'ok': ok,
            'shot_inline': shot_bytes is not None,
            'mail': 'ok' if ok else ('fail:' + err),
        })


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8899
    try:
        sys.stdout.reconfigure(errors='replace')  # 控制台编码打不出字符时降级，不让日志崩掉服务
    except Exception:
        pass
    srv = ThreadingHTTPServer(('127.0.0.1', port), Handler)
    print('feedback server → http://127.0.0.1:%d/feedback/' % port)
    print('storage     → %s (仅 records.jsonl，截图内联邮件不落盘)' % CFG['storage_dir'])
    print('stats       → %s (初始总访问 %s)' % (STATS_FILE, CFG['stats_init_total']))
    print('smtp        → %s:%s to=%s' % (CFG['smtp_host'], CFG['smtp_port'], CFG['to'] or '(未配置)'))
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == '__main__':
    main()
