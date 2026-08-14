(() => {
  "use strict";
  const profiles = window.__APAH_PROFILES || [];
  const unknowns = window.__APAH_UNKNOWN_PROFILES || [];
  const byUnit = new Map();
  profiles.forEach((p) => {
    if (!byUnit.has(p.unit)) byUnit.set(p.unit, []);
    byUnit.get(p.unit).push(p);
  });

  const asset = (key) => `assets/ap-art-history/${key}.jpg`;
  const sourceNote = "Open/public-domain or freely reusable image; detailed provenance is recorded with the local Art History asset library.";

  function unique(values) {
    return [...new Set(values.filter(Boolean))];
  }

  function rotateOptions(correct, distractors, seed) {
    const wrong = unique(distractors).filter((x) => x !== correct).slice(0, 3);
    if (wrong.length < 3) throw new Error(`Not enough distinct distractors for ${correct}`);
    const c = Math.abs(seed) % 4;
    const o = wrong.slice();
    o.splice(c, 0, correct);
    return { o, c:[c] };
  }

  function peersFor(p) {
    const same = (byUnit.get(p.unit) || []).filter((x) => x !== p);
    if (same.length >= 3) return same;
    return profiles.filter((x) => x !== p);
  }

  function makeQuestion({ id, unit, skill, q, correct, distractors, explanation, groupId, stimulus, sequence, workNo }) {
    const seed = [...id].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
    const { o, c } = rotateOptions(correct, distractors, seed);
    const item = { id, unit, type:"s", q, o, c, e:explanation, skill };
    item.topicCode = Number.isInteger(workNo)
      ? `PIS-${String(workNo).padStart(3,"0")}`
      : `${unit}-UNKNOWN`;
    if (workNo) item.workNo = workNo;
    if (groupId) item.stimulusGroupId = groupId;
    if (stimulus) item.stimulus = stimulus;
    if (Number.isInteger(sequence)) item.sequence = sequence;
    return item;
  }

  const questions = [];
  profiles.forEach((p, index) => {
    const peers = peersFor(p);
    const visualPool = peers.map((x) => x.visual);
    const contextPool = peers.map((x) => x.context);
    const traditionPool = peers.map((x) => x.tradition);
    const interpretationPool = peers.map((x) => x.interpretation);
    const groupId = p.imageKey ? `aparth-work-${String(p.n).padStart(3,"0")}` : null;
    const stimulus = p.imageKey ? {
      type:"visual",
      title:`Image-set work: ${p.title}`,
      image:asset(p.imageKey),
      alt:`${p.alt || `Reproduction of ${p.title}`}. Image provided for formal and contextual analysis of the work.`,
      description:`${p.title}. ${p.maker}. ${p.date}. ${p.medium}.`,
      source:sourceNote,
    } : null;

    questions.push(makeQuestion({
      id:`aparth-u${p.unit.slice(1)}-${String(p.n).padStart(3,"0")}-q1`, unit:p.unit,
      skill:p.imageKey ? "1" : "2",
      q:p.imageKey
        ? `Which observed feature most strongly supports a formal analysis of ${p.title}?`
        : `Which contextual statement most directly helps explain the production or reception of ${p.title}?`,
      correct:p.imageKey ? p.visual : p.context,
      distractors:p.imageKey ? visualPool : contextPool,
      explanation:p.imageKey
        ? `${p.title} is characterized by ${p.visual}. That observation addresses visible form rather than importing an unrelated historical claim.`
        : `${p.context}. This context directly bears on why ${p.title} was made, used, or understood in its historical setting.`,
      groupId, stimulus, sequence:p.imageKey ? 1 : undefined, workNo:p.n,
    }));

    questions.push(makeQuestion({
      id:`aparth-u${p.unit.slice(1)}-${String(p.n).padStart(3,"0")}-q2`, unit:p.unit,
      skill:"2",
      q:`Which contextual explanation best connects ${p.title}'s historical setting to an artistic decision in the work?`,
      correct:`${p.context}; this context helps explain ${p.visual}.`,
      distractors:peers.map((x) => `${x.context}; this context helps explain ${x.visual}.`),
      explanation:`${p.context}. That setting is materially connected to the artistic choice that ${p.visual}, so the item requires contextual analysis rather than merely naming a historical fact.`,
      groupId, stimulus, sequence:p.imageKey ? 2 : undefined, workNo:p.n,
    }));

    const peer = peers[index % peers.length];
    const otherPeer = peers[(index + 1) % peers.length];
    const comparisonMode = index % 3;
    let comparisonQuestion, correctComparison, comparisonDistractors, comparisonExplanation;
    if (comparisonMode === 0) {
      comparisonQuestion = `Which comparison most accurately relates the functions of ${p.title} and ${peer.title}?`;
      correctComparison = `${p.title}: ${p.function}; ${peer.title}: ${peer.function}.`;
      comparisonDistractors = [
        `${p.title}: ${peer.function}; ${peer.title}: ${p.function}.`,
        `${p.title}: ${otherPeer.function}; ${peer.title}: ${p.function}.`,
        `${p.title} and ${peer.title}: ${otherPeer.function}.`,
      ];
      comparisonExplanation = `The comparison is grounded in what each work actually did for its users: ${p.title} functioned as ${p.function}, while ${peer.title} functioned as ${peer.function}.`;
    } else if (comparisonMode === 1) {
      comparisonQuestion = `Which comparison most accurately distinguishes the formal organization of ${p.title} from ${peer.title}?`;
      correctComparison = `${p.title}: ${p.visual}; ${peer.title}: ${peer.visual}.`;
      comparisonDistractors = [
        `${p.title}: ${peer.visual}; ${peer.title}: ${p.visual}.`,
        `${p.title}: ${otherPeer.visual}; ${peer.title}: ${p.visual}.`,
        `${p.title} and ${peer.title}: ${otherPeer.visual}.`,
      ];
      comparisonExplanation = `The defensible comparison uses observable formal evidence from both works: ${p.visual}; by contrast, ${peer.visual}.`;
    } else {
      comparisonQuestion = `Which comparison most accurately relates ${p.title} and ${peer.title} to their artistic traditions?`;
      correctComparison = `${p.title}: ${p.tradition}; ${peer.title}: ${peer.tradition}.`;
      comparisonDistractors = [
        `${p.title}: ${peer.tradition}; ${peer.title}: ${p.tradition}.`,
        `${p.title}: ${otherPeer.tradition}; ${peer.title}: ${p.tradition}.`,
        `${p.title} and ${peer.title}: ${otherPeer.tradition}.`,
      ];
      comparisonExplanation = `The defensible comparison keeps each work in its documented artistic tradition: ${p.tradition}; by contrast, ${peer.tradition}.`;
    }
    questions.push(makeQuestion({
      id:`aparth-u${p.unit.slice(1)}-${String(p.n).padStart(3,"0")}-q3`, unit:p.unit, skill:"3",
      q:comparisonQuestion, correct:correctComparison, distractors:comparisonDistractors,
      explanation:comparisonExplanation, workNo:p.n,
    }));

    questions.push(makeQuestion({
      id:`aparth-u${p.unit.slice(1)}-${String(p.n).padStart(3,"0")}-q4`, unit:p.unit, skill:"4",
      q:`Which evidence-based statement best connects ${p.title} to a broader artistic tradition or practice?`,
      correct:`${p.visual}; this formal evidence is consistent with ${p.tradition}.`,
      distractors:peers.map((x) => `${x.visual}; this formal evidence is consistent with ${x.tradition}.`),
      explanation:`The relationship is supported by specific formal evidence: ${p.visual}. Those features are consistent with ${p.tradition}, so the connection is analytical rather than a bare style label.`, workNo:p.n,
    }));

    questions.push(makeQuestion({
      id:`aparth-u${p.unit.slice(1)}-${String(p.n).padStart(3,"0")}-q5`, unit:p.unit, skill:"7",
      q:`Which art-historical interpretation of ${p.title} is best supported by both contextual and formal evidence?`,
      correct:`${p.interpretation}; this reading is supported by ${p.context} and by the fact that ${p.visual}.`,
      distractors:peers.map((x) => `${x.interpretation}; this reading is supported by ${x.context} and by the fact that ${x.visual}.`),
      explanation:`${p.interpretation}. The interpretation is defensible because it is anchored in both context (${p.context}) and visible evidence (${p.visual}), rather than in an unsupported symbolic claim.`, workNo:p.n,
    }));
  });

  unknowns.forEach((p) => {
    const peers = unknowns.filter((x) => x !== p);
    const groupId = `aparth-${p.id}`;
    const stimulus = {
      type:"visual",
      title:"Unidentified work",
      image:asset(p.imageKey),
      alt:"Unidentified artwork reproduced without title or attribution for paired visual-analysis and attribution questions.",
      description:"For these questions, treat the work as unfamiliar and base your response on the visual evidence provided.",
      source:sourceNote,
    };
    questions.push(makeQuestion({
      id:`aparth-${p.id}-q1`, unit:p.unit, skill:"5",
      q:"Based only on the image, which visual observation is best supported?",
      correct:p.visual, distractors:peers.map((x) => x.visual),
      explanation:`The visible evidence is best described as follows: ${p.visual}. The other choices describe features belonging to different unfamiliar works.`,
      groupId, stimulus, sequence:1,
    }));
    questions.push(makeQuestion({
      id:`aparth-${p.id}-q2`, unit:p.unit, skill:"6",
      q:"Which attribution is best supported by the work's visible formal characteristics?",
      correct:p.attribution, distractors:peers.map((x) => x.attribution),
      explanation:`${p.attribution}. The attribution follows from visible formal evidence, which is the required basis for an unknown-work attribution rather than title recognition.`,
      groupId, stimulus, sequence:2,
    }));
  });

  window.QUESTIONS_AP_ART_HISTORY = questions;
})();
