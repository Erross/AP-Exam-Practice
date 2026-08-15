from pathlib import Path

p=Path('data/ap-psychology.js')
s=p.read_text()
needle="""    const stimulus=`Synthetic study — ${name}: Group A (n=40) had a mean outcome score of ${a}; Group B (n=40) had a mean outcome score of ${b}. Participants were recruited from one local school. The values are invented for practice.`;"""
insert="""    const mq=`A second research team studying ${name.toLowerCase()} wants its procedure to be replicable. Which choice best improves the methodological clarity of the study?`;
    const mo=['state exactly how each measured variable is operationally defined','describe the expected conclusion before collecting any observations','replace the participant sample with a single illustrative case','omit procedural details so later researchers remain unbiased'];
    const me='Clear operational definitions specify exactly how variables are measured or manipulated, allowing other researchers to reproduce the procedure and evaluate whether the measures appropriately represent the intended constructs.';
    Q.push(item(`psy-${code.replace('.','')}-m7`,unit,code,idx%2===0?'2.B':'2.C',mq,mo,0,me,{synthetic:true}));

"""+needle
assert needle in s
p.write_text(s.replace(needle,insert,1))

p=Path('js/subjects.js')
s=p.read_text()
old='''  {
    id: "ap-psychology",
    name: "AP Psychology",
    category: "History & Social Sciences",
    tier: 1,
    mcqCount: 75,
    mcqTimeMinutes: 90,
    totalExamTimeLabel: "2h 40m",
    formatVerified: false,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
    dataVar: "QUESTIONS_AP_PSYCHOLOGY",
  },'''
new='''  {
    id: "ap-psychology",
    name: "AP Psychology",
    category: "History & Social Sciences",
    tier: 1,
    // VERIFIED 2026-08-15 against the current AP Psychology CED (clarified Fall 2025)
    // and current AP Central exam page. Section I: 75 digital MCQs / 90 minutes.
    mcqCount: 75,
    mcqTimeMinutes: 90,
    totalExamTimeLabel: "2h 40m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    calculatorAllowed: false,
    tierNote: "Calculator not permitted on the AP Psychology exam.",
    units: [
      { id:"U1", name:"Biological Bases of Behavior", examWeight:0.20, examWeightRange:[0.15,0.25] },
      { id:"U2", name:"Cognition", examWeight:0.20, examWeightRange:[0.15,0.25] },
      { id:"U3", name:"Development and Learning", examWeight:0.20, examWeightRange:[0.15,0.25] },
      { id:"U4", name:"Social Psychology and Personality", examWeight:0.20, examWeightRange:[0.15,0.25] },
      { id:"U5", name:"Mental and Physical Health", examWeight:0.20, examWeightRange:[0.15,0.25] },
    ],
    // Current CED MCQ practice mix: approximately P1 65%, P2 25%, P3 10%; P4 is FRQ-only.
    skillCountRanges: { "1":[48,50], "2":[18,20], "3":[7,8] },
    constraintDrawAttempts: 20000,
    dataVar: "QUESTIONS_AP_PSYCHOLOGY",
  },'''
assert old in s
p.write_text(s.replace(old,new,1))
