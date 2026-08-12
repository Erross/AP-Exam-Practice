const fs = require('node:fs');
const vm = require('node:vm');

const DATA = 'data/ap-statistics.js';
const SVG = 'assets/ap-statistics-regression-scatter.svg';
const SUBJECTS = 'js/subjects.js';
const TEST = 'tests/ap-statistics.test.js';

function loadBank() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(DATA, 'utf8'), sandbox);
  return sandbox.window.QUESTIONS_AP_STATISTICS;
}

const bank = loadBank();
function one(fragment) {
  const hits = bank.filter(q => q.q.includes(fragment));
  if (hits.length !== 1) throw new Error(`Expected one question matching ${fragment}, got ${hits.length}`);
  return hits[0];
}
function set(q, patch) { Object.assign(q, patch); }

// CED Course-at-a-Glance practice-family compatibility, Effective Fall 2026.
const allowedPractice = {
  '1.1':'12','1.2':'2','1.3':'34','1.4':'34','1.5':'3','1.6':'4','1.7':'34','1.8':'34','1.9':'34','1.10':'12','1.11':'2','1.12':'2','1.13':'2',
  '2.1':'4','2.2':'34','2.3':'3','2.4':'3','2.5':'4','2.6':'3','2.7':'3','2.8':'3','2.9':'34','2.10':'34','2.11':'34','2.12':'4',
  '3.1':'34','3.2':'34','3.3':'234','3.4':'24','3.5':'24','3.6':'4','3.7':'34','3.8':'234','3.9':'34','3.10':'234','3.11':'4','3.12':'24','3.13':'34','3.14':'24','3.15':'34',
  '4.1':'34','4.2':'234','4.3':'24','4.4':'24','4.5':'34','4.6':'34','4.7':'234','4.8':'4','4.9':'24','4.10':'34',
  '5.1':'34','5.2':'4','5.3':'3','5.4':'34','5.5':'34',
};

// Replace weak/boilerplate Practice 1 fillers with AP-level alternatives and genuine rationales.
set(one('A school wants to compare commute times for bus riders'), {
  q: 'A school wants to compare commute-time distributions for students who ride the bus and students who are driven. Which investigative question is best aligned with that purpose?',
  o: ['How do commute-time distributions compare for bus riders and students who are driven?', 'What proportion of all students ride the bus to school?', 'Is the mean commute time for all students exactly 18 minutes?', 'Why do some families choose to drive rather than use the bus?'],
  c: [0],
  e: 'The goal is comparative and the response variable is quantitative, so the investigative question should compare the commute-time distributions of the two transportation groups rather than ask about only one proportion, a fixed value, or an unmeasurable cause.',
  variantGroupId: 'apstats-v-u1-investigative-comparison',
});
set(one('A coach wants to study free-throw performance'), {
  q: 'A coach wants to characterize free-throw performance for players on the team. Which investigative question most clearly anticipates variability in a quantitative response?',
  o: ['How is free-throw percentage distributed across players on the team?', 'What proportion of players are listed as guards on the roster?', 'Did the team captain make the final free throw in yesterday’s game?', 'Is the regulation free-throw line 15 feet from the backboard?'],
  c: [0],
  e: 'Free-throw percentage is a quantitative variable that varies from player to player. Asking about its distribution identifies both the observational units and the variable whose variability will be studied; the other choices ask about a different variable or a single fixed fact.',
});
set(one('A city planner is interested in household recycling'), {
  q: 'A city planner wants to estimate a population proportion related to household recycling. Which investigative question identifies the parameter most directly?',
  o: ['What proportion of all city households recycle at least once in a typical week?', 'How many households happened to recycle on one selected Tuesday?', 'Which neighborhood has the closest recycling drop-off center?', 'Do households that recycle use larger bins than households that do not?'],
  c: [0],
  e: 'The requested parameter is a population proportion, so the question must refer to the proportion of all city households meeting a defined recycling criterion. The other choices concern a one-day sample count, location information, or a different comparative variable.',
});
set(one('A teacher wants to compare quiz performance between two class periods'), {
  q: 'A teacher wants to compare quiz-score distributions for first-period and sixth-period classes. Which investigative question is best aligned with that comparison?',
  o: ['How do the quiz-score distributions differ between first period and sixth period?', 'What proportion of all students completed the quiz?', 'Is the combined mean score for both periods exactly 82?', 'Which classroom is used for first period?'],
  c: [0],
  e: 'The stated purpose is to compare a quantitative response across two groups, so the aligned investigative question compares the two score distributions. A completion proportion, a fixed-value claim about the pooled mean, and a room assignment do not address that comparison.',
  variantGroupId: 'apstats-v-u1-investigative-comparison',
});
set(one('A health researcher studies weekly exercise among local adults'), {
  q: 'A health researcher wants to describe weekly exercise time among adults in a county. Which investigative question is statistical and identifies the quantitative variable of interest?',
  o: ['How is weekly exercise time distributed among adults in the county?', 'What proportion of adults belong to a local recreation center?', 'Did one selected adult exercise yesterday?', 'At what time does the recreation center open on Saturday?'],
  c: [0],
  e: 'Weekly exercise time is quantitative and is expected to vary across adults, so a question about its population distribution is statistical and directly matches the goal. The other choices address a different categorical variable, one individual, or a fixed facility schedule.',
});

// Fix the three Practice-1 fillers that were assigned to topics that only assess Practice 2.
set(one('A researcher will sample adults to study sleep duration'), {
  skill: '2.A',
  q: 'A county roster lists 12,000 adults. Investigators choose a random starting number from 1 to 150 and then select every 150th person on the ordered roster. Which sampling method is described?',
  o: ['A systematic random sample', 'A stratified random sample', 'A cluster random sample', 'A voluntary-response sample'],
  c: [0],
  e: 'A systematic random sample uses a random starting point followed by a fixed periodic interval. Selecting every 150th person after a random start matches that definition; the design does not sample within strata, choose whole clusters, or rely on volunteers.',
});
set(one('A principal wants to study student wait times in the lunch line'), {
  skill: '2.B',
  q: 'A principal estimates lunch-line wait time by surveying only students who remain in the cafeteria after the lunch period ends. Why is this sampling plan problematic?',
  o: ['It can create selection bias because students who remain after lunch may have systematically different wait times from students who leave promptly.', 'It guarantees a simple random sample because every student could choose to remain.', 'It eliminates sampling variability because the survey occurs after lunch.', 'It is a matched-pairs design because each student reports one wait time.'],
  c: [0],
  e: 'The sampling frame is restricted to students still present after lunch, and that group may differ systematically from students who leave promptly. This creates a plausible selection or undercoverage bias; convenience does not make the sample random, remove variability, or create pairing.',
});
set(one('A company is evaluating battery life for a new phone model'), {
  skill: '2.B',
  q: 'A company compares two battery-saving modes by randomly assigning each of 120 identical new phones to one mode and measuring hours until shutdown under the same workload. Why is random assignment important?',
  o: ['It helps balance lurking characteristics across the two mode groups so differences in battery life can be attributed more credibly to the assigned mode.', 'It makes the 120 phones a random sample of every phone that will ever be sold.', 'It guarantees the two groups will have exactly the same sample mean battery life.', 'It removes the need to hold the workload constant across phones.'],
  c: [0],
  e: 'Random assignment tends to balance other phone-to-phone differences between treatment groups and therefore supports a causal comparison of the two modes. It does not make the phones a population sample, force equal outcomes, or replace experimental control of workload.',
});

// Repair topic/practice mismatches found in the clean-room audit.
one('Using the commuter table, what is P(public transit)?').skill = '4.A';
set(one('Which simulated sampling distribution has the smallest standard deviation?'), { topicCode: '2.12', skill: '4.D' });
one('Across the three simulations, what value is the sampling distribution of x̄ centered near?').skill = '4.D';
set(one('In a two-way table, a row total is 80'), {
  skill: '4.E',
  q: 'For a chi-square test of independence, a row total is 80, a column total is 45, and the grand total is 200. Which expected count should be used for that cell when checking the expected-count condition?',
  o: ['18', '16', '22.5', '36'], c: [0],
  e: 'Under the null model of independence, the expected count is (row total)(column total)/(grand total) = 80(45)/200 = 18. Expected counts, not observed counts, are used when checking whether the chi-square approximation is appropriate.',
});
set(one('In a chi-square test of independence, what would a Type I error mean?'), { topicCode: '3.8', skill: '4.D' });

set(one('A researcher wants to use a sample mean to learn about a population mean'), {
  skill: '3.D',
  q: 'A population has mean 64 and standard deviation 15. For random samples of size 25, what are the mean and standard deviation of the sampling distribution of x̄?',
  o: ['Mean 64 and standard deviation 3', 'Mean 64 and standard deviation 15', 'Mean 25 and standard deviation 3', 'Mean 64 and standard deviation 0.6'], c: [0],
  e: 'The sampling distribution of x̄ is centered at the population mean, 64, and its standard deviation is σ/√n = 15/5 = 3. Sampling changes the variability of the mean but not its expected center.',
});
set(one('For a two-sample mean test, what change generally reduces the chance of a Type II error'), {
  skill: '4.G',
  q: 'A two-sample t test gives p = 0.008 for H₀: μ₁−μ₂=0 versus a two-sided alternative. At α=0.05, which conclusion is justified?',
  o: ['Reject H₀; the data provide convincing evidence that the population means differ.', 'Fail to reject H₀ because 0.008 is less than the null difference 0.', 'Accept H₀ and conclude the population means are exactly equal.', 'Reject H₀ and conclude every observation in population 1 differs from every observation in population 2.'], c: [0],
  e: 'Because 0.008 is below the significance level 0.05, the null hypothesis is rejected. The conclusion is evidence of a difference between population means; a significance test neither proves exact equality nor makes claims about every individual observation.',
});
set(one('A researcher wants a smaller margin of error for a confidence interval for a population mean'), {
  skill: '4.C',
  q: 'Compared with a t distribution having 8 degrees of freedom, how does a t distribution with 40 degrees of freedom differ?',
  o: ['It has lighter tails and is closer to the standard normal distribution.', 'It has heavier tails and a larger spread because the degrees of freedom are larger.', 'It becomes left-skewed while the 8-degree distribution is symmetric.', 'It has a different mean because the degrees of freedom determine the center.'], c: [0],
  e: 'All t distributions are symmetric and centered at 0. As degrees of freedom increase, their tails become lighter and the distribution approaches the standard normal distribution; the center does not shift and the shape does not become skewed.',
});
set(one('Which change generally increases the power of a test for a population mean'), {
  skill: '4.E',
  q: 'A one-sample t test for a population mean uses n=18 observations. The sample distribution is strongly right-skewed with two extreme outliers. Which condition is the main concern?',
  o: ['With a small sample, the severe skewness and outliers make the t-model condition questionable.', 'The population standard deviation must be known before a t procedure can be used.', 'The response must be categorical for a t procedure to be valid.', 'The sample mean must equal the null mean before the test can be carried out.'], c: [0],
  e: 'For a small sample, a t procedure is sensitive to strong skewness and extreme outliers. Unknown population standard deviation is expected in a t procedure, the response should be quantitative, and the sample mean need not equal the null value.',
});
set(one('For H₀: μ=50 versus Hₐ: μ>50, what is a Type I error?'), {
  skill: '4.F',
  q: 'A one-sample t test for H₀: μ=50 versus Hₐ: μ>50 gives p=0.21. Which interpretation of the test result is appropriate?',
  o: ['The sample does not provide convincing evidence that the population mean exceeds 50.', 'The null hypothesis has a 21% probability of being true.', 'Exactly 21% of population values exceed 50.', 'The population mean is proven to equal 50 because the result is not significant.'], c: [0],
  e: 'A p-value of 0.21 is not small relative to common significance levels, so the data are not sufficiently inconsistent with H₀ to provide convincing evidence for μ>50. The p-value is not a probability that H₀ is true and failure to reject does not prove equality.',
});
set(one('A study will compare mean outcomes for two treatments. Which design creates two independent samples'), {
  skill: '4.E',
  q: 'Two independent samples of sizes 18 and 22 are used to study x̄₁−x̄₂. Both sample distributions are strongly skewed and contain extreme outliers. Why is a normal model for the sampling distribution questionable?',
  o: ['Both samples are small and their data show strong skewness and outliers.', 'The two sample sizes are unequal, which by itself invalidates the model.', 'The population means are unknown, which prevents use of a sampling distribution.', 'Independent samples require the two sample standard deviations to be exactly equal.'], c: [0],
  e: 'When both samples are below about 30, strong skewness and extreme outliers make a normal approximation for the difference in sample means questionable. Unequal sample sizes, unknown means, and unequal standard deviations do not by themselves invalidate the sampling-distribution framework.',
});
set(one('A researcher is planning a confidence interval for the difference between two population means. Which change generally makes the interval narrower'), {
  skill: '4.F',
  q: 'A 95% confidence interval for μ₁−μ₂ is (−1.8, 4.6). Which interpretation is appropriate?',
  o: ['We are 95% confident that the interval from −1.8 to 4.6 contains the population mean difference μ₁−μ₂.', 'There is a 95% probability that the fixed parameter μ₁−μ₂ moves between −1.8 and 4.6.', 'Exactly 95% of observations from population 1 are between 1.8 below and 4.6 above observations from population 2.', 'Because 0 is in the interval, the two population means are proven exactly equal.'], c: [0],
  e: 'The interval estimates the fixed population difference μ₁−μ₂ using a method with 95% long-run coverage. It does not assign a probability to the fixed parameter, describe 95% of individual observations, or prove equality merely because 0 is plausible.',
});
set(one('Regression output gives a diameter coefficient of 4.72'), { topicCode: '5.5', skill: '4.D' });

// Replace two generic rationale tails with question-specific teaching explanations.
set(one('Using the device-failure distribution, what is P(X≥1)?'), {
  e: 'The complement of “at least one failure” is X=0. Because P(X=0)=0.50, P(X≥1)=1−0.50=0.50. The alternatives confuse this complement probability with individual probabilities from the distribution.',
});
set(one('Given that at least one device fails, what is P(X=2)?'), {
  e: 'Conditioning on at least one failure restricts the sample space to X=1,2,3, whose total probability is 0.50. Therefore P(X=2 | X≥1)=0.15/0.50=0.30; using 0.15 would ignore the conditioning.',
});

// Accessible visual descriptions must describe, not solve, the associated questions.
for (const q of bank.filter(q => q.stimulus && q.stimulus.image === SVG)) {
  q.stimulus.description = 'Scatterplot of 18 synthetic student observations with study hours on the horizontal axis, quiz score on the vertical axis, and a fitted least-squares line.';
  q.stimulus.alt = 'Scatterplot with study hours from about 1 to 9.5 on the horizontal axis and quiz scores from about 56 to 94 on the vertical axis; 18 plotted points and a fitted line are shown.';
}
let svg = fs.readFileSync(SVG, 'utf8');
svg = svg.replace('Synthetic positive linear scatterplot with one unusually low point near nine study hours.', 'Scatterplot of 18 synthetic study-hour and quiz-score observations with a fitted line.');
fs.writeFileSync(SVG, svg);

// Validate CED topic/practice pairing after repairs before writing anything.
const mismatches = bank.filter(q => !allowedPractice[q.topicCode] || !allowedPractice[q.topicCode].includes(q.skill[0]));
if (mismatches.length) {
  console.error('CED practice mismatches:', mismatches.map(q => [q.id, q.topicCode, q.skill, q.q]));
  process.exit(2);
}

// Reject leftover boilerplate from the interrupted build/repair pass.
const boiler = /The question asks about a population or process and anticipates variation|The stated reasoning follows directly from the statistical model/i;
const boilerHits = bank.filter(q => boiler.test(q.e));
if (boilerHits.length) throw new Error(`Boilerplate rationales remain: ${boilerHits.map(q => q.id).join(', ')}`);

// Make stimulus references shared in the generated shipping file.
const stimulusObjects = [];
for (const q of bank) if (q.stimulus && !stimulusObjects.includes(q.stimulus)) stimulusObjects.push(q.stimulus);
function jsQuestion(q) {
  const clone = { ...q };
  const stim = clone.stimulus;
  delete clone.stimulus;
  const entries = Object.entries(clone).map(([k,v]) => `${JSON.stringify(k)}:${JSON.stringify(v)}`);
  if (stim) entries.push(`${JSON.stringify('stimulus')}:STIMULI[${stimulusObjects.indexOf(stim)}]`);
  return `{${entries.join(',')}}`;
}
const output = `// AP Statistics — original practice bank for the redesigned May 2027 exam.\n// CED alignment independently re-audited 2026-08-11 against the Effective Fall 2026 CED.\n(()=>{\"use strict\";\nconst STIMULI=${JSON.stringify(stimulusObjects)};\nconst Q=[${bank.map(jsQuestion).join(',\n')}];\nwindow.QUESTIONS_AP_STATISTICS=Q;\n})();\n`;
fs.writeFileSync(DATA, output);

// Strengthen metadata provenance and explain the point allocation.
let subjects = fs.readFileSync(SUBJECTS, 'utf8');
subjects = subjects.replace(
`    // VERIFIED 2026-08-11 against the revised AP Statistics Course and Exam Description\n    // effective for the 2026-27 school year / May 2027 exam. Section I has 42 MCQs\n    // in 90 minutes; the redesign includes one 3-question probability set and one\n    // 3-question regression set. Calculators are permitted throughout.`,
`    // VERIFIED 2026-08-11 against the AP Statistics CED, Effective Fall 2026:\n    // https://apcentral.collegeboard.org/media/pdf/ap-statistics-course-and-exam-description.pdf\n    // and the AP Statistics revisions page for the May 2027 redesign. Section I has\n    // 42 four-option MCQs in 90 minutes, including one 3-question probability set and\n    // one 3-question regression set; calculators are permitted throughout.\n    // College Board publishes unit bands, not exact counts. Midpoints are 25/20/20/15/15\n    // (sum 95); normalizing those midpoints to 42 questions and applying Hamilton\n    // apportionment gives 11/9/9/7/6, with the U4/U5 remainder tie resolved by unit order.`);
fs.writeFileSync(SUBJECTS, subjects);

const tests = `const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { AP_SUBJECTS } = require('../js/subjects');
const { drawExam } = require('../js/draw');
const { loadStatisticsBank } = require('./helpers');

const subject = AP_SUBJECTS.find((s) => s.id === 'ap-statistics');
const bank = loadStatisticsBank();
const TOPICS = {
  U1: Array.from({length:13},(_,i)=>\`1.\${i+1}\`),
  U2: Array.from({length:12},(_,i)=>\`2.\${i+1}\`),
  U3: Array.from({length:15},(_,i)=>\`3.\${i+1}\`),
  U4: Array.from({length:10},(_,i)=>\`4.\${i+1}\`),
  U5: Array.from({length:5},(_,i)=>\`5.\${i+1}\`),
};
const ALLOWED_PRACTICE = ${JSON.stringify(allowedPractice, null, 2)};
const ABSOLUTE = /\\b(always|never|every|only|entirely|unlimited|must|guarantees?)\\b/i;

test('Statistics metadata matches the May 2027 redesign', () => {
  assert.equal(bank.length, 140); assert.equal(subject.releaseStatus, 'draft');
  assert.equal(subject.mcqCount, 42); assert.equal(subject.mcqTimeMinutes, 90);
  assert.deepEqual(subject.sciencePracticeRanges, {'1':[3,4],'2':[9,12],'3':[11,14],'4':[11,14]});
  assert.deepEqual(subject.attributeRanges.statsSetType, {probability:[3,3],regression:[3,3]});
});

test('Statistics uses exactly the 55 CED topics and CED-compatible practice families', () => {
  const seen = new Map(Object.keys(TOPICS).map(u=>[u,new Set()]));
  const ids = new Set();
  for (const q of bank) {
    assert.match(q.id,/^apstats-u[1-5]-\\d{3}$/); assert.ok(!ids.has(q.id)); ids.add(q.id);
    assert.ok(TOPICS[q.unit].includes(q.topicCode), \`\${q.id}: invalid topic \${q.topicCode}\`);
    assert.match(q.skill,/^[1-4]\\.[A-G]$/);
    assert.ok(ALLOWED_PRACTICE[q.topicCode].includes(q.skill[0]), \`\${q.id}: \${q.topicCode} cannot use \${q.skill}\`);
    assert.equal(q.type,'s'); assert.equal(q.o.length,4); assert.equal(q.c.length,1);
    assert.ok(q.e.length>=90, \`\${q.id}: rationale too short\`);
    assert.doesNotMatch(q.e,/This item applies CED Topic|The question asks about a population or process and anticipates variation|The stated reasoning follows directly from the statistical model/i);
    seen.get(q.unit).add(q.topicCode);
  }
  for (const [u,topics] of Object.entries(TOPICS)) assert.deepEqual([...seen.get(u)].sort((a,b)=>parseFloat(a)-parseFloat(b)), topics);
});

test('Statistics variant groups are valid and prevent same-exam near duplicates', () => {
  const groups = new Map();
  for (const q of bank.filter(q=>q.variantGroupId)) (groups.get(q.variantGroupId) ?? groups.set(q.variantGroupId,[]).get(q.variantGroupId)).push(q);
  assert.ok(groups.size>0);
  for (const [id,qs] of groups) {
    assert.ok(qs.length>=2, \`\${id}: singleton variant group\`);
    assert.equal(new Set(qs.map(q=>q.unit)).size,1); assert.equal(new Set(qs.map(q=>q.topicCode)).size,1);
    assert.equal(new Set(qs.map(q=>q.q)).size,qs.length); assert.ok(qs.every(q=>!q.stimulusGroupId));
  }
  for(let i=0;i<500;i++){const d=drawExam(subject,bank);for(const id of groups.keys())assert.ok(d.filter(q=>q.variantGroupId===id).length<=1);}
});

test('Statistics shared stimulus sets, provenance, and visual accessibility are sound', () => {
  const groups = new Map();
  for(const q of bank.filter(q=>q.stimulusGroupId))(groups.get(q.stimulusGroupId)??groups.set(q.stimulusGroupId,[]).get(q.stimulusGroupId)).push(q);
  assert.equal(groups.size,6); const types={probability:0,regression:0};
  for(const [id,qs] of groups){assert.equal(qs.length,3);assert.ok(qs.every(q=>q.stimulus===qs[0].stimulus));assert.match(qs[0].stimulus.source,/Original (synthetic|simulated)/i);types[qs[0].statsSetType]++;if(qs[0].stimulus.image)assert.ok(fs.existsSync(qs[0].stimulus.image));}
  assert.deepEqual(types,{probability:3,regression:3});
  const visual=bank.find(q=>q.stimulus?.image==='assets/ap-statistics-regression-scatter.svg').stimulus;
  assert.ok(visual.alt.length>=60); assert.doesNotMatch(visual.alt,/strong|positive|negative|linear pattern|outlier|unusual|above|below|residual/i);
  assert.doesNotMatch(visual.description,/strong|positive|negative|outlier|unusual|above|below|residual/i);
  const svg=fs.readFileSync(visual.image,'utf8'); assert.doesNotMatch(svg,/positive linear|unusually low|well below/i);
});

test('Statistics answer construction has no project-defined tells', () => {
  const wc=s=>s.trim().split(/\\s+/).length;let unique=0,among=0,cw=0,dw=0;const keys=[0,0,0,0];
  for(const q of bank){keys[q.c[0]]++;const lens=q.o.map(wc),mx=Math.max(...lens),cl=lens[q.c[0]];if(cl===mx)among++;if(cl===mx&&lens.filter(x=>x===mx).length===1)unique++;cw+=cl;lens.forEach((x,i)=>{if(i!==q.c[0])dw+=x});const abs=q.o.filter((_,i)=>i!==q.c[0]).filter(x=>ABSOLUTE.test(x));assert.ok(abs.length<2,\`\${q.id}: stacked absolute-language distractors\`);}
  assert.ok(unique/bank.length<=.25);assert.ok(among/bank.length<=.58);assert.ok(Math.abs(cw/bank.length-dw/(bank.length*3))/(dw/(bank.length*3))<=.12);for(const k of keys)assert.ok(k/bank.length>=.15&&k/bank.length<=.35);
});

test('selected quantitative results independently recompute', () => {
  const ans=f=>{const q=bank.find(q=>q.q.includes(f));assert.ok(q, f);return q.o[q.c[0]]};
  assert.equal(ans('sample of 240 commuters'),'0.40');
  assert.equal(ans('Five delivery times'),'22 minutes');
  assert.equal(ans('Using the 1.5×IQR rule'),'52');
  assert.match(ans('runner\'s time is 68'),/z = −2/);
  assert.equal(ans('fair six-sided die is rolled twice'),'11/36');
  assert.equal(ans('P(A ∩ B) = 0.18'),'0.60');
  assert.equal(ans('X ~ Binomial'),'μ = 20 and σ = √15 ≈ 3.87');
  assert.match(ans('population has proportion p = 0.36'),/0.048/);
  assert.equal(ans('sample proportion is p̂ = 0.58'),'(0.519, 0.641)');
  assert.equal(ans('sample of n = 200 has p̂ = 0.57'),'About 1.98');
  assert.equal(ans('p₁ = 0.40 and p₂ = 0.25'),'0.15');
  assert.equal(ans('p̂₁ = 0.62'),'0.08');
  assert.match(ans('x₁=84'),/147\\/230/);
  assert.equal(ans('row total is 80'),'18');
  assert.match(ans('s1=10,n1=25'),/2.83/);
  assert.equal(ans('observed difference is 6'),'3');
  assert.equal(ans('least-squares line is ŷ=20+1.5x'),'26');
  assert.equal(ans('model predicts y=42'),'−5');
  assert.equal(ans('sx=4, sy=10'),'1.5');
  assert.equal(ans('slope 1.5 and passes through'),'20');
  assert.match(ans('9-mile delivery'),/36.9/);
});

test('every Statistics draw obeys unit, practice, and required-set blueprints',()=>{for(let i=0;i<2000;i++){const d=drawExam(subject,bank);assert.equal(d.length,42);assert.deepEqual(Object.fromEntries(subject.units.map(u=>[u.id,d.filter(q=>q.unit===u.id).length])),{U1:11,U2:9,U3:9,U4:7,U5:6});assert.equal(d.filter(q=>q.statsSetType==='probability').length,3);assert.equal(d.filter(q=>q.statsSetType==='regression').length,3);const p={1:0,2:0,3:0,4:0};d.forEach(q=>p[q.skill[0]]++);for(const [k,[lo,hi]] of Object.entries(subject.sciencePracticeRanges))assert.ok(p[k]>=lo&&p[k]<=hi);}});

test('Statistics retake overlap stays at or below 40%',()=>{let total=0;const n=1500;for(let i=0;i<n;i++){const a=new Set(drawExam(subject,bank).map(q=>q.id));total+=drawExam(subject,bank).filter(q=>a.has(q.id)).length/42;}const avg=total/n;console.log(\`Statistics Monte Carlo overlap: \${(100*avg).toFixed(1)}%\`);assert.ok(avg<=.40);});
`;
fs.writeFileSync(TEST, tests);

console.log('AP Statistics independent-audit repairs applied.');
