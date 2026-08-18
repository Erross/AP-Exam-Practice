const test = require('node:test');
const assert = require('node:assert/strict');
const subject = require('./helpers/ap-environmental-science-candidate');
const { loadEffectiveBank } = require('../tools/subject-release-audit');
const { bank } = loadEffectiveBank(subject);

const byId = new Map(bank.map(q => [q.id, q]));
const keyText = q => q.o[q.c[0]];

test('APES clean-room Practice 4 items specify controlled comparative investigations', () => {
  const experiments = bank.filter(q => q.skill === '4');
  assert.equal(experiments.length, 18);
  for (const q of experiments) {
    assert.ok(/^apes-exp2?-/.test(q.id), `${q.id}: Practice 4 must come from the dedicated experiment pool`);
    const answer = keyText(q);
    assert.match(answer, /compare|replicat|treatment|control|matched/i, `${q.id}: key lacks a comparative experimental structure`);
    assert.match(answer, /equal|same|hold|holding|constant|matched|identical/i, `${q.id}: key does not control a material variable`);
    assert.doesNotMatch(answer, /observe whatever happens|change several variables|single unreplicated|no control/i, `${q.id}: weak experimental design`);
  }
});

test('APES clean-room Practice 7 items prescribe a concrete environmental intervention', () => {
  const solutions = bank.filter(q => q.skill === '7');
  assert.equal(solutions.length, 62); // 54 standalone + eight visual-set solution candidates in the full bank
  const action = /reduce|remove|restore|protect|use|install|expand|improve|limit|retire|replace|stabilize|contain|apply|adjust|prevent|phase out|plan|site|adopt|develop|require|capture|control|manage|clean|drain|dry|enforce|increase reflective|match fertilizer/i;
  for (const q of solutions) {
    const answer = keyText(q);
    assert.match(answer, action, `${q.id}: key is not a concrete intervention`);
    assert.doesNotMatch(answer, /monitor (?:the )?(?:problem|system|environment) and respond|address the process and monitor/i, `${q.id}: generic monitor-only solution survived clean-room review`);
    assert.ok(answer.split(/\s+/).length >= 4, `${q.id}: intervention is too underspecified`);
  }
});

test('APES clean-room source practices depend on the declared source type', () => {
  const source = bank.filter(q => q.stimulusGroupId);
  assert.equal(source.length, 60);
  for (const q of source) {
    assert.ok(q.stimulus && q.stimulus.type, `${q.id}: missing source`);
    if (q.stimulus.type === 'quantitative') {
      assert.ok(['5','6'].includes(q.skill), `${q.id}: quantitative source mislabeled ${q.skill}`);
      assert.match(q.q, /quantitative source|data|value|calculate|percent|change|relationship|table|rate|difference|efficien|shown/i, `${q.id}: quantitative task does not require quantitative evidence`);
    } else if (q.stimulus.type === 'visual') {
      assert.ok(['2','7'].includes(q.skill), `${q.id}: visual source mislabeled ${q.skill}`);
      assert.match(q.q, /model|map|diagram|pattern|shown|represented|relationship|management|response|action|strategy|use the/i, `${q.id}: visual task does not require the visual/model`);
    } else if (q.stimulus.type === 'text') {
      assert.equal(q.skill, '3', `${q.id}: text source mislabeled ${q.skill}`);
      assert.match(q.q, /source|claim|evidence|argument|statement|proposal|passage|reasoning/i, `${q.id}: text task does not require textual analysis`);
    } else {
      assert.fail(`${q.id}: unexpected source type ${q.stimulus.type}`);
    }
  }
});

test('APES clean-room standalones do not masquerade as source-analysis practices', () => {
  const standalone = bank.filter(q => !q.stimulusGroupId);
  assert.equal(standalone.length, 270);
  const counts = standalone.reduce((a,q)=>(a[q.skill]=(a[q.skill]||0)+1,a),{});
  assert.deepEqual(counts, { '1':198, '4':18, '7':54 });
  standalone.forEach(q => assert.ok(['1','4','7'].includes(q.skill), `${q.id}: unsupported standalone source-analysis tag ${q.skill}`));
});

test('APES clean-room post-repair answer wording remains scientifically meaningful', () => {
  const anchors = {
    'apes-q-u3-a-03': /comparison.*association.*causation/i,
    'apes-exp2-u4': /soil.*cover.*rainfall.*sediment/i,
    'apes-exp-u9': /shell.*pH.*temperature.*salinity/i,
    'apes-sol2-u3-03': /schools.*housing.*water.*infrastructure/i,
    'apes-sol2-u4-02': /NOx.*VOC/i,
    'apes-sol2-u8-01': /pipe.*field runoff/i,
    'apes-t-u9-a-03': /outcome data.*objective/i,
  };
  for (const [id, pattern] of Object.entries(anchors)) {
    const q = byId.get(id);
    assert.ok(q, `${id}: missing clean-room anchor`);
    assert.match(keyText(q), pattern, `${id}: answer-length repair lost the substantive mechanism`);
  }
});
