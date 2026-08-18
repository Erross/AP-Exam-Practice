// AP Environmental Science — release-quality wording hardening.
// Correct answers are tightened where the diagnostic found systematic length tells;
// distractors are softened only to remove conspicuous absolute-language giveaways.
(function(){
  "use strict";
  const bank=window.QUESTIONS_AP_ENVIRONMENTAL_SCIENCE||[];

  const conciseAnswers={
    // Repeated source-analysis tasks: same reasoning, less boilerplate.
    'apes-q-u3-a-03':'The data support comparison and association, but do not by themselves establish causation.',
    'apes-q-u3-b-03':'The data support comparison and association, but do not by themselves establish causation.',
    'apes-q-u4-a-03':'The data support comparison and association, but do not by themselves establish causation.',
    'apes-q-u5-a-03':'The data support comparison and association, but do not by themselves establish causation.',
    'apes-q-u5-b-03':'The data support comparison and association, but do not by themselves establish causation.',
    'apes-q-u6-a-03':'The data support comparison and association, but do not by themselves establish causation.',
    'apes-q-u8-a-03':'The data support comparison and association, but do not by themselves establish causation.',
    'apes-q-u8-b-03':'The data support comparison and association, but do not by themselves establish causation.',
    'apes-v-u1-a-02':'Infer from relationships shown without assuming omitted factors are irrelevant.',
    'apes-v-u2-a-02':'Infer from relationships shown without assuming omitted factors are irrelevant.',
    'apes-v-u4-a-02':'Infer from relationships shown without assuming omitted factors are irrelevant.',
    'apes-v-u4-b-02':'Infer from relationships shown without assuming omitted factors are irrelevant.',
    'apes-v-u5-a-02':'Infer from relationships shown without assuming omitted factors are irrelevant.',
    'apes-v-u7-a-02':'Infer from relationships shown without assuming omitted factors are irrelevant.',
    'apes-v-u9-a-02':'Infer from relationships shown without assuming omitted factors are irrelevant.',
    'apes-v-u9-b-02':'Infer from relationships shown without assuming omitted factors are irrelevant.',
    'apes-t-u5-a-02':'Compare the source’s evidence and assumptions with the environmental claim it makes.',
    'apes-t-u6-a-02':'Compare the source’s evidence and assumptions with the environmental claim it makes.',
    'apes-t-u8-a-02':'Compare the source’s evidence and assumptions with the environmental claim it makes.',
    'apes-t-u9-a-02':'Compare the source’s evidence and assumptions with the environmental claim it makes.',
    'apes-t-u5-a-03':'Outcome data are needed to determine whether the proposed environmental objective is achieved.',
    'apes-t-u6-a-03':'Outcome data are needed to determine whether the proposed environmental objective is achieved.',
    'apes-t-u8-a-03':'Outcome data are needed to determine whether the proposed environmental objective is achieved.',
    'apes-t-u9-a-03':'Outcome data are needed to determine whether the proposed environmental objective is achieved.',

    // Experimental-design tasks: retain treatment/control/constant logic without verbose procedural prose.
    'apes-exp2-u1':'Compare replicated buffer and no-buffer columns with equal soil, nitrate, rainfall, and timing.',
    'apes-exp2-u2':'Compare replicated groups across salinities while holding temperature, oxygen, and exposure time constant.',
    'apes-exp2-u3':'Compare replicated populations across food supplies with equal habitat volume and starting conditions.',
    'apes-exp2-u4':'Compare equal-slope soil trays across cover levels under identical rainfall, measuring sediment loss.',
    'apes-exp2-u5':'Compare irrigation methods on matched plots, measuring water applied and crop response.',
    'apes-exp2-u6':'Compare identical panels at several angles under the same light and temperature.',
    'apes-exp2-u7':'Compare matched chambers across ventilation rates with equal particle source, volume, and sampling duration.',
    'apes-exp2-u8':'Compare cultures across phosphate levels with equal light, temperature, volume, and starting density.',
    'apes-exp2-u9':'Compare coral fragments across temperatures while holding light, salinity, flow, and exposure time constant.',
    'apes-exp-u1':'Use replicated microcosms across nitrate levels plus a control, holding light, temperature, and starting algal density constant.',
    'apes-exp-u2':'Compare replicated plots across native-plant richness levels while holding plot area and observation effort constant.',
    'apes-exp-u3':'Compare replicated populations across measured food levels while holding initial population size and physical conditions constant.',
    'apes-exp-u4':'Compare replicated soil columns across defined textures with equal depth, water volume, and column dimensions.',
    'apes-exp-u5':'Compare matched drainage areas with and without rain gardens during similar storms using the same runoff measurement method.',
    'apes-exp-u6':'Compare matched model buildings with different insulation under identical starting and external temperatures.',
    'apes-exp-u7':'Compare replicated chambers across light intensities with equal precursor concentrations and temperature, then measure oxidants.',
    'apes-exp-u8':'Compare replicated groups across contaminant concentrations plus a control while holding water chemistry and exposure time constant.',
    'apes-exp-u9':'Compare replicated shell samples across controlled pH treatments while holding temperature, salinity, volume, and exposure time constant.',

    // Environmental-solution tasks: preserve the intervention mechanism without turning the key into a mini-rationale.
    'apes-sol2-u1-01':'Restore native vegetation and protect soil organic matter.',
    'apes-sol2-u1-02':'Match fertilizer to crop demand and capture excess nitrogen.',
    'apes-sol2-u1-03':'Use cover crops and buffers against erosion.',
    'apes-sol2-u2-03':'Control invasives while allowing native regeneration.',
    'apes-sol2-u3-02':'Protect nesting habitat during the high-mortality juvenile stage.',
    'apes-sol2-u3-03':'Plan schools, housing, water, and infrastructure for the large young cohort.',
    'apes-sol2-u3-04':'Expand education, opportunity, and voluntary access to contraception.',
    'apes-sol2-u4-02':'Reduce vehicle and industrial NOx and VOC emissions.',
    'apes-sol2-u4-03':'Site turbines using long-term wind data and circulation patterns.',
    'apes-sol2-u4-04':'Stabilize soil and slow runoff upstream.',
    'apes-sol2-u5-02':'Contain manure and apply at agronomic nutrient rates.',
    'apes-sol2-u5-03':'Reduce harvest and protect spawning periods.',
    'apes-sol2-u6-01':'Adopt efficiency standards and retrofit inefficient buildings and appliances.',
    'apes-sol2-u7-01':'Use cleaner trucks, electrification, and anti-idling rules.',
    'apes-sol2-u7-02':'Reduce NOx and VOC emissions from transportation and fuels.',
    'apes-sol2-u7-04':'Use quieter operations, zoning, insulation, and nighttime limits.',
    'apes-sol2-u8-01':'Limit pipe discharges and reduce field runoff.',
    'apes-sol2-u9-01':'Prevent refrigerant leaks and adopt lower-impact substitutes.',
    'apes-sol2-u9-03':'Clean, drain, and dry boats; monitor connected waters for invasives.',
    'apes-sol2-u9-04':'Protect breeding habitat, connectivity, and reduce dominant local stressors.'
  };

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
    if(conciseAnswers[q.id]) q.o[key]=conciseAnswers[q.id];
    q.o=q.o.map((option,index)=>{
      if(index===key) return option;
      let text=option;
      replacements.forEach(([pattern,value])=>{text=text.replace(pattern,value);});
      return text;
    });
  });
})();