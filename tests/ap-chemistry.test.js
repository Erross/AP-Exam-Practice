const test = require("node:test");
const assert = require("node:assert/strict");
const { AP_SUBJECTS } = require("../js/subjects");
const { drawExam, shuffleQuestionOptions } = require("../js/draw");
const { loadChemistryBank } = require("./helpers");

const bank = loadChemistryBank();
const subject = AP_SUBJECTS.find((item) => item.id === "ap-chemistry");
const expectedTopicCounts = [8, 7, 13, 9, 11, 9, 12, 11, 11];
const expectedBankByUnit = { U1: 16, U2: 14, U3: 26, U4: 18, U5: 22, U6: 18, U7: 24, U8: 22, U9: 22 };
const expectedDrawByUnit = { U1: 6, U2: 6, U3: 13, U4: 6, U5: 5, U6: 5, U7: 5, U8: 9, U9: 5 };
const allowedSkills = new Set([
  "1.A", "1.B",
  "2.A", "2.B", "2.C", "2.D", "2.E", "2.F",
  "4.A", "4.B", "4.C", "4.D",
  "5.A", "5.B", "5.C", "5.D", "5.E", "5.F",
  "6.A", "6.B", "6.C", "6.D", "6.E", "6.F", "6.G",
]);

function stimulusGroups() {
  const groups = new Map();
  bank.filter((q) => q.stimulusGroupId).forEach((q) => {
    if (!groups.has(q.stimulusGroupId)) groups.set(q.stimulusGroupId, []);
    groups.get(q.stimulusGroupId).push(q);
  });
  return groups;
}

test("Chemistry metadata and 91-topic CED coverage are complete", () => {
  assert.equal(bank.length, 182);
  assert.equal(subject.releaseStatus, "draft");
  assert.equal(subject.formatVerified, true);
  assert.equal(subject.mcqCount, 60);
  assert.equal(subject.mcqTimeMinutes, 90);
  assert.deepEqual(subject.stimulusSetRange, [2, 5]);
  assert.deepEqual(subject.sciencePracticeRanges, {
    "1": [5, 7], "2": [5, 7], "4": [14, 18], "5": [21, 25], "6": [5, 7],
  });

  const ids = new Set();
  const topics = new Map();
  const variants = new Map();
  const validUnits = new Set(subject.units.map((unit) => unit.id));
  const practiceCounts = {};

  for (const q of bank) {
    assert.match(q.id, /^apchem-u[1-9]-\d{3}$/);
    assert.ok(!ids.has(q.id), `duplicate id ${q.id}`);
    ids.add(q.id);
    assert.ok(validUnits.has(q.unit), `${q.id}: invalid unit`);
    assert.match(q.topicCode, new RegExp(`^${q.unit.slice(1)}\\.\\d+$`));
    assert.ok(allowedSkills.has(q.skill), `${q.id}: invalid science practice ${q.skill}`);
    assert.equal(q.type, "s");
    assert.equal(q.o.length, 4);
    assert.equal(q.c.length, 1);
    assert.ok(Number.isInteger(q.c[0]) && q.c[0] >= 0 && q.c[0] < 4);
    assert.ok(q.q.length >= 20, `${q.id}: stem too short`);
    assert.ok(q.e.length >= 90, `${q.id}: explanation too short`);
    assert.doesNotMatch(q.e, /This item applies CED Topic|Correct answer\.?$/i);
    assert.doesNotMatch(q.e, /This reasoning connects the observed or calculated result directly to the chemical model in the question\./i,
      `${q.id}: boilerplate rationale filler remains`);

    topics.set(q.topicCode, (topics.get(q.topicCode) || 0) + 1);
    const family = q.skill.split(".")[0];
    practiceCounts[family] = (practiceCounts[family] || 0) + 1;

    if (q.variantGroupId) {
      assert.ok(!q.stimulusGroupId, `${q.id}: stimulus item also tagged as variant`);
      if (!variants.has(q.variantGroupId)) variants.set(q.variantGroupId, []);
      variants.get(q.variantGroupId).push(q);
    }
  }

  expectedTopicCounts.forEach((count, unitIndex) => {
    for (let topic = 1; topic <= count; topic++) {
      const code = `${unitIndex + 1}.${topic}`;
      assert.ok(topics.has(code), `missing CED topic ${code}`);
      assert.ok(topics.get(code) >= 2, `${code}: topic has only token coverage`);
    }
  });
  assert.equal(topics.size, 91);
  assert.deepEqual(
    Object.fromEntries(subject.units.map((u) => [u.id, bank.filter((q) => q.unit === u.id).length])),
    expectedBankByUnit
  );
  assert.deepEqual(practiceCounts, { "1": 16, "2": 15, "4": 53, "5": 76, "6": 22 });

  assert.equal(variants.size, 69);
  assert.equal([...variants.values()].flat().length, 138);
  for (const [groupId, questions] of variants) {
    assert.ok(questions.length >= 2, `${groupId}: variant group too small`);
    assert.equal(new Set(questions.map((q) => q.unit)).size, 1, `${groupId}: variants cross units`);
    assert.equal(new Set(questions.map((q) => q.topicCode)).size, 1, `${groupId}: variants cross topics`);
    assert.equal(new Set(questions.map((q) => q.q.trim().toLowerCase())).size, questions.length,
      `${groupId}: duplicate stems inside variant group`);
  }
});

test("Chemistry stimulus groups retain shared synthetic provenance", () => {
  const groups = stimulusGroups();
  assert.equal(groups.size, 8);
  for (const [groupId, questions] of groups) {
    assert.equal(questions.length, 3, `${groupId}: expected three-question set`);
    assert.equal(new Set(questions.map((q) => q.unit)).size, 1, `${groupId}: set crosses units`);
    assert.equal(new Set(questions.map((q) => q.stimulus)).size, 1, `${groupId}: stimulus object not shared by reference`);
    const stimulus = questions[0].stimulus;
    assert.equal(stimulus.type, "quantitative");
    assert.match(stimulus.source, /^Original simulated/i);
    assert.ok(Array.isArray(stimulus.columns) && stimulus.columns.length >= 2);
    assert.ok(Array.isArray(stimulus.rows) && stimulus.rows.length >= 3);
    assert.ok(stimulus.description.length >= 60);
  }
});

test("Chemistry answer construction has no statistical or absolute-language tells", () => {
  const wordCount = (text) => text.trim().split(/\s+/).length;
  const absolute = /\b(every|always|never|only|entirely|unlimited|identical)\b/i;
  let uniqueLongest = 0;
  let amongLongest = 0;
  let correctWords = 0;
  let distractorWords = 0;

  for (const q of bank) {
    const lengths = q.o.map(wordCount);
    const longest = Math.max(...lengths);
    const correctLength = lengths[q.c[0]];
    if (correctLength === longest) amongLongest++;
    if (correctLength === longest && lengths.filter((n) => n === longest).length === 1) uniqueLongest++;
    correctWords += correctLength;
    const distractors = q.o.filter((_, index) => index !== q.c[0]);
    distractors.forEach((option) => { distractorWords += wordCount(option); });
    assert.ok(distractors.filter((option) => absolute.test(option)).length < 2,
      `${q.id}: multiple conspicuous absolute-language distractors`);

    const shuffled = shuffleQuestionOptions(q);
    assert.equal(shuffled.o[shuffled.c[0]], q.o[q.c[0]], `${q.id}: shuffling lost semantic key`);
  }

  const correctAverage = correctWords / bank.length;
  const distractorAverage = distractorWords / (bank.length * 3);
  assert.ok(uniqueLongest / bank.length <= 0.25);
  assert.ok(amongLongest / bank.length <= 0.58);
  assert.ok(Math.abs(correctAverage - distractorAverage) / distractorAverage <= 0.12);
  assert.deepEqual([0, 1, 2, 3].map((i) => bank.filter((q) => q.c[0] === i).length), [46, 46, 45, 45]);
});

test("semantic-key regressions remain fixed after curation and rebalance", () => {
  const expected = {
    "apchem-u3-022": "An upward arrow connecting the lower level to the upper level",
    "apchem-u6-010": "Particles become farther apart while individual molecules remain intact",
    "apchem-u7-002": "Forward rate falls and reverse rate rises until the two become equal and nonzero",
    "apchem-u3-020": "Add equal excess dye to equal solvent volumes at the same temperature, equilibrate, then measure dissolved concentration in each filtered liquid",
    "apchem-u4-002": "Run the reaction in a sealed flexible container and measure the total mass before and after",
    "apchem-u4-014": "Pass the gas through a validated CO2 indicator or absorbent and compare with a blank control",
    "apchem-u5-014": "Measure initial rates while independently varying reactant concentrations and compare the observed rate law with each mechanism's prediction",
    "apchem-u5-022": "Compare time courses with and without the substance from identical starting mixtures, then verify both approach the same equilibrium composition",
    "apchem-u6-002": "Measure solution temperature before and after dissolving a known amount in an insulated cup while minimizing heat exchange with the surroundings",
    "apchem-u6-018": "Measure calorimetric enthalpies for accessible reactions that algebraically sum to the target reaction, then add the corresponding ΔH values",
    "apchem-u7-004": "Determine forward and reverse rates over time and show they become equal while both remain nonzero",
    "apchem-u7-018": "Prepare identical equilibrium mixtures at one temperature, add a measured reactant amount to the treatment only, and compare compositions after re-equilibration",
    "apchem-u8-002": "Show that it accepts H+ from a suitable proton donor and forms its conjugate acid",
    "apchem-u8-016": "Add equal small amounts of strong acid to equal volumes and compare the resulting pH changes",
    "apchem-u8-022": "Equilibrate excess solid with solutions spanning controlled pH values at one temperature and measure dissolved-ion concentration",
  };
  for (const [id, correct] of Object.entries(expected)) {
    const q = bank.find((item) => item.id === id);
    assert.equal(q.o[q.c[0]], correct, `${id}: semantic key regressed`);
  }
});

test("every Chemistry draw satisfies unit, practice, set, and variant constraints", () => {
  const groups = stimulusGroups();
  for (let attempt = 0; attempt < 2000; attempt++) {
    const drawn = drawExam(subject, bank);
    assert.equal(drawn.length, 60);
    assert.deepEqual(
      Object.fromEntries(subject.units.map((u) => [u.id, drawn.filter((q) => q.unit === u.id).length])),
      expectedDrawByUnit
    );

    const drawnGroups = new Set(drawn.filter((q) => q.stimulusGroupId).map((q) => q.stimulusGroupId));
    assert.ok(drawnGroups.size >= 2 && drawnGroups.size <= 5, `stimulus set count ${drawnGroups.size} outside 2-5`);
    for (const groupId of drawnGroups) {
      assert.equal(drawn.filter((q) => q.stimulusGroupId === groupId).length, groups.get(groupId).length,
        `${groupId}: stimulus set split`);
    }

    const practices = {};
    const variants = new Set();
    for (const q of drawn) {
      const family = q.skill.split(".")[0];
      practices[family] = (practices[family] || 0) + 1;
      if (q.variantGroupId) {
        assert.ok(!variants.has(q.variantGroupId), `${q.variantGroupId}: repeated variant in one exam`);
        variants.add(q.variantGroupId);
      }
    }
    for (const [family, [min, max]] of Object.entries(subject.sciencePracticeRanges)) {
      assert.ok(practices[family] >= min && practices[family] <= max,
        `Practice ${family}: ${practices[family]} outside ${min}-${max}`);
    }
  }
});

test("Chemistry retake overlap remains at or below the repo target", () => {
  let total = 0;
  const pairs = 1000;
  for (let attempt = 0; attempt < pairs; attempt++) {
    const first = new Set(drawExam(subject, bank).map((q) => q.id));
    const second = drawExam(subject, bank);
    total += second.filter((q) => first.has(q.id)).length / 60;
  }
  const average = total / pairs;
  assert.ok(average <= 0.40, `average overlap ${(average * 100).toFixed(1)}% exceeds 40%`);
});
