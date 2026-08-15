const fs=require('fs'),vm=require('vm');
const sandbox={window:{}};vm.createContext(sandbox);vm.runInContext(fs.readFileSync('data/ap-comparative-government.js','utf8'),sandbox);
const bank=sandbox.window.QUESTIONS_AP_COMPARATIVE_GOVERNMENT;
const words=s=>(String(s).trim().match(/\S+/g)||[]).length;
const bucket=q=>q.id.match(/-[abcde]$/)?.[0] || (q.id.match(/-(\d)$/)?.[0] || 'other');
const rows={};
for(const q of bank){const b=bucket(q);if(!rows[b])rows[b]={n:0,u:0,a:0,c:0,d:0};const lens=q.o.map(words),m=Math.max(...lens),cw=lens[q.c[0]],ties=lens.filter(x=>x===m).length;rows[b].n++;if(cw===m&&ties===1)rows[b].u++;if(cw===m&&ties<4)rows[b].a++;rows[b].c+=cw;rows[b].d+=(lens.reduce((s,x,i)=>s+(i===q.c[0]?0:x),0)/3);}
for(const [b,r] of Object.entries(rows))console.log(b,{n:r.n,unique:(100*r.u/r.n).toFixed(1),among:(100*r.a/r.n).toFixed(1),correct:(r.c/r.n).toFixed(2),distractor:(r.d/r.n).toFixed(2)});
console.log('Top unique-longest:');
bank.filter(q=>{const l=q.o.map(words),m=Math.max(...l);return l[q.c[0]]===m&&l.filter(x=>x===m).length===1}).slice(0,50).forEach(q=>console.log(q.id,words(q.o[q.c[0]]),q.o.map(words).join('/'),q.q));
