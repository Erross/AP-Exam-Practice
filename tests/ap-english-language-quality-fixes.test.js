const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

function loadEffectiveBank() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync("data/ap-english-language.js", "utf8"), sandbox);
  vm.runInContext(fs.readFileSync("data/ap-english-language-quality-fixes.js", "utf8"), sandbox);
  return sandbox.window.QUESTIONS_AP_ENGLISH_LANGUAGE;
}

const bank = loadEffectiveBank();
const byId = new Map(bank.map((q) => [q.id, q]));
const answer = (id) => { const q = byId.get(id); return q.o[q.c[0]]; };

test("AP Language audited giveaway items now require plausible rhetorical distinctions", () => {
  assert.match(answer("aplang-r-shade-08"), /observation of a social problem, diagnosis/i);
  assert.match(answer("aplang-r-shade-12"), /extends the preceding claim through an analogy/i);
  assert.match(answer("aplang-r-repair-08"), /prohibition on instruction.*interpretation.*determination/i);
  assert.match(answer("aplang-r-maps-11"), /parallel negative clauses.*prepare the contrasting claim/i);
  assert.match(answer("aplang-r-replicas-09"), /concrete origin scene/i);
  assert.match(answer("aplang-r-observers-09"), /practical waking response to the dream/i);
  assert.match(answer("aplang-r-observers-12"), /balance two opposing features/i);
  assert.match(answer("aplang-w-start-02"), /child-care conflicts.*current schedule and the pilot/i);
  assert.match(answer("aplang-w-native-03"), /protocol identifying observations and measurements/i);
  assert.match(answer("aplang-ws-news-02"), /request factual corrections or review/i);
});

test("hardened AP Language distractors are relevant competitors, not cartoon wrong answers", () => {
  const ids = [
    "aplang-r-shade-08", "aplang-r-shade-12", "aplang-r-repair-08", "aplang-r-maps-11",
    "aplang-r-replicas-09", "aplang-r-observers-09", "aplang-r-observers-12",
    "aplang-w-start-02", "aplang-w-native-03", "aplang-ws-news-02",
  ];
  const banned = /unrelated examples|complete withdrawal|unrelated portrait|scanner's electrical cord|price of repainting|no family will experience any inconvenience/i;
  ids.forEach((id) => {
    const q = byId.get(id);
    assert.equal(new Set(q.o).size, 4, `${id}: duplicate option`);
    q.o.forEach((option) => assert.doesNotMatch(option, banned, `${id}: weak distractor survived`));
    assert.ok(q.e.length >= 140, `${id}: rationale does not explain the distinction`);
  });
});

test("effective AP Language bank keeps answer-length and absolute-language cues controlled", () => {
  const wc = (text) => text.trim().split(/\s+/).length;
  const absolute = /\b(always|never|every|only|entirely|unlimited|none|all|impossible|guarantee[sd]?|completely|identical)\b/i;
  let uniqueLongest = 0;
  let correctWords = 0;
  let distractorWords = 0;
  for (const q of bank) {
    const lengths = q.o.map(wc);
    const longest = Math.max(...lengths);
    if (lengths[q.c[0]] === longest && lengths.filter((n) => n === longest).length === 1) uniqueLongest++;
    correctWords += lengths[q.c[0]];
    const distractors = q.o.filter((_, i) => i !== q.c[0]);
    distractors.forEach((option) => { distractorWords += wc(option); });
    assert.ok(distractors.filter((option) => absolute.test(option)).length < 2, `${q.id}: stacked absolute distractors`);
  }
  const ca = correctWords / bank.length;
  const da = distractorWords / (bank.length * 3);
  assert.ok(uniqueLongest / bank.length <= 0.25);
  assert.ok(Math.abs(ca - da) / da <= 0.12);
  assert.deepEqual([0,1,2,3].map((i) => bank.filter((q) => q.c[0] === i).length), [29,29,29,28]);
});
