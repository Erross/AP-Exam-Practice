const fs=require('fs'),vm=require('vm');
const {AP_SUBJECTS}=require('../js/subjects');
const {apportion}=require('../js/draw');
const sb={window:{}};vm.createContext(sb);vm.runInContext(fs.readFileSync('data/ap-physics-c-em.js','utf8'),sb);
const bank=sb.window.QUESTIONS_AP_PHYSICS_C_EM,s=AP_SUBJECTS.find(x=>x.id==='ap-physics-c-em');
const skills=['2.A','2.B','2.C','2.D','3.B','3.C'];
const targets=apportion(s.units.map(u=>({id:u.id,weight:u.examWeight,capacity:bank.filter(q=>q.unit===u.id).length})),42);
console.log('TARGETS',targets);console.log('RANGES',s.attributeRanges.skill);
for(const u of s.units){const qs=bank.filter(q=>q.unit===u.id);console.log('UNIT',u.id,Object.fromEntries(skills.map(k=>[k,qs.filter(q=>q.skill===k).length])))}
const groups=[...new Set(bank.filter(q=>q.stimulusGroupId).map(q=>q.stimulusGroupId))];
const vec=qs=>skills.map(k=>qs.filter(q=>q.skill===k).length);
for(const g of groups)console.log('SET',g,bank.find(q=>q.stimulusGroupId===g).unit,vec(bank.filter(q=>q.stimulusGroupId===g)));
const max=skills.map(k=>s.attributeRanges.skill[k][1]),min=skills.map(k=>s.attributeRanges.skill[k][0]);
function comps(av,n,i=0,p=[]){if(i===skills.length-1)return n<=av[i]&&n<=max[i]?[p.concat(n)]:[];let o=[];for(let x=0;x<=Math.min(av[i],n,max[i]);x++)o.push(...comps(av,n-x,i+1,p.concat(x)));return o}
const add=(a,b)=>a.map((x,i)=>x+b[i]);let feasible=[];
for(let mask=0;mask<(1<<groups.length);mask++){const pc=mask.toString(2).replace(/0/g,'').length;if(pc<2||pc>4)continue;let states=[[0,0,0,0,0,0]],ok=true;
 for(const u of s.units){const gi=groups.findIndex(g=>bank.find(q=>q.stimulusGroupId===g).unit===u.id),use=!!(mask&(1<<gi)),setqs=use?bank.filter(q=>q.stimulusGroupId===groups[gi]):[],fixed=vec(setqs),need=targets[u.id]-setqs.length,stand=bank.filter(q=>q.unit===u.id&&!q.stimulusGroupId),av=skills.map(k=>stand.filter(q=>q.skill===k).length),choices=comps(av,need);if(!choices.length){ok=false;break}const next=new Map();for(const a of states)for(const c of choices){const v=add(add(a,fixed),c);if(v.every((x,i)=>x<=max[i]))next.set(v.join(','),v)}states=[...next.values()];if(!states.length){ok=false;break}}
 if(ok){const hit=states.find(v=>v.every((x,i)=>x>=min[i]));if(hit)feasible.push({sets:groups.filter((_,i)=>mask&(1<<i)),skills:Object.fromEntries(skills.map((k,i)=>[k,hit[i]]))})}}
console.log('FEASIBLE_COUNT',feasible.length);if(feasible.length)console.log('FIRST_FEASIBLE',JSON.stringify(feasible[0]));
