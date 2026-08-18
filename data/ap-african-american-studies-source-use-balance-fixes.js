// AP African American Studies — clean-room required-source option-balance repair.
// Late required-source q2 rewrites had a long keyed source-use answer against
// shorter generic distractors. Rebuild those options from the already-reviewed
// source claims so all four choices are parallel, source-specific competitors.
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
})();
