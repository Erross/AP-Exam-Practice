// AP Business with Personal Finance — May 2027 original/synthetic practice bank.
// Unit layers call the helper below with topic-specific concepts, scenarios,
// evidence, and actions. All scenarios/data are original unless a stimulus
// explicitly says otherwise.
(() => {
  "use strict";
  const root = typeof window !== "undefined" ? window : globalThis;
  root.QUESTIONS_AP_BUSINESS_PERSONAL_FINANCE = [];
  const bank = root.QUESTIONS_AP_BUSINESS_PERSONAL_FINANCE;

  function rotate(options, correct, seed) {
    const shift = seed % 4;
    const out = Array(4);
    options.forEach((value, i) => { out[(i + shift) % 4] = value; });
    return { options: out, correct: [(correct + shift) % 4] };
  }

  function addQuestion(q) {
    const seed = [...q.id].reduce((n, ch) => n + ch.charCodeAt(0), 0);
    const keyed = rotate(q.options, 0, seed);
    bank.push({
      id:q.id, unit:q.unit, topicCode:q.topicCode, topicName:q.topicName,
      skill:q.skill, personalFinance:Boolean(q.personalFinance), type:"s",
      q:q.stem, o:keyed.options, c:keyed.correct, e:q.explanation,
      ...(q.variantGroupId ? { variantGroupId:q.variantGroupId } : {}),
      ...(q.stimulusGroupId ? { stimulusGroupId:q.stimulusGroupId, sequence:q.sequence, stimulus:q.stimulus } : {}),
    });
  }

  function wordCount(value) {
    return String(value || "").trim().split(/\s+/).filter(Boolean).length;
  }

  // Choose same-unit competitors that are naturally close in length to the key.
  // This improves parallel option construction without padding or shortening any
  // answer. A deterministic circular-distance tiebreaker keeps builds stable.
  function closestRecords(records, index, render) {
    const target = wordCount(render(records[index]));
    return records
      .map((record, candidateIndex) => ({
        record,
        candidateIndex,
        gap: Math.abs(wordCount(render(record)) - target),
        distance: (candidateIndex - index + records.length) % records.length,
      }))
      .filter(({ candidateIndex }) => candidateIndex !== index)
      .sort((a,b) => a.gap - b.gap || a.distance - b.distance)
      .slice(0,3)
      .map(({record}) => record);
  }

  function scenarioText(text) {
    return String(text).replace(/\s+Which\b.*$/i, "").trim();
  }

  const stemFamilies = {
    "1.A": [
      "Which description best characterizes the business or personal-finance concept illustrated by the scenario?",
      "Which description most accurately states the business or personal-finance concept shown in the scenario?",
      "Which description best captures the business or personal-finance concept at work in the scenario?",
      "Which description most precisely matches the business or personal-finance concept illustrated here?",
    ],
    "1.B": [
      "Which interpretation of the qualitative evidence in the scenario is best supported?",
      "Which interpretation is most consistent with the qualitative evidence in the scenario?",
      "Which interpretation best follows from the qualitative evidence provided in the scenario?",
      "Which interpretation most accurately reflects the qualitative evidence described in the scenario?",
    ],
    "1.C": [
      "Which explanation best connects an appropriate action to the concept illustrated by the scenario?",
      "Which explanation most clearly links an appropriate action to the concept illustrated by the scenario?",
      "Which explanation best shows why an action fits the concept illustrated by the scenario?",
      "Which explanation best relates a proposed action to the concept illustrated by the scenario?",
    ],
  };

  const actionLinks = [
    (record) => `${record.action} This action fits because ${record.concept}`,
    (record) => `${record.action} This response is appropriate because ${record.concept}`,
    (record) => `${record.action} This course of action is supported because ${record.concept}`,
    (record) => `${record.action} This approach fits because ${record.concept}`,
  ];

  function addUnit(records) {
    records.forEach((r,index) => {
      const stemIndex=index%stemFamilies["1.A"].length;
      const actionExplanation=actionLinks[stemIndex];
      const conceptCompetitors=closestRecords(records,index,x=>x.concept);
      const evidenceCompetitors=closestRecords(records,index,x=>x.evidence);
      const actionCompetitors=closestRecords(records,index,actionExplanation);
      const stimulus = {
        type:"text",
        title:"Original business scenario",
        text:scenarioText(r.scenario),
        note:"Original synthetic business scenario; not a College Board case.",
        source:"AP Exam Practice original scenario.",
      };
      const groupId=`apbpf-topic-${r.code.replace(".","-")}`;
      const questions = [
        {
          id:`apbpf-${r.code.replace(".","-")}-2`, skill:"1.A", sequence:1,
          stem:stemFamilies["1.A"][stemIndex],
          options:[r.concept,...conceptCompetitors.map(x=>x.concept)],
          explanation:`The scenario illustrates ${r.title}: ${r.concept} The competing descriptions are same-unit concepts but do not characterize this scenario as directly.`,
        },
        {
          id:`apbpf-${r.code.replace(".","-")}-3`, skill:"1.B", sequence:2,
          stem:stemFamilies["1.B"][stemIndex],
          options:[r.evidence,...evidenceCompetitors.map(x=>x.evidence)],
          explanation:`The scenario supports this interpretation: ${r.evidence} The competing interpretations describe other plausible same-unit situations rather than the evidence in this scenario.`,
        },
        {
          id:`apbpf-${r.code.replace(".","-")}-4`, skill:"1.C", sequence:3,
          stem:stemFamilies["1.C"][stemIndex],
          options:[actionExplanation(r),...actionCompetitors.map(actionExplanation)],
          explanation:`${r.action} is appropriate here because ${r.concept} The other choices pair actions with explanations suited to different business problems rather than this scenario.`,
        },
      ];
      questions.forEach((q) => addQuestion({
        id:q.id, unit:r.unit, topicCode:r.code, topicName:r.title, skill:q.skill,
        personalFinance:false, stem:q.stem, options:q.options,
        explanation:q.explanation, stimulusGroupId:groupId, sequence:q.sequence, stimulus,
      }));
    });
  }

  function addSet(config) {
    config.questions.forEach((q,index) => addQuestion({
      id:`${config.id}-${index+1}`, unit:config.unit, topicCode:q.topicCode,
      topicName:q.topicName, skill:q.skill, personalFinance:Boolean(q.personalFinance),
      stem:q.stem, options:[q.answer,...q.distractors], explanation:q.explanation,
      stimulusGroupId:config.id, sequence:index+1, stimulus:config.stimulus,
    }));
  }

  root.__APBPF_ADD_UNIT__ = addUnit;
  root.__APBPF_ADD_SET__ = addSet;
})();
