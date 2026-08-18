const fs = require('node:fs');
const path = 'data/ap-computer-science-a-quality-fixes.js';
let s = fs.readFileSync(path, 'utf8');
const replacements = [
  [
    'An enhanced for loop exposes the array index but makes the loop variable read-only, preventing assignments through that index.',
    'An enhanced for loop exposes the array index but does not permit assignments through that index.'
  ],
  [
    'An enhanced for loop copies the entire array before traversal, so changing an indexed element would update only the copy.',
    'An enhanced for loop copies the entire array before traversal, so changing an indexed element would update the copy rather than the original.'
  ],
  [
    'Initialize max to the number of rows plus columns, then update it only when an element exceeds that dimension total.',
    'Initialize max to the number of rows plus columns, then update it whenever an element exceeds that dimension total.'
  ],
  [
    'Initialize max to Integer.MIN_VALUE only after the first row has been processed, using 0 while examining that first row.',
    'Initialize max to Integer.MIN_VALUE after the first row has been processed, while using 0 for comparisons in that first row.'
  ]
];
for (const [from, to] of replacements) {
  if (!s.includes(from)) throw new Error(`Expected source text not found: ${from}`);
  s = s.replace(from, to);
}
fs.writeFileSync(path, s);
