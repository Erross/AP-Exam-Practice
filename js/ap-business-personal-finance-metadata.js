// AP Business with Personal Finance — browser-effective metadata, May 2027 framework.
(function () {
  const subjects = typeof AP_SUBJECTS !== "undefined" ? AP_SUBJECTS : (globalThis.AP_SUBJECTS || []);
  const subject = subjects.find((s) => s.id === "ap-business-personal-finance");
  if (!subject) throw new Error("AP Business with Personal Finance registry entry not found");

  // VERIFIED 2026-08-20 against the live AP Central exam page and the AP
  // Business with Personal Finance CED effective Fall 2026. Section I is 60
  // MCQs / 70 minutes / 60%; questions usually appear in sets of 3 or 4.
  // Published MCQ unit bands are U1 20–30%, U2 20–30%, U3 25–35%, U4
  // 15–20%; 12–15 questions (20–25%) assess personal finance. Skill-family
  // bands are 45–55 / 5–15 / 25–35 / 5–15 for Skills 1–4. The live exam
  // page permits either a handheld 4-function calculator or Bluebook's
  // built-in Desmos 4-function calculator.
  const standaloneTopicRanges = {};
  [
    "1-1","1-2","1-3","1-4","1-5","1-6","1-7","1-8",
    "2-1","2-2","2-3","2-4","2-5","2-6","2-7",
    "3-1","3-2","3-3","3-4","3-5","3-6","3-7","3-8","3-9",
    "4-1","4-2","4-3","4-4",
  ].forEach((code) => { standaloneTopicRanges[`apbpf-${code}-standalone`] = [0,1]; });

  Object.assign(subject, {
    mcqCount: 60,
    mcqTimeMinutes: 70,
    totalExamTimeLabel: "2h 40m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    calculatorAllowed: true,
    tierNote: "Section I practice for the fully digital May 2027 exam. The official exam also includes the Business Canvas Project Exam-Day Validation question plus Personal Finance, Business Concept Application, and Business Decision free-response questions. A handheld or Bluebook 4-function calculator is permitted.",
    units: [
      { id:"U1", name:"Businesses, Competition, and New Ideas", examWeight:15/60, examWeightRange:[0.20,0.30] },
      { id:"U2", name:"Marketing", examWeight:15/60, examWeightRange:[0.20,0.30] },
      { id:"U3", name:"Personal Saving and Borrowing; Business Finance and Accounting", examWeight:18/60, examWeightRange:[0.25,0.35] },
      { id:"U4", name:"Management and Strategy", examWeight:12/60, examWeightRange:[0.15,0.20] },
    ],
    skillCountRanges: { "1":[27,33], "2":[3,9], "3":[15,21], "4":[3,9] },
    attributeRanges: {
      personalFinance: { "true":[12,15] },
      variantGroupId: standaloneTopicRanges,
    },
    stimulusSetRange: [12,14],
    constraintDrawAttempts: 30000,
    freeResponse: {
      timeMinutes: 90,
      questions: [
        "Business Canvas Project Exam-Day Validation",
        "Personal Finance",
        "Business Concept Application",
        "Business Decision",
      ],
    },
    dataVar: "QUESTIONS_AP_BUSINESS_PERSONAL_FINANCE",
  });
})();
