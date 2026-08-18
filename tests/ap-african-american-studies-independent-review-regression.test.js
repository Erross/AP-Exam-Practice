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
  assert.ok(scripts.includes('data/ap-african-american-studies-independent-review-fixes.js'), 'independent-review fix layer missing from index.html');
  assert.ok(scripts.includes('data/ap-african-american-studies-synthetic-depth-fixes.js'), 'synthetic depth layer missing from index.html');
  assert.equal(scripts.at(-2), 'data/ap-african-american-studies-independent-review-fixes.js');
  assert.equal(scripts.at(-1), 'data/ap-african-american-studies-synthetic-depth-fixes.js');
  const context = vm.createContext({ window: {} });
  for (const script of scripts) {
    vm.runInContext(fs.readFileSync(path.join(root, script), 'utf8'), context, { filename: script });
  }
  return context.window.QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES;
}

const bank = loadBrowserEffectiveBank();
const group = (topic) => bank.filter((q) => q.topicCode === topic).sort((a, b) => a.sequence - b.sequence);

test('required-source questions stay grounded in the browser-effective source rather than inherited synthetic claims', () => {
  const requiredGroups = new Map();
  for (const q of bank) {
    if (q.stimulus && q.stimulus.requiredSource) requiredGroups.set(q.stimulusGroupId, group(q.topicCode));
  }
  assert.equal(requiredGroups.size, 39);
  for (const qs of requiredGroups.values()) {
    const q1 = qs.find((q) => q.sequence === 1);
    const q2 = qs.find((q) => q.sequence === 2);
    assert.ok(q1 && q2);
    assert.match(q1.q, /required source|source itself/i, `${q1.topicCode}: q1 not source-grounded`);
    assert.match(q2.e, /specific evidence|broader conclusions|corrobor/i, `${q2.topicCode}: q2 does not constrain inference`);
    assert.doesNotMatch(q2.o[q2.c[0]], /all Black communities|entire period|every region/i, `${q2.topicCode}: keyed answer overgeneralizes`);
  }
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
  assert.ok(new Set(textQ3.map((q) => q.q)).size >= 30, 'q3 stem variety regressed');
});

test('synthetic text groups retain topic-specific analytical depth after the final layer', () => {
  const syntheticTextGroups = new Map();
  for (const q of bank) {
    if (q.stimulus && !q.stimulus.requiredSource && q.stimulus.type === 'text') {
      syntheticTextGroups.set(q.stimulusGroupId, group(q.topicCode));
    }
  }
  assert.equal(syntheticTextGroups.size, 27);
  for (const qs of syntheticTextGroups.values()) {
    const q3 = qs.find((q) => q.sequence === 3);
    assert.ok(q3, `${qs[0].topicCode}: missing q3`);
    assert.doesNotMatch(q3.q, /which next step|which comparison would add|which question would best test the limits|which additional perspective|which method would best connect|which approach would best distinguish|which kind of corroboration|broader African American Studies argument/i, `${q3.topicCode}: generic repair scaffold survived`);
    assert.ok(q3.e.length >= 100, `${q3.topicCode}: topic-specific rationale too short`);
  }
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
