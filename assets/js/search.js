/* ============================================================
   search.js · 轻量评分搜索 + 高亮
   匹配范围：中文 / English / 别名 / 标签 / 一句话定义 / 讲解正文 / 示例句
   规则：多关键词取 AND（每个词都需命中至少一个字段），按累计分排序。
   挂载：window.STD_SEARCH
   ============================================================ */
(function (W) {
  'use strict';

  var DATA = null;
  function d() {
    if (!DATA) DATA = W.STD_DATA;
    return DATA;
  }

  function tokenize(q) {
    return String(q || '').trim().toLowerCase().split(/\s+/).filter(Boolean);
  }

  /** 单字段命中得分；idx===0 前缀命中加权 */
  function fieldScore(hay, tok, weight) {
    if (hay == null || hay === '') return 0;
    var idx = String(hay).toLowerCase().indexOf(tok);
    if (idx === -1) return 0;
    return idx === 0 ? weight * 1.5 : weight;
  }

  var LEVEL_BONUS = { core: 6, common: 3, advanced: 0 };

  function scoreTerm(t, tokens) {
    var aliases = (t.aliases || []).join('\n');
    var tags = (t.tags || []).join('\n');
    var plain = (t.plain || []).join('\n');
    var goodSay = ((t.talk && t.talk.good) || []).join('\n');
    var badSay = ((t.talk && t.talk.bad) || []).map(function (b) { return b.say; }).join('\n');

    var total = 0;
    for (var i = 0; i < tokens.length; i++) {
      var tok = tokens[i];
      var best = 0;
      best = Math.max(best, fieldScore(t.zh, tok, 100));
      best = Math.max(best, fieldScore(t.en, tok, 90));
      best = Math.max(best, fieldScore(aliases, tok, 75));
      best = Math.max(best, fieldScore(tags, tok, 60));
      best = Math.max(best, fieldScore(t.summary, tok, 45));
      best = Math.max(best, fieldScore(goodSay, tok, 18));
      best = Math.max(best, fieldScore(badSay, tok, 14));
      best = Math.max(best, fieldScore(plain, tok, 10));
      if (best === 0) return 0; // AND 语义
      total += best;
    }
    return total + (LEVEL_BONUS[t.level] || 0);
  }

  /** @returns {Array<{term:object, score:number}>} 相关度降序 */
  function search(query) {
    var tokens = tokenize(query);
    if (!tokens.length) return [];
    var out = [];
    d().terms.forEach(function (t) {
      var s = scoreTerm(t, tokens);
      if (s > 0) out.push({ term: t, score: s });
    });
    out.sort(function (a, b) { return b.score - a.score; });
    return out;
  }

  /** 图鉴元素检索：标准名 / 英文 / 别名 / 描述，与词条搜索同样 AND 语义、按累计分排序 */
  function searchVisuals(query) {
    var tokens = tokenize(query);
    if (!tokens.length || !W.STD_VISUAL_GROUPS) return [];
    var out = [];
    W.STD_VISUAL_GROUPS.forEach(function (g) {
      g.items.forEach(function (it) {
        var aliases = (it.aliases || []).join('\n');
        var total = 0;
        for (var i = 0; i < tokens.length; i++) {
          var tok = tokens[i];
          var best = fieldScore(it.name, tok, 100);
          best = Math.max(best, fieldScore(it.en, tok, 90));
          best = Math.max(best, fieldScore(aliases, tok, 80));
          best = Math.max(best, fieldScore(it.desc, tok, 40));
          if (best === 0) { total = 0; break; } // AND 语义
          total += best;
        }
        if (total > 0) out.push({ item: it, group: g, score: total });
      });
    });
    out.sort(function (a, b) { return b.score - a.score; });
    return out;
  }

  /** 将 text 中命中的片段包上 <mark>（安全转义后输出） */
  function highlight(text, query) {
    var raw = String(text == null ? '' : text);
    var tokens = tokenize(query);
    if (!tokens.length) return W.STD_UTIL.esc(raw);

    var low = raw.toLowerCase();
    var ranges = [];
    tokens.forEach(function (tok) {
      var from = 0, idx;
      while ((idx = low.indexOf(tok, from)) !== -1) {
        ranges.push([idx, idx + tok.length]);
        from = idx + tok.length;
      }
    });
    if (!ranges.length) return W.STD_UTIL.esc(raw);

    ranges.sort(function (a, b) { return a[0] - b[0]; });
    var merged = [];
    ranges.forEach(function (r) {
      var last = merged[merged.length - 1];
      if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
      else merged.push([r[0], r[1]]);
    });

    var out = '', pos = 0;
    merged.forEach(function (r) {
      out += W.STD_UTIL.esc(raw.slice(pos, r[0])) +
             '<mark>' + W.STD_UTIL.esc(raw.slice(r[0], r[1])) + '</mark>';
      pos = r[1];
    });
    out += W.STD_UTIL.esc(raw.slice(pos));
    return out;
  }

  /** 无结果时的推荐：核心词条优先随机取样 */
  function suggestions(n) {
    var terms = d().terms.slice();
    var core = terms.filter(function (t) { return t.level === 'core'; });
    var pool = core.length ? core : terms;
    var out = [];
    var used = new Set();
    n = Math.min(n || 6, pool.length);
    while (out.length < n) {
      var i = Math.floor(Math.random() * pool.length);
      if (!used.has(pool[i].id)) { used.add(pool[i].id); out.push(pool[i]); }
    }
    return out;
  }

  W.STD_SEARCH = { search: search, searchVisuals: searchVisuals, highlight: highlight, suggestions: suggestions, tokenize: tokenize };
})(window);
