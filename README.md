# 冯氏族谱

面向全国宗亲的静态数字族谱平台，主域 fengshizupu.com。先读 docs/ 中三份开发基准文档。

## 本地运行与发布

需要 Node.js 24、Python 3.12+。

```sh
npm ci
python -m pip install -r requirements.txt
npm run assets
npm run build
npm run typecheck
npm test
npm run dev
```

`out/` 是静态输出。GitHub Actions 在 main 推送后校验、生成派生图片/PDF、构建并部署；PR 只构建。仓库 Settings → Pages 的 Source 应为 GitHub Actions。不要上传整个源码仓库作为站点。

CNAME 已声明 fengshizupu.com，canonical 固定此域名。DNS 尚未改动；需域名所有者授权后按 GitHub Pages 当前说明配置。域名未接通时，不可宣称正式域名上线。`.cn` 的301须在外部域名/托管层另行配置，不能靠 CNAME 文件实现。

## 资料录入与永久网址

JSON 是唯一源数据；`lib/data.ts` 是页面的数据访问层。`data/search-index.json` 可由脚本重建。新增地区/村庄/档案/人物必须分配从未使用过的永久ID，不能用姓名或地名作主键。路径遵守 docs/URL_POLICY_AND_WORK_ORDER.md。扩充数据不需重构路由。

原件位于 public/archives/a000001/originals/，绝不能覆盖、重命名、删除。data/archive_pages.json 保存 SHA256、尺寸、上传序号、独立印刷页码、旋转方向。旋转仅作用于 derived/；PDF 是27张已收录影像汇编，不代表原书全册已齐。

新人物须有 person_sources；关系须有 evidencePageIds，AI转写只能标 ai_draft/needs_review，只有人工审核后才可标 verified。未知世代、地址、支系留空。同名跨页不能自动合并；合并需保留旧URL兼容页并维护 redirects.json 和 permanent-urls.json。当前尚无迁移记录，未来迁移须实现兼容页面后才允许删除实体。

待核对任务见 docs/REVIEW_QUEUE.csv；审核记录写入 revisions.json，保存审核人、日期与证据。机器可读 JSON 可直接导入/导出；CSV 导出用 `node scripts/export-review.mjs`。GEDCOM转换与自动导入流程属于后续工作，不能丢失原始字段。

## 核实状态

当前1132条人物记录、1094条关系全部是AI草稿，0条人工核实；跨页重复姓名分开记录，数量不是独立宗亲人数。27页已全部完成全页转写（姓名、世代、排行、配偶姓氏/全名、父子连线、女儿、○记号均已录入，存疑处均在人物备注中标注，共266处存疑待人工处理）。无姓名坐标，不显示虚构定位框。村庄据谱页页眉暂录为良西镇小滘村，另据第13、14页页眉增录平乐村，行政归属待确认，不创建虚假的省市SEO页。待核实人物页 noindex。

## 故障排查

- 构建提示 original modified：停止发布，对照原上传记录恢复真实原件，不能改哈希掩盖损坏。
- 缺少 derived/PDF：先运行 npm run assets。
- 深链接404：必须部署 out/，确认尾斜杠及对应目录 index.html 存在。
- Actions 部署失败：查看 Pages 设置、Environment 审批与 pages/write 权限；构建成功不等于部署成功。
- 国内访问：尚未在中国内地实测，不保证连接稳定。

公开JSON和原图都可下载，没有静态网站访问控制。敏感在世资料必须另行设计服务端授权，不可只隐藏按钮。
