const fs = require("node:fs");
const assert = require("node:assert/strict");
const test = require("node:test");
const { parseArgs, dataScriptsForSubject, auditGenericContent } = require("../tools/subject-release-audit");

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

test("four-way option-length ties are not counted as an exploitable longest-answer cue", () => {
  const subject = { id:"tie-fixture", formatVerified:true, mcqCount:4, units:[] };
  const rationale = "This deliberately long fixture rationale exists only to satisfy the generic release-quality minimum while testing option-length statistics.";
  const bank = Array.from({ length:4 }, (_, key) => ({
    id:`tie-${key}`, unit:null, type:"s", topicCode:`T${key}`, q:"Which option belongs to this synthetic audit fixture question?",
    o:["alpha beta", "gamma delta", "theta kappa", "sigma omega"], c:[key], e:rationale,
  }));
  const result = auditGenericContent(subject, bank);
  assert.equal(result.uniqueLongestShare, 0);
  assert.equal(result.amongLongestShare, 0, "a four-way tie cannot tell a student which answer is correct");
});

test("release checklist preserves independent and naive audit gates", () => {
  const checklist = fs.readFileSync("SUBJECT_RELEASE_CHECKLIST.md", "utf8");
  assert.match(checklist, /Clean-room independent audit/);
  assert.match(checklist, /Naive assessor gate/);
  assert.match(checklist, /new naive assessor/i);
  assert.match(checklist, /releaseStatus.*draft.*released/s);
  assert.match(checklist, /GitHub Pages workflow completes/);
});
