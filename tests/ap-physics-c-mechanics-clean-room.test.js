const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync("data/ap-physics-c-mechanics.js", "utf8"), sandbox);
const bank = Array.from(sandbox.window.QUESTIONS_AP_PHYSICS_C_MECHANICS);
const byId = new Map(bank.map((q) => [q.id, q]));

const expectedSkills = {
  "pcm-2.3-02": "3.B",
  "pcm-4.3-03": "3.B",
  "pcm-2.6-01": "2.A",
  "pcm-5.4-01": "2.A",
  "pcm-6.6-01": "2.A",
  "pcm-7.5-01": "2.A",
  "pcm-7.3-01": "3.B",
  "pcm-7.4-01": "2.A",
};

test("Mechanics clean-room skill repairs preserve the exact task semantics", () => {
  for (const [id, skill] of Object.entries(expectedSkills)) {
    const q = byId.get(id);
    assert.ok(q, `missing clean-room anchor ${id}`);
    assert.equal(q.skill, skill, `${id}: skill tag no longer matches the task performed`);
  }
});

test("Mechanics clean-room student-facing typo repair remains fixed", () => {
  const text = bank.flatMap((q) => [q.q, ...q.o, q.e]).join("\n");
  assert.doesNotMatch(text, /\bmus\s+N\b/i);
  assert.match(byId.get("pcm-2.7-02").o.join(" | "), /μₛN/);
});
