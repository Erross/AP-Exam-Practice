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

test('Unit 2 has all 24 topics with intact source groups', () => {
  for (let n = 1; n <= 24; n++) {
    const qs = group(`2.${n}`);
    assert.ok(qs.length === 3 || qs.length === 4, `2.${n}: expected 3-4 questions`);
    assert.ok(qs.every((q) => q.unit === 'U2'));
    assert.equal(new Set(qs.map((q) => q.stimulusGroupId)).size, 1);
  }
});

test('reviewed Black Seminole group preserves complexity, agency, and source perspective', () => {
  const qs = group('2.17');
  assert.equal(qs[0].stimulus.requiredSource, true);
  assert.match(qs[0].stimulus.title, /Black Seminole|Jesup|Abraham|Gopher John/i);
  const text = qs.flatMap((q) => [q.q, q.e, ...q.o]).join(' ');
  assert.match(text, /alliance|kinship|refuge|leadership/i);
  assert.match(text, /removal|military|campaign/i);
  assert.match(text, /perspective|purpose|context/i);
  assert.doesNotMatch(text, /Black-Indigenous relations.*(?:only|always|uniform)/i);
});

test('reviewed gender-and-resistance group uses Jacobs and Prince without overgeneralizing', () => {
  const qs = group('2.22');
  assert.equal(qs[0].stimulus.requiredSource, true);
  assert.match(qs[0].stimulus.title, /Harriet Jacobs/i);
  assert.match(qs[0].stimulus.title, /Mary Prince/i);
  const text = qs.flatMap((q) => [q.q, q.e, ...q.o]).join(' ');
  assert.match(text, /sexual|family|mother|gender|domestic/i);
  assert.match(text, /abolition/i);
  assert.match(text, /contextual|representative|first-person|narrative/i);
  assert.doesNotMatch(text, /all enslaved women used the same/i);
});

test('Unit 2 preserves agency alongside coercion across slavery and resistance topics', () => {
  const topics = ['2.3','2.4','2.11','2.13','2.15','2.19','2.20','2.23'];
  const text = topics.flatMap((t) => group(t)).flatMap((q) => [q.q, q.e, ...q.o]).join(' ');
  assert.match(text, /resist|resistance|escape|freedom|agency|self-emancipation|revolt/i);
  assert.doesNotMatch(text, /enslaved (?:Africans|people).*passively accepted/i);
});
