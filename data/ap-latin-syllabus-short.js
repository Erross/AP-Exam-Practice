// AP Latin — authentic revised-syllabus short sets (3 questions each).
(function () {
  const build = window.AP_LATIN_BUILD;
  if (!build) throw new Error("AP Latin base layer must load before syllabus short sets");

  const sets = [
    {
      id:"aplatin-sylshort-01", unit:"U2", topic:"2.1", setType:"short-syllabus", seed:41,
      source:"Pliny the Younger, Letters 6.16.4–5 (public-domain Latin text; excerpt).",
      text:"Nonum Kal. Septembres hora fere septima mater mea indicat ei apparere nubem inusitata et magnitudine et specie. Posit soleas, ascendit locum ex quo maxime miraculum illud conspici poterat.",
      questions:[
        { q:"What does Pliny's mother report?", answer:"An unusual cloud has appeared, remarkable in size and appearance.", distractors:["The fleet has already left Misenum.","A messenger has arrived from Rome.","The mountain has stopped smoking."], e:"The infinitive apparere and the ablatives magnitudine et specie describe the reported cloud as unusual in both size and appearance." },
        { q:"Why does Pliny the Elder go to a higher place?", answer:"To observe the remarkable phenomenon more clearly", distractors:["To signal ships in the harbor","To address the local magistrates","To escape an approaching crowd"], e:"Ex quo maxime miraculum illud conspici poterat explains that the location gives the best vantage point for observation." },
        { q:"The infinitive apparere is used because", answer:"indicat introduces indirect statement", distractors:["the infinitive expresses purpose after ascendit","it is a historical infinitive replacing every finite verb","it completes a passive periphrastic"], e:"Mater mea indicat ei introduces reported information; nubem is the accusative subject and apparere the infinitive." },
      ],
    },
    {
      id:"aplatin-sylshort-02", unit:"U2", topic:"2.2", setType:"short-syllabus", seed:45,
      source:"Pliny the Younger, Letters 6.16.9–10 (public-domain Latin text; excerpt).",
      text:"Vertit ille consilium et quod studioso animo incohaverat obit maximo. Deducit quadriremes, ascendit ipse non Rectinae modo sed multis laturus auxilium. Properat illuc unde alii fugiunt.",
      questions:[
        { q:"How does Pliny characterize his uncle's change of plan?", answer:"A scholarly investigation becomes a courageous rescue mission.", distractors:["A military patrol becomes a political ceremony.","A private dinner becomes a commercial voyage.","A rescue attempt becomes a retreat to Rome."], e:"The contrast studioso animo ... maximo and the subsequent laturus auxilium show the shift from inquiry to helping people in danger." },
        { q:"What is emphasized by Properat illuc unde alii fugiunt?", answer:"He moves toward the danger from which others are fleeing.", distractors:["He follows the safest route used by everyone else.","He waits until the danger has passed.","He orders others to approach while remaining behind."], e:"The antithesis between properat illuc and unde alii fugiunt sharply emphasizes his deliberate movement toward danger." },
        { q:"Laturus in laturus auxilium is", answer:"a future active participle expressing intended action", distractors:["a perfect passive participle","a gerundive of obligation","a present active infinitive"], e:"Laturus agrees with ipse and means 'about/intending to bring,' here expressing his purpose of bringing aid." },
      ],
    },
    {
      id:"aplatin-sylshort-03", unit:"U3", topic:"3.1", setType:"short-syllabus", seed:49,
      source:"Pliny the Younger, Letters 7.27.1–2 (public-domain Latin text; excerpt).",
      text:"Perquam velim scire, esse phantasmata et habere propriam figuram numenque aliquod putes an inania et vana ex metu nostro imaginem accipere. Ego ut esse credam in primis eo ducor, quod audio accidisse Curtio Rufo.",
      questions:[
        { q:"What question does Pliny ask his correspondent to consider?", answer:"Whether ghosts truly exist or are projections created by human fear", distractors:["Whether dreams can predict political elections","Whether philosophers should serve as governors","Whether Roman law permits burial inside a city"], e:"Pliny contrasts phantasmata with the possibility that they are inania et vana taking form ex metu nostro." },
        { q:"What does Ego ut esse credam ... ducor indicate?", answer:"Pliny is inclined toward believing that ghosts exist.", distractors:["Pliny has already proved that ghosts cannot exist.","Pliny refuses to offer any personal view.","Pliny is describing only a legal definition of ghosts."], e:"Ducor in this context means 'I am led/inclined,' and ut esse credam identifies the belief toward which the following story moves him." },
        { q:"The indirect question after velim scire is marked by", answer:"putes with competing alternatives introduced by an", distractors:["an imperative followed by a vocative","a passive infinitive with no subject","a causal indicative clause introduced by quia"], e:"Scire introduces the embedded question whether the correspondent thinks ghosts have real form or receive an image from fear." },
      ],
    },
    {
      id:"aplatin-sylshort-04", unit:"U3", topic:"3.2", setType:"short-syllabus", seed:53,
      source:"Pliny the Younger, Letters 7.27.7–9 (public-domain Latin text; excerpt).",
      text:"Venit Athenas philosophus Athenodorus, legit titulum auditoque pretio, quia suspecta vilitas, percunctatus omnia docetur ac nihilo minus, immo tanto magis conducit. Initio, quale ubique, silentium noctis; dein concuti ferrum, vincula moveri.",
      questions:[
        { q:"Why does the low rent make Athenodorus suspicious?", answer:"Its cheapness suggests that something is wrong with the house.", distractors:["It proves that the house is owned by the emperor.","It shows that the house is too small for a philosopher.","It means that no one is legally allowed to rent it."], e:"Quia suspecta vilitas directly states that the low price itself arouses suspicion and prompts him to ask for the full story." },
        { q:"How does Athenodorus react after learning about the house?", answer:"He rents it even more eagerly.", distractors:["He immediately leaves Athens.","He asks the magistrates to demolish it.","He doubles the offered price before entering."], e:"Nihilo minus, immo tanto magis conducit means not merely that he still rents it but that he does so all the more." },
        { q:"The infinitives concuti and moveri create the effect of", answer:"a compressed, vivid sequence of sounds beginning in the night", distractors:["a formal legal prohibition","a future prediction spoken by the ghost","a list of commands to servants"], e:"The historical infinitive-like sequence after silentium noctis accelerates the narration as the supernatural disturbance begins." },
      ],
    },
    {
      id:"aplatin-sylshort-05", unit:"U4", topic:"4.4", setType:"short-syllabus", seed:57,
      source:"Vergil, Aeneid 1.1–7 (public-domain Latin text; excerpt).",
      text:"Arma virumque cano, Troiae qui primus ab oris Italiam, fato profugus, Laviniaque venit litora, multum ille et terris iactatus et alto vi superum saevae memorem Iunonis ob iram.",
      questions:[
        { q:"What two subjects are announced in the opening words Arma virumque?", answer:"War and the hero", distractors:["Love and agriculture","Law and commerce","Philosophy and astronomy"], e:"The epic opens by naming arma and virum, immediately establishing martial action and the central wandering hero." },
        { q:"What is identified as a cause of the hero's suffering?", answer:"The persistent anger of Juno", distractors:["A rebellion among the Trojans","A famine in Latium","An oath made by Dido"], e:"Saevae memorem Iunonis ob iram explicitly attributes his wandering in part to Juno's unforgetting anger." },
        { q:"The phrase fato profugus most nearly means", answer:"an exile driven by fate", distractors:["a soldier victorious by chance","a king protected from fate","a prophet ignorant of destiny"], e:"Profugus describes one driven from home, while fato gives the causal or instrumental force of fate governing the journey." },
      ],
    },
    {
      id:"aplatin-sylshort-06", unit:"U4", topic:"4.6", setType:"short-syllabus", seed:61,
      source:"Vergil, Aeneid 2.225–233 (public-domain Latin text; excerpt).",
      text:"At gemini lapsu delubra ad summa dracones effugiunt saevaeque petunt Tritonidis arcem, sub pedibusque deae clipeique sub orbe teguntur. Tum vero tremefacta novus per pectora cunctis insinuat pavor.",
      questions:[
        { q:"Where do the two serpents go after attacking Laocoön?", answer:"To the shrine of Minerva, sheltering beneath the goddess", distractors:["Back into the sea beside the Greek fleet","Into the wooden horse","To Priam's palace"], e:"The serpents petunt Tritonidis arcem and are teguntur sub pedibus deae, linking their retreat with Minerva's sanctuary." },
        { q:"What reaction follows among the Trojans?", answer:"A new fear enters everyone and shakes them.", distractors:["They celebrate Laocoön as a prophet.","They immediately burn the horse.","They attack the temple of Minerva."], e:"Tremefacta ... cunctis and novus ... pavor describe the collective fear caused by what they have witnessed." },
        { q:"The word gemini describes", answer:"dracones", distractors:["delubra","pedibus","pectora"], e:"Gemini is nominative masculine plural and agrees with dracones, the paired serpents that move toward the shrine." },
      ],
    },
    {
      id:"aplatin-sylshort-07", unit:"U5", topic:"5.2", setType:"short-syllabus", seed:65,
      source:"Vergil, Aeneid 4.305–313 (public-domain Latin text; excerpt).",
      text:"Dissimulare etiam sperasti, perfide, tantum posse nefas tacitusque mea decedere terra? Nec te noster amor nec te data dextera quondam nec moritura tenet crudeli funere Dido?",
      questions:[
        { q:"What does Dido accuse Aeneas of trying to do?", answer:"Conceal his plan and leave her land in silence", distractors:["Seize Carthage by force","Persuade her to sail to Italy","Reveal their relationship to Iarbas"], e:"Dissimulare ... sperasti and tacitus ... decedere identify secrecy and departure as the heart of the accusation." },
        { q:"What persuasive strategy dominates the repeated nec te ... nec te ... nec?", answer:"Anaphora emphasizing multiple bonds that should restrain Aeneas", distractors:["A detached catalogue of military victories","A legal definition of marriage","An epic simile comparing Aeneas to a storm"], e:"The repeated nec te accumulates love, pledged hands, and Dido's threatened death as emotional claims on Aeneas." },
        { q:"The vocative perfide characterizes Aeneas as", answer:"faithless or treacherous", distractors:["fortunate","pious","unknown"], e:"Perfide is a direct form of address derived from perfidus and conveys Dido's accusation of broken trust." },
      ],
    },
    {
      id:"aplatin-sylshort-08", unit:"U5", topic:"5.7", setType:"short-syllabus", seed:69,
      source:"Vergil, Aeneid 12.919–926 (public-domain Latin text; excerpt).",
      text:"Cunctanti telum Aeneas fatale coruscat, sortitus fortunam oculis, et corpore toto eminus intorquet. Volat atri turbinis instar exitium dirum hasta ferens.",
      questions:[
        { q:"What does Aeneas do while Turnus hesitates?", answer:"He chooses his opportunity and hurls the fatal spear from a distance.", distractors:["He offers Turnus another truce.","He drops his weapon and retreats.","He calls the Rutulians to attack."], e:"Sortitus fortunam oculis and eminus intorquet describe Aeneas selecting the moment and throwing the weapon." },
        { q:"To what is the spear compared?", answer:"A dark whirlwind", distractors:["A wounded lion","A falling star","A river in flood"], e:"Atri turbinis instar is an explicit comparison: the weapon flies 'like a dark whirlwind.'" },
        { q:"The participle ferens agrees with", answer:"hasta", distractors:["Aeneas","exitium","Turnus"], e:"Ferens is nominative singular and personifies the spear, hasta, as carrying dreadful destruction." },
      ],
    },
  ];

  sets.forEach((set) => build.addSet(set));
})();
