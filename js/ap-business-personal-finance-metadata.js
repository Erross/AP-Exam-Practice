// AP Business with Personal Finance — browser-effective metadata, May 2027 framework.
(function () {
  const subjects = typeof AP_SUBJECTS !== "undefined" ? AP_SUBJECTS : (globalThis.AP_SUBJECTS || []);
  const subject = subjects.find((s) => s.id === "ap-business-personal-finance");
  if (!subject) throw new Error("AP Business with Personal Finance registry entry not found");

  // VERIFIED 2026-08-20 against current College Board materials:
  // Exam page: https://apstudents.collegeboard.org/courses/ap-business-personal-finance/assessment
  // CED effective Fall 2026: https://apcentral.collegeboard.org/media/pdf/ap-business-personal-finance-course-and-exam-description.pdf
  // Section I is 60 MCQs / 70 minutes / 60%; all MCQs appear in stimulus sets
  // of 3 or 4. Published MCQ unit bands are U1 20–30%, U2 20–30%, U3
  // 25–35%, U4 15–20%; 12–15 questions (20–25%) assess personal finance.
  // Skill-family bands are 45–55 / 5–15 / 25–35 / 5–15 for Skills 1–4.
  // The exam page permits either a handheld 4-function calculator or
  // Bluebook's built-in Desmos 4-function calculator.
  Object.assign(subject, {
    mcqCount: 60,
    mcqTimeMinutes: 70,
    totalExamTimeLabel: "2h 40m",
    formatVerified: true,
    releaseStatus: "released",
    allowsMultiSelect: false,
    calculatorAllowed: true,
    tierNote: "Section I practice for the fully digital May 2027 exam. All 60 official multiple-choice questions appear in stimulus sets of 3 or 4. The official exam also includes the Business Canvas Project Exam-Day Validation question plus Personal Finance, Business Concept Application, and Business Decision free-response questions. A handheld or Bluebook 4-function calculator is permitted.",
    units: [
      { id:"U1", name:"Businesses, Competition, and New Ideas", examWeight:15/60, examWeightRange:[0.20,0.30] },
      { id:"U2", name:"Marketing", examWeight:15/60, examWeightRange:[0.20,0.30] },
      { id:"U3", name:"Personal Saving and Borrowing; Business Finance and Accounting", examWeight:18/60, examWeightRange:[0.25,0.35] },
      { id:"U4", name:"Management and Strategy", examWeight:12/60, examWeightRange:[0.15,0.20] },
    ],
    skillCountRanges: { "1":[27,33], "2":[3,9], "3":[15,21], "4":[3,9] },
    attributeRanges: {
      personalFinance: { "true":[12,15] },
    },
    stimulusSetRange: [20,20],
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
