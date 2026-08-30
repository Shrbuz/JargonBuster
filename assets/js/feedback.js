/* ============================================================
   feedback.js · 全站反馈表单（零依赖）
   - 右下角悬浮按钮 → 弹窗
   - 自动带当前页面 ID（打开表单时实时取 location.hash / pathname）+ 页面标题
   - 点悬浮按钮：先弹共享确认截取当前画面（此时表单未打开，画面天然无弹窗），
     截完再打开表单显示预览（可重新截图，点击预览图可放大）
   - 截图优先走 getDisplayMedia 像素级截取本标签页：所见即所得，fixed 顶栏/侧栏、
     毛玻璃等与屏幕一致；每次抓帧前浏览器弹一次共享确认。
     不支持时回退 modern-screenshot DOM 重绘（截全页后裁视口，fixed 元素会缺失）
   - POST 到反馈收信服务；本地(localhost)自动指向 127.0.0.1:8899
   挂载：无（自执行注入 DOM）
   ============================================================ */
(function (W) {
  'use strict';

  var doc = W.document;
  var isLocal = /^(localhost|127\.0\.0\.1)$/.test(W.location.hostname);
  var isFile = W.location.protocol === 'file:';
  var ENDPOINT = isLocal ? 'http://127.0.0.1:8899/feedback/' : '/feedback/';

  /* 页面 ID/标题动态取：SPA 靠 hash 路由切换页面，
     脚本加载时的 hash 早就不是用户当前所在页了 */
  function pageId() { return (W.location.hash || W.location.pathname || '/') || 'home'; }
  function pageTitle() { return doc.title || ''; }
  var CAPTURE_TIMEOUT = 15000; // html2canvas 整页截图可能较慢，给 15 秒

  var fab, modal, pageInput, descInput, contactInput, shotCheck, previewImg, submitBtn, recaptureBtn, shotStatus;
  var shotArea, shotThumb;
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
    pageInput = h('input', 'feedback-input', { type: 'text', readonly: '', value: pageId() });
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

    /* 截图操作区：缩略图与「重新截图」横排，状态文案在按钮下方；
       未勾选「附带截图」时整块隐藏（syncShotArea 控制） */
    shotArea = h('div', 'feedback-shot-area');
    shotThumb = h('div', 'feedback-shot-thumb', { hidden: '' });
    previewImg = h('img', 'feedback-preview', { alt: '截图预览，点击放大', hidden: '' });
    shotThumb.appendChild(previewImg);
    var shotSide = h('div', 'feedback-shot-side');
    recaptureBtn = h('button', 'feedback-recap btn', { type: 'button' }, '重新截图');
    shotStatus = h('div', 'feedback-shot-status', null, '');
    shotSide.appendChild(recaptureBtn);
    shotSide.appendChild(shotStatus);
    shotArea.appendChild(shotThumb);
    shotArea.appendChild(shotSide);

    body.appendChild(fieldPage);
    body.appendChild(fieldDesc);
    body.appendChild(fieldContact);
    body.appendChild(shotRow);
    body.appendChild(shotArea);

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

    fab.addEventListener('click', openFromFab);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
    modal.querySelector('.feedback-close').addEventListener('click', close);
    cancelBtn.addEventListener('click', close);
    submitBtn.addEventListener('click', submit);
    recaptureBtn.addEventListener('click', doCapture);
    shotThumb.addEventListener('click', openLightbox); // 缩略图整块可点，放大看细节
    lightbox.addEventListener('click', closeLightbox);
    shotCheck.addEventListener('change', function () {
      if (shotCheck.checked) {
        doCapture();
      } else {
        currentShot = null;
        shotStatus.textContent = '';
        previewImg.removeAttribute('src');
        previewImg.setAttribute('hidden', '');
      }
      syncShotArea();
    });
    descInput.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') submit();
    });

    syncShotArea(); // 初始显隐归一：默认勾选 → 显示按钮区，无图 → 缩略图隐藏
  }

  /* 点悬浮按钮：先截图、后弹窗。表单还没打开，画面里天然没有弹窗，
     从根上避免「反馈弹窗入镜」；用户取消共享则照常打开表单（不带截图） */
  function openFromFab() {
    if (!shotCheck.checked || currentShot) { open(); return; }
    captureShot().then(function (shot) {
      open();
      applyShot(shot);
    });
  }

  function open() {
    pageInput.value = pageId(); // 打开时实时刷新，反映用户当前所在页
    modal.removeAttribute('hidden');
    descInput.focus();
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

  /* ---------- 像素级截取（首选） ----------
     getDisplayMedia 采集本标签页的合成画面：拿到的是真实渲染像素，fixed 顶栏/侧栏、
     毛玻璃、混合模式与屏幕完全一致（扩展 captureVisibleTab 的网页侧合法等价物）。
     代价：每次抓帧前浏览器弹一次共享确认（安全边界，网页绕不开）。
     抓帧瞬间以 is-capturing 隐藏反馈弹窗/悬浮按钮，别把表单自己拍进去。
     返回 dataURL；用户取消授权返回 'cancelled'（不降级偷拍）；
     浏览器不支持返回 null（由调用方回退 DOM 重绘路线）。 */
  function captureShotPixel() {
    if (!W.navigator.mediaDevices || !W.navigator.mediaDevices.getDisplayMedia) return Promise.resolve(null);
    return new Promise(function (resolve) {
      var stream;
      function stop() { if (stream) stream.getTracks().forEach(function (t) { t.stop(); }); }
      function ok(dataUrl) { stop(); resolve(dataUrl); }
      function fail(e) { console.error('[反馈截图] 像素截取失败:', (e && e.name) || e); stop(); resolve(null); }
      W.navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
        preferCurrentTab: true,        // Chrome：预选当前标签页
        selfBrowserSurface: 'include'  // 允许共享自己
      }).then(function (s) {
        stream = s;
        var video = doc.createElement('video');
        video.muted = true;
        video.playsInline = true;
        video.srcObject = s;
        // 弹窗已开着（重新截图场景）：抓帧瞬间隐藏弹窗与悬浮按钮
        // （复用 legacy 路线的 is-capturing 约定）。关键：视频帧有延迟，
        // 必须等「隐藏之后合成的新帧」，否则抓到的还是含弹窗的旧帧。
        // 点悬浮按钮的首截场景弹窗还没打开，无需遮罩，抓到的就是干净画面。
        var masked = false;
        if (modal && !modal.hasAttribute('hidden')) {
          masked = true;
          doc.body.classList.add('is-capturing');
        }
        function unmask() { if (masked) doc.body.classList.remove('is-capturing'); }
        var tries = 0;
        function grab() {
          if (!video.videoWidth || !video.videoHeight) {
            if (++tries > 25) { unmask(); fail(new Error('首帧超时')); return; } // ≈5 秒仍无画面则放弃
            setTimeout(grab, 200); // 首帧未就绪，稍候重试
            return;
          }
          try {
            var c = doc.createElement('canvas');
            c.width = video.videoWidth;
            c.height = video.videoHeight;
            c.getContext('2d').drawImage(video, 0, 0);
            unmask();
            ok(c.toDataURL('image/jpeg', 0.8));
          } catch (e) { unmask(); fail(e); }
        }
        video.play().then(function () {
          // 有遮罩 → 等 500ms 让含弹窗的旧帧全部流过；无遮罩（首截）→ 首帧可用即抓
          setTimeout(grab, masked ? 500 : 0);
        }).catch(function (e) { unmask(); fail(e); });
      }).catch(function (e) {
        if (e && (e.name === 'NotAllowedError' || e.name === 'AbortError')) resolve('cancelled'); // 用户拒绝/关闭弹窗
        else fail(e);
      });
    });
  }

  /* 路由：像素截取优先，不支持时回退 modern-screenshot DOM 重绘 */
  function captureShot() {
    return captureShotPixel().then(function (shot) {
      if (shot === 'cancelled') return shot;
      if (shot) return shot;
      return captureShotLegacy();
    });
  }

  /* 只截当前可视区域（viewport），不全页；modern-screenshot 截全页 canvas 后裁剪到可视窗口。
     DOM 重绘的天然短板：fixed/sticky 元素钉在整页图原点附近，滚动后裁不到——所以只作回退 */
  function captureShotLegacy() {
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

  /* 按勾选状态与截图结果同步操作区显隐：
     未勾选 → 整块隐藏；已勾选 → 按钮与状态常显，缩略图仅有图时出现 */
  function syncShotArea() {
    if (!shotCheck.checked) { shotArea.setAttribute('hidden', ''); return; }
    shotArea.removeAttribute('hidden');
    if (currentShot && previewImg.getAttribute('src')) shotThumb.removeAttribute('hidden');
    else shotThumb.setAttribute('hidden', '');
  }

  /* 把截图结果落到表单：成功→预览；取消/失败→状态文案 */
  function applyShot(shot) {
    if (shot === 'cancelled') {
      shotStatus.textContent = '已取消截图（可点重新截图）';
    } else if (shot) {
      currentShot = shot;
      previewImg.src = shot;
      previewImg.removeAttribute('hidden');
      shotStatus.textContent = '';
    } else {
      shotStatus.textContent = '截图失败，将不带截图提交（可点重新截图）';
    }
    syncShotArea();
  }

  /* 表单内手动（重新）截图：弹窗已在屏上，走「遮罩 + 等帧」路径 */
  function doCapture() {
    if (!shotCheck.checked) return;
    currentShot = null;
    shotStatus.textContent = '截图中…';
    previewImg.setAttribute('hidden', '');
    previewImg.removeAttribute('src');
    syncShotArea();
    captureShot().then(applyShot);
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
      page: pageInput.value || pageId(),
      title: pageTitle(),
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
