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
  return context.window.AP_SUBJECTS.find(s=>s.id==='ap-us-history');
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
  assert.equal(s.releaseStatus,'draft');
});

test('APUSH generic release audit passes browser-effective 5000-form and retake gates',()=>{
  const out=execFileSync(process.execPath,[path.join(root,'tools/subject-release-audit.js'),'--subject','ap-us-history','--trials','5000','--overlap-trials','5000'],{cwd:root,encoding:'utf8'});
  assert.match(out,/Draw audit:\s*5000\/5000 valid/i);
  assert.match(out,/Retake overlap:/i);
});
