# 四站公共组件与样式维护

公共源在 fengshizupu-site。`public/assets/genealogy-theme.css` 管理四站基础风格及通用 UI；页面独有布局保留在对应模块。正文系统字体，标题宋体风格；电脑正文18px、手机16px，普通标题42/30px，二级标题27/22px。

`shared/python/family_ui.py` 为恩平、zp1、zp2 的工具栏、图片弹窗和浮动操作模板；`shared/python/collection_site.py` 为 zp1、zp2 共用的生成器，各站仅在 `data/site.json` 和 `data/books.json` 配置内容。共用阅读控制在 `public/assets/reader-controls.js`，图片对话框绑定在 `public/assets/site.js`。主站 React 组件使用相同 CSS，不引入 Python 运行依赖。

修改公共源后先验证并提交主站，再运行：

```sh
python3 scripts/sync-family.py /path/to/fengshizupu-site /path/to/enpingfengshi-site /path/to/fengshizupu-zp1 /path/to/fengshizupu-zp2
```

同步会复制文件并记录主站提交和 SHA-256；各站构建先执行 `python3 scripts/check_family.py`。不要在子站直接修改被清单记录的公共文件。各站部署本地副本，访客不跨域加载样式，构建不自动拉取浮动最新版。主站 CSS 使用内容哈希，三个生成站的主题和本地样式也使用内容哈希。

共享样式以2026-11-17主站 b1e73f9 的最新图片提示、图注和已有页面效果为基础。保留各站既有导航、购买/下载入口、搜索范围、姓名及世系数据、扫描顺序、原书页码和永久网址。原谱图片与PDF不重制。

验收：首页、族谱目录、书籍详情、文章、原书阅读、新谱姓名与编号搜索、人物/世系、单页/连看、跳页、弹窗及下载。手机390/320px与电脑1440px检查长标题换行、导航横向滚动、吸顶和页面溢出。
