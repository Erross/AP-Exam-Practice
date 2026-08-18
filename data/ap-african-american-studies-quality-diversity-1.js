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

  // Keep the disciplinary-significance key substantive but concise. Each option
  // repeats the source title, so the discriminating language is comparable in
  // length rather than making the nuanced answer visibly longest.
  const unitFrames = {
    U1: [
      "broader patterns of African movement, exchange, institutions, cultural change, and diaspora.",
      "broader questions of diaspora, cultural continuity, political authority, and exchange.",
      "broader patterns of knowledge, religion, trade, movement, and diaspora in a specific African setting.",
    ],
    U2: [
      "broader patterns of Black agency, resistance, family life, institutions, culture, and political thought under enslavement.",
      "broader struggles over racial slavery, law, violence, resistance, bondage, and freedom.",
      "broader Atlantic patterns of slavery, resistance, abolition, and Black political thought.",
    ],
    U3: [
      "broader struggles over citizenship, institutions, economic opportunity, culture, and the practice of freedom after emancipation.",
      "broader contests over post-emancipation citizenship, institution building, racial violence, and freedom.",
      "broader analysis of law, migration, culture, organizations, violence, and how African Americans practiced freedom.",
    ],
    U4: [
      "broader debates over modern Black political strategy, culture, diaspora, gender, and representation.",
      "broader differences in modern Black political strategy, institutions, culture, and intellectual traditions.",
      "broader debates over equality, self-determination, representation, cultural power, and freedom.",
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
    const correct = `${title} connects the evidence to ${frames[groupIndex % frames.length]}`;
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
