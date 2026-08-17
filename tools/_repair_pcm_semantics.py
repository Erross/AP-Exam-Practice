from pathlib import Path
p=Path('data/ap-physics-c-mechanics.js')
s=p.read_text()
changes=[
('Units 1-2 are populated first; releaseStatus remains draft.','full U1-U7 candidate; releaseStatus remains draft until release gates pass.'),
('"pcm-2.3-02","U2","2.3","Newton\'s Third Law","2.C"','"pcm-2.3-02","U2","2.3","Newton\'s Third Law","3.B"'),
('"pcm-4.3-03","U4","4.3","Conservation of Linear Momentum","2.C"','"pcm-4.3-03","U4","4.3","Conservation of Linear Momentum","3.B"'),
('"pcm-2.6-01","U2","2.6","Gravitational Force","2.B"','"pcm-2.6-01","U2","2.6","Gravitational Force","2.A"'),
('"pcm-5.4-01","U5","5.4","Rotational Inertia","2.B"','"pcm-5.4-01","U5","5.4","Rotational Inertia","2.A"'),
('"pcm-6.6-01","U6","6.6","Motion of Orbiting Satellites","2.B"','"pcm-6.6-01","U6","6.6","Motion of Orbiting Satellites","2.A"'),
('"pcm-7.5-01","U7","7.5","Simple and Physical Pendulums","2.B"','"pcm-7.5-01","U7","7.5","Simple and Physical Pendulums","2.A"'),
('"pcm-7.3-01","U7","7.3","Representing and Analyzing SHM","2.B"','"pcm-7.3-01","U7","7.3","Representing and Analyzing SHM","3.B"'),
('"pcm-7.4-01","U7","7.4","Energy of Simple Harmonic Oscillators","2.B"','"pcm-7.4-01","U7","7.4","Energy of Simple Harmonic Oscillators","2.A"'),
('"always mus N"','"equal to \u03bc\u209bN"'),
]
for a,b in changes:
    if a not in s: raise SystemExit('missing: '+a)
    s=s.replace(a,b,1)
p.write_text(s)
