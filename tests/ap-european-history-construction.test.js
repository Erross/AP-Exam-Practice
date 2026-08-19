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
const phrases = [
  /within expanding early-modern commercial networks/i, /amid dynastic competition among territorial states/i, /during growing European maritime expansion/i,
  /amid confessional competition after the Reformation/i, /within expanding print and religious controversy/i, /as rulers negotiated church-state authority/i,
  /within dynastic balance-of-power politics/i, /amid stronger central states and elite resistance/i, /as rulers bargained with established estates/i,
  /within expanding print and learned networks/i, /amid new confidence in empirical and rational inquiry/i, /during debates over enlightened political reform/i,
  /amid fiscal crisis and revolutionary political contention/i, /within expanding Atlantic markets and imperial rivalry/i, /during conflict over privilege, rights, and sovereignty/i,
  /amid mechanization and changing labor relations/i, /within rapid urban and demographic growth/i, /during expanding industrial markets and infrastructure/i,
  /amid nationalism and expanding mass politics/i, /within intensifying imperial and great-power rivalry/i, /during widening literacy and political organization/i,
  /amid total war and state mobilization/i, /within ideological polarization and mass politics/i, /during repeated economic and diplomatic crises/i,
  /amid Cold War rivalry and postwar reconstruction/i, /within European integration and changing welfare states/i, /during decolonization, migration, and globalization/i,
];

test('answer-length hardening does not give multiple distractors an identical boilerplate tail', () => {
  for (const q of bank) {
    const distractors = q.o.filter((_, i) => i !== q.c[0]);
    for (const phrase of phrases) {
      const count = distractors.filter((option) => phrase.test(option)).length;
      assert.ok(count <= 1, `${q.id}: repeated contextual qualifier in ${count} distractors`);
    }
  }
});

test('contextual qualifiers remain subordinate rather than replacing historical content', () => {
  for (const q of bank) {
    q.o.forEach((option, i) => {
      if (i === q.c[0]) return;
      const hasQualifier = phrases.some((phrase) => phrase.test(option));
      if (!hasQualifier) return;
      const beforeComma = option.split(',')[0].trim().split(/\s+/).filter(Boolean).length;
      assert.ok(beforeComma >= 3, `${q.id}: qualifier attached to content-free distractor: ${option}`);
    });
  }
});