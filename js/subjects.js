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
//   units           Optional per-unit exam weights. examWeight is the point estimate
//                   used by the weighted drawer; examWeightRange is College Board's
//                   published [min, max] band, used by the draw audit.
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
    // Section II has three essays in 2hr 15min, including a 15-minute reading period.
    mcqCount: 45,
    mcqTimeMinutes: 60,
    totalExamTimeLabel: "3h 15m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [
      { id: "RHS", name: "Rhetorical Situation", examWeight: 0.25, examWeightRange: [0.22, 0.28] },
      { id: "CLE", name: "Claims and Evidence", examWeight: 0.25, examWeightRange: [0.24, 0.30] },
      { id: "REO", name: "Reasoning and Organization", examWeight: 0.25, examWeightRange: [0.24, 0.30] },
      { id: "STL", name: "Style", examWeight: 0.25, examWeightRange: [0.22, 0.28] },
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
    // three essays in 2 hours.
    mcqCount: 55,
    mcqTimeMinutes: 60,
    totalExamTimeLabel: "3h 0m",
    formatVerified: true,
    releaseStatus: "draft",
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
    // VERIFIED 2026-08-09: apstudents.collegeboard.org/courses/ap-calculus-ab/assessment
    // — Section I: Multiple Choice, 42 questions, 1hr 40mins (Part A 29 no-calculator,
    // Part B 13 calculator); total exam duration 3hrs 10mins.
    // Previous repo value (45 / 105 min) predates the 2025 redesign.
    mcqCount: 42,
    mcqTimeMinutes: 100,
    totalExamTimeLabel: "3h 10m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
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
    // VERIFIED 2026-08-09: apstudents.collegeboard.org/courses/ap-statistics/assessment
    // — Section I: Multiple Choice, 42 questions, 1hr 30mins, 50% of score;
    // total duration 3hrs. Previous repo value (40 questions) was stale.
    mcqCount: 42,
    mcqTimeMinutes: 90,
    totalExamTimeLabel: "3h 0m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
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
    mcqCount: 60,
    mcqTimeMinutes: 90,
    totalExamTimeLabel: "3h 15m",
    formatVerified: false,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
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
    // VERIFIED 2026-08-09: apstudents.collegeboard.org/courses/ap-physics-2-algebra-based/assessment
    // — Section I: Multiple Choice, 42 questions, 1hr 25mins, 50% of score; total duration 3hrs.
    mcqCount: 42,
    mcqTimeMinutes: 85,
    totalExamTimeLabel: "3h 0m",
    formatVerified: true,
    releaseStatus: "draft",
    allowsMultiSelect: false,
    tierNote: null,
    units: [],
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
