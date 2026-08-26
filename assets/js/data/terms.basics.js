/* ============================================================
   terms.basics.js · 编程基础（16 词条）
   数据规范：见 README / 关于页。所有字符串使用单引号，禁止反引号。
   ============================================================ */
(function (W) {
  W.STD_TERMS = W.STD_TERMS || [];
  W.STD_TERMS.push(

  {
    id: 'variable-and-constant',
    en: 'Variable & Constant',
    zh: '变量与常量',
    aliases: ['变量', '常量'],
    cat: 'basics',
    tags: ['基础概念', '命名'],
    level: 'core',
    summary: '变量是给数据起的名字，值可以随时换；常量是赋值后就不许再改的名字。',
    plain: [
      '写程序就是反复地「记住一个值 → 使用它 → 更新它」。变量（variable）就是给某个值贴上的名字标签，比如用 score 记住用户分数；之后代码里到处用 score，而不是写死 95。这样需求一变，只改一处即可。',
      '常量（constant）是另一种名字：一旦赋值就约定不能修改，比如圆周率、最大重试次数。很多语言有专门关键字区分，如 JavaScript 的 let（变量）与 const（常量）；Python 则用全大写命名约定 MAX_SIZE 来表达“这是常量，别改”。',
      '对 AI 说需求时明确“这个值是常量还是变量”，它会自动选对关键字，也能避免把不该动的配置写成可变状态——这是很多诡异 bug 的起点。'
    ],
    analogy: '变量像白板上写的分数，擦了重写都行；常量像刻在石碑上的条文——刻上去就不许动了。',
    talk: {
      good: [
        '用一个常量集中存放 API 地址，放在文件顶部，方便以后切换环境。',
        '用户余额是变量会随充值变化；最大重试次数用常量 3，不要硬编码在循环里。'
      ],
      bad: [
        { say: '搞个东西存一下那个网址', why: 'AI 猜不出你要变量还是常量、放什么作用域，往往随手写成局部变量，后续难以复用。' }
      ]
    },
    misconceptions: [
      'const 表示值完全不可变？JavaScript 里 const 锁的是「绑定」，对象内部的属性照样能改；要深层不可变需要冻结或不可变结构。',
      '变量名随便取没关系？名字是给人读的语义文档，userName 与 a 在 AI 理解需求和后期维护上的差距巨大。'
    ],
    related: ['data-type', 'scope', 'mutable-immutable']
  },

  {
    id: 'function',
    en: 'Function',
    zh: '函数',
    cat: 'basics',
    tags: ['基础概念', '复用'],
    level: 'core',
    summary: '函数是一段打包好、可反复调用的操作：给它输入（参数），它给你输出（返回值）。',
    plain: [
      '函数把一段逻辑装进盒子并起了名字：调用 greet("小明") 时你知道它会打招呼，不必关心内部几十行细节。这是控制复杂度的第一工具——人脑一次只能装下有限的事，函数让你一次只面对一件事。',
      '规范的函数通常只做一件事，名字说清楚这件事：calcTotalPrice() 一看就算总价。函数过长、一个函数干三件事，通常被叫做“上帝函数”，是维护噩梦的起点。',
      '与 AI 协作时，“把这段逻辑抽成一个函数”是最常用指令之一；再补充输入、输出和边界情况，它给出的实现质量会显著提高。'
    ],
    analogy: '函数像豆浆机的按钮：按下「五谷」（传入豆子和水），内部怎么转你不用管，最后得到豆浆（返回值）。',
    talk: {
      good: [
        '把校验逻辑抽成 validateOrder(order) 函数，返回错误数组，空数组表示校验通过。',
        '请写成纯函数：同样输入永远得到同样输出，不要在函数里修改全局变量。'
      ],
      bad: [
        { say: '帮我处理一下订单', why: '没说清输入输出和处理规则，AI 只能猜，容易生成一大段塞在主流程里的面条代码。' }
      ]
    },
    misconceptions: [
      '函数必须返回值？许多语言允许无返回值的函数（void/过程），它们只为执行副作用而存在。'
    ],
    related: ['parameter', 'return-value', 'scope', 'callback']
  },

  {
    id: 'parameter',
    en: 'Parameter vs Argument',
    zh: '形参与实参',
    aliases: ['参数'],
    cat: 'basics',
    tags: ['基础概念', '函数'],
    level: 'common',
    summary: '形参是函数定义里的占位符名字，实参是调用时真正传进去的值。',
    plain: [
      '定义 function add(a, b) 时，a 和 b 是形参（parameter）：只是占位名字，声明“我需要两个数”。调用 add(3, 5) 时，3 和 5 是实参（argument）：真正参与计算的具体值。',
      '中文语境常把两者都叫“参数”，日常沟通无碍；但向 AI 描述接口时区分会更精确：“这个 API 接受三个必填参数和一个可选回调”远比“传点东西进去”清楚。',
      '相关概念还有可选参数、默认值参数、命名参数、可变参数列表（...args）。说清哪些必填、哪些可选、默认是什么，能直接避免 AI 编造出不匹配的函数签名。'
    ],
    analogy: '形参像快递单上「收件人____」的空格，实参是你最终填上去的那个具体名字。',
    talk: {
      good: [
        'createUser(username, email) 为两个必填参数；options 可选，其中 role 默认为 member。'
      ],
      bad: [
        { say: '传个参数过去就行了', why: '类型、含义、是否必填都没说，AI 很可能定义出与你后端对不上的签名。' }
      ]
    },
    misconceptions: [
      '参数越少越好？关键不是数量而是职责——若三个参数总是同时出现，封装成一个对象反而更清晰。'
    ],
    related: ['function', 'return-value', 'api']
  },

  {
    id: 'return-value',
    en: 'Return Value',
    zh: '返回值',
    cat: 'basics',
    tags: ['基础概念', '函数'],
    level: 'core',
    summary: '返回值是函数执行完交回给调用方的结果；不写返回时多数语言默认返回空值。',
    plain: [
      '调用函数就像去柜台办事：递交材料（实参），柜台处理完后递回一张回执（返回值）。total = calcTotal(cart) 里等号右侧拿到的就是返回值。',
      '要区分「返回值」与「副作用」：函数内部写数据库、打日志都是对外界的影响而非返回值。只依赖入参、只靠返回值表达结果、不碰外部状态的函数叫纯函数——最好测试、最适合让 AI 编写。',
      '让 AI 改代码时的保命句式：“保持函数签名和返回值结构不变”——防止它顺手改变接口导致其他调用处崩掉。'
    ],
    analogy: '自动售货机：投币按键是传参，掉出来的饮料是返回值；机器顺便嗡一声算副作用。',
    talk: {
      good: [
        '该函数固定返回 { ok: boolean, data?: User[], error?: string } 结构，不要改成抛异常。'
      ],
      bad: [
        { say: '让它顺便也把数据存了', why: '在取值函数里夹带写库副作用，AI 会照做，之后测试与数据一致性都会遭殃。' }
      ]
    },
    misconceptions: [
      '没写 return 就没有返回值？多数语言其实返回了 undefined/null/void，把它当数据用就会踩坑。'
    ],
    related: ['function', 'exception-handling']
  },

  {
    id: 'scope',
    en: 'Scope',
    zh: '作用域',
    cat: 'basics',
    tags: ['作用域', '基础概念'],
    level: 'core',
    summary: '作用域决定一个名字在代码的哪些范围内可见、可用。',
    plain: [
      '变量不是全宇宙可见的。大多数语言里，函数内部声明的变量只在函数内有效（局部作用域），文件顶层声明的可能整个模块都能访问（模块/全局作用域）。JavaScript 还有块级作用域：let 与 const 只在所在花括号内有效。',
      '作用域可以嵌套，查找名字时“由内向外”：内层没有就去外层找，直到全局。内层同名变量会把外层挡住，称为遮蔽（shadowing）。闭包正是基于这套规则的机制。',
      '排查“变量 is not defined / undefined”类问题时，主动告诉 AI 这段代码的作用域结构，或让它“检查是否存在变量遮蔽与提升”，通常比盲猜快得多。'
    ],
    analogy: '作用域像小区门禁：你家客厅的东西只有你能用（局部），物业公告栏谁都能看（全局）；你在自家贴张同名告示，就把物业那张挡住了（遮蔽）。',
    talk: {
      good: [
        '这个计数变量应限制在循环块作用域内，不要泄漏到模块级。'
      ],
      bad: [
        { say: '变量怎么访问不到？', why: '缺少语言、层级、报错信息等上下文，AI 只能罗列可能性，无法直指问题。' }
      ]
    },
    misconceptions: [
      'if 里用 var 声明的变量只属于 if？JavaScript 的 var 是函数作用域且存在提升，这正是历史遗留大坑，现代代码应使用 let/const。'
    ],
    related: ['closure', 'variable-and-constant', 'event-loop']
  },

  {
    id: 'closure',
    en: 'Closure',
    zh: '闭包',
    aliases: ['词法闭包'],
    cat: 'basics',
    tags: ['函数', '作用域'],
    level: 'core',
    summary: '闭包是函数连同它创建时所处作用域的“打包记忆”：函数走到哪，都能记住出生地的变量。',
    plain: [
      '当内部函数引用了外部函数的变量，即使外部函数已经执行完毕，这些变量也不会被回收，仍被内部函数握着——这就是闭包。它让函数拥有私有记忆：计数器、缓存、once 包装器都靠它实现。',
      '闭包也是常见的内存泄漏来源：被长期持有的闭包会让大对象一直活在内存里。排查“这块内存为什么降不下去”时，检查意外的闭包引用是常规操作。',
      '让 AI 写防抖、节流、单例缓存这类工具函数时，它几乎必然使用闭包；理解这个概念，你就能看懂它的实现思路并判断对错。'
    ],
    analogy: '函数像离家工作的人，闭包是他随身带的家乡钥匙——不管走多远，回到那间屋子（原作用域的变量）依然开门就进。',
    visual: { kind: 'svg', id: 'closure-scope', caption: '闭包捕获外部变量的示意' },
    talk: {
      good: [
        '写一个 createCounter() 工厂函数，用闭包保存 count，对外暴露 increment 与 reset 两个方法。'
      ],
      bad: [
        { say: '弄个能记住东西的函数', why: '没提闭包与生命周期，AI 可能改用全局变量，埋下并发与命名污染隐患。' }
      ]
    },
    misconceptions: [
      '闭包会把外部作用域深拷贝一份？不会，它持有的是对变量的引用，读到的永远是最新值。'
    ],
    related: ['scope', 'function', 'callback']
  },

  {
    id: 'callback',
    en: 'Callback',
    zh: '回调函数',
    aliases: ['回调'],
    cat: 'basics',
    tags: ['异步', '函数'],
    level: 'core',
    summary: '回调是把「事成之后再执行的函数」当作参数先交给别人，任务完成后由对方回头调用。',
    plain: [
      '有些事不知道何时完成：网络请求、读文件、定时器。与其原地傻等（阻塞），不如把“完成后的下一步”写成函数传出去，任务完成时由系统回头执行——这就是回调。',
      '回调一层套一层会形成“回调地狱”，代码难以阅读，于是出现了 Promise 与 async/await 来整理流程；但它们的底层仍是回调机制。理解回调，是看懂一切异步代码的地基。',
      '让 AI 处理异步逻辑时明确风格：“用 async/await 而不是嵌套回调”“Node 风格错误优先回调还是 Promise reject”，产出的代码风格立刻统一。'
    ],
    analogy: '餐厅留号排队：你留下手机号（回调函数）去逛街，桌好了餐厅打给你；不用站在门口干等（同步阻塞）。',
    visual: { kind: 'anim', id: 'callback-chain', caption: '回调链的执行顺序' },
    talk: {
      good: [
        '读取文件用错误优先回调风格：error 作为第一个参数，成功路径里再解析 JSON。'
      ],
      bad: [
        { say: '等它加载完再继续往下走', why: '「等」的方式没说清（阻塞 sleep 还是异步回调/Promise），AI 可能生成轮询死循环。' }
      ]
    },
    misconceptions: [
      '回调都是异步的？数组的 map(callback) 就是同步立即执行；回调不等于异步，只是异步常用回调表达。'
    ],
    related: ['function', 'sync-vs-async', 'event-loop']
  },

  {
    id: 'recursion',
    en: 'Recursion',
    zh: '递归',
    cat: 'basics',
    tags: ['算法', '函数'],
    level: 'common',
    summary: '递归是函数在自己内部调用自己的技巧，必须有终止条件防止无限套娃。',
    plain: [
      '递归适合「结构相同、规模更小」的问题：目录树遍历、树结构操作、汉诺塔。每一层递归把问题缩小一圈，直到触底（基线条件 base case）再逐层返回拼出结果。',
      '代价是调用栈深度：层级太深会栈溢出（Stack Overflow，同名的程序员问答网站正由此得名）。常见的规避手段有尾递归优化、改成显式栈的迭代写法。',
      '审查 AI 生成的递归代码，第一眼找基线条件在哪、会不会漏；第二眼确认每次递归确实在逼近基线而不是原地打转。这两点对了，递归基本就对了。'
    ],
    analogy: '站在两面相对的镜子之间，每个影像都是上一个的更小版本；“最小一号”就是终止条件，否则镜子会无限嵌套下去。',
    visual: { kind: 'svg', id: 'recursion-stack', caption: '递归调用栈层层展开又逐层返回' },
    talk: {
      good: [
        '用递归遍历目录树：先判断是否为文件作为基线条件直接处理，目录则递归子项；深度超过 50 层抛错防失控。'
      ],
      bad: [
        { say: '递归一下把它搞定', why: '没给终止条件和数据规模，AI 若漏写基线条件，生成的代码一运行就栈溢出。' }
      ]
    },
    misconceptions: [
      '递归一定比循环慢？现代引擎对部分场景优化很好；真正的问题在栈深度与可读性，而非绝对速度。'
    ],
    related: ['function', 'stack']
  },

  {
    id: 'exception-handling',
    en: 'Exception Handling',
    zh: '异常处理',
    aliases: ['异常', 'try-catch', '错误处理'],
    cat: 'basics',
    tags: ['健壮性', '基础概念'],
    level: 'core',
    summary: '程序给意外情况预留的应急通道：try 里冒险，catch 里兜底，finally 收尾。',
    plain: [
      '程序运行会遇到预料之外的事：文件不存在、网络中断、输入非法。异常机制把这些情况变成可捕获的对象：try 包住可能出错的代码，catch 接住错误进行处理，finally 无论成败都执行（常用于释放资源、关闭连接）。',
      '好的异常处理讲究精准：只捕获你真能处理的异常，而不是一个大 catch 把所有错误吞掉——吞掉的错误会让 bug 藏得更深。该抛出时就抛出携带上下文的错误对象，让调用方知情。',
      '对 AI 提要求时要具体：“网络错误重试 2 次并提示用户；参数非法直接抛出带字段名的 ValidationError”，远比笼统一句“加上错误处理”可靠。'
    ],
    analogy: '电梯应急预案：正常运行（try）之外，停电时应急灯亮起（catch）、无论哪种情况门都必须能打开（finally）。',
    talk: {
      good: [
        '捕获 fetch 失败：超时提示可重试，401 跳转登录页，其余错误上报日志后向用户展示通用文案。'
      ],
      bad: [
        { say: '把报错处理一下别让它崩', why: '最省事的解法是 try-catch 全吞，bug 从此静默，线上排查难度翻倍。' }
      ]
    },
    misconceptions: [
      'catch 之后程序就安全了？吞掉异常只是掩盖症状；没有恢复策略或上报的处理等于掩耳盗铃。'
    ],
    related: ['return-value', 'logging']
  },

  {
    id: 'event-loop',
    en: 'Event Loop',
    zh: '事件循环',
    aliases: ['事件轮询'],
    cat: 'basics',
    tags: ['异步', 'JavaScript', '运行时'],
    level: 'core',
    summary: '让 JS 单线程也能“同时”处理多件事的调度机制：调用栈一空就去任务队列取活儿。',
    plain: [
      'JS 主线程只有一条：同一时刻只能执行一段代码。它之所以看起来“无所不能”，是因为耗时操作（定时器、网络请求）交给宿主环境（浏览器内核/Node）处理，完成后其回调进入任务队列；事件循环在调用栈清空后取出回调执行——宏任务每轮取一个，微任务（Promise.then 等）插队全部清空。',
      '这解释了大量“灵异现象”：setTimeout(fn, 0) 并非立刻执行；Promise.then 比 setTimeout 先跑；一个长循环就能卡死整个页面。理解事件循环，异步面试题和卡顿分析都不再玄学。',
      '当 AI 生成的异步代码输出顺序与你预期不符时，多半是宏微任务次序问题。可以直接问它：“这段代码的输出顺序是什么？请按事件循环阶段解释。”这一问常能当场暴露它的逻辑漏洞。'
    ],
    analogy: '一位厨师（单线程主线程）边炒菜边让助手（宿主环境）炖汤；汤好铃一响（任务队列通知），厨师把手头这道菜收尾就去端汤，绝不会中途扔下锅铲。',
    visual: { kind: 'anim', id: 'event-loop', caption: '调用栈、Web API 与任务队列如何配合运转' },
    talk: {
      good: [
        '注意微任务优先级：Promise.then 的输出要排在下一个 setTimeout 之前，测试断言请据此排列顺序。'
      ],
      bad: [
        { say: '让这段代码并行跑快一点', why: 'JS 主线程没有真并行；CPU 密集任务应该说 Web Worker 或分片处理，否则 AI 给你的仍是串行方案。' }
      ]
    },
    misconceptions: [
      'setTimeout(fn, 0) 是立即执行？至少要等当前宏任务和全部微任务结束，实际延迟常常大于 4ms。'
    ],
    related: ['callback', 'sync-vs-async', 'concurrency-parallelism']
  },

  {
    id: 'mutable-immutable',
    en: 'Mutable & Immutable',
    zh: '可变与不可变',
    aliases: ['不可变性'],
    cat: 'basics',
    tags: ['基础概念', '数据'],
    level: 'common',
    summary: '可变对象改的是本体；不可变对象的任何“修改”都产生新副本，旧值永不改变。',
    plain: [
      '可变（mutable）对象像共享白板：谁都可以擦改，所有持有引用的人看到的内容都会跟着变——方便但容易互相干扰。不可变（immutable）相反：每次修改生成新对象，旧的原封不动，天然易于比较、撤销和多端同步。',
      'React 的 state 不可变更新、Redux 的 reducer、Git 的提交历史，都是不可变思想的应用。代价是频繁复制带来的性能开销，因此又有结构共享等优化技术来缓解。',
      '协作中明确约定“state 必须不可变更新”，能消灭一类最难查的 bug：对象明明改了，界面却不刷新——因为引用没变，框架以为什么都没发生。'
    ],
    analogy: '可变 = 共享文档大家直接改；不可变 = 每次修改另存新版本，旧版本永远可以回溯对照。',
    talk: {
      good: [
        '更新 state 请用浅拷贝加覆盖：{ ...state, list: [...state.list, item] }，不要直接 push 原数组。'
      ],
      bad: [
        { say: '把这个数据改一下就行', why: '没说原地改还是替换，AI 若原地 mutate，React/Vue 可能完全不触发视图更新。' }
      ]
    },
    misconceptions: [
      'const 就是不可变？const 只是绑定不可重新赋值，对象内容依然可变，两者是完全不同层面的约束。'
    ],
    related: ['variable-and-constant', 'state']
  },

  {
    id: 'data-type',
    en: 'Data Type',
    zh: '数据类型',
    aliases: ['类型'],
    cat: 'basics',
    tags: ['类型系统', '基础概念'],
    level: 'core',
    summary: '数据类型规定一个值属于哪一类（数字、文本、布尔……），决定它能做什么运算。',
    plain: [
      '"5" 和 5 看着一样，类型不同待遇天差地别：前者是字符串只能拼接，后者是数字可以加减。类型系统的本质是给值分类，并规定各类之间的运算与转换规则。',
      '常见基础类型：数字、字符串、布尔、null/undefined（空值）；复合类型由它们组装而成，比如数组/列表、对象/字典。动态类型语言里类型跟着“值”走，静态类型语言里类型还挂在“变量声明”上。',
      '向 AI 描述数据结构时给出类型信息——“items 是数组，每项含 id:number、name:string”——它生成的解析与校验代码正确率会明显提高。'
    ],
    analogy: '类型像超市货架分区：生鲜、日化、冷冻各有摆放与结算规矩；把鱼放进日用品通道，后续每个环节都会出错。',
    talk: {
      good: [
        '接口返回 items: Array<{ id:number, title:string, tags:string[] }>，解析前先按此结构校验。'
      ],
      bad: [
        { say: '数据大概是个对象吧', why: '模糊的类型描述让 AI 自由发挥字段名，联调时全是 undefined。' }
      ]
    },
    misconceptions: [
      'JS 里整数和小数是两种类型？Number 统一是 64 位浮点，所以才有 0.1 + 0.2 !== 0.3 的经典问题。'
    ],
    related: ['strong-vs-weak-typing', 'static-vs-dynamic-typing']
  },

  {
    id: 'strong-vs-weak-typing',
    en: 'Strong vs Weak Typing',
    zh: '强类型与弱类型',
    cat: 'basics',
    tags: ['类型系统'],
    level: 'advanced',
    summary: '强类型轻易不许把不相干的类型混着运算；弱类型会悄悄隐式转换，方便但易埋雷。',
    plain: [
      '区分的关键是「隐式转换的尺度」。弱类型代表 JavaScript："1" + 1 得到 "11"，字符串悄悄变身，灵活但暗坑密布；强类型代表 Python："1" + 1 直接抛 TypeError，逼你写出 int("1") + 1 这样明确的意图。',
      '注意强弱与动静是两个独立维度：Python 强类型但动态（无需声明类型），TypeScript 静态且相对强。四个象限各有代表语言，讨论时别混为一谈。',
      '实践影响：弱类型语言的 AI 生成代码更容易藏类型陷阱，因此更值得配 TypeScript/lint 加约束；强类型语言则在编译期就把很多错误拦下。'
    ],
    analogy: '强类型像海关：肉制品和植物绝不混装，不合格当场拦下；弱类型像热心代购：什么都往一个箱子里塞，能用，但可能压坏东西。',
    talk: {
      good: [
        '这里要显式转型：先用 Number() 把字符串转为数值再比较，避免隐式转换产生歧义。'
      ],
      bad: [
        { say: '类型随便啦能跑就行', why: 'AI 会大量依赖隐式转换，上游格式一变就静默产出 NaN 之类的脏数据。' }
      ]
    },
    misconceptions: [
      '强类型等于必须写类型声明？那是静态类型的特征；强类型只关乎是否允许隐式转换。'
    ],
    related: ['static-vs-dynamic-typing', 'data-type']
  },

  {
    id: 'static-vs-dynamic-typing',
    en: 'Static vs Dynamic Typing',
    zh: '静态类型与动态类型',
    cat: 'basics',
    tags: ['类型系统'],
    level: 'advanced',
    summary: '静态类型在编译期检查类型错误，动态类型到运行期才发现——前者早失败，后者更灵活。',
    plain: [
      '静态类型语言（Java、Go、TypeScript）要求或支持声明类型，编译器像安检仪，还没运行就能查出大部分类型错误；IDE 的补全和安全重构也因此强大。动态类型语言（Python、JS）类型跟着值走，写起来轻快，代价是一些低级错误要等到运行那一刻才炸。',
      '现代趋势是融合：Python 有 type hints，JS 有 TypeScript 超集。大型项目几乎都在追求「动态语言的开发体验 + 静态检查的安全网」。',
      '给 AI 下达前端任务时指定 TypeScript 并先定义 interface，是性价比最高的质量手段：它会在生成阶段就被迫保持自洽。'
    ],
    analogy: '动态类型像即兴烹饪，随手抓料随尝随调；静态类型像预制菜谱，下锅前所有克数配料已核对完毕——慢一步，稳十步。',
    talk: {
      good: [
        '项目统一用 TS：先定义 ApiResponse 泛型接口，再写请求封装函数。'
      ],
      bad: [
        { say: '别整那些类型太啰嗦了', why: '一次性脚本尚可；业务代码去掉类型，AI 的字段拼写错误将无人拦截。' }
      ]
    },
    misconceptions: [
      '静态类型等于啰嗦低效？现代类型推断已大幅减少标注量，换来的是重构时的全局安全网。'
    ],
    related: ['strong-vs-weak-typing', 'data-type']
  },

  {
    id: 'compiled-vs-interpreted',
    en: 'Compiled vs Interpreted',
    zh: '编译型与解释型',
    aliases: ['编译', '解释执行'],
    cat: 'basics',
    tags: ['运行时', '基础概念'],
    level: 'common',
    summary: '编译型先整体翻译成机器码再运行；解释型边翻译边执行——前者跑得快，后者更灵活。',
    plain: [
      '编译（C、Go、Rust）：源码经编译器一次性翻译为目标平台机器码，产物可直接执行，速度快，但每次改动都要重新编译。解释（Python、传统 JS）：解释器逐句读取执行，改完即跑，跨平台省心，性能通常吃亏。',
      '现实多是混合体：Java 先编译为字节码再由 JVM 解释/JIT 执行；现代 JS 引擎用 JIT 把热点代码编译成机器码。所以“编译 vs 解释”更像一条光谱，而非两大阵营。',
      '理解它有助于回答日常困惑：为什么 Go 服务部署只要一个二进制文件？为什么 Python 改完刷新就生效？为什么 JS 项目上线前要做构建优化？'
    ],
    analogy: '编译型像出版书籍：先排版印刷（编译），发行后阅读飞快，但改一个字要重印；解释型像朗诵手稿：拿起就读、随时改词，但速度不如印刷品。',
    visual: { kind: 'svg', id: 'compile-flow', caption: '源码 → 编译 / 解释 → 机器执行的两种路径' },
    talk: {
      good: [
        '这个程序要部署到客户服务器常驻运行，选 Go 编译成单个二进制，避免依赖目标机环境。'
      ],
      bad: [
        { say: '反正都能跑起来随便选哪种语言', why: '忽略运行方式会导致部署形态误判：要不要安装运行时、冷启动快慢、产物怎么分发。' }
      ]
    },
    misconceptions: [
      '解释型语言完全不编译？Python 也会把源码编译成 .pyc 字节码缓存；两者的界限早已模糊。'
    ],
    related: ['bundler']
  },

  {
    id: 'library-vs-framework',
    en: 'Library vs Framework',
    zh: '库与框架',
    aliases: ['库', '框架'],
    cat: 'basics',
    tags: ['工程化', '选型'],
    level: 'core',
    summary: '库是你主动调用的一组工具；框架是替你安排流程的骨架——区别在于控制权在你手里还是在它手里。',
    plain: [
      '用库（library）时主导权在你：想用什么功能就 import 什么，例如 lodash、axios。用框架（framework）时主导权倒转：它规定目录结构、生命周期与入口，你在预留的位置填业务代码，例如 Vue、Spring。「控制反转」（IoC）正是两者的分水岭。',
      '判断标准一句话：是你的代码调用它，还是它调用你的代码。前者是库，后者是框架。',
      '和 AI 协作时先声明技术栈性质（“这是 Vue3 项目”），它会自觉遵守框架的目录与写法约定，而不是给你一段无处安放的孤立脚本。'
    ],
    analogy: '库是工具箱，锤子扳手随取随用，活儿还是你自己干；框架是精装修样板房，格局定死，你只管搬家具入住。',
    talk: {
      good: [
        '我们是 Vue3 + Vite 项目，请按组合式 API 风格实现，组件放到 src/components 目录。'
      ],
      bad: [
        { say: '随便用什么实现都行功能对就好', why: '混入不同范式的方案会破坏项目一致性，后期合并与维护成本极高。' }
      ]
    },
    misconceptions: [
      '框架一定比库高级？小型工具引入全家桶框架纯属自杀式架构；按项目规模选型才是正道。'
    ],
    related: ['component', 'dependency-management']
  },

  {
    id: 'operator-precedence',
    en: 'Operator Precedence',
    zh: '运算符与优先级',
    aliases: ['运算符', '优先级', 'operator'],
    cat: 'basics',
    tags: ['基础概念', '语法'],
    level: 'core',
    summary: '一个表达式里先算谁由优先级和结合性决定：先乘除后加减就是最朴素的例子。',
    plain: [
      '1 + 2 * 3 为什么等于 7 而不是 9？因为乘法优先级高于加法，程序先算 2*3 再相加。每门语言都有一张优先级表：括号最高，然后是取成员、函数调用、一元运算、乘除、加减、比较、逻辑、赋值。记不全很正常，真不确定就加括号。',
      '优先级之外还有结合性：同级的加减从左到右，赋值从右到左（a = b = 1 先算 b=1 再赋给 a）。和 AI 描述需求时，把期望的顺序说清楚或用括号明确，它就照做；写成一行火星表达式，人和 AI 都容易误读。'
    ],
    analogy: '优先级像课堂提问的先后：老师先问「乘除法」举手，再问「加减法」，最后才轮到「比较和逻辑」——括号则是插队的特权，永远最先回答。',
    talk: {
      good: [
        '这个条件里先判断用户是否为空，再判断权限，请用括号明确先后顺序。',
        '把百分比换算写成 (score / total) * 100，注意除法优先级。'
      ],
      bad: [
        { say: '这个表达式有点怪，帮我调对', why: '没说期望的计算顺序，AI 只能猜你的意图，可能把优先级搞反。' }
      ]
    },
    misconceptions: [
      '优先级就是从左到右？同级才从左到右，不同级先算优先级高的，还有结合性影响方向。',
      '逻辑与（&&）优先级高于逻辑或（||）？是的，&& 先算，这个细节常导致条件判断与直觉不符。'
    ],
    related: ['expression-vs-statement', 'boolean-short-circuit', 'data-type']
  },

  {
    id: 'expression-vs-statement',
    en: 'Expression vs Statement',
    zh: '表达式与语句',
    aliases: ['表达式', '语句', 'expression'],
    cat: 'basics',
    tags: ['基础概念', '语法'],
    level: 'core',
    summary: '表达式算出值、语句执行动作：return、if、循环都是语句，1+1 是表达式。',
    plain: [
      '表达式（expression）是一段能算出值的代码：1+1、user.name、fn() 都是表达式，它们「有值」。语句（statement）是执行一个动作：if、for、return、变量声明都是语句，它们「做事」但不产生值。',
      '很多语言里「表达式可以有值、但语句没有」这条线很清晰，理解它对读报错很有帮助——比如「a = if (x) {1} else {2}」在多数语言里不合法，因为 if 是语句不是表达式。函数式语言则几乎全是表达式。',
      '跟 AI 说「把这段逻辑改成表达式而不是语句」或反过来，能精准传达你要的结构；含糊说「帮我改改」它可能给你不需要的临时变量。'
    ],
    analogy: '表达式像「计算出结果的计算器」：按完出数字；语句像「执行动作的按钮」：按下去发生事但不给你数字。',
    talk: {
      good: ['请把这段 if-else 改成表达式返回，避免临时变量。', '这个赋值语句里嵌了个函数调用表达式，请拆开方便调试。'],
      bad: [
        { say: '这里代码看着别扭，帮我优化', why: '没说要往「表达式化」还是「语句化」走，AI 优化方向全凭猜。' }
      ]
    },
    misconceptions: [
      '函数调用是语句？函数调用能算出返回值，本质是表达式；语句是 if/for/return 这类控制结构。',
      '表达式和语句可以互换？某些语言（如 Rust）表达式即语句，但多数语言两者泾渭分明。'
    ],
    related: ['operator-precedence', 'function', 'return-value']
  },

  {
    id: 'type-coercion',
    en: 'Type Coercion',
    zh: '类型转换',
    aliases: ['隐式转换', '强制转换', 'type conversion'],
    cat: 'basics',
    tags: ['类型', '基础概念'],
    level: 'common',
    summary: '类型在运算中自动转换叫隐式转换：\'5\' + 3 得 \'53\' 是拼接，\'5\' - 3 得 2 是相减。',
    plain: [
      '当运算符两边的类型不匹配，语言会自动把一边转成另一边的类型，这就是隐式类型转换（coercion）。JavaScript 里最经典：+ 偏向字符串（\'5\'+3 得 \'53\'），- 偏向数字（\'5\'-3 得 2）；true 参与运算转成 1。',
      '隐式转换省事但也埋雷：用户输入的表单值常是字符串，直接相加变成拼接而不是数字相加。规范做法是显式转换：Number(x)、parseInt(x,10)、String(y)，把「想让计算机怎么理解」写清楚。',
      '跟 AI 描述时点明「这是字符串，需要先转数字再比较」，它就不会再写出把 \'10\' < \'9\' 判断成 true 的经典坑。'
    ],
    analogy: '隐式转换像对暗号：你说「三」，对方听成「3 斤」还是「三号桌」，全看上下文猜测；显式转换则是大声说清「数字三」。',
    visual: { kind: 'anim', id: 'type-coercion', caption: '逐行看 == 如何隐式转换' },
    talk: {
      good: [
        '输入框的值是字符串，请用 Number() 转成数字后再做加法比较。',
        '这里两个日期字符串比较请先统一转成时间戳，避免字符串字典序。'
      ],
      bad: [
        { say: '数字加起来结果不对，很奇怪', why: '没说数据源是字符串，AI 未必想到是隐式拼接，可能查半天别的原因。' }
      ]
    },
    misconceptions: [
      'null、undefined、0、\'\' 转布尔都是 false？是的，这些「假值」常导致判断与直觉不符。',
      '显式转换后一定安全？parseInt(\'12px\') 得 12 但 parseInt(\'abc\') 得 NaN，边界仍要测。'
    ],
    related: ['data-type', 'strong-vs-weak-typing', 'null-vs-undefined']
  },

  {
    id: 'null-vs-undefined',
    en: 'Null vs Undefined',
    zh: '空值与未定义',
    aliases: ['null', 'undefined', '空值'],
    cat: 'basics',
    tags: ['类型', '基础概念'],
    level: 'common',
    summary: 'null 是「有意的空」，undefined 是「没给值」：两者都表示没有，语义不同。',
    plain: [
      'null 通常表示「这里本可以有个值，但现在明确为空」，是程序员主动赋的；undefined 表示「从来没被赋过值」，是默认状态（变量声明未赋值、访问不存在的属性、函数没 return 都是 undefined）。',
      '很多语言的「空」只有一个（Python 的 None），JavaScript 有两个常让人困惑。排查时先分清：是主动置空还是意外缺失——后者往往是 bug 的信号。判空时如果只判 null 会漏掉 undefined，规范写法是 x == null（同时匹配两者）或明确分别判断。',
      '跟 AI 说「这个字段可能为 null 也可能未定义，统一判空处理」，它就能用上覆盖两种情况的判断，而不是只处理一种。'
    ],
    analogy: 'null 像写「此处空着」（主动留白）；undefined 像没到过这块地（从没填过）——同样是空，一个是故意的，一个是还没发生。',
    talk: {
      good: [
        '接口返回的 profile 可能为 null 也可能缺失，统一判空再取字段。',
        '函数默认参数用 undefined 触发默认值，不要把 null 传进去。'
      ],
      bad: [
        { say: '这里老是 undefined 报错', why: '没说数据从哪来、期望的空语义，AI 只能猜是缺字段还是异步未返回。' }
      ]
    },
    misconceptions: [
      'null == undefined 是 true，那它们一样？相等但不相同：语义上一个主动一个被动，调试时区分有帮助。',
      '访问不存在的属性返回 null？通常返回 undefined，这两者要区分清楚才能看懂报错。'
    ],
    related: ['data-type', 'boolean-short-circuit', 'type-coercion']
  },

  {
    id: 'array-high-order',
    en: 'High-Order Array Methods',
    zh: '数组高阶方法',
    aliases: ['map', 'filter', 'reduce', 'forEach', '高阶函数'],
    cat: 'basics',
    tags: ['数组', '函数'],
    level: 'common',
    summary: 'map/filter/reduce 用函数描述「怎么变」而非「怎么循环」，让数组处理更声明式。',
    plain: [
      '处理数组最常用的三个高阶方法：map 把每个元素变换后返回等长新数组；filter 按条件筛出子集；reduce 把整个数组折叠成一个值。它们都接受一个函数作为参数，表达「对每个元素做什么」而不是手写 for 循环。',
      '这三个方法不修改原数组而是返回新数组，配合不可变风格写起来更安全。副作用方法（forEach）和它们不同：forEach 只遍历不返回新数组，适合纯执行。性能上 for 循环通常最快，但代码可读性和心智负担高阶方法更优，业务代码优先可读。',
      '跟 AI 说「把用户列表过滤出 VIP 再映射成名字」，一句 map/filter 组合就表达完了；说「帮我循环处理一下」它还得猜你要变换还是筛选。'
    ],
    analogy: 'map 像给整队人换制服（每人换一套，队伍不变）；filter 像筛出戴帽子的人（留下一部分）；reduce 像把全队人的体重相加成一个总数。',
    talk: {
      good: [
        '用 filter 筛出 status 为 active 的订单，再用 map 取出 id 数组。',
        '用 reduce 统计每个分类的数量，返回一个对象。'
      ],
      bad: [
        { say: '帮我处理一下这个数组', why: '没说清是要变换、筛选还是聚合，AI 用哪个方法全凭猜，可能用错返回结构。' }
      ]
    },
    misconceptions: [
      'map 会改原数组？不会，它返回新数组，原数组不变，想就地改得用别的手段。',
      'filter 里可以直接 return 布尔？可以，但复杂条件最好写成完整函数体，别省成玄学箭头函数。'
    ],
    related: ['first-class-function', 'function', 'immutable-data']
  },

  {
    id: 'object-key-value',
    en: 'Object & Key-Value',
    zh: '对象与键值对',
    aliases: ['对象', '键值', '字典', 'object', 'dictionary'],
    cat: 'basics',
    tags: ['数据结构', '基础概念'],
    level: 'core',
    summary: '对象是一组键到值的映射：用名字（键）取数据（值），是描述事物的基本容器。',
    plain: [
      '对象（在 Python 叫 dict、Java 叫 Map）就是把「键」映射到「值」的容器：{ name: \'小明\', age: 18 } 里 name 是键、\'小明\' 是值。想取数据就按键访问，像查字典。它是程序描述「一个东西有多个属性」的基本方式。',
      '键在多数语言里要求唯一，新增同名键会覆盖旧值；键的顺序一般按插入序（字符串键除外）。嵌套对象、对象数组是组织复杂数据的主力。与数组的差别：数组用数字下标按位置访问，对象用语义化的键访问，读代码时对象可读性更高。',
      '跟 AI 描述数据结构时说清「这是一个对象，有哪些键、值是什么类型」，它就能准确定义；只说「一个数据」，它只能猜是数组还是对象。'
    ],
    analogy: '对象像一张名片：上面印着「姓名：小明」「电话：xxx」——每个栏目名（键）对应一个信息（值），看栏目名就知道该填什么。',
    talk: {
      good: ['请定义一个对象，键为 status，值为字符串，表示订单状态。', '把这两个字段合并进原对象，注意同名键用新值覆盖。'],
      bad: [
        { say: '帮我存一下用户信息', why: '没说用什么结构、有哪些字段，AI 可能随手建个数组或变量，后续难访问。' }
      ]
    },
    misconceptions: [
      '对象里键的顺序一定稳定？多数语言字符串键按插入序，但数字键会排在前面，依赖顺序有风险。',
      '对象和数组能互相替代？都能存多个值，但一个按位置、一个按键，语义完全不同。'
    ],
    related: ['data-type', 'reference-vs-value', 'array-high-order']
  },

  {
    id: 'iteration',
    en: 'Iteration & Loops',
    zh: '循环与遍历',
    aliases: ['循环', 'for', 'while', '遍历', 'loop'],
    cat: 'basics',
    tags: ['基础概念', '控制流'],
    level: 'core',
    summary: 'for/while 让一段代码反复执行：管好退出条件，否则就是死循环。',
    plain: [
      '循环让程序「重复做某事直到满足条件」。for 适合已知次数（for i in 0..9）；while 适合未知次数、看条件（while 还有库存就发货）；for-each 适合遍历集合（对每个元素做一遍）。',
      '三个高频坑：忘记更新计数器导致死循环；遍历时删元素导致跳过或越界；循环里重复执行重活导致性能差。现代代码倾向用数组方法（map/filter）替代手写循环，更不容易错。',
      '跟 AI 说「遍历这个列表、对每个元素做 X、遇到 Y 就 break」，把退出条件交代清楚，它一次写对；只说「循环处理一下」容易漏掉边界。'
    ],
    analogy: '循环像流水线上的检查：传送带送来一件检查一件，直到送来「结束」信号——信号没接好，机器就一直空转（死循环）。',
    talk: {
      good: [
        '用 for 循环遍历前 10 个元素，遇到值为 0 就 break。',
        '请把这段 while 循环改成 for 循环，次数已知。'
      ],
      bad: [
        { say: '帮我写个循环把数据都处理了', why: '没说处理规则和退出条件，AI 可能写出死循环或漏边界。' }
      ]
    },
    misconceptions: [
      'for 一定比 while 快？性能差异微乎其微，可读性和正确性才重要。',
      '循环里能随便改正在遍历的数组？边遍历边删元素极易出错，多数语言应收集待删项最后再删。'
    ],
    related: ['expression-vs-statement', 'array-high-order', 'recursion']
  },

  {
    id: 'string-immutability',
    en: 'String Immutability',
    zh: '字符串与不可变性',
    aliases: ['字符串', '不可变', 'string'],
    cat: 'basics',
    tags: ['类型', '基础概念'],
    level: 'core',
    summary: '字符串一旦创建就不能改：拼接其实是造了个新串，原串原封不动。',
    plain: [
      '绝大多数语言的字符串是不可变的：s = s + \'x\' 不是把 x 追加进原串，而是造了一个全新字符串再赋值给 s，旧串仍在内存等着被回收。这也是为什么在循环里大量拼接字符串很慢——每次都新建。',
      '不可变带来安全：字符串被到处传递不会意外被改，作为对象的键、缓存的键都可靠。代价是频繁修改开销大，于是有 StringBuilder 这类「可变缓冲区」工具。',
      '跟 AI 说「把这段字符串拼接改成数组 join 或用 StringBuilder」，它能帮你绕开性能坑；只抱怨「字符串处理很慢」它还得先猜原因。'
    ],
    analogy: '不可变字符串像便利贴：写错只能换一张新的重写，不能在原纸上擦改——频繁重写很费纸（内存），所以有专门的草稿本（可变缓冲区）先写草稿再誊。',
    talk: {
      good: ['循环里拼接大量字符串，请改用数组收集后 join，避免反复创建字符串。', '这段字符串处理后要保持原值不变，请返回新字符串。'],
      bad: [
        { say: '字符串处理太慢了，帮我优化', why: '没说场景和规模，AI 无法判断该用 StringBuilder 还是换算法。' }
      ]
    },
    misconceptions: [
      '字符串可像数组一样就地改某个字符？多数语言不行，需要先转数组再改回。',
      '拼接越多越慢没关系？循环内拼接会 O(n²) 开销，大数据量时明显。'
    ],
    related: ['data-type', 'mutable-immutable', 'reference-vs-value']
  },

  {
    id: 'naming-conventions',
    en: 'Naming Conventions',
    zh: '命名规范',
    aliases: ['命名', 'camelCase', 'snake_case', 'PascalCase'],
    cat: 'basics',
    tags: ['工程', '基础概念'],
    level: 'common',
    summary: '变量/函数/类的命名有约定：camelCase 变量、PascalCase 类、常量全大写，一眼识身份。',
    plain: [
      '命名规范是一套「看名字就知道它是什么」的约定。常见：变量和函数用 camelCase（userName、getUser），类/组件用 PascalCase（UserCard），常量全大写（MAX_SIZE），Python 用 snake_case（user_name）。',
      '规范不只是好看，它让团队代码一致、减少猜测：看到 isOpen 知道是布尔，看到 fetchUser 知道是动作。更重要是语义：userList 比 arr 强十倍，userName 比 a 强十倍。',
      '跟 AI 说「变量用 camelCase、类用 PascalCase、布尔用 is 开头」，它生成的代码就符合团队风格；不交代它就按默认来，风格可能和你项目不一致。'
    ],
    analogy: '命名规范像服装区分身份：白大褂是医生、警服是警察、工装是工人——看到装束就知道角色，不用问。',
    talk: {
      good: [
        '变量用 camelCase，布尔值以 is 开头，如 isLoggedIn。',
        '常量用全大写，如 MAX_RETRY_COUNT。'
      ],
      bad: [
        { say: '帮我把这些变量名起好点', why: '没给项目现有风格和变量含义，AI 只能按通用规范来，未必贴合你的代码库。' }
      ]
    },
    misconceptions: [
      '命名规范所有语言一样？camelCase 多见于 JS/Java，snake_case 是 Python 惯例，类都 PascalCase。',
      '名字长就好？过长反而难读，理想是既短又表意，如 getUserList 而非 getTheListOfAllUsers。'
    ],
    related: ['code-comments', 'refactoring', 'variable-and-constant']
  },

  {
    id: 'debugger-breakpoint',
    en: 'Debugger & Breakpoints',
    zh: '调试与断点',
    aliases: ['断点', '调试', 'debug', 'breakpoint'],
    cat: 'basics',
    tags: ['工具', '工程'],
    level: 'common',
    summary: '断点让程序在指定行暂停，逐行查看变量和调用栈——比打印日志定位快得多。',
    plain: [
      '调试器（debugger）是除打印日志外最重要的排错工具。在可疑代码行打上断点（breakpoint），程序执行到那里会暂停，你可以逐行（step）往下走，随时查看当前所有变量的值、调用栈、甚至修改值后继续。',
      '它能回答「运行到这里时数据到底是什么样」这类日志回答不了的问题。打印日志是「埋点录像」，调试器是「现场直播」：前者事后看、不打断，后者实时看、能交互。复杂逻辑优先上调试器。',
      '跟 AI 说「我在这里打了断点，变量 x 的值是 5 但预期是 7」，把现场数据丢给它，它定位比盲猜快得多；只说「这功能坏了」它只能读代码猜。'
    ],
    analogy: '断点像检查站的临时抽检：车开到检查点停下，逐个盘查（看变量）、允许放行继续开（继续执行）——而日志则是路口的监控录像，事后回放。',
    talk: {
      good: [
        '我在第 42 行打了断点，total 算出来是 100，预期是 120，帮我查哪里少加了。',
        '请帮我判断这里该用断点还是日志：条件是运行时动态的，建议断点。'
      ],
      bad: [
        { say: '这段代码跑出来的结果不对', why: '没给现场数据（断点值、报错栈），AI 只能逐行读代码猜，效率低。' }
      ]
    },
    misconceptions: [
      '调试器只能本地用？现代 IDE 支持远程调试、浏览器调试，断点几乎随处可打。',
      '打日志比调试器专业？恰恰相反，调试器信息更全，日志适合事后排查和线上环境。'
    ],
    related: ['exception-handling', 'logging', 'error-handling-pattern']
  },

  {
    id: 'error-handling-pattern',
    en: 'Error Handling Patterns',
    zh: '错误处理模式',
    aliases: ['错误处理', 'try-catch', '错误码', 'error handling'],
    cat: 'basics',
    tags: ['错误', '工程'],
    level: 'common',
    summary: '处理出错有三种套路：抛异常、返回错误码、返回值加错误对象，各有利弊。',
    plain: [
      '程序出错时怎么把「坏了」告诉上层？三种主流模式：异常（throw/try-catch）中断并向上抛；错误码（返回 -1）让调用方自己检查；返回元组/结果对象（{ok, data|error}）把成功和失败打包一起返回。',
      '异常适合「调用方必须处理否则别想继续」的严重错误；错误码容易漏检查；结果对象最显式但啰嗦。选择标准：错误是否常见、调用方是否容易漏掉。别用异常控制正常流程（性能差且难读），也别吞掉异常（catch 后什么都不做最坑）。',
      '跟 AI 说「这个方法失败时抛异常还是返回错误对象」，把约定定清楚，全项目一致；混着用会让人不知道某个函数会不会抛。'
    ],
    analogy: '错误处理像餐厅传菜：异常是服务员直接喊「厨房着火啦！」（全场停摆向上报）；错误码是端出一道「糊了的菜」让你自己发现；结果对象是托盘上贴着「今日无此菜」的小纸条。',
    talk: {
      good: [
        '这个请求失败时请抛异常并带出状态码，调用方统一 try-catch。',
        '校验失败请返回错误对象 { ok: false, error: \'...\' }，不要抛异常。'
      ],
      bad: [
        { say: '报错了怎么办，你处理一下', why: '没说错误类型和期望行为（抛还是返回），AI 可能随手 catch 后静默吞掉。' }
      ]
    },
    misconceptions: [
      'catch 到就万事大吉？空 catch 会掩盖 bug，至少记日志；线上最难查的就是被吞掉的异常。',
      '异常性能开销巨大、尽量别用？控制流程才别用；真正的错误路径用异常很合理。'
    ],
    related: ['exception-handling', 'debugger-breakpoint', 'return-value']
  },

  {
    id: 'pure-function-side-effect',
    en: 'Pure Function & Side Effects',
    zh: '纯函数与副作用',
    aliases: ['纯函数', '副作用', 'pure function', 'side effect'],
    cat: 'basics',
    tags: ['函数', '架构'],
    level: 'common',
    summary: '纯函数同样输入永远同样输出、且不碰外部状态；副作用是改全局、读写 IO 这类外部影响。',
    plain: [
      '纯函数（pure function）两个铁律：同样的输入永远得到同样的输出；不修改外部状态（不改全局变量、不写文件、不发起网络请求）。add(2,3) 永远得 5，也不碰任何别的东西。',
      '纯函数最好测、最好复用、最好并行：因为不依赖环境、不污染环境。副作用（side effect）是程序真正「做事」的部分（存库、发请求、打日志），必须有，但集中管理、和纯逻辑分离，代码才清晰。',
      '跟 AI 说「请把这个函数写成纯函数，不要改外部变量」，它能给出可测试的干净实现；含糊说「帮我优化这个函数」它可能顺手引入副作用。'
    ],
    analogy: '纯函数像计算器：按 2+3 永远显示 5，也不改变周围任何东西；副作用像银行柜员：每次操作都在改账本（外部世界），责任重大。',
    talk: {
      good: ['这个函数请保持纯函数，不修改传入的对象，返回新对象。', '把写日志的副作用从计算逻辑里抽出来，单独处理。'],
      bad: [
        { say: '帮我把这个函数改好测一点', why: '没说要往纯函数方向重构，AI 可能只是调格式，没解决可测性。' }
      ]
    },
    misconceptions: [
      '纯函数就是没有 return？不是，纯函数必须有确定输出；没 return 通常是副作用函数。',
      '用了参数就是纯函数？修改参数对象也是副作用，纯函数连参数都不改。'
    ],
    related: ['function', 'mutable-immutable', 'immutable-data']
  },

  {
    id: 'reference-vs-value',
    en: 'Reference vs Value',
    zh: '引用与值语义',
    aliases: ['引用传递', '值传递', '引用类型', '值类型'],
    cat: 'basics',
    tags: ['类型', '基础概念'],
    level: 'advanced',
    summary: '基础类型传值（拷贝一份），对象数组传引用（共享同一份）：改引用会互相影响。',
    plain: [
      '把一个变量赋给另一个时：基础类型（数字、字符串、布尔）是值拷贝——a=b 后改 a 不影响 b；对象和数组是引用共享——a 和 b 指向同一份数据，改 a 的内容 b 也看得到。',
      '引用语义让「传大对象」很高效（不用复制），但也带来经典坑：函数里改了入参对象，调用方数据跟着变；比较两个对象 a === b 比较的是引用不是内容，两个内容相同的独立对象不相等。深拷贝、浅拷贝就是为了控制这种共享。',
      '跟 AI 说「这里要浅拷贝还是深拷贝、能不能共享引用」，把意图说清，避免它复制出独立数据或误改原数据。'
    ],
    analogy: '值传递像复印身份证：你拿到的是一张复印件，原件怎么改都影响不到你；引用传递像共用一张银行卡：大家用的是同一个账户，谁花了钱余额都变。',
    talk: {
      good: ['这个对象传给函数后不能让它被修改，请深拷贝一份再传。', '这里比较两个对象内容是否相等，请逐字段比较而不是 ===。'],
      bad: [
        { say: '函数里改了参数，外面数据也变了，好奇怪', why: '这正是引用语义的正常表现；没说清期望拷贝还是共享，AI 难判断怎么修。' }
      ]
    },
    misconceptions: [
      '字符串是引用类型？多数语言字符串是不可变值类型，传参像值传递。',
      '=== 比较对象就是比较内容？不是，比较的是引用，内容相同但独立创建的对象不相等。'
    ],
    related: ['data-type', 'object-key-value', 'mutable-immutable']
  },

  {
    id: 'hoisting',
    en: 'Hoisting',
    zh: '变量提升',
    aliases: ['提升', 'hoisting', '声明提升'],
    cat: 'basics',
    tags: ['作用域', '语法'],
    level: 'advanced',
    summary: 'var 和函数声明会被「提升」到作用域顶部：先使用后声明不报错，但值是 undefined。',
    plain: [
      'JavaScript 里 var 声明和 function 声明会被提升（hoisting）：编译阶段把声明「挪」到作用域顶部。所以 console.log(x); var x = 1 不报错，只是打印 undefined——因为提升的是声明，赋值还在原位置。',
      'let/const 也有提升但进不了「暂时性死区」前的访问，所以用 let/const 声明前访问会报错，反而更安全，这也是现代代码弃用 var 的原因。函数声明整体提升，所以函数可以在定义前调用。',
      '跟 AI 说「用 let/const 声明，注意声明前访问会报错」，它就不会写依赖提升的诡异代码；乱用 var 依赖提升是历史包袱，新代码别学。'
    ],
    analogy: '提升像开会提前把参会人名字写进会议纪要：名单（声明）先就位，但具体人到场（赋值）才是会议开始之后的事——你提前看名单能看到名字，但人还没来（undefined）。',
    visual: { kind: 'anim', id: 'hoisting', caption: '声明被提前、赋值留在原位' },
    talk: {
      good: ['统一用 const/let 声明，不要依赖 var 提升。', '这个函数在定义之前就被调用了，确认它是函数声明可以提升。'],
      bad: [
        { say: '这代码怎么变量没定义也能用', why: '这是提升特性；没说项目规范（是否允许 var），AI 难判断该保留还是改掉。' }
      ]
    },
    misconceptions: [
      '提升会把赋值一起提？只提升声明，赋值留在原地，所以先访问是 undefined。',
      'let/const 完全不提升？也提升，但受暂时性死区限制，声明前访问直接报错。'
    ],
    related: ['scope', 'variable-and-constant', 'module-scope']
  },

  {
    id: 'syntactic-sugar',
    en: 'Syntactic Sugar',
    zh: '语法糖',
    aliases: ['语法糖', '语法糖衣', 'syntax sugar'],
    cat: 'basics',
    tags: ['语法', '基础概念'],
    level: 'common',
    summary: '语法糖是让写法更好看的等价替换：本质没变，只是省键盘、更好读。',
    plain: [
      '语法糖（syntactic sugar）指那些「换汤不换药」的写法：本质是等价于某种已有写法的快捷方式。比如 a += 1 是 a = a + 1 的糖；for-of 是遍历的糖；解构赋值是逐字段取值的糖。',
      '糖让代码更简洁，但有个代价：糖底下的真实语义可能被掩盖，出了奇怪 bug 时要知道它展开成什么。比如箭头函数的 this 绑定和普通函数不同——那不是糖，是真差异。',
      '跟 AI 说「用解构语法取这两个字段」它秒懂；说「给我写个更简洁的版本」它可能用糖把可读性写没了，所以要说清「简洁但保持可读」。'
    ],
    analogy: '语法糖像速记符号：写「℅」代替「百分之」——快是快，但要知道它本质就是百分号，忘了展开规则就看不懂笔记了。',
    talk: {
      good: ['请用解构赋值从对象里取 name 和 age 两个字段。', '这段循环可以用 for-of 简化，但保持可读性。'],
      bad: [
        { say: '帮我写得更简短一点', why: '简短不一定是糖、也可能更难读；没说「保持可读」AI 可能炫技式压缩。' }
      ]
    },
    misconceptions: [
      '语法糖性能更好？不一定，多数糖编译后和原写法等价，性能无差别。',
      '箭头函数只是 function 的糖？this 绑定规则不同，是真差异，不是糖。'
    ],
    related: ['expression-vs-statement', 'function', 'first-class-function']
  },

  {
    id: 'first-class-function',
    en: 'First-Class Functions',
    zh: '一等公民函数',
    aliases: ['一等函数', '函数作为值', 'higher-order function'],
    cat: 'basics',
    tags: ['函数', '函数式'],
    level: 'advanced',
    summary: '函数能像变量一样被传递、返回、存储，才能有回调、高阶函数和闭包。',
    plain: [
      '当一门语言说函数是「一等公民」，意思是函数可以像数字、字符串一样：赋给变量、作为参数传进另一个函数、作为返回值从函数里出来、放进数组对象里。',
      '这个能力是回调、事件处理、高阶函数（接收或返回函数的函数）、装饰器的地基。没有它，代码只能硬编码流程；有了它，可以把「要做的事」当作值传来传去。闭包正是「函数作为值 + 捕获环境」的产物。',
      '跟 AI 说「把校验逻辑作为一个函数参数传进去」，它就知道你要的是依赖注入式设计；说「传个东西进去」它可能给你传个数据而不是函数。'
    ],
    analogy: '一等公民函数像可携带的「行动卡」：不只是一张写着流程的纸，还能塞进钱包（变量）、递给别人（传参）、从口袋里再掏出来（返回值）随时执行。',
    talk: {
      good: ['请把排序逻辑作为比较函数传入 sort，而不是写死规则。', '这个函数接收一个回调作为参数，在数据加载完成后调用它。'],
      bad: [
        { say: '让这个操作完成后做点别的', why: '没说通过回调还是事件还是轮询实现，AI 只能挑一个，可能不符合你的架构。' }
      ]
    },
    misconceptions: [
      '回调就是异步？回调可以同步调用（排序比较函数就是同步回调），和异步没有必然关系。',
      '高阶函数一定很难？filter/map 就是高阶函数，你已经天天在用。'
    ],
    related: ['function', 'callback', 'closure', 'array-high-order']
  },

  {
    id: 'module-scope',
    en: 'Module & Scope Isolation',
    zh: '模块与作用域隔离',
    aliases: ['模块', 'import', 'export', 'module', '作用域隔离'],
    cat: 'basics',
    tags: ['模块化', '作用域'],
    level: 'common',
    summary: '模块把代码装进自己的作用域，只暴露想暴露的（export），避免全局命名冲突。',
    plain: [
      '模块（module）是一个「自带围墙」的代码单元：文件内部定义的变量默认不对外可见，只有显式 export 出去的才会被别的文件 import 使用。这样 A 文件的内部实现细节不会污染全局，也不会和 B 文件撞名。',
      '模块化是工程化的地基：依赖关系清晰、可单独测试、按需加载。早期 JS 用全局变量导致处处冲突，CommonJS、ES Module（import/export）解决了这个痛点，浏览器和 Node 现在都原生支持。',
      '跟 AI 说「把工具函数抽成独立模块并 export」「内部变量不要暴露」，它能给出边界清晰的代码；不交代它就可能堆成一个全局大文件。'
    ],
    analogy: '模块像一栋楼里的独立房间：每个房间的东西不互通，只有门（export）能进出——你不用担心隔壁房间的「张三」和这间的「张三」搞混。',
    talk: {
      good: ['请把这个工具函数放到独立文件并 export 默认导出。', '模块内部的中间变量不要导出，只暴露公共 API。'],
      bad: [
        { say: '把这个功能拆一下', why: '没说要按模块边界拆还是按函数拆，AI 可能拆成混乱的碎片。' }
      ]
    },
    misconceptions: [
      '文件多就是模块化？模块化的关键是作用域隔离和显式接口，不是文件数量。',
      'export 的越多越好？暴露面越大越难维护，好模块只暴露最小必要接口。'
    ],
    related: ['scope', 'naming-conventions', 'cohesion-coupling']
  },

  {
    id: 'immutable-data',
    en: 'Immutable Data',
    zh: '不可变数据',
    aliases: ['不可变', 'immutable', 'immutability'],
    cat: 'basics',
    tags: ['数据', '架构'],
    level: 'advanced',
    summary: '数据创建后不再修改，每次变更生成新数据：省心但要注意性能与内存。',
    plain: [
      '不可变数据（immutable data）指创建后就不能改的数据结构。要「变」时，不是改原数据，而是基于原值创建一个新值。React 的 state、函数式编程都建立在这上面：数据只进不出、路径清晰，配合引用比较可以瞬间判断「变没变」。',
      '好处是消除了大量诡异 bug：数据不会在你不注意时被别处改掉，多线程安全，撤销/时间旅行容易实现。代价是频繁创建新对象有内存和 GC 开销，深层数据更新如果不做结构共享（persistent data structure）会很慢。',
      '跟 AI 说「这个数组更新时请返回新数组，不要原地 push」，它就能写出符合不可变约定的代码；说「帮我更新数据」它可能顺手改了原数据。'
    ],
    analogy: '不可变数据像老式账本的誊写制度：账本写错了不擦改，而是重抄一页新的（保留旧页）——历史可查、改不动原账，只是费纸（内存）。',
    talk: {
      good: ['更新列表时用展开运算符返回新数组，不要原地修改。', '这里的 state 更新请保持不可变，用 map 生成新数组。'],
      bad: [
        { say: '帮我更新一下这个状态', why: '没说是原地改还是不可变更新，AI 可能用 push 直接改，引发 React 不重渲染的坑。' }
      ]
    },
    misconceptions: [
      '不可变就是性能差？配合结构共享（如 Immer/持久化数据结构）开销可控，且省掉大量同步问题。',
      '只读就是不可变？只读是外部约束，不可变是结构保证；JS 的 const 只锁绑定，不锁内容。'
    ],
    related: [
      'mutable-immutable',
      'pure-function-side-effect',
      'reference-vs-value',
      'array-high-order'
    ]
  },

  {
    id: 'boolean-short-circuit',
    en: 'Short-Circuit Evaluation',
    zh: '短路求值',
    aliases: ['短路', '短路求值', 'short-circuit', '&&', '||'],
    cat: 'basics',
    tags: ['逻辑', '基础概念'],
    level: 'core',
    summary: '&& 左侧为假、|| 左侧为真时，右侧不再执行——这叫短路，常被用来做条件执行。',
    plain: [
      'a && b 里，只要 a 是假，结果一定是假，b 根本不用算；a || b 里，a 为真结果就是真，b 不用算。这种「算到能定论就停」就叫短路求值。',
      '它不止是优化，还常被当语法糖用：user && user.name 表示「user 存在才取 name」，false || 默认值 表示「没有就给默认」。但滥用会踩坑：右侧有副作用（函数调用、自增）时，短路意味着它可能根本没执行。',
      '跟 AI 说清楚「这里用短路还是显式 if」很重要——像 list 且 list.length 大于 0 这种短路写法读起来要绕一圈，明确告诉 AI 你要「先判空再取长度」，它能给更可读的实现。'
    ],
    analogy: '短路像查户口：问「是不是本地人？是党员吗？」，一听你不是本地人，后面就不用问了——省下判断，但如果你本来想在后面那句里做点事，它也不会发生。',
    visual: { kind: 'anim', id: 'boolean-short-circuit', caption: 'a 已定结果时 b 被跳过' },
    talk: {
      good: [
        '只有用户存在时才读取他的邮箱，用 user && user.email，避免空引用报错。',
        '请用显式 if 判断而不是依赖短路，因为右侧的日志调用不能省略。'
      ],
      bad: [
        { say: '这里老报错说读不到属性，帮我修', why: '没说清是空值问题还是想用短路兜底，AI 可能直接给你可读性差的 && 链。' }
      ]
    },
    misconceptions: [
      'a && b 返回的一定是布尔？它返回「决定结果的那个值」：a 为假返回 a，否则返回 b，未必是 true/false。',
      '短路只是性能优化？它同时改变语义——右侧可能不执行，副作用代码要小心。'
    ],
    related: ['operator-precedence', 'expression-vs-statement', 'null-vs-undefined']
  },

  {
    id: 'code-comments',
    en: 'Code Comments & Docs',
    zh: '注释与文档',
    aliases: ['注释', '文档', 'comment', 'JSDoc'],
    cat: 'basics',
    tags: ['工程', '基础概念'],
    level: 'common',
    summary: '注释解释「为什么」而非「是什么」：好的代码自解释，注释补上下文和意图。',
    plain: [
      '注释是写给读代码的人（包括六个月后的自己）看的。黄金法则：注释解释「为什么这么做」，而不是复述代码在干什么——像 i 加一这种注释毫无价值，像「这里用整数避免浮点误差」这种才有价值。',
      '好代码应该自解释：用表意的命名和清晰结构让「是什么」不言自明，注释专注「为什么」和「不变量」。JSDoc/文档注释用于给函数、模块补 API 说明，还能被工具生成文档。',
      '跟 AI 说「给这个函数加 JSDoc，说明参数和返回值」它就能生成规范注释；但注释也会过时，重构时代码变了注释没改，比没注释更误导。'
    ],
    analogy: '注释像菜谱边的手写批注：不会写「先放盐」（步骤本身看得见），而是写「上次按原方子太咸，这次减半」——补的是别人不知道的来由。',
    talk: {
      good: ['给这个函数补 JSDoc，写清参数类型、返回值和抛出的异常。', '这段逻辑容易误删，加注释说明为什么必须保留。'],
      bad: [
        { say: '帮我加多点注释', why: '没说要解释什么，AI 可能复述代码产生噪音注释，反而降低可读性。' }
      ]
    },
    misconceptions: ['注释越多越好？噪音注释稀释重点，理想的注释是稀缺且高信息的。', '代码改了注释会自动更新？不会，过时注释比没有更危险。'],
    related: ['naming-conventions', 'refactoring', 'linter']
  }
  );
})(window);
