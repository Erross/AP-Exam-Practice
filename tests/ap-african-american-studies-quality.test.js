const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { drawExam } = require('../js/draw.js');

function loadBank() {
  const context = vm.createContext({ window: {} });
  for (const file of [
    'ap-african-american-studies.js',
    'ap-african-american-studies-set-expansion.js',
    'ap-african-american-studies-required-sources-1.js',
    'ap-african-american-studies-quality-diversity-1.js',
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

test('answer construction stays inside project length-bias limits', () => {
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

test('stacked absolute-language distractors are rare', () => {
  const absolute = /\b(always|never|every|only|entirely|completely|all|none|impossible|identical)\b/i;
  const offenders = [];
  for (const q of bank) {
    const correct = q.c[0];
    const count = q.o.filter((o, i) => i !== correct && absolute.test(o)).length;
    if (count >= 2) offenders.push(q.id);
  }
  assert.ok(offenders.length <= Math.ceil(bank.length * 0.02), `too many stacked absolute-language items: ${offenders.join(', ')}`);
});

test('1,000 independent retake pairs average no more than 40% shared questions', () => {
  let overlapTotal = 0;
  const trials = 1000;
  for (let i = 0; i < trials; i++) {
    const first = drawExam(subject, bank, seeded(10000 + i * 2));
    const second = drawExam(subject, bank, seeded(10001 + i * 2));
    const ids = new Set(first.map((q) => q.id));
    overlapTotal += second.filter((q) => ids.has(q.id)).length / 60;
  }
  const average = overlapTotal / trials;
  assert.ok(average <= 0.40, `average retake overlap ${(average * 100).toFixed(1)}% exceeds 40%`);
});
