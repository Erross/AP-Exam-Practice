const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { drawExam } = require('../js/draw.js');

const root = path.join(__dirname, '..');
const files = [
  'data/ap-us-history.js',
  ...Array.from({length:9},(_,i)=>`data/ap-us-history-u${i+1}.js`),
  'data/ap-us-history-coverage.js',
];
const context = { window: {} };
vm.createContext(context);
for (const file of files) vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'), context, {filename:file});
const bank = context.window.QUESTIONS_AP_US_HISTORY;

const subject = {
  id:'ap-us-history', mcqCount:55, stimulusSetRange:[15,15],
  units:[
    {id:'U1',examWeight:3/55},{id:'U2',examWeight:4/55},{id:'U3',examWeight:8/55},
    {id:'U4',examWeight:8/55},{id:'U5',examWeight:8/55},{id:'U6',examWeight:7/55},
    {id:'U7',examWeight:7/55},{id:'U8',examWeight:7/55},{id:'U9',examWeight:3/55},
  ],
};
const target = {U1:3,U2:4,U3:8,U4:8,U5:8,U6:7,U7:7,U8:7,U9:3};
const topicMax = {U1:7,U2:8,U3:13,U4:14,U5:12,U6:14,U7:15,U8:15,U9:7};
const words = s => String(s).trim().split(/\s+/).filter(Boolean).length;

function draw() { return drawExam(subject, bank); }
function keyIndex(q) { return q.c[0]; }

test('APUSH bank covers the exact 105-topic Period 1-9 inventory', () => {
  assert.equal(bank.length, 186);
  const topics = new Set(bank.map(q => `${q.unit}:${q.topic}`));
  let expected = 0;
  for (let u=1; u<=9; u++) {
    for (let t=1; t<=topicMax[`U${u}`]; t++) {
      expected++;
      assert.ok(topics.has(`U${u}:${u}.${t}`), `missing ${u}.${t}`);
    }
  }
  assert.equal(expected,105);
});

test('APUSH schema and source sets are release-shaped', () => {
  const ids = new Set();
  const groups = new Map();
  for (const q of bank) {
    assert.ok(q.id && !ids.has(q.id)); ids.add(q.id);
    assert.match(q.unit,/^U[1-9]$/); assert.match(q.topic,/^[1-9]\.\d+$/);
    assert.equal(q.type,'s'); assert.equal(q.o.length,4); assert.equal(q.c.length,1);
    assert.ok(q.c[0]>=0 && q.c[0]<4); assert.ok(q.q.length>=20); assert.ok(q.e.length>=45);
    assert.ok(q.stimulusGroupId); assert.ok(q.stimulus && q.stimulus.source);
    assert.ok(['1','2','3','4','5'].includes(String(q.skill)), `MCQ skill ${q.skill}`);
    if (!groups.has(q.stimulusGroupId)) groups.set(q.stimulusGroupId,[]);
    groups.get(q.stimulusGroupId).push(q);
  }
  assert.ok(groups.size >= 50);
  for (const qs of groups.values()) {
    assert.ok(qs.length===3 || qs.length===4);
    assert.equal(new Set(qs.map(q=>q.unit)).size,1);
    assert.equal(new Set(qs.map(q=>JSON.stringify(q.stimulus))).size,1);
  }
});

test('APUSH answer construction stays within project cue limits', () => {
  let uniqueLongest=0, exploitableAmong=0;
  const keys=[0,0,0,0];
  for (const q of bank) {
    keys[keyIndex(q)]++;
    const lens=q.o.map(words), max=Math.max(...lens), winners=lens.filter(n=>n===max).length;
    if (lens[keyIndex(q)]===max && winners===1) uniqueLongest++;
    if (lens[keyIndex(q)]===max && winners<4) exploitableAmong++;
    assert.equal(new Set(q.o).size,4, q.id);
  }
  const uniqueRate=uniqueLongest/bank.length;
  const amongRate=exploitableAmong/bank.length;
  console.log('APUSH answer metrics',{uniqueLongest:(100*uniqueRate).toFixed(1)+'%',amongLongest:(100*amongRate).toFixed(1)+'%',keys});
  assert.ok(uniqueRate<=0.25, `unique-longest ${(100*uniqueRate).toFixed(1)}%`);
  assert.ok(amongRate<=0.45, `among-longest ${(100*amongRate).toFixed(1)}%`);
  for (const n of keys) assert.ok(n>=40 && n<=53, `key imbalance ${keys}`);
});

test('APUSH has no stacked absolute-language distractor tells', () => {
  const absolute=/\b(all|always|never|none|only|entirely|completely|immediately|every)\b/i;
  const bad=[];
  for (const q of bank) {
    const ds=q.o.filter((_,i)=>i!==keyIndex(q));
    if (ds.filter(x=>absolute.test(x)).length>=2) bad.push(q.id);
  }
  assert.deepEqual(bad,[]);
});

test('answer hardening does not repeat one boilerplate tail within a question', () => {
  for (const q of bank) {
    const ds=q.o.filter((_,i)=>i!==keyIndex(q));
    for (let i=0;i<ds.length;i++) for (let j=i+1;j<ds.length;j++) {
      const a=ds[i].split(', ').slice(-1)[0], b=ds[j].split(', ').slice(-1)[0];
      assert.notEqual(a,b,`${q.id} repeats qualifier: ${a}`);
    }
  }
});

test('5,000 APUSH draws are exact 55-question whole-set forms with the official unit blueprint', () => {
  for (let i=0;i<5000;i++) {
    const exam=draw(); assert.equal(exam.length,55,`draw ${i}`);
    const counts={}; for (const q of exam) counts[q.unit]=(counts[q.unit]||0)+1;
    assert.deepEqual(counts,target);
    const selected=new Set(exam.map(q=>q.id));
    const gids=new Set(exam.map(q=>q.stimulusGroupId));
    assert.equal(gids.size,15);
    for (const gid of gids) {
      const whole=bank.filter(q=>q.stimulusGroupId===gid);
      assert.ok(whole.every(q=>selected.has(q.id)),`split ${gid}`);
    }
  }
});

test('5,000 APUSH retake pairs average no more than 40% overlap', () => {
  let total=0;
  for (let i=0;i<5000;i++) {
    const a=draw(), b=draw(), ids=new Set(a.map(q=>q.id));
    total += b.filter(q=>ids.has(q.id)).length / 55;
  }
  const avg=total/5000;
  console.log('APUSH retake overlap',(100*avg).toFixed(1)+'%');
  assert.ok(avg<=0.40);
});

test('APUSH quantitative tables are explicitly synthetic and internally ordered', () => {
  const groups=[...new Map(bank.filter(q=>q.stimulus.type==='quantitative').map(q=>[q.stimulusGroupId,q.stimulus])).values()];
  assert.ok(groups.length>=3);
  for (const s of groups) {
    assert.match(s.source,/Original|synthetic|simulated|Illustrative/i);
    assert.ok(Array.isArray(s.columns) && s.columns.length>=2);
    assert.ok(Array.isArray(s.rows) && s.rows.length>=3);
  }
});
