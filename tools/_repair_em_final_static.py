from pathlib import Path
p=Path('data/ap-physics-c-em.js'); s=p.read_text()
repls={
'"E = QR/(4πε₀r³)"':'"E = QR²/(4πε₀r⁴)"',
'"Gauss\'s law can be used only when the field is constant and perpendicular everywhere on the chosen surface"':'"Gauss\'s law fails on a cube whenever the field magnitude varies across any one of its faces"',
'"Gauss\'s law is valid only for spherical, cylindrical, or planar Gaussian surfaces with high symmetry"':'"Gauss\'s law is restricted to spherical, cylindrical, or planar Gaussian surfaces with high symmetry"'
}
for old,new in repls.items():
    if s.count(old)!=1: raise SystemExit(f'data match count {s.count(old)} for {old}')
    s=s.replace(old,new,1)
p.write_text(s)

p=Path('tests/ap-physics-c-em-quantitative.test.js'); s=p.read_text()
old='  "em-8.5-01": `${200 * 0.30 * Math.cos(Math.PI / 3)} N·m²/C`,'
new='  "em-8.5-01": `${Math.round(200 * 0.30 * Math.cos(Math.PI / 3))} N·m²/C`,'
if s.count(old)!=1: raise SystemExit('8.5 quantitative expression missing')
s=s.replace(old,new,1)
old='  "em-13.6-01": `${1 / Math.sqrt(2 * 8e-6)} rad/s`,'
new='  "em-13.6-01": `${Math.round(1 / Math.sqrt(2 * 8e-6))} rad/s`,'
if s.count(old)!=1: raise SystemExit('13.6 quantitative expression missing')
s=s.replace(old,new,1)
old='  const candidateIds = bank\n'
new='  const candidateIds = Array.from(bank)\n'
if s.count(old)!=1: raise SystemExit('candidateIds source missing')
s=s.replace(old,new,1)
p.write_text(s)
