from pathlib import Path
p=Path('data/ap-physics-c-em.js'); s=p.read_text(); marker='window.QUESTIONS_AP_PHYSICS_C_EM = E;'
# Data-set lead questions ask students to make a claim from evidence (3.B), not justify an existing claim (3.C).
for qid in ['em-set-u8-01','em-set-u9-01','em-set-u10-02','em-set-u11-02','em-set-u12-01','em-set-u13-01']:
    start=f'addSet("{qid}"'
    pos=s.find(start)
    if pos<0: raise SystemExit(f'missing {qid}')
    end=s.find(');',pos)
    chunk=s[pos:end]
    if '"3.C"' not in chunk: raise SystemExit(f'3.C tag not found for {qid}')
    s=s[:pos]+chunk.replace('"3.C"','"3.B"',1)+s[end:]
extra=r'''
add("em-8.6-05","U8","8.6","Gauss's Law","2.A","A solid insulating sphere of radius R has uniform volume charge density ρ. Which expression is obtained for the electric-field magnitude at radius r<R by applying Gauss's law to a concentric spherical surface?","E = ρr/(3ε₀)","E = ρR/(3ε₀)","E = ρR³/(3ε₀r²)","E = ρr²/(3ε₀R)","For a Gaussian sphere of radius r, the enclosed charge is ρ(4πr³/3). Setting E(4πr²)=Qenc/ε₀ and simplifying gives E=ρr/(3ε₀).");
add("em-9.2-05","U9","9.2","Electric Potential","2.A","Along the x-axis an electric field is Eₓ=ax, where a is a positive constant. Taking V(0)=V₀, which expression gives the electric potential V(x)?","V(x)=V₀−ax²/2","V(x)=V₀+ax²/2","V(x)=V₀−ax","V(x)=V₀+a/x","Because Eₓ=−dV/dx, integrating dV=−ax dx from 0 to x gives V(x)−V₀=−ax²/2, so V(x)=V₀−ax²/2.");
add("em-10.3-05","U10","10.3","Capacitors","2.A","Two capacitors C₁ and C₂ are connected in series. Which expression for their equivalent capacitance follows from equal series charge and addition of potential differences?","Ceq = C₁C₂/(C₁+C₂)","Ceq = C₁+C₂","Ceq = (C₁+C₂)/(C₁C₂)","Ceq = C₁C₂","With the same charge Q on each capacitor, V=Q/C₁+Q/C₂=Q(1/C₁+1/C₂). Since Ceq=Q/V, inversion gives Ceq=C₁C₂/(C₁+C₂).");
add("em-10.4-05","U10","10.4","Dielectrics","2.A","A parallel-plate capacitor of plate area A and separation d is completely filled by a dielectric of constant κ. Which expression for capacitance follows from the dielectric-reduced field?","C = κε₀A/d","C = ε₀A/(κd)","C = κε₀d/A","C = ε₀A/d","The dielectric reduces the internal field for a given free charge by factor κ, so the potential difference is reduced by κ and C=Q/V increases to κε₀A/d.");
add("em-11.3-05","U11","11.3","Resistance, Resistivity, and Ohm's Law","2.A","A wire of resistivity ρ has cross-sectional area that varies with position as A(x). Which expression gives its total resistance from x=0 to x=L?","R = ∫₀ᴸ ρ dx/A(x)","R = ρL/∫₀ᴸA(x)dx","R = ∫₀ᴸ A(x) dx/ρ","R = ρ∫₀ᴸA(x)dx","A differential slice dx has resistance dR=ρ dx/A(x). Series slices add, so integrating from 0 to L yields R=∫₀ᴸρ dx/A(x).");
add("em-11.8-05","U11","11.8","Resistor Capacitor (RC) Circuits","2.A","A capacitor C initially charged to Q₀ discharges through a resistor R. Which expression for charge follows from Q/C+R(dQ/dt)=0?","Q(t)=Q₀e^(−t/RC)","Q(t)=Q₀e^(+t/RC)","Q(t)=Q₀(1−e^(−t/RC))","Q(t)=Q₀/(1+t/RC)","Separating dQ/Q=−dt/(RC) and integrating gives ln(Q/Q₀)=−t/(RC), hence the exponential discharge law Q(t)=Q₀e^(−t/RC).");
add("em-12.2-05","U12","12.2","Magnetism and Moving Charges","2.A","A particle of mass m and charge magnitude q moves perpendicular to a uniform magnetic field B in a circular path. Which expression for orbital radius follows from the magnetic force?","r = mv/(qB)","r = qB/(mv)","r = mvB/q","r = qv/(mB)","Equating magnetic force qvB to centripetal force mv²/r and solving for r gives r=mv/(qB), with charge sign affecting rotation direction rather than radius.");
add("em-12.3-05","U12","12.3","Magnetic Fields of Current-Carrying Wires and the Biot-Savart Law","2.A","For a circular loop of radius R carrying current I, which expression for the magnetic field at the center results from integrating the Biot-Savart law around the loop?","B = μ₀I/(2R)","B = μ₀I/(4πR)","B = μ₀IR/2","B = μ₀I/(2R²)","At the center each current element is perpendicular to the radius and contributes in the same axial direction; integrating μ₀I dl/(4πR²) around length 2πR gives μ₀I/(2R).");
add("em-13.4-05","U13","13.4","Inductance","2.A","A coil has flux linkage NΦB proportional to current I. Which expression defines its self-inductance L and leads to the induced-emf law?","L = NΦB/I","L = I/(NΦB)","L = N I ΦB","L = NΦB I","Self-inductance is the proportionality constant between flux linkage and current, NΦB=LI, so L=NΦB/I; differentiating gives the self-induced emf −L dI/dt.");
add("em-13.6-05","U13","13.6","Circuits with Capacitors and Inductors (LC Circuits)","2.A","For an ideal LC circuit, applying the loop rule gives Q/C+L(dI/dt)=0 with I=dQ/dt. Which angular frequency follows for charge oscillations?","ω = 1/√(LC)","ω = √(L/C)","ω = 1/(LC)","ω = √(LC)","Substituting I=dQ/dt gives L d²Q/dt²+Q/C=0, or d²Q/dt²+Q/(LC)=0. Comparing with simple harmonic motion yields ω=1/√(LC).");
'''
if marker not in s: raise SystemExit('marker missing')
s=s.replace(marker,extra+'\n'+marker)
p.write_text(s)
