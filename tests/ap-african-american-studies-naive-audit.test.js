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
  ]) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, `../data/${file}`), 'utf8'), context, { filename: file });
  }
  return context.window.QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES;
}

const bank = loadBank();

test('review explanations read as student feedback rather than authoring metadata', () => {
  for (const q of bank) {
    assert.ok(q.e.length >= 90, `${q.id}: rationale too short`);
    assert.doesNotMatch(q.e, /CED Topic/i, `${q.id}: explanation leaks authoring taxonomy`);
    assert.doesNotMatch(q.e, /this item applies/i, `${q.id}: boilerplate explanation`);
    assert.doesNotMatch(q.e, /correct option is/i, `${q.id}: answer-key boilerplate`);
  }
});

test('student-facing sources are transparent about synthetic versus required-source summaries', () => {
  const seen = new Set();
  for (const q of bank) {
    if (seen.has(q.stimulusGroupId)) continue;
    seen.add(q.stimulusGroupId);
    const s = q.stimulus;
    assert.ok(s.title && (s.text || s.description || (Array.isArray(s.columns) && Array.isArray(s.rows))) && s.source);
    if (s.requiredSource) {
      assert.match(s.source, /Required source/i);
      assert.match(s.source, /original summary\/description/i);
    } else {
      assert.match(s.source, /Original (synthetic source|simulated data|synthetic visual)/i);
    }
  }
  assert.equal(seen.size, 74);
});

test('visible question text does not expose internal ids or implementation jargon', () => {
  const banned = /(stimulusGroupId|variantGroupId|dataVar|releaseStatus|constraintDrawAttempts|QUESTIONS_AP_)/i;
  for (const q of bank) {
    assert.doesNotMatch(q.q, banned, `${q.id}: internal jargon in stem`);
    q.o.forEach((o) => assert.doesNotMatch(o, banned, `${q.id}: internal jargon in option`));
    assert.doesNotMatch(q.e, banned, `${q.id}: internal jargon in explanation`);
  }
});
