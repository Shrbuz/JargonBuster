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
  }

  );
})(window);
