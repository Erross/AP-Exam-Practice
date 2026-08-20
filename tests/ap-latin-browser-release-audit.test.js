const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { AP_SUBJECTS } = require('../js/subjects.js');
const { drawExam } = require('../js/set-blueprint-draw.js');

const LATIN_SCRIPTS = [
  'data/ap-latin.js',
  'data/ap-latin-sight-sets.js',
  'data/ap-latin-syllabus-short.js',
  'data/ap-latin-long-sets-a.js',
  'data/ap-latin-long-aen2.js',
  'data/ap-latin-long-aen4.js',
  'data/ap-latin-long-aen6.js',
  'data/ap-latin-skill-fixes.js',
  'data/ap-latin-answer-curation.js',
];

function loadBrowserEffectiveLatin() {
  const subjects = structuredClone(AP_SUBJECTS);
  const context = { AP_SUBJECTS: subjects };
  context.window = context;
  context.globalThis = context;
  vm.createContext(context);
  vm.runInContext(fs.readFileSync('js/ap-latin-metadata.js', 'utf8'), context, { filename: 'js/ap-latin-metadata.js' });
  LATIN_SCRIPTS.forEach((source) => vm.runInContext(fs.readFileSync(source, 'utf8'), context, { filename: source }));
  return {
    subject: subjects.find((candidate) => candidate.id === 'ap-latin'),
    bank: Array.from(context.QUESTIONS_AP_LATIN),
  };
}

function wordCount(value) {
  return String(value || '').trim().split(/\s+/).filter(Boolean).length;
}

test('AP Latin browser wiring exposes metadata, scalable drawer, and every authored bank layer in canonical order', () => {
  const html = fs.readFileSync('index.html', 'utf8');
  const scriptSources = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map((match) => match[1]);
  assert.ok(scriptSources.indexOf('js/ap-latin-metadata.js') > scriptSources.indexOf('js/subjects.js'));
  assert.ok(scriptSources.indexOf('js/set-blueprint-draw.js') > scriptSources.indexOf('js/draw.js'));
  assert.deepEqual(scriptSources.filter((source) => source.startsWith('data/ap-latin')), LATIN_SCRIPTS);
});

test('AP Latin browser-effective bank passes content-cue and 5000/5000 draw gates', () => {
  const { subject, bank } = loadBrowserEffectiveLatin();
  assert.equal(subject.mcqCount, 52);
  assert.equal(subject.mcqTimeMinutes, 65);
  assert.equal(subject.releaseStatus, 'draft');
  assert.equal(bank.length, 166);

  let uniqueLongest = 0;
  let amongLongest = 0;
  let correctWords = 0;
  let distractorWords = 0;
  const keys = [0, 0, 0, 0];
  bank.forEach((q) => {
    const lengths = q.o.map(wordCount);
    const key = q.c[0];
    const max = Math.max(...lengths);
    const maxCount = lengths.filter((n) => n === max).length;
    if (lengths[key] === max && maxCount === 1) uniqueLongest++;
    if (lengths[key] === max && maxCount < 4) amongLongest++;
    correctWords += lengths[key];
    lengths.forEach((n, index) => { if (index !== key) distractorWords += n; });
    keys[key]++;
  });
  const uniqueShare = uniqueLongest / bank.length;
  const amongShare = amongLongest / bank.length;
  const correctAverage = correctWords / bank.length;
  const distractorAverage = distractorWords / (bank.length * 3);
  assert.ok(uniqueShare <= 0.25);
  assert.ok(amongShare <= 0.58);
  assert.ok(Math.abs(correctAverage - distractorAverage) / distractorAverage <= 0.12);
  keys.forEach((count) => assert.ok(count / bank.length >= 0.15 && count / bank.length <= 0.35));

  for (let i = 0; i < 5000; i++) {
    const drawn = drawExam(subject, bank);
    assert.equal(drawn.length, 52, `draw ${i + 1}`);
    assert.equal(new Set(drawn.map((q) => q.id)).size, 52, `draw ${i + 1} duplicate`);
    const counts = drawn.reduce((acc, q) => {
      acc[q.setType] = (acc[q.setType] || 0) + (q.sequence === 1 ? 1 : 0);
      return acc;
    }, {});
    assert.equal(drawn.filter((q) => q.setType === 'discrete-sight').length, 20, `draw ${i + 1} discrete`);
    assert.equal(counts['short-sight'], 2, `draw ${i + 1} short sight sets`);
    assert.equal(counts['short-syllabus'], 2, `draw ${i + 1} short syllabus sets`);
    assert.equal(counts['long-syllabus'], 2, `draw ${i + 1} long syllabus sets`);
  }

  let overlap = 0;
  for (let i = 0; i < 5000; i++) {
    const first = drawExam(subject, bank);
    const second = drawExam(subject, bank);
    const firstIds = new Set(first.map((q) => q.id));
    overlap += second.filter((q) => firstIds.has(q.id)).length / 52;
  }
  overlap /= 5000;
  console.log('AP Latin browser-effective release metrics', {
    uniqueLongest: `${(uniqueShare * 100).toFixed(1)}%`,
    amongLongest: `${(amongShare * 100).toFixed(1)}%`,
    correctWords: correctAverage.toFixed(2),
    distractorWords: distractorAverage.toFixed(2),
    keys,
    overlap: `${(overlap * 100).toFixed(1)}%`,
  });
  assert.ok(overlap <= 0.40, `retake overlap ${(overlap * 100).toFixed(1)}% exceeds 40%`);
});
