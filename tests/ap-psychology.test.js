const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const {AP_SUBJECTS}=require('../js/subjects');
const {drawExam}=require('../js/draw');

const sandbox={window:{}}; vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('data/ap-psychology.js','utf8'),sandbox,{filename:'data/ap-psychology.js'});
const bank=sandbox.window.QUESTIONS_AP_PSYCHOLOGY;
const subject=AP_SUBJECTS.find(s=>s.id==='ap-psychology');
const TOPICS=[
 '1.1','1.2','1.3','1.4','1.5','1.6',
 '2.1','2.2','2.3','2.4','2.5','2.6','2.7','2.8',
 '3.1','3.2','3.3','3.4','3.5','3.6','3.7','3.8','3.9',
 '4.1','4.2','4.3','4.4','4.5','4.6','4.7',
 '5.1','5.2','5.3','5.4','5.5'
];
const family=q=>String(q.skill).split('.')[0];
const CED_BOUNDARY_CONCEPTS={
 '2.3':['sensory memory','working memory','episodic memory','procedural memory'],
 '2.4':['mnemonic device','chunking','spacing effect','serial position effect'],
 '2.5':['maintenance rehearsal','elaborative rehearsal','autobiographical memory','anterograde amnesia'],
 '3.1':['cross-sectional study','longitudinal study','nature and nurture','continuous and discontinuous development'],
 '3.3':['biological sex','gender','gender role','sexual orientation'],
 '3.9':['observational learning','vicarious conditioning','insight learning','latent learning'],
 '4.1':['fundamental attribution error','self-serving bias','actor-observer bias','mere exposure effect'],
 '4.2':['stereotype','implicit attitude','belief perseverance','cognitive dissonance'],
 '4.4':['ego defense mechanism','projective test','unconditional regard','self-actualizing tendency'],
 '4.5':['reciprocal determinism','self-efficacy','Big Five traits','self-esteem'],
 '4.6':['drive-reduction theory','incentive theory','self-determination theory','arousal theory'],
 '4.7':['physiological experience precedes cognitive appraisal','physiological and cognitive experiences occur simultaneously','a cognitive label is required to experience emotion','facial-feedback hypothesis'],
 '5.2':['resilience','gratitude','signature strengths','posttraumatic growth'],
 '5.3':['biopsychosocial model','diathesis-stress model','DSM classification','eclectic approach'],
 '5.5':['cognitive behavioral therapy','exposure therapy','psychodynamic therapy','psychoactive medication']
};

test('Psychology bank covers the exact current 35-topic CED inventory',()=>{
 assert.equal(bank.length,245);
 assert.deepEqual([...new Set(bank.map(q=>q.topicCode))].sort(),TOPICS.slice().sort());
 for(const code of TOPICS) assert.equal(bank.filter(q=>q.topicCode===code).length,7,`${code} should have seven original questions`);
 assert.equal(subject.formatVerified,true);
 assert.equal(subject.releaseStatus,'draft');
 assert.equal(subject.mcqCount,75);
 assert.equal(subject.mcqTimeMinutes,90);
 assert.equal(subject.totalExamTimeLabel,'2h 40m');
 assert.deepEqual(subject.stimulusSetRange,[7,8]);
});

test('Psychology shared research portfolio has one two-question synthetic set per topic',()=>{
 const groups=new Map();
 for(const q of bank.filter(q=>q.stimulusGroupId)){
  const a=groups.get(q.stimulusGroupId)||[]; a.push(q); groups.set(q.stimulusGroupId,a);
 }
 assert.equal(groups.size,35);
 for(const [id,qs] of groups){
  assert.equal(qs.length,2,`${id} should contain two questions`);
  assert.equal(new Set(qs.map(q=>q.topicCode)).size,1);
  assert.deepEqual(qs.map(family).sort(),['2','3']);
  assert.ok(qs.every(q=>q.synthetic===true));
  assert.ok(qs[0].stimulus&&typeof qs[0].stimulus==='object');
  assert.equal(JSON.stringify(qs[0].stimulus),JSON.stringify(qs[1].stimulus));
 }
});

test('every Psychology data-set arithmetic key independently recomputes',()=>{
 const data=bank.filter(q=>q.numericCheck);
 assert.equal(data.length,35);
 for(const q of data){
  const n=q.numericCheck;
  if(n.kind==='difference') assert.equal(n.minuend-n.subtrahend,n.expected,`${q.id} difference`);
  else if(n.kind==='correlation') assert.equal(n.value>0?'positive':'negative',n.expected,`${q.id} correlation direction`);
  else if(n.kind==='larger') assert.equal(n.first>n.second?'Condition A':'Condition B',n.expected,`${q.id} variability`);
  else if(n.kind==='significance') assert.equal(n.p<0.05,n.expected,`${q.id} significance`);
  else if(n.kind==='trend') assert.equal(n.values.every((v,i,a)=>i===0||v<a[i-1])?'decrease':'other',n.expected,`${q.id} trend`);
  else assert.fail(`${q.id}: unknown numeric check ${n.kind}`);
  assert.ok(['3.A','3.B','3.C'].includes(q.skill));
 }
});

test('Psychology exact science-practice tags match the task actually performed',()=>{
 const methodTags={
  'operational-definition':'2.B','sampling-generalizability':'2.C','random-assignment':'2.B','confounding-variable':'2.B',
  'informed-consent':'2.D','replication':'2.C','survey-wording':'2.C','design-identification':'2.A',
  'causal-inference':'2.B','correlation-causation':'2.C','longitudinal-design':'2.A','naturalistic-observation':'2.A',
  'dependent-variable':'2.B','response-bias':'2.C','debriefing':'2.D','case-generalizability':'2.C'
 };
 const methods=bank.filter(q=>q.methodFocus);
 assert.equal(methods.length,70);
 assert.ok(new Set(methods.map(q=>q.methodFocus)).size>=14);
 for(const q of methods) assert.equal(q.skill,methodTags[q.methodFocus],`${q.id}: ${q.methodFocus}`);

 const dataTags={
  'mean-difference':'3.B','correlation':'3.C','change-over-time':'3.B','observed-frequency':'3.C',
  'standard-deviation':'3.B','percentage-difference':'3.C','effect-size-significance':'3.C','concept-in-data':'3.A'
 };
 const data=bank.filter(q=>q.dataFocus);
 assert.equal(data.length,35);
 assert.deepEqual([...new Set(data.map(q=>q.dataFocus))].sort(),Object.keys(dataTags).sort());
 for(const q of data) assert.equal(q.skill,dataTags[q.dataFocus],`${q.id}: ${q.dataFocus}`);
});

test('Psychology concept application is scenario-based and 1.B is reserved for norms or cognitive bias',()=>{
 const application=bank.filter(q=>q.applicationMode);
 const eligible1B=new Set([
  'confirmation bias','functional fixedness','stereotype threat','gender role',
  'fundamental attribution error','self-serving bias','actor-observer bias',
  'stereotype','implicit attitude','belief perseverance','cognitive dissonance',
  'conformity','obedience','social facilitation','groupthink','stress appraisal'
 ]);
 assert.equal(application.length,140);
 for(const code of TOPICS){
  const topicItems=application.filter(q=>q.topicCode===code);
  assert.equal(topicItems.length,4);
  assert.equal(new Set(topicItems.map(q=>q.applicationMode)).size,4);
 }
 for(const q of application){
  const answer=q.o[q.c[0]];
  assert.equal(q.skill,eligible1B.has(answer)?'1.B':'1.A',`${q.id}: ${answer}`);
  assert.doesNotMatch(q.q,/Which concept best explains this .* example/i);
  assert.doesNotMatch(q.e,/would involve (?:a|an|the)\b/i,`${q.id}: avoid the superseded ungrammatical rationale template`);
  assert.ok(q.e.length>=140,`${q.id}: rationale should compare mechanisms`);
 }
});

test('Psychology application concepts respect current CED topic and exclusion boundaries',()=>{
 const application=bank.filter(q=>q.applicationMode);
 for(const [code,expected] of Object.entries(CED_BOUNDARY_CONCEPTS)){
  const actual=[...application.filter(q=>q.topicCode===code)].map(q=>q.o[q.c[0]]);
  assert.deepEqual(actual,expected,`${code} application inventory`);
 }
 const studentFacing=bank.map(q=>[q.q,...q.o,q.e].join(' ')).join('\n');
 assert.doesNotMatch(studentFacing,/Maslow|hierarchy of needs|James[-–]Lange|Cannon[-–]Bard|two-factor theory/i);
 assert.doesNotMatch(studentFacing,/sequential design|gender schema|mirror[- ]neuron|medical model|\bSSRI\b|\bflow\b/i);
});

test('Psychology research portfolio rejects the superseded boilerplate templates',()=>{
 const text=bank.map(q=>q.q).join('\n');
 assert.equal(new Set(bank.map(q=>q.q)).size,bank.length,'every student-facing stem should be textually distinct');
 assert.doesNotMatch(text,/A second research team studying .* wants its procedure to be replicable/i);
 assert.doesNotMatch(text,/Using the synthetic .* study data, which statement accurately describes the reported group means/i);
 assert.equal(new Set(bank.filter(q=>q.methodFocus).map(q=>q.methodFocus)).size>=14,true);
 assert.equal(new Set(bank.filter(q=>q.dataFocus).map(q=>q.dataFocus)).size,8);
});

test('Psychology MCQs use only current MCQ-assessed practice families',()=>{
 assert.deepEqual([...new Set(bank.map(family))].sort(),['1','2','3']);
 assert.equal(bank.filter(q=>family(q)==='1').length,140);
 assert.equal(bank.filter(q=>family(q)==='2').length,70);
 assert.equal(bank.filter(q=>family(q)==='3').length,35);
 assert.ok(bank.every(q=>!String(q.skill).startsWith('4.')));
});

test('Psychology randomized forms obey equal-unit and 65/25/10 practice constraints',()=>{
 const target={U1:15,U2:15,U3:15,U4:15,U5:15};
 const mins={'1':99,'2':99,'3':99},maxs={'1':0,'2':0,'3':0};
 let minSets=99,maxSets=0;
 for(let i=0;i<1500;i++){
  const draw=drawExam(subject,bank); assert.equal(draw.length,75);
  const units={},skills={};
  for(const q of draw){units[q.unit]=(units[q.unit]||0)+1; skills[family(q)]=(skills[family(q)]||0)+1;}
  assert.deepEqual(units,target);
  for(const f of ['1','2','3']){
   const [lo,hi]=subject.skillCountRanges[f]; assert.ok(skills[f]>=lo&&skills[f]<=hi,`${f}: ${skills[f]}`);
   mins[f]=Math.min(mins[f],skills[f]); maxs[f]=Math.max(maxs[f],skills[f]);
  }
  const sets=new Set(draw.filter(q=>q.stimulusGroupId).map(q=>q.stimulusGroupId)).size;
  assert.ok(sets>=7&&sets<=8); minSets=Math.min(minSets,sets); maxSets=Math.max(maxSets,sets);
 }
 console.log('Psychology practice envelope',{mins,maxs,researchSets:[minSets,maxSets]});
});

test('Psychology retake overlap remains at or below project target',()=>{
 let total=0;
 for(let i=0;i<1000;i++){
  const a=drawExam(subject,bank),b=drawExam(subject,bank),ids=new Set(a.map(q=>q.id));
  total+=b.filter(q=>ids.has(q.id)).length/75;
 }
 const overlap=total/1000; console.log(`Psychology Monte Carlo overlap: ${(overlap*100).toFixed(1)}%`); assert.ok(overlap<=0.40);
});

test('Psychology naive student preflight exposes exam-critical facts',()=>{
 assert.equal(subject.calculatorAllowed,false);
 assert.match(subject.tierNote,/calculator not permitted/i);
 const catalog=fs.readFileSync('js/catalog.js','utf8');
 assert.match(catalog,/Calculator not permitted for this AP exam\./);
 assert.match(catalog,/timer starts only after you choose Start timed practice/i);
 assert.match(catalog,/saved in this browser session/i);
 assert.match(catalog,/Back to subjects/i);
});
