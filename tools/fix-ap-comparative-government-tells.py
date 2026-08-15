from pathlib import Path
p=Path('data/ap-comparative-government.js')
s=p.read_text()
repls={
'`Political institutions have no meaningful effect on ${theme}.`':'`Political institutions are usually secondary to social factors when explaining ${theme}.`',
'`Variation in ${theme} is explained entirely by economic development.`':'`Variation in ${theme} is explained primarily by economic development rather than political institutions.`',
'`The author argues that the same political outcome occurs in every regime.`':'`The author expects broadly similar political outcomes even when institutional contexts differ.`',
'`It rejects comparison among countries because each political system is unique.`':'`It treats cross-national comparison as less useful than studying each political system in isolation.`',
'`It treats constitutional language as the only evidence political scientists may use.`':'`It gives formal constitutional rules greater explanatory weight than observed political practice.`',
'`It argues that political outcomes should be evaluated only as normative questions.`':'`It emphasizes normative evaluation more than empirical comparison of political outcomes.`',
'`Researchers should select only cases that already confirm the author\'s conclusion.`':'`Researchers should begin with cases that appear consistent with the claim before testing contrasting cases.`',
'`Researchers should avoid quantitative or qualitative evidence that might complicate the claim.`':'`Researchers should prioritize evidence that directly measures the proposed mechanism before adding broader contextual evidence.`',
'`The data demonstrate that public opinion has no relationship to ${theme}.`':'`The data provide little direct evidence about how public opinion relates to ${theme}.`',
'`The data prove that one constitutional design caused every observed change.`':'`The data are consistent with one constitutional explanation, but do not isolate that mechanism from alternatives.`',
}
for a,b in repls.items():
    if a not in s: print('warning: missing',a)
    s=s.replace(a,b)
p.write_text(s)
