from pathlib import Path
p=Path('data/ap-comparative-government.js')
s=p.read_text()
old='''    const q1=make(`${gid}-1`,t,"3.B",`Which pattern is most clearly shown in the ${title.toLowerCase()} data?`,`${rows[maxI][0]} has the largest increase from the earlier to the later observation.`,[
      `${rows[minI][0]} has the largest increase from the earlier to the later observation.`,
      `All three cases change by exactly the same amount.`,
      `Every case declines from the earlier to the later observation.`
    ],`Computing later minus earlier gives changes of ${vals.join(", ")} percentage points or units, so ${rows[maxI][0]} has the largest increase.`);
    const q2=make(`${gid}-2`,t,"3.D",`What is the most defensible political inference from these synthetic ${theme} data alone?`,`The data can establish a pattern in ${theme}, but a causal explanation would require additional evidence about institutions, events, and alternative explanations.`,[
      `The data prove that one constitutional design caused every observed change.`,
      `The data provide little direct evidence about how public opinion relates to ${theme}.`,
      `The data are sufficient to identify the motives of individual political leaders.`
    ],`The table describes an association or trend. It does not by itself establish causation or reveal individual motives, so a cautious inference is required.`);'''
new='''    const deltaText = (i) => `${rows[i][0]} changes from ${rows[i][1]} to ${rows[i][2]}, a difference of ${vals[i]}.`;
    const otherIs = [0,1,2].filter(i=>i!==maxI);
    const q1=make(`${gid}-1`,t,"3.B",`Which pattern is most clearly shown in the ${title.toLowerCase()} data?`,`${rows[maxI][0]} shows the largest increase: ${deltaText(maxI)}`,[
      `${rows[otherIs[0]][0]} shows the largest increase: ${deltaText(otherIs[0])}`,
      `${rows[otherIs[1]][0]} shows the largest increase: ${deltaText(otherIs[1])}`,
      `${rows[minI][0]} and ${rows[maxI][0]} show equal changes despite their different earlier and later values.`
    ],`Computing later minus earlier gives changes of ${vals.join(", ")} percentage points or units, so ${rows[maxI][0]} has the largest increase.`);
    const q2=make(`${gid}-2`,t,"3.D",`What is the most defensible political inference from these synthetic ${theme} data alone?`,`The table establishes a pattern in ${theme}, but explaining its cause requires evidence about institutions, events, and competing explanations.`,[
      `The repeated observations show that the largest change was caused by the constitutional structure of that case rather than by economic or social conditions.`,
      `The table shows that leaders in the case with the highest later value intentionally produced that outcome through their policy choices.`,
      `Because the table does not display economic or demographic variables, those factors can be ruled out as explanations for the observed changes.`
    ],`The table describes an association or trend. It does not by itself establish causation or reveal individual motives, so a cautious inference is required.`);'''
if old not in s: raise SystemExit('quantitative source templates not found')
s=s.replace(old,new)
old2='''    const q1=make(`${gid}-1`,t,"4.A",`Which statement best describes the author's central claim about ${theme}?`,text.replace(/^A (comparative-politics scholar|researcher|scholar|political scientist) argues that /,""),[
      `Political institutions are usually secondary to social factors when explaining ${theme}.`,
      `Variation in ${theme} is explained primarily by economic development rather than political institutions.`,
      `The author expects broadly similar political outcomes even when institutional contexts differ.`
    ],`The correct option restates the passage's actual qualified claim. The alternatives replace it with absolute or monocausal positions the author does not make.`);
    const q2=make(`${gid}-2`,t,"4.B",`How does the author's argument most directly relate to comparative government?`,`It proposes a mechanism linking institutions or political conditions to variation in ${theme}, which can be compared across the course countries.`,[
      `It treats cross-national comparison as less useful than studying each political system in isolation.`,
      `It gives formal constitutional rules greater explanatory weight than observed political practice.`,
      `It emphasizes normative evaluation more than empirical comparison of political outcomes.`
    ],`Comparative politics uses cross-national variation to examine how institutions and conditions relate to outcomes. The passage offers exactly that kind of relationship.`);
    const q3=make(`${gid}-3`,t,"4.C",`Which implication follows most reasonably from the author's perspective?`,`Researchers should compare cases where the relevant political condition differs and examine whether outcomes in ${theme} differ in the predicted direction.`,[
      `Researchers should begin with cases that appear consistent with the claim before testing contrasting cases.`,
      `Researchers should prioritize evidence that directly measures the proposed mechanism before adding broader contextual evidence.`,
      `Researchers can infer individual motives directly from national-level institutional differences.`
    ],`A defensible implication is to test the proposed relationship comparatively. Selecting only confirming cases or inferring individual motives from aggregate institutions would weaken the analysis.`);'''
new2='''    const q1=make(`${gid}-1`,t,"4.A",`Which statement best describes the author's central claim about ${theme}?`,text.replace(/^A (comparative-politics scholar|researcher|scholar|political scientist) argues that /,""),[
      `The author treats institutional differences as secondary and argues that ${theme} is driven mainly by broad socioeconomic conditions shared across countries.`,
      `The author emphasizes formal constitutional design and suggests that variation in ${theme} largely disappears once countries adopt similar legal rules.`,
      `The author expects comparable pressures to produce broadly similar outcomes in ${theme} even when political institutions and regime conditions differ.`
    ],`The correct option restates the passage's actual qualified claim. The alternatives preserve plausible comparative arguments but alter the mechanism or relationship the author identifies.`);
    const q2=make(`${gid}-2`,t,"4.B",`How does the author's argument most directly relate to comparative government?`,`It proposes a mechanism linking political institutions or conditions to variation in ${theme}, creating a relationship that can be compared across countries.`,[
      `It argues that national histories make systematic comparison unreliable, so researchers should explain ${theme} through separate country narratives rather than common concepts.`,
      `It treats formal constitutional rules as the strongest evidence and gives less analytical weight to observed political behavior when comparing ${theme}.`,
      `It frames ${theme} mainly as a normative question about desirable government rather than an empirical relationship that can be examined across countries.`
    ],`Comparative politics uses cross-national variation to examine how institutions and conditions relate to outcomes. The passage offers exactly that kind of relationship.`);
    const q3=make(`${gid}-3`,t,"4.C",`Which implication follows most reasonably from the author's perspective?`,`Researchers should compare cases where the relevant political condition differs and test whether outcomes in ${theme} vary in the direction implied by the argument.`,[
      `Researchers should begin with cases that fit the argument and treat contrasting cases mainly as exceptions rather than evidence that could revise the proposed relationship.`,
      `Researchers should measure the proposed mechanism but give limited attention to contextual variables that might offer competing explanations for variation in ${theme}.`,
      `Researchers should use national institutional differences to infer the motivations of individual citizens or leaders when direct evidence about those motivations is unavailable.`
    ],`A defensible implication is to test the proposed relationship comparatively while remaining open to competing explanations. The alternatives introduce confirmation bias, omitted-variable problems, or an invalid individual-level inference.`);'''
if old2 not in s: raise SystemExit('text source templates not found')
s=s.replace(old2,new2)
p.write_text(s)
