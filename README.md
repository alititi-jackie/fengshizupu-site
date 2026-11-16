# 冯氏族谱

主站 [fengshizupu.com](https://fengshizupu.com/) 汇集各地冯氏族谱入口、宗亲资讯和寻根指南，由 GitHub Pages 部署。恩平族谱由 [恩平站](https://enping.fengshizupu.com/) 提供正式查阅入口。主站保留族谱导航与已发布的资讯兼容网址。本站现行说明以本文件为准，`docs/` 中的建站资料供历史参考。

## 地区族谱、资讯与搜索

1. 新增地方站时，在 `lib/places.ts` 的 `genealogySites` 登记地区标识 `slug`、名称、网站网址和搜索配置 `search`。地区标识与子域名一致，例如 `enping.fengshizupu.com` 使用 `enping`。搜索配置包括可用 GET 打开的搜索地址 `url`、关键词参数 `param` 和输入提示 `hint`。恩平站参数为 `q`。
2. 族谱总页 `/archives/` 和地区资讯栏目 `/news/<slug>/` 读取同一份地区配置。需要突出显示某一册族谱时，在 `genealogyCollections` 加卡片并直接链接到地方站。文章在 `lib/feng-news.ts` 或 `lib/news.ts` 中登记，`category` 与地区标识相同，网址为 `/news/<地区>/<文章标识>/`。跨地区的通用文章使用 `general`。
3. 主站首页保留恩平搜索。资讯总页和地区列表页不放搜索框，通用文章也不放。只有地区文章显示对应地方站的搜索框，带关键词在新窗口打开。文章里提到本地村庄或族谱时，链接直接指向地方站对应页面。主站的外部网页链接统一通过 `components/SiteLink.tsx` 在新窗口打开，地方子域名也属于外部站点。
4. 发布前验证地方站搜索参数可正常返回结果，并核对地区目录、文章链接和网站地图。

## 站点结构

- `app/page.tsx` 是全国入口，`app/archives/` 是各地族谱导航，`app/news/` 按地区组织资讯，`app/about/` 说明站点用途和更正方式。
- 小湴村凝斋房 2026 版使用[恩平站正式地址](https://enping.fengshizupu.com/editions/v000100/2026/a000100/)。主站「族谱」页保留查阅卡片，原谱照片、数字化资料、人物搜索和 PDF 均由恩平站发布。
- 主站保留 `/enping-fengshi-juanshou/` 的 1995 年重修版卷首影印。其 PDF 是构建页图的来源。
- 保留已发布的旧资讯入口。对应关系集中维护在 `lib/news.ts` 的 `legacyNews`，站点地图只列正式栏目和当前文章网址。
- `docs/` 保存建站早期文档。小湴村档案迁移前的主站记录可从提交 `10aa12055dddd0442df607fb319de2958b9a1f51` 回查。

## 本地运行与发布

需要 Node.js 24 和 Python 3.12+。

```sh
npm ci
python -m pip install -r requirements.txt
npm run assets
npm run build
npm run typecheck
```

GitHub Actions 生成卷首页图、静态导出并检查站内链接，再验证桌面和手机的关键浏览流程。主分支验证通过后部署到 GitHub Pages。

## 主站与地区站统一样式

主站的 `public/assets/genealogy-theme.css` 是共享样式源文件。修改后把同一份文件复制到恩平站 `assets/genealogy-theme.css`，两站分别构建与发布，并核对两份文件的 SHA-256 一致。页面按文件内容生成样式版本号。颜色、字体、公共容器、搜索控件、阅读工具栏和页脚的改动集中放在此文件，各站的搜索范围与阅读逻辑继续由各自代码维护。

新增任何地区站点时，以主站的页面样式为准，接入同版本的共享 CSS。站名、栏目和查谱功能按当地资料配置。Logo 区、导航、容器、字体字号、颜色、搜索框及聚焦反馈、卡片、阅读工具栏和页脚沿用主站的样式。地区站在构建时携带相同的 CSS 文件，无需访客浏览器跨站加载。发布前用手机和电脑宽度对照主站，检查首页、档案和阅读页的对齐及交互。
