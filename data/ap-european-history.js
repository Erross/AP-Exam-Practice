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

  const visualAssets = {
    "2.7": {
      image: "assets/ap-european-history/u2-mannerism-baroque-comparison.svg",
      alt: "Original two-panel schematic: Work A uses elongated figures and a compressed unstable arrangement; Work B uses a strong diagonal, concentrated light, and figures shown in pronounced movement.",
    },
    "4.5": {
      image: "assets/ap-european-history/u4-rococo-neoclassical-interiors.svg",
      alt: "Original two-panel interior schematic: Interior A uses curved asymmetrical ornament and an intimate leisure grouping; Interior B uses symmetry, columns, restrained geometry, and a central civic scene.",
    },
    "5.8": {
      image: "assets/ap-european-history/u5-romantic-sublime-landscape.svg",
      alt: "Original landscape schematic showing a solitary traveler on a rocky foreground facing layered mountains and mist, with the human figure very small relative to the landscape.",
    },
    "7.8": {
      image: "assets/ap-european-history/u7-realist-impressionist-comparison.svg",
      alt: "Original two-panel schematic: Work A shows two laborers bent over field work; Work B shows a railway platform, moving figures, steam, and broken strokes suggesting changing light.",
    },
    "8.10": {
      image: "assets/ap-european-history/u8-modernist-fragmented-still-life.svg",
      alt: "Original geometric still-life schematic in which familiar bottle, bowl, table, and paper-like forms are broken into overlapping angular planes shown from more than one viewpoint.",
    },
  };

  // Targeted replacements from the first independent semantic review. These
  // keep the same keyed answer while replacing cartoonishly wrong alternatives
  // with historically plausible but still unambiguously inferior competitors.
  const semanticDistractors = {
    "apeuro-3-6-02": [
      "The War of the Austrian Succession, which also reflected dynastic and balance-of-power calculations but not the Bourbon succession to Spain",
      "The Seven Years' War, which widened great-power rivalry into a global conflict several decades after the Spanish succession crisis",
      "The Great Northern War, which shifted power around the Baltic rather than resolving the feared union of the French and Spanish crowns",
    ],
    "apeuro-5-8-02": [
      "Neoclassical confidence that political and artistic order could be modeled on rational principles",
      "Enlightened-absolutist efforts to make administration more systematic while preserving monarchical authority",
      "The growing prestige of scientific explanation and utilitarian reform among eighteenth-century elites",
    ],
    "apeuro-6-2-03": [
      "Court expenditure records showing changing aristocratic demand for luxury goods but little about industrial labor or infrastructure",
      "Diplomatic correspondence on dynastic marriages that reveals state relations more directly than regional industrial capacity",
      "Parish records of church construction styles that illuminate local culture more directly than capital, transport, or labor mobility",
    ],
    "apeuro-6-7-02": [
      "Whether constitutional liberty could coexist with large inequalities in ownership and bargaining power",
      "Whether private property encouraged individual independence or entrenched unequal control over productive resources",
      "Whether market exchange alone could protect workers from insecurity during rapid industrial change",
    ],
    "apeuro-7-6-03": [
      "Improved cartography and surveying, which aided imperial administration but did not by themselves create the decisive military-logistical advantage",
      "Earlier oceanic sailing techniques, which supported overseas contact but lacked the speed and inland reach of industrial transport systems",
      "Mechanized textile production, which increased manufacturing capacity without directly supplying the same combination of transport, firepower, communications, and disease control",
    ],
    "apeuro-9-7-03": [
      "The construction of the Berlin Wall in 1961, which demonstrated coercive bloc control but was carried out by East German authorities rather than a Warsaw Pact invasion",
      "The imposition of martial law in Poland in 1981, which suppressed Solidarity under Soviet pressure without direct Soviet military intervention",
      "The Brezhnev Doctrine announced after 1968, which justified intervention but was a policy statement rather than an earlier use of force",
    ],
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
    const visual = visualAssets[def.code];
    const stimulus = {
      type: def.stimulus.type || "text",
      title: def.stimulus.title,
      source: visual ? "Original synthetic visual created for AP Exam Practice; not a historical artifact or College Board source." : def.stimulus.source,
      description: def.stimulus.description,
      text: def.stimulus.text,
      columns: def.stimulus.columns,
      rows: def.stimulus.rows,
      image: visual && visual.image,
      alt: visual && visual.alt,
    };

    def.questions.forEach((item, index) => {
      const sequence = index + 1;
      const id = `apeuro-${def.code.replace(".", "-")}-${String(sequence).padStart(2, "0")}`;
      const distractors = semanticDistractors[id] || item.distractors;
      const ordered = buildOptions(item.correct, distractors, optionOrder(def.code, sequence), def.unit);
      window.QUESTIONS_AP_EUROPEAN_HISTORY.push({
        id,
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
