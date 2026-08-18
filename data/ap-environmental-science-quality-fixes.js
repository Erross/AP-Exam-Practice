// AP Environmental Science — release-quality wording hardening.
// Distractors should be wrong because of environmental reasoning, not because
// absolute words make them conspicuous. Correct answers are never modified.
(function(){
  "use strict";
  const bank=window.QUESTIONS_AP_ENVIRONMENTAL_SCIENCE||[];
  const replacements=[
    [/\bnever\b/gi,"rarely"],
    [/\balways\b/gi,"generally"],
    [/\bevery\b/gi,"most"],
    [/\bonly\b/gi,"primarily"],
    [/\bentirely\b/gi,"largely"],
    [/\bunlimited\b/gi,"very high"],
    [/\bimpossible\b/gi,"unlikely"],
    [/\bguaranteed\b/gi,"expected"],
  ];
  bank.forEach((q)=>{
    const key=q.c&&q.c[0];
    if(!Array.isArray(q.o)||!Number.isInteger(key)) return;
    q.o=q.o.map((option,index)=>{
      if(index===key) return option;
      let text=option;
      replacements.forEach(([pattern,value])=>{text=text.replace(pattern,value);});
      return text;
    });
  });
})();
