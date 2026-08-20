// AP Latin — exact revised-framework skill tags and targeted evidence-analysis repairs.
(function () {
  const bank = window.QUESTIONS_AP_LATIN || [];

  function inferSkill(q) {
    const stem = String(q.q || '').toLowerCase();
    if (/which (detail|phrase|evidence)|best supports|supports the interpretation/.test(stem)) return '3B';
    if (/effect|rhetorical|simile|anaphora|antithesis|characteriz|foreshadow|tension|larger conflict|significant|theme|motive|why does the poet|how does .* deepen/.test(stem)) return '3A';
    if (/historical|cultural|roman development|public reputation|political|social losses/.test(stem)) return '2B';
    if (/style|stylistic|literary effect|comparison|metaphor|imagery|repeated|repetition/.test(stem)) return '2A';
    if (/form |subjunctive|genitive|dative|ablative|agrees|infinitive|participle|pronoun|subject of|clause |grammar|why is .* used|why is .* subjunctive/.test(stem)) return '1B';
    if (/most nearly mean|most nearly means|word .* means|phrase .* means|vocative .* characterizes/.test(stem)) return '1A';
    return '1C';
  }

  bank.forEach((q) => { q.skill = inferSkill(q); });

  const repairs = {
    'aplatin-long-aen1-09': {
      skill:'3B',
      q:'Which detail best supports the interpretation that Juno fears the future political power of Trojan descendants?',
      o:[
        'progeniem ... Troiano a sanguine ... Tyrias olim quae verteret arces',
        'Troiae qui primus ab oris Italiam ... venit',
        'Musa, mihi causas memora',
        'multum ille et terris iactatus et alto'
      ], c:[0],
      e:'The prophecy of a progeny from Trojan blood that will one day overturn the Tyrian citadels directly supports the interpretation that Juno fears a future geopolitical threat to Carthage.'
    },
    'aplatin-long-pliny-ghost-10': {
      skill:'3B',
      q:'Which evidence most directly supports the interpretation that proper burial resolves the haunting?',
      o:[
        'collecta publice sepeliuntur ... Domus postea rite conditis manibus caruit',
        'legit titulum auditoque pretio',
        'poscit pugillares stilum lumen',
        'silentium noctis; dein concuti ferrum'
      ], c:[0],
      e:'Pliny explicitly places the public burial of the chained bones immediately before the statement that the house thereafter lacked the spirit, making that sequence the strongest evidence for the causal interpretation.'
    },
    'aplatin-long-aen4-09': {
      skill:'3B',
      q:'Which repeated phrase most directly supports the interpretation that Dido blames her relationship with Aeneas for her political and social losses?',
      o:['te propter','per conubia nostra','Mene fugis?','hiberno ... sidere'], c:[0],
      e:'The repeated te propter, “because of you,” directly links Aeneas to the hostility of neighboring peoples, Tyrian resentment, and Dido’s loss of pudor and former fama.'
    },
    'aplatin-long-aen4-10': {
      skill:'2B',
      q:'In its Roman social context, Dido’s concern with pudor and fama most directly reflects which cultural expectation?',
      o:[
        'Public reputation and recognized moral standing were important components of elite social identity.',
        'Private emotion was expected to remain completely separate from a ruler’s public reputation.',
        'Military command automatically erased concerns about personal reputation for aristocratic leaders.',
        'Marriage customs made public standing irrelevant once a political leader entered a personal relationship.'
      ], c:[0],
      e:'Roman elite identity placed substantial weight on publicly recognized standing and reputation. Dido’s language of lost pudor and former fama therefore carries social and political force beyond private heartbreak.'
    },
    'aplatin-long-aen6-09': {
      skill:'3B',
      q:'Which evidence most strongly supports the interpretation that Dido refuses emotional engagement with Aeneas?',
      o:[
        'solo fixos oculos aversa tenebat ... quam si dura silex',
        'demisit lacrimas dulcique adfatus amore est',
        'Per sidera iuro, per superos',
        'nec credere quivi'
      ], c:[0],
      e:'Her averted posture, fixed eyes, and comparison to hard stone directly show that she remains emotionally unmoved despite Aeneas’ appeal.'
    }
  };

  const byId = new Map(bank.map((q) => [q.id, q]));
  Object.entries(repairs).forEach(([id, patch]) => {
    const q = byId.get(id);
    if (!q) throw new Error(`AP Latin skill repair target missing: ${id}`);
    Object.assign(q, patch);
  });
})();
