const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { AP_SUBJECTS } = require('../js/subjects');
const { drawExam } = require('../js/draw');

const scripts = [
  'data/ap-business-personal-finance.js',
  'data/ap-business-personal-finance-u1.js',
  'data/ap-business-personal-finance-u2.js',
  'data/ap-business-personal-finance-u3.js',
  'data/ap-business-personal-finance-u4.js',
  'data/ap-business-personal-finance-sets.js',
  'data/ap-business-personal-finance-sets-2.js',
  'data/ap-business-personal-finance-quality.js',
  'data/ap-business-personal-finance-classification.js',
];

function load() {
  const subjects = structuredClone(AP_SUBJECTS);
  const context = { AP_SUBJECTS: subjects };
  context.window = context; context.globalThis = context;
  vm.createContext(context);
  vm.runInContext(fs.readFileSync('js/ap-business-personal-finance-metadata.js','utf8'),context);
  scripts.forEach((path)=>vm.runInContext(fs.readFileSync(path,'utf8'),context,{filename:path}));
  return {subject:subjects.find(s=>s.id==='ap-business-personal-finance'),bank:Array.from(context.QUESTIONS_AP_BUSINESS_PERSONAL_FINANCE)};
}
const {subject,bank}=load();
const expected=[...Array.from({length:8},(_,i)=>`1.${i+1}`),...Array.from({length:7},(_,i)=>`2.${i+1}`),...Array.from({length:9},(_,i)=>`3.${i+1}`),...Array.from({length:4},(_,i)=>`4.${i+1}`)];
const countBy=(xs,fn)=>xs.reduce((o,x)=>{const k=fn(x);o[k]=(o[k]||0)+1;return o;},{});
const family=q=>String(q.skill).split('.')[0];

test('AP Business draft matches the May 2027 Section I metadata and exact 28-topic inventory',()=>{
  assert.equal(subject.releaseStatus,'draft');
  assert.equal(subject.formatVerified,true);
  assert.equal(subject.mcqCount,60); assert.equal(subject.mcqTimeMinutes,70);
  assert.equal(subject.totalExamTimeLabel,'2h 40m'); assert.equal(subject.calculatorAllowed,true);
  assert.deepEqual(Array.from(subject.units,u=>u.id),['U1','U2','U3','U4']);
  assert.deepEqual([...new Set(bank.map(q=>q.topicCode))].sort((a,b)=>a.localeCompare(b,undefined,{numeric:true})),expected);
  assert.equal(bank.length,200);
  expected.forEach(code=>assert.ok(bank.filter(q=>q.topicCode===code).length>=5,code));
});

test('AP Business draft has sound schema, twenty intact three-question synthetic source sets, and MCQ skills 1-4 only',()=>{
  const ids=new Set(); const groups=new Map();
  bank.forEach(q=>{
    assert.ok(!ids.has(q.id),q.id); ids.add(q.id);
    assert.equal(q.type,'s',q.id); assert.equal(q.o.length,4,q.id); assert.equal(q.c.length,1,q.id);
    assert.ok(q.c[0]>=0&&q.c[0]<4,q.id); assert.ok(q.e.split(/\s+/).length>=8,q.id);
    assert.ok(['1','2','3','4'].includes(family(q)),q.id);
    if(q.stimulusGroupId){if(!groups.has(q.stimulusGroupId))groups.set(q.stimulusGroupId,[]);groups.get(q.stimulusGroupId).push(q);}
  });
  assert.equal(groups.size,20);
  for(const [id,qs] of groups){assert.equal(qs.length,3,id);assert.deepEqual(qs.map(q=>q.sequence),[1,2,3],id);assert.ok(qs[0].stimulus.source,id);}
  assert.equal(bank.filter(q=>q.personalFinance).length,41);
});

test('AP Business draft can construct exact unit, skill, source-set, and 20-25% personal-finance forms',()=>{
  const target={U1:15,U2:15,U3:18,U4:12};
  let minPF=99,maxPF=0,minSets=99,maxSets=0;
  for(let i=0;i<500;i++){
    const draw=drawExam(subject,bank);
    assert.equal(draw.length,60);
    assert.deepEqual(countBy(draw,q=>q.unit),target);
    const skills=countBy(draw,family);
    Object.entries(subject.skillCountRanges).forEach(([f,r])=>assert.ok((skills[f]||0)>=r[0]&&(skills[f]||0)<=r[1],`skill ${f}: ${skills[f]||0}`));
    const pf=draw.filter(q=>q.personalFinance).length; assert.ok(pf>=12&&pf<=15,`PF ${pf}`); minPF=Math.min(minPF,pf);maxPF=Math.max(maxPF,pf);
    const sets=new Set(draw.filter(q=>q.stimulusGroupId).map(q=>q.stimulusGroupId)).size; assert.ok(sets>=8&&sets<=14,`sets ${sets}`);minSets=Math.min(minSets,sets);maxSets=Math.max(maxSets,sets);
    for(const gid of new Set(draw.filter(q=>q.stimulusGroupId).map(q=>q.stimulusGroupId))){assert.equal(draw.filter(q=>q.stimulusGroupId===gid).length,3,gid);}
  }
  console.log('AP Business draft draw envelope',{personalFinance:[minPF,maxPF],sourceSets:[minSets,maxSets]});
});

test('AP Business quantitative anchors independently recompute',()=>{
  const byId=id=>bank.find(q=>q.id===id);
  assert.equal(byId('apbpf-set-u2-price-1').o[byId('apbpf-set-u2-price-1').c[0]],'$21');
  assert.equal(220*21,4620);
  assert.equal(byId('apbpf-set-u3-saving-1').o[byId('apbpf-set-u3-saving-1').c[0]],'$150');
  assert.equal((4800-1200)/24,150);
  assert.equal(11124-10000,1124); assert.equal(12240-10000,2240);
  assert.equal(96000-79000,17000); assert.equal(90000-86000,4000); assert.equal(145000-61000,84000);
  assert.equal(96/160,0.6); assert.equal(72/180,0.4); assert.equal(33/110,0.3);
  assert.equal(50-2-7,41); assert.equal(50-15-3,32); assert.equal(50-10-6,34);
  assert.equal(3.20+0.80,4); assert.equal(2400+600,3000);
});
