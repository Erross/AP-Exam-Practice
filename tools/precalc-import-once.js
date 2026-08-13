const fs = require('fs');
const { execFileSync } = require('child_process');

execFileSync('git', ['fetch', 'origin', 'subject/ap-precalculus'], { stdio: 'inherit' });
execFileSync('git', ['checkout', 'origin/subject/ap-precalculus', '--', 'data/ap-precalculus.js', 'tests/ap-precalculus.test.js'], { stdio: 'inherit' });

const helperPath = 'tests/helpers.js';
let helpers = fs.readFileSync(helperPath, 'utf8');
if (!helpers.includes('function loadPrecalculusBank()')) {
  const insertion = '\nfunction loadPrecalculusBank() { const sandbox = { window: {} }; vm.createContext(sandbox); vm.runInContext(fs.readFileSync("data/ap-precalculus.js", "utf8"), sandbox); return sandbox.window.QUESTIONS_AP_PRECALCULUS; }\n';
  helpers = helpers.replace('\nmodule.exports = {', insertion + '\nmodule.exports = {');
  helpers = helpers.replace('loadStatisticsBank,', 'loadStatisticsBank, loadPrecalculusBank,');
  fs.writeFileSync(helperPath, helpers);
}

const subjectsPath = 'js/subjects.js';
let subjects = fs.readFileSync(subjectsPath, 'utf8');
const start = subjects.indexOf('  {\n    id: "ap-precalculus",');
const end = subjects.indexOf('  {\n    id: "ap-statistics",', start);
if (start < 0 || end < 0) throw new Error('Could not locate AP Precalculus registry block');
const block = `  {
    id: "ap-precalculus",
    name: "AP Precalculus",
    category: "Math & Computer Science",
    tier: 1,
    // VERIFIED 2026-08-13 against AP Central and the Fall 2026 CED clarifications.
    // Effective May 2027, Section I has 42 MCQs in 105 minutes: Part A has
    // 29 questions / 65 minutes with no calculator; Part B has 13 questions /
    // 40 minutes with a graphing calculator required. Section II has four FRQs
    // in 70 minutes. This site currently practices Section I only.
    mcqCount: 42,
    mcqTimeMinutes: 105,
    totalExamTimeLabel: "2h 55m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    // AP Central 2026-27 course page: Units 1-3 are assessed; Unit 4 is not.
    // Published MCQ bands are U1 30-40%, U2 25-40%, U3 30-35%.
    // Midpoint weights normalized to one yield the 15/14/13 integer blueprint.
    units: [
      { id: "U1", name: "Polynomial and Rational Functions", examWeight: 0.35, examWeightRange: [0.30, 0.40] },
      { id: "U2", name: "Exponential and Logarithmic Functions", examWeight: 0.325, examWeightRange: [0.25, 0.40] },
      { id: "U3", name: "Trigonometric and Polar Functions", examWeight: 0.325, examWeightRange: [0.30, 0.35] },
    ],
    examParts: {
      field: "calculatorAllowed",
      parts: [
        { value: false, label: "Part A — Calculator not permitted", timeMinutes: 65 },
        { value: true, label: "Part B — Graphing calculator required", timeMinutes: 40 },
      ],
    },
    attributeRanges: {
      calculatorAllowed: { false: [29, 29], true: [13, 13] },
    },
    freeResponse: {
      timeMinutes: 70,
      questions: [
        "Question 1 (Function Concepts)",
        "Question 2 (Modeling a Non-Periodic Context)",
        "Question 3 (Modeling a Periodic Context)",
        "Question 4 (Symbolic Manipulations)",
      ],
    },
    dataVar: "QUESTIONS_AP_PRECALCULUS",
  },
`;
subjects = subjects.slice(0, start) + block + subjects.slice(end);
fs.writeFileSync(subjectsPath, subjects);
