from pathlib import Path

# Repair the remaining stacked-absolute distractors in angular momentum.
b=Path('data/ap-physics-c-mechanics.js')
s=b.read_text()
s=s.replace('"Whenever linear momentum is zero", "Only when kinetic energy is constant", "Only for circular motion"',
            '"When the system’s linear momentum happens to be zero", "When the system’s kinetic energy is constant", "For a system undergoing circular motion"')
b.write_text(s)

# Expand the quantitative audit to include the symbolic gravitation calculation,
# and make future inventory failures report every missing item in one run.
t=Path('tests/ap-physics-c-mechanics-quantitative.test.js')
s=t.read_text()
s=s.replace('  "pcm-2.5-01": `${(8 * 3) / 4} m/s^2`,\n',
            '  "pcm-2.5-01": `${(8 * 3) / 4} m/s^2`,\n  "pcm-2.6-01": "2Gm^2/r^2",\n')
s=s.replace('  for (const id of candidateIds) assert.ok(auditedIds.includes(id), `${id}: numerical calculation is missing from the independent audit inventory`);',
            '  const missing = candidateIds.filter((id) => !auditedIds.includes(id));\n  assert.deepEqual(missing, [], `calculation items missing from independent audit inventory: ${missing.join(", ")}`);')
t.write_text(s)
