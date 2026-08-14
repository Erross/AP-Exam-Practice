from pathlib import Path

# Replace the minimal BC stub metadata with the verified Fall-2026 / May-2027 blueprint.
p = Path('js/subjects.js')
s = p.read_text()
old = '''  {
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
  },'''
new = '''  {
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
    releaseStatus: "draft",
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
  },'''
if old not in s:
    raise SystemExit('BC subject stub block not found')
s = s.replace(old, new)
p.write_text(s)

# Load the BC-only development layers after the shared AB-derived base bank.
p = Path('index.html')
s = p.read_text()
needle = '<script src="data/ap-calculus-bc.js"></script>'
replacement = '''<script src="data/ap-calculus-bc.js"></script>
<script src="data/ap-calculus-bc-u6-u8.js"></script>
<script src="data/ap-calculus-bc-u9.js"></script>
<script src="data/ap-calculus-bc-u10.js"></script>'''
if replacement not in s:
    if needle not in s:
        raise SystemExit('BC index script marker not found')
    s = s.replace(needle, replacement)
p.write_text(s)

# Correct the Unit 9 radial-distance item caught during author review.
p = Path('data/ap-calculus-bc-u9.js')
s = p.read_text()
old = 'correct:"2√5/5", distractors:["2","4/5","√5"]'
new = 'correct:"2", distractors:["4/5","√5","2√5/5"]'
if old not in s:
    raise SystemExit('known U9 motion repair target not found')
s = s.replace(old, new)
p.write_text(s)
