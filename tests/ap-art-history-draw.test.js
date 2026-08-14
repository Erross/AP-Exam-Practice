const test=require("node:test");
const assert=require("node:assert/strict");
const {AP_SUBJECTS}=require("../js/subjects");
const {loadEffectiveBank}=require("../tools/subject-release-audit");
const {drawExam}=require("../js/draw");
const subject=AP_SUBJECTS.find(x=>x.id==="ap-art-history");
const {bank}=loadEffectiveBank(subject);
const unitTargets={U1:3,U2:12,U3:17,U4:17,U5:5,U6:5,U7:3,U8:6,U9:3,U10:9};

test("Art History randomized forms obey exact unit, skill, and visual-set constraints",()=>{
 const ranges=subject.skillCountRanges; const observed={}; Object.keys(ranges).forEach(k=>observed[k]=[Infinity,-Infinity]);
 let minSets=Infinity,maxSets=-Infinity;
 for(let i=0;i<1000;i++){
  const exam=drawExam(subject,bank); assert.equal(exam.length,80);
  const units={}; const skills={}; const groups=new Set();
  exam.forEach(q=>{units[q.unit]=(units[q.unit]||0)+1;skills[q.skill]=(skills[q.skill]||0)+1;if(q.stimulusGroupId)groups.add(q.stimulusGroupId);});
  assert.deepEqual(units,unitTargets);
  for(const [skill,[lo,hi]] of Object.entries(ranges)){const n=skills[skill]||0;assert.ok(n>=lo&&n<=hi,`skill ${skill}: ${n}`);observed[skill][0]=Math.min(observed[skill][0],n);observed[skill][1]=Math.max(observed[skill][1],n);}
  assert.ok(groups.size>=17&&groups.size<=21,`visual sets: ${groups.size}`);minSets=Math.min(minSets,groups.size);maxSets=Math.max(maxSets,groups.size);
  for(const gid of groups){assert.equal(exam.filter(q=>q.stimulusGroupId===gid).length,2,`${gid}: split set`);}
 }
 console.log("Art History skill envelope",observed,"visual sets",[minSets,maxSets]);
});

test("Art History retake overlap remains at or below the project target",()=>{
 let sum=0; const trials=1000;
 for(let i=0;i<trials;i++){const a=drawExam(subject,bank), b=drawExam(subject,bank);const ids=new Set(a.map(q=>q.id));sum+=b.filter(q=>ids.has(q.id)).length/80;}
 const avg=sum/trials; console.log(`Art History Monte Carlo overlap: ${(avg*100).toFixed(1)}%`); assert.ok(avg<=0.40,`overlap ${(avg*100).toFixed(1)}%`);
});
