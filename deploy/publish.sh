#!/bin/bash
# =============================================================
# JargonBuster (st.ewri.site) 生产发布脚本
# 在生产服务器上以 root 执行:  bash publish.sh [站点根目录]
#   目录参数可省略 —— 自动从 nginx / 宝塔配置探测
# 逻辑: 已是 git 仓库 -> fetch + reset 到 origin/main
#       否则          -> 备份旧目录 + git clone --depth 1
# 兼容老版本 git (1.8.x, 不用 -C 参数)
# =============================================================
set -e

REPO="https://github.com/Shrbuz/JargonBuster.git"
DOMAIN="st.ewri.site"
BRANCH="main"
DIR="${1:-}"
BACKUP=""

echo "==> [1/4] 定位站点根目录"
if [ -z "$DIR" ]; then
  for f in /www/server/panel/vhost/nginx/*.conf /www/server/nginx/conf/vhost/*.conf; do
    [ -f "$f" ] || continue
    if grep -q "$DOMAIN" "$f" 2>/dev/null; then
      DIR=$(awk -v d="$DOMAIN" '$0 ~ "server_name.*" d {inblk=1} inblk && /root / {print $2; exit}' "$f" | tr -d ';')
      [ -n "$DIR" ] && { echo "    发现配置: $f"; break; }
    fi
  done
fi
if [ -z "$DIR" ]; then
  DIR=$(nginx -T 2>/dev/null | awk -v d="$DOMAIN" '$0 ~ "server_name.*" d {inblk=1} inblk && /root / {print $2; exit}' | tr -d ';')
fi
if [ -z "$DIR" ]; then
  echo "!!  未能自动定位 $DOMAIN 的站点根目录, 请手动指定:"
  echo "    bash $0 /www/wwwroot/$DOMAIN"
  exit 1
fi
echo "    站点根目录: $DIR"

echo "==> [2/4] 拉取最新代码 ($BRANCH @ origin)"
if [ -d "$DIR/.git" ]; then
  cd "$DIR"
  git fetch origin "$BRANCH"
  git reset --hard "origin/$BRANCH"
else
  PARENT=$(dirname "$DIR")
  BASE=$(basename "$DIR")
  BACKUP="${DIR}.bak.$(date +%Y%m%d%H%M%S)"
  if [ -d "$DIR" ]; then
    mv "$DIR" "$BACKUP"
    echo "    旧版本已备份: $BACKUP"
  fi
  cd "$PARENT"
  if ! git clone --depth 1 -b "$BRANCH" "$REPO" "$BASE"; then
    echo "!!  clone 失败, 还原旧版本"
    if [ -d "$BACKUP" ]; then mv "$BACKUP" "$DIR"; echo "    已还原: $DIR"; fi
    exit 1
  fi
fi

echo "==> [3/4] 修正属主 (www)"
if id www >/dev/null 2>&1; then
  chown -R www:www "$DIR" && echo "    chown www:www 完成"
else
  echo "    无 www 用户, 跳过 (非宝塔环境通常无需处理)"
fi

echo "==> [4/4] 本机自检"
sleep 1
CODE_INDEX=$(curl -s -o /dev/null -w '%{http_code}' -H "Host: $DOMAIN" "http://127.0.0.1/index.html")
CODE_VISUAL=$(curl -s -o /dev/null -w '%{http_code}' -H "Host: $DOMAIN" "http://127.0.0.1/assets/js/data/visual-elements.js")
echo "    /index.html                        -> $CODE_INDEX"
echo "    /assets/js/data/visual-elements.js -> $CODE_VISUAL   (旧版 404, 新版应 200)"
if [ "$CODE_INDEX" = "200" ] && [ "$CODE_VISUAL" = "200" ]; then
  echo "==> 发布成功"
  echo "    浏览器强刷 (Ctrl+F5) 访问 https://$DOMAIN/"
  if [ -n "$BACKUP" ]; then
    echo "    确认无误后可删备份: rm -rf $BACKUP"
  fi
else
  echo "!!  自检未通过, 可回滚:"
  if [ -n "$BACKUP" ]; then
    echo "    rm -rf $DIR && mv $BACKUP $DIR"
  fi
  exit 1
fi
