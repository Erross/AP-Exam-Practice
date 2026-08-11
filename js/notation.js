// Safe notation renderer: converts caret exponents to semantic <sup> elements without innerHTML.
(function (root) {
  "use strict";
  const SUP_PATTERN = /\^(\{([^{}]+)\}|\(([^()]+)\)|([+\-−]?\d+(?:\.\d+)?[+\-−]?|[+\-−]|[nxykt]))/g;

  function tokenizeNotation(text) {
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

  function replaceTextNode(textNode) {
    if (!textNode || !textNode.nodeValue || !textNode.nodeValue.includes("^")) return;
    const parent = textNode.parentElement;
    if (!parent || parent.closest("script, style, sup, sub")) return;
    const tokens = tokenizeNotation(textNode.nodeValue);
    if (!tokens.some((token) => token.type === "sup")) return;
    const fragment = document.createDocumentFragment();
    tokens.forEach((token) => {
      if (token.type === "sup") {
        const sup = document.createElement("sup");
        sup.className = "notation-sup";
        sup.textContent = token.value;
        fragment.appendChild(sup);
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
