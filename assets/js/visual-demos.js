/* ============================================================
   visual-demos.js · 前端可视化标准术语 · 呈现效果注册表
   每个键对应一段纯静态、惰性的 HTML 标本（不做真实交互，样式见 visual-page.css）。
   约定：类名一律 vd-* 前缀；颜色只用设计令牌；暗色主题自动适配。
   挂载：window.STD_VISUAL_DEMOS
   ============================================================ */
(function (W) {
  'use strict';

  /* 小图标速写 */
  function ic(d, extra) {
    return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' + (extra || '') + '>' + d + '</svg>';
  }
  var I = {
    search: ic('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    plus: ic('<path d="M12 5v14M5 12h14"/>'),
    star: ic('<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.6l6.2-.9z"/>'),
    check: ic('<path d="m5 13 4 4L19 7"/>'),
    x: ic('<path d="M6 6l12 12M18 6 6 18"/>'),
    chevD: ic('<path d="m6 9 6 6 6-6"/>'),
    chevR: ic('<path d="m9 6 6 6-6 6"/>'),
    folder: ic('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),
    file: ic('<path d="M6 2h8l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><path d="M14 2v6h6"/>'),
    camera: ic('<path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="14" r="3.5"/>'),
    play: ic('<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/>'),
    calendar: ic('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
    upload: ic('<path d="M12 16V6m0 0 -4 4m4-4 4 4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>'),
    home: ic('<path d="m3 11 9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>'),
    gear: ic('<circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9l2.1 2.1m10 10 2.1 2.1m0-14.2-2.1 2.1m-10 10L4.9 19.1"/>'),
    user: ic('<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 5-5.5 8-5.5s6.5 1.5 8 5.5"/>'),
    bell: ic('<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2 2 0 0 0 4 0"/>'),
    trash: ic('<path d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13"/>'),
    download: ic('<path d="M12 4v10m0 0-4-4m4 4 4-4"/><path d="M4 18v2h16v-2"/>')
  };

  var D = {};

  /* ---------- 基础 ---------- */

  D['button'] = function () {
    return '<div class="vd-row">' +
      '<button type="button" class="vd-btn vd-btn-primary">保存</button>' +
      '<button type="button" class="vd-btn vd-btn-ghost">取消</button>' +
      '<button type="button" class="vd-btn vd-btn-danger">删除</button>' +
      '<button type="button" class="vd-btn vd-btn-primary" disabled>提交中…</button>' +
    '</div>';
  };

  D['icon-button'] = function () {
    return '<div class="vd-row">' +
      '<button type="button" class="vd-icon-btn" title="搜索">' + I.search + '</button>' +
      '<button type="button" class="vd-icon-btn" title="新增">' + I.plus + '</button>' +
      '<button type="button" class="vd-icon-btn is-active" title="收藏">' + I.star + '</button>' +
      '<button type="button" class="vd-icon-btn" title="不可用" disabled>' + I.trash + '</button>' +
    '</div>';
  };

  D['tag'] = function () {
    return '<div class="vd-row">' +
      '<span class="vd-tag">前端</span>' +
      '<span class="vd-tag vd-tag-ok">已上线</span>' +
      '<span class="vd-tag vd-tag-warn">Beta</span>' +
      '<span class="vd-tag vd-tag-del">JavaScript<i>' + I.x + '</i></span>' +
      '<span class="vd-tag vd-tag-pill">胶囊标签</span>' +
    '</div>';
  };

  D['badge'] = function () {
    return '<div class="vd-row vd-row-mid">' +
      '<span class="vd-avatar vd-avatar-sm">标<i class="vd-dot"></i></span>' +
      '<button type="button" class="vd-btn vd-btn-ghost">消息<span class="vd-count">3</span></button>' +
      '<span class="vd-count vd-count-float">99+</span>' +
      '<span class="vd-label">红点 / 计数 / 溢出</span>' +
    '</div>';
  };

  D['avatar'] = function () {
    return '<div class="vd-row vd-row-mid">' +
      '<span class="vd-avatar" style="width:32px;height:32px;font-size:13px">A</span>' +
      '<span class="vd-avatar" style="width:40px;height:40px">标</span>' +
      '<span class="vd-avatar" style="width:48px;height:48px;font-size:19px">图</span>' +
      '<span class="vd-avatar-stack">' +
        '<span class="vd-avatar" style="width:32px;height:32px;font-size:13px">甲</span>' +
        '<span class="vd-avatar" style="width:32px;height:32px;font-size:13px">乙</span>' +
        '<span class="vd-avatar vd-avatar-more" style="width:32px;height:32px;font-size:12px">+5</span>' +
      '</span>' +
    '</div>';
  };

  D['divider'] = function () {
    return '<div class="vd-stack">' +
      '<div class="vd-divider"></div>' +
      '<div class="vd-divider vd-divider-dashed"></div>' +
      '<div class="vd-divider vd-divider-text"><span>分割线标题</span></div>' +
    '</div>';
  };

  D['accordion'] = function () {
    return '<div class="vd-accordion">' +
      '<div class="vd-acc-item is-open">' +
        '<button type="button" class="vd-acc-head">什么是状态码？' + I.chevD + '</button>' +
        '<div class="vd-acc-body">服务器用三位数字表达请求结果：2xx 成功、4xx 你的问题、5xx 它的问题。</div>' +
      '</div>' +
      '<div class="vd-acc-item">' +
        '<button type="button" class="vd-acc-head">什么是跨域？' + I.chevR + '</button>' +
      '</div>' +
    '</div>';
  };

  D['fab'] = function () {
    return '<div class="vd-fab-stage">' +
      '<span class="vd-sk vd-sk-line" style="width:62%"></span>' +
      '<span class="vd-sk vd-sk-line" style="width:44%"></span>' +
      '<span class="vd-sk vd-sk-line" style="width:55%"></span>' +
      '<button type="button" class="vd-fab" title="新建">' + I.plus + '</button>' +
    '</div>';
  };

  /* ---------- 表单 ---------- */

  D['text-input'] = function () {
    return '<div class="vd-stack">' +
      '<div class="vd-field">' +
        '<label>用户名</label>' +
        '<input class="vd-input" type="text" placeholder="请输入用户名，如 stan">' +
        '<p class="vd-help">4-16 位，字母开头</p>' +
      '</div>' +
      '<div class="vd-field">' +
        '<label>手机号</label>' +
        '<input class="vd-input is-error" type="text" value="123">' +
        '<p class="vd-help is-error">请输入 11 位手机号</p>' +
      '</div>' +
    '</div>';
  };

  D['textarea'] = function () {
    return '<div class="vd-field">' +
      '<label>项目简介</label>' +
      '<textarea class="vd-textarea" rows="3" placeholder="一两句话介绍这个项目…">标准术语，一个技术用语学习站。</textarea>' +
      '<p class="vd-help" style="text-align:right">16 / 200</p>' +
    '</div>';
  };

  D['select'] = function () {
    return '<div class="vd-field">' +
      '<label>角色</label>' +
      '<select class="vd-input vd-select"><option>前端工程师</option><option selected>全栈工程师</option><option>产品经理</option></select>' +
    '</div>';
  };

  D['checkbox'] = function () {
    return '<div class="vd-stack">' +
      '<label class="vd-check"><input type="checkbox" checked><i>' + I.check + '</i>记住我</label>' +
      '<label class="vd-check"><input type="checkbox"><i>' + I.check + '</i>自动登录</label>' +
      '<label class="vd-check"><input type="checkbox" disabled><i>' + I.check + '</i>同意协议（不可用）</label>' +
      '<label class="vd-check"><input type="checkbox" class="is-indeterminate" checked><i class="vd-ind">' + I.x.replace('stroke-width="2"', 'stroke-width="3"') + '</i>全选（半选态）</label>' +
    '</div>';
  };

  D['radio'] = function () {
    return '<div class="vd-stack">' +
      '<label class="vd-check"><input type="radio" name="vd-pay" checked><i></i>微信支付</label>' +
      '<label class="vd-check"><input type="radio" name="vd-pay"><i></i>支付宝</label>' +
      '<label class="vd-check"><input type="radio" name="vd-pay" disabled><i></i>银行卡（暂不可用）</label>' +
    '</div>';
  };

  D['switch'] = function () {
    return '<div class="vd-row vd-row-mid">' +
      '<span class="vd-switch-label">接受通知</span><span class="vd-switch is-on"><i></i></span>' +
      '<span class="vd-switch-label">深色模式</span><span class="vd-switch"><i></i></span>' +
      '<span class="vd-switch-label">只读</span><span class="vd-switch is-on is-disabled"><i></i></span>' +
    '</div>';
  };

  D['slider'] = function () {
    return '<div class="vd-stack">' +
      '<div class="vd-slider"><span class="vd-slider-fill" style="width:62%"></span><span class="vd-slider-thumb" style="left:62%"></span></div>' +
      '<p class="vd-help">音量 62</p>' +
      '<div class="vd-slider"><span class="vd-slider-fill" style="width:20%"></span><span class="vd-slider-thumb" style="left:20%"></span><span class="vd-slider-tick" style="left:25%"></span><span class="vd-slider-tick" style="left:50%"></span><span class="vd-slider-tick" style="left:75%"></span></div>' +
      '<p class="vd-help">带刻度</p>' +
    '</div>';
  };

  D['date-picker'] = function () {
    var cells = '', days = ['一', '二', '三', '四', '五', '六', '日'];
    days.forEach(function (d) { cells += '<span class="vd-cal-wd">' + d + '</span>'; });
    for (var i = 1; i <= 30; i++) {
      var cls = 'vd-cal-d' + (i === 12 ? ' is-selected' : '') + (i === 18 ? ' is-today' : '') + (i > 22 ? ' is-out' : '');
      cells += '<span class="' + cls + '">' + i + '</span>';
    }
    return '<div class="vd-date">' +
      '<span class="vd-input vd-date-input">' + I.calendar + '2025-06-12</span>' +
      '<div class="vd-cal">' +
        '<div class="vd-cal-head"><strong>2025 年 6 月</strong><span>‹ ›</span></div>' +
        '<div class="vd-cal-grid">' + cells + '</div>' +
      '</div>' +
    '</div>';
  };

  D['search-input'] = function () {
    return '<div class="vd-stack">' +
      '<div class="vd-search">' + I.search +
        '<input class="vd-input" type="text" placeholder="搜索词条、标签或英文…" aria-label="搜索">' +
      '</div>' +
      '<div class="vd-search-pop">' +
        '<span class="is-hit">搜索框 Search Input</span>' +
        '<span>搜索结果页 Search Results</span>' +
      '</div>' +
    '</div>';
  };

  D['rate'] = function () {
    return '<div class="vd-row vd-row-mid">' +
      '<span class="vd-rate" role="img" aria-label="评分 4 星（满分 5 星）">' +
        '<i class="is-on">' + I.star + '</i><i class="is-on">' + I.star + '</i>' +
        '<i class="is-on">' + I.star + '</i><i class="is-on">' + I.star + '</i>' +
        '<i>' + I.star + '</i>' +
      '</span>' +
      '<span class="vd-label">4.0 / 5 · 只读态</span>' +
    '</div>';
  };

  D['input-number'] = function () {
    return '<div class="vd-row vd-row-mid">' +
      '<span class="vd-num">' +
        '<button type="button" class="vd-num-btn" aria-label="减少">−</button>' +
        '<input class="vd-num-input" type="text" value="1" aria-label="数量">' +
        '<button type="button" class="vd-num-btn" aria-label="增加">+</button>' +
      '</span>' +
      '<span class="vd-help">步长 1 · 限 1-99</span>' +
    '</div>';
  };

  /* ---------- 导航 ---------- */

  D['breadcrumb'] = function () {
    return '<nav class="vd-crumb" aria-label="面包屑示例">' +
      '<a>首页</a><span>/</span><a>组件库</a><span>/</span><a>通用</a><span>/</span><b>按钮</b>' +
    '</nav>';
  };

  D['navbar'] = function () {
    return '<div class="vd-navbar">' +
      '<span class="vd-navbar-brand"><i></i>产品名</span>' +
      '<span class="vd-navbar-links"><b>首页</b><span>文档</span><span>社区</span></span>' +
      '<span class="vd-navbar-right">' + I.search + I.bell + '<span class="vd-avatar" style="width:24px;height:24px;font-size:11px">U</span></span>' +
    '</div>';
  };

  D['sidebar'] = function () {
    function row(txt, active) { return '<span class="vd-side-item' + (active ? ' is-active' : '') + '"><i></i>' + txt + '</span>'; }
    return '<div class="vd-sidebar">' +
      row('工作台') + row('项目管理', true) + row('成员管理') + row('设置') +
    '</div>';
  };

  D['tabs'] = function () {
    return '<div class="vd-tabs">' +
      '<div class="vd-tabs-bar"><b class="is-active">详情</b><b>参数</b><b>评价 <i>28</i></b></div>' +
      '<div class="vd-tabs-body">这里显示当前标签对应的内容面板，切换标签时整体替换。</div>' +
    '</div>';
  };

  D['pagination'] = function () {
    return '<div class="vd-pager">' +
      '<span class="vd-pager-btn">‹</span><span class="vd-pager-btn">1</span><span class="vd-pager-btn">2</span>' +
      '<span class="vd-pager-btn is-current">3</span><span class="vd-pager-btn">4</span><span class="vd-pager-ellipsis">…</span>' +
      '<span class="vd-pager-btn">9</span><span class="vd-pager-btn">›</span>' +
      '<span class="vd-help" style="margin-left:8px">共 173 条</span>' +
    '</div>';
  };

  D['steps'] = function () {
    return '<div class="vd-steps">' +
      '<span class="vd-step is-done"><i>' + I.check + '</i>填写资料</span>' +
      '<span class="vd-step-line"></span>' +
      '<span class="vd-step is-current"><i>2</i>确认信息</span>' +
      '<span class="vd-step-line"></span>' +
      '<span class="vd-step"><i>3</i>完成</span>' +
    '</div>';
  };

  D['tab-bar'] = function () {
    return '<div class="vd-tabbar">' +
      '<span class="is-active">' + I.home + '<i>首页</i></span>' +
      '<span>' + I.folder + '<i>发现</i></span>' +
      '<span>' + I.plus + '<i>发布</i></span>' +
      '<span>' + I.bell + '<i>消息</i></span>' +
      '<span>' + I.user + '<i>我的</i></span>' +
    '</div>';
  };

  /* ---------- 数据展示 ---------- */

  D['card'] = function () {
    return '<div class="vd-card">' +
      '<div class="vd-card-cover">' + I.camera + '</div>' +
      '<div class="vd-card-body">' +
        '<strong>山间晨雾摄影课</strong>' +
        '<p>两小时带你读懂光线与构图。</p>' +
      '</div>' +
      '<div class="vd-card-foot"><span class="vd-price">¥ 199</span><span><button type="button" class="vd-btn vd-btn-ghost vd-btn-sm">收藏</button><button type="button" class="vd-btn vd-btn-primary vd-btn-sm">报名</button></span></div>' +
    '</div>';
  };

  D['table'] = function () {
    return '<table class="vd-table">' +
      '<thead><tr><th>订单号</th><th>金额</th><th>状态</th></tr></thead>' +
      '<tbody>' +
        '<tr><td>A-1024</td><td>¥ 129.00</td><td><span class="vd-tag vd-tag-ok">已支付</span></td></tr>' +
        '<tr><td>A-1025</td><td>¥ 59.00</td><td><span class="vd-tag vd-tag-warn">待支付</span></td></tr>' +
        '<tr><td>A-1026</td><td>¥ 899.00</td><td><span class="vd-tag">配送中</span></td></tr>' +
      '</tbody>' +
    '</table>';
  };

  D['list'] = function () {
    function li(name, meta) {
      return '<div class="vd-list-item"><span class="vd-avatar" style="width:32px;height:32px;font-size:13px">' + name[0] + '</span>' +
        '<span class="vd-list-txt"><b>' + name + '</b><i>' + meta + '</i></span>' + I.chevR + '</div>';
    }
    return '<div class="vd-list">' + li('林小满', '刚刚 · 评论了你的文章') + li('陈舟', '昨天 · 关注了你') + li('何雨', '3 天前 · 赞了你的项目') + '</div>';
  };

  D['progress'] = function () {
    var r = 15.9;
    return '<div class="vd-stack">' +
      '<div class="vd-field"><div class="vd-progress-head"><span>上传中</span><span>62%</span></div>' +
      '<div class="vd-progress"><span style="width:62%"></span></div></div>' +
      '<div class="vd-row vd-row-mid">' +
        '<svg class="vd-ring" width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="' + r + '" fill="none" stroke="var(--surface-3)" stroke-width="5"/><circle cx="22" cy="22" r="' + r + '" fill="none" stroke="var(--accent)" stroke-width="5" stroke-linecap="round" stroke-dasharray="61.9" stroke-dashoffset="23.5" transform="rotate(-90 22 22)"/></svg>' +
        '<span class="vd-help">环形变体 62%</span>' +
      '</div>' +
    '</div>';
  };

  D['timeline'] = function () {
    return '<div class="vd-timeline">' +
      '<div class="vd-tl-item is-done"><i></i><div><b>订单已创建</b><span>06-01 10:24</span></div></div>' +
      '<div class="vd-tl-item is-done"><i></i><div><b>商家已发货</b><span>06-02 08:03</span></div></div>' +
      '<div class="vd-tl-item is-current"><i></i><div><b>运输中</b><span>包裹正在靠近你所在的城市的转运中心</span></div></div>' +
      '<div class="vd-tl-item"><i></i><div><b>待收货</b></div></div>' +
    '</div>';
  };

  D['tree'] = function () {
    function node(txt, opts) {
      opts = opts || '';
      return '<div class="vd-tree-item' + (opts.indexOf('open') > -1 ? ' is-open' : '') + (opts.indexOf('active') > -1 ? ' is-active' : '') + '">' +
        '<span class="vd-tree-caret">' + (opts.indexOf('leaf') > -1 ? '' : I.chevR) + '</span>' +
        (opts.indexOf('leaf') > -1 ? I.file : I.folder) + txt + '</div>';
    }
    return '<div class="vd-tree">' +
      node('src', 'open') +
      '<div class="vd-tree-sub">' +
        node('components', 'open') +
        '<div class="vd-tree-sub">' + node('Button.vue', 'leaf active') + node('Modal.vue', 'leaf') + '</div>' +
        node('utils', '') +
        node('App.vue', 'leaf') +
      '</div>' +
      node('package.json', 'leaf') +
    '</div>';
  };

  D['statistic'] = function () {
    return '<div class="vd-stats">' +
      '<div class="vd-stat"><span class="vd-stat-label">本周访问</span><span class="vd-stat-num">12,480</span><span class="vd-stat-delta is-up">↑ 12.4% 环比</span></div>' +
      '<div class="vd-stat"><span class="vd-stat-label">转化率</span><span class="vd-stat-num">3.2%</span><span class="vd-stat-delta is-down">↓ 0.5% 环比</span></div>' +
    '</div>';
  };

  D['masonry'] = function () {
    function block(h) { return '<i style="height:' + h + 'px"></i>'; }
    return '<div class="vd-masonry">' +
      block(56) + block(88) + block(40) + block(72) + block(48) + block(96) + block(60) + block(44) +
    '</div>' +
    '<p class="vd-help" style="margin-top:8px">列宽固定 · 高度不一 · 新卡片永远填最短的列</p>';
  };

  /* ---------- 反馈 ---------- */

  D['alert'] = function () {
    return '<div class="vd-stack">' +
      '<div class="vd-alert is-ok"><i>' + I.check + '</i>保存成功，所有更改已生效。</div>' +
      '<div class="vd-alert is-info"><i>ⓘ</i>系统将于今晚 02:00 例行维护，预计 30 分钟。</div>' +
      '<div class="vd-alert is-warn"><i>!</i>当前浏览器版本较旧，部分功能可能不可用。</div>' +
      '<div class="vd-alert is-danger"><i>' + I.x + '</i>提交失败：网络异常，请重试。<u>重试</u></div>' +
    '</div>';
  };

  D['toast'] = function () {
    return '<div class="vd-toast-wrap">' +
      '<div class="vd-toast is-ok"><i>' + I.check + '</i>已复制到剪贴板</div>' +
      '<div class="vd-toast is-danger"><i>' + I.x + '</i>发送失败<u>重试</u></div>' +
      '<p class="vd-help" style="text-align:right">右下角浮现 · 数秒后自动消失</p>' +
    '</div>';
  };

  D['loading'] = function () {
    return '<div class="vd-row vd-row-mid">' +
      '<span class="vd-spinner" style="width:18px;height:18px"></span>' +
      '<span class="vd-spinner" style="width:28px;height:28px"></span>' +
      '<span class="vd-spinner" style="width:38px;height:38px;border-width:4px"></span>' +
      '<button type="button" class="vd-btn vd-btn-primary" disabled><span class="vd-spinner vd-spinner-light" style="width:14px;height:14px;border-width:2px"></span>加载中…</button>' +
    '</div>';
  };

  D['skeleton'] = function () {
    return '<div class="vd-skeleton">' +
      '<div class="vd-sk-row"><span class="vd-sk vd-sk-avatar"></span><span class="vd-sk vd-sk-line" style="width:38%"></span></div>' +
      '<span class="vd-sk vd-sk-line" style="width:92%"></span>' +
      '<span class="vd-sk vd-sk-line" style="width:75%"></span>' +
      '<span class="vd-sk vd-sk-block"></span>' +
    '</div>';
  };

  D['empty'] = function () {
    return '<div class="vd-empty">' +
      '<span class="vd-empty-icon">' + I.folder + '</span>' +
      '<b>暂无项目</b><span>创建第一个项目，开始你的协作之旅</span>' +
      '<button type="button" class="vd-btn vd-btn-ghost">新建项目</button>' +
    '</div>';
  };

  D['tooltip'] = function () {
    return '<div class="vd-tip-stage">' +
      '<span class="vd-tip-bubble">复制全文（Ctrl+C）<i></i></span>' +
      '<button type="button" class="vd-btn vd-btn-ghost">悬停我看看</button>' +
      '<p class="vd-help">深底白字 · 单行以内 · 带小箭头</p>' +
    '</div>';
  };

  D['popover'] = function () {
    return '<div class="vd-pop-stage">' +
      '<button type="button" class="vd-btn vd-btn-ghost vd-btn-sm">分享</button>' +
      '<div class="vd-pop">' +
        '<b>分享到</b>' +
        '<div class="vd-row" style="gap:6px;margin-top:8px">' +
          '<button type="button" class="vd-btn vd-btn-ghost vd-btn-sm">复制链接</button>' +
          '<button type="button" class="vd-btn vd-btn-ghost vd-btn-sm">二维码</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  };

  D['notification'] = function () {
    return '<div class="vd-stack">' +
      '<div class="vd-notif">' +
        '<i>' + I.bell + '</i>' +
        '<span class="vd-list-txt"><b>构建完成</b><i>standard-term 部署成功，用时 42 秒</i></span>' +
        '<span class="vd-notif-x" title="关闭">' + I.x + '</span>' +
      '</div>' +
      '<div class="vd-notif is-danger">' +
        '<i>' + I.trash + '</i>' +
        '<span class="vd-list-txt"><b>删除失败</b><i>该词条仍被 3 个词条引用</i></span>' +
        '<span class="vd-notif-x" title="关闭">' + I.x + '</span>' +
      '</div>' +
      '<span class="vd-label">右上角推入 · 不点不消失</span>' +
    '</div>';
  };

  D['result'] = function () {
    return '<div class="vd-result">' +
      '<span class="vd-result-icon">' + I.check + '</span>' +
      '<b>提交成功</b>' +
      '<span>审核通常需要 1-2 个工作日，结果会通知你</span>' +
      '<button type="button" class="vd-btn vd-btn-ghost vd-btn-sm">返回首页</button>' +
    '</div>';
  };

  /* ---------- 浮层 ---------- */

  D['modal'] = function () {
    return '<div class="vd-modal-stage">' +
      '<div class="vd-modal-scrim"></div>' +
      '<div class="vd-modal">' +
        '<div class="vd-modal-head"><b>删除项目</b><i>' + I.x + '</i></div>' +
        '<p>删除后项目内全部文件将一并清除，此操作不可恢复。</p>' +
        '<div class="vd-modal-foot"><button type="button" class="vd-btn vd-btn-ghost vd-btn-sm">取消</button><button type="button" class="vd-btn vd-btn-danger vd-btn-sm">确认删除</button></div>' +
      '</div>' +
    '</div>';
  };

  D['confirm'] = function () {
    return '<div class="vd-modal-stage">' +
      '<div class="vd-modal-scrim"></div>' +
      '<div class="vd-modal vd-modal-confirm">' +
        '<span class="vd-confirm-icon">' + I.trash + '</span>' +
        '<b>确认退出登录？</b>' +
        '<p>退出后需要重新输入账号密码。</p>' +
        '<div class="vd-modal-foot vd-modal-foot-center"><button type="button" class="vd-btn vd-btn-ghost vd-btn-sm">取消</button><button type="button" class="vd-btn vd-btn-primary vd-btn-sm">退出</button></div>' +
      '</div>' +
    '</div>';
  };

  D['drawer'] = function () {
    return '<div class="vd-drawer-stage">' +
      '<div class="vd-drawer-dim"></div>' +
      '<div class="vd-drawer">' +
        '<div class="vd-drawer-head"><b>订单详情</b><i>' + I.x + '</i></div>' +
        '<div class="vd-drawer-body">' +
          '<p class="vd-help">从右侧滑出，承载「比弹窗重、比页面轻」的内容。</p>' +
          '<div class="vd-list-item"><span class="vd-avatar" style="width:28px;height:28px;font-size:11px">A</span><span class="vd-list-txt"><b>A-1024</b><i>¥ 129.00 · 已支付</i></span></div>' +
          '<div class="vd-list-item"><span class="vd-avatar" style="width:28px;height:28px;font-size:11px">B</span><span class="vd-list-txt"><b>A-1025</b><i>¥ 59.00 · 待支付</i></span></div>' +
        '</div>' +
      '</div>' +
    '</div>';
  };

  D['dropdown-menu'] = function () {
    return '<div class="vd-menu-stage">' +
      '<button type="button" class="vd-btn vd-btn-ghost">更多操作 ' + I.chevD + '</button>' +
      '<div class="vd-menu">' +
        '<span class="vd-menu-item">' + I.user + '个人中心</span>' +
        '<span class="vd-menu-item">' + I.gear + '偏好设置</span>' +
        '<span class="vd-menu-sep"></span>' +
        '<span class="vd-menu-item is-danger">' + I.trash + '删除项目</span>' +
      '</div>' +
    '</div>';
  };

  D['carousel'] = function () {
    return '<div class="vd-carousel">' +
      '<div class="vd-carousel-slide">' + I.camera + '<b>新品首发 · 山系冲锋衣</b></div>' +
      '<span class="vd-carousel-arrow is-prev">‹</span>' +
      '<span class="vd-carousel-arrow is-next">›</span>' +
      '<div class="vd-carousel-dots"><i class="is-active"></i><i></i><i></i></div>' +
    '</div>';
  };

  D['bottom-sheet'] = function () {
    return '<div class="vd-sheet-stage">' +
      '<div class="vd-sheet">' +
        '<span class="vd-sheet-grab"></span>' +
        '<span class="vd-sheet-opt">拍照上传</span>' +
        '<span class="vd-sheet-opt">从相册选择</span>' +
        '<span class="vd-sheet-opt is-cancel">取消</span>' +
      '</div>' +
    '</div>';
  };

  D['command-palette'] = function () {
    return '<div class="vd-cmdk">' +
      '<div class="vd-cmdk-input">' + I.search + '<span>输入指令或搜索…</span><kbd>Esc</kbd></div>' +
      '<div class="vd-cmdk-list">' +
        '<span class="is-active">' + I.home + '跳转到首页<kbd>↵</kbd></span>' +
        '<span>' + I.gear + '切换深色主题</span>' +
        '<span>' + I.file + '新建词条草稿</span>' +
      '</div>' +
    '</div>';
  };

  /* ---------- 媒体 ---------- */

  D['image'] = function () {
    return '<figure class="vd-figure">' +
      '<div class="vd-fig-media">' + I.camera + '</div>' +
      '<figcaption>16:9 圆角 · 加载失败时显示占位图标与 alt 文字</figcaption>' +
    '</figure>';
  };

  D['icons'] = function () {
    var keys = ['home', 'search', 'gear', 'star', 'bell', 'user', 'download', 'trash'];
    return '<div class="vd-icon-grid">' + keys.map(function (k) {
      return '<span class="vd-icon-cell">' + I[k] + '</span>';
    }).join('') + '</div>' +
    '<p class="vd-help" style="margin-top:8px">统一线宽与圆角 · 功能图标配文字 · 装饰图标 aria-hidden</p>';
  };

  D['video'] = function () {
    return '<div class="vd-video">' +
      '<span class="vd-video-play">' + I.play + '</span>' +
      '<div class="vd-video-bar"><span>▶</span><div class="vd-video-track"><i style="width:35%"></i></div><span>03:42 / 10:30</span></div>' +
    '</div>';
  };

  D['upload'] = function () {
    return '<div class="vd-stack">' +
      '<div class="vd-drop">' + I.upload + '<b>点击或拖拽文件到此处上传</b><span>支持 .png / .jpg / .pdf，单个 ≤ 10MB</span></div>' +
      '<div class="vd-upfile"><span class="vd-upfile-icon">' + I.file + '</span>' +
        '<span class="vd-list-txt"><b>设计稿-v3.pdf</b><i>2.4 MB · 上传完成</i></span>' +
        '<span class="vd-upfile-del">' + I.x + '</span></div>' +
    '</div>';
  };

  W.STD_VISUAL_DEMOS = D;
})(window);
