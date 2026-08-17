from pathlib import Path

b=Path('data/ap-physics-c-mechanics.js')
s=b.read_text()
s=s.replace('"(1/2)Mvcm^2 only", "(1/2)Icm ω^2 only", "(1/2)Mvcm^2+(1/2)Icm ω^2", "Mvcm ω"',
            '"The translational term (1/2)Mvcm^2", "The rotational term (1/2)Icm ω^2", "(1/2)Mvcm^2+(1/2)Icm ω^2", "Mvcm ω"')
# Also handle the pre-normalization spacing form defensively.
s=s.replace('"(1/2)Mv_cm^2 only", "(1/2)I_cm omega^2 only", "(1/2)Mv_cm^2+(1/2)I_cm omega^2", "Mv_cm omega"',
            '"The translational term (1/2)Mv_cm^2", "The rotational term (1/2)I_cm omega^2", "(1/2)Mv_cm^2+(1/2)I_cm omega^2", "Mv_cm omega"')
b.write_text(s)

t=Path('tests/ap-physics-c-mechanics.test.js')
s=t.read_text()
s=s.replace('  const absoluteLanguage=/\\b(always|never|every|only|entirely|unlimited|impossible|guaranteed)\\b/i;\n  for (const q of bank) {',
            '  const absoluteLanguage=/\\b(always|never|every|only|entirely|unlimited|impossible|guaranteed)\\b/i;\n  const stackedAbsolute = [];\n  for (const q of bank) {')
s=s.replace('    assert.ok(absoluteDistractors.length<=1, `${q.id}: stacked absolute-language distractors`);',
            '    if (absoluteDistractors.length>1) stackedAbsolute.push(q.id);')
s=s.replace('  const ca=correctWords/bank.length, da=distractorWords/(bank.length*3);',
            '  assert.deepEqual(stackedAbsolute, [], `stacked absolute-language distractors: ${stackedAbsolute.join(", ")}`);\n  const ca=correctWords/bank.length, da=distractorWords/(bank.length*3);')
t.write_text(s)
