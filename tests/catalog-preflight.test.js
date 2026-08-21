const fs = require("node:fs");
const assert = require("node:assert/strict");
const test = require("node:test");

const source = fs.readFileSync("js/catalog.js", "utf8");

test("catalog installs a pre-exam confirmation wrapper", () => {
  assert.match(source, /screen-preflight/);
  assert.match(source, /Start timed practice/);
  assert.match(source, /beginExam = window\.startExam/);
  assert.match(source, /window\.startExam = showPreflight/);
});

test("timer cannot start until the confirmation action invokes the original starter", () => {
  const wrapperIndex = source.indexOf("window.startExam = showPreflight");
  const confirmIndex = source.indexOf("beginExam(subject)");
  assert.ok(wrapperIndex >= 0, "startExam wrapper missing");
  assert.ok(confirmIndex >= 0, "confirmation action does not invoke original starter");
  assert.equal((source.match(/beginExam\(subject\)/g) || []).length, 1,
    "original exam starter should only be called from one confirmation path");
});

test("preflight exposes format, controls, consequences, and accurate save behavior", () => {
  assert.match(source, /multiple-choice questions/);
  assert.match(source, /subject\.examParts/);
  assert.match(source, /calculatorExpected/);
  assert.match(source, /questions require selecting two answers/);
  assert.match(source, /timer starts only when you choose Start timed practice/i);
  assert.match(source, /cross out options with ×/i);
  assert.match(source, /permanently locks earlier questions/i);
  assert.match(source, /Unanswered or incomplete questions are scored incorrect/i);
  assert.match(source, /saved for this browser tab\/session/i);
  assert.match(source, /no cross-device or long-term storage/i);
  assert.match(source, /Back to subjects/);
});
