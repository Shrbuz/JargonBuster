#!/usr/bin/env node
/**
 * standard-term · 数据完整性校验
 * 用法：node tools/validate.js
 * 退出码：0 通过 / 1 存在问题
 * 在无构建环境中直接运行 Node 即可（无需安装依赖）。
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'assets', 'js', 'data');

function loadFile(relPath, fakeWindow) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) {
    return false;
  }
  const code = fs.readFileSync(abs, 'utf8');
  // eslint-disable-next-line no-new-func
  new Function('window', 'localStorage', 'document', code)(fakeWindow, {}, {});
  return true;
}

const problems = [];
const warns = [];
function err(msg) { problems.push(msg); }
function warn(msg) { warns.push(msg); }

/* ---------- 加载数据 ---------- */

const W = { STD_TERMS: [], STD_CATEGORIES: null, STD_VISUALS: null, STD_ANIMS: null };

if (!loadFile('assets/js/data/categories.js', W)) err('categories.js 缺失或语法错误');
loadFile('assets/js/visuals.js', W);
loadFile('assets/js/anims.js', W);

const termFiles = fs.readdirSync(DATA_DIR)
  .filter(f => /^terms\..+\.js$/.test(f))
  .sort();
termFiles.forEach(f => loadFile('assets/js/data/' + f, W));

/* ---------- 分类检查 ---------- */

const cats = Array.isArray(W.STD_CATEGORIES) ? W.STD_CATEGORIES : [];
if (!cats.length) err('STD_CATEGORIES 为空');
const catIds = new Set();
cats.forEach(c => {
  ['id', 'name', 'en', 'desc', 'icon', 'color'].forEach(k => {
    if (!c[k]) err('分类缺少字段 ' + k + ': ' + JSON.stringify(c.id || c));
  });
  if (catIds.has(c.id)) err('分类 ID 重复: ' + c.id);
  catIds.add(c.id);
});

/* ---------- 词条检查 ---------- */

const terms = W.STD_TERMS || [];
const ids = new Set();
const VALID_LEVEL = new Set(['core', 'common', 'advanced']);
const CAT_COUNT = {};

if (!terms.length) err('没有任何词条被加载');

terms.forEach((t, i) => {
  const label = '[' + (t && t.id ? t.id : '#' + i) + ']';

  if (!t.id) err(label + ' 缺少 id');
  else if (ids.has(t.id)) err(label + ' ID 重复');
  ids.add(t.id);

  ['en', 'zh'].forEach(k => { if (!t[k]) err(label + ' 缺少 ' + k); });
  if (!t.summary) err(label + ' 缺少 summary');
  else if (t.summary.length > 45) warn(label + ' summary 偏长（' + t.summary.length + ' 字），建议 ≤40');

  if (!catIds.has(t.cat)) err(label + ' 分类不存在或未定义: ' + t.cat);
  CAT_COUNT[t.cat] = (CAT_COUNT[t.cat] || 0) + 1;

  if (!VALID_LEVEL.has(t.level)) err(label + ' level 非法: ' + t.level + '（应为 core/common/advanced）');

  if (!Array.isArray(t.tags) || t.tags.length < 1) err(label + ' tags 至少 1 个');
  else if (t.tags.length > 4) warn(label + ' tags 超过 4 个');

  if (!Array.isArray(t.plain) || t.plain.length < 2) err(label + ' plain 应为至少 2 段的数组');
  else {
    const len = t.plain.join('').length;
    if (len < 120) warn(label + ' plain 内容偏短（' + len + ' 字），建议 200~350');
    if (len > 600) warn(label + ' plain 内容偏长（' + len + ' 字），建议 200~350');
  }

  if (!t.analogy) err(label + ' 缺少 analogy（生活类比）');

  if (!t.talk || !Array.isArray(t.talk.good) || !t.talk.good.length) err(label + ' talk.good 至少 1 条');
  if (!t.talk || !Array.isArray(t.talk.bad) || !t.talk.bad.length ||
      typeof t.talk.bad[0].say !== 'string') err(label + ' talk.bad 至少 1 条且含 say/why');

  if (!Array.isArray(t.misconceptions) || t.misconceptions.length < 1) err(label + ' misconceptions 至少 1 条');

  if (!Array.isArray(t.related) || t.related.length === 0) {
    warn(label + ' 未设置 related 相关词条');
  } else {
    t.related.forEach(r => {
      if (!ids.has(r) && r !== t.id) {
        // 引用可能来自其他文件（已全部加载后再复查一遍在下方统一做）
      }
    });
  }

  if ('visual' in t && t.visual) {
    const v = t.visual;
    if (!['svg', 'anim', 'img'].includes(v.kind)) {
      err(label + ' visual.kind 非法: ' + v.kind);
    } else if (v.kind === 'svg') {
      if (!v.id || !W.STD_VISUALS || !W.STD_VISUALS[v.id]) {
        err(label + ' SVG 图解未注册: ' + v.id + '（需加入 assets/js/visuals.js）');
      }
    } else if (v.kind === 'anim') {
      if (!v.id || !W.STD_ANIMS || !W.STD_ANIMS[v.id]) {
        err(label + ' 动画未注册: ' + v.id + '（需加入 assets/js/anims.js）');
      }
    } else if (v.kind === 'img') {
      if (!v.pending && !v.src) err(label + ' img 图示需要 src 或声明 pending:true');
    }
  }

  // 禁用模式检查：反引号 / Markdown 粗体 / emoji 粗查
  const textBlob = JSON.stringify([t.summary, t.plain, t.analogy, t.talk, t.misconceptions] || '');
  if (textBlob.includes('`')) err(label + ' 文本中含反引号，违反内容规范');
  if (/\*\*/.test(textBlob)) warn(label + ' 文本疑似含 Markdown 粗体符号 **');
  if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(textBlob)) warn(label + ' 文本疑似含 emoji');
});

// related 二次复查（所有文件加载完毕后）
terms.forEach(t => {
  (t.related || []).forEach(r => {
    if (!ids.has(r)) err('[' + t.id + '] related 指向不存在的词条: ' + r);
  });
  if ((t.related || []).includes(t.id)) err('[' + t.id + '] related 包含自身');
});

/* ---------- 输出 ---------- */

console.log('');
console.log('standard-term 数据校验');
console.log('='.repeat(46));
console.log('分类数: ' + cats.length + '   词条总数: ' + terms.length);
cats.forEach(c => {
  console.log('  ' + String(CAT_COUNT[c.id] || 0).padStart(3) + '  ' + c.name + ' (' + c.id + ')');
});
const orphan = Object.keys(CAT_COUNT).filter(k => !catIds.has(k));
orphan.forEach(k => err('存在未知分类的词条: cat=' + k));

if (warns.length) {
  console.log('\n警告 ' + warns.length + ' 条：');
  warns.forEach(w => console.log('  ~ ' + w));
}

if (problems.length) {
  console.log('\n错误 ' + problems.length + ' 条：');
  problems.forEach(p => console.log('  x ' + p));
  console.log('\n结果：未通过');
  process.exit(1);
} else {
  console.log('\n结果：全部通过 ✓');
  process.exit(0);
}
