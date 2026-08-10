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
//                                                            with image/alt/description metadata
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
  source: "Office of Management and Budget, Historical Table 12.2, Outlays for Grants to State and Local Governments (current dollars), https://www.whitehouse.gov/omb/budget/historical-tables/",
  columns: ["Fiscal year", "Federal grant outlays (billions of current dollars)"],
  rows: [
    ["1980", "$91.4"],
    ["1990", "$135.3"],
    ["2000", "$285.9"],
    ["2010", "$608.4"],
    ["2020", "$828.9"],
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
  title: "Argument in \"Letter from a Birmingham Jail\" (1963)",
  source: "Martin Luther King Jr., written from the Birmingham city jail, April 16, 1963",
  text:
    "King distinguishes just from unjust laws by asking whether a rule accords with moral law and whether a majority " +
    "imposes it on a minority without accepting the same rule itself. He defends open, nonviolent civil disobedience " +
    "when the protester accepts the legal penalty to expose injustice. In his words, this can express \"the highest " +
    "respect for law.\"",
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
  title: "Party division at the opening of the 118th Congress (January 3, 2023)",
  source: "U.S. House of Representatives, 118th Congress profile, and U.S. Senate Historical Office party-division tables; https://history.house.gov/Congressional-Overview/Profiles/118th/ and https://www.senate.gov/history/partydiv.htm",
  columns: ["Chamber", "Republicans", "Democrats", "Independents", "Vacancies"],
  rows: [
    ["House", "222", "212", "0", "1"],
    ["Senate", "49", "48", "3", "0"],
  ],
};

const S_TURNOUT = {
  type: "quantitative",
  title: "Reported voter turnout in selected federal elections",
  source: "U.S. Census Bureau, Current Population Survey voting and registration reports, https://www.census.gov/topics/public-sector/voting/data/tables.html",
  columns: ["Election year", "Election type", "Reported turnout (% of citizen voting-age population)"],
  rows: [
    ["2016", "Presidential", "61.4%"],
    ["2018", "Midterm", "53.4%"],
    ["2020", "Presidential", "66.8%"],
    ["2022", "Midterm", "52.2%"],
    ["2024", "Presidential", "65.3%"],
  ],
};

const S_TRUST = {
  type: "quantitative",
  title: "Trust in the federal government, June 2024",
  source: "Pew Research Center, national survey conducted June 3–9, 2024, https://www.pewresearch.org/politics/2024/06/24/americans-trust-in-federal-government-and-attitudes-toward-it/",
  columns: ["Group", "Trust government always/most of the time"],
  rows: [["All adults", "22%"], ["Democrats/Democratic leaners", "35%"], ["Republicans/Republican leaners", "About 10%"]],
};

const S_CAMPAIGN_FINANCE = {
  type: "quantitative",
  title: "Federal campaign activity, 2023–2024 election cycle",
  source: "Federal Election Commission, 24-month statistical summary published April 23, 2025, https://www.fec.gov/updates/statistical-summary-of-24-month-campaign-activity-of-the-2023-2024-election-cycle/",
  columns: ["Political actor", "Receipts", "Disbursements"],
  rows: [["Congressional candidates", "$3.8 billion", "$3.7 billion"], ["Political party committees", "$2.7 billion", "$2.6 billion"], ["PACs", "$15.7 billion", "$15.5 billion"], ["Independent expenditures (reported)", "—", "$4.4 billion"]],
};

const S_DEATH_PENALTY = {
  type: "quantitative",
  title: "Public support for the death penalty for persons convicted of murder, selected years",
  source: "Gallup, \"Death Penalty\" historical trend, https://news.gallup.com/poll/1606/death-penalty.aspx",
  columns: ["Year", "In favor of the death penalty"],
  rows: [
    ["1994", "80%"],
    ["2003", "64%"],
    ["2013", "60%"],
    ["2019", "56%"],
    ["2025", "52%"],
  ],
};

const S_FED_REVENUE_SHARE = {
  type: "quantitative",
  title: "Intergovernmental transfers as a share of combined state and local general revenue, selected years",
  source: "Urban-Brookings Tax Policy Center, \"What are the sources of revenue for state and local governments?\" (updated January 2024), https://taxpolicycenter.org/briefing-book/what-are-sources-revenue-state-and-local-governments",
  columns: ["Year", "Federal transfers (% of combined state and local general revenue)"],
  rows: [
    ["1977", "22%"],
    ["1989", "16%"],
    ["2003", "22%"],
    ["2011", "25%"],
    ["2019", "22%"],
    ["2021", "27%"],
  ],
};

const S_EXEC_ORDERS = {
  type: "quantitative",
  title: "Average executive orders issued per year in office, selected presidents",
  source: "Gerhard Peters and John T. Woolley, \"Executive Orders,\" The American Presidency Project, https://www.presidency.ucsb.edu/statistics/data/executive-orders",
  columns: ["President (term)", "Average executive orders per year in office"],
  rows: [
    ["Bill Clinton (1993–2001)", "46"],
    ["George W. Bush (2001–2009)", "36"],
    ["Barack Obama (2009–2017)", "35"],
    ["Donald Trump, first term (2017–2021)", "55"],
    ["Joe Biden (2021–2025)", "41"],
  ],
};

const S_IDEOLOGY = {
  type: "quantitative",
  title: "Self-described political ideology of U.S. adults, selected years",
  source: "Gallup, \"U.S. Political Ideology Steady; Conservatives, Moderates Tie,\" https://news.gallup.com/poll/388988/political-ideology-steady-conservatives-moderates-tie.aspx and \"U.S. Political Parties Historically Polarized Ideologically,\" https://news.gallup.com/poll/655190/political-parties-historically-polarized-ideologically.aspx",
  columns: ["Year", "Conservative", "Moderate", "Liberal"],
  rows: [
    ["1992", "36%", "43%", "17%"],
    ["2021", "36%", "37%", "25%"],
    ["2024", "37%", "34%", "25%"],
  ],
};

const S_DOUGLASS = {
  type: "text",
  title: "Argument in \"What to the Slave Is the Fourth of July?\" (1852)",
  source: "Frederick Douglass, address to the Rochester Ladies' Anti-Slavery Society, July 5, 1852",
  text:
    "Douglass argues that an Independence Day celebration of liberty rings hollow for enslaved Americans, who share in " +
    "none of the freedom the holiday commemorates. He does not reject the Declaration of Independence itself — he calls " +
    "its principles \"saving\" and treats them as the legitimate standard by which the nation should be judged — but " +
    "insists the country has failed to extend \"life, liberty, and the pursuit of happiness\" to all its people, and " +
    "that the gap between the nation's stated ideals and its practice is the deepest wrong requiring correction.",
};

const S_FDR_INAUGURAL = {
  type: "text",
  title: "Argument in the First Inaugural Address (1933)",
  source: "Franklin D. Roosevelt, First Inaugural Address, delivered March 4, 1933",
  text:
    "Speaking amid the Great Depression, Roosevelt argues that the emergency demands swift, unified executive " +
    "leadership comparable to wartime mobilization. He pledges to work within his constitutional executive authority " +
    "and to seek new authority from Congress through normal legislative channels, but adds that if Congress fails to " +
    "act and the emergency persists, he will ask for \"broad Executive power to wage a war against the emergency, as " +
    "great as the power that would be given to me if we were in fact invaded by a foreign foe.\"",
};

const S_PROGRESSIVE_1912 = {
  type: "text",
  title: "The Progressive (\"Bull Moose\") Party platform (1912)",
  source: "Progressive Party national platform, adopted at the party's Chicago convention, August 1912",
  text:
    "Built around Theodore Roosevelt's independent candidacy after he split from the Republican Party, the platform " +
    "called for direct primary elections, women's suffrage, an eight-hour workday, workers' compensation for " +
    "industrial injuries, and stronger federal regulation of corporate trusts. Roosevelt finished second in the 1912 " +
    "election, ahead of the Republican incumbent, but several of the platform's positions were adopted into law or the " +
    "Constitution over the following decades even though the party itself did not endure.",
};

const S_VISUAL_PRESIDENT = {
  type: "visual",
  title: "Presidential communication routes",
  source: "Original illustration created for AP Exam Practice; not official College Board material.",
  image: "assets/presidential-communication.svg",
  alt: "A White House podium connects to a broadcast screen, mobile feed, news desk, and Congress, with members of the public beyond the media panels.",
};

const S_VISUAL_EQUAL = {
  type: "visual",
  title: "A public university admissions policy under review",
  source: "Original illustration created for AP Exam Practice; not official College Board material.",
  image: "assets/equal-protection-balance.svg",
  alt: "A state university applicant file highlights race or ethnicity among five review factors. The university cites broader representation, while an applicant challenges the government's use of a racial classification.",
};

const S_VISUAL_HIGHWAY = {
  type: "visual",
  title: "Federal highway money offered to a state with conditions attached",
  source: "Original illustration created for AP Exam Practice; not official College Board material.",
  image: "assets/highway-funding-conditions.svg",
  alt: "A federal highway trust fund sends money toward a state transportation department, but a checklist between them lists three conditions the state must meet: setting the drinking age at 21, requiring seatbelt use, and posting standard speed limit signs. A note explains that noncompliance means a percentage of funds is withheld.",
};

const S_VISUAL_SOCIALIZATION = {
  type: "visual",
  title: "Four sources shaping a young adult's political views",
  source: "Original illustration created for AP Exam Practice; not official College Board material.",
  image: "assets/young-voter-influences.svg",
  alt: "A young adult at the center receives political cues from four directions: a family dinner-table conversation, a school civics classroom, an evening news broadcast, and a college friend group discussion.",
};

const S_VISUAL_TRIANGLE = {
  type: "visual",
  title: "A recurring three-way exchange among a committee, an agency, and a trade group",
  source: "Original illustration created for AP Exam Practice; not official College Board material.",
  image: "assets/policy-network-triangle.svg",
  alt: "A congressional subcommittee, a federal regulatory agency, and an industry trade association exchange favors in a closed loop: the subcommittee approves the agency's budget, the agency writes rules favorable to the industry, and the trade association funds campaign support for subcommittee members.",
};

const S_VISUAL_MEDIA = {
  type: "visual",
  title: "A city newspaper and its readers",
  source: "Original illustration created for AP Exam Practice; not official College Board material.",
  image: "assets/media-spotlight.svg",
  alt: "A city newspaper gives housing costs the largest headline and image while transit, schools, and flooding receive smaller boxes. Nearby residents discuss rising housing costs.",
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
    variantGroupId: "vg-u1-enumerated-reserved",
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
    o: ["Grant outlays declined between 1990 and 2000 before rising during the next decade", "Grant outlays rose at every selected observation and were about nine times larger in 2020 than in 1980", "Grant outlays stayed below $300 billion until 2020 and then more than doubled in one year", "The table shows that grants rose faster than inflation in every decade represented"],
    c: [1],
    e: "The current-dollar total rises at each selected observation, from $91.4 billion in 1980 to $828.9 billion in 2020, about a ninefold increase. The table does not provide an inflation series, so it cannot establish the rate of real growth.",
  },

  {
    id: "apgov-u1-027",
    unit: "U1",
    topic: "1.9 Federalism in action: drawing conclusions from fiscal federalism data",
    type: "s",
    stimulusGroupId: "apgov-g-grants",
    stimulus: S_GRANTS,
    q: "Which conclusion about federal influence over state policy can be drawn most defensibly from this table alone?",
    o: ["The national government gained greater policy control because every dollar shown carried a categorical condition", "States became fiscally dependent because grants exceeded half of all state and local revenue by 2020", "The nominal scale of federal support grew, but the table alone does not show the conditions attached or states' dependence", "The federal balance shifted toward states because larger grant totals necessarily indicate greater state discretion"],
    c: [2],
    e: "The table establishes growth in nominal grant outlays. It does not distinguish categorical from block grants, report state and local revenue, or measure the conditions attached, so broader claims about control or dependence require additional evidence.",
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
    e: "Two real limits are visible: current dollars do not adjust for inflation, and money is only one instrument of federalism. Mandates, statutory preemption, and Supreme Court doctrine also affect the national-state balance but appear nowhere in the table.",
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
    o: ["Vetoing legislation — an informal power that developed through presidential custom", "Issuing executive orders — a formal power listed by name in Article II", "Using the bully pulpit — a formal power that Article II conditions on Senate approval", "Negotiating treaties — an express Article II power exercised with the advice and consent of the Senate"],
    c: [3],
    e: "Article II expressly authorizes the president to make treaties with the advice and consent of two-thirds of senators present. The veto is explicit in Article I, Section 7 rather than a matter of custom; executive orders are nowhere named in the text and must rest on constitutional or delegated authority; and the bully pulpit is an informal tool requiring no Senate role.",
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
    variantGroupId: "vg-u2-bureaucratic-discretion",
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
    o: ["A Senate that declines to hold confirmation hearings on a president's judicial nominee", "A president using federal troops and the federalized National Guard to enforce a desegregation order", "A justice who writes a lengthy dissent criticizing the majority's constitutional reasoning", "A Congress that adds seats to a lower federal court to shift its ideological balance"],
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
    variantGroupId: "vg-u2-marbury-judicial-review",
    q: "In Marbury v. Madison (1803), the Supreme Court held that",
    o: ["the judiciary's province is to say what the law is, establishing review of congressional acts", "state courts must follow federal constitutional rulings, settling the supremacy of federal law", "Congress may not enlarge the Supreme Court's appellate jurisdiction beyond what Article III lists", "the president may withhold a commission that has been signed and sealed but not delivered"],
    c: [0],
    e: "Marbury established judicial review — the power of federal courts to declare a law repugnant to the Constitution and refuse to apply it. The provision at issue was invalid because it enlarged the Court's original, not appellate, jurisdiction; the Court also concluded that Marbury was legally entitled to his commission; and the binding force of federal rulings on state courts was settled in later decisions.",
  },

  {
    id: "apgov-u2-022",
    unit: "U2",
    topic: "2.1 Reading data on congressional composition",
    type: "s",
    stimulusGroupId: "apgov-g-billdata",
    stimulus: S_BILLDATA,
    q: "Which statement is best supported by the data in the table?",
    o: ["Republicans held a House majority, while Democrats could organize the Senate with independent support", "Democrats held outright numerical majorities in both the House and the Senate", "Republicans held exactly the same share of seats in each congressional chamber", "Neither chamber could organize because vacancies prevented either party from reaching a majority"],
    c: [0],
    e: "Republicans held 222 of the 434 filled House seats. In the Senate, the 48 Democrats and three independents who caucused with them allowed Democrats to organize the chamber despite Republicans holding 49 seats.",
  },

  {
    id: "apgov-u2-023",
    unit: "U2",
    topic: "2.1 Evaluating congressional composition data",
    type: "s",
    stimulusGroupId: "apgov-g-billdata",
    stimulus: S_BILLDATA,
    q: "Which is the most important limitation of using this table to predict legislative outcomes during the entire 118th Congress?",
    o: ["Opening-day membership does not capture later vacancies, replacements, party unity, coalitions, or procedural rules", "The table reports party membership rather than the constitutional age requirements for serving", "The table combines senators and representatives even though both groups cast votes in the same chamber", "Opening-day figures cannot identify which party had more members in either chamber"],
    c: [0],
    e: "A membership snapshot identifies formal party numbers but not later changes or how consistently members vote together. Institutional rules such as the Senate filibuster also affect outcomes beyond simple seat totals.",
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
    variantGroupId: "vg-u3-due-process-accused",
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
    variantGroupId: "vg-u3-second-amendment-incorporation",
    q: "McDonald v. City of Chicago (2010) is significant primarily because",
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
    variantGroupId: "vg-u4-margin-of-error",
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
    variantGroupId: "vg-u5-electoral-college",
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
    e: "Traditional PACs may contribute limited amounts directly to candidates. Citizens United protected corporate and union independent expenditures; SpeechNow.org v. FEC then applied that reasoning to hold that independent-expenditure-only groups may accept unlimited contributions. Those groups, now called Super PACs, may not contribute to or coordinate spending with candidates.",
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

  {
    id: "apgov-u2-024", unit: "U2", topic: "2.7 Presidential Communication", topicCode: "2.7", skill: "4",
    type: "s", stimulusGroupId: "apgov-g-visual-president", stimulus: S_VISUAL_PRESIDENT,
    q: "Which conclusion about the modern presidency is best supported by the visual?",
    o: ["Presidents can combine direct appeals with mediated coverage when seeking public support", "Presidents rely more on congressional leaders than on public appeals when promoting policy", "News organizations determine the content of presidential proposals before audiences receive them", "Communication technology gives presidents greater formal lawmaking authority than Congress"],
    c: [0],
    e: "The visual shows direct and mediated routes operating at the same time. Presidents can appeal directly through digital platforms while also relying on broadcast and professional news coverage. Those routes can support persuasion, but they do not transfer Congress's formal lawmaking authority or let news organizations rewrite presidential proposals.",
  },
  {
    id: "apgov-u2-025", unit: "U2", topic: "2.7 Presidential Communication", topicCode: "2.7", skill: "4",
    type: "s", stimulusGroupId: "apgov-g-visual-president", stimulus: S_VISUAL_PRESIDENT,
    q: "A president repeatedly uses the routes shown to keep one proposal at the center of public debate and build pressure on Congress. This is an example of",
    o: ["signing-statement authority used to change how an enacted statute will be enforced", "the bully pulpit used to set the national policy agenda and pressure Congress", "executive privilege used to withhold internal deliberations from congressional committees", "the pardon power used to signal a change in the administration's enforcement priorities"],
    c: [1],
    e: "The bully pulpit is the president's informal capacity to use visibility and media attention to shape the public agenda and build pressure on other institutions. The other choices are distinct formal or claimed presidential powers.",
  },
  {
    id: "apgov-u3-019", unit: "U3", topic: "3.13 Affirmative Action", topicCode: "3.13", skill: "4",
    type: "s", stimulusGroupId: "apgov-g-visual-equal", stimulus: S_VISUAL_EQUAL,
    q: "A constitutional challenge to the state university policy shown would center primarily on which provision?",
    o: ["The Equal Protection Clause of the Fourteenth Amendment", "The Establishment Clause of the First Amendment", "The Takings Clause of the Fifth Amendment", "The Privileges and Immunities Clause of Article IV"],
    c: [0],
    e: "Affirmative-action litigation focuses on whether classifications used to address disparities comply with the Fourteenth Amendment's Equal Protection Clause. The other provisions concern religion, property compensation, or discrimination against out-of-state citizens.",
  },
  {
    id: "apgov-u3-020", unit: "U3", topic: "3.13 Affirmative Action", topicCode: "3.13", skill: "4",
    type: "s", stimulusGroupId: "apgov-g-visual-equal", stimulus: S_VISUAL_EQUAL,
    q: "Under current constitutional doctrine, how would a court generally review the university's use of the highlighted factor?",
    o: ["Under rational-basis review, asking whether the policy is reasonably related to a legitimate university purpose", "Under the political-question doctrine, leaving the policy entirely to university administrators and elected officials", "Under strict scrutiny, asking whether the classification is narrowly tailored to serve a compelling government interest", "Under intermediate scrutiny, asking whether the policy is substantially related to an important government interest"],
    c: [2],
    e: "Government racial classifications are subject to strict scrutiny. In Students for Fair Admissions v. Harvard and the companion University of North Carolina case, the Court held that the challenged admissions programs did not satisfy that standard. Rational-basis and intermediate scrutiny are less demanding tests, and a constitutional challenge to a state policy is justiciable.",
  },
  {
    id: "apgov-u4-015", unit: "U4", topic: "4.4 Influence of Political Events on Ideology", topicCode: "4.4", skill: "3",
    type: "s", stimulusGroupId: "apgov-g-trust", stimulus: S_TRUST,
    q: "Which comparison is supported by the survey data?",
    o: ["Republican-aligned adults reported about the same trust as the national public", "Democratic-aligned adults reported substantially more trust than Republican-aligned adults", "A majority of each partisan group trusted the federal government always or most of the time", "Adults without a party preference reported more trust than either major-party group"],
    c: [1],
    e: "The reported 35 percent among Democratic-aligned adults is substantially above the approximately 10 percent among Republican-aligned adults. Neither group reaches a majority, and the table provides no separate figure for unaffiliated adults.",
  },
  {
    id: "apgov-u4-016", unit: "U4", topic: "4.4 Influence of Political Events on Ideology", topicCode: "4.4", skill: "3",
    type: "s", stimulusGroupId: "apgov-g-trust", stimulus: S_TRUST,
    q: "Which course concept offers the strongest explanation for the partisan gap shown in the table?",
    o: ["People often evaluate institutions differently depending on whether their party controls the presidency", "Political socialization produces identical institutional attitudes within every generation", "Random sampling guarantees that partisan groups will report the same level of trust", "Federalism causes national institutions to receive lower ratings than every state institution"],
    c: [0],
    e: "Public trust often shifts with partisan control of the presidency: identifiers of the president's party tend to express greater trust than identifiers of the out-party. Sampling does not force identical subgroup views, and the table makes no state-national comparison.",
  },
  {
    id: "apgov-u4-017", unit: "U4", topic: "4.6 Evaluating Public Opinion Data", topicCode: "4.6", skill: "3",
    type: "s", stimulusGroupId: "apgov-g-trust", stimulus: S_TRUST,
    q: "Which additional information is most important before deciding whether the partisan difference is statistically distinguishable?",
    o: ["The number of news stories published about government during the survey week", "The sample sizes and margins of error for the two partisan subgroups", "The number of federal employees living in every respondent's county", "The percentage of elected officials who approved of the survey question"],
    c: [1],
    e: "Subgroup sample sizes and margins of error are necessary to evaluate sampling uncertainty around the observed gap. News volume, local employment, and officials' reactions do not establish statistical distinguishability.",
  },
  {
    id: "apgov-u5-016", unit: "U5", topic: "5.11 Campaign Finance", topicCode: "5.11", skill: "3",
    type: "s", stimulusGroupId: "apgov-g-campaign-finance", stimulus: S_CAMPAIGN_FINANCE,
    q: "Which statement is best supported by the FEC summary?",
    o: ["Political party committees spent more than PACs during the cycle", "Congressional candidates received more than all PACs combined", "PAC receipts and disbursements exceeded those reported for the other listed actors", "Independent expenditures were included as contributions made directly to candidates"],
    c: [2],
    e: "PAC receipts and disbursements were about $15.7 and $15.5 billion, respectively, well above the candidate and party totals shown. Independent expenditures are spending made without candidate coordination, not direct candidate contributions.",
  },
  {
    id: "apgov-u5-017", unit: "U5", topic: "5.11 Campaign Finance", topicCode: "5.11", skill: "3",
    type: "s", stimulusGroupId: "apgov-g-campaign-finance", stimulus: S_CAMPAIGN_FINANCE,
    q: "Which limitation most constrains using this table to determine who had the greatest influence on election outcomes?",
    o: ["The dollar totals do not reveal persuasion effects, coordination rules, electoral targets, or whether spending changed votes", "The table reports both receipts and spending, making comparisons between political actors impossible", "The FEC lacks constitutional authority to collect campaign-finance reports from federal committees", "The totals exclude all spending by congressional candidates and national political parties"],
    c: [0],
    e: "Financial volume is not a direct measure of political effect. The table does not show targeting, message effectiveness, coordination status for each expenditure, or counterfactual election outcomes.",
  },
  {
    id: "apgov-u5-018", unit: "U5", topic: "5.12 The Media", topicCode: "5.12", skill: "4",
    type: "s", stimulusGroupId: "apgov-g-visual-media", stimulus: S_VISUAL_MEDIA,
    q: "Which media effect best explains the relationship shown in the visual?",
    o: ["Agenda setting, because story prominence can raise an issue's perceived importance", "Framing, because a story's language can emphasize one interpretation of an issue", "Watchdog journalism, because reporters can investigate misconduct by public officials", "Horse-race journalism, because coverage can emphasize campaign strategy and polling"],
    c: [0],
    e: "Agenda setting describes the media's capacity to influence which issues audiences regard as important by giving some matters more prominence. The visual contrasts story placement and audience attention; it does not show interpretive language, an investigation of officials, or campaign strategy and polling.",
  },
  {
    id: "apgov-u5-019", unit: "U5", topic: "5.13 Changing Media", topicCode: "5.13", skill: "4",
    type: "s", stimulusGroupId: "apgov-g-visual-media", stimulus: S_VISUAL_MEDIA,
    q: "If most readers replaced a shared city edition with individually ranked news feeds, which outcome would be most likely?",
    o: ["Different groups could rank different issues as important because algorithms and selective exposure segment attention", "A shared national agenda could become more consistent because algorithms expose users to similar issue priorities", "Traditional editors could gain more control because individualized feeds reduce direct communication by political actors", "Issue salience could become less connected to media choices because ranking replaces story selection"],
    c: [0],
    e: "Individualized feeds can produce different issue agendas for different audiences because algorithms, platform choices, and selective exposure shape what each group sees. Digital media neither standardize attention nor require traditional editorial approval.",
  },
  {
    id: "apgov-u5-020", unit: "U5", topic: "5.1 Voting Rights and Models of Voting Behavior", topicCode: "5.1", skill: "1", type: "s", stimulusGroupId: null,
    q: "A voter supports the incumbent after deciding that employment and household income improved during the incumbent's term. Which model best describes the decision?",
    o: ["Prospective voting based on the challenger's promised future program", "Retrospective voting based on the incumbent's past performance", "Party-line voting based solely on a long-standing partisan identity", "Rational abstention based on the perceived cost of reaching the polls"],
    c: [1], e: "Retrospective voters judge incumbents by past performance. Prospective voters emphasize future promises; party-line voting relies on party identity rather than the performance evidence described.",
  },
  {
    id: "apgov-u5-021", unit: "U5", topic: "5.4 How and Why Political Parties Change and Adapt", topicCode: "5.4", skill: "1", type: "s", stimulusGroupId: null,
    q: "After a critical election shifts a durable bloc of voters toward the opposing party, party leaders revise their platform and use voter data to appeal to the new coalition. This best illustrates",
    o: ["party realignment followed by organizational and message adaptation", "divided government followed by mandatory coalition government", "selective incorporation followed by national policy preemption", "judicial restraint followed by congressional delegation"],
    c: [0], e: "A durable shift in party support is realignment. Parties then adapt policy, messaging, technology, and coalition strategy to compete under the new alignment.",
  },
  {
    id: "apgov-u5-022", unit: "U5", topic: "5.5 Third-Party Politics", topicCode: "5.5", skill: "1", type: "s", stimulusGroupId: null,
    q: "Why do single-member plurality districts create a barrier for third-party candidates?",
    o: ["They reserve ballot access for candidates nominated by the two largest parties", "They encourage strategic voting for a major-party candidate who has a realistic chance to win", "They allocate seats proportionally, leaving small parties without geographic concentrations", "They require third parties to win a national popular majority before receiving any local seats"],
    c: [1], e: "Winner-take-all plurality rules encourage voters to avoid a candidate perceived as unable to finish first, reinforcing two-party competition. Ballot rules can add barriers, but plurality districts do not formally reserve access or require a national majority.",
  },
  {
    id: "apgov-u5-023", unit: "U5", topic: "5.9 Congressional Elections", topicCode: "5.9", skill: "1", type: "s", stimulusGroupId: null,
    q: "Which factor most directly contributes to the incumbency advantage in congressional elections?",
    o: ["Incumbents can claim credit for constituent service and district projects while benefiting from name recognition", "Incumbents automatically receive their party's nomination without facing a primary challenger", "Federal law gives incumbents more broadcast advertising time than challengers at the same price", "The Constitution allows incumbents to redraw their own districts before every election"],
    c: [0], e: "Casework, credit claiming, fundraising networks, and name recognition benefit incumbents. They can face primaries, receive no special advertising allotment, and do not individually control redistricting.",
  },
  {
    id: "apgov-u5-024", unit: "U5", topic: "5.10 Modern Campaigns", topicCode: "5.10", skill: "1", type: "s", stimulusGroupId: null,
    q: "A campaign hires consultants to test messages, targets narrow voter segments with digital advertising, and devotes substantial candidate time to fundraising. Which feature of modern campaigns does this scenario illustrate?",
    o: ["Candidate-centered professionalization accompanied by rising costs and data-driven strategy", "Party-centered nominations controlled almost entirely by national convention delegates", "A return to short election cycles with limited reliance on professional staff", "Public financing that eliminates the need for private fundraising and targeted media"],
    c: [0], e: "Modern campaigns are increasingly candidate centered, consultant driven, expensive, long, and reliant on data targeting. The scenario describes those characteristics rather than party control or comprehensive public financing.",
  },
  {
    id: "apgov-u5-025", unit: "U5", topic: "5.13 Changing Media", topicCode: "5.13", skill: "1", type: "s", stimulusGroupId: null,
    q: "A citizen follows only ideologically congenial accounts, while a platform repeatedly recommends similar political content. Which consequence of changing media is most directly illustrated?",
    o: ["Selective exposure can reinforce polarization by limiting encounters with cross-cutting information", "The fairness doctrine requires the platform to provide equal time to competing viewpoints", "Prior restraint permits the government to remove inaccurate political opinions before publication", "Agenda setting disappears because digital users no longer receive political information"],
    c: [0], e: "Selective exposure and algorithmic recommendation can produce ideologically homogeneous information environments and reinforce polarization. The fairness doctrine does not govern social platforms, and digital media do not eliminate agenda setting.",
  },
  {
    id: "apgov-u2-026", unit: "U2", topic: "2.11 Checks on the Judicial Branch", topicCode: "2.11", skill: "1", type: "s", stimulusGroupId: null,
    q: "Which action is a constitutional check that the elected branches can exercise on the federal judiciary?",
    o: ["The Senate may confirm or reject the president's nominees for federal judgeships", "The president may reverse a Supreme Court judgment through an executive order", "The House may remove a justice by passing a resolution with a simple majority", "Congress may require the Court to obtain legislative approval before invalidating a statute"],
    c: [0], e: "The Senate's advice-and-consent power checks judicial appointments. Removal requires House impeachment and Senate conviction, while neither Congress nor the president may directly reverse a constitutional judgment through ordinary action.",
  },
  {
    id: "apgov-u2-027", unit: "U2", topic: "2.12 The Bureaucracy", topicCode: "2.12", skill: "1", type: "s", stimulusGroupId: null,
    q: "Which statement best describes the federal bureaucracy's role in policymaking?",
    o: ["Departments and agencies implement statutes through administration, enforcement, and specialized expertise", "Independent commissions write statutes that take effect without congressional authorization", "Government corporations decide constitutional disputes that arise from agency enforcement", "Cabinet departments exercise only advisory functions and do not administer federal programs"],
    c: [0], e: "Federal departments, agencies, commissions, and government corporations implement policy through administration, enforcement, expertise, and rulemaking under statutory authority. They do not enact statutes or exercise the judiciary's constitutional role.",
  },
  {
    id: "apgov-u3-021", unit: "U3", topic: "3.1 The Bill of Rights", topicCode: "3.1", skill: "1", type: "s", stimulusGroupId: null,
    q: "The original purpose of adding the Bill of Rights to the Constitution was primarily to",
    o: ["protect specified individual liberties and limit the new national government's power", "transfer authority over civil liberties from state courts to Congress", "replace structural checks and balances with judicial enforcement of rights", "guarantee that every listed liberty would immediately bind state governments"],
    c: [0], e: "The first ten amendments reassured critics by expressly protecting liberties and restricting the national government. Application of most provisions to the states came later through selective incorporation.",
  },
  {
    id: "apgov-u4-018", unit: "U4", topic: "4.3 Changes in Ideology", topicCode: "4.3", skill: "1", type: "s", stimulusGroupId: null, variantGroupId: "vg-u4-life-events-ideology",
    q: "Why can a major recession experienced during young adulthood produce a lasting change in political ideology?",
    o: ["Formative political events can reshape beliefs about government's economic role during a period of intense socialization", "Economic events determine party identification identically for every member of an age cohort", "Ideological change occurs only when Congress formally revises a party's national platform", "Public opinion becomes constitutionally binding when a generation reaches voting age"],
    c: [0], e: "Major events experienced during formative years can alter views of government and create cohort effects, though individuals within a generation remain diverse.",
  },
  {
    id: "apgov-u4-019", unit: "U4", topic: "4.10 Ideology and Social Policy", topicCode: "4.10", skill: "1", type: "s", stimulusGroupId: null,
    q: "Which comparison most accurately reflects mainstream ideological differences over social policy?",
    o: ["Liberals generally favor a larger national role in areas such as education and health, while conservatives more often prefer state or private responsibility", "Liberals generally oppose public-health regulation, while conservatives favor uniform national administration of health programs", "Both ideologies reject government involvement in education, differing only over the level of taxation", "Conservatives generally favor national control of social policy, while liberals prefer devolution to the states"],
    c: [0], e: "The CED contrasts liberal support for more national involvement in some social-policy areas with conservative support for less national involvement and greater state or private responsibility. These are tendencies, not universal positions.",
  },
  {
    id: "apgov-u5-026", unit: "U5", topic: "5.7 Groups Influencing Policy Outcomes", topicCode: "5.7", skill: "1", type: "s", stimulusGroupId: null,
    q: "An environmental movement combines public demonstrations, agency comments, litigation, and lobbying during congressional budget negotiations. The example best illustrates that",
    o: ["organized groups can use multiple access points to influence policy at different stages", "social movements may act only through elections because agencies cannot consider public input", "interest-group litigation prevents the same organization from lobbying Congress", "budget policy is insulated from influence by social movements and professional groups"],
    c: [0], e: "Groups and movements influence policy through many access points, including elections, agencies, courts, Congress, and public pressure. Using one strategy does not bar another.",
  },
  {
    id: "apgov-u1-029", unit: "U1", topic: "1.7 Relationship Between the States and Federal Government", topicCode: "1.7", skill: "4", type: "s", stimulusGroupId: "apgov-g-fed39", stimulus: S_FED39,
    q: "Which constitutional feature best supports Madison's claim that the proposed government is partly federal and partly national?",
    o: ["The House is elected by the people while states have equal representation in the Senate", "Federal judges are nominated by the president and confirmed by a national popular vote", "State legislatures may nullify federal laws while Congress may overturn state constitutions", "The president is selected by Congress while governors appoint each state's presidential electors"],
    c: [0], e: "The House reflects population and national popular representation, while equal state representation in the Senate preserves a federal element. The other arrangements do not describe the Constitution.",
  },
  {
    id: "apgov-u1-030", unit: "U1", topic: "1.1 Ideals of Democracy", topicCode: "1.1", skill: "4", type: "s", stimulusGroupId: "apgov-g-gettysburg", stimulus: S_GETTYSBURG,
    q: "Lincoln's description of a \"new birth of freedom\" most directly reframes the Civil War as a struggle to",
    o: ["renew the founding commitments to equality and self-government", "restore the Articles of Confederation as the basis of national union", "replace popular sovereignty with rule by a permanent national elite", "transfer responsibility for civil rights entirely to state governments"],
    c: [0], e: "Lincoln links Union victory to renewed freedom, equality, and government by the people. He does not advocate the Articles, elite rule, or exclusive state control of rights.",
  },
  {
    id: "apgov-u2-028", unit: "U2", topic: "2.6 Expansion of Presidential Power", topicCode: "2.6", skill: "4", type: "s", stimulusGroupId: "apgov-g-fed70", stimulus: S_FED70,
    q: "Which institutional tradeoff follows most directly from Hamilton's defense of an energetic executive?",
    o: ["Unity can improve speed and accountability while increasing the importance of checks on concentrated power", "Plural executive councils produce faster decisions but make responsibility easier to identify", "Executive energy requires eliminating legislative control over appropriations and confirmation", "A strong executive necessarily replaces judicial review with presidential interpretation"],
    c: [0], e: "Unity can support decision, dispatch, and identifiable responsibility, but concentrated executive capacity also makes constitutional checks important. Hamilton does not call for eliminating the other branches' powers.",
  },
  {
    id: "apgov-u3-022", unit: "U3", topic: "3.12 Balancing Minority and Majority Rights", topicCode: "3.12", skill: "4", type: "s", stimulusGroupId: "apgov-g-emancipation", stimulus: S_EMANCIPATION,
    q: "The Proclamation's reference to military service most directly illustrates how the order",
    o: ["connected emancipation in rebelling states to the president's wartime authority", "created a permanent peacetime power to alter any state's labor law", "applied only after Congress approved it as a constitutional amendment", "ended slavery nationwide through the president's ordinary lawmaking power"],
    c: [0], e: "Lincoln grounded the Proclamation in wartime authority and applied it to areas in rebellion, including recruitment into federal service. Nationwide abolition required the Thirteenth Amendment.",
  },
  {
    id: "apgov-u3-023", unit: "U3", topic: "3.6 Amendments: Balancing Individual Freedom with Public Order and Safety", topicCode: "3.6", skill: "3", type: "s", stimulusGroupId: "apgov-g-deathpenalty", stimulus: S_DEATH_PENALTY,
    q: "Based on the table, which best describes the change in public support for the death penalty between 1994 and 2025?",
    o: ["Support dropped roughly thirty points but stayed above a majority through 2025", "Support fell below fifty percent for the first time in 2025", "Support stayed essentially flat, moving less than five percentage points across three decades", "Support fell steadily until 2013 and then rebounded to near its 1994 level"],
    c: [0], e: "Favor dropped from 80% in 1994 to 52% in 2025, a decline of about 28 points, while still remaining above 50%. It never fell below a majority in the table, the change was far larger than five points, and there was no rebound after 2013 — support kept declining.",
  },
  {
    id: "apgov-u3-024", unit: "U3", topic: "3.6 Amendments: Balancing Individual Freedom with Public Order and Safety", topicCode: "3.6", skill: "3", type: "s", stimulusGroupId: "apgov-g-deathpenalty", stimulus: S_DEATH_PENALTY,
    q: "A commentator opposed to capital punishment cites this national polling trend to argue that abolishing the death penalty would still be difficult to achieve nationally, despite decades of declining support. Which feature of the data most directly supports that argument?",
    o: ["A majority of respondents continued to favor the death penalty in the most recent year shown", "Support for the death penalty was lower in 2025 than in any other year in the table", "The survey shows opposition to the death penalty exceeding fifty percent by 2019", "Support rebounded to its 1994 level by 2025"],
    c: [0], e: "At 52% favor in 2025, opposition still trails support, which is exactly why repeal would remain politically difficult. 2025 is indeed the lowest year shown, but that observation supports repeal being easier, not harder; opposition never exceeded 50% in the table; and support never rebounded to 1994 levels.",
  },
  {
    id: "apgov-u3-025", unit: "U3", topic: "3.6 Amendments: Balancing Individual Freedom with Public Order and Safety", topicCode: "3.6", skill: "3", type: "s", stimulusGroupId: "apgov-g-deathpenalty", stimulus: S_DEATH_PENALTY,
    q: "Which of the following is the most reasonable inference to draw solely from the data in the table?",
    o: ["Public backing for the death penalty has weakened over time without disappearing", "A majority of Americans now believe the death penalty is applied unfairly", "State legislatures have repealed the death penalty in most states", "Younger and older Americans support the death penalty at similar rates"],
    c: [0], e: "The table tracks only overall favor/oppose responses over time, which shows a real but incomplete decline. It says nothing about perceived fairness of application, state-level repeal activity, or how support varies by age group.",
  },
  {
    id: "apgov-u1-031", unit: "U1", topic: "1.9 Federalism in Action", topicCode: "1.9", skill: "3", type: "s", stimulusGroupId: "apgov-g-fedrevshare", stimulus: S_FED_REVENUE_SHARE,
    q: "According to the table, in which years was the federal share of combined state and local general revenue identical?",
    o: ["1977, 2003, and 2019, each at 22 percent", "1989 and 2011", "2003 and 2021", "No two years in the table share the same percentage"],
    c: [0], e: "1977, 2003, and 2019 each show federal transfers at 22% of general revenue. 1989 (16%) and 2011 (25%) do not match each other, and 2003 (22%) does not match 2021 (27%).",
  },
  {
    id: "apgov-u1-032", unit: "U1", topic: "1.9 Federalism in Action", topicCode: "1.9", skill: "3", type: "s", stimulusGroupId: "apgov-g-fedrevshare", stimulus: S_FED_REVENUE_SHARE,
    q: "The federal share reached 25% in 2011 and a table high of 27% in 2021. Which explanation is most directly supported by the historical pattern in the table?",
    o: ["Federal transfers rose again by 2011 amid 2009 recession relief spending", "Federal transfers have declined in every recorded year since the 1970s", "State governments have steadily reduced their own tax collection since 1977", "The federal share was below 20% in every year before 2011"],
    c: [0], e: "The 2011 figure reflects a known pattern of federal transfers rising during emergency relief spending, foreshadowing the 2021 pandemic-era peak. The table shows increases as well as decreases rather than a steady decline, no data on states' own tax collection appears at all, and the federal share was actually above 20% in two of the three years before 2011 (1977 and 2003, both at 22%).",
  },
  {
    id: "apgov-u1-033", unit: "U1", topic: "1.9 Federalism in Action", topicCode: "1.9", skill: "3", type: "s", stimulusGroupId: "apgov-g-fedrevshare", stimulus: S_FED_REVENUE_SHARE,
    q: "A rising federal share of state general revenue, as shown in the table, is most closely associated with which model of federalism?",
    o: ["Cooperative federalism, where national and state governments share funding and responsibility", "Dual federalism, in which national and state governments operate in separate spheres", "New federalism, which primarily returns policy discretion to the states through devolution", "Nullification, in which a state refuses to enforce a federal law"],
    c: [0], e: "A deepening financial relationship between federal and state governments reflects cooperative federalism's shared funding and responsibility. Dual federalism describes separate, non-overlapping spheres; new federalism is defined by returning discretion to states, not by a rising federal funding share; and nullification describes a state rejecting federal law outright.",
  },
  {
    id: "apgov-u2-029", unit: "U2", topic: "2.6 Expansion of Presidential Power", topicCode: "2.6", skill: "3", type: "s", stimulusGroupId: "apgov-g-execorders", stimulus: S_EXEC_ORDERS,
    q: "According to the table, which president averaged the most executive orders per year in office?",
    o: ["Donald Trump, during his first term", "Bill Clinton, across his two full terms", "Barack Obama, across his two full terms", "Joe Biden, across his one full term"],
    c: [0], e: "Trump's first term averaged 55 executive orders per year, higher than Clinton (46), Biden (41), or Obama (35).",
  },
  {
    id: "apgov-u2-030", unit: "U2", topic: "2.6 Expansion of Presidential Power", topicCode: "2.6", skill: "3", type: "s", stimulusGroupId: "apgov-g-execorders", stimulus: S_EXEC_ORDERS,
    q: "Every president shown continues to issue dozens of executive orders per year in office, even though the yearly average rises and falls from one administration to the next. Which best explains the persistent incentive behind this tool, consistent with the table?",
    o: ["Executive orders let a president act without needing new congressional majorities", "Executive orders carry greater legal permanence than statutes because courts cannot review them", "Executive orders require a two-thirds vote of the Senate, giving presidents leverage over appropriators", "Executive orders automatically become part of the Constitution once issued"],
    c: [0], e: "Unilateral action lets a president bypass the need to build a legislative coalition, which is especially attractive under divided or gridlocked government. Executive orders are reviewable by courts and more easily reversed than statutes, do not require any Senate vote, and have no effect on the Constitution's text.",
  },
  {
    id: "apgov-u2-031", unit: "U2", topic: "2.6 Expansion of Presidential Power", topicCode: "2.6", skill: "3", type: "s", stimulusGroupId: "apgov-g-execorders", stimulus: S_EXEC_ORDERS,
    q: "Which limitation most directly constrains a president's ability to use executive orders, as tallied in the table, to make durable policy?",
    o: ["A successor president may revoke a predecessor's executive order without congressional action", "The Senate must ratify every executive order by a two-thirds vote", "The House of Representatives can void an executive order by simple majority resolution", "State governors have constitutional authority to nullify federal executive orders"],
    c: [0], e: "Because a later president can simply rescind or rewrite an order, executive orders are inherently less durable than legislation — a limitation that recurs each time control of the presidency changes party. Executive orders require no Senate ratification, no House resolution can void one, and governors have no constitutional power to nullify federal action.",
  },
  {
    id: "apgov-u4-021", unit: "U4", topic: "4.6 Evaluating Public Opinion Data", topicCode: "4.6", skill: "3", type: "s", stimulusGroupId: "apgov-g-ideology", stimulus: S_IDEOLOGY,
    q: "Based on the table, how did the share of Americans identifying as politically moderate change between 1992 and 2024?",
    o: ["It declined nine points while conservative stayed flat and liberal grew", "It grew steadily while both conservative and liberal identification declined", "It remained the largest group of the three in every year shown", "It fell below liberal identification by 2024"],
    c: [0], e: "Moderate fell from 43% to 34% (a nine-point drop) while conservative moved only 36% to 37% and liberal rose from 17% to 25%. Moderate was largest in 1992 but conservative (37%) edged ahead of it by 2024, and moderate (34%) stayed above liberal (25%) throughout.",
  },
  {
    id: "apgov-u4-022", unit: "U4", topic: "4.6 Evaluating Public Opinion Data", topicCode: "4.6", skill: "3", type: "s", stimulusGroupId: "apgov-g-ideology", stimulus: S_IDEOLOGY,
    q: "A researcher cautions against over-interpreting this table as an exact measure of Americans' policy positions. Which limitation of the data best supports that caution?",
    o: ["Respondents self-select a broad ideological label, which can mask disagreement over specific policies within each category", "The survey used only online panels, making it unrepresentative of the adult population", "Gallup substantially reworded the ideology question across the years shown, so responses are not comparable over time", "The percentages in each year do not sum to 100%, which indicates a data-collection error"],
    c: [0], e: "A single self-chosen label like \"conservative\" can group together people who disagree sharply on individual policies, which is the standard critique of ideology self-placement measures. The survey has long used telephone interviews with consistent question wording, and the residual left after the three categories reflects respondents with no opinion — not an error.",
  },
  {
    id: "apgov-u4-020", unit: "U4", topic: "4.9 Ideology and Economic Policy", topicCode: "4.9", skill: "4", type: "s", stimulusGroupId: "apgov-g-wealth", stimulus: S_WEALTH,
    q: "A policymaker relying on the argument in the excerpt would be most likely to support",
    o: ["competitive markets with government protecting property rights and voluntary exchange", "comprehensive price controls designed to replace private decisions about production", "a ban on private profit so that firms pursue only objectives set by public officials", "government ownership of all industry to prevent individuals from pursuing self-interest"],
    c: [0], e: "Smith's argument links self-interest and competition to social benefits, aligning with market exchange protected by property and contract rules rather than comprehensive state direction.",
  },
  {
    id: "apgov-u1-034", unit: "U1", topic: "1.1 Ideals of Democracy", topicCode: "1.1", skill: "4", type: "s", stimulusGroupId: "apgov-g-douglass", stimulus: S_DOUGLASS,
    q: "Douglass's argument in the passage most directly illustrates which idea about American democracy?",
    o: ["A gap can exist between stated ideals and who enjoys those rights", "The Declaration of Independence should be rejected as a legitimate founding document", "Civil disobedience is an illegitimate response to unjust laws", "The Constitution's amendment process is the only legitimate way to expand rights"],
    c: [0], e: "Douglass's central claim is that the nation has not extended its own professed ideals of liberty to all its people. He treats the Declaration as a legitimate standard rather than rejecting it, and the passage says nothing about civil disobedience or the amendment process.",
  },
  {
    id: "apgov-u1-035", unit: "U1", topic: "1.1 Ideals of Democracy", topicCode: "1.1", skill: "4", type: "s", stimulusGroupId: "apgov-g-douglass", stimulus: S_DOUGLASS,
    q: "Which best describes how Douglass uses the founding documents in his argument?",
    o: ["He treats the Declaration's principles as a standard the nation must still meet", "He argues the Declaration was never intended to apply to any American citizens", "He calls for a new constitutional convention to replace the founding documents", "He argues the Founders intentionally excluded ideals of liberty from the nation's founding"],
    c: [0], e: "Douglass calls the Declaration's principles \"saving\" and holds the nation to them, rather than dismissing the founding documents or claiming the Founders rejected liberty as an ideal.",
  },
  {
    id: "apgov-u1-036", unit: "U1", topic: "1.1 Ideals of Democracy", topicCode: "1.1", skill: "4", type: "s", stimulusGroupId: "apgov-g-douglass", stimulus: S_DOUGLASS,
    q: "A modern activist citing Douglass's speech to justify continued activism would most likely emphasize which theme?",
    o: ["Appeals to a nation's founding principles can be powerful tools for demanding change", "Protest is most effective when it avoids referencing constitutional language", "Civil rights progress requires abandoning appeals to the Declaration of Independence", "The passage shows that founding-era language has no relevance to later social movements"],
    c: [0], e: "Douglass's rhetorical strategy — holding the nation to its own stated principles — became a recurring model for later movements, the opposite of avoiding or abandoning founding-era language.",
  },
  {
    id: "apgov-u2-032", unit: "U2", topic: "2.6 Expansion of Presidential Power", topicCode: "2.6", skill: "4", type: "s", stimulusGroupId: "apgov-g-fdr-inaugural", stimulus: S_FDR_INAUGURAL,
    q: "Which best characterizes the argument Roosevelt makes in the excerpt?",
    o: ["The president should have broad emergency authority to act decisively during a crisis", "Congress alone should manage the national response to the Depression without executive involvement", "The federal government should defer entirely to state governments to address the crisis", "The Supreme Court should suspend judicial review during the emergency"],
    c: [0], e: "Roosevelt frames the Depression as comparable to a foreign invasion and asks for war-scale executive authority if Congress cannot act quickly enough. He does not propose excluding the executive, deferring to the states, or suspending judicial review.",
  },
  {
    id: "apgov-u2-033", unit: "U2", topic: "2.6 Expansion of Presidential Power", topicCode: "2.6", skill: "4", type: "s", stimulusGroupId: "apgov-g-fdr-inaugural", stimulus: S_FDR_INAUGURAL,
    q: "Roosevelt's framing of the emergency as comparable to a foreign invasion most directly illustrates which use of presidential rhetoric?",
    o: ["Using dramatic language to build public and congressional support for executive action", "Formally declaring war under authority the Constitution reserves to Congress", "Invoking the president's role as party leader to unify a divided Congress", "Asserting a constitutional power to suspend elections during emergencies"],
    c: [0], e: "The invasion comparison is rhetorical persuasion aimed at building support for emergency powers, not a formal war declaration, a party-leadership appeal, or a claim about suspending elections — none of which appear in the excerpt.",
  },
  {
    id: "apgov-u2-034", unit: "U2", topic: "2.6 Expansion of Presidential Power", topicCode: "2.6", skill: "4", type: "s", stimulusGroupId: "apgov-g-fdr-inaugural", stimulus: S_FDR_INAUGURAL,
    q: "Which constitutional safeguard would most directly limit the kind of broad emergency power Roosevelt described, if Congress declined to grant it?",
    o: ["Congress's control over which powers to delegate, and its ability to withhold them", "The Senate's power to remove a president by majority vote at any time", "A constitutional line-item veto letting Congress cancel individual executive actions", "The vice president's authority to overrule presidential emergency actions"],
    c: [0], e: "Roosevelt explicitly says he will ask Congress for the power, meaning Congress's choice to grant or withhold it is the operative check. Removal requires impeachment and conviction, not a simple majority vote; no constitutional line-item veto exists; and the vice president has no power to overrule the president.",
  },
  {
    id: "apgov-u5-027", unit: "U5", topic: "5.5 Third-Party Politics", topicCode: "5.5", skill: "4", type: "s", stimulusGroupId: "apgov-g-progressive1912", stimulus: S_PROGRESSIVE_1912,
    q: "Which of the following was a stated goal of the 1912 Progressive Party platform described in the passage?",
    o: ["Expanding direct citizen participation in candidate selection through primaries", "Repealing the constitutional amendment establishing a federal income tax", "Restricting voting rights to property-owning citizens", "Eliminating federal regulation of interstate corporations"],
    c: [0], e: "The platform called for direct primaries as one of several democratizing reforms. It supported women's suffrage rather than restricting the franchise, favored stronger — not weaker — regulation of trusts, and said nothing about repealing income tax.",
  },
  {
    id: "apgov-u5-028", unit: "U5", topic: "5.5 Third-Party Politics", topicCode: "5.5", skill: "4", type: "s", stimulusGroupId: "apgov-g-progressive1912", stimulus: S_PROGRESSIVE_1912,
    q: "The platform's positions, several of which were later enacted into law or the Constitution, best illustrate which function of third parties in the U.S. political system?",
    o: ["Raising policy issues that major parties eventually adopt once popular", "Winning the presidency outright by building majority coalitions across most states", "Serving as a permanent governing coalition partner in Congress", "Preventing any major-party candidate from being elected for multiple election cycles"],
    c: [0], e: "Third parties rarely win office themselves but can push issues onto the national agenda that major parties later absorb, exactly as described. The Progressive Party did not win the presidency, did not become a permanent congressional coalition partner, and a major-party candidate (Wilson) won in 1912 despite the split.",
  },
  {
    id: "apgov-u1-037", unit: "U1", topic: "1.7 Relationship Between the States and Federal Government", topicCode: "1.7", skill: "4", type: "s", stimulusGroupId: "apgov-g-visual-highway", stimulus: S_VISUAL_HIGHWAY,
    q: "The funding arrangement depicted is an example of which federal policy tool?",
    o: ["A categorical grant that ties federal funding to specific state compliance conditions", "A block grant that gives states broad discretion over how to spend the funds", "Revenue sharing that transfers funds with no policy strings attached", "An unfunded mandate that requires state action without any accompanying federal funding"],
    c: [0], e: "Money offered on the condition that the state meet specific, narrow requirements is the hallmark of a categorical grant. A block grant would leave the state broad discretion, revenue sharing carries no conditions, and an unfunded mandate provides no money at all — here funding is offered, just conditionally.",
  },
  {
    id: "apgov-u1-038", unit: "U1", topic: "1.7 Relationship Between the States and Federal Government", topicCode: "1.7", skill: "4", type: "s", stimulusGroupId: "apgov-g-visual-highway", stimulus: S_VISUAL_HIGHWAY,
    q: "A state legislature objects to the conditions shown, arguing Congress is coercing rather than encouraging compliance. Which factor would most strengthen that argument?",
    o: ["The funds withheld for noncompliance represent a very large share of the state's transportation budget", "The federal government offered the same conditions to every state equally", "The conditions relate to a legitimate national concern about highway safety", "States received advance notice before the conditions took effect"],
    c: [0], e: "Courts have treated the size of the financial threat relative to a state's budget as the key factor separating permissible inducement from unconstitutional coercion — a small percentage is encouragement, a large enough share becomes coercive. Equal treatment, a legitimate federal interest, and advance notice all support the arrangement's validity rather than undermining it.",
  },
  {
    id: "apgov-u4-023", unit: "U4", topic: "4.2 Political Socialization", topicCode: "4.2", skill: "4", type: "s", stimulusGroupId: "apgov-g-visual-socialization", stimulus: S_VISUAL_SOCIALIZATION,
    q: "The four influences shown converging on the young adult best illustrate which concept?",
    o: ["Political socialization, the process by which people acquire their political attitudes and values", "Political efficacy, the belief that one's own participation matters", "Selective exposure, the tendency to seek out information that confirms existing views", "Political polarization, the growing ideological distance between the two major parties"],
    c: [0], e: "Family, school, media, and peer groups are the classic agents through which people acquire political attitudes over time — the definition of political socialization. Efficacy, selective exposure, and polarization describe different phenomena not depicted here.",
  },
  {
    id: "apgov-u4-024", unit: "U4", topic: "4.2 Political Socialization", topicCode: "4.2", skill: "4", type: "s", stimulusGroupId: "apgov-g-visual-socialization", stimulus: S_VISUAL_SOCIALIZATION,
    q: "Research on political socialization has generally found which of the sources shown to be the strongest predictor of a young adult's initial party identification?",
    o: ["Family, because early political cues from parents tend to be an especially durable influence", "Evening news broadcasts, because they reach the largest audience of any source shown", "College friend groups, because peers are trusted more than institutional sources", "School civics classes, because they introduce formal political theory"],
    c: [0], e: "Family remains the most consistently documented early influence on party identification in political socialization research, often persisting well into adulthood. Media, peers, and formal schooling all matter but are typically found to be weaker predictors of initial party attachment.",
  },
  {
    id: "apgov-u2-035", unit: "U2", topic: "2.14 Holding the Bureaucracy Accountable", topicCode: "2.14", skill: "4", type: "s", stimulusGroupId: "apgov-g-visual-triangle", stimulus: S_VISUAL_TRIANGLE,
    q: "The closed, mutually reinforcing relationship depicted best illustrates which concept?",
    o: ["An iron triangle, a stable alliance among a congressional committee, an agency, and an interest group", "Divided government, in which different parties control the presidency and Congress", "Judicial review, in which courts assess whether a law is constitutional", "Devolution, in which the federal government transfers program authority to the states"],
    c: [0], e: "A recurring, self-reinforcing exchange of favors among a committee, an agency, and an organized group is the textbook description of an iron triangle. Divided government, judicial review, and devolution describe unrelated institutional relationships.",
  },
  {
    id: "apgov-u2-036", unit: "U2", topic: "2.14 Holding the Bureaucracy Accountable", topicCode: "2.14", skill: "4", type: "s", stimulusGroupId: "apgov-g-visual-triangle", stimulus: S_VISUAL_TRIANGLE,
    q: "Which development would most directly disrupt the stability of the relationship shown?",
    o: ["A committee reassignment that removes the agency and trade association's key congressional allies", "An increase in the agency's annual budget request", "A different interest group forming an alliance in an unrelated policy area", "The agency publishing its routine annual report to Congress"],
    c: [0], e: "Because the relationship depends on specific, durable relationships among a particular committee, agency, and group, losing the friendly committee members most directly breaks the cycle. A routine budget request, an unrelated group's separate alliance, and a routine report do not disturb this particular relationship.",
  },
  {
    id: "apgov-u1-039", unit: "U1", topic: "1.4 Challenges of the Articles of Confederation", topicCode: "1.4", skill: "1", type: "s", stimulusGroupId: null,
    q: "Under the Articles of Confederation, amending the document required the unanimous consent of all thirteen state legislatures. Which outcome most directly resulted from this requirement?",
    o: ["Structural reforms addressing the national government's weaknesses were effectively impossible to enact", "State legislatures rarely exercised their veto power over proposed amendments", "The national government could bypass the amendment process through executive action", "Congress used the process to pass several major structural reforms during the 1780s"],
    c: [0], e: "Requiring all thirteen states to agree gave any single state an effective veto, which is why the Confederation Congress could never secure the reforms it needed. There was no national executive to bypass the process, and in practice the unanimity rule blocked structural change rather than enabling it.",
  },
  {
    id: "apgov-u1-040", unit: "U1", topic: "1.6 Principles of American Government", topicCode: "1.6", skill: "1", type: "s", stimulusGroupId: null,
    q: "A state constitution declares that all governmental power ultimately derives from the consent of the governed, expressed through elections and ratification votes. This provision most directly reflects which constitutional principle?",
    o: ["Popular sovereignty", "Federalism", "Judicial review", "Enumerated powers"],
    c: [0], e: "Popular sovereignty holds that government's authority comes from the people's consent, exactly what the provision describes. Federalism concerns the division of power between national and state governments, judicial review concerns courts assessing constitutionality, and enumerated powers concerns which specific powers Congress holds.",
  },
  {
    id: "apgov-u1-041", unit: "U1", topic: "1.3 Government Power and Individual Rights: enumerated vs. reserved powers", topicCode: "1.3", skill: "1", type: "s", stimulusGroupId: null, variantGroupId: "vg-u1-enumerated-reserved",
    q: "Congress passes a statute regulating the interest rates that national banks may charge across state lines. A challenge to this law would most likely fail because the power to regulate interstate commerce is",
    o: ["an enumerated power explicitly granted to Congress in Article I", "a reserved power retained by the states under the Tenth Amendment", "an implied power derived solely from the president's executive authority", "a concurrent power shared equally between Congress and state courts"],
    c: [0], e: "Article I, Section 8 explicitly grants Congress the power to regulate interstate commerce, making this an enumerated rather than reserved, executive, or judicial power.",
  },
  {
    id: "apgov-u1-042", unit: "U1", topic: "1.3 Government Power and Individual Rights: enumerated vs. reserved powers", topicCode: "1.3", skill: "1", type: "s", stimulusGroupId: null, variantGroupId: "vg-u1-enumerated-reserved",
    q: "A state legislature enacts a law setting curriculum standards for public elementary schools. This exercise of authority is best explained by which constitutional principle?",
    o: ["Education is a reserved power retained by the states under the Tenth Amendment", "Education is an enumerated power granted to Congress under Article I", "Education is a power delegated exclusively to the executive branch", "Education is a power the Constitution assigns jointly to Congress and the president"],
    c: [0], e: "Because education is not among Congress's enumerated powers, the Tenth Amendment reserves it to the states — the same reserved-versus-enumerated distinction tested from the opposite direction.",
  },
  {
    id: "apgov-u1-043", unit: "U1", topic: "1.8 Constitutional Interpretations of Federalism", topicCode: "1.8", skill: "1", type: "s", stimulusGroupId: null,
    q: "A member of Congress argues that the necessary and proper clause justifies a broad range of federal legislation beyond Congress's specifically enumerated powers. Which historical development most directly supports this reading?",
    o: ["The expansive interpretation of federal authority that followed the Supreme Court's ruling in McCulloch v. Maryland", "The strict construction of federal power associated with the Articles of Confederation", "The Tenth Amendment's explicit reservation of undelegated powers to the states", "The nullification doctrine asserted by South Carolina in the 1830s"],
    c: [0], e: "McCulloch v. Maryland (1819) read the necessary and proper clause broadly, supplying the doctrinal basis for expansive federal legislation. The Articles reflected weak central power, the Tenth Amendment supports the opposite (states'-rights) reading, and nullification asserted states could void federal law.",
  },
  {
    id: "apgov-u2-037", unit: "U2", topic: "2.4 Roles and Powers of the President", topicCode: "2.4", skill: "1", type: "s", stimulusGroupId: null,
    q: "Which of the following is an example of the president exercising a formal constitutional power rather than an informal power derived from the office?",
    o: ["Vetoing a bill passed by both chambers of Congress", "Using a prime-time address to build public support for a policy", "Issuing a signing statement interpreting how a new law will be enforced", "Negotiating privately with committee chairs to shape a bill before passage"],
    c: [0], e: "The veto is an enumerated power in Article I, Section 7. Prime-time appeals, signing statements, and informal bargaining are classic informal tools presidents use to extend influence beyond their enumerated powers.",
  },
  {
    id: "apgov-u2-038", unit: "U2", topic: "2.5 Checks on the President", topicCode: "2.5", skill: "1", type: "s", stimulusGroupId: null,
    q: "Which scenario best illustrates a legislative check on presidential power?",
    o: ["The Senate refuses to confirm a president's nominee for a cabinet secretary position", "A federal appeals court blocks enforcement of an executive order", "A state governor declines to enforce a federal executive order", "The president's own party loses seats in a midterm election"],
    c: [0], e: "Senate confirmation is a formal legislative check under Article II. A court blocking an order is a judicial check, a governor's noncompliance is a federalism conflict rather than a formal check, and midterm losses are an electoral consequence, not a constitutional check.",
  },
  {
    id: "apgov-u2-039", unit: "U2", topic: "2.8 The Judicial Branch", topicCode: "2.8", skill: "2", type: "s", stimulusGroupId: null, variantGroupId: "vg-u2-marbury-judicial-review",
    q: "Which power did the Supreme Court establish for itself in Marbury v. Madison (1803)?",
    o: ["The authority to declare an act of Congress unconstitutional", "The authority to initiate legislation on constitutional matters", "The authority to remove a sitting president from office", "The authority to appoint federal judges without Senate confirmation"],
    c: [0], e: "Marbury established judicial review — the Court's power to strike down a federal statute that conflicts with the Constitution. The Court cannot initiate legislation, remove a president, or bypass Senate confirmation of judges.",
  },
  {
    id: "apgov-u2-040", unit: "U2", topic: "2.10 The Court in Action", topicCode: "2.10", skill: "1", type: "s", stimulusGroupId: null,
    q: "Before the Supreme Court will hear a case, a plaintiff generally must demonstrate \"standing.\" Which requirement does this best describe?",
    o: ["The plaintiff must show a concrete, personal injury caused by the challenged action", "The plaintiff must first win a majority vote in a state referendum", "The plaintiff must obtain the consent of the losing party in a lower court", "The plaintiff must be a licensed attorney representing themselves"],
    c: [0], e: "Standing requires a concrete, particularized injury traceable to the challenged action. No referendum, opposing party's consent, or attorney licensure is required to bring a case.",
  },
  {
    id: "apgov-u2-041", unit: "U2", topic: "2.11 Checks on the Judicial Branch", topicCode: "2.11", skill: "1", type: "s", stimulusGroupId: null,
    q: "Which of the following is a constitutional check that Congress holds over the federal judiciary?",
    o: ["The Senate's power to confirm or reject a president's judicial nominees", "The authority to overturn a Supreme Court ruling by a simple majority vote in the House", "The authority to directly rewrite the text of a Supreme Court opinion", "The power to remove individual justices through a presidential veto"],
    c: [0], e: "Senate confirmation is Congress's clearest formal check on the judiciary. Congress cannot overturn a ruling by ordinary vote, rewrite an opinion's text, and removal requires impeachment and conviction, not a presidential veto.",
  },
  {
    id: "apgov-u2-042", unit: "U2", topic: "2.13 Discretionary and Rulemaking Authority", topicCode: "2.13", skill: "1", type: "s", stimulusGroupId: null, variantGroupId: "vg-u2-bureaucratic-discretion",
    q: "Congress passes a broad environmental statute directing \"the responsible agency\" to set air quality standards \"as needed to protect public health,\" without specifying exact numeric limits. This delegation of authority is an example of",
    o: ["Bureaucratic discretion, in which an agency fills in the specific details Congress left unresolved", "Judicial review, in which courts determine the precise numeric standards", "Devolution, in which states set their own air quality standards instead", "Impoundment, in which the executive refuses to spend appropriated funds"],
    c: [0], e: "Vague statutory language forces the implementing agency to exercise discretion in setting specific standards — the defining feature of bureaucratic rulemaking authority, not a judicial, devolutionary, or impoundment action.",
  },
  {
    id: "apgov-u2-043", unit: "U2", topic: "2.13 Discretionary and Rulemaking Authority", topicCode: "2.13", skill: "1", type: "s", stimulusGroupId: null, variantGroupId: "vg-u2-bureaucratic-discretion",
    q: "A federal transportation agency, authorized by a broadly worded statute, issues detailed regulations specifying exact seatbelt design requirements for new vehicles. This action illustrates",
    o: ["Bureaucratic discretion, in which an agency exercises delegated authority to make detailed policy choices", "Executive privilege, in which the agency withholds information from Congress", "Senatorial courtesy, in which senators influence agency staffing decisions", "A pocket veto, in which the agency prevents a bill from becoming law"],
    c: [0], e: "Turning a broad statutory directive into specific technical requirements is bureaucratic discretion in action — a different scenario testing the same rulemaking concept from a different angle.",
  },
  {
    id: "apgov-u3-026", unit: "U3", topic: "3.8 Amendments: Due Process and the Rights of the Accused", topicCode: "3.8", skill: "2", type: "s", stimulusGroupId: null, variantGroupId: "vg-u3-due-process-accused",
    q: "In Gideon v. Wainwright (1963), the Supreme Court held that state courts must provide free legal counsel to felony defendants who cannot afford an attorney. This ruling most directly extended which constitutional guarantee to defendants in state courts?",
    o: ["The Sixth Amendment right to counsel", "The Fourth Amendment protection against unreasonable searches", "The Fifth Amendment protection against self-incrimination", "The Eighth Amendment protection against cruel and unusual punishment"],
    c: [0], e: "Gideon incorporated the Sixth Amendment right to counsel against the states. It did not concern search-and-seizure, self-incrimination, or cruel-and-unusual-punishment protections.",
  },
  {
    id: "apgov-u3-027", unit: "U3", topic: "3.8 Amendments: Due Process and the Rights of the Accused", topicCode: "3.8", skill: "2", type: "s", stimulusGroupId: null, variantGroupId: "vg-u3-due-process-accused",
    q: "A state defendant who could not afford an attorney was convicted without legal representation before Gideon v. Wainwright (1963). Which change did the ruling require going forward?",
    o: ["State courts must appoint and fund defense counsel for indigent felony defendants", "State courts must allow defendants to represent themselves in all cases", "State courts must dismiss any case in which a defendant cannot afford private counsel", "State courts must transfer indigent defendants' cases to federal court"],
    c: [0], e: "Gideon requires states to appoint and fund counsel for indigent felony defendants rather than dismissing cases, forcing self-representation, or shifting cases to federal court.",
  },
  {
    id: "apgov-u3-028", unit: "U3", topic: "3.4 First Amendment: Freedom of the Press", topicCode: "3.4", skill: "1", type: "s", stimulusGroupId: null,
    q: "A newspaper publishes a story based on leaked government documents revealing questionable but not classified-for-security-reasons policy decisions. The government seeks a court order to stop publication before it happens. This kind of request is known as",
    o: ["Prior restraint, which courts view with a strong presumption against its constitutionality", "Selective incorporation, which extends Bill of Rights protections to the states", "Symbolic speech, which protects nonverbal expressive conduct", "Defamation, which allows a private lawsuit after publication has already occurred"],
    c: [0], e: "Government action blocking publication before it happens is prior restraint, which courts strongly disfavor. The other terms describe unrelated doctrines: incorporation, nonverbal expression, and after-the-fact defamation suits.",
  },
  {
    id: "apgov-u3-029", unit: "U3", topic: "3.5 Second Amendment: Rights to Bear Arms", topicCode: "3.5", skill: "2", type: "s", stimulusGroupId: null, variantGroupId: "vg-u3-second-amendment-incorporation",
    q: "Which best describes the holding of McDonald v. Chicago (2010)?",
    o: ["The Second Amendment right to bear arms for self-defense applies to state and local governments through the Fourteenth Amendment", "State governments may ban all private ownership of firearms within city limits", "The Second Amendment applies only to militia service, not individual self-defense", "Congress may regulate firearms only within federal territories, not the states"],
    c: [0], e: "McDonald incorporated the Second Amendment against the states via the Fourteenth Amendment. It did not uphold a total ban, restrict the right to militia service, or limit federal regulation to territories.",
  },
  {
    id: "apgov-u4-025", unit: "U4", topic: "4.3 Changes in Ideology", topicCode: "4.3", skill: "1", type: "s", stimulusGroupId: null, variantGroupId: "vg-u4-life-events-ideology",
    q: "A voter's political ideology shifts significantly after experiencing a major recession and losing their job. This shift is best explained by which influence on ideology?",
    o: ["Life-cycle and personal economic experiences reshaping political attitudes", "Political socialization occurring primarily through childhood family influence", "Selective exposure to media that confirms preexisting views", "Elite cues from party leaders instructing voters how to feel"],
    c: [0], e: "A major personal economic event reshaping political views is a life-cycle effect, distinct from childhood socialization, selective media exposure, or simply following party elites.",
  },
  {
    id: "apgov-u4-026", unit: "U4", topic: "4.5 Measuring Public Opinion", topicCode: "4.5", skill: "1", type: "s", stimulusGroupId: null, variantGroupId: "vg-u4-margin-of-error",
    q: "A poll reports that 52% of respondents support a policy, with a margin of error of plus or minus 4 percentage points. Which conclusion is most justified by this result?",
    o: ["The true level of support in the full population is plausibly anywhere between about 48% and 56%", "Exactly 52% of the entire population supports the policy", "The poll is invalid because the margin of error exceeds zero", "A majority of the population is certain to oppose the policy"],
    c: [0], e: "A margin of error defines a plausible range around the reported figure, not an exact population value. Every sample-based poll has some nonzero margin of error, and 52% with a 4-point margin does not establish certain majority opposition.",
  },
  {
    id: "apgov-u4-027", unit: "U4", topic: "4.10 Ideology and Social Policy", topicCode: "4.10", skill: "1", type: "s", stimulusGroupId: null,
    q: "A policymaker who identifies as ideologically conservative on social issues would be most likely to support which policy position?",
    o: ["Greater local and parental control over public school curriculum decisions", "Expanded federal regulation of school curriculum content nationwide", "A significant increase in federal funding for social welfare programs", "New federal mandates standardizing school policy across all states"],
    c: [0], e: "Social conservatism typically favors local and parental control over centralized federal mandates, the opposite of the other three options, which each expand federal or centralized authority.",
  },
  {
    id: "apgov-u5-030", unit: "U5", topic: "5.8 Electing a President", topicCode: "5.8", skill: "1", type: "s", stimulusGroupId: null, variantGroupId: "vg-u5-electoral-college",
    q: "A presidential candidate wins the national popular vote but loses the election. Which feature of the U.S. electoral system best explains how this outcome is possible?",
    o: ["The Electoral College awards all of a state's electoral votes to the popular-vote winner in most states, regardless of the national vote total", "Congress may override the popular vote if national security is at stake", "The Supreme Court automatically reviews and can reverse close presidential elections", "State governors may appoint electors of their own choosing regardless of the vote"],
    c: [0], e: "Winner-take-all state allocation means a candidate can amass electoral votes efficiently while losing the national popular tally. No emergency override, automatic Court review, or unrestricted gubernatorial elector power exists.",
  },
  {
    id: "apgov-u5-031", unit: "U5", topic: "5.8 Electing a President", topicCode: "5.8", skill: "1", type: "s", stimulusGroupId: null, variantGroupId: "vg-u5-electoral-college",
    q: "A presidential candidate concentrates campaign resources on a small number of closely divided states rather than campaigning nationally. Which feature of the presidential election system most directly explains this strategy?",
    o: ["Winner-take-all allocation of electoral votes makes narrowly divided states disproportionately decisive", "Federal law requires candidates to visit every state an equal number of times", "The national popular vote total has no bearing on determining the winner", "Party primaries are held simultaneously with the general election in swing states"],
    c: [0], e: "Because a state's full electoral-vote bloc typically goes to whoever wins it narrowly, competitive states offer the highest return on campaign resources — the same structural feature tested from a strategic angle.",
  },
  {
    id: "apgov-u5-032", unit: "U5", topic: "5.4 How and Why Political Parties Change and Adapt", topicCode: "5.4", skill: "1", type: "s", stimulusGroupId: null,
    q: "A major political party gradually shifts its platform on an issue after a significant, sustained increase in public support for the opposing position. This best illustrates which dynamic of party behavior?",
    o: ["Parties adapt their platforms over time to remain competitive with shifting public opinion", "Parties are constitutionally required to update platforms every four years", "Party platforms are legally binding on all of a party's elected officials", "Party positions are set permanently by the party's founding documents"],
    c: [0], e: "Parties are office-seeking coalitions that adjust positions to stay competitive as opinion shifts; platforms are not constitutionally mandated, legally binding, or permanently fixed.",
  },
  {
    id: "apgov-u5-033", unit: "U5", topic: "5.6 Interest Groups Influencing Policymaking", topicCode: "5.6", skill: "1", type: "s", stimulusGroupId: null,
    q: "An interest group funds detailed research reports and provides technical briefings to congressional staff on a complex regulatory issue. Which function of interest groups does this best illustrate?",
    o: ["Supplying specialized information that helps time-constrained legislators evaluate complex policy", "Nominating candidates to run in a political party's primary election", "Certifying the results of a congressional election", "Administering the enforcement of a federal regulation"],
    c: [0], e: "Providing expertise and research to legislators is a core interest-group function. Nominating candidates is a party function, certifying elections is an official government function, and enforcing regulation is an agency function.",
  },
  {
    id: "apgov-u5-034", unit: "U5", topic: "5.10 Modern Campaigns", topicCode: "5.10", skill: "1", type: "s", stimulusGroupId: null,
    q: "A modern campaign increasingly relies on data analytics to target individual voters with tailored digital advertising rather than broad television buys. Which trend in campaign strategy does this best illustrate?",
    o: ["A shift toward microtargeting voters using detailed data about their preferences and behavior", "A return to exclusively door-to-door canvassing as the primary outreach method", "A legal requirement that all campaign ads appear only on broadcast television", "A decline in the total amount of money spent on political campaigns"],
    c: [0], e: "Using voter data to deliver individually tailored messages is microtargeting, a defining feature of modern digital campaigns — not a return to door-to-door-only outreach, a broadcast-only mandate, or reduced spending.",
  },
  {
    id: "apgov-u5-029", unit: "U5", topic: "5.5 Third-Party Politics", topicCode: "5.5", skill: "4", type: "s", stimulusGroupId: "apgov-g-progressive1912", stimulus: S_PROGRESSIVE_1912,
    q: "Which structural feature of U.S. elections most directly explains why the Progressive Party, despite significant public support in 1912, could not translate that support into lasting institutional power?",
    o: ["A winner-take-all, single-member-district electoral system that disadvantages parties without regionally concentrated support", "A constitutional requirement that only two parties may appear on a presidential ballot", "A federal law banning third-party candidates from qualifying for the Electoral College", "A Supreme Court ruling upholding a nationwide ban on third-party campaign spending"],
    c: [0], e: "Winner-take-all, single-member-district rules make it structurally difficult for any party without concentrated regional strength to convert vote share into won seats or electoral votes. No constitutional or federal rule bars third parties from ballots, the Electoral College, or campaign spending.",
  },
];

// Centralized CED metadata keeps the learner-facing topic labels and the audit
// codes tied to the effective Fall 2026 framework instead of to older numbering.
const APGOV_TOPIC_NAMES = {
  "1.1": "Ideals of Democracy", "1.2": "Types of Democracy", "1.3": "Government Power and Individual Rights", "1.4": "Challenges of the Articles of Confederation", "1.5": "Ratification of the U.S. Constitution", "1.6": "Principles of American Government", "1.7": "Relationship Between the States and Federal Government", "1.8": "Constitutional Interpretations of Federalism", "1.9": "Federalism in Action",
  "2.1": "Congress: The Senate and the House of Representatives", "2.2": "Structures, Powers, and Functions of Congress", "2.3": "Congressional Behavior", "2.4": "Roles and Powers of the President", "2.5": "Checks on the President", "2.6": "Expansion of Presidential Power", "2.7": "Presidential Communication", "2.8": "The Judicial Branch", "2.9": "The Role of the Judicial Branch", "2.10": "The Court in Action", "2.11": "Checks on the Judicial Branch", "2.12": "The Bureaucracy", "2.13": "Discretionary and Rulemaking Authority", "2.14": "Holding the Bureaucracy Accountable", "2.15": "Policy and the Branches of Government",
  "3.1": "The Bill of Rights", "3.2": "First Amendment: Freedom of Religion", "3.3": "First Amendment: Freedom of Speech", "3.4": "First Amendment: Freedom of the Press", "3.5": "Second Amendment: Rights to Bear Arms", "3.6": "Amendments: Balancing Individual Freedom with Public Order and Safety", "3.7": "Selective Incorporation", "3.8": "Amendments: Due Process and the Rights of the Accused", "3.9": "Amendments: Due Process and the Right to Privacy", "3.10": "Social Movements and Equal Protection", "3.11": "Government Responses to Social Movements", "3.12": "Balancing Minority and Majority Rights", "3.13": "Affirmative Action",
  "4.1": "American Attitudes About Government and Politics", "4.2": "Political Socialization", "4.3": "Changes in Ideology", "4.4": "Influence of Political Events on Ideology", "4.5": "Measuring Public Opinion", "4.6": "Evaluating Public Opinion Data", "4.7": "Ideologies of Political Parties", "4.8": "Ideology and Policymaking", "4.9": "Ideology and Economic Policy", "4.10": "Ideology and Social Policy",
  "5.1": "Voting Rights and Models of Voting Behavior", "5.2": "Voter Turnout", "5.3": "Political Parties", "5.4": "How and Why Political Parties Change and Adapt", "5.5": "Third-Party Politics", "5.6": "Interest Groups Influencing Policymaking", "5.7": "Groups Influencing Policy Outcomes", "5.8": "Electing a President", "5.9": "Congressional Elections", "5.10": "Modern Campaigns", "5.11": "Campaign Finance", "5.12": "The Media", "5.13": "Changing Media",
};

const APGOV_METADATA = [
  ["1.1", "1", ["apgov-u1-001", "apgov-u1-024", "apgov-u1-025"]], ["1.1", "4", ["apgov-u1-030"]],
  ["1.2", "1", ["apgov-u1-002", "apgov-u1-003"]],
  ["1.2", "4", ["apgov-u1-016", "apgov-u1-017", "apgov-u1-018"]],
  ["1.3", "1", ["apgov-u1-006"]], ["1.3", "4", ["apgov-u1-019", "apgov-u1-020"]],
  ["1.4", "1", ["apgov-u1-004"]],
  ["1.5", "1", ["apgov-u1-005", "apgov-u1-015"]], ["1.5", "4", ["apgov-u1-021"]],
  ["1.6", "1", ["apgov-u1-014"]],
  ["1.7", "1", ["apgov-u1-007", "apgov-u1-012"]], ["1.7", "4", ["apgov-u1-022", "apgov-u1-023", "apgov-u1-029"]],
  ["1.8", "2", ["apgov-u1-008", "apgov-u1-009"]],
  ["1.9", "1", ["apgov-u1-010", "apgov-u1-011", "apgov-u1-013"]], ["1.9", "3", ["apgov-u1-026", "apgov-u1-027", "apgov-u1-028"]],
  ["2.1", "1", ["apgov-u2-001"]], ["2.2", "1", ["apgov-u2-003", "apgov-u2-004", "apgov-u2-005"]],
  ["2.1", "3", ["apgov-u2-022", "apgov-u2-023"]], ["2.3", "1", ["apgov-u2-002", "apgov-u2-006"]],
  ["2.4", "1", ["apgov-u2-007"]], ["2.5", "1", ["apgov-u2-009"]], ["2.6", "1", ["apgov-u2-008"]],
  ["2.6", "4", ["apgov-u2-016", "apgov-u2-017", "apgov-u2-028"]], ["2.7", "4", ["apgov-u2-024", "apgov-u2-025"]],
  ["2.8", "2", ["apgov-u2-021"]], ["2.8", "4", ["apgov-u2-018", "apgov-u2-019", "apgov-u2-020"]],
  ["2.9", "1", ["apgov-u2-014"]], ["2.10", "1", ["apgov-u2-013"]],
  ["2.11", "1", ["apgov-u2-026"]], ["2.12", "1", ["apgov-u2-027"]],
  ["2.13", "1", ["apgov-u2-010"]], ["2.14", "1", ["apgov-u2-011", "apgov-u2-012"]], ["2.15", "1", ["apgov-u2-015"]],
  ["3.1", "1", ["apgov-u3-021"]],
  ["3.2", "2", ["apgov-u3-002", "apgov-u3-003"]], ["3.3", "2", ["apgov-u3-004"]],
  ["3.4", "2", ["apgov-u3-006"]], ["3.5", "2", ["apgov-u3-008"]], ["3.6", "2", ["apgov-u3-005"]], ["3.7", "1", ["apgov-u3-001"]],
  ["3.8", "2", ["apgov-u3-007"]], ["3.9", "2", ["apgov-u3-011"]], ["3.10", "2", ["apgov-u3-009"]],
  ["3.11", "1", ["apgov-u3-010", "apgov-u3-013"]], ["3.11", "4", ["apgov-u3-014", "apgov-u3-015", "apgov-u3-016"]],
  ["3.12", "2", ["apgov-u3-012"]], ["3.12", "4", ["apgov-u3-017", "apgov-u3-018", "apgov-u3-022"]], ["3.13", "4", ["apgov-u3-019", "apgov-u3-020"]],
  ["4.1", "1", ["apgov-u4-002"]], ["4.1", "4", ["apgov-u4-010", "apgov-u4-011"]], ["4.2", "1", ["apgov-u4-001"]],
  ["4.3", "1", ["apgov-u4-018"]], ["4.4", "3", ["apgov-u4-015", "apgov-u4-016"]], ["4.5", "1", ["apgov-u4-005"]], ["4.6", "1", ["apgov-u4-006"]], ["4.6", "3", ["apgov-u4-017"]],
  ["4.7", "1", ["apgov-u4-003", "apgov-u4-004"]], ["4.8", "1", ["apgov-u4-007", "apgov-u4-008", "apgov-u4-009"]],
  ["4.9", "1", ["apgov-u4-012", "apgov-u4-013", "apgov-u4-014"]], ["4.9", "4", ["apgov-u4-020"]], ["4.10", "1", ["apgov-u4-019"]],
  ["5.1", "1", ["apgov-u5-001", "apgov-u5-002", "apgov-u5-003", "apgov-u5-020"]],
  ["5.2", "1", ["apgov-u5-004", "apgov-u5-005", "apgov-u5-013"]], ["5.2", "3", ["apgov-u5-014", "apgov-u5-015"]],
  ["5.3", "1", ["apgov-u5-007", "apgov-u5-012"]], ["5.4", "1", ["apgov-u5-021"]], ["5.5", "1", ["apgov-u5-008", "apgov-u5-022"]],
  ["5.6", "1", ["apgov-u5-009"]], ["5.7", "1", ["apgov-u5-026"]], ["5.8", "1", ["apgov-u5-006"]], ["5.9", "1", ["apgov-u5-023"]],
  ["5.10", "1", ["apgov-u5-024"]], ["5.11", "2", ["apgov-u5-010"]], ["5.11", "3", ["apgov-u5-016", "apgov-u5-017"]],
  ["5.12", "1", ["apgov-u5-011"]], ["5.12", "4", ["apgov-u5-018"]], ["5.13", "1", ["apgov-u5-025"]], ["5.13", "4", ["apgov-u5-019"]],
  ["3.6", "3", ["apgov-u3-023", "apgov-u3-024", "apgov-u3-025"]],
  ["1.9", "3", ["apgov-u1-031", "apgov-u1-032", "apgov-u1-033"]],
  ["2.6", "3", ["apgov-u2-029", "apgov-u2-030", "apgov-u2-031"]],
  ["4.6", "3", ["apgov-u4-021", "apgov-u4-022"]],
  ["1.1", "4", ["apgov-u1-034", "apgov-u1-035", "apgov-u1-036"]],
  ["2.6", "4", ["apgov-u2-032", "apgov-u2-033", "apgov-u2-034"]],
  ["5.5", "4", ["apgov-u5-027", "apgov-u5-028", "apgov-u5-029"]],
  ["1.7", "4", ["apgov-u1-037", "apgov-u1-038"]],
  ["4.2", "4", ["apgov-u4-023", "apgov-u4-024"]],
  ["2.14", "4", ["apgov-u2-035", "apgov-u2-036"]],
  ["1.4", "1", ["apgov-u1-039"]], ["1.6", "1", ["apgov-u1-040"]],
  ["1.3", "1", ["apgov-u1-041", "apgov-u1-042"]], ["1.8", "1", ["apgov-u1-043"]],
  ["2.4", "1", ["apgov-u2-037"]], ["2.5", "1", ["apgov-u2-038"]], ["2.8", "2", ["apgov-u2-039"]],
  ["2.10", "1", ["apgov-u2-040"]], ["2.11", "1", ["apgov-u2-041"]], ["2.13", "1", ["apgov-u2-042", "apgov-u2-043"]],
  ["3.8", "2", ["apgov-u3-026", "apgov-u3-027"]], ["3.4", "1", ["apgov-u3-028"]], ["3.5", "2", ["apgov-u3-029"]],
  ["4.3", "1", ["apgov-u4-025"]], ["4.6", "1", ["apgov-u4-026"]], ["4.10", "1", ["apgov-u4-027"]],
  ["5.8", "1", ["apgov-u5-030", "apgov-u5-031"]], ["5.4", "1", ["apgov-u5-032"]],
  ["5.6", "1", ["apgov-u5-033"]], ["5.10", "1", ["apgov-u5-034"]],
];

const APGOV_BY_ID = new Map(window.QUESTIONS_AP_US_GOVERNMENT.map((question) => [question.id, question]));
APGOV_METADATA.forEach(([topicCode, skill, ids]) => ids.forEach((id) => {
  const question = APGOV_BY_ID.get(id);
  if (question) {
    question.topicCode = topicCode;
    question.topic = `${topicCode} ${APGOV_TOPIC_NAMES[topicCode]}`;
    question.skill = skill;
  }
}));

// Normalize source-key positions independently of content. Runtime options are
// shuffled again for each attempt, but balanced source order also keeps exports,
// previews, and future delivery paths from inheriting an answer-letter tell.
window.QUESTIONS_AP_US_GOVERNMENT.forEach((question, index) => {
  const target = index % 4;
  const current = question.c[0];
  if (current !== target) {
    [question.o[current], question.o[target]] = [question.o[target], question.o[current]];
    question.c = [target];
  }
});

