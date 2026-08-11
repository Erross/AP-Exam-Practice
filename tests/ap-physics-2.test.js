const test = require("node:test");
const assert = require("node:assert/strict");
const { AP_SUBJECTS } = require("../js/subjects");
const { drawExam } = require("../js/draw");
const { loadPhysics2Bank } = require("./helpers");

// Independent-audit regression suite for the canonical Physics 2 branch state.
const subject = AP_SUBJECTS.find((item) => item.id === "ap-physics-2");
const bank = loadPhysics2Bank();

const EXPECTED_TOPICS = {
  U9: ["9.1","9.2","9.3","9.4","9.5","9.6"],
  U10: ["10.1","10.2","10.3","10.4","10.5","10.6","10.7"],
  U11: ["11.1","11.2","11.3","11.4","11.5","11.6","11.7","11.8"],
  U12: ["12.1","12.2","12.3","12.4"],
  U13: ["13.1","13.2","13.3","13.4"],
  U14: ["14.1","14.2","14.3","14.4","14.5","14.6","14.7","14.8","14.9"],
  U15: ["15.1","15.2","15.3","15.4","15.5","15.6","15.7","15.8"],
};
const EXPECTED_UNIT_COUNTS = { U9:20,U10:20,U11:22,U12:14,U13:15,U14:27,U15:22 };
const ALLOWED_MCQ_SKILLS = new Set(["2.A","2.B","2.C","2.D","3.B","3.C"]);


test("AP Physics 2 bank matches its declared CED metadata and unit counts", () => {
  assert.equal(bank.length, 140);
  assert.equal(subject.formatVerified, true);
  assert.equal(subject.mcqCount, 42);
  assert.equal(subject.mcqTimeMinutes, 85);
  assert.equal(subject.freeResponse.timeMinutes, 95);
  assert.deepEqual(subject.freeResponse.questions, ["Question 1 (Mathematical Routines)", "Question 2 (Translation Between Representations)", "Question 3 (Experimental Design and Analysis)", "Question 4 (Qualitative/Quantitative Translation)"]);
  assert.equal(subject.releaseStatus, "draft", "Physics 2 must stay draft until an independent content review happens");
  assert.deepEqual(
    Object.fromEntries(subject.units.map((unit) => [unit.id, bank.filter((q) => q.unit === unit.id).length])),
    EXPECTED_UNIT_COUNTS
  );
});

test("AP Physics 2 bank passes schema, id, and CED topic-coverage checks", () => {
  const ids = new Set();
  const topicsByUnit = new Map();
  const variantMap = new Map();
  bank.forEach((question) => {
    assert.match(question.id, /^apphys2-u(9|1[0-5])-\d{3}$/, `${question.id}: bad id format`);
    assert.ok(!ids.has(question.id), `duplicate id ${question.id}`);
    ids.add(question.id);
    assert.equal(question.type, "s");
    assert.equal(question.o.length, 4);
    assert.equal(question.c.length, 1);
    assert.ok(Number.isInteger(question.c[0]) && question.c[0] >= 0 && question.c[0] < 4);
    assert.ok(question.q.length >= 20, `${question.id}: stem is too short`);
    assert.ok(question.e.length >= 90, `${question.id}: explanation lacks reasoning`);
    assert.doesNotMatch(
      question.e,
      /This reasoning connects the observed or calculated result directly to the physical model in the question\.?$/i,
      `${question.id}: rationale still carries the boilerplate fallback sentence`
    );
    assert.ok(ALLOWED_MCQ_SKILLS.has(question.skill), `${question.id}: ${question.skill} is not assessed in Physics 2 MCQ`);
    assert.match(question.topicCode, new RegExp(`^${question.unit.slice(1)}\\.\\d+$`), `${question.id}: topicCode doesn't match its unit`);
    topicsByUnit.set(question.unit, (topicsByUnit.get(question.unit) || new Set()).add(question.topicCode));

    if (question.variantGroupId) {
      assert.ok(!question.stimulusGroupId, `${question.id}: variant tags are for standalone questions only`);
      if (!variantMap.has(question.variantGroupId)) variantMap.set(question.variantGroupId, []);
      variantMap.get(question.variantGroupId).push(question);
    }
  });

  Object.entries(EXPECTED_TOPICS).forEach(([unit, expected]) => {
    const found = [...(topicsByUnit.get(unit) || new Set())].sort();
    assert.equal(found.join(","), expected.join(","), `${unit}: exact CED topic set changed`);
  });

  for (const [groupId, questions] of variantMap) {
    assert.ok(questions.length >= 2, `${groupId}: variant group has only one question`);
    assert.equal(new Set(questions.map((q) => q.unit)).size, 1, `${groupId}: variants may not cross units`);
    assert.equal(new Set(questions.map((q) => q.topicCode)).size, 1, `${groupId}: variants must share a topic code`);
    const distinctText = new Set(questions.map((q) => q.q.trim().toLowerCase()));
    assert.equal(distinctText.size, questions.length, `${groupId}: variant questions must be worded differently`);
  }
});

test("AP Physics 2 has seven original shared data sets with three linked questions each", () => {
  const groups = new Map();
  bank.filter((q) => q.stimulusGroupId).forEach((q) => {
    if (!groups.has(q.stimulusGroupId)) groups.set(q.stimulusGroupId, []);
    groups.get(q.stimulusGroupId).push(q);
  });
  assert.equal(groups.size, 7);
  assert.deepEqual([...new Set([...groups.values()].map((items) => items[0].unit))].sort(), ["U10","U11","U12","U13","U14","U15","U9"]);
  for (const [groupId, questions] of groups) {
    assert.equal(questions.length, 3, `${groupId}: expected three linked questions`);
    assert.equal(new Set(questions.map((q) => q.stimulus)).size, 1, `${groupId}: stimulus object is not shared by reference`);
    const stimulus = questions[0].stimulus;
    assert.equal(stimulus.type, "table");
    assert.match(stimulus.source, /^Original simulated data created for AP Exam Practice.$/);
    assert.ok(stimulus.description.length >= 60, `${groupId}: description is too short`);
    assert.ok(Array.isArray(stimulus.columns) && stimulus.columns.length >= 2);
    assert.ok(Array.isArray(stimulus.rows) && stimulus.rows.length >= 3);
  }
});

test("AP Physics 2 bank stays within answer-construction bias limits", () => {
  const wordCount = (text) => text.trim().split(/\s+/).length;
  let uniqueLongest = 0;
  let amongLongest = 0;
  let correctWords = 0;
  let distractorWords = 0;
  bank.forEach((question) => {
    const lengths = question.o.map(wordCount);
    const longest = Math.max(...lengths);
    const correctLength = lengths[question.c[0]];
    if (correctLength === longest) amongLongest++;
    if (correctLength === longest && lengths.filter((length) => length === longest).length === 1) uniqueLongest++;
    correctWords += correctLength;
    lengths.forEach((length, index) => { if (index !== question.c[0]) distractorWords += length; });
  });
  const correctAverage = correctWords / bank.length;
  const distractorAverage = distractorWords / (bank.length * 3);
  assert.ok(uniqueLongest / bank.length <= 0.25, `uniquely-longest correct answer rate too high: ${uniqueLongest}/${bank.length}`);
  assert.ok(amongLongest / bank.length <= 0.58, `among-longest correct answer rate too high: ${amongLongest}/${bank.length}`);
  assert.ok(
    Math.abs(correctAverage - distractorAverage) / distractorAverage <= 0.12,
    `correct/distractor average word-count gap too wide: ${correctAverage.toFixed(2)} vs ${distractorAverage.toFixed(2)}`
  );
  for (let position = 0; position < 4; position++) {
    const share = bank.filter((question) => question.c[0] === position).length / bank.length;
    assert.ok(share >= 0.15 && share <= 0.35, `raw answer position ${position} is imbalanced: ${(share * 100).toFixed(1)}%`);
  }
});

test("AP Physics 2 distractors don't stack absolute-language wording", () => {
  const ABSOLUTE = /\b(always|never|every|only|entirely|unlimited|none|all|impossible|guarantee[sd]?|completely|identical)\b/i;
  bank.forEach((question) => {
    const distractors = question.o.filter((_, index) => index !== question.c[0]);
    const hits = distractors.filter((option) => ABSOLUTE.test(option));
    assert.ok(hits.length < 2, `${question.id}: multiple absolute-language distractors: ${JSON.stringify(hits)}`);
  });
});

test("every AP Physics 2 draw matches the configured unit, stimulus, and MCQ-skill ranges", () => {
  for (let attempt = 0; attempt < 2000; attempt++) {
    const drawn = drawExam(subject, bank);
    assert.equal(drawn.length, subject.mcqCount);
    assert.deepEqual(
      Object.fromEntries(subject.units.map((unit) => [unit.id, drawn.filter((q) => q.unit === unit.id).length])),
      { U9: 7, U10: 7, U11: 7, U12: 5, U13: 5, U14: 6, U15: 5 }
    );
    const stimulusSets = new Set(drawn.filter((q) => q.stimulusGroupId).map((q) => q.stimulusGroupId));
    assert.ok(stimulusSets.size >= subject.stimulusSetRange[0] && stimulusSets.size <= subject.stimulusSetRange[1], `stimulus sets: ${stimulusSets.size}`);
    for (const groupId of stimulusSets) {
      const bankMembers = bank.filter((q) => q.stimulusGroupId === groupId).map((q) => q.id).sort();
      const drawMembers = drawn.filter((q) => q.stimulusGroupId === groupId).map((q) => q.id).sort();
      assert.equal(drawMembers.join(","), bankMembers.join(","), `${groupId}: stimulus group was split`);
    }
    Object.entries(subject.attributeRanges.skill).forEach(([skill, range]) => {
      const count = drawn.filter((q) => q.skill === skill).length;
      assert.ok(count >= range[0] && count <= range[1], `skill ${skill}: ${count} outside ${range}`);
    });
    assert.equal(new Set(drawn.map((q) => q.id)).size, drawn.length, "draw contains duplicate questions");
  }
});

test("AP Physics 2 retake overlap stays at or below the project target", () => {
  const pairs = 1500;
  let overlap = 0;
  for (let attempt = 0; attempt < pairs; attempt++) {
    const first = new Set(drawExam(subject, bank).map((question) => question.id));
    overlap += drawExam(subject, bank).filter((question) => first.has(question.id)).length / subject.mcqCount;
  }
  const average = overlap / pairs;
  assert.ok(average <= 0.40, `average overlap ${(100 * average).toFixed(1)}% exceeds the 40% target`);
});
