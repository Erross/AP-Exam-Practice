from pathlib import Path

# Promote only the E&M subject object.
p = Path('js/subjects.js')
s = p.read_text(encoding='utf-8')
anchor = 'id: "ap-physics-c-em"'
pos = s.find(anchor)
if pos < 0:
    raise SystemExit('E&M subject not found')
start = s.rfind('  {', 0, pos)
end = s.find('\n  },', pos)
block = s[start:end]
old = 'releaseStatus: "draft"'
new = 'releaseStatus: "released"'
if block.count(old) != 1:
    raise SystemExit(f'E&M releaseStatus draft count={block.count(old)}')
block = block.replace(old, new)
s = s[:start] + block + s[end:]
p.write_text(s, encoding='utf-8')

# Update only the E&M metadata release-mode assertion.
p = Path('tests/ap-physics-c-em.test.js')
t = p.read_text(encoding='utf-8')
old_test = 'assert.equal(subject.releaseStatus, "draft");'
new_test = 'assert.equal(subject.releaseStatus, "released");'
if t.count(old_test) != 1:
    raise SystemExit(f'E&M draft assertion count={t.count(old_test)}')
t = t.replace(old_test, new_test)
p.write_text(t, encoding='utf-8')

print('promoted only AP Physics C: Electricity and Magnetism')
