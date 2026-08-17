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

test('APES effective development bank has exact 99-topic coverage and deep standalone inventory',()=>{
  assert.equal(subject.mcqCount,80);
  assert.equal(subject.mcqTimeMinutes,90);
  assert.equal(subject.totalExamTimeLabel,'2h 40m');
  assert.equal(subject.formatVerified,true);
  assert.equal(subject.releaseStatus,'draft');
  assert.equal(subject.calculatorAllowed,true);
  assert.equal(bank.length,258);
  assert.equal(new Set(bank.map(q=>q.id)).size,258);
  assert.equal(new Set(bank.map(q=>q.topicCode)).size,99);
  for (const code of topicCodes) {
    assert.ok(bank.some(q=>q.topicCode===code),`${code}: missing topic`);
    assert.equal(bank.filter(q=>q.topicCode===code && !q.stimulusGroupId).length,2,`${code}: expected two standalone candidates`);
  }
  assert.equal(scripts.length,15);
  bank.forEach(q=>{
    assert.equal(q.type,'s',q.id);
    assert.equal(q.o.length,4,q.id);
    assert.equal(q.c.length,1,q.id);
    assert.match(q.skill,/^[1-7]$/,q.id);
    assert.ok(q.e.length>=90,`${q.id}: rationale too short`);
  });
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

test('APES randomized forms satisfy the exact unit, source-set, and science-practice blueprint',()=>{
  for(let i=0;i<250;i++){
    const draw=drawExam(subject,bank);
    assert.equal(draw.length,80);
    for(const [unit,n] of Object.entries(unitTargets)) assert.equal(draw.filter(q=>q.unit===unit).length,n,`${unit} mismatch on draw ${i}`);
    const ids=[...new Set(draw.filter(q=>q.stimulusGroupId).map(q=>q.stimulusGroupId))];
    assert.equal(ids.length,10);
    const kinds=ids.map(id=>draw.find(q=>q.stimulusGroupId===id).stimulus.type);
    assert.equal(kinds.filter(x=>x==='quantitative').length,4);
    assert.equal(kinds.filter(x=>x==='visual').length,4);
    assert.equal(kinds.filter(x=>x==='text').length,2);
    const counts={};draw.forEach(q=>counts[q.skill]=(counts[q.skill]||0)+1);
    for(const [skill,[lo,hi]] of Object.entries(practiceRanges)) assert.ok((counts[skill]||0)>=lo&&(counts[skill]||0)<=hi,`practice ${skill}=${counts[skill]||0} outside ${lo}-${hi} on draw ${i}`);
  }
});
