const test = require("node:test");
const assert = require("node:assert/strict");
const { AP_SUBJECTS } = require("../js/subjects");
const { drawExam, shuffleQuestionOptions } = require("../js/draw");
const { loadGovernmentBank } = require("./helpers");

const subject = AP_SUBJECTS.find((item) => item.id === "ap-us-government");
const bank = loadGovernmentBank();

test("every Government draw satisfies the unit and stimulus blueprints", () => {
  for (let attempt = 0; attempt < 2000; attempt++) {
    const drawn = drawExam(subject, bank);
    assert.equal(drawn.length, 55);
    assert.deepEqual(
      Object.fromEntries(subject.units.map((unit) => [unit.id, drawn.filter((q) => q.unit === unit.id).length])),
      { U1: 10, U2: 17, U3: 8, U4: 7, U5: 13 }
    );
    const groups = new Map();
    drawn.filter((q) => q.stimulusGroupId).forEach((q) => {
      if (!groups.has(q.stimulusGroupId)) groups.set(q.stimulusGroupId, []);
      groups.get(q.stimulusGroupId).push(q);
    });
    const counts = { quantitative: 0, foundational: 0, text: 0, visual: 0 };
    for (const questions of groups.values()) {
      const type = questions[0].stimulus.type === "document" ? "foundational" : questions[0].stimulus.type;
      counts[type]++;
      const bankGroupSize = bank.filter((q) => q.stimulusGroupId === questions[0].stimulusGroupId).length;
      assert.equal(questions.length, bankGroupSize, "a stimulus group was split");
    }
    assert.deepEqual(counts, { quantitative: 5, foundational: 1, text: 1, visual: 3 });
    assert.ok(55 - drawn.filter((q) => q.stimulusGroupId).length >= 29);
    assert.ok(55 - drawn.filter((q) => q.stimulusGroupId).length <= 32);
  }
});

test("option shuffling preserves exactly one correct answer", () => {
  bank.forEach((question) => {
    const shuffled = shuffleQuestionOptions(question);
    assert.equal(shuffled.o.length, 4);
    assert.equal(shuffled.c.length, 1);
    assert.deepEqual([...shuffled.order].sort((a, b) => a - b), [0, 1, 2, 3]);
    assert.equal(shuffled.o[shuffled.c[0]], question.o[question.c[0]]);
  });
});

test("undersized banks and incomplete stimulus blueprints fail explicitly", () => {
  assert.throws(() => drawExam(subject, bank.slice(0, 54)), /required/);
  assert.throws(() => drawExam(subject, bank.filter((q) => q.stimulus?.type !== "visual")), /visual stimulus sets/);
});
