const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { drawExam, toBlocks } = require('../js/draw.js');

function loadBank() {
  const context = vm.createContext({ window: {} });
  const src = fs.readFileSync(path.join(__dirname, '../data/ap-african-american-studies.js'), 'utf8');
  vm.runInContext(src, context, { filename: 'ap-african-american-studies.js' });
  return context.window.QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES;
}

const bank = loadBank();
const expectedTopicCounts = { U1: 11, U2: 24, U3: 18, U4: 21 };

function seeded(seed) {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

test('draft bank covers the exact 74-topic CED inventory once by source set', () => {
  assert.equal(bank.length, 222);
  const groups = toBlocks(bank);
  assert.equal(groups.length, 74);
  assert.ok(groups.every((g) => g.length === 3));

  const topicGroups = new Map();
  for (const group of groups) {
    const codes = new Set(group.map((q) => q.topicCode));
    const units = new Set(group.map((q) => q.unit));
    assert.equal(codes.size, 1);
    assert.equal(units.size, 1);
    const code = group[0].topicCode;
    assert.match(code, /^[1-4]\.\d+$/);
    assert.ok(!topicGroups.has(code), `duplicate source set for ${code}`);
    topicGroups.set(code, group);
    assert.deepEqual(group.map((q) => q.sequence), [1, 2, 3]);
    assert.ok(group.every((q) => q.stimulusGroupId === group[0].stimulusGroupId));
    assert.ok(group.every((q) => q.stimulus === group[0].stimulus));
  }
  assert.equal(topicGroups.size, 74);

  const counts = {};
  for (const group of groups) counts[group[0].unit] = (counts[group[0].unit] || 0) + 1;
  assert.deepEqual(counts, expectedTopicCounts);
});

test('all items are single-select, sourced, explained, and carry current skill families', () => {
  const allowedSkills = new Set(['1.D', '2.A', '3.B']);
  for (const q of bank) {
    assert.equal(q.type, 's');
    assert.equal(q.o.length, 4);
    assert.equal(q.c.length, 1);
    assert.ok(q.c[0] >= 0 && q.c[0] < 4);
    assert.ok(q.id && q.topicCode && q.unit && q.stimulusGroupId);
    assert.ok(allowedSkills.has(q.skill), `${q.id}: unexpected skill ${q.skill}`);
    assert.ok(q.e.length >= 90, `${q.id}: explanation too short`);
    assert.match(q.stimulus.source, /Original synthetic source/);
    assert.equal(q.stimulus.requiredSource, false);
  }
});

test('raw answer positions are deliberately balanced', () => {
  const counts = [0, 0, 0, 0];
  bank.forEach((q) => counts[q.c[0]]++);
  counts.forEach((n) => assert.ok(n >= 50 && n <= 62, `raw key count ${n} is imbalanced`));
});

test('structural source-set draws produce exact 60-question forms without splitting groups', () => {
  const subject = { mcqCount: 60, units: [] };
  for (let i = 1; i <= 500; i++) {
    const form = drawExam(subject, bank, seeded(i));
    assert.equal(form.length, 60);
    const groupCounts = new Map();
    form.forEach((q) => groupCounts.set(q.stimulusGroupId, (groupCounts.get(q.stimulusGroupId) || 0) + 1));
    assert.equal(groupCounts.size, 20);
    assert.ok([...groupCounts.values()].every((n) => n === 3));
  }
});

test('the draft remains explicitly blocked from release on required-source realism', () => {
  assert.equal(bank.filter((q) => q.stimulus && q.stimulus.requiredSource).length, 0);
  assert.ok(bank.every((q) => q.stimulus && q.stimulus.requiredSource === false));
});
