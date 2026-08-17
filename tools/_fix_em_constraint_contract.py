from pathlib import Path
# Fix subject metadata: exact skill labels belong in attributeRanges, not skillCountRanges.
p=Path('js/subjects.js'); s=p.read_text()
old='    skillCountRanges: { "2.A":[11,12], "2.B":[9,10], "2.C":[5,6], "2.D":[5,6], "3.B":[7,10], "3.C":[3,4] },\n'
new='    attributeRanges: { skill: { "2.A":[11,12], "2.B":[9,10], "2.C":[5,6], "2.D":[5,6], "3.B":[7,10], "3.C":[3,4] } },\n'
if s.count(old)!=1: raise SystemExit(f'subject metadata match count {s.count(old)}')
p.write_text(s.replace(old,new,1))
# Fix subject-specific tests to assert/use the same exact-skill contract as Mechanics/Physics 1/2.
p=Path('tests/ap-physics-c-em.test.js'); s=p.read_text()
s=s.replace('assert.deepEqual(subject.skillCountRanges, {','assert.deepEqual(subject.attributeRanges.skill, {',1)
s=s.replace('Object.entries(subject.skillCountRanges)','Object.entries(subject.attributeRanges.skill)')
if 'subject.skillCountRanges' in s: raise SystemExit('stale skillCountRanges reference remains in E&M test')
p.write_text(s)
