const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.join(__dirname, '..');
const PRE_HARDENING = [
  'data/ap-latin.js',
  'data/ap-latin-sight-sets.js',
  'data/ap-latin-syllabus-short.js',
  'data/ap-latin-long-sets-a.js',
  'data/ap-latin-long-aen2.js',
  'data/ap-latin-long-aen4.js',
  'data/ap-latin-long-aen6.js',
  'data/ap-latin-skill-fixes.js',
];

function load(files) {
  const context = {};
  context.window = context;
  context.globalThis = context;
  vm.createContext(context);
  files.forEach((file) => vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), context));
  return Array.from(context.QUESTIONS_AP_LATIN);
}

function words(value) {
  return String(value || '').trim().split(/\s+/).filter(Boolean).length;
}

function metrics(bank) {
  let unique = 0;
  let correct = 0;
  let distractor = 0;
  const bySkill = {};
  for (const q of bank) {
    const lengths = q.o.map(words);
    const key = q.c[0];
    const max = Math.max(...lengths);
    const isUnique = lengths[key] === max && lengths.filter((n) => n === max).length === 1;
    unique += isUnique ? 1 : 0;
    correct += lengths[key];
    lengths.forEach((n, index) => { if (index !== key) distractor += n; });
    const bucket = bySkill[q.skill] || (bySkill[q.skill] = { n:0, unique:0, correct:0, distractor:0 });
    bucket.n++;
    bucket.unique += isUnique ? 1 : 0;
    bucket.correct += lengths[key];
    lengths.forEach((n, index) => { if (index !== key) bucket.distractor += n; });
  }
  return {
    unique: unique / bank.length,
    correct: correct / bank.length,
    distractor: distractor / (bank.length * 3),
    bySkill: Object.fromEntries(Object.entries(bySkill).map(([skill,b]) => [skill, {
      n:b.n,
      unique:Number((b.unique/b.n).toFixed(3)),
      correct:Number((b.correct/b.n).toFixed(2)),
      distractor:Number((b.distractor/(b.n*3)).toFixed(2)),
    }]))
  };
}

test('Latin clean-room audit exposes pre-hardening length pressure by exact skill', () => {
  const bank = load(PRE_HARDENING);
  const result = metrics(bank);
  console.log('AP Latin pre-hardening metrics', result);
  assert.equal(bank.length, 166);
});

test('Latin shipping answer layers may not contain synthetic qualifier-tail machinery', () => {
  const source = fs.readFileSync(path.join(ROOT, 'data/ap-latin-answer-hardening.js'), 'utf8');
  assert.doesNotMatch(source, /tails\s*=|immediate context|surrounding syntax|passage’s thematic logic|textual support for that interpretation/i);
});
