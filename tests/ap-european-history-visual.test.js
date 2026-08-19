const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function loadBank() {
  const html = fs.readFileSync('index.html', 'utf8');
  const scripts = [...html.matchAll(/<script src="(data\/ap-european-history[^\"]*\.js)"><\/script>/g)].map((m) => m[1]);
  const context = vm.createContext({ window: {} });
  for (const file of scripts) vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
  return context.window.QUESTIONS_AP_EUROPEAN_HISTORY;
}

const bank = loadBank();
const visualGroups = [...new Map(bank.filter((q) => q.stimulus && q.stimulus.type === 'visual').map((q) => [q.stimulusGroupId, q])).values()];

const expected = new Map([
  ['2.7', 'assets/ap-european-history/u2-mannerism-baroque-comparison.svg'],
  ['4.5', 'assets/ap-european-history/u4-rococo-neoclassical-interiors.svg'],
  ['5.8', 'assets/ap-european-history/u5-romantic-sublime-landscape.svg'],
  ['7.8', 'assets/ap-european-history/u7-realist-impressionist-comparison.svg'],
  ['8.10', 'assets/ap-european-history/u8-modernist-fragmented-still-life.svg'],
]);

test('all five AP Euro visual sets use real local original SVG stimuli', () => {
  assert.equal(visualGroups.length, 5);
  for (const q of visualGroups) {
    assert.equal(q.stimulus.image, expected.get(q.topicCode), `${q.topicCode}: unexpected visual asset`);
    assert.ok(fs.existsSync(q.stimulus.image), `${q.topicCode}: missing ${q.stimulus.image}`);
    const svg = fs.readFileSync(q.stimulus.image, 'utf8');
    assert.match(svg, /<svg\b/);
    assert.match(svg, /<title\b/);
    assert.match(svg, /<desc\b/);
    assert.match(q.stimulus.source, /Original synthetic visual/i);
    assert.match(q.stimulus.source, /not a historical artifact or College Board source/i);
  }
});

test('visual alt text describes observable composition without naming the keyed style', () => {
  const leak = /Mannerism|Mannerist|Baroque|Rococo|Neoclassicism|Neoclassical|Romanticism|Romantic|Realism|Realist|Impressionism|Impressionist|Modernism|Modernist|Cubism|Cubist/i;
  for (const q of visualGroups) {
    assert.ok(q.stimulus.alt && q.stimulus.alt.length >= 80, `${q.topicCode}: alt text too thin`);
    assert.doesNotMatch(q.stimulus.alt, leak, `${q.topicCode}: alt text leaks style attribution`);
  }
});

test('visual questions actually depend on observation or visual contextualization', () => {
  for (const seed of visualGroups) {
    const group = bank.filter((q) => q.stimulusGroupId === seed.stimulusGroupId);
    assert.ok(group.some((q) => /style|movement|work|interior|landscape|artistic|composition|scene|subject matter|visual/i.test(q.q)), `${seed.topicCode}: no visual-dependent question`);
    assert.ok(group.every((q) => q.stimulus.image === seed.stimulus.image), `${seed.topicCode}: visual not shared across set`);
  }
});