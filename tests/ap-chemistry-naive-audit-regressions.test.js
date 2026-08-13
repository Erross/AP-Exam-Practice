const test = require('node:test');
const assert = require('node:assert/strict');
const { loadChemistryBank } = require('./helpers');

const bank = loadChemistryBank();
const byId = new Map(bank.map((q) => [q.id, q]));
const key = (id) => { const q = byId.get(id); return q.o[q.c[0]]; };

test('Chemistry clean-room exact Practice 2 repairs match the CED tasks', () => {
  assert.equal(byId.get('apchem-u4-002').skill, '2.C');
  assert.equal(byId.get('apchem-u4-011').skill, '2.B');
  assert.match(byId.get('apchem-u4-011').q, /predicts/i);
  assert.match(key('apchem-u4-011'), /50\.0 mL.*40\.0 mL/i);
  assert.equal(byId.get('apchem-u5-014').skill, '2.C');
  assert.equal(byId.get('apchem-u5-022').skill, '2.C');
  assert.equal(byId.get('apchem-u6-002').skill, '2.D');
  assert.match(key('apchem-u6-002'), /temperature decreases.*thermally insulated/i);
  assert.equal(byId.get('apchem-u6-018').skill, '2.C');
  assert.equal(byId.get('apchem-u7-004').skill, '2.C');
  assert.equal(byId.get('apchem-u8-002').skill, '2.C');
  assert.match(byId.get('apchem-u8-002').q, /experimental procedure/i);
  assert.equal(byId.get('apchem-u8-016').skill, '2.C');
  assert.equal(byId.get('apchem-u8-022').skill, '2.C');
  assert.equal(byId.get('apchem-u3-026').skill, '5.D');
});

test('Chemistry exact Mathematical Routine subskills distinguish relationship, graph, equation, and calculation tasks', () => {
  const expected = {
    'apchem-u1-001':'5.F', 'apchem-u3-008':'5.C', 'apchem-u3-026':'5.D',
    'apchem-u4-004':'5.E', 'apchem-u5-005':'5.B', 'apchem-u6-013':'5.B',
    'apchem-u7-007':'5.F', 'apchem-u8-018':'5.F', 'apchem-u9-021':'5.F'
  };
  for (const [id, skill] of Object.entries(expected)) assert.equal(byId.get(id).skill, skill, id);
});

test('Chemistry exact Argumentation subskills match evidence, cross-scale, and reasoning tasks', () => {
  const expected = {
    'apchem-u1-014':'6.D', 'apchem-u2-002':'6.B', 'apchem-u2-008':'6.E',
    'apchem-u3-002':'6.E', 'apchem-u3-004':'6.B', 'apchem-u3-006':'6.E',
    'apchem-u3-018':'6.B', 'apchem-u4-007':'6.B', 'apchem-u4-016':'6.D',
    'apchem-u7-024':'6.D', 'apchem-u9-004':'6.A', 'apchem-u9-014':'6.D'
  };
  for (const [id, skill] of Object.entries(expected)) assert.equal(byId.get(id).skill, skill, id);
  assert.match(key('apchem-u4-016'), /differ by exactly one proton/i);
});

test('Chemistry doubled-wavelength spectroscopy item has a coherent key', () => {
  const q = byId.get('apchem-u3-024');
  assert.match(q.q, /twice the wavelength/i);
  assert.equal(key('apchem-u3-024'), 'One-half as large');
  assert.match(q.e, /inversely proportional/i);
});
