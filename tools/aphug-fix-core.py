from pathlib import Path

p=Path('js/subjects.js');s=p.read_text()
a='    examBlueprint: { sets: { quantitative: 4, foundational: 0, text: 0, visual: 3 }, standaloneRange: [39, 39] },\n'
b=a+'    sciencePracticeRanges: { "1": [15, 21], "2": [10, 15], "3": [8, 12], "4": [8, 12], "5": [8, 12] },\n'
if a not in s: raise SystemExit('metadata marker missing')
p.write_text(s.replace(a,b,1))

p=Path('js/draw.js');s=p.read_text()
a='''      if (subject.examBlueprint) {\n        result = drawBlueprintExam(subject, bank, targets, rng);\n      } else if (subject.sciencePracticeRanges || subject.attributeRanges) {'''
b='''      if (subject.examBlueprint) {\n        const ranges = subject.sciencePracticeRanges || {};\n        const attempts = Object.keys(ranges).length ? (subject.constraintDrawAttempts || 5000) : 1;\n        for (let attempt = 0; attempt < attempts; attempt++) {\n          const candidate = drawBlueprintExam(subject, bank, targets, rng);\n          const summary = summarizeBlocks(toBlocks(candidate));\n          const valid = Object.entries(ranges).every(([family, range]) => {\n            const count = summary.practices[family] || 0;\n            return count >= range[0] && count <= range[1];\n          });\n          if (valid) { result = candidate; break; }\n        }\n        if (!result) throw new Error("No blueprint draw satisfies configured practice ranges");\n      } else if (subject.sciencePracticeRanges || subject.attributeRanges) {'''
if a not in s: raise SystemExit('drawer marker missing')
p.write_text(s.replace(a,b,1))

p=Path('tests/notation-diagnostic.test.js');s=p.read_text()
a='    const key = file.replace(/-(?:curation|corrections|quality-fixes)\\.js$/, ".js");'
b='    const key = file.startsWith("data/ap-human-geography-") ? "data/ap-human-geography.js" : file.replace(/-(?:curation|corrections|quality-fixes)\\.js$/, ".js");'
if a not in s: raise SystemExit('notation marker missing')
p.write_text(s.replace(a,b,1))
