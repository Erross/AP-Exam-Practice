// AP European History — original, unofficial Section I practice bank.
// May 2027 target. Course content and MCQ format verified 2026-08-19 against
// current AP Central course/exam pages, Fall 2026 CED materials, and the
// AP European History Course at a Glance.
//
// The official Section I Part A has 55 MCQs in 55 minutes, usually in
// 3–4-question sets built around primary/secondary texts, images, maps,
// graphs, and other historical evidence. Development stays draft until the
// full nine-unit bank and release gates are complete.
(() => {
  "use strict";

  window.QUESTIONS_AP_EUROPEAN_HISTORY = [];

  function optionOrder(code, sequence) {
    const [unit, topic] = code.split(".").map(Number);
    return ((unit * 17) + (topic * 7) + sequence) % 4;
  }

  function buildOptions(correct, distractors, position) {
    if (!Array.isArray(distractors) || distractors.length !== 3) {
      throw new Error("AP Euro questions require exactly three distractors");
    }
    const options = distractors.slice();
    options.splice(position, 0, correct);
    return { options, correctIndex: position };
  }

  window.__APEURO_ADD_SET__ = function addEuropeanHistorySet(def) {
    if (!def || !def.unit || !def.code || !def.topic || !def.stimulus || !Array.isArray(def.questions)) {
      throw new Error("Malformed AP Euro set definition");
    }
    if (def.questions.length < 3 || def.questions.length > 4) {
      throw new Error(`AP Euro set ${def.code} must contain 3–4 questions`);
    }

    const groupId = `apeuro-${def.code.replace(".", "-")}`;
    const stimulus = {
      type: def.stimulus.type || "text",
      title: def.stimulus.title,
      source: def.stimulus.source,
      description: def.stimulus.description,
      text: def.stimulus.text,
      columns: def.stimulus.columns,
      rows: def.stimulus.rows,
    };

    def.questions.forEach((item, index) => {
      const sequence = index + 1;
      const ordered = buildOptions(item.correct, item.distractors, optionOrder(def.code, sequence));
      window.QUESTIONS_AP_EUROPEAN_HISTORY.push({
        id: `apeuro-${def.code.replace(".", "-")}-${String(sequence).padStart(2, "0")}`,
        unit: def.unit,
        topicCode: def.code,
        topic: def.topic,
        type: "s",
        skill: String(item.skill),
        stimulusGroupId: groupId,
        sequence,
        stimulus,
        q: item.q,
        o: ordered.options,
        c: [ordered.correctIndex],
        e: item.e,
      });
    });
  };
})();
