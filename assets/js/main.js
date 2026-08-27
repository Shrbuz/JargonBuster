/* ============================================================
   main.js · 应用入口：主题 / 侧栏 / 搜索下拉 / 移动端抽屉 / 启动路由
   ============================================================ */
(function (W) {
  'use strict';

  var esc = W.STD_UTIL.esc, debounce = W.STD_UTIL.debounce;

  /* ---------------- 主题 ---------------- */

  function applyTheme(theme, persist) {
    var root = document.documentElement;
    var dark = theme === 'dark';
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    var btn = document.getElementById('themeBtn');
    if (btn) btn.setAttribute('aria-pressed', String(dark));
    if (persist) W.STD_STORE.setTheme(dark ? 'dark' : 'light');
  }

  function initTheme() {
    var saved = W.STD_STORE.getTheme();
    if (saved) { applyTheme(saved, false); return; }
    var preferDark = W.matchMedia && W.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(preferDark ? 'dark' : 'light', false);
  }

  function initThemeBtn() {
    var btn = document.getElementById('themeBtn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var dark = document.documentElement.getAttribute('data-theme') !== 'dark';
      applyTheme(dark ? 'dark' : 'light', true);
    });
  }

  /* ---------------- 侧栏 ---------------- */

  function renderSidebar(activeKey) {
    var D = W.STD_DATA;
    var sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    var counts = D.catCounts();
    var totalLearned = W.STD_STORE.learnedCount();
    var favCount = W.STD_STORE.getFavs().length;

    var html =
      '<p class="side-label">个人</p><nav class="side-list">' +
        '<a class="side-link' + (activeKey === 'favs' ? ' active' : '') + '" href="#/favs" title="查看已收藏词条">' +
          W.STD_UTIL.ICONS.star + '<span>我的收藏</span>' +
          (favCount ? '<span class="side-count">' + favCount + '</span>' : '') +
        '</a>' +
      '</nav>' +
      '<p class="side-label" style="margin-top:var(--s5)">图鉴</p><nav class="side-list">' +
        '<a class="side-link' + (activeKey === 'visuals' ? ' active' : '') + '" href="#/visuals" title="常见界面元素的呈现效果速查">' +
          W.STD_UTIL.ICONS.eye + '<span>可视化图鉴</span>' +
        '</a>' +
      '</nav>' +
      '<p class="side-label" style="margin-top:var(--s5)">分类导航</p><nav class="side-list">';

    D.cats.forEach(function (cat) {
      var CI = W.STD_UTIL.CAT_ICONS || {};
      html +=
        '<a class="side-link' + (activeKey === 'c:' + cat.id ? ' active' : '') +
        '" href="#/c/' + encodeURIComponent(cat.id) + '" style="--dot:' + esc(cat.color) + '">' +
          '<span class="side-ico">' + (CI[cat.icon] || CI.book || '') + '</span>' + esc(cat.name) +
          '<span class="side-count">' + (counts[cat.id] || 0) + '</span>' +
        '</a>';
    });
    html += '</nav>';

    html +=
      '<div class="side-progress">' +
        '<span>学习进度 ' + totalLearned + ' / ' + D.terms.length + '</span>' +
        '<div class="side-progress-bar"><div class="side-progress-fill" style="width:' +
          (D.terms.length ? Math.round(totalLearned / D.terms.length * 100) : 0) + '%"></div></div>' +
      '</div>';

    sidebar.innerHTML = html;
  }

  /* ---------------- 移动端抽屉 ---------------- */

  function initDrawer() {
    var sidebar = document.getElementById('sidebar');
    var btn = document.getElementById('menuBtn');
    var scrim = document.getElementById('scrim');
    if (!sidebar || !btn || !scrim) return;

    function close() {
      sidebar.classList.remove('open');
      scrim.classList.remove('show');
      btn.setAttribute('aria-expanded', 'false');
    }
    btn.addEventListener('click', function () {
      var open = sidebar.classList.toggle('open');
      scrim.classList.toggle('show', open);
      btn.setAttribute('aria-expanded', String(open));
    });
    scrim.addEventListener('click', close);
    sidebar.addEventListener('click', function (e) {
      if (e.target.closest('a')) close();
    });
  }

  /* ---------------- 搜索下拉 ---------------- */

  var SEARCH_MAX = 10;

  function renderPop(items, query) {
    var pop = document.getElementById('searchPop');
    if (!pop) return;
    if (!query) { closePop(); return; }

    if (!items.length) {
      pop.innerHTML =
        '<div class="search-empty">没有直接匹配，按 <kbd>Enter</kbd> 进入全文搜索页</div>';
    } else {
      pop.innerHTML =
        '<p class="search-group-label">最佳匹配</p>' +
        items.map(function (r, i) {
          var t = r.term, cat = W.STD_DATA.getCategory(t.cat);
          return '<div class="search-item' + (i === 0 ? ' active' : '') + '" role="option" data-id="' + esc(t.id) + '">' +
            '<span class="t-zh">' + W.STD_SEARCH.highlight(t.zh, query) + '</span>' +
            '<span class="t-en">' + W.STD_SEARCH.highlight(t.en, query) + '</span>' +
            '<span class="t-sum">' + esc(cat ? cat.name : '') + '</span>' +
          '</div>';
        }).join('');
    }
    pop.classList.add('open');
    document.getElementById('searchInput').setAttribute('aria-expanded', 'true');
  }

  function closePop() {
    var pop = document.getElementById('searchPop');
    if (pop) pop.classList.remove('open');
    var input = document.getElementById('searchInput');
    if (input) input.setAttribute('aria-expanded', 'false');
  }

  function moveActive(dir) {
    var pop = document.getElementById('searchPop');
    if (!pop || !pop.classList.contains('open')) return -1;
    var items = Array.prototype.slice.call(pop.querySelectorAll('.search-item'));
    if (!items.length) return -1;
    var idx = items.findIndex(function (el) { return el.classList.contains('active'); });
    items[idx >= 0 ? idx : 0].classList.remove('active');
    idx = (idx + dir + items.length) % items.length;
    items[idx].classList.add('active');
    items[idx].scrollIntoView({ block: 'nearest' });
    return idx;
  }

  function initSearch() {
    var input = document.getElementById('searchInput');

    var onType = debounce(function () {
      var q = input.value.trim();
      if (!q) { closePop(); return; }
      renderPop(W.STD_SEARCH.search(q).slice(0, SEARCH_MAX), q);
    }, 120);

    input.addEventListener('input', onType);

    input.addEventListener('keydown', function (e) {
      var pop = document.getElementById('searchPop');
      var open = pop && pop.classList.contains('open');

      if (e.key === 'ArrowDown') { e.preventDefault(); moveActive(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveActive(-1); }
      else if (e.key === 'Enter') {
        var q = input.value.trim();
        if (!q) return;
        var active = open && pop.querySelector('.search-item.active');
        if (active && active.getAttribute('data-id')) {
          W.location.hash = '#/t/' + active.getAttribute('data-id');
        } else {
          W.location.hash = '#/s/' + encodeURIComponent(q);
        }
        input.blur();
        closePop();
      } else if (e.key === 'Escape') {
        input.value = '';
        input.blur();
        closePop();
      }
    });

    /* 点击选择结果 */
    var pop = document.getElementById('searchPop');
    if (pop) {
      pop.addEventListener('mousedown', function (e) {
        var item = e.target.closest('.search-item');
        if (!item) return;
        e.preventDefault(); // 避免 input blur 先触发
        W.location.hash = '#/t/' + item.getAttribute('data-id');
        input.value = '';
        closePop();
      });
    }

    /* 点击外部关闭 */
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.header-search')) closePop();
    });

    /* 全局 “/” 聚焦搜索 */
    document.addEventListener('keydown', function (e) {
      var tag = (e.target.tagName || '').toLowerCase();
      var typing = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === '/') {
        e.preventDefault();
        input.focus();
        input.select();
      }
    });
  }

  /* ---------------- 启动 ---------------- */

  function boot() {
    initTheme();
    initThemeBtn();
    initDrawer();
    initSearch();

    if (W.STD_DATA && W.STD_DATA.validate) {
      var problems = W.STD_DATA.validate();
      if (problems.length) {
        console.warn('[standard-term] 数据完整性问题 ' + problems.length + ' 条：');
        problems.slice(0, 20).forEach(function (p) { console.warn(' -', p); });
      }
    }

    var container = document.getElementById('view');

    W.STD_ROUTER.init(container, function (route) {
      var activeKey = null;
      if (route.name === 'category') activeKey = 'c:' + route.id;
      else if (route.name === 'term') {
        var t = W.STD_DATA.termMap.get(route.id);
        if (t) activeKey = 'c:' + t.cat;
      } else if (route.name === 'favs') {
        activeKey = 'favs';
      } else if (route.name === 'visualIndex' || route.name === 'visualGroup') {
        activeKey = 'visuals';
      }
      renderSidebar(activeKey);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window);
