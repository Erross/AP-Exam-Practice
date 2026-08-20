// AP Latin — answer-construction curation.
//
// Clean-room review found that many keyed answers were unnecessarily verbose
// relative to otherwise plausible distractors. These edits tighten the keyed
// answer itself while preserving its exact meaning. No generic tails, padding,
// or answer-position logic is used.
(function () {
  const bank = window.QUESTIONS_AP_LATIN || [];
  const conciseKeys = {
    'aplatin-long-aen6-10': 'Dido returns to Sychaeus; Aeneas follows grieving.',
    'aplatin-disc-23-01': 'Fate calls him to Italy, not choice.',
    'aplatin-long-aen4-04': 'Even Troy would scarcely justify such sailing.',
    'aplatin-disc-27-01': 'Let the Trojans remain in Latium.',
    'aplatin-sylshort-08-01': 'He hurls the fatal spear.',
    'aplatin-sight-03-01': 'Ground shook; cups fell.',
    'aplatin-long-aen2-07': 'the fatal wooden horse',
    'aplatin-long-aen4-05': "It turns the dispute into Dido's personal abandonment.",
    'aplatin-long-pliny-ghost-05': 'Danger makes Athenodorus more eager to rent it.',
    'aplatin-long-pliny-vesuvius-04': "distant observers cannot identify the cloud's mountain",
    'aplatin-long-aen1-08': 'Juno favors it even above Samos.',
    'aplatin-disc-18b-01': 'perfect deponent, active in meaning',
    'aplatin-long-aen6-01': 'Among shades in the underworld',
    'aplatin-long-aen1-10': "It links future Rome with Juno's Trojan War memory.",
    'aplatin-long-aen2-06': 'The Trojans open their defenses for the horse.',
    'aplatin-disc-19-01': 'Why a pious man suffered so greatly',
    'aplatin-long-aen1-05': 'Why a pious man endured such hardships',
    'aplatin-long-aen4-02': 'It piles up bonds restraining Aeneas.',
    'aplatin-long-pliny-ghost-08': 'He keeps writing briefly before following it.',
    'aplatin-disc-09b-01': 'a factual concessive clause',
    'aplatin-long-aen2-05': "Bring it to Minerva's shrine",
    'aplatin-long-aen6-09': 'solo fixos oculos aversa tenebat',
    'aplatin-long-pliny-vesuvius-07': 'Rectina sends an urgent rescue request.',
    'aplatin-sylshort-01-01': 'An unusually large and strange cloud.',
    'aplatin-disc-06b-01': 'means for covering their heads',
    'aplatin-disc-23b-01': 'accusative subject of the infinitive',
    'aplatin-long-aen2-02': "Beneath Minerva's feet and shield",
    'aplatin-sight-07-02': 'Merit matters more than ancestry.',
    'aplatin-disc-14b-01': 'recipient of data erat',
    'aplatin-sight-02-03': 'ablative of respect',
    'aplatin-disc-20b-01': 'perfect-indicative temporal clause',
    'aplatin-long-pliny-vesuvius-10': "Antithesis contrasts his courageous approach with others' flight.",
    'aplatin-long-aen1-09': 'progeniem ... Tyrias olim quae verteret arces',
    'aplatin-long-aen2-08': 'It ominously makes the horse pregnant with weapons.',
    'aplatin-long-aen6-07': "could not believe his departure caused Dido's pain",
    'aplatin-long-pliny-vesuvius-03': 'Its trunklike rise spreads outward like branches.',
    'aplatin-sylshort-03-01': 'Whether ghosts exist or human fear invents them',
    'aplatin-disc-11-01': 'To mark where they should dig tomorrow',
    'aplatin-long-aen2-04': "It reflects the Trojans' reported reasoning.",
    'aplatin-long-aen4-01': 'Aeneas plans to leave secretly.',
    'aplatin-sylshort-04-03': 'a vivid compressed sequence of nighttime sounds',
    'aplatin-disc-01b-01': "prior action before the merchant's departure",
    'aplatin-long-pliny-ghost-02': 'Iron and chains sounding at night',
    'aplatin-sylshort-07-01': 'Hide his plan and leave silently',
    'aplatin-disc-08b-01': 'adjective agreeing with ablative luce',
    'aplatin-disc-10-01': 'Nighttime chains begin to sound.',
    'aplatin-disc-22b-01': 'dative recipient of nuntiat',
    'aplatin-sylshort-02-03': 'future participle expressing intent',
    'aplatin-long-pliny-vesuvius-08': 'A scholarly inquiry becomes an act of courage.',
    'aplatin-sight-07-03': "it is daret's indirect object in the indirect question",
    'aplatin-long-aen4-03': "To stress the danger of Aeneas' winter voyage",
    'aplatin-long-aen4-07': 'Miserere governs the genitive of what is pitied.',
    'aplatin-disc-04b-01': 'Prior action in a circumstantial cum clause',
    'aplatin-disc-17-01': 'To prevent wandering in the dark forest',
    'aplatin-long-aen4-06': 'Her tears and their claimed union',
    'aplatin-sight-05-01': 'She reads his books and memorized passages.',
    'aplatin-sight-03-03': 'partitive genitive after a quantity word',
    'aplatin-sylshort-06-02': 'A new fear shakes everyone.',
    'aplatin-disc-02b-01': 'accusative subject of indirect statement',
    'aplatin-disc-12-01': 'Why the citizens left quickly',
    'aplatin-disc-16-01': 'Risking himself to save home',
    'aplatin-disc-25b-01': "Turnus's dative of disadvantage",
    'aplatin-disc-27b-01': 'ut introducing an indirect command',
    'aplatin-sight-04-03': 'imperfect subjunctive in future-less-vivid condition',
    'aplatin-disc-10b-01': 'genitive dependent on sonitum',
    'aplatin-disc-19b-01': 'genitives dependent on labores',
    'aplatin-disc-29b-01': 'secondary-sequence purpose clause',
    'aplatin-disc-13b-01': 'dative with desum',
    'aplatin-sylshort-07-03': 'faithless'
  };

  const byId = new Map(bank.map((q) => [q.id, q]));
  Object.entries(conciseKeys).forEach(([id, answer]) => {
    const q = byId.get(id);
    if (!q) throw new Error(`AP Latin answer-curation target missing: ${id}`);
    q.o[q.c[0]] = answer;
  });
})();
