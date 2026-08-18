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
    // VERIFIED 2026-08-13 against current AP Central course and exam pages.
    // Section I: 80 MCQs in 60 minutes, 50% of score; 2-3 question image sets
    // plus individual questions using works both within and beyond the prescribed image set.
    mcqCount: 80,
    mcqTimeMinutes: 60,
    totalExamTimeLabel: "3h 0m",
    formatVerified: true,
    releaseStatus: "released",
    allowsMultiSelect: false,
    calculatorAllowed: false,
    tierNote: "Includes image-based question sets and unfamiliar-work visual analysis; use View larger image when you need to inspect detail.",
    units: [
      { id:"U1", name:"Global Prehistory, 30,000–500 BCE", examWeight:0.04, examWeightRange:[0.04,0.04] },
      { id:"U2", name:"Ancient Mediterranean, 3500 BCE–300 CE", examWeight:0.15, examWeightRange:[0.15,0.15] },
      { id:"U3", name:"Early Europe and Colonial Americas, 200–1750 CE", examWeight:0.21, examWeightRange:[0.21,0.21] },
      { id:"U4", name:"Later Europe and Americas, 1750–1980 CE", examWeight:0.21, examWeightRange:[0.21,0.21] },
      { id:"U5", name:"Indigenous Americas, 1000 BCE–1980 CE", examWeight:0.06, examWeightRange:[0.06,0.06] },
      { id:"U6", name:"Africa, 1100–1980 CE", examWeight:0.06, examWeightRange:[0.06,0.06] },
      { id:"U7", name:"West and Central Asia, 500 BCE–1980 CE", examWeight:0.04, examWeightRange:[0.04,0.04] },
      { id:"U8", name:"South, East, and Southeast Asia, 300 BCE–1980 CE", examWeight:0.08, examWeightRange:[0.08,0.08] },
      { id:"U9", name:"The Pacific, 700–1980 CE", examWeight:0.04, examWeightRange:[0.04,0.04] },
      { id:"U10", name:"Global Contemporary, 1980 CE to Present", examWeight:0.11, examWeightRange:[0.11,0.11] },
    ],
    skillCountRanges: { "1":[12,15], "2":[23,25], "3":[9,10], "4":[16,20], "5":[5,6], "6":[5,6], "7":[5,6] },
    stimulusSetRange: [20,20],
    // Exact constructive draw: 15 prescribed-work image sets + 5 unfamiliar-work
    // image sets = 40 visual questions. Standalones then produce an exact skill
    // mix of 15/24/10/16/5/5/5 while preserving Hamilton unit counts
    // 3/12/17/17/5/5/3/6/3/9.
    artHistoryBlueprint: { perUnit: {
      U1:  { knownSets:1, unknownSets:0, standalone:{ "4":1 } },
      U2:  { knownSets:2, unknownSets:1, standalone:{ "2":1, "3":2, "4":2, "7":1 } },
      U3:  { knownSets:3, unknownSets:1, standalone:{ "2":2, "3":2, "4":4, "7":1 } },
      U4:  { knownSets:3, unknownSets:3, standalone:{ "2":1, "3":1, "4":2, "7":1 } },
      U5:  { knownSets:1, unknownSets:0, standalone:{ "3":1, "4":1, "7":1 } },
      U6:  { knownSets:1, unknownSets:0, standalone:{ "2":1, "3":1, "4":1 } },
      U7:  { knownSets:1, unknownSets:0, standalone:{ "3":1 } },
      U8:  { knownSets:1, unknownSets:0, standalone:{ "2":1, "3":1, "4":2 } },
      U9:  { knownSets:1, unknownSets:0, standalone:{ "2":1 } },
      U10: { knownSets:1, unknownSets:0, standalone:{ "2":2, "3":1, "4":3, "7":1 } },
    } },
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
    // VERIFIED 2026-08-15 against the CED effective Fall 2026 and AP Central exam page.
    // Section I: 55 questions / 60 minutes. Individual questions plus exactly
    // 3 quantitative-analysis sets and 2 qualitative text-source sets.
    mcqCount: 55,
    mcqTimeMinutes: 60,
    totalExamTimeLabel: "2h 30m",
    formatVerified: true,
    releaseStatus: "released",
    allowsMultiSelect: false,
    calculatorAllowed: false,
    tierNote: "Covers China, Iran, Mexico, Nigeria, Russia, and the United Kingdom, including quantitative and text-source analysis.",
    units: [
      { id:"U1", name:"Political Systems, Regimes, and Governments", examWeight:12/55, examWeightRange:[0.18,0.27] },
      { id:"U2", name:"Political Institutions", examWeight:15/55, examWeightRange:[0.22,0.33] },
      { id:"U3", name:"Political Culture and Participation", examWeight:8/55, examWeightRange:[0.11,0.18] },
      { id:"U4", name:"Party and Electoral Systems and Citizen Organizations", examWeight:9/55, examWeightRange:[0.13,0.18] },
      { id:"U5", name:"Political and Economic Changes and Development", examWeight:11/55, examWeightRange:[0.16,0.24] },
    ],
    // 55-question integer envelopes for the published MCQ practice bands:
    // P1 40-55%, P2 25-32%, P3 10-16%, P4 9-11%; P5 is FRQ-only.
    skillCountRanges: { "1":[22,30], "2":[14,17], "3":[6,8], "4":[5,6] },
    examBlueprint: { sets: { quantitative:3, foundational:0, text:2, visual:0 } },
    constraintDrawAttempts: 10000,
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
    // VERIFIED 2026-08-13 against current AP Central course, CED, and exam pages.
    mcqCount: 60,
    mcqTimeMinutes: 60,
    totalExamTimeLabel: "2h 15m",
    formatVerified: true,
    releaseStatus: "released",
    allowsMultiSelect: false,
    calculatorAllowed: false,
    tierNote: null,
    units: [
      { id: "U1", name: "Thinking Geographically", examWeight: 0.09, examWeightRange: [0.08, 0.10] },
      { id: "U2", name: "Population and Migration Patterns and Processes", examWeight: 0.145, examWeightRange: [0.12, 0.17] },
      { id: "U3", name: "Cultural Patterns and Processes", examWeight: 0.145, examWeightRange: [0.12, 0.17] },
      { id: "U4", name: "Political Patterns and Processes", examWeight: 0.145, examWeightRange: [0.12, 0.17] },
      { id: "U5", name: "Agriculture and Rural Land-Use Patterns and Processes", examWeight: 0.145, examWeightRange: [0.12, 0.17] },
      { id: "U6", name: "Cities and Urban Land-Use Patterns and Processes", examWeight: 0.145, examWeightRange: [0.12, 0.17] },
      { id: "U7", name: "Industrial and Economic Development Patterns and Processes", examWeight: 0.145, examWeightRange: [0.12, 0.17] },
    ],
    examBlueprint: { sets: { quantitative: 4, foundational: 0, text: 0, visual: 3 }, standaloneRange: [39, 39] },
    skillCountRanges: { "1": [15, 21], "2": [10, 15], "3": [8, 12], "4": [8, 12], "5": [8, 12] },
    dataVar: "QUESTIONS_AP_HUMAN_GEOGRAPHY",
  },
  {
    id: "ap-macroeconomics",
    name: "AP Macroeconomics",
    category: "History & Social Sciences",
    tier: 1,
    // VERIFIED 2026-08-15 against the AP Macroeconomics CED effective Fall 2026
    // and current AP Central exam page. Section I: 60 MCQs / 70 minutes.
    mcqCount: 60,
    mcqTimeMinutes: 70,
    totalExamTimeLabel: "2h 10m",
    formatVerified: true,
    releaseStatus: "released",
    allowsMultiSelect: false,
    calculatorAllowed: true,
    calculatorExpected: true,
    tierNote: "Four-function calculator permitted throughout this practice section.",
    units: [
      { id:"U1", name:"Basic Economic Concepts", examWeight:5/60, examWeightRange:[0.05,0.10] },
      { id:"U2", name:"Economic Indicators and the Business Cycle", examWeight:9/60, examWeightRange:[0.12,0.17] },
      { id:"U3", name:"National Income and Price Determination", examWeight:13/60, examWeightRange:[0.17,0.27] },
      { id:"U4", name:"Financial Sector", examWeight:12/60, examWeightRange:[0.18,0.23] },
      { id:"U5", name:"Long-Run Consequences of Stabilization Policies", examWeight:14/60, examWeightRange:[0.20,0.30] },
      { id:"U6", name:"Open Economy—International Trade and Finance", examWeight:7/60, examWeightRange:[0.10,0.13] },
    ],
    skillCountRanges: { "1":[18,24], "2":[15,19], "3":[18,24] },
    attributeRanges: { numericalAnalysis: { "true":[10,12] } },
    constraintDrawAttempts: 10000,
    dataVar: "QUESTIONS_AP_MACROECONOMICS",
  },
  {
    id: "ap-microeconomics",
    name: "AP Microeconomics",
    category: "History & Social Sciences",
    tier: 1,
    // VERIFIED 2026-08-15 against the current AP Microeconomics framework (Fall 2022 CED; no changes announced)
    // and current AP Central exam page. Section I: 60 MCQs / 70 minutes.
    mcqCount: 60,
    mcqTimeMinutes: 70,
    totalExamTimeLabel: "2h 10m",
    formatVerified: true,
    releaseStatus: "released",
    allowsMultiSelect: false,
    calculatorAllowed: true,
    calculatorExpected: true,
    tierNote: "Four-function calculator permitted throughout this practice section.",
    units: [
      { id:"U1", name:"Basic Economic Concepts", examWeight:8/60, examWeightRange:[0.12,0.15] },
      { id:"U2", name:"Supply and Demand", examWeight:14/60, examWeightRange:[0.20,0.25] },
      { id:"U3", name:"Production, Cost, and the Perfect Competition Model", examWeight:14/60, examWeightRange:[0.22,0.25] },
      { id:"U4", name:"Imperfect Competition", examWeight:10/60, examWeightRange:[0.15,0.22] },
      { id:"U5", name:"Factor Markets", examWeight:7/60, examWeightRange:[0.10,0.13] },
      { id:"U6", name:"Market Failure and the Role of Government", examWeight:7/60, examWeightRange:[0.08,0.13] },
    ],
    skillCountRanges: { "1":[18,25], "2":[23,28], "3":[10,15] },
    attributeRanges: { numericalAnalysis: { "true":[12,18] } },
    constraintDrawAttempts: 10000,
    dataVar: "QUESTIONS_AP_MICROECONOMICS",
  },
  {
    id: "ap-psychology",
    name: "AP Psychology",
    category: "History & Social Sciences",
    tier: 1,
    // VERIFIED 2026-08-15: current official CED cover is effective Fall 2025
    // (the carried-forward V.1 body is ©2024):
    // https://apcentral.collegeboard.org/media/pdf/ap-psychology-course-and-exam-description.pdf
    // Current exam page confirms a fully digital Section I with 75 MCQs / 90 minutes:
    // https://apcentral.collegeboard.org/courses/ap-psychology/exam
    // Psychology is not among the calculator-permitted courses:
    // https://apcentral.collegeboard.org/exam-administration-ordering-scores/administering-exams/exam-policies/calculator-policy
    mcqCount: 75,
    mcqTimeMinutes: 90,
    totalExamTimeLabel: "2h 40m",
    formatVerified: true,
    releaseStatus: "released",
    allowsMultiSelect: false,
    calculatorAllowed: false,
    tierNote: "Calculator not permitted on the AP Psychology exam.",
    units: [
      { id:"U1", name:"Biological Bases of Behavior", examWeight:0.20, examWeightRange:[0.15,0.25] },
      { id:"U2", name:"Cognition", examWeight:0.20, examWeightRange:[0.15,0.25] },
      { id:"U3", name:"Development and Learning", examWeight:0.20, examWeightRange:[0.15,0.25] },
      { id:"U4", name:"Social Psychology and Personality", examWeight:0.20, examWeightRange:[0.15,0.25] },
      { id:"U5", name:"Mental and Physical Health", examWeight:0.20, examWeightRange:[0.15,0.25] },
    ],
    // Current CED MCQ practice mix: approximately P1 65%, P2 25%, P3 10%; P4 is FRQ-only.
    skillCountRanges: { "1":[48,50], "2":[18,20], "3":[7,8] },
    // Every Practice 3 item belongs to a two-question synthetic research set.
    stimulusSetRange: [7,8],
    constraintDrawAttempts: 20000,
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
    // VERIFIED 2026-08-14 against the current Fall-2026 CED clarifications and
    // AP Central course page. Effective May 2027, Section I has 42 MCQs in
    // 100 minutes: Part A 29 questions / 62 minutes / no calculator, followed
    // by Part B 13 questions / 38 minutes / graphing calculator required.
    mcqCount: 42,
    mcqTimeMinutes: 100,
    totalExamTimeLabel: "3h 10m",
    formatVerified: true,
    releaseStatus: "released",
    allowsMultiSelect: false,
    tierNote: null,
    // Current AP Central published BC unit bands are 5-10% for U1-U4 and U7-U8,
    // 10-15% for U5 and U9, and 15-20% for U6 and U10. Their midpoints sum to
    // 105; normalizing them to a 42-question draw yields the exact integer plan
    // 3/3/3/3/5/7/3/3/5/7 used below as the drawer point weights.
    units: [
      { id:"U1", name:"Limits and Continuity", examWeight:3/42, examWeightRange:[0.05,0.10] },
      { id:"U2", name:"Differentiation: Definition and Fundamental Properties", examWeight:3/42, examWeightRange:[0.05,0.10] },
      { id:"U3", name:"Differentiation: Composite, Implicit, and Inverse Functions", examWeight:3/42, examWeightRange:[0.05,0.10] },
      { id:"U4", name:"Contextual Applications of Differentiation", examWeight:3/42, examWeightRange:[0.05,0.10] },
      { id:"U5", name:"Analytical Applications of Differentiation", examWeight:5/42, examWeightRange:[0.10,0.15] },
      { id:"U6", name:"Integration and Accumulation of Change", examWeight:7/42, examWeightRange:[0.15,0.20] },
      { id:"U7", name:"Differential Equations", examWeight:3/42, examWeightRange:[0.05,0.10] },
      { id:"U8", name:"Applications of Integration", examWeight:3/42, examWeightRange:[0.05,0.10] },
      { id:"U9", name:"Parametric Equations, Polar Coordinates, and Vector-Valued Functions", examWeight:5/42, examWeightRange:[0.10,0.15] },
      { id:"U10", name:"Infinite Sequences and Series", examWeight:7/42, examWeightRange:[0.15,0.20] },
    ],
    // Mathematical Practice 4 is FRQ-only. MCQ published ranges are Practice 1
    // 50-70%, Practice 2 15-30%, Practice 3 10-20%.
    sciencePracticeRanges: { "1":[21,29], "2":[7,12], "3":[5,8] },
    examParts: {
      field: "calculatorAllowed",
      parts: [
        { value:false, label:"Part A — Calculator not permitted", timeMinutes:62 },
        { value:true, label:"Part B — Graphing calculator required", timeMinutes:38 },
      ],
    },
    attributeRanges: { calculatorAllowed: { false:[29,29], true:[13,13] } },
    constraintDrawAttempts: 50000,
    freeResponse: {
      timeMinutes: 90,
      questions: [
        "Part A Question 1 (Graphing calculator required)",
        "Part A Question 2 (Graphing calculator required)",
        "Part B Question 3 (Calculator not permitted)",
        "Part B Question 4 (Calculator not permitted)",
        "Part B Question 5 (Calculator not permitted)",
        "Part B Question 6 (Calculator not permitted)",
      ],
    },
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
    // VERIFIED 2026-08-13 against AP Central and the Fall 2026 CED clarifications.
    // Effective May 2027, Section I has 42 MCQs in 105 minutes: Part A has
    // 29 questions / 65 minutes with no calculator; Part B has 13 questions /
    // 40 minutes with a graphing calculator required. Section II has four FRQs
    // in 70 minutes. This site currently practices Section I only.
    mcqCount: 42,
    mcqTimeMinutes: 105,
    totalExamTimeLabel: "2h 55m",
    formatVerified: true,
    releaseStatus: "released",
    allowsMultiSelect: false,
    tierNote: null,
    // AP Central 2026-27 course page: Units 1-3 are assessed; Unit 4 is not.
    // Published MCQ bands are U1 30-40%, U2 25-40%, U3 30-35%.
    // Midpoint weights normalized to one yield the 15/14/13 integer blueprint.
    units: [
      { id: "U1", name: "Polynomial and Rational Functions", examWeight: 0.35, examWeightRange: [0.30, 0.40] },
      { id: "U2", name: "Exponential and Logarithmic Functions", examWeight: 0.325, examWeightRange: [0.25, 0.40] },
      { id: "U3", name: "Trigonometric and Polar Functions", examWeight: 0.325, examWeightRange: [0.30, 0.35] },
    ],
    examParts: {
      field: "calculatorAllowed",
      parts: [
        { value: false, label: "Part A — Calculator not permitted", timeMinutes: 65 },
        { value: true, label: "Part B — Graphing calculator required", timeMinutes: 40 },
      ],
    },
    attributeRanges: {
      calculatorAllowed: { false: [29, 29], true: [13, 13] },
    },
    freeResponse: {
      timeMinutes: 70,
      questions: [
        "Question 1 (Function Concepts)",
        "Question 2 (Modeling a Non-Periodic Context)",
        "Question 3 (Modeling a Periodic Context)",
        "Question 4 (Symbolic Manipulations)",
      ],
    },
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
    releaseStatus: "released",
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
    // VERIFIED 2026-08-17 for May 2027 against current AP Central course/exam
    // pages, the Fall 2026 clarification, and calculator policy.
    mcqCount: 80,
    mcqTimeMinutes: 90,
    totalExamTimeLabel: "2h 40m",
    formatVerified: true,
    releaseStatus: "released",
    allowsMultiSelect: false,
    calculatorAllowed: true,
    tierNote: "Calculators are permitted throughout this 80-question multiple-choice practice section. The official fully digital exam also includes three free-response questions, which this product does not simulate.",
    units: [
      { id:"U1", name:"The Living World: Ecosystems", examWeight:6/80, examWeightRange:[0.06,0.08] },
      { id:"U2", name:"The Living World: Biodiversity", examWeight:6/80, examWeightRange:[0.06,0.08] },
      { id:"U3", name:"Populations", examWeight:10/80, examWeightRange:[0.10,0.15] },
      { id:"U4", name:"Earth Systems and Resources", examWeight:10/80, examWeightRange:[0.10,0.15] },
      { id:"U5", name:"Land and Water Use", examWeight:10/80, examWeightRange:[0.10,0.15] },
      { id:"U6", name:"Energy Resources and Consumption", examWeight:10/80, examWeightRange:[0.10,0.15] },
      { id:"U7", name:"Atmospheric Pollution", examWeight:7/80, examWeightRange:[0.07,0.10] },
      { id:"U8", name:"Aquatic and Terrestrial Pollution", examWeight:7/80, examWeightRange:[0.07,0.10] },
      { id:"U9", name:"Global Change", examWeight:14/80, examWeightRange:[0.15,0.20] },
    ],
    skillCountRanges: {
      "1":[24,30], "2":[10,15], "3":[5,6], "4":[2,3],
      "5":[10,15], "6":[5,7], "7":[14,18],
    },
    examBlueprint: { sets:{quantitative:5, foundational:0, text:2, visual:5} },
    constraintDrawAttempts: 30000,
    freeResponse: {
      timeMinutes:70,
      questions:[
        "Question 1 (Design an Investigation)",
        "Question 2 (Analyze an Environmental Problem and Propose a Solution)",
        "Question 3 (Analyze an Environmental Problem and Propose a Solution Doing Calculations)",
      ],
    },
    dataVar:"QUESTIONS_AP_ENVIRONMENTAL_SCIENCE",
  },
  {
    id: "ap-physics-1",
    name: "AP Physics 1: Algebra-Based",
    category: "Sciences",
    tier: 1,
    // VERIFIED 2026-08-15 for the May 2027 exam:
    // https://apcentral.collegeboard.org/courses/ap-physics-1/exam
    // https://apcentral.collegeboard.org/media/pdf/ap-physics-1-course-and-exam-description.pdf
    // https://apcentral.collegeboard.org/media/pdf/ap-physics-1-course-and-exam-description-clarifications.pdf
    // The Fall 2026 clarification changes Section I from 40/80 to 42 questions /
    // 85 minutes and Section II from 100 to 95 minutes, effective May 2027.
    mcqCount: 42,
    mcqTimeMinutes: 85,
    totalExamTimeLabel: "3h 0m",
    formatVerified: true,
    releaseStatus: "released",
    allowsMultiSelect: false,
    calculatorAllowed: true,
    tierNote: "Four-function, scientific, or graphing calculators are permitted throughout this practice section.",
    // Published MCQ bands are converted to the exact feasible 5/8/8/5/5/3/3/5
    // allocation below. Every delivered share remains inside its CED band.
    units: [
      { id: "U1", name: "Kinematics", examWeight: 5 / 42, examWeightRange: [0.10, 0.15] },
      { id: "U2", name: "Force and Translational Dynamics", examWeight: 8 / 42, examWeightRange: [0.18, 0.23] },
      { id: "U3", name: "Work, Energy, and Power", examWeight: 8 / 42, examWeightRange: [0.18, 0.23] },
      { id: "U4", name: "Linear Momentum", examWeight: 5 / 42, examWeightRange: [0.10, 0.15] },
      { id: "U5", name: "Torque and Rotational Dynamics", examWeight: 5 / 42, examWeightRange: [0.10, 0.15] },
      { id: "U6", name: "Energy and Momentum of Rotating Systems", examWeight: 3 / 42, examWeightRange: [0.05, 0.08] },
      { id: "U7", name: "Oscillations", examWeight: 3 / 42, examWeightRange: [0.05, 0.08] },
      { id: "U8", name: "Fluids", examWeight: 5 / 42, examWeightRange: [0.10, 0.15] },
    ],
    // Science Practice 1 and 3.A are FRQ-only. These feasible integer ranges
    // translate the published MCQ skill bands to a 42-question section.
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
    // VERIFIED 2026-08-17 for the May 2027 exam against the current AP Central
    // course page, 2026 Course at a Glance, and Fall 2026 clarification.
    // Section I: 42 MCQs / 85 minutes; Section II: 4 FRQs / 95 minutes.
    mcqCount: 42,
    mcqTimeMinutes: 85,
    totalExamTimeLabel: "3h 0m",
    formatVerified: true,
    releaseStatus: "released",
    allowsMultiSelect: false,
    calculatorAllowed: true,
    tierNote: "Four-function, scientific, or graphing calculators are permitted throughout this practice section.",
    units: [
      { id:"U1", name:"Kinematics", examWeight:5/42, examWeightRange:[0.10,0.15] },
      { id:"U2", name:"Force and Translational Dynamics", examWeight:9/42, examWeightRange:[0.20,0.25] },
      { id:"U3", name:"Work, Energy, and Power", examWeight:8/42, examWeightRange:[0.15,0.25] },
      { id:"U4", name:"Linear Momentum", examWeight:6/42, examWeightRange:[0.10,0.20] },
      { id:"U5", name:"Torque and Rotational Dynamics", examWeight:5/42, examWeightRange:[0.10,0.15] },
      { id:"U6", name:"Energy and Momentum of Rotating Systems", examWeight:5/42, examWeightRange:[0.10,0.15] },
      { id:"U7", name:"Oscillations", examWeight:4/42, examWeightRange:[0.10,0.15] },
    ],
    attributeRanges: { skill: {
      "2.A":[11,12], "2.B":[9,10], "2.C":[5,6], "2.D":[5,6], "3.B":[7,10], "3.C":[3,4]
    } },
    stimulusSetRange: [2,4],
    constraintDrawAttempts: 30000,
    freeResponse: { timeMinutes:95, questions:[
      "Question 1 (Mathematical Routines)",
      "Question 2 (Translation Between Representations)",
      "Question 3 (Experimental Design and Analysis)",
      "Question 4 (Qualitative/Quantitative Translation)",
    ] },
    dataVar: "QUESTIONS_AP_PHYSICS_C_MECHANICS",
  },
  {
    id: "ap-physics-c-em",
    name: "AP Physics C: Electricity and Magnetism",
    category: "Sciences",
    tier: 1,
    // VERIFIED 2026-08-17 for May 2027 against AP Central course/exam pages,
    // 2026 Course at a Glance, and Fall 2026 clarifications.
    mcqCount: 42,
    mcqTimeMinutes: 85,
    totalExamTimeLabel: "3h 0m",
    formatVerified: true,
    releaseStatus: "released",
    allowsMultiSelect: false,
    calculatorAllowed: true,
    tierNote: "Calculators are permitted throughout this practice section.",
    units: [
      { id:"U8", name:"Electric Charges, Fields, and Gauss's Law", examWeight:0.20, examWeightRange:[0.15,0.25] },
      { id:"U9", name:"Electric Potential", examWeight:0.15, examWeightRange:[0.10,0.20] },
      { id:"U10", name:"Conductors and Capacitors", examWeight:0.125, examWeightRange:[0.10,0.15] },
      { id:"U11", name:"Electric Circuits", examWeight:0.20, examWeightRange:[0.15,0.25] },
      { id:"U12", name:"Magnetic Fields and Electromagnetism", examWeight:0.15, examWeightRange:[0.10,0.20] },
      { id:"U13", name:"Electromagnetic Induction", examWeight:0.15, examWeightRange:[0.10,0.20] },
    ],
    attributeRanges: { skill: { "2.A":[11,12], "2.B":[9,10], "2.C":[5,6], "2.D":[5,6], "3.B":[7,10], "3.C":[3,4] } },
    stimulusSetRange: [2,4],
    constraintDrawAttempts: 30000,
    freeResponse: { timeMinutes:95, questions:["Mathematical Routines","Translation Between Representations","Experimental Design and Analysis","Qualitative/Quantitative Translation"] },
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
