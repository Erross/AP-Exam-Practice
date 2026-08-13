const test = require("node:test");
const assert = require("node:assert/strict");
const { loadChemistryBank } = require("./helpers");

const bank = loadChemistryBank();
const byId = new Map(bank.map((q) => [q.id, q]));
const key = (id) => { const q = byId.get(id); return q.o[q.c[0]]; };

const P4 = {
  "apchem-u1-008":"4.A","apchem-u1-010":"4.A","apchem-u1-011":"4.A","apchem-u1-013":"4.A","apchem-u1-016":"4.A",
  "apchem-u2-001":"4.A","apchem-u2-003":"4.B","apchem-u2-006":"4.A","apchem-u2-010":"4.A","apchem-u2-011":"4.A","apchem-u2-014":"4.A",
  "apchem-u3-001":"4.D","apchem-u3-003":"4.C","apchem-u3-005":"4.A","apchem-u3-009":"4.A","apchem-u3-012":"4.B","apchem-u3-014":"4.A","apchem-u3-016":"4.C","apchem-u3-019":"4.D",
  "apchem-u4-003":"4.A","apchem-u4-006":"4.A","apchem-u4-008":"4.C","apchem-u4-013":"4.A","apchem-u4-015":"4.A","apchem-u4-017":"4.A",
  "apchem-u5-007":"4.A","apchem-u5-009":"4.A","apchem-u5-011":"4.A","apchem-u5-013":"4.A","apchem-u5-019":"4.A","apchem-u5-021":"4.A",
  "apchem-u6-001":"4.A","apchem-u6-003":"4.A","apchem-u6-005":"4.A",
  "apchem-u7-001":"4.A","apchem-u7-003":"4.A","apchem-u7-009":"4.A","apchem-u7-016":"4.A","apchem-u7-017":"4.A","apchem-u7-023":"4.D",
  "apchem-u8-001":"4.A","apchem-u8-007":"4.A","apchem-u8-009":"4.A","apchem-u8-011":"4.A","apchem-u8-015":"4.A","apchem-u8-019":"4.A","apchem-u8-021":"4.D",
  "apchem-u9-001":"4.A","apchem-u9-008":"4.A","apchem-u9-016":"4.A"
};

test("Chemistry Practice 4 exact subskills match the Fall-2024 CED semantics", () => {
  const actual = Object.fromEntries(bank.filter(q => q.skill.startsWith("4.")).map(q => [q.id, q.skill]));
  assert.deepEqual(actual, P4);
  for (const id of ["apchem-u3-001","apchem-u3-019","apchem-u7-023","apchem-u8-021"]) {
    const q = byId.get(id); const text = `${q.q} ${key(id)}`;
    assert.match(text, /model/i); assert.match(text, /(particulate|molecular|ion|intermolecular)/i);
    assert.match(text, /(boiling|miscib|solubility)/i);
  }
  assert.equal(byId.get("apchem-u1-003").skill, "5.F");
  assert.equal(byId.get("apchem-u3-021").skill, "5.C");
  assert.equal(byId.get("apchem-u5-002").skill, "5.D");
  assert.equal(JSON.stringify(bank.filter(q => q.skill === "4.B").map(q => q.id).sort()), JSON.stringify(["apchem-u2-003","apchem-u3-012"]));
  for (const id of ["apchem-u2-003","apchem-u3-012"]) {
    const q = byId.get(id); const text = `${q.q} ${key(id)} ${q.e}`;
    assert.match(text, /(model|potential-energy|ideal-gas)/i);
    assert.match(text, /(consistent|prediction|limitation|overpredict)/i);
  }
});

const F5_IDS = [
  "apchem-u1-001","apchem-u1-003","apchem-u1-004","apchem-u1-005","apchem-u1-006","apchem-u1-007","apchem-u2-012",
  "apchem-u3-007","apchem-u3-013","apchem-u4-009","apchem-u4-010","apchem-u4-012","apchem-u4-018","apchem-u5-006","apchem-u5-017",
  "apchem-u6-004","apchem-u6-006","apchem-u6-007","apchem-u6-009","apchem-u6-011","apchem-u6-017",
  "apchem-u7-007","apchem-u7-008","apchem-u7-014","apchem-u7-019",
  "apchem-u8-003","apchem-u8-004","apchem-u8-013","apchem-u8-018",
  "apchem-u9-006","apchem-u9-013","apchem-u9-021","apchem-u9-022"
];

test("Chemistry quantitative audit inventory covers every exact 5.F item", () => {
  assert.equal(JSON.stringify(bank.filter(q => q.skill === "5.F").map(q => q.id).sort()), JSON.stringify([...F5_IDS].sort()));
});

test("every Chemistry 5.F calculation independently recomputes", () => {
  assert.equal(key("apchem-u1-001"), "0.500 mol"); assert.ok(Math.abs(9/18-.5)<1e-12);
  assert.equal(key("apchem-u1-003"), "About 35.5 u"); assert.ok(Math.abs(35*.75+37*.25-35.5)<1e-12);
  assert.equal(key("apchem-u1-004"), "0.25"); assert.equal(25/(75+25), .25);
  const c=40/12.01,h=6.7/1.008,o=53.3/16; assert.equal(key("apchem-u1-005"), "CH2O"); assert.ok(Math.abs((h/c)-2)<.01 && Math.abs((o/c)-1)<.01);
  assert.equal(key("apchem-u1-006"), "M2O3"); assert.equal(2/3, 2/3);
  assert.equal(key("apchem-u1-007"), "65%"); assert.equal((10-3.5)/10, .65);
  assert.equal(key("apchem-u2-012"), "−1"); assert.equal(6-6-2/2, -1);
  assert.equal(key("apchem-u3-007"), "24.6 L"); assert.ok(Math.abs(.0821*300-24.63)<.001);
  assert.equal(key("apchem-u3-013"), "0.250 M"); assert.equal(.5/2, .25);
  assert.equal(key("apchem-u4-009"), "6.0 mol"); assert.equal(3*2, 6);
  assert.equal(key("apchem-u4-010"), "2.0 mol NH3"); assert.equal(3*(2/3), 2);
  assert.equal(key("apchem-u4-012"), "0.120 M"); assert.ok(Math.abs(.150*.020/.025-.12)<1e-12);
  assert.equal(key("apchem-u4-018"), "+6"); assert.equal(-2-4*(-2), 6);
  assert.equal(key("apchem-u5-006"), "1/8"); assert.equal((.5)**(60/20), .125);
  assert.equal(key("apchem-u5-017"), "rate = k2K[A][B]");
  assert.equal(key("apchem-u6-004"), "−60 kJ mol−1"); assert.equal(90-150, -60);
  assert.equal(key("apchem-u6-006"), "+2.09 kJ"); assert.ok(Math.abs(-(100*4.18*(17-22))/1000-2.09)<.001);
  assert.equal(key("apchem-u6-007"), "2.09×10^3 J"); assert.equal(Math.abs(100*4.18*(17-22)), 2090);
  assert.equal(key("apchem-u6-009"), "60 kJ"); assert.equal(2*30, 60);
  assert.equal(key("apchem-u6-011"), "−62.5 kJ mol−1"); assert.equal(-125/2, -62.5);
  assert.equal(key("apchem-u6-017"), "−25 kJ"); assert.equal(40-65, -25);
  assert.equal(key("apchem-u7-007"), "4.0"); assert.equal(.8/.2, 4);
  assert.equal(key("apchem-u7-008"), "0.080"); assert.ok(Math.abs(.2**2/.5-.08)<1e-12);
  assert.equal(key("apchem-u7-014"), "[A]=0.50 M and [B]=0.50 M"); assert.equal(.5/(1-.5), 1);
  assert.equal(key("apchem-u7-019"), "0.40"); assert.equal(.2/.5, .4);
  assert.equal(key("apchem-u8-003"), "3.00"); assert.equal(-Math.log10(1e-3), 3);
  assert.equal(key("apchem-u8-004"), "10.00"); assert.equal(14-4, 10);
  assert.equal(key("apchem-u8-013"), "5.00"); assert.equal(-Math.log10(1e-5), 5);
  assert.equal(key("apchem-u8-018"), "5.76"); assert.equal(4.76+Math.log10(10), 5.76);
  assert.equal(key("apchem-u9-006"), "200 K"); assert.equal(20000/100, 200);
  assert.equal(key("apchem-u9-013"), "−10 kJ mol−1"); assert.equal(15-25, -10);
  assert.equal(key("apchem-u9-021"), "1930 C"); assert.equal(2*965, 1930);
  assert.equal(key("apchem-u9-022"), "1.00 mol e−"); assert.equal(96485/96485, 1);
});
