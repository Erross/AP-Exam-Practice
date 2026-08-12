const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

function loadEffectiveChemistryBank() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  for (const path of [
    "data/ap-chemistry.js",
    "data/ap-chemistry-curation.js",
    "data/ap-chemistry-corrections.js",
    "data/ap-chemistry-quality-fixes.js",
  ]) vm.runInContext(fs.readFileSync(path, "utf8"), sandbox);
  return sandbox.window.QUESTIONS_AP_CHEMISTRY;
}

const bank = loadEffectiveChemistryBank();
const byId = new Map(bank.map((q) => [q.id, q]));
const correct = (id) => {
  const q = byId.get(id);
  return q.o[q.c[0]];
};

test("Chemistry post-release audit defects are corrected semantically", () => {
  assert.match(byId.get("apchem-u6-002").q, /Which observation/i);
  assert.match(correct("apchem-u6-002"), /temperature decreases/i);
  assert.doesNotMatch(correct("apchem-u6-002"), /^Measure /i);

  assert.match(byId.get("apchem-u9-020").q, /^Why /i);
  assert.match(correct("apchem-u9-020"), /Q approaches K/i);
  assert.match(correct("apchem-u9-020"), /ΔG approaches zero/i);
  assert.notEqual(correct("apchem-u9-020"), "It decreases toward zero.");

  assert.equal(correct("apchem-u3-021"), "1.25");
  assert.equal(correct("apchem-u5-002"), "+1.5×10^−2 M s^−1");
  assert.equal(correct("apchem-u6-003"), "ΔH = −40 kJ/mol; Ea = 60 kJ/mol");
  assert.equal(correct("apchem-u7-017"), "Qp = Kp/4, so the system shifts toward NH3");
  assert.equal(correct("apchem-u9-018"), "−212 kJ/mol");
});

test("Chemistry hardened items use competitive distractors rather than cartoon wrong answers", () => {
  const ids = [
    "apchem-u1-016", "apchem-u3-020", "apchem-u3-021", "apchem-u4-014",
    "apchem-u5-002", "apchem-u6-002", "apchem-u6-003", "apchem-u6-018",
    "apchem-u7-017", "apchem-u7-018", "apchem-u9-005", "apchem-u9-018", "apchem-u9-020",
  ];
  for (const id of ids) {
    const q = byId.get(id);
    assert.equal(q.o.length, 4, `${id}: option count`);
    assert.equal(new Set(q.o).size, 4, `${id}: duplicate options`);
    assert.ok(q.e.length >= 120, `${id}: rationale should teach the distinction`);
  }

  const banned = /unrelated arbitrary|all molecular motion stops|increases without limit|raising the energies of the products permanently/i;
  ids.forEach((id) => byId.get(id).o.forEach((option) => assert.doesNotMatch(option, banned, `${id}: weak distractor survived`)));
});

test("effective Chemistry bank remains free of answer-length and key-position tells", () => {
  const wc = (text) => text.trim().split(/\s+/).length;
  let uniqueLongest = 0;
  let correctWords = 0;
  let distractorWords = 0;
  for (const q of bank) {
    const lengths = q.o.map(wc);
    const longest = Math.max(...lengths);
    if (lengths[q.c[0]] === longest && lengths.filter((n) => n === longest).length === 1) uniqueLongest++;
    correctWords += lengths[q.c[0]];
    q.o.forEach((option, i) => { if (i !== q.c[0]) distractorWords += wc(option); });
  }
  const correctAvg = correctWords / bank.length;
  const distractorAvg = distractorWords / (bank.length * 3);
  assert.ok(uniqueLongest / bank.length <= 0.25, "too many uniquely-longest correct answers");
  assert.ok(Math.abs(correctAvg - distractorAvg) / distractorAvg <= 0.12, "correct-option length differs systematically");
  assert.deepEqual([0, 1, 2, 3].map((i) => bank.filter((q) => q.c[0] === i).length), [46, 46, 45, 45]);
});
