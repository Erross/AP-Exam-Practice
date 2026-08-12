const test = require('node:test');
const assert = require('node:assert/strict');
const { AP_SUBJECTS } = require('../js/subjects');
const { drawExam } = require('../js/draw');
const { loadStatisticsBank } = require('./helpers');

const subject = AP_SUBJECTS.find((s) => s.id === 'ap-statistics');
const bank = loadStatisticsBank();
const TOPICS = { U1: 13, U2: 12, U3: 15, U4: 10, U5: 5 };

test('Statistics metadata and bank match the redesigned exam', () => {
  assert.equal(bank.length, 140);
  assert.equal(subject.releaseStatus, 'draft');
  assert.equal(subject.mcqCount, 42);
  assert.equal(subject.mcqTimeMinutes, 90);
  assert.equal(subject.units.length, 5);
  assert.deepEqual(subject.stimulusSetRange, [2, 2]);
  assert.deepEqual(subject.sciencePracticeRanges, {
    '1': [3, 4], '2': [9, 12], '3': [11, 14], '4': [11, 14],
  });
  assert.deepEqual(subject.attributeRanges.statsSetType, {
    probability: [3, 3], regression: [3, 3],
  });
});

test('Statistics schema and all 55 CED topics are covered', () => {
  const ids = new Set();
  const seen = {};
  for (const q of bank) {
    assert.match(q.id, /^apstats-u[1-5]-\d{3}$/);
    assert.ok(!ids.has(q.id), `duplicate id ${q.id}`);
    ids.add(q.id);
    assert.equal(q.type, 's');
    assert.equal(q.o.length, 4);
    assert.equal(q.c.length, 1);
    assert.ok(Number.isInteger(q.c[0]) && q.c[0] >= 0 && q.c[0] < 4);
    assert.match(q.skill, /^[1-4]\.[A-G]$/);
    assert.ok(q.e.length >= 90, `${q.id}: rationale is too short`);
    (seen[q.unit] ??= new Set()).add(q.topicCode);
  }
  for (const [unit, expected] of Object.entries(TOPICS)) {
    assert.equal(seen[unit].size, expected, `${unit}: incomplete topic coverage`);
  }
});

test('Statistics has three probability and three regression candidate stimulus sets', () => {
  const groups = new Map();
  for (const q of bank.filter((item) => item.stimulusGroupId)) {
    if (!groups.has(q.stimulusGroupId)) groups.set(q.stimulusGroupId, []);
    groups.get(q.stimulusGroupId).push(q);
  }
  assert.equal(groups.size, 6);
  const types = { probability: 0, regression: 0 };
  for (const [groupId, questions] of groups) {
    assert.equal(questions.length, 3, `${groupId}: expected a three-question set`);
    assert.ok(questions.every((q) => q.stimulus === questions[0].stimulus), `${groupId}: stimulus object is not shared`);
    assert.match(questions[0].stimulus.source, /Original (synthetic|simulated)/i, `${groupId}: synthetic provenance missing`);
    const type = questions[0].statsSetType;
    assert.ok(type === 'probability' || type === 'regression');
    assert.ok(questions.every((q) => q.statsSetType === type), `${groupId}: set type is inconsistent`);
    types[type]++;
  }
  assert.deepEqual(types, { probability: 3, regression: 3 });
});

test('Statistics answer construction stays within project bias limits', () => {
  const wordCount = (s) => s.trim().split(/\s+/).length;
  let uniqueLongest = 0;
  let amongLongest = 0;
  let correctWords = 0;
  let distractorWords = 0;
  const keys = [0, 0, 0, 0];
  for (const q of bank) {
    keys[q.c[0]]++;
    const lengths = q.o.map(wordCount);
    const longest = Math.max(...lengths);
    const correctLength = lengths[q.c[0]];
    if (correctLength === longest) amongLongest++;
    if (correctLength === longest && lengths.filter((x) => x === longest).length === 1) uniqueLongest++;
    correctWords += correctLength;
    lengths.forEach((x, i) => { if (i !== q.c[0]) distractorWords += x; });
  }
  const correctAverage = correctWords / bank.length;
  const distractorAverage = distractorWords / (bank.length * 3);
  assert.ok(uniqueLongest / bank.length <= 0.25);
  assert.ok(amongLongest / bank.length <= 0.58);
  assert.ok(Math.abs(correctAverage - distractorAverage) / distractorAverage <= 0.12);
  for (const count of keys) assert.ok(count / bank.length >= 0.15 && count / bank.length <= 0.35);
});

test('every Statistics draw obeys unit, practice, and required-set blueprints', () => {
  for (let i = 0; i < 1500; i++) {
    const drawn = drawExam(subject, bank);
    assert.equal(drawn.length, 42);
    const unitCounts = Object.fromEntries(subject.units.map((u) => [u.id, drawn.filter((q) => q.unit === u.id).length]));
    assert.deepEqual(unitCounts, { U1: 11, U2: 9, U3: 9, U4: 7, U5: 6 });
    assert.equal(drawn.filter((q) => q.statsSetType === 'probability').length, 3);
    assert.equal(drawn.filter((q) => q.statsSetType === 'regression').length, 3);
    assert.equal(new Set(drawn.map((q) => q.id)).size, 42);
    const practices = { 1: 0, 2: 0, 3: 0, 4: 0 };
    drawn.forEach((q) => practices[q.skill[0]]++);
    for (const [practice, [lo, hi]] of Object.entries(subject.sciencePracticeRanges)) {
      assert.ok(practices[practice] >= lo && practices[practice] <= hi);
    }
  }
});

test('Statistics retake overlap stays at or below the project target', () => {
  const pairs = 1000;
  let total = 0;
  for (let i = 0; i < pairs; i++) {
    const first = new Set(drawExam(subject, bank).map((q) => q.id));
    total += drawExam(subject, bank).filter((q) => first.has(q.id)).length / 42;
  }
  const average = total / pairs;
  console.log(`Statistics Monte Carlo overlap: ${(average * 100).toFixed(1)}%`);
  assert.ok(average <= 0.40, `average overlap ${(average * 100).toFixed(1)}% exceeds 40%`);
});

test('selected independently recomputed quantitative answers remain correct', () => {
  const byStem = (fragment) => bank.find((q) => q.q.includes(fragment));
  assert.ok(byStem('x₁=84').o[byStem('x₁=84').c[0]].includes('147/230'));
  assert.equal(byStem('observed difference is 6').o[byStem('observed difference is 6').c[0]], '3');
  assert.ok(byStem('9-mile delivery').o[byStem('9-mile delivery').c[0]].includes('36.9'));
});
