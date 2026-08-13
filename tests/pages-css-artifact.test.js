const fs = require("node:fs");
const assert = require("node:assert/strict");
const test = require("node:test");

test("Pages build publishes every root stylesheet and versions Phase 7 assets", () => {
  const build = fs.readFileSync("tools/build.js", "utf8");
  assert.match(build, /endsWith\("\.css"\)/);
  assert.match(build, /course-cards\.css\?v=/);
  assert.match(build, /js\/catalog\.js\?v=/);
});
