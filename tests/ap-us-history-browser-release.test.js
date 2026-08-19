const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');

const root = path.join(__dirname, '..');
function loadRegistry() {
  const context={window:{}}; vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root,'js/subjects.js'),'utf8'),context,{filename:'js/subjects.js'});
  const subjects=vm.runInContext('AP_SUBJECTS',context);
  return subjects.find(s=>s.id==='ap-us-history');
}
function loadBank(){
  const context={window:{}}; vm.createContext(context);
  const files=['data/ap-us-history.js',...Array.from({length:9},(_,i)=>`data/ap-us-history-u${i+1}.js`),'data/ap-us-history-coverage.js'];
  for(const file of files) vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
  return context.window.QUESTIONS_AP_US_HISTORY;
}

test('APUSH browser wiring exposes every authored layer in canonical order',()=>{
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  const expected=['data/ap-us-history.js',...Array.from({length:9},(_,i)=>`data/ap-us-history-u${i+1}.js`),'data/ap-us-history-coverage.js'];
  let previous=-1;
  for(const file of expected){ const at=html.indexOf(`<script src="${file}"></script>`); assert.ok(at>=0,`missing ${file}`); assert.ok(at>previous,`${file} out of order`); previous=at; }
});

test('APUSH naive student preflight exposes current May 2027 exam-critical facts',()=>{
  const s=loadRegistry();
  assert.equal(s.formatVerified,true);
  assert.equal(s.mcqCount,55);
  assert.equal(s.mcqTimeMinutes,55);
  assert.equal(s.totalExamTimeLabel,'3h 15m');
  assert.equal(s.calculatorAllowed,false);
  assert.match(s.tierNote,/Section I Part A practice only/i);
  assert.match(s.tierNote,/three short-answer questions/i);
  assert.match(s.tierNote,/document-based question/i);
  assert.match(s.tierNote,/long essay/i);
  assert.equal(s.units.length,9);
  assert.equal(s.releaseStatus,'released');
});

test('APUSH rationale-depth inventory is release-grade',()=>{
  const short=loadBank().filter(q=>typeof q.e!=='string'||q.e.trim().length<90).map(q=>`${q.id} (${(q.e||'').length}): ${q.e}`);
  if(short.length) console.log('APUSH_SHORT_RATIONALES\n'+short.join('\n'));
  assert.equal(short.length,0,'APUSH rationales below 90 characters');
});

test('APUSH post-9/11 item keeps the direct causal claim historically narrow',()=>{
  const q=loadBank().find(item=>item.id==='apush-u9-e-02');
  assert.ok(q,'missing post-9/11 regression target');
  assert.match(q.q,/most directly led to/i);
  const answer=q.o[q.c[0]];
  assert.match(answer,/Afghanistan/i);
  assert.doesNotMatch(answer,/Iraq/i);
  assert.match(q.e,/Afghanistan/i);
  assert.match(q.e,/al-Qaeda|Taliban/i);
  assert.doesNotMatch(q.e,/Iraq/i);
});

test('APUSH generic release audit passes browser-effective 5000-form and retake gates',()=>{
  const out=execFileSync(process.execPath,[path.join(root,'tools/subject-release-audit.js'),'--subject','ap-us-history','--trials','5000','--overlap-trials','5000'],{cwd:root,encoding:'utf8'});
  assert.match(out,/Draw audit:\s*5000\/5000 valid/i);
  assert.match(out,/Retake overlap:/i);
});
