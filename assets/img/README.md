# assets/img · 词条图片目录

需要外部位图的词条，在数据文件中先声明占位：

```js
visual: { kind: 'img', pending: true }
```

图片就绪后放入本目录（建议 WebP/PNG，宽度 ≥1200px，深浅主题下都可读），
再把占位改为：

```js
visual: {
  kind: 'img',
  src: 'assets/img/your-image.webp',
  credit: '作者或来源',
  caption: '一句话图注'
}
```

校验：node tools/validate.js 会检查 src 是否填写、pending 声明是否合法。
