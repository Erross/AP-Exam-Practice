// AP Calculus BC — draft Section I practice bank.
// Shared Units 1–8 content is cloned from the browser-effective, already-audited
// Calculus AB bank loaded immediately before this file. BC-only topics are appended
// by temporary development layers and will be consolidated into this canonical file
// before release.
(function () {
  "use strict";
  const ab = window.QUESTIONS_AP_CALCULUS_AB || [];
  if (!ab.length) throw new Error("AP Calculus BC requires the effective AP Calculus AB bank to be loaded first during development");

  const bank = ab.map((q) => ({
    ...q,
    id: `apcalcbc-shared-${q.id}`,
    o: q.o.slice(),
    c: q.c.slice(),
    variantGroupId: q.variantGroupId ? `apcalcbc-shared-${q.variantGroupId}` : undefined,
    stimulusGroupId: q.stimulusGroupId ? `apcalcbc-shared-${q.stimulusGroupId}` : undefined,
  }));

  // Some audited AB questions use a table/diagram as a one-question stimulus.
  // A singleton is not a shared stimulus *group*, so keep its stimulus object but
  // remove the group id. This preserves the visual/data dependency while making
  // group metadata mean what the release gate expects: an atomic set of 2+ items.
  const stimulusGroupCounts = new Map();
  bank.forEach((q) => {
    if (!q.stimulusGroupId) return;
    stimulusGroupCounts.set(q.stimulusGroupId, (stimulusGroupCounts.get(q.stimulusGroupId) || 0) + 1);
  });
  bank.forEach((q) => {
    if (q.stimulusGroupId && stimulusGroupCounts.get(q.stimulusGroupId) === 1) {
      q.stimulusGroupId = undefined;
    }
  });

  const counts = Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`U${i + 1}`, bank.filter((q) => q.unit === `U${i + 1}`).length]));
  function add({ unit, topicCode, topic, skill, calculatorAllowed, q, correct, distractors, explanation, variantGroupId }) {
    counts[unit] = (counts[unit] || 0) + 1;
    const id = `apcalcbc-${unit.toLowerCase()}-${String(counts[unit]).padStart(3, "0")}`;
    const correctIndex = bank.length % 4;
    const options = distractors.slice();
    options.splice(correctIndex, 0, correct);
    bank.push({
      id, unit, topicCode, topic, skill, calculatorAllowed: !!calculatorAllowed,
      type: "s", q, o: options, c: [correctIndex], e: explanation,
      variantGroupId,
    });
    return bank[bank.length - 1];
  }

  window.QUESTIONS_AP_CALCULUS_BC = bank;
  window.__APCALCBC_ADD = add;
})();
