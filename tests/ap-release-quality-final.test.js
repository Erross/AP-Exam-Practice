const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

function load(paths, dataVar) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  for (const path of paths) vm.runInContext(fs.readFileSync(path, "utf8"), sandbox);
  return sandbox.window[dataVar];
}

const banks = {
  "English Language": load([
    "data/ap-english-language.js",
    "data/ap-english-language-quality-fixes.js",
  ], "QUESTIONS_AP_ENGLISH_LANGUAGE"),
  "English Literature": load([
    "data/ap-english-literature.js",
    "data/ap-english-literature-quality-fixes.js",
  ], "QUESTIONS_AP_ENGLISH_LITERATURE"),
  Chemistry: load([
    "data/ap-chemistry.js",
    "data/ap-chemistry-curation.js",
    "data/ap-chemistry-corrections.js",
    "data/ap-chemistry-quality-fixes.js",
  ], "QUESTIONS_AP_CHEMISTRY"),
  "Calculus AB": load([
    "data/ap-calculus-ab.js",
    "data/ap-calculus-ab-quality-fixes.js",
  ], "QUESTIONS_AP_CALCULUS_AB"),
  "Physics 2": load([
    "data/ap-physics-2.js",
    "data/ap-physics-2-quality-fixes.js",
  ], "QUESTIONS_AP_PHYSICS_2"),
};

const wordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length;
const ABSOLUTE = /\b(always|never|every|only|entirely|unlimited|none|all|impossible|guarantee[sd]?|completely|identical)\b/i;

test("all five audited release banks remain free of systemic answer-length cues", () => {
  for (const [name, bank] of Object.entries(banks)) {
    let uniqueLongest = 0;
    let correctWords = 0;
    let distractorWords = 0;
    for (const q of bank) {
      const lengths = q.o.map(wordCount);
      const longest = Math.max(...lengths);
      if (lengths[q.c[0]] === longest && lengths.filter((n) => n === longest).length === 1) uniqueLongest++;
      correctWords += lengths[q.c[0]];
      q.o.forEach((option, i) => { if (i !== q.c[0]) distractorWords += wordCount(option); });
    }
    const correctAvg = correctWords / bank.length;
    const distractorAvg = distractorWords / (bank.length * 3);
    assert.ok(uniqueLongest / bank.length <= 0.25, `${name}: uniquely-longest correct rate ${(100 * uniqueLongest / bank.length).toFixed(1)}%`);
    assert.ok(Math.abs(correctAvg - distractorAvg) / distractorAvg <= 0.12, `${name}: correct/distractor length gap ${correctAvg.toFixed(2)} vs ${distractorAvg.toFixed(2)}`);
  }
});

test("all five audited release banks avoid stacked absolute-language distractors", () => {
  for (const [name, bank] of Object.entries(banks)) {
    for (const q of bank) {
      const distractors = q.o.filter((_, i) => i !== q.c[0]);
      const hits = distractors.filter((option) => ABSOLUTE.test(option));
      assert.ok(hits.length < 2, `${name} ${q.id}: stacked absolute distractors ${JSON.stringify(hits)}`);
    }
  }
});

test("all five audited release banks have balanced raw key positions", () => {
  for (const [name, bank] of Object.entries(banks)) {
    const counts = [0,1,2,3].map((i) => bank.filter((q) => q.c[0] === i).length);
    const min = Math.min(...counts);
    const max = Math.max(...counts);
    assert.ok(max - min <= 1, `${name}: raw key positions ${counts.join("/")}`);
  }
});

test("AP Language w-start-06 no longer exposes a one-short-option versus long-options tell", () => {
  const bank = banks["English Language"];
  const q = bank.find((item) => item.id === "aplang-w-start-06");
  assert.ok(q, "aplang-w-start-06 missing");
  const lengths = q.o.map(wordCount);
  const shortest = Math.min(...lengths);
  const longest = Math.max(...lengths);
  assert.ok(shortest >= 4 || longest <= shortest * 2.5, `aplang-w-start-06 option-shape outlier: q=${JSON.stringify(q.q)} options=${JSON.stringify(q.o)} lengths=${JSON.stringify(lengths)} correct=${q.c[0]}`);
});
