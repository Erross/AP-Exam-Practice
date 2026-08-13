const test = require('node:test');
const assert = require('node:assert/strict');
const { loadChemistryBank } = require('./helpers');
const bank = loadChemistryBank();
const byId = new Map(bank.map((q) => [q.id, q]));
const key = (id) => { const q = byId.get(id); return q.o[q.c[0]]; };

test('Chemistry clean-room 6.D items require chemical reasoning rather than bare conclusions', () => {
  const checks = {
    'apchem-u2-004': /more energy.*deeper minimum/i,
    'apchem-u3-011': /high pressure.*particle volume.*low temperature.*attractions/i,
    'apchem-u5-012': /lower enthalpy.*negative/i,
    'apchem-u5-018': /fast equilibrium.*intermediate concentration.*reactant concentrations.*replaced/i,
    'apchem-u5-020': /larger activation-energy barrier/i,
    'apchem-u6-014': /releases more energy.*negative net/i,
    'apchem-u7-010': /K much greater than 1.*product/i,
    'apchem-u8-012': /H.?F bond.*strong/i,
    'apchem-u9-014': /ΔG values add.*summed ΔG negative/i,
  };
  for (const [id, re] of Object.entries(checks)) {
    const q = byId.get(id);
    assert.equal(q.skill, '6.D', id);
    assert.match(q.q, /reasoning|justif/i, `${id}: stem should request reasoning`);
    assert.match(key(id), re, `${id}: key should contain the actual reasoning`);
  }
});
