const fs = require("node:fs");
const assert = require("node:assert/strict");
const test = require("node:test");
const { loadEffectiveSubjects } = require("../tools/effective-subjects");

const readme = fs.readFileSync("README.md", "utf8");
const plan = fs.readFileSync("PLAN.md", "utf8");
const index = fs.readFileSync("index.html", "utf8");
const about = fs.readFileSync("about.html", "utf8");
const catalog = fs.readFileSync("js/catalog.js", "utf8");
const evidenceReadme = fs.readFileSync("release-evidence/README.md", "utf8");
const subjects = loadEffectiveSubjects();
const released = subjects.filter((subject) => subject.releaseStatus === "released");
const outsideScope = subjects.filter((subject) => subject.tier === 2);

test("documentation release count matches effective metadata", () => {
  assert.equal(released.length, 29);
  assert.match(readme, new RegExp(`\\*\\*${released.length} released AP courses\\*\\*`));
  assert.match(plan, new RegExp(`\\*\\*${released.length} released courses\\*\\*`));
  assert.match(about, new RegExp(`<strong>${released.length} released AP courses</strong>`));
  assert.doesNotMatch(readme, /eleven released AP courses/i);
  assert.doesNotMatch(plan, /Goal 1: Framework/i);
});

test("all remaining tier-2 courses are described as outside current scope", () => {
  assert.equal(outsideScope.length, 8);
  assert.ok(outsideScope.every((subject) => subject.releaseStatus !== "released"));
  assert.match(readme, /Eight audio-dependent AP courses are \*\*outside the current product scope\*\*/);
  assert.match(index, /Audio-dependent AP courses are outside the current scope/);
  assert.match(about, /Eight audio-dependent AP courses are outside the current scope/);
  assert.match(catalog, /Outside current scope: audio-dependent AP courses/);
  assert.match(catalog, /Audio workflow not currently supported/);
});

test("historical release evidence is labeled as point-in-time evidence", () => {
  assert.match(evidenceReadme, /point-in-time release records/i);
  assert.match(evidenceReadme, /not live product specifications/i);
});

test("front-facing documentation exposes scope and limitations", () => {
  assert.match(index, /Practice AP multiple-choice sections in the format you’ll actually see/);
  assert.match(catalog, /About, scope & limitations/);
  assert.match(about, /multiple-choice practice site/i);
  assert.match(about, /not affiliated with, endorsed by, sponsored by, or reviewed by College Board/i);
  assert.match(about, /stored locally in your browser/i);
});
