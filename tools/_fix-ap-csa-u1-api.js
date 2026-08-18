const fs=require('fs');
const p='data/ap-computer-science-a-u1.js';
let s=fs.readFileSync(p,'utf8');
const reps=[
[`{skill:3,code:"1.7",q:\`Documentation lists static int max(int a, int b). Which call is consistent with that signature?\`,correct:\`int m = Math.max(4, 9);\`,d:[\`int m = Math.max(4.0, 9.0);\`,\`Math m = max(4, 9);\`,\`int m = Math.max("4", "9");\`],e:\`The documented method is static, returns int, and accepts two int arguments, so Math.max(4, 9) matches the signature and its return value can be assigned to an int variable.\`}`,
`{skill:3,code:"1.7",q:\`Documentation for class Tools lists public static int max(int a, int b). Which call is consistent with that signature?\`,correct:\`int m = Tools.max(4, 9);\`,d:[\`int m = Tools.max(4.0, 9.0);\`,\`Tools m = max(4, 9);\`,\`int m = Tools.max("4", "9");\`],e:\`The documented Tools method is static, returns int, and accepts two int arguments. Tools.max(4, 9) matches that API signature, and its int result can be stored in m.\`}`],
[`{skill:3,code:"1.11",q:\`What is Math.abs(-7) + Math.max(2, 5)?\`,correct:\`12\`,d:[\`2\`,\`7\`,\`14\`],e:\`Math.abs(-7) returns 7 and Math.max(2, 5) returns 5. Adding those two int results gives 12; both calls use static Math methods from the provided API.\`}`,
`{skill:3,code:"1.11",q:\`What is Math.abs(-7) + (int) Math.sqrt(25)?\`,correct:\`12\`,d:[\`2\`,\`7\`,\`14\`],e:\`Math.abs(-7) returns 7 and Math.sqrt(25) returns the double value 5.0. Casting that result to int gives 5, so the expression evaluates to 12 using methods on the AP Java Quick Reference.\`}`]
];
for(const [a,b] of reps){const n=s.split(a).length-1;if(n!==1)throw new Error('Expected one match, got '+n);s=s.replace(a,b);}
fs.writeFileSync(p,s);
