/* ============================================================
   components.js · 可复用 UI 片段（卡片 / 徽章 / 媒体槽位）
   挂载：window.STD_COMPONENTS
   ============================================================ */
(function (W) {
  'use strict';

  var esc = W.STD_UTIL.esc, ICONS = W.STD_UTIL.ICONS, LEVELS = W.STD_UTIL.LEVELS;

  function levelBadge(level) {
    var l = LEVELS[level] || LEVELS.common;
    return '<span class="badge ' + l.cls + '">' + l.label + '</span>';
  }

  function tagChips(tags) {
    return (tags || []).map(function (t) {
      return '<a class="tag-chip" href="#/s/' + encodeURIComponent(t) + '">' + esc(t) + '</a>';
    }).join('');
  }

  /** 词条卡（分类页 / 搜索结果）；query 用于高亮 */
  function termCard(t, query) {
    var hl = W.STD_SEARCH.highlight;
    return '' +
      '<a class="term-card" href="#/t/' + encodeURIComponent(t.id) + '">' +
        '<div class="term-card-top">' +
          '<span class="zh">' + hl(t.zh, query) + '</span>' +
          '<span class="en">' + hl(t.en, query) + '</span>' +
          levelBadge(t.level) +
        '</div>' +
        '<p class="term-card-summary">' + hl(t.summary, query) + '</p>' +
        '<div class="term-card-foot">' +
          (t.tags || []).slice(0, 3).map(function (tag) {
            return '<span class="tag-mini">' + hl(tag, query) + '</span>';
          }).join('') +
        '</div>' +
      '</a>';
  }

  /** 相关词条小卡 */
  function miniTermCard(t) {
    return '' +
      '<a class="term-card" href="#/t/' + encodeURIComponent(t.id) + '">' +
        '<div class="term-card-top">' +
          '<span class="zh">' + esc(t.zh) + '</span>' +
          '<span class="en">' + esc(t.en) + '</span>' +
        '</div>' +
        '<p class="term-card-summary">' + esc(t.summary) + '</p>' +
      '</a>';
  }

  /** 首页分类卡 */
  function catCard(cat, count, learnedCount) {
    var pct = count ? Math.round((learnedCount / count) * 100) : 0;
    return '' +
      '<a class="cat-card" href="#/c/' + encodeURIComponent(cat.id) + '" style="--cat-color:' + esc(cat.color) + '">' +
        '<div class="cat-card-name"><span class="zh">' + esc(cat.name) + '</span><span class="en">' + esc(cat.en) + '</span></div>' +
        '<p class="cat-card-desc">' + esc(cat.desc) + '</p>' +
        '<div class="cat-card-meta">' +
          '<span>' + count + ' 词条</span>' +
          '<span class="cat-card-bar"><i style="width:' + pct + '%"></i></span>' +
          '<span>' + (learnedCount ? '已学 ' + learnedCount : '未开始') + '</span>' +
        '</div>' +
      '</a>';
  }

  /* ---------------- 媒体槽位 ---------------- */

  function pendingFig(note) {
    return '<div class="fig-pending">' + ICONS.bulb +
      '<span>' + esc(note || '图示占位：该词条配图待补充') + '</span></div>';
  }

  /**
   * 词条 visual 字段 → HTML。
   * 支持：{kind:'svg', id} | {kind:'anim', id} | {kind:'img', src?, pending?}
   * 注册表缺失时优雅降级为占位块，页面永不破版。
   */
  function mediaHtml(term) {
    var v = term.visual;
    if (!v) return '';

    if (v.kind === 'svg') {
      var vis = W.STD_VISUALS && W.STD_VISUALS[v.id];
      var body = vis
        ? '<div class="fig-body">' + vis.svg + '</div>'
        : '<div class="fig-body">' + pendingFig('SVG 图解「' + v.id + '」待补充') + '</div>';
      return '' +
        '<figure class="media-slot">' +
          '<div class="fig">' +
            '<div class="fig-head"><span class="fig-kind">图解</span>' + esc(v.caption || (vis && vis.title) || '') + '</div>' +
            body +
          '</div>' +
          (v.note ? '<figcaption class="fig-caption">' + esc(v.note) + '</figcaption>' : '') +
        '</figure>';
    }

    if (v.kind === 'anim') {
      var def = W.STD_ANIMS && W.STD_ANIMS[v.id];
      var stageInner =
        '<div class="anim-stage-wrap">' +
          '<div class="anim-stage" data-anim="' + esc(v.id) + '" data-stage-class="' + esc((def && def.stageClass) || '') + '">' +
          '</div>' +
        '</div>';
      return '' +
        '<figure class="media-slot">' +
          '<div class="fig">' +
            '<div class="fig-head"><span class="fig-kind">动画</span>' + esc(v.caption || (def && def.title) || '') + '</div>' +
            '<div class="anim-controls">' +
              '<button type="button" class="btn btn-small anim-toggle" aria-pressed="false">' + ICONS.pause + '<span>暂停</span></button>' +
              '<button type="button" class="btn btn-small anim-replay">' + ICONS.replay + '<span>重播</span></button>' +
              '<span class="spacer"></span>' +
              '<span class="anim-hint">' + esc((def && def.hint) || '自动循环播放') + '</span>' +
            '</div>' +
            stageInner +
          '</div>' +
          (v.note ? '<figcaption class="fig-caption">' + esc(v.note) + '</figcaption>' : '') +
        '</figure>';
    }

    if (v.kind === 'img') {
      if (v.pending || !v.src) {
        return '<figure class="media-slot">' + pendingFig(v.note || '示意图待补充：管理员可通过媒体 ID 填充此槽位') + '</figure>';
      }
      return '' +
        '<figure class="media-slot fig-img">' +
          '<div class="fig">' +
            '<img loading="lazy" src="' + esc(v.src) + '" alt="' + esc(v.alt || v.caption || term.zh + ' 示意图') + '" />' +
            '<figcaption class="fig-caption">' + esc(v.credit ? '图片来源：' + v.credit + ' · ' : '') + esc(v.caption || '') + '</figcaption>' +
          '</div>' +
        '</figure>';
    }

    return '';
  }

  /** 视图注入后调用：挂载动画场景与控件 */
  function mountMedia(scope) {
    var stages = scope.querySelectorAll('[data-anim]');
    Array.prototype.forEach.call(stages, function (stage) {
      var fig = stage.closest('.fig');
      var def = W.STD_ANIMS && W.STD_ANIMS[stage.getAttribute('data-anim')];
      if (!def) {
        if (fig) fig.innerHTML = '<div class="fig-body">' + pendingFig('动画资源待补充') + '</div>';
        return;
      }
      if (def.stageClass) stage.classList.add(def.stageClass);

      var build = function () {
        stage.innerHTML = '';
        stage.classList.remove('paused');
        def.build(stage);
        var btn = fig && fig.querySelector('.anim-toggle');
        if (btn) {
          btn.setAttribute('aria-pressed', 'false');
          btn.innerHTML = W.STD_UTIL.ICONS.pause + '<span>暂停</span>';
        }
      };
      build();
      stage._rebuild = build;

      if (!fig) return;
      var toggle = fig.querySelector('.anim-toggle');
      if (toggle) {
        toggle.addEventListener('click', function () {
          var paused = stage.classList.toggle('paused');
          toggle.setAttribute('aria-pressed', String(paused));
          toggle.innerHTML = paused
            ? W.STD_UTIL.ICONS.play + '<span>播放</span>'
            : W.STD_UTIL.ICONS.pause + '<span>暂停</span>';
        });
      }
      var replay = fig.querySelector('.anim-replay');
      if (replay) replay.addEventListener('click', function () { stage._rebuild(); });
    });
  }

  W.STD_COMPONENTS = {
    levelBadge: levelBadge,
    tagChips: tagChips,
    termCard: termCard,
    miniTermCard: miniTermCard,
    catCard: catCard,
    mediaHtml: mediaHtml,
    mountMedia: mountMedia,
    pendingFig: pendingFig
  };
})(window);
