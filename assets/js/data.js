/* ============================================================
   data.js · 数据聚合层
   汇总各 terms.*.js 追加到 window.STD_TERMS 的词条与分类元数据，
   提供索引、统计、每日一词、相关/相邻词条等查询。
   挂载：window.STD_DATA
   ============================================================ */
(function (W) {
  'use strict';

  var cats = W.STD_CATEGORIES || [];
  var terms = W.STD_TERMS || [];

  var catMap = new Map(cats.map(function (c) { return [c.id, c]; }));
  var termMap = new Map(terms.map(function (t) { return [t.id, t]; }));

  function getCategory(catId) { return catMap.get(catId) || null; }

  function termsOf(catId) {
    return terms.filter(function (t) { return t.cat === catId; });
  }

  function catCounts() {
    var m = {};
    cats.forEach(function (c) { m[c.id] = 0; });
    terms.forEach(function (t) { if (m[t.cat] != null) m[t.cat]++; });
    return m;
  }

  /** 全站标签 → 数量，按数量降序 */
  function allTags() {
    var m = {};
    terms.forEach(function (t) {
      (t.tags || []).forEach(function (tag) { m[tag] = (m[tag] || 0) + 1; });
    });
    return Object.keys(m)
      .map(function (k) { return { tag: k, count: m[k] }; })
      .sort(function (a, b) { return b.count - a.count; });
  }

  /** 站点统计：词条数 / 图示数 / 动画数 */
  function stats() {
    var svg = 0, anim = 0, img = 0;
    terms.forEach(function (t) {
      var v = t.visual;
      if (!v) return;
      if (v.kind === 'svg') svg++;
      else if (v.kind === 'anim') anim++;
      else if (v.kind === 'img' && !v.pending && v.src) img++;
    });
    return { terms: terms.length, cats: cats.length, svg: svg, anim: anim, img: img };
  }

  /** 每日一词：按日期稳定取词，当天所有人相同 */
  function dailyTerm(now) {
    if (!terms.length) return null;
    var d = now ? new Date(now) : new Date();
    var seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    return terms[seed % terms.length];
  }

  /** 解析相关词条 id → 对象（过滤掉不存在的引用） */
  function relatedOf(term) {
    return (term.related || [])
      .map(function (id) { return termMap.get(id) || null; })
      .filter(Boolean)
      .slice(0, 6);
  }

  /** 同分类内的前后词条（用于详情页翻页） */
  function neighborsOf(term) {
    var list = termsOf(term.cat);
    var i = list.findIndex(function (t) { return t.id === term.id; });
    return {
      prev: i > 0 ? list[i - 1] : null,
      next: i >= 0 && i < list.length - 1 ? list[i + 1] : null,
      index: i,
      total: list.length
    };
  }

  /**
   * 完整性自检（浏览器控制台可见；tools/validate.js 有更严格的离线版）
   * 返回问题数组，空数组代表通过。
   */
  function validate() {
    var problems = [];
    var seen = {};
    terms.forEach(function (t) {
      if (seen[t.id]) problems.push('词条 ID 重复: ' + t.id);
      seen[t.id] = true;
      if (!catMap.has(t.cat)) problems.push('[' + t.id + '] 分类不存在: ' + t.cat);
      ['en', 'zh', 'summary'].forEach(function (f) {
        if (!t[f]) problems.push('[' + t.id + '] 缺少字段: ' + f);
      });
      if (!Array.isArray(t.plain) || !t.plain.length) problems.push('[' + t.id + '] plain 应为非空数组');
      (t.related || []).forEach(function (r) {
        if (!termMap.has(r)) problems.push('[' + t.id + '] related 指向不存在的词条: ' + r);
      });
    });
    return problems;
  }

  W.STD_DATA = {
    cats: cats,
    terms: terms,
    catMap: catMap,
    termMap: termMap,
    getCategory: getCategory,
    termsOf: termsOf,
    catCounts: catCounts,
    allTags: allTags,
    stats: stats,
    dailyTerm: dailyTerm,
    relatedOf: relatedOf,
    neighborsOf: neighborsOf,
    validate: validate
  };
})(window);
