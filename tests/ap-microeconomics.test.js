const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const {AP_SUBJECTS}=require('../js/subjects');
const {drawExam}=require('../js/draw');

const sandbox={window:{}}; vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('data/ap-microeconomics.js','utf8'),sandbox,{filename:'data/ap-microeconomics.js'});
const bank=sandbox.window.QUESTIONS_AP_MICROECONOMICS;
const subject=AP_SUBJECTS.find(s=>s.id==='ap-microeconomics');
const TOPICS=[
 '1.1','1.2','1.3','1.4','1.5','1.6',
 '2.1','2.2','2.3','2.4','2.5','2.6','2.7','2.8','2.9',
 '3.1','3.2','3.3','3.4','3.5','3.6','3.7',
 '4.1','4.2','4.3','4.4','4.5',
 '5.1','5.2','5.3','5.4',
 '6.1','6.2','6.3','6.4'
];
function family(q){return String(q.skill).split('.')[0];}
function close(a,b,eps=1e-9){assert.ok(Math.abs(a-b)<=eps,`${a} != ${b}`);}
function recompute(c){
 switch(c.kind){
  case 'ratio': return c.a/c.b;
  case 'between': assert.ok(c.expected>c.low&&c.expected<c.high); return c.expected;
  case 'difference': return c.a-c.b;
  case 'compareRatios': assert.ok(c.a/c.b>c.c/c.d); return c.a/c.b;
  case 'linearValue': return c.a+c.b*c.x;
  case 'revenueChange': return c.p2*c.q2-c.p1*c.q1;
  case 'linearEq': return (c.c-c.a)/(c.b-c.d);
  case 'product': return c.a*c.b;
  case 'atc': return (c.fc+c.vc)/c.q;
  case 'avgPair': return c.c2/c.q2;
  case 'sum': return c.values.reduce((a,b)=>a+b,0);
  case 'fixed': return c.expected;
  case 'profit': return (c.p-c.atc)*c.q;
  case 'expenditureChange': return c.p2*c.q2-c.p1*c.q1;
  default: throw new Error(`Unknown numeric check ${c.kind}`);
 }
}

test('Microeconomics bank covers the exact Fall-2026 CED inventory',()=>{
 assert.equal(bank.length,183);
 assert.deepEqual([...new Set(bank.map(q=>q.topicCode))].sort(),TOPICS.slice().sort());
 for(const code of TOPICS) assert.ok(bank.filter(q=>q.topicCode===code).length>=4,`${code} is shallow`);
 assert.equal(subject.formatVerified,true);
 assert.equal(subject.releaseStatus,'draft');
 assert.equal(subject.mcqCount,60);
 assert.equal(subject.mcqTimeMinutes,70);
 assert.equal(subject.totalExamTimeLabel,'2h 10m');
});

test('all Micro numerical-analysis keys independently recompute',()=>{
 const numeric=bank.filter(q=>q.numericalAnalysis===true);
 assert.equal(numeric.length,43);
 for(const q of numeric){
  assert.match(q.skill,/^[123]\.C$/);
  assert.ok(q.numericCheck,`${q.id} missing numericCheck`);
  close(recompute(q.numericCheck),q.numericCheck.expected,1e-7);
 }
});

test('Micro MCQs use only the three MCQ-assessed practice families',()=>{
 assert.deepEqual([...new Set(bank.map(family))].sort(),['1','2','3']);
 assert.ok(bank.every(q=>!String(q.skill).startsWith('4.')));
});

test('Micro randomized forms obey exact unit, practice, and numerical-analysis constraints',()=>{
 const target={U1:8,U2:14,U3:14,U4:10,U5:7,U6:7};
 const mins={'1':99,'2':99,'3':99},maxs={'1':0,'2':0,'3':0}; let minNumeric=99,maxNumeric=0;
 for(let i=0;i<1500;i++){
  const draw=drawExam(subject,bank); assert.equal(draw.length,60);
  const units={},skills={}; let numeric=0;
  for(const q of draw){units[q.unit]=(units[q.unit]||0)+1; skills[family(q)]=(skills[family(q)]||0)+1; if(q.numericalAnalysis===true) numeric++;}
  assert.deepEqual(units,target);
  for(const f of ['1','2','3']){assert.ok(skills[f]>=subject.skillCountRanges[f][0]&&skills[f]<=subject.skillCountRanges[f][1]); mins[f]=Math.min(mins[f],skills[f]); maxs[f]=Math.max(maxs[f],skills[f]);}
  assert.ok(numeric>=12&&numeric<=18); minNumeric=Math.min(minNumeric,numeric); maxNumeric=Math.max(maxNumeric,numeric);
 }
 console.log('Micro practice envelope',{mins,maxs,numerical:[minNumeric,maxNumeric]});
});

test('Micro retake overlap remains at or below project target',()=>{
 let total=0;
 for(let i=0;i<1000;i++){const a=drawExam(subject,bank),b=drawExam(subject,bank),ids=new Set(a.map(q=>q.id)); total+=b.filter(q=>ids.has(q.id)).length/60;}
 const overlap=total/1000; console.log(`Micro Monte Carlo overlap: ${(overlap*100).toFixed(1)}%`); assert.ok(overlap<=0.40);
});

test('Micro naive student preflight exposes exam-critical facts',()=>{
 assert.equal(subject.calculatorAllowed,true); assert.equal(subject.calculatorExpected,true); assert.match(subject.tierNote,/four-function calculator/i);
 const catalog=fs.readFileSync('js/catalog.js','utf8');
 assert.match(catalog,/Calculator expected\/permitted throughout this practice section\./);
 assert.match(catalog,/timer starts only after you choose Start timed practice/i);
 assert.match(catalog,/saved in this browser session/i);
 assert.match(catalog,/Back to subjects/i);
});
