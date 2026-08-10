const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { AP_SUBJECTS } = require("../js/subjects");
const { drawExam, shuffleQuestionOptions } = require("../js/draw");

function loadBiologyBank() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync("data/ap-biology.js", "utf8"), sandbox);
  return sandbox.window.QUESTIONS_AP_BIOLOGY;
}

const subject = AP_SUBJECTS.find((item) => item.id === "ap-biology");
const bank = loadBiologyBank();
const expectedTopicCounts = [7, 10, 5, 6, 5, 8, 12, 7];
const allowedSkills = new Set([
  "1.A", "1.B", "1.C", "2.A", "2.B", "2.C", "2.D",
  "3.A", "3.B", "3.C", "3.D", "4.A", "4.B", "5.A", "5.B",
  "5.C", "5.D", "6.A", "6.B", "6.C", "6.D", "6.E",
]);

test("Biology bank covers the complete CED topic framework with valid metadata", () => {
  assert.equal(bank.length, 120);
  assert.equal(subject.releaseStatus, "draft", "Biology must remain draft during content review");
  assert.equal(subject.formatVerified, true);
  assert.deepEqual(subject.stimulusSetRange, [4, 8]);

  const ids = new Set();
  const topicCodes = new Set();
  const practiceFamilies = new Set();
  const validUnits = new Set(subject.units.map((unit) => unit.id));

  bank.forEach((question) => {
    assert.match(question.id, /^apbio-u[1-8]-\d{3}$/);
    assert.ok(!ids.has(question.id), `duplicate id ${question.id}`);
    ids.add(question.id);
    assert.ok(validUnits.has(question.unit), `${question.id}: invalid unit`);
    assert.match(question.topicCode, new RegExp(`^${question.unit.slice(1)}\\.\\d+$`));
    topicCodes.add(question.topicCode);
    assert.ok(allowedSkills.has(question.skill), `${question.id}: invalid science skill ${question.skill}`);
    practiceFamilies.add(question.skill.split(".")[0]);
    assert.equal(question.type, "s");
    assert.equal(question.o.length, 4);
    assert.equal(question.c.length, 1);
    assert.ok(Number.isInteger(question.c[0]) && question.c[0] >= 0 && question.c[0] < 4);
    assert.ok(question.q.length >= 20, `${question.id}: stem is too short`);
    assert.ok(question.e.length >= 20, `${question.id}: explanation is too short`);
  });

  expectedTopicCounts.forEach((count, unitIndex) => {
    const unit = unitIndex + 1;
    for (let topic = 1; topic <= count; topic++) {
      assert.ok(topicCodes.has(`${unit}.${topic}`), `missing CED topic ${unit}.${topic}`);
    }
  });
  assert.deepEqual([...practiceFamilies].sort(), ["1", "2", "3", "4", "5", "6"]);
  subject.units.forEach((unit) => {
    assert.equal(bank.filter((question) => question.unit === unit.id).length, 15);
  });
});

test("Biology stimulus sets are complete, neutral, and usable at exam size", () => {
  const groups = new Map();
  bank.filter((question) => question.stimulusGroupId).forEach((question) => {
    if (!groups.has(question.stimulusGroupId)) groups.set(question.stimulusGroupId, []);
    groups.get(question.stimulusGroupId).push(question);
  });
  assert.equal(groups.size, 8);

  for (const [groupId, questions] of groups) {
    assert.equal(questions.length, 5, `${groupId}: Biology sets should contain 5 items`);
    assert.equal(new Set(questions.map((question) => question.unit)).size, 1);
    assert.equal(new Set(questions.map((question) => question.stimulus)).size, 1);
    const stimulus = questions[0].stimulus;
    assert.ok(["quantitative", "visual"].includes(stimulus.type));
    assert.match(stimulus.source, /Original/);
    if (stimulus.type === "visual") {
      assert.ok(fs.existsSync(stimulus.image), `${groupId}: missing visual asset`);
      assert.ok(stimulus.alt.length >= 60, `${groupId}: visual requires meaningful alt text`);
      assert.doesNotMatch(stimulus.alt, /correct answer|therefore|proves that/i);
    } else {
      assert.ok(stimulus.columns.length >= 2);
      assert.ok(stimulus.rows.length >= 3);
    }
  }
});

test("Biology answer construction does not expose systematic key tells", () => {
  const wordCount = (text) => text.trim().split(/\s+/).length;
  let uniqueLongest = 0;
  let amongLongest = 0;
  let correctWords = 0;
  let distractorWords = 0;

  bank.forEach((question) => {
    const lengths = question.o.map(wordCount);
    const longest = Math.max(...lengths);
    const correctLength = lengths[question.c[0]];
    if (correctLength === longest) amongLongest++;
    if (correctLength === longest && lengths.filter((length) => length === longest).length === 1) uniqueLongest++;
    correctWords += correctLength;
    lengths.forEach((length, index) => { if (index !== question.c[0]) distractorWords += length; });

    const shuffled = shuffleQuestionOptions(question);
    assert.equal(shuffled.o[shuffled.c[0]], question.o[question.c[0]]);
  });

  const correctAverage = correctWords / bank.length;
  const distractorAverage = distractorWords / (bank.length * 3);
  assert.ok(uniqueLongest / bank.length <= 0.25);
  assert.ok(amongLongest / bank.length <= 0.58);
  assert.ok(Math.abs(correctAverage - distractorAverage) / distractorAverage <= 0.12);
  for (let position = 0; position < 4; position++) {
    assert.equal(bank.filter((question) => question.c[0] === position).length, 30);
  }
});

test("every Biology draw satisfies unit weights and whole-set composition", () => {
  const expectedUnits = { U1: 6, U2: 7, U3: 8, U4: 8, U5: 6, U6: 8, U7: 10, U8: 7 };
  for (let attempt = 0; attempt < 2000; attempt++) {
    const drawn = drawExam(subject, bank);
    assert.equal(drawn.length, 60);
    assert.deepEqual(
      Object.fromEntries(subject.units.map((unit) => [unit.id, drawn.filter((q) => q.unit === unit.id).length])),
      expectedUnits
    );

    const groups = new Set(drawn.filter((question) => question.stimulusGroupId).map((question) => question.stimulusGroupId));
    assert.ok(groups.size >= 4 && groups.size <= 8);
    groups.forEach((groupId) => {
      assert.equal(
        drawn.filter((question) => question.stimulusGroupId === groupId).length,
        bank.filter((question) => question.stimulusGroupId === groupId).length,
        `${groupId}: stimulus set was split`
      );
    });
  }
});
