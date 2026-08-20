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
  'data/ap-business-personal-finance-sets-3.js',
  'data/ap-business-personal-finance-sets-4.js',
  'data/ap-business-personal-finance-quality.js',
  'data/ap-business-personal-finance-classification.js',
  'data/ap-business-personal-finance-exact-skill.js',
  'data/ap-business-personal-finance-final-review.js',
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

test('AP Business release matches the May 2027 Section I metadata and exact 28-topic inventory',()=>{
  assert.equal(subject.releaseStatus,'released');
  assert.equal(subject.formatVerified,true);
  assert.equal(subject.mcqCount,60); assert.equal(subject.mcqTimeMinutes,70);
  assert.equal(subject.totalExamTimeLabel,'2h 40m'); assert.equal(subject.calculatorAllowed,true);
  assert.deepEqual(Array.from(subject.units,u=>u.id),['U1','U2','U3','U4']);
  assert.deepEqual(Array.from(subject.freeResponse.questions),[
    'Business Canvas Project Exam-Day Validation','Personal Finance','Business Concept Application','Business Decision'
  ]);
  assert.deepEqual([...new Set(bank.map(q=>q.topicCode))].sort((a,b)=>a.localeCompare(b,undefined,{numeric:true})),expected);
  assert.equal(bank.length,192);
  expected.forEach(code=>assert.ok(bank.filter(q=>q.topicCode===code).length>=3,code));
});

test('AP Business bank has 64 intact three-question source sets and no standalone MCQs',()=>{
  const ids=new Set(); const groups=new Map();
  bank.forEach(q=>{
    assert.ok(!ids.has(q.id),q.id); ids.add(q.id);
    assert.equal(q.type,'s',q.id); assert.equal(q.o.length,4,q.id); assert.equal(q.c.length,1,q.id);
    assert.ok(q.c[0]>=0&&q.c[0]<4,q.id); assert.ok(String(q.e||'').trim().length>=90,q.id);
    assert.ok(['1','2','3','4'].includes(family(q)),q.id);
    assert.ok(q.stimulusGroupId,`${q.id} is not source-set based`);
    assert.equal(q.variantGroupId,undefined,q.id);
    if(!groups.has(q.stimulusGroupId))groups.set(q.stimulusGroupId,[]);groups.get(q.stimulusGroupId).push(q);
  });
  assert.equal(groups.size,64);
  for(const [id,qs] of groups){
    assert.equal(qs.length,3,id); assert.deepEqual(qs.map(q=>q.sequence),[1,2,3],id);
    assert.ok(qs[0].stimulus.source,id); assert.ok(qs.every(q=>q.stimulus===qs[0].stimulus),id);
  }
  assert.equal(bank.filter(q=>q.personalFinance).length,45);
});

test('generated topic sets stay Concept Application and cover every topic once',()=>{
  const generated=bank.filter(q=>q.stimulusGroupId.startsWith('apbpf-topic-'));
  assert.equal(generated.length,84);
  assert.ok(generated.every(q=>family(q)==='1'));
  const groups=new Map();
  generated.forEach(q=>{
    if(!groups.has(q.stimulusGroupId)) groups.set(q.stimulusGroupId,[]);
    groups.get(q.stimulusGroupId).push(q);
  });
  assert.equal(groups.size,28);
  for(const [id,qs] of groups){
    assert.equal(qs.length,3,id);
    assert.equal(new Set(qs.map(q=>q.unit)).size,1,id);
    assert.equal(new Set(qs.map(q=>q.topicCode)).size,1,id);
    assert.deepEqual(qs.map(q=>q.sequence),[1,2,3],id);
    assert.ok(qs.every(q=>q.stimulus?.note?.includes('not a College Board case')),id);
  }
  assert.deepEqual([...new Set(generated.map(q=>q.topicCode))].sort((a,b)=>a.localeCompare(b,undefined,{numeric:true})),expected);
  const authored=bank.filter(q=>!q.stimulusGroupId.startsWith('apbpf-topic-'));
  assert.equal(authored.length,108);
  assert.equal(new Set(authored.map(q=>q.stimulusGroupId)).size,36);
  ['2','3','4'].forEach(f=>assert.ok(authored.some(q=>family(q)===f),`missing authored skill ${f}`));
});

test('AP Business release constructs exact all-set unit, skill, and 20-25% personal-finance forms',()=>{
  const target={U1:15,U2:15,U3:18,U4:12};
  let minPF=99,maxPF=0;
  for(let i=0;i<500;i++){
    const draw=drawExam(subject,bank);
    assert.equal(draw.length,60);
    assert.ok(draw.every(q=>q.stimulusGroupId),'delivered form contains a standalone MCQ');
    assert.deepEqual(countBy(draw,q=>q.unit),target);
    const skills=countBy(draw,family);
    Object.entries(subject.skillCountRanges).forEach(([f,r])=>assert.ok((skills[f]||0)>=r[0]&&(skills[f]||0)<=r[1],`skill ${f}: ${skills[f]||0}`));
    const pf=draw.filter(q=>q.personalFinance).length; assert.ok(pf>=12&&pf<=15,`PF ${pf}`); minPF=Math.min(minPF,pf);maxPF=Math.max(maxPF,pf);
    const groupIds=new Set(draw.map(q=>q.stimulusGroupId));
    assert.equal(groupIds.size,20,`sets ${groupIds.size}`);
    for(const gid of groupIds) assert.equal(draw.filter(q=>q.stimulusGroupId===gid).length,3,gid);
  }
  console.log('AP Business release draw envelope',{personalFinance:[minPF,maxPF],sourceSets:[20,20]});
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

  assert.equal(40*2.50,100); assert.ok(100>80);
  assert.equal(3200-180-250,2770); assert.equal(3450-100-650,2700);
  assert.equal(14-7.40,6.60); assert.equal(14-8.10,5.90);
  assert.equal(6000*0.02-95,25); assert.equal(6000*0.01,60);
  assert.equal(14000+38000+18000,70000); assert.equal(22000+9000,31000); assert.equal(70000-31000,39000);
  assert.ok(Math.abs(120000/36000-(10/3))<1e-12); assert.ok(Math.abs(15000/18000-(5/6))<1e-12);
  assert.match(byId('apbpf-set3-u2-credit-2').o[byId('apbpf-set3-u2-credit-2').c[0]],/^Card B,/);

  assert.equal(34*18-520,92);
  assert.equal(3*3,9); assert.equal(600*0.005,3); assert.equal(8-3,5);
  assert.equal(190*12,2280); assert.equal(2280+80,2360); assert.equal(125*20,2500);
  assert.equal(6000+3000-4800,4200);
  assert.equal(18000+42000-50000-16000,-6000);
  assert.match(byId('apbpf-set4-u3-emergency-1').stimulus.title,/Planned car down payment/i);
});
