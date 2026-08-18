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
  'apcsa-u1-08': '3.5',                         // integer 7/2 = 3, then + 0.5
  'apcsa-u1-09': '3',                           // 5%2 + 5/2 = 1 + 2
  'apcsa-u1-14': '-3',                          // narrowing double->int truncates toward zero
  'apcsa-u1-29': 'The method runs, prints Ready, and then control returns to the statement after the call.',
  'apcsa-u1-39': 'No reference to a Widget object.',
  'apcsa-u1-44': 'true',                        // "cat" is lexicographically after "car"
  'apcsa-u2-04': 'true',                        // 7 < 10
  'apcsa-u2-06': 'true',                        // !false
  'apcsa-u2-08': 'EN',                          // even branch prints E, then unconditional N
  'apcsa-u2-11': 'B',                           // 8 > 0 and !(8 < 5)
  'apcsa-u2-20': '6',                           // 3 + 2 + 1
  'apcsa-u2-23': '2 4 6',                       // i = 2,4,6
  'apcsa-u2-26': '2',                           // divisible by 3 in 1..8: 3,6
  'apcsa-u2-29': '3',                           // banana has three a characters
  'apcsa-u2-32': '6',                           // 0+1+2+3 inner executions
  'apcsa-u3-11': 'Memory is allocated for a Counter object, its constructor initializes the object, and a reference to it is produced.',
  'apcsa-u4-11': '8',                           // 2+5+1
  'apcsa-u4-14': '8',                           // max of 3,8,2,6
  'apcsa-u4-20': 'the double value 3.25',        // Double.parseDouble result
  'apcsa-u4-21': 'The Integer reference returned by get is unboxed to the primitive int value 4.',
  'apcsa-u4-23': '[2, 4, 5, 8]',                 // insert 4 at index 1
  'apcsa-u4-26': '6',                           // enhanced-for sum 1+2+3
  'apcsa-u4-29': '[3, 9]',                       // backward removal deletes 6
  'apcsa-u4-38': '4',                           // four 1 values in {{1,0},{0,1},{1,1}}
  'apcsa-u4-48': '3 2 1',                       // print before recursive call; base 0 prints nothing
}));

test('AP CSA independent Java-result inventory covers every trace-dependent item', () => {
  const detected = bank.filter(looksTraceDependent).map(q => q.id).sort();
  const inventoried = [...EXPECTED.keys()].sort();
  assert.deepEqual(detected, inventoried,
    `trace inventory drift; detected=${detected.join(', ')} inventoried=${inventoried.join(', ')}`);
});

test('every inventoried AP CSA Java result independently matches the keyed answer', () => {
  const byId = new Map(bank.map(q => [q.id, q]));
  for (const [id, expected] of EXPECTED) {
    const q = byId.get(id);
    assert.ok(q, `missing trace-audited question ${id}`);
    assert.equal(q.o[q.c[0]], expected, `${id}: independently derived Java result does not match key`);
  }
});
