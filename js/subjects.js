// AP Exam Practice — subject registry
// Metadata only. Question banks live in data/<id>.js and are loaded separately.
//
// FIELDS
//   tier            1 = text/image MCQ, fully buildable now.
//                   2 = MCQ section depends on audio (listening/aural) which this
//                       framework doesn't play back yet.
//   releaseStatus   "draft"    = never selectable on the catalog, even if its bank
//                                has questions in it. This is the default and the
//                                only safe state for work-in-progress content.
//                   "released" = selectable, provided the bank also has questions.
//                   Gating on this field (instead of bank length alone) is what
//                   stops a single WIP question from silently publishing a subject.
//   formatVerified  true  = mcqCount / mcqTimeMinutes / totalExamTimeLabel were
//                           checked against College Board's published exam page
//                           during the pass noted in the inline comment.
//                   false = inherited from an older draft; the catalog card says so.
//   allowsMultiSelect  Whether this subject's MCQ section actually uses
//                      "select two/three" items. Currently false everywhere: no AP
//                      MCQ section in the current exam cycle uses multi-select
//                      (AP Physics 1/2 were the last holdouts and dropped them in
//                      the 2024-25 redesign). Enforced by tests/schema tests so a
//                      bank can't quietly grow multi-select items.
//   units           Optional unit/category metadata. For weighted subjects,
//                   examWeight is the point estimate used by the drawer and
//                   examWeightRange is College Board's published [min, max] band.
//                   Set-blueprint subjects may use id/name only as result labels.
//
// Format verification pass: 2026-08-09, against apstudents.collegeboard.org
// "About the Exam" pages (the 2026 administration) unless noted otherwise.
const AP_SUBJECTS = [
  {
    id: "ap-art-history",
    name: "AP Art History",
    category: "Arts",
    tier: 1,
    // VERIFIED 2026-08-09: apstudents.collegeboard.org/courses/ap-art-history/assessment
    // — Section I: Multiple Choice, 80 questions, 50% of score; total exam duration 3hrs.
    // Section I is allotted 1 hour. Previous repo value (28 questions) was badly stale.
    mcqCount: 80,
    mcqTimeMinutes: 60,
    totalExamTimeLabel: "3h 0m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
    dataVar: "QUESTIONS_AP_ART_HISTORY",
  },
  {
    id: "ap-music-theory",
    name: "AP Music Theory",
    category: "Arts",
    tier: 2,
    mcqCount: 75,
    mcqTimeMinutes: 65,
    totalExamTimeLabel: "2h 5m",
    formatVerified: false,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: "Includes aural/sight-singing questions — audio playback not yet supported.",
    units: [],
    dataVar: "QUESTIONS_AP_MUSIC_THEORY",
  },
  {
    id: "ap-english-language",
    name: "AP English Language and Composition",
    category: "English",
    tier: 1,
    // VERIFIED 2026-08-10:
    // https://apcentral.collegeboard.org/courses/ap-english-language-and-composition/exam
    // and the AP English Language and Composition CED (© 2024, Exam Information).
    // Section I has 45 questions in five passage sets: two Reading sets totaling
    // 23-25 questions, followed by three Writing sets totaling 20-22 questions.
    // This bank selects a valid 24 Reading / 21 Writing configuration.
    // Section II has three essays in 2hr 15min, including a 15-minute reading period.
    mcqCount: 45,
    mcqTimeMinutes: 60,
    totalExamTimeLabel: "3h 15m",
    formatVerified: true,
    releaseStatus: "released",
    allowsMultiSelect: false,
    tierNote: null,
    // Reporting groups only. College Board publishes MCQ weights for the eight
    // skill categories below, not these four Big Ideas. The previously recorded
    // aggregate bands were project-derived sums, so they are intentionally not
    // represented as official examWeightRange values.
    units: [
      { id: "RHS", name: "Rhetorical Situation" },
      { id: "CLE", name: "Claims and Evidence" },
      { id: "REO", name: "Reasoning and Organization" },
      { id: "STL", name: "Style" },
    ],
    skillRanges: {
      "1": [0.11, 0.14], "2": [0.11, 0.14], "3": [0.13, 0.16], "4": [0.11, 0.14],
      "5": [0.13, 0.16], "6": [0.11, 0.14], "7": [0.11, 0.14], "8": [0.11, 0.14],
    },
    setBlueprint: {
      field: "setType",
      order: ["reading", "writing-long", "writing-short"],
      counts: { reading: 2, "writing-long": 2, "writing-short": 1 },
      preserveCategoryOrder: true,
    },
    freeResponse: {
      timeMinutes: 135,
      readingPeriodMinutes: 15,
      questions: ["Synthesis", "Rhetorical Analysis", "Argument"],
    },
    dataVar: "QUESTIONS_AP_ENGLISH_LANGUAGE",
  },
  {
    id: "ap-english-literature",
    name: "AP English Literature and Composition",
    category: "English",
    tier: 1,
    // VERIFIED 2026-08-10:
    // https://apcentral.collegeboard.org/courses/ap-english-literature-and-composition/exam
    // and the AP English Literature and Composition CED (© 2024, Exam Information).
    // Section I has 55 questions in five sets of 8-13, with at least two prose
    // fiction/drama passages and at least two poetry passages. Section II has
    // three essays in 2 hours. This bank selects a valid 24 short-fiction /
    // 22 poetry / 9 drama configuration within the published category ranges.
    mcqCount: 55,
    mcqTimeMinutes: 60,
    totalExamTimeLabel: "3h 0m",
    formatVerified: true,
    releaseStatus: "released",
    allowsMultiSelect: false,
    tierNote: null,
    // CED groups the nine instructional units into these three MCQ categories.
    // Point weights are midpoints of the published ranges: .455, .405, .165.
    units: [
      { id: "SF", name: "Short Fiction", examWeight: 0.455, examWeightRange: [0.42, 0.49] },
      { id: "PO", name: "Poetry", examWeight: 0.405, examWeightRange: [0.36, 0.45] },
      { id: "LD", name: "Longer Fiction or Drama", examWeight: 0.165, examWeightRange: [0.15, 0.18] },
    ],
    skillRanges: {
      "1": [0.16, 0.20], "2": [0.03, 0.06], "3": [0.16, 0.20], "4": [0.21, 0.26],
      "5": [0.10, 0.13], "6": [0.10, 0.13], "7": [0.10, 0.13],
    },
    setBlueprint: {
      field: "setType",
      order: ["short-fiction", "poetry", "longer-drama"],
      counts: { "short-fiction": 2, poetry: 2, "longer-drama": 1 },
      preserveCategoryOrder: false,
    },
    freeResponse: {
      timeMinutes: 120,
      readingPeriodMinutes: 0,
      questions: ["Poetry Analysis", "Prose Fiction Analysis", "Literary Argument"],
    },
    dataVar: "QUESTIONS_AP_ENGLISH_LITERATURE",
  },
  {
    id: "ap-african-american-studies",
    name: "AP African American Studies",
    category: "History & Social Sciences",
    tier: 1,
    // VERIFIED 2026-08-09: apstudents.collegeboard.org/courses/ap-african-american-studies/assessment
    // — Section I: Multiple Choice, 60 questions, 1hr 10mins, 60% of score.
    // Total exam duration 2hrs 45mins (also includes a 10-min project validation question
    // and a 1hr 25min free-response section). Previous repo value (50 / 60 min) was stale.
    mcqCount: 60,
    mcqTimeMinutes: 70,
    totalExamTimeLabel: "2h 45m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
    dataVar: "QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES",
  },
  {
    id: "ap-comparative-government",
    name: "AP Comparative Government and Politics",
    category: "History & Social Sciences",
    tier: 1,
    mcqCount: 55,
    mcqTimeMinutes: 60,
    totalExamTimeLabel: "2h 30m",
    formatVerified: false,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
    dataVar: "QUESTIONS_AP_COMPARATIVE_GOVERNMENT",
  },
  {
    id: "ap-european-history",
    name: "AP European History",
    category: "History & Social Sciences",
    tier: 1,
    mcqCount: 55,
    mcqTimeMinutes: 55,
    totalExamTimeLabel: "3h 15m",
    formatVerified: false,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
    dataVar: "QUESTIONS_AP_EUROPEAN_HISTORY",
  },
  {
    id: "ap-human-geography",
    name: "AP Human Geography",
    category: "History & Social Sciences",
    tier: 1,
    mcqCount: 60,
    mcqTimeMinutes: 60,
    totalExamTimeLabel: "2h 15m",
    formatVerified: false,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
    dataVar: "QUESTIONS_AP_HUMAN_GEOGRAPHY",
  },
  {
    id: "ap-macroeconomics",
    name: "AP Macroeconomics",
    category: "History & Social Sciences",
    tier: 1,
    mcqCount: 60,
    mcqTimeMinutes: 70,
    totalExamTimeLabel: "2h 10m",
    formatVerified: false,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
    dataVar: "QUESTIONS_AP_MACROECONOMICS",
  },
  {
    id: "ap-microeconomics",
    name: "AP Microeconomics",
    category: "History & Social Sciences",
    tier: 1,
    mcqCount: 60,
    mcqTimeMinutes: 70,
    totalExamTimeLabel: "2h 10m",
    formatVerified: false,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
    dataVar: "QUESTIONS_AP_MICROECONOMICS",
  },
  {
    id: "ap-psychology",
    name: "AP Psychology",
    category: "History & Social Sciences",
    tier: 1,
    mcqCount: 75,
    mcqTimeMinutes: 90,
    totalExamTimeLabel: "2h 40m",
    formatVerified: false,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
    dataVar: "QUESTIONS_AP_PSYCHOLOGY",
  },
  {
    id: "ap-us-government",
    name: "AP United States Government and Politics",
    category: "History & Social Sciences",
    tier: 1,
    // VERIFIED 2026-08-09: apstudents.collegeboard.org/courses/ap-united-states-government-and-politics/assessment
    // — Section I: Multiple Choice, 55 questions, 1hr 20mins, 50% of score; total duration 3hrs.
    // MCQ section is a mix of individual questions and question sets built on data,
    // foundational-document excerpts, and other text/visual sources.
    mcqCount: 55,
    mcqTimeMinutes: 80,
    totalExamTimeLabel: "3h 0m",
    formatVerified: true,
    releaseStatus: "released",
    allowsMultiSelect: false,
    tierNote: null,
    // Unit exam weightings from the AP U.S. Government and Politics CED
    // (Course Framework V.1, © 2026 College Board, p. "Exam Weighting"), verified
    // 2026-08-09 against the CED PDF on AP Central. examWeight is the midpoint of
    // the published band and is what the Hamilton apportionment drawer uses;
    // examWeightRange is the published band the draw audit asserts against.
    units: [
      { id: "U1", name: "Foundations of American Democracy", examWeight: 0.185, examWeightRange: [0.15, 0.22] },
      { id: "U2", name: "Interactions Among Branches of Government", examWeight: 0.305, examWeightRange: [0.25, 0.36] },
      { id: "U3", name: "Civil Liberties and Civil Rights", examWeight: 0.155, examWeightRange: [0.13, 0.18] },
      { id: "U4", name: "American Political Ideologies and Beliefs", examWeight: 0.125, examWeightRange: [0.10, 0.15] },
      { id: "U5", name: "Political Participation", examWeight: 0.235, examWeightRange: [0.20, 0.27] },
    ],
    // Effective Fall 2026 CED, p. 169: five quantitative sets, two text sets
    // (one foundational document and one other source), and three visual sets.
    // The selected stimulus groups vary between two and three questions, so the
    // achievable leftover standalone count currently ranges from 28 to 32.
    // Recompute this range whenever the Government stimulus pools change.
    examBlueprint: {
      sets: { quantitative: 5, foundational: 1, text: 1, visual: 3 },
      standaloneRange: [28, 32],
    },
    dataVar: "QUESTIONS_AP_US_GOVERNMENT",
  },
  {
    id: "ap-us-history",
    name: "AP United States History",
    category: "History & Social Sciences",
    tier: 1,
    mcqCount: 55,
    mcqTimeMinutes: 55,
    totalExamTimeLabel: "3h 15m",
    formatVerified: false,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
    dataVar: "QUESTIONS_AP_US_HISTORY",
  },
  {
    id: "ap-world-history",
    name: "AP World History: Modern",
    category: "History & Social Sciences",
    tier: 1,
    mcqCount: 55,
    mcqTimeMinutes: 55,
    totalExamTimeLabel: "3h 15m",
    formatVerified: false,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
    dataVar: "QUESTIONS_AP_WORLD_HISTORY",
  },
  {
    id: "ap-calculus-ab",
    name: "AP Calculus AB",
    category: "Math & Computer Science",
    tier: 1,
    // VERIFIED 2026-08-10 against the official AP Calculus AB and BC Course
    // and Exam Description PDF (apcentral.collegeboard.org/media/pdf/
    // ap-calculus-ab-and-bc-course-and-exam-description.pdf), "Exam Overview"
    // and "Exam Weighting for the Multiple-Choice Section" tables — NOT
    // reconstructed from secondary sources. Section I: 42 multiple-choice
    // questions, 100 minutes total, split into two timed parts (see
    // examParts below): Part A, 29 questions/62 minutes/no calculator, and
    // Part B, 13 questions/38 minutes/calculator required. A prior pass of
    // this file cited these same 29/13/100 totals but only enforced the
    // 29/13 *count* split (attributeRanges) without ever separating the two
    // parts into distinct timed sections in the delivered exam — see
    // examParts and js/draw.js's orderByExamParts.
    mcqCount: 42,
    mcqTimeMinutes: 100,
    totalExamTimeLabel: "3h 10m",
    formatVerified: true,
    releaseStatus: "released",
    allowsMultiSelect: false,
    tierNote: null,
    // Unit exam weightings, quoted exactly from the CED's "Exam Weighting for
    // the Multiple-Choice Section of the AP Exam" table (identical figures in
    // both the Course Framework and Exam Information sections). examWeight is
    // the midpoint of each published band, shown here so the arithmetic is
    // reviewable: U1 (10+15)/2=12.5, U2 (10+15)/2=12.5, U3 (5+10)/2=7.5,
    // U4 (10+15)/2=12.5, U5 (15+20)/2=17.5, U6 (15+20)/2=17.5,
    // U7 (5+10)/2=7.5, U8 (10+15)/2=12.5 — these sum to exactly 100.
    // A prior pass of this file used narrower, non-published ranges for
    // U1, U2, U3, U5, U6, and U7 (e.g. U1 as 10-12% instead of the CED's
    // published 10-15%); that was a fabricated-precision defect caught on
    // independent review and corrected here against the primary-source PDF.
    units: [
      { id: "U1", name: "Limits and Continuity", examWeight: 0.125, examWeightRange: [0.10, 0.15] },
      { id: "U2", name: "Differentiation: Definition and Fundamental Properties", examWeight: 0.125, examWeightRange: [0.10, 0.15] },
      { id: "U3", name: "Differentiation: Composite, Implicit, and Inverse Functions", examWeight: 0.075, examWeightRange: [0.05, 0.10] },
      { id: "U4", name: "Contextual Applications of Differentiation", examWeight: 0.125, examWeightRange: [0.10, 0.15] },
      { id: "U5", name: "Analytical Applications of Differentiation", examWeight: 0.175, examWeightRange: [0.15, 0.20] },
      { id: "U6", name: "Integration and Accumulation of Change", examWeight: 0.175, examWeightRange: [0.15, 0.20] },
      { id: "U7", name: "Differential Equations", examWeight: 0.075, examWeightRange: [0.05, 0.10] },
      { id: "U8", name: "Applications of Integration", examWeight: 0.125, examWeightRange: [0.10, 0.15] },
    ],
    // Mathematical Practice weighting, quoted exactly from the CED: "Mathematical
    // Practices 1, 2, and 3 are assessed in the multiple-choice section... Practice 4
    // is not assessed." Practice 1 (Implementing Mathematical Processes) 50-70%,
    // Practice 2 (Connecting Representations) 15-30%, Practice 3 (Justification)
    // 10-20%. Integer bounds below are ceil/floor of each percentage times the
    // 42-question draw: Practice 1 21-29, Practice 2 7-12, Practice 3 5-8. A prior
    // pass of this file tagged 12 questions as Practice 4 and used only coarse,
    // un-sub-coded family numbers; every question now carries a real CED skill
    // sub-code (e.g. "1.C", "2.D", "3.G" — see the CED's Mathematical Practices
    // skills table) and no question is tagged Practice 4, matching the CED's
    // explicit statement that Practice 4 is MCQ-exempt.
    sciencePracticeRanges: {
      "1": [21, 29],
      "2": [7, 12],
      "3": [5, 8],
    },
    // Section I is not one undifferentiated 100-minute block: Part A (29
    // questions, no calculator) is timed and delivered separately from Part B
    // (13 questions, calculator required), and a student cannot return to
    // Part A questions once Part B begins — see js/app.js's part-transition
    // handling. `field` names the question property that determines part
    // membership; every stimulus set must be homogeneous in that field (see
    // CONTENT_STANDARDS.md and js/draw.js's orderByExamParts) since a set
    // straddling both parts could never be delivered as one contiguous block.
    examParts: {
      field: "calculatorAllowed",
      parts: [
        { value: false, label: "Part A — Calculator not permitted", timeMinutes: 62 },
        { value: true, label: "Part B — Graphing calculator required", timeMinutes: 38 },
      ],
    },
    attributeRanges: {
      calculatorAllowed: { false: [29, 29], true: [13, 13] },
    },
    dataVar: "QUESTIONS_AP_CALCULUS_AB",
  },
  {
    id: "ap-calculus-bc",
    name: "AP Calculus BC",
    category: "Math & Computer Science",
    tier: 1,
    // VERIFIED 2026-08-09: apstudents.collegeboard.org/courses/ap-calculus-bc/assessment
    // — Section I: Multiple Choice, 42 questions, 1hr 40mins; total duration 3hrs 10mins.
    mcqCount: 42,
    mcqTimeMinutes: 100,
    totalExamTimeLabel: "3h 10m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
    dataVar: "QUESTIONS_AP_CALCULUS_BC",
  },
  {
    id: "ap-computer-science-a",
    name: "AP Computer Science A",
    category: "Math & Computer Science",
    tier: 1,
    mcqCount: 40,
    mcqTimeMinutes: 90,
    totalExamTimeLabel: "3h 0m",
    formatVerified: false,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
    dataVar: "QUESTIONS_AP_COMPUTER_SCIENCE_A",
  },
  {
    id: "ap-computer-science-principles",
    name: "AP Computer Science Principles",
    category: "Math & Computer Science",
    tier: 1,
    mcqCount: 70,
    mcqTimeMinutes: 120,
    totalExamTimeLabel: "2h 0m",
    formatVerified: false,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: "MCQ is the entire exam-day test; the Create Performance Task is separate coursework, not modeled here.",
    units: [],
    dataVar: "QUESTIONS_AP_COMPUTER_SCIENCE_PRINCIPLES",
  },
  {
    id: "ap-precalculus",
    name: "AP Precalculus",
    category: "Math & Computer Science",
    tier: 1,
    // VERIFIED 2026-08-09: apstudents.collegeboard.org/courses/ap-precalculus/assessment
    // — Section I: Multiple Choice, 42 questions, 1hr 45mins (Part A 29 no-calculator /
    // 65 mins, Part B calculator), approximately 63% of score; total duration 2hrs 55mins.
    // Previous repo value (40 / 80 min) was stale.
    mcqCount: 42,
    mcqTimeMinutes: 105,
    totalExamTimeLabel: "2h 55m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
    dataVar: "QUESTIONS_AP_PRECALCULUS",
  },
  {
    id: "ap-statistics",
    name: "AP Statistics",
    category: "Math & Computer Science",
    tier: 1,
    // VERIFIED 2026-08-11 against the AP Statistics CED, Effective Fall 2026:
    // https://apcentral.collegeboard.org/media/pdf/ap-statistics-course-and-exam-description.pdf
    // and the AP Statistics revisions page for the May 2027 redesign. Section I has
    // 42 four-option MCQs in 90 minutes, including one 3-question probability set and
    // one 3-question regression set; calculators are permitted throughout.
    // College Board publishes unit bands, not exact counts. Midpoints are 25/20/20/15/15
    // (sum 95); normalizing those midpoints to 42 questions and applying Hamilton
    // apportionment gives 11/9/9/7/6, with the U4/U5 remainder tie resolved by unit order.
    mcqCount: 42,
    mcqTimeMinutes: 90,
    totalExamTimeLabel: "3h 0m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    calculatorExpected: true,
    units: [
      { id: "U1", name: "Exploring One-Variable Data and Collecting Data", examWeight: 11/42, examWeightRange: [0.20, 0.30] },
      { id: "U2", name: "Probability, Random Variables, and Probability Distributions", examWeight: 9/42, examWeightRange: [0.15, 0.25] },
      { id: "U3", name: "Inference for Categorical Data: Proportions", examWeight: 9/42, examWeightRange: [0.15, 0.25] },
      { id: "U4", name: "Inference for Quantitative Data: Means", examWeight: 7/42, examWeightRange: [0.10, 0.20] },
      { id: "U5", name: "Regression Analysis", examWeight: 6/42, examWeightRange: [0.10, 0.20] },
    ],
    sciencePracticeRanges: { "1": [3,4], "2": [9,12], "3": [11,14], "4": [11,14] },
    stimulusSetRange: [2,2],
    attributeRanges: { statsSetType: { probability: [3,3], regression: [3,3] } },
    constraintDrawAttempts: 20000,
    freeResponse: { timeMinutes: 90, questions: [
      "Question 1 (Multi-Focus on Practices 1 and 2)",
      "Question 2 (Multi-Focus on Practices 3 and 4)",
      "Question 3 (Inference: Hypothesis Test or Confidence Interval)",
      "Question 4 (Multi-Focus on Practices 2, 3, and 4)",
    ] },
    dataVar: "QUESTIONS_AP_STATISTICS",
  },
  {
    id: "ap-biology",
    name: "AP Biology",
    category: "Sciences",
    tier: 1,
    // VERIFIED 2026-08-10: AP Central Biology exam page and the CED effective
    // Fall 2025 — Section I: 60 single-select questions in 90 minutes, 50% of
    // the score, mixing discrete questions with 4–5-question stimulus sets.
    mcqCount: 60,
    mcqTimeMinutes: 90,
    totalExamTimeLabel: "3h 0m",
    formatVerified: true,
    releaseStatus: "released",
    allowsMultiSelect: false,
    tierNote: null,
    // CED unit ranges. Point weights are range midpoints normalized to sum to
    // one; Hamilton apportionment yields 6/7/8/8/6/8/10/7 on a 60-item draw.
    units: [
      { id: "U1", name: "Chemistry of Life", examWeight: 0.095, examWeightRange: [0.08, 0.11] },
      { id: "U2", name: "Cells", examWeight: 0.115, examWeightRange: [0.10, 0.13] },
      { id: "U3", name: "Cellular Energetics", examWeight: 0.140, examWeightRange: [0.12, 0.16] },
      { id: "U4", name: "Cell Communication and Cell Cycle", examWeight: 0.125, examWeightRange: [0.10, 0.15] },
      { id: "U5", name: "Heredity", examWeight: 0.095, examWeightRange: [0.08, 0.11] },
      { id: "U6", name: "Gene Expression and Regulation", examWeight: 0.140, examWeightRange: [0.12, 0.16] },
      { id: "U7", name: "Natural Selection", examWeight: 0.165, examWeightRange: [0.13, 0.20] },
      { id: "U8", name: "Ecology", examWeight: 0.125, examWeightRange: [0.10, 0.15] },
    ],
    // AP Central specifies a mixture of discrete items and 4–5-question sets,
    // but not a fixed set count. Keep every practice draw within a credible
    // range while preserving whole groups and exact unit apportionment.
    stimulusSetRange: [4, 8],
    // Integer counts corresponding to the CED's Section I practice weights:
    // 25–33%, 16–24%, 8–14%, 8–14%, 8–14%, and 20–26%.
    sciencePracticeRanges: {
      "1": [15, 20],
      "2": [10, 14],
      "3": [5, 8],
      "4": [5, 8],
      "5": [5, 8],
      "6": [12, 16],
    },
    dataVar: "QUESTIONS_AP_BIOLOGY",
  },
  {
    id: "ap-chemistry",
    name: "AP Chemistry",
    category: "Sciences",
    tier: 1,
    // VERIFIED 2026-08-10:
    // https://apcentral.collegeboard.org/courses/ap-chemistry/exam
    // AP Chemistry Course and Exam Description effective Fall 2024:
    // https://apcentral.collegeboard.org/media/pdf/ap-chemistry-course-and-exam-description.pdf
    // Section I: 60 single-select MCQs in 90 minutes, 50% of score; discrete and
    // stimulus/data-set questions. Calculators are permitted throughout.
    // Section II: 7 FRQs (3 long, 4 short) in 105 minutes, 50% of score.
    mcqCount: 60,
    mcqTimeMinutes: 90,
    totalExamTimeLabel: "3h 15m",
    formatVerified: true,
    releaseStatus: "released",
    allowsMultiSelect: false,
    tierNote: null,
    // Published CED MCQ ranges are preserved exactly. With a 60-question integer
    // draw no allocation can satisfy all nine ranges simultaneously: the seven
    // 7–9% units contribute at most 5 each, U3 at most 13, and U8 at most 9, for
    // a strict-band maximum of 57. This 6/6/13/6/5/5/5/9/5 blueprint minimizes
    // total discrete deviation; U1/U2/U4 are each one question above 9%.
    units: [
      { id: "U1", name: "Atomic Structure and Properties", examWeight: 6 / 60, examWeightRange: [0.07, 0.09] },
      { id: "U2", name: "Compound Structure and Properties", examWeight: 6 / 60, examWeightRange: [0.07, 0.09] },
      { id: "U3", name: "Properties of Substances and Mixtures", examWeight: 13 / 60, examWeightRange: [0.18, 0.22] },
      { id: "U4", name: "Chemical Reactions", examWeight: 6 / 60, examWeightRange: [0.07, 0.09] },
      { id: "U5", name: "Kinetics", examWeight: 5 / 60, examWeightRange: [0.07, 0.09] },
      { id: "U6", name: "Thermochemistry", examWeight: 5 / 60, examWeightRange: [0.07, 0.09] },
      { id: "U7", name: "Equilibrium", examWeight: 5 / 60, examWeightRange: [0.07, 0.09] },
      { id: "U8", name: "Acids and Bases", examWeight: 9 / 60, examWeightRange: [0.11, 0.15] },
      { id: "U9", name: "Thermodynamics and Electrochemistry", examWeight: 5 / 60, examWeightRange: [0.07, 0.09] },
    ],
    // CED Section I science-practice weights converted to inclusive integer
    // counts for 60 questions. Practice 3 is assessed in free response, not MCQ.
    sciencePracticeRanges: {
      "1": [5, 7],
      "2": [5, 7],
      "4": [14, 18],
      "5": [21, 25],
      "6": [5, 7],
    },
    stimulusSetRange: [2, 5],
    freeResponse: {
      timeMinutes: 105,
      questions: [
        "Long Answer 1", "Long Answer 2", "Long Answer 3",
        "Short Answer 1", "Short Answer 2", "Short Answer 3", "Short Answer 4",
      ],
    },
    dataVar: "QUESTIONS_AP_CHEMISTRY",
  },
  {
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
  },
  {
    id: "ap-physics-1",
    name: "AP Physics 1: Algebra-Based",
    category: "Sciences",
    tier: 1,
    // VERIFIED 2026-08-09: apstudents.collegeboard.org/courses/ap-physics-1-algebra-based/assessment
    // — Section I: Multiple Choice, 42 questions, 1hr 25mins, 50% of score;
    // total duration 3hrs. Discrete questions plus stimulus-based question sets.
    // The old 50-question / multi-select format is gone as of the 2024-25 redesign.
    mcqCount: 42,
    mcqTimeMinutes: 85,
    totalExamTimeLabel: "3h 0m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
    dataVar: "QUESTIONS_AP_PHYSICS_1",
  },
  {
    id: "ap-physics-2",
    name: "AP Physics 2: Algebra-Based",
    category: "Sciences",
    tier: 1,
    // VERIFIED 2026-08-11 for the May 2027 exam:
    // https://apcentral.collegeboard.org/courses/ap-physics-2
    // https://apcentral.collegeboard.org/media/pdf/ap-physics-2-course-and-exam-description-clarifications.pdf
    // Fall 2026 clarification changes Section I from 40/80 to 42 questions / 85 minutes
    // and Section II from 100 to 95 minutes, effective with the May 2027 exam.
    mcqCount: 42,
    mcqTimeMinutes: 85,
    totalExamTimeLabel: "3h 0m",
    formatVerified: true,
    releaseStatus: "released",
    allowsMultiSelect: false,
    tierNote: null,
    // VERIFIED 2026-08-11: https://apcentral.collegeboard.org/media/pdf/ap-physics-2-course-at-a-glance.pdf
    // Physics 2's CED continues Physics 1's unit numbering (Units 9-15; Physics 1
    // covers 1-8). Published bands: Units 9-11 each 15-18%; Units 12-15 each 12-15%.
    // With 42 questions, U9-U11's floor (15% of 42 = 6.3, so >=7 each) already
    // requires 21 of the 42 seats, and U12-U15's floor (12% of 42 = 5.04, so >=6
    // each) would need another 24 -- 45 total, three more than the exam has. No
    // integer allocation can satisfy all seven bands simultaneously. The
    // 7/7/7/5/5/6/5 blueprint below keeps U9-U11 at their exact floor (7 each,
    // 16.7%) and lets three of the four smaller units land one question under
    // their floor (5/42 = 11.9% vs. a 12% floor -- 0.1 point short) while U14
    // (the largest unit, 9 topics) gets the fourth unit's full 6/42 = 14.3%.
    // That 0.1-point shortfall is far smaller than shorting any U9-U11 unit
    // would be (14.3% vs. their 15% floor, a 0.7-point gap), so it minimizes
    // total discrete deviation from the published bands, the same reasoning
    // AP Chemistry's blueprint comment uses.
    units: [
      { id: "U9", name: "Thermodynamics", examWeight: 7 / 42, examWeightRange: [0.15, 0.18] },
      { id: "U10", name: "Electric Force, Field, and Potential", examWeight: 7 / 42, examWeightRange: [0.15, 0.18] },
      { id: "U11", name: "Electric Circuits", examWeight: 7 / 42, examWeightRange: [0.15, 0.18] },
      { id: "U12", name: "Magnetism and Electromagnetism", examWeight: 5 / 42, examWeightRange: [0.12, 0.15] },
      { id: "U13", name: "Geometric Optics", examWeight: 5 / 42, examWeightRange: [0.12, 0.15] },
      { id: "U14", name: "Waves, Sound, and Physical Optics", examWeight: 6 / 42, examWeightRange: [0.12, 0.15] },
      { id: "U15", name: "Modern Physics", examWeight: 5 / 42, examWeightRange: [0.12, 0.15] },
    ],
    // VERIFIED 2026-08-11 against the current AP Physics 2 course page.
    // Section I assesses only skills 2.A-2.D and 3.B-3.C. Practice 1 and 3.A are
    // FRQ-only. Integer ranges below are the published MCQ percentage bands
    // converted to feasible counts on a 42-question section.
    attributeRanges: {
      skill: {
        "2.A": [7, 8],
        "2.B": [9, 10],
        "2.C": [5, 6],
        "2.D": [5, 6],
        "3.B": [9, 10],
        "3.C": [3, 4],
      },
    },
    // The live exam uses both discrete items and stimulus/data question sets.
    // This original bank now carries one 3-question synthetic set per unit;
    // draws require 2-4 complete sets and never split a group.
    stimulusSetRange: [2, 4],
    constraintDrawAttempts: 20000,
    freeResponse: {
      timeMinutes: 95,
      questions: [
        "Question 1 (Mathematical Routines)",
        "Question 2 (Translation Between Representations)",
        "Question 3 (Experimental Design and Analysis)",
        "Question 4 (Qualitative/Quantitative Translation)",
      ],
    },
    dataVar: "QUESTIONS_AP_PHYSICS_2",
  },
  {
    id: "ap-physics-c-mechanics",
    name: "AP Physics C: Mechanics",
    category: "Sciences",
    tier: 1,
    // VERIFIED 2026-08-09: apstudents.collegeboard.org/courses/ap-physics-c-mechanics/assessment
    // — Section I: Multiple Choice, 42 questions, 1hr 25mins, 50% of score; total duration 3hrs.
    // Previous repo value (35 / 45 min) predates the 2024-25 redesign that doubled exam length.
    mcqCount: 42,
    mcqTimeMinutes: 85,
    totalExamTimeLabel: "3h 0m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
    dataVar: "QUESTIONS_AP_PHYSICS_C_MECHANICS",
  },
  {
    id: "ap-physics-c-em",
    name: "AP Physics C: Electricity and Magnetism",
    category: "Sciences",
    tier: 1,
    // VERIFIED 2026-08-09: apstudents.collegeboard.org/courses/ap-physics-c-electricity-and-magnetism/assessment
    // — Section I: Multiple Choice, 42 questions, 1hr 25mins, 50% of score; total duration 3hrs.
    mcqCount: 42,
    mcqTimeMinutes: 85,
    totalExamTimeLabel: "3h 0m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
    dataVar: "QUESTIONS_AP_PHYSICS_C_EM",
  },
  {
    id: "ap-chinese",
    name: "AP Chinese Language and Culture",
    category: "World Languages & Cultures",
    tier: 2,
    mcqCount: 65,
    mcqTimeMinutes: 95,
    totalExamTimeLabel: "3h 0m",
    formatVerified: false,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: "Includes listening-comprehension questions — audio playback not yet supported. Several world-language exams are being redesigned for 2027.",
    units: [],
    dataVar: "QUESTIONS_AP_CHINESE",
  },
  {
    id: "ap-french",
    name: "AP French Language and Culture",
    category: "World Languages & Cultures",
    tier: 2,
    mcqCount: 65,
    mcqTimeMinutes: 95,
    totalExamTimeLabel: "3h 0m",
    formatVerified: false,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: "Includes listening-comprehension questions — audio playback not yet supported. Several world-language exams are being redesigned for 2027.",
    units: [],
    dataVar: "QUESTIONS_AP_FRENCH",
  },
  {
    id: "ap-german",
    name: "AP German Language and Culture",
    category: "World Languages & Cultures",
    tier: 2,
    mcqCount: 65,
    mcqTimeMinutes: 95,
    totalExamTimeLabel: "3h 0m",
    formatVerified: false,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: "Includes listening-comprehension questions — audio playback not yet supported. Several world-language exams are being redesigned for 2027.",
    units: [],
    dataVar: "QUESTIONS_AP_GERMAN",
  },
  {
    id: "ap-italian",
    name: "AP Italian Language and Culture",
    category: "World Languages & Cultures",
    tier: 2,
    mcqCount: 65,
    mcqTimeMinutes: 95,
    totalExamTimeLabel: "3h 0m",
    formatVerified: false,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: "Includes listening-comprehension questions — audio playback not yet supported. Several world-language exams are being redesigned for 2027.",
    units: [],
    dataVar: "QUESTIONS_AP_ITALIAN",
  },
  {
    id: "ap-japanese",
    name: "AP Japanese Language and Culture",
    category: "World Languages & Cultures",
    tier: 2,
    mcqCount: 65,
    mcqTimeMinutes: 95,
    totalExamTimeLabel: "3h 0m",
    formatVerified: false,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: "Includes listening-comprehension questions — audio playback not yet supported. Several world-language exams are being redesigned for 2027.",
    units: [],
    dataVar: "QUESTIONS_AP_JAPANESE",
  },
  {
    id: "ap-spanish-language",
    name: "AP Spanish Language and Culture",
    category: "World Languages & Cultures",
    tier: 2,
    mcqCount: 65,
    mcqTimeMinutes: 95,
    totalExamTimeLabel: "3h 0m",
    formatVerified: false,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: "Includes listening-comprehension questions — audio playback not yet supported. Several world-language exams are being redesigned for 2027.",
    units: [],
    dataVar: "QUESTIONS_AP_SPANISH_LANGUAGE",
  },
  {
    id: "ap-spanish-literature",
    name: "AP Spanish Literature and Culture",
    category: "World Languages & Cultures",
    tier: 2,
    mcqCount: 65,
    mcqTimeMinutes: 90,
    totalExamTimeLabel: "3h 40m",
    formatVerified: false,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: "Includes an oral component on the real exam — audio not yet supported. Several world-language exams are being redesigned for 2027.",
    units: [],
    dataVar: "QUESTIONS_AP_SPANISH_LITERATURE",
  },
  {
    id: "ap-latin",
    name: "AP Latin",
    category: "World Languages & Cultures",
    tier: 1,
    // VERIFIED 2026-08-09: apstudents.collegeboard.org/courses/ap-latin/assessment
    // — Section I: Multiple-Choice Questions, 52 questions, 1hr 05mins, 50% of score;
    // total duration 3hrs. Previous repo value (50 / 60 min) was stale.
    mcqCount: 52,
    mcqTimeMinutes: 65,
    totalExamTimeLabel: "3h 0m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
    dataVar: "QUESTIONS_AP_LATIN",
  },
  {
    id: "ap-business-personal-finance",
    name: "AP Business with Personal Finance",
    category: "Career Kickstart",
    tier: 1,
    // VERIFIED 2026-08-09: apstudents.collegeboard.org/courses/ap-business-personal-finance/assessment
    // — Section I: Multiple Choice, 60 questions, 1hr 10mins, 60% of score;
    // total duration 2hrs 40mins. MCQ appears in sets of 3 or 4 sharing stimulus material.
    // Previously "TBD" in this repo.
    mcqCount: 60,
    mcqTimeMinutes: 70,
    totalExamTimeLabel: "2h 40m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
    dataVar: "QUESTIONS_AP_BUSINESS_PERSONAL_FINANCE",
  },
  {
    id: "ap-cybersecurity",
    name: "AP Cybersecurity",
    category: "Career Kickstart",
    tier: 1,
    // VERIFIED 2026-08-09: apstudents.collegeboard.org/courses/ap-cybersecurity/assessment
    // — Section I: Multiple Choice, 60 questions, 1hr 20mins, 70% of score;
    // total duration 2hrs 10mins. MCQ mixes individual questions with sets of 2-4.
    // Previously "TBD" in this repo.
    mcqCount: 60,
    mcqTimeMinutes: 80,
    totalExamTimeLabel: "2h 10m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
    dataVar: "QUESTIONS_AP_CYBERSECURITY",
  },
];

const AP_CATEGORIES = [...new Set(AP_SUBJECTS.map((s) => s.category))];

// Node (tests/audit scripts) loads this file with require(); browsers just get globals.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { AP_SUBJECTS, AP_CATEGORIES };
}
