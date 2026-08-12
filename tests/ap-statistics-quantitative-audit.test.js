const test = require('node:test');
const assert = require('node:assert/strict');
const { loadStatisticsBank } = require('./helpers');

const bank = loadStatisticsBank();
const byId = new Map(bank.map((q) => [q.id, q]));
const q = (id) => { const item = byId.get(id); assert.ok(item, `missing ${id}`); return item; };
const answer = (id) => { const item = q(id); return item.o[item.c[0]]; };
const ids = (unit, count) => Array.from({ length: count }, (_, i) => `apstats-${unit}-${String(i + 1).padStart(3, '0')}`);

// Clean-room 2026-08-12 inventory: every one of the 140 items was reviewed and
// explicitly classified. CALC_IDS contains every item whose correctness depends
// on computing, transforming, or numerically reading a supplied quantity.
const EXPECTED_IDS = [...ids('u1',36), ...ids('u2',33), ...ids('u3',32), ...ids('u4',25), ...ids('u5',14)];
const CALC_IDS = new Set([
  'apstats-u1-005','apstats-u1-006','apstats-u1-008','apstats-u1-013','apstats-u1-014','apstats-u1-015','apstats-u1-016','apstats-u1-017','apstats-u1-018',
  'apstats-u2-002','apstats-u2-003','apstats-u2-005','apstats-u2-006','apstats-u2-008','apstats-u2-009','apstats-u2-011','apstats-u2-012','apstats-u2-013','apstats-u2-014','apstats-u2-015','apstats-u2-016','apstats-u2-018','apstats-u2-019','apstats-u2-020','apstats-u2-022','apstats-u2-024','apstats-u2-025','apstats-u2-026','apstats-u2-027','apstats-u2-028','apstats-u2-029','apstats-u2-030','apstats-u2-031','apstats-u2-032','apstats-u2-033',
  'apstats-u3-001','apstats-u3-002','apstats-u3-003','apstats-u3-004','apstats-u3-006','apstats-u3-008','apstats-u3-010','apstats-u3-012','apstats-u3-013','apstats-u3-014','apstats-u3-017','apstats-u3-018','apstats-u3-020','apstats-u3-025','apstats-u3-026','apstats-u3-029','apstats-u3-030',
  'apstats-u4-002','apstats-u4-004','apstats-u4-009','apstats-u4-011','apstats-u4-014','apstats-u4-019','apstats-u4-021','apstats-u4-023','apstats-u4-025',
  'apstats-u5-001','apstats-u5-002','apstats-u5-003','apstats-u5-004','apstats-u5-007','apstats-u5-008','apstats-u5-009','apstats-u5-010','apstats-u5-011',
]);

test('Statistics quantitative audit inventory covers the exact 140-item bank', () => {
  assert.equal(bank.length, 140);
  assert.deepEqual([...byId.keys()].sort(), EXPECTED_IDS.slice().sort());
  for (const id of CALC_IDS) assert.ok(byId.has(id), `calculation inventory contains missing id ${id}`);
  assert.equal(new Set(EXPECTED_IDS).size, 140);
});

test('every calculation-bearing Statistics item independently recomputes', () => {
  // Unit 1: numerical summaries and standardization.
  assert.equal(answer('apstats-u1-005'), `Public transit: ${96}; Other mode: ${240-96}`);
  assert.match(answer('apstats-u1-006'), new RegExp(String(Math.max(85,210,160,45))));
  assert.match(answer('apstats-u1-008'), /third category/);
  assert.equal(answer('apstats-u1-013'), `${(18+20+21+21+30)/5} minutes`);
  assert.equal(answer('apstats-u1-014'), String([4,6,7,8,9,12,30][3]));
  const iqr=27-12, upperFence=27+1.5*iqr; assert.equal(upperFence,49.5); assert.equal(answer('apstats-u1-015'),'52');
  assert.match(answer('apstats-u1-016'), new RegExp(`10 to 22`));
  assert.match(answer('apstats-u1-017'), /z = −2.*z = −1\.25/);
  assert.equal(answer('apstats-u1-018'), String((86-74)/8));

  // Unit 2: relative frequency, probability, random variables, binomial/normal models, sampling means.
  assert.match(answer('apstats-u2-002'), new RegExp((80/100).toFixed(2)));
  assert.equal(answer('apstats-u2-003'), (0.18/0.30).toFixed(2));
  assert.equal(answer('apstats-u2-005'), (90/300).toFixed(2));
  assert.equal(answer('apstats-u2-006'), (0.18/0.30).toFixed(2));
  assert.equal(answer('apstats-u2-008'), '11/36'); assert.ok(Math.abs((1-(5/6)**2)-11/36)<1e-15);
  assert.equal(answer('apstats-u2-009'), (1-0.27).toFixed(2));
  assert.equal(answer('apstats-u2-011'), (0.55+0.30).toFixed(2));
  assert.equal(answer('apstats-u2-012'), (0.60*0.25).toFixed(2));
  assert.equal(answer('apstats-u2-013'), (0.50+0.40-0.10).toFixed(2));
  assert.match(answer('apstats-u2-014'), /0\.50,0\.30,0\.20/); assert.equal(0.50+0.30+0.20,1);
  assert.equal(answer('apstats-u2-015'), String(0*0.50+1*0.30+2*0.15+3*0.05));
  assert.match(answer('apstats-u2-016'), /C\(10,3\)\(0\.30\)\^3\(0\.70\)\^7/);
  const mu18=0*0.50+2*0.30+5*0.20, var18=0.50*(0-mu18)**2+0.30*(2-mu18)**2+0.20*(5-mu18)**2; assert.ok(Math.abs(var18-3.64)<1e-12); assert.equal(answer('apstats-u2-018'),Math.sqrt(var18).toFixed(2));
  assert.match(answer('apstats-u2-019'), /μ = 20.*3\.87/); assert.ok(Math.abs(Math.sqrt(80*0.25*0.75)-3.872983346)<1e-6);
  assert.equal(answer('apstats-u2-020'),'About 95%'); assert.equal((182-170)/6,2); assert.equal((170-158)/6,2);
  assert.match(answer('apstats-u2-022'), /half the standard deviation/); assert.equal((18/Math.sqrt(64))/(18/Math.sqrt(16)),0.5);
  assert.match(answer('apstats-u2-024'), /half the standard deviation/); assert.equal((1/Math.sqrt(100))/(1/Math.sqrt(25)),0.5);
  assert.match(answer('apstats-u2-025'), /116\/400 = 0\.29/); assert.equal(116/400,0.29);
  assert.match(answer('apstats-u2-026'), /72\/180=0\.40.*44\/220=0\.20/); assert.equal(72/180,0.4); assert.equal(44/220,0.2);
  assert.match(answer('apstats-u2-027'), /72\/116 ≈ 0\.621/); assert.ok(Math.abs(72/116-0.620689655)<1e-9);
  const failure = q('apstats-u2-029').stimulus; const probs=failure.rows[0].slice(1).map(Number); const xs=failure.columns.slice(1).map(Number);
  assert.equal(probs.reduce((a,b)=>a+b,0),1); assert.match(answer('apstats-u2-028'), /0\.50,0\.30,0\.15,0\.05/);
  const ex=xs.reduce((s,x,i)=>s+x*probs[i],0); assert.equal(ex,0.75); assert.equal(answer('apstats-u2-029'),ex.toFixed(2));
  assert.equal(0.15/(1-0.50),0.30); assert.equal(answer('apstats-u2-030'),'0.30');
  const sim=q('apstats-u2-031').stimulus.rows; assert.equal(Math.min(...sim.map(r=>Number(r[2]))),2.25); assert.match(answer('apstats-u2-031'),/n=64/);
  assert.equal(sim.find(r=>r[3]==='approximately normal')[0],64); assert.match(answer('apstats-u2-032'),/n=64/);
  assert.equal(answer('apstats-u2-033'),'50'); assert.ok(sim.every(r=>Math.abs(Number(r[1])-50)<=0.1000001));

  // Unit 3: sampling distributions and categorical inference.
  assert.equal(answer('apstats-u3-001'),'2/3'); assert.equal(0.030/0.045,2/3);
  assert.match(answer('apstats-u3-002'),/biased upward by 4/);
  assert.match(answer('apstats-u3-003'),/Mean 0\.36.*0\.048/); assert.equal(Math.sqrt(0.36*0.64/100),0.048);
  assert.match(answer('apstats-u3-004'),/np = 3\.2/); assert.ok(Math.abs(40*0.08-3.2)<1e-12);
  const lo=.58-1.96*.031, hi=.58+1.96*.031; assert.ok(Math.abs(lo-.51924)<1e-10&&Math.abs(hi-.64076)<1e-10); assert.equal(answer('apstats-u3-006'),'(0.519, 0.641)');
  assert.match(answer('apstats-u3-008'),/below 0\.50/); assert.ok(.49<.50);
  assert.match(answer('apstats-u3-010'),/50\(0\.40\).*50\(0\.60\)/); assert.equal(50*.4,20); assert.equal(50*.6,30);
  assert.match(answer('apstats-u3-012'),/Study A provides stronger evidence/); assert.ok(.004<.08);
  const z13=(.57-.50)/Math.sqrt(.5*.5/200); assert.ok(Math.abs(z13-1.979898987)<1e-9); assert.match(answer('apstats-u3-013'),/1\.98/);
  assert.equal(answer('apstats-u3-014'),'2.4'); assert.ok(Math.abs((.36-.30)/.025-2.4)<1e-12);
  assert.equal(answer('apstats-u3-017'),'0.15'); assert.ok(Math.abs(.40-.25-.15)<1e-12);
  assert.match(answer('apstats-u3-018'),/√\[p₁\(1−p₁\)\/n₁ \+ p₂\(1−p₂\)\/n₂\]/);
  assert.equal(answer('apstats-u3-020'),'0.08'); assert.ok(Math.abs(.62-.54-.08)<1e-12);
  assert.match(answer('apstats-u3-025'),/147\/230 ≈ 0\.639/); assert.ok(Math.abs((84+63)/(120+110)-.639130435)<1e-9);
  assert.match(answer('apstats-u3-026'),/0\.014 > 0\.01/); assert.ok(.014>.01);
  assert.equal(answer('apstats-u3-029'),String(80*45/200)); assert.deepEqual([q('apstats-u3-029').topicCode,q('apstats-u3-029').skill],['3.15','3.C']);
  assert.match(answer('apstats-u3-030'),/\(observed − expected\)\^2 \/ expected/);

  // Unit 4: t procedures.
  assert.match(answer('apstats-u4-002'),/Mean 64 and standard deviation 3/); assert.equal(15/Math.sqrt(25),3);
  assert.match(answer('apstats-u4-004'),/Reject H₀/); assert.ok(.008<.05);
  assert.equal(answer('apstats-u4-009'),'1.5'); assert.equal((53-50)/(8/Math.sqrt(16)),1.5);
  assert.match(answer('apstats-u4-011'),/√8 ≈ 2\.83/); assert.ok(Math.abs(Math.sqrt(10**2/25+12**2/36)-Math.sqrt(8))<1e-12);
  assert.equal(answer('apstats-u4-014'),'4.0'); assert.equal((1.4+6.6)/2,4);
  assert.equal(answer('apstats-u4-019'),'3'); assert.equal(6/2,3);
  assert.match(answer('apstats-u4-021'),/cut in half/); assert.equal(1/Math.sqrt(4),.5);
  assert.equal(answer('apstats-u4-023'),'2.5'); assert.equal((43-40)/1.2,2.5);
  assert.equal(answer('apstats-u4-025'),'(0.8, 9.2)'); assert.ok(Math.abs((5-2.10*2)-.8)<1e-12&&Math.abs((5+2.10*2)-9.2)<1e-12);

  // Unit 5: least-squares regression and stimulus-derived quantities.
  assert.equal(answer('apstats-u5-001'),String(20+1.5*4));
  assert.equal(answer('apstats-u5-002'),'−5'); assert.equal(37-42,-5);
  assert.equal(answer('apstats-u5-003'),'1.5'); assert.equal(.60*(10/4),1.5);
  assert.equal(answer('apstats-u5-004'),'20'); assert.equal(26-1.5*4,20);
  const delivery=q('apstats-u5-007').stimulus; const x=delivery.columns.slice(1).map(Number), y=delivery.rows[0].slice(1).map(Number);
  const mean=a=>a.reduce((s,v)=>s+v,0)/a.length, mx=mean(x), my=mean(y);
  const sxx=x.reduce((s,v)=>s+(v-mx)**2,0), syy=y.reduce((s,v)=>s+(v-my)**2,0), sxy=x.reduce((s,v,i)=>s+(v-mx)*(y[i]-my),0);
  const r=sxy/Math.sqrt(sxx*syy), slope=sxy/sxx, intercept=my-slope*mx;
  assert.ok(Math.abs(r-0.9955461344)<1e-9); assert.match(q('apstats-u5-007').q,/r≈0\.9955/); assert.match(answer('apstats-u5-007'),new RegExp(`${(100*r*r).toFixed(1)}%`));
  assert.ok(Math.abs(slope-2.6489361702)<1e-9&&Math.abs(intercept-13.0957446809)<1e-9); assert.match(answer('apstats-u5-008'),/36\.9/); assert.ok(Math.abs(intercept+slope*9-36.93617021)<1e-8);
  assert.equal(answer('apstats-u5-009'),'−8 kg'); assert.equal(104-112,-8);
  const tree=q('apstats-u5-010').stimulus; const r2row=tree.rows.find(row=>row[0]==='r²'); assert.equal(Number(r2row[1]),.886); assert.match(answer('apstats-u5-010'),/88\.6%/);
  const slopeRow=tree.rows.find(row=>row[0]==='Diameter'); assert.equal(Number(slopeRow[1]),4.72); assert.match(answer('apstats-u5-011'),/4\.72 kg per additional centimeter/);
});
