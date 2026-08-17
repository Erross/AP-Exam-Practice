from pathlib import Path

p = Path('data/ap-physics-c-em.js')
s = p.read_text(encoding='utf-8')
old = 'add("em-8.6-05","U8","8.6","Gauss\'s Law","2.A","A solid insulating sphere of radius R has uniform volume charge density ρ. Which expression is obtained for the electric-field magnitude at radius r<R by applying Gauss\'s law to a concentric spherical surface?","E = ρr/(3ε₀)","E = ρr³/(3ε₀R²)","E = ρR³/(3ε₀r²)","E = ρr²/(3ε₀R)","For a Gaussian sphere of radius r, the enclosed charge is ρ(4πr³/3). Setting E(4πr²)=Qenc/ε₀ and simplifying gives E=ρr/(3ε₀).");'
new = 'add("em-8.6-05","U8","8.6","Gauss\'s Law","2.A","A solid insulating sphere of radius R has uniform volume charge density ρ. Which expression is obtained for the electric-field magnitude at radius r<R by applying Gauss\'s law to a concentric spherical surface?","E = ρr/(3ε₀)","E = ρr/(ε₀)","E = ρR³/(3ε₀r²)","E = ρr²/(3ε₀R)","For a Gaussian sphere of radius r, the enclosed charge is ρ(4πr³/3). Setting E(4πr²)=Qenc/ε₀ and simplifying gives E=ρr/(3ε₀).");'
if s.count(old) != 1:
    raise SystemExit(f'expected exact em-8.6-05 source once, found {s.count(old)}')
s = s.replace(old, new)
p.write_text(s, encoding='utf-8')
print('repaired em-8.6-05')
