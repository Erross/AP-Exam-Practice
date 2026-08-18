const fs = require('fs');
const path = 'js/subjects.js';
const src = fs.readFileSync(path, 'utf8');
const oldBlock = `  {
    id: "ap-environmental-science",
    name: "AP Environmental Science",
    category: "Sciences",
    tier: 1,
    mcqCount: 80,
    mcqTimeMinutes: 90,
    totalExamTimeLabel: "2h 40m",
    formatVerified: false,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
    dataVar: "QUESTIONS_AP_ENVIRONMENTAL_SCIENCE",
  },`;
const newBlock = `  {
    id: "ap-environmental-science",
    name: "AP Environmental Science",
    category: "Sciences",
    tier: 1,
    // VERIFIED 2026-08-17 for May 2027 against current AP Central course/exam
    // pages, the Fall 2026 clarification, and calculator policy.
    mcqCount: 80,
    mcqTimeMinutes: 90,
    totalExamTimeLabel: "2h 40m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    calculatorAllowed: true,
    tierNote: "This practice product simulates the 80-question multiple-choice section; the official fully digital exam also includes three free-response questions.",
    units: [
      { id:"U1", name:"The Living World: Ecosystems", examWeight:6/80, examWeightRange:[0.06,0.08] },
      { id:"U2", name:"The Living World: Biodiversity", examWeight:6/80, examWeightRange:[0.06,0.08] },
      { id:"U3", name:"Populations", examWeight:10/80, examWeightRange:[0.10,0.15] },
      { id:"U4", name:"Earth Systems and Resources", examWeight:10/80, examWeightRange:[0.10,0.15] },
      { id:"U5", name:"Land and Water Use", examWeight:10/80, examWeightRange:[0.10,0.15] },
      { id:"U6", name:"Energy Resources and Consumption", examWeight:10/80, examWeightRange:[0.10,0.15] },
      { id:"U7", name:"Atmospheric Pollution", examWeight:7/80, examWeightRange:[0.07,0.10] },
      { id:"U8", name:"Aquatic and Terrestrial Pollution", examWeight:7/80, examWeightRange:[0.07,0.10] },
      { id:"U9", name:"Global Change", examWeight:14/80, examWeightRange:[0.15,0.20] },
    ],
    skillCountRanges: {
      "1":[24,30], "2":[10,15], "3":[5,6], "4":[2,3],
      "5":[10,15], "6":[5,7], "7":[14,18],
    },
    examBlueprint: { sets:{quantitative:5, foundational:0, text:2, visual:5} },
    constraintDrawAttempts: 30000,
    freeResponse: {
      timeMinutes:70,
      questions:[
        "Question 1 (Design an Investigation)",
        "Question 2 (Analyze an Environmental Problem and Propose a Solution)",
        "Question 3 (Analyze an Environmental Problem and Propose a Solution Doing Calculations)",
      ],
    },
    dataVar:"QUESTIONS_AP_ENVIRONMENTAL_SCIENCE",
  },`;
const hits = src.split(oldBlock).length - 1;
if (hits !== 1) throw new Error(`Expected exactly one APES placeholder, found ${hits}`);
const out = src.replace(oldBlock, newBlock);
fs.writeFileSync(path, out);
console.log('APES registry block replaced exactly once.');
