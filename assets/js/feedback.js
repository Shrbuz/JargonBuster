/* ============================================================
   feedback.js · 全站反馈表单（零依赖）
   - 右下角悬浮按钮 → 弹窗
   - 自动带当前页面 ID（location.hash / pathname）+ 页面标题
   - 打开弹窗即自动截图并显示预览（可重新截图，点击预览图可放大）
   - 截图用 html2canvas（直接 DOM→canvas，不走 SVG foreignObject）
   - POST 到反馈收信服务；本地(localhost)自动指向 127.0.0.1:8899
   挂载：无（自执行注入 DOM）
   ============================================================ */
(function (W) {
  'use strict';

  var doc = W.document;
  var isLocal = /^(localhost|127\.0\.0\.1)$/.test(W.location.hostname);
  var isFile = W.location.protocol === 'file:';
  var ENDPOINT = isLocal ? 'http://127.0.0.1:8899/feedback/' : '/feedback/';
  var PAGE_ID = (W.location.hash || W.location.pathname || '/') || 'home';
  var PAGE_TITLE = doc.title || '';
  var CAPTURE_TIMEOUT = 15000; // html2canvas 整页截图可能较慢，给 15 秒

  var fab, modal, pageInput, descInput, contactInput, shotCheck, previewImg, submitBtn, recaptureBtn, shotStatus;
  var lightbox, lightboxImg;
  var currentShot = null;

  var SVG_MSG =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 1 1 16.1-3.8Z"/></svg>';

  function h(tag, cls, attrs, html) {
    var e = doc.createElement(tag);
    if (cls) e.className = cls;
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (html != null) e.innerHTML = html;
    return e;
  }

  function build() {
    fab = h('button', 'feedback-fab', { type: 'button', 'aria-label': '反馈问题', title: '反馈问题' }, SVG_MSG);

    modal = h('div', 'feedback-modal', { hidden: '' });
    var card = h('div', 'feedback-card');

    var head = h('div', 'feedback-card-head');
    head.appendChild(h('div', 'feedback-card-title', null, '反馈问题'));
    head.appendChild(h('button', 'feedback-close', { type: 'button', 'aria-label': '关闭' }, '&times;'));

    var body = h('div', 'feedback-card-body');

    var fieldPage = h('label', 'feedback-field');
    fieldPage.appendChild(h('span', 'feedback-label', null, '页面'));
    pageInput = h('input', 'feedback-input', { type: 'text', readonly: '', value: PAGE_ID });
    fieldPage.appendChild(pageInput);

    var fieldDesc = h('label', 'feedback-field');
    fieldDesc.appendChild(h('span', 'feedback-label', null, '问题描述 <b class="feedback-req">*</b>'));
    descInput = h('textarea', 'feedback-textarea', {
      rows: '4', required: '',
      placeholder: '请描述你看到的问题，例如：某处的文字 / 动画 / 可视化显示有误……'
    });
    fieldDesc.appendChild(descInput);

    var fieldContact = h('label', 'feedback-field');
    fieldContact.appendChild(h('span', 'feedback-label', null, '联系方式（选填）'));
    contactInput = h('input', 'feedback-input', { type: 'text', placeholder: '邮箱 / 微信，方便跟进' });
    fieldContact.appendChild(contactInput);

    shotCheck = h('input', '', { type: 'checkbox', checked: '', id: 'feedback-shot' });
    var shotRow = h('label', 'feedback-shot');
    shotRow.appendChild(shotCheck);
    shotRow.appendChild(h('span', null, null, '附带当前页面截图（推荐，便于定位）'));

    var shotBar = h('div', 'feedback-shot-bar');
    shotStatus = h('div', 'feedback-shot-status', null, '');
    recaptureBtn = h('button', 'feedback-recap btn', { type: 'button' }, '重新截图');
    shotBar.appendChild(shotStatus);
    shotBar.appendChild(recaptureBtn);

    previewImg = h('img', 'feedback-preview', { alt: '截图预览，点击放大', hidden: '' });

    body.appendChild(fieldPage);
    body.appendChild(fieldDesc);
    body.appendChild(fieldContact);
    body.appendChild(shotRow);
    body.appendChild(shotBar);
    body.appendChild(previewImg);

    if (isFile) {
      body.appendChild(h('div', 'feedback-warn', null,
        '当前是 file:// 直接打开，反馈与截图不可用。请先运行 <code>node tools\\serve.js</code>，再访问 <code>http://localhost:4173</code> 进行测试。'));
    }

    var foot = h('div', 'feedback-card-foot');
    var cancelBtn = h('button', 'btn', { type: 'button' }, '取消');
    submitBtn = h('button', 'btn btn-primary', { type: 'button' }, '提交反馈');
    foot.appendChild(cancelBtn);
    foot.appendChild(submitBtn);

    card.appendChild(head);
    card.appendChild(body);
    card.appendChild(foot);
    modal.appendChild(card);

    // 灯箱：点击预览图放大查看
    lightbox = h('div', 'feedback-lightbox', { hidden: '' });
    lightboxImg = h('img', '', { alt: '截图放大' });
    lightbox.appendChild(lightboxImg);

    doc.body.appendChild(fab);
    doc.body.appendChild(modal);
    doc.body.appendChild(lightbox);

    fab.addEventListener('click', open);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
    modal.querySelector('.feedback-close').addEventListener('click', close);
    cancelBtn.addEventListener('click', close);
    submitBtn.addEventListener('click', submit);
    recaptureBtn.addEventListener('click', doCapture);
    previewImg.addEventListener('click', openLightbox);
    lightbox.addEventListener('click', closeLightbox);
    shotCheck.addEventListener('change', function () {
      if (shotCheck.checked) doCapture();
      else { currentShot = null; shotStatus.textContent = ''; previewImg.setAttribute('hidden', ''); previewImg.removeAttribute('src'); }
    });
    descInput.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') submit();
    });
  }

  function open() {
    modal.removeAttribute('hidden');
    descInput.focus();
    if (shotCheck.checked && !currentShot) doCapture();
  }

  function close() {
    modal.setAttribute('hidden', '');
    previewImg.setAttribute('hidden', '');
    previewImg.removeAttribute('src');
    shotStatus.textContent = '';
    currentShot = null;
  }

  function openLightbox() {
    if (!previewImg.getAttribute('src')) return;
    lightboxImg.src = previewImg.src;
    lightbox.removeAttribute('hidden');
  }

  function closeLightbox() {
    lightbox.setAttribute('hidden', '');
    lightboxImg.removeAttribute('src');
  }

  /* 只截当前可视区域（viewport），不全页；modern-screenshot 截全页 canvas 后裁剪到可视窗口 */
  function captureShot() {
    if (!W.modernScreenshot) {
      console.error('[反馈截图] modern-screenshot 未加载（检查 assets/js/vendor/modern-screenshot.min.js）');
      return Promise.resolve(null);
    }
    var target = doc.documentElement;
    var vw = W.innerWidth;
    var vh = W.innerHeight;
    var sx = W.scrollX || doc.documentElement.scrollLeft || 0;
    var sy = W.scrollY || doc.documentElement.scrollTop || 0;
    var scale = 1.5;
    console.log('[反馈截图] 视口截图, viewport:', vw + 'x' + vh, 'scroll:', sx + ',' + sy);
    doc.body.classList.add('is-capturing');

    var p = W.modernScreenshot.domToCanvas(target, {
      scale: scale,
      backgroundColor: null,
      debug: false
    }).then(function (canvas) {
      var dpr = scale;
      var cropX = Math.round(sx * dpr);
      var cropY = Math.round(sy * dpr);
      var cropW = Math.min(Math.round(vw * dpr), Math.max(0, canvas.width - cropX));
      var cropH = Math.min(Math.round(vh * dpr), Math.max(0, canvas.height - cropY));
      if (cropW <= 0 || cropH <= 0) {
        console.warn('[反馈截图] 裁剪区域无效, 返回全图', canvas.width + 'x' + canvas.height);
        return canvas.toDataURL('image/jpeg', 0.72);
      }
      var cropped = doc.createElement('canvas');
      cropped.width = cropW;
      cropped.height = cropH;
      var ctx = cropped.getContext('2d');
      ctx.drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
      console.log('[反馈截图] 裁剪完成:', cropW + 'x' + cropH);
      return cropped.toDataURL('image/jpeg', 0.72);
    });

    var timeout = new Promise(function (resolve) {
      setTimeout(function () { console.warn('[反馈截图] modern-screenshot 超时(' + CAPTURE_TIMEOUT + 'ms)'); resolve(null); }, CAPTURE_TIMEOUT);
    });
    return Promise.race([p, timeout]).catch(function (e) {
      console.error('[反馈截图] modern-screenshot 异常:', e);
      return null;
    }).finally(function () {
      doc.body.classList.remove('is-capturing');
    });
  }

  /* 打开弹窗时触发：截图并显示预览 */
  function doCapture() {
    if (!shotCheck.checked) return;
    currentShot = null;
    shotStatus.textContent = '截图中…';
    previewImg.setAttribute('hidden', '');
    previewImg.removeAttribute('src');
    captureShot().then(function (shot) {
      if (shot) {
        currentShot = shot;
        previewImg.src = shot;
        previewImg.removeAttribute('hidden');
        shotStatus.textContent = '已截图 ✓（点击可放大）';
      } else {
        shotStatus.textContent = '截图失败，将不带截图提交（可点重新截图）';
      }
    });
  }

  function post(payload) {
    return fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (r) {
      return r.json().catch(function () { return { ok: false }; });
    });
  }

  function submit() {
    var desc = descInput.value.replace(/\s+/g, ' ').trim();
    if (!desc) {
      if (W.STD_UTIL) W.STD_UTIL.toast('请先填写问题描述');
      descInput.focus();
      return;
    }
    var payload = {
      page: PAGE_ID,
      title: PAGE_TITLE,
      desc: desc,
      contact: contactInput.value.trim(),
      shot: ''
    };
    submitBtn.disabled = true;
    submitBtn.textContent = '提交中…';

    // 提交时用打开弹窗时已截好的图，没有就不带截图
    if (shotCheck.checked && currentShot) {
      payload.shot = currentShot;
    }

    post(payload).then(function (res) {
      submitBtn.disabled = false;
      submitBtn.textContent = '提交反馈';
      if (res && res.ok) {
        if (W.STD_UTIL) W.STD_UTIL.toast('已收到，感谢反馈！');
        descInput.value = '';
        contactInput.value = '';
        close();
      } else {
        var msg = (res && res.error) || '提交失败，请稍后再试';
        if (W.STD_UTIL) W.STD_UTIL.toast(msg);
      }
    }).catch(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = '提交反馈';
      if (W.STD_UTIL) W.STD_UTIL.toast('网络异常，提交失败');
    });
  }

  build();
})(window);
