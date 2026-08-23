const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { execFileSync } = require("node:child_process");
const { pathToFileURL } = require("node:url");

const { loadEffectiveSubjects } = require("./effective-subjects");

const REPOSITORY = "Erross/AP-Exam-Practice";
const EXPORTER_VERSION = "ap-unified-0.1";
const VERIFIED_DATE = "2026-08-21";

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stableValue(value[key])]));
  }
  return value;
}
function stableStringify(value) { return JSON.stringify(stableValue(value)); }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex"); }
function git(...args) { return execFileSync("git", args, { encoding: "utf8" }).trim(); }
function currentCommit() {
  const sha = git("rev-parse", "HEAD");
  if (!/^[0-9a-f]{40}$/.test(sha)) throw new Error(`Expected full HEAD SHA, got ${sha}`);
  return sha;
}

function indexScriptSources(html = fs.readFileSync("index.html", "utf8")) {
  return [...html.matchAll(/<script src="([^"?]+)(?:\?[^\"]*)?"><\/script>/g)].map((match) => match[1]);
}
function dataScripts(html) { return indexScriptSources(html).filter((source) => source.startsWith("data/")); }
function metadataScripts(html) { return indexScriptSources(html).filter((source) => /^js\/[^/]+-metadata\.js$/.test(source)); }

function sourceManifest(html) {
  const selected = new Set(["index.html", "js/subjects.js", "tools/effective-subjects.js", "tools/export-unified.js", ...metadataScripts(html), ...dataScripts(html)]);
  const assetLines = git("ls-tree", "-r", "HEAD", "--", "assets");
  for (const line of assetLines ? assetLines.split("\n") : []) {
    const match = line.match(/^\d+\s+blob\s+[0-9a-f]{40}\t(.+)$/);
    if (match) selected.add(match[1]);
  }
  const rows = [];
  for (const filePath of [...selected].sort()) {
    const line = git("ls-tree", "HEAD", "--", filePath);
    const match = line.match(/^\d+\s+blob\s+([0-9a-f]{40})\t(.+)$/);
    if (!match) throw new Error(`Cannot resolve source manifest blob for ${filePath}`);
    rows.push({
      path: match[2],
      blobSha: match[1],
      role: filePath === "index.html" ? "browser-load-order" : filePath === "js/subjects.js" ? "registry" : filePath.endsWith("-metadata.js") ? "metadata-layer" : filePath === "tools/export-unified.js" ? "exporter" : filePath.startsWith("assets/") ? "asset" : "effective-content-source"
    });
  }
  return rows;
}

function loadEffectiveBanks(html = fs.readFileSync("index.html", "utf8")) {
  const window = {};
  const context = {
    window,
    console,
    structuredClone,
    TextEncoder,
    TextDecoder,
    setTimeout,
    clearTimeout,
  };
  context.globalThis = window;
  vm.createContext(context);
  for (const source of dataScripts(html)) {
    if (!fs.existsSync(source)) throw new Error(`Missing browser data layer ${source}`);
    vm.runInContext(fs.readFileSync(source, "utf8"), context, { filename: source });
  }
  return window;
}

function without(object, omitted) {
  return Object.fromEntries(Object.entries(object).filter(([key]) => !omitted.has(key)));
}

function calculatorFor(subject) {
  if (subject.examParts?.parts?.length) {
    return { policy: "part-specific", level: null, label: "Calculator policy varies by official Section I part" };
  }
  if (subject.calculatorAllowed === true || subject.calculatorExpected === true) return { policy: "available" };
  return { policy: "none" };
}

function normalizeSectionI(subject) {
  const reserved = new Set([
    "id", "name", "category", "tier", "mcqCount", "mcqTimeMinutes", "totalExamTimeLabel", "formatVerified", "releaseStatus", "allowsMultiSelect", "tierNote", "dataVar", "freeResponse", "calculatorAllowed", "calculatorExpected"
  ]);
  return {
    id: "section-i",
    label: "Section I — Multiple Choice",
    order: 1,
    status: "released",
    optional: false,
    timing: { mode: "countdown", minutes: subject.mcqTimeMinutes },
    calculator: calculatorFor(subject),
    totalItems: subject.mcqCount,
    scoredItems: subject.mcqCount,
    fieldTestItems: 0,
    blueprint: without(subject, reserved),
    supportedItemTypes: subject.allowsMultiSelect ? ["multiple_choice", "multiple_select"] : ["multiple_choice"],
    deferredCapabilities: [],
    extensions: { formatVerified: Boolean(subject.formatVerified), tierNote: subject.tierNote ?? null }
  };
}

function normalizeSectionII(subject) {
  if (!subject.freeResponse) return null;
  const questions = subject.freeResponse.questions || [];
  return {
    id: "section-ii",
    label: "Section II — Free Response",
    order: 2,
    status: "draft",
    optional: false,
    timing: { mode: "countdown", minutes: subject.freeResponse.timeMinutes },
    calculator: subject.freeResponse.calculatorAllowed === true ? { policy: "available" } : { policy: "none" },
    totalItems: questions.length || null,
    scoredItems: questions.length || null,
    fieldTestItems: 0,
    blueprint: {},
    supportedItemTypes: ["essay", "free_response"],
    deferredCapabilities: ["written-response-content", "written-response-scoring"],
    extensions: without(subject.freeResponse, new Set(["timeMinutes", "questions", "calculatorAllowed"]))
  };
}

function normalizeAssessment(subject) {
  const sectionII = normalizeSectionII(subject);
  return {
    id: subject.id,
    family: "ap",
    name: subject.name,
    category: subject.category ?? null,
    jurisdiction: null,
    grade: null,
    subject: subject.id,
    status: "released",
    unofficial: true,
    fullSimulationAvailable: false,
    officialSourcesVerified: VERIFIED_DATE,
    scoringPolicy: { kind: "practice-section-performance", officialScorePrediction: false },
    sections: [normalizeSectionI(subject), ...(sectionII ? [sectionII] : [])],
    extensions: {
      totalExamTimeLabel: subject.totalExamTimeLabel ?? null,
      sourceDataVar: subject.dataVar,
      tier: subject.tier,
      currentProductScope: "multiple-choice"
    }
  };
}

function normalizeStimulus(question) {
  if (!question.stimulus) return null;
  const source = question.stimulus;
  const id = question.stimulusGroupId || source.id || `${question.id}-stimulus`;
  const assetRefs = [];
  if (source.image) assetRefs.push(source.image);
  if (Array.isArray(source.images)) assetRefs.push(...source.images);
  const metadata = without(source, new Set(["id", "title", "text", "image", "images"]));
  return {
    id,
    title: source.title ?? null,
    text: source.text ?? source.passage ?? null,
    ...(assetRefs.length ? { assetRefs } : {}),
    provenance: source.source ? "source-recorded" : "original-project-content",
    metadata
  };
}

function normalizeQuestion(question, subject) {
  const prompt = question.q ?? question.prompt;
  const options = question.o ?? question.options;
  const correct = question.c ?? question.correctIndices;
  if (!question.id || typeof prompt !== "string" || !Array.isArray(options)) throw new Error(`${subject.id}: invalid released question shape ${question.id || "<no-id>"}`);
  if (!Array.isArray(correct) || correct.length === 0 || !correct.every((index) => Number.isInteger(index) && index >= 0 && index < options.length) || new Set(correct).size !== correct.length) {
    throw new Error(`${question.id}: invalid semantic answer key`);
  }

  const sourceType = question.type ?? (correct.length > 1 ? "m" : "s");
  if (sourceType !== "s" && sourceType !== "m") throw new Error(`${question.id}: unsupported released AP question type ${sourceType}`);
  if (sourceType === "s" && correct.length !== 1) throw new Error(`${question.id}: single-select question must have exactly one semantic answer`);
  if (sourceType === "m" && correct.length < 2) throw new Error(`${question.id}: multi-select question must have at least two semantic answers`);
  if (sourceType === "m" && subject.allowsMultiSelect !== true) throw new Error(`${question.id}: multi-select item is not declared by ${subject.id}`);

  const stimulus = normalizeStimulus(question);
  const reserved = new Set(["id", "q", "prompt", "o", "options", "c", "correctIndices", "e", "explanation", "stimulus", "type"]);
  const semanticAnswers = correct.map((index) => options[index]);
  const multi = sourceType === "m";
  return {
    stimulus,
    item: {
      id: question.id,
      assessmentId: subject.id,
      sectionIds: ["section-i"],
      itemType: multi ? "multiple_select" : "multiple_choice",
      points: 1,
      prompt,
      ...(stimulus ? { stimulusRefs: [stimulus.id] } : {}),
      response: multi
        ? { kind: "multiple-select", options: [...options], constraints: { minSelections: correct.length, maxSelections: correct.length } }
        : { kind: "single-choice", options: [...options] },
      scoring: {
        mode: "automatic",
        ...(multi ? { answers: semanticAnswers } : { answer: semanticAnswers[0] }),
        rationale: question.e ?? question.explanation ?? null,
        extensions: { sourceCorrectIndices: [...correct] }
      },
      metadata: without(question, reserved),
      extensions: {}
    }
  };
}

function effectiveContent(subjects, banks) {
  const stimuliById = new Map();
  const items = [];
  for (const subject of subjects) {
    const bank = banks[subject.dataVar];
    if (!Array.isArray(bank) || bank.length === 0) throw new Error(`${subject.id}: missing/empty browser-effective bank ${subject.dataVar}`);
    if (bank.length < subject.mcqCount) throw new Error(`${subject.id}: bank ${bank.length} smaller than official practice draw ${subject.mcqCount}`);
    for (const question of bank) {
      const normalized = normalizeQuestion(question, subject);
      if (normalized.stimulus) {
        const existing = stimuliById.get(normalized.stimulus.id);
        if (existing && stableStringify(existing) !== stableStringify(normalized.stimulus)) throw new Error(`${question.id}: stimulus ${normalized.stimulus.id} collides with different effective content`);
        stimuliById.set(normalized.stimulus.id, normalized.stimulus);
      }
      items.push(normalized.item);
    }
  }
  return { stimuli: [...stimuliById.values()], items, rubrics: [] };
}

function buildUnifiedApPackage({ generatedAt = new Date().toISOString(), sourceCommit = currentCommit(), manifest, html } = {}) {
  const effectiveHtml = html ?? fs.readFileSync("index.html", "utf8");
  const subjects = loadEffectiveSubjects(effectiveHtml).filter((subject) => subject.releaseStatus === "released");
  const banks = loadEffectiveBanks(effectiveHtml);
  if (subjects.length !== 29) throw new Error(`Expected 29 released AP courses, found ${subjects.length}`);
  const assessments = subjects.map(normalizeAssessment);
  const content = effectiveContent(subjects, banks);
  const effectiveContentFingerprint = sha256(stableStringify({ assessments, content }));
  return {
    schemaVersion: "0.1",
    package: {
      family: "ap",
      sourceRepository: REPOSITORY,
      sourceCommit,
      generatedAt,
      exporterVersion: EXPORTER_VERSION,
      effectiveContentFingerprint,
      officialSourcesVerified: VERIFIED_DATE,
      sourceManifest: manifest ?? sourceManifest(effectiveHtml)
    },
    assessments,
    content
  };
}

function parseArgs(argv) {
  const result = { out: null, generatedAt: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--out") result.out = argv[++i];
    else if (argv[i] === "--generated-at") result.generatedAt = argv[++i];
    else throw new Error(`Unknown argument: ${argv[i]}`);
  }
  return result;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const artifact = buildUnifiedApPackage(args.generatedAt ? { generatedAt: args.generatedAt } : undefined);
  const json = `${JSON.stringify(artifact, null, 2)}\n`;
  if (args.out) {
    const out = path.resolve(args.out);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, json, "utf8");
    console.log(`Wrote ${artifact.assessments.length} AP courses / ${artifact.content.items.length} items to ${out}`);
  } else process.stdout.write(json);
}

if (require.main === module) main();
module.exports = { buildUnifiedApPackage, stableStringify, loadEffectiveBanks };
