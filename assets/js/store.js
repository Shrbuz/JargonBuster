/* ============================================================
   store.js · 本地状态（localStorage 安全封装）
   学习标记 / 收藏 / 最近浏览 / 主题
   挂载：window.STD_STORE
   ============================================================ */
(function (W) {
  'use strict';

  var PREFIX = 'std-term:';
  var MAX_RECENT = 8;

  function read(key, fallback) {
    try {
      var v = localStorage.getItem(PREFIX + key);
      return v == null ? fallback : JSON.parse(v);
    } catch (e) { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch (e) { /* 隐私模式等场景静默降级 */ }
  }

  /* ---------- 主题 ---------- */
  function getTheme() { return read('theme', null); }
  function setTheme(t) { write('theme', t); }

  /* ---------- 已学标记 { id: timestamp } ---------- */
  function getLearned() { return read('learned', {}); }
  function isLearned(id) { return !!getLearned()[id]; }
  function toggleLearned(id) {
    var m = getLearned();
    if (m[id]) { delete m[id]; write('learned', m); return false; }
    m[id] = Date.now();
    write('learned', m);
    return true;
  }
  function learnedCount() { return Object.keys(getLearned()).length; }

  /* ---------- 收藏 [id] ---------- */
  function getFavs() { return read('favs', []); }
  function isFav(id) { return getFavs().indexOf(id) !== -1; }
  function toggleFav(id) {
    var arr = getFavs();
    var i = arr.indexOf(id);
    if (i === -1) { arr.unshift(id); write('favs', arr); return true; }
    arr.splice(i, 1);
    write('favs', arr);
    return false;
  }

  /* ---------- 最近浏览 [id]（最新在前，去重限长） ---------- */
  function getRecent() { return read('recent', []); }
  function pushRecent(id) {
    var arr = getRecent().filter(function (x) { return x !== id; });
    arr.unshift(id);
    if (arr.length > MAX_RECENT) arr.length = MAX_RECENT;
    write('recent', arr);
  }

  W.STD_STORE = {
    getTheme: getTheme, setTheme: setTheme,
    isLearned: isLearned, toggleLearned: toggleLearned, learnedCount: learnedCount,
    getFavs: getFavs, isFav: isFav, toggleFav: toggleFav,
    getRecent: getRecent, pushRecent: pushRecent
  };
})(window);
