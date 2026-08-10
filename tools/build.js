const fs = require("node:fs");
const path = require("node:path");
const { AP_SUBJECTS } = require("../js/subjects");

const out = "_site";
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

function copy(source) {
  const target = path.join(out, source);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

["style.css", "js/subjects.js", "js/draw.js", "js/session.js", "js/app.js"].forEach(copy);
fs.cpSync("assets", path.join(out, "assets"), { recursive: true });

const released = AP_SUBJECTS.filter((subject) => subject.releaseStatus === "released");
released.forEach((subject) => copy(`data/${subject.id}.js`));
const allowedScripts = new Set(released.map((subject) => `data/${subject.id}.js`));
const html = fs.readFileSync("index.html", "utf8").replace(
  /^<script src="(data\/[^"]+)"><\/script>\s*$/gm,
  (line, source) => (allowedScripts.has(source) ? line : "")
);
fs.writeFileSync(path.join(out, "index.html"), html);
fs.writeFileSync(path.join(out, "release-manifest.json"), JSON.stringify({ generatedBy: "tools/build.js", releasedSubjects: released.map((subject) => subject.id), files: released.map((subject) => `data/${subject.id}.js`) }, null, 2) + "\n");
console.log(`Built ${out} with ${released.length} released subject bank(s).`);
