const test = require("node:test");
const assert = require("node:assert/strict");
const { AP_SUBJECTS } = require("../js/subjects");
const { loadEffectiveBank } = require("../tools/subject-release-audit");

const subject = AP_SUBJECTS.find((x) => x.id === "ap-art-history");
const { bank } = loadEffectiveBank(subject);

test("Art History exact MCQ skills perform their declared art-historical task", () => {
  const bySkill = Object.fromEntries(Array.from({ length: 7 }, (_, i) => [String(i + 1), bank.filter((q) => q.skill === String(i + 1))]));
  assert.equal(bank.some((q) => q.skill === "8"), false, "argumentation is not an MCQ skill");

  bySkill["1"].forEach((q) => {
    assert.equal(q.stimulus && q.stimulus.type, "visual", q.id);
    assert.match(q.q, /observed feature|formal analysis/i, q.id);
  });

  const connectedContext = bySkill["2"].filter((q) => /contextual explanation|contextual factor/i.test(q.q));
  assert.ok(connectedContext.length >= 40, "Skill 2 needs a deep pool of context-to-form questions");
  connectedContext.forEach((q) => assert.match(q.o[q.c[0]], /context helps explain/i, q.id));

  const compareModes = { function: 0, form: 0, tradition: 0 };
  bySkill["3"].forEach((q) => {
    if (/functions/i.test(q.q)) compareModes.function++;
    else if (/formal organization/i.test(q.q)) compareModes.form++;
    else if (/artistic traditions/i.test(q.q)) compareModes.tradition++;
    else assert.fail(`${q.id}: unrecognized comparison task`);
    assert.ok(q.o.every((opt) => /;/.test(opt) || / and /.test(opt)), `${q.id}: comparison option must address both works`);
  });
  Object.entries(compareModes).forEach(([mode, count]) => assert.ok(count >= 15, `comparison mode ${mode} is underrepresented`));

  bySkill["4"].forEach((q) => {
    assert.match(q.q, /evidence-based/i, q.id);
    assert.match(q.o[q.c[0]], /formal evidence is consistent with/i, q.id);
  });

  bySkill["5"].forEach((q) => {
    assert.match(q.stimulusGroupId || "", /^aparth-unk-/, q.id);
    assert.equal(q.stimulus && q.stimulus.title, "Unidentified work", q.id);
    assert.match(q.q, /based only on the image|visual observation/i, q.id);
  });

  bySkill["6"].forEach((q) => {
    assert.match(q.stimulusGroupId || "", /^aparth-unk-/, q.id);
    assert.match(q.q, /attribution/i, q.id);
  });

  bySkill["7"].forEach((q) => {
    assert.match(q.q, /interpretation/i, q.id);
    assert.match(q.o[q.c[0]], /this reading is supported by/i, q.id);
  });
});

test("unknown-work accessibility metadata does not reveal the attribution task answer", () => {
  const unknownGroups = new Map();
  bank.filter((q) => /^aparth-unk-/.test(q.stimulusGroupId || "")).forEach((q) => unknownGroups.set(q.stimulusGroupId, q.stimulus));
  assert.equal(unknownGroups.size, 10);
  for (const [id, stim] of unknownGroups) {
    const metadata = [stim.title, stim.alt, stim.description, stim.source].join(" ");
    assert.doesNotMatch(metadata, /Venus de Milo|Nefertiti|Mona Lisa|Pearl Earring|Amiens|Marat|Delacroix|Liberty Leading|G.ricault|Raft of the Medusa|Impression, Sunrise|Water Lilies|Monet|Leonardo|Vermeer/i, id);
    assert.ok((stim.alt || "").length >= 60, `${id}: accessible visual-source notice is too short`);
  }
});

test("Art History visual practice exposes an inspection path and course-specific preflight note", () => {
  const fs = require("node:fs");
  const app = fs.readFileSync("js/app.js", "utf8");
  const catalog = fs.readFileSync("js/catalog.js", "utf8");
  const css = fs.readFileSync("style.css", "utf8");
  assert.match(app, /View larger image/);
  assert.match(app, /target:\s*"_blank"/);
  assert.match(css, /\.stimulus-image-link/);
  assert.match(catalog, /preflight-note/);
  assert.match(subject.tierNote || "", /image-based|visual analysis/i);
});
