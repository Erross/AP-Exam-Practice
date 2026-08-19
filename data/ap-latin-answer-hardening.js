// AP Latin — answer-construction hardening.
// Adds concise, question-relevant specificity only to materially shorter distractors.
(function () {
  const bank = window.QUESTIONS_AP_LATIN || [];

  const tails = {
    '1A': [
      'in this immediate context', 'for this word in the passage', 'as used in this sentence',
      'in the speaker’s phrasing here', 'for the expression as written', 'within this passage'
    ],
    '1B': [
      'as the form functions here', 'within this clause’s syntax', 'in the construction used here',
      'with this sentence’s grammar', 'as required by the surrounding syntax', 'in this grammatical context'
    ],
    '1C': [
      'in the episode described', 'as the passage develops the scene', 'within the action narrated here',
      'in response to the same situation', 'during the sequence described', 'as presented in this passage'
    ],
    '2A': [
      'as a feature of the author’s style', 'as the passage shapes the scene', 'as part of the passage’s imagery',
      'within the author’s rhetorical presentation', 'as a stylistic effect here', 'in the passage’s literary design'
    ],
    '2B': [
      'within the passage’s Roman context', 'in the cultural setting of the episode', 'within the work’s historical setting',
      'for the social context presented here', 'within the political setting of the passage', 'in the relevant Roman context'
    ],
    '3A': [
      'as an interpretation of this passage', 'as the episode develops its larger meaning', 'within the passage’s thematic logic',
      'as the text develops this conflict', 'as an inference from the passage', 'within the author’s larger presentation'
    ],
    '3B': [
      'as textual support for that interpretation', 'as evidence from the cited passage', 'as the strongest textual support',
      'as evidence for the stated reading', 'as direct support from the Latin', 'as passage evidence for the claim'
    ]
  };

  function wordCount(text) {
    return String(text).trim().split(/\s+/).filter(Boolean).length;
  }

  bank.forEach((q, qi) => {
    const key = q.c[0];
    const correctWords = wordCount(q.o[key]);
    const choices = tails[q.skill] || tails['1C'];
    q.o = q.o.map((option, oi) => {
      if (oi === key) return option;
      const gap = correctWords - wordCount(option);
      if (gap < 3) return option;
      const tail = choices[(qi * 3 + oi) % choices.length];
      return `${String(option).replace(/[.]$/, '')}, ${tail}.`;
    });
  });
})();
