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
      alt:p.alt || `Reproduction of ${p.title}`,
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
      skill:p.imageKey ? "2" : "4",
      q:p.imageKey
        ? `Which contextual factor best explains an important aspect of ${p.title}'s meaning or use?`
        : `Which artistic tradition or practice best situates ${p.title}?`,
      correct:p.imageKey ? p.context : p.tradition,
      distractors:p.imageKey ? contextPool : traditionPool,
      explanation:p.imageKey
        ? `${p.context}. Connecting that setting to the work explains its historical meaning more directly than the alternative contexts do.`
        : `${p.title} belongs to ${p.tradition}. The other choices describe different practices represented elsewhere in the same broad content area.`,
      groupId, stimulus, sequence:p.imageKey ? 2 : undefined, workNo:p.n,
    }));

    const peer = peers[index % peers.length];
    const otherPeer = peers[(index + 1) % peers.length];
    const correctComparison = `${p.title} reflects ${p.tradition}; ${peer.title} reflects ${peer.tradition}.`;
    const comparisonDistractors = [
      `${p.title} reflects ${peer.tradition}; ${peer.title} reflects ${p.tradition}.`,
      `${p.title} reflects ${otherPeer.tradition}; ${peer.title} reflects ${p.tradition}.`,
      `${p.title} and ${peer.title} both reflect ${otherPeer.tradition}.`,
    ];
    questions.push(makeQuestion({
      id:`aparth-u${p.unit.slice(1)}-${String(p.n).padStart(3,"0")}-q3`, unit:p.unit, skill:"3",
      q:`Which comparison most accurately relates the artistic traditions of ${p.title} and ${peer.title}?`,
      correct:correctComparison, distractors:comparisonDistractors,
      explanation:`The defensible comparison keeps each work in its actual artistic tradition: ${p.title} reflects ${p.tradition}, whereas ${peer.title} reflects ${peer.tradition}.`, workNo:p.n,
    }));

    questions.push(makeQuestion({
      id:`aparth-u${p.unit.slice(1)}-${String(p.n).padStart(3,"0")}-q4`, unit:p.unit, skill:"4",
      q:`Which statement best connects ${p.title} to a broader artistic tradition or practice?`,
      correct:p.tradition, distractors:traditionPool,
      explanation:`${p.title} is best situated within ${p.tradition}. That relationship links the individual work to recurring practices rather than treating it as historically isolated.`, workNo:p.n,
    }));

    questions.push(makeQuestion({
      id:`aparth-u${p.unit.slice(1)}-${String(p.n).padStart(3,"0")}-q5`, unit:p.unit, skill:"7",
      q:`Which art-historical interpretation of ${p.title} is best supported by its form and context?`,
      correct:p.interpretation, distractors:interpretationPool,
      explanation:`${p.interpretation}. This interpretation is supported by the work's documented formal and contextual evidence rather than by an unsupported symbolic claim.`, workNo:p.n,
    }));
  });

  unknowns.forEach((p, index) => {
    const peers = unknowns.filter((x) => x !== p);
    const groupId = `aparth-${p.id}`;
    const stimulus = {
      type:"visual", title:"Unidentified work", image:asset(p.imageKey), alt:p.alt,
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
