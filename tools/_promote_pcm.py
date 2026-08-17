from pathlib import Path

subjects = Path('js/subjects.js')
s = subjects.read_text()
anchor = 'id: "ap-physics-c-mechanics"'
start = s.index(anchor)
end = s.index('dataVar: "QUESTIONS_AP_PHYSICS_C_MECHANICS"', start)
block = s[start:end]
old = 'releaseStatus: "draft"'
if block.count(old) != 1:
    raise SystemExit('expected exactly one draft releaseStatus in Mechanics block')
block = block.replace(old, 'releaseStatus: "released"', 1)
s = s[:start] + block + s[end:]
subjects.write_text(s)

test = Path('tests/ap-physics-c-mechanics.test.js')
t = test.read_text()
old_assert = 'assert.equal(subject.releaseStatus, "draft");'
if t.count(old_assert) != 1:
    raise SystemExit('expected Mechanics draft assertion once')
t = t.replace(old_assert, 'assert.equal(subject.releaseStatus, "released");', 1)
test.write_text(t)
