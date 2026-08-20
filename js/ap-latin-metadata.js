// Browser-effective AP Latin metadata for the revised May 2027 course.
(function () {
  const subjects = typeof AP_SUBJECTS !== "undefined" ? AP_SUBJECTS : (globalThis.AP_SUBJECTS || []);
  const subject = subjects.find((s) => s.id === "ap-latin");
  if (!subject) throw new Error("AP Latin subject registry entry not found");

  Object.assign(subject, {
    mcqCount: 52,
    mcqTimeMinutes: 65,
    totalExamTimeLabel: "3h 0m",
    formatVerified: true,
    releaseStatus: "released",
    allowsMultiSelect: false,
    calculatorAllowed: false,
    tierNote: "Fully digital Section I practice for the revised Pliny/Vergil course. The official exam also includes five free-response questions and two course-project checkpoint scores.",
    units: [
      { id: "U1", name: "Teacher's Choice — Latin Prose" },
      { id: "U2", name: "Pliny's Letters: Eruption of Mt. Vesuvius" },
      { id: "U3", name: "Pliny's Letters: Ghosts, Trajan, Calpurnia, and Teacher's Choice Prose" },
      { id: "U4", name: "Teacher's Choice Poetry and Aeneid Books 1–2" },
      { id: "U5", name: "Aeneid Books 4, 6, 7, 11, and 12" },
      { id: "U6", name: "Course Project and Teacher's Choice Latin Poetry" },
    ],
    setBlueprint: {
      field: "setType",
      order: ["discrete-sight", "short-sight", "short-syllabus", "long-syllabus"],
      counts: { "discrete-sight": 20, "short-sight": 2, "short-syllabus": 2, "long-syllabus": 2 },
      preserveCategoryOrder: true,
    },
    freeResponse: {
      timeMinutes: 115,
      questions: [
        "Question 1 (Short Answer)",
        "Question 2 (Translation)",
        "Question 3 (Short Essay)",
        "Question 4 (Project Prose Passage Short Essay)",
        "Question 5 (Project Poetry Passage Short Essay)",
      ],
    },
    dataVar: "QUESTIONS_AP_LATIN",
  });
})();
