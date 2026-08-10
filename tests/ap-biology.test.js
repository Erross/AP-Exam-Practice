const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { AP_SUBJECTS } = require("../js/subjects");
const { drawExam, shuffleQuestionOptions } = require("../js/draw");

function loadBiologyBank() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync("data/ap-biology.js", "utf8"), sandbox);
  return sandbox.window.QUESTIONS_AP_BIOLOGY;
}

const subject = AP_SUBJECTS.find((item) => item.id === "ap-biology");
const bank = loadBiologyBank();
const expectedTopicCounts = [7, 10, 5, 6, 5, 8, 12, 7];
const expectedBankByUnit = { U1: 24, U2: 24, U3: 20, U4: 20, U5: 24, U6: 20, U7: 28, U8: 20 };
const expectedDrawByUnit = { U1: 6, U2: 7, U3: 8, U4: 8, U5: 6, U6: 8, U7: 10, U8: 7 };
const allowedSkills = new Set([
  "1.A", "1.B", "1.C", "2.A", "2.B", "2.C", "2.D",
  "3.A", "3.B", "3.C", "3.D", "4.A", "4.B", "5.A", "5.B",
  "5.C", "5.D", "6.A", "6.B", "6.C", "6.D", "6.E",
]);

test("Biology bank has deep CED coverage and audited metadata", () => {
  assert.equal(bank.length, 180);
  assert.equal(subject.releaseStatus, "released", "Biology is included in the validated production release");
  assert.equal(subject.formatVerified, true);
  assert.deepEqual(subject.stimulusSetRange, [4, 8]);
  assert.deepEqual(subject.sciencePracticeRanges, {
    "1": [15, 20], "2": [10, 14], "3": [5, 8],
    "4": [5, 8], "5": [5, 8], "6": [12, 16],
  });

  const ids = new Set();
  const topicCounts = new Map();
  const practiceFamilies = new Set();
  const variants = new Map();
  const validUnits = new Set(subject.units.map((unit) => unit.id));

  bank.forEach((question) => {
    assert.match(question.id, /^apbio-u[1-8]-\d{3}$/);
    assert.ok(!ids.has(question.id), `duplicate id ${question.id}`);
    ids.add(question.id);
    assert.ok(validUnits.has(question.unit), `${question.id}: invalid unit`);
    assert.match(question.topicCode, new RegExp(`^${question.unit.slice(1)}\\.\\d+$`));
    topicCounts.set(question.topicCode, (topicCounts.get(question.topicCode) || 0) + 1);
    assert.ok(allowedSkills.has(question.skill), `${question.id}: invalid science skill ${question.skill}`);
    practiceFamilies.add(question.skill.split(".")[0]);
    assert.equal(question.type, "s");
    assert.equal(question.o.length, 4);
    assert.equal(question.c.length, 1);
    assert.ok(Number.isInteger(question.c[0]) && question.c[0] >= 0 && question.c[0] < 4);
    assert.ok(question.q.length >= 20, `${question.id}: stem is too short`);
    assert.ok(question.e.length >= 90, `${question.id}: explanation lacks reasoning`);
    assert.doesNotMatch(question.e, /This item applies CED Topic|Correct answer\.?$/i);

    if (question.skill.startsWith("2.")) {
      assert.equal(question.stimulus?.type, "visual", `${question.id}: Practice 2 requires a visual representation`);
      assert.ok(question.stimulus.image, `${question.id}: Practice 2 requires an image`);
    }
    if (question.variantGroupId) {
      assert.ok(!question.stimulusGroupId, `${question.id}: variant grouping is for standalone items`);
      if (!variants.has(question.variantGroupId)) variants.set(question.variantGroupId, []);
      variants.get(question.variantGroupId).push(question);
    }
  });

  expectedTopicCounts.forEach((count, unitIndex) => {
    const unit = unitIndex + 1;
    for (let topic = 1; topic <= count; topic++) {
      const code = `${unit}.${topic}`;
      assert.ok(topicCounts.has(code), `missing CED topic ${code}`);
      assert.ok(topicCounts.get(code) >= 2, `${code}: topic has only token coverage`);
    }
  });
  assert.deepEqual([...practiceFamilies].sort(), ["1", "2", "3", "4", "5", "6"]);
  assert.deepEqual(
    Object.fromEntries(subject.units.map((unit) => [unit.id, bank.filter((q) => q.unit === unit.id).length])),
    expectedBankByUnit
  );

  assert.ok(variants.size >= 20);
  for (const [groupId, questions] of variants) {
    assert.ok(questions.length >= 2, `${groupId}: variant group needs at least two items`);
    assert.equal(new Set(questions.map((q) => q.unit)).size, 1, `${groupId}: variants cross units`);
    assert.equal(new Set(questions.map((q) => q.topicCode)).size, 1, `${groupId}: variants cross topics`);
    assert.equal(new Set(questions.map((q) => q.q)).size, questions.length, `${groupId}: duplicate stems`);
  }

  // Regression checks for the metadata defects found during independent review.
  assert.equal(bank.find((q) => q.id === "apbio-u3-015").topicCode, "3.1");
  assert.equal(bank.find((q) => q.id === "apbio-u4-014").topicCode, "4.3");
  assert.equal(bank.find((q) => q.id === "apbio-u6-014").topicCode, "6.5");
  assert.equal(bank.find((q) => q.id === "apbio-u6-015").topicCode, "6.5");
  assert.equal(bank.find((q) => q.id === "apbio-u7-011").topicCode, "7.9");
});

test("Biology stimulus portfolio is intact, neutral, and graph-rich", () => {
  const groups = new Map();
  bank.filter((question) => question.stimulusGroupId).forEach((question) => {
    if (!groups.has(question.stimulusGroupId)) groups.set(question.stimulusGroupId, []);
    groups.get(question.stimulusGroupId).push(question);
  });
  assert.equal(groups.size, 12);

  const graphs = new Set();
  let uncertaintyGraphs = 0;
  for (const [groupId, questions] of groups) {
    assert.ok(questions.length >= 4 && questions.length <= 5, `${groupId}: sets require 4-5 items`);
    assert.equal(new Set(questions.map((question) => question.unit)).size, 1);
    assert.equal(new Set(questions.map((question) => question.stimulus)).size, 1);
    const stimulus = questions[0].stimulus;
    assert.ok(["quantitative", "visual"].includes(stimulus.type));
    assert.match(stimulus.source, /Original/);
    if (stimulus.type === "visual") {
      assert.ok(fs.existsSync(stimulus.image), `${groupId}: missing visual asset`);
      assert.ok(stimulus.alt.length >= 60, `${groupId}: visual requires meaningful alt text`);
      assert.doesNotMatch(stimulus.alt, /correct answer|therefore|proves that/i);
      if (stimulus.visualKind === "graph") graphs.add(stimulus.image);
      if (stimulus.uncertainty) uncertaintyGraphs++;
    } else {
      assert.ok(stimulus.columns.length >= 2);
      assert.ok(stimulus.rows.length >= 3);
    }
  }
  assert.ok(graphs.size >= 2, "Biology requires at least two graph-based sets");
  assert.ok(uncertaintyGraphs >= 1, "Biology requires uncertainty/error-bar interpretation");

  const membrane = fs.readFileSync("assets/ap-biology/membrane-transport.svg", "utf8");
  assert.match(membrane, /M586 130v240/, "Z arrow must point from low exterior to high cytosol");
  const phylogeny = fs.readFileSync("assets/ap-biology/phylogeny.svg", "utf8");
  assert.match(phylogeny, /M600 40h160/);
  assert.match(phylogeny, /M600 120h160/, "both D and E require terminal branches");
  const operon = fs.readFileSync("assets/ap-biology/operon-regulation.svg", "utf8");
  assert.match(operon, /P = promoter/);
  assert.match(operon, /O = operator/);
  const meiosis = fs.readFileSync("assets/ap-biology/meiosis-model.svg", "utf8");
  assert.match(meiosis, /left-exchanged-segment/);
  assert.match(meiosis, /right-exchanged-segment/, "reciprocal segments must appear on both homologs");
  assert.match(meiosis, /After exchange/);
  assert.doesNotMatch(meiosis, /AFTER MEIOSIS I|AFTER MEIOSIS II/);
  assert.doesNotMatch(meiosis, /parental|recombinant/i, "figure must not classify the products for students");
});

test("Biology answer construction avoids systematic key and distractor tells", () => {
  const wordCount = (text) => text.trim().split(/\s+/).length;
  let uniqueLongest = 0;
  let amongLongest = 0;
  let correctWords = 0;
  let distractorWords = 0;

  bank.forEach((question) => {
    const lengths = question.o.map(wordCount);
    const longest = Math.max(...lengths);
    const correctLength = lengths[question.c[0]];
    if (correctLength === longest) amongLongest++;
    if (correctLength === longest && lengths.filter((length) => length === longest).length === 1) uniqueLongest++;
    correctWords += correctLength;
    lengths.forEach((length, index) => { if (index !== question.c[0]) distractorWords += length; });

    const shuffled = shuffleQuestionOptions(question);
    assert.equal(shuffled.o[shuffled.c[0]], question.o[question.c[0]]);

    const distractors = question.o.filter((_, index) => index !== question.c[0]);
    const conspicuous = distractors.filter((option) =>
      /\b(every|always|never|unlimited|identical|entirely impossible)\b/i.test(option)
    );
    assert.ok(conspicuous.length < 2, `${question.id}: multiple conspicuous absolute distractors`);
  });

  const correctAverage = correctWords / bank.length;
  const distractorAverage = distractorWords / (bank.length * 3);
  assert.ok(uniqueLongest / bank.length <= 0.25);
  assert.ok(amongLongest / bank.length <= 0.58);
  assert.ok(Math.abs(correctAverage - distractorAverage) / distractorAverage <= 0.12);
  for (let position = 0; position < 4; position++) {
    assert.equal(bank.filter((question) => question.c[0] === position).length, 45);
  }
});

test("every Biology draw satisfies unit, set, practice, and variant constraints", () => {
  for (let attempt = 0; attempt < 2000; attempt++) {
    const drawn = drawExam(subject, bank);
    assert.equal(drawn.length, 60);
    assert.deepEqual(
      Object.fromEntries(subject.units.map((unit) => [unit.id, drawn.filter((q) => q.unit === unit.id).length])),
      expectedDrawByUnit
    );

    const groups = new Set(drawn.filter((question) => question.stimulusGroupId).map((question) => question.stimulusGroupId));
    assert.ok(groups.size >= 4 && groups.size <= 8);
    groups.forEach((groupId) => {
      assert.equal(
        drawn.filter((question) => question.stimulusGroupId === groupId).length,
        bank.filter((question) => question.stimulusGroupId === groupId).length,
        `${groupId}: stimulus set was split`
      );
    });

    const practices = {};
    const variants = new Set();
    drawn.forEach((question) => {
      const family = question.skill.split(".")[0];
      practices[family] = (practices[family] || 0) + 1;
      if (question.variantGroupId) {
        assert.ok(!variants.has(question.variantGroupId), `${question.variantGroupId}: repeated variant in one exam`);
        variants.add(question.variantGroupId);
      }
    });
    Object.entries(subject.sciencePracticeRanges).forEach(([family, range]) => {
      assert.ok(practices[family] >= range[0] && practices[family] <= range[1],
        `Practice ${family}: ${practices[family]} outside ${range[0]}-${range[1]}`);
    });
  }
});

test("expanded Biology bank keeps independent-attempt overlap near Government's post-expansion level", () => {
  let overlapShare = 0;
  const pairs = 300;
  for (let attempt = 0; attempt < pairs; attempt++) {
    const first = new Set(drawExam(subject, bank).map((question) => question.id));
    const second = drawExam(subject, bank);
    overlapShare += second.filter((question) => first.has(question.id)).length / 60;
  }
  const average = overlapShare / pairs;
  assert.ok(average <= 0.42, `average overlap ${(average * 100).toFixed(1)}% exceeds 42%`);
});
