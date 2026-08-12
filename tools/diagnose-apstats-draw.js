const fs=require('node:fs');const vm=require('node:vm');
const s={window:{}};vm.createContext(s);vm.runInContext(fs.readFileSync('data/ap-statistics.js','utf8'),s);const bank=s.window.QUESTIONS_AP_STATISTICS;
const units=['U1','U2','U3','U4','U5'];
for(const u of units){const q=bank.filter(x=>x.unit===u), c={1:0,2:0,3:0,4:0};q.forEach(x=>c[x.skill[0]]++);console.log('UNIT-PRACTICE',u,q.length,c);}
const groups=new Map();for(const q of bank.filter(q=>q.stimulusGroupId)){if(!groups.has(q.stimulusGroupId))groups.set(q.stimulusGroupId,[]);groups.get(q.stimulusGroupId).push(q);}for(const [id,qs] of groups){const c={1:0,2:0,3:0,4:0};qs.forEach(x=>c[x.skill[0]]++);console.log('SET-PRACTICE',id,qs[0].unit,qs[0].statsSetType,c,qs.map(q=>[q.topicCode,q.skill]));}
const targets={U1:11,U2:9,U3:9,U4:7,U5:6};
function sample(arr,n){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a.slice(0,n);}
let within=0, setok=0;let mins={1:99,2:99,3:99,4:99},maxs={1:0,2:0,3:0,4:0};
for(let z=0;z<200000;z++){let d=[];for(const u of units)d=d.concat(sample(bank.filter(q=>q.unit===u),targets[u]));const c={1:0,2:0,3:0,4:0};d.forEach(q=>c[q.skill[0]]++);for(const k of [1,2,3,4]){mins[k]=Math.min(mins[k],c[k]);maxs[k]=Math.max(maxs[k],c[k]);}if(c[1]>=3&&c[1]<=4&&c[2]>=9&&c[2]<=12&&c[3]>=11&&c[3]<=14&&c[4]>=11&&c[4]<=14)within++;const gs=new Set(d.filter(q=>q.stimulusGroupId).map(q=>q.stimulusGroupId));const pr=d.filter(q=>q.statsSetType==='probability').length,rg=d.filter(q=>q.statsSetType==='regression').length;if(gs.size===2&&pr===3&&rg===3)setok++;}
console.log('NAIVE-FEASIBILITY',{within,setok,mins,maxs});