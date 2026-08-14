from pathlib import Path
p=Path('data/ap-calculus-bc-u10.js')
s=p.read_text()
repls={
'a_n':'aₙ','b_n':'bₙ','S_n':'Sₙ',
'a_(n+1)':'aₙ₊₁','b_(n+1)':'bₙ₊₁','b_(N+1)':'bₙ₊₁',
'|a_(n+1)/a_n|':'|aₙ₊₁/aₙ|',
}
for a,b in repls.items(): s=s.replace(a,b)
p.write_text(s)
