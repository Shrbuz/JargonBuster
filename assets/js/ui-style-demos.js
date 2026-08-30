/* ============================================================
   ui-style-demos.js · UI 风格图鉴 · 风格小样注册表
   「同一组件套件，多种风格渲染」：内容固定（标题/文案/输入框/主按钮/幽灵按钮），
   只有 stl--<styleId> 皮肤不同 → 跨风格差异一眼可比。
   全部纯静态 HTML，无 JS；样式见 ui-extra.css。
   挂载：window.STD_STYLE_DEMOS（完整小样）· window.STD_STYLE_DEMO_KIT（构建器，列表页缩略复用）
   ============================================================ */
(function (W) {
  'use strict';

  /* 同一组件套件。mini=true 时输出紧凑版（列表页缩略）。extra 允许个别风格补充装饰节点。 */
  function kit(styleId, mini, extra) {
    return '' +
      '<div class="stl-kit stl--' + styleId + (mini ? ' stl-kit--mini' : '') + '">' +
        '<div class="stl-card">' +
          '<h4 class="stl-title">风格小样</h4>' +
          '<p class="stl-text">同一套组件，换一种风格——气质立刻不同。</p>' +
          (extra || '') +
          '<input class="stl-input" type="text" placeholder="输入框 Input" aria-label="风格小样输入框">' +
          '<div class="stl-actions">' +
            '<button type="button" class="stl-btn stl-btn-primary">主按钮</button>' +
            '<button type="button" class="stl-btn stl-btn-ghost">幽灵按钮</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* 终端风：多一行命令提示与闪烁光标，这是该风格的标志性语言 */
  function terminalExtra() {
    return '<div class="stl-term-line">$ init --style terminal<span class="stl-cursor"></span></div>';
  }

  var D = {};
  var IDS = [
    'skeuomorphism', 'flat-design', 'material-design', 'liquid-glass',
    'neumorphism', 'glassmorphism', 'neubrutalism', 'swiss-style',
    'japanese-editorial', 'terminal', 'voxel', '3d-illustration',
    'claymorphism', 'minimalism', 'bento-grid', 'memphis', 'y2k', 'acid-design'
  ];

  IDS.forEach(function (id) {
    D[id] = function () {
      if (id === 'bento-grid') return bentoKit(false);
      if (id === 'terminal') return kit(id, false, terminalExtra());
      return kit(id, false);
    };
  });

  /* Bento Grid 的本体就是布局：格子有大小，单独成套件 */
  function bentoKit(mini) {
    return '' +
      '<div class="stl-kit stl--bento-grid' + (mini ? ' stl-kit--mini' : '') + '">' +
        '<div class="stl-bento">' +
          '<div class="stl-bento-cell stl-bento-big">' +
            '<h4 class="stl-title">风格小样</h4>' +
            '<p class="stl-text">格子有大小，节奏即信息。</p>' +
          '</div>' +
          '<div class="stl-bento-cell stl-bento-center"><button type="button" class="stl-btn stl-btn-primary">主按钮</button></div>' +
          '<div class="stl-bento-cell"><input class="stl-input" type="text" placeholder="输入框" aria-label="风格小样输入框"></div>' +
          '<div class="stl-bento-cell stl-bento-center"><button type="button" class="stl-btn stl-btn-ghost">幽灵按钮</button></div>' +
        '</div>' +
      '</div>';
  }

  W.STD_STYLE_DEMOS = D;
  W.STD_STYLE_DEMO_KIT = function (styleId, mini) {
    if (styleId === 'bento-grid') return bentoKit(!!mini);
    if (styleId === 'terminal') return kit(styleId, !!mini, terminalExtra());
    return kit(styleId, !!mini);
  };
})(window);
