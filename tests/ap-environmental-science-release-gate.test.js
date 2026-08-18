const test=require('node:test');
const assert=require('node:assert/strict');
const subject=require('./helpers/ap-environmental-science-candidate');
const {loadEffectiveBank,auditGenericContent,auditDraws,measureOverlap}=require('../tools/subject-release-audit');
const {bank}=loadEffectiveBank(subject);

test('APES generic release content audit passes project thresholds',()=>{
  const content=auditGenericContent(subject,bank);
  console.log('APES release content metrics',{
    uniqueLongest:(100*content.uniqueLongestShare).toFixed(1)+'%',
    amongLongest:(100*content.amongLongestShare).toFixed(1)+'%',
    correctWords:content.correctAverage.toFixed(2),
    distractorWords:content.distractorAverage.toFixed(2),
    keys:content.keyShares.map(x=>(100*x).toFixed(1)+'%'),
    stimulusGroups:content.stimulusGroups,
  });
});

test('APES generic release draw audit passes 5000 of 5000 forms',()=>{
  assert.deepEqual(auditDraws(subject,bank,5000),{trials:5000});
});

test('APES generic release overlap audit passes 5000 independent pairs',()=>{
  const overlap=measureOverlap(subject,bank,5000);
  console.log(`APES 5000-pair overlap: ${(100*overlap).toFixed(1)}%`);
  assert.ok(overlap<=0.40,`APES overlap ${(100*overlap).toFixed(1)}% exceeds 40%`);
});
