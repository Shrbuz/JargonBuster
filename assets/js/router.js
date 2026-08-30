/* ============================================================
   router.js · hash 路由
   路由表：#/ 首页 · #/c/:cat 分类 · #/t/:id 词条 · #/s/:q 搜索 · #/favs 收藏 · #/visuals 图鉴 · #/styles/:id 风格图鉴 · #/libs/:id 库图鉴 · #/about 关于
   挂载：window.STD_ROUTER
   ============================================================ */
(function (W) {
  'use strict';

  var VIEWS = null; // 延迟取，避免加载顺序问题

  function parseHash() {
    var h = W.location.hash.replace(/^#\/?/, '');
    var parts = h.split('/').filter(Boolean);

    if (!parts.length) return { name: 'home' };
    switch (parts[0]) {
      case 'c':
        return parts[1]
          ? { name: 'category', id: decodeURIComponent(parts[1]) }
          : { name: 'home' };
      case 't':
        return parts[1]
          ? { name: 'term', id: decodeURIComponent(parts[1]) }
          : { name: 'home' };
      case 's':
        var q = decodeURIComponent(parts.slice(1).join('/'));
        return { name: 'search', q: q };
      case 'about':
        return { name: 'about' };
      case 'favs':
        return { name: 'favs' };
      case 'visuals':
        if (parts[2]) {
          return {
            name: 'visualGroup',
            group: decodeURIComponent(parts[1]),
            item: decodeURIComponent(parts[2])
          };
        }
        if (parts[1]) return { name: 'visualGroup', group: decodeURIComponent(parts[1]) };
        return { name: 'visualIndex' };
      case 'styles':
        return parts[1]
          ? { name: 'styleDetail', id: decodeURIComponent(parts[1]) }
          : { name: 'styleIndex' };
      case 'libs':
        return parts[1]
          ? { name: 'libDetail', id: decodeURIComponent(parts[1]) }
          : { name: 'libIndex' };
      default:
        return { name: 'notfound' };
    }
  }

  function resolveView(route) {
    if (!VIEWS) VIEWS = W.STD_VIEWS;
    switch (route.name) {
      case 'home': return VIEWS.home();
      case 'category': return VIEWS.category(route.id) || VIEWS.notFound();
      case 'term': return VIEWS.term(route.id) || VIEWS.notFound();
      case 'search': return route.q ? VIEWS.search(route.q) : VIEWS.home();
      case 'about': return VIEWS.about();
      case 'favs': return VIEWS.favs();
      case 'visualIndex': return VIEWS.visuals();
      case 'visualGroup': return VIEWS.visualGroup(route.group, route.item) || VIEWS.notFound();
      case 'styleIndex': return VIEWS.styles();
      case 'styleDetail': return VIEWS.style(route.id) || VIEWS.notFound();
      case 'libIndex': return VIEWS.libs();
      case 'libDetail': return VIEWS.lib(route.id) || VIEWS.notFound();
      default: return VIEWS.notFound();
    }
  }

  var currentHandler = null;

  /**
   * @param {HTMLElement} container 渲染容器
   * @param {(route:string)=>void} onNavigated 路由变化回调（用于侧栏高亮）
   */
  function init(container, onNavigated) {
    function handle() {
      var route = parseHash();
      var view = resolveView(route);
      container.innerHTML = view.html;
      // 先注入再挂载，mount 内可安全查询子元素
      if (typeof view.mount === 'function') view.mount(container);
      document.title = view.title || '标准术语';
      W.scrollTo(0, 0);
      if (typeof onNavigated === 'function') onNavigated(route);
    }

    currentHandler = handle;
    W.addEventListener('hashchange', handle);
    handle();
  }

  /** 不改变 hash 的前提下重新渲染当前视图（如收藏页移除词条后刷新列表） */
  function refresh() {
    if (currentHandler) currentHandler();
  }

  W.STD_ROUTER = { init: init, parseHash: parseHash, refresh: refresh };
})(window);
