const test = require('node:test');
const assert = require('node:assert/strict');
const { AP_SUBJECTS } = require('../js/subjects');
const { drawExam } = require('../js/draw');
const { loadPrecalculusBank } = require('./helpers');

const subject = AP_SUBJECTS.find((s) => s.id === 'ap-precalculus');
const bank = loadPrecalculusBank();

const TOPICS = {
  '1.1':'Change in Tandem','1.2':'Rates of Change','1.3':'Rates of Change in Linear and Quadratic Functions','1.4':'Polynomial Functions and Rates of Change','1.5':'Polynomial Functions and Complex Zeros','1.6':'Polynomial Functions and End Behavior','1.7':'Rational Functions and End Behavior','1.8':'Rational Functions and Zeros','1.9':'Rational Functions and Vertical Asymptotes','1.10':'Rational Functions and Holes','1.11':'Equivalent Representations of Polynomial and Rational Expressions','1.12':'Transformations of Functions','1.13':'Function Model Selection and Assumption Articulation','1.14':'Function Model Construction and Application',
  '2.1':'Change in Arithmetic and Geometric Sequences','2.2':'Change in Linear and Exponential Functions','2.3':'Exponential Functions','2.4':'Exponential Function Manipulation','2.5':'Exponential Function Context and Data Modeling','2.6':'Competing Function Model Validation','2.7':'Composition of Functions','2.8':'Inverse Functions','2.9':'Logarithmic Expressions','2.10':'Inverses of Exponential Functions','2.11':'Logarithmic Functions','2.12':'Logarithmic Function Manipulation','2.13':'Exponential and Logarithmic Equations and Inequalities','2.14':'Logarithmic Function Context and Data Modeling','2.15':'Semi-log Plots',
  '3.1':'Periodic Phenomena','3.2':'Sine, Cosine, and Tangent','3.3':'Sine and Cosine Function Values','3.4':'Sine and Cosine Function Graphs','3.5':'Sinusoidal Functions','3.6':'Sinusoidal Function Transformations','3.7':'Sinusoidal Function Context and Data Modeling','3.8':'The Tangent Function','3.9':'Inverse Trigonometric Functions','3.10':'Trigonometric Equations and Inequalities','3.11':'The Secant, Cosecant, and Cotangent Functions','3.12':'Equivalent Representations of Trigonometric Functions','3.13':'Trigonometry and Polar Coordinates','3.14':'Polar Function Graphs','3.15':'Rates of Change in Polar Functions'
};
const ALLOWED_FAMILIES = {
  '1.1':[2,3],'1.2':[2,3],'1.3':[3],'1.4':[2,3],'1.5':[1,2],'1.6':[3],'1.7':[1,3],'1.8':[1],'1.9':[2,3],'1.10':[3],'1.11':[1,3],'1.12':[1,3],'1.13':[2,3],'1.14':[1,3],
  '2.1':[1,3],'2.2':[1,3],'2.3':[3],'2.4':[1,3],'2.5':[1,3],'2.6':[2,3],'2.7':[1,2],'2.8':[1,2],'2.9':[1],'2.10':[1,2],'2.11':[3],'2.12':[1,3],'2.13':[1],'2.14':[1,3],'2.15':[2,3],
  '3.1':[2,3],'3.2':[2,3],'3.3':[2,3],'3.4':[2,3],'3.5':[2,3],'3.6':[1,2],'3.7':[1,3],'3.8':[2,3],'3.9':[1,2],'3.10':[1,2,3],'3.11':[2,3],'3.12':[1,3],'3.13':[1,2],'3.14':[2,3],'3.15':[3]
};
const EXACT_SKILLS = new Set(['1.A','1.B','1.C','2.A','2.B','3.A','3.B','3.C']);
const byId = (id) => bank.find((q) => q.id === id);

function correctText(q) { return q.o[q.c[0]]; }

test('Precalculus clean-room inventory exactly matches the Fall 2026 examinable CED topics', () => {
  assert.equal(Object.keys(TOPICS).length, 44);
  const seen = new Map();
  for (const q of bank) {
    assert.equal(q.topic, TOPICS[q.topicCode], `${q.id}: topic title/code mismatch`);
    seen.set(q.topicCode, (seen.get(q.topicCode) || 0) + 1);
  }
  assert.deepEqual([...seen.keys()].sort((a,b)=>a.localeCompare(b, undefined, {numeric:true})), Object.keys(TOPICS).sort((a,b)=>a.localeCompare(b, undefined, {numeric:true})));
  for (const [code,count] of seen) assert.ok(count >= 2, `${code}: needs at least two independent items`);
});

test('every Precalculus exact skill is valid for the topic and the bank-level practice mix matches CED bands', () => {
  const familyCounts = {1:0,2:0,3:0};
  for (const q of bank) {
    assert.ok(EXACT_SKILLS.has(q.skill), `${q.id}: invalid exact skill ${q.skill}`);
    const family = Number(q.skill[0]);
    assert.ok(ALLOWED_FAMILIES[q.topicCode].includes(family), `${q.id}: Practice ${family} is not valid for ${q.topicCode}`);
    familyCounts[family]++;
  }
  const pct = (n) => n / bank.length;
  assert.ok(pct(familyCounts[1]) >= .35 && pct(familyCounts[1]) <= .50, JSON.stringify(familyCounts));
  assert.ok(pct(familyCounts[2]) >= .20 && pct(familyCounts[2]) <= .30, JSON.stringify(familyCounts));
  assert.ok(pct(familyCounts[3]) >= .30 && pct(familyCounts[3]) <= .40, JSON.stringify(familyCounts));
});

test('Precalculus semantic variants are grouped and never co-occur in a delivered exam', () => {
  const groups = new Map();
  for (const q of bank.filter(q => q.variantGroupId)) {
    if (!groups.has(q.variantGroupId)) groups.set(q.variantGroupId, []);
    groups.get(q.variantGroupId).push(q);
  }
  assert.ok(groups.size >= 10);
  for (const [id, items] of groups) {
    assert.ok(items.length >= 2, `${id}: singleton variant group`);
    assert.equal(new Set(items.map(q=>q.unit)).size, 1, `${id}: crosses units`);
    assert.equal(new Set(items.map(q=>q.topicCode)).size, 1, `${id}: crosses topics`);
  }
  for (let i=0;i<1000;i++) {
    const exam = drawExam(subject, bank);
    const seen = new Set();
    for (const q of exam.filter(q=>q.variantGroupId)) {
      assert.ok(!seen.has(q.variantGroupId), `draw ${i}: repeated ${q.variantGroupId}`);
      seen.add(q.variantGroupId);
    }
  }
});

test('clean-room item defects remain repaired', () => {
  assert.match(byId('apprecalc-u1-012').q, /changes concavity/);
  assert.match(byId('apprecalc-u1-026').q, /remaining denominator is nonzero/);
  assert.doesNotMatch(byId('apprecalc-u2-006').q, /decreas/i);
  assert.doesNotMatch(byId('apprecalc-u2-020').q, /previous|same model/i);
  assert.match(correctText(byId('apprecalc-u2-032')), /−∞/);
  assert.match(correctText(byId('apprecalc-u3-035')), /−r.*θ \+ π/);
  assert.doesNotMatch(correctText(byId('apprecalc-u3-038')), /spiral/i);
});

test('standalone Precalculus stems do not depend on randomized neighboring questions', () => {
  for (const q of bank) {
    if (q.stimulusGroupId) continue;
    assert.doesNotMatch(q.q, /previous (?:question|problem)|same model as|as above/i, `${q.id}: hidden standalone dependency`);
  }
});

test('selected clean-room quantitative repairs independently recompute', () => {
  assert.equal(correctText(byId('apprecalc-u1-004')), '5');
  assert.equal(correctText(byId('apprecalc-u1-005')), '4');
  assert.match(correctText(byId('apprecalc-u1-006')), /^23/);
  assert.equal(correctText(byId('apprecalc-u1-013')), 'x = 3 ± 2i');
  assert.equal(correctText(byId('apprecalc-u1-014')), 'x^2 − 4x + 13');
  assert.equal(correctText(byId('apprecalc-u1-041')), 'h(t) = −2(t − 3)^2 + 18');
  assert.equal((65 - 40) / 5, 5);
  assert.match(correctText(byId('apprecalc-u2-006')), /^5/);
  assert.ok(Math.abs(100 * 1.05 ** 2 - 110.25) < 1e-10);
  assert.equal(correctText(byId('apprecalc-u2-011')), '110.25(1.05)^(x − 2)');
  assert.equal(correctText(byId('apprecalc-u2-036')), 'x = 5');
  assert.equal(correctText(byId('apprecalc-u2-037')), 'x = 16');
  assert.equal(correctText(byId('apprecalc-u2-038')), 'x = 5');
  assert.equal(correctText(byId('apprecalc-u3-023')), 'θ = π/6');
  assert.equal(correctText(byId('apprecalc-u3-024')), 'θ = π/2');
});
