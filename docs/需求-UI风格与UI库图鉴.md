# 升级需求文档：UI 风格图鉴 + UI 库图鉴

> 状态：**已完成**（2026-02 · 一期改名 + UI 风格图鉴上线；二期 UI 库图鉴上线，发版随下次发布进行）
> 提出：2026-02 · 作者：Shrbuz + Claude 整理
> 关联：现有「前端元素图鉴」（原「可视化图鉴」，`#/visuals`）

---

## 一、背景与目标

站点定位是「技术规范用语学习手册」：帮开发者在**前端开发过程中正确地与 AI 沟通**。现有两大内容板块：

1. **词条库**（448 条，分类学习）
2. **前端元素图鉴**（`#/visuals`，10 组 74 个界面元素标本）

本次升级新增两个图鉴板块，补齐「与 AI 沟通 UI」的另外两个关键维度：

| 维度 | 解决的问题 | 新板块 |
|---|---|---|
| 元素 | 「这个控件长什么样、叫什么」 | 前端元素图鉴（已有） |
| **风格** | 「我要什么视觉气质，怎么跟 AI 说清楚」 | **UI 风格图鉴（新增）** |
| **组件库** | 「用什么现成体系搭，怎么跟 AI 说」 | **UI 库图鉴（新增）** |

核心原则（延续站点既有纪律）：每个条目不只是「介绍」，必须落到**「给 AI 的推荐句式」与「常见误述」**——用户看完能直接复制一句话给 AI。

---

## 二、范围

### 做

1. 侧边导航「图鉴」分组调整：改名 1 项 + 新增 2 项
2. UI 风格图鉴：列表页 + 详情页 + 纯 CSS 风格小样预览 + AI 沟通指南
3. UI 库图鉴：列表页（分类/标签筛选）+ 详情卡 + 官网外链 + AI 沟通指南
4. 站内搜索接入两个新板块（关键词命中风格名/库名/标签）
5. 新板块内容与现有词条、元素图鉴的交叉互链

### 不做（本次明确排除）

- 不引入任何第三方运行时依赖（保持零构建、纯静态）
- 不做真实组件库的在线渲染/iframe 嵌入（预览用 CSS 手绘小样）
- 不做收藏/学习进度接入（词条的 favs 机制不扩展到新板块）
- 不做多语言

---

## 三、信息架构与路由

| 板块 | 路由 | 说明 |
|---|---|---|
| 前端元素图鉴 | `#/visuals[/:group[/:item]]` | **路由不变**，仅改显示名（深链全兼容） |
| UI 风格图鉴 | `#/styles[/:styleId]` | 新增；列表页 + 详情页 |
| UI 库图鉴 | `#/libs[/:libId]` | 新增；列表页（带筛选）+ 详情卡 |

- `router.js` 路由表新增 `styles` / `libs` 两个 case 与对应 view。
- 侧栏 `activeKey` 同步支持 `styles` / `libs`。
- 未匹配 id → 安全回退列表页（同 `visualGroup('nope') === null` 的现有约定）。

### 侧边导航变更（`main.js` renderSidebar）

```
图鉴
├─ 前端元素图鉴   （原「可视化图鉴」改名）
├─ UI 风格图鉴    （新增）
└─ UI 库图鉴      （新增）
```

- 三项均**不显示条目计数**（延续现有图鉴侧栏项约定；站点 UI 文案不放统计数字）。
- 图标：元素图鉴沿用 eye；风格建议 palette/brush 类；库建议 layout/package 类（从 `STD_UTIL.ICONS` 现有图标选，缺则补一枚线性图标）。

---

## 四、UI 风格图鉴

### 4.1 内容定位

整理主流 UI 视觉风格：每个风格讲清「**什么气质、什么特征、代码上怎么实现、跟 AI 怎么说**」。可视化预览采用**「同一组件套件，多种风格渲染」**的对比式小样——一套按钮/卡片/输入框/标题，每种风格画一份，风格差异一眼可比。这与元素图鉴「同一内容、不同呈现」的教学哲学一致。

### 4.2 数据模型（`assets/js/data/ui-styles.js`，挂 `window.STD_UI_STYLES`）

```js
{
  id: 'glassmorphism',
  name: '玻璃拟态',
  en: 'Glassmorphism',
  aliases: ['磨砂玻璃', '玻璃风', 'frosted glass'],
  era: '2020–',                     // 流行时段（自由文本）
  represents: ['macOS Big Sur', 'iOS 控制中心'],  // 代表产品
  features: ['半透明面板', '背景模糊 backdrop-filter', '1px 高光描边', '悬浮层级感'],
  cssHint: 'backdrop-filter: blur(12px) + rgba 半透明底 + 细高光描边',
  summary: '一句话讲气质与适用场景',
  aiTalk: {
    good: ['给 AI 的推荐句式，可直接复制', '…'],
    bad: [{ say: '常见误述', why: '为什么这样说 AI 会做歪' }]
  },
  demo: 'style-glassmorphism',      // 纯 CSS 小样 key
  related: ['glassmorphism', 'opacity']  // 可指向词条 id 或其他风格 id
}
```

### 4.3 风格小样规范（`visual-demos.js` 或新 `ui-style-demos.js`）

- 每个风格一个 demo 函数，内容统一为同一「组件套件」：标题 + 一段文案 + 主按钮/幽灵按钮 + 输入框 + 小卡片。只有样式随风格变，内容不变 → 跨风格对比成立。
- 全部纯 CSS + 静态 HTML（全站 demo 无 JS 的既有边界），`stl-*` 前缀（style 标本，与元素图鉴 `vd-*` 区分）。
- 遵守令牌化配色与减动效偏好；风格本身需要的渐变/模糊属于内容，不算装饰滥用。

### 4.4 AI 沟通指南（每条必备，本板块的核心价值）

- `aiTalk.good`：2~3 条可直接复制的中文句式，含风格关键词 + 用法约束。
  例（玻璃拟态）：「卡片用玻璃拟态：半透明白 8% 底 + backdrop-filter blur 12px + 1px 内描边高光，浮在渐变背景上」
- `aiTalk.bad`：1~2 条常见误述及后果。
  例：只说「做高级一点」→ AI 自由发挥，出稿风格随机。

### 4.5 风格清单

**风格清单（共 18 项 = 用户指定 12 + 确认补充 6）：**

| # | 风格 | en | 备注 |
|---|---|---|---|
| 1 | 拟物化 | Skeuomorphism | iOS 6 之前年代代表 |
| 2 | 扁平化 | Flat Design | 与拟物对照讲 |
| 3 | Material Design | Material Design | Google 规范，与「强调色」词条互链 |
| 4 | Liquid Glass | Liquid Glass | Apple 2025 设计语言，与玻璃拟态做区分说明 |
| 5 | 新拟物化 | Neumorphism | 与拟物/扁平三方对照 |
| 6 | 玻璃拟态 | Glassmorphism | 与现有词条 `glassmorphism`、元素图鉴「毛玻璃」标本**互链** |
| 7 | 新粗野主义 | Neubrutalism | 与经典粗野主义区分一句带过 |
| 8 | 瑞士国际主义 | Swiss / International Typographic | 网格、无衬线、留白，与「留白」词条互链 |
| 9 | 日系编辑美学 | Japanese Editorial | 竖排点缀、大量留白、克制配色 |
| 10 | 终端/CLI 美学 | Terminal / CLI Aesthetic | 等宽字体、绿字黑底、ASCII 边框 |
| 11 | 体素美学 | Voxel | 像素/体素块面 |
| 12 | 3D/插画风格 | 3D / Illustration | 3D 元素材、插画风空态 |
| 13 | 粘土拟态 | Claymorphism | 2022+ 卡片/图标流行风，与新拟物对照 |
| 14 | 极简主义 | Minimalism | 出镜率最高，与瑞士风格做边界澄清 |
| 15 | Bento Grid | Bento Grid | 2023+ 官网/发布会卡片布局热词，AI 圈高频 |
| 16 | 孟菲斯 | Memphis | 几何涂鸦、高饱和撞色，活动页常用 |
| 17 | Y2K / 千禧复古 | Y2K | 品牌营销页偶发需求 |
| 18 | 酸性设计 | Acid Graphics | 海报/活动页风格，AI 生成易跑偏需约束 |

### 4.6 与现有内容的互链

- 玻璃拟态 ⇄ 词条 `glassmorphism` + 元素图鉴「毛玻璃」标本（`effects/glassmorphism`）
- Material Design ⇄ 词条「强调色」「交互四态」；瑞士 ⇄ 词条「留白」；扁平 ⇄「暗色模式」的颜色体系段落
- 风格详情页底部「相关风格」互链（拟物↔扁平↔新拟物三方、玻璃拟态↔Liquid Glass）
- 反向：相关词条详情页的「相关」区可出现风格图鉴深链（实现时评估现有 related 机制是否扩展，避免过度工程——一期可只在风格→词条单向链）

---

## 五、UI 库图鉴

### 5.1 内容定位

整理主流 UI 组件库/CSS 框架：让用户**按生态、场景、收费、风格快速找到候选库**，看懂每个库的设计语言，并学会**怎么跟 AI 说「用 XX 库」才不返工**。

### 5.2 数据模型（`assets/js/data/ui-libs.js`，挂 `window.STD_UI_LIBS`）

```js
{
  id: 'shadcn-ui',
  name: 'shadcn/ui',
  ecosystems: ['React', 'Vue(社区)'],       // 生态
  scenario: '中后台、官网、SaaS',            // 适用场景
  pricing: 'free',                          // free | freemium
  designLanguage: '现代、极简、无固定设计语言',
  tags: ['热门', '可定制', '源码复制', 'Tailwind'],
  site: 'https://ui.shadcn.com',
  summary: '一句话定位',
  aiTalk: {
    good: ['用 shadcn/ui + Tailwind 搭登录页：组件源码复制进项目，不装组件 npm 包'],
    bad: [{ say: 'npm install shadcn', why: '它不是传统组件库，是源码分发集合，这样说 AI 会装错' }]
  },
  styleRef: 'minimal'                       // 关联风格 id → 小样即按该风格渲染
}
```

### 5.3 列表页与筛选（核心交互）

- **筛选维度**（前端内存过滤，零构建）：
  - 生态：React / Vue / Angular / 全框架 / 无头 / CSS 工具
  - 场景：中后台 / SaaS·官网 / 基础设施 / 数据密集
  - 收费：免费 / 免费+付费
  - 标签：热门、可定制、无头组件、Tailwind、大厂出品…（取自数据自动聚合）
- 筛选 UI 用 chip 多选（复用反馈表单同款 checkbox-chip 交互模式），筛选条件变化即时更新卡片列表；支持「清空筛选」。
- 卡片内容：库名 + 生态徽标 + 场景一句话 + 风格小样缩略 + 标签 chips + 「访问官网 ↗」外链（`target="_blank" rel="noopener"`）。
- 库名/别名/标签进搜索索引，搜索页新增「UI 库」命中分区（仿现有 vs-match 模式）。

### 5.4 可视化效果预览

不嵌真实库（零构建约束）。每个库通过 `styleRef` 关联一个 UI 风格，**复用风格图鉴的 CSS 小样**按该库设计语言渲染一张「风格小样缩略」——按钮 + 卡片两件套的迷你版。效果：MUI 卡片是 Material 阴影、shadcn 是黑白极简、Neubrutalism 库是硬阴影描边，差异可见。
（备选：不做组件预览，只做信息卡——见第八节问题 3。）

### 5.5 AI 沟通指南

每个库必备 `aiTalk`：怎么向 AI 声明技术栈、版本、按需引入方式、别踩的误述。这是「正确与 AI 沟通 UI 库」的核心交付。

### 5.6 库清单（用户整理 19 项，全部纳入；「核查」列为整理时补充事实，实施前再核一遍）

| 库 | 生态 | 场景 | 收费 | 风格 | 核心标签 | 官网 | 核查备注 |
|---|---|---|---|---|---|---|---|
| shadcn/ui | React, Vue(社区), Next.js | 中后台、官网、SaaS | 免费 | 现代、极简、无固定设计语言 | 热门、可定制、源码复制、Tailwind | ui.shadcn.com | 实为源码分发集合；Vue 走社区 shadcn-vue |
| MUI (Material UI) | React | 中后台、企业级 | 免费+付费高级组件 | Material Design | 生态最大、组件最全、付费模板 | mui.com | — |
| Ant Design | React, Vue, Angular | 中后台、数据密集 | 免费 | 企业级、中式规范 | 国内王者、表格强、表单强 | ant.design | Angular 实现为 ng-zorro |
| Mantine | React | 中后台、SaaS、工具 | 免费 | 现代、紧凑、暗色主题 | 组件多、hooks 多、独立生态 | mantine.dev | — |
| Chakra UI | React | 中后台、官网、原型 | 免费 | 现代、柔和、高可访问 | 易用、Props 控制、可访问性优先 | chakra-ui.com | — |
| NextUI | React (Next.js 优先) | 现代 SaaS、官网、作品集 | 免费 | 极简、时尚、类 Vercel | 视觉出众、轻量、Tailwind | nextui.org | ⚠ 2025 年已更名 HeroUI（heroui.com），条目需按新名收录并注明曾用名 |
| Element Plus | Vue 3 | 中后台、企业级 | 免费 | 简洁、商务 | Vue 3 首选、国内热门、中文友好 | element-plus.org | — |
| Vuetify | Vue 全版本 | 中后台、移动适配 | 免费+付费模板 | Material Design | Vue Material 标杆、成熟稳定 | vuetifyjs.com | — |
| Naive UI | Vue 3 | 中后台、工具 | 免费 | 现代、明亮、轻快 | TS 完美、主题灵活 | naiveui.com | — |
| PrimeVue / PrimeNG | Vue, Angular, React | 数据密集、后台管理 | 免费+付费模板 | 传统、商务 | 数据表格超强、复杂组件 | primevue.org / primeng.org | 收录为一条还是两条，见问题 3 |
| Radix UI | React | 设计系统基础设施 | 免费 | 无样式（无头） | 无头组件、可访问性、shadcn 底层 | radix-ui.com | — |
| Base UI | React | 设计系统基础设施 | 免费 | 无样式（无头） | MUI 系新一代无头库、推荐新项目 | base-ui.com | — |
| Headless UI | React, Vue | 设计系统基础设施 | 免费 | 无样式（无头） | Tailwind 官方、完美适配 TW | headlessui.com | — |
| React Aria | React | 企业级设计系统 | 免费 | 无样式（Hooks） | Adobe 出品、国际化、可访问性 | react-spectrum.adobe.com/react-aria | — |
| Tailwind CSS | 全框架（CSS 工具） | 全场景（样式层） | 免费 | 原子化 CSS（无预设） | 样式工具、基础设施、现代必备 | tailwindcss.com | — |
| Bootstrap | 全框架（CSS 工具） | 官网、快速原型、传统后台 | 免费 | 经典、通用、响应式 | 经典老牌、HTML/CSS 框架 | getbootstrap.com | — |
| daisyUI | 全框架（Tailwind 插件） | 官网、SaaS、快速开发 | 免费 | 语义化、美观、预设样式 | Tailwind 插件、无需写 CSS | daisyui.com | — |
| TDesign | React, Vue, 小程序 | 中后台、企业级 | 免费 | 腾讯设计规范 | 腾讯出品、大厂背书、小程序支持 | tdesign.tencent.com | — |
| ArcoDesign | React, Vue | 中后台、企业级 | 免费 | 字节设计规范 | 字节出品、设计资源丰富 | arco.design | — |
| OpenTiny | React, Vue, Angular | 中后台、企业级 | 免费 | 华为设计规范 | 华为出品、跨框架 | opentiny.design | — |

> 补充候选（不默认加入）：Element UI（Vue 2 维护期）、Quasar（Vue 全端）、Tremor（数据看板专用）、shadcn-vue 若按独立条目处理。默认不收，需要时再说。

---

## 六、搜索与首页集成

- `search.js` 新增 `searchStyles(q)` / `searchLibs(q)`（评分口径同 searchVisuals：名称 > en > 别名 > 标签/特征），并在总搜索入口聚合。
- 搜索页新增「UI 风格」「UI 库」命中分区，样式复用 vs-match 列表模式。
- 首页图鉴分组区块（`views.js:361` 一带）增加两个板块的入口卡，文案讲意义不放数字。

---

## 七、技术要点与影响面

1. **文件划分**（延续现有 IIFE + window 全局约定）：
   - `assets/js/data/ui-styles.js`、`assets/js/data/ui-libs.js`（数据）
   - `ui-style-demos.js`（风格小样渲染，或并入 visual-demos.js——实施时定）
   - `views.js` 新增 `styles()` / `style(id)` / `libs()` / `lib(id)` 视图；`router.js` 加 case；`main.js` 侧栏 + boot
2. **改名影响面**（「可视化图鉴」→「前端元素图鉴」）：
   - `main.js:55`（侧栏）、`views.js:258`（词条页链接文案）、`views.js:361`（首页分组标题）、`visual-demos.js:576`（跑马灯公告文案）
   - `tools/smoke.js`：侧栏断言文案同步改；新增断言（侧栏含新两项、新路由解析、新数据加载无异常、筛选函数冒烟）
   - `index.html`：如有 title/meta 提及一并改（实施时 grep 确认）
3. **深链兼容**：`#/visuals/**` 全部不变，仅显示名变化，外链/收藏不失效。
4. **CSS**：新板块样式放独立 `ui-extra.css` 或并入现有文件——实施时按体量定；`stl-*`（风格小样）/ `lib-*`（库卡片）前缀，令牌化配色。
5. **文案纪律**：站点 UI 文案讲意义/价值/痛点，不放统计数字；README 特性清单补两个新板块条目（分组名不写数量）。
6. **验收标准（节选）**：
   - 三个图鉴入口在侧栏可见、active 态正确、深链直达
   - 每个风格详情含：小样、特征、cssHint、AI 句式（good≥2 / bad≥1）、互链
   - 库列表筛选（生态/场景/收费/标签）组合过滤正确、清空可用、外链新窗打开
   - 搜索「毛玻璃」「无头」「腾讯」等关键词能命中对应新板块
   - `node tools/smoke.js` 全绿；移动端三入口可用

---

## 八、确认决议（2026-02）

| # | 问题 | 决议 |
|---|---|---|
| 1 | 侧边栏第三项命名 | **UI 库图鉴**（清单含无头库与 CSS 工具，不都是「框架」） |
| 2 | 风格清单 | 指定 12 项 + **6 个候选全部纳入**，共 18 项 |
| 3 | UI 库预览形态 | **风格小样缩略**——每库按其设计语言复用风格小样渲染按钮+卡片 |
| 4 | PrimeVue / PrimeNG | 按原表收一条，筛选时生态各算 |
| 5 | 实施节奏 | **分两期**：一期改名+风格图鉴，二期 UI 库图鉴 |

---

## 九、里程碑（确认后填）

- [x] 一期：改名 + 路由基建 + UI 风格图鉴（数据 18 条、小样、详情页、搜索接入、smoke/README）✅ 2026-02 完成，smoke 全绿
- [x] 二期：UI 库图鉴（数据 19 条、筛选、详情卡+风格小样缩略、搜索接入、smoke/README）✅ 2026-02 完成，smoke 全绿；发版随下次发布进行
