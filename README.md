# 冯氏族谱

面向全国宗亲的静态数字族谱平台，主域 fengshizupu.com（GitHub Pages 部署，尚在完善中、未正式对外发布）。本站现行说明以本文件为准；`docs/` 内的文件是建站时期的历史文档（需求、架构、交付、审查记录），与现状多有出入，仅作存档参考。

## 技术与目录

- Next.js 静态导出（`out/`），数据全部存于 `data/*.json`，无数据库、无注册。
- `app/[[...path]]/page.tsx` 是全站唯一路由分发；各栏目页面在 `components/sections/`（Home / About / Regions / Village / Person / Archives / Originals），通用组件在 `components/`，数据访问层是 `lib/data.ts`。
- 原图（不可变）：`public/archives/<档案号>/originals/`；图式页与整本 PDF：同档案目录下 `typeset/` 与 `book.pdf`（生成物，随仓库提交）；派生图 `derived/` 与 `data/search-index.json` 为构建时生成，不入库（见 .gitignore）。

## 本地运行与发布

需要 Node.js 24、Python 3.12+（另需 poppler 的 pdftoppm）。

```sh
npm ci
python -m pip install -r requirements.txt
npm run assets   # 生成派生图（并校验原图 SHA256）
npm test         # 数据测试
npm run build    # 校验数据 → 生成搜索索引 → 构建 → 检查全部内链与永久网址
npm run typecheck
```

GitHub Actions 在 main 推送后按 assets → test → build → typecheck → 浏览器双视口测试的顺序校验，通过后部署 GitHub Pages；PR 只构建不部署。

## 数据与编号

- 唯一数据源是 `data/*.json`。ID 为永久编号，只能分配从未使用过的号码、不得重用：人物 `p`＋六位、谱页 `pg`＋六位、档案 `a`、村庄 `v`、地区 `r`；档案/村庄/地区现行号段从 100 起（下一档案 a000101、下一村庄 v000102、下一地区 r000105）。
- 原图内容由 `data/archive_pages.json` 的 SHA256 锁定：构建时校验哈希，任何改动都会让构建失败；不得覆盖、改名、删除原图（确需迁移目录时，须同步修改 imagePath 并复验哈希）。
- 人物须有 person_sources 出处；关系须有 evidencePageIds。核实状态只存数据层（revisions.json），页面不显示状态字样。
- 永久网址清单在 `data/permanent-urls.json`，构建时逐条核查存在性；网址结构不得随意重构。

## 图式页与整本 PDF 再生成

数据变更后，在仓库根目录运行（产物写回 public/，随代码一并提交）：

```sh
python scripts/build-typeset.py   # 单页图式页 PDF/JPG（typeset/）
python scripts/build-book.py      # 整本 PDF（book.pdf；图表与上共用 draw_chart）
```

字体为 `scripts/fonts/` 的 Noto Serif SC 子集；若新数据或文案出现子集之外的汉字，先用完整字体按「两脚本＋全部 data」的字符并集重做子集（fonttools 的 pyftsubset），否则 PDF 会缺字。

## 原谱档案（/originals）

原图查看栏目名为「原谱档案」，地址 `/originals/`（两级：先列档案，点入档案后才显示原图，如 `/originals/a000100/`）。族谱档案目录页的图片网格下方有指向它的链接；除此之外不在导航出现。noindex、robots 禁抓、不进 sitemap。

## 当前状态（2026-11-12）

- 人物 1132 位（姓名已经持有人对照原图核实，状态 verified），父子关系 1094 条为转写草稿待核，266 处存疑保留在人物备注。
- 村庄：小湴村 v000100、平乐村 v000101（同属良西镇雁鹅村委会）；地区链 r000100–r000104（广东省 / 江门市 / 恩平市 / 良西镇 / 雁鹅村委会）；档案 a000100「小湴村凝斋房」27 页。
- 公开栏目：首页、查姓名、地区目录、族谱档案（图式页，可下载单页或整版 PDF）、关于。
- 站主决定：网站正式上线前不保留修改记录（revisions.json 属数据层核实记录，不在此列）。

## 故障排查

- 构建提示 original modified：停止发布，对照原上传记录恢复真实原件，不能改哈希掩盖损坏。
- 深链接 404：必须部署 out/，确认尾斜杠及对应目录 index.html 存在。
- Actions 部署失败：查看 Pages 设置与 pages/write 权限；构建成功不等于部署成功。
