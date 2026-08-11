const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { shuffleQuestionOptions } = require("../js/draw");

function loadBank() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  for (const file of [
    "data/ap-english-language.js",
    "data/ap-english-language-public-domain.js",
    "data/ap-english-language-public-domain-corrections.js",
  ]) {
    vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
  }
  return sandbox.window.QUESTIONS_AP_ENGLISH_LANGUAGE;
}

const bank = loadBank();
const setIds = ["r-shade", "r-repair", "r-maps", "r-replicas", "r-observers"];
const expectedSkills = ["1.A", "1.B", "1.A", "3.A", "3.B", "3.C", "5.A", "5.B", "5.C", "7.A", "7.B", "7.C"];
const fakeTitles = /Shade Is Public Infrastructure|Intelligence of Repair|Blank Places in Maps|Defense of the Replica|Discipline of Noticing/i;
const absolute = /\b(every|always|never|only|entirely|unlimited|all|none|completely|impossible|certainly|definitely|guarantee[sd]?)\b/i;

function wordCount(text) { return text.trim().split(/\s+/).length; }
function questionsFor(setId) {
  return bank.filter((q) => q.stimulusGroupId === `aplang-g-${setId}`).sort((a, b) => a.id.localeCompare(b.id));
}

test("all five AP Language Reading sets use sourced public-domain nonfiction", () => {
  const fingerprints = {
    "r-shade": /^After considering the historic page,/,
    "r-repair": /^Very soon after I went to live with Mr\. and Mrs\. Auld,/,
    "r-maps": /^I heartily accept the motto,/,
    "r-replicas": /^Between me and the other world there is ever an unasked question:/,
    "r-observers": /^I recall an incident which must have occurred before I was seven years old,/,
  };
  for (const setId of setIds) {
    const questions = questionsFor(setId);
    assert.equal(questions.length, 12, `${setId}: wrong question count`);
    assert.deepEqual(Array.from(questions, (q) => q.topicCode), expectedSkills, `${setId}: skill sequence changed`);
    assert.equal(new Set(questions.map((q) => q.stimulus)).size, 1, `${setId}: stimulus object is not shared`);
    const stimulus = questions[0].stimulus;
    assert.match(stimulus.source, /^Public-domain text: https:\/\/www\.gutenberg\.org\/ebooks\/\d+, \d{4}\.$/);
    assert.doesNotMatch(stimulus.source, /Original/i);
    assert.doesNotMatch(stimulus.title, fakeTitles);
    assert.match(stimulus.text, fingerprints[setId], `${setId}: unexpected excerpt start`);
    assert.ok(wordCount(stimulus.text) >= 450, `${setId}: excerpt unexpectedly short (${wordCount(stimulus.text)} words)`);
    assert.ok(wordCount(stimulus.text) <= 850, `${setId}: excerpt unexpectedly long (${wordCount(stimulus.text)} words)`);
  }

  assert.match(questionsFor("r-repair")[0].stimulus.text, /white man’s power to enslave the black man/);
  assert.match(questionsFor("r-replicas")[0].stimulus.text, /boys’ and girls’ heads/);
  const addams = questionsFor("r-observers")[0].stimulus.text;
  assert.match(addams, /because "the old man clogs our earliest years,"/);
  assert.match(addams, /blacksmith shop was "all there,"/);
});

test("Language Writing draft sets remain original student-draft material", () => {
  const writing = bank.filter((q) => q.setType === "writing-long" || q.setType === "writing-short");
  assert.equal(writing.length, 55);
  assert.ok(writing.every((q) => q.stimulus.source === "Original passage created for AP Exam Practice."));
  assert.equal(new Set(writing.filter((q) => q.setType === "writing-long").map((q) => q.stimulusGroupId)).size, 5);
  assert.equal(new Set(writing.filter((q) => q.setType === "writing-short").map((q) => q.stimulusGroupId)).size, 3);
});

test("new AP Language Reading questions satisfy rationale and answer-construction standards", () => {
  const questions = bank.filter((q) => setIds.includes(q.stimulusGroupId.replace("aplang-g-", "")));
  assert.equal(questions.length, 60);
  let uniqueLongest = 0;
  let amongLongest = 0;
  let correctWords = 0;
  let distractorWords = 0;
  const rawPositions = [0, 0, 0, 0];
  const problems = [];

  for (const q of questions) {
    assert.match(q.id, /^aplang-r-[a-z]+-\d{2}$/);
    assert.ok(q.q.length >= 20, `${q.id}: stem too short`);
    assert.ok(q.e.length >= 90, `${q.id}: rationale too short`);
    assert.doesNotMatch(q.e, /This item applies|Correct answer\.?$/i);
    assert.equal(q.skill, q.topicCode.split(".")[0]);
    const shuffled = shuffleQuestionOptions(q);
    assert.equal(shuffled.o[shuffled.c[0]], q.o[q.c[0]], `${q.id}: shuffle loses semantic key`);
    const distractors = q.o.filter((_, i) => i !== q.c[0]);
    const absoluteCount = distractors.filter((option) => absolute.test(option)).length;
    if (absoluteCount > 1) problems.push(`${q.id}: ${absoluteCount} absolute-language distractors`);

    rawPositions[q.c[0]]++;
    const lengths = q.o.map(wordCount);
    const longest = Math.max(...lengths);
    const correctLength = lengths[q.c[0]];
    if (correctLength === longest) amongLongest++;
    if (correctLength === longest && lengths.filter((n) => n === longest).length === 1) uniqueLongest++;
    correctWords += correctLength;
    lengths.forEach((n, i) => { if (i !== q.c[0]) distractorWords += n; });
  }

  const uniqueShare = uniqueLongest / questions.length;
  const amongShare = amongLongest / questions.length;
  const correctAverage = correctWords / questions.length;
  const distractorAverage = distractorWords / (questions.length * 3);
  const lengthDelta = Math.abs(correctAverage - distractorAverage) / distractorAverage;
  if (uniqueShare > 0.25) problems.push(`unique-longest share ${(100 * uniqueShare).toFixed(1)}%`);
  if (amongShare > 0.58) problems.push(`among-longest share ${(100 * amongShare).toFixed(1)}%`);
  if (lengthDelta > 0.12) problems.push(`correct/distractor length delta ${(100 * lengthDelta).toFixed(1)}%`);
  rawPositions.forEach((count, position) => {
    const share = count / questions.length;
    if (share < 0.15 || share > 0.35) problems.push(`raw answer position ${position}: ${(100 * share).toFixed(1)}%`);
  });

  assert.deepEqual(problems, [], `Language Reading construction defects:\n${problems.join("\n")}`);
});
