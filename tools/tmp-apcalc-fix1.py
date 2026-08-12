from pathlib import Path

p = Path('data/ap-calculus-ab.js')
s = p.read_text()
old = '"vg-calc-u3-3-4": ["apcalc-u3-004", "apcalc-u3-005"],'
new = '"vg-calc-u3-3-4": ["apcalc-u3-004", "apcalc-u3-005", "apcalc-u3-006"],'
if old not in s:
    raise SystemExit('variant group target not found')
s = s.replace(old, new, 1)
old = '["The EVT guarantees an absolute max and min, because f(0) and f(4) are both defined.", "The EVT does not apply, because f is not differentiable at the endpoints x=0 and x=4.", "The EVT guarantees an absolute max and min, because every rational function is continuous on its domain."]'
new = '["The EVT applies because the interval is closed and both endpoint values exist.", "The EVT fails because differentiability at x=0 and x=4 is required.", "The EVT applies because a rational function is continuous at each point where its formula is defined."]'
if old not in s:
    raise SystemExit('EVT distractor target not found')
s = s.replace(old, new, 1)
p.write_text(s)

p = Path('tests/ap-calculus-ab.test.js')
s = p.read_text()
old = 'assert.equal(questions.length, 2, `${groupId}: variant group must have exactly two members`);'
new = 'assert.ok(questions.length >= 2, `${groupId}: variant group must have at least two members`);'
if old not in s:
    raise SystemExit('variant cardinality test target not found')
p.write_text(s.replace(old, new, 1))

Path('tests/ap-calculus-ab-naive-audit-regressions.test.js').write_text('''const test = require("node:test");
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
  const absolute = /\\b(always|never|every|entirely|completely|impossible|guarantee[sd]?|automatically|all|none|identical)\\b/i;
  const distractors = q.o.filter((_, i) => i !== q.c[0]);
  assert.ok(distractors.every((text) => !absolute.test(text)));
  assert.ok(distractors.every((text) => /EVT|interval|differentiab|rational function/i.test(text)));
});
''')
