from pathlib import Path

# Add a deterministic Art History constructor to the generic drawer.
p = Path('js/draw.js')
s = p.read_text()
marker = '  /**\n   * Build one attempt\'s question list for a subject.'
fn = r'''  /**
   * Draw AP Art History from an exact constructive blueprint instead of relying
   * on rejection sampling across ten unit quotas and seven simultaneous skill
   * bands. The blueprint names how many known-image sets, unknown-image sets,
   * and standalone skill questions each unit contributes. Every selected visual
   * set remains whole and contiguous.
   */
  function drawArtHistoryExam(subject, bank, rng) {
    const blueprint = subject.artHistoryBlueprint;
    const blocks = toBlocks(bank);
    const knownByUnit = new Map();
    const unknownByUnit = new Map();
    const standaloneByUnitSkill = new Map();
    (subject.units || []).forEach((u) => {
      knownByUnit.set(u.id, []);
      unknownByUnit.set(u.id, []);
      standaloneByUnitSkill.set(u.id, new Map());
    });

    blocks.forEach((block) => {
      const first = block[0];
      if (!first) return;
      const unit = first.unit;
      if (!standaloneByUnitSkill.has(unit)) return;
      if (first.stimulusGroupId) {
        if (first.stimulusGroupId.startsWith('aparth-unk-')) unknownByUnit.get(unit).push(block);
        else if (first.stimulusGroupId.startsWith('aparth-work-')) knownByUnit.get(unit).push(block);
        return;
      }
      const family = practiceFamily(first);
      const bySkill = standaloneByUnitSkill.get(unit);
      if (!bySkill.has(family)) bySkill.set(family, []);
      bySkill.get(family).push(block);
    });

    const selected = [];
    Object.entries(blueprint.perUnit).forEach(([unit, plan]) => {
      const known = shuffle(knownByUnit.get(unit) || [], rng);
      const unknown = shuffle(unknownByUnit.get(unit) || [], rng);
      if (known.length < (plan.knownSets || 0)) throw new Error(`${unit}: insufficient known Art History image sets`);
      if (unknown.length < (plan.unknownSets || 0)) throw new Error(`${unit}: insufficient unknown Art History image sets`);
      selected.push(...known.slice(0, plan.knownSets || 0));
      selected.push(...unknown.slice(0, plan.unknownSets || 0));

      Object.entries(plan.standalone || {}).forEach(([skill, count]) => {
        const pool = shuffle((standaloneByUnitSkill.get(unit).get(String(skill)) || []), rng);
        if (pool.length < count) throw new Error(`${unit}: insufficient standalone Skill ${skill} Art History questions`);
        selected.push(...pool.slice(0, count));
      });
    });

    const result = shuffle(selected, rng).flat();
    if (result.length !== subject.mcqCount) {
      throw new Error(`Art History blueprint produced ${result.length}; expected ${subject.mcqCount}`);
    }
    return result;
  }

'''
if 'function drawArtHistoryExam' not in s:
    if marker not in s:
        raise SystemExit('draw.js insertion marker not found')
    s = s.replace(marker, fn + marker)
s = s.replace('    if (subject.setBlueprint) {\n      result = drawSetBlueprintExam(subject, bank, rng);',
              '    if (subject.artHistoryBlueprint) {\n      result = drawArtHistoryExam(subject, bank, rng);\n    } else if (subject.setBlueprint) {\n      result = drawSetBlueprintExam(subject, bank, rng);')
s = s.replace('    drawConstrainedWeightedExam,\n', '    drawConstrainedWeightedExam,\n    drawArtHistoryExam,\n')
p.write_text(s)

# Replace probabilistic Art History constraints with a constructive per-unit plan.
p = Path('js/subjects.js')
s = p.read_text()
old = '''    skillCountRanges: { "1":[12,15], "2":[23,25], "3":[9,10], "4":[16,20], "5":[5,6], "6":[5,6], "7":[5,6] },
    stimulusSetRange: [17,21],
    constraintDrawAttempts: 50000,
    dataVar: "QUESTIONS_AP_ART_HISTORY",'''
new = '''    skillCountRanges: { "1":[12,15], "2":[23,25], "3":[9,10], "4":[16,20], "5":[5,6], "6":[5,6], "7":[5,6] },
    stimulusSetRange: [20,20],
    // Exact constructive draw: 15 prescribed-work image sets + 5 unfamiliar-work
    // image sets = 40 visual questions. Standalones then produce an exact skill
    // mix of 15/24/10/16/5/5/5 while preserving Hamilton unit counts
    // 3/12/17/17/5/5/3/6/3/9.
    artHistoryBlueprint: { perUnit: {
      U1:  { knownSets:1, unknownSets:0, standalone:{ "4":1 } },
      U2:  { knownSets:2, unknownSets:1, standalone:{ "2":1, "3":2, "4":2, "7":1 } },
      U3:  { knownSets:3, unknownSets:1, standalone:{ "2":2, "3":2, "4":4, "7":1 } },
      U4:  { knownSets:3, unknownSets:3, standalone:{ "2":1, "3":1, "4":2, "7":1 } },
      U5:  { knownSets:1, unknownSets:0, standalone:{ "3":1, "4":1, "7":1 } },
      U6:  { knownSets:1, unknownSets:0, standalone:{ "2":1, "3":1, "4":1 } },
      U7:  { knownSets:1, unknownSets:0, standalone:{ "3":1 } },
      U8:  { knownSets:1, unknownSets:0, standalone:{ "2":1, "3":1, "4":2 } },
      U9:  { knownSets:1, unknownSets:0, standalone:{ "2":1 } },
      U10: { knownSets:1, unknownSets:0, standalone:{ "2":2, "3":1, "4":3, "7":1 } },
    } },
    dataVar: "QUESTIONS_AP_ART_HISTORY",'''
if old not in s:
    raise SystemExit('subjects.js Art History constraint block not found')
s = s.replace(old, new)
p.write_text(s)

# Make the visual-group failure print the actual inventory if it ever drifts again.
p = Path('tests/ap-art-history-bank.test.js')
s = p.read_text()
s = s.replace('assert.equal(groups.size,48);', 'assert.equal(groups.size,48,`visual groups: ${[...groups.keys()].join(", ")}`);')
p.write_text(s)
