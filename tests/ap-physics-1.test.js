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
