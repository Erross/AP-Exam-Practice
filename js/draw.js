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
   * Pick exactly `target` questions from `pool`, preferring to take whole
   * stimulus sets. Falls back to partial sets only when it is the only way to
   * hit the exact count.
   *
   * @returns {Array<Array<object>>} chosen blocks (each an array of questions)
   */
  function drawBlocks(pool, target, rng) {
    if (target <= 0) return [];
    const blocks = shuffle(toBlocks(pool), rng);
    const chosen = [];
    const used = new Set();
    let count = 0;

    for (const block of blocks) {
      if (count === target) break;
      if (count + block.length <= target) {
        chosen.push(block);
        block.forEach((q) => used.add(q));
        count += block.length;
      }
    }

    if (count < target) {
      // Top up with leftovers, standalone questions first, then split a set.
      const leftovers = shuffle(
        pool.filter((q) => !used.has(q)),
        rng
      ).sort((a, b) => (a.stimulusGroupId ? 1 : 0) - (b.stimulusGroupId ? 1 : 0));
      for (const q of leftovers) {
        if (count === target) break;
        chosen.push([q]);
        used.add(q);
        count++;
      }
    }

    return chosen;
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
    const drawCount = Math.min(subject.mcqCount || bank.length, bank.length);
    const units = Array.isArray(subject.units) ? subject.units : [];

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

    let blocks = [];
    units.forEach((u) => {
      blocks = blocks.concat(drawBlocks(byUnit.get(u.id), targets[u.id] || 0, rng));
    });

    // If unit pools couldn't cover mcqCount, backfill from anything left over so
    // the student still gets a full-length exam.
    let placed = blocks.reduce((n, b) => n + b.length, 0);
    if (placed < drawCount) {
      const chosen = new Set(blocks.flat());
      const spare = shuffle(
        bank.concat(orphans).filter((q) => !chosen.has(q)),
        rng
      );
      for (const q of spare) {
        if (placed >= drawCount) break;
        blocks.push([q]);
        chosen.add(q);
        placed++;
      }
    }

    return shuffle(blocks, rng).flat();
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
    return { o, c };
  }

  return { shuffle, apportion, toBlocks, drawBlocks, drawExam, shuffleQuestionOptions };
});
