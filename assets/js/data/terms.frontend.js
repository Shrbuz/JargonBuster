/* ============================================================
   terms.frontend.js · 前端（16 词条）
   ============================================================ */
(function (W) {
  W.STD_TERMS = W.STD_TERMS || [];
  W.STD_TERMS.push(

  {
    id: 'dom',
    en: 'DOM',
    zh: 'DOM 文档对象模型',
    aliases: ['文档对象模型', 'Document Object Model'],
    cat: 'frontend',
    tags: ['浏览器', '基础概念'],
    level: 'core',
    summary: '浏览器把 HTML 解析成的树形对象：JS 通过增删改查它来驱动页面。',
    plain: [
      '浏览器加载 HTML 后构建出一棵 DOM 树，每个标签成为节点。JS 没有魔法，所谓「改页面」就是操作这棵树：querySelector 找节点、改属性文本、插入删除元素——框架最终也是在做这些事，只是替你做了优化与批量处理。',
      '性能话题绕不开它：DOM 操作昂贵，因为改动会触发样式计算、布局、绘制等一连串后续工序。频繁逐条读写 DOM 是页面卡顿的经典来源；现代框架用虚拟 DOM 或细粒度响应式把操作合并成最小批次。',
      '调试时打开 DevTools 的 Elements 面板看到的就是实时 DOM。让 AI 修 UI 问题，贴上「相关 HTML 结构 + 复现步骤」比口头描述快十倍。'
    ],
    analogy: 'HTML 是图纸，DOM 是按图盖好的实体楼：JS 是装修队，砌墙开门（增删节点）、刷漆换窗（改样式属性）都在这栋楼上施工。',
    talk: {
      good: [
        '列表渲染请基于数据数组一次性生成 DocumentFragment 再插入，避免循环里逐项 append 触发多次回流。'
      ],
      bad: [
        { say: '让这个按钮动起来', why: '不说清交互细节（点击后什么变、动画时长），AI 只能猜一个通用效果。' }
      ]
    },
    misconceptions: [
      'Elements 面板里看到的 HTML 就是源码？那是运行时的实时 DOM；右键查看源代码看到的才是服务器返回的原始 HTML，两者在 SPA 里差别巨大。'
    ],
    related: ['virtual-dom', 'reflow-repaint', 'spa']
  },

  {
    id: 'virtual-dom',
    en: 'Virtual DOM',
    zh: '虚拟 DOM',
    cat: 'frontend',
    tags: ['框架原理'],
    level: 'common',
    summary: '用 JS 对象描述真实 DOM 的轻量副本：先算差异，再最小化更新页面。',
    plain: [
      '虚拟 DOM 是真实 DOM 的 JS 内存镜像（普通对象树）。状态变化时先在新旧两棵虚拟树之间做 diff 算出最小变更集，再一次性把补丁应用到真实 DOM——把昂贵的 DOM 操作从「随手乱摸」变成「精准手术」。',
      '它的价值是工程性的而非绝对性能：手写最优 DOM 操作可以比框架更快，但没人愿意在每个组件里手工维护补丁逻辑。虚拟 DOM 让开发者只声明「界面应该长什么样」，脏活交给框架。',
      '补充视野：Vue 与 Svelte 走了另一条路——编译时分析依赖、生成细粒度更新代码，运行时连 diff 都省了。「虚拟 DOM vs 编译时优化」正是近年前端框架演进的主线之争。'
    ],
    analogy: '虚拟 DOM 像装修前的设计效果图：先在新图纸上改方案、和旧图对比出改动清单，工人（真实 DOM）只按清单动工，绝不砸错墙。',
    talk: {
      good: [
        '这个长列表每秒高频更新，请确认框架的 diff 开销是否成为瓶颈，必要时改用分片或直接操作 DOM 的方案。'
      ],
      bad: [
        { say: '用了虚拟 DOM 所以肯定不卡', why: 'diff 本身有成本；无 key 列表、超大组件树照样卡顿，机制不是银弹。' }
      ]
    },
    misconceptions: [
      '虚拟 DOM 一定比直接操作 DOM 快？它是「可维护性换性能下限」的折中；极限场景手写优化仍能胜出。'
    ],
    related: ['dom', 'reactive-binding', 'reflow-repaint']
  },

  {
    id: 'component',
    en: 'Component',
    zh: '组件',
    cat: 'frontend',
    tags: ['框架', '复用'],
    level: 'core',
    summary: '把结构、样式、逻辑打包成的独立积木块：页面由组件拼装而成。',
    plain: [
      '组件化是现代前端的基石：按钮、表单、卡片、整个页面都是组件。每个组件管好自己的一亩三分地（模板 + 样式 + 状态），通过 props 接收输入、events 向外汇报，内部实现对外黑盒。',
      '好组件的判断标准很朴素：职责单一（Button 不该偷偷发请求）、接口清晰（props 有类型与默认值）、可复用不绑业务（弹窗不该写死文案）。做到这三条，组合出的页面自然好维护。',
      '和 AI 协作的高频句式：「把这个页面拆成组件」——记得附上你的目录规范与命名约定（PascalCase、单文件组件等），否则它会自由发挥出另一套体系。'
    ],
    analogy: '组件像乐高积木：凸点凹槽（props/events）是标准接口，同一块砖既能拼城堡也能拼飞船——接口统一，组合无限。',
    talk: {
      good: [
        '把用户卡片抽成 UserCard 组件：接收 user 对象与 loading 状态两个 props，点击事件向上抛出，不要在组件内发请求。'
      ],
      bad: [
        { say: '拆成组件就行', why: '不给边界与通信规则，AI 拆出来的组件可能互相 import 对方内部状态，耦合更重。' }
      ]
    },
    misconceptions: [
      '组件越细越好？过细会产生大量胶水代码；「一处复用或一块独立职责」才值得成组。'
    ],
    related: ['state', 'state-management', 'library-vs-framework']
  },

  {
    id: 'state',
    en: 'State',
    zh: '状态',
    cat: 'frontend',
    tags: ['框架', '基础概念'],
    level: 'core',
    summary: '会随交互变化的数据：状态一变，界面跟着变——UI 是状态的投影。',
    plain: [
      '登录用户是谁、弹窗开没开、列表加载到第几页……这些「随时间变化的值」就是状态。现代前端的心智模型一句话：UI = f(state)。你不再手动改 DOM，而是修改 state，框架负责把界面刷成对应样子。',
      '状态的难点不在定义而在归属：哪些放组件本地（开关、输入草稿），哪些提升共享（登录态、主题），哪些放服务端缓存（列表数据）。放错位置的症状很典型——到处 props 层层传递，或者刷新一下就丢。',
      '向 AI 描述 bug 时带上状态流转信息：「点击提交后 isLoading 没有复位」比「按钮一直转圈」更能直指病灶；能贴状态管理面板截图更好。'
    ],
    analogy: '状态像舞台剧本的当前幕数：后台只改一个数字（第几幕），灯光布景演员（界面）自动切换到位——没人去手动推每一块布景。',
    talk: {
      good: [
        '表单校验错误属于组件本地 state，登录用户信息提升到全局 store，两者不要混放。'
      ],
      bad: [
        { say: '把这个数据存起来别丢了', why: '不说生命周期（刷新还在吗、多页签共享吗），AI 选的存储位置大概率不合需求。' }
      ]
    },
    misconceptions: [
      '所有数据都该进全局状态库？绝大多数状态是局部的；全塞进全局 store 会造成无谓的重渲染与心智负担。'
    ],
    related: ['state-management', 'mutable-immutable', 'web-storage']
  },

  {
    id: 'state-management',
    en: 'State Management',
    zh: '状态管理',
    cat: 'frontend',
    tags: ['框架', '架构'],
    level: 'common',
    summary: '当多个组件共享状态时，把它们集中存放、按规矩读写的解决方案。',
    plain: [
      '兄弟组件要共享数据、跨层级的 props 传得让人眼花时，就需要集中式状态管理：Redux、Pinia、Zustand 各有风格，共同内核是把共享状态放进单一仓库（store），组件订阅所需切片，通过明确定义的 action/方法修改。',
      '它的纪律价值大于工具价值：单向数据流让「谁改了什么」有迹可循，配合时间旅行调试能看到每次状态变迁。代价是样板代码与心智负担——所以现代趋势是轻量化（Zustand 几行搞定）与「服务端状态专用」（TanStack Query 把请求缓存管明白）。',
      '给 AI 的指令范例：「购物车状态移入 Pinia，提供 addItem/removeItem action，组件禁止直接改 store 内部字段」。边界划清，才不会出现绕过规则的野路子。'
    ],
    analogy: '状态管理像公司统一的文档中心：重要文件不再散落各自电脑（组件本地）互拷来拷去，而是入库集中版本管理，人人按权限取用、改动留痕。',
    talk: {
      good: [
        '主题偏好放 Zustand 并持久化到 localStorage；组件只调用 setTheme action，不允许直接赋值。'
      ],
      bad: [
        { say: '加个全局变量传一下吧', why: '裸全局变量绕过了变更追踪与调试能力，是状态管理的反模式起点。' }
      ]
    },
    misconceptions: [
      '用了 Redux 项目就高级了？工具应随复杂度引入；简单项目里 Context + hooks 往往已经足够。'
    ],
    related: ['state', 'component', 'reactive-binding']
  },

  {
    id: 'reactive-binding',
    en: 'Reactive Data Binding',
    zh: '响应式与数据绑定',
    aliases: ['双向绑定', '响应式原理'],
    cat: 'frontend',
    tags: ['框架原理'],
    level: 'common',
    summary: '数据与视图自动同步的机制：改数据界面即更新，双向绑定则表单输入也回写数据。',
    plain: [
      '响应式系统做一件事：追踪「哪个视图用了哪份数据」。数据被修改时，精确通知到用到它的地方更新——Vue 用拦截读写收集依赖，React 用重新执行函数对比结果，殊途同归。',
      '「双向绑定」特指表单场景：输入框变化自动写回数据，数据变化也自动反映到输入框（v-model / ngModel）。省去手写 onChange 同步，但也要警惕：双向流会让数据变更来源变得隐晦，大团队常约定只在表单场景使用。',
      '经典坑与 AI 沟通相关：直接改数组某项/对象属性「没生效」，多半是绕过了响应式拦截（Vue2 尤甚）或引用未变（React）。报障时说清「我这样改了数据但界面没动」，AI 能立刻定位到机制层面。'
    ],
    analogy: '响应式像恒温空调：你只设定温度（改数据），压缩机与风口（视图）自动联动；双向绑定则是室温传感器也回传控制台——屋里一动，仪表盘同步跳字。',
    talk: {
      good: [
        'Vue3 项目里请始终用 ref/reactive 创建响应式状态，替换整对象时保持同一引用路径以保住依赖收集。'
      ],
      bad: [
        { say: '界面没刷新是不是框架 bug', why: '九成是响应式用法问题（解构丢失代理、直接下标赋值）；给出修改代码片段即可定位。' }
      ]
    },
    misconceptions: [
      '双向绑定会让数据流向混乱不可控？受控范围（表单）内的双向是效率利器；失控源于无节制的跨组件双向。'
    ],
    related: ['virtual-dom', 'state', 'state-management']
  },

  {
    id: 'spa',
    en: 'SPA',
    zh: '单页应用 SPA',
    aliases: ['Single Page Application'],
    cat: 'frontend',
    tags: ['架构', 'Web'],
    level: 'core',
    summary: '整个应用只有一张 HTML 页面：切路由靠 JS 动态换内容，不发起新的页面加载。',
    plain: [
      'SPA 首次加载拿到 HTML 外壳与 JS 包，此后一切导航由前端路由接管：地址栏变了、URL 可复制可后退，但浏览器不再整页刷新，只有数据请求在飞。体验接近原生应用——流畅、无白屏闪烁。',
      '代价同样明确：首屏要等 JS 下载执行完（慢网络白屏久）；搜索引擎爬虫若不执行 JS 就看不到内容（SEO 弱）；所有代码挤在一个包里需要拆分优化（代码分割、懒加载）。',
      '选型口诀：后台管理系统、工具类产品选 SPA 顺理成章；内容站、电商详情页这类 SEO 敏感场景，考虑 SSR/SSG 或多页。和 AI 讨论「要不要上 Next.js」时，先回答「这个页面靠搜索流量吃饭吗」。'
    ],
    analogy: 'SPA 像 App 内切换页面：进了门之后逛遍全城都不用重新进城（不刷新）；MPA 则是每逛一家店都要重新过一次安检。',
    talk: {
      good: [
        '营销落地页对 SEO 和首屏要求高，单独做成静态多页；主应用保持 SPA，两者共用登录态。'
      ],
      bad: [
        { say: '做个网站用最新技术栈', why: '不谈内容形态与流量来源，技术选型无从谈起；SPA/SSR 的取舍必须由业务决定。' }
      ]
    },
    misconceptions: [
      'SPA 天生比传统多页快？首屏往往更慢（要拉整个应用），快的是后续的页内导航。'
    ],
    related: ['routing', 'ssr', 'bundler']
  },

  {
    id: 'ssr',
    en: 'SSR / SSG',
    zh: '服务端渲染与预渲染',
    aliases: ['服务端渲染', '同构', 'Static Site Generation'],
    cat: 'frontend',
    tags: ['架构', 'SEO'],
    level: 'advanced',
    summary: '让 HTML 在服务器就拼好再送达：首屏直出、爬虫可见，SPA 的两大痛点一并解决。',
    plain: [
      'SSR（服务端渲染）在每次请求时于服务器执行组件生成完整 HTML 下发；SSG（静态生成）则在构建期就把页面渲染成静态文件。两者都能让浏览器第一时间拿到可读内容，无需等待 JS 执行——首屏更快、SEO 更友好。',
      '进阶词汇还有 ISR（增量再生：静态页定时重建）与 Hydration（注水：静态 HTML 到达后，客户端 JS 接管并恢复交互能力）。Next/Nuxt 等框架把这套流程封装成「按页面选择渲染策略」。',
      '成本要心里有数：服务器要跑 Node（运维成本）、写代码要注意 window 等浏览器 API 在服务端不存在（同构约束）。纯后台系统没有 SEO 诉求，不必为 SSR 买单。'
    ],
    analogy: 'SPA 像寄来一套宜家家具（毛坯 HTML+零件 JS），到家自己组装才能看；SSR 像精装成品直接送上门，进门就能用——组装师傅随后才来做智能联动（Hydration）。',
    talk: {
      good: [
        '商品详情页走 SSR 保证 SEO 与首屏，个人设置页保留 CSR；公共头部做同构兼容，避免使用 window。'
      ],
      bad: [
        { say: '全部改成 SSR 性能就好了', why: 'SSR 提升的是首屏与 SEO，不是交互性能；后台类应用迁移纯属增加部署负担。' }
      ]
    },
    misconceptions: [
      'SSR 能降低服务器成本？恰恰相反——每次请求都要服务器执行渲染，CPU 成本高于吐静态文件的 SPA。'
    ],
    related: ['spa', 'cdn', 'seo']
  },

  {
    id: 'routing',
    en: 'Routing',
    zh: '前端路由',
    cat: 'frontend',
    tags: ['SPA', '导航'],
    level: 'common',
    summary: '在前端根据 URL 决定显示哪个视图：不刷新页面也能拥有真实的地址与历史。',
    plain: [
      '前端路由监听 URL 变化（hash 或 history API），把路径映射到对应组件渲染。它让 SPA 拥有正常网页的体感：地址可分享、前进后退可用、深链接直达某个页面。',
      '两种模式各有账本：hash 模式（#/about）兼容性好、部署零配置；history 模式（/about 干净美观）但刷新时会真的请求服务器，需要服务端把所有路径兜底回 index.html——「刷新 404」几乎都是这条没配。',
      '路由级能力还包括守卫（未登录拦截跳转）、懒加载（访问时才加载该页代码）、嵌套路由与动态参数（/user/:id）。给 AI 提需求时点名这些能力，产出的路由表才算完整。'
    ],
    analogy: '前端路由像商场楼层索引牌：地址（你想去哪层）一变，指引牌立刻告诉你该出现在哪个铺位——大楼本身（页面）从未重建。',
    talk: {
      good: [
        '后台路由全部懒加载分包；/admin/* 加登录守卫，未登录重定向并记住来源路径以便回跳。'
      ],
      bad: [
        { say: '线上刷新页面 404 了帮我看看', why: '这是 history 模式缺服务端兜底配置的典型症状；直接说「配 try_files 回退 index.html」一步到位。' }
      ]
    },
    misconceptions: [
      '前端路由不需要服务端配合？history 模式的深链接与刷新强依赖服务端回退规则，部署脚本里漏掉必然翻车。'
    ],
    related: ['spa', 'reverse-proxy']
  },

  {
    id: 'bundler',
    en: 'Bundler',
    zh: '打包与构建',
    aliases: ['打包器', '构建工具', 'Webpack', 'Vite'],
    cat: 'frontend',
    tags: ['工程化'],
    level: 'core',
    summary: '把散落的源码加工成浏览器可直接运行的产物：合并、压缩、转译、分包。',
    plain: [
      '源码里的 TS/JSX/SCSS 浏览器不认识，几百个模块文件也不宜逐个请求。构建工具（Webpack、Vite、esbuild、Rollup）把这些翻译、拼接、压缩成分批的静态资源，顺带处理图片指纹、环境变量注入与代码分割。',
      '开发与生产的分工：dev server 提供即时预览与 HMR（改代码秒级热更新）；生产构建追求体积与缓存（内容哈希文件名、tree-shaking 摇掉没用到的代码）。「本地好好的上线崩」大半是两边行为差异所致。',
      '和 AI 协作时的实用句式：「Vite 项目，别名 @ 指向 src」「构建报 chunk 太大的警告，帮我配置路由级代码分割」。带上具体工具名与报错原文，答案质量天差地别。'
    ],
    analogy: '打包构建像餐厅中央厨房：各门店（浏览器）不做粗加工，牛筋要炖烂（TS 转译）、菜量按桌配好（分包）、装盘统一标准（压缩混淆），配送上门即用。',
    talk: {
      good: [
        '首屏 vendor 包超 1MB：请按路由做动态 import 分包，并对 echarts 这类大依赖做按需引入。'
      ],
      bad: [
        { say: '打包完样式乱了怎么回事', why: '可能原因横跨 CSS 作用域、压缩顺序、环境变量差异；需提供构建配置与现象截图。' }
      ]
    },
    misconceptions: [
      '构建只是把文件合并？转译降级、Tree-shaking、代码分割、资源指纹每一环都影响线上表现，配置不当就是事故源。'
    ],
    related: ['hmr', 'spa', 'env-var']
  },

  {
    id: 'hmr',
    en: 'HMR',
    zh: '热更新 HMR',
    aliases: ['热模块替换', 'Hot Module Replacement'],
    cat: 'frontend',
    tags: ['工程化', '开发体验'],
    level: 'common',
    summary: '改代码后只把变更模块推送进浏览器就地替换，不刷新页面、不丢失现场。',
    plain: [
      'HMR 是 dev server 的招牌能力：保存文件瞬间，新模块被推送到浏览器替换旧的，页面状态（登录态、表单草稿、滚动位置）原样保留。对比老式的「改一行整页刷新」，开发心流的差距一目了然。',
      '它能热替换的不止 JS：CSS 即改即见、Vue/React 组件保留状态重渲染。但并非万能——改路由配置、入口依赖、环境变量通常仍需整页刷新；有时热更失败还会出现「界面和行为不一致」的灵异状态。',
      '排查习惯：遇到诡异现象先手动刷新一次排除 HMR 缓存干扰；CI 与预览环境永远是完整构建，不存在 HMR，因此「热更正常、部署异常」的问题要去构建产物里找。'
    ],
    analogy: 'HMR 像高铁行进中换座椅套：车不停（页面不刷新），乘务员只更换有污渍的那张（变更模块）；整车检修（结构性改动）还是得进站重来。',
    talk: {
      good: [
        '改了 vite.config 里的别名但没生效，这种配置变更需要重启 dev server 吗？'
      ],
      bad: [
        { say: '热更新坏了页面不对劲', why: '先区分是 HMR 边界问题还是代码错误：贴终端输出与控制台报错，别让 AI 猜。' }
      ]
    },
    misconceptions: [
      'HMR 只在开发环境存在，会影响线上性能？它完全不出现在生产构建里；线上问题请查构建产物与网络。'
    ],
    related: ['bundler', 'localhost']
  },

  {
    id: 'cdn',
    en: 'CDN',
    zh: '内容分发网络 CDN',
    aliases: ['Content Delivery Network'],
    cat: 'frontend',
    tags: ['性能', '基础设施'],
    level: 'common',
    summary: '把静态资源缓存到全球各地的边缘节点，用户就近取货，主服务器得以喘息。',
    plain: [
      'CDN 在各地部署缓存节点，首次有人请求时从源站取回并缓存，之后的用户直接从最近的节点拿资源——北京用户不用等美国的服务器。静态资源（JS/CSS/图片/视频）是最典型的受益者。',
      '配套机制值得认识：缓存命中与回源（节点没有就去源站取）；缓存失效（改版后旧文件还在？用内容哈希文件名天然解决）；命中率是衡量 CDN 是否白花钱的核心指标。',
      '接入姿势：给域名加 CNAME 指到 CDN 即可。注意动态接口一般不走 CDN 缓存（除非做边缘计算），别为了「全面加速」把个性化接口也缓存了——那会把 A 用户的数据发给 B。'
    ],
    analogy: 'CDN 像连锁便利店的前置仓：爆款商品（热门静态资源）提前铺到你家门口的分店，不必事事等中央仓库发货。',
    talk: {
      good: [
        '静态资源域名接入 CDN 并开启 gzip/brotli；index.html 设置 no-cache，其余带哈希资源长缓存一年。'
      ],
      bad: [
        { say: '上个 CDN 加速一下', why: '不区分静态与动态资源，误缓存接口响应会造成串数据事故，务必说明哪些路径可缓存。' }
      ]
    },
    misconceptions: [
      '上了 CDN 就一定更快？冷启动回源、节点覆盖差、HTTPS 握手链路长都可能更慢；命中率高才有意义。'
    ],
    related: ['dns', 'cache-trilogy', 'http']
  },

  {
    id: 'cors',
    en: 'CORS',
    zh: '跨域 CORS',
    aliases: ['跨源资源共享', '跨域问题'],
    cat: 'frontend',
    tags: ['安全', 'HTTP'],
    level: 'core',
    summary: '浏览器的同源安全策略：跨站请求必须获得目标服务器的明确许可。',
    plain: [
      '同源策略规定：协议+域名+端口任一不同即为跨源，浏览器会拦截跨源读取。这不是限制你，而是防止恶意网站拿着你的 Cookie 偷偷读取银行数据。CORS（Cross-Origin Resource Sharing）是官方放行通道：服务器通过 Access-Control-Allow-Origin 等响应头声明「我允许某某来源访问」。',
      '关键认知：跨域拦截发生在浏览器侧——curl、Postman、服务端之间的调用根本没有这道墙。所以「Postman 通了、前端报 CORS 错误」是最高频误会：问题永远出在响应头缺失，而不是接口本身坏了。',
      '带 Cookie 的跨域还要两端配合：前端 withCredentials=true，服务端 Allow-Credentials:true 且 Origin 不能为通配符 *。自定义请求头会触发 OPTIONS 预检，服务端必须正确响应它。'
    ],
    analogy: '小区门禁（浏览器）不让陌生人随便进出各家单元楼；CORS 就是住户（目标服务器）主动向物业登记「允许某某访客来访」——门禁照章放行。',
    visual: { kind: 'svg', id: 'cors-preflight', caption: '预检协商与正式请求' },
    talk: {
      good: [
        '网关为 api.example.com 配置 CORS：允许 https://www.example.com 来源、GET/POST 方法、Content-Type 与 Authorization 头，允许凭证。'
      ],
      bad: [
        { say: '接口跨域了你帮我处理下', why: '跨域要在服务端加响应头解决；前端 JSONP 之类的偏方只会掩盖问题，先明确改哪一侧。' }
      ]
    },
    misconceptions: [
      'CORS 是阻止请求发出？请求其实已到达服务器并执行（简单请求），只是浏览器拒绝把响应交给页面——日志里能看到请求不代表前端拿到了数据。'
    ],
    related: ['http', 'headers-body', 'cookie']
  },

  {
    id: 'cookie',
    en: 'Cookie',
    zh: 'Cookie',
    cat: 'frontend',
    tags: ['存储', '会话'],
    level: 'common',
    summary: '浏览器自动随身携带的小纸条：服务器种下、每次同源请求自动带回。',
    plain: [
      'Cookie 由服务器通过 Set-Cookie 下发，浏览器存好后，之后每一次对同域的请求都会自动附带——正因「自动携带」这一特性，它成了维持登录态的经典载体（通常是 Session ID 或签名 token）。',
      '关键属性决定安全边界：HttpOnly 禁止 JS 读取（防 XSS 偷取）；Secure 仅 HTTPS 发送；SameSite=Lax/Strict 限制跨站携带（防 CSRF）；Expires/Max-Age 控制生死（不设则为关浏览器即亡的会话 Cookie）。容量约 4KB，且每次请求都背着走，塞多了浪费带宽。',
      '与 Token 方案的分野：Cookie 自动、可 HttpOnly 更抗窃取，但要防 CSRF；localStorage 存 token 容量大却暴露给 JS。现代实践常是「HttpOnly Cookie 放凭证 + SameSite 防护」的组合。'
    ],
    analogy: 'Cookie 像游园手环：入园时工作人员给你戴上（Set-Cookie），之后玩每个项目（请求）闸机都扫手环自动识别——摘不下来的手环（HttpOnly）别人抢不走。',
    talk: {
      good: [
        '登录态改用 HttpOnly + Secure + SameSite=Lax 的 Cookie 承载 Session ID，过期时间 7 天滑动续期。'
      ],
      bad: [
        { say: '把 token 存 cookie 还是 localStorage 随便', why: '两者安全模型完全不同（CSRF vs XSS 取向），不结合威胁模型的选择等于没选。' }
      ]
    },
    misconceptions: [
      'Cookie 只能存少量文本没什么用？它「随请求自动携带 + HttpOnly 防脚本」这两点是任何本地存储都替代不了的能力。'
    ],
    related: ['session', 'jwt', 'cors', 'web-storage']
  },

  {
    id: 'web-storage',
    en: 'LocalStorage / sessionStorage',
    zh: '本地存储 Web Storage',
    aliases: ['LocalStorage', 'sessionStorage'],
    cat: 'frontend',
    tags: ['存储'],
    level: 'common',
    summary: '浏览器键值对存储：LocalStorage 持久留存，sessionStorage 关页即清。',
    plain: [
      'Web Storage 给前端 5~10MB 的键值空间：LocalStorage 写入后长期留存（适合主题偏好、语言设置、草稿箱）；sessionStorage 限定在单个标签页的生命周期内（适合一次性流程的中间状态，如多步表单暂存）。API 极简：setItem/getItem/removeItem。',
      '两条铁律：其一，它们只存字符串，对象要先 JSON 序列化，取回再解析（忘了 parse 是新手高频 bug）；其二，它们对同源的所有脚本可见、对 XSS 毫无抵抗力——绝不能存放密码、长期有效的登录令牌等敏感凭证。',
      '工程化提示：直接裸用容易散落各处，建议封一层带命名空间与过期机制的 storage 工具；让 AI 写时点名「带 TTL 与 JSON 安全解析」，能避开大部分暗坑。'
    ],
    analogy: 'LocalStorage 像家里冰箱（关了门东西还在），sessionStorage 像游乐场储物柜（出场即清空）；但柜子不上锁——任何能进屋的人（脚本）都能翻。',
    talk: {
      good: [
        '用户界面偏好存 LocalStorage，key 统一加 app: 前缀，写入带版本号便于将来迁移；敏感数据一律不放。'
      ],
      bad: [
        { say: '把用户信息缓存到 localStorage', why: '含手机号身份证的用户信息入 localStorage 一旦遭遇 XSS 即整体泄露，应只缓存非敏感展示数据。' }
      ]
    },
    misconceptions: [
      'Storage 是加密的安全存储？它是明文键值对；真正的安全存储要看 Web Crypto 或服务端，浏览器没有「保密抽屉」。'
    ],
    related: ['cookie', 'state']
  },

  {
    id: 'reflow-repaint',
    en: 'Reflow & Repaint',
    zh: '重排与重绘',
    aliases: ['回流', '重绘'],
    cat: 'frontend',
    tags: ['性能', '渲染'],
    level: 'advanced',
    summary: '几何变了要重排（最贵），仅外观变了只需重绘；减少它们是渲染优化的核心。',
    plain: [
      '浏览器渲染流水线：布局（算几何位置）→ 绘制（填像素）→ 合成（图层叠加）。改尺寸位置会推翻布局引发重排（Reflow/回流），代价最大；只改颜色阴影等不碰几何的属性仅需重绘；而 transform、opacity 走合成器甚至跳过重绘——这就是动画优先用 transform 的原因。',
      '经典反模式是「布局抖动」：循环里交替读 offsetHeight 又改样式，迫使浏览器反复同步重排，帧率当场崩塌。解法是批量读写分离：先一口气读完所有布局值，再一口气写。',
      '优化清单交给 AI 时可以说：「这个表格筛选动画掉帧，请检查是否有强制同步布局，动画属性改为 transform 实现」。指向具体机制，比「优化一下性能」有效十倍。'
    ],
    analogy: '重排像教室换座位——座位表（布局）作废全班重新安排；重绘只是给墙面刷新漆，位置不动；transform 动画则像举着照片走动，根本不用惊动任何人。',
    talk: {
      good: [
        '滚动视差动画目前改 top/left 导致持续重排，请改用 translate3d 并把元素提升到独立图层。'
      ],
      bad: [
        { say: '页面卡帮我优化下性能', why: '不给 Performance 面板的火焰图或可疑代码段，AI 只能给泛泛清单；先录制约 10 秒的性能剖析再讨论。' }
      ]
    },
    misconceptions: [
      'display:none 的元素不参与渲染就没有开销？反复切换 display 本身就会反复触发大规模重排；频繁显隐更适合 visibility 或 opacity。'
    ],
    related: ['dom', 'virtual-dom']
  },

  {
    id: 'promise-async-await',
    en: 'Promise & async/await',
    zh: 'Promise 与 async/await',
    aliases: ['异步编程'],
    cat: 'frontend',
    tags: ['异步', 'JavaScript'],
    level: 'core',
    summary: '组织异步流程的现代语法：写起来像同步，执行仍是异步，告别回调套娃。',
    plain: [
      'Promise 把「未来的结果」变成一个可传递的对象：pending 等待中、resolve 成功、reject 失败。then 链式编排步骤，catch 统一接错；async/await 则是它的语法糖——await 让代码停在结果就绪那一刻，try/catch 直接捕获失败，读起来与同步代码无异。',
      '三个必知要点：其一，await 只暂停所在函数，不阻塞主线程，页面照样响应；其二，两个互不依赖的请求连续 await 是「假串行」，白白翻倍耗时，应改 Promise.all 并行；其三，忘记写 await 时调用立刻返回 pending 对象，后续逻辑拿到的是空壳。',
      '对 AI 的常用指令：「把这段回调嵌套重构成 async/await，外层 try/catch 兜底」「这两个请求无依赖关系，请用 Promise.all 并发」。说清并发意图能避免它把有顺序依赖的调用也并行掉。'
    ],
    analogy: 'Promise 像餐厅取餐铃：下单后先去聊天（不阻塞），铃响（resolve）取餐，铃坏（reject）找售后；await 就是你决定站在柜台前盯着铃响为止的那一刻。',
    talk: {
      good: [
        '重构为 async/await：外层 try-catch 统一报错；用户信息与配置两个请求无依赖，用 Promise.all 并行后再合并渲染。'
      ],
      bad: [
        { say: '把这里改成异步的快一点', why: '未区分「换语法」还是「真并行」，AI 可能把必须先后的调用也并发，产生脏数据。' }
      ]
    },
    misconceptions: [
      'async 函数里的 await 会卡住整个页面？只挂起该函数自身的执行流，事件循环照常运转，界面不受影响。'
    ],
    related: ['callback', 'sync-vs-async', 'race-condition', 'event-loop']
  },

  {
    id: 'event-bubbling-delegation',
    en: 'Event Bubbling & Delegation',
    zh: '事件冒泡·捕获与委托',
    aliases: ['事件委托', '事件流'],
    cat: 'frontend',
    tags: ['DOM', '事件'],
    level: 'core',
    summary: '点击事件先自上而下捕获、再自下而上冒泡；借冒泡在父节点统一监听就是事件委托。',
    plain: [
      '一次点击的完整旅程分三段：从 window 沿 DOM 树向下抵达目标（捕获阶段）、在目标上触发（目标阶段）、再原路逐级返回（冒泡阶段）。默认监听器挂在冒泡阶段触发；stopPropagation 能截停继续上浮；同一元素的多个监听器按注册顺序执行。',
      '事件委托是冒泡的最佳应用：在列表容器 ul 上绑一个 click，通过 e.target 判断实际点中的子项 li——动态新增的子项无需重新绑定，一百个子项也只有一个监听器。e.target（真正被点的）与 e.currentTarget（挂着监听的）之别是委托实现的关键。',
      '高频排障场景：「父级的监听器莫名触发了」多半是子事件冒泡上来；「动态生成的按钮点了没反应」是因为监听绑在了早已不存在的旧元素上——正确解法正是改为委托。'
    ],
    analogy: '像公司审批流：事情发生在基层（目标元素），逐级上报直到总经理（window）；事件委托让总经理只读上报摘要，而不必往每个部门派驻一名自己的秘书。',
    visual: { kind: 'svg', id: 'dom-event-flow', caption: '捕获下沉 → 目标 → 冒泡上浮' },
    talk: {
      good: [
        '待办列表项的勾选与删除统一用事件委托：监听挂在容器 ul 上，按 closest 找到对应 li 的 data-id 分发处理。'
      ],
      bad: [
        { say: '给每个按钮都绑定一下点击事件', why: '列表会动态增删时逐个绑定既费内存又会漏绑新节点；应说明用委托方案。' }
      ]
    },
    misconceptions: [
      '监听器只能在冒泡阶段触发？addEventListener 第三参传 true 即改在捕获阶段先于子元素执行，弹层关闭等场景常靠它。'
    ],
    related: ['dom', 'promise-async-await']
  },

  {
    id: 'debounce-throttle',
    en: 'Debounce & Throttle',
    zh: '防抖与节流',
    cat: 'frontend',
    tags: ['性能', '技巧'],
    level: 'core',
    summary: '防抖等停下再办，节流按固定频率办：驯服 scroll/input 这类高频事件。',
    plain: [
      '滚动、输入框敲字这类事件触发密度极高，直接绑重活页面必卡。防抖 debounce：每次触发都重置计时器，停止 N 毫秒后才真正执行一次——适合关心最终状态的场景，如搜索框等用户停手再查询、表单停止输入再校验。节流 throttle：无论触发多密集，每 N 毫秒最多执行一次——适合关心过程节奏的场景，如滚动加载、拖拽跟随、按钮防连点。',
      '选型口诀一句话：要「最后一次」用防抖，要「均匀地多次」用节流。工程细节常被忽略但必须交代：立即执行选项（首次触发马上响应）、取消方法（路由切换时清掉挂起计时器）、以及组件卸载时的清理——漏了清理就是内存泄漏定时炸弹。',
      '给 AI 的指令范式：「搜索输入加 300ms 防抖并支持取消」「滚动到底部加载更多用 200ms 节流」。带毫秒数与场景的指令，产出的工具函数才能直接落地。'
    ],
    analogy: '防抖像电梯关门键：总有人快到了就再等两秒（不断重置计时），彻底没人来了才关门出发；节流像红绿灯：车流再密也按固定周期放行一批，绝不一辆一辆挪。',
    talk: {
      good: [
        '搜索联想做 300ms 防抖且组件卸载时 cancel；请求发出前 abort 上一个未完成的联想请求防止竞态。'
      ],
      bad: [
        { say: '输入的时候加个延迟别那么频繁', why: '没说防抖还是节流、时长多少、要不要首次立即执行，AI 只能拍脑袋给参数。' }
      ]
    },
    misconceptions: [
      '防抖和节流只是叫法不同？机制完全不同：防抖可能一次都不执行（一直被打断），节流保证周期内至少执行。'
    ],
    related: ['race-condition', 'lifecycle', 'http-client']
  },

  {
    id: 'race-condition',
    en: 'Race Condition',
    zh: '竞态条件',
    aliases: ['竞态', '异步覆盖'],
    cat: 'frontend',
    tags: ['异步', 'bug 高发'],
    level: 'core',
    summary: '多个异步操作以意外顺序完成，慢的旧结果覆盖新的新结果——前端最高频的灵异 bug。',
    plain: [
      '经典翻车现场：搜索联想里输入 ab 发出请求 A，紧接着改成 abc 发出请求 B；网络抖动让 B 先回 A 后到，晚到的旧结果 A 把新结果覆盖——界面显示的是上一关键词的内容。凡是「同一资源的多次异步写入」都可能中招：快速切 Tab、狂点分页、连续提交。',
      '防护三板斧按推荐度排序：AbortController 在发起新请求前取消上一个（治本）；序号守卫——每次递增 requestId，回调里发现不是最新号直接丢弃；最差兜底是禁用入口直到完成（体验牺牲最大）。React 社区的 useEffect cleanup 本质就是序号守卫的应用。',
      '向 AI 报障时描述时序而非玄学：「快速连续搜索时偶发显示上一次的结果」——这句话能让它瞬间锁定竞态并主动补齐取消/守卫逻辑，而不是泛泛检查接口。'
    ],
    analogy: '两封信寄往同一个收件箱：先发的迟到、后发的先到，收件人拆到第一封就把第二封扔了——信息停在了旧版本。给每封信编号（请求 ID），只认编号最大的那封才不会出错。',
    talk: {
      good: [
        '搜索联想存在竞态：请在每次新请求前 AbortController.abort 上一个，并在 setState 前校验本次请求仍为最新。'
      ],
      bad: [
        { say: '有时候显示的是上一次搜索的结果偶尔又正常', why: '「偶发 + 与操作顺序相关」是竞态指纹；不说触发时序，AI 会往缓存或渲染方向白查一圈。' }
      ]
    },
    misconceptions: [
      '接口返回快就不会有竞态？快慢是相对的；只要存在并发可能，任何网络抖动都可能颠倒完成顺序，防护不能省。'
    ],
    related: ['http-client', 'state', 'sync-vs-async', 'debounce-throttle']
  },

  {
    id: 'lifecycle',
    en: 'Lifecycle',
    zh: '组件生命周期',
    aliases: ['生命周期钩子', 'useEffect 清理'],
    cat: 'frontend',
    tags: ['框架原理', '副作用'],
    level: 'core',
    summary: '组件的一生三幕：挂载、更新、卸载；副作用跟着时机安家才能善终。',
    plain: [
      '组件不是静态贴图而是有生命的过程：挂载（插入 DOM）→ 更新（依赖变化重渲染）→ 卸载（移除 DOM）。生命周期钩子让你在恰当时机做事：挂载后拉数据、依赖变化后同步、卸载前清理。内存泄漏、幽灵回调、订阅堆积这批经典 bug，九成源于「只管生不管葬」——加了监听却从不移除。',
      '两大范式的表达方式：Vue 用具名钩子 onMounted/onUnmounted/onUpdated 直白明了；React 用 useEffect 的依赖数组编码时机——空数组仅挂载跑一次、[id] 表示随 id 变化重跑、return 的函数即清理逻辑在下次重跑与卸载时执行。理解「依赖数组=重新执行的触发条件」是用好 Hooks 的钥匙。',
      '给 AI 的保命句式：「补齐副作用清理：卸载时移除事件监听、清除定时器、abort 进行中的请求」。这句能拦下 AI 生成代码中最常见的一类隐患。'
    ],
    analogy: '像员工入职在职离职全流程：入职领设备开权限（初始化副作用），在职按需调整（更新），离职必须交还门卡关权限（cleanup）——手续不全，工牌就在外面一直刷得开门。',
    talk: {
      good: [
        '图表组件挂载后初始化 ECharts 实例并 window resize 监听；卸载时 dispose 实例并移除监听，请补全 cleanup。'
      ],
      bad: [
        { say: '在组件里加个定时器轮询', why: '不提卸载清理，AI 写出的 setInterval 将伴随跳页后的幽灵请求持续轰炸后端。' }
      ]
    },
    misconceptions: [
      'useEffect 不写依赖数组等于只在挂载时执行一次？恰好相反——不写数组意味着每次渲染后都执行；写 [] 才是仅挂载一次。'
    ],
    related: ['hooks', 'race-condition', 'state']
  },

  {
    id: 'hooks',
    en: 'Hooks / Composition API',
    zh: 'Hooks 与组合式 API',
    cat: 'frontend',
    tags: ['框架原理', '复用'],
    level: 'common',
    summary: 'Hooks 与组合式 API：把有状态的逻辑打包成可复用的函数单元。',
    plain: [
      '类组件时代的逻辑复用靠继承和高阶组件，层层包裹如同套娃，数据来源难以追踪。Hooks（useState/useEffect/useMemo…）与 Vue 组合式 API（ref/computed/watch…）带来了第三条路：相关逻辑按功能聚合在一起，跨组件复用一个自定义 Hook 或组合函数即可——useDebounce、useFetch 这类小单元成为现代前端的乐高块。',
      '两条铁纪律：其一，依赖诚实——useEffect 依赖数组漏写依赖是最常见 bug 源（闭包捕获了旧值）；其二，调用规则——Hooks 不能放进 if/循环里（React 靠调用顺序识别每次渲染的 Hook 身份）。Vue 组合式函数没有第二条限制，但同样要求在 setup 同步作用域内创建。',
      '与 AI 协作的价值点：让它把重复逻辑抽成自定义 Hook 时给出签名约定，「抽成 usePermission() 返回 { hasPermission, check }，内部用 store」——抽象边界清晰，复用才不会变成耦合。'
    ],
    analogy: '像人力资源管理从「格子间部门制」进化为「项目技能包」：不再按 data/methods/computed 的格子把一个人拆开存放，而是按能力打包成可随时借调的技能包，哪个项目需要就整包引入。',
    talk: {
      good: [
        '项目统一函数组件 + Hooks：请把这段表单校验抽成 useFormValidation 自定义 Hook，返回 errors 与 validate 方法。'
      ],
      bad: [
        { say: '随便用什么风格实现就行', why: '混入 class 组件或 Options API 会破坏项目一致性；范式必须在指令中显式约束。' }
      ]
    },
    misconceptions: [
      'Hooks 就是让函数组件拥有类组件的能力这么简单？真正的革命在逻辑组织方式的改变：从按技术分区到按功能聚合。'
    ],
    related: ['lifecycle', 'state', 'component']
  },

  {
    id: 'one-way-data-flow',
    en: 'One-Way Data Flow',
    zh: '单向数据流',
    aliases: ['props 单向下行', 'Props Drilling'],
    cat: 'frontend',
    tags: ['框架原理', '架构'],
    level: 'core',
    summary: '数据只能父传子单向流动，子组件想改必须 emit 事件请父级出手——秩序来自单行道。',
    plain: [
      'React 与 Vue 共同的基石约定：props 自上而下传递，子组件不得直接修改 props；想影响上游，通过 emit 事件通知父级修改源头数据。这条单行道换来的是可追溯性——界面显示错了，沿着数据链路向上游走一定能找到源头，不存在「不知道谁改的」悬案。',
      '它的代价也有名字：Props Drilling（属性钻井）——中间五层组件明明自己不用，只为把值转手给第六层。缓解手段按侵入度排序：相邻层级适度合并组件、Vue 的 provide/inject 或 React Context 跨层注入、以及承认这份状态本该进全局 store。注意 Context 不是万能口袋，频繁变化的数据放进去会造成大面积重渲染。',
      '给 AI 的红线句式值得背下来：「子组件禁止直接修改 props 对象的属性，请 emit update 事件由父级变更源数据」。缺了这句，它时常顺手写出 props.xxx = 值 这种破坏单向流的反模式。'
    ],
    analogy: '公司预算制度：经费自上而下下发（props 下行），基层需要追加必须打报告向上申请（emit 上行），绝不允许直接挪用上级账户——流程啰嗦一点，但每一笔变动都有据可查。',
    talk: {
      good: [
        '弹窗开关状态由父级持有：子组件 emit close 事件请父级置 false，不要接收 visible prop 后内部私自改动。'
      ],
      bad: [
        { say: '子组件直接把这个值改了就行很快', why: '直改 props 短期能跑，但破坏数据溯源且父级毫无感知；审查阶段必然返工。' }
      ]
    },
    misconceptions: [
      'Vue 的 v-model 打破了单向数据流？它只是「props 下行 + emit 上行」的语法糖包装，底层仍是标准的单向回路。'
    ],
    related: ['state-management', 'component', 'state']
  },

  {
    id: 'list-key',
    en: 'List Key & Diff',
    zh: '列表 key 与 diff',
    cat: 'frontend',
    tags: ['框架原理', 'bug 高发'],
    level: 'core',
    summary: 'key 是列表元素的身份证：框架凭它判断谁是谁，决定复用更新还是推倒重建。',
    plain: [
      '框架 diff 新旧两份列表时，靠 key 把新旧节点一一配对：key 相同视为同一个元素原地更新内容，配不上的销毁重建。若用数组下标当 key，中间插入或删除一项会让后面所有下标位移——框架误判身份，出现输入框串位、勾选状态张冠李戴、过渡动画错乱这一族经典怪象。正确做法永远是稳定的业务唯一 ID 作 key。',
      '另一个隐形杀手：用随机数或 Date.now() 生成 key，每次渲染全员换证，框架判定全部是新面孔，整个列表推倒重建——性能归零且组件内部状态荡然无存。反过来说，key 也是刻意刷新的法器：不想让某分支复用时换个 key 强制重建。',
      '评审 AI 生成的代码时的固定检查项：「v-for / map 渲染有没有拿 index 当 key？」凡列表存在排序、过滤、增删的可能，就必须换成业务 ID。'
    ],
    analogy: 'key 像酒店房卡上的房号：客人换了几批，房号不变则房间状态保留续用；若按入住先后编卡号（index），中途插进一位新客，后面全体房客都得换房重装行李。',
    talk: {
      good: [
        '任务列表渲染请以 task.id 作为 key；当前用了 index 导致勾选串位，请修复并说明原因。'
      ],
      bad: [
        { say: '列表更新以后内容对不上行了', why: '这是 index-key 的典型症状描述；直接指出怀疑点比罗列现象更快收敛。' }
      ]
    },
    misconceptions: [
      'key 只是为了消除控制台警告？它是 diff 算法的匹配依据；乱设 key 的代价是错误的状态复用与无谓的全量重建。'
    ],
    related: ['virtual-dom', 'component']
  },

  {
    id: 'controlled-uncontrolled',
    en: 'Controlled & Uncontrolled',
    zh: '受控与非受控组件',
    aliases: ['受控组件', '非受控'],
    cat: 'frontend',
    tags: ['表单', '框架原理'],
    level: 'common',
    summary: '表单值由 state 驱动为受控，交给 DOM 自己保管为非受控——两种哲学各有主场。',
    plain: [
      '受控组件：输入框 value 绑定 state，onChange 把每次敲键同步回 state——state 是唯一真相源，实时校验、字段联动、格式化随手可得；代价是每敲一键触发一轮渲染，巨型表单需做性能权衡。非受控组件：defaultValue 给个初值后放手交给 DOM 自己维护，需要时用 ref 读值——省渲染省心智，适合简单收集或封装第三方输入控件。',
      '生态倾向：Vue 因 v-model 双向绑定天然偏受控；React 两者并存、官方示例偏受控，大型表单则常交给 react-hook-form 这类以非受控为内核的方案兼顾性能。选择信号很清晰：要实时校验、联动显隐、受格式化约束 → 受控；纯收集一次性提交、字段极多 → 非受控。',
      '和 AI 协作先声明范式再动手：「本项目表单一律受控 + zod schema 校验」，避免它一半受控一半 ref 的混搭产物。'
    ],
    analogy: '受控像自动驾驶全程接管方向盘（state 每一刻决定显示什么）；非受控像定速巡航设好初值放手让它跑，到了目的地再看里程表取结果（ref 读值）。',
    talk: {
      good: [
        '注册表单全部受控：每字段绑定 state，zod 校验放 blur 与 submit 双时机，错误文案映射到对应字段下方。'
      ],
      bad: [
        { say: '表单随便搞能提交就行', why: '范式不统一会导致一半字段失焦即校验、另一半提交后才有反馈，用户体验割裂难排查。' }
      ]
    },
    misconceptions: [
      '受控组件一定更好更安全？它带来完全掌控也带来每键重渲；超长动态表单里非受控反而是性能正解。'
    ],
    related: ['state', 'reactive-binding', 'one-way-data-flow']
  },

  {
    id: 'css-box-model',
    en: 'Box Model',
    zh: '盒模型与 box-sizing',
    aliases: ['盒模型'],
    cat: 'frontend',
    tags: ['CSS', '布局'],
    level: 'core',
    summary: '元素由内到外四层套娃：内容区、内边距、边框、外边距；box-sizing 定 width 边界。',
    plain: [
      '盒模型是 CSS 布局的原子概念，由内向外四层：内容区 content、内边距 padding、边框 border、外边距 margin。「设了 width:200px 却撑破容器」的历史坑源于标准盒模型语义——width 只指 content 层，叠加 padding 和 border 后总宽超出预期。border-box 模式让 width 直接包含 padding 与 border，尺寸即所见，因此现代工程普遍全局设置 * { box-sizing: border-box }。',
      'margin 还有两个独立戏法：垂直方向的相邻 margin 会折叠合并取较大者（上下贴着的两段间距不是相加）；margin 属于「对外占位」不计入自身尺寸。行内元素的垂直 padding/margin 行为也与块级不同——布局诡异时先确认元素的 display 身份。',
      '与 AI 沟通尺寸问题的有效句式：「项目已全局 border-box」「这个 16px 间距的设计意图是 padding 还是 margin」——一句背景陈述能省掉来回试错的整个回合。'
    ],
    analogy: '像快递包裹计价：货物本体（content）、缓冲泡沫（padding）、纸箱皮（border）、与其他箱子保持的距离（margin）——「width 报的是哪一层」取决于你选哪家快递的标准（box-sizing）。',
    visual: { kind: 'svg', id: 'box-model', caption: '四层结构与两种 box-sizing 的差异' },
    talk: {
      good: [
        '卡片宽度 320 含内边距：项目已全局 border-box，padding 16、圆角 12、阴影用 token 变量。'
      ],
      bad: [
        { say: '这个盒子怎么宽了帮我看看样式', why: '不给 box-sizing 前提与期望总宽，AI 只能在标准/IE 盒模型的歧义里来回猜。' }
      ]
    },
    misconceptions: [
      'width 包含 margin？无论哪种 box-sizing，margin 都不计入元素尺寸，它只影响与邻居之间的占位距离。'
    ],
    related: ['flex-grid', 'css-cascade', 'reflow-repaint']
  },

  {
    id: 'css-cascade',
    en: 'Cascade & Specificity',
    zh: '层叠与优先级',
    aliases: ['选择器优先级', '样式覆盖'],
    cat: 'frontend',
    tags: ['CSS'],
    level: 'core',
    summary: '样式冲突按来源、特异性、书写顺序裁决：读懂层叠才能解释样式为何不生效。',
    plain: [
      '「我写的样式怎么没效果」的前三名原因全在层叠规则里。特异性计分：内联 style(1000) > id(100) > class/伪类/属性(10) > 标签(1)，高分者胜；分数相同后写的赢；!important 无视一切计分强行登顶——滥用它会开启 important 军备竞赛，最后谁都压不过谁。',
      '另一大类原因是选择器根本没命中：类名拼写不一致、CSS Modules/Scoped CSS 给 class 加了哈希后缀导致全局选择器失效、Shadow DOM 的样式隔离边界、或者样式文件压根没被构建引入。诊断入口固定一个：DevTools 的 Elements → Styles 面板——划线删除线的规则表示被更高优先级覆盖；Styles 里完全找不到你的规则，说明选择器没选中而非被覆盖。',
      '向 AI 提交样式 bug 的黄金姿势：附上「目标元素的 class 列表 + Styles 面板截图或 computed 值」，比口头一句「样式不对」少绕十圈。'
    ],
    analogy: '像公司着装规范的裁决链：董事长临时指示（内联）压过部门规定（id），部门规定压过全员手册（class），同级规范以最新发文为准（书写顺序）——而 CEO 特批（!important）能让任何人豁免全部条款。',
    talk: {
      good: [
        '按钮 hover 样式被全局 .btn 规则盖掉了：请在我的组件内提高特异性或调整引入顺序，禁止使用 !important。'
      ],
      bad: [
        { say: '样式不生效加个important吧', why: '!important 掩盖层叠根因并污染后续维护；应定位特异性差距对症解决。' }
      ]
    },
    misconceptions: [
      'class 比 id 「更高级」？恰恰相反：id 特异性远高于 class；所谓高级指的是命中范围灵活而非权重。'
    ],
    related: ['css-box-model', 'component']
  },

  {
    id: 'flex-grid',
    en: 'Flexbox & Grid',
    zh: 'Flex 与 Grid 布局',
    aliases: ['弹性布局', '网格布局', '居中'],
    cat: 'frontend',
    tags: ['CSS', '布局'],
    level: 'core',
    summary: 'Flex 解决一维排队（行或列），Grid 解决二维棋盘（行列同时定）：现代布局双引擎。',
    plain: [
      '传说中「怎么居中」的标准答案就是 Flex 三件套：display:flex; justify-content:center; align-items:center。Flex 的心智模型是主轴与交叉轴：方向由 flex-direction 决定，justify-content 管主轴分布，align-items 管交叉轴对齐；flex:1 让子项弹性瓜分剩余空间，grow/shrink/basis 三旋钮精调伸缩策略。',
      'Grid 换成轨道思维：grid-template-columns: repeat(3, 1fr) 定义三条等宽轨道，gap 统一开槽，子项可 grid-column: span 2 跨列——仪表盘、卡片墙、杂志版式这类二维结构首选。经验分工：内容驱动的流动排布用 Flex，结构驱动的固定网格用 Grid；两者嵌套混用才是日常。',
      '给 AI 提布局需求时报结构不报感觉：「左栏固定 240px，右侧自适应余宽，间距 16px，右栏内部三卡片等分」——精确的结构描述换来一步到位的实现，「好看点」只会得到随机惊喜。'
    ],
    analogy: 'Flex 像体育课排队：一条队伍前后左右微调队形（一维）；Grid 像电影院排座：先画好几排几座的座位图，观众按票入座还能买联座（二维）。',
    talk: {
      good: [
        '页头布局：logo 固定居左，导航居中，操作区居右；容器 flex，两侧 justify-between，中间 margin auto。'
      ],
      bad: [
        { say: '帮我把这几个块排好看点', why: '审美形容词无法编译；给出结构化布局描述（几栏、谁固定、间距多少）才能一次成型。' }
      ]
    },
    misconceptions: [
      'Grid 出现后 Flex 就淘汰了？两者是分工不是替代：一维内容流 Flex 更顺手，二维结构 Grid 更强，混用是常态。'
    ],
    related: ['css-box-model', 'responsive-design']
  },

  {
    id: 'responsive-design',
    en: 'Responsive Design',
    zh: '响应式布局与移动端适配',
    aliases: ['媒体查询', '移动端适配'],
    cat: 'frontend',
    tags: ['CSS', '移动端'],
    level: 'common',
    summary: '一套代码适配手机到大屏：视口 meta、断点媒体查询与流式单位。',
    plain: [
      '响应式三件套：视口 meta 标签（缺了它手机按 980px 缩放渲染，页面变成小蚂蚁——移动端异常半数由此起）；@media 媒体查询按断点切换样式；流式单位（%、rem/em、vw/vh 配合 max-width 约束）让尺寸随环境伸缩。方法论主流是移动优先：基础样式写给最小屏，再用 min-width 断点逐步增强大屏——代码更短、小屏不必下载多余样式。',
      '移动端还有一组本地化课题：rem 动态根字号适配设计稿（750 稿换算）、iPhone 底部安全区 env(safe-area-inset-bottom)、触摸目标不小于 44px、1px 边框在高 DPI 屏的处理。这些细节不问不写，问了 AI 都会给。',
      '高效协作句式：「设计稿 750 宽、断点 768/1024、采用 rem 方案；此页移动优先开发」——基准与断点一次交代，省掉三轮返工。'
    ],
    analogy: '像一套会呼吸的西装：媒体查询是场合切换开关（通勤/宴会两副面孔），流式单位是有弹性的面料（随身材自然伸缩），移动优先则是先保证日常合身，再谈宴会的华丽加饰。',
    talk: {
      good: [
        '此页移动优先：基础样式按 375 设计稿用 rem；768 以上切双栏布局，侧边栏固定 260px；底部按钮避开安全区。'
      ],
      bad: [
        { say: '做成响应式的兼容一下手机', why: '不给设计稿基准与断点策略，AI 的适配结果与你手里的设计稿必然对不上。' }
      ]
    },
    misconceptions: [
      '加了 viewport meta 页面就算适配了？那只是第一步；字号、栅格、触控区域、安全区都要按移动端习惯单独处理。'
    ],
    related: ['flex-grid', 'css-cascade']
  },

  {
    id: 'seo',
    en: 'SEO',
    zh: 'SEO 搜索引擎优化',
    aliases: ['搜索引擎优化', 'TDK'],
    cat: 'frontend',
    tags: ['Web', '流量'],
    level: 'common',
    summary: '让搜索引擎读懂并愿意排名你的页面：语义化结构、TDK 三要素、可抓取性是地基。',
    plain: [
      'SEO 地基三件事：语义化 HTML——唯一的 h1 点题、nav/main/article 各司其职、图片带 alt，爬虫靠结构猜主题；TDK 元信息——title 与 description 准确概括本页核心词（keywords 已基本退役但仍无害）；可抓取性——robots.txt 放行、sitemap.xml 提交、URL 唯一且含描述性路径、关键内容不要只活在客户端渲染里（SPA 空壳问题需 SSR/预渲染补救，见 ssr 词条）。',
      '进阶两项：结构化数据 JSON-LD 让搜索结果出现星级、面包屑等富摘要；Core Web Vitals（LCP/CLS/INP）性能指标已纳入排名权重——SEO 与性能优化在这里汇合。反面清单同样重要：关键词堆砌、隐藏文字、批量采集 doorway 页会被算法惩罚，得不偿失。',
      '给 AI 的落地指令模板：「为产品落地页做站内 SEO：title/description 围绕关键词 X 组织；正文语义标签化；图片补 alt 与懒加载；输出 JSON-LD Product 结构化数据」。'
    ],
    analogy: 'SEO 像把简历写给 HR 筛选机器人：格式规范（语义化标签）、自我概括精准（TDK）、投递渠道畅通（可抓取）——三者缺一，履历再漂亮也进不了面试池。',
    talk: {
      good: [
        '营销页 SEO 强化：title 控制在 30 字内含核心词，description 80 字内带行动号召，正文 h2 分段覆盖三个长尾词。'
      ],
      bad: [
        { say: '帮我把排名做上去', why: 'SEO 无法凭空承诺排名；站内可交付的是结构与内容优化，外链与算法因素不在代码范围内。' }
      ]
    },
    misconceptions: [
      '关键词越多排名越高？现代搜索引擎以语义相关性衡量，堆砌关键词反而触发降权惩罚。'
    ],
    related: ['ssr', 'spa']
  },

  {
    id: 'lazy-loading',
    en: 'Lazy Loading',
    zh: '懒加载与按需加载',
    aliases: ['懒加载', '动态导入'],
    cat: 'frontend',
    tags: ['性能'],
    level: 'common',
    summary: '首屏用不到的资源先别拉：路由分包、组件动态导入、图片进入视口再请求。',
    plain: [
      '懒加载是把「此刻不需要的资源」推迟到需要时再加载的艺术。三个层次：路由级——React.lazy(() => import(...)) / Vue 动态 import 让每个页面独立分包，首屏 JS 锐减；组件级——Suspense 包裹重组件（编辑器、图表库）用到时再载；资源级——图片 loading="lazy" 或 IntersectionObserver 进入视口才请求，视频音频同理。',
      '配套体验细节决定成品质感：分包 chunk 加载中的骨架屏或 loading 态；图片显式声明宽高防止加载完成后布局跳动（CLS 指标杀手）。反模式也要认识：把首屏必需资源也懒加载会造成二次闪烁；过度细分产生几百个小请求反而拖慢整体速度。',
      '给 AI 的常用指令：「echarts、xlsx 这类大依赖改为对应页面动态 import」「首屏之外的全部图片加 loading=lazy 并补 width/height 占位」。'
    ],
    analogy: '像图书馆按需调书：你只借当下要读的一本（首屏分包），没有人会把整屋藏书（全量 bundle）一次搬到你的桌上；书架空位先放张卡片（宽高占位），免得旁边的书倒下来。',
    talk: {
      good: [
        '首屏 bundle 超 1MB：路由全部改动态 import 分包，echarts 移入图表页懒加载，并预加载关键 chunk 防止点击白屏。'
      ],
      bad: [
        { say: '能懒加载的都懒加载', why: '不分青红皂白的懒加载会把关键路径切碎造成连环 loading；首屏必需资源应保持同步加载。' }
      ]
    },
    misconceptions: [
      '懒加载一定提升速度？它优化的是首屏时间与带宽占用；交互过程中的延迟感反而可能上升，需要骨架屏平衡体验。'
    ],
    related: ['bundler', 'cdn']
  },

  {
    id: 'http-client',
    en: 'fetch & Request Client',
    zh: 'fetch 与请求封装',
    aliases: ['fetch', 'axios', '请求拦截器'],
    cat: 'frontend',
    tags: ['HTTP', '工程化'],
    level: 'core',
    summary: '原生 fetch 与生产级请求封装：拦截器、取消超时、统一错误分支。',
    plain: [
      'fetch 是浏览器原生的 HTTP 客户端：Promise 风格、支持流式读取。两个著名暗坑必须刻在脑子里——只有网络层错误才会 reject，404/500 也走 resolve（必须手动判 res.ok！）；默认不携带 Cookie，跨域凭证需 credentials 配置。axios 则内置了 JSON 序列化、超时、拦截器与更直觉的错误抛出。',
      '生产项目的标配是在裸客户端之上薄封装一层：baseURL 按环境切换；请求拦截器统一注入 token 与 trace 头；响应拦截器统一解包 data、按错误码分支（401 清凭证跳登录、429 退避提示）；AbortController 实现请求取消与超时中止——搜索联想的竞态治理就靠它。这层封装是前后端契约在前端的枢纽文件。',
      '让 AI 新增接口时带上上下文：「沿用 src/api/client.ts 的封装与错误码表新增 xxx 接口」——它生成的代码才会融入既有体系而不是另立山头。'
    ],
    analogy: 'fetch 像一台裸发动机：能跑但没有空调没有导航；请求封装是把它装配成整车——方向盘统一（拦截器）、自动避让（取消重试）、仪表报警（错误分支），全团队开同一款车才有一致的驾驶体验。',
    talk: {
      good: [
        '基于现有 client 新增订单列表接口：GET /orders 支持 page/tag 参数，复用响应拦截器的错误分支，401 已有处理无需重复。'
      ],
      bad: [
        { say: '在组件里直接 fetch 一下接口', why: '散装的 fetch 调用绕过鉴权头与错误码分支，token 过期、服务端错误各页面表现不一。' }
      ]
    },
    misconceptions: [
      'fetch 报错了就是服务器 500 了？fetch 的 reject 只代表网络层失败；HTTP 4xx/5xx 是正常 resolve，需要手动检查 response.ok。'
    ],
    related: ['api', 'cors', 'race-condition', 'status-codes']
  },

  {
    id: 'button',
    en: 'Button',
    zh: '按钮',
    cat: 'frontend',
    tags: ['UI 组件', '基础控件'],
    level: 'core',
    summary: '触发一次动作的点击控件；按优先级分主/次/幽灵/危险等变体。',
    plain: [
      '按钮是全站出现率最高的控件，准确的指令词能让 AI 一次生成对的视觉层级：主按钮 primary（页面核心动作，通常唯一）、次按钮 default、幽灵按钮 ghost（低强调）、危险按钮 danger（删除类）、文字链接按钮 link。',
      '沟通要点三件套：按钮文案、点击后的行为、加载/禁用状态。比如「提交按钮点击后调接口，请求中变为 loading 防重复提交」——不交代状态，AI 生成的按钮连防连点都没有。'
    ],
    analogy: '按钮像电梯呼叫键：文案是乘客意图，按完灯亮/梯动就是状态反馈——没人会按完不看灯。',
    talk: {
      good: [
        '做一个主按钮「保存」，点击后校验表单并调接口，请求期间按钮置 loading 且禁用，成功后跳详情页。'
      ],
      bad: [
        { say: '搞个好看点的按钮', why: '缺文案、优先级与点击行为，AI 只能猜一个带样式的空壳。' }
      ]
    },
    misconceptions: [
      '主按钮可以随便放多个？每屏主导动作应唯一，多个主按钮会稀释视觉引导。'
    ],
    related: ['icon-button', 'interactive-states', 'confirm-dialog']
  },

  {
    id: 'icon-button',
    en: 'Icon Button',
    zh: '图标按钮',
    cat: 'frontend',
    tags: ['UI 组件', '基础控件'],
    level: 'common',
    summary: '只有图标的按钮：省空间，但必须配可读名称（aria-label）。',
    plain: [
      '图标按钮把文字压缩成一个图形，常用于操作密集区（表格行内编辑/删除、导航栏）。代价是含义依赖用户识字库——同一个垃圾桶图标，对某些用户可能是「删除」，对另一些可能就是「回收站」。',
      '工程硬规矩：图标必须带 title 或 aria-label，否则屏幕阅读器读不出来，AI 审查也容易漏；触控目标建议不小于 32px 以免手机误触。给 AI 的格式：「行内放三个图标按钮：编辑、删除（danger）、更多，均需 aria-label」。'
    ],
    analogy: '图标按钮像机场卫生间标志：不识字也懂，但少个「女」字（无障碍标签）就会有人走错门。',
    talk: {
      good: [
        '表格操作列用三个 icon-button，均带 aria-label；删除用红色图标并接二次确认。'
      ],
      bad: [
        { say: '就放个小图标就行', why: '没说含义与无障碍标注，AI 产出无标签纯图形按钮，点进去才知道是什么。' }
      ]
    },
    misconceptions: [
      '图标按钮好看就够了？可访问性与触控尺寸是硬约束，纯装饰的图标按钮是可用性事故。'
    ],
    related: ['button', 'tooltip', 'interactive-states']
  },

  {
    id: 'text-input',
    en: 'Text Input',
    zh: '输入框',
    cat: 'frontend',
    tags: ['UI 组件', '表单'],
    level: 'core',
    summary: '单行文本录入控件；配套标签、占位符、清空与校验反馈。',
    plain: [
      '输入框是最常用表单控件。沟通模板：字段标签、占位符文案（给示例而非说明）、输入类型（文本/数字/密码）、可选项（清空按钮、字数限制、前后缀单位如 ￥/kg）。',
      '状态设计是 AI 经常遗漏的部分：聚焦高亮、校验成功/失败、disabled 与 readonly（不可编辑但可复制，区别于禁用）、密码框的「显示/隐藏」切换。给 AI 的完整句式：「手机号输入框，占位 请输入手机号，11 位校验，失焦即校验并显示错误文案」。'
    ],
    analogy: '输入框像挂号窗口：格子要写明「姓名/科室」（标签与占位），填错要当场告诉你哪错了（校验反馈），而不是出院才通知。',
    talk: {
      good: [
        '邮箱输入框：type=email，失焦校验格式，错误时红色边框加提示文案，提供清空按钮。'
      ],
      bad: [
        { say: '放个输入框', why: '缺标签、类型、校验与反馈，AI 生成裸 input，表单体验全靠你事后补。' }
      ]
    },
    misconceptions: [
      'placeholder 可以当表单标签？占位符在失焦空值时消失，不能替代永远可见的 label。'
    ],
    related: ['textarea', 'search-input', 'controlled-uncontrolled']
  },

  {
    id: 'textarea',
    en: 'Textarea',
    zh: '多行文本框',
    cat: 'frontend',
    tags: ['UI 组件', '表单'],
    level: 'common',
    summary: '多行文本录入区；可配初始行数、字数上限与自适应高度。',
    plain: [
      '多行文本适合备注、描述、评论这类长内容。关键参数：初始行数 rows、最大长度 maxlength（要配字数计数器）、自适应高度 autosize、是否允许换行。',
      '产品细节常被 AI 忽略：粘贴超长内容的处理（截断还是拒绝）、空行折叠规则、输入法组合态。向 AI 描述时给业务规则而非只说「大文本框」：「描述框最多 500 字，右下角实时计数，超出截断并提示」。'
    ],
    analogy: '文本框像意见簿：格子多深取决于想收多少字，还要贴一张「限 500 字」的说明（字数计数）。',
    talk: {
      good: [
        '评论 textarea：初始 3 行自适应到 8 行，上限 200 字，右下角字数计数接近上限时变红。'
      ],
      bad: [
        { say: '搞个大一点的输入框', why: '行数、限长、自适应都没说，AI 的默认实现大概率与你的规格不符。' }
      ]
    },
    misconceptions: [
      'textarea 和 input 没区别？input 单行不能换行，textarea 支持多行与 resize，语义不同。'
    ],
    related: ['text-input', 'controlled-uncontrolled']
  },

  {
    id: 'select-dropdown',
    en: 'Select',
    zh: '下拉选择',
    cat: 'frontend',
    tags: ['UI 组件', '表单'],
    level: 'common',
    summary: '从固定候选中单选/多选；注意原生 select 与自定义组件的差异。',
    plain: [
      '候选集固定且几十项以内时用下拉选择：默认收起一个框，点开出现列表。关键参数：默认值、可搜索（选项多时）、多选、分组、禁用项。',
      '选型的现实考量：原生 select 样式难统一但零依赖、无障碍天然；自定义下拉（组件库）体验可控但要处理点击外部关闭、键盘导航、焦点管理。给 AI 的句式：「状态筛选下拉，含 全部/待审核/已通过/已驳回，多选且可清空」。'
    ],
    analogy: '下拉像点餐机的固定套餐菜单：列什么就点什么，不会出现「其他」这种开放式选项（那应该用输入框）。',
    talk: {
      good: [
        '城市选择用可搜索下拉：接口提供列表，本地过滤，选中显示完整名称，支持键盘上下选择。'
      ],
      bad: [
        { say: '弄个能选的框', why: '单选多选、数据来源、可搜索都没说，AI 大概率生成一个静态空列表。' }
      ]
    },
    misconceptions: [
      '下拉选择什么都适合？候选无限或需精确输入的场景，下拉是灾难，该用带建议的输入框。'
    ],
    related: ['text-input', 'checkbox', 'dropdown-menu']
  },

  {
    id: 'checkbox',
    en: 'Checkbox',
    zh: '复选框',
    cat: 'frontend',
    tags: ['UI 组件', '表单'],
    level: 'common',
    summary: '可多选的勾选框；有半选态（indeterminate），批量操作场景的标配。',
    plain: [
      '复选框表达「可同时选多个」：勾选/取消、全选与半选（部分子项选中时父项显示短横）、禁用。它与单选框（只能选一）的分工是产品设计第一课。',
      '交互细节高频被 AI 漏掉：点击整行文字是否切换（通常要）、全选与子项的联动、选中数量提示。向 AI 描述：「列表头全选复选框，子项全选时打勾、部分选中显示半选态，底部条显示已选数量与批量操作」。'
    ],
    analogy: '复选框像火锅勾菜单：可以同时勾肥牛和毛肚（多选）；单选框则是锅底——鸳鸯/清汤只能二选一。',
    talk: {
      good: [
        '多选表格用复选框：表头全选联动子项，部分选中显示半选态，底部工具栏按选中数显示操作。'
      ],
      bad: [
        { say: '加个勾选功能', why: '多选还是单选、是否联动全选都没定义，AI 只能做个孤立的 checkbox。' }
      ]
    },
    misconceptions: [
      '半选态是个可点击的第三状态？indeterminate 只是展示态，点击它应进入全选或全不选。'
    ],
    related: ['radio-group', 'switch-toggle', 'table']
  },

  {
    id: 'radio-group',
    en: 'Radio Group',
    zh: '单选组',
    cat: 'frontend',
    tags: ['UI 组件', '表单'],
    level: 'common',
    summary: '一组互斥选项只能选其一；选项过多时应改用下拉或分段控件。',
    plain: [
      '单选框组强调「从 N 个里必选一」：默认值、禁用项、垂直还是水平排列、选项过多时的替代方案（下拉、分段按钮）。',
      '无障碍要点：整组用 fieldset 包裹，键盘方向键切换选项。给 AI 的完整描述：「支付方式单选组：微信/支付宝/银行卡，默认微信，银行卡选中时下方展开卡号输入」——这类选中分支展开的联动正是 AI 容易漏写的逻辑。'
    ],
    analogy: '单选组像相亲必答项：籍贯、学历、收入各勾一个，多勾会被打回（互斥）；选项太多就该换成下拉筛选。',
    talk: {
      good: [
        '偏好设置用单选组：通知方式 站内/邮件/关闭 三选一，默认站内；选关闭时隐藏下方的通知预览。'
      ],
      bad: [
        { say: '选项选一个就行', why: '没说选项内容与联动行为，AI 产出无法与你的业务状态绑定。' }
      ]
    },
    misconceptions: [
      '单选和复选框效果差不多？单选=互斥二选一，复选框=可多选，交互语义完全不同。'
    ],
    related: ['checkbox', 'select-dropdown', 'controlled-uncontrolled']
  },

  {
    id: 'switch-toggle',
    en: 'Switch',
    zh: '开关',
    cat: 'frontend',
    tags: ['UI 组件', '表单'],
    level: 'common',
    summary: '二值状态的即时开关：切换即生效，破坏性开关要二次确认。',
    plain: [
      '开关适合「立即生效」的二元设置：开启通知、黑暗模式、自动续费。视觉像灯开关，切换瞬间就改变系统状态，不需要「保存」按钮——这是它与复选框的本质差异：复选框等提交，开关即点即生效。',
      '设计守则：开/关有明确后果时要给反馈文案（「已开启推送」）；破坏性开关（停用账号）需要二次确认。给 AI 描述：「自动续费开关，开启时弹确认框说明扣费规则，关闭时直接生效并 toast 提示」。'
    ],
    analogy: '开关像房间灯闸：按下去灯立刻亮（即时生效）；复选框则像购物清单——勾了还要等「提交」才作数。',
    talk: {
      good: [
        '设置项用 switch：开启「新消息提醒」立即生效并 toast 确认；关闭弹二次确认避免误关。'
      ],
      bad: [
        { say: '弄个开关按钮', why: '没说是否即时生效与后果，AI 可能做成点一下才保存的伪开关。' }
      ]
    },
    misconceptions: [
      '开关就是美化过的复选框？switch 代表即时二元动作，checkbox 代表可推迟提交的多选状态，语义不同。'
    ],
    related: ['checkbox', 'toast', 'confirm-dialog']
  },

  {
    id: 'slider',
    en: 'Slider',
    zh: '滑块',
    cat: 'frontend',
    tags: ['UI 组件', '表单'],
    level: 'advanced',
    summary: '拖拽取值的控件：连续范围或离散档位，注意回调节流。',
    plain: [
      '滑块用于「区间取值」：音量、价格区间、评分。参数：min/max/step（步长决定离散或连续）、是否支持范围（双滑块）、刻度标签、拖拽中实时显示当前值。',
      '细节决定体验：拖拽过程触发的回调要节流或只在松手时提交（否则接口被高频请求打爆）；双滑块的两端边界要防交叉。给 AI 的句式：「价格区间双滑块：min 0 max 1000 step 50，拖拽中只本地显示数值，松手后才触发查询」。'
    ],
    analogy: '滑块像收音机音量旋钮：一边转一边听变化（连续反馈），也能咔哒咔哒卡在固定档位（step 离散）。',
    talk: {
      good: [
        '视频进度条：支持点击跳转与拖拽预览，拖拽中暂停更新主界面，松手后 seek。'
      ],
      bad: [
        { say: '加个可以拖的条', why: '取值范围、离散连续、拖拽节流都没说，AI 的默认实现会拖一下打一堆请求。' }
      ]
    },
    misconceptions: [
      '滑块适合精确输入？它只适合模糊选择；要输「正好 15.5」还是用数字输入框。'
    ],
    related: ['progress-bar', 'text-input', 'debounce-throttle']
  },

  {
    id: 'date-picker',
    en: 'Date Picker',
    zh: '日期选择器',
    cat: 'frontend',
    tags: ['UI 组件', '表单'],
    level: 'common',
    summary: '日期/时间/范围选择控件；格式、时区与禁用日期是三大坑。',
    plain: [
      '日期选择常见形态：单选日期、日期+时间、范围选择（开始-结束）、周/月选择。给 AI 的关键参数：日期格式、快捷选项（今天/近 7 天）、可禁用日期（过去日期、已满房源）。',
      '工程三坑：字符串格式与时区——传给后端应为 ISO 而非本地化字符串；范围选择的开始晚于结束要自动校正；「今天」的定义在跨时区用户上是玄学，先约定用哪个时区。给 AI 描述：「入住日期选择：禁用今天之前，入住早于退房，离店日期不可早于入住」。'
    ],
    analogy: '日期选择像车站售票窗口：告诉它出发日和返程日（范围），它还帮你挡掉「昨天出发」这种不可能的组合（禁用逻辑）。',
    talk: {
      good: [
        '订单筛选加日期范围选择：默认近 30 天，提供 今天/近7天/本月 快捷项，传后端统一为 YYYY-MM-DD。'
      ],
      bad: [
        { say: '做个选日期的', why: '范围还是单点、禁用什么日期、格式都没定，AI 的默认实现十有八九时区踩雷。' }
      ]
    },
    misconceptions: [
      '日期选择器显示的格式就是传输格式？显示格式是给人看的，传输必须标准化并考虑时区。'
    ],
    related: ['select-dropdown', 'http-client']
  },

  {
    id: 'file-upload',
    en: 'File Upload',
    zh: '文件上传',
    cat: 'frontend',
    tags: ['UI 组件', '表单'],
    level: 'common',
    summary: '选择并上传文件：类型大小校验、进度、失败重试是基本盘。',
    plain: [
      '上传控件两态：按钮式和拖拽式（整块区域 drag & drop）。基础流程：选文件 → 客户端校验（类型/大小/数量）→ 上传 → 显示进度 → 成功/失败反馈。',
      '进阶规格随口就要能说：上传限制、预览（图片缩略图）、重复文件处理、失败重试、上传中的取消。大文件还要谈分片与断点续传。给 AI 的句式：「图片上传：限 5 张、单张 5MB、仅 jpg/png/webp，带缩略图预览与删除，上传失败可重试」。'
    ],
    analogy: '上传像寄包裹：先过安检（类型大小校验）、贴单称重（进度）、到达要回执（成功状态）；寄丢要能重寄（重试）。',
    talk: {
      good: [
        '头像上传组件：裁剪后压缩至 200KB 内再提交，类型限 jpg/png，上传中禁用提交按钮。'
      ],
      bad: [
        { say: '做个上传功能', why: '格式、大小、数量、进度、重试全部缺失，AI 只能给出最简陋的实现。' }
      ]
    },
    misconceptions: [
      '拖拽上传需要特殊库？原生 drag events + input[type=file] 就能实现基础拖拽区。'
    ],
    related: ['progress-bar', 'button', 'http-client']
  },

  {
    id: 'search-input',
    en: 'Search Input',
    zh: '搜索框',
    cat: 'frontend',
    tags: ['UI 组件', '表单'],
    level: 'common',
    summary: '带图标与清空按钮的输入框；联想、防抖、回车与键盘导航是标配。',
    plain: [
      '搜索框与普通输入框的差异都在周边配套：搜索图标、清空按钮（有内容才出现）、聚焦时的建议列表、回车触发、可选的历史记录。',
      '工程要点：联想请求必须防抖 + 竞态防护；空关键词的边界（回车但没输入）；建议列表的键盘导航（↑↓ 选择、Enter 选中、Esc 关闭）。给 AI 的完整描述：「顶部搜索框：输入 300ms 防抖请求联想，下拉展示结果支持键盘选择，点清空恢复初始列表」。'
    ],
    analogy: '搜索框像图书馆检索台：输入即出候选书名（联想），回车才正式翻库（提交），旁边有个小红叉随时清空重来。',
    talk: {
      good: [
        '全站搜索：输入防抖 300ms 调联想接口，命中高亮，Enter 进入结果页，支持键盘 ↑↓ 选择建议项。'
      ],
      bad: [
        { say: '搞个能搜的框', why: '联想要不要、防抖多久、回车去哪都没说，AI 生成的是没有灵魂的裸输入框。' }
      ]
    },
    misconceptions: [
      '搜索联想必须实时？数据量大或接口贵时按需触发（如输入两个字符以上）反而更合理。'
    ],
    related: ['text-input', 'debounce-throttle', 'race-condition']
  },

  {
    id: 'card',
    en: 'Card',
    zh: '卡片',
    cat: 'frontend',
    tags: ['UI 组件', '容器'],
    level: 'core',
    summary: '把一组相关信息包成独立小方块：标题、内容、操作三段式。',
    plain: [
      '卡片是后台系统出现率最高的容器：图片、标题、描述、标签、操作按钮打包成一块。沟通要点：内容结构（上中下三段）、hover 交互（悬浮阴影/高亮）、是否可点击整卡、响应式列数（每行几列随屏宽变化）。',
      '给 AI 的句式模板：「商品卡片：左侧缩略图 120px，右侧标题两行省略、价格与库存、底部两个操作按钮；整卡 hover 抬升阴影；网格每行 2/3/4 列随断点切换」。说清结构与断点，AI 一次成型。'
    ],
    analogy: '卡片像名片盒里的名片：每张信息自足（不用看别处）、整齐排列、随时抽出单独递出（独立操作）。',
    talk: {
      good: [
        '用户卡片网格：头像、昵称、角色标签、注册时间，hover 显示「禁用/详情」两个操作，移动端单列。'
      ],
      bad: [
        { say: '做几个卡片摆一排', why: '卡片内容与响应式列数未定义，AI 只能拍一个静态三列布局。' }
      ]
    },
    misconceptions: [
      '卡片只能整块点击？卡片常有「整卡可点」与「仅按钮可点」两种交互，须明确约定防止误触。'
    ],
    related: ['list-view', 'flex-grid', 'empty-state']
  },

  {
    id: 'table',
    en: 'Table',
    zh: '表格',
    cat: 'frontend',
    tags: ['UI 组件', '数据展示'],
    level: 'core',
    summary: '行列展示数据的主力组件：排序、筛选、分页、行操作是标配。',
    plain: [
      '表格是把结构化数据讲清楚的第一选择。沟通清单：列定义（字段、宽度、对齐）、排序（哪几列可排）、筛选、分页（前端还是后端分页！）、行操作（编辑/删除/更多）、行选择、空数据与加载态。',
      '高发误区：把一万条数据全量前端渲染（应后端分页）；行 hover 操作与行点击冲突；长内容截断还是换行要约定。给 AI 的句式：「订单表格：列 订单号/商品/金额/状态/时间，金额右对齐，状态列用彩色标签，支持按时间排序，后端分页每页 20，空数据显示提示」。'
    ],
    analogy: '表格像 Excel 排版：先定列头（表头），再谈怎么翻页、怎么找（筛选排序）、每行能干嘛（操作）。',
    talk: {
      good: [
        '数据表格：金额列右对齐并千分位，状态列渲染成彩色 Tag，可排序列显示箭头，行内操作用图标按钮。'
      ],
      bad: [
        { say: '做个数据表格', why: '列、排序、分页方式全是未知，AI 的默认表格与你的数据模型必然对不上。' }
      ]
    },
    misconceptions: [
      '表格里的分页一定在后端？数据量小（几百条）时前端分页更简单；关键在于提前说清数据量级。'
    ],
    related: ['pagination', 'checkbox', 'badge', 'tag-chip']
  },

  {
    id: 'list-view',
    en: 'List View',
    zh: '列表',
    cat: 'frontend',
    tags: ['UI 组件', '数据展示'],
    level: 'common',
    summary: '纵向堆叠的条目集合：头像 + 主副标题 + 右侧操作的经典结构。',
    plain: [
      '列表适合「每条信息量不大但数量多」的展示：会话、消息、成员、文件。经典条目结构：左侧图标/头像，中间主标题+副标题（可两行省略），右侧时间或操作。',
      '沟通要点：是否可点击整行、文本省略规则（单行/两行）、分隔线、加载更多方式（下拉刷新/滚动加载/加载更多按钮）、空列表与初始加载态。给 AI 的句式：「消息列表：头像+昵称+摘要两行省略，右侧时间；点击整行进入会话；下拉刷新+滚动到底自动加载下一页」。'
    ],
    analogy: '列表像手机通讯录：一行一人，头像名字排布整齐，点哪行打哪个人——顺序和分隔都清楚。',
    talk: {
      good: [
        '成员列表：左侧头像，中间姓名+职位，右侧「移除」图标按钮；hover 行高亮；空时显示空状态插画。'
      ],
      bad: [
        { say: '弄个列表出来', why: '条目结构、交互、加载方式全空白，AI 只能产出静态占位列表。' }
      ]
    },
    misconceptions: [
      '列表和表格可以互相替代？列表重「浏览单条详情」，表格重「多列对比筛选」，按数据维度选型。'
    ],
    related: ['card', 'avatar', 'pagination']
  },

  {
    id: 'badge',
    en: 'Badge',
    zh: '徽标',
    cat: 'frontend',
    tags: ['UI 组件', '数据展示'],
    level: 'core',
    summary: '附在图标/文本上的计数或红点：未读、通知、状态量的视觉提示。',
    plain: [
      '徽标是「提示有新内容」的微型元件：数字徽标（未读 99+）、圆点徽标（仅表示有）、状态徽标（线上/离线带色点）。关键参数：数量上限（99+ 而非 1000）、独立或包裹子元素（小方块挂图标角上）。',
      '与 Tag 的分工要分清：Badge 是「数量/状态点」，Tag 是「分类标签」。给 AI 的句式：「侧边栏消息图标右上角未读徽标：数量超过 99 显示 99+，无未读时隐藏；hover 标题显示完整数字」。'
    ],
    analogy: '徽标像 App 角标：红点告诉你「有新消息」，数字告诉你「具体几条」，超过两位数就显示省略（99+）。',
    talk: {
      good: [
        '消息 Tab 右上角未读徽标：0 时隐藏，1~99 显示数字，超过 99 显示 99+；点开会话后对应徽标清零。'
      ],
      bad: [
        { say: '加个小红点就行', why: '什么条件出现、数量上限、点击后如何清零都没定义，红点会成为永不消失的谜。' }
      ]
    },
    misconceptions: [
      '徽标越大越醒目越好？超过两个活跃徽标区域会互相打架，视觉层级反而崩坏。'
    ],
    related: ['tag-chip', 'notification', 'icon-button']
  },

  {
    id: 'tag-chip',
    en: 'Tag & Chip',
    zh: '标签 / Chip',
    cat: 'frontend',
    tags: ['UI 组件', '数据展示'],
    level: 'common',
    summary: '小尺寸类别标记：可着色表状态、可关闭、可点击筛选。',
    plain: [
      'Tag/Chip 用一句话标记对象的类别或状态：订单状态、文章分类、技能标签。与徽标的区别：Tag 是静态分类信息，Chip 更强调可交互（点击筛选、右上角关闭移除）。',
      '高频用法与细节：不同状态配不同语义色（成功绿/警告橙/危险红/信息蓝）；可关闭的 Tag 关闭后要回调父级更新；可点击筛选的 Chip 要体现选中态。嵌在输入框里的形态叫输入型 Chip（标签输入框）：回车固化、× 移除，收件人与筛选条件回显都是它。给 AI 的句式：「订单状态列渲染成 Tag：待支付橙、已支付蓝、已发货紫、已完成绿、已取消灰，可点击按状态筛选」。'
    ],
    analogy: '标签像超市货架的分类牌：告诉你这是什么类（状态）；点牌子就只看这一类（筛选），拆掉牌子（关闭）则货品不再属于该类。',
    talk: {
      good: [
        '多选筛选用 Chip：选中标签高亮并显示勾号，右上角小叉可单独移除，底部显示已选条件可一键清空。'
      ],
      bad: [
        { say: '给状态加个标签', why: '颜色语义与是否可交互未定，AI 生成清一色灰 Tag，状态一眼分不出来。' }
      ]
    },
    misconceptions: [
      '标签颜色随便配？状态色需全站统一语义（成功/警告/危险），换项目也要沿用约定。'
    ],
    related: ['badge', 'table', 'select-dropdown']
  },

  {
    id: 'avatar',
    en: 'Avatar',
    zh: '头像',
    cat: 'frontend',
    tags: ['UI 组件', '数据展示'],
    level: 'common',
    summary: '展示人/实体的图形：图片、首字、图标三级方案与统一尺寸。',
    plain: [
      '头像标准化地表达「这是谁」：图片头像、字母/汉字占位头像（未设置或加载失败时）、图标头像（品牌/机器人）。企业应用里要有统一的尺寸阶梯与在线状态点。',
      '细节坑：图片加载失败要优雅降级为首字头像而非破图；群头像（多人拼接 4 宫格）；隐私考虑。给 AI 描述：「成员列表头像：有头像显示图片，无头像显示姓名末两字，右侧带在线状态绿点，点击放大预览」。'
    ],
    analogy: '头像像门禁照片：认得出是谁（身份），没有照片就登记名字（首字占位），加个「在岗」灯（状态点）让同事知道你在不在。',
    talk: {
      good: [
        '用户头像组件：优先图片，加载失败或为空时按 name 生成首字头像并随机柔和底色，尺寸支持 sm/md/lg。'
      ],
      bad: [
        { say: '放个头像就行', why: '失败降级、尺寸体系、状态点都没说，AI 会做出一堆破图时碎裂的头像。' }
      ]
    },
    misconceptions: [
      '头像必须是图片？现代组件库普遍内置「图片→首字→图标」三级降级，这才是健壮做法。'
    ],
    related: ['card', 'list-view', 'badge']
  },

  {
    id: 'progress-bar',
    en: 'Progress',
    zh: '进度条',
    cat: 'frontend',
    tags: ['UI 组件', '反馈'],
    level: 'common',
    summary: '展示任务完成度：线性/环形，含百分比、状态色与不确定态。',
    plain: [
      '进度条传达「还要等多久」：上传下载、表单分步、任务处理。形态：线性（细条+百分比）、环形（仪表盘感）、步骤型。状态：进行中、成功（绿）、失败（红）、不确定（滚动动画，用于无法预估时长的等待）。',
      '沟通要点：进度来源（真实回调还是模拟百分比）、完成时的行为（跳转/提示）、取消能力。给 AI 的句式：「批量导入进度：环形进度 + 百分比文字，失败任务数单独显示，全部完成后 2 秒自动收起并提示结果」。'
    ],
    analogy: '进度条像地铁线路的到站提示：亮到第几站你心里有数；遇到「信号故障」（不确定态）就是那种来回滚动的加载动画。',
    talk: {
      good: [
        '上传进度用线性进度条：真实字节进度百分比，中途可取消，完成后变绿显示「已完成」并展示文件列表。'
      ],
      bad: [
        { say: '加个进度条', why: '线性还是环形、进度来源、完成行为未定义，AI 只能做不会动的假进度。' }
      ]
    },
    misconceptions: [
      '进度条必须真实反映进度？无真实进度的场景用不确定态动画，比假装 87% 更诚实。'
    ],
    related: ['file-upload', 'spinner', 'steps']
  },

  {
    id: 'star-rating',
    en: 'Rating',
    zh: '星级评分',
    cat: 'frontend',
    tags: ['UI 组件', '数据展示'],
    level: 'common',
    summary: '1~5 星打分控件：可只读展示或可交互打分，半星与 hover 预览是细节。',
    plain: [
      '星级评分把「感觉」量化成 1~5 分：商品评分展示（只读）、用户打分（可交互）、筛选（多少星以上）。细节：hover 实时预览、点击后锁定、可选半星、键盘可达（方向键调星）。',
      '展示与交互两态要分清：只读态只是数据展示（配分数文本「4.6」），可交互态才有 hover/click。给 AI 的句式：「图书详情只读评分 4.5 星 + 评价人数；我的打分用可交互星级，默认 0 星，hover 高亮预览，提交后锁定」。'
    ],
    analogy: '星级像餐厅点评：先看你打几分（展示），轮到你也可以自己比划（打分），中途还能反悔（hover 预览未提交）。',
    talk: {
      good: [
        '可交互星级：支持半星与键盘方向键调节，点击后高亮锁定并显示所选分数，未选择时文案提示「点击评分」。'
      ],
      bad: [
        { say: '弄个五星评分', why: '只读还是可交互、半星、默认值都没说，AI 大概率做一个不可交互的死星星。' }
      ]
    },
    misconceptions: [
      '星级只能整颗跳？半星表达 4.5 这类中间值是常见需求，实现上按 0.5 步长即可。'
    ],
    related: ['table', 'card', 'slider']
  },

  {
    id: 'timeline',
    en: 'Timeline',
    zh: '时间线',
    cat: 'frontend',
    tags: ['UI 组件', '数据展示'],
    level: 'advanced',
    summary: '按时间轴纵向排列的事件流：点、线、内容三段式，记录进展轨迹。',
    plain: [
      '时间线把「一件件事按先后发生顺序」讲清楚：订单物流轨迹、审批流转记录、操作日志。结构：时间点（圆点+状态色）、连接线、事件内容（标题+说明+时间）。',
      '细节：最新事件高亮、加载更多历史、长文本折叠。给 AI 的句式：「订单轨迹时间线：按时间倒序，最新一步高亮加粗，已过节点灰色，当前节点蓝色脉冲，未来节点虚线占位」。'
    ],
    analogy: '时间线像运动会的接力表：每一步谁跑的、什么时候交棒，一目了然；比赛结束还能回看全程轨迹。',
    talk: {
      good: [
        '审批记录时间线：审批人、动作（同意/驳回）、批注、时间四要素，驳回节点红色高亮，支持展开更多历史。'
      ],
      bad: [
        { say: '做个流程记录的展示', why: '时间线还是步骤条没说清，两者结构相似但语义不同，AI 可能做错形态。' }
      ]
    },
    misconceptions: [
      '时间线和步骤条一样？步骤条表达「未来的流程规划」，时间线表达「已发生的历史记录」。'
    ],
    related: ['steps', 'list-view', 'notification']
  },

  {
    id: 'tree-view',
    en: 'Tree',
    zh: '树形控件',
    cat: 'frontend',
    tags: ['UI 组件', '数据展示'],
    level: 'advanced',
    summary: '层级数据的展开/折叠展示：目录、组织架构、权限树的通用形态。',
    plain: [
      '树形控件展示父子层级：文件目录、部门架构、菜单权限。要素：展开/折叠箭头、节点图标、选中态（单选/多选/父子联动）、懒加载（展开时才拉子节点）。',
      '难点在数据：后端给的扁平列表（id/parentId）要转树、拖拽排序、跨层级的勾选联动规则（父选子全选还是独立）。给 AI 的句式：「部门树：从扁平列表构建，支持展开/收起、节点搜索定位、单选并回调选中部门；子级全部勾选时父级显示半选」。'
    ],
    analogy: '树像办公室楼层平面图：一层一层往下拆解房间（层级），点哪个楼层看哪个部门的工位（懒加载），找人也靠层级定位（搜索高亮）。',
    talk: {
      good: [
        '权限树：菜单节点多选，勾选子项自动联动父项半选/全选，提交时输出被勾选的所有叶子节点 id。'
      ],
      bad: [
        { say: '搞个树形菜单', why: '数据来源、联动规则、单选多选都没定，AI 生成的树接不上你的权限模型。' }
      ]
    },
    misconceptions: [
      '树的数据就是后端返回的嵌套结构？多数后端给扁平 id/parentId，前端要自行构建并防循环引用。'
    ],
    related: ['select-dropdown', 'accordion', 'breadcrumb']
  },

  {
    id: 'tabs',
    en: 'Tabs',
    zh: '标签页 Tab',
    cat: 'frontend',
    tags: ['UI 组件', '容器'],
    level: 'core',
    summary: '同一区域多面板切换：Tab 页是内容平铺展示的第一沟通词。',
    plain: [
      'Tab 页把互斥的内容面板收纳在一个标签条下：概览/明细/设置 各占一页。沟通要点：标签项（文案）、默认激活项、切换是否保留各自状态（切走再切回不重载）、是否可关闭（多文档编辑）。',
      '实现细节：面板懒加载（首开才渲染）、切换动画、超出宽度滚动或折叠。给 AI 的句式：「详情页三个 Tab：基础信息/附件/操作日志，默认第一个激活，切换时保持已加载内容不刷新，附件 Tab 打开时才拉取接口」。'
    ],
    analogy: 'Tab 像笔记本的分隔页：每页是独立主题，翻页不丢你之前写的内容（状态保留），但找东西要在页签上扫一眼。',
    talk: {
      good: [
        '订单详情用 Tab 组织：订单信息、支付记录、物流轨迹三个页签，默认第一个；切换不重新请求已加载数据。'
      ],
      bad: [
        { say: '做个标签页切换', why: '多少页、默认哪个、切走是否保留状态都没说，AI 的默认实现可能每次切换都清空重载。' }
      ]
    },
    misconceptions: [
      'Tab 页切换必然销毁重建？框架默认常重渲染，需显式 keep-alive 或缓存策略才能保留状态。'
    ],
    related: ['accordion', 'steps', 'breadcrumb']
  },

  {
    id: 'accordion',
    en: 'Accordion',
    zh: '折叠面板',
    cat: 'frontend',
    tags: ['UI 组件', '容器'],
    level: 'common',
    summary: '标题栏点击展开/收起内容区：FAQ、分组表单、层级精简的利器。',
    plain: [
      '折叠面板把「占地方」的内容压成一行标题，点击展开：FAQ 问答、筛选条件分组、设置项分组。要点：同时展开多个还是只能一个（手风琴模式）、默认展开哪个、展开动画与图标旋转。',
      '与 Tabs 的分工：内容是并列排布且希望同时可见一部分时用折叠；严格互斥时用 Tab。给 AI 的句式：「FAQ 列表用折叠面板：每次只展开一项（手风琴），其余自动收起，展开箭头旋转 180 度，默认展开第一项」。'
    ],
    analogy: '折叠面板像行李箱的夹层拉链：平时贴着不占地方（收起），要拿哪层的东西拉开哪层（展开），同时拉两层互相挤着也不方便（互斥模式）。',
    talk: {
      good: [
        '高级筛选用折叠面板：默认收起只显示「更多筛选」按钮，展开后多行条件分组，收起时保留已选条件。'
      ],
      bad: [
        { say: '做几个能展开的块', why: '互斥还是多开、默认态、内容结构都没说，AI 只能做无状态的展开动画。' }
      ]
    },
    misconceptions: [
      '折叠面板只能手风琴式（同时开一个）？「同时可开多个」也是合法模式，取决于内容是否互斥。'
    ],
    related: ['tabs', 'card', 'tree-view']
  },

  {
    id: 'modal',
    en: 'Modal / Dialog',
    zh: '弹窗',
    cat: 'frontend',
    tags: ['UI 组件', '覆盖层'],
    level: 'core',
    summary: '盖在页面上的模态层：遮罩、标题、内容、操作区，聚焦单个任务。',
    plain: [
      '弹窗（Modal/Dialog）把用户的注意力锁进一个浮层：确认信息、填写表单、查看大图。标准结构：遮罩层、居中面板（标题/内容/底部操作）、关闭方式（右上角 X、点遮罩、Esc 键——需约定是否允许）。',
      '交互细节直接决定体验：内容超高时面板内滚动；打开后焦点应落入面板（Tab 不逃逸到背景页面）；关闭后焦点归还触发按钮（无障碍关键）。给 AI 的句式：「新增成员弹窗：标题+表单+取消/确定按钮，确定校验通过才关闭，点遮罩与 Esc 不关闭（防误触），表单提交中按钮 loading」。'
    ],
    analogy: '弹窗像柜台的独立洽谈间：谈正事时门一关，窗外排队的人都听不见（遮罩锁定），谈完出门接着办别的（关闭回背景）。',
    talk: {
      good: [
        '确认弹窗：内容区说明删除后果，主按钮「删除」用危险红色，默认聚焦「取消」防误删，关闭后焦点回到原按钮。'
      ],
      bad: [
        { say: '弹个框出来', why: '弹窗内容、操作按钮、能否点遮罩关闭全未定义，AI 只能生成无业务逻辑的空壳。' }
      ]
    },
    misconceptions: [
      '弹窗就是大号提示？Modal 强调「阻断式任务」；轻量提示应该用 Toast 或 Popover，别动不动弹 Modal 打断操作流。'
    ],
    related: ['confirm-dialog', 'drawer', 'popover', 'toast']
  },

  {
    id: 'confirm-dialog',
    en: 'Confirm Dialog',
    zh: '确认框',
    cat: 'frontend',
    tags: ['UI 组件', '覆盖层'],
    level: 'core',
    summary: '危险或不可逆操作前的最后一道闸：说清后果、给逃生舱。',
    plain: [
      '确认框用于「按下就无法挽回」的动作：删除、停用、发布、转账。设计三要素：清楚的后果描述、明确的危险主按钮（红色）、默认焦点在安全侧（取消），可加「不再提示」或输入关键词确认（严重操作）。',
      '高频误用：给每个删除都弹确认是保守，但给「清空购物车」也弹就显得啰嗦——确认框该留给真正不可逆的操作。给 AI 的句式：「删除项目弹确认框：文案说明该项目与全部关联数据将被永久删除，主按钮红色「确认删除」，底部附「取消」，Esc 可关闭」。'
    ],
    analogy: '确认框像保险箱的第二次输密码：第一次只是开柜门（点击），第二次要你认真确认（确认框），防止手滑清空传家宝。',
    talk: {
      good: [
        '停用账号需二次确认：弹窗说明影响（无法登录、数据保留 30 天），需输入「停用」二字才能点确认，确认按钮红色。'
      ],
      bad: [
        { say: '删的时候弹个提示', why: '文案、危险色、焦点默认位都没定，AI 的确认框可能把默认焦点放在「确定」上，手滑即删。' }
      ]
    },
    misconceptions: [
      '确认框必须每次都有？操作可逆（如可恢复的回收站）就不该用确认框打断流程，反而拖慢效率。'
    ],
    related: ['modal', 'button', 'toast']
  },

  {
    id: 'drawer',
    en: 'Drawer',
    zh: '抽屉',
    cat: 'frontend',
    tags: ['UI 组件', '覆盖层'],
    level: 'core',
    summary: '从屏幕边缘滑出的侧滑面板：保留上下文，适合列表-详情联动。',
    plain: [
      '抽屉从左侧/右侧滑出，是「不想离开当前页面上下文」的扩展面板：查看详情、编辑表单、筛选设置。与弹窗的区别：抽屉保留背景页面可见（尤其适合列表+详情联动），弹窗更强调聚焦阻断。',
      '关键参数：滑出方向、宽度、遮罩行为、是否可拖动边缘。移动端抽屉常与侧边导航合流。给 AI 的句式：「成员详情抽屉：从右侧滑出宽度 360px，内容含资料+操作区，打开时背景列表禁滚动，Esc 关闭」。'
    ],
    analogy: '抽屉像办公室的侧柜：拉开抽屉看文件（详情），看的时候桌子上的图纸还在原地（保留上下文）；关抽屉继续干活。',
    talk: {
      good: [
        '列表行点击打开右侧抽屉展示详情：宽度 380px 响应式收窄，底部「编辑/关闭」操作，遮罩点击关闭并归还焦点。'
      ],
      bad: [
        { say: '做个侧滑的详情', why: '滑出方向、宽度、与弹窗的取舍都没说，AI 的默认抽屉可能与你的页面节奏不符。' }
      ]
    },
    misconceptions: [
      '抽屉和弹窗随便选？列表-详情联动、需对比上下文用抽屉；强阻断单任务用弹窗。'
    ],
    related: ['modal', 'popover', 'sidebar']
  },

  {
    id: 'popover',
    en: 'Popover',
    zh: '气泡卡片',
    cat: 'frontend',
    tags: ['UI 组件', '覆盖层'],
    level: 'common',
    summary: '点击元素后在其附近弹出的浮层：轻量操作与补充信息，含箭头与避让。',
    plain: [
      'Popover 点击目标后在其周围弹出的气泡：更多操作、预览、快捷编辑。要素：箭头指向触发元素、定位自动避让（贴边翻转到另一侧）、点击外部关闭、可嵌套小表单。',
      '与 Tooltip 的分工：Tooltip 悬停出、纯文本、不可交互；Popover 点击出、可承载操作、可交互。给 AI 的句式：「表头加个筛选 Popover：点击表头图标弹出，内含两个下拉与「确定」按钮，点击页面其他区域自动关闭」。'
    ],
    analogy: '气泡像便利店旁边的快捷窗口：正事还是进店办（详情页），但买个水（快捷操作）从窗口伸手就够，不用绕一大圈。',
    talk: {
      good: [
        '昵称旁的信息图标：点击弹出 Popover 展示用户简介与联系方式，点击外部任意处关闭，贴屏幕右侧时自动左移避让。'
      ],
      bad: [
        { say: '鼠标放上去弹个小框', why: '悬停还是点击、可否交互没分清楚，AI 可能做成不能点的 Tooltip。' }
      ]
    },
    misconceptions: [
      'Popover 和 Tooltip 是一回事？触发方式（点 vs 悬停）与可交互性（能 vs 不能）完全不同，用错体验崩坏。'
    ],
    related: ['tooltip', 'dropdown-menu', 'modal']
  },

  {
    id: 'tooltip',
    en: 'Tooltip',
    zh: '文字提示',
    cat: 'frontend',
    tags: ['UI 组件', '覆盖层'],
    level: 'common',
    summary: '悬停/聚焦时出现的简短解释文本：补语义、不打断、零交互。',
    plain: [
      'Tooltip 在用户悬停（或键盘聚焦）时弹出简短文字，解释图标含义、展示截断内容、提示约束。关键约束：只能承载纯文本与极短链接，不可交互。',
      '工程细节：出现延迟（防误触闪现）、位置自动避让、触发方式兼顾键盘（focus 也要显示，无障碍要求）、触屏设备无 hover 时的替代（点击显示）。给 AI 的句式：「表格里的问号图标：hover 与 focus 都显示 Tooltip 说明统计口径，出现延迟 200ms，贴边自动翻转方向」。'
    ],
    analogy: 'Tooltip 像货架上的价格小签：凑近才看得清（悬停触发），说明是什么货（释义），但你没法在签上签字（不可交互）。',
    talk: {
      good: [
        '截断的订单号显示完整值：hover 弹出 Tooltip 展示完整文本，同时支持键盘 Tab 聚焦时显示。'
      ],
      bad: [
        { say: '鼠标放上去显示说明', why: '触发时机与交互性未定，AI 可能做出会挡住按钮无法消失的弹层。' }
      ]
    },
    misconceptions: [
      '长文本也塞 Tooltip？超长说明应放 Popover 或详情区，Tooltip 只适合一句话。'
    ],
    related: ['popover', 'icon-button', 'modal']
  },

  {
    id: 'dropdown-menu',
    en: 'Dropdown Menu',
    zh: '下拉菜单',
    cat: 'frontend',
    tags: ['UI 组件', '覆盖层'],
    level: 'common',
    summary: '点按钮弹出的纵向操作清单：更多操作的标准归宿，含分组与危险项。',
    plain: [
      '下拉菜单收纳「次要不常用」的操作：「更多」按钮展开编辑/复制/删除/导出等。要素：菜单项（图标+文案）、分组与分隔线、禁用项、危险项（红色）、hover 高亮、点击外部关闭、键盘导航。',
      '移动端常改用底部操作单（Action Sheet）——同一语义不同形态。给 AI 的句式：「表格行尾「更多」按钮弹出下拉菜单：导出/复制链接（图标+文案）、删除置底并红色、禁用项灰色置灰、点击项后关闭并回调」。'
    ],
    analogy: '下拉菜单像工具箱的夹层：常用工具放明面（直接操作按钮），螺丝刀开瓶器这类次常用收进夹层（更多菜单），要用时拉开挑一件。',
    talk: {
      good: [
        '头像旁「更多」下拉：查看主页/设为管理员/移出团队，移出团队红色置于末尾并用分隔线隔开，键盘上下可导航。'
      ],
      bad: [
        { say: '搞个更多按钮', why: '菜单项内容与危险项位置都没说，AI 可能把「删除」放在首项，顺手误触。' }
      ]
    },
    misconceptions: [
      '菜单项越多越全越好？超过 7 项应分组或收敛到二级，长菜单反而增加选择成本。'
    ],
    related: ['button', 'select-dropdown', 'popover']
  },

  {
    id: 'carousel',
    en: 'Carousel',
    zh: '轮播',
    cat: 'frontend',
    tags: ['UI 组件', '容器'],
    level: 'common',
    summary: '多张内容循环切换的展示位：自动播放、指示器、前后箭头三件套。',
    plain: [
      '轮播（Carousel）在固定区域循环切换多张图/卡片：首页 banner、商品主图。配置：自动播放（间隔秒数与 hover 暂停）、指示器（小圆点）、前后箭头、循环/首尾停、触摸滑动（移动端）。',
      '性能与无障碍：图片懒加载、每张配 alt；自动播放的轮播对阅读障碍者要可暂停。给 AI 的句式：「首页 banner 轮播：3 张图自动 5 秒切换，hover 暂停，底部圆点可点跳转，左右箭头循环切换，移动端支持左右滑动」。'
    ],
    analogy: '轮播像商场门口的展示橱窗：隔几秒换一件主打商品（自动播放），旁边有按钮手动翻（箭头），底下小圆点告诉你现在摆到第几件（指示器）。',
    talk: {
      good: [
        '商品主图轮播：5 张图首尾循环，缩略图列表同步高亮，点击放大查看，加载用懒加载占位防跳动。'
      ],
      bad: [
        { say: '做个图片轮播', why: '自动播放、指示器、循环策略全未定，AI 的默认轮播可能永远停在第一张或闪瞎用户。' }
      ]
    },
    misconceptions: [
      '轮播一定自动播放？很多场景只做手动切换更克制；自动播放在首次展示前应尊重用户的减少动态偏好。'
    ],
    related: ['tabs', 'card', 'lazy-loading']
  },

  {
    id: 'marquee',
    en: 'Marquee',
    zh: '跑马灯',
    cat: 'frontend',
    tags: ['UI 组件', '动效'],
    level: 'common',
    summary: '内容匀速循环滚动的长条（不是滚动条，也不是轮播）：公告栏、弹幕、行情条。',
    plain: [
      '跑马灯（Marquee）指内容沿一个方向匀速滚动、首尾无缝衔接的长条：网站公告、直播间弹幕、股票行情条都是它。现代实现是一条「内容 ×2」的轨道做 CSS 平移动画，不再用已淘汰的 <marquee> 标签。',
      '命名澄清三家店：轮播（Carousel）一屏一张、手动或定时切换；跑马灯匀速不停滑、不打断不聚焦；滚动条（Scrollbar）是屏幕边缘的拖动条，和它没关系——有人说「滚动条动画」，八成想说的就是跑马灯。',
      '使用纪律：只放扫一眼就读完的短信息；重要公告别用它（用户来不及读）；配 hover 暂停与 prefers-reduced-motion 降级。给 AI 的句式：「公告跑马灯：无缝循环匀速 20s 一轮，hover 暂停，两端渐隐遮罩」。'
    ],
    analogy: '跑马灯像机场航站楼的滚动航班屏：匀速滑过、循环往复，扫一眼就够；重要登机口变更靠广播（通知），不靠它。',
    talk: {
      good: [
        '顶部公告跑马灯：无缝循环，hover 暂停，用户开启减少动效时改为静态展示第一条。'
      ],
      bad: [
        { say: '做个滚动条动画', why: '大概率想说的是跑马灯；照字面做成滚动条样式就南辕北辙了。' }
      ]
    },
    misconceptions: [
      '跑马灯就是轮播？轮播整屏切换、有指示点；跑马灯匀速滚动、画面永不切换，交互预期完全不同。'
    ],
    related: ['carousel', 'banner']
  },

  {
    id: 'banner',
    en: 'Banner',
    zh: '横幅',
    cat: 'frontend',
    tags: ['UI 组件', '容器'],
    level: 'common',
    summary: '页面顶部的强调条：活动通知、新功能引导、紧急告警的一站式位置。',
    plain: [
      'Banner 是页面顶部的横向强调条：营销活动、新功能宣传、系统公告。要点：文案+可选行动按钮（去查看）、可关闭（通常是临时通知才允许关）、紧急程度配色（信息蓝/警告橙/危险红）。',
      '与 Alert（页面内提示条）的分工：Banner 面向全页的运营/系统级通知，Alert 面向具体操作区域的即时反馈。给 AI 的句式：「页面顶部系统公告 Banner：蓝底白字，文案+「查看详情」链接，右上角可关闭，关闭后当天不再显示（localStorage 记录）」。'
    ],
    analogy: '横幅像店门口的电子屏：正在搞什么活动一眼可见（运营通知），关掉它（可关闭）下次来还亮（记住偏好）。',
    talk: {
      good: [
        '新版本升级 Banner：顶部通栏渐变底，标题+说明+「立即更新」按钮，用户关闭后 7 天内不再弹出。'
      ],
      bad: [
        { say: '顶部加个提示条', why: '永久还是可关、什么文案、哪个层级都没说，AI 可能做不出能关闭的固定条。' }
      ]
    },
    misconceptions: [
      'Banner 就是 Alert？Banner 偏页面级运营通知且常可关闭；Alert 偏操作区即时反馈，语义层级不同。'
    ],
    related: ['alert-banner', 'notification', 'toast']
  },

  {
    id: 'toast',
    en: 'Toast',
    zh: '轻提示 Toast',
    aliases: ['轻提示', 'Snackbar'],
    cat: 'frontend',
    tags: ['UI 组件', '反馈'],
    level: 'core',
    summary: '底部或顶部的短暂消息条：轻量提醒、自动消失、不打断操作。',
    plain: [
      'Toast 是「不打断手头操作」的轻反馈：保存成功、已复制、网络错误这类几秒钟的小消息，自动浮现又自动消失。关键参数：位置（顶部/底部）、时长、是否可手动关闭、是否防误点穿透（Snackbar 常带操作按钮）。',
      '与 Modal/Notification 的分工：Toast 最轻，适合单条即时反馈；多个重要异步通知用 Notification；需要用户决策的事才上 Modal。给 AI 的句式：「保存成功后顶部弹出 Toast 提示 2 秒自动消失；失败时底部弹出红色 Toast 并带重试按钮」。'
    ],
    analogy: 'Toast 像车站广播的到站提示：音量刚好能听见（不打扰）、说完就安静（自动消失）；真需要人签字确认的事才会当面叫停你。',
    talk: {
      good: [
        '复制成功后右下角弹出 Toast「已复制」1.5 秒自动消失，连续点击时替换上一条不叠加。'
      ],
      bad: [
        { say: '弹个小提示就行', why: '位置、时长、能否关闭、带不带操作都没说，AI 的默认 Toast 可能与你的页面风格冲突。' }
      ]
    },
    misconceptions: [
      'Toast 可以承载重要错误？重要错误需要可追溯（通知中心）或可操作（重试按钮），纯 Toast 一闪而过等于没提醒。'
    ],
    related: ['notification', 'alert-banner', 'spinner']
  },

  {
    id: 'notification',
    en: 'Notification',
    zh: '通知提醒框',
    cat: 'frontend',
    tags: ['UI 组件', '反馈'],
    level: 'common',
    summary: '角落浮现、可停留可关闭的消息卡片：多条堆叠，面向重要异步事件。',
    plain: [
      'Notification 是屏幕角落（右上/右下）弹出的消息卡片，适合「多条并存、需要稍作停留」的事件：新版本更新、导入完成、审批提醒。特性：多条堆叠、可带标题/正文/操作按钮、手动关闭或超时关闭、可折叠成图标。',
      '与 Toast 的取舍：单条轻量瞬间 → Toast；多条且需要用户稍后处理 → Notification。给 AI 的句式：「导出完成后右上角弹通知：标题+成功/失败状态+「下载文件」按钮，5 秒自动消失，多条时垂直堆叠最多 4 条」。'
    ],
    analogy: '通知像门卫送来的信件堆：一封封送上门（堆叠排列），有的要立即拆（带操作按钮），看完要么收起来（关闭）要么稍后处理（停留）。',
    talk: {
      good: [
        '批量任务结束通知：右上角堆叠，标题含任务名与状态色，正文显示成功/失败数，失败时带「查看详情」跳转。'
      ],
      bad: [
        { say: '弹个通知出来', why: '位置、堆叠上限、停留时长、可操作性全未定义，AI 只能做个无状态小卡片。' }
      ]
    },
    misconceptions: [
      '通知越多越及时？超过 4 条同时堆叠会视觉爆炸，应聚合（「你有 5 条未读」）而非逐条轰炸。'
    ],
    related: ['toast', 'alert-banner', 'badge']
  },

  {
    id: 'alert-banner',
    en: 'Alert',
    zh: '提示条 Alert',
    cat: 'frontend',
    tags: ['UI 组件', '反馈'],
    level: 'common',
    summary: '页面内的状态条：成功/信息/警告/危险四色，可带图标与操作。',
    plain: [
      'Alert 是在操作区域就地出现的一行提示：表单校验汇总、接口错误、信息说明。四色语义要全站统一：成功绿/信息蓝/警告橙/危险红，可配图标强化，可选关闭按钮（用于可消除的提示）。',
      '与 Banner、Toast 的分工：Alert 是「页面内、面向当前操作区」的静态反馈，不自动消失；Banner 是页面级运营条；Toast 是浮动瞬间消息。给 AI 的句式：「表单提交失败后在表单上方显示危险 Alert：错误信息列表，红色边框白底，左侧叹号图标，不自动关闭」。'
    ],
    analogy: 'Alert 像产品上的说明贴纸：贴在问题发生的那块位置（操作区就地提示）、说明这是什么情况（四色语义）、撕掉它就没了（可关闭）。',
    talk: {
      good: [
        '登录失败时在表单上方显示红色 Alert，列出具体错误；成功则无 Alert，改用 Toast 轻提示。'
      ],
      bad: [
        { say: '报错了显示个红框', why: '四色语义、图标、能否关闭都没约定，AI 可能把所有状态都用同一种样式。' }
      ]
    },
    misconceptions: [
      'Alert 必须自动消失？页面内静态提示默认不自动消失（要用户看到）；自动消失的是 Toast。'
    ],
    related: ['toast', 'banner', 'notification', 'error-state']
  },

  {
    id: 'spinner',
    en: 'Spinner',
    zh: '加载动画',
    aliases: ['加载中', '转圈'],
    cat: 'frontend',
    tags: ['UI 组件', '反馈'],
    level: 'core',
    summary: '表示「在加载」的旋转图标：局部按钮用、整页遮罩用，别让用户空等。',
    plain: [
      '加载动画回答用户心里的「还在干活吗」：按钮内小圈、区块骨架、整页居中圈+文案。要点：出现时机（请求发出即显示）、尺寸与位置（局部 vs 全局）、配文案（「加载中…」还是「正在同步数据」）。',
      '工程习惯：请求完成后无论成功失败都要隐藏；请求很快（<300ms）时不建议闪一下（闪一下反而更晃眼，可延迟出现）。给 AI 的句式：「提交按钮点击后内容变 loading 转圈并禁用，接口返回后恢复；全页首屏用居中 Spinner + 加载文案」。'
    ],
    analogy: '加载动画像店门口的「营业中」灯牌：亮着就是还有戏（在干活），灯灭了要么开门了要么倒闭了——总得给个明确信号，不能黑灯瞎火。',
    talk: {
      good: [
        '列表请求期间显示列表区域骨架或局部 Spinner，接口 300ms 内完成则延迟显示避免闪烁。'
      ],
      bad: [
        { say: '加个转圈效果', why: '局部还是全局、何时出现何时消失、配不配文案都没说，AI 可能做出永远转不完的圈。' }
      ]
    },
    misconceptions: [
      '加载动画能替代空状态？加载结束要么有数据要么是空状态，三态（加载/有数据/空）都要有，只转圈不清算等于让用户猜。'
    ],
    related: ['skeleton-screen', 'empty-state', 'progress-bar']
  },

  {
    id: 'skeleton-screen',
    en: 'Skeleton Screen',
    zh: '骨架屏',
    aliases: ['骨架屏', '占位加载'],
    cat: 'frontend',
    tags: ['UI 组件', '反馈'],
    level: 'common',
    summary: '用灰色占位块预演页面结构：加载完成前先告诉用户「这里有内容」。',
    plain: [
      '骨架屏在数据到达前渲染一组与真实结构同形的灰色块+流光动画：标题条、图片块、按钮位置全部占位。它优于居中 Spinner 的地方是「不跳版」——加载完成后结构原地替换，没有整体跳动。',
      '沟通要点：骨架形态要与真实布局一致（列数、比例）、加载完成后无缝过渡、移动端注意占位块不触发滚动跳动。给 AI 的句式：「详情页首屏加载用骨架屏：顶部图片块 16:9、标题两行、下方四个列表条，加载完成后淡入替换真实内容」。'
    ],
    analogy: '骨架屏像餐厅「今日备菜」展示台：还没上桌先摆好盘子位置（占位块），你知道马上会有菜，也不会因为上菜而重新摆桌（不跳版）。',
    talk: {
      good: [
        '列表页初始加载用骨架屏：每行头像圆块+两行文本条，共 6 行，数据到达后 fade 替换。'
      ],
      bad: [
        { say: '加载的时候显示个圈就行', why: '圈子无法预演布局，内容到达后页面跳变明显；骨架屏按真实结构占位才平滑。' }
      ]
    },
    misconceptions: [
      '骨架屏只是花哨的加载动画？它解决「布局跳动（CLS）」这一性能指标，不只是观感问题。'
    ],
    related: ['spinner', 'empty-state', 'lazy-loading']
  },

  {
    id: 'empty-state',
    en: 'Empty State',
    zh: '空状态',
    cat: 'frontend',
    tags: ['UI 组件', '反馈'],
    level: 'common',
    summary: '没有数据时不能白屏：插画 + 说明 + 行动按钮引导下一步。',
    plain: [
      '空状态是「没有数据/没有结果」时的正式页面：空列表、搜索无结果、新用户首页。及格线：插画或图标、一句人话说明（「还没有订单」）、可选的行动按钮（「去逛逛」「新建项目」）。',
      '它是产品设计的良心所在——空状态决定了用户第一次点进来是流失还是转化。给 AI 的句式：「任务列表空状态：居中插画+文案「暂无任务，点击下方按钮创建第一个」+ 主按钮「创建任务」；搜索无结果显示「没有找到相关任务」并给清空筛选按钮」。'
    ],
    analogy: '空状态像停电的超市：货架空空不说点什么，顾客只会转身走人；挂个「即将上新，敬请期待」的牌子（说明+引导），至少留得住下一次光顾。',
    talk: {
      good: [
        '消息中心空状态：居中邮件插画 + 「暂无新消息」 + 副文案「有新动态时会第一时间通知你」。'
      ],
      bad: [
        { say: '没数据就显示空白呗', why: '纯白屏让用户误以为页面坏了；空状态是正式的引导位，必须设计。' }
      ]
    },
    misconceptions: [
      '空状态只在「没数据」时出现？筛选后无结果、权限不足、搜索无命中都是空状态的不同变体，各自配不同的说明文案。'
    ],
    related: ['spinner', 'skeleton-screen', 'result-page']
  },

  {
    id: 'result-page',
    en: 'Result Page',
    zh: '结果页',
    cat: 'frontend',
    tags: ['页面类型', '反馈'],
    level: 'common',
    summary: '操作结束后的独立页面：成功/失败/信息三态，配主次行动按钮。',
    plain: [
      '结果页是表单或流程完成后的独立落点：注册成功、支付失败、订单已提交。标准结构：大图标（成功对勾/失败叹号）+ 一句话结果 + 详情说明 + 主次按钮（返回/重试/去查看）。',
      '与 Alert/Toast 的分工：流程终点、需要停留让用户读信息的场景用结果页；轻量即时反馈用 Toast。给 AI 的句式：「支付成功页：绿色大对勾、标题「支付成功」、金额与订单号、主按钮「查看订单」、次按钮「返回首页」；支付失败页：红色叹号、失败原因、重试与更换支付方式两个按钮」。'
    ],
    analogy: '结果页像医院看完病的诊疗单：明确的结论（痊愈/需复查）、一句医嘱（说明）、下一步安排（复诊时间/注意事项）——让人心里有数地走出门。',
    talk: {
      good: [
        '导入完成结果页：成功总数与失败明细入口，失败时可「下载失败清单」重试，成功时主按钮「查看结果」。'
      ],
      bad: [
        { say: '提交完弹个提示就行', why: '流程终点需要明确落点与后续动作；一闪而过的提示让人不知道接下来去哪。' }
      ]
    },
    misconceptions: [
      '结果页只存在于表单提交后？支付回调、导出完成、邀请生效等一切「有终点的流程」都适合独立结果页。'
    ],
    related: ['empty-state', 'confirm-dialog', 'toast']
  },

  {
    id: 'navbar',
    en: 'Navbar',
    zh: '顶部导航栏',
    cat: 'frontend',
    tags: ['UI 组件', '导航'],
    level: 'core',
    summary: '页面顶部通栏：品牌、主导航、操作区三段落，全局可见。',
    plain: [
      'Navbar 是网站的「门头」：左侧品牌 Logo、中间/右侧主导航入口、最右侧用户与操作区。沟通要点：是否吸顶（滚动保持可见）、导航项与当前高亮、折叠逻辑（窄屏收进汉堡菜单）、登录态下的用户菜单。',
      '给 AI 的句式：「顶部导航：左侧 Logo 点击回首页，中间四个一级菜单（首页/产品/文档/社区）当前项高亮，右侧搜索框与登录按钮；宽度 1200 内居中，窄屏 768 以下收起为汉堡抽屉，滚动时吸顶并加阴影」。'
    ],
    analogy: '顶部导航像大楼大厅的楼层指引牌：一进门就知道楼里有什么（导航项）、你在哪层（当前高亮）、怎么走（跳转入口）。',
    talk: {
      good: [
        '后台 Navbar：面包屑左置，右侧通知铃铛（带未读徽标）、帮助中心、用户头像下拉（个人中心/退出）。'
      ],
      bad: [
        { say: '上面放个导航栏', why: '有哪些项、吸顶与否、窄屏怎么收都没说，AI 的默认导航在手机上必然失配。' }
      ]
    },
    misconceptions: [
      '导航项越多越全越好？顶部空间有限，超过 6 项建议收敛进「更多」或移入侧边栏，避免挤爆。'
    ],
    related: ['sidebar', 'footer', 'breadcrumb', 'dropdown-menu']
  },

  {
    id: 'sidebar',
    en: 'Sidebar',
    zh: '侧边导航',
    cat: 'frontend',
    tags: ['UI 组件', '导航'],
    level: 'core',
    summary: '左侧竖向导航：放得下更多入口，后台系统的默认形态，可折叠。',
    plain: [
      '后台系统的导航主阵地：左侧纵向菜单承载一二级入口、图标+文字、分组标题、可折叠为窄栏（只留图标）。要点：层级折叠展开、当前项高亮（含子级时的父级联动）、折叠状态持久化。',
      '移动端侧边栏常转为抽屉（Drawer 滑出）。给 AI 的句式：「侧边导航：分组标题+菜单项，选中项主题色高亮，一级可展开收起二级，点击空白处收起；折叠按钮切换窄栏（只显图标）并记住偏好；窄屏下改为汉堡唤出的抽屉」。'
    ],
    analogy: '侧边导航像办公楼层的部门索引墙：竖向列出所有部门（菜单项），亮着灯的是你在的那间（当前高亮），把墙合上（折叠）就只看得到部门编号。',
    talk: {
      good: [
        '管理后台侧边栏：四个分组 工作台/业务/设置/系统，多级菜单点击展开，当前路由自动高亮并展开对应父级。'
      ],
      bad: [
        { say: '左边加个菜单', why: '分组、层级、高亮与折叠策略全未定义，AI 的侧栏在导航一多时必然失控。' }
      ]
    },
    misconceptions: [
      '侧边栏和顶部栏是竞争关系？两者分工互补：顶部放全局入口，侧边放当前模块的深度导航，可共存。'
    ],
    related: ['navbar', 'breadcrumb', 'drawer', 'routing']
  },

  {
    id: 'footer',
    en: 'Footer',
    zh: '页脚',
    cat: 'frontend',
    tags: ['UI 组件', '导航'],
    level: 'common',
    summary: '页面底部信息区：版权、备案、链接与快捷入口，容易被忽略但要说清。',
    plain: [
      'Footer 是页面底部的信息收口：版权与备案信息、产品/公司链接组、联系方式、备案号（国内站点合规必需）。沟通要点：链接分组（几列）、是否吸底（内容不足一屏时贴底）、社交图标。',
      '给 AI 的句式：「页脚三列：产品（功能/价格/更新日志）、资源（文档/社区/GitHub）、公司（关于/联系/隐私政策），底部一行版权 © 2025 与 ICP 备案号；内容不足一屏时页脚仍贴到视口底部」。'
    ],
    analogy: '页脚像报纸的版尾：刊号、编辑部地址、订阅方式都集中在这里——不是重点内容，但合规和联系信息一个都不能少。',
    talk: {
      good: [
        '网站 Footer：左版权信息，中快捷链接三列，右微信公众号二维码；窄屏下三列折叠为手风琴。'
      ],
      bad: [
        { say: '底部放点信息', why: '哪些链接、备案要不要、窄屏怎么排都没说，AI 的默认页脚可能缺合规信息。' }
      ]
    },
    misconceptions: [
      '页脚不重要可以随便？备案号与隐私政策往往是合规底线，且用户找联系方式的终点就在页脚。'
    ],
    related: ['navbar']
  },

  {
    id: 'breadcrumb',
    en: 'Breadcrumb',
    zh: '面包屑',
    cat: 'frontend',
    tags: ['UI 组件', '导航'],
    level: 'common',
    summary: '显示当前位置的层级路径：首页 / 分类 / 当前页，可逐级回跳。',
    plain: [
      '面包屑回答「我在哪、怎么回去」：首页 / 商品分类 / 详情页，每级可点击回跳，当前级不可点击（纯文本）。适合层级深的后台与电商，扁平页面（单层）不需要它。',
      '细节：分隔符（/ 或 ›）、过长路径省略（折叠中间层级）、与标题联动（当前页标题即最后一级）。给 AI 的句式：「详情页面包屑：首页/商品分类/商品名，分类与首页可点，商品名纯文本；路由变化时同步更新，移动端可省略中间层级只留首尾」。'
    ],
    analogy: '面包屑像森林里撒的面包渣：沿路记下「从入口怎么走来的」，迷路（层级深）时顺着撒回去，不用跳回入口重走。',
    talk: {
      good: [
        '后台面包屑与路由联动：首页/项目名/成员管理，自动生成最后一级为当前页标题，可点层级高亮 hover。'
      ],
      bad: [
        { say: '加个当前位置的路径', why: '层级来源（手写还是路由生成）、分隔符、当前级是否可点都没说，AI 会做出误导的静态路径。' }
      ]
    },
    misconceptions: [
      '面包屑必须逐级可点？当前级与不可达的祖先通常是纯文本，只有真正可跳转的层级才做链接，否则是欺骗。'
    ],
    related: ['navbar', 'routing', 'tree-view']
  },

  {
    id: 'pagination',
    en: 'Pagination',
    zh: '分页',
    cat: 'frontend',
    tags: ['UI 组件', '数据展示'],
    level: 'core',
    summary: '把大数据切成多页：页码、上一页/下一页、总条数与跳页是标配。',
    plain: [
      '分页解决「一次展示不完」：后端分页（推荐大数据量）传 page/size，前端分页（小数据量）本地切片。组件要素：页码、上一页/下一页、总条数与「共 N 条」、可跳转（跳第几页/每页条数选择）。',
      '细节：边界处理（第一页禁用上一页、最后一页禁用下一页）、页码省略（1...5 6 7...20）、翻页后回到顶部与查询参数同步（URL 携带 page 便于分享）。给 AI 的句式：「订单表格底部后端分页：每页 20 条可切换 20/50/100，显示总条数，页码超 7 个时用省略号收缩，切页后滚动回顶部」。'
    ],
    analogy: '分页像图书目录：书再厚也是按页排好（页码），你知道在第几页（当前高亮），也能直接翻到第 200 页（跳页）。',
    talk: {
      good: [
        '列表分页与 URL 参数同步：page 写入 query，刷新后仍停留在当前页，切页后重置筛选条件时回到第一页。'
      ],
      bad: [
        { say: '下面放个分页器', why: '前端还是后端分页、每页条数、跳页要不要全未定，AI 的实现大概率与你的接口协议不匹配。' }
      ]
    },
    misconceptions: [
      '无限滚动可以取代分页？无限滚动适合浏览型内容但「到底了找不到跳转点」；后台数据管理仍以分页为主流。'
    ],
    related: ['table', 'list-view', 'routing']
  },

  {
    id: 'steps',
    en: 'Steps',
    zh: '步骤条',
    cat: 'frontend',
    tags: ['UI 组件', '导航'],
    level: 'common',
    summary: '横向展示流程进度：当前步骤高亮、已完成打勾、后续置灰待执行。',
    plain: [
      '步骤条把「多步流程」可视化：填写资料 → 确认信息 → 完成。形态：横向数字圆点+连线，竖向变体用于长表单。状态三态：已完成（对勾+主题色）、进行中（高亮）、待执行（灰）。',
      '与时间线的区别要讲清：步骤条是「未来流程规划」的进度，时间线是「已发生历史」的记录。给 AI 的句式：「注册流程步骤条：①账号 ②验证 ③完成，当前步骤高亮并显示序号，已完成步骤显示对勾且可点击回退，底部显示当前步骤说明文案」。'
    ],
    analogy: '步骤条像机场安检通关图：你一眼看到排到第几个环节（当前步骤高亮）、走过哪些（打勾）、后面还有几关（置灰待办）。',
    talk: {
      good: [
        '创建项目向导分三步：步骤条展示进度，切换时保留已填内容，最后一步提交后全部变对勾。'
      ],
      bad: [
        { say: '做个步骤提示', why: '步骤条还是时间线没说清，语义不同做出来必错；步骤是规划，时间是记录。' }
      ]
    },
    misconceptions: [
      '已完成步骤必须可回退编辑？取决于业务；不可逆流程（如提交后）回退反而危险，明确「已完成步骤只读」。'
    ],
    related: ['timeline', 'progress-bar']
  },

  {
    id: 'back-to-top',
    en: 'Back To Top',
    zh: '返回顶部',
    cat: 'frontend',
    tags: ['UI 组件', '导航'],
    level: 'common',
    summary: '右下角浮动按钮：滚动超过一定距离出现，一键回顶。',
    plain: [
      '长页面滚到底后想回顶部：右下角悬浮按钮，滚动超过视口高度（如 400px）时淡入，点击平滑回顶。要点：出现阈值、平滑滚动、是否随锚点/底部操作冲突（页面已有底部操作条时上移避让）。',
      '给 AI 的句式：「右侧底部返回顶部按钮：滚动超过 500px 出现，点击平滑滚回顶部，滚动时按钮淡入淡出过渡 200ms；页面存在底部操作条时按钮位置上移避开」。'
    ],
    analogy: '返回顶部像长途电梯里的楼层按钮：站得越高越想一键回一楼（滚动越深越想回顶），按钮长存在底部角落随时可点。',
    talk: {
      good: [
        '帮助中心长文档页：右下角返回顶部按钮，滚动超 400px 出现，平滑滚动并支持 iOS Safari 惯性滚动兼容。'
      ],
      bad: [
        { say: '搞个返回顶部的按钮', why: '出现阈值、平滑与否、与其他悬浮层的位置冲突都没说，AI 可能做出常驻挡内容的按钮。' }
      ]
    },
    misconceptions: [
      '返回顶部按钮所有页面都要？只有内容确实很长的页面才需要，短页面常驻按钮是视觉噪音。'
    ],
    related: ['navbar']
  },

  {
    id: 'placeholder-text',
    en: 'Placeholder',
    zh: '占位文案',
    cat: 'frontend',
    tags: ['视觉样式', '表单'],
    level: 'common',
    summary: '输入框灰字示例文案：告诉用户该填什么格式，不是字段说明。',
    plain: [
      '占位符是输入框里的灰色示例文字：显示「请输入手机号」「格式：123-4567-8910」，输入后消失。原则：给示例而非解释——「如 张三」「https://…」比「请输入姓名」更有用。',
      '常见误用：用占位符替代永远可见的字段标签（label），失焦空值时用户就不知道这里填什么了；占位文字过长被截断；用于必须说明的规则时占位不够，需配下方帮助文本。给 AI 的句式：「日期输入框占位「2025-06-01」并配下方小字说明格式，输入后隐藏占位」。'
    ],
    analogy: '占位文案像票据上的虚线示例：写着「填入姓名」的灰色小字（示例而非标题），你开始填它就消失（输入即覆盖）。',
    talk: {
      good: [
        '邀请码输入框：占位「8 位邀请码，如 ABC12345」，下方另配错误提示文案，勿用占位承载校验说明。'
      ],
      bad: [
        { say: '输入框里放点提示字', why: '占位是示例不是规则说明；需要长期可见的规则应配 label 或帮助文本，别全塞占位。' }
      ]
    },
    misconceptions: [
      '占位符能代替 label？不能——失焦或输入后占位消失，可访问性与可用性都要求 label 独立存在。'
    ],
    related: ['text-input', 'select-dropdown']
  },

  {
    id: 'divider',
    en: 'Divider',
    zh: '分割线',
    cat: 'frontend',
    tags: ['视觉样式'],
    level: 'common',
    summary: '水平/垂直细分区域的分隔线：可带标题文字，别用 border 硬凑。',
    plain: [
      '分割线把内容按逻辑分区：设置项之间的细分、列表分组、侧边栏标题分割。形态：水平线、垂直线、带文字（标题在线上居中或左侧）。',
      '与间距的取舍：简单的视觉分离优先用间距（留白），语义分界才用分割线——线用多了画面会碎。给 AI 的句式：「设置页用带标题的水平分割线：每段标题（通用/通知/隐私）置于线左，线颜色用弱化色，段间再加 24px 间距」。'
    ],
    analogy: '分割线像文档里的小节线：正文留白够用就不用画线，需要强调「这是一节」才画条线再配个小标题。',
    talk: {
      good: [
        '评论区每条留言之间用 1px 浅色分割线，删除按钮 hover 才出现，线宽与全站 line token 一致。'
      ],
      bad: [
        { say: '感觉有点乱加几条线吧', why: '无目的加线会制造视觉噪音；先判断是信息分组问题还是间距问题，再决定用线还是留白。' }
      ]
    },
    misconceptions: [
      '分割线必须完整贯穿？「虚线」「短实线」「带字分割」都是合法形态，按内容层级选即可。'
    ],
    related: ['card', 'css-cascade']
  },

  {
    id: 'border-radius',
    en: 'Border Radius',
    zh: '圆角',
    cat: 'frontend',
    tags: ['视觉样式'],
    level: 'common',
    summary: '元素的圆角半径；全局应遵循统一刻度（radius token），不逐处乱写。',
    plain: [
      '圆角决定视觉气质：小圆角（4-6px）硬朗偏工具感，大圆角（12px+）圆润偏亲和。工程关键是「刻度统一」：定义 sm/md/lg 几档 radius token，组件按档取值，而不是每处手写不同数值——这正是「AI 一眼假」的常见来源。',
      '特例要认识：胶囊（胶囊按钮、Tag、徽标）用 999px 全圆角；头像用 50%；卡片内子元素圆角要随父级收口（内圆角=外圆角-内边距）。给 AI 的句式：「卡片圆角 12px 统一用 --radius-md，内部按钮胶囊形 999px，输入框 8px 用 --radius-sm」。'
    ],
    analogy: '圆角像家具的倒角工艺：全屋统一一个倒角半径才显得成套（设计系统），每件家具各倒各的角（随手写数值）就拼不出统一感。',
    talk: {
      good: [
        '统一使用设计令牌：按钮全圆角、卡片 12px、输入框 8px、标签 999px，不要在各组件里手写不同圆角值。'
      ],
      bad: [
        { say: '圆角弄得好看点', why: '无令牌约束的圆角必然各处不一致；给出档位（sm/md/lg）AI 才能按系统统一产出。' }
      ]
    },
    misconceptions: [
      '圆角越大越现代？大圆角是特定审美，后台工具类界面过度圆角反而损失信息密度与专业感。'
    ],
    related: ['css-box-model']
  },

  {
    id: 'shadow-elevation',
    en: 'Shadow / Elevation',
    zh: '阴影与层级',
    aliases: ['box-shadow', '投影'],
    cat: 'frontend',
    tags: ['视觉样式'],
    level: 'common',
    summary: '用阴影表达元素在 Z 轴的高度：悬浮、弹层、吸顶各有档位。',
    plain: [
      '阴影（box-shadow）不只是装饰，它表达「层级」：卡片静态有 1 档微影、hover 抬升 2 档、弹窗/下拉用 3 档大影。一致的分层阴影让用户一眼看出什么可点、什么浮在表层。',
      '规范建议：定义 elevation-1/2/3 三档 shadow token，配合 transition 让 hover 抬升有平滑过渡；黑暗模式下阴影要加深加大（纯黑背景上弱影看不见）。给 AI 的句式：「卡片 hover 时阴影从 1 档升到 2 档并上移 2px，200ms 过渡；弹窗用 3 档带大模糊与半透明黑」。'
    ],
    analogy: '阴影像舞台上的聚光：主角（浮层/交互元素）亮一点大一点，配角（静态卡片）含蓄一点——光的强弱让人知道谁在台前。',
    talk: {
      good: [
        '按 elevation token 管理阴影：下拉与弹窗用最高档，卡片 hover 用中间档并配 200ms 过渡，避免直接堆多层阴影。'
      ],
      bad: [
        { say: '加个阴影显得立体', why: '无档位概念的随机阴影让层级混乱；告诉 AI 用哪档、什么场景，阴影才有语义。' }
      ]
    },
    misconceptions: [
      '阴影越多越立体？多阴影叠加出的是脏影；层级靠档位一致表达，克制才有高级感。'
    ],
    related: ['border-radius', 'interactive-states', 'modal']
  },

  {
    id: 'primary-color',
    en: 'Primary Color',
    zh: '主色',
    cat: 'frontend',
    tags: ['视觉样式'],
    level: 'common',
    summary: '品牌主题色：按钮、链接、选中态统一用它，色值全站走 token。',
    plain: [
      '主色是产品的品牌指纹：主按钮、激活链接、选中态、加载动画都用它。工程要求：主色定义为主题变量（如 --accent），通过 CSS 变量或主题配置统一引用，而不是散落硬编码色值。',
      '配套要有主色的明暗变体（hover 更深、点击更深一档）与浅色背景变体（选中背景、标签底）。给 AI 的句式：「主色 #0E6B5B，hover 用加深一档、按下再深一档；主色浅背景用于选中态与标签底色；禁用态用灰阶不用主色。所有色值走 CSS 变量」。'
    ],
    analogy: '主色像品牌的工牌色：全公司工牌一种颜色（品牌统一），深浅变化表达状态（在职/临时/访客），但颜色编码全由行政统一规定（token），没人自己配。',
    talk: {
      good: [
        '所有主操作按钮使用品牌主色 token，hover/active 用其明暗变体；不可用主色表达「成功/警告/危险」语义。'
      ],
      bad: [
        { say: '按钮用这个蓝色挺好看', why: '硬编码色值会散落各处难维护；先定义主题变量再引用，换肤时一处生效。' }
      ]
    },
    misconceptions: [
      '主色只有一个？通常还有语义色（成功/警告/危险/信息）与中性灰阶，它们共同组成色板，主色只是其中之一。'
    ],
    related: ['dark-mode', 'css-cascade', 'button']
  },

  {
    id: 'dark-mode',
    en: 'Dark Mode',
    zh: '暗色模式',
    cat: 'frontend',
    tags: ['视觉样式', '主题'],
    level: 'common',
    summary: '深色背景主题：配色不是简单反色，需要整套独立校准。',
    plain: [
      '暗色模式不是把背景翻黑就完事：背景分阶（最深的底色/表面色/悬浮色）、文字反白但要降灰阶（纯白在暗底上刺眼）、边框提亮、阴影加深加大、主色提亮一档（深底上的颜色要更亮才够对比）。',
      '工程实现三选一：CSS 变量切换（推荐，tokens.css 里定义两套）、data-theme 属性 + 变量覆盖、CSS prefers-color-scheme 跟随系统。给 AI 的句式：「支持浅/暗/跟随系统三态：用 data-theme 切换 CSS 变量，暗色下文字用 #E8E5DD 而非纯白，卡片阴影加深，主色提亮为 #52C3AC」。'
    ],
    analogy: '暗色模式像夜间驾驶舱仪表：灯不是把白天的灯调暗了事，而是重新设计了背光颜色、亮度与对比，让你夜里不刺眼也看得清。',
    talk: {
      good: [
        '暗色主题：surface 分层（bg/surface/surface-2）都比背景亮一档，正文文字 87% 白、次要 60%，成功/警告/危险色提亮一档并重校对比度。'
      ],
      bad: [
        { say: '加个夜间模式把颜色反过来就行', why: '直接反色的暗色主题对比度崩塌、阴影不可见；每套配色都要独立校准。' }
      ]
    },
    misconceptions: [
      '暗色模式省电且保护眼睛？OLED 屏确实省电，但长时间阅读深色界面研究尚无定论；重点是尊重用户偏好。'
    ],
    related: ['primary-color']
  },

  {
    id: 'z-index',
    en: 'Z-Index',
    zh: '层级 z-index',
    cat: 'frontend',
    tags: ['视觉样式', '布局'],
    level: 'advanced',
    summary: '层叠上下文里的纵向优先级：弹窗盖住内容，用统一档位而非天文数字。',
    plain: [
      'z-index 决定元素谁盖谁：下拉盖表格、弹窗盖下拉、Toast 盖弹窗。工程纪律：定义档位（下拉 100、抽屉/弹窗 1000、Toast 2000），组件按档取值；避免散落 99999 这种「更大的数字」军备竞赛。',
      '高频坑：父元素创建了层叠上下文（transform/opacity/filter/position+ 等），子元素的 z-index 只能在父层内比较——「子元素 z-index 无效」多半是这个原因。给 AI 的句式：「弹窗 z-index 用 1000 档、下拉 100、Toast 2000；表格吸顶表头 50；若弹窗被表格穿透，检查表格是否创建了层叠上下文」。'
    ],
    analogy: 'z-index 像酒店的楼层权限：保安（Toast）管地面层、前台（弹窗）在 10 楼、仓库（下拉）在地下室——每层各安其位，而不是人人都往顶层挤。',
    talk: {
      good: [
        '全站 z-index 统一管理：modal 1000、popover 500、dropdown 300、sticky 100，新增浮层先查档位表再定值。'
      ],
      bad: [
        { say: '这个被盖住了把 z-index 调大点', why: '盲目调大触发层叠军备竞赛且掩盖根因；先查是否有意外层叠上下文再给值。' }
      ]
    },
    misconceptions: [
      'z-index 越大就一定在最上面？层叠上下文隔离后，父子之间的比较优先于数值大小，先查上下文树。'
    ],
    related: ['modal', 'dropdown-menu', 'css-cascade']
  },

  {
    id: 'typography',
    en: 'Typography',
    zh: '字体排印',
    cat: 'frontend',
    tags: ['视觉样式'],
    level: 'common',
    summary: '字号/字重/行高的层级体系：标题、正文、辅助文字各安其位。',
    plain: [
      '排印体系决定页面是否「有呼吸」：定义字号阶梯（标题 28/22/18、正文 16、辅助 13）、字重（700 标题/600 强调/400 正文）、行高（正文 1.6-1.75、标题 1.3）、行宽（正文每行 60-80 字符）。',
      '中文字体栈要配好：系统默认中文栈（苹方/微软雅黑等）、等宽栈给代码、数字表格用等宽对齐（tabular-nums）。给 AI 的句式：「统一字号 token：页面大标题 28px/700、小节标题 18px/600、正文 16px/行高 1.75、辅助 13px；代码用等宽字体；金额列启用等宽数字对齐」。'
    ],
    analogy: '排印像报纸版式设计：大标题吸睛、正文好读、脚注谦让——一套有层级的字号方案，读者扫一眼就知道先看哪、细读哪、略过哪。',
    talk: {
      good: [
        '文章阅读区：正文 16px 行高 1.75 行宽 70ch，h2 用 22px 加粗加区分色，引用块换字体并缩进，代码块等宽加浅底。'
      ],
      bad: [
        { say: '字调大点好看些', why: '无层级的乱调字号会让正文与标题打架；先明确哪一级（标题/正文/辅助）再动对应的 token。' }
      ]
    },
    misconceptions: [
      '字号越大越好读？正文过大破坏行宽节奏反而难读；层级与对比度比绝对大小更重要。'
    ],
    related: ['primary-color', 'border-radius']
  },

  {
    id: 'interactive-states',
    en: 'Interactive States',
    zh: '交互四态',
    aliases: ['hover', 'focus', 'active', 'disabled'],
    cat: 'frontend',
    tags: ['交互状态'],
    level: 'core',
    summary: 'hover/focus/active/disabled 四态：可交互元素的完整状态设计，缺一不可。',
    plain: [
      '任何可交互元素（按钮/链接/输入框）都要设计四态：hover 悬停（浅色变化+微动效）、focus 聚焦（可见焦点环，键盘可达性关键）、active 按下（加深/缩小反馈）、disabled 禁用（降饱和置灰不可点）。只做默认态是「AI 一眼假」的重灾区。',
      '额外状态别忘：selected 选中态（如标签/菜单项）、loading 态（防重复提交）、error 态（表单）。给 AI 的句式：「按钮四态：默认主色、hover 加深 6%、active 再深并 scale 0.98、disabled 灰色 40% 透明度且不可点；focus-visible 显示 2px 主题色焦点环，键盘用户可见、鼠标用户不扰」。'
    ],
    analogy: '交互四态像电梯按键的一生：未按（默认）、手悬着（hover）、按下（active）、按钮坏了（disabled）——每种情况都要有对应的视觉反馈，否则乘客不知道按键有没有回应。',
    talk: {
      good: [
        '为所有按钮与链接补齐四态样式：focus-visible 焦点环必须可见，disabled 统一降饱和，active 加按下反馈动效。'
      ],
      bad: [
        { say: '鼠标放上去变个色就行', why: '只做 hover 忽略 focus/active/disabled，键盘用户无焦点提示、禁用项与正常项分不清。' }
      ]
    },
    misconceptions: [
      'focus 和 focus-visible 一样？focus-visible 只在键盘/辅助技术导航时显示，避免鼠标点击时也弹焦点框。'
    ],
    related: ['button', 'icon-button', 'disabled-state']
  },

  {
    id: 'disabled-state',
    en: 'Disabled State',
    zh: '禁用态',
    cat: 'frontend',
    tags: ['交互状态'],
    level: 'common',
    summary: '元素不可操作时的视觉与行为：置灰 + 不响应，并给理由提示。',
    plain: [
      '禁用态表达「现在不能用」：未满足前置条件（未登录的提交）、加载中、权限不足。视觉统一降饱和置灰（通常 40% 透明度+去掉交互动效），行为上不响应点击。',
      '好设计的关键在「为什么」：一味禁用用户不知道为什么，配合 Tooltip/说明文字告知「完成此步骤后可提交」，比纯置灰体验好得多。给 AI 的句式：「提交按钮在校验失败时禁用并置灰，hover 显示 Tooltip 说明缺失字段；加载中禁用并显示 loading；不要用禁用代替必填校验」。'
    ],
    analogy: '禁用态像闭馆日的博物馆：门口挂着「今日闭馆」（置灰+说明），总比敞开大门却不让进（可点但无反应）让人困惑少。',
    talk: {
      good: [
        '批量操作按钮：未勾选任何项时禁用并置灰，hover 提示「请先勾选要操作的数据」，勾选后立即恢复。'
      ],
      bad: [
        { say: '没选东西就灰掉按钮', why: '置灰但不说原因，用户反复尝试无果；配一句 Tooltip 说明是必要的一步。' }
      ]
    },
    misconceptions: [
      '禁用就是加个 opacity？还要去掉 hover 效果、防止聚焦、并在可访问性上告知状态；纯视觉置灰但不拦截点击是假禁用。'
    ],
    related: ['interactive-states', 'button', 'tooltip']
  },

  {
    id: 'error-state',
    en: 'Error State',
    zh: '错误态',
    cat: 'frontend',
    tags: ['交互状态'],
    level: 'common',
    summary: '出错时的正式反馈：位置就近、文案可行动、必要时给重试。',
    plain: [
      '错误态的设计决定事故的挽回率：表单错误要就近显示在字段旁（而非表单顶部堆一坨）；接口错误要给可行动文案（重试/联系管理员）而非「出错了」三字；关键操作失败要有重试按钮且防抖。',
      '文案规范：说人话、给后果、给出路——「保存失败，网络异常，请重试或稍后再试」优于「Error 500」。给 AI 的句式：「提交失败在提交按钮上方显示错误条：具体原因+重试按钮，3 秒内重复提交防抖；表单字段校验错误显示在对应输入框下方并聚焦第一个错误字段」。'
    ],
    analogy: '错误态像故障指示灯的说明书：光闪红灯还不够，要能看出是轮胎还是发动机（定位）、下一步怎么办（行动建议）——否则灯亮了也白亮。',
    talk: {
      good: [
        '接口错误统一映射：401 跳登录、403 显示无权限提示、5xx 显示「服务繁忙请稍后重试」+ 重试按钮，均在操作区域就地展示。'
      ],
      bad: [
        { say: '报错了就弹个窗', why: '阻断式弹窗打断所有上下文；就地错误 + 可行动文案远比一个光秃秃的错误框有效。' }
      ]
    },
    misconceptions: [
      '错误文案写「操作失败」就够了？成功的错误处理会告诉用户具体哪错了、怎么补救；只有「失败」两字等于没处理。'
    ],
    related: ['alert-banner', 'interactive-states', 'text-input']
  },

  {
    id: 'transition-animation',
    en: 'Transition & Animation',
    zh: '过渡与动效',
    cat: 'frontend',
    tags: ['交互状态', '性能'],
    level: 'common',
    summary: '状态变化时的平滑过渡：150-250ms 为主，为反馈服务而非炫技。',
    plain: [
      '过渡动效让状态变化可被感知：hover 变色、面板展开、弹窗淡入。三个原则：快（150-250ms，过长拖沓）、克（只为反馈与连贯服务）、可降级（尊重 prefers-reduced-motion，用户要省动效时全部关闭）。',
      '性能纪律：优先动画 transform/opacity（走合成器），避免动画 top/left/width 触发重排（见 reflow-repaint 词条）；入场/出场成对设计（弹窗淡入+缩放出场）。给 AI 的句式：「弹窗 200ms 淡入+轻微上移，遮罩 150ms 淡入；列表项增删用 180ms 高度/透明度过渡；所有动效时长走统一 token，并监听 prefers-reduced-motion 禁用」。'
    ],
    analogy: '过渡动画像电影转场：黑屏硬切（无过渡）让人出戏，慢镜头转场（过长的动画）拖垮节奏——恰到好处的 200ms 转场让观众无缝跟进剧情。',
    talk: {
      good: [
        '侧栏收起动画：宽度/透明度过渡 220ms 用 ease-out，只动画 transform 属性保证 60fps；系统偏好减少动效时直接跳变。'
      ],
      bad: [
        { say: '加个动画炫一点', why: '无目的的长动画拖慢操作节奏且不尊重减少动效偏好；先定义动画服务于哪个状态变化。' }
      ]
    },
    misconceptions: [
      '动画越多体验越好？动效的价值在于「解释变化」，滥用动画会显著降低操作效率与专业感。'
    ],
    related: ['reflow-repaint', 'interactive-states', 'spinner']
  },

  {
    id: 'dashboard',
    en: 'Dashboard',
    zh: '仪表盘',
    cat: 'frontend',
    tags: ['页面类型'],
    level: 'core',
    summary: '数据概览首页：指标卡、图表、表格的组合，一眼看清业务全貌。',
    plain: [
      'Dashboard 是业务的总览台：核心指标卡（KPI 数值+环比）、趋势图表（折线/柱状）、排行榜与明细表格、状态总览。设计重点在信息层级——最重要的数字最显眼，图表的可读性高于花哨程度。',
      '工程要点：数据刷新策略（定时轮询/手动刷新/WebSocket）、指标卡的空值与异常值处理、图表懒加载与按需引入（避免拖慢首屏）。给 AI 的句式：「运营看板：顶部四个 KPI 卡（GMV/订单量/客单价/转化率，各带同比环比），中部折线趋势图（近 30 天，可切换维度），下方排行榜 Top10 与订单表格；数据 5 分钟轮询」。'
    ],
    analogy: '仪表盘像飞机驾驶舱仪表板：速度、高度、油量分列有序（KPI 卡），一眼扫过就知道整体状态；该报警的报警（异常值标红），而不是把所有参数都平铺成小字。',
    talk: {
      good: [
        '管理后台首页看板：KPI 卡区+图表区+最近动态列表，图表库按需动态引入，指标卡支持点击跳转对应明细页。'
      ],
      bad: [
        { say: '做个数据大屏', why: '不放指标定义、刷新策略与图表形态，AI 只能堆一个没有业务语义的样板看板。' }
      ]
    },
    misconceptions: [
      '仪表盘信息越全越好？信息过载反而淹没有效信号；好的看板「一个屏幕讲一个故事」。'
    ],
    related: ['card', 'table', 'progress-bar']
  },

  {
    id: 'landing-page',
    en: 'Landing Page',
    zh: '落地页',
    cat: 'frontend',
    tags: ['页面类型', '营销'],
    level: 'common',
    summary: '以转化为目标的单页：首屏主张、卖点、证据、行动召唤层层递进。',
    plain: [
      '落地页（Landing Page）用一整页讲一件事并引导转化：注册、下载、咨询。结构套路：首屏 Hero（主张+主 CTA）、痛点/卖点区块、产品截图或演示、社会证据（客户评价/数据）、FAQ、最后的行动召唤。',
      '技术要点：首屏加载极速（LCP 要快）、图片懒加载、移动优先、可追踪的转化事件埋点、SEO 基础（见 seo 词条）。给 AI 的句式：「产品落地页：首屏 大标题+副标题+主按钮「免费开始」，下方三栏卖点卡，中部产品截图，客户评价轮播，底部 CTA + 页脚；所有图片懒加载并配 alt」。'
    ],
    analogy: '落地页像一场只卖一件商品的电视购物：开场亮出主张（首屏）、逐条摆卖点（区块）、晒好评（社会证据）、最后再逼单一次（底部 CTA）——全程只为一个转化目标服务。',
    talk: {
      good: [
        'SaaS 落地页首屏优化：标题含核心卖点关键词、主 CTA 与演示按钮并排、信任徽章（备案/客户数）放在 CTA 下方，首屏 LCP 控制在 2.5 秒内。'
      ],
      bad: [
        { say: '做个官网首页', why: '官网是信息型多栏目，落地页是转化型单页；目标不同，结构与节奏完全不同。' }
      ]
    },
    misconceptions: [
      '落地页就是官网首页？官网承担信息导航，落地页牺牲完整性换取单一转化；两者可并存（投放进落地页，常规访问进官网）。'
    ],
    related: ['seo', 'banner', 'lazy-loading']
  },

  {
    id: 'login-page',
    en: 'Login Page',
    zh: '登录页',
    cat: 'frontend',
    tags: ['页面类型', '认证'],
    level: 'common',
    summary: '账号入口页：表单、验证码、第三方登录、错误与找回流程的集合。',
    plain: [
      '登录页是产品大门，体验直接决定流失率。要素：账号密码表单（或手机号验证码）、登录按钮（loading 防连点）、记住我、忘记密码、第三方登录（微信/Google）、注册入口。',
      '工程细节：登录态的处理（见 jwt/session 词条）、错误提示（账号或密码错误，不要泄露哪个错了）、表单重置、回车提交、移动端安全键盘。给 AI 的句式：「登录页：居中卡片式布局，手机号+密码+「登录」主按钮，错误在表单上方红色 Alert 展示，加载中转圈禁用；底部提供验证码登录切换与注册入口，回车提交」。'
    ],
    analogy: '登录页像写字楼大堂前台：进门办登记（验证身份），登记失败要当场说清为什么（错误提示），还要有访客通道（验证码/第三方登录）和忘记工牌的处理（找回密码）。',
    talk: {
      good: [
        '登录表单：手机号失焦即校验，密码可见性切换，登录按钮 loading 防重复提交；401 时保留已填内容并聚焦错误字段。'
      ],
      bad: [
        { say: '做个登录页面', why: '账号密码还是验证码、第三方登录、错误处理全未定义，AI 只能做无业务逻辑的表单壳。' }
      ]
    },
    misconceptions: [
      '登录页必须「简洁到只有一个框」？过度极简会牺牲找回密码与注册入口；平衡信息密度比纯极简更重要。'
    ],
    related: ['text-input', 'button', 'http-client', 'error-state']
  },

  {
    id: 'detail-page',
    en: 'Detail Page',
    zh: '详情页',
    cat: 'frontend',
    tags: ['页面类型'],
    level: 'common',
    summary: '聚焦单个对象的信息全景：概览区、属性表、关联内容与操作。',
    plain: [
      '详情页把「一个对象的所有信息」组织起来：商品详情、订单详情、用户详情。结构：概览区（标题+关键状态+主操作）、信息分区（属性表格/描述列表）、关联内容（相关商品/操作日志）、页尾操作。',
      '布局两种流派：单列长文式（适合叙述型内容）与分区卡片式（适合结构化信息，常配抽屉/Tab 承载补充）。给 AI 的句式：「订单详情页：顶部概览卡（订单号/状态 Tag/金额+操作按钮），主体左侧信息分区（商品明细表格+收货信息），右侧关联卡（物流轨迹），底部审计日志用时间线」。'
    ],
    analogy: '详情页像一份产品的完整说明书：封面（概览区）说清是什么，正文（信息区）逐项展开，附录（关联与日志）补全上下文——翻到哪页都有用。',
    talk: {
      good: [
        '用户详情页：顶部头像+昵称+状态徽标，主体 Tab 组织 基本资料/订单记录/登录日志，均懒加载；操作按钮常驻右上角。'
      ],
      bad: [
        { say: '做个详情展示页', why: '信息组织方式与补充模块未定义，AI 只能把字段堆成一张大表，找不到重点。' }
      ]
    },
    misconceptions: [
      '详情页信息越多越完整？层级与主次比数量重要：概览区抓重点，长尾信息收进 Tab 或折叠。'
    ],
    related: ['card', 'table', 'tabs', 'drawer']
  },

  {
    id: 'not-found-page',
    en: 'Not Found Page',
    zh: '404 页面',
    cat: 'frontend',
    tags: ['页面类型'],
    level: 'common',
    summary: '访问不存在的地址时：别让用户撞墙，给引导回到正轨。',
    plain: [
      '404 页是用户迷路时的路标：明确的「页面不存在」、友好的插画/文案、回到首页与搜索入口。好的 404 能挽留本要流失的用户；裸白屏或「Error 404」一行字是最差体验。',
      '工程要点：SPA 前端路由要处理未匹配路由渲染 404 组件；服务端要配合返回真实 404 状态码（对 SEO 友好，见 seo 词条）。给 AI 的句式：「404 页面：居中插画+「页面走丢了」标题+说明文案+「返回首页」主按钮与搜索框次入口，底部附常见入口链接；保持与全站一致的导航与页脚」。'
    ],
    analogy: '404 页像迷路时的问路牌：光竖一块「此路不通」会让人更加无助；好的路牌会顺便指一下「您要去的地方往这边走」（返回首页/搜索），把人重新带上正轨。',
    talk: {
      good: [
        '全局 404 组件：未匹配路由统一渲染，含品牌插画、返回首页按钮、热门内容链接，并保留顶部导航便于继续浏览。'
      ],
      bad: [
        { say: '地址不存在就让它空白吧', why: '空白页让用户以为站点坏了且无处可去；404 是留存设计的一环。' }
      ]
    },
    misconceptions: [
      '404 页不重要？错误处理与留存、SEO 状态码、品牌体验三重价值集于一身，值得认真设计。'
    ],
    related: ['empty-state', 'routing', 'seo']
  },

  {
    id: 'form',
    en: 'Form',
    zh: '表单',
    cat: 'frontend',
    tags: ['UI 组件', '页面类型'],
    level: 'core',
    summary: '收集结构化输入的完整页面：字段区、校验规则、提交状态与反馈。',
    plain: [
      '表单是收集用户结构化输入的整块布局：字段区（输入框/下拉/单选组合）、校验（字段级与整体级）、提交区（提交/重置）、提交状态（加载中/成功/失败）。它是业务系统里出现率最高的页面类型。',
      '沟通要点按三块说清：字段规格（每个字段的控件、标签、占位、必填与校验规则）、交互细节（失焦校验还是提交校验、错误展示位置、提交防重复）、整体行为（成功后去哪、失败后保留已填内容）。给 AI 的句式：「用户资料表单：姓名/手机号/角色下拉/备注，手机号必填且 11 位校验，提交校验全部通过后调接口，失败保留已填并在对应字段下提示，成功跳详情页」。'
    ],
    analogy: '表单像住院部的入院登记单：一格格问清楚（字段与校验）、填错当场打回（字段级错误）、签字提交才算办结（提交反馈）——漏问一项，后面全乱。',
    talk: {
      good: [
        '注册表单：手机号+验证码+密码三字段，字段级实时校验，提交时整体校验并 loading 防重复，成功后跳引导页。'
      ],
      bad: [
        { say: '做一个提交信息的表单', why: '字段清单、校验规则、提交行为全空白，AI 只能做一个永远提交不出去的样板表单。' }
      ]
    },
    misconceptions: [
      '表单校验只在提交时做？好表单通常字段失焦即校验 + 提交整体校验双时机，早反馈早纠错。'
    ],
    related: ['text-input', 'select-dropdown', 'button', 'error-state']
  },

  {
    id: 'position',
    en: 'CSS Position',
    zh: 'CSS 定位',
    aliases: ['定位', 'absolute', 'relative', 'fixed', 'sticky'],
    cat: 'frontend',
    tags: ['CSS', '布局'],
    level: 'core',
    summary: 'position 决定元素是否脱离文档流：相对、绝对、固定、吸顶四种各有定位基准。',
    plain: [
      '写页面时最常听到的「这个元素怎么跑到那儿去了」，九成和 position 有关。relative 按自己原位偏移但保留占位；absolute 彻底脱离文档流，相对最近的已定位祖先定位，父级都没设就一路找到 body；fixed 相对视口固定不动；sticky 在滚动到阈值前是普通元素，之后像 fixed 一样吸住。',
      '高频翻车点：absolute 找不到定位父级就乱跑；fixed 被祖先的 transform/filter 拉进局部坐标系而失效；sticky 被父容器 overflow:hidden 或高度限制掐掉。跟 AI 说清楚「期望它相对谁定位、滚动时表现如何」，它才能给对 position 组合，而不是打补丁式堆样式。',
      '定位是「期望的位置」不是「无奈的手段」：能用文档流就用文档流，定位留给浮层、吸顶这类真正需要脱离的场景，代码更稳。'
    ],
    analogy: 'relative 像站好队再往旁边挪半步（位置还占着队里）；absolute 像离开队伍、听「最近的带队长」指挥；fixed 像挂在天花板的监控跟着视口走；sticky 像磁吸贴，拖到桌边自动吸住。',
    talk: {
      good: [
        '这个弹层用 absolute，相对它的容器定位；容器请设 relative 并保持无 transform。',
        '底部按钮需要 fixed 固定在视口底部，但它的父级有 transform，请换方案避免 fixed 失效。'
      ],
      bad: [
        { say: '这个按钮乱跑了，帮我把它放到该在的位置', why: '没说期望相对谁定位、滚动时怎么表现，AI 只能猜，随手加 absolute 可能造成更多错位。' }
      ]
    },
    misconceptions: [
      'fixed 一定相对视口？祖先有 transform/filter/perspective 时 fixed 会相对该祖先，弹窗动画里尤其容易踩。',
      'absolute 相对父元素？它相对「最近的已定位祖先」，父元素没设 position 时就继续往上找。'
    ],
    related: ['css-box-model', 'flex-grid', 'z-index', 'responsive-design']
  },

  {
    id: 'overflow',
    en: 'Overflow',
    zh: '溢出与滚动',
    aliases: ['溢出', '滚动条', 'overflow', 'clip'],
    cat: 'frontend',
    tags: ['CSS', '布局'],
    level: 'common',
    summary: '内容超出容器怎么处理：visible 露出、hidden 裁掉、auto 出滚动条。',
    plain: [
      '给容器设了宽高后内容装不下，溢出（overflow）决定多余部分怎么处理：visible 默认直接露出去、可能压到后面的元素；hidden 直接裁掉、内容不可见也滚不动；auto 有需要才出现滚动条；scroll 常驻滚动条。页面出现横向滑动条，通常是某个元素宽度失控，问题不在 body。',
      '和 AI 沟通溢出问题的黄金信息是「哪个容器、哪条轴、期望表现」：例如「左侧导航内容超高时内部滚动，不要撑高整页」，或「这行文字不要换行、超出用省略号」——前者是 overflow，后者是 text-overflow 加 white-space。',
      'overflow:hidden 常被拿来藏动画溢出或配合圆角裁剪，但它也会悄悄废掉 sticky、让滚动穿透失效，副作用要记得排查。'
    ],
    analogy: 'overflow 像抽屉的推拉门：visible 是门坏了一直敞开、东西冒出来；hidden 是直接关死看不见里面；auto 是装满了才自动弹开一条缝（滚动条）。',
    talk: {
      good: [
        '这个列表容器高度固定，内容多了要内部滚动，请给外层加 overflow:auto，不要撑高页面。',
        '页面出现横向滚动条，帮我定位是哪个元素宽度超出视口，并处理，不要用 overflow-x:hidden 硬盖。'
      ],
      bad: [
        { say: '页面可以左右滑，帮我修一下', why: '没说是哪个元素、哪条轴溢出，AI 可能乱加 overflow:hidden 把内容裁掉，或改了 body 的溢出却没解决根因。' }
      ]
    },
    misconceptions: [
      'overflow:hidden 等于隐藏滚动条？它同时禁止了滚动并裁掉溢出内容，想「可滚动但无滚动条」需要另做定制。',
      '横向溢出加 overflow-x:hidden 就完事？只是遮住症状，内容仍可能被裁，要去找真正撑宽的根因。'
    ],
    related: ['css-box-model', 'reflow-repaint', 'flex-grid']
  },

  {
    id: 'text-overflow',
    en: 'Text Overflow & Wrapping',
    zh: '文字溢出与换行',
    aliases: ['省略号', '换行', 'word-break', 'ellipsis', 'white-space'],
    cat: 'frontend',
    tags: ['CSS', '排版'],
    level: 'common',
    summary: '文字收尾：white-space 管换行，text-overflow 出省略号。',
    plain: [
      '「这行字怎么把卡片撑破了」「省略号怎么不生效」——都是文字收尾三件套的问题：white-space:nowrap 禁止换行，overflow:hidden 裁掉多余，text-overflow:ellipsis 在裁切处补省略号，三件缺一不可。',
      '英文长单词、长 URL 是另一回事：默认只在空格处断行，一个超长单词会把容器撑爆。word-break:break-all 或 overflow-wrap:break-word 可强制在词内断行，二者语义不同：前者暴力在任意字符断，后者优先整词换行、实在不行才拆词。',
      '多行省略号要用 -webkit-line-clamp（配 display:-webkit-box），和单行不是一套写法。跟 AI 说清「单行还是多行、超长单词要不要拆」，它就能给对组合，而不是贴一段玄学 CSS。'
    ],
    analogy: '换行像排版一条横幅：white-space 决定这句话允不允许折成两行；遇到超长英文单词，word-break 决定「硬掰」还是「整词挪下一行」；单行尾部省略号则像横幅被剪掉的部分用省略号代替。',
    talk: {
      good: [
        '标题单行超出显示省略号，用 white-space:nowrap 加 overflow:hidden 加 text-overflow:ellipsis。',
        '评论内容两行后省略，用 -webkit-line-clamp:2，兼容性按项目目标浏览器处理。'
      ],
      bad: [
        { say: '文字把按钮撑大了，帮我弄好看点', why: '没说清要换行还是省略、单行还是多行、哪类字符溢出，AI 给的方案大概率和你预期的收尾方式不符。' }
      ]
    },
    misconceptions: [
      'text-overflow:ellipsis 单独就能出省略号？必须配合 overflow:hidden 和 white-space:nowrap，三者缺一不生效。',
      'word-break:break-all 和 overflow-wrap:break-word 一样？前者连单词都硬拆、可能拆出难看的半截，后者优先整词换行，中文内容几乎用不到 break-all。'
    ],
    related: ['typography', 'css-box-model']
  },

  {
    id: 'object-fit',
    en: 'Object-Fit',
    zh: '图片填充方式',
    aliases: ['图片变形', 'object-fit', 'cover', 'contain'],
    cat: 'frontend',
    tags: ['CSS', '多媒体'],
    level: 'common',
    summary: '图片进框怎么铺：cover 填满裁边，contain 完整留白，不然就变形。',
    plain: [
      '「图片怎么被拉变形了」的标准答案：给 img 或 video 设了固定宽高后，内容默认按 fill 拉伸填满，比例被破坏就成了歪脸。改成 cover（填满并裁掉多余）或 contain（完整放进、留白边）即可保住比例。',
      'cover 与 contain 的选择看业务：头像、banner 要铺满用 cover（牺牲边缘）；产品图、预览图要完整展示用 contain。需要按内容比例留白并对齐时，object-position 能微调位置。背景图的对应物是 background-size:cover/contain，思路同源。',
      '跟 AI 描述时给「框多大 + 期望铺满还是完整展示 + 对齐位置」，它直接给对；只丢一句「图片歪了」它会猜，大概率 cover 和 contain 之间来回试。'
    ],
    analogy: 'object-fit 像裱照片：cover 是照片放大到填满画框、四周裁掉一些；contain 是整张照片完整放进框里、留白边；fill 则是把照片硬拉成画框形状，脸都扯变形。',
    talk: {
      good: [
        '头像框固定 80x80，图片要铺满裁边，用 object-fit:cover。',
        '商品图要完整显示不能被裁，容器固定宽高加 object-fit:contain。'
      ],
      bad: [
        { say: '图片显示出来是歪的，帮我弄正常', why: '没说是 img 被拉伸还是背景图、期望铺满还是完整展示，AI 可能给了 cover 但你要的是 contain，或反之。' }
      ]
    },
    misconceptions: [
      'object-fit 只对 img 有效？video、canvas 等替换元素同样适用。',
      '设了 object-fit 图片还变形？常见是容器尺寸没固定，或同时设了 width/height 又被其他样式覆盖，先确认框的真实尺寸生效。'
    ],
    related: ['lazy-loading', 'responsive-design', 'css-box-model']
  },

  {
    id: 'pointer-events',
    en: 'Pointer Events',
    zh: '指针事件与点击穿透',
    aliases: ['点击穿透', 'pointer-events', '不可点击'],
    cat: 'frontend',
    tags: ['交互', 'CSS'],
    level: 'advanced',
    summary: 'pointer-events 决定元素是否响应指针：none 让点击穿透到下层。',
    plain: [
      '「这个按钮点不了」「下面的内容被上面挡住了点不到」——先查两件事：有没有透明或半透明元素盖在上面拦截了点击；那个拦截层是不是该设 pointer-events:none。后者专门用来「让开」，让点击直接穿透到它下面的元素。',
      '典型场景：给卡片加了个透明的角标装饰，结果整块点不动；或 loading 半透明层挡住了操作。查命中问题最快的方式是 DevTools 里对可疑元素切换 pointer-events 再配合 Elements 面板看谁在最上层（z-index 与层叠上下文）。',
      'pointer-events 不只是「删命中」：需要精确化可点击区域时（只让图标本身可点、其余让开）它也是利器。跟 AI 描述时给「谁挡住了谁 + 期望哪个可点」，它一次改对。'
    ],
    analogy: 'pointer-events 像玻璃门的感应器：感应器关了（none）手穿过玻璃直接按到里面的按钮；正常时（auto）手在玻璃上就被拦住。',
    talk: {
      good: [
        '卡片右上角有个透明装饰层挡住了点击，请给装饰层加 pointer-events:none，让点击落到卡片上。',
        '弹窗打开时禁止点击背景，背景遮罩要拦截点击，关闭后再恢复。'
      ],
      bad: [
        { say: '这个区域点了没反应，帮我看看', why: '没说被谁挡住、期望交互是什么，AI 可能随手加 pointer-events:none，结果真正需要拦截的地方也穿透了。' }
      ]
    },
    misconceptions: [
      'pointer-events:none 会禁用键盘焦点？它只影响指针命中，元素仍可被 Tab 聚焦、触发表单事件，可访问性语义没变。',
      '看不见的元素一定不挡点击？透明但命中区域存在的元素照样拦截点击，这正是要显式设 pointer-events:none 的原因。'
    ],
    related: ['event-bubbling-delegation', 'interactive-states', 'z-index']
  },

  {
    id: 'aspect-ratio',
    en: 'Aspect Ratio',
    zh: '宽高比与占位',
    aliases: ['宽高比', 'aspect-ratio', '占位'],
    cat: 'frontend',
    tags: ['CSS', '多媒体'],
    level: 'advanced',
    summary: '给元素钉死宽高比，图片未加载也不跳版；老 hack 用 padding 撑占位。',
    plain: [
      '图片、视频没加载出来时页面空白一块，加载后突然把下面内容顶下去——这叫布局跳动，观感极差。解法是给容器一个固定宽高比占位：现代 CSS 直接 aspect-ratio:16/9；老浏览器常用 padding-top:56.25% 的 hack（百分比内边距按父宽计算，能精确造出高宽比）。',
      '跟 AI 说「这个轮播图区在图片加载瞬间会跳一下，请给容器固定 16:9 占位」，它就知道用 aspect-ratio 或 padding hack 稳住高度，而不是去调图片尺寸。',
      'aspect-ratio 与显式 width/height 同时存在时的优先级规则有学习成本，但日常「图区占位」场景只需一行；配合 max-width 限制宽度，高度按比例自动算出。'
    ],
    analogy: 'aspect-ratio 像提前在墙上画好的电视框：节目没播出时框就在那，不会等画面出来才把沙发往后推（布局跳）。',
    talk: {
      good: [
        '首屏大图区域请用 aspect-ratio:16/9 占位，避免图片加载时布局跳动。',
        '需要兼容老浏览器，用 padding-top:56.25% 的占位方案给视频容器固定宽高比。'
      ],
      bad: [
        { say: '图片加载的时候页面会跳，好烦', why: '没说要给哪个容器占位、宽高比多少，AI 只能泛泛建议，可能加在错误的元素上。' }
      ]
    },
    misconceptions: [
      'aspect-ratio 一定能防布局跳动？它需要一个有确定宽度的容器才能算出高度，父级宽度本身在变化时仍可能跳。',
      'padding-top 百分比是相对自身高度？它是相对父容器宽度计算的，这正是它能做占位的原理。'
    ],
    related: ['lazy-loading', 'responsive-design', 'css-box-model']
  },

  {
    id: 'custom-properties',
    en: 'CSS Custom Properties',
    zh: 'CSS 变量',
    aliases: ['CSS 变量', '自定义属性', 'var()'],
    cat: 'frontend',
    tags: ['CSS', '主题'],
    level: 'common',
    summary: 'CSS 变量用 var() 一次定义处处引用，还能运行时被 JS 和主题改。',
    plain: [
      'CSS 变量也叫自定义属性：在 :root 或任意元素上用 --name: value 定义，再用 var(--name) 引用。主题色、间距、圆角这类全局令牌放变量里，改一处全站生效——很多设计系统的「设计令牌」就是这套思路。',
      '变量沿 DOM 继承，还能在运行时用 JS 修改（element.style.setProperty），深色主题切换、品牌换肤、组件级覆盖都靠它。注意：变量是运行时解析的，动画和过渡里用 var() 有兼容细节，老浏览器 IE 完全不支持。',
      '和 AI 沟通主题问题时直接说「把主色抽成 --color-primary 变量，暗色模式在 [data-theme=dark] 下覆盖它」，比让它写死一串十六进制更利于后续维护。'
    ],
    analogy: 'CSS 变量像公司统一的色卡规范：色卡（:root 变量）里定好品牌红，所有部门做物料只报色卡编号（var 引用），而不是各报各的十六进制，改色时只需改色卡一处。',
    talk: {
      good: [
        '请把主题色抽成 --color-primary 定义在 :root，暗色模式在 [data-theme=dark] 选择器下覆盖同名变量。',
        '组件间距统一用 --space-md 变量，避免散落的魔法数字。'
      ],
      bad: [
        { say: '帮我加个换主题的功能', why: '没说主题有哪些令牌、如何切换、要不要持久化，AI 只能猜实现，容易写出硬编码而非变量化的方案。' }
      ]
    },
    misconceptions: [
      'CSS 变量就是 SCSS 变量？SCSS 变量编译期替换、无继承无运行时；CSS 变量是运行时的、可继承可被 JS 改，两者定位不同。',
      'var() 在哪都能用？变量定义可以放媒体查询里，但某些场景（如 keyframes、部分属性）行为有限制，遇到诡异失效先查兼容性。'
    ],
    related: ['css-cascade', 'dark-mode', 'typography']
  },

  {
    id: 'css-units',
    en: 'CSS Units',
    zh: '长度单位',
    aliases: ['单位', 'px', 'rem', 'em', 'vw', 'vh', '百分比'],
    cat: 'frontend',
    tags: ['CSS', '排版'],
    level: 'core',
    summary: 'px 固定像素、rem 随根字号、em 随自身、vw/vh 随视口：选错单位就出尺寸怪。',
    plain: [
      'CSS 长度单位分两类：绝对单位 px（一个 CSS 像素，不随环境变，最直觉）；相对单位 em/rem（相对字号）、vw/vh（相对视口宽高）、%（相对父元素）。同一处「想表达什么」决定选哪个：全局可缩放间距用 rem、局部随字号用 em、整屏布局用 vw/vh、一成不变用 px。',
      '常见翻车：用 vw 给字体设大小导致窗口缩小时文字过小；100vh 在移动端地址栏收展时溢出（应配合动态视口单位 dvh 或 min-height）；混用 em 嵌套导致字号逐级放大。',
      '跟 AI 描述尺寸需求时带一句「用 rem 方案、根字号 16px」这类基准，它就不至于在 px/em 之间乱猜；出现诡异尺寸时先怀疑单位换算，而不是元素属性写错。'
    ],
    analogy: 'px 像定死的布料尺寸；em/rem 像按参考尺放缩：em 参考自身这件衣服的尺码、rem 参考工厂统一的基准尺；vw/vh 则像按窗户大小裁窗帘。',
    talk: {
      good: [
        '全站间距字号用 rem 方案，根字号 16px，移动端按 375 设计稿缩放根字号。',
        '这个全屏区域高度用 100dvh 而不是 100vh，避免移动端地址栏遮挡。'
      ],
      bad: [
        { say: '字在手机上太小了，帮我调大点', why: '没说是哪类文字、用什么单位、期望相对什么缩放，AI 可能直接加 px 值，换设备或改根字号后又不对了。' }
      ]
    },
    misconceptions: [
      '1rem 永远等于根字号？是，但根字号可能被 JS 或媒体查询改掉，所以 rem 的稳定建立在根字号可控上。',
      '百分比和 vw 都是相对宽度？% 相对父元素，vw 相对视口，页面有滚动条或父级留白时两者明显不同。'
    ],
    related: ['responsive-design', 'css-box-model', 'typography']
  },

  {
    id: 'css-inheritance',
    en: 'CSS Inheritance',
    zh: 'CSS 继承',
    aliases: ['继承', 'inheritance', 'inherit'],
    cat: 'frontend',
    tags: ['CSS', '布局'],
    level: 'core',
    summary: '有些样式（color、font）会传给子元素叫继承；盒模型、定位这类不继承，需要自己写。',
    plain: [
      'CSS 里一部分属性会「往下传」：父元素设了 color，子元素没设就自动用父的。font、color、line-height、text-align 都继承；而 margin、padding、border、width、height、position 不继承，每个元素都从初始值开始。',
      '这个规则决定了布局陷阱：给 body 设了字号，p 和 button 的字号默认跟随，但 input、button、select 这类表单控件很多浏览器默认不继承字体，需要显式 font: inherit。',
      '跟 AI 说「这个按钮字号没跟父级走，请加 font: inherit」它秒懂；只说「字号不对」它得先排查是不是继承断了。'
    ],
    analogy: '继承像家规：家里的语言（color、字体）默认下一代都跟着说，但身高体重（盒模型、定位）各人各的，不会继承。',
    talk: {
      good: [
        '表单控件的字号和父级不一致，请给 input 加 font: inherit。',
        '这段文本希望继承父级的颜色，请去掉它的显式 color。'
      ],
      bad: [
        { say: '字体颜色怎么有的变有的不变', why: '没说是继承问题还是选择器覆盖问题，AI 需要先猜排查方向。' }
      ]
    },
    misconceptions: [
      '所有 CSS 属性都能继承？只有部分（文本类为主）能，盒模型类不继承。',
      '子元素设置了就覆盖父级？是，显式设置优先于继承值，这就是优先级的第一层。'
    ],
    related: ['css-cascade', 'css-specificity', 'typography']
  },

  {
    id: 'css-specificity',
    en: 'CSS Specificity',
    zh: 'CSS 优先级',
    aliases: ['优先级', '权重', 'specificity', '权重计算'],
    cat: 'frontend',
    tags: ['CSS', '选择器'],
    level: 'advanced',
    summary: '两个规则都命中时，按「权重」决胜负：id > 类/属性/伪类 > 元素/伪元素，!important 最大。',
    plain: [
      '当多条规则同时命中同一个元素、属性冲突时，浏览器按选择器的「权重」决定谁赢。权重从高到低：行内样式、id 选择器、类/属性/伪类、元素/伪元素。同权重比谁出现得晚（后面的赢）。',
      '这是「改了不生效」的头号原因：你的类选择器打不过别人的更高权重。规范做法是保持权重低平、用类选择器，而不是靠 !important 或越写越长的选择器堆权重。!important 会打乱规则，能不用就不用。',
      '跟 AI 说「这个样式没生效，请检查是不是被更高优先级的选择器覆盖了」，比说「帮我改一下样式」高效得多——它直接去查权重而不是瞎试。'
    ],
    analogy: '优先级像法庭的裁决顺序：id 是最高法院判决，类是地方法院，元素是街道调解——判决冲突时高层说了算；同层级就看哪份文件后签发（后面的赢）。',
    visual: { kind: 'anim', id: 'css-specificity', caption: '三个选择器按权重比拼，最高者胜出' },
    talk: {
      good: [
        '这个类选择器的样式被 .nav .item 覆盖了，请检查优先级，尽量用同层级覆盖。',
        '请避免用 !important，用更高权重的类选择器解决冲突。'
      ],
      bad: [
        { say: '我改了样式怎么没变化', why: '多半是优先级问题；没说具体选择器和冲突来源，AI 只能帮你猜。' }
      ]
    },
    misconceptions: [
      '后面写的规则一定赢？只有同权重才按先后，权重更高的不管写在哪都赢。',
      '!important 是终极解决？它能赢但会连锁失控，项目里越用越乱。'
    ],
    related: ['css-cascade', 'css-inheritance', 'css-naming-methodology']
  },

  {
    id: 'css-pseudo-class',
    en: 'CSS Pseudo Classes & Elements',
    zh: '伪类与伪元素',
    aliases: ['伪类', '伪元素', 'hover', 'before', 'pseudo'],
    cat: 'frontend',
    tags: ['CSS', '选择器'],
    level: 'common',
    summary: '伪类描述状态（:hover、:focus），伪元素造出不存在的部分（::before、::after），都靠选择器触发。',
    plain: [
      '伪类（:hover、:focus、:disabled、:nth-child）选中元素的某种「状态」或「位置」；伪元素（::before、::after、::placeholder）造出 DOM 里不存在的「虚拟部分」，常用来加图标、装饰、占位文字。',
      '两者用单冒号还是双冒号区分：CSS3 规范伪元素用双冒号（::before），伪类用单冒号（:hover）。伪元素的内容要写在 content 属性里，否则不显示。',
      '跟 AI 说「给按钮加 hover 和 focus 状态样式」「用 ::after 加个箭头图标」，它能精准实现；只说「加点交互效果」它可能用 JS 做本该 CSS 做的事。'
    ],
    analogy: '伪类像根据「天气状态」决定穿什么（晴天/下雨/夜晚都是一种状态）；伪元素像往房间里摆装饰摆件（不是原本家具的一部分，是额外加上去的）。',
    talk: {
      good: [
        '给输入框加 :focus 时的边框高亮，和 :hover 状态。',
        '用 ::before 加个圆点装饰，记得设 content: 空字符串。'
      ],
      bad: [
        { say: '鼠标放上去要有点变化', why: '没说 hover 还是 focus、变什么，AI 只能猜，可能做错状态或做在 JS 里。' }
      ]
    },
    misconceptions: [
      '::before 不需要 content？必须有 content，否则不渲染。',
      ':focus 和 :active 一样？focus 是键盘/点击聚焦后持续，active 是按下瞬间。'
    ],
    related: ['interactive-states', 'css-specificity', 'primary-color']
  },

  {
    id: 'css-animation-keyframes',
    en: 'CSS Animations & Keyframes',
    zh: 'CSS 动画与关键帧',
    aliases: ['动画', 'keyframes', 'animation'],
    cat: 'frontend',
    tags: ['CSS', '动画'],
    level: 'common',
    summary: '@keyframes 定义从哪到哪的关键帧，animation 属性控制时长、次数、曲线，全程 GPU 友好。',
    plain: [
      'CSS 动画分两步：@keyframes 声明动画的阶段（from/0% 到 to/100% 的样式），再用 animation 属性挂到元素上（时长、延迟、次数、缓动、是否循环）。',
      '和 transition 的区别：transition 是「状态变化时补间」，需要触发（hover、class 切换）；animation 是「独立播放的动画」，自带关键帧和循环，不依赖触发。做复杂连续动作、循环动画用 animation。',
      '性能上优先动画 transform 和 opacity，避免动画 margin、top、width——它们触发重排重绘更卡。跟 AI 说「用 keyframes 做呼吸灯，循环 2 秒，只动 opacity」它给的就是性能友好的实现。'
    ],
    analogy: 'keyframes 像动画师画的几张关键帧（起点和终点），浏览器负责自动补出中间的帧；transition 则像「灯一开就慢慢变亮」——依赖开关动作，而 animation 是「循环播放的片头动画」。',
    talk: {
      good: [
        '做个 2 秒循环的呼吸灯，用 keyframes 只动画 opacity。',
        '入场动画用 animation，设置 ease-out 和一次播放。'
      ],
      bad: [
        { say: '加个动画让它动起来', why: '没说动画内容、触发方式、时长，AI 可能用错 animation/transition 或动画了昂贵属性。' }
      ]
    },
    misconceptions: [
      '动画 width 没事？会触发布局，卡顿；transform 缩放更流畅。',
      'animation 需要触发才播放？默认元素渲染就播，想受控得配合 class 切换或暂停。'
    ],
    related: ['css-transition', 'transition-animation', 'css-transform']
  },

  {
    id: 'css-transition',
    en: 'CSS Transitions',
    zh: 'CSS 过渡',
    aliases: ['过渡', 'transition', '补间'],
    cat: 'frontend',
    tags: ['CSS', '动画'],
    level: 'common',
    summary: '属性值变化时平滑过渡：hover 改颜色、宽度，加 transition 就从突变变渐变。',
    plain: [
      'transition 让元素的样式变化不是「啪」地突变，而是在一段时间内平滑过渡：transition: property 时长 缓动函数。最常见用法是配 hover/focus/class 切换，让颜色、位移、透明度柔和变化。',
      '要点：只过渡你想要的属性（transition: background 0.2s 只过渡背景）；给 transition-property 设 all 会什么都慢半拍；过渡需要「前后两个值都可插值」，display:none 到 block 无法过渡。',
      '和动画的区别：transition 靠状态变化触发、一次性；animation 自带关键帧、可循环。跟 AI 说「hover 时平滑变颜色，加 0.2s 过渡」它就加对了；说「做个渐变效果」它可能误解成颜色渐变（gradient）。'
    ],
    analogy: 'transition 像电梯：按按钮（状态变化）不是瞬移，而是平滑上升；animation 则像自动扶梯：一直在动，不用按钮。',
    talk: {
      good: [
        'hover 时背景色平滑变化，加 transition: background-color 0.2s ease。',
        '这个收起展开用 max-height 过渡，注意只过渡这一个属性。'
      ],
      bad: [
        { say: '样式变化太突兀了', why: '没说想过渡哪些属性、时长，AI 可能给 all 过渡导致处处慢半拍。' }
      ]
    },
    misconceptions: [
      'transition: all 最省事？会让所有属性变化都延迟，包括不想要的，性能也差。',
      'display 变化也能过渡？display 不可插值，要配合 opacity/visibility 或 max-height 技巧。'
    ],
    related: [
      'css-animation-keyframes',
      'transition-animation',
      'interactive-states'
    ]
  },

  {
    id: 'css-transform',
    en: 'CSS Transforms',
    zh: 'CSS 变换',
    aliases: ['transform', '平移', '旋转', '缩放'],
    cat: 'frontend',
    tags: ['CSS', '布局'],
    level: 'common',
    summary: 'transform 平移/旋转/缩放元素而不影响文档流：GPU 加速，动画首选它而不是 top/left。',
    plain: [
      'transform 在不改变布局的前提下对元素做视觉变换：translate（平移）、rotate（旋转）、scale（缩放）、skew（倾斜），可组合（transform: translate(...) scale(...)）。',
      '关键特性：transform 不触发重排、只触发合成，动画性能极好（GPU 加速），所以「元素移动」规范做法是改 transform: translate 而不是改 top/left。配合 transition 就是流畅的位移动画。',
      '注意 transform 会创建新的层叠上下文，且对 inline 元素无效（要 display: inline-block 等）。跟 AI 说「用 transform 实现位移动画而不是 margin/top」，它写的就是高性能方案。'
    ],
    analogy: 'transform 像把一张照片在相册里移动、旋转、放大：照片本身没变（不影响其他照片位置），只是观看时的呈现方式变了。',
    talk: {
      good: [
        '这个元素要平滑左移，用 transform: translateX，别改 left。',
        'hover 时放大 1.1 倍，用 transform: scale(1.1) 加过渡。'
      ],
      bad: [
        { say: '让它动起来', why: '没说是位移还是缩放旋转、用 CSS 还是 JS，AI 可能用 top/left 造成卡顿。' }
      ]
    },
    misconceptions: [
      'transform 会移动元素在文档流里的位置？不会，它只改视觉呈现，占据的空间不变。',
      '改 top/left 做动画和 transform 一样？top/left 触发重排，transform 只触发合成，流畅度差很多。'
    ],
    related: ['css-animation-keyframes', 'css-transition', 'stacking-context']
  },

  {
    id: 'stacking-context',
    en: 'Stacking Context',
    zh: '层叠上下文',
    aliases: ['层叠上下文', 'z-index 失效', 'stacking context'],
    cat: 'frontend',
    tags: ['CSS', '层叠'],
    level: 'advanced',
    summary: 'z-index 只在同一层叠上下文里比大小；父元素一设 opacity/transform/z-index，子元素的 z-index 就被关进小黑屋。',
    plain: [
      '层叠上下文是一个「局部层叠战场」：普通元素、position+z-index、opacity<1、transform、filter 都会创建它。一旦元素创建了上下文，它内部的 z-index 只能在内部比，对外整体作为一个层参与外部排序。',
      '这就是「z-index 设了 9999 还是被盖住」的真相：你的元素被关进了父元素的上下文，父元素的层级低，里面再大也出不来。排查时先看元素往上哪层创建了上下文。',
      '跟 AI 说「弹层被盖住了，请检查是不是父级创建了层叠上下文」，比「z-index 调大点」专业得多——调大 z-index 治标不治本。'
    ],
    analogy: '层叠上下文像学校里的班级排名和全校排名：你在班里（上下文）排第一，但全班对外只算一个集体名次；隔壁班整体排你班前面，你个人再强也越不过班这个整体。',
    visual: { kind: 'anim', id: 'stacking-context', caption: '子元素 z 再高也跳不出父容器' },
    talk: {
      good: [
        '这个弹层的 z-index 9999 还是被盖住，请排查父级是否因 opacity/transform 创建了层叠上下文。',
        '给这个模块设置 position: relative 加 z-index 建立独立上下文，避免内部元素干扰全局层叠。'
      ],
      bad: [
        { say: 'z-index 加很大还是盖不住', why: '这是层叠上下文问题不是 z-index 数值问题；不点破 AI 会继续调 z-index 白费功夫。' }
      ]
    },
    misconceptions: [
      'z-index 越大越靠上？只在同一层叠上下文内成立，父级层一低全白搭。',
      '只有 z-index 能创建层叠上下文？opacity、transform、filter、will-change 都能创建。'
    ],
    related: ['z-index', 'css-transform', 'modal', 'position']
  },

  {
    id: 'html-semantic',
    en: 'Semantic HTML',
    zh: '语义化标签',
    aliases: ['语义化', '语义标签', 'header', 'main', 'section'],
    cat: 'frontend',
    tags: ['HTML', '可访问性'],
    level: 'common',
    summary: '用 header/main/article 等有含义的标签而不是全是 div：可读、好维护、对 SEO 和读屏友好。',
    plain: [
      '语义化是用「有意义」的标签描述内容结构：header（页头）、nav（导航）、main（主体）、article（独立内容）、section（分区）、footer（页脚）、h1-h6（标题层级）。全用 div 也能实现布局，但结构和含义丢了。',
      '好处三条：代码可读性高（看标签就知道区块作用）；SEO 更好（搜索引擎理解内容层次）；无障碍更好（读屏软件靠语义导航，标题层级对了盲人才能跳转）。',
      '跟 AI 说「用语义化标签重构这段页面结构，main 里放主体、section 分节」，它给的结构化输出比一堆 div 强得多；说「做个页面」它默认可能就是 div 堆。'
    ],
    analogy: '语义化标签像文件柜上贴标签：div 是不带标签的抽屉，每个都要打开才知道里面是什么；header/article 是贴着「合同」「发票」标签的抽屉，一看就懂。',
    talk: {
      good: [
        '用语义化标签组织页面：header、nav、main、footer，标题层级从 h1 开始。',
        '这段列表用 ul/li 而不是 div 堆，保持语义。'
      ],
      bad: [
        { say: '帮我写个页面结构', why: '没说语义化要求，AI 可能产出 div 海洋，SEO 和可读性都差。' }
      ]
    },
    misconceptions: [
      'div 能实现一切，不需要语义标签？能实现但失去结构含义，SEO 和可访问性受损。',
      'section 和 div 一样？section 是有主题的分区，通常带标题；div 是无语义容器。'
    ],
    related: ['accessibility-basics', 'seo', 'navbar']
  },

  {
    id: 'accessibility-basics',
    en: 'Web Accessibility (a11y)',
    zh: '无障碍基础',
    aliases: ['a11y', '无障碍', '可访问性', 'ARIA'],
    cat: 'frontend',
    tags: ['可访问性', '工程'],
    level: 'advanced',
    summary: '让网站能被读屏、键盘、弱视用户使用：alt、标签、对比度、焦点管理是四项基本功。',
    plain: [
      '无障碍（a11y）是让网页对所有人可用：盲人用读屏软件听网页、键盘用户不用鼠标、弱视用户需要高对比度。基本功：图片加 alt 描述；表单控件有 label；文字和背景对比度达标（正文 4.5:1）；键盘能 Tab 走通所有交互。',
      '常见坑：用 div 做按钮但没加 role 和键盘事件；弹层打开后焦点没移进去、关闭后没还回去；装饰性图标没加 aria-hidden 让读屏跳过。ARIA 是补充语义，但不能替代原生标签（原生 button 免费自带无障碍）。',
      '跟 AI 说「这个自定义下拉要支持键盘操作和 aria-expanded」，它知道补无障碍；说「做个下拉」它可能只做鼠标交互，键盘用户用不了。'
    ],
    analogy: '无障碍像给大楼加坡道、电梯按钮盲文、门把手下压式：多数人用不上，但对需要的人它就是「能不能进门」的区别——网页也是同一栋楼。',
    talk: {
      good: [
        '这个图片加 alt 描述，纯装饰图用 aria-hidden 隐藏。',
        '自定义按钮请用原生 button 标签，自带键盘和读屏支持。'
      ],
      bad: [
        { say: '帮我做个按钮', why: '没说无障碍要求，AI 可能用 div+点击事件，键盘和读屏用户都用不了。' }
      ]
    },
    misconceptions: [
      '无障碍是给少数人的额外工作？它同时提升所有人体验（大字体、清晰焦点），且是合规要求。',
      'ARIA 加上就万事大吉？ARIA 写错比没有更糟，优先用原生语义。'
    ],
    related: ['html-semantic', 'form', 'modal']
  },

  {
    id: 'viewport-meta',
    en: 'Viewport & Mobile Adaptation',
    zh: '视口与移动端适配',
    aliases: ['viewport', '视口', 'meta viewport', '移动适配'],
    cat: 'frontend',
    tags: ['响应式', '移动端'],
    level: 'common',
    summary: '<meta viewport> 告诉手机按真实屏幕宽度渲染而不是 980px 虚拟宽度，是移动端不缩放的前提。',
    plain: [
      '手机浏览器默认用约 980px 的虚拟视口渲染桌面页面，再整体缩小，导致字小得像蚂蚁。加 <meta name="viewport" content="width=device-width, initial-scale=1"> 后，页面按设备真实宽度渲染，CSS 里的 px 才和物理感受对上。',
      '它是所有响应式适配的前提：没有它，媒体查询里的断点全按 980 算，布局全乱。配合 rem、vw 或 clamp 做自适应字号，配合 1px 物理像素处理细边框。',
      '跟 AI 说「页面上手机字太小/布局横向滚动，先检查有没有加 viewport meta」，它立刻定位；只说「手机显示不对」它可能改半天布局才发现根因是 viewport。'
    ],
    analogy: 'viewport 像告诉打印机「纸的实际尺寸」：不说它默认按大纸排版再缩印，字全挤小；说了它按真实纸张排，一毫米就是一毫米。',
    talk: {
      good: [
        '移动端显示异常，请确认 head 里已加 viewport meta 且 width=device-width。',
        '用 rem 做自适应，根字号按视口宽度用 clamp 设置。'
      ],
      bad: [
        { say: '手机上样式全乱了', why: '很可能没加 viewport；不点破 AI 可能盲目调 CSS 而治标不治本。' }
      ]
    },
    misconceptions: [
      '不加 viewport 也能做移动适配？媒体查询会按错误的 980px 宽度工作，等于没适配。',
      'viewport 只影响手机？平板、横屏、桌面缩放都受它影响。'
    ],
    related: ['responsive-design', 'css-units', 'css-inheritance']
  },

  {
    id: 'margin-collapse',
    en: 'Margin Collapse',
    zh: '外边距塌陷',
    aliases: ['外边距塌陷', 'margin collapse', 'margin 合并'],
    cat: 'frontend',
    tags: ['CSS', '盒模型'],
    level: 'advanced',
    summary: '垂直方向的相邻 margin 会合并取最大值而不是相加：上下间距经常「少了一半」就是它。',
    plain: [
      '外边距塌陷（margin collapse）：垂直方向上两个相邻元素（或父子）的 margin 不叠加，而是取较大那个。比如 A 的 margin-bottom: 30px、B 的 margin-top: 20px，间距是 30 不是 50。',
      '水平方向不塌陷；还有父子塌陷：子元素的 margin-top 会「透出」父元素，把父元素整体顶下去（前提父元素没有 padding/border/overflow 等隔离）。',
      '规避三板斧：父元素加 padding、border、overflow: hidden，或改用 flex/grid 布局（不会塌陷）。跟 AI 说「这段间距看起来不对，检查是不是 margin 塌陷」，它就往这个方向排查了。'
    ],
    analogy: '外边距塌陷像两人排队间距：你和前面的人各想保持 1 米和 2 米距离，结果只按 2 米算（取较大），不会变 3 米——距离是「谁要求的多就按谁」，不是相加。',
    visual: { kind: 'anim', id: 'margin-collapse', caption: '相邻 margin 相遇后合并取较大值' },
    talk: {
      good: [
        '两个块之间的垂直间距没达到预期，请检查 margin 塌陷并给出解决方案。',
        '给父元素加 overflow: hidden 隔离子元素的 margin 穿透。'
      ],
      bad: [
        { say: '间距怎么少了', why: '没说是不是垂直相邻块或父子，AI 可能直接调 margin 数值，越调越乱。' }
      ]
    },
    misconceptions: [
      'margin 永远相加？只有水平方向相加，垂直方向合并取最大。',
      '只有兄弟元素会塌陷？父子元素的 margin-top 也会穿透合并。'
    ],
    related: ['css-box-model', 'css-inheritance', 'flex-grid']
  },

  {
    id: 'css-float-clear',
    en: 'Float & Clear',
    zh: '浮动与清除',
    aliases: ['浮动', 'float', 'clear', '清除浮动'],
    cat: 'frontend',
    tags: ['CSS', '布局'],
    level: 'common',
    summary: 'float 让元素靠左/靠右并让文字环绕，脱离文档流；清除浮动是古老但必须会的收尾手段。',
    plain: [
      'float: left/right 让元素向左/右靠，后续文字环绕它排，最初用于图文混排（报纸排版）。浮动元素脱离普通文档流，导致父容器高度塌陷——这就是为什么要「清除浮动」。',
      '清除浮动（clearfix）的办法：父容器用 ::after { content: \'\'; display: block; clear: both }，或父容器 overflow: hidden，或直接改 flex/grid。现代布局用 flex/grid 后 float 基本只剩图文混排场景。',
      '跟 AI 说「这个父容器因为子元素 float 塌了，请用 clearfix」，它给你标准解法；说「布局乱了」它可能绕半天。排查 float 问题先确认是不是忘了清除浮动。'
    ],
    analogy: '浮动像报纸里插图靠边、文字绕它排版；清除浮动则像插图排版完后「声明到此为止」，否则后面的文字还傻乎乎地往上绕。',
    talk: {
      good: [
        '图片左浮动、文字环绕，父容器记得用 clearfix 防止高度塌陷。',
        '这个布局用 flex 实现而不是 float，float 留给图文混排。'
      ],
      bad: [
        { say: '父容器高度怎么没了', why: '十有八九是浮动未清除；不点破 AI 可能到处加高度 hack。' }
      ]
    },
    misconceptions: [
      'float 布局是主流？早被 flex/grid 取代，现在只适合图文环绕。',
      '给父元素 overflow: hidden 能解决一切？是常见 hack，但也会裁掉溢出内容，要注意场景。'
    ],
    related: ['flex-grid', 'css-box-model', 'css-pseudo-class']
  },

  {
    id: 'image-formats',
    en: 'Image Formats & Compression',
    zh: '图片格式与压缩',
    aliases: ['图片格式', 'webp', 'avif', 'svg', 'png'],
    cat: 'frontend',
    tags: ['性能', '图片'],
    level: 'common',
    summary: '照片用 WebP/AVIF、图标用 SVG、截图用 PNG：同一张图格式不同，体积能差好几倍。',
    plain: [
      '选对图片格式直接决定体积：照片（渐变、复杂场景）用 JPEG/WebP/AVIF，WebP 比 JPEG 小 25-30%，AVIF 更小；图标、Logo、矢量图用 SVG（无限缩放、体积小）；需要透明又复杂的用 PNG；动图用 WebP 动图或视频替代 GIF。',
      '工程规范：上传图片转 WebP/AVIF 并压缩；图标尽量用 SVG 或图标字体而不是 png；懒加载大图；给 img 设 width/height 防止布局偏移（CLS）。',
      '跟 AI 说「这些图标用 SVG、照片用 WebP，并提供 picture 多格式回退」，它给的方案体积小体验好；说「帮我放张图」它可能直接放张原图 PNG 拖慢页面。'
    ],
    analogy: '图片格式像搬家打包：照片用真空压缩袋（WebP/AVIF），小摆件用原箱（PNG），组装家具拆成板材图纸（SVG 矢量）——选对方式，同样东西占的箱子差好几倍。',
    talk: {
      good: [
        '列表图片统一用 WebP 并给不同尺寸 srcset，控制体积。',
        '这个 Logo 用 SVG 而不是 PNG，保持清晰且体积小。'
      ],
      bad: [
        { say: '页面图片太多加载慢', why: '没说图片类型和体积瓶颈，AI 只能泛泛建议，未必对症。' }
      ]
    },
    misconceptions: [
      'PNG 适合所有图？照片用 PNG 体积巨大，应选 JPEG/WebP/AVIF。',
      'SVG 能当照片格式？SVG 是矢量，适合图标和简单图形，复杂照片反而巨大。'
    ],
    related: ['lazy-loading', 'performance-core-web-vitals', 'placeholder-text']
  },

  {
    id: 'performance-core-web-vitals',
    en: 'Core Web Vitals',
    zh: '核心性能指标',
    aliases: ['LCP', 'CLS', 'INP', 'FID', '性能指标'],
    cat: 'frontend',
    tags: ['性能', '工程'],
    level: 'advanced',
    summary: 'LCP 看加载多快、CLS 看布局稳不稳、INP 看交互响不响应：三个指标代表用户真实体验。',
    plain: [
      'Core Web Vitals 是谷歌定的三个「真实体验」指标：LCP（最大内容绘制）衡量首屏主要内容的加载速度，目标 <2.5s；CLS（累积布局偏移）衡量页面元素是否乱跳，目标 <0.1；INP（交互到下一帧）衡量点按的响应速度，目标 <200ms。',
      '对应优化：LCP 慢→压缩关键资源、预加载主图、优化服务端返回；CLS 大→给图片视频固定宽高、避免无尺寸内容插入、动画留位；INP 差→长任务拆分、减少主线程阻塞。',
      '跟 AI 说「我的 CLS 得分低，图片加载时布局乱跳，请给 img 加宽高占位」，它直击痛点；只说「帮我优化性能」范围太宽，它只能泛泛给建议。'
    ],
    analogy: '性能指标像餐厅体验三问：上菜快不快（LCP）、端菜时汤洒没洒（CLS）、叫服务员响应快不快（INP）——三个都顾好才是好体验，只看一个会漏。',
    talk: {
      good: [
        'LCP 超标，首屏主图请预加载并压缩，去掉阻塞渲染的脚本。',
        'CLS 偏高，请给所有 img 和 iframe 设置明确宽高。'
      ],
      bad: [
        { say: '帮我优化网站速度', why: '没指明是 LCP/CLS/INP 哪项、具体页面，AI 只能给通用清单。' }
      ]
    },
    misconceptions: [
      '性能只看加载速度？CLS 和 INP 同样影响体验和排名，且三者常顾此失彼。',
      '首屏越快 CLS 一定越好？加载快但内容没占位，图片一进来照样乱跳。'
    ],
    related: ['lazy-loading', 'reflow-repaint', 'image-formats', 'seo']
  },

  {
    id: 'component-props',
    en: 'Props & Component Communication',
    zh: 'Props 与组件通信',
    aliases: ['props', '组件传参', '父子通信', 'props 钻取'],
    cat: 'frontend',
    tags: ['组件', '框架'],
    level: 'common',
    summary: '父组件通过 props 向子组件传数据，数据单向流动；层级太深时 props 钻取就该用状态管理或 context。',
    plain: [
      '在组件化框架（React/Vue）里，props 是父组件传给子组件的「入参」：父决定传什么、子负责展示和使用。数据流单向：子不能直接改 props，想改要回调父组件。这是组件复用的基础。',
      '层级一深就出现 props 钻取（prop drilling）：爷爷传给爸爸、爸爸传给儿子，中间层只是转发。解法：用 context / 状态管理（Redux/Pinia）或组合模式，别硬钻。',
      '跟 AI 说「这个组件不要直接改 props，请通过回调通知父组件更新」或「props 钻取太深，改用 context」，它能给出符合框架惯例的写法；说「帮我传个数据」它可能写出直接改 props 的反模式。'
    ],
    analogy: 'props 像点外卖的订单：父组件下单（传 props），子组件按单出餐展示；子组件想换菜不能改订单，只能打电话回去（回调）让父重新下单。',
    talk: {
      good: [
        '这个子组件想修改 props 的值，请改为调用父组件传入的回调函数。',
        'props 传递超过三层，请改用 context 或状态管理避免钻取。'
      ],
      bad: [
        { say: '子组件改了数据父组件没更新', why: '正是「不该直接改 props」的典型；不点破 AI 可能在子组件里乱改 state 更乱。' }
      ]
    },
    misconceptions: [
      '子组件能随意改 props？不能，会破坏单向数据流，导致状态混乱。',
      'props 钻取无害？层级深时难维护难排查，是重构信号。'
    ],
    related: ['component', 'state', 'one-way-data-flow', 'state-management']
  },

  {
    id: 'form-validation',
    en: 'Form Validation & Feedback',
    zh: '表单校验与反馈',
    aliases: ['表单校验', '校验', 'validation', '必填'],
    cat: 'frontend',
    tags: ['表单', '交互'],
    level: 'common',
    summary: '校验分前端即时校验和后端最终校验：给用户即时报错、标清错误字段，但不能只靠前端防数据。',
    plain: [
      '表单校验包括：必填、格式（邮箱、手机号、正则）、长度、数值范围。前端校验在用户输入/失焦/提交时即时反馈，体验好；但前端校验可绕过，真正的数据校验必须在后端再做一遍。',
      '好的反馈：错误信息紧挨着字段、说明清楚「哪里错、怎么改」、红色不要只靠颜色（色弱用户）、提交失败保留用户已填内容。校验时机：失焦校验（blur）+ 提交时全量校验是常见组合。',
      '跟 AI 说「邮箱格式校验，失焦时提示错误，错误信息显示在字段下方」，它给的实现体验好；说「加个校验」它可能只在提交时弹一个笼统提示，用户不知道哪里错。'
    ],
    analogy: '表单校验像机场安检：前端是登机口的值机提示（没带证件当场提醒你），后端是海关最终核查（伪造提示也过不去）——前端图方便，后端保安全，两道都要。',
    talk: {
      good: ['邮箱字段失焦时校验格式，错误信息显示在输入框下方并标红边框。', '提交时全量校验，失败要保留已填内容并滚动到第一个错误字段。'],
      bad: [
        { say: '帮表单加个校验', why: '没说校验规则、触发时机、错误展示方式，AI 只能做个最简版，体验粗糙。' }
      ]
    },
    misconceptions: ['前端校验够了？可被绕过，后端必须再校验，否则是安全漏洞。', '报错用红色就行？色弱用户看不清，要配合文字和图标。'],
    related: ['form', 'text-input', 'error-state']
  },

  {
    id: 'css-naming-methodology',
    en: 'CSS Naming Methodology (BEM)',
    zh: 'CSS 命名方法论',
    aliases: ['BEM', 'CSS 命名', 'OOCSS', '命名规范'],
    cat: 'frontend',
    tags: ['CSS', '工程'],
    level: 'advanced',
    summary: 'BEM 用 块__元素--修饰 三层命名，把样式作用域锁死：class 一看就知道属于谁，不怕全局污染。',
    plain: [
      'BEM 是最流行的 CSS 命名法：块（block）是独立组件，元素（element）用 __ 连接（card__title），修饰（modifier）用 -- 连接（button--primary）。好处：名字自带层级信息、作用域清晰、基本不冲突。',
      '它解决的是「全局 CSS 互相污染」：没有命名约束时，.title 这种通用名随时被别处覆盖。BEM 让选择器唯一的代价是 class 名长，但换来可维护性。现代也有 CSS Modules、Tailwind 等替代方案。',
      '跟 AI 说「按 BEM 命名：组件是 card，标题是 card__title，强调态是 card__title--highlight」，它产出的样式结构清晰；不说它可能给你写一堆全局通用类名。'
    ],
    analogy: 'BEM 像快递单号编码：省份-城市-街道 每一段都有明确归属，不会搞混；没规则的名字就像只说「三楼」，全楼都有一堆「三楼」。',
    talk: {
      good: [
        '这个组件按 BEM 命名，主类 .card，子元素 .card__title，状态 .card__title--active。',
        '请避免全局类名，用 BEM 或 CSS Modules 隔离样式。'
      ],
      bad: [
        { say: '样式总是互相覆盖', why: '多半是全局命名冲突；不点破 BEM/作用域，AI 只能不断加权重和 !important。' }
      ]
    },
    misconceptions: [
      'BEM 已经过时？它仍是清晰可靠的方案，Tailwind/CSS Modules 只是不同取舍。',
      '命名规范限制创意？它限制的是混乱，不是设计能力。'
    ],
    related: ['css-specificity', 'css-cascade', 'component']
  },

  {
    id: 'pwa-offline',
    en: 'PWA & Offline Capability',
    zh: 'PWA 与离线能力',
    aliases: ['PWA', '离线', 'Service Worker', 'manifest'],
    cat: 'frontend',
    tags: ['工程', '离线'],
    level: 'advanced',
    summary: 'PWA 用 Service Worker 缓存资源、manifest 支持添加到主屏：网站能像 App 一样离线可用。',
    plain: [
      'PWA（渐进式 Web 应用）让网页具备 App 感：Service Worker（一个独立于页面的 JS）拦截网络请求、缓存资源，断网时也能打开页面；manifest 配置图标和名称，支持「添加到主屏幕」；再配合推送、安装提示。',
      '缓存策略很关键：页面骨架用「缓存优先（离线可开）」，API 数据用「网络优先、失败回退缓存（数据要新）」，版本更新要清理旧缓存避免「改了半天用户还是旧版」。',
      '常见坑：Service Worker 注册了但更新策略不对，用户一直用旧资源。跟 AI 说「加 Service Worker，页面缓存优先、接口网络优先」，它能给标准模板；说「做个离线版」它可能把接口也缓存了导致数据过期。'
    ],
    analogy: 'PWA 像给网站装了「离线背包」：Service Worker 是把常用物资（页面骨架、图片）提前装进背包，断网时从背包取；接口数据则是到了现场（联网）再实时问。',
    talk: {
      good: [
        '配置 Service Worker：静态资源缓存优先，API 请求网络优先失败再回退缓存。',
        '版本更新时请清理旧缓存，避免用户加载到过期资源。'
      ],
      bad: [
        { say: '帮我做个能离线打开的页面', why: '没说哪些资源离线、接口怎么办，AI 可能全缓存导致数据不更新。' }
      ]
    },
    misconceptions: [
      'PWA 就是能加个图标？核心是离线能力和可靠加载，图标只是表面。',
      'Service Worker 缓存了就不管更新？必须设计版本和清理策略，否则改代码不生效。'
    ],
    related: ['caching', 'web-storage', 'lazy-loading']
  },

  {
    id: 'font-loading',
    en: 'Font Loading & FOIT/FOUT',
    zh: '字体加载策略',
    aliases: ['字体加载', 'FOIT', 'FOUT', 'font-display', 'web font'],
    cat: 'frontend',
    tags: ['性能', '字体'],
    level: 'advanced',
    summary: '网页字体没加载完时文字要么隐形（FOIT）要么闪变（FOUT）：用 font-display: swap 和字体子集来缓解。',
    plain: [
      '用自定义网页字体（web font）时，浏览器要下载字体文件才能渲染成目标字体。加载期间两种现象：FOIT（文字隐形，等字体到才显示）和 FOUT（先用备用字体显示，字体到了再切换，导致文字「闪变」）。',
      'CSS 的 font-display 控制策略：swap 让文字先显示备用字体（可读优先，代价是可能闪变）；optional/fallback 权衡等待时间。配套优化：字体子集化（只打包用到的字符）、woff2 压缩、preload 关键字体。',
      '跟 AI 说「中文字体太大，请子集化并按需加载，font-display 用 swap」，它给的方案兼顾速度和可读；说「加个字体」它可能整包引入，首屏瞬间多几百 KB。'
    ],
    analogy: '字体加载像餐厅点菜：FOIT 是服务员说「等菜做好才能动筷」（饿着等）；FOUT 是「先上普通餐具用着，主菜来了再换」（先用着，换的时候手忙脚乱）——swap 策略就是先上普通餐具。',
    talk: {
      good: ['自定义字体加 font-display: swap，避免文字隐形等待。', '中文字体请子集化加载，只包含页面用到的字符。'],
      bad: [
        { say: '首屏文字不显示/闪一下', why: '这是字体加载策略问题；不点破 FOIT/FOUT，AI 可能查半天别的原因。' }
      ]
    },
    misconceptions: [
      '字体加载不影响性能？整包中文字体可能 1-2MB，对首屏是巨大负担。',
      'FOUT 能完全避免？swap 只是优先可读，闪变仍可能；用 optional 才更保守。'
    ],
    related: ['performance-core-web-vitals', 'image-formats', 'typography']
  },

  {
    id: 'utility-css',
    en: 'Utility-First CSS (Tailwind)',
    zh: '原子化 CSS',
    aliases: ['Tailwind', '原子化', 'utility-first', '工具类'],
    cat: 'frontend',
    tags: ['CSS', '工程'],
    level: 'advanced',
    summary: '用一堆单功能类（text-sm、p-4、flex）直接在 HTML 里拼样式：不用再想 class 名，但要克制。',
    plain: [
      '原子化/工具类优先（Tailwind 是代表）：预置大量单功能类（p-4 表示 padding: 1rem，text-red-500 表示颜色），直接在 HTML 里组合，不再为每个组件写专属 CSS 类。好处：不用起名、样式局部可预测、按需生成体积小。',
      '代价：HTML 里类名很长、视觉和结构混在一起、团队要遵守统一的间距/颜色/字号体系（设计令牌）。它是「把设计系统做成类名」的方案，适合对设计系统有约束的团队。',
      '跟 AI 说「用 Tailwind，间距用 p-4，颜色用主题色 token」，它能写出符合体系的代码；说「帮我写 CSS」它可能用传统类名或乱用魔改数值，破坏设计体系。'
    ],
    analogy: '原子化 CSS 像乐高：都是标准积木块（p-4、flex、text-sm），拼出任何造型；传统 CSS 则像手工木匠，每件家具都量身定制——乐高快、统一，但造型风格会被积木规格限制。',
    talk: {
      good: [
        '用 Tailwind 工具类实现这个卡片，间距用 p-4、圆角用 rounded-lg。',
        '请遵守项目设计令牌，颜色用 theme 里的 token 而不是随意色值。'
      ],
      bad: [
        { say: '这个组件样式写得乱', why: '没说是混用 Tailwind 和自定义 CSS 还是命名乱，AI 需要先猜要往哪套体系收敛。' }
      ]
    },
    misconceptions: [
      'Tailwind 就是写内联样式？它是受控的类名系统，值和设计令牌绑定，不是裸内联。',
      '用了 Tailwind 就不写 CSS？复杂交互和关键帧动画仍可能要自定义 CSS。'
    ],
    related: ['css-naming-methodology', 'primary-color', 'component']
  },

  {
    id: 'iframe',
    en: 'Iframe',
    zh: '内嵌框架',
    aliases: ['iframe', '嵌入', '内联框架'],
    cat: 'frontend',
    tags: ['HTML', '集成'],
    level: 'common',
    summary: 'iframe 在页面里嵌入另一个文档：适合第三方内容隔离，但要防点击劫持和性能开销。',
    plain: [
      'iframe 在页面里开一个「窗口」嵌入另一个页面：嵌入视频、地图、支付、第三方小工具都用它。优点：天然隔离——内部页面崩溃、样式、JS 都影响不到宿主，跨域通信靠 postMessage。',
      '代价：每个 iframe 都独立加载资源，容易拖慢页面；SEO 不友好；还有安全风险——被钓鱼站点嵌入（点击劫持）需要用 X-Frame-Options 或 CSP 的 frame-ancestors 禁止。',
      '跟 AI 说「这个支付页用 iframe 嵌入，宿主通过 postMessage 接收结果」，它知道跨域通信方式；说「嵌个第三方页面」它可能忽略安全头或忘了通信机制。'
    ],
    analogy: 'iframe 像展厅里摆的展柜：展柜里的展品（第三方页面）有自己的灯和玻璃罩，碰不到外面的展品，但要给展柜留地方（资源）和安保（防点击劫持）。',
    talk: {
      good: [
        '嵌入第三方页面时请设置 sandbox 和 X-Frame-Options，防点击劫持。',
        'iframe 和宿主跨域通信，用 postMessage 并校验消息来源。'
      ],
      bad: [
        { say: '页面里嵌个东西', why: '没说嵌入什么、要不要交互通信、安全要求，AI 可能忽略安全配置。' }
      ]
    },
    misconceptions: [
      'iframe 越多页面越丰富？每个 iframe 独立加载资源，滥用会明显拖慢页面。',
      'iframe 内容随便嵌？被恶意站点嵌套可形成点击劫持，需要安全头防护。'
    ],
    related: ['performance-core-web-vitals', 'html-semantic', 'cors']
  },

  {
    id: 'event-object',
    en: 'Event Object & Default Behavior',
    zh: '事件对象与默认行为',
    aliases: ['事件对象', 'preventDefault', 'stopPropagation', 'event'],
    cat: 'frontend',
    tags: ['事件', '交互'],
    level: 'common',
    summary: '事件对象带着 target 等信息；preventDefault 拦默认行为（跳转、提交），stopPropagation 拦事件继续冒泡。',
    plain: [
      '每次事件触发，回调会收到一个事件对象，里面有 target（触发元素）、currentTarget（监听元素）、type（事件类型）、keyCode（按键）、clientX/Y（坐标）等。处理交互几乎都要用到它。',
      '两个常被混淆的方法：preventDefault() 阻止浏览器默认行为（点链接不跳转、提交表单不刷新、右键不出菜单），不阻止冒泡；stopPropagation() 阻止事件继续向上冒泡（防止触发父级监听），不阻止默认行为。',
      '跟 AI 说「点提交按钮用 preventDefault 阻止页面刷新，再走 AJAX」它写对；说「点击没反应」它可能把 preventDefault 和 stopPropagation 用混。排查时先分清是默认行为还是冒泡问题。'
    ],
    analogy: '事件对象像事故现场的报告单：谁撞的（target）、在哪撞的（坐标）、什么事故（type）；preventDefault 是当场叫停「不许按原流程走」（不跳转、不提交），stopPropagation 是「别往上级汇报了」（不冒泡）。',
    talk: {
      good: [
        '表单提交时 preventDefault 阻止刷新，然后发请求。',
        '点这个按钮时 stopPropagation，避免触发外层容器的点击事件。'
      ],
      bad: [
        { say: '点击事件总是触发两次', why: '多半是冒泡；不点破，AI 可能乱加 preventDefault 而没解决冒泡问题。' }
      ]
    },
    misconceptions: [
      'preventDefault 能阻止冒泡？不能，两者职责不同，要分开用。',
      '事件对象只有坐标？还有 target、type、key、按键修饰符等一堆信息。'
    ],
    related: ['event-bubbling-delegation', 'form', 'button']
  },

  {
    id: 'rendering-blocking',
    en: 'Rendering-Blocking Resources',
    zh: '渲染阻塞资源',
    aliases: ['渲染阻塞', '阻塞资源', 'defer', 'async', 'render-blocking'],
    cat: 'frontend',
    tags: ['性能', '加载'],
    level: 'advanced',
    summary: 'CSS 和普通 script 会卡住首屏渲染：CSS 必须等、JS 可用 defer/async 延后，白屏往往就是它们。',
    plain: [
      '浏览器渲染页面时：head 里的 CSS 是渲染阻塞的——没下载解析完就不画首屏（避免闪变）；普通 script 也是阻塞的——执行完才继续解析后续 HTML。这就是「白屏好久」的常见原因。',
      '对策：CSS 尽量小、关键内联；JS 默认放 body 末尾或用 defer（等 HTML 解析完再执行，保持顺序）/async（下载完就执行，不保证顺序）。首屏不需要的脚本一律延后。',
      '跟 AI 说「首屏白屏时间长，检查渲染阻塞资源，脚本改 defer」，它知道往哪查；说「页面加载慢」它可能只想到压缩图片，漏了阻塞脚本这个大头。'
    ],
    analogy: '渲染阻塞像餐厅上菜流程：CSS 是「必须先摆好桌椅」（不摆好不开门），script 是「每次上菜前先停下听一段广播」（听完才继续上菜）——广播（脚本）能改到吃完再放（defer），首屏自然快。',
    talk: {
      good: [
        '首屏性能差，请把所有非必要 script 加 defer，关键的放 body 末尾。',
        '首屏 CSS 精简并内联关键样式，减少渲染阻塞。'
      ],
      bad: [
        { say: '页面白屏很久', why: '很可能是渲染阻塞资源；不点破 AI 可能优化半天图片而没动脚本加载方式。' }
      ]
    },
    misconceptions: [
      '脚本放 head 和放 body 末尾没区别？head 里普通脚本会阻塞后续解析，差别很大。',
      'defer 和 async 一样？defer 保序且等解析完，async 下载完立即执行、不保序。'
    ],
    related: ['performance-core-web-vitals', 'lazy-loading', 'reflow-repaint']
  },

  {
    id: 'display-property',
    en: 'Display Property & Box Types',
    zh: 'display 与盒型',
    aliases: ['display', '块级', '行内', 'inline-block', '盒型'],
    cat: 'frontend',
    tags: ['CSS', '盒模型'],
    level: 'core',
    summary: 'display 决定元素的盒型：block 独占一行、inline 排成一行、inline-block 两者兼顾，是布局错乱的常见源头。',
    plain: [
      'display 是 CSS 最基础的开关之一：block（块级）独占一行、宽高生效（div、p）；inline（行内）在一行里排、宽高和上下 margin 不生效（span、a）；inline-block 既排一行又支持宽高（常见于按钮图标混排）。',
      '布局错乱常因盒型误解：给 inline 元素设 width 无效、行内元素之间出现莫名空隙（换行符产生的空白）、display:none 和 visibility:hidden 的区别（前者不占位后者占位）。',
      'flex/grid 是现代布局主力，但 display 的理解仍是排查基础。跟 AI 说「这个 inline 元素设宽高没生效，改成 inline-block 或 flex 子项」，它一眼定位；说「样式没生效」它得先猜是不是盒型问题。'
    ],
    analogy: 'display 像排队方式：block 是每人单独一排（占一行），inline 是大家挤成一排往前走（一行多个人），inline-block 是并排走但每个人都有自己的一亩三分地（宽高生效）。',
    talk: {
      good: [
        '给这个行内元素设置宽高没生效，请改为 inline-block 或 flex。',
        '隐藏这个元素但保留占位，用 visibility: hidden 而不是 display: none。'
      ],
      bad: [
        { say: '宽度设置了没反应', why: '多半是盒型问题（inline 元素）；不点破，AI 可能调半天 width 数值。' }
      ]
    },
    misconceptions: [
      'visibility: hidden 和 display: none 一样？前者占位、后者不占位，影响布局。',
      'inline 元素能设 margin 和 padding？水平方向可以，垂直方向和宽高不行。'
    ],
    related: ['css-box-model', 'css-inheritance', 'flex-grid']
  },

  {
    id: 'gradient',
    en: 'Gradient',
    zh: '渐变',
    aliases: ['线性渐变', '径向渐变', '锥形渐变', '渐变色', '渐变文字', 'linear-gradient', 'radial-gradient'],
    cat: 'frontend',
    tags: ['CSS', '视觉'],
    level: 'common',
    summary: '颜色间的平滑过渡：linear 沿方向、radial 从中心、conic 绕一圈，背景按钮文字全能用。',
    plain: [
      'CSS 渐变本质是「图片」不是「颜色」：在 background 上写 linear-gradient(135deg, #0A5548, #52C3AC)，得到的是一张会随容器伸缩的渐变图。三种基本形态：linear 沿一个方向、radial 从中心晕开（光晕/暗角）、conic 绕轴旋转（饼图/色环）。',
      '高频应用三件：按钮与 Banner 底色；图片压字遮罩（渐变叠透明色，保白字可读）；渐变文字（background-clip: text 配透明文字色）。实物都在图鉴「渐变」和「渐变遮罩」条目里。',
      '沟通纪律：说「加个渐变」必须带方向与两端颜色（「左上到右下，深绿到浅绿」），只说「高级感的那种渐变」AI 只能自由发挥。另一个易混词：过渡（transition）是动画过程，渐变（gradient）是颜色形态——说「渐变效果」AI 可能理解成过渡动画。'
    ],
    analogy: '渐变像日出：linear 是天边从东到西依次亮起（有方向），radial 是太阳周围一圈圈晕开（有中心），conic 是色带绕着太阳转一整圈（有轴）。',
    talk: {
      good: [
        '主按钮底色用 135 度线性渐变：起点 #0A5548，终点 #52C3AC，hover 两端各加深一档。',
        'Banner 底图压一层线性渐变：底部 rgba(0,0,0,.6) 渐到透明，保证白色标题可读。'
      ],
      bad: [
        { say: '做个渐变效果', why: '方向、颜色、用在哪都没说；且「渐变」易被理解成过渡动画（transition），要说清是颜色渐变。' }
      ]
    },
    misconceptions: [
      '渐变很耗性能？静态渐变图几乎零成本；把大面积渐变做成动画（如移动 background-position）才需要掂量。'
    ],
    related: ['css-transition', 'interactive-states']
  },

  {
    id: 'opacity',
    en: 'Opacity',
    zh: '透明度',
    aliases: ['不透明度', '半透明', 'alpha', 'rgba', '透明色'],
    cat: 'frontend',
    tags: ['CSS', '视觉'],
    level: 'core',
    summary: '元素的透与不透：100% 全实、40% 退后——禁用置灰、遮罩压暗、阴影过渡全靠它。',
    plain: [
      'opacity 取值 0-1：1 全实、0.7 微透、0.4 明显退后。它作用于整个元素（连同文字一起变透）；只想透背景不动文字，用 RGBA/HSLA 颜色的 alpha 位：background: rgba(0,0,0,.5)。十六进制也能带 alpha：#0E6B5B80 末两位 80 约等于 50% 透明。',
      '常见约定：禁用态整体 40% 透明、弹窗遮罩黑 50%、阴影里的黑色永远带 alpha。这些数值没写进需求时，AI 多半直接不做——主动说。',
      '两个易踩点：opacity: 0 的元素仍占位、仍拦截点击（要配合 visibility 或 pointer-events:none）；动画 opacity 性能极好（走合成器不触发重排），是少数可以放心做动画的属性。'
    ],
    analogy: 'opacity 像玻璃门贴膜：贴整面（opacity）连门上贴的字都半透；只贴玻璃不动字（rgba 的 alpha 位）字依旧清晰。',
    talk: {
      good: [
        '禁用按钮：整体 opacity 0.4，去掉 hover 动效。',
        '弹窗遮罩：背景 rgba(0,0,0,0.5)，注意弹窗内容不要跟着变透。'
      ],
      bad: [
        { say: '做透明一点', why: '整元素透明还是只透背景（opacity 与 rgba 的分工）、透多少，不说清 AI 只能拍脑袋。' }
      ]
    },
    misconceptions: [
      'opacity: 0 就是隐藏？元素还在原位占空间、还能接到点击；真隐藏要 display:none 或配合 visibility。'
    ],
    related: ['interactive-states', 'display-property']
  },

  {
    id: 'favicon',
    en: 'Favicon',
    zh: '网站图标',
    aliases: ['站点图标', '标签页图标', '收藏夹图标'],
    cat: 'frontend',
    tags: ['浏览器', '基础概念'],
    level: 'common',
    summary: '浏览器标签页上代表网站的小图标：16px 里也要一眼认出你是谁。',
    plain: [
      'favicon 出现在浏览器标签页、收藏夹、历史记录和手机主屏上，是网站最小的一张脸。接入只要一行：<link rel="icon" href="/favicon.ico">；现代做法是多尺寸各配一份（16/32 常规 + 180 的 apple-touch-icon），再配一份 SVG 版本自动适配明暗主题。',
      '设计要点：16px 里也要认得出，只留最简图形或首字母，别把完整 Logo 硬缩进去；文件放站点根目录，浏览器会默认来取。没有它，多标签页工作流里你的网站就是一枚灰色地球，找都找不回。',
      '给 AI 的句式：「favicon 用首字母 S 白底绿字：SVG 主体 + ico 兜底 + apple-touch-icon 180px，放站点根目录」。'
    ],
    analogy: 'favicon 像工牌上的大头照：方寸之间只够放一张脸，放全身照谁也认不出你。',
    talk: {
      good: [
        '补一个 favicon：SVG 主体 + ico 兜底 + apple-touch-icon 180px，图案用现有 Logo 的单色简化版。'
      ],
      bad: [
        { say: '加个网站图标', why: '不说图形与尺寸策略，AI 可能直接塞一张大图，16px 下糊成一团。' }
      ]
    },
    misconceptions: [
      'favicon 必须是 .ico 文件？现代浏览器支持 PNG/SVG，ico 只是兼容兜底；但根目录放一份 favicon.ico 仍是省心做法。'
    ],
    related: ['viewport-meta']
  },

  {
    id: 'fab',
    en: 'Floating Action Button',
    zh: '悬浮按钮',
    aliases: ['FAB', '浮动按钮', '悬浮操作按钮'],
    cat: 'frontend',
    tags: ['UI 组件', '基础控件'],
    level: 'common',
    summary: '悬浮在内容之上、常驻屏幕角落的圆形主操作按钮，代表页面最核心的一个动作。',
    plain: [
      '悬浮按钮（FAB）是 Material Design 推广开来的模式：一个圆形按钮浮在内容之上，常驻屏幕右下角（或左下角），代表当前页面最核心的一个动作——写邮件、发动态、新建文档。它的视觉权重很高，因为它浮在一切之上。',
      '使用铁律：一屏只放一个 FAB，它是动作不是导航。别把返回、菜单、设置塞进 FAB——那些是导航，不是核心动作。FAB 的图标要一眼看懂（+号代表新建、铅笔代表编辑），文案放在 tooltip 里。给 AI 的描述要包含：位置、图标、点击行为、是否需要展开成子菜单。'
    ],
    analogy: 'FAB 像餐厅桌上的呼叫铃——只有一个，按了就有人来，你不会在桌上放三四个铃让客人猜哪个是叫服务员的。',
    talk: {
      good: [
        '右下角放一个 FAB，+号图标，点击展开三个子操作：新建文章、上传图片、发布动态，子操作带文字标签。'
      ],
      bad: [
        { say: '加个悬浮按钮', why: '没说位置、图标、点击行为，AI 可能放一个返回按钮在右下角，或者做成导航菜单。' }
      ]
    },
    misconceptions: [
      'FAB 可以放多个？一屏一个 FAB 是铁律，多个 FAB 会让用户不知道哪个是核心动作。',
      'FAB 可以当返回按钮用？FAB 是动作不是导航，返回是导航行为，用左上角返回箭头或手势。'
    ],
    related: ['button', 'icon-button', 'tooltip']
  },
  {
    id: 'input-number',
    en: 'Input Number',
    zh: '数字输入框',
    aliases: ['数字输入', '步进器', 'Stepper', '数字框'],
    cat: 'frontend',
    tags: ['UI 组件', '表单'],
    level: 'common',
    summary: '只能输入数字的输入框，常配 +/- 步进按钮，可限定范围与步长。',
    plain: [
      '数字输入框是文本输入框的特化版：只接受数字输入，常配左右 +/- 按钮（步进器），可以限定最小值、最大值和步长（step）。数量、份数、价格、年龄等精确数值输入用它。',
      '与滑块的分工：数字输入框适合「精确取值」（我要 exactly 3 件），滑块适合「感受区间」（音量大概 60%）。工程要点：超出范围要即时提示（不能输入超过 max 的值，或输入后标红），小数位数要固定（价格保留 2 位），步进按钮长按可以连续增减。给 AI 描述时必须说清 min/max/step 和小数位数。'
    ],
    analogy: '数字输入框像银行取款机的金额输入——只能输数字，有最低取款额和最高限额，按一下 +100 快捷按钮就是步进。',
    talk: {
      good: [
        '做一个数量输入框，min=1 max=99 step=1，右侧配 +/- 步进按钮，整数，超过范围时按钮置灰禁用。'
      ],
      bad: [
        { say: '加个数字框', why: '没说范围、步长、小数位数、是否有步进按钮，AI 只能生成一个普通输入框。' }
      ]
    },
    misconceptions: [
      '数字输入框和滑块可以互换？精确取值用数字输入框，感受区间用滑块，两者场景不同。',
      '数字输入框不需要范围限制？不限制 min/max 会导致用户输入无效值（如数量 -5），必须限定。'
    ],
    related: ['text-input', 'slider', 'select-dropdown']
  },
  {
    id: 'tab-bar',
    en: 'Tab Bar',
    zh: '底部标签栏',
    aliases: ['底部导航', 'Bottom Navigation', '底部选项卡', '标签栏'],
    cat: 'frontend',
    tags: ['UI 组件', '导航'],
    level: 'common',
    summary: 'App 底部的一排平级入口，3-5 个图标配文字，是移动端应用的第一导航。',
    plain: [
      '底部标签栏（Tab Bar / Bottom Navigation）是移动端 App 的标准导航模式：屏幕底部一排 3-5 个平级入口，每个入口是图标+文字，当前选中项高亮（强调色）。它是 App 的第一导航——用户打开 App 第一眼看到的就是它。',
      '设计规则：3-5 个入口（少于 3 个没必要用标签栏，多于 5 个放不下且难点击）；每个入口必须图标+文字（纯图标用户猜不出含义）；当前项用强调色高亮；切换标签时保留各标签页的状态（如列表滚动位置、表单输入内容）。更深的层级收进「我的」页，不要往标签栏里硬塞。给 AI 描述时要说清入口数量、每个入口的图标和文字、选中态样式。'
    ],
    analogy: '底部标签栏像电视遥控器的频道切换键——固定几个常用频道，按一下就切，你不会把所有 100 个频道都做成按钮。',
    talk: {
      good: [
        '底部标签栏 4 个入口：首页（房子图标）、发现（指南针）、消息（气泡，带未读徽标）、我的（人头），选中态用主题色 #0e6b5b，图标+文字。'
      ],
      bad: [
        { say: '做个底部导航', why: '没说几个入口、每个入口的图标和文字、选中态样式，AI 只能生成一个空的底部栏。' }
      ]
    },
    misconceptions: [
      '底部标签栏可以放 6-7 个入口？超过 5 个入口点击区域太小容易误触，且用户记不住，多余入口收进「我的」页。',
      '底部标签栏可以只放图标？纯图标用户猜不出含义，必须配文字，尤其是非通用图标。'
    ],
    related: ['tabs', 'navbar', 'sidebar', 'badge']
  },
  {
    id: 'statistic',
    en: 'Statistic',
    zh: '数值统计',
    aliases: ['指标卡', 'KPI 数字', '数据卡片', '统计数字'],
    cat: 'frontend',
    tags: ['UI 组件', '数据展示'],
    level: 'common',
    summary: '突出展示一个关键数字的卡片：大号数值+标题+可选的环比变化，是仪表盘的基本单元。',
    plain: [
      '数值统计（Statistic）是仪表盘和数据看板的基本单元：一张卡片里突出展示一个关键数字，配标题说明这个数字是什么，可选地显示环比/同比变化（涨跌箭头+百分比）。常见于后台首页、数据大屏、经营看板。',
      '设计要点：数字是视觉焦点（字号最大，通常 24-48px），标题是小字说明，变化指标用颜色区分涨跌（涨=绿或红取决于行业，跌=相反色）；单位要小（如「万元」「%」放在数字右下角小字）；数字可以带动画（从 0 滚动到目标值）增加数据感。给 AI 描述时要说清：数字是什么、单位、是否有环比、涨跌色规则、是否有滚动动画。'
    ],
    analogy: '数值统计卡像汽车仪表盘的速度表——一个大数字告诉你当前速度，旁边的小指示灯告诉你油耗变化，你不会把速度、转速、油量全挤在一个表里。',
    talk: {
      good: [
        '做一个今日销售额统计卡：大号数字 ¥128,560（千分位），标题「今日销售额」，右下角小字「万元」，下方环比 +12.5% 绿色上升箭头，数字从 0 滚动到目标值。'
      ],
      bad: [
        { say: '放个数据卡片', why: '没说数字是什么、单位、格式、是否有环比、涨跌色，AI 只能生成一个有数字的空卡片。' }
      ]
    },
    misconceptions: [
      '统计卡可以放多个数字？一张统计卡聚焦一个关键指标，多个指标拆成多张卡，否则用户抓不住重点。',
      '涨跌颜色是固定的？金融行业涨=红跌=绿（A股惯例），其他行业通常涨=绿跌=红，要按行业惯例来。'
    ],
    related: ['card', 'table', 'progress-bar']
  },
  {
    id: 'masonry',
    en: 'Masonry',
    zh: '瀑布流',
    aliases: ['瀑布流布局', '卡片流', 'Waterfall', 'Masonry Layout'],
    cat: 'frontend',
    tags: ['UI 组件', '数据展示', '布局'],
    level: 'common',
    summary: '列宽固定、卡片高度不定的多列布局，新卡片填入最短列，图片高矮不一时也不会出现大片空洞。',
    plain: [
      '瀑布流（Masonry）是一种多列布局：每列宽度固定，但每张卡片高度由内容决定（图片高矮不一），新卡片总是填入当前最短的列，从而保证整体视觉平衡，不会出现某一列特别长、其他列大片空白的情况。Pinterest、小红书、花瓣网是典型代表。',
      '适用场景：图片高矮不一的内容流（图片社区、电商推荐、笔记流）。不适用：需要精确对齐的表格数据、需要快速扫描对比的列表。交互要点：滚动到底部自动加载下一页（无限滚动），加载中显示骨架屏或 loading；图片加载前要占位（防止布局跳动）。给 AI 描述时要说清：列数、列宽、间距、是否无限滚动、图片加载占位方案。'
    ],
    analogy: '瀑布流像砌墙时把长短不一的砖块填入最矮的位置——墙始终是平的，不会出现一边高一边低。',
    talk: {
      good: [
        '做一个 3 列瀑布流布局，列宽固定 280px，列间距 16px，卡片圆角 12px，图片加载前用灰色占位，滚动到底部自动加载下一页。'
      ],
      bad: [
        { say: '做个图片列表', why: '没说布局方式（瀑布流还是网格）、列数、间距、加载方式，AI 可能生成一个普通网格布局。' }
      ]
    },
    misconceptions: [
      '瀑布流和网格布局是一回事？网格布局每行高度一致（对齐），瀑布流每列高度不一（填最短列），图片高矮不一时瀑布流更美观。',
      '瀑布流可以用纯 CSS 实现？CSS columns 可以实现但有兼容性和顺序问题，生产环境通常用 JS 库（如 Masonry.js）或 CSS grid + JS 计算。'
    ],
    related: ['card', 'list-view', 'lazy-loading', 'skeleton-screen']
  },
  {
    id: 'social-proof',
    en: 'Social Proof',
    zh: '社会证明',
    aliases: ['用户评价', '口碑区', '信任背书', '用户证言', 'Social Proof Section'],
    cat: 'frontend',
    tags: ['UI 组件', '数据展示', '营销'],
    level: 'common',
    summary: '用「别人都信它」说服访客的版块族：用户数、客户 Logo 墙、星级评分与真实好评卡，是官网落地页的标配。',
    plain: [
      '社会证明（Social Proof）是营销型页面的信任建立模块：用「其他人都在用、都在夸」来说服访客采取行动。常见形式包括：用户数/下载量数字、客户 Logo 墙（我们服务过哪些公司）、星级评分+好评数量、真实用户评价卡（头像+姓名+职位+评价内容）、媒体报道引用。',
      '设计要点：数字必须真实可查（编出来的信任感被发现后塌得更快）；好评卡要显示头像+姓名+职位（匿名好评可信度低）；客户 Logo 墙通常灰度显示（避免抢主视觉，hover 时变彩色）；评分星级要和数字一起出现（4.9分 + 2,341条评价）。给 AI 描述时要说清：用哪种形式、数据来源、是否真实、展示几条评价。'
    ],
    analogy: '社会证明像餐厅门口的排队人群——你不知道哪家好吃，但看到某家排了长队，就觉得「这么多人选应该不会错」。',
    talk: {
      good: [
        '做一个社会证明区：上方「已有 50,000+ 开发者使用」大数字，中间 8 个客户 Logo 灰度排列，下方 3 张用户评价卡（头像+姓名+职位+5星+评价文字）。'
      ],
      bad: [
        { say: '加个用户评价区', why: '没说用哪种形式（数字/Logo/评价卡）、数据、展示几条，AI 只能生成一个空的评价区域。' }
      ]
    },
    misconceptions: [
      '社会证明的数据可以编？编数据被发现后信任崩塌更快，且可能涉及虚假宣传违法，必须用真实可查的数据。',
      '好评卡可以只放文字不放头像？匿名好评可信度极低，必须有头像+姓名+职位才有说服力。'
    ],
    related: ['card', 'avatar', 'star-rating', 'statistic']
  },
  {
    id: 'overlay',
    en: 'Overlay / Scrim',
    zh: '遮罩层',
    aliases: ['蒙层', '遮罩', '幕布', '半透明遮罩', 'Scrim'],
    cat: 'frontend',
    tags: ['UI 组件', '浮层'],
    level: 'common',
    summary: '盖在页面上的半透明暗层，把注意力压给浮层；它一出现，下面的内容暂时失焦且不可点击。',
    plain: [
      '遮罩层（Overlay / Scrim）是浮层组件的「配角」：一层半透明的暗色蒙层盖在页面内容之上，把用户的注意力「压」给上方的浮层（模态框、抽屉、底部面板等）。它一出现，下面的内容就暂时失焦且不可点击（pointer-events 被遮罩拦截）。',
      '两个关键设计决策：① 遮罩透明度——通常 0.4-0.6，太浅压不住注意力，太深像页面坏了；② 点遮罩能否关闭——查看类弹窗（图片预览、详情）可以点遮罩关闭，表单类/危险操作类弹窗不能点遮罩关闭（防止误操作丢失输入）。遮罩出现时通常伴随淡入动画（150-200ms），页面背景滚动要锁定（防止背景跟着滚）。给 AI 描述浮层时必须说清遮罩行为。'
    ],
    analogy: '遮罩层像舞台上的追光暗场——灯光暗下来，只有主角被照亮，观众的注意力自然集中到主角身上，台下的一切暂时「消失」了。',
    talk: {
      good: [
        '做一个图片预览模态框：遮罩 rgba(0,0,0,0.7)，点遮罩可关闭，出现时背景锁定滚动，图片居中显示，右上角有关闭按钮。'
      ],
      bad: [
        { say: '做个弹窗', why: '没说遮罩透明度、点遮罩能否关闭、背景是否锁定滚动，AI 可能生成一个没有遮罩的弹窗或点遮罩不关闭的表单弹窗。' }
      ]
    },
    misconceptions: [
      '遮罩只是装饰？遮罩有实际功能：拦截背景点击、锁定注意力、防止误操作背景内容，不是纯装饰。',
      '所有弹窗点遮罩都能关闭？表单类和危险操作类弹窗不能点遮罩关闭（防止误操作丢失输入），只有查看类可以。'
    ],
    related: ['modal', 'drawer', 'bottom-sheet', 'confirm-dialog']
  },
  {
    id: 'bottom-sheet',
    en: 'Bottom Sheet / Action Sheet',
    zh: '底部动作面板',
    aliases: ['底部弹层', '动作面板', '半屏弹窗', 'Action Sheet', '底部抽屉'],
    cat: 'frontend',
    tags: ['UI 组件', '浮层'],
    level: 'common',
    summary: '从屏幕底部升起的面板：一列动作选项或半屏内容，是移动端替代桌面下拉菜单和右键菜单的标准模式。',
    plain: [
      '底部动作面板（Bottom Sheet / Action Sheet）从屏幕底部升起，有两种形态：① 动作列表型——一列操作选项（拍照、从相册选择、删除），取消按钮单独一行、加粗、在最下面；② 内容型——承载半屏内容（地图选点、分享面板、筛选条件），顶部有拖拽条可上下拖动调整高度。',
      '它是移动端替代桌面端下拉菜单和右键菜单的标准模式——手机屏幕小，从底部升起的面板拇指够得着。交互规则：有遮罩（点遮罩关闭）、支持下滑关闭、顶部有拖拽条（内容型）、动作列表型的取消按钮必须在最下面且加粗。给 AI 描述时要说清：动作列表型还是内容型、有哪些选项、取消按钮位置、是否支持拖拽调整高度。'
    ],
    analogy: '底部动作面板像餐厅的菜单本——从桌子底下抽上来，你选一个菜就推回去，「不要了」（取消）永远在最下面。',
    talk: {
      good: [
        '点击头像弹出底部动作面板：三个选项「查看资料」「更换头像」「取消」，取消加粗在最下面，有遮罩，支持下滑关闭，选项带图标。'
      ],
      bad: [
        { say: '弹个操作菜单', why: '没说是底部面板还是下拉菜单、有哪些选项、取消在哪，AI 可能生成一个桌面端下拉菜单而不是移动端底部面板。' }
      ]
    },
    misconceptions: [
      '底部面板和抽屉是一回事？抽屉从侧边滑出（PC端常用），底部面板从底部升起（移动端专用），平台和交互不同。',
      '底部面板的取消按钮可以放上面？取消必须在最下面且加粗，这是 iOS/Android 的标准模式，放上面用户找不到。'
    ],
    related: ['overlay', 'modal', 'drawer', 'dropdown-menu']
  },
  {
    id: 'command-palette',
    en: 'Command Palette',
    zh: '命令面板',
    aliases: ['快捷指令面板', 'Spotlight', '全局搜索', '⌘K', 'Ctrl+K', '命令面板'],
    cat: 'frontend',
    tags: ['UI 组件', '浮层', '效率工具'],
    level: 'common',
    summary: 'Ctrl/⌘+K 唤出的全局操作框：输入即过滤页面、动作与设置，方向键选择、回车执行，是效率工具的标配入口。',
    plain: [
      '命令面板（Command Palette）是效率工具的标配入口：按 Ctrl+K（Windows）或 ⌘+K（Mac）唤出一个居中的搜索框，输入关键词即实时过滤页面、动作、设置、命令等结果，方向键上下选择、回车执行。VS Code、Linear、Notion、Slack 都有这个模式。',
      '设计要点：唤起快捷键要在界面上提示（搜索框里写「⌘K 搜索」）；支持模糊搜索（输「del」能匹配「删除」「Delete」）；最近使用的排在前面；结果分组（页面/动作/设置）；选中项高亮；执行后自动关闭。它是「快捷键+搜索+菜单」的三合一，让高级用户不用鼠标就能完成大部分操作。给 AI 描述时要说清：唤起快捷键、搜索范围、结果分组、是否支持模糊搜索。'
    ],
    analogy: '命令面板像汽车的语音助手——按一个键说「导航到公司」「播放音乐」「打开空调」，不用在各个菜单里翻找，一句话直达。',
    talk: {
      good: [
        '做一个 ⌘K 命令面板：居中搜索框，输入即过滤页面、动作、设置三类结果，支持模糊搜索，最近使用排前面，方向键选择回车执行，搜索框占位符写「搜索页面、动作或设置 ⌘K」。'
      ],
      bad: [
        { say: '加个全局搜索', why: '没说唤起方式、搜索范围、结果形式、快捷键，AI 可能生成一个普通搜索框而不是命令面板。' }
      ]
    },
    misconceptions: [
      '命令面板就是搜索框？普通搜索框只搜内容，命令面板搜页面+动作+设置+命令，且支持快捷键唤起和键盘操作，是效率工具不是普通搜索。',
      '命令面板不需要快捷键提示？不提示用户不知道有这个功能，搜索框里必须写「⌘K」或「Ctrl+K」提示。'
    ],
    related: ['search-input', 'modal', 'overlay', 'dropdown-menu']
  },
  {
    id: 'image',
    en: 'Image / Figure',
    zh: '图片',
    aliases: ['图片展示', '配图', '图片组件', 'Figure'],
    cat: 'frontend',
    tags: ['UI 组件', '媒体'],
    level: 'core',
    summary: '图片展示组件：需约定宽高比、圆角、加载失败兜底与 alt 文字，懒加载是标配。',
    plain: [
      '图片是页面里最占视觉权重的元素之一，但也是最容易被忽略细节的地方。一个专业的图片组件需要约定：宽高比（16:9、4:3、1:1，不要让图片自己撑高度导致布局跳动）、圆角（全站统一）、加载失败兜底（占位图+alt文字）、懒加载（滚动到可视区域再加载，节省带宽）、响应式（不同屏幕加载不同分辨率的图）。',
      '工程要点：图片加载前必须占位（用宽高比容器+背景色，防止布局跳动 CLS）；alt 文字要描述图片内容（无障碍+SEO），装饰性图片 alt=""；大图用渐进式加载（先模糊小图再清晰大图）；支持点击放大（灯箱）。给 AI 描述图片组件时必须说清：宽高比、圆角、加载占位、失败兜底、是否懒加载、是否支持点击放大。'
    ],
    analogy: '图片组件像画框——画的尺寸是固定的（宽高比），画框样式统一（圆角），画还没挂上去时墙上有个占位（占位图），不会让墙空一块。',
    talk: {
      good: [
        '做一个文章封面图组件：16:9 宽高比，圆角 12px，加载前灰色占位+微光动画，加载失败显示「图片加载失败」占位图，懒加载，点击可放大查看。'
      ],
      bad: [
        { say: '放张图片', why: '没说宽高比、圆角、加载占位、失败兜底、懒加载，AI 只能生成一个 img 标签，图片加载时布局会跳。' }
      ]
    },
    misconceptions: [
      '图片不需要占位？图片加载前不占位会导致布局跳动（CLS），影响用户体验和 SEO，必须用宽高比容器占位。',
      'alt 文字可以不写？alt 是无障碍和 SEO 的基本要求，装饰性图片 alt=""，内容图片必须描述内容。'
    ],
    related: ['lazy-loading', 'video', 'skeleton-screen', 'favicon']
  },
  {
    id: 'icons',
    en: 'Icons',
    zh: '图标',
    aliases: ['图标库', '线性图标', '面性图标', 'Icon Set'],
    cat: 'frontend',
    tags: ['UI 组件', '媒体'],
    level: 'core',
    summary: '小尺寸矢量图形，统一线条粗细与圆角才有体系感；装饰性图标要 aria-hidden，功能图标必须配文字或标签。',
    plain: [
      '图标是界面的「象形文字」，用极简的图形传达含义。一个专业的图标体系必须统一：线条粗细（如全部 2px）、圆角（如全部 2px）、视觉尺寸（如全部 24x24 画布，实际图形 20x20 留呼吸空间）、风格（线性/面性/双色，不要混用）。常见图标库：Lucide、Feather、Material Icons、Ant Design Icons。',
      '工程硬规矩：① 装饰性图标（纯视觉点缀）加 aria-hidden="true"，屏幕阅读器跳过；② 功能图标（按钮、链接里的图标）必须配文字或 title/aria-label，不能只靠图标传达含义；③ 图标用 SVG 矢量格式（缩放不失真、可改色、体积小），不要用 PNG；④ 图标颜色继承 currentColor（方便随文字颜色变化）。给 AI 描述时要说清：图标风格、尺寸、线条粗细、是否需要文字标签。'
    ],
    analogy: '图标像交通标志——统一的形状、颜色、线条粗细，司机一眼就懂；如果每个标志风格不一样，司机到路口就得停下来猜这是什么意思。',
    talk: {
      good: [
        '用 Lucide 线性图标库，统一 20px 尺寸、1.5px 线条，功能图标配文字标签，装饰性图标加 aria-hidden，图标颜色继承 currentColor。'
      ],
      bad: [
        { say: '加点图标', why: '没说图标风格、尺寸、来源、是否需要文字标签，AI 可能混用不同风格的图标，或者生成纯图标按钮没有无障碍标签。' }
      ]
    },
    misconceptions: [
      '图标好看就够了？可访问性是硬约束，功能图标必须有文字替代（aria-label/title），纯装饰图标要 aria-hidden。',
      '图标可以混用不同风格？线性和面性混用会让界面看起来不专业，必须统一风格（全线性或全面性，双色作为强调点缀）。'
    ],
    related: ['icon-button', 'button', 'image', 'favicon']
  },
  {
    id: 'video',
    en: 'Video Player',
    zh: '视频播放器',
    aliases: ['播放器', '视频占位', 'Video', '媒体播放器'],
    cat: 'frontend',
    tags: ['UI 组件', '媒体'],
    level: 'common',
    summary: '视频区域：播放按钮、进度条、时长、音量与全屏控制；封面图+大播放键是最常见的静止形态。',
    plain: [
      '视频播放器是富媒体页面的核心组件。完整的播放器控制栏包括：播放/暂停按钮、进度条（可拖拽跳转）、当前时间/总时长、音量控制（静音按钮+滑块）、全屏按钮、设置（倍速、清晰度）。静止形态（未播放时）通常是封面图+居中大播放键。',
      '设计要点：控制栏悬停显示、移出自动隐藏（不挡画面）；进度条是最常用的控件，要够粗（移动端至少 44px 高触摸区域）；音量控制可以折叠（只显示静音按钮，hover 展开滑块）；封面图要高质量（第一印象）；自动播放只能静音自动播放（浏览器策略限制）；移动端建议用原生 video 标签（兼容性好、系统控制栏统一）。给 AI 描述时要说清：是否自定义控制栏、有哪些控件、封面图、是否自动播放。'
    ],
    analogy: '视频播放器像电视遥控器——最常用的是播放/暂停和换台（进度条），音量和设置用得少就收起来，不会把所有按钮都摆在屏幕上挡画面。',
    talk: {
      good: [
        '做一个自定义视频播放器：封面图+居中大播放键，控制栏悬停显示（播放/暂停、进度条可拖拽、时间、音量、全屏），进度条缓冲进度用浅灰色，播放进度用主题色，静音自动播放。'
      ],
      bad: [
        { say: '放个视频', why: '没说控制栏、封面图、自动播放、控件列表，AI 可能只生成一个原生 video 标签没有自定义样式。' }
      ]
    },
    misconceptions: [
      '视频可以有声自动播放？浏览器策略禁止有声自动播放，只能静音自动播放或用户交互后才能有声播放。',
      '控制栏一直显示更好？控制栏一直显示会挡画面，应该悬停显示、移出隐藏（3秒后自动隐藏）。'
    ],
    related: ['image', 'file-upload', 'overlay', 'slider']
  },
  {
    id: 'whitespace',
    en: 'Whitespace',
    zh: '留白',
    aliases: ['负空间', '间距', '呼吸感', 'Negative Space', 'White Space'],
    cat: 'frontend',
    tags: ['设计原则', '布局', '视觉'],
    level: 'core',
    summary: '元素之间与四周的空白空间；留白不是浪费，是阅读的节奏——内容太挤等于全都在喊，什么都听不清。',
    plain: [
      '留白（Whitespace / Negative Space）是设计的基础原则之一：元素之间、元素四周、段落行之间的空白空间。它不是「浪费空间」，而是阅读的节奏——内容太挤 = 全都在喊 = 什么都听不清；适当的留白让重要内容突出、让眼睛有休息的地方、让界面有呼吸感。',
      '工程实践：① 建立间距系统（如 4/8/12/16/24/32/48px 的 4px 倍数），不要随意给值；② 元素内边距用 padding，元素之间间距用 margin 或 gap（Flex/Grid）；③ 大留白用在重要内容周围（突出焦点），小留白用在相关内容之间（表示关联）；④ 移动端留白要比桌面端小（屏幕空间有限），但不能没有；⑤ 「多留点白」「加点呼吸感」= 放大间距、减少密度。给 AI 描述时要说清：间距系统、元素间距、内边距、是否需要更多呼吸感。'
    ],
    analogy: '留白像音乐里的休止符——没有休止符的音乐是噪音，休止符让旋律有节奏、有呼吸；设计里的留白让内容有节奏、有重点。',
    talk: {
      good: [
        '卡片内边距 24px，卡片之间间距 16px，标题和正文间距 12px，段落行高 1.7，整体间距用 4px 倍数系统，内容区左右留白 32px。'
      ],
      bad: [
        { say: '排版好看点', why: '没说间距、内边距、行高、间距系统，AI 只能自由发挥，可能排得太挤或太松。' }
      ]
    },
    misconceptions: [
      '留白是浪费空间？留白是设计的核心手段，它建立视觉层级、引导视线、提供呼吸感，不是浪费。',
      '间距可以随便给？不统一的间距会让界面看起来不专业，必须建立间距系统（如 4px 倍数），所有间距从系统里取。'
    ],
    related: ['flex-grid', 'responsive-design', 'card', 'css-box-model']
  },
  {
    id: 'gradient-overlay',
    en: 'Gradient Overlay',
    zh: '渐变遮罩',
    aliases: ['压字渐变', '蒙版', '暗角', '边缘羽化', 'Gradient Mask'],
    cat: 'frontend',
    tags: ['视觉技法', 'CSS'],
    level: 'common',
    summary: '压在图片上的一层渐变：底部压深保白字可读是最常见用法；四周压暗叫暗角，边缘渐隐叫羽化。',
    plain: [
      '渐变遮罩（Gradient Overlay）是压在图片或背景上的一层半透明渐变，用于解决「图上配字看不清」的问题。三种常见用法：① 底部压深渐变（从透明到黑色/深色）——Banner 图上放白字标题，底部压深保证文字可读；② 暗角（vignette）——四周压暗、中心亮，聚焦视觉中心，摄影和海报常用；③ 边缘羽化（feather）——图片边缘渐隐融入背景，图片和背景无缝衔接。',
      '工程实现：用 CSS linear-gradient + 绝对定位覆盖在图片上，或用 background-image 多层叠加（图片 URL + 渐变）。渐变方向要根据文字位置定（文字在底部→从下到上渐变，文字在左侧→从左到右渐变）。透明度要适中：太浅字看不清，太深图看不见。给 AI 描述时要说清：渐变方向、颜色、透明度、用途（保字可读/暗角/羽化）。'
    ],
    analogy: '渐变遮罩像拍照时在镜头前加的渐变滤镜——天空太亮就压暗天空，主体太暗就提亮主体，让画面有层次、文字有地方放。',
    talk: {
      good: [
        'Banner 图上放白色标题，底部加从透明到 rgba(0,0,0,0.7) 的线性渐变（从下到上），保证标题可读，渐变高度占图片 40%。'
      ],
      bad: [
        { say: '图片上加个渐变', why: '没说方向、颜色、透明度、用途，AI 可能加一个从左到右的彩色渐变把图全盖住了。' }
      ]
    },
    misconceptions: [
      '渐变遮罩就是加个半透明黑底？纯半透明黑底太生硬，渐变遮罩是有方向、有透明度变化的，更自然。',
      '渐变遮罩只能用黑色？可以用任何颜色，但保字可读通常用黑色/深色，氛围营造可以用品牌色。'
    ],
    related: ['gradient', 'image', 'opacity', 'accent-color']
  },
  {
    id: 'glassmorphism',
    en: 'Glassmorphism',
    zh: '毛玻璃',
    aliases: ['磨砂玻璃', '玻璃拟态', 'Frosted Glass', 'Glass Effect'],
    cat: 'frontend',
    tags: ['视觉技法', 'CSS'],
    level: 'common',
    summary: '半透明底加背景模糊的玻璃质感（backdrop-filter: blur），iOS 控制中心同款；花哨背景上保可读的首选。',
    plain: [
      '毛玻璃（Glassmorphism）是 2020 年流行起来的视觉风格：半透明背景 + 背景模糊（backdrop-filter: blur）+ 1px 半透明白边框，模拟磨砂玻璃的质感。iOS 控制中心、macOS Big Sur 窗口、Windows 11 Mica 都是这个风格。它适合用在花哨背景（渐变、图片、视频）上保内容可读，比纯半透明更有质感和层次。',
      '工程要点：核心属性是 backdrop-filter: blur(10-20px) + background: rgba(255,255,255,0.1-0.3)（浅色）或 rgba(0,0,0,0.3-0.5)（深色）+ border: 1px solid rgba(255,255,255,0.2)。注意：① 模糊有渲染成本（特别是大面积），点缀用，别整页铺；② 兼容性：backdrop-filter 在旧浏览器不支持，要加兜底背景色（@supports 检测）；③ 毛玻璃上的文字对比度要够（半透明底可能导致文字对比度不足）。给 AI 描述时要说清：模糊半径、背景透明度、边框、用在什么元素上。'
    ],
    analogy: '毛玻璃像浴室里的磨砂玻璃——能看到后面有光影，但看不清细节，既保护隐私又有质感；你不会把整面墙都做成磨砂玻璃，只在需要的地方用。',
    talk: {
      good: [
        '导航栏用毛玻璃效果：backdrop-filter: blur(12px)，背景 rgba(255,255,255,0.8)，底部 1px 边框 rgba(0,0,0,0.08)，滚动时背景内容模糊透出。'
      ],
      bad: [
        { say: '加个毛玻璃效果', why: '没说模糊半径、背景透明度、边框、用在哪，AI 可能给整个页面加毛玻璃导致性能问题。' }
      ]
    },
    misconceptions: [
      '毛玻璃就是半透明？半透明只是底色透明，毛玻璃还要有背景模糊（backdrop-filter）和边框，三者缺一不可。',
      '毛玻璃可以整页用？模糊有渲染成本，整页用会卡顿，只在导航栏、卡片、弹窗等小面积元素上点缀用。'
    ],
    related: ['opacity', 'gradient', 'accent-color', 'dark-mode']
  },
  {
    id: 'accent-color',
    en: 'Accent Color',
    zh: '强调色',
    aliases: ['主题色', '主色', '品牌色', 'Primary Color', 'Brand Color'],
    cat: 'frontend',
    tags: ['视觉技法', '设计系统', '配色'],
    level: 'core',
    summary: '界面里出现最频繁、代表品牌身份的颜色：主按钮、选中态、链接都用它，是整套配色的锚。',
    plain: [
      '强调色（Accent Color / Primary Color / Brand Color）是界面配色系统的核心：出现频率最高、代表品牌身份的颜色。主按钮、选中态、链接、图标高亮、进度条、焦点环都用它。它是整套配色的「锚」——其他颜色（中性色、成功色、警告色、危险色）都围绕它搭配。',
      '设计规则：① 一屏一个强调色足够，处处强调等于没有强调；② 强调色要和背景有足够对比度（WCAG AA：正文 4.5:1，大字 3:1）；③ 提前定义深浅变体（hover 深 10%、active 深 20%、disabled 浅 50%），不要临时调；④ 用 CSS 变量定义（--accent: #0e6b5b），全局统一管理；⑤ 暗色模式下强调色要提亮 20-30%（暗色下原色太暗看不清）。给 AI 描述时要说清：色值、用在哪些元素、hover/active/disabled 变体、暗色模式适配。'
    ],
    analogy: '强调色像公司 logo 的颜色——出现在名片、网站、产品包装上，看到这个颜色就想到这个品牌；但你不会把整面墙都刷成 logo 色，只在关键位置用。',
    talk: {
      good: [
        '主题色用 #0e6b5b（墨绿），主按钮、选中态、链接、焦点环都用它；hover 深 10% #0c5a4d，active 深 20%，disabled 透明度 0.4；暗色模式提亮到 #2db89e。'
      ],
      bad: [
        { say: '用绿色主题', why: '没说具体色值、用在哪、状态变体、暗色适配，AI 只能选一个绿色，hover/disabled 状态可能不一致。' }
      ]
    },
    misconceptions: [
      '强调色可以随便用？处处强调=没有强调，一个界面里强调色只用于核心交互元素，其他用中性色。',
      '强调色不需要状态变体？hover/active/disabled 必须提前定义，临时调的颜色会导致整个界面状态不一致。'
    ],
    related: ['dark-mode', 'gradient', 'opacity', 'button']
  },
  {
    id: 'entrance-animation',
    en: 'Entrance Animation',
    zh: '入场动画',
    aliases: ['进场动画', '浮现动画', '入场动效', 'Enter Animation'],
    cat: 'frontend',
    tags: ['动效', 'CSS', '交互'],
    level: 'common',
    summary: '内容出现时的登场方式：淡入、上浮、依次错峰出现，让页面是「布置好」的而不是「糊一脸」的。',
    plain: [
      '入场动画（Entrance Animation）是内容出现在视口时的过渡效果：淡入（fade-in）、上浮（slide-up）、缩放（scale-in）、依次错峰（stagger）。它让页面是「布置好」的而不是「糊一脸」的——内容有节奏地出现，用户的视线被引导，页面有灵动感。',
      '设计规则：① 时长克制（300-500ms），太长用户等着看内容会烦躁；② 只进不弹（不要 bounce 弹性效果，太花哨不专业）；③ 错峰出现（stagger）：列表项依次延迟 50-100ms 出现，有节奏感，但延迟总和不超过 500ms；④ 滚动入场（scroll-triggered）：用 Intersection Observer 检测元素进入视口时触发，不是页面加载时全部触发；⑤ 首屏入场动画不要超过 1 秒（用户等着看内容）；⑥ 尊重 prefers-reduced-motion（用户设置减少动效时关闭）。给 AI 描述时要说清：动画类型、时长、延迟、是否滚动触发、错峰间隔。'
    ],
    analogy: '入场动画像舞台幕布拉开——演员不是一下子全涌上台，而是有节奏地一个个登场，灯光跟着走，观众的视线自然被引导；如果所有人同时冲上台，就是一场混乱。',
    talk: {
      good: [
        '卡片列表入场动画：滚动到视口时触发，每张卡片从下方 20px 上浮+淡入，时长 400ms ease-out，卡片之间错峰 80ms，尊重 prefers-reduced-motion。'
      ],
      bad: [
        { say: '加个入场动画', why: '没说类型、时长、触发方式、错峰，AI 可能加一个 2 秒的弹跳动画，拖沓又花哨。' }
      ]
    },
    misconceptions: [
      '入场动画越炫越好？入场动画是引导不是炫技，300-500ms 淡入/上浮就够了，弹跳/旋转/缩放过度会显得不专业。',
      '入场动画页面加载时全部触发？长列表应该滚动入场（进入视口才触发），全部同时触发不仅浪费性能，用户也看不到下面的动画。'
    ],
    related: ['css-transition', 'interactive-states', 'pulse-animation', 'hover-effect']
  },
  {
    id: 'pulse-animation',
    en: 'Pulse Animation',
    zh: '脉冲动画',
    aliases: ['呼吸灯', '呼吸点', '脉冲点', 'Pulse', 'Ripple'],
    cat: 'frontend',
    tags: ['动效', 'CSS', '交互'],
    level: 'common',
    summary: '向外扩散波纹的呼吸循环：直播 LIVE 点、录制中、在线状态都靠它传递「活着」的信号；一页放两三处是氛围，处处都闪就成了警报器。',
    plain: [
      '脉冲动画（Pulse Animation）是一种循环动画：元素向外扩散波纹（ripple）或透明度/大小呼吸变化，传递「正在进行」「活着」的信号。常见场景：直播 LIVE 标识、录制中指示、在线状态点、新消息提醒、加载中的状态点。它是「状态指示器」，不是装饰。',
      '设计规则：① 要慢（2-3 秒一个循环），快闪像警告会让用户焦虑；② 一页放两三处是氛围，处处都闪就成了警报器（用户会紧张）；③ 颜色要有语义（直播=红色脉冲，在线=绿色呼吸，录制中=红色闪烁）；④ 可以暂停（用户不喜欢一直动的东西，给个关闭选项或在非激活态停止）；⑤ 尊重 prefers-reduced-motion（减少动效时只显示静态点，不脉冲）；⑥ 波纹扩散要自然（透明度从高到低、大小从小到大，淡出消失）。给 AI 描述时要说清：用在哪、颜色、循环时长、波纹还是呼吸、是否可关闭。'
    ],
    analogy: '脉冲动画像人的呼吸——平稳缓慢的呼吸表示「活着、正常」，急促的呼吸表示「紧张、危险」；你不会让房间里所有东西都在呼吸，只有需要提醒注意的地方才有。',
    talk: {
      good: [
        '直播标识加脉冲动画：红色圆点 + 向外扩散的红色波纹，2.5 秒循环，波纹从 opacity 0.6 淡出到 0，大小从 1 倍扩到 2.5 倍，尊重 prefers-reduced-motion。'
      ],
      bad: [
        { say: '加个呼吸灯效果', why: '没说颜色、速度、形式（波纹还是大小）、用在哪，AI 可能加一个 0.5 秒快闪的红色呼吸灯，像警报器。' }
      ]
    },
    misconceptions: [
      '脉冲动画越快越醒目？快闪像警告会让用户焦虑，2-3 秒慢循环才是「正常进行中」的感觉。',
      '脉冲动画可以到处用？一页两三处是氛围，处处都闪就成了警报器，用户会紧张甚至关掉页面。'
    ],
    related: ['css-transition', 'entrance-animation', 'badge', 'interactive-states']
  }

  );
})(window);
