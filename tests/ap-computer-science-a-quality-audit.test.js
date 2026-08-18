const test = require('node:test');
const assert = require('node:assert/strict');
const subject = require('./helpers/ap-computer-science-a-candidate');
const { loadEffectiveBank } = require('../tools/subject-release-audit');
const { bank } = loadEffectiveBank(subject);

const ABSOLUTE = /\b(always|never|every|only|entirely|unlimited|impossible|guaranteed)\b/i;
const words = (s) => String(s).trim().split(/\s+/).filter(Boolean).length;

test('AP CSA has no stacked absolute-language distractor tells', () => {
  const offenderQuestions = bank.filter(q => {
    const key = q.c[0];
    return q.o.filter((_, i) => i !== key).filter(x => ABSOLUTE.test(x)).length > 1;
  });
  if (offenderQuestions.length) {
    console.log('CSA stacked-absolute details', JSON.stringify(offenderQuestions.map(q => ({
      id: q.id,
      stem: q.q,
      key: q.c[0],
      options: q.o,
    })), null, 2));
  }
  const offenders = offenderQuestions.map(q => q.id);
  assert.deepEqual(offenders, [], `stacked absolute-language distractors: ${offenders.join(', ')}`);
});

test('AP CSA aggregate answer construction remains within project limits', () => {
  let unique = 0, among = 0, cw = 0, dw = 0;
  const keys = [0, 0, 0, 0];
  const uniqueOutliers = [];
  bank.forEach(q => {
    const key = q.c[0]; keys[key]++;
    const lens = q.o.map(words), longest = Math.max(...lens), ties = lens.filter(n => n === longest).length;
    if (lens[key] === longest && ties < 4) among++;
    if (lens[key] === longest && ties === 1) {
      unique++;
      uniqueOutliers.push({ id: q.id, keyWords: lens[key], maxDistractorWords: Math.max(...lens.filter((_, i) => i !== key)), options: q.o });
    }
    cw += lens[key];
    lens.forEach((n, i) => { if (i !== key) dw += n; });
  });
  const metrics = {
    uniqueLongest: unique / bank.length,
    amongLongest: among / bank.length,
    correctAverage: cw / bank.length,
    distractorAverage: dw / (bank.length * 3),
    keys,
  };
  console.log('CSA answer metrics', metrics);
  if (metrics.uniqueLongest > 0.25 || Math.abs(metrics.correctAverage-metrics.distractorAverage)/metrics.distractorAverage > 0.12) {
    console.log('CSA unique-longest details', JSON.stringify(uniqueOutliers, null, 2));
  }
  assert.ok(metrics.uniqueLongest <= 0.25, `unique longest ${(metrics.uniqueLongest*100).toFixed(1)}%`);
  assert.ok(metrics.amongLongest <= 0.58, `among longest ${(metrics.amongLongest*100).toFixed(1)}%`);
  assert.ok(Math.abs(metrics.correctAverage-metrics.distractorAverage)/metrics.distractorAverage <= 0.12,
    `mean words ${metrics.correctAverage.toFixed(2)}/${metrics.distractorAverage.toFixed(2)}`);
  keys.forEach((n, i) => assert.ok(n/bank.length >= 0.15 && n/bank.length <= 0.35, `key ${i}: ${n}`));
});
