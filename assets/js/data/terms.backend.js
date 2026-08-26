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
  },

  {
    id: 'api-versioning',
    en: 'API Versioning',
    zh: '接口版本管理',
    aliases: ['版本管理', 'API 版本', 'versioning', 'v1', 'v2'],
    cat: 'backend',
    tags: ['API', '设计'],
    level: 'common',
    summary: '接口变了别覆盖旧的：用 /v1 /v2 或 Header 标版本，老客户端才能平滑过渡。',
    plain: [
      '接口发布后会被客户端依赖，直接改字段或语义会让老客户端崩。版本管理的思路：接口升级时保留旧版本，新版本并行，客户端按版本调用，给老版本留出迁移时间。',
      '常见方式：路径版本（/v1/users、/v2/users，最直观）、Header 版本（Accept: application/vnd.api+json;version=2）、参数版本。路径版本最常用也最好排错。什么时候该加版本：破坏性变更（删字段、改类型、改语义）必须加；加字段、加可选参数这类向后兼容的变更不用加。',
      '跟 AI 说「这里字段要改名，请新增 v2 接口并保留 v1」，它就会做兼容处理；说「帮我改这个接口」它可能直接覆盖旧接口，线上老客户端就崩了。'
    ],
    analogy: '接口版本像手机系统升级：系统 1.0 的 App 还能在系统 2.0 上跑（兼容），但 App 新版只支持系统 2.0——你不能让老 App 立刻消失，要给用户升级时间。',
    talk: {
      good: [
        '这个响应要删掉旧字段，请新增 /v2 接口并保留 v1，标记 v1 为弃用。',
        '新增一个可选参数即可，属向后兼容，不用升版本。'
      ],
      bad: [
        { say: '帮我把接口字段改一下', why: '没说是否破坏性变更，AI 可能直接改旧接口，老客户端立刻出错。' }
      ]
    },
    misconceptions: [
      '每个改动都该升版本？只有破坏性变更才需要，加字段等兼容改动升版本是过度设计。',
      '版本号放在哪都一样？路径版本最直观易排查，Header 版本对客户端透明但对调试不友好。'
    ],
    related: ['api', 'rest', 'api-documentation']
  },

  {
    id: 'api-pagination',
    en: 'API Pagination',
    zh: '接口分页',
    aliases: ['分页', 'page', 'offset', 'cursor', 'pagination'],
    cat: 'backend',
    tags: ['API', '性能'],
    level: 'common',
    summary: '列表接口别一次全返回：page 分页简单、cursor 分页扛大数据，翻页还带总数与游标。',
    plain: [
      '列表接口全量返回会在数据大时拖垮服务端和网络，所以要分页。两种主流：偏移分页（page=2&size=20，跳页方便）和游标分页（cursor=xxxx，基于上一页最后一条继续，适合海量数据且插入不影响）。',
      '游标分页比偏移分页稳：offset 分页在数据中间插入/删除时会重复或漏数据，深翻页（offset 很大）时数据库查询也慢。响应里除了列表，还要返回总数或下一页游标，方便前端渲染分页器和加载更多。',
      '跟 AI 说「列表接口用游标分页，返回 next_cursor」，它给的就是适合大数据量的方案；只说「加个分页」它默认 offset 分页，深翻页会慢。'
    ],
    analogy: '分页像翻相册：offset 分页是「直接翻到第 20 页」，但如果中间删了几张照片，页码就对不上了；cursor 分页是「接着上次看到的那张往后翻」，永远连续不错位。',
    talk: {
      good: [
        '列表接口支持分页，返回 items、total、has_more，默认每页 20 条。',
        '数据可能百万级，请用游标分页而不是 offset。'
      ],
      bad: [
        { say: '列表一次全返回太慢了', why: '没说数据量和翻页方式，AI 可能只是加个 size 参数而没做游标或总数设计。' }
      ]
    },
    misconceptions: [
      'offset 分页够用？数据量大或并发写入时重复/漏数据，深翻页还慢。',
      '分页只改接口就够？前端分页组件、总数统计、排序稳定都要配套设计。'
    ],
    related: ['api', 'rest', 'api-versioning']
  },

  {
    id: 'error-response',
    en: 'Unified Error Response',
    zh: '统一错误响应',
    aliases: ['错误响应', '错误结构', '错误码', 'error response'],
    cat: 'backend',
    tags: ['API', '设计'],
    level: 'common',
    summary: '所有接口出错都返回同一结构：状态码 + 错误码 + 消息 + 详情，前端才能统一处理。',
    plain: [
      '接口出错时如果每个接口返回格式都不一样，前端要写一堆分支判断。统一错误响应的做法：所有错误返回相同 JSON 结构，比如 { code: \'VALIDATION_FAILED\', message: \'邮箱格式不正确\', detail: {...} }，配合合适的 HTTP 状态码（400 参数错、401 未登录、403 无权限、404 不存在、500 服务端错）。',
      '好的错误响应：有稳定的错误码（机器可判断，不要靠解析中文消息）、有人能读的消息（给用户看）、有内部细节（给开发者排查，线上要脱敏）。',
      '跟 AI 说「所有接口统一错误响应结构，业务错误码区分具体原因」，它就能给你一个全局的错误处理中间件；不说它可能每个接口各写各的。'
    ],
    analogy: '统一错误响应像医院的统一挂号单：不管什么病都先按统一格式挂号（code+message），医生看单就知道类型；如果每个科室各用各的单子，病人（前端）就懵了。',
    talk: {
      good: [
        '所有接口出错统一返回 { code, message, detail }，配合正确的 HTTP 状态码。',
        '校验失败返回 400 和 VALIDATION_FAILED 错误码，前端据此展示。'
      ],
      bad: [
        { say: '接口报错信息能看就行', why: '没要求统一结构，前端就得为每个接口写不同的错误解析。' }
      ]
    },
    misconceptions: [
      '状态码对就行，不用错误码？状态码只有十几类，具体原因要靠业务错误码区分。',
      '错误消息直接拼给用户？消息要适合展示，内部细节（堆栈）要脱敏。'
    ],
    related: ['api', 'request-validation', 'rest']
  },

  {
    id: 'request-validation',
    en: 'Request Validation',
    zh: '请求参数校验',
    aliases: ['参数校验', '入参校验', 'validation', 'schema'],
    cat: 'backend',
    tags: ['API', '安全'],
    level: 'common',
    summary: '进接口先验参数：类型、必填、范围、格式一次查完，非法请求在门口就挡掉。',
    plain: [
      '后端必须假设所有入参都不可信：字段类型对不对、是否必填、取值范围、格式（邮箱/手机号/日期）、长度限制，都要在进入业务逻辑前校验。前端校验只是体验，后端校验才是安全底线。',
      '规范做法：用 schema 声明参数规则（如 JSON Schema、Pydantic、Zod、Joi），自动校验并生成统一错误。好处：少写一堆手写 if、规则可复用、错误信息统一。',
      '跟 AI 说「给这个接口加参数校验 schema：id 是正整数、email 是邮箱格式、limit 最大 100」，它一次到位；说「帮我校验参数」它可能手写 if-else 还漏边界。'
    ],
    analogy: '参数校验像机场安检：不管行李里有什么，先过 X 光机（类型、大小、违禁品）——不是到了飞机上才发现问题，而是在登机口就拦下。',
    talk: {
      good: [
        '给创建接口加校验：name 必填且不超过 50 字，age 是 0-150 整数。',
        '用 JSON Schema 声明参数规则，自动返回统一校验错误。'
      ],
      bad: [
        { say: '帮接口加个校验', why: '没说规则和方式，AI 可能只在个别字段手写 if，漏了类型和边界。' }
      ]
    },
    misconceptions: ['前端校验过就够了？前端可绕过，后端不校验等于把大门敞开。', '校验只是判断空不空？类型、格式、范围、长度、枚举都是校验范围。'],
    related: ['api', 'error-response', 'idempotency']
  },

  {
    id: 'graceful-shutdown',
    en: 'Graceful Shutdown',
    zh: '优雅停机',
    aliases: ['优雅停机', '平滑关闭', 'graceful shutdown', '平滑重启'],
    cat: 'backend',
    tags: ['运维', '可靠性'],
    level: 'advanced',
    summary: '停服务时先停止接新请求、把手头请求处理完、等任务收尾再退出，别一刀切。',
    plain: [
      '直接 kill 服务进程，正在处理的请求会被掐断，用户看到超时、数据写到一半。优雅停机：收到停止信号后，先停止接收新请求（从负载均衡摘除、关闭监听），再让正在处理的请求走完，等待后台任务收尾、释放资源，最后才退出。',
      '实现要点：信号监听（SIGTERM）、超时上限（比如 30 秒内处理不完就强制退出，别无限等）、幂等设计（重启后能安全继续）。配合容器和 K8s 的滚动更新，能做到用户无感知升级。',
      '跟 AI 说「部署更新时不要断用户请求，加优雅停机，处理中请求等最多 30 秒」，它就知道怎么写；说「停一下服务」它可能直接粗暴退出。'
    ],
    analogy: '优雅停机像书店打烊：不是到点「啪」地拉闸赶人，而是挂上「暂停营业」牌子（停止接客）、让店里顾客结完账（处理完请求）、关灯锁门（释放资源）——客人不被轰出去。',
    talk: {
      good: [
        '监听 SIGTERM，先停止接收新请求，再等处理中的请求完成，超时 30 秒强制退出。',
        '部署脚本先摘除负载均衡里的实例，再发停止信号。'
      ],
      bad: [
        { say: '升级时用户老是报错', why: '多半是直接杀进程；不点破优雅停机，AI 可能只是在代码里加 try-catch。' }
      ]
    },
    misconceptions: ['优雅停机就是 catch 异常？它是进程级信号处理，不只是代码内异常。', '停机等所有请求？要给超时上限，否则永远等不完。'],
    related: ['health-check', 'load-balancer', 'logging']
  },

  {
    id: 'retry-backoff',
    en: 'Retry & Backoff',
    zh: '重试与退避',
    aliases: ['重试', '退避', 'retry', 'backoff', '指数退避'],
    cat: 'backend',
    tags: ['可靠性', '网络'],
    level: 'advanced',
    summary: '请求失败不要立刻重试：退避（指数递增等待）+ 抖动 + 最大次数，避免雪崩。',
    plain: [
      '调用外部服务失败（超时、5xx）时重试是常见恢复手段，但盲目重试会放大故障：服务端本来就忙，你 100 个客户端同时立刻重试，直接把它压垮（重试风暴）。',
      '规范做法：指数退避（第一次等 1 秒、第二次 2 秒、4 秒……）+ 抖动（加随机量，避免所有客户端同步重试）+ 最大重试次数 + 只对幂等操作重试（POST 非幂等，重试可能重复下单）。',
      '跟 AI 说「这个请求失败重试 3 次，指数退避加抖动，只对 GET 重试」，它给的就是不会放大故障的实现；说「失败了重试一下」它可能立刻死循环重试。'
    ],
    analogy: '重试退避像电话占线时再拨：不是马上又拨（对方还在忙，你也挤占线路），而是等一会、再等久一点、加一点随机间隔——给线路喘息，也避免所有占线的人同时再拨（雪崩）。',
    talk: {
      good: [
        '请求失败最多重试 3 次，用指数退避加 0-500ms 随机抖动。',
        '这个 POST 请求不幂等，失败不要自动重试，提示用户确认。'
      ],
      bad: [
        { say: '失败了自动重试一下', why: '没说次数、间隔、幂等性，AI 可能立刻连着重试，把下游打挂。' }
      ]
    },
    misconceptions: ['重试越多越可靠？越多越可能放大故障，要限次数和退避。', '所有请求都能重试？非幂等的写操作重试会重复执行，必须谨慎。'],
    related: ['idempotency', 'circuit-breaker', 'rate-limiting']
  },

  {
    id: 'circuit-breaker',
    en: 'Circuit Breaker',
    zh: '熔断器',
    aliases: ['熔断', '熔断器', 'circuit breaker', '服务降级'],
    cat: 'backend',
    tags: ['可靠性', '分布式'],
    level: 'advanced',
    summary: '下游连续失败就「跳闸」：不再发请求、直接快速失败，隔一阵试探恢复，防止故障连锁。',
    plain: [
      'A 服务调用 B 服务，B 挂了，如果 A 一直等超时，请求越积越多，A 的线程被拖垮，进而拖垮依赖 A 的 C——故障像多米诺。熔断器思路：监控调用失败率，连续失败超过阈值就「断开」，后续请求不再真正调用下游，直接快速失败（返回错误或降级数据）。',
      '三个状态：闭合（正常调用）、打开（熔断，快速失败）、半开（过一段时间放少量试探请求，成功则恢复闭合，失败继续打开）。熔断后通常配合降级：返回缓存数据或友好提示，而不是让用户看到 500。',
      '跟 AI 说「给这个外部调用加熔断：失败率超 50% 熔断 30 秒，半开状态放 1 个试探请求」，它能给标准实现；说「下游挂了别拖垮我们」它可能只会加超时。'
    ],
    analogy: '熔断器像家里的空气开关：线路短路（下游故障）时自动跳闸，不让你继续烧坏整个电路；过一会儿你试着推上去（半开试探），如果还短路就再跳——而不是一直通电硬撑。',
    talk: {
      good: [
        '给支付服务调用加熔断，失败率超 50% 熔断 30 秒，熔断期间返回降级结果。',
        '熔断恢复用半开状态，放少量试探请求验证下游是否恢复。'
      ],
      bad: [
        { say: '下游挂了我们也被拖死', why: '这是典型需要熔断的场景；不点破，AI 可能只加超时或重试，反而加重故障。' }
      ]
    },
    misconceptions: [
      '熔断和重试可以一起随便配？熔断打开时不要重试，否则试探请求变成重试风暴。',
      '熔断只是省资源？核心是防止故障连锁扩散，保护整个调用链。'
    ],
    related: ['retry-backoff', 'load-balancer', 'health-check']
  },

  {
    id: 'load-balancer',
    en: 'Load Balancer',
    zh: '负载均衡',
    aliases: ['负载均衡', 'LB', '轮询', '一致性哈希', 'load balance'],
    cat: 'backend',
    tags: ['架构', '可靠性'],
    level: 'advanced',
    summary: '把请求分发到多台服务器：轮询、最少连接、一致性哈希，还顺带做健康检查和摘除。',
    plain: [
      '一台服务器扛不住就上多台，负载均衡器（LB）负责把进来的请求按策略分发：轮询（轮流）、最少连接（谁闲给谁）、IP 哈希（同一用户固定一台，利于会话保持）、一致性哈希（利于缓存命中）。',
      '负载均衡还附带能力：健康检查（自动摘除挂掉的实例）、会话保持、TLS 终止、限流。它是水平扩展和「单点故障」解药——但 LB 自身又成单点，所以一般高可用部署（多 LB）。',
      '跟 AI 说「三台实例做负载均衡，轮询策略，带健康检查自动摘除」，它能配出可靠方案；说「加几台机器抗流量」它可能漏了会话保持或健康检查。'
    ],
    analogy: '负载均衡像医院的叫号分诊：一个医生忙不过来就开三个诊室，护士（LB）按「谁空给谁」分诊——还会把请假的医生（故障实例）的牌子摘掉，不往空诊室安排病人。',
    talk: {
      good: ['多实例部署加负载均衡，用轮询策略，配健康检查自动摘除故障实例。', '需要会话保持的场景请用 IP 哈希或粘性会话。'],
      bad: [
        { say: '服务器扛不住加两台', why: '没说怎么分发、会话怎么办、健康检查，AI 只能给个最简 LB 配置。' }
      ]
    },
    misconceptions: [
      '负载均衡只是分流量？它还承担健康检查、摘除、会话保持等可靠性职责。',
      '轮询永远够用？后端性能不均或需要缓存命中时，最少连接/一致性哈希更合适。'
    ],
    related: ['health-check', 'reverse-proxy', 'api-gateway']
  },

  {
    id: 'health-check',
    en: 'Health Check',
    zh: '健康检查',
    aliases: ['健康检查', '探活', 'healthcheck', 'readiness', 'liveness'],
    cat: 'backend',
    tags: ['运维', '可靠性'],
    level: 'common',
    summary: '探活接口告诉外部自己活着没：liveness 看进程、readiness 看依赖，负载均衡据此摘除。',
    plain: [
      '健康检查是服务向外界报告「我是否可用」的接口（通常是 /health 或 /healthz）。负载均衡、容器编排（K8s）、监控系统定期调用它，来判断要不要把流量发给你、要不要重启你。',
      '两类探针别混：liveness（活没活，进程/主循环是否健康，挂了就重启）和 readiness（准备好没有，依赖数据库/缓存/下游是否就绪，没就绪就不接流量但别重启）。只做 liveness 会导致「进程活着但依赖挂了」还在硬扛流量。',
      '跟 AI 说「加 /health 接口，readiness 检查数据库连接、liveness 只查进程」，它给出的探针语义就对了；说「加个健康检查接口」它可能只是 return ok，啥也不查，等于没有。'
    ],
    analogy: '健康检查像出勤打卡：liveness 是「我起床了」（进程活着），readiness 是「我准备好上班了」（依赖都就绪）——起床了但没准备好，不该派活（接流量），也别让我辞职（重启）。',
    talk: {
      good: [
        '提供 /health/ready 检查数据库连接，/health/live 只检查进程存活。',
        '健康检查失败时从负载均衡摘除，恢复后再挂回。'
      ],
      bad: [
        { say: '加个健康检查接口', why: '没说检查什么依赖，AI 可能写个永远返回 ok 的空接口，起不到探活作用。' }
      ]
    },
    misconceptions: [
      '健康检查返回 ok 就行？要真正检查关键依赖，否则探活形同虚设。',
      'liveness 和 readiness 一样？liveness 管重启，readiness 管流量，职责不同。'
    ],
    related: ['load-balancer', 'graceful-shutdown', 'monitoring']
  },

  {
    id: 'api-documentation',
    en: 'API Documentation (OpenAPI)',
    zh: '接口文档',
    aliases: ['OpenAPI', 'Swagger', '接口文档', 'API 文档'],
    cat: 'backend',
    tags: ['API', '协作'],
    level: 'common',
    summary: '用 OpenAPI 描述接口：路径、参数、响应自动生成文档和测试工具，前后端照着对。',
    plain: [
      '接口文档是前后端协作的契约：每个路径、方法、参数、请求体、响应结构、错误码都写清楚。OpenAPI（前身 Swagger）是标准格式，能用它自动生成可视化文档（Swagger UI）、在线调试、甚至生成客户端代码。',
      '最大价值是「契约先行」：前后端按同一份 spec 开发，前端 mock 用 spec 生成，后端实现校验 spec，联调时少扯皮。文档和代码不同步是常见病，所以规范做法是「代码生成文档」或「文档驱动开发」。',
      '跟 AI 说「用 OpenAPI 给这个接口写文档，标注 200/400/401 响应」，它给的 spec 前后端都能用；说「写个接口文档」它可能给你个 Markdown，和代码脱节。'
    ],
    analogy: '接口文档像建筑图纸：设计师（后端）和施工队（前端）都按同一张图纸干活，图纸标准化（OpenAPI）后还能自动算出材料清单（生成 SDK）——没有图纸就各凭想象，墙对不上门。',
    talk: {
      good: [
        '给 /users 接口写 OpenAPI 文档，包含参数校验规则和 200/400 响应示例。',
        '用 OpenAPI 生成前端类型定义，避免手写接口类型。'
      ],
      bad: [
        { say: '帮我写个接口文档', why: '没说格式和内容，AI 可能写个和代码不同步的 Markdown。' }
      ]
    },
    misconceptions: [
      '文档写一次就行？文档要和代码同步，否则比没有更坑。',
      'Swagger 就是工具？Swagger 是 OpenAPI 的工具集，规范本身叫 OpenAPI。'
    ],
    related: ['api', 'rest', 'api-versioning']
  },

  {
    id: 'async-worker',
    en: 'Async Tasks & Worker Queue',
    zh: '异步任务队列',
    aliases: ['异步任务', '任务队列', 'worker', '后台任务', '消息队列'],
    cat: 'backend',
    tags: ['架构', '性能'],
    level: 'advanced',
    summary: '耗时操作别堵住请求：丢进队列让 worker 慢慢做，接口立刻返回，还能重试和削峰。',
    plain: [
      '发邮件、生成报表、处理视频这类耗时操作如果同步做，接口要等很久。异步任务的做法：接口把任务丢进队列（Redis List、RabbitMQ、Kafka），立即返回「已受理」；后台 worker 从队列取任务慢慢处理。',
      '好处：接口响应快、能削峰（请求多时任务排队慢慢消化）、失败可重试、可水平扩展 worker。要点：任务要幂等（可能处理多次）、要设置超时和死信队列（处理失败的任务别丢）。',
      '跟 AI 说「发邮件改成异步：接口入队立即返回，worker 消费，失败重试」，它就是规范做法；说「发邮件太慢」它可能只是调大超时，治标不治本。'
    ],
    analogy: '异步任务像餐厅外卖：顾客（请求）下单后立刻拿到小票走人（接口立即返回），订单进后厨队列，厨师（worker）有空就做；单子多就排队，做坏重做（重试），做不了的进「疑难单」箱（死信队列）。',
    talk: {
      good: [
        '邮件发送改为异步：请求入队立即返回，worker 消费队列并支持失败重试。',
        '任务处理必须幂等，支持重试，重试多次仍失败进死信队列。'
      ],
      bad: [
        { say: '这个操作太慢，帮我优化', why: '没说能否异步化、用什么队列，AI 可能只是微调代码，没解决同步阻塞。' }
      ]
    },
    misconceptions: [
      '异步任务就是开个线程？要配合持久化队列才可靠，进程重启任务不丢。',
      '任务丢进队列就完事？要考虑重试、死信、幂等，否则任务静默丢失。'
    ],
    related: ['message-queue', 'background-job', 'idempotency']
  },

  {
    id: 'serverless',
    en: 'Serverless',
    zh: 'Serverless 无服务器',
    aliases: ['无服务器', '云函数', 'FaaS', 'serverless'],
    cat: 'backend',
    tags: ['架构', '云'],
    level: 'advanced',
    summary: '不自己管服务器，代码跑在按调用计费的云函数里：自动扩缩、免运维，但不适合长连接。',
    plain: [
      'Serverless 让你不关心服务器：把函数代码交给云平台（云函数、Lambda），平台负责拉起、运行、扩缩容，按调用次数和时长计费。没有流量时不运行、不花钱，有流量自动水平扩展到成千上万个实例。',
      '适合：波动大、低频、事件驱动的任务（webhook、定时任务、图像处理）；不适合：长连接（WebSocket）、有状态服务、冷启动敏感的场景（首次调用有几百毫秒到几秒冷启动延迟）。',
      '跟 AI 说「这个 webhook 处理逻辑适合 serverless 云函数，注意冷启动」，它就知道权衡；说「都用 serverless」它可能忽略了长连接和有状态需求。'
    ],
    analogy: 'Serverless 像按次付费的健身房团课：不用自己租场地（买服务器），每次开课（有调用）才付费，人多人少健身房自己安排教练数量（自动扩缩）——但你想在里面常年寄存行李（长连接/有状态）就不行。',
    talk: {
      good: [
        '这个 webhook 处理用云函数，注意控制冷启动影响。',
        '这个场景需要 WebSocket 长连接，不适合 serverless，用常驻服务。'
      ],
      bad: [
        { say: '都用 serverless 吧', why: '没评估状态、长连接、冷启动，AI 全盘 serverless 会导致不适合的模块出问题。' }
      ]
    },
    misconceptions: [
      'Serverless 就是没有服务器？只是你不用管，服务器仍然存在（平台管）。',
      'Serverless 又快又便宜？冷启动延迟和调用定价要评估，高频低延迟场景未必合适。'
    ],
    related: ['containerization', 'api-gateway', 'health-check']
  },

  {
    id: 'containerization',
    en: 'Containerization (Docker)',
    zh: '容器化',
    aliases: ['Docker', '容器', '镜像', 'container'],
    cat: 'backend',
    tags: ['部署', '工程'],
    level: 'common',
    summary: '把应用和环境打包成镜像，到处跑都一样：镜像不可变、一次构建多处运行、秒级起停。',
    plain: [
      '容器化（Docker）把「应用 + 运行环境（依赖、配置、系统库）」打包成一个镜像，在任何装 Docker 的机器上都能以相同方式运行。解决了「在我机器上能跑」的经典问题。',
      '镜像不可变：构建好就不变，部署就是换新镜像（可回滚）；容器秒级启动，比虚拟机轻；配合编排（K8s）能做自动扩缩和自愈。要点：镜像要小（用精简基础镜像）、分层缓存、敏感信息别写进镜像。',
      '跟 AI 说「写个 Dockerfile：多阶段构建、用非 root 用户、镜像尽量小」，它给的就是生产级模板；说「打个包部署」它可能随便写个巨型镜像。'
    ],
    analogy: '容器像方便面的标准包装：面饼、料包、说明都固定打包（应用+环境），任何有热水（Docker）的地方泡出来都是同一碗味道——不会因为「这家的水不一样」味道就变了。',
    talk: {
      good: [
        '写 Dockerfile 用多阶段构建，运行时镜像只保留产物，用非 root 用户。',
        '敏感配置通过环境变量注入，不要写死在镜像里。'
      ],
      bad: [
        { say: '帮我写个 Dockerfile', why: '没说语言、依赖、要不要多阶段，AI 可能写出巨大镜像或含敏感信息的镜像。' }
      ]
    },
    misconceptions: [
      '容器就是轻量虚拟机？容器共享宿主机内核，隔离的是进程和文件，比虚拟机轻但隔离也弱。',
      '镜像越大越全越好？镜像越大拉取越慢、攻击面越大，要精简。'
    ],
    related: ['serverless', 'ci-cd', 'env-var']
  },

  {
    id: 'sse',
    en: 'Server-Sent Events (SSE)',
    zh: 'SSE 服务器推送',
    aliases: ['SSE', '服务器推送', 'EventSource', 'Server-Sent Events'],
    cat: 'backend',
    tags: ['实时', '网络'],
    level: 'advanced',
    summary: '服务器单向持续往浏览器推消息：用普通 HTTP 长连接，自动重连，适合通知流和进度。',
    plain: [
      'SSE 让服务器主动向浏览器推送消息（单向：服务器→客户端），走普通 HTTP，浏览器用 EventSource 接口接收，自带断线自动重连和 event id 续传。适合：实时通知、任务进度、聊天消息流、股票行情这类「服务器有更新就推」。',
      '和 WebSocket 的区别：SSE 单向且基于 HTTP（无需专门协议，穿透代理容易）、自动重连；WebSocket 双向、适合聊天这种需要客户端也实时发消息的场景。选型：只需服务器推→SSE 更简单；需要双向→WebSocket。',
      '跟 AI 说「任务进度用 SSE 推给前端，带 event id 支持断线重连」，它给的就是轻量方案；说「做实时推送」它可能默认上 WebSocket，单向场景反而复杂了。'
    ],
    analogy: 'SSE 像电台广播：电台（服务器）单向播报，你（浏览器）听就行，信号断了收音机（EventSource）会自动重新调到频道（自动重连）——你不需要回复电台。',
    talk: {
      good: [
        '进度通知用 SSE：服务器每 500ms 推一次进度，EventSource 接收并处理重连。',
        '这个场景只需要服务器推消息，用 SSE 而不是 WebSocket，更简单。'
      ],
      bad: [
        { say: '做实时推送', why: '没说单向还是双向，AI 可能默认上 WebSocket，单向场景增加复杂度。' }
      ]
    },
    misconceptions: [
      'SSE 和 WebSocket 一样？SSE 单向、基于 HTTP、自动重连；WebSocket 双向、独立协议。',
      'SSE 只能推文本？推的是文本流（通常是 JSON 字符串），够大多数场景。'
    ],
    related: ['websocket', 'http', 'async-worker']
  },

  {
    id: 'authentication-vs-authorization',
    en: 'Authentication vs Authorization',
    zh: '认证与授权',
    aliases: ['认证', '授权', 'authn', 'authz', '登录', '权限'],
    cat: 'backend',
    tags: ['安全', '权限'],
    level: 'common',
    summary: '认证确认「你是谁」，授权决定「你能干什么」：先登录认证，再按角色/权限放行。',
    plain: [
      '两个常被混为一谈的概念：认证（Authentication）回答「你是谁」——通过密码、验证码、OAuth 登录确认身份；授权（Authorization）回答「你能做什么」——登录后有没有权限访问某个接口、资源。先认证，后授权。',
      '授权的常见模型：RBAC（基于角色：用户→角色→权限）、ABAC（基于属性：如「只能看自己部门的数据」）。实践上：每个受保护接口都要做授权检查，不能只验证「登录了」就放行——登录只解决认证，权限要单独查。',
      '跟 AI 说「这个接口登录用户可访问，但删除操作只有 admin 角色可以」，它就把认证和授权分开实现；说「加个登录校验」它可能只验登录，权限全放行。'
    ],
    analogy: '认证像进大厦出示工牌确认「你是谁」，授权像刷卡后电梯只停在你权限范围内的楼层——有工牌（认证成功）不代表你能进每一层（授权决定）。',
    talk: {
      good: ['所有接口先做登录认证，删除接口额外校验 admin 角色。', '用 RBAC 模型：用户关联角色，角色关联权限，接口校验权限。'],
      bad: [
        { say: '加个权限判断', why: '没说认证和授权怎么分层，AI 可能只在登录时判断一次，接口层没做授权。' }
      ]
    },
    misconceptions: ['登录了就什么都能做？登录只是认证，每个接口还要单独授权。', '认证和授权是一个东西？认证在前、授权在后，漏了授权就是越权漏洞。'],
    related: ['jwt', 'oauth2', 'session']
  },

  {
    id: 'stateless',
    en: 'Stateless Services',
    zh: '无状态服务',
    aliases: ['无状态', '有状态', 'stateless', 'session 外置'],
    cat: 'backend',
    tags: ['架构', '可靠性'],
    level: 'common',
    summary: '服务不把用户数据存在本地内存：任意实例都能接任意请求，才能水平扩容和随便重启。',
    plain: [
      '无状态服务：不在进程内保存用户会话等状态，请求所需的状态都来自外部（数据库、Redis、JWT 本身）。这样任何实例都能处理任何请求，扩容加实例就行，重启也不丢会话。',
      '有状态服务的痛：用户登录后会话存在实例 A 内存里，下次请求被负载均衡分到实例 B，就「不认识」用户了（除非粘性会话，但粘性破坏扩容）。所以登录态放 Redis 或 JWT（自包含），是让服务无状态的常见做法。',
      '跟 AI 说「登录态存 Redis 而不是进程内存，保证无状态可水平扩容」，它就知道关键；说「多实例部署会话老丢」——这就是有状态服务的典型症状。'
    ],
    analogy: '无状态服务像任何一家分店都能办业务：顾客（请求）在 A 店办了卡，去 B 店也能办，因为信息存在总部系统（外部存储）而不是某个柜员的脑子里（进程内存）。',
    talk: {
      good: ['登录态存 Redis，保证服务无状态，多实例部署不丢会话。', '用 JWT 自包含用户信息，服务端无需保存会话，天然无状态。'],
      bad: [
        { say: '部署多个实例后用户老被登出', why: '这是有状态会话的典型症状；不点破，AI 可能加粘性会话而牺牲扩缩容。' }
      ]
    },
    misconceptions: [
      '无状态就是不存任何东西？是不在进程内存会话状态，数据仍存外部存储。',
      '粘性会话能解决一切？能暂时解决但破坏水平扩展，实例重启仍会丢。'
    ],
    related: ['session', 'jwt', 'load-balancer']
  },

  {
    id: 'structured-logging',
    en: 'Structured Logging',
    zh: '结构化日志',
    aliases: ['结构化日志', '日志格式', 'JSON 日志', 'log'],
    cat: 'backend',
    tags: ['日志', '工程'],
    level: 'common',
    summary: '日志别写成人话散文，用 JSON 输出字段化数据：能过滤、能聚合、能画监控图。',
    plain: [
      '传统日志是「2024-01-01 12:00:00 用户登录失败」这种文本，排查时靠 grep 关键字，字段多了就没法统计。结构化日志把信息拆成字段输出 JSON：{ time, level, service, userId, event: \'login_failed\', reason: \'wrong_password\' }。',
      '好处：日志系统能按字段过滤、聚合、告警、画图（比如统计某接口的错误率）；定位问题时能按 requestId 串起一次请求的所有日志。要点：带上 traceId/requestId 关联全链路、日志级别用对（debug/info/warn/error）、别打敏感信息。',
      '跟 AI 说「日志改成 JSON 结构化，带 requestId 和 userId，方便链路追踪」，它给的就能直接接日志平台；说「帮我加日志」它可能打一堆无字段的 console.log。'
    ],
    analogy: '结构化日志像体检报告而不是口头描述：口头说「身体有点不舒服」（文本日志）没法分析，报告是「血压 130/85、血糖 6.1」（字段化）——机器能归档、能对比、能报警。',
    talk: {
      good: [
        '日志输出 JSON 格式，字段含 requestId、service、event、level，便于日志平台检索。',
        '请求日志要带 requestId，贯穿调用链，方便排查。'
      ],
      bad: [
        { say: '帮我加点日志', why: '没说格式和字段，AI 可能打人话文本日志，无法过滤聚合。' }
      ]
    },
    misconceptions: [
      '日志越多越好？打太多刷爆磁盘还淹没关键信息，要有级别和采样。',
      '日志随便记就行？不带请求 id 的日志在分布式排查时无法串链路。'
    ],
    related: ['logging', 'monitoring', 'health-check']
  },

  {
    id: 'api-gateway',
    en: 'API Gateway',
    zh: 'API 网关',
    aliases: ['网关', 'api gateway', '聚合层', 'BFF'],
    cat: 'backend',
    tags: ['架构', '入口'],
    level: 'advanced',
    summary: '所有请求先过一道总闸门：统一鉴权、限流、路由、日志，客户端只认一个入口。',
    plain: [
      '微服务多了之后，客户端不该直连几十个服务（要记一堆地址、各自鉴权），而是统一走 API 网关：网关负责路由（按路径分发到对应服务）、统一鉴权、限流、熔断、日志、跨域，客户端只面向一个入口。',
      '网关是「横切关注点」的集中地：认证、限流这类每个服务都要做的事，提到网关做一遍，各服务专注业务。代价：网关是新增单点，要高可用部署；也要避免把业务逻辑塞进网关（网关应薄）。',
      '跟 AI 说「加网关统一做鉴权、限流、路由，业务服务保持薄」，它给的架构职责就清晰了；说「加个网关」它可能把业务逻辑也塞进去，网关变成巨无霸。'
    ],
    analogy: 'API 网关像小区大门岗：所有访客（请求）先在大门登记（鉴权）、限流放行，再指引去对应的楼栋（路由）——物业（各服务）不用各自设岗，但大门自己也得是结实的（高可用），而且别让门岗顺便管住户家务（别塞业务）。',
    talk: {
      good: ['用 API 网关统一做鉴权、限流、路由和日志，服务只留业务逻辑。', '网关保持薄，复杂业务编排放在 BFF 或服务内。'],
      bad: [
        { say: '帮我们加个网关', why: '没说网关职责边界，AI 可能把业务逻辑塞进网关，导致网关臃肿难维护。' }
      ]
    },
    misconceptions: [
      '网关是性能瓶颈？高可用部署可缓解，且统一入口带来的管控收益更大。',
      '网关就是反向代理？反向代理侧重流量转发，网关还做鉴权、限流、协议转换等治理。'
    ],
    related: ['load-balancer', 'reverse-proxy', 'microservices']
  },

  {
    id: 'response-compression',
    en: 'Response Compression',
    zh: '响应压缩',
    aliases: ['gzip', 'brotli', '压缩', '压缩率'],
    cat: 'backend',
    tags: ['性能', '网络'],
    level: 'common',
    summary: 'JSON、HTML 这类文本压缩后再传能小 70%：gzip 普及、brotli 更优，图片别压。',
    plain: [
      'HTTP 响应压缩：服务端把文本内容（JSON、HTML、CSS、JS）用 gzip 或 brotli 压缩后再传输，浏览器自动解压。纯文本压缩率能到 70%+，直接降低带宽和首屏时间。',
      'gzip 老牌普及；brotli 压缩率更高（尤其文本），现代浏览器和 CDN 都支持，优先配置。注意：图片、视频本身已是压缩格式，再压没用还费 CPU；小响应（<1KB）压了反而得不偿失。',
      '跟 AI 说「开启 brotli/gzip 压缩，文本类压缩、图片视频跳过」，它给的配置就对了；说「优化接口传输大小」它可能忘了这最便宜的一步。'
    ],
    analogy: '响应压缩像发快递前真空打包：把蓬松的衣服（文本）抽成真空薄片（压缩），收货方拆开一抖就复原——衣服（图片）本来就打包严实，再抽真空没意义。',
    talk: {
      good: [
        '启用 brotli 压缩，文本类型压缩，图片视频 mime 类型排除。',
        '确认响应头带 Content-Encoding: gzip 或 br，并配好 Vary: Accept-Encoding。'
      ],
      bad: [
        { say: '接口传输数据太大', why: '没说是不是文本、当前有没有压缩，AI 可能建议改数据结构而漏了开压缩这步。' }
      ]
    },
    misconceptions: [
      '压缩对图片也有效？图片已是压缩格式，二次压缩收益极小还耗 CPU。',
      '开启压缩就万事大吉？要排除已压缩类型、处理小响应，并配 Vary 头避免缓存错乱。'
    ],
    related: ['http', 'performance-core-web-vitals', 'cdn']
  },

  {
    id: 'background-job',
    en: 'Background Jobs & Scheduling',
    zh: '后台任务调度',
    aliases: ['定时任务', 'cron', '后台任务', '调度', 'scheduler'],
    cat: 'backend',
    tags: ['工程', '运维'],
    level: 'common',
    summary: '报表、清理、对账这类任务按 cron 定时跑：注意幂等、重试、分布式下只跑一次。',
    plain: [
      '很多任务不需要用户触发：每天凌晨生成报表、清理过期数据、发送订阅邮件、对账。这类用定时调度（cron 表达式指定「每天 3 点跑」）。工具：操作系统的 cron、应用内调度器、K8s CronJob。',
      '三个坑：任务执行时间可能超过间隔（要防重叠，用锁或超时）；任务失败要重试和告警；多实例部署时同一个定时任务会在每台都跑（要分布式锁或选主，保证只执行一次）。',
      '跟 AI 说「每天凌晨 3 点跑对账任务，多实例部署要保证只执行一次，失败告警」，它就考虑全了；说「写个定时任务」它可能漏了并发和幂等。'
    ],
    analogy: '后台任务像闹钟 + 值班表：闹钟（cron）到点叫醒干活，但多台值班（多实例）不能都去干同一件事（要排班/锁），活干砸了要有人知道（告警）而不是悄悄烂尾。',
    talk: {
      good: ['每天凌晨 2 点清理过期数据，任务失败重试并告警。', '多实例部署下这个定时任务要加分布式锁，保证只在一个实例执行。'],
      bad: [
        { say: '帮我写个定时任务', why: '没说触发时间、幂等、多实例，AI 可能写出每台机器都跑一遍的重复任务。' }
      ]
    },
    misconceptions: [
      '定时任务到点就准？调度可能延迟，且任务本身执行时间要短，否则重叠。',
      '多实例部署任务自动只跑一次？不会，要分布式锁或选主机制。'
    ],
    related: ['async-worker', 'monitoring', 'idempotency']
  }
  );
})(window);
