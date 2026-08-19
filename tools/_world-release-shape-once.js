const fs=require('node:fs');
const cp=require('node:child_process');
let html=fs.readFileSync('index.html','utf8');
const anchor='  <script src="data/ap-world-history.js"></script>';
const line='  <script src="js/ap-world-history-metadata.js"></script>\n';
if(!html.includes('js/ap-world-history-metadata.js')){
  if(!html.includes(anchor)) throw new Error('AP World data anchor missing');
  html=html.replace(anchor,line+anchor);
  fs.writeFileSync('index.html',html);
}
cp.execFileSync('git',['show','origin/main:tools/subject-release-audit.js'],{encoding:'utf8',stdio:['ignore',fs.openSync('tools/subject-release-audit.js','w'),'inherit']});
