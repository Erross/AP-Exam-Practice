const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

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
function load(){
  const c={}; c.window=c; c.globalThis=c; vm.createContext(c);
  scripts.forEach(path=>vm.runInContext(fs.readFileSync(path,'utf8'),c,{filename:path}));
  return Array.from(c.QUESTIONS_AP_BUSINESS_PERSONAL_FINANCE);
}
const bank=load();
const byId=id=>bank.find(q=>q.id===id);
const family=q=>String(q.skill).split('.')[0];
const generated=q=>String(q.stimulusGroupId||'').startsWith('apbpf-topic-');

test('clean-room: generated topic sets are source-based and use exact Concept Application subskills',()=>{
  const generatedItems=bank.filter(generated);
  assert.equal(generatedItems.length,84);
  const groups=new Map();
  generatedItems.forEach(q=>{if(!groups.has(q.stimulusGroupId))groups.set(q.stimulusGroupId,[]);groups.get(q.stimulusGroupId).push(q);});
  assert.equal(groups.size,28);
  for(const [gid,qs] of groups){
    assert.equal(qs.length,3,gid); assert.equal(new Set(qs.map(q=>q.topicCode)).size,1,gid);
    assert.deepEqual(qs.map(q=>q.sequence),[1,2,3],gid); assert.deepEqual(qs.map(q=>q.skill),['1.A','1.B','1.C'],gid);
    assert.ok(qs.every(q=>q.stimulus===qs[0].stimulus),gid); assert.match(qs[0].stimulus.note,/not a College Board case/i,gid);
    assert.match(qs[0].stimulus.source,/AP Exam Practice original scenario/i,gid);
  }
});

test('clean-room: generated Concept Application tasks perform their exact CED functions without one repeated stem',()=>{
  const generatedItems=bank.filter(generated), oneA=generatedItems.filter(q=>q.skill==='1.A'), oneB=generatedItems.filter(q=>q.skill==='1.B'), oneC=generatedItems.filter(q=>q.skill==='1.C');
  assert.ok(new Set(oneA.map(q=>q.q)).size>=4); assert.ok(new Set(oneB.map(q=>q.q)).size>=4); assert.ok(new Set(oneC.map(q=>q.q)).size>=4);
  for(const q of oneA){assert.match(q.q,/description.*concept/i,q.id);assert.ok(q.o.every(option=>String(option).split(/\s+/).length>=8),q.id);}
  for(const q of oneB){assert.match(q.q,/interpretation.*qualitative evidence/i,q.id);assert.ok(q.o.every(option=>String(option).length>20),q.id);}
  for(const q of oneC){assert.match(q.q,/explanation.*action.*concept/i,q.id);assert.ok(q.o.every(option=>/because/i.test(option)),q.id);}
});

test('clean-room: Entrepreneurship items perform the exact hypothesis and viability tasks',()=>{
  const twoB=bank.filter(q=>q.skill==='2.B'); assert.ok(twoB.length>=4);
  assert.ok(twoB.every(q=>/hypothes.*test|test.*hypothes/i.test(`${q.q} ${q.o[q.c[0]]}`)),twoB.map(q=>`${q.id}: ${q.q} :: ${q.o[q.c[0]]}`));
  const twoC=bank.filter(q=>q.skill==='2.C'); assert.ok(twoC.length>=3);
  assert.ok(twoC.every(q=>/viab|feasib|desir|financial|contribution|profit|cost/i.test(`${q.q} ${q.e}`)),twoC.map(q=>q.id));
});

test('clean-room: Decision Making subskills 3.B and 3.D carry their required reasoning in the student task',()=>{
  const threeB=bank.filter(q=>q.skill==='3.B'); assert.ok(threeB.length>=8);
  for(const q of threeB){assert.match(q.q,/explanation|how/i,q.id);assert.match(q.o[q.c[0]],/because|\bso\b/i,q.id);}
  const threeD=bank.filter(q=>q.skill==='3.D'); assert.ok(threeD.length>=4);
  for(const q of threeD){assert.match(q.q,/recommend|recommendation/i,q.id);assert.match(q.o[q.c[0]],/because/i,q.id);assert.ok(String(q.e||'').trim().length>=90,q.id);}
});

test('clean-room: Entrepreneurship, Decision Making, and Communication are independently authored source tasks',()=>{
  const higher=bank.filter(q=>['2','3','4'].includes(family(q))); assert.ok(higher.length>0);
  assert.ok(higher.every(q=>q.stimulusGroupId&&!generated(q)),higher.filter(q=>!q.stimulusGroupId||generated(q)).map(q=>q.id));
});

test('clean-room: Communication questions explicitly target an audience or purpose',()=>{
  const comm=bank.filter(q=>['4.A','4.B'].includes(q.skill)); assert.ok(comm.length>=9);
  const audience=/manager|management|executive|leader|employee|team|owner|borrower|saver|household|consumer|homeowner|job seeker|audience|customer|segment/i;
  for(const q of comm) assert.match(`${q.q} ${q.stimulus?.text||''} ${q.stimulus?.note||''}`,audience,q.id);
});

test('clean-room: personal-finance classification is semantic and excludes business cash-flow reporting',()=>{
  const pf=bank.filter(q=>q.personalFinance); assert.equal(pf.length,45); assert.equal(bank.filter(q=>q.topicCode==='3.8'&&q.personalFinance).length,0);
  ['apbpf-topic-1-6','apbpf-topic-2-2','apbpf-topic-3-1','apbpf-topic-3-2','apbpf-topic-3-7','apbpf-set-u1-ethics','apbpf-set-u2-segment','apbpf-set-u3-saving','apbpf-set-u3-credit','apbpf-set3-u1-career','apbpf-set3-u2-credit','apbpf-set3-u3-networth','apbpf-set4-u1-borrowing','apbpf-set4-u2-checking','apbpf-set4-u3-emergency'].forEach(gid=>assert.equal(bank.filter(q=>q.stimulusGroupId===gid&&q.personalFinance).length,3,gid));
});

test('clean-room: repaired quantitative and semantic anchors retain one coherent key',()=>{
  const credit=byId('apbpf-set3-u2-credit-2'); assert.match(credit.o[credit.c[0]],/^Card B,/);
  assert.match(credit.e,/Card A yields 2% of \$6,000=\$120 less \$95=\$25; Card B yields 1% of \$6,000=\$60/i);
  assert.equal(6000*.02-95,25); assert.equal(6000*.01,60); assert.equal(3200-180-250,2770); assert.equal(3450-100-650,2700);
  assert.equal(14000+38000+18000-(22000+9000),39000); assert.equal(40*2.5-80,20); assert.equal(50-2-7,41); assert.equal(50-15-3,32); assert.equal(50-10-6,34);
  assert.match(byId('apbpf-set2-u2-channel-1').e,/\$41 per unit.*\$32.*\$34/);
  assert.equal(34*18-520,92); assert.equal(600*.005,3); assert.equal(8-3,5); assert.equal(3*3,9);
  assert.equal(190*12+80,2360); assert.equal(125*20,2500); assert.equal(6000+3000-4800,4200); assert.equal(18000+42000-50000-16000,-6000);
});

test('clean-room: final-review fixes keep borrowing all-in and Topic 3.1 tied to a future purchase',()=>{
  const borrowing=byId('apbpf-set4-u1-borrowing-2'); assert.match(borrowing.q,/including the origination fee/i); assert.match(borrowing.o[borrowing.c[0]],/\$2,360.*\$2,500/i);
  const purchase=byId('apbpf-set4-u3-emergency-1'); assert.equal(purchase.topicCode,'3.1'); assert.match(purchase.stimulus.title,/Planned car down payment/i); assert.match(purchase.q,/planned car down payment/i);
  assert.doesNotMatch(`${purchase.q} ${purchase.e}`,/emergency[- ]fund/i);
});

test('clean-room: known exact-skill repairs remain in place',()=>{
  assert.equal(byId('apbpf-set2-u1-pestel-2').skill,'3.B'); assert.equal(byId('apbpf-set2-u2-research-2').skill,'1.B'); assert.equal(byId('apbpf-set2-u3-expenses-3').skill,'1.B'); assert.equal(byId('apbpf-set2-u3-reporting-3').skill,'1.A'); assert.equal(byId('apbpf-set-u4-kpi-2').skill,'3.B'); assert.equal(byId('apbpf-set-u3-capital-3').skill,'4.B');
  assert.match(byId('apbpf-set2-u1-structure-3').q,/message to employees/i); assert.match(byId('apbpf-set2-u2-promo-3').q,/message.*homeowners/i);
});

test('clean-room: hardened authored-set distractors stay same-domain rather than cartoon wrong',()=>{
  const banned=[/free money with no borrowing costs/i,/68% is greater than 80%/i,/owning equipment eliminates the possibility that demand will decline/i,/remote work automatically increases fuel consumption/i,/stop measuring response and resolution/i,/legally required to purchase the added capacity/i];
  for(const q of bank) for(const option of q.o) for(const pattern of banned) assert.doesNotMatch(option,pattern,q.id);
});
