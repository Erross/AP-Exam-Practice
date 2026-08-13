const fs = require("node:fs");
const assert = require("node:assert/strict");
const test = require("node:test");

test("Pages build versions Phase 7 catalog assets", () => {
  const build = fs.readFileSync("tools/build.js", "utf8");
  assert.match(build, /phase7-20260813/);
});
