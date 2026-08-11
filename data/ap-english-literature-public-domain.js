// AP English Literature — public-domain prose/drama replacement pass.
// Development layer loaded after the canonical bank while the replacement content
// is independently audited. Before release, fold these replacements into
// data/ap-english-literature.js and delete this file (CONTENT_STANDARDS.md §8).
(function () {
  "use strict";

  const bank = window.QUESTIONS_AP_ENGLISH_LITERATURE;
  if (!Array.isArray(bank)) throw new Error("AP Literature bank must load before public-domain replacements");

  function replaceSet(setId, meta, items) {
    const questions = bank
      .filter((q) => q.stimulusGroupId === `aplit-g-${setId}`)
      .sort((a, b) => a.id.localeCompare(b.id));
    if (questions.length !== items.length) {
      throw new Error(`${setId}: expected ${items.length} questions, found ${questions.length}`);
    }
    const stimulus = { type: "text", title: meta.title, text: meta.text, source: meta.source };
    questions.forEach((question, index) => {
      const item = items[index];
      if (question.topicCode !== item[0]) {
        throw new Error(`${question.id}: replacement skill ${item[0]} does not match ${question.topicCode}`);
      }
      const correctIndex = question.c[0];
      const options = item.slice(3, 6);
      options.splice(correctIndex, 0, item[2]);
      question.era = meta.era;
      question.stimulus = stimulus;
      question.q = item[1];
      question.o = options;
      question.e = item[6];
    });
  }

  replaceSet("sf-watch", {
    era: "pre-20th-century",
    title: "The Yellow Wallpaper — Charlotte Perkins Gilman",
    source: "Public-domain text: https://www.gutenberg.org/ebooks/1952, 1892.",
    text: `It is very seldom that mere ordinary people like John and myself secure ancestral halls for the summer.

A colonial mansion, a hereditary estate, I would say a haunted house, and reach the height of romantic felicity—but that would be asking too much of fate!

Still I will proudly declare that there is something queer about it.

Else, why should it be let so cheaply? And why have stood so long untenanted?

John laughs at me, of course, but one expects that in marriage.

John is practical in the extreme. He has no patience with faith, an intense horror of superstition, and he scoffs openly at any talk of things not to be felt and seen and put down in figures.

John is a physician, and perhaps—(I would not say it to a living soul, of course, but this is dead paper and a great relief to my mind)—perhaps that is one reason I do not get well faster.

You see he does not believe I am sick!

And what can one do?

If a physician of high standing, and one's own husband, assures friends and relatives that there is really nothing the matter with one but temporary nervous depression—a slight hysterical tendency—what is one to do?

My brother is also a physician, and also of high standing, and he says the same thing.

So I take phosphates or phosphites—whichever it is, and tonics, and journeys, and air, and exercise, and am absolutely forbidden to “work” until I am well again.

Personally, I disagree with their ideas.

Personally, I believe that congenial work, with excitement and change, would do me good.

But what is one to do?

I did write for a while in spite of them; but it does exhaust me a good deal—having to be so sly about it, or else meet with heavy opposition.

I sometimes fancy that in my condition if I had less opposition and more society and stimulus—but John says the very worst thing I can do is to think about my condition, and I confess it always makes me feel bad.

So I will let it alone and talk about the house.

The most beautiful place! It is quite alone, standing well back from the road, quite three miles from the village. It makes me think of English places that you read about, for there are hedges and walls and gates that lock, and lots of separate little houses for the gardeners and people.

There is a delicious garden! I never saw such a garden—large and shady, full of box-bordered paths, and lined with long grape-covered arbors with seats under them.

There were greenhouses, too, but they are all broken now.

There was some legal trouble, I believe, something about the heirs and coheirs; anyhow, the place has been empty for years.

That spoils my ghostliness, I am afraid, but I don't care—there is something strange about the house—I can feel it.

I even said so to John one moonlight evening, but he said what I felt was a draught, and shut the window.`,
  }, [
    ["1.A", "The narrator's opening description of the rented house chiefly reveals her tendency to", "invest ordinary circumstances with imaginative possibility", "accept John's practical explanations without reservation", "regard the house as financially beyond the couple's means", "avoid noticing anything unusual about her surroundings", "She immediately imagines a haunted ancestral estate and calls the place queer, showing an imaginative responsiveness that contrasts with John's insistence on what can be measured."],
    ["1.D", "John's laughter at the narrator becomes significant because it establishes", "a pattern in which his authority dismisses her perceptions", "a shared private joke that strengthens their agreement", "his fear that the house is actually supernatural", "his uncertainty about his own medical training", "The laughter is followed by his rejection of superstition and of her illness; throughout the excerpt, his practical authority repeatedly overrides what she reports feeling."],
    ["1.B", "The repeated question “what is one to do?” most clearly characterizes the narrator as", "aware of her disagreement yet constrained in acting on it", "unable to form any opinion about her treatment", "eager to surrender all decisions to her brother", "certain that open rebellion would immediately cure her", "She states clear personal beliefs about work and stimulation but frames herself as unable to act against a husband and brother whose medical and social authority supports the prescribed rest."],
    ["2.B", "The isolated estate setting primarily contributes to the narrator's situation by", "combining beauty and confinement in a place removed from society", "providing easy access to the social stimulation she wants", "confirming John's belief that the house is medically dangerous", "placing her near the professional work she has been forbidden to do", "The narrator admires the garden while noting locked gates, distance from the village, and an empty estate; the setting therefore offers attractive surroundings while increasing separation."],
    ["3.E", "The shift from discussing treatment to “talk about the house” chiefly serves to", "show the narrator redirecting herself after John's prohibition on thinking about her condition", "begin an unrelated travelogue with no connection to her emotional state", "prove that the narrator has accepted John's diagnosis", "resolve the disagreement between the narrator and John", "John says thinking about her condition is harmful; her abrupt redirection enacts the self-censorship his authority encourages even as the house description continues to register unease."],
    ["3.C", "The excerpt's repeated alternation between the narrator's assertions and John's responses emphasizes", "the tension between her perceptions and the explanations imposed on them", "a gradual convergence of their views about medicine", "John's increasing belief in supernatural causes", "the narrator's refusal to communicate with John at all", "She says she is sick, believes work would help, and feels the house is strange; John's responses repeatedly redefine these experiences as harmless, mistaken, or physically explainable."],
    ["4.B", "The first-person journal-like narration is especially important because it", "gives access to thoughts the narrator says she cannot safely voice", "allows John to correct the narrator's account as events occur", "presents an objective medical record of her condition", "prevents readers from noticing the narrator's uncertainty", "The narrator calls the page “dead paper” and a relief because she would not say the thought to a living soul, making private writing a space for perceptions excluded from open conversation."],
    ["4.C", "The parenthetical remark about “dead paper” chiefly creates", "an intimate contrast between private candor and public restraint", "a comic claim that the paper itself is supernatural", "a formal citation to a medical authority", "a signal that the narrator intends the journal for publication", "The aside directly acknowledges secrecy: paper is safe precisely because it cannot oppose or report her, unlike the living authorities around her."],
    ["4.C", "The tone toward John is best described as", "affectionate but increasingly skeptical of his authority", "openly hateful from the first sentence", "entirely submissive and uncritical", "professionally detached and clinical", "The narrator calls him practical and reports his care without simple hostility, yet her repeated “Personally, I disagree” and her sly writing expose persistent skepticism."],
    ["5.C", "John's action of shutting the window after attributing the narrator's feeling to a draught most strongly symbolizes", "his habit of converting her subjective experience into a manageable physical cause", "his secret agreement that the house is haunted", "his wish to encourage the narrator's imaginative speculation", "his uncertainty about whether the room has enough fresh air", "The gesture literalizes his method: a feeling she describes as strangeness becomes a draft that can be corrected by closing a window, leaving her interpretation unaddressed."],
    ["6.A", "The phrase “height of romantic felicity” chiefly conveys the narrator's", "self-aware pleasure in Gothic conventions", "literal conviction that a ghost has already appeared", "disgust with fiction and inherited estates", "belief that romance requires medical supervision", "She playfully imagines that calling the mansion haunted would perfect a familiar romantic scenario, showing literary self-awareness rather than simple credulity."],
    ["7.B", "Which interpretation is best supported by the excerpt as a whole?", "Authority can make a person's own perceptions difficult to trust or express.", "Practical knowledge reliably resolves every emotional conflict.", "Isolation benefits the narrator because it removes disagreement from her life.", "The narrator's imagination is presented as the sole cause of her illness.", "The narrator repeatedly states experiences and judgments that John and another physician discount, while her secrecy and rhetorical helplessness show how authority limits her confidence and expression."],
  ]);

  replaceSet("sf-bell", {
    era: "pre-20th-century",
    title: "Désirée's Baby — Kate Chopin",
    source: "Public-domain text: https://www.gutenberg.org/ebooks/160, 1893.",
    text: `As the day was pleasant, Madame Valmondé drove over to L'Abri to see Désirée and the baby. It made her laugh to think of Désirée with a baby. Why, it seemed but yesterday that Désirée was little more than a baby herself; when Monsieur in riding through the gateway of Valmondé had found her lying asleep in the shadow of the big stone pillar. The little one awoke in his arms and began to cry for “Dada.” That was as much as she could do or say. Some people thought she might have strayed there of her own accord, for she was of the toddling age. The prevailing belief was that she had been purposely left by a party of Texans, whose canvas-covered wagon, late in the day, had crossed the ferry that Coton Maïs kept, just below the plantation. In time Madame Valmondé abandoned every speculation but the one that Désirée had been sent to her by a beneficent Providence to be the child of her affection, seeing that she was without child of the flesh. For the girl grew to be beautiful and gentle, affectionate and sincere—the idol of Valmondé.

It was no wonder, when she stood one day against the stone pillar in whose shadow she had lain asleep, eighteen years before, that Armand Aubigny riding by and seeing her there, had fallen in love with her. That was the way all the Aubignys fell in love, as if struck by a pistol shot. The wonder was that he had not loved her before; for he had known her since his father brought him home from Paris, a boy of eight, after his mother died there. The passion that awoke in him that day, when he saw her at the gate, swept along like an avalanche, or like a prairie fire, or like anything that drives headlong over all obstacles. Monsieur Valmondé grew practical and wanted things well considered: that is, the girl's obscure origin. Armand looked into her eyes and did not care. He was reminded that she was nameless. What did it matter about a name when he could give her one of the oldest and proudest in Louisiana? He ordered the corbeille from Paris, and contained himself with what patience he could until it arrived; then they were married.

Madame Valmondé had not seen Désirée and the baby for four weeks. When she reached L'Abri she shuddered at the first sight of it, as she always did. It was a sad looking place, which for many years had not known the gentle presence of a mistress. The roof came down steep and black like a cowl, reaching out beyond the wide galleries that encircled the yellow stuccoed house. Big, solemn oaks grew close to it, and their thick-leaved, far-reaching branches shadowed it like a pall.`,
  }, [
    ["1.A", "The account of Désirée's childhood primarily characterizes her as", "deeply loved despite uncertainty about her origins", "socially rejected by the Valmondé family from infancy", "determined from childhood to marry into an old family", "certain of the identities of her biological parents", "Madame Valmondé ultimately treats Désirée as a providential gift and the “idol” of the household, even though the circumstances of her arrival remain unknown."],
    ["1.D", "Armand's response to Désirée's lack of a family name chiefly reveals his", "confidence that his own status can erase the importance of her unknown origin", "fear that marriage will damage the Aubigny name", "desire to investigate Désirée's biological family before marriage", "indifference toward family prestige in general", "He dismisses the warning that Désirée is nameless by insisting he can give her one of Louisiana's oldest and proudest names, revealing both passion and confidence in inherited status."],
    ["1.B", "Monsieur Valmondé's concern about Désirée's origin contrasts with Armand's response in order to emphasize", "Armand's headlong passion over practical caution", "Monsieur Valmondé's opposition to Désirée herself", "Armand's lack of interest in marriage", "the family's certainty about Désirée's ancestry", "Monsieur Valmondé asks that the obscure origin be considered, while Armand's passion is described as an avalanche or prairie fire driving over obstacles."],
    ["2.B", "The description of L'Abri at the end of the excerpt primarily creates", "an ominous contrast with Désirée's earlier association with affection and providence", "a cheerful domestic atmosphere matching Madame Valmondé's visit", "evidence that the plantation has recently been renovated", "a neutral geographical description without emotional significance", "The dark cowl-like roof, solemn oaks, and pall-like shadow make L'Abri foreboding, sharply unlike the affectionate Valmondé household in which Désirée was raised."],
    ["3.E", "The narrative's move from Désirée's discovery as a child to Armand's courtship chiefly", "links the uncertainty of her origin to the marriage that appears to disregard it", "interrupts the story with an unrelated family history", "proves that Armand knew Désirée's parents", "resolves the question of Désirée's identity before the marriage", "The transition repeats the stone pillar and then makes her namelessness an explicit concern during courtship, ensuring that the earlier mystery remains structurally relevant."],
    ["3.C", "The repeated reference to the stone pillar primarily serves to", "connect Désirée's unknown arrival with the moment Armand chooses her", "show that the pillar is physically dangerous", "establish that Armand built the Valmondé gateway", "explain why Madame Valmondé visits L'Abri", "The pillar marks both Désirée's unexplained appearance in the family and the later scene in which Armand falls in love, binding origin and marriage together."],
    ["4.B", "The third-person narrator's access to communal beliefs about Désirée's arrival allows the passage to", "present uncertainty as something society fills with competing stories", "identify one version of her abandonment as unquestionably true", "limit the account entirely to Désirée's own memories", "avoid mentioning the social importance of family names", "The narrator reports what “some people” thought and what became the “prevailing belief,” emphasizing that Désirée's origin is socially narrated rather than established."],
    ["4.C", "The narrator's description of the Aubignys falling in love “as if struck by a pistol shot” chiefly", "adds ironic violence and suddenness to Armand's passion", "proves that Aubigny courtships usually end in physical conflict", "presents Armand's affection as slow and carefully reasoned", "suggests Monsieur Valmondé shoots at unwelcome suitors", "The simile makes love instantaneous and forceful, anticipating the later avalanche and prairie-fire comparisons that stress Armand's impulsive intensity."],
    ["4.C", "The tone of the courtship paragraph is best described as", "romantic in energy but edged with warning", "coldly documentary and emotionally neutral", "comic because Armand has no interest in Désirée", "entirely reassuring about the couple's future", "The passionate imagery gives courtship momentum, but words such as “obstacles,” the practical warning about origins, and the emphasis on an old proud name introduce unease."],
    ["5.C", "The cowl and pall similes in the description of L'Abri most strongly associate the plantation with", "gloom, enclosure, and death", "religious celebration and public festivity", "agricultural abundance and freedom", "youthful play and domestic comfort", "A cowl visually darkens and encloses the roof, while a pall is a funeral covering; together they make the house ominous rather than welcoming."],
    ["6.A", "Comparing Armand's passion to both an avalanche and a prairie fire chiefly emphasizes its", "overwhelming speed and disregard for obstacles", "careful direction by family tradition", "brief duration and harmless consequences", "dependence on Désirée's known ancestry", "Both natural forces move powerfully and destructively across barriers, fitting the narrator's claim that Armand's newly awakened passion drives headlong over practical concerns."],
    ["7.B", "Which claim is best supported by the excerpt?", "Social identity in the passage depends partly on names and stories imposed by others.", "Désirée's unknown origins prevent her from being loved or accepted.", "Armand rejects the social prestige attached to the Aubigny family name.", "The narrator establishes Désirée's biological ancestry before her marriage.", "Désirée's childhood is explained through communal stories, and Armand answers her namelessness by offering his own prestigious name, making identity visibly social and constructed."],
  ]);

  replaceSet("sf-room", {
    era: "pre-20th-century",
    title: "An Occurrence at Owl Creek Bridge — Ambrose Bierce",
    source: "Public-domain text: https://www.gutenberg.org/ebooks/375, 1890.",
    text: `A man stood upon a railroad bridge in northern Alabama, looking down into the swift water twenty feet below. The man's hands were behind his back, the wrists bound with a cord. A rope closely encircled his neck. It was attached to a stout cross-timber above his head and the slack fell to the level of his knees. Some loose boards laid upon the ties supporting the rails of the railway supplied a footing for him and his executioners—two private soldiers of the Federal army, directed by a sergeant who in civil life may have been a deputy sheriff. At a short remove upon the same temporary platform was an officer in the uniform of his rank, armed. He was a captain. A sentinel at each end of the bridge stood with his rifle in the position known as “support,” that is to say, vertical in front of the left shoulder, the hammer resting on the forearm thrown straight across the chest—a formal and unnatural position, enforcing an erect carriage of the body. It did not appear to be the duty of these two men to know what was occurring at the center of the bridge; they merely blockaded the two ends of the foot planking that traversed it.

Beyond one of the sentinels nobody was in sight; the railroad ran straight away into a forest for a hundred yards, then, curving, was lost to view. Doubtless there was an outpost farther along. The other bank of the stream was open ground—a gentle slope topped with a stockade of vertical tree trunks, loopholed for rifles, with a single embrasure through which protruded the muzzle of a brass cannon commanding the bridge. Midway up the slope between the bridge and fort were the spectators—a single company of infantry in line, at “parade rest,” the butts of their rifles on the ground, the barrels inclining slightly backward against the right shoulder, the hands crossed upon the stock. A lieutenant stood at the right of the line, the point of his sword upon the ground, his left hand resting upon his right. Excepting the group of four at the center of the bridge, not a man moved. The company faced the bridge, staring stonily, motionless. The sentinels, facing the banks of the stream, might have been statues to adorn the bridge. The captain stood with folded arms, silent, observing the work of his subordinates, but making no sign. Death is a dignitary who when he comes announced is to be received with formal manifestations of respect, even by those most familiar with him. In the code of military etiquette silence and fixity are forms of deference.

The man who was engaged in being hanged was apparently about thirty-five years of age. He was a civilian, if one might judge from his habit, which was that of a planter. His features were good—a straight nose, firm mouth, broad forehead, from which his long, dark hair was combed straight back, falling behind his ears to the collar of his well fitting frock coat.`,
  }, [
    ["1.A", "The condemned man's position at the opening chiefly characterizes him as", "physically controlled within a meticulously organized military procedure", "an armed participant directing the soldiers", "a spectator who has accidentally wandered onto the bridge", "a soldier awaiting orders from the captain", "His bound wrists, rope, precarious footing, and surrounding executioners make his lack of physical agency immediate, while the soldiers' prescribed positions emphasize institutional control."],
    ["1.D", "The narrator's later description of the man as a well-dressed planter chiefly complicates the opening by", "humanizing someone first presented mainly as the object of an execution", "revealing that he secretly commands the Federal troops", "proving that his social class will prevent the hanging", "showing that the soldiers have mistaken his identity", "The opening treats him as “a man” positioned by ropes and soldiers; the later physical and social details restore individuality without changing his danger."],
    ["1.B", "The statement that the sentinels need not know what occurs at the bridge's center chiefly emphasizes", "their roles as parts of a procedure rather than engaged witnesses", "their ignorance that an execution is planned", "their personal sympathy for the condemned man", "their inability to see the center from their posts", "The narrator says their duty is merely to block the ends; their formal posture and directional gaze make them function as components of a system rather than responsive observers."],
    ["2.B", "The bridge setting most strongly contributes to the scene by", "placing the condemned man at a literal and symbolic threshold", "providing shelter that protects him from the soldiers", "separating the military from any view of the execution", "creating a crowded civilian marketplace around the event", "The man stands suspended between banks, over moving water and on temporary planking; the spatial threshold intensifies the imminence of passage from life toward death."],
    ["3.E", "The paragraph describing the military spectators chiefly slows the narrative in order to", "extend suspense through rigid visual detail before the execution proceeds", "explain how the condemned man escaped earlier", "shift attention permanently away from the man", "introduce a battle occurring beside the bridge", "The action nearly stops while uniforms, weapons, posture, and positions are catalogued; that stillness delays the expected hanging and makes the procedure more ominous."],
    ["3.C", "The movement from the bound man to the wider landscape and back to his individual features primarily", "alternates institutional scale with personal vulnerability", "shows that the narrator cannot decide where the execution occurs", "establishes several unrelated settings for later episodes", "proves the soldiers are more important than the prisoner", "The narrative first locates the body, then maps the military apparatus surrounding it, and finally returns to the man's age, clothing, and face, placing a person inside a larger system."],
    ["4.B", "The detached third-person narration contributes most to the passage's effect by", "describing an imminent death with procedural precision", "sharing the condemned man's panic in direct interior monologue", "mocking the soldiers through overt insults", "withholding every concrete detail of the execution", "The narrator inventories rope, ranks, postures, weapons, and positions in measured language; the emotional restraint makes the violence feel institutional and controlled."],
    ["4.C", "Calling the sentinels “statues to adorn the bridge” chiefly", "turns living soldiers into images of ceremonial immobility", "suggests that the sentinels are decorative sculptures rather than people", "shows that the bridge was built as a monument", "indicates that the soldiers have fallen asleep on duty", "The comparison heightens their rigid stillness and the scene's ritual quality; it is figurative, not a literal claim about statues."],
    ["4.C", "The narrator's tone toward the military ritual is best described as", "formally observant with an undercurrent of grim irony", "celebratory and patriotic", "panicked and disorganized", "sentimental toward every participant", "The careful etiquette language treats death as a “dignitary” while readers see a bound civilian about to be hanged, producing restrained but grim irony."],
    ["5.C", "The moving water beneath the otherwise motionless scene most plausibly symbolizes", "time and life continuing beneath imposed stillness", "the army's plan to transport the prisoner by boat", "the prisoner's certainty that he will escape by swimming", "the soldiers' inability to control the landscape", "Almost every human figure is fixed by discipline while the stream moves swiftly below, creating a suggestive contrast between living motion and ceremonial suspension."],
    ["6.B", "The description of death as a “dignitary” compares execution to", "a formal visit requiring ritual observance", "a private accident without witnesses", "an enemy soldier approaching under fire", "a religious service conducted by the prisoner", "The narrator extends the metaphor by speaking of receiving death with manifestations of respect and of military etiquette as deference."],
    ["7.B", "Which interpretation is best supported by the excerpt?", "Institutional order can make violence appear ceremonial and impersonal.", "Military discipline eliminates the possibility of moral discomfort.", "The condemned man's social status grants him control over the event.", "The execution is presented as chaotic because no one knows his duty.", "Every participant occupies an assigned place and posture, and the narrator repeatedly frames the hanging through etiquette and procedure, making lethal violence look eerily orderly."],
  ]);

  replaceSet("sf-supper", {
    era: "20th-century",
    title: "The Open Window — Saki",
    source: "Public-domain text: https://www.gutenberg.org/ebooks/269, 1914.",
    text: `“My aunt will be down presently, Mr. Nuttel,” said a very self-possessed young lady of fifteen; “in the meantime you must try and put up with me.”

Framton Nuttel endeavoured to say the correct something which should duly flatter the niece of the moment without unduly discounting the aunt that was to come. Privately he doubted more than ever whether these formal visits on a succession of total strangers would do much towards helping the nerve cure which he was supposed to be undergoing.

“I know how it will be,” his sister had said when he was preparing to migrate to this rural retreat; “you will bury yourself down there and not speak to a living soul, and your nerves will be worse than ever from moping. I shall just give you letters of introduction to all the people I know there. Some of them, as far as I can remember, were quite nice.”

Framton wondered whether Mrs. Sappleton, the lady to whom he was presenting one of the letters of introduction, came into the nice division.

“Do you know many of the people round here?” asked the niece, when she judged that they had had sufficient silent communion.

“Hardly a soul,” said Framton. “My sister was staying here, at the rectory, you know, some four years ago, and she gave me letters of introduction to some of the people here.”

He made the last statement in a tone of distinct regret.

“Then you know practically nothing about my aunt?” pursued the self-possessed young lady.

“Only her name and address,” admitted the caller.

“Her great tragedy happened just three years ago,” said the child; “that would be since your sister's time.”

“Her tragedy?” asked Framton; somehow in this restful country spot tragedies seemed out of place.

“You may wonder why we keep that window wide open on an October afternoon,” said the niece, indicating a large French window that opened on to a lawn.

“It is quite warm for the time of year,” said Framton; “but has that window got anything to do with the tragedy?”

“Out through that window, three years ago to a day, her husband and her two young brothers went off for their day's shooting. They never came back. In crossing the moor to their favourite snipe-shooting ground they were all three engulfed in a treacherous piece of bog. It had been that dreadful wet summer, you know, and places that were safe in other years gave way suddenly without warning. Their bodies were never recovered. That was the dreadful part of it.” Here the child's voice lost its self-possessed note and became falteringly human.`,
  }, [
    ["1.A", "Framton's thoughts about the visit chiefly characterize him as", "socially anxious and doubtful that prescribed introductions will help him", "eager to become intimate with every stranger in the district", "confident that rural society will cure him immediately", "suspicious that his sister intends to embarrass Mrs. Sappleton", "He labors over proper small talk and privately doubts the usefulness of formal visits, while his sister's earlier warning identifies his tendency toward isolation and nervousness."],
    ["1.C", "The niece is initially characterized as “self-possessed” chiefly to establish her", "confidence in controlling the conversation", "fear that Framton will discover the open window", "inexperience speaking with adult visitors", "dependence on her aunt to answer every question", "She evaluates the silence, asks what Framton knows, and quickly directs the conversation toward information he cannot verify, all with deliberate composure."],
    ["1.E", "Framton's admission that he knows only Mrs. Sappleton's name and address chiefly makes him", "vulnerable to a story tailored around his ignorance", "more knowledgeable about the family than the niece expects", "responsible for explaining the alleged tragedy", "certain that the niece is inventing details", "The niece first confirms that his sister's information is four years old and that he knows virtually nothing, then places the supposed tragedy three years in the past."],
    ["2.B", "The “restful country spot” functions primarily as", "an ironic background for the disturbing story the niece introduces", "proof that no tragic event could have occurred nearby", "a setting Framton already knows well from childhood", "a place whose physical danger is visible before the niece speaks", "Framton assumes tragedy seems out of place in the peaceful setting, so the niece's tale gains force precisely because it violates his expectation."],
    ["3.E", "The niece's question about how much Framton knows serves as a turning point because it", "gives her the information needed to shape what follows", "causes Framton to end the visit immediately", "reveals that Mrs. Sappleton has already entered the room", "persuades Framton to distrust his sister's letters", "Once she learns that his knowledge is minimal and outdated, she can introduce a recent “tragedy” that he has no independent means to challenge."],
    ["6.C", "The phrase “silent communion” is comic chiefly because it", "elevates an awkward pause into language of intimate connection", "shows that Framton and the niece agree without speaking", "describes a religious ceremony occurring in the room", "proves the niece is too shy to begin a conversation", "Their silence is socially strained rather than spiritually intimate; the grand phrase humorously exaggerates an uncomfortable pause between strangers."],
    ["4.B", "The third-person narration contributes to the comedy by", "revealing Framton's private unease while showing the niece's outward composure", "entering the niece's thoughts and stating that her story is false", "withholding all information about Framton's nervous condition", "presenting both characters with identical levels of knowledge", "Readers know Framton is anxious and poorly informed, but the niece's motives remain external, creating an asymmetry that lets her confident performance dominate him."],
    ["4.C", "The narrator's remark that Framton made his last statement “in a tone of distinct regret” suggests", "his sister's introductions feel like an obligation rather than a comfort", "he regrets failing to meet Mrs. Sappleton years earlier", "he wants the niece to leave before her aunt arrives", "he is ashamed that he already knows the family's secret", "The regret follows his explanation that the letters are his only connection to local people, reinforcing his discomfort with a therapeutic program based on visiting strangers."],
    ["4.C", "The tone of the excerpt is best described as", "dryly comic while gradually becoming unsettling", "tragic from the opening sentence onward", "sentimental and admiring toward rural life", "angry at Framton for accepting medical advice", "The narration lightly mocks Framton's social and medical anxieties before the niece's vivid account introduces apparent loss and danger, allowing unease to grow inside a comic frame."],
    ["5.C", "The open French window chiefly functions as", "an ordinary object the niece turns into evidence for her narrative", "proof that Mrs. Sappleton's relatives actually died", "a symbol Framton immediately recognizes from local legend", "a barrier that prevents anyone from entering the lawn", "The window initially needs only the warm weather to explain it; the niece deliberately assigns it a tragic meaning, making its interpretation central to her control of Framton."],
    ["3.D", "The contrast between the niece's “self-possessed” manner and her later “falteringly human” voice chiefly", "makes her story sound emotionally credible", "proves that her composure has been permanently destroyed", "shows that Framton has offended her", "signals that Mrs. Sappleton is listening from the next room", "The apparent break in composure supplies a convincing emotional performance at the most tragic point of the tale, increasing the story's persuasive power."],
    ["7.B", "Which claim is best supported by the excerpt?", "A storyteller can exploit an audience's expectations and gaps in knowledge.", "Framton's medical condition makes him unable to understand ordinary language.", "Rural settings are inherently more dangerous than urban ones.", "The niece's authority comes from being older and more socially experienced than Framton.", "The niece checks exactly what Framton knows, then uses his peaceful-country expectations and lack of family knowledge to construct a narrative around the visible window."],
  ]);

  replaceSet("sf-snow", {
    era: "pre-20th-century",
    title: "The Cask of Amontillado — Edgar Allan Poe",
    source: "Public-domain text: https://www.gutenberg.org/ebooks/1063, 1846.",
    text: `The thousand injuries of Fortunato I had borne as I best could; but when he ventured upon insult, I vowed revenge. You, who so well know the nature of my soul, will not suppose, however, that I gave utterance to a threat. At length I would be avenged; this was a point definitely settled—but the very definitiveness with which it was resolved, precluded the idea of risk. I must not only punish, but punish with impunity. A wrong is unredressed when retribution overtakes its redresser. It is equally unredressed when the avenger fails to make himself felt as such to him who has done the wrong.

It must be understood, that neither by word nor deed had I given Fortunato cause to doubt my good will. I continued, as was my wont, to smile in his face, and he did not perceive that my smile now was at the thought of his immolation.

He had a weak point—this Fortunato—although in other regards he was a man to be respected and even feared. He prided himself on his connoisseurship in wine. Few Italians have the true virtuoso spirit. For the most part their enthusiasm is adopted to suit the time and opportunity—to practise imposture upon the British and Austrian millionaires. In painting and gemmary, Fortunato, like his countrymen, was a quack—but in the matter of old wines he was sincere. In this respect I did not differ from him materially: I was skilful in the Italian vintages myself, and bought largely whenever I could.

It was about dusk, one evening during the supreme madness of the carnival season, that I encountered my friend. He accosted me with excessive warmth, for he had been drinking much. The man wore motley. He had on a tight-fitting parti-striped dress, and his head was surmounted by the conical cap and bells. I was so pleased to see him, that I thought I should never have done wringing his hand.

I said to him—“My dear Fortunato, you are luckily met. How remarkably well you are looking to-day! But I have received a pipe of what passes for Amontillado, and I have my doubts.”

“How?” said he. “Amontillado? A pipe? Impossible! And in the middle of the carnival!”

“I have my doubts,” I replied; “and I was silly enough to pay the full Amontillado price without consulting you in the matter. You were not to be found, and I was fearful of losing a bargain.”`,
  }, [
    ["1.A", "Montresor's opening explanation of revenge chiefly characterizes him as", "deliberate and concerned with controlling both punishment and its consequences", "impulsive enough to threaten Fortunato publicly", "uncertain whether Fortunato has actually offended him", "interested mainly in obtaining financial compensation", "He distinguishes successful revenge from mere retaliation: he wants punishment without risk and wants Fortunato to know who has punished him, revealing calculated control."],
    ["1.D", "Montresor's continued smiling at Fortunato chiefly reveals his ability to", "conceal hostile intention beneath familiar behavior", "forgive the insult once the carnival begins", "warn Fortunato that revenge is approaching", "persuade himself that Fortunato is harmless", "He explicitly says Fortunato has no reason to doubt his goodwill, while the smile now signifies anticipated “immolation,” making outward friendliness a deliberate disguise."],
    ["1.B", "Fortunato's pride in wine is introduced primarily as", "a vulnerability Montresor understands how to exploit", "evidence that Fortunato is intellectually superior in every art", "the original insult that caused Montresor's anger", "a reason Montresor abandons his revenge", "Montresor calls wine connoisseurship Fortunato's “weak point” and immediately uses Amontillado to engage him, linking characterization to the revenge plan."],
    ["2.B", "The carnival setting contributes most strongly to Montresor's plan by", "surrounding deception with noise, disguise, and social excess", "forcing both men to remain sober and formal", "providing a quiet public place for Montresor's accusation", "making Fortunato suspicious of unusual clothing", "The “supreme madness” of carnival, Fortunato's drinking, and his motley costume create conditions in which disguised motives and abnormal behavior can pass unnoticed."],
    ["3.E", "The transition from Montresor's theory of revenge to his meeting with Fortunato chiefly", "moves from motive and method into the execution of a prepared strategy", "reveals that Montresor changes his mind about revenge", "interrupts the narrative with an unrelated festival description", "shows that Fortunato already knows Montresor's plan", "The opening defines what Montresor believes revenge must achieve; the carnival encounter then shows him acting with exactly the concealment and manipulation that theory requires."],
    ["3.C", "The repeated phrase “I have my doubts” primarily functions to", "invite Fortunato to prove the expertise on which he prides himself", "show that Montresor no longer believes the wine exists", "confess that Montresor knows nothing about wine", "warn Fortunato that the purchase is fraudulent", "By withholding certainty and stressing his own possible error, Montresor creates a challenge to Fortunato's connoisseurship rather than simply requesting help."],
    ["4.B", "The first-person retrospective narration is significant because it", "allows Montresor to present his own logic as if it were self-evident", "gives direct access to Fortunato's private suspicions", "prevents readers from knowing that revenge is intended", "offers an impartial legal account of the alleged insult", "Montresor begins from his own premise of injury and defines the rules of successful revenge without independent confirmation, making readers dependent on his controlled account."],
    ["4.C", "Calling Fortunato “my friend” during the carnival encounter is chiefly", "verbal irony because Montresor has already announced murderous intentions", "evidence that the earlier insult has been forgotten", "a literal description of restored trust on both sides", "a sign that Fortunato knows Montresor is pretending", "Readers know the narrator's smile conceals revenge, so the conventional friendly label becomes sharply ironic even if Fortunato hears it sincerely."],
    ["4.C", "The tone of Montresor's narration is best described as", "controlled and sinister", "remorseful and apologetic", "confused and frightened", "playful without menace", "His syntax and reasoning remain measured even while he anticipates immolation and manipulates Fortunato, producing menace through composure rather than emotional outburst."],
    ["5.C", "Fortunato's motley costume and bells most strongly contribute to the passage by", "visually making the respected man into a fool as Montresor manipulates him", "showing that Fortunato is employed as a court jester", "proving that Montresor selected Fortunato's clothing", "indicating that the carnival has already ended", "The festive costume is normal for carnival, but in the revenge plot its fool-like associations sharpen the gap between Fortunato's pride and Montresor's control."],
    ["6.A", "Montresor's claim that his smile is prompted by Fortunato's “immolation” chiefly compares friendliness with", "a hidden vision of sacrificial destruction", "a public reconciliation ceremony", "the warmth of carnival lights", "a financial bargain over wine", "“Immolation” evokes sacrificial killing or destruction; placing that idea behind a social smile makes the outward gesture conceal a radically opposite intention."],
    ["7.B", "Which interpretation is best supported by the excerpt?", "Montresor treats another person's pride as a tool because he values control more than open confrontation.", "Montresor's revenge depends on Fortunato knowing the plan before it begins.", "Fortunato's expertise in wine is presented as entirely fraudulent.", "The carnival causes Montresor to invent a revenge plan spontaneously.", "Montresor hides every threat, studies Fortunato's sincere pride in wine, and uses uncertainty about Amontillado to draw him in, demonstrating calculated indirect control."],
  ]);

  replaceSet("ld-clock", {
    era: "pre-20th-century",
    title: "The Importance of Being Earnest — Oscar Wilde",
    source: "Public-domain text: https://www.gutenberg.org/ebooks/844, 1895.",
    text: `[Morning-room in Algernon's flat in Half-Moon Street. The room is luxuriously and artistically furnished. The sound of a piano is heard in the adjoining room. Lane is arranging afternoon tea on the table, and after the music has ceased, Algernon enters.]

ALGERNON. Did you hear what I was playing, Lane?

LANE. I didn't think it polite to listen, sir.

ALGERNON. I'm sorry for that, for your sake. I don't play accurately—any one can play accurately—but I play with wonderful expression. As far as the piano is concerned, sentiment is my forte. I keep science for Life.

LANE. Yes, sir.

ALGERNON. And, speaking of the science of Life, have you got the cucumber sandwiches cut for Lady Bracknell?

LANE. Yes, sir. [Hands them on a salver.]

ALGERNON. [Inspects them, takes two, and sits down on the sofa.] Oh! . . . by the way, Lane, I see from your book that on Thursday night, when Lord Shoreman and Mr. Worthing were dining with me, eight bottles of champagne are entered as having been consumed.

LANE. Yes, sir; eight bottles and a pint.

ALGERNON. Why is it that at a bachelor's establishment the servants invariably drink the champagne? I ask merely for information.

LANE. I attribute it to the superior quality of the wine, sir. I have often observed that in married households the champagne is rarely of a first-rate brand.

ALGERNON. Good heavens! Is marriage so demoralising as that?

LANE. I believe it is a very pleasant state, sir. I have had very little experience of it myself up to the present. I have only been married once. That was in consequence of a misunderstanding between myself and a young person.

ALGERNON. [Languidly.] I don't know that I am much interested in your family life, Lane.

LANE. No, sir; it's not a very interesting subject. I never think of it myself.

ALGERNON. Very natural, I am sure. That will do, Lane, thank you.

LANE. Thank you, sir. [Lane goes out.]

ALGERNON. Lane's views on marriage seem somewhat lax. Really, if the lower orders don't set us a good example, what on earth is the use of them? They seem, as a class, to have absolutely no sense of moral responsibility.`,
  }, [
    ["1.A", "Algernon is characterized chiefly through his conversation as", "self-consciously witty and more interested in style than conventional seriousness", "anxious to follow Lane's moral guidance", "embarrassed by luxury and social rank", "earnestly committed to musical accuracy", "He dismisses accuracy as easy, prizes expression, jumps from “science of Life” to sandwiches, and treats social and moral topics as occasions for paradoxical wit."],
    ["1.C", "Lane functions as a foil to Algernon primarily because Lane", "answers aristocratic absurdity with understated literal wit", "openly rebukes Algernon for drinking the champagne", "speaks far more emotionally than Algernon", "refuses to participate in any discussion of marriage", "Lane's calm replies about politeness, wine, and his single marriage puncture Algernon's poses without violating servant decorum, creating a drier counterpoint to Algernon's flamboyance."],
    ["2.B", "The luxurious flat and afternoon-tea setting chiefly establishes", "a world of leisure in which manners coexist with comic moral inversion", "an impoverished household struggling to entertain Lady Bracknell", "a workplace where Lane has greater formal authority than Algernon", "a private domestic space isolated from class distinctions", "The elegant room, piano, sandwiches, and champagne signal privileged leisure, while the dialogue turns etiquette and class hierarchy into material for satire."],
    ["3.E", "The shift from piano playing to cucumber sandwiches chiefly", "establishes the scene's pattern of treating grand ideas and trivial matters with equal seriousness", "marks a sudden conflict over Lady Bracknell's arrival time", "reveals that Lane has misunderstood Algernon's question", "ends the discussion of Algernon's personality", "Algernon moves directly from artistic “sentiment” and the “science of Life” to sandwiches, creating the comic leveling that continues with champagne and marriage."],
    ["3.E", "Lane's exit followed by Algernon's judgment of him chiefly", "caps the exchange by reversing the apparent direction of moral judgment", "reveals that Lane secretly listened outside the room", "changes Algernon's opinion of marriage from approval to rejection", "introduces Lady Bracknell into the scene", "The servant has just offered restrained observations, yet Algernon declares the lower orders responsible for setting a moral example, turning class hierarchy into the punch line."],
    ["1.E", "Algernon's final complaint about the “lower orders” reveals that he", "applies a moral standard to servants that the preceding conversation has made comic", "believes servants should have no moral responsibilities", "has decided to dismiss Lane for theft", "accepts Lane as his ethical superior without irony", "The speech pretends that the privileged depend on servants for moral example immediately after Algernon's own indulgence and frivolity, exposing the claim as satirical rather than sincere reform."],
    ["5.C", "The cucumber sandwiches chiefly function as", "a deliberately trivial object that punctures Algernon's philosophical pose", "evidence that Lady Bracknell has already arrived", "a symbol of Lane's desire to marry again", "proof that Algernon lives frugally", "They enter immediately after Algernon announces that he keeps “science for Life,” reducing lofty self-description to concern over fashionable refreshments."],
    ["7.D", "Which detail best supports the claim that the scene satirizes class hierarchy?", "Algernon says servants are useful for setting their social superiors a moral example.", "Lane arranges tea before Algernon enters.", "Lady Bracknell is expected to eat cucumber sandwiches.", "Algernon plays the piano in an adjoining room.", "The final statement explicitly inverts the conventional hierarchy: the privileged speaker imagines the lower class exists to model morality for those above it."],
    ["7.C", "The scene's comedy depends most on", "polite language carrying irreverent or contradictory ideas", "characters misunderstanding every literal word they hear", "physical slapstick involving the furniture", "a secret identity revealed to the audience", "Both men maintain formal address while discussing impolite listening, stolen champagne, marriage as misunderstanding, and moral responsibility through deadpan paradox rather than overt conflict."],
  ]);

  replaceSet("ld-kitchen", {
    era: "20th-century",
    title: "Trifles — Susan Glaspell",
    source: "Public-domain text: https://www.gutenberg.org/ebooks/10623, 1916.",
    text: `[The kitchen in the now abandoned farmhouse of John Wright, a gloomy kitchen, and left without having been put in order—unwashed pans under the sink, a loaf of bread outside the bread-box, a dish-towel on the table—other signs of incompleted work. At the rear the outer door opens and the Sheriff comes in followed by the County Attorney and Hale. The Sheriff and Hale are men in middle life, the County Attorney is a young man; all are much bundled up and go at once to the stove. They are followed by the two women—the Sheriff's wife first; she is a slight wiry woman, a thin nervous face. Mrs. Hale is larger and would ordinarily be called more comfortable looking, but she is disturbed now and looks fearfully about as she enters. The women have come in slowly, and stand close together near the door.]

COUNTY ATTORNEY. [Rubbing his hands.] This feels good. Come up to the fire, ladies.

MRS. PETERS. [After taking a step forward.] I'm not—cold.

SHERIFF. [Unbuttoning his overcoat and stepping away from the stove as if to mark the beginning of official business.] Now, Mr. Hale, before we move things about, you explain to Mr. Henderson just what you saw when you came here yesterday morning.

COUNTY ATTORNEY. By the way, has anything been moved? Are things just as you left them yesterday?

SHERIFF. [Looking about.] It's just the same. When it dropped below zero last night I thought I'd better send Frank out this morning to make a fire for us—no use getting pneumonia with a big case on, but I told him not to touch anything except the stove—and you know Frank.

COUNTY ATTORNEY. Somebody should have been left here yesterday.

SHERIFF. Oh—yesterday. When I had to send Frank to Morris Center for that man who went crazy—I want you to know I had my hands full yesterday. I knew you could get back from Omaha by today and as long as I went over everything here myself—

COUNTY ATTORNEY. Well, Mr. Hale, tell just what happened when you came here yesterday morning.

HALE. Harry and I had started to town with a load of potatoes. We came along the road from my place and as I got here I said, “I'm going to see if I can't get John Wright to go in with me on a party telephone.” I spoke to Wright about it once before and he put me off, saying folks talked too much anyway, and all he asked was peace and quiet—I guess you know about how much he talked himself; but I thought maybe if I went to the house and talked about it before his wife, though I said to Harry that I didn't know as what his wife wanted made much difference to John—`,
  }, [
    ["1.A", "Mrs. Peters's response “I'm not—cold” most clearly characterizes her as", "uneasy enough to resist even an ordinary invitation toward comfort", "physically unaffected by the freezing weather", "eager to take charge of the official investigation", "angry that the County Attorney has lit a fire", "The stage direction shows her beginning to move forward, then verbally denying cold; her nervous description and proximity to Mrs. Hale make the hesitation emotional rather than meteorological."],
    ["1.C", "The men and women are initially contrasted chiefly through", "the men's movement into official business and the women's hesitant observation of the room", "the women's superior legal authority", "the men's refusal to approach the stove", "the women's familiarity with every detail of the case", "The men move directly to warmth and procedure, while the women enter slowly, remain near the door, and look around with disturbance, establishing different relationships to the domestic setting."],
    ["2.B", "The disordered kitchen setting is significant because it", "turns interrupted domestic work into part of the scene the investigators occupy", "proves before dialogue begins who committed the crime", "functions only as a neutral backdrop for legal testimony", "shows that the farmhouse has been abandoned for many years", "The unwashed pans, exposed bread, towel, and other incomplete tasks make the room itself evidence of a life suddenly interrupted, even before characters decide what counts as important."],
    ["3.E", "The Sheriff's movement away from the stove “as if to mark the beginning of official business” chiefly", "makes procedure visible as a performance of authority", "shows that the Sheriff is too warm beside the fire", "signals that the women must leave the kitchen", "ends the investigation before Hale can speak", "The stage direction explicitly links a physical gesture to the ceremonial start of business, suggesting that official identity is enacted as well as possessed."],
    ["3.D", "The interruption of Hale's comment about Mrs. Wright's influence chiefly emphasizes", "the County Attorney's preference for chronological facts over potentially revealing domestic relations", "Hale's inability to remember what happened yesterday", "the County Attorney's agreement that Mrs. Wright controlled her husband", "the Sheriff's decision to exclude Hale from the case", "Hale begins to describe how little Mrs. Wright's wishes mattered to John, but the attorney postpones that subject to recover the event sequence, separating relational context from official fact-finding."],
    ["1.E", "Hale's remark about what Mrs. Wright wanted suggests that he", "has noticed an imbalance in the Wright marriage", "believes Mrs. Wright made every household decision", "knows nothing about John Wright's habits", "thinks the party telephone was Mrs. Wright's idea", "He says he doubted her wishes made much difference to John, a casual observation that implies a relationship in which her preferences carried little weight."],
    ["5.C", "The fire in the kitchen most plausibly functions as", "a point of physical comfort that contrasts with the room's emotional and evidentiary coldness", "proof that Mrs. Wright kept the farmhouse comfortably heated", "a symbol of the County Attorney's sympathy for the accused", "evidence that someone tried to destroy the kitchen", "The officials immediately seek the stove because the weather is below zero, but the abandoned, disordered room and Mrs. Peters's refusal of comfort keep the setting psychologically cold."],
    ["7.D", "Which detail best supports an interpretation that official procedure may overlook domestic meaning?", "The County Attorney postpones Hale's observation about how little Mrs. Wright's wishes mattered.", "The Sheriff sent Frank to make a fire in the stove.", "The County Attorney has returned from Omaha.", "Hale had been carrying potatoes to town.", "The interrupted comment concerns power within the marriage, potentially important context, yet the attorney redirects immediately to a chronological account of what Hale saw."],
    ["7.C", "The opening most strongly establishes a tension between", "formal investigation and the meanings embedded in ordinary household details", "two competing police agencies", "the County Attorney and Sheriff over who owns the farmhouse", "Hale and Mrs. Peters over whether the house is cold", "The stage directions foreground unfinished domestic work while the men explicitly organize an official inquiry, preparing a conflict over what kinds of details deserve attention."],
  ]);

  replaceSet("ld-orbit", {
    era: "pre-20th-century",
    title: "A Doll's House — Henrik Ibsen, trans. R. Farquharson Sharp",
    source: "Public-domain text: https://www.gutenberg.org/ebooks/2542, 1879; R. Farquharson Sharp translation.",
    text: `[A room furnished comfortably and tastefully, but not extravagantly. A fire burns in the stove. It is winter. A bell rings in the hall; shortly afterwards the door is heard to open. Enter Nora, humming a tune and in high spirits. She is in outdoor dress and carries a number of parcels; these she lays on the table. She leaves the outer door open after her, and through it is seen a Porter who is carrying a Christmas Tree and a basket, which he gives to the Maid who has opened the door.]

NORA. Hide the Christmas Tree carefully, Helen. Be sure the children do not see it until this evening, when it is dressed. [To the Porter, taking out her purse.] How much?

PORTER. Sixpence.

NORA. There is a shilling. No, keep the change. [The Porter thanks her, and goes out. Nora shuts the door. She is laughing to herself, as she takes off her hat and coat. She takes a packet of macaroons from her pocket and eats one or two; then goes cautiously to her husband's door and listens.] Yes, he is in. [Still humming, she goes to the table.]

HELMER. [Calls out from his room.] Is that my little lark twittering out there?

NORA. [Busy opening some of the parcels.] Yes, it is!

HELMER. Is it my little squirrel bustling about?

NORA. Yes!

HELMER. When did my squirrel come home?

NORA. Just now. [Puts the bag of macaroons into her pocket and wipes her mouth.] Come in here, Torvald, and see what I have bought.

HELMER. Don't disturb me. [A little later, he opens the door and looks into the room, pen in hand.] Bought, did you say? All these things? Has my little spendthrift been wasting money again?

NORA. Yes but, Torvald, this year we really can let ourselves go a little. This is the first Christmas that we have not needed to economise.

HELMER. Still, you know, we can't spend money recklessly.

NORA. Yes, Torvald, we may be a wee bit more reckless now, mayn't we? Just a tiny wee bit! You are going to have a big salary and earn lots and lots of money.

HELMER. Yes, after the New Year; but then it will be a whole quarter before the salary is due.

NORA. Pooh! we can borrow until then.

HELMER. Nora! [Goes up to her and takes her playfully by the ear.] The same little featherhead!`,
  }, [
    ["1.A", "Nora is initially characterized through her entrance as", "energetic, generous, and slightly secretive", "fearful of spending any money at Christmas", "indifferent toward her children", "openly defiant toward Helmer from the moment she arrives", "She hums, carries parcels, tips the porter, plans a surprise for the children, and secretly eats macaroons before listening at Helmer's door."],
    ["1.C", "Nora and Helmer are contrasted chiefly through their attitudes toward money as", "immediate enjoyment versus cautious restraint", "poverty versus complete financial independence", "generosity toward servants versus hostility toward them", "agreement that borrowing is the safest option", "Nora emphasizes a coming salary and argues for a little freedom now, while Helmer stresses the delay before payment and warns against reckless spending."],
    ["2.B", "The comfortable Christmas setting contributes to the scene chiefly by", "making the couple's financial negotiation occur within visible domestic abundance and celebration", "proving that the household has no economic concerns", "placing the characters in a public workplace", "showing that Helmer dislikes Christmas traditions", "Parcels, a hidden tree, fire, and gifts create warmth and consumption, while the dialogue immediately raises economizing, salary timing, and borrowing."],
    ["3.E", "Helmer's entrance from his study chiefly shifts the scene from", "Nora's private behavior to a marital performance shaped by his observation", "financial anxiety to complete agreement", "Christmas preparation to a discussion with the porter", "domestic life to an unrelated business meeting", "Before Helmer appears, Nora tips freely and secretly eats macaroons; once he enters, purchases and spending become subjects of his scrutiny and pet-name commentary."],
    ["5.D", "The hidden macaroons most strongly suggest", "a small private appetite Nora conceals within the marriage", "Helmer's plan to surprise Nora with food", "the household's inability to afford sweets", "a medical restriction imposed by the porter", "Nora eats them furtively, listens at Helmer's door, then pockets the bag and wipes her mouth before calling him in, making concealment unmistakable."],
    ["3.D", "The juxtaposition of Helmer's affectionate pet names with his criticism of spending chiefly", "mixes tenderness with a patronizing form of control", "shows that the couple never disagrees", "proves that Nora resents every term of affection", "makes the financial issue disappear from the scene", "“Little lark,” “squirrel,” “spendthrift,” and “featherhead” sound playful, but they also diminish Nora while Helmer defines the acceptable limits of her spending."],
    ["1.E", "Nora's proposal that they borrow until the salary arrives chiefly reveals her", "willingness to treat expected future security as present freedom", "ignorance that Helmer will receive a new salary", "determination to stop buying gifts", "fear that Helmer may lose his position before New Year", "She knows the salary is coming and uses that expectation to justify spending before it is actually paid, in direct contrast to Helmer's insistence on timing and restraint."],
    ["7.D", "Which detail best supports an interpretation that Nora manages what Helmer is allowed to see?", "She hides the macaroons and wipes her mouth before inviting him in.", "She gives the porter a shilling for a sixpence charge.", "She asks that the Christmas tree be hidden from the children.", "She carries parcels into the room herself.", "The macaroon action is directed specifically toward concealing her own behavior from Helmer; the tree concealment is an openly stated plan for a children's surprise."],
    ["7.C", "The scene most strongly develops a tension between", "playful domestic intimacy and unequal authority", "romantic love and public scandal already known to both characters", "parenthood and dislike of children", "work and artistic ambition", "The couple's banter is affectionate and energetic, yet Helmer's pet names, financial judgments, and Nora's concealed behavior establish an imbalance within that intimacy."],
  ]);
})();
