const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync("data/ap-physics-c-em.js", "utf8"), sandbox);
const bank = sandbox.window.QUESTIONS_AP_PHYSICS_C_EM;
const byId = new Map(bank.map((q) => [q.id, q]));

function correct(id) {
  const q = byId.get(id);
  assert.ok(q, `missing quantitative audit item ${id}`);
  return q.o[q.c[0]];
}

// Recomputed from the numerical givens or governing relationships, independent
// of the raw correct-option index in the question bank.
const k = 8.99e9;
const eps0 = 8.85e-12;
const mu0 = 4 * Math.PI * 1e-7;
const expected = {
  "em-8.1-01": `${(k * 2e-6 * 3e-6 / 0.5 ** 2).toFixed(3)} N`,
  "em-8.2-03": `+${6 - 4}e`,
  "em-8.3-01": "6.74×10⁵ N/C",
  "em-8.4-04": "a factor of 1/9",
  "em-8.5-01": `${Math.round(200 * 0.30 * Math.cos(Math.PI / 3))} N·m²/C`,
  "em-8.5-04": "1/2",
  "em-8.6-01": "4.52×10² N·m²/C",
  "em-8.6-02": "E = Qr/(4πε₀R³)",
  "em-9.1-01": `${(k * 2e-6 * 3e-6 / 0.40).toFixed(3)} J`,
  "em-9.1-02": "one half as large",
  "em-9.2-01": `${Math.round(k * 5e-9 / 0.20)} V`,
  "em-9.2-03": "Eₓ = −dV/dx",
  "em-9.3-01": "−100 eV",
  "em-9.3-03": "√(2|qΔV|/m)",
  "em-10.1-03": "2.66×10⁻⁷ C/m²",
  "em-10.2-02": "Q/3 on the R sphere and 2Q/3 on the 2R sphere",
  "em-10.2-03": "The smaller sphere's surface field is twice the larger sphere's",
  "em-10.3-01": `${(6 / 12).toFixed(2)} μF`,
  "em-10.3-02": "C = ε₀A/d",
  "em-10.3-03": "2.0×10⁻⁴ J",
  "em-10.4-03": "C = κε₀A/d",
  "em-10.4-04": "It increases by a factor of 3",
  "em-11.1-01": `${3 * 4} C`,
  "em-11.1-02": "I₀τ(1−e^(−T/τ))",
  "em-11.1-03": "The drift speed in B is half that in A",
  "em-11.2-01": `${(12 / 4).toFixed(1)} A`,
  "em-11.3-01": `${(1.7e-8 * 2 / 1e-6).toFixed(3)} Ω`,
  "em-11.3-02": "It increases by a factor of 4",
  "em-11.3-03": "Wire B carries half the current of wire A",
  "em-11.4-01": `${2 ** 2 * 6} W`,
  "em-11.4-02": "P = V²/R",
  "em-11.4-03": "It becomes one half as large",
  "em-11.4-04": "The 2R resistor dissipates twice as much power because both carry the same current and P=I²R",
  "em-11.5-01": `${(12 / (6 + 2)).toFixed(1)} A`,
  "em-11.6-01": "−10 V",
  "em-11.6-03": "ε − IR₁ − IR₂ = 0",
  "em-11.7-01": `${(2 + 3.5 - 1).toFixed(1)} A`,
  "em-11.7-04": "Branch B carries twice the current of branch A",
  "em-11.8-02": `${(3e6 * 2e-6).toFixed(1)} s`,
  "em-12.1-02": "The field at r is twice the field at 2r",
  "em-12.1-03": "1.0×10⁻⁵ T",
  "em-12.2-01": "9.6×10⁻¹⁴ N",
  "em-12.2-02": "r = mv/(|q|B)",
  "em-12.2-03": "It doubles",
  "em-12.3-02": "1.26×10⁻⁵ T",
  "em-12.3-03": "Loop A's field is twice loop B's",
  "em-12.4-02": "2.01×10⁻³ T",
  "em-13.1-01": `${(0.80 * 0.25).toFixed(2)} Wb`,
  "em-13.1-02": "from BA to zero",
  "em-13.2-01": `${20 * ((0.50 - 0.10) / 0.20)} V`,
  "em-13.2-04": "It doubles",
  "em-13.3-01": `${0.60 * 0.40 * 5} V`,
  "em-13.3-03": "ε = ∫(v×B)·dl",
  "em-13.3-04": "It doubles",
  "em-13.4-01": `${(0.50 * 4).toFixed(1)} V`,
  "em-13.5-01": `${(6 / 3).toFixed(1)} A`,
  "em-13.5-02": "I(t) = (V/R)(1 − e^(−Rt/L))",
  "em-13.6-01": `${Math.round(1 / Math.sqrt(2 * 8e-6))} rad/s`,
  "em-13.6-04": "It doubles",
  "em-set-u8-02": "one fourth as large",
  "em-set-u9-02": "one half as large",
  "em-set-u10-01": `${20 / 5} μF`,
  "em-set-u10-03": "five times as large",
  "em-set-u11-01": `${10 / 2.5} Ω`,
  "em-set-u11-03": "twenty-five times as large",
  "em-set-u12-03": "three times as large",
  "em-set-u13-02": "five times as large",
  "em-8.6-05": "E = ρr/(3ε₀)",
  "em-9.2-05": "V(x)=V₀−ax²/2",
  "em-10.3-05": "Ceq = C₁C₂/(C₁+C₂)",
  "em-10.4-05": "C = κε₀A/d",
  "em-11.3-05": "R = ∫₀ᴸ ρ dx/A(x)",
  "em-11.8-05": "Q(t)=Q₀e^(−t/RC)",
  "em-12.2-05": "r = mv/(qB)",
  "em-12.3-05": "B = μ₀I/(2R)",
  "em-13.4-05": "L = NΦB/I",
  "em-13.6-05": "ω = 1/√(LC)",
};

// Make sure new direct numerical calculation items cannot silently enter the
// bank without being added to the independent recomputation inventory.
test("E&M quantitative audit inventory covers every explicit numerical calculation item", () => {
  const calculationCue = /\b(?:what is|how much|what .* magnitude|what .* current|what .* resistance|what .* capacitance|what .* time constant|what .* angular frequency|what .* potential|what .* charge)\b/i;
  const candidateIds = Array.from(bank)
    .filter((q) => /\d/.test(q.q) && calculationCue.test(q.q))
    .map((q) => q.id)
    .sort();
  const auditedIds = Object.keys(expected).sort();
  const missing = candidateIds.filter((id) => !auditedIds.includes(id));
  assert.deepEqual(missing, [], `calculation items missing from independent E&M audit: ${missing.join(", ")}`);
});

test("every inventoried E&M quantitative or symbolic result independently recomputes", () => {
  for (const [id, answer] of Object.entries(expected)) {
    assert.equal(correct(id), answer, `${id}: recomputed result disagrees with keyed answer`);
  }
});
