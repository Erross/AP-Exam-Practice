const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const {AP_SUBJECTS}=require("../js/subjects");
const {loadEffectiveBank}=require("../tools/subject-release-audit");
const subject=AP_SUBJECTS.find(x=>x.id==="ap-art-history");
const {bank}=loadEffectiveBank(subject);
const required=[5,7,8,13,17,19,22,34,35,37,43,46,49,52,55,56,58,60,68,72,76,77,85,91,93,100,101,103,109,115,119,120,125,127,140,144,146,151,153,156,157,161,167,168,169,177,181,185,191,192,199,202,209,211,214,215,221,225,226,229,233,238,240,249];

test("Art History draft bank has the audited prescribed-work inventory and all MCQ skills",()=>{
 assert.equal(subject.formatVerified,true); assert.equal(subject.releaseStatus,"draft"); assert.equal(subject.calculatorAllowed,false);
 assert.equal(bank.length,340); assert.equal(new Set(bank.map(q=>q.id)).size,340);
 assert.deepEqual([...new Set(bank.map(q=>q.workNo).filter(Number.isInteger))].sort((a,b)=>a-b),required);
 assert.deepEqual([...new Set(bank.map(q=>q.unit))].sort(),["U1","U10","U2","U3","U4","U5","U6","U7","U8","U9"]);
 assert.deepEqual([...new Set(bank.map(q=>q.skill))].sort(),["1","2","3","4","5","6","7"]);
 bank.forEach(q=>{assert.equal(q.type,"s");assert.equal(q.o.length,4,q.id);assert.equal(q.c.length,1,q.id);assert.ok(q.q.length>=20,q.id);assert.ok(q.e.length>=90,`${q.id}: short rationale`);});
});

test("Art History visual groups are two-question, single-unit, single-image sets with honest unknown labels",()=>{
 const groups=new Map();
 bank.filter(q=>q.stimulusGroupId).forEach(q=>{if(!groups.has(q.stimulusGroupId))groups.set(q.stimulusGroupId,[]);groups.get(q.stimulusGroupId).push(q);});
 assert.equal(groups.size,48,`visual groups: ${[...groups.keys()].join(", ")}`);
 let unknown=0,known=0;
 for(const [id,qs] of groups){
  assert.equal(qs.length,2,id); assert.equal(new Set(qs.map(q=>q.unit)).size,1,id); assert.equal(new Set(qs.map(q=>q.stimulus)).size,1,id);
  assert.equal(qs[0].stimulus.type,"visual",id); assert.ok(qs[0].stimulus.image.startsWith("assets/ap-art-history/"),id);
  if(id.includes("unk-")){unknown++;assert.deepEqual(qs.map(q=>q.skill).sort(),["5","6"],id);assert.equal(qs[0].stimulus.title,"Unidentified work",id);assert.doesNotMatch(qs[0].stimulus.description,/Mona|Venus|Nefertiti|Vermeer|David|Delacroix|G.ricault|Monet|Amiens/i,id);}
  else {known++;assert.deepEqual(qs.map(q=>q.skill).sort(),["1","2"],id);}
 }
 assert.equal(unknown,10); assert.equal(known,38);
});

test("Every shipped Art History visual has reusable-source provenance and a local asset",()=>{
 const manifest=JSON.parse(fs.readFileSync(path.join(__dirname,"..","assets","ap-art-history","SOURCES.json"),"utf8"));
 const byKey=new Map(manifest.map(x=>[x.key,x]));
 const images=[...new Set(bank.filter(q=>q.stimulus&&q.stimulus.image).map(q=>q.stimulus.image))];
 assert.equal(images.length,48);
 for(const image of images){const key=path.basename(image,".jpg");const src=byKey.get(key);assert.ok(src,`${key}: missing provenance`);assert.ok(src.sourceUrl,`${key}: missing source URL`);assert.match(src.license,/Public domain|CC0|CC BY|CC BY-SA/i,`${key}: unacceptable license`);assert.ok(fs.existsSync(path.join(__dirname,"..",image)),`${key}: missing local image`);}
 assert.equal(byKey.has("249-maxxi"),false,"wrong MAXXI/Riverside asset must stay removed");
});
