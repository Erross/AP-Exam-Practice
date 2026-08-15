const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { AP_SUBJECTS } = require('../js/subjects');
const { loadEffectiveBank } = require('../tools/subject-release-audit');

const subject = AP_SUBJECTS.find((s) => s.id === 'ap-comparative-government');
const { bank } = loadEffectiveBank(subject);
const byId = new Map(bank.map((q) => [q.id, q]));
const key = (q) => q.o[q.c[0]];
const family = (q) => String(q.skill).split('.')[0];

test('Comparative Government clean-room country applications use topic-specific evidence', () => {
  const applications = bank.filter((q) => /-[b]$/.test(q.id) && q.skill === '1.E');
  assert.equal(applications.length, 42);
  const answers = new Set(applications.map(key));
  assert.equal(answers.size, 42, 'each topic should carry distinct country evidence');
  applications.forEach((q) => {
    assert.match(q.q, /piece of evidence/i, q.id);
    assert.doesNotMatch(key(q), /this provides a country context|this describes .* rather than the country|not evidence about/i, q.id);
    assert.ok(key(q).split(/\s+/).length >= 8, `${q.id}: evidence is too thin`);
  });
});

test('Comparative Government country-comparison items compare both named cases with substantive evidence', () => {
  const comparisons = bank.filter((q) => /-d$/.test(q.id));
  assert.equal(comparisons.length, 42);
  comparisons.forEach((q) => {
    assert.equal(q.skill, '2.A', q.id);
    const m = q.q.match(/between (.+?) and (.+?) is most accurate/);
    assert.ok(m, `${q.id}: country names not recoverable from stem`);
    const [, a, b] = m;
    q.o.forEach((option) => {
      assert.match(option, new RegExp(`${a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:`), `${q.id}: option omits ${a}`);
      assert.match(option, new RegExp(`${b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:`), `${q.id}: option omits ${b}`);
      assert.ok(option.split(/\s+/).length >= 20, `${q.id}: comparison option is too superficial`);
    });
    assert.doesNotMatch(key(q), /formally federal semi-presidential system has become increasingly centralized around the presidency; United Kingdom:/i, q.id);
  });
});

test('Comparative Government comparison implications are topic-specific rather than generic boilerplate', () => {
  const implications = bank.filter((q) => /-e$/.test(q.id));
  assert.equal(implications.length, 42);
  assert.equal(new Set(implications.map(key)).size, 42);
  implications.forEach((q) => {
    assert.equal(q.skill, '2.C', q.id);
    assert.match(q.q, /most defensible implication/i, q.id);
    assert.doesNotMatch(key(q), /operate through different institutional and political contexts|same political pressure can produce different channels/i, q.id);
    assert.ok(key(q).split(/\s+/).length >= 9, `${q.id}: implication is too generic`);
  });
});

test('Comparative Government mechanism questions use parallel same-unit competitors', () => {
  const mechanisms = bank.filter((q) => /-c$/.test(q.id));
  assert.equal(mechanisms.length, 42);
  mechanisms.forEach((q) => {
    assert.equal(q.skill, '1.B', q.id);
    assert.match(q.q, /connects .* to political outcomes/i, q.id);
    assert.ok(q.o.every((o) => /This (can alter|instead emphasizes)/.test(o)), `${q.id}: mechanism options are not parallel`);
    assert.ok(new Set(q.o).size === 4, `${q.id}: duplicate mechanism options`);
  });
});

test('Comparative Government source analysis uses plausible competing interpretations', () => {
  const quantitative = bank.filter((q) => q.stimulusGroupId && family(q) === '3');
  const qualitative = bank.filter((q) => q.stimulusGroupId && family(q) === '4');
  assert.equal(quantitative.length, 18);
  assert.equal(qualitative.length, 18);

  quantitative.filter((q) => q.skill === '3.D').forEach((q) => {
    assert.match(key(q), /requires evidence|explaining its cause/i, q.id);
    assert.ok(q.o.some((o) => /caused by|intentionally produced|ruled out/i.test(o)), `${q.id}: missing causal-inference competitors`);
  });
  qualitative.forEach((q) => {
    assert.equal(q.stimulus.type, 'text', q.id);
    assert.ok(q.o.every((o) => o.split(/\s+/).length >= 14), `${q.id}: qualitative distractor is cartoonishly short`);
  });
});

test('Comparative Government naive student preflight exposes critical exam facts', () => {
  assert.equal(subject.mcqCount, 55);
  assert.equal(subject.mcqTimeMinutes, 60);
  assert.equal(subject.calculatorAllowed, false);
  assert.match(subject.tierNote || '', /China.*Iran.*Mexico.*Nigeria.*Russia.*United Kingdom/i);
  assert.match(subject.tierNote || '', /quantitative|text-source|source analysis/i);
  const catalog = fs.readFileSync('js/catalog.js', 'utf8');
  assert.match(catalog, /Calculator:\s*not permitted|calculatorAllowed === false|calculator/i);
  assert.match(catalog, /Start timed practice/);
  assert.match(catalog, /browser session|saved/i);
});
