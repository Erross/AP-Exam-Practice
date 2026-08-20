// AP Business with Personal Finance — browser-effective metadata, May 2027 framework.
(function () {
  const subjects = typeof AP_SUBJECTS !== "undefined" ? AP_SUBJECTS : (globalThis.AP_SUBJECTS || []);
  const subject = subjects.find((s) => s.id === "ap-business-personal-finance");
  if (!subject) throw new Error("AP Business with Personal Finance registry entry not found");

  Object.assign(subject, {
    mcqCount: 60,
    mcqTimeMinutes: 70,
    totalExamTimeLabel: "2h 40m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    calculatorAllowed: true,
    tierNote: "Section I practice for the fully digital May 2027 exam. The official exam also includes the Business Canvas Project exam-day validation question and three additional free-response questions. A four-function calculator is permitted.",
    units: [
      { id:"U1", name:"Businesses, Competition, and New Ideas", examWeight:15/60, examWeightRange:[0.20,0.30] },
      { id:"U2", name:"Marketing", examWeight:15/60, examWeightRange:[0.20,0.30] },
      { id:"U3", name:"Finance", examWeight:18/60, examWeightRange:[0.25,0.35] },
      { id:"U4", name:"Management and Strategy", examWeight:12/60, examWeightRange:[0.15,0.20] },
    ],
    skillCountRanges: { "1":[27,33], "2":[3,9], "3":[15,21], "4":[3,9] },
    attributeRanges: { personalFinance: { "true":[12,15] } },
    stimulusSetRange: [8,14],
    constraintDrawAttempts: 30000,
    freeResponse: {
      timeMinutes: 90,
      questions: [
        "Business Canvas Project Exam-Day Validation",
        "Business and Personal Finance Analysis 1",
        "Business and Personal Finance Analysis 2",
        "Business and Personal Finance Analysis 3",
      ],
    },
    dataVar: "QUESTIONS_AP_BUSINESS_PERSONAL_FINANCE",
  });
})();
