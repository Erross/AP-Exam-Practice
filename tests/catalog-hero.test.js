const fs = require("node:fs");
const assert = require("node:assert/strict");
const test = require("node:test");

const source = fs.readFileSync("js/catalog.js", "utf8");

test("catalog presents the product value proposition on first load", () => {
  assert.match(source, /Practice AP exams in the format you’ll actually see\./);
  assert.match(source, /current AP formats/);
  assert.match(source, /unit weighting/);
  assert.match(source, /skills, and stimulus sets/);
  assert.match(source, /Free, original questions/);
  assert.match(source, /no account required/);
  assert.match(source, /Saves locally in your browser/);
  assert.match(source, /updateHeroCopy\(\)/);
});
