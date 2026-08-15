const test = require('node:test');
const assert = require('node:assert/strict');
const { AP_SUBJECTS } = require('../js/subjects');
const { loadEffectiveBank } = require('../tools/subject-release-audit');
const { drawExam } = require('../js/draw');

const subject = AP_SUBJECTS.find((s) => s.id === 'ap-comparative-government');
const { bank } = loadEffectiveBank(subject);
const expectedTopics = [
  ...Array.from({length:10},(_,i)=>`1.${i+1}`),
  ...Array.from({length:9},(_,i)=>`2.${i+1}`),
  ...Array.from({length:9},(_,i)=>`3.${i+1}`),
  ...Array.from({length:6},(_,i)=>`4.${i+1}`),
  ...Array.from({length:8},(_,i)=>`5.${i+1}`),
];

function family(q){ return String(q.skill).split('.')[0]; }
function countBy(xs, fn){ const out={}; xs.forEach(x=>{const k=fn(x);out[k]=(out[k]||0)+1;}); return out; }

test('Comparative Government draft bank covers the exact Fall-2026 CED topic inventory', () => {
  assert.equal(subject.formatVerified, true);
  assert.equal(subject.releaseStatus, 'draft');
  assert.equal(subject.mcqCount,55);
  assert.equal(subject.mcqTimeMinutes,60);
  assert.equal(bank.length,246);
  assert.deepEqual([...new Set(bank.map(q=>q.topicCode))].sort((a,b)=>a.localeCompare(b,undefined,{numeric:true})), expectedTopics);
  expectedTopics.forEach(code=>assert.equal(bank.filter(q=>q.topicCode===code && !q.stimulusGroupId).length,5,code));
  assert.equal(bank.some(q=>family(q)==='5'),false,'Argumentation must remain FRQ-only');
});

test('Comparative Government source portfolio has 9 quantitative and 6 qualitative sets', () => {
  const groups=new Map();
  bank.filter(q=>q.stimulusGroupId).forEach(q=>{ if(!groups.has(q.stimulusGroupId)) groups.set(q.stimulusGroupId,[]); groups.get(q.stimulusGroupId).push(q); });
  assert.equal(groups.size,15);
  let quantitative=0,text=0;
  for(const [id,qs] of groups){
    assert.equal(new Set(qs.map(q=>q.unit)).size,1,id);
    assert.ok(qs.every(q=>q.stimulus && q.stimulus.source),id);
    assert.deepEqual(qs[0].stimulus,qs[1].stimulus,id);
    if(qs[0].stimulus.type==='quantitative'){
      quantitative++; assert.equal(qs.length,2,id); assert.ok(qs.every(q=>family(q)==='3'),id);
    } else if(qs[0].stimulus.type==='text'){
      text++; assert.equal(qs.length,3,id); assert.ok(qs.every(q=>family(q)==='4'),id);
    } else assert.fail(`${id}: unsupported stimulus type`);
  }
  assert.equal(quantitative,9); assert.equal(text,6);
});

test('Comparative Government randomized forms obey exact unit, source-set, and practice constraints', () => {
  const targetUnits={U1:12,U2:15,U3:8,U4:9,U5:11};
  const mins={1:99,2:99,3:99,4:99}, maxs={1:0,2:0,3:0,4:0};
  for(let i=0;i<1500;i++){
    const draw=drawExam(subject,bank);
    assert.equal(draw.length,55);
    assert.deepEqual(countBy(draw,q=>q.unit),targetUnits);
    const groups=[...new Map(draw.filter(q=>q.stimulusGroupId).map(q=>[q.stimulusGroupId,q])).values()];
    assert.equal(groups.filter(q=>q.stimulus.type==='quantitative').length,3);
    assert.equal(groups.filter(q=>q.stimulus.type==='text').length,2);
    const skills=countBy(draw,family);
    for(const [f,range] of Object.entries(subject.skillCountRanges)){
      const n=skills[f]||0; assert.ok(n>=range[0]&&n<=range[1],`Practice ${f}: ${n}`);
      mins[f]=Math.min(mins[f],n); maxs[f]=Math.max(maxs[f],n);
    }
    assert.equal(skills['5']||0,0);
  }
  console.log('Comparative Government practice envelope',{mins,maxs});
});

test('Comparative Government retake overlap remains at or below project target', () => {
  let shared=0,total=0;
  for(let i=0;i<1500;i++){
    const a=new Set(drawExam(subject,bank).map(q=>q.id));
    const b=drawExam(subject,bank);
    shared += b.filter(q=>a.has(q.id)).length; total += b.length;
  }
  const overlap=shared/total;
  console.log(`Comparative Government Monte Carlo overlap: ${(overlap*100).toFixed(1)}%`);
  assert.ok(overlap<=0.40,`overlap ${(overlap*100).toFixed(1)}%`);
});

test('Comparative Government source skills perform their declared tasks',()=>{
  bank.filter(q=>family(q)==='3').forEach(q=>{
    assert.equal(q.stimulus && q.stimulus.type,'quantitative',q.id);
    assert.match(q.q,/pattern|inference|data/i,q.id);
  });
  bank.filter(q=>family(q)==='4').forEach(q=>{
    assert.equal(q.stimulus && q.stimulus.type,'text',q.id);
    assert.match(q.q,/author|argument|implication|claim/i,q.id);
  });
});
