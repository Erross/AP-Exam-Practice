const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { AP_SUBJECTS } = require("../js/subjects");

const subject = AP_SUBJECTS.find((item) => item.id === "ap-physics-1");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync("data/ap-physics-1.js", "utf8"), sandbox);
const bank = sandbox.window.QUESTIONS_AP_PHYSICS_1;

test("AP Physics 1 metadata matches the May 2027 clarified exam", () => {
  assert.equal(subject.releaseStatus, "draft");
  assert.equal(subject.formatVerified, true);
  assert.equal(subject.mcqCount, 42);
  assert.equal(subject.mcqTimeMinutes, 85);
  assert.equal(subject.totalExamTimeLabel, "3h 0m");
  assert.equal(subject.calculatorAllowed, true);
  assert.equal(subject.freeResponse.timeMinutes, 95);
  assert.deepEqual(subject.units.map((unit) => unit.id), ["U1","U2","U3","U4","U5","U6","U7","U8"]);
  assert.deepEqual(subject.units.map((unit) => unit.examWeight * 42), [5,8,8,5,5,3,3,5]);
  assert.deepEqual(subject.attributeRanges.skill, {
    "2.A": [7,8], "2.B": [9,10], "2.C": [5,6],
    "2.D": [5,6], "3.B": [9,10], "3.C": [3,4],
  });
});

test("the in-progress Physics 1 bank uses only MCQ-assessed skills and sound schema", () => {
  const allowed = new Set(["2.A","2.B","2.C","2.D","3.B","3.C"]);
  const ids = new Set();
  for (const question of bank) {
    assert.match(question.id, /^apphys1-u[1-8]-\d{3}$/);
    assert.ok(!ids.has(question.id), `duplicate id ${question.id}`);
    ids.add(question.id);
    assert.ok(allowed.has(question.skill), `${question.id}: ${question.skill} is not assessed in MCQ`);
    assert.equal(question.type, "s");
    assert.equal(question.o.length, 4);
    assert.equal(question.c.length, 1);
    assert.ok(question.e.length >= 90, `${question.id}: rationale is too short`);
  }
});

test("the current build covers the exact CED topic inventory for Units 1 through 4", () => {
  const expected = {
    U1: ["1.1","1.2","1.3","1.4","1.5"],
    U2: ["2.1","2.2","2.3","2.4","2.5","2.6","2.7","2.8","2.9"],
    U3: ["3.1","3.2","3.3","3.4","3.5"],
    U4: ["4.1","4.2","4.3","4.4"],
  };
  assert.equal(bank.length, 77);
  assert.deepEqual(
    Object.fromEntries(Object.keys(expected).map((unit) => [unit, bank.filter((question) => question.unit === unit).length])),
    { U1: 15, U2: 27, U3: 20, U4: 15 },
  );
  for (const [unit, topics] of Object.entries(expected)) {
    const found = [...new Set(bank.filter((question) => question.unit === unit).map((question) => question.topicCode))].sort();
    assert.deepEqual(found, topics, `${unit}: exact CED topic set changed`);
    for (const topic of topics) {
      assert.ok(bank.filter((question) => question.topicCode === topic).length >= 3, `${topic}: fewer than three variants`);
    }
  }
});

test("selected Unit 1 through 4 quantitative answers independently recompute", () => {
  const answer = (id) => {
    const question = bank.find((item) => item.id === id);
    assert.ok(question, `missing quantitative anchor ${id}`);
    return question.o[question.c[0]];
  };
  assert.equal(answer("apphys1-u1-002"), `${5 - (-3) > 0 ? "+" : ""}${5 - (-3)} m`);
  assert.equal(answer("apphys1-u1-005"), `${(10 - 4) / 3} m/s^2 east`);
  assert.equal(answer("apphys1-u1-014"), `${6 * 2} m`);
  assert.equal(answer("apphys1-u2-002"), `x = ${(1 * 0 + 3 * 4) / (1 + 3)} m`);
  assert.equal(answer("apphys1-u2-014"), `${(30 - 12) / 6} m/s^2 right`);
  assert.equal(answer("apphys1-u2-017"), `${5 * 9.8} N downward`);
  assert.equal(answer("apphys1-u2-020"), `${(0.2 * 10 * 9.8).toFixed(1)} N`);
  assert.equal(answer("apphys1-u2-023"), `${200 * 0.05} N`);
  assert.equal(answer("apphys1-u2-026"), `${2 * 6 ** 2 / 3} N`);
  assert.equal(answer("apphys1-u3-002"), `${0.5 * 4 * 3 ** 2} J`);
  assert.equal(answer("apphys1-u3-006"), `${20 * 5} J`);
  assert.equal(answer("apphys1-u3-010"), `${2 * 9.8 * 5} J`);
  assert.equal(answer("apphys1-u3-018"), `${1200 / 4} W`);
  assert.equal(answer("apphys1-u4-002"), `${3 * 4} kg*m/s east`);
  assert.equal(answer("apphys1-u4-005"), `${(10 * 0.3).toFixed(1)} N*s`);
  assert.equal(answer("apphys1-u4-008"), `${2 * 3 / (2 + 1)} m/s right`);
});
