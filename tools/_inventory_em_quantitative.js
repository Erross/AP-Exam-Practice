const fs=require('fs'),vm=require('vm');const sb={window:{}};vm.createContext(sb);vm.runInContext(fs.readFileSync('data/ap-physics-c-em.js','utf8'),sb);const b=sb.window.QUESTIONS_AP_PHYSICS_C_EM;
const numeric=/\d|μ|nC|mC|A\b|V\b|Ω|T\b|Wb|J\b|N\/C|N·m|rad\/s|m\/s|Hz|F\b|H\b/;
const calc=/what|magnitude|how much|factor|ratio|predicted|expression|equivalent|time constant|frequency|radius|potential|current|resistance|capacitance|energy|power|flux|field|force|emf|charge/i;
for(const q of b){if(numeric.test(q.q)&&calc.test(q.q)){console.log(JSON.stringify({id:q.id,skill:q.skill,q:q.q,correct:q.o[q.c[0]],e:q.e,stimulus:q.stimulusGroupId||null}));}}
