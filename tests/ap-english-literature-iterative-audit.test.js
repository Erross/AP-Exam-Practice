const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');
const {AP_SUBJECTS}=require('../js/subjects');const sb={window:{}};vm.createContext(sb);vm.runInContext(fs.readFileSync('data/ap-english-literature.js','utf8'),sb);const bank=sb.window[AP_SUBJECTS.find(s=>s.id==='ap-english-literature').dataVar];const q=id=>bank.find(x=>x.id===id);
test('AP Literature exact CED skill repairs remain semantic',()=>{
  assert.equal(q('aplit-sf-bell-03').topicCode,'1.C');assert.equal(q('aplit-sf-room-03').topicCode,'1.A');
  assert.match(q('aplit-sf-watch-03').o[q('aplit-sf-watch-03').c[0]],/remains constrained/);assert.match(q('aplit-sf-snow-03').o[q('aplit-sf-snow-03').c[0]],/remains vulnerable/);
  for(const id of ['aplit-ld-clock-09','aplit-ld-kitchen-09','aplit-ld-orbit-09']){assert.equal(q(id).topicCode,'7.C');assert.match(q(id).q,/commentary best explains/i)}
  for(const id of ['aplit-sf-bell-08','aplit-sf-supper-08','aplit-po-snake-06','aplit-po-snake-07','aplit-po-tyger-04','aplit-po-uphill-02','aplit-sf-room-08']) assert.equal(q(id).topicCode,'4.C',id);
  assert.equal(q('aplit-sf-watch-11').topicCode,'6.B');assert.equal(q('aplit-sf-bell-10').topicCode,'5.C');assert.equal(q('aplit-sf-supper-06').topicCode,'6.B');
});
test('AP Literature grammar and weak-distractor repairs hold',()=>{
  assert.equal(q('aplit-ld-orbit-03').o[q('aplit-ld-orbit-03').c[0]],'framing financial negotiation within festive domestic abundance');
  assert.match(q('aplit-sf-snow-10').o[q('aplit-sf-snow-10').c[0]],/^visually turning/);assert.doesNotMatch(q('aplit-po-uphill-10').o.join(' '),/never traveled/);assert.match(q('aplit-po-tyger-06').o[q('aplit-po-tyger-06').c[0]],/mystery that inquiry deepens/);
});
test('AP Literature raw skill-category inventory remains unchanged by semantic repairs',()=>{
  const counts={};for(const x of bank)counts[x.skill]=(counts[x.skill]||0)+1;assert.deepEqual(counts,{'1':24,'2':8,'3':26,'4':35,'5':18,'6':15,'7':16});
});
