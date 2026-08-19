const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { drawExam, toBlocks } = require('../js/draw.js');

function loadBank() {
  const root = path.join(__dirname, '..');
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const scripts = [...html.matchAll(/<script src="(data\/ap-european-history[^\"]*\.js)"><\/script>/g)].map((m) => m[1]);
  assert.equal(scripts.length, 10, 'quality audit must load the base plus all nine AP Euro unit layers');
  const context = vm.createContext({ window: {} });
  for (const script of scripts) vm.runInContext(fs.readFileSync(path.join(root, script), 'utf8'), context, { filename: script });
  return context.window.QUESTIONS_AP_EUROPEAN_HISTORY;
}

const bank = loadBank();
const subject = require('../js/subjects.js').AP_SUBJECTS.find((s) => s.id === 'ap-european-history');

function words(s) { return String(s).trim().split(/\s+/).filter(Boolean).length; }
function seeded(seed) {
  let state = seed >>> 0;
  return () => { state = (1664525 * state + 1013904223) >>> 0; return state / 0x100000000; };
}

test('effective AP Euro bank covers all 88 topics as intact 3-4 question source sets', () => {
  const groups = toBlocks(bank);
  assert.equal(bank.length, 269);
  assert.equal(groups.length, 88);
  assert.equal(new Set(bank.map((q) => q.topicCode)).size, 88);
  assert.deepEqual([...new Set(bank.map((q) => q.unit))].sort(), ['U1','U2','U3','U4','U5','U6','U7','U8','U9']);
  for (const group of groups) {
    assert.ok(group.length === 3 || group.length === 4, `${group[0].stimulusGroupId} has ${group.length} questions`);
    assert.ok(group[0].stimulus && group[0].stimulus.title && group[0].stimulus.source, `${group[0].stimulusGroupId} lacks a usable source`);
    for (let i = 0; i < group.length; i++) assert.equal(group[i].sequence, i + 1);
  }
  assert.equal(groups.filter((g) => g.length === 4).length, 5);
  assert.equal(groups.filter((g) => g[0].stimulus.type === 'quantitative').length, 12);
  assert.equal(groups.filter((g) => g[0].stimulus.type === 'visual').length, 5);
});

test('AP Euro MCQs assess only official MCQ skills 1-5', () => {
  const skills = new Set(bank.map((q) => String(q.skill)));
  assert.deepEqual([...skills].sort(), ['1','2','3','4','5']);
  assert.equal(bank.filter((q) => String(q.skill) === '6').length, 0);
});

test('schema, option keys, rationale depth, and synthetic-source labeling are release-grade', () => {
  const ids = new Set();
  for (const q of bank) {
    assert.ok(q.id && !ids.has(q.id), `duplicate/missing id ${q.id}`); ids.add(q.id);
    assert.equal(q.type, 's');
    assert.equal(q.o.length, 4, `${q.id}: expected four options`);
    assert.equal(q.c.length, 1, `${q.id}: expected one keyed answer`);
    assert.ok(Number.isInteger(q.c[0]) && q.c[0] >= 0 && q.c[0] < 4, `${q.id}: invalid key`);
    assert.ok(q.e.length >= 90, `${q.id}: rationale is only ${q.e.length} chars`);
    assert.match(q.stimulus.source, /Original|Synthetic|simulated/i, `${q.id}: source must be clearly synthetic/original`);
  }
});

test('answer construction stays inside project length-bias limits', () => {
  let uniqueLongest = 0, amongLongest = 0, correctWords = 0, distractorWords = 0, distractorCount = 0;
  const uniqueIds = [];
  const keyCounts = [0,0,0,0];
  for (const q of bank) {
    const lens = q.o.map(words);
    const correct = q.c[0]; keyCounts[correct]++;
    const max = Math.max(...lens);
    if (lens[correct] === max) {
      amongLongest++;
      if (lens.filter((n) => n === max).length === 1) { uniqueLongest++; uniqueIds.push(q.id); }
    }
    correctWords += lens[correct];
    q.o.forEach((o, i) => { if (i !== correct) { distractorWords += words(o); distractorCount++; } });
  }
  const uniqueRate = uniqueLongest / bank.length;
  const amongRate = amongLongest / bank.length;
  const correctMean = correctWords / bank.length;
  const distractorMean = distractorWords / distractorCount;
  const delta = Math.abs(correctMean - distractorMean) / distractorMean;
  console.log('AP Euro answer metrics', { uniqueLongest:`${(uniqueRate*100).toFixed(1)}%`, amongLongest:`${(amongRate*100).toFixed(1)}%`, correctWords:correctMean.toFixed(2), distractorWords:distractorMean.toFixed(2), keyCounts, uniqueIds });
  assert.ok(uniqueRate <= 0.25, `unique-longest rate ${(uniqueRate*100).toFixed(1)}% exceeds 25%`);
  assert.ok(amongRate <= 0.58, `among-longest rate ${(amongRate*100).toFixed(1)}% exceeds 58%`);
  assert.ok(delta <= 0.12, `correct/distractor mean length differs by ${(delta*100).toFixed(1)}%`);
  for (const [i, n] of keyCounts.entries()) assert.ok(n / bank.length >= 0.15 && n / bank.length <= 0.35, `raw key ${i} share ${(n/bank.length*100).toFixed(1)}% outside 15-35%`);
});

test('stacked absolute-language distractors are rare', () => {
  const absolute = /\b(always|never|every|only|entirely|completely|all|none|impossible|identical|universal|universally)\b/i;
  const offenders = [];
  for (const q of bank) {
    const correct = q.c[0];
    const count = q.o.filter((o, i) => i !== correct && absolute.test(o)).length;
    if (count >= 2) offenders.push(q.id);
  }
  console.log('AP Euro stacked absolute-language items', offenders);
  assert.ok(offenders.length <= Math.ceil(bank.length * 0.02), `too many stacked absolute-language items: ${offenders.join(', ')}`);
});

test('5,000 draws produce exact whole-set 55-question forms and unit blueprint', () => {
  for (let i = 0; i < 5000; i++) {
    const form = drawExam(subject, bank, seeded(510000 + i));
    assert.equal(form.length, 55, `draw ${i}: wrong form length`);
    const counts = Object.fromEntries(subject.units.map((u) => [u.id, 0]));
    const groups = new Map();
    for (const q of form) { counts[q.unit]++; groups.set(q.stimulusGroupId, (groups.get(q.stimulusGroupId) || 0) + 1); }
    for (let u = 1; u <= 8; u++) assert.equal(counts[`U${u}`], 6, `draw ${i}: U${u}`);
    assert.equal(counts.U9, 7, `draw ${i}: U9`);
    assert.equal(groups.size, 18, `draw ${i}: expected 18 intact source sets`);
    for (const [gid, count] of groups) assert.equal(count, bank.filter((q) => q.stimulusGroupId === gid).length, `${gid} split in draw ${i}`);
  }
});

test('5,000 independent retake pairs average no more than 40% shared questions', () => {
  let total = 0;
  for (let i = 0; i < 5000; i++) {
    const first = drawExam(subject, bank, seeded(710000 + i * 2));
    const second = drawExam(subject, bank, seeded(710001 + i * 2));
    const ids = new Set(first.map((q) => q.id));
    total += second.filter((q) => ids.has(q.id)).length / 55;
  }
  const avg = total / 5000;
  console.log(`AP Euro Monte Carlo overlap: ${(avg * 100).toFixed(1)}%`);
  assert.ok(avg <= 0.40, `average retake overlap ${(avg*100).toFixed(1)}% exceeds 40%`);
});
