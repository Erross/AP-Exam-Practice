const fs = require("node:fs");
const vm = require("node:vm");

function loadBank(files, globalName) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  for (const file of files) {
    vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
  }
  const bank = sandbox.window[globalName];
  if (!Array.isArray(bank)) throw new Error(`Missing ${globalName}`);
  return JSON.parse(JSON.stringify(bank));
}

function canonicalSource(bank, globalName, label) {
  return `// ============================================================================\n// ${label} — canonical original/unofficial MCQ bank\n// ============================================================================\n// Consolidated 2026-08-11 from the independently validated public-domain\n// replacement pass. Passage source provenance remains embedded in each shared\n// stimulus. Questions and rationales are original AP Exam Practice material.\n// ============================================================================\n\n(function () {\n  \"use strict\";\n  const QUESTIONS = ${JSON.stringify(bank, null, 2)};\n\n  // JSON serialization duplicates object literals. Restore one shared stimulus\n  // object per stimulus group so grouped-question identity semantics remain intact.\n  const stimuli = new Map();\n  for (const question of QUESTIONS) {\n    if (!question.stimulusGroupId || !question.stimulus) continue;\n    if (stimuli.has(question.stimulusGroupId)) {\n      question.stimulus = stimuli.get(question.stimulusGroupId);\n    } else {\n      stimuli.set(question.stimulusGroupId, question.stimulus);\n    }\n  }\n\n  window.${globalName} = QUESTIONS;\n})();\n`;
}

const language = loadBank([
  "data/ap-english-language.js",
  "data/ap-english-language-public-domain.js",
  "data/ap-english-language-public-domain-corrections.js",
], "QUESTIONS_AP_ENGLISH_LANGUAGE");

const literature = loadBank([
  "data/ap-english-literature.js",
  "data/ap-english-literature-public-domain.js",
  "data/ap-english-public-domain-corrections.js",
], "QUESTIONS_AP_ENGLISH_LITERATURE");

fs.writeFileSync(
  "data/ap-english-language.js",
  canonicalSource(language, "QUESTIONS_AP_ENGLISH_LANGUAGE", "AP English Language and Composition"),
);
fs.writeFileSync(
  "data/ap-english-literature.js",
  canonicalSource(literature, "QUESTIONS_AP_ENGLISH_LITERATURE", "AP English Literature and Composition"),
);

let index = fs.readFileSync("index.html", "utf8");
for (const script of [
  "data/ap-english-language-public-domain.js",
  "data/ap-english-language-public-domain-corrections.js",
  "data/ap-english-literature-public-domain.js",
  "data/ap-english-public-domain-corrections.js",
]) {
  index = index.replace(`\n<script src=\"${script}\"></script>`, "");
}
fs.writeFileSync("index.html", index);

let languageTest = fs.readFileSync("tests/ap-english-language-public-domain.test.js", "utf8");
languageTest = languageTest.replace(
  /for \(const file of \[\s*"data\/ap-english-language\.js",\s*"data\/ap-english-language-public-domain\.js",\s*"data\/ap-english-language-public-domain-corrections\.js",\s*\]\) \{/m,
  'for (const file of ["data/ap-english-language.js"]) {',
);
fs.writeFileSync("tests/ap-english-language-public-domain.test.js", languageTest);

let literatureTest = fs.readFileSync("tests/ap-english-public-domain.test.js", "utf8");
literatureTest = literatureTest.replace(
  /for \(const file of \["data\/ap-english-literature\.js", "data\/ap-english-literature-public-domain\.js", "data\/ap-english-public-domain-corrections\.js"\]\) \{/,
  'for (const file of ["data/ap-english-literature.js"]) {',
);
fs.writeFileSync("tests/ap-english-public-domain.test.js", literatureTest);

let englishTest = fs.readFileSync("tests/ap-english.test.js", "utf8");
englishTest = englishTest.replace(
  '  assert.ok(literature.bank.filter((q) => q.setType !== "poetry").every((q) => q.era === "contemporary"));',
  '  const nonPoetry = literature.bank.filter((q) => q.setType !== "poetry");\n  assert.ok(nonPoetry.every((q) => q.stimulus.source.startsWith("Public-domain text: https://")));\n  assert.ok(new Set(nonPoetry.map((q) => q.era)).size >= 2);',
);
fs.writeFileSync("tests/ap-english.test.js", englishTest);

for (const file of [
  "data/ap-english-language-public-domain.js",
  "data/ap-english-language-public-domain-corrections.js",
  "data/ap-english-literature-public-domain.js",
  "data/ap-english-public-domain-corrections.js",
]) {
  if (fs.existsSync(file)) fs.unlinkSync(file);
}

// Restore the workflow to its original least-privilege form in the same commit.
fs.writeFileSync(".github/workflows/test.yml", `name: Test\n\non:\n  pull_request:\n  workflow_dispatch:\n  push:\n    branches-ignore: [main]\n\npermissions:\n  contents: read\n\nconcurrency:\n  group: test-\${{ github.workflow }}-\${{ github.head_ref || github.ref }}\n  cancel-in-progress: true\n\njobs:\n  check:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262 # v4\n      - uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020 # v4\n        with:\n          node-version: 22\n          cache: npm\n      - run: npm ci\n      - run: npm run check\n`);

// This is a one-shot migration helper and should not survive consolidation.
fs.unlinkSync(__filename);

console.log(`Consolidated English banks: Language ${language.length} questions; Literature ${literature.length} questions.`);
