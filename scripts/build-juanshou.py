"""Render the existing preface PDF without removing page content or watermarks."""
from pathlib import Path
import json
import fitz
from PIL import Image

root = Path(__file__).resolve().parent.parent
output = root / 'public/images/enping-juanshou'
output.mkdir(parents=True, exist_ok=True)
pages = []
with fitz.open(root / 'public/enping-fengshi-juanshou.pdf') as document:
    for index, page in enumerate(document):
        pixmap = page.get_pixmap(matrix=fitz.Matrix(3, 3), alpha=False)
        image = Image.frombytes('RGB', [pixmap.width, pixmap.height], pixmap.samples)
        name = f'page-{index + 1:02}.webp'
        image.save(output / name, 'WEBP', quality=88)
        pages.append({'src': '/images/enping-juanshou/' + name,
                      'width': image.width, 'height': image.height})
expected = json.loads((root / 'data/enping-juanshou.json').read_text())
if pages != expected:
    raise ValueError('PDF pages changed: update and verify data/enping-juanshou.json before publishing')
print(f'Rendered {len(pages)} preface pages')
