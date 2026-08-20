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

  function otherValues(records, index, field) {
    const out=[];
    for(let step=1; out.length<3; step++) out.push(records[(index+step)%records.length][field]);
    return out;
  }

  function scenarioText(text) {
    return String(text).replace(/\s+Which\b.*$/i, "").trim();
  }

  function addUnit(records) {
    records.forEach((r,index) => {
      const competingTopics = otherValues(records,index,"title");
      const stimulus = {
        type:"text",
        title:"Original business scenario",
        text:`${scenarioText(r.scenario)} ${r.evidence}`,
        note:"Original synthetic business scenario; not a College Board case.",
        source:"AP Exam Practice original scenario.",
      };
      const groupId=`apbpf-topic-${r.code.replace(".","-")}`;
      const questions = [
        {
          id:`apbpf-${r.code.replace(".","-")}-2`, skill:"1.B", sequence:1,
          stem:"Which course topic best explains the situation?", field:"title", answer:r.title,
          explanation:`The situation is best explained by ${r.title}: ${r.concept} The competing choices name ${competingTopics.join(", ")}, which do not fit the scenario as directly.`,
        },
        {
          id:`apbpf-${r.code.replace(".","-")}-3`, skill:"1.B", sequence:2,
          stem:"Which interpretation is best supported by the situation?", field:"concept", answer:r.concept,
          explanation:`The evidence supports ${r.title} because ${r.concept} The competing interpretations describe ${competingTopics.join(", ")}, which do not fit the stated evidence as directly.`,
        },
        {
          id:`apbpf-${r.code.replace(".","-")}-4`, skill:"1.A", sequence:3,
          stem:"Which action is best supported by the situation?", field:"action", answer:r.action,
          explanation:`${r.action} is the action best supported by the situation because ${r.concept} The competing actions respond to different business problems.`,
        },
      ];
      questions.forEach((q) => {
        const distractors=otherValues(records,index,q.field);
        addQuestion({
          id:q.id, unit:r.unit, topicCode:r.code, topicName:r.title, skill:q.skill,
          personalFinance:false, stem:q.stem, options:[q.answer,...distractors],
          explanation:q.explanation, stimulusGroupId:groupId, sequence:q.sequence, stimulus,
        });
      });
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
