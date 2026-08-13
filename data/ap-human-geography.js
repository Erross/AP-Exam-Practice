// AP Human Geography — original, unofficial Section I practice bank.
// Current AP Central CED/exam page verified 2026-08-13.
// Section I: 60 MCQs / 60 minutes; approximately 30–40% stimulus-based.
(function () {
  "use strict";
  window.QUESTIONS_AP_HUMAN_GEOGRAPHY = [];
  const byUnitProfiles = new Map();
  const quantitative = new Set(["1.2","1.6","2.3","2.5","3.3","3.6","4.2","4.6","5.5","5.8","6.4","6.9","7.3","7.4"]);
  const visual = new Set(["1.1","1.4","2.1","2.10","3.2","3.4","4.4","4.10","5.2","5.7","6.5","6.10","7.1","7.6"]);
  const skillPairs = [["2.B","3.E"],["4.C","5.B"],["2.C","4.D"],["3.D","5.C"]];

  function rotateCorrect(correct, distractors, position) {
    const pool = distractors.filter((value) => value !== correct).slice(0, 3);
    while (pool.length < 3) pool.push("A different geographic process would be needed to support that conclusion.");
    const options = pool.slice();
    options.splice(position, 0, correct);
    return { options, correctIndex: position };
  }

  function makeStimulus(topic, index) {
    if (quantitative.has(topic.code)) {
      const high = 72 + (index % 13), middle = 46 + (index % 9), low = 21 + (index % 7);
      return {
        type: "quantitative",
        title: `Synthetic geographic indicators — Topic ${topic.code}`,
        source: `Original AP Exam Practice data. Context: ${topic.scenario}`,
        columns: ["Area", "Indicator A", "Indicator B"],
        rows: [["Area A", String(high), String(100-high)], ["Area B", String(middle), String(100-middle)], ["Area C", String(low), String(100-low)]],
      };
    }
    if (visual.has(topic.code)) {
      return { type: "visual", title: `Synthetic geographic scene — Topic ${topic.code}`, source: "Original AP Exam Practice description.", description: topic.scenario };
    }
    return null;
  }

  window.__APHUG_ADD_TOPICS__ = function (topics) {
    topics.forEach((topic) => {
      if (!byUnitProfiles.has(topic.unit)) byUnitProfiles.set(topic.unit, []);
      byUnitProfiles.get(topic.unit).push(topic);
    });

    topics.forEach((topic) => {
      const allUnit = byUnitProfiles.get(topic.unit);
      const topicIndex = Number(topic.code.split(".")[0]) * 20 + Number(topic.code.split(".")[1]);
      const pool = allUnit.filter((other) => other.code !== topic.code);
      const start = topicIndex % pool.length;
      const ds = [0,1,2].map((offset) => pool[(start + offset) % pool.length]);
      const stimulus = makeStimulus(topic, topicIndex);
      const groupId = stimulus ? `aphug-${stimulus.type}-${topic.code.replace(".","-")}` : null;
      const [skill2, skill3] = skillPairs[topicIndex % skillPairs.length];
      const q1 = rotateCorrect(topic.title, ds.map(x => x.title), (topicIndex*3)%4);
      const q2 = rotateCorrect(topic.application, ds.map(x => x.application), (topicIndex*3+1)%4);
      const q3 = rotateCorrect(topic.core, ds.map(x => x.core), (topicIndex*3+2)%4);
      const common = { unit: topic.unit, topicCode: topic.code, topic: topic.title, type: "s", stimulusGroupId: groupId, stimulus };
      window.QUESTIONS_AP_HUMAN_GEOGRAPHY.push(
        { ...common, id:`aphug-${topic.code.replace(".","-")}-01`, skill:"1.D", sequence:stimulus?1:undefined,
          q:stimulus?"Which AP Human Geography concept would a geographer most directly use to analyze the pattern or situation in the source?":`A geographer observes the following situation: ${topic.scenario} Which course concept most directly applies?`, o:q1.options, c:[q1.correctIndex],
          e:`${topic.application} This is the defining connection to ${topic.title}; the competing choices describe different processes or patterns within the same unit and do not best account for the stated evidence.` },
        { ...common, id:`aphug-${topic.code.replace(".","-")}-02`, skill:skill2, sequence:stimulus?2:undefined,
          q:stimulus?`Which conclusion is best supported when the source is interpreted in the context of ${topic.title}?`:`Consider this geographic scenario: ${topic.scenario} Which conclusion is best supported?`, o:q2.options, c:[q2.correctIndex],
          e:`${topic.application} The conclusion follows from the spatial relationship or geographic process described in the scenario. The other choices import consequences associated with different topics and are not supported by the evidence given.` },
        { ...common, id:`aphug-${topic.code.replace(".","-")}-03`, skill:skill3, sequence:stimulus?3:undefined,
          q:stimulus?"Which statement best explains the geographic significance of the source rather than merely describing it?":`Which statement best explains the geographic significance of ${topic.title}?`, o:q3.options, c:[q3.correctIndex],
          e:`${topic.core} That statement identifies the relevant geographic mechanism or relationship, whereas the alternatives accurately describe other course ideas but do not explain the topic named in the question.` }
      );
    });
  };
})();
