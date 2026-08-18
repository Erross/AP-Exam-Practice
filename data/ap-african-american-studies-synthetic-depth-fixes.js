// AP African American Studies — independent-review depth pass for synthetic text sets.
// Replaces the generic third item in each remaining synthetic text group with a
// topic-specific analytical task so each group contains at least one question
// that requires substantive engagement with the historical development itself.
(() => {
  "use strict";
  const bank = window.QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES;
  if (!Array.isArray(bank) || bank.length === 0) return;

  const specs = {
    "1.1": [
      "Which research design best reflects the interdisciplinary approach described by the source?",
      "Combine historical records, cultural works, and social-science evidence to explain how Black identities and institutions changed over time.",
      [
        "Use literary texts alone because cultural interpretation is the primary method of African American Studies.",
        "Use demographic data alone because quantitative evidence is less shaped by perspective than other sources.",
        "Treat each discipline separately and avoid comparing evidence produced by different methods or fields.",
      ],
      "African American Studies is interdisciplinary: a strong inquiry can place historical, literary, artistic, and social-scientific evidence in conversation rather than treating one method as sufficient.",
      "1.D",
    ],
    "2.1": [
      "Which finding would most directly complicate a narrative that Africans first entered the Americas only as plantation laborers?",
      "Records identifying Africans as interpreters, sailors, soldiers, or expedition participants during early colonial exploration.",
      [
        "Plantation inventories from a later century listing enslaved agricultural workers in one colony.",
        "A map of European imperial claims that does not identify African participants in exploration or settlement.",
        "A later law regulating plantation slavery after coerced labor systems had already become entrenched.",
      ],
      "Evidence of Africans participating in exploration and colonial encounters in varied roles shows a more complex early history than a narrative beginning only with plantation labor.",
      "1.C",
    ],
    "2.3": [
      "Which interpretation best avoids overgeneralizing the effects of the Atlantic slave trade on West African societies?",
      "The trade intensified warfare, displacement, and demographic disruption in some regions, but its scale and political effects varied by place and period.",
      [
        "The trade produced the same level of political disruption in every West African society that encountered Atlantic commerce.",
        "Because some African states participated in slave trading, Atlantic demand had little independent effect on regional conflict or displacement.",
        "Population loss alone explains political change, making warfare, state formation, and commercial competition secondary factors.",
      ],
      "The course emphasizes both major consequences and regional variation. Atlantic demand could intensify conflict and displacement without producing one uniform outcome across West Africa.",
      "1.C",
    ],
    "2.6": [
      "Which claim best connects enslaved labor to both economic history and cultural history?",
      "Enslaved people generated wealth through coerced labor while also building skills, relationships, and cultural practices not reducible to slaveholders' economic goals.",
      [
        "The economic value of enslaved labor makes cultural evidence less useful for understanding plantation and urban slavery.",
        "Cultural creativity under slavery indicates that coerced labor had only a limited effect on enslaved people's daily lives.",
        "Skilled work generally gave enslaved people control over the profits produced by their labor and over the conditions of employment.",
      ],
      "African American Studies can analyze exploitation and agency together: coerced labor created wealth for others while enslaved people sustained community, skill, and cultural life under constraint.",
      "1.D",
    ],
    "2.8": [
      "Which evidence would best demonstrate that racial status was socially and legally constructed rather than simply descriptive?",
      "A law making a child's legal condition depend on maternal status and assigning different rights according to ancestry or racial category.",
      [
        "A travel account noting visible differences among people without describing legal rights or inherited status.",
        "A population estimate that groups residents by birthplace but does not connect those categories to law or social hierarchy.",
        "A religious sermon about moral conduct that does not assign legal consequences to ancestry or family descent.",
      ],
      "When law makes ancestry or maternal status determine rights and condition, racial categories are functioning as institutions that reproduce unequal status across generations.",
      "3.B",
    ],
    "2.9": [
      "Which pattern would most strongly support the source's description of African American culture as adaptation and innovation?",
      "A musical or religious practice that retains identifiable African elements while changing through contact with new languages, institutions, and communities in the Americas.",
      [
        "A practice that remains entirely unchanged across continents and centuries despite migration and different social conditions.",
        "A cultural form whose features can be explained only by European influence with no evidence of African continuity or Black innovation.",
        "A list of African customs that assumes each was preserved identically among all enslaved communities in North America.",
      ],
      "Cultural formation under slavery and freedom involved continuity, exchange, and innovation. Evidence showing both recognizable inheritance and adaptation best supports that process.",
      "1.C",
    ],
    "2.10": [
      "Why are historical debates over collective names useful evidence for African American Studies?",
      "They reveal changing arguments about ancestry, citizenship, dignity, political strategy, and the boundaries of collective identity.",
      [
        "They mainly establish which term was objectively correct at each moment, making political context less important.",
        "They show that Black communities generally reached consensus about identity labels before adopting political programs.",
        "They are most useful as linguistic evidence because naming debates rarely reflected disagreements about nation or belonging.",
      ],
      "Names are political and historical evidence when people debate what a community should call itself and why. Those debates expose changing ideas about identity, belonging, and strategy.",
      "1.D",
    ],
    "2.13": [
      "Which evidence would best support an argument that resistance to slavery took forms beyond organized revolt?",
      "Records of escape, work slowdowns, covert communication, preservation of family ties, and everyday refusals alongside evidence of conspiracies or uprisings.",
      [
        "A list of major rebellions that excludes evidence about daily life, escape, or less visible forms of opposition.",
        "Plantation production totals used alone to infer whether enslaved workers accepted or opposed slavery.",
        "Slaveholders' claims of loyalty treated as sufficient evidence of enslaved people's attitudes and behavior.",
      ],
      "Resistance included spectacular revolts and less visible acts. A broader source base is necessary to recover escape, refusal, family strategies, and other forms of agency.",
      "3.B",
    ],
    "2.15": [
      "Which factor most helps explain why some maroon communities could maintain autonomy for extended periods?",
      "Geography that hindered capture combined with collective defense, local knowledge, and social organization within the community.",
      [
        "Formal recognition by slaveholding governments that generally treated maroon settlements as ordinary independent states.",
        "Complete isolation from surrounding enslaved, free Black, Indigenous, or colonial communities throughout their existence.",
        "The absence of military pressure from colonial authorities once a maroon settlement had survived its first years.",
      ],
      "Maroon autonomy depended on both environment and organization. Difficult terrain could matter, but so did defense, knowledge, networks, and community institutions.",
      "1.C",
    ],
    "2.16": [
      "Which comparison would be most useful for explaining differences between slavery in Brazil and the United States?",
      "Compare law, demography, manumission, labor systems, racial classification, and emancipation while keeping the distinct national contexts visible.",
      [
        "Assume a shared Atlantic slave trade produced essentially identical institutions in the two societies.",
        "Use evidence from whichever country has the better surviving archive as a substitute for evidence about the other.",
        "Select one cultural difference and treat it as the primary cause of every legal and demographic contrast.",
      ],
      "Comparison is strongest when it identifies both shared Atlantic structures and differences that require explanation, rather than assuming either sameness or a single cause.",
      "1.C",
    ],
    "2.23": [
      "Which development most directly supports the claim that African Americans helped make emancipation a wartime reality?",
      "Enslaved people fled to Union lines while Black soldiers, laborers, and community networks pressed the Union war effort toward emancipation.",
      [
        "Federal emancipation policy developed independently of Black action because military and political leaders controlled wartime decisions.",
        "Black military service began only after slavery had already ended throughout the United States.",
        "Self-emancipation mainly affected individual families and had little relationship to Union policy or military strategy.",
      ],
      "Black flight, labor, military service, intelligence, and political pressure altered wartime conditions and helped force emancipation into federal policy and practice.",
      "1.C",
    ],
    "3.3": [
      "Which evidence would best show the difference between legal emancipation and economic independence?",
      "Labor contracts, Black Codes, and land petitions showing that freedpeople were legally free while mobility, bargaining power, and access to property remained contested.",
      [
        "The Thirteenth Amendment by itself, because formal abolition also determined postwar wages and land ownership.",
        "A map of former Confederate states that does not provide information about labor arrangements or land access.",
        "A list of prewar plantation crops used without evidence about postwar contracts, mobility, or freedpeople's goals.",
      ],
      "Emancipation changed legal status, but economic freedom depended on labor, land, mobility, and bargaining power. Postwar laws and contracts make that gap visible.",
      "1.C",
    ],
    "3.9": [
      "How did Black institutions create political capacity under segregation?",
      "They combined services and community networks with fundraising, information sharing, leadership development, and organized advocacy.",
      [
        "They generally avoided political activity because providing social services required strict separation from public controversy.",
        "Their importance came mainly from replacing all government services rather than building independent community power.",
        "They reduced the need for collective organizing by allowing individual economic advancement to substitute for civil-rights campaigns.",
      ],
      "Churches, newspapers, mutual-aid groups, businesses, and civic organizations could meet community needs while also producing networks, resources, and leaders for political action.",
      "1.D",
    ],
    "3.10": [
      "Which interpretation best captures the broader significance of HBCUs and Black Greek-letter organizations?",
      "They expanded access to education and professional networks while building institutions for service, leadership, and civic life amid exclusion.",
      [
        "Their main historical role was cultural because segregation prevented educational institutions from shaping professional or political networks.",
        "They became less important as Black students pursued higher education because institutional exclusion largely disappeared by the early twentieth century.",
        "Their emphasis on mutual support generally discouraged engagement with public service or civil-rights organizing beyond campus communities.",
      ],
      "These institutions were educational and civic structures. They created opportunity, networks, leadership, and service traditions within a society that restricted Black access elsewhere.",
      "1.D",
    ],
    "3.13": [
      "Why should references to Africa in Harlem Renaissance poetry be interpreted in context rather than as simple descriptions of the continent?",
      "Writers could use Africa as ancestry, symbol, political connection, imagined homeland, or modern setting, and those uses carried different meanings.",
      [
        "Poetic references to Africa generally provide direct geographic evidence about the places writers described.",
        "Writers of the Harlem Renaissance shared one political interpretation of Africa because they participated in the same cultural movement.",
        "African imagery is mainly decorative in poetry, so historical context adds little to understanding racial identity or diaspora.",
      ],
      "Africa functioned in multiple ways within Harlem Renaissance writing. Interpreting a poem requires attention to the writer, moment, genre, and political or cultural purpose.",
      "2.C",
    ],
    "3.14": [
      "Which tension most shaped Black performance in music, theater, and film during the early twentieth century?",
      "Black artists created new forms and audiences while confronting segregation, commercial stereotypes, and unequal control over production and distribution.",
      [
        "Commercial success generally removed pressure to conform to racial stereotypes because popular audiences rewarded artistic autonomy.",
        "Segregation limited access to venues but had little effect on contracts, ownership, roles, or the representation of Black performers.",
        "Artistic innovation and racial politics operated separately because entertainment markets were primarily concerned with style and profit.",
      ],
      "Black cultural innovation occurred within unequal institutions. The history therefore involves both creativity and struggles over representation, ownership, opportunity, and stereotype.",
      "1.C",
    ],
    "3.15": [
      "Why was institution building central to the development of Black history education?",
      "Archives, curricula, scholarly associations, and educational programs made sustained study possible even when mainstream institutions marginalized Black history.",
      [
        "Once individual historians published important works, separate archives and organizations became unnecessary for preserving sources or training scholars.",
        "Black history education developed mainly through government mandates rather than through scholars, teachers, communities, and independent institutions.",
        "The field advanced by focusing on famous individuals while avoiding institutional, social, and cultural history that challenged established narratives.",
      ],
      "Building archives, organizations, and curricula gave the field durable infrastructure. Institution building helped preserve evidence, train scholars, and challenge exclusion from mainstream education.",
      "1.D",
    ],
    "3.17": [
      "Which question best captures the significance of Afro-Caribbean migration to Black life in the United States?",
      "How did migrants negotiate nationality, language, race, and diasporic identity while reshaping existing Black neighborhoods, politics, and culture?",
      [
        "How quickly did Caribbean migrants abandon national differences and adopt a single African American identity after arrival?",
        "Why did shared racial classification make political and cultural differences among Caribbean and U.S.-born Black communities largely unimportant?",
        "How did immigration affect Black communities mainly through population growth rather than through new political ideas, languages, or cultural networks?",
      ],
      "Caribbean migration added new national, linguistic, cultural, and political experiences to U.S. Black communities while also creating shared diasporic connections.",
      "1.D",
    ],
    "4.2": [
      "Which argument best demonstrates the internationalism of postwar Black political thought?",
      "Racial inequality in the United States should be analyzed alongside anticolonial struggles because both involved debates over self-determination, citizenship, and global power.",
      [
        "Colonial independence abroad and civil rights in the United States were separate issues because they involved different legal systems.",
        "Anticolonial movements mattered mainly as symbols and had little effect on Black activists' understanding of U.S. racial politics.",
        "International comparisons weakened civil-rights arguments by shifting attention away from specifically American institutions and laws.",
      ],
      "Black internationalists connected U.S. racial struggles to decolonization and global power. Those connections shaped arguments about democracy, human rights, and self-determination.",
      "1.D",
    ],
    "4.7": [
      "Why can focusing only on formal organizational titles understate Black women's leadership in the civil rights movement?",
      "Much movement power depended on local organizing, transportation, fundraising, education, communication, and voter work often carried out beyond top formal offices.",
      [
        "Formal titles were uncommon because civil-rights organizations generally lacked leadership structures or defined responsibilities.",
        "Women concentrated on community service while strategic decisions and political organizing remained mostly separate from their work.",
        "Grassroots labor mattered primarily before national organizations formed and became less important during major campaigns of the 1950s and 1960s.",
      ],
      "Leadership is not limited to public titles. Local networks and everyday organizational labor were essential to sustaining campaigns, and Black women frequently built that infrastructure.",
      "1.C",
    ],
    "4.8": [
      "Which example best shows how art or music can function politically within a freedom movement?",
      "A song or artwork that expresses movement claims, builds collective identity, and circulates through rallies, performances, or community institutions.",
      [
        "A commercially successful work whose popularity is used as proof that audiences shared the artist's political views.",
        "A work created by a Black artist that is assumed to be political even when its content, context, and audience provide no evidence of that purpose.",
        "A later critic's interpretation used in place of evidence about how participants actually used or understood the work during the movement.",
      ],
      "Cultural works become political evidence through content, context, circulation, and use. A strong analysis does not assume that authorship or popularity alone establishes political function.",
      "2.C",
    ],
    "4.10": [
      "What distinguished the Black Arts Movement's institutional goals from cultural expression alone?",
      "Participants sought Black-controlled publishing, theater, performance spaces, and audiences that linked artistic production to political self-determination.",
      [
        "The movement generally treated ownership and institutions as secondary because artistic style alone was expected to produce political change.",
        "Its emphasis on Black audiences required artists to avoid political themes that might divide communities or limit commercial reach.",
        "The movement aimed mainly to gain equal access to existing white cultural institutions rather than build autonomous Black cultural spaces.",
      ],
      "The Black Arts Movement linked aesthetics to power over production, institutions, and audiences. That institutional dimension was central to its politics of cultural self-determination.",
      "1.D",
    ],
    "4.14": [
      "Which example best illustrates an interlocking-systems analysis rather than a single-axis explanation?",
      "Study how a housing or employment policy affects Black women differently because racial, gender, and class structures operate together in access to resources.",
      [
        "Measure racial inequality while holding gender and class differences aside because they complicate comparison among groups.",
        "Treat separate measures of racism, sexism, and class inequality as complete without examining how institutions combine them in particular experiences.",
        "Explain unequal outcomes through whichever identity category shows the largest statistical difference and treat the others as secondary.",
      ],
      "Interlocking analysis asks how structures operate together. The point is not merely to list several inequalities but to explain how their interaction produces distinct experiences and outcomes.",
      "1.D",
    ],
    "4.17": [
      "Which approach best avoids presenting African American music as a simple sequence in which one genre replaces another?",
      "Trace recurring techniques, themes, technologies, and performance practices across genres while also explaining innovation, migration, and commercial change.",
      [
        "Treat each genre as a self-contained style whose main significance comes from the period in which it was most popular.",
        "Use a chronological list of genres as sufficient evidence of musical development without analyzing sound, performance, technology, or audience.",
        "Assume later genres preserve earlier traditions only when musicians explicitly identify a direct influence in interviews or liner notes.",
      ],
      "Musical traditions overlap and transform rather than simply replace one another. Studying technique, migration, technology, commerce, and politics reveals both continuity and innovation.",
      "1.C",
    ],
    "4.18": [
      "Which evidence would best support an argument about growing Black creative control in theater, television, or film?",
      "Changes in who writes, directs, produces, owns, finances, and distributes works, considered alongside how Black characters and communities are represented.",
      [
        "An increase in the number of Black performers on screen used without information about roles, authorship, ownership, or production decisions.",
        "Audience ratings alone, because popularity provides a direct measure of whether representation is controlled by Black creators.",
        "A comparison of genres that ignores employment, contracts, ownership, and the institutional decisions shaping what reaches audiences.",
      ],
      "Representation and creative control are related but distinct. Evidence about authorship, production, ownership, and distribution helps show whether Black creators gained power over representation itself.",
      "3.B",
    ],
    "4.19": [
      "Why are sports useful for studying both opportunity and racial inequality?",
      "Athletes could gain visibility and influence while confronting segregation, labor disputes, unequal compensation, stereotypes, and conflict over political protest.",
      [
        "Athletic success generally insulated Black athletes from racial politics because performance could be evaluated through objective competition.",
        "Integration of professional leagues resolved the main racial issues in sports by ending formal exclusion from competition.",
        "Sports are most useful for cultural history because labor, ownership, pay, and protest are separate from the meaning of athletic performance.",
      ],
      "Sports connect culture, labor, business, representation, and politics. Integration created opportunities but did not eliminate disputes over pay, ownership, protest, or racial treatment.",
      "1.D",
    ],
    "4.20": [
      "Which research design best captures both Black scientific contribution and institutional inequality?",
      "Pair evidence of Black scientists, medical professionals, or inventors' work with data on access to training, funding, treatment, patents, or health outcomes.",
      [
        "Study famous Black inventors alone because individual achievement provides sufficient evidence about scientific institutions and community health.",
        "Use racial health disparities alone without examining medical access, environmental conditions, research practices, or institutional barriers.",
        "Treat scientific innovation and unequal health systems as separate topics because one concerns achievement and the other concerns public policy.",
      ],
      "The topic requires both contribution and structure. Combining professional records with institutional and health evidence makes achievement and unequal access visible in the same analysis.",
      "1.D",
    ],
  };

  function apply(q, spec, index) {
    const [stem, correct, distractors, rationale, skill] = spec;
    const pos = (index * 3 + q.topicCode.length) % 4;
    const options = distractors.slice();
    options.splice(pos, 0, correct);
    q.q = stem;
    q.o = options;
    q.c = [pos];
    q.e = rationale;
    q.skill = skill;
  }

  Object.entries(specs).forEach(([topic, spec], i) => {
    const q = bank.find((item) => item.topicCode === topic && item.sequence === 3);
    if (!q) throw new Error(`${topic}: synthetic depth pass could not find q3`);
    if (!q.stimulus || q.stimulus.requiredSource || ["visual", "quantitative"].includes(q.stimulus.type)) {
      throw new Error(`${topic}: synthetic depth pass found unexpected final stimulus type`);
    }
    apply(q, spec, i);
  });
})();
