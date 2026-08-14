from pathlib import Path
p=Path('data/ap-art-history-finalize.js')
s=p.read_text()

s=s.replace('''      correct:p.imageKey ? p.context : p.tradition,
      distractors:p.imageKey ? contextPool : traditionPool,
      explanation:p.imageKey
        ? `${p.context}. Connecting that setting to the work explains its historical meaning more directly than the alternative contexts do.`
        : `${p.title} belongs to ${p.tradition}. The other choices describe different practices represented elsewhere in the same broad content area.`,''','''      correct:p.imageKey ? `${p.context}; this context helps explain ${p.visual}.` : p.tradition,
      distractors:p.imageKey
        ? peers.map((x) => `${x.context}; this context helps explain ${x.visual}.`)
        : traditionPool,
      explanation:p.imageKey
        ? `${p.context}. That setting is materially connected to the visible choice that ${p.visual}, so the answer performs contextual analysis rather than merely naming a historical fact.`
        : `${p.title} belongs to ${p.tradition}. The other choices describe different practices represented elsewhere in the same broad content area.`,''')

old='''    const correctComparison = `${p.title} reflects ${p.tradition}; ${peer.title} reflects ${peer.tradition}.`;
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
'''
new='''    const comparisonMode = index % 3;
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
'''
if old not in s: raise SystemExit('comparison block not found')
s=s.replace(old,new)

s=s.replace('''      q:`Which statement best connects ${p.title} to a broader artistic tradition or practice?`,
      correct:p.tradition, distractors:traditionPool,
      explanation:`${p.title} is best situated within ${p.tradition}. That relationship links the individual work to recurring practices rather than treating it as historically isolated.`, workNo:p.n,''','''      q:`Which evidence-based statement best connects ${p.title} to a broader artistic tradition or practice?`,
      correct:`${p.visual}; this formal evidence is consistent with ${p.tradition}.`,
      distractors:peers.map((x) => `${x.visual}; this formal evidence is consistent with ${x.tradition}.`),
      explanation:`The relationship is supported by specific formal evidence: ${p.visual}. Those features are consistent with ${p.tradition}, so the connection is analytical rather than a bare style label.`, workNo:p.n,''')

s=s.replace('''      q:`Which art-historical interpretation of ${p.title} is best supported by its form and context?`,
      correct:p.interpretation, distractors:interpretationPool,
      explanation:`${p.interpretation}. This interpretation is supported by the work's documented formal and contextual evidence rather than by an unsupported symbolic claim.`, workNo:p.n,''','''      q:`Which art-historical interpretation of ${p.title} is best supported by both contextual and formal evidence?`,
      correct:`${p.interpretation}; this reading is supported by ${p.context} and by the fact that ${p.visual}.`,
      distractors:peers.map((x) => `${x.interpretation}; this reading is supported by ${x.context} and by the fact that ${x.visual}.`),
      explanation:`${p.interpretation}. The interpretation is defensible because it is anchored in both context (${p.context}) and visible evidence (${p.visual}), rather than in an unsupported symbolic claim.`, workNo:p.n,''')

p.write_text(s)
