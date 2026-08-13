const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

function loadEffectiveBank() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync("data/ap-physics-2.js", "utf8"), sandbox);
  vm.runInContext(fs.readFileSync("data/ap-physics-2-quality-fixes.js", "utf8"), sandbox);
  return sandbox.window.QUESTIONS_AP_PHYSICS_2;
}

const bank = loadEffectiveBank();
const byId = new Map(bank.map((q) => [q.id, q]));
const answer = (id) => { const q = byId.get(id); return q.o[q.c[0]]; };

test("Physics 2 recall-heavy audit items are replaced by AP-level reasoning", () => {
  assert.equal(answer("apphys2-u9-010"), "Four times as large");
  assert.equal(answer("apphys2-u10-009"), "Both vectors point outward, and EP = 4EQ");
  assert.equal(answer("apphys2-u11-009"), "2");
  assert.equal(answer("apphys2-u11-012"), "Twice as much");
  assert.match(answer("apphys2-u11-015"), /current through R is twice/i);
  assert.equal(answer("apphys2-u13-011"), "3/2");
  assert.match(answer("apphys2-u13-015"), /60 cm.*twice.*inversion/i);
  assert.match(answer("apphys2-u14-026"), /^Zero,/i);
  assert.match(answer("apphys2-u15-011"), /High-frequency modes require larger discrete energy quanta/i);
  assert.match(answer("apphys2-u15-013"), /Trial B gives larger maximum electron kinetic energy/i);
  assert.match(answer("apphys2-u15-019"), /greater binding energy per nucleon/i);
});

test("effective Physics 2 bank keeps statistical answer cues under project limits", () => {
  const wc = (text) => text.trim().split(/\s+/).length;
  const absolute = /\b(always|never|every|only|entirely|unlimited|none|all|impossible|guarantee[sd]?|completely|identical)\b/i;
  let uniqueLongest = 0;
  let amongLongest = 0;
  let correctWords = 0;
  let distractorWords = 0;
  bank.forEach((q) => {
    const lengths = q.o.map(wc);
    const longest = Math.max(...lengths);
    if (lengths[q.c[0]] === longest) amongLongest++;
    if (lengths[q.c[0]] === longest && lengths.filter((n) => n === longest).length === 1) uniqueLongest++;
    correctWords += lengths[q.c[0]];
    const distractors = q.o.filter((_, i) => i !== q.c[0]);
    distractors.forEach((option) => { distractorWords += wc(option); });
    assert.ok(distractors.filter((option) => absolute.test(option)).length < 2, `${q.id}: stacked absolute distractors`);
  });
  const ca = correctWords / bank.length;
  const da = distractorWords / (bank.length * 3);
  assert.ok(uniqueLongest / bank.length <= 0.25);
  assert.ok(amongLongest / bank.length <= 0.58);
  assert.ok(Math.abs(ca - da) / da <= 0.12);
  assert.deepEqual([0,1,2,3].map((i) => bank.filter((q) => q.c[0] === i).length), [35,35,35,35]);
});

test("hardened Physics 2 options remain distinct and explanations justify the physics", () => {
  const ids = [
    "apphys2-u9-010", "apphys2-u10-009", "apphys2-u11-009", "apphys2-u11-012",
    "apphys2-u11-015", "apphys2-u13-011", "apphys2-u13-015", "apphys2-u14-026",
    "apphys2-u14-027", "apphys2-u15-010", "apphys2-u15-011", "apphys2-u15-013", "apphys2-u15-019",
  ];
  for (const id of ids) {
    const q = byId.get(id);
    assert.equal(new Set(q.o).size, 4, `${id}: duplicate option`);
    assert.ok(q.e.length >= 120, `${id}: explanation too shallow`);
  }
});
