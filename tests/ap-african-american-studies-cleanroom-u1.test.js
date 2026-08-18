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
  ]) vm.runInContext(fs.readFileSync(path.join(__dirname, `../data/${file}`), 'utf8'), context, { filename: file });
  return context.window.QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES;
}
const bank = loadBank();
const group = (topic) => bank.filter((q) => q.topicCode === topic).sort((a,b) => a.sequence - b.sequence);

test('Unit 1 has all 11 topics with one intact source group each', () => {
  for (let n = 1; n <= 11; n++) {
    const topic = `1.${n}`;
    const qs = group(topic);
    assert.ok(qs.length === 3 || qs.length === 4, `${topic}: expected a 3-4 item source group`);
    assert.ok(qs.every((q) => q.unit === 'U1'));
    assert.equal(new Set(qs.map((q) => q.stimulusGroupId)).size, 1);
  }
});

test('Unit 1 source identities preserve key CED-required-source anchors', () => {
  const expected = {
    '1.4': /Aksumite Coin.*King Ezana/i,
    '1.5': /Catalan Atlas/i,
    '1.6': /Sunjata/i,
    '1.7': /Oshe Shango/i,
    '1.8': /Great Zimbabwe/i,
    '1.9': /Nzinga Mbemba/i,
    '1.10': /Iyoba/i,
    '1.11': /Chafariz d.El-Rey/i,
  };
  for (const [topic, re] of Object.entries(expected)) {
    assert.match(group(topic)[0].stimulus.title, re, `${topic}: required source drifted`);
    assert.equal(group(topic)[0].stimulus.requiredSource, true);
  }
});

test('Unit 1 preserves the reviewed conceptual guardrails', () => {
  const all = Array.from({ length: 11 }, (_, i) => group(`1.${i + 1}`)).flat();
  const text = all.flatMap((q) => [q.q, q.e, ...q.o]).join(' ');
  assert.doesNotMatch(text, /Africa(?:n)? geography (?:completely |entirely )?(?:determined|dictated)/i);
  assert.doesNotMatch(text, /all African (?:societies|cultures|religions|languages) (?:were|are) identical/i);
  assert.doesNotMatch(text, /European influence was simply received passively/i);

  const landscape = group('1.2');
  assert.ok(landscape.some((q) => /environmental determinism|climate alone|additional evidence/i.test(`${q.q} ${q.e} ${q.o.join(' ')}`)));
  const kongo = group('1.9');
  assert.ok(kongo.some((q) => /negotiat|agency|diplomat/i.test(`${q.q} ${q.e} ${q.o.join(' ')}`)));
  const learning = group('1.6');
  assert.ok(learning.some((q) => /oral|griot|knowledge|scholar/i.test(`${q.q} ${q.e} ${q.o.join(' ')}`)));
});
