const fs = require('fs');
const path = 'js/subjects.js';
const src = fs.readFileSync(path, 'utf8');
const oldText = 'tierNote: "This practice product simulates the 80-question multiple-choice section; the official fully digital exam also includes three free-response questions."';
const newText = 'tierNote: "Calculators are permitted throughout this 80-question multiple-choice practice section. The official fully digital exam also includes three free-response questions, which this product does not simulate."';
const hits = src.split(oldText).length - 1;
if (hits !== 1) throw new Error(`Expected exactly one APES tier note, found ${hits}`);
fs.writeFileSync(path, src.replace(oldText, newText));
console.log('APES tier note updated exactly once.');
