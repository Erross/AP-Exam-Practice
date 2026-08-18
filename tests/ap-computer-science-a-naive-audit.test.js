const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const subject = require('./helpers/ap-computer-science-a-candidate');

test('AP CSA naive student preflight exposes the current exam-critical facts', () => {
  assert.ok(['draft', 'released'].includes(subject.releaseStatus), `unexpected release status ${subject.releaseStatus}`);
  assert.equal(subject.mcqCount, 42);
  assert.equal(subject.mcqTimeMinutes, 90);
  assert.equal(subject.totalExamTimeLabel, '3h 0m');
  assert.equal(subject.calculatorAllowed, false);
  assert.match(subject.tierNote, /fully digital/i);
  assert.match(subject.tierNote, /java quick reference/i);
  assert.match(subject.tierNote, /multiple-choice section only/i);
  assert.equal(subject.freeResponse.timeMinutes, 90);
  assert.deepEqual(Array.from(subject.freeResponse.questions), [
    'Question 1 (Methods and Control Structures)',
    'Question 2 (Class Design)',
    'Question 3 (Data Analysis with ArrayList)',
    'Question 4 (2D Array)',
  ]);
});

test('site-level explanation makes the CSA practice limitation explicit', () => {
  const about = fs.readFileSync('about.html', 'utf8');
  assert.match(about, /MCQ-only practice site/i);
  assert.match(about, /does not provide free-response questions/i);
  assert.match(about, /full-exam duration shown on a course card is context/i);
  assert.match(about, /in-progress practice state is stored locally in your browser/i);
});
