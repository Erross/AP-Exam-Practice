const fs=require('fs'),vm=require('vm');
const p='data/ap-statistics.js',t='tests/ap-statistics.test.js';
const s={window:{}};vm.createContext(s);vm.runInContext(fs.readFileSync(p,'utf8'),s);
const Q=s.window.QUESTIONS_AP_STATISTICS, by=new Map(Q.map(q=>[q.id,q]));
const get=id=>by.get(id);

// Strengthen misconception distractors on rewritten items so option length is not a cue.
get('apstats-u1-008').o[3]='The four categories have approximately equal frequencies because all four bars fall within a fairly narrow numerical range.';
get('apstats-u1-016').o[1]='Exactly 50% of the observations must equal the median value 14 because the median divides the ordered data into halves.';
get('apstats-u2-002').o[0]='80/250 = 0.32, using all surveyed students rather than conditioning on club participation';
get('apstats-u2-003').o[3]='0.48, from adding the arts-course percentage and the joint percentage';
get('apstats-u2-022').o[1]='Both are centered at 50, and the n=64 distribution has twice the standard deviation because it contains four times as many observations.';
get('apstats-u2-024').o[1]='They have the same center, and the n=100 distribution has twice the standard deviation because the larger sample contains more individual variation.';
get('apstats-u4-008').o[1]='The t test is automatically valid whenever observations come from a random sample, even when a small sample contains severe skewness and extreme outliers.';

const stimuli=[],idx=new Map();
for(const q of Q){if(q.stimulus){if(!idx.has(q.stimulus)){idx.set(q.stimulus,stimuli.length);stimuli.push(q.stimulus);}q.__stimulusIndex=idx.get(q.stimulus);delete q.stimulus;}}
fs.writeFileSync(p,`// AP Statistics — original practice bank for the redesigned May 2027 exam.\n// CED alignment independently re-audited 2026-08-11 against the Effective Fall 2026 CED.\n(()=>{"use strict";\nconst STIMULI=${JSON.stringify(stimuli,null,2)};\nconst Q=${JSON.stringify(Q,null,2)};\nfor(const q of Q){if(Number.isInteger(q.__stimulusIndex)){q.stimulus=STIMULI[q.__stimulusIndex];delete q.__stimulusIndex;}}\nwindow.QUESTIONS_AP_STATISTICS=Q;\n})();\n`);

let tests=fs.readFileSync(t,'utf8');
tests=tests.replace("assert.equal(ans('X ~ Binomial'),'μ = 20 and σ = √15 ≈ 3.87');", "assert.equal(ans('n = 80, p = 0.25'),'μ = 20 and σ = √15 ≈ 3.87');");
tests=tests.replace("assert.deepEqual([q('apstats-u1-016').topicCode,q('apstats-u1-016').skill],['1.7','3.B']);", "assert.deepEqual([q('apstats-u1-016').topicCode,q('apstats-u1-016').skill],['1.8','4.A']);");
fs.writeFileSync(t,tests);

const wc=x=>x.trim().split(/\s+/).length;let unique=0,among=0,cw=0,dw=0;
for(const q of Q){const lens=q.o.map(wc),mx=Math.max(...lens),cl=lens[q.c[0]];if(cl===mx)among++;if(cl===mx&&lens.filter(x=>x===mx).length===1)unique++;cw+=cl;lens.forEach((x,i)=>{if(i!==q.c[0])dw+=x;});}
const da=dw/(Q.length*3),ca=cw/Q.length;
console.log('STAT-LENGTH',JSON.stringify({unique,uniquePct:unique/Q.length,among,amongPct:among/Q.length,correctAvg:ca,distractorAvg:da,gap:Math.abs(ca-da)/da}));
