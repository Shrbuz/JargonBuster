#!/usr/bin/env node
/**
 * standard-term · 运行时冒烟测试
 * 用法：node tools/smoke.js
 * 在 Node 中模拟浏览器环境加载 全部数据 → 聚合层 → 搜索引擎 → 应用启动链路，
 * 覆盖：数据完整性、搜索、侧栏渲染、收藏页渲染（能抓住导出遗漏/运行时异常类 bug）。
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function makeEl(id) {
  return {
    id, _html: '',
    get innerHTML() { return this._html; },
    set innerHTML(v) { this._html = String(v); },
    textContent: '',
    value: '',
    dataset: {},
    style: {},
    classList: {
      _s: new Set(),
      add(c) { this._s.add(c); },
      remove(c) { this._s.delete(c); },
      toggle(c, f) { if (f === undefined) f = !this._s.has(c); f ? this._s.add(c) : this._s.delete(c); return f; },
      contains(c) { return this._s.has(c); }
    },
    attributes: {},
    setAttribute(k, v) { this.attributes[k] = String(v); },
    getAttribute(k) { return this.attributes[k] != null ? this.attributes[k] : null; },
    addEventListener() {}, removeEventListener() {},
    querySelector() { return null; },
    querySelectorAll() { return []; },
    closest() { return null; },
    appendChild() {}, remove() {},
    focus() {}, select() {}, blur() {}, scrollIntoView() {}
  };
}

const els = {};
const documentStub = {
  readyState: 'complete',
  documentElement: { setAttribute() {}, getAttribute() { return null; } },
  body: makeEl('body'),
  getElementById(id) { return els[id] || (els[id] = makeEl(id)); },
  createElement() { return makeEl('dyn'); },
  addEventListener() {},
  removeEventListener() {}
};

const W = {
  STD_TERMS: [], STD_CATEGORIES: null, STD_VISUALS: null, STD_ANIMS: null,
  location: { hash: '' },
  scrollTo() {},
  addEventListener() {},
  removeEventListener() {},
  matchMedia() { return { matches: false }; },
  navigator: {},
  localStorage: { _m: {}, getItem(k) { return this._m[k] != null ? this._m[k] : null; }, setItem(k, v) { this._m[k] = String(v); }, removeItem(k) { delete this._m[k]; } },
  document: documentStub
};

const LOAD_FAILS = [];
function load(rel) {
  const code = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  try {
    new Function('window', 'document', 'localStorage', 'navigator', code)(W, documentStub, W.localStorage, W.navigator);
  } catch (e) {
    LOAD_FAILS.push(rel + ' → ' + e.message);
  }
}

['assets/js/util.js', 'assets/js/store.js', 'assets/js/data/categories.js']
  .concat(fs.readdirSync(path.join(ROOT, 'assets/js/data'))
    .filter(f => /^terms\..+\.js$/.test(f)).sort()
    .map(f => 'assets/js/data/' + f))
  .concat(['assets/js/data/visual-elements.js', 'assets/js/visual-demos.js',
           'assets/js/data/ui-styles.js', 'assets/js/ui-style-demos.js', 'assets/js/data/ui-libs.js',
           'assets/js/visuals.js', 'assets/js/anims.js', 'assets/js/data.js', 'assets/js/search.js',
           'assets/js/components.js', 'assets/js/views.js', 'assets/js/router.js'])
  .forEach(load);

let failures = 0;
function assert(cond, msg) {
  if (cond) { console.log('  ok - ' + msg); }
  else { failures++; console.log('  FAIL - ' + msg); }
}

console.log('\nstandard-term 冒烟测试');
console.log('='.repeat(46));

assert(LOAD_FAILS.length === 0, '全部脚本加载无异常' + (LOAD_FAILS.length ? '（失败: ' + LOAD_FAILS.join('; ') + '）' : ''));

const D = W.STD_DATA;
assert(W.STD_CATEGORIES && W.STD_CATEGORIES.length === 10, '10 个分类已注册');
assert(D && D.terms.length >= 150, '词条数 >= 150（实际 ' + (D ? D.terms.length : 0) + '）');

if (D) {
  const stats = D.stats();
  assert(stats.svg > 0 && W.STD_VISUALS && Object.keys(W.STD_VISUALS).length >= stats.svg,
    'SVG 图解注册齐全（' + stats.svg + ' 处引用）');
  assert(stats.anim > 0 && W.STD_ANIMS && Object.keys(W.STD_ANIMS).length >= stats.anim,
    '动画注册齐全（' + stats.anim + ' 处引用）');

  assert(W.STD_SEARCH.search('闭包').some(r => r.term.id === 'closure'), '中文搜索「闭包」命中 closure');
  assert(W.STD_SEARCH.search('idempotency').length >= 1, '英文搜索 idempotency 有结果');
  assert(W.STD_SEARCH.search('缓存').length >= 5, '标签搜索「缓存」多词条命中');
  assert(W.STD_SEARCH.search('不存在的词xyzzy').length === 0, '无结果查询安全返回空');
  const hl = W.STD_SEARCH.highlight('闭包是作用域的产物', '闭包');
  assert(hl.includes('<mark>'), '高亮标记正常输出');

  const daily = D.dailyTerm();
  assert(daily && D.termMap.has(daily.id), '每日一词返回有效词条');
  const t = D.termMap.get('caching');
  if (t) {
    assert(D.relatedOf(t).every(r => D.termMap.has(r.id)), 'caching 的 related 全部可解析');
  }
  const nb = D.neighborsOf(D.termMap.get('api'));
  assert(nb.next && nb.next.cat === 'backend', '相邻词条计算正常');

  assert(['favicon', 'gradient', 'opacity', 'marquee'].every(id => D.termMap.has(id)), '新增 favicon/渐变/透明度/跑马灯 4 条词条已注册');
}

/* ---------- 前端可视化标准术语 ---------- */
console.log('  --- 前端元素图鉴 ---');
try {
  const VG = W.STD_VISUAL_GROUPS || [];
  const VD = W.STD_VISUAL_DEMOS || {};
  const allItems = VG.flatMap(g => g.items);
  assert(VG.length === 10, '图鉴分组 = 10（实际 ' + VG.length + '）');
  assert(['layout', 'effects', 'motion'].every(id => VG.some(g => g.id === id)), '新增布局/视觉技法/动效三组已注册');
  assert(allItems.length === 74, '图鉴元素 = 74（实际 ' + allItems.length + '）');
  const noDemo = allItems.filter(it => typeof VD[it.demo] !== 'function');
  assert(noDemo.length === 0, '每个元素都有呈现效果示例' + (noDemo.length ? '（缺失: ' + noDemo.map(i => i.id).join(',') + '）' : ''));
  const badItem = allItems.find(it => !it.name || !it.en || !it.desc || !it.id);
  assert(!badItem, '元素名称/英文/描述字段齐全');

  const idx = W.STD_VIEWS.visuals();
  assert(idx.html.includes('前端可视化标准术语'), '图鉴总览页可渲染');
  assert(idx.html.includes('视觉技法'), '总览页含视觉技法分组');
  const grp = W.STD_VIEWS.visualGroup('basics');
  assert(grp && (grp.html.match(/class="vs-item"/g) || []).length === 8, '分组页渲染 8 个基础元素区块');
  const layoutGrp = W.STD_VIEWS.visualGroup('layout');
  assert(layoutGrp && (layoutGrp.html.match(/class="vs-item"/g) || []).length === 5, '布局组渲染 5 个元素区块');
  assert(W.STD_VIEWS.visualGroup('nope') === null, '未知分组安全返回空');

  const vsHit = W.STD_SEARCH.searchVisuals('走马灯');
  assert(vsHit.length >= 1 && vsHit[0].item.id === 'carousel', '图鉴搜索「走马灯」命中轮播');
  assert(W.STD_SEARCH.searchVisuals('Toggle').some(r => r.item.id === 'switch'), '图鉴搜索英文别名 Toggle 命中开关');
  assert(W.STD_SEARCH.searchVisuals('毛玻璃').some(r => r.item.id === 'glassmorphism'), '图鉴搜索「毛玻璃」命中毛玻璃');
  assert(W.STD_SEARCH.searchVisuals('跑马灯')[0].item.id === 'marquee', '图鉴搜索「跑马灯」命中跑马灯（区别于轮播）');
  assert(W.STD_SEARCH.searchVisuals('羽化').some(r => r.item.id === 'gradient-overlay'), '图鉴搜索「羽化」命中渐变遮罩');
  assert(W.STD_SEARCH.searchVisuals('标签选择器').some(r => r.item.id === 'tag-input'), '图鉴搜索「标签选择器」命中标签输入框');
  const termBtn = W.STD_VIEWS.term('button');
  assert(termBtn && termBtn.html.includes('#/visuals/basics/button'), '词条详情页含图鉴反链');
  const termGrad = W.STD_VIEWS.term('gradient');
  assert(termGrad && termGrad.html.includes('#/visuals/effects/gradient'), '渐变词条含图鉴反链');
  const termChip = W.STD_VIEWS.term('tag-chip');
  assert(termChip && termChip.html.includes('#/visuals/form/tag-input'), 'tag-chip 词条含标签输入框反链');

  W.location.hash = '#/visuals/basics/button';
  const r = W.STD_ROUTER.parseHash();
  assert(r.name === 'visualGroup' && r.group === 'basics' && r.item === 'button', '图鉴三级路由解析正确');
} catch (e) {
  failures++;
  console.log('  FAIL - 图鉴检查异常: ' + e.message);
}

/* ---------- UI 风格图鉴 ---------- */
console.log('  --- UI 风格图鉴 ---');
try {
  const ST = W.STD_UI_STYLES || [];
  const SD = W.STD_STYLE_DEMOS || {};
  assert(ST.length === 18, '风格条目 = 18（实际 ' + ST.length + '）');
  assert(new Set(ST.map(s => s.id)).size === 18, '风格 id 全部唯一');
  const noStl = ST.filter(s => typeof SD[s.demo] !== 'function');
  assert(noStl.length === 0, '每个风格都有小样' + (noStl.length ? '（缺失: ' + noStl.map(s => s.demo).join(',') + '）' : ''));
  const badTalk = ST.filter(s => !s.aiTalk || !s.aiTalk.good || s.aiTalk.good.length < 2 || !s.aiTalk.bad || s.aiTalk.bad.length < 1);
  assert(badTalk.length === 0, '每个风格 aiTalk good>=2 / bad>=1' + (badTalk.length ? '（' + badTalk.map(s => s.id).join(',') + '）' : ''));
  const badField = ST.find(s => !s.name || !s.en || !s.era || !s.cssHint || !s.summary || !Array.isArray(s.features));
  assert(!badField, '风格名称/英文/年代/代码要点/简介/特征字段齐全');

  const sIdx = W.STD_VIEWS.styles();
  assert(sIdx.html.includes('UI 风格图鉴'), '风格列表页可渲染');
  assert((sIdx.html.match(/class="sty-card"/g) || []).length === 18, '风格列表页渲染 18 张卡片');
  const glass = W.STD_VIEWS.style('glassmorphism');
  assert(glass && glass.html.includes('stl-kit') && glass.html.includes('backdrop-filter'), '玻璃拟态详情页含小样与代码要点');
  assert(glass.html.includes('data-copy'), '风格详情页 AI 句式带复制按钮');
  assert(glass.html.includes('#/visuals/effects/glassmorphism'), '玻璃拟态详情含元素标本互链');
  assert(glass.html.includes('#/t/glassmorphism'), '玻璃拟态详情含词条互链');
  assert(glass.html.includes('#/styles/liquid-glass'), '玻璃拟态详情含相关风格互链');
  assert(W.STD_VIEWS.style('nope') === null, '未知风格安全返回空');

  const sHit = W.STD_SEARCH.searchStyles('毛玻璃');
  assert(sHit.length >= 1 && sHit[0].style.id === 'glassmorphism', '风格搜索「毛玻璃」命中玻璃拟态');
  assert(W.STD_SEARCH.searchStyles('Bento').some(r => r.style.id === 'bento-grid'), '风格搜索英文 Bento 命中 Bento Grid');
  assert(W.STD_SEARCH.searchStyles('酸性').some(r => r.style.id === 'acid-design'), '风格搜索「酸性」命中酸性设计');

  W.location.hash = '#/styles';
  assert(W.STD_ROUTER.parseHash().name === 'styleIndex', '风格列表路由解析正确');
  W.location.hash = '#/styles/glassmorphism';
  const sr = W.STD_ROUTER.parseHash();
  assert(sr.name === 'styleDetail' && sr.id === 'glassmorphism', '风格详情路由解析正确');
} catch (e) {
  failures++;
  console.log('  FAIL - 风格图鉴检查异常: ' + e.message);
}

/* ---------- UI 库图鉴 ---------- */
console.log('  --- UI 库图鉴 ---');
try {
  const LB = W.STD_UI_LIBS || [];
  const FACETS = W.STD_UI_LIB_FACETS || {};
  const FILTER = W.STD_UI_LIB_FILTER;
  assert(LB.length === 19, '库条目 = 19（实际 ' + LB.length + '）');
  assert(new Set(LB.map(l => l.id)).size === 19, '库 id 全部唯一');
  const styleIds = new Set((W.STD_UI_STYLES || []).map(s => s.id));
  const badRef = LB.filter(l => !styleIds.has(l.styleRef));
  assert(badRef.length === 0, '每个库 styleRef 都指向已有风格' + (badRef.length ? '（缺失: ' + badRef.map(l => l.id).join(',') + '）' : ''));
  const badTalk = LB.filter(l => !l.aiTalk || !l.aiTalk.good || l.aiTalk.good.length < 2 || !l.aiTalk.bad || l.aiTalk.bad.length < 1);
  assert(badTalk.length === 0, '每个库 aiTalk good>=2 / bad>=1' + (badTalk.length ? '（' + badTalk.map(l => l.id).join(',') + '）' : ''));
  const ECO_IDS = (FACETS.eco || []).map(f => f.id);
  const SCENE_IDS = (FACETS.scene || []).map(f => f.id);
  const badCat = LB.find(l => !l.name || !l.site || !l.summary || !l.scenario || !l.designLanguage ||
    !Array.isArray(l.tags) || !l.tags.length || !Array.isArray(l.ecosystems) || !l.ecosystems.length ||
    !l.cats || !Array.isArray(l.cats.eco) || !l.cats.eco.length || l.cats.eco.some(x => !ECO_IDS.includes(x)) ||
    !Array.isArray(l.cats.scene) || !l.cats.scene.length || l.cats.scene.some(x => !SCENE_IDS.includes(x)) ||
    !['free', 'freemium'].includes(l.pricing));
  assert(!badCat, '库名称/官网/简介/场景/设计语言/筛选桶/收费字段齐全合法' + (badCat ? '（' + badCat.id + '）' : ''));
  assert(FACETS.tags && FACETS.tags.length > 0, '标签维度已从数据自动聚合');

  assert(FILTER({ eco: ['headless'] }).length === 4, '筛选生态=无头 → 4 个无头库');
  assert(FILTER({ eco: ['vue'] }).every(l => l.cats.eco.includes('vue')), '筛选生态=Vue 全部含 Vue');
  assert(FILTER({ scene: ['data'], pricing: ['free'] }).map(l => l.id).join(',') === 'ant-design', '组合筛选 数据密集 × 免费 → 仅 Ant Design');
  assert(FILTER({ eco: ['react'], scene: ['infra'] }).length === 4, '组合筛选 React × 基础设施 → 4 个');
  assert(FILTER({ tags: ['大厂出品'] }).length === 3, '筛选标签=大厂出品 → 3 个');
  assert(FILTER({}).length === 19, '空筛选条件 → 全量 19 个');

  const lIdx = W.STD_VIEWS.libs();
  assert(lIdx.html.includes('UI 库图鉴'), '库列表页可渲染');
  assert((lIdx.html.match(/class="lib-card"/g) || []).length === 19, '库列表页渲染 19 张卡片');
  assert(lIdx.html.includes('data-lib-grid') && lIdx.html.includes('lib-filter'), '库列表页含筛选面板与结果容器');
  const shadcn = W.STD_VIEWS.lib('shadcn-ui');
  assert(shadcn && shadcn.html.includes('stl-kit'), 'shadcn 详情页含风格小样');
  assert(shadcn.html.includes('#/styles/minimalism'), 'shadcn 详情含风格详解互链');
  assert(shadcn.html.includes('data-copy'), '库详情页 AI 句式带复制按钮');
  assert(shadcn.html.includes('target="_blank"') && shadcn.html.includes('rel="noopener"'), '库详情官网外链新窗打开');
  const heroui = W.STD_VIEWS.lib('heroui');
  assert(heroui && heroui.html.includes('NextUI'), 'HeroUI 详情注明曾用名 NextUI');
  assert(W.STD_VIEWS.lib('nope') === null, '未知库安全返回空');

  /* 小样差异化：库名标题 + 品牌色 + 线框皮肤 */
  assert((lIdx.html.match(/stl--wireframe/g) || []).length === 5, '5 个无样式库使用线框皮肤');
  assert(lIdx.html.includes('--lib-accent') && lIdx.html.includes('stl-kit--lib'), '库小样注入品牌色令牌与库标题');
  assert(lIdx.html.split('stl--minimalism').length - 1 === 3, '极简皮肤仅 3 库（shadcn/Naive/Arco）');
  const chakra = W.STD_VIEWS.lib('chakra-ui');
  assert(chakra && chakra.html.includes('#/styles/claymorphism'), 'Chakra 详情链接黏土拟态风格详解');
  assert(W.STD_VIEWS.lib('arco-design').html.includes('#/styles/minimalism'), 'Arco 详情链接极简主义风格详解');
  const radix = W.STD_VIEWS.lib('radix-ui');
  assert(radix && radix.html.includes('线框示意'), '无头库详情页含线框说明文案');

  const lHit = W.STD_SEARCH.searchLibs('腾讯');
  assert(lHit.length >= 1 && lHit[0].lib.id === 'tdesign', '库搜索「腾讯」命中 TDesign');
  assert(W.STD_SEARCH.searchLibs('无头').some(r => r.lib.id === 'radix-ui'), '库搜索「无头」命中 Radix UI');
  assert(W.STD_SEARCH.searchLibs('NextUI').some(r => r.lib.id === 'heroui'), '库搜索曾用名 NextUI 命中 HeroUI');

  W.location.hash = '#/libs';
  assert(W.STD_ROUTER.parseHash().name === 'libIndex', '库列表路由解析正确');
  W.location.hash = '#/libs/shadcn-ui';
  const lr = W.STD_ROUTER.parseHash();
  assert(lr.name === 'libDetail' && lr.id === 'shadcn-ui', '库详情路由解析正确');
} catch (e) {
  failures++;
  console.log('  FAIL - 库图鉴检查异常: ' + e.message);
}

/* ---------- 应用启动链路（加载 main 并真实执行 boot） ---------- */
console.log('  --- 启动链路 ---');
try {
  load('assets/js/main.js'); // readyState=complete → 立即 boot，渲染首页与侧栏

  const sb = els.sidebar ? els.sidebar._html : '';
  assert(sb.includes('我的收藏'), '侧栏含「我的收藏」入口');
  assert(sb.includes('前端元素图鉴'), '侧栏含「前端元素图鉴」入口');
  assert(sb.includes('UI 风格图鉴'), '侧栏含「UI 风格图鉴」入口');
  assert(sb.includes('UI 库图鉴'), '侧栏含「UI 库图鉴」入口');
  assert(!sb.includes('可视化图鉴'), '旧名「可视化图鉴」已全部改名');
  assert(sb.includes('分类导航'), '侧栏分类导航正常渲染');
  assert(sb.includes('编程基础'), '侧栏含第一个分类');

  // 收藏页渲染
  W.location.hash = '#/favs';
  W.STD_ROUTER.refresh();
  const favHtml = els.view ? els.view._html : '';
  assert(favHtml.includes('我的收藏'), '#/favs 收藏视图可渲染');

  // 图鉴分组页直链（真实执行 mount：树绑定 / 直链滚动回退路径）
  W.location.hash = '#/visuals/basics/button';
  W.STD_ROUTER.refresh();
  assert((els.view._html || '').includes('vs-item'), '图鉴分组页直链渲染+挂载正常');

  // 风格图鉴直链（列表 / 详情 mount：复制按钮绑定路径）
  W.location.hash = '#/styles';
  W.STD_ROUTER.refresh();
  assert((els.view._html || '').includes('sty-card'), '风格列表页直链渲染正常');
  W.location.hash = '#/styles/glassmorphism';
  W.STD_ROUTER.refresh();
  assert((els.view._html || '').includes('stl-kit'), '风格详情页直链渲染+挂载正常');

  // 库图鉴直链（列表 / 详情 mount：筛选面板与复制按钮绑定路径）
  W.location.hash = '#/libs';
  W.STD_ROUTER.refresh();
  assert((els.view._html || '').includes('lib-card'), '库列表页直链渲染正常');
  W.location.hash = '#/libs/shadcn-ui';
  W.STD_ROUTER.refresh();
  assert((els.view._html || '').includes('stl-kit'), '库详情页直链渲染+挂载正常');

  // 搜索页图鉴与风格分区
  W.location.hash = '#/s/' + encodeURIComponent('走马灯');
  W.STD_ROUTER.refresh();
  assert((els.view._html || '').includes('vs-match'), '搜索页展示图鉴命中分区');
  W.location.hash = '#/s/' + encodeURIComponent('毛玻璃');
  W.STD_ROUTER.refresh();
  assert((els.view._html || '').includes('UI 风格图鉴'), '搜索页展示风格命中分区');
  W.location.hash = '#/s/' + encodeURIComponent('腾讯');
  W.STD_ROUTER.refresh();
  assert((els.view._html || '').includes('UI 库图鉴'), '搜索页展示库命中分区');

  // 首页恢复
  W.location.hash = '';
  W.STD_ROUTER.refresh();
  assert((els.view._html || '').includes('分类浏览'), '首页视图恢复正常');
  assert((els.view._html || '').includes('图鉴速查'), '首页含图鉴速查入口');
  assert((els.view._html || '').includes('UI 库图鉴'), '首页含库图鉴入口');
} catch (e) {
  failures++;
  console.log('  FAIL - 启动链路异常: ' + e.message);
}

console.log('');
if (failures || LOAD_FAILS.length) {
  console.log('结果：' + (failures + LOAD_FAILS.length) + ' 项失败');
  process.exit(1);
} else {
  console.log('结果：全部通过 ✓');
}
