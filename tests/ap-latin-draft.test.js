const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { AP_SUBJECTS } = require('../js/subjects.js');
const { drawExam } = require('../js/set-blueprint-draw.js');

const ROOT = path.join(__dirname, '..');
const DATA = [
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

function loadLatin() {
  const subjects = structuredClone(AP_SUBJECTS);
  const context = { AP_SUBJECTS: subjects };
  context.window = context;
  context.globalThis = context;
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'js/ap-latin-metadata.js'), 'utf8'), context);
  for (const file of DATA) vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), context);
  return { subject: subjects.find((s) => s.id === 'ap-latin'), bank: Array.from(context.QUESTIONS_AP_LATIN) };
}

function groups(bank) {
  const map = new Map();
  for (const q of bank) {
    if (!map.has(q.stimulusGroupId)) map.set(q.stimulusGroupId, []);
    map.get(q.stimulusGroupId).push(q);
  }
  return map;
}

function words(text) { return String(text).trim().split(/\s+/).filter(Boolean).length; }
function mulberry32(seed) {
  return function () {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

const EXPECTED_TOPICS = [
  '1.1','1.2','1.3','1.4','2.1','2.2','2.3','2.4','2.5','3.1','3.2','3.3','3.4','3.5','3.6',
  '4.1','4.2','4.3','4.4','4.5','4.6','5.1','5.2','5.3','5.4','5.5','5.6','5.7','6.1','6.2'
];

test('Latin draft bank has the intended 166-question alternate inventory', () => {
  const { bank } = loadLatin();
  assert.equal(bank.length, 166);
  assert.equal(new Set(bank.map((q) => q.id)).size, 166);
  const byType = Object.groupBy(bank, (q) => q.setType);
  assert.equal(byType['discrete-sight'].length, 58);
  assert.equal(byType['short-sight'].length, 24);
  assert.equal(byType['short-syllabus'].length, 24);
  assert.equal(byType['long-syllabus'].length, 60);
  const g = groups(bank);
  assert.equal([...g.values()].filter((x) => x[0].setType === 'discrete-sight').length, 58);
  assert.ok([...g.values()].filter((x) => x[0].setType === 'discrete-sight').every((x) => x.length === 1));
  assert.equal([...g.values()].filter((x) => x[0].setType === 'short-sight').length, 8);
  assert.ok([...g.values()].filter((x) => x[0].setType === 'short-sight').every((x) => x.length === 3));
  assert.equal([...g.values()].filter((x) => x[0].setType === 'short-syllabus').length, 8);
  assert.ok([...g.values()].filter((x) => x[0].setType === 'short-syllabus').every((x) => x.length === 3));
  assert.equal([...g.values()].filter((x) => x[0].setType === 'long-syllabus').length, 6);
  assert.ok([...g.values()].filter((x) => x[0].setType === 'long-syllabus').every((x) => x.length === 10));
});

test('Latin draft covers the exact 30-topic revised Course-at-a-Glance inventory', () => {
  const { bank } = loadLatin();
  const actual = [...new Set(bank.map((q) => q.topicCode))].sort((a,b) => a.localeCompare(b, undefined, { numeric:true }));
  assert.deepEqual(actual, EXPECTED_TOPICS);
});

test('Latin schema, sources, keys, and rationales are structurally release-grade', () => {
  const { bank } = loadLatin();
  for (const q of bank) {
    assert.equal(q.type, 's', `${q.id}: type`);
    assert.equal(q.o.length, 4, `${q.id}: option count`);
    assert.equal(new Set(q.o).size, 4, `${q.id}: duplicate options`);
    assert.equal(q.c.length, 1, `${q.id}: correct count`);
    assert.ok(Number.isInteger(q.c[0]) && q.c[0] >= 0 && q.c[0] < 4, `${q.id}: key`);
    assert.ok(q.stimulusGroupId, `${q.id}: group id`);
    assert.ok(q.stimulus && q.stimulus.text && q.stimulus.source, `${q.id}: stimulus provenance`);
    assert.ok(String(q.e).length >= 75, `${q.id}: rationale too shallow (${String(q.e).length})`);
  }
});

test('Latin answer construction stays within project cue limits without qualifier padding', () => {
  const { bank } = loadLatin();
  let uniqueLongest = 0, correctWords = 0, distractorWords = 0, distractorCount = 0;
  const keys = [0,0,0,0];
  for (const q of bank) {
    const lengths = q.o.map(words);
    const max = Math.max(...lengths);
    if (lengths.filter((n) => n === max).length === 1 && lengths[q.c[0]] === max) uniqueLongest++;
    keys[q.c[0]]++;
    correctWords += lengths[q.c[0]];
    q.o.forEach((_, i) => { if (i !== q.c[0]) { distractorWords += lengths[i]; distractorCount++; } });
  }
  const uniqueRate = uniqueLongest / bank.length;
  const correctMean = correctWords / bank.length;
  const distractorMean = distractorWords / distractorCount;
  console.log('AP Latin answer metrics', { uniqueLongest: `${(100*uniqueRate).toFixed(1)}%`, correctWords: correctMean.toFixed(2), distractorWords: distractorMean.toFixed(2), keys });
  assert.ok(uniqueRate <= 0.25, `unique-longest ${(100*uniqueRate).toFixed(1)}%`);
  assert.ok(Math.abs(correctMean - distractorMean) / distractorMean <= 0.12, `mean-word gap ${correctMean.toFixed(2)}/${distractorMean.toFixed(2)}`);
  keys.forEach((count, i) => assert.ok(count / bank.length >= 0.15 && count / bank.length <= 0.35, `key ${i} count ${count}`));
});

test('1,000 Latin draft draws reproduce the exact 20 + 2x3 + 2x3 + 2x10 Section I structure', () => {
  const { subject, bank } = loadLatin();
  const rng = mulberry32(20260819);
  for (let i = 0; i < 1000; i++) {
    const exam = drawExam(subject, bank, rng);
    assert.equal(exam.length, 52);
    const selected = [...groups(exam).values()];
    assert.equal(selected.filter((x) => x[0].setType === 'discrete-sight').length, 20);
    assert.equal(selected.filter((x) => x[0].setType === 'short-sight').length, 2);
    assert.ok(selected.filter((x) => x[0].setType === 'short-sight').every((x) => x.length === 3));
    assert.equal(selected.filter((x) => x[0].setType === 'short-syllabus').length, 2);
    assert.ok(selected.filter((x) => x[0].setType === 'short-syllabus').every((x) => x.length === 3));
    assert.equal(selected.filter((x) => x[0].setType === 'long-syllabus').length, 2);
    assert.ok(selected.filter((x) => x[0].setType === 'long-syllabus').every((x) => x.length === 10));
  }
});

test('1,000 independent Latin draft retake pairs average no more than 40% shared questions', () => {
  const { subject, bank } = loadLatin();
  const rng = mulberry32(8675309);
  let shared = 0;
  for (let i = 0; i < 1000; i++) {
    const first = drawExam(subject, bank, rng);
    const second = drawExam(subject, bank, rng);
    const ids = new Set(first.map((q) => q.id));
    shared += second.filter((q) => ids.has(q.id)).length;
  }
  const overlap = shared / (1000 * 52);
  console.log(`AP Latin draft retake overlap ${(100 * overlap).toFixed(1)}%`);
  assert.ok(overlap <= 0.40, `overlap ${(100 * overlap).toFixed(1)}%`);
});
