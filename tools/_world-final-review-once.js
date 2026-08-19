const fs=require('node:fs');
const base='data/ap-world-history.js';
let s=fs.readFileSync(base,'utf8');
const anchor='  function makeQuestion(seed, unit, stimulus, item, sequence, gid) {';
if(!s.includes(anchor)) throw new Error('AP World constructor anchor missing');
if(!s.includes('const finalReviewDistractors = {')){
const block=`  const finalReviewDistractors = {
    "apworld-u3-gunpowder-01":["Rulers increasingly relied on provincial cavalry levies and negotiated aristocratic service rather than salaried infantry","Military consolidation depended primarily on fortified frontiers and tribute arrangements rather than expanded firearm-equipped standing forces","Gunpowder weapons strengthened regional military households more than central courts because rulers lacked fiscal systems to maintain permanent troops"],
    "apworld-u3-ottoman-safavid-01":["The timar system, which assigned provincial revenue rights to cavalrymen in return for military service","The millet framework, which organized recognized religious communities under their own communal authorities","The provincial tax-farming system, which delegated revenue collection to contractors rather than recruiting palace servants"],
    "apworld-u3-mughal-01":["The zamindari structure, in which local revenue intermediaries collected taxes and exercised substantial regional influence","The jagirdari practice of assigning revenue from designated lands to officials in return for imperial service","The Ottoman timar system, which similarly linked land revenue assignments to military obligations but developed in a different empire"],
    "apworld-u3-russia-qing-01":["Both states expanded mainly through negotiated commercial privileges that left frontier political authority largely unchanged","Both empires relied primarily on maritime trading companies rather than direct military campaigns to incorporate frontier regions","Both dynasties expanded by integrating frontier peoples through tribute and alliances while generally avoiding permanent administrative institutions"],
    "apworld-u4-navigation-01":["European rulers financed longer voyages chiefly by increasing tribute from inland agrarian regions rather than adapting navigation or ship technology","Atlantic expansion resulted mainly from larger populations of sailors while navigational knowledge and maritime technology changed little","European mariners depended on a single newly invented device rather than combining older Mediterranean, Islamic, and Asian navigational knowledge"],
    "apworld-u4-navigation-03":["the financial organization of joint-stock companies and their relationship to royal monopolies","the demographic effects of epidemic disease on Indigenous American societies after sustained contact","the legal structure of plantation labor systems that developed after European colonization of the Americas"],
    "apworld-u4-resistance-02":["using colonial courts and petitions as their primary means of securing legally recognized collective freedom","forming armed communities within plantation districts while remaining under direct supervision of colonial authorities","negotiating improved labor conditions while accepting continued residence and compulsory work on plantations"],
    "apworld-u5-industrial-beginnings-02":["improved canal engineering that expanded water transport but did not provide the new motive power used by railways and steamships","the telegraph, which accelerated communication but did not itself propel the new land and ocean transport systems","mechanized textile machinery, which transformed factory production but did not directly power long-distance transport"],
    "apworld-u5-industrial-spread-02":["Germany and Britain, where national governments directly owned most major factories and railway systems throughout industrialization","Britain and Japan, because both depended primarily on state-owned enterprises rather than private capital during their first industrial expansion","Germany and Russia, because both rejected private investment and relied almost entirely on central-government ownership of productive industry"],
    "apworld-u6-africa-asia-04":["centralized taxation and conscription alone, which gave imperial states decisive advantages even where transport and weapon technologies were similar","commercial treaties that usually secured colonial rule without the need for military coercion or occupation","demographic superiority of European settler populations, which was the principal basis of conquest across both Africa and Asia"],
    "apworld-u6-resistance-03":["foreign treaty-port privileges, missionary activity, and extraterritorial rights imposed on Qing China","Qing fiscal reforms that expanded domestic merchant influence while reducing foreign access to Chinese markets","regional warlord rule that emerged after the 1911 Revolution and weakened the later Chinese republic"],
    "apworld-u7-wwi-causes-01":["The Moroccan crises, which intensified great-power rivalry but did not themselves trigger the July 1914 mobilization crisis","The Balkan Wars, which destabilized southeastern Europe and heightened tensions before the assassination","Germany's decision to resume unrestricted submarine warfare, which occurred later in the conflict and affected U.S. entry"],
    "apworld-u7-wwii-causes-01":["Japan's withdrawal from the League of Nations after criticism of its occupation of Manchuria","The escalation of the Second Sino-Japanese War after the Marco Polo Bridge Incident","The creation of the Greater East Asia Co-Prosperity Sphere as an ideological justification for Japanese regional dominance"],
    "apworld-u7-mass-atrocity-01":["mass deportation and forced labor designed primarily to exploit conquered populations without an explicit program of extermination","wartime internment of populations defined as security risks rather than a state policy aimed at their physical annihilation","violent ethnic cleansing intended to remove populations from contested territory rather than systematically murder an entire people"],
    "apworld-u8-korea-01":["The Vietnam War, another major Cold War proxy conflict in Asia but centered in Indochina rather than the Korean Peninsula","The Chinese Civil War, which shaped the regional Cold War balance but was fought primarily between Chinese Nationalists and Communists","The Soviet-Afghan War, which became a major proxy conflict later in the Cold War and in a different region"],
    "apworld-u8-resistance-01":["The U.S. civil-rights movement, which challenged racial segregation and disfranchisement but within a different national political system","The Indian independence movement, which opposed colonial rule and racial hierarchy but was directed primarily against British imperial sovereignty","The Negritude movement, which challenged colonial cultural hierarchies through literature and intellectual activism rather than apartheid law"],
    "apworld-u9-reform-01":["Campaigns for stronger national trade barriers and domestic industrial protection without broader rights-based demands","Movements seeking tighter state control of migration and citizenship as a response to globalization","Campaigns defending existing international financial institutions against demands for greater transparency or representation"],
    "apworld-u9-culture-01":["International media corporations distributing largely standardized products with limited adaptation to local audiences","Diaspora communities preserving homeland cultural practices while minimizing exchange with surrounding societies","States promoting national cultural industries primarily through restrictions on imported media and entertainment"],
    "apworld-u9-resistance-01":["the distribution of gains from trade and investment even when aggregate national income rises","the effects of multinational production on domestic labor bargaining power and employment security","the influence of international financial rules on governments' room to pursue independent economic policies"],
  };
  function applyFinalReviewDistractors(){
    for(const [id,replacements] of Object.entries(finalReviewDistractors)){
      const q=window.QUESTIONS_AP_WORLD_HISTORY.find(item=>item.id===id);
      if(!q) throw new Error('Missing AP World final-review item '+id);
      const correct=q.o[q.c[0]];
      const options=replacements.slice();
      options.splice(q.c[0],0,correct);
      q.o=options;
    }
  }
  window.__APWORLD_FINALIZE_REVIEW__=applyFinalReviewDistractors;

`;
s=s.replace(anchor,block+anchor);
fs.writeFileSync(base,s);
}
const u9='data/ap-world-history-u9.js';
let t=fs.readFileSync(u9,'utf8');
const end='})();\n';
if(!t.includes('window.__APWORLD_FINALIZE_REVIEW__')){
  const at=t.lastIndexOf(end);
  if(at<0) throw new Error('U9 closure missing');
  t=t.slice(0,at)+'  if(typeof window.__APWORLD_FINALIZE_REVIEW__==="function") window.__APWORLD_FINALIZE_REVIEW__();\n'+t.slice(at);
  fs.writeFileSync(u9,t);
}
