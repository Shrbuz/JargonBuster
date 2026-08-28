#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
feedback_server.py · 标准术语「反馈收集服务」（零第三方依赖，纯 Python 标准库）

路由：
  POST /feedback/            接收前端反馈（JSON：page/title/desc/contact/shot）
  GET  /feedback/files/<name> 查看已保存的截图（email 里的链接会指向这里）

行为：
  1. 校验并保存截图（JPEG/PNG）到 storage_dir，文件名随机
  2. 追加一条记录到 storage_dir/records.jsonl
  3. 通过 SMTP（QQ 邮箱等）发送通知邮件，正文含页面 / 描述 / 联系方式 / 截图链接
  4. 防护：单 IP 限频、请求体大小上限、描述长度上限、总存储配额、旧文件自动清理

配置：同目录 feedback_config.json（模板见 feedback_config.example.json）
用法：python3 feedback_server.py [端口]   # 默认 8899，仅监听 127.0.0.1
"""
import base64
import json
import os
import random
import re
import ssl
import smtplib
import string
import sys
import time
from email.message import EmailMessage
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
    "storage_dir": os.path.join(BASE, 'feedback_data'),  # 截图与记录存放目录
    "base_url": "http://127.0.0.1:8899",  # 生成截图链接用的域名前缀
    "max_body": 6 * 1024 * 1024,    # 单请求体上限（字节）
    "max_shot": 2 * 1024 * 1024,    # 单张截图 base64 上限（字节）——视口截图较小，2MB 足够
    "per_ip_limit": 5,              # 单 IP 时间窗内最多提交次数
    "per_ip_window": 3600,          # 限频时间窗（秒）
    "max_storage_mb": 200,           # 截图总存储配额（MB），超过则删除最旧的文件
    "shot_ttl_days": 30,             # 截图保留天数，超过自动删除
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
_LAST_CLEANUP = 0  # 上次清理时间戳，避免每次提交都扫目录


def throttled(ip):
    now = time.time()
    hits = [t for t in _IP_HITS.get(ip, []) if now - t < CFG['per_ip_window']]
    if len(hits) >= CFG['per_ip_limit']:
        return True
    hits.append(now)
    _IP_HITS[ip] = hits
    return False


def rand_name():
    return 'fd_' + ''.join(random.choice(string.hexdigits.lower()) for _ in range(16))


def cleanup_storage():
    """清理过期截图 + 总存储超配额时删最旧的文件。每 10 分钟最多跑一次。"""
    global _LAST_CLEANUP
    now = time.time()
    if now - _LAST_CLEANUP < 600:  # 10 分钟内不重复清理
        return
    _LAST_CLEANUP = now

    storage = CFG['storage_dir']
    if not os.path.isdir(storage):
        return

    # 收集所有截图文件（不含 records.jsonl）
    files = []
    for name in os.listdir(storage):
        if re.fullmatch(r'fd_[0-9a-f]{16}\.(jpg|png)', name):
            fp = os.path.join(storage, name)
            try:
                st = os.stat(fp)
                files.append((fp, st.st_mtime, st.st_size))
            except OSError:
                pass

    # 1) 删超过 TTL 的旧文件
    ttl = CFG['shot_ttl_days'] * 86400
    deleted = 0
    for fp, mtime, _ in files:
        if now - mtime > ttl:
            try:
                os.remove(fp)
                deleted += 1
            except OSError:
                pass
    if deleted:
        print('[cleanup] 已删除 %d 个超过 %d 天的截图' % (deleted, CFG['shot_ttl_days']))

    # 2) 总存储超配额时，按修改时间从旧到新删，直到低于配额的 80%
    quota = CFG['max_storage_mb'] * 1024 * 1024
    # 重新统计剩余文件
    remaining = []
    total = 0
    for name in os.listdir(storage):
        if re.fullmatch(r'fd_[0-9a-f]{16}\.(jpg|png)', name):
            fp = os.path.join(storage, name)
            try:
                st = os.stat(fp)
                remaining.append((fp, st.st_mtime, st.st_size))
                total += st.st_size
            except OSError:
                pass

    if total > quota:
        remaining.sort(key=lambda x: x[1])  # 最旧的在前
        target = quota * 0.8  # 降到配额的 80% 以下
        freed = 0
        for fp, _, size in remaining:
            if total - freed <= target:
                break
            try:
                os.remove(fp)
                freed += size
            except OSError:
                pass
        if freed:
            print('[cleanup] 存储超配额(%.1fMB > %dMB)，已删除最旧截图释放 %.1fMB' % (
                total / 1048576, CFG['max_storage_mb'], freed / 1048576))


def send_mail(subject, text):
    cfg = CFG
    if not (cfg['sender'] and cfg['auth_code'] and cfg['to']):
        return False, 'SMTP 未配置（feedback_config.json）'
    msg = EmailMessage()
    msg['From'] = cfg['sender']
    msg['To'] = cfg['to']
    msg['Subject'] = subject
    msg.set_content(text)
    ctx = ssl.create_default_context()
    try:
        with smtplib.SMTP_SSL(cfg['smtp_host'], int(cfg['smtp_port']), timeout=20, context=ctx) as s:
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
        self._send_json(404, {'ok': False, 'error': 'not found'})

    def do_POST(self):
        ip = self.client_address[0]
        if throttled(ip):
            return self._send_json(429, {'ok': False, 'error': '提交太频繁，请稍后再试'})

        u = urlparse(self.path)
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

        # 确保存储目录存在（运行期间被清理后也能自动重建，避免写记录崩溃）
        os.makedirs(CFG['storage_dir'], exist_ok=True)

        # 保存截图前先触发清理（过期删除 + 配额控制），每 10 分钟最多实际执行一次
        cleanup_storage()

        # 保存截图
        shot_file = None
        shot_url = ''
        if shot and len(shot) <= CFG['max_shot']:
            m = re.match(r'^data:image/(jpeg|png);base64,(.+)$', shot, re.S)
            if m:
                try:
                    raw = base64.b64decode(m.group(2))
                    ext = 'jpg' if m.group(1) == 'jpeg' else 'png'
                    shot_file = rand_name() + '.' + ext
                    with open(os.path.join(CFG['storage_dir'], shot_file), 'wb') as f:
                        f.write(raw)
                    shot_url = CFG['base_url'].rstrip('/') + '/feedback/files/' + shot_file
                except Exception:
                    shot_file = None

        # 落盘记录
        rec = {
            'ts': time.strftime('%Y-%m-%d %H:%M:%S'),
            'ip': ip, 'page': page, 'title': title,
            'desc': desc, 'contact': contact, 'shot': shot_file,
        }
        with open(os.path.join(CFG['storage_dir'], 'records.jsonl'), 'a', encoding='utf-8') as f:
            f.write(json.dumps(rec, ensure_ascii=False) + '\n')

        # 发邮件
        subject = ('[标准术语反馈] ' + (page or '未知页面'))[:100]
        lines = ['页面: ' + (page or '(未知)')]
        if title:
            lines.append('页面标题: ' + title)
        lines.append('')
        lines.append('问题描述:')
        lines.append(desc)
        if contact:
            lines.append('')
            lines.append('联系方式: ' + contact)
        if shot_url:
            lines.append('')
            lines.append('截图: ' + shot_url)
        ok, err = send_mail(subject, '\n'.join(lines))

        print('[feedback] %s %s page=%s ok=%s' % (rec['ts'], ip, page, ok))
        return self._send_json(200, {
            'ok': ok,
            'saved': bool(shot_file),
            'shot': shot_url or None,
            'mail': 'ok' if ok else ('fail:' + err),
        })


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8899
    srv = ThreadingHTTPServer(('127.0.0.1', port), Handler)
    print('feedback server → http://127.0.0.1:%d/feedback/' % port)
    print('storage     → %s' % CFG['storage_dir'])
    print('quota       → %dMB total, %d days TTL' % (CFG['max_storage_mb'], CFG['shot_ttl_days']))
    print('smtp        → %s:%s to=%s' % (CFG['smtp_host'], CFG['smtp_port'], CFG['to'] or '(未配置)'))
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == '__main__':
    main()
