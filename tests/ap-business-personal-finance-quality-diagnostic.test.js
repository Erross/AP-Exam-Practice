const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const scripts = [
  'data/ap-business-personal-finance.js',
  'data/ap-business-personal-finance-u1.js',
  'data/ap-business-personal-finance-u2.js',
  'data/ap-business-personal-finance-u3.js',
  'data/ap-business-personal-finance-u4.js',
  'data/ap-business-personal-finance-sets.js',
  'data/ap-business-personal-finance-sets-2.js',
  'data/ap-business-personal-finance-sets-3.js',
  'data/ap-business-personal-finance-sets-4.js',
  'data/ap-business-personal-finance-quality.js',
  'data/ap-business-personal-finance-classification.js',
  'data/ap-business-personal-finance-exact-skill.js',
];
function load(){
  const c={}; c.window=c; c.globalThis=c; vm.createContext(c);
  scripts.forEach(path=>vm.runInContext(fs.readFileSync(path,'utf8'),c,{filename:path}));
  return Array.from(c.QUESTIONS_AP_BUSINESS_PERSONAL_FINANCE);
}
const bank=load();
const abs=/\b(always|never|every|only|completely|entirely|guarantee(?:d|s)?|impossible|automatically)\b/i;

test('AP Business diagnostic requires substantive student-facing rationales',()=>{
  const short=bank.filter(q=>String(q.e||'').trim().length<90).map(q=>({id:q.id,length:String(q.e||'').trim().length,explanation:q.e}));
  console.log('AP Business rationales under 90 characters',short);
  assert.deepEqual(short,[]);
  for(const q of bank){
    assert.doesNotMatch(q.e,/This item applies CED Topic|This item tests Topic|course-relevant meaning of/i,q.id);
    assert.notEqual(String(q.e||'').trim(),String(q.o[q.c[0]]||'').trim(),q.id);
  }
});

test('AP Business diagnostic reports stacked or cartoon absolute-language distractors',()=>{
  const flagged=bank.filter(q=>q.o.filter((o,i)=>i!==q.c[0]&&abs.test(o)).length>=2).map(q=>({id:q.id,options:q.o}));
  console.log('AP Business stacked absolute-language items',flagged);
  assert.deepEqual(flagged,[]);
});
