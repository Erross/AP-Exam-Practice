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

  const contextualQualifier = {
    U1: "reflecting changing commercial and dynastic pressures",
    U2: "reflecting shifting confessional and institutional pressures",
    U3: "reflecting changing bargains between rulers and established elites",
    U4: "reflecting expanding print culture and learned institutions",
    U5: "reflecting fiscal crisis, war, and political contention",
    U6: "reflecting mechanization, urbanization, and changing labor relations",
    U7: "reflecting nationalism, liberalism, and expanding mass politics",
    U8: "reflecting total war, ideological conflict, and state mobilization",
    U9: "reflecting Cold War rivalry, integration, and social change",
  };

  function wordCount(value) {
    return String(value).trim().split(/\s+/).filter(Boolean).length;
  }

  function softenCategoricalLanguage(value) {
    return String(value)
      .replace(/\bimmediate disappearance\b/gi, "rapid decline")
      .replace(/\bdisappeared completely\b/gi, "became marginal")
      .replace(/\bdisappeared entirely\b/gi, "became marginal")
      .replace(/\bimmediate collapse\b/gi, "rapid contraction")
      .replace(/\bimmediately collapsed\b/gi, "contracted rapidly")
      .replace(/\bimmediate creation\b/gi, "rapid creation")
      .replace(/\bimmediate replacement\b/gi, "rapid replacement")
      .replace(/\bimmediately replaced\b/gi, "rapidly displaced")
      .replace(/\beliminated all\b/gi, "substantially reduced")
      .replace(/\beliminated entirely\b/gi, "substantially reduced")
      .replace(/\bended all\b/gi, "substantially reduced")
      .replace(/\bended entirely\b/gi, "substantially reduced")
      .replace(/\bwithout earlier outside influences\b/gi, "with little reliance on earlier outside influences")
      .replace(/\bwithout outside influences\b/gi, "with little outside influence")
      .replace(/\bnearly all\b/gi, "most")
      .replace(/\ball major\b/gi, "most major")
      .replace(/\ball European\b/gi, "most European")
      .replace(/\ball religious\b/gi, "most religious")
      .replace(/\ball political\b/gi, "most political")
      .replace(/\ball social\b/gi, "most social")
      .replace(/\ball legal\b/gi, "most legal")
      .replace(/\ball maritime\b/gi, "most maritime")
      .replace(/\ball colonial\b/gi, "most colonial")
      .replace(/\bevery European\b/gi, "most European")
      .replace(/\bevery major\b/gi, "most major")
      .replace(/\buniversal(?:ly)?\b/gi, "widespread")
      .replace(/\bentirely\b/gi, "largely")
      .replace(/\bcompletely\b/gi, "largely")
      .replace(/\bidentical\b/gi, "closely similar")
      .replace(/\bnever\b/gi, "rarely")
      .replace(/\bnone\b/gi, "few")
      .replace(/\bonly\b/gi, "primarily")
      .replace(/\ball\b/gi, "most");
  }

  function qualifyAlternative(value, unit, correctLength) {
    let text = softenCategoricalLanguage(value);
    if (wordCount(text) + 3 < correctLength) {
      text = `${text}, ${contextualQualifier[unit]}`;
    }
    return text;
  }

  function optionOrder(code, sequence) {
    const [unit, topic] = code.split(".").map(Number);
    return ((unit * 17) + (topic * 7) + sequence) % 4;
  }

  function buildOptions(correct, distractors, position, unit) {
    if (!Array.isArray(distractors) || distractors.length !== 3) {
      throw new Error("AP Euro questions require exactly three distractors");
    }
    const correctLength = wordCount(correct);
    const options = distractors.map((value) => qualifyAlternative(value, unit, correctLength));
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
      const ordered = buildOptions(item.correct, item.distractors, optionOrder(def.code, sequence), def.unit);
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
