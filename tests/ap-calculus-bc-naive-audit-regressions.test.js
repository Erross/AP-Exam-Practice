const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const { AP_SUBJECTS } = require("../js/subjects");

const subject = AP_SUBJECTS.find((x) => x.id === "ap-calculus-bc");
const catalog = fs.readFileSync("js/catalog.js", "utf8");
const app = fs.readFileSync("js/app.js", "utf8");

test("Calculus BC naive audit exposes the May 2027 Section I preflight facts", () => {
  assert.equal(subject.mcqCount, 42);
  assert.equal(subject.mcqTimeMinutes, 100);
  assert.equal(subject.totalExamTimeLabel, "3h 10m");
  assert.deepEqual(subject.examParts.parts, [
    { value:false, label:"Part A — Calculator not permitted", timeMinutes:62 },
    { value:true, label:"Part B — Graphing calculator required", timeMinutes:38 },
  ]);
  assert.deepEqual(subject.attributeRanges.calculatorAllowed, { false:[29,29], true:[13,13] });

  assert.match(catalog, /Timed Section I multiple-choice practice/);
  assert.match(catalog, /\$\{subject\.mcqCount\} multiple-choice questions · \$\{subject\.mcqTimeMinutes\} minutes/);
  assert.match(catalog, /Calculator rules change by part; see the timed-part details above/);
  assert.match(catalog, /saved in this browser session/);
  assert.match(catalog, /timer starts only after you choose Start timed practice/i);
  assert.match(catalog, /← Back to subjects/);
  assert.match(catalog, /Start timed practice →/);
});

test("Calculus BC exam runtime retains generic timed-part transition and lock behavior", () => {
  assert.match(app, /computePartBoundaries\(subject, state\.questions\)/);
  assert.match(app, /state\.partIndex/);
  assert.match(app, /showPartTransitionBanner/);
  assert.match(app, /Earlier questions are locked and can no longer be viewed or changed/);
  assert.match(app, /part\.timeMinutes \* 60 \* 1000/);
  assert.match(app, /isPartLocked/);
});
