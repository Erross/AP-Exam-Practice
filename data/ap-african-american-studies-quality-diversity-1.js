// AP African American Studies — first anti-template quality pass.
// Reworks repeated scaffold wording without changing topic coverage or source
// identities. Consolidate into the canonical bank before release.
(() => {
  "use strict";
  const bank = window.QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES;
  if (!Array.isArray(bank) || bank.length === 0) return;

  const groups = new Map();
  bank.forEach((q) => {
    if (!groups.has(q.stimulusGroupId)) groups.set(q.stimulusGroupId, []);
    groups.get(q.stimulusGroupId).push(q);
  });

  const claimStems = [
    "Which interpretation most accurately captures the source's main historical point?",
    "Which statement best explains what the source contributes to understanding this topic?",
    "Which conclusion about the topic is most directly supported by the source?",
    "Which course concept is most clearly illustrated by the source?",
    "Which statement most accurately connects the source to the development under study?",
    "Which interpretation would be most defensible using the source as evidence?",
  ];
  const evidenceStems = [
    "Which additional evidence would most directly strengthen the interpretation above?",
    "Which piece of evidence would provide the strongest corroboration for the source-based claim?",
    "Which additional source would be most useful for testing the interpretation supported by this source?",
    "Which evidence would most directly extend the source's contribution to this topic?",
    "Which additional evidence is most relevant to evaluating the historical pattern represented here?",
    "Which evidence would best support the same line of reasoning as the source?",
  ];

  const unitFrames = {
    U1: [
      "It helps replace a static or isolated picture of Africa with analysis of African institutions, exchange, cultural development, and global connections before and during the early diaspora.",
      "It shows why African American Studies treats early African history as foundational to understanding later diasporic identities and cultural continuities.",
      "It connects evidence from Africa to broader questions about political authority, knowledge, religion, trade, mobility, and the formation of diasporic communities.",
    ],
    U2: [
      "It places enslavement within a history that also includes African and African American agency, resistance, institution building, family, culture, and political thought.",
      "It helps explain how racial slavery was built through law, commerce, and violence while Black people continually contested bondage and defined freedom for themselves.",
      "It connects a specific source to the wider Atlantic and U.S. processes through which slavery, resistance, abolition, and Black political ideas developed together.",
    ],
    U3: [
      "It shows that emancipation was a beginning rather than an endpoint, requiring African Americans to build institutions and defend political, economic, cultural, and social visions of freedom.",
      "It connects the source to the struggle over what citizenship and freedom would mean after slavery amid both Black institution building and organized white resistance.",
      "It demonstrates how African American Studies analyzes law, migration, culture, organizations, violence, and intellectual life together when studying post-emancipation freedom.",
    ],
    U4: [
      "It connects modern Black freedom struggles to cultural production, political strategy, diaspora, gender, economics, representation, science, and debates over Black identity and futures.",
      "It demonstrates that twentieth- and twenty-first-century Black politics and culture developed through multiple strategies and institutions rather than one unified movement or ideology.",
      "It places the source within continuing debates over equality, self-determination, representation, cultural power, and the meaning of freedom in contemporary Black communities.",
    ],
  };

  let groupIndex = 0;
  for (const group of groups.values()) {
    group.sort((a, b) => a.sequence - b.sequence);
    const q1 = group.find((q) => q.sequence === 1);
    const q2 = group.find((q) => q.sequence === 2);
    const q3 = group.find((q) => q.sequence === 3);
    if (!q1 || !q2 || !q3) continue;

    q1.q = claimStems[groupIndex % claimStems.length];
    q2.q = evidenceStems[(groupIndex * 5 + 1) % evidenceStems.length];

    const title = q1.stimulus && q1.stimulus.title ? q1.stimulus.title : `CED Topic ${q1.topicCode}`;
    const frames = unitFrames[q1.unit] || unitFrames.U4;
    const correct = `${title} matters to African American Studies because ${frames[groupIndex % frames.length].replace(/^It /, "it ")}`;
    const distractors = [
      `The main disciplinary value of ${title} is that one source can stand in for the experiences of all Black communities across different places and periods.`,
      `${title} is most useful when interpreted without reference to its creator, historical context, audience, or relationship to other evidence.`,
      `The source makes broader African American Studies analysis unnecessary because its meaning can be reduced to a single isolated fact about this topic.`,
    ];
    const pos = (groupIndex * 3 + 2) % 4;
    const options = distractors.slice();
    options.splice(pos, 0, correct);
    q3.q = [
      "Why is this source or development significant within the interdisciplinary field of African American Studies?",
      "Which explanation best connects this source to the broader work of African American Studies?",
      "How does this source most usefully contribute to an African American Studies analysis?",
      "Which statement best explains the disciplinary significance of this source?",
    ][groupIndex % 4];
    q3.o = options;
    q3.c = [pos];
    q3.e = `The source is significant because it connects the specific evidence in ${title} to broader analysis of Black history, culture, institutions, identity, power, and change. The distractors misuse one source as universally representative, strip it of context, or reduce interdisciplinary analysis to an isolated fact.`;

    groupIndex++;
  }
})();
