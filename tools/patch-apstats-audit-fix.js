const fs=require('node:fs');
const p='tools/fix-ap-statistics-audit.js';
let s=fs.readFileSync(p,'utf8');
const marker='// Validate CED topic/practice pairing after repairs before writing anything.';
const patch=`// Additional mismatches exposed by the full CED matrix.\none('A hospital data set codes discharge destination').skill='2.A';\none('A histogram of waiting times has most observations').skill='3.A';\none('If P(A) = 0.55, P(B) = 0.30').skill='4.D';\none('The population standard deviation is 18. What theoretical standard deviation').skill='4.D';\none('For the delivery data, software gives r≈0.996').skill='4.D';\n\n`;
if(!s.includes(marker))throw new Error('insertion marker missing');
s=s.replace(marker,patch+marker);
fs.writeFileSync(p,s);
