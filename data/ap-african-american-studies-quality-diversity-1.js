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
      "it links evidence about African institutions, exchange, culture, and mobility to the formation of diasporic identities and communities.",
      "it places early African history at the foundation of later questions about diaspora, cultural continuity, political authority, and exchange.",
      "it connects a specific African setting to broader analysis of knowledge, religion, trade, movement, and the making of diasporic communities.",
    ],
    U2: [
      "it places enslavement alongside African and African American agency, resistance, family, institution building, culture, and political thought.",
      "it connects the construction of racial slavery through law, commerce, and violence to Black efforts to resist bondage and define freedom.",
      "it links a specific source to wider Atlantic and U.S. developments in slavery, resistance, abolition, and Black political ideas.",
    ],
    U3: [
      "it shows how emancipation opened continuing struggles over citizenship, institutions, economic opportunity, culture, and the practical meaning of freedom.",
      "it connects post-emancipation evidence to contests over citizenship and freedom amid Black institution building and organized white resistance.",
      "it links law, migration, culture, organizations, violence, and intellectual life in analyzing how African Americans practiced freedom after slavery.",
    ],
    U4: [
      "it links modern Black freedom struggles to political strategy, cultural production, diaspora, gender, economics, representation, and debates over identity.",
      "it situates modern Black politics and culture among multiple strategies, institutions, and intellectual traditions rather than one unified approach.",
      "it connects the source to continuing debates over equality, self-determination, representation, cultural power, and the meaning of freedom.",
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
    const correct = `${title} matters to African American Studies because ${frames[groupIndex % frames.length]}`;
    const distractors = [
      `${title} is most useful as a self-contained illustration of the topic, with its immediate content taking priority over creator, audience, and context.`,
      `${title} chiefly helps confirm a broad chronology of the period, while comparison across institutions, identities, and forms of power is secondary.`,
      `${title} mainly documents one historical setting, so its strongest use is descriptive rather than connecting evidence across themes, communities, or periods.`,
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
    q3.e = `The stronger interpretation connects the specific evidence in ${title} to broader analysis of Black history, culture, institutions, identity, power, and change. The alternatives narrow the source to description or chronology instead of using context and comparison to build an interdisciplinary interpretation.`;

    groupIndex++;
  }
})();
