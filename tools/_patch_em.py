from pathlib import Path
import re
p=Path('js/subjects.js')
s=p.read_text()
pat=r'  \{\n    id: "ap-physics-c-em",.*?    dataVar: "QUESTIONS_AP_PHYSICS_C_EM",\n  \},'
rep='''  {
    id: "ap-physics-c-em",
    name: "AP Physics C: Electricity and Magnetism",
    category: "Sciences",
    tier: 1,
    // VERIFIED 2026-08-17 for May 2027 against AP Central course/exam pages,
    // 2026 Course at a Glance, and Fall 2026 clarifications.
    mcqCount: 42,
    mcqTimeMinutes: 85,
    totalExamTimeLabel: "3h 0m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    calculatorAllowed: true,
    tierNote: "Calculators are permitted throughout this practice section.",
    units: [
      { id:"U8", name:"Electric Charges, Fields, and Gauss's Law", examWeight:0.20, examWeightRange:[0.15,0.25] },
      { id:"U9", name:"Electric Potential", examWeight:0.15, examWeightRange:[0.10,0.20] },
      { id:"U10", name:"Conductors and Capacitors", examWeight:0.125, examWeightRange:[0.10,0.15] },
      { id:"U11", name:"Electric Circuits", examWeight:0.20, examWeightRange:[0.15,0.25] },
      { id:"U12", name:"Magnetic Fields and Electromagnetism", examWeight:0.15, examWeightRange:[0.10,0.20] },
      { id:"U13", name:"Electromagnetic Induction", examWeight:0.15, examWeightRange:[0.10,0.20] },
    ],
    skillCountRanges: { "2.A":[11,12], "2.B":[9,10], "2.C":[5,6], "2.D":[5,6], "3.B":[7,10], "3.C":[3,4] },
    stimulusSetRange: [2,4],
    constraintDrawAttempts: 30000,
    freeResponse: { timeMinutes:95, questions:["Mathematical Routines","Translation Between Representations","Experimental Design and Analysis","Qualitative/Quantitative Translation"] },
    dataVar: "QUESTIONS_AP_PHYSICS_C_EM",
  },'''
s2,n=re.subn(pat,rep,s,flags=re.S)
if n!=1: raise SystemExit(f'replaced {n} blocks')
p.write_text(s2)
