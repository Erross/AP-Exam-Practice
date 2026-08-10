const fs = require("node:fs");
const vm = require("node:vm");

function loadGovernmentBank() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync("data/ap-us-government.js", "utf8"), sandbox);
  return sandbox.window.QUESTIONS_AP_US_GOVERNMENT;
}

module.exports = { loadGovernmentBank };
