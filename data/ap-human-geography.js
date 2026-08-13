
// ---- consolidated from data/ap-human-geography.js ----
// AP Human Geography — original, unofficial Section I practice bank.
// Current AP Central CED/exam page verified 2026-08-13.
// Section I: 60 MCQs / 60 minutes; approximately 30–40% stimulus-based.
(function () {
  "use strict";
  window.QUESTIONS_AP_HUMAN_GEOGRAPHY = [];
  const topics = [];
  const quantitative = new Set(["1.2","1.6","2.3","2.5","3.3","3.6","4.2","4.6","5.5","5.8","6.4","6.9","7.3","7.4"]);
  const visual = new Set(["1.1","1.4","2.1","2.10","3.2","3.4","4.4","4.10","5.2","5.7","6.5","6.10","7.1","7.6"]);
  const skillPairs = [["2.B","3.E"],["4.C","5.B"],["2.C","4.D"],["3.D","5.C"]];

  function rotateCorrect(correct, distractors, position) {
    const pool = distractors.filter((value) => value !== correct).slice(0, 3);
    while (pool.length < 3) pool.push("A different geographic process would be needed to support that conclusion.");
    const options = pool.slice();
    options.splice(position, 0, correct);
    return { options, correctIndex: position };
  }

  function makeStimulus(topic, index) {
    if (quantitative.has(topic.code)) {
      const high = 72 + (index % 13), middle = 46 + (index % 9), low = 21 + (index % 7);
      return {
        type: "quantitative",
        title: `Synthetic geographic indicators — Topic ${topic.code}`,
        source: `Original AP Exam Practice data. Context: ${topic.scenario}`,
        columns: ["Area", "Indicator A", "Indicator B"],
        rows: [["Area A", String(high), String(100-high)], ["Area B", String(middle), String(100-middle)], ["Area C", String(low), String(100-low)]],
      };
    }
    if (visual.has(topic.code)) {
      return { type: "visual", title: `Synthetic geographic scene — Topic ${topic.code}`, source: "Original AP Exam Practice description.", description: topic.scenario };
    }
    return null;
  }

  window.__APHUG_ADD_TOPICS__ = function (newTopics) {
    topics.push(...newTopics);
  };

  window.__APHUG_FINALIZE__ = function () {
    const byUnitProfiles = new Map();
    topics.forEach((topic) => {
      if (!byUnitProfiles.has(topic.unit)) byUnitProfiles.set(topic.unit, []);
      byUnitProfiles.get(topic.unit).push(topic);
    });
    window.QUESTIONS_AP_HUMAN_GEOGRAPHY = [];
    topics.forEach((topic) => {
      const allUnit = byUnitProfiles.get(topic.unit);
      const topicIndex = Number(topic.code.split(".")[0]) * 20 + Number(topic.code.split(".")[1]);
      const pool = allUnit.filter((other) => other.code !== topic.code);
      const start = topicIndex % pool.length;
      const ds = [0,1,2].map((offset) => pool[(start + offset) % pool.length]);
      const stimulus = makeStimulus(topic, topicIndex);
      const groupId = stimulus ? `aphug-${stimulus.type}-${topic.code.replace(".","-")}` : null;
      const [skill2, skill3] = skillPairs[topicIndex % skillPairs.length];
      const q1 = rotateCorrect(topic.title, ds.map(x => x.title), (topicIndex*3)%4);
      const q2 = rotateCorrect(topic.application, ds.map(x => x.application), (topicIndex*3+1)%4);
      const q3 = rotateCorrect(topic.core, ds.map(x => x.core), (topicIndex*3+2)%4);
      const common = { unit: topic.unit, topicCode: topic.code, topic: topic.title, type: "s", stimulusGroupId: groupId, stimulus };
      window.QUESTIONS_AP_HUMAN_GEOGRAPHY.push(
        { ...common, id:`aphug-${topic.code.replace(".","-")}-01`, skill:"1.D", sequence:stimulus?1:undefined,
          q:stimulus?"Which AP Human Geography concept would a geographer most directly use to analyze the pattern or situation in the source?":`A geographer observes the following situation: ${topic.scenario} Which course concept most directly applies?`, o:q1.options, c:[q1.correctIndex],
          e:`${topic.application} This is the defining connection to ${topic.title}; the competing choices describe different processes or patterns within the same unit and do not best account for the stated evidence.` },
        { ...common, id:`aphug-${topic.code.replace(".","-")}-02`, skill:skill2, sequence:stimulus?2:undefined,
          q:stimulus?`Which conclusion is best supported when the source is interpreted in the context of ${topic.title}?`:`Consider this geographic scenario: ${topic.scenario} Which conclusion is best supported?`, o:q2.options, c:[q2.correctIndex],
          e:`${topic.application} The conclusion follows from the spatial relationship or geographic process described in the scenario. The other choices import consequences associated with different topics and are not supported by the evidence given.` },
        { ...common, id:`aphug-${topic.code.replace(".","-")}-03`, skill:skill3, sequence:stimulus?3:undefined,
          q:stimulus?"Which statement best explains the geographic significance of the source rather than merely describing it?":`Which statement best explains the geographic significance of ${topic.title}?`, o:q3.options, c:[q3.correctIndex],
          e:`${topic.core} That statement identifies the relevant geographic mechanism or relationship, whereas the alternatives accurately describe other course ideas but do not explain the topic named in the question.` }
      );
    });
  };
})();

// ---- consolidated from data/ap-human-geography-u1.js ----
// AP Human Geography profile layer — U1
(function () {
  "use strict";
  window.__APHUG_ADD_TOPICS__([
    { unit:"U1", code:"1.1", title:"Introduction to Maps", core:"Map projections and map types shape how spatial information is represented; projection choices can preserve some properties while distorting others.", scenario:"A global map makes Greenland appear nearly as large as Africa even though Africa is far larger.", application:"The apparent size difference reflects projection distortion rather than an actual similarity in land area." },
    { unit:"U1", code:"1.2", title:"Geographic Data", core:"Geographers use quantitative and qualitative data collected through censuses, surveys, field observations, remote sensing, and geographic information systems.", scenario:"A city combines census counts with satellite imagery to identify neighborhoods where population growth is outpacing road capacity.", application:"Combining demographic and remotely sensed data allows planners to connect population change with spatial infrastructure patterns." },
    { unit:"U1", code:"1.3", title:"The Power of Geographic Data", core:"Geospatial technologies can reveal patterns and guide decisions, but data collection, scale, access, and privacy can shape what conclusions are possible.", scenario:"A smartphone mobility dataset accurately tracks commuters who carry participating devices but misses many elderly residents.", application:"The dataset may reveal useful movement patterns while systematically underrepresenting groups with lower device participation." },
    { unit:"U1", code:"1.4", title:"Spatial Concepts", core:"Distance, direction, distribution, density, concentration, pattern, and spatial association describe how phenomena are arranged across space.", scenario:"Coffee shops cluster along a transit corridor rather than being evenly spread across the metropolitan area.", application:"The pattern is one of spatial concentration associated with accessibility along the corridor." },
    { unit:"U1", code:"1.5", title:"Human–Environmental Interaction", core:"Human societies adapt to, depend on, and modify physical environments, while environmental conditions constrain and influence human activity.", scenario:"Farmers in an arid valley construct irrigation canals that allow intensive cultivation but gradually increase soil salinity.", application:"Human modification expands agricultural production while also creating an environmental consequence." },
    { unit:"U1", code:"1.6", title:"Scales of Analysis", core:"A geographic pattern can appear different at global, national, regional, and local scales, so conclusions depend on the scale of analysis.", scenario:"A country has high average income, but neighborhood-level data reveal several districts with persistent poverty.", application:"National averages can conceal local spatial inequality that becomes visible at a finer scale." },
    { unit:"U1", code:"1.7", title:"Regional Analysis", core:"Regions may be formal, functional, or perceptual, and their boundaries reflect shared traits, interactions, or human perceptions.", scenario:"Daily commuting ties several suburbs to one central city even though the suburbs lie in different counties.", application:"The commuting network defines a functional region organized around flows to the central city." }
  ]);
})();

// ---- consolidated from data/ap-human-geography-u2.js ----
// AP Human Geography profile layer — U2
(function () {
  "use strict";
  window.__APHUG_ADD_TOPICS__([ 
    { unit: "U2", code: "2.1", title: "Population Distribution", core: "Population distribution is uneven because physical geography, resources, economic opportunity, infrastructure, and historical settlement influence where people live.", scenario: "Most residents of a desert state live along a river corridor and in a few metropolitan areas.", application: "Water access and concentrated economic opportunities help explain the uneven population distribution." },
    { unit: "U2", code: "2.2", title: "Consequences of Population Distribution", core: "Population concentration and dispersion affect resource use, political representation, service provision, environmental pressure, and vulnerability.", scenario: "A mountainous country has many small, isolated settlements separated by difficult terrain.", application: "Providing transportation, schools, and health services is likely to be more costly because residents are spatially dispersed." },
    { unit: "U2", code: "2.3", title: "Population Composition", core: "Population composition describes demographic characteristics such as age, sex, ethnicity, and other attributes that shape social and economic needs.", scenario: "A region's population pyramid has a narrow base and unusually large cohorts over age sixty-five.", application: "The region is likely to face increased demand for elder care and a rising old-age dependency burden." },
    { unit: "U2", code: "2.4", title: "Population Dynamics", core: "Birth rates, death rates, fertility, mortality, and natural increase interact to produce population growth or decline.", scenario: "A country experiences falling infant mortality while total fertility remains high for several decades.", application: "Natural increase is likely to remain high because deaths decline before births fall substantially." },
    { unit: "U2", code: "2.5", title: "The Demographic Transition Model", core: "The demographic transition model links changing birth and death rates to stages of economic and social development.", scenario: "A country has low death rates, rapidly declining birth rates, and slowing but still positive population growth.", application: "The country is most consistent with a later transition stage in which fertility falls after mortality has already declined." },
    { unit: "U2", code: "2.6", title: "Malthusian Theory", core: "Malthus argued population can grow faster than food supply, while later critics emphasize technological change, distribution, and demographic transition.", scenario: "Food output rises after irrigation, improved seed varieties, and fertilizer use even as population continues to grow.", application: "The outcome illustrates why technological innovation can delay or counter a simple Malthusian prediction of food scarcity." },
    { unit: "U2", code: "2.7", title: "Population Policies", core: "Governments use pronatalist or antinatalist policies to influence fertility, family size, and demographic structure.", scenario: "A government offers paid parental leave, child allowances, and subsidized childcare after decades of very low fertility.", application: "The measures are pronatalist policies intended to encourage births and slow population aging." },
    { unit: "U2", code: "2.8", title: "Women and Demographic Change", core: "Greater female education, employment opportunity, access to health care, and reproductive autonomy are commonly associated with lower fertility and later childbearing.", scenario: "Female secondary-school completion rises sharply while average age at first marriage also increases.", application: "Fertility is likely to decline as educational and life opportunities expand and childbearing is delayed." },
    { unit: "U2", code: "2.9", title: "Aging Populations", core: "Low fertility and long life expectancy increase the share of elderly residents and can alter dependency ratios, labor supply, and fiscal demands.", scenario: "A country has had below-replacement fertility for thirty years and life expectancy above eighty years.", application: "The country is likely to experience labor-force pressure and greater pension and health-care costs unless offset by productivity or migration." },
    { unit: "U2", code: "2.10", title: "Causes of Migration", core: "Migration is shaped by push and pull factors, intervening obstacles and opportunities, distance, networks, and economic, political, environmental, or social conditions.", scenario: "Workers leave a rural province after repeated crop failures and move toward a coastal city with expanding factory employment.", application: "Environmental stress acts as a push factor while urban employment acts as a pull factor." },
    { unit: "U2", code: "2.11", title: "Forced and Voluntary Migration", core: "Forced migration occurs under coercion or threat, while voluntary migration reflects a greater degree of choice even when strong pressures are present.", scenario: "Families cross an international border after armed groups threaten their village and fighting destroys nearby homes.", application: "The movement is best classified as forced displacement because immediate insecurity constrains meaningful choice." },
    { unit: "U2", code: "2.12", title: "Effects of Migration", core: "Migration changes labor markets, remittance flows, cultural patterns, age structures, and political relationships in both origin and destination regions.", scenario: "A migrant community sends a large share of its earnings back to households in its country of origin.", application: "Remittances can raise household income in origin communities while linking their economies more closely to destination labor markets." },
  ]);
})();

// ---- consolidated from data/ap-human-geography-u3a.js ----
// AP Human Geography profile layer — U3 A
(function () {
  "use strict";
  window.__APHUG_ADD_TOPICS__([ 
    { unit: "U3", code: "3.1", title: "Introduction to Culture", core: "Culture includes shared practices, technologies, beliefs, institutions, and traits that are learned and transmitted across generations and space.", scenario: "Residents of a region share a distinctive cuisine, religious calendar, architecture, and set of social customs.", application: "The shared traits form part of a cultural system rather than being explained solely by the physical environment." },
    { unit: "U3", code: "3.2", title: "Cultural Landscapes", core: "Cultural landscapes are visible expressions of human values, identities, technology, and history imprinted on the built and modified environment.", scenario: "Street signs are bilingual, religious buildings dominate the skyline, and neighborhood businesses display foods associated with immigrant traditions.", application: "The visible features are evidence of a cultural landscape shaped by migration and identity." },
    { unit: "U3", code: "3.3", title: "Cultural Patterns", core: "Language, religion, ethnicity, and other cultural traits form spatial patterns shaped by migration, diffusion, history, and political boundaries.", scenario: "A language is dominant in one core region but occurs in scattered urban enclaves across several other countries.", application: "The pattern can result from historical concentration in the core combined with later migration to distant cities." },
    { unit: "U3", code: "3.4", title: "Types of Diffusion", core: "Relocation diffusion moves traits with migrants, while expansion diffusion spreads outward through contagious, hierarchical, or stimulus processes.", scenario: "A fashion trend begins among celebrities in a major city and is adopted first by influential consumers in other large cities.", application: "The pattern is hierarchical diffusion because adoption moves through socially prominent people and major urban centers." }
  ]);
})();

// ---- consolidated from data/ap-human-geography-u3b.js ----
// AP Human Geography profile layer — U3 B
(function () {
  "use strict";
  window.__APHUG_ADD_TOPICS__([
    { unit:"U3", code:"3.5", title:"Historical Causes of Diffusion", core:"Colonialism, imperialism, trade, and migration spread languages, religions, technologies, and cultural practices and helped create present-day cultural patterns.", scenario:"A former colony uses the language of a distant European country in government and higher education.", application:"The language pattern reflects historical diffusion associated with colonial rule and later institutional persistence." },
    { unit:"U3", code:"3.6", title:"Contemporary Causes of Diffusion", core:"Globalization, urbanization, communications technology, migration, tourism, and multinational firms accelerate contemporary cultural diffusion.", scenario:"A music style created in one city becomes popular worldwide through streaming platforms and social media.", application:"Rapid global communication enables expansion diffusion across great distances without requiring large-scale relocation." },
    { unit:"U3", code:"3.7", title:"Diffusion of Religion and Language", core:"Universalizing religions often spread through expansion and relocation diffusion, while languages spread through migration, conquest, trade, institutions, and communication networks.", scenario:"Migrants establish places of worship and language schools in destination cities while maintaining ties to their region of origin.", application:"Relocation diffusion carries religious and linguistic traits to new locations where they may subsequently spread further." },
    { unit:"U3", code:"3.8", title:"Effects of Diffusion", core:"Diffusion can produce assimilation, acculturation, syncretism, multicultural landscapes, cultural convergence, or resistance depending on local context.", scenario:"A community blends an introduced religious celebration with older local rituals and foods.", application:"The blended practice is an example of syncretism produced by interaction between incoming and local cultural traditions." }
  ]);
})();

// ---- consolidated from data/ap-human-geography-u4.js ----
// AP Human Geography profile layer — U4
(function () {
  "use strict";
  window.__APHUG_ADD_TOPICS__([
    { unit:"U4", code:"4.1", title:"Introduction to Political Geography", core:"Political geography examines states, nations, sovereignty, territoriality, boundaries, and the spatial organization of political power.", scenario:"A map shows internationally recognized states whose political borders divide several cultural regions.", application:"The map illustrates how political territories and cultural regions can overlap imperfectly." },
    { unit:"U4", code:"4.2", title:"Political Processes", core:"State formation and change are shaped by colonialism, decolonization, conflict, alliances, nationalism, and shifts in political power.", scenario:"A colony becomes independent and its inherited colonial borders become the boundaries of the new state.", application:"Decolonization changed political sovereignty while preserving boundaries originally imposed by an external power." },
    { unit:"U4", code:"4.3", title:"Political Power and Territoriality", core:"Territoriality is the effort to control people, resources, and activities by controlling space; sovereignty gives states authority over their territory.", scenario:"A government establishes checkpoints and patrols along a disputed frontier to reinforce its claim to the area.", application:"The state is using territorial control to assert sovereignty over contested space." },
    { unit:"U4", code:"4.4", title:"Defining Political Boundaries", core:"Boundaries may be antecedent, subsequent, consequent, superimposed, or relic, depending on their timing and relationship to cultural landscapes.", scenario:"An international border drawn by a colonial power cuts across the traditional territory of the same ethnic group.", application:"The boundary is superimposed because an outside authority imposed it without following the existing cultural pattern." },
    { unit:"U4", code:"4.5", title:"The Function of Political Boundaries", core:"Boundaries regulate movement, trade, security, jurisdiction, and access to resources, and disputes may involve definition, delimitation, demarcation, or administration.", scenario:"Two states agree on a border treaty but dispute exactly where survey markers should be placed on the ground.", application:"The disagreement concerns demarcation, the physical marking of an agreed boundary." },
    { unit:"U4", code:"4.6", title:"Internal Boundaries", core:"Electoral districts and administrative boundaries organize representation and governance; redistricting and gerrymandering can alter political outcomes.", scenario:"A legislature redraws districts so one party's voters are concentrated into a small number of overwhelmingly one-sided districts.", application:"The pattern is consistent with packing, a gerrymandering strategy that concentrates opposing voters." },
    { unit:"U4", code:"4.7", title:"Forms of Governance", core:"Unitary systems concentrate authority in a central government while federal systems constitutionally distribute power among national and subnational governments.", scenario:"Provincial governments possess constitutionally protected authority over education and local taxation.", application:"The arrangement is characteristic of a federal system because political authority is divided across levels of government." },
    { unit:"U4", code:"4.8", title:"Defining Devolutionary Factors", core:"Devolution can be driven by ethnic separatism, economic inequality, physical geography, distance from the capital, or regional identity.", scenario:"A wealthy peripheral region with a distinct language demands greater autonomy from the central government.", application:"Strong regional identity combined with perceived economic inequality creates a devolutionary pressure." },
    { unit:"U4", code:"4.9", title:"Challenges to Sovereignty", core:"Supranational organizations, globalization, separatist movements, multinational corporations, and cross-border flows can constrain or reshape state sovereignty.", scenario:"Member states agree to common trade rules that limit their ability to impose tariffs independently.", application:"Participation in a supranational arrangement trades some independent policy discretion for coordinated regional rules." },
    { unit:"U4", code:"4.10", title:"Consequences of Centrifugal and Centripetal Forces", core:"Centripetal forces promote political cohesion, while centrifugal forces weaken unity through division, inequality, separatism, or conflict.", scenario:"A state expands multilingual public services and revenue sharing after regional separatist parties gain support.", application:"The policies attempt to strengthen centripetal forces by reducing grievances that had fueled centrifugal pressure." }
  ]);
})();

// ---- consolidated from data/ap-human-geography-u5.js ----
// AP Human Geography profile layer — U5
(function () {
  "use strict";
  window.__APHUG_ADD_TOPICS__([
    { unit:"U5", code:"5.1", title:"Introduction to Agriculture", core:"Agricultural practices vary with climate, terrain, soils, markets, labor, technology, and cultural preferences.", scenario:"Mediterranean farmers specialize in olives, grapes, and vegetables adapted to dry summers and mild wet winters.", application:"The production pattern reflects the influence of regional climate on agricultural specialization." },
    { unit:"U5", code:"5.2", title:"Settlement Patterns and Survey Methods", core:"Rural settlement may be dispersed, clustered, or linear, and land-survey systems such as metes and bounds, township and range, and long lots shape field patterns.", scenario:"Long narrow farms extend back from a river so that many households have direct water access.", application:"The pattern is characteristic of long-lot survey systems designed to distribute access to a transportation corridor or river." },
    { unit:"U5", code:"5.3", title:"Agricultural Origins and Diffusions", core:"Plant and animal domestication began independently in several hearths and spread through migration, trade, and cultural diffusion.", scenario:"A crop first domesticated in one world region later becomes a staple on another continent after long-distance exchange.", application:"The new distribution reflects cultural diffusion of a domesticated crop from its original hearth." },
    { unit:"U5", code:"5.4", title:"The Second Agricultural Revolution", core:"Mechanization, crop rotation, selective breeding, and improved transportation increased agricultural productivity and supported urban-industrial growth.", scenario:"Farm output per worker rises sharply as machinery replaces hand labor and crop rotations improve soil productivity.", application:"These changes exemplify the productivity gains associated with the Second Agricultural Revolution." },
    { unit:"U5", code:"5.5", title:"The Green Revolution", core:"High-yield seeds, irrigation, fertilizers, pesticides, and mechanization raised food output in many developing regions but also produced uneven social and environmental effects.", scenario:"Grain yields double after farmers adopt high-yield varieties and irrigation, while groundwater use and fertilizer runoff increase.", application:"The outcome shows both higher food production and environmental costs associated with Green Revolution technologies." },
    { unit:"U5", code:"5.6", title:"Agricultural Production Regions", core:"Subsistence and commercial agricultural systems form regional patterns linked to climate, market access, labor intensity, and development levels.", scenario:"Large mechanized farms in a sparsely populated grassland region grow grain primarily for national and international markets.", application:"The system is extensive commercial agriculture shaped by abundant land, mechanization, and market orientation." },
    { unit:"U5", code:"5.7", title:"Spatial Organization of Agriculture", core:"Agricultural land use reflects transportation costs, perishability, land values, market distance, and the intensity of production.", scenario:"Highly perishable vegetables are grown near a large metropolitan market while extensive grazing occurs farther away.", application:"The pattern reflects differences in transport costs, perishability, and land-use intensity across distance from the market." },
    { unit:"U5", code:"5.8", title:"Von Thünen Model", core:"The von Thünen model predicts concentric agricultural land-use zones around a market based on transport cost, land rent, perishability, and intensity, while recognizing real-world departures.", scenario:"Dairy farming occupies high-value land near a city, while ranching occurs much farther from the market.", application:"The pattern is consistent with von Thünen because perishable intensive products can support higher land costs near the market." },
    { unit:"U5", code:"5.9", title:"The Global System of Agriculture", core:"Agriculture is embedded in global commodity chains shaped by trade, agribusiness, infrastructure, political relationships, and consumer demand.", scenario:"Fruit grown for export is processed by a multinational firm, shipped through a major port, and sold in distant supermarkets year-round.", application:"The example illustrates a global agricultural commodity chain linking production, processing, transport, and consumption." },
    { unit:"U5", code:"5.10", title:"Consequences of Agricultural Practices", core:"Agriculture can contribute to soil erosion, salinization, deforestation, water depletion, biodiversity loss, pollution, and greenhouse gas emissions.", scenario:"Repeated irrigation in an arid farming district raises the water table and leaves salts concentrated in the topsoil.", application:"The environmental consequence is salinization caused by irrigation and evaporation in a dry climate." },
    { unit:"U5", code:"5.11", title:"Challenges of Contemporary Agriculture", core:"Contemporary agriculture faces food insecurity, land degradation, climate risk, market volatility, sustainability concerns, and debates over technology and food access.", scenario:"A region produces enough calories overall, but low-income households cannot consistently afford nutritious food.", application:"The situation demonstrates that food insecurity can result from unequal access and purchasing power rather than an absolute shortage of food." },
    { unit:"U5", code:"5.12", title:"Women in Agriculture", core:"Women's roles in food production, processing, distribution, and land ownership vary geographically and are shaped by cultural norms, law, technology, and access to resources.", scenario:"Women provide most farm labor in a region but have limited legal access to land titles and agricultural credit.", application:"Unequal control of land and finance can constrain productivity and decision-making despite women's major role in food production." }
  ]);
})();

// ---- consolidated from data/ap-human-geography-u6-1.js ----
(function(){"use strict";window.__APHUG_ADD_TOPICS__([
{unit:"U6",code:"6.1",title:"The Origin and Influences of Urbanization",core:"Urbanization grows through agricultural surplus, industrialization, transportation, migration, and economic opportunity.",scenario:"A manufacturing corridor expands as rural workers move to cities for factory jobs.",application:"Industrial employment can accelerate rural-to-urban migration and city growth."},
{unit:"U6",code:"6.2",title:"Cities Across the World",core:"Urbanization levels and city forms vary by region because of development, history, migration, and economic structure.",scenario:"One country has a capital city many times larger than its second-largest city.",application:"The pattern is consistent with a primate-city system dominated by one major center."},
{unit:"U6",code:"6.3",title:"Cities and Globalization",core:"Global cities concentrate finance, headquarters, specialized services, communications, and international transport links.",scenario:"A metropolitan area hosts multinational headquarters, a major financial market, and a large international airport.",application:"Concentrated command functions and global connectivity are characteristic of a global city."}
]);})();

// ---- consolidated from data/ap-human-geography-u6-2a.js ----
(function(){"use strict";window.__APHUG_ADD_TOPICS__([
{unit:"U6",code:"6.4",title:"The Size and Distribution of Cities",core:"Urban systems can be described with rank-size relationships, primate-city patterns, central-place concepts, thresholds, and settlement hierarchies.",scenario:"The second-largest city has about half the population of the largest, the third about one-third, and the fourth about one-quarter.",application:"The pattern approximates the rank-size rule rather than strong primate-city dominance."},
{unit:"U6",code:"6.5",title:"The Internal Structure of Cities",core:"Urban land-use models such as concentric-zone, sector, and multiple-nuclei models explain recurring internal patterns while reflecting local history and geography.",scenario:"Higher-value housing extends outward from the central business district along a major transportation corridor.",application:"The wedge-shaped pattern is consistent with the sector model of urban land use."}
]);})();

// ---- consolidated from data/ap-human-geography-u6-2b.js ----
(function(){"use strict";window.__APHUG_ADD_TOPICS__([
{unit:"U6",code:"6.6",title:"Density and Land Use",core:"Population density, land values, zoning, transportation, and accessibility shape the intensity and spatial arrangement of urban land uses.",scenario:"Land near a transit hub contains high-rise apartments and offices while lower-density housing dominates farther away.",application:"High accessibility and land values near the hub encourage more intensive land use and higher density."},
{unit:"U6",code:"6.7",title:"Infrastructure",core:"Transportation, water, sanitation, energy, communications, schools, and other infrastructure influence urban development and connectivity.",scenario:"Peripheral neighborhoods grow faster than the municipal water and sewer network can expand.",application:"Infrastructure capacity can shape where urban growth is sustainable and how evenly services are available."}
]);})();

// ---- consolidated from data/ap-human-geography-u6-3a.js ----
(function(){"use strict";window.__APHUG_ADD_TOPICS__([
{unit:"U6",code:"6.8",title:"Urban Sustainability",core:"Smart growth, mixed-use development, public transit, walkability, green space, and compact design can reduce some environmental costs while creating tradeoffs.",scenario:"A city rezones land around rail stations for mixed-use apartments, shops, and offices while reducing parking requirements.",application:"The policy is transit-oriented development intended to concentrate growth near high-capacity public transportation."},
{unit:"U6",code:"6.9",title:"Urban Data",core:"Geographers use quantitative and qualitative urban data to examine housing, commuting, service access, land use, and socioeconomic patterns.",scenario:"Census tracts reveal that long commute times and low car ownership overlap in neighborhoods with infrequent transit service.",application:"Combining demographic and transportation data can identify a spatial mismatch in access to mobility."}
]);})();

// ---- consolidated from data/ap-human-geography-u6-3b.js ----
(function(){"use strict";window.__APHUG_ADD_TOPICS__([
{unit:"U6",code:"6.10",title:"Challenges of Urban Changes",core:"Suburbanization, decentralization, gentrification, disinvestment, segregation, and demographic shifts reshape metropolitan space.",scenario:"A formerly low-rent inner-city neighborhood attracts investment and higher-income residents while rents rise rapidly.",application:"The pattern is gentrification and may combine neighborhood reinvestment with displacement pressure on existing residents."},
{unit:"U6",code:"6.11",title:"Challenges of Urban Sustainability",core:"Urban sustainability is constrained by housing affordability, fragmented governance, environmental hazards, transportation dependence, and competing land-use priorities.",scenario:"A metropolitan region adopts climate goals, but many municipalities separately control zoning and transportation decisions.",application:"Fragmented governance can make regional sustainability policies difficult to coordinate across the metropolitan area."}
]);})();

// ---- consolidated from data/ap-human-geography-u7a.js ----
(function(){"use strict";window.__APHUG_ADD_TOPICS__([
{unit:"U7",code:"7.1",title:"The Industrial Revolution",core:"The Industrial Revolution concentrated mechanized production, transformed transport and energy use, and diffused outward from early industrial hearths.",scenario:"Factories cluster near coalfields and ports before later spreading along rail and shipping networks.",application:"Early industrial location reflects access to energy, transport, labor, and markets."},
{unit:"U7",code:"7.2",title:"Economic Sectors and Patterns",core:"Primary, secondary, tertiary, quaternary, and quinary activities occupy different roles in production and tend to vary with development and location.",scenario:"A regional economy shifts from mining and manufacturing toward finance, research, and professional services.",application:"The shift represents movement from primary and secondary activities toward higher-order service sectors."},
{unit:"U7",code:"7.3",title:"Measures of Development",core:"Development is measured with economic and social indicators such as income, education, health, life expectancy, and composite measures including the Human Development Index.",scenario:"Two countries have similar per-capita income, but one has much higher literacy and life expectancy.",application:"A multidimensional measure such as HDI would reveal development differences that income alone does not capture."},
{unit:"U7",code:"7.4",title:"Women and Economic Development",core:"Women's education, labor-force participation, political and economic access, and reproductive health are closely connected with development outcomes.",scenario:"Female secondary enrollment and formal employment rise while fertility declines and household incomes increase.",application:"Expanded educational and economic opportunities for women can accompany broader social and economic development."}
]);})();

// ---- consolidated from data/ap-human-geography-u7b.js ----
(function(){"use strict";window.__APHUG_ADD_TOPICS__([
{unit:"U7",code:"7.5",title:"Theories of Development",core:"Development theories include Rostow's stages, dependency theory, world-systems theory, and commodity-chain approaches, each emphasizing different mechanisms and scales.",scenario:"A country exports low-value raw materials while importing expensive manufactured goods from wealthier states.",application:"Dependency approaches emphasize how unequal exchange can reproduce differences between core and peripheral economies."},
{unit:"U7",code:"7.6",title:"Trade and the World Economy",core:"Comparative advantage, trade agreements, outsourcing, foreign direct investment, and global production networks connect places within an interdependent world economy.",scenario:"A company designs a product in one country, sources components from several others, and assembles it near a major export port.",application:"The production process is a global commodity chain organized across multiple specialized locations."},
{unit:"U7",code:"7.7",title:"Changes as a Result of the World Economy",core:"Global economic restructuring can produce deindustrialization, outsourcing, special economic zones, shifting labor demand, and new patterns of regional inequality.",scenario:"An older manufacturing city loses factory employment as production moves abroad while logistics and service jobs expand.",application:"The change illustrates deindustrialization and restructuring associated with an increasingly globalized economy."},
{unit:"U7",code:"7.8",title:"Sustainable Development",core:"Sustainable development seeks to improve human well-being while conserving resources and limiting long-term environmental damage, often requiring tradeoffs among economic, social, and environmental goals.",scenario:"A development program expands electricity access through distributed renewable generation while protecting a watershed used by local communities.",application:"The program combines development goals with resource conservation and long-term environmental stewardship."}
]);})();
// audit restart marker

// ---- consolidated from data/ap-human-geography-finalize.js ----
(function(){
  "use strict";
  if(typeof window.__APHUG_FINALIZE__!=="function") throw new Error("AP Human Geography builder missing");
  window.__APHUG_FINALIZE__();
  const bank=window.QUESTIONS_AP_HUMAN_GEOGRAPHY;
  const byTopic=new Map();
  bank.forEach(q=>{if(!byTopic.has(q.topicCode))byTopic.set(q.topicCode,[]);byTopic.get(q.topicCode).push(q);});
  const rotate=(correct,wrong,pos)=>{const o=wrong.slice(0,3);o.splice(pos,0,correct);return {o,c:[pos]};};
  const lower=s=>s.charAt(0).toLowerCase()+s.slice(1);
  const scenarioFor=code=>{
    const sibling=(byTopic.get(code)||[]).find(q=>q.id.endsWith("-02"));
    const m=sibling&&sibling.q.match(/scenario:\s*(.*?)\s*Which conclusion/i);
    return m?m[1]:`the geographic situation associated with Topic ${code}`;
  };
  bank.forEach(q=>{
    const seq=Number(q.id.slice(-2));
    const source=q.stimulus;
    const key=q.c[0];
    if(source&&source.type==="quantitative"){
      q.skill=seq===1?"3.A":seq===2?"3.B":"3.E";
      if(seq===1){
        Object.assign(q,rotate("A quantitative table comparing values for three geographic areas",["A qualitative interview transcript describing one resident's geographic experience","A reference map displaying named locations and transportation features","A landscape image showing visible land-use and settlement features"],key));
        q.q="Which type of geographic evidence is presented in the source?";
        q.e="The source is a table of numerical values organized by geographic area, so it is quantitative geographic data. The other choices describe qualitative text, a reference map, or a photograph rather than the evidence actually displayed.";
      } else if(seq===2){
        const rows=source.rows,a=Number(rows[0][1]),b=Number(rows[1][1]),c=Number(rows[2][1]);
        Object.assign(q,rotate(`Indicator A is highest in Area A (${a}) and lowest in Area C (${c}).`,[`Indicator A is highest in Area C (${c}) and lowest in Area A (${a}).`,`Area B (${b}) has a higher Indicator A value than Area A (${a}).`,`All three areas have the same Indicator A value.`],key));
        q.q="Which statement most accurately describes the pattern in Indicator A shown in the source?";
        q.e=`Area A has Indicator A = ${a}, Area B = ${b}, and Area C = ${c}; therefore Area A is highest and Area C is lowest. The competing statements reverse or ignore the numerical ordering in the table.`;
      } else {
        q.q=`What does the quantitative pattern most reasonably imply when interpreted in the geographic context of ${q.topic}?`;
      }
    } else if(source&&source.type==="visual"){
      q.skill=seq===1?"4.A":seq===2?"4.C":"4.E";
      if(seq===1){
        Object.assign(q,rotate("A qualitative description of a geographic landscape or spatial situation",["A numerical time series documenting annual change in a geographic indicator","A demographic table comparing population rates among several geographic areas","A mathematical model describing a relationship without a geographic source"],key));
        q.q="Which type of information is presented in the visual source description?";
        q.e="The source describes visible landscape or spatial features qualitatively. It does not present a numerical time series, a demographic table, or a context-free mathematical model, so visual-source analysis is required.";
      } else if(seq===2){
        q.q="Which geographic explanation best accounts for the pattern described in the visual source?";
      } else {
        q.q="Which statement best explains how the visual source relates to a broader geographic principle or process?";
      }
    } else if(seq===1){
      q.skill="1.D";
    } else if(seq===2){
      q.skill="2.B";
    } else {
      q.skill="5.B";
      const scenario=scenarioFor(q.topicCode);
      const correct=q.o[q.c[0]];
      q.q=`A geographer observes this local example: ${scenario} Which statement best explains the same geographic process when considered across local and regional scales?`;
      q.o=q.o.map(option=>`Across geographic scales, ${lower(option)}`);
      q.e=`${correct} The relevant process can be examined at more than one geographic scale; comparing local and regional patterns tests whether the same relationship remains visible when observations are aggregated or placed in a broader spatial context.`;
    }
  });
  delete window.__APHUG_FINALIZE__;
  delete window.__APHUG_ADD_TOPICS__;
})();
