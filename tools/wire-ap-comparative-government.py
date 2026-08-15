from pathlib import Path
p=Path('js/subjects.js')
s=p.read_text()
old='''  {
    id: "ap-comparative-government",
    name: "AP Comparative Government and Politics",
    category: "History & Social Sciences",
    tier: 1,
    mcqCount: 55,
    mcqTimeMinutes: 60,
    totalExamTimeLabel: "2h 30m",
    formatVerified: false,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
    dataVar: "QUESTIONS_AP_COMPARATIVE_GOVERNMENT",
  },'''
new='''  {
    id: "ap-comparative-government",
    name: "AP Comparative Government and Politics",
    category: "History & Social Sciences",
    tier: 1,
    // VERIFIED 2026-08-15 against the CED effective Fall 2026 and AP Central exam page.
    // Section I: 55 questions / 60 minutes. Individual questions plus exactly
    // 3 quantitative-analysis sets and 2 qualitative text-source sets.
    mcqCount: 55,
    mcqTimeMinutes: 60,
    totalExamTimeLabel: "2h 30m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    calculatorAllowed: false,
    tierNote: "Covers China, Iran, Mexico, Nigeria, Russia, and the United Kingdom, including quantitative and text-source analysis.",
    units: [
      { id:"U1", name:"Political Systems, Regimes, and Governments", examWeight:12/55, examWeightRange:[0.18,0.27] },
      { id:"U2", name:"Political Institutions", examWeight:15/55, examWeightRange:[0.22,0.33] },
      { id:"U3", name:"Political Culture and Participation", examWeight:8/55, examWeightRange:[0.11,0.18] },
      { id:"U4", name:"Party and Electoral Systems and Citizen Organizations", examWeight:9/55, examWeightRange:[0.13,0.18] },
      { id:"U5", name:"Political and Economic Changes and Development", examWeight:11/55, examWeightRange:[0.16,0.24] },
    ],
    // 55-question integer envelopes for the published MCQ practice bands:
    // P1 40-55%, P2 25-32%, P3 10-16%, P4 9-11%; P5 is FRQ-only.
    skillCountRanges: { "1":[22,30], "2":[14,17], "3":[6,8], "4":[5,6] },
    examBlueprint: { sets: { quantitative:3, foundational:0, text:2, visual:0 } },
    constraintDrawAttempts: 10000,
    dataVar: "QUESTIONS_AP_COMPARATIVE_GOVERNMENT",
  },'''
if old not in s: raise SystemExit('Comparative Government registry block not found')
p.write_text(s.replace(old,new))
