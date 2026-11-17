#!/usr/bin/env python3
"""Sync reviewed family UI from a local main-site checkout. Never fetch floating main at build time."""
import argparse, hashlib, json, subprocess
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('source');p.add_argument('targets',nargs='+');a=p.parse_args()
source=Path(a.source).resolve()
mapping={'public/assets/genealogy-theme.css': 'assets/genealogy-theme.css', 'public/assets/site.js': 'assets/site.js', 'public/assets/reader-controls.js': 'assets/reader-controls.js', 'shared/python/family_ui.py': 'scripts/family_ui.py', 'shared/python/collection_site.py': 'scripts/collection_site.py'}
mapping['shared/collection-browser.cjs']='tests/browser.cjs'
revision=subprocess.check_output(['git','-C',str(source),'rev-parse','HEAD'],text=True).strip()
for target in map(Path,a.targets):
    files={}
    for src,dest in mapping.items():
        if dest in ('scripts/collection_site.py','tests/browser.cjs') and not (target/'data/site.json').exists():continue
        content=(source/src).read_bytes(); out=target/dest;out.parent.mkdir(parents=True,exist_ok=True);out.write_bytes(content)
        files[dest]=hashlib.sha256(content).hexdigest()
    (target/'data/family-ui.json').write_text(json.dumps({'source':'alititi-jackie/fengshizupu-site','revision':revision,'files':files},indent=2)+'\n')
    checker=source/'shared/check_family.py'
    (target/'scripts/check_family.py').write_bytes(checker.read_bytes())
