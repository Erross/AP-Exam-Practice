const fs=require('node:fs');
for(const f of [...Array.from({length:9},(_,i)=>`data/ap-us-history-u${i+1}.js`),'data/ap-us-history-coverage.js']){
  let s=fs.readFileSync(f,'utf8');
  s=s.replace(/if \(typeof add !== "function"\) throw new Error\([^\n]+\);/g,'if (typeof add !== "function") return;');
  fs.writeFileSync(f,s);
}
let index=fs.readFileSync('index.html','utf8');
const old='  <script src="data/ap-us-history.js"></script>\n  <script src="data/ap-world-history.js"></script>';
const layers=['data/ap-us-history.js',...Array.from({length:9},(_,i)=>`data/ap-us-history-u${i+1}.js`),'data/ap-us-history-coverage.js','data/ap-world-history.js'];
const replacement=layers.map(x=>`  <script src="${x}"></script>`).join('\n');
if(!index.includes(old)) throw new Error('APUSH index anchor not found');
index=index.replace(old,replacement);
fs.writeFileSync('index.html',index);
