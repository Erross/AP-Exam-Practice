const test=require("node:test");
const assert=require("node:assert/strict");
const {AP_SUBJECTS}=require("../js/subjects");
const {drawExam}=require("../js/draw");
const {loadEffectiveBank}=require("../tools/subject-release-audit");
const subject=AP_SUBJECTS.find(x=>x.id==="ap-human-geography");
const {bank}=loadEffectiveBank(subject);
const units={U1:6,U2:9,U3:9,U4:9,U5:9,U6:9,U7:9};
const skills={"1":[15,21],"2":[10,15],"3":[8,12],"4":[8,12],"5":[8,12]};
test("Human Geography draws exact unit and source blueprint",()=>{
 for(let i=0;i<1000;i++){
  const draw=drawExam(subject,bank);assert.equal(draw.length,60);
  for(const [u,n] of Object.entries(units))assert.equal(draw.filter(q=>q.unit===u).length,n,`${u} mismatch`);
  const ids=[...new Set(draw.filter(q=>q.stimulusGroupId).map(q=>q.stimulusGroupId))];assert.equal(ids.length,7);assert.equal(draw.filter(q=>q.stimulusGroupId).length,21);
  const kinds=ids.map(id=>draw.find(q=>q.stimulusGroupId===id).stimulus.type);assert.equal(kinds.filter(x=>x==="quantitative").length,4);assert.equal(kinds.filter(x=>x==="visual").length,3);
 }
});
test("Human Geography draw skill families stay inside CED ranges",()=>{
 const mins={1:99,2:99,3:99,4:99,5:99},maxs={1:0,2:0,3:0,4:0,5:0};
 for(let i=0;i<5000;i++){
  const c={};drawExam(subject,bank).forEach(q=>{const f=q.skill.split('.')[0];c[f]=(c[f]||0)+1;});
  for(const f of Object.keys(skills)){mins[f]=Math.min(mins[f],c[f]||0);maxs[f]=Math.max(maxs[f],c[f]||0);}
 }
 console.log("Human Geography skill envelope",{mins,maxs});
 for(const [f,[lo,hi]] of Object.entries(skills)){assert.ok(mins[f]>=lo,`skill ${f} minimum ${mins[f]} below ${lo}`);assert.ok(maxs[f]<=hi,`skill ${f} maximum ${maxs[f]} above ${hi}`);}
});
