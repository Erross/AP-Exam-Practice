const test = require('node:test');
const assert = require('node:assert/strict');
const { AP_SUBJECTS } = require('../js/subjects.js');

const subject = AP_SUBJECTS.find((s) => s.id === 'ap-african-american-studies');

test('official Section I format and draft gate are fixed', () => {
  assert.equal(subject.mcqCount, 60);
  assert.equal(subject.mcqTimeMinutes, 70);
  assert.equal(subject.totalExamTimeLabel, '2h 45m');
  assert.equal(subject.formatVerified, true);
  assert.equal(subject.releaseStatus, 'draft');
  assert.equal(subject.allowsMultiSelect, false);
  assert.equal(subject.calculatorAllowed, false);
  assert.deepEqual(subject.stimulusSetRange, [15, 20]);
});

test('four official units and published weighting bands are represented exactly', () => {
  assert.deepEqual(subject.units.map((u) => u.id), ['U1', 'U2', 'U3', 'U4']);
  assert.deepEqual(subject.units.map((u) => u.examWeightRange), [
    [0.20, 0.25],
    [0.30, 0.35],
    [0.20, 0.25],
    [0.20, 0.25],
  ]);
  assert.deepEqual(subject.units.map((u) => u.examWeight), [0.225, 0.325, 0.225, 0.225]);
  assert.ok(Math.abs(subject.units.reduce((sum, u) => sum + u.examWeight, 0) - 1) < 1e-12);
});

test('preflight note is explicit about the MCQ-only scope', () => {
  assert.match(subject.tierNote, /Section I only/i);
  assert.match(subject.tierNote, /project validation/i);
  assert.match(subject.tierNote, /short-answer/i);
  assert.match(subject.tierNote, /document-based/i);
  assert.match(subject.tierNote, /course project/i);
});
