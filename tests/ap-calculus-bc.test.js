const test = require("node:test");
const assert = require("node:assert/strict");
const { AP_SUBJECTS } = require("../js/subjects");
const { drawExam } = require("../js/draw");
const { loadEffectiveBank } = require("../tools/subject-release-audit");

const subject = AP_SUBJECTS.find((s) => s.id === "ap-calculus-bc");
const { bank } = loadEffectiveBank(subject);

function topicRange(unit, start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => `${unit}.${start + i}`);
}

const EXPECTED_TOPICS = [
  ...topicRange(1, 1, 16),
  ...topicRange(2, 1, 10),
  ...topicRange(3, 1, 6),
  ...topicRange(4, 1, 7),
  ...topicRange(5, 1, 12),
  ...topicRange(6, 1, 14),
  ...topicRange(7, 1, 9),
  ...topicRange(8, 1, 13),
  ...topicRange(9, 1, 9),
  ...topicRange(10, 1, 15),
];

const BC_ONLY = [
  "6.11", "6.12", "6.13", "7.5", "7.9", "8.13",
  ...topicRange(9, 1, 9), ...topicRange(10, 1, 15),
];

const UNIT_COUNTS = { U1:3, U2:3, U3:3, U4:3, U5:5, U6:7, U7:3, U8:3, U9:5, U10:7 };
const PRACTICE_RANGES = { "1":[21,29], "2":[7,12], "3":[5,8] };

function byTopic(code) {
  return bank.filter((q) => q.topicCode === code);
}

function correctText(q) {
  return q.o[q.c[0]];
}

test("Calculus BC released metadata matches the May 2027 Section I structure", () => {
  assert.ok(subject);
  assert.equal(subject.releaseStatus, "released");
  assert.equal(subject.formatVerified, true);
  assert.equal(subject.mcqCount, 42);
  assert.equal(subject.mcqTimeMinutes, 100);
  assert.deepEqual(subject.examParts.parts, [
    { value:false, label:"Part A — Calculator not permitted", timeMinutes:62 },
    { value:true, label:"Part B — Graphing calculator required", timeMinutes:38 },
  ]);
  assert.deepEqual(subject.attributeRanges.calculatorAllowed, { false:[29,29], true:[13,13] });
  assert.deepEqual(subject.sciencePracticeRanges, PRACTICE_RANGES);
  assert.deepEqual(subject.units.map((u) => u.id), Object.keys(UNIT_COUNTS));
});

test("Calculus BC effective bank covers the exact Units 1-10 topic inventory", () => {
  assert.equal(bank.length, 210);
  assert.equal(new Set(bank.map((q) => q.id)).size, bank.length);
  const actual = [...new Set(bank.map((q) => q.topicCode))].sort((a,b) => {
    const [ua,ta] = a.split(".").map(Number); const [ub,tb] = b.split(".").map(Number);
    return ua-ub || ta-tb;
  });
  assert.deepEqual(actual, EXPECTED_TOPICS);
  for (const code of BC_ONLY) {
    const explicitlyAuthored = byTopic(code).filter((q) => q.id.startsWith("apcalcbc-u"));
    assert.ok(explicitlyAuthored.length >= 3, `${code}: expected at least three BC-authored questions`);
  }
});

test("every Calculus BC randomized form obeys exact unit, calculator, practice, and variant constraints", () => {
  const envelope = Object.fromEntries(Object.keys(PRACTICE_RANGES).map((k) => [k, [Infinity, -Infinity]]));
  for (let trial = 0; trial < 1500; trial++) {
    const draw = drawExam(subject, bank);
    assert.equal(draw.length, 42);
    assert.equal(new Set(draw.map((q) => q.id)).size, 42);
    const unitCounts = Object.fromEntries(Object.keys(UNIT_COUNTS).map((u) => [u, 0]));
    draw.forEach((q) => unitCounts[q.unit]++);
    assert.deepEqual(unitCounts, UNIT_COUNTS);
    assert.ok(draw.slice(0,29).every((q) => q.calculatorAllowed === false), `trial ${trial}: Part A calculator leak`);
    assert.ok(draw.slice(29).every((q) => q.calculatorAllowed === true), `trial ${trial}: Part B no-calculator leak`);
    const practices = { "1":0, "2":0, "3":0 };
    draw.forEach((q) => { const family = String(q.skill).split(".")[0]; if (practices[family] !== undefined) practices[family]++; });
    for (const [family,[lo,hi]] of Object.entries(PRACTICE_RANGES)) {
      assert.ok(practices[family] >= lo && practices[family] <= hi, `trial ${trial}: Practice ${family}=${practices[family]}`);
      envelope[family][0] = Math.min(envelope[family][0], practices[family]);
      envelope[family][1] = Math.max(envelope[family][1], practices[family]);
    }
    const variants = draw.map((q) => q.variantGroupId).filter(Boolean);
    assert.equal(new Set(variants).size, variants.length, `trial ${trial}: repeated semantic variant`);
  }
  console.log("Calculus BC practice envelope", envelope);
});

test("Calculus BC retake overlap remains at or below the project target", () => {
  let total = 0;
  const trials = 1500;
  for (let i = 0; i < trials; i++) {
    const a = drawExam(subject, bank); const b = drawExam(subject, bank);
    const ids = new Set(a.map((q) => q.id));
    total += b.filter((q) => ids.has(q.id)).length / 42;
  }
  const overlap = total / trials;
  console.log(`Calculus BC Monte Carlo overlap: ${(100*overlap).toFixed(1)}%`);
  assert.ok(overlap <= 0.40);
});

test("selected BC-only quantitative answers independently recompute", () => {
  const q611 = byTopic("6.11").find((q) => /x e\^x/.test(q.q));
  assert.equal(correctText(q611), "e^x(x − 1) + C");

  const q612 = byTopic("6.12").find((q) => /3x\+5/.test(q.q));
  assert.equal(correctText(q612), "2/(x+1) + 1/(x+2)");

  const q613 = byTopic("6.13").find((q) => /from 1 to ∞ of 1\/x²/.test(q.q));
  assert.equal(correctText(q613), "1");

  const q75 = byTopic("7.5").find((q) => /x\+y/.test(q.q));
  assert.equal(correctText(q75), "2.5");

  const q79 = byTopic("7.9").find((q) => /growth rate greatest/.test(q.q));
  assert.equal(correctText(q79), "250");

  const q92 = byTopic("9.2").find((q) => /t=1/.test(q.q));
  assert.equal(correctText(q92), "3/4");

  const q96 = byTopic("9.6").find((q) => /distance from the origin/.test(q.q));
  assert.equal(correctText(q96), "2");

  const q98 = byTopic("9.8").find((q) => /r=2cos/.test(q.q));
  assert.equal(correctText(q98), "π");

  const q102 = byTopic("10.2").find((q) => /\(1\/3\)/.test(q.q));
  assert.equal(correctText(q102), "3/2");

  const q1010 = byTopic("10.10").find((q) => /below 0\.01/.test(q.q));
  assert.equal(correctText(q1010), "100 terms");

  const q1013 = byTopic("10.13").find((q) => /\(x\+1\)\^n/.test(q.q));
  assert.equal(correctText(q1013), "[−3,1)");
});

test("BC-only variants are grouped by topic and never mixed with a stimulus set", () => {
  for (const code of BC_ONLY) {
    const authored = byTopic(code).filter((q) => q.id.startsWith("apcalcbc-u"));
    const groups = new Set(authored.map((q) => q.variantGroupId));
    assert.equal(groups.size, 1, `${code}: authored variants must share one group`);
    assert.ok(authored.every((q) => !q.stimulusGroupId), `${code}: authored variants must be standalone`);
  }
});
