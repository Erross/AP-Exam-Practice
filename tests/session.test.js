const test = require("node:test");
const assert = require("node:assert/strict");
const { AP_SUBJECTS } = require("../js/subjects");
const { drawExam, shuffleQuestionOptions } = require("../js/draw");
const { validateSavedSession } = require("../js/session");
const { loadGovernmentBank } = require("./helpers");

const subject = AP_SUBJECTS.find((item) => item.id === "ap-us-government");
const bank = loadGovernmentBank();
const now = Date.now();

function validPayload() {
  const questions = drawExam(subject, bank).map((question) => {
    const shuffled = shuffleQuestionOptions(question);
    return { id: question.id, optionOrder: shuffled.order };
  });
  return { v: 2, subjectId: subject.id, createdAt: now - 1000, endsAt: now + 60_000, current: 0, questions, answers: { 0: 1 }, flagged: [1], struckOut: { 2: [0, 3] } };
}

test("valid session state reconstructs from canonical bank content", () => {
  const restored = validateSavedSession(validPayload(), subject, bank, now);
  assert.ok(restored);
  assert.equal(restored.questions.length, 55);
  assert.equal(restored.answers[0], 1);
  assert.ok(restored.flagged.has(1));
});

test("corrupt and future-dated session state is rejected", () => {
  const mutations = [
    (p) => (p.createdAt = now + 61_000),
    (p) => (p.endsAt = p.createdAt + subject.mcqTimeMinutes * 60_000 + 2_000),
    (p) => p.questions.push(p.questions[0]),
    (p) => (p.questions[0].optionOrder = [0, 0, 1, 2]),
    (p) => (p.questions[0].id = "not-in-bank"),
    (p) => (p.current = 55),
    (p) => (p.answers = { 0: 9 }),
    (p) => (p.flagged = [1, 1]),
    (p) => (p.struckOut = { 2: [4] }),
  ];
  mutations.forEach((mutate) => {
    const payload = validPayload();
    mutate(payload);
    assert.equal(validateSavedSession(payload, subject, bank, now), null);
  });
});
