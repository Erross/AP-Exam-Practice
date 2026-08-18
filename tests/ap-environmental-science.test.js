const test = require('node:test');
const assert = require('node:assert/strict');
const subject = require('./helpers/ap-environmental-science-candidate');
const { loadEffectiveBank } = require('../tools/subject-release-audit');
const { drawExam } = require('../js/draw');
const { bank, scripts } = loadEffectiveBank(subject);

const topicCounts = [11,7,9,9,17,13,8,15,10];
const topicCodes = topicCounts.flatMap((n,i)=>Array.from({length:n},(_,j)=>`${i+1}.${j+1}`));
const unitTargets = {U1:6,U2:6,U3:10,U4:10,U5:10,U6:10,U7:7,U8:7,U9:14};
const practiceRanges = subject.skillCountRanges;

test('APES effective development bank has exact 99-topic coverage and deep semantic inventory',()=>{
  assert.equal(subject.mcqCount,80);
  assert.equal(subject.mcqTimeMinutes,90);
  assert.equal(subject.totalExamTimeLabel,'2h 40m');
  assert.equal(subject.formatVerified,true);
  assert.equal(subject.releaseStatus,'draft');
  assert.equal(subject.calculatorAllowed,true);
  assert.equal(bank.length,330);
  assert.equal(new Set(bank.map(q=>q.id)).size,330);
  assert.equal(new Set(bank.map(q=>q.topicCode)).size,99);
  for (const code of topicCodes) {
    assert.ok(bank.some(q=>q.topicCode===code),`${code}: missing topic`);
    assert.ok(bank.filter(q=>q.topicCode===code && !q.stimulusGroupId).length>=2,`${code}: expected at least two standalone candidates`);
  }
  assert.equal(scripts.length,18);
  bank.forEach(q=>{
    assert.equal(q.type,'s',q.id);
    assert.equal(q.o.length,4,q.id);
    assert.equal(q.c.length,1,q.id);
    assert.match(q.skill,/^[1-7]$/,q.id);
    assert.ok(q.e.length>=90,`${q.id}: rationale too short`);
  });
});

test('APES practice labels perform their declared source or standalone task',()=>{
  const baseConcept=bank.filter(q=>/^apes-\d+-\d+-0[12]$/.test(q.id));
  assert.equal(baseConcept.length,198);
  baseConcept.forEach(q=>assert.equal(q.skill,'1',q.id));
  const experiments=bank.filter(q=>q.id.startsWith('apes-exp-')||q.id.startsWith('apes-exp2-'));
  assert.equal(experiments.length,18);
  experiments.forEach(q=>{assert.equal(q.skill,'4',q.id);assert.match(q.q,/design|tests?|investigat|feature/i,q.id);});
  const solutions=bank.filter(q=>q.id.startsWith('apes-sol-')||q.id.startsWith('apes-sol2-'));
  assert.equal(solutions.length,54);
  solutions.forEach(q=>assert.equal(q.skill,'7',q.id));
  bank.filter(q=>q.stimulus&&q.stimulus.type==='quantitative').forEach(q=>assert.ok(['5','6'].includes(q.skill),q.id));
  bank.filter(q=>q.stimulus&&q.stimulus.type==='visual').forEach(q=>assert.ok(['2','7'].includes(q.skill),q.id));
  bank.filter(q=>q.stimulus&&q.stimulus.type==='text').forEach(q=>assert.equal(q.skill,'3',q.id));
});

test('APES source portfolio has 8 quantitative, 8 visual/model, and 4 text candidate sets',()=>{
  const groups=new Map();
  bank.filter(q=>q.stimulusGroupId).forEach(q=>{if(!groups.has(q.stimulusGroupId))groups.set(q.stimulusGroupId,[]);groups.get(q.stimulusGroupId).push(q);});
  assert.equal(groups.size,20);
  const kinds={quantitative:0,visual:0,text:0};
  for(const [id,qs] of groups){
    assert.equal(qs.length,3,id);
    assert.equal(new Set(qs.map(q=>q.unit)).size,1,id);
    assert.equal(new Set(qs.map(q=>JSON.stringify(q.stimulus))).size,1,id);
    kinds[qs[0].stimulus.type]++;
  }
  assert.deepEqual(kinds,{quantitative:8,visual:8,text:4});
});

test('APES raw answer positions remain balanced after source-set rotation',()=>{
  const keys=[0,0,0,0];bank.forEach(q=>keys[q.c[0]]++);
  keys.forEach((n,i)=>assert.ok(n/bank.length>=0.20&&n/bank.length<=0.30,`key ${i}=${n}/${bank.length}`));
});

test('APES randomized forms satisfy the May 2027 unit, source-set, and science-practice blueprint',()=>{
  for(let i=0;i<250;i++){
    const draw=drawExam(subject,bank);
    assert.equal(draw.length,80);
    for(const [unit,n] of Object.entries(unitTargets)) assert.equal(draw.filter(q=>q.unit===unit).length,n,`${unit} mismatch on draw ${i}`);
    const ids=[...new Set(draw.filter(q=>q.stimulusGroupId).map(q=>q.stimulusGroupId))];
    assert.equal(ids.length,12);
    const kinds=ids.map(id=>draw.find(q=>q.stimulusGroupId===id).stimulus.type);
    assert.equal(kinds.filter(x=>x==='quantitative').length,5);
    assert.equal(kinds.filter(x=>x==='visual').length,5);
    assert.equal(kinds.filter(x=>x==='text').length,2);
    const counts={};draw.forEach(q=>counts[q.skill]=(counts[q.skill]||0)+1);
    for(const [skill,[lo,hi]] of Object.entries(practiceRanges)) assert.ok((counts[skill]||0)>=lo&&(counts[skill]||0)<=hi,`practice ${skill}=${counts[skill]||0} outside ${lo}-${hi} on draw ${i}`);
    assert.equal(counts['2'],10);assert.equal(counts['3'],6);assert.equal(counts['5'],10);assert.equal(counts['6'],5);
  }
});

test('APES independent retake overlap remains at or below the project target',()=>{
  let total=0;
  const trials=1000;
  for(let i=0;i<trials;i++){
    const first=drawExam(subject,bank),second=drawExam(subject,bank),ids=new Set(first.map(q=>q.id));
    total+=second.filter(q=>ids.has(q.id)).length/subject.mcqCount;
  }
  const overlap=total/trials;
  console.log(`APES Monte Carlo overlap: ${(100*overlap).toFixed(1)}%`);
  assert.ok(overlap<=0.40,`APES overlap ${(100*overlap).toFixed(1)}% exceeds 40%`);
});
