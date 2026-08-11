// Safe notation renderer: converts common math/science plain-text notation into
// semantic DOM without innerHTML. This keeps question-bank source readable while
// presenting powers, ionic charges, and chemical subscripts the way students
// normally see them in AP course materials.
(function (root) {
  "use strict";

  const SUP_PATTERN = /\^(\{([^{}]+)\}|\(([^()]+)\)|([+\-−]?\d+(?:\.\d+)?[+\-−]?|[+\-−]|[A-Za-z]))/g;

  // AP science banks use a fairly conventional subset of element symbols. The
  // list deliberately excludes one-letter U so strings such as a unit label U2
  // cannot accidentally be read as a chemical formula.
  const ELEMENT = "(?:He|Li|Be|Ne|Na|Mg|Al|Si|Cl|Ar|Ca|Sc|Ti|Cr|Mn|Fe|Co|Ni|Cu|Zn|Ga|Ge|As|Se|Br|Kr|Rb|Sr|Ag|Cd|Sn|Sb|Te|Xe|Cs|Ba|Pt|Au|Hg|Pb|Bi|H|B|C|N|O|F|P|S|K|I)";
  const CHEM_PATTERN = new RegExp(
    `\\b(?:(${ELEMENT})(\\d*)([+\\-−])|((?=[A-Za-z0-9]*\\d)(?:${ELEMENT}\\d*)+)([+\\-−])?)(?=\\W|$)`,
    "g"
  );
  const ELEMENT_PART_PATTERN = new RegExp(`(${ELEMENT})(\\d*)`, "g");

  function normalizePlainText(text) {
    return text.replace(/\bsqrt\s*\(/gi, "√(");
  }

  function tokenizeChemistry(text) {
    const source = normalizePlainText(text);
    const tokens = [];
    let lastIndex = 0;
    let match;
    CHEM_PATTERN.lastIndex = 0;

    while ((match = CHEM_PATTERN.exec(source)) !== null) {
      if (match.index > lastIndex) tokens.push({ type: "text", value: source.slice(lastIndex, match.index) });

      // First alternative: a monatomic ion written in common plain form such as
      // Ca2+, Fe3+, O2−, or Cl−. The magnitude and sign belong in superscript.
      if (match[1]) {
        tokens.push({ type: "text", value: match[1] });
        const charge = `${match[2] || ""}${match[3]}`.replace(/-/g, "−");
        tokens.push({ type: "sup", value: charge });
      } else {
        // Second alternative: a molecular/ionic formula containing numeric
        // subscripts, optionally followed by a one-character overall charge.
        const formula = match[4];
        let part;
        ELEMENT_PART_PATTERN.lastIndex = 0;
        while ((part = ELEMENT_PART_PATTERN.exec(formula)) !== null) {
          tokens.push({ type: "text", value: part[1] });
          if (part[2]) tokens.push({ type: "sub", value: part[2] });
        }
        if (match[5]) tokens.push({ type: "sup", value: match[5].replace(/-/g, "−") });
      }
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex === 0) return [{ type: "text", value: source }];
    if (lastIndex < source.length) tokens.push({ type: "text", value: source.slice(lastIndex) });
    return tokens;
  }

  function tokenizeSuperscripts(text) {
    const source = String(text);
    const tokens = [];
    let lastIndex = 0;
    let match;
    SUP_PATTERN.lastIndex = 0;
    while ((match = SUP_PATTERN.exec(source)) !== null) {
      if (match.index > lastIndex) tokens.push({ type: "text", value: source.slice(lastIndex, match.index) });
      const value = (match[2] ?? match[3] ?? match[4] ?? "").replace(/-/g, "−");
      tokens.push({ type: "sup", value });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex === 0) return [{ type: "text", value: source }];
    if (lastIndex < source.length) tokens.push({ type: "text", value: source.slice(lastIndex) });
    return tokens;
  }

  function tokenizeNotation(text) {
    return tokenizeSuperscripts(text).flatMap((token) =>
      token.type === "text" ? tokenizeChemistry(token.value) : [token]
    );
  }

  function replaceTextNode(textNode) {
    if (!textNode || !textNode.nodeValue) return;
    const parent = textNode.parentElement;
    if (!parent || parent.closest("script, style, sup, sub")) return;
    const original = textNode.nodeValue;
    const tokens = tokenizeNotation(original);
    if (tokens.length === 1 && tokens[0].type === "text" && tokens[0].value === original) return;

    const fragment = document.createDocumentFragment();
    tokens.forEach((token) => {
      if (token.type === "sup" || token.type === "sub") {
        const semantic = document.createElement(token.type);
        semantic.className = token.type === "sup" ? "notation-sup" : "notation-sub";
        semantic.textContent = token.value;
        fragment.appendChild(semantic);
      } else if (token.value) {
        fragment.appendChild(document.createTextNode(token.value));
      }
    });
    textNode.replaceWith(fragment);
  }

  function enhanceNotationRoot(rootNode) {
    if (!rootNode) return;
    if (rootNode.nodeType === 3) return replaceTextNode(rootNode);
    if (![1, 9, 11].includes(rootNode.nodeType)) return;
    const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(replaceTextNode);
  }

  function install() {
    const main = document.getElementById("main-content");
    if (!main) return;
    enhanceNotationRoot(main);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "characterData") replaceTextNode(mutation.target);
        else mutation.addedNodes.forEach(enhanceNotationRoot);
      });
    });
    observer.observe(main, { childList: true, subtree: true, characterData: true });
  }

  const api = { tokenizeNotation, enhanceNotationRoot };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root) root.AP_NOTATION = api;
  if (typeof document !== "undefined") document.addEventListener("DOMContentLoaded", install);
})(typeof window !== "undefined" ? window : globalThis);
