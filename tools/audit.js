const assert = require("node:assert/strict");
const fs = require("node:fs");
const { AP_SUBJECTS } = require("../js/subjects");
const { loadGovernmentBank } = require("../tests/helpers");

const bank = loadGovernmentBank();
const subject = AP_SUBJECTS.find((item) => item.id === "ap-us-government");
const validUnits = new Set(subject.units.map((unit) => unit.id));
const ids = new Set();
const topicCodes = new Set();
const groupMap = new Map();

bank.forEach((question) => {
  assert.match(question.id, /^apgov-u[1-5]-\d{3}$/);
  assert.ok(!ids.has(question.id), `duplicate id ${question.id}`);
  ids.add(question.id);
  assert.ok(validUnits.has(question.unit), `${question.id}: invalid unit`);
  assert.equal(question.type, "s", `${question.id}: AP Government items must be single-select`);
  assert.equal(question.o.length, 4, `${question.id}: expected four options`);
  assert.equal(question.c.length, 1, `${question.id}: expected one correct answer`);
  assert.ok(Number.isInteger(question.c[0]) && question.c[0] >= 0 && question.c[0] < 4);
  assert.ok(question.q.length >= 20 && question.e.length >= 20);
  assert.match(question.topicCode, new RegExp(`^${question.unit.slice(1)}\\.\\d+$`));
  assert.ok(["1", "2", "3", "4"].includes(question.skill), `${question.id}: invalid MCQ skill`);
  topicCodes.add(question.topicCode);
  if (question.stimulusGroupId) {
    assert.ok(question.stimulus && question.stimulus.type);
    if (!groupMap.has(question.stimulusGroupId)) groupMap.set(question.stimulusGroupId, []);
    groupMap.get(question.stimulusGroupId).push(question);
  }
});

const expectedTopics = {
  U1: 9, U2: 15, U3: 13, U4: 10, U5: 13,
};
Object.entries(expectedTopics).forEach(([unit, count]) => {
  for (let number = 1; number <= count; number++) {
    assert.ok(topicCodes.has(`${unit.slice(1)}.${number}`), `missing CED topic ${unit.slice(1)}.${number}`);
  }
});

const groupCounts = { quantitative: 0, foundational: 0, text: 0, visual: 0 };
for (const [groupId, questions] of groupMap) {
  assert.equal(new Set(questions.map((q) => q.unit)).size, 1, `${groupId}: groups may not cross units`);
  assert.equal(new Set(questions.map((q) => q.stimulus)).size, 1, `${groupId}: stimulus object mismatch`);
  const type = questions[0].stimulus.type === "document" ? "foundational" : questions[0].stimulus.type;
  groupCounts[type]++;
  if (type === "quantitative") {
    assert.ok(questions.length >= 2 && questions.length <= 3, `${groupId}: quantitative sets require 2-3 items`);
    assert.match(questions[0].stimulus.source, /^https?:|https?:\/\//);
    assert.ok(!/illustrative|approximate typical/i.test(questions[0].stimulus.source));
  } else if (type === "visual") {
    assert.equal(questions.length, 2, `${groupId}: visual sets require two items`);
    assert.ok(fs.existsSync(questions[0].stimulus.image), `${groupId}: image asset missing`);
    assert.ok(questions[0].stimulus.alt.length >= 20, `${groupId}: meaningful alt text required`);
  } else {
    assert.ok(questions.length >= 3 && questions.length <= 4, `${groupId}: text sets require 3-4 items`);
  }
}
assert.ok(groupCounts.quantitative >= 5);
assert.ok(groupCounts.foundational >= 1);
assert.ok(groupCounts.text >= 1);
assert.ok(groupCounts.visual >= 3);

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
});
const correctAverage = correctWords / bank.length;
const distractorAverage = distractorWords / (bank.length * 3);
assert.ok(uniqueLongest / bank.length <= 0.25, "correct answer is too often uniquely longest");
assert.ok(amongLongest / bank.length <= 0.58, "correct answer is too often among the longest options");
assert.ok(Math.abs(correctAverage - distractorAverage) / distractorAverage <= 0.12, "correct/distractor length imbalance is too large");

const sourceKeys = bank.map((q) => q.c[0]);
for (let position = 0; position < 4; position++) {
  const share = sourceKeys.filter((key) => key === position).length / sourceKeys.length;
  assert.ok(share >= 0.15 && share <= 0.35, `raw answer position ${position} is imbalanced (${share})`);
}

console.log(`Government bank audit passed: ${bank.length} questions, ${groupMap.size} stimulus groups, all 60 CED topics covered.`);
console.log(`Answer-pattern audit: uniquely longest ${(100 * uniqueLongest / bank.length).toFixed(1)}%; correct ${correctAverage.toFixed(2)} words vs distractors ${distractorAverage.toFixed(2)}.`);
