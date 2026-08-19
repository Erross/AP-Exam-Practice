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

// These phrases are not inherently historically false; they are markers of a
// distractor whose wrongness is being advertised by irrelevance or absurdity.
// A naive student should need course knowledge or source analysis to reject an
// option, not simply recognize that it belongs to the wrong kind of evidence.
const giveaway = /royal birthdays|weather (?:chart|report)|tourist guide|medieval church.*steam|whether Europe should use money|literacy should be prohibited|invisible to government|cannot contain numerical data|no information about|unrelated to (?:reform|travel|production|persecution|population|nationalism)|only additional railway timetables|neutral-state agricultural prices/i;

test('AP Euro distractors do not advertise their wrongness through absurd or irrelevant wording', () => {
  const offenders = [];
  for (const q of bank) {
    q.o.forEach((option, i) => {
      if (i !== q.c[0] && giveaway.test(option)) offenders.push(`${q.id}: ${option}`);
    });
  }
  assert.deepEqual(offenders, [], `naive distractor giveaways remain:\n${offenders.join('\n')}`);
});

test('AP Euro source-analysis distractors remain grammatically serious alternatives', () => {
  const weak = [];
  for (const q of bank.filter((item) => String(item.skill) === '2')) {
    q.o.forEach((option, i) => {
      if (i === q.c[0]) return;
      const words = String(option).trim().split(/\s+/).filter(Boolean).length;
      if (words < 4) weak.push(`${q.id}: ${option}`);
    });
  }
  assert.deepEqual(weak, [], `source-analysis distractors are too trivial:\n${weak.join('\n')}`);
});