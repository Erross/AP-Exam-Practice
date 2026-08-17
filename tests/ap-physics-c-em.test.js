const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { AP_SUBJECTS } = require("../js/subjects");
const { drawExam, apportion } = require("../js/draw");

const subject = AP_SUBJECTS.find((item) => item.id === "ap-physics-c-em");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync("data/ap-physics-c-em.js", "utf8"), sandbox);
const bank = sandbox.window.QUESTIONS_AP_PHYSICS_C_EM;

const expectedTopics = {
  U8:["8.1","8.2","8.3","8.4","8.5","8.6"],
  U9:["9.1","9.2","9.3"],
  U10:["10.1","10.2","10.3","10.4"],
  U11:["11.1","11.2","11.3","11.4","11.5","11.6","11.7","11.8"],
  U12:["12.1","12.2","12.3","12.4"],
  U13:["13.1","13.2","13.3","13.4","13.5","13.6"],
};

const targetUnits = apportion(subject.units.map((u) => ({
  id:u.id, weight:u.examWeight, capacity:bank.filter((q)=>q.unit===u.id).length,
})), subject.mcqCount);

test("Physics C E&M metadata matches the May 2027 clarified exam", () => {
  assert.equal(subject.releaseStatus, "draft");
  assert.equal(subject.formatVerified, true);
  assert.equal(subject.mcqCount, 42);
  assert.equal(subject.mcqTimeMinutes, 85);
  assert.equal(subject.totalExamTimeLabel, "3h 0m");
  assert.equal(subject.calculatorAllowed, true);
  assert.equal(subject.freeResponse.timeMinutes, 95);
  assert.deepEqual(subject.units.map((u)=>u.id), ["U8","U9","U10","U11","U12","U13"]);
  assert.deepEqual(targetUnits, {U8:9,U9:6,U10:5,U11:9,U12:7,U13:6});
  assert.deepEqual(subject.attributeRanges.skill, {
    "2.A":[11,12], "2.B":[9,10], "2.C":[5,6], "2.D":[5,6], "3.B":[7,10], "3.C":[3,4],
  });
});

test("Physics C E&M bank covers the exact 31-topic CED inventory", () => {
  assert.equal(bank.length, 152);
  assert.deepEqual(
    Object.fromEntries(Object.keys(expectedTopics).map((unit)=>[unit,bank.filter((q)=>q.unit===unit).length])),
    {U8:28,U9:16,U10:21,U11:37,U12:21,U13:29},
  );
  for (const [unit, topics] of Object.entries(expectedTopics)) {
    const found=[...new Set(bank.filter((q)=>q.unit===unit).map((q)=>q.topicCode))].sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));
    assert.deepEqual(found, topics, `${unit}: exact CED topic set changed`);
    for (const topic of topics) assert.ok(bank.filter((q)=>q.topicCode===topic && !q.stimulusGroupId).length >= 4, `${topic}: fewer than four standalone questions`);
  }
});

test("Physics C E&M bank has sound single-select schema and only MCQ-assessed skills", () => {
  const allowed=new Set(["2.A","2.B","2.C","2.D","3.B","3.C"]), ids=new Set(), short=[];
  for (const q of bank) {
    assert.match(q.id,/^em-(?:\d{1,2}\.\d{1,2}-\d{2}|set-u(?:8|9|10|11|12|13)-\d{2})$/);
    assert.ok(!ids.has(q.id),`duplicate id ${q.id}`); ids.add(q.id);
    assert.ok(allowed.has(q.skill),`${q.id}: invalid MCQ skill ${q.skill}`);
    assert.equal(q.type,"s"); assert.equal(q.o.length,4); assert.equal(q.c.length,1);
    assert.equal(new Set(q.o.map((o)=>o.trim().toLowerCase())).size,4,`${q.id}: duplicate options`);
    if(q.e.length<90) short.push(`${q.id}:${q.e.length}`);
  }
  assert.deepEqual(short,[],`rationales below 90 characters: ${short.join(", ")}`);
});

test("Physics C E&M bank has six original three-question shared data sets", () => {
  const groups=new Map();
  for(const q of bank.filter((x)=>x.stimulusGroupId)){if(!groups.has(q.stimulusGroupId))groups.set(q.stimulusGroupId,[]);groups.get(q.stimulusGroupId).push(q);}
  assert.equal(groups.size,6);
  assert.deepEqual([...groups.values()].map((qs)=>qs[0].unit).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true})),["U8","U9","U10","U11","U12","U13"]);
  for(const [id,qs] of groups){
    assert.equal(qs.length,3,`${id}: expected three linked questions`);
    assert.equal(new Set(qs.map((q)=>q.unit)).size,1,`${id}: set crosses units`);
    assert.equal(new Set(qs.map((q)=>q.stimulus)).size,1,`${id}: stimulus not shared by reference`);
    const s=qs[0].stimulus; assert.equal(s.type,"table"); assert.equal(s.source,"Original simulated data created for AP Exam Practice.");
    assert.ok(s.description.length>=60,`${id}: short stimulus description`); assert.ok(s.columns.length>=2); assert.ok(s.rows.length>=3);
  }
});

test("Physics C E&M answer construction meets project bias and distractor standards", () => {
  const wc=(t)=>t.trim().split(/\s+/).length; let unique=0,among=0,cw=0,dw=0; const keys=[0,0,0,0], stacked=[];
  const abs=/\b(always|never|every|only|entirely|unlimited|impossible|guaranteed)\b/i;
  for(const q of bank){
    const lens=q.o.map(wc),long=Math.max(...lens),cl=lens[q.c[0]],n=lens.filter((x)=>x===long).length;
    if(cl===long&&n===1)unique++; if(cl===long&&n<4)among++; cw+=cl; lens.forEach((x,i)=>{if(i!==q.c[0])dw+=x;}); keys[q.c[0]]++;
    if(q.o.filter((_,i)=>i!==q.c[0]).filter((o)=>abs.test(o)).length>1)stacked.push(q.id);
  }
  const ca=cw/bank.length,da=dw/(bank.length*3);
  console.log(`E&M bias: unique ${(100*unique/bank.length).toFixed(1)}%, among ${(100*among/bank.length).toFixed(1)}%, words ${ca.toFixed(2)}/${da.toFixed(2)}, keys ${keys}`);
  assert.deepEqual(stacked,[],`stacked absolute-language distractors: ${stacked.join(", ")}`);
  assert.ok(unique/bank.length<=0.25); assert.ok(among/bank.length<=0.58);
  assert.ok(Math.abs(ca-da)/da<=0.12,`correct/distractor word averages ${ca.toFixed(2)}/${da.toFixed(2)}`);
  keys.forEach((count)=>assert.ok(count/bank.length>=0.15&&count/bank.length<=0.35,`raw key imbalance ${keys}`));
});

test("Physics C E&M randomized forms obey exact unit, skill, and whole-set constraints", () => {
  for(let trial=0;trial<500;trial++){
    const draw=drawExam(subject,bank); assert.equal(draw.length,42); const units={},skills={},groups={};
    for(const q of draw){units[q.unit]=(units[q.unit]||0)+1;skills[q.skill]=(skills[q.skill]||0)+1;if(q.stimulusGroupId)groups[q.stimulusGroupId]=(groups[q.stimulusGroupId]||0)+1;}
    assert.deepEqual(units,targetUnits);
    for(const [skill,range] of Object.entries(subject.attributeRanges.skill)) assert.ok(skills[skill]>=range[0]&&skills[skill]<=range[1],`${skill}: ${skills[skill]} outside ${range}`);
    assert.ok(Object.values(groups).every((n)=>n===3),"shared set split"); assert.ok(Object.keys(groups).length>=2&&Object.keys(groups).length<=4,`set count ${Object.keys(groups).length}`);
  }
});

test("Physics C E&M independent retake overlap stays at or below 40 percent", () => {
  let total=0; for(let trial=0;trial<300;trial++){const a=drawExam(subject,bank),b=drawExam(subject,bank),ids=new Set(a.map((q)=>q.id));total+=b.filter((q)=>ids.has(q.id)).length/42;}
  const overlap=total/300; console.log(`Physics C E&M overlap: ${(overlap*100).toFixed(1)}%`); assert.ok(overlap<=0.40);
});
