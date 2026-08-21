const fs = require("node:fs");
const assert = require("node:assert/strict");
const test = require("node:test");

const source = fs.readFileSync("js/catalog.js", "utf8");

test("catalog presents the current product value proposition on first load", () => {
  assert.match(source, /Practice AP multiple-choice sections in the format you’ll actually see\./);
  assert.match(source, /current AP question counts, timing, weighting, skills, and stimulus sets/);
  assert.match(source, /Free, original, unofficial/);
  assert.match(source, /no account required/);
  assert.match(source, /Progress stays in this browser/);
  assert.match(source, /released AP courses are ready for timed practice now/);
  assert.match(source, /Audio-dependent AP courses are outside the current scope/);
  assert.match(source, /updateHeroCopy\(\)/);
});
