// AP Chemistry draft metadata overlay.
// Branch-only development layer: tests and the browser load this immediately
// after js/subjects.js. Consolidate these fields into the ap-chemistry record in
// js/subjects.js before the release integration branch is promoted to main.
(function () {
  const subject = AP_SUBJECTS.find((item) => item.id === "ap-chemistry");
  if (!subject) throw new Error("AP Chemistry subject record not found");

  // VERIFIED 2026-08-10:
  // https://apcentral.collegeboard.org/courses/ap-chemistry/exam
  // AP Chemistry Course and Exam Description effective Fall 2024:
  // https://apcentral.collegeboard.org/media/pdf/ap-chemistry-course-and-exam-description.pdf
  // Section I: 60 single-select MCQs in 90 minutes, 50% of score; discrete and
  // stimulus/data-set questions. Calculators are permitted throughout.
  // Section II: 7 FRQs (3 long, 4 short) in 105 minutes, 50% of score.
  subject.mcqCount = 60;
  subject.mcqTimeMinutes = 90;
  subject.totalExamTimeLabel = "3h 15m";
  subject.formatVerified = true;
  subject.releaseStatus = "draft";

  // Published CED MCQ ranges are preserved below. With only 60 questions, no
  // integer allocation can satisfy all nine bands simultaneously: the seven
  // 7-9% units can contribute at most 5 each, U3 at most 13, and U8 at most 9,
  // for a strict-band maximum of 57. The 6/6/13/6/5/5/5/9/5 target minimizes
  // total discrete deviation: U1/U2/U4 are each one item above the strict band.
  subject.units = [
    { id: "U1", name: "Atomic Structure and Properties", examWeight: 6 / 60, examWeightRange: [0.07, 0.09] },
    { id: "U2", name: "Compound Structure and Properties", examWeight: 6 / 60, examWeightRange: [0.07, 0.09] },
    { id: "U3", name: "Properties of Substances and Mixtures", examWeight: 13 / 60, examWeightRange: [0.18, 0.22] },
    { id: "U4", name: "Chemical Reactions", examWeight: 6 / 60, examWeightRange: [0.07, 0.09] },
    { id: "U5", name: "Kinetics", examWeight: 5 / 60, examWeightRange: [0.07, 0.09] },
    { id: "U6", name: "Thermochemistry", examWeight: 5 / 60, examWeightRange: [0.07, 0.09] },
    { id: "U7", name: "Equilibrium", examWeight: 5 / 60, examWeightRange: [0.07, 0.09] },
    { id: "U8", name: "Acids and Bases", examWeight: 9 / 60, examWeightRange: [0.11, 0.15] },
    { id: "U9", name: "Thermodynamics and Electrochemistry", examWeight: 5 / 60, examWeightRange: [0.07, 0.09] },
  ];

  // CED Section I science-practice weights converted to inclusive integer
  // counts for 60 questions. Practice 3 is assessed in free response, not MCQ.
  subject.sciencePracticeRanges = {
    "1": [5, 7],
    "2": [5, 7],
    "4": [14, 18],
    "5": [21, 25],
    "6": [5, 7],
  };
  subject.stimulusSetRange = [2, 5];
  subject.freeResponse = {
    timeMinutes: 105,
    questions: [
      "Long Answer 1", "Long Answer 2", "Long Answer 3",
      "Short Answer 1", "Short Answer 2", "Short Answer 3", "Short Answer 4",
    ],
  };
})();
