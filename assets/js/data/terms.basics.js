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
  }

  );
})(window);
