#!/www/server/panel/pyenv/bin/python3
# coding: utf-8
"""通过宝塔 panelSite.AddSite 注册 st.ewri.site 纯静态站点（修复 btcli 传参 bug 后的正确调用）"""
import sys
import os
import json

BT_PANEL = '/www/server/panel'
BT_CLASS = '/www/server/panel/class'
for p in (BT_PANEL, BT_CLASS):
    if p not in sys.path and os.path.isdir(p):
        sys.path.insert(0, p)

import public
import panelSite

def main():
    domain = 'st.ewri.site'
    path = '/www/wwwroot/st.ewri.site'
    ps = '标准术语 StandardTerm 技术术语学习手册'

    # 幂等：已存在则退出
    exists = public.M('sites').where("name=?", (domain,)).count()
    if exists:
        print('ALREADY_EXISTS: {}'.format(domain))
        return 0

    get = public.dict_obj()
    get.webname = json.dumps({
        'domain': domain,
        'domainlist': [domain],
        'count': 1
    })
    get.path = path
    get.type_id = 0
    get.type = 'PHP'
    get.version = '00'          # 00 = 纯静态
    get.port = '80'
    get.ps = ps
    get.ftp = 'false'
    get.ftp_username = ''
    get.ftp_password = ''
    get.sql = 'false'
    get.codeing = 'utf8mb4'
    get.datauser = ''
    get.datapassword = ''

    obj = panelSite.panelSite()
    result = obj.AddSite(get)
    print('RESULT: {}'.format(json.dumps(result, ensure_ascii=False)))
    if isinstance(result, dict) and result.get('siteStatus'):
        print('SUCCESS')
        return 0
    print('FAILED')
    return 1

if __name__ == '__main__':
    sys.exit(main())
