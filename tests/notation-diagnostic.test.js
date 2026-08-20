const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { tokenizeNotation } = require("../js/notation.js");

function loadAllBanks() {
  const html = fs.readFileSync("index.html", "utf8");
  const scripts = [...html.matchAll(/<script src="(data\/[^"]+\.js)"><\/script>/g)].map((m) => m[1]);
  const groups = new Map();
  scripts.forEach((file) => {
    const key = file.startsWith("data/ap-computer-science-a-")
      ? "data/ap-computer-science-a.js"
      : file.startsWith("data/ap-environmental-science-")
        ? "data/ap-environmental-science.js"
        : file.startsWith("data/ap-human-geography-")
        ? "data/ap-human-geography.js"
        : file.startsWith("data/ap-european-history-")
          ? "data/ap-european-history.js"
          : file.startsWith("data/ap-us-history-")
            ? "data/ap-us-history.js"
            : file.startsWith("data/ap-world-history-")
              ? "data/ap-world-history.js"
              : file.startsWith("data/ap-latin-")
                ? "data/ap-latin.js"
          : file.startsWith("data/ap-art-history-")
          ? "data/ap-art-history.js"
          : file.startsWith("data/ap-calculus-bc-")
            ? "data/ap-calculus-bc.js"
            : file.replace(/-(?:curation|corrections|quality-fixes)\.js$/, ".js");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(file);
  });

  const rows = [];
  groups.forEach((files, key) => {
    const sandbox = { window: {} };
    vm.createContext(sandbox);

    if (key === "data/ap-calculus-bc.js") {
      ["data/ap-calculus-ab.js", "data/ap-calculus-ab-quality-fixes.js"].forEach((file) => {
        vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
      });
    }

    files.forEach((file) => vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file }));
    Object.entries(sandbox.window)
      .filter(([name, value]) => {
        if (!name.startsWith("QUESTIONS_") || !Array.isArray(value)) return false;
        if (key === "data/ap-calculus-bc.js") return name === "QUESTIONS_AP_CALCULUS_BC";
        return true;
      })
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

function remainingTextAfterRendering(text) {
  return tokenizeNotation(text)
    .filter((token) => token.type === "text")
    .map((token) => token.value)
    .join("");
}

const patterns = {
  caretExponent: /\^(?:\{|\(|[+\-−]?\d|[+\-−]|[A-Za-z])/,
  rawSqrt: /\bsqrt\s*\(/i,
  asciiArrow: /<->|->/,
  asciiInequality: /<=|>=/,
  asciiPlusMinus: /\+\/-/,
  asciiSubscript: /\b[A-Za-z]_[A-Za-z0-9]+\b/,
  plainInfinity: /(?:\+|-|−)infinity\b|approaches\s+infinity\b/i,
  greekWord: /\b(?:Delta|theta|lambda|sigma)\b/,
  plainIonicCharge: /\b(?:H|Li|Na|K|Mg|Ca|Al|Fe|Cu|Zn|Ag|F|Cl|Br|O|N|S)\d*[+−-](?=\s|,|\.|\)|\/|$)/,
  plainChemFormula: /\b(?:H2O|CO2|O2|N2|H2|NH3|CH4|H2SO4|HNO3|NO2|SO2|SO3|CaCO3|Na2CO3|Cl2|Br2|I2|Fe2O3|Al2O3)\b/,
};

test("all loaded banks are presentation-ready after notation normalization", () => {
  const rows = loadAllBanks();
  const hits = Object.fromEntries(Object.keys(patterns).map((key) => [key, []]));
  rows.forEach(({ bank, q }) => {
    stringsFor(q).forEach((original) => {
      const text = remainingTextAfterRendering(original);
      Object.entries(patterns).forEach(([name, regex]) => {
        // In CSA, <=, >= and arrow-like operator text are programming syntax,
        // not mathematical display notation. The notation tokenizer deliberately
        // leaves programming strings unchanged, so the diagnostic must do the same.
        if (bank === "QUESTIONS_AP_COMPUTER_SCIENCE_A" && (name === "asciiArrow" || name === "asciiInequality")) return;
        if (regex.test(text) && hits[name].length < 12) hits[name].push(`${bank}/${q.id}: ${original.slice(0, 180)}`);
      });
    });
  });

  const failures = Object.entries(hits).filter(([, examples]) => examples.length);
  failures.forEach(([name, examples]) => console.log(`NOTATION_DIAGNOSTIC ${name}: ${examples.join(" || ")}`));
  assert.deepEqual(failures, [], "raw math/science notation remains after display normalization");
});
