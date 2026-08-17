const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync("data/ap-physics-c-mechanics.js", "utf8"), sandbox);
const bank = sandbox.window.QUESTIONS_AP_PHYSICS_C_MECHANICS;
const byId = new Map(bank.map((q) => [q.id, q]));

function correct(id) {
  const q = byId.get(id);
  assert.ok(q, `missing quantitative audit item ${id}`);
  return q.o[q.c[0]];
}

// Each value below is recomputed independently from the numerical givens in the
// stem/stimulus rather than copied from the bank's raw correct-option index.
const expected = {
  "pcm-1.1-01": `${Math.hypot(6, 8)} m/s`,
  "pcm-1.2-02": `${12 * 2 - 6} m/s^2`,
  "pcm-1.3-01": `${((2 + 10) / 2) * 4} m`,
  "pcm-1.4-01": `${20 - 12} m/s east`,
  "pcm-2.1-01": `${(1 * 0 + 3 * 4) / 4} m`,
  "pcm-2.5-01": `${(8 * 3) / 4} m/s^2`,
  "pcm-2.6-01": "2Gm^2/r^2",
  "pcm-2.7-01": `${0.20 * 5 * 10} N`,
  "pcm-2.8-01": `${200 * 0.030} N`,
  "pcm-2.9-01": "F0/b",
  "pcm-2.10-01": `${6 ** 2 / 3} m/s^2`,
  "pcm-3.1-01": `${0.5 * 3 * 4 ** 2} J`,
  "pcm-3.2-01": `${10 * 3} J`,
  "pcm-3.3-01": "-2ax",
  "pcm-3.4-01": `${Math.sqrt(2 * 10 * 5)} m/s`,
  "pcm-3.5-01": `${600 / 3} W`,
  "pcm-4.1-01": `${0.50 * 8} kg m/s east`,
  "pcm-4.2-01": `${12 * 0.50} N s`,
  "pcm-4.3-01": `${(2 * 6) / (2 + 4)} m/s`,
  "pcm-4.4-02": `${0} m/s`,
  "pcm-5.1-01": `${3 * 4} rad/s`,
  "pcm-5.2-01": `${8 * 0.50} m/s`,
  "pcm-5.3-01": `${20 * 0.30} N m`,
  "pcm-5.5-02": `${10 * 2} N m`,
  "pcm-5.6-01": `${12 / 4} rad/s^2`,
  "pcm-6.1-01": `${0.5 * 2 * 3 ** 2} J`,
  "pcm-6.2-01": `${5 * 4} J`,
  "pcm-6.3-01": `${3 * 4} kg m^2/s`,
  "pcm-6.4-02": `${(6 * 2) / 2} rad/s`,
  "pcm-6.5-01": `${6 / 2} rad/s`,
  "pcm-6.6-03": "It halves",
  "pcm-7.2-01": "pi s",
  "pcm-set-u1-02": `${2 * 3} m/s`,
  "pcm-set-u2-02": `${2 * 5 ** 2} N`,
  "pcm-set-u3-01": `${0.5 * 3 * 6} J`,
  "pcm-set-u4-01": `${0.5 * 0.1 * 20 + 0.1 * 20 + 0.5 * 0.1 * 20} N s`,
  "pcm-set-u5-01": `${2 / 1} kg m^2`,
  "pcm-set-u5-03": `${10 / 2} rad/s^2`,
  "pcm-set-u6-03": `${(1 / Math.sqrt(25)).toFixed(2)}v0`,
  "pcm-set-u7-02": `${Math.sqrt(25)} s`,
};

test("Mechanics quantitative audit inventory covers every explicitly numerical calculation item", () => {
  const calculationCue = /\b(?:what is|how much|where is|what .* speed|what .* acceleration|what .* momentum|what .* energy|what .* power|what .* impulse|what .* torque|what .* inertia|what .* period)\b/i;
  const numericStem = /\d/;
  const candidateIds = Array.from(bank)
    .filter((q) => numericStem.test(q.q) && calculationCue.test(q.q))
    .map((q) => q.id)
    .filter((id) => !["pcm-1.1-03", "pcm-3.3-03"].includes(id))
    .sort();
  const auditedIds = Object.keys(expected).sort();
  const missing = candidateIds.filter((id) => !auditedIds.includes(id));
  assert.deepEqual(missing, [], `calculation items missing from independent audit inventory: ${missing.join(", ")}`);
});

test("every inventoried Mechanics numerical result independently recomputes", () => {
  for (const [id, answer] of Object.entries(expected)) {
    assert.equal(correct(id), answer, `${id}: recomputed result disagrees with keyed answer`);
  }
});