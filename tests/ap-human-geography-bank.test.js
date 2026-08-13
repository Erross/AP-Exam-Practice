const test=require("node:test");
const assert=require("node:assert/strict");
const {AP_SUBJECTS}=require("../js/subjects");
const {loadEffectiveBank}=require("../tools/subject-release-audit");
const subject=AP_SUBJECTS.find(x=>x.id==="ap-human-geography");
const {bank}=loadEffectiveBank(subject);
const counts=[7,12,8,10,12,11,8];
const topics=counts.flatMap((n,i)=>Array.from({length:n},(_,j)=>`${i+1}.${j+1}`));
test("Human Geography bank covers all 68 CED topics",()=>{
 assert.equal(subject.formatVerified,true); assert.equal(subject.releaseStatus,"released"); assert.equal(bank.length,204);
 assert.equal(new Set(bank.map(q=>q.id)).size,204); assert.equal(new Set(bank.map(q=>q.topicCode)).size,68);
 for(const code of topics) assert.equal(bank.filter(q=>q.topicCode===code).length,3,`${code}: expected 3 questions`);
 bank.forEach(q=>{assert.equal(q.o.length,4);assert.equal(q.c.length,1);assert.ok(q.e.length>=90,`${q.id}: short rationale`);assert.match(q.skill,/^[1-5]\.[A-Z]$/);});
});
test("Human Geography has 14 quantitative and 14 visual source sets",()=>{
 const groups=new Map(); bank.filter(q=>q.stimulusGroupId).forEach(q=>{if(!groups.has(q.stimulusGroupId))groups.set(q.stimulusGroupId,[]);groups.get(q.stimulusGroupId).push(q);});
 assert.equal(groups.size,28); const kinds={quantitative:0,visual:0};
 for(const [id,qs] of groups){assert.equal(qs.length,3,id);assert.equal(new Set(qs.map(q=>q.stimulus)).size,1,id);kinds[qs[0].stimulus.type]++;}
 assert.deepEqual(kinds,{quantitative:14,visual:14});
});
test("Human Geography exact skill families perform their declared task",()=>{
 const data=bank.filter(q=>q.skill.startsWith("3."));
 const visual=bank.filter(q=>q.skill.startsWith("4."));
 const scale=bank.filter(q=>q.skill.startsWith("5."));
 assert.equal(data.length,42); assert.equal(visual.length,42); assert.ok(scale.length>0);
 data.forEach(q=>assert.equal(q.stimulus&&q.stimulus.type,"quantitative",q.id));
 visual.forEach(q=>assert.equal(q.stimulus&&q.stimulus.type,"visual",q.id));
 scale.forEach(q=>{assert.equal(q.stimulusGroupId,null,q.id);assert.match(q.q,/local.*regional|regional.*local/i,q.id);});
});
// clean-room restart marker
