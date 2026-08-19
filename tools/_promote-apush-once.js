const fs=require('node:fs');
const path='js/subjects.js';
let s=fs.readFileSync(path,'utf8');
const start=s.indexOf('    id: "ap-us-history"');
if(start<0) throw new Error('APUSH registry entry missing');
const end=s.indexOf('\n  },',start);
if(end<0) throw new Error('APUSH registry entry end missing');
let block=s.slice(start,end);
if(!block.includes('releaseStatus: "draft"')) throw new Error('APUSH is not draft');
block=block.replace('releaseStatus: "draft"','releaseStatus: "released"');
s=s.slice(0,start)+block+s.slice(end);
fs.writeFileSync(path,s);

const testPath='tests/ap-us-history-browser-release.test.js';
let t=fs.readFileSync(testPath,'utf8');
t=t.replace("assert.equal(s.releaseStatus,'draft');","assert.equal(s.releaseStatus,'released');");
if(!t.includes("assert.equal(s.releaseStatus,'released');")) throw new Error('APUSH release assertion not updated');
fs.writeFileSync(testPath,t);

fs.writeFileSync('AP_US_HISTORY_RELEASE_EVIDENCE.md',`# AP U.S. History Release Evidence\n\n## Candidate\n\n- Audited candidate before promotion: \`a60b022700bbc1ea2ed531ff53da06caec76f032\`\n- GitHub Actions Test run: **#1675 / 32280652915**\n- Result: **362/362 tests passed**, build passed, artifact check passed, npm audit reported 0 vulnerabilities.\n\n## Current exam specification\n\nVerified 2026-08-19 against the current College Board AP U.S. History course/exam materials and May 2027 history-exam update. Section I Part A remains **55 MCQs in 55 minutes, 40% of the exam**, primarily using 3–4 question source sets. This product is explicitly Section I Part A practice only; the official digital exam also includes three SAQs, a DBQ, and an LEQ.\n\n## Bank and coverage\n\n- **186 original MCQs**\n- **105/105 current Period 1–9 CED topics represented**\n- Browser-effective source-set schema and canonical script order verified\n- Single-select only; no calculator\n- Synthetic quantitative sources explicitly labeled and internally checked\n- Explanations all meet the repository rationale-depth release gate\n\n## Answer construction\n\nFinal candidate metrics from run #1675:\n\n- Uniquely-longest correct answer: **1.1%**\n- Among-longest correct answer: **8.1%**\n- Raw key counts: **A 44 / B 48 / C 47 / D 47**\n- No stacked absolute-language distractor tells\n- No repeated boilerplate answer-hardening tail within an item\n\n## Draw and retake audit\n\n- **5,000/5,000** exact 55-question forms passed the official period blueprint\n- **5,000** independent retake pairs passed\n- Mean retake overlap: **31.6%**, below the project maximum of 40%\n\n## Independent clean-room review\n\nThe post-repair review restarted from the current exam specification and reviewed topic coverage, source dependence, answer keys, distractor competitiveness, causal claims, chronology, and student-facing explanations. It found one substantive late-stage issue: a question described both the Afghanistan and Iraq wars as direct consequences of September 11. The item was corrected to the direct expansion of counterterrorism policy and the U.S.-led war in Afghanistan, the explanation was narrowed, and a regression test was added. The restarted review after that repair produced **zero additional substantive findings**.\n\n## Naive student-flow audit\n\nThe browser-effective preflight exposes the 55-question / 55-minute format, MCQ-only scope, no-calculator status, and the existence of the official free-response components. Generic application tests also cover preflight confirmation, timer start behavior, session resume, navigation, flagging, submission/review flow, keyboard/screen-reader semantics, and draft exclusion from production artifacts.\n\n## Release decision\n\nAll content, construction, draw, retake, clean-room, naive, build, and artifact gates are satisfied. Promotion changes only the release state and its corresponding assertion; the promoted head must pass the full CI suite again before integration.\n`);
