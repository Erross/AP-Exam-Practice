// Development metadata overlay for AP Business with Personal Finance.
// Consolidate into js/subjects.js before release.
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
    tierNote: "Fully digital Section I practice for the 2027 AP Business with Personal Finance exam. Four-function calculators are permitted. The official exam also includes four free-response questions tied to business, personal finance, decision making, and the Business Canvas Project.",
    units: [
      { id:"U1", name:"Businesses, Competition, and New Ideas", examWeight:15/60, examWeightRange:[0.20,0.30] },
      { id:"U2", name:"Marketing", examWeight:15/60, examWeightRange:[0.20,0.30] },
      { id:"U3", name:"Personal Saving and Borrowing; Business Finance and Accounting", examWeight:18/60, examWeightRange:[0.25,0.35] },
      { id:"U4", name:"Management and Strategy", examWeight:12/60, examWeightRange:[0.15,0.20] },
    ],
    attributeRanges: {
      unit: { U1:[15,15], U2:[15,15], U3:[18,18], U4:[12,12] },
      personalFinance: { true:[12,15] },
    },
    stimulusSetRange: [15,20],
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
