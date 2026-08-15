const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const {AP_SUBJECTS}=require('../js/subjects');

test('browser data scripts share one collision-free global scope',()=>{
 const html=fs.readFileSync('index.html','utf8');
 const scripts=[...html.matchAll(/<script src="(data\/[^"]+\.js)"/g)].map(match=>match[1]);
 assert.ok(scripts.length>=45,'expected the complete browser data-script inventory');

 const sandbox={window:{}};
 vm.createContext(sandbox);
 for(const file of scripts){
  assert.doesNotThrow(
   ()=>vm.runInContext(fs.readFileSync(file,'utf8'),sandbox,{filename:file}),
   `${file} must load after every preceding browser data script`
  );
 }

 for(const subject of AP_SUBJECTS.filter(item=>item.releaseStatus==='released')){
  assert.ok(Array.isArray(sandbox.window[subject.dataVar]),`${subject.id}: ${subject.dataVar} must exist after the shared browser load`);
 }
});
