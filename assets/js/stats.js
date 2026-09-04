/* ============================================================
   stats.js · 站点访问计数（自托管，复用 /feedback/ 反向代理，零依赖）
   语义：一次「访问」= 一个浏览器会话（sessionStorage 去重，刷新不重复计数）；
   生产走 /feedback/stats（GET 只读 / POST /stats/ping 计数），
   本地预览尝试 127.0.0.1:8899；接口不可用时静默隐藏，不影响页面。
   挂载：window.STD_STATS
   ============================================================ */
(function (W) {
  'use strict';

  var PING_KEY = 'std-visit-pinged';
  var isLocal = W.location.protocol === 'file:' ||
    /localhost|127\.0\.0\.1/.test(W.location.hostname);
  var STATS_URL = isLocal
    ? 'http://127.0.0.1:8899/feedback/stats'
    : '/feedback/stats';

  /** 1234567 -> "1,234,567"（千分位，页脚展示用） */
  function fmt(n) {
    return String(n == null ? 0 : n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function render(el, data) {
    if (!el) return;
    el.textContent = '';
    el.appendChild(document.createTextNode('总访问 '));
    var total = document.createElement('b');
    total.textContent = fmt(data.total);
    el.appendChild(total);
    el.appendChild(document.createTextNode(' · 今日 '));
    var today = document.createElement('b');
    today.textContent = fmt(data.today);
    el.appendChild(today);
    el.hidden = false;
  }

  function init() {
    var el = document.getElementById('siteStats');
    if (!el || typeof W.fetch !== 'function') return;

    var pinged = false;
    try { pinged = W.sessionStorage.getItem(PING_KEY) === '1'; } catch (e) { /* 隐私模式等 */ }

    W.fetch(pinged ? STATS_URL : STATS_URL + '/ping', pinged
      ? { method: 'GET' }
      : { method: 'POST' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data || !data.ok || typeof data.total !== 'number') return;
        if (!pinged) {
          try { W.sessionStorage.setItem(PING_KEY, '1'); } catch (e) { /* ignore */ }
        }
        render(el, data);
      })
      .catch(function () { /* 静默降级：本地预览或服务不可用时不显示计数 */ });
  }

  W.STD_STATS = { init: init, fmt: fmt };

  if (W.STD_STATS && document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})(window);
