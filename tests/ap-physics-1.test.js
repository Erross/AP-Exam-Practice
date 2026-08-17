const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { AP_SUBJECTS } = require("../js/subjects");
const { drawExam } = require("../js/draw");

const subject = AP_SUBJECTS.find((item) => item.id === "ap-physics-1");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync("data/ap-physics-1.js", "utf8"), sandbox);
const bank = sandbox.window.QUESTIONS_AP_PHYSICS_1;

test("AP Physics 1 metadata matches the May 2027 clarified exam", () => {
  assert.equal(subject.releaseStatus, "released");
  assert.equal(subject.formatVerified, true);
  assert.equal(subject.mcqCount, 42);
  assert.equal(subject.mcqTimeMinutes, 85);
  assert.equal(subject.totalExamTimeLabel, "3h 0m");
  assert.equal(subject.calculatorAllowed, true);
  assert.equal(subject.freeResponse.timeMinutes, 95);
  assert.deepEqual(subject.units.map((unit) => unit.id), ["U1","U2","U3","U4","U5","U6","U7","U8"]);
  assert.deepEqual(subject.units.map((unit) => unit.examWeight * 42), [5,8,8,5,5,3,3,5]);
  assert.deepEqual(subject.attributeRanges.skill, {
    "2.A": [7,8], "2.B": [9,10], "2.C": [5,6],
    "2.D": [5,6], "3.B": [9,10], "3.C": [3,4],
  });
});

test("the released Physics 1 bank uses only MCQ-assessed skills and sound schema", () => {
  const allowed = new Set(["2.A","2.B","2.C","2.D","3.B","3.C"]);
  const ids = new Set();
  for (const question of bank) {
    assert.match(question.id, /^apphys1-u[1-8]-\d{3}$/);
    assert.ok(!ids.has(question.id), `duplicate id ${question.id}`);
    ids.add(question.id);
    assert.ok(allowed.has(question.skill), `${question.id}: ${question.skill} is not assessed in MCQ`);
    assert.equal(question.type, "s");
    assert.equal(question.o.length, 4);
    assert.equal(question.c.length, 1);
    assert.ok(question.e.length >= 90, `${question.id}: rationale is too short`);
    assert.doesNotMatch(
      [question.q, ...question.o, question.e].join(" "),
      /[ÂÃÎÏ]|\b(?:omega|theta|tau|rho|Delta)_[A-Za-z]/,
      `${question.id}: source contains mojibake or raw symbolic notation`,
    );
  }
});

test("the bank covers the exact 43-topic CED inventory", () => {
  const expected = {
    U1: ["1.1","1.2","1.3","1.4","1.5"],
    U2: ["2.1","2.2","2.3","2.4","2.5","2.6","2.7","2.8","2.9"],
    U3: ["3.1","3.2","3.3","3.4","3.5"],
    U4: ["4.1","4.2","4.3","4.4"],
    U5: ["5.1","5.2","5.3","5.4","5.5","5.6"],
    U6: ["6.1","6.2","6.3","6.4","6.5","6.6"],
    U7: ["7.1","7.2","7.3","7.4"],
    U8: ["8.1","8.2","8.3","8.4"],
  };
  assert.equal(bank.length, 177);
  assert.deepEqual(
    Object.fromEntries(Object.keys(expected).map((unit) => [unit, bank.filter((question) => question.unit === unit).length])),
    { U1: 20, U2: 32, U3: 25, U4: 20, U5: 23, U6: 23, U7: 17, U8: 17 },
  );
  for (const [unit, topics] of Object.entries(expected)) {
    const found = [...new Set(bank.filter((question) => question.unit === unit).map((question) => question.topicCode))].sort();
    assert.deepEqual(found, topics, `${unit}: exact CED topic set changed`);
    for (const topic of topics) {
      assert.ok(bank.filter((question) => question.topicCode === topic).length >= 3, `${topic}: fewer than three variants`);
    }
  }
});

test("the bank has eight original three-question shared data sets", () => {
  const groups = new Map();
  for (const question of bank.filter((item) => item.stimulusGroupId)) {
    if (!groups.has(question.stimulusGroupId)) groups.set(question.stimulusGroupId, []);
    groups.get(question.stimulusGroupId).push(question);
  }
  assert.equal(groups.size, 8);
  assert.deepEqual([...groups.values()].map((items) => items[0].unit).sort(), ["U1","U2","U3","U4","U5","U6","U7","U8"]);
  for (const [groupId, questions] of groups) {
    assert.equal(questions.length, 3, `${groupId}: expected three linked questions`);
    assert.equal(new Set(questions.map((question) => question.unit)).size, 1, `${groupId}: set crosses units`);
    assert.equal(new Set(questions.map((question) => question.stimulus)).size, 1, `${groupId}: stimulus is not shared by reference`);
    const stimulus = questions[0].stimulus;
    assert.equal(stimulus.type, "table");
    assert.equal(stimulus.source, "Original simulated data created for AP Exam Practice.");
    assert.ok(stimulus.description.length >= 60, `${groupId}: stimulus description is too short`);
    assert.ok(stimulus.columns.length >= 2);
    assert.ok(stimulus.rows.length >= 3);
  }
});

test("Physics 1 answer construction avoids systematic key tells", () => {
  const wordCount = (text) => text.trim().split(/\s+/).length;
  const absoluteLanguage = /\b(always|never|every|only|entirely|unlimited|impossible|guaranteed)\b/i;
  let uniqueLongest = 0;
  let exploitableAmongLongest = 0;
  let correctWords = 0;
  let distractorWords = 0;
  const rawKeys = [0,0,0,0];
  for (const question of bank) {
    assert.equal(new Set(question.o.map((option) => option.trim().toLowerCase())).size, 4, `${question.id}: duplicate options`);
    const lengths = question.o.map(wordCount);
    const longest = Math.max(...lengths);
    const correctLength = lengths[question.c[0]];
    const longestCount = lengths.filter((length) => length === longest).length;
    if (correctLength === longest && longestCount === 1) uniqueLongest++;
    if (correctLength === longest && longestCount < 4) exploitableAmongLongest++;
    correctWords += correctLength;
    lengths.forEach((length, index) => { if (index !== question.c[0]) distractorWords += length; });
    rawKeys[question.c[0]]++;
    const absoluteDistractors = question.o.filter((_, index) => index !== question.c[0]).filter((option) => absoluteLanguage.test(option));
    assert.ok(absoluteDistractors.length <= 1, `${question.id}: stacked absolute-language distractors`);
  }
  const correctAverage = correctWords / bank.length;
  const distractorAverage = distractorWords / (bank.length * 3);
  assert.ok(uniqueLongest / bank.length <= 0.25);
  assert.ok(exploitableAmongLongest / bank.length <= 0.58);
  assert.ok(Math.abs(correctAverage - distractorAverage) / distractorAverage <= 0.12);
  rawKeys.forEach((count) => assert.ok(count / bank.length >= 0.15 && count / bank.length <= 0.35));
});

test("every Physics 1 Practice 2.B answer independently recomputes", () => {
  const answer = (id) => {
    const question = bank.find((item) => item.id === id);
    assert.ok(question, `missing quantitative anchor ${id}`);
    return question.o[question.c[0]];
  };
  assert.equal(bank.filter((question) => question.skill === "2.B").length, 46);
  assert.equal(answer("apphys1-u1-002"), `${5 - (-3) > 0 ? "+" : ""}${5 - (-3)} m`);
  assert.equal(answer("apphys1-u1-005"), `${(10 - 4) / 3} m/s^2 east`);
  assert.equal(answer("apphys1-u1-008"), `+${6 * 4} m`);
  assert.equal(answer("apphys1-u1-011"), `${25 - 20} m/s east`);
  assert.equal(answer("apphys1-u1-014"), `${6 * 2} m`);
  assert.equal(answer("apphys1-u1-016"), `${(12 - 2) / (3 - 1)} m/s right`);
  assert.equal(answer("apphys1-u2-002"), `x = ${(1 * 0 + 3 * 4) / (1 + 3)} m`);
  assert.equal(answer("apphys1-u2-014"), `${(30 - 12) / 6} m/s^2 right`);
  assert.equal(answer("apphys1-u2-017"), `${5 * 9.8} N downward`);
  assert.equal(answer("apphys1-u2-020"), `${(0.2 * 10 * 9.8).toFixed(1)} N`);
  assert.equal(answer("apphys1-u2-023"), `${200 * 0.05} N`);
  assert.equal(answer("apphys1-u2-026"), `${2 * 6 ** 2 / 3} N`);
  assert.equal(answer("apphys1-u2-028"), `${(1.5 / 0.75).toFixed(1)} kg`);
  assert.equal(answer("apphys1-u3-002"), `${0.5 * 4 * 3 ** 2} J`);
  assert.equal(answer("apphys1-u3-006"), `${20 * 5} J`);
  assert.equal(answer("apphys1-u3-010"), `${2 * 9.8 * 5} J`);
  assert.equal(answer("apphys1-u3-014"), `About ${Math.sqrt(2 * 9.8 * 5).toFixed(1)} m/s`);
  assert.equal(answer("apphys1-u3-018"), `${1200 / 4} W`);
  assert.equal(answer("apphys1-u3-021"), `About ${(0.5 * 2 * 3.96 ** 2).toFixed(1)} J`);
  assert.equal(answer("apphys1-u4-002"), `${3 * 4} kg*m/s east`);
  assert.equal(answer("apphys1-u4-005"), `${(10 * 0.3).toFixed(1)} N*s`);
  assert.equal(answer("apphys1-u4-008"), `${2 * 3 / (2 + 1)} m/s right`);
  assert.equal(answer("apphys1-u4-012"), `${4} m/s`);
  assert.equal(answer("apphys1-u4-016"), `+${(1 * 4 + 3 * 0).toFixed(1)} kg*m/s`);
  assert.equal(answer("apphys1-u5-002"), `${(10 - 2) / 4} rad/s^2`);
  assert.equal(answer("apphys1-u5-005"), `${0.4 * 5}.0 m/s`);
  assert.equal(answer("apphys1-u5-008"), `${(12 * 0.25).toFixed(1)} N*m`);
  assert.equal(answer("apphys1-u5-011"), `${2 * 2 * 0.5 ** 2}.0 kg*m^2`);
  assert.equal(answer("apphys1-u5-014"), `${30 * 2 / 20}.0 m from the pivot`);
  assert.equal(answer("apphys1-u5-017"), `${(6 / 2).toFixed(1)} rad/s^2`);
  assert.equal(answer("apphys1-u5-019"), `${(0.4 / 1).toFixed(2)} kg*m^2`);
  assert.equal(answer("apphys1-u6-002"), `${0.5 * 4 * 3 ** 2} J`);
  assert.equal(answer("apphys1-u6-005"), `${5 * 4} J`);
  assert.equal(answer("apphys1-u6-008"), `${3 * 4} kg*m^2/s`);
  assert.equal(answer("apphys1-u6-011"), `${6 * 3 / 2} rad/s`);
  assert.equal(answer("apphys1-u6-014"), `${(0.5 * 8).toFixed(1)} m/s`);
  assert.equal(answer("apphys1-u6-017"), "v = sqrt(GM/r)");
  assert.equal(answer("apphys1-u6-019"), `${(4 * 1.5).toFixed(1)} kg*m^2/s`);
  assert.equal(answer("apphys1-u7-005"), `${12 / 6}.0 Hz and ${(6 / 12).toFixed(2)} s`);
  assert.equal(answer("apphys1-u7-011"), `${(0.5 * 200 * 0.1 ** 2).toFixed(1)} J`);
  assert.equal(answer("apphys1-u7-013"), `${2}.0 s and ${(1 / 2).toFixed(2)} Hz`);
  assert.equal(answer("apphys1-u8-002"), `${6 / 0.003} kg/m^3`);
  assert.equal(answer("apphys1-u8-005"), `${1000 * 9.8 * 5} Pa`);
  assert.equal(answer("apphys1-u8-008"), `${1000 * 9.8 * 0.02} N`);
  assert.equal(answer("apphys1-u8-011"), `${0.03 * 2 / 0.01}.0 m/s`);
  assert.equal(answer("apphys1-u8-013"), `Area times speed is ${6 * 2} cm^2*m/s at every section.`);
});

test("Physics 1 randomized forms obey exact unit, skill, and shared-set constraints", () => {
  const targetUnits = { U1:5, U2:8, U3:8, U4:5, U5:5, U6:3, U7:3, U8:5 };
  const observedMin = Object.fromEntries(Object.keys(subject.attributeRanges.skill).map((skill) => [skill, Infinity]));
  const observedMax = Object.fromEntries(Object.keys(subject.attributeRanges.skill).map((skill) => [skill, 0]));
  let minSets = Infinity;
  let maxSets = 0;
  for (let trial = 0; trial < 1000; trial++) {
    const draw = drawExam(subject, bank);
    assert.equal(draw.length, 42);
    const units = {};
    const skills = {};
    for (const question of draw) {
      units[question.unit] = (units[question.unit] || 0) + 1;
      skills[question.skill] = (skills[question.skill] || 0) + 1;
    }
    assert.deepEqual(units, targetUnits);
    for (const [skill, range] of Object.entries(subject.attributeRanges.skill)) {
      assert.ok(skills[skill] >= range[0] && skills[skill] <= range[1], `${skill}: ${skills[skill]} outside ${range}`);
      observedMin[skill] = Math.min(observedMin[skill], skills[skill]);
      observedMax[skill] = Math.max(observedMax[skill], skills[skill]);
    }
    const groupCounts = {};
    for (const question of draw.filter((item) => item.stimulusGroupId)) {
      groupCounts[question.stimulusGroupId] = (groupCounts[question.stimulusGroupId] || 0) + 1;
    }
    assert.ok(Object.values(groupCounts).every((count) => count === 3), "a shared set was split");
    const setCount = Object.keys(groupCounts).length;
    assert.ok(setCount >= 2 && setCount <= 4);
    minSets = Math.min(minSets, setCount);
    maxSets = Math.max(maxSets, setCount);
  }
  console.log("Physics 1 skill envelope", { min: observedMin, max: observedMax, stimulusSets: [minSets, maxSets] });
});

test("Physics 1 retake overlap remains at or below the project target", () => {
  let total = 0;
  for (let trial = 0; trial < 500; trial++) {
    const first = drawExam(subject, bank);
    const second = drawExam(subject, bank);
    const firstIds = new Set(first.map((question) => question.id));
    total += second.filter((question) => firstIds.has(question.id)).length / 42;
  }
  const overlap = total / 500;
  console.log(`Physics 1 Monte Carlo overlap: ${(overlap * 100).toFixed(1)}%`);
  assert.ok(overlap <= 0.40);
});
