from pathlib import Path

p=Path('data/ap-physics-c-em.js')
s=p.read_text(encoding='utf-8')

def replace_in_id(qid, old, new):
    global s
    lines=s.splitlines()
    hits=[i for i,line in enumerate(lines) if f'"{qid}"' in line and line.lstrip().startswith(('add(','addSet('))]
    if len(hits)!=1:
        raise SystemExit(f'{qid}: expected one item line, got {len(hits)}')
    i=hits[0]
    if lines[i].count(old)!=1:
        raise SystemExit(f'{qid}: expected substring once, got {lines[i].count(old)}: {old}')
    lines[i]=lines[i].replace(old,new)
    s='\n'.join(lines)+'\n'

# Clear mistag: this makes a model-based claim about E when V=0; it does not compare a quantity across scenarios.
replace_in_id('em-9.2-02', '"2.C","At a point equidistant from charges +Q and −Q, the electric potential is zero. Which statement about the electric field there is necessarily true?"', '"3.B","At a point equidistant from charges +Q and −Q, the electric potential is zero. Which claim about the electric field at that point follows from the distinction between scalar potential and vector field?"')

# Data-to-model items apply a law/model to make a claim (3.B), not derive a new symbolic expression (2.A).
for qid, oldq, newq in [
('em-set-u8-03','"2.A","Which point-charge expression has the radial dependence observed in the table?"','"3.B","Which point-charge model is most consistent with the radial dependence observed in the table?"'),
('em-set-u9-03','"2.A","Which theoretical expression is consistent with the measured potential outside the source charge?"','"3.B","Which point-charge model is most consistent with the measured potential outside the source charge?"'),
('em-set-u12-02','"2.A","Which expression predicts the observed speed dependence when velocity is perpendicular to the field?"','"3.B","Which magnetic-force model best accounts for the observed speed dependence when velocity is perpendicular to the field?"'),
('em-set-u13-03','"2.A","Which law gives the relationship observed in the table?"','"3.B","Which induction law best accounts for the relationship observed in the table?"'),
]: replace_in_id(qid, oldq, newq)

# Make selected 2.A prompts require the mathematical pathway rather than bare equation recall.
reph = {
'em-8.3-04': ('"For an infinite line with uniform linear charge density λ, which expression gives the field a perpendicular distance r away?"','"A Gaussian cylinder of radius r and length L surrounds an infinite line with uniform linear charge density λ. Using E(2πrL)=λL/ε₀, which expression follows for the field magnitude?"'),
'em-9.2-03': ('"For a one-dimensional electrostatic potential V(x), which relationship gives the x-component of electric field?"','"For an infinitesimal displacement dx along the x-axis, electrostatics gives dV=−Eₓdx. Dividing by dx and taking the differential limit, which relationship follows?"'),
'em-10.3-02': ('"Ignoring fringing, which expression gives the capacitance of a vacuum parallel-plate capacitor with plate area A and separation d?"','"For vacuum parallel plates, use Q=σA, E=σ/ε₀, ΔV=Ed, and C=Q/ΔV. Eliminating σ and ΔV, which expression for C follows?"'),
'em-10.4-03': ('"A dielectric of relative permittivity κ completely fills the gap of a parallel-plate capacitor of area A and separation d. Which expression gives its capacitance?"','"A dielectric-filled parallel-plate capacitor has E=Q/(κε₀A), ΔV=Ed, and C=Q/ΔV. Eliminating E and ΔV, which capacitance expression follows?"'),
'em-11.2-03': ('"Three resistors R₁, R₂, and R₃ are connected in parallel. Which expression gives the equivalent resistance?"','"For three parallel resistors, each branch has the same voltage V and I_total=I₁+I₂+I₃. Substituting I=V/R and eliminating V, which expression for R_eq follows?"'),
'em-11.4-02': ('"Which expression gives the power dissipated by a resistor R directly in terms of the potential difference V across it?"','"Starting with P=IV and Ohm’s law V=IR, eliminate I to express the power dissipated by resistor R only in terms of V and R. Which expression follows?"'),
'em-11.7-03': ('"Using signed branch currents with positive values defined as leaving a junction, which equation expresses Kirchhoff\'s junction rule?"','"At a steady junction no charge accumulates, so dQ_node/dt=0. If signed branch currents are positive when leaving the junction, which equation follows from charge conservation?"'),
'em-12.3-01': ('"Which differential expression is the Biot-Savart law for the magnetic field produced by a current element I dℓ at displacement vector r from the element?"','"A current element produces dB with magnitude (μ₀/4π)I dℓ sinθ/r², directed along dℓ×r̂. Which vector expression combines that magnitude and direction?"'),
'em-13.1-03': ('"For a nonuniform magnetic field passing through a surface, which expression defines the magnetic flux?"','"Divide a surface into differential elements dA. Summing the normal contributions B cosθ dA and taking the continuum limit gives which expression for magnetic flux?"'),
'em-13.2-02': ('"Which expression gives the instantaneous induced emf in an N-turn coil when the magnetic flux through each turn varies with time?"','"For one turn, Faraday–Lenz induction gives ε=−dΦB/dt. If N identical turns each link the same flux ΦB, which expression follows for the total induced emf?"'),
'em-13.3-03': ('"A rod of length L moves with velocity v through magnetic field B. Which integral gives the motional emf between its ends in the general case?"','"Magnetic force per unit charge on carriers in a moving rod is v×B. Integrating the force-per-charge component along differential length dl gives which general expression for motional emf?"'),
'em-13.4-02': ('"Which expression gives the magnetic energy stored in an ideal inductor of inductance L carrying current I?"','"For an ideal inductor, V=L(dI/dt) and P=IV. Integrating the delivered power as current rises from 0 to I gives which expression for stored magnetic energy?"'),
'em-13.6-02': ('"Which differential equation describes the charge q on the capacitor in an ideal LC circuit?"','"For an ideal LC loop, q/C+L(dI/dt)=0 and I=dq/dt. Substituting for I and dividing by L gives which differential equation for q?"'),
}
for qid,(old,new) in reph.items(): replace_in_id(qid,old,new)

# Replace recall-only Ampere item with an actual symbolic application/derivation.
lines=s.splitlines(); hits=[i for i,l in enumerate(lines) if '"em-12.4-01"' in l and l.lstrip().startswith('add(')]
if len(hits)!=1: raise SystemExit(f'em-12.4-01 hits={len(hits)}')
lines[hits[0]]='add("em-12.4-01","U12","12.4","Ampère\'s Law","2.A","A circular Amperian loop of radius r surrounds a very long straight wire carrying current I. Symmetry makes B tangent to the loop and constant in magnitude. Which equation follows directly from ∮B·dℓ=μ₀Ienc before solving for B?","B(2πr) = μ₀I","B(πr²) = μ₀I","B(2πr) = I/μ₀","B/r = μ₀I","On the concentric circular path, B is tangent to dℓ and has constant magnitude, so ∮B·dℓ=B(2πr). With enclosed current I, Ampère\'s law therefore gives B(2πr)=μ₀I.");'
s='\n'.join(lines)+'\n'

p.write_text(s,encoding='utf-8')
print('applied E&M clean-room semantic repairs')
