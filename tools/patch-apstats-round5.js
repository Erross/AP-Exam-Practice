const fs=require('node:fs');
const p='tools/fix-ap-statistics-audit.js';
let s=fs.readFileSync(p,'utf8');
const marker='// Validate CED topic/practice pairing after repairs before writing anything.';
const patch=`set(one('A one-sample t test for a population mean uses n=18 observations'), {\n  o:['With a small sample, the severe skewness and outliers make the t-model condition questionable.','A known population standard deviation is required before using this procedure.','The response is categorical rather than quantitative.','The sample mean is constrained to equal the null mean before carrying out the test.'],\n  c:[0],\n});\n// Reapply the bank's deterministic raw-key position to the rewritten item.\n{const q=one('A one-sample t test for a population mean uses n=18 observations');const correct=q.o[q.c[0]],wrong=q.o.filter((_,j)=>j!==q.c[0]);const idx=bank.indexOf(q)%4;const opts=wrong.slice();opts.splice(idx,0,correct);q.o=opts;q.c=[idx];}\n\n`;
if(!s.includes(marker))throw new Error('round5 insertion marker missing');
s=s.replace(marker,patch+marker);
fs.writeFileSync(p,s);
