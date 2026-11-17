#!/usr/bin/env python3
"""Generate the zp1 static site (各地冯氏族谱收藏) into ./site.

Chrome (header/nav/footer) mirrors fengshizupu.com; styles come from the
shared assets/genealogy-theme.css (source of truth: main site repo
public/assets/genealogy-theme.css) plus assets/style.css carried over from
the Enping site. The reader reuses the Enping continuous-scroll reader
(reader-controls.js + volume-reader.js).
"""
import json, os, shutil, sys
from family_ui import FAB, FAB_SCRIPT, reader_toolbar, image_dialog, asset_version

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "site")
CONFIG = json.load(open(os.path.join(ROOT, 'data', 'site.json'), encoding='utf-8'))
DOMAIN = CONFIG['domain']
MAIN = 'https://fengshizupu.com'
THEME_V = asset_version(ROOT, 'genealogy-theme.css')


def head(title, desc, extra_css="", path="/"):
    og_url = DOMAIN + path
    og_img = DOMAIN + "/assets/share-logo.png"
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta property="og:type" content="website">
<meta property="og:locale" content="zh_CN">
<meta property="og:site_name" content="冯氏族谱">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{og_url}">
<meta property="og:image" content="{og_img}">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="512">
<meta property="og:image:height" content="512">
<meta property="og:image:alt" content="冯氏族谱「冯」字标志">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{desc}">
<meta name="twitter:image" content="{og_img}">
<link rel="icon" href="/icon.svg">
<link rel="stylesheet" href="/assets/style.css?v={asset_version(ROOT, 'style.css')}">
{extra_css}<link rel="stylesheet" href="/assets/genealogy-theme.css?v={THEME_V}">
</head>
<body class="site-theme">
"""


def header(active="archives"):
    on_home = ' class="on" aria-current="page"' if active == "home" else ""
    on_arch = ' class="on" aria-current="page"' if active == "archives" else ""
    return f"""<header class="site-header"><a class="brand" href="/"><img src="/icon.svg" alt="" width="46" height="46"><span>冯氏族谱<small>fengshizupu.com</small></span></a></header>
<nav class="mainnav" aria-label="主导航"><div class="mainnav-in"><a href="{MAIN}/"{on_home}>首页</a><a href="{MAIN}/news/">资讯</a><a href="{MAIN}/archives/"{on_arch}>族谱</a><a href="{MAIN}/about/">关于</a><span class="share-wrap"><button type="button" class="share-text" onclick="sharePage()">分享</button></span></div></nav>
"""


# 首页书卡下方只保留恩平全书卡（2026-11-17 用户定：冯氏资讯、各地族谱、冯氏宗亲网站、卷首影印卡四块删除）
MAIN_SECTIONS = """
<a class="enping-card" href="https://enping.fengshizupu.com"><span class="enping-seal">冯</span><span class="enping-body"><span class="enping-title">《恩平冯氏族谱》全书在线查阅</span><span class="enping-motto">寻根溯源 · 世系传承</span><span class="enping-intro">恩平冯氏总谱全书 1,269 页逐页看图，可按房支、村庄查找<span class="enping-more">　去看全书 ›</span></span></span><span class="enping-btn">看全书</span></a>
"""

def pager(top=False):
    links = CONFIG['pagination']
    previous = f'<a href="{links["previous"]}">‹ 上一页</a>' if links.get('previous') else ''
    following = f'<a href="{links["next"]}">下一页 ›</a>' if links.get('next') else ''
    cls = ' archives-pager-top' if top else ''
    return f'<nav class="archives-pager{cls}" aria-label="分页">{previous}<span>第 {links["page"]} 页 / 共 {links["total"]} 页</span>{following}</nav>'

PAGER_TOP = pager(True)
PAGER_BOTTOM = pager()


def footer():
    return f"""<footer class="site-footer"><a href="{MAIN}/contribute/">宗亲投稿 · 宗亲共建</a><br>
冯氏族谱 · 留存原谱，连接宗亲<br>
全国数字族谱平台 · <a href="{MAIN}/">fengshizupu.com</a> · <a href="{MAIN}/about/">关于本站</a></footer>
</body>
</html>
"""


def book_total_pages(book):
    return sum(v["pages"] for v in book["volumes"])


def index_page(books):
    # Shared theme and template; only book data and site configuration differ.
    cards = ""
    for b in books:
        q = f'{b["title"]} {b["keywords"]}'
        intro = f'{b["place"]} · {len(b["volumes"])} 册 · {book_total_pages(b)} 页，逐页在线连读'
        cards += (f'<a class="enping-card" href="/book/{b["slug"]}.html" data-q="{q}">'
                  f'<span class="enping-seal">冯</span><span class="enping-body">'
                  f'<span class="enping-title">《{b["title"]}》</span>'
                  f'<span class="enping-motto">{b["era"]}</span>'
                  f'<span class="enping-intro">{intro}<span class="enping-more">　在线阅读 ›</span></span></span>'
                  f'<span class="enping-btn">看全书</span></a>\n')
    sections = f'<div class="book-cards">\n{cards}</div>\n'
    total_books = len(books)
    total_pages = sum(book_total_pages(b) for b in books)
    return head("各地冯氏族谱收藏 · 冯氏族谱",
                "各地冯氏族谱收藏：收录图书馆藏本冯氏宗谱影印，逐页在线连读。",
) + header("home") + f"""<main>
<section class="hero"><p class="eyebrow">全国冯氏宗亲 · 数字族谱档案</p>
<h1>寻根有据，世系有源。</h1>
<p>从一页家谱，读懂一家人的来处。留存珍贵原谱，让宗亲记忆代代相传。</p>
<div class="regional-search"><form class="hero-search" onsubmit="return false"><input id="bookSearch" type="text" placeholder="输入地名或书名，如：乐清、湘潭、宗谱" aria-label="搜索本站收录的谱书"><button type="submit">搜索</button></form><small>输入地名或书名，筛选本站收录的谱书（目前收录 {total_books} 部、{total_pages} 页，陆续增补）。</small></div>
<p class="note" id="bookStatus"></p>
</section>
""" + PAGER_TOP + f"""{sections}""" + MAIN_SECTIONS + PAGER_BOTTOM + f"""
</main>
{FAB}
<script src="/assets/site.js?v=2"></script>
<script>filterList('bookSearch', 'bookStatus', '.book-cards .enping-card', '部');</script>
""" + FAB_SCRIPT + footer()


DL_BASE = CONFIG['downloads']


def book_page(b):
    rows = ""
    for v in b["volumes"]:
        rows += (f'<a href="/read/{b["slug"]}-{v["id"]}.html"><span>{v["name"]}</span>'
                 f'<span class="pg">{v["pages"]} 页 · 打开阅读 ›</span></a>\n')
    desc = f'{b["title"]}：{b["era"]}，{b["editors"]}。{b["source"]}，全 {len(b["volumes"])} 册 {book_total_pages(b)} 页，在线连读。'
    alink = f'<p>本谱介绍：<a href="{b["article"]}">{b["article_title"]}</a></p>\n' if b.get("article") else ""
    return head(f'{b["title"]} · 冯氏族谱', desc, path=f'/book/{b["slug"]}.html') + header() + f"""<main>
<p class="crumb"><a href="/">族谱收藏</a> / {b["province"]} · {b["place"]}</p>
<h1>{b["title"]}</h1>
<div class="kv">
<p><strong>纂修年代：</strong>{b["era"]}</p>
<p><strong>纂辑者：</strong>{b["editors"]}</p>
<p><strong>藏本来源：</strong>{b["source"]}</p>
<p><strong>全书规模：</strong>{len(b["volumes"])} 册，共 {book_total_pages(b)} 页</p>
</div>
<p>{b["intro"]}</p>
{alink}<section class="block"><h2>各册阅读</h2>
<div class="list">
{rows}</div></section>
<p class="note">阅读说明：点开任意一册即从第一页连续向下阅读，可跳页、可点图放大；每册阅读页顶部可下载 PDF 版。</p>
</main>
{FAB}
""" + FAB_SCRIPT + footer()


def dl_row(b, v):
    if not v.get("dl_mb"):
        return ""
    return (f'<div class="dlrow"><a href="{DL_BASE}/{b["slug"]}-{v["id"]}-dl.pdf">'
            f'下载本册 PDF · {v["dl_mb"]} MB</a></div>\n')


def reader_page(b, v):
    title = f'{b["title"]}（{v["name"]}）'
    pages = [None] + [{"label": f"第 {i} 页"} for i in range(1, v["pages"] + 1)]
    numeric = {str(i): i for i in range(1, v["pages"] + 1)}
    data = {"title": title, "base": f'/img/{b["slug"]}/{v["id"]}/',
            "pages": pages, "numeric": numeric, "start": 1}
    data_json = json.dumps(data, ensure_ascii=False)
    return head(f'{title} · 在线连读 · 冯氏族谱',
                f'{title}在线连读：{b["era"]}，{b["source"]}。',
                path=f'/read/{b["slug"]}-{v["id"]}.html') + header() + f"""<div class="wrap">
{reader_toolbar('/book/' + b['slug'] + '.html', '返回目录', v['pages'])}
{dl_row(b, v)}<div class="readerwrap">
<button id="singlePage" class="reader-image" type="button" aria-label="放大当前谱页"><img class="pageimg" id="pg" alt="族谱原书页"></button>
<div id="scrollView" style="display:none"></div>
<div class="pagenav"><a id="prev" href="#">← 上一页</a><a id="next" href="#">下一页 →</a></div>
</div>
</div>
{image_dialog()}
{FAB}
<script src="/assets/site.js?v=2"></script>
<script id="originalReaderData" type="application/json">{data_json}</script>
<script src="/assets/reader-controls.js?v=1" defer></script>
<script src="/assets/volume-reader.js?v=1" defer></script>
""" + FAB_SCRIPT + footer()


def main():
    data = json.load(open(os.path.join(ROOT, "data", "books.json"), encoding="utf-8"))
    books = data["books"]
    if os.path.exists(OUT):
        # keep rendered images if present (img/ is produced by render_pages.py)
        img_dir = os.path.join(OUT, "img")
        saved = None
        if os.path.exists(img_dir):
            saved = os.path.join(ROOT, ".img-keep")
            if os.path.exists(saved):
                shutil.rmtree(saved)
            shutil.move(img_dir, saved)
        shutil.rmtree(OUT)
        os.makedirs(OUT)
        if saved:
            shutil.move(saved, img_dir)
    else:
        os.makedirs(OUT)
    shutil.copytree(os.path.join(ROOT, "assets"), os.path.join(OUT, "assets"))
    icon = open(os.path.join(ROOT, "assets", "icon.svg"), encoding="utf-8").read()
    for name in ("icon.svg", "favicon.svg"):
        open(os.path.join(OUT, name), "w", encoding="utf-8").write(icon)
    open(os.path.join(OUT, "CNAME"), "w").write(DOMAIN.removeprefix("https://") + "\n")

    urls = [f"{DOMAIN}/"]
    open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(index_page(books))
    os.makedirs(os.path.join(OUT, "book"))
    os.makedirs(os.path.join(OUT, "read"))
    for b in books:
        open(os.path.join(OUT, "book", b["slug"] + ".html"), "w", encoding="utf-8").write(book_page(b))
        urls.append(f'{DOMAIN}/book/{b["slug"]}.html')
        for v in b["volumes"]:
            name = f'{b["slug"]}-{v["id"]}.html'
            open(os.path.join(OUT, "read", name), "w", encoding="utf-8").write(reader_page(b, v))
            urls.append(f"{DOMAIN}/read/{name}")
    sm = ['<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    sm += [f"<url><loc>{u}</loc></url>" for u in urls]
    sm.append("</urlset>")
    open(os.path.join(OUT, "sitemap.xml"), "w", encoding="utf-8").write("\n".join(sm))
    open(os.path.join(OUT, "robots.txt"), "w").write(
        f"User-agent: *\nAllow: /\nSitemap: {DOMAIN}/sitemap.xml\n")
    print(f"generated {len(urls)} pages into site/")
    return 0


if __name__ == "__main__":
    sys.exit(main())
