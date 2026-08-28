/* ============================================================
   export.js · DOM 节点导出为 PNG（零依赖）
   把任意 DOM 元素（如可视化容器的 .vs-stage）绘制为 PNG 并触发下载。
   实现思路：深度克隆 + 逐节点内联计算样式（含 ::before/::after 物化为
   真实节点）→ 序列化为 SVG foreignObject → Image 载入 → 绘制到 2x
   canvas → toBlob 下载。
   挂载：window.STD_EXPORT
   ============================================================ */
(function (W) {
  'use strict';

  var LOG = '[反馈截图]';

  function isEl(n) { return n && n.nodeType === 1; }

  /* 把某个元素的 ::before / ::after 物化为真实节点（含可见样式的才物化） */
  function pseudoNode(src, which) {
    var ps = W.getComputedStyle(src, which);
    if (!ps || ps.display === 'none') return null;
    var content = ps.content || '';
    var isText = content && content !== 'none' && content !== 'normal' && content !== '""' && content !== "''";
    if (!isText) {
      // content 为空但带着可见盒子（背景/边框/尺寸）→ 仍要物化
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

  /* 深度克隆 + 内联计算样式 + 伪元素物化 + 清理导出标记 */
  function buildClone(srcRoot) {
    var dstRoot = srcRoot.cloneNode(true);

    function walk(src, dst) {
      if (!isEl(src)) return;
      var cs = W.getComputedStyle(src);
      if (cs) dst.setAttribute('style', (dst.getAttribute('style') || '') + cs.cssText);
      var n = src.children.length;
      // 先按原结构递归子元素（此时 dst 尚未插入伪元素，索引一一对应）
      for (var i = 0; i < n; i++) walk(src.children[i], dst.children[i]);
      var before = pseudoNode(src, '::before');
      var after = pseudoNode(src, '::after');
      if (before) dst.insertBefore(before, dst.firstChild);
      if (after) dst.appendChild(after);
    }

    walk(srcRoot, dstRoot);

    // 剔除导出按钮等无需进图的节点
    dstRoot.querySelectorAll('[data-export-exclude]').forEach(function (n) { n.remove(); });

    // foreignObject 按 XML 解析，内联 SVG 必须带命名空间
    dstRoot.querySelectorAll('svg').forEach(function (s) {
      if (!s.getAttribute('xmlns')) s.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    });

    return dstRoot;
  }

  /* 把 HTML 字符串中未转义的 & 转成 &amp;（SVG 是严格 XML，未转义 & 会解析失败） */
  function escapeAmp(html) {
    return html.replace(/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');
  }

  /**
   * 把 node 渲染为图片 dataURL（不触发下载）。
   * @param {Element} node 要绘制的根元素
   * @param {Object} [opts]
   *   format: 'image/png' | 'image/jpeg'（默认 png）
   *   quality: JPEG 质量 0~1（默认 0.92）
   *   fullPage: 为 true 时按文档滚动尺寸绘制整页（默认按节点自身盒尺寸）
   *   maxWidth: 输出宽度上限（px），超过则整体等比缩小（默认不限）
   *   maxHeight: 输出高度上限（px），超过则截断（默认不限）
   *   scale: 基础倍率（默认 2；受 maxWidth 约束）
   * @returns {Promise<string>} dataURL
   */
  function nodeToDataUrl(node, opts) {
    opts = opts || {};
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
      console.log(LOG, '①尺寸计算', { node: node.tagName + '.' + (node.className || ''), rectW: rect.width, rectH: rect.height, scrollW: node.scrollWidth, scrollH: node.scrollHeight, finalW: w, finalH: h, scale: scale });

      var t0 = Date.now();
      var clone = buildClone(node);
      console.log(LOG, '②克隆完成', {耗时ms: Date.now() - t0, 克隆子元素数: clone.querySelectorAll('*').length});
      // 显式尺寸放到样式串末尾，确保覆盖计算样式里的 width/height
      clone.setAttribute('style', (clone.getAttribute('style') || '') + ';width:' + w + 'px;height:' + h + 'px;');

      // 关键：转义未转义的 &，否则 SVG(XML) 解析失败
      var html = escapeAmp(clone.outerHTML);

      var svg =
        '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' +
          '<foreignObject x="0" y="0" width="' + w + '" height="' + h + '">' +
            '<div xmlns="http://www.w3.org/1999/xhtml">' + html + '</div>' +
          '</foreignObject>' +
        '</svg>';
      var url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
      console.log(LOG, '③SVG生成', { svg字节数: svg.length, dataURL字节数: url.length });

      var img = new W.Image();
      var t1 = Date.now();
      img.onload = function () {
        console.log(LOG, '④图片加载完成', {耗时ms: Date.now() - t1, naturalW: img.naturalWidth, naturalH: img.naturalHeight});
        try {
          var canvas = W.document.createElement('canvas');
          canvas.width = Math.max(1, Math.round(w * scale));
          canvas.height = Math.max(1, Math.round(h * scale));
          var ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.scale(scale, scale);
          ctx.drawImage(img, 0, 0);
          var result = canvas.toDataURL(format, quality);
          console.log(LOG, '⑤绘制完成', { canvasW: canvas.width, canvasH: canvas.height, dataURL字节数: result.length, 总耗时ms: Date.now() - t0 });
          resolve(result);
        } catch (e) {
          console.error(LOG, '⑤绘制失败', e);
          reject(e);
        }
      };
      img.onerror = function (e) {
        console.error(LOG, '④图片加载失败(SVG渲染失败)', {耗时ms: Date.now() - t1, event: e});
        // 打出 SVG 前 3000 字符，便于定位具体哪段 HTML 导致解析失败
        console.error(LOG, '失败SVG前3000字符:\n', svg.substring(0, 3000));
        reject(new Error('SVG 渲染失败'));
      };
      img.src = url;
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
