const fs = require('node:fs');

function replaceSubject(targetSource, sourceSource, id) {
  const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`  \\{\\n    id: "${escaped}",[\\s\\S]*?\\n  \\},(?=\\n  \\{\\n    id:)`);
  const match = sourceSource.match(re);
  if (!match) throw new Error(`Could not extract subject ${id}`);
  if (!re.test(targetSource)) throw new Error(`Could not locate target subject ${id}`);
  return targetSource.replace(re, match[0]);
}

let subjects = fs.readFileSync('js/subjects.js', 'utf8');
const physicsSubjects = fs.readFileSync('/tmp/physics-subjects.js', 'utf8');
subjects = replaceSubject(subjects, physicsSubjects, 'ap-physics-2');
fs.writeFileSync('js/subjects.js', subjects);

let helpers = fs.readFileSync('tests/helpers.js', 'utf8');
if (!helpers.includes('function loadPhysics2Bank()')) {
  const fn = `\nfunction loadPhysics2Bank() {\n  const sandbox = { window: {} };\n  vm.createContext(sandbox);\n  vm.runInContext(fs.readFileSync("data/ap-physics-2.js", "utf8"), sandbox);\n  return sandbox.window.QUESTIONS_AP_PHYSICS_2;\n}\n`;
  helpers = helpers.replace(/\nmodule\.exports = \{[^\n]+\};\n?$/, `${fn}\nmodule.exports = { loadGovernmentBank, loadChemistryBank, loadPhysics2Bank };\n`);
}
fs.writeFileSync('tests/helpers.js', helpers);
