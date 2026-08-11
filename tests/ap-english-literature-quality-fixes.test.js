const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

function loadEffectiveBank() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync("data/ap-english-literature.js", "utf8"), sandbox);
  vm.runInContext(fs.readFileSync("data/ap-english-literature-quality-fixes.js", "utf8"), sandbox);
  return sandbox.window.QUESTIONS_AP_ENGLISH_LITERATURE;
}

const bank = loadEffectiveBank();
const byId = new Map(bank.map((q) => [q.id, q]));
const answer = (id) => { const q = byId.get(id); return q.o[q.c[0]]; };

test("AP Literature audit-flagged easy items now use plausible interpretive distinctions", () => {
  assert.match(answer("aplit-sf-watch-05"), /self-censorship/i);
  assert.match(answer("aplit-sf-bell-05"), /uncertain origin.*marriage/i);
  assert.match(answer("aplit-sf-room-06"), /military system.*vulnerability/i);
  assert.match(answer("aplit-sf-snow-05"), /abstract criteria.*revenge.*practice/i);
  assert.match(answer("aplit-ld-orbit-04"), /private freedom.*scrutiny/i);
});

test("Poe costume item is grammatical and interpretively sound", () => {
  const q = byId.get("aplit-sf-snow-10");
  assert.match(q.q, /contribute to the passage by$/i);
  assert.equal(answer("aplit-sf-snow-10"), "visually turning a socially respected and self-assured man into a fool within the revenge plot");
  assert.doesNotMatch(answer("aplit-sf-snow-10"), /visually turns/i);
});

test("effective AP Literature bank remains free of length and stacked-absolute tells", () => {
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
  assert.deepEqual([0,1,2,3].map((i) => bank.filter((q) => q.c[0] === i).length), [36,36,35,35]);
});
