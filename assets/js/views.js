/* ============================================================
   views.js · 页面渲染
   每个视图返回 { title, html, mount }，由 router 注入并挂载。
   挂载：window.STD_VIEWS
   ============================================================ */
(function (W) {
  'use strict';

  var esc = W.STD_UTIL.esc, ICONS = W.STD_UTIL.ICONS;
  var C = W.STD_COMPONENTS, STORE = W.STD_STORE;

  var LEVEL_ORDER = { core: 0, common: 1, advanced: 2 };

  /* 分类小图标（几何描边，统一 20px） */
  var CAT_ICONS = {
    basics: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m8 7-5 5 5 5M16 7l5 5-5 5"/></svg>',
    dsa: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="6" cy="6" r="2.2"/><circle cx="18" cy="6" r="2.2"/><circle cx="12" cy="18" r="2.2"/><path d="M7.8 7.4 10.6 16M16.2 7.4 13.4 16M8.2 6h7.6"/></svg>',
    frontend: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 20V9"/></svg>',
    backend: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><path d="M7 7h.01M7 17h.01"/></svg>',
    database: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5V12c0 1.7 3.6 3 8 3s8-1.3 8-3V5.5"/><path d="M4 12v6.5c0 1.7 3.6 3 8 3s8-1.3 8-3V12"/></svg>',
    network: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 2.6 4 5.6 4 9s-1.2 6.4-4 9c-2.8-2.6-4-5.6-4-9s1.2-6.4 4-9Z"/></svg>',
    git: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="6" cy="5" r="2.2"/><circle cx="6" cy="19" r="2.2"/><circle cx="18" cy="9" r="2.2"/><path d="M6 7.2v9.6M18 11.2c0 4-4 3.3-7.5 4.6"/></svg>',
    engineering: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2.8 13.9 6a6.3 6.3 0 0 1 2.6 1.1l3.6-.7 1.2 2-2.4 2.8a6.6 6.6 0 0 1 0 1.6l2.4 2.8-1.2 2-3.6-.7A6.3 6.3 0 0 1 13.9 18L12 21.2 10.1 18a6.3 6.3 0 0 1-2.6-1.1l-3.6.7-1.2-2 2.4-2.8a6.6 6.6 0 0 1 0-1.6L2.7 8.4l1.2-2 3.6.7A6.3 6.3 0 0 1 10.1 6L12 2.8Z"/></svg>',
    architecture: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
    ai: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z"/><path d="M19 15l.9 2.4L22 18l-2.1.6L19 21l-.9-2.4L16 18l2.1-.6L19 15Z"/></svg>'
  };

  /* ================= 首页 ================= */

  var PATHS = [
    { id: 'beginner', name: '零基础起步线', desc: '从“程序是什么”到看懂一段代码在干嘛',
      steps: ['variable-and-constant', 'function', 'parameter', 'return-value', 'scope', 'data-type', 'exception-handling'] },
    { id: 'web', name: 'Web 与网络线', desc: '浏览器和服务器是怎么配合工作的',
      steps: ['http', 'http-methods', 'status-codes', 'dns', 'localhost', 'api', 'rest', 'json', 'http-client', 'promise-async-await', 'race-condition', 'cors'] },
    { id: 'collab', name: 'Git 协作与工程习惯线', desc: '多人写代码不打架的基本功',
      steps: ['vcs', 'repository', 'commit', 'branch', 'merge', 'pull-request', 'gitignore', 'semver', 'code-review', 'ci-cd'] },
    { id: 'ai', name: 'AI 高效协作线', desc: '让 AI 听懂你、也让你听懂 AI',
      steps: ['llm', 'prompt-engineering', 'context-window', 'token', 'hallucination', 'agent', 'mcp'] },
    { id: 'ui', name: 'UI 沟通速查线', desc: '把界面需求说成 AI 一次能听懂的话',
      steps: ['button', 'text-input', 'interactive-states', 'card', 'table', 'tabs', 'modal', 'drawer', 'toast', 'skeleton-screen', 'empty-state', 'responsive-design'] }
  ];

  function renderHome() {
    var D = W.STD_DATA;
    var counts = D.catCounts();
    var st = D.stats();
    var daily = D.dailyTerm();

    var html =
      '<section class="hero">' +
        '<span class="hero-kicker">OPEN KNOWLEDGE · 开放知识库</span>' +
        '<h1 class="hero-title">AI学习第一步，掌握<em>技术规范用语</em></h1>' +
        '<p class="hero-desc">' +
          esc('和 AI 结对编程、读文档、开会评审时，总有些词“眼熟但说不清”？' +
              '这里把常用技术术语按场景分好类：一句话定义 + 通俗讲解 + 生活类比 + ' +
              '「对 AI 该怎么说」的沟通示例，即查即用。') +
        '</p>' +
        '<div class="hero-stats">' +
          '<span class="stat-pill"><b>' + st.terms + '</b> 词条</span>' +
          '<span class="stat-pill"><b>' + st.cats + '</b> 大分类</span>' +
          '<span class="stat-pill"><b>' + (st.svg + st.anim + st.img) + '</b> 图解 / 动画</span>' +
          '<span class="stat-pill">按 <kbd>/</kbd> 随时搜索</span>' +
        '</div>' +
      '</section>';

    if (daily) {
      html +=
      '<a class="daily-card" href="#/t/' + encodeURIComponent(daily.id) + '">' +
        '<div class="daily-head">' + ICONS.bulb + '今日一词 · 每天认识一个术语</div>' +
        '<div class="daily-term"><span class="zh">' + esc(daily.zh) + '</span><span class="en">' + esc(daily.en) + '</span></div>' +
        '<p class="daily-summary">' + esc(daily.summary) + '</p>' +
      '</a>';
    }

    html += '<h2 class="section-label">分类浏览</h2><div class="cat-grid">';
    D.cats.forEach(function (cat) {
      var total = counts[cat.id] || 0;
      var learned = D.termsOf(cat.id).filter(function (t) { return STORE.isLearned(t.id); }).length;
      html += C.catCard(cat, total, learned);
    });
    html += '</div>';

    /* 图鉴速查入口 */
    html += '<h2 class="section-label">图鉴速查</h2><div class="gallery-entries">' +
      '<a class="visual-entry" href="#/visuals">' +
        '<span class="visual-entry-badge">元素</span>' +
        '<span class="visual-entry-body">' +
          '<strong>前端元素图鉴</strong>' +
          '<span>界面元素长什么样、规范名叫什么——看着样子记名字，拿着名字去沟通</span>' +
        '</span>' +
        '<span class="visual-entry-arrow">→</span>' +
      '</a>' +
      '<a class="visual-entry" href="#/styles">' +
        '<span class="visual-entry-badge">风格</span>' +
        '<span class="visual-entry-body">' +
          '<strong>UI 风格图鉴</strong>' +
          '<span>认全主流视觉风格的气质与特征，拿着一句准确的话让 AI 还原风格</span>' +
        '</span>' +
        '<span class="visual-entry-arrow">→</span>' +
      '</a>' +
      '<a class="visual-entry" href="#/libs">' +
        '<span class="visual-entry-badge">组件库</span>' +
        '<span class="visual-entry-body">' +
          '<strong>UI 库图鉴</strong>' +
          '<span>按生态与场景选对现成的组件体系，学会用一句准确的话向 AI 声明技术栈</span>' +
        '</span>' +
        '<span class="visual-entry-arrow">→</span>' +
      '</a>' +
    '</div>';

    /* 学习路线 */
    html += '<h2 class="section-label">学习路线</h2>';
    PATHS.forEach(function (path) {
      var stepsHtml = path.steps.map(function (id, i) {
        var t = W.STD_DATA.termMap.get(id);
        if (!t) return '';
        return (i ? '<span class="path-arrow">' + ICONS.right + '</span>' : '') +
          '<a class="path-step' + (STORE.isLearned(id) ? ' done' : '') + '" href="#/t/' + encodeURIComponent(id) + '" title="' + esc(t.summary) + '">' +
            '<span class="n">' + (i + 1) + '</span>' + esc(t.zh) +
          '</a>';
      }).join('');
      html +=
        '<details class="path-track"' + (path.id === 'beginner' ? ' open' : '') + '>' +
          '<summary><span>' + esc(path.name) + '</span>' +
            '<span class="badge">' + path.steps.length + ' 步</span>' +
            '<span class="arrow">' + ICONS.right + '</span>' +
          '</summary>' +
          '<p class="term-card-summary" style="padding:0 var(--s4);margin-bottom:var(--s2)">' + esc(path.desc) + '</p>' +
          '<div class="path-steps">' + stepsHtml + '</div>' +
        '</details>';
    });

    /* 最近浏览 */
    var recentIds = STORE.getRecent().filter(function (id) { return W.STD_DATA.termMap.has(id); });
    if (recentIds.length) {
      html += '<h2 class="section-label">最近浏览</h2><div class="term-grid">';
      recentIds.forEach(function (id) {
        html += C.miniTermCard(W.STD_DATA.termMap.get(id));
      });
      html += '</div>';
    }

    return { title: '浆果 · 标准术语网 · JargonBuster Standard Term', html: html, mount: null };
  }

  /* ================= 分类页 ================= */

  function sortTerms(list) {
    return list.slice().sort(function (a, b) {
      var d = (LEVEL_ORDER[a.level] ?? 1) - (LEVEL_ORDER[b.level] ?? 1);
      return d !== 0 ? d : 0; // 同级保持数据文件顺序
    });
  }

  function renderCategory(catId) {
    var D = W.STD_DATA;
    var cat = D.getCategory(catId);
    if (!cat) return null;

    var terms = sortTerms(D.termsOf(catId));
    var tagsMap = {};
    terms.forEach(function (t) { (t.tags || []).forEach(function (tag) { tagsMap[tag] = true; }); });
    var tags = Object.keys(tagsMap);

    var learned = terms.filter(function (t) { return STORE.isLearned(t.id); }).length;

    var html =
      '<nav class="breadcrumb" aria-label="面包屑">' +
        '<a href="#/">首页</a><span class="sep">/</span><span class="here">' + esc(cat.name) + '</span>' +
      '</nav>' +
      '<header class="cat-hero" style="--cat-color:' + esc(cat.color) + '">' +
        '<span class="cat-hero-icon">' + (CAT_ICONS[cat.icon] || CAT_ICONS.book) + '</span>' +
        '<div>' +
          '<h1 class="page-title cat-hero-name">' + esc(cat.name) + '<span>' + esc(cat.en) + ' · ' + terms.length + ' 词条</span></h1>' +
          '<p class="cat-hero-desc">' + esc(cat.desc) + '</p>' +
          '<p class="cat-hero-desc">本分类学习进度：' + learned + ' / ' + terms.length + '</p>' +
        '</div>' +
      '</header>';

    if (catId === 'frontend' && W.STD_VISUAL_GROUPS) {
      html +=
        '<a class="visual-entry" href="#/visuals">' +
          '<span class="visual-entry-badge">可视化</span>' +
          '<span class="visual-entry-body">' +
            '<strong>前端可视化标准术语</strong>' +
            '<span>把界面元素的叫法和真实样子对齐，沟通、描述、让 AI 理解都有共同语言</span>' +
          '</span>' +
          '<span class="visual-entry-arrow">→</span>' +
        '</a>';
    }

    if (tags.length > 1) {
      html += '<div class="cat-tags" role="group" aria-label="按标签筛选">' +
        '<button type="button" class="tag-chip tag-filter is-active" data-tag="">全部</button>' +
        tags.map(function (tag) {
          return '<button type="button" class="tag-chip tag-filter" data-tag="' + esc(tag) + '">' + esc(tag) + '</button>';
        }).join('') +
      '</div>';
    }

    html += '<div class="term-grid" id="catTermGrid">' +
      terms.map(function (t) { return C.termCard(t); }).join('') +
    '</div>';

    var mount = null;
    if (tags.length > 1) {
      mount = function (root) {
        var grid = root.querySelector('#catTermGrid');
        root.querySelectorAll('.tag-filter').forEach(function (btn) {
          btn.addEventListener('click', function () {
            root.querySelectorAll('.tag-filter').forEach(function (b) { b.classList.remove('is-active'); });
            btn.classList.add('is-active');
            var tag = btn.getAttribute('data-tag');
            var shown = !tag ? terms : terms.filter(function (t) { return (t.tags || []).indexOf(tag) !== -1; });
            grid.innerHTML = shown.length
              ? shown.map(function (t) { return C.termCard(t); }).join('')
              : '<div class="empty-state" style="grid-column:1/-1"><h3>该标签下暂无词条</h3></div>';
          });
        });
      };
    }

    return { title: cat.name + ' · 标准术语', html: html, mount: mount };
  }

  /* ================= 词条详情 ================= */

  function talkItemGood(say) {
    return '' +
      '<li class="talk-item">' +
        '<span class="say-q">' + esc(say) + '</span>' +
        '<button type="button" class="copy-btn" data-copy="' + esc(say) + '" aria-label="复制这句话">' + ICONS.copy + '</button>' +
      '</li>';
  }
  function talkItemBad(item) {
    return '' +
      '<li class="talk-item">' +
        '<span class="say-q">' + esc(item.say) + '</span>' +
        (item.why ? '<div class="why">' + esc(item.why) + '</div>' : '') +
        '<button type="button" class="copy-btn" data-copy="' + esc(item.say) + '" aria-label="复制这句话">' + ICONS.copy + '</button>' +
      '</li>';
  }

  function renderTerm(id) {
    var D = W.STD_DATA;
    var t = D.termMap.get(id);
    if (!t) return null;
    var cat = D.getCategory(t.cat);
    var nb = D.neighborsOf(t);
    var related = D.relatedOf(t);
    var visuals = [];
    if (W.STD_VISUAL_GROUPS) {
      W.STD_VISUAL_GROUPS.forEach(function (g) {
        g.items.forEach(function (it) { if (it.term === id) visuals.push({ group: g, item: it }); });
      });
    }

    var html =
      '<nav class="breadcrumb" aria-label="面包屑">' +
        '<a href="#/">首页</a><span class="sep">/</span>' +
        (cat ? '<a href="#/c/' + encodeURIComponent(cat.id) + '">' + esc(cat.name) + '</a><span class="sep">/</span>' : '') +
        '<span class="here">' + esc(t.zh) + '</span>' +
      '</nav>' +

      '<header class="term-head">' +
        '<div class="term-title-row">' +
          '<h1 class="term-title-zh">' + esc(t.zh) + '</h1>' +
          '<span class="term-title-en">' + esc(t.en) + '</span>' +
        '</div>' +
        ((t.aliases && t.aliases.length)
          ? '<p class="term-aliases">又叫：' + t.aliases.map(esc).join('、') + '</p>'
          : '') +
        '<div class="term-meta-row">' + C.levelBadge(t.level) + C.tagChips(t.tags) + '</div>' +
        '<div class="term-actions">' +
          '<button type="button" class="btn btn-small act-fav" aria-pressed="' + STORE.isFav(id) + '">' +
            ICONS.star + '<span>' + (STORE.isFav(id) ? '已收藏' : '收藏') + '</span></button>' +
          '<button type="button" class="btn btn-small act-learned" aria-pressed="' + STORE.isLearned(id) + '">' +
            ICONS.check + '<span>' + (STORE.isLearned(id) ? '已掌握' : '标记掌握') + '</span></button>' +
        '</div>' +
      '</header>' +

      '<h2 class="section-label">一句话定义</h2>' +
      '<p class="define-card">' + esc(t.summary) + '</p>' +

      (visuals.length
        ? '<p class="term-visual-row"><span>前端元素图鉴：</span>' +
          visuals.map(function (v) {
            return '<a class="vs-term-link" href="#/visuals/' + encodeURIComponent(v.group.id) + '/' + encodeURIComponent(v.item.id) + '">' +
              esc(v.item.name) + '<span class="vs-en">' + esc(v.group.name) + '</span></a>';
          }).join('') + '</p>'
        : '') +

      C.mediaHtml(t) +

      '<h2 class="section-label">通俗讲解</h2>' +
      '<div class="prose">' +
        (t.plain || []).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
      '</div>' +

      (t.analogy
        ? '<h2 class="section-label">生活类比</h2>' +
          '<div class="analogy-block"><span class="analogy-icon">' + ICONS.bulb + '</span>' +
          '<p class="analogy-body">' + esc(t.analogy) + '</p></div>'
        : '') +

      ((t.talk && (t.talk.good || t.talk.bad))
        ? '<h2 class="section-label">怎么对 AI 说</h2>' +
          '<div class="talk-wrap">' +
            (t.talk.good && t.talk.good.length
              ? '<div class="talk-col talk-good"><h4>' + ICONS.check + '这样说，AI 秒懂</h4><ul class="talk-list">' +
                t.talk.good.map(talkItemGood).join('') + '</ul></div>'
              : '') +
            (t.talk.bad && t.talk.bad.length
              ? '<div class="talk-col talk-bad"><h4>' + ICONS.cross + '别说成这样</h4><ul class="talk-list">' +
                t.talk.bad.map(talkItemBad).join('') + '</ul></div>'
              : '') +
          '</div>'
        : '') +

      ((t.misconceptions && t.misconceptions.length)
        ? '<h2 class="section-label">常见误解</h2>' +
          '<ol class="misconception-list">' +
            t.misconceptions.map(function (m) { return '<li>' + esc(m) + '</li>'; }).join('') +
          '</ol>'
        : '') +

      (related.length
        ? '<h2 class="section-label">相关词条</h2>' +
          '<p class="related-note">理解这些词时常常会一起遇到：</p>' +
          '<div class="term-grid">' + related.map(C.miniTermCard).join('') + '</div>'
        : '') +

      ((nb.prev || nb.next)
        ? '<nav class="pager">' +
            (nb.prev
              ? '<a class="prev" href="#/t/' + encodeURIComponent(nb.prev.id) + '"><span class="dir">' + ICONS.left + ' 本分类上一个</span><span class="name">' + esc(nb.prev.zh) + ' ' + esc(nb.prev.en) + '</span></a>'
              : '<span></span>') +
            (nb.next
              ? '<a class="next" href="#/t/' + encodeURIComponent(nb.next.id) + '"><span class="dir">本分类下一个 ' + ICONS.right + '</span><span class="name">' + esc(nb.next.zh) + ' ' + esc(nb.next.en) + '</span></a>'
              : '<span></span>') +
          '</nav>'
        : '');

    var mount = function (root) {
      STORE.pushRecent(id);

      /* 复制按钮：容器持久存在，只绑定一次，避免监听器叠加 */
      if (!root.dataset.copyBound) {
        root.dataset.copyBound = '1';
        root.addEventListener('click', function (e) {
          var btn = e.target.closest('[data-copy]');
          if (!btn) return;
          W.STD_UTIL.copyText(btn.getAttribute('data-copy')).then(function (ok) {
            W.STD_UTIL.toast(ok ? '已复制，去粘贴给 AI 吧' : '复制失败，请手动选择文本');
          });
        });
      }

      /* 收藏 / 掌握 */
      var favBtn = root.querySelector('.act-fav');
      if (favBtn) favBtn.addEventListener('click', function () {
        var on = STORE.toggleFav(id);
        favBtn.setAttribute('aria-pressed', String(on));
        favBtn.querySelector('span').textContent = on ? '已收藏' : '收藏';
        W.STD_UTIL.toast(on ? '已加入收藏' : '已取消收藏');
      });
      var learnBtn = root.querySelector('.act-learned');
      if (learnBtn) learnBtn.addEventListener('click', function () {
        var on = STORE.toggleLearned(id);
        learnBtn.setAttribute('aria-pressed', String(on));
        learnBtn.querySelector('span').textContent = on ? '已掌握' : '标记掌握';
        W.STD_UTIL.toast(on ? '很棒，进度已更新' : '已移出掌握清单');
      });

      C.mountMedia(root);
    };

    return { title: t.zh + ' ' + t.en + ' · 标准术语', html: html, mount: mount };
  }

  /* ================= 搜索结果页 ================= */

  function renderSearchPage(query) {
    var D = W.STD_DATA;
    var results = W.STD_SEARCH.search(query);
    var vres = W.STD_SEARCH.searchVisuals ? W.STD_SEARCH.searchVisuals(query) : [];
    var sres = W.STD_SEARCH.searchStyles ? W.STD_SEARCH.searchStyles(query) : [];
    var lres = W.STD_SEARCH.searchLibs ? W.STD_SEARCH.searchLibs(query) : [];

    function visualSection(list) {
      return '<h2 class="group-title">前端元素图鉴<span class="n">' + list.length + '</span></h2>' +
        '<div class="vs-match-list">' + list.map(function (r) {
          return '<a class="vs-match" href="#/visuals/' + encodeURIComponent(r.group.id) + '/' + encodeURIComponent(r.item.id) + '">' +
            W.STD_SEARCH.highlight(r.item.name, query) +
            '<span class="g">' + esc(r.group.name) + ' · ' + esc(r.item.en) + '</span></a>';
        }).join('') + '</div>';
    }

    function styleSection(list) {
      return '<h2 class="group-title">UI 风格图鉴<span class="n">' + list.length + '</span></h2>' +
        '<div class="vs-match-list">' + list.map(function (r) {
          return '<a class="vs-match" href="#/styles/' + encodeURIComponent(r.style.id) + '">' +
            W.STD_SEARCH.highlight(r.style.name, query) +
            '<span class="g">' + esc(r.style.en) + '</span></a>';
        }).join('') + '</div>';
    }

    function libSection(list) {
      return '<h2 class="group-title">UI 库图鉴<span class="n">' + list.length + '</span></h2>' +
        '<div class="vs-match-list">' + list.map(function (r) {
          return '<a class="vs-match" href="#/libs/' + encodeURIComponent(r.lib.id) + '">' +
            W.STD_SEARCH.highlight(r.lib.name, query) +
            '<span class="g">' + esc(r.lib.scenario) + '</span></a>';
        }).join('') + '</div>';
    }

    var html =
      '<header class="page-head">' +
        '<h1 class="page-title">搜索：“' + esc(query) + '”</h1>' +
        '<p class="page-sub">共找到 ' + results.length + ' 个相关词条' +
          (vres.length ? '、' + vres.length + ' 个图鉴元素' : '') +
          (sres.length ? '、' + sres.length + ' 个 UI 风格' : '') +
          (lres.length ? '、' + lres.length + ' 个 UI 库' : '') + '</p>' +
      '</header>';

    if (!results.length) {
      var sugg = W.STD_SEARCH.suggestions(6);
      html +=
        '<div class="empty-state">' +
          '<h3>没有找到相关词条</h3>' +
          '<p>换个关键词试试？比如中文、English 或标签名。</p>' +
          '<a class="btn btn-primary" href="#/">返回首页</a>' +
        '</div>';
      if (vres.length) html += visualSection(vres);
      if (sres.length) html += styleSection(sres);
      if (lres.length) html += libSection(lres);
      html +=
        '<h2 class="section-label">不如先看看这些</h2>' +
        '<div class="term-grid">' + sugg.map(function (t) { return C.termCard(t); }).join('') + '</div>';
      return { title: '搜索 ' + query + ' · 标准术语', html: html, mount: null };
    }

    var byCat = {};
    results.forEach(function (r) {
      (byCat[r.term.cat] = byCat[r.term.cat] || []).push(r.term);
    });
    D.cats.forEach(function (cat) {
      var list = byCat[cat.id];
      if (!list || !list.length) return;
      html += '<h2 class="group-title">' + esc(cat.name) + '<span class="n">' + list.length + '</span></h2>' +
        '<div class="term-grid">' + list.map(function (t) { return C.termCard(t, query); }).join('') + '</div>';
    });

    if (vres.length) html += visualSection(vres);
    if (sres.length) html += styleSection(sres);
    if (lres.length) html += libSection(lres);

    return { title: '搜索 ' + query + ' · 标准术语', html: html, mount: null };
  }

  /* ================= 我的收藏 ================= */

  function renderFavs() {
    var D = W.STD_DATA;
    var ids = STORE.getFavs().filter(function (id) { return D.termMap.has(id); });
    var terms = ids.map(function (id) { return D.termMap.get(id); });

    var html =
      '<nav class="breadcrumb" aria-label="面包屑">' +
        '<a href="#/">首页</a><span class="sep">/</span><span class="here">我的收藏</span>' +
      '</nav>' +
      '<header class="page-head">' +
        '<h1 class="page-title">我的收藏</h1>' +
        '<p class="page-sub">' + (terms.length
          ? '共收藏 ' + terms.length + ' 个词条，点击卡片查看详情，右上角叉号可移除。'
          : '') + '</p>' +
      '</header>';

    if (!terms.length) {
      html +=
        '<div class="empty-state">' +
          '<h3>还没有收藏任何词条</h3>' +
          '<p>浏览词条时点击「收藏」，就能在这里随时找到它们。</p>' +
          '<a class="btn btn-primary" href="#/">去首页逛逛</a>' +
        '</div>';
      return { title: '我的收藏 · 标准术语', html: html, mount: null };
    }

    html += '<div class="term-grid">';
    terms.forEach(function (t) {
      html +=
        '<div class="fav-item">' + C.miniTermCard(t) +
          '<button type="button" class="fav-remove" data-unfav="' + esc(t.id) +
          '" aria-label="取消收藏 ' + esc(t.zh) + '" title="取消收藏">' +
            ICONS.cross +
          '</button>' +
        '</div>';
    });
    html += '</div>';

    var mount = function (root) {
      // 容器持久存在，监听只绑定一次，避免叠加
      if (!root.dataset.favBound) {
        root.dataset.favBound = '1';
        root.addEventListener('click', function (e) {
          var btn = e.target.closest('[data-unfav]');
          if (!btn) return;
          STORE.toggleFav(btn.getAttribute('data-unfav'));
          W.STD_UTIL.toast('已取消收藏');
          W.STD_ROUTER.refresh();
        });
      }
    };

    return { title: '我的收藏 · 标准术语', html: html, mount: mount };
  }

  /* ================= 前端可视化标准术语 ================= */

  function renderVisualIndex() {
    var groups = W.STD_VISUAL_GROUPS || [];

    var html =
      '<nav class="breadcrumb" aria-label="面包屑">' +
        '<a href="#/">首页</a><span class="sep">/</span><span class="here">前端可视化标准术语</span>' +
      '</nav>' +
      '<header class="page-head">' +
        '<h1 class="page-title">前端可视化标准术语</h1>' +
        '<p class="page-sub">同一个界面元素，叫法常常五花八门：轮播图还是走马灯？模态框还是对话框？名字没对齐，人与人沟通有歧义，AI 也难以准确理解需求。这里给每个常见元素一个规范名称和通俗解释，并直接呈现真实效果——看着样子记名字，拿着名字去沟通。</p>' +
      '</header>' +
      '<div class="vs-groups">';

    groups.forEach(function (g) {
      html +=
        '<section class="vs-group-card">' +
          '<header><a href="#/visuals/' + encodeURIComponent(g.id) + '">' +
            '<h2>' + esc(g.name) + '<span class="vs-en">' + esc(g.en) + '</span></h2>' +
            '<span class="vs-count">' + g.items.length + ' 元素 →</span>' +
          '</a></header>' +
          '<p class="vs-group-desc">' + esc(g.desc) + '</p>' +
          '<ul class="vs-group-items">' +
            g.items.map(function (it) {
              return '<li><a href="#/visuals/' + encodeURIComponent(g.id) + '/' + encodeURIComponent(it.id) + '">' +
                esc(it.name) + '<span>' + esc(it.en) + '</span></a></li>';
            }).join('') +
          '</ul>' +
        '</section>';
    });

    html += '</div>';
    return { title: '前端可视化标准术语 · 标准术语', html: html, mount: null };
  }

  /* 可视化容器「导出为图片」按钮图标（描边风格下载图标） */
  var VS_EXPORT_ICON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v10m0 0-4-4m4 4 4-4"/><path d="M5 21h14"/></svg>';

  function renderVisualGroup(groupId, itemId) {
    var groups = W.STD_VISUAL_GROUPS || [];
    var group = null;
    groups.forEach(function (g) { if (g.id === groupId) group = g; });
    if (!group) return null;

    var DEMOS = W.STD_VISUAL_DEMOS || {};
    var D = W.STD_DATA;

    var html =
      '<nav class="breadcrumb" aria-label="面包屑">' +
        '<a href="#/">首页</a><span class="sep">/</span>' +
        '<a href="#/visuals">前端可视化标准术语</a><span class="sep">/</span>' +
        '<span class="here">' + esc(group.name) + '</span>' +
      '</nav>' +
      '<header class="page-head">' +
        '<h1 class="page-title">' + esc(group.name) + '<span class="vs-en" style="margin-left:8px">' + esc(group.en) + '</span></h1>' +
        '<p class="page-sub">' + esc(group.desc) + '</p>' +
      '</header>' +
      '<div class="vs-layout">' +
        '<aside class="vs-tree" aria-label="组件树导航">' +
          '<a class="vs-tree-home" href="#/visuals">← 全部分组</a>';

    groups.forEach(function (g) {
      if (g.id === group.id) {
        html += '<span class="vs-tree-group-btn is-current" aria-current="true">' + esc(g.name) +
          '<span class="vs-count">' + g.items.length + '</span></span>';
        html += '<div class="vs-tree-items">';
        g.items.forEach(function (it) {
          html += '<button type="button" class="vs-tree-item' + (it.id === itemId ? ' is-target' : '') +
            '" data-scroll="vs-' + esc(it.id) + '">' + esc(it.name) + '</button>';
        });
        html += '</div>';
      } else {
        html += '<a class="vs-tree-group-btn" href="#/visuals/' + encodeURIComponent(g.id) + '">' +
          esc(g.name) + '<span class="vs-count">' + g.items.length + '</span></a>';
      }
    });

    html += '</aside><div class="vs-main">';

    group.items.forEach(function (it) {
      var demoFn = DEMOS[it.demo];
      html +=
        '<section class="vs-item" id="vs-' + esc(it.id) + '" tabindex="-1" aria-labelledby="vs-t-' + esc(it.id) + '">' +
          '<div class="vs-info">' +
            '<h3 class="vs-name" id="vs-t-' + esc(it.id) + '">' + esc(it.name) +
              '<span class="vs-en">' + esc(it.en) + '</span></h3>' +
            ((it.aliases && it.aliases.length)
              ? '<p class="vs-aliases">别名：' + esc(it.aliases.join('、')) + '</p>'
              : '') +
            '<p class="vs-desc">' + esc(it.desc) + '</p>' +
            (it.term && D.termMap.has(it.term)
              ? '<a class="vs-term-link" href="#/t/' + encodeURIComponent(it.term) + '">查看词条详解 →</a>'
              : '') +
          '</div>' +
          '<div class="vs-stage">' +
            '<button type="button" class="vs-export" data-export-exclude data-name="' + esc(it.name) + '" title="导出为图片" aria-label="导出 ' + esc(it.name) + ' 为图片">' + VS_EXPORT_ICON + '</button>' +
            (demoFn ? demoFn() : '<span class="vs-missing">示例待补充</span>') +
          '</div>' +
        '</section>';
    });

    html += '</div></div>';

    var mount = function (root) {
      var tree = root.querySelector('.vs-tree');
      var sections = root.querySelectorAll('.vs-item');

      function activate(btn) {
        if (!tree) return;
        tree.querySelectorAll('.vs-tree-item').forEach(function (b) { b.classList.remove('is-active'); });
        if (btn) btn.classList.add('is-active');
      }

      function flash(target) {
        target.classList.remove('is-flash');
        void target.offsetWidth; // 重置动画
        target.classList.add('is-flash');
        target.focus({ preventScroll: true });
      }

      // 树节点每次渲染都是新元素，必须每次重绑；
      // 不能用容器级守卫（旧监听随旧节点销毁，守卫会阻止新节点绑定 → 点击失效）
      if (tree) {
        tree.addEventListener('click', function (e) {
          var btn = e.target.closest('[data-scroll]');
          if (!btn) return;
          var target = root.querySelector('#' + btn.getAttribute('data-scroll'));
          if (!target) return;
          activate(btn);
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          flash(target);
          // 静默同步 hash，方便把当前定位分享出去（replaceState 不触发重渲染）
          if (W.history && W.history.replaceState) {
            var itemIdFromTree = btn.getAttribute('data-scroll').slice(3);
            W.history.replaceState(null, '', '#/visuals/' + group.id + '/' + itemIdFromTree);
          }
        });
      }

      // 直链进入（#/visuals/:group/:item）：
      // 路由在 mount 之后还会 scrollTo(0,0)，必须等它执行完再滚到目标（双 rAF 兜底）
      if (itemId) {
        var t = root.querySelector('#vs-' + itemId);
        if (t) {
          var jump = function () {
            t.scrollIntoView({ behavior: 'smooth', block: 'start' });
            flash(t);
          };
          if (typeof W.requestAnimationFrame === 'function') {
            W.requestAnimationFrame(function () { W.requestAnimationFrame(jump); });
          } else {
            jump();
          }
        }
      }

      // 滚动联动：视口中的元素在树导航里高亮
      if (tree && 'IntersectionObserver' in W) {
        var io = new W.IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (!en.isIntersecting) return;
            activate(tree.querySelector('[data-scroll="' + en.target.id + '"]'));
          });
        }, { rootMargin: '-25% 0px -65% 0px' });
        sections.forEach(function (s) { io.observe(s); });
      }

      // 导出为图片：点击角标按钮，把 .vs-stage 纯容器导出为 PNG
      root.querySelectorAll('.vs-export').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var stage = btn.closest('.vs-stage');
          if (!stage || !W.STD_EXPORT) return;
          var name = btn.getAttribute('data-name') || 'component';
          W.STD_EXPORT.nodeToPng(stage, '标准术语-' + name + '.png');
        });
      });
    };

    return { title: group.name + ' · 前端可视化标准术语', html: html, mount: mount };
  }

  /* ================= UI 风格图鉴 ================= */

  var _styleMap = null;
  function styleById(id) {
    if (!_styleMap) {
      _styleMap = {};
      (W.STD_UI_STYLES || []).forEach(function (s) { _styleMap[s.id] = s; });
    }
    return _styleMap[id] || null;
  }

  function renderStyleIndex() {
    var styles = W.STD_UI_STYLES || [];
    var kitFn = W.STD_STYLE_DEMO_KIT;

    var html =
      '<nav class="breadcrumb" aria-label="面包屑">' +
        '<a href="#/">首页</a><span class="sep">/</span><span class="here">UI 风格图鉴</span>' +
      '</nav>' +
      '<header class="page-head">' +
        '<h1 class="page-title">UI 风格图鉴</h1>' +
        '<p class="page-sub">跟 AI 说「好看一点」「高级一点」，注定收到一份随机风格的稿子。这里把常见 UI 风格做成标本：同一套组件、多种风格渲染，风格差异一眼可比；每个风格都配特征清单和能直接发给 AI 的原话——风格这样描述，AI 才能一次还原。</p>' +
      '</header>' +
      '<div class="sty-grid">';

    styles.forEach(function (s) {
      html +=
        '<a class="sty-card" href="#/styles/' + encodeURIComponent(s.id) + '">' +
          '<div class="sty-card-head">' +
            '<span class="sty-card-name">' + esc(s.name) + '</span>' +
            '<span class="sty-card-en">' + esc(s.en) + '</span>' +
          '</div>' +
          (kitFn ? '<div class="sty-card-stage">' + kitFn(s.id, true) + '</div>' : '') +
          '<p class="sty-card-summary">' + esc(s.summary) + '</p>' +
        '</a>';
    });

    html += '</div>';
    return { title: 'UI 风格图鉴 · 标准术语', html: html, mount: null };
  }

  /* related 取值解析：'term:x' 词条 · 'visual:组/元素' 元素标本 · 纯 id 先风格后词条 */
  function resolveStyleRelated(s) {
    var D = W.STD_DATA;
    var styles = [], terms = [], visuals = [];
    (s.related || []).forEach(function (r) {
      if (r.indexOf('term:') === 0) {
        var t = D.termMap.get(r.slice(5));
        if (t) terms.push(t);
        return;
      }
      if (r.indexOf('visual:') === 0) {
        var seg = r.slice(7).split('/');
        var g = null, it = null;
        (W.STD_VISUAL_GROUPS || []).forEach(function (grp) {
          if (grp.id === seg[0]) {
            g = grp;
            grp.items.forEach(function (x) { if (x.id === seg[1]) it = x; });
          }
        });
        if (g && it) visuals.push({ group: g, item: it });
        return;
      }
      if (r === s.id) return; // 不自链
      var st = styleById(r);
      if (st) { styles.push(st); return; }
      var t2 = D.termMap.get(r);
      if (t2) terms.push(t2);
    });
    return { styles: styles, terms: terms, visuals: visuals };
  }

  function renderStyleDetail(id) {
    var s = styleById(id);
    if (!s) return null;
    var DEMOS = W.STD_STYLE_DEMOS || {};
    var demoFn = DEMOS[s.demo];
    var rel = resolveStyleRelated(s);

    var html =
      '<nav class="breadcrumb" aria-label="面包屑">' +
        '<a href="#/">首页</a><span class="sep">/</span>' +
        '<a href="#/styles">UI 风格图鉴</a><span class="sep">/</span>' +
        '<span class="here">' + esc(s.name) + '</span>' +
      '</nav>' +
      '<header class="page-head">' +
        '<h1 class="page-title">' + esc(s.name) + '<span class="vs-en" style="margin-left:8px">' + esc(s.en) + '</span></h1>' +
        '<p class="page-sub">' + esc(s.summary) + '</p>' +
        '<div class="sty-meta">' +
          '<span class="sty-era">' + esc(s.era) + '</span>' +
          (s.represents || []).map(function (r) { return '<span class="sty-rep">' + esc(r) + '</span>'; }).join('') +
        '</div>' +
      '</header>' +

      '<div class="vs-stage">' + (demoFn ? demoFn() : '<span class="vs-missing">风格小样待补充</span>') + '</div>' +

      '<h2 class="section-label">风格特征</h2>' +
      '<div class="sty-features">' +
        (s.features || []).map(function (f) { return '<span class="sty-feature">' + esc(f) + '</span>'; }).join('') +
      '</div>' +

      '<h2 class="section-label">代码要点</h2>' +
      '<pre class="sty-css">' + esc(s.cssHint) + '</pre>' +

      '<h2 class="section-label">怎么对 AI 说</h2>' +
      '<div class="talk-wrap">' +
        ((s.aiTalk && s.aiTalk.good && s.aiTalk.good.length)
          ? '<div class="talk-col talk-good"><h4>' + ICONS.check + '这样说，AI 秒懂</h4><ul class="talk-list">' +
            s.aiTalk.good.map(talkItemGood).join('') + '</ul></div>'
          : '') +
        ((s.aiTalk && s.aiTalk.bad && s.aiTalk.bad.length)
          ? '<div class="talk-col talk-bad"><h4>' + ICONS.cross + '别说成这样</h4><ul class="talk-list">' +
            s.aiTalk.bad.map(talkItemBad).join('') + '</ul></div>'
          : '') +
      '</div>';

    if (rel.styles.length || rel.terms.length || rel.visuals.length) {
      html += '<h2 class="section-label">相关内容</h2><div class="sty-related">';
      rel.styles.forEach(function (st) {
        html += '<a class="vs-match" href="#/styles/' + encodeURIComponent(st.id) + '">' +
          esc(st.name) + '<span class="g">' + esc(st.en) + '</span></a>';
      });
      rel.terms.forEach(function (t) {
        html += '<a class="vs-match" href="#/t/' + encodeURIComponent(t.id) + '">词条：' + esc(t.zh) +
          '<span class="g">' + esc(t.en) + '</span></a>';
      });
      rel.visuals.forEach(function (v) {
        html += '<a class="vs-match" href="#/visuals/' + encodeURIComponent(v.group.id) + '/' + encodeURIComponent(v.item.id) + '">元素标本：' +
          esc(v.item.name) + '<span class="g">' + esc(v.group.name) + '</span></a>';
      });
      html += '</div>';
    }

    var mount = makeCopyMount();

    return { title: s.name + ' · UI 风格图鉴 · 标准术语', html: html, mount: mount };
  }

  /* ================= UI 库图鉴 ================= */

  var LIB_PRICING_LABEL = { free: '免费', freemium: '免费 + 付费' };

  /* 复制按钮统一挂载：容器持久存在，只绑定一次，避免监听器叠加 */
  function makeCopyMount() {
    return function (root) {
      if (!root.dataset.copyBound) {
        root.dataset.copyBound = '1';
        root.addEventListener('click', function (e) {
          var btn = e.target.closest('[data-copy]');
          if (!btn) return;
          W.STD_UTIL.copyText(btn.getAttribute('data-copy')).then(function (ok) {
            W.STD_UTIL.toast(ok ? '已复制，去粘贴给 AI 吧' : '复制失败，请手动选择文本');
          });
        });
      }
    };
  }

  var _libMap = null;
  function libById(id) {
    if (!_libMap) {
      _libMap = {};
      (W.STD_UI_LIBS || []).forEach(function (l) { _libMap[l.id] = l; });
    }
    return _libMap[id] || null;
  }

  function libCard(l, libKit) {
    var ecoBadges = (l.ecosystems || []).map(function (e) {
      return '<span class="lib-eco">' + esc(e) + '</span>';
    }).join('');
    var tagChips = (l.tags || []).map(function (t) {
      return '<span class="lib-tag">' + esc(t) + '</span>';
    }).join('');
    return '' +
      '<div class="lib-card">' +
        '<div class="lib-card-head">' +
          '<a class="lib-card-name" href="#/libs/' + encodeURIComponent(l.id) + '">' + esc(l.name) + '</a>' +
          '<a class="lib-site" href="' + esc(l.site) + '" target="_blank" rel="noopener" title="访问官网（新窗口）">官网 ↗</a>' +
        '</div>' +
        '<div class="lib-card-eco">' + ecoBadges +
          '<span class="lib-price">' + (LIB_PRICING_LABEL[l.pricing] || esc(l.pricing)) + '</span>' +
        '</div>' +
        (libKit ? '<div class="lib-card-stage">' + libKit(l.skin || l.styleRef, l.name, l.accent, true) + '</div>' : '') +
        '<p class="lib-card-scenario">' + esc(l.scenario) + '</p>' +
        '<div class="lib-card-tags">' + tagChips + '</div>' +
        '<a class="lib-more" href="#/libs/' + encodeURIComponent(l.id) + '">详情与 AI 句式 →</a>' +
      '</div>';
  }

  function libGridHtml(list, kitFn) {
    if (!list.length) {
      return '<div class="lib-empty"><p>没有符合筛选条件的库。</p>' +
        '<button type="button" class="lib-clear" data-lib-clear>清空筛选</button></div>';
    }
    return '<div class="lib-grid">' + list.map(function (l) { return libCard(l, kitFn); }).join('') + '</div>';
  }

  function libFilterGroup(label, dim, facets) {
    return '' +
      '<div class="lib-filter-group">' +
        '<span class="lib-filter-label">' + esc(label) + '</span>' +
        '<div class="lib-filter-chips">' +
          facets.map(function (f) {
            return '<button type="button" class="lib-filter" data-dim="' + esc(dim) + '" data-val="' + esc(f.id) + '">' + esc(f.label) + '</button>';
          }).join('') +
        '</div>' +
      '</div>';
  }

  function renderLibs() {
    var facets = W.STD_UI_LIB_FACETS || { eco: [], scene: [], pricing: [], tags: [] };
    var sel = { eco: [], scene: [], pricing: [], tags: [] };
    var libKit = W.STD_LIB_KIT;

    var html =
      '<nav class="breadcrumb" aria-label="面包屑">' +
        '<a href="#/">首页</a><span class="sep">/</span><span class="here">UI 库图鉴</span>' +
      '</nav>' +
      '<header class="page-head">' +
        '<h1 class="page-title">UI 库图鉴</h1>' +
        '<p class="page-sub">「用什么现成体系搭」也是一句要说给 AI 听的话：按生态、场景、收费、风格筛出候选库，看懂每个库的设计语言，再拿着「对 AI 说」的原话开工——选对库、说对话，不返工。</p>' +
      '</header>' +
      '<div class="lib-filters">' +
        libFilterGroup('生态', 'eco', facets.eco) +
        libFilterGroup('场景', 'scene', facets.scene) +
        libFilterGroup('收费', 'pricing', facets.pricing) +
        libFilterGroup('标签', 'tags', facets.tags) +
        '<div class="lib-filter-foot">' +
          '<span class="lib-count" data-lib-count></span>' +
          '<button type="button" class="lib-clear" data-lib-clear>清空筛选</button>' +
        '</div>' +
      '</div>' +
      '<div data-lib-grid>' + libGridHtml(W.STD_UI_LIB_FILTER(null), libKit) + '</div>';

    var mount = function (root) {
      function refresh() {
        var list = W.STD_UI_LIB_FILTER(sel);
        var grid = root.querySelector('[data-lib-grid]');
        if (grid) grid.innerHTML = libGridHtml(list, libKit);
        var count = root.querySelector('[data-lib-count]');
        if (count) count.textContent = '筛出 ' + list.length + ' 个库';
      }
      root.addEventListener('click', function (e) {
        var chip = e.target.closest('.lib-filter');
        if (chip) {
          var dim = chip.getAttribute('data-dim');
          var val = chip.getAttribute('data-val');
          var arr = sel[dim] || (sel[dim] = []);
          var i = arr.indexOf(val);
          if (i === -1) arr.push(val); else arr.splice(i, 1);
          chip.classList.toggle('is-active', i === -1);
          refresh();
          return;
        }
        if (e.target.closest('[data-lib-clear]')) {
          sel.eco.length = 0; sel.scene.length = 0; sel.pricing.length = 0; sel.tags.length = 0;
          root.querySelectorAll('.lib-filter.is-active').forEach(function (b) { b.classList.remove('is-active'); });
          refresh();
        }
      });
    };

    return { title: 'UI 库图鉴 · 标准术语', html: html, mount: mount };
  }

  function renderLibDetail(id) {
    var l = libById(id);
    if (!l) return null;
    var libKit = W.STD_LIB_KIT;
    var st = styleById(l.styleRef);
    var skin = l.skin || l.styleRef;

    var html =
      '<nav class="breadcrumb" aria-label="面包屑">' +
        '<a href="#/">首页</a><span class="sep">/</span>' +
        '<a href="#/libs">UI 库图鉴</a><span class="sep">/</span>' +
        '<span class="here">' + esc(l.name) + '</span>' +
      '</nav>' +
      '<header class="page-head">' +
        '<h1 class="page-title">' + esc(l.name) + '</h1>' +
        '<p class="page-sub">' + esc(l.summary) + '</p>' +
        '<div class="sty-meta">' +
          (l.ecosystems || []).map(function (e) { return '<span class="lib-eco">' + esc(e) + '</span>'; }).join('') +
          '<span class="lib-price">' + (LIB_PRICING_LABEL[l.pricing] || esc(l.pricing)) + '</span>' +
          (l.tags || []).map(function (t) { return '<span class="sty-rep">' + esc(t) + '</span>'; }).join('') +
        '</div>' +
        (l.note ? '<p class="lib-note">※ ' + esc(l.note) + '</p>' : '') +
      '</header>' +

      '<h2 class="section-label">设计语言小样</h2>' +
      '<div class="vs-stage">' + (libKit ? libKit(skin, l.name, l.accent, false) : '<span class="vs-missing">小样待补充</span>') + '</div>' +
      (l.skin === 'wireframe'
        ? '<p class="lib-stage-caption">该库不预设视觉样式（无样式 / 无头）：交互行为与可访问性由库承担，皮肤由你的设计令牌决定——小样以线框示意。</p>'
        : (st
          ? '<p class="lib-stage-caption">按<a href="#/styles/' + encodeURIComponent(st.id) + '">「' + esc(st.name) + ' ' + esc(st.en) + '」</a>风格渲染——这正是该库的设计语言气质，<a href="#/styles/' + encodeURIComponent(st.id) + '">查看风格详解 →</a></p>'
          : '')) +

      '<h2 class="section-label">基本信息</h2>' +
      '<div class="lib-info">' +
        '<div class="lib-info-row"><span class="lib-info-key">设计语言</span><span>' + esc(l.designLanguage) + '</span></div>' +
        '<div class="lib-info-row"><span class="lib-info-key">适用场景</span><span>' + esc(l.scenario) + '</span></div>' +
        '<div class="lib-info-row"><span class="lib-info-key">生态</span><span>' + esc((l.ecosystems || []).join('、')) + '</span></div>' +
        '<div class="lib-info-row"><span class="lib-info-key">收费</span><span>' + (LIB_PRICING_LABEL[l.pricing] || esc(l.pricing)) + '</span></div>' +
        '<div class="lib-info-row"><span class="lib-info-key">官网</span><span><a class="lib-site-link" href="' + esc(l.site) + '" target="_blank" rel="noopener">' + esc(l.site.replace(/^https?:\/\//, '')) + ' ↗</a></span></div>' +
      '</div>' +

      '<h2 class="section-label">怎么对 AI 说</h2>' +
      '<div class="talk-wrap">' +
        ((l.aiTalk && l.aiTalk.good && l.aiTalk.good.length)
          ? '<div class="talk-col talk-good"><h4>' + ICONS.check + '这样说，AI 秒懂</h4><ul class="talk-list">' +
            l.aiTalk.good.map(talkItemGood).join('') + '</ul></div>'
          : '') +
        ((l.aiTalk && l.aiTalk.bad && l.aiTalk.bad.length)
          ? '<div class="talk-col talk-bad"><h4>' + ICONS.cross + '别说成这样</h4><ul class="talk-list">' +
            l.aiTalk.bad.map(talkItemBad).join('') + '</ul></div>'
          : '') +
      '</div>' +

      (st
        ? '<h2 class="section-label">相关内容</h2><div class="sty-related">' +
          '<a class="vs-match" href="#/styles/' + encodeURIComponent(st.id) + '">风格详解：' + esc(st.name) + '<span class="g">' + esc(st.en) + '</span></a>' +
          '</div>'
        : '');

    return { title: l.name + ' · UI 库图鉴 · 标准术语', html: html, mount: makeCopyMount() };
  }

  /* ================= 关于页 ================= */

  var TERM_TEMPLATE = [
    '{',
    '  id: "connection-pool",            // 全局唯一，小写英文连字符',
    '  en: "Connection Pool",',
    '  zh: "连接池",',
    '  aliases: ["数据库连接池"],         // 可选',
    '  cat: "backend",                   // 必须是 categories.js 中已有的分类 id',
    '  tags: ["数据库", "性能"],          // 2~4 个',
    '  level: "core",                    // core 核心 | common 常用 | advanced 进阶',
    '  summary: "一句话说清它是什么（40 字以内）",',
    '  plain: ["第一段通俗讲解", "第二段……"],   // 数组，每段一个元素',
    '  analogy: "一个生活里的类比",',
    '  talk: {',
    '    good: ["对 AI 说这句准确的话"],',
    '    bad: [{ say: "含糊的说法", why: "为什么这么说不好" }]',
    '  },',
    '  misconceptions: ["常见误解一", "常见误解二"],',
    '  related: ["database-index", "orm"],   // 其他词条的 id',
    '  visual: { kind: "svg", id: "xxx", caption: "图示说明" }  // 可选：svg | anim | img',
    '}'
  ].join('\n');

  function renderAbout() {
    var html =
      '<header class="page-head">' +
        '<h1 class="page-title">关于本站</h1>' +
        '<p class="page-sub">一份开放、持续生长的技术规范用语知识库。</p>' +
      '</header>' +

      '<div class="about-block">' +
        '<h2>这是什么</h2>' +
        '<p>「标准术语」收集软件工程中最常用的技术用语，给每个词条提供：一句话定义、通俗讲解、生活类比、「怎么对 AI 说」的沟通示例、常见误解，以及必要的图解与动画。目标是让初学者查得懂、让老手说得准、让人和 AI 协作时少一些鸡同鸭讲。</p>' +

        '<h2>内容结构</h2>' +
        '<ul>' +
          '<li>全站词条按 <b>10 大分类</b>组织：编程基础、数据结构与算法、前端、后端、数据库、网络协议、Git 协作、工程实践、架构设计、AI 与大模型。</li>' +
          '<li>每个词条带 <b>核心 / 常用 / 进阶</b>三档重要度与若干标签，可交叉筛选。</li>' +
          '<li>「学习路线」把散落的词条串成四条循序渐进的路径。</li>' +
          '<li>所有数据存放在 <code>assets/js/data/terms.*.js</code>，纯静态、无后端。</li>' +
        '</ul>' +

        '<h2>如何贡献一个词条</h2>' +
        '<ul>' +
          '<li>Fork 仓库，找到词条所属分类对应的 <code>terms.*.js</code> 文件。</li>' +
          '<li>按下面的模板追加一个对象（放在文件内数组里），保持风格一致。</li>' +
          '<li>运行 <code>node tools/validate.js</code> 确认 ID 唯一、related 引用有效。</li>' +
          '<li>提交 Pull Request，写清楚新增了哪些词条。</li>' +
        '</ul>' +
        '<pre>' + esc(TERM_TEMPLATE) + '</pre>' +

        '<h2>图示与动画机制</h2>' +
        '<ul>' +
          '<li>内置图解为手绘 SVG（<code>assets/js/visuals.js</code>），动画为 CSS 场景（<code>assets/js/anims.js</code>），随主题变色、离线可用。</li>' +
          '<li>词条也可以挂外部图片：<code>visual: { kind:"img", src:"assets/img/xx.png" }</code>；尚未就绪的图片写成 <code>{ kind:"img", pending:true }</code>，页面会显示优雅的占位块，后续补上 ID / 文件即可。</li>' +
        '</ul>' +

        '<h2>部署方式（零构建）</h2>' +
        '<ul>' +
          '<li>本站没有任何构建步骤：<code>git pull</code> 之后目录本身就是成品。</li>' +
          '<li>Nginx：把 <code>root</code> 指向仓库目录即可（参考 <code>deploy/nginx.conf.example</code>）。</li>' +
          '<li>GitHub Pages / Vercel / Netlify：选择仓库根目录作为发布目录，无需配置框架。</li>' +
          '<li>本地预览：直接双击 <code>index.html</code>，或 <code>npx serve .</code>。</li>' +
        '</ul>' +

        '<h2>授权</h2>' +
        '<p>站点代码采用 MIT 协议；词条内容建议以 <b>CC BY-SA 4.0</b> 共享，转载请署名并以相同方式共享。</p>' +
      '</div>';

    return { title: '关于本站 · 标准术语', html: html, mount: null };
  }

  /* ================= 404 ================= */

  function renderNotFound() {
    var sugg = W.STD_SEARCH.suggestions(3);
    var html =
      '<div class="empty-state">' +
        '<h3>这里什么都没有</h3>' +
        '<p>访问的页面不存在或词条 ID 有误。</p>' +
        '<a class="btn btn-primary" href="#/">回到首页</a>' +
      '</div>' +
      '<h2 class="section-label">随便看看</h2>' +
      '<div class="term-grid">' + sugg.map(function (t) { return C.termCard(t); }).join('') + '</div>';
    return { title: '未找到 · 标准术语', html: html, mount: null };
  }

  /* 分类图标注册表：分类页 hero 与左侧导航共用 */
  W.STD_UTIL.CAT_ICONS = CAT_ICONS;

  W.STD_VIEWS = {
    home: renderHome,
    category: renderCategory,
    term: renderTerm,
    search: renderSearchPage,
    favs: renderFavs,
    visuals: renderVisualIndex,
    visualGroup: renderVisualGroup,
    styles: renderStyleIndex,
    style: renderStyleDetail,
    libs: renderLibs,
    lib: renderLibDetail,
    about: renderAbout,
    notFound: renderNotFound
  };
})(window);
