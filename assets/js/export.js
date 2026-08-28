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

  function downloadBlob(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = W.document.createElement('a');
    a.href = url;
    a.download = filename || 'export.png';
    W.document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }

  /**
   * 把 node（如 .vs-stage）导出为 PNG 并下载。
   * 返回 Promise<dataURL>，可据此预览或复用。
   */
  function nodeToPng(node, filename) {
    return new Promise(function (resolve, reject) {
      if (!node) { reject(new Error('node 为空')); return; }
      var rect = node.getBoundingClientRect();
      var w = Math.max(1, Math.round(rect.width));
      var h = Math.max(1, Math.round(rect.height));

      var clone = buildClone(node);
      // 显式尺寸放到样式串末尾，确保覆盖计算样式里的 width/height
      clone.setAttribute('style', (clone.getAttribute('style') || '') + ';width:' + w + 'px;height:' + h + 'px;');

      var svg =
        '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' +
          '<foreignObject x="0" y="0" width="' + w + '" height="' + h + '">' +
            '<div xmlns="http://www.w3.org/1999/xhtml">' + clone.outerHTML + '</div>' +
          '</foreignObject>' +
        '</svg>';
      var url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);

      var img = new W.Image();
      img.onload = function () {
        try {
          var scale = 2; // 固定 2x，保证推广素材清晰
          var canvas = W.document.createElement('canvas');
          canvas.width = Math.round(w * scale);
          canvas.height = Math.round(h * scale);
          var ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.scale(scale, scale);
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(function (blob) {
            if (!blob) { reject(new Error('toBlob 失败')); return; }
            downloadBlob(blob, filename);
            resolve(canvas.toDataURL('image/png'));
          }, 'image/png');
        } catch (e) { reject(e); }
      };
      img.onerror = function () { reject(new Error('SVG 渲染失败')); };
      img.src = url;
    });
  }

  W.STD_EXPORT = { nodeToPng: nodeToPng };
})(window);
