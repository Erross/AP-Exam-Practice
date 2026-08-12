const fs=require('node:fs');
const p='tools/fix-ap-statistics-audit.js';
let s=fs.readFileSync(p,'utf8');
// Remove stacked absolute-language tells from the machine-fill item.
const marker='// Accessible visual descriptions must describe, not solve, the associated questions.';
const patch=`set(one('A dotplot of machine fill weights shows two separated clusters'), {\n  o: ['The apparent bimodality, because one center and spread may hide two production regimes', 'The two narrow clusters are enough to establish a normal population model', 'Reporting the overall range is sufficient because the two-cluster shape adds no relevant information', 'The displayed clusters imply a median of exactly 500.5 g'],\n  c:[0],\n});\n\n`;
if(!s.includes(marker))throw new Error('round2 insertion marker missing');
s=s.replace(marker,patch+marker);
// Fix exact-topic comparison to use numeric topic ordering rather than lexical ordering.
s=s.replace("[...seen.get(u)].sort((a,b)=>parseFloat(a)-parseFloat(b)), topics", "[...seen.get(u)].sort((a,b)=>Number(a.split('.')[1])-Number(b.split('.')[1])), topics");
fs.writeFileSync(p,s);
