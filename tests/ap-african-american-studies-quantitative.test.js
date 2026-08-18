const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function loadBank() {
  const context = vm.createContext({ window: {} });
  for (const file of [
    'ap-african-american-studies.js',
    'ap-african-american-studies-set-expansion.js',
    'ap-african-american-studies-required-sources-1.js',
    'ap-african-american-studies-quality-diversity-1.js',
    'ap-african-american-studies-quality-explanations-1.js',
    'ap-african-american-studies-quantitative-1.js',
  ]) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, `../data/${file}`), 'utf8'), context, { filename: file });
  }
  return context.window.QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES;
}

const bank = loadBank();
const quantitativeTopics = ['1.2', '2.2', '3.2', '4.16'];

test('four synthetic data source groups are rendered as quantitative stimuli', () => {
  for (const topic of quantitativeTopics) {
    const group = bank.filter((q) => q.topicCode === topic);
    assert.ok(group.length >= 3);
    assert.ok(group.every((q) => q.stimulus.type === 'quantitative'));
    assert.ok(group.every((q) => q.stimulus.requiredSource === false));
    assert.ok(group.every((q) => q.stimulus.sourceKind === 'data'));
    assert.match(group[0].stimulus.source, /not historical statistics/i);
    assert.ok(Array.isArray(group[0].stimulus.columns));
    assert.ok(Array.isArray(group[0].stimulus.rows));
  }
});

test('quantitative answers are independently recomputable from the embedded tables', () => {
  const t12 = bank.find((q) => q.topicCode === '1.2' && q.sequence === 1);
  assert.equal(t12.o[t12.c[0]], 'The highest rainfall index does not correspond to the highest settlement-density index.');

  const t22 = bank.find((q) => q.topicCode === '2.2' && q.sequence === 1);
  const rows22 = t22.stimulus.rows;
  const totals22 = rows22.map((r) => r[1] + r[2]);
  const max22 = Math.max(...totals22);
  assert.equal(max22, 46);
  assert.equal(rows22[totals22.indexOf(max22)][0], 'West Central Africa');
  assert.match(t22.o[t22.c[0]], /46 combined voyages/);

  const t32 = bank.find((q) => q.topicCode === '3.2' && q.sequence === 1);
  const maxRow32 = t32.stimulus.rows.reduce((a, b) => a[1] > b[1] ? a : b);
  assert.deepEqual(Array.from(maxRow32), ['Seeking child', 24]);
  assert.match(t32.o[t32.c[0]], /24 notices/);

  const t416 = bank.find((q) => q.topicCode === '4.16' && q.sequence === 1);
  assert.deepEqual(t416.stimulus.rows.map((r) => r[3]), [42, 51, 68]);
  assert.match(t416.o[t416.c[0]], /rises across the three age categories/);
});

test('data-analysis questions use the current Source Analysis 2D skill where appropriate', () => {
  for (const topic of ['1.2', '2.2', '3.2', '4.16']) {
    const first = bank.find((q) => q.topicCode === topic && q.sequence === 1);
    assert.equal(first.skill, '2.D');
  }
});
