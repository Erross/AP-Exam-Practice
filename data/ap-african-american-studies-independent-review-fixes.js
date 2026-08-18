// AP African American Studies — independent clean-room semantic repair pass.
// Repairs required-source/source-question mismatches discovered in the release review
// and removes the most repetitive disciplinary-significance scaffold from the
// browser-effective bank. This layer intentionally runs last.
(() => {
  "use strict";
  const bank = window.QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES;
  if (!Array.isArray(bank) || bank.length === 0) return;

  const sourceClaims = {
    "1.4": "Aksum's coinage reflects centralized royal authority, participation in long-distance exchange, and changing religious symbolism.",
    "1.5": "The Catalan Atlas shows that Mediterranean mapmakers associated Mansa Musa and Mali with gold wealth and trans-Saharan connections.",
    "1.6": "The Sunjata performance demonstrates how specialist oral performers preserve and interpret political memory, genealogy, and values.",
    "1.7": "The Oshe Shango object provides evidence of continuity and adaptation in Yoruba religious practice across time and diaspora.",
    "1.8": "Great Zimbabwe's monumental stone architecture supports conclusions about local political organization, skilled construction, and regional exchange.",
    "1.9": "Nzinga Mbemba's letter demonstrates Kongo diplomatic agency while documenting the destabilizing consequences of Atlantic slave trading.",
    "1.10": "The Iyoba pendant mask reflects the dynastic and political significance of a queen mother within the Benin court.",
    "1.11": "Chafariz d'El-Rey documents a visible African presence in early modern Lisbon and helps establish African mobility within the Atlantic world.",
    "2.4": "The Brookes diagram communicates the extreme crowding and dehumanizing spatial logic of the Middle Passage as part of an abolitionist argument.",
    "2.5": "The Charleston auction broadside documents the public commodification and sale of enslaved people within the domestic slave trade.",
    "2.7": "The Louisiana Code Noir shows how colonial law formalized slavery by regulating status and restricting the autonomy of enslaved people.",
    "2.11": "The Florida governor's letter shows how Spanish imperial rivalry and promises of freedom shaped Black flight, resistance, and Fort Mose.",
    "2.12": "Haiti's 1805 constitutional declaration asserts Black sovereignty and a decisive break with colonial rule after revolution and emancipation.",
    "2.14": "Maria W. Stewart links Black advancement to education, collective action, and women's public leadership.",
    "2.18": "Martin Delany's argument for emigration reveals a Black political debate over citizenship, autonomy, nationhood, and belonging.",
    "2.19": "David Walker's Appeal represents a radical abolitionist argument condemning slavery and urging active Black resistance to racial oppression.",
    "2.20": "Harriet Tubman's recollection highlights self-emancipation, refusal to return to slavery, and the agency involved in escape from bondage.",
    "2.24": "General Order No. 3 records the announcement of emancipation in Texas that later became central to Juneteenth commemoration.",
    "2.17": "The Black Seminole sources show Black leadership and Black-Seminole alliance while documenting U.S. military efforts to remove Seminoles and their Black allies.",
    "2.22": "The Jacobs and Prince narratives expose gendered exploitation under slavery while also documenting Black women's agency and resistance.",
    "3.1": "The Reconstruction Amendments created a new constitutional basis for emancipation, national citizenship, equal protection, and voting rights.",
    "3.4": "Plessy v. Ferguson illustrates a late-nineteenth-century judicial retreat from Reconstruction-era protections by validating state-mandated segregation.",
    "3.5": "Ida B. Wells's A Red Record documents lynching and challenges white-supremacist rationalizations for racial terror under Jim Crow.",
    "3.6": "Claude McKay's 'If We Must Die' expresses collective dignity and resistance in response to racial violence during the Red Summer era.",
    "3.7": "W.E.B. Du Bois uses the color line and double consciousness to analyze Black identity within a society that denies full belonging.",
    "3.8": "Anna Julia Cooper argues that Black women's education and leadership are integral to the advancement of Black communities.",
    "3.11": "Alain Locke's The New Negro advances a modern Black identity centered on cultural innovation, racial pride, and self-definition.",
    "3.16": "Jacob Lawrence's Migration Series represents the Great Migration as a collective process shaped by labor, racial violence, family, and hope.",
    "3.18": "Marcus Garvey's UNIA address promotes Black nationalism, economic self-determination, racial pride, and international African solidarity.",
    "4.1": "Aimé Césaire's Discourse on Colonialism attacks colonialism as violent and dehumanizing, situating a major Négritude thinker within anticolonial Black political thought.",
    "4.3": "James G. Thompson's Double V argument exposes the contradiction between fighting fascism abroad and enduring racism at home.",
    "4.4": "Brown v. Board rejects state-mandated school segregation and demonstrates the importance of sustained legal challenges within the civil rights struggle.",
    "4.5": "The HOLC map provides evidence of racialized institutional judgments that shaped access to mortgage credit and residential opportunity.",
    "4.6": "Martin Luther King Jr.'s essay articulates nonviolent direct action as one influential strategy within a broader civil rights movement that used multiple approaches.",
    "4.9": "Malcolm X's 'The Ballot or the Bullet' links Black self-determination and self-defense to the strategic use of voting and political organization.",
    "4.11": "The Black Panther Party's Ten-Point Program states demands concerning political power, material conditions, policing, education, and justice.",
    "4.13": "The Combahee River Collective Statement develops a Black feminist politics centered on interacting racial, gender, sexual, and class oppression.",
    "4.15": "Colin Powell's Howard University address reflects the visibility of Black public leadership and debates about achievement, opportunity, and racial progress in the late twentieth century.",
    "4.21": "The Space Is the Place poster uses speculative cosmic imagery associated with Sun Ra to imagine transformation and alternative Black futures.",
  };

  const groups = new Map();
  bank.forEach((q) => {
    if (!groups.has(q.stimulusGroupId)) groups.set(q.stimulusGroupId, []);
    groups.get(q.stimulusGroupId).push(q);
  });
  for (const group of groups.values()) group.sort((a, b) => a.sequence - b.sequence);

  const requiredByUnit = {};
  for (const group of groups.values()) {
    const first = group[0];
    if (first && first.stimulus && first.stimulus.requiredSource && sourceClaims[first.topicCode]) {
      if (!requiredByUnit[first.unit]) requiredByUnit[first.unit] = [];
      requiredByUnit[first.unit].push(first.topicCode);
    }
  }

  const claimStems = [
    "Which conclusion is most directly supported by the required source as described?",
    "Which interpretation uses the required source most carefully?",
    "What does the required source most clearly contribute to the topic?",
    "Which claim can be supported most directly from this required source?",
    "Which reading best fits the evidence supplied by the required source?",
    "Which historical point is most securely grounded in the required source itself?",
  ];
  const useStems = [
    "Which use of the source would be most defensible in a broader argument?",
    "How should a historian use this source when making a broader claim?",
    "Which approach best avoids overgeneralizing from this source?",
    "Which source-analysis move would make the strongest use of this evidence?",
    "How can this source best contribute to a larger interpretation?",
    "Which method best balances the source's evidentiary value with its limitations?",
  ];

  let requiredIndex = 0;
  for (const group of groups.values()) {
    const q1 = group.find((q) => q.sequence === 1);
    const q2 = group.find((q) => q.sequence === 2);
    if (!q1 || !q2 || !q1.stimulus || !q1.stimulus.requiredSource) continue;
    const topic = q1.topicCode;
    const claim = sourceClaims[topic];
    if (!claim) throw new Error(`${topic}: independent-review required-source claim missing`);

    const peers = requiredByUnit[q1.unit].filter((t) => t !== topic);
    const distractors = [0, 1, 2].map((j) => sourceClaims[peers[(requiredIndex * 3 + j * 2) % peers.length]]);
    const pos1 = requiredIndex % 4;
    const opts1 = distractors.slice();
    opts1.splice(pos1, 0, claim);
    q1.q = claimStems[requiredIndex % claimStems.length];
    q1.o = opts1;
    q1.c = [pos1];
    q1.e = `${claim} That conclusion stays within what ${q1.stimulus.title} can support as described. The alternatives belong to different developments in the same unit and would require different evidence.`;
    q1.skill = q1.skill === "1.D" ? "2.A" : q1.skill;

    const careful = `Use it as evidence that ${claim.charAt(0).toLowerCase()}${claim.slice(1)} Then corroborate any broader claim about the whole topic with additional sources.`;
    const useDistractorPools = [
      [
        "Treat it as sufficient proof of how all Black communities experienced the development across the entire period.",
        "Ignore creator, purpose, and context because a required source can be read as neutral evidence.",
        "Use it to establish developments that the source does not describe, so long as those developments occur in the same course topic.",
      ],
      [
        "Generalize from this single source to every region and group represented in the unit without checking other evidence.",
        "Assume that being contemporaneous makes the source complete and eliminates the need for corroboration.",
        "Treat the source as direct evidence for later consequences that it does not itself document.",
      ],
      [
        "Use the source mainly to confirm the topic label rather than evaluating the specific evidence it contains.",
        "Assume the source captures the full range of perspectives because it is included in the course framework.",
        "Infer the frequency of a historical experience from this source alone even when it provides no representative sample.",
      ],
    ];
    const pool = useDistractorPools[requiredIndex % useDistractorPools.length];
    const pos2 = (requiredIndex * 3 + 1) % 4;
    const opts2 = pool.slice();
    opts2.splice(pos2, 0, careful);
    q2.q = useStems[requiredIndex % useStems.length];
    q2.o = opts2;
    q2.c = [pos2];
    q2.e = `The source is strongest when used for the specific evidence it actually supplies: ${claim} Broader conclusions require corroboration, comparison, and attention to creator, audience, purpose, and context.`;
    q2.skill = "2.C";

    requiredIndex++;
  }

  // Replace the highly repetitive third-question scaffold with varied, source-aware
  // analytical tasks. Quantitative and visual sets already received dedicated
  // source-analysis rewrites in their later overlays and are left intact.
  const analysisStems = [
    "Which next step would most strengthen an interpretation built from this source?",
    "Which comparison would add the most useful context for interpreting this source?",
    "Which question would best test the limits of the source's evidence?",
    "Which additional perspective would most improve the analysis of this source?",
    "Which method would best connect this source to change over time?",
    "Which approach would best distinguish what the source shows from what must be inferred?",
    "Which kind of corroboration would most strengthen a claim based on this source?",
    "Which analytical move would best place this source within a broader African American Studies argument?",
    "Which comparison would best reveal both continuity and change related to this source?",
    "Which evidence would most help evaluate whether the pattern in this source extended beyond its immediate setting?",
    "Which question most effectively connects source analysis with the course's interdisciplinary approach?",
    "Which follow-up inquiry would make the interpretation of this source more historically precise?",
  ];
  const unitContext = {
    U1: "evidence from another African region or period that can test patterns of movement, exchange, institutions, cultural continuity, and change",
    U2: "evidence from another community or source type that can test claims about slavery, freedom, resistance, law, family, culture, and political thought",
    U3: "evidence from another place, institution, or source type that can test claims about citizenship, racial violence, migration, culture, and the practice of freedom",
    U4: "evidence from another movement, community, or source type that can test claims about political strategy, culture, gender, representation, and self-determination",
  };
  const genericDistractorSets = [
    [
      "Rely on the source alone and treat its immediate setting as representative of the entire unit.",
      "Prefer a source from a different topic even if it has no connection to the claim being evaluated.",
      "Remove the source from its historical context so only its most general language remains.",
    ],
    [
      "Assume that one creator's perspective can stand in for all participants in the development.",
      "Use chronology by itself as proof of causation without evidence connecting the events.",
      "Treat a later interpretation as a substitute for evidence from the period under study.",
    ],
    [
      "Choose corroboration mainly because it agrees with the source rather than because it provides independent relevant evidence.",
      "Infer a population-wide pattern from a source that offers no representative sample.",
      "Treat disagreement among sources as a reason to discard them rather than analyze perspective and context.",
    ],
    [
      "Focus on whether the source is memorable rather than on what evidence it supplies and what it leaves unresolved.",
      "Assume the topic has one cause operating identically across places and periods.",
      "Project present-day meanings backward without examining the historical context of the source.",
    ],
  ];

  let groupIndex = 0;
  for (const group of groups.values()) {
    const q3 = group.find((q) => q.sequence === 3);
    const first = group[0];
    if (!q3 || !first || !first.stimulus || ["quantitative", "visual"].includes(first.stimulus.type)) {
      groupIndex++;
      continue;
    }
    const correct = `Compare it with ${unitContext[first.unit]} rather than treating one source as sufficient for the broader claim.`;
    const distractors = genericDistractorSets[groupIndex % genericDistractorSets.length].slice();
    const pos = (groupIndex * 5 + 2) % 4;
    distractors.splice(pos, 0, correct);
    q3.q = analysisStems[groupIndex % analysisStems.length];
    q3.o = distractors;
    q3.c = [pos];
    q3.e = `African American Studies builds interpretations by connecting specific evidence to context, comparison, and corroboration. For ${first.stimulus.title}, the strongest next step is to test the source against relevant evidence beyond its immediate setting rather than generalizing from it or stripping away perspective and context.`;
    q3.skill = "3.C";
    groupIndex++;
  }

  // The Brookes overlay replaced a synthetic ship-log scenario. Its inherited
  // fourth question therefore no longer matched the browser-effective stimulus.
  const brookes = bank.find((q) => q.topicCode === "2.4" && q.sequence === 4);
  if (brookes) {
    const correct = "Its layout was designed for an abolitionist audience, so it should be analyzed both as evidence about crowding and as a persuasive representation shaped by reform purposes.";
    const options = [
      "Because diagrams are visual, creator, purpose, and audience matter less than they do for written sources.",
      correct,
      "The diagram can establish how every slave ship was arranged because it depicts one well-known vessel.",
      "Its abolitionist use makes the diagram unsuitable as evidence about the material conditions it represents.",
    ];
    brookes.q = "Why does the abolitionist context of the Brookes diagram matter when interpreting it?";
    brookes.o = options;
    brookes.c = [1];
    brookes.e = "The Brookes diagram is useful evidence and also a persuasive abolitionist representation. A strong analysis considers what the image communicates about crowding while also evaluating how its reform purpose, selection, and presentation shaped the visual argument.";
    brookes.skill = "2.C";
  }

  // Two inherited fourth questions also overreached beyond their final required
  // sources; keep them source-grounded after the late-layer conversions.
  const oshe = bank.find((q) => q.topicCode === "1.7" && q.sequence === 4);
  if (oshe) {
    const correct = "Compare the object with evidence of Yoruba religious practice in another time or diasporic setting to distinguish continuity from later adaptation or syncretism.";
    oshe.q = "Which comparison would best use the Oshe Shango object to study continuity and religious change?";
    oshe.o = [
      "Treat the object's association with Shango as proof that Yoruba religious practices never changed across time or place.",
      "Compare it only with unrelated European devotional objects because outside influence is the main explanation for religious change.",
      correct,
      "Use the object to infer how frequently every Yoruba religious practice occurred without other evidence.",
    ];
    oshe.c = [2];
    oshe.e = "The object can document a religious tradition, but continuity and syncretic change are comparative claims. Evidence from another period or diasporic setting is needed to show what persisted, what changed, and how introduced traditions interacted with Yoruba cosmologies.";
    oshe.skill = "3.C";
  }

  const lisbon = bank.find((q) => q.topicCode === "1.11" && q.sequence === 4);
  if (lisbon) {
    const correct = "It establishes African presence and mobility in an Atlantic city, while other records would be needed to identify the specific occupations, legal statuses, and networks of the people depicted.";
    lisbon.q = "Which conclusion uses Chafariz d'El-Rey without claiming more than the image can show?";
    lisbon.o = [
      "The image proves that the Africans depicted were primarily merchants, diplomats, sailors, and scholars.",
      correct,
      "The image shows that African mobility in the early Atlantic world was mostly voluntary and unrelated to coercion.",
      "The image demonstrates that Africans in Lisbon shared the same legal status and social position.",
    ];
    lisbon.c = [1];
    lisbon.e = "The image can support a claim about African presence and mobility, but it cannot by itself establish the occupations, legal status, or life histories of each figure. Those conclusions require corroborating records.";
    lisbon.skill = "2.C";
  }
})();
