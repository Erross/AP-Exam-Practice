const fs = require("node:fs");
const target = "tools/fix-physics2-independent-audit.js";
let source = fs.readFileSync(target, "utf8");
source = source.replace('let subjects = fs.readFileSync("js/subjects.js", "utf8");n\n', 'let subjects = fs.readFileSync("js/subjects.js", "utf8");\n');
fs.writeFileSync(target, source);
require("./fix-physics2-independent-audit.js");
if (fs.existsSync(__filename)) fs.unlinkSync(__filename);
