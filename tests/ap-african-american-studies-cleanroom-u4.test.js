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
    'ap-african-american-studies-required-sources-2.js',
  ]) vm.runInContext(fs.readFileSync(path.join(__dirname, `../data/${file}`), 'utf8'), context, { filename: file });
  return context.window.QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES;
}
const bank = loadBank();
const group = (topic) => bank.filter((q) => q.topicCode === topic).sort((a,b) => a.sequence - b.sequence);

test('Unit 4 has all 21 topics with intact source groups', () => {
  for (let n = 1; n <= 21; n++) {
    const qs = group(`4.${n}`);
    assert.ok(qs.length === 3 || qs.length === 4, `4.${n}: expected 3-4 questions`);
    assert.ok(qs.every((q) => q.unit === 'U4'));
    assert.equal(new Set(qs.map((q) => q.stimulusGroupId)).size, 1);
  }
});

test('Unit 4 reviewed required-source anchors remain attached to intended topics', () => {
  const expected = {
    '4.1': /Discourse on Colonialism/i,
    '4.3': /Half-American|James G\. Thompson/i,
    '4.4': /Brown v\. Board/i,
    '4.5': /Home Owners.*Loan|Residential Security Map|Philadelphia/i,
    '4.6': /Nonviolence and Racial Justice/i,
    '4.9': /Ballot or the Bullet/i,
    '4.11': /Ten-Point Program/i,
    '4.13': /Combahee River Collective/i,
    '4.15': /Colin Powell|Howard University/i,
    '4.21': /Space Is the Place/i,
  };
  for (const [topic, re] of Object.entries(expected)) {
    assert.equal(group(topic)[0].stimulus.requiredSource, true);
    assert.match(group(topic)[0].stimulus.title, re, `${topic}: required-source identity drifted`);
  }
});

test('Unit 4 preserves multiple strategies and currents within Black freedom politics', () => {
  const topics = ['4.4','4.6','4.7','4.9','4.10','4.11','4.13'];
  const text = topics.flatMap(group).flatMap((q) => [q.q, q.e, ...q.o]).join(' ');
  assert.match(text, /nonviolent|direct action|organizing|self-determination|Black Power|Panther|feminist|Combahee|community/i);
  assert.doesNotMatch(text, /all Black activists shared (?:one|the same) strategy/i);
});

test('contemporary diversity is not flattened into a single Black experience', () => {
  const qs = group('4.16');
  const text = qs.flatMap((q) => [q.q, q.e, ...q.o]).join(' ');
  assert.match(text, /variation|diversity|nativity|age|migration|religion/i);
  assert.doesNotMatch(text, /all Black Americans share the same migration history/i);
});

test('Afrofuturism source analysis includes imagination of alternative Black futures', () => {
  const qs = group('4.21');
  const text = qs.flatMap((q) => [q.q, q.e, ...q.o]).join(' ');
  assert.match(text, /future|speculative|space|technology|Black|alternative/i);
  assert.doesNotMatch(text, /Afrofuturism.*only.*prediction/i);
});
