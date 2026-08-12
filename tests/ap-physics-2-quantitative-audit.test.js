const test = require("node:test");
const assert = require("node:assert/strict");
const { loadPhysics2Bank } = require("./helpers");

const bank = loadPhysics2Bank();
const byId = new Map(bank.map((q) => [q.id, q]));
const answer = (id) => {
  const q = byId.get(id);
  return q.o[q.c[0]];
};

const expected2B = [
  ["apphys2-u9-005", 2.00e5, /2\.00×10\^5 Pa/],
  ["apphys2-u9-006", (2e5 * 0.5 * 450) / (300 * 1e5), /1\.5 m\^3/],
  ["apphys2-u9-016", (0.2 * 80 + 0.1 * 20) / 0.3, /60°C/],
  ["apphys2-u9-019", 1200 / 300, /4 J\/K/],
  ["apphys2-u10-006", -5 - 4 + 7, /−2\.0 μC/],
  ["apphys2-u10-008", 2e-6 * 5e4, /0\.10 N/],
  ["apphys2-u10-012", 3e-4, /\+3\.0×10\^−4 J/],
  ["apphys2-u10-014", 3e-6 * (500 - 200), /9\.0×10\^−4 J/],
  ["apphys2-u10-017", 0.5 * 4e-6 * 12 ** 2, /2\.9×10\^−4 J/],
  ["apphys2-u10-019", 1.60e-19 * 1000, /1\.60×10\^−16 J/],
  ["apphys2-u11-001", 12 * 3, /36 W/],
  ["apphys2-u11-005", 9 / 3, /3\.0 A/],
  ["apphys2-u11-011", 12 * 3, /36 W/],
  ["apphys2-u11-013", 12 / (4 + 1 / (1 / 6 + 1 / 3)), /2\.0 A/],
  ["apphys2-u11-014", (12 / (4 + 2)) * 2 / 3, /1\.33 A/],
  ["apphys2-u11-016", 9 / (2 + 3 + 4), /1\.0 A/],
  ["apphys2-u11-017", 1 * 3, /3\.0 V/],
  ["apphys2-u11-019", 3 - 1.5, /1\.5 A/],
  ["apphys2-u12-007", 0, /Zero/i],
  ["apphys2-u13-005", -30 / 30, /−1/],
  ["apphys2-u13-006", -20, /di = −20 cm.*m = \+2/],
  ["apphys2-u13-010", Math.asin(1 / 1.5) * 180 / Math.PI, /41\.8°/],
  ["apphys2-u13-013", -16.7 / 25, /−0\.67/],
  ["apphys2-u14-001", 150 * 2, /300 m\/s/],
  ["apphys2-u14-005", 340 / 425, /0\.80 m/],
  ["apphys2-u14-011", 3e8 / 1e6, /300 m/],
  ["apphys2-u14-014", 500 * 340 / (340 + 30), /459 Hz/],
  ["apphys2-u14-017", 340 / (4 * 0.85), /100 Hz/],
  ["apphys2-u14-025", 2 * 1.33 * 200, /532 nm/],
  ["apphys2-u15-001", 6.63e-34 * 7e14 / 1.60e-19, /2\.9 eV/],
  ["apphys2-u15-005", 3.4 - 1.51, /1\.89 eV/],
  ["apphys2-u15-014", 2 * 1.60e-19 / 6.63e-34, /4\.8×10\^14 Hz/],
  ["apphys2-u15-022", 0.5 ** 3, /1\/8/],
];

test("Physics 2 quantitative audit inventory covers every exact 2.B item", () => {
  const actual = bank.filter((q) => q.skill === "2.B").map((q) => q.id).sort();
  const expected = expected2B.map(([id]) => id).sort();
  assert.equal(JSON.stringify(actual), JSON.stringify(expected));
});

test("every Physics 2 exact 2.B result independently recomputes", () => {
  for (const [id, recomputed, expectedAnswer] of expected2B) {
    assert.ok(Number.isFinite(recomputed), `${id}: nonfinite independent recomputation`);
    assert.match(answer(id), expectedAnswer, `${id}: recomputed ${recomputed}, keyed ${answer(id)}`);
  }
});
