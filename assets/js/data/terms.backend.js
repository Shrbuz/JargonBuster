/* ============================================================
   terms.backend.js · 后端（18 词条）
   ============================================================ */
(function (W) {
  W.STD_TERMS = W.STD_TERMS || [];
  W.STD_TERMS.push(

  {
    id: 'api',
    en: 'API',
    zh: 'API 接口',
    aliases: ['接口', '应用程序接口', 'Application Programming Interface'],
    cat: 'backend',
    tags: ['基础概念', 'Web'],
    level: 'core',
    summary: '程序与程序之间的服务窗口：约定好地址、参数与返回，双方按契约协作。',
    plain: [
      'API（应用程序编程接口）是一份「怎么调用我」的公开承诺：什么地址、什么方法、传什么参数、返回什么结构、出错给什么码。前端调后端的 HTTP 接口、你调用第三方支付、库暴露的函数，本质都是 API——它是软件世界的合同文本。',
      '好接口的设计要点：语义清晰（路径与动词符合直觉）、契约稳定（升级不悄悄破坏老调用方）、错误信息可行动（返回哪个字段出了什么问题）、文档与现实同步。「先实现后补文档」往往变成永远没有文档。',
      '和 AI 协作的黄金组合句：资源路径 + HTTP 方法 + 状态码 + 错误格式。例如「DELETE /articles/{id}，成功 204；不存在 404；无权限 403，错误体统一 { code, message }」——AI 能据此同时生成可靠的前后端代码。'
    ],
    analogy: 'API 像餐厅的点餐窗口：菜单（文档）写明有什么、怎么做、多少钱（参数与返回），后厨（服务端）怎么忙活你不关心——窗口规矩不改，你随时都能吃上。',
    talk: {
      good: [
        '设计收藏接口集：GET /favorites 分页返回列表；POST /favorites/{articleId} 收藏成功 201；重复收藏幂等返回 200；DELETE 成功 204；错误体统一为 { code, message }。'
      ],
      bad: [
        { say: '写个接口给我用', why: '不说资源、方法、参数与错误约定，AI 自由发挥出的接口与前端预期对不上，联调全靠猜。'
        }
      ]
    },
    misconceptions: [
      'API 就等于 HTTP 接口？HTTP REST 只是 API 的一种形态；SDK 方法、命令行参数、数据库驱动都是 API 的家族成员。'
    ],
    related: ['rest', 'http', 'webhook', 'function-calling']
  },

  {
    id: 'rest',
    en: 'REST',
    zh: 'REST 风格',
    aliases: ['RESTful'],
    cat: 'backend',
    tags: ['架构', 'Web'],
    level: 'core',
    summary: '把一切当作资源来设计的 API 风格：URL 是名词，方法是动作，状态码表结果。',
    plain: [
      'REST 用一套朴素语法组织 HTTP 接口：URL 表示资源（/users/42 是编号 42 的用户），HTTP 方法表达操作意图（GET 读、POST 建、PUT/PATCH 改、DELETE 删），状态码宣告结果（201 已创建、404 没有这个资源）。三者拼起来，接口几乎自我解释。',
      '配套原则包括无状态（每个请求自带完整凭证，服务器不留会话记忆便于水平扩容）与统一接口（同一资源的访问方式处处一致）。它成为行业默认风格的原因正是「新人看 URL 就能猜对一半用法」。',
      '实践中的灰色地带要务实处理：复杂查询用 POST /users/search 不丢人；批量操作可以 POST /users/batch-delete；别为了教条 REST 把业务扭曲成四不像。一致性比纯粹性重要。'
    ],
    analogy: 'REST 像图书馆的索书规则：书架号即资源地址，借、还、续借各有标准柜台动作（方法），办没办成看回执（状态码）——任何分馆规则一致。',
    talk: {
      good: [
        '按 REST 设计文章模块：GET /articles 列表支持 ?page=&tag= 筛选；GET /articles/{id} 详情；PATCH /articles/{id} 部分更新；删除软删走 DELETE 并返回 204。'
      ],
      bad: [
        { say: '接口随便起名能用就行', why: '/getUserList2 这类命名让调用方无从推断语义；REST 的价值恰恰在可预测性。'
        }
      ]
    },
    misconceptions: [
      'REST 要求 URL 不能带动词？这是指导而非戒律；搜索、批量这类无法优雅映射成资源的操作，动词端点是务实选择。'
    ],
    related: ['api', 'http-methods', 'status-codes', 'graphql']
  },

  {
    id: 'json',
    en: 'JSON',
    zh: 'JSON 数据格式',
    aliases: ['JavaScript Object Notation'],
    cat: 'backend',
    tags: ['数据格式', 'Web'],
    level: 'core',
    summary: '人类可读的轻量数据交换格式：对象、数组、字符串、数字、布尔与 null 六种类型。',
    plain: [
      'JSON 用极简语法表达结构化数据：花括号是对象、方括号是数组，键必须双引号，值限于字符串/数字/布尔/null/嵌套结构。它取代 XML 成为 Web 数据交换的事实标准，靠的是「人读得顺、机器解析快、所有语言都支持」。',
      '工程细节常翻车的地方：尾逗号非法；单引号非法；数字精度（大整数超过安全范围会被 JS 静默截断）；日期没有原生类型只能传字符串并约定格式；Unicode 转义让人眼难排查。序列化时 undefined 字段会被静默丢弃。',
      '与 AI 协作时给出一份真实的 JSON 样例胜过千言描述：「请求体长这样、响应体长这样」，它生成的解析与校验代码一次到位。要求严格场景再加一句「输出必须是合法 JSON，不要包裹 markdown 代码块」。'
    ],
    analogy: 'JSON 像国际通用的报关单：格式固定人人会填（六种类型），海关（各语言解析器）秒懂内容；但填错一个逗号整张单子作废（严格语法）。',
    talk: {
      good: [
        '接口响应体示例：{ "code": 0, "data": { "items": [ ... ], "total": 123 } }；请按此结构定义 TS 类型并编写运行时校验。'
      ],
      bad: [
        { say: '数据就用 json 存一下', why: '配置文件用 JSON 无法写注释且手改易错；长期维护的结构化配置更适合 YAML/TOML。'
        }
      ]
    },
    misconceptions: [
      'JSON 与 JS 对象完全一样？JSON 是纯文本规范：键必须双引号、无函数与 undefined、注释非法；JS 对象字面量宽松得多。'
    ],
    related: ['api', 'rest', 'data-type']
  },

  {
    id: 'graphql',
    en: 'GraphQL',
    zh: 'GraphQL 查询语言',
    cat: 'backend',
    tags: ['API', '架构'],
    level: 'common',
    summary: '由客户端精确声明「要什么字段」的查询式 API：一次请求拿全所需，不多不少。',
    plain: [
      'GraphQL 把 API 定义成一张强类型的字段图：客户端写明本次需要的字段形状，服务器按声明精确返回。对比 REST 的两难——要么多个端点多次请求（瀑布），要么一个大而全响应（浪费流量）——GraphQL 允许一查到位。',
      '三大构件：Schema（类型系统即文档）、Query（读）、Mutation(写)。附带红利是强类型内省：工具能自动生成 TS 类型与文档站；订阅（Subscription）还能承接实时推送。',
      '代价同样真实：服务端要防恶意深查询（限制深度与复杂度）；缓存从 URL 维度失效（REST 天然的 HTTP 缓存不再适用）；N+1 问题在 resolver 层重现需要 DataLoader。中小项目 REST 往往更省心。'
    ],
    analogy: 'REST 像固定套餐：点 A 套餐必配三样小菜；GraphQL 像自选称重——餐盘里放什么、放多少由你逐项勾选，账单按实际所取结算。',
    talk: {
      good: [
        '移动端首页聚合页改用 GraphQL：单次查询取 banner、推荐列表前10条及用户角标，深度限制 5 层并开启 DataLoader 合并取数。'
      ],
      bad: [
        { say: '听说 GraphQL 更现代我们换吧', why: '迁移成本横跨前后端与缓存体系；无明确痛点（过度获取/多端聚合）时不值得换。'
        }
      ]
    },
    misconceptions: [
      'GraphQL 是要取代 REST？两者并存已久；简单资源型服务 REST 更顺手，复杂聚合与多端差异化需求才是 GraphQL 主场。'
    ],
    related: ['api', 'rest', 'n-plus-one']
  },

  {
    id: 'rpc',
    en: 'RPC',
    zh: '远程过程调用 RPC',
    aliases: ['gRPC', 'Remote Procedure Call'],
    cat: 'backend',
    tags: ['架构', '微服务'],
    level: 'advanced',
    summary: '像调本地函数一样调用另一台机器上的服务：面向动作的高效内部通信方式。',
    plain: [
      'RPC 的目标是抹平网络细节：callUserService(id) 写起来与本地函数无异，框架在底层完成序列化、传输、寻址。与 REST 面向资源不同，RPC 面向动作与方法签名，天然贴合服务内部的调用语义。',
      '代表选手 gRPC：用 Protobuf 定义接口与消息（二进制序列化，比 JSON 小快数倍），跑在 HTTP/2 上获得多路复用与双向流。配合代码生成，跨语言调用像同一种语言——微服务内部通信的事实标准之一。',
      '取舍在于生态：二进制协议人眼不可读（调试需专用工具）、浏览器不能直连 gRPC（需要网关转换或 grpc-web）。因此常见格局是对外 REST/JSON 友好开放，对内 gRPC 高效互调。'
    ],
    analogy: 'RPC 像 internal 对讲专线：拿起听筒报暗号（方法+参数），对面直接执行并把结果递回来——比发正式公文（HTTP+JSON）快得多，但外人听不懂暗号。',
    talk: {
      good: [
        '订单服务与库存服务之间用 gRPC：proto 定义 DeductStock(skuId, qty) 返回剩余量，超时 500ms 重试一次需幂等。'
      ],
      bad: [
        { say: '服务之间互相调用一下就行', why: '不说协议、超时与失败语义，AI 可能生成裸 HTTP 无重试无熔断的内调，故障即雪崩。'
        }
      ]
    },
    misconceptions: [
      'RPC 比 REST 先进？只是取舍不同：内网高频互调 RPC 效率占优，对外开放与调试友好则 REST 占优。'
    ],
    related: ['microservices', 'api', 'idempotency']
  },

  {
    id: 'webhook',
    en: 'Webhook',
    zh: 'Webhook 回调通知',
    cat: 'backend',
    tags: ['集成'],
    level: 'common',
    summary: '事件发生时，对方主动向你预留的 URL 发 HTTP 请求：轮询的反向革命。',
    plain: [
      '轮询是你每隔一分钟问支付平台「到账了吗」；Webhook 是平台在到账那一刻主动 POST 你注册的回调 URL——事件驱动的集成方式，实时且省去无效询问。GitHub 推送触发 CI、支付回调通知、钉钉机器人，全是 Webhook 在工作。',
      '接收方的责任清单：验签（确认请求真的来自对方而非伪造者）、幂等（对方会重试，同一通知可能收到多次）、快速响应（先收下事件入队，重活异步干，避免处理超时导致对方判定失败反复重发）、对外暴露稳定可达的公网地址。',
      '调试 Webhook 的麻烦在于「对方在公网，你在本机」：常用内网穿透或 Request Bin 类工具先录制请求再本地回放。让 AI 写接收端时，「验签 + 幂等 + 异步处理」三件套点名要求。'
    ],
    analogy: 'Webhook 是留电话等通知：快递到了小哥打你手机（主动 POST）；轮询则是每十分钟跑到驿站问一遍「我的件到了吗」——既累人又不及时。',
    talk: {
      good: [
        '实现支付回调接收端：验证平台签名头，按 transaction_id 幂等入库，处理后立即返回 200；业务逻辑投递到消息队列异步执行。'
      ],
      bad: [
        { say: '对接一下他们的回调', why: '不提验签与幂等，AI 生成的接收端可能被伪造请求刷单，或因重复通知造成重复发货。'
        }
      ]
    },
    misconceptions: [
      'Webhook 发出就算送达？对方视为失败会指数退避重试多次；你的幂等设计就是为这些重复请求准备的。'
    ],
    related: ['api', 'message-queue', 'idempotency']
  },

  {
    id: 'middleware',
    en: 'Middleware',
    zh: '中间件',
    cat: 'backend',
    tags: ['架构'],
    level: 'core',
    summary: '请求进入业务前的流水线关卡：日志、鉴权、限流逐层过检，层层放行。',
    plain: [
      '中间件是串在请求路径上的一系列处理函数：每个收到请求，做完自己的事（记日志、验证 token、限流检查），再决定放行（next）还是直接拦截返回。洋葱模型形容得贴切——请求穿过一层层洋葱皮进来，响应再原路穿出去。',
      '它的价值在于横切关注点的复用：鉴权逻辑写一次挂全局路由组，不必在每个 handler 里重复。Express/Koa、Django、Gin 各家框架的中间件机制大同小异，顺序即语义——日志在最外层才能记录完整耗时，错误处理通常压轴兜底。',
      '前端也有同名概念（Redux middleware），思想一致：在「动作到达目的地之前」插入统一处理。让 AI 写中间件时说清期望顺序：「鉴权在 CORS 之后、日志在最外层」。'
    ],
    analogy: '中间件像机场登机流程链：安检 → 边检 → 登机口，每一环检查一项内容并决定放行与否；任何一环拦下，旅程就此终止，不会见到飞机。',
    talk: {
      good: [
        '为管理后台路由组加鉴权中间件：校验 JWT 有效性与 admin 角色，失败统一返回 401/403 结构化错误体。'
      ],
      bad: [
        { say: '在代码里到处加上判断登录的逻辑', why: '散落的重复鉴权必然出现遗漏点；应抽成中间件统一挂载到受保护的路由组。'
        }
      ]
    },
    misconceptions: [
      '中间件只存在于后端框架？管道思想无处不在：Redux 中间件、Nginx 层处理、消息消费前置钩子都是同一模式。'
    ],
    related: ['jwt', 'decorator-pattern', 'rate-limiting', 'mvc']
  },

  {
    id: 'mvc',
    en: 'MVC Pattern',
    zh: 'MVC 模式',
    cat: 'backend',
    tags: ['架构'],
    level: 'common',
    summary: 'Model 管数据与规则、View 管呈现、Controller 管调度：经典三权分立。',
    plain: [
      'MVC 把应用切成三块：Model 封装数据与业务规则；View 负责渲染呈现；Controller 接收请求、调模型、选视图。请求的旅程是 C 进 M 出 V——职责分离让新手第一次理解「为什么不能什么都写在页面里」。',
      '语境差异值得注意：服务端 MVC（Spring、Rails、Django）里 View 是模板引擎；前端 MVC（早期 Backbone）演化成了如今的组件化与 MVVM（Vue/React 的响应式绑定更接近后者）。同一个缩写在不同世界含义已漂移。',
      '今天讨论后端项目时，更常见的落地词汇其实是分层（Controller-Service-Repository）。和 AI 沟通时直接用你们项目的目录约定描述，比争论「这算不算 MVC」 productive 得多。'
    ],
    analogy: 'MVC 像餐厅三角色：服务员（Controller）接单不上灶，厨师（Model）管菜谱食材不管招呼客人，摆盘出品（View）负责呈现——谁也不越界。',
    talk: {
      good: [
        '沿用现有目录约定：routes 只做参数校验转发 controller，业务在 services，数据访问收敛到 models。'
      ],
      bad: [
        { say: '按 MVC 架构来写', why: '各家 MVC 目录习惯差异巨大；不给出具体约定，AI 的组织方式多半与你项目格格不入。'
        }
      ]
    },
    misconceptions: [
      'MVC 过时了？作为「职责分离」的教学原型它永不过时；只是现代框架把它演化成了更细的形态。'
    ],
    related: ['layered-architecture', 'middleware', 'orm']
  },

  {
    id: 'orm',
    en: 'ORM',
    zh: 'ORM 对象关系映射',
    aliases: ['Object-Relational Mapping'],
    cat: 'backend',
    tags: ['数据库', '效率'],
    level: 'core',
    summary: '用对象和方法的语法操作数据库：写的是代码，落到库里是 SQL。',
    plain: [
      'ORM 在「面向对象的世界」与「关系表的世界」之间当翻译：User.findAll({ where: { active: true } }) 被翻译成 SELECT * FROM users WHERE active = true。收益是类型安全、防注入（参数自动转义）、跨数据库可移植与开发提速。',
      '代价是「翻译损耗」：复杂查询翻译出来的 SQL 可能低效；魔法般的隐式行为（懒加载触发 N+1、级联删除悄悄清表）让问题藏得更深。资深开发的态度是「ORM 写常规，关键 SQL 手写」——性能敏感处用原生查询或视图优化，不被工具绑架。',
      '与 AI 协作要点：声明所用 ORM 及版本（Prisma/TypeORM/Sequelize/GORM 差异巨大），并要求「生成的查询附带上等价 SQL 或开启查询日志」——方便你审查它有没有写出慢查询。'
    ],
    analogy: 'ORM 像随身翻译官：日常对话（增删改查）又快又准；商务谈判的关键条款（核心报表 SQL），最好亲自过目译文甚至直接用母语确认。',
    talk: {
      good: [
        '用 Prisma 实现订单分页查询：关联预加载 user 与 items 避免 N+1；输出对应生成的 SQL 供我核对索引命中。'
      ],
      bad: [
        { say: '用 ORM 连下数据库', why: '不说具体 ORM 与连接配置来源（环境变量），AI 会编造连接串并把密码硬编码进仓库。'
        }
      ]
    },
    misconceptions: [
      '用了 ORM 就不用懂 SQL？恰恰相反——不懂 SQL 的人无法识别 ORM 生成的坏查询；工具放大能力也放大无知。'
    ],
    related: ['n-plus-one', 'connection-pool', 'sql-nosql', 'database-index']
  },

  {
    id: 'microservices',
    en: 'Microservices',
    zh: '微服务',
    cat: 'backend',
    tags: ['架构'],
    level: 'advanced',
    summary: '按业务边界拆成一堆独立部署的小服务：各自开发上线扩容，代价是分布式全家桶。',
    plain: [
      '微服务把单体拆成按领域划分的小型服务（订单、库存、用户……）：独立代码库、独立数据库、独立部署节奏。团队并行度与服务独立性大幅提升，单个服务简单清晰、故障隔离良好。',
      '但天下没有免费的重构：拆出去的同时请回了分布式的全套麻烦——服务发现、链路追踪、分布式事务、数据一致性、运维复杂度翻倍。Martin Fowler 的忠告常被引用：除非组织规模大到单体已成为协作瓶颈，否则不要拆。',
      '务实路线是「模块化单体」起步：代码内按领域划清模块边界、禁止跨模块摸私有表，将来要拆时沿着既有缝线切割即可。向 AI 描述系统时，画出服务边界与通信方式的图（哪怕文字版）价值千金。'
    ],
    analogy: '微服务像连锁化改造：一家全能大店拆成奶茶铺、烘焙坊、炸鸡店各自经营（独立部署扩容）；但总部协调、加盟结算（服务治理）的复杂度也随之而来。',
    visual: { kind: 'svg', id: 'mono-vs-micro', caption: '单体与微服务的形态对比' },
    talk: {
      good: [
        '当前是模块化单体：订单与库存模块禁止直接访问对方的数据表，交互只走内部接口，为未来拆分保留缝线。'
      ],
      bad: [
        { say: '新项目直接上微服务显得正规', why: '小团队上微服务会把人力耗在治理而非业务；先问拆分解决的是谁的瓶颈。'
        }
      ]
    },
    misconceptions: [
      '微服务的服务越小越好？过细拆分产生大量网络调用与运维负担；粒度以「一个团队能完整负责」为准绳。'
    ],
    related: ['monolith', 'distributed-system', 'rpc', 'message-queue']
  },

  {
    id: 'monolith',
    en: 'Monolith',
    zh: '单体架构',
    cat: 'backend',
    tags: ['架构'],
    level: 'common',
    summary: '所有功能打包在一个进程里的传统架构：部署简单直接，规模大了转身困难。',
    plain: [
      '单体不是贬义词：一个进程装下全部功能，本地开发一键启动、调试无需跨服务追链路、事务天然强一致、部署就是一个包。绝大多数产品从 0 到 1 的正确姿势就是单体——简单本身是巨大的竞争力。',
      '它的天花板出现在：代码库膨胀后构建变慢、模块边界模糊导致牵一发动全身、单一模块的性能瓶颈被迫整体扩容（为了给导出功能加机器，复制了整个应用）。此时才谈拆分。',
      '健康的单体讲究「内部模块化」：清晰的分层与领域模块、模块间只走公开接口、共享库克制。这样长成的单体被称为「模块化单体」，是通往微服务最稳的跳板——或者根本不需要那一步。'
    ],
    analogy: '单体像一家五脏俱全的老字号饭店：前厅后厨采购一体运营（一个进程），招牌菜出得又快又稳；直到宴席爆满排队失控，才考虑分号经营（拆微服务）。',
    talk: {
      good: [
        '保持单体但强化模块边界：新建 billing 模块目录，对外仅导出 service 函数，禁止其他模块 import 其 models。'
      ],
      bad: [
        { say: '单体太low了我们要拆掉', why: '为潮流拆分而不解耦的模块，拆完仍是分布式泥球；先在单体内部练好边界。'
        }
      ]
    },
    misconceptions: [
      '单体不能承载大规模业务？Stack Overflow 以单体服务数亿请求多年；瓶颈在设计与扩展手段，不在「单体」标签。'
    ],
    related: ['microservices', 'layered-architecture', 'cohesion-coupling']
  },

  {
    id: 'message-queue',
    en: 'Message Queue',
    zh: '消息队列',
    aliases: ['MQ', '消息中间件'],
    cat: 'backend',
    tags: ['异步', '架构'],
    level: 'common',
    summary: '生产者把消息扔进队列就走的缓冲带：削峰、解耦、异步三板斧的基础设施。',
    plain: [
      '消息队列（Kafka、RabbitMQ、RocketMQ）在服务之间垫了一层缓冲：上游把「发生了什么事」封装成消息投递出去立即返回，下游消费者按自己的节奏拉取处理。三大经典用途：削峰填谷（洪峰先进队慢慢消化）、服务解耦（发布方不知道也不关心谁在消费）、异步加速（主流程完成即响应，耗时副业后台做）。',
      '进阶概念随可靠性要求登场：持久化（重启消息不丢）、ACK 确认（处理完才算数）、重试与死信队列（屡次失败的归宿）、至少一次投递（因此消费端必须幂等）、有序性（分区内的先后保障）。',
      '引入 MQ 的心智准备：链路从同步变异步，排障难度上升（消息在哪一段堵了？），最终一致性需要业务容忍时间窗。能用同步简单解决的，别急着上 MQ。'
    ],
    analogy: 'MQ 像餐厅的单据传送带：服务员把单子夹上去就走（投递即返回），后厨按产能取单做菜（消费）；高峰期单子在带上排队而不是客人堵在门口骂街。',
    visual: { kind: 'svg', id: 'mq-flow', caption: '生产者经队列缓冲流向消费者' },
    talk: {
      good: [
        '下单成功后发送 OrderCreated 到 RocketMQ：事务消息保证与本地事务一致；积分与通知两个消费者各自幂等消费。'
      ],
      bad: [
        { say: '用消息队列把接口变快点', why: 'MQ 解决的是耦合与峰值，不是单次延迟；误用反而引入投递不确定与排障成本。'
        }
      ]
    },
    misconceptions: [
      'MQ 保证消息不丢不重？主流语义是至少一次——不丢但不免重；「恰好一次」需要端到端配合幂等才成立。'
    ],
    related: ['observer', 'event-driven', 'idempotency', 'distributed-system']
  },

  {
    id: 'caching',
    en: 'Caching',
    zh: '缓存',
    cat: 'backend',
    tags: ['性能', 'Redis'],
    level: 'core',
    summary: '把昂贵的计算结果暂存起来复用：空间换时间的万能第一招。',
    plain: [
      '缓存的层级遍布全栈：浏览器缓存、CDN、反向代理缓存、应用内存缓存、Redis 分布式缓存、数据库自身的缓冲池。核心思想始终如一——同一份昂贵结果（SQL 聚合、渲染产物、第三方调用）只算一次，后续直接取用。',
      '两大灵魂问题是「存多久」与「何时失效」：TTL 设短了命中率低，设长了脏数据风险高；更新策略常见 Cache Aside（读时未命中回源并写入，写时先更新库再删缓存）——注意是删缓存而非更新，避免并发写覆盖。命中率是衡量缓存是否白建的核心指标。',
      '引入缓存即引入不一致的可能与三大经典故障（穿透击穿雪崩）。给 AI 提需求时的成熟句式：「商品详情加 Redis 缓存，TTL 10 分钟加随机抖动，更新时主动删 key，空结果缓存 60 秒防穿透」。'
    ],
    analogy: '缓存像办公桌上的便签：常用电话号码抄在手边（热点数据），不必每次翻通讯录（数据库）；便签过期不撕（失效策略缺失），拨错号的尴尬迟早发生。',
    visual: { kind: 'anim', id: 'cache-hit-miss', caption: '命中直达与未命中回源' },
    talk: {
      good: [
        '首页榜单走 Redis 缓存：key 加版本前缀便于整体失效，TTL 300 秒 ±60 抖动；缓存重建用互斥锁防止击穿。'
      ],
      bad: [
        { say: '加个缓存让它快起来', why: '不定义失效策略与一致性容忍度，AI 给出的缓存会在数据变更后长期展示旧值。'
        }
      ]
    },
    misconceptions: [
      '缓存一定提升性能？未命中的请求多了「查缓存+查库」双重开销；低命中率场景反而是负优化。'
    ],
    related: ['cache-trilogy', 'cdn']
  },

  {
    id: 'session',
    en: 'Session',
    zh: 'Session 会话',
    cat: 'backend',
    tags: ['认证'],
    level: 'common',
    summary: '服务器端记住「你是谁」的档案袋：Cookie 里只揣一张档案编号。',
    plain: [
      'HTTP 无状态，于是登录态需要专门机制：用户首次登录，服务端创建 Session 记录（用户 ID、权限、过期时间）存在内存/Redis，把随机 Session ID 通过 Set-Cookie 交给浏览器；之后每次请求 Cookie 自动带回 ID，服务端查档确认身份。',
      '特点由此推导：状态在服务端（可随时踢人下线、即时改权限），安全性较好（Cookie 可设 HttpOnly 防 XSS 偷取）；代价是多了一层存储查询，且水平扩容需要集中式存储（Redis）否则 A 机的会话 B 机不认识。',
      '与 JWT 的路线之争没有绝对答案：Session 适合需要即时吊销的传统 Web 应用，JWT 适合无状态 API 与多端场景（但签发后难以撤回）。混合方案也常见——短效 JWT 配 Redis 黑名单。'
    ],
    analogy: 'Session 像健身房储物柜：前台给你一张柜号牌（Session ID 放 Cookie），更衣柜子（会话数据）全在店里；牌子丢了可以挂失销柜（服务端可吊销），别人捡到牌也开不走你家保险箱（HttpOnly）。',
    talk: {
      good: [
        '登录态采用服务端 Session：ID 存 HttpOnly Cookie，会话数据放 Redis TTL 7 天，提供强制下线接口按 userId 删档。'
      ],
      bad: [
        { say: 'session 存在浏览器里的吧', why: '概念混淆会导致安全设计错位：浏览器只有 ID，数据与控制权都在服务端。'
        }
      ]
    },
    misconceptions: [
      'Session 比 JWT 落后？两者是不同的权衡：要即时吊销与集中管控 Session 更优；要无状态横向扩展 JWT 更顺手。'
    ],
    related: ['cookie', 'jwt', 'oauth2']
  },

  {
    id: 'jwt',
    en: 'JWT',
    zh: 'JWT 令牌',
    aliases: ['JSON Web Token'],
    cat: 'backend',
    tags: ['认证'],
    level: 'common',
    summary: '自带签名的三段式令牌：服务器不发档案袋，凭票面上的签名当场验真。',
    plain: [
      'JWT 把身份信息直接写进令牌：Header（算法）.Payload（用户 ID、过期时间等声明）.Signature（前两段用密钥哈希的签名）。服务端收到后只需用密钥重算签名比对——通过即信，无需查库存档。这就是「无状态认证」：会话数据在客户端手里，防伪靠密码学。',
      '特性两面：无状态让水平扩容零负担、跨服务传递方便；但「签发后无法撤销」是硬伤——改了密码、封了号，旧 token 在过期前依然畅通。缓解手段：短有效期（15 分钟）+ Refresh Token 轮换、重要操作二次校验、黑名单兜底（那就部分回到有状态了）。',
      '安全红线两条：Payload 仅 Base64 编码并非加密，任何人可解码查看——绝不放敏感数据；密钥泄露等于全线失守，必须入环境变量并定期轮换。'
    ],
    analogy: 'JWT 像演唱会的手环票：票面印着座位与场次还盖着防伪钢印（签名），闸机当场验印放行不必查名单（无状态）；可惜票一旦出手，开场前想作废很难（难吊销）。',
    visual: { kind: 'svg', id: 'jwt-anatomy', caption: '三段结构与签名验真' },
    talk: {
      good: [
        'API 认证改用双令牌：access_token 15 分钟 + refresh_token 7 天旋转刷新；logout 时 refresh_token 入 Redis 黑名单。'
      ],
      bad: [
        { say: 'token 里塞上用户的手机号和角色明细', why: 'Payload 对所有人可见，敏感信息等于明文广播；只放不可敏感的标识与必要声明。'
        }
      ]
    },
    misconceptions: [
      '用了 HTTPS 就可以把 JWT 当加密信封？HTTPS 保护的是传输过程；令牌本体仍可被持有者解码，加密需求要用 JWE 等专门的加密方案。'
    ],
    related: ['session', 'oauth2', 'headers-body', 'tls-certificate']
  },

  {
    id: 'oauth2',
    en: 'OAuth 2.0',
    zh: 'OAuth 2.0 授权',
    aliases: ['OAuth'],
    cat: 'backend',
    tags: ['认证', '授权'],
    level: 'advanced',
    summary: '让用户授权第三方应用访问其在别处的资源，而不用交出密码的行业标准流程。',
    plain: [
      'OAuth 2.0 解决的问题一句话：如何让「某某应用」访问你在「某平台」的数据，却不需要把平台密码交给它。最经典的授权码流程四步走：应用把你重定向到平台授权页 → 你登录并同意 → 平台带着一次性授权码跳回应用预设地址 → 应用在后端用授权码换 access token，随后凭 token 调平台 API。',
      '区分两个常被混用的词：认证（Authentication，你是谁）与授权（Authorization，你能干什么）。OAuth 本职是授权框架；「用微信登录」之所以可行，是因为 OIDC（OpenID Connect）在 OAuth 之上补充了身份层。',
      '工程要点：state 参数防 CSRF 必带；client_secret 只能存在服务端（所谓前后端分离的「隐式流」已被废弃）；refresh token 安全保管与轮换。接入第三方登录时，把完整回调流程时序图交给 AI 再让它写代码，正确率远高于口头描述。'
    ],
    analogy: 'OAuth 像酒店代客泊车：你把代客泊车卡（授权 token）交给服务生，他能挪车（限定范围的权限）却拿不到你的家门钥匙（密码）；卡可随时挂失（吊销）。',
    talk: {
      good: [
        '接入 GitHub OAuth 登录：授权码流程，redirect_uri 白名单校验，state 随机会话存储比对；换取的 token 只存服务端。'
      ],
      bad: [
        { say: '做个微信登录很简单吧', why: '涉及回调域名、scope 申请与安全流程，轻视复杂度会导致上线前卡在平台审核与安全漏洞。'
        }
      ]
    },
    misconceptions: [
      'OAuth 就是登录协议？它管的是授权委托；完整的「第三方登录」还需要 OIDC 提供 ID Token 才算认证闭环。'
    ],
    related: ['jwt', 'session', 'https', 'api']
  },

  {
    id: 'idempotency',
    en: 'Idempotency',
    zh: '幂等性',
    cat: 'backend',
    tags: ['可靠性', '设计'],
    level: 'core',
    summary: '同一操作执行一次与执行一百次的效果相同：重试风暴时代的生存技能。',
    plain: [
      '网络世界里「请求发出去了，但响应丢了」是常态：超时的客户端会重试、消息队列会重投、用户会狂点按钮。若「扣款」这种操作不设防，重试十次扣十次款——幂等性就是为此而生：任意次重放的副作用与一次相同。',
      '实现手法按场景选择：唯一业务键约束（订单号唯一索引，重复插入直接拒绝）；幂等令牌（客户端先领一个 token，提交携带，服务端用过即焚，重放返回首次结果）；条件更新（UPDATE ... SET status=paid WHERE status=unpaid，影响行数为零说明已处理过）。天然幂等的还有 GET、PUT、DELETE 等 HTTP 方法语义。',
      '凡是会被重试的入口——支付回调、消息消费者、跨服务调用——都必须显式回答「重复了怎么办」。评审 AI 生成的这类代码时，「找不到幂等设计」就是最高优先级意见。'
    ],
    analogy: '电梯按钮按多少次都只叫一部电梯：系统内部对重复指令做了合并（幂等）；假如每按一次多派一部梯，早高峰的大堂就是灾难现场。',
    visual: { kind: 'svg', id: 'idempotent-retry', caption: '带幂等键的重试不会重复生效' },
    talk: {
      good: [
        '支付回调按平台交易号做幂等键唯一索引：首收到账记账，重复通知直接返回上次处理结果，不重复发放权益。'
      ],
      bad: [
        { say: '网络抖动就加重试呗', why: '无幂等保护的重试会把瞬时故障放大成资损事故；重试策略必须与幂等设计成对出现。'
        }
      ]
    },
    misconceptions: [
      'POST 天生不幂等所以无法做到？HTTP 方法的默认语义如此，但业务层完全可以通过唯一键与令牌把任意接口设计成幂等。'
    ],
    related: ['http-methods', 'message-queue', 'webhook', 'rpc']
  },

  {
    id: 'rate-limiting',
    en: 'Rate Limiting',
    zh: '限流',
    aliases: ['速率限制', '流量整形'],
    cat: 'backend',
    tags: ['稳定性', '安全'],
    level: 'common',
    summary: '给接口装上门闸控制单位时间流量：保护自己不被挤垮，也防恶意刷子。',
    plain: [
      '限流算法各有性格：固定窗口计数最简单（每分钟最多 N 次，临界突刺明显）；滑动窗口平滑一些；令牌桶允许短时突发又限制长期均值（最常用）；漏桶则把出口流量整形成匀速。维度上还要决定「按谁限」：IP、用户 ID、API Key 各有适用。',
      '工程落点分布在多层：网关层粗粒度全局限流（Nginx limit_req）、应用层按接口精细限流（注解/中间件）、下游依赖保护（对第三方 API 的调用频率自律）。被限流时按规范返回 429 与 Retry-After 头，客户端据此退避重试。',
      '与 AI 协作时给出完整规格：「短信接口按手机号每小时 5 条、按 IP 每小时 20 条，超限返回 429 与剩余等待秒数；用 Redis 滑动窗口实现」。限流参数从来不是拍脑袋，而是容量评估的结果。'
    ],
    analogy: '限流像景区的闸机放行：无论门口多少人，每分钟只放 500 人入园（阈值），超出的领取「几点再来」的小卡片（Retry-After）——园内体验保住了，谁也别想把门挤塌。',
    visual: { kind: 'svg', id: 'token-bucket', caption: '令牌桶：突发有余，均值受控' },
    talk: {
      good: [
        '为验证码接口加双层限流：同 IP 每 10 分钟 6 次，同账号每小时 10 次；Redis INCR+EXPIRE 实现，超限返回 429。'
      ],
      bad: [
        { say: '被人刷接口了赶紧加个限制', why: '应急限流若无监控与白名单，容易误伤真实大客户；先看流量画像再定阈值。'
        }
      ]
    },
    misconceptions: [
      '限流是为了省服务器钱？首要目的是稳定性保护（防雪崩、防刷）与公平性；省钱只是副产品。'
    ],
    related: ['middleware', 'idempotency', 'monitoring']
  }

  );
})(window);
