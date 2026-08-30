/* ============================================================
   ui-libs.js · UI 库图鉴 · 数据
   每个库：生态 / 场景 / 收费 / 设计语言 / 标签 / 官网 / 「对 AI 该怎么说」句式。
   styleRef 取值必须是 ui-styles.js 中已有的风格 id → 小样即按该风格渲染；
   cats.eco / cats.scene 是筛选桶（展示用 ecosystems / scenario 的机器可读版）。
   挂载：window.STD_UI_LIBS（数据）· window.STD_UI_LIB_FACETS（筛选维度）
        · window.STD_UI_LIB_FILTER（纯函数筛选，smoke 可直接调用）
   ============================================================ */
(function (W) {
  'use strict';

  W.STD_UI_LIBS = [
    {
      id: 'shadcn-ui',
      name: 'shadcn/ui',
      aliases: ['shadcn', 'shadcn-vue'],
      ecosystems: ['React', 'Vue(社区)', 'Next.js'],
      cats: { eco: ['react', 'vue'], scene: ['admin', 'saas'] },
      pricing: 'free',
      scenario: '中后台、官网、SaaS',
      designLanguage: '现代、极简、无固定设计语言',
      tags: ['热门', '可定制', '源码复制', 'Tailwind'],
      site: 'https://ui.shadcn.com',
      summary: '源码分发而非 npm 依赖：组件代码直接生成进项目，想怎么改都没有黑盒。',
      note: '实为源码分发集合；Vue 生态走社区维护的 shadcn-vue。',
      aiTalk: {
        good: [
          '用 shadcn/ui + Tailwind 搭登录页：先 npx shadcn@latest init 初始化，再 add button card input，组件源码直接生成到项目里',
          '表格页用 shadcn/ui 的 DataTable 配 TanStack Table 做排序筛选，样式保持项目现有 Tailwind 令牌',
          '弹窗用 shadcn/ui 的 Dialog（底层 Radix），焦点陷阱和 ESC 关闭行为不用自己写'
        ],
        bad: [
          { say: 'npm install shadcn-ui', why: '它不是传统 npm 组件包，没有这种安装方式；正确说法是「用 shadcn CLI 把组件源码加进项目」' },
          { say: '把 shadcn 升级到最新版', why: '组件源码已在项目里，没有整包升级的概念；应该说「把某个组件重新拉取最新源码，再和本地版本比对差异」' }
        ]
      },
      styleRef: 'minimalism'
    },
    {
      id: 'mui',
      name: 'MUI',
      aliases: ['Material UI', 'Material-UI'],
      ecosystems: ['React'],
      cats: { eco: ['react'], scene: ['admin'] },
      pricing: 'freemium',
      scenario: '中后台、企业级',
      designLanguage: 'Material Design',
      tags: ['组件最全', '付费模板', '生态成熟'],
      site: 'https://mui.com',
      summary: 'React 生态最老牌的 Material 组件库，组件覆盖面与社区资料都是天花板。',
      aiTalk: {
        good: [
          '后台用 MUI (Material UI)：DataGrid 做表格，sx 属性覆盖样式，主题用 createTheme 定制主色',
          '表单用 MUI 的 TextField 配 react-hook-form，受控组件用 Controller 桥接'
        ],
        bad: [
          { say: '用 MUI 但不要 Material 风格', why: 'MUI 与 Material 语言深度绑定，彻底换风格成本很高；想要自由风格应该选 shadcn 或无头库' }
        ]
      },
      styleRef: 'material-design'
    },
    {
      id: 'ant-design',
      name: 'Ant Design',
      aliases: ['AntD', 'antd'],
      ecosystems: ['React', 'Vue', 'Angular(ng-zorro)'],
      cats: { eco: ['react', 'vue', 'angular'], scene: ['admin', 'data'] },
      pricing: 'free',
      scenario: '中后台、数据密集',
      designLanguage: '企业级、中式规范',
      tags: ['热门', '表格强', '表单强', '中文友好'],
      site: 'https://ant.design',
      summary: '国内中后台的事实标准：表格、表单、大批量数据场景的成熟度最高。',
      aiTalk: {
        good: [
          '中后台用 Ant Design 5：表格页直接说「ProTable 一套配齐筛选区 + 表格 + 分页」，主题用 ConfigProvider 的 token 定制',
          '复杂表单用 antd Form：rules 校验 + Form.List 动态增减行，不要手写表单状态'
        ],
        bad: [
          { say: '用 Ant Design 写官网营销首页', why: 'antd 的企业后台气质与营销页诉求不符，出稿会「后台味」很重；营销页更适合定制样式或纯 Tailwind' }
        ]
      },
      styleRef: 'swiss-style'
    },
    {
      id: 'mantine',
      name: 'Mantine',
      ecosystems: ['React'],
      cats: { eco: ['react'], scene: ['admin', 'saas'] },
      pricing: 'free',
      scenario: '中后台、SaaS、工具',
      designLanguage: '现代、紧凑、暗色主题',
      tags: ['组件最全', '生态成熟'],
      site: 'https://mantine.dev',
      summary: '组件与 hooks 数量都极多、自带完整主题方案，适合不想拼装第三方库的团队。',
      aiTalk: {
        good: [
          '用 Mantine 7 搭管理后台：AppShell 布局 + 重组件优先用官方包（@mantine/dates、@mantine/tiptap），不再引第三方',
          '暗色主题走 CSS 变量与 data-mantine-color-scheme，不做运行时样式切换'
        ],
        bad: [
          { say: 'Mantine 像 MUI 一样用 sx 属性覆盖样式', why: 'Mantine 7 用 CSS Modules + CSS 变量，没有 sx prop；混着说 AI 会写出跑不起来的代码' }
        ]
      },
      styleRef: 'flat-design'
    },
    {
      id: 'chakra-ui',
      name: 'Chakra UI',
      ecosystems: ['React'],
      cats: { eco: ['react'], scene: ['admin', 'saas'] },
      pricing: 'free',
      scenario: '中后台、官网、原型',
      designLanguage: '现代、柔和、高可访问',
      tags: ['可访问性', '轻量'],
      site: 'https://chakra-ui.com',
      summary: '以 Props 控样式、以可访问性著称，原型与内部工具做起来顺手。',
      aiTalk: {
        good: [
          '用 Chakra UI 3 搭原型：variant 控制按钮形态，colorPalette 一键换色，布局用 Stack/HStack',
          '弹窗与抽屉用 Chakra 的 Dialog/Drawer 组件，焦点管理与 aria 属性开箱即得'
        ],
        bad: [
          { say: 'Chakra 2 的写法直接用在 Chakra 3 项目', why: 'v3 重构了组件 API（如 colorScheme 变 colorPalette），旧文档句式会让 AI 生成不兼容代码' }
        ]
      },
      styleRef: 'minimalism'
    },
    {
      id: 'heroui',
      name: 'HeroUI',
      aliases: ['NextUI'],
      ecosystems: ['React (Next.js 优先)'],
      cats: { eco: ['react'], scene: ['saas'] },
      pricing: 'free',
      scenario: '现代 SaaS、官网、作品集',
      designLanguage: '极简、时尚、类 Vercel',
      tags: ['热门', '轻量', 'Tailwind'],
      site: 'https://www.heroui.com',
      summary: '原 NextUI，2025 年更名 HeroUI：动效细腻、默认样式高颜值的 Tailwind 组件库。',
      note: '2025 年由 NextUI 更名 HeroUI（heroui.com）；旧教程里的 @nextui-org 包名已迁移为 @heroui。',
      aiTalk: {
        good: [
          '官网用 HeroUI + Tailwind：Hero 组件配 Navbar 做首屏，玻璃质感背景自己加，不再引其他 UI 库',
          '注意包名：新版从 @heroui/react 安装，旧的 @nextui-org/react 已停更'
        ],
        bad: [
          { say: 'npm install @nextui-org/react', why: '项目 2025 年已更名 HeroUI，旧包名不再更新；按旧名安装会拿到停更版本' }
        ]
      },
      styleRef: 'glassmorphism'
    },
    {
      id: 'element-plus',
      name: 'Element Plus',
      ecosystems: ['Vue 3'],
      cats: { eco: ['vue'], scene: ['admin'] },
      pricing: 'free',
      scenario: '中后台、企业级',
      designLanguage: '简洁、商务',
      tags: ['热门', '中文友好', '生态成熟'],
      site: 'https://element-plus.org',
      summary: 'Vue 3 中后台的默认答案之一，文档与社区资料对中文开发者极其友好。',
      aiTalk: {
        good: [
          'Vue 3 后台用 Element Plus：el-table + el-form + el-dialog 组合，表单校验走 el-form 的 rules',
          '主题定制用 CSS 变量（--el-color-primary 一族），不要覆盖源码样式'
        ],
        bad: [
          { say: 'Vue 3 项目安装 element-ui', why: 'element-ui 是 Vue 2 维护期老库，Vue 3 必须用 element-plus；包名说错 AI 会装错' }
        ]
      },
      styleRef: 'flat-design'
    },
    {
      id: 'vuetify',
      name: 'Vuetify',
      ecosystems: ['Vue 2 / Vue 3'],
      cats: { eco: ['vue'], scene: ['admin', 'saas'] },
      pricing: 'freemium',
      scenario: '中后台、移动适配',
      designLanguage: 'Material Design',
      tags: ['付费模板', '生态成熟'],
      site: 'https://vuetifyjs.com',
      summary: 'Vue 生态的 Material 实现标杆，组件密度与规范性高，模板市场成熟。',
      aiTalk: {
        good: [
          '用 Vuetify 3（Vue 3）：v-data-table 做数据列表，v-app/v-main 搭骨架，主题在 createVuetify 里配',
          '栅格用 v-row/v-col 的 12 列体系，断点命名跟 Material（sm/md/lg/xl）'
        ],
        bad: [
          { say: '把 Vuetify 2 的用法用在 Vue 3 项目', why: 'v2 与 v3 组件 API 差异大（多处组件重构），旧句式会生成不兼容代码' }
        ]
      },
      styleRef: 'material-design'
    },
    {
      id: 'naive-ui',
      name: 'Naive UI',
      ecosystems: ['Vue 3'],
      cats: { eco: ['vue'], scene: ['admin'] },
      pricing: 'free',
      scenario: '中后台、工具',
      designLanguage: '现代、明亮、轻快',
      tags: ['中文友好', '轻量'],
      site: 'https://www.naiveui.com',
      summary: 'TypeScript 全量编写的 Vue 3 组件库，主题定制粒度细，API 设计清爽。',
      aiTalk: {
        good: [
          'Vue 3 + TS 项目用 Naive UI：n-config-provider 包全局主题，n-data-table 复杂列用 TSX 写渲染函数',
          '暗色模式把 darkTheme 传给主题配置，配 useOsTheme 跟随系统'
        ],
        bad: [
          { say: 'Naive UI 的表单校验和 Element Plus 完全一样', why: '两者都基于 async-validator 但组件属性名有差异；混写两边示例会直接报错' }
        ]
      },
      styleRef: 'minimalism'
    },
    {
      id: 'prime',
      name: 'PrimeVue / PrimeNG',
      aliases: ['PrimeVue', 'PrimeNG', 'PrimeReact', 'PrimeFaces'],
      ecosystems: ['Vue', 'Angular', 'React'],
      cats: { eco: ['vue', 'angular', 'react'], scene: ['data', 'admin'] },
      pricing: 'freemium',
      scenario: '数据密集、后台管理',
      designLanguage: '传统、商务',
      tags: ['表格强', '表单强', '付费模板', '多框架'],
      site: 'https://www.primevue.org',
      summary: '一套设计语言跨 Vue / Angular / React 三框架，以重表格、重表单的复杂组件著称。',
      note: '按一条收录（决议 #4）：筛选生态时 React / Vue / Angular 各自命中。',
      aiTalk: {
        good: [
          'Vue 数据密集后台用 PrimeVue：DataTable 的懒加载 + 行编辑 + 列虚拟滚动一套配齐',
          'Angular 项目对应用 PrimeNG，组件 API 与 PrimeVue 同源，用法可互相参考'
        ],
        bad: [
          { say: 'npm install primeng 装到 Vue 项目', why: 'PrimeNG 只服务 Angular；Vue 要装 primevue，React 是 primereact，包名装错直接不能用' }
        ]
      },
      styleRef: 'flat-design'
    },
    {
      id: 'radix-ui',
      name: 'Radix UI',
      ecosystems: ['React'],
      cats: { eco: ['react', 'headless'], scene: ['infra'] },
      pricing: 'free',
      scenario: '设计系统基础设施',
      designLanguage: '无样式（无头）',
      tags: ['无头', '可访问性', '热门'],
      site: 'https://www.radix-ui.com',
      summary: '只管行为与可访问性、不带样式的无头组件，shadcn/ui 的底层引擎。',
      aiTalk: {
        good: [
          '用 Radix UI 的 Dialog/Popover 管交互行为，样式完全自己写，配 Tailwind 不带默认皮肤',
          '下拉菜单用 Radix DropdownMenu：键盘导航、焦点陷阱、aria 属性开箱即得'
        ],
        bad: [
          { say: '用 Radix 做一个好看的按钮', why: 'Radix 基本不提供成品视觉，连按钮都要自己包；要现成好看的组件应该用 shadcn 或全量组件库' }
        ]
      },
      styleRef: 'minimalism'
    },
    {
      id: 'base-ui',
      name: 'Base UI',
      ecosystems: ['React'],
      cats: { eco: ['react', 'headless'], scene: ['infra'] },
      pricing: 'free',
      scenario: '设计系统基础设施',
      designLanguage: '无样式（无头）',
      tags: ['无头'],
      site: 'https://base-ui.com',
      summary: 'MUI 团队与 Radix 作者联手的新一代无头库，新项目选型值得优先看。',
      aiTalk: {
        good: [
          '新 React 项目选无头库用 Base UI（@base-ui-components/react），Dialog/Menu/Tooltip 先行组件已够用',
          'Base UI 用法与 Radix 相近但包名和部分 prop 不同，示例代码按 base-ui.com 官方文档写'
        ],
        bad: [
          { say: 'Base UI 就是 MUI 的无样式模式', why: 'Base UI 是独立包独立仓库，不是 @mui/base 的别名；训练数据早期多提 @mui/base，AI 容易给错包名' }
        ]
      },
      styleRef: 'minimalism'
    },
    {
      id: 'headless-ui',
      name: 'Headless UI',
      aliases: ['headlessui'],
      ecosystems: ['React', 'Vue'],
      cats: { eco: ['react', 'vue', 'headless'], scene: ['infra'] },
      pricing: 'free',
      scenario: '设计系统基础设施',
      designLanguage: '无样式（无头）',
      tags: ['无头', 'Tailwind'],
      site: 'https://headlessui.com',
      summary: 'Tailwind 官方出品的无头组件：组件少而精，与 Tailwind 天然契合。',
      aiTalk: {
        good: [
          'Tailwind 项目里用 Headless UI 的 Menu + Dialog，样式全部用 Tailwind class 写',
          '可搜索下拉用 Headless UI 的 Combobox，普通选择用 Listbox'
        ],
        bad: [
          { say: '用 Headless UI 搭整个后台的组件体系', why: '它只有十来个无头组件，没有表格 / 图表 / 表单栅格；成体系的后台应选全量组件库' }
        ]
      },
      styleRef: 'minimalism'
    },
    {
      id: 'react-aria',
      name: 'React Aria',
      aliases: ['Adobe React Spectrum'],
      ecosystems: ['React'],
      cats: { eco: ['react', 'headless'], scene: ['infra'] },
      pricing: 'free',
      scenario: '企业级设计系统',
      designLanguage: '无样式（Hooks）',
      tags: ['无头', '可访问性', '大厂出品'],
      site: 'https://react-spectrum.adobe.com/react-aria',
      summary: 'Adobe 出品的无头 Hooks 集：把交互行为、键盘、屏幕阅读器支持做成可组合函数。',
      aiTalk: {
        good: [
          '自研组件库用 React Aria 的 useButton/useDialog/useSelect 等 hooks 承担行为与无障碍，视觉自己实现',
          '多语言项目用 I18nProvider + useLocale 处理 RTL 与文案方向'
        ],
        bad: [
          { say: 'React Aria 是组件库，直接 import 它的 Button', why: '它是 hooks 与行为层，不含成品视觉组件；直接要组件应该用 React Spectrum 或其他库' }
        ]
      },
      styleRef: 'minimalism'
    },
    {
      id: 'tailwind-css',
      name: 'Tailwind CSS',
      aliases: ['TW', 'tailwind'],
      ecosystems: ['全框架（CSS 工具）'],
      cats: { eco: ['all-framework', 'css-tool'], scene: ['infra'] },
      pricing: 'free',
      scenario: '全场景（样式层）',
      designLanguage: '原子化 CSS（无预设）',
      tags: ['热门', '生态成熟'],
      site: 'https://tailwindcss.com',
      summary: '原子化 CSS 工具类方案：不是组件库，而是现代 UI 生态的公共样式层。',
      aiTalk: {
        good: [
          '项目样式用 Tailwind CSS 4：工具类直接写在标记上，主题令牌用 @theme 定义 CSS 变量',
          '组件逻辑用 React/Vue，样式全走 Tailwind class，不再另写自定义 CSS 文件'
        ],
        bad: [
          { say: '用 Tailwind 写一个按钮组件', why: 'Tailwind 只提供样式工具类，没有组件；应该说「用 Tailwind 的类组合出按钮样式」并把结构说清楚' }
        ]
      },
      styleRef: 'minimalism'
    },
    {
      id: 'bootstrap',
      name: 'Bootstrap',
      ecosystems: ['全框架（CSS 工具）'],
      cats: { eco: ['all-framework', 'css-tool'], scene: ['saas', 'admin'] },
      pricing: 'free',
      scenario: '官网、快速原型、传统后台',
      designLanguage: '经典、通用、响应式',
      tags: ['经典老牌', '多框架'],
      site: 'https://getbootstrap.com',
      summary: '最经典的 HTML/CSS 框架：栅格 + 预设组件，贴上 class 即用，原型速度极快。',
      aiTalk: {
        good: [
          '快速原型用 Bootstrap 5：container/row/col 栅格 + btn/card/navbar 预设类，零构建直接引',
          'Bootstrap 5 已不依赖 jQuery，JS 组件用 data-bs-* 属性或 import 方式启用'
        ],
        bad: [
          { say: '把 Bootstrap 4 的 class 写进 5 的项目', why: 'v5 改名了一批类（如 .badge-* 变 .bg-*、移除 .form-row），旧类名会静默失效而不报错' }
        ]
      },
      styleRef: 'flat-design'
    },
    {
      id: 'daisyui',
      name: 'daisyUI',
      ecosystems: ['全框架（Tailwind 插件）'],
      cats: { eco: ['all-framework', 'css-tool'], scene: ['saas'] },
      pricing: 'free',
      scenario: '官网、SaaS、快速开发',
      designLanguage: '语义化、美观、预设样式',
      tags: ['Tailwind', '轻量'],
      site: 'https://daisyui.com',
      summary: 'Tailwind 的语义化组件类插件：btn/card 一个类名出成品样式，补齐 TW 没有预设组件的短板。',
      aiTalk: {
        good: [
          'Tailwind 项目加 daisyUI：btn btn-primary、card 这类语义类直接出成品样式，主题用 data-theme 切换',
          'daisyUI 只补组件层，布局与微调仍用 Tailwind 工具类，两层配合不打架'
        ],
        bad: [
          { say: 'daisyUI 单独用在没装 Tailwind 的项目', why: '它是 Tailwind 插件，脱离 Tailwind 无法工作；按独立 CSS 框架引 CDN 会配置错误' }
        ]
      },
      styleRef: 'claymorphism'
    },
    {
      id: 'tdesign',
      name: 'TDesign',
      aliases: ['腾讯 TDesign'],
      ecosystems: ['React', 'Vue', '小程序'],
      cats: { eco: ['react', 'vue'], scene: ['admin'] },
      pricing: 'free',
      scenario: '中后台、企业级',
      designLanguage: '腾讯设计规范',
      tags: ['大厂出品', '小程序', '中文友好'],
      site: 'https://tdesign.tencent.com',
      summary: '腾讯开源的企业级设计体系，React / Vue / 小程序多端实现齐全。',
      aiTalk: {
        good: [
          '小程序端用 TDesign 小程序组件库（t- 前缀），与 Web 端视觉统一',
          'Vue 3 后台用 TDesign Vue Next：t-table + t-form，主题用 CSS 令牌覆盖'
        ],
        bad: [
          { say: 'TDesign 和 Element Plus 组件名通用', why: '前缀不同（t- 与 el-），部分 API 命名也有差异；混用两家的示例会直接编译报错' }
        ]
      },
      styleRef: 'flat-design'
    },
    {
      id: 'arco-design',
      name: 'ArcoDesign',
      aliases: ['字节 Arco', 'arco'],
      ecosystems: ['React', 'Vue'],
      cats: { eco: ['react', 'vue'], scene: ['admin'] },
      pricing: 'free',
      scenario: '中后台、企业级',
      designLanguage: '字节设计规范',
      tags: ['大厂出品', '中文友好'],
      site: 'https://arco.design',
      summary: '字节跳动开源的企业级设计系统，设计资源（图标 / 插画 / Sketch 件）齐全。',
      aiTalk: {
        good: [
          'React 中后台用 Arco Design：Table 支持虚拟滚动与树形展示，ConfigProvider 整体换主题',
          '需要设计资源时用 Arco 官方图标库与 Figma/Sketch 资源，和组件视觉一一对应'
        ],
        bad: [
          { say: 'Arco React 版的组件 API 照搬到 Vue 版', why: '@arco-design/web-react 与 web-vue 由不同团队维护，属性命名有差异；示例要分开写' }
        ]
      },
      styleRef: 'swiss-style'
    }
  ];

  /* ---------------- 筛选维度（前端内存过滤，零构建） ---------------- */

  var ECO_FACETS = [
    { id: 'react', label: 'React' },
    { id: 'vue', label: 'Vue' },
    { id: 'angular', label: 'Angular' },
    { id: 'all-framework', label: '全框架' },
    { id: 'headless', label: '无头' },
    { id: 'css-tool', label: 'CSS 工具' }
  ];

  var SCENE_FACETS = [
    { id: 'admin', label: '中后台' },
    { id: 'saas', label: 'SaaS · 官网' },
    { id: 'infra', label: '基础设施' },
    { id: 'data', label: '数据密集' }
  ];

  var PRICING_FACETS = [
    { id: 'free', label: '免费' },
    { id: 'freemium', label: '免费 + 付费' }
  ];

  /* 标签从数据自动聚合：按出现次数降序、同次数按首次出现顺序 */
  function aggregateTags(libs) {
    var counts = {}, order = [];
    libs.forEach(function (l) {
      (l.tags || []).forEach(function (t) {
        if (!counts[t]) { counts[t] = 0; order.push(t); }
        counts[t]++;
      });
    });
    return order.slice().sort(function (a, b) { return counts[b] - counts[a]; })
      .map(function (t) { return { id: t, label: t, count: counts[t] }; });
  }

  W.STD_UI_LIB_FACETS = {
    eco: ECO_FACETS,
    scene: SCENE_FACETS,
    pricing: PRICING_FACETS,
    tags: aggregateTags(W.STD_UI_LIBS)
  };

  /**
   * 纯函数筛选：state = { eco:[], scene:[], pricing:[], tags:[] }
   * 同维度内 OR（命中任一即留），跨维度 AND（每个已选维度都须命中）。
   */
  W.STD_UI_LIB_FILTER = function (state) {
    var s = state || {};
    return W.STD_UI_LIBS.filter(function (l) {
      var eco = s.eco || [], scene = s.scene || [], pricing = s.pricing || [], tags = s.tags || [];
      if (eco.length && !eco.some(function (x) { return l.cats.eco.indexOf(x) !== -1; })) return false;
      if (scene.length && !scene.some(function (x) { return l.cats.scene.indexOf(x) !== -1; })) return false;
      if (pricing.length && pricing.indexOf(l.pricing) === -1) return false;
      if (tags.length && !tags.every(function (x) { return l.tags.indexOf(x) !== -1; })) return false;
      return true;
    });
  };
})(window);
