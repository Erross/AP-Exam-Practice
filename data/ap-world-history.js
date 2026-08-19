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

  function position(seed, sequence) {
    let h = sequence * 23;
    for (const ch of seed) h = (h * 33 + ch.charCodeAt(0)) >>> 0;
    return h % 4;
  }
  function makeQuestion(seed, unit, stimulus, item, sequence, gid) {
    if (!item.topic || !item.q || !item.correct || !Array.isArray(item.distractors) || item.distractors.length !== 3 || !item.e) throw new Error(`Malformed AP World item ${seed}`);
    const p = position(seed, sequence);
    const o = item.distractors.slice(); o.splice(p,0,item.correct);
    return { id:`apworld-${seed}-${String(sequence).padStart(2,'0')}`, unit, topic:item.topic, skill:String(item.skill||'1'), type:'s', q:item.q, o, c:[p], e:item.e, ...(gid?{stimulusGroupId:gid,stimulus}:{}), };
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
