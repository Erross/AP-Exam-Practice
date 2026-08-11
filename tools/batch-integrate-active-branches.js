const fs = require('node:fs');
const { execFileSync } = require('node:child_process');

function gitShow(ref, path) {
  return execFileSync('git', ['show', `${ref}:${path}`], { encoding: 'utf8' });
}

function replaceSubject(targetSource, sourceSource, id) {
  const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`  \\{\\n    id: "${escaped}",[\\s\\S]*?\\n  \\},(?=\\n  \\{\\n    id:)`);
  const match = sourceSource.match(re);
  if (!match) throw new Error(`Could not extract subject ${id}`);
  if (!re.test(targetSource)) throw new Error(`Could not locate target subject ${id}`);
  return targetSource.replace(re, match[0]);
}

// Bring Physics 2 subject-specific canonical files across unchanged.
for (const path of ['data/ap-physics-2.js', 'tests/ap-physics-2.test.js']) {
  fs.writeFileSync(path, gitShow('origin/integration/2026-08-ap-physics-2', path));
}

// Merge the Physics 2 subject registry record without disturbing Chemistry/English.
let subjects = fs.readFileSync('js/subjects.js', 'utf8');
const physicsSubjects = gitShow('origin/integration/2026-08-ap-physics-2', 'js/subjects.js');
subjects = replaceSubject(subjects, physicsSubjects, 'ap-physics-2');
fs.writeFileSync('js/subjects.js', subjects);

// Merge both Chemistry and Physics loaders in the shared test helper.
let helpers = fs.readFileSync('tests/helpers.js', 'utf8');
if (!helpers.includes('function loadPhysics2Bank()')) {
  const fn = `\nfunction loadPhysics2Bank() {\n  const sandbox = { window: {} };\n  vm.createContext(sandbox);\n  vm.runInContext(fs.readFileSync("data/ap-physics-2.js", "utf8"), sandbox);\n  return sandbox.window.QUESTIONS_AP_PHYSICS_2;\n}\n`;
  helpers = helpers.replace(/\nmodule\.exports = \{[^\n]+\};\n?$/, `${fn}\nmodule.exports = { loadGovernmentBank, loadChemistryBank, loadPhysics2Bank };\n`);
}
fs.writeFileSync('tests/helpers.js', helpers);

console.log('Integrated Physics 2 into batch working tree.');
