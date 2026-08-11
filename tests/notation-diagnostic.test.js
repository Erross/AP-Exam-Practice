const test = require("node:test");
const fs = require("node:fs");
const vm = require("node:vm");

function loadAllBanks() {
  const html = fs.readFileSync("index.html", "utf8");
  const scripts = [...html.matchAll(/<script src="(data\/[^"]+\.js)"><\/script>/g)].map((m) => m[1]);

  // Classic bank files intentionally share lexical globals with their own
  // correction/curation layers (for example CHEM_QUESTIONS), but different
  // subjects may reuse short helper names such as `q`. Run each subject family
  // in its own browser-like context so the diagnostic observes effective bank
  // content without creating artificial cross-course redeclaration failures.
  const groups = new Map();
  scripts.forEach((file) => {
    const key = file.replace(/-(?:curation|corrections|quality-fixes)\.js$/, ".js");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(file);
  });

  const rows = [];
  groups.forEach((files) => {
    const sandbox = { window: {} };
    vm.createContext(sandbox);
    files.forEach((file) => vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file }));
    Object.entries(sandbox.window)
      .filter(([name, value]) => name.startsWith("QUESTIONS_") && Array.isArray(value))
      .forEach(([bank, questions]) => questions.forEach((q) => rows.push({ bank, q })));
  });
  return rows;
}

function stringsFor(q) {
  const out = [q.q, ...(q.o || []), q.e];
  if (q.stimulus) {
    out.push(q.stimulus.title, q.stimulus.text, q.stimulus.description, q.stimulus.note);
    (q.stimulus.columns || []).forEach((x) => out.push(String(x)));
    (q.stimulus.rows || []).flat().forEach((x) => out.push(String(x)));
  }
  return out.filter((x) => typeof x === "string");
}

const patterns = {
  caretExponent: /\^(?:\{|\(|[+\-−]?\d|[+\-−]|[A-Za-z])/,
  rawSqrt: /\bsqrt\s*\(/i,
  asciiArrow: /<->|->/,
  asciiInequality: /<=|>=/,
  asciiPlusMinus: /\+\/-/,
  asciiSubscript: /\b[A-Za-z]_[A-Za-z0-9]+\b/,
  plainInfinity: /(?:^|[\s=(])(?:\+|-|−)?infinity\b/i,
  greekWord: /\b(?:Delta|theta|lambda|sigma)\b/,
  plainIonicCharge: /\b(?:H|Li|Na|K|Mg|Ca|Al|Fe|Cu|Zn|Ag|F|Cl|Br|O|N|S)\d*[+−-](?=\s|,|\.|\)|\/|$)/,
  plainChemFormula: /\b(?:H2O|CO2|O2|N2|H2|NH3|CH4|H2SO4|HNO3|NO2|SO2|SO3|CaCO3|Na2CO3|NaOH|HCl|Cl2|Br2|I2|Fe2O3|Al2O3)\b/,
};

test("diagnose remaining raw notation patterns across all loaded banks", () => {
  const rows = loadAllBanks();
  const hits = Object.fromEntries(Object.keys(patterns).map((key) => [key, []]));
  rows.forEach(({ bank, q }) => {
    stringsFor(q).forEach((text) => {
      Object.entries(patterns).forEach(([name, regex]) => {
        if (regex.test(text) && hits[name].length < 12) hits[name].push(`${bank}/${q.id}: ${text.slice(0, 180)}`);
      });
    });
  });
  Object.entries(hits).forEach(([name, examples]) => {
    console.log(`NOTATION_DIAGNOSTIC ${name}: ${examples.length ? examples.join(" || ") : "none"}`);
  });
});
