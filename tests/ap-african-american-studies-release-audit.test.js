const test = require('node:test');
const assert = require('node:assert/strict');
const {
  loadEffectiveBank,
  auditGenericContent,
  auditDraws,
  measureOverlap,
} = require('../tools/subject-release-audit.js');

const subject = {
  id: 'ap-african-american-studies',
  dataVar: 'QUESTIONS_AP_AFRICAN_AMERICAN_STUDIES',
  mcqCount: 60,
  mcqTimeMinutes: 70,
  totalExamTimeLabel: '2h 45m',
  formatVerified: true,
  releaseStatus: 'draft',
  allowsMultiSelect: false,
  calculatorAllowed: false,
  tierNote: 'Source-based practice for Section I only. The official exam is fully digital and also includes an exam-day project validation question, short-answer questions, a document-based question, and the course project.',
  units: [
    { id:'U1', name:'Origins of the African Diaspora', examWeight:0.225, examWeightRange:[0.20,0.25] },
    { id:'U2', name:'Freedom, Enslavement, and Resistance', examWeight:0.325, examWeightRange:[0.30,0.35] },
    { id:'U3', name:'The Practice of Freedom', examWeight:0.225, examWeightRange:[0.20,0.25] },
    { id:'U4', name:'Movements and Debates', examWeight:0.225, examWeightRange:[0.20,0.25] },
  ],
  stimulusSetRange: [15,20],
  attributeRanges: {
    unit: {
      U1: [12,15],
      U2: [18,21],
      U3: [12,15],
      U4: [12,15],
    },
  },
  constraintDrawAttempts: 20000,
};

test('AP African American Studies browser-effective release audit passes 5000 draws and 5000 overlap pairs', () => {
  const { bank, scripts } = loadEffectiveBank(subject);
  const content = auditGenericContent(subject, bank);
  const draws = auditDraws(subject, bank, 5000);
  const overlap = measureOverlap(subject, bank, 5000);

  console.log(`ap-african-american-studies: ${bank.length} questions from ${scripts.length} browser data layer(s)`);
  console.log(`Answer pattern: uniquely-longest ${(100 * content.uniqueLongestShare).toFixed(1)}%; exploitable among-longest ${(100 * content.amongLongestShare).toFixed(1)}% (four-way ties excluded); correct ${content.correctAverage.toFixed(2)} words vs distractors ${content.distractorAverage.toFixed(2)}.`);
  console.log(`Raw keys: ${content.keyShares.map((share, index) => `${String.fromCharCode(65 + index)} ${(100 * share).toFixed(1)}%`).join(', ')}.`);
  console.log(`Variant groups: ${content.variantGroups}; stimulus groups: ${content.stimulusGroups}.`);
  console.log(`Draw audit: ${draws.trials}/${draws.trials} valid.`);
  console.log(`Retake overlap: ${(100 * overlap).toFixed(1)}% average shared questions.`);

  assert.equal(bank.length, 238);
  assert.equal(scripts.length, 8, 'browser audit must include every AP AAS data layer currently wired in index.html');
  assert.equal(draws.trials, 5000);
  assert.ok(overlap <= 0.40);
});
