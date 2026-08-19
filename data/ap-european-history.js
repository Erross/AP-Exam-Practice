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

  const contextualQualifiers = {
    U1: ["within expanding early-modern commercial networks", "amid dynastic competition among territorial states", "during growing European maritime expansion"],
    U2: ["amid confessional competition after the Reformation", "within expanding print and religious controversy", "as rulers negotiated church-state authority"],
    U3: ["within dynastic balance-of-power politics", "amid stronger central states and elite resistance", "as rulers bargained with established estates"],
    U4: ["within expanding print and learned networks", "amid new confidence in empirical and rational inquiry", "during debates over enlightened political reform"],
    U5: ["amid fiscal crisis and revolutionary political contention", "within expanding Atlantic markets and imperial rivalry", "during conflict over privilege, rights, and sovereignty"],
    U6: ["amid mechanization and changing labor relations", "within rapid urban and demographic growth", "during expanding industrial markets and infrastructure"],
    U7: ["amid nationalism and expanding mass politics", "within intensifying imperial and great-power rivalry", "during widening literacy and political organization"],
    U8: ["amid total war and state mobilization", "within ideological polarization and mass politics", "during repeated economic and diplomatic crises"],
    U9: ["amid Cold War rivalry and postwar reconstruction", "within European integration and changing welfare states", "during decolonization, migration, and globalization"],
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

  // Targeted replacements from independent semantic and naive review. These
  // keep the same keyed answer while replacing cartoonishly wrong alternatives
  // with historically plausible but still unambiguously inferior competitors.
  const semanticDistractors = {
    "apeuro-1-11-02": [
      "A royal customs register recording duties on imported goods but not the experiences or observations of long-distance travelers",
      "A port-city tax assessment showing commercial wealth without identifying the routes, encounters, or knowledge carried by travelers",
      "A merchant guild charter regulating local trade while offering little evidence about travel beyond the guild's home city",
    ],
    "apeuro-3-6-02": [
      "The War of the Austrian Succession, which also reflected dynastic and balance-of-power calculations but not the Bourbon succession to Spain",
      "The Seven Years' War, which widened great-power rivalry into a global conflict several decades after the Spanish succession crisis",
      "The Great Northern War, which shifted power around the Baltic rather than resolving the feared union of the French and Spanish crowns",
    ],
    "apeuro-4-7-02": [
      "A diplomatic dispatch describing court politics in one capital without tracing how travelers circulated observations across Europe",
      "A university enrollment register showing participation in formal education but not the exchange of knowledge through travel",
      "A bookseller's inventory showing available titles while revealing less about what travelers learned through direct observation abroad",
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
    "apeuro-6-4-03": [
      "Municipal tax rolls that identify property values but give limited evidence about crowding, sanitation, or mortality",
      "Factory payrolls that reveal wages and employment while saying little about neighborhood housing and public-health conditions",
      "Railway freight records that measure commercial traffic but do not directly show household density or urban disease patterns",
    ],
    "apeuro-6-7-02": [
      "Whether constitutional liberty could coexist with large inequalities in ownership and bargaining power",
      "Whether private property encouraged individual independence or entrenched unequal control over productive resources",
      "Whether market exchange alone could protect workers from insecurity during rapid industrial change",
    ],
    "apeuro-6-8-02": [
      "Mercantilism, which emphasized state-directed trade and national wealth rather than nineteenth-century responses to industrial social inequality",
      "Physiocracy, which located national wealth primarily in agriculture rather than in programs for reforming industrial society",
      "Classical laissez-faire liberalism, which generally trusted market exchange more than the reform movement identified in the source",
    ],
    "apeuro-6-8-03": [
      "Factory owners' petitions opposing regulation, useful for reconstructing resistance to reform but not by themselves its effects on workers",
      "Parliamentary election returns showing political competition without directly measuring workplace conditions after reform legislation",
      "National trade statistics showing industrial output while providing limited evidence about hours, safety, housing, or public health",
    ],
    "apeuro-7-6-03": [
      "Improved cartography and surveying, which aided imperial administration but did not by themselves create the decisive military-logistical advantage",
      "Earlier oceanic sailing techniques, which supported overseas contact but lacked the speed and inland reach of industrial transport systems",
      "Mechanized textile production, which increased manufacturing capacity without directly supplying the same combination of transport, firepower, communications, and disease control",
    ],
    "apeuro-7-7-03": [
      "Private railway-company reports that emphasize profitability and expansion while potentially understating disruptive effects on local communities",
      "Newspaper accounts from metropolitan investors that illuminate enthusiasm for railways but may underrepresent colonial or rural perspectives",
      "Passenger and freight statistics that measure use of railways without by themselves revealing how administrators interpreted their political effects",
    ],
    "apeuro-7-9-02": [
      "Regional election returns showing political loyalties but not necessarily the language, symbols, or historical claims used to mobilize nationalism",
      "Army conscription records revealing state reach while offering limited evidence about how ordinary people understood national identity",
      "Commercial census data measuring economic activity without directly showing the cultural narratives used by nationalist movements",
    ],
    "apeuro-8-9-03": [
      "Wartime ration records showing civilian hardship but not specifically documenting the targeting or persecution of designated groups",
      "Military production statistics revealing mobilization without identifying policies of exclusion, deportation, or mass killing",
      "Diplomatic correspondence on neutral trade showing international relations while providing limited direct evidence about persecuted populations",
    ],
    "apeuro-9-5-03": [
      "Statements by nationalist leaders that reveal political goals but require corroboration because belligerents had incentives to frame events selectively",
      "International diplomatic cables that record outside reactions but may not capture local patterns of displacement and violence on their own",
      "Military unit reports that document operations from an institutional perspective but require comparison with civilian and demographic evidence",
    ],
    "apeuro-9-7-03": [
      "The construction of the Berlin Wall in 1961, which demonstrated coercive bloc control but was carried out by East German authorities rather than a Warsaw Pact invasion",
      "The imposition of martial law in Poland in 1981, which suppressed Solidarity under Soviet pressure without direct Soviet military intervention",
      "The Brezhnev Doctrine announced after 1968, which justified intervention but was a policy statement rather than an earlier use of force",
    ],
    "apeuro-9-10-03": [
      "Postwar opinion surveys on European identity that illuminate political attitudes but do not directly measure changes in market exchange",
      "Records of diplomatic summit attendance that demonstrate interstate cooperation without showing whether trade or investment increased",
      "Defense-spending data from member states that measure security priorities rather than the economic effects of market integration",
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

  function qualifyAlternative(value, unit, correctLength, distractorIndex) {
    let text = softenCategoricalLanguage(value);
    if (wordCount(text) + 3 < correctLength) {
      const choices = contextualQualifiers[unit];
      text = `${text}, ${choices[distractorIndex % choices.length]}`;
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
    const options = distractors.map((value, index) => qualifyAlternative(value, unit, correctLength, index));
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
