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

test('AP CSA code-trace candidate inventory is visible for independent audit', () => {
  const candidates = bank.filter(looksTraceDependent).map(q => ({
    id: q.id,
    stem: q.q,
    key: q.c[0],
    keyedAnswer: q.o[q.c[0]],
    options: q.o,
  }));
  console.log('CSA trace candidates', JSON.stringify(candidates, null, 2));
  assert.ok(candidates.length >= 20, `trace detector unexpectedly found only ${candidates.length} candidates`);
});
