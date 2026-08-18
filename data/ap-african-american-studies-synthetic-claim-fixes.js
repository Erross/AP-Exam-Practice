// AP African American Studies — independent-review final semantic repair overlay.
(() => {
  "use strict";
  const bank = window.QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES;
  if (!Array.isArray(bank) || bank.length === 0) return;

  const paraphrases = {
    "1.1": "The field draws on multiple disciplines to analyze Black life, culture, institutions, identity, and power rather than relying on a single method.",
    "2.1": "African participation in early American exploration and colonial encounters included varied roles that predated the later dominance of plantation slavery in many colonies.",
    "2.3": "The Atlantic trade in captives intensified conflict and population disruption in some West African regions, although its effects differed across societies and periods.",
    "2.6": "Enslaved people produced substantial economic value in many kinds of labor while simultaneously sustaining skills, communities, and cultural practices under coercion.",
    "2.8": "Racial hierarchy became durable partly because colonial and U.S. institutions made ancestry legally consequential and reproduced status across generations.",
    "2.9": "African American cultural traditions emerged through continuity, exchange, adaptation, and new creation rather than through either perfect preservation or total cultural loss.",
    "2.10": "Changes in collective naming reveal shifting Black debates about ancestry, citizenship, dignity, political strategy, and belonging.",
    "2.13": "Opposition to slavery ranged from everyday refusal and escape to conspiracy and revolt, demonstrating that enslaved people did not simply accept bondage.",
    "2.15": "Maroon communities created varying degrees of autonomy through difficult terrain, local knowledge, collective defense, and organized community life beyond direct slaveholder control.",
    "2.16": "Brazil and the United States shared Atlantic systems of slavery but developed important differences in law, demography, manumission, racial classification, and emancipation.",
    "2.23": "Black self-emancipation, military service, labor, intelligence, and political pressure made African Americans active participants in turning the Civil War into a struggle over emancipation.",
    "3.3": "Formal freedom after the Civil War did not automatically deliver economic independence because Black Codes, labor arrangements, and unequal land access constrained freedpeople's choices.",
    "3.9": "Black-led institutions under segregation supplied community resources while also creating networks, leadership, information, and organizational power for collective action.",
    "3.10": "HBCUs and Black Greek-letter organizations expanded education and professional opportunity while building durable networks for service, leadership, and institution building.",
    "3.13": "Harlem Renaissance writers used Africa in multiple ways—including ancestry, symbolism, political connection, imagined homeland, and modern subject—rather than with one fixed meaning.",
    "3.14": "Black performers and creators reshaped American entertainment even as segregation, stereotype, commercial pressure, and unequal control constrained their opportunities.",
    "3.15": "Black scholars and educators institutionalized Black history through curricula, archives, organizations, and scholarship that challenged its marginalization in mainstream education.",
    "3.17": "Afro-Caribbean migration broadened U.S. Black communities through new national, linguistic, political, and cultural experiences while reinforcing diasporic connections.",
    "4.2": "Black internationalist thinkers linked anticolonial struggles abroad with U.S. racial inequality and used those connections to frame broader arguments about freedom and self-determination.",
    "4.7": "Black women's leadership in the civil rights movement often operated through essential grassroots work and strategic organizing that formal titles alone do not capture.",
    "4.8": "Music and art could advance freedom struggles by articulating political claims, sustaining collective identity, and changing how Black life and protest were represented.",
    "4.10": "The Black Arts Movement treated cultural production and Black-controlled artistic institutions as parts of a wider politics of self-determination.",
    "4.14": "Interlocking-systems analysis explains inequality by examining how institutions and social positions interact instead of reducing outcomes to one category of discrimination.",
    "4.17": "African American music developed through recurring continuities and repeated innovation shaped by migration, technology, commerce, performance, and politics.",
    "4.18": "Black creators and performers expanded representation in mass culture while continuing to contest stereotypes and unequal access to authorship, production, and ownership.",
    "4.19": "Sport has provided Black athletes with opportunity and public influence while also exposing conflicts over segregation, labor, representation, protest, and commercial power.",
    "4.20": "Black scientific and medical achievement developed alongside persistent institutional exclusion and unequal health systems, making contribution and structural barriers part of the same history.",
  };

  let i = 0;
  for (const [topic, correct] of Object.entries(paraphrases)) {
    const q1 = bank.find((q) => q.topicCode === topic && q.sequence === 1);
    if (!q1 || !q1.stimulus || q1.stimulus.requiredSource || q1.stimulus.type !== "text") throw new Error(`${topic}: synthetic claim repair found unexpected final source`);
    const pos = q1.c[0];
    const options = q1.o.slice();
    options[pos] = correct;
    q1.q = [
      "Which paraphrase best captures the historical argument made by the source?",
      "Which interpretation most accurately restates the source's central historical claim?",
      "Which conclusion best expresses the source's argument without simply repeating its wording?",
      "Which statement most accurately summarizes the source's historical interpretation?",
      "Which paraphrase preserves the source's main claim while avoiding overstatement?",
      "Which interpretation most closely matches the argument advanced in the source?",
    ][i % 6];
    q1.o = options;
    q1.c = [pos];
    q1.e = `${correct} This paraphrases the source's argument while preserving its scope and qualifications. The other choices describe different developments from the same unit rather than the claim made by this source.`;
    q1.skill = "2.A";
    i++;
  }

  const cultureQ3 = bank.find((q) => q.topicCode === "2.9" && q.sequence === 3);
  if (!cultureQ3) throw new Error("2.9: synthetic claim repair could not find q3");
  const cultureCorrect = cultureQ3.o[cultureQ3.c[0]];
  const cultureOptions = [
    "A practice that preserves recognizable African features but is interpreted without considering how migration and new social conditions may have changed its meaning.",
    "A cultural form whose shared features are attributed mainly to European institutions even though evidence also indicates African continuity and Black innovation.",
    "A list of African customs used to generalize from one community to enslaved communities across North America without evidence of how widely each practice circulated.",
  ];
  cultureOptions.splice(cultureQ3.c[0], 0, cultureCorrect);
  cultureQ3.o = cultureOptions;

  const contexts = {
    "1.4": "Aksum's location near Red Sea trade routes supported long-distance exchange, while royal coinage recorded both political authority and the kingdom's adoption of Christianity.",
    "1.5": "Mali's power rested partly on trans-Saharan commerce in gold, and Mansa Musa's pilgrimage made the empire's wealth and Islamic connections especially visible to Mediterranean observers.",
    "1.6": "West African griots and other specialist oral performers preserved genealogies, political memory, and social values that helped communities interpret the past and legitimate authority.",
    "1.7": "Yoruba religious traditions centered on relationships among people, ancestors, and orisha and later supplied important resources for continuity and adaptation in African diasporic religions.",
    "1.8": "Great Zimbabwe developed as a locally built southern African political and commercial center connected to regional cattle, gold, and Indian Ocean exchange networks.",
    "1.9": "Early Kongo-Portuguese relations combined diplomacy and Christian exchange with a growing Atlantic slave trade that Kongo rulers sometimes tried to regulate or protest.",
    "1.10": "Benin court art expressed dynastic authority and social hierarchy, including the politically important office of the iyoba, or queen mother.",
    "1.11": "Africans lived and moved through European and Atlantic cities before the full development of racialized plantation systems, occupying varied free and unfree statuses that require source-specific investigation.",
    "2.4": "The Middle Passage was a coercive Atlantic system marked by confinement, violence, disease, and mortality, while abolitionists later used ship diagrams and other evidence to expose its conditions.",
    "2.5": "The domestic slave trade expanded dramatically in the nineteenth-century United States as enslaved people were sold and forcibly moved, often separating families to supply labor in expanding slave economies.",
    "2.7": "Colonial slave codes transformed racial slavery into a legal institution by defining status, restricting movement and assembly, and protecting slaveholders' coercive authority.",
    "2.11": "Imperial rivalry created openings for resistance: Spanish Florida offered freedom to some fugitives from British colonies, contributing to the formation of Fort Mose and armed Black communities.",
    "2.12": "The Haitian Revolution destroyed slavery in Saint-Domingue and created an independent Black republic whose leaders then confronted the political problem of securing sovereignty after colonial rule.",
    "2.14": "Free Black activists in the antebellum North built institutions and public arguments around education, abolition, citizenship, moral reform, and collective advancement despite racism and restrictions on women's public authority.",
    "2.17": "Black Seminoles emerged through alliances and communities linking African-descended people and Seminoles in Florida, complicating U.S. removal efforts and demonstrating resistance through coalition as well as flight.",
    "2.18": "Antebellum Black political thought included serious debates over whether freedom could be secured through U.S. citizenship, emigration, independent Black nationhood, or transnational projects.",
    "2.19": "Black abolitionists developed arguments that ranged from moral suasion to urgent calls for resistance, challenging slavery as both a political institution and a violation of human and religious principles.",
    "2.20": "The Underground Railroad depended on self-emancipating people and networks of assistance, and narratives of escape highlight enslaved people's decisions and risk-taking rather than treating freedom as something simply granted from outside.",
    "2.22": "Enslaved women's experiences were shaped by labor, family separation, sexual exploitation, and gendered power, while their narratives also document strategies of survival, refusal, escape, and self-definition.",
    "2.24": "Emancipation unfolded unevenly during and after the Civil War; the Texas announcement later associated with Juneteenth illustrates the gap between national policy and the local enforcement and communication of freedom.",
    "3.1": "Reconstruction transformed the Constitution through abolition, national birthright citizenship, equal protection, and voting-right protections, creating legal tools whose enforcement remained politically contested.",
    "3.4": "After Reconstruction, state segregation and disfranchisement expanded while the Supreme Court narrowed federal protection of Black civil rights, including by upholding state-mandated segregation in Plessy.",
    "3.5": "Lynching functioned as racial terror and social control in the Jim Crow era, and Black journalists and organizers challenged both the violence and the myths used to justify it.",
    "3.6": "The Red Summer of 1919 combined white racial violence with determined Black self-defense and political assertion, helping shape a postwar literature of dignity, militancy, and resistance.",
    "3.7": "Black intellectuals at the turn of the twentieth century debated how racial hierarchy shaped citizenship and identity, with Du Bois describing the color line and the psychological tension of double consciousness.",
    "3.8": "Black women's club, educational, and intellectual work challenged both racism and gender exclusion, with thinkers such as Anna Julia Cooper arguing that Black women's advancement was central to racial progress.",
    "3.11": "The Harlem Renaissance joined migration, urban institution building, publishing, music, and art to new claims about modern Black identity and cultural self-definition.",
    "3.16": "The Great Migration moved millions of Black southerners toward northern and western cities in response to labor opportunities, racial violence, family networks, and hopes for greater freedom, reshaping communities in both sending and receiving regions.",
    "3.18": "Garveyism built a mass Black nationalist movement around racial pride, economic self-reliance, institution building, and a global vision linking people of African descent.",
    "4.1": "Négritude and related Black internationalist cultural movements challenged colonial ideas about race and civilization by asserting African and diasporic identity while connecting culture to anticolonial politics.",
    "4.3": "World War II sharpened the contradiction between U.S. claims to fight fascism abroad and racial discrimination at home, encouraging Black activists to connect military victory with demands for civil rights.",
    "4.4": "Brown v. Board emerged from sustained NAACP legal strategy and helped delegitimize state-mandated school segregation, but implementation required further organizing, litigation, and federal action.",
    "4.5": "Federal housing policy, local segregation, lending practices, and suburban development contributed to durable racial inequalities in homeownership and neighborhood investment during the twentieth century.",
    "4.6": "The civil rights movement included nonviolent direct action alongside litigation, electoral organizing, labor activism, self-defense, community institution building, and other strategies that varied by place and organization.",
    "4.9": "By the mid-1960s, Black political debate increasingly addressed self-determination, community control, voting power, self-defense, and the limits of integrationist approaches as well as continued civil-rights organizing.",
    "4.11": "Black Power organizations linked political self-determination to material demands involving policing, housing, education, employment, health, and community control.",
    "4.13": "Black feminist organizers argued that race, gender, sexuality, and class could not be understood as separate systems when explaining Black women's political experiences and liberation struggles.",
    "4.15": "Late-twentieth-century Black public leadership expanded across government, the military, business, and civic institutions while continuing to generate debate about representation, opportunity, structural inequality, and the meaning of racial progress.",
    "4.21": "Afrofuturist artists combined Black history and culture with science fiction, technology, space, and speculative imagination to critique the present and envision alternative Black futures.",
  };
  const stems = [
    (title) => `Which broader historical development most directly contextualizes ${title}?`,
    (title) => `Which course connection best places ${title} in its wider historical setting?`,
    (title) => `Which development most helps explain the significance of ${title}?`,
    (title) => `Which historical context would most strengthen an interpretation of ${title}?`,
    (title) => `Which broader pattern is most directly connected to the evidence in ${title}?`,
    (title) => `Which contextual claim best links ${title} to the course framework?`,
  ];
  const requiredQ1 = bank.filter((q) => q.sequence === 1 && q.stimulus && q.stimulus.requiredSource && contexts[q.topicCode]);
  if (requiredQ1.length !== 39) throw new Error(`required depth pass expected 39 groups, found ${requiredQ1.length}`);
  const byUnit = {};
  for (const q of requiredQ1) {
    if (!byUnit[q.unit]) byUnit[q.unit] = [];
    byUnit[q.unit].push(q.topicCode);
  }
  requiredQ1.forEach((first, index) => {
    const q3 = bank.find((q) => q.stimulusGroupId === first.stimulusGroupId && q.sequence === 3);
    if (!q3) throw new Error(`${first.topicCode}: required depth pass missing q3`);
    const correct = contexts[first.topicCode];
    const peers = byUnit[first.unit].filter((topic) => topic !== first.topicCode);
    const distractors = [0, 1, 2].map((j) => contexts[peers[(index * 2 + j * 3) % peers.length]]);
    const pos = (index * 7 + 2) % 4;
    const options = distractors.slice();
    options.splice(pos, 0, correct);
    q3.q = stems[index % stems.length](first.stimulus.title);
    q3.o = options;
    q3.c = [pos];
    q3.e = `${correct} That context explains why the evidence in ${first.stimulus.title} matters to its assigned topic. The other choices describe genuine developments in the same unit, but they contextualize different sources and topics.`;
    q3.skill = "1.B";
  });

  const oshe = bank.find((q) => q.topicCode === "1.7" && q.sequence === 4);
  if (!oshe) throw new Error("1.7: required depth pass missing q4");
  const osheCorrect = "Compare the object with evidence of Yoruba religious practice in another time or diasporic setting to distinguish continuity from later adaptation or syncretism.";
  oshe.q = "Which comparison would best use the Oshe Shango object to study continuity and religious change?";
  oshe.o = [
    "Compare the object with another Yoruba religious object from a different period, but assume shared iconography by itself demonstrates unchanged practice.",
    "Compare it with European devotional objects while treating outside contact as the main explanation for religious change before evaluating Yoruba continuities.",
    osheCorrect,
    "Use the object's surviving form to estimate how common particular Yoruba rituals were across communities without population or practice evidence.",
  ];
  oshe.c = [2];
  oshe.e = "The object can document a religious tradition, but continuity and syncretic change are comparative claims. Evidence from another period or diasporic setting is needed to show what persisted, what changed, and how introduced traditions interacted with Yoruba cosmologies.";
  oshe.skill = "3.C";
})();
