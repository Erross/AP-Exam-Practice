const fs=require('node:fs');
const p='js/subjects.js';
let s=fs.readFileSync(p,'utf8');
const old=`  {
    id: "ap-microeconomics",
    name: "AP Microeconomics",
    category: "History & Social Sciences",
    tier: 1,
    mcqCount: 60,
    mcqTimeMinutes: 70,
    totalExamTimeLabel: "2h 10m",
    formatVerified: false,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
    dataVar: "QUESTIONS_AP_MICROECONOMICS",
  },`;
const replacement=`  {
    id: "ap-microeconomics",
    name: "AP Microeconomics",
    category: "History & Social Sciences",
    tier: 1,
    // VERIFIED 2026-08-15 against the AP Microeconomics CED effective Fall 2026
    // and current AP Central exam page. Section I: 60 MCQs / 70 minutes.
    mcqCount: 60,
    mcqTimeMinutes: 70,
    totalExamTimeLabel: "2h 10m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    calculatorAllowed: true,
    calculatorExpected: true,
    tierNote: "Four-function calculator permitted throughout this practice section.",
    units: [
      { id:"U1", name:"Basic Economic Concepts", examWeight:8/60, examWeightRange:[0.12,0.15] },
      { id:"U2", name:"Supply and Demand", examWeight:14/60, examWeightRange:[0.20,0.25] },
      { id:"U3", name:"Production, Cost, and the Perfect Competition Model", examWeight:14/60, examWeightRange:[0.22,0.25] },
      { id:"U4", name:"Imperfect Competition", examWeight:10/60, examWeightRange:[0.15,0.22] },
      { id:"U5", name:"Factor Markets", examWeight:7/60, examWeightRange:[0.10,0.13] },
      { id:"U6", name:"Market Failure and the Role of Government", examWeight:7/60, examWeightRange:[0.08,0.13] },
    ],
    skillCountRanges: { "1":[18,25], "2":[23,28], "3":[10,15] },
    attributeRanges: { numericalAnalysis: { "true":[12,18] } },
    constraintDrawAttempts: 10000,
    dataVar: "QUESTIONS_AP_MICROECONOMICS",
  },`;
if(!s.includes(old)) throw new Error('Micro stub not found');
fs.writeFileSync(p,s.replace(old,replacement));
