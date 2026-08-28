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

  D['social-proof'] = function () {
    return '<div class="vd-sp">' +
      '<div class="vd-sp-stats">' +
        '<div><b>120 万+</b><span>学习者在用</span></div>' +
        '<div><b>4.9 分</b><span>平均评分</span></div>' +
      '</div>' +
      '<div class="vd-sp-logos"><span>ACME</span><span>NOVA</span><span>HALO</span><span>ORBIT</span><span>QUANT</span></div>' +
      '<figure class="vd-sp-quote">' +
        '<span class="vd-avatar" style="width:32px;height:32px;font-size:13px">林</span>' +
        '<blockquote>术语对齐之后，评审会上终于不用花十分钟解释「那个转来转去的东西」了。</blockquote>' +
        '<figcaption>林小满 · 产品经理</figcaption>' +
      '</figure>' +
    '</div>';
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

  D['overlay'] = function () {
    function page() {
      return '<div class="vd-ov-page"><i></i><i></i><i></i><i></i></div>';
    }
    return '<div class="vd-ov-row">' +
      '<figure class="vd-ov"><span class="vd-ov-cap">无遮罩 · 页面还在抢注意力</span>' +
        '<div class="vd-ov-stage">' + page() + '<div class="vd-ov-dialog">确认删除？<em>取消 / 删除</em></div></div>' +
      '</figure>' +
      '<figure class="vd-ov"><span class="vd-ov-cap">有遮罩 · 视线被压给弹窗</span>' +
        '<div class="vd-ov-stage">' + page() + '<div class="vd-ov-scrim"></div><div class="vd-ov-dialog">确认删除？<em>取消 / 删除</em></div></div>' +
      '</figure>' +
    '</div>' +
    '<p class="vd-help" style="margin-top:8px">点遮罩能否关闭、压到多深——每个弹窗都要回答</p>';
  };

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

  D['marquee'] = function () {
    var text = '公告：可视化图鉴新增 布局 · 视觉技法 · 动效 三个分组 &nbsp;·&nbsp; 术语对齐，沟通不猜谜 &nbsp;·&nbsp; ';
    return '<div class="vd-marquee"><div class="vd-marquee-track"><span>' + text + '</span><span>' + text + '</span></div></div>' +
      '<p class="vd-help" style="margin-top:8px">匀速 · 循环 · 不打断 —— 适合公告与行情，不适合需要细读的内容</p>';
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

  D['favicon'] = function () {
    var globe = ic('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14.5 14.5 0 0 1 0 18M12 3a14.5 14.5 0 0 0 0 18"/>');
    return '<div class="vd-fav">' +
      '<div class="vd-fav-tab is-active"><i class="vd-fav-ico">标</i><span>标准术语 · 技术规范用语学习手册</span><em>' + I.x + '</em></div>' +
      '<div class="vd-fav-tab"><i class="vd-fav-ico is-none">' + globe + '</i><span>没配 favicon 的网站</span><em>' + I.x + '</em></div>' +
    '</div>' +
    '<p class="vd-help" style="margin-top:8px">标签页左边的小方块就是它 · 没有它只剩一枚灰色地球</p>';
  };

  /* ---------- 布局 ---------- */

  D['flexbox'] = function () {
    function line(justify) {
      return '<div class="vd-flex-line"><i>' + justify + '</i>' +
        '<div class="vd-flex-box ' + justify + '"><b></b><b></b><b></b></div></div>';
    }
    return '<div class="vd-stack">' +
      line('is-start') + line('is-center') + line('is-between') +
      '<p class="vd-help">主轴对齐三连 · 一维排布：行内怎么分、怎么靠，flex 一句话的事</p>' +
    '</div>';
  };

  D['grid'] = function () {
    return '<div class="vd-grid-demo">' +
      '<span class="is-span">跨 2 列</span><span>A</span>' +
      '<span>B</span><span>C</span><span>D</span>' +
    '</div>' +
    '<p class="vd-help" style="margin-top:8px">先划格子再填内容 · 一格可跨多行多列</p>';
  };

  D['whitespace'] = function () {
    function block(cls) {
      return '<div class="vd-ws ' + cls + '"><b>会员权益</b>' +
        '<span>专属客服 1 对 1</span><span>每月免费下载 10 次</span><span>线下活动优先报名</span></div>';
    }
    return '<div class="vd-ws-row">' +
      '<figure>' + block('is-tight') + '<figcaption>0 呼吸感：全在喊</figcaption></figure>' +
      '<figure>' + block('') + '<figcaption>留白：读得进</figcaption></figure>' +
    '</div>';
  };

  D['responsive'] = function () {
    function cards(n) {
      var s = '';
      for (var i = 0; i < n; i++) s += '<i></i>';
      return '<div class="vd-rs-body">' + s + '</div>';
    }
    return '<div class="vd-rs-row">' +
      '<figure class="vd-rs is-desktop">' + cards(3) + '<figcaption>≥ 1024px · 三栏</figcaption></figure>' +
      '<figure class="vd-rs is-tablet">' + cards(2) + '<figcaption>768–1023 · 两栏</figcaption></figure>' +
      '<figure class="vd-rs is-phone">' + cards(1) + '<figcaption>&lt; 768 · 单栏</figcaption></figure>' +
    '</div>' +
    '<p class="vd-help" style="margin-top:8px">同一页面，断点处自动换形态（768 / 1024 是常用档位）</p>';
  };

  D['sticky'] = function () {
    function row(n) {
      return '<div class="vd-sticky-row"><b>' + n + '</b><span>数据行</span><span>状态正常</span></div>';
    }
    return '<div class="vd-sticky-stage">' +
      '<div class="vd-sticky-scroll">' +
        '<div class="vd-sticky-head">表头 · 吸顶中</div>' +
        row(1) + row(2) + row(3) + row(4) + row(5) + row(6) + row(7) +
      '</div>' +
      '<span class="vd-sticky-fab">↑ 顶部</span>' +
    '</div>' +
    '<p class="vd-help" style="margin-top:8px">中间窗口可以真的滚：表头钉在窗口顶，按钮钉在角落</p>';
  };

  /* ---------- 视觉技法 ---------- */

  D['gradient'] = function () {
    return '<div class="vd-grad-row">' +
      '<figure class="vd-grad is-linear"><figcaption>linear 线性 · 沿方向</figcaption></figure>' +
      '<figure class="vd-grad is-radial"><figcaption>radial 径向 · 从中心</figcaption></figure>' +
      '<figure class="vd-grad is-conic"><figcaption>conic 锥形 · 绕一圈</figcaption></figure>' +
    '</div>' +
    '<b class="vd-grad-text">Gradient Text 渐变文字</b>' +
    '<p class="vd-help" style="margin-top:8px">说「渐变」带方向与两端色 · 文字吃色靠 background-clip: text</p>';
  };

  D['gradient-overlay'] = function () {
    return '<div class="vd-go-row">' +
      '<figure class="vd-go"><div class="vd-go-img"></div><div class="vd-go-shade"></div>' +
        '<figcaption><b>山与湖 · 清晨</b><span>底部压深渐变，白字也可读</span></figcaption></figure>' +
      '<figure class="vd-go"><div class="vd-go-img"></div><div class="vd-go-shade is-vignette"></div>' +
        '<figcaption><b>暗角</b><span>四周压暗，视线聚向中心</span></figcaption></figure>' +
      '<figure class="vd-go"><div class="vd-go-img"></div><div class="vd-go-shade is-feather"></div>' +
        '<figcaption><b>羽化</b><span>边缘渐隐，融进页面底色</span></figcaption></figure>' +
    '</div>';
  };

  D['glassmorphism'] = function () {
    return '<div class="vd-glass-stage">' +
      '<i class="vd-glass-blob b1"></i><i class="vd-glass-blob b2"></i><i class="vd-glass-blob b3"></i>' +
      '<div class="vd-glass-card"><b>毛玻璃卡片</b><span>半透明底 + backdrop-filter: blur(12px)</span></div>' +
    '</div>';
  };

  D['opacity'] = function () {
    function card(op, label, note) {
      return '<div class="vd-op" style="opacity:' + op + '"><b>' + label + '</b><span>' + note + '</span></div>';
    }
    return '<div class="vd-op-row">' +
      card(1, '100%', '完全实') + card('0.7', '70%', '微透 · 次要') + card('0.4', '40%', '明显退后 · 禁用') +
    '</div>' +
    '<p class="vd-help" style="margin-top:8px">退后但不消失 · RGBA 最后一位就是它（0-1）</p>';
  };

  D['accent-color'] = function () {
    function col(cls, accentStyle) {
      return '<div class="vd-ac-col ' + cls + '">' +
        '<span class="vd-label">' + (cls ? '强调色' : '默认灰') + '</span>' +
        '<label><input type="checkbox" checked' + accentStyle + '>推送通知</label>' +
        '<label><input type="radio" name="vd-ac' + (cls ? '-a' : '-b') + '" checked' + accentStyle + '>自动模式</label>' +
        '<input type="range"' + accentStyle + '>' +
      '</div>';
    }
    return '<div class="vd-ac-row">' + col('', '') + col('is-accent', ' style="accent-color:var(--accent)"') + '</div>' +
      '<p class="vd-help" style="margin-top:8px">一屏一个强调色 · 原生控件一行 accent-color 即换肤</p>';
  };

  D['dark-mode'] = function () {
    return '<div class="vd-dm-row">' +
      '<div class="vd-dm is-light"><header>Day · 亮色</header><b>本月支出</b><strong>¥ 2,468</strong>' +
        '<span>底 #FFFDF8 · 文字 #26221B</span></div>' +
      '<div class="vd-dm is-dark"><header>Night · 暗色</header><b>本月支出</b><strong>¥ 2,468</strong>' +
        '<span>底 #22262C · 文字 #E8E5DD 非纯白</span></div>' +
    '</div>' +
    '<p class="vd-help" style="margin-top:8px">不是反色：底色分层、文字降灰、主色提亮要整套重校</p>';
  };

  /* ---------- 动效 ---------- */

  D['hover-effect'] = function () {
    return '<div class="vd-hv-row">' +
      '<figure class="vd-hv-card"><span class="vd-hv-cap">默认态</span><b>普通卡片</b><span>把鼠标放上来试试</span></figure>' +
      '<figure class="vd-hv-card is-hover"><span class="vd-hv-cap">悬停态</span><b>抬升 + 阴影 + 描边变色</b><span>右卡常驻悬停的样子</span></figure>' +
    '</div>' +
    '<p class="vd-help" style="margin-top:8px">两卡都真实响应悬停 · 移动端没有 hover，别只靠它传信息</p>';
  };

  D['transition'] = function () {
    function toggle(smooth, label) {
      return '<label class="vd-tr">' +
        '<input type="checkbox"><span class="vd-tr-box' + (smooth ? ' is-smooth' : '') + '"></span><i>' + label + '</i>' +
      '</label>';
    }
    return '<div class="vd-tr-row">' + toggle(false, '无过渡 · 生硬切换') + toggle(true, '200ms · 平滑过渡') + '</div>' +
      '<p class="vd-help" style="margin-top:8px">两块都能点 · 同样的变化，过程不同，手感天差地别</p>';
  };

  D['entrance-animation'] = function () {
    function step(delay, txt) {
      return '<div class="vd-ent-item" style="animation-delay:' + delay + '">' + txt + '</div>';
    }
    return '<div class="vd-ent">' +
      step('0s', '第一拍 · 立即浮现') +
      step('.18s', '第二拍 · 180ms 后跟上') +
      step('.36s', '第三拍 · 360ms 后收尾') +
    '</div>' +
    '<p class="vd-help" style="margin-top:8px">切去别的页面再回来，动画会重新播放</p>';
  };

  D['pulse-animation'] = function () {
    return '<div class="vd-pulse-row">' +
      '<span class="vd-pulse is-live"><i></i>LIVE 直播中</span>' +
      '<span class="vd-pulse is-online"><i></i>在线</span>' +
      '<span class="vd-pulse is-rec"><i></i>录制中</span>' +
    '</div>' +
    '<p class="vd-help" style="margin-top:8px">一页两三处是氛围 · 处处都闪就成了警报器</p>';
  };

  W.STD_VISUAL_DEMOS = D;
})(window);
