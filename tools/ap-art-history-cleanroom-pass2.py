from pathlib import Path
p=Path('data/ap-art-history-finalize.js')
s=p.read_text()
old='''      skill:p.imageKey ? "2" : "4",
      q:p.imageKey
        ? `Which contextual factor best explains an important aspect of ${p.title}'s meaning or use?`
        : `Which artistic tradition or practice best situates ${p.title}?`,
      correct:p.imageKey ? `${p.context}; this context helps explain ${p.visual}.` : p.tradition,
      distractors:p.imageKey
        ? peers.map((x) => `${x.context}; this context helps explain ${x.visual}.`)
        : traditionPool,
      explanation:p.imageKey
        ? `${p.context}. That setting is materially connected to the visible choice that ${p.visual}, so the answer performs contextual analysis rather than merely naming a historical fact.`
        : `${p.title} belongs to ${p.tradition}. The other choices describe different practices represented elsewhere in the same broad content area.`,'''
new='''      skill:"2",
      q:`Which contextual explanation best connects ${p.title}'s historical setting to an artistic decision in the work?`,
      correct:`${p.context}; this context helps explain ${p.visual}.`,
      distractors:peers.map((x) => `${x.context}; this context helps explain ${x.visual}.`),
      explanation:`${p.context}. That setting is materially connected to the artistic choice that ${p.visual}, so the item requires contextual analysis rather than merely naming a historical fact.`,'''
if old not in s: raise SystemExit('residual q2 block not found')
s=s.replace(old,new)
p.write_text(s)
