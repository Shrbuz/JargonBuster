/* ============================================================
   feedback.js · 全站反馈表单（零依赖）
   - 右下角悬浮按钮 → 弹窗
   - 自动带当前页面 ID（location.hash / pathname）+ 页面标题
   - 可附带当前页面截图（复用 export.js 的整页 JPEG 捕获）
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

  var fab, modal, pageInput, descInput, contactInput, shotCheck, previewImg, submitBtn;

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

    modal = h('div', 'feedback-modal');
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

    previewImg = h('img', 'feedback-preview', { alt: '截图预览', hidden: '' });

    body.appendChild(fieldPage);
    body.appendChild(fieldDesc);
    body.appendChild(fieldContact);
    body.appendChild(shotRow);
    body.appendChild(previewImg);

    if (isFile) {
      // file:// 直开时无法提交：提示改用本地服务器
      body.appendChild(h('div', 'feedback-warn', null,
        '当前是 file:// 直接打开，反馈与截图不可用。请先运行 <code>node tools\\serve.js</code>，再访问 <code>http://localhost:4173</code> 进行测试。'));
      submitBtn.disabled = true;
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

    doc.body.appendChild(fab);
    doc.body.appendChild(modal);

    fab.addEventListener('click', open);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
    modal.querySelector('.feedback-close').addEventListener('click', close);
    cancelBtn.addEventListener('click', close);
    submitBtn.addEventListener('click', submit);
    descInput.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') submit();
    });
  }

  function open() {
    modal.removeAttribute('hidden');
    descInput.focus();
  }

  function close() {
    modal.setAttribute('hidden', '');
    previewImg.setAttribute('hidden', '');
    previewImg.removeAttribute('src');
  }

  /* 整页截图（JPEG 压缩 + 限宽），失败返回 null 不阻塞提交 */
  function captureShot() {
    if (!W.STD_EXPORT) return Promise.resolve(null);
    doc.body.classList.add('is-capturing'); // 截图里不出现反馈按钮/弹窗本身
    return W.STD_EXPORT.nodeToDataUrl(doc.documentElement, {
      fullPage: true, format: 'image/jpeg', quality: 0.72, maxWidth: 1600
    }).catch(function () { return null; }).finally(function () {
      doc.body.classList.remove('is-capturing');
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

    var finish = function (shot) {
      if (shot) {
        payload.shot = shot;
        previewImg.src = shot;
        previewImg.removeAttribute('hidden');
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
    };

    if (shotCheck.checked) {
      captureShot().then(finish);
    } else {
      finish(null);
    }
  }

  build();
})(window);
