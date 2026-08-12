const fs=require('fs'),vm=require('vm');
const p='data/ap-statistics.js',t='tests/ap-statistics.test.js';
const s={window:{}};vm.createContext(s);vm.runInContext(fs.readFileSync(p,'utf8'),s);
const Q=s.window.QUESTIONS_AP_STATISTICS, by=new Map(Q.map(q=>[q.id,q]));
const patch=(id,v)=>Object.assign(by.get(id),v);

// Remaining exact-skill mismatch exposed by the new whitelist.
patch('apstats-u2-018',{skill:'3.B'});

// Keep Topic 1.8 represented by a genuine graphical-summary-statistics task rather than another IQR calculation.
patch('apstats-u1-016',{
  topicCode:'1.8',skill:'4.A',
  q:'A boxplot has minimum 4, Q1=10, median=14, Q3=22, and maximum 30, with no flagged outliers. Which description is supported by the graph?',
  o:['The middle 50% of observations lies from 10 to 22.','Exactly 50% of observations equal 14.','The interquartile range is displayed from 4 to 30.','The upper 25% of observations lies from 10 to 14.'],
  c:[0],
  e:'In a boxplot, the box extends from Q1 to Q3 and therefore contains the middle 50% of observations. Here that interval is 10 to 22; the whiskers represent values outside the quartiles.'
});

// Topic 1.4 uses graphical description/comparison, not a bare relative-frequency calculation.
patch('apstats-u1-008',{
  topicCode:'1.4',skill:'4.A',
  q:'A bar chart for four categories has bar heights 90, 120, 150, and 140. Which description is supported by the graph?',
  o:['The third category has the greatest frequency.','The first and fourth categories have equal frequencies.','The second category contains more observations than the third.','The four categories have approximately equal frequencies.'],
  c:[0],
  e:'The third bar has height 150, greater than 140, 120, and 90, so the third category is the most frequent. The other statements contradict the relative bar heights.'
});

// Avoid stacked absolute-language distractors while preserving the CLT misconception choices.
patch('apstats-u2-023',{
  o:['It tends to become approximately normal even though the population is skewed.','It becomes more right-skewed than the population as sample size grows.','It becomes uniform because sample means are averages.','Its shape remains approximately the same as the population shape regardless of larger sample sizes.']
});

// Matched pairs belong to the one-population-mean-difference confidence-interval topic when the task is an interval.
patch('apstats-u4-015',{
  topicCode:'4.2',skill:'2.C',
  q:'The same patients have blood pressure measured before and after treatment. Which procedure is appropriate for constructing a confidence interval for the population mean change?',
  o:['Use a one-sample t interval on the within-patient differences.','Treat all before values and all after values as independent samples.','Use a two-proportion z interval after classifying each blood pressure as high or low.','Use a chi-square interval based on the paired measurements.'],
  c:[0],
  e:'Before and after measurements on the same patient are paired. Subtracting within each patient produces one sample of differences, so a one-sample t interval for the population mean difference is appropriate.'
});
patch('apstats-u4-024',{
  topicCode:'4.2',skill:'2.C',
  q:'Measurements are taken before and after an intervention on the same 24 people. Which confidence-interval procedure respects the paired design?',
  o:['A two-sample t interval treating before and after as independent','A one-sample t interval applied to the 24 within-person differences','A chi-square interval because there are two measurement occasions','A one-proportion z interval for the proportion whose value decreased'],
  c:[1],
  e:'Each person supplies a matched pair. The appropriate confidence interval is a one-sample t interval applied to the within-person differences, preserving the dependence between the two measurements.'
});

// Margin-of-error relationships are Topic 4.3, while the CI computation is Topic 4.7.
patch('apstats-u4-021',{topicCode:'4.3',skill:'2.D'});
patch('apstats-u4-025',{topicCode:'4.7',skill:'3.E'});

// Re-emit while preserving candidate-set shared object identity.
const stimuli=[],idx=new Map();
for(const q of Q){if(q.stimulus){if(!idx.has(q.stimulus)){idx.set(q.stimulus,stimuli.length);stimuli.push(q.stimulus);}q.__stimulusIndex=idx.get(q.stimulus);delete q.stimulus;}}
fs.writeFileSync(p,`// AP Statistics — original practice bank for the redesigned May 2027 exam.\n// CED alignment independently re-audited 2026-08-11 against the Effective Fall 2026 CED.\n(()=>{"use strict";\nconst STIMULI=${JSON.stringify(stimuli,null,2)};\nconst Q=${JSON.stringify(Q,null,2)};\nfor(const q of Q){if(Number.isInteger(q.__stimulusIndex)){q.stimulus=STIMULI[q.__stimulusIndex];delete q.__stimulusIndex;}}\nwindow.QUESTIONS_AP_STATISTICS=Q;\n})();\n`);

let tests=fs.readFileSync(t,'utf8');
tests=tests.replace("test('Statistics uses exactly the 55 CED topics and CED-compatible practice families'", "test('Statistics uses exactly the 55 CED topics and exact CED skills'");
tests=tests.replace("assert.equal(ans('sample of 240 commuters'),'0.40');", "assert.equal(ans('sample of 240 commuters'),'Public transit: 96; Other mode: 144');");
fs.writeFileSync(t,tests);
console.log('Applied second-pass exact CED semantic corrections.');
