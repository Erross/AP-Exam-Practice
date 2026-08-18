const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');
const { loadEffectiveSubject } = require('../tools/subject-release-audit.js');

function materializeRegistry() {
  const registry = fs.readFileSync('js/subjects.js', 'utf8');
  const effective = loadEffectiveSubject('ap-african-american-studies');
  const startMarker = '  {\n    id: "ap-african-american-studies",';
  const nextMarker = '  {\n    id: "ap-comparative-government",';
  const start = registry.indexOf(startMarker);
  const end = registry.indexOf(nextMarker, start);
  assert.ok(start >= 0 && end > start, 'could not isolate AP AAS registry block');

  const block = `  {
    id: "ap-african-american-studies",
    name: "AP African American Studies",
    category: "History & Social Sciences",
    tier: 1,
    // VERIFIED 2026-08-18 against current AP Central course and exam pages.
    // Section I: 60 questions / 70 minutes / 60% of exam score, normally in
    // 3–4 question sets using 1–2 shared sources. Unit bands: 20–25, 30–35,
    // 20–25, 20–25. Midpoints sum to 100%, so they are used directly as
    // Hamilton draw weights, with published count bands enforced explicitly.
    mcqCount: ${effective.mcqCount},
    mcqTimeMinutes: ${effective.mcqTimeMinutes},
    totalExamTimeLabel: ${JSON.stringify(effective.totalExamTimeLabel)},
    formatVerified: ${effective.formatVerified},
    releaseStatus: "draft",
    allowsMultiSelect: ${effective.allowsMultiSelect},
    calculatorAllowed: ${effective.calculatorAllowed},
    tierNote: ${JSON.stringify(effective.tierNote)},
    units: [
      { id:"U1", name:"Origins of the African Diaspora", examWeight:0.225, examWeightRange:[0.20,0.25] },
      { id:"U2", name:"Freedom, Enslavement, and Resistance", examWeight:0.325, examWeightRange:[0.30,0.35] },
      { id:"U3", name:"The Practice of Freedom", examWeight:0.225, examWeightRange:[0.20,0.25] },
      { id:"U4", name:"Movements and Debates", examWeight:0.225, examWeightRange:[0.20,0.25] },
    ],
    stimulusSetRange: [15,20],
    attributeRanges: {
      unit: { U1:[12,15], U2:[18,21], U3:[12,15], U4:[12,15] },
    },
    constraintDrawAttempts: 20000,
    dataVar: "QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES",
  },
`;
  return registry.slice(0, start) + block + registry.slice(end);
}

test('materialized AP AAS registry candidate changes only the AP AAS block and matches effective metadata', () => {
  const original = fs.readFileSync('js/subjects.js', 'utf8');
  const candidate = materializeRegistry();
  const startMarker = '  {\n    id: "ap-african-american-studies",';
  const nextMarker = '  {\n    id: "ap-comparative-government",';
  const originalStart = original.indexOf(startMarker);
  const originalEnd = original.indexOf(nextMarker, originalStart);
  const candidateStart = candidate.indexOf(startMarker);
  const candidateEnd = candidate.indexOf(nextMarker, candidateStart);
  assert.equal(candidate.slice(0, candidateStart), original.slice(0, originalStart));
  assert.equal(candidate.slice(candidateEnd), original.slice(originalEnd));

  const sandbox = { module: { exports: {} }, exports: {} };
  vm.createContext(sandbox);
  vm.runInContext(candidate, sandbox, { filename: 'candidate-subjects.js' });
  const subject = sandbox.module.exports.AP_SUBJECTS.find((s) => s.id === 'ap-african-american-studies');
  assert.equal(subject.mcqCount, 60);
  assert.equal(subject.mcqTimeMinutes, 70);
  assert.deepEqual(Array.from(subject.units, (u) => u.id), ['U1','U2','U3','U4']);
  assert.deepEqual(Array.from(subject.stimulusSetRange), [15,20]);
  assert.equal(subject.releaseStatus, 'draft');

  const b64 = Buffer.from(candidate, 'utf8').toString('base64');
  const digest = crypto.createHash('sha256').update(candidate).digest('hex');
  console.log(`AAS_CANONICAL_SUBJECTS_SHA256=${digest}`);
  console.log(`AAS_CANONICAL_SUBJECTS_BASE64=${b64}`);
});
