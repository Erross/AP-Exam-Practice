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
const byId = new Map(bank.map((q) => [q.id, q]));

function optionText(id) {
  const q = byId.get(id);
  assert.ok(q, `missing ${id}`);
  return q.o.join(' | ');
}

test('reviewed balance-of-power item uses same-domain conflicts rather than anachronistic joke distractors', () => {
  const text = optionText('apeuro-3-6-02');
  assert.match(text, /Spanish Succession/);
  assert.match(text, /Austrian Succession/);
  assert.match(text, /Seven Years/);
  assert.match(text, /Great Northern War/);
  assert.doesNotMatch(text, /Crimean|labor dispute/i);
});

test('reviewed Romanticism item contrasts serious Enlightenment-era alternatives', () => {
  const text = optionText('apeuro-5-8-02');
  assert.doesNotMatch(text, /medieval church|steam power/i);
  assert.match(text, /Neoclassical|Enlightened|scientific/i);
});

test('reviewed industrialization evidence item keeps the correct evidence uniquely most probative', () => {
  const q = byId.get('apeuro-6-2-03');
  const correct = q.o[q.c[0]];
  assert.match(correct, /serf labor systems/i);
  assert.match(correct, /capital availability/i);
  assert.match(correct, /transport networks/i);
  assert.match(correct, /urban markets/i);
  const distractors = q.o.filter((_, i) => i !== q.c[0]).join(' | ');
  assert.match(distractors, /court expenditure|dynastic marriages|church construction/i);
  assert.doesNotMatch(distractors, /royal birthdays/i);
});

test('reviewed liberal-socialist disagreement item stays on property, liberty, and industrial inequality', () => {
  const text = optionText('apeuro-6-7-02');
  assert.match(text, /political liberty and private property/i);
  assert.match(text, /ownership|property|market exchange/i);
  assert.doesNotMatch(text, /use money|literacy should be prohibited/i);
});

test('reviewed imperial-capacity item distinguishes decisive industrial tools from secondary technologies', () => {
  const q = byId.get('apeuro-7-6-03');
  const correct = q.o[q.c[0]];
  assert.match(correct, /Steam transport/);
  assert.match(correct, /firearms/);
  assert.match(correct, /telegraphy/);
  assert.match(correct, /quinine/);
  assert.doesNotMatch(optionText('apeuro-7-6-03'), /medieval longbow/i);
});

test('reviewed Soviet-force item distinguishes direct invasion from coercion, pressure, and doctrine', () => {
  const q = byId.get('apeuro-9-7-03');
  const correct = q.o[q.c[0]];
  assert.match(correct, /Prague Spring/i);
  const distractors = q.o.filter((_, i) => i !== q.c[0]).join(' | ');
  assert.match(distractors, /Berlin Wall/);
  assert.match(distractors, /martial law in Poland/);
  assert.match(distractors, /Brezhnev Doctrine/);
  assert.doesNotMatch(distractors, /Suez Crisis|invasion of France/i);
});

test('independent-review repairs preserve one clear keyed answer and substantive feedback', () => {
  for (const id of ['apeuro-3-6-02','apeuro-5-8-02','apeuro-6-2-03','apeuro-6-7-02','apeuro-7-6-03','apeuro-9-7-03']) {
    const q = byId.get(id);
    assert.equal(q.o.length, 4);
    assert.equal(q.c.length, 1);
    assert.ok(q.e.length >= 90, `${id}: rationale too short`);
    assert.equal(new Set(q.o).size, 4, `${id}: duplicate options`);
  }
});