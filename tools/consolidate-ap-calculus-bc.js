const fs = require('node:fs');
const vm = require('node:vm');

const sandbox = { window: {} };
vm.createContext(sandbox);
[
  'data/ap-calculus-ab.js',
  'data/ap-calculus-ab-quality-fixes.js',
  'data/ap-calculus-bc.js',
  'data/ap-calculus-bc-u6-u8.js',
  'data/ap-calculus-bc-u9.js',
  'data/ap-calculus-bc-u10.js',
].forEach((file) => vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file }));

const bank = sandbox.window.QUESTIONS_AP_CALCULUS_BC;
if (!Array.isArray(bank) || bank.length !== 210) {
  throw new Error(`Expected 210 effective Calculus BC questions; got ${bank && bank.length}`);
}

const header = `// AP Calculus BC — original, unofficial Section I practice bank.\n// Consolidated from the independently audited browser-effective development bank.\n// Standalone shipping artifact: no runtime dependency on the AP Calculus AB bank.\n// Aligned to the Fall 2026 course framework / May 2027 exam format.\n\n`;
fs.writeFileSync('data/ap-calculus-bc.js', `${header}window.QUESTIONS_AP_CALCULUS_BC = ${JSON.stringify(bank, null, 2)};\n`);

let html = fs.readFileSync('index.html', 'utf8');
for (const src of [
  'data/ap-calculus-bc-u6-u8.js',
  'data/ap-calculus-bc-u9.js',
  'data/ap-calculus-bc-u10.js',
]) {
  html = html.replace(new RegExp(`\\n?<script src="${src.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}"><\\/script>`), '');
}
fs.writeFileSync('index.html', html);
