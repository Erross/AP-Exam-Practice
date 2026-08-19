const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { drawExam } = require('../js/draw.js');

const root = path.join(__dirname, '..');
const files = ['data/ap-world-history.js', ...Array.from({length:9},(_,i)=>`data/ap-world-history-u${i+1}.js`)];
const context={window:{}}; vm.createContext(context);
for(const file of files) vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
const bank=context.window.QUESTIONS_AP_WORLD_HISTORY;
const subject={id:'ap-world-history',mcqCount:55,units:[
  {id:'U1',examWeight:5/55},{id:'U2',examWeight:5/55},{id:'U3',examWeight:8/55},{id:'U4',examWeight:8/55},{id:'U5',examWeight:7/55},{id:'U6',examWeight:7/55},{id:'U7',examWeight:5/55},{id:'U8',examWeight:5/55},{id:'U9',examWeight:5/55},
],stimulusSetRange:[13,13]};
const target={U1:5,U2:5,U3:8,U4:8,U5:7,U6:7,U7:5,U8:5,U9:5};
const topicMax={U1:7,U2:7,U3:4,U4:8,U5:10,U6:8,U7:9,U8:9,U9:9};
const words=s=>String(s).trim().split(/\s+/).filter(Boolean).length;
const key=q=>q.c[0];
const draw=()=>drawExam(subject,bank);

test('AP World bank covers the exact 71-topic current CED inventory',()=>{
  assert.equal(bank.length,164);
  const topics=new Set(bank.map(q=>`${q.unit}:${q.topic}`));
  let expected=0;
  for(let u=1;u<=9;u++) for(let t=1;t<=topicMax[`U${u}`];t++) { expected++; assert.ok(topics.has(`U${u}:${u}.${t}`),`missing ${u}.${t}`); }
  assert.equal(expected,71);
});

test('AP World source-set schema and MCQ skill use are release-shaped',()=>{
  const ids=new Set(), groups=new Map();
  for(const q of bank){
    assert.ok(q.id&&!ids.has(q.id),q.id); ids.add(q.id);
    assert.match(q.unit,/^U[1-9]$/); assert.match(q.topic,/^[1-9]\.\d+$/);
    assert.equal(q.type,'s'); assert.equal(q.o.length,4); assert.equal(q.c.length,1); assert.ok(key(q)>=0&&key(q)<4);
    assert.ok(q.q.length>=20); assert.ok(q.e.length>=45); assert.ok(['1','2','3','4','5'].includes(String(q.skill)),`${q.id} skill ${q.skill}`);
    if(q.stimulusGroupId){ if(!groups.has(q.stimulusGroupId)) groups.set(q.stimulusGroupId,[]); groups.get(q.stimulusGroupId).push(q); assert.ok(q.stimulus&&q.stimulus.source); }
  }
  assert.equal(groups.size,41);
  for(const qs of groups.values()){ assert.ok(qs.length===3||qs.length===4); assert.equal(new Set(qs.map(q=>q.unit)).size,1); }
});

test('AP World answer construction stays inside project cue limits',()=>{
  let unique=0, among=0, correctWords=0, distractorWords=0, distractorN=0; const keys=[0,0,0,0];
  for(const q of bank){
    keys[key(q)]++; const lens=q.o.map(words), max=Math.max(...lens), winners=lens.filter(n=>n===max).length;
    if(lens[key(q)]===max&&winners===1) unique++;
    if(lens[key(q)]===max&&winners<4) among++;
    correctWords+=lens[key(q)]; q.o.forEach((o,i)=>{if(i!==key(q)){distractorWords+=words(o);distractorN++;}});
    assert.equal(new Set(q.o).size,4,q.id);
  }
  const uniqueRate=unique/bank.length, amongRate=among/bank.length, cMean=correctWords/bank.length, dMean=distractorWords/distractorN;
  console.log('AP World answer metrics',{uniqueLongest:(100*uniqueRate).toFixed(1)+'%',amongLongest:(100*amongRate).toFixed(1)+'%',correctWords:cMean.toFixed(2),distractorWords:dMean.toFixed(2),keys});
  assert.ok(uniqueRate<=0.25,`unique-longest ${(100*uniqueRate).toFixed(1)}%`);
  assert.ok(amongRate<=0.45,`among-longest ${(100*amongRate).toFixed(1)}%`);
  assert.ok(Math.abs(cMean-dMean)/dMean<=0.12,`word means ${cMean.toFixed(2)} vs ${dMean.toFixed(2)}`);
  for(const n of keys) assert.ok(n>=35&&n<=47,`key imbalance ${keys}`);
});

test('AP World has no stacked absolute-language distractor tells',()=>{
  const absolute=/\b(all|always|never|none|only|entirely|completely|immediately|every)\b/i, bad=[];
  for(const q of bank){ const ds=q.o.filter((_,i)=>i!==key(q)); if(ds.filter(x=>absolute.test(x)).length>=2) bad.push(q.id); }
  assert.deepEqual(bad,[]);
});

test('5,000 AP World forms deliver exact whole-set 55-question blueprint',()=>{
  for(let i=0;i<5000;i++){
    const exam=draw(); assert.equal(exam.length,55,`draw ${i}`);
    const counts={}; for(const q of exam) counts[q.unit]=(counts[q.unit]||0)+1; assert.deepEqual(counts,target);
    const selected=new Set(exam.map(q=>q.id)), gids=new Set(exam.filter(q=>q.stimulusGroupId).map(q=>q.stimulusGroupId)); assert.equal(gids.size,13);
    for(const gid of gids){ const whole=bank.filter(q=>q.stimulusGroupId===gid); assert.ok(whole.every(q=>selected.has(q.id)),`split ${gid}`); }
  }
});

test('5,000 AP World retake pairs average no more than 40% overlap',()=>{
  let total=0; for(let i=0;i<5000;i++){ const a=draw(),b=draw(),ids=new Set(a.map(q=>q.id)); total+=b.filter(q=>ids.has(q.id)).length/55; }
  const avg=total/5000; console.log('AP World retake overlap',(100*avg).toFixed(1)+'%'); assert.ok(avg<=0.40);
});

test('AP World synthetic quantitative sources remain explicit and readable',()=>{
  const sources=[...new Map(bank.filter(q=>q.stimulus&&q.stimulus.type==='quantitative').map(q=>[q.stimulusGroupId,q.stimulus])).values()];
  assert.ok(sources.length>=2);
  for(const s of sources){ assert.match(s.source,/Original|synthetic|simulated|Illustrative/i); assert.ok(Array.isArray(s.columns)&&s.columns.length>=3); assert.ok(Array.isArray(s.rows)&&s.rows.length>=3); }
});
