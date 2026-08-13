const fs = require("node:fs");
const assert = require("node:assert/strict");
const test = require("node:test");
const { parseArgs, dataScriptsForSubject } = require("../tools/subject-release-audit");

test("subject release audit parses explicit trial counts", () => {
  const args = parseArgs(["--subject", "ap-statistics", "--trials", "5000", "--overlap-trials", "4000", "--json"]);
  assert.equal(args.subjectId, "ap-statistics");
  assert.equal(args.trials, 5000);
  assert.equal(args.overlapTrials, 4000);
  assert.equal(args.json, true);
});

test("subject release audit discovers effective browser layers in index order", () => {
  const tag = (src) => `<script src="${src}"></script>`;
  const html = [tag("data/ap-chemistry.js"), tag("data/ap-chemistry-curation.js"), tag("data/ap-biology.js"), tag("data/ap-chemistry-quality-fixes.js?v=2")].join("\n");
  assert.deepEqual(dataScriptsForSubject("ap-chemistry", html), [
    "data/ap-chemistry.js",
    "data/ap-chemistry-curation.js",
    "data/ap-chemistry-quality-fixes.js",
  ]);
});

test("release checklist preserves independent and naive audit gates", () => {
  const checklist = fs.readFileSync("SUBJECT_RELEASE_CHECKLIST.md", "utf8");
  assert.match(checklist, /Clean-room independent audit/);
  assert.match(checklist, /Naive assessor gate/);
  assert.match(checklist, /new naive assessor/i);
  assert.match(checklist, /releaseStatus.*draft.*released/s);
  assert.match(checklist, /GitHub Pages workflow completes/);
});
