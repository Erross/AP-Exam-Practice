const fs=require('node:fs');
const p='js/subjects.js';
let s=fs.readFileSync(p,'utf8');
const old=`  {
    id: "ap-macroeconomics",
    name: "AP Macroeconomics",
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
    dataVar: "QUESTIONS_AP_MACROECONOMICS",
  },`;
const replacement=`  {
    id: "ap-macroeconomics",
    name: "AP Macroeconomics",
    category: "History & Social Sciences",
    tier: 1,
    // VERIFIED 2026-08-15 against the AP Macroeconomics CED effective Fall 2026
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
      { id:"U1", name:"Basic Economic Concepts", examWeight:5/60, examWeightRange:[0.05,0.10] },
      { id:"U2", name:"Economic Indicators and the Business Cycle", examWeight:9/60, examWeightRange:[0.12,0.17] },
      { id:"U3", name:"National Income and Price Determination", examWeight:13/60, examWeightRange:[0.17,0.27] },
      { id:"U4", name:"Financial Sector", examWeight:12/60, examWeightRange:[0.18,0.23] },
      { id:"U5", name:"Long-Run Consequences of Stabilization Policies", examWeight:14/60, examWeightRange:[0.20,0.30] },
      { id:"U6", name:"Open Economy—International Trade and Finance", examWeight:7/60, examWeightRange:[0.10,0.13] },
    ],
    skillCountRanges: { "1":[18,24], "2":[15,19], "3":[18,24] },
    attributeRanges: { numericalAnalysis: { "true":[10,12] } },
    constraintDrawAttempts: 10000,
    dataVar: "QUESTIONS_AP_MACROECONOMICS",
  },`;
if(!s.includes(old)) throw new Error('Macro stub not found');
fs.writeFileSync(p,s.replace(old,replacement));
