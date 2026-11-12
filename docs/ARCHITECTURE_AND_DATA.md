# 技术架构、数据规范与扩展原则

## 技术选择
首期采用 Next.js + TypeScript + 静态导出（output: 'export'）+ GitHub Pages；优先保持零运行时后端、零注册、零数据库。动态段必须通过 generateStaticParams 在构建期生成，页面与资源路径应适配 GitHub Pages 的刷新/尾斜杠规则。域名为根域名时不设置仓库名basePath。前端搜索使用构建期生成的索引；数据量增大后更换检索实现而不更换公开URL。

## 建议结构
app/{page.tsx,regions/,search/,villages/[id]/,persons/[id]/,archives/,archives/[id]/,archives/[id]/pages/[pageId]/,about/}
components/{SearchBox,FamilyTree,ArchiveViewer,RegionSelector,Breadcrumbs}
data/{regions,villages,lineages,archives,persons,relationships}
public/archives/a000001/originals/
scripts/{validate-data,build-search-index,check-links,build-pdf}
docs/; .github/workflows/

## 数据实体
- regions: id, parentId, type, name, aliases, historicalNames, optional adminCode。
- villages: id, currentRegionId, name, aliases, historicalRegions, description, status。
- lineages: id, name, founderPersonIds, linkedVillageIds, generationRules, notes。
- archives: id, title, source, compilationDate, version, lineageIds, villageIds, rights, status。
- archive_pages: id, archiveId, imagePath, sequence, printedPageLabel, width, height, verification。
- persons: id, originalName, normalizedName, aliases, generationNumber?, lineageId?, branchIds, lifeDates?, verification, notes。
- relationships: id, fromPersonId, toPersonId, type (parent_child/spouse/adoption/other), evidencePageIds, verification, notes。
- person_sources: personId, archivePageId, regionBox? (归一化0-1坐标), transcription, verification。
- branches: id, lineageId, name, parentBranchId?, founderPersonId?。
- revisions: entityType, entityId, changeSummary, reviewer, timestamp, evidence。

所有ID永久、全站唯一、不可重复使用；未知字段留空。姓名不是主键。一个人可有多个来源、一个档案可关联多个村、一个村可有多册谱；同名跨谱不自动合并。允许过继、继配、不同版本冲突；原始记录和校订结果分离。原始图片为不可变史料，派生文件可重建。

## 录入与审核
先建立图片清单（路径、SHA256、尺寸、页序、原印页码、清晰度），人工确认跨页顺序；逐页转写并记录姓名和关系，附页码与可选坐标；标记 untranscribed / ai_draft / needs_review / verified；仅verified表示人工核实。建立审核清单，未确认内容可展示为待核实但不得虚构关系。导入/导出JSON和CSV，预留GEDCOM转换（扩展字段不能丢失）。

## 自动校验
- ID唯一、引用存在、页序唯一、图片路径存在。
- 父子关系无循环、人物不能成为自己的父母或配偶；可疑世代跨度报警但不自动判错。
- 每个人物和关系应有来源或明确标记未核实。
- 搜索索引可再生成，不作为唯一数据源。
- 每次构建生成站点地图和页面；检查旧链接清单，避免误删。

## 长期迁移
页面通过统一数据访问接口读取数据；第一期从本地JSON读取，未来可切换Postgres/Supabase或其他API。对外URL和ID不随存储方式改变。静态托管无服务器权限系统；将来有在世族人敏感信息时必须设计服务端访问控制和存储隔离。
