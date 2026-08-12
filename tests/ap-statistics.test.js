const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { AP_SUBJECTS } = require('../js/subjects');
const { drawExam } = require('../js/draw');
const { loadStatisticsBank } = require('./helpers');

const subject = AP_SUBJECTS.find((s) => s.id === 'ap-statistics');
const bank = loadStatisticsBank();
const TOPICS = {
  U1: Array.from({length:13},(_,i)=>`1.${i+1}`),
  U2: Array.from({length:12},(_,i)=>`2.${i+1}`),
  U3: Array.from({length:15},(_,i)=>`3.${i+1}`),
  U4: Array.from({length:10},(_,i)=>`4.${i+1}`),
  U5: Array.from({length:5},(_,i)=>`5.${i+1}`),
};
const EXACT_SKILLS = {
  "1.1": [
    "1.A",
    "2.A"
  ],
  "1.2": [
    "2.A"
  ],
  "1.3": [
    "3.A",
    "4.A"
  ],
  "1.4": [
    "3.A",
    "4.A",
    "4.B"
  ],
  "1.5": [
    "3.A"
  ],
  "1.6": [
    "4.A",
    "4.B"
  ],
  "1.7": [
    "3.B",
    "4.A",
    "4.B"
  ],
  "1.8": [
    "3.A",
    "4.A"
  ],
  "1.9": [
    "3.B",
    "4.A",
    "4.B",
    "4.C"
  ],
  "1.10": [
    "1.A",
    "2.A",
    "2.B"
  ],
  "1.11": [
    "2.A",
    "2.B"
  ],
  "1.12": [
    "2.A"
  ],
  "1.13": [
    "2.A",
    "2.B"
  ],
  "2.1": [
    "4.A",
    "4.B"
  ],
  "2.2": [
    "3.B",
    "4.A",
    "4.B"
  ],
  "2.3": [
    "3.C"
  ],
  "2.4": [
    "3.C"
  ],
  "2.5": [
    "4.B"
  ],
  "2.6": [
    "3.C"
  ],
  "2.7": [
    "3.C"
  ],
  "2.8": [
    "3.A"
  ],
  "2.9": [
    "3.B",
    "4.D"
  ],
  "2.10": [
    "3.C",
    "3.D",
    "4.B",
    "4.D"
  ],
  "2.11": [
    "3.C",
    "3.D",
    "4.C"
  ],
  "2.12": [
    "4.C"
  ],
  "3.1": [
    "3.D",
    "4.B"
  ],
  "3.2": [
    "3.D",
    "4.D",
    "4.E"
  ],
  "3.3": [
    "2.C",
    "3.E",
    "4.E"
  ],
  "3.4": [
    "2.D",
    "4.F",
    "4.G"
  ],
  "3.5": [
    "2.C",
    "2.E",
    "4.E"
  ],
  "3.6": [
    "4.F"
  ],
  "3.7": [
    "3.E",
    "4.G"
  ],
  "3.8": [
    "2.D",
    "3.C",
    "4.D"
  ],
  "3.9": [
    "3.D",
    "4.D",
    "4.E"
  ],
  "3.10": [
    "2.C",
    "3.E",
    "4.E"
  ],
  "3.11": [
    "4.F",
    "4.G"
  ],
  "3.12": [
    "2.C",
    "2.E",
    "4.E"
  ],
  "3.13": [
    "3.E",
    "4.F",
    "4.G"
  ],
  "3.14": [
    "2.C",
    "2.E",
    "4.C",
    "4.E"
  ],
  "3.15": [
    "3.C",
    "3.E",
    "4.F",
    "4.G"
  ],
  "4.1": [
    "3.D",
    "4.D",
    "4.E"
  ],
  "4.2": [
    "2.C",
    "3.E",
    "4.C",
    "4.E"
  ],
  "4.3": [
    "2.D",
    "4.F",
    "4.G"
  ],
  "4.4": [
    "2.C",
    "2.E",
    "4.E"
  ],
  "4.5": [
    "3.E",
    "4.F",
    "4.G"
  ],
  "4.6": [
    "3.D",
    "4.D",
    "4.E"
  ],
  "4.7": [
    "2.C",
    "3.E",
    "4.E"
  ],
  "4.8": [
    "4.F",
    "4.G"
  ],
  "4.9": [
    "2.C",
    "2.E",
    "4.E"
  ],
  "4.10": [
    "3.E",
    "4.F",
    "4.G"
  ],
  "5.1": [
    "3.A",
    "4.A",
    "4.B"
  ],
  "5.2": [
    "4.D"
  ],
  "5.3": [
    "3.B"
  ],
  "5.4": [
    "3.B",
    "4.A",
    "4.D"
  ],
  "5.5": [
    "3.B",
    "4.D"
  ]
};
const ABSOLUTE = /\b(always|never|every|only|entirely|unlimited|must|guarantees?)\b/i;

test('Statistics metadata matches the May 2027 redesign', () => {
  assert.equal(bank.length, 140); assert.equal(subject.releaseStatus, 'draft');
  assert.equal(subject.mcqCount, 42); assert.equal(subject.mcqTimeMinutes, 90);
  assert.deepEqual(subject.sciencePracticeRanges, {'1':[3,4],'2':[9,12],'3':[11,14],'4':[11,14]});
  assert.deepEqual(subject.attributeRanges.statsSetType, {probability:[3,3],regression:[3,3]});
});

test('Statistics uses exactly the 55 CED topics and exact CED skills', () => {
  const seen = new Map(Object.keys(TOPICS).map(u=>[u,new Set()]));
  const ids = new Set();
  for (const q of bank) {
    assert.match(q.id,/^apstats-u[1-5]-\d{3}$/); assert.ok(!ids.has(q.id)); ids.add(q.id);
    assert.ok(TOPICS[q.unit].includes(q.topicCode), `${q.id}: invalid topic ${q.topicCode}`);
    assert.match(q.skill,/^[1-4]\.[A-G]$/);
    assert.ok(EXACT_SKILLS[q.topicCode].includes(q.skill), `${q.id}: ${q.topicCode} cannot use exact CED skill ${q.skill}`);
    assert.equal(q.type,'s'); assert.equal(q.o.length,4); assert.equal(q.c.length,1);
    assert.ok(q.e.length>=90, `${q.id}: rationale too short`);
    assert.doesNotMatch(q.e,/This item applies CED Topic|The question asks about a population or process and anticipates variation|The stated reasoning follows directly from the statistical model/i);
    seen.get(q.unit).add(q.topicCode);
  }
  for (const [u,topics] of Object.entries(TOPICS)) assert.deepEqual([...seen.get(u)].sort((a,b)=>Number(a.split('.')[1])-Number(b.split('.')[1])), topics);
});

test('Statistics variant groups are valid and prevent same-exam near duplicates', () => {
  const groups = new Map();
  for (const q of bank.filter(q=>q.variantGroupId)) (groups.get(q.variantGroupId) ?? groups.set(q.variantGroupId,[]).get(q.variantGroupId)).push(q);
  assert.ok(groups.size>0);
  for (const [id,qs] of groups) {
    assert.ok(qs.length>=2, `${id}: singleton variant group`);
    assert.equal(new Set(qs.map(q=>q.unit)).size,1); assert.equal(new Set(qs.map(q=>q.topicCode)).size,1);
    assert.equal(new Set(qs.map(q=>q.q)).size,qs.length); assert.ok(qs.every(q=>!q.stimulusGroupId));
  }
  for(let i=0;i<500;i++){const d=drawExam(subject,bank);for(const id of groups.keys())assert.ok(d.filter(q=>q.variantGroupId===id).length<=1);}
});

test('Statistics inference interpretation and condition skills match the exact task', () => {
  const q=id=>bank.find(x=>x.id===id);
  assert.deepEqual([q('apstats-u4-010').topicCode,q('apstats-u4-010').skill],['4.5','4.G']);
  assert.match(q('apstats-u3-024').q,/verifies the normality condition/i);
  assert.match(q('apstats-u4-018').q,/roughly symmetric.*no extreme outliers/i);
});

test('Statistics exact justify and estimator objectives are semantic, not family-only matches', () => {
  const q=id=>bank.find(x=>x.id===id);
  assert.match(q('apstats-u1-022').q,/and why/i);
  assert.match(q('apstats-u1-022').o[q('apstats-u1-022').c[0]],/because stratification/i);
  assert.match(q('apstats-u3-001').q,/point estimate/i);
  assert.match(q('apstats-u3-002').o[q('apstats-u3-002').c[0]],/because its sampling-distribution center/i);
});

test('Statistics construction skills require constructing or selecting a concrete representation', () => {
  const q=id=>bank.find(x=>x.id===id);
  assert.match(q('apstats-u1-007').q,/correctly constructed bar chart/i);
  assert.match(q('apstats-u1-009').q,/correctly constructed dotplot/i);
  assert.match(q('apstats-u2-017').q,/cumulative probability distribution/i);
  assert.match(q('apstats-u2-007').q,/200 simulated shipments/i);
  assert.match(q('apstats-u2-010').o[q('apstats-u2-010').c[0]],/because P\(A ∩ B\)=0/);
});

test('Statistics semantic near-duplicates are variant-grouped', () => {
  const byId=new Map(bank.map(q=>[q.id,q]));
  for(const ids of [
    ['apstats-u3-013','apstats-u3-014'],
    ['apstats-u4-008','apstats-u4-022'],
    ['apstats-u4-009','apstats-u4-023'],
    ['apstats-u4-015','apstats-u4-024'],
    ['apstats-u2-021','apstats-u2-023'],
    ['apstats-u1-023','apstats-u1-036'],
  ]) { const a=byId.get(ids[0]),b=byId.get(ids[1]); assert.ok(a.variantGroupId); assert.equal(a.variantGroupId,b.variantGroupId); }
  assert.match(byId.get('apstats-u2-018').q,/standard deviation/i);
});

test('Statistics shared stimulus sets, provenance, and visual accessibility are sound', () => {
  const groups = new Map();
  for(const q of bank.filter(q=>q.stimulusGroupId))(groups.get(q.stimulusGroupId)??groups.set(q.stimulusGroupId,[]).get(q.stimulusGroupId)).push(q);
  assert.equal(groups.size,6); const types={probability:0,regression:0};
  for(const [id,qs] of groups){assert.equal(qs.length,3);assert.ok(qs.every(q=>q.stimulus===qs[0].stimulus));assert.match(qs[0].stimulus.source,/Original (synthetic|simulated)/i);types[qs[0].statsSetType]++;if(qs[0].stimulus.image)assert.ok(fs.existsSync(qs[0].stimulus.image));}
  assert.deepEqual(types,{probability:3,regression:3});
  for (const [id,qs] of groups) {
    const shared = qs[0].stimulus;
    const outsiders = bank.filter(q => q.stimulus === shared && q.stimulusGroupId !== id);
    assert.equal(outsiders.length,0, id + ': candidate stimulus is reused outside its three-question group');
  }
  const visual=bank.find(q=>q.stimulus?.image==='assets/ap-statistics-regression-scatter.svg').stimulus;
  assert.ok(visual.alt.length>=60); assert.doesNotMatch(visual.alt,/strong|positive|negative|linear pattern|outlier|unusual|above|below|residual/i);
  assert.doesNotMatch(visual.description,/strong|positive|negative|outlier|unusual|above|below|residual/i);
  const svg=fs.readFileSync(visual.image,'utf8'); assert.doesNotMatch(svg,/positive linear|unusually low|well below/i);
});

test('Statistics answer construction has no project-defined tells', () => {
  const wc=s=>s.trim().split(/\s+/).length;let unique=0,among=0,cw=0,dw=0;const keys=[0,0,0,0];
  for(const q of bank){keys[q.c[0]]++;const lens=q.o.map(wc),mx=Math.max(...lens),cl=lens[q.c[0]];if(cl===mx)among++;if(cl===mx&&lens.filter(x=>x===mx).length===1)unique++;cw+=cl;lens.forEach((x,i)=>{if(i!==q.c[0])dw+=x});const abs=q.o.filter((_,i)=>i!==q.c[0]).filter(x=>ABSOLUTE.test(x));assert.ok(abs.length<2,`${q.id}: stacked absolute-language distractors`);}
  assert.ok(unique/bank.length<=.25);assert.ok(among/bank.length<=.58);assert.ok(Math.abs(cw/bank.length-dw/(bank.length*3))/(dw/(bank.length*3))<=.12);for(const k of keys)assert.ok(k/bank.length>=.15&&k/bank.length<=.35);
});

test('selected quantitative results independently recompute', () => {
  const ans=f=>{const q=bank.find(q=>q.q.includes(f));assert.ok(q, f);return q.o[q.c[0]]};
  assert.equal(ans('sample of 240 commuters'),'Public transit: 96; Other mode: 144');
  assert.equal(ans('Five delivery times'),'22 minutes');
  assert.equal(ans('Using the 1.5×IQR rule'),'52');
  assert.match(ans("runner's time is 68"),/z = −2/);
  assert.equal(ans('fair six-sided die is rolled twice'),'11/36');
  assert.equal(ans('P(A ∩ B) = 0.18'),'0.60');
  assert.equal(ans('n = 80, p = 0.25'),'μ = 20 and σ = √15 ≈ 3.87');
  assert.match(ans('population has proportion p = 0.36'),/0.048/);
  assert.equal(ans('sample proportion is p̂ = 0.58'),'(0.519, 0.641)');
  assert.equal(ans('sample of n = 200 has p̂ = 0.57'),'About 1.98');
  assert.equal(ans('p₁ = 0.40 and p₂ = 0.25'),'0.15');
  assert.equal(ans('p̂₁ = 0.62'),'0.08');
  assert.match(ans('x₁=84'),/147\/230/);
  assert.equal(ans('row total is 80'),'18');
  assert.match(ans('s1=10,n1=25'),/2.83/);
  assert.equal(ans('observed difference is 6'),'3');
  assert.equal(ans('least-squares line is ŷ=20+1.5x'),'26');
  assert.equal(ans('model predicts y=42'),'−5');
  assert.equal(ans('sx=4, sy=10'),'1.5');
  assert.equal(ans('slope 1.5 and passes through'),'20');
  assert.match(ans('9-mile delivery'),/36.9/);
});

test('every Statistics draw obeys unit, practice, and required-set blueprints',()=>{for(let i=0;i<2000;i++){const d=drawExam(subject,bank);assert.equal(d.length,42);assert.deepEqual(Object.fromEntries(subject.units.map(u=>[u.id,d.filter(q=>q.unit===u.id).length])),{U1:11,U2:9,U3:9,U4:7,U5:6});assert.equal(d.filter(q=>q.statsSetType==='probability').length,3);assert.equal(d.filter(q=>q.statsSetType==='regression').length,3);for(const selected of d.filter(q=>q.stimulusGroupId)){const same=d.filter(x=>x.stimulus===selected.stimulus);const expected=d.filter(x=>x.stimulusGroupId===selected.stimulusGroupId);assert.equal(same.length,expected.length, selected.stimulusGroupId+': selected shared stimulus leaked into extra questions');}const p={1:0,2:0,3:0,4:0};d.forEach(q=>p[q.skill[0]]++);for(const [k,[lo,hi]] of Object.entries(subject.sciencePracticeRanges))assert.ok(p[k]>=lo&&p[k]<=hi);}});

test('Statistics retake overlap stays at or below 40%',()=>{let total=0;const n=1500;for(let i=0;i<n;i++){const a=new Set(drawExam(subject,bank).map(q=>q.id));total+=drawExam(subject,bank).filter(q=>a.has(q.id)).length/42;}const avg=total/n;console.log(`Statistics Monte Carlo overlap: ${(100*avg).toFixed(1)}%`);assert.ok(avg<=.40);});


test('exact CED regression fixes remain aligned to their learning objectives', () => {
  const q=id=>bank.find(x=>x.id===id);
  assert.deepEqual([q('apstats-u1-015').topicCode,q('apstats-u1-015').skill],['1.7','3.B']);
  assert.deepEqual([q('apstats-u1-016').topicCode,q('apstats-u1-016').skill],['1.8','4.A']);
  assert.deepEqual([q('apstats-u2-016').topicCode,q('apstats-u2-016').skill],['2.10','3.C']);
  assert.match(q('apstats-u2-016').q,/Binomial/i);
  assert.deepEqual([q('apstats-u2-023').topicCode,q('apstats-u2-023').skill],['2.12','4.C']);
  assert.deepEqual([q('apstats-u5-005').topicCode,q('apstats-u5-005').skill],['5.3','3.B']);
  assert.deepEqual([q('apstats-u5-007').topicCode,q('apstats-u5-007').skill],['5.5','4.D']);
  assert.deepEqual([q('apstats-u5-013').topicCode,q('apstats-u5-013').skill],['5.2','4.D']);
  assert.deepEqual([q('apstats-u3-029').topicCode,q('apstats-u3-029').skill],['3.15','3.C']);
  for(const x of bank.filter(x=>x.stimulus && !x.stimulusGroupId)) assert.fail(x.id+': standalone item retains candidate-set stimulus');
});
