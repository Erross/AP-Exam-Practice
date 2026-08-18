const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function loadBrowserEffectiveBank() {
  const root = path.join(__dirname, '..');
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const scripts = [...html.matchAll(/<script src="(data\/ap-african-american-studies[^\"]*\.js)"><\/script>/g)]
    .map((m) => m[1]);
  assert.deepEqual(scripts.slice(-4), [
    'data/ap-african-american-studies-independent-review-fixes.js',
    'data/ap-african-american-studies-synthetic-depth-fixes.js',
    'data/ap-african-american-studies-synthetic-claim-fixes.js',
    'data/ap-african-american-studies-source-use-balance-fixes.js',
  ]);
  const context = vm.createContext({ window: {} });
  for (const script of scripts) vm.runInContext(fs.readFileSync(path.join(root, script), 'utf8'), context, { filename: script });
  return context.window.QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES;
}

const bank = loadBrowserEffectiveBank();
const group = (topic) => bank.filter((q) => q.topicCode === topic).sort((a, b) => a.sequence - b.sequence);
const words = (s) => String(s).trim().split(/\s+/).filter(Boolean).length;

test('required-source questions stay grounded in the browser-effective source rather than inherited synthetic claims', () => {
  const requiredGroups = new Map();
  for (const q of bank) if (q.stimulus && q.stimulus.requiredSource) requiredGroups.set(q.stimulusGroupId, group(q.topicCode));
  assert.equal(requiredGroups.size, 39);
  for (const qs of requiredGroups.values()) {
    const q1 = qs.find((q) => q.sequence === 1);
    const q2 = qs.find((q) => q.sequence === 2);
    assert.ok(q1 && q2);
    assert.match(q1.q, /required source|source itself/i, `${q1.topicCode}: q1 not source-grounded`);
    assert.match(q2.e, /specific conclusion|broader historical argument|corrobor|independent evidence/i, `${q2.topicCode}: q2 does not constrain inference`);
    assert.doesNotMatch(q2.o[q2.c[0]], /all Black communities|entire period|every region/i, `${q2.topicCode}: keyed answer overgeneralizes`);
  }
});

test('required-source use questions are parallel competitors rather than keyed length tells', () => {
  const qs = bank.filter((q) => q.sequence === 2 && q.stimulus && q.stimulus.requiredSource);
  assert.equal(qs.length, 39);
  let uniqueLongest = 0;
  for (const q of qs) {
    const lengths = q.o.map(words);
    const max = Math.max(...lengths);
    if (lengths[q.c[0]] === max && lengths.filter((n) => n === max).length === 1) uniqueLongest++;
    assert.ok(Math.min(...lengths) >= 20, `${q.topicCode}: required-source q2 has a conspicuously short option`);
  }
  assert.ok(uniqueLongest <= 8, `required-source q2 uniquely-longest keyed answers regressed to ${uniqueLongest}/39`);
});

test('required-source third questions now require topic-specific historical contextualization', () => {
  const requiredQ3 = bank.filter((q) => q.sequence === 3 && q.stimulus && q.stimulus.requiredSource);
  assert.equal(requiredQ3.length, 39);
  for (const q of requiredQ3) {
    assert.equal(q.skill, '1.B', `${q.topicCode}: required q3 should contextualize`);
    assert.match(q.q, /historical|context|course connection|broader pattern|development|significance/i, `${q.topicCode}: q3 lacks contextualization task`);
    assert.ok(q.q.includes(q.stimulus.title), `${q.topicCode}: q3 is not tied to its source`);
    assert.doesNotMatch(q.q, /which next step|which comparison would add|which question would best test the limits|which additional perspective|which method would best connect|which approach would best distinguish|which kind of corroboration/i, `${q.topicCode}: generic source-method scaffold survived`);
    assert.ok(q.e.length >= 120, `${q.topicCode}: contextual rationale too short`);
  }
  assert.equal(new Set(requiredQ3.map((q) => q.o[q.c[0]])).size, 39, 'required q3 keyed contexts are not source-specific');
});

test('Brookes fourth question analyzes the diagram rather than obsolete ship logs', () => {
  const q = group('2.4').find((x) => x.sequence === 4);
  assert.ok(q);
  assert.match(q.q, /Brookes diagram/i);
  assert.doesNotMatch(`${q.q} ${q.e}`, /ship logs/i);
  assert.match(q.o[q.c[0]], /abolitionist audience|persuasive representation/i);
});

test('Oshe Shango and Chafariz fourth questions no longer overclaim what the final sources show', () => {
  const oshe = group('1.7').find((x) => x.sequence === 4);
  assert.match(oshe.q, /Oshe Shango/i);
  assert.match(oshe.o[oshe.c[0]], /continuity|adaptation|syncretism/i);
  assert.doesNotMatch(oshe.o[oshe.c[0]], /never changed|proof/i);
  const lisbon = group('1.11').find((x) => x.sequence === 4);
  assert.match(lisbon.q, /Chafariz/i);
  assert.match(lisbon.o[lisbon.c[0]], /presence and mobility/i);
  assert.match(lisbon.o[lisbon.c[0]], /other records|needed/i);
});

test('repetitive old disciplinary-significance scaffold is absent from final text-source q3s', () => {
  const textQ3 = bank.filter((q) => q.sequence === 3 && q.stimulus && !['visual', 'quantitative'].includes(q.stimulus.type));
  assert.ok(textQ3.length > 50);
  for (const q of textQ3) {
    assert.doesNotMatch(q.q, /disciplinary significance|broader work of African American Studies/i, `${q.id}: old template survived`);
    assert.doesNotMatch(q.o.join(' '), /self-contained illustration of the topic|strongest use is descriptive rather than/i, `${q.id}: old template distractor survived`);
  }
  assert.ok(new Set(textQ3.map((q) => q.q)).size >= 50, 'q3 stem/source variety regressed');
});

test('synthetic text groups retain topic-specific analytical depth and no verbatim keyed thesis', () => {
  const syntheticTextGroups = new Map();
  for (const q of bank) if (q.stimulus && !q.stimulus.requiredSource && q.stimulus.type === 'text') syntheticTextGroups.set(q.stimulusGroupId, group(q.topicCode));
  assert.equal(syntheticTextGroups.size, 27);
  for (const qs of syntheticTextGroups.values()) {
    const q1 = qs.find((q) => q.sequence === 1);
    const q3 = qs.find((q) => q.sequence === 3);
    assert.ok(q1 && q3, `${qs[0].topicCode}: missing q1/q3`);
    assert.doesNotMatch(q3.q, /which next step|which comparison would add|which question would best test the limits|which additional perspective|which method would best connect|which approach would best distinguish|which kind of corroboration|broader African American Studies argument/i, `${q3.topicCode}: generic repair scaffold survived`);
    assert.ok(q3.e.length >= 100, `${q3.topicCode}: topic-specific rationale too short`);
    const keyed = q1.o[q1.c[0]].trim().toLowerCase();
    const source = q1.stimulus.text.trim().toLowerCase();
    assert.ok(!source.includes(keyed), `${q1.topicCode}: keyed q1 answer remains verbatim in stimulus`);
    assert.match(q1.q, /paraphrase|restates|summarizes|interpretation|conclusion|statement|expresses|matches/i, `${q1.topicCode}: q1 no longer tests interpretation`);
  }
});

test('final browser-effective bank has no stacked absolute-language distractor tells', () => {
  const absolute = /\b(always|never|every|only|entirely|unlimited|impossible|guaranteed)\b/i;
  const offenders = [];
  for (const q of bank) {
    const wrong = q.o.filter((_, i) => i !== q.c[0]);
    const hits = wrong.filter((o) => absolute.test(o));
    if (hits.length > 1) offenders.push(`${q.id} (${hits.length})`);
  }
  assert.deepEqual(offenders, []);
});

test('all 74 browser-effective groups remain intact after semantic repairs', () => {
  const groups = new Map();
  for (const q of bank) {
    if (!groups.has(q.stimulusGroupId)) groups.set(q.stimulusGroupId, []);
    groups.get(q.stimulusGroupId).push(q);
  }
  assert.equal(groups.size, 74);
  assert.equal(bank.length, 238);
  for (const qs of groups.values()) {
    assert.ok(qs.length === 3 || qs.length === 4);
    const seq = qs.map((q) => q.sequence).sort((a, b) => a - b);
    assert.deepEqual(seq, Array.from({ length: qs.length }, (_, i) => i + 1));
  }
});
