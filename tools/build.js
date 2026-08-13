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

copy("style.css");
fs.cpSync("js", path.join(out, "js"), { recursive: true });
fs.cpSync("assets", path.join(out, "assets"), { recursive: true });

const released = AP_SUBJECTS.filter((subject) => subject.releaseStatus === "released");
const releasedIds = new Set(released.map((subject) => subject.id));
const sourceHtml = fs.readFileSync("index.html", "utf8");
const referencedDataScripts = [...sourceHtml.matchAll(/^<script src="(data\/([^"]+)\.js)"><\/script>\s*$/gm)]
  .map((match) => match[1]);

function owningReleasedSubject(source) {
  const filename = path.basename(source, ".js");
  return released.find((subject) => filename === subject.id || filename.startsWith(`${subject.id}-`)) || null;
}

const allowedScripts = new Set(referencedDataScripts.filter((source) => owningReleasedSubject(source)));
for (const source of allowedScripts) copy(source);

const html = sourceHtml.replace(
  /^<script src="(data\/[^"]+)"><\/script>\s*$/gm,
  (line, source) => (allowedScripts.has(source) ? line : "")
);
fs.writeFileSync(path.join(out, "index.html"), html);

const files = [...allowedScripts].sort();
fs.writeFileSync(
  path.join(out, "release-manifest.json"),
  JSON.stringify({
    generatedBy: "tools/build.js",
    releasedSubjects: [...releasedIds].sort(),
    files,
  }, null, 2) + "\n"
);
console.log(`Built ${out} with ${released.length} released subject(s) and ${files.length} released data layer(s).`);
