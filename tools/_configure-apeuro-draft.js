const fs = require('node:fs');

const subjectsPath = 'js/subjects.js';
let s = fs.readFileSync(subjectsPath, 'utf8');
const startMarker = '  {\n    id: "ap-european-history",';
const endMarker = '    dataVar: "QUESTIONS_AP_EUROPEAN_HISTORY",\n  },';
const start = s.indexOf(startMarker);
if (start < 0) throw new Error('AP Euro registry start not found');
const end0 = s.indexOf(endMarker, start);
if (end0 < 0) throw new Error('AP Euro registry end not found');
const end = end0 + endMarker.length;
const replacement = `  {
    id: "ap-european-history",
    name: "AP European History",
    category: "History & Social Sciences",
    tier: 1,
    // VERIFIED 2026-08-19 against the AP European History CED effective Fall 2026
    // and current AP Central exam/update pages. May 2027 leaves Section I Part A
    // unchanged: 55 MCQs / 55 minutes / 40%, usually in 3–4 question source sets.
    // All nine units carry published 10–15% MCQ bands. This development blueprint
    // uses 6 questions from U1-U8 and 7 from U9; every delivered share is in-band.
    mcqCount: 55,
    mcqTimeMinutes: 55,
    totalExamTimeLabel: "3h 15m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    calculatorAllowed: false,
    tierNote: "Source-based Section I Part A practice only. The official fully digital exam also includes three short-answer questions, a document-based question, and a long essay.",
    units: [
      { id:"U1", name:"Renaissance and Exploration", examWeight:6/55, examWeightRange:[0.10,0.15] },
      { id:"U2", name:"Age of Reformation", examWeight:6/55, examWeightRange:[0.10,0.15] },
      { id:"U3", name:"Absolutism and Constitutionalism", examWeight:6/55, examWeightRange:[0.10,0.15] },
      { id:"U4", name:"Scientific, Philosophical, and Political Developments", examWeight:6/55, examWeightRange:[0.10,0.15] },
      { id:"U5", name:"Conflict, Crisis, and Reaction in the Late 18th Century", examWeight:6/55, examWeightRange:[0.10,0.15] },
      { id:"U6", name:"Industrialization and Its Effects", examWeight:6/55, examWeightRange:[0.10,0.15] },
      { id:"U7", name:"19th-Century Perspectives and Political Developments", examWeight:6/55, examWeightRange:[0.10,0.15] },
      { id:"U8", name:"20th-Century Global Conflicts", examWeight:6/55, examWeightRange:[0.10,0.15] },
      { id:"U9", name:"Cold War and Contemporary Europe", examWeight:7/55, examWeightRange:[0.10,0.15] },
    ],
    stimulusSetRange: [18,18],
    attributeRanges: { unit: { U1:[6,6], U2:[6,6], U3:[6,6], U4:[6,6], U5:[6,6], U6:[6,6], U7:[6,6], U8:[6,6], U9:[7,7] } },
    constraintDrawAttempts: 30000,
    freeResponse: { timeMinutes:140, questions:[
      "Short Answer 1", "Short Answer 2", "Short Answer 3",
      "Document-Based Question", "Long Essay",
    ] },
    dataVar: "QUESTIONS_AP_EUROPEAN_HISTORY",
  },`;
s = s.slice(0, start) + replacement + s.slice(end);
fs.writeFileSync(subjectsPath, s);

for (let unit = 1; unit <= 9; unit++) {
  const path = `data/ap-european-history-u${unit}.js`;
  let content = fs.readFileSync(path, 'utf8');
  content = content
    .replaceAll('skill:"6"', 'skill:"5"')
    .replaceAll('Which thesis best ', 'Which interpretation best ');
  fs.writeFileSync(path, content);
}
