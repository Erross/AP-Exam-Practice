from pathlib import Path
p=Path('data/ap-physics-c-mechanics.js')
s=p.read_text()
# Broad student-facing notation normalization. These tokens occur in question text,
# options, and rationales; replace them with conventional mathematical symbols.
repls=[
(' <= ',' ≤ '),(' >= ',' ≥ '),
('theta','θ'),('omega','ω'),('alpha','α'),('tau','τ'),('lambda','λ'),('Delta','Δ'),
('v_A/B','vA/B'),('v_A','vA'),('v_B','vB'),
('x_cm','xcm'),('a_cm','acm'),('F_ext','Fext'),('T_y','Ty'),
('f_k','fₖ'),('mu_k','μₖ'),('f_s','fₛ'),('F_s','Fₛ'),
('F_d','Fd'),('v_t','vₜ'),('a_r','ar'),('P_avg','Pavg'),
]
for a,b in repls: s=s.replace(a,b)
# One rationale was below the development floor; make the physics explanation
# explicit rather than adding generic padding.
s=s.replace("Hooke's law gives |Fₛ|=k|x|. Thus 200 N/m times 0.030 m equals 6 N.",
            "Hooke's law gives |Fₛ|=k|x|. Thus 200 N/m times 0.030 m equals 6 N; the restoring direction would be opposite the displacement from equilibrium.")
p.write_text(s)
