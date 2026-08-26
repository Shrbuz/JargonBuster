/* ============================================================
   anims.js · 概念动画注册表
   每个动画 = { title, hint, stageClass, build(stage) }
   build 在挂载与「重播」时执行；循环节奏由 stage 的 --T 统一控制。
   挂载：window.STD_ANIMS
   ============================================================ */
(function (W) {
  'use strict';

  function el(stage, cls, html, css) {
    var d = document.createElement('div');
    if (cls) d.className = cls;
    if (html != null) d.innerHTML = html;
    if (css) {
      Object.keys(css).forEach(function (k) {
        if (k === '--tx' || k === '--ty' || k.indexOf('--') === 0) d.style.setProperty(k, css[k]);
        else d.style[k] = css[k];
      });
    }
    stage.appendChild(d);
    return d;
  }

  function line(stage, cls, css) {
    return el(stage, 'a-line ' + (cls || ''), null, css);
  }

  function W_(stage) { return stage.clientWidth || 600; }

  /* ---------- 回调链 ---------- */
  function buildCallback(stage) {
    stage.style.setProperty('--T', '7s');
    el(stage, 'fn f1', 'download(url,<br>&nbsp;&nbsp;() =&gt; { … })');
    el(stage, 'fn f2', 'parseData(data,<br>&nbsp;&nbsp;() =&gt; { … })');
    el(stage, 'fn f3', 'render(list)');
    el(stage, 'arrow a1', '&#10142;');
    el(stage, 'arrow a2', '&#10142;');
    el(stage, 'note', '先传进去的是「之后要做的事」：<br>每一步完成时，才回头调用下一步');
    el(stage, 'pill result', '全部完成 ✓');
  }

  /* ---------- 事件循环 ---------- */
  function buildEloop(stage) {
    stage.style.setProperty('--T', '8s');
    el(stage, 'callstack', '');
    el(stage, 'cs-title', '调用栈');
    el(stage, 'webapi', '定时器 / 网络 / DOM 事件<br>（耗时的活儿交出去）');
    el(stage, 'taskq', '任务队列：回调排队');
    el(stage, 'stack-task t1', 'main() 执行中…');
    el(stage, 'stack-task t2', '取下一个回调执行');
    el(stage, 'loop-dot', '');
  }

  /* ---------- HTTP 请求响应 ---------- */
  function buildHttp(stage) {
    var w = W_(stage);
    stage.style.setProperty('--T', '6s');
    el(stage, 'a-node browser', '浏览器<small>client</small>');
    el(stage, 'a-node server', '服务器<small>server</small>');
    line(stage, 'lane', { left: '20%', right: '20%', top: '56%' });
    el(stage, 'pill req-chip', 'GET /api/data', { '--d1': '0s' });
    el(stage, 'pill res-chip', '200 OK · JSON', { '--d2': (3000 / 6000 * 6) + 's' });
    el(stage, 'a-dot info go-dot', '', { left: '20.5%', top: '50%', '--tx': Math.round(w * 0.57) + 'px', '--ty': '6px' });
    el(stage, 'a-dot ok back-dot', '', { right: '20.5%', top: '64%', '--tx': '-' + Math.round(w * 0.57) + 'px', '--ty': '-4px' });
  }

  /* ---------- TCP 三次握手 ---------- */
  function buildTcp(stage) {
    var w = W_(stage);
    stage.style.setProperty('--T', '7.5s');
    el(stage, 'a-node client', '客户端');
    el(stage, 'a-node server', '服务器');
    line(stage, 'l1', { left: '18%', right: '18%', top: '48%' });
    el(stage, 'pill step s1', '① SYN —— 你能听到吗？');
    el(stage, 'pill step s2', '② SYN+ACK —— 能！你能听到我吗？');
    el(stage, 'pill step s3', '③ ACK —— 能！正式开聊');
    el(stage, 'a-dot d1', '', { left: '17%', top: '44%', '--tx': Math.round(w * 0.63) + 'px', '--ty': '10px' });
    el(stage, 'a-dot warn d2', '', { right: '17%', top: '54%', '--tx': '-' + Math.round(w * 0.63) + 'px', '--ty': '12px' });
    el(stage, 'a-dot ok d3', '', { left: '17%', top: '76%', '--tx': Math.round(w * 0.63) + 'px', '--ty': '-6px' });
  }

  /* ---------- DNS 解析 ---------- */
  function buildDns(stage) {
    var w = W_(stage);
    stage.style.setProperty('--T', '9s');
    el(stage, 'a-node client', '你的电脑<small>有缓存吗？</small>');
    el(stage, 'a-node resolver', '递归解析器<small>运营商 / 8.8.8.8</small>');
    el(stage, 'a-node root hop', '根服务器<small>.</small>');
    el(stage, 'a-node tld hop', '顶级域<small>.com</small>');
    el(stage, 'a-node auth hop', '权威域名服务器');
    el(stage, 'pill ip-chip', '拿到 IP: 93.184.216.34');
    el(stage, 'a-dot h1', '', { left: '16%', top: '47%', '--tx': Math.round(w * 0.13) + 'px', '--ty': '-2px' });
    el(stage, 'a-dot h2', '', { left: '46%', top: '47%', '--tx': Math.round(w * 0.24) + 'px', '--ty': '-62px' });
    el(stage, 'a-dot h3', '', { left: '46%', top: '47%', '--tx': Math.round(w * 0.24) + 'px', '--ty': '0px' });
    el(stage, 'a-dot h4', '', { left: '46%', top: '47%', '--tx': Math.round(w * 0.24) + 'px', '--ty': '62px' });
    el(stage, 'a-dot ok h5', '', { left: '46%', top: '47%', '--tx': '-' + Math.round(w * 0.24) + 'px', '--ty': '0px' });
    el(stage, 'a-dot ok h6', '', { left: '16%', top: '47%', '--tx': '-' + Math.round(w * 0.13) + 'px', '--ty': '2px' });
  }

  /* ---------- 栈 LIFO ---------- */
  function buildStack(stage) {
    stage.style.setProperty('--T', '8s');
    var c = document.createElement('div');
    c.className = 'box-container';
    ['fnC()', 'fnB()', 'fnA()'].forEach(function (label) {
      var b = document.createElement('div');
      b.className = 'box ' + ({ 'fnC()': 'b3', 'fnB()': 'b2', 'fnA()': 'b1' })[label];
      b.textContent = label;
      c.appendChild(b);
    });
    stage.appendChild(c);
    el(stage, 'hint-lifo', '<b>后进先出 LIFO</b><br>最后压入的函数<br>最先执行完毕弹出');
    el(stage, 'a-label', '调用栈', { left: '8%', top: '8%' });
  }

  /* ---------- 队列 FIFO ---------- */
  function buildQueue(stage) {
    stage.style.setProperty('--T', '7.5s');
    el(stage, 'pipe', '');
    el(stage, 'item i1', '任务 1');
    el(stage, 'item i2', '任务 2');
    el(stage, 'item i3', '任务 3');
    el(stage, 'a-label in-label', '入口 →');
    el(stage, 'a-label out-label', '→ 出口');
    el(stage, 'pill fifo-note', '先进先出：先来的任务先离开队列被执行');
  }

  /* ---------- 发布订阅 ---------- */
  function buildPubsub(stage) {
    var w = W_(stage);
    stage.style.setProperty('--T', '7s');
    el(stage, 'a-node publisher', '发布者');
    el(stage, 'a-node broker', '消息代理<small>EventBus</small>');
    el(stage, 'a-node sub1', '邮件服务');
    el(stage, 'a-node sub2', '库存服务');
    el(stage, 'a-node sub3', '日志服务');
    el(stage, 'pill topic-tag', 'topic: order.created');
    el(stage, 'a-dot p-dot', '', { left: '15%', top: '52%', '--tx': Math.round(w * 0.26) + 'px', '--ty': '-4px' });
    el(stage, 'a-dot info s1d', '', { left: '60%', top: '52%', '--tx': Math.round(w * 0.32) + 'px', '--ty': '-84px' });
    el(stage, 'a-dot ok s2d', '', { left: '60%', top: '52%', '--tx': Math.round(w * 0.32) + 'px', '--ty': '0px' });
    el(stage, 'a-dot warn s3d', '', { left: '60%', top: '52%', '--tx': Math.round(w * 0.32) + 'px', '--ty': '84px' });
  }

  /* ---------- 同步 vs 异步 ---------- */
  function buildSyncAsync(stage) {
    stage.style.setProperty('--T', '8s');
    el(stage, 'a-label rl-sync row-label', '同步（阻塞）');
    el(stage, 'a-label rl-async row-label', '异步（非阻塞）');
    el(stage, 'track trk-sync', '');
    el(stage, 'track trk-async', '');
    el(stage, 'seg sg1', '任务 A');
    el(stage, 'seg sg2', '任务 B');
    el(stage, 'seg sg3', '任务 C');
    el(stage, 'seg aseg1', '任务 A');
    el(stage, 'seg aseg2', '任务 B（等待中）');
    el(stage, 'seg aseg3', '任务 C');
    el(stage, 'pill free-chip', 'B 在等的时候，主线程没闲着');
    el(stage, 'foot-note', '同样的三个任务，不同的调度方式');
  }

  /* ---------- 缓存命中/未命中 ---------- */
  function buildCache(stage) {
    var w = W_(stage);
    stage.style.setProperty('--T', '8s');
    el(stage, 'a-node client', '请求');
    el(stage, 'a-node cache-node', '缓存<small>Redis</small>');
    el(stage, 'a-node origin', '源站<small>数据库</small>');
    line(stage, 'hit-lane', { left: '16%', right: '38%', top: '50%' });
    line(stage, 'miss-lane', { left: '16%', right: '16%', top: '78%' });
    el(stage, 'a-pill lt-hit lane-tag', '命中 ✓：直接拿走', { left: '16%', top: '30%' });
    el(stage, 'a-pill lt-miss lane-tag', '未命中：回源取数并写入缓存', { left: '16%', top: '86%' });
    el(stage, 'a-dot ok hit-dot', '', { left: '16%', top: '46%', '--tx': Math.round(w * 0.22) + 'px', '--ty': '0px' });
    el(stage, 'a-dot ok hit-back', '', { left: '40%', top: '46%', '--tx': '-' + Math.round(w * 0.22) + 'px', '--ty': '0px' });
    el(stage, 'a-dot warn miss-dot', '', { left: '16%', top: '74%', '--tx': Math.round(w * 0.68) + 'px', '--ty': '0px' });
    el(stage, 'a-dot miss-back', '', { right: '16%', top: '74%', '--tx': '-' + Math.round(w * 0.68) + 'px', '--ty': '0px' });
  }

  /* ---------- Git 分支合并 ---------- */
  function buildGitBranch(stage) {
    stage.style.setProperty('--T', '8s');
    el(stage, 'main-track', '');
    el(stage, 'feat-track', '');
    el(stage, 'a-label lb-main track-label', 'main');
    el(stage, 'a-label lb-feat track-label', 'feature/login');
    el(stage, 'commit c1', '');
    el(stage, 'commit c2', '');
    el(stage, 'commit c3', '');
    el(stage, 'commit fc1', '');
    el(stage, 'commit fc2', '');
    el(stage, 'a-pill', '初始提交', { left: '11%', top: '38%' });
    el(stage, 'a-pill', '新分支：从 main 某一点分出', { left: '28%', top: '80%' });
    el(stage, 'a-pill', '登录页完成 ×2 提交', { left: '44%', top: '80%' });
    el(stage, 'a-pill', 'main 不受影响', { left: '37%', top: '12%' });
    el(stage, 'merge-path', '');
    el(stage, 'pill merge-tag', 'merge：把分支成果合回主线');
  }

  /* ---------- Token 流式输出 ---------- */
  function buildToken(stage) {
    stage.style.setProperty('--T', '9s');
    el(stage, 'prompt-box', '提示词：「用一句话解释什么是 API」');
    var out = el(stage, 'out-box', '');
    var tokens = ['API', ' 就是', ' 餐厅的', ' 菜单', '：', ' 它规定', ' 你能点什么', '、', ' 怎么点', '，', ' 以及后厨', ' 会端上什么'];
    tokens.forEach(function (t, i) {
      var s = document.createElement('span');
      s.className = 'tok';
      s.textContent = t;
      s.style.setProperty('--td', (i / tokens.length * 0.65 * 9).toFixed(2) + 's');
      out.appendChild(s);
    });
    var caret = document.createElement('span');
    caret.className = 'caret';
    out.appendChild(caret);
    el(stage, 'counter', '模型按 token 逐个吐字 —— 这就是「流式输出」');
  }

  /* ---------- CSS 优先级 ---------- */
  function buildSpec(stage) {
    stage.style.setProperty('--T', '8s');
    el(stage, 'sel s1', '#btn.save');
    el(stage, 'sel s2', '.btn');
    el(stage, 'sel s3', 'div');
    el(stage, 'spec-badge b1', 'ID 1 · 类 1 · 元素 0');
    el(stage, 'spec-badge b2', 'ID 0 · 类 1 · 元素 0');
    el(stage, 'spec-badge b3', 'ID 0 · 类 0 · 元素 1');
    el(stage, 'pill spec-win', '同一条样式有多个选择器命中？看权重：ID 最高 → 生效的是它');
  }

  /* ---------- margin 塌陷 ---------- */
  function buildCollapse(stage) {
    stage.style.setProperty('--T', '8s');
    el(stage, 'block up', '上块<small>margin-bottom: 20px</small>');
    el(stage, 'block down', '下块<small>margin-top: 30px</small>');
    el(stage, 'mline m1', '');
    el(stage, 'mline m2', '');
    el(stage, 'pill m-note', '相邻 margin 不叠加而是「塌陷」成一个：取较大值 30px（不是 20 + 30）');
  }

  /* ---------- 层叠上下文 ---------- */
  function buildStackCtx(stage) {
    stage.style.setProperty('--T', '8s');
    var pa = document.createElement('div');
    pa.className = 'panel pa';
    pa.innerHTML = '层叠上下文 A<br>z-index: 1';
    var ia = document.createElement('div');
    ia.className = 'inner ia';
    ia.innerHTML = '子元素<br>z-index: 50';
    pa.appendChild(ia);
    stage.appendChild(pa);
    var pb = document.createElement('div');
    pb.className = 'panel pb';
    pb.innerHTML = '层叠上下文 B<br>z-index: 2';
    var ib = document.createElement('div');
    ib.className = 'inner ib';
    ib.innerHTML = '子元素<br>z-index: 10';
    pb.appendChild(ib);
    stage.appendChild(pb);
    el(stage, 'pill ctx-note', '50 &gt; 10 却没用：子元素的 z 只在「父容器的层叠上下文」内比较，B 容器整体更高 → 盖住 A');
  }

  /* ---------- 变量提升 ---------- */
  function buildHoist(stage) {
    stage.style.setProperty('--T', '8s');
    el(stage, 'code-line l1', 'console.log(x)   // ?');
    el(stage, 'code-line l2', 'var x = 1');
    el(stage, 'hoist-ghost', 'var 的声明被提升到顶部，但「赋值」留在原位');
    el(stage, 'val v1', 'x = undefined', { left: '62%', top: '22%' });
    el(stage, 'val v2', 'x = 1', { left: '62%', top: '46%' });
    el(stage, 'pill tdz-tag', '对比 let/const：同样位置访问直接报错（暂时性死区 TDZ）');
  }

  /* ---------- 短路求值 ---------- */
  function buildShort(stage) {
    stage.style.setProperty('--T', '8s');
    el(stage, 'a-label op-label l-and', 'a &amp;&amp; b　a = false');
    el(stage, 'operand a1', 'a');
    el(stage, 'operand b1', 'b');
    el(stage, 'result r1', '结果 = false');
    line(stage, 'skip sk1', { left: '25%', right: '28%', top: '28%' });
    el(stage, 'a-label op-label l-or', 'a || b　a = true');
    el(stage, 'operand a2', 'a');
    el(stage, 'operand b2', 'b');
    el(stage, 'result r2', '结果 = true');
    line(stage, 'skip sk2', { left: '25%', right: '28%', top: '68%' });
    el(stage, 'pill short-note', 'b 被「短路」跳过：a 已决定结果，b 根本不会执行（有副作用也不触发）');
  }

  /* ---------- 隐式类型转换 ---------- */
  function buildCoerce(stage) {
    stage.style.setProperty('--T', '9s');
    el(stage, 'a-label co-title', '== 会先做隐式转换再比较（=== 不做转换）');
    el(stage, 'co-left l1', '&quot;5&quot;');
    el(stage, 'co-conv l1', '转数字');
    el(stage, 'co-right l1', '5');
    el(stage, 'co-res l1', 'true ✓');
    el(stage, 'co-left l2', '0');
    el(stage, 'co-conv l2', '转布尔');
    el(stage, 'co-right l2', 'false');
    el(stage, 'co-res l2', 'true ✓');
    el(stage, 'co-left l3', 'null');
    el(stage, 'co-conv l3', '== undefined');
    el(stage, 'co-right l3', 'undefined');
    el(stage, 'co-res l3', 'true ✓');
    el(stage, 'co-left l4', '&quot;1&quot;');
    el(stage, 'co-conv l4', '=== 不做转换');
    el(stage, 'co-right l4', '1');
    el(stage, 'co-res l4 warn', 'false ✗');
    el(stage, 'pill co-note', '隐式转换藏着很多坑：能用 === 就别用 ==');
  }

  /* ---------- fetch vs pull ---------- */
  function buildFetchPull(stage) {
    stage.style.setProperty('--T', '8s');
    el(stage, 'rp-track', '');
    el(stage, 'lp-track', '');
    el(stage, 'a-label track-label lb-remote', 'remote/main');
    el(stage, 'a-label track-label lb-local', 'local/main');
    el(stage, 'commit rc1', '');
    el(stage, 'commit rc2', '');
    el(stage, 'commit lc1', '');
    el(stage, 'fetched fc1', '');
    el(stage, 'fetched fc2', '');
    el(stage, 'pill fetch-tag', 'fetch：把远程提交拿到本地（暂存），此时 local/main 指针不动');
    el(stage, 'pill pull-tag', 'pull = fetch + merge：合并后 local/main 前进到与远程一致');
  }

  /* ---------- 事务隔离 ---------- */
  function buildTxIso(stage) {
    var w = W_(stage);
    stage.style.setProperty('--T', '9s');
    el(stage, 'a-node t1', '事务 T1<small>写余额</small>');
    el(stage, 'a-node t2', '事务 T2<small>读余额</small>');
    el(stage, 'db-box', '余额 = 100<small>（未提交）</small>');
    el(stage, 'a-dot warn dirty-d', '', { right: '24%', top: '50%', '--tx': '-' + Math.round(w * 0.24) + 'px', '--ty': '-8px' });
    el(stage, 'a-dot ok commit-d', '', { left: '50%', top: '58%', '--tx': Math.round(w * 0.24) + 'px', '--ty': '10px' });
    el(stage, 'pill dirty-tag', '读未提交：T2 能读到未提交的 100 —— 脏读！');
    el(stage, 'pill commit-tag', '读已提交 / 可重复读 / 串行化：等 commit 后才可见，防脏读');
  }

  W.STD_ANIMS = {
    'callback-chain': { title: '回调链的执行顺序', hint: '绿色依次点亮 = 调用顺序', stageClass: 'st-callback', build: buildCallback },
    'event-loop': { title: '事件循环', hint: '圆点转动一圈 = 主线程取一轮任务', stageClass: 'st-eloop', build: buildEloop },
    'http-request-response': { title: 'HTTP 请求-响应', hint: '蓝点去程请求，绿点回程响应', stageClass: 'st-http', build: buildHttp },
    'tcp-handshake': { title: 'TCP 三次握手', hint: '三轮对话确认双向通路', stageClass: 'st-tcp', build: buildTcp },
    'dns-lookup': { title: 'DNS 域名解析', hint: '逐级询问直到拿到 IP', stageClass: 'st-dns', build: buildDns },
    'stack-push-pop': { title: '栈：后进先出', hint: '箱子压入与弹出即调用栈', stageClass: 'st-stack', build: buildStack },
    'queue-fifo': { title: '队列：先进先出', hint: '任务按到达顺序依次离队', stageClass: 'st-queue', build: buildQueue },
    'pub-sub': { title: '发布-订阅模式', hint: '一次发布，多方各自收到', stageClass: 'st-pubsub', build: buildPubsub },
    'sync-vs-async': { title: '同步 vs 异步', hint: '上下两条车道对比调度差异', stageClass: 'st-sync', build: buildSyncAsync },
    'cache-hit-miss': { title: '缓存的命中与未命中', hint: '绿线命中直达；橙线未命中回源', stageClass: 'st-cache', build: buildCache },
    'git-branch-merge': { title: 'Git 分支与合并', hint: '提交点亮 → 分支推进 → 合流', stageClass: 'st-git', build: buildGitBranch },
    'token-stream': { title: 'Token 流式生成', hint: '色块逐个出现即模型逐词输出', stageClass: 'st-token', build: buildToken },
    'css-specificity': { title: 'CSS 优先级权重', hint: '三个选择器依次点亮，权重最高者胜出', stageClass: 'st-spec', build: buildSpec },
    'margin-collapse': { title: 'margin 塌陷', hint: '两条 margin 相遇后合并成一条，取较大值', stageClass: 'st-collapse', build: buildCollapse },
    'stacking-context': { title: '层叠上下文', hint: '子元素 z 再高也跳不出父容器', stageClass: 'st-stackctx', build: buildStackCtx },
    'hoisting': { title: '变量提升', hint: '声明被提前、赋值留在原位', stageClass: 'st-hoist', build: buildHoist },
    'boolean-short-circuit': { title: '短路求值', hint: 'a 已定结果 → b 被跳过', stageClass: 'st-short', build: buildShort },
    'type-coercion': { title: '隐式类型转换', hint: '逐行看 == 如何转换后比较', stageClass: 'st-coerce', build: buildCoerce },
    'git-fetch-pull': { title: 'fetch 与 pull 的区别', hint: 'fetch 只拿不回，pull 才合并', stageClass: 'st-fetchpull', build: buildFetchPull },
    'transaction-isolation': { title: '事务隔离级别', hint: '不同隔离级别下能否读到未提交数据', stageClass: 'st-txiso', build: buildTxIso }
  };
})(window);
