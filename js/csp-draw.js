// AP Computer Science Principles constructive Section I drawer.
//
// CSP combines several exact structural requirements that are awkward for the
// generic rejection sampler: one complete 5-question innovation passage, exactly
// 8 select-two questions, exact unit counts, variant separation, and published
// computational-thinking-practice bands. Build those constraints deliberately
// instead of hoping a generic random draw happens to satisfy all of them.
(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else {
    const baseDrawExam = root.drawExam;
    root.drawCspExam = api.drawCspExam;
    root.drawExam = function drawExamWithCsp(subject, bank, rng) {
      if (subject && subject.cspBlueprint) return api.drawCspExam(subject, bank, rng);
      return baseDrawExam(subject, bank, rng);
    };
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function shuffle(array, rng) {
    const rand = rng || Math.random;
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function practiceFamily(question) {
    return String(question.skill || "").split(".")[0];
  }

  function collectGroups(bank) {
    const passages = new Map();
    const variantsByUnit = new Map();

    bank.forEach((question) => {
      if (question.stimulusGroupId) {
        if (!passages.has(question.stimulusGroupId)) passages.set(question.stimulusGroupId, []);
        passages.get(question.stimulusGroupId).push(question);
        return;
      }
      if (!question.variantGroupId) throw new Error(`${question.id}: CSP standalone item is missing variantGroupId`);
      if (!variantsByUnit.has(question.unit)) variantsByUnit.set(question.unit, new Map());
      const groups = variantsByUnit.get(question.unit);
      if (!groups.has(question.variantGroupId)) groups.set(question.variantGroupId, []);
      groups.get(question.variantGroupId).push(question);
    });

    return {
      passages:[...passages.values()],
      variantsByUnit:new Map([...variantsByUnit].map(([unit, groups]) => [unit, [...groups.values()]])),
    };
  }

  function practicesValid(subject, questions) {
    const counts = {};
    questions.forEach((question) => {
      const family = practiceFamily(question);
      counts[family] = (counts[family] || 0) + 1;
    });
    return Object.entries(subject.skillCountRanges || {}).every(([family, range]) => {
      const count = counts[family] || 0;
      return count >= range[0] && count <= range[1];
    });
  }

  function chooseVariantMembers(groups, multiCount, rng) {
    const selectableMulti = groups.filter((group) =>
      group.some((question) => question.type === "m") && group.some((question) => question.type === "s")
    );
    if (selectableMulti.length < multiCount) return null;
    const multiGroups = new Set(shuffle(selectableMulti, rng).slice(0, multiCount));

    const chosen = [];
    for (const group of groups) {
      const desiredType = multiGroups.has(group) ? "m" : "s";
      const candidates = group.filter((question) => question.type === desiredType);
      if (!candidates.length) return null;
      chosen.push(shuffle(candidates, rng)[0]);
    }
    return chosen;
  }

  function drawCspExam(subject, bank, rng) {
    const blueprint = subject && subject.cspBlueprint;
    if (!blueprint) throw new Error("AP CSP constructive drawer requires subject.cspBlueprint");
    if (!Array.isArray(bank) || bank.length < subject.mcqCount) throw new Error("AP CSP bank is too small for a full form");

    const { passages, variantsByUnit } = collectGroups(bank);
    if (!passages.length) throw new Error("AP CSP requires at least one computing-innovation passage set");
    passages.forEach((passage) => {
      if (passage.length !== blueprint.passageQuestionCount) {
        throw new Error(`${passage[0].stimulusGroupId}: expected ${blueprint.passageQuestionCount} passage questions`);
      }
      if (!passage.every((question) => question.type === "s" && question.cspQuestionKind === "passage")) {
        throw new Error(`${passage[0].stimulusGroupId}: CSP passage sets must contain single-select passage questions`);
      }
    });

    const attempts = subject.constraintDrawAttempts || 50000;
    for (let attempt = 0; attempt < attempts; attempt++) {
      const passage = shuffle(passages, rng)[0];
      const selectedGroups = [];
      let possible = true;

      for (const [unit, target] of Object.entries(blueprint.unitCounts)) {
        const passageCount = passage.filter((question) => question.unit === unit).length;
        const needed = target - passageCount;
        const groups = variantsByUnit.get(unit) || [];
        if (needed < 0 || groups.length < needed) { possible = false; break; }
        selectedGroups.push(...shuffle(groups, rng).slice(0, needed));
      }
      if (!possible) continue;

      const standalone = chooseVariantMembers(selectedGroups, blueprint.multiCount, rng);
      if (!standalone) continue;
      const questions = standalone.concat(passage);
      if (questions.length !== subject.mcqCount) continue;
      if (!practicesValid(subject, questions)) continue;

      const multiActual = questions.filter((question) => question.type === "m").length;
      if (multiActual !== blueprint.multiCount) continue;
      const passageActual = questions.filter((question) => question.cspQuestionKind === "passage").length;
      if (passageActual !== blueprint.passageQuestionCount) continue;

      // Keep the five passage questions atomic and contiguous while otherwise
      // randomizing the delivered order.
      const blocks = standalone.map((question) => [question]);
      blocks.push(passage.slice());
      return shuffle(blocks, rng).flat();
    }

    throw new Error("No constructive AP CSP draw satisfies the configured practice ranges");
  }

  return { drawCspExam, collectGroups, practicesValid, chooseVariantMembers };
});
