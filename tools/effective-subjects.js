const fs = require("node:fs");
const vm = require("node:vm");
const { AP_SUBJECTS: CANONICAL_SUBJECTS } = require("../js/subjects");

function metadataScripts(html = fs.readFileSync("index.html", "utf8")) {
  return [...html.matchAll(/<script src="(js\/[^"?]+-metadata\.js)(?:\?[^\"]*)?"><\/script>/g)]
    .map((match) => match[1]);
}

function loadEffectiveSubjects(html = fs.readFileSync("index.html", "utf8")) {
  const subjects = structuredClone(CANONICAL_SUBJECTS);
  const context = { AP_SUBJECTS: subjects };
  context.window = context;
  context.globalThis = context;
  vm.createContext(context);

  for (const source of metadataScripts(html)) {
    if (!fs.existsSync(source)) throw new Error(`Missing subject metadata layer: ${source}`);
    vm.runInContext(fs.readFileSync(source, "utf8"), context, { filename: source });
  }
  return subjects;
}

module.exports = { metadataScripts, loadEffectiveSubjects };
