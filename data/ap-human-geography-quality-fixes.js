// Clean-room quality layer: make the declared skill family match the task actually performed.
(function(){
  "use strict";
  const bank=window.QUESTIONS_AP_HUMAN_GEOGRAPHY;
  if(!Array.isArray(bank)) throw new Error("AP Human Geography bank missing");
  const byTopic=new Map();
  bank.forEach(q=>{if(!byTopic.has(q.topicCode))byTopic.set(q.topicCode,[]);byTopic.get(q.topicCode).push(q);});
  const rotate=(correct,wrong,pos)=>{const o=wrong.slice(0,3);o.splice(pos,0,correct);return {o,c:[pos]};};
  const keyPos=q=>q.c[0];
  const lower=s=>s.charAt(0).toLowerCase()+s.slice(1);
  const scenarioFor=code=>{
    const sibling=(byTopic.get(code)||[]).find(q=>q.id.endsWith("-02"));
    const m=sibling&&sibling.q.match(/scenario:\s*(.*?)\s*Which conclusion/i);
    return m?m[1]:`the geographic situation associated with Topic ${code}`;
  };

  bank.forEach(q=>{
    const seq=Number(q.id.slice(-2));
    const stimulus=q.stimulus;
    if(stimulus&&stimulus.type==="quantitative"){
      q.skill=seq===1?"3.A":seq===2?"3.B":"3.E";
      if(seq===1){
        Object.assign(q,rotate(
          "A quantitative table comparing values for three geographic areas",
          ["A qualitative interview transcript from one resident","A reference map showing only named locations","A landscape photograph without numerical attributes"],keyPos(q)));
        q.q="Which type of geographic evidence is presented in the source?";
        q.e="The source is a table of numerical values organized by geographic area, so it is quantitative geographic data. The other choices describe qualitative text, a reference map, or a photograph rather than the evidence actually displayed.";
      } else if(seq===2){
        const rows=stimulus.rows, a=Number(rows[0][1]), b=Number(rows[1][1]), c=Number(rows[2][1]);
        Object.assign(q,rotate(
          `Indicator A is highest in Area A (${a}) and lowest in Area C (${c}).`,
          [`Indicator A is highest in Area C (${c}) and lowest in Area A (${a}).`,`Area B (${b}) has a higher Indicator A value than Area A (${a}).`,`All three areas have the same Indicator A value.`],keyPos(q)));
        q.q="Which statement most accurately describes the pattern in Indicator A shown in the source?";
        q.e=`Area A has Indicator A = ${a}, Area B = ${b}, and Area C = ${c}; therefore Area A is highest and Area C is lowest. The competing statements reverse or ignore the numerical ordering in the table.`;
      } else {
        q.q=`What does the quantitative pattern most reasonably imply when interpreted in the geographic context of ${q.topic}?`;
        q.e=q.e.replace("The conclusion follows from the spatial relationship or geographic process described in the scenario.","The conclusion connects the numerical pattern in the source to the relevant geographic process rather than merely restating a value.");
      }
      return;
    }
    if(stimulus&&stimulus.type==="visual"){
      q.skill=seq===1?"4.A":seq===2?"4.C":"4.E";
      if(seq===1){
        Object.assign(q,rotate(
          "A qualitative description of a geographic landscape or spatial situation",
          ["A numerical time series measuring annual change","A table of demographic rates for several countries","A mathematical model with no geographic context"],keyPos(q)));
        q.q="Which type of information is presented in the visual source description?";
        q.e="The source describes visible landscape or spatial features qualitatively. It does not present a numerical time series, a demographic table, or a context-free mathematical model, so visual-source analysis is required.";
      } else if(seq===2){
        q.q=`Which geographic explanation best accounts for the pattern described in the visual source?`;
        q.e=q.e.replace("The conclusion follows from the spatial relationship or geographic process described in the scenario.","The explanation links a feature described in the visual source to the geographic process that would produce that pattern.");
      } else {
        q.q="Which statement best explains how the visual source relates to a broader geographic principle or process?";
      }
      return;
    }

    if(seq===1){ q.skill="1.D"; return; }
    if(seq===2){ q.skill="2.B"; return; }
    q.skill="5.B";
    const scenario=scenarioFor(q.topicCode);
    q.q=`A geographer observes this local example: ${scenario} Which statement best explains the same geographic process when considered across local and regional scales?`;
    const correct=q.o[q.c[0]];
    q.o=q.o.map(option=>`Across geographic scales, ${lower(option)}`);
    q.e=`${correct} The relevant process can be examined at more than one geographic scale; comparing local and regional patterns tests whether the same relationship remains visible when observations are aggregated or placed in a broader spatial context.`;
  });
})();
