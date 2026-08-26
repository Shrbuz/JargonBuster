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
  .concat(['assets/js/visuals.js', 'assets/js/anims.js', 'assets/js/data.js', 'assets/js/search.js',
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
}

/* ---------- 应用启动链路（加载 main 并真实执行 boot） ---------- */
console.log('  --- 启动链路 ---');
try {
  load('assets/js/main.js'); // readyState=complete → 立即 boot，渲染首页与侧栏

  const sb = els.sidebar ? els.sidebar._html : '';
  assert(sb.includes('我的收藏'), '侧栏含「我的收藏」入口');
  assert(sb.includes('分类导航'), '侧栏分类导航正常渲染');
  assert(sb.includes('编程基础'), '侧栏含第一个分类');

  // 收藏页渲染
  W.location.hash = '#/favs';
  W.STD_ROUTER.refresh();
  const favHtml = els.view ? els.view._html : '';
  assert(favHtml.includes('我的收藏'), '#/favs 收藏视图可渲染');

  // 首页恢复
  W.location.hash = '';
  W.STD_ROUTER.refresh();
  assert((els.view._html || '').includes('分类浏览'), '首页视图恢复正常');
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
