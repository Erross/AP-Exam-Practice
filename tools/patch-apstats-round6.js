const fs=require('node:fs');
const p='tools/fix-ap-statistics-audit.js';
let s=fs.readFileSync(p,'utf8');
const marker='// Validate CED topic/practice pairing after repairs before writing anything.';
const patch=`set(one('A company compares two battery-saving modes by randomly assigning each of 120 identical new phones'), {\n  o:['It helps balance lurking characteristics across the two mode groups so differences in battery life can be attributed more credibly to the assigned mode.','It makes the 120 tested phones representative of phones sold in the future.','It forces the two groups to have identical sample mean battery life.','It removes the need to hold the workload constant across phones.'],\n  c:[0],\n});\n{const q=one('A company compares two battery-saving modes by randomly assigning each of 120 identical new phones');const correct=q.o[q.c[0]],wrong=q.o.filter((_,j)=>j!==q.c[0]);const idx=bank.indexOf(q)%4;const opts=wrong.slice();opts.splice(idx,0,correct);q.o=opts;q.c=[idx];}\n\n`;
if(!s.includes(marker))throw new Error('round6 insertion marker missing');
s=s.replace(marker,patch+marker);
fs.writeFileSync(p,s);
