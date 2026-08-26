/* ============================================================
   visuals.js · 内联 SVG 图解注册表
   约定：svg 使用主题变量（var(--text) 等）自动适配深浅色；
        词条通过 visual:{kind:'svg', id} 引用，缺失时页面显示占位块。
   挂载：window.STD_VISUALS
   ============================================================ */
(function (W) {
  'use strict';

  var FONT = "Segoe UI, PingFang SC, Microsoft YaHei, sans-serif";

  function svgRoot(viewBox, inner) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + viewBox +
      '" font-family="' + FONT + '" role="img">' + inner + '</svg>';
  }

  function box(x, y, w, h, label, opts) {
    opts = opts || {};
    var fill = opts.fill || 'var(--surface)';
    var stroke = opts.stroke || 'var(--line-strong)';
    var color = opts.color || 'var(--text)';
    var fs = opts.fs || 14;
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="' + fill +
      '" stroke="' + stroke + '" stroke-width="1.5"/>' +
      (label ? '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 + fs * 0.36) + '" text-anchor="middle" font-size="' + fs +
        '" fill="' + color + '">' + label + '</text>' : '');
  }

  var _markerSeq = 0;

  function arrowLine(x1, y1, x2, y2, opts) {
    opts = opts || {};
    var mid = opts.mid + '_' + (++_markerSeq);
    return '<defs><marker id="' + mid + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="' + (opts.stroke || 'var(--accent)') + '"/></marker></defs>' +
      '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (opts.stroke || 'var(--accent)') +
      '" stroke-width="2" marker-end="url(#' + mid + ')' + '"' + (opts.dash ? ' stroke-dasharray="6 5"' : '') + '/>';
  }

  function txt(x, y, s, opts) {
    opts = opts || {};
    return '<text x="' + x + '" y="' + y + '" font-size="' + (opts.fs || 13) + '" fill="' + (opts.fill || 'var(--muted)') +
      '"' + (opts.anchor ? ' text-anchor="' + opts.anchor + '"' : '') + (opts.weight ? ' font-weight="' + opts.weight + '"' : '') + '>' + s + '</text>';
  }

  var V = {};

  /* ---------- 编程基础 ---------- */

  V['closure-scope'] = {
    title: '闭包捕获外部变量',
    viewBox: '0 0 680 340',
    svg: svgRoot('0 0 680 340',
      box(24, 40, 632, 276, '', { fill: 'var(--surface-2)', dash: true }) +
      txt(44, 70, '外层函数 createCounter() 的作用域', { fs: 15, weight: 700, fill: 'var(--text)' }) +
      box(60, 100, 150, 64, '') + txt(135, 128, 'count', { anchor: 'middle', fs: 16, weight: 700, fill: 'var(--accent)' }) + txt(135, 148, '= 0', { anchor: 'middle', fill: 'var(--muted)' }) +
      box(300, 96, 320, 180, '') +
      txt(460, 132, '内部函数 counter()', { anchor: 'middle', fs: 15, weight: 700, fill: 'var(--text)' }) +
      txt(460, 168, 'return ++count;', { anchor: 'middle', fs: 14, fill: 'var(--info)' }) +
      txt(460, 200, '外层早已执行完毕，', { anchor: 'middle' }) +
      txt(460, 222, 'count 却依然活着、可读可写', { anchor: 'middle' }) +
      arrowLine(214, 132, 296, 150, { mid: 'm1', dash: true }) +
      txt(255, 112, '引用捕获', { anchor: 'middle', fs: 12 }) +
      txt(44, 296, '外部拿到的 counter 函数 = 函数体 + 对 count 的引用（即闭包）', { fs: 12.5 })
    )
  };

  V['recursion-stack'] = {
    title: '递归调用栈的展开与返回',
    viewBox: '0 0 680 340',
    svg: svgRoot('0 0 680 340',
      box(60, 30, 220, 56, 'fact(3) → 3 × fact(2)', { fill: 'var(--surface)' }) +
      box(90, 106, 220, 56, 'fact(2) → 2 × fact(1)', { fill: 'var(--surface)' }) +
      box(120, 182, 220, 56, 'fact(1)', { fill: 'var(--accent-soft)', stroke: 'var(--accent)' }) +
      txt(230, 268, '基线条件：n ≤ 1 直接返回 1，递归触底', { anchor: 'middle', fs: 13 }) +
      arrowLine(170, 240, 170, 250, { mid: 'r0', stroke: 'var(--muted)' }) +
      arrowLine(400, 210, 360, 140, { mid: 'r1', stroke: 'var(--ok)', dash: true }) +
      arrowLine(430, 160, 330, 66, { mid: 'r2', stroke: 'var(--ok)', dash: true }) +
      txt(452, 176, '逐层返回：1 → 2×1=2 → 3×2=6', { fs: 13, fill: 'var(--ok)' }) +
      txt(60, 320, '每层调用压入一个栈帧；层级过深 → Stack Overflow', { fs: 12.5 })
    )
  };

  V['compile-flow'] = {
    title: '编译执行与解释执行的两条路径',
    viewBox: '0 0 680 340',
    svg: svgRoot('0 0 680 340',
      txt(40, 44, '编译型（C / Go / Rust）', { fs: 15, weight: 700, fill: 'var(--text)' }) +
      box(40, 62, 110, 52, '源码') +
      arrowLine(152, 88, 208, 88, { mid: 'c1' }) +
      box(212, 62, 130, 52, '编译器', { fill: 'var(--accent-soft)', stroke: 'var(--accent)' }) +
      arrowLine(344, 88, 400, 88, { mid: 'c2' }) +
      box(404, 62, 130, 52, '机器码文件') +
      arrowLine(536, 88, 592, 88, { mid: 'c3' }) +
      box(594, 62, 60, 52, 'CPU') +
      txt(40, 138, '先翻译后运行 · 启动慢、跑得快', { fs: 12 }) +

      txt(40, 196, '解释型（Python / JS）', { fs: 15, weight: 700, fill: 'var(--text)' }) +
      box(40, 214, 110, 52, '源码') +
      arrowLine(152, 240, 208, 240, { mid: 'i1' }) +
      box(212, 214, 130, 52, '解释器逐句翻译', { fill: 'var(--warn-soft)', stroke: 'var(--warn)', fs: 12 }) +
      arrowLine(344, 240, 400, 240, { mid: 'i2' }) +
      box(404, 214, 120, 52, '边翻译边执行') +
      txt(40, 290, '拿起就读 · 改完即跑 · 跨平台', { fs: 12 }) +
      txt(40, 320, '现代运行时多为混合：字节码 + JIT 即时编译', { fs: 12, fill: 'var(--info)' })
    )
  };

  /* ---------- 数据结构与算法 ---------- */

  V['array-memory'] = {
    title: '数组：连续内存与下标寻址',
    viewBox: '0 0 680 260',
    svg: svgRoot('0 0 680 260',
      (function () {
        var s = '';
        for (var i = 0; i < 6; i++) {
          var x = 80 + i * 88;
          s += box(x, 100, 76, 56, String(i === 2 ? 7 : i * i), { fill: i === 2 ? 'var(--accent-soft)' : 'var(--surface)', stroke: i === 2 ? 'var(--accent)' : 'var(--line-strong)' });
          s += txt(x + 38, 92, 'arr[' + i + ']', { anchor: 'middle', fs: 12 });
          s += txt(x + 38, 178, '0x' + (100 + i * 4).toString(16), { anchor: 'middle', fs: 11 });
        }
        s += arrowLine(118, 216, 254, 216, { mid: 'a9', stroke: 'var(--ok)' });
        s += txt(186, 238, '首地址 + 下标 × 步长 = O(1) 直达', { anchor: 'middle', fs: 12.5, fill: 'var(--ok)' });
        s += txt(340, 48, '内存地址连续 —— 随机访问快，中间插入删除要搬移', { anchor: 'middle', fs: 13.5, weight: 700, fill: 'var(--text)' });
        return s;
      })()
    )
  };

  V['linked-list-nodes'] = {
    title: '链表：指针串联的非连续存储',
    viewBox: '0 0 680 260',
    svg: svgRoot('0 0 680 260',
      box(70, 100, 120, 60, 'data | next') +
      box(280, 130, 120, 60, 'data | next') +
      box(480, 90, 120, 60, 'data | null') +
      arrowLine(190, 122, 282, 158, { mid: 'l1' }) +
      arrowLine(400, 158, 478, 124, { mid: 'l2' }) +
      txt(130, 92, 'head 头指针', { fs: 12 }) +
      txt(235, 205, 'next 指针', { fs: 12, fill: 'var(--accent)' }) +
      txt(340, 48, '节点散落各处，靠指针相连 —— 插删只改指针，随机访问必须遍历', { anchor: 'middle', fs: 13.5, weight: 700, fill: 'var(--text)' })
    )
  };

  V['hash-buckets'] = {
    title: '哈希表：键经哈希函数定位桶',
    viewBox: '0 0 680 320',
    svg: svgRoot('0 0 680 320',
      box(50, 120, 110, 52, 'key: name', { fs: 13 }) +
      arrowLine(162, 146, 226, 146, { mid: 'h0' }) +
      box(230, 116, 150, 60, 'hash(key) % 8', { fill: 'var(--accent-soft)', stroke: 'var(--accent)', fs: 13 }) +
      arrowLine(382, 146, 446, 146, { mid: 'h1' }) +
      (function () {
        var s = '';
        for (var i = 0; i < 8; i++) {
          var y = 36 + i * 32;
          s += box(450, y, 46, 26, String(i), { fs: 11, fill: i === 5 ? 'var(--warn-soft)' : 'var(--surface)' });
        }
        s += box(506, 36 + 5 * 32, 130, 26, '"张三"', { fs: 12, fill: 'var(--warn-soft)', stroke: 'var(--warn)' });
        s += box(506, 36 + 5 * 32 - 30, 130, 26, '"李四"(碰撞链)', { fs: 11, fill: 'var(--warn-soft)', stroke: 'var(--warn)' });
        return s;
      })() +
      arrowLine(470, 148, 470, 172, { mid: 'h2', stroke: 'var(--warn)' }) +
      txt(60, 250, '平均 O(1) 定位；不同 key 落进同一桶 = 哈希冲突，用链表法/开放寻址解决', { fs: 12.5 })
    )
  };

  V['tree-structure'] = {
    title: '树：一对多的层级结构',
    viewBox: '0 0 680 300',
    svg: svgRoot('0 0 680 300',
      (function () {
        function node(x, y, l, hot) {
          return '<circle cx="' + x + '" cy="' + y + '" r="20" fill="' + (hot ? 'var(--accent-soft)' : 'var(--surface)') + '" stroke="' + (hot ? 'var(--accent)' : 'var(--line-strong)') + '" stroke-width="1.5"/>' +
            '<text x="' + x + '" y="' + (y + 5) + '" text-anchor="middle" font-size="13" fill="var(--text)">' + l + '</text>';
        }
        function edge(x1, y1, x2, y2) {
          return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="var(--line-strong)" stroke-width="2"/>';
        }
        return edge(340, 70, 200, 150) + edge(340, 70, 480, 150) + edge(200, 150, 120, 230) + edge(200, 150, 280, 230) +
          node(340, 70, 'A') + node(200, 150, 'B') + node(480, 150, 'C') + node(120, 230, 'D') + node(280, 230, 'E');
      })() +
      txt(340, 34, '根节点 A', { anchor: 'middle', fs: 12 }) +
      txt(84, 264, '叶子 D / E：没有子节点', { fs: 12 }) +
      txt(520, 184, 'B、C 是 A 的子节点', { fs: 12 }) +
      txt(340, 292, '文件系统、DOM、组织架构……都是树', { anchor: 'middle', fs: 13 })
    )
  };

  V['graph-nodes'] = {
    title: '图：顶点与边的网状关系',
    viewBox: '0 0 680 320',
    svg: svgRoot('0 0 680 320',
      (function () {
        function node(x, y, l) {
          return '<circle cx="' + x + '" cy="' + y + '" r="21" fill="var(--surface)" stroke="var(--accent)" stroke-width="1.5"/>' +
            '<text x="' + x + '" y="' + (y + 5) + '" text-anchor="middle" font-size="13" fill="var(--text)">' + l + '</text>';
        }
        function e(x1, y1, x2, y2, w) {
          return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="var(--line-strong)" stroke-width="2"/>' +
            '<text x="' + ((x1 + x2) / 2 + 8) + '" y="' + ((y1 + y2) / 2 - 6) + '" font-size="11" fill="var(--muted)">' + w + '</text>';
        }
        return e(180, 90, 380, 70, '4') + e(180, 90, 240, 220, '2') + e(380, 70, 500, 160, '7') +
          e(240, 220, 420, 250, '5') + e(380, 70, 240, 220, '3') + node(180, 90, 'A') + node(380, 70, 'B') +
          node(240, 220, 'C') + node(500, 160, 'D') + node(420, 250, 'E');
      })() +
      txt(340, 300, '社交好友、地图路线、依赖关系……顶点 + 边（可带权重）即可建模', { anchor: 'middle', fs: 13 })
    )
  };

  V['big-o-curves'] = {
    title: '常见时间复杂度的增长曲线',
    viewBox: '0 0 680 340',
    svg: svgRoot('0 0 680 340',
      '<line x1="70" y1="290" x2="630" y2="290" stroke="var(--line-strong)" stroke-width="2"/>' +
      '<line x1="70" y1="290" x2="70" y2="40" stroke="var(--line-strong)" stroke-width="2"/>' +
      '<path d="M70 270 Q 400 268 630 262" fill="none" stroke="var(--ok)" stroke-width="2.5"/>' +
      '<path d="M70 270 C 200 240 350 200 620 150" fill="none" stroke="var(--info)" stroke-width="2.5"/>' +
      '<path d="M70 270 L 600 110" fill="none" stroke="var(--accent)" stroke-width="2.5"/>' +
      '<path d="M70 270 C 250 230 420 150 560 50" fill="none" stroke="var(--warn)" stroke-width="2.5"/>' +
      '<path d="M70 270 C 160 250 260 160 340 42" fill="none" stroke="var(--danger)" stroke-width="2.5"/>' +
      txt(600, 250, 'O(n)', { fill: 'var(--ok)', fs: 13, weight: 700 }) +
      txt(560, 138, 'O(log n)', { fill: 'var(--info)', fs: 13, weight: 700 }) +
      txt(612, 96, 'O(1)', { fill: 'var(--muted)', fs: 12 }) +
      txt(470, 128, 'O(n log n)', { fill: 'var(--warn)', fs: 13, weight: 700 }) +
      txt(352, 60, 'O(n²)', { fill: 'var(--danger)', fs: 13, weight: 700 }) +
      txt(340, 322, 'n 增大时耗时如何增长 —— 曲线越平越好', { anchor: 'middle', fs: 13 }) +
      txt(58, 34, '耗时', { fs: 12 }) + txt(636, 306, 'n 规模', { fs: 12 })
    )
  };

  V['bfs-layers'] = {
    title: '广度优先：像水波一样逐层扩散',
    viewBox: '0 0 680 300',
    svg: svgRoot('0 0 680 300',
      '<circle cx="340" cy="150" r="26" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2"/>' +
      '<text x="340" y="155" text-anchor="middle" font-size="13" fill="var(--text)">S</text>' +
      '<circle cx="340" cy="150" r="80" fill="none" stroke="var(--line-strong)" stroke-dasharray="5 5"/>' +
      '<circle cx="340" cy="150" r="130" fill="none" stroke="var(--line-strong)" stroke-dasharray="5 5"/>' +
      (function () {
        function node(x, y, l) {
          return '<circle cx="' + x + '" cy="' + y + '" r="17" fill="var(--surface)" stroke="var(--line-strong)"/>' +
            '<text x="' + x + '" y="' + (y + 4) + '" text-anchor="middle" font-size="12" fill="var(--text)">' + l + '</text>';
        }
        return node(250, 105, 'a') + node(430, 108, 'b') + node(262, 196, 'c') + node(418, 192, 'd') +
          node(160, 55, 'e') + node(520, 60, 'f') + node(150, 245, 'g') + node(530, 240, 'h');
      })() +
      txt(340, 40, '第 1 圈：距起点一步的邻居', { anchor: 'middle', fs: 12 }) +
      txt(340, 286, '第 2 圈：再远一步 —— 借助队列先进先出实现「按圈」遍历', { anchor: 'middle', fs: 12.5 })
    )
  };

  /* ---------- 后端 / 架构 ---------- */

  V['mono-vs-micro'] = {
    title: '单体架构 vs 微服务架构',
    viewBox: '0 0 680 340',
    svg: svgRoot('0 0 680 340',
      txt(170, 40, '单体 Monolith', { anchor: 'middle', fs: 15, weight: 700, fill: 'var(--text)' }) +
      box(60, 60, 220, 200, '') +
      box(80, 80, 180, 44, '用户界面') + box(80, 136, 180, 44, '业务逻辑') + box(80, 192, 180, 44, '数据访问') +
      txt(170, 292, '一个包全打包 · 部署简单', { anchor: 'middle', fs: 12 }) +
      txt(170, 314, '一处崩溃全线瘫痪', { anchor: 'middle', fs: 12, fill: 'var(--danger)' }) +

      txt(500, 40, '微服务 Microservices', { anchor: 'middle', fs: 15, weight: 700, fill: 'var(--text)' }) +
      box(420, 60, 160, 40, 'API 网关', { fill: 'var(--accent-soft)', stroke: 'var(--accent)' }) +
      box(370, 130, 86, 44, '订单', { fs: 12 }) +
      box(470, 130, 86, 44, '支付', { fs: 12 }) +
      box(570, 130, 86, 44, '库存', { fs: 12 }) +
      box(395, 210, 86, 44, '用户', { fs: 12 }) +
      box(495, 210, 86, 44, '通知', { fs: 12 }) +
      arrowLine(500, 102, 440, 126, { mid: 'mm1' }) +
      arrowLine(500, 102, 500, 126, { mid: 'mm2' }) +
      arrowLine(500, 102, 580, 126, { mid: 'mm3' }) +
      txt(500, 292, '独立开发部署扩容', { anchor: 'middle', fs: 12, fill: 'var(--ok)' }) +
      txt(500, 314, '代价：分布式复杂度', { anchor: 'middle', fs: 12, fill: 'var(--warn)' })
    )
  };

  V['mq-flow'] = {
    title: '消息队列：削峰、解耦、异步',
    viewBox: '0 0 680 300',
    svg: svgRoot('0 0 680 300',
      box(50, 120, 110, 60, '生产者', {}) +
      txt(105, 105, '订单事件', { anchor: 'middle', fs: 12 }) +
      arrowLine(162, 150, 232, 150, { mid: 'q0' }) +
      (function () {
        var s = '';
        for (var i = 0; i < 5; i++) {
          s += box(238 + i * 54, 122, 44, 56, 'msg', { fs: 11, fill: i < 3 ? 'var(--accent-soft)' : 'var(--surface)', stroke: i < 3 ? 'var(--accent)' : 'var(--line-strong)' });
        }
        return s;
      })() +
      txt(380, 100, '队列缓冲（先进先出）', { anchor: 'middle', fs: 12.5 }) +
      arrowLine(514, 150, 578, 150, { mid: 'q1' }) +
      box(584, 120, 70, 60, '消费者', { fs: 13 }) +
      txt(340, 240, '高峰期消息排队慢慢处理（削峰）· 发送方不关心谁来消费（解耦）· 立即返回先干别的（异步）', { anchor: 'middle', fs: 12.5 })
    )
  };

  V['jwt-anatomy'] = {
    title: 'JWT 三段式结构',
    viewBox: '0 0 680 300',
    svg: svgRoot('0 0 680 300',
      box(50, 80, 180, 64, 'Header', { fill: 'var(--info-soft)', stroke: 'var(--info)' }) +
      box(236, 80, 200, 64, 'Payload', { fill: 'var(--accent-soft)', stroke: 'var(--accent)' }) +
      box(442, 80, 190, 64, 'Signature', { fill: 'var(--warn-soft)', stroke: 'var(--warn)' }) +
      txt(140, 168, '算法与类型', { anchor: 'middle', fs: 12 }) +
      txt(336, 168, '用户 ID / 过期时间等声明', { anchor: 'middle', fs: 12 }) +
      txt(537, 168, '前两段+密钥再哈希', { anchor: 'middle', fs: 12 }) +
      txt(340, 60, 'xxxxx.yyyyy.zzzzz（以点分隔的 Base64URL）', { anchor: 'middle', fs: 14, weight: 700, fill: 'var(--text)' }) +
      arrowLine(236, 112, 442, 112, { mid: 'j1', stroke: 'var(--warn)', dash: true }) +
      txt(340, 220, '服务器只需用密钥重算签名比对即可验真，无需查库存会话', { anchor: 'middle', fs: 12.5 }) +
      txt(340, 250, '注意：Payload 仅是编码不是加密，别放敏感信息', { anchor: 'middle', fs: 12.5, fill: 'var(--danger)' })
    )
  };

  V['idempotent-retry'] = {
    title: '幂等性：重试不会产生副作用叠加',
    viewBox: '0 0 680 300',
    svg: svgRoot('0 0 680 300',
      txt(180, 40, '非幂等 ✗', { anchor: 'middle', fs: 14, weight: 700, fill: 'var(--danger)' }) +
      box(90, 60, 90, 44, '下单', {}) + box(90, 130, 90, 44, '网络超时重试', { fs: 11, fill: 'var(--danger-soft)', stroke: 'var(--danger)' }) +
      txt(185, 88, '→ 订单 A', { fs: 12 }) + txt(185, 158, '→ 订单 B（重复！）', { fs: 12, fill: 'var(--danger)' }) +

      txt(500, 40, '幂等 ✓', { anchor: 'middle', fs: 14, weight: 700, fill: 'var(--ok)' }) +
      box(410, 60, 90, 44, '下单 #123', { fs: 12 }) + box(410, 130, 90, 44, '带同一幂等键重试', { fs: 10.5, fill: 'var(--ok-soft)', stroke: 'var(--ok)' }) +
      txt(505, 88, '→ 订单 #123', { fs: 12, fill: 'var(--ok)' }) + txt(505, 158, '→ 返回已有 #123', { fs: 12, fill: 'var(--ok)' }) +

      txt(340, 230, '做法：客户端生成唯一请求 ID，服务端见过的直接返回上次结果', { anchor: 'middle', fs: 13 }) +
      txt(340, 264, '支付、发消息、扣库存等关键接口必备', { anchor: 'middle', fs: 12.5, fill: 'var(--muted)' })
    )
  };

  V['token-bucket'] = {
    title: '令牌桶限流',
    viewBox: '0 0 680 300',
    svg: svgRoot('0 0 680 300',
      box(250, 60, 180, 120, '', { fill: 'var(--surface-2)' }) +
      txt(340, 46, '桶容量 N 个令牌', { anchor: 'middle', fs: 12.5 }) +
      (function () {
        var s = '';
        var pos = [[285, 95], [315, 115], [345, 90], [375, 112], [305, 145], [365, 142]];
        pos.forEach(function (p) {
          s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="9" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5"/><text x="' + p[0] + '" y="' + (p[1] + 4) + '" text-anchor="middle" font-size="10" fill="var(--accent)">T</text>';
        });
        return s;
      })() +
      arrowLine(340, 20, 340, 52, { mid: 'tb0', dash: true }) +
      txt(430, 30, '恒定速率补充令牌', { fs: 12 }) +
      arrowLine(340, 184, 340, 226, { mid: 'tb1' }) +
      box(280, 232, 60, 40, '请求', { fs: 12 }) +
      txt(400, 258, '有令牌→放行；桶空→拒绝(429)', { fs: 12.5 }) +
      txt(80, 130, '允许短时突发，', { fs: 12.5 }) +
      txt(80, 152, '又限制长期平均速率', { fs: 12.5 })
    )
  };

  /* ---------- 数据库 ---------- */

  V['acid-atomicity'] = {
    title: '事务的原子性：要么全成，要么全不算',
    viewBox: '0 0 680 300',
    svg: svgRoot('0 0 680 300',
      txt(340, 36, '转账：A − 100 元 与 B + 100 元 必须同生共死', { anchor: 'middle', fs: 14, weight: 700, fill: 'var(--text)' }) +
      box(120, 70, 120, 52, 'A 账户 −100') +
      arrowLine(244, 96, 300, 96, { mid: 'ac1' }) +
      box(304, 70, 120, 52, 'B 账户 +100') +
      arrowLine(364, 130, 250, 190, { mid: 'ac2', stroke: 'var(--ok)' }) +
      arrowLine(364, 96, 480, 170, { mid: 'ac3', stroke: 'var(--danger)' }) +
      box(120, 196, 150, 48, 'COMMIT 全部生效', { fill: 'var(--ok-soft)', stroke: 'var(--ok)', fs: 12 }) +
      box(420, 196, 170, 48, 'ROLLBACK 全部撤销', { fill: 'var(--danger-soft)', stroke: 'var(--danger)', fs: 12 }) +
      txt(195, 268, '中途断电？回滚到事务前状态，绝不会出现“钱扣了没到账”', { anchor: 'middle', fs: 12.5 })
    )
  };

  V['btree-index'] = {
    title: '索引：从全表扫描到树形直达',
    viewBox: '0 0 680 320',
    svg: svgRoot('0 0 680 320',
      (function () {
        function node(x, y, w, l, hot) {
          return box(x, y, w, 40, l, { fill: hot ? 'var(--accent-soft)' : 'var(--surface)', stroke: hot ? 'var(--accent)' : 'var(--line-strong)', fs: 13 });
        }
        function link(x1, y1, x2, y2) {
          return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="var(--line-strong)" stroke-width="2"/>';
        }
        return link(340, 100, 200, 140) + link(340, 100, 480, 140) +
          node(280, 60, 120, '[17 | 35]', false) +
          node(120, 140, 120, '[8 | 12]', true) + node(420, 140, 120, '[19|20|22]', false) + node(600, 140, 60, '[40]', false) +
          arrowLine(340, 104, 200, 136, { mid: 'bt1' }) +
          txt(340, 30, '查找 id = 9：沿索引树 3 层直达（O(log n)）', { anchor: 'middle', fs: 13.5, weight: 700, fill: 'var(--text)' }) +
          txt(340, 240, '对比无索引：逐行翻完整张表才能找到（全表扫描 O(n)）', { anchor: 'middle', fs: 12.5 }) +
          txt(340, 272, '代价：索引占空间，写入时要同步维护，并非越多越好', { anchor: 'middle', fs: 12.5, fill: 'var(--warn)' });
      })()
    )
  };

  V['n1-queries'] = {
    title: 'N+1 查询问题',
    viewBox: '0 0 680 320',
    svg: svgRoot('0 0 680 320',
      txt(180, 40, 'N+1 ✗（循环里逐条查）', { anchor: 'middle', fs: 13.5, weight: 700, fill: 'var(--danger)' }) +
      box(60, 60, 240, 34, 'SELECT * FROM orders（1 次）', { fs: 11 }) +
      box(60, 104, 240, 30, 'SELECT user WHERE id=1', { fs: 11 }) +
      box(60, 142, 240, 30, 'SELECT user WHERE id=2', { fs: 11 }) +
      box(60, 180, 240, 30, '…… 循环 100 次', { fs: 11 }) +
      txt(180, 244, '共 101 次数据库往返', { anchor: 'middle', fs: 12.5, fill: 'var(--danger)' }) +

      txt(510, 40, '批量查询 ✓', { anchor: 'middle', fs: 13.5, weight: 700, fill: 'var(--ok)' }) +
      box(400, 60, 220, 34, 'SELECT * FROM orders', { fs: 11 }) +
      box(400, 104, 220, 34, 'WHERE id IN (…100个…)', { fs: 11 }) +
      txt(510, 180, '仅 2 次往返', { anchor: 'middle', fs: 12.5, fill: 'var(--ok)' }) +
      txt(340, 296, '列表页变慢的头号惯犯：ORM 关联懒加载在循环中触发', { anchor: 'middle', fs: 12.5 })
    )
  };

  /* ---------- 前端 / 工程 / 架构 ---------- */

  V['cors-preflight'] = {
    title: 'CORS：浏览器拦截与预检协商',
    viewBox: '0 0 680 320',
    svg: svgRoot('0 0 680 320',
      box(60, 60, 130, 60, '浏览器', {}) +
      txt(125, 145, 'a.com 页面', { anchor: 'middle', fs: 12 }) +
      box(480, 60, 140, 60, 'api.b.com', {}) +
      arrowLine(192, 82, 476, 74, { mid: 'co1', stroke: 'var(--warn)', dash: true }) +
      txt(334, 58, '① OPTIONS 预检：允许跨域吗？', { anchor: 'middle', fs: 12, fill: 'var(--warn)' }) +
      arrowLine(476, 106, 192, 114, { mid: 'co2', stroke: 'var(--ok)', dash: true }) +
      txt(334, 136, '② 响应 Access-Control-Allow-Origin: a.com', { anchor: 'middle', fs: 12, fill: 'var(--ok)' }) +
      arrowLine(192, 150, 476, 150, { mid: 'co3' }) +
      txt(334, 172, '③ 协商通过，真正请求放行', { anchor: 'middle', fs: 12, fill: 'var(--accent)' }) +
      txt(340, 230, 'CORS 是浏览器的安全机制：服务器没说“允许”，响应就会被浏览器丢弃', { anchor: 'middle', fs: 12.5 }) +
      txt(340, 262, 'curl / Postman 不受此限制——所以“Postman 通了前端却报错”极常见', { anchor: 'middle', fs: 12.5, fill: 'var(--muted)' })
    )
  };

  V['pipeline-ci-cd'] = {
    title: 'CI/CD 流水线',
    viewBox: '0 0 680 300',
    svg: svgRoot('0 0 680 300',
      box(40, 110, 90, 56, 'push', {}) +
      arrowLine(132, 138, 178, 138, { mid: 'p1' }) +
      box(182, 110, 100, 56, '构建', { fill: 'var(--accent-soft)', stroke: 'var(--accent)' }) +
      arrowLine(284, 138, 330, 138, { mid: 'p2' }) +
      box(334, 110, 100, 56, '自动化测试', { fs: 12 }) +
      arrowLine(436, 138, 482, 138, { mid: 'p3' }) +
      box(486, 110, 90, 56, '部署', {}) +
      arrowLine(578, 138, 618, 138, { mid: 'p4' }) +
      box(620, 110, 36, 56, 'prod', { fs: 11, fill: 'var(--ok-soft)', stroke: 'var(--ok)' }) +
      txt(340, 60, '代码提交后自动：构建 → 测试 → 部署', { anchor: 'middle', fs: 14, weight: 700, fill: 'var(--text)' }) +
      txt(340, 230, 'CI 持续集成：每次提交都验证，问题当天暴露', { anchor: 'middle', fs: 12.5 }) +
      txt(340, 258, 'CD 持续交付/部署：测试通过的版本随时可上线', { anchor: 'middle', fs: 12.5 }) +
      txt(384, 200, '任一环节失败 → 流水线红灯，禁止合入', { anchor: 'middle', fs: 12, fill: 'var(--danger)' })
    )
  };

  V['layered-arch'] = {
    title: '分层架构：各司其职单向依赖',
    viewBox: '0 0 680 340',
    svg: svgRoot('0 0 680 340',
      box(190, 40, 300, 52, '表现层 Controller（接请求/返响应）', { fs: 12.5 }) +
      arrowLine(340, 94, 340, 118, { mid: 'la1' }) +
      box(190, 122, 300, 52, '业务层 Service（规则与流程）', { fs: 12.5, fill: 'var(--accent-soft)', stroke: 'var(--accent)' }) +
      arrowLine(340, 176, 340, 200, { mid: 'la2' }) +
      box(190, 204, 300, 52, '数据访问层 Repository（读写库）', { fs: 12.5 }) +
      arrowLine(340, 258, 340, 282, { mid: 'la3' }) +
      box(250, 286, 180, 40, '数据库', {}) +
      txt(540, 66, '上层只知道下层接口', { fs: 12 }) +
      txt(540, 148, '换 UI 不动业务逻辑', { fs: 12 }) +
      txt(540, 230, '便于测试与分工', { fs: 12 }) +
      txt(340, 336, '反例：Controller 里直接写 SQL —— 层层穿透，改一处崩全身', { anchor: 'middle', fs: 12, fill: 'var(--danger)' })
    )
  };

  V['concurrency-vs-parallel'] = {
    title: '并发（切换穿插）vs 并行（同时进行）',
    viewBox: '0 0 680 320',
    svg: svgRoot('0 0 680 320',
      txt(180, 40, '并发 Concurrency', { anchor: 'middle', fs: 14, weight: 700, fill: 'var(--text)' }) +
      txt(180, 62, '一个咖啡师来回照看两杯（单核轮转）', { anchor: 'middle', fs: 11.5 }) +
      box(60, 84, 40, 26, 'A', { fs: 11, fill: 'var(--accent-soft)' }) +
      box(104, 84, 40, 26, 'B', { fs: 11, fill: 'var(--warn-soft)' }) +
      box(148, 84, 40, 26, 'A', { fs: 11, fill: 'var(--accent-soft)' }) +
      box(192, 84, 40, 26, 'B', { fs: 11, fill: 'var(--warn-soft)' }) +
      box(236, 84, 40, 26, 'A', { fs: 11, fill: 'var(--accent-soft)' }) +
      box(280, 84, 40, 26, 'B', { fs: 11, fill: 'var(--warn-soft)' }) +

      txt(500, 40, '并行 Parallelism', { anchor: 'middle', fs: 14, weight: 700, fill: 'var(--text)' }) +
      txt(500, 62, '两个咖啡师各管一杯（多核同跑）', { anchor: 'middle', fs: 11.5 }) +
      box(380, 84, 110, 26, 'A A A A A A', { fs: 11, fill: 'var(--accent-soft)' }) +
      box(380, 116, 110, 26, 'B B B B B B', { fs: 11, fill: 'var(--warn-soft)' }) +
      txt(435, 166, '两条流水线互不干扰', { anchor: 'middle', fs: 11.5 }) +

      txt(340, 230, '并发是「结构上能交替处理」，并行是「物理上同时执行」', { anchor: 'middle', fs: 13, weight: 700, fill: 'var(--text)' }) +
      txt(340, 262, '单核也能并发（如 JS 事件循环）；并行需要多核/多机', { anchor: 'middle', fs: 12.5 })
    )
  };

  /* ---------- AI ---------- */

  V['context-window'] = {
    title: '上下文窗口：模型的短期记忆容量',
    viewBox: '0 0 680 320',
    svg: svgRoot('0 0 680 320',
      box(80, 60, 520, 150, '', { fill: 'var(--surface-2)' }) +
      txt(340, 44, '上下文窗口（如 128K tokens）', { anchor: 'middle', fs: 14, weight: 700, fill: 'var(--text)' }) +
      box(100, 80, 120, 50, '系统提示词', { fs: 12, fill: 'var(--info-soft)', stroke: 'var(--info)' }) +
      box(228, 80, 170, 50, '历史对话（最早的）', { fs: 11, fill: 'var(--danger-soft)', stroke: 'var(--danger)' }) +
      box(406, 80, 174, 50, '最近的消息与文件', { fs: 12, fill: 'var(--accent-soft)', stroke: 'var(--accent)' }) +
      arrowLine(316, 105, 400, 105, { mid: 'cw1', stroke: 'var(--danger)' }) +
      txt(358, 92, '超出被挤掉', { fs: 11, fill: 'var(--danger)' }) +
      box(228, 150, 352, 44, '本轮新输入', { fs: 12 }) +
      txt(340, 240, '窗口装不下时最早的内容会被截断——“它忘了开头”多半因此', { anchor: 'middle', fs: 12.5 }) +
      txt(340, 272, '对策：精简提示词 / 分段投喂 / 及时总结归档', { anchor: 'middle', fs: 12.5, fill: 'var(--muted)' })
    )
  };

  V['rag-flow'] = {
    title: 'RAG：先检索资料，再回答问题',
    viewBox: '0 0 680 320',
    svg: svgRoot('0 0 680 320',
      box(40, 60, 100, 52, '用户提问', { fs: 12 }) +
      arrowLine(142, 86, 188, 86, { mid: 'rg1' }) +
      box(192, 60, 110, 52, '向量化', { fs: 12, fill: 'var(--accent-soft)', stroke: 'var(--accent)' }) +
      arrowLine(304, 86, 350, 86, { mid: 'rg2' }) +
      box(354, 60, 120, 52, '向量库检索', { fs: 12, fill: 'var(--accent-soft)', stroke: 'var(--accent)' }) +
      arrowLine(476, 86, 522, 86, { mid: 'rg3' }) +
      box(526, 60, 110, 52, 'Top-K 文档', { fs: 12 }) +
      arrowLine(581, 114, 581, 156, { mid: 'rg4' }) +
      box(430, 160, 200, 56, 'LLM：问题 + 检索资料一起作答', { fs: 12, fill: 'var(--surface)' }) +
      arrowLine(428, 188, 382, 188, { mid: 'rg5' }) +
      box(280, 160, 98, 56, '有据回答', { fs: 12, fill: 'var(--ok-soft)', stroke: 'var(--ok)' }) +
      txt(340, 260, '让模型“开卷考试”：知识常更新、可溯源、减少幻觉', { anchor: 'middle', fs: 12.5 }) +
      txt(340, 288, '企业知识库问答的标准方案', { anchor: 'middle', fs: 12, fill: 'var(--muted)' })
    )
  };

  V['proxy-flow'] = {
    title: '正向代理 vs 反向代理',
    viewBox: '0 0 680 340',
    svg: svgRoot('0 0 680 340',
      txt(180, 34, '正向代理 · 藏起客户端', { anchor: 'middle', fs: 14, weight: 700, fill: 'var(--text)' }) +
      box(40, 60, 104, 52, '你的电脑') +
      arrowLine(146, 86, 196, 86, { mid: 'pf1' }) +
      box(200, 58, 116, 56, '代理服务器', { fill: 'var(--accent-soft)', stroke: 'var(--accent)', fs: 13 }) +
      arrowLine(318, 86, 298, 176, { mid: 'pf2' }) +
      box(160, 180, 170, 56, '外部网站们') +
      txt(180, 268, '目标网站只看到代理 IP，', { anchor: 'middle', fs: 12 }) +
      txt(180, 288, '不知道背后是谁在访问', { anchor: 'middle', fs: 12 }) +

      txt(505, 34, '反向代理 · 藏起服务器', { anchor: 'middle', fs: 14, weight: 700, fill: 'var(--text)' }) +
      box(360, 62, 92, 50, '用户们') +
      arrowLine(454, 88, 494, 88, { mid: 'pf3' }) +
      box(498, 58, 140, 60, '反向代理<small>Nginx</small>', { fill: 'var(--accent-soft)', stroke: 'var(--accent)', fs: 13 }) +
      arrowLine(568, 122, 452, 186, { mid: 'pf4' }) +
      arrowLine(568, 122, 568, 186, { mid: 'pf5' }) +
      arrowLine(568, 122, 636, 186, { mid: 'pf6' }) +
      box(396, 190, 96, 48, 'Node', { fs: 12 }) +
      box(520, 190, 96, 48, 'Python', { fs: 12 }) +
      box(560, 252, 96, 44, '静态资源', { fs: 11 }) +
      txt(505, 268, '用户只知道入口域名，', { anchor: 'middle', fs: 12 }) +
      txt(505, 288, '不知道请求最终落在哪台服务', { anchor: 'middle', fs: 12 }) +
      txt(340, 326, '同一种转发思想，方向相反：一个替客户端出头，一个替服务端挡前面', { anchor: 'middle', fs: 12 })
    )
  };

  V['box-model'] = {
    title: '盒模型：四层套娃与 box-sizing 的分界',
    viewBox: '0 0 680 340',
    svg: svgRoot('0 0 680 340',
      box(60, 40, 400, 240, '', { fill: 'var(--warn-soft)', stroke: 'var(--warn)' }) +
      txt(260, 66, 'margin 外边距（与邻居的距离）', { anchor: 'middle', fs: 13, fill: 'var(--warn)' }) +
      box(110, 84, 300, 172, '', { fill: 'var(--info-soft)', stroke: 'var(--info)' }) +
      txt(260, 110, 'padding 内边距', { anchor: 'middle', fs: 13, fill: 'var(--info)' }) +
      box(170, 126, 180, 106, '', { fill: 'var(--accent-soft)', stroke: 'var(--accent)' }) +
      txt(260, 152, 'border 边框', { anchor: 'middle', fs: 12, fill: 'var(--accent)' }) +
      txt(260, 190, 'content 内容区', { anchor: 'middle', fs: 13, weight: 700, fill: 'var(--text)' }) +
      txt(260, 214, 'width 默认只算这一层', { anchor: 'middle', fs: 11.5 }) +

      box(500, 70, 130, 90, '', { fill: 'var(--surface)', stroke: 'var(--line-strong)' }) +
      txt(565, 100, 'content-box', { anchor: 'middle', fs: 12.5, weight: 700, fill: 'var(--danger)' }) +
      txt(565, 122, 'width=内容宽', { anchor: 'middle', fs: 11.5 }) +
      txt(565, 142, '总宽会超出', { anchor: 'middle', fs: 11.5, fill: 'var(--muted)' }) +

      box(500, 186, 130, 90, '', { fill: 'var(--surface)', stroke: 'var(--line-strong)' }) +
      txt(565, 216, 'border-box', { anchor: 'middle', fs: 12.5, weight: 700, fill: 'var(--ok)' }) +
      txt(565, 238, 'width=含边框内距', { anchor: 'middle', fs: 11.5 }) +
      txt(565, 258, '尺寸即所见 ✓', { anchor: 'middle', fs: 11.5, fill: 'var(--ok)' }) +
      txt(340, 318, '现代工程默认全局 * { box-sizing: border-box } —— 「设了 200px 却撑破」多半栽在这里', { anchor: 'middle', fs: 12 })
    )
  };

  V['dom-event-flow'] = {
    title: '事件流：先捕获下沉，再冒泡上浮',
    viewBox: '0 0 680 340',
    svg: svgRoot('0 0 680 340',
      (function () {
        function node(x, y, w, l, hot) {
          return box(x, y, w, 44, l, hot
            ? { fill: 'var(--accent-soft)', stroke: 'var(--accent)', fs: 13 }
            : { fill: 'var(--surface)', fs: 13 });
        }
        return node(250, 30, 180, 'window') +
          node(280, 96, 120, 'document') +
          node(295, 162, 90, 'ul 容器') +
          node(310, 228, 60, 'li 目标', true);
      })() +
      arrowLine(332, 78, 356, 94, { mid: 'ev0', stroke: 'var(--info)' }) +
      txt(430, 70, '① 捕获阶段：自上而下', { fs: 13, weight: 700, fill: 'var(--info)' }) +
      txt(452, 94, 'window → … → 目标', { fs: 12 }) +
      arrowLine(372, 250, 418, 264, { mid: 'ev1', stroke: 'var(--text)' }) +
      txt(430, 176, '② 到达目标：触发监听', { fs: 13, weight: 700, fill: 'var(--text)' }) +
      txt(452, 200, 'e.target = li', { fs: 12, fill: 'var(--muted)' }) +
      arrowLine(374, 118, 398, 102, { mid: 'ev2', stroke: 'var(--ok)' }) +
      txt(430, 262, '③ 冒泡阶段：逐级上浮', { fs: 13, weight: 700, fill: 'var(--ok)' }) +
      txt(452, 286, 'li → ul → … → window', { fs: 12 }) +
      txt(340, 320, '事件委托 = 只在 ul 上监听，靠冒泡统一处理所有子项；stopPropagation 可截停上浮', { anchor: 'middle', fs: 12 })
    )
  };

  W.STD_VISUALS = V;
})(window);
