const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const { loadEffectiveSubjects } = require("./effective-subjects");

const AP_SUBJECTS = loadEffectiveSubjects();
assert.ok(fs.existsSync("_site/index.html"));
assert.ok(fs.existsSync("_site/about.html"));
assert.ok(fs.existsSync("_site/official-sources.html"));
const released = AP_SUBJECTS.filter((subject) => subject.releaseStatus === "released");
const releasedIds = new Set(released.map((subject) => subject.id));
const sourceHtml = fs.readFileSync("index.html", "utf8");
const builtHtml = fs.readFileSync("_site/index.html", "utf8");
const builtSourcesHtml = fs.readFileSync("_site/official-sources.html", "utf8");
const clockTimePattern = /\b\d{1,2}:\d{2}(?::\d{2})?\b|T\d{2}:\d{2}/;

assert.match(builtHtml, /href="official-sources\.html"/);
assert.match(builtSourcesHtml, /Official AP standards & sources/);
assert.match(builtSourcesHtml, /August 21, 2026/);
assert.doesNotMatch(builtSourcesHtml, /\b(?:AM|PM|CDT|UTC)\b/);
assert.doesNotMatch(builtSourcesHtml, clockTimePattern);

const sourceDataScripts = [...sourceHtml.matchAll(/^<script src="(data\/([^"]+)\.js)"><\/script>\s*$/gm)]
  .map((match) => match[1]);

function owningReleasedSubject(source) {
  const filename = path.basename(source, ".js");
  return released.find((subject) => filename === subject.id || filename.startsWith(`${subject.id}-`)) || null;
}

const expectedScripts = sourceDataScripts.filter((source) => owningReleasedSubject(source)).sort();
const publishedScripts = fs.readdirSync("_site/data").filter((file) => file.endsWith(".js"))
  .map((file) => `data/${file}`).sort();

assert.deepEqual(publishedScripts, expectedScripts);
for (const source of expectedScripts) {
  assert.match(builtHtml, new RegExp(source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
}
for (const source of sourceDataScripts.filter((source) => !owningReleasedSubject(source))) {
  assert.doesNotMatch(builtHtml, new RegExp(source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
}

for (const subject of released) {
  assert.ok(expectedScripts.includes(`data/${subject.id}.js`), `${subject.id}: base bank missing from production artifact`);
}

const manifest = JSON.parse(fs.readFileSync("_site/release-manifest.json", "utf8"));
assert.deepEqual([...manifest.releasedSubjects].sort(), [...releasedIds].sort());
assert.deepEqual([...manifest.files].sort(), expectedScripts);
console.log(`Public artifact contains ${released.length} released subject(s), all ${expectedScripts.length} referenced released data layer(s), and the public About/official-source documentation, with draft data excluded.`);
