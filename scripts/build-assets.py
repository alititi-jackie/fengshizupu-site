"""Rebuild disposable images/PDF; never write into originals/."""
from pathlib import Path
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
import json,hashlib
pages=json.loads(Path('data/archive_pages.json').read_text())
Path('public/downloads').mkdir(exist_ok=True)
for aid in sorted(set(p['archiveId'] for p in pages)):
 c=canvas.Canvas(f'public/downloads/{aid}.pdf',pageCompression=1)
 c.setTitle('Feng genealogy - collected images, sequence pending human review')
 for p in sorted((p for p in pages if p['archiveId']==aid),key=lambda p:p['sequence']):
  source=Path('public'+p['imagePath'])
  assert hashlib.sha256(source.read_bytes()).hexdigest()==p['sha256'],f'Original changed: {source}'
  with Image.open(source) as original:
   im=original.convert('RGB').rotate(p.get('rotation',0),expand=True)
   out=Path(f'public/archives/{aid}/derived');out.mkdir(parents=True,exist_ok=True)
   im.save(out/f"{p['id']}.jpg",quality=90)
   thumb=im.copy();thumb.thumbnail((450,600));thumb.save(out/f"{p['id']}-thumb.jpg",quality=80)
   width,height=im.size; pw=595;ph=pw*height/width
   c.setPageSize((pw,ph));c.drawImage(str(out/f"{p['id']}.jpg"),0,0,width=pw,height=ph);c.showPage()
 c.save()
print(f'Generated derivatives and PDF for {len(pages)} images; original hashes unchanged')
