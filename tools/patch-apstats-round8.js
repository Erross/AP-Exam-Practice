const fs=require('node:fs');
const p='tools/fix-ap-statistics-audit.js';
let s=fs.readFileSync(p,'utf8');
const marker='// Validate CED topic/practice pairing after repairs before writing anything.';
const patch=`// Break a handful of otherwise four-way numeric length ties by making one distractor\n// explicitly encode the misconception it represents. Correct answers are unchanged.\n{const fixes={\n'apstats-u1-006':['0.21','0.21, from halving the correct relative frequency'],\n'apstats-u1-008':['0.15','0.15, from dividing the category count by 1,000'],\n'apstats-u1-014':['9','9, the next ordered observation'],\n'apstats-u1-016':['20','20, from using the wrong quartile difference'],\n'apstats-u1-018':['12','12, the unstandardized distance above the mean']\n};for(const [id,[from,to]] of Object.entries(fixes)){const q=bank.find(x=>x.id===id);if(!q)throw new Error(id+' missing');const i=q.o.indexOf(from);if(i<0)throw new Error(id+' distractor missing: '+from);if(i===q.c[0])throw new Error(id+' target is correct answer');q.o[i]=to;}}\n\n`;
if(!s.includes(marker))throw new Error('round8 insertion marker missing');
s=s.replace(marker,patch+marker);
fs.writeFileSync(p,s);
