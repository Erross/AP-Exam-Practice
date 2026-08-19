// AP World History: Modern — original, unofficial Section I practice bank.
// Current May 2027 target. Course content and MCQ format verified 2026-08-19
// against AP Central and the AP World History: Modern Course at a Glance.
// Section I Part A: 55 questions / 55 minutes / 40%; questions usually appear
// in 3–4 question sets using historical text, interpretation, image, graph, map,
// and other evidence. Sources here are newly written practice material unless
// explicitly identified otherwise.
(() => {
  "use strict";
  window.QUESTIONS_AP_WORLD_HISTORY = [];

  if (typeof AP_SUBJECTS !== "undefined") {
    const subject = AP_SUBJECTS.find((s) => s.id === "ap-world-history");
    if (!subject) throw new Error("AP World History registry entry missing");
    Object.assign(subject, {
      mcqCount: 55,
      mcqTimeMinutes: 55,
      totalExamTimeLabel: "3h 15m",
      formatVerified: true,
      releaseStatus: "draft",
      allowsMultiSelect: false,
      calculatorAllowed: false,
      tierNote: "Source-based Section I Part A practice only. The official fully digital exam also includes three short-answer questions, a document-based question, and a long essay.",
      units: [
        {id:"U1",name:"The Global Tapestry",examWeight:5/55,examWeightRange:[0.08,0.10]},
        {id:"U2",name:"Networks of Exchange",examWeight:5/55,examWeightRange:[0.08,0.10]},
        {id:"U3",name:"Land-Based Empires",examWeight:8/55,examWeightRange:[0.12,0.15]},
        {id:"U4",name:"Transoceanic Interconnections",examWeight:8/55,examWeightRange:[0.12,0.15]},
        {id:"U5",name:"Revolutions",examWeight:7/55,examWeightRange:[0.12,0.15]},
        {id:"U6",name:"Consequences of Industrialization",examWeight:7/55,examWeightRange:[0.12,0.15]},
        {id:"U7",name:"Global Conflict",examWeight:5/55,examWeightRange:[0.08,0.10]},
        {id:"U8",name:"Cold War and Decolonization",examWeight:5/55,examWeightRange:[0.08,0.10]},
        {id:"U9",name:"Globalization",examWeight:5/55,examWeightRange:[0.08,0.10]},
      ],
      stimulusSetRange: [13,13],
      attributeRanges: {unit:{U1:[5,5],U2:[5,5],U3:[8,8],U4:[8,8],U5:[7,7],U6:[7,7],U7:[5,5],U8:[5,5],U9:[5,5]}},
      constraintDrawAttempts: 30000,
      freeResponse: {timeMinutes:140,questions:["Short Answer 1","Short Answer 2","Short Answer 3","Document-Based Question","Long Essay"]},
      dataVar: "QUESTIONS_AP_WORLD_HISTORY",
    });
  }

  const unitQualifiers={
    U1:["within the c. 1200–1450 regional order","amid expanding state institutions","within established Afro-Eurasian political traditions","during the era of regional state building","within premodern agrarian societies","amid growing interregional exchange"],
    U2:["within the c. 1200–1450 exchange system","along expanding interregional trade networks","amid intensified Eurasian and Indian Ocean connectivity","within merchant and diasporic communities","during the Mongol-era expansion of exchange","across established caravan and maritime routes"],
    U3:["within early modern land-based empires","during c. 1450–1750 imperial consolidation","amid gunpowder-era state building","within multiethnic Eurasian empires","during expanding dynastic administration","amid competition among territorial states"],
    U4:["within early modern transoceanic expansion","during c. 1450–1750 maritime empire building","amid Atlantic and Indian Ocean commercial rivalry","within the Columbian Exchange era","during expanding plantation and colonial economies","amid growing state-backed oceanic trade"],
    U5:["during the age of revolutions and industrialization","within c. 1750–1900 political transformation","amid expanding industrial capitalism","during nineteenth-century nationalist change","within the first industrial age","amid challenges to inherited political authority"],
    U6:["within nineteenth-century imperial expansion","during c. 1750–1900 global economic integration","amid industrial-era migration and empire","within export-oriented colonial economies","during the new imperialism","amid expanding long-distance labor migration"],
    U7:["within the era of global conflict","during the first half of the twentieth century","amid mass politics and industrial warfare","within the interwar international order","during total-war mobilization","amid shifting global power after 1900"],
    U8:["within Cold War and decolonization politics","during the post-1945 international order","amid nationalist decolonization movements","within superpower ideological rivalry","during the rise of newly independent states","amid challenges to established political orders"],
    U9:["within the contemporary globalization era","during accelerating post-1900 global exchange","amid expanding transnational institutions","within increasingly integrated world markets","during rapid communications and transport change","amid debates over globalization and inequality"],
  };

  const rationaleRepairs = {
    "apworld-u1-islamic-03":"Trade routes, pilgrimage, and scholarly mobility carried ideas across political borders, while shared Islamic legal, religious, and intellectual institutions connected cities even after Abbasid political fragmentation.",
    "apworld-u1-africa-01":"Mali's rulers benefited from control of gold-producing regions and taxation of trans-Saharan commerce in gold and salt, revenues that supported state power and centers of Islamic learning such as Timbuktu.",
    "apworld-u2-indianocean-01":"Predictable seasonal reversals of the monsoon winds let sailors schedule outbound and return voyages across the Indian Ocean, reducing uncertainty and supporting regular long-distance maritime commerce.",
    "apworld-u2-sahara-02":"West African states such as Ghana, Mali, and Songhai profited by taxing gold, salt, and other goods moving through market towns and caravan routes, using those revenues to sustain rulers, armies, and administration.",
    "apworld-u3-mughal-03":"Monumental architecture, court ceremony, and artistic patronage displayed Mughal wealth and authority, helping emperors communicate dynastic legitimacy and imperial grandeur to a religiously and ethnically diverse population.",
    "apworld-u4-columbian-02":"American crops such as maize and potatoes expanded caloric supplies and cultivation options in parts of Afro-Eurasia, contributing over time to population growth while producing uneven regional effects.",
    "apworld-u4-maritime-empires-02":"Chartered companies combined state-granted monopolies and trading privileges with armed ships, forts, and territorial authority, blurring the boundary between private commerce and imperial expansion.",
    "apworld-u4-atlantic-labor-02":"Atlantic slave systems increasingly used law to tie enslaved status to African ancestry and make that status hereditary, hardening racial categories as plantation economies expanded.",
    "apworld-u4-resistance-02":"Maroon communities challenged plantation authority by escaping enslavement, establishing autonomous settlements, and sometimes using armed resistance or negotiated treaties to defend their independence.",
    "apworld-u4-resistance-03":"Colonial hierarchies were never uncontested: Indigenous, enslaved, and mixed-status communities resisted through rebellion, flight, negotiation, litigation, cultural persistence, and other strategies.",
    "apworld-u5-atlantic-revolutions-01":"Atlantic revolutionaries drew on Enlightenment ideas of natural rights and popular sovereignty while also responding to local grievances over monarchy, taxation, colonial rule, social privilege, and slavery.",
    "apworld-u5-industrial-beginnings-02":"Steam power transformed transportation by driving railways and steamships, reducing dependence on animal power and favorable winds while lowering travel times and shipping costs.",
    "apworld-u5-industrial-spread-03":"Railways reduced transport time and cost, connected mines and farms to factories and ports, encouraged migration, and helped states and businesses integrate larger regional markets.",
    "apworld-u5-nationalism-01":"Nineteenth-century nationalism linked claims of shared language, history, or culture to political sovereignty, supporting both unification movements such as Italy and Germany and separatist struggles inside empires.",
    "apworld-u6-africa-asia-01":"Industrial powers used steam transport, modern weapons, medicine, finance, and larger bureaucracies to project military and economic power, expanding both formal colonies and informal influence across Africa and Asia.",
    "apworld-u6-africa-asia-03":"Meiji leaders pursued state-led industrial and military modernization, and Japan's victories over China and Russia helped it become an imperial power with expanding influence in Korea, Taiwan, and East Asia.",
    "apworld-u6-resistance-01":"Anti-imperial resistance produced different outcomes: Ethiopia defeated Italy at Adwa, while movements such as the Boxer uprising were defeated, showing how local military capacity and geopolitics shaped results.",
    "apworld-u6-global-economy-03":"Steam transport, international finance, and industrial demand tied distant producers more tightly to global markets, encouraging commodity specialization while also increasing exposure to external price and demand shifts.",
    "apworld-u6-migration-causes-03":"Diasporic communities maintained kinship, religious, commercial, and remittance networks between places of origin and destination, helping migrants preserve ties while building new communities abroad.",
    "apworld-u6-migration-effects-03":"Large-scale migration encouraged cultural exchange and hybrid communities, but it also provoked racialized nativism, exclusion laws, labor conflict, and violence in many receiving societies.",
    "apworld-u6-migration-effects-04":"Plantations, mines, railways, ports, and industrial enterprises created strong demand for mobile labor, drawing free, indentured, and contract migrants across regions after the decline of legal Atlantic slavery.",
    "apworld-u7-interwar-03":"Germany, Italy, and Japan pursued territorial expansion in Europe, Africa, and Asia, undermining the League of Nations and collective-security arrangements and helping push the international system toward World War II.",
    "apworld-u7-total-war-01":"World War II mobilized entire societies through conscription, rationing, industrial planning, propaganda, expanded women's labor, and the targeting of civilian populations as well as military forces.",
    "apworld-u7-interwar-economy-01":"International banking, credit, and trade links transmitted the Depression across borders as bank failures, falling demand, debt, and credit contraction spread; protectionist tariffs further reduced world trade.",
    "apworld-u7-mass-atrocity-01":"The Holocaust was a systematic, state-directed genocide in which Nazi Germany and collaborators used discriminatory law, deportation, mass shootings, ghettos, and killing centers to murder six million Jews while also persecuting and killing other targeted groups.",
    "apworld-u8-communism-02":"Chinese communists built substantial rural support through organization, land-reform promises, and wartime resistance while prolonged civil war, Japanese invasion, and Nationalist weaknesses reshaped the balance of power.",
    "apworld-u8-communism-03":"Cold War interventions interacted with local nationalism, civil wars, class conflict, and decolonization rather than replacing them, so conflicts such as Korea and Vietnam had both superpower and indigenous causes.",
    "apworld-u8-cold-war-end-03":"The Cold War ended through interacting pressures including Soviet economic stagnation, Gorbachev's reforms, Eastern European protest movements, nationalist pressures inside the USSR, and changing superpower diplomacy.",
    "apworld-u8-korea-01":"The Korean War began as a conflict on the divided peninsula but escalated into a major Cold War confrontation when U.S.-led UN forces and later Chinese forces intervened on opposing sides.",
    "apworld-u9-disease-02":"Because pathogens move through increasingly dense global travel networks, public-health responses rely on cross-border surveillance, research, vaccination, information sharing, and institutions such as the World Health Organization.",
  };

  function position(seed, sequence) {
    let h = sequence * 23;
    for (const ch of seed) h = (h * 33 + ch.charCodeAt(0)) >>> 0;
    return h % 4;
  }
  const wordCount=s=>String(s).trim().split(/\s+/).filter(Boolean).length;
  function soften(value){
    return String(value)
      .replace(/\ball\b/gi,"most").replace(/\balways\b/gi,"typically")
      .replace(/\bnever\b/gi,"rarely").replace(/\bnone\b/gi,"few")
      .replace(/\bonly\b/gi,"primarily").replace(/\bentirely\b/gi,"largely")
      .replace(/\bcompletely\b/gi,"substantially").replace(/\bimmediately\b/gi,"rapidly")
      .replace(/\bevery\b/gi,"most");
  }
  function competitiveDistractors(unit,seed,sequence,correct,distractors){
    const clauses=unitQualifiers[unit]||[], target=Math.max(6,wordCount(correct)-1), used=new Set();
    return distractors.map((raw,index)=>{
      let text=soften(raw);
      if(wordCount(text)>=target||!clauses.length) return text;
      let i=position(`${seed}-${index}`,sequence+index)%clauses.length;
      while(used.has(i)&&used.size<clauses.length) i=(i+1)%clauses.length;
      used.add(i); text=`${text}, ${clauses[i]}`;
      if(wordCount(text)<target&&used.size<clauses.length){
        let j=(i+3)%clauses.length;
        while(used.has(j)&&used.size<clauses.length) j=(j+1)%clauses.length;
        if(!used.has(j)){used.add(j);text=`${text}, ${clauses[j]}`;}
      }
      return text;
    });
  }
  function makeQuestion(seed, unit, stimulus, item, sequence, gid) {
    if (!item.topic || !item.q || !item.correct || !Array.isArray(item.distractors) || item.distractors.length !== 3 || !item.e) throw new Error(`Malformed AP World item ${seed}`);
    const p = position(seed, sequence);
    const o = competitiveDistractors(unit,seed,sequence,item.correct,item.distractors); o.splice(p,0,item.correct);
    const id=`apworld-${seed}-${String(sequence).padStart(2,'0')}`;
    return { id, unit, topic:item.topic, topicCode:item.topic, skill:String(item.skill||'1'), type:'s', q:item.q, o, c:[p], e:rationaleRepairs[id]||item.e, ...(gid?{stimulusGroupId:gid,stimulus}:{}), };
  }
  window.__APWORLD_ADD_SET__ = function(def) {
    if (!def || !def.id || !def.unit || !def.stimulus || !Array.isArray(def.questions) || def.questions.length<3 || def.questions.length>4) throw new Error('Malformed AP World set');
    const gid=`apworld-${def.id}`;
    const stimulus={type:def.stimulus.type||'text',title:def.stimulus.title,source:def.stimulus.source||'Original AP Exam Practice synthetic source.',text:def.stimulus.text,description:def.stimulus.description,columns:def.stimulus.columns,rows:def.stimulus.rows,image:def.stimulus.image,alt:def.stimulus.alt};
    def.questions.forEach((q,i)=>window.QUESTIONS_AP_WORLD_HISTORY.push(makeQuestion(def.id,def.unit,stimulus,q,i+1,gid)));
  };
  window.__APWORLD_ADD_STANDALONE__ = function(def) {
    window.QUESTIONS_AP_WORLD_HISTORY.push(makeQuestion(def.id,def.unit,null,def,1,null));
  };
})();
