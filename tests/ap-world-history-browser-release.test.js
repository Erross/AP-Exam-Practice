const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {execFileSync}=require('node:child_process');
const root=path.join(__dirname,'..');
const layers=['data/ap-world-history.js',...Array.from({length:9},(_,i)=>`data/ap-world-history-u${i+1}.js`),'data/ap-world-history-quality-fixes.js','data/ap-world-history-quality-fixes-2.js','data/ap-world-history-quality-fixes-3.js'];
function loadBrowserState(){
  const c={window:{}};vm.createContext(c);
  vm.runInContext(fs.readFileSync(path.join(root,'js/subjects.js'),'utf8'),c,{filename:'js/subjects.js'});
  for(const f of layers) vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),c,{filename:f});
  return {subject:vm.runInContext('AP_SUBJECTS',c).find(s=>s.id==='ap-world-history'),bank:c.window.QUESTIONS_AP_WORLD_HISTORY};
}
test('AP World browser wiring exposes all browser-effective data layers in canonical order with no metadata overlay',()=>{
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  assert.equal(html.includes('js/ap-world-history-metadata.js'),false,'redundant World metadata overlay must not ship');
  let prev=html.indexOf('<script src="js/subjects.js"></script>');
  assert.ok(prev>=0,'subjects registry missing');
  for(const f of layers){const at=html.indexOf(`<script src="${f}"></script>`);assert.ok(at>=0,`missing ${f}`);assert.ok(at>prev,`out of order ${f}`);prev=at;}
  assert.equal(html.includes('data/ap-world-history-final-review.js'),false,'temporary final-review layer must not ship');
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
test('AP World distractors avoid the cartoon anachronism and wrong-domain patterns found in clean-room review',()=>{
  const bank=loadBrowserState().bank;
  const forbidden=/\b(jet propulsion|commercial jet aircraft|steam propulsion developed before 1500|rail transport in overseas trade|railroads across the Sahara|mechanical refrigeration|Spanish settlers mining silver in medieval Mali|Atlantic silver mining in medieval Mali|plantation sugar exports to the Americas before 1450|trans-Atlantic merchant guilds before 1450|ocean-going junks traveling across desert|free mechanical transport|modern sanitation systems before 1450|New World maize before 1300|encomienda distributed Ottoman offices|Estates-General selected janissaries|Chinese tributary system appointed Ottoman|electronic container tracking used on eighteenth-century canals|Mughal taxation of Chinese coastal ports)\b/i;
  const offenders=[];
  for(const q of bank){q.o.forEach((option,i)=>{if(i!==q.c[0]&&forbidden.test(option)) offenders.push(`${q.id}: ${option}`);});}
  assert.equal(offenders.length,0,offenders.join('\n'));
});
test('AP World exact final-review items retain serious same-domain competitors',()=>{
  const bank=loadBrowserState().bank;
  const ids=['apworld-u3-ottoman-safavid-01','apworld-u4-maritime-empires-01','apworld-u5-industrial-beginnings-02','apworld-u6-migration-causes-02','apworld-u7-wwi-causes-01','apworld-u7-mass-atrocity-01','apworld-u8-korea-01','apworld-u9-resistance-01'];
  for(const id of ids){
    const q=bank.find(item=>item.id===id);assert.ok(q,`missing ${id}`);
    const distractors=q.o.filter((_,i)=>i!==q.c[0]);
    assert.equal(distractors.length,3);
    distractors.forEach(option=>assert.ok(option.split(/\s+/).length>=8,`${id}: shallow distractor ${option}`));
  }
});
test('AP World generic release audit passes browser-effective 5000-form and retake gates',()=>{
  const out=execFileSync(process.execPath,[path.join(root,'tools/subject-release-audit.js'),'--subject','ap-world-history','--trials','5000','--overlap-trials','5000'],{cwd:root,encoding:'utf8'});
  assert.match(out,/Draw audit:\s*5000\/5000 valid/i);assert.match(out,/Retake overlap:/i);
});
