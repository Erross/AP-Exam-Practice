const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const { AP_SUBJECTS } = require("../js/subjects");

const subject = AP_SUBJECTS.find((item) => item.id === "ap-physics-1");
const catalog = fs.readFileSync("js/catalog.js", "utf8");
const about = fs.readFileSync("about.html", "utf8");

test("Physics 1 student-facing preflight exposes the May 2027 exam-critical facts", () => {
  assert.equal(subject.mcqCount, 42);
  assert.equal(subject.mcqTimeMinutes, 85);
  assert.equal(subject.totalExamTimeLabel, "3h 0m");
  assert.equal(subject.calculatorAllowed, true);
  assert.equal(subject.freeResponse.timeMinutes, 95);
  assert.match(subject.tierNote, /calculators are permitted throughout this practice section/i);
  assert.match(catalog, /Calculator expected\/permitted throughout this practice section\./);
  assert.match(catalog, /saved in this browser session/);
  assert.match(catalog, /timer starts only after you choose Start timed practice/i);
  assert.match(catalog, /Back to subjects/);
  assert.match(about, /currently an MCQ-only practice site/i);
  assert.match(about, /does not provide free-response questions/i);
});
