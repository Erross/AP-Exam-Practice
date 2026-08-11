const fs = require('node:fs');

let draw = fs.readFileSync('js/draw.js', 'utf8');

if (!draw.includes('function orderByExamParts(')) {
  const marker = '  /**\n   * Draw an AP U.S. Government-shaped exam.';
  if (!draw.includes(marker)) throw new Error('draw.js insertion marker missing');
  const fn = `  /**\n   * Reorder a fully-drawn exam into named, contiguous parts so a timed\n   * no-calculator/calculator section is delivered in the real exam order.\n   * Every stimulus block must be homogeneous in the configured part field.\n   */\n  function orderByExamParts(subject, questions) {\n    const config = subject.examParts;\n    if (!config) return questions;\n    const field = config.field;\n    const blocks = toBlocks(questions);\n    const buckets = config.parts.map(() => []);\n\n    blocks.forEach((block) => {\n      const value = block[0][field];\n      if (!block.every((question) => question[field] === value)) {\n        throw new Error(\n          \`${'${block[0].stimulusGroupId || block[0].id}'}: stimulus set has mixed ${'${field}'} values and cannot be placed in a single exam part\`\n        );\n      }\n      const partIndex = config.parts.findIndex((part) => part.value === value);\n      if (partIndex === -1) {\n        throw new Error(\`${'${block[0].id}'}: ${'${field}'}=${'${String(value)}'} does not match any configured exam part\`);\n      }\n      buckets[partIndex].push(block);\n    });\n\n    return buckets.flatMap((blockList) => blockList.flat());\n  }\n\n`;
  draw = draw.replace(marker, fn + marker);
}

const start = draw.indexOf('  function drawExam(subject, bank, rng) {');
const endMarker = '\n  /**\n   * Return a fresh { o, c } pair';
const end = draw.indexOf(endMarker, start);
if (start < 0 || end < 0) throw new Error('drawExam replacement markers missing');

const combinedDrawExam = `  function drawExam(subject, bank, rng) {\n    const requestedCount = subject.mcqCount || bank.length;\n    if (bank.length < requestedCount) {\n      throw new Error(\`Question bank has ${'${bank.length}'} questions; ${'${requestedCount}'} are required\`);\n    }\n    const drawCount = requestedCount;\n    const units = Array.isArray(subject.units) ? subject.units : [];\n    let result;\n\n    if (subject.setBlueprint) {\n      result = drawSetBlueprintExam(subject, bank, rng);\n    } else if (units.length === 0) {\n      const blocks = drawBlocks(bank, drawCount, rng);\n      result = shuffle(blocks, rng).flat();\n    } else {\n      const byUnit = new Map(units.map((u) => [u.id, []]));\n      bank.forEach((q) => {\n        if (byUnit.has(q.unit)) byUnit.get(q.unit).push(q);\n      });\n\n      const targets = apportion(\n        units.map((u) => ({\n          id: u.id,\n          weight: u.examWeight || 0,\n          capacity: byUnit.get(u.id).length,\n        })),\n        drawCount\n      );\n\n      if (subject.examBlueprint) {\n        result = drawBlueprintExam(subject, bank, targets, rng);\n      } else if (subject.sciencePracticeRanges || subject.attributeRanges) {\n        result = drawConstrainedWeightedExam(subject, byUnit, targets, rng);\n      } else {\n        const setRange = Array.isArray(subject.stimulusSetRange) ? subject.stimulusSetRange : null;\n        const attempts = setRange ? 200 : 1;\n        let lastPlaced = 0;\n        let found = null;\n\n        for (let attempt = 0; attempt < attempts; attempt++) {\n          let blocks = [];\n          units.forEach((u) => {\n            blocks = blocks.concat(drawBlocks(byUnit.get(u.id), targets[u.id] || 0, rng));\n          });\n          const placed = blocks.reduce((n, b) => n + b.length, 0);\n          lastPlaced = placed;\n          if (placed !== drawCount) continue;\n\n          if (setRange) {\n            const setCount = blocks.filter((block) => block[0] && block[0].stimulusGroupId).length;\n            if (setCount < setRange[0] || setCount > setRange[1]) continue;\n          }\n          found = shuffle(blocks, rng).flat();\n          break;\n        }\n\n        if (!found) {\n          if (setRange) {\n            throw new Error(\`No whole-set draw satisfied stimulus set range ${'${setRange[0]}'}-${'${setRange[1]}'}\`);\n          }\n          throw new Error(\`Weighted draw could place only ${'${lastPlaced}'} of ${'${drawCount}'} questions\`);\n        }\n        result = found;\n      }\n    }\n\n    return subject.examParts ? orderByExamParts(subject, result) : result;\n  }\n`;

draw = draw.slice(0, start) + combinedDrawExam + draw.slice(end);
if (!draw.includes('    orderByExamParts,')) {
  draw = draw.replace('    drawSetBlueprintExam,\n', '    drawSetBlueprintExam,\n    orderByExamParts,\n');
}
fs.writeFileSync('js/draw.js', draw);

let css = fs.readFileSync('style.css', 'utf8');
if (!css.includes('.part-label {')) {
  const partCss = `\n/* ---------- Timed exam parts (AP Calculus AB/BC style sections) ---------- */\n.part-label {\n  font-size: 0.78rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--accent);\n  background: var(--panel-alt);\n  border: 1px solid var(--accent-dim);\n  border-radius: var(--radius);\n  padding: 4px 10px;\n}\n.part-transition-banner {\n  background: var(--panel-alt);\n  border: 1px solid var(--amber);\n  border-left: 3px solid var(--amber);\n  border-radius: var(--radius);\n  padding: 10px 12px;\n  font-size: 0.88rem;\n  font-weight: 600;\n  margin: 0 0 16px;\n}\n.advance-part-btn {\n  margin-top: 10px;\n  width: 100%;\n  background: none;\n  border: 1px solid var(--border);\n  color: var(--text-dim);\n  border-radius: 8px;\n  padding: 8px 12px;\n  cursor: pointer;\n  font-size: 0.82rem;\n}\n.advance-part-btn:hover { color: var(--text); border-color: var(--accent); }\n.nav-item.locked { opacity: 0.4; cursor: not-allowed; text-decoration: line-through; }\n`;
  css += partCss;
}
fs.writeFileSync('style.css', css);
