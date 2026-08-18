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

test('Unit 3 has all 18 topics with intact 3-4 question source groups', () => {
  for (let n = 1; n <= 18; n++) {
    const qs = group(`3.${n}`);
    assert.ok(qs.length === 3 || qs.length === 4, `3.${n}: expected 3-4 questions`);
    assert.ok(qs.every((q) => q.unit === 'U3'));
    assert.equal(new Set(qs.map((q) => q.stimulusGroupId)).size, 1);
  }
});

test('Unit 3 reviewed source anchors match their intended topics', () => {
  const expected = {
    '3.1': /Thirteenth.*Fourteenth.*Fifteenth|Reconstruction Amendments/i,
    '3.4': /Plessy v\. Ferguson/i,
    '3.5': /A Red Record/i,
    '3.6': /If We Must Die/i,
    '3.7': /Souls of Black Folk/i,
    '3.8': /Voice from the South/i,
    '3.11': /New Negro/i,
    '3.16': /Migration Series/i,
    '3.18': /UNIA|Marcus Garvey/i,
  };
  for (const [topic, re] of Object.entries(expected)) {
    assert.equal(group(topic)[0].stimulus.requiredSource, true);
    assert.match(group(topic)[0].stimulus.title, re, `${topic}: required-source identity drifted`);
  }
});

test('Reconstruction-to-Jim-Crow sequence preserves law, violence, and Black institution building', () => {
  const early = ['3.1','3.2','3.3','3.4','3.5','3.6'].flatMap(group);
  const earlyText = early.flatMap((q) => [q.q, q.e, ...q.o]).join(' ');
  assert.match(earlyText, /citizenship|equal protection|voting|freedom|emancipation/i);
  assert.match(earlyText, /Black Codes|labor|land|segregation|disenfranch|violence|lynch/i);

  const institutions = ['3.8','3.9','3.10','3.15','3.18'].flatMap(group);
  const institutionText = institutions.flatMap((q) => [q.q, q.e, ...q.o]).join(' ');
  assert.match(institutionText, /women|organization|institution|education|history|UNIA|leadership/i);
});

test('Great Migration analysis distinguishes population movement from single-cause explanation', () => {
  const qs = group('3.16');
  const text = qs.flatMap((q) => [q.q, q.e, ...q.o]).join(' ');
  assert.match(text, /migration|South|northern|midwestern|western|labor|family|culture/i);
  assert.doesNotMatch(text, /Great Migration was caused only by/i);
});
