// AP Exam Practice — subject registry
// Metadata only. Question banks live in data/<id>.js and are loaded separately.
// tier: 1 = text/image MCQ, fully buildable now. 2 = MCQ section depends on audio
//        (listening/aural) which this framework doesn't play back yet.
// A subject's catalog card is enabled once its data/<id>.js array has questions in it.
const AP_SUBJECTS = [
  {
    id: "ap-art-history",
    name: "AP Art History",
    category: "Arts",
    tier: 1,
    mcqCount: 28,
    mcqTimeMinutes: 80,
    totalExamTimeLabel: "3h 0m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_ART_HISTORY", // global variable name set by data/ap-art-history.js
  },
  {
    id: "ap-music-theory",
    name: "AP Music Theory",
    category: "Arts",
    tier: 2,
    mcqCount: 75,
    mcqTimeMinutes: 65,
    totalExamTimeLabel: "2h 5m",
    tierNote: "Includes aural/sight-singing questions — audio playback not yet supported.",
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_MUSIC_THEORY", // global variable name set by data/ap-music-theory.js
  },
  {
    id: "ap-english-language",
    name: "AP English Language and Composition",
    category: "English",
    tier: 1,
    mcqCount: 45,
    mcqTimeMinutes: 60,
    totalExamTimeLabel: "3h 15m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_ENGLISH_LANGUAGE", // global variable name set by data/ap-english-language.js
  },
  {
    id: "ap-english-literature",
    name: "AP English Literature and Composition",
    category: "English",
    tier: 1,
    mcqCount: 55,
    mcqTimeMinutes: 60,
    totalExamTimeLabel: "3h 0m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_ENGLISH_LITERATURE", // global variable name set by data/ap-english-literature.js
  },
  {
    id: "ap-african-american-studies",
    name: "AP African American Studies",
    category: "History & Social Sciences",
    tier: 1,
    mcqCount: 50,
    mcqTimeMinutes: 60,
    totalExamTimeLabel: "2h 30m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES", // global variable name set by data/ap-african-american-studies.js
  },
  {
    id: "ap-comparative-government",
    name: "AP Comparative Government and Politics",
    category: "History & Social Sciences",
    tier: 1,
    mcqCount: 55,
    mcqTimeMinutes: 60,
    totalExamTimeLabel: "2h 30m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_COMPARATIVE_GOVERNMENT", // global variable name set by data/ap-comparative-government.js
  },
  {
    id: "ap-european-history",
    name: "AP European History",
    category: "History & Social Sciences",
    tier: 1,
    mcqCount: 55,
    mcqTimeMinutes: 55,
    totalExamTimeLabel: "3h 15m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_EUROPEAN_HISTORY", // global variable name set by data/ap-european-history.js
  },
  {
    id: "ap-human-geography",
    name: "AP Human Geography",
    category: "History & Social Sciences",
    tier: 1,
    mcqCount: 60,
    mcqTimeMinutes: 60,
    totalExamTimeLabel: "2h 15m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_HUMAN_GEOGRAPHY", // global variable name set by data/ap-human-geography.js
  },
  {
    id: "ap-macroeconomics",
    name: "AP Macroeconomics",
    category: "History & Social Sciences",
    tier: 1,
    mcqCount: 60,
    mcqTimeMinutes: 70,
    totalExamTimeLabel: "2h 10m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_MACROECONOMICS", // global variable name set by data/ap-macroeconomics.js
  },
  {
    id: "ap-microeconomics",
    name: "AP Microeconomics",
    category: "History & Social Sciences",
    tier: 1,
    mcqCount: 60,
    mcqTimeMinutes: 70,
    totalExamTimeLabel: "2h 10m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_MICROECONOMICS", // global variable name set by data/ap-microeconomics.js
  },
  {
    id: "ap-psychology",
    name: "AP Psychology",
    category: "History & Social Sciences",
    tier: 1,
    mcqCount: 75,
    mcqTimeMinutes: 90,
    totalExamTimeLabel: "2h 40m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_PSYCHOLOGY", // global variable name set by data/ap-psychology.js
  },
  {
    id: "ap-us-government",
    name: "AP United States Government and Politics",
    category: "History & Social Sciences",
    tier: 1,
    mcqCount: 55,
    mcqTimeMinutes: 80,
    totalExamTimeLabel: "3h 0m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_US_GOVERNMENT", // global variable name set by data/ap-us-government.js
  },
  {
    id: "ap-us-history",
    name: "AP United States History",
    category: "History & Social Sciences",
    tier: 1,
    mcqCount: 55,
    mcqTimeMinutes: 55,
    totalExamTimeLabel: "3h 15m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_US_HISTORY", // global variable name set by data/ap-us-history.js
  },
  {
    id: "ap-world-history",
    name: "AP World History: Modern",
    category: "History & Social Sciences",
    tier: 1,
    mcqCount: 55,
    mcqTimeMinutes: 55,
    totalExamTimeLabel: "3h 15m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_WORLD_HISTORY", // global variable name set by data/ap-world-history.js
  },
  {
    id: "ap-calculus-ab",
    name: "AP Calculus AB",
    category: "Math & Computer Science",
    tier: 1,
    mcqCount: 45,
    mcqTimeMinutes: 105,
    totalExamTimeLabel: "3h 15m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_CALCULUS_AB", // global variable name set by data/ap-calculus-ab.js
  },
  {
    id: "ap-calculus-bc",
    name: "AP Calculus BC",
    category: "Math & Computer Science",
    tier: 1,
    mcqCount: 45,
    mcqTimeMinutes: 105,
    totalExamTimeLabel: "3h 15m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_CALCULUS_BC", // global variable name set by data/ap-calculus-bc.js
  },
  {
    id: "ap-computer-science-a",
    name: "AP Computer Science A",
    category: "Math & Computer Science",
    tier: 1,
    mcqCount: 40,
    mcqTimeMinutes: 90,
    totalExamTimeLabel: "3h 0m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_COMPUTER_SCIENCE_A", // global variable name set by data/ap-computer-science-a.js
  },
  {
    id: "ap-computer-science-principles",
    name: "AP Computer Science Principles",
    category: "Math & Computer Science",
    tier: 1,
    mcqCount: 70,
    mcqTimeMinutes: 120,
    totalExamTimeLabel: "2h 0m",
    tierNote: "MCQ is the entire exam-day test; the Create Performance Task is separate coursework, not modeled here.",
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_COMPUTER_SCIENCE_PRINCIPLES", // global variable name set by data/ap-computer-science-principles.js
  },
  {
    id: "ap-precalculus",
    name: "AP Precalculus",
    category: "Math & Computer Science",
    tier: 1,
    mcqCount: 40,
    mcqTimeMinutes: 80,
    totalExamTimeLabel: "2h 0m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_PRECALCULUS", // global variable name set by data/ap-precalculus.js
  },
  {
    id: "ap-statistics",
    name: "AP Statistics",
    category: "Math & Computer Science",
    tier: 1,
    mcqCount: 40,
    mcqTimeMinutes: 90,
    totalExamTimeLabel: "3h 0m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_STATISTICS", // global variable name set by data/ap-statistics.js
  },
  {
    id: "ap-biology",
    name: "AP Biology",
    category: "Sciences",
    tier: 1,
    mcqCount: 60,
    mcqTimeMinutes: 90,
    totalExamTimeLabel: "3h 0m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_BIOLOGY", // global variable name set by data/ap-biology.js
  },
  {
    id: "ap-chemistry",
    name: "AP Chemistry",
    category: "Sciences",
    tier: 1,
    mcqCount: 60,
    mcqTimeMinutes: 90,
    totalExamTimeLabel: "3h 15m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_CHEMISTRY", // global variable name set by data/ap-chemistry.js
  },
  {
    id: "ap-environmental-science",
    name: "AP Environmental Science",
    category: "Sciences",
    tier: 1,
    mcqCount: 80,
    mcqTimeMinutes: 90,
    totalExamTimeLabel: "2h 40m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_ENVIRONMENTAL_SCIENCE", // global variable name set by data/ap-environmental-science.js
  },
  {
    id: "ap-physics-1",
    name: "AP Physics 1: Algebra-Based",
    category: "Sciences",
    tier: 1,
    mcqCount: 50,
    mcqTimeMinutes: 80,
    totalExamTimeLabel: "2h 50m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_PHYSICS_1", // global variable name set by data/ap-physics-1.js
  },
  {
    id: "ap-physics-2",
    name: "AP Physics 2: Algebra-Based",
    category: "Sciences",
    tier: 1,
    mcqCount: 50,
    mcqTimeMinutes: 90,
    totalExamTimeLabel: "3h 0m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_PHYSICS_2", // global variable name set by data/ap-physics-2.js
  },
  {
    id: "ap-physics-c-mechanics",
    name: "AP Physics C: Mechanics",
    category: "Sciences",
    tier: 1,
    mcqCount: 35,
    mcqTimeMinutes: 45,
    totalExamTimeLabel: "1h 30m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_PHYSICS_C_MECHANICS", // global variable name set by data/ap-physics-c-mechanics.js
  },
  {
    id: "ap-physics-c-em",
    name: "AP Physics C: Electricity and Magnetism",
    category: "Sciences",
    tier: 1,
    mcqCount: 35,
    mcqTimeMinutes: 45,
    totalExamTimeLabel: "1h 30m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_PHYSICS_C_EM", // global variable name set by data/ap-physics-c-em.js
  },
  {
    id: "ap-chinese",
    name: "AP Chinese Language and Culture",
    category: "World Languages & Cultures",
    tier: 2,
    mcqCount: 65,
    mcqTimeMinutes: 95,
    totalExamTimeLabel: "3h 0m",
    tierNote: "Includes listening-comprehension questions — audio playback not yet supported.",
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_CHINESE", // global variable name set by data/ap-chinese.js
  },
  {
    id: "ap-french",
    name: "AP French Language and Culture",
    category: "World Languages & Cultures",
    tier: 2,
    mcqCount: 65,
    mcqTimeMinutes: 95,
    totalExamTimeLabel: "3h 0m",
    tierNote: "Includes listening-comprehension questions — audio playback not yet supported.",
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_FRENCH", // global variable name set by data/ap-french.js
  },
  {
    id: "ap-german",
    name: "AP German Language and Culture",
    category: "World Languages & Cultures",
    tier: 2,
    mcqCount: 65,
    mcqTimeMinutes: 95,
    totalExamTimeLabel: "3h 0m",
    tierNote: "Includes listening-comprehension questions — audio playback not yet supported.",
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_GERMAN", // global variable name set by data/ap-german.js
  },
  {
    id: "ap-italian",
    name: "AP Italian Language and Culture",
    category: "World Languages & Cultures",
    tier: 2,
    mcqCount: 65,
    mcqTimeMinutes: 95,
    totalExamTimeLabel: "3h 0m",
    tierNote: "Includes listening-comprehension questions — audio playback not yet supported.",
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_ITALIAN", // global variable name set by data/ap-italian.js
  },
  {
    id: "ap-japanese",
    name: "AP Japanese Language and Culture",
    category: "World Languages & Cultures",
    tier: 2,
    mcqCount: 65,
    mcqTimeMinutes: 95,
    totalExamTimeLabel: "3h 0m",
    tierNote: "Includes listening-comprehension questions — audio playback not yet supported.",
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_JAPANESE", // global variable name set by data/ap-japanese.js
  },
  {
    id: "ap-spanish-language",
    name: "AP Spanish Language and Culture",
    category: "World Languages & Cultures",
    tier: 2,
    mcqCount: 65,
    mcqTimeMinutes: 95,
    totalExamTimeLabel: "3h 0m",
    tierNote: "Includes listening-comprehension questions — audio playback not yet supported.",
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_SPANISH_LANGUAGE", // global variable name set by data/ap-spanish-language.js
  },
  {
    id: "ap-spanish-literature",
    name: "AP Spanish Literature and Culture",
    category: "World Languages & Cultures",
    tier: 2,
    mcqCount: 65,
    mcqTimeMinutes: 90,
    totalExamTimeLabel: "3h 40m",
    tierNote: "Includes an oral component on the real exam — audio not yet supported.",
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_SPANISH_LITERATURE", // global variable name set by data/ap-spanish-literature.js
  },
  {
    id: "ap-latin",
    name: "AP Latin",
    category: "World Languages & Cultures",
    tier: 1,
    mcqCount: 50,
    mcqTimeMinutes: 60,
    totalExamTimeLabel: "3h 0m",
    tierNote: null,
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_LATIN", // global variable name set by data/ap-latin.js
  },
  {
    id: "ap-business-personal-finance",
    name: "AP Business with Personal Finance",
    category: "Career Kickstart",
    tier: 1,
    mcqCount: null,
    mcqTimeMinutes: null,
    totalExamTimeLabel: "~2h (TBD)",
    tierNote: "New course — confirm exam format against the current CED before building content.",
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_BUSINESS_PERSONAL_FINANCE", // global variable name set by data/ap-business-personal-finance.js
  },
  {
    id: "ap-cybersecurity",
    name: "AP Cybersecurity",
    category: "Career Kickstart",
    tier: 1,
    mcqCount: null,
    mcqTimeMinutes: null,
    totalExamTimeLabel: "TBD",
    tierNote: "New course — confirm exam format against the current CED before building content.",
    units: [], // optional per-unit exam weights, added when a subject's content is built
    dataVar: "QUESTIONS_AP_CYBERSECURITY", // global variable name set by data/ap-cybersecurity.js
  },
];

const AP_CATEGORIES = [...new Set(AP_SUBJECTS.map(s => s.category))];
