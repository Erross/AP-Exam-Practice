const fs=require('node:fs');
const p='tools/fix-ap-statistics-audit.js';
let s=fs.readFileSync(p,'utf8');
const old="assert.match(ans('runner\\'s time is 68'),/z = −2/);";
const repl='assert.match(ans("runner\'s time is 68"),/z = −2/);';
if(!s.includes(old)) throw new Error('quoted runner assertion not found');
s=s.replace(old,repl);
fs.writeFileSync(p,s);
