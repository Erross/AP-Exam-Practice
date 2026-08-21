const fs = require("node:fs");
const path = require("node:path");
const { loadEffectiveSubjects } = require("./effective-subjects");

const AP_SUBJECTS = loadEffectiveSubjects();
const out = "_site";
const assetVersion = "ui-20260813";
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

function copy(source) {
  const target = path.join(out, source);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

for (const file of fs.readdirSync(".").filter((name) => name.endsWith(".css"))) copy(file);
fs.cpSync("js", path.join(out, "js"), { recursive: true });
fs.cpSync("assets", path.join(out, "assets"), { recursive: true });
copy("about.html");
copy("official-sources.html");

const publishedCourseCss = path.join(out, "course-cards.css");
if (fs.existsSync(publishedCourseCss)) {
  const css = fs.readFileSync(publishedCourseCss, "utf8")
    .replace("aesthetic-polish.css", `aesthetic-polish.css?v=${assetVersion}`)
    .replace("phase7.css", `phase7.css?v=${assetVersion}`);
  fs.writeFileSync(publishedCourseCss, css);
}

const released = AP_SUBJECTS.filter((subject) => subject.releaseStatus === "released");
const releasedIds = new Set(released.map((subject) => subject.id));
const sourceHtml = fs.readFileSync("index.html", "utf8");
const referencedDataScripts = [...sourceHtml.matchAll(/^<script src="(data\/[^"?]+\.js)(?:\?[^\"]*)?"><\/script>\s*$/gm)]
  .map((match) => match[1]);

function owningReleasedSubject(source) {
  const filename = path.basename(source, ".js");
  return released.find((subject) => filename === subject.id || filename.startsWith(`${subject.id}-`)) || null;
}

const allowedScripts = new Set(referencedDataScripts.filter((source) => owningReleasedSubject(source)));
for (const source of allowedScripts) copy(source);

const menuMarkup = `<details class="site-menu">
  <summary aria-label="Open site menu"><span class="hamburger-lines" aria-hidden="true"></span><span class="visually-hidden">Menu</span></summary>
  <nav aria-label="Site navigation"><a href="index.html">Practice exams</a><a href="about.html">About</a><a href="official-sources.html">Official AP sources</a></nav>
</details>`;

let html = sourceHtml.replace(
  /^<script src="(data\/[^"?]+\.js)(?:\?[^\"]*)?"><\/script>\s*$/gm,
  (line, source) => (allowedScripts.has(source) ? line : "")
);
html = html
  .replace('<header class="site-header">', `<header class="site-header">\n${menuMarkup}`)
  .replace('href="course-cards.css"', `href="course-cards.css?v=${assetVersion}"`)
  .replace('src="js/catalog.js"', `src="js/catalog.js?v=${assetVersion}`);
fs.writeFileSync(path.join(out, "index.html"), html);

for (const page of ["about.html", "official-sources.html"]) {
  const pagePath = path.join(out, page);
  let pageHtml = fs.readFileSync(pagePath, "utf8");
  pageHtml = pageHtml.replace('href="course-cards.css"', `href="course-cards.css?v=${assetVersion}"`);
  fs.writeFileSync(pagePath, pageHtml);
}

const files = [...allowedScripts].sort();
fs.writeFileSync(
  path.join(out, "release-manifest.json"),
  JSON.stringify({ generatedBy: "tools/build.js", releasedSubjects: [...releasedIds].sort(), files }, null, 2) + "\n"
);
console.log(`Built ${out} with ${released.length} released subject(s), ${files.length} released data layer(s), About and official-source pages, and refreshed UI assets.`);
