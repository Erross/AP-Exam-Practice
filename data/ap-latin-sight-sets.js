// AP Latin — original short sight-reading sets. Each set has exactly 3 questions.
(function () {
  const build = window.AP_LATIN_BUILD;
  if (!build) throw new Error("AP Latin base layer must load before sight sets");

  const sets = [
    {
      id:"aplatin-sight-01", unit:"U1", topic:"1.1", setType:"short-sight", seed:3,
      source:"Original AP-style sight Latin composed for this practice bank.",
      text:"Postquam legati ad oppidum venerunt, portas clausas invenerunt. Custodes responderunt se iussu magistratus neminem ante lucem admissuros esse. Legati igitur extra muros manserunt, quamquam imber gravis cadebat.",
      questions:[
        { q:"What did the envoys discover when they reached the town?", answer:"The gates were closed.", distractors:["The magistrate had departed.","The guards had abandoned their posts.","The town had been damaged by fire."], e:"The phrase portas clausas invenerunt directly states that the envoys found the gates closed when they arrived." },
        { q:"Why did the guards say no one would be admitted before daylight?", answer:"They were acting on the magistrate's order.", distractors:["The envoys lacked Roman citizenship.","The town was celebrating a festival.","The guards were waiting for reinforcements."], e:"Iussu magistratus is an ablative phrase meaning 'by order of the magistrate' and supplies the reason for the restriction." },
        { q:"The form admissuros esse is", answer:"a future active infinitive in indirect statement", distractors:["a perfect passive infinitive","a present subjunctive in a purpose clause","a gerundive expressing obligation"], e:"After responderunt, the guards' reported statement uses accusative-infinitive; admissuros esse expresses action future relative to responderunt." },
      ],
    },
    {
      id:"aplatin-sight-02", unit:"U1", topic:"1.3", setType:"short-sight", seed:7,
      source:"Original AP-style sight Latin composed for this practice bank.",
      text:"In villa antiqua servus senem dominum saepe adiuvabat. Quod dominus pedibus aegrotabat, servus epistulas ad amicos portabat et rationes diligenter scribebat. Dominus libertatem ei promisit si eandem fidem servaret.",
      questions:[
        { q:"Why did the servant carry letters for his master?", answer:"The master had trouble with his feet.", distractors:["The master could not read.","The servant was traveling to Rome.","The master's friends lived in the villa."], e:"Quod dominus pedibus aegrotabat gives the explicit cause for the servant's errands." },
        { q:"What did the master promise the servant?", answer:"Freedom if he maintained the same loyalty", distractors:["A farm if he joined the army","Citizenship if he became a scribe","Money if he left the household"], e:"Libertatem is the object of promisit, while the si clause states the condition attached to the promise." },
        { q:"In pedibus aegrotabat, pedibus is best understood as", answer:"an ablative of respect indicating the part affected", distractors:["a dative indirect object","an accusative of duration","a genitive of possession"], e:"The ablative can indicate the respect in which a condition applies; here the master is ill 'in respect to his feet.'" },
      ],
    },
    {
      id:"aplatin-sight-03", unit:"U2", topic:"2.5", setType:"short-sight", seed:11,
      source:"Original AP-style sight Latin composed for this practice bank.",
      text:"Subito terra tremere coepit et pocula de mensa ceciderunt. Pater liberos in hortum duxit, quod ibi minus periculi esse credebat. Cum tremor finitus esset, familia tamen diu sub caelo mansit.",
      questions:[
        { q:"What was the first sign of the disturbance described?", answer:"The ground began to shake and cups fell from the table.", distractors:["Smoke entered the garden.","A messenger announced an invasion.","Rain flooded the house."], e:"The opening sentence pairs terra tremere coepit with pocula ... ceciderunt as the first observable effects." },
        { q:"Why did the father lead the children into the garden?", answer:"He believed there was less danger there.", distractors:["He wanted them to gather fruit.","He had been ordered outside by a magistrate.","The house had already burned down."], e:"The quod clause gives the father's reasoning: he believed minus periculi esse in the garden." },
        { q:"The phrase minus periculi contains", answer:"a partitive genitive after a neuter quantity word", distractors:["a genitive of possession with pater","an ablative comparison","a dative of purpose"], e:"Periculi is genitive after neuter minus, literally 'less of danger,' a regular partitive construction." },
      ],
    },
    {
      id:"aplatin-sight-04", unit:"U3", topic:"3.4", setType:"short-sight", seed:15,
      source:"Original AP-style sight Latin composed for this practice bank.",
      text:"Provincia aquae penuria laborabat. Legatus architectos convocavit et quaesivit quomodo vetus aquaeductus refici posset. Unus respondit opus intra annum confici posse, si satis pecuniae mitteretur.",
      questions:[
        { q:"What problem did the province face?", answer:"A shortage of water", distractors:["A shortage of soldiers","A collapse in grain prices","An outbreak of piracy"], e:"Aquae penuria means 'a shortage of water' and is the problem stated in the first sentence." },
        { q:"What did the governor ask the architects?", answer:"How the old aqueduct could be repaired", distractors:["Whether a new temple should be built","Why taxes had been reduced","When the army would return"], e:"Quomodo ... refici posset is the indirect question introduced by quaesivit." },
        { q:"In si satis pecuniae mitteretur, mitteretur is", answer:"imperfect subjunctive in a future-less-vivid style condition", distractors:["perfect indicative in indirect statement","present imperative","pluperfect subjunctive contrary to fact"], e:"The sentence presents the repair as contingent on sufficient money being sent; the imperfect subjunctive marks the hypothetical condition." },
      ],
    },
    {
      id:"aplatin-sight-05", unit:"U3", topic:"3.6", setType:"short-sight", seed:19,
      source:"Original AP-style sight Latin composed for this practice bank.",
      text:"Calpurnia marito absente libros eius legit atque versus memoria repetit. Scribit se maxime dolere quod vox ipsa audiri non possit. Tamen fama mariti eam consolatur, quia opera eius a multis laudantur.",
      questions:[
        { q:"What does Calpurnia do while her husband is absent?", answer:"She reads his books and repeats passages from memory.", distractors:["She burns unfinished manuscripts.","She travels to join him.","She asks friends to stop discussing him."], e:"The first sentence explicitly says libros eius legit atque versus memoria repetit." },
        { q:"What especially causes her pain?", answer:"She cannot hear his actual voice.", distractors:["His books are unpopular.","Her memory of the verses is fading.","His friends refuse to write."], e:"The quod clause after maxime dolere identifies the inability to hear his voice as the chief source of pain." },
        { q:"The subject of laudantur is", answer:"opera eius", distractors:["fama mariti","eam","multis"], e:"Opera is nominative neuter plural and matches the plural passive verb laudantur; multis is the ablative agent-like phrase without a preposition." },
      ],
    },
    {
      id:"aplatin-sight-06", unit:"U4", topic:"4.3", setType:"short-sight", seed:23,
      source:"Original AP-style sight Latin composed for this practice bank.",
      text:"Nauta in carmine tempestatem describit quae navem parvam ad saxa agit. Ventos quasi milites saevos vocat, dum gubernator frustra socios hortatur. Tandem lux inter nubes apparet et mare paulatim quiescit.",
      questions:[
        { q:"How does the poet characterize the winds?", answer:"As savage soldiers", distractors:["As frightened merchants","As helpful guides","As silent judges"], e:"The explicit comparison ventos quasi milites saevos creates the martial characterization." },
        { q:"What changes at the end of the passage?", answer:"Light appears and the sea gradually becomes calm.", distractors:["The ship reaches the rocks and breaks apart.","The sailors abandon the helmsman.","A second storm immediately begins."], e:"The final sentence pairs the appearance of light with mare paulatim quiescit, marking a clear reversal." },
        { q:"The relative pronoun quae refers to", answer:"tempestatem", distractors:["navem","saxa","carmine"], e:"Quae is nominative feminine singular and agrees with tempestatem, the storm that drives the ship toward the rocks." },
      ],
    },
    {
      id:"aplatin-sight-07", unit:"U5", topic:"5.4", setType:"short-sight", seed:27,
      source:"Original AP-style sight Latin composed for this practice bank.",
      text:"Duo iuvenes de honore certabant. Alter maiorum gloriam saepe commemorabat; alter dicebat virtutem praesentem antiquis nominibus potiorem esse. Populus diu dubitavit cui coronam daret.",
      questions:[
        { q:"On what basis does the first young man argue for honor?", answer:"The glory of his ancestors", distractors:["His recent military victory","His wealth and public gifts","A prophecy from the gods"], e:"Alter maiorum gloriam saepe commemorabat directly identifies ancestral reputation as his argument." },
        { q:"What does the second young man claim?", answer:"Present excellence is more important than old family names.", distractors:["Ancestors determine all political rights.","Public honor should be abolished.","Wealth is superior to courage."], e:"Virtutem praesentem ... potiorem esse is the second speaker's indirect-statement claim." },
        { q:"The dative cui in cui coronam daret is required because", answer:"it is the indirect object of daret in an indirect question", distractors:["it expresses possession with coronam","it is governed by de","it is a dative of agent with a gerundive"], e:"The people wonder 'to whom' they should give the crown; dare takes the recipient in the dative." },
      ],
    },
    {
      id:"aplatin-sight-08", unit:"U6", topic:"6.2", setType:"short-sight", seed:31,
      source:"Original AP-style sight Latin composed for this practice bank.",
      text:"Poeta vetus lunam super montes surgentem intuetur. Non tantum noctis pulchritudinem laudat, sed etiam brevitatem vitae humanae cum cursu lunae comparat. Lectorem monet ut praesentibus bonis sapiens utatur.",
      questions:[
        { q:"What larger theme does the poet connect with the moon's movement?", answer:"The brevity of human life", distractors:["The military strength of Rome","The dangers of sea travel","The founding of a colony"], e:"The poet explicitly compares brevitatem vitae humanae with the moon's course." },
        { q:"What advice does the poet give the reader?", answer:"Use present blessings wisely.", distractors:["Reject every pleasure as dangerous.","Travel before the moon sets.","Study only ancient history."], e:"The final clause ut praesentibus bonis sapiens utatur states the advice directly." },
        { q:"The verb utatur is subjunctive because ut introduces", answer:"an indirect command after monet", distractors:["a result clause after tam","a purpose clause modifying lunam","a temporal clause"], e:"Moneo in the sense 'advise' can introduce an indirect command with ut plus subjunctive." },
      ],
    },
  ];

  sets.forEach((set) => build.addSet(set));
})();
