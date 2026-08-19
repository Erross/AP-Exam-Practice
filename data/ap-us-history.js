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

  const unitQualifiers = {
    U1: ["during early Atlantic encounters", "within pre-1607 imperial competition", "amid first-contact demographic change", "within Indigenous-European exchange networks", "during the first century of sustained Atlantic contact", "in the era before permanent English settlement"],
    U2: ["within seventeenth-century colonial development", "amid expanding Atlantic commerce", "within mainland British colonial society", "during early imperial rivalry in North America", "as regional colonial economies diverged", "before the imperial crisis of the 1760s"],
    U3: ["during the imperial crisis and Revolution", "within the founding-era constitutional debate", "amid the transition from colonies to republic", "during the first party system", "as the new republic expanded westward", "within late-eighteenth-century republican politics"],
    U4: ["during the early national period", "amid the Market Revolution", "within antebellum party competition", "during expanding white male democracy", "amid evangelical reform and social change", "before the sectional crisis of the 1850s"],
    U5: ["during the sectional crisis", "amid continental expansion and slavery debates", "during the Civil War era", "within wartime federal mobilization", "during Reconstruction politics", "amid post-emancipation struggles over citizenship"],
    U6: ["during Gilded Age industrialization", "amid rapid urban and corporate growth", "within post-Reconstruction political conflict", "during western commercial expansion", "amid mass immigration and labor unrest", "within late-nineteenth-century reform debates"],
    U7: ["during Progressive-era reform", "amid expanding overseas power", "within the interwar political economy", "during mass-consumer cultural change", "amid Depression-era federal expansion", "during global wartime mobilization"],
    U8: ["within the postwar Cold War order", "amid suburban and consumer expansion", "during the modern civil-rights movement", "within Great Society policymaking", "amid Vietnam-era political conflict", "during the rights movements of the 1960s and 1970s"],
    U9: ["within the post-1980 political realignment", "during the late Cold War and its aftermath", "amid globalization and digital change", "within contemporary migration debates", "during post-9/11 national-security politics", "amid increasing twenty-first-century polarization"],
  };

  function optionPosition(setId, sequence) {
    let hash = sequence * 17;
    for (const ch of setId) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
    return hash % 4;
  }

  function wordCount(value) {
    return String(value).trim().split(/\s+/).filter(Boolean).length;
  }

  function softenAbsoluteLanguage(value) {
    return String(value)
      .replace(/\ball\b/gi, "most")
      .replace(/\balways\b/gi, "typically")
      .replace(/\bnever\b/gi, "rarely")
      .replace(/\bnone\b/gi, "few")
      .replace(/\bonly\b/gi, "primarily")
      .replace(/\bentirely\b/gi, "largely")
      .replace(/\bcompletely\b/gi, "substantially")
      .replace(/\bimmediately\b/gi, "rapidly")
      .replace(/\bevery\b/gi, "most");
  }

  function competitiveDistractors(unit, setId, sequence, correct, distractors) {
    const clauses = unitQualifiers[unit] || [];
    const target = Math.max(5, wordCount(correct) - 1);
    const used = new Set();
    return distractors.map((raw, index) => {
      let text = softenAbsoluteLanguage(raw);
      if (wordCount(text) >= target || clauses.length === 0) return text;

      const seed = optionPosition(`${setId}-${index}`, sequence + index);
      let firstIndex = seed % clauses.length;
      while (used.has(firstIndex) && used.size < clauses.length) firstIndex = (firstIndex + 1) % clauses.length;
      used.add(firstIndex);
      const first = clauses[firstIndex];
      text = `${text}, ${first}`;

      if (wordCount(text) < target && used.size < clauses.length) {
        let secondIndex = (firstIndex + 3) % clauses.length;
        while (used.has(secondIndex) && used.size < clauses.length) secondIndex = (secondIndex + 1) % clauses.length;
        if (!used.has(secondIndex)) {
          used.add(secondIndex);
          text = `${text}, ${clauses[secondIndex]}`;
        }
      }
      return text;
    });
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
      const options = competitiveDistractors(def.unit, def.id, index + 1, item.correct, item.distractors);
      options.splice(position, 0, item.correct);
      window.QUESTIONS_AP_US_HISTORY.push({
        id: `${gid}-${String(index + 1).padStart(2, "0")}`,
        unit: def.unit,
        topic: item.topic,
        topicCode: item.topic,
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
