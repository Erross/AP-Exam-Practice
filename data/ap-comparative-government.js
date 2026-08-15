// AP Comparative Government and Politics — original Section I practice bank.
// Built against the College Board CED effective Fall 2026.
(() => {
  "use strict";
  const countries = ["China", "Iran", "Mexico", "Nigeria", "Russia", "United Kingdom"];
  const topics = [
    ["1.1","U1","The Practice of Political Scientists","Political scientists distinguish empirical claims from normative claims and use comparative evidence to test explanations.","Mexico","United Kingdom"],
    ["1.2","U1","Defining Political Organizations","A state claims sovereignty over a territory and population, while a government is the set of institutions currently exercising state authority.","Nigeria","United Kingdom"],
    ["1.3","U1","Democracy vs. Authoritarianism","Democratic regimes rely on meaningful political competition and participation, whereas authoritarian regimes substantially restrict them.","United Kingdom","China"],
    ["1.4","U1","Democratization","Democratization involves movement toward more competitive elections, civil liberties, rule of law, and meaningful citizen influence.","Mexico","Russia"],
    ["1.5","U1","Sources of Power and Authority","Political authority may rest on elections, constitutions, ideology, religion, tradition, coercion, or combinations of these sources.","Iran","United Kingdom"],
    ["1.6","U1","Change in Power and Authority","Political leadership can change through elections, succession, appointments, revolutions, or coups, with different implications for legitimacy.","Nigeria","United Kingdom"],
    ["1.7","U1","Federal and Unitary Systems","Federal systems constitutionally divide authority across levels of government, while unitary systems place ultimate authority in the central government.","Nigeria","United Kingdom"],
    ["1.8","U1","Political Legitimacy","Legitimacy is strengthened when citizens accept the state's right to rule, often because of elections, performance, nationalism, ideology, or tradition.","China","Mexico"],
    ["1.9","U1","Sustaining Legitimacy","Regimes sustain legitimacy through policy performance, institutions, elections, ideology, nationalism, and responsiveness, though the mix varies by country.","China","United Kingdom"],
    ["1.10","U1","Political Stability","Political stability is affected by legitimacy, economic performance, institutional capacity, social cleavages, elite conflict, and internal or external shocks.","Russia","Nigeria"],

    ["2.1","U2","Parliamentary, Presidential, and Semi-Presidential Systems","Parliamentary systems fuse executive and legislative authority, presidential systems separately elect executives and legislatures, and semi-presidential systems divide executive roles.","United Kingdom","Mexico"],
    ["2.2","U2","Comparing Parliamentary, Presidential, and Semi-Presidential Systems","Different executive-legislative arrangements change accountability, coalition incentives, policymaking, and the likelihood of divided authority.","United Kingdom","Russia"],
    ["2.3","U2","Executive Systems","Executives differ in selection, formal powers, cabinet relationships, decree authority, and control over the bureaucracy.","Russia","United Kingdom"],
    ["2.4","U2","Executive Term Limits","Term limits can constrain personal rule and promote turnover, while their absence or weakening can facilitate executive entrenchment.","Mexico","Russia"],
    ["2.5","U2","Removal of Executives","Executives may leave office through elections, votes of no confidence, impeachment, resignation, succession, or other constitutional mechanisms.","United Kingdom","Nigeria"],
    ["2.6","U2","Legislative Systems","Legislatures vary in chamber structure, electoral connection, policymaking authority, representation, and independence from the executive.","Nigeria","China"],
    ["2.7","U2","Independent Legislatures","An independent legislature can constrain executives through lawmaking, oversight, budgets, questioning, confirmation, or removal mechanisms.","United Kingdom","China"],
    ["2.8","U2","Judicial Systems","Judiciaries interpret law and resolve disputes, but their constitutional role and relationship with political authorities differ across course countries.","United Kingdom","Iran"],
    ["2.9","U2","Independent Judiciaries","Judicial independence is greater when courts can decide cases without direct political retaliation or routine control by elected or unelected rulers.","United Kingdom","China"],

    ["3.1","U3","Civil Society","Civil society organizations operate between individuals and the state and can aggregate interests, provide services, mobilize citizens, and constrain government.","United Kingdom","China"],
    ["3.2","U3","Political Culture","Political culture consists of widely shared attitudes and orientations toward authority, citizenship, institutions, and political participation.","Iran","United Kingdom"],
    ["3.3","U3","Political Ideologies","Political ideologies organize beliefs about authority, markets, equality, social order, identity, and the appropriate role of government.","China","United Kingdom"],
    ["3.4","U3","Political Values and Beliefs","Political values are shaped through socialization by families, schools, religion, media, peers, social groups, and political institutions.","Iran","Mexico"],
    ["3.5","U3","Nature and Role of Political Participation","Participation includes voting, protest, party activity, interest-group activity, contacting officials, and other efforts to influence politics.","Mexico","China"],
    ["3.6","U3","Forces that Impact Political Participation","Regime openness, political efficacy, civil liberties, socioeconomic resources, institutions, technology, and repression shape participation.","Russia","United Kingdom"],
    ["3.7","U3","Civil Rights and Civil Liberties","Civil liberties protect individuals from state interference, while civil rights concern equal treatment and political or social inclusion.","United Kingdom","Iran"],
    ["3.8","U3","Political and Social Cleavages","Ethnic, religious, regional, class, and other cleavages can shape political identities, parties, participation, and public policy.","Nigeria","United Kingdom"],
    ["3.9","U3","Challenges from Political and Social Cleavages","Cross-cutting cleavages may reduce polarization, while reinforcing cleavages can intensify conflict and challenge legitimacy or stability.","Nigeria","Russia"],

    ["4.1","U4","Electoral Systems and Rules","Electoral rules such as plurality, proportional representation, runoffs, district magnitude, and thresholds shape representation and competition.","United Kingdom","Mexico"],
    ["4.2","U4","Objectives of Election Rules","Election rules can be designed to promote governability, representation, geographic accountability, inclusion, or barriers to opposition.","Mexico","Iran"],
    ["4.3","U4","Political Party Systems","Party systems range from dominant-party arrangements to competitive multiparty systems, reflecting institutions and political cleavages.","China","United Kingdom"],
    ["4.4","U4","Role of Political Party Systems","Party systems structure recruitment, electoral competition, coalition building, representation, policy choices, and links between citizens and government.","Mexico","China"],
    ["4.5","U4","Impact of Social Movements and Interest Groups","Social movements and interest groups can mobilize citizens, pressure officials, shape agendas, and sometimes challenge regime legitimacy.","Mexico","Iran"],
    ["4.6","U4","Pluralist and Corporatist Interests","Pluralism allows multiple autonomous groups to compete for influence, while corporatism channels representation through state-recognized peak organizations.","United Kingdom","Mexico"],

    ["5.1","U5","Impact of Global Economic and Technological Forces","Global flows of trade, capital, information, technology, and people can constrain governments while creating new opportunities for growth and mobilization.","China","Nigeria"],
    ["5.2","U5","Political Responses to Global Market Forces","Governments respond to global markets through regulation, privatization, state ownership, trade policy, social spending, and industrial strategy.","China","United Kingdom"],
    ["5.3","U5","Challenges from Globalization","Globalization can generate inequality, regional disruption, migration pressures, cultural backlash, environmental costs, and challenges to sovereignty.","Mexico","United Kingdom"],
    ["5.4","U5","Policies and Economic Liberalization","Economic liberalization reduces state controls through measures such as privatization, deregulation, trade opening, or market-oriented reforms.","Mexico","China"],
    ["5.5","U5","International and Supranational Organizations","International organizations coordinate among sovereign states, while supranational institutions can exercise authority that constrains member governments.","United Kingdom","Russia"],
    ["5.6","U5","Adaptation of Social Policies","Governments revise welfare, health, education, gender, and other social policies in response to demographic, economic, political, and cultural pressures.","Mexico","Nigeria"],
    ["5.7","U5","Impact of Industrialization and Economic Development","Industrialization and development can expand urbanization and middle classes while also producing inequality, pollution, labor conflict, and demands for policy change.","China","Nigeria"],
    ["5.8","U5","Causes and Effects of Demographic Change","Fertility, mortality, migration, urbanization, aging, and population growth create different fiscal, labor, representation, and service-delivery pressures.","China","Nigeria"],
  ];

  const countryFacts = {
    "China": "the Chinese Communist Party dominates national political competition and the state remains unitary",
    "Iran": "elected institutions operate alongside powerful unelected institutions rooted in the Islamic Republic's theocratic framework",
    "Mexico": "a federal presidential system became substantially more electorally competitive after decades of PRI dominance",
    "Nigeria": "a federal presidential system manages major regional, religious, and ethnic cleavages through constitutional institutions",
    "Russia": "a formally federal semi-presidential system has become increasingly centralized around the presidency",
    "United Kingdom": "a parliamentary system operates under parliamentary sovereignty within a unitary state that has devolved substantial powers",
  };

  function rotate(correct, wrong, seed) {
    const distractors = [...new Set(wrong.filter(x => x && x !== correct))].slice(0,3);
    if (distractors.length < 3) throw new Error(`Insufficient distractors for ${correct}`);
    const idx = seed % 4;
    const o = distractors.slice();
    o.splice(idx,0,correct);
    return {o,c:[idx]};
  }
  function make(id, topic, skill, q, correct, wrong, e, variantGroupId) {
    const seed = [...id].reduce((n,ch)=>n+ch.charCodeAt(0),0);
    const {o,c}=rotate(correct,wrong,seed);
    return { id, unit:topic[1], topicCode:topic[0], topic:topic[2], type:"s", skill, q, o, c, e, ...(variantGroupId?{variantGroupId}:{}) };
  }

  const bank=[];
  topics.forEach((t, index) => {
    const [code,unit,name,principle,a,b]=t;
    const peers = topics.filter(x=>x[1]===unit && x[0]!==code);
    const otherPrinciples = peers.map(x=>x[3]);
    const vg1=`compgov-${code}-concept`;
    const vg2=`compgov-${code}-compare`;
    bank.push(make(`compgov-${code}-a`,t,"1.A",`Which statement best describes the political-science concept emphasized in Topic ${code}, ${name}?`,principle,otherPrinciples,`${principle} This identifies the relevant concept without substituting a different institution or process.`,vg1));
    bank.push(make(`compgov-${code}-b`,t,"1.E",`A researcher examining ${a} wants to apply the central idea of ${name}. Which observation is most relevant?`,`${countryFacts[a]}; this provides a country context in which to apply ${name.toLowerCase()}.`,[
      `${countryFacts[b]}; this describes ${b} rather than the country in the prompt.`,
      `${countryFacts[countries[(countries.indexOf(a)+2)%countries.length]]}; this shifts the analysis to a different course country.`,
      `${countryFacts[countries[(countries.indexOf(a)+3)%countries.length]]}; this is not evidence about ${a}.`
    ],`The correct response applies the topic to ${a}: ${countryFacts[a]}. The alternatives describe other course countries and therefore do not answer the country-specific application.`,vg1));
    bank.push(make(`compgov-${code}-c`,t,"1.B",`Which explanation best connects ${name} to political outcomes?`,`${principle} As a result, variation in this feature can change incentives, participation, accountability, legitimacy, or policy outcomes.`,peers.map(x=>`${x[3]} As a result, the mechanism in Topic ${x[0]} is the primary explanation here.`),`${principle} The political effect follows from how that institution or process changes incentives and relationships among citizens, officials, and the state.`,vg1));
    bank.push(make(`compgov-${code}-d`,t,"2.A",`Which comparison between ${a} and ${b} is most accurate for the issues raised by ${name}?`,`${a}: ${countryFacts[a]}; ${b}: ${countryFacts[b]}.`,countries.filter(c=>c!==a&&c!==b).slice(0,3).map((c,i)=>`${a}: ${countryFacts[c]}; ${b}: ${countryFacts[i%2===0?a:b]}.`),`The defensible comparison uses the actual institutional context of both countries: ${a}—${countryFacts[a]}; ${b}—${countryFacts[b]}.`,vg2));
    bank.push(make(`compgov-${code}-e`,t,"2.C",`What is the most defensible implication of a difference between ${a} and ${b} when analyzing ${name}?`,`${a} and ${b} operate through different institutional and political contexts, so the same political pressure can produce different channels of accountability, participation, or policy response.`,[
      `Because both are sovereign states, institutional differences rarely affect how political pressures are translated into policy.`,
      `A difference in political institutions means citizens in one country cannot participate politically while citizens in the other always can.`,
      `The comparison shows that economic development alone determines the political institutions and behaviors of both countries.`
    ],`Comparative analysis asks what institutional similarities or differences imply. Different structures can mediate the same pressure differently without making absolute claims about participation or reducing politics to one cause.`,vg2));
  });

  const quantitativeSets = [
    ["q-turnout","U3","Voter turnout in two election cycles",[["Country A",61,66],["Country B",48,55],["Country C",72,70]],"participation"],
    ["q-women","U4","Women in the national legislature (%)",[["Country A",18,24],["Country B",31,36],["Country C",12,17]],"representation"],
    ["q-urban","U5","Urban population share (%)",[["Country A",54,62],["Country B",47,55],["Country C",73,78]],"urbanization"],
    ["q-growth","U5","Annual real GDP growth (%)",[["Country A",2.1,4.4],["Country B",3.8,1.2],["Country C",1.4,2.0]],"economic performance"],
    ["q-trust","U1","Public trust in national institutions (%)",[["Country A",44,51],["Country B",62,58],["Country C",35,42]],"legitimacy"],
    ["q-parties","U4","Effective number of parliamentary parties",[["Country A",2.4,2.7],["Country B",4.8,5.3],["Country C",1.3,1.4]],"party competition"],
    ["q-internet","U5","Internet access (% of population)",[["Country A",58,76],["Country B",72,88],["Country C",43,69]],"technology"],
    ["q-protest","U3","Survey respondents reporting protest participation (%)",[["Country A",6,9],["Country B",14,12],["Country C",3,5]],"political participation"],
    ["q-central","U2","Subnational share of public spending (%)",[["Country A",38,41],["Country B",17,19],["Country C",29,31]],"decentralization"],
  ];
  quantitativeSets.forEach(([id,unit,title,rows,theme],si)=>{
    const stim={type:"quantitative",title,columns:["Case","Earlier","Later"],rows,source:"Synthetic comparative-politics practice data; values are constructed for skills practice, not factual country statistics."};
    const gid=`compgov-${id}`;
    const vals=rows.map(r=>r[2]-r[1]);
    const maxI=vals.indexOf(Math.max(...vals));
    const minI=vals.indexOf(Math.min(...vals));
    const t=topics.find(x=>x[1]===unit);
    const q1=make(`${gid}-1`,t,"3.B",`Which pattern is most clearly shown in the ${title.toLowerCase()} data?`,`${rows[maxI][0]} has the largest increase from the earlier to the later observation.`,[
      `${rows[minI][0]} has the largest increase from the earlier to the later observation.`,
      `All three cases change by exactly the same amount.`,
      `Every case declines from the earlier to the later observation.`
    ],`Computing later minus earlier gives changes of ${vals.join(", ")} percentage points or units, so ${rows[maxI][0]} has the largest increase.`);
    const q2=make(`${gid}-2`,t,"3.D",`What is the most defensible political inference from these synthetic ${theme} data alone?`,`The data can establish a pattern in ${theme}, but a causal explanation would require additional evidence about institutions, events, and alternative explanations.`,[
      `The data prove that one constitutional design caused every observed change.`,
      `The data demonstrate that public opinion has no relationship to ${theme}.`,
      `The data are sufficient to identify the motives of individual political leaders.`
    ],`The table describes an association or trend. It does not by itself establish causation or reveal individual motives, so a cautious inference is required.`);
    [q1,q2].forEach((q,i)=>{q.stimulusGroupId=gid;q.sequence=i+1;q.stimulus=stim;}); bank.push(q1,q2);
  });

  const textSets = [
    ["t-legitimacy","U1","A comparative-politics scholar argues that governments may gain short-run compliance through coercion, but durable legitimacy is more likely when citizens believe institutions have a rightful claim to authority.","legitimacy"],
    ["t-executive","U2","A researcher argues that formal constitutional limits matter, but their practical effect depends on whether legislatures, courts, parties, and other actors possess enough autonomy to enforce them against executives.","executive constraint"],
    ["t-civil","U3","A scholar argues that civil society can widen participation by organizing citizens, yet governments may also regulate, co-opt, or repress associations that become effective political challengers.","civil society"],
    ["t-elections","U4","A political scientist argues that electoral rules do more than translate votes into seats: they also shape party strategies, coalition incentives, geographic representation, and opportunities for smaller parties.","electoral rules"],
    ["t-global","U5","A scholar argues that economic globalization can increase aggregate growth while distributing gains and losses unevenly across regions and sectors, creating political demands for both liberalization and protection.","globalization"],
    ["t-cleavage","U3","A researcher argues that social diversity does not automatically produce instability; conflict is more likely when multiple political cleavages reinforce one another and institutions fail to channel demands peacefully.","social cleavages"],
  ];
  textSets.forEach(([id,unit,text,theme],si)=>{
    const stim={type:"text",title:"Synthetic secondary-source excerpt",text,source:"Original synthetic practice passage written for this question bank."};
    const gid=`compgov-${id}`; const t=topics.find(x=>x[1]===unit);
    const q1=make(`${gid}-1`,t,"4.A",`Which statement best describes the author's central claim about ${theme}?`,text.replace(/^A (comparative-politics scholar|researcher|scholar|political scientist) argues that /,""),[
      `Political institutions have no meaningful effect on ${theme}.`,
      `Variation in ${theme} is explained entirely by economic development.`,
      `The author argues that the same political outcome occurs in every regime.`
    ],`The correct option restates the passage's actual qualified claim. The alternatives replace it with absolute or monocausal positions the author does not make.`);
    const q2=make(`${gid}-2`,t,"4.B",`How does the author's argument most directly relate to comparative government?`,`It proposes a mechanism linking institutions or political conditions to variation in ${theme}, which can be compared across the course countries.`,[
      `It rejects comparison among countries because each political system is unique.`,
      `It treats constitutional language as the only evidence political scientists may use.`,
      `It argues that political outcomes should be evaluated only as normative questions.`
    ],`Comparative politics uses cross-national variation to examine how institutions and conditions relate to outcomes. The passage offers exactly that kind of relationship.`);
    const q3=make(`${gid}-3`,t,"4.C",`Which implication follows most reasonably from the author's perspective?`,`Researchers should compare cases where the relevant political condition differs and examine whether outcomes in ${theme} differ in the predicted direction.`,[
      `Researchers should select only cases that already confirm the author's conclusion.`,
      `Researchers should avoid quantitative or qualitative evidence that might complicate the claim.`,
      `Researchers can infer individual motives directly from national-level institutional differences.`
    ],`A defensible implication is to test the proposed relationship comparatively. Selecting only confirming cases or inferring individual motives from aggregate institutions would weaken the analysis.`);
    [q1,q2,q3].forEach((q,i)=>{q.stimulusGroupId=gid;q.sequence=i+1;q.stimulus=stim;}); bank.push(q1,q2,q3);
  });

  window.QUESTIONS_AP_COMPARATIVE_GOVERNMENT = bank;
})();
