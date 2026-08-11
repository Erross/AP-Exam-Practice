const test = require('node:test');
const fs = require('node:fs');
const vm = require('node:vm');

function load(files, globalName) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  for (const file of files) vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox);
  return sandbox.window[globalName];
}

const banks = {
  'English Language': load(['data/ap-english-language.js'], 'QUESTIONS_AP_ENGLISH_LANGUAGE'),
  'English Literature': load(['data/ap-english-literature.js'], 'QUESTIONS_AP_ENGLISH_LITERATURE'),
  'Chemistry': load(['data/ap-chemistry.js','data/ap-chemistry-curation.js','data/ap-chemistry-corrections.js'], 'QUESTIONS_AP_CHEMISTRY'),
  'Calculus AB': load(['data/ap-calculus-ab.js'], 'QUESTIONS_AP_CALCULUS_AB'),
  'Physics 2': load(['data/ap-physics-2.js'], 'QUESTIONS_AP_PHYSICS_2'),
};

function words(s='') { return String(s).trim().match(/[A-Za-z0-9]+(?:['’.-][A-Za-z0-9]+)*/g) || []; }
function sentences(s='') { return Math.max(1, (String(s).match(/[.!?]+(?:\s|$)/g) || []).length); }
function syllablesInWord(w) {
  w = w.toLowerCase().replace(/[^a-z]/g,'');
  if (!w) return 0;
  if (w.length <= 3) return 1;
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/,'').replace(/^y/,'');
  return Math.max(1, (w.match(/[aeiouy]{1,2}/g) || []).length);
}
function fk(s='') {
  const ws = words(s); if (!ws.length) return 0;
  const syl = ws.reduce((n,w)=>n+syllablesInWord(w),0);
  return 0.39*(ws.length/sentences(s)) + 11.8*(syl/ws.length) - 15.59;
}
function wc(s='') { return words(s).length; }
function median(a) { const b=[...a].sort((x,y)=>x-y); return b.length ? (b[Math.floor((b.length-1)/2)]+b[Math.ceil((b.length-1)/2)])/2 : 0; }
function pct(n,d){return d?100*n/d:0;}
function normalize(s=''){return String(s).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();}
const stop = new Set('a an the and or of to in on for with by from at as is are was were be been being this that these those it its they their them he she his her you your we our which who what when where why how than then if so because but not no into over under about most more less many much can could would should may might will'.split(' '));
function tokenSet(s=''){return new Set(normalize(s).split(/\s+/).filter(x=>x && !stop.has(x)));}
function jaccard(a,b){const A=tokenSet(a),B=tokenSet(b); let i=0; for(const x of A) if(B.has(x)) i++; const u=new Set([...A,...B]).size; return u?i/u:0;}
function overlap(a,b){const A=tokenSet(a),B=tokenSet(b); let i=0; for(const x of A) if(B.has(x)) i++; return A.size?i/A.size:0;}

const absolute=/\b(always|never|every|only|entirely|unlimited|none|all|impossible|guarantee[sd]?|completely|identical|must|cannot)\b/i;
const giveaway=/\b(obviously|clearly|ridiculous|nonsense|unrelated|randomly|magically|because it just does|none of the above|all of the above|complete withdrawal|no relationship|has no effect|regardless of)\b/i;

for (const [name, bank] of Object.entries(banks)) {
  test(`AUDIT ${name}`, () => {
    let uniqueLongest=0, amongLongest=0, correctWords=0, distractorWords=0;
    const stemGrades=[], expGrades=[], optionGrades=[];
    const weak=[]; const shortDistr=[]; const absolutes=[]; const outlierCorrect=[]; const nearDup=[]; const rationaleMismatch=[]; const rationaleWeak=[];
    let stimulusQuestions=0; const stimGrades=[];
    for (const q of bank) {
      const lens=q.o.map(wc), max=Math.max(...lens), ci=q.c[0], cl=lens[ci];
      if(cl===max) amongLongest++;
      if(cl===max && lens.filter(x=>x===max).length===1) uniqueLongest++;
      correctWords+=cl; lens.forEach((x,i)=>{if(i!==ci)distractorWords+=x});
      stemGrades.push(fk(q.q)); expGrades.push(fk(q.e)); q.o.forEach(o=>optionGrades.push(fk(o)));
      const ds=q.o.filter((_,i)=>i!==ci);
      const dLens=ds.map(wc);
      if (ds.some(d=>giveaway.test(d))) weak.push(q.id);
      if (dLens.some(x=>x<=1) && Math.max(...lens)>=5) shortDistr.push(q.id);
      if (ds.filter(d=>absolute.test(d)).length>=2) absolutes.push(q.id);
      const avgD=dLens.reduce((a,b)=>a+b,0)/3;
      if (cl>=avgD*1.7 && cl-avgD>=4) outlierCorrect.push(q.id);
      for(let i=0;i<ds.length;i++) for(let j=i+1;j<ds.length;j++) if(jaccard(ds[i],ds[j])>0.82) nearDup.push(q.id);
      const correctSupport=overlap(q.o[ci],q.e);
      const distractorSupport=ds.map(d=>overlap(d,q.e));
      if(Math.max(...distractorSupport) > correctSupport + 0.20 && Math.max(...distractorSupport) >= 0.45) rationaleMismatch.push(q.id);
      if(correctSupport < 0.08 && wc(q.o[ci]) >= 4) rationaleWeak.push(q.id);
      if(q.stimulus){stimulusQuestions++; const t=q.stimulus.text||q.stimulus.description||q.stimulus.note||''; if(t) stimGrades.push(fk(t));}
    }
    const avgCorrect=correctWords/bank.length, avgDistr=distractorWords/(bank.length*3);
    console.log(JSON.stringify({
      course:name, questions:bank.length,
      uniqueLongestPct:+pct(uniqueLongest,bank.length).toFixed(1), amongLongestPct:+pct(amongLongest,bank.length).toFixed(1),
      avgCorrectWords:+avgCorrect.toFixed(2), avgDistractorWords:+avgDistr.toFixed(2), lengthGapPct:+pct(Math.abs(avgCorrect-avgDistr),avgDistr).toFixed(1),
      stemFKMedian:+median(stemGrades).toFixed(1), stemFKMean:+(stemGrades.reduce((a,b)=>a+b,0)/stemGrades.length).toFixed(1),
      optionFKMedian:+median(optionGrades).toFixed(1), explanationFKMedian:+median(expGrades).toFixed(1),
      stimulusQuestions, stimulusFKMedian:stimGrades.length?+median(stimGrades).toFixed(1):null,
      flagged:{giveaway:weak, oneWordVsLong:shortDistr, stackedAbsolute:absolutes, correctLengthOutlier:outlierCorrect, nearDuplicateDistractors:[...new Set(nearDup)], rationaleMismatch, rationaleLowLexicalSupport:rationaleWeak}
    }));
  });
}
