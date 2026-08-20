const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { AP_SUBJECTS } = require('../js/subjects');
const { drawExam } = require('../js/draw');

const scripts = [
  'data/ap-business-personal-finance.js',
  'data/ap-business-personal-finance-u1.js',
  'data/ap-business-personal-finance-u2.js',
  'data/ap-business-personal-finance-u3.js',
  'data/ap-business-personal-finance-u4.js',
  'data/ap-business-personal-finance-sets.js',
  'data/ap-business-personal-finance-sets-2.js',
  'data/ap-business-personal-finance-sets-3.js',
  'data/ap-business-personal-finance-quality.js',
  'data/ap-business-personal-finance-classification.js',
];
function load(){
  const subjects=structuredClone(AP_SUBJECTS);
  const c={AP_SUBJECTS:subjects}; c.window=c; c.globalThis=c; vm.createContext(c);
  vm.runInContext(fs.readFileSync('js/ap-business-personal-finance-metadata.js','utf8'),c);
  scripts.forEach(path=>vm.runInContext(fs.readFileSync(path,'utf8'),c,{filename:path}));
  return {subject:subjects.find(s=>s.id==='ap-business-personal-finance'),bank:Array.from(c.QUESTIONS_AP_BUSINESS_PERSONAL_FINANCE)};
}
const {subject,bank}=load();
const wc=value=>String(value||'').trim().split(/\s+/).filter(Boolean).length;
const fam=q=>String(q.skill).split('.')[0];
const count=(xs,fn)=>xs.reduce((o,x)=>{const k=fn(x);o[k]=(o[k]||0)+1;return o;},{});

test('AP Business answer construction stays inside project cue limits',()=>{
  let unique=0, among=0, correctWords=0, distractorWords=0;
  const keys=[0,0,0,0];
  for(const q of bank){
    const lens=q.o.map(wc), key=q.c[0], max=Math.max(...lens), maxCount=lens.filter(n=>n===max).length;
    if(lens[key]===max&&maxCount===1) unique++;
    if(lens[key]===max&&maxCount<4) among++;
    correctWords+=lens[key];
    lens.forEach((n,i)=>{if(i!==key)distractorWords+=n;});
    keys[key]++;
  }
  const u=unique/bank.length, a=among/bank.length;
  const ca=correctWords/bank.length, da=distractorWords/(bank.length*3);
  console.log('AP Business answer metrics',{uniqueLongest:`${(u*100).toFixed(1)}%`,amongLongest:`${(a*100).toFixed(1)}%`,correctWords:ca.toFixed(2),distractorWords:da.toFixed(2),keys});
  assert.ok(u<=0.25,`unique-longest ${(u*100).toFixed(1)}%`);
  assert.ok(a<=0.58,`among-longest ${(a*100).toFixed(1)}%`);
  assert.ok(Math.abs(ca-da)/da<=0.12,`word-length averages ${ca.toFixed(2)}/${da.toFixed(2)}`);
  keys.forEach((n,i)=>assert.ok(n/bank.length>=0.15&&n/bank.length<=0.35,`key ${i}: ${n}`));
});

test('5,000 AP Business forms satisfy official unit, skill, source-set, variant, and personal-finance constraints',()=>{
  const units={U1:15,U2:15,U3:18,U4:12};
  let pfMin=99,pfMax=0,setMin=99,setMax=0;
  for(let i=0;i<5000;i++){
    const draw=drawExam(subject,bank);
    assert.equal(draw.length,60,`draw ${i+1}`);
    assert.equal(new Set(draw.map(q=>q.id)).size,60,`duplicate draw ${i+1}`);
    assert.deepEqual(count(draw,q=>q.unit),units,`unit draw ${i+1}`);
    const skills=count(draw,fam);
    for(const [f,r] of Object.entries(subject.skillCountRanges)) assert.ok((skills[f]||0)>=r[0]&&(skills[f]||0)<=r[1],`draw ${i+1} skill ${f}=${skills[f]||0}`);
    const pf=draw.filter(q=>q.personalFinance).length; assert.ok(pf>=12&&pf<=15,`draw ${i+1} PF ${pf}`); pfMin=Math.min(pfMin,pf);pfMax=Math.max(pfMax,pf);
    const gids=[...new Set(draw.filter(q=>q.stimulusGroupId).map(q=>q.stimulusGroupId))];
    assert.ok(gids.length>=subject.stimulusSetRange[0]&&gids.length<=subject.stimulusSetRange[1],`draw ${i+1} sets ${gids.length}`);setMin=Math.min(setMin,gids.length);setMax=Math.max(setMax,gids.length);
    for(const gid of gids) assert.equal(draw.filter(q=>q.stimulusGroupId===gid).length,3,`draw ${i+1} ${gid}`);
    const variants=draw.filter(q=>q.variantGroupId).map(q=>q.variantGroupId);
    assert.equal(new Set(variants).size,variants.length,`draw ${i+1} repeated standalone variant group`);
  }
  console.log('AP Business 5000-form envelope',{personalFinance:[pfMin,pfMax],sourceSets:[setMin,setMax]});
});

test('5,000 AP Business retake pairs average no more than 40% shared questions',()=>{
  let overlap=0;
  for(let i=0;i<5000;i++){
    const a=drawExam(subject,bank), b=drawExam(subject,bank), ids=new Set(a.map(q=>q.id));
    overlap+=b.filter(q=>ids.has(q.id)).length/60;
  }
  overlap/=5000;
  console.log(`AP Business 5000-pair overlap: ${(overlap*100).toFixed(1)}%`);
  assert.ok(overlap<=0.40,`overlap ${(overlap*100).toFixed(1)}%`);
});
