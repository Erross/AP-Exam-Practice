const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const {AP_SUBJECTS}=require("../js/subjects");
const subject=AP_SUBJECTS.find(x=>x.id==="ap-human-geography");
const catalog=fs.readFileSync("js/catalog.js","utf8");

test("Human Geography naive audit exposes the exam-critical preflight facts",()=>{
  assert.equal(subject.mcqCount,60);
  assert.equal(subject.mcqTimeMinutes,60);
  assert.equal(subject.totalExamTimeLabel,"2h 15m");
  assert.equal(subject.calculatorAllowed,false);
  assert.match(catalog,/subject\.calculatorAllowed === false/);
  assert.match(catalog,/Calculator not permitted for this AP exam/);
  assert.match(catalog,/saved in this browser session/);
  assert.match(catalog,/Start timed practice/);
});
