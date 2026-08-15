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

  // Topic-specific, stable country evidence used by the application and comparison
  // templates. These statements deliberately avoid current office-holder names and
  // volatile election results; they encode institutional/course knowledge from the
  // Fall-2026 CED rather than news-dependent facts.
  const topicEvidence = {
    "1.1":["Mexico's transition from long PRI dominance to competitive elections provides evidence that can be compared across time","The United Kingdom's parliamentary elections and confidence relationship provide observable institutional evidence","political scientists can compare observable institutions and outcomes without treating normative judgments as empirical findings"],
    "1.2":["Mexico is a sovereign federal state whose government operates through constitutionally defined institutions","The United Kingdom is a sovereign state governed through parliamentary institutions under an uncodified constitutional order","state sovereignty and the institutions exercising governmental authority are related but analytically distinct"],
    "1.3":["Mexico holds competitive multiparty elections in which opposition parties can win national office","China's Communist Party dominates political competition and restricts organized challenges to one-party rule","meaningful electoral competition separates democratic accountability from authoritarian political control"],
    "1.4":["Mexico's erosion of PRI electoral dominance expanded genuine competition and alternation in national office","Russia's political system has moved toward greater executive dominance and more constrained opposition competition","democratization can advance or recede as competition, civil liberties, and institutional constraints change"],
    "1.5":["Iran combines electoral institutions with religious authority vested in powerful unelected bodies","The United Kingdom derives governing authority from parliamentary institutions, elections, and constitutional conventions","different regimes legitimate authority through different combinations of elections, law, religion, ideology, and tradition"],
    "1.6":["Nigeria transfers presidential authority through constitutionally scheduled elections and succession rules","The United Kingdom can replace a prime minister through party leadership change or loss of parliamentary confidence","leadership turnover follows different institutional channels in presidential and parliamentary systems"],
    "1.7":["Nigeria constitutionally divides powers among federal, state, and local levels","The United Kingdom remains legally unitary even though substantial powers have been devolved to Scotland, Wales, and Northern Ireland","constitutional federalism differs from devolution because subnational authority has a different legal foundation"],
    "1.8":["China frequently grounds legitimacy in economic performance, nationalism, and Communist Party leadership","Mexico's competitive elections provide an important procedural source of governmental legitimacy","regimes can seek public acceptance through performance or electoral procedures even when their political systems differ"],
    "1.9":["China uses policy performance, nationalism, and party institutions to reinforce regime support","The United Kingdom uses competitive elections, parliamentary accountability, and policy responsiveness to renew governing mandates","regimes sustain legitimacy through different mixes of performance, institutions, and citizen input"],
    "1.10":["Russia's centralized executive authority can reduce open elite competition while creating dependence on regime performance","Nigeria's regional, ethnic, and religious cleavages place continuing demands on federal institutions","political stability depends on how institutions manage legitimacy, cleavages, elite competition, and economic pressures"],
    "2.1":["The United Kingdom's prime minister and cabinet emerge from and remain responsible to Parliament","Mexico separately elects a president and a legislature for fixed terms","parliamentary fusion and presidential separation create different executive-legislative accountability relationships"],
    "2.2":["The United Kingdom can remove a government through parliamentary confidence mechanisms","Russia combines a directly elected president with a prime minister and government responsible within a semi-presidential structure","executive-legislative bargaining differs when authority is fused, separated, or divided between two executive offices"],
    "2.3":["Russia's presidency possesses extensive formal and informal influence over national policymaking","The United Kingdom's prime minister depends on maintaining support within the parliamentary majority","executive power depends not only on formal authority but also on party, legislative, and institutional relationships"],
    "2.4":["Mexico constitutionally limits presidents to a single six-year term without reelection","Russia has altered presidential term rules in ways that allow extended tenure in the presidency","term-limit design changes opportunities for leadership turnover and executive entrenchment"],
    "2.5":["A United Kingdom government can fall after losing parliamentary confidence or governing-party support","Nigeria's president serves a fixed term and can be removed through constitutional impeachment procedures","removal mechanisms reflect the different accountability structures of parliamentary and presidential systems"],
    "2.6":["Nigeria's bicameral National Assembly represents citizens through a House and states through a Senate","China's National People's Congress formally legislates but operates within Communist Party political dominance","legislative structure and political independence jointly determine how effectively legislatures represent interests and constrain executives"],
    "2.7":["The United Kingdom Parliament can question ministers, scrutinize bills, investigate government, and withdraw confidence","China's legislature operates within a party-state system that sharply limits autonomous opposition to top leadership","legislative checks are stronger when representatives possess institutional autonomy from the executive or ruling party"],
    "2.8":["United Kingdom courts apply statutes and common law within a system where Parliament remains legally sovereign","Iran's judiciary operates within an Islamic constitutional system influenced by unelected religious institutions","judicial roles vary with constitutional structure and the relationship between courts and other political authorities"],
    "2.9":["United Kingdom judges have substantial security and professional autonomy even though courts cannot invalidate Acts of Parliament","China's courts remain institutionally subordinate to Communist Party political authority","judicial independence concerns freedom from political control and is distinct from the formal scope of judicial review"],
    "3.1":["United Kingdom civil society organizations can openly organize, lobby, campaign, and criticize public officials","China permits many social organizations while restricting autonomous groups viewed as threats to party control","civil society's political influence depends heavily on legal protections and the state's tolerance for independent organization"],
    "3.2":["Iran's political culture reflects influences from Shi'a religious traditions, nationalism, revolution, and generational change","The United Kingdom's political culture includes long-standing acceptance of parliamentary institutions and gradual constitutional change","political culture shapes how citizens interpret authority and institutions but can contain competing traditions within one country"],
    "3.3":["China's ruling party officially draws on Marxism-Leninism while combining it with nationalism and state-led development","United Kingdom parties compete over market policy, welfare provision, national identity, and the appropriate scope of government","ideologies organize political beliefs differently across authoritarian and competitive party systems"],
    "3.4":["Iranian political values are shaped by religion, revolutionary institutions, education, media, family, and generational experience","Mexican political values have been shaped by democratization, regional experience, parties, media, and socioeconomic change","political socialization occurs through multiple institutions and can produce generational or regional differences within a country"],
    "3.5":["Mexico provides electoral, party, protest, interest-group, and civic channels for political participation","China permits selected forms of participation while constraining organized opposition and unauthorized collective action","regime openness changes which forms of participation are available and how much influence they can exert"],
    "3.6":["Russia permits voting and some civic activity while legal and political constraints raise the costs of opposition mobilization","United Kingdom citizens can use elections, parties, petitions, protests, interest groups, and direct contact with representatives","civil liberties, efficacy, institutions, resources, and repression shape both the level and form of participation"],
    "3.7":["United Kingdom law provides broad protections for expression, association, due process, and equal treatment","Iran constitutionally recognizes some rights while religious and political restrictions limit expression, association, and personal autonomy","formal rights protections can differ from actual enforcement, especially where unelected authorities or security institutions constrain liberties"],
    "3.8":["Nigeria's regional, ethnic, religious, and socioeconomic cleavages shape parties, federal bargaining, and public policy","United Kingdom politics includes regional and national-identity cleavages alongside class and partisan divisions","social cleavages become politically important when institutions and parties organize or respond to those identities"],
    "3.9":["Nigeria's federal arrangements and informal power-sharing practices seek to manage reinforcing regional and religious cleavages","Russia's center-periphery and ethnic diversity is managed within an increasingly centralized federal system","institutions can reduce or intensify conflict depending on whether they accommodate, cross-cut, or suppress politically salient cleavages"],
    "4.1":["The United Kingdom elects the House of Commons primarily through single-member plurality districts","Mexico combines single-member districts with proportional representation in elections to the Chamber of Deputies","electoral formulas shape incentives for parties, geographic accountability, and the proportionality of representation"],
    "4.2":["Mexico's mixed electoral rules balance district representation with broader proportional inclusion","Iran screens candidates through unelected institutions before voters choose among approved contenders","election rules can promote representation or governability while also structuring who can compete for office"],
    "4.3":["China operates a Communist Party-dominated party-state rather than a competitive multiparty system","The United Kingdom has competitive national parties and a party system shaped by plurality elections and regional parties","party-system competition varies with regime type, electoral rules, and social cleavages"],
    "4.4":["Mexico's parties recruit candidates, organize elections, aggregate interests, and compete to control elected institutions","China's Communist Party recruits political elites, sets major policy direction, and penetrates state and social institutions","parties link citizens and rulers differently in competitive electoral systems and dominant party-states"],
    "4.5":["Mexican social movements and interest groups use elections, litigation, protest, lobbying, and media to pressure government","Iranian social movements can mobilize around social and political grievances despite substantial restrictions and repression","organized groups can shape agendas and participation even when regimes offer very different levels of political access"],
    "4.6":["United Kingdom interest groups generally compete pluralistically for access to parties, Parliament, ministries, and public opinion","Mexico historically incorporated important labor and sectoral organizations through corporatist relationships tied to the PRI","pluralist competition differs from corporatist arrangements in how groups gain recognized access to policymakers"],
    "5.1":["China's integration into global trade and rapid technological development expanded growth while giving the state new tools for economic and information management","Nigeria's dependence on global commodity markets and expanding digital connectivity expose it to external price and technology shifts","global markets and technology can simultaneously expand economic opportunities and constrain or reshape state policy choices"],
    "5.2":["China combines market mechanisms and global trade with extensive state ownership, regulation, and industrial policy","The United Kingdom generally relies more heavily on private markets while using regulation, taxation, and social policy to respond to market outcomes","states respond to global market pressures with different mixtures of liberalization, regulation, ownership, and social protection"],
    "5.3":["Mexico's integration into North American production networks created export opportunities while exposing sectors and regions to uneven adjustment","United Kingdom debates over European integration reflected tensions involving sovereignty, migration, regulation, and economic interdependence","globalization creates uneven gains and losses that can generate political demands for both openness and protection"],
    "5.4":["Mexico pursued privatization, trade opening, and other market-oriented reforms after an earlier period of stronger state economic control","China introduced market-oriented reforms while retaining Communist Party rule and substantial state direction of strategic sectors","economic liberalization can reduce direct state control without necessarily producing equivalent political liberalization"],
    "5.5":["The United Kingdom participates in international organizations while its withdrawal from the European Union reduced direct supranational constraints from EU institutions","Russia participates in international organizations while emphasizing state sovereignty and resisting external constraints it views as threatening","international and supranational institutions differ in how much authority states delegate and how strongly rules constrain domestic policy"],
    "5.6":["Mexico has expanded and revised social programs in response to inequality, poverty, demographic change, and political competition","Nigeria faces pressure to expand education, health, employment, and social provision amid rapid population growth and uneven state capacity","social policy adaptation reflects demographic needs, fiscal capacity, development levels, and political demands"],
    "5.7":["China's industrialization produced rapid urbanization, rising incomes, pollution, regional inequality, and new social demands","Nigeria's development is shaped by urbanization and resource wealth alongside infrastructure gaps, unemployment, and regional inequality","economic development can expand resources and middle classes while also creating environmental, distributional, and governance pressures"],
    "5.8":["China faces population aging and a shrinking working-age population after decades of low fertility","Nigeria has a much younger and faster-growing population that creates strong demand for education, employment, housing, and services","different demographic structures create contrasting fiscal, labor-market, and service-delivery pressures on governments"],
  };

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
    const ev = topicEvidence[code];
    if (!ev) throw new Error(`${code}: missing topic-specific comparative evidence`);
    const sameUnitEvidence = peers.map(x => topicEvidence[x[0]] && topicEvidence[x[0]][0]).filter(Boolean);
    bank.push(make(`compgov-${code}-b`,t,"1.E",`Which piece of evidence from ${a} most directly illustrates ${name}?`,ev[0],sameUnitEvidence,`The evidence is directly tied to ${name}: ${ev[0]}. The competing statements describe other political processes from the same unit rather than the concept named in the prompt.`,vg1));
    bank.push(make(`compgov-${code}-c`,t,"1.B",`Which explanation best connects ${name} to political outcomes?`,`${principle} This can alter the incentives and relationships among citizens, political organizations, officials, and the state.`,peers.map(x=>`${x[3]} This instead emphasizes the mechanism associated with ${x[2]}, not the process named in the prompt.`),`${principle} The mechanism matters because it changes the incentives or relationships through which political actors pursue authority, participation, accountability, or policy.`,vg1));
    const peerEvidence = peers.map(x => topicEvidence[x[0]]).filter(Boolean);
    bank.push(make(`compgov-${code}-d`,t,"2.A",`Which comparison between ${a} and ${b} is most accurate for ${name}?`,`${a}: ${ev[0]} ${b}: ${ev[1]}`,peerEvidence.map(x=>`${a}: ${x[0]} ${b}: ${x[1]}`),`The correct comparison uses topic-specific evidence from both cases. ${a}: ${ev[0]} ${b}: ${ev[1]}`,vg2));
    bank.push(make(`compgov-${code}-e`,t,"2.C",`What is the most defensible implication of the comparison between ${a} and ${b} for ${name}?`,ev[2],peerEvidence.map(x=>x[2]),`The comparison supports this topic-specific implication: ${ev[2]}. The alternatives draw implications from different processes in the same unit rather than from the evidence in this comparison.`,vg2));
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
    const deltaText = (i) => `${rows[i][0]} changes from ${rows[i][1]} to ${rows[i][2]}, a difference of ${vals[i]}.`;
    const otherIs = [0,1,2].filter(i=>i!==maxI);
    const q1=make(`${gid}-1`,t,"3.B",`Which pattern is most clearly shown in the ${title.toLowerCase()} data?`,`${rows[maxI][0]} shows the largest increase: ${deltaText(maxI)}`,[
      `${rows[otherIs[0]][0]} shows the largest increase: ${deltaText(otherIs[0])}`,
      `${rows[otherIs[1]][0]} shows the largest increase: ${deltaText(otherIs[1])}`,
      `${rows[minI][0]} and ${rows[maxI][0]} show equal changes despite their different earlier and later values.`
    ],`Computing later minus earlier gives changes of ${vals.join(", ")} percentage points or units, so ${rows[maxI][0]} has the largest increase.`);
    const q2=make(`${gid}-2`,t,"3.D",`What is the most defensible political inference from these synthetic ${theme} data alone?`,`The table establishes a pattern in ${theme}, but explaining its cause requires evidence about institutions, events, and competing explanations.`,[
      `The repeated observations show that the largest change was caused by the constitutional structure of that case rather than by economic or social conditions.`,
      `The table shows that leaders in the case with the highest later value intentionally produced that outcome through their policy choices.`,
      `Because the table does not display economic or demographic variables, those factors can be ruled out as explanations for the observed changes.`
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
      `The author treats institutional differences as secondary and argues that ${theme} is driven mainly by broad socioeconomic conditions shared across countries.`,
      `The author emphasizes formal constitutional design and suggests that variation in ${theme} largely disappears once countries adopt similar legal rules.`,
      `The author expects comparable pressures to produce broadly similar outcomes in ${theme} even when political institutions and regime conditions differ.`
    ],`The correct option restates the passage's actual qualified claim. The alternatives preserve plausible comparative arguments but alter the mechanism or relationship the author identifies.`);
    const q2=make(`${gid}-2`,t,"4.B",`How does the author's argument most directly relate to comparative government?`,`It proposes a mechanism linking political institutions or conditions to variation in ${theme}, creating a relationship that can be compared across countries.`,[
      `It argues that national histories make systematic comparison unreliable, so researchers should explain ${theme} through separate country narratives rather than common concepts.`,
      `It treats formal constitutional rules as the strongest evidence and gives less analytical weight to observed political behavior when comparing ${theme}.`,
      `It frames ${theme} mainly as a normative question about desirable government rather than an empirical relationship that can be examined across countries.`
    ],`Comparative politics uses cross-national variation to examine how institutions and conditions relate to outcomes. The passage offers exactly that kind of relationship.`);
    const q3=make(`${gid}-3`,t,"4.C",`Which implication follows most reasonably from the author's perspective?`,`Researchers should compare cases where the relevant political condition differs and test whether outcomes in ${theme} vary in the direction implied by the argument.`,[
      `Researchers should begin with cases that fit the argument and treat contrasting cases mainly as exceptions rather than evidence that could revise the proposed relationship.`,
      `Researchers should measure the proposed mechanism but give limited attention to contextual variables that might offer competing explanations for variation in ${theme}.`,
      `Researchers should use national institutional differences to infer the motivations of individual citizens or leaders when direct evidence about those motivations is unavailable.`
    ],`A defensible implication is to test the proposed relationship comparatively while remaining open to competing explanations. The alternatives introduce confirmation bias, omitted-variable problems, or an invalid individual-level inference.`);
    [q1,q2,q3].forEach((q,i)=>{q.stimulusGroupId=gid;q.sequence=i+1;q.stimulus=stim;}); bank.push(q1,q2,q3);
  });

  window.QUESTIONS_AP_COMPARATIVE_GOVERNMENT = bank;
})();
