const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { AP_SUBJECTS } = require("../js/subjects");
const { drawExam } = require("../js/draw");

const subject = AP_SUBJECTS.find((item) => item.id === "ap-physics-c-mechanics");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync("data/ap-physics-c-mechanics.js", "utf8"), sandbox);
const bank = sandbox.window.QUESTIONS_AP_PHYSICS_C_MECHANICS;

const expectedTopics = {
  U1:["1.1","1.2","1.3","1.4","1.5"],
  U2:["2.1","2.2","2.3","2.4","2.5","2.6","2.7","2.8","2.9","2.10"],
  U3:["3.1","3.2","3.3","3.4","3.5"],
  U4:["4.1","4.2","4.3","4.4"],
  U5:["5.1","5.2","5.3","5.4","5.5","5.6"],
  U6:["6.1","6.2","6.3","6.4","6.5","6.6"],
  U7:["7.1","7.2","7.3","7.4","7.5"],
};

test("Physics C Mechanics metadata matches the May 2027 clarified exam", () => {
  assert.equal(subject.releaseStatus, "draft");
  assert.equal(subject.formatVerified, true);
  assert.equal(subject.mcqCount, 42);
  assert.equal(subject.mcqTimeMinutes, 85);
  assert.equal(subject.totalExamTimeLabel, "3h 0m");
  assert.equal(subject.calculatorAllowed, true);
  assert.equal(subject.freeResponse.timeMinutes, 95);
  assert.deepEqual(subject.units.map((unit) => unit.id), ["U1","U2","U3","U4","U5","U6","U7"]);
  assert.deepEqual(subject.units.map((unit) => unit.examWeight * 42), [5,9,8,6,5,5,4]);
  assert.deepEqual(subject.attributeRanges.skill, {
    "2.A":[11,12], "2.B":[9,10], "2.C":[5,6], "2.D":[5,6], "3.B":[7,10], "3.C":[3,4],
  });
});

test("Mechanics bank covers the exact 41-topic CED inventory", () => {
  assert.equal(bank.length, 144);
  assert.deepEqual(
    Object.fromEntries(Object.keys(expectedTopics).map((unit) => [unit, bank.filter((q) => q.unit === unit).length])),
    { U1:18, U2:33, U3:18, U4:15, U5:21, U6:21, U7:18 },
  );
  for (const [unit, topics] of Object.entries(expectedTopics)) {
    const found = [...new Set(bank.filter((q) => q.unit === unit).map((q) => q.topicCode))].sort((a,b) => a.localeCompare(b, undefined, { numeric:true }));
    assert.deepEqual(found, topics, `${unit}: exact CED topic set changed`);
    for (const topic of topics) assert.ok(bank.filter((q) => q.topicCode === topic).length >= 3, `${topic}: fewer than three questions`);
  }
});

test("Mechanics bank has sound single-select schema and only MCQ-assessed skills", () => {
  const allowed = new Set(["2.A","2.B","2.C","2.D","3.B","3.C"]);
  const ids = new Set();
  const shortRationales = [];
  for (const q of bank) {
    assert.match(q.id, /^pcm-(?:[1-7]\.\d{1,2}-\d{2}|set-u[1-7]-\d{2})$/);
    assert.ok(!ids.has(q.id), `duplicate id ${q.id}`); ids.add(q.id);
    assert.ok(allowed.has(q.skill), `${q.id}: invalid MCQ skill ${q.skill}`);
    assert.equal(q.type, "s");
    assert.equal(q.o.length, 4);
    assert.equal(q.c.length, 1);
    assert.equal(new Set(q.o.map((o) => o.trim().toLowerCase())).size, 4, `${q.id}: duplicate options`);
    if (q.e.length < 90) shortRationales.push(`${q.id}:${q.e.length}`);
  }
  assert.deepEqual(shortRationales, [], `rationales below 90 characters: ${shortRationales.join(", ")}`);
});

test("Mechanics bank has seven original three-question shared data sets", () => {
  const groups = new Map();
  for (const q of bank.filter((x) => x.stimulusGroupId)) {
    if (!groups.has(q.stimulusGroupId)) groups.set(q.stimulusGroupId, []);
    groups.get(q.stimulusGroupId).push(q);
  }
  assert.equal(groups.size, 7);
  assert.deepEqual([...groups.values()].map((items) => items[0].unit).sort(), ["U1","U2","U3","U4","U5","U6","U7"]);
  for (const [id, qs] of groups) {
    assert.equal(qs.length, 3, `${id}: expected three linked questions`);
    assert.equal(new Set(qs.map((q) => q.unit)).size, 1, `${id}: set crosses units`);
    assert.equal(new Set(qs.map((q) => q.stimulus)).size, 1, `${id}: stimulus is not shared by reference`);
    const s = qs[0].stimulus;
    assert.equal(s.type, "table");
    assert.equal(s.source, "Original simulated data created for AP Exam Practice.");
    assert.ok(s.description.length >= 60);
    assert.ok(s.columns.length >= 2);
    assert.ok(s.rows.length >= 3);
  }
});

test("Mechanics answer construction meets project bias and distractor standards", () => {
  const wc = (text) => text.trim().split(/\s+/).length;
  let uniqueLongest=0, amongLongest=0, correctWords=0, distractorWords=0;
  const keys=[0,0,0,0];
  const absoluteLanguage=/\b(always|never|every|only|entirely|unlimited|impossible|guaranteed)\b/i;
  for (const q of bank) {
    const lens=q.o.map(wc), longest=Math.max(...lens), cl=lens[q.c[0]], n=lens.filter((x)=>x===longest).length;
    if (cl===longest && n===1) uniqueLongest++;
    if (cl===longest && n<4) amongLongest++;
    correctWords += cl;
    lens.forEach((x,i)=>{ if(i!==q.c[0]) distractorWords += x; });
    keys[q.c[0]]++;
    const absoluteDistractors=q.o.filter((_,i)=>i!==q.c[0]).filter((o)=>absoluteLanguage.test(o));
    assert.ok(absoluteDistractors.length<=1, `${q.id}: stacked absolute-language distractors`);
  }
  const ca=correctWords/bank.length, da=distractorWords/(bank.length*3);
  assert.ok(uniqueLongest/bank.length <= 0.25, `uniquely-longest correct ${(100*uniqueLongest/bank.length).toFixed(1)}%`);
  assert.ok(amongLongest/bank.length <= 0.58, `among-longest correct ${(100*amongLongest/bank.length).toFixed(1)}%`);
  assert.ok(Math.abs(ca-da)/da <= 0.12, `correct/distractor word averages ${ca.toFixed(2)}/${da.toFixed(2)}`);
  keys.forEach((count) => assert.ok(count/bank.length >= 0.15 && count/bank.length <= 0.35, `raw key imbalance ${keys}`));
});

test("Mechanics randomized forms obey exact unit, skill, and whole-set constraints", () => {
  const targetUnits={U1:5,U2:9,U3:8,U4:6,U5:5,U6:5,U7:4};
  for (let trial=0; trial<500; trial++) {
    const draw=drawExam(subject, bank);
    assert.equal(draw.length,42);
    const units={}, skills={}, groups={};
    for (const q of draw) {
      units[q.unit]=(units[q.unit]||0)+1;
      skills[q.skill]=(skills[q.skill]||0)+1;
      if(q.stimulusGroupId) groups[q.stimulusGroupId]=(groups[q.stimulusGroupId]||0)+1;
    }
    assert.deepEqual(units,targetUnits);
    for (const [skill,range] of Object.entries(subject.attributeRanges.skill)) assert.ok(skills[skill]>=range[0] && skills[skill]<=range[1], `${skill}: ${skills[skill]} outside ${range}`);
    assert.ok(Object.values(groups).every((n)=>n===3), "shared set split");
    assert.ok(Object.keys(groups).length>=2 && Object.keys(groups).length<=4, `set count ${Object.keys(groups).length}`);
  }
});

test("Mechanics independent retake overlap stays at or below 40 percent", () => {
  let total=0;
  for (let trial=0; trial<300; trial++) {
    const a=drawExam(subject,bank), b=drawExam(subject,bank), ids=new Set(a.map((q)=>q.id));
    total += b.filter((q)=>ids.has(q.id)).length/42;
  }
  const overlap=total/300;
  console.log(`Physics C Mechanics overlap: ${(overlap*100).toFixed(1)}%`);
  assert.ok(overlap<=0.40);
});
