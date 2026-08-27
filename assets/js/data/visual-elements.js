/* ============================================================
   visual-elements.js · 前端可视化标准术语 · 数据
   两大分组维度：一级 = 分类组（独立页面），二级 = 具体元素。
   每个元素：标准名称 / 英文 / 别名 / 一句话描述 / 示例键 / 可选词条关联。
   挂载：window.STD_VISUAL_GROUPS
   ============================================================ */
(function (W) {
  'use strict';

  W.STD_VISUAL_GROUPS = [
    {
      id: 'basics', name: '基础', en: 'Basics',
      desc: '几乎所有界面都会出现的原子组件，先认全它们，看任何设计稿都不发怵。',
      items: [
        { id: 'button', name: '按钮', en: 'Button', aliases: ['主要按钮', '次要按钮', '幽灵按钮'],
          desc: '触发一个立即动作的可点击块。一个区域通常只有一个主按钮（实心强调色），其余用次要（描边）或幽灵（无框）按钮弱化层级。',
          demo: 'button', term: 'button' },
        { id: 'icon-button', name: '图标按钮', en: 'Icon Button', aliases: ['方形按钮', '工具按钮'],
          desc: '只放图标不放文字的按钮，常用于工具栏：搜索、刷新、更多。必须配 title 或 aria-label 说明用途。',
          demo: 'icon-button', term: 'icon-button' },
        { id: 'fab', name: '悬浮按钮', en: 'Floating Action Button', aliases: ['FAB', '浮动按钮', '悬浮操作按钮'],
          desc: '悬浮在内容之上、常驻屏幕右下角的圆形主操作按钮，App 里多代表「新建」。一屏只放一个；它是动作不是导航，别拿来当返回或菜单用。',
          demo: 'fab' },
        { id: 'tag', name: '标签', en: 'Tag / Chip', aliases: ['Chip', '标签纸'],
          desc: '标记内容属性的小色块，如分类、状态、关键词。可点击筛选，可带 × 删除；胶囊形是常见变体。',
          demo: 'tag', term: 'chip' },
        { id: 'badge', name: '徽标', en: 'Badge', aliases: ['红点', '角标', '计数徽标'],
          desc: '附着在图标或按钮角上的小指示物：红点表示「有新内容」，数字表示未读数量，99+ 是溢出显示约定。',
          demo: 'badge', term: 'badge' },
        { id: 'avatar', name: '头像', en: 'Avatar', aliases: ['用户图', '首字母头像'],
          desc: '代表用户或团队的圆形/圆角方图。没有图片时用首字母或图标兜底；多头像可叠放，常配在线状态点。',
          demo: 'avatar' },
        { id: 'divider', name: '分割线', en: 'Divider', aliases: ['分隔线', '区隔线'],
          desc: '划分内容区域的细分隔：实线、虚线，或带文字的标题分割线。能留白解决的别加线。',
          demo: 'divider', term: 'divider' },
        { id: 'accordion', name: '折叠面板', en: 'Accordion / Collapse', aliases: ['手风琴', '折叠'],
          desc: '点击标题展开/收起内容的面板组，用于把长内容收进短版面，如 FAQ、设置分组。同一时刻展开一项还是多项要约定。',
          demo: 'accordion', term: 'accordion' }
      ]
    },
    {
      id: 'form', name: '表单', en: 'Forms',
      desc: '收集用户输入的全套控件。表单是业务系统出现率最高的界面，控件的每个状态都值得认识。',
      items: [
        { id: 'text-input', name: '文本输入框', en: 'Text Input', aliases: ['输入框', '文本框'],
          desc: '单行文本录入。完整状态含：占位文案（placeholder）、聚焦态、错误态（红框+提示）、禁用态、前后置图标。',
          demo: 'text-input', term: 'text-input' },
        { id: 'search-input', name: '搜索框', en: 'Search Input', aliases: ['搜索栏', 'Search Bar', '检索框'],
          desc: '带放大镜图标的输入框，常配清除按钮与实时联想下拉。页内过滤用小框、独立搜索页用大框；输入即过滤还是回车再搜，要提前约定。',
          demo: 'search-input', term: 'search-input' },
        { id: 'textarea', name: '多行文本框', en: 'Textarea', aliases: ['文本域', '留言框'],
          desc: '多行输入，用于长文本：备注、简介、反馈。右下角字数统计是常见配套。',
          demo: 'textarea' },
        { id: 'select', name: '下拉选择', en: 'Select', aliases: ['下拉框', '选择器'],
          desc: '从预设选项中选一个（或多个）。选项多于 5 个或空间紧张时优于单选按钮组。',
          demo: 'select', term: 'select-dropdown' },
        { id: 'checkbox', name: '复选框', en: 'Checkbox', aliases: ['多选框', '勾选框'],
          desc: '可多选的勾选控件，「全选」常配半选（indeterminate）状态。与开关的区别：勾选用于「提交的选择」，开关用于「立即生效的切换」。',
          demo: 'checkbox' },
        { id: 'radio', name: '单选组', en: 'Radio Group', aliases: ['单选按钮', 'Radio'],
          desc: '互斥选择：一组里只能选一个，且选定后不能取消（只能换选）。选项 2-5 个且需要全部可见时优于下拉。',
          demo: 'radio' },
        { id: 'switch', name: '开关', en: 'Switch / Toggle', aliases: ['切换开关', 'Toggle'],
          desc: '拨动后立即生效的二元状态控件：开/关。典型如「接受通知」。操作型设置用开关，表单提交型选择用复选框。',
          demo: 'switch' },
        { id: 'slider', name: '滑块', en: 'Slider', aliases: ['滑动条', '拖动条'],
          desc: '在一个连续区间内拖动取值，如音量、价格范围。可带刻度与当前值气泡；精细输入应配数字框。',
          demo: 'slider' },
        { id: 'date-picker', name: '日期选择器', en: 'Date Picker', aliases: ['日历选择', '日期控件'],
          desc: '从日历面板选日期或区间。变体：范围选择、月份选择、快捷选项（近 7 天）。也常见纯文本输入 + 格式校验的轻量形态。',
          demo: 'date-picker' },
        { id: 'rate', name: '评分', en: 'Rate / Rating', aliases: ['星级评分', '打星', 'Rating'],
          desc: '用星级或分数表达评价：可交互选择，也可只读展示。支持半星与清零；只读展示要去掉悬停态，只留静态星色。',
          demo: 'rate' },
        { id: 'input-number', name: '数字输入框', en: 'Input Number', aliases: ['数字输入', '步进器', 'Stepper'],
          desc: '只能输入数字的输入框，常配 +/- 步进按钮，可限定最小值、最大值与步长。数量、份数等精确取值用它，感受区间用滑块。',
          demo: 'input-number' }
      ]
    },
    {
      id: 'navigation', name: '导航', en: 'Navigation',
      desc: '告诉用户「我在哪、能去哪」的结构性组件，是任何多页面产品的骨架。',
      items: [
        { id: 'breadcrumb', name: '面包屑', en: 'Breadcrumb', aliases: ['层级路径', '当前位置'],
          desc: '显示页面在层级结构中的路径：首页 / 分类 / 详情，逐级可回跳，当前级为纯文本。层级深的后台与电商必备。',
          demo: 'breadcrumb', term: 'breadcrumb' },
        { id: 'navbar', name: '顶部导航栏', en: 'Navbar', aliases: ['顶栏', '页头'],
          desc: '页面顶部通栏：品牌、一级菜单、搜索与用户区。常吸顶（滚动保持可见），窄屏收进汉堡菜单。',
          demo: 'navbar', term: 'navbar' },
        { id: 'sidebar', name: '侧边导航', en: 'Sidebar', aliases: ['侧栏菜单', '侧边栏'],
          desc: '左侧竖向菜单，放得下一二级入口，是后台系统默认形态。可折叠成只显图标的窄栏，当前项高亮。',
          demo: 'sidebar', term: 'sidebar' },
        { id: 'tabs', name: '标签页', en: 'Tabs', aliases: ['页签', '选项卡'],
          desc: '在同一页面内切换多块平级内容，一次只显示一块。标签文案要短；内容需要对比时可考虑分栏代替。',
          demo: 'tabs', term: 'tabs' },
        { id: 'pagination', name: '分页', en: 'Pagination', aliases: ['页码', '翻页器'],
          desc: '把大量数据切页展示：页码、上/下一页、总条数、跳页。当前页高亮不可点；超长页码用省略号收缩。',
          demo: 'pagination', term: 'pagination' },
        { id: 'steps', name: '步骤条', en: 'Steps', aliases: ['流程步骤', '向导步骤'],
          desc: '横向展示多步流程进度：已完成打勾、进行中高亮、未执行置灰。表达「未来的流程规划」，别和记录历史的时间线混用。',
          demo: 'steps', term: 'steps' },
        { id: 'tab-bar', name: '底部标签栏', en: 'Tab Bar', aliases: ['底部导航', 'Bottom Navigation', '底部选项卡'],
          desc: 'App 底部的一排平级入口，一般 3-5 个，图标配文字，当前项高亮。它是 App 的第一导航；更深的层级收进「我的」页，别往栏里硬塞。',
          demo: 'tab-bar' }
      ]
    },
    {
      id: 'data', name: '数据展示', en: 'Data Display',
      desc: '把结构化信息组织给人看的组件。选对容器，信息密度和可读性天差地别。',
      items: [
        { id: 'card', name: '卡片', en: 'Card', aliases: ['内容卡', '面板'],
          desc: '一块圆角、带边框或微阴影的独立内容容器，是现代 UI 的通用积木：商品卡、文章卡、设置分组卡。',
          demo: 'card', term: 'card' },
        { id: 'table', name: '表格', en: 'Table', aliases: ['数据表格', '列表格'],
          desc: '行列结构化数据：表头、行悬停、斑马纹、排序箭头、固定列。后台数据管理的主力展示形态。',
          demo: 'table', term: 'table' },
        { id: 'list', name: '列表', en: 'List / List Item', aliases: ['列表项', '条目'],
          desc: '纵向排列的同类条目：头像+文字+元信息+操作。比表格更适合移动端，每行信息层级要克制。',
          demo: 'list' },
        { id: 'progress', name: '进度条', en: 'Progress', aliases: ['进度环', '加载进度'],
          desc: '展示任务的完成比例：条形、环形、带百分比文字。用于已知时长的等待；未知时长用加载动画。',
          demo: 'progress', term: 'progress-bar' },
        { id: 'timeline', name: '时间线', en: 'Timeline', aliases: ['时间轴', '活动记录'],
          desc: '按时间顺序展示已发生的事件流：节点+时间+描述。与步骤条的区别：这里是历史记录，不是未来规划。',
          demo: 'timeline', term: 'timeline' },
        { id: 'tree', name: '树形控件', en: 'Tree View', aliases: ['目录树', '层级树'],
          desc: '展示有父子层级的数据：文件夹、组织架构、分类目录。可展开收起、可选中、可多选勾选。',
          demo: 'tree', term: 'tree-view' },
        { id: 'statistic', name: '数值统计', en: 'Statistic', aliases: ['指标卡', 'KPI 数字'],
          desc: '突出展示一个关键数字：大号数值+标题+环比变化。仪表盘的基本单元，变化方向用涨跌色。',
          demo: 'statistic' },
        { id: 'masonry', name: '瀑布流', en: 'Masonry / Waterfall', aliases: ['瀑布流布局', '卡片流'],
          desc: '列宽固定、卡片高度不定的多列布局，新卡片总是填进最短的列，图片高矮不一时也不会出现大片空洞。图片社区与电商推荐流的标配。',
          demo: 'masonry' }
      ]
    },
    {
      id: 'feedback', name: '反馈', en: 'Feedback',
      desc: '系统对用户操作做出的回应。反馈设计的好坏，直接决定用户慌不慌。',
      items: [
        { id: 'alert', name: '提示条', en: 'Alert / Banner', aliases: ['警告条', '信息条'],
          desc: '页面内就地的状态提示：成功绿、信息蓝、警告橙、危险红四色语义，可带图标与关闭按钮，不自动消失。',
          demo: 'alert', term: 'alert-banner' },
        { id: 'toast', name: '轻提示', en: 'Toast', aliases: ['Snackbar', '浮出提示'],
          desc: '屏幕角落短暂浮现、自动消失的轻量消息：保存成功、已复制。不打断操作；重要事件应该用通知或提示条。',
          demo: 'toast', term: 'toast' },
        { id: 'loading', name: '加载动画', en: 'Loading / Spinner', aliases: ['转圈', '加载中'],
          desc: '表示「正在干活」的旋转指示：整页居中、局部按钮内、区块内三种常见位置。配合文案让人知道在等什么。',
          demo: 'loading', term: 'spinner' },
        { id: 'skeleton', name: '骨架屏', en: 'Skeleton Screen', aliases: ['占位加载', '灰块'],
          desc: '数据到达前用灰色占位块预演页面结构，加载完成后原地替换，避免布局跳动。优于居中转圈的体验。',
          demo: 'skeleton', term: 'skeleton-screen' },
        { id: 'empty', name: '空状态', en: 'Empty State', aliases: ['无数据', '空页面'],
          desc: '没有数据时的正式页面：插画/图标+一句人话说明+可选行动按钮。纯白屏会让用户以为页面坏了。',
          demo: 'empty', term: 'empty-state' },
        { id: 'tooltip', name: '文字提示', en: 'Tooltip', aliases: ['悬浮提示', '气泡提示'],
          desc: '悬停/聚焦时浮现的小黑气泡，补充简短说明。内容要一句话以内；需要点击交互的应该用气泡卡片（Popover）。',
          demo: 'tooltip', term: 'tooltip' },
        { id: 'popover', name: '气泡卡片', en: 'Popover', aliases: ['弹出卡片', '气泡卡', '浮层卡'],
          desc: '点击触发、带小箭头指向触发器的卡片，里面能放按钮、链接等可操作内容。与文字提示的区别：Tooltip 悬停即现只放一句话，Popover 要点击且能交互。',
          demo: 'popover', term: 'popover' },
        { id: 'notification', name: '通知提醒', en: 'Notification', aliases: ['通知横幅', '消息通知'],
          desc: '从屏幕角落推入、要求用户看到的消息：标题、正文、关闭按钮，不操作就不消失（或停留较久）。与轻提示的分工：Toast 不打扰，通知必须被看到。',
          demo: 'notification', term: 'notification' },
        { id: 'result', name: '结果页', en: 'Result Page', aliases: ['成功页', '失败页', '404 页面'],
          desc: '整页呈现操作结果的页面：大图标 + 结果一句话 + 补充说明 + 行动按钮（返回首页、重试）。支付完成、提交成功、404 都属于这一族。',
          demo: 'result', term: 'result-page' }
      ]
    },
    {
      id: 'overlay', name: '浮层', en: 'Overlays',
      desc: '浮在页面之上、暂时接管注意力的层级。用得克制是体验，用得泛滥是灾难。',
      items: [
        { id: 'modal', name: '模态框', en: 'Modal / Dialog', aliases: ['弹窗', '对话框'],
          desc: '带遮罩、居中、强制用户先处理的浮层：确认危险操作、完成必填小流程。加遮罩不可透点，Esc/点遮罩可关闭。',
          demo: 'modal', term: 'modal' },
        { id: 'confirm-dialog', name: '确认框', en: 'Confirm Dialog', aliases: ['二次确认', '确认弹窗'],
          desc: '模态框的特例：标题问一句、正文讲后果、主按钮执行（危险时红色）、次按钮取消。删除等不可逆操作前必须出现。',
          demo: 'confirm', term: 'confirm-dialog' },
        { id: 'drawer', name: '抽屉', en: 'Drawer', aliases: ['侧滑面板', '滑出层'],
          desc: '从屏幕边缘（常为右侧）滑出的面板，适合承载「比弹窗重、比页面轻」的内容：详情、设置、表单。',
          demo: 'drawer', term: 'drawer' },
        { id: 'dropdown-menu', name: '下拉菜单', en: 'Dropdown Menu', aliases: ['下拉列表', '操作菜单'],
          desc: '点击触发器后向下展开的操作列表：用户菜单、更多操作。与下拉选择的区别：这是执行动作，不是选值。',
          demo: 'dropdown-menu', term: 'dropdown-menu' },
        { id: 'carousel', name: '轮播', en: 'Carousel', aliases: ['走马灯', '幻灯片'],
          desc: '横向循环切换的多张内容卡：首页 Banner、推荐位。自动播放要可在悬停时暂停，配指示点与切换箭头。',
          demo: 'carousel', term: 'carousel' },
        { id: 'bottom-sheet', name: '底部动作面板', en: 'Bottom Sheet / Action Sheet', aliases: ['底部弹层', '动作面板', '半屏弹窗'],
          desc: '从屏幕底部升起的面板：一列动作选项（取消惯例单独一行、加粗），或承载半屏内容。移动端用它替代桌面上的下拉菜单和右键菜单。',
          demo: 'bottom-sheet' },
        { id: 'command-palette', name: '命令面板', en: 'Command Palette', aliases: ['快捷指令面板', 'Spotlight', '全局搜索', '⌘K'],
          desc: 'Ctrl/⌘ + K 唤出的全局操作框：输入即过滤页面、动作与设置，方向键选择、回车执行。效率工具、文档站与新式后台的标配入口。',
          demo: 'command-palette' }
      ]
    },
    {
      id: 'media', name: '媒体', en: 'Media',
      desc: '图片、视频、图标等富媒体元素的呈现规范，占位与比例是关键细节。',
      items: [
        { id: 'image', name: '图片', en: 'Image / Figure', aliases: ['图片占位', '配图'],
          desc: '图片展示需约定宽高比（如 16:9）、圆角、加载失败兜底与 alt 描述文字；懒加载是标配。',
          demo: 'image' },
        { id: 'icons', name: '图标', en: 'Icons', aliases: ['图标库', '线性图标'],
          desc: '小尺寸矢量图形，统一线条粗细与圆角才有体系感。装饰性图标要 aria-hidden，功能图标必须配文字或标签。',
          demo: 'icons' },
        { id: 'video', name: '视频播放器', en: 'Video Player', aliases: ['播放器', '视频占位'],
          desc: '视频区域：播放按钮、进度条、时长、音量与全屏控制。封面图 + 大播放键是最常见的静止形态。',
          demo: 'video' },
        { id: 'upload', name: '文件上传', en: 'Upload', aliases: ['拖拽上传', '附件上传'],
          desc: '上传交互三件套：拖拽/点击选择区、已上传文件行（名称+大小+删除）、上传中进度。要约定格式与大小限制。',
          demo: 'upload' }
      ]
    }
  ];

  function countItems() {
    return W.STD_VISUAL_GROUPS.reduce(function (n, g) { return n + g.items.length; }, 0);
  }

  function groupOf(itemId) {
    for (var i = 0; i < W.STD_VISUAL_GROUPS.length; i++) {
      var g = W.STD_VISUAL_GROUPS[i];
      for (var j = 0; j < g.items.length; j++) {
        if (g.items[j].id === itemId) return { group: g, item: g.items[j] };
      }
    }
    return null;
  }

  W.STD_VISUAL_HELPERS = { countItems: countItems, groupOf: groupOf };
})(window);
