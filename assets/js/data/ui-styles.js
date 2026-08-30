/* ============================================================
   ui-styles.js · UI 风格图鉴 · 数据
   每个风格：气质特征 / 代码实现要点 / 「对 AI 该怎么说」的句式与误述。
   related 取值：风格 id；词条 id 用 'term:xxx'；元素图鉴标本用 'visual:组/元素'；
   纯 id 默认按 风格 → 词条 顺序解析。
   挂载：window.STD_UI_STYLES
   ============================================================ */
(function (W) {
  'use strict';

  W.STD_UI_STYLES = [
    {
      id: 'skeuomorphism',
      name: '拟物化',
      en: 'Skeuomorphism',
      aliases: ['拟物', '拟物风格', '写实风格', '仿真 UI'],
      era: '2007–2013',
      represents: ['iOS 6 及之前', '早期 macOS'],
      features: ['真实材质质感（皮革 / 木纹 / 金属）', '高光与阴影营造立体', '控件看起来「可以按」', '细节多、装饰性强'],
      cssHint: '多层 box-shadow 高光 + 暗部、渐变模拟材质、大圆角、纹理背景',
      summary: '把屏幕控件画成现实物件的模样：按钮像按键、记事本像皮面本。信息直觉好，但视觉噪音大，后被扁平化取代。',
      aiTalk: {
        good: [
          '按钮做成拟物风格：深棕色皮革质感背景 + 顶部内高光 + 底部 2px 暗色投影，看起来像实体按键',
          '开关做成拟物化拨杆：金属边框 + 玻璃反光高光，拨到 ON 有下压效果'
        ],
        bad: [
          { say: '做得逼真一点、质感好一点', why: '这不是明确的风格指令，AI 大概率只加个阴影糊弄过去；要直接点名拟物化，并指出材质与光影手段' }
        ]
      },
      demo: 'skeuomorphism',
      related: ['flat-design', 'neumorphism', 'button']
    },
    {
      id: 'flat-design',
      name: '扁平化',
      en: 'Flat Design',
      aliases: ['扁平风格', '扁平设计', '纯扁平', 'Flat UI'],
      era: '2013–',
      represents: ['iOS 7', 'Windows Metro'],
      features: ['去掉高光 / 阴影 / 渐变', '纯色块 + 简单几何', '层级靠颜色深浅与留白', '图标单色或双色'],
      cssHint: '纯色背景、无阴影或极浅阴影、平色边框，层级用明度差表达',
      summary: '把拟物的「皮」全部剥掉，只留颜色、形状和排版。至今仍是界面设计的基本盘，也是多数风格的基底。',
      aiTalk: {
        good: [
          '整体走扁平化：纯色块、无渐变无阴影，卡片层级靠背景明度差和留白区分',
          '图标用扁平风格：单色几何面性，2px 圆角，不加立体效果和长投影'
        ],
        bad: [
          { say: '界面太单调了，加点效果', why: '不说明要在扁平框架内加层次，AI 容易把渐变和高光全加回来，扁平语言直接被破坏；应改为「保留扁平，用明度/留白增强层级」' }
        ]
      },
      demo: 'flat-design',
      related: ['skeuomorphism', 'neumorphism', 'dark-mode']
    },
    {
      id: 'material-design',
      name: 'Material Design',
      en: 'Material Design',
      aliases: ['谷歌 Material', 'MD 风格', '质感设计', 'Material You'],
      era: '2014–',
      represents: ['Google 全家桶', 'Android 系统应用'],
      features: ['海拔（elevation）阴影分层', '悬浮按钮 FAB', '涟漪点击反馈', '纸片隐喻 + 规范化动效曲线'],
      cssHint: '分层 box-shadow（如 0 1px 3px rgba(0,0,0,.12)）、12~16px 圆角、primary/on-primary 主题色对',
      summary: 'Google 的开源设计规范：用「海拔」组织层级，用规范约束交互与动效。企业后台与 Android 生态的通用语言。',
      aiTalk: {
        good: [
          '按 Material Design 3 规范：卡片用 elevation-1 阴影 + 12px 圆角，主色 #6750A4，按钮按下带涟漪反馈',
          '页面结构用 Material 风格：顶部 AppBar + 右下角 FAB + 操作后 Snackbar 提示'
        ],
        bad: [
          { say: '用谷歌那种风格', why: 'Google 的视觉横跨十年多代产品，AI 可能混搭出「四不像」；要点名 Material Design 并指定版本（M2 / M3）' }
        ]
      },
      demo: 'material-design',
      related: ['accent-color', 'interactive-states', 'glassmorphism']
    },
    {
      id: 'liquid-glass',
      name: 'Liquid Glass',
      en: 'Liquid Glass',
      aliases: ['液态玻璃', '苹果液态玻璃', 'Apple 2025 设计'],
      era: '2025–',
      represents: ['iOS 26', 'Apple 全平台新设计语言'],
      features: ['高折射感透明玻璃', '边缘折射高光', '随背景流动形变', '比玻璃拟态更透、更亮'],
      cssHint: 'backdrop-filter: blur + saturate 增强、内侧多层白色高光渐变、大圆角胶囊造型',
      summary: '苹果 2025 年发布的设计语言：玻璃从「磨砂面板」变成「透镜」，能折射、有流动感。注意与玻璃拟态区分——更透明、高光更强。',
      aiTalk: {
        good: [
          '导航栏用 Liquid Glass 质感：透明玻璃胶囊 + backdrop-filter blur(20px) saturate(1.6) + 顶部 1px 白色高光内描边，浮在内容之上',
          '控件组做成 Apple Liquid Glass：通透表面带液态高光，边缘有轻微折射感（CSS 可退化为 blur + saturate + 双层内高光）'
        ],
        bad: [
          { say: '做成毛玻璃', why: '毛玻璃≈玻璃拟态：磨砂重、透明度低；Liquid Glass 更透更亮、强调边缘折射与高光。混用会得到两种风格掺在一起的产物' }
        ]
      },
      demo: 'liquid-glass',
      related: ['glassmorphism']
    },
    {
      id: 'neumorphism',
      name: '新拟物化',
      en: 'Neumorphism',
      aliases: ['新拟物', 'Soft UI', '软 UI', '柔和拟物'],
      era: '2019–2021',
      represents: ['Dribbble 概念稿', '极简音乐播放器'],
      features: ['与背景同色的凸起 / 凹陷', '双光源软阴影', '低对比、极简配色', '控件像从背景里「挤」出来'],
      cssHint: '背景与控件同色；凸起 box-shadow: 8px 8px 16px 暗部, -8px -8px 16px 亮部；凹陷用 inset',
      summary: '拟物与扁平的折中实验：不画材质，只靠同色双影表现「凸与凹」。观感细腻但对比度低，可用性差，适合局部点缀。',
      aiTalk: {
        good: [
          '新拟物风格：卡片与页面同底色 #E0E5EC，外阴影 8px 8px 16px rgba(163,177,198,.6) + 内侧 -8px -8px 16px 白色高光做出凸起，按下时切换为 inset 内凹',
          '音量旋钮用新拟物：同色圆形 + 双向柔影，滑槽做内凹效果'
        ],
        bad: [
          { say: '做立体感强一点的按钮', why: '新拟物的核心是「同色双影」而非立体装饰；不点名的话 AI 常做成拟物或普通投影按钮' }
        ]
      },
      demo: 'neumorphism',
      related: ['skeuomorphism', 'flat-design', 'claymorphism']
    },
    {
      id: 'glassmorphism',
      name: '玻璃拟态',
      en: 'Glassmorphism',
      aliases: ['磨砂玻璃', '玻璃风', '毛玻璃 UI', 'frosted glass'],
      era: '2020–',
      represents: ['macOS Big Sur', 'iOS 控制中心'],
      features: ['半透明面板', '背景模糊 backdrop-filter', '1px 高光描边', '悬浮在彩色背景之上'],
      cssHint: 'rgba 白 8%~20% 底 + backdrop-filter: blur(12px) + 1px rgba(255,255,255,.25) 内描边',
      summary: '让面板像磨砂玻璃：透出背景、模糊细节、边缘描一圈高光。需要彩色 / 渐变背景衬托，纯白背景下没有效果。',
      aiTalk: {
        good: [
          '卡片用玻璃拟态：半透明白 10% 底 + backdrop-filter blur(12px) + 1px 内描边 rgba(255,255,255,0.25)，浮在彩色渐变背景上',
          '登录卡做成磨砂玻璃效果，透出并模糊背后背景；不支持 backdrop-filter 时降级为 85% 不透明实底'
        ],
        bad: [
          { say: '做得高级一点、通透一点', why: '「高级」「通透」不是风格关键词，AI 会自由发挥、出稿风格随机；直接点名玻璃拟态并给出透明度 / 模糊 / 描边参数' }
        ]
      },
      demo: 'glassmorphism',
      related: ['liquid-glass', 'term:glassmorphism', 'visual:effects/glassmorphism', 'gradient']
    },
    {
      id: 'neubrutalism',
      name: '新粗野主义',
      en: 'Neubrutalism',
      aliases: ['新粗野', '新野蛮主义', 'Neubrutalism 风格', '硬边框风'],
      era: '2021–',
      represents: ['Gumroad', 'Figma 社区模板'],
      features: ['粗黑描边', '实色硬阴影（无模糊）', '高饱和撞色', '直角或小圆角、粗野直接'],
      cssHint: 'border: 2px solid #000 + box-shadow: 4px 4px 0 #000，hover 位移到阴影位置模拟按压',
      summary: '用最直接的元素说话：黑描边、实心阴影、撞色，拒绝精致圆滑。个性强烈，适合品牌营销页与创作者站点。',
      aiTalk: {
        good: [
          '新粗野主义卡片：白底 + 2px 黑描边 + 右下 6px 6px 0 实心黑阴影（无模糊），hover 时卡片位移 2px 露出阴影',
          '配色用新粗野常见撞色：#FF6B6B 珊瑚红 + #FFD93D 柠檬黄 + 纯黑描边，按钮按下往阴影方向位移'
        ],
        bad: [
          { say: '粗野主义风格', why: '经典 Brutalism 指「裸 HTML」感：系统默认字体与样式；新粗野主义是精致的撞色 + 硬阴影。漏掉「新」字，AI 可能给你 90 年代素页面' }
        ]
      },
      demo: 'neubrutalism',
      related: ['swiss-style', 'acid-design']
    },
    {
      id: 'swiss-style',
      name: '瑞士国际主义',
      en: 'Swiss / International Typographic Style',
      aliases: ['瑞士风格', '瑞士设计', '国际主义排版', 'Swiss Design'],
      era: '1950s 起 · Web 持续流行',
      represents: ['瑞士平面设计学派', 'Vercel / Linear 等现代官网'],
      features: ['严格网格系统', '无衬线字体主导', '大量留白 + 非对称版式', '黑白灰 + 单一强调色'],
      cssHint: '12 列网格对齐、Inter/Helvetica、超大标题与极小正文强对比、只用一个强调色',
      summary: '网格、字体、留白三件套：信息本身即装饰。技术官网与开发者产品的默认审美，也与本站气质同源。',
      aiTalk: {
        good: [
          '瑞士国际主义排版：12 列网格对齐、字体只用 Inter，超大号标题（clamp 48~96px）与小号正文形成对比，全站只有黑白灰和一个红色强调色，装饰元素为零',
          '用瑞士风格重排这个页面：左对齐、非对称布局、细分隔线代替卡片边框'
        ],
        bad: [
          { say: '简约风格', why: '「简约」会被 AI 理解成泛泛的极简或 Material 简化版；瑞士风特指网格 + 字体驱动的版式系统，要点名并描述网格与配色约束' }
        ]
      },
      demo: 'swiss-style',
      related: ['minimalism', 'whitespace']
    },
    {
      id: 'japanese-editorial',
      name: '日系编辑美学',
      en: 'Japanese Editorial',
      aliases: ['日系排版', '日式编辑设计', '杂志风', '日系杂志排版'],
      era: '长期流行',
      represents: ['无印良品', '日系杂志与书籍装帧'],
      features: ['大面积留白', '小字号细字重', '竖排文字点缀', '低饱和灰调 + 细线框'],
      cssHint: 'font-weight 300/400 + letter-spacing 放宽、writing-mode: vertical-rl 点缀、米白灰调配色',
      summary: '像排一本安静的书：字小而轻、留白慷慨、偶尔一条竖排短句。适合作品集、品牌故事与内容型站点。',
      aiTalk: {
        good: [
          '日系编辑风：大面积留白、13px 小字配 300 字重、标题旁放一条竖排短句（writing-mode: vertical-rl）、米白底 + 灰调配色 + 1px 细线框',
          '用日系杂志排版组织这篇内容：段落之间留白至少 48px，图片做旧灰调处理，编号用「一、二、三」'
        ],
        bad: [
          { say: '日式简约风', why: '「日式」不是有效的风格指令，AI 大概率输出普通极简页面；要描述竖排点缀、低饱和、细字重、留白尺度这些具体特征' }
        ]
      },
      demo: 'japanese-editorial',
      related: ['swiss-style', 'minimalism', 'whitespace']
    },
    {
      id: 'terminal',
      name: '终端 / CLI 美学',
      en: 'Terminal / CLI Aesthetic',
      aliases: ['终端风', '命令行风格', 'CLI 风', 'TUI 风格', '黑客终端风'],
      era: '长期 · 近年复古回潮',
      represents: ['开发者工具官网', 'btop / TUI 应用'],
      features: ['等宽字体', '深底 + 荧光字（绿 / 琥珀）', 'ASCII 与框线字符边框', '闪烁光标、扫描线点缀'],
      cssHint: 'ui-monospace 字族、#0D1117 底 + #3FB950 字、1px 边框面板、$ 前缀与闪烁光标动画',
      summary: '把界面做成一台终端：等宽字、框线面板、命令行提示符。开发者受众里信任感极强，文档与工具站常用。',
      aiTalk: {
        good: [
          '终端风界面：等宽字体、黑底 #0D1117 绿字 #3FB950、面板用 1px 边框模拟 TUI 窗口，文本行前缀 $ 或 >，光标做闪烁动画',
          'Hero 区做成 CLI 演示窗口：标题栏三个圆点 + 命令行逐行输出安装命令（纯 CSS 动画即可）'
        ],
        bad: [
          { say: '科技感、黑客风', why: 'AI 常输出蓝紫渐变 + 霓虹发光的「赛博」风，而不是真正的终端美学；要给足等宽字体、具体配色、框线元素等约束' }
        ]
      },
      demo: 'terminal',
      related: ['y2k']
    },
    {
      id: 'voxel',
      name: '体素美学',
      en: 'Voxel',
      aliases: ['体素风', '立方块风', 'Voxel Art'],
      era: '2010s–',
      represents: ['Minecraft', 'Crossy Road'],
      features: ['立方体块面拼组', '阶梯状像素边缘', '三面三明度的平涂着色', '直角无抗锯齿'],
      cssHint: '方块用纯色平涂，顶面 / 侧面 / 暗面三档明度，直角 0 圆角，忌用渐变与模糊',
      summary: '3D 的像素化：用大小一致的立方块拼出世界。游戏感强、辨识度高，营销活动与游戏产品页的常客。',
      aiTalk: {
        good: [
          '插画用体素风：立方体块面组合，每个方块三个面用同一色相的三档明度平涂（顶面最亮、侧面次之、背光面最暗），直角无圆角',
          '图标区做成 Voxel 场景：角色与道具全部由小立方块拼成，配合等轴测视角'
        ],
        bad: [
          { say: '像素风', why: '像素风（Pixel Art）是 2D 平面点阵；体素是 3D 块面。混说会拿到 2D 像素图而非立体块面效果' }
        ]
      },
      demo: 'voxel',
      related: ['3d-illustration']
    },
    {
      id: '3d-illustration',
      name: '3D / 插画风格',
      en: '3D / Illustration',
      aliases: ['3D 风', '插画风', '3D 图标', 'C4D 风格', '三维插画'],
      era: '2019–',
      represents: ['Notion 插画', '各家官网头图与空态'],
      features: ['3D 渲染素材（C4D / Blender 质感）', '柔和渐变光照', '插画替代照片与图标', '圆润亲和的气质'],
      cssHint: '站内以图片 / SVG 素材为主；CSS 用柔和渐变底 + 大圆角 + 柔光阴影承托素材',
      summary: '用 3D 元素和插画替掉图标与照片：亲和、现代、有品牌记忆点。空态、引导页、营销头图的高频选择。',
      aiTalk: {
        good: [
          '空态配 3D 插画素材（我会上传）：卡片用柔和天蓝渐变底 + 24px 圆角承托，插画风格与 Notion 类产品的圆润插画风一致',
          '营销头图用 3D 渲染风格：磨砂玻璃质感球体 + 柔光，背景紫蓝渐变，文字压在左侧留白区'
        ],
        bad: [
          { say: '加点好看的图', why: '没有风格约束时 AI 会随机配图库照片或 emoji，与整体气质脱节；要指定插画流派（3D / 扁平插画 / 手绘）与使用位置' }
        ]
      },
      demo: '3d-illustration',
      related: ['voxel', 'claymorphism']
    },
    {
      id: 'claymorphism',
      name: '粘土拟态',
      en: 'Claymorphism',
      aliases: ['粘土风', '软萌立体风', '充气风', 'Clay 风'],
      era: '2022–',
      represents: ['3D 图标包', '订阅按钮与儿童产品'],
      features: ['大圆角 + 膨胀感', '外投色影 + 内双层高光', '像充气粘土的柔软体量', '明快马卡龙配色'],
      cssHint: 'border-radius 16~24px + box-shadow 三件套：外 0 10px 20px 色影、inset 0 6px 12px 亮部、inset 0 -6px 12px 暗部',
      summary: '新拟物的可爱版：把控件吹成软软的粘土，靠内高光和彩色外影撑起体量感。适合轻产品、儿童与营销场景。',
      aiTalk: {
        good: [
          '粘土拟态按钮：#A78BFA 底、20px 圆角、外阴影 0 10px 20px rgba(167,139,250,.45) + inset 双层高光/暗部，做出充气粘土的膨胀感',
          '图标卡片用 Claymorphism：马卡龙配色 + 奶油色内高光 + 同色系外投影，圆润无锐角'
        ],
        bad: [
          { say: '可爱一点的立体按钮', why: 'AI 可能给出拟物、卡通描边或普通立体按钮；粘土拟态的核心是「内高光 + 同色外影 + 大圆角」三件套，要描述到位' }
        ]
      },
      demo: 'claymorphism',
      related: ['neumorphism', '3d-illustration']
    },
    {
      id: 'minimalism',
      name: '极简主义',
      en: 'Minimalism',
      aliases: ['极简风', '简约设计', '少即是多', 'Minimal Design'],
      era: '长期流行',
      represents: ['Apple 官网', 'Notion'],
      features: ['只保留必要元素', '色彩克制（黑白 + 少量强调色）', '充足留白', '隐藏复杂度、单列聚焦'],
      cssHint: '做减法：元素数量、颜色数（≤3）、边框全部最小化；留白按 2 的幂放大（32/64/128px）',
      summary: '一种「做减法」的原则：删到不能再删。注意与瑞士风格的边界——瑞士是网格与字体系统，极简是减法原则，两者常一起用。',
      aiTalk: {
        good: [
          '极简处理：这个页面只保留标题、一句话说明和一个主按钮，去掉所有边框和次要信息，区块留白至少 64px',
          '导航极简化：只留 3 个入口，其余收进「更多」；配色只用黑白灰加一个强调色'
        ],
        bad: [
          { say: '简单点', why: '「简单」会被理解成交互简单或实现简单；极简是视觉与信息层面的减法，要明确指出删什么、留什么' }
        ]
      },
      demo: 'minimalism',
      related: ['swiss-style', 'japanese-editorial', 'whitespace']
    },
    {
      id: 'bento-grid',
      name: 'Bento Grid',
      en: 'Bento Grid',
      aliases: ['便当盒布局', '便当格', 'Bento 布局', '拼贴网格'],
      era: '2023–',
      represents: ['Apple 发布会官网', 'Vercel / Linear 官网'],
      features: ['大小不一的圆角矩形拼贴', '每格一个焦点信息', '网格严丝合缝', '常配图标 / 小样 / 大字数据'],
      cssHint: 'display:grid + grid-template-areas 拼格子；格子圆角 16~24px、gap 12~16px、每格内容居中聚焦',
      summary: '像便当盒一样分格盛放特性：大格讲主打、小格放细节，一眼扫完产品全貌。AI 圈官网的顶流布局热词。',
      aiTalk: {
        good: [
          '特性区用 Bento Grid：4 列网格、跨行跨列组合大小格子，每格一个特性配图标 + 短说明，格子圆角 20px、gap 16px',
          '首屏下方做 Bento 布局：一大格放产品动图，四小格分别放「隐私 / 速度 / 价格 / 客户评价」'
        ],
        bad: [
          { say: '卡片网格布局', why: '普通 card grid 等大等距；Bento 的灵魂是「大小不一的组合节奏」。不说 Bento，AI 会输出均分三栏的普通卡片' }
        ]
      },
      demo: 'bento-grid',
      related: ['minimalism', 'swiss-style']
    },
    {
      id: 'memphis',
      name: '孟菲斯',
      en: 'Memphis',
      aliases: ['孟菲斯风格', 'Memphis 风', '几何涂鸦风', '孟菲斯设计'],
      era: '1980s · 活动页常青回潮',
      represents: ['Memphis Milano 设计集团', '电商大促活动页'],
      features: ['几何涂鸦（波浪线 / 圆点 / 三角）', '高饱和撞色', '图案散布与平铺', '元素带俏皮旋转'],
      cssHint: '#FF5757 / #00C2FF / #FFD166 撞色 + 黑色几何图案散布，元素 rotate 3~5°，SVG 图案做背景平铺',
      summary: '反功能主义的快乐设计：波浪线、圆点、撞色贴纸散满画面。转化型活动页的气氛担当，日常产品页慎用。',
      aiTalk: {
        good: [
          '活动头图用孟菲斯风：亮黄底 + 黑色波浪线、圆点、三角形贴纸散布，主色 #FF5757 与 #00C2FF 撞色，装饰元素带 3~5° 旋转',
          '优惠券卡片做孟菲斯风：粗黑描边 + 几何图案边框 + 高饱和底色，按钮微微倾斜'
        ],
        bad: [
          { say: '活泼一点、年轻一点', why: 'AI 会加几个 emoji 或浅色插画完事；孟菲斯有明确的几何图案语言与撞色系统，要点名并给出配色' }
        ]
      },
      demo: 'memphis',
      related: ['acid-design', 'y2k']
    },
    {
      id: 'y2k',
      name: 'Y2K / 千禧复古',
      en: 'Y2K',
      aliases: ['Y2K 风', '千禧风', '千禧复古', 'Y2K 美学', '复古未来'],
      era: '1997–2005 · 2020s 复兴',
      represents: ['iMac G3', '复古未来主义海报'],
      features: ['铬金属渐变光泽', '半透明糖果色外壳', '气泡字体与圆弧造型', '乐观的复古科技元素'],
      cssHint: '银-蓝-紫多段 linear-gradient + background-clip:text 做金属字；半透明糖果色面板、大圆弧造型',
      summary: '千禧年前后对「未来」的想象：铬金属、糖果色、气泡造型。品牌联名与潮流营销页的复古老客气。',
      aiTalk: {
        good: [
          'Y2K 风横幅：铬金属渐变文字（银-蓝-紫多段 linear-gradient + background-clip: text）、半透明糖果色气泡面板、整体圆弧造型',
          '配色按 Y2K：亮银 + 冰蓝 + 淡紫 + 一点荧光橙，面板半透明带高光边'
        ],
        bad: [
          { say: '复古风', why: '复古可能是 80s 像素、90s 报刊、千禧科技等多种方向；要指出 Y2K 的铬金属与糖果色特征，别让 AI 自选年代' }
        ]
      },
      demo: 'y2k',
      related: ['terminal', 'memphis']
    },
    {
      id: 'acid-design',
      name: '酸性设计',
      en: 'Acid Graphics',
      aliases: ['酸性风', 'Acid 风', '酸性感', '锐利酸性'],
      era: '2010s 末–',
      represents: ['音乐节海报', '潮牌视觉与实验性网页'],
      features: ['高饱和荧光撞色', '液态金属 / 铬质感字体', '扭曲变形的图形与文字', '危险条纹、噪点纹理'],
      cssHint: '#CCFF00 / #FF00E5 荧光撞色 + 金属渐变字 + SVG feTurbulence 扭曲；正文区保持高可读',
      summary: '刺激、锋利、带一点危险感：荧光色 + 液态铬 + 扭曲字。海报式营销页的风格武器，正文与表单区要主动降躁。',
      aiTalk: {
        good: [
          '海报式 hero 用酸性设计：#CCFF00 荧光绿底、铬金属扭曲标题字、黑色危险条纹边框、噪点纹理叠加；正文区域保持白底黑字确保可读',
          '标题字做酸性感：金属渐变填充 + 轻微 skew 与液化扭曲（SVG filter feTurbulence），配荧光描边'
        ],
        bad: [
          { say: '酷炫一点、带点赛博朋克', why: '赛博朋克偏霓虹夜景与 HUD 界面；酸性设计的核心是荧光撞色 + 液态扭曲。不约束的话 AI 极易跑成普通发光渐变落地页' }
        ]
      },
      demo: 'acid-design',
      related: ['memphis', 'y2k', 'neubrutalism']
    }
  ];
})(window);
