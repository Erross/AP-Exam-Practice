const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { AP_SUBJECTS } = require('../js/subjects');
const { drawExam } = require('../js/draw');

const sandbox={window:{}};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('data/ap-macroeconomics.js','utf8'), sandbox, {filename:'data/ap-macroeconomics.js'});
const bank=sandbox.window.QUESTIONS_AP_MACROECONOMICS;
const subject=AP_SUBJECTS.find(s=>s.id==='ap-macroeconomics');

const TOPICS=[
 '1.1','1.2','1.3','1.4','1.5','1.6',
 '2.1','2.2','2.3','2.4','2.5','2.6','2.7',
 '3.1','3.2','3.3','3.4','3.5','3.6','3.7','3.8','3.9',
 '4.1','4.2','4.3','4.4','4.5','4.6','4.7',
 '5.1','5.2','5.3','5.4','5.5','5.6','5.7',
 '6.1','6.2','6.3','6.4','6.5','6.6'
];

function family(q){return String(q.skill).split('.')[0];}
function close(a,b,eps=1e-9){assert.ok(Math.abs(a-b)<=eps, `${a} != ${b}`);}
function recompute(c){
  switch(c.kind){
    case 'ratio': return c.a/c.b;
    case 'between': assert.ok(c.expected>c.low && c.expected<c.high); return c.expected;
    case 'linearEq': return (c.c-c.a)/(c.b-c.d);
    case 'difference': return c.a-c.b;
    case 'sum': return c.values.reduce((a,b)=>a+b,0);
    case 'percentOf': return c.a/c.b*100;
    case 'percentChange': return (c.b-c.a)/c.a*100;
    case 'deflate': return c.nominal/(c.deflator/100);
    case 'percentGap': return (c.potential-c.actual)/c.potential*100;
    case 'product': return c.a*c.b;
    case 'multiplier': return 1/(1-c.mpc);
    case 'reciprocal': return 1/c.a;
    case 'mpcEffect': return (1/(1-c.mpc))*c.change;
    case 'opposite': return -c.a;
    case 'nxChange': return (c.x2-c.m2)-(c.x1-c.m1);
    default: throw new Error(`Unknown numeric check ${c.kind}`);
  }
}

test('Macroeconomics bank covers the exact Fall-2026 CED inventory',()=>{
  assert.equal(bank.length,204);
  assert.deepEqual([...new Set(bank.map(q=>q.topicCode))].sort(), TOPICS.slice().sort());
  for(const code of TOPICS) assert.ok(bank.filter(q=>q.topicCode===code).length>=4, `${code} is shallow`);
  assert.equal(subject.formatVerified,true);
  assert.equal(subject.releaseStatus,'released');
  assert.equal(subject.mcqCount,60);
  assert.equal(subject.mcqTimeMinutes,70);
  assert.equal(subject.totalExamTimeLabel,'2h 10m');
});

test('all Macro numerical-analysis keys independently recompute',()=>{
  const numeric=bank.filter(q=>q.numericalAnalysis===true);
  assert.equal(numeric.length,36);
  for(const q of numeric){
    assert.match(q.skill,/^[123]\.C$/);
    assert.ok(q.numericCheck, `${q.id} missing numericCheck`);
    close(recompute(q.numericCheck), q.numericCheck.expected, 1e-7);
  }
});

test('Macro MCQs use only the three MCQ-assessed practice families',()=>{
  assert.deepEqual([...new Set(bank.map(family))].sort(),['1','2','3']);
  assert.ok(bank.every(q=>!String(q.skill).startsWith('4.')));
});

test('Macro randomized forms obey exact unit, practice, and numerical-analysis constraints',()=>{
  const target={U1:5,U2:9,U3:13,U4:12,U5:14,U6:7};
  const mins={'1':99,'2':99,'3':99}, maxs={'1':0,'2':0,'3':0};
  let minNumeric=99,maxNumeric=0;
  for(let i=0;i<1500;i++){
    const draw=drawExam(subject,bank);
    assert.equal(draw.length,60);
    const units={}; const skills={}; let numeric=0;
    for(const q of draw){
      units[q.unit]=(units[q.unit]||0)+1;
      skills[family(q)]=(skills[family(q)]||0)+1;
      if(q.numericalAnalysis===true) numeric++;
    }
    assert.deepEqual(units,target);
    for(const f of ['1','2','3']){
      assert.ok(skills[f]>=subject.skillCountRanges[f][0] && skills[f]<=subject.skillCountRanges[f][1]);
      mins[f]=Math.min(mins[f],skills[f]); maxs[f]=Math.max(maxs[f],skills[f]);
    }
    assert.ok(numeric>=10 && numeric<=12);
    minNumeric=Math.min(minNumeric,numeric); maxNumeric=Math.max(maxNumeric,numeric);
  }
  console.log('Macro practice envelope',{mins,maxs,numerical:[minNumeric,maxNumeric]});
});

test('Macro retake overlap remains at or below project target',()=>{
  let total=0;
  for(let i=0;i<1000;i++){
    const a=drawExam(subject,bank), b=drawExam(subject,bank), ids=new Set(a.map(q=>q.id));
    total+=b.filter(q=>ids.has(q.id)).length/60;
  }
  const overlap=total/1000;
  console.log(`Macro Monte Carlo overlap: ${(overlap*100).toFixed(1)}%`);
  assert.ok(overlap<=0.40);
});

test('Macro naive student preflight exposes exam-critical facts',()=>{
  assert.equal(subject.calculatorAllowed,true);
  assert.equal(subject.calculatorExpected,true);
  assert.match(subject.tierNote,/four-function calculator/i);
  const catalog=fs.readFileSync('js/catalog.js','utf8');
  assert.match(catalog,/Calculator expected\/permitted throughout this practice section\./);
  assert.match(catalog,/timer starts only after you choose Start timed practice/i);
  assert.match(catalog,/saved in this browser session/i);
  assert.match(catalog,/Back to subjects/i);
});
