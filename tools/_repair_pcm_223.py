from pathlib import Path
p=Path('data/ap-physics-c-mechanics.js')
s=p.read_text()
repls={
'Circular motion requires an inward force only when speed changes':'Circular motion requires an inward force when the object is speeding up',
'Tension contributes only to tangential acceleration in circular motion':'Tension contributes to tangential acceleration but not radial acceleration',
}
for a,b in repls.items():
    if a not in s: raise SystemExit(f'missing: {a}')
    s=s.replace(a,b,1)
p.write_text(s)
