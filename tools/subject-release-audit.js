const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { AP_SUBJECTS } = require("../js/subjects");
const { drawExam } = require("../js/draw");

const ABSOLUTE_LANGUAGE = /\b(always|never|every|only|entirely|unlimited|impossible|guaranteed)\b/i;

function parseArgs(argv) {
  const args = { trials: 2000, overlapTrials: 2000, json: false };
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (token === "--subject") args.subjectId = argv[++i];
    else if (token === "--trials") args.trials = Number(argv[++i]);
    else if (token === "--overlap-trials") args.overlapTrials = Number(argv[++i]);
    else if (token === "--json") args.json = true;
    else if (token === "--help" || token === "-h") args.help = true;
    else throw new Error(`Unknown argument: ${token}`);
  }
  return args;
}

function usage() {
  return [
    "Usage:",
    "  node tools/subject-release-audit.js --subject ap-<id> [--trials 5000] [--overlap-trials 5000] [--json]",
    "",
    "Loads the effective browser bank from data scripts referenced by index.html.",
  ].join("\n");
}

function dataScriptsForSubject(subjectId, html = fs.readFileSync("index.html", "utf8")) {
  return [...html.matchAll(/<script src="(data\/[^"?]+\.js)(?:\?[^\"]*)?"><\/script>/g)]
    .map((match) => match[1])
    .filter((source) => {
      const filename = path.basename(source, ".js");
      return filename === subjectId || filename.startsWith(`${subjectId}-`);
    });
}

function loadEffectiveBank(subject, scripts = dataScriptsForSubject(subject.id)) {
  assert.ok(subject.dataVar, `${subject.id}: subject is missing dataVar`);
  assert.ok(scripts.length > 0, `${subject.id}: no data scripts are referenced by index.html`);
  const sandbox = { window: {} };
  vm.createContext(sandbox);

  // AP Calculus BC temporarily inherits the browser-effective AB bank while its
  // BC-only material is being authored and audited. The release process must
  // consolidate BC into an independent canonical bank before promotion; this
  // dependency preload exists only so the generic audit can inspect the exact
  // development bank that the browser sees.
  if (subject.id === "ap-calculus-bc") {
    ["data/ap-calculus-ab.js", "data/ap-calculus-ab-quality-fixes.js"].forEach((source) => {
      if (!fs.existsSync(source)) return;
      vm.runInContext(fs.readFileSync(source, "utf8"), sandbox, { filename: source });
    });
  }

  scripts.forEach((source) => {
    assert.ok(fs.existsSync(source), `${subject.id}: missing data layer ${source}`);
    vm.runInContext(fs.readFileSync(source, "utf8"), sandbox, { filename: source });
  });
  const bank = sandbox.window[subject.dataVar];
  assert.ok(Array.isArray(bank), `${subject.id}: ${subject.dataVar} was not created`);
  return { bank, scripts };
}

function wordCount(text) {
  return String(text || "").trim().split(/\s+/).filter(Boolean).length;
}

function collectGroups(bank, key) {
  const groups = new Map();
  bank.forEach((question) => {
    const id = question[key];
    if (!id) return;
    if (!groups.has(id)) groups.set(id, []);
    groups.get(id).push(question);
  });
  return groups;
}

function auditGenericContent(subject, bank) {
  assert.ok(subject.formatVerified, `${subject.id}: formatVerified must be true before release`);
  assert.ok(bank.length >= subject.mcqCount, `${subject.id}: bank has ${bank.length}; ${subject.mcqCount} required`);
  const ids = new Set();
  const validUnits = new Set((subject.units || []).map((unit) => unit.id));
  const keyCounts = [0, 0, 0, 0];
  let uniqueLongest = 0;
  let amongLongest = 0;
  let correctWords = 0;
  let distractorWords = 0;

  bank.forEach((question) => {
    assert.ok(question && typeof question === "object", `${subject.id}: non-object question`);
    assert.ok(typeof question.id === "string" && question.id, `${subject.id}: question missing id`);
    assert.ok(!ids.has(question.id), `${subject.id}: duplicate id ${question.id}`);
    ids.add(question.id);
    if (validUnits.size) assert.ok(validUnits.has(question.unit), `${question.id}: invalid unit ${String(question.unit)}`);
    assert.equal(question.type, "s", `${question.id}: release audit expects single-select MCQ`);
    assert.ok(Array.isArray(question.o) && question.o.length === 4, `${question.id}: expected four options`);
    assert.ok(Array.isArray(question.c) && question.c.length === 1, `${question.id}: expected one correct answer`);
    const key = question.c[0];
    assert.ok(Number.isInteger(key) && key >= 0 && key < 4, `${question.id}: invalid answer index`);
    keyCounts[key]++;
    assert.ok(typeof question.q === "string" && question.q.trim().length >= 20, `${question.id}: stem too short`);
    assert.ok(typeof question.e === "string" && question.e.trim().length >= 90, `${question.id}: rationale must be at least 90 characters`);
    assert.ok(question.topicCode, `${question.id}: missing topicCode`);

    const lengths = question.o.map(wordCount);
    const longest = Math.max(...lengths);
    const correctLength = lengths[key];
    const longestCount = lengths.filter((length) => length === longest).length;
    // A four-way length tie carries zero answer-position information. Keep
    // two- and three-way longest ties in the conservative among-longest metric,
    // but do not count a tie shared by every option as an exploitable cue.
    if (correctLength === longest && longestCount < lengths.length) amongLongest++;
    if (correctLength === longest && longestCount === 1) uniqueLongest++;
    correctWords += correctLength;
    lengths.forEach((length, index) => { if (index !== key) distractorWords += length; });
    const absoluteDistractors = question.o.filter((_, index) => index !== key).filter((option) => ABSOLUTE_LANGUAGE.test(option)).length;
    assert.ok(absoluteDistractors <= 1, `${question.id}: multiple distractors use absolute-language tells`);
    assert.ok(!(question.stimulusGroupId && question.variantGroupId), `${question.id}: stimulus and variant groups may not be combined`);
  });

  const correctAverage = correctWords / bank.length;
  const distractorAverage = distractorWords / (bank.length * 3);
  const uniqueLongestShare = uniqueLongest / bank.length;
  const amongLongestShare = amongLongest / bank.length;
  assert.ok(uniqueLongestShare <= 0.25, `uniquely-longest correct rate ${(100 * uniqueLongestShare).toFixed(1)}% exceeds 25%`);
  assert.ok(amongLongestShare <= 0.58, `among-longest correct rate ${(100 * amongLongestShare).toFixed(1)}% exceeds 58%`);
  assert.ok(Math.abs(correctAverage - distractorAverage) / distractorAverage <= 0.12, "correct/distractor average length differs by more than 12%");
  keyCounts.forEach((count, position) => {
    const share = count / bank.length;
    assert.ok(share >= 0.15 && share <= 0.35, `raw answer position ${position} is imbalanced (${(100 * share).toFixed(1)}%)`);
  });

  const variantGroups = collectGroups(bank, "variantGroupId");
  for (const [groupId, questions] of variantGroups) {
    assert.ok(questions.length >= 2, `${groupId}: variant group has one member`);
    assert.equal(new Set(questions.map((q) => q.unit)).size, 1, `${groupId}: variants cross units`);
    assert.equal(new Set(questions.map((q) => q.topicCode)).size, 1, `${groupId}: variants must share topicCode`);
    assert.equal(new Set(questions.map((q) => q.q.trim().toLowerCase())).size, questions.length, `${groupId}: duplicate variant wording`);
    questions.forEach((question) => assert.ok(!question.stimulusGroupId, `${question.id}: variant must be standalone`));
  }

  const stimulusGroups = collectGroups(bank, "stimulusGroupId");
  for (const [groupId, questions] of stimulusGroups) {
    assert.ok(questions.length >= 2, `${groupId}: stimulus group has fewer than two questions`);
    assert.equal(new Set(questions.map((q) => q.unit)).size, 1, `${groupId}: stimulus group crosses units`);
    assert.equal(new Set(questions.map((q) => q.stimulus)).size, 1, `${groupId}: stimulus object mismatch`);
    const stimulus = questions[0].stimulus;
    assert.ok(stimulus && typeof stimulus === "object", `${groupId}: missing stimulus`);
    if (stimulus.image) {
      assert.ok(fs.existsSync(stimulus.image), `${groupId}: missing image ${stimulus.image}`);
      assert.ok(typeof stimulus.alt === "string" && stimulus.alt.trim().length >= 60, `${groupId}: visual alt text must be at least 60 characters`);
    }
  }

  return {
    uniqueLongestShare,
    amongLongestShare,
    correctAverage,
    distractorAverage,
    keyShares: keyCounts.map((count) => count / bank.length),
    variantGroups: variantGroups.size,
    stimulusGroups: stimulusGroups.size,
  };
}

function auditDraws(subject, bank, trials) {
  assert.ok(Number.isInteger(trials) && trials > 0, "--trials must be a positive integer");
  for (let i = 0; i < trials; i++) {
    const draw = drawExam(subject, bank);
    assert.equal(draw.length, subject.mcqCount, `draw ${i + 1}: wrong question count`);
    assert.equal(new Set(draw.map((q) => q.id)).size, draw.length, `draw ${i + 1}: duplicate id`);
    const seenVariants = new Set();
    draw.forEach((question) => {
      if (!question.variantGroupId) return;
      assert.ok(!seenVariants.has(question.variantGroupId), `draw ${i + 1}: repeated variant ${question.variantGroupId}`);
      seenVariants.add(question.variantGroupId);
    });
  }
  return { trials };
}

function measureOverlap(subject, bank, trials) {
  assert.ok(Number.isInteger(trials) && trials > 0, "--overlap-trials must be a positive integer");
  let total = 0;
  for (let i = 0; i < trials; i++) {
    const first = drawExam(subject, bank);
    const second = drawExam(subject, bank);
    const ids = new Set(first.map((q) => q.id));
    total += second.filter((q) => ids.has(q.id)).length / subject.mcqCount;
  }
  return total / trials;
}

function runAudit(args) {
  assert.ok(args.subjectId, "--subject is required");
  const subject = AP_SUBJECTS.find((candidate) => candidate.id === args.subjectId);
  assert.ok(subject, `unknown subject ${args.subjectId}`);
  const { bank, scripts } = loadEffectiveBank(subject);
  const content = auditGenericContent(subject, bank);
  const draws = auditDraws(subject, bank, args.trials);
  const overlap = measureOverlap(subject, bank, args.overlapTrials);
  assert.ok(overlap <= 0.40, `retake overlap ${(100 * overlap).toFixed(1)}% exceeds 40%`);
  return { subject: subject.id, bankSize: bank.length, scripts, content, draws, overlap };
}

function formatReport(result) {
  return [
    `${result.subject}: ${result.bankSize} questions from ${result.scripts.length} browser data layer(s)`,
    `Answer pattern: uniquely-longest ${(100 * result.content.uniqueLongestShare).toFixed(1)}%; exploitable among-longest ${(100 * result.content.amongLongestShare).toFixed(1)}% (four-way ties excluded); correct ${result.content.correctAverage.toFixed(2)} words vs distractors ${result.content.distractorAverage.toFixed(2)}.`,
    `Raw keys: ${result.content.keyShares.map((share, i) => `${String.fromCharCode(65 + i)} ${(100 * share).toFixed(1)}%`).join(", ")}.`,
    `Variant groups: ${result.content.variantGroups}; stimulus groups: ${result.content.stimulusGroups}.`,
    `Draw audit: ${result.draws.trials}/${result.draws.trials} valid.`,
    `Retake overlap: ${(100 * result.overlap).toFixed(1)}% average shared questions.`,
  ].join("\n");
}

if (require.main === module) {
  try {
    const args = parseArgs(process.argv.slice(2));
    if (args.help) {
      console.log(usage());
      process.exit(0);
    }
    const result = runAudit(args);
    if (args.json) console.log(JSON.stringify(result, null, 2));
    else console.log(formatReport(result));
  } catch (error) {
    console.error(error.stack || error.message || String(error));
    process.exit(1);
  }
}

module.exports = {
  parseArgs,
  dataScriptsForSubject,
  loadEffectiveBank,
  auditGenericContent,
  auditDraws,
  measureOverlap,
  runAudit,
  formatReport,
};
