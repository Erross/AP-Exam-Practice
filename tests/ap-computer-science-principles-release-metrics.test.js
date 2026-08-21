const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { drawCspExam } = require("../js/multiselect");

function loadCsp() {
  const sandbox = { window:{} };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(`${fs.readFileSync("js/subjects.js", "utf8")}\n;globalThis.__subjects = AP_SUBJECTS;`, sandbox);
  [
    "js/ap-computer-science-principles-metadata.js",
    "data/ap-computer-science-principles.js",
    "data/ap-computer-science-principles-quality.js",
    "data/ap-computer-science-principles-passages.js",
    "data/ap-computer-science-principles-passage-quality.js",
  ].forEach((file) => vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename:file }));
  return {
    subject:sandbox.__subjects.find((candidate) => candidate.id === "ap-computer-science-principles"),
    bank:sandbox.window.QUESTIONS_AP_COMPUTER_SCIENCE_PRINCIPLES,
  };
}

const { subject, bank } = loadCsp();
const family = (skill) => String(skill).split(".")[0];

function audit(draw) {
  assert.equal(draw.length, 70);
  assert.equal(new Set(draw.map((q) => q.id)).size, 70);
  const units = { U1:0,U2:0,U3:0,U4:0,U5:0 };
  const practices = {};
  const variants = new Set();
  const passages = new Map();
  let multi = 0;
  for (const q of draw) {
    units[q.unit]++;
    practices[family(q.skill)] = (practices[family(q.skill)] || 0) + 1;
    if (q.type === "m") multi++;
    if (q.variantGroupId) {
      assert.ok(!variants.has(q.variantGroupId), `duplicate variant ${q.variantGroupId}`);
      variants.add(q.variantGroupId);
    }
    if (q.stimulusGroupId) {
      if (!passages.has(q.stimulusGroupId)) passages.set(q.stimulusGroupId, []);
      passages.get(q.stimulusGroupId).push(q);
    }
  }
  assert.deepEqual(units, { U1:8,U2:14,U3:23,U4:9,U5:16 });
  assert.equal(multi, 8);
  assert.equal(passages.size, 1);
  assert.equal([...passages.values()][0].length, 5);
  for (const [practice, [min,max]] of Object.entries(subject.skillCountRanges)) {
    const count = practices[practice] || 0;
    assert.ok(count >= min && count <= max, `Practice ${practice}: ${count}`);
  }
}

test("5,000 AP CSP forms satisfy exact unit, passage, select-two, practice, and variant constraints", () => {
  for (let i = 0; i < 5000; i++) audit(drawCspExam(subject, bank));
});

test("5,000 AP CSP independent retake pairs average no more than 40% shared questions", () => {
  let total = 0;
  for (let i = 0; i < 5000; i++) {
    const first = drawCspExam(subject, bank);
    const second = drawCspExam(subject, bank);
    const ids = new Set(first.map((q) => q.id));
    total += second.filter((q) => ids.has(q.id)).length / 70;
  }
  const overlap = total / 5000;
  console.log(`AP CSP release overlap ${(100 * overlap).toFixed(1)}%`);
  assert.ok(overlap <= 0.40, `overlap ${(100 * overlap).toFixed(1)}%`);
});
