const fs=require('node:fs');const vm=require('node:vm');
const s={window:{}};vm.createContext(s);vm.runInContext(fs.readFileSync('data/ap-statistics.js','utf8'),s);const bank=s.window.QUESTIONS_AP_STATISTICS;
const wc=x=>x.trim().split(/\s+/).length;let unique=0,among=0,cw=0,dw=0;const items=[];
for(const q of bank){const lens=q.o.map(wc),mx=Math.max(...lens),cl=lens[q.c[0]];if(cl===mx){among++;items.push({id:q.id,topic:q.topicCode,skill:q.skill,correct:q.o[q.c[0]],lens,options:q.o});}if(cl===mx&&lens.filter(x=>x===mx).length===1)unique++;cw+=cl;lens.forEach((x,i)=>{if(i!==q.c[0])dw+=x;});}
console.log('LENGTH-DIAG',JSON.stringify({n:bank.length,unique,uniquePct:unique/bank.length,among,amongPct:among/bank.length,correctAvg:cw/bank.length,distractorAvg:dw/(bank.length*3),gap:Math.abs(cw/bank.length-dw/(bank.length*3))/(dw/(bank.length*3))},null,2));
console.log('AMONG-ITEMS',JSON.stringify(items,null,2));