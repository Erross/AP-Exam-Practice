const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');const sb={window:{}};vm.createContext(sb);vm.runInContext(fs.readFileSync('data/ap-english-language.js','utf8'),sb);const bank=sb.window.QUESTIONS_AP_ENGLISH_LANGUAGE,q=id=>bank.find(x=>x.id===id);
test('AP Language 1.A items assess rhetorical message rather than style or method',()=>{for(const id of ['aplang-r-repair-03','aplang-r-replicas-03']){assert.equal(q(id).topicCode,'1.A');assert.match(q(id).q,/message/i)}});
test('AP Language sentence-revision keys are actual proposed prose',()=>{for(const id of ['aplang-w-fridge-01','aplang-w-fridge-05','aplang-w-start-01','aplang-w-history-01','aplang-w-dark-01','aplang-w-native-01','aplang-ws-refill-01']){const x=q(id),a=x.o[x.c[0]];assert.match(a,/^[A-Z]/,id);assert.match(a,/[.!?]$/,id);assert.doesNotMatch(a,/^(connect|explain|introduce|identify)\b/i,id)}});
test('AP Language targeted evidence distractors remain relevant competitors',()=>{for(const id of ['aplang-w-dark-03','aplang-w-native-03'])assert.ok(q(id).o.every(a=>a.split(/\s+/).length>=7),id)});
test('AP Language second-pass writing distractors are substantive alternatives',()=>{
  const forbidden=/painted blue|unrelated to school start times|every athlete will oppose/i;
  for(const id of ['aplang-w-fridge-03','aplang-w-start-02','aplang-w-start-03']){
    const x=q(id);
    assert.equal(new Set(x.o).size,4,id);
    assert.ok(x.o.every(a=>a.split(/\s+/).length>=6),id);
    assert.ok(x.o.every(a=>!forbidden.test(a)),id);
  }
});
