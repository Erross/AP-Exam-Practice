const fs=require('node:fs');
const path='js/subjects.js';
let s=fs.readFileSync(path,'utf8');
const old=`  {
    id: "ap-us-history",
    name: "AP United States History",
    category: "History & Social Sciences",
    tier: 1,
    mcqCount: 55,
    mcqTimeMinutes: 55,
    totalExamTimeLabel: "3h 15m",
    formatVerified: false,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
    dataVar: "QUESTIONS_AP_US_HISTORY",
  },`;
const replacement=`  {
    id: "ap-us-history",
    name: "AP United States History",
    category: "History & Social Sciences",
    tier: 1,
    // VERIFIED 2026-08-19 against the current AP U.S. History CED, AP Central
    // exam page, and May 2027 history-exam update. Section I Part A remains
    // 55 MCQs / 55 minutes / 40%, primarily in 3–4 question source sets.
    mcqCount: 55,
    mcqTimeMinutes: 55,
    totalExamTimeLabel: "3h 15m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    calculatorAllowed: false,
    tierNote: "Source-based Section I Part A practice only. The official fully digital exam also includes three short-answer questions, a document-based question, and a long essay.",
    units: [
      { id:"U1", name:"Period 1: 1491–1607", examWeight:3/55, examWeightRange:[0.04,0.06] },
      { id:"U2", name:"Period 2: 1607–1754", examWeight:4/55, examWeightRange:[0.06,0.08] },
      { id:"U3", name:"Period 3: 1754–1800", examWeight:8/55, examWeightRange:[0.10,0.17] },
      { id:"U4", name:"Period 4: 1800–1848", examWeight:8/55, examWeightRange:[0.10,0.17] },
      { id:"U5", name:"Period 5: 1844–1877", examWeight:8/55, examWeightRange:[0.10,0.17] },
      { id:"U6", name:"Period 6: 1865–1898", examWeight:7/55, examWeightRange:[0.10,0.17] },
      { id:"U7", name:"Period 7: 1890–1945", examWeight:7/55, examWeightRange:[0.10,0.17] },
      { id:"U8", name:"Period 8: 1945–1980", examWeight:7/55, examWeightRange:[0.10,0.17] },
      { id:"U9", name:"Period 9: 1980–Present", examWeight:3/55, examWeightRange:[0.04,0.06] },
    ],
    attributeRanges: { unit: { U1:[3,3], U2:[4,4], U3:[8,8], U4:[8,8], U5:[8,8], U6:[7,7], U7:[7,7], U8:[7,7], U9:[3,3] } },
    constraintDrawAttempts: 30000,
    freeResponse: { timeMinutes:140, questions:["Short Answer 1","Short Answer 2","Short Answer 3","Document-Based Question","Long Essay"] },
    dataVar: "QUESTIONS_AP_US_HISTORY",
  },`;
if(!s.includes(old)) throw new Error('APUSH stub not found exactly');
s=s.replace(old,replacement);
fs.writeFileSync(path,s);
