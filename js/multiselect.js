// Opt-in support for AP multiple-select MCQs.
//
// The core app already scores arrays of selected answers and draw.js already
// remaps multiple correct indices when options are shuffled. This layer only
// bridges the remaining browser/session gaps for subjects that actually use
// select-two questions (currently AP Computer Science Principles).
(function (root) {
  "use strict";

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

  const api = { validSavedAnswer };
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
    return;
  }
  root.AP_MULTISELECT = api;

  // This script is loaded after app.js. If that ordering changes, fail loudly
  // instead of silently serving a select-two item with radio buttons.
  if (
    typeof renderQuestion !== "function" ||
    typeof recordAnswer !== "function" ||
    typeof validateSavedSession !== "function"
  ) {
    throw new Error("Multi-select support must load after app.js and session.js");
  }

  const baseRenderQuestion = renderQuestion;
  const baseRecordAnswer = recordAnswer;
  const baseValidateSavedSession = validateSavedSession;

  recordAnswer = function recordAnswerWithMultiSelect() {
    const question = state.questions[state.current];
    if (!question || question.type !== "m") return baseRecordAnswer();

    const checked = [...document.querySelectorAll('input[name="option"]:checked')]
      .map((input) => Number(input.value));
    if (checked.length) state.answers[state.current] = checked;
    else delete state.answers[state.current];
    refreshNavigatorState();
    persistSession();
  };

  renderQuestion = function renderQuestionWithMultiSelect(opts = {}) {
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

      // Capture phase runs before app.js's existing bubble-phase change handler.
      // If a third box is checked, undo that click before recordAnswer() sees it.
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

  validateSavedSession = function validateSavedSessionWithMultiSelect(saved, subject, bank, now) {
    if (!saved || !saved.answers || typeof saved.answers !== "object" || Array.isArray(saved.answers)) {
      return baseValidateSavedSession(saved, subject, bank, now);
    }

    // Let the battle-tested base validator reconstruct IDs, option permutations,
    // timing, flags, strike-outs, and part boundaries. Temporarily scalarize any
    // multi-answer values so its legacy scalar answer check can do the rest.
    const scalarAnswers = {};
    for (const [key, value] of Object.entries(saved.answers)) {
      if (Array.isArray(value)) {
        if (value.length === 0) return null;
        scalarAnswers[key] = value[0];
      } else {
        scalarAnswers[key] = value;
      }
    }
    const normalized = { ...saved, answers: scalarAnswers };
    const restored = baseValidateSavedSession(normalized, subject, bank, now);
    if (!restored) return null;

    for (const [key, value] of Object.entries(saved.answers)) {
      const qIndex = Number(key);
      const question = restored.questions[qIndex];
      if (!validSavedAnswer(question, value)) return null;
      restored.answers[qIndex] = Array.isArray(value) ? value.slice() : value;
    }
    return restored;
  };
})(typeof globalThis !== "undefined" ? globalThis : this);
