const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const test = require("node:test");

const { loadEffectiveSubjects } = require("../tools/effective-subjects");
const { buildUnifiedApPackage, stableStringify, loadEffectiveBanks } = require("../tools/export-unified");

const SOURCE_COMMIT = "ed515cf88b00eead4a8e6437a950eb84ffb05a20";
const GENERATED_AT = "2026-08-23T21:55:00Z";
const html = fs.readFileSync("index.html", "utf8");
const build = () => buildUnifiedApPackage({ generatedAt: GENERATED_AT, sourceCommit: SOURCE_COMMIT, manifest: [], html });

test("unified export contains every browser-effective released AP bank item", () => {
  const artifact = build();
  assert.equal(artifact.schemaVersion, "0.1");
  assert.equal(artifact.package.family, "ap");
  assert.equal(artifact.package.sourceRepository, "Erross/AP-Exam-Practice");
  assert.equal(artifact.package.sourceCommit, SOURCE_COMMIT);
  assert.equal(artifact.assessments.length, 29);

  const released = loadEffectiveSubjects(html).filter((subject) => subject.releaseStatus === "released");
  const banks = loadEffectiveBanks(html);
  const expectedItems = released.reduce((sum, subject) => {
    assert(Array.isArray(banks[subject.dataVar]), `${subject.id}: missing independently loaded effective bank`);
    assert(banks[subject.dataVar].length >= subject.mcqCount, `${subject.id}: insufficient retake bank capacity`);
    return sum + banks[subject.dataVar].length;
  }, 0);
  assert.equal(artifact.content.items.length, expectedItems, "export must not omit any effective released item");

  const assessmentIds = artifact.assessments.map((assessment) => assessment.id);
  assert.equal(new Set(assessmentIds).size, 29);
  const itemIds = artifact.content.items.map((item) => item.id);
  assert.equal(new Set(itemIds).size, itemIds.length, "effective released AP item IDs must be globally unique for unified ingestion");
  const stimulusIds = artifact.content.stimuli.map((stimulus) => stimulus.id);
  assert.equal(new Set(stimulusIds).size, stimulusIds.length, "effective AP stimulus IDs must be globally unique for unified ingestion");

  for (const item of artifact.content.items) {
    assert.deepEqual(item.sectionIds, ["section-i"]);
    assert.equal(item.scoring.mode, "automatic");
    if (item.response.kind === "single-choice") {
      assert.equal(item.itemType, "multiple_choice");
      assert(item.response.options.includes(item.scoring.answer), `${item.id}: semantic answer must exist in effective displayed options`);
      assert.equal(item.scoring.extensions.sourceCorrectIndices.length, 1);
    } else if (item.response.kind === "multiple-select") {
      assert.equal(item.itemType, "multiple_select");
      assert(item.scoring.answers.length >= 2, `${item.id}: multi-select must preserve multiple semantic answers`);
      assert.equal(item.response.constraints.minSelections, item.scoring.answers.length);
      assert.equal(item.response.constraints.maxSelections, item.scoring.answers.length);
      for (const answer of item.scoring.answers) {
        assert(item.response.options.includes(answer), `${item.id}: multi-select semantic answer must exist in effective displayed options`);
      }
      assert.equal(item.scoring.extensions.sourceCorrectIndices.length, item.scoring.answers.length);
    } else {
      assert.fail(`${item.id}: unexpected AP response kind ${item.response.kind}`);
    }
  }

  const sourceCspItem = banks.QUESTIONS_AP_COMPUTER_SCIENCE_PRINCIPLES.find((item) => item.id === "apcsp-1-1-v8");
  const exportedCspItem = artifact.content.items.find((item) => item.id === "apcsp-1-1-v8");
  assert(sourceCspItem, "CSP multi-select regression source item must exist");
  assert(exportedCspItem, "CSP multi-select regression item must be exported");
  assert.equal(exportedCspItem.response.kind, "multiple-select");
  const sourceCorrect = [...sourceCspItem.c];
  assert.deepEqual(exportedCspItem.scoring.extensions.sourceCorrectIndices, sourceCorrect);
  assert.deepEqual([...exportedCspItem.scoring.answers], sourceCorrect.map((index) => sourceCspItem.o[index]));
});

test("unified AP metadata retains MCQ scope and calculator/free-response boundaries", () => {
  const artifact = build();
  const byId = new Map(artifact.assessments.map((assessment) => [assessment.id, assessment]));

  for (const assessment of artifact.assessments) {
    assert.equal(assessment.status, "released");
    assert.equal(assessment.fullSimulationAvailable, false, `${assessment.id}: current AP product must remain MCQ-scope only`);
    assert.equal(assessment.sections[0].id, "section-i");
    assert.equal(assessment.sections[0].status, "released");
    assert.equal(assessment.sections[0].timing.mode, "countdown");
    assert.equal(assessment.sections[0].totalItems, assessment.sections[0].scoredItems);
    assert.equal(assessment.sections[0].fieldTestItems, 0);
    if (assessment.sections[1]) {
      assert.equal(assessment.sections[1].id, "section-ii");
      assert.equal(assessment.sections[1].status, "draft");
      assert(assessment.sections[1].deferredCapabilities.includes("written-response-scoring"));
    }
  }

  assert.equal(byId.get("ap-precalculus").sections[0].calculator.policy, "part-specific");
  assert.equal(byId.get("ap-statistics").sections[0].calculator.policy, "available");
  assert.equal(byId.get("ap-art-history").sections[0].calculator.policy, "none");
  assert.deepEqual(byId.get("ap-computer-science-principles").sections[0].supportedItemTypes, ["multiple_choice", "multiple_select"]);
  assert.deepEqual(byId.get("ap-english-language").sections[1].extensions, { readingPeriodMinutes: 15 });
});

test("AP effective-content fingerprint is canonical and excludes generation metadata", () => {
  const first = build();
  const second = buildUnifiedApPackage({ generatedAt: "2030-01-01T00:00:00Z", sourceCommit: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", manifest: [], html });
  assert.equal(first.package.effectiveContentFingerprint, second.package.effectiveContentFingerprint);
  const expected = crypto.createHash("sha256").update(stableStringify({ assessments: first.assessments, content: first.content })).digest("hex");
  assert.equal(first.package.effectiveContentFingerprint, expected);
  assert.match(expected, /^[0-9a-f]{64}$/);
});
