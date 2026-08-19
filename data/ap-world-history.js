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

  // This base layer is already loaded immediately after js/subjects.js in the
  // browser. Keep the verified draft registry metadata browser-effective here
  // until final promotion; isolated bank tests intentionally do not expose the
  // lexical AP_SUBJECTS binding, so the guard preserves standalone test loading.
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
    return { id:`apworld-${seed}-${String(sequence).padStart(2,'0')}`, unit, topic:item.topic, topicCode:item.topic, skill:String(item.skill||'1'), type:'s', q:item.q, o, c:[p], e:item.e, ...(gid?{stimulusGroupId:gid,stimulus}:{}), };
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
