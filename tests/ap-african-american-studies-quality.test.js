const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { drawExam, toBlocks } = require('../js/draw.js');

function loadBank() {
  const context = vm.createContext({ window: {} });
  for (const file of [
    'ap-african-american-studies.js',
    'ap-african-american-studies-set-expansion.js',
    'ap-african-american-studies-required-sources-1.js',
    'ap-african-american-studies-required-sources-2.js',
    'ap-african-american-studies-quality-diversity-1.js',
    'ap-african-american-studies-quality-explanations-1.js',
    'ap-african-american-studies-quantitative-1.js',
    'ap-african-american-studies-visual-1.js',
  ]) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, `../data/${file}`), 'utf8'), context, { filename: file });
  }
  return context.window.QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES;
}

const bank = loadBank();
const subject = {
  mcqCount: 60,
  units: [
    { id:'U1', examWeight:0.225 },
    { id:'U2', examWeight:0.325 },
    { id:'U3', examWeight:0.225 },
    { id:'U4', examWeight:0.225 },
  ],
  stimulusSetRange:[15,20],
};

function words(s) {
  return String(s).trim().split(/\s+/).filter(Boolean).length;
}
function seeded(seed) {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

test('effective bank retains exact source inventory and approximately-half required-source mix', () => {
  const groups = toBlocks(bank);
  assert.equal(bank.length, 238);
  assert.equal(groups.length, 74);
  const required = groups.filter((g) => g[0].stimulus.requiredSource).length;
  assert.ok(required >= 35 && required <= 40, `required-source group count ${required} is not approximately half of 74`);
  assert.equal(required, 39, 'reviewed effective bank should currently contain 39 required-source groups');
  assert.equal(groups.filter((g) => g[0].stimulus.type === 'quantitative').length, 4);
  assert.equal(groups.filter((g) => g[0].stimulus.type === 'visual').length, 4);
});

test('answer construction stays inside project length-bias limits on effective bank', () => {
  let uniqueLongest = 0;
  let amongLongest = 0;
  let correctWords = 0;
  let distractorWords = 0;
  let distractorCount = 0;

  for (const q of bank) {
    const lens = q.o.map(words);
    const correct = q.c[0];
    const max = Math.max(...lens);
    if (lens[correct] === max) {
      amongLongest++;
      if (lens.filter((n) => n === max).length === 1) uniqueLongest++;
    }
    correctWords += lens[correct];
    q.o.forEach((o, i) => {
      if (i !== correct) {
        distractorWords += words(o);
        distractorCount++;
      }
    });
  }

  const uniqueRate = uniqueLongest / bank.length;
  const amongRate = amongLongest / bank.length;
  const correctMean = correctWords / bank.length;
  const distractorMean = distractorWords / distractorCount;
  const ratioDelta = Math.abs(correctMean - distractorMean) / distractorMean;

  assert.ok(uniqueRate <= 0.25, `uniquely-longest correct rate ${(uniqueRate * 100).toFixed(1)}% exceeds 25%`);
  assert.ok(amongRate <= 0.58, `among-longest correct rate ${(amongRate * 100).toFixed(1)}% exceeds 58%`);
  assert.ok(ratioDelta <= 0.12, `correct/distractor mean length differs by ${(ratioDelta * 100).toFixed(1)}%`);
});

test('stacked absolute-language distractors are rare on effective bank', () => {
  const absolute = /\b(always|never|every|only|entirely|completely|all|none|impossible|identical)\b/i;
  const offenders = [];
  for (const q of bank) {
    const correct = q.c[0];
    const count = q.o.filter((o, i) => i !== correct && absolute.test(o)).length;
    if (count >= 2) offenders.push(q.id);
  }
  assert.ok(offenders.length <= Math.ceil(bank.length * 0.02), `too many stacked absolute-language items: ${offenders.join(', ')}`);
});

test('5,000 weighted draws remain valid whole-set 60-question forms', () => {
  for (let i = 0; i < 5000; i++) {
    const form = drawExam(subject, bank, seeded(200000 + i));
    assert.equal(form.length, 60);
    const groupCounts = new Map();
    const unitCounts = { U1:0, U2:0, U3:0, U4:0 };
    for (const q of form) {
      groupCounts.set(q.stimulusGroupId, (groupCounts.get(q.stimulusGroupId) || 0) + 1);
      unitCounts[q.unit]++;
    }
    assert.ok(groupCounts.size >= 15 && groupCounts.size <= 20);
    for (const [gid, count] of groupCounts) {
      const fullSize = bank.filter((q) => q.stimulusGroupId === gid).length;
      assert.equal(count, fullSize, `${gid}: source set split in draw ${i}`);
    }
    assert.ok(unitCounts.U1 >= 12 && unitCounts.U1 <= 15);
    assert.ok(unitCounts.U2 >= 18 && unitCounts.U2 <= 21);
    assert.ok(unitCounts.U3 >= 12 && unitCounts.U3 <= 15);
    assert.ok(unitCounts.U4 >= 12 && unitCounts.U4 <= 15);
  }
});

test('5,000 independent retake pairs average no more than 40% shared questions', () => {
  let overlapTotal = 0;
  const trials = 5000;
  for (let i = 0; i < trials; i++) {
    const first = drawExam(subject, bank, seeded(400000 + i * 2));
    const second = drawExam(subject, bank, seeded(400001 + i * 2));
    const ids = new Set(first.map((q) => q.id));
    overlapTotal += second.filter((q) => ids.has(q.id)).length / 60;
  }
  const average = overlapTotal / trials;
  assert.ok(average <= 0.40, `average retake overlap ${(average * 100).toFixed(1)}% exceeds 40%`);
});
