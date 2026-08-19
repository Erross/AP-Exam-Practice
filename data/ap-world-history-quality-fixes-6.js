// AP World History: Modern — final clean-room ambiguity corrections.
(() => {
  "use strict";
  const bank=window.QUESTIONS_AP_WORLD_HISTORY;
  if(!Array.isArray(bank)) throw new Error("AP World bank must load before final ambiguity corrections");
  const R={
    "apworld-u5-atlantic-revolutions-03":[
      "hereditary aristocratic privilege remained influential in several postrevolutionary political systems",
      "property ownership continued to shape political participation in many postrevolutionary states",
      "slavery and coerced labor persisted in significant parts of the Atlantic world after political revolutions"
    ],
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
