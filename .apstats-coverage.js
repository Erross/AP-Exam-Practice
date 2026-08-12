const fs=require('fs');
const p='.apstats-repair.js';
let s=fs.readFileSync(p,'utf8');
const changes=[
[
"['4.2','2.C','A researcher has one random sample of quantitative measurements and wants to estimate the population mean with unknown σ. Which procedure should be selected?','A one-sample t confidence interval for μ',['A one-proportion z interval for p','A chi-square test of independence','A two-sample t interval for μ₁−μ₂'],'One quantitative random sample, an unknown population standard deviation, and a goal of estimating one population mean call for a one-sample t confidence interval.']",
"['4.1','2.A','A researcher wants to use a sample mean to learn about a population mean. Which data-collection plan best supports the usual sampling-distribution model?','Select a random sample of individuals from the population.',['Select only individuals with values near the population center.','Let volunteers decide whether they want to be measured.','Choose consecutive individuals from one convenient location.'],'Random sampling supports treating observations as representative draws from the population, which is the design basis for using the sampling distribution of the sample mean in inference.']"
],
[
"['4.4','2.E','A manufacturer claims the mean lifetime is 900 hours, while an engineer suspects it is lower. Which hypotheses match that question?','H₀: μ=900 versus Hₐ: μ<900',['H₀: x̄=900 versus Hₐ: x̄<900','H₀: μ<900 versus Hₐ: μ=900','H₀: μ=900 versus Hₐ: μ≠900'],'Hypotheses concern the population mean. The claimed value belongs in the equality null, and the directional suspicion of a lower lifetime gives the less-than alternative.']",
"['4.3','2.D','A researcher is planning a confidence interval for a population mean and wants the interval to be more precise at the same confidence level. Which design change helps?','Increase the random-sample size.',['Decrease the random-sample size.','Collect measurements with greater variability if possible.','Replace quantitative measurements with category labels.'],'Increasing the sample size reduces the standard error of the sample mean, which reduces the margin of error and gives a more precise confidence interval at the same confidence level.']"
],
[
"['4.5','2.D','Which combination generally gives a hypothesis test more power to detect the same nonzero mean difference?','A larger sample size and lower population variability',['A smaller sample size and greater population variability','A larger significance threshold together with a smaller true effect','A larger standard error with the same sample size'],'Power increases when the signal is large relative to sampling noise. More observations and less variability both reduce standard error and make the same true difference easier to detect.']",
"['4.6','2.B','A study will compare mean outcomes for two treatments. Which design creates two independent samples rather than paired data?','Randomly assign different participants to the two treatment groups.',['Give both treatments to every participant and compare within-person differences.','Match each participant with the same participant measured twice.','Record two measurements from each participant without separating them by treatment.'],'Using different participants in independently formed treatment groups creates independent samples. Repeated or matched measurements on the same individuals instead create paired data.']"
],
[
"['4.9','2.E','Researchers compare mean response times for two independent treatments and suspect treatment 1 is faster. Which alternative matches μ₁−μ₂?','Hₐ: μ₁−μ₂<0',['Hₐ: μ₁−μ₂>0','Hₐ: μ₁−μ₂=0','Hₐ: x̄₁−x̄₂<0'],'Faster means a smaller mean response time. Thus the directional population claim is μ₁<μ₂, equivalently μ₁−μ₂<0.']",
"['4.8','2.D','A researcher is planning a confidence interval for the difference between two population means. Which change generally makes the interval narrower at the same confidence level?','Increase the sample sizes in both groups.',['Decrease the sample sizes in both groups.','Increase the variability of measurements in both groups.','Use more variable measurement methods while keeping sample sizes fixed.'],'Larger independent samples reduce the standard error of the difference in sample means, which reduces the margin of error and produces a narrower confidence interval at the same confidence level.']"
]
];
for(const [a,b] of changes){if(!s.includes(a))throw new Error('coverage replacement target missing');s=s.replace(a,b);}
fs.writeFileSync(p,s);
