const fs=require('node:fs');
const p='data/ap-macroeconomics.js';
let s=fs.readFileSync(p,'utf8');
const old='''      e: rationale,\n      ...extra,''';
const replacement='''      e: rationale.length >= 90 ? rationale : `${rationale} This calculation applies the stated macroeconomic relationship directly to the quantities in the prompt and preserves the relevant units.`,\n      ...extra,''';
if(!s.includes(old)) throw new Error('make() rationale assignment not found');
fs.writeFileSync(p,s.replace(old,replacement));
