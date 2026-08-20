// AP Business with Personal Finance — May 2027 original/synthetic practice bank.
// Unit layers call the helper below with topic-specific concepts, scenarios,
// evidence, actions, and distinctions. All scenarios/data are original unless a
// stimulus explicitly says otherwise.
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

  function addUnit(records) {
    records.forEach((r,index) => {
      const pf = new Set(r.pfVariants || []);
      const competingTopics = otherValues(records,index,"title");
      // Generated standalones stay within Concept Application. The action-choice
      // variant is 1.A rather than 1.C because it identifies an aligned
      // application but does not itself require a how/why explanation. Genuine
      // Entrepreneurship, Decision Making, and Communication tasks are authored
      // in source sets.
      const skills = ["1.A","1.B","1.B","1.A","1.A"];
      const variants = [
        { stem:`Which statement best explains ${r.title}?`, field:"concept", answer:r.concept,
          exp:`${r.concept} The competing choices describe ${competingTopics.join(", ")}, which address different course concepts rather than ${r.title}.` },
        { stem:r.scenario, field:"title", answer:r.title,
          exp:`${r.evidence} That pattern is characteristic of ${r.title}: ${r.concept}` },
        { stem:`A manager observes the following evidence: ${r.evidence} Which interpretation is best supported?`, field:"concept", answer:r.concept,
          exp:`The observation supports ${r.title} because ${r.concept} The competing interpretations describe ${competingTopics.join(", ")}, which do not fit the stated evidence as directly.` },
        { stem:`A decision maker wants to apply ${r.title}. Which action is best aligned with the concept?`, field:"action", answer:r.action,
          exp:`${r.action} is aligned with ${r.title} because ${r.concept} The competing actions address ${competingTopics.join(", ")} instead of the stated concept.` },
        { stem:`Which distinction about ${r.title} is most accurate?`, field:"contrast", answer:r.contrast,
          exp:`${r.contrast} This is the relevant boundary for ${r.title}; the competing distinctions concern ${competingTopics.join(", ")} instead.` },
      ];
      variants.forEach((v,vi) => {
        const distractors = otherValues(records,index,v.field);
        addQuestion({
          id:`apbpf-${r.code.replace(".","-")}-${vi+1}`,
          unit:r.unit, topicCode:r.code, topicName:r.title, skill:skills[vi],
          personalFinance:pf.has(vi+1), stem:v.stem,
          options:[v.answer,...distractors], explanation:v.exp,
          variantGroupId:`apbpf-${r.code.replace(".","-")}-standalone`,
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
