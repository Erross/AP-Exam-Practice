// AP African American Studies — required-source conversion batch 2.
// Clean-room Unit 2 review: replace two generic synthetic source identities with
// especially useful required-source anchors. Student text remains original
// summary/description; no copyrighted passage is reproduced.
(() => {
  "use strict";
  const bank = window.QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES;
  if (!Array.isArray(bank) || bank.length === 0) return;

  const upgrades = {
    "2.17": {
      title: "Black Seminole sources: Gen. Thomas Sidney Jesup diary entry (1836) and portraits of Abraham and Gopher John (1863)",
      sourceKind: "mixed",
      text: "Required sources for this topic document Black Seminole leadership, Black-Seminole alliances, and the U.S. military campaign against Seminoles and their Black allies. Read together, they show that Black-Indigenous relations included refuge, kinship, military cooperation, removal, and contested freedom rather than one uniform pattern.",
      q1: ["Which interpretation is best supported by considering the Black Seminole sources together?", "Some African American freedom seekers built kinship and military alliances with Seminoles, while U.S. removal campaigns targeted those communities and their Black allies.", ["Black-Indigenous relations in the nineteenth-century South were characterized mainly by conflict between Black and Indigenous people.", "Black Seminoles appear chiefly as dependents rather than as leaders or participants in the sources.", "The Second Seminole War can be understood largely apart from struggles over slavery, refuge, and removal."], "The sources make both Black agency and coercive removal visible. They support a history of alliance, refuge, leadership, and conflict with U.S. authorities, not a one-dimensional story of Black-Indigenous relations.", "2.A"],
      q2: ["Why does the perspective of Jesup's military account matter when using it as evidence?", "Because an officer conducting the campaign against Seminoles and their Black allies recorded events from the perspective of U.S. military removal objectives.", ["Because military officers could not observe any factual events during campaigns in which they participated.", "Because the account should automatically be accepted over Black Seminole evidence due to its official status.", "Because perspective matters only for literary sources and not for military documents."], "Jesup's account can contain valuable evidence while also reflecting the aims and assumptions of the U.S. military campaign. Source analysis asks students to use the evidence while considering creator, purpose, and context.", "2.C"],
      q3: ["Which additional evidence would best broaden the analysis beyond the U.S. military perspective?", "Black Seminole testimony, portraits with biographical context, tribal records, or petitions concerning Black freedom and belonging in Indigenous communities.", ["Another copy of the same military diary with no new context.", "A document about an unrelated northern factory with no connection to Black-Indigenous relations.", "A modern claim that assumes all Indigenous nations had identical relationships with slavery."], "Evidence created by or about Black Seminoles and Indigenous communities can be compared with U.S. military records to recover perspectives, institutions, and experiences that an official campaign account may not capture.", "3.C"],
    },
    "2.22": {
      title: "Harriet Jacobs, Incidents in the Life of a Slave Girl (1861), and Mary Prince, The History of Mary Prince (1831)",
      sourceKind: "text",
      text: "Required excerpts from Jacobs and Prince describe enslavement from Black women's perspectives, including family separation, domestic labor, sexual vulnerability, bodily autonomy, escape, and resistance. Their narratives also functioned as abolitionist testimony shaped by nineteenth-century expectations about gender and respectability.",
      q1: ["Which comparison is most defensible when reading the Jacobs and Prince narratives together?", "Both expose gendered forms of exploitation under slavery while showing Black women making choices and resisting within severe legal and social constraints.", ["Both argue that gender had no effect on the experience or representation of enslavement.", "Both present enslaved women as unable to exercise any form of agency or resistance.", "Both narratives can be treated as identical accounts of slavery because their authors were Black women."], "Jacobs and Prince document gendered vulnerability but also resistance and agency. Comparison should identify shared themes without erasing differences in place, biography, audience, and the particular forms of enslavement each author experienced.", "1.C"],
      q2: ["How did gender shape the political force of these slave narratives?", "Their accounts made sexual exploitation, family vulnerability, domestic life, and threats to motherhood visible within abolitionist arguments about slavery's violence.", ["Gender made the narratives politically irrelevant because abolition concerned only legal status.", "Their narratives avoided family and sexual exploitation because nineteenth-century readers already understood those experiences fully.", "The authors used gendered experience to argue that slavery was acceptable when family ties were preserved."], "Black women's narratives exposed forms of violence and vulnerability that legal and political discourse often obscured. Those experiences strengthened abolitionist arguments and also intersected with emerging debates over women's rights and bodily autonomy.", "1.B"],
      q3: ["Which source-analysis caution is most appropriate when using either narrative?", "A first-person narrative offers powerful evidence about an author's experience and argument, but it should be contextualized rather than treated as statistically representative of every enslaved woman.", ["Personal experience can introduce perspective that requires contextual analysis alongside its evidentiary value.", "Direct experience strengthens a narrative's evidentiary value but does not remove the need to analyze audience and purpose.", "A single narrative may illuminate recurring forms of resistance without establishing their frequency across slave societies."], "First-person narratives are indispensable evidence, but their value comes from careful contextualization of authorship, purpose, audience, place, and experience—not from assuming one life represents an entire population.", "2.B"],
    },
  };

  function setQuestion(q, spec, offset) {
    const [stem, correct, distractors, rationale, skill] = spec;
    const pos = (offset + q.topicCode.length) % 4;
    const options = distractors.slice();
    options.splice(pos, 0, correct);
    q.q = stem; q.o = options; q.c = [pos]; q.e = rationale; q.skill = skill;
  }

  Object.entries(upgrades).forEach(([topicCode, spec], gi) => {
    const group = bank.filter((q) => q.topicCode === topicCode).sort((a,b) => a.sequence - b.sequence);
    if (group.length < 3) throw new Error(`${topicCode}: expected source group`);
    const stimulus = {
      type: "text",
      title: spec.title,
      text: spec.text,
      source: `${spec.title}. Required source material in the AP African American Studies course framework; student-facing text here is an original summary/description for this unofficial practice bank.`,
      sourceKind: spec.sourceKind,
      requiredSource: true,
    };
    group.forEach((q) => { q.stimulus = stimulus; });
    [spec.q1, spec.q2, spec.q3].forEach((s, i) => setQuestion(group[i], s, gi * 3 + i));
  });
})();
