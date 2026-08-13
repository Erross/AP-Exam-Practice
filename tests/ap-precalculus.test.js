const test = require("node:test");
const assert = require("node:assert/strict");
const { AP_SUBJECTS } = require("../js/subjects");
const { drawExam } = require("../js/draw");
const { computePartBoundaries } = require("../js/session");
const { loadPrecalculusBank } = require("./helpers");

const subject = AP_SUBJECTS.find((item) => item.id === "ap-precalculus");
const bank = loadPrecalculusBank();

const EXPECTED_UNIT_TOPICS = { U1: 14, U2: 15, U3: 15 };
const EXPECTED_UNIT_COUNTS = { U1: 42, U2: 44, U3: 39 };

test("AP Precalculus bank matches its declared CED metadata and unit counts", () => {
  assert.equal(bank.length, 125);
  assert.equal(subject.formatVerified, true);
  assert.equal(subject.releaseStatus, "draft", "Precalculus must stay draft until an independent content review happens");
  assert.deepEqual(
    Object.fromEntries(subject.units.map((unit) => [unit.id, bank.filter((q) => q.unit === unit.id).length])),
    EXPECTED_UNIT_COUNTS
  );
  assert.equal(subject.units.length, 3, "Unit 4 is 0% exam weight per the CED and is intentionally excluded");
});

test("AP Precalculus bank passes schema, id, and CED topic-coverage checks", () => {
  const ids = new Set();
  const topicsByUnit = new Map();
  bank.forEach((question) => {
    assert.match(question.id, /^apprecalc-u[1-3]-\d{3}$/, `${question.id}: bad id format`);
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
      /This directly follows from the definitions and properties governing this topic\.?$/i,
      `${question.id}: rationale still carries the boilerplate fallback sentence`
    );
    assert.match(question.skill, /^[1-3]\.[A-C]$/, `${question.id}: unrecognized exact math-practice skill`);
    assert.match(question.topicCode, new RegExp(`^${question.unit.slice(1)}\\.\\d+$`), `${question.id}: topicCode doesn't match its unit`);
    assert.equal(typeof question.calculatorAllowed, "boolean", `${question.id}: calculatorAllowed must be a boolean`);
    topicsByUnit.set(question.unit, (topicsByUnit.get(question.unit) || new Set()).add(question.topicCode));
  });

  Object.entries(EXPECTED_UNIT_TOPICS).forEach(([unit, expected]) => {
    const found = topicsByUnit.get(unit) || new Set();
    assert.equal(found.size, expected, `${unit}: expected ${expected} distinct CED topics, found ${found.size}`);
  });
});

test("AP Precalculus bank stays within answer-construction bias limits", () => {
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

test("AP Precalculus distractors don't stack absolute-language wording", () => {
  const ABSOLUTE = /\b(always|never|every|only|entirely|unlimited|none|all|impossible|guarantee[sd]?|completely|identical)\b/i;
  bank.forEach((question) => {
    const distractors = question.o.filter((_, index) => index !== question.c[0]);
    const hits = distractors.filter((option) => ABSOLUTE.test(option));
    assert.ok(hits.length < 2, `${question.id}: multiple absolute-language distractors: ${JSON.stringify(hits)}`);
  });
});

test("every AP Precalculus draw matches the unit blueprint and delivers Part A before Part B", () => {
  for (let attempt = 0; attempt < 1500; attempt++) {
    const drawn = drawExam(subject, bank);
    assert.equal(drawn.length, subject.mcqCount);
    assert.deepEqual(
      Object.fromEntries(subject.units.map((unit) => [unit.id, drawn.filter((q) => q.unit === unit.id).length])),
      { U1: 15, U2: 14, U3: 13 }
    );
    const calcCounts = { false: 0, true: 0 };
    drawn.forEach((q) => { calcCounts[q.calculatorAllowed]++; });
    assert.equal(calcCounts.false, 29, "Part A (no calculator) must have exactly 29 questions");
    assert.equal(calcCounts.true, 13, "Part B (calculator) must have exactly 13 questions");

    const boundaries = computePartBoundaries(subject, drawn);
    assert.deepEqual(boundaries.map((p) => [p.start, p.end]), [[0, 29], [29, 42]]);
    assert.ok(drawn.slice(0, 29).every((q) => q.calculatorAllowed === false), "Part A leaked a calculator-required question");
    assert.ok(drawn.slice(29).every((q) => q.calculatorAllowed === true), "Part B leaked a no-calculator question");
    assert.equal(new Set(drawn.map((q) => q.id)).size, drawn.length, "draw contains duplicate questions");
  }
});

test("AP Precalculus retake overlap stays at or below the project target", () => {
  const pairs = 1200;
  let overlap = 0;
  for (let attempt = 0; attempt < pairs; attempt++) {
    const first = new Set(drawExam(subject, bank).map((question) => question.id));
    overlap += drawExam(subject, bank).filter((question) => first.has(question.id)).length / subject.mcqCount;
  }
  const average = overlap / pairs;
  assert.ok(average <= 0.40, `average overlap ${(100 * average).toFixed(1)}% exceeds the 40% target`);
});
