// AP Computer Science Principles select-two/runtime support.
//
// CSP is the current course in this app whose Section I requires both a fixed
// five-question computing-innovation passage and select-two MCQs. The generic
// scorer and option shuffler already understand multiple correct indices; this
// opt-in layer adds constructive CSP drawing, checkbox rendering, two-selection
// enforcement, and persisted-array validation without changing other subjects.
(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
    return;
  }

  if (
    typeof root.drawExam !== "function" ||
    typeof root.renderQuestion !== "function" ||
    typeof root.recordAnswer !== "function" ||
    typeof root.validateSavedSession !== "function"
  ) {
    throw new Error("AP CSP runtime support must load after draw.js, session.js, and app.js");
  }

  const baseDrawExam = root.drawExam;
  const baseRenderQuestion = root.renderQuestion;
  const baseRecordAnswer = root.recordAnswer;
  const baseValidateSavedSession = root.validateSavedSession;

  root.AP_CSP_RUNTIME = api;
  root.drawCspExam = api.drawCspExam;
  root.drawExam = function drawExamWithCsp(subject, bank, rng) {
    if (subject && subject.cspBlueprint) return api.drawCspExam(subject, bank, rng);
    return baseDrawExam(subject, bank, rng);
  };

  root.recordAnswer = function recordAnswerWithCspSelectTwo() {
    const question = state.questions[state.current];
    if (!question || question.type !== "m") return baseRecordAnswer();

    const checked = [...document.querySelectorAll('input[name="option"]:checked')]
      .map((input) => Number(input.value));
    if (checked.length) state.answers[state.current] = checked;
    else delete state.answers[state.current];
    refreshNavigatorState();
    persistSession();
  };

  root.renderQuestion = function renderQuestionWithCspSelectTwo(opts = {}) {
    baseRenderQuestion(opts);
    const question = state.questions[state.current];
    if (!question || question.type !== "m") return;

    const container = document.getElementById("question-body");
    const fieldset = container && container.querySelector("fieldset.options");
    if (!fieldset) throw new Error("Multi-select question rendered without an option fieldset");

    const instruction = document.createElement("p");
    instruction.id = "multi-select-instruction";
    instruction.className = "question-instruction";
    instruction.textContent = "Select two answers.";
    container.insertBefore(instruction, fieldset);

    const selected = Array.isArray(state.answers[state.current])
      ? new Set(state.answers[state.current])
      : new Set();

    fieldset.querySelectorAll('input[name="option"]').forEach((input) => {
      input.type = "checkbox";
      input.checked = selected.has(Number(input.value));
      input.setAttribute("aria-describedby", instruction.id);
      // Run before app.js's existing bubble-phase change handler. If a third
      // option is checked, undo that change before recordAnswer() sees it.
      input.addEventListener(
        "change",
        (event) => {
          if (!event.target.checked) return;
          const checkedCount = fieldset.querySelectorAll('input[name="option"]:checked').length;
          if (checkedCount > 2) event.target.checked = false;
        },
        true
      );
    });
  };

  root.validateSavedSession = function validateSavedSessionWithCsp(saved, subject, bank, now) {
    if (!saved || !saved.answers || typeof saved.answers !== "object" || Array.isArray(saved.answers)) {
      return baseValidateSavedSession(saved, subject, bank, now);
    }

    // Reuse the battle-tested base validator for IDs, option permutations,
    // timing, flags, strike-outs, and part boundaries. Scalarize arrays only
    // long enough for its legacy scalar answer check, then validate/restore the
    // original select-two answer arrays below.
    const scalarAnswers = {};
    for (const [key, value] of Object.entries(saved.answers)) {
      if (Array.isArray(value)) {
        if (value.length === 0) return null;
        scalarAnswers[key] = value[0];
      } else {
        scalarAnswers[key] = value;
      }
    }
    const restored = baseValidateSavedSession({ ...saved, answers:scalarAnswers }, subject, bank, now);
    if (!restored) return null;

    for (const [key, value] of Object.entries(saved.answers)) {
      const qIndex = Number(key);
      const question = restored.questions[qIndex];
      if (!api.validSavedAnswer(question, value)) return null;
      restored.answers[qIndex] = Array.isArray(value) ? value.slice() : value;
    }
    return restored;
  };
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

  function isIntegerInRange(value, min, max) {
    return Number.isInteger(value) && value >= min && value <= max;
  }

  function validSavedAnswer(question, value) {
    if (!question || !Array.isArray(question.o)) return false;
    if (question.type === "m") {
      return (
        Array.isArray(value) &&
        value.length >= 1 &&
        value.length <= 2 &&
        new Set(value).size === value.length &&
        value.every((index) => isIntegerInRange(index, 0, question.o.length - 1))
      );
    }
    return isIntegerInRange(value, 0, question.o.length - 1);
  }

  function groupPractice(group) {
    const families = new Set(group.map(practiceFamily));
    if (families.size !== 1) throw new Error(`${group[0].variantGroupId}: CSP variant group crosses practice families`);
    return [...families][0];
  }

  function isMultiCapable(group) {
    return group.some((question) => question.type === "m") && group.some((question) => question.type === "s");
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
    const selectableMulti = groups.filter(isMultiCapable);
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

  function boundedRows(total, families, capacities) {
    const rows = [];
    const current = {};
    function visit(index, remaining) {
      if (index === families.length) {
        if (remaining === 0) rows.push({ ...current });
        return;
      }
      const family = families[index];
      const max = Math.min(capacities[family] || 0, remaining);
      for (let count = 0; count <= max; count++) {
        current[family] = count;
        visit(index + 1, remaining - count);
      }
      delete current[family];
    }
    visit(0, total);
    return rows;
  }

  function makeBuckets(variantsByUnit, families) {
    const byUnit = new Map();
    for (const [unit, groups] of variantsByUnit) {
      const buckets = Object.fromEntries(families.map((family) => [family, []]));
      groups.forEach((group) => {
        const family = groupPractice(group);
        if (!buckets[family]) throw new Error(`${group[0].variantGroupId}: unexpected CSP practice family ${family}`);
        buckets[family].push(group);
      });
      byUnit.set(unit, buckets);
    }
    return byUnit;
  }

  function findCountPlan(subject, blueprint, passage, bucketsByUnit, rng) {
    const families = Object.keys(subject.skillCountRanges || {});
    const units = Object.keys(blueprint.unitCounts || {});
    const passagePractice = Object.fromEntries(families.map((family) => [family, 0]));
    passage.forEach((question) => {
      const family = practiceFamily(question);
      if (!(family in passagePractice)) throw new Error(`${question.id}: passage uses unexpected practice family ${family}`);
      passagePractice[family]++;
    });

    const rowOptions = new Map();
    for (const unit of units) {
      const passageCount = passage.filter((question) => question.unit === unit).length;
      const needed = blueprint.unitCounts[unit] - passageCount;
      const buckets = bucketsByUnit.get(unit) || Object.fromEntries(families.map((family) => [family, []]));
      const capacities = Object.fromEntries(families.map((family) => [family, buckets[family].length]));
      if (needed < 0 || Object.values(capacities).reduce((sum, value) => sum + value, 0) < needed) return null;
      rowOptions.set(unit, shuffle(boundedRows(needed, families, capacities), rng));
    }

    const running = { ...passagePractice };
    const plan = {};

    function canStillReach(unitIndex) {
      for (const family of families) {
        const [min, max] = subject.skillCountRanges[family];
        if (running[family] > max) return false;
        let remainingCapacity = 0;
        for (let i = unitIndex; i < units.length; i++) {
          const unit = units[i];
          const options = rowOptions.get(unit);
          if (!options.length) return false;
          remainingCapacity += Math.max(...options.map((row) => row[family] || 0));
        }
        if (running[family] + remainingCapacity < min) return false;
      }
      return true;
    }

    function search(unitIndex) {
      if (unitIndex === units.length) {
        return families.every((family) => {
          const [min, max] = subject.skillCountRanges[family];
          return running[family] >= min && running[family] <= max;
        });
      }
      if (!canStillReach(unitIndex)) return false;
      const unit = units[unitIndex];
      for (const row of rowOptions.get(unit)) {
        let exceeds = false;
        for (const family of families) {
          running[family] += row[family] || 0;
          if (running[family] > subject.skillCountRanges[family][1]) exceeds = true;
        }
        if (!exceeds) {
          plan[unit] = row;
          if (search(unitIndex + 1)) return true;
          delete plan[unit];
        }
        for (const family of families) running[family] -= row[family] || 0;
      }
      return false;
    }

    return search(0) ? plan : null;
  }

  function selectGroupsForPlan(plan, bucketsByUnit, multiCount, rng) {
    const selectedByBucket = [];
    const selectedGroups = [];

    for (const [unit, row] of Object.entries(plan)) {
      const buckets = bucketsByUnit.get(unit);
      for (const [family, count] of Object.entries(row)) {
        if (!count) continue;
        const pool = shuffle(buckets[family], rng);
        const selected = pool.slice(0, count);
        const unselected = pool.slice(count);
        selectedGroups.push(...selected);
        selectedByBucket.push({ selected, unselected });
      }
    }

    let capable = selectedGroups.filter(isMultiCapable).length;
    if (capable < multiCount) {
      for (const bucket of shuffle(selectedByBucket, rng)) {
        while (capable < multiCount) {
          const incomingIndex = bucket.unselected.findIndex(isMultiCapable);
          const outgoingIndex = bucket.selected.findIndex((group) => !isMultiCapable(group));
          if (incomingIndex < 0 || outgoingIndex < 0) break;
          const incoming = bucket.unselected.splice(incomingIndex, 1)[0];
          const outgoing = bucket.selected.splice(outgoingIndex, 1, incoming)[0];
          bucket.unselected.push(outgoing);
          const globalIndex = selectedGroups.indexOf(outgoing);
          selectedGroups[globalIndex] = incoming;
          capable++;
        }
        if (capable >= multiCount) break;
      }
    }

    return capable >= multiCount ? selectedGroups : null;
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

    const families = Object.keys(subject.skillCountRanges || {});
    const bucketsByUnit = makeBuckets(variantsByUnit, families);
    for (const passage of shuffle(passages, rng)) {
      const plan = findCountPlan(subject, blueprint, passage, bucketsByUnit, rng);
      if (!plan) continue;
      const selectedGroups = selectGroupsForPlan(plan, bucketsByUnit, blueprint.multiCount, rng);
      if (!selectedGroups) continue;
      const standalone = chooseVariantMembers(selectedGroups, blueprint.multiCount, rng);
      if (!standalone) continue;

      const questions = standalone.concat(passage);
      if (questions.length !== subject.mcqCount) continue;
      if (!practicesValid(subject, questions)) continue;
      if (questions.filter((question) => question.type === "m").length !== blueprint.multiCount) continue;
      if (questions.filter((question) => question.cspQuestionKind === "passage").length !== blueprint.passageQuestionCount) continue;

      for (const [unit, target] of Object.entries(blueprint.unitCounts)) {
        if (questions.filter((question) => question.unit === unit).length !== target) {
          throw new Error(`AP CSP constructive plan produced the wrong ${unit} count`);
        }
      }

      const blocks = standalone.map((question) => [question]);
      blocks.push(passage.slice());
      return shuffle(blocks, rng).flat();
    }

    throw new Error("No constructive AP CSP draw satisfies the configured unit, practice, passage, and select-two constraints");
  }

  return {
    shuffle,
    validSavedAnswer,
    collectGroups,
    practicesValid,
    chooseVariantMembers,
    boundedRows,
    makeBuckets,
    findCountPlan,
    selectGroupsForPlan,
    drawCspExam,
  };
});
