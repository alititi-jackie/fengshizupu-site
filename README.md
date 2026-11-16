# 冯氏族谱

主站 [fengshizupu.com](https://fengshizupu.com/) 汇集各地冯氏族谱入口、宗亲资讯和寻根指南，由 GitHub Pages 部署。恩平族谱由 [恩平站](https://enping.fengshizupu.com/) 提供正式查阅入口。主站保留既有档案和永久网址。本站现行说明以本文件为准，`docs/` 中的建站资料供历史参考。

## 地区族谱、资讯与搜索

1. 新增地方站时，在 `lib/places.ts` 的 `genealogySites` 登记地区标识 `slug`、名称、网站网址和搜索配置 `search`。地区标识与子域名一致，例如 `enping.fengshizupu.com` 使用 `enping`。搜索配置包括可用 GET 打开的搜索地址 `url`、关键词参数 `param` 和输入提示 `hint`。恩平站参数为 `q`。
2. 族谱总页 `/archives/` 和地区资讯栏目 `/news/<slug>/` 读取同一份地区配置。文章在 `lib/feng-news.ts` 或 `lib/news.ts` 中登记，`category` 与地区标识相同，网址为 `/news/<地区>/<文章标识>/`。跨地区的通用文章使用 `general`。
3. 主站首页保留恩平搜索。资讯总页和地区列表页不放搜索框，通用文章也不放。只有地区文章显示对应地方站的搜索框，带关键词在新窗口打开。文章里提到本地村庄或族谱时，链接直接指向地方站对应页面。
4. 发布前验证地方站搜索参数可正常返回结果，并核对地区目录、文章链接和网站地图。

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

## 主站保留的档案数据

- 人物、父子关系、转写出处和核实状态以仓库中的 JSON 记录为准。
- 村庄：小湴村 v000100、平乐村 v000101（同属良西镇雁鹅村委会）；地区链 r000100–r000104（广东省 / 江门市 / 恩平市 / 良西镇 / 雁鹅村委会）；档案 a000100「小湴村凝斋房」27 页。
- 顶部导航为首页、资讯、族谱、关于。原姓名搜索、地区目录和档案链接仍可直接访问。
- 小湴村凝斋房 2026 版及其修改记录可在恩平站查阅。

## 故障排查

- 构建提示 original modified：停止发布，对照原上传记录恢复真实原件，不能改哈希掩盖损坏。
- 深链接 404：必须部署 out/，确认尾斜杠及对应目录 index.html 存在。
- Actions 部署失败：查看 Pages 设置与 pages/write 权限；构建成功不等于部署成功。
