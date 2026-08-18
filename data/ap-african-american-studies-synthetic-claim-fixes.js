// AP African American Studies — independent-review synthetic claim-cue repair.
// The generated base bank originally keyed the source's thesis sentence nearly
// verbatim in q1. This final overlay replaces those keyed answers with genuine
// paraphrases for every remaining synthetic text source group.
(() => {
  "use strict";
  const bank = window.QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES;
  if (!Array.isArray(bank) || bank.length === 0) return;

  const paraphrases = {
    "1.1": "The field draws on multiple disciplines to analyze Black life, culture, institutions, identity, and power rather than relying on a single method.",
    "2.1": "African participation in early American exploration and colonial encounters included varied roles that predated the later dominance of plantation slavery in many colonies.",
    "2.3": "The Atlantic trade in captives intensified conflict and population disruption in some West African regions, although its effects differed across societies and periods.",
    "2.6": "Enslaved people produced substantial economic value in many kinds of labor while simultaneously sustaining skills, communities, and cultural practices under coercion.",
    "2.8": "Racial hierarchy became durable partly because colonial and U.S. institutions made ancestry legally consequential and reproduced status across generations.",
    "2.9": "African American cultural traditions emerged through continuity, exchange, adaptation, and new creation rather than through either perfect preservation or total cultural loss.",
    "2.10": "Changes in collective naming reveal shifting Black debates about ancestry, citizenship, dignity, political strategy, and belonging.",
    "2.13": "Opposition to slavery ranged from everyday refusal and escape to conspiracy and revolt, demonstrating that enslaved people did not simply accept bondage.",
    "2.15": "Maroon communities created varying degrees of autonomy through difficult terrain, local knowledge, collective defense, and organized community life beyond direct slaveholder control.",
    "2.16": "Brazil and the United States shared Atlantic systems of slavery but developed important differences in law, demography, manumission, racial classification, and emancipation.",
    "2.23": "Black self-emancipation, military service, labor, intelligence, and political pressure made African Americans active participants in turning Civil War into a struggle over emancipation.",
    "3.3": "Formal freedom after the Civil War did not automatically deliver economic independence because Black Codes, labor arrangements, and unequal land access constrained freedpeople's choices.",
    "3.9": "Black-led institutions under segregation supplied community resources while also creating networks, leadership, information, and organizational power for collective action.",
    "3.10": "HBCUs and Black Greek-letter organizations expanded education and professional opportunity while building durable networks for service, leadership, and institution building.",
    "3.13": "Harlem Renaissance writers used Africa in multiple ways—including ancestry, symbolism, political connection, imagined homeland, and modern subject—rather than with one fixed meaning.",
    "3.14": "Black performers and creators reshaped American entertainment even as segregation, stereotype, commercial pressure, and unequal control constrained their opportunities.",
    "3.15": "Black scholars and educators institutionalized Black history through curricula, archives, organizations, and scholarship that challenged its marginalization in mainstream education.",
    "3.17": "Afro-Caribbean migration broadened U.S. Black communities through new national, linguistic, political, and cultural experiences while reinforcing diasporic connections.",
    "4.2": "Black internationalist thinkers linked anticolonial struggles abroad with U.S. racial inequality and used those connections to frame broader arguments about freedom and self-determination.",
    "4.7": "Black women's leadership in the civil rights movement often operated through essential grassroots work and strategic organizing that formal titles alone do not capture.",
    "4.8": "Music and art could advance freedom struggles by articulating political claims, sustaining collective identity, and changing how Black life and protest were represented.",
    "4.10": "The Black Arts Movement treated cultural production and Black-controlled artistic institutions as parts of a wider politics of self-determination.",
    "4.14": "Interlocking-systems analysis explains inequality by examining how institutions and social positions interact instead of reducing outcomes to one category of discrimination.",
    "4.17": "African American music developed through recurring continuities and repeated innovation shaped by migration, technology, commerce, performance, and politics.",
    "4.18": "Black creators and performers expanded representation in mass culture while continuing to contest stereotypes and unequal access to authorship, production, and ownership.",
    "4.19": "Sport has provided Black athletes with opportunity and public influence while also exposing conflicts over segregation, labor, representation, protest, and commercial power.",
    "4.20": "Black scientific and medical achievement developed alongside persistent institutional exclusion and unequal health systems, making contribution and structural barriers part of the same history.",
  };

  let i = 0;
  for (const [topic, correct] of Object.entries(paraphrases)) {
    const group = bank.filter((q) => q.topicCode === topic).sort((a, b) => a.sequence - b.sequence);
    const q1 = group.find((q) => q.sequence === 1);
    if (!q1 || !q1.stimulus || q1.stimulus.requiredSource || q1.stimulus.type !== "text") {
      throw new Error(`${topic}: synthetic claim repair found unexpected final source`);
    }
    const peerGroups = bank.filter((q) => q.sequence === 1 && q.unit === q1.unit && q.topicCode !== topic && q.stimulus && !q.stimulus.requiredSource && q.stimulus.type === "text");
    const peerAnswers = peerGroups.map((q) => paraphrases[q.topicCode]).filter(Boolean);
    if (peerAnswers.length < 3) throw new Error(`${topic}: insufficient peer paraphrases`);
    const distractors = [0, 1, 2].map((j) => peerAnswers[(i * 2 + j * 3) % peerAnswers.length]);
    const pos = (i * 5 + 1) % 4;
    const options = distractors.slice();
    options.splice(pos, 0, correct);
    q1.q = [
      "Which paraphrase best captures the historical argument made by the source?",
      "Which interpretation most accurately restates the source's central historical claim?",
      "Which conclusion best expresses the source's argument without simply repeating its wording?",
      "Which statement most accurately summarizes the source's historical interpretation?",
      "Which paraphrase preserves the source's main claim while avoiding overstatement?",
      "Which interpretation most closely matches the argument advanced in the source?",
    ][i % 6];
    q1.o = options;
    q1.c = [pos];
    q1.e = `${correct} This paraphrases the source's argument while preserving its scope and qualifications. The other choices describe different developments from the same unit rather than the claim made by this source.`;
    q1.skill = "2.A";
    i++;
  }
})();
