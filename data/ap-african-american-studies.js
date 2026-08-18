// AP African American Studies — original Section I practice bank.
// Draft development bank for the May 2027 cycle.
//
// Structure verified 2026-08-18 against the current AP Central course/exam
// pages and Course at a Glance. The real Section I has 60 questions in 70
// minutes, normally in 3–4 question source sets. This first structural bank
// uses original synthetic source passages so topic coverage, set integrity,
// unit weighting, skill tagging, bias, and retake behavior can be hardened
// before the required-source replacement pass.
//
// RELEASE BLOCKER: approximately half of official Section I source material is
// drawn from required course sources. Synthetic-source-only development content
// is not release-ready; releaseStatus must remain "draft" until that pass is done.
(() => {
  "use strict";

  const T = [
    ["1.1","U1","What Is African American Studies?","African American Studies is interdisciplinary, using historical, literary, artistic, social-scientific, and other methods to examine Black experiences, power, culture, and identity.","a syllabus pairing historical documents with literature, art, demographic data, and social-science analysis"],
    ["1.2","U1","The African Continent: A Varied Landscape","Africa's varied deserts, savannas, forests, highlands, rivers, and coasts shaped diverse settlement and exchange patterns without mechanically determining social development.","maps comparing ecological zones with settlement and trade routes"],
    ["1.3","U1","Population Growth and Ethnolinguistic Diversity","Long-term population movements and local adaptation produced both broad language-family connections and extensive ethnolinguistic diversity across Africa.","linguistic relationships compared with archaeological evidence of migration and settlement"],
    ["1.4","U1","Africa’s Ancient Societies","Ancient African societies developed complex political, economic, technological, and cultural institutions before sustained European contact.","dated architecture, tools, trade goods, and burial evidence from ancient African settlements"],
    ["1.5","U1","The Sudanic Empires: Ghana, Mali, and Songhai","Ghana, Mali, and Songhai drew wealth and political power in part from control of trans-Saharan trade while participating in wider Islamic commercial and scholarly networks.","records of caravan trade, taxation, urban markets, mosques, and scholarly centers"],
    ["1.6","U1","Learning Traditions","African learning traditions included sophisticated oral knowledge systems as well as manuscript scholarship, each with its own institutions of authority and transmission.","a comparison of manuscript collections with documented oral histories and the roles of specialist knowledge keepers"],
    ["1.7","U1","Indigenous Cosmologies and Religious Syncretism","African communities often adapted introduced religions through existing cosmologies, producing syncretic practices rather than simple cultural replacement.","ritual evidence combining local spiritual concepts with adopted religious symbols or practices"],
    ["1.8","U1","Culture and Trade in Southern and East Africa","Indian Ocean and regional trade linked southern and eastern African societies to wider networks while communities retained and reshaped local identities.","imported goods found alongside local products at securely dated coastal and inland settlements"],
    ["1.9","U1","West Central Africa: The Kingdom of Kongo","Kongo rulers actively negotiated diplomacy, religion, trade, and enslavement in Atlantic relationships rather than merely receiving European influence passively.","correspondence by Kongo rulers concerning diplomacy, Christianity, commerce, and enslavement"],
    ["1.10","U1","Kinship and Political Leadership","Kinship could structure inheritance, alliance, obligation, succession, and political legitimacy in African societies.","genealogies, succession rules, marriage alliances, and records of political dispute settlement"],
    ["1.11","U1","Global Africans","Africans traveled as merchants, diplomats, sailors, scholars, soldiers, and migrants across several world regions before and alongside the rise of racialized Atlantic slavery.","records documenting African travelers and workers in Mediterranean, Atlantic, or Indian Ocean networks"],

    ["2.1","U2","African Explorers in the Americas","Africans participated in early European exploration and colonial encounters in the Americas in varied roles before plantation slavery became dominant in many colonies.","expedition records identifying African participants and describing their activities"],
    ["2.2","U2","Departure Zones in Africa and the Slave Trade to the United States","Captives transported to mainland North America came from multiple West and West Central African regions, with embarkation patterns changing over time.","voyage records linking African ports of embarkation, dates, and North American destinations"],
    ["2.3","U2","Capture and the Impact of the Slave Trade on West African Societies","Atlantic demand for captives contributed in some regions to warfare, displacement, demographic loss, and political disruption.","regional evidence connecting raiding, warfare, population movement, and slave-trading networks"],
    ["2.4","U2","African Resistance on Slave Ships and the Antislavery Movement","Captive Africans resisted the slave trade during embarkation and the Middle Passage through revolt, refusal, escape, and other forms of opposition that later informed antislavery memory.","ship logs or court records documenting resistance aboard slave ships"],
    ["2.5","U2","Slave Auctions and the Domestic Slave Trade","Slave auctions and the domestic trade commodified enslaved people and frequently separated families as slavery expanded within the United States.","auction notices, bills of sale, traders' records, and testimony describing forced family separation"],
    ["2.6","U2","Labor, Culture, and Economy","Enslaved labor generated wealth across agriculture, skilled trades, domestic work, and commerce while enslaved people also created cultural practices and community institutions.","plantation or business records paired with evidence of enslaved people's skilled work and cultural life"],
    ["2.7","U2","Slavery and American Law: Slave Codes and Landmark Cases","Law helped construct and protect slavery through slave codes, court decisions, and restrictions on Black freedom while also becoming a site of legal contestation.","statutes and court decisions defining the legal status, rights, or restrictions of enslaved and free Black people"],
    ["2.8","U2","The Social Construction of Race and the Reproduction of Status","Colonial and U.S. institutions increasingly made racial categories hereditary and legally consequential, helping reproduce unequal status across generations.","laws linking ancestry, maternal status, race, and legal condition across generations"],
    ["2.9","U2","Creating African American Culture","African American culture developed through adaptation, retention, exchange, and innovation under slavery and freedom rather than through simple preservation or loss of African traditions.","language, music, foodways, crafts, religious practice, or folklore showing both African continuities and New World innovation"],
    ["2.10","U2","Black Pride, Identity, and the Question of Naming","Debates over collective names reflected changing ideas about ancestry, citizenship, racial identity, dignity, and political strategy.","Black-authored speeches or publications debating racial and collective terminology"],
    ["2.11","U2","The Stono Rebellion and Fort Mose","The Stono Rebellion and Fort Mose reveal both armed resistance to slavery and the geopolitical opportunities created by rivalry among colonial powers.","colonial records about the Stono uprising and Spanish policies offering freedom in Florida"],
    ["2.12","U2","Legacies of the Haitian Revolution","The Haitian Revolution transformed Atlantic debates about slavery, Black sovereignty, revolution, and the possibilities and dangers perceived by slaveholding societies.","Black and white Atlantic commentary responding to Haitian independence and emancipation"],
    ["2.13","U2","Resistance and Revolts in the United States","Enslaved African Americans resisted through everyday acts, escape, conspiracy, and revolt, challenging claims that slavery produced passive acceptance.","testimony, court records, plantation documents, or narratives documenting multiple forms of resistance"],
    ["2.14","U2","Black Organizing in the North: Freedom, Women’s Rights, and Education","Free Black communities in the North built institutions and reform networks around abolition, education, civil rights, mutual aid, and women's activism.","records from Black conventions, schools, churches, mutual-aid societies, or women's antislavery organizations"],
    ["2.15","U2","Maroon Societies and Autonomous Black Communities","Maroons formed communities beyond direct slaveholder control, using geography, collective defense, and social organization to create degrees of autonomy.","maps and historical accounts locating maroon settlements and describing their political or economic organization"],
    ["2.16","U2","Diasporic Connections: Slavery and Freedom in Brazil","Comparing Brazil and the United States highlights both shared Atlantic systems of slavery and different legal, demographic, cultural, and emancipation patterns.","parallel evidence on slavery, manumission, racial classification, and emancipation in Brazil and the United States"],
    ["2.17","U2","African Americans in Indigenous Territory","Black and Indigenous histories intersected through slavery, kinship, refuge, conflict, alliance, removal, and contested citizenship in Indigenous nations and territories.","tribal, federal, or family records documenting Black-Indigenous relations in a specific community"],
    ["2.18","U2","Debates About Emigration, Colonization, and Belonging in America","Black thinkers debated whether freedom required emigration, colonization, or a stronger claim to U.S. citizenship, revealing competing ideas of nation and belonging.","Black-authored speeches and convention records presenting opposing positions on colonization or emigration"],
    ["2.19","U2","Black Political Thought: Radical Resistance","Some Black abolitionists argued that moral suasion and legal reform were insufficient and defended stronger forms of resistance to slavery and racial oppression.","a Black abolitionist text explicitly debating self-defense, insurrection, or the limits of gradual reform"],
    ["2.20","U2","Race to the Promised Land: Abolitionism and the Underground Railroad","Abolitionist networks and self-emancipation challenged slavery by assisting escape, publicizing injustice, and creating interracial and Black-led antislavery organizing.","fugitive narratives, vigilance-committee records, or correspondence documenting escape and assistance networks"],
    ["2.21","U2","Legacies of Resistance in African American Art and Photography","Black artists and photographers have represented slavery and resistance in ways that shape historical memory, identity, and political interpretation.","a work of Black visual art or photography that deliberately reinterprets slavery, freedom, or resistance"],
    ["2.22","U2","Gender and Resistance in Slave Narratives","Slave narratives show that gender shaped exposure to violence, family separation, sexual exploitation, labor, and strategies of resistance.","first-person narratives comparing gendered experiences of enslavement and resistance"],
    ["2.23","U2","The Civil War and Black Communities","African Americans made emancipation a central wartime reality through self-emancipation, military service, labor, intelligence, and political pressure.","military records, refugee-camp documents, or Black testimony about wartime emancipation and service"],
    ["2.24","U2","Freedom Days: Commemorating the Ongoing Struggle for Freedom","Emancipation commemorations such as Juneteenth connect specific historical events to continuing debates over freedom, citizenship, memory, and unfinished equality.","programs, speeches, newspapers, or oral histories from emancipation-day commemorations across different periods"],

    ["3.1","U3","The Reconstruction Amendments","The Thirteenth, Fourteenth, and Fifteenth Amendments abolished slavery, established national citizenship and equal protection, and prohibited racial discrimination in voting, while enforcement remained contested.","the constitutional text paired with evidence about its enforcement during Reconstruction"],
    ["3.2","U3","Social Life: Reuniting Black Families and the Freedmen’s Bureau","After emancipation, freedpeople sought family reunification, education, legal recognition, and economic security, while the Freedmen's Bureau provided limited assistance amid political conflict.","Freedmen's Bureau records and advertisements seeking separated family members"],
    ["3.3","U3","Black Codes, Land, and Labor","Black Codes and postwar labor arrangements constrained freedpeople's mobility and economic independence, while land ownership became central to competing visions of freedom.","Black Code provisions, labor contracts, and freedpeople's petitions concerning land or work"],
    ["3.4","U3","The Defeat of Reconstruction","Reconstruction was undermined by organized white violence, political compromise, declining federal enforcement, and court decisions that narrowed protections for Black citizenship.","evidence linking political violence and reduced federal enforcement to the collapse of Reconstruction governments"],
    ["3.5","U3","Disenfranchisement and Jim Crow Laws","Southern states used poll taxes, literacy tests, white primaries, segregation laws, and violence to undermine Black voting and institutionalize Jim Crow.","state laws and voting data showing the mechanisms and effects of disenfranchisement"],
    ["3.6","U3","White Supremacist Violence and the Red Summer","Lynching, massacres, and racial violence enforced white supremacy, while Black communities organized self-defense, journalism, legal campaigns, and protest.","contemporary reports documenting racial violence alongside Black resistance or advocacy"],
    ["3.7","U3","The Color Line and Double Consciousness in American Society","The concepts of the color line and double consciousness analyzed how structural racism and social perception shaped Black life and identity in the United States.","a Black intellectual text analyzing the tension between racialized exclusion and American identity"],
    ["3.8","U3","Lifting as We Climb: Uplift Ideologies and Black Women’s Rights and Leadership","Black women used clubs, journalism, education, reform, and political organizing to challenge racism and sexism while debating strategies of racial uplift.","records from Black women's clubs or speeches connecting racial advancement with women's leadership"],
    ["3.9","U3","Black Organizations and Institutions","Black churches, mutual-aid groups, newspapers, civil-rights organizations, businesses, and civic institutions provided community resources and political power under segregation.","organizational records showing how a Black institution combined service, community building, and advocacy"],
    ["3.10","U3","HBCUs, Black Greek Letter Organizations, and Black Education","HBCUs and Black Greek-letter organizations expanded educational opportunity, professional networks, service, leadership, and institution building in the face of exclusion.","college archives or organizational records documenting education, mutual support, and civic leadership"],
    ["3.11","U3","The New Negro Movement and the Harlem Renaissance","The New Negro movement and Harlem Renaissance linked cultural production to racial pride, migration, modernity, and political self-definition.","literature, essays, music, or visual art explicitly engaging themes of Black modernity and identity"],
    ["3.12","U3","Photography and Social Change","Black photographers and reformers used photography to contest racist representations, document community life, and make political claims about citizenship and dignity.","photographs created or curated to challenge stereotypes or document Black social conditions"],
    ["3.13","U3","Envisioning Africa in Harlem Renaissance Poetry","Harlem Renaissance writers invoked Africa in varied ways—as ancestry, symbol, political connection, imagined homeland, or site of modern struggle.","poems from the Harlem Renaissance that use African imagery or ancestry to frame Black identity"],
    ["3.14","U3","Symphony in Black: Black Performance in Music, Theater, and Film","Black performers and creators transformed U.S. music, theater, and film while navigating segregation, commercial stereotypes, and struggles over artistic control.","performances, reviews, contracts, or films showing both Black innovation and constraints imposed by the entertainment industry"],
    ["3.15","U3","Black History Education and African American Studies","Black scholars and educators built institutions, curricula, archives, and historical organizations to challenge exclusion of Black history from mainstream education.","curricula, scholarly organizations, or archival projects designed to institutionalize the study of Black history"],
    ["3.16","U3","The Great Migration","Millions of African Americans moved from the South to northern, midwestern, and western cities, reshaping labor, politics, neighborhoods, family networks, and culture.","census or migration data paired with letters, newspapers, or employment records from destination cities"],
    ["3.17","U3","Afro-Caribbean Migration","Caribbean migration added new national, linguistic, political, and cultural experiences to Black communities in the United States and strengthened diasporic connections.","immigration records and Caribbean migrant writing about race, nationality, and Black identity in the United States"],
    ["3.18","U3","The Universal Negro Improvement Association","The UNIA promoted Black nationalism, economic self-reliance, racial pride, and global African solidarity through a mass international movement.","UNIA speeches, newspapers, membership records, or business initiatives expressing Black nationalist goals"],

    ["4.1","U4","The Négritude and Negrismo Movements","Négritude and Negrismo engaged African heritage and Black culture in literature and political thought while emerging from different linguistic and colonial contexts.","Francophone and Hispanic Caribbean texts that affirm Black culture while revealing different political contexts"],
    ["4.2","U4","Anticolonialism and Black Political Thought","Black political thinkers connected struggles against colonialism abroad with racism and inequality in the United States, strengthening internationalist approaches to freedom.","Black-authored speeches or essays linking anticolonial independence movements to U.S. racial politics"],
    ["4.3","U4","African Americans and the Second World War: The Double V Campaign and the G.I. Bill","World War II intensified demands for victory against fascism abroad and racism at home, while access to veterans' benefits remained shaped by discrimination.","Black wartime press coverage paired with evidence about unequal access to housing or education benefits"],
    ["4.4","U4","Discrimination, Segregation, and the Origins of the Civil Rights Movement","The modern civil rights movement grew from long-standing Black organizing against segregation, disfranchisement, labor discrimination, and racial violence rather than beginning with a single event.","pre-1950s legal campaigns, labor activism, local organizing, and protest records"],
    ["4.5","U4","Redlining and Housing Discrimination","Federal, local, and private housing practices including redlining restricted Black access to mortgages and neighborhoods, contributing to durable racial wealth and spatial inequalities.","historic lending maps and mortgage data compared with neighborhood racial and property patterns"],
    ["4.6","U4","Major Civil Rights Organizations","Civil rights organizations used different combinations of litigation, direct action, voter registration, lobbying, grassroots organizing, and mass protest.","organizational records comparing strategies used by major civil rights groups in a shared campaign"],
    ["4.7","U4","Black Women’s Leadership and Grassroots Organizing in the Civil Rights Movement","Black women provided essential leadership in local organizing, fundraising, transportation, voter work, education, and movement strategy, often beyond formal titles.","local movement records and oral histories documenting Black women's organizing roles"],
    ["4.8","U4","The Arts, Music, and the Politics of Freedom","Artists and musicians contributed to freedom struggles by expressing political claims, sustaining movement communities, and reshaping public understandings of Black identity.","songs, performances, or artworks used within or responding directly to freedom movements"],
    ["4.9","U4","Black Religious Nationalism and the Black Power Movement","Black religious nationalism and Black Power emphasized self-determination, racial pride, institution building, and critiques of integrationist assumptions, though their organizations and ideologies varied.","speeches or organizational programs comparing religious nationalism with secular Black Power strategies"],
    ["4.10","U4","The Black Arts Movement","The Black Arts Movement linked cultural production with Black political self-determination and sought artistic forms, institutions, and audiences rooted in Black communities.","poetry, manifestos, theater, or publishing projects explicitly connecting art to Black political autonomy"],
    ["4.11","U4","The Black Panther Party for Self-Defense","The Black Panther Party combined armed self-defense rhetoric with community programs, political education, and critiques of policing, capitalism, and racial inequality.","party platforms and records of community survival programs such as food or health initiatives"],
    ["4.12","U4","Black Is Beautiful and Afrocentricity","Black Is Beautiful and Afrocentric thought challenged Eurocentric beauty and cultural standards by affirming African heritage, aesthetics, and Black identity.","visual culture, fashion, educational materials, or essays explicitly affirming African-derived aesthetics and identity"],
    ["4.13","U4","The Black Feminist Movement, Womanism, and Intersectionality","Black feminist and womanist thinkers argued that race, gender, class, and other forms of power interact and cannot be understood adequately in isolation.","Black feminist writing analyzing how racism and sexism jointly shape a concrete social experience"],
    ["4.14","U4","Interlocking Systems of Oppression","Interlocking-systems analysis examines how institutions and identities combine to produce forms of inequality that are not reducible to a single axis of discrimination.","evidence showing a policy or institution affecting people differently at the intersection of race, gender, and class"],
    ["4.15","U4","Economic Growth and Black Political Representation","Postwar gains in Black income, professional employment, elected office, and public leadership expanded political influence while substantial wealth and opportunity gaps persisted.","longitudinal data comparing Black representation or income growth with continuing racial disparities"],
    ["4.16","U4","Demographic and Religious Diversity in Contemporary Black Communities","Contemporary Black communities include varied national origins, migration histories, regions, classes, religions, and cultural identities.","census, immigration, and religious-affiliation data demonstrating internal diversity within Black populations"],
    ["4.17","U4","The Evolution of African American Music: From Spirituals to Hip-Hop","African American musical traditions continually transformed inherited forms through innovation, migration, technology, commerce, and political expression.","musical evidence tracing a technique, theme, or performance practice across more than one Black musical tradition"],
    ["4.18","U4","Black Life in Theater, TV, and Film","Black creators and performers have contested stereotypes and expanded representation in theater, television, and film while negotiating unequal access to production and ownership.","works and industry records showing changes in Black representation and creative control"],
    ["4.19","U4","African Americans and Sports","Sports have offered Black athletes opportunity and public influence while also exposing conflicts over segregation, labor, protest, representation, and commercial control.","athlete testimony, league policies, pay data, or protest records connecting sports to broader racial politics"],
    ["4.20","U4","Science, Medicine, and Technology in Black Communities","Black scientists, medical professionals, inventors, and communities contributed to innovation while confronting exclusion and unequal health systems.","professional records or health data showing both Black scientific contribution and institutional barriers"],
    ["4.21","U4","Black Studies, Black Futures, and Afrofuturism","Black Studies and Afrofuturism use scholarship and speculative cultural forms to examine history, imagine alternative futures, and critique present systems of power.","scholarship or speculative art that connects Black historical experience to imagined social or technological futures"],
  ];

  const byUnit = new Map();
  T.forEach((t) => {
    if (!byUnit.has(t[1])) byUnit.set(t[1], []);
    byUnit.get(t[1]).push(t);
  });

  function rotatedOptions(correct, distractors, seed) {
    const pos = seed % 4;
    const out = distractors.slice(0, 3);
    out.splice(pos, 0, correct);
    return { o: out, c: [pos] };
  }

  function peersFor(topic) {
    return byUnit.get(topic[1]).filter((x) => x[0] !== topic[0]);
  }

  const bank = [];
  T.forEach((t, idx) => {
    const [code, unit, title, focus, evidence] = t;
    const peers = peersFor(t);
    const p1 = peers[idx % peers.length];
    const p2 = peers[(idx + 5) % peers.length];
    const p3 = peers[(idx + 9) % peers.length];
    const gid = `apaas-${code.replace(".", "-")}`;
    const stimulus = {
      type: "text",
      title: `Synthetic source — ${title}`,
      text: `A scholar examining ${title.toLowerCase()} argues: ${focus}`,
      source: "Original synthetic source written for AP Exam Practice; not a historical quotation or College Board source.",
      requiredSource: false,
    };

    const q1ans = rotatedOptions(focus, [p1[3], p2[3], p3[3]], idx);
    const q1 = {
      id: `${gid}-1`, unit, topicCode: code, skill: "2.A", type: "s",
      q: "Which statement best identifies the central claim of the source?",
      o: q1ans.o, c: q1ans.c,
      e: `The source's central claim is the statement tied to CED Topic ${code}, ${title}. The other choices describe different topics from the same unit and therefore do not match this source's evidence or reasoning.`,
    };

    const q2ans = rotatedOptions(evidence, [p1[4], p2[4], p3[4]], idx + 1);
    const q2 = {
      id: `${gid}-2`, unit, topicCode: code, skill: "3.B", type: "s",
      q: "Which additional evidence would most directly support the source's claim?",
      o: q2ans.o, c: q2ans.c,
      e: `The strongest support would be ${evidence}. That evidence bears directly on ${title}; the alternatives are relevant to other topics in Unit ${unit.slice(1)} and would not directly establish the source's particular claim.`,
    };

    const contextCorrect = `It places ${title} within a broader African American Studies analysis of historical change, culture, institutions, identity, or power rather than treating the topic as an isolated fact.`;
    const q3ans = rotatedOptions(contextCorrect, [
      "It treats the source as self-proving evidence, so no comparison with other sources or historical context is necessary.",
      "It shows that developments within the topic can be explained by a single cause that operated identically across all places and periods.",
      "It implies that present-day meanings can be projected directly onto earlier people without considering the historical context in which they acted.",
    ], idx + 2);
    const q3 = {
      id: `${gid}-3`, unit, topicCode: code, skill: "1.D", type: "s",
      q: "How does the source most appropriately relate this topic to the discipline of African American Studies?",
      o: q3ans.o, c: q3ans.c,
      e: `African American Studies connects specific developments to broader questions about history, culture, institutions, identity, and power. The other options reject contextual analysis or impose unjustified single-cause and presentist interpretations.`,
    };

    [q1, q2, q3].forEach((q, sequence) => {
      q.stimulusGroupId = gid;
      q.sequence = sequence + 1;
      q.stimulus = stimulus;
      bank.push(q);
    });
  });

  window.QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES = bank;
})();
