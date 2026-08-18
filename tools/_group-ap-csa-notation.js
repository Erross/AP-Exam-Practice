const fs=require('fs');
const p='tests/notation-diagnostic.test.js';
let s=fs.readFileSync(p,'utf8');
const old=`    const key = file.startsWith("data/ap-environmental-science-")\n      ? "data/ap-environmental-science.js"\n      : file.startsWith("data/ap-human-geography-")`;
const replacement=`    const key = file.startsWith("data/ap-computer-science-a-")\n      ? "data/ap-computer-science-a.js"\n      : file.startsWith("data/ap-environmental-science-")\n        ? "data/ap-environmental-science.js"\n        : file.startsWith("data/ap-human-geography-")`;
const n=s.split(old).length-1;
if(n!==1) throw new Error('Expected one notation grouping anchor, found '+n);
fs.writeFileSync(p,s.replace(old,replacement));
