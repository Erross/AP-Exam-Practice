const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { AP_SUBJECTS } = require("../js/subjects");
const { drawExam, shuffleQuestionOptions } = require("../js/draw");

function loadBank(file, globalName) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file, "utf8"), sandbox);
  return sandbox.window[globalName];
}

const language = {
  subject: AP_SUBJECTS.find((item) => item.id === "ap-english-language"),
  bank: loadBank("data/ap-english-language.js", "QUESTIONS_AP_ENGLISH_LANGUAGE"),
};
const literature = {
  subject: AP_SUBJECTS.find((item) => item.id === "ap-english-literature"),
  bank: loadBank("data/ap-english-literature.js", "QUESTIONS_AP_ENGLISH_LITERATURE"),
};

function groupsOf(bank) {
  const groups = new Map();
  bank.forEach((question) => {
    if (!groups.has(question.stimulusGroupId)) groups.set(question.stimulusGroupId, []);
    groups.get(question.stimulusGroupId).push(question);
  });
  return groups;
}

function assertCommonSchema(bank, idPattern, skills) {
  const ids = new Set();
  const groups = groupsOf(bank);
  bank.forEach((question) => {
    assert.match(question.id, idPattern);
    assert.ok(!ids.has(question.id), `duplicate id ${question.id}`);
    ids.add(question.id);
    assert.equal(question.type, "s");
    assert.equal(question.o.length, 4);
    assert.equal(question.c.length, 1);
    assert.ok(Number.isInteger(question.c[0]) && question.c[0] >= 0 && question.c[0] < 4);
    assert.ok(skills.has(question.topicCode), `${question.id}: unsupported CED skill ${question.topicCode}`);
    assert.equal(question.skill, question.topicCode.split(".")[0]);
    assert.ok(question.q.length >= 20, `${question.id}: stem is too short`);
    assert.ok(question.e.length >= 90, `${question.id}: explanation lacks reasoning`);
    assert.doesNotMatch(question.e, /This item applies|Correct answer\.?$/i);
    assert.ok(question.stimulusGroupId && question.stimulus);
    assert.equal(question.stimulus.type, "text");
    assert.ok(question.stimulus.text.length >= 200);
    assert.match(question.stimulus.source, /Original|^Public-domain text: https:\/\//);

    const shuffled = shuffleQuestionOptions(question);
    assert.equal(shuffled.o[shuffled.c[0]], question.o[question.c[0]]);
    const conspicuous = question.o.filter((option, index) =>
      index !== question.c[0] && /\b(every|always|never|unlimited|identical|entirely|certainly|definitely|guarantee[sd]?)\b/i.test(option)
    );
    assert.ok(conspicuous.length < 2, `${question.id}: multiple conspicuous absolute distractors`);
  });

  for (const [groupId, questions] of groups) {
    assert.equal(new Set(questions.map((q) => q.stimulus)).size, 1, `${groupId}: stimulus object mismatch`);
    assert.equal(new Set(questions.map((q) => q.setType)).size, 1, `${groupId}: set type mismatch`);
  }
  return groups;
}

function assertAnswerBias(bank) {
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
  });
  const correctAverage = correctWords / bank.length;
  const distractorAverage = distractorWords / (bank.length * 3);
  assert.ok(uniqueLongest / bank.length <= 0.25);
  assert.ok(amongLongest / bank.length <= 0.58);
  assert.ok(Math.abs(correctAverage - distractorAverage) / distractorAverage <= 0.12);
  for (let position = 0; position < 4; position++) {
    const share = bank.filter((question) => question.c[0] === position).length / bank.length;
    assert.ok(share >= 0.15 && share <= 0.35, `raw answer position ${position} is imbalanced`);
  }
}

test("English Language bank matches the current five-set CED structure", () => {
  assert.equal(language.bank.length, 115);
  assert.equal(language.subject.formatVerified, true);
  assert.equal(language.subject.releaseStatus, "draft", "independent review is still required before release");
  const skills = new Set(["1.A", "1.B", "3.A", "3.B", "3.C", "5.A", "5.B", "5.C", "7.A", "7.B", "7.C",
    "2.A", "2.B", "4.A", "4.B", "4.C", "6.A", "6.B", "6.C", "8.A", "8.B", "8.C"]);
  const groups = assertCommonSchema(language.bank, /^aplang-[a-z-]+-\d{2}$/, skills);
  assert.equal(groups.size, 13);
  assert.deepEqual(
    Object.fromEntries([...groups].map(([id, questions]) => [id, questions.length])),
    Object.fromEntries([...groups].map(([id, questions]) => [id, questions[0].setType === "reading" ? 12 : questions[0].setType === "writing-long" ? 8 : 5]))
  );
  assertAnswerBias(language.bank);
});

test("every English Language draw has 24 Reading and 21 Writing questions in official set order", () => {
  const expectedSkills = { "1": 6, "2": 6, "3": 6, "4": 5, "5": 6, "6": 5, "7": 6, "8": 5 };
  for (let attempt = 0; attempt < 1000; attempt++) {
    const drawn = drawExam(language.subject, language.bank);
    assert.equal(drawn.length, 45);
    assert.deepEqual(drawn.map((q) => q.setType), [
      ...Array(24).fill("reading"), ...Array(16).fill("writing-long"), ...Array(5).fill("writing-short"),
    ]);
    assert.equal(new Set(drawn.map((q) => q.stimulusGroupId)).size, 5);
    assert.deepEqual(
      Object.fromEntries([...Array(8)].map((_, i) => [String(i + 1), drawn.filter((q) => q.skill === String(i + 1)).length])),
      expectedSkills
    );
    assert.deepEqual(
      Object.fromEntries(language.subject.units.map((unit) => [unit.id, drawn.filter((q) => q.unit === unit.id).length])),
      { RHS: 12, CLE: 11, REO: 11, STL: 11 }
    );
  }
});

test("English Literature bank covers the required prose, poetry, and drama composition", () => {
  assert.equal(literature.bank.length, 142);
  assert.equal(literature.subject.formatVerified, true);
  assert.equal(literature.subject.releaseStatus, "draft", "independent review is still required before release");
  const skills = new Set(["1.A", "1.C", "1.D", "1.E", "2.A", "3.B", "3.D", "4.A", "4.B", "4.C", "5.A", "5.B", "6.A", "6.B", "7.A", "7.B", "7.C"]);
  const groups = assertCommonSchema(literature.bank, /^aplit-[a-z-]+-\d{2}$/, skills);
  assert.equal(groups.size, 13);
  const sizes = { "short-fiction": 12, poetry: 11, "longer-drama": 9 };
  for (const [groupId, questions] of groups) {
    assert.equal(questions.length, sizes[questions[0].setType], `${groupId}: wrong set size`);
  }
  assert.equal(new Set(literature.bank.filter((q) => q.setType === "poetry").map((q) => q.stimulusGroupId)).size, 5);
  assert.ok(literature.bank.filter((q) => q.setType !== "poetry" && q.era === "contemporary").length > 0);
  assert.ok(literature.bank.filter((q) => q.era.startsWith("pre-20th")).length > 0);
  assertAnswerBias(literature.bank);
});

test("every English Literature draw stays within content and skill ranges", () => {
  const expectedSkills = { "1": 10, "2": 3, "3": 10, "4": 13, "5": 6, "6": 6, "7": 7 };
  for (let attempt = 0; attempt < 1000; attempt++) {
    const drawn = drawExam(literature.subject, literature.bank);
    assert.equal(drawn.length, 55);
    assert.equal(new Set(drawn.map((q) => q.stimulusGroupId)).size, 5);
    assert.deepEqual(
      Object.fromEntries(literature.subject.units.map((unit) => [unit.id, drawn.filter((q) => q.unit === unit.id).length])),
      { SF: 24, PO: 22, LD: 9 }
    );
    assert.deepEqual(
      Object.fromEntries([...Array(7)].map((_, i) => [String(i + 1), drawn.filter((q) => q.skill === String(i + 1)).length])),
      expectedSkills
    );
    const types = Object.fromEntries(["short-fiction", "poetry", "longer-drama"].map((type) => [type,
      new Set(drawn.filter((q) => q.setType === type).map((q) => q.stimulusGroupId)).size]));
    assert.deepEqual(types, { "short-fiction": 2, poetry: 2, "longer-drama": 1 });
  }
});

test("English banks keep independent-attempt overlap at or below the project target", () => {
  for (const { subject, bank } of [language, literature]) {
    let overlap = 0;
    const pairs = 500;
    for (let attempt = 0; attempt < pairs; attempt++) {
      const first = new Set(drawExam(subject, bank).map((question) => question.id));
      overlap += drawExam(subject, bank).filter((question) => first.has(question.id)).length / subject.mcqCount;
    }
    const average = overlap / pairs;
    assert.ok(average <= 0.42, `${subject.id}: average overlap ${(100 * average).toFixed(1)}% exceeds 42%`);
  }
});

