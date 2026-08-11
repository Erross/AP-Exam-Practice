// AP Exam Practice — persisted-attempt validation and reconstruction.
(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else Object.assign(root, api);
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function isIntegerInRange(value, min, max) {
    return Number.isInteger(value) && value >= min && value <= max;
  }

  function isPermutation(order, length) {
    return (
      Array.isArray(order) &&
      order.length === length &&
      order.every((value) => isIntegerInRange(value, 0, length - 1)) &&
      new Set(order).size === length
    );
  }

  function remapQuestion(question, order) {
    const correct = new Set(question.c);
    return {
      ...question,
      o: order.map((index) => question.o[index]),
      c: order
        .map((originalIndex, displayedIndex) => (correct.has(originalIndex) ? displayedIndex : null))
        .filter((index) => index !== null),
      optionOrder: order.slice(),
    };
  }

  /**
   * Subjects whose Section I is split into distinct timed parts (see
   * subject.examParts, e.g. AP Calculus AB's no-calculator/calculator halves)
   * rely on js/draw.js's orderByExamParts to deliver each part as one
   * contiguous, homogeneous run in `questions`. This walks that already-ordered
   * list once and records each part's [start, end) slice, so both the app and
   * session-restore validation can agree on part boundaries without either one
   * re-deriving them differently. Returns null for subjects with no examParts.
   */
  function computePartBoundaries(subject, questions) {
    const config = subject && subject.examParts;
    if (!config) return null;
    const field = config.field;
    let idx = 0;
    return config.parts.map((partDef) => {
      const start = idx;
      while (idx < questions.length && questions[idx][field] === partDef.value) idx++;
      return { value: partDef.value, label: partDef.label, timeMinutes: partDef.timeMinutes, start, end: idx };
    });
  }

  function validateSavedSession(saved, subject, bank, now) {
    if (!saved || saved.v !== 2 || !subject || subject.releaseStatus !== "released") return null;
    if (saved.subjectId !== subject.id || !Array.isArray(bank)) return null;
    if (!Number.isFinite(saved.createdAt) || !Number.isFinite(saved.endsAt)) return null;
    if (saved.createdAt > now + 60_000 || saved.createdAt < now - 24 * 60 * 60 * 1000) return null;
    const duration = (subject.mcqTimeMinutes || 0) * 60 * 1000;
    if (saved.endsAt <= now || saved.endsAt > saved.createdAt + duration + 1_000) return null;
    if (!Array.isArray(saved.questions) || saved.questions.length !== subject.mcqCount) return null;

    const bankById = new Map(bank.map((question) => [question.id, question]));
    const seen = new Set();
    const questions = [];
    for (const record of saved.questions) {
      if (!record || typeof record.id !== "string" || seen.has(record.id)) return null;
      const original = bankById.get(record.id);
      if (!original || !isPermutation(record.optionOrder, original.o.length)) return null;
      seen.add(record.id);
      questions.push(remapQuestion(original, record.optionOrder));
    }

    const parts = computePartBoundaries(subject, questions);
    let partIndex = 0;
    if (parts) {
      if (!isIntegerInRange(saved.partIndex, 0, parts.length - 1)) return null;
      partIndex = saved.partIndex;
      const activePart = parts[partIndex];
      // Once a part has been entered, earlier parts' questions are locked, so a
      // restored `current` may only point into the active part's slice.
      if (!isIntegerInRange(saved.current, activePart.start, activePart.end - 1)) return null;
    } else {
      if (!isIntegerInRange(saved.current, 0, questions.length - 1)) return null;
    }
    const answers = {};
    if (!saved.answers || typeof saved.answers !== "object" || Array.isArray(saved.answers)) return null;
    for (const [key, value] of Object.entries(saved.answers)) {
      const qIndex = Number(key);
      if (!String(qIndex).match(/^\d+$/) || !isIntegerInRange(qIndex, 0, questions.length - 1)) return null;
      if (!isIntegerInRange(value, 0, questions[qIndex].o.length - 1)) return null;
      answers[qIndex] = value;
    }

    if (!Array.isArray(saved.flagged) || new Set(saved.flagged).size !== saved.flagged.length) return null;
    if (!saved.flagged.every((index) => isIntegerInRange(index, 0, questions.length - 1))) return null;

    const struckOut = {};
    if (!saved.struckOut || typeof saved.struckOut !== "object" || Array.isArray(saved.struckOut)) return null;
    for (const [key, values] of Object.entries(saved.struckOut)) {
      const qIndex = Number(key);
      if (!String(qIndex).match(/^\d+$/) || !isIntegerInRange(qIndex, 0, questions.length - 1)) return null;
      if (!Array.isArray(values) || new Set(values).size !== values.length) return null;
      if (!values.every((value) => isIntegerInRange(value, 0, questions[qIndex].o.length - 1))) return null;
      struckOut[qIndex] = new Set(values);
    }

    return {
      questions,
      answers,
      flagged: new Set(saved.flagged),
      struckOut,
      current: saved.current,
      createdAt: saved.createdAt,
      endsAt: saved.endsAt,
      parts,
      partIndex,
    };
  }

  return { isPermutation, remapQuestion, validateSavedSession, computePartBoundaries };
});
