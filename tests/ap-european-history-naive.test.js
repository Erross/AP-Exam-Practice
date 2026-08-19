const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { AP_SUBJECTS } = require('../js/subjects.js');

const subject = AP_SUBJECTS.find((s) => s.id === 'ap-european-history');

test('AP Euro naive student preflight exposes the May 2027 exam-critical facts', () => {
  assert.ok(subject);
  assert.equal(subject.mcqCount, 55);
  assert.equal(subject.mcqTimeMinutes, 55);
  assert.equal(subject.totalExamTimeLabel, '3h 15m');
  assert.equal(subject.calculatorAllowed, false);
  assert.equal(subject.formatVerified, true);
  assert.equal(subject.releaseStatus, 'released', 'promoted AP Euro metadata must remain released');
  assert.match(subject.tierNote, /Section I Part A/i);
  assert.match(subject.tierNote, /fully digital/i);
  assert.match(subject.tierNote, /short-answer/i);
  assert.match(subject.tierNote, /document-based/i);
  assert.match(subject.tierNote, /long essay/i);
});

test('generic preflight UI will surface count, timing, scope note, and calculator status for Euro', () => {
  const catalog = fs.readFileSync('js/catalog.js', 'utf8');
  assert.match(catalog, /\$\{subject\.mcqCount\} multiple-choice questions · \$\{subject\.mcqTimeMinutes\} minutes/);
  assert.match(catalog, /subject\.tierNote/);
  assert.match(catalog, /Calculator not permitted/);
  assert.match(catalog, /save your place automatically/i);
});

test('site-level trust language makes the unofficial MCQ-only limitation visible', () => {
  const index = fs.readFileSync('index.html', 'utf8');
  assert.match(index, /not affiliated with College Board/i);
  assert.match(index, /multiple-choice practice only/i);
  assert.match(index, /does not currently simulate free-response/i);
});