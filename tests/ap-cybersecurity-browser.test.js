const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const html = fs.readFileSync("index.html", "utf8");
const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map((match) => match[1]);
const expectedData = [
  "data/ap-cybersecurity.js",
  "data/ap-cybersecurity-quality.js",
  "data/ap-cybersecurity-sets.js",
  "data/ap-cybersecurity-source-quality.js",
];

test("AP Cybersecurity browser wiring exposes metadata and every data layer in canonical order", () => {
  assert.equal(scripts.filter((file) => file === "js/ap-cybersecurity-metadata.js").length, 1);
  expectedData.forEach((file) => assert.equal(scripts.filter((candidate) => candidate === file).length, 1, file));
  const positions = expectedData.map((file) => scripts.indexOf(file));
  for (let i = 1; i < positions.length; i++) assert.ok(positions[i - 1] < positions[i], `${expectedData[i - 1]} before ${expectedData[i]}`);
  assert.ok(scripts.indexOf("js/ap-cybersecurity-metadata.js") < scripts.indexOf("js/draw.js"));
  assert.ok(positions.at(-1) < scripts.indexOf("js/app.js"));
});

test("AP Cybersecurity browser-effective registry and bank resolve the reviewed release", () => {
  const sandbox = { window:{} };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(`${fs.readFileSync("js/subjects.js", "utf8")}\n;globalThis.__subjects = AP_SUBJECTS;`, sandbox, { filename:"js/subjects.js" });
  vm.runInContext(fs.readFileSync("js/ap-cybersecurity-metadata.js", "utf8"), sandbox, { filename:"js/ap-cybersecurity-metadata.js" });
  expectedData.forEach((file) => vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename:file }));

  const subject = sandbox.__subjects.find((candidate) => candidate.id === "ap-cybersecurity");
  const bank = sandbox.window.QUESTIONS_AP_CYBERSECURITY;
  assert.ok(subject);
  assert.equal(subject.releaseStatus, "released");
  assert.equal(subject.formatVerified, true);
  assert.equal(subject.mcqCount, 60);
  assert.equal(subject.mcqTimeMinutes, 80);
  assert.equal(bank.length, 228);
  assert.equal(new Set(bank.map((q) => q.id)).size, 228);
  assert.equal(new Set(bank.filter((q) => q.stimulusGroupId).map((q) => q.stimulusGroupId)).size, 12);
});
