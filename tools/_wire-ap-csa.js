const fs=require('fs');
const p='index.html';
let s=fs.readFileSync(p,'utf8');
const old='<script src="data/ap-computer-science-a.js"></script>';
const replacement=[
  '<script src="data/ap-computer-science-a.js"></script>',
  '<script src="data/ap-computer-science-a-u1.js"></script>',
  '<script src="data/ap-computer-science-a-u2.js"></script>',
  '<script src="data/ap-computer-science-a-u3.js"></script>',
  '<script src="data/ap-computer-science-a-u4.js"></script>'
].join('\n');
const n=s.split(old).length-1;
if(n!==1) throw new Error('Expected exactly one AP CSA base script tag, found '+n);
fs.writeFileSync(p,s.replace(old,replacement));
