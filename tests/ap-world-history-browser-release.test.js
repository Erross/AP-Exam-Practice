const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {execFileSync}=require('node:child_process');
const root=path.join(__dirname,'..');
const metadata='js/ap-world-history-metadata.js';
const layers=['data/ap-world-history.js',...Array.from({length:9},(_,i)=>`data/ap-world-history-u${i+1}.js`)];
function loadBrowserState(){
  const c={window:{}};vm.createContext(c);
  vm.runInContext(fs.readFileSync(path.join(root,'js/subjects.js'),'utf8'),c,{filename:'js/subjects.js'});
  vm.runInContext(fs.readFileSync(path.join(root,metadata),'utf8'),c,{filename:metadata});
  for(const f of layers) vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),c,{filename:f});
  return {subject:vm.runInContext('AP_SUBJECTS',c).find(s=>s.id==='ap-world-history'),bank:c.window.QUESTIONS_AP_WORLD_HISTORY};
}
test('AP World browser wiring exposes metadata then all ten canonical data layers',()=>{
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  const metadataAt=html.indexOf(`<script src="${metadata}"></script>`);
  const registryAt=html.indexOf('<script src="js/subjects.js"></script>');
  assert.ok(metadataAt>registryAt,'AP World metadata must load after registry');
  let prev=metadataAt;
  for(const f of layers){const at=html.indexOf(`<script src="${f}"></script>`);assert.ok(at>=0,`missing ${f}`);assert.ok(at>prev,`out of order ${f}`);prev=at;}
});
test('AP World naive preflight exposes May 2027 exam-critical facts in browser-effective registry',()=>{
  const s=loadBrowserState().subject;
  assert.equal(s.formatVerified,true);assert.equal(s.releaseStatus,'draft');
  assert.equal(s.mcqCount,55);assert.equal(s.mcqTimeMinutes,55);assert.equal(s.totalExamTimeLabel,'3h 15m');assert.equal(s.calculatorAllowed,false);
  assert.equal(s.units.length,9);assert.match(s.tierNote,/Section I Part A practice only/i);assert.match(s.tierNote,/three short-answer questions/i);assert.match(s.tierNote,/document-based question/i);assert.match(s.tierNote,/long essay/i);
});
test('AP World rationale-depth inventory is release-grade',()=>{
  const short=loadBrowserState().bank.filter(q=>typeof q.e!=='string'||q.e.trim().length<90).map(q=>`${q.id} (${(q.e||'').length}): ${q.e}`);
  if(short.length) console.log('APWORLD_SHORT_RATIONALES\n'+short.join('\n'));
  assert.equal(short.length,0,'AP World rationales below 90 characters');
});
test('AP World generic release audit passes browser-effective 5000-form and retake gates',()=>{
  const out=execFileSync(process.execPath,[path.join(root,'tools/subject-release-audit.js'),'--subject','ap-world-history','--trials','5000','--overlap-trials','5000'],{cwd:root,encoding:'utf8'});
  assert.match(out,/Draw audit:\s*5000\/5000 valid/i);assert.match(out,/Retake overlap:/i);
});
