const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
function loadBank() { const sandbox = { window: {} }; vm.createContext(sandbox); vm.runInContext(fs.readFileSync("data/ap-calculus-ab.js", "utf8"), sandbox); return sandbox.window.QUESTIONS_AP_CALCULUS_AB; }
const bank = loadBank();
const byId = new Map(bank.map((q) => [q.id, q]));
test("Calculus AB implicit-differentiation alternate forms are variant-grouped together", () => {
  const ids = ["apcalc-u3-004", "apcalc-u3-005", "apcalc-u3-006"];
  const groups = new Set(ids.map((id) => byId.get(id).variantGroupId));
  assert.equal(groups.size, 1); assert.ok([...groups][0]);
});
test("Calculus AB EVT distractors are plausible competitors without stacked absolute-language tells", () => {
  const q = byId.get("apcalc-u5-003");
  const absolute = /\b(always|never|every|entirely|completely|impossible|guarantee[sd]?|automatically|all|none|identical)\b/i;
  const distractors = q.o.filter((_, i) => i !== q.c[0]);
  assert.ok(distractors.every((text) => !absolute.test(text)));
  assert.ok(distractors.every((text) => /EVT|interval|differentiab|rational function/i.test(text)));
});
