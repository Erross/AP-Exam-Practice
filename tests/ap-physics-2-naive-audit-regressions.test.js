const test=require('node:test'); const assert=require('node:assert/strict');
const {loadPhysics2Bank}=require('./helpers');
const bank=loadPhysics2Bank(), byId=new Map(bank.map(q=>[q.id,q]));
const answer=id=>{const q=byId.get(id);return q.o[q.c[0]]};
test('Physics 2 helper loads the browser-effective quality layer',()=>{
  assert.equal(answer('apphys2-u9-010'),'Four times as large');
  assert.match(answer('apphys2-u10-019'),/1.60×10\^−16 J/);
});
test('Physics 2 exact-skill audit repairs perform their tagged tasks',()=>{
  assert.equal(byId.get('apphys2-u11-009').skill,'2.C');
  assert.equal(byId.get('apphys2-u13-011').skill,'2.C');
  assert.equal(byId.get('apphys2-u14-026').skill,'2.C');
  assert.match(byId.get('apphys2-u9-013').q,/three times/i);
  assert.match(answer('apphys2-u12-013'),/doubles/i);
  assert.match(answer('apphys2-u14-007'),/one-fourth/i);
  assert.match(answer('apphys2-u15-015'),/three times/i);
});
