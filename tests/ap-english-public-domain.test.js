// Canonical-bank regression coverage for the consolidated AP English public-domain pass.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { shuffleQuestionOptions } = require("../js/draw");

function loadLiteratureWithReplacements() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  for (const file of ["data/ap-english-literature.js"]) {
    if (fs.existsSync(file)) vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
  }
  return sandbox.window.QUESTIONS_AP_ENGLISH_LITERATURE;
}

const bank = loadLiteratureWithReplacements();
const targets = {
  "sf-watch": ["1.A","1.D","1.B","2.B","3.E","3.C","4.B","4.C","4.C","5.C","6.A","7.B"],
  "sf-bell": ["1.A","1.D","1.B","2.B","3.E","3.C","4.B","4.C","4.C","5.C","6.A","7.B"],
  "sf-room": ["1.A","1.D","1.B","2.B","3.E","3.C","4.B","4.C","4.C","5.C","6.B","7.B"],
  "sf-supper": ["1.A","1.C","1.E","2.B","3.E","6.C","4.B","4.C","4.C","5.C","3.D","7.B"],
  "sf-snow": ["1.A","1.D","1.B","2.B","3.E","3.C","4.B","4.C","4.C","5.C","6.A","7.B"],
  "ld-clock": ["1.A","1.C","2.B","3.E","3.E","1.E","5.C","7.D","7.C"],
  "ld-kitchen": ["1.A","1.C","2.B","3.E","3.D","1.E","5.C","7.D","7.C"],
  "ld-orbit": ["1.A","1.C","2.B","3.E","5.D","3.D","1.E","7.D","7.C"],
};
const fakeTitles = /Watchmaker|Crossing Bell|West Room|Committee Supper|Snow Fence|Late Clock|Second Service|Assistant's Name/i;
const absolute = /\b(every|always|never|only|entirely|unlimited|all|none|completely|impossible|certainly|definitely|guarantee[sd]?)\b/i;

function wordCount(text) { return text.trim().split(/\s+/).length; }

test("all eight AP Literature prose/drama sets use real public-domain sources", () => {
  for (const [setId, expectedSkills] of Object.entries(targets)) {
    const groupId = `aplit-g-${setId}`;
    const questions = bank.filter((q) => q.stimulusGroupId === groupId).sort((a, b) => a.id.localeCompare(b.id));
    assert.equal(questions.length, expectedSkills.length, `${setId}: wrong question count`);
    assert.equal(questions.map((q) => q.topicCode).join(","), expectedSkills.join(","), `${setId}: skill sequence changed`);
    assert.equal(new Set(questions.map((q) => q.stimulus)).size, 1, `${setId}: stimulus object is not shared`);
    const stimulus = questions[0].stimulus;
    assert.match(stimulus.source, /^Public-domain text: https:\/\/www\.gutenberg\.org\//);
    assert.doesNotMatch(stimulus.source, /Original/i);
    assert.doesNotMatch(stimulus.title, fakeTitles);
    assert.ok(wordCount(stimulus.text) >= 400, `${setId}: excerpt is unexpectedly short (${wordCount(stimulus.text)} words)`);
    assert.ok(wordCount(stimulus.text) <= 850, `${setId}: excerpt is unexpectedly long (${wordCount(stimulus.text)} words)`);
  }
});

test("the five already-authentic poetry sets are unchanged by the replacement layer", () => {
  const poetry = bank.filter((q) => q.setType === "poetry");
  assert.equal(new Set(poetry.map((q) => q.stimulusGroupId)).size, 5);
  assert.ok(poetry.every((q) => q.stimulus.source.startsWith("Public-domain text: https://en.wikisource.org/")));
  const titles = [...new Set(poetry.map((q) => q.stimulus.title))].sort().join("\n");
  assert.equal(titles, [
    "“A narrow Fellow in the Grass” — Emily Dickinson",
    "“The Darkling Thrush” — Thomas Hardy",
    "“The Tyger” — William Blake",
    "“Up-Hill” — Christina Rossetti",
    "“We Wear the Mask” — Paul Laurence Dunbar",
  ].sort().join("\n"));
});

test("new Literature questions meet rationale, key, absolute-language, and bias standards", () => {
  const questions = bank.filter((q) => Object.prototype.hasOwnProperty.call(targets, q.stimulusGroupId.replace("aplit-g-", "")));
  assert.equal(questions.length, 87);
  let uniqueLongest = 0;
  let amongLongest = 0;
  let correctWords = 0;
  let distractorWords = 0;
  const defects = [];
  const outliers = [];
  for (const q of questions) {
    assert.ok(q.q.length >= 20, `${q.id}: stem too short`);
    assert.ok(q.e.length >= 90, `${q.id}: rationale too short`);
    assert.doesNotMatch(q.e, /This item applies|Correct answer\.?$/i);
    const shuffled = shuffleQuestionOptions(q);
    assert.equal(shuffled.o[shuffled.c[0]], q.o[q.c[0]], `${q.id}: shuffle loses semantic key`);
    const distractors = q.o.filter((_, i) => i !== q.c[0]);
    const absoluteCount = distractors.filter((option) => absolute.test(option)).length;
    if (absoluteCount >= 2) defects.push(`${q.id}: ${absoluteCount} absolute-language distractors`);
    const lengths = q.o.map(wordCount);
    const longest = Math.max(...lengths);
    const c = lengths[q.c[0]];
    if (c === longest) amongLongest++;
    if (c === longest && lengths.filter((n) => n === longest).length === 1) {
      uniqueLongest++;
      outliers.push(`${q.id}: correct=${JSON.stringify(q.o[q.c[0]])} lengths=${lengths.join("/")}`);
    }
    correctWords += c;
    lengths.forEach((n, i) => { if (i !== q.c[0]) distractorWords += n; });
  }
  const correctAvg = correctWords / questions.length;
  const distractorAvg = distractorWords / (questions.length * 3);
  if (uniqueLongest / questions.length > 0.25) defects.push(`unique-longest share ${(100 * uniqueLongest / questions.length).toFixed(1)}%`);
  if (amongLongest / questions.length > 0.58) defects.push(`among-longest share ${(100 * amongLongest / questions.length).toFixed(1)}%`);
  if (Math.abs(correctAvg - distractorAvg) / distractorAvg > 0.12) {
    defects.push(`correct/distractor length delta ${(100 * Math.abs(correctAvg - distractorAvg) / distractorAvg).toFixed(1)}%`);
  }
  if (defects.length) {
    assert.fail(`Literature construction defects:\n${defects.join("\n")}\nUnique-longest outliers:\n${outliers.join("\n")}`);
  }
});
