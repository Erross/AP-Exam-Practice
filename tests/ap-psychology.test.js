const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const {AP_SUBJECTS}=require('../js/subjects');
const {drawExam}=require('../js/draw');

const sandbox={window:{}}; vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('data/ap-psychology.js','utf8'),sandbox,{filename:'data/ap-psychology.js'});
const bank=sandbox.window.QUESTIONS_AP_PSYCHOLOGY;
const subject=AP_SUBJECTS.find(s=>s.id==='ap-psychology');
const TOPICS=[
 '1.1','1.2','1.3','1.4','1.5','1.6',
 '2.1','2.2','2.3','2.4','2.5','2.6','2.7','2.8',
 '3.1','3.2','3.3','3.4','3.5','3.6','3.7','3.8','3.9',
 '4.1','4.2','4.3','4.4','4.5','4.6','4.7',
 '5.1','5.2','5.3','5.4','5.5'
];
const family=q=>String(q.skill).split('.')[0];

test('Psychology bank covers the exact current 35-topic CED inventory',()=>{
 assert.equal(bank.length,245);
 assert.deepEqual([...new Set(bank.map(q=>q.topicCode))].sort(),TOPICS.slice().sort());
 for(const code of TOPICS) assert.equal(bank.filter(q=>q.topicCode===code).length,7,`${code} should have seven original questions`);
 assert.equal(subject.formatVerified,true);
 assert.equal(subject.releaseStatus,'draft');
 assert.equal(subject.mcqCount,75);
 assert.equal(subject.mcqTimeMinutes,90);
 assert.equal(subject.totalExamTimeLabel,'2h 40m');
});

test('Psychology shared research portfolio has one two-question synthetic set per topic',()=>{
 const groups=new Map();
 for(const q of bank.filter(q=>q.stimulusGroupId)){
  const a=groups.get(q.stimulusGroupId)||[]; a.push(q); groups.set(q.stimulusGroupId,a);
 }
 assert.equal(groups.size,35);
 for(const [id,qs] of groups){
  assert.equal(qs.length,2,`${id} should contain two questions`);
  assert.equal(new Set(qs.map(q=>q.topicCode)).size,1);
  assert.deepEqual(qs.map(family).sort(),['2','3']);
  assert.ok(qs.every(q=>q.synthetic===true));
  assert.ok(qs[0].stimulus&&typeof qs[0].stimulus==='object');
  assert.equal(JSON.stringify(qs[0].stimulus),JSON.stringify(qs[1].stimulus));
 }
});

test('every Psychology data-set arithmetic key independently recomputes',()=>{
 const data=bank.filter(q=>q.numericCheck);
 assert.equal(data.length,35);
 for(const q of data){
  assert.equal(q.numericCheck.kind,'difference');
  assert.equal(q.numericCheck.a-q.numericCheck.b,q.numericCheck.expected,`${q.id} numeric check`);
  assert.ok(['3.B','3.C'].includes(q.skill));
 }
});

test('Psychology MCQs use only current MCQ-assessed practice families',()=>{
 assert.deepEqual([...new Set(bank.map(family))].sort(),['1','2','3']);
 assert.equal(bank.filter(q=>family(q)==='1').length,140);
 assert.equal(bank.filter(q=>family(q)==='2').length,70);
 assert.equal(bank.filter(q=>family(q)==='3').length,35);
 assert.ok(bank.every(q=>!String(q.skill).startsWith('4.')));
});

test('Psychology randomized forms obey equal-unit and 65/25/10 practice constraints',()=>{
 const target={U1:15,U2:15,U3:15,U4:15,U5:15};
 const mins={'1':99,'2':99,'3':99},maxs={'1':0,'2':0,'3':0};
 let minSets=99,maxSets=0;
 for(let i=0;i<1500;i++){
  const draw=drawExam(subject,bank); assert.equal(draw.length,75);
  const units={},skills={};
  for(const q of draw){units[q.unit]=(units[q.unit]||0)+1; skills[family(q)]=(skills[family(q)]||0)+1;}
  assert.deepEqual(units,target);
  for(const f of ['1','2','3']){
   const [lo,hi]=subject.skillCountRanges[f]; assert.ok(skills[f]>=lo&&skills[f]<=hi,`${f}: ${skills[f]}`);
   mins[f]=Math.min(mins[f],skills[f]); maxs[f]=Math.max(maxs[f],skills[f]);
  }
  const sets=new Set(draw.filter(q=>q.stimulusGroupId).map(q=>q.stimulusGroupId)).size;
  assert.ok(sets>=7&&sets<=8); minSets=Math.min(minSets,sets); maxSets=Math.max(maxSets,sets);
 }
 console.log('Psychology practice envelope',{mins,maxs,researchSets:[minSets,maxSets]});
});

test('Psychology retake overlap remains at or below project target',()=>{
 let total=0;
 for(let i=0;i<1000;i++){
  const a=drawExam(subject,bank),b=drawExam(subject,bank),ids=new Set(a.map(q=>q.id));
  total+=b.filter(q=>ids.has(q.id)).length/75;
 }
 const overlap=total/1000; console.log(`Psychology Monte Carlo overlap: ${(overlap*100).toFixed(1)}%`); assert.ok(overlap<=0.40);
});

test('Psychology naive student preflight exposes exam-critical facts',()=>{
 assert.equal(subject.calculatorAllowed,false);
 assert.match(subject.tierNote,/calculator not permitted/i);
 const catalog=fs.readFileSync('js/catalog.js','utf8');
 assert.match(catalog,/Calculator not permitted for this AP exam\./);
 assert.match(catalog,/timer starts only after you choose Start timed practice/i);
 assert.match(catalog,/saved in this browser session/i);
 assert.match(catalog,/Back to subjects/i);
});
