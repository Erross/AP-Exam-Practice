// AP World History: Modern — temporary final-review distractor repair layer.
// These replacements preserve each reviewed key while replacing giveaway/anachronistic alternatives.
(() => {
  "use strict";
  const bank=window.QUESTIONS_AP_WORLD_HISTORY;
  if(!Array.isArray(bank)) throw new Error("AP World bank must load before final-review layer");
  const replacements={
    "apworld-u3-gunpowder-01":["Rulers relied increasingly on provincial cavalry levies and negotiated aristocratic service","Military consolidation depended chiefly on fortified frontiers and tribute arrangements","Gunpowder strengthened regional military households more than central courts"],
    "apworld-u3-ottoman-safavid-01":["The timar system assigning provincial revenue rights for cavalry service","The millet framework organizing recognized religious communities under communal authorities","Provincial tax farming that delegated revenue collection to contractors"],
    "apworld-u3-mughal-01":["The zamindari structure using local intermediaries to collect imperial revenue","The jagirdari practice assigning land revenue to officials for service","The Ottoman timar system linking revenue assignments to military obligations"],
    "apworld-u3-russia-qing-01":["Both expanded mainly through commercial privileges that preserved frontier autonomy","Both relied primarily on maritime companies to incorporate frontier regions","Both favored tribute and alliances while avoiding permanent frontier administration"],
    "apworld-u4-navigation-01":["Rulers financed voyages mainly through greater inland tribute rather than maritime innovation","Atlantic expansion resulted chiefly from more sailors rather than improved navigation","Mariners depended on one new device rather than combining older navigational knowledge"],
    "apworld-u4-navigation-03":["the financial organization of joint-stock companies and royal monopolies","the demographic effects of epidemic disease on Indigenous societies","the legal organization of plantation labor after European colonization"],
    "apworld-u4-resistance-02":["using colonial courts and petitions to seek legally recognized collective freedom","forming armed communities while remaining under direct colonial supervision","negotiating better labor conditions while accepting continued compulsory plantation work"],
    "apworld-u5-industrial-beginnings-02":["canal engineering that improved transport without providing new motive power","the telegraph, which accelerated communication but did not propel transport","mechanized textile machinery that transformed factories rather than long-distance transport"],
    "apworld-u5-industrial-spread-02":["Germany and Britain, where governments directly owned most major factories","Britain and Japan, because both relied primarily on state-owned enterprise","Germany and Russia, because both largely rejected private industrial investment"],
    "apworld-u6-africa-asia-04":["centralized taxation and conscription even where military technologies remained comparable","commercial treaties that usually secured colonies without military occupation","European settler numbers as the principal basis of conquest across both regions"],
    "apworld-u6-resistance-03":["foreign treaty-port privileges and extraterritorial rights imposed on Qing China","Qing reforms that expanded merchants while reducing foreign market access","regional warlord rule that weakened the later Chinese republic"],
    "apworld-u7-wwi-causes-01":["The Moroccan crises, which intensified rivalry before the July 1914 crisis","The Balkan Wars, which destabilized southeastern Europe before the assassination","Germany's later resumption of unrestricted submarine warfare during the conflict"],
    "apworld-u7-wwii-causes-01":["Japan's withdrawal from the League after criticism of Manchuria","The later escalation of war after the Marco Polo Bridge Incident","The Co-Prosperity Sphere as an ideological claim for regional dominance"],
    "apworld-u7-mass-atrocity-01":["mass deportation and forced labor aimed primarily at exploitation","wartime internment of populations defined primarily as security risks","ethnic cleansing intended to remove populations from contested territory"],
    "apworld-u8-korea-01":["The Vietnam War, another Cold War proxy conflict in Asia","The Chinese Civil War between Nationalists and Communists","The Soviet-Afghan War, a later Cold War proxy conflict"],
    "apworld-u8-resistance-01":["The U.S. civil-rights movement against segregation and disfranchisement","The Indian independence movement against British colonial sovereignty","Negritude's literary challenge to colonial cultural hierarchies"],
    "apworld-u9-reform-01":["Campaigns for stronger trade barriers without broader rights-based demands","Movements seeking tighter migration and citizenship controls amid globalization","Campaigns defending existing financial institutions against transparency reforms"],
    "apworld-u9-culture-01":["Media corporations distributing standardized products with limited local adaptation","Diasporas preserving homeland practices while minimizing exchange with neighbors","States protecting national cultural industries through restrictions on imported media"],
    "apworld-u9-resistance-01":["the distribution of gains even when aggregate national income rises","multinational production's effects on labor bargaining power and employment security","international financial rules limiting governments' independent economic policy choices"]
  };
  for(const [id,distractors] of Object.entries(replacements)){
    const q=bank.find(item=>item.id===id);
    if(!q) throw new Error(`Missing AP World final-review item ${id}`);
    const correct=q.o[q.c[0]];
    const options=distractors.slice();
    options.splice(q.c[0],0,correct);
    q.o=options;
  }
})();
