const fs = require('fs');
const vm = require('vm');

const dataPath = 'data/ap-statistics.js';
const testPath = 'tests/ap-statistics.test.js';
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(dataPath, 'utf8'), sandbox);
const Q = sandbox.window.QUESTIONS_AP_STATISTICS;
if (!Array.isArray(Q) || Q.length !== 140) throw new Error(`Expected 140 Statistics questions, got ${Q?.length}`);

const byId = new Map(Q.map(q => [q.id, q]));
const get = id => { const q = byId.get(id); if (!q) throw new Error(`Missing ${id}`); return q; };
const patch = (id, values) => Object.assign(get(id), values);

// Exact CED / learning-objective corrections from the Effective Fall 2026 CED.
// U1: categorical representations, quantitative summaries, sampling, and experiments.
patch('apstats-u1-005', {
  topicCode: '1.3', skill: '3.A',
  q: 'A sample of 240 commuters includes 96 public-transit riders and 144 commuters using other modes. Which frequency table correctly represents the categorical variable primary commute mode?',
  o: ['Public transit: 96; Other mode: 144', 'Public transit: 144; Other mode: 96', 'Public transit: 0.40; Other mode: 0.60, labeled as counts', 'Public transit: 240; Other mode: 240'],
  c: [0],
  e: 'A frequency table for a categorical variable records category counts. The observed counts are 96 public-transit riders and 144 other-mode commuters; proportions would be a different representation.'
});
patch('apstats-u1-006', {
  topicCode: '1.3', skill: '4.A',
  q: 'A frequency table for 500 households lists 85 with no vehicle, 210 with one vehicle, 160 with two vehicles, and 45 with three or more. Which description is correct?',
  o: ['The one-vehicle category is the most common, with 210 households.', 'The no-vehicle category is the most common, with 85 households.', 'Exactly half of the households have two or more vehicles.', 'The three-or-more category contains more households than the two-vehicle category.'],
  c: [0],
  e: 'The frequency table shows 210 households in the one-vehicle category, which exceeds 160, 85, and 45 in the other categories. The remaining statements contradict the displayed counts.'
});
patch('apstats-u1-008', { skill: '4.A' });
patch('apstats-u1-010', { topicCode: '1.6', skill: '4.A' });
patch('apstats-u1-011', { skill: '4.A' });
patch('apstats-u1-015', { topicCode: '1.7', skill: '3.B' });
patch('apstats-u1-016', { topicCode: '1.7', skill: '3.B' });
patch('apstats-u1-031', { skill: '2.A' });
patch('apstats-u1-036', { skill: '2.A' });

// U2: remove standalone reuse of candidate-set stimuli and align each task to its actual LO.
patch('apstats-u2-001', {
  topicCode: '2.1', skill: '4.A', stimulus: undefined,
  q: 'A two-way table compares pet ownership (yes/no) with housing type (apartment/house). Which comparison best describes whether the two categorical variables are associated?',
  o: ['Compare the conditional pet-ownership percentages within apartment and house residents.', 'Compare only the two marginal housing percentages.', 'Compare the grand total with the total number of pet owners.', 'Compare two raw cell counts without accounting for different housing-group totals.'],
  c: [0],
  e: 'Association between two categorical variables is described by comparing conditional distributions across groups. Marginal totals or isolated raw counts do not make the relevant within-group comparison.'
});
patch('apstats-u2-002', {
  topicCode: '2.2', skill: '3.B', stimulus: undefined,
  q: 'Among 250 students, 80 of 100 students who participate in a school club report attending the dance, while 75 of 150 students who do not participate in a club attend. What proportion of club participants attended the dance?',
  o: ['80/250 = 0.32', '80/100 = 0.80', '155/250 = 0.62', '100/250 = 0.40'],
  c: [1],
  e: 'The requested conditional relative frequency uses club participants as the denominator. Of the 100 club participants, 80 attended, so the conditional proportion is 80/100 = 0.80.'
});
patch('apstats-u2-003', {
  topicCode: '2.6', skill: '3.C', stimulus: undefined,
  q: 'A school reports that 30% of students take an arts course and 18% both take an arts course and play a school sport. Given that a student takes an arts course, what is the probability the student plays a school sport?',
  o: ['0.18', '0.30', '0.60', '0.48'],
  c: [2],
  e: 'Conditional probability divides the joint probability by the probability of the condition: P(sport | arts)=P(sport ∩ arts)/P(arts)=0.18/0.30=0.60.'
});
patch('apstats-u2-011', { topicCode: '2.7', skill: '3.C' });
patch('apstats-u2-014', {
  topicCode: '2.8', skill: '3.A', stimulus: undefined,
  q: 'A random variable X can take values 0, 1, and 2 with probabilities 0.50, 0.30, and 0.20. Which proposed table correctly represents its probability distribution?',
  o: ['x: 0,1,2 with P(X=x): 0.50,0.30,0.20', 'x: 0,1,2 with P(X=x): 0.50,0.30,0.30', 'x: 0,1,2 with P(X=x): 0.50,−0.10,0.60', 'x: 0,1,2 with P(X=x): 1.00,0.30,0.20'],
  c: [0],
  e: 'A valid representation assigns each possible value a probability between 0 and 1 and the probabilities sum to 1. Only 0.50, 0.30, and 0.20 satisfy both requirements.'
});
patch('apstats-u2-015', {
  topicCode: '2.9', skill: '3.B', stimulus: undefined,
  q: 'A random variable X takes values 0, 1, 2, and 3 with probabilities 0.50, 0.30, 0.15, and 0.05. What is E(X)?',
  o: ['0.50', '0.75', '1.00', '1.50'], c: [1],
  e: 'The expected value is the probability-weighted mean: 0(0.50)+1(0.30)+2(0.15)+3(0.05)=0.75. It represents the long-run average value of X.'
});
patch('apstats-u2-016', {
  topicCode: '2.10', skill: '3.C', stimulus: undefined,
  q: 'For X ~ Binomial(n=10, p=0.30), which expression gives P(X=3)?',
  o: ['(0.30)^3(0.70)^7', '10(0.30)^3(0.70)^7', 'C(10,3)(0.30)^3(0.70)^7', 'C(10,3)(0.30)^7(0.70)^3'],
  c: [2],
  e: 'A binomial probability for exactly three successes is C(10,3)p^3(1−p)^7. The combination factor counts which three of the ten trials are successes.'
});
patch('apstats-u2-022', {
  topicCode: '2.12', skill: '4.C', stimulus: undefined,
  q: 'A population has mean 50 and standard deviation 18. Which description correctly compares sampling distributions of x̄ for simple random samples of sizes 16 and 64?',
  o: ['Both are centered at 50, and the n=64 distribution has half the standard deviation of the n=16 distribution.', 'Both are centered at 50, and the n=64 distribution has twice the standard deviation of the n=16 distribution.', 'The n=64 distribution is centered at 64 while the n=16 distribution is centered at 16.', 'Increasing sample size changes the center from the population mean toward zero.'],
  c: [0],
  e: 'Sampling distributions of x̄ are centered at the population mean. Their standard deviation is σ/√n, so increasing n from 16 to 64 doubles √n and halves the sampling-distribution spread.'
});
patch('apstats-u2-023', {
  topicCode: '2.12', skill: '4.C', stimulus: undefined,
  q: 'A population is strongly right-skewed. Which statement best describes the shape of the sampling distribution of x̄ as the random-sample size becomes large?',
  o: ['It tends to become approximately normal even though the population is skewed.', 'It must become more right-skewed than the population.', 'It becomes uniform because sample means are averages.', 'Its shape is always identical to the population shape.'],
  c: [0],
  e: 'The central limit theorem says that, under appropriate random/independence conditions, the sampling distribution of x̄ becomes approximately normal as sample size grows, even for a skewed population.'
});
patch('apstats-u2-024', {
  topicCode: '2.12', skill: '4.C', stimulus: undefined,
  q: 'Two sampling distributions of x̄ come from the same population, one using n=25 and one using n=100. How do their centers and spreads compare?',
  o: ['They have the same center, and the n=100 distribution has half the standard deviation.', 'They have the same center, and the n=100 distribution has twice the standard deviation.', 'The n=100 distribution has twice the center and the same standard deviation.', 'The n=25 distribution has half the center and one-fourth the standard deviation.'],
  c: [0],
  e: 'Both sampling distributions are centered at the population mean. Since SD(x̄)=σ/√n, increasing n from 25 to 100 doubles √n and therefore halves the standard deviation.'
});
patch('apstats-u2-025', { topicCode: '2.2', skill: '3.B' });
patch('apstats-u2-026', { topicCode: '2.2', skill: '4.A' });
patch('apstats-u2-028', {
  topicCode: '2.8', skill: '3.A',
  q: 'Which bar graph description correctly represents the device-failure probability distribution?',
  o: ['Bars at x=0,1,2,3 with heights 0.50,0.30,0.15,0.05', 'Bars at x=0,1,2,3 with heights 0.05,0.15,0.30,0.50', 'Four equal-height bars of 0.25', 'A continuous histogram with density extending beyond x=3'],
  c: [0],
  e: 'A discrete probability distribution is represented with separate bars at its possible values, with each bar height equal to that value’s probability. The table gives heights 0.50, 0.30, 0.15, and 0.05.'
});
patch('apstats-u2-029', { skill: '3.B' });
patch('apstats-u2-030', { topicCode: '2.6', skill: '3.C' });
patch('apstats-u2-031', { topicCode: '2.12', skill: '4.C' });
patch('apstats-u2-032', { topicCode: '2.12', skill: '4.C' });
patch('apstats-u2-033', { topicCode: '2.12', skill: '4.C' });

// U3 exact skill corrections.
patch('apstats-u3-002', { skill: '4.B' });
patch('apstats-u3-012', { skill: '4.F' });

// U4: keep mean-inference content inside the actual one/two-sample mean LOs.
patch('apstats-u4-008', {
  topicCode: '4.4', skill: '4.E',
  q: 'A one-sample t test for a population mean is planned from a random sample of n=12. The sample data are strongly skewed with two extreme outliers. Which statement best assesses the method?',
  o: ['The t test is questionable because a small sample with severe skewness and outliers does not satisfy the sample-data condition.', 'The t test is automatically valid whenever the data come from a random sample.', 'The t test is invalid because the population standard deviation is unknown.', 'The t test requires the sample mean to equal the null mean before testing.'],
  c: [0],
  e: 'For a small sample, a one-sample t procedure requires data without strong skewness or outliers. Random sampling addresses randomization, but it does not repair a severe small-sample shape problem.'
});
patch('apstats-u4-015', { topicCode: '4.2', skill: '2.C' });
patch('apstats-u4-024', { topicCode: '4.2', skill: '2.C' });

// U5: revised CED places extrapolation in 5.3 and r-squared in 5.5; correlation is 5.2/4.D.
patch('apstats-u5-005', { topicCode: '5.3', skill: '3.B' });
patch('apstats-u5-007', { topicCode: '5.5', skill: '4.D' });
patch('apstats-u5-013', { topicCode: '5.2', skill: '4.D' });

// Candidate-set stimuli must be exclusive. No standalone item may retain those objects.
for (const q of Q) {
  if (!q.stimulusGroupId && q.stimulus) delete q.stimulus;
}

// Preserve shared stimulus object identity while emitting readable shipping data.
const stimuli = [];
const stimulusIndex = new Map();
for (const q of Q) {
  if (!q.stimulus) continue;
  if (!stimulusIndex.has(q.stimulus)) { stimulusIndex.set(q.stimulus, stimuli.length); stimuli.push(q.stimulus); }
  q.__stimulusIndex = stimulusIndex.get(q.stimulus);
  delete q.stimulus;
}
const serializedQ = JSON.stringify(Q, null, 2);
const serializedStimuli = JSON.stringify(stimuli, null, 2);
const out = `// AP Statistics — original practice bank for the redesigned May 2027 exam.\n// CED alignment independently re-audited 2026-08-11 against the Effective Fall 2026 CED.\n(()=>{"use strict";\nconst STIMULI=${serializedStimuli};\nconst Q=${serializedQ};\nfor (const q of Q) { if (Number.isInteger(q.__stimulusIndex)) { q.stimulus=STIMULI[q.__stimulusIndex]; delete q.__stimulusIndex; } }\nwindow.QUESTIONS_AP_STATISTICS=Q;\n})();\n`;
fs.writeFileSync(dataPath, out);

const exact = {
  '1.1':['1.A','2.A'],'1.2':['2.A'],'1.3':['3.A','4.A'],'1.4':['3.A','4.A','4.B'],'1.5':['3.A'],'1.6':['4.A','4.B'],'1.7':['3.B','4.A','4.B'],'1.8':['3.A','4.A'],'1.9':['3.B','4.A','4.B','4.C'],'1.10':['1.A','2.A','2.B'],'1.11':['2.A','2.B'],'1.12':['2.A'],'1.13':['2.A','2.B'],
  '2.1':['4.A','4.B'],'2.2':['3.B','4.A','4.B'],'2.3':['3.C'],'2.4':['3.C'],'2.5':['4.B'],'2.6':['3.C'],'2.7':['3.C'],'2.8':['3.A'],'2.9':['3.B','4.D'],'2.10':['3.C','3.D','4.B','4.D'],'2.11':['3.C','3.D','4.C'],'2.12':['4.C'],
  '3.1':['3.D','4.B'],'3.2':['3.D','4.D','4.E'],'3.3':['2.C','3.E','4.E'],'3.4':['2.D','4.F','4.G'],'3.5':['2.C','2.E','4.E'],'3.6':['4.F'],'3.7':['3.E','4.G'],'3.8':['2.D','3.C','4.D'],'3.9':['3.D','4.D','4.E'],'3.10':['2.C','3.E','4.E'],'3.11':['4.F','4.G'],'3.12':['2.C','2.E','4.E'],'3.13':['3.E','4.F','4.G'],'3.14':['2.C','2.E','4.C','4.E'],'3.15':['3.C','3.E','4.F','4.G'],
  '4.1':['3.D','4.D','4.E'],'4.2':['2.C','3.E','4.C','4.E'],'4.3':['2.D','4.F','4.G'],'4.4':['2.C','2.E','4.E'],'4.5':['3.E','4.F','4.G'],'4.6':['3.D','4.D','4.E'],'4.7':['2.C','3.E','4.E'],'4.8':['4.F','4.G'],'4.9':['2.C','2.E','4.E'],'4.10':['3.E','4.F','4.G'],
  '5.1':['3.A','4.A','4.B'],'5.2':['4.D'],'5.3':['3.B'],'5.4':['3.B','4.A','4.D'],'5.5':['3.B','4.D']
};

let tests = fs.readFileSync(testPath, 'utf8');
tests = tests.replace(/const ALLOWED_PRACTICE = \{[\s\S]*?\n\};/, `const EXACT_SKILLS = ${JSON.stringify(exact, null, 2)};`);
tests = tests.replace(/assert\.ok\(ALLOWED_PRACTICE\[q\.topicCode\]\.includes\(q\.skill\[0\]\), `\$\{q\.id\}: \$\{q\.topicCode\} cannot use \$\{q\.skill\}`\);/, "assert.ok(EXACT_SKILLS[q.topicCode].includes(q.skill), `${q.id}: ${q.topicCode} cannot use exact CED skill ${q.skill}`);");

// Strengthen the stimulus test with a bank-wide exclusivity invariant.
const stimNeedle = "assert.deepEqual(types,{probability:3,regression:3});";
if (!tests.includes('candidate stimulus is reused outside')) {
  tests = tests.replace(stimNeedle, `${stimNeedle}\n  for (const [id,qs] of groups) {\n    const shared = qs[0].stimulus;\n    const outsiders = bank.filter(q => q.stimulus === shared && q.stimulusGroupId !== id);\n    assert.equal(outsiders.length,0, id + ': candidate stimulus is reused outside its three-question group');\n  }`);
}

// Every delivered set must remain exactly three questions with no hidden fourth/fifth/sixth question sharing its prompt.
const drawNeedle = "assert.equal(d.filter(q=>q.statsSetType==='regression').length,3);";
if (!tests.includes('selected shared stimulus leaked')) {
  tests = tests.replace(drawNeedle, `${drawNeedle}for(const selected of d.filter(q=>q.stimulusGroupId)){const same=d.filter(x=>x.stimulus===selected.stimulus);const expected=d.filter(x=>x.stimulusGroupId===selected.stimulusGroupId);assert.equal(same.length,expected.length, selected.stimulusGroupId+': selected shared stimulus leaked into extra questions');}`);
}

// Regression assertions for the semantic defects caught by the independent audit.
if (!tests.includes('exact CED regression fixes remain aligned')) {
  tests += `\n\ntest('exact CED regression fixes remain aligned to their learning objectives', () => {\n  const q=id=>bank.find(x=>x.id===id);\n  assert.deepEqual([q('apstats-u1-015').topicCode,q('apstats-u1-015').skill],['1.7','3.B']);\n  assert.deepEqual([q('apstats-u1-016').topicCode,q('apstats-u1-016').skill],['1.7','3.B']);\n  assert.deepEqual([q('apstats-u2-016').topicCode,q('apstats-u2-016').skill],['2.10','3.C']);\n  assert.match(q('apstats-u2-016').q,/Binomial/i);\n  assert.deepEqual([q('apstats-u2-023').topicCode,q('apstats-u2-023').skill],['2.12','4.C']);\n  assert.deepEqual([q('apstats-u5-005').topicCode,q('apstats-u5-005').skill],['5.3','3.B']);\n  assert.deepEqual([q('apstats-u5-007').topicCode,q('apstats-u5-007').skill],['5.5','4.D']);\n  assert.deepEqual([q('apstats-u5-013').topicCode,q('apstats-u5-013').skill],['5.2','4.D']);\n  for(const x of bank.filter(x=>x.stimulus && !x.stimulusGroupId)) assert.fail(x.id+': standalone item retains candidate-set stimulus');\n});\n`;
}
fs.writeFileSync(testPath, tests);
console.log('Applied exact CED and stimulus-exclusivity repairs to AP Statistics.');
