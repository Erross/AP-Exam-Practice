// ============================================================================
// AP United States Government and Politics — question bank
// ============================================================================
//
// PROVENANCE
//   Content status .... ORIGINAL, UNOFFICIAL practice content written for this
//                       project. These are NOT College Board released items, are
//                       not licensed from, endorsed by, or reviewed by College
//                       Board, and no released secure item is reproduced here.
//                       Foundational-document excerpts are short quotations from
//                       public-domain primary sources (or, for "Letter from a
//                       Birmingham Jail", brief excerpts used for commentary and
//                       teaching).
//   Aligned to ........ AP U.S. Government and Politics Course and Exam
//                       Description, Course Framework V.1 (© 2026 College Board),
//                       together with the official "Clarifications and Corrections
//                       to be Implemented for Fall 2026", which added four required
//                       foundational documents (Emancipation Proclamation,
//                       Federalist No. 39, the Gettysburg Address, and core
//                       principles from Adam Smith's The Wealth of Nations).
//   Effective year .... Fall 2026 CED / 2027 exam cycle.
//   Last reviewed ..... 2026-08-09
//   Exam format ....... Section I is 55 multiple-choice questions in 80 minutes,
//                       mixing individual questions with question sets built on a
//                       shared quantitative, text, foundational-document, or visual
//                       source. Every item here is SINGLE-SELECT: AP U.S.
//                       Government and Politics does not use "select two" items.
//
// COVERAGE — required foundational documents (all 13 are tested):
//   Declaration of Independence · Articles of Confederation · Federalist No. 10 ·
//   Brutus No. 1 · Federalist No. 39 · Federalist No. 51 · U.S. Constitution ·
//   Federalist No. 70 · Federalist No. 78 · Emancipation Proclamation ·
//   Gettysburg Address · Letter from a Birmingham Jail · Adam Smith's core
//   principles from The Wealth of Nations
//
// COVERAGE — required Supreme Court cases (all 14 in the Fall 2026 CED are tested):
//   Marbury v. Madison (1803) · McCulloch v. Maryland (1819) ·
//   Schenck v. United States (1919) · Brown v. Board of Education (1954) ·
//   Baker v. Carr (1962) · Engel v. Vitale (1962) · Gideon v. Wainwright (1963) ·
//   Tinker v. Des Moines (1969) · New York Times Co. v. United States (1971) ·
//   Wisconsin v. Yoder (1972) · Shaw v. Reno (1993) · United States v. Lopez (1995) ·
//   McDonald v. Chicago (2010) · Citizens United v. FEC (2010)
//   Note: Roe v. Wade is NOT on the CED's required-cases list. It remains required
//   *course content* in Topic 3.9 alongside Griswold v. Connecticut (1965) and
//   Dobbs v. Jackson Women's Health Organization (2022), which overruled it.
//
// SCHEMA
//   {
//     id: "apgov-u1-001",     // stable, never reused, never renumbered
//     unit: "U1",              // matches an id in subjects.js units[]
//     topic: "…",               // short CED-anchored learning-objective label
//     type: "s",                 // "s" = single-select (the only type used here)
//     stimulusGroupId: null,      // or a group id shared by every item in a set
//     stimulus: null,              // the shared source object (see below), or absent
//     q: "…",
//     o: ["A", "B", "C", "D"],
//     c: [2],                          // index/indices of the correct option(s)
//     e: "Rationale shown on the results review page."
//   }
//
//   Stimulus objects:
//     { type: "document",     title, source, text }         foundational-document excerpt
//     { type: "text",         title, source, text }         other text / qualitative source
//     { type: "quantitative", title, source, columns, rows }  data table
//     { type: "visual",       title, source, description }  described cartoon / map / infographic
//                                                            (this app ships no image assets)
//
//   Every question in a set carries the same stimulus object and the same
//   stimulusGroupId; js/app.js renders the source once, above the question, with a
//   "Questions X–Y refer to the source below" lead-in.
// ============================================================================

// ---------------------------------------------------------------------------
// Shared stimulus sources
// ---------------------------------------------------------------------------

const S_FED10 = {
  type: "document",
  title: "Federalist No. 10 (1787)",
  source: "James Madison, Federalist No. 10",
  text:
    "By a faction, I understand a number of citizens, whether amounting to a majority or a minority of the whole, " +
    "who are united and actuated by some common impulse of passion, or of interest, adverse to the rights of other " +
    "citizens, or to the permanent and aggregate interests of the community. … It could never be more truly said than " +
    "of the first remedy, that it was worse than the disease. … The inference to which we are brought is, that the " +
    "CAUSES of faction cannot be removed, and that relief is only to be sought in the means of controlling its EFFECTS. " +
    "… Extend the sphere, and you take in a greater variety of parties and interests; you make it less probable that a " +
    "majority of the whole will have a common motive to invade the rights of other citizens.",
};

const S_BRUTUS1 = {
  type: "document",
  title: "Brutus No. 1 (1787)",
  source: "\"Brutus\" (Anti-Federalist), Brutus No. 1",
  text:
    "In a republic, the manners, sentiments, and interests of the people should be similar. If this be not the case, " +
    "there will be a constant clashing of opinions; and the representatives of one part will be continually striving " +
    "against those of the other. … The powers of the general legislature extend to every case that is of the least " +
    "importance … and it is expressly declared, that all laws made in pursuance of the constitution shall be the " +
    "supreme law of the land, any thing in the constitution or laws of the individual states to the contrary " +
    "notwithstanding.",
};

const S_FED39 = {
  type: "document",
  title: "Federalist No. 39 (1788)",
  source: "James Madison, Federalist No. 39",
  text:
    "We may define a republic to be … a government which derives all its powers directly or indirectly from the great " +
    "body of the people, and is administered by persons holding their offices during pleasure, for a limited period, or " +
    "during good behavior. … The proposed Constitution, therefore, is, in strictness, neither a national nor a federal " +
    "Constitution, but a composition of both. In its foundation it is federal, not national; in the sources from which " +
    "the ordinary powers of the government are drawn, it is partly federal, and partly national.",
};

const S_GETTYSBURG = {
  type: "document",
  title: "The Gettysburg Address (1863)",
  source: "Abraham Lincoln, delivered at Gettysburg, Pennsylvania, November 19, 1863",
  text:
    "Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, " +
    "and dedicated to the proposition that all men are created equal. Now we are engaged in a great civil war, testing " +
    "whether that nation, or any nation so conceived and so dedicated, can long endure. … that this nation, under God, " +
    "shall have a new birth of freedom — and that government of the people, by the people, for the people, shall not " +
    "perish from the earth.",
};

const S_GRANTS = {
  type: "quantitative",
  title: "Federal grants-in-aid to state and local governments, selected years",
  source:
    "Illustrative figures compiled for this practice set from federal budget historical tables; " +
    "rounded and simplified for analysis practice.",
  columns: ["Fiscal year", "Total grants (billions of current dollars)", "Share that is categorical", "Share of state/local revenue"],
  rows: [
    ["1980", "$91", "About 80%", "About 26%"],
    ["1990", "$135", "About 88%", "About 20%"],
    ["2000", "$285", "About 89%", "About 22%"],
    ["2010", "$608", "About 92%", "About 31%"],
    ["2020", "$721", "About 92%", "About 30%"],
  ],
};

const S_FED70 = {
  type: "document",
  title: "Federalist No. 70 (1788)",
  source: "Alexander Hamilton, Federalist No. 70",
  text:
    "Energy in the executive is a leading character in the definition of good government. … A feeble executive implies " +
    "a feeble execution of the government. A feeble execution is but another phrase for a bad execution; and a " +
    "government ill executed, whatever it may be in theory, must be, in practice, a bad government. … The ingredients " +
    "which constitute energy in the executive are unity, duration, an adequate provision for its support, and " +
    "competent powers. … Decision, activity, secrecy, and dispatch will generally characterize the proceedings of one " +
    "man in a much more eminent degree than the proceedings of any greater number.",
};

const S_FED78 = {
  type: "document",
  title: "Federalist No. 78 (1788)",
  source: "Alexander Hamilton, Federalist No. 78",
  text:
    "The Executive not only dispenses the honors, but holds the sword of the community. The legislature not only " +
    "commands the purse, but prescribes the rules by which the duties and rights of every citizen are to be regulated. " +
    "The judiciary, on the contrary, has no influence over either the sword or the purse … It may truly be said to have " +
    "neither FORCE nor WILL, but merely judgment … and must ultimately depend upon the aid of the executive arm even " +
    "for the efficacy of its judgments. … next to permanency in office, nothing can contribute more to the independent " +
    "spirit of the judges than a fixed provision for their support.",
};

const S_BIRMINGHAM = {
  type: "text",
  title: "\"Letter from a Birmingham Jail\" (1963) — brief excerpt for commentary and teaching",
  source: "Martin Luther King Jr., written from the Birmingham city jail, April 16, 1963",
  text:
    "One may well ask: 'How can you advocate breaking some laws and obeying others?' The answer lies in the fact that " +
    "there are two types of laws: just and unjust. … A just law is a man-made code that squares with the moral law … " +
    "An unjust law is a code that a numerical or power majority group compels a minority group to obey but does not " +
    "make binding on itself. … An individual who breaks a law that conscience tells him is unjust, and who willingly " +
    "accepts the penalty of imprisonment in order to arouse the conscience of the community over its injustice, is in " +
    "reality expressing the highest respect for law.",
};

const S_EMANCIPATION = {
  type: "document",
  title: "The Emancipation Proclamation (1863)",
  source: "Abraham Lincoln, Executive Proclamation, effective January 1, 1863",
  text:
    "That on the first day of January, in the year of our Lord one thousand eight hundred and sixty-three, all persons " +
    "held as slaves within any State or designated part of a State, the people whereof shall then be in rebellion " +
    "against the United States, shall be then, thenceforward, and forever free … And I further declare and make known, " +
    "that such persons of suitable condition will be received into the armed service of the United States.",
};

const S_WEALTH = {
  type: "document",
  title: "The Wealth of Nations (1776) — core principles excerpt",
  source: "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations, Book IV, Ch. 2",
  text:
    "By preferring the support of domestic to that of foreign industry, he intends only his own security; and by " +
    "directing that industry in such a manner as its produce may be of the greatest value, he intends only his own " +
    "gain, and he is in this, as in many other cases, led by an invisible hand to promote an end which was no part of " +
    "his intention. … By pursuing his own interest he frequently promotes that of the society more effectually than " +
    "when he really intends to promote it.",
};

const S_BILLDATA = {
  type: "quantitative",
  title: "Outcomes of bills introduced in the U.S. House, selected Congresses",
  source:
    "Illustrative figures compiled for this practice set to approximate typical patterns reported by the " +
    "Congressional Research Service; rounded and simplified for analysis practice, not official totals for a specific Congress.",
  columns: ["Congress (illustrative)", "Bills introduced", "Reported out of committee", "Enacted into law"],
  rows: [
    ["A", "~9,000", "~600", "~330"],
    ["B", "~10,500", "~550", "~310"],
    ["C", "~11,000", "~500", "~270"],
  ],
};

const S_TURNOUT = {
  type: "quantitative",
  title: "Voter turnout (voting-age population), presidential vs. midterm election years",
  source:
    "Illustrative figures approximating typical modern U.S. turnout patterns reported by the U.S. Census Bureau and " +
    "academic turnout trackers; rounded and simplified for analysis practice, not exact totals for specific years.",
  columns: ["Election year (illustrative)", "Election type", "Turnout (% of voting-age population)"],
  rows: [
    ["Year 1", "Presidential", "~60%"],
    ["Year 2", "Midterm", "~40%"],
    ["Year 3", "Presidential", "~62%"],
    ["Year 4", "Midterm", "~47%"],
  ],
};

// ---------------------------------------------------------------------------

window.QUESTIONS_AP_US_GOVERNMENT = [
  {
    id: "apgov-u1-001",
    unit: "U1",
    topic: "1.1 Ideals of democracy: natural rights and the social contract in the Declaration",
    type: "s",
    stimulusGroupId: null,
    q: "A state legislator argues that a proposed law is illegitimate because 'the people never consented to be governed this way, and a government that violates the rights it exists to protect forfeits its claim to obedience.' This argument draws most directly on which idea reflected in the Declaration of Independence?",
    o: ["Locke's claim that government rests on consent and exists to secure natural rights", "Montesquieu's claim that liberty requires legislative, executive, and judicial power to be separated", "Rousseau's claim that a general will is sovereign and cannot be transferred to representatives", "Hobbes's claim that subjects owe a sovereign obedience even when the sovereign governs harshly"],
    c: [0],
    e: "The Declaration restates Locke's natural-rights and consent-of-the-governed reasoning, including the right to alter or abolish a government that becomes destructive of those ends. Montesquieu supplied the separation-of-powers argument, Rousseau's general will rejects representation, and Hobbes drew the opposite conclusion about the duty of obedience.",
  },

  {
    id: "apgov-u1-002",
    unit: "U1",
    topic: "1.2 Types of democracy: participatory, pluralist, and elite models",
    type: "s",
    stimulusGroupId: null,
    q: "A state adopts a ballot-initiative process letting citizens place statutes directly before voters, bypassing the legislature. This reform most clearly reflects which model of democracy?",
    o: ["Republicanism, because elected representatives are expected to filter and refine public passions", "Participatory democracy, because it broadens direct citizen involvement in making policy", "Elite democracy, because ballot measures are usually drafted and funded by well-resourced organizations", "Pluralist democracy, because organized groups bargain with one another over the final text"],
    c: [1],
    e: "Direct-initiative processes are the classic institutional expression of participatory democracy — broad, direct citizen involvement. Pluralism emphasizes bargaining among competing organized groups, elite theory emphasizes decisions made by a small number of influential actors, and republicanism emphasizes filtering public views through elected representatives.",
  },

  {
    id: "apgov-u1-003",
    unit: "U1",
    topic: "1.2 Types of democracy: pluralism as group competition",
    type: "s",
    stimulusGroupId: null,
    q: "Which outcome would provide the strongest evidence FOR a pluralist rather than an elite interpretation of American policymaking?",
    o: ["A final rule reflects concessions negotiated among unions, industry associations, and environmental groups", "Cabinet appointees are drawn overwhelmingly from a small set of universities and firms", "The same twenty donors fund the winning candidate in most competitive Senate races", "A single business roundtable's preferred tax provision is enacted with almost no changes"],
    c: [0],
    e: "Pluralism predicts policy as the negotiated product of many competing organized groups, with concessions on all sides and no single group dominating. The other three describe influence concentrated in a narrow set of actors, which is what elite theory predicts.",
  },

  {
    id: "apgov-u1-004",
    unit: "U1",
    topic: "1.4 Challenges of the Articles of Confederation",
    type: "s",
    stimulusGroupId: null,
    q: "During Shays's Rebellion, the national government could not fund troops to restore order and had to rely on a privately financed state militia. Which weakness of the Articles of Confederation does this most directly illustrate?",
    o: ["Congress lacked the power to negotiate treaties with foreign nations on the states' behalf", "The Articles gave the national executive too little authority to command state militias", "Amending the Articles required the approval of nine of the thirteen state legislatures", "Congress could requisition funds from the states but could not tax citizens directly"],
    c: [3],
    e: "Under the Articles, Congress could only request money from the states, which frequently declined, leaving no reliable revenue to field troops. Congress did hold the exclusive treaty power; there was no national executive at all, weak or otherwise; and amendment required unanimous consent, not nine states (nine votes were the threshold for passing important measures).",
  },

  {
    id: "apgov-u1-005",
    unit: "U1",
    topic: "1.5 Ratification: the Great (Connecticut) Compromise",
    type: "s",
    stimulusGroupId: null,
    q: "Which statement best explains why the Great (Connecticut) Compromise was necessary at the Constitutional Convention?",
    o: ["Delegates from populous and less populous states disagreed over whether representation should be by population or equal", "Delegates disagreed over whether ratification should await the addition of a bill of rights", "Delegates disagreed over whether Congress or the voters should select the chief executive", "Northern and Southern delegates disagreed over whether enslaved people should be counted for purposes of representation"],
    c: [0],
    e: "The Virginia Plan's population-based legislature and the New Jersey Plan's equal-state representation were reconciled by a bicameral Congress: a population-based House and an equal-representation Senate. The three-fifths issue, the method of selecting the president, and the bill of rights were separate disputes settled in other ways.",
  },

  {
    id: "apgov-u1-006",
    unit: "U1",
    topic: "1.3 Government power and individual rights: enumerated vs. reserved powers",
    type: "s",
    stimulusGroupId: null,
    q: "A member of Congress proposes a federal statute setting the curriculum and graduation requirements for every public high school in the country. Opponents argue the bill exceeds Congress's constitutional authority. Their strongest constitutional objection is that",
    o: ["education is not an enumerated power and is therefore reserved to the states", "the necessary and proper clause has been read to reach military and fiscal matters alone", "the supremacy clause applies only where Congress and a state have enacted identical statutes", "the Tenth Amendment bars Congress from spending money on any subject the states regulate"],
    c: [0],
    e: "Article I, Section 8 enumerates powers such as coining money and regulating interstate commerce; education is not among them, so it is a reserved power under the Tenth Amendment. Congress may still influence schools indirectly through conditional spending, which is why the Tenth Amendment poses no bar to federal education funding; the supremacy clause resolves conflicts between valid federal and state law; and the necessary and proper clause has been read broadly rather than being confined to military and fiscal subjects.",
  },

  {
    id: "apgov-u1-007",
    unit: "U1",
    topic: "1.7 Relationship between the states and the federal government: the necessary and proper clause",
    type: "s",
    stimulusGroupId: null,
    q: "Congress creates a national air-traffic control agency, a body nowhere mentioned in Article I. Which constitutional argument most directly supports its creation?",
    o: ["Article I's power to establish post offices and post roads extends to every federal transportation agency", "The supremacy clause independently grants Congress authority over any subject crossing state lines", "The necessary and proper clause lets Congress choose reasonable means to carry out its enumerated commerce power", "The Tenth Amendment reserves regulation of interstate transportation to the national government"],
    c: [2],
    e: "The elastic clause lets Congress select means reasonably adapted to executing an enumerated power — here, the commerce power. The Tenth Amendment reserves powers to the states rather than the nation, the supremacy clause settles conflicts between valid federal and state law but grants no independent legislative power, and the post roads clause is a narrow grant that does not reach aviation.",
  },

  {
    id: "apgov-u1-008",
    unit: "U1",
    topic: "1.8 Constitutional interpretations of federalism: McCulloch v. Maryland (1819)",
    type: "s",
    stimulusGroupId: null,
    q: "A state imposes a special tax that applies only to a federally chartered institution operating inside its borders. Based on the reasoning in McCulloch v. Maryland (1819), a court would most likely hold that",
    o: ["the tax is invalid, because Article I expressly forbids state taxation of corporations", "the tax is valid, because the bank competed directly with banks the state itself chartered", "the tax is invalid, because a state may not tax an instrument Congress lawfully created", "the tax is valid, because taxation is a power the Tenth Amendment reserves to the states"],
    c: [2],
    e: "McCulloch held both that Congress had implied power to charter the bank and that Maryland could not tax it, because a state's taxing power could otherwise be used to destroy a legitimate federal instrument — the power to tax involves the power to destroy. Taxation is concurrent rather than reserved to the states, competition with state-chartered banks played no part in the holding, and Article I contains no such express prohibition.",
  },

  {
    id: "apgov-u1-009",
    unit: "U1",
    topic: "1.8 Constitutional interpretations of federalism: comparing McCulloch and United States v. Lopez",
    type: "s",
    stimulusGroupId: null,
    q: "Which statement best compares McCulloch v. Maryland (1819) and United States v. Lopez (1995)?",
    o: ["McCulloch expanded national power through implied powers, while Lopez limited the commerce power", "Both decisions narrowed national power in favor of the states' reserved authority", "Lopez broadened the commerce power, while McCulloch narrowed the necessary and proper clause", "Both decisions turned on the Fourteenth Amendment rather than on Article I powers"],
    c: [0],
    e: "McCulloch is the classic expansion of national power through implied powers plus supremacy. Lopez cut the other way: possessing a gun in a school zone was not economic activity substantially affecting interstate commerce, so the federal statute exceeded the commerce power. Neither decision turned on the Fourteenth Amendment.",
  },

  {
    id: "apgov-u1-010",
    unit: "U1",
    topic: "1.9 Federalism in action: categorical vs. block grants",
    type: "s",
    stimulusGroupId: null,
    q: "A governor complains that most federal money her state receives 'comes with a manual attached' and cannot be moved between programs even when local needs shift. She is describing the principal difference between",
    o: ["block grants, which fund narrow purposes with detailed conditions, and categorical grants, which allow broad discretion", "federal mandates, which transfer money to the states, and grants-in-aid, which impose duties without money", "general revenue sharing, which imposes detailed program conditions, and matching grants, which impose none", "categorical grants, which fund narrow purposes with detailed conditions, and block grants, which allow broad discretion"],
    c: [3],
    e: "Categorical grants dominate federal aid and carry detailed strings; block grants trade some federal control for state flexibility within a broad policy area. Option B simply reverses the definitions. General revenue sharing was distinctive for imposing almost no conditions while matching grants do carry conditions, and mandates impose duties without money while grants-in-aid transfer money — the reverse of the last option.",
  },

  {
    id: "apgov-u1-011",
    unit: "U1",
    topic: "1.9 Federalism in action: unfunded mandates and fiscal federalism",
    type: "s",
    stimulusGroupId: null,
    q: "Congress requires every state to upgrade its voter-registration database to a new federal security standard but appropriates no money for the upgrade. This is best described as",
    o: ["preemption, because the federal standard displaces conflicting state registration rules", "an unfunded mandate, because compliance is required but states must absorb the cost", "cooperative federalism, because the two levels of government are sharing the program's cost", "a block grant, because states retain discretion over how they meet the standard"],
    c: [1],
    e: "An unfunded mandate imposes a federal requirement without providing the money to satisfy it — a recurring source of state-federal friction. No funds are transferred, so this is not a grant of any kind; costs are not shared, so it is not the cost-sharing sense of cooperative federalism; and preemption displaces existing state law rather than commanding new state action.",
  },

  {
    id: "apgov-u1-012",
    unit: "U1",
    topic: "1.7 Relationship between the states and the federal government: concurrent powers",
    type: "s",
    stimulusGroupId: null,
    q: "Which of the following is a concurrent power under the U.S. federal system?",
    o: ["Conducting foreign diplomacy", "Levying and collecting taxes on income", "Regulating commerce among the states", "Coining money"],
    c: [1],
    e: "Concurrent powers are exercised by both the national and state governments; taxation, borrowing, establishing courts, and law enforcement are standard examples. Coining money, regulating commerce among the states, and conducting diplomacy are exclusive national powers — states may regulate commerce inside their own borders, but not among the states.",
  },

  {
    id: "apgov-u1-013",
    unit: "U1",
    topic: "1.9 Federalism in action: devolution",
    type: "s",
    stimulusGroupId: null,
    q: "The 1996 welfare reform law replaced an open-ended federal entitlement with a block grant giving states wide latitude to design their own programs. This change is the standard textbook example of",
    o: ["fiscal federalism, the use of detailed categorical conditions to direct how states spend aid", "preemption, the displacement of state welfare rules by a uniform federal standard", "dual federalism, the strict separation of national and state policy responsibilities", "devolution, the transfer of policy authority and discretion from the nation to the states"],
    c: [3],
    e: "Devolution moves authority and discretion back toward the states, and the 1996 shift to a block grant is the canonical case. (This is a Unit 1 federalism concept under Topic 1.9, not a Unit 4 ideology concept.) Preemption runs the other direction, the reform loosened rather than tightened grant conditions, and dual federalism describes strictly separated spheres rather than a transfer of authority.",
  },

  {
    id: "apgov-u1-014",
    unit: "U1",
    topic: "1.6 Principles of American government: separation of powers and checks and balances",
    type: "s",
    stimulusGroupId: null,
    q: "Which pairing correctly matches a constitutional check to the branch that exercises it?",
    o: ["Judicial review — exercised by the Senate over rulings of the lower federal courts", "The pocket veto — exercised by the House over the president's executive appointments", "Impeachment and removal — exercised by the president over the federal judiciary", "Advice and consent on nominations — exercised by the Senate over the executive"],
    c: [3],
    e: "The Senate's advice-and-consent power over appointments is a legislative check on the executive. Judicial review belongs to the courts rather than the Senate, the pocket veto belongs to the president acting on legislation, and impeachment and removal belong to the House and Senate respectively.",
  },

  {
    id: "apgov-u1-015",
    unit: "U1",
    topic: "1.5 Ratification: the amendment process and constitutional durability",
    type: "s",
    stimulusGroupId: null,
    q: "Fewer than thirty amendments have been ratified in more than two centuries. Which feature of Article V best explains this?",
    o: ["Amendments need supermajorities at both the proposal and the ratification stage", "Ratified amendments must survive Supreme Court review before they take legal effect", "Every amendment must first be proposed by a national convention called by the states", "Amendments need simple majorities in Congress and in a majority of state legislatures"],
    c: [0],
    e: "Article V normally requires two-thirds of both chambers to propose and three-fourths of the states to ratify — supermajorities at both stages, so a modest minority of members or states can block change. Simple majorities do not suffice, Congress rather than a convention has proposed every ratified amendment, and the Court plays no part in ratification.",
  },

  {
    id: "apgov-u1-016",
    unit: "U1",
    topic: "1.2/1.4 Federalist No. 10: the problem of faction",
    type: "s",
    stimulusGroupId: "apgov-g-fed10",
    stimulus: S_FED10,
    q: "According to the excerpt, why does Madison reject removing the causes of faction?",
    o: ["Because removing them would require destroying liberty or imposing uniform opinions", "Because factions are imported from Europe and can be excluded by state law", "Because faction fades as a republic grows wealthier and more commercial", "Because a well-designed republic can prevent factions from forming at all"],
    c: [0],
    e: "Madison argues that the causes of faction are sown in human nature and could be removed only by destroying liberty or giving every citizen the same opinions — a remedy 'worse than the disease.' The Constitution must therefore control faction's effects rather than try to prevent factions from arising.",
  },

  {
    id: "apgov-u1-017",
    unit: "U1",
    topic: "1.2/1.4 Federalist No. 10: the extended republic argument",
    type: "s",
    stimulusGroupId: "apgov-g-fed10",
    stimulus: S_FED10,
    q: "Madison's instruction to 'extend the sphere' supports which conclusion about the proposed Constitution?",
    o: ["A small republic is safer because citizens there can deliberate with one another face to face", "Representation should be replaced by direct democracy wherever the population makes it practical", "National power should be confined to foreign affairs so that faction remains a local problem", "A large republic is safer because its variety of interests makes majority faction harder to assemble"],
    c: [3],
    e: "The extended-republic argument is the heart of Federalist No. 10: enlarging the polity multiplies interests, so a majority faction is less likely to form and, if it forms, less likely to act in concert. Madison explicitly contrasts this with the vulnerability of small direct democracies, and he says nothing about confining national power to foreign affairs.",
  },

  {
    id: "apgov-u1-018",
    unit: "U1",
    topic: "1.2/1.4 Federalist No. 10 compared with the Anti-Federalist position",
    type: "s",
    stimulusGroupId: "apgov-g-fed10",
    stimulus: S_FED10,
    q: "An Anti-Federalist writer responding to this passage would most likely counter that",
    o: ["faction is not a serious danger, because republics rarely produce durable majorities", "Congress should be empowered to regulate the press in order to keep faction under control", "a republic this large cannot keep representatives responsive to constituents, so smaller units better protect liberty", "the Senate should be abolished because it magnifies bargaining among rival factions"],
    c: [2],
    e: "Brutus and other Anti-Federalists accepted that faction was dangerous but drew the opposite conclusion from size: a vast, heterogeneous republic would produce distant, unrepresentative government. The other options misstate a position that took faction seriously and sought to protect, not restrict, liberty.",
  },

  {
    id: "apgov-u1-019",
    unit: "U1",
    topic: "1.3 Brutus No. 1: scale, diversity, and representation",
    type: "s",
    stimulusGroupId: "apgov-g-brutus1",
    stimulus: S_BRUTUS1,
    q: "The first sentences of the excerpt express which central Anti-Federalist concern?",
    o: ["That the states will lack the tax revenue needed to fund the new national government", "That members of the House will serve terms too short to develop real legislative expertise", "That a republic spanning dissimilar communities produces conflict and representatives who cannot reflect constituents", "That the Constitution gives federal courts too little jurisdiction over disputes between the states"],
    c: [2],
    e: "Brutus argues that republican government presupposes relative similarity of manners, sentiments, and interests; a continental republic would contain too much diversity for representatives to speak for their constituents. The other options raise concerns this passage does not make.",
  },

  {
    id: "apgov-u1-020",
    unit: "U1",
    topic: "1.3 Brutus No. 1: the necessary and proper and supremacy clauses",
    type: "s",
    stimulusGroupId: "apgov-g-brutus1",
    stimulus: S_BRUTUS1,
    q: "The excerpt's reference to laws that 'shall be the supreme law of the land' is used by Brutus to argue that",
    o: ["federal law will bind only those states that individually consent to each statute", "federal courts will lack the practical means to enforce national law against the states", "states retain the power to nullify federal statutes they judge to exceed the grant", "broad national powers plus supremacy will steadily absorb the authority of the states"],
    c: [3],
    e: "Brutus reads the sweeping grant of legislative power together with the supremacy clause as a mechanism by which the general government will progressively swallow the states — a prediction Federalists denied. He is describing what he expects supremacy to accomplish, not claiming that states may nullify federal law, consent to it statute by statute, or that courts cannot enforce it.",
  },

  {
    id: "apgov-u1-021",
    unit: "U1",
    topic: "1.5 Ratification debate: Anti-Federalist influence on outcomes",
    type: "s",
    stimulusGroupId: "apgov-g-brutus1",
    stimulus: S_BRUTUS1,
    q: "Which concrete outcome of the ratification debate is most directly attributable to arguments like the one in this excerpt?",
    o: ["The three-fifths compromise governing how enslaved persons counted toward representation", "The decision to give each state equal representation in the United States Senate", "The addition of the Bill of Rights, setting explicit textual limits on national power", "The creation of the Electoral College as an indirect method of choosing the president"],
    c: [2],
    e: "Anti-Federalist fear of an unbounded national government drove the promise, and then the delivery, of a Bill of Rights, including the Tenth Amendment's reservation of powers. The Electoral College, the three-fifths compromise, and equal Senate representation were all settled inside the Convention before the ratification debate began.",
  },

  {
    id: "apgov-u1-022",
    unit: "U1",
    topic: "1.7 Federalist No. 39: the compound republic",
    type: "s",
    stimulusGroupId: "apgov-g-fed39",
    stimulus: S_FED39,
    q: "Madison's claim that the Constitution is 'neither a national nor a federal Constitution, but a composition of both' is best understood as a description of",
    o: ["a unitary system in which a central government delegates revocable authority to its regional subunits", "a confederation in which the member states retain complete and independent sovereignty", "a parliamentary system in which the executive is drawn from the legislative majority", "a federal system mixing national and state features so that power is divided between the two levels"],
    c: [3],
    e: "Federalist No. 39 defends the Constitution as a compound of federal and national elements — ratification by states, a Senate chosen by states, a population-based House — dividing authority between levels instead of concentrating it in one. The Fall 2026 CED cites this document under Topic 1.7.",
  },

  {
    id: "apgov-u1-023",
    unit: "U1",
    topic: "1.7 Federalist No. 39: multiple access points for participation",
    type: "s",
    stimulusGroupId: "apgov-g-fed39",
    stimulus: S_FED39,
    q: "A citizen who fails to persuade her state legislature to act then lobbies her U.S. representative, and later sues in federal court. This pattern best illustrates which implication of the argument in the excerpt?",
    o: ["The right to petition attaches to the national government rather than to the states", "Dividing authority between national and state governments creates multiple access points for citizen influence", "Federalism ensures that a demand rejected at one level of government will succeed at another", "State governments function as administrative subdivisions that carry out policy set nationally"],
    c: [1],
    e: "A defining practical consequence of the compound republic is that citizens and groups can shop among venues — state legislatures, Congress, agencies, and courts. Multiple access points improve the opportunity for influence but guarantee nothing about success. States are separate governments rather than subdivisions, and the right to petition runs against both levels.",
  },

  {
    id: "apgov-u1-024",
    unit: "U1",
    topic: "1.1 Ideals of democracy: the Gettysburg Address and popular sovereignty",
    type: "s",
    stimulusGroupId: "apgov-g-gettysburg",
    stimulus: S_GETTYSBURG,
    q: "Lincoln's closing phrase, 'government of the people, by the people, for the people,' most directly reaffirms which democratic ideal?",
    o: ["Popular sovereignty, because ultimate political authority rests with the people themselves", "Limited government, because it restricts the ends that officials may lawfully pursue", "Federalism, because authority is shared between the national and state governments", "Separation of powers, because governing authority is divided among distinct institutions"],
    c: [0],
    e: "The phrase is the classic American statement of popular sovereignty. The Fall 2026 CED adds the Gettysburg Address to Topic 1.1 precisely because it reaffirms equality and popular sovereignty as foundations of American democracy.",
  },

  {
    id: "apgov-u1-025",
    unit: "U1",
    topic: "1.1 Ideals of democracy: linking the Gettysburg Address to the Declaration",
    type: "s",
    stimulusGroupId: "apgov-g-gettysburg",
    stimulus: S_GETTYSBURG,
    q: "Lincoln's phrase 'dedicated to the proposition that all men are created equal' is best understood as",
    o: ["an argument that the Constitution should be rewritten once the war has ended", "a paraphrase of the Constitution's Preamble, used to define the purposes of the Union", "a rejection of natural-rights philosophy in favor of unrestrained majority rule", "a restatement of the Declaration of Independence, used to define the nation's founding purpose"],
    c: [3],
    e: "Lincoln deliberately dated the nation from 1776 — 'four score and seven years' before 1863 — and borrowed the Declaration's equality language, framing the Civil War as a test of whether a nation so founded could endure. The Preamble contains no equality clause, and the speech argues for renewing, not discarding, the constitutional order.",
  },

  {
    id: "apgov-u1-026",
    unit: "U1",
    topic: "1.9 Federalism in action: describing trends in fiscal federalism data",
    type: "s",
    stimulusGroupId: "apgov-g-grants",
    stimulus: S_GRANTS,
    q: "Which statement is best supported by the data in the table?",
    o: ["Federal grants fell as a share of state and local revenue in every decade shown", "Total grants roughly doubled between 1980 and 2020 while the categorical share declined", "Total grants rose at each observation, and the categorical share rose from 1980 to 2020", "Block grants overtook categorical grants as the dominant form of federal aid to states after 1990"],
    c: [2],
    e: "Reading the table directly: totals rise at every observation, and the categorical share rises from about 80% to about 92%, so categorical grants remained dominant throughout. Totals grew roughly eightfold rather than doubling, the categorical share rose rather than declining, and the revenue share fluctuated rather than falling steadily.",
  },

  {
    id: "apgov-u1-027",
    unit: "U1",
    topic: "1.9 Federalism in action: drawing conclusions from fiscal federalism data",
    type: "s",
    stimulusGroupId: "apgov-g-grants",
    stimulus: S_GRANTS,
    q: "A political scientist uses this table to argue that federal influence over state policy has grown. Which feature of the data most directly supports that argument?",
    o: ["The five fiscal years shown are spaced ten years apart across four full decades", "The share of state and local revenue was lower in 1990 than it had been in 1980", "Rising dollar totals combined with a rising categorical share, since categorical grants carry conditions", "The table reports totals in current dollars rather than in inflation-adjusted dollars"],
    c: [2],
    e: "Influence follows from conditions, not dollars alone: more money delivered through more heavily conditioned categorical grants means more federal leverage over state choices. The 1990 dip in the revenue share and the use of unadjusted current dollars both cut against the argument, and the spacing of the observations is not evidence either way.",
  },

  {
    id: "apgov-u1-028",
    unit: "U1",
    topic: "1.9 Federalism in action: limitations of the data",
    type: "s",
    stimulusGroupId: "apgov-g-grants",
    stimulus: S_GRANTS,
    q: "Which is the most significant limitation of using this table to measure the balance of power between the national and state governments?",
    o: ["Grants-in-aid have no bearing on the federal balance, since states may decline to accept them", "It reports only three of the five decades in which federal grants-in-aid have existed", "It measures grants per capita, which understates the aid flowing to less populous states", "It uses current dollars and captures fiscal tools alone, omitting mandates, preemption, and court rulings"],
    c: [3],
    e: "Two real limits: unadjusted current dollars overstate real growth, and money is one instrument among several — unfunded mandates, statutory preemption, and Supreme Court doctrine also move the federal-state balance and appear nowhere in the table. The table reports aggregate dollars rather than per capita figures, it lists five years rather than three, and the formal voluntariness of grants does not make them irrelevant, since states rarely forgo sums this large.",
  },

  {
    id: "apgov-u2-001",
    unit: "U2",
    topic: "2.1 Congress: the House vs. the Senate",
    type: "s",
    stimulusGroupId: null,
    q: "Which pairing correctly distinguishes a structural feature of the House of Representatives from the Senate?",
    o: ["The House Rules Committee sets limits on floor debate; the Senate permits extended debate", "The House chooses its Speaker by seniority; the Senate elects its president pro tempore", "The House confirms cabinet nominees; the Senate originates all revenue-raising legislation", "The House ratifies treaties by majority vote; the Senate holds the sole power of impeachment"],
    c: [0],
    e: "The House's Rules Committee sets time limits and amendment rules for floor debate, reflecting its larger size; the Senate's tradition of extended debate is what makes the filibuster possible. Treaty ratification and confirmation belong to the Senate while impeachment and revenue bills originate in the House, and the Speaker is elected by the full House rather than chosen by seniority.",
  },

  {
    id: "apgov-u2-002",
    unit: "U2",
    topic: "2.1 Congress: representation theories",
    type: "s",
    stimulusGroupId: null,
    q: "A member of Congress votes against a popular bill in her district because she has concluded, after independent study, that the bill would be bad policy. She explains, 'I was sent here to use my own judgment, not just to mirror the loudest constituent calls.' This member is acting as a",
    o: ["partisan, who follows the party leadership's position on nearly every recorded vote", "politico, who shifts between constituent opinion and independent judgment by issue", "delegate, who votes the way district opinion indicates even when she disagrees", "trustee, who exercises independent judgment about what serves constituents' interests"],
    c: [3],
    e: "The trustee model holds that a representative should use her own judgment about the public good rather than mirroring constituent opinion. The delegate model is its opposite, the politico model alternates between the two depending on the issue, and nothing in the scenario indicates party discipline.",
  },

  {
    id: "apgov-u2-003",
    unit: "U2",
    topic: "2.2 Congressional committees and the legislative process",
    type: "s",
    stimulusGroupId: null,
    q: "A bill is introduced, assigned to committee, marked up, and reported to the floor, where it passes and then must be reconciled with a different Senate version before going to the president. Which statement best describes the role committees play in this process?",
    o: ["Committees may report a bill out but cannot amend the text its author introduced", "Committees in each chamber must approve identical text before a conference can convene", "Committees do most substantive work — hearings, markup, and deciding whether a bill advances", "Committees screen bills for constitutional defects but leave policy choices to the floor"],
    c: [2],
    e: "The overwhelming majority of legislative work — hearings, expert testimony, markup, and the gatekeeping decision whether a bill even reaches the floor — happens in committee. Committees make policy rather than merely screening for constitutional defects, they routinely rewrite text during markup, and conference committees exist precisely because the two chambers pass differing versions.",
  },

  {
    id: "apgov-u2-004",
    unit: "U2",
    topic: "2.3 Congressional leadership: the Speakership",
    type: "s",
    stimulusGroupId: null,
    q: "Immediately after a new Congress is sworn in, every member of the House votes to elect the Speaker. Which statement most accurately describes the outcome of that vote?",
    o: ["The full House votes, and the majority party's numbers normally decide the outcome", "The Speaker is the House member with the longest continuous service in the chamber", "The Speaker is nominated by the president and then confirmed by a House majority", "The majority party caucus selects the Speaker, and the floor vote merely ratifies that choice"],
    c: [0],
    e: "Every representative, not just members of the majority party, casts a vote for Speaker on the House floor, and that vote is a genuine election that can fail on the first ballot. The majority party's numerical advantage is what normally decides the outcome. The president has no role, and seniority determines neither the Speakership nor the caucus nomination.",
  },

  {
    id: "apgov-u2-005",
    unit: "U2",
    topic: "2.4/2.5 The Senate filibuster and cloture",
    type: "s",
    stimulusGroupId: null,
    q: "A senator speaks continuously to prevent a floor vote on a major bill. Supporters of the bill file a cloture petition. Which outcome would end the delay under current Senate rules for most legislation?",
    o: ["A two-thirds vote of senators present, the threshold used for treaty ratification", "Three-fifths of the full Senate, normally sixty votes, agreeing to invoke cloture", "A simple majority of senators present voting to table the pending measure", "A ruling by the presiding officer that the debate has become dilatory"],
    c: [1],
    e: "Cloture on most legislation requires 60 votes — three-fifths of the full Senate — to cut off debate. Tabling disposes of a motion rather than ending a filibuster on the underlying bill, the two-thirds threshold belongs to treaty ratification, and the presiding officer cannot unilaterally cut off debate.",
  },

  {
    id: "apgov-u2-006",
    unit: "U2",
    topic: "2.6 Congressional behavior: pork barrel spending and credit-claiming",
    type: "s",
    stimulusGroupId: null,
    q: "A representative secures a federally funded bridge project for her district and highlights it heavily in her reelection campaign. This behavior is best described as an example of",
    o: ["casework, in which a member's staff resolves constituents' problems with federal agencies", "logrolling, in which members trade votes on one another's unrelated priority bills", "an earmark rescission, in which appropriators strip a district project from a bill", "credit-claiming through pork barrel spending, a well-documented incumbency advantage"],
    c: [3],
    e: "Directing federal money to a home district and publicizing it is classic pork barrel credit-claiming, a major incumbency advantage. Logrolling is vote-trading among members, casework is individual constituent service with the bureaucracy, and a rescission removes a project rather than securing one.",
  },

  {
    id: "apgov-u2-007",
    unit: "U2",
    topic: "2.7 The presidency: formal vs. informal powers",
    type: "s",
    stimulusGroupId: null,
    q: "Which pairing correctly matches a presidential power with whether the Constitution grants it explicitly?",
    o: ["Vetoing legislation — an informal power that developed through presidential custom", "Issuing executive orders — a formal power listed by name in Article II", "Using the bully pulpit — a formal power that Article II conditions on Senate approval", "Negotiating treaties — a formal power flowing from Article II's grant of executive power and diplomatic role"],
    c: [3],
    e: "Article II's grant of executive power and the president's role as chief diplomat are the textual basis for negotiating treaties, though ratification requires a separate two-thirds Senate vote. The veto is explicit in Article I, Section 7 rather than a matter of custom; executive orders are nowhere named in the text and rest on implied authority from the executive-power and take-care clauses; and the bully pulpit is an informal tool requiring no Senate role.",
  },

  {
    id: "apgov-u2-008",
    unit: "U2",
    topic: "2.7/2.9 Executive orders: legal basis and limits",
    type: "s",
    stimulusGroupId: null,
    q: "A new executive order directs federal agencies to prioritize certain enforcement actions. A legal challenge argues the order is invalid. Which statement best describes the constitutional status of executive orders?",
    o: ["An order takes legal effect once published in the Federal Register, whatever its basis", "An order must rest on constitutional or delegated authority, and courts may set it aside", "An order carries the force of a statute and can repeal a conflicting act of Congress", "An order stays in force until Congress repeals it, since a successor president cannot rescind it"],
    c: [1],
    e: "Executive orders direct the executive branch's own operations, but they are not free-floating lawmaking: they must rest on the president's constitutional power or on authority Congress has delegated, and courts (as in Youngstown Sheet & Tube v. Sawyer) will set aside one that exceeds it. An order cannot repeal a statute, publication does not supply missing authority, and a later president may rescind an order by issuing another.",
  },

  {
    id: "apgov-u2-009",
    unit: "U2",
    topic: "2.9 Divided government and gridlock",
    type: "s",
    stimulusGroupId: null,
    q: "After an election, one party controls the presidency while the opposing party holds a majority in both chambers of Congress. Political scientists would predict this arrangement most likely to produce",
    o: ["faster passage of the president's agenda, since sharpened debate speeds floor consideration", "heavier use of the pocket veto, which a two-thirds vote of Congress can then override", "more gridlock, since major legislation generally requires agreement across the branches", "a sharp rise in the number of treaties ratified during the president's remaining term"],
    c: [2],
    e: "Divided government raises the bar for major legislation because opposing parties must find common ground; empirically it is associated with fewer significant laws, not faster action. Treaty ratification becomes harder rather than easier under divided control, and a pocket veto cannot be overridden by Congress at all.",
  },

  {
    id: "apgov-u2-010",
    unit: "U2",
    topic: "2.10 The federal bureaucracy: rule-making and discretion",
    type: "s",
    stimulusGroupId: null,
    q: "Congress passes a broad statute directing an agency to set 'reasonable' emissions standards without specifying exact numbers. The agency then issues detailed numeric limits through a formal rule-making process. This exercise of authority is best described as",
    o: ["judicial review, since the agency is interpreting the meaning of a federal statute", "discretionary rule-making authority, filling in details that Congress left unspecified", "an executive order, since agency rules are issued under the president's general supervision", "a legislative veto, since the agency's numbers displace those Congress might have chosen"],
    c: [1],
    e: "When Congress writes broad, ambiguous statutory language, agencies use discretionary rule-making authority to specify the operational details, and those rules carry the force of law. Judicial review is a court function, a legislative veto is a congressional device for overturning agency action, and an executive order is issued by the president rather than by an agency.",
  },

  {
    id: "apgov-u2-011",
    unit: "U2",
    topic: "2.10 Holding the bureaucracy accountable: iron triangles vs. issue networks",
    type: "s",
    stimulusGroupId: null,
    q: "A defense contractor, the House Armed Services Committee, and the Department of Defense have worked together for decades on a stable set of procurement policies that benefit all three. This is a textbook example of",
    o: ["an issue network: a fluid, shifting set of experts and groups engaged in one policy area", "congressional oversight: a committee monitoring how an agency spends the funds it receives", "regulatory capture: an agency adopting the views of the industry it is charged with policing", "an iron triangle: a stable alliance of an agency, a congressional committee, and an interest group"],
    c: [3],
    e: "Iron triangles describe exactly this closed, stable, mutually reinforcing relationship among an agency, a committee, and an interest group. An issue network is looser and more fluid, regulatory capture describes a two-party relationship in which an agency serves the industry it regulates, and oversight is the adversarial monitoring function rather than a cooperative partnership.",
  },

  {
    id: "apgov-u2-012",
    unit: "U2",
    topic: "2.11/2.12 Checks on the bureaucracy",
    type: "s",
    stimulusGroupId: null,
    q: "Which of the following is a tool Congress uses to hold the federal bureaucracy accountable?",
    o: ["Reviewing agency regulations for consistency with the federal Constitution", "Dismissing agency heads who refuse to comply with committee requests", "Controlling agency appropriations and confirming the agency's top officials", "Issuing executive orders that redirect an agency's enforcement priorities"],
    c: [2],
    e: "Congress's power of the purse and the Senate's confirmation role are its core oversight tools. Executive orders come from the president, constitutional review of regulations belongs to the courts, and Congress cannot dismiss executive officials outside the impeachment process.",
  },

  {
    id: "apgov-u2-013",
    unit: "U2",
    topic: "2.13 Legitimacy and the judiciary's dependence on other branches",
    type: "s",
    stimulusGroupId: null,
    q: "Alexander Hamilton called the judiciary 'the least dangerous branch' because it has 'neither FORCE nor WILL, but merely judgment.' Which modern example most directly illustrates the vulnerability Hamilton described?",
    o: ["A Senate that declines to hold confirmation hearings on a president's judicial nominee", "A president deploying federal marshals so that a desegregation ruling takes effect over a governor's resistance", "A justice who writes a lengthy dissent criticizing the majority's constitutional reasoning", "A Congress that adds seats to a lower federal court to shift its ideological balance"],
    c: [1],
    e: "The Court has no independent enforcement mechanism; its rulings depend on the executive branch's willingness to carry them out, as in the Little Rock desegregation crisis — precisely Hamilton's 'neither force nor will' point. Blocked nominations and court expansion are checks on the judiciary's composition rather than on the enforceability of its judgments, and a dissent has no bearing on enforcement at all.",
  },

  {
    id: "apgov-u2-014",
    unit: "U2",
    topic: "2.13 Judicial philosophy: restraint vs. activism",
    type: "s",
    stimulusGroupId: null,
    q: "One justice argues courts should generally defer to precedent and to decisions made by elected legislatures; another argues courts should be more willing to overturn precedent and to invalidate acts of the legislative and executive branches. These two positions illustrate the distinction between",
    o: ["judicial restraint and judicial activism, two views of how readily courts should act", "stare decisis and judicial review, two distinct sources of federal judicial authority", "originalism and living constitutionalism, two competing theories of constitutional interpretation", "concurring and dissenting opinions, two ways justices write separately from the majority"],
    c: [0],
    e: "Deference to precedent and to the elected branches is judicial restraint; a greater willingness to overturn precedent or to strike down legislative and executive acts is judicial activism. Both labels describe how readily a court intervenes, not the motives or desired results of individual judges. Originalism and living constitutionalism concern interpretive method rather than willingness to intervene, stare decisis and judicial review are doctrines rather than judicial philosophies, and concurrences and dissents are simply types of opinions.",
  },

  {
    id: "apgov-u2-015",
    unit: "U2",
    topic: "2.14 Legislative-executive-judicial interaction: policymaking in practice",
    type: "s",
    stimulusGroupId: null,
    q: "A federal agency issues a rule; a business sues, arguing Congress never authorized it; a court agrees and strikes the rule down; Congress then amends the statute to explicitly authorize the rule. Which best characterizes this sequence?",
    o: ["A breach of the separation of powers, since Congress overrode a final judicial judgment", "A single branch acting alone, since each step was taken without the others' involvement", "Delegation running in reverse, since the court rather than Congress supplied the new statute", "Ordinary interaction among the branches: agency implementation, judicial review, legislative response"],
    c: [3],
    e: "This is the routine, expected interplay of the branches: agencies implement, courts review for statutory and constitutional authority, and Congress can respond by legislating — separation of powers working as designed. Congress amended the statute going forward rather than overturning the court's judgment, and the court struck a rule down rather than writing one.",
  },

  {
    id: "apgov-u2-016",
    unit: "U2",
    topic: "2.7 Federalist No. 70: energy in the executive",
    type: "s",
    stimulusGroupId: "apgov-g-fed70",
    stimulus: S_FED70,
    q: "According to the excerpt, why does Hamilton argue that executive power should be placed in a single person rather than a council?",
    o: ["Because the excerpt treats duration in office as the sole ingredient of executive energy", "Because a single executive is easier for the Senate to remove through impeachment", "Because unity produces energy, decision, and clear responsibility that a council would blur", "Because a council would give the states an unwelcome voice in national administration"],
    c: [2],
    e: "Federalist No. 70 argues that 'energy in the executive' — decision, activity, secrecy, and dispatch — is best secured by vesting power in one person, since a council would divide and obscure responsibility. Hamilton lists unity, duration, adequate provision for support, and competent powers as the ingredients of energy, so duration alone is not his answer, and neither removal nor state influence is his concern here.",
  },

  {
    id: "apgov-u2-017",
    unit: "U2",
    topic: "2.7 Federalist No. 70: accountability and unity",
    type: "s",
    stimulusGroupId: "apgov-g-fed70",
    stimulus: S_FED70,
    q: "Hamilton's argument that a single executive makes accountability easier rests most directly on the idea that",
    o: ["the president's four-year term, rather than the number of executives, is what secures responsibility", "a plural executive would remain accountable because each member could be impeached separately", "voters can identify who is responsible for an action when one person holds the office", "accountability comes from the Senate's power to reject the appointments an executive proposes"],
    c: [2],
    e: "With one executive, responsibility cannot be diffused or hidden behind a group, so citizens can trace outcomes to a single accountable officeholder. Hamilton treats duration in office as a separate ingredient of energy, and impeachment and Senate confirmation are external checks rather than the internal feature of unity he is describing here.",
  },

  {
    id: "apgov-u2-018",
    unit: "U2",
    topic: "2.13 Federalist No. 78: the judiciary as 'least dangerous'",
    type: "s",
    stimulusGroupId: "apgov-g-fed78",
    stimulus: S_FED78,
    q: "According to the excerpt, why does Hamilton describe the judiciary as the branch 'least dangerous to the political rights of the Constitution'?",
    o: ["Because federal judges serve renewable terms subject to reappointment by the president", "Because Article III gives the judiciary power to enforce its own judgments directly", "Because it commands neither the sword nor the purse and possesses judgment alone", "Because its judgments bind the parties before it rather than the government generally"],
    c: [2],
    e: "Hamilton contrasts the judiciary's lack of 'force' (enforcement) and 'will' (policy discretion and spending) with the executive's sword and the legislature's purse, concluding that the judiciary is comparatively weak and therefore least dangerous. The excerpt says the courts must depend on the executive arm to give their judgments effect, judges hold office during good behavior rather than on renewable terms, and Hamilton's point concerns institutional weakness rather than the reach of any single judgment.",
  },

  {
    id: "apgov-u2-019",
    unit: "U2",
    topic: "2.13 Federalist No. 78: life tenure and independence",
    type: "s",
    stimulusGroupId: "apgov-g-fed78",
    stimulus: S_FED78,
    q: "Hamilton defends life tenure for federal judges (during 'good behaviour') primarily as a means to",
    o: ["insulate judicial decisions from short-term political pressure, supporting independent judgment", "let experienced judges be reassigned to whichever federal court most needs their service", "align judicial decisions with the policy preferences of the appointing president over time", "give judges the security to set the salaries and budgets of their own courts"],
    c: [0],
    e: "Life tenure is defended as protecting judges from political retaliation for unpopular rulings, allowing independent, principled judgment rather than decisions driven by fear of removal. Hamilton pairs tenure with a fixed provision for judges' support, which Congress rather than the judiciary sets, and tenure has nothing to do with reassignment or with serving an appointing president's preferences.",
  },

  {
    id: "apgov-u2-020",
    unit: "U2",
    topic: "2.13 Comparing Federalist No. 78 with modern judicial-legitimacy debates",
    type: "s",
    stimulusGroupId: "apgov-g-fed78",
    stimulus: S_FED78,
    q: "A commentator argues that because federal judges are unelected and hold effectively lifetime appointments, their power to strike down laws passed by elected legislatures is in tension with democratic accountability. Which response is most consistent with Hamilton's argument in Federalist No. 78?",
    o: ["Hamilton would answer that the Constitution's meaning changes with the majority's settled views", "Hamilton would answer that independence is what lets judges enforce constitutional limits on majorities", "Hamilton would answer that the objection fails because Congress may not alter judicial salaries", "Hamilton would concede the point and recommend periodic popular elections for federal judges"],
    c: [1],
    e: "Federalist No. 78's whole argument is that insulating judges from electoral pressure is what allows them to check majoritarian excess and hold government to the Constitution — the opposite of recommending elected judges, and the opposite of letting majority sentiment set constitutional meaning. The salary protection bars only reductions and does not answer the democratic objection.",
  },

  {
    id: "apgov-u2-021",
    unit: "U2",
    topic: "2.13 Marbury v. Madison (1803) and judicial review",
    type: "s",
    stimulusGroupId: null,
    q: "In Marbury v. Madison (1803), the Supreme Court held that",
    o: ["the judiciary's province is to say what the law is, establishing review of congressional acts", "state courts must follow federal constitutional rulings, settling the supremacy of federal law", "Congress may not enlarge the Supreme Court's appellate jurisdiction beyond what Article III lists", "the president may withhold a commission that has been signed and sealed but not delivered"],
    c: [0],
    e: "Marbury established judicial review — the power of federal courts to declare a law repugnant to the Constitution and refuse to apply it. The provision at issue was invalid because it enlarged the Court's original, not appellate, jurisdiction; the Court also concluded that Marbury was legally entitled to his commission; and the binding force of federal rulings on state courts was settled in later decisions.",
  },

  {
    id: "apgov-u2-022",
    unit: "U2",
    topic: "2.2 Reading data on congressional bill outcomes",
    type: "s",
    stimulusGroupId: "apgov-g-billdata",
    stimulus: S_BILLDATA,
    q: "Which statement is best supported by the data in the table?",
    o: ["Most introduced bills never reach a floor vote, consistent with committees' gatekeeping role", "Bills reported out of committee were rarely enacted, so floor votes are the main obstacle", "Introductions fell steadily while the number of bills enacted rose across the three Congresses", "More bills were enacted into law than were reported out of committee in each Congress"],
    c: [0],
    e: "In every Congress shown, a small fraction of introduced bills are reported out of committee, and fewer still are enacted — direct evidence of committees' gatekeeping function. Roughly half of the bills reported out did become law, introductions rose rather than fell while enactments fell, and enactments were always well below the number reported.",
  },

  {
    id: "apgov-u2-023",
    unit: "U2",
    topic: "2.2 Explaining the committee gatekeeping pattern in the data",
    type: "s",
    stimulusGroupId: "apgov-g-billdata",
    stimulus: S_BILLDATA,
    q: "A student argues the low enactment rate shown in the table proves Congress is 'failing to do its job.' Which is the strongest evidence-based objection to that claim?",
    o: ["Committees are designed to filter proposals, so a low enactment rate can reflect screening", "Bills that die in committee are usually withdrawn by their sponsors before any vote", "Most bills that fail in committee are later enacted as riders on appropriations measures", "The table shows the Senate enacted more measures than the House in each Congress listed"],
    c: [0],
    e: "A low pass rate is the expected output of a system in which committees deliberately screen proposals and most legislation requires broad coalition-building to advance — evidence of the process working as designed rather than proof of failure. Bills that die in committee are typically just never acted on rather than withdrawn or revived in appropriations bills, and the table reports House data alone.",
  },

  {
    id: "apgov-u3-001",
    unit: "U3",
    topic: "3.1 The Bill of Rights and selective incorporation",
    type: "s",
    stimulusGroupId: null,
    q: "Which statement most accurately describes selective incorporation?",
    o: ["Congress incorporates rights against the states by statute under its Fourteenth Amendment enforcement power", "The Fourteenth Amendment applied the entire Bill of Rights to the states at the moment it was ratified", "The privileges or immunities clause is the Court's usual vehicle for binding states to the Bill of Rights", "The Court has applied most Bill of Rights guarantees to the states one right at a time"],
    c: [3],
    e: "Selective incorporation is a case-by-case process: through the Fourteenth Amendment's due process clause the Court has ruled, one right at a time, that a given Bill of Rights protection binds the states. Ratification did not by itself incorporate anything, the privileges or immunities clause was largely closed off as a vehicle by the Slaughter-House Cases, and incorporation is judicial rather than statutory.",
  },

  {
    id: "apgov-u3-002",
    unit: "U3",
    topic: "3.2 Engel v. Vitale (1962) and the Establishment Clause",
    type: "s",
    stimulusGroupId: null,
    q: "A public school district writes a short, nondenominational prayer and has it recited aloud each morning; participation is technically voluntary. Applying Engel v. Vitale (1962), a court would most likely hold that this practice",
    o: ["is constitutional, because the prayer's wording avoids identifying any particular denomination", "is unconstitutional, because the practice burdens objecting students' free exercise of religion", "is constitutional, because objecting students may remain silent during the daily recitation", "is unconstitutional, because government composition and sponsorship of school prayer establishes religion"],
    c: [3],
    e: "Engel held that state-composed, school-sponsored prayer violates the Establishment Clause regardless of denominational content or nominal voluntariness, because government may not compose or endorse a religious exercise for public schools. Neutral wording and an opportunity to opt out do not cure the establishment problem, and the constitutional defect is establishment rather than a burden on free exercise.",
  },

  {
    id: "apgov-u3-003",
    unit: "U3",
    topic: "3.2 Wisconsin v. Yoder (1972) and the Free Exercise Clause",
    type: "s",
    stimulusGroupId: null,
    q: "Which statement most accurately reflects the holding of Wisconsin v. Yoder (1972)?",
    o: ["The state's secular curriculum violated the Amish families' rights under the Establishment Clause", "A state may not enforce compulsory-attendance laws against parents who object on any grounds", "A neutral, generally applicable attendance law prevails over the parents' free exercise claim", "The parents' sincere religious objection outweighed the state's interest in attendance past eighth grade"],
    c: [3],
    e: "Yoder balanced Wisconsin's generally applicable compulsory-attendance law against a sincere Free Exercise claim and sided with the Amish parents as to schooling beyond eighth grade. The exemption rested on a sincere religious objection rather than parental objection of any kind, the Court declined to let the neutral law simply prevail, and the case turned on free exercise rather than establishment.",
  },

  {
    id: "apgov-u3-004",
    unit: "U3",
    topic: "3.3 Tinker v. Des Moines (1969) and student speech",
    type: "s",
    stimulusGroupId: null,
    q: "Public school students wear black armbands to protest a war; school officials suspend them, citing a general desire to avoid controversy, though no disruption occurred. Applying Tinker v. Des Moines (1969), a court would most likely hold that",
    o: ["the suspension is invalid, because schools may discipline students for off-campus expression alone", "the suspension is valid, because schools may regulate expression that touches political controversy", "the suspension is valid, because symbolic conduct falls outside the First Amendment's protection", "the suspension is invalid, because symbolic student speech is protected absent substantial disruption"],
    c: [3],
    e: "Tinker protects symbolic student speech such as the armbands so long as it does not substantially and materially disrupt school operations; a bare desire to avoid controversy, without evidence of disruption, is not enough. Symbolic conduct is squarely within the First Amendment, and Tinker concerns expression on campus rather than a rule limited to off-campus speech.",
  },

  {
    id: "apgov-u3-005",
    unit: "U3",
    topic: "3.4 Schenck v. United States (1919) and limits on speech",
    type: "s",
    stimulusGroupId: null,
    q: "Schenck v. United States (1919) is most often cited for establishing that",
    o: ["prior restraints on publication are permitted whenever Congress declares a national emergency", "the First Amendment shields political advocacy even when the nation is formally at war", "speech creating a clear and present danger falls outside the First Amendment's protection", "the government must show that speech produced actual harm before it may punish the speaker"],
    c: [2],
    e: "Schenck upheld a conviction for distributing anti-draft leaflets, holding that speech creating a 'clear and present danger' of harms Congress may prevent is not protected — establishing that First Amendment protection is not unlimited. The Court did not require proof that harm actually occurred, did not shield wartime advocacy, and did not address prior restraint.",
  },

  {
    id: "apgov-u3-006",
    unit: "U3",
    topic: "3.4 New York Times Co. v. United States (1971) and prior restraint",
    type: "s",
    stimulusGroupId: null,
    q: "The federal government seeks a court order blocking a newspaper from publishing a classified report, arguing publication would harm national security. Applying New York Times Co. v. United States (1971) (the 'Pentagon Papers' case), a court would most likely",
    o: ["deny the order, since a prior restraint on publication carries a heavy presumption against its validity", "deny the order, since the First Amendment bars any later punishment of the publisher", "grant the order, since classified material falls outside the First Amendment's protection", "grant the order, since the government's security showing outweighs the publication interest"],
    c: [0],
    e: "The Court held that the government had not met the heavy burden required to justify a prior restraint, reinforcing the strong presumption against orders blocking publication in advance even when national security is invoked. Classified status does not strip material of First Amendment protection, the government's showing was found insufficient, and several justices expressly left open the possibility of later criminal liability.",
  },

  {
    id: "apgov-u3-007",
    unit: "U3",
    topic: "3.5 Gideon v. Wainwright (1963) and the right to counsel",
    type: "s",
    stimulusGroupId: null,
    q: "Gideon v. Wainwright (1963) established that",
    o: ["Indigent defendants must be given counsel on appeal but may be tried without an attorney", "Federal courts must appoint counsel for indigent defendants, a duty the states may decline", "States must provide counsel at public expense to felony defendants who cannot afford an attorney", "Police must inform a suspect of the right to counsel before beginning custodial questioning"],
    c: [2],
    e: "Gideon incorporated the Sixth Amendment right to counsel against the states through the Fourteenth Amendment, requiring states to appoint counsel for indigent defendants in felony prosecutions. The federal right predated Gideon and states may not opt out of it, the warning requirement before custodial questioning comes from Miranda v. Arizona, and the right attaches at trial rather than only on appeal.",
  },

  {
    id: "apgov-u3-008",
    unit: "U3",
    topic: "3.5 McDonald v. City of Chicago (2010) and incorporation of the Second Amendment",
    type: "s",
    stimulusGroupId: null,
    q: "McDonald v. City of Chicago (2010) is significant primarily because it",
    o: ["It read the Second Amendment as protecting a collective right belonging to organized state militias", "It held that firearms regulation is committed to the states and outside federal judicial review", "It incorporated the Second Amendment against state and local governments through the Fourteenth", "It first recognized an individual right to keep and bear arms unconnected to militia service"],
    c: [2],
    e: "McDonald extended Heller's individual-rights reading of the Second Amendment so that it binds state and local governments as well as the federal government. Heller, decided two years earlier, is what first recognized the individual right; the Court rejected a militia-only reading; and McDonald brought state firearms laws further within federal judicial review rather than removing them from it.",
  },

  {
    id: "apgov-u3-009",
    unit: "U3",
    topic: "3.6/3.7 Brown v. Board of Education (1954)",
    type: "s",
    stimulusGroupId: null,
    q: "Brown v. Board of Education (1954) overturned which earlier precedent, and on what basis?",
    o: ["Plessy v. Ferguson, on the ground that separate facilities remain equal when funding is comparable", "Sweatt v. Painter, on the ground that graduate schools must admit qualified applicants of any race", "Dred Scott v. Sandford, on the ground that the Fourteenth Amendment made all persons citizens", "Plessy v. Ferguson, on the ground that segregated public schools are inherently unequal"],
    c: [3],
    e: "Brown unanimously overturned Plessy's 'separate but equal' doctrine as applied to public education, holding that state-mandated segregation is inherently unequal and violates the Fourteenth Amendment's equal protection clause. Comparable funding was precisely the rationale Brown rejected, Sweatt v. Painter was an earlier decision Brown built on rather than overturned, and Dred Scott had already been superseded by the Fourteenth Amendment itself.",
  },

  {
    id: "apgov-u3-010",
    unit: "U3",
    topic: "3.7 The Civil Rights Act of 1964: what it actually covers",
    type: "s",
    stimulusGroupId: null,
    q: "A restaurant refuses to serve customers because of their religion, and separately, an employer pays women less than men for the same job. Which statement correctly applies Title II and Title VII of the Civil Rights Act of 1964 to these two situations?",
    o: ["Neither situation is covered, since the Act's protected categories are limited to race and color", "Title VII reaches both situations, since it covers employment and public accommodations alike", "Title II reaches both situations, since its protected categories include sex as well as religion", "Title II reaches the restaurant's religious discrimination; Title VII reaches the employer's sex discrimination"],
    c: [3],
    e: "Title II's public-accommodations coverage (race, color, religion, or national origin) is narrower than Title VII's employment coverage (race, color, religion, sex, or national origin). The restaurant scenario is a Title II accommodations issue about religion; the pay scenario is a Title VII employment issue about sex, a category Title II's original accommodations provisions did not include. Title VII does not reach public accommodations, and neither title is limited to race and color.",
  },

  {
    id: "apgov-u3-011",
    unit: "U3",
    topic: "3.9 Privacy rights: Roe v. Wade and its status today",
    type: "s",
    stimulusGroupId: null,
    q: "Which statement most accurately describes the current status of Roe v. Wade (1973) in the AP U.S. Government and Politics course?",
    o: ["Roe remains on the CED's required-cases list and is still binding Supreme Court precedent", "Roe and Dobbs reached the same result while relying on different constitutional provisions", "Roe is taught as content on implied privacy rights but was overruled by Dobbs in 2022", "Roe rested on an explicit privacy clause in the Constitution, which Dobbs reinterpreted in 2022"],
    c: [2],
    e: "Roe still illustrates implied-privacy reasoning under the Fourteenth Amendment's due process clause and remains course content in Topic 3.9, but College Board removed it from the required-cases list after Dobbs v. Jackson Women's Health Organization (2022) overruled it. The Constitution contains no express privacy clause, and Dobbs reached the opposite result, returning abortion regulation to the states.",
  },

  {
    id: "apgov-u3-012",
    unit: "U3",
    topic: "3.8 Baker v. Carr and Shaw v. Reno: majority rule vs. minority rights in redistricting",
    type: "s",
    stimulusGroupId: null,
    q: "Which statement correctly compares Baker v. Carr (1962) and Shaw v. Reno (1993)?",
    o: ["Baker made malapportionment claims justiciable; Shaw subjected race-predominant districts to strict scrutiny", "Baker required the creation of majority-minority districts; Shaw held that such districts satisfy the Voting Rights Act", "Baker treated redistricting as a political question; Shaw applied rational basis review to racial districting", "Baker itself announced the one-person-one-vote rule; Shaw held partisan gerrymandering nonjusticiable"],
    c: [0],
    e: "Baker v. Carr's key holding was justiciability — that malapportionment claims present a question courts may decide, rejecting rather than accepting the political-question objection and opening the door to the 'one person, one vote' rule announced in later cases such as Reynolds v. Sims. Shaw v. Reno held that districts drawn predominantly on the basis of race trigger strict scrutiny under equal protection, not rational basis, and neither case required majority-minority districting.",
  },

  {
    id: "apgov-u3-013",
    unit: "U3",
    topic: "3.11 Social movements and government response",
    type: "s",
    stimulusGroupId: null,
    q: "After decades of organized protest, litigation, and lobbying by the civil rights movement, Congress passed the Civil Rights Act of 1964 and the Voting Rights Act of 1965. This sequence best illustrates",
    o: ["how sustained protest, litigation, and lobbying can translate into landmark federal legislation", "that landmark federal civil rights statutes generally precede rather than follow social movements", "how a constitutional amendment is the usual vehicle for extending civil rights protections", "how Supreme Court rulings substitute for legislation when Congress declines to act on rights"],
    c: [0],
    e: "This is the standard example of a social movement converting sustained, multi-front pressure into legislative change: the 1964 and 1965 Acts followed and responded to the movement rather than preceding it. Congress rather than the Court enacted these statutes, and both were ordinary legislation rather than constitutional amendments.",
  },

  {
    id: "apgov-u3-014",
    unit: "U3",
    topic: "3.11 'Letter from a Birmingham Jail': justifying civil disobedience",
    type: "s",
    stimulusGroupId: "apgov-g-birmingham",
    stimulus: S_BIRMINGHAM,
    q: "According to the excerpt, on what basis does King distinguish a just law from an unjust one?",
    o: ["A law is just if a majority of citizens would approve it when asked in a survey", "A just law squares with moral law; an unjust law binds a minority but not the majority", "A law is just if a legislature chosen through procedurally fair elections enacted it", "A law is just if courts have upheld it against constitutional challenge in litigation"],
    c: [1],
    e: "King defines a just law as a human code that squares with the moral law, and an unjust law as one a numerical or power majority compels a minority to obey while not making it binding on itself — as with disenfranchised Black citizens under Jim Crow. Legislative enactment, majority approval in a poll, and judicial validation are precisely the tests he argues are insufficient.",
  },

  {
    id: "apgov-u3-015",
    unit: "U3",
    topic: "3.11 'Letter from a Birmingham Jail': the case for civil disobedience",
    type: "s",
    stimulusGroupId: "apgov-g-birmingham",
    stimulus: S_BIRMINGHAM,
    q: "King argues that someone who breaks an unjust law and 'willingly accepts the penalty' is",
    o: ["acting lawlessly, since a willingness to be punished cannot change the character of the act", "seeking a court ruling, since breaking a law is the standard route to obtaining judicial review", "expressing the highest respect for law by accepting punishment openly rather than evading it", "engaging in legitimate protest only if the law broken is the same one being challenged"],
    c: [2],
    e: "King's central argument for nonviolent civil disobedience is that openly and publicly accepting the legal penalty — rather than evading it — demonstrates the deepest respect for the rule of law while calling attention to a law's injustice. He does not limit disobedience to the particular statute being challenged, and his stated aim is to arouse the community's conscience rather than to manufacture a test case.",
  },

  {
    id: "apgov-u3-016",
    unit: "U3",
    topic: "3.7/3.11 Comparing 'Letter from a Birmingham Jail' with the Civil Rights Act of 1964",
    type: "s",
    stimulusGroupId: "apgov-g-birmingham",
    stimulus: S_BIRMINGHAM,
    q: "Which statement best describes the relationship between the argument in this excerpt and the Civil Rights Act of 1964?",
    o: ["The letter helped build public pressure that contributed to the Act's passage the next year", "The Act was already law when King wrote, and the letter defends it against its critics", "The letter urges reliance on federal litigation instead of the legislation Congress was debating", "The Act codified the letter's distinction between just and unjust laws as a legal standard"],
    c: [0],
    e: "Written in April 1963, the letter helped focus national attention on segregation, and historians commonly link the visibility of the Birmingham campaign to the political momentum behind the Civil Rights Act of 1964. The Act came after the letter rather than before it, the letter does not counsel litigation in place of legislation, and no statute adopted King's moral test as a legal standard.",
  },

  {
    id: "apgov-u3-017",
    unit: "U3",
    topic: "3.12 The Emancipation Proclamation and the protection of minority rights over time",
    type: "s",
    stimulusGroupId: "apgov-g-emancipation",
    stimulus: S_EMANCIPATION,
    q: "According to the excerpt, what did the Emancipation Proclamation immediately do?",
    o: ["It abolished slavery throughout the United States, including the loyal border states", "It granted formerly enslaved men the right to vote in federal and state elections", "It compensated slaveholders in the rebelling states for the property they were losing", "It declared enslaved people free in the states then in rebellion"],
    c: [3],
    e: "The Proclamation, an executive wartime measure, applied specifically to states then in rebellion; it did not reach the loyal border states, did not itself grant voting rights (that came with the Fifteenth Amendment), and provided no compensation to slaveholders. It did provide that freed persons of suitable condition would be received into the armed service.",
  },

  {
    id: "apgov-u3-018",
    unit: "U3",
    topic: "3.12 From the Emancipation Proclamation to the Thirteenth Amendment",
    type: "s",
    stimulusGroupId: "apgov-g-emancipation",
    stimulus: S_EMANCIPATION,
    q: "Which statement best describes why the Thirteenth Amendment (1865) was still necessary after the Emancipation Proclamation (1863)?",
    o: ["The Thirteenth Amendment guaranteed equal protection, which the Proclamation left unaddressed", "The Proclamation reached the border states, so an amendment was needed for the Confederacy", "The Proclamation was a wartime executive act; an amendment was needed to end slavery nationally", "The Supreme Court had invalidated the Proclamation, so Congress turned to the amendment process"],
    c: [2],
    e: "As an executive proclamation grounded in war powers, the document's reach and durability were limited, so the Thirteenth Amendment was required to abolish slavery permanently and nationwide, including in states that had not rebelled. The Proclamation exempted the loyal border states rather than reaching them, it was never struck down by the Court, and equal protection came later with the Fourteenth Amendment.",
  },

  {
    id: "apgov-u4-001",
    unit: "U4",
    topic: "4.1 Political socialization",
    type: "s",
    stimulusGroupId: null,
    q: "A student's views on the role of government closely resemble her parents' views, and she notes that a major recession during her teenage years shaped how she thinks about economic policy. Together these observations illustrate",
    o: ["political socialization, through family influence and a formative generational event", "the media's agenda-setting function, shaping which issues she regards as important", "a lifecycle effect, in which policy views shift predictably as a person grows older", "party identification hardening as she reaches voting age and begins casting ballots"],
    c: [0],
    e: "Family is one of the most influential agents of political socialization, and a formative event experienced during a person's political coming-of-age is the classic generational effect. Agenda-setting concerns media influence on issue salience, party identification is an outcome of socialization rather than the process itself, and a lifecycle effect is tied to a person's age rather than to a shared formative event.",
  },

  {
    id: "apgov-u4-002",
    unit: "U4",
    topic: "4.1 Core American political values",
    type: "s",
    stimulusGroupId: null,
    q: "Which set of values is most commonly identified as broadly shared across the American ideological spectrum, even though people disagree sharply about how to apply them in policy?",
    o: ["Free enterprise, deference to hereditary authority, and equality of material condition", "Individualism, equality of opportunity, free enterprise, and the rule of law", "Limited government, guaranteed employment, an established religion, and popular sovereignty", "Individualism, equality of outcome, state ownership of industry, and majority rule"],
    c: [1],
    e: "Individualism, equality of opportunity, free enterprise, and the rule of law are the values standard treatments identify as broadly shared, even though liberals and conservatives disagree sharply about which policies best serve them. Equality of outcome, state ownership, guaranteed employment, an established religion, and hereditary authority are not widely shared American values, even where a familiar value appears alongside them.",
  },

  {
    id: "apgov-u4-003",
    unit: "U4",
    topic: "4.2 Liberal and conservative ideology: economic and social dimensions",
    type: "s",
    stimulusGroupId: null,
    q: "A voter supports expanded government regulation of the economy and a stronger social safety net, while also favoring permissive government policy on most social issues. This combination of views is most consistent with which label?",
    o: ["Libertarianism", "Social conservatism", "Modern American conservatism", "Modern American liberalism"],
    c: [3],
    e: "Support for economic regulation and a stronger safety net paired with permissive social policy is the standard profile of modern American liberalism. Conservatives typically favor less economic intervention, libertarians oppose intervention on both dimensions, and social conservatives favor government action on social questions.",
  },

  {
    id: "apgov-u4-004",
    unit: "U4",
    topic: "4.2 Libertarianism compared to liberalism and conservatism",
    type: "s",
    stimulusGroupId: null,
    q: "Which statement correctly distinguishes libertarianism from both mainstream liberalism and mainstream conservatism?",
    o: ["Libertarians favor minimal government on both economic and social questions", "Libertarians match conservatives on social policy and liberals on economic policy", "Libertarians favor minimal economic regulation but active government on social questions", "Libertarians favor a larger government role than either liberals or conservatives propose"],
    c: [0],
    e: "Libertarians are distinctive in opposing government intervention on both the economic and the social axis, whereas liberals typically favor economic intervention and conservatives typically favor social-policy intervention. Libertarians therefore align with conservatives on economics and with liberals on many social questions, and they consistently seek less government rather than more.",
  },

  {
    id: "apgov-u4-005",
    unit: "U4",
    topic: "4.3 Evaluating public opinion polls: sampling",
    type: "s",
    stimulusGroupId: null,
    q: "Two polls ask the same question about a policy. Poll A contacts a random sample of adults nationwide using random-digit dialing. Poll B posts a link on a political website and counts whoever chooses to click and respond. Which statement correctly evaluates their reliability?",
    o: ["Poll B is more reliable, because its self-selected respondents follow politics more closely", "Poll A is more likely to be representative of all adults, because random selection limits selection bias", "Poll A is less reliable, because random-digit dialing reaches only landline telephone households", "Both are equally reliable, since a large enough sample corrects for how it was gathered"],
    c: [1],
    e: "Random selection is what allows a poll's results to generalize to the broader population; an opt-in sample like Poll B systematically over-represents people with strong opinions, and no increase in sample size fixes that bias. Modern random-digit dialing includes cell phones, and greater interest in politics is not a substitute for representativeness.",
  },

  {
    id: "apgov-u4-006",
    unit: "U4",
    topic: "4.3 Margin of error and interpreting poll results",
    type: "s",
    stimulusGroupId: null,
    q: "A poll of 1,000 randomly sampled adults finds 52% support a policy, with a margin of error of ±3 percentage points. Which is the most defensible interpretation?",
    o: ["Exactly 52 percent of all adults in the population support the policy", "The margin of error means about 3 percent of respondents answered the question incorrectly", "True support plausibly falls between 49 and 55 percent, so majority support is uncertain", "Support is certainly above 50 percent, since the estimate exceeds the margin of error"],
    c: [2],
    e: "A margin of error defines a plausible range around the point estimate; with support at 52% ± 3, the true population value could fall below 50%, so this poll alone cannot confidently establish majority support. The estimate is not an exact population figure, the margin describes sampling variability rather than respondent error, and exceeding 50% by less than the margin does not establish a majority.",
  },

  {
    id: "apgov-u4-007",
    unit: "U4",
    topic: "4.4 Ideology and policy preferences: applying the spectrum",
    type: "s",
    stimulusGroupId: null,
    q: "A candidate calls for lower income tax rates, reduced business regulation, and stricter limits on federal environmental rulemaking. These positions are most consistent with which point on the conventional liberal-conservative spectrum?",
    o: ["Populist on trade policy", "Strongly conservative on economic policy", "Libertarian on social policy", "Strongly liberal on economic policy"],
    c: [1],
    e: "Lower tax rates, reduced business regulation, and limits on federal rulemaking authority are standard planks of a conservative economic platform on the conventional ideological spectrum. Nothing in the candidate's stated positions addresses social policy or trade, so the other labels do not follow.",
  },

  {
    id: "apgov-u4-008",
    unit: "U4",
    topic: "4.4 Limits of the one-dimensional ideological spectrum",
    type: "s",
    stimulusGroupId: null,
    q: "A voter favors strict limits on government economic regulation but also favors expansive government action on select social issues, such as strong criminal sentencing laws. Why is this voter difficult to place on a simple single-dimension liberal-to-conservative scale?",
    o: ["Because the voter holds a libertarian position, which the spectrum's midpoint already captures", "Because the spectrum measures attitudes toward federal power rather than specific policy views", "Because the voter's economic and social positions point in opposite conventional directions", "Because strict sentencing laws are conventionally coded as an economic rather than social position"],
    c: [2],
    e: "Pairing an economically conservative position with support for expansive government action on a social question shows why many voters resist simple placement on a single liberal-to-conservative line: ideology often varies across separate economic and social dimensions rather than moving together. The combination is not libertarian, the spectrum is not confined to attitudes toward federal power, and criminal sentencing is conventionally treated as a social-policy question.",
  },

  {
    id: "apgov-u4-009",
    unit: "U4",
    topic: "4.5 Devolution and ideology",
    type: "s",
    stimulusGroupId: null,
    q: "A candidate campaigns on shifting more discretion over welfare policy from the federal government back to the states, arguing states are 'closer to the people' and better positioned to design programs. This position reflects the concept of",
    o: ["preemption, displacing state welfare rules with a single uniform federal standard", "devolution, shifting policy discretion from the national government toward the states", "cooperative federalism, in which both levels jointly administer a shared program", "nationalization, concentrating policy authority in the federal government"],
    c: [1],
    e: "Devolution — shifting authority and discretion toward the states — is a recurring theme in ideological arguments (especially conservative arguments) about the proper scope of federal power, even though the concept itself belongs to Unit 1's federalism framework rather than being a distinct ideology. Nationalization and preemption move authority the other way, and cooperative federalism describes joint administration rather than a transfer of discretion.",
  },

  {
    id: "apgov-u4-010",
    unit: "U4",
    topic: "4.1 Adam Smith's core principles and the value of free enterprise",
    type: "s",
    stimulusGroupId: "apgov-g-wealth",
    stimulus: S_WEALTH,
    q: "According to the excerpt, how does an individual pursuing their own private gain typically benefit society, in Smith's account?",
    o: ["Through the unintended effects of self-interested exchange, which Smith calls an invisible hand", "Through deliberate charitable giving, which Smith treats as the market's main social benefit", "Through merchants consciously calculating the public benefit before choosing an investment", "Through the guidance of a government that directs investment toward domestic industry"],
    c: [0],
    e: "Smith's 'invisible hand' argument holds that individuals pursuing their own gain in a competitive market tend, without intending to, to promote outcomes that serve the broader public interest. The excerpt says explicitly that the merchant intends only his own security and gain, so neither deliberate philanthropy, nor government direction of investment, nor conscious calculation of the public good is doing the work.",
  },

  {
    id: "apgov-u4-011",
    unit: "U4",
    topic: "4.1 Free enterprise as a core American value",
    type: "s",
    stimulusGroupId: "apgov-g-wealth",
    stimulus: S_WEALTH,
    q: "Which core American political value is most directly reflected in the excerpt's argument about competition and self-interest?",
    o: ["Free enterprise, the belief that competitive markets allocate resources better than direction", "Rule of law, the belief that government and citizens alike are bound by known public rules", "Individualism, the belief that people are responsible for their own success or failure", "Equality of opportunity, the belief that everyone should face the same starting conditions"],
    c: [0],
    e: "The excerpt is the canonical statement of free enterprise as a value: competition and the pursuit of self-interest, with limited government direction, tend to allocate resources efficiently and serve the public interest. Smith's passage is about how markets aggregate private choices rather than about equal starting conditions, personal responsibility for outcomes, or legal constraint on government.",
  },

  {
    id: "apgov-u4-012",
    unit: "U4",
    topic: "4.6 Fiscal policy vs. monetary policy",
    type: "s",
    stimulusGroupId: null,
    q: "Which pairing correctly distinguishes fiscal policy from monetary policy?",
    o: ["Fiscal policy sets interest rates; monetary policy sets tariff rates on imported goods", "Fiscal policy is budgeting by the states; monetary policy is budgeting by the federal government", "Fiscal policy is the Fed's rate setting; monetary policy is taxing and spending by elected officials", "Fiscal policy is taxing and spending by elected officials; monetary policy is the Fed's rate setting"],
    c: [3],
    e: "Fiscal policy — taxing and spending — is a function of the elected branches, Congress and the president; monetary policy — managing the money supply and interest rates — belongs to the Federal Reserve, which is insulated from direct electoral control by design. Option B simply reverses the two, tariffs are trade policy rather than monetary policy, and both tools operate at the national level.",
  },

  {
    id: "apgov-u4-013",
    unit: "U4",
    topic: "4.6 The Federal Reserve's independence",
    type: "s",
    stimulusGroupId: null,
    q: "The Federal Reserve's leadership serves long, staggered terms and is not directly accountable to the president between confirmations. This structure is best explained by the goal of",
    o: ["insulating monetary policy from short-term electoral pressure to make inflation control credible", "keeping the Senate from confirming Federal Reserve governors nominated by the president", "making monetary policy responsive to voters' preferences in the months before an election", "allowing the Federal Reserve to adjust federal tax rates without congressional approval"],
    c: [0],
    e: "The Fed's structural independence is designed to keep monetary policy from being driven by short-term electoral incentives, such as pressure to overstimulate the economy before an election, on the theory that this produces more credible, stable management of inflation and the money supply. Governors are still nominated by the president and confirmed by the Senate, and the Fed has no taxing authority.",
  },

  {
    id: "apgov-u4-014",
    unit: "U4",
    topic: "4.6 Keynesian vs. supply-side approaches to economic policy",
    type: "s",
    stimulusGroupId: null,
    q: "During a recession, one economist recommends that the federal government increase spending and cut taxes to boost demand, even if it means running a larger deficit in the short term. A second economist instead recommends cutting marginal tax rates and reducing regulation to increase incentives for investment and production. These two positions illustrate the distinction between",
    o: ["supply-side economics, which manages aggregate demand, and Keynesian economics, which targets production incentives", "monetarism, which adjusts the money supply, and fiscal policy, which adjusts tax rates and spending", "Keynesian economics, which manages aggregate demand, and supply-side economics, which targets production incentives", "deficit spending, which raises federal revenue, and austerity, which lowers marginal tax rates"],
    c: [2],
    e: "The first recommendation — boosting demand through spending and tax cuts while tolerating short-term deficits — is the classic Keynesian prescription for a downturn; the second — cutting marginal rates and regulation to spur investment and production — is the classic supply-side prescription. Option B reverses the two labels, neither economist proposes adjusting the money supply, and austerity means reducing spending rather than cutting tax rates.",
  },

  {
    id: "apgov-u5-001",
    unit: "U5",
    topic: "5.1 Constitutional amendments expanding suffrage",
    type: "s",
    stimulusGroupId: null,
    q: "Which amendment prohibited denying the right to vote on account of race, and in what era was it ratified?",
    o: ["The Nineteenth Amendment, ratified in 1920 after a long suffrage campaign", "The Fourteenth Amendment, ratified in 1868 during Reconstruction", "The Twenty-Fourth Amendment, ratified in 1964 during the civil rights era", "The Fifteenth Amendment, ratified in 1870 during Reconstruction"],
    c: [3],
    e: "The Fifteenth Amendment (1870) barred denying the vote on account of race, though it took the Voting Rights Act of 1965, nearly a century later, to make that guarantee effective in practice. The Fourteenth Amendment (1868) addressed citizenship and equal protection rather than voting, the Nineteenth enfranchised women, and the Twenty-Fourth abolished poll taxes in federal elections.",
  },

  {
    id: "apgov-u5-002",
    unit: "U5",
    topic: "5.1 Constitutional amendments expanding suffrage",
    type: "s",
    stimulusGroupId: null,
    q: "The Nineteenth Amendment and the Twenty-Sixth Amendment share which feature?",
    o: ["Both were proposed by a national convention called by two-thirds of the state legislatures", "Both expanded the electorate, the Nineteenth to women and the Twenty-Sixth to 18-year-olds", "Both were ratified during Reconstruction as part of a single package of voting reforms", "Both removed a financial barrier that states had used to restrict access to the ballot"],
    c: [1],
    e: "Both amendments are suffrage-expanding: the Nineteenth (1920) enfranchised women, and the Twenty-Sixth (1971) lowered the voting age to eighteen. The poll tax was abolished by the Twenty-Fourth Amendment, Congress rather than a convention proposed both of these amendments, and neither dates from Reconstruction.",
  },

  {
    id: "apgov-u5-003",
    unit: "U5",
    topic: "5.1 The Voting Rights Act of 1965",
    type: "s",
    stimulusGroupId: null,
    q: "The Voting Rights Act of 1965 is most directly credited with",
    o: ["extending the franchise to citizens between the ages of eighteen and twenty", "abolishing the poll tax in state and local elections across the entire country", "banning literacy tests and placing covered jurisdictions under federal election oversight", "requiring every state to offer same-day voter registration at each polling place"],
    c: [2],
    e: "The Voting Rights Act of 1965 banned literacy tests and similar devices and created federal oversight mechanisms for jurisdictions with histories of racial discrimination in voting, producing large, rapid increases in Black voter registration in the South. The poll tax was addressed by the Twenty-Fourth Amendment and Harper v. Virginia Board of Elections, the voting age by the Twenty-Sixth Amendment, and same-day registration is a state-level reform.",
  },

  {
    id: "apgov-u5-004",
    unit: "U5",
    topic: "5.2 Comparing U.S. voter turnout to peer democracies",
    type: "s",
    stimulusGroupId: null,
    q: "Compared with most other established democracies, voter turnout in the United States, especially in midterm and local elections, is generally",
    o: ["about the same, since most peer democracies also rely on voluntary voter registration", "higher, because the United States holds more elections than most peer democracies do", "lower, a gap often linked to registration requirements and the frequency of elections", "lower, because the United States restricts the franchise more narrowly than peer democracies"],
    c: [2],
    e: "The United States consistently ranks below most peer democracies in turnout, a gap especially pronounced outside presidential-year elections; advance registration requirements and the sheer frequency of American elections are the standard explanations. American suffrage law is broadly inclusive rather than unusually restrictive, and many peer democracies register voters automatically rather than leaving it to the individual.",
  },

  {
    id: "apgov-u5-005",
    unit: "U5",
    topic: "5.2 Structural factors affecting turnout",
    type: "s",
    stimulusGroupId: null,
    q: "Which of the following is a structural (institutional) factor that political scientists most commonly cite as depressing voter turnout in the United States relative to other democracies?",
    o: ["Same-day registration available at the polling place on election day", "Elections held on a weekend or on a designated national holiday", "Automatic registration through state motor vehicle agency records", "Advance registration deadlines that fall weeks before election day"],
    c: [3],
    e: "Advance registration deadlines raise the personal cost of voting compared with systems that register citizens automatically or at the polls. Same-day registration, automatic registration, and weekend or holiday voting are all reforms associated with raising turnout rather than depressing it.",
  },

  {
    id: "apgov-u5-006",
    unit: "U5",
    topic: "5.3 The Electoral College: winner-take-all allocation",
    type: "s",
    stimulusGroupId: null,
    q: "In most states, a presidential candidate who wins a bare plurality of that state's popular vote receives",
    o: ["all of that state's electoral votes, under the winner-take-all rule most states use", "a share of the state's electors proportional to the candidate's share of the popular vote", "electoral votes corresponding to the congressional districts that the candidate carried", "the state's electoral votes once a runoff confirms majority rather than plurality support"],
    c: [0],
    e: "Nearly all states award all of their electoral votes to whichever candidate wins the statewide popular vote, regardless of the margin. Maine and Nebraska are the exceptions and use a district-based method, no state allocates electors proportionally, and no state requires a runoff or an outright majority.",
  },

  {
    id: "apgov-u5-007",
    unit: "U5",
    topic: "5.4 Political parties: functions in the political system",
    type: "s",
    stimulusGroupId: null,
    q: "Which set of functions is most closely associated with political parties as linkage institutions?",
    o: ["Certifying election results, drawing district lines, and administering polling places statewide", "Registering lobbyists, auditing campaign finance reports, and enforcing disclosure requirements", "Recruiting and nominating candidates, mobilizing voters, and organizing government after elections", "Drafting agency regulations, litigating test cases, and lobbying committees on pending bills"],
    c: [2],
    e: "Parties perform the classic linkage-institution functions of candidate recruitment and nomination, voter mobilization, and organizing legislative majorities. Rulemaking and litigation belong to agencies and interest groups, election administration and districting are state government functions, and campaign finance enforcement belongs to the Federal Election Commission.",
  },

  {
    id: "apgov-u5-008",
    unit: "U5",
    topic: "5.4 Duverger's Law and the American two-party system",
    type: "s",
    stimulusGroupId: null,
    q: "The United States has used single-member districts with plurality ('first past the post') elections for most of its history and has consistently had two dominant parties. Duverger's Law explains this relationship by arguing that",
    o: ["party systems reflect the number of major social cleavages rather than the electoral rule", "two-party systems arise from the requirement that a president win an Electoral College majority", "proportional representation reliably produces two dominant parties in national legislatures", "plurality rules in single-member districts push voters away from parties unlikely to win"],
    c: [3],
    e: "Duverger's Law links the electoral rule itself — plurality voting in single-member districts — to a tendency toward two-party dominance, because voters and donors gravitate toward the two parties most likely to win rather than 'wasting' support on a third. Proportional systems tend toward multiparty outcomes instead, the Constitution mandates no party system, and the social-cleavage account is a rival explanation rather than Duverger's.",
  },

  {
    id: "apgov-u5-009",
    unit: "U5",
    topic: "5.5 Interest groups vs. political parties",
    type: "s",
    stimulusGroupId: null,
    q: "Which statement correctly distinguishes an interest group from a political party?",
    o: ["Interest groups form around a single industry while parties form around geographic regions", "Interest groups pursue narrower policy aims without nominating candidates under their own label", "Interest groups nominate candidates while parties confine themselves to lobbying legislators", "Interest groups may endorse candidates while parties are barred from taking policy positions"],
    c: [1],
    e: "Interest groups pursue targeted policy influence through lobbying, litigation, and public campaigns without contesting elections under their own label, while parties nominate candidates and take positions across a broad range of issues in order to win and organize government. Parties adopt platforms and lobby as well, and interest groups organize around causes and professions as well as industries.",
  },

  {
    id: "apgov-u5-010",
    unit: "U5",
    topic: "5.6/5.7 PACs, Super PACs, and Citizens United v. FEC (2010)",
    type: "s",
    stimulusGroupId: null,
    q: "Which statement correctly compares a traditional PAC, a Super PAC, and the holding of Citizens United v. FEC (2010)?",
    o: ["Traditional PACs and Super PACs face identical rules, since Citizens United removed limits on direct contributions", "Super PACs may coordinate freely with campaigns, since Citizens United treated coordinated spending as protected speech", "Traditional PACs give limited amounts to candidates; Super PACs, enabled by Citizens United, spend unlimited sums independently", "Traditional PACs are limited to independent spending, while Citizens United let Super PACs give directly to candidates"],
    c: [2],
    e: "Contribution limits still apply to money given directly to candidates, which is what traditional PACs do. Citizens United held that independent political expenditures by corporations and unions are protected speech, and that holding is what enabled Super PACs, which may raise and spend unlimited sums independently but may neither coordinate with a campaign nor contribute to a candidate's own account.",
  },

  {
    id: "apgov-u5-011",
    unit: "U5",
    topic: "5.8 The media's agenda-setting function",
    type: "s",
    stimulusGroupId: null,
    q: "News outlets devote extensive coverage to a proposed policy for several weeks, after which public opinion polling shows a sharp increase in the share of respondents naming that policy area as 'the most important problem facing the country.' This pattern best illustrates",
    o: ["priming, in which prior coverage changes the standards voters use to judge officials", "agenda setting, in which coverage shapes which issues the public treats as important", "framing, in which the way a story is presented changes how audiences evaluate it", "horse-race coverage, in which reporting focuses on polling standings rather than policy"],
    c: [1],
    e: "Agenda-setting theory holds that heavy media coverage strongly influences which issues the public perceives as salient — 'what to think about' — which is exactly the pattern described. Framing concerns how an issue is presented, priming concerns the criteria audiences then use to evaluate officials, and horse-race coverage describes a focus on who is winning.",
  },

  {
    id: "apgov-u5-012",
    unit: "U5",
    topic: "5.9 Linkage institutions: identifying examples",
    type: "s",
    stimulusGroupId: null,
    q: "Which of the following is a linkage institution — a structure that connects citizens' preferences to government policymakers?",
    o: ["The federal bureaucracy, which converts broad statutes into enforceable regulations", "The federal judiciary, which resolves disputes over the meaning of federal statutes", "State election boards, which register voters and certify the official results", "Political parties, which recruit candidates and mobilize voters between elections"],
    c: [3],
    e: "Parties, along with elections, the media, and interest groups, are the standard linkage institutions connecting citizen preferences to policymakers. The bureaucracy and the judiciary implement and interpret policy, and state election boards administer the machinery of voting rather than channeling citizen preferences into government.",
  },

  {
    id: "apgov-u5-013",
    unit: "U5",
    topic: "5.9 Political efficacy and participation",
    type: "s",
    stimulusGroupId: null,
    q: "Survey research consistently finds that citizens who score higher on 'political efficacy' — the belief that their political participation can make a difference — are",
    o: ["more likely to take part in protest but less likely to cast a ballot", "less likely to vote, because confidence reduces the felt urgency of participating", "more likely to vote and to take part in politics in other ways as well", "no more likely to participate once income and education are taken into account"],
    c: [2],
    e: "Higher political efficacy is among the more robust predictors of political participation: citizens who believe their engagement matters are more likely to vote, contact officials, and otherwise take part. The relationship holds after controlling for socioeconomic status, and it applies to conventional participation such as voting, not just to protest.",
  },

  {
    id: "apgov-u5-014",
    unit: "U5",
    topic: "5.2 Reading turnout data across election types",
    type: "s",
    stimulusGroupId: "apgov-g-turnout",
    stimulus: S_TURNOUT,
    q: "Which statement is best supported by the data in the table?",
    o: ["Turnout rose in every successive election listed, regardless of the election type", "Midterm turnout declined across the period while presidential turnout held steady", "Midterm turnout exceeded presidential turnout in each pair of years shown", "Presidential-year turnout exceeded turnout in the midterms falling between those years"],
    c: [3],
    e: "Reading the table directly, each presidential-year figure exceeds the adjacent midterm figures — the well-documented presidential/midterm turnout gap. Midterm turnout rose from about 40% to about 47% rather than declining, and turnout fell whenever a presidential year was followed by a midterm.",
  },

  {
    id: "apgov-u5-015",
    unit: "U5",
    topic: "5.2 Explaining the presidential/midterm turnout gap",
    type: "s",
    stimulusGroupId: "apgov-g-turnout",
    stimulus: S_TURNOUT,
    q: "Which explanation is most consistent with both the pattern in the table and material covered elsewhere in this course?",
    o: ["Midterm electorates are larger, so the same number of voters yields a lower percentage", "Presidential races draw far more media coverage and campaign spending, raising salience and party mobilization", "Midterm ballots contain fewer contested offices, so most districts hold uncontested races", "Presidential years coincide with automatic registration in most states, easing ballot access"],
    c: [1],
    e: "Higher salience, heavier coverage, and more intense party mobilization in presidential years are the standard explanations for the turnout gap, directly connecting Unit 5's turnout data to the media's agenda-setting role and parties' mobilization function. The voting-age population does not expand in midterm years, registration rules do not change with the election cycle, and midterm ballots still feature contested House, Senate, and state races.",
  },
];
