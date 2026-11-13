# -*- coding: utf-8 -*-
"""Generate the typeset （重排） chart pages for the archive viewer.

For every archive page this writes, under public/archives/<archiveId>/typeset/:
  <pageId>.pdf  one-page PDF of the re-typeset genealogy chart
  <pageId>.jpg  raster of the same page for on-screen viewing

The charts are drawn from data/*.json only (persons, relationships,
person_sources, archive_pages.chartHeader). Original photographs are never
read or written here. Requires: reportlab, and pdftoppm (poppler) for JPGs.
Fonts: scripts/fonts/NotoSerifSC-Subset-*.ttf (subset of Noto Serif SC;
regenerate the subset if the data gains characters outside it).
"""
import json, re, collections, subprocess, sys
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.pagesizes import A4

ROOT = Path(__file__).resolve().parent.parent
pdfmetrics.registerFont(TTFont('Serif', str(ROOT / 'scripts/fonts/NotoSerifSC-Subset-400.ttf')))
pdfmetrics.registerFont(TTFont('SerifB', str(ROOT / 'scripts/fonts/NotoSerifSC-Subset-700.ttf')))

persons = {p['id']: p for p in json.loads((ROOT / 'data/persons.json').read_text())}
rels = json.loads((ROOT / 'data/relationships.json').read_text())
srcs = json.loads((ROOT / 'data/person_sources.json').read_text())
pages_meta = {p['id']: p for p in json.loads((ROOT / 'data/archive_pages.json').read_text())}
pageof = {s['personId']: s['archivePageId'] for s in srcs}
father = {}
children = collections.defaultdict(list)
for r in rels:
    father[r['toPersonId']] = r['fromPersonId']
    children[r['fromPersonId']].append(r['toPersonId'])
for k in children: children[k].sort(key=lambda pid: int(pid[1:]))

# Page-bottom marginal notes printed on the original pages （注文）, from the
# transcription records; drawn at the foot of the matching typeset page.
PAGE_NOTES = {
    'pg000008': ['冯伟强户迁广州'],
    'pg000014': ['冯文佐迁美国', '冯文治迁美国'],
    'pg000016': ['想球户迁越南'],
    'pg000017': ['修容户迁法国'],
    'pg000019': ['茂明户迁美国', '惠明户迁美国'],
}

def gen_of(pid):
    g = persons[pid]['generationNumber']
    if g: return g
    f = father.get(pid)
    return (persons[f]['generationNumber'] + 1) if f and persons[f]['generationNumber'] else 21

def spouse_of(p):
    m = re.search(r'配([^（；。]+)（原谱', p['notes'])
    if m: return m.group(1).strip()
    m = re.search(r'配([^；。]+)', p['notes'])
    return m.group(1).strip()[:4] if m else ''

def circle_of(p):
    return '名下有○记号' in p['notes']

def marker_of(p):
    m = re.search(r'排行：([长次二三四五六七八九十])', p['notes'])
    rank = m.group(1) if m else ''
    dau = '女' if re.search(r'女（(原谱|补录)标', p['notes']) else ''
    return (dau + rank) if dau else rank

CN = {20:'廿',21:'廿一',22:'廿二',23:'廿三',24:'廿四',25:'廿五',26:'廿六',27:'廿七',28:'廿八',29:'廿九',30:'卅'}
def gen_label(g): return CN.get(g, str(g))

W, H = A4
L, R = 46, 70
CT, CB = 772, 66
CW = W - L - R

def draw_vtext(c, x, y_top, text, font, size, pitch=None):
    pitch = pitch or size * 1.16
    y = y_top
    for ch in text:
        c.setFont(font, size)
        c.drawCentredString(x, y - size, ch)
        y -= pitch
    return y

def brand(c):
    c.saveState()
    c.setFont('Serif', 9.5)
    c.setFillColorRGB(0.455, 0.184, 0.196)
    c.drawString(L, H - 28, '冯氏族谱 · fengshizupu.com')
    c.restoreState()

def draw_chart(c, pgid):
    meta = pages_meta[pgid]
    pids = sorted([pid for pid, pg in pageof.items() if pg == pgid], key=lambda p: int(p[1:]))
    pset = set(pids)
    gens = sorted({gen_of(p) for p in pids})
    roots = [p for p in pids if father.get(p) not in pset]
    def build(pid):
        kids = [k for k in children.get(pid, []) if k in pset]
        g = gen_of(pid)
        if not kids:
            return {'pos': {pid: 0.0}, 'left': {g: 0.0}, 'right': {g: 0.0}, 'cx': 0.0}
        subs = [build(k) for k in kids]
        merged = {}; right_c = {}; left_c = {}
        first_cx = last_cx = None
        for i, sub in enumerate(subs):
            shift = 0.0
            if i > 0:
                for d, l in sub['left'].items():
                    if d in right_c: shift = max(shift, right_c[d] + 1.0 - l)
            for p, x in sub['pos'].items(): merged[p] = x + shift
            for d, r in sub['right'].items():
                if d not in right_c or r + shift > right_c[d]: right_c[d] = r + shift
            for d, l in sub['left'].items():
                if d not in left_c or l + shift < left_c[d]: left_c[d] = l + shift
            cx = sub['cx'] + shift
            if first_cx is None: first_cx = cx
            last_cx = cx
        my_cx = (first_cx + last_cx) / 2
        merged[pid] = my_cx
        left_c[g] = min(left_c.get(g, my_cx), my_cx); right_c[g] = max(right_c.get(g, my_cx), my_cx)
        return {'pos': merged, 'left': left_c, 'right': right_c, 'cx': my_cx}
    pos = {}
    right_c = {}
    for r in roots:
        sub = build(r)
        shift = 0.0
        if right_c:
            for d, l in sub['left'].items():
                if d in right_c: shift = max(shift, right_c[d] + 1.0 - l)
        for p, x in sub['pos'].items(): pos[p] = x + shift
        for d, rr in sub['right'].items():
            if d not in right_c or rr + shift > right_c[d]: right_c[d] = rr + shift
    total_units = (max(right_c.values()) + 1.0) if right_c else 1.0
    colW = CW / total_units
    bandH = (CT - CB) / len(gens)
    maxlen = max(len(persons[p]['normalizedName']) for p in pids)
    units = 1 + maxlen + (1 if any(circle_of(persons[p]) for p in pids) else 0)
    F = max(7.0, min(colW * 0.52, (bandH - 12) / (units * 1.16), 13.0))
    pitch = F * 1.16
    band_top = {g: CT - i * bandH for i, g in enumerate(gens)}
    def X(pid): return L + (total_units - pos[pid] - 0.5) * colW
    def busY(g): return band_top[g] - 10
    brand(c)
    c.setFont('SerifB', 15)
    c.drawCentredString(W / 2, 800, meta.get('chartHeader', ''))
    c.setLineWidth(1.6); c.line(L, 790, W - R + 24, 790)
    sx = W - 32
    draw_vtext(c, sx, 776, '世系', 'Serif', 11)
    c.setLineWidth(0.7)
    for g in gens:
        midy = band_top[g] - bandH / 2
        draw_vtext(c, sx, midy + len(gen_label(g)) * 6.5, gen_label(g), 'Serif', 11)
        c.line(W - R + 8, busY(g), W - 46, busY(g))
    c.setLineWidth(0.8)
    stack_bottom = {}
    for p in pids:
        g = gen_of(p)
        top = busY(g) - 4
        m = marker_of(persons[p]); nm = persons[p]['normalizedName']
        n_units = len(m) + len(nm) + (1 if circle_of(persons[p]) else 0)
        stack_bottom[p] = top - n_units * pitch
    for p in pids:
        kids = [k for k in children.get(p, []) if k in pset]
        if not kids: continue
        cg = gen_of(kids[0])
        by = busY(cg)
        c.line(X(p), stack_bottom[p] - 2, X(p), by)
        xs = [X(k) for k in kids]
        if len(xs) > 1: c.line(min(xs), by, max(xs), by)
        for k in kids: c.line(X(k), by, X(k), by - 4)
    for p in pids:
        g = gen_of(p); x = X(p); top = busY(g) - 4
        m = marker_of(persons[p]); nm = persons[p]['normalizedName']; sp = spouse_of(persons[p])
        y = top
        if m: y = draw_vtext(c, x, y, m, 'Serif', F * 0.9)
        y = draw_vtext(c, x, y, nm, 'Serif', F, pitch)
        if circle_of(persons[p]):
            draw_vtext(c, x, y, '○', 'Serif', F * 0.92)
        if sp:
            draw_vtext(c, x - F * 1.04, top - (len(m) * pitch if m else 0), sp, 'Serif', F * 0.8)
    if pgid in PAGE_NOTES:
        c.setFont('Serif', 10)
        yy = 52
        for note in PAGE_NOTES[pgid]:
            c.drawRightString(W - R + 24, yy, note); yy += 15
    c.setFont('Serif', 11)
    c.drawCentredString(W / 2, 34, meta.get('printedPageLabel', ''))
    c.showPage()
    return len(pids)

def main():
    total = 0
    for pgid in sorted(pages_meta, key=lambda p: pages_meta[p]['sequence']):
        meta = pages_meta[pgid]
        outdir = ROOT / 'public' / 'archives' / meta['archiveId'] / 'typeset'
        outdir.mkdir(parents=True, exist_ok=True)
        pdf_path = outdir / f'{pgid}.pdf'
        c = canvas.Canvas(str(pdf_path), pagesize=A4)
        total += draw_chart(c, pgid)
        c.save()
        jpg_path = outdir / f'{pgid}.jpg'
        r = subprocess.run(['pdftoppm', '-jpeg', '-r', '150', '-singlefile', '-jpegopt', 'quality=88',
                            str(pdf_path), str(jpg_path.with_suffix(''))],
                           capture_output=True, text=True)
        if r.returncode != 0:
            print(f'WARNING: pdftoppm failed for {pgid}: {r.stderr.strip()[:200]}', file=sys.stderr)
    print(f'Typeset pages generated for {total} persons')

if __name__ == '__main__':
    main()
