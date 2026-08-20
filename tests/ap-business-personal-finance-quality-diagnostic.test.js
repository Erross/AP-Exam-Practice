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
  'data/ap-business-personal-finance-classification.js',
];
function load(){
  const c={}; c.window=c; c.globalThis=c; vm.createContext(c);
  scripts.forEach(path=>vm.runInContext(fs.readFileSync(path,'utf8'),c,{filename:path}));
  return Array.from(c.QUESTIONS_AP_BUSINESS_PERSONAL_FINANCE);
}
const bank=load();
const abs=/\b(always|never|every|only|completely|entirely|guarantee(?:d|s)?|impossible|automatically)\b/i;

test('AP Business diagnostic reports all short rationales together',()=>{
  const short=bank.filter(q=>String(q.e||'').trim().split(/\s+/).filter(Boolean).length<8).map(q=>q.id);
  console.log('AP Business short rationales',short);
  assert.deepEqual(short,[]);
});

test('AP Business diagnostic reports stacked or cartoon absolute-language distractors',()=>{
  const flagged=bank.filter(q=>q.o.filter((o,i)=>i!==q.c[0]&&abs.test(o)).length>=2).map(q=>({id:q.id,options:q.o}));
  console.log('AP Business stacked absolute-language items',flagged);
  assert.deepEqual(flagged,[]);
});
