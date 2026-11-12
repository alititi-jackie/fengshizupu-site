"""Rebuild disposable derived images; never write into originals/."""
from pathlib import Path
from PIL import Image
import json,hashlib
pages=json.loads(Path('data/archive_pages.json').read_text())
for p in pages:
 source=Path('public'+p['imagePath'])
 assert hashlib.sha256(source.read_bytes()).hexdigest()==p['sha256'],f'Original changed: {source}'
 with Image.open(source) as original:
  im=original.convert('RGB').rotate(p.get('rotation',0),expand=True)
  out=Path(f"public/archives/{p['archiveId']}/derived");out.mkdir(parents=True,exist_ok=True)
  im.save(out/f"{p['id']}.jpg",quality=90)
  thumb=im.copy();thumb.thumbnail((450,600));thumb.save(out/f"{p['id']}-thumb.jpg",quality=80)
print(f'Generated derivatives for {len(pages)} images; original hashes unchanged')
