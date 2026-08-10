const fs = require("node:fs");
const assert = require("node:assert/strict");
const { AP_SUBJECTS } = require("../js/subjects");

assert.ok(fs.existsSync("_site/index.html"));
const released = AP_SUBJECTS.filter((subject) => subject.releaseStatus === "released");
const publishedBanks = fs.readdirSync("_site/data").filter((file) => file.endsWith(".js")).sort();
assert.deepEqual(publishedBanks, released.map((subject) => `${subject.id}.js`).sort());
assert.deepEqual(publishedBanks, ["ap-us-government.js"]);
const html = fs.readFileSync("_site/index.html", "utf8");
assert.match(html, /data\/ap-us-government\.js/);
AP_SUBJECTS.filter((subject) => subject.releaseStatus !== "released").forEach((subject) => {
  assert.doesNotMatch(html, new RegExp(`data/${subject.id}\\.js`));
});
console.log("Public artifact contains only explicitly released banks.");
