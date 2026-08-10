// ============================================================================
// AP English Literature and Composition — original, unofficial MCQ bank
// ============================================================================
// Aligned 2026-08-10 to the current College Board CED and exam page. A draw
// contains one valid five-passage configuration: two 12-question short-fiction
// sets, two 11-question poetry sets, and one 9-question drama set. Official
// sets may contain 8-13 questions, with at least two prose/drama and two poetry.
// Questions are original. Named poems below are public-domain works.
//
// This bank remains draft until an independent content review is complete.
// ============================================================================

(function () {
  "use strict";
  const QUESTIONS = [];
  const SKILL_NAMES = {
    "1": "Character", "2": "Setting", "3": "Structure", "4": "Narration",
    "5": "Word Choice, Imagery, and Symbol", "6": "Comparison", "7": "Literary Argumentation",
  };

  const QUESTION_ORDERS = {
    "sf-watch": [0, 3, 1, 5, 4, 7, 6, 10, 9, 2, 8, 11],
    "sf-bell": [0, 3, 5, 7, 4, 1, 6, 10, 2, 8, 9, 11],
    "sf-room": [0, 3, 1, 7, 4, 5, 6, 10, 2, 8, 9, 11],
    "sf-supper": [0, 3, 5, 6, 1, 7, 4, 10, 2, 9, 8, 11],
    "sf-snow": [0, 3, 1, 5, 4, 7, 6, 10, 2, 9, 8, 11],
    "po-snake": [0, 7, 8, 3, 6, 1, 2, 4, 5, 9, 10],
    "po-tyger": [0, 6, 3, 7, 2, 8, 9, 4, 5, 1, 10],
    "po-thrush": [0, 2, 6, 7, 1, 8, 4, 5, 9, 3, 10],
    "po-mask": [0, 6, 7, 1, 3, 4, 8, 9, 2, 5, 10],
    "po-uphill": [0, 2, 6, 3, 1, 4, 7, 8, 9, 5, 10],
    "ld-clock": [2, 0, 1, 3, 5, 6, 7, 4, 8],
    "ld-kitchen": [2, 0, 1, 5, 6, 3, 7, 4, 8],
    "ld-orbit": [2, 0, 1, 5, 3, 7, 4, 6, 8],
  };

  function addSet(set, items) {
    const stimulus = { type: "text", title: set.title, text: set.text, source: set.source };
    const order = QUESTION_ORDERS[set.id] || items.map((_, index) => index);
    const sequenceBySourceIndex = new Map(order.map((sourceIndex, sequence) => [sourceIndex, sequence]));
    items.forEach((item, index) => {
      const skill = item[0].split(".")[0];
      const correctIndex = QUESTIONS.length % 4;
      const options = item.slice(3, 6);
      options.splice(correctIndex, 0, item[2]);
      QUESTIONS.push({
        id: `aplit-${set.id}-${String(index + 1).padStart(2, "0")}`,
        unit: set.unit,
        topicCode: item[0], topic: SKILL_NAMES[skill], skill,
        setType: set.type, era: set.era, type: "s",
        stimulusGroupId: `aplit-g-${set.id}`, stimulus,
        sequence: sequenceBySourceIndex.get(index),
        q: item[1], o: options, c: [correctIndex], e: item[6],
      });
    });
  }

  // Short fiction: each set has 12 questions with the same skill-family profile.
  addSet({
    id: "sf-watch", unit: "SF", type: "short-fiction", era: "contemporary",
    title: "The Watchmaker's Drawer (original fiction)",
    source: "Original fiction created for AP Exam Practice.",
    text: `Mara had expected the shop to smell abandoned. Instead it smelled industrious: oil, brass, and the sharp soap her grandfather used before touching a watch face. Dust had settled everywhere except on the stool beside the bench.

Her uncle waited by the door with the estate agent's folder. “The buyer wants the cases, not the tools,” he said. “Take anything personal today.”

The agent had placed blue stickers on the glass cabinets and left the workbench unmarked. To him, the cabinets were oak and resale value; the bench was a scarred surface crowded with tweezers, loupe cases, and jars whose labels had browned. Mara's uncle had begun sorting tools into two cartons—DONATE and METAL—but stopped after finding a ledger of customers who were now dead. He pushed the ledger toward Mara, then withdrew his hand, as though even offering it required a decision about whose memories it contained.

Mara opened the shallow drawers. Springs lay in labeled envelopes; gears no larger than freckles occupied pillboxes. Her grandfather's handwriting reduced itself as the parts did, until the final labels seemed made for an insect archivist. She remembered mocking this order when she was twelve. He had held up a screw between tweezers and said, “Small is not the same as unimportant.”

In the bottom drawer she found her own red plastic watch. She had dropped it on the shop floor the summer before college and refused his offer to repair it. The watch had seemed childish then, its face printed with stars. Now its cracked crystal had been removed and wrapped separately. Beside it lay a paper packet marked MARA—WAITING FOR PART.

“Junk?” her uncle asked.

“Unfinished,” she said.

The distinction sounded grander than the object deserved, but she placed the packet in her coat. On the bench, the task lamp cast its perfect circle over a disassembled pocket watch. Mara did not know whether her grandfather had stopped because his hands trembled, because the owner had not returned, or because death had interrupted an ordinary Tuesday. For the first time, she understood that his famous patience had never promised completion. It had promised only that each small thing would be given its turn.`,
  }, [
    ["1.A", "Mara's initial expectation that the shop will smell abandoned chiefly reveals her", "assumption that her grandfather's death has made the shop inert", "certainty that the buyer has already removed the tools", "wish to reopen the business as its new watchmaker", "fear that her uncle has neglected the estate paperwork", "Her expectation treats death as a break in the shop's life; the persistent working smells and clear stool immediately complicate that assumption."],
    ["1.D", "The remembered exchange about the screw becomes important because it", "gains force when Mara finds her unfinished watch", "shows that Mara once understood her grandfather's concern for precision", "explains why the estate buyer wants only the display cases", "shows her grandfather refused to repair inexpensive objects", "What Mara once mocked becomes a principle she recognizes in the careful preservation of her small plastic watch and in her final understanding of his patience."],
    ["1.B", "Mara's reply “Unfinished” most clearly marks a change from", "dismissal of childishness to recognition of unresolved meaning", "grief about her grandfather to anger at her uncle", "interest in the shop to complete indifference toward it", "confidence in repairing watches to doubt about her skill", "The watch once seemed beneath attention, but Mara now corrects “junk” and preserves the packet. Her change concerns value and meaning, not technical confidence."],
    ["2.B", "The shop setting functions primarily as", "a material record through which Mara revises her understanding of her grandfather", "a threatening space that forces Mara to flee from the estate agent", "a preserved workplace that confirms Mara's first impression of her grandfather", "evidence that the watch business was financially successful", "Smells, drawers, labels, and unfinished work carry the grandfather's habits into the present and enable Mara's recognition. The passage offers no financial evidence or physical threat."],
    ["3.E", "The discovery of the red watch serves as the passage's", "turning point from impersonal sorting to personal recognition", "exposition of the estate agent's plan for the building", "comic interruption of an otherwise solemn scene", "resolution in which Mara completes her grandfather's work", "Before the watch, Mara inventories a dead man's shop; afterward, the objects address her personally and alter how she interprets patience and unfinishedness."],
    ["3.C", "The sequence of progressively smaller labels in the drawers chiefly", "prepares for attention to elevate small objects", "establishes that the grandfather was losing his eyesight", "shows that Mara cannot read her grandfather's handwriting", "foreshadows the buyer's rejection of the display cases", "The shrinking labels and carefully housed parts make smallness visible while preserving order, anticipating the remembered statement and the meaning of Mara's watch."],
    ["4.B", "The third-person point of view is limited mainly to Mara in order to", "show the shop changing with Mara's perception", "contrast Mara's perceptions with her uncle's private reasoning", "withhold all information about Mara's earlier life", "present the estate agent as the central consciousness", "The narration follows Mara's expectations, memories, and new understanding while leaving the uncle and grandfather's final circumstances partly unknown."],
    ["4.C", "The narrator's list of possible reasons the pocket watch remains disassembled emphasizes Mara's", "acceptance that some uncertainty cannot be resolved from the surviving objects", "discovery that her uncle interrupted the repair", "belief that the owner deliberately abandoned the watch", "decision to investigate the exact day of her grandfather's death", "The alternatives remain explicitly unanswered. Mara's insight comes not from choosing one explanation but from recognizing patience without guaranteed completion."],
    ["4.C", "The tone of the final paragraph is best described as", "meditative and chastened", "triumphant and celebratory", "accusatory and bitter", "detached and clinical", "Mara reflects humbly on limits, death, and care. The passage offers quiet understanding rather than victory, blame, or emotional distance."],
    ["5.C", "The “perfect circle” cast by the task lamp most strongly symbolizes", "a bounded field of attention amid larger uncertainty", "the financial completeness of the shop's records", "Mara's newly acquired mastery of watch repair", "the uncle's effort to separate saleable objects from personal ones", "The light isolates one unfinished mechanism and parallels the grandfather's practice of giving each small thing its turn, even though the reasons and outcomes remain uncertain."],
    ["6.A", "The comparison of the labels to the work of “an insect archivist” chiefly conveys", "their extreme minuteness and meticulous organization", "the shop's infestation and physical decay", "Mara's scientific knowledge of insects", "the grandfather's contempt for ordinary handwriting", "The fanciful comparison joins tiny scale with archival care. Nothing indicates insects, contempt, or specialized scientific knowledge."],
    ["7.B", "Which detail best supports an interpretation that the passage values process more than guaranteed results?", "Attention matters even when a repair remains unfinished.", "The buyer wants the display cases but does not want the tools.", "Mara places the packet containing her watch inside her coat.", "Dust has settled throughout most of the shop.", "The final distinction explicitly separates faithful attention from completion, turning the unfinished watches into evidence of a process-centered ethic."],
  ]);

  addSet({
    id: "sf-bell", unit: "SF", type: "short-fiction", era: "contemporary",
    title: "The Crossing Bell (original fiction)", source: "Original fiction created for AP Exam Practice.",
    text: `Everyone in Calder said the crossing bell had been silent for years, but I heard it on the morning I left. One clean strike traveled across the river before dawn, the note as deliberate as a hand laid on my shoulder, too measured to be ice shifting against the pilings.

I had packed quietly. My sister slept in the front room because the roof above hers leaked, and I stepped around the basin catching drops from a clear sky. In Calder, things continued after their causes had been repaired. The basin remained after the roofer came; the crossing bell remained after the ferry stopped.

At the landing, weeds pressed through the ticket-house floor. I found Mr. Vale sweeping them into a neat pile. He had been the ferryman once, though by then he was nearly blind.

“You rang it,” I said.

He leaned on the broom. “Did I?”

“For me.”

“Then you'd better not miss the boat.”

There was no boat. The bridge had carried traffic for twelve years, and my bus waited beyond it with warm windows and a driver checking his watch. Still, I thanked Mr. Vale. I wanted a departure that had noticed me.

The driver opened the door before I reached the bridge and asked whether anyone else was coming. I looked back. Mr. Vale had resumed sweeping the same patch of floor, though the weeds bent and rose behind his broom. For a moment I imagined my sister running from the house, or my mother waving from the road, but the town stayed folded into its windows. I climbed aboard alone. As the bus crossed above the abandoned route, the landing disappeared beneath the rail before the river did.

Years later my sister insisted that Mr. Vale had moved away before that winter. She remembered helping him load his clocks into a truck. I told her she was confusing the year. She told me I had always arranged Calder to make leaving it look difficult.

Perhaps. But when I pass the river now, I lower the car window. Usually there is only tire noise and wind moving under the bridge. Once, in rain, I heard something metallic. I drove on before it could become either a bell or not a bell.`,
  }, [
    ["1.A", "The narrator's insistence that the bell sounded initially reveals a desire for", "a ceremonial acknowledgment of the departure", "proof that the ferry has resumed regular service", "an excuse to miss the waiting bus", "evidence that the bridge is structurally unsafe", "The narrator later admits wanting “a departure that had noticed me,” making emotional recognition—not transportation—the reason for investing the sound with meaning."],
    ["1.D", "The sister's accusation most directly complicates the narrator by suggesting that the narrator", "shapes memories to support a preferred story about leaving", "has forgotten that the sister moved away first", "deliberately damaged the crossing bell", "has combined memories from Calder with those of another town", "Her claim that the narrator “arranged Calder” casts the earlier certainty as narrative construction, introducing possible unreliability without proving the event false."],
    ["1.B", "By the final sentence, the narrator has changed chiefly by becoming", "less willing to force ambiguity into certainty", "certain that Mr. Vale rang the bell that morning", "ready to leave Calder's disputed memories in the past", "determined to return and repair the ferry", "Driving on before naming the sound preserves its ambiguity. This differs from the youthful insistence that the note was a deliberate bell struck personally."],
    ["2.B", "The abandoned ferry landing primarily functions as", "a setting where obsolete structures mirror the narrator's attachment to old meanings", "a realistic transportation hub still used by most residents", "a place of danger from which Mr. Vale rescues the narrator", "evidence that Calder's economy depends on river trade", "The weeds, ticket house, absent ferry, and retained bell embody things continuing after their causes have ended, matching the narrator's memory-making."],
    ["3.E", "The revelation that Mr. Vale may already have moved away serves to", "reopen what had seemed a coherent departure memory", "support the narrator's certainty about Mr. Vale's role", "explain why the bus driver was impatient", "resolve the source of the metallic sound in the rain", "The sister's chronology destabilizes the scene and shifts the passage from nostalgic recollection toward an examination of how the narrator constructs it."],
    ["3.C", "The repeated idea that objects remain after their purposes end helps unify", "the town with the narrator's emotional habits", "the bridge's construction with the ferry's return", "Mr. Vale's clocks with the bus schedule", "the leaking roof with an approaching storm", "Basin, bell, and ferry structures persist, just as the narrator continues listening for a meaning tied to departure long after leaving."],
    ["4.B", "The first-person narration is especially significant because it", "ties the event to the narrator's interpretation", "allows the reader to verify the sister's memory independently", "provides objective access to Mr. Vale's location that winter", "eliminates uncertainty about the final metallic sound", "Every event reaches readers through the person whose emotional need may shape it, so the narrative voice creates rather than solves the central uncertainty."],
    ["4.C", "The narrator's blunt statement “There was no boat” chiefly reveals", "awareness of the gap between literal circumstances and the symbolic departure once desired", "certainty that Mr. Vale intended to deceive the driver waiting beyond the bridge", "ignorance that the bridge had replaced ferry service twelve years earlier", "suspicion that the narrator's sister planned to follow on a later ferry", "The adult narrator states the literal fact without ornament, exposing self-awareness about the ceremonial meaning once assigned to Mr. Vale's words."],
    ["4.C", "The narrator's tone toward the younger self is best described as", "sympathetic but self-questioning", "contemptuous and dismissive", "wholly certain and defensive", "comic without any regret", "The narrator understands the wish to be noticed yet includes the sister's critique and refuses certainty at the end, balancing sympathy with doubt."],
    ["5.C", "The basin catching drops from a clear sky most strongly suggests", "a response outlasting the problem that produced it", "a supernatural storm confined to the front room", "the sister's refusal to repair the family home", "the narrator's inability to distinguish weather conditions", "The narrator explicitly says the basin remains after the roofer came, making it an image of persistence detached from its original cause."],
    ["6.A", "The comparison of the bell note to a hand on the narrator's shoulder chiefly", "gives an impersonal sound the intimate intention the narrator desires", "suggests that Mr. Vale physically touches the narrator at the landing", "shows that ice against the pilings produces a reliably human rhythm", "contrasts the narrator's hearing with Mr. Vale's failing eyesight", "The simile turns a distant sound into a personal gesture of acknowledgment, revealing why the narrator resists the impersonal explanation of shifting ice."],
    ["7.B", "Which claim is best supported by the passage as a whole?", "Ambiguous memories can remain valuable even when their factual certainty weakens.", "A memory's value depends primarily on independent verification.", "Leaving one's hometown typically requires rejecting its traditions.", "The sister's account is presented as the more accurate version.", "The passage preserves emotional meaning while foregrounding uncertainty; neither account is conclusively established, and the narrator's final restraint does not erase the memory."],
  ]);

  addSet({
    id: "sf-room", unit: "SF", type: "short-fiction", era: "contemporary",
    title: "The West Room (original fiction)", source: "Original fiction created for AP Exam Practice.",
    text: `Mrs. Haldane kept the west room prepared for a guest whose name she did not speak. Each Thursday the maid opened its shutters, beat the blue counterpane, and set a fresh sprig of lavender in the water glass. By Friday the shutters were closed again.

Her nephew Arthur, arriving from the city with two trunks and more plans than invitations, discovered the room on his first morning. “Aunt, you have given the best prospect to nobody,” he said. The windows looked over the orchard to a seam of silver sea.

“Nobody has kept it very well,” Mrs. Haldane replied.

Arthur proposed a writing room. He carried in a narrow desk and laid three blank pages upon it. Mrs. Haldane watched from the threshold, neither forbidding nor assisting. That night a wind rose from the water. The chimney complained; an apple branch wrote urgently against the glass.

In the morning Arthur found the desk in the passage and his pages folded beneath the lavender glass. On the top page, in Mrs. Haldane's hand, were six words: Your uncle preferred the eastern light.

He carried the note downstairs. Mrs. Haldane was trimming toast into exact rectangles. Arthur waited for her to mention the desk, but she asked whether the train from the city had been crowded. The maid entered with coal dust on her apron and avoided the note as carefully as if it were a spilled drink. Arthur understood then that the household had practiced this silence long before his arrival; only he had mistaken the absence of an explanation for permission to supply one.

Arthur knew only that his uncle had sailed before Arthur's birth and had not returned. The family called this a loss, though no shipwreck had been reported. He carried the desk back to the west room.

At luncheon Mrs. Haldane asked whether the sea air disturbed his sleep.

“Not at all,” Arthur said. “But the eastern light may be better for work.”

The next Thursday he helped the maid beat the counterpane. He did not ask whether the room awaited a man, a body, an apology, or merely the ending of a sentence the family had refused to finish.`,
  }, [
    ["1.A", "Arthur's first comment about the room reveals his initial tendency to", "values space through its potential use", "understand immediately why his aunt preserves the room", "fear that the room is physically unsafe", "resent his uncle for leaving the family", "Calling the room a fine prospect “given” to nobody makes its use seem obvious to Arthur before he understands that his aunt's ritual gives it another kind of purpose."],
    ["1.D", "Mrs. Haldane's response that “Nobody has kept it very well” suggests she", "gives absence the force of a continuing occupant", "agrees that the room has been neglected", "plans to rent the room to Arthur", "has forgotten who formerly used the room", "Her personification of “Nobody” as something that can keep a room expresses loyalty to an absence rather than conceding vacancy."],
    ["1.B", "Arthur's action on the final Thursday shows that he has", "moved from practical insistence into ambiguous ritual", "decided to expose his aunt's deception to the family", "learned that his uncle has certainly died at sea", "abandoned writing because the sea air disturbed him", "Helping beat the counterpane respects the room's unresolved significance. Arthur does not acquire certainty or reject writing; he chooses restraint."],
    ["2.B", "The westward view of orchard and sea contributes chiefly by", "intensifying conflict between use and memorial preservation", "proving that the uncle preferred watching sunsets", "showing why the room is unsuitable for writing", "establishing that the house is threatened by flooding", "The attractive prospect makes Arthur's claim plausible while the sea links the room to the uncle's departure, allowing setting to support both sides of the tension."],
    ["3.E", "The note about eastern light is a turning point because it", "first signals the room concerns his absent uncle", "orders Arthur to leave the house immediately", "confirms that Mrs. Haldane wrote in the room each Thursday", "reveals the exact circumstances of the uncle's death", "The six words connect the room to the uncle while withholding nearly everything Arthur might ask, shifting him from appropriation toward curiosity and tact."],
    ["3.C", "The unanswered alternatives in the final sentence primarily", "preserve several possible meanings for Mrs. Haldane's ritual", "prove that the family knows the uncle survived", "show that Arthur no longer cares about the room", "identify an apology as the single correct explanation", "The list—man, body, apology, unfinished sentence—refuses a definitive interpretation and makes Arthur's decision not to ask central to the ending."],
    ["4.B", "The narration withholds Mrs. Haldane's inner thoughts in order to", "make readers interpret her restrained behavior", "establish that Mrs. Haldane has no emotional response", "reveal the maid as the story's secret narrator", "provide complete certainty about the uncle's fate", "Mrs. Haldane is seen from outside, so ritual, threshold position, note, and luncheon question carry meanings that remain contestable."],
    ["4.C", "The personification of the branch as writing urgently chiefly reflects", "Arthur's imagination while foreshadowing the hidden note", "Mrs. Haldane's attempt to communicate through the orchard", "the maid's plan to damage the west window", "the uncle's proven return during the storm", "The figurative writing belongs naturally to Arthur's perspective and anticipates actual words placed on his blank page without turning the storm supernatural."],
    ["4.C", "The passage's tone is best described as", "restrained and quietly mysterious", "melodramatic and openly terrifying", "satirical and contemptuous", "documentary and emotionally neutral", "Understatement, ritual, sparse dialogue, and unresolved absence generate mystery without overt horror or ridicule, and the details carry clear emotional pressure."],
    ["5.C", "The fresh lavender most plausibly functions as a symbol of", "care repeatedly renewed for someone or something absent", "Arthur's confidence that he will finish his writing", "the maid's rebellion against Mrs. Haldane", "the family's wealth from overseas trade", "Its weekly replacement makes care active and ongoing; placing Arthur's pages beneath the glass also turns the flower into part of the room's memorial claim."],
    ["6.B", "The final comparison to “the ending of a sentence” connects the family's silence with", "a narrative left deliberately unresolved", "Arthur's inability to write grammatical prose", "a letter proving the uncle planned to return", "Mrs. Haldane's dislike of blank paper", "The metaphor converts the missing uncle into unfinished family language, fitting a story in which Arthur chooses not to force closure."],
    ["7.B", "Which interpretation is best supported by Arthur's final behavior?", "Respect may require preserving another person's uncertainty rather than demanding an explanation.", "Arthur believes unused rooms should never be changed for any reason.", "Mrs. Haldane has convinced Arthur that his uncle is alive.", "Family loyalty depends on avoiding all discussion of the past.", "Arthur assists with the ritual while remaining unsure what it means. His restraint is specific to Mrs. Haldane's unresolved loss, not a universal ban on use or discussion."],
  ]);

  addSet({
    id: "sf-supper", unit: "SF", type: "short-fiction", era: "contemporary",
    title: "The Committee Supper (original fiction)", source: "Original fiction created for AP Exam Practice.",
    text: `The Preservation Committee met in the dining room of the building it had voted to condemn. Plaster dust seasoned the soup. Whenever the radiator knocked, Chairman Bell paused as if the structure itself had requested recognition.

“Our purpose,” he said, “is to protect buildings of exceptional civic character.”

Behind him, a painted panel depicted the town's founders carrying a boat uphill. Water damage had given each founder a brown halo. Mrs. Niles, who had brought the soup, set a bucket beneath the youngest one.

The committee reviewed photographs of six candidates: a courthouse, two mansions, a railway depot, a stone school, and a workers' hall. The hall was the room in which they sat, though the photograph showed it in 1912, crowded with women holding strike banners.

Mrs. Niles named two of the women: her grandmother Ada and Ada's sister Louise. The secretary asked whether those identifications appeared in the consultant's report. They did not. He wrote the names on the back of the photograph in pencil, then set it facedown so the committee could continue through the packet in numerical order. Above him, a strip of damp plaster loosened and landed beside the typed criteria. No one moved it; the secretary simply shifted the paper half an inch to the left.

“Insufficient architectural distinction,” Mr. Bell read from the consultant's report.

The radiator objected at length.

Mrs. Niles asked whether a building could be distinguished by what had happened inside it. Mr. Bell said history was among the criteria, certainly, but criteria required balance. The mansions possessed columns.

During dessert, rain began traveling down the wall. The members shifted their chairs without interrupting the vote. By five to one, they recommended preserving both mansions and postponing action on the hall.

Mrs. Niles collected the bowls. At the door she removed the consultant's photograph from the rejected pile and slid it under the leaking window. The women of 1912 disappeared beneath a widening map of rain, still holding their banners above their heads.`,
  }, [
    ["1.A", "Chairman Bell is characterized primarily as someone who", "uses procedure to evade the committee's contradictions", "secretly intends to repair the workers' hall himself", "values labor history more than architectural appearance", "treats the deterioration as support for condemnation", "Bell invokes purpose, reports, criteria, and balance while prioritizing columns over events and meeting inside a condemned candidate. His pauses show awareness without meaningful response."],
    ["1.C", "Mrs. Niles functions as a contrast to Bell chiefly because she", "responds practically and asks about lived history", "possesses greater formal authority over the committee vote", "treats practical stewardship as separate from historic significance", "argues that water damage is architecturally distinguished", "She places buckets, questions the criteria, and repurposes the photograph, while Bell abstracts the building into procedure and consultant language."],
    ["1.E", "Mrs. Niles's final action most clearly expresses", "bitter recognition that neglect erases the history under review", "satisfaction that the photograph will protect the wall permanently", "confidence that the committee will reverse its decision", "indifference toward the women shown in the photograph", "Using the rejected image against the leak literalizes institutional neglect covering the women. The action is pointed and despairing, not a durable repair or sign of confidence."],
    ["2.B", "Holding the meeting in the condemned hall chiefly creates", "situational irony that exposes the committee's abstract approach to preservation", "a neutral setting chosen only because it has a large dining room", "evidence that the hall meets the consultant's architectural standard", "dramatic irony about whether the committee will recognize the hall around them", "The committee debates civic character while dust, leaks, and history surround it, yet members treat the hall as a file rather than the space they occupy."],
    ["3.E", "The committee vote serves as the climax because it", "turns contradiction into official delay", "unexpectedly guarantees the hall's immediate restoration", "reveals that Mrs. Niles controls the consultant", "resolves the disagreement about architectural criteria", "The vote institutionalizes the preference shown in discussion and directly leads to Mrs. Niles's final symbolic response; it neither repairs nor resolves the underlying issue."],
    ["6.C", "Describing each radiator knock as if the building had “requested recognition” chiefly", "personifies the condemned hall as petitioning the committee that ignores it", "establishes that the boiler is a newly installed and efficient machine", "signals that Mrs. Niles should interrupt the vote to serve the next course", "proves that the committee members cannot hear one another during debate", "The personification gives the deteriorating hall a civic voice. Bell pauses as though hearing its claim, but the committee continues to reduce that claim to abstract criteria."],
    ["4.B", "The narrator's perspective contributes to the satire by", "describing damage and behavior with dry understatement", "entering Bell's thoughts to justify every decision", "explaining directly which buildings deserve preservation", "treating Mrs. Niles's actions as incomprehensible", "Phrases such as dust “seasoning” soup and the radiator “objecting” frame events wryly without delivering a formal policy judgment."],
    ["4.C", "The statement that “criteria required balance” is presented so that readers recognize it as", "an abstraction shielding conventional preference", "a precise mathematical rule the committee consistently applies", "Mrs. Niles's successful defense of the workers' hall", "evidence that historical significance is the committee's highest priority", "Bell never explains the balance; his next point about columns exposes the phrase as cover for privileging architectural prestige over social history."],
    ["4.C", "The dominant tone is", "satirical with an undercurrent of loss", "reverent and celebratory", "frantic and panicked", "romantic and sentimental", "Comic personification and procedural absurdity satirize the committee, while the damaged mural and vanishing strikers give the humor a genuine sense of erasure."],
    ["5.C", "The widening rain over the photograph most strongly symbolizes", "neglect obscuring a less prestigious public history", "nature restoring the hall to its original appearance", "the committee's careful documentation process", "Mrs. Niles's plan to alter the consultant's report", "As water covers the women in the image used as a makeshift barrier, physical neglect enacts the historical disappearance produced by the vote."],
    ["3.D", "Giving the painted founders “halos” while the photographed workers disappear creates a contrast between", "officially honored civic memory and marginalized collective action", "religious devotion and secular architecture", "successful boat travel and failed railway service", "youthful founders and elderly committee members", "The damaged mural accidentally sanctifies accepted founders, whereas the workers' image is rejected and submerged, sharpening the unequal treatment of public histories."],
    ["7.B", "Which statement best expresses a central irony of the passage?", "The committee preserves civic symbols while neglecting civic action.", "The hall is architecturally identical to both mansions under review.", "Mrs. Niles votes to condemn the building where she serves supper.", "The consultant's report recommends preserving the workers' hall immediately.", "The committee's mission clashes with its preference for prestigious forms over the historically significant hall physically deteriorating around its meeting."],
  ]);

  addSet({
    id: "sf-snow", unit: "SF", type: "short-fiction", era: "contemporary",
    title: "The Snow Fence (original fiction)", source: "Original fiction created for AP Exam Practice.",
    text: `By October, Eli's father had driven the last post for the snow fence along the western field. The orange mesh looked ridiculous against dry grass and a blue sky. Eli said so from the truck.

“It isn't for today,” his father answered.

That winter the first storm came sideways. Snow crossed the open field like smoke and stopped at the fence, building a white ridge taller than Eli. The lane beyond remained almost bare. His father pointed once, not smiling, and Eli pretended to be interested in the shovel.

In March, his father left for work in another state. The plant had cut its second shift, and the new job was supposed to last six weeks. He phoned each Sunday with descriptions of motel breakfasts and machines that did not break. The calls grew shorter. In June, Eli's mother stopped saying “when” and began saying “if.”

The fence stayed up. Weeds threaded the mesh; one post leaned. Eli could have rolled it and stored it in the shed, as his father always did, but summer made the task absurd. He told himself he was waiting for instructions.

His mother mowed around the orange line until the tractor tire caught its lowest edge. She switched off the engine and asked whether he wanted help taking it down. Eli said the ties would be easier to cut after the plastic softened in the sun. They both knew the explanation was backward. That evening he found the fence driver behind the truck seat, wiped the rust from its handle, and returned it without carrying it to the field.

In September a windstorm tore the loose end free. The mesh snapped all night against the post. Before school, Eli carried out the driver and reset the anchor. He tightened every tie along the line. The work was simple, though his hands remembered it before his mind did.

From the field, the house looked smaller than it did from the road. Eli considered taking the fence down. Instead he straightened the leaning post and left the orange line facing a winter not yet visible.`,
  }, [
    ["1.A", "Eli's first reaction to the fence shows that he initially", "judges preparations by present conditions rather than future need", "understands how drifting snow affects the lane", "resents being required to build the fence alone", "expects his father to leave the family that winter", "The fence looks ridiculous against dry grass because Eli evaluates it only in October; his father's reply identifies the limitation directly."],
    ["1.D", "Eli's response when his father points at the snow ridge suggests", "embarrassed recognition that his earlier judgment was wrong", "anger that the fence failed to protect the lane", "fear that the snow will bury the house", "pride in having designed the fence himself", "Pretending to study the shovel lets Eli avoid acknowledging the lesson. The lane's condition shows success, and he did not design the fence."],
    ["1.B", "Repairing the fence in September chiefly shows Eli", "assuming a responsibility formerly associated with his father", "accepting that his father will return before winter", "deciding to sell the field and leave the house", "rejecting the practical lesson the fence taught", "Eli acts without the instructions he claimed to await, and his hands carry learned knowledge into a task his father routinely managed."],
    ["2.B", "The view of the smaller house from the field primarily", "reflects Eli's altered perspective after taking on the repair", "proves the house has physically deteriorated during the year", "shows that the road is closer than the field", "explains why the father sought work elsewhere", "The shift in vantage follows Eli's independent work and makes the familiar home look newly vulnerable, supporting his decision to leave the protective preparation in place."],
    ["3.E", "The windstorm functions as a turning point because it", "converts Eli's passive waiting into unprompted action", "causes the father to telephone after months of silence", "destroys the fence beyond repair", "signals that winter has already begun", "Until the mesh tears free, Eli preserves the fence while claiming to await instructions. The storm requires a choice, and he repairs it before school."],
    ["3.C", "The progression of seasons structures the passage mainly to", "links weather with Eli's changing view of preparation", "show that the family moves to a different climate", "document the exact length of the father's job", "establish that the snow fence is useful in summer", "October, winter, March, June, and September measure both the fence's purpose and the father's increasingly uncertain return, bringing Eli to prepare for another unseen winter."],
    ["4.B", "The close third-person narration allows readers to", "see gaps between Eli's excuses and motives", "know exactly why the father stops calling", "hear the mother's private thoughts about the marriage", "verify the length of the father's employment contract", "The narration reports Eli telling himself he awaits instructions and then shows behavior suggesting attachment, uncertainty, and learned responsibility without resolving the father's motives."],
    ["4.C", "The personification in “his hands remembered it before his mind did” suggests that", "practical knowledge and identification with his father persist", "Eli repairs the fence while sleepwalking", "the task is too complex for Eli to understand", "his father has returned secretly to guide him", "The figurative phrasing presents embodied learning: Eli has absorbed the work even before consciously claiming the role or deciding what the fence now means."],
    ["4.C", "The passage's tone toward Eli is best described as", "quietly sympathetic without resolving his family's future", "mocking because he once doubted the fence", "optimistic that his father will certainly return", "angry at his refusal to remove the mesh", "The narration treats Eli's avoidance and action with restraint and compassion while preserving the uncertainty signaled by “if” and the unseen winter."],
    ["5.C", "The orange fence most plausibly symbolizes", "readiness and connection to his absent father", "a barrier preventing Eli from leaving home", "the family's certainty that conditions will improve", "the father's dislike of the western field", "It literally prepares for storms and carries the father's instruction and labor. Eli's repair extends both functions without guaranteeing either weather or return."],
    ["6.A", "The snow moving “like smoke” emphasizes its", "wind-driven, spreading motion across the field", "warmth and harmlessness", "dark color against the sky", "origin in a fire near the lane", "The simile makes drifting snow appear fluid and airborne before the fence gathers it; it does not imply actual heat, color, or fire."],
    ["7.B", "Which interpretation is best supported by the ending?", "Eli prepares purposefully despite uncertainty about next season.", "Eli leaves the fence up chiefly because he expects his father's instructions.", "The repaired fence suggests that the family will soon be reunited.", "Eli has decided that patient waiting is usually preferable to action.", "The “winter not yet visible” echoes the father's lesson, while Eli's autonomous repair shows action under uncertainty rather than obedience or a guaranteed family resolution."],
  ]);

  // Poetry: public-domain texts, with original questions and explanations.
  addSet({
    id: "po-snake", unit: "PO", type: "poetry", era: "pre-20th-century",
    title: "“A narrow Fellow in the Grass” — Emily Dickinson",
    source: "Public-domain text: https://en.wikisource.org/wiki/Poems%3A_Second_Series_(Dickinson)/The_Snake",
    text: `A narrow fellow in the grass
Occasionally rides;
You may have met him,—did you not,
His notice sudden is.

The grass divides as with a comb,
A spotted shaft is seen;
And then it closes at your feet
And opens further on.

He likes a boggy acre,
A floor too cool for corn.
Yet when a child, and barefoot,
I more than once, at morn,

Have passed, I thought, a whip-lash
Unbraiding in the sun,—
When, stooping to secure it,
It wrinkled, and was gone.

Several of nature's people
I know, and they know me;
I feel for them a transport
Of cordiality;

But never met this fellow,
Attended or alone,
Without a tighter breathing,
And zero at the bone.`,
  }, [
    ["4.C", "The speaker's childhood attempt to “secure” the apparent whip-lash reveals", "curiosity that precedes recognition of danger", "a practiced ability to capture snakes", "disgust toward every form of animal life", "certainty that the object is a discarded tool", "The child stoops because the moving shape first appears to be a whip-lash; its sudden disappearance transforms innocent curiosity into the poem's unsettling recognition."],
    ["3.C", "The final stanza changes the poem by moving from", "observed description to the speaker's involuntary physical response", "childhood memory to a scientific classification", "an outdoor scene to an indoor conversation", "fear of the snake to complete affection for it", "Earlier stanzas track the creature's appearance and a past encounter; the ending names constricted breath and bone-deep cold, making the emotional effect bodily."],
    ["5.B", "Withholding the word “snake” contributes chiefly to", "the creature's elusive, indirect presence", "the speaker's inability to identify the animal", "a delayed identification that makes the encounter merely comic", "a claim that the creature is imaginary", "Periphrases such as “fellow,” “shaft,” and “whip-lash” make the snake appear through motion and fragments, formally matching its quick concealment in grass."],
    ["5.B", "The direct question “You may have met him,—did you not” primarily", "invites recognition before naming the creature", "asks the reader to correct the speaker's factual mistake", "establishes that the reader owns the boggy acre", "shifts the poem to a second speaker's account", "The conversational address recruits the reader as a possible witness and builds recognition through common experience while maintaining the poem's avoidance of the noun “snake.”"],
    ["4.C", "The speaker's attitude toward the creature is best described as", "fascinated yet viscerally fearful", "warmly familiar despite a moment of physical surprise", "scientifically detached", "openly hostile and eager to kill", "Careful observation and personifying courtesy show fascination, but “tighter breathing” and “zero at the bone” record fear that persists in any company."],
    ["4.C", "The parenthetical contrast “Attended or alone” emphasizes that the response", "does not depend on whether the speaker has companions", "occurs only when the creature appears in a group", "has weakened since childhood", "is concealed from other observers", "The paired conditions cover both accompanied and solitary encounters, presenting the physical fear as automatic rather than socially produced."],
    ["4.C", "Describing the snake as a “fellow” chiefly", "joins familiarity with the creature's wildness", "identifies the animal as a human neighbor", "makes the speaker's final fear seem insincere", "proves the snake recognizes the speaker personally", "The familiar noun places the snake among “nature's people,” yet the speaker never achieves the cordial relationship enjoyed with other creatures."],
    ["6.A", "The image of grass dividing “as with a comb” makes the snake visible through", "the orderly line its motion briefly creates", "the sound of its scales striking metal", "a permanent trail cut into the field", "the speaker's act of parting the grass by hand", "A comb parts strands into a line; the simile shows grass separating and closing, so the unseen body is perceived by its transient effect."],
    ["6.A", "The whip-lash comparison is effective because both a snake and a lash can appear", "slender, flexible, and suddenly animated", "soft, harmless, and fixed in place", "spotted only when held by a child", "useful for cultivating corn", "The apparent object “unbraids,” wrinkles, and vanishes, using the shared shape and quick motion of lash and snake to stage mistaken recognition."],
    ["3.D", "The contrast between “cordiality” and “zero at the bone” highlights", "the speaker's usual kinship against exceptional fear", "a seasonal change from summer to winter", "the speaker's preference for farm animals over wild ones", "the creature's change from friendly to aggressive", "Warm social “cordiality” opposes bone-deep cold, marking the snake as an exception to the speaker's otherwise reciprocal relation with nature's creatures."],
    ["7.B", "Which interpretation is best supported by the poem?", "Close attention to nature can produce wonder without eliminating instinctive fear.", "Knowledge of an animal necessarily makes it familiar and comforting.", "Childhood fear disappears when an observer reaches adulthood.", "The natural world is dangerous only when a person is alone.", "The speaker observes with precision and socializes the creature in language, yet every encounter still produces an involuntary physical chill, whether accompanied or alone."],
  ]);

  addSet({
    id: "po-tyger", unit: "PO", type: "poetry", era: "pre-20th-century",
    title: "“The Tyger” — William Blake",
    source: "Public-domain text: https://en.wikisource.org/wiki/Songs_of_Innocence_and_of_Experience_(1826)/Songs_of_Experience/The_Tyger",
    text: `Tyger Tyger. burning bright,
In the forests of the night;
What immortal hand or eye.
Could frame thy fearful symmetry?

In what distant deeps or skies.
Burnt the fire of thine eyes?
On what wings dare he aspire?
What the hand, dare sieze the fire?

And what shoulder, & what art,
Could twist the sinews of thy heart?
And when thy heart began to beat.
What dread hand? & what dread feet?

What the hammer? what the chain,
In what furnace was thy brain?
What the anvil? what dread grasp.
Dare its deadly terrors clasp!

When the stars threw down their spears
And water'd heaven with their tears:
Did he smile his work to see?
Did he who made the Lamb make thee?

Tyger Tyger burning bright.
In the forests of the night:
What immortal hand or eye.
Dare frame thy fearful symmetry?`,
  }, [
    ["4.A", "The speaker is characterized chiefly by", "awed questioning in the presence of terrifying creative power", "confidence in a complete explanation of the animal's origin", "indifference toward the tiger's physical beauty", "desire to hunt and destroy the tiger", "The speaker asks rather than answers, repeatedly joining admiration for form and energy with dread about the power capable of making them."],
    ["5.B", "The change from “Could frame” in the opening to “Dare frame” in the ending chiefly", "shifts from capacity to moral audacity", "resolves the identity of the creator", "shows that the tiger has become less frightening", "replaces admiration with scientific certainty", "“Could” asks what power was able to create the tiger; “dare” asks what power would risk or presume to do so, deepening rather than resolving the mystery."],
    ["3.C", "The poem's sequence of questions has the cumulative effect of", "expanding inquiry from appearance to creative means and motives", "narrating the tiger's movement through a forest", "suggesting that the tiger emerged without deliberate creation", "cataloguing the animal's prey", "Questions move from hand and eye to cosmic fire, body, forge, and the Lamb, progressively enlarging the problem of creation without supplying an answer."],
    ["4.C", "The direct address to the tiger primarily makes it", "an immediate subject of contemplation", "the speaker capable of answering the poem's questions", "a harmless pet familiar to the speaker", "the narrator of the middle stanzas", "Apostrophe places the tiger before the speaker in vivid imaginative presence, although the questions ultimately concern the unobserved creator."],
    ["4.C", "The speaker's attitude combines", "admiration of form with dread of its maker", "contempt for the tiger with pity for its weakness", "certainty about divine benevolence with casual humor", "scientific curiosity with emotional neutrality", "“Burning bright” and “symmetry” convey beauty and order, while “fearful,” “dread,” and “terrors” register danger and anxiety about creation."],
    ["4.C", "The lack of declarative answers most strongly suggests that the speaker", "treats the tiger as a mystery inquiry deepens", "has forgotten the questions immediately after asking them", "expects the tiger to provide a theological explanation", "believes the questions are unimportant", "The poem's formal insistence on unanswered questions makes wonder and uncertainty its mode; repetition strengthens the problem rather than dismissing it."],
    ["6.B", "The metaphor “burning bright” primarily presents the tiger as", "radiant energy that is both beautiful and dangerous", "an animal literally injured by a fire in the forest", "a source of gentle warmth offered to nearby creatures", "a fixed light intended to guide travelers through the night", "The fire metaphor gives the tiger brilliance, force, and threat against darkness, fitting the poem's union of aesthetic admiration and terror."],
    ["5.D", "The forge imagery in the fourth stanza presents creation as", "violent, skilled labor shaping formidable material", "effortless growth within a peaceful landscape", "a legal judgment delivered by the stars", "an impersonal process whose maker remains unknowable", "Hammer, chain, furnace, anvil, and grasp imagine a maker exerting craft and strength, turning creation into dangerous industrial work."],
    ["6.D", "The question about the maker of “the Lamb” chiefly compares", "gentleness and vulnerability with terrifying strength", "two predators competing in the same forest", "human craftsmanship with animal instinct", "nighttime darkness with daylight", "Invoking the Lamb brings an emblem of innocence and meekness beside the tiger, intensifying the theological problem of one creator encompassing apparent opposites."],
    ["3.D", "The stars' spears and tears juxtapose", "cosmic conflict with grief or awe", "agricultural labor with seasonal rain", "the tiger's prey with its offspring", "human technology with forest growth", "Militarized “spears” suggest struggle or surrender, while tears introduce sorrow or reverence, enlarging the emotional response to creation onto a cosmic scale."],
    ["7.B", "Which claim best captures the poem's treatment of creation?", "Beauty and order can make creative purpose more troubling.", "Beauty proves that creative power is necessarily gentle.", "Destructive strength cannot coexist with formal symmetry.", "The natural world offers simple answers to questions about moral order.", "The tiger's “fearful symmetry” fuses design with terror, and the Lamb comparison makes shared authorship a question rather than a reassuring solution."],
  ]);

  addSet({
    id: "po-thrush", unit: "PO", type: "poetry", era: "20th-century",
    title: "“The Darkling Thrush” — Thomas Hardy",
    source: "Public-domain text: https://en.wikisource.org/wiki/The_Darkling_Thrush",
    text: `I leant upon a coppice gate
When Frost was spectre-gray,
And Winter's dregs made desolate
The weakening eye of day.
The tangled bine-stems scored the sky
Like strings of broken lyres,
And all mankind that haunted nigh
Had sought their household fires.

The land's sharp features seemed to be
The Century's corpse outleant,
His crypt the cloudy canopy,
The wind his death-lament.
The ancient pulse of germ and birth
Was shrunken hard and dry,
And every spirit upon earth
Seemed fervourless as I.

At once a voice arose among
The bleak twigs overhead
In a full-hearted evensong
Of joy illimited;
An aged thrush, frail, gaunt, and small,
In blast-beruffled plume,
Had chosen thus to fling his soul
Upon the growing gloom.

So little cause for carolings
Of such ecstatic sound
Was written on terrestrial things
Afar or nigh around,
That I could think there trembled through
His happy good-night air
Some blessed Hope, whereof he knew
And I was unaware.`,
  }, [
    ["4.A", "The speaker is initially characterized as", "sharing the landscape's exhaustion and lack of fervor", "seeking company beside a crowded household fire", "confident that a new era will bring renewal", "delighted by winter's visual beauty", "The speaker explicitly aligns every spirit with being “fervourless as I,” while the corpse imagery and deserted setting reinforce emotional depletion."],
    ["3.C", "The thrush's song functions as a structural turning point because it", "interrupts a deathly scene with unexplained joy", "confirms the speaker's interpretation of universal despair", "causes winter immediately to change into spring", "introduces a human crowd into the landscape", "“At once” breaks the first half's desolation, and the song's emotional force contradicts the surrounding evidence without physically transforming it."],
    ["6.B", "The first two stanzas develop primarily by", "projecting the ending of a century onto a winter landscape", "describing the speaker's journey from home into a forest", "presenting scientific evidence of ecological decline", "recounting the thrush's earlier life", "Frost, weakening day, broken lyres, corpse, crypt, and lament turn seasonal observation into an imaginative death scene for the century."],
    ["4.C", "The speaker's final admission of being “unaware” chiefly establishes", "humility about the hope the song suggests", "certainty that the bird predicts a specific event", "dismissal of the bird's song as meaningless", "superiority over the thrush's limited knowledge", "The speaker can only “think” the bird knows some hope and openly marks personal unawareness, preserving possibility without claiming revelation."],
    ["4.C", "The attitude toward the thrush is best described as", "astonished respect for joy unsupported by visible circumstances", "mockery of a weak bird singing badly", "envy of the bird's physical strength", "indifference to the song's emotional effect", "The bird is aged and frail, yet its full-hearted song forces the speaker to imagine a hope absent from the observed world."],
    ["4.C", "The phrase “I could think” makes the conclusion", "tentative rather than doctrinally certain", "an objective report of the bird's thoughts", "a rejection of every hopeful interpretation", "a command that readers adopt the speaker's faith", "The modal construction frames blessed Hope as a possible inference prompted by song, not a verified belief or instruction."],
    ["6.C", "The “weakening eye of day” personifies sunset as", "failing vision consistent with age and decline", "a watchful guardian protecting the speaker", "a source of warmth returning to the land", "an artist admiring the tangled vines", "The weakening eye joins diminished light with bodily decline, supporting the century-as-corpse imagery that follows."],
    ["5.D", "The broken-lyre image contributes to the first stanza by suggesting", "a landscape whose capacity for harmony appears damaged", "music that anticipates the thrush's cheerful song", "vines arranged deliberately by a musician", "the speaker's desire to repair an instrument", "Bare stems resemble snapped strings, turning silence and disorder into a visual image that the later living song unexpectedly counters."],
    ["3.D", "The contrast between the thrush's frailty and its “joy illimited” emphasizes", "the singer's weakness against the song's force", "the bird's ignorance of approaching winter", "the speaker's superior physical health", "the certainty that young birds cannot sing", "Aged, gaunt, small, and wind-ruffled describe a weak body, while unlimited joy and flinging its soul convey extraordinary expressive energy."],
    ["5.B", "The “good-night air” and “growing gloom” together associate the song with", "hope voiced rather than darkness overcome", "morning sunlight that has begun to disperse clouds", "a celebration attended by nearby households", "the bird's attempt to call a mate", "Night continues to grow; the song occurs within the ending and does not erase it, which makes its possible hope more paradoxical."],
    ["7.B", "Which interpretation best accounts for the poem's ending?", "The speaker accepts hope without finding proof for it.", "The landscape visibly proves that renewal has already begun.", "The thrush communicates a message whose content the speaker fully understands.", "The speaker concludes that joyful expression is irrational and worthless.", "Nothing terrestrial supplies cause for the song, yet the speaker imagines the possibility of blessed Hope and simultaneously acknowledges remaining unaware."],
  ]);

  addSet({
    id: "po-mask", unit: "PO", type: "poetry", era: "pre-20th-century",
    title: "“We Wear the Mask” — Paul Laurence Dunbar",
    source: "Public-domain text: https://en.wikisource.org/wiki/We_Wear_the_Mask",
    text: `We wear the mask that grins and lies,
It hides our cheeks and shades our eyes,—
This debt we pay to human guile;
With torn and bleeding hearts we smile,
And mouth with myriad subtleties.

Why should the world be over-wise,
In counting all our tears and sighs?
Nay, let them only see us, while
We wear the mask.

We smile, but, O great Christ, our cries
To thee from tortured souls arise.
We sing, but oh the clay is vile
Beneath our feet, and long the mile;
But let the world dream otherwise,
We wear the mask!`,
  }, [
    ["4.C", "The collective speaker's repeated use of “we” primarily", "makes concealment communal rather than private", "identifies every person in the world as equally deceptive", "shows that the speaker is a formal organization", "avoids expressing any emotional pain", "The plural voice binds torn hearts, cries, and performed smiles into a collective experience, while “the world” remains a distinct observing audience."],
    ["4.C", "The direct appeal to Christ in the final stanza marks a shift from", "concealment from society versus disclosure to God", "private sorrow to public celebration", "singing to complete silence", "a collective voice to a single named speaker", "The group lets the world see the mask but directs its true cries to Christ, creating an audience before whom hidden suffering may be spoken."],
    ["5.B", "Repeating the phrase “We wear the mask” chiefly", "returns each disclosure of pain to the speakers' deliberate public concealment", "announces that the speakers have removed the mask before the observing world", "separates the final stanza from the poem's governing idea", "identifies the physical material from which the mask was made", "The repeated words return the poem from hidden hearts and cries to Christ to the public performance, giving concealment verbal and thematic dominance."],
    ["4.C", "The rhetorical question in the second stanza suggests that the speakers", "defensively reject the world's claim to inspect their suffering", "eagerly invite the world to count every tear", "do not experience the pain described in the first stanza", "expect an explicit answer from Christ", "“Why should” and “Nay” challenge the world's entitlement to knowledge and affirm control over what the observers are permitted to see."],
    ["4.C", "The speakers' attitude toward “the world” is best described as", "guarded and distrustful", "openly dependent and confessional", "affectionate and reassuring", "unaware of being observed", "The world is allowed a constructed smile and dream because fuller knowledge is treated as intrusive, establishing distrust and strategic concealment."],
    ["5.B", "The exclamation point in the final refrain most plausibly intensifies", "the force and cost of continuing the declaration", "a joyful decision to abandon concealment", "a request that the world provide a new mask", "uncertainty about whether the mask exists", "After the stanza exposes tortured souls and a vile road, the emphatic refrain sounds both resolute and painful, not celebratory or doubtful."],
    ["6.C", "Personifying the mask as something that “grins and lies” chiefly", "makes the public performance seem active in concealing the speakers' suffering", "turns the mask into a religious object used during communal prayer", "shows that the observing world accurately understands the speakers", "suggests that the disguise itself can cure the pain hidden beneath it", "The personification gives the performed appearance agency: it smiles and deceives while the human faces, tears, and cries remain hidden."],
    ["6.B", "The metaphor of “torn and bleeding hearts” chiefly makes the hidden pain", "viscerally physical in contrast to the visible smile", "minor enough to be repaired through a change in expression", "abstract and intellectually distant from bodily experience", "a literal wound caused by wearing the mask too tightly", "The injury metaphor makes concealed anguish bodily and urgent, sharpening the contradiction between the speakers' suffering and their controlled public smiles."],
    ["3.D", "The contrast between “smile” and “cries” emphasizes", "the division between outward performance and inward experience", "a progression from sorrow to permanent happiness", "the speakers' inability to make any sound", "the world's preference for singing over speech", "The poem repeatedly places cheerful public expressions beside suffering audible only to Christ, making the split central rather than sequentially resolved."],
    ["3.D", "The juxtaposition of singing with “the clay is vile” suggests", "an uplifting appearance maintained during a degrading, difficult journey", "a festival held on fertile farmland", "the speakers' pleasure in the road's physical conditions", "the world's accurate perception of hardship", "Song continues while the ground is vile and the mile long, pairing performed uplift with ongoing hardship that the world is allowed to misread."],
    ["7.B", "Which claim is best supported by the poem?", "Collective concealment can still carry emotional costs.", "Public misunderstanding disappears once private suffering is acknowledged to oneself.", "The speakers conceal pain because they are unable to describe it.", "The world responds compassionately whenever suffering becomes visible.", "The speakers articulate pain clearly to Christ and readers, yet deliberately maintain the mask before a distrusted world; torn hearts and tortured souls show the strategy's cost."],
  ]);

  addSet({
    id: "po-uphill", unit: "PO", type: "poetry", era: "pre-20th-century",
    title: "“Up-Hill” — Christina Rossetti",
    source: "Public-domain text: https://en.wikisource.org/wiki/Poems_(Rossetti%2C_1901)/Up-Hill",
    text: `Does the road wind up-hill all the way?
Yes, to the very end.
Will the day's journey take the whole long day?
From morn to night, my friend.

But is there for the night a resting-place?
A roof for when the slow dark hours begin.
May not the darkness hide it from my face?
You cannot miss that inn.

Shall I meet other wayfarers at night?
Those who have gone before.
Then must I knock, or call when just in sight?
They will not keep you standing at that door.

Shall I find comfort, travel-sore and weak?
Of labour you shall find the sum.
Will there be beds for me and all who seek?
Yea, beds for all who come.`,
  }, [
    ["4.A", "The questioning speaker is characterized primarily by", "anxiety about endurance, direction, and eventual welcome", "confidence that the journey will be easy", "resentment toward other travelers", "certainty that no resting place exists", "Questions repeatedly seek assurance about length, visibility, admission, and comfort, while the answers acknowledge hardship but promise a destination."],
    ["4.C", "Across the poem, the questions move from concern about", "the difficulty of travel to the conditions of arrival and rest", "the identity of the guide to the origin of the road", "daylight weather to agricultural work", "solitary travel to a decision to turn back", "The first stanza asks how long and hard the road is; later stanzas ask about the inn, prior wayfarers, entry, comfort, and beds."],
    ["3.C", "The regular alternation of question and answer chiefly creates", "a dialogue pairing fear with reassurance", "a debate in which neither speaker listens", "a narrative told entirely in retrospect", "an argument that grows increasingly hostile", "Each anxious question is immediately answered by a calm voice, producing patterned reassurance without denying the climb or full day's labor."],
    ["5.B", "Addressing the questioner as “my friend” primarily establishes the answering voice as", "companionable and gently authoritative", "impatient with repeated questions", "unfamiliar with the road", "dependent on the questioner for directions", "The warm address accompanies concise, certain answers, suggesting both care and knowledge rather than irritation or dependence."],
    ["4.C", "The answering speaker's attitude toward the journey is", "realistic about effort but confident about refuge", "dismissive of the traveler's weakness", "uncertain whether the inn can be found", "fearful that there will not be enough room", "The climb lasts all day and leaves the traveler sore, yet the guide repeatedly assures visibility, admission, and beds for all who arrive."],
    ["4.C", "The phrase “You cannot miss that inn” most strongly conveys", "certainty that darkness cannot conceal the destination", "a command that the traveler avoid resting", "surprise that the inn is poorly marked", "criticism of the traveler's eyesight", "It directly answers whether darkness may hide the resting place and presents the destination as reliably discoverable rather than blaming the questioner."],
    ["6.B", "The extended metaphor of the “up-hill” road most plausibly represents", "a demanding life or spiritual journey toward final rest", "a brief recreational walk that the traveler completes at noon", "economic competition among several neighboring innkeepers", "a route intentionally designed to exclude physically weak travelers", "The whole-day journey, night, those gone before, labor's sum, and universal beds extend the comparison between travel and a life moving toward death or spiritual rest."],
    ["5.B", "The “slow dark hours” chiefly give night a sense of", "extended uncertainty for which shelter is needed", "quick celebration after an effortless journey", "danger created by other wayfarers", "comic confusion about the time", "“Slow” stretches darkness into an experience the tired traveler fears, making the promised roof emotionally necessary."],
    ["3.D", "The contrast between the arduous road and the welcoming inn emphasizes", "effort answered by rest and acceptance", "travel undertaken without any destination", "a reward reserved for the first traveler", "the superiority of daylight over every form of darkness", "The poem never removes labor but repeatedly pairs it with a certain refuge, open door, comfort, and enough beds for all who seek."],
    ["6.B", "“Those who have gone before” compares the traveler with", "earlier wayfarers who have completed the same journey", "guides who abandoned the road midway", "strangers traveling in the opposite direction", "innkeepers who have never traveled", "The phrase reassures the questioner that arrival joins a prior community, situating the individual journey within a shared human path."],
    ["7.B", "Which interpretation best fits both the hardship and reassurance in the poem?", "Rest gives meaning to struggle without denying its duration.", "A worthy destination makes fatigue impossible during the journey.", "Only travelers who ask no questions are admitted to the inn.", "Uncertainty is resolved by turning away from the uphill road.", "The guide confirms a full-day climb and weariness while assuring refuge. The poem comforts by placing hardship within a meaningful destination, not by denying it."],
  ]);

  // Longer fiction/drama: nine-question sets sized to produce a 9/55 draw.
  addSet({
    id: "ld-clock", unit: "LD", type: "longer-drama", era: "contemporary",
    title: "The Late Clock (original one-act drama excerpt)", source: "Original drama created for AP Exam Practice.",
    text: `[A town-council chamber. Through the high window, the courthouse clock shows 8:17. The room clock shows 8:05.]

MAYOR: We will begin precisely on time.

CLERK: Which time, Madam Mayor?

MAYOR: The official time.

CLERK: The courthouse clock is official.

MAYOR: The courthouse clock is twelve minutes fast.

CLERK: It has been twelve minutes fast since 1974. The historical commission considers the error a feature.

MAYOR: Then use the room clock.

CLERK: Public Works set that one twelve minutes slow so employees would stop relying on the courthouse clock.

MAYOR: Then employees arrive at the same moment by two different mistakes.

CLERK: Not quite. Visitors use the courthouse clock. Employees use the room clock. The custodian uses his telephone.

MAYOR: Which one opens the building?

CLERK: The custodian.

MAYOR: At least one system is accurate.

CLERK: His telephone is five minutes fast. He dislikes being hurried.

[MR. PIKE enters, breathing hard.]

PIKE: I object to the meeting starting early.

MAYOR: It has not started.

PIKE: The clock says it has.

CLERK: That clock is historical.

PIKE: So am I, increasingly.

[He compares a pocket watch with both clocks, shakes it, and holds it to his ear.]

PIKE: My father set this by the courthouse every Monday. He was late to work for thirty years and early to supper.

MAYOR: That does not recommend the arrangement.

PIKE: It recommends consistency.

MAYOR: Sit down, Mr. Pike. The first item is funding to repair the courthouse clock.

PIKE: Repair it? You mean make it inaccurate in a new way?

CLERK: The proposed mechanism would keep accurate time.

[All three look uneasily at the high window.]

MAYOR: Would the face look different?

CLERK: No.

PIKE: Would people know?

CLERK: Eventually.

MAYOR: Put the item last. We need time to consider it.`,
  }, [
    ["1.A", "The Mayor is characterized chiefly as", "concerned with orderly authority but uneasy about changing a familiar inconsistency", "unaware that either clock is inaccurate", "determined to replace the clock regardless of public opinion", "indifferent to whether meetings begin on schedule", "She insists on official precision yet postpones the accurate mechanism once change becomes real, exposing tension between administrative order and comfort with tradition."],
    ["1.C", "The Clerk functions primarily as", "a literal-minded expositor whose facts reveal the town's accumulated absurdities", "an antagonist secretly responsible for breaking both clocks", "a sentimental defender who opposes accurate time", "a silent observer with no effect on the action", "The Clerk calmly explains each contradictory adjustment and the repair proposal, allowing bureaucratic history to generate the comedy without personally advocating deception."],
    ["2.B", "The two visible clocks contribute most directly to", "a setting where competing versions of official reality are physically present", "a conflict between the council's public and private schedules", "evidence that the clocks serve different official departments", "a historical contrast between civic and household timekeeping", "The contradictory clocks materialize the council's problem: official signals have been adjusted around one another until no shared time is straightforward."],
    ["3.E", "The proposal for an accurate mechanism is the scene's turning point because it", "turns comic error into a choice about tradition", "reveals that the courthouse clock once kept accurate time", "causes Mr. Pike to leave the chamber", "resolves which clock governs the meeting", "Before the proposal, characters navigate the absurd system; a genuine repair forces them to confront whether they want the familiar error removed."],
    ["3.E", "The final decision to put the item last chiefly", "returns the scene's time problem in the form of procrastination", "shows that the Mayor has calculated the meeting length", "suggests the repair has enough support to pass later", "introduces a new conflict about funding", "“Need time” turns a clock repair into delayed action, providing comic closure by reproducing the very disorder the agenda item could solve."],
    ["1.E", "The stage direction in which all three look uneasily at the window indicates", "shared attachment to the familiar clock despite their complaints", "fear that the clock will fall into the chamber", "certainty that residents demand immediate repair", "confusion about where the courthouse is located", "Their silent reaction appears only when accuracy is proposed, revealing an emotional investment that their earlier practical criticism did not acknowledge."],
    ["5.C", "A defensible interpretation of the clock is that it represents", "institutional adaptation turning error into tradition", "technological progress welcomed without reservation", "the unavoidable difference between public and private morality", "a natural cycle beyond human control", "The town has built other procedures around the error, labeled it historical, and becomes uneasy when an invisible correction is offered."],
    ["7.D", "Which detail best supports the scene's satire of bureaucracy?", "Public Works offsets one fast clock with another slow clock.", "Mr. Pike arrives while breathing hard.", "The council chamber has a high window.", "The proposed mechanism will leave the clock face unchanged.", "Rather than correct the first problem, one department creates an opposing error, an exaggerated example of procedure multiplying around an accepted defect."],
    ["7.C", "The scene's comic effect depends most on the tension between", "precise language despite accepted systematic error", "the Mayor's youth and Mr. Pike's age", "the courthouse exterior and council chamber furniture", "the cost of repairs and the Clerk's salary", "Claims about official time, punctuality, and accurate mechanisms repeatedly collide with clocks intentionally fast or slow and with postponement of the only true repair."],
  ]);

  addSet({
    id: "ld-kitchen", unit: "LD", type: "longer-drama", era: "contemporary",
    title: "Second Service (original drama excerpt)", source: "Original drama created for AP Exam Practice.",
    text: `[After closing in a small restaurant kitchen. ANA labels containers. Her father, LUIS, scrubs an already clean pan.]

ANA: The bank wants an answer Friday.

LUIS: Banks like Fridays. It gives them the weekend to feel patient.

ANA: The offer pays the debt.

LUIS: The offer turns the dining room into a pharmacy.

ANA: A pharmacy that pays the debt.

LUIS: Your mother chose every tile in that room.

ANA: And then spent twenty years complaining that grease showed on every one.

[ANA lifts a loose tile sample from a shelf. On its back, a date and three initials are written in pencil.]

LUIS: She kept that because the glaze is discontinued.

ANA: She kept it because Mateo broke the first one carrying stock pots.

LUIS: Same thing, after enough years.

ANA: No. One is inventory. One is a story.

LUIS: You say that as if stories take less room.

[LUIS holds the pan toward the light.]

LUIS: This one is not clean.

ANA: It has not been this clean since I was nine.

LUIS: Your brother may come back.

ANA: Mateo has lived in Denver for eleven years.

LUIS: He called last Tuesday.

ANA: He called to ask whether we had signed.

LUIS: He asked about my back.

ANA: After he asked whether the offer included the parking lot.

LUIS: Denver has roads leading out.

ANA: So does this town.

[LUIS sets down the pan.]

LUIS: You want to go?

ANA: I want the choice to stay without owing everyone for it.

LUIS: That sounds like going with extra words.

ANA: It sounds like you asking the building to be the family.

[The refrigerator motor stops. In the sudden quiet, both turn toward it.]

LUIS: It does that.

ANA: I know. I grew up here.

[She opens the refrigerator. Its light comes on.]

ANA: Still cold.

LUIS: For now.`,
  }, [
    ["1.A", "Ana's statement about wanting “the choice to stay” reveals that she", "separates choice from debt-enforced obligation", "has already decided to move to Denver", "cares only about maximizing the sale price", "believes the restaurant has no emotional significance", "Ana does not reject staying; she rejects a form of staying made compulsory by debt and family pressure, which explains both her practical and emotional argument."],
    ["1.C", "Luis and Ana are contrasted primarily through their responses to", "the restaurant as inherited memory versus a present financial responsibility", "whether the kitchen equipment is physically clean", "Mateo's exact route from Denver", "the quality of the food served that evening", "Luis invokes tiles, Ana's mother, Mateo, and the family; Ana repeatedly returns to debt, choice, and the costs of making the building carry those memories."],
    ["2.B", "The closed kitchen setting intensifies the conflict because it", "surrounds them with objects they interpret differently", "allows restaurant customers to interrupt their private disagreement", "proves the building can easily become a pharmacy", "places the family far from any reminder of debt", "Containers, pan, tiles, and refrigerator make the inheritance tangible while the private after-hours space lets practical work and family argument merge."],
    ["3.E", "The refrigerator's sudden silence functions as a turning point by", "replacing argument with shared fear", "suggesting the refrigerator failure will force an immediate sale", "causing Ana to withdraw the bank offer", "revealing that Luis has deliberately unplugged it", "Both characters turn together, and the mechanical uncertainty briefly embodies the larger question of how long the restaurant can continue."],
    ["3.D", "The final exchange “Still cold” / “For now” chiefly", "reduces conflict to present function versus future survival", "settles the sale in Ana's favor", "shows that Luis no longer values the restaurant", "introduces evidence that the food has spoiled", "Ana verifies the immediate condition; Luis answers with temporal uncertainty. The lines preserve both practical fact and emotional reluctance without resolving the decision."],
    ["1.E", "Luis's jokes about Fridays and roads primarily", "deflect direct engagement while revealing his resistance", "demonstrate that he does not understand Ana's statements", "show that he wants Mateo to remain in Denver", "provide factual information about banking and transportation", "The witty replies avoid the underlying debt and abandonment concerns, but their direction—against the offer and toward possible return—makes his resistance clear."],
    ["5.C", "The repeatedly scrubbed pan can reasonably be interpreted as", "Luis's attempt to preserve control through familiar labor", "evidence that Ana overlooks the restaurant's daily labor", "a sign that the restaurant has many customers waiting", "evidence that the bank requires an equipment inspection", "Luis works beyond practical necessity while resisting the sale, turning an ordinary task into a manageable substitute for the decision he cannot cleanly resolve."],
    ["7.D", "Which detail most strongly supports the claim that Ana's practicality does not erase her attachment?", "She claims familiarity from growing up in the restaurant.", "She repeats that the offer will pay the debt.", "She notes that Mateo has lived away for eleven years.", "She labels containers after the restaurant closes.", "The line “I know. I grew up here” asserts intimate knowledge and history even as Ana checks the failing equipment, complicating any view of her as merely financial."],
    ["7.C", "The scene presents the sale chiefly as a conflict between", "preserving place-bound memory versus family agency", "two equally profitable commercial uses for the building", "Ana and Mateo over who should inherit the restaurant", "cleanliness standards and customer preferences", "Luis treats the building as the family's material continuity; Ana argues that making it carry the family can trap its members, so both positions concern preservation in different forms."],
  ]);

  addSet({
    id: "ld-orbit", unit: "LD", type: "longer-drama", era: "contemporary",
    title: "The Assistant's Name (original drama excerpt)", source: "Original drama created for AP Exam Practice.",
    text: `[An observatory office, 1936. DR. VALE signs copies of a journal. RUTH enters carrying photographic plates.]

RUTH: The editor removed the table credit.

VALE: He shortened everything.

RUTH: He shortened my name.

VALE: The paper thanks “observatory staff.”

RUTH: The staff did not measure twelve hundred spectra.

VALE: The editor knows who works here.

RUTH: The reader does not. Nor will the next assistant who is told the table appeared by itself.

VALE: Readers want the result, not the room in which it was made.

RUTH: Then stop printing the room's director on every result.

VALE: The result is what matters.

RUTH: Then why is your name three times on the first page?

[VALE caps his pen.]

VALE: Because I can get the next paper printed.

RUTH: With whose table?

VALE: With yours, if the editor accepts it. Without a recognized author he may not read far enough to reach the numbers.

RUTH: Then put both names where he cannot avoid either one.

VALE: You think a second name changes the door.

RUTH: I think leaving it off teaches the door whom to admit.

VALE: Sit down. The new plates may show the companion star.

RUTH: I saw it in August.

VALE: You saw a flaw in August.

RUTH: I checked the emulsion, the lens, and the tracking. You called it a flaw before you looked.

VALE: And if you are wrong?

RUTH: Put my name beside the error.

[She places one plate over a signed journal. A small dark line crosses the printed title.]

VALE: You know the board will not appoint a woman to my chair.

RUTH: I am asking for my work, not your chair.

VALE: In this building they are the same request.

RUTH: Only because you keep answering both with your name.`,
  }, [
    ["1.A", "Ruth is characterized chiefly by her insistence that", "credit should make individual responsibility for work and error visible", "Dr. Vale should surrender his position immediately", "publication matters more than the accuracy of the observations", "the companion star has already been accepted by the editor", "Her key proposal is to place her name even beside a possible error, showing that she seeks accountable attribution rather than status without risk."],
    ["1.C", "Vale and Ruth differ most clearly in that Vale treats authorship as", "institutional leverage, whereas Ruth treats it as responsibility for intellectual labor", "a minor typographical matter, whereas Ruth treats it as a salary dispute", "evidence of certainty, whereas Ruth refuses to test her observation", "a private honor, whereas Ruth wants to conceal her work", "Vale defends his name because it gets papers printed; Ruth connects naming with who measured, interpreted, and should own either discovery or mistake."],
    ["2.B", "The 1936 observatory setting is significant chiefly because it", "places the credit dispute within institutional barriers Vale invokes against Ruth", "places the scientific dispute within the technical limits of early photography", "frames the editor's decision as a conventional preference about article length", "makes the possible companion star irrelevant to the conflict", "Vale explicitly cites the board's refusal to appoint a woman, turning the workplace and period into forces shaping whose name can carry scientific authority."],
    ["3.E", "Ruth's line “Put my name beside the error” is the turning point because it", "answers Vale's caution by accepting the risk that comes with recognition", "concedes that her observation is merely a damaged plate", "asks Vale to remove his own name from the paper", "changes the discussion from authorship to salary", "The line defeats the suggestion that she wants credit only if correct; she claims both accountability and recognition, clarifying the ethical basis of her demand."],
    ["5.D", "Placing the plate over the signed journal visually", "sets Ruth's observational evidence across Vale's printed authority", "risks damaging the clearest record of the possible star", "shows that the journal page and plate are identical", "signals that Ruth has accepted the editor's decision", "The dark line crossing the title creates a stage image of data interrupting an authorship system dominated by Vale's repeated name."],
    ["3.D", "Vale's statement that the result is what matters is undercut most directly by", "Ruth's observation that his own name appears repeatedly", "the editor's decision to shorten the paper", "the possibility that the plate contains a flaw", "the board's control over appointments", "If results alone mattered, Vale's prominent attribution would be irrelevant. Ruth exposes the inconsistency between his general principle and personal credit."],
    ["1.E", "Ruth's return to the possible companion star chiefly reveals her", "insistence that consequential work be examined rather than dismissed by authority", "willingness to conceal observations whenever publication may be difficult", "belief that institutional credit matters more than scientific accuracy", "confidence that documented work will eventually earn institutional recognition", "Ruth has tested several possible sources of error and demands accountable review. Her persistence joins scientific care with resistance to Vale's reflexive dismissal."],
    ["7.D", "Which evidence best supports an interpretation that Vale sees himself as protecting access rather than simply taking credit?", "His name can secure publication of their next paper.", "He caps his pen after Ruth mentions the first page.", "He calls the August observation a flaw.", "He tells Ruth to sit down.", "The publication argument presents his authority as instrumental for future work, complicating—but not erasing—the self-serving effect of excluding Ruth."],
    ["7.C", "The final exchange reveals that the deepest conflict concerns", "whether power should reproduce or challenge unequal recognition", "whether the companion star exists in the photographed region", "which person will physically occupy Vale's chair", "whether the editor shortened other parts of the article", "Vale treats Ruth's credit as inseparable from a barred appointment and therefore impossible; Ruth argues that his repeated acceptance of that logic helps sustain it."],
  ]);

  window.QUESTIONS_AP_ENGLISH_LITERATURE = QUESTIONS;
})();
