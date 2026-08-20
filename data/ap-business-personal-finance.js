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

  function otherRecords(records, index) {
    const out=[];
    for(let step=1; out.length<3; step++) out.push(records[(index+step)%records.length]);
    return out;
  }

  function scenarioText(text) {
    return String(text).replace(/\s+Which\b.*$/i, "").trim();
  }

  function actionExplanation(record) {
    return `${record.action} This action fits because ${record.concept}`;
  }

  function addUnit(records) {
    records.forEach((r,index) => {
      const competitors=otherRecords(records,index);
      const competingTopics=competitors.map(x=>x.title);
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
          stem:"Which description best characterizes the business or personal-finance concept illustrated by the scenario?",
          options:[r.concept,...competitors.map(x=>x.concept)],
          explanation:`The scenario illustrates ${r.title}: ${r.concept} The competing descriptions correspond to ${competingTopics.join(", ")}, which do not characterize the scenario as directly.`,
        },
        {
          id:`apbpf-${r.code.replace(".","-")}-3`, skill:"1.B", sequence:2,
          stem:"Which interpretation of the qualitative evidence in the scenario is best supported?",
          options:[r.evidence,...competitors.map(x=>x.evidence)],
          explanation:`The scenario supports this interpretation: ${r.evidence} That evidence is characteristic of ${r.title}; the competing interpretations fit different same-unit situations.`,
        },
        {
          id:`apbpf-${r.code.replace(".","-")}-4`, skill:"1.C", sequence:3,
          stem:"Which explanation best connects an appropriate action to the concept illustrated by the scenario?",
          options:[actionExplanation(r),...competitors.map(actionExplanation)],
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
