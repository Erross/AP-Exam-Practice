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

  const rationaleRepairs = {
    "apush-u2-c-02": "Puritan communities linked religious discipline, schooling, and local governance because literacy supported Bible reading while covenant ideals made civic institutions responsible for enforcing communal moral norms.",
    "apush-u2-d-02": "English, French, and Spanish rivalry made Indigenous alliances strategically important, allowing Native nations to bargain among empires for trade, military support, and room to protect their own political autonomy.",
    "apush-u3-a-02": "The 1754–1763 North American conflict was part of the wider Seven Years' War, pitting Britain and France and their Indigenous allies against one another before Britain emerged with more territory and heavier debt.",
    "apush-u4-b-04": "The postwar American System reflected growing economic nationalism through proposals for a national bank, protective tariffs, and federally supported internal improvements intended to bind regional markets together.",
    "apush-u5-a-02": "Manifest Destiny framed continental expansion as desirable and often providential, blending nationalism, land hunger, racial assumptions, and commercial ambitions to justify expansion toward Texas, Oregon, and the Pacific.",
    "apush-u5-a-03": "The annexation of Texas and the unresolved U.S.-Mexican boundary dispute helped trigger war in 1846 after U.S. troops entered the contested border region and a military clash led President Polk to seek a declaration of war.",
    "apush-u5-a-04": "The status of slavery in the Mexican Cession became a central sectional issue because proposals such as the Wilmot Proviso and later popular-sovereignty plans forced Congress to confront slavery's possible western expansion.",
    "apush-u5-b-03": "The Fugitive Slave Act brought enforcement of slavery directly into northern communities by empowering federal recovery procedures and provoking resistance, personal-liberty measures, and wider antislavery mobilization.",
    "apush-u5-d-04": "Emancipation became increasingly central to Union strategy and the meaning of the war as the Emancipation Proclamation and Black military enlistment tied Union victory more directly to the destruction of slavery.",
    "apush-u6-a3-03": "Western expansion brought warfare, reservation policies, and dispossession of Native nations as railroads, mining, ranching, farming, and settler migration increased pressure on treaty lands and Indigenous sovereignty.",
    "apush-u6-c3-01": "Industrial cities attracted immigrants and internal migrants seeking wage work and community networks, accelerating urbanization while concentrating newcomers near factories, ethnic institutions, and transportation hubs.",
    "apush-u6-c3-03": "Corporate and urban growth expanded professional, managerial, clerical, and other white-collar occupations, helping enlarge a salaried middle class alongside the much larger industrial wage-labor force.",
    "apush-u7-e4-01": "All four indicators show broad economic collapse by 1933: industrial output falls from 100 to 58, unemployment rises from 3% to 25%, bank failures surge, and farm prices fall nearly by half.",
    "apush-u7-f4-02": "The United States fought a global coalition war across both European and Pacific theaters, using extraordinary industrial output, logistics, naval power, air power, and ground forces in coordination with major allies.",
    "apush-u8-a3-03": "NATO institutionalized a U.S.-led collective-defense commitment in Western Europe, making containment a durable peacetime alliance policy rather than relying only on temporary wartime cooperation or economic aid.",
    "apush-u8-b3-02": "McCarthy became associated with reckless anticommunist accusations because many of his highly publicized claims were poorly substantiated, while hearings and loyalty investigations damaged careers and raised civil-liberties concerns.",
    "apush-u8-c3-01": "All four synthetic indexes rise substantially from 1945 to 1960—suburban households, college enrollment, consumer credit, and migration—supporting the conclusion that postwar prosperity reshaped residence, education, consumption, and mobility.",
    "apush-u8-d4-02": "Brown v. Board of Education held state-sponsored public-school segregation unconstitutional under the Equal Protection Clause, rejecting the use of the separate-but-equal doctrine in public education.",
    "apush-u8-d4-04": "Televised and photographed violence against peaceful protesters in places such as Birmingham and Selma broadened national awareness of segregation and increased political pressure for federal civil-rights legislation.",
    "apush-u8-e4-03": "Vietnam fueled a large antiwar movement as rising casualties, the military draft, disputed official claims, and an expanding credibility gap deepened generational conflict and public skepticism toward government.",
    "apush-u8-e4-04": "Vietnam and Watergate were central to a wider crisis of confidence in government, encouraging skepticism toward presidential power and contributing to reforms such as renewed congressional limits on executive war-making.",
    "apush-u9-e-02": "The September 11 attacks transformed U.S. national-security policy by driving an expanded counterterrorism apparatus and the war in Afghanistan; the broader post-9/11 security environment also shaped the later 2003 Iraq intervention.",
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
      const id = `${gid}-${String(index + 1).padStart(2, "0")}`;
      window.QUESTIONS_AP_US_HISTORY.push({
        id,
        unit: def.unit,
        topic: item.topic,
        topicCode: item.topic,
        skill: String(item.skill || "1"),
        type: "s",
        q: item.q,
        o: options,
        c: [position],
        e: rationaleRepairs[id] || item.e,
        stimulusGroupId: gid,
        stimulus,
      });
    });
  }

  window.__APUSH_ADD_SET__ = addSet;
})();
