const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { drawExam } = require("../js/draw");

function loadCyber() {
  const sandbox = { window:{} };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(`${fs.readFileSync("js/subjects.js", "utf8")}\n;globalThis.__subjects = AP_SUBJECTS;`, sandbox);
  [
    "js/ap-cybersecurity-metadata.js",
    "data/ap-cybersecurity.js",
    "data/ap-cybersecurity-quality.js",
    "data/ap-cybersecurity-sets.js",
    "data/ap-cybersecurity-source-quality.js",
  ].forEach((file) => vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename:file }));
  return {
    subject:sandbox.__subjects.find((candidate) => candidate.id === "ap-cybersecurity"),
    bank:sandbox.window.QUESTIONS_AP_CYBERSECURITY,
  };
}

const { subject, bank } = loadCyber();
const family = (skill) => String(skill).split(".")[0];

function audit(draw) {
  assert.equal(draw.length, 60);
  assert.equal(new Set(draw.map((q) => q.id)).size, 60);
  const units = { U1:0,U2:0,U3:0,U4:0,U5:0 };
  const skills = { "1":0,"2":0,"3":0 };
  const groups = new Set();
  const variants = new Set();
  for (const q of draw) {
    units[q.unit]++;
    skills[family(q.skill)]++;
    if (q.stimulusGroupId) groups.add(q.stimulusGroupId);
    if (q.variantGroupId) {
      assert.ok(!variants.has(q.variantGroupId), `duplicate variant ${q.variantGroupId}`);
      variants.add(q.variantGroupId);
    }
  }
  assert.deepEqual(units, { U1:5,U2:12,U3:14,U4:13,U5:16 });
  for (const [skill, [min,max]] of Object.entries(subject.skillCountRanges)) {
    assert.ok(skills[skill] >= min && skills[skill] <= max, `Skill ${skill}: ${skills[skill]}`);
  }
  assert.ok(groups.size >= 5 && groups.size <= 8, `source sets ${groups.size}`);
}

test("5,000 AP Cybersecurity forms satisfy unit, official skill, source-set, and variant constraints", () => {
  for (let i = 0; i < 5000; i++) audit(drawExam(subject, bank));
});

test("5,000 AP Cybersecurity independent retake pairs average no more than 40% shared questions", () => {
  let total = 0;
  for (let i = 0; i < 5000; i++) {
    const first = drawExam(subject, bank);
    const second = drawExam(subject, bank);
    const ids = new Set(first.map((q) => q.id));
    total += second.filter((q) => ids.has(q.id)).length / 60;
  }
  const overlap = total / 5000;
  console.log(`AP Cybersecurity release overlap ${(100 * overlap).toFixed(1)}%`);
  assert.ok(overlap <= 0.40, `overlap ${(100 * overlap).toFixed(1)}%`);
});
