// AP Exam Practice — scalable exact drawer for fixed-count set blueprints.
//
// The original drawSetBlueprintExam enumerates every k-combination in each pool.
// That is fine for tiny passage pools, but a blueprint such as AP Latin's 20
// discrete sight questions from a pool of 50 would require materializing
// C(50,20) combinations. This module preserves the same whole-set contract while
// using dynamic programming over possible QUESTION TOTALS instead. The state
// space is bounded by the exam length rather than by the number of combinations.
(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    const base = require("./draw.js");
    module.exports = factory(base);
  } else {
    const api = factory(root);
    const baseDrawExam = root.drawExam;
    root.drawSetBlueprintExamScalable = api.drawSetBlueprintExamScalable;
    root.drawExam = function (subject, bank, rng) {
      if (subject && subject.setBlueprint) return api.drawSetBlueprintExamScalable(subject, bank, rng);
      return baseDrawExam(subject, bank, rng);
    };
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function (base) {
  "use strict";

  const shuffle = base.shuffle;
  const toBlocks = base.toBlocks;

  // Return at most one randomly influenced combination for every achievable
  // question-total when choosing exactly `count` blocks. This is O(n*k*Q),
  // where Q is the small range of possible exam question totals, rather than
  // O(C(n,k)).
  function combinationsByQuestionTotal(items, count, rng) {
    if (count === 0) return new Map([[0, []]]);
    if (items.length < count) return new Map();

    const source = shuffle(items, rng);
    const states = Array.from({ length: count + 1 }, () => new Map());
    states[0].set(0, []);

    source.forEach((block, index) => {
      const maxPicked = Math.min(count, index + 1);
      for (let pickedCount = maxPicked; pickedCount >= 1; pickedCount--) {
        // Snapshot because this loop may add to the destination map.
        const previous = [...states[pickedCount - 1].entries()];
        previous.forEach(([total, picked]) => {
          const nextTotal = total + block.length;
          if (!states[pickedCount].has(nextTotal)) {
            states[pickedCount].set(nextTotal, picked.concat([block]));
          }
        });
      }
    });

    return states[count];
  }

  function drawSetBlueprintExamScalable(subject, bank, rng) {
    const blueprint = subject.setBlueprint;
    const field = blueprint.field || "setType";
    const order = blueprint.order || Object.keys(blueprint.counts || {});
    const blocks = toBlocks(bank);
    const pools = new Map(order.map((kind) => [kind, []]));

    blocks.forEach((block) => {
      if (!block[0] || !block[0].stimulusGroupId) {
        throw new Error("Set-blueprint subjects may not contain standalone questions");
      }
      const values = new Set(block.map((question) => question[field]));
      if (values.size !== 1) {
        throw new Error(`${block[0].stimulusGroupId}: set disagrees on ${field}`);
      }
      const kind = block[0][field];
      if (!pools.has(kind)) {
        throw new Error(`${block[0].stimulusGroupId}: unsupported ${field} value ${kind}`);
      }
      pools.get(kind).push(block);
    });

    const requirements = order.map((kind) => {
      const count = blueprint.counts[kind] || 0;
      const pool = pools.get(kind);
      if (pool.length < count) {
        throw new Error(`Insufficient ${kind} sets for the configured set blueprint`);
      }
      const byTotal = combinationsByQuestionTotal(pool, count, rng);
      if (byTotal.size === 0) {
        throw new Error(`Insufficient ${kind} sets for the configured set blueprint`);
      }
      return { kind, choices: shuffle([...byTotal.entries()], rng) };
    });

    let selected = null;
    function search(index, total, picked) {
      if (selected) return;
      if (index === requirements.length) {
        if (total === subject.mcqCount) selected = picked.slice();
        return;
      }
      for (const [questionTotal, blocksForKind] of requirements[index].choices) {
        const nextTotal = total + questionTotal;
        if (nextTotal > subject.mcqCount) continue;
        search(index + 1, nextTotal, picked.concat([blocksForKind]));
        if (selected) return;
      }
    }
    search(0, 0, []);

    if (!selected) {
      throw new Error("No whole-set draw satisfies the configured set blueprint and question count");
    }

    const selectedBlocks = blueprint.preserveCategoryOrder
      ? selected.flat()
      : shuffle(selected.flat(), rng);
    return selectedBlocks.flatMap((block) => block.slice().sort((a, b) => {
      const aSequence = Number.isInteger(a.sequence) ? a.sequence : 0;
      const bSequence = Number.isInteger(b.sequence) ? b.sequence : 0;
      return aSequence - bSequence;
    }));
  }

  function drawExam(subject, bank, rng) {
    if (subject && subject.setBlueprint) return drawSetBlueprintExamScalable(subject, bank, rng);
    return base.drawExam(subject, bank, rng);
  }

  return { combinationsByQuestionTotal, drawSetBlueprintExamScalable, drawExam };
});
