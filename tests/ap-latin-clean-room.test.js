const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.join(__dirname, '..');
const BASE = [
  'data/ap-latin.js',
  'data/ap-latin-sight-sets.js',
  'data/ap-latin-syllabus-short.js',
  'data/ap-latin-long-sets-a.js',
  'data/ap-latin-long-aen2.js',
  'data/ap-latin-long-aen4.js',
  'data/ap-latin-long-aen6.js',
  'data/ap-latin-skill-fixes.js',
];
const SHIPPING = BASE.concat('data/ap-latin-answer-curation.js');

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
  let unique = 0, correct = 0, distractor = 0;
  const offenders = [];
  for (const q of bank) {
    const lengths = q.o.map(words);
    const key = q.c[0];
    const max = Math.max(...lengths);
    const maxDistractor = Math.max(...lengths.filter((_, i) => i !== key));
    const isUnique = lengths[key] === max && lengths.filter((n) => n === max).length === 1;
    if (isUnique) offenders.push({ id:q.id, skill:q.skill, gap:lengths[key]-maxDistractor, answer:q.o[key] });
    unique += isUnique ? 1 : 0;
    correct += lengths[key];
    lengths.forEach((n,i) => { if (i !== key) distractor += n; });
  }
  offenders.sort((a,b) => b.gap-a.gap || a.id.localeCompare(b.id));
  return { unique:unique/bank.length, correct:correct/bank.length, distractor:distractor/(bank.length*3), offenders };
}

test('Latin substantive curation removes the systemic answer-length cue', () => {
  const bank = load(SHIPPING);
  const result = metrics(bank);
  console.log('AP Latin curated metrics', { unique:result.unique, correct:result.correct, distractor:result.distractor });
  console.log('AP Latin remaining unique-longest offenders', result.offenders);
  assert.equal(bank.length, 166);
  assert.ok(result.unique <= 0.25, `unique-longest ${(100*result.unique).toFixed(1)}%`);
  assert.ok(Math.abs(result.correct-result.distractor)/result.distractor <= 0.12,
    `mean-word gap ${result.correct.toFixed(2)}/${result.distractor.toFixed(2)}`);
});

test('Latin shipping answer curation contains no synthetic qualifier-tail machinery', () => {
  const source = fs.readFileSync(path.join(ROOT, 'data/ap-latin-answer-curation.js'), 'utf8');
  assert.doesNotMatch(source, /tails\s*=|immediate context|surrounding syntax|passage’s thematic logic|textual support for that interpretation/i);
  assert.doesNotMatch(source, /while maintaining|within this passage|as the form functions here/i);
});
