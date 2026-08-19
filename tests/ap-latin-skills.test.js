const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.join(__dirname, '..');
const FILES = [
  'data/ap-latin.js',
  'data/ap-latin-sight-sets.js',
  'data/ap-latin-syllabus-short.js',
  'data/ap-latin-long-sets-a.js',
  'data/ap-latin-long-aen2.js',
  'data/ap-latin-long-aen4.js',
  'data/ap-latin-long-aen6.js',
  'data/ap-latin-skill-fixes.js',
];

function load() {
  const context = {};
  context.window = context;
  context.globalThis = context;
  vm.createContext(context);
  FILES.forEach((file) => vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), context));
  return Array.from(context.QUESTIONS_AP_LATIN);
}

test('Latin exact skill tags stay within the revised framework and cover every skill family', () => {
  const bank = load();
  const allowed = new Set(['1A','1B','1C','1D','2A','2B','3A','3B']);
  const seen = new Set(bank.map((q) => q.skill));
  bank.forEach((q) => assert.ok(allowed.has(q.skill), `${q.id}: ${q.skill}`));
  ['1A','1B','1C','2A','2B','3A','3B'].forEach((skill) => assert.ok(seen.has(skill), `missing ${skill}`));
});

test('Latin evidence-analysis repairs require choosing passage evidence rather than restating a conclusion', () => {
  const bank = load();
  const byId = new Map(bank.map((q) => [q.id, q]));
  for (const id of ['aplatin-long-aen1-09','aplatin-long-pliny-ghost-10','aplatin-long-aen4-09','aplatin-long-aen6-09']) {
    const q = byId.get(id);
    assert.ok(q, id);
    assert.equal(q.skill, '3B');
    assert.match(q.q, /which (detail|evidence|repeated phrase)/i);
    assert.ok(/[a-z].*[a-z]/i.test(q.o[q.c[0]]));
    assert.ok(q.e.length >= 100);
  }
});

test('Latin grammar questions are tagged Read-and-Comprehend grammar rather than analysis', () => {
  const bank = load();
  const grammar = bank.filter((q) => /subjunctive|genitive|dative|ablative|infinitive|participle|agrees|subject of|clause/i.test(q.q));
  assert.ok(grammar.length >= 25);
  grammar.forEach((q) => assert.equal(q.skill, '1B', `${q.id}: ${q.q}`));
});
