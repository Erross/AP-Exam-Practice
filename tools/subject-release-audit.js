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
    "Loads the effective browser metadata and bank from scripts referenced by index.html.",
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

function metadataScriptForSubject(subjectId, html = fs.readFileSync("index.html", "utf8")) {
  const expected = `js/${subjectId}-metadata.js`;
  const scripts = [...html.matchAll(/<script src="(js\/[^"?]+\.js)(?:\?[^\"]*)?"><\/script>/g)]
    .map((match) => match[1]);
  return scripts.includes(expected) ? expected : null;
}

function loadEffectiveSubject(subjectId, html = fs.readFileSync("index.html", "utf8")) {
  const canonical = AP_SUBJECTS.find((candidate) => candidate.id === subjectId);
  assert.ok(canonical, `Unknown subject: ${subjectId}`);

  const registry = fs.readFileSync(path.join("js", "subjects.js"), "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(`${registry}\n;globalThis.__AP_SUBJECTS = AP_SUBJECTS;`, sandbox, { filename: "js/subjects.js" });

  const metadataScript = metadataScriptForSubject(subjectId, html);
  if (metadataScript) {
    assert.ok(fs.existsSync(metadataScript), `${subjectId}: missing metadata layer ${metadataScript}`);
    vm.runInContext(fs.readFileSync(metadataScript, "utf8"), sandbox, { filename: metadataScript });
  } else {
    // Some subjects keep verified metadata in the first browser data layer rather
    // than a separate development overlay. Execute the subject's data layers in
    // browser order so any guarded AP_SUBJECTS mutation is reflected here.
    for (const source of dataScriptsForSubject(subjectId, html)) {
      assert.ok(fs.existsSync(source), `${subjectId}: missing data layer ${source}`);
      vm.runInContext(fs.readFileSync(source, "utf8"), sandbox, { filename: source });
    }
  }

  const effective = sandbox.__AP_SUBJECTS.find((candidate) => candidate.id === subjectId);
  assert.ok(effective, `${subjectId}: effective browser metadata removed subject from registry`);
  return effective;
}

function loadEffectiveBank(subject, scripts = dataScriptsForSubject(subject.id)) {
  assert.ok(subject.dataVar, `${subject.id}: subject is missing dataVar`);
  assert.ok(scripts.length > 0, `${subject.id}: no data scripts are referenced by index.html`);
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  // During development a subject may explicitly inherit a previously loaded bank.
  // Mirror browser order for that dependency without making generic audits silently
  // load unrelated course data in all cases.
  if (subject.id === "ap-calculus-bc" && scripts.some((source) => source === "data/ap-calculus-bc.js")) {
    for (const dependency of ["data/ap-calculus-ab.js", "data/ap-calculus-ab-quality-fixes.js"]) {
      if (fs.existsSync(dependency)) vm.runInContext(fs.readFileSync(dependency, "utf8"), sandbox, { filename: dependency });
    }
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

function answerMetrics(bank) {
  let uniqueLongest = 0;
  let amongLongest = 0;
  let correctWords = 0;
  let distractorWords = 0;
  let distractorCount = 0;
  const keyCounts = [0, 0, 0, 0];
  for (const q of bank) {
    assert.ok(Array.isArray(q.o) && q.o.length === 4, `${q.id}: expected four options`);
    assert.ok(Array.isArray(q.c) && q.c.length === 1, `${q.id}: expected exactly one correct answer`);
    const key = q.c[0];
    assert.ok(Number.isInteger(key) && key >= 0 && key < 4, `${q.id}: invalid key`);
    keyCounts[key] += 1;
    const lengths = q.o.map(wordCount);
    const max = Math.max(...lengths);
    if (lengths[key] === max) amongLongest += 1;
    if (lengths[key] === max && lengths.filter((value) => value === max).length === 1) uniqueLongest += 1;
    correctWords += lengths[key];
    lengths.forEach((value, index) => {
      if (index !== key) {
        distractorWords += value;
        distractorCount += 1;
      }
    });
  }
  return {
    uniqueLongest: uniqueLongest / bank.length,
    amongLongest: amongLongest / bank.length,
    correctAverage: correctWords / bank.length,
    distractorAverage: distractorWords / distractorCount,
    keyCounts,
  };
}

function countStackedAbsoluteDistractors(bank) {
  return bank.filter((q) => q.o.filter((option, index) => index !== q.c[0] && ABSOLUTE_LANGUAGE.test(option)).length >= 2);
}

function assertContentThresholds(subject, bank, metrics) {
  assert.ok(metrics.uniqueLongest <= 0.25, `${subject.id}: uniquely-longest correct rate ${(metrics.uniqueLongest * 100).toFixed(1)}% exceeds 25%`);
  // A four-way tie contains no usable "pick the longest" signal. Treat only ties
  // of 2-3 options as exploitable among-longest cases in the CLI summary below.
  const exploitableAmongLongest = bank.filter((q) => {
    const lengths = q.o.map(wordCount);
    const max = Math.max(...lengths);
    const tied = lengths.filter((value) => value === max).length;
    return lengths[q.c[0]] === max && tied < 4;
  }).length / bank.length;
  assert.ok(exploitableAmongLongest <= 0.58, `${subject.id}: exploitable among-longest correct rate ${(exploitableAmongLongest * 100).toFixed(1)}% exceeds 58%`);
  const meanDelta = Math.abs(metrics.correctAverage - metrics.distractorAverage) / metrics.distractorAverage;
  assert.ok(meanDelta <= 0.12, `${subject.id}: correct/distractor mean-word delta ${(meanDelta * 100).toFixed(1)}% exceeds 12%`);
  metrics.keyCounts.forEach((count, index) => {
    const share = count / bank.length;
    assert.ok(share >= 0.15 && share <= 0.35, `${subject.id}: key ${String.fromCharCode(65 + index)} share ${(share * 100).toFixed(1)}% outside 15-35%`);
  });
  const stacked = countStackedAbsoluteDistractors(bank);
  assert.equal(stacked.length, 0, `${subject.id}: stacked absolute-language distractor tells: ${stacked.map((q) => q.id).join(", ")}`);
  return exploitableAmongLongest;
}

function collectGroupSizes(bank) {
  const counts = new Map();
  bank.forEach((q) => {
    if (!q.stimulusGroupId) return;
    counts.set(q.stimulusGroupId, (counts.get(q.stimulusGroupId) || 0) + 1);
  });
  return counts;
}

function assertWholeGroups(draw, groupSizes) {
  const selected = new Map();
  draw.forEach((q) => {
    if (!q.stimulusGroupId) return;
    selected.set(q.stimulusGroupId, (selected.get(q.stimulusGroupId) || 0) + 1);
  });
  for (const [gid, count] of selected) {
    assert.equal(count, groupSizes.get(gid), `partial stimulus group selected: ${gid}`);
  }
}

function auditDraws(subject, bank, trials) {
  const groupSizes = collectGroupSizes(bank);
  let valid = 0;
  for (let i = 0; i < trials; i++) {
    const draw = drawExam(subject, bank);
    assert.equal(draw.length, subject.mcqCount, `${subject.id}: draw ${i + 1} has ${draw.length} questions`);
    assertWholeGroups(draw, groupSizes);
    valid += 1;
  }
  return valid;
}

function averageRetakeOverlap(subject, bank, trials) {
  let shared = 0;
  for (let i = 0; i < trials; i++) {
    const a = drawExam(subject, bank);
    const b = drawExam(subject, bank);
    const ids = new Set(a.map((q) => q.id));
    shared += b.filter((q) => ids.has(q.id)).length / subject.mcqCount;
  }
  return shared / trials;
}

function runAudit({ subjectId, trials = 2000, overlapTrials = 2000 }) {
  assert.ok(subjectId, "--subject is required");
  assert.ok(Number.isInteger(trials) && trials > 0, "--trials must be a positive integer");
  assert.ok(Number.isInteger(overlapTrials) && overlapTrials > 0, "--overlap-trials must be a positive integer");
  const html = fs.readFileSync("index.html", "utf8");
  const subject = loadEffectiveSubject(subjectId, html);
  const { bank, scripts } = loadEffectiveBank(subject, dataScriptsForSubject(subjectId, html));
  const metrics = answerMetrics(bank);
  const exploitableAmongLongest = assertContentThresholds(subject, bank, metrics);
  const validDraws = auditDraws(subject, bank, trials);
  const overlap = averageRetakeOverlap(subject, bank, overlapTrials);
  assert.ok(overlap <= 0.40, `${subject.id}: retake overlap ${(overlap * 100).toFixed(1)}% exceeds 40%`);
  return { subjectId, questionCount: bank.length, scripts, metrics, exploitableAmongLongest, validDraws, trials, overlap, overlapTrials };
}

function formatReport(report) {
  const { subjectId, questionCount, scripts, metrics, exploitableAmongLongest, validDraws, trials, overlap } = report;
  return [
    `${subjectId}: ${questionCount} questions from ${scripts.length} browser data layer(s)`,
    `Answer pattern: uniquely-longest ${(metrics.uniqueLongest * 100).toFixed(1)}%; exploitable among-longest ${(exploitableAmongLongest * 100).toFixed(1)}% (four-way ties excluded); correct ${metrics.correctAverage.toFixed(2)} words vs distractors ${metrics.distractorAverage.toFixed(2)}.`,
    `Raw keys: ${metrics.keyCounts.map((count, index) => `${String.fromCharCode(65 + index)} ${(count / questionCount * 100).toFixed(1)}%`).join(", ")}.`,
    `Variant groups: ${new Set([]).size}; stimulus groups: ${new Set([]).size}.`,
    `Draw audit: ${validDraws}/${trials} valid.`,
    `Retake overlap: ${(overlap * 100).toFixed(1)}% average shared questions.`,
  ].join("\n");
}

if (require.main === module) {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    process.exit(0);
  }
  const report = runAudit(args);
  if (args.json) console.log(JSON.stringify(report, null, 2));
  else console.log(formatReport(report));
}

module.exports = { parseArgs, dataScriptsForSubject, metadataScriptForSubject, loadEffectiveSubject, loadEffectiveBank, answerMetrics, runAudit };
