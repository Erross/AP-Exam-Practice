from pathlib import Path
p=Path('data/ap-physics-c-em.js')
s=p.read_text()
old='"E = QR²/(4πε₀r⁴)"'
new='"E = QR³/(4πε₀r⁵)"'
if s.count(old)!=1: raise SystemExit(f'expected one collision target, found {s.count(old)}')
s=s.replace(old,new,1)
p.write_text(s)
