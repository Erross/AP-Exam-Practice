const test = require('node:test');
const assert = require('node:assert/strict');
const subject = require('./helpers/ap-computer-science-a-candidate');
const { loadEffectiveBank } = require('../tools/subject-release-audit');
const { bank } = loadEffectiveBank(subject);

function looksTraceDependent(q) {
  const stem = q.q;
  const asksResult = /\b(what is printed|what is (?:the )?value|what value is|what does .* contain|what is .* after|after .* executes|after .* code|how many times|what happens when|what is produced by)\b/i.test(stem);
  const hasCode = /[;{}()[\]]|\b(?:int|double|boolean|String|ArrayList|for|while|if|new|return|substring|Math\.)\b/.test(stem);
  return asksResult && hasCode;
}

// Independently derived from Java semantics, not copied from question key indices.
// This covers arithmetic/casting, boolean logic, branching, loop tracing, Strings,
// object/reference behavior, arrays, ArrayLists, 2D arrays, and recursion.
const EXPECTED = new Map(Object.entries({
  'apcsa-u1-08': '3.5',
  'apcsa-u1-09': '3',
  'apcsa-u1-14': '-3',
  'apcsa-u1-29': 'The method runs, prints Ready, and then control returns to the statement after the call.',
  'apcsa-u1-39': 'No reference to a Widget object.',
  'apcsa-u1-44': 'true',
  'apcsa-u2-04': 'true',
  'apcsa-u2-06': 'true',
  'apcsa-u2-08': 'EN',
  'apcsa-u2-11': 'B',
  'apcsa-u2-20': '6',
  'apcsa-u2-23': '2 4 6',
  'apcsa-u2-26': '2',
  'apcsa-u2-29': '3',
  'apcsa-u2-32': '6',
  'apcsa-u3-11': 'Memory is allocated for a Counter object, its constructor initializes the object, and a reference to it is produced.',
  'apcsa-u4-11': '8',
  'apcsa-u4-14': '8',
  'apcsa-u4-20': 'the double value 3.25',
  'apcsa-u4-21': 'The Integer reference returned by get is unboxed to the primitive int value 4.',
  'apcsa-u4-23': '[2, 4, 5, 8]',
  'apcsa-u4-26': '6',
  'apcsa-u4-29': '[3, 9]',
  'apcsa-u4-38': '4',
  'apcsa-u4-48': '3 2 1',
}));

test('AP CSA independent Java-result inventory covers every trace-dependent item', () => {
  const detected = Array.from(bank).filter(looksTraceDependent).map(q => q.id).sort();
  const inventoried = Array.from(EXPECTED.keys()).sort();
  assert.equal(JSON.stringify(detected), JSON.stringify(inventoried),
    `trace inventory drift; detected=${detected.join(', ')} inventoried=${inventoried.join(', ')}`);
});

test('every inventoried AP CSA Java result independently matches the keyed answer', () => {
  const byId = new Map(Array.from(bank).map(q => [q.id, q]));
  for (const [id, expected] of EXPECTED) {
    const q = byId.get(id);
    assert.ok(q, `missing trace-audited question ${id}`);
    assert.equal(q.o[q.c[0]], expected, `${id}: independently derived Java result does not match key`);
  }
});
