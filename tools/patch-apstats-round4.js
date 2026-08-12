const fs=require('node:fs');
const p='tools/fix-ap-statistics-audit.js';
let s=fs.readFileSync(p,'utf8');
const marker='// Validate CED topic/practice pairing after repairs before writing anything.';
const patch=`set(one('For a chi-square test of independence between two categorical variables, which null hypothesis is appropriate?'), {\n  o:['The two categorical variables are independent in the population.','The sample counts are equal across the cells of the table.','The two variables have a linear correlation of zero.','Each category has the same population proportion.'],\n  c:[0],\n});\n// Rebalance this rewritten item to the deterministic raw-key position used by the bank.\n{const q=one('For a chi-square test of independence between two categorical variables, which null hypothesis is appropriate?');const correct=q.o[q.c[0]],wrong=q.o.filter((_,j)=>j!==q.c[0]);const idx=bank.indexOf(q)%4;const opts=wrong.slice();opts.splice(idx,0,correct);q.o=opts;q.c=[idx];}\n\n`;
if(!s.includes(marker))throw new Error('round4 insertion marker missing');
s=s.replace(marker,patch+marker);
fs.writeFileSync(p,s);
