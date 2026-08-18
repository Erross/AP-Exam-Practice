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
    'ap-african-american-studies-visual-1.js',
  ]) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, `../data/${file}`), 'utf8'), context, { filename: file });
  }
  return context.window.QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES;
}

const bank = loadBank();
const topics = ['1.3', '2.21', '3.12', '4.12'];

test('four unfamiliar-source groups use actual local visual stimuli', () => {
  for (const topic of topics) {
    const group = bank.filter((q) => q.topicCode === topic);
    assert.ok(group.length >= 3);
    const s = group[0].stimulus;
    assert.equal(s.type, 'visual');
    assert.equal(s.requiredSource, false);
    assert.equal(s.sourceKind, 'visual');
    assert.ok(s.alt.length >= 100, `${topic}: alt text too short`);
    assert.ok(s.description.length >= 100, `${topic}: description too short`);
    assert.match(s.source, /Original synthetic visual/);
    const asset = path.join(__dirname, '..', s.image);
    assert.ok(fs.existsSync(asset), `${topic}: missing visual asset ${s.image}`);
    assert.ok(group.every((q) => q.stimulus === s));
  }
});

test('visual alt text describes rather than gives away the keyed answer', () => {
  for (const topic of topics) {
    const group = bank.filter((q) => q.topicCode === topic).sort((a, b) => a.sequence - b.sequence);
    const alt = group[0].stimulus.alt.toLowerCase();
    for (const q of group.slice(0, 3)) {
      const answer = q.o[q.c[0]].toLowerCase();
      assert.notEqual(alt, answer);
    }
    assert.doesNotMatch(alt, /therefore|proves that|correct answer|the answer/i);
  }
});

test('visual questions require observation, contextualization, or source comparison', () => {
  const stems = topics.flatMap((topic) => bank.filter((q) => q.topicCode === topic).slice(0, 3).map((q) => q.q));
  assert.ok(stems.some((s) => /visual element|poster|portrait|schematic/i.test(s)));
  assert.ok(stems.some((s) => /context/i.test(s)));
  assert.ok(stems.some((s) => /compare|comparison|additional source/i.test(s)));
});
