// AP Computer Science Principles — browser-effective metadata for the May 2027 exam.
(function () {
  "use strict";
  const subjects = typeof AP_SUBJECTS !== "undefined" ? AP_SUBJECTS : (globalThis.AP_SUBJECTS || []);
  const subject = subjects.find((candidate) => candidate.id === "ap-computer-science-principles");
  if (!subject) throw new Error("AP Computer Science Principles registry entry not found");

  // VERIFIED 2026-08-20 against current College Board materials:
  // Exam page: https://apstudents.collegeboard.org/courses/ap-computer-science-principles/assessment
  // Course page / weighting tables: https://apcentral.collegeboard.org/courses/ap-computer-science-principles
  // Current CED: https://apcentral.collegeboard.org/media/pdf/ap-computer-science-principles-course-and-exam-description.pdf
  // Section I is 70 MCQs / 120 minutes / 70%: 57 ordinary single-select,
  // 5 single-select questions sharing a reading passage about a computing
  // innovation, and 8 multiple-select questions for which students select 2.
  // Section II contributes 30% and includes the Create performance task plus
  // two exam-day written-response questions (four prompts) in 60 minutes.
  Object.assign(subject, {
    mcqCount: 70,
    mcqTimeMinutes: 120,
    totalExamTimeLabel: "3h 0m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: true,
    tierNote: "Section I practice for the fully digital AP CSP exam. A 70-question form contains 57 ordinary single-select questions, one five-question computing-innovation passage set, and 8 select-two questions. The through-course Create performance task and its exam-day written responses are not simulated here.",
    units: [
      { id:"U1", name:"Big Idea 1: Creative Development", examWeight:8/70, examWeightRange:[0.10,0.13] },
      { id:"U2", name:"Big Idea 2: Data", examWeight:14/70, examWeightRange:[0.17,0.22] },
      { id:"U3", name:"Big Idea 3: Algorithms and Programming", examWeight:23/70, examWeightRange:[0.30,0.35] },
      { id:"U4", name:"Big Idea 4: Computer Systems and Networks", examWeight:9/70, examWeightRange:[0.11,0.15] },
      { id:"U5", name:"Big Idea 5: Impact of Computing", examWeight:16/70, examWeightRange:[0.21,0.26] },
    ],
    // Published Computational Thinking Practice bands converted to inclusive
    // integer ranges for a 70-question Section I. Practice 6 is not assessed.
    skillCountRanges: {
      "1":[13,17],
      "2":[14,19],
      "3":[5,8],
      "4":[9,13],
      "5":[20,23],
    },
    attributeRanges: {
      cspQuestionKind: {
        multi:[8,8],
        passage:[5,5],
      },
    },
    stimulusSetRange:[1,1],
    cspBlueprint: {
      unitCounts:{ U1:8, U2:14, U3:23, U4:9, U5:16 },
      multiCount:8,
      passageQuestionCount:5,
    },
    constraintDrawAttempts:50000,
    freeResponse: {
      timeMinutes:60,
      questions:[
        "Written Response 1 (Program Design, Function, and Purpose)",
        "Written Response 2(a) (Algorithm Development)",
        "Written Response 2(b) (Errors and Testing)",
        "Written Response 2(c) (Data and Procedural Abstraction)",
      ],
    },
    dataVar:"QUESTIONS_AP_COMPUTER_SCIENCE_PRINCIPLES",
  });
})();
