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

test("preflight exposes timing, parts, calculator details, save behavior, and back navigation", () => {
  assert.match(source, /multiple-choice questions/);
  assert.match(source, /subject\.examParts/);
  assert.match(source, /calculatorExpected/);
  assert.match(source, /saved in this browser session/);
  assert.match(source, /Back to subjects/);
});
