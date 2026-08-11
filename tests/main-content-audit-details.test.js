const test = require('node:test');
const fs = require('node:fs');
const vm = require('node:vm');
function load(files, globalName){const s={window:{}};vm.createContext(s);for(const f of files)vm.runInContext(fs.readFileSync(f,'utf8'),s);return s.window[globalName];}
const banks={
 L:load(['data/ap-english-language.js'],'QUESTIONS_AP_ENGLISH_LANGUAGE'),
 T:load(['data/ap-english-literature.js'],'QUESTIONS_AP_ENGLISH_LITERATURE'),
 C:load(['data/ap-chemistry.js','data/ap-chemistry-curation.js','data/ap-chemistry-corrections.js'],'QUESTIONS_AP_CHEMISTRY'),
 A:load(['data/ap-calculus-ab.js'],'QUESTIONS_AP_CALCULUS_AB'),
 P:load(['data/ap-physics-2.js'],'QUESTIONS_AP_PHYSICS_2'),
};
const ids={
L:['aplang-r-shade-08','aplang-r-shade-12','aplang-r-repair-08','aplang-r-maps-11','aplang-r-replicas-09','aplang-r-observers-09','aplang-r-observers-12','aplang-w-start-02','aplang-w-native-03','aplang-ws-news-02','aplang-w-dark-05','aplang-w-dark-06'],
T:['aplit-sf-watch-05','aplit-sf-bell-05','aplit-sf-room-06','aplit-sf-snow-05','aplit-ld-orbit-04','aplit-sf-snow-03','aplit-sf-snow-10','aplit-ld-orbit-05'],
C:['apchem-u1-016','apchem-u3-021','apchem-u5-002','apchem-u6-003','apchem-u6-018','apchem-u7-017','apchem-u9-005','apchem-u9-018','apchem-u9-020','apchem-u3-005','apchem-u4-003','apchem-u4-008','apchem-u5-015','apchem-u5-017','apchem-u5-021','apchem-u7-001','apchem-u7-016','apchem-u9-003','apchem-u9-004','apchem-u9-008','apchem-u3-020','apchem-u4-014','apchem-u6-002','apchem-u7-018'],
A:['apcalc-u1-014','apcalc-u4-006','apcalc-u1-003','apcalc-u2-005','apcalc-u5-004','apcalc-u8-010'],
P:['apphys2-u9-010','apphys2-u10-009','apphys2-u11-009','apphys2-u11-012','apphys2-u11-015','apphys2-u13-011','apphys2-u13-015','apphys2-u14-026','apphys2-u14-027','apphys2-u15-010','apphys2-u15-011','apphys2-u15-013','apphys2-u15-019'],
};
for(const [k,list] of Object.entries(ids)) test(`DETAIL ${k}`,()=>{const m=new Map(banks[k].map(q=>[q.id,q]));for(const id of list){const q=m.get(id);if(!q){console.log('MISSING',k,id);continue;} console.log('DETAIL',JSON.stringify({course:k,id,q:q.q,o:q.o,c:q.c,e:q.e,topic:q.topic,topicCode:q.topicCode,skill:q.skill,stimulus:q.stimulus?.title||q.stimulus?.description||null}));}});
