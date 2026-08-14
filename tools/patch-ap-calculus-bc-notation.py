from pathlib import Path
p=Path('data/ap-calculus-bc-u10.js')
s=p.read_text()
repls={
'a_n':'aₙ','b_n':'bₙ','S_n':'Sₙ',
'a_(n+1)':'aₙ₊₁','b_(n+1)':'bₙ₊₁','b_(N+1)':'bₙ₊₁',
'|a_(n+1)/a_n|':'|aₙ₊₁/aₙ|',
'The alternating series remainder theorem states |R_N|≤bₙ₊₁ when the positive magnitudes decrease to zero.':'The alternating series remainder theorem states that the remainder magnitude after N terms is at most bₙ₊₁ when the positive magnitudes decrease to zero.',
}
for a,b in repls.items(): s=s.replace(a,b)
p.write_text(s)
