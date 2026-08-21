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
  vm.runInContext(fs.readFileSync("js/ap-cybersecurity-metadata.js", "utf8"), sandbox);
  vm.runInContext(fs.readFileSync("data/ap-cybersecurity.js", "utf8"), sandbox);
  vm.runInContext(fs.readFileSync("data/ap-cybersecurity-quality.js", "utf8"), sandbox);
  vm.runInContext(fs.readFileSync("data/ap-cybersecurity-sets.js", "utf8"), sandbox);
  vm.runInContext(fs.readFileSync("data/ap-cybersecurity-source-quality.js", "utf8"), sandbox);
  return {
    subject:sandbox.__subjects.find((candidate) => candidate.id === "ap-cybersecurity"),
    bank:sandbox.window.QUESTIONS_AP_CYBERSECURITY,
  };
}

const { subject, bank } = loadCyber();
const topics = [
  "1.1","1.2","1.3","1.4","1.5",
  "2.1","2.2","2.3","2.4",
  "3.1","3.2","3.3","3.4","3.5",
  "4.1","4.2","4.3","4.4",
  "5.1","5.2","5.3","5.4","5.5","5.6",
];
const wordCount = (value) => String(value).trim().split(/\s+/).filter(Boolean).length;
const family = (skill) => String(skill).split(".")[0];
const ABSOLUTE_LANGUAGE = /\b(always|never|every|only|entirely|unlimited|impossible|guaranteed|guarantees)\b/i;

test("AP Cybersecurity metadata matches the May 2027 exam and published skill weighting", () => {
  assert.equal(subject.mcqCount, 60);
  assert.equal(subject.mcqTimeMinutes, 80);
  assert.equal(subject.totalExamTimeLabel, "2h 10m");
  assert.equal(subject.formatVerified, true);
  assert.equal(subject.releaseStatus, "draft");
  assert.deepEqual(JSON.parse(JSON.stringify(subject.skillCountRanges)), { "1":[15,24], "2":[15,24], "3":[15,24] });
  assert.deepEqual(JSON.parse(JSON.stringify(subject.stimulusSetRange)), [5,8]);
  assert.equal(subject.freeResponse.timeMinutes, 50);
  assert.deepEqual(JSON.parse(JSON.stringify(subject.freeResponse.questions)), ["Device Security Analysis"]);
  assert.match(subject.tierNote, /publishes skill-category weights, not per-unit MCQ percentages/i);
});

test("AP Cybersecurity bank covers all 24 CED topics with deep standalone and source-set inventories", () => {
  assert.equal(bank.length, 228);
  assert.equal(new Set(bank.map((q) => q.id)).size, 228);
  const seenTopics = [...new Set(bank.map((q) => q.topicCode))].sort((a,b) => a.localeCompare(b, undefined, { numeric:true }));
  assert.deepEqual(seenTopics, topics);

  const standalone = bank.filter((q) => !q.stimulusGroupId);
  const sourced = bank.filter((q) => q.stimulusGroupId);
  assert.equal(standalone.length, 192);
  assert.equal(sourced.length, 36);
  topics.forEach((code) => assert.equal(standalone.filter((q) => q.topicCode === code).length, 8, `${code}: standalone depth`));

  const variants = new Map();
  standalone.forEach((q) => {
    assert.ok(q.variantGroupId, q.id);
    if (!variants.has(q.variantGroupId)) variants.set(q.variantGroupId, []);
    variants.get(q.variantGroupId).push(q);
  });
  assert.equal(variants.size, 96);
  for (const [id, items] of variants) {
    assert.equal(items.length, 2, id);
    assert.equal(new Set(items.map((q) => q.topicCode)).size, 1, id);
  }

  const groups = new Map();
  sourced.forEach((q) => {
    if (!groups.has(q.stimulusGroupId)) groups.set(q.stimulusGroupId, []);
    groups.get(q.stimulusGroupId).push(q);
  });
  assert.equal(groups.size, 12);
  for (const [id, items] of groups) {
    assert.equal(items.length, 3, id);
    assert.equal(new Set(items.map((q) => q.unit)).size, 1, id);
    assert.equal(new Set(items.map((q) => q.stimulus)).size, 1, id);
    assert.match(items[0].stimulus.source, /Original synthetic/i);
  }
});

test("AP Cybersecurity question schema and rationale quality are release-shaped", () => {
  const absoluteOffenders = [];
  for (const q of bank) {
    assert.match(q.id, /^apcyber-/);
    assert.match(q.topicCode, /^[1-5]\.\d+$/);
    assert.match(q.skill, /^[123]\.A$/);
    assert.equal(q.type, "s", q.id);
    assert.equal(q.o.length, 4, q.id);
    assert.equal(q.c.length, 1, q.id);
    assert.ok(Number.isInteger(q.c[0]) && q.c[0] >= 0 && q.c[0] < 4, q.id);
    assert.ok(q.q.length >= 20, q.id);
    assert.ok(q.e.length >= 90, `${q.id}: rationale ${q.e.length}`);
    const absoluteDistractors = q.o.filter((_, i) => i !== q.c[0]).filter((option) => ABSOLUTE_LANGUAGE.test(option)).length;
    if (absoluteDistractors > 1) absoluteOffenders.push(q.id);
  }
  if (absoluteOffenders.length) console.log("AP Cybersecurity stacked-absolute items", absoluteOffenders);
  assert.deepEqual(absoluteOffenders, []);
});

test("AP Cybersecurity answer construction stays inside project cue limits", () => {
  let uniqueLongest = 0;
  let amongLongest = 0;
  let correctWords = 0;
  let distractorWords = 0;
  const keys = [0,0,0,0];
  const offenders = [];
  for (const q of bank) {
    const lengths = q.o.map(wordCount);
    const longest = Math.max(...lengths);
    const correctLength = lengths[q.c[0]];
    const longestCount = lengths.filter((n) => n === longest).length;
    if (correctLength === longest && longestCount === 1) {
      uniqueLongest++;
      offenders.push({ id:q.id, lengths, key:q.c[0] });
    }
    if (correctLength === longest && longestCount < 4) amongLongest++;
    correctWords += correctLength;
    lengths.forEach((length, index) => { if (index !== q.c[0]) distractorWords += length; });
    keys[q.c[0]]++;
  }
  const uniqueShare = uniqueLongest / bank.length;
  const amongShare = amongLongest / bank.length;
  const correctMean = correctWords / bank.length;
  const distractorMean = distractorWords / (bank.length * 3);
  console.log("AP Cybersecurity answer metrics", { uniqueShare, amongShare, correctMean, distractorMean, keys });
  if (uniqueShare > 0.25) console.log("AP Cybersecurity unique-longest sample", offenders.slice(0, 40));
  assert.ok(uniqueShare <= 0.25, `unique-longest ${(100*uniqueShare).toFixed(1)}%`);
  assert.ok(amongShare <= 0.58, `among-longest ${(100*amongShare).toFixed(1)}%`);
  assert.ok(Math.abs(correctMean - distractorMean) / distractorMean <= 0.12, `${correctMean} vs ${distractorMean}`);
  keys.forEach((count, index) => {
    const share = count / bank.length;
    assert.ok(share >= 0.15 && share <= 0.35, `key ${index}: ${(100*share).toFixed(1)}%`);
  });
});

function auditDraw(draw) {
  assert.equal(draw.length, 60);
  assert.equal(new Set(draw.map((q) => q.id)).size, 60);
  const units = { U1:0,U2:0,U3:0,U4:0,U5:0 };
  const skills = { "1":0,"2":0,"3":0 };
  const groups = new Set();
  const variants = new Set();
  draw.forEach((q) => {
    units[q.unit]++;
    skills[family(q.skill)]++;
    if (q.stimulusGroupId) groups.add(q.stimulusGroupId);
    if (q.variantGroupId) {
      assert.ok(!variants.has(q.variantGroupId), `duplicate variant ${q.variantGroupId}`);
      variants.add(q.variantGroupId);
    }
  });
  assert.deepEqual(units, { U1:5,U2:12,U3:14,U4:13,U5:16 });
  for (const [skill, [min,max]] of Object.entries(subject.skillCountRanges)) {
    assert.ok(skills[skill] >= min && skills[skill] <= max, `Skill ${skill}: ${skills[skill]}`);
  }
  assert.ok(groups.size >= 5 && groups.size <= 8, `source sets ${groups.size}`);
}

test("500 AP Cybersecurity draws satisfy unit allocation, official skill bands, source-set range, and variant separation", () => {
  for (let i = 0; i < 500; i++) auditDraw(drawExam(subject, bank));
});

test("1,000 AP Cybersecurity retake pairs average at most 40% shared questions", () => {
  let total = 0;
  for (let i = 0; i < 1000; i++) {
    const first = drawExam(subject, bank);
    const second = drawExam(subject, bank);
    const firstIds = new Set(first.map((q) => q.id));
    total += second.filter((q) => firstIds.has(q.id)).length / 60;
  }
  const overlap = total / 1000;
  console.log(`AP Cybersecurity overlap ${(100*overlap).toFixed(1)}%`);
  assert.ok(overlap <= 0.40, `overlap ${(100*overlap).toFixed(1)}%`);
});
