# -*- coding: utf-8 -*-
"""Build the whole-book typeset PDF （整版 PDF) for the genealogy archive.

Writes public/archives/<archiveId>/book.pdf: cover + 凡例 + one chart page
per archive page + a full-name index appendix. The chart pages are drawn by
build-typeset.py's draw_chart — the single chart implementation shared by
the single-page files and this book.

Run after data changes, together with build-typeset.py:
    python scripts/build-typeset.py && python scripts/build-book.py

Requires: reportlab. Fonts: scripts/fonts/NotoSerifSC-Subset-*.ttf
(regenerate the subset if new text gains characters outside it).
"""
import importlib.util
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4

_spec = importlib.util.spec_from_file_location(
    'build_typeset', Path(__file__).with_name('build-typeset.py'))
bt = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(bt)

persons, father, pageof, pages_meta = bt.persons, bt.father, bt.pageof, bt.pages_meta
gen_of, gen_label, brand = bt.gen_of, bt.gen_label, bt.brand
W, H, L = bt.W, bt.H, bt.L


def branch_of(pid):
    cur, seen = pid, set()
    while father.get(cur) and cur not in seen:
        seen.add(cur)
        cur = father[cur]
    return persons[cur]['normalizedName'].replace('冯', '', 1)


def text_page_lines(c, title, lines, size=11.5, leading=21, x=L, ytop=780):
    brand(c)
    c.setFont('SerifB', 17)
    c.drawCentredString(W / 2, ytop, title)
    y = ytop - 48
    c.setFont('Serif', size)
    for ln in lines:
        if ln == '':
            y -= leading * 0.6
            continue
        c.drawString(x, y, ln)
        y -= leading
    c.showPage()


def main():
    archive_id = sorted({m['archiveId'] for m in pages_meta.values()})[0]
    out = Path(__file__).resolve().parent.parent / 'public' / 'archives' / archive_id / 'book.pdf'
    out.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(out), pagesize=A4)
    # cover
    brand(c)
    c.setFont('SerifB', 40)
    c.drawCentredString(W / 2, 560, '冯 氏 族 谱')
    c.setFont('SerifB', 19)
    c.drawCentredString(W / 2, 508, '小湴村凝斋房世系图')
    c.setFont('Serif', 13)
    c.drawCentredString(W / 2, 452, '广东省江门市恩平市良西镇雁鹅村委会小湴村')
    c.drawCentredString(W / 2, 420, '据原谱二十七页转录 · 按原谱版式重排')
    c.drawCentredString(W / 2, 300, '二〇二六年十一月')
    c.showPage()
    # 凡例
    fanli = [
        '一、本书据小湴村凝斋房原谱二十七页影像逐页转录重排，',
        '　　分页、页序、人名顺序均依原谱；版式仿原谱世系图：',
        '　　页眉房名，右侧世系，世代自上而下，父子以线相连。',
        '',
        '二、人名已经原谱逐一核对；个别列距经规整，与原印刷',
        '　　页或有细微出入，世系与文字以转录数据为准。',
        '',
        '三、父子连线为识读所得，尚未经宗亲逐一核校，凡有疑',
        '　　义之处，条目版备注中均有注明，请对照原谱核正。',
        '',
        '四、人名左侧小字为配偶（如「唐氏」）；人名上方小字',
        '　　为排行（长、次、三……），原谱标「女」者为女儿。',
        '',
        '五、每人均有编号（p000001 起），与网站 fengshizupu.com',
        '　　及条目版相对应；书末附全名索引，按编号查检。',
        '',
        '六、本书与条目版同源生成，增补修订后可重新出书。',
    ]
    text_page_lines(c, '凡　例', fanli)
    total = 0
    for pgid in sorted(pages_meta, key=lambda p: pages_meta[p]['sequence']):
        total += bt.draw_chart(c, pgid)
    print('chart persons drawn:', total)
    # index appendix
    def index_header():
        brand(c)
        c.setFont('SerifB', 16)
        c.drawCentredString(W / 2, 796, '附录 · 全名索引')
    index_header()
    allp = sorted(persons, key=lambda p: int(p[1:]))
    col_x = [L, L + 168, L + 336]
    rowh = 13.2
    idx = 0
    col = 0
    y = 0
    first = True
    while idx < len(allp):
        if col == 0 and y == 0:
            if not first:
                c.showPage()
                index_header()
            first = False
        if y == 0:
            y = 762
            c.setFont('SerifB', 8.5)
            c.drawString(col_x[col], y + 14, '编号　　姓名　　世代　支　页')
        p = persons[allp[idx]]
        c.setFont('Serif', 8.5)
        c.drawString(col_x[col], y, f"{p['id']} {p['normalizedName']} 第{gen_label(gen_of(p['id']))}世 {branch_of(p['id'])} {pages_meta[pageof[p['id']]]['printedPageLabel']}")
        y -= rowh
        idx += 1
        if y < 66:
            y = 0
            col += 1
            if col > 2:
                col = 0
    c.showPage()
    c.save()
    print('saved', out)


if __name__ == '__main__':
    main()
