const fs = require("node:fs");
const assert = require("node:assert/strict");
const test = require("node:test");

test("Pages build versions current catalog assets", () => {
  const build = fs.readFileSync("tools/build.js", "utf8");
  assert.match(build, /const assetVersion = "ui-20260813"/);
  assert.match(build, /course-cards\.css\?v=/);
  assert.match(build, /js\/catalog\.js\?v=/);
});
