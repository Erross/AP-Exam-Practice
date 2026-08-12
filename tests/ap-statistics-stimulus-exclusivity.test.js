const test = require('node:test');
const assert = require('node:assert/strict');
const { AP_SUBJECTS } = require('../js/subjects');
const { drawExam } = require('../js/draw');
const { loadStatisticsBank } = require('./helpers');

// Permanent regression gate added after the independent 2026-08-11 CED audit:
// candidate probability/regression prompts must remain exclusive three-question sets.
test('AP Statistics candidate-set stimuli remain exclusive in the bank and delivered exams', () => {
  const subject = AP_SUBJECTS.find((s) => s.id === 'ap-statistics');
  const bank = loadStatisticsBank();
  const groups = new Map();

  for (const question of bank.filter((q) => q.stimulusGroupId)) {
    if (!groups.has(question.stimulusGroupId)) groups.set(question.stimulusGroupId, []);
    groups.get(question.stimulusGroupId).push(question);
  }

  assert.equal(groups.size, 6);
  for (const [groupId, questions] of groups) {
    assert.equal(questions.length, 3, `${groupId}: expected exactly three linked questions`);
    const stimulus = questions[0].stimulus;
    assert.ok(questions.every((q) => q.stimulus === stimulus));
    assert.deepEqual(
      bank.filter((q) => q.stimulus === stimulus).map((q) => q.stimulusGroupId),
      [groupId, groupId, groupId],
      `${groupId}: stimulus reused outside its candidate set`,
    );
  }

  for (let i = 0; i < 1000; i += 1) {
    const draw = drawExam(subject, bank);
    const selectedGroups = new Set(draw.filter((q) => q.stimulusGroupId).map((q) => q.stimulusGroupId));
    assert.equal(selectedGroups.size, 2);
    for (const groupId of selectedGroups) {
      const selected = draw.filter((q) => q.stimulusGroupId === groupId);
      assert.equal(selected.length, 3, `${groupId}: delivered set split or expanded`);
      assert.equal(draw.filter((q) => q.stimulus === selected[0].stimulus).length, 3,
        `${groupId}: delivered exam contains an extra question sharing the set stimulus`);
    }
  }
});
