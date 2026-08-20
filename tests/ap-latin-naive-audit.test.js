const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { AP_SUBJECTS } = require('../js/subjects.js');

function effectiveLatin() {
  const subjects = structuredClone(AP_SUBJECTS);
  const context = { AP_SUBJECTS: subjects };
  context.globalThis = context;
  vm.createContext(context);
  vm.runInContext(fs.readFileSync('js/ap-latin-metadata.js', 'utf8'), context, { filename: 'js/ap-latin-metadata.js' });
  return subjects.find((subject) => subject.id === 'ap-latin');
}

test('AP Latin naive student preflight exposes the May 2027 exam-critical facts', () => {
  const subject = effectiveLatin();
  assert.equal(subject.mcqCount, 52);
  assert.equal(subject.mcqTimeMinutes, 65);
  assert.equal(subject.totalExamTimeLabel, '3h 0m');
  assert.equal(subject.calculatorAllowed, false);
  assert.equal(subject.formatVerified, true);
  assert.equal(subject.freeResponse.timeMinutes, 115);
  assert.equal(subject.freeResponse.questions.length, 5);
  assert.match(subject.tierNote, /Fully digital Section I practice/i);
  assert.match(subject.tierNote, /five free-response questions/i);
  assert.match(subject.tierNote, /two course-project checkpoint/i);
});

test('generic preflight UI will surface Latin count, timing, calculator status, full duration, and scope note', () => {
  const source = fs.readFileSync('js/catalog.js', 'utf8');
  assert.match(source, /subject\.mcqCount/);
  assert.match(source, /subject\.mcqTimeMinutes/);
  assert.match(source, /subject\.totalExamTimeLabel/);
  assert.match(source, /subject\.tierNote/);
  assert.match(source, /subject\.calculatorAllowed === false/);
});
