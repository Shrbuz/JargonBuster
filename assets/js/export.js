/* ============================================================
   export.js · DOM 节点导出为 PNG
   把任意 DOM 元素（如可视化容器的 .vs-stage）绘制为 PNG 并触发下载。
   首选 modern-screenshot（已在页面加载，支持 backdrop-filter / color-mix /
   CSS filter 等现代特性，渲染一致性远优于手写 SVG foreignObject）；
   不可用时回退到内置克隆方案（深度克隆 + 内联样式 + 伪元素物化 →
   SVG foreignObject → canvas）。
   挂载：window.STD_EXPORT
   ============================================================ */
(function (W) {
  'use strict';

  function isEl(n) { return n && n.nodeType === 1; }

  /* ---------- 方案 A：modern-screenshot（首选） ---------- */
  function captureWithModernScreenshot(node, opts) {
    if (!W.modernScreenshot || !W.modernScreenshot.domToCanvas) return Promise.resolve(null);
    var scale = opts.scale || 2;
    // 导出前隐藏标记为 data-export-exclude 的节点（如导出按钮本身）
    var excluded = node.querySelectorAll('[data-export-exclude]');
    var prevDisplay = [];
    excluded.forEach(function (n) {
      prevDisplay.push(n.style.display);
      n.style.display = 'none';
    });
    function restore() {
      excluded.forEach(function (n, i) {
        if (prevDisplay[i]) n.style.display = prevDisplay[i];
        else n.style.removeProperty('display');
      });
    }
    return W.modernScreenshot.domToCanvas(node, {
      scale: scale,
      backgroundColor: null,
      debug: false
    }).then(function (canvas) {
      restore();
      return canvas.toDataURL(opts.format || 'image/png', opts.quality != null ? opts.quality : 0.92);
    }).catch(function (e) {
      console.warn('[export] modern-screenshot 失败，回退内置方案:', e);
      restore();
      return null;
    });
  }

  /* ---------- 方案 B：内置 SVG foreignObject 克隆（兜底） ---------- */

  function pseudoNode(src, which) {
    var ps = W.getComputedStyle(src, which);
    if (!ps || ps.display === 'none') return null;
    var content = ps.content || '';
    var isText = content && content !== 'none' && content !== 'normal' && content !== '""' && content !== "''";
    if (!isText) {
      var hasBox =
        (ps.backgroundColor && ps.backgroundColor !== 'transparent' && ps.backgroundColor !== 'rgba(0, 0, 0, 0)') ||
        (ps.backgroundImage && ps.backgroundImage !== 'none') ||
        parseFloat(ps.borderTopWidth) > 0 || parseFloat(ps.borderBottomWidth) > 0 ||
        parseFloat(ps.borderLeftWidth) > 0 || parseFloat(ps.borderRightWidth) > 0 ||
        parseFloat(ps.width) > 0 || parseFloat(ps.height) > 0;
      if (!hasBox) return null;
    }
    var el = W.document.createElement('i');
    el.setAttribute('style', ps.cssText);
    if (isText) {
      var txt = content.replace(/^["']|["']$/g, '');
      if (txt) el.textContent = txt;
    }
    return el;
  }

  var SVG_PRESENTATION_ATTRS = ['fill', 'stroke', 'stop-color', 'flood-color', 'lighting-color', 'color'];

  function buildClone(srcRoot) {
    var dstRoot = srcRoot.cloneNode(true);

    function walk(src, dst) {
      if (!isEl(src)) return;
      var cs = W.getComputedStyle(src);
      if (cs) {
        var styleText = cs.cssText;
        dst.setAttribute('style', (dst.getAttribute('style') || '') + styleText);

        var pos = cs.getPropertyValue('position');
        if (pos === 'fixed' || pos === 'sticky') {
          dst.style.position = 'relative';
        }

        if (cs.getPropertyValue('overflow-y') !== 'visible') dst.style.overflowY = 'visible';
        if (cs.getPropertyValue('overflow-x') !== 'visible') dst.style.overflowX = 'visible';

        if (src.namespaceURI === 'http://www.w3.org/2000/svg') {
          SVG_PRESENTATION_ATTRS.forEach(function (prop) {
            var val = cs.getPropertyValue(prop);
            if (val && val !== 'none' && val !== '') dst.setAttribute(prop, val);
          });
        }
      }

      var n = src.children.length;
      for (var i = 0; i < n; i++) walk(src.children[i], dst.children[i]);
      var before = pseudoNode(src, '::before');
      var after = pseudoNode(src, '::after');
      if (before) dst.insertBefore(before, dst.firstChild);
      if (after) dst.appendChild(after);
    }

    walk(srcRoot, dstRoot);

    dstRoot.querySelectorAll('[data-export-exclude]').forEach(function (n) { n.remove(); });

    dstRoot.querySelectorAll('svg').forEach(function (s) {
      if (!s.getAttribute('xmlns')) s.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    });

    return dstRoot;
  }

  var VOID_TAGS = 'area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr';
  var VOID_REGEX = new RegExp('<(' + VOID_TAGS + ')([\\s\\S]*?)>', 'gi');

  function escapeAmp(html) {
    return html.replace(/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');
  }

  function selfCloseVoid(html) {
    return html.replace(VOID_REGEX, function (match, tag, attrs) {
      if (attrs.charAt(attrs.length - 1) === '/') return match;
      return '<' + tag + attrs + '/>';
    });
  }

  function captureWithClone(node, opts) {
    var format = opts.format || 'image/png';
    var quality = opts.quality != null ? opts.quality : 0.92;
    var maxWidth = opts.maxWidth || 0;
    var maxHeight = opts.maxHeight || 0;
    var scale = opts.scale || 2;
    return new Promise(function (resolve, reject) {
      if (!node) { reject(new Error('node 为空')); return; }
      var rect = node.getBoundingClientRect();
      var w = Math.max(1, Math.round(rect.width));
      var h = Math.max(1, Math.round(rect.height));
      if (opts.fullPage) {
        w = Math.max(w, Math.round(node.scrollWidth || w));
        h = Math.max(h, Math.round(node.scrollHeight || h));
      }
      if (maxHeight > 0 && h > maxHeight) h = maxHeight;
      if (maxWidth > 0 && w * scale > maxWidth) scale = maxWidth / w;
      scale = Math.min(3, Math.max(0.2, scale));

      var clone = buildClone(node);
      var existingStyle = clone.getAttribute('style') || '';
      clone.setAttribute('style', existingStyle + (existingStyle ? ';' : '') + 'width:' + w + 'px;height:' + h + 'px;');

      var html = selfCloseVoid(escapeAmp(clone.outerHTML));

      var svg =
        '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' +
          '<foreignObject x="0" y="0" width="' + w + '" height="' + h + '">' +
            '<div xmlns="http://www.w3.org/1999/xhtml">' + html + '</div>' +
          '</foreignObject>' +
        '</svg>';
      var url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);

      var img = new W.Image();
      img.onload = function () {
        try {
          var canvas = W.document.createElement('canvas');
          canvas.width = Math.max(1, Math.round(w * scale));
          canvas.height = Math.max(1, Math.round(h * scale));
          var ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.scale(scale, scale);
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL(format, quality));
        } catch (e) { reject(e); }
      };
      img.onerror = function () { reject(new Error('SVG 渲染失败')); };
      img.src = url;
    });
  }

  /* ---------- 统一入口 ---------- */

  /**
   * 把 node 渲染为图片 dataURL（不触发下载）。
   * 首选 modern-screenshot，失败回退内置克隆方案。
   */
  function nodeToDataUrl(node, opts) {
    opts = opts || {};
    // 方案 A：modern-screenshot
    return captureWithModernScreenshot(node, opts).then(function (dataUrl) {
      if (dataUrl) return dataUrl;
      // 方案 B：内置克隆（兜底）
      return captureWithClone(node, opts);
    });
  }

  /**
   * 把 node（如 .vs-stage）导出为 PNG 并下载。
   * 返回 Promise<dataURL>，可据此预览或复用。
   */
  function nodeToPng(node, filename) {
    return nodeToDataUrl(node, { format: 'image/png', scale: 2 }).then(function (dataUrl) {
      var a = W.document.createElement('a');
      a.href = dataUrl;
      a.download = filename || 'export.png';
      W.document.body.appendChild(a);
      a.click();
      a.remove();
      return dataUrl;
    });
  }

  W.STD_EXPORT = { nodeToDataUrl: nodeToDataUrl, nodeToPng: nodeToPng };
})(window);
