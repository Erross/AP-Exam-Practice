// AP African American Studies — student-facing explanation pass.
(() => {
  "use strict";
  const bank = window.QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES;
  if (!Array.isArray(bank) || bank.length === 0) return;

  const groups = new Map();
  bank.forEach((q) => {
    if (!groups.has(q.stimulusGroupId)) groups.set(q.stimulusGroupId, []);
    groups.get(q.stimulusGroupId).push(q);
  });

  for (const group of groups.values()) {
    group.sort((a, b) => a.sequence - b.sequence);
    const q1 = group.find((q) => q.sequence === 1);
    const q2 = group.find((q) => q.sequence === 2);
    if (!q1 || !q2) continue;

    const sourceTitle = q1.stimulus && q1.stimulus.title ? q1.stimulus.title : "the source";
    const q1Correct = q1.o[q1.c[0]];
    const q2Correct = q2.o[q2.c[0]];

    q1.e = `The strongest interpretation is: ${q1Correct} The information presented in ${sourceTitle} directly supports that reading. The other options describe different developments or make claims that the source does not establish.`;
    q2.e = `${q2Correct} is the most relevant additional evidence because it bears directly on the same historical process represented in ${sourceTitle}. Evidence about a different topic may be accurate in its own context but would not corroborate this source-based interpretation as directly.`;
  }
})();
