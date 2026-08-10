const fs = require("node:fs");
const assert = require("node:assert/strict");
const { AP_SUBJECTS } = require("../js/subjects");

assert.ok(fs.existsSync("_site/index.html"));
const released = AP_SUBJECTS.filter((subject) => subject.releaseStatus === "released");
const publishedBanks = fs.readdirSync("_site/data").filter((file) => file.endsWith(".js")).sort();
const expectedBanks = released.map((subject) => `${subject.id}.js`).sort();
assert.deepEqual(publishedBanks, expectedBanks);
const html = fs.readFileSync("_site/index.html", "utf8");
released.forEach((subject) => {
  assert.match(html, new RegExp(`data/${subject.id}\\.js`));
});
AP_SUBJECTS.filter((subject) => subject.releaseStatus !== "released").forEach((subject) => {
  assert.doesNotMatch(html, new RegExp(`data/${subject.id}\\.js`));
});
const manifest = JSON.parse(fs.readFileSync("_site/release-manifest.json", "utf8"));
assert.deepEqual([...manifest.releasedSubjects].sort(), released.map((subject) => subject.id).sort());
assert.deepEqual([...manifest.files].sort(), expectedBanks.map((file) => `data/${file}`).sort());
console.log("Public artifact contains only explicitly released banks.");
