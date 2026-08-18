// AP African American Studies — clean-room answer-construction balance repair.
// First rebuild required-source q2 options as parallel source-specific competitors.
// Then concisely restate selected keyed claims that remained uniquely longest.
(() => {
  "use strict";
  const bank = window.QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES;
  if (!Array.isArray(bank) || bank.length === 0) return;

  const requiredQ1 = bank.filter((q) => q.sequence === 1 && q.stimulus && q.stimulus.requiredSource);
  if (requiredQ1.length !== 39) throw new Error(`source-use balance expected 39 required groups, found ${requiredQ1.length}`);

  const wrongTails = [
    "Treat that as the source's main contribution and extend it to the wider topic without first checking independent corroborating evidence.",
    "Use that interpretation to infer developments outside the source's time or setting even when those later outcomes are not documented here.",
    "Give that interpretation priority because the source is required while treating creator, audience, purpose, and historical context as secondary concerns.",
  ];

  requiredQ1.forEach((q1, groupIndex) => {
    const q2 = bank.find((q) => q.stimulusGroupId === q1.stimulusGroupId && q.sequence === 2);
    if (!q2) throw new Error(`${q1.topicCode}: source-use balance missing q2`);
    const keyedClaimIndex = q1.c[0];
    const options = q1.o.map((claim, optionIndex) => {
      if (optionIndex === keyedClaimIndex) {
        return `${claim} Use the source for that specific point, then corroborate broader claims with relevant independent evidence.`;
      }
      return `${claim} ${wrongTails[(optionIndex + groupIndex) % wrongTails.length]}`;
    });
    q2.q = "Which use of this required source is most defensible when building a broader historical argument?";
    q2.o = options;
    q2.c = [keyedClaimIndex];
    q2.e = `${q1.o[keyedClaimIndex]} The source can support that specific conclusion, but a broader historical argument should also test it against independent evidence and attend to creator, audience, purpose, and context.`;
    q2.skill = "2.C";
  });

  const conciseKeys = {
    "apaas-1-1-3": "Combine historical, cultural, and social-science evidence to explain changes in Black identities and institutions.",
    "apaas-2-3-3": "The trade intensified conflict and displacement in some regions, with effects varying across places and periods.",
    "apaas-2-6-3": "Enslaved people generated wealth under coercion while also sustaining skills, relationships, and cultural practices.",
    "apaas-2-8-3": "A law tying a child's legal status to maternal status and assigning rights by ancestry.",
    "apaas-2-13-3": "Records of escape, work slowdowns, covert communication, family preservation, and everyday refusal alongside revolt.",
    "apaas-2-23-3": "Black flight to Union lines, military service, labor, and community action pushed the war toward emancipation.",
    "apaas-3-3-3": "Labor contracts, Black Codes, and land petitions showing legal freedom alongside contested mobility, bargaining power, and land access.",
    "apaas-4-2-3": "U.S. racial inequality and anticolonial struggles were linked through debates over self-determination, citizenship, and global power.",
    "apaas-4-6-3": "The civil rights movement combined nonviolent protest with litigation, electoral organizing, labor activism, self-defense, and community institution building.",
    "apaas-4-7-3": "Black women's civil-rights leadership often depended on grassroots organizing, strategy, communication, fundraising, and voter work beyond formal titles.",
    "apaas-4-9-3": "Mid-1960s Black politics increasingly debated self-determination, community control, voting power, self-defense, and the limits of integration.",
    "apaas-4-15-3": "Black public leadership expanded across major institutions while debates continued over representation, opportunity, structural inequality, and racial progress.",
  };

  for (const [id, replacement] of Object.entries(conciseKeys)) {
    const q = bank.find((item) => item.id === id);
    if (!q) throw new Error(`${id}: answer-length repair could not find question`);
    const key = q.c[0];
    const options = q.o.slice();
    options[key] = replacement;
    q.o = options;
  }
})();
