"use strict";
const fs = require("node:fs");
const vm = require("node:vm");

const html = fs.readFileSync("index.html", "utf8");
const scripts = [...html.matchAll(/<script src="(data\/ap-art-history(?:-[^"]+)?\.js)"><\/script>/g)].map((m) => m[1]);
if (scripts.length < 2) throw new Error(`Expected layered Art History bank before consolidation; found ${scripts.length} script(s)`);

const sandbox = { window: {} };
vm.createContext(sandbox);
for (const file of scripts) {
  vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
}
const bank = sandbox.window.QUESTIONS_AP_ART_HISTORY;
if (!Array.isArray(bank) || bank.length !== 340) throw new Error(`Expected 340 effective Art History questions; found ${bank && bank.length}`);

const header = `// AP Art History — original Section I practice bank.\n// Current-format metadata and skill/unit blueprint verified against College Board AP Central in August 2026.\n// Visual assets are stored locally under assets/ap-art-history; SOURCES.json records reusable-image provenance.\n// This file is the canonical shipping bank; development profile layers were consolidated before release.\nwindow.QUESTIONS_AP_ART_HISTORY = `;
const internStimuli = `\n// Preserve atomic-set identity after JSON materialization: every question in a\n// stimulusGroupId references the same stimulus object, matching the repo-wide\n// release invariant used by the generic audit and browser-effective layered banks.\n(()=>{const shared=new Map();window.QUESTIONS_AP_ART_HISTORY.forEach(q=>{if(!q.stimulusGroupId||!q.stimulus)return;if(!shared.has(q.stimulusGroupId))shared.set(q.stimulusGroupId,q.stimulus);else q.stimulus=shared.get(q.stimulusGroupId);});})();\n`;
fs.writeFileSync("data/ap-art-history.js", header + JSON.stringify(bank, null, 2) + ";\n" + internStimuli);

let nextHtml = html;
for (const file of scripts.slice(1)) {
  nextHtml = nextHtml.replace(`\n<script src="${file}"></script>`, "");
}
fs.writeFileSync("index.html", nextHtml);

const remove = [
  ...Array.from({ length: 10 }, (_, i) => `data/ap-art-history-u${i + 1}.js`),
  "data/ap-art-history-unknowns.js",
  "data/ap-art-history-finalize.js",
  "tools/materialize-ap-art-history.py",
  "tools/patch-ap-art-history-rate-limit.py",
  "tools/fix-ap-art-history-assets.py",
  "tools/patch-ap-art-history-drawer.py",
  "tools/ap-art-history-cleanroom-repair.py",
  "tools/ap-art-history-cleanroom-pass2.py",
  "tools/ap-art-history-ux-repair.py",
  ".aparth-clean-trigger",
  ".aparth-ux-trigger",
  ".aparth-consolidate-trigger",
  ".github/workflows/ap-art-history-materialize.yml",
  ".github/workflows/ap-art-history-fix-assets.yml",
  ".github/workflows/ap-art-history-drawer-patch.yml",
  ".github/workflows/ap-art-history-release-audit.yml",
  ".github/workflows/ap-art-history-cleanroom-repair.yml",
  ".github/workflows/ap-art-history-ux-repair.yml",
  ".github/workflows/ap-art-history-consolidate.yml",
  "tools/ap-art-history-consolidate.js",
];
for (const file of remove) {
  if (fs.existsSync(file)) fs.rmSync(file);
}

console.log(`Consolidated ${bank.length} AP Art History questions from ${scripts.length} development layers into data/ap-art-history.js.`);
