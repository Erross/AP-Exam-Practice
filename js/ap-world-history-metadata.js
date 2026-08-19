// AP World History: Modern — verified May 2027 draft metadata.
// Development overlay; consolidate into js/subjects.js before release.
(() => {
  "use strict";
  const subject=(window.AP_SUBJECTS||[]).find(s=>s.id==="ap-world-history");
  if(!subject) throw new Error("AP World History registry entry missing");
  Object.assign(subject,{
    mcqCount:55,
    mcqTimeMinutes:55,
    totalExamTimeLabel:"3h 15m",
    formatVerified:true,
    releaseStatus:"draft",
    allowsMultiSelect:false,
    calculatorAllowed:false,
    tierNote:"Source-based Section I Part A practice only. The official fully digital exam also includes three short-answer questions, a document-based question, and a long essay.",
    units:[
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
    stimulusSetRange:[13,13],
    attributeRanges:{unit:{U1:[5,5],U2:[5,5],U3:[8,8],U4:[8,8],U5:[7,7],U6:[7,7],U7:[5,5],U8:[5,5],U9:[5,5]}},
    constraintDrawAttempts:30000,
    freeResponse:{timeMinutes:140,questions:["Short Answer 1","Short Answer 2","Short Answer 3","Document-Based Question","Long Essay"]},
    dataVar:"QUESTIONS_AP_WORLD_HISTORY",
  });
})();
