#!/usr/bin/env python3
"""主站统一搜索索引生成器。

汇总四个来源，生成主站 public/search-index.json：
  1. 恩平站 search-index.json（原书房支/村庄/目录 + 页码直达 + 小湴新谱条目）
  2. 恩平站 person-index.json（小湴村凝斋房 2026 版 1,133 人）
  3. zp1 / zp2 的 data/books.json（各地族谱收藏 22 部，书名+关键词）
  4. 主站资讯（按 sitemap 逐篇取 og:title / og:description）

每条索引带 s 字段 = 繁转简后的检索文本；另输出 t2s 字符表供前端把查询转简体匹配。
用法：python3 scripts/build-search-index.py [输出路径]
默认输出到仓库 public/search-index.json。需要 opencc（pip install opencc-python-reimplemented）；
没有 opencc 时退化为不做繁简转换（s = 原文）。
"""
import json
import re
import sys
import urllib.request

ENPING = "https://enping.fengshizupu.com"
MAIN = "https://fengshizupu.com"

try:
    from opencc import OpenCC
    _cc = OpenCC("t2s")
    def t2s(s):
        return _cc.convert(s)
except Exception:
    def t2s(s):
        return s


def get_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read().decode("utf-8"))


def get_text(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode("utf-8", "replace")


def main():
    out_path = sys.argv[1] if len(sys.argv) > 1 else "public/search-index.json"
    entries = []          # {g,t,d,u,s}
    t2s_chars = {}

    def add(g, t, d, u, k="", s_text=None):
        raw = s_text if s_text is not None else f"{t} {k} {d}"
        conv = t2s(raw)
        s = conv.lower()
        # 繁简字符表由整串转换前后对齐得出（opencc 单字查表对部分字不转换，
        # 如「縣」；整串转换是词组级的，对齐后能拿到正确的单字对应）。
        if len(conv) == len(raw):
            for a, b in zip(raw, conv):
                if a != b:
                    t2s_chars[a] = b
        entries.append({"g": g, "t": t, "d": d, "u": u, "s": s,
                        "ts": t2s(t).lower()})

    # ---- 1. 恩平原书 ----
    enp = get_json(f"{ENPING}/assets/search-index.json")
    add("enping", "《恩平冯氏族谱》全书在线查阅",
        "恩平冯氏总谱全书 1,269 页逐页看图，可按房支、村庄查找",
        ENPING + "/", "恩平 冯氏族谱 全书 原书 恩平冯氏族谱")
    for e in enp.get("original", []):
        add("enping", e["t"], e.get("detail", ""), ENPING + e["url"], e.get("k", ""))

    # ---- 2. 小湴新谱：版本条目 + 人物 ----
    for e in enp.get("editions", []):
        add("people", e["t"], e.get("detail", ""), ENPING + e["url"], e.get("k", ""))
    people_url = enp["people"][0].split("?")[0]
    persons = get_json(ENPING + people_url)
    for p in persons:
        detail = p.get("detail", "")
        # 人物检索文本不带每条都重复的「小湴村凝斋房 · 2026 版」前缀，
        # 否则搜村名会把 1,133 人全部命中；显示用的 detail 不变。
        s_detail = detail.replace("小湴村凝斋房 · 2026 版 · ", "")
        add("people", p["t"], detail, ENPING + p["url"], p.get("k", ""),
            s_text=f'{p["t"]} {p.get("k", "")} {s_detail}')

    # ---- 3. zp1 / zp2 收藏谱 ----
    for shard in ("zp1", "zp2"):
        data = get_json(f"https://raw.githubusercontent.com/alititi-jackie/"
                        f"fengshizupu-{shard}/main/data/books.json")
        books = data["books"] if isinstance(data, dict) else data
        for b in books:
            pages = sum(v["pages"] for v in b["volumes"])
            d = (f'{b["place"]} · {b["era"]} · {len(b["volumes"])} 册 · '
                 f'{pages} 页，逐页在线连读，可下载 PDF')
            add("books", b["title"], d,
                f'https://{shard}.fengshizupu.com/book/{b["slug"]}.html',
                b.get("keywords", ""))

    # ---- 4. 主站资讯 ----
    sitemap = get_text(f"{MAIN}/sitemap.xml")
    news_urls = [u for u in re.findall(r"<loc>([^<]+)</loc>", sitemap)
                 if re.search(r"/news/[^/]+/[^/]+/$", u)]
    for u in sorted(news_urls):
        html = get_text(u)
        mt = re.search(r'property="og:title" content="([^"]+)"', html)
        md = re.search(r'property="og:description" content="([^"]+)"', html)
        if not mt:
            continue
        title = mt.group(1).replace(" · 冯氏族谱", "").strip()
        add("news", title, md.group(1).strip() if md else "",
            u.replace(MAIN, ""), title)

    # ---- 页码直达 ----
    numeric = {}
    for n, e in (enp.get("numeric") or {}).items():
        numeric[n] = {"t": e["t"], "u": ENPING + e["url"]}
    scoped = {}
    for scope, pages in (enp.get("scopedPages") or {}).items():
        scoped[scope] = {n: {"t": e["t"], "u": ENPING + e["url"]}
                         for n, e in pages.items()}

    # 繁简字符表：语料里多为简体，靠语料对齐拿不全（縣/諸/譜等根本不出现），
    # 故以 opencc 自带 TSCharacters 单字表为准全量输出，供前端转查询词。
    try:
        import os
        import opencc as _oc
        dict_path = os.path.join(os.path.dirname(_oc.__file__),
                                 "dictionary", "TSCharacters.txt")
        with open(dict_path, encoding="utf-8") as f:
            for line in f:
                parts = line.rstrip("\n").split("\t")
                if len(parts) == 2 and len(parts[0]) == 1 and len(parts[1]) == 1 \
                        and parts[0] != parts[1]:
                    t2s_chars[parts[0]] = parts[1]
    except Exception as e:
        print("TSCharacters load failed:", e)

    index = {
        "v": 1,
        "groups": [
            {"id": "enping", "name": "恩平冯氏族谱（原书）"},
            {"id": "people", "name": "小湴村凝斋房 · 2026 版"},
            {"id": "books", "name": "各地族谱收藏"},
            {"id": "news", "name": "冯氏资讯"},
        ],
        "entries": entries,
        "numeric": numeric,
        "scoped": scoped,
        "t2s": t2s_chars,
    }
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(index, f, ensure_ascii=False, separators=(",", ":"))
    from collections import Counter
    print("entries:", len(entries), Counter(e["g"] for e in entries))
    print("numeric:", len(numeric), "scoped:", {k: len(v) for k, v in scoped.items()})
    print("t2s chars:", len(t2s_chars))


if __name__ == "__main__":
    main()
