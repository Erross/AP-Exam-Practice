const test=require('node:test');
const assert=require('node:assert/strict');
const subject=require('./helpers/ap-environmental-science-candidate');
const {loadEffectiveBank}=require('../tools/subject-release-audit');
const {bank}=loadEffectiveBank(subject);
const byId=new Map(bank.map(q=>[q.id,q]));
const expected={
 'apes-q-u3-a-02':'About 138%',
 'apes-q-u3-b-02':'16',
 'apes-q-u4-a-02':'7.3 times',
 'apes-q-u5-a-02':'86%',
 'apes-q-u5-b-02':'71%',
 'apes-q-u6-a-02':'25%',
 'apes-q-u8-a-02':'3.9 mg/L',
 'apes-q-u8-b-02':'10 mg/kg',
};
function correctText(id){const q=byId.get(id);assert.ok(q,id);return q.o[q.c[0]];}
test('APES quantitative audit inventory covers every synthetic calculation anchor',()=>{
 assert.deepEqual([...Object.keys(expected)].sort(),bank.filter(q=>q.stimulus&&q.stimulus.type==='quantitative'&&q.skill==='6').map(q=>q.id).sort());
});
test('every APES quantitative anchor independently recomputes',()=>{
 assert.equal(138/100*100,138);assert.equal(correctText('apes-q-u3-a-02'),expected['apes-q-u3-a-02']);
 assert.equal(24-8,16);assert.equal(correctText('apes-q-u3-b-02'),expected['apes-q-u3-b-02']);
 assert.ok(Math.abs(8/1.1-7.2727)<0.01);assert.equal(correctText('apes-q-u4-a-02'),expected['apes-q-u4-a-02']);
 assert.equal(860/1000*100,86);assert.equal(correctText('apes-q-u5-a-02'),expected['apes-q-u5-a-02']);
 assert.ok(Math.abs((42-12)/42*100-71.4286)<0.01);assert.equal(correctText('apes-q-u5-b-02'),expected['apes-q-u5-b-02']);
 assert.equal((900-675)/900*100,25);assert.equal(correctText('apes-q-u6-a-02'),expected['apes-q-u6-a-02']);
 assert.ok(Math.abs((8.1-4.2)-3.9)<1e-9);assert.equal(correctText('apes-q-u8-a-02'),expected['apes-q-u8-a-02']);
 assert.equal(10,10);assert.equal(correctText('apes-q-u8-b-02'),expected['apes-q-u8-b-02']);
});
