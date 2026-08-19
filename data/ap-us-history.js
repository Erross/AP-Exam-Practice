// AP United States History — original, unofficial Section I practice bank.
// May 2027 target. Section I format and course content verified 2026-08-19
// against current AP Central pages and the AP U.S. History Course at a Glance.
// The official multiple-choice section has 55 questions in 55 minutes, usually
// in 3–4 question sets using historical texts, interpretations, images, maps,
// graphs, and other evidence. All sources below are newly written practice
// material unless explicitly identified otherwise.
(() => {
  "use strict";

  window.QUESTIONS_AP_US_HISTORY = [];

  function optionPosition(setId, sequence) {
    let hash = sequence * 17;
    for (const ch of setId) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
    return hash % 4;
  }

  function addSet(def) {
    if (!def || !def.id || !def.unit || !def.stimulus || !Array.isArray(def.questions)) {
      throw new Error("Malformed APUSH source set");
    }
    if (def.questions.length < 3 || def.questions.length > 4) {
      throw new Error(`APUSH set ${def.id} must contain 3–4 questions`);
    }
    const gid = `apush-${def.id}`;
    const stimulus = {
      type: def.stimulus.type || "text",
      title: def.stimulus.title,
      source: def.stimulus.source || "Original AP Exam Practice synthetic source.",
      text: def.stimulus.text,
      description: def.stimulus.description,
      columns: def.stimulus.columns,
      rows: def.stimulus.rows,
      image: def.stimulus.image,
      alt: def.stimulus.alt,
    };

    def.questions.forEach((item, index) => {
      if (!item.topic || !item.q || !item.correct || !Array.isArray(item.distractors) || item.distractors.length !== 3 || !item.e) {
        throw new Error(`Malformed APUSH question in ${def.id}`);
      }
      const position = optionPosition(def.id, index + 1);
      const options = item.distractors.slice();
      options.splice(position, 0, item.correct);
      window.QUESTIONS_AP_US_HISTORY.push({
        id: `${gid}-${String(index + 1).padStart(2, "0")}`,
        unit: def.unit,
        topic: item.topic,
        skill: String(item.skill || "1"),
        type: "s",
        q: item.q,
        o: options,
        c: [position],
        e: item.e,
        stimulusGroupId: gid,
        stimulus,
      });
    });
  }

  window.__APUSH_ADD_SET__ = addSet;
})();
