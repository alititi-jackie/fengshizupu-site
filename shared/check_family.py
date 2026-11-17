#!/usr/bin/env python3
"""Check that vendored family UI files match the reviewed release manifest."""
import hashlib,json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
manifest=json.loads((root/'data/family-ui.json').read_text())
for name,expected in manifest['files'].items():
    actual=hashlib.sha256((root/name).read_bytes()).hexdigest()
    if actual!=expected:raise SystemExit(f'Family UI differs: {name}. Update the main shared source and sync all sites.')
print('Family UI verified:',manifest['revision'])
