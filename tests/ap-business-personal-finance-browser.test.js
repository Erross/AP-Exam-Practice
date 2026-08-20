const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { AP_SUBJECTS } = require('../js/subjects.js');

function browserSources(){
  const html=fs.readFileSync('index.html','utf8');
  return [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m=>m[1]);
}
function loadBrowserEffective(){
  const sources=browserSources();
  const subjects=structuredClone(AP_SUBJECTS);
  const c={AP_SUBJECTS:subjects}; c.window=c; c.globalThis=c; vm.createContext(c);
  const metadata=sources.filter(s=>s==='js/ap-business-personal-finance-metadata.js');
  assert.deepEqual(metadata,['js/ap-business-personal-finance-metadata.js']);
  vm.runInContext(fs.readFileSync(metadata[0],'utf8'),c,{filename:metadata[0]});
  const data=sources.filter(s=>s.startsWith('data/ap-business-personal-finance'));
  data.forEach(path=>vm.runInContext(fs.readFileSync(path,'utf8'),c,{filename:path}));
  return {sources,data,subject:subjects.find(s=>s.id==='ap-business-personal-finance'),bank:Array.from(c.QUESTIONS_AP_BUSINESS_PERSONAL_FINANCE)};
}

test('AP Business browser wiring exposes metadata and every authored layer in canonical order',()=>{
  const {sources,data}=loadBrowserEffective();
  assert.ok(sources.indexOf('js/ap-business-personal-finance-metadata.js')>sources.indexOf('js/subjects.js'));
  assert.deepEqual(data,[
    'data/ap-business-personal-finance.js',
    'data/ap-business-personal-finance-u1.js',
    'data/ap-business-personal-finance-u2.js',
    'data/ap-business-personal-finance-u3.js',
    'data/ap-business-personal-finance-u4.js',
    'data/ap-business-personal-finance-sets.js',
    'data/ap-business-personal-finance-sets-2.js',
    'data/ap-business-personal-finance-sets-3.js',
    'data/ap-business-personal-finance-sets-4.js',
    'data/ap-business-personal-finance-quality.js',
    'data/ap-business-personal-finance-classification.js',
    'data/ap-business-personal-finance-exact-skill.js',
    'data/ap-business-personal-finance-final-review.js',
  ]);
});

test('AP Business browser-effective draft resolves the reviewed metadata and complete all-set bank',()=>{
  const {subject,bank}=loadBrowserEffective();
  assert.equal(subject.releaseStatus,'draft');
  assert.equal(subject.mcqCount,60);
  assert.equal(subject.mcqTimeMinutes,70);
  assert.equal(subject.totalExamTimeLabel,'2h 40m');
  assert.equal(subject.calculatorAllowed,true);
  assert.deepEqual(Array.from(subject.stimulusSetRange),[20,20]);
  assert.match(subject.tierNote,/all 60 official multiple-choice questions appear in stimulus sets of 3 or 4/i);
  assert.deepEqual(Array.from(subject.freeResponse.questions),[
    'Business Canvas Project Exam-Day Validation','Personal Finance','Business Concept Application','Business Decision'
  ]);
  assert.equal(bank.length,192);
  assert.equal(new Set(bank.map(q=>q.id)).size,192);
  assert.ok(bank.every(q=>q.stimulusGroupId));
  assert.equal(new Set(bank.map(q=>q.stimulusGroupId)).size,64);
  assert.equal(bank.filter(q=>q.variantGroupId).length,0);
  assert.equal(bank.filter(q=>q.personalFinance).length,45);
  assert.match(bank.find(q=>q.id==='apbpf-set4-u3-emergency-1').stimulus.title,/Planned car down payment/i);
  assert.match(bank.find(q=>q.id==='apbpf-set4-u1-borrowing-2').o[bank.find(q=>q.id==='apbpf-set4-u1-borrowing-2').c[0]],/\$2,360/);
});

test('draft AP Business remains excluded from the public artifact while browser source can be audited',()=>{
  const source=fs.readFileSync('js/ap-business-personal-finance-metadata.js','utf8');
  assert.match(source,/releaseStatus:\s*"draft"/);
  const subject=AP_SUBJECTS.find(s=>s.id==='ap-business-personal-finance');
  assert.ok(subject);
  assert.notEqual(subject.releaseStatus,'released');
});
