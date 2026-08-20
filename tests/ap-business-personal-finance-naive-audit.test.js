const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { AP_SUBJECTS } = require('../js/subjects.js');

function effectiveSubject(){
  const subjects=structuredClone(AP_SUBJECTS);
  const c={AP_SUBJECTS:subjects}; c.globalThis=c; c.window=c; vm.createContext(c);
  vm.runInContext(fs.readFileSync('js/ap-business-personal-finance-metadata.js','utf8'),c,{filename:'js/ap-business-personal-finance-metadata.js'});
  return subjects.find(s=>s.id==='ap-business-personal-finance');
}

test('AP Business naive student preflight exposes the May 2027 exam-critical facts',()=>{
  const s=effectiveSubject();
  assert.equal(s.mcqCount,60);
  assert.equal(s.mcqTimeMinutes,70);
  assert.equal(s.totalExamTimeLabel,'2h 40m');
  assert.equal(s.calculatorAllowed,true);
  assert.equal(s.formatVerified,true);
  assert.equal(s.releaseStatus,'released');
  assert.deepEqual(Array.from(s.stimulusSetRange),[20,20]);
  assert.match(s.tierNote,/Section I practice/i);
  assert.match(s.tierNote,/fully digital/i);
  assert.match(s.tierNote,/all 60 official multiple-choice questions appear in stimulus sets of 3 or 4/i);
  assert.match(s.tierNote,/4-function calculator/i);
  assert.match(s.tierNote,/Business Canvas Project Exam-Day Validation/i);
  assert.match(s.tierNote,/Personal Finance/i);
  assert.match(s.tierNote,/Business Concept Application/i);
  assert.match(s.tierNote,/Business Decision/i);
  assert.deepEqual(Array.from(s.freeResponse.questions),[
    'Business Canvas Project Exam-Day Validation','Personal Finance','Business Concept Application','Business Decision'
  ]);
});

test('generic preflight will surface AP Business count, timing, calculator status, duration, and scope note',()=>{
  const source=fs.readFileSync('js/catalog.js','utf8');
  assert.match(source,/subject\.mcqCount/);
  assert.match(source,/subject\.mcqTimeMinutes/);
  assert.match(source,/subject\.totalExamTimeLabel/);
  assert.match(source,/subject\.tierNote/);
  assert.match(source,/subject\.calculatorAllowed/);
});

test('student-facing AP Business metadata contains no implementation jargon',()=>{
  const s=effectiveSubject();
  const visible=[s.name,s.tierNote,...s.units.map(u=>u.name),...s.freeResponse.questions].join(' ');
  assert.doesNotMatch(visible,/variantGroupId|stimulusGroupId|constraintDrawAttempts|Hamilton|browser-effective|overlay|dataVar/i);
});
