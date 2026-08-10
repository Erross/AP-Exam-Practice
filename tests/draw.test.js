const test = require("node:test");
const assert = require("node:assert/strict");
const { AP_SUBJECTS } = require("../js/subjects");
const { drawExam, drawBlocks, shuffleQuestionOptions, summarizeAttributes } = require("../js/draw");
const { loadGovernmentBank } = require("./helpers");

const subject = AP_SUBJECTS.find((item) => item.id === "ap-us-government");
const bank = loadGovernmentBank();

test("every Government draw satisfies the unit and stimulus blueprints", () => {
  for (let attempt = 0; attempt < 2000; attempt++) {
    const drawn = drawExam(subject, bank);
    assert.equal(drawn.length, 55);
    assert.deepEqual(
      Object.fromEntries(subject.units.map((unit) => [unit.id, drawn.filter((q) => q.unit === unit.id).length])),
      { U1: 10, U2: 17, U3: 8, U4: 7, U5: 13 }
    );
    const groups = new Map();
    drawn.filter((q) => q.stimulusGroupId).forEach((q) => {
      if (!groups.has(q.stimulusGroupId)) groups.set(q.stimulusGroupId, []);
      groups.get(q.stimulusGroupId).push(q);
    });
    const counts = { quantitative: 0, foundational: 0, text: 0, visual: 0 };
    for (const questions of groups.values()) {
      const type = questions[0].stimulus.type === "document" ? "foundational" : questions[0].stimulus.type;
      counts[type]++;
      const bankGroupSize = bank.filter((q) => q.stimulusGroupId === questions[0].stimulusGroupId).length;
      assert.equal(questions.length, bankGroupSize, "a stimulus group was split");
    }
    assert.deepEqual(counts, { quantitative: 5, foundational: 1, text: 1, visual: 3 });
    // Bounds come from the subject's own declared standaloneRange rather than a
    // hardcoded pair, because a larger stimulus pool (sets of varying size,
    // chosen from more than the required minimum) legitimately widens how many
    // stimulus-linked questions any one draw includes — the same variability a
    // real administration has when it draws from a rotating item bank.
    const standaloneCount = 55 - drawn.filter((q) => q.stimulusGroupId).length;
    assert.ok(standaloneCount >= subject.examBlueprint.standaloneRange[0]);
    assert.ok(standaloneCount <= subject.examBlueprint.standaloneRange[1]);
  }
});

test("option shuffling preserves exactly one correct answer", () => {
  bank.forEach((question) => {
    const shuffled = shuffleQuestionOptions(question);
    assert.equal(shuffled.o.length, 4);
    assert.equal(shuffled.c.length, 1);
    assert.deepEqual([...shuffled.order].sort((a, b) => a - b), [0, 1, 2, 3]);
    assert.equal(shuffled.o[shuffled.c[0]], question.o[question.c[0]]);
  });
});

test("undersized banks and incomplete stimulus blueprints fail explicitly", () => {
  assert.throws(() => drawExam(subject, bank.slice(0, 54)), /required/);
  assert.throws(() => drawExam(subject, bank.filter((q) => q.stimulus?.type !== "visual")), /visual stimulus sets/);
});

test("drawBlocks never selects two questions that share a variantGroupId", () => {
  // Synthetic pool: three variant pairs plus enough untagged filler that a
  // full draw is always reachable even when both members of a pair are
  // excluded from consideration.
  const pool = [];
  for (let g = 0; g < 3; g++) {
    pool.push({ id: `v${g}a`, variantGroupId: `variant-${g}` });
    pool.push({ id: `v${g}b`, variantGroupId: `variant-${g}` });
  }
  for (let i = 0; i < 10; i++) pool.push({ id: `plain${i}` });

  for (let attempt = 0; attempt < 500; attempt++) {
    const usedVariantIds = new Set();
    const drawn = drawBlocks(pool, 8, Math.random, usedVariantIds).flat();
    assert.equal(drawn.length, 8);
    const seen = new Set();
    drawn.forEach((q) => {
      if (!q.variantGroupId) return;
      assert.ok(!seen.has(q.variantGroupId), `two questions from ${q.variantGroupId} were drawn together`);
      seen.add(q.variantGroupId);
    });
  }
});

test("drawBlocks falls back to filling the target when variant exclusivity can't be honored", () => {
  // Only variant-tagged questions exist and the target exceeds the number of
  // distinct groups — exclusivity is impossible to fully satisfy, so the
  // function must still return exactly `target` questions rather than fail.
  const pool = [
    { id: "a1", variantGroupId: "g1" },
    { id: "a2", variantGroupId: "g1" },
    { id: "b1", variantGroupId: "g2" },
    { id: "b2", variantGroupId: "g2" },
  ];
  const drawn = drawBlocks(pool, 3, Math.random, new Set()).flat();
  assert.equal(drawn.length, 3);
});

test("every Government draw is free of same-variant repeats", () => {
  // Guards the real bank too: once any question pairs are tagged with a
  // shared variantGroupId, no drawn exam should ever surface both.
  for (let attempt = 0; attempt < 500; attempt++) {
    const drawn = drawExam(subject, bank);
    const seen = new Set();
    drawn.forEach((q) => {
      if (!q.variantGroupId) return;
      assert.ok(!seen.has(q.variantGroupId), `two questions from ${q.variantGroupId} were drawn together`);
      seen.add(q.variantGroupId);
    });
  }
});

test("attributeRanges holds an arbitrary field's split across the whole draw, e.g. a calculator section", () => {
  // Synthetic subject mirroring a multi-part MCQ section (like AP Calculus's
  // no-calculator/calculator-required split): one unit, a bank with slack
  // beyond the draw size so the sampler must actually choose, and an exact
  // 7/3 split enforced purely through attributeRanges rather than a bespoke
  // drawer for this one subject.
  const syntheticSubject = {
    mcqCount: 10,
    units: [{ id: "U1", examWeight: 1 }],
    attributeRanges: { calculatorAllowed: { false: [7, 7], true: [3, 3] } },
  };
  const pool = [];
  for (let i = 0; i < 14; i++) pool.push({ id: `nc${i}`, unit: "U1", calculatorAllowed: false });
  for (let i = 0; i < 6; i++) pool.push({ id: `c${i}`, unit: "U1", calculatorAllowed: true });

  for (let attempt = 0; attempt < 200; attempt++) {
    const drawn = drawExam(syntheticSubject, pool);
    assert.equal(drawn.length, 10);
    assert.equal(drawn.filter((q) => q.calculatorAllowed === false).length, 7);
    assert.equal(drawn.filter((q) => q.calculatorAllowed === true).length, 3);
  }
});

test("summarizeAttributes tallies arbitrary question fields per block", () => {
  const blocks = [
    [{ calculatorAllowed: true }],
    [{ calculatorAllowed: false }, { calculatorAllowed: false }],
  ];
  assert.deepEqual(summarizeAttributes(blocks, ["calculatorAllowed"]), {
    calculatorAllowed: { true: 1, false: 2 },
  });
});

