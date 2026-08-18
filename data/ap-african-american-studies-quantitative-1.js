// AP African American Studies — original synthetic quantitative source sets.
// Values are deliberately constructed for source-analysis practice and are not
// presented as historical measurements.
(() => {
  "use strict";
  const bank = window.QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES;
  if (!Array.isArray(bank) || bank.length === 0) return;

  const sets = {
    "1.2": {
      title: "Illustrative climate-zone comparison",
      columns: ["Zone", "Illustrative annual rainfall index", "Illustrative settlement density index"],
      rows: [["Desert", 1, 1], ["Sahel", 3, 3], ["Savanna", 6, 6], ["Rainforest", 9, 4]],
      q1: ["Which pattern is most clearly shown by the synthetic table?", "The highest rainfall index does not correspond to the highest settlement-density index.", ["Settlement density rises proportionally with rainfall across the displayed zones.", "The desert has both the highest rainfall and the highest settlement-density index.", "The four zones display roughly comparable settlement-density values despite their rainfall differences."], "The rainforest has the highest rainfall index (9), while the savanna has the highest settlement-density index (6). The table therefore does not support a simple one-to-one relationship between rainfall and settlement density.", "2.D"],
      q2: ["Which conclusion would go beyond what these synthetic data can establish?", "Climate alone determined where African population centers developed.", ["The table shows different illustrative conditions across the four zones.", "The savanna has a higher settlement-density index than the rainforest in this constructed example.", "Additional evidence about rivers, soils, trade, and agriculture would be needed to explain settlement patterns."], "The table provides two constructed indicators, not a causal experiment. African settlement patterns cannot be explained from climate alone without evidence about water routes, agriculture, trade, technology, and other factors.", "1.B"],
      q3: ["How does this source best connect to the course topic?", "It illustrates why Africa's varied landscapes created different opportunities and constraints while avoiding environmental determinism.", ["It suggests geography largely predetermined the political development of African societies.", "It portrays the displayed regions as sharing broadly similar ecological conditions before Atlantic contact.", "It implies climate variation sharply limited exchange among African regions."], "The course treats geography as one important context shaping opportunities for settlement and exchange, not as a mechanical cause that predetermines social or political outcomes.", "1.D"],
    },
    "2.2": {
      title: "Synthetic embarkation-and-destination practice data",
      columns: ["Departure region", "Voyages to Destination A", "Voyages to Destination B"],
      rows: [["Upper Guinea", 18, 9], ["Bight region", 11, 16], ["West Central Africa", 25, 21], ["Southeast Africa", 4, 6]],
      q1: ["Which departure region has the largest combined number of voyages in the synthetic table?", "West Central Africa, with 46 combined voyages.", ["Upper Guinea, with 27 combined voyages.", "Bight region, with 27 combined voyages.", "Southeast Africa, with 10 combined voyages."], "Adding the two destination columns gives 27, 27, 46, and 10. West Central Africa therefore has the largest combined value in this constructed data set.", "2.D"],
      q2: ["Which inference is most defensible from the table alone?", "The represented destinations received voyages from more than one African departure region.", ["West Central Africa supplied a clear majority of the voyages represented in the table.", "The same regional distribution persisted across successive decades of the slave trade.", "Differences between the two destination columns primarily reflect cultural preferences."], "All four rows contain a positive value for at least one destination, so multiple regions are represented. The table does not establish universal proportions, causes, or stability across time.", "2.D"],
      q3: ["Why are departure-zone data important to African American Studies?", "They help connect the forced migration of enslaved people to the diversity of West and West Central African societies that contributed to African American ancestry and culture.", ["They support treating one departure region as the dominant cultural origin of African American life.", "They make the experiences of captives after embarkation less important than regional origin.", "They suggest regional origins contributed little to cultural diversity among enslaved Africans."], "Departure-zone evidence helps recover the varied African origins of people forced into the Atlantic slave trade, while remaining only one part of a larger analysis of enslavement, culture, and diaspora.", "1.D"],
    },
    "3.2": {
      title: "Synthetic family-reunification notice sample",
      columns: ["Notice type", "Sample count"],
      rows: [["Seeking parent", 18], ["Seeking child", 24], ["Seeking spouse", 15], ["Seeking sibling", 21]],
      q1: ["Which relationship appears most often in this synthetic sample?", "Seeking a child, with 24 notices.", ["Seeking a parent, with 18 notices.", "Seeking a spouse, with 15 notices.", "Seeking a sibling, with 21 notices."], "The largest count in the sample is 24 for notices seeking a child.", "2.D"],
      q2: ["Which limitation is most important when interpreting this table?", "A sample of notices cannot by itself measure how often each kind of family separation occurred across the entire formerly enslaved population.", ["The table offers little evidence that separated family members searched for one another.", "The use of raw counts makes comparison among the listed relationship categories unreliable.", "The four categories indicate that the Freedmen's Bureau produced most reunification notices."], "The table describes a constructed sample. Even a real notice collection would reflect who placed notices and what survived in the archive, so it could not automatically represent all family separations.", "2.D"],
      q3: ["How does the pattern connect to the meaning of freedom after emancipation?", "Reuniting families separated by slavery was one way freedpeople exercised autonomy and rebuilt social life after emancipation.", ["Legal emancipation quickly resolved most family separations created under slavery.", "Family searches suggest freedpeople generally preferred federal institutions to their own kinship networks.", "The notices suggest family separation became primarily a postwar problem rather than a legacy of slavery."], "Freedom involved more than a change in legal status. Freedpeople pursued family reunification, legal recognition, education, work, and community building as concrete parts of post-emancipation life.", "1.C"],
    },
    "4.16": {
      title: "Synthetic contemporary Black-community survey",
      columns: ["Respondent group", "U.S.-born (%)", "Foreign-born (%)", "Reports Protestant affiliation (%)"],
      rows: [["Ages 18–29", 82, 18, 42], ["Ages 30–49", 79, 21, 51], ["Ages 50+", 88, 12, 68]],
      q1: ["Which pattern is shown by the constructed survey?", "Reported Protestant affiliation rises across the three age categories shown.", ["Foreign-born share rises steadily across the three age categories shown.", "The age groups have nearly the same U.S.-born share despite their religious differences.", "The youngest group has the highest reported Protestant affiliation."], "The Protestant-affiliation values are 42%, 51%, and 68%, increasing across the displayed age categories. The foreign-born percentages do not increase monotonically.", "2.D"],
      q2: ["Which conclusion is supported without treating Black communities as homogeneous?", "The table illustrates variation by age and nativity within a population that is often discussed as a single racial category.", ["The respondents show broadly similar migration histories and religious identities across age groups.", "Age is sufficient to explain the differences in religious affiliation shown in the table.", "Nativity contributes little to the diversity visible within contemporary Black communities."], "The table's purpose is to make internal diversity visible. It does not justify reducing variation to one cause or treating one subgroup as representative of all Black communities.", "1.C"],
      q3: ["Why is internal diversity a significant course concept?", "African American Studies examines differences of national origin, generation, region, class, religion, and migration history alongside shared experiences of racialization.", ["The discipline tends to treat racial identity as more important than differences within Black communities.", "Studying subgroup differences weakens analysis of racism and institutions shared across Black communities.", "Contemporary diversity is most relevant to immigration topics rather than to broader areas of Black life."], "African American Studies can analyze common structures and identities while also examining substantial differences within Black communities. Those approaches are complementary rather than mutually exclusive.", "1.D"],
    },
  };

  function setQuestion(q, spec, sequence) {
    const [stem, correct, distractors, rationale, skill] = spec;
    const pos = (sequence + q.topicCode.length) % 4;
    const options = distractors.slice();
    options.splice(pos, 0, correct);
    q.q = stem;
    q.o = options;
    q.c = [pos];
    q.e = rationale;
    q.skill = skill;
  }

  Object.entries(sets).forEach(([topicCode, spec]) => {
    const group = bank.filter((q) => q.topicCode === topicCode).sort((a, b) => a.sequence - b.sequence);
    if (group.length < 3) throw new Error(`${topicCode}: quantitative overlay expected a source group`);
    const stimulus = {
      type: "quantitative",
      title: spec.title,
      columns: spec.columns,
      rows: spec.rows,
      source: "Original simulated data created for AP Exam Practice; values are constructed for source-analysis practice and are not historical statistics.",
      requiredSource: false,
      sourceKind: "data",
    };
    group.forEach((q) => { q.stimulus = stimulus; });
    setQuestion(group[0], spec.q1, 1);
    setQuestion(group[1], spec.q2, 2);
    setQuestion(group[2], spec.q3, 3);
  });
})();
