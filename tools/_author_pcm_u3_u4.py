from pathlib import Path
import json

SUBJECT_OLD = '''  {
    id: "ap-physics-c-mechanics",
    name: "AP Physics C: Mechanics",
    category: "Sciences",
    tier: 1,
    // VERIFIED 2026-08-09: apstudents.collegeboard.org/courses/ap-physics-c-mechanics/assessment
    // — Section I: Multiple Choice, 42 questions, 1hr 25mins, 50% of score; total duration 3hrs.
    // Previous repo value (35 / 45 min) predates the 2024-25 redesign that doubled exam length.
    mcqCount: 42,
    mcqTimeMinutes: 85,
    totalExamTimeLabel: "3h 0m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
    dataVar: "QUESTIONS_AP_PHYSICS_C_MECHANICS",
  },
'''
SUBJECT_NEW = '''  {
    id: "ap-physics-c-mechanics",
    name: "AP Physics C: Mechanics",
    category: "Sciences",
    tier: 1,
    // VERIFIED 2026-08-17 for the May 2027 exam against the current AP Central
    // course page, 2026 Course at a Glance, and Fall 2026 clarification.
    // Section I: 42 MCQs / 85 minutes; Section II: 4 FRQs / 95 minutes.
    mcqCount: 42,
    mcqTimeMinutes: 85,
    totalExamTimeLabel: "3h 0m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    calculatorAllowed: true,
    tierNote: "Four-function, scientific, or graphing calculators are permitted throughout this practice section.",
    units: [
      { id:"U1", name:"Kinematics", examWeight:5/42, examWeightRange:[0.10,0.15] },
      { id:"U2", name:"Force and Translational Dynamics", examWeight:9/42, examWeightRange:[0.20,0.25] },
      { id:"U3", name:"Work, Energy, and Power", examWeight:8/42, examWeightRange:[0.15,0.25] },
      { id:"U4", name:"Linear Momentum", examWeight:6/42, examWeightRange:[0.10,0.20] },
      { id:"U5", name:"Torque and Rotational Dynamics", examWeight:5/42, examWeightRange:[0.10,0.15] },
      { id:"U6", name:"Energy and Momentum of Rotating Systems", examWeight:5/42, examWeightRange:[0.10,0.15] },
      { id:"U7", name:"Oscillations", examWeight:4/42, examWeightRange:[0.10,0.15] },
    ],
    attributeRanges: { skill: {
      "2.A":[11,12], "2.B":[9,10], "2.C":[5,6], "2.D":[5,6], "3.B":[7,10], "3.C":[3,4]
    } },
    stimulusSetRange: [2,4],
    constraintDrawAttempts: 30000,
    freeResponse: { timeMinutes:95, questions:[
      "Question 1 (Mathematical Routines)",
      "Question 2 (Translation Between Representations)",
      "Question 3 (Experimental Design and Analysis)",
      "Question 4 (Qualitative/Quantitative Translation)",
    ] },
    dataVar: "QUESTIONS_AP_PHYSICS_C_MECHANICS",
  },
'''

Q = [
("pcm-3.1-01","U3","3.1","Translational Kinetic Energy","2.B","A 3 kg particle moves at 4 m/s. What is its translational kinetic energy?",["6 J","12 J","24 J","48 J"],2,"Translational kinetic energy is K=(1/2)mv^2. Substituting 3 kg and 4 m/s gives (1/2)(3)(16)=24 J."),
("pcm-3.1-02","U3","3.1","Translational Kinetic Energy","2.A","A particle has momentum magnitude p and mass m. Which expression gives its nonrelativistic kinetic energy?",["p/m","p^2/(2m)","pm/2","2p^2/m"],1,"Using p=mv in K=(1/2)mv^2 gives K=p^2/(2m). This relation follows directly from the nonrelativistic definitions of momentum and kinetic energy."),
("pcm-3.1-03","U3","3.1","Translational Kinetic Energy","2.D","At fixed mass, a particle's speed doubles. By what factor does its translational kinetic energy change?",["2","4","8","1/2"],1,"Because K=(1/2)mv^2, kinetic energy is proportional to the square of speed at fixed mass. Doubling speed therefore multiplies K by four."),
("pcm-3.2-01","U3","3.2","Work","2.B","A constant 10 N force acts parallel to a particle's 3 m displacement. How much work does the force do?",["3 J","10 J","30 J","300 J"],2,"For a constant force parallel to displacement, W=Fd cos0=(10 N)(3 m)=30 J. The cosine factor is one because the vectors are parallel."),
("pcm-3.2-02","U3","3.2","Work","2.A","A one-dimensional force varies as F(x)=kx. What work does it do from x=0 to x=a?",["ka","ka^2","(1/2)ka^2","(1/2)k^2a"],2,"Variable-force work is the integral of force over displacement: W=integral_0^a kx dx=(1/2)ka^2."),
("pcm-3.2-03","U3","3.2","Work","3.B","A force is always perpendicular to a particle's instantaneous displacement along a circular path. What work does that force do?",["Positive work","Negative work","Zero work","Work equal to force times circumference"],2,"Infinitesimal work is dW=F dot dr. If force remains perpendicular to the displacement at every instant, the dot product is zero and so is the total work."),
("pcm-3.3-01","U3","3.3","Potential Energy","2.A","A conservative force in one dimension is F(x)=-dU/dx. If U(x)=ax^2, what is F(x)?",["-2ax","-ax","2ax","a/x"],0,"Differentiating U=ax^2 gives dU/dx=2ax, and the conservative-force relation adds a minus sign: F=-2ax."),
("pcm-3.3-02","U3","3.3","Potential Energy","3.B","At a stable equilibrium point of a one-dimensional potential-energy curve, which statement is correct?",["U is at a local maximum","U is at a local minimum","dU/dx is nonzero","The force must be largest"],1,"Stable equilibrium occurs at a local minimum of potential energy: the slope is zero there, and small displacements produce restoring forces toward the equilibrium point."),
("pcm-3.3-03","U3","3.3","Potential Energy","2.C","Two points A and B have gravitational potential energies 12 J and 5 J. How does the work done by gravity from A to B compare with that from B to A?",["Both are +7 J","A to B is +7 J and B to A is -7 J","Both are -7 J","A to B is -7 J and B to A is +7 J"],1,"For a conservative force W=-Delta U. Moving from 12 J to 5 J gives +7 J of gravitational work; reversing the path changes the sign to -7 J."),
("pcm-3.4-01","U3","3.4","Conservation of Energy","2.B","A 2 kg block starts from rest and slides down a frictionless track through a vertical drop of 5 m. Using g=10 m/s^2, what is its speed at the bottom?",["5 m/s","10 m/s","20 m/s","50 m/s"],1,"Mechanical energy conservation gives mgh=(1/2)mv^2. Thus v=sqrt(2gh)=sqrt(100)=10 m/s; the mass cancels."),
("pcm-3.4-02","U3","3.4","Conservation of Energy","3.B","A block slides on a rough horizontal surface and slows. Which energy statement correctly describes a system containing the block and surface?",["Total energy disappears","Kinetic energy is transformed into thermal energy","Mechanical energy must remain constant","Thermal energy decreases"],1,"Friction converts organized kinetic energy into internal thermal energy within the block-surface system. Total energy is conserved even though mechanical energy decreases."),
("pcm-3.4-03","U3","3.4","Conservation of Energy","2.D","A spring launches identical blocks from compressions x and 2x on a frictionless surface. How do the launch speeds compare?",["The 2x case has twice the speed","The 2x case has four times the speed","The speeds are equal","The 2x case has sqrt(2) times the speed"],0,"Spring energy is (1/2)kx^2 and becomes (1/2)mv^2, so v is proportional to x. Doubling compression therefore doubles launch speed."),
("pcm-3.5-01","U3","3.5","Power","2.B","A motor does 600 J of work in 3 s at constant average rate. What is its average power?",["50 W","200 W","600 W","1800 W"],1,"Average power is work divided by elapsed time: P_avg=W/Delta t=600 J/3 s=200 W."),
("pcm-3.5-02","U3","3.5","Power","2.A","A force F acts on a particle moving with instantaneous velocity v. Which expression gives instantaneous power?",["F cross v","F dot v","F/v","Fv^2"],1,"Instantaneous power is dW/dt. Since dW=F dot dr and dr/dt=v, power is P=F dot v."),
("pcm-3.5-03","U3","3.5","Power","2.D","A car experiences a constant resistive force while traveling at steady speed. If its speed doubles, how does the engine power required to maintain steady motion change?",["It halves","It stays the same","It doubles","It quadruples"],2,"At steady speed engine force balances the constant resistance, and P=Fv. With F unchanged, doubling v doubles the required power."),
("pcm-4.1-01","U4","4.1","Linear Momentum","2.B","A 0.50 kg ball moves at 8 m/s east. What is its momentum?",["4 kg m/s east","8 kg m/s east","16 kg m/s east","0.0625 kg m/s east"],0,"Momentum is p=mv. Multiplying 0.50 kg by 8 m/s gives 4 kg m/s in the same eastward direction as the velocity."),
("pcm-4.1-02","U4","4.1","Linear Momentum","2.C","Objects A and B have equal kinetic energy, but B has four times A's mass. How do their momentum magnitudes compare?",["They are equal","B has twice A's momentum","B has four times A's momentum","B has half A's momentum"],1,"From K=p^2/(2m), equal kinetic energy gives p proportional to sqrt(m). Increasing mass by a factor of four therefore doubles momentum magnitude."),
("pcm-4.1-03","U4","4.1","Linear Momentum","3.B","For a system of particles, total linear momentum equals which quantity?",["The scalar sum of individual momenta","The vector sum of individual momenta","Total mass times each particle's velocity","The time derivative of kinetic energy"],1,"System momentum is defined as the vector sum of the momenta of all constituent particles. Direction matters, so opposing momenta can partially or completely cancel."),
("pcm-4.2-01","U4","4.2","Change in Momentum and Impulse","2.B","A constant 12 N force acts on an object for 0.50 s. What impulse is delivered?",["6 N s","12 N s","24 N s","0.042 N s"],0,"Impulse is the time integral of force. For constant force, J=F Delta t=(12 N)(0.50 s)=6 N s, equal to the change in momentum."),
("pcm-4.2-02","U4","4.2","Change in Momentum and Impulse","2.A","A time-dependent force F(t) acts from t1 to t2. Which expression gives the object's momentum change?",["integral F dt","integral F dx","F(t2)-F(t1)","integral t dF"],0,"The impulse-momentum theorem gives Delta p=J=integral from t1 to t2 of F(t) dt. It is the signed area under the force-time graph."),
("pcm-4.2-03","U4","4.2","Change in Momentum and Impulse","2.D","The same momentum change is produced over twice the time interval. How does the average net force change?",["It doubles","It halves","It quadruples","It is unchanged"],1,"Average force satisfies Delta p=F_avg Delta t. For the same momentum change, doubling the time interval requires half the average force."),
("pcm-4.3-01","U4","4.3","Conservation of Linear Momentum","2.B","A 2 kg cart moving at 6 m/s right sticks to a 4 kg cart initially at rest. What is their common speed immediately after?",["1 m/s","2 m/s","3 m/s","6 m/s"],1,"Momentum conservation gives (2)(6)=(2+4)v. Thus 12=6v and the joined carts move right at 2 m/s."),
("pcm-4.3-02","U4","4.3","Conservation of Linear Momentum","3.B","When is total momentum of a chosen system conserved?",["Whenever kinetic energy is conserved","When net external impulse on the system is zero","Only when objects do not interact","Only in elastic collisions"],1,"A system's total momentum changes by the net external impulse. Internal forces may be large, but if external impulse is zero, total momentum remains constant."),
("pcm-4.3-03","U4","4.3","Conservation of Linear Momentum","2.C","An explosion separates an initially stationary object into two fragments. One fragment has momentum p east. What is the other fragment's momentum?",["p east","p west","2p west","zero"],1,"The initial total momentum is zero. With negligible external impulse, the fragment momenta must sum vectorially to zero, so the second fragment has momentum p west."),
("pcm-4.4-01","U4","4.4","Elastic and Inelastic Collisions","3.B","Which quantity is conserved in an isolated perfectly inelastic collision but generally not conserved as mechanical energy?",["Kinetic energy","Linear momentum","Speed of each object","Acceleration"],1,"Linear momentum is conserved for an isolated collision regardless of elasticity. In a perfectly inelastic collision some initial kinetic energy becomes internal energy and deformation."),
("pcm-4.4-02","U4","4.4","Elastic and Inelastic Collisions","2.B","A 1 kg cart moving at 4 m/s collides elastically head-on with an identical stationary cart. What is the first cart's speed afterward?",["0 m/s","2 m/s","4 m/s","8 m/s"],0,"For a one-dimensional elastic collision between equal masses when one starts at rest, the carts exchange velocities. The incoming cart therefore stops while the target leaves at 4 m/s."),
("pcm-4.4-03","U4","4.4","Elastic and Inelastic Collisions","3.C","Two collision trials have the same initial and final total momentum. In trial A the total kinetic energy is also unchanged; in trial B it decreases. Which classification is supported?",["Both are elastic","A is elastic and B is inelastic","A is inelastic and B is elastic","Both are perfectly inelastic"],1,"Momentum conservation alone does not determine elasticity. Trial A also conserves kinetic energy and is elastic; trial B loses kinetic energy and is therefore inelastic."),
]

# patch metadata
sp = Path('js/subjects.js')
s = sp.read_text()
if SUBJECT_OLD not in s:
    raise SystemExit('expected old Mechanics metadata block not found')
sp.write_text(s.replace(SUBJECT_OLD, SUBJECT_NEW, 1))

# append questions before export
bp = Path('data/ap-physics-c-mechanics.js')
b = bp.read_text()
marker = '  window.QUESTIONS_AP_PHYSICS_C_MECHANICS = QUESTIONS;\n'
if marker not in b:
    raise SystemExit('bank export marker not found')
lines=[]
for q in Q:
    args = ','.join(json.dumps(x, ensure_ascii=False) for x in q)
    lines.append('  p(' + args + ');')
block='\n  // Units 3-4 — Work/Energy/Power and Linear Momentum\n'+'\n'.join(lines)+'\n\n'
bp.write_text(b.replace(marker, block+marker, 1))
