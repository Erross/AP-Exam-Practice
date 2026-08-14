from pathlib import Path

p=Path('data/ap-calculus-bc-u9.js')
s=p.read_text()
s=s.replace(
'explanation:"dx/dt=2 and dy/dt=2t, so the arc-length integrand is √[(2)²+(2t)²]=√(4+4t²)."',
'explanation:"For parametric arc length, square both coordinate derivatives before adding them. Here dx/dt=2 and dy/dt=2t, so √[(dx/dt)²+(dy/dt)²]=√[(2)²+(2t)²]=√(4+4t²)."'
)
p.write_text(s)

p=Path('data/ap-calculus-bc-u10.js')
s=p.read_text()
s=s.replace(
'explanation:"Use 1/(1−x²)=Σx^(2n) for |x|<1, then multiply by x. The result is x+x³+x⁵+⋯=Σx^(2n+1)."',
'explanation:"Start with the geometric expansion 1/(1−x²)=Σx^(2n) for |x|<1, then multiply every term by x. The resulting series is x+x³+x⁵+⋯=Σx^(2n+1), with the same radius condition."'
)
s=s.replace(
'distractors:["It diverges because every p-series diverges.","It diverges because p=2 is an integer.","It converges only conditionally."]',
'distractors:["It diverges because the p-value is above the convergence threshold.","It diverges because integer exponents do not define convergent p-series.","It converges conditionally because alternating signs would be required for absolute convergence."]'
)
p.write_text(s)
