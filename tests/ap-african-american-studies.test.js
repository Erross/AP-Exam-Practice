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
    'ap-african-american-studies-quality-diversity-1.js',
    'ap-african-american-studies-quality-explanations-1.js',
    'ap-african-american-studies-quantitative-1.js',
    'ap-african-american-studies-visual-1.js',
    'ap-african-american-studies-required-sources-2.js',
  ]) {
    const src = fs.readFileSync(path.join(__dirname, `../data/${file}`), 'utf8');
    vm.runInContext(src, context, { filename: file });
  }
  return context.window.QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES;
}

const bank = loadBank();
const expectedTopicCounts = { U1: 11, U2: 24, U3: 18, U4: 21 };
const subject = {
  mcqCount: 60,
  units: [
    { id: 'U1', examWeight: 0.225, examWeightRange: [0.20, 0.25] },
    { id: 'U2', examWeight: 0.325, examWeightRange: [0.30, 0.35] },
    { id: 'U3', examWeight: 0.225, examWeightRange: [0.20, 0.25] },
    { id: 'U4', examWeight: 0.225, examWeightRange: [0.20, 0.25] },
  ],
  stimulusSetRange: [15, 20],
  attributeRanges: {
    unit: {
      U1: [12, 15],
      U2: [18, 21],
      U3: [12, 15],
      U4: [12, 15],
    },
  },
  constraintDrawAttempts: 20000,
};

function seeded(seed) {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

test('draft bank covers the exact 74-topic CED inventory once by source set', () => {
  assert.equal(bank.length, 238);
  const groups = toBlocks(bank);
  assert.equal(groups.length, 74);
  assert.equal(groups.filter((g) => g.length === 4).length, 16);
  assert.equal(groups.filter((g) => g.length === 3).length, 58);
  assert.ok(groups.every((g) => g.length === 3 || g.length === 4));

  const topicGroups = new Map();
  for (const group of groups) {
    const ordered = group.slice().sort((a, b) => a.sequence - b.sequence);
    const codes = new Set(group.map((q) => q.topicCode));
    const units = new Set(group.map((q) => q.unit));
    assert.equal(codes.size, 1);
    assert.equal(units.size, 1);
    const code = group[0].topicCode;
    assert.match(code, /^[1-4]\.\d+$/);
    assert.ok(!topicGroups.has(code), `duplicate source set for ${code}`);
    topicGroups.set(code, group);
    assert.deepEqual(ordered.map((q) => q.sequence), group.length === 4 ? [1, 2, 3, 4] : [1, 2, 3]);
    assert.ok(group.every((q) => q.stimulusGroupId === group[0].stimulusGroupId));
    assert.ok(group.every((q) => q.stimulus === group[0].stimulus));
  }
  assert.equal(topicGroups.size, 74);

  const counts = {};
  for (const group of groups) counts[group[0].unit] = (counts[group[0].unit] || 0) + 1;
  assert.deepEqual(counts, expectedTopicCounts);
});

test('all items are single-select, sourced, explained, and use real CED skill codes', () => {
  const allowedSkills = new Set(['1.B', '1.C', '1.D', '2.A', '2.B', '2.C', '2.D', '3.B', '3.C']);
  for (const q of bank) {
    assert.equal(q.type, 's');
    assert.equal(q.o.length, 4);
    assert.equal(q.c.length, 1);
    assert.ok(q.c[0] >= 0 && q.c[0] < 4);
    assert.ok(q.id && q.topicCode && q.unit && q.stimulusGroupId);
    assert.ok(allowedSkills.has(q.skill), `${q.id}: unexpected skill ${q.skill}`);
    assert.ok(q.e.length >= 90, `${q.id}: explanation too short`);
    assert.ok(q.stimulus && q.stimulus.source && q.stimulus.text);
    assert.equal(typeof q.stimulus.requiredSource, 'boolean');
  }
});

test('required-source share stays near the official approximately-half target', () => {
  const groups = toBlocks(bank);
  const requiredGroups = groups.filter((g) => g[0].stimulus.requiredSource === true);
  const unfamiliarGroups = groups.filter((g) => g[0].stimulus.requiredSource === false);
  assert.equal(requiredGroups.length, 39);
  assert.equal(unfamiliarGroups.length, 35);
  assert.ok(requiredGroups.length >= 35 && requiredGroups.length <= 40);
  assert.ok(requiredGroups.every((g) => /Required source/i.test(g[0].stimulus.source)));
  assert.ok(unfamiliarGroups.every((g) => /Original synthetic source|Original simulated data|Original synthetic visual/i.test(g[0].stimulus.source)));
  const kinds = new Set(requiredGroups.map((g) => g[0].stimulus.sourceKind));
  for (const expected of ['text', 'law', 'visual', 'map', 'object']) {
    assert.ok(kinds.has(expected), `required-source pool is missing source kind ${expected}`);
  }
});

test('anti-template pass gives source groups varied student-facing stems', () => {
  const groups = toBlocks(bank).map((g) => g.slice().sort((a, b) => a.sequence - b.sequence));
  const q1Stems = new Set(groups.map((g) => g[0].q));
  const q2Stems = new Set(groups.map((g) => g[1].q));
  const q3Stems = new Set(groups.map((g) => g[2].q));
  assert.ok(q1Stems.size >= 6);
  assert.ok(q2Stems.size >= 6);
  assert.ok(q3Stems.size >= 4);
  const q3Correct = groups.map((g) => g[2].o[g[2].c[0]]);
  assert.equal(new Set(q3Correct).size, 74, 'disciplinary-significance answers must be topic/source specific');
  assert.ok(q3Correct.every((answer) => !/^African American Studies connects specific developments/.test(answer)));
});

test('raw answer positions remain balanced after source and quality expansion', () => {
  const counts = [0, 0, 0, 0];
  bank.forEach((q) => counts[q.c[0]]++);
  counts.forEach((n) => assert.ok(n >= 50 && n <= 70, `raw key count ${n} is imbalanced`));
});

test('500 weighted forms stay whole, exact-length, and inside official unit bands', () => {
  for (let i = 1; i <= 500; i++) {
    const form = drawExam(subject, bank, seeded(i));
    assert.equal(form.length, 60);
    const groupCounts = new Map();
    const unitCounts = { U1: 0, U2: 0, U3: 0, U4: 0 };
    form.forEach((q) => {
      groupCounts.set(q.stimulusGroupId, (groupCounts.get(q.stimulusGroupId) || 0) + 1);
      unitCounts[q.unit]++;
    });
    assert.ok(groupCounts.size >= 15 && groupCounts.size <= 20);
    for (const [gid, count] of groupCounts) {
      const fullSize = bank.filter((q) => q.stimulusGroupId === gid).length;
      assert.equal(count, fullSize, `${gid}: source set was split`);
    }
    assert.ok(unitCounts.U1 >= 12 && unitCounts.U1 <= 15);
    assert.ok(unitCounts.U2 >= 18 && unitCounts.U2 <= 21);
    assert.ok(unitCounts.U3 >= 12 && unitCounts.U3 <= 15);
    assert.ok(unitCounts.U4 >= 12 && unitCounts.U4 <= 15);
  }
});

test('required-source conversion does not falsely claim copied source text', () => {
  const requiredGroups = toBlocks(bank).filter((g) => g[0].stimulus.requiredSource);
  assert.ok(requiredGroups.every((g) => /original summary\/description/i.test(g[0].stimulus.source)));
});
