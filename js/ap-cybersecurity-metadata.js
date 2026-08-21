// AP Cybersecurity — browser-effective metadata for the May 2027 exam.
(function () {
  "use strict";
  const subjects = typeof AP_SUBJECTS !== "undefined" ? AP_SUBJECTS : (globalThis.AP_SUBJECTS || []);
  const subject = subjects.find((candidate) => candidate.id === "ap-cybersecurity");
  if (!subject) throw new Error("AP Cybersecurity registry entry not found");

  // VERIFIED 2026-08-20 against the College Board CED effective Fall 2026 and
  // the current AP Students exam page:
  // https://apcentral.collegeboard.org/media/pdf/ap-cybersecurity-course-and-exam-description.pdf
  // https://apstudents.collegeboard.org/courses/ap-cybersecurity/assessment
  // Section I: 60 MCQ / 80 minutes / 70%; individual items plus sets of 2-4.
  // Section II: one Device Security Analysis FRQ / 50 minutes / 30%.
  // College Board publishes NO per-unit MCQ percentage ranges. All five units
  // are assessed. The exam is explicitly weighted by the three skill categories,
  // each at 25-40% of Section I.
  //
  // `examWeight` below is therefore NOT an official exam percentage. It uses the
  // CED's suggested class-period pacing (10, 21, 26, 23, 30) solely as a neutral
  // engineering allocation so every generated practice form represents all five
  // units without inventing an official unit blueprint.
  Object.assign(subject, {
    mcqCount: 60,
    mcqTimeMinutes: 80,
    totalExamTimeLabel: "2h 10m",
    formatVerified: true,
    releaseStatus: "released",
    tierNote: "Section I practice for the fully digital May 2027 AP Cybersecurity exam. College Board publishes skill-category weights, not per-unit MCQ percentages; this practice drawer uses CED pacing only to keep all five units represented. The official Device Security Analysis free-response question is not simulated here.",
    units: [
      { id:"U1", name:"Introduction to Security", examWeight:10/110 },
      { id:"U2", name:"Securing Spaces", examWeight:21/110 },
      { id:"U3", name:"Securing Networks", examWeight:26/110 },
      { id:"U4", name:"Securing Devices", examWeight:23/110 },
      { id:"U5", name:"Securing Applications and Data", examWeight:30/110 },
    ],
    skillCountRanges: {
      "1":[15,24],
      "2":[15,24],
      "3":[15,24],
    },
    stimulusSetRange:[5,8],
    constraintDrawAttempts:50000,
    freeResponse: {
      timeMinutes:50,
      questions:["Device Security Analysis"],
    },
    dataVar:"QUESTIONS_AP_CYBERSECURITY",
  });
})();
