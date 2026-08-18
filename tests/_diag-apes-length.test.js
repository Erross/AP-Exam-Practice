const test=require('node:test');
const subject=require('./helpers/ap-environmental-science-candidate');
const {loadEffectiveBank}=require('../tools/subject-release-audit');
const {bank}=loadEffectiveBank(subject);
const wc=s=>String(s).trim().split(/\s+/).filter(Boolean).length;
test('diagnose APES uniquely-longest keys',()=>{
  const rows=[];
  for(const q of bank){
    const lens=q.o.map(wc), key=q.c[0], max=Math.max(...lens);
    if(lens[key]===max && lens.filter(n=>n===max).length===1){
      rows.push({id:q.id,unit:q.unit,topic:q.topicCode,skill:q.skill,lens,key,answer:q.o[key]});
    }
  }
  console.log('APES_UNIQUE_LONGEST_COUNT',rows.length,'OF',bank.length,(100*rows.length/bank.length).toFixed(1)+'%');
  rows.sort((a,b)=>(b.lens[b.key]-Math.max(...b.lens.filter((_,i)=>i!==b.key)))-(a.lens[a.key]-Math.max(...a.lens.filter((_,i)=>i!==a.key))));
  for(const r of rows) console.log('APES_LONG',JSON.stringify(r));
});