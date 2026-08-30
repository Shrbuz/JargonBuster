/* ============================================================
   util.js · 通用工具：转义 / 防抖 / 复制 / Toast / 图标 / 词级徽章
   挂载：window.STD_UTIL
   ============================================================ */
(function (W) {
  'use strict';

  /** HTML 转义（所有插值默认经过它，防注入） */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function debounce(fn, ms) {
    var t;
    return function () {
      var args = arguments, self = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(self, args); }, ms);
    };
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      // file:// 或旧浏览器降级方案
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;top:-999px;opacity:0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (_) { /* ignore */ }
      ta.remove();
      return ok;
    }
  }

  var toastTimer = null;
  function toast(msg) {
    var el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 1600);
  }

  /* ---- 内联小图标（描边风格，统一 viewBox 24） ---- */
  function i(paths, size) {
    return '<svg width="' + (size || 16) + '" height="' + (size || 16) +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      paths + '</svg>';
  }
  var ICONS = {
    check: i('<path d="M4 12.5 9.5 18 20 6.5"/>'),
    cross: i('<path d="M6 6l12 12M18 6L6 18"/>'),
    bulb: i('<path d="M9 18h6M10 21h4M12 3a6 6 0 0 1 3.5 10.9c-.8.6-1.5 1.6-1.5 2.6V17h-4v-.5c0-1-.7-2-1.5-2.6A6 6 0 0 1 12 3Z"/>'),
    copy: i('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>', 15),
    play: i('<path d="M7 4.5v15l13-7.5-13-7.5Z"/>'),
    pause: i('<path d="M7 4h3v16H7zM14 4h3v16h-3z"/>'),
    replay: i('<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>'),
    left: i('<path d="M15 5l-7 7 7 7"/>'),
    right: i('<path d="M9 5l7 7-7 7"/>'),
    down: i('<path d="M5 9l7 7 7-7"/>'),
    star: i('<path d="m12 3 2.7 5.8 6.3.8-4.6 4.3 1.2 6.1L12 17l-5.6 3 1.2-6.1L3 9.6l6.3-.8L12 3Z"/>'),
    eye: i('<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>'),
    book: i('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>'),
    palette: i('<path d="M12 21a9 9 0 1 1 9-9c0 2.2-1.8 3.5-3.5 3.5H15a2 2 0 0 0-1.4 3.4c.3.4.4.8.4 1.1 0 .6-.6 1-2 1Z"/><circle cx="7.6" cy="10.5" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16.4" cy="10.5" r="1"/>'),
    package: i('<path d="M16.5 9.4 7.5 4.2"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="M3.27 6.96 12 12.01l8.73-5.05"/><path d="M12 22.08V12"/>')
  };

  var LEVELS = {
    core:     { label: '核心', cls: 'badge-core' },
    common:   { label: '常用', cls: 'badge-common' },
    advanced: { label: '进阶', cls: 'badge-advanced' }
  };

  W.STD_UTIL = { esc: esc, debounce: debounce, copyText: copyText, toast: toast, ICONS: ICONS, LEVELS: LEVELS };
})(window);
