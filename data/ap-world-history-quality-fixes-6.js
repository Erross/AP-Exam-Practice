// AP World History: Modern — final clean-room ambiguity corrections.
// During final audit this layer also bridges the verified World configuration into the base registry.
// The metadata bridge must be consolidated into js/subjects.js before release.
(() => {
  "use strict";
  const bank=window.QUESTIONS_AP_WORLD_HISTORY;
  if(typeof AP_SUBJECTS!=="undefined"){
    const subject=AP_SUBJECTS.find(s=>s.id==="ap-world-history");
    if(!subject) throw new Error("Missing AP World subject registry entry");
    Object.assign(subject,{
      mcqCount:55,mcqTimeMinutes:55,totalExamTimeLabel:"3h 15m",formatVerified:true,releaseStatus:"draft",
      allowsMultiSelect:false,calculatorAllowed:false,
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
        {id:"U9",name:"Globalization",examWeight:5/55,examWeightRange:[0.08,0.10]}
      ],
      attributeRanges:{unit:{U1:[5,5],U2:[5,5],U3:[8,8],U4:[8,8],U5:[7,7],U6:[7,7],U7:[5,5],U8:[5,5],U9:[5,5]}},
      stimulusSetRange:[13,13],constraintDrawAttempts:30000,
      freeResponse:{timeMinutes:140,questions:["Short Answer 1","Short Answer 2","Short Answer 3","Document-Based Question","Long Essay"]},
      dataVar:"QUESTIONS_AP_WORLD_HISTORY"
    });
  }
  const R={
    "apworld-u6-resistance-03":[
      "Qing officials expanding treaty-port privileges in order to attract additional foreign investment",
      "Chinese reformers seeking stronger foreign missionary influence as a route to institutional modernization",
      "provincial leaders opposing the restoration of Qing authority after the dynasty had already fallen"
    ],
    "apworld-u9-reform-01":[
      "Campaigns defending hereditary political privilege against expanded citizenship rights",
      "Movements seeking to weaken workplace protections as international production expands",
      "Campaigns opposing broader political participation in order to preserve established authority"
    ],
    "apworld-u9-culture-01":[
      "Governments preventing most foreign cultural products from reaching domestic audiences",
      "Diaspora communities minimizing contact with surrounding societies and transnational media",
      "Local producers abandoning imported styles in favor of strict cultural separation"
    ],
    "apworld-u9-resistance-01":[
      "the claim that international trade has become too limited to influence domestic employment",
      "the view that multinational firms lack meaningful choices about where to invest or produce",
      "the argument that international financial rules have no effect on national policy choices"
    ]
  };
  for(const [id,distractors] of Object.entries(R)){
    const q=bank.find(x=>x.id===id); if(!q) throw new Error(`Missing AP World final ambiguity item ${id}`);
    const correct=q.o[q.c[0]], options=distractors.slice(); options.splice(q.c[0],0,correct); q.o=options;
  }
})();
