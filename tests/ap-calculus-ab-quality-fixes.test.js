const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

function loadEffectiveBank() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync("data/ap-calculus-ab.js", "utf8"), sandbox);
  vm.runInContext(fs.readFileSync("data/ap-calculus-ab-quality-fixes.js", "utf8"), sandbox);
  return sandbox.window.QUESTIONS_AP_CALCULUS_AB;
}

const bank = loadEffectiveBank();
const byId = new Map(bank.map((q) => [q.id, q]));
const answer = (id) => { const q = byId.get(id); return q.o[q.c[0]]; };

test("Calculus AB targeted giveaway items now test mathematical distinctions", () => {
  assert.match(answer("apcalc-u1-014"), /both one-sided limits exist and are equal.*common value equals f\(c\)/i);
  assert.equal(answer("apcalc-u4-006"), "At that instant V is increasing at 15 cm³/s");
  assert.match(answer("apcalc-u1-003"), /left-hand limit is 2 while the right-hand limit is 1/i);
  assert.match(answer("apcalc-u1-005"), /samples finitely many inputs/i);
});

test("Calculus AB local length outliers are no longer conspicuous", () => {
  const wc = (text) => text.trim().split(/\s+/).length;
  for (const id of ["apcalc-u1-003", "apcalc-u1-005", "apcalc-u1-014", "apcalc-u4-006"]) {
    const q = byId.get(id);
    const lengths = q.o.map(wc);
    const correct = lengths[q.c[0]];
    const distractorAvg = lengths.filter((_, i) => i !== q.c[0]).reduce((a,b) => a+b, 0) / 3;
    assert.ok(correct / distractorAvg < 1.35, `${id}: correct option remains conspicuously long (${correct} vs ${distractorAvg.toFixed(1)})`);
    assert.equal(new Set(q.o).size, 4, `${id}: duplicate option`);
  }
});

test("effective Calculus AB bank keeps answer-language and length cues controlled", () => {
  const wc = (text) => text.trim().split(/\s+/).length;
  const absolute = /\b(always|never|every|only|entirely|unlimited|none|all|impossible|guarantee[sd]?|completely|identical)\b/i;
  let uniqueLongest = 0;
  let correctWords = 0;
  let distractorWords = 0;
  for (const q of bank) {
    const lengths = q.o.map(wc);
    const longest = Math.max(...lengths);
    if (lengths[q.c[0]] === longest && lengths.filter((n) => n === longest).length === 1) uniqueLongest++;
    correctWords += lengths[q.c[0]];
    const distractors = q.o.filter((_, i) => i !== q.c[0]);
    distractors.forEach((option) => { distractorWords += wc(option); });
    assert.ok(distractors.filter((option) => absolute.test(option)).length < 2, `${q.id}: stacked absolute distractors`);
  }
  const ca = correctWords / bank.length;
  const da = distractorWords / (bank.length * 3);
  assert.ok(uniqueLongest / bank.length <= 0.25);
  assert.ok(Math.abs(ca - da) / da <= 0.12);
  assert.deepEqual([0,1,2,3].map((i) => bank.filter((q) => q.c[0] === i).length), [30,30,30,30]);
});
