const test=require('node:test');
const assert=require('node:assert/strict');
const subject=require('./helpers/ap-computer-science-a-candidate');
const {loadEffectiveBank}=require('../tools/subject-release-audit');
const {drawExam}=require('../js/draw');
const {bank,scripts}=loadEffectiveBank(subject);
const topicCounts={U1:15,U2:12,U3:9,U4:17};
const topicCodes=Object.entries(topicCounts).flatMap(([u,n])=>Array.from({length:n},(_,i)=>`${u.slice(1)}.${i+1}`));
const unitTargets={U1:8,U2:13,U3:6,U4:15};

test('AP CSA revised-framework inventory is complete and structurally valid',()=>{
  assert.equal(subject.mcqCount,42);
  assert.equal(subject.mcqTimeMinutes,90);
  assert.equal(subject.totalExamTimeLabel,'3h 0m');
  assert.equal(subject.formatVerified,true);
  assert.equal(subject.calculatorAllowed,false);
  assert.ok(['draft','released'].includes(subject.releaseStatus));
  assert.equal(bank.length,159);
  assert.equal(new Set(bank.map(q=>q.id)).size,159);
  assert.equal(new Set(bank.map(q=>q.topicCode)).size,53);
  assert.equal(scripts.length,6);
  for(const code of topicCodes){
    const qs=bank.filter(q=>q.topicCode===code);
    assert.equal(qs.length,3,`${code}: expected exactly three candidates`);
    assert.ok(qs.every(q=>!q.stimulusGroupId),`${code}: baseline candidates should be standalone`);
  }
  bank.forEach(q=>{
    assert.equal(q.type,'s',q.id);
    assert.equal(q.o.length,4,q.id);
    assert.equal(q.c.length,1,q.id);
    assert.ok(Number.isInteger(q.c[0])&&q.c[0]>=0&&q.c[0]<4,q.id);
    assert.match(q.skill,/^[1-5]$/,q.id);
    assert.ok(q.e.length>=90,`${q.id}: rationale too short`);
    assert.match(q.provenance,/Original AP Exam Practice/i,q.id);
  });
});

test('AP CSA raw answer positions are balanced by construction',()=>{
  const keys=[0,0,0,0];bank.forEach(q=>keys[q.c[0]]++);
  assert.deepEqual(keys,[40,40,40,39]);
});

test('AP CSA randomized forms satisfy revised unit and practice constraints',()=>{
  for(let i=0;i<500;i++){
    const draw=drawExam(subject,bank);
    assert.equal(draw.length,42,`draw ${i}`);
    for(const [u,n] of Object.entries(unitTargets)) assert.equal(draw.filter(q=>q.unit===u).length,n,`${u} draw ${i}`);
    const counts=draw.reduce((a,q)=>(a[q.skill]=(a[q.skill]||0)+1,a),{});
    for(const [skill,[lo,hi]] of Object.entries(subject.skillCountRanges)){
      const n=counts[skill]||0;
      assert.ok(n>=lo&&n<=hi,`P${skill}=${n}, expected ${lo}-${hi}, draw ${i}`);
    }
  }
});

test('AP CSA source stays inside selected revised Java API boundaries',()=>{
  const text=bank.map(q=>[q.q,...q.o,q.e].join('\n')).join('\n');
  assert.doesNotMatch(text,/Math\.max\s*\(/);
  assert.doesNotMatch(text,/Math\.min\s*\(/);
  assert.doesNotMatch(text,/Scanner\s*\(\s*System\.in/);
  assert.doesNotMatch(text,/\.nextLine\(\)[\s\S]{0,120}\.next(?:Int|Double|Boolean)\(/);
});
