const fs = require("node:fs");
const assert = require("node:assert/strict");
const test = require("node:test");

const app = fs.readFileSync("js/app.js", "utf8");

test("multi-part exams prevent accidental whole-exam submission before the final part", () => {
  assert.match(app, /submitBtn\.hidden = !finalPart/);
  assert.match(app, /Finish \$\{part\.label\} and lock answers →/);
  assert.match(app, /You won't be able to return to \$\{part\.label\} questions/);
});

test("submission consequences are explicit", () => {
  assert.match(app, /Any unanswered or incomplete questions will be scored incorrect/);
  assert.match(app, /you can't change answers after submission/);
});

test("navigator distinguishes incomplete multi-select answers from completed answers", () => {
  assert.match(app, /expectedSelections = state\.questions\[i\]/);
  assert.match(app, /selectedCount === expectedSelections/);
  assert.match(app, /incomplete, \$\{selectedCount\} of \$\{expectedSelections\} selections made/);
});
