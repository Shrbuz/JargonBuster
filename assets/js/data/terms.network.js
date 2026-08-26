/* ============================================================
   terms.network.js · 网络协议（15 词条）
   ============================================================ */
(function (W) {
  W.STD_TERMS = W.STD_TERMS || [];
  W.STD_TERMS.push(

  {
    id: 'http',
    en: 'HTTP',
    zh: 'HTTP 协议',
    aliases: ['超文本传输协议'],
    cat: 'network',
    tags: ['Web', '协议'],
    level: 'core',
    summary: '浏览器与服务器之间「一问一答」的通用语言：客户端发请求，服务器返响应，说完就散（无状态）。',
    plain: [
      '你每打开一个网页、调一次接口，本质都是一轮 HTTP 对话：客户端发出请求（方法 + 地址 + 头部 + 可选正文），服务器返回响应（状态码 + 头部 + 正文）。一来一回，任务完成。',
      'HTTP 是无状态的：上一轮对话和下一轮互不相识。所以需要 Cookie、Session、Token 这些机制来“记住你是谁”。它也是文本协议，可读性好，配合 REST 风格成为 API 设计的事实标准。',
      '和 AI 讨论接口时的基本句式就是用 HTTP 语言说话：“POST /orders 创建订单，成功返回 201 和订单 JSON；参数错误返回 422。”AI 能直接据此写出前后端代码。'
    ],
    analogy: 'HTTP 像餐厅点菜：你递菜单勾选（请求），后厨做好端上来（响应）；服务员不记得你昨天来过（无状态），所以每次都要出示会员卡（Cookie/Token）。',
    visual: { kind: 'anim', id: 'http-request-response', caption: '一次完整的请求-响应往返' },
    talk: {
      good: [
        '新增删除收藏接口：DELETE /favorites/{id}，成功 204 无返回体，收藏不存在返回 404。'
      ],
      bad: [
        { say: '写个接口能增删改查就行', why: '不说资源路径与方法约定，AI 自造风格，前端对接时对不上号。' }
      ]
    },
    misconceptions: [
      'HTTP 只能传网页？它传输的是任意字节流：JSON、图片、视频都行，“超文本”只是历史名字。'
    ],
    related: ['https', 'http-methods', 'status-codes', 'rest']
  },

  {
    id: 'https',
    en: 'HTTPS',
    zh: 'HTTPS 加密通道',
    aliases: ['HTTP over TLS'],
    cat: 'network',
    tags: ['安全', '协议'],
    level: 'core',
    summary: '给 HTTP 套上 TLS 加密与身份认证：传输途中是密文，旁听者看不到内容。',
    plain: [
      '明文 HTTP 就像寄明信片：邮递员、驿站里任何人都能读。HTTPS 相当于把信放进保险箱再寄出——只有收件人有钥匙。它在 HTTP 与 TCP 之间插入 TLS 层，负责加密、完整性校验和身份认证。',
      '除了防偷看，HTTPS 还防篡改（内容被改动会被发现）和防冒充（靠证书确认“对面真的是目标网站”）。现代浏览器的诸多能力（地理位置、剪贴板、Service Worker）也只在 HTTPS 下开放。',
      '部署时你需要一张 TLS 证书（见词条 SSL/TLS 证书），现在通过 Let’s Encrypt 可以免费自动签发续期，没有理由再用裸 HTTP 上线。'
    ],
    analogy: 'HTTP 是明信片，路上谁都能瞄；HTTPS 是密封挂号信，只有收件人拆得开，且中途被拆过会留下明显痕迹。',
    talk: {
      good: [
        '站点已全站 HTTPS，请把接口里的 http:// 资源引用全部替换为 https 或协议相对路径，避免混合内容告警。'
      ],
      bad: [
        { say: '加个密呗安全点', why: '没说清要保护的是传输层还是存储层，AI 可能在业务代码里自造一套无用的字符替换式“加密”。' }
      ]
    },
    misconceptions: [
      '上了 HTTPS 内容就绝对安全？它只保护传输过程；服务器被入侵、用户电脑中木马照样泄露。'
    ],
    related: ['http', 'tls-certificate', 'tcp-three-way-handshake']
  },

  {
    id: 'http-methods',
    en: 'HTTP Methods',
    zh: 'HTTP 方法',
    aliases: ['GET', 'POST', 'PUT', 'DELETE', '谓词'],
    cat: 'network',
    tags: ['Web', 'REST'],
    level: 'core',
    summary: 'HTTP 方法：GET 读、POST 建、PUT 整换、PATCH 改、DELETE 删。',
    plain: [
      '同一个地址 /users/42，配不同方法就是完全不同的操作：GET 是“给我看看”（不该有任何副作用，可被缓存、可重试）；POST 是“新建/提交”；PUT 是“整个替换掉”；PATCH 是“只改一部分”；DELETE 是“删了它”。',
      '两个关键性质：幂等性——重复执行结果不变（GET/PUT/DELETE 幂等，POST 不幂等）；安全性——是否修改服务器数据（只有 GET 等读操作安全）。这决定了哪些请求可以放心重试、哪些要做防重复提交。',
      '向 AI 描述接口设计时坚持这套语义，它会自觉生成符合 REST 规范的路由与状态码，而不是全站 POST 一把梭。'
    ],
    analogy: '对图书馆里一本书：GET 是翻阅，POST 是捐赠一本新的，PUT 是拿新版整本换掉，PATCH 是贴个勘误条，DELETE 是申请下架。',
    talk: {
      good: [
        '更新用户昵称用 PATCH /users/{id} 只传 nickname 字段；整体资料编辑页才用 PUT 全量提交。'
      ],
      bad: [
        { say: '所有操作都用 POST 传个 type 参数区分', why: '破坏方法语义，缓存、重试、权限控制全部失效，AI 也无法生成规范的 REST 客户端。' }
      ]
    },
    misconceptions: [
      'GET 的参数在 URL 上所以不安全、POST 绝对安全？两者都不加密时都是明文；“安全”取决于 HTTPS 与服务端校验，而非方法本身。',
      'GET 不能带请求体？规范不鼓励但技术上可行；真正该记住的是 GET 必须无副作用。'
    ],
    related: ['http', 'rest', 'status-codes', 'idempotency']
  },

  {
    id: 'status-codes',
    en: 'HTTP Status Codes',
    zh: 'HTTP 状态码',
    aliases: ['404', '500', '200'],
    cat: 'network',
    tags: ['Web', '调试'],
    level: 'core',
    summary: '响应的第一行数字暗号：2xx 成功、3xx 重定向、4xx 你的错、5xx 我的错。',
    plain: [
      '每个 HTTP 响应都带三位数状态码，一眼判断结果：200 OK 成功；201 Created 已创建；204 成功但无内容；301/302 永久/临时跳转；304 缓存仍有效不用重传；400 参数有问题；401 未登录；403 登录但没权限；404 找不到资源；429 请求太频繁；500 服务器内部错误；502/504 网关出错或上游超时。',
      '调试时它是第一线索：4 开头先检查你的请求参数、路径、鉴权；5 开头去看服务器日志。前后端协作中，约定好每种失败对应的状态码与错误体结构，能省一半扯皮时间。',
      '让 AI 写接口处理时明确要求：“按状态码区分分支处理，不要一律当成功解析”，可以避免它忽略非 2xx 响应导致静默失败。'
    ],
    analogy: '快递签收状态：2xx 是已签收，3xx 是转寄新地址，4xx 是收件人问题（地址写错/拒收），5xx 是快递公司自己出了乱子。',
    talk: {
      good: [
        '封装请求层：2xx 返回数据；401 清除凭证跳登录；429 读取 Retry-After 后提示稍后再试；其余弹统一错误文案。'
      ],
      bad: [
        { say: '接口报错了帮我看看', why: '不给状态码和响应体，AI 只能猜；把 Network 面板里的状态码和 JSON 贴给它，定位速度天壤之别。' }
      ]
    },
    misconceptions: [
      '404 一定是链接错了？也可能是路由没配、方法不对（405）、或权限策略故意伪装成 404。',
      '500 就是代码 bug？也可能依赖服务挂了、连接池耗尽——要看服务器日志才能定责。'
    ],
    related: ['http', 'http-methods', 'logging']
  },

  {
    id: 'tcp-three-way-handshake',
    en: 'TCP Three-way Handshake',
    zh: 'TCP 三次握手',
    aliases: ['三次握手'],
    cat: 'network',
    tags: ['协议', '面试高频'],
    level: 'advanced',
    summary: 'TCP 建立连接前的三轮确认：你能听到吗？我能听到，你能听到我吗？我也能，开始吧。',
    plain: [
      '正式通话前双方要确认彼此的收发能力都正常：第一次握手，客户端发起 SYN（你能听到吗）；第二次，服务器回 SYN+ACK（能听到，你能听到我吗）；第三次，客户端再回 ACK（能听到，开始聊吧）。至此双向的收发能力都被验证，连接建立。',
      '为什么不是两次？若只有两轮，服务器无法确认自己的话对方收到；历史上迟到的旧连接请求突然抵达，会造成服务器白白维持一个死连接。三次恰好让双方都确认了双向通路。',
      '断开连接也有对应的四次挥手。日常意义在于：看到“连接超时”“Connection refused”时，你知道问题发生在握手阶段——网络不通、端口没开或防火墙拦截，而不是应用层的锅。'
    ],
    analogy: '对讲机通话测试：甲喊“喂，听得到吗？”乙回“听得到，你听我呢？”甲再回“清楚！”——三轮过后双方才放心开始说正事。',
    visual: { kind: 'anim', id: 'tcp-handshake', caption: 'SYN → SYN+ACK → ACK 的建立过程' },
    talk: {
      good: [
        '压测时大量请求卡在建连阶段，帮我看下是不是握手队列溢出或端口耗尽，而不是先怀疑业务逻辑。'
      ],
      bad: [
        { say: '连接有时候连不上有时候又好了', why: '缺少现象细节（超时还是拒绝、偶发比例、日志），AI 只能给泛泛清单。' }
      ]
    },
    misconceptions: [
      '握手三次是因为“礼貌”？本质是双方都要确认对方的收与发两条链路可用，两次无法满足，四次则冗余。'
    ],
    related: ['http', 'port', 'udp']
  },

  {
    id: 'udp',
    en: 'UDP',
    zh: 'UDP 协议',
    cat: 'network',
    tags: ['协议'],
    level: 'common',
    summary: '不保证送达、不保证顺序、不管拥塞的“发后即忘”协议——换来极致的低延迟。',
    plain: [
      'TCP 像挂号信：编号、确认、丢了重发；UDP 像往广场撒传单：发出去就完事，丢了几张无所谓。没有握手、没有重传、头部只有 8 字节，因此延迟极低、开销极小。',
      '适用场景恰恰是需要“实时性高于完整性”的地方：视频通话宁可糊一帧也不要等重传、游戏同步宁可丢弃过期位置、DNS 查询一问一答不值得建连接。而网页、文件下载必须可靠，就用 TCP。',
      '如今 QUIC（HTTP/3 的底层）基于 UDP 重建了可靠性与加密，说明 UDP 更像一块“自由地基”：要什么特性自己往上搭。'
    ],
    analogy: 'UDP 是广播喇叭：声音大速度快，风吹走几句没人补；TCP 是逐字复读机：你说一句我确认一句，慢但一字不漏。',
    talk: {
      good: [
        '实时弹幕推送用 UDP 组播，允许少量丢失；重要消息另走 TCP 通道确保必达。'
      ],
      bad: [
        { say: '用 UDP 发订单消息更快', why: '订单属于不可丢数据，UDP 丢失即事故——应说清业务可靠性要求，别只图快。' }
      ]
    },
    misconceptions: [
      'UDP 比 TCP “差”？只是取舍不同：低延迟场景 UDP 反而是正确选择。'
    ],
    related: ['tcp-three-way-handshake', 'websocket']
  },

  {
    id: 'ip-address',
    en: 'IP Address',
    zh: 'IP 地址',
    aliases: ['IPv4', 'IPv6'],
    cat: 'network',
    tags: ['协议', '基础概念'],
    level: 'core',
    summary: '互联网设备的门牌号：IPv4 如 192.168.1.10，IPv6 是更长的十六进制串。',
    plain: [
      '网络通信首先要找到对方，IP 地址就是设备在网络中的编号。IPv4 约 43 亿个早已不够分，于是有了 NAT（多台设备共享一个公网 IP）和 128 位的 IPv6（数量近乎无穷）。',
      '常见特殊地址：127.0.0.1 表示本机自己；192.168.x.x、10.x.x.x 是内网私有段——同一办公室里大家的内网 IP 可能一样，出门共享的才是公网 IP。“查本机 IP”时要分清问的是内网还是公网。',
      '和 AI 排查网络问题时，先告诉它环境拓扑：“本地开发 localhost、容器内网 172.17、生产走负载均衡公网 IP”，它能立刻缩小问题范围。'
    ],
    analogy: '公网 IP 像小区的唯一街道地址；内网 IP 像楼栋房号——“3 单元 502”在每个小区都存在，出了小区就得靠街道地址。',
    talk: {
      good: [
        '容器内服务互相访问用 Docker 内网地址 172.17.x.x；对外暴露通过宿主机端口映射。'
      ],
      bad: [
        { say: '把我的 IP 写进白名单', why: '不说清公网还是内网、静态还是动态分配，规则上线后换个网络就失效。' }
      ]
    },
    misconceptions: [
      'IP 不变就能唯一标识用户？手机换 Wi-Fi、运营商动态分配都会变；用 IP 做强身份识别不可靠。'
    ],
    related: ['dns', 'localhost', 'port']
  },

  {
    id: 'dns',
    en: 'DNS',
    zh: 'DNS 域名解析',
    aliases: ['域名解析', 'Domain Name System'],
    cat: 'network',
    tags: ['协议', '基础概念'],
    level: 'core',
    summary: '互联网的电话簿：把人类记得住的域名翻译成机器需要的 IP 地址。',
    plain: [
      '你输入 example.com，浏览器并不知道服务器在哪，于是询问 DNS：这一步依次经过浏览器缓存 → 操作系统缓存 → 本地 DNS 服务器（运营商或公共 DNS 如 114.114.114.114、8.8.8.8）→ 根域名服务器 → .com 顶级域 → 权威域名服务器，最终拿到 IP 并一路缓存起来。',
      '理解 DNS 就能解释很多现象：刚买的域名“还没生效”（记录有 TTL 缓存期）；换了服务器要改 A 记录；CDN 的原理之一就是把域名解析到离你最近的节点；企业内网常自定义内部域名解析。',
      '排查“打不开网站”时第一步往往是 nslookup/ping 看解析结果对不对——域名指错地方，后面一切白搭。'
    ],
    analogy: 'DNS 像酒店前台：你说找人名（域名），前台翻通讯录给出房间号（IP）；熟客的名字前台记在小本上（缓存），下次秒答。',
    visual: { kind: 'anim', id: 'dns-lookup', caption: '从缓存到权威服务器的逐级查询' },
    talk: {
      good: [
        '把 api.example.com 的 A 记录指向新服务器 1.2.3.4，TTL 先调到 300 秒方便快速回滚。'
      ],
      bad: [
        { say: '域名怎么还不生效', why: '不说注册商、记录类型与本机缓存情况，无从判断；应附 dig/nslookup 输出让 AI 分析。' }
      ]
    },
    misconceptions: [
      '改完 DNS 全网立刻生效？各地缓存按 TTL 过期才刷新，短则几分钟长则数小时。'
    ],
    related: ['ip-address', 'cdn', 'http']
  },

  {
    id: 'websocket',
    en: 'WebSocket',
    zh: 'WebSocket 长连接',
    cat: 'network',
    tags: ['Web', '实时通信'],
    level: 'common',
    summary: '借 HTTP 握手升级成的全双工持久通道：服务器可以随时主动推送，双方想说什么就说。',
    plain: [
      'HTTP 默认一问一答：浏览器不问，服务器不答。聊天室、行情推送、协同文档需要“服务器主动喊你”。WebSocket 通过一次 HTTP 升级握手切换协议，之后这条 TCP 连接保持畅通，双方随时互发消息。',
      '对比方案：轮询是每隔几秒问一次“有了吗”，浪费且延迟高；SSE 只支持服务器单向推文本。需要双向、低延迟、高频消息时 WebSocket 是首选；简单通知用 SSE 可能更省事。',
      '注意它的运维特点：连接是有状态的，扩容要用粘性会话或消息中间件广播；断线重连、心跳保活是客户端标配。这些点主动讲给 AI，它生成的实现才完整。'
    ],
    analogy: 'HTTP 是打电话问“有新消息吗”、挂了再拨的循环；WebSocket 是接通后不挂断的热线，两边随时开口。',
    talk: {
      good: [
        '实现 WS 心跳：每 25 秒发 ping，30 秒未收到 pong 判定断线并指数退避重连，最多退避到 60 秒。'
      ],
      bad: [
        { say: '做个实时功能', why: '不说消息方向、频率与在线规模，AI 可能用轮询糊弄，或给你一条没有心跳重连的脆弱长连接。' }
      ]
    },
    misconceptions: [
      'WebSocket 会取代 HTTP？不会，它只适合持续交互场景；普通页面加载与接口调用仍是 HTTP 的天下。'
    ],
    related: ['http', 'udp', 'reverse-proxy']
  },

  {
    id: 'port',
    en: 'Port',
    zh: '端口',
    aliases: ['端口号'],
    cat: 'network',
    tags: ['基础概念', '运维'],
    level: 'core',
    summary: '一台机器上一个 IP 的楼层号：IP 找到大楼，端口找到具体房间里的服务。',
    plain: [
      '一台服务器同时跑着网站、数据库、SSH，网络怎么知道把数据交给谁？靠端口号区分。公认惯例：80/443 是 Web（HTTP/HTTPS）、22 是 SSH、3306 MySQL、6379 Redis、5432 PostgreSQL。0~1023 需要特权，自定义服务常用 3000、8080、8000 等。',
      '“连不上”类问题一大半与端口有关：服务没启动、监听了 127.0.0.1 而非 0.0.0.0（外部访问不到）、防火墙/安全组没放行。排查口诀：先看服务监听哪个端口哪个地址，再看防火墙。',
      'URL 里 http://localhost:3000 的 :3000 就是端口，省略时用默认值（80/443）。给 AI 报障时报上“host:port + telnet 结果”，比一句“连不上数据库”高效十倍。'
    ],
    analogy: 'IP 是大楼地址，端口是房间号；快递员（数据包）到了楼里还得知道送进哪间屋——3306 房住着 MySQL 先生。',
    talk: {
      good: [
        'Redis 只监听 127.0.0.1:6379，不对外开放；应用通过内网 10.0.0.8:6379 连接。'
      ],
      bad: [
        { say: '数据库连不上', why: '缺 host、端口与报错类型（timeout/refused/auth failed），AI 无法分辨网络层还是认证层的问题。' }
      ]
    },
    misconceptions: [
      '改了云服务器防火墙就能访问？还要确认服务本身监听的是 0.0.0.0 而不是仅本机回环。'
    ],
    related: ['ip-address', 'localhost', 'reverse-proxy']
  },

  {
    id: 'reverse-proxy',
    en: 'Reverse Proxy',
    zh: '反向代理',
    aliases: ['正向代理对比'],
    cat: 'network',
    tags: ['运维', '架构'],
    level: 'common',
    summary: '站在服务器前面的接待员：对外代表整个站点，对内把请求分发给真正的服务。',
    plain: [
      '正向代理替「客户端」出头：你翻墙访问外网，目标网站看到的代理 IP，不知道你是谁。反向代理替「服务器」挡前面：Nginx 接收所有请求，再转发给内部的 Node、Python 服务；用户只知道 Nginx 的存在。',
      '反向代理的价值：统一 HTTPS 证书、负载均衡到多台后端、限流熔断、缓存静态资源、灰度分流。几乎所有正经部署的第一层都是它。',
      '让 AI 配置 Nginx 时说清三件事：域名与证书、转发到哪个 upstream 端口、要不要支持 WebSocket（需要 Upgrade 头透传），配置质量立刻上一个台阶。'
    ],
    analogy: '公司前台：访客只认识前台（域名入口），前台按事由把你引到具体部门（内部服务）；外人永远不知道各部门的门牌号。',
    visual: { kind: 'svg', id: 'proxy-flow', caption: '正向代理藏客户端，反向代理藏服务器' },
    talk: {
      good: [
        'Nginx 监听 443 终结 HTTPS，/api 转发到 127.0.0.1:8000，/ws 路径额外透传 Upgrade 和 Connection 头。'
      ],
      bad: [
        { say: '配一下 nginx 能访问就行', why: '不说域名、证书与转发目标，AI 生成的配置往往端口冲突或漏掉 WebSocket 头。' }
      ]
    },
    misconceptions: [
      '反向代理会影响性能？一层 Nginx 转发的开销极小，换来的是证书管理与扩展性的巨大收益。'
    ],
    related: ['port', 'https']
  },

  {
    id: 'vpn',
    en: 'VPN',
    zh: 'VPN 虚拟专用网络',
    aliases: ['虚拟专用网'],
    cat: 'network',
    tags: ['安全', '远程办公'],
    level: 'common',
    summary: '在公共网络上凿一条加密隧道，让你的设备“仿佛插着公司内网的网线”。',
    plain: [
      'VPN 把你的流量封装加密后送往 VPN 网关再解密转发：对公司来说，你在家里就像坐在办公室工位上，能直接访问内网 Git、数据库、测试环境；对 ISP 与公共场所 Wi-Fi 来说，只能看到一团密文。',
      '两大用途：企业远程接入（连回内网办公）与个人隐私保护（避免公共 Wi-Fi 偷窥、隐藏真实 IP）。注意合规边界：用途与所在地区法规有关。',
      '开发中的实际痛点：连上 VPN 后某些本地服务访问变慢或路由冲突（全家桶模式 vs 仅内网网段的分流模式），向 IT 申请分流白名单是常规操作。'
    ],
    analogy: 'VPN 像机场的员工通道：刷工牌进入一条专属走廊，直接通到办公楼内部——虽然人还在航站楼（公网）里。',
    talk: {
      good: [
        'VPN 采用分流模式：仅 10.0.0.0/8 内网网段走隧道，其余流量直连，避免影响本地网络。'
      ],
      bad: [
        { say: '连了 VPN 就上不了网了', why: '缺路由表现与客户端类型，AI 无法区分全局接管、DNS 劫持还是路由冲突。' }
      ]
    },
    misconceptions: [
      'VPN = 违法翻墙工具？其本职是企业级安全接入技术，合规使用与否取决于具体用途与地区法规。'
    ],
    related: ['ip-address', 'tls-certificate']
  },

  {
    id: 'tls-certificate',
    en: 'SSL/TLS Certificate',
    zh: 'SSL/TLS 证书',
    aliases: ['证书', 'HTTPS 证书'],
    cat: 'network',
    tags: ['安全', '运维'],
    level: 'common',
    summary: '可信机构签发的网站身份证：证明「它就是它」，并支撑加密握手的公钥交换。',
    plain: [
      'HTTPS 握手时，服务器出示证书：里面写着域名、有效期、签发机构（CA）和一把公钥。浏览器核对链条：CA 可信吗？域名对得上吗？过期了吗？任一不过关就弹出红色警告。',
      '日常运维三类坑：证书到期忘了续（监控 + 自动续期解决）；域名不匹配（www 与裸域要分别覆盖）；证书链不完整（部分安卓机型报错，需部署全链证书）。Let\'s Encrypt 提供 90 天免费证书，配合 certbot 或 Caddy 可全自动续期。',
      '更进阶的是 mTLS 双向证书：不只服务器有身份证，客户端也要出示，常见于微服务间调用与金融系统。'
    ],
    analogy: '证书像公证处核发的营业执照 + 带防伪的印章：客人进门先验照（身份），交易凭印章封条（公钥加密）防止中途调包。',
    talk: {
      good: [
        '用 certbot 为 example.com 与 www.example.com 签发证书，nginx 部署 fullchain.pem 并配置自动续期钩子。'
      ],
      bad: [
        { say: '浏览器提示证书错误帮我修下', why: '不贴具体报错码（NET::ERR_CERT_DATE_INVALID 等）与域名环境，可能误诊为系统时间问题。' }
      ]
    },
    misconceptions: [
      '证书只管加密？它同样承担身份证明——没有验证的加密可以被中间人轻松截胡。'
    ],
    related: ['https', 'dns']
  },

  {
    id: 'headers-body',
    en: 'Headers & Body',
    zh: '请求头与请求体',
    aliases: ['Header', 'Payload', '请求体'],
    cat: 'network',
    tags: ['Web', '调试'],
    level: 'common',
    summary: '头是信封上的元信息（格式、身份、缓存指令），体是信纸里的真正内容。',
    plain: [
      '每个 HTTP 报文分两部分：头部（headers）承载元信息——Content-Type 说明正文是什么格式、Authorization 携带令牌、Accept 声明想要什么、Cache-Control 决定缓存策略、Cookie 自动携带会话。正文（body/payload）才是真正的数据：表单字段、JSON、文件字节。',
      '联调时 90% 的诡异问题藏在头里：POST 没写 Content-Type: application/json 导致后端解析不到参数；跨域预检 OPTIONS 因自定义头被拦；上传文件必须 multipart/form-data 而非 JSON。',
      '给 AI 提交 bug 时附上“请求头 + 状态码 + 响应体”三件套（脱敏后），它能直接指出缺哪个头、格式错在哪。'
    ],
    analogy: '寄快递：面单上的品类、保价、收件要求是 header；箱子里的货是 body。面单写错品类，分拣中心（服务器）直接拒收。',
    talk: {
      good: [
        '登录接口 Content-Type 用 application/json，Authorization 头放 Bearer token；刷新 token 走独立的 X-Refresh-Token 头。'
      ],
      bad: [
        { say: '参数传过去了后端收不到', why: '不看请求头几乎必然误判；八成是 Content-Type 与实际编码不符。' }
      ]
    },
    misconceptions: [
      'GET 没有 body 所以没法传数据？GET 用查询字符串传参即可；强行塞 body 属于不规范用法，多数框架不支持。'
    ],
    related: ['http', 'cors', 'cookie', 'jwt']
  },

  {
    id: 'localhost',
    en: 'localhost & 127.0.0.1',
    zh: '本地回环地址',
    aliases: ['本机地址', '127.0.0.1'],
    cat: 'network',
    tags: ['基础概念', '调试'],
    level: 'core',
    summary: '指向本机的回环地址：数据包不经过物理网络，纯内部循环。',
    plain: [
      '127.0.0.1 是回环地址（loopback）：发向它的数据在本机协议栈内绕一圈就回来，不经过任何物理网络。localhost 是它的习惯域名，经 hosts 文件解析。还有个有趣的 0.0.0.0：作为监听地址表示“本机所有网卡”，作为访问地址通常无效。',
      '由此产生经典坑：服务监听 127.0.0.1 时本机能访问，同事或容器外却连不通——因为回环地址不接受外来连接。想让外部访问要监听 0.0.0.0 并放行防火墙。',
      '本地开发的整套链路（前端 dev server :5173 → 后端 :8000 → 数据库 :3306）全都跑在 localhost 不同端口上，理解这一点是排查“本地好好的、部署就崩”的第一步。'
    ],
    analogy: 'localhost 是给自己写的便签：不用寄出去，贴在显示器上自己看；公网 IP 才是要贴邮票的真信件。',
    talk: {
      good: [
        'dev server 启动时加 --host 0.0.0.0，让同网段的手机真机也能通过局域网 IP 访问调试。'
      ],
      bad: [
        { say: '我本地能访问服务器上不行', why: '典型监听地址问题；直接说“改成监听 0.0.0.0 并放行端口”一步到位。' }
      ]
    },
    misconceptions: [
      'localhost 和 127.0.0.1 完全等价？绝大多数场景等价；但 IPv6 下 localhost 解析为 ::1，若服务只监听 IPv4 会连不上。'
    ],
    related: ['port', 'ip-address']
  },

  {
    id: 'tcp-vs-udp',
    en: 'TCP vs UDP',
    zh: 'TCP 与 UDP',
    aliases: ['TCP', 'UDP', '可靠传输', '无连接', '传输层'],
    cat: 'network',
    tags: ['协议', '传输层'],
    level: 'core',
    summary: 'TCP 可靠但慢（三次握手+确认重传），UDP 快但可能丢包：看你要不要「确保送到」。',
    plain: [
      '传输层两大协议：TCP 面向连接，三次握手建立、确认重传、保证顺序不丢——像挂号信，慢但可靠；UDP 无连接、发出去不管——像明信片，快但可能丢。',
      '选型看场景：网页、文件传输、邮件要可靠，用 TCP；视频直播、语音通话、游戏实时对战能容忍少量丢包且要低延迟，用 UDP（很多还在 UDP 之上自己加一层可靠保证，如 QUIC）。',
      '跟 AI 说「这个推流用 UDP 保证低延迟、可接受少量丢帧」「这个接口要可靠传用 TCP」，它就知道选型；说「做个实时传输」它可能默认 TCP，延迟会高。'
    ],
    analogy: 'TCP 像寄挂号信：要回执、可追踪、保不丢，但慢；UDP 像喊话：喊出去就行、速度快，但风大听不清（丢包）也不重喊。',
    talk: {
      good: ['实时音视频推流用 UDP 降低延迟，丢包可接受。', '文件上传必须完整可靠，用 TCP。'],
      bad: [
        { say: '帮我做个网络传输', why: '没说数据能否丢、要不要顺序，AI 只能挑一个协议，可能选错。' }
      ]
    },
    misconceptions: [
      'UDP 一定不可靠？可以在 UDP 上实现可靠（QUIC 就是），只是要自己加。',
      'TCP 一定慢？有优化空间，但相比 UDP 有握手和确认开销。'
    ],
    related: ['udp', 'tcp-three-way-handshake', 'quic-http3']
  },

  {
    id: 'http-versions',
    en: 'HTTP Versions',
    zh: 'HTTP 版本演进',
    aliases: ['HTTP/1.1', 'HTTP/2', 'HTTP/3', '版本'],
    cat: 'network',
    tags: ['HTTP', '协议'],
    level: 'advanced',
    summary: 'HTTP 从 1.1 串行排队到 2 多路复用再到 3 上 UDP：都是为快、为少等。',
    plain: [
      'HTTP 1.1：一个连接一次只能发一个请求（队头阻塞），所以浏览器开多个并行连接缓解；Keep-Alive 复用连接。HTTP/2：一条连接上多路复用（多个请求并发同传）、头部压缩、服务端推送，解决队头阻塞（但 TCP 层还有队头阻塞）。',
      'HTTP/3：把底层从 TCP 换成 UDP + QUIC，彻底解决 TCP 层的队头阻塞，连接迁移（切网络不断）、握手更快。现状：主流服务器和 CDN 已普遍支持 2/3，浏览器自动协商升级。',
      '跟 AI 说「这里 100 个小资源要并发加载，确认服务端开了 HTTP/2」，它就明白为什么快；说「页面好多请求加载慢」它可能建议合并请求，而 HTTP/2 下合并反而没那么必要。'
    ],
    analogy: 'HTTP 版本像食堂打饭的演化：1.1 是「一条队伍一个窗口，前面打完才轮到你」（队头阻塞）；2 是「一条队伍多个窗口同时开」（多路复用）；3 是「换了个更快更抗挤的通道」（UDP 直连），人再多也不堵死。',
    talk: {
      good: [
        '确认 CDN 和服务器已启用 HTTP/2 或 HTTP/3，小资源无需再合并。',
        '这个长连接场景评估 HTTP/3，网络切换不断连。'
      ],
      bad: [
        { say: '加载慢，帮我合并资源', why: '没说当前 HTTP 版本；HTTP/2 下合并收益小，可能白做还破坏缓存。' }
      ]
    },
    misconceptions: [
      'HTTP/2 解决所有队头阻塞？解决应用层，TCP 层仍有队头阻塞，HTTP/3 才根治。',
      '必须手动升级到 HTTP/3？多数平台自动协商，浏览器默认支持。'
    ],
    related: ['http', 'http-keep-alive', 'quic-http3']
  },

  {
    id: 'http-keep-alive',
    en: 'HTTP Keep-Alive',
    zh: '连接复用',
    aliases: ['keep-alive', '连接复用', '长连接'],
    cat: 'network',
    tags: ['HTTP', '性能'],
    level: 'common',
    summary: '一次 HTTP 请求就建一次连接太浪费：Keep-Alive 让一条连接反复用，省握手。',
    plain: [
      '早期 HTTP 每次请求都要重新建立 TCP 连接（三次握手），页面上几十个资源就要握手几十次。Keep-Alive（连接复用）让一条 TCP 连接处理完一个请求后不关闭，后续请求直接复用，省掉重复握手。',
      'HTTP/1.1 默认开启 Keep-Alive；HTTP/2 的连接复用是协议级的。注意：连接复用需要服务器配置超时和最大请求数，防止闲置连接占资源；Nginx 默认 keepalive_timeout 65 秒。',
      '跟 AI 说「这个接口被频繁调用，确认服务端和客户端都开启了 keep-alive，避免频繁握手」，它就能定位到连接建立开销；说「接口请求慢」它可能忽略握手开销这个因素。'
    ],
    analogy: 'Keep-Alive 像和熟客保持联系的固定通道：不用每次见面都重新介绍自己（握手），熟客随时来随时办事——但通道闲置太久也得关掉（超时），不能一直开着占地方。',
    talk: {
      good: [
        '接口高频调用，请确认开启了 HTTP keep-alive，减少 TCP 握手次数。',
        'Nginx 配好 keepalive_timeout 和 keepalive_requests，别让连接占资源。'
      ],
      bad: [
        { say: '每个请求都好慢', why: '没提连接复用，AI 可能一直优化请求内容，没发现每次都在握手。' }
      ]
    },
    misconceptions: [
      'Keep-Alive 是 HTTP/2 才有？HTTP/1.1 就有，默认开启。',
      '长连接永远开着更好？闲置连接占用资源，要有超时回收。'
    ],
    related: ['http', 'http-versions', 'tcp-three-way-handshake']
  },

  {
    id: 'http-cache-headers',
    en: 'HTTP Cache Headers',
    zh: 'HTTP 缓存头',
    aliases: ['Cache-Control', 'ETag', '缓存头', '强缓存', '协商缓存'],
    cat: 'network',
    tags: ['HTTP', '缓存'],
    level: 'advanced',
    summary: 'Cache-Control 决定浏览器要不要缓存、缓存多久，ETag 让「没变就别重传」：都靠响应头。',
    plain: [
      'HTTP 缓存靠响应头控制：Cache-Control 是强缓存——max-age=3600 表示 1 小时内直接用本地缓存，不再请求服务器；ETag/Last-Modified 是协商缓存——缓存过期后带条件去问服务器「变了吗」，没变服务器回 304，浏览器用缓存（省流量）。',
      '静态资源（图片、CSS、JS）适合长缓存 max-age 很大 + 文件名带 hash（内容变文件名变，强制刷新缓存）；HTML 适合不缓存或短缓存，保证拿最新。这是页面加载提速最便宜有效的一招。',
      '跟 AI 说「静态资源加长缓存、文件名带内容 hash、HTML 不缓存」，它给的就是标准缓存策略；说「图片总是重新下载」可能就是缺了 Cache-Control。'
    ],
    analogy: 'HTTP 缓存像课本的「已学过」标记：Cache-Control 是「这章 1 小时内不用再翻书」（直接用记忆）；ETag 是「上课前问老师这章变没变，没变就还用旧笔记」（304 省得重抄）。',
    talk: {
      good: [
        '静态资源设 Cache-Control: max-age=31536000 并用带 hash 的文件名，HTML 不缓存。',
        '接口响应加 ETag，客户端条件请求避免重复下载。'
      ],
      bad: [
        { say: '用户老是加载到旧版 JS', why: '多半是缓存策略问题；不点破 hash 文件名和缓存头，AI 可能只在代码里改版本号。' }
      ]
    },
    misconceptions: [
      'Cache-Control 只能控制浏览器？中间代理、CDN 也会遵循，是端到端协商。',
      '304 是重新下载？304 表示「没变」，只回状态码不回内容，省流量。'
    ],
    related: ['http', 'headers-body', 'caching']
  },

  {
    id: 'dns-ttl',
    en: 'DNS TTL & Caching',
    zh: 'DNS 缓存与 TTL',
    aliases: ['DNS TTL', 'DNS 缓存', 'TTL', '解析缓存'],
    cat: 'network',
    tags: ['DNS', '缓存'],
    level: 'common',
    summary: 'DNS 记录带 TTL 告诉各级缓存存多久：改服务器 IP 后要等 TTL 到期才全局生效。',
    plain: [
      'DNS 解析结果会被浏览器、系统、本地 DNS 服务器层层缓存，缓存多久由记录的 TTL（存活时间）决定：TTL 300 表示 5 分钟内复用结果，不重新解析。TTL 短则变更生效快，但解析请求多；长则省解析但改记录生效慢。',
      '这就是「我改了 DNS 怎么还不生效」的原因：各地缓存还存着旧 IP。所以变更 A 记录前建议先调低 TTL 等生效再改，改完再调回去。排错时看 TTL 就知道还要等多久。',
      '跟 AI 说「要换服务器 IP，先把 TTL 调低到 60 提前一天改，等全局生效再换」，它就是规范迁移流程；说「改了 DNS 没反应」多半是 TTL 未过期。'
    ],
    analogy: 'DNS TTL 像门店更换地址的公告时效：你贴了「新地址」公告（改记录），但老顾客手机里存的旧地址（缓存）要等他们更新（TTL 到期）才作废——公告贴得越早（提前调低 TTL），顾客越早去新店。',
    talk: {
      good: [
        '计划更换服务器 IP，请提前一天把 A 记录 TTL 调低到 60，生效后改 IP，确认后再调回。',
        '这个域名解析变更后各平台生效时间不同，请核对 TTL。'
      ],
      bad: [
        { say: 'DNS 改了没生效', why: '多半是 TTL 缓存；不点破，AI 只会让你等，没提提前调低 TTL 的迁移技巧。' }
      ]
    },
    misconceptions: [
      'TTL 越小越好？短 TTL 增加解析请求量，要看变更频率权衡。',
      '改完 DNS 马上全球生效？各层缓存按 TTL 到期才更新，需要时间。'
    ],
    related: ['dns', 'localhost', 'cdn']
  },

  {
    id: 'tls-handshake',
    en: 'TLS Handshake',
    zh: 'TLS 握手',
    aliases: ['TLS 握手', 'HTTPS 握手', '证书验证', '加密协商'],
    cat: 'network',
    tags: ['HTTPS', '安全'],
    level: 'advanced',
    summary: 'HTTPS 前先握手：验证证书、协商密钥，之后内容才加密传输，大约多一次往返。',
    plain: [
      'HTTPS 不只是「加密传输」，连接建立前要先 TLS 握手：客户端发出支持的算法；服务器回证书和算法；客户端验证证书（是否可信、域名是否匹配、是否过期）；双方协商出会话密钥；之后用对称加密传输数据。',
      '握手要额外 1-2 次网络往返，这是 HTTPS 比 HTTP 慢一点的原因（TLS 1.3 已优化到 1 次往返）。证书无效（过期、自签、域名不匹配）时浏览器会拦截并警告——「不安全」警告基本都来自证书问题。',
      '跟 AI 说「HTTPS 握手失败，请检查证书是否过期/域名是否匹配/是否自签」，它就能定位；说「网站访问报不安全」多半是证书链或过期问题。'
    ],
    analogy: 'TLS 握手像初次见面的安全交接：先亮证件（证书）、双方验明身份、对暗号（协商密钥），确认后才开始说正事（加密传输）——验身份这步要花点时间（多一次往返），但之后全程放心。',
    talk: {
      good: [
        '排查 HTTPS 握手失败：证书是否过期、域名匹配、证书链是否完整。',
        '升级到 TLS 1.3 减少握手往返，配置时禁用旧的不安全协议。'
      ],
      bad: [
        { say: '网站打不开，提示证书错误', why: '多半是证书过期/域名不匹配；不点破 TLS 握手和证书链，AI 排查没方向。' }
      ]
    },
    misconceptions: [
      'HTTPS 全程用非对称加密？握手用非对称交换密钥，传输用对称加密（快）。',
      '证书过期只是提醒？浏览器会直接拦截访问，不是小事。'
    ],
    related: ['https', 'tls-certificate', 'http-versions']
  },

  {
    id: 'http-redirect',
    en: 'HTTP Redirects',
    zh: 'HTTP 重定向',
    aliases: ['重定向', '301', '302', 'redirect', '跳转'],
    cat: 'network',
    tags: ['HTTP', '状态码'],
    level: 'common',
    summary: '服务器说「去别处拿」：301 永久搬家（搜索引擎更新）、302 临时跳转（别缓存死）。',
    plain: [
      '重定向是服务器返回 3xx 状态码告诉客户端「资源在别处」：301 永久重定向（页面永久搬家，浏览器和搜索引擎会更新地址并缓存）；302/303 临时重定向（临时跳转，如未登录跳登录页，每次都要再问）；307/308 保留请求方法的重定向。',
      '区别很重要：永久搬家用 301，改回来要清缓存；临时跳转用 302，不会让浏览器长期缓存。重定向会多一次网络往返，链式重定向（A→B→C）伤性能，要避免。',
      '跟 AI 说「这页永久搬家，用 301 并在新地址配好；登录跳转用 302 别缓存」，它就用对状态码；说「做个跳转」它可能一律 302，永久搬迁场景反而拖慢用户。'
    ],
    analogy: '重定向像「查无此人」的信封上贴转投条：301 是「此人永久搬走，以后直接寄新址」（邮局记住新址不再问）；302 是「他临时出差，这阵子转投」（下次还得查）。',
    talk: {
      good: ['旧页面永久迁移到新 URL，用 301 并确保新地址正常。', '未登录跳登录页用 302，不要设置长缓存。'],
      bad: [
        { say: '页面跳转一下', why: '没说永久还是临时，AI 用错状态码会导致搜索引擎索引错或缓存异常。' }
      ]
    },
    misconceptions: [
      '301 和 302 随便用？用错会影响 SEO 和缓存行为，要按「永久/临时」选。',
      '重定向没成本？每次跳转都多一次往返，链式重定向拖慢加载。'
    ],
    related: ['http', 'status-codes', 'headers-body']
  },

  {
    id: 'proxy-forwarded',
    en: 'Proxy & X-Forwarded Headers',
    zh: '代理与转发头',
    aliases: ['X-Forwarded-For', 'X-Real-IP', '代理', '真实 IP'],
    cat: 'network',
    tags: ['代理', 'HTTP'],
    level: 'advanced',
    summary: '请求过代理后，服务器看到的 IP 是代理的：靠 X-Forwarded-For 记录真实客户端 IP。',
    plain: [
      '请求经过反向代理/CDN/负载均衡后，后端看到的源 IP 变成代理的 IP，真实的客户端 IP 会丢失——这影响限流、审计、地域判断。代理会在转发时加上 X-Forwarded-For（客户端 IP 链）、X-Real-IP（第一个真实 IP）、X-Forwarded-Proto（原始协议 http/https）。',
      '注意：X-Forwarded-For 可以被客户端伪造（直接发个假头），所以只信「第一个由可信代理写入的 IP」，且要让代理覆盖或追加而不是透传伪造值。取真实 IP 前必须配置可信代理列表。',
      '跟 AI 说「日志要记录真实客户端 IP，请从 X-Forwarded-For 取最后一个可信代理之前的 IP」，它就处理对了；说「看下用户 IP」它可能直接读 remote_addr，拿到的是代理 IP。'
    ],
    analogy: '转发头像快递中转站的「运单流转记录」：每经一个中转站（代理）就添一笔「此件经手」，终点站（后端）要看最早寄件人（真实 IP）就得翻流转记录——但寄件人自己也能乱填寄件地址（伪造头），所以要信自己人的记录。',
    talk: {
      good: [
        '获取真实客户端 IP：配置可信代理列表，取 X-Forwarded-For 中可信代理前的最后一个 IP。',
        '限流按真实 IP 计算，依赖 X-Forwarded-For 前记得配可信代理。'
      ],
      bad: [
        { say: '怎么所有人 IP 都一样', why: '因为全走了同一代理；不点破 X-Forwarded-For，AI 可能一直拿 remote_addr 排错。' }
      ]
    },
    misconceptions: [
      'X-Forwarded-For 一定可信？客户端可伪造，必须结合可信代理配置。',
      '拿 IP 直接读连接地址？过代理后那是代理 IP，不是真实客户端。'
    ],
    related: ['reverse-proxy', 'headers-body', 'load-balancer']
  },

  {
    id: 'websocket-vs-http',
    en: 'WebSocket vs HTTP',
    zh: 'WebSocket 与 HTTP',
    aliases: ['WebSocket', '长连接', '双向通信', 'ws'],
    cat: 'network',
    tags: ['协议', '实时'],
    level: 'common',
    summary: 'HTTP 一问一答、WebSocket 建立后双向随时推：聊天、实时面板、协作都靠它。',
    plain: [
      'HTTP 是请求-响应模型：客户端问、服务器答，服务器不能主动说话，且每次请求都有头开销。WebSocket 通过一次 HTTP 升级握手建立一条长连接，之后两端可以随时互相发消息，双向、低延迟。',
      '适用：聊天、实时通知、在线协作、行情推送、游戏对战这类「服务器要主动推 + 高频双向」。不适用：普通页面加载、低频接口——用 WebSocket 是杀鸡用牛刀，连接维护成本高。',
      '跟 AI 说「实时协作要用 WebSocket 保持双向长连接，心跳保活、断线重连」，它给的就是生产级方案；说「实时刷新数据」它可能用轮询（HTTP 定时问），延迟和开销都差。'
    ],
    analogy: 'HTTP 像对讲机：按下说话、松开听，一问一答；WebSocket 像电话：接通后一直在线，随时你说我听、我说你听，不用每次拨号（握手）。',
    talk: {
      good: [
        '在线聊天用 WebSocket：握手升级后双向通信，加心跳和断线重连。',
        '这个功能服务器要主动推送且高频，用 WebSocket；低频场景轮询就够。'
      ],
      bad: [
        { say: '数据要实时刷新', why: '没说推送频率和双向需求，AI 可能用定时轮询，实时性和开销都不好。' }
      ]
    },
    misconceptions: [
      'WebSocket 一定比 HTTP 好？低频场景轮询/SSE 更省资源，要按需选。',
      'WebSocket 建立和普通请求一样？要一次 HTTP 升级握手，且长连接占服务端资源。'
    ],
    related: ['websocket', 'http', 'sse']
  },

  {
    id: 'network-latency',
    en: 'Network Latency & RTT',
    zh: '网络延迟与 RTT',
    aliases: ['延迟', 'RTT', '往返时间', 'ping', 'latency'],
    cat: 'network',
    tags: ['性能', '网络'],
    level: 'common',
    summary: 'RTT 是数据往返一次的时间：物理距离和链路决定下限，优化的目标是减少「往返次数」。',
    plain: [
      '网络延迟（RTT，往返时间）是数据从发到收到响应的时间，光速和物理距离决定了理论下限（跨洋至少几十毫秒），路由跳数、拥塞、DNS、TLS 握手都会叠加。',
      '无法把光速变快，但能减少「要等多少趟」：一次页面加载可能要串行经历 DNS、TCP 握手、TLS 握手、多次请求——每趟都花一个 RTT。所以优化方向是并行化（HTTP/2 多路复用）、减少往返（缓存、预连接、CDN 就近）、减少体积（每趟传更少）。',
      '跟 AI 说「接口慢是 RTT 高还是处理慢，请用 DevTools 看 Timing 阶段拆分」，它就能区分网络往返和服务端耗时；只说「慢」它分不清该优化网络还是后端。'
    ],
    analogy: '网络延迟像跨国快递：物理距离决定了「最快也要 3 天」（RTT 下限），你没法让飞机更快，但可以少寄几趟——一次把所有东西打包好（减少往返次数），或把仓库搬到客户附近（CDN）。',
    talk: {
      good: [
        '分析接口 Timing：区分 DNS、连接、TLS、等待（TTFB）各阶段耗时。',
        '静态资源放 CDN 就近访问，减少 RTT 高的影响。'
      ],
      bad: [
        { say: '接口好慢帮我优化', why: '没区分网络往返和服务端耗时，AI 可能只优化后端而网络 RTT 没动。' }
      ]
    },
    misconceptions: [
      '延迟高就是带宽不够？延迟是「一趟多久」，带宽是「一趟装多少」，两个维度。',
      '优化网络就是加带宽？带宽不解决往返次数，要减往返、就近部署。'
    ],
    related: ['bandwidth-throughput', 'http-versions', 'cdn']
  },

  {
    id: 'bandwidth-throughput',
    en: 'Bandwidth & Throughput',
    zh: '带宽与吞吐',
    aliases: ['带宽', '吞吐量', '带宽', 'throughput', 'bitrate'],
    cat: 'network',
    tags: ['性能', '网络'],
    level: 'common',
    summary: '带宽是路多宽、吞吐是实际跑了多少：大文件吃带宽，小请求吃延迟。',
    plain: [
      '带宽（bandwidth）是通道的理论容量（每秒能传多少 bit），吞吐量（throughput）是实际传了多少——中间被拥塞、丢包重传、协议开销吃掉的就是差距。',
      '两个维度：带宽管「同一时间能装多少」，延迟管「跑一趟多久」。大文件下载瓶颈是带宽；大量小请求瓶颈是延迟和连接数（每请求都有往返）。优化方向不同：前者压缩、限速；后者合并请求、连接复用。',
      '跟 AI 说「下载慢是带宽受限，请压缩并分块」「小请求多是往返开销，请合并」，它就能对症；说「网络慢」它无法判断是带宽还是延迟。'
    ],
    analogy: '带宽像高速公路的车道数（同时能过多少车），吞吐是实际每小时通过的车（堵车、事故会降低）；延迟是「跑一趟要多久」——车道再多，目的地远一趟还是要那么久。',
    talk: {
      good: ['大文件传输占用带宽，请压缩并做断点续传。', '接口请求数太多，优先用连接复用减少往返，而非只加带宽。'],
      bad: [
        { say: '网速慢加带宽吧', why: '没判断是带宽还是延迟瓶颈，加带宽可能毫无效果。' }
      ]
    },
    misconceptions: ['带宽大就不会慢？延迟高时加带宽没用，小请求多也一样。', '吞吐量等于带宽？吞吐受拥塞、丢包、协议开销影响，通常小于带宽。'],
    related: ['network-latency', 'http-keep-alive', 'response-compression']
  },

  {
    id: 'packet-loss-retransmit',
    en: 'Packet Loss & Retransmission',
    zh: '丢包与重传',
    aliases: ['丢包', '重传', '拥塞控制', 'RTO', 'packet loss'],
    cat: 'network',
    tags: ['TCP', '网络'],
    level: 'advanced',
    summary: '包丢了 TCP 会重传，但重传变多说明网络拥塞：丢包率高时体验断崖式下滑。',
    plain: [
      '数据在网络上以包为单位传输，可能丢失（线路噪声、拥塞丢包）。TCP 靠确认机制发现丢包：发出去的包没在超时内收到确认，就重传，并可能降低发送速度（拥塞控制，怕越传越堵）。',
      '丢包对体验的影响远超想象：实时音视频丢包会卡顿花屏，TCP 传输丢包会触发重传和降速，延迟飙升。排错先看丢包率：ping 看丢包、看 RTO（重传超时）和重传统计；WiFi 信号差、网络拥塞、运营商问题都常见。',
      '跟 AI 说「视频通话卡顿，先测丢包率，丢包高是网络问题不是编码问题」，它能正确归因；说「视频老卡」它可能一直调编码，实际是链路丢包。'
    ],
    analogy: '丢包重传像传话游戏：一句话传到中间被风刮走了（丢包），收话人没听到就喊「再说一遍」（重传）——但路上噪音大（拥塞）时，越重传越乱，得先安静下来（降速）而不是拼命喊。',
    talk: {
      good: [
        '先测 ping 的丢包率：丢包高说明链路问题，重传降速是 TCP 正常反应。',
        '视频卡顿排查链路丢包，客户端侧看 RTO 重传统计。'
      ],
      bad: [
        { say: '视频很卡，帮我优化编码', why: '没查丢包率就调编码，链路丢包高时怎么调都白搭。' }
      ]
    },
    misconceptions: [
      '丢包只影响下载？实时音视频对丢包更敏感，少量丢包就卡顿。',
      'TCP 会自动修复一切？重传会放大延迟和拥塞，丢包严重时体验照样崩。'
    ],
    related: ['tcp-vs-udp', 'network-latency', 'udp']
  },

  {
    id: 'ipv6',
    en: 'IPv6',
    zh: 'IPv6',
    aliases: ['IPv6', 'IPv4', '地址枯竭', '双栈'],
    cat: 'network',
    tags: ['IP', '协议'],
    level: 'common',
    summary: 'IPv4 地址快用完了，IPv6 用 128 位把地址空间扩到天文数字：还顺带简化了 NAT。',
    plain: [
      'IPv4 只有约 43 亿个地址，早就分配殆尽，靠 NAT 勉强撑着。IPv6 用 128 位地址，数量大到地球每粒沙子都能分一堆——地址充足意味着每台设备都能有公网地址，不再需要 NAT 绕路。',
      'IPv6 还带来：自动配置（无状态配置）、更简单的路由、内置的 IPsec 安全。现状：全球互联网已普遍支持 IPv6，主流云平台和 CDN 都提供，网站一般双栈部署（同时支持 v4 和 v6）。',
      '跟 AI 说「配置 IPv6 双栈，确认 CDN 支持 AAAA 记录」，它就知道怎么做；说「加个 IPv6」它可能忽略双栈过渡和 DNS 配置。'
    ],
    analogy: 'IPv6 像从「四位数门牌号」（IPv4，快排完了）升级到「带楼栋、楼层、房间号的长地址」（IPv6，多到用不完）——每家都能有独立地址，不用几户人挤一个门牌（NAT 共享）。',
    talk: {
      good: [
        '给域名配置 AAAA 记录启用 IPv6，保持和 A 记录双栈并行。',
        '确认服务器和 CDN 都支持 IPv6 再切换，避免部分地区访问失败。'
      ],
      bad: [
        { say: '网站加 IPv6 支持', why: '没说双栈策略和 CDN 支持，AI 可能只加 AAAA 记录，老网络环境反而不通。' }
      ]
    },
    misconceptions: ['IPv6 和 IPv4 不兼容？双栈共存，网络自动按可用性选择。', 'IPv6 只是地址更多？还带来自动配置、简化路由等改进。'],
    related: ['ip-address', 'nat', 'dns']
  },

  {
    id: 'firewall',
    en: 'Firewall',
    zh: '防火墙',
    aliases: ['防火墙', '安全组', 'WAF', '入站规则', 'firewall'],
    cat: 'network',
    tags: ['安全', '网络'],
    level: 'common',
    summary: '防火墙按规则放行/拦截进出流量：云上的安全组就是它，白名单最小化原则。',
    plain: [
      '防火墙是网络流量的「门禁」：按规则决定放行还是拦截。云服务器上的安全组就是云厂商版防火墙——只开需要的端口（80/443/SSH），其余全部拒绝，这就是最小化原则。',
      '两种形态：网络层防火墙按 IP/端口过滤（快速）；应用层防火墙 WAF 还能识别 HTTP 层的攻击（SQL 注入、XSS、CC 攻击）。配置错误是常见事故源：把数据库端口暴露公网被扫描、把 SSH 对全网开放被爆破。',
      '跟 AI 说「服务器只开放 80/443 和指定 IP 的 SSH，其他全封」，它给的最小化规则就对了；说「开个端口」如果忘了只允许指定来源，等于把门敞开。'
    ],
    analogy: '防火墙像小区门口的安保：不是所有车都能进，要看登记名单（规则）——访客车（正常请求）放行，可疑车辆（攻击流量）拦下；但如果你把「任何人可进」挂门口（端口全开），安保就形同虚设。',
    talk: {
      good: ['安全组只开放 80/443，SSH 仅允许公司 IP 段访问。', '数据库端口不要暴露公网，仅内网访问。'],
      bad: [
        { say: '帮我开放个端口', why: '没限定来源 IP 和用途，AI 可能开成对全网开放，成安全隐患。' }
      ]
    },
    misconceptions: ['防火墙只能拦攻击？它也拦误配置，规则错了自己服务也连不上。', '安全组就是摆设？它是云上第一道防线，配错了等于裸奔。'],
    related: ['port', 'vpn', 'tls-handshake']
  },

  {
    id: 'nat',
    en: 'NAT (Network Address Translation)',
    zh: 'NAT 网络地址转换',
    aliases: ['NAT', '地址转换', '内网穿透', '端口映射'],
    cat: 'network',
    tags: ['IP', '网络'],
    level: 'advanced',
    summary: '一个公网 IP 让一堆设备上网：NAT 改写地址和端口做内网到公网的翻译。',
    plain: [
      '家里/公司几十台设备只有一两个公网 IP，NAT（网络地址转换）解决这个问题：内网设备发出请求时，路由器把源地址改成自己的公网 IP 并记下对应关系，响应回来时再翻译回内网设备。',
      '代价：外网无法主动连进来（没有对应映射记录），所以内网服务要暴露到公网得靠端口映射（手动 NAT 规则）或内网穿透。IPv6 普及后地址充足，NAT 的需求会减少。',
      '跟 AI 说「内网服务要公网访问，配端口映射或内网穿透」，它给方案；说「别人访问不了我的服务」多半是 NAT/防火墙没映射，不是代码问题。'
    ],
    analogy: 'NAT 像公司前台转接电话：内部分机（内网设备）打出去，统一用公司总机号码（公网 IP），总机记下「谁打的，打给谁」，对方回电总机再转回内部分机——但外面想直接打进某个分机（主动连内网），没有总机登记就转不进去。',
    talk: {
      good: [
        '开发环境的服务要对公网可访问，请配置端口映射或内网穿透工具。',
        '排查外网无法访问内网服务：检查 NAT 端口映射和防火墙是否都放行。'
      ],
      bad: [
        { say: '别人访问不了我的服务', why: '多半是 NAT/防火墙没映射；不点破，AI 可能一直查应用层代码。' }
      ]
    },
    misconceptions: [
      'NAT 是安全问题？它有保护作用（外网难主动连内网），但本意是省地址。',
      'IPv6 下还有 NAT？IPv6 地址充足可不再需要，但仍可能用于隐私等场景。'
    ],
    related: ['ip-address', 'ipv6', 'firewall']
  },

  {
    id: 'osi-model',
    en: 'OSI Model',
    zh: 'OSI 七层模型',
    aliases: ['OSI', '七层模型', '应用层', '传输层', '网络层'],
    cat: 'network',
    tags: ['协议', '理论'],
    level: 'common',
    summary: '七层从物理线缆到应用协议的分层框架：帮你定位问题「出在第几层」。',
    plain: [
      'OSI 七层把网络功能分层：物理层（线缆信号）、数据链路层（MAC、交换机）、网络层（IP、路由）、传输层（TCP/UDP、端口）、会话层、表示层、应用层（HTTP、DNS）。现代实际以 TCP/IP 四层模型为主，OSI 是理解框架。',
      '它的价值是「定位问题出在哪层」：页面打不开，先看物理/链路（网线、WiFi）、网络层（ping 通不通）、传输层（端口通不通）、应用层（HTTP 状态）——一层层排查比乱试快。',
      '跟 AI 说「按分层排查：先 ping、再测端口、再看 HTTP 状态」，它就是标准排错流程；说「网站访问不了」它如果直接改代码，可能问题在网络层根本无关。'
    ],
    analogy: 'OSI 七层像物流的分拣系统：从包裹贴上快递单（数据链路）、送上干线运输（网络层）、到站点分拣（传输层）、最后送货上门（应用层）——出问题先看「卡在哪个环节」（哪一层），而不是乱查。',
    talk: {
      good: [
        '按分层排查连通性：ping 测网络层，telnet 测端口，再查 HTTP 应用层。',
        '这个问题涉及协议栈第几层？先定位再处理。'
      ],
      bad: [
        { say: '网站打不开帮我看看', why: '没说现象（ping 通不通、端口通不通），AI 无法判断是网络层还是应用层问题。' }
      ]
    },
    misconceptions: [
      'OSI 就是 TCP/IP 的实现？OSI 是理论模型，实际互联网用 TCP/IP 四层，OSI 用来理解和分层。',
      '所有问题都是应用层问题？多数「连不上」在网络层或传输层，要分层定位。'
    ],
    related: ['http', 'tcp-vs-udp', 'ip-address']
  },

  {
    id: 'http-request-lifecycle',
    en: 'HTTP Request Lifecycle',
    zh: '一次请求的全过程',
    aliases: ['请求流程', 'URL 输入到页面', 'DNS 到响应', 'lifecycle'],
    cat: 'network',
    tags: ['HTTP', '流程'],
    level: 'common',
    summary: '从敲 URL 到看到页面：DNS 解析、TCP 握手、TLS 握手、发请求、服务器处理、响应渲染。',
    plain: [
      '在浏览器输入网址到页面显示，中间发生：DNS 解析域名成 IP（先查本地缓存）→ 建立 TCP 连接（三次握手）→ HTTPS 则加 TLS 握手 → 发送 HTTP 请求 → 服务器处理返回响应（HTML）→ 浏览器解析 HTML 又发起 CSS/JS/图片等子资源请求 → 渲染页面。',
      '这个流程是排查性能问题的地图：每一步都可能慢。DevTools 的 Network Timing 把各阶段拆给你看（DNS 查询、连接、TLS、等待 TTFB、下载），慢在哪一步就优化哪一步。',
      '跟 AI 说「看 Network Timing：TTFB 长是服务器慢，DNS 长是解析慢，连接长是网络问题」，它就能准确归因；说「页面慢」没拆分阶段就无从下手。'
    ],
    analogy: '一次请求像点外卖全流程：查店家地址（DNS）、拨电话（TCP 握手）、确认身份（TLS）、下单（请求）、店家做菜（服务器处理）、骑手送餐（响应）、你摆盘开吃（浏览器渲染）——哪一步慢，就优化哪一步，别笼统说「外卖慢」。',
    talk: {
      good: [
        '看 Network Timing 拆分：DNS、连接、TLS、TTFB 分别耗时，定位瓶颈阶段。',
        'TTFB 高说明服务端处理慢，优先优化后端和数据库查询。'
      ],
      bad: [
        { say: '页面加载慢帮我整体优化', why: '没分阶段看耗时，AI 只能给通用清单，抓不住真正瓶颈。' }
      ]
    },
    misconceptions: ['慢就是服务器慢？可能是 DNS、握手、子资源瀑布流慢。', '看总时长就行？要拆阶段看，总时长掩盖了具体瓶颈。'],
    related: ['dns', 'tcp-three-way-handshake', 'http-versions']
  },

  {
    id: 'quic-http3',
    en: 'QUIC & HTTP/3',
    zh: 'QUIC 与 HTTP/3',
    aliases: ['QUIC', 'HTTP/3', 'UDP 上跑可靠传输'],
    cat: 'network',
    tags: ['协议', '性能'],
    level: 'advanced',
    summary: 'QUIC 在 UDP 上实现了可靠传输：握手更快、切网不断连、没有队头阻塞，是 HTTP/3 的地基。',
    plain: [
      'QUIC 是谷歌主导的传输协议：在 UDP 之上实现 TCP 的可靠、有序、拥塞控制，还自带 TLS 加密。HTTP/3 就是跑在 QUIC 上的 HTTP。它解决 TCP 的几个老毛病：握手往返更多、TCP 层队头阻塞、切网络（WiFi→4G）连接断开。',
      '实际收益：连接建立更快（0-RTT 复用）、弱网和切换网络不重连、多路复用不再被 TCP 队头阻塞拖累。适用：音视频、移动端、高 RTT 场景。现代 CDN 和主流浏览器已广泛支持，多数场景自动协商启用。',
      '跟 AI 说「移动端弱网场景评估 HTTP/3，利用 QUIC 的 0-RTT 和连接迁移」，它就能讲清收益；说「加 QUIC」如果 CDN/服务端不支持，光浏览器支持也没用。'
    ],
    analogy: 'QUIC 像给老邮路（TCP）换了一套「带 GPS 的快递方案」（UDP+可靠保障）：不用每次寄件都重新签协议（握手快）、搬了家快递自动跟过来（切网不断）、件再多也不会堵死一条道（无队头阻塞）。',
    talk: {
      good: [
        '评估移动端弱网场景上 HTTP/3：利用 QUIC 的 0-RTT 和连接迁移特性。',
        '确认 CDN 已支持 HTTP/3 再启用，否则客户端不会自动用。'
      ],
      bad: [
        { say: '给我网站开 HTTP/3', why: '没说 CDN/服务端是否支持，AI 光改客户端没意义，还得先确认平台能力。' }
      ]
    },
    misconceptions: [
      'QUIC 就是 UDP，不可靠？QUIC 在 UDP 上自实现可靠传输，是可靠且加密的。',
      'HTTP/3 随处可用？要服务端、CDN、客户端都支持才生效，需确认。'
    ],
    related: ['tcp-vs-udp', 'http-versions', 'tls-handshake']
  },

  {
    id: 'tcp-timeout',
    en: 'TCP & HTTP Timeouts',
    zh: '连接与读写超时',
    aliases: ['超时', '连接超时', '读超时', 'timeout'],
    cat: 'network',
    tags: ['网络', '可靠性'],
    level: 'common',
    summary: '请求要有超时：连不上等多久、收数据等多久，不设超时会被拖到天荒地老。',
    plain: [
      '网络请求必须有超时，否则下游卡住会无限占着你的线程/连接。三类超时：连接超时（connect timeout，建 TCP 连接最多等多久）、读超时（read/socket timeout，等响应数据最多等多久）、总超时（整体请求上限）。',
      '数值要权衡：太小误杀慢请求（正常请求被砍），太大故障时拖死自己。常见基线：连接 2-5 秒、读 5-10 秒、总 10-30 秒（看业务）。超时后通常配合重试（对幂等请求）或降级。',
      '跟 AI 说「调用外部接口加超时：连接 3 秒、读 5 秒、总 8 秒，超时返回降级」，它就会配；说「请求卡住不返回」十有八九是没设超时。'
    ],
    analogy: '超时像打电话等接通：不能无限等（连接超时 5 秒没接就挂）、通话也不能无限拖（读超时 10 秒没声音就挂）——不给通话设上限，一个坏线路能占着你一整天。',
    talk: {
      good: [
        '所有外部调用配置超时：connect 3s、read 5s、总 8s，超时返回降级结果。',
        '这个请求超时值太小，正常慢请求被误杀，请调到业务可接受范围。'
      ],
      bad: [
        { say: '请求一直卡着不动', why: '没设超时的典型症状；不点破，AI 可能查半天下游，其实缺个 timeout 配置。' }
      ]
    },
    misconceptions: [
      '超时越大越安全？越大故障时自己拖得越久，要按业务设合理值。',
      '只设连接超时够？读超时（等数据）同样要设，否则连上但一直等数据也会卡死。'
    ],
    related: ['http', 'tcp-three-way-handshake', 'retry-backoff']
  },

  {
    id: 'url-structure',
    en: 'URL Structure',
    zh: 'URL 的组成',
    aliases: ['URL', 'URI', '路径', '查询参数', '锚点'],
    cat: 'network',
    tags: ['HTTP', '基础'],
    level: 'core',
    summary: 'URL 拆开是 协议+域名+路径+查询参数+锚点：哪一段影响什么，排查和设计都要懂。',
    plain: [
      '一个 URL（https://example.com/path/to/page?id=3#section）由几部分组成：协议（https）、域名（example.com，可带端口）、路径（/path/to/page，指向资源）、查询参数（?id=3，键值对）、锚点（#section，页面内定位，不发给服务器）。',
      '理解它有助于：排查问题（路径 404 还是参数错）、设计接口（路径表达资源、参数表达条件）、做统计（锚点变化不发请求，要统计用 query 参数）、写爬虫/前端路由。URL 中一些字符要编码（中文、空格、&）。',
      '跟 AI 说「这个链接点击不跳转，检查路径和锚点」「统计要带参数不要用锚点」，它就能定位；说「链接有问题」它得先拆开看是哪一段。'
    ],
    analogy: 'URL 像快递收货地址的完整写法：快递公司（协议）+ 城市（域名）+ 街道门牌（路径）+ 备注（查询参数）+ 第几层几室（锚点）——写错任何一段，货就到不了对的地方。',
    talk: {
      good: [
        '这个页面跳转要在 URL 里带 campaign 来源参数，统计需要，不要用锚点。',
        '路径里的中文参数记得 URL 编码，避免请求异常。'
      ],
      bad: [
        { say: '链接点开不对', why: '没说是路径、参数还是锚点问题，AI 只能逐个猜。' }
      ]
    },
    misconceptions: ['锚点变化会重新请求服务器？不会，锚点只在浏览器本地滚动定位。', 'URL 可以随便写中文？要编码，否则解析会出错。'],
    related: ['http', 'dns', 'port']
  }
  );
})(window);
