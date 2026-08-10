// AP Exam Practice — exam draw logic
//
// Pure, DOM-free functions shared by the browser app (js/app.js) and the Node
// test suite (tests/). Kept in its own file precisely so the blueprint drawer can
// be unit-tested and audited without a DOM.
//
// The important piece here is `apportion()` + `drawExam()`. The previous version
// of this app did `shuffle(bank).slice(0, mcqCount)` — a flat random draw that
// ignored the per-unit `examWeight` values in js/subjects.js entirely, so most
// simulated exams fell outside College Board's published per-unit ranges.
// `drawExam()` now fixes an exact per-unit question count up front using the
// largest-remainder (Hamilton) method, then samples within each unit.

(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  } else {
    Object.assign(root, api);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  // ---------- generic helpers ----------

  function shuffle(array, rng) {
    const rand = rng || Math.random;
    const a = array.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /**
   * Largest-remainder (Hamilton) apportionment.
   *
   * @param {Array<{id:string, weight:number, capacity:number}>} units
   * @param {number} total  exact number of seats to hand out
   * @returns {Object<string, number>} unitId -> seat count, summing to `total`
   *
   * Units whose pool is smaller than their fair share are capped at their
   * capacity and the shortfall is redistributed, proportionally by weight, among
   * the units that still have room. Iterates until nothing more can move.
   */
  function apportion(units, total) {
    const result = {};
    units.forEach((u) => (result[u.id] = 0));

    const capacityOf = (u) => (typeof u.capacity === "number" ? u.capacity : Infinity);
    const totalCapacity = units.reduce((sum, u) => sum + capacityOf(u), 0);
    let remaining = Math.min(total, totalCapacity);

    // Units still able to take more seats.
    let open = units.filter((u) => capacityOf(u) > 0);

    while (remaining > 0 && open.length > 0) {
      const weightSum = open.reduce((s, u) => s + u.weight, 0);
      if (weightSum <= 0) break;

      // Ideal (fractional) share for this round.
      const quotas = open.map((u) => ({
        unit: u,
        exact: (u.weight / weightSum) * remaining,
      }));

      // Floor everyone, then hand out leftovers by descending remainder.
      const alloc = new Map();
      let handedOut = 0;
      quotas.forEach((q) => {
        const base = Math.floor(q.exact);
        alloc.set(q.unit.id, base);
        handedOut += base;
      });
      let leftover = remaining - handedOut;
      const byRemainder = quotas
        .slice()
        .sort((a, b) => {
          const ra = a.exact - Math.floor(a.exact);
          const rb = b.exact - Math.floor(b.exact);
          if (rb !== ra) return rb - ra;
          // Deterministic tiebreak: bigger weight first, then unit id.
          if (b.unit.weight !== a.unit.weight) return b.unit.weight - a.unit.weight;
          return a.unit.id < b.unit.id ? -1 : 1;
        });
      for (let i = 0; i < leftover; i++) {
        const q = byRemainder[i % byRemainder.length];
        alloc.set(q.unit.id, alloc.get(q.unit.id) + 1);
      }

      // Apply, clamped to remaining capacity.
      let placed = 0;
      open.forEach((u) => {
        const want = alloc.get(u.id) || 0;
        const room = capacityOf(u) - result[u.id];
        const give = Math.max(0, Math.min(want, room));
        result[u.id] += give;
        placed += give;
      });

      remaining -= placed;
      open = open.filter((u) => capacityOf(u) - result[u.id] > 0);
      if (placed === 0) break; // nothing could move; avoid spinning
    }

    return result;
  }

  /**
   * Split a pool of questions into "blocks". A standalone question is a block of
   * one; every question sharing a stimulusGroupId forms a single block so the
   * set stays contiguous in the delivered exam, the way a real stimulus set does.
   */
  function toBlocks(questions) {
    const blocks = [];
    const groups = new Map();
    questions.forEach((q) => {
      const gid = q.stimulusGroupId;
      if (!gid) {
        blocks.push([q]);
        return;
      }
      if (!groups.has(gid)) {
        const block = [];
        groups.set(gid, block);
        blocks.push(block);
      }
      groups.get(gid).push(q);
    });
    return blocks;
  }

  /**
   * Pick exactly `target` questions from a pool without ever splitting a set.
   * A shared variantGroupId is treated as a soft exclusion so near-duplicate
   * siblings do not normally appear in the same exam.
   */
  function drawBlocks(pool, target, rng, usedVariantIds) {
    if (target <= 0) return [];
    const blocks = shuffle(toBlocks(pool), rng);
    const chosen = [];
    const used = new Set();
    let count = 0;

    const variantIdOf = (block) => (block.length === 1 ? block[0].variantGroupId : null);

    for (const block of blocks) {
      if (count === target) break;
      if (count + block.length > target) continue;
      const variantId = variantIdOf(block);
      if (usedVariantIds && variantId && usedVariantIds.has(variantId)) continue;
      chosen.push(block);
      block.forEach((q) => used.add(q));
      count += block.length;
      if (usedVariantIds && variantId) usedVariantIds.add(variantId);
    }

    // Exact blueprint counts are mandatory; variant separation is not. If the
    // soft exclusion prevents a complete draw, fill from the skipped blocks.
    if (count < target) {
      for (const block of blocks) {
        if (count === target) break;
        if (chosen.includes(block) || count + block.length > target) continue;
        chosen.push(block);
        block.forEach((q) => used.add(q));
        count += block.length;
      }
    }

    return count === target ? chosen : [];
  }

  function combinations(items, count, rng) {
    if (count === 0) return [[]];
    if (items.length < count) return [];
    const source = shuffle(items, rng);
    const result = [];
    function visit(start, picked) {
      if (picked.length === count) {
        result.push(picked.slice());
        return;
      }
      for (let i = start; i <= source.length - (count - picked.length); i++) {
        picked.push(source[i]);
        visit(i + 1, picked);
        picked.pop();
      }
    }
    visit(0, []);
    return result;
  }

  function stimulusKind(block) {
    const stimulus = block[0] && block[0].stimulus;
    if (!stimulus) return "standalone";
    if (stimulus.type === "document") return "foundational";
    return stimulus.type;
  }

  function practiceFamily(question) {
    return String(question.skill || "").split(".")[0];
  }

  function summarizeBlocks(blocks) {
    const practices = {};
    let stimulusSets = 0;
    blocks.forEach((block) => {
      if (block[0] && block[0].stimulusGroupId) stimulusSets++;
      block.forEach((question) => {
        const family = practiceFamily(question);
        practices[family] = (practices[family] || 0) + 1;
      });
    });
    return { practices, stimulusSets };
  }

  /**
   * Count occurrences of arbitrary question fields across a draw, e.g. the
   * calculator-permission split on a multi-part MCQ section. Generic by
   * design: any subject can constrain a draw by any boolean/enum field this
   * way without a new bespoke drawer, the same way `sciencePracticeRanges`
   * constrains the skill-family split above.
   *
   * @param {Array<Array>} blocks
   * @param {string[]} fields  question property names to tally
   * @returns {Object<string, Object<string, number>>} field -> stringified
   *   value -> count
   */
  function summarizeAttributes(blocks, fields) {
    const result = {};
    fields.forEach((field) => {
      result[field] = {};
    });
    blocks.forEach((block) => {
      block.forEach((question) => {
        fields.forEach((field) => {
          const key = String(question[field]);
          result[field][key] = (result[field][key] || 0) + 1;
        });
      });
    });
    return result;
  }

  /**
   * Sample whole-block unit draws until all cross-cutting ranges are satisfied.
   * The bank's checked practice balance makes a valid draw common enough for a
   * bounded sampler; every returned exam is validated, and an unsupported bank
   * fails explicitly rather than silently relaxing its blueprint.
   *
   * `subject.attributeRanges`, if present, is `{ fieldName: { stringValue:
   * [min, max] } }` — e.g. `{ calculatorAllowed: { "true": [11, 15], "false":
   * [27, 31] } }` to hold a multi-part MCQ section's composition to its real
   * exam split. Subjects that don't set it are unaffected.
   */
  function drawConstrainedWeightedExam(subject, byUnit, targets, rng) {
    const ranges = subject.sciencePracticeRanges || {};
    const setRange = subject.stimulusSetRange || [0, Infinity];
    const families = Object.keys(ranges);
    const attributeRanges = subject.attributeRanges || {};
    const attributeFields = Object.keys(attributeRanges);
    const attempts = subject.constraintDrawAttempts || 5000;

    for (let attempt = 0; attempt < attempts; attempt++) {
      const usedVariantIds = new Set();
      let blocks = [];
      (subject.units || []).forEach((unit) => {
        blocks = blocks.concat(drawBlocks(byUnit.get(unit.id), targets[unit.id] || 0, rng, usedVariantIds));
      });
      const placed = blocks.reduce((sum, block) => sum + block.length, 0);
      if (placed !== subject.mcqCount) continue;
      const summary = summarizeBlocks(blocks);
      if (summary.stimulusSets < setRange[0] || summary.stimulusSets > setRange[1]) continue;
      const practicesValid = families.every((family) => {
        const count = summary.practices[family] || 0;
        return count >= ranges[family][0] && count <= ranges[family][1];
      });
      if (!practicesValid) continue;
      const attributeSummary = attributeFields.length ? summarizeAttributes(blocks, attributeFields) : {};
      const attributesValid = attributeFields.every((field) =>
        Object.entries(attributeRanges[field]).every(([key, range]) => {
          const count = (attributeSummary[field] && attributeSummary[field][key]) || 0;
          return count >= range[0] && count <= range[1];
        })
      );
      if (attributesValid) return shuffle(blocks, rng).flat();
    }

    throw new Error(
      "No whole-block draw satisfies the configured unit, stimulus-set, science-practice, and attribute ranges"
    );
  }

  /**
   * Draw an AP U.S. Government-shaped exam. The blueprint is expressed on the
   * subject record so this remains data-driven and testable. It selects whole
   * sets by stimulus type, then fills the exact unit targets with standalone
   * questions. A missing/undersized pool is a hard failure, not a quiet fallback.
   */
  function drawBlueprintExam(subject, bank, targets, rng) {
    const blueprint = subject.examBlueprint;
    const blocks = toBlocks(bank);
    const standaloneByUnit = new Map();
    (subject.units || []).forEach((u) => standaloneByUnit.set(u.id, []));

    const groupsByKind = { quantitative: [], foundational: [], text: [], visual: [] };
    blocks.forEach((block) => {
      const kind = stimulusKind(block);
      if (kind === "standalone") {
        const unit = block[0].unit;
        if (standaloneByUnit.has(unit)) standaloneByUnit.get(unit).push(block[0]);
      } else if (groupsByKind[kind]) {
        groupsByKind[kind].push(block);
      }
    });

    const requirements = ["quantitative", "foundational", "text", "visual"].map((kind) => ({
      kind,
      count: blueprint.sets[kind],
      choices: combinations(groupsByKind[kind], blueprint.sets[kind], rng),
    }));
    requirements.forEach((requirement) => {
      if (requirement.choices.length === 0) {
        throw new Error(`Insufficient ${requirement.kind} stimulus sets for the configured exam blueprint`);
      }
    });

    let selected = null;
    function search(index, picked, usedByUnit) {
      if (selected) return;
      if (index === requirements.length) {
        const canFill = (subject.units || []).every((u) => {
          const needed = targets[u.id] - (usedByUnit[u.id] || 0);
          return needed >= 0 && standaloneByUnit.get(u.id).length >= needed;
        });
        if (canFill) selected = picked.slice();
        return;
      }
      for (const choice of requirements[index].choices) {
        const nextCounts = { ...usedByUnit };
        let valid = true;
        choice.forEach((block) => {
          const unit = block[0].unit;
          nextCounts[unit] = (nextCounts[unit] || 0) + block.length;
          if (nextCounts[unit] > (targets[unit] || 0)) valid = false;
        });
        if (valid) search(index + 1, picked.concat(choice), nextCounts);
        if (selected) return;
      }
    }
    search(0, [], {});
    if (!selected) throw new Error("No whole-set draw can satisfy both the stimulus and unit blueprints");

    const usedByUnit = {};
    const usedVariantIds = new Set();
    selected.forEach((block) => {
      usedByUnit[block[0].unit] = (usedByUnit[block[0].unit] || 0) + block.length;
      block.forEach((question) => {
        if (question.variantGroupId) usedVariantIds.add(question.variantGroupId);
      });
    });
    const finalBlocks = selected.slice();
    (subject.units || []).forEach((u) => {
      const needed = targets[u.id] - (usedByUnit[u.id] || 0);
      finalBlocks.push(...drawBlocks(standaloneByUnit.get(u.id), needed, rng, usedVariantIds));
    });

    const result = shuffle(finalBlocks, rng).flat();
    if (result.length !== subject.mcqCount) {
      throw new Error(`Blueprint draw produced ${result.length}; expected ${subject.mcqCount}`);
    }
    return result;
  }

  /**
   * Draw a fixed number of complete passage/question sets from named pools.
   *
   * `subject.setBlueprint` is intentionally generic:
   *
   *   {
   *     field: "setType",
   *     order: ["reading", "writing-long", "writing-short"],
   *     counts: { reading: 2, "writing-long": 2, "writing-short": 1 },
   *     preserveCategoryOrder: true
   *   }
   *
   * Every block must be a stimulus group and every question in a block must
   * share the configured field value.  The search considers whole-set
   * combinations only and accepts a combination only when its question total
   * exactly matches `mcqCount`; an impossible bank fails loudly.
   */
  function drawSetBlueprintExam(subject, bank, rng) {
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

    const requirements = order.map((kind) => ({
      kind,
      choices: combinations(pools.get(kind), blueprint.counts[kind] || 0, rng),
    }));
    requirements.forEach(({ kind, choices }) => {
      if (choices.length === 0) {
        throw new Error(`Insufficient ${kind} sets for the configured set blueprint`);
      }
    });

    const valid = [];
    function search(index, picked) {
      if (index === requirements.length) {
        const total = picked.flat().reduce((sum, block) => sum + block.length, 0);
        if (total === subject.mcqCount) valid.push(picked.map((group) => group.slice()));
        return;
      }
      requirements[index].choices.forEach((choice) => search(index + 1, picked.concat([choice])));
    }
    search(0, []);

    if (valid.length === 0) {
      throw new Error("No whole-set draw satisfies the configured set blueprint and question count");
    }

    const selected = valid[Math.floor((rng || Math.random)() * valid.length)];
    const selectedBlocks = blueprint.preserveCategoryOrder
      ? selected.flat()
      : shuffle(selected.flat(), rng);
    return selectedBlocks.flat();
  }

  /**
   * Build one attempt's question list for a subject.
   *
   * @param {object} subject   an AP_SUBJECTS entry
   * @param {Array}  bank      that subject's question bank
   * @param {function} [rng]   optional deterministic RNG for tests
   * @returns {Array} questions in delivered order (options not yet shuffled)
   */
  function drawExam(subject, bank, rng) {
    const requestedCount = subject.mcqCount || bank.length;
    if (bank.length < requestedCount) {
      throw new Error(`Question bank has ${bank.length} questions; ${requestedCount} are required`);
    }
    const drawCount = requestedCount;
    const units = Array.isArray(subject.units) ? subject.units : [];

    if (subject.setBlueprint) return drawSetBlueprintExam(subject, bank, rng);

    // No unit metadata (most subjects, so far): fall back to a flat random draw,
    // but still keep stimulus sets contiguous.
    if (units.length === 0) {
      const blocks = drawBlocks(bank, drawCount, rng);
      return shuffle(blocks, rng).flat();
    }

    const byUnit = new Map(units.map((u) => [u.id, []]));
    const orphans = [];
    bank.forEach((q) => {
      if (byUnit.has(q.unit)) byUnit.get(q.unit).push(q);
      else orphans.push(q);
    });

    const targets = apportion(
      units.map((u) => ({
        id: u.id,
        weight: u.examWeight || 0,
        capacity: byUnit.get(u.id).length,
      })),
      drawCount
    );

    if (subject.examBlueprint) return drawBlueprintExam(subject, bank, targets, rng);

    if (subject.sciencePracticeRanges || subject.attributeRanges) {
      return drawConstrainedWeightedExam(subject, byUnit, targets, rng);
    }

    const setRange = Array.isArray(subject.stimulusSetRange) ? subject.stimulusSetRange : null;
    const attempts = setRange ? 200 : 1;
    let lastPlaced = 0;

    for (let attempt = 0; attempt < attempts; attempt++) {
      let blocks = [];
      units.forEach((u) => {
        blocks = blocks.concat(drawBlocks(byUnit.get(u.id), targets[u.id] || 0, rng));
      });

      // If a weighted pool cannot cover the configured draw, try another whole-
      // block combination before failing. Quietly borrowing from another unit
      // would make the delivered blueprint untrue.
      const placed = blocks.reduce((n, b) => n + b.length, 0);
      lastPlaced = placed;
      if (placed !== drawCount) continue;

      if (setRange) {
        const setCount = blocks.filter((block) => block[0] && block[0].stimulusGroupId).length;
        if (setCount < setRange[0] || setCount > setRange[1]) continue;
      }

      return shuffle(blocks, rng).flat();
    }

    if (setRange) {
      throw new Error(`No whole-set draw satisfied stimulus set range ${setRange[0]}-${setRange[1]}`);
    }
    throw new Error(`Weighted draw could place only ${lastPlaced} of ${drawCount} questions`);
  }

  /**
   * Return a fresh { o, c } pair with the option order shuffled and the
   * correct-answer index/indices remapped to match. Pure — does not mutate
   * `question`. (An earlier version of this app mutated in place and desynced
   * `o` from `c`; keep it pure.)
   */
  function shuffleQuestionOptions(question, rng) {
    const order = shuffle(
      question.o.map((_, i) => i),
      rng
    );
    const o = order.map((i) => question.o[i]);
    const correctSet = new Set(question.c);
    const c = order
      .map((originalIndex, newIndex) => (correctSet.has(originalIndex) ? newIndex : null))
      .filter((v) => v !== null);
    return { o, c, order };
  }

  return {
    shuffle,
    apportion,
    toBlocks,
    drawBlocks,
    combinations,
    stimulusKind,
    practiceFamily,
    summarizeBlocks,
    summarizeAttributes,
    drawConstrainedWeightedExam,
    drawBlueprintExam,
    drawSetBlueprintExam,
    drawExam,
    shuffleQuestionOptions,
  };
});
