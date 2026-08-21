const fs = require("node:fs");
const assert = require("node:assert/strict");
const test = require("node:test");
const { loadEffectiveSubjects } = require("../tools/effective-subjects");

const readme = fs.readFileSync("README.md", "utf8");
const plan = fs.readFileSync("PLAN.md", "utf8");
const index = fs.readFileSync("index.html", "utf8");
const about = fs.readFileSync("about.html", "utf8");
const officialSources = fs.readFileSync("OFFICIAL_AP_SOURCES.md", "utf8");
const officialSourcesPage = fs.readFileSync("official-sources.html", "utf8");
const catalog = fs.readFileSync("js/catalog.js", "utf8");
const build = fs.readFileSync("tools/build.js", "utf8");
const evidenceReadme = fs.readFileSync("release-evidence/README.md", "utf8");
const subjects = loadEffectiveSubjects();
const released = subjects.filter((subject) => subject.releaseStatus === "released");
const outsideScope = subjects.filter((subject) => subject.tier === 2);
const verificationDate = "August 21, 2026";

test("documentation release count matches effective metadata", () => {
  assert.equal(released.length, 29);
  assert.match(readme, new RegExp(`\\*\\*${released.length} released AP courses\\*\\*`));
  assert.match(plan, new RegExp(`\\*\\*${released.length} released courses\\*\\*`));
  assert.match(about, new RegExp(`<strong>${released.length} released AP courses</strong>`));
  assert.doesNotMatch(readme, /eleven released AP courses/i);
  assert.doesNotMatch(plan, /Goal 1: Framework/i);
});

test("root markdown no longer presents bootstrap-era state as current", () => {
  const stalePatterns = [
    /current production catalog contains eleven released AP courses/i,
    /both subjects built so far/i,
    /Goal 1: Framework/i,
    /every subject ships with an empty question bank/i,
  ];
  for (const filename of fs.readdirSync(".").filter((name) => name.endsWith(".md"))) {
    const content = fs.readFileSync(filename, "utf8");
    for (const pattern of stalePatterns) {
      assert.doesNotMatch(content, pattern, `${filename} contains obsolete bootstrap-era documentation`);
    }
  }
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

test("every released course has a dated official College Board source pair", () => {
  assert.match(officialSources, new RegExp(verificationDate));
  assert.match(officialSourcesPage, new RegExp(verificationDate));
  assert.match(officialSources, /2026–27 course year \/ May 2027 AP exams/);
  assert.match(officialSourcesPage, /2026–27 course year \/ May 2027 AP exams/);
  assert.doesNotMatch(officialSources, /\b(?:AM|PM|CDT|UTC)\b/);
  assert.doesNotMatch(officialSourcesPage, /\b(?:AM|PM|CDT|UTC)\b/);
  assert.doesNotMatch(about, /\b(?:AM|PM|CDT|UTC)\b/);

  const markdownCourseLinks = officialSources.match(/\[Course \/ CED\]\(https:\/\/apcentral\.collegeboard\.org\/courses\/[^)]+\)/g) || [];
  const markdownExamLinks = officialSources.match(/\[Exam format\]\(https:\/\/apcentral\.collegeboard\.org\/courses\/[^)]+\/exam\)/g) || [];
  assert.equal(markdownCourseLinks.length, released.length);
  assert.equal(markdownExamLinks.length, released.length);

  for (const subject of released) {
    assert.match(officialSources, new RegExp(`\\| ${subject.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} \\|`));
    assert.match(officialSourcesPage, new RegExp(`<tr><td>${subject.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</td>`));
  }
});

test("official source documentation is part of the published site", () => {
  assert.match(build, /copy\("official-sources\.html"\)/);
  assert.match(build, /Official AP sources/);
  assert.match(about, /href="official-sources\.html"/);
  assert.match(officialSourcesPage, /College Board master AP Courses and Exams catalog/);
  assert.match(officialSourcesPage, /class="skip-link"/);
  assert.match(readme, /OFFICIAL_AP_SOURCES\.md/);
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
  assert.match(about, /stored locally for the current browser tab\/session/i);
  assert.match(about, /does not provide cross-device or long-term cloud saving/i);
});
