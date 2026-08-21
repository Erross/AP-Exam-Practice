const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { shuffleQuestionOptions } = require("../js/draw");
const { validSavedAnswer, drawCspExam } = require("../js/multiselect");

function loadCsp() {
  const sandbox = { window: {} };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(`${fs.readFileSync("js/subjects.js", "utf8")}\n;globalThis.__subjects = AP_SUBJECTS;`, sandbox);
  vm.runInContext(fs.readFileSync("js/ap-computer-science-principles-metadata.js", "utf8"), sandbox);
  vm.runInContext(fs.readFileSync("data/ap-computer-science-principles.js", "utf8"), sandbox);
  vm.runInContext(fs.readFileSync("data/ap-computer-science-principles-quality.js", "utf8"), sandbox);
  vm.runInContext(fs.readFileSync("data/ap-computer-science-principles-passages.js", "utf8"), sandbox);
  vm.runInContext(fs.readFileSync("data/ap-computer-science-principles-passage-quality.js", "utf8"), sandbox);
  return {
    subject: sandbox.__subjects.find((candidate) => candidate.id === "ap-computer-science-principles"),
    bank: sandbox.window.QUESTIONS_AP_COMPUTER_SCIENCE_PRINCIPLES,
  };
}

const { subject, bank } = loadCsp();
const topicCodes = [
  "1.1","1.2","1.3","1.4",
  "2.1","2.2","2.3","2.4",
  "3.1","3.2","3.3","3.4","3.5","3.6","3.7","3.8","3.9","3.10","3.11","3.12","3.13","3.14","3.15","3.16","3.17","3.18",
  "4.1","4.2","4.3",
  "5.1","5.2","5.3","5.4","5.5","5.6",
];

const wordCount = (value) => String(value).trim().split(/\s+/).filter(Boolean).length;
const family = (skill) => String(skill).split(".")[0];
const ABSOLUTE_LANGUAGE = /\b(always|never|every|only|entirely|unlimited|impossible|guaranteed|guarantees)\b/i;

function auditDraw(draw) {
  assert.equal(draw.length, 70);
  assert.equal(new Set(draw.map((q) => q.id)).size, 70);

  const unitCounts = { U1:0, U2:0, U3:0, U4:0, U5:0 };
  const practices = {};
  const kinds = { single:0, multi:0, passage:0 };
  const variants = new Set();
  const passageGroups = new Map();

  for (const q of draw) {
    unitCounts[q.unit]++;
    practices[family(q.skill)] = (practices[family(q.skill)] || 0) + 1;
    kinds[q.cspQuestionKind]++;
    if (q.variantGroupId) {
      assert.ok(!variants.has(q.variantGroupId), `repeated variant ${q.variantGroupId}`);
      variants.add(q.variantGroupId);
    }
    if (q.stimulusGroupId) {
      if (!passageGroups.has(q.stimulusGroupId)) passageGroups.set(q.stimulusGroupId, []);
      passageGroups.get(q.stimulusGroupId).push(q);
    }
  }

  assert.deepEqual(unitCounts, { U1:8, U2:14, U3:23, U4:9, U5:16 });
  assert.deepEqual(kinds, { single:57, multi:8, passage:5 });
  assert.equal(passageGroups.size, 1);
  assert.equal([...passageGroups.values()][0].length, 5);
  for (const [practice, [min, max]] of Object.entries(subject.skillCountRanges)) {
    const count = practices[practice] || 0;
    assert.ok(count >= min && count <= max, `Practice ${practice}: ${count} not in ${min}-${max}`);
  }
}

test("AP CSP draft metadata matches the current Section I structure", () => {
  assert.equal(subject.mcqCount, 70);
  assert.equal(subject.mcqTimeMinutes, 120);
  assert.equal(subject.totalExamTimeLabel, "3h 0m");
  assert.equal(subject.formatVerified, true);
  assert.equal(subject.releaseStatus, "draft");
  assert.equal(subject.allowsMultiSelect, true);
  assert.deepEqual(JSON.parse(JSON.stringify(subject.stimulusSetRange)), [1,1]);
  assert.deepEqual(JSON.parse(JSON.stringify(subject.attributeRanges.cspQuestionKind)), { multi:[8,8], passage:[5,5] });
  assert.deepEqual(JSON.parse(JSON.stringify(subject.cspBlueprint.unitCounts)), { U1:8,U2:14,U3:23,U4:9,U5:16 });
  assert.equal(subject.cspBlueprint.multiCount, 8);
  assert.equal(subject.cspBlueprint.passageQuestionCount, 5);
  assert.equal(subject.freeResponse.timeMinutes, 60);
  assert.equal(subject.freeResponse.questions.length, 4);
});

test("AP CSP bank covers all 35 CED topics with deep standalone and passage inventories", () => {
  assert.equal(bank.length, 320);
  assert.equal(new Set(bank.map((q) => q.id)).size, 320);
  assert.deepEqual([...new Set(bank.map((q) => q.topicCode))].sort((a,b) => a.localeCompare(b, undefined, { numeric:true })), topicCodes);

  const standalone = bank.filter((q) => !q.stimulusGroupId);
  const passage = bank.filter((q) => q.stimulusGroupId);
  assert.equal(standalone.length, 280);
  assert.equal(passage.length, 40);

  for (const code of topicCodes) {
    const items = standalone.filter((q) => q.topicCode === code);
    assert.equal(items.length, 8, `${code}: expected 8 standalone items`);
    assert.equal(items.filter((q) => q.type === "m").length, 1, `${code}: expected one select-two item`);
  }

  const variantGroups = new Map();
  standalone.forEach((q) => {
    assert.ok(q.variantGroupId, `${q.id}: missing variant group`);
    if (!variantGroups.has(q.variantGroupId)) variantGroups.set(q.variantGroupId, []);
    variantGroups.get(q.variantGroupId).push(q);
  });
  assert.equal(variantGroups.size, 140);
  for (const [id, items] of variantGroups) {
    assert.equal(items.length, 2, `${id}: expected a pair`);
    assert.equal(new Set(items.map((q) => q.topicCode)).size, 1);
  }

  const passageGroups = new Map();
  passage.forEach((q) => {
    if (!passageGroups.has(q.stimulusGroupId)) passageGroups.set(q.stimulusGroupId, []);
    passageGroups.get(q.stimulusGroupId).push(q);
  });
  assert.equal(passageGroups.size, 8);
  for (const [id, items] of passageGroups) {
    assert.equal(items.length, 5, `${id}: expected five questions`);
    assert.ok(items.every((q) => q.type === "s" && q.cspQuestionKind === "passage"));
    assert.equal(new Set(items.map((q) => q.stimulus)).size, 1, `${id}: stimulus object must be shared`);
  }
});

test("AP CSP question schema, rationales, and select-two keys are sound", () => {
  for (const q of bank) {
    assert.match(q.id, /^apcsp-/);
    assert.match(q.topicCode, /^[1-5]\.\d+$/);
    assert.match(q.skill, /^[1-5]\.[A-E]$/);
    assert.ok(q.q.length >= 20, q.id);
    assert.equal(q.o.length, 4, q.id);
    assert.ok(q.e.length >= 90, `${q.id}: rationale ${q.e.length}`);
    assert.ok(["s","m"].includes(q.type), q.id);
    assert.equal(q.c.length, q.type === "m" ? 2 : 1, q.id);
    assert.equal(new Set(q.c).size, q.c.length, q.id);
    q.c.forEach((index) => assert.ok(Number.isInteger(index) && index >= 0 && index < 4, q.id));
    if (q.type === "m") {
      assert.equal(q.cspQuestionKind, "multi");
      assert.match(q.q, /select two/i);
    }
  }
});

test("AP CSP distractors avoid stacked absolute-language tells", () => {
  const offenders = bank.filter((q) =>
    q.o.filter((_, index) => !q.c.includes(index)).filter((option) => ABSOLUTE_LANGUAGE.test(option)).length > 1
  ).map((q) => q.id);
  if (offenders.length) console.log("AP CSP stacked-absolute items", offenders);
  assert.deepEqual(offenders, []);
});

test("AP CSP single-select answer construction stays inside project cue limits", () => {
  const singles = bank.filter((q) => q.type === "s");
  let uniqueLongest = 0;
  let amongLongest = 0;
  let correctWords = 0;
  let distractorWords = 0;
  const keys = [0,0,0,0];
  const offenders = [];
  for (const q of singles) {
    const lengths = q.o.map(wordCount);
    const longest = Math.max(...lengths);
    const correctLength = lengths[q.c[0]];
    if (correctLength === longest && lengths.filter((n) => n === longest).length === 1) {
      uniqueLongest++;
      offenders.push({ id:q.id, lengths, key:q.c[0] });
    }
    if (correctLength === longest && lengths.filter((n) => n === longest).length < 4) amongLongest++;
    correctWords += correctLength;
    lengths.forEach((length, index) => { if (index !== q.c[0]) distractorWords += length; });
    keys[q.c[0]]++;
  }
  const uniqueShare = uniqueLongest / singles.length;
  const amongShare = amongLongest / singles.length;
  const correctMean = correctWords / singles.length;
  const distractorMean = distractorWords / (singles.length * 3);
  console.log("AP CSP answer metrics", { uniqueShare, amongShare, correctMean, distractorMean, keys });
  if (uniqueShare > 0.25) console.log("AP CSP unique-longest sample", offenders.slice(0, 40));
  assert.ok(uniqueShare <= 0.25, `unique-longest ${(100*uniqueShare).toFixed(1)}%`);
  assert.ok(amongShare <= 0.58, `among-longest ${(100*amongShare).toFixed(1)}%`);
  assert.ok(Math.abs(correctMean - distractorMean) / distractorMean <= 0.12, `${correctMean} vs ${distractorMean}`);
  keys.forEach((count, index) => {
    const share = count / singles.length;
    assert.ok(share >= 0.15 && share <= 0.35, `key ${index}: ${(100*share).toFixed(1)}%`);
  });
});

test("AP CSP multi-select option shuffling and persistence helpers preserve two-answer semantics", () => {
  const q = bank.find((item) => item.type === "m");
  assert.ok(q);
  const shuffled = shuffleQuestionOptions(q, () => 0.314159);
  assert.equal(shuffled.c.length, 2);
  const originalCorrect = new Set(q.c.map((index) => q.o[index]));
  const shuffledCorrect = new Set(shuffled.c.map((index) => shuffled.o[index]));
  assert.deepEqual([...shuffledCorrect].sort(), [...originalCorrect].sort());
  assert.equal(validSavedAnswer(q, q.c), true);
  assert.equal(validSavedAnswer(q, [q.c[0]]), true);
  assert.equal(validSavedAnswer(q, [0,1,2]), false);
  assert.equal(validSavedAnswer(q, [0,0]), false);
  assert.equal(validSavedAnswer({ ...q, type:"s" }, q.c), false);
});

test("500 AP CSP constructive draws satisfy exact unit, passage, select-two, practice, and variant constraints", () => {
  for (let i = 0; i < 500; i++) auditDraw(drawCspExam(subject, bank));
});

test("1,000 AP CSP retake pairs average at most 40% shared questions", () => {
  let total = 0;
  for (let i = 0; i < 1000; i++) {
    const first = drawCspExam(subject, bank);
    const second = drawCspExam(subject, bank);
    const ids = new Set(first.map((q) => q.id));
    total += second.filter((q) => ids.has(q.id)).length / 70;
  }
  const overlap = total / 1000;
  console.log(`AP CSP overlap ${(100*overlap).toFixed(1)}%`);
  assert.ok(overlap <= 0.40, `overlap ${(100*overlap).toFixed(1)}%`);
});

test("AP CSP browser wiring includes metadata, quality/passages, select-two runtime, and scope note", () => {
  const html = fs.readFileSync("index.html", "utf8");
  assert.match(html, /js\/ap-computer-science-principles-metadata\.js/);
  assert.match(html, /data\/ap-computer-science-principles\.js[\s\S]*data\/ap-computer-science-principles-quality\.js[\s\S]*data\/ap-computer-science-principles-passages\.js[\s\S]*data\/ap-computer-science-principles-passage-quality\.js/);
  assert.match(html, /js\/app\.js[\s\S]*js\/multiselect\.js[\s\S]*js\/catalog\.js/);
  assert.match(html, /Language and Culture courses are outside the current scope/);
});
