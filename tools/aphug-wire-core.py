from pathlib import Path
import json
cfg=json.loads(Path('tools/aphug-wire-config.json').read_text())
p=Path('js/subjects.js');s=p.read_text();a=s.index('  {\n    id: "ap-human-geography",');b=s.index('  {\n    id: "ap-macroeconomics",',a)
lines=cfg['subjectLines']
p.write_text(s[:a]+'\n'.join(lines)+'\n'+s[b:])
p=Path('index.html');s=p.read_text();anchor='<script src="data/ap-human-geography.js"></script>'
layers='\n'.join([anchor]+[f'<script src="data/{x}"></script>' for x in cfg['layers']])
if anchor not in s: raise SystemExit('anchor missing')
p.write_text(s.replace(anchor,layers,1))
