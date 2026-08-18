// AP African American Studies — required-source conversion batch 1.
//
// This development overlay replaces synthetic source identities for 37 of the
// 74 topic sets with named required sources from the current CED. It does not
// reproduce copyrighted source text. Instead it uses concise original
// descriptions/paraphrases so the item bank can validate provenance, topic
// alignment, and required/unfamiliar source ratios before local visual assets
// and any public-domain excerpts are consolidated into the canonical bank.
(() => {
  "use strict";
  const bank = window.QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES;
  if (!Array.isArray(bank) || bank.length === 0) return;

  const required = {
    "1.4": ["Aksumite Coin Showing King Ezana, c. 340–400", "object", "A coin issued in the Aksumite world depicts royal authority and reflects a state with its own currency, long-distance trade connections, and changing religious symbols."],
    "1.5": ["Catalan Atlas by Abraham Cresques, 1375", "map", "A Mediterranean map depicts Mansa Musa prominently in West Africa with gold, reflecting outside awareness of Mali's wealth and its place in trans-Saharan exchange."],
    "1.6": ["The Sunjata Story — Glimpse of a Mande Epic, griot performance", "performance", "A griot performance preserves and transmits political memory, genealogy, values, and the story of Sundiata through an oral tradition requiring skilled interpretation and performance."],
    "1.7": ["Yoruba Oshe Shango Ceremonial Wand, mid-20th century", "object", "A ceremonial object associated with Shango represents continuities in Yoruba religious practice and helps illustrate how African cosmologies persisted and adapted across time and diaspora."],
    "1.8": ["Photographs of Great Zimbabwe's Walls and Stone Enclosures", "visual", "Monumental stone architecture at Great Zimbabwe demonstrates substantial local political organization, skilled construction, and participation in regional and Indian Ocean exchange networks."],
    "1.9": ["Letter from Nzinga Mbemba to Portuguese King João III, 1526", "text", "The Kongo ruler appeals directly to the Portuguese king about the destabilizing effects of slave trading, demonstrating diplomatic agency within an unequal Atlantic relationship."],
    "1.10": ["Queen Mother Pendant Mask: Iyoba, 16th century", "object", "A Benin court object honoring an iyoba reflects the political and dynastic importance of royal women and the relationship between kinship, authority, and court representation."],
    "1.11": ["Chafariz d'El-Rey (The King's Fountain), 1570–1580", "visual", "A Lisbon street scene includes Africans in varied social positions, illustrating African presence and mobility in an early modern European Atlantic city."],

    "2.4": ["Stowage of the British Slave Ship Brookes, early 19th century", "diagram", "The abolitionist diagram arranges captive bodies in the ship's hold to communicate the extreme crowding and dehumanizing conditions of the Middle Passage."],
    "2.5": ["Broadside for an Auction of Enslaved Persons at the Charleston Courthouse, 1859", "text", "An auction broadside advertises people for sale in a public market, documenting the commodification of enslaved people and the institutional operation of the domestic slave trade."],
    "2.7": ["Louisiana Slave Code (Code Noir), 1724, Articles 1–10", "law", "The legal code regulates the lives and status of enslaved people, showing how colonial law formalized racial slavery and restricted autonomy."],
    "2.11": ["Letter from Governor of Florida to His Majesty, 1739", "text", "A Spanish colonial official reports events surrounding Black fugitives and Florida, providing evidence for how imperial rivalry and promises of freedom shaped Fort Mose and resistance to British slavery."],
    "2.12": ["Preliminary Declaration from the Constitution of Haiti, 1805", "law", "The Haitian constitutional declaration frames independence in the aftermath of revolution and slavery, asserting Black sovereignty and a decisive break with colonial rule."],
    "2.14": ["Why Sit Here and Die? by Maria W. Stewart, 1832", "text", "Stewart calls for Black advancement, education, action, and women's public leadership, linking racial justice with a forceful critique of exclusion and passivity."],
    "2.18": ["The Condition, Elevation, Emigration, and Destiny of the Colored People of the United States by Martin R. Delany, 1852", "text", "Delany evaluates Black political prospects in the United States and argues for emigration as a strategy for autonomy, revealing debates over citizenship, belonging, and nationhood."],
    "2.19": ["Appeal by David Walker, 1829", "text", "Walker condemns slavery and racial oppression in uncompromising terms and urges Black resistance, representing a radical strand of antebellum Black political thought."],
    "2.20": ["Harriet Tubman's reflection in The Refugee by Benjamin Drew, 1856", "text", "Tubman's recollection describes self-emancipation and the refusal to return to slavery, illuminating both personal agency and the broader networks associated with escape from bondage."],
    "2.24": ["General Order No. 3, issued by Maj. Gen. Gordon Granger, 1865", "law", "The order announces in Texas that enslaved people are free and specifies a changed relationship between former masters and formerly enslaved workers, making it central to Juneteenth memory."],

    "3.1": ["Thirteenth, Fourteenth, and Fifteenth Amendments to the U.S. Constitution", "law", "The Reconstruction Amendments abolish slavery, establish national citizenship and equal protection, and prohibit racial discrimination in voting, creating a new constitutional basis for Black freedom and political participation."],
    "3.4": ["Plessy v. Ferguson, U.S. Supreme Court ruling, 1896", "law", "The Court upholds state-mandated racial segregation under a 'separate but equal' doctrine, illustrating the legal retreat from Reconstruction-era protections."],
    "3.5": ["A Red Record by Ida B. Wells-Barnett, 1895, Chapter 1", "text", "Wells documents lynching and challenges white-supremacist justifications for racial violence, using evidence and investigative argument to expose the operation of Jim Crow terror."],
    "3.6": ["If We Must Die by Claude McKay, 1919", "poem", "McKay's poem answers violent attack with a call for collective dignity and resistance, making it a powerful cultural response to the racial violence associated with the Red Summer era."],
    "3.7": ["The Souls of Black Folk by W.E.B. Du Bois, 1903", "text", "Du Bois analyzes the color line and double consciousness, describing the tension of Black life in a society that denies full belonging while demanding participation in American civic identity."],
    "3.8": ["A Voice from the South by Anna Julia Cooper, 1892", "text", "Cooper argues for Black women's intellectual and social leadership and links the advancement of Black communities to the opportunities and status of women."],
    "3.11": ["The New Negro: An Interpretation by Alain Locke, 1925", "text", "Locke presents a self-conscious modern Black identity grounded in cultural innovation, racial pride, and self-definition rather than inherited white stereotypes."],
    "3.16": ["The Migration Series by Jacob Lawrence, 1940–1941", "visual", "Lawrence's painted series depicts the movement of Black southerners to northern and midwestern cities, presenting migration as a collective historical process shaped by labor, violence, family, and hope."],
    "3.18": ["Address to the Second UNIA Convention by Marcus Garvey, 1921", "text", "Garvey promotes racial pride, Black nationalism, economic self-determination, and international solidarity, illustrating the mass political appeal of the UNIA."],

    "4.1": ["Discourse on Colonialism by Aimé Césaire, 1955", "text", "Césaire rejects claims that colonialism was a civilizing project and instead describes colonial rule as violent, exploitative, and dehumanizing for both colonized people and colonizing societies."],
    "4.3": ["Should I Sacrifice to Live 'Half-American'? by James G. Thompson, Pittsburgh Courier, 1942", "text", "Thompson asks why Black Americans should fight fascism abroad while facing racism at home, helping articulate the Double V demand for victory overseas and against discrimination in the United States."],
    "4.4": ["Brown v. Board of Education of Topeka, U.S. Supreme Court opinion, 1954", "law", "The Court rejects state-mandated segregation in public schools, concluding that separate educational facilities are inherently unequal under the Fourteenth Amendment."],
    "4.5": ["Home Owners' Loan Corporation Residential Security Map of Philadelphia and Camden, 1937", "map", "The map grades neighborhoods for lending risk in a way that reflects racialized housing judgments, providing evidence of how institutional policy shaped access to credit and residential opportunity."],
    "4.6": ["Nonviolence and Racial Justice by Martin Luther King Jr., 1957", "text", "King defends nonviolent direct action as a method that resists injustice while seeking social transformation, illustrating one major strategic approach within the civil rights movement."],
    "4.9": ["The Ballot or the Bullet by Malcolm X, 1964", "text", "Malcolm X frames Black political power, self-determination, and self-defense as urgent alternatives to continued racial subordination, while emphasizing the strategic importance of voting and political organization."],
    "4.11": ["The Black Panther Party Ten-Point Program, 1966", "text", "The program states demands concerning political power, employment, housing, education, policing, military service, justice, and material well-being, summarizing the party's critique and political goals."],
    "4.13": ["The Combahee River Collective Statement, 1977", "text", "The statement develops a Black feminist politics attentive to interacting racial, gender, sexual, and class oppression and argues that liberation requires confronting these systems together."],
    "4.15": ["Commencement Address of General Colin Powell at Howard University, 1994", "speech", "Powell reflects on achievement, opportunity, responsibility, and racial progress while addressing graduates of a historically Black university during a period of expanded Black public leadership."],
    "4.21": ["Poster for the film Space Is the Place, c. 1974", "visual", "The film poster presents Sun Ra's cosmic imagery and speculative Black futurism, using science-fiction aesthetics to imagine escape, transformation, and alternative Black futures."],
  };

  const byTopic = new Map();
  bank.forEach((q) => {
    if (!byTopic.has(q.topicCode)) byTopic.set(q.topicCode, []);
    byTopic.get(q.topicCode).push(q);
  });

  Object.entries(required).forEach(([topicCode, spec]) => {
    const group = byTopic.get(topicCode);
    if (!group || group.length < 3) throw new Error(`${topicCode}: required-source overlay cannot find source set`);
    const [title, sourceKind, summary] = spec;
    const stimulus = {
      type: "text",
      title,
      text: summary,
      source: `${title}. Required source in the AP African American Studies course framework; student-facing text here is an original summary/description for this unofficial practice bank.`,
      sourceKind,
      requiredSource: true,
    };
    group.forEach((q) => { q.stimulus = stimulus; });
    group[0].q = sourceKind === "text" || sourceKind === "law" || sourceKind === "speech" || sourceKind === "poem"
      ? "Which statement best identifies a central idea or historical significance of the required source?"
      : "Which interpretation is best supported by the required source as described?";
  });
})();
