// AP Statistics — original practice bank for the redesigned May 2027 exam.
// CED alignment independently re-audited 2026-08-11 against the Effective Fall 2026 CED.
(()=>{"use strict";
const STIMULI=[
  {
    "type": "quantitative",
    "title": "Commuter survey outcomes",
    "description": "A random commuter is classified by whether the trip began before 7:00 a.m. and whether the commuter used public transit. Counts from 400 commuters are shown.",
    "source": "Original synthetic data created for AP Exam Practice.",
    "columns": [
      "",
      "Public transit",
      "Other mode",
      "Total"
    ],
    "rows": [
      [
        "Before 7:00 a.m.",
        72,
        108,
        180
      ],
      [
        "7:00 a.m. or later",
        44,
        176,
        220
      ],
      [
        "Total",
        116,
        284,
        400
      ]
    ]
  },
  {
    "type": "quantitative",
    "title": "Delivery distance and time",
    "description": "A company records delivery distance x (miles) and delivery time y (minutes) for eight randomly selected local deliveries.",
    "source": "Original synthetic data created for AP Exam Practice.",
    "columns": [
      "Distance x (mi)",
      "2",
      "4",
      "5",
      "7",
      "8",
      "10",
      "12",
      "14"
    ],
    "rows": [
      [
        "Time y (min)",
        18,
        23,
        27,
        31,
        36,
        39,
        46,
        49
      ]
    ]
  },
  {
    "type": "quantitative",
    "title": "Regression output: tree diameter and mass",
    "description": "Software output summarizes a least-squares regression predicting tree mass y (kg) from trunk diameter x (cm) for 32 trees sampled in one managed stand.",
    "source": "Original synthetic regression output created for AP Exam Practice.",
    "columns": [
      "Term",
      "Estimate",
      "SE",
      "t",
      "p-value"
    ],
    "rows": [
      [
        "Intercept",
        "−18.4",
        "6.1",
        "−3.02",
        "0.005"
      ],
      [
        "Diameter",
        "4.72",
        "0.31",
        "15.23",
        "<0.001"
      ],
      [
        "r²",
        "0.886",
        "",
        "",
        ""
      ],
      [
        "s",
        "7.8 kg",
        "",
        "",
        ""
      ]
    ]
  },
  {
    "type": "quantitative",
    "title": "Daily equipment failures",
    "description": "For a particular device, X is the number of failures observed during one day. The modeled probability distribution is shown.",
    "source": "Original synthetic probability model created for AP Exam Practice.",
    "columns": [
      "x",
      "0",
      "1",
      "2",
      "3"
    ],
    "rows": [
      [
        "P(X = x)",
        0.5,
        0.3,
        0.15,
        0.05
      ]
    ]
  },
  {
    "type": "quantitative",
    "title": "Sampling-mean simulation",
    "description": "A right-skewed population has mean 50 and standard deviation 18. Simulation summaries show repeated simple random samples and their sample means.",
    "source": "Original simulated sampling study created for AP Exam Practice.",
    "columns": [
      "Sample size n",
      "Mean of simulated x̄ values",
      "SD of simulated x̄ values",
      "Approximate shape"
    ],
    "rows": [
      [
        4,
        50.1,
        9,
        "right-skewed"
      ],
      [
        16,
        50,
        4.5,
        "less skewed"
      ],
      [
        64,
        50,
        2.25,
        "approximately normal"
      ]
    ]
  },
  {
    "type": "visual",
    "title": "Study time and quiz score",
    "description": "Scatterplot of 18 synthetic student observations with study hours on the horizontal axis, quiz score on the vertical axis, and a fitted least-squares line.",
    "source": "Original synthetic scatterplot created for AP Exam Practice.",
    "image": "assets/ap-statistics-regression-scatter.svg",
    "alt": "Scatterplot with study hours from about 1 to 9.5 on the horizontal axis and quiz scores from about 56 to 94 on the vertical axis; 18 plotted points and a fitted line are shown."
  }
];
const Q=[
  {
    "id": "apstats-u1-001",
    "unit": "U1",
    "topicCode": "1.1",
    "skill": "1.A",
    "type": "s",
    "q": "A city wants to know whether commute time differs between residents who work remotely at least three days per week and residents who do not. Which investigative question is best aligned with that goal?",
    "o": [
      "How do commute-time distributions compare for frequent remote workers and other city residents?",
      "What percentage of all surveyed city residents report working remotely at least three days per week?",
      "Why do some city residents prefer remote work rather than commuting?",
      "Is the average commute time for city residents exactly 30 minutes?"
    ],
    "c": [
      0
    ],
    "e": "The goal names a quantitative response, commute time, and a categorical grouping variable, remote-work status. A comparative question about the two commute-time distributions directly guides both collection and analysis.",
    "statsSetType": "standalone",
    "variantGroupId": "apstats-v-u1-investigative-comparison"
  },
  {
    "id": "apstats-u1-002",
    "unit": "U1",
    "topicCode": "1.1",
    "skill": "1.A",
    "type": "s",
    "q": "Researchers want to compare algebra-test performance for students offered a new tutoring program and students receiving the usual support. Which investigative question best matches that goal?",
    "o": [
      "What percentage of all students chose to attend at least one tutoring session?",
      "How do the algebra-test score distributions compare between the two support groups?",
      "Is the combined mean algebra score exactly 75 points?",
      "Why do individual students decide to seek tutoring?"
    ],
    "c": [
      1
    ],
    "e": "The goal is a comparison of a quantitative response across two groups, so the investigative question should compare the two score distributions. The other choices address participation, a fixed pooled value, or an unmeasured causal explanation rather than the stated comparison.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-003",
    "unit": "U1",
    "topicCode": "1.2",
    "skill": "2.A",
    "type": "s",
    "q": "A survey records each student's grade level, number of hours slept last night, preferred school-lunch entrée, and backpack mass in kilograms. Which variables are quantitative?",
    "o": [
      "Grade level and hours slept",
      "Preferred entrée category and measured backpack mass in kilograms",
      "Hours slept and backpack mass",
      "Grade level and preferred entrée"
    ],
    "c": [
      2
    ],
    "e": "Hours slept and backpack mass have meaningful numerical magnitudes for which arithmetic comparisons are sensible. Grade level is an ordered label here, and preferred entrée is categorical.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-004",
    "unit": "U1",
    "topicCode": "1.2",
    "skill": "2.A",
    "type": "s",
    "q": "A hospital data set codes discharge destination as 1 = home, 2 = rehabilitation, and 3 = skilled nursing. A student reports that the mean destination code is 1.8. What is the main statistical problem?",
    "o": [
      "The mean should be replaced by a z-score because the codes are standardized.",
      "The destination variable is quantitative because its categories are numbered.",
      "The data cannot be summarized because categorical variables have no useful summaries.",
      "The numerical codes represent categories, so their mean has no meaningful interpretation."
    ],
    "c": [
      3
    ],
    "e": "Assigning numbers to categories does not make the variable quantitative. Counts, proportions, or a bar chart are meaningful, but arithmetic on the arbitrary labels is not.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-005",
    "unit": "U1",
    "topicCode": "1.3",
    "skill": "3.A",
    "type": "s",
    "q": "A sample of 240 commuters includes 96 public-transit riders and 144 commuters using other modes. Which frequency table correctly represents the categorical variable primary commute mode?",
    "o": [
      "Public transit: 96; Other mode: 144",
      "Public transit: 144; Other mode: 96",
      "Public transit: 0.40; Other mode: 0.60, labeled as counts",
      "Public transit: 240; Other mode: 240"
    ],
    "c": [
      0
    ],
    "e": "A frequency table for a categorical variable records category counts. The observed counts are 96 public-transit riders and 144 other-mode commuters; proportions would be a different representation.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-006",
    "unit": "U1",
    "topicCode": "1.3",
    "skill": "4.A",
    "type": "s",
    "q": "A frequency table for 500 households lists 85 with no vehicle, 210 with one vehicle, 160 with two vehicles, and 45 with three or more. Which description is correct?",
    "o": [
      "The one-vehicle category is the most common, with 210 households.",
      "The no-vehicle category is the most common, with 85 households.",
      "Exactly half of the households have two or more vehicles.",
      "The three-or-more category contains more households than the two-vehicle category."
    ],
    "c": [
      0
    ],
    "e": "The frequency table shows 210 households in the one-vehicle category, which exceeds 160, 85, and 45 in the other categories. The remaining statements contradict the displayed counts.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-007",
    "unit": "U1",
    "topicCode": "1.4",
    "skill": "3.A",
    "type": "s",
    "q": "A school surveys students about one of four preferred after-school activities. Which display is most appropriate for showing the relative frequencies of the four categories?",
    "o": [
      "A histogram with touching bars",
      "A scatterplot of activity versus frequency",
      "A bar chart with one bar for each activity",
      "A normal probability plot"
    ],
    "c": [
      2
    ],
    "e": "Preferred activity is categorical. A bar chart appropriately displays category frequencies or relative frequencies; histograms are for quantitative variables and scatterplots require two quantitative variables.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-008",
    "unit": "U1",
    "topicCode": "1.4",
    "skill": "4.A",
    "type": "s",
    "q": "A bar chart for four categories has bar heights 90, 120, 150, and 140. Which description is supported by the graph?",
    "o": [
      "The third category has the greatest frequency.",
      "The first and fourth categories have equal frequencies.",
      "The second category contains more observations than the third.",
      "The four categories have approximately equal frequencies because all four bars fall within a fairly narrow numerical range."
    ],
    "c": [
      0
    ],
    "e": "The third bar has height 150, greater than 140, 120, and 90, so the third category is the most frequent. The other statements contradict the relative bar heights.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-009",
    "unit": "U1",
    "topicCode": "1.5",
    "skill": "3.A",
    "type": "s",
    "q": "A teacher wants a display that preserves the individual values of 22 quiz scores while also showing the shape of their distribution. Which display is best suited?",
    "o": [
      "A dotplot",
      "A pie chart",
      "A segmented bar chart",
      "A mosaic plot"
    ],
    "c": [
      0
    ],
    "e": "A dotplot places a mark for each quantitative observation, preserving individual values while revealing clusters, gaps, and shape. The other displays are designed for categorical data.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-010",
    "unit": "U1",
    "topicCode": "1.6",
    "skill": "4.A",
    "type": "s",
    "q": "A histogram of waiting times has most observations between 2 and 8 minutes, with a long tail extending to 35 minutes. Which description best matches the shape?",
    "o": [
      "Left-skewed",
      "Right-skewed",
      "Approximately uniform",
      "Approximately symmetric and bimodal"
    ],
    "c": [
      1
    ],
    "e": "A long tail toward larger values indicates right skew. The direction of skew is named for the tail, not for the side containing most observations.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-011",
    "unit": "U1",
    "topicCode": "1.6",
    "skill": "4.A",
    "type": "s",
    "q": "A distribution of household incomes has one clear peak, a median of $62,000, and a few very large values above $500,000. Which description is most defensible?",
    "o": [
      "Unimodal and left-skewed because the median is below the largest values",
      "Symmetric because there is only one peak",
      "Unimodal and right-skewed, with high-income values that may be outliers",
      "Bimodal because the high-income values form a second distribution by definition"
    ],
    "c": [
      2
    ],
    "e": "A small number of unusually large values creates a right tail and may create high outliers. One dominant peak is consistent with a unimodal distribution; a second mode is not implied by a few extremes.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-012",
    "unit": "U1",
    "topicCode": "1.6",
    "skill": "4.A",
    "type": "s",
    "q": "A dotplot of machine fill weights shows two separated clusters centered near 498 g and 503 g. What feature should be reported before summarizing the data with one mean and one standard deviation?",
    "o": [
      "The two narrow clusters are enough to establish a normal population model",
      "Reporting the overall range is sufficient because the two-cluster shape adds no relevant information",
      "The displayed clusters imply a median of exactly 500.5 g",
      "The apparent bimodality, because one center and spread may hide two production regimes"
    ],
    "c": [
      3
    ],
    "e": "Two distinct clusters suggest different underlying conditions or subgroups. A single mean and standard deviation can obscure that structure, so the shape should be described and investigated.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-013",
    "unit": "U1",
    "topicCode": "1.7",
    "skill": "3.B",
    "type": "s",
    "q": "Five delivery times, in minutes, are 18, 20, 21, 21, and 30. What is the mean delivery time?",
    "o": [
      "22 minutes",
      "21 minutes, the median",
      "21.5 minutes, the midpoint of the middle values",
      "30 minutes, the largest observed value"
    ],
    "c": [
      0
    ],
    "e": "The mean is (18 + 20 + 21 + 21 + 30)/5 = 110/5 = 22 minutes. The median is 21 minutes, illustrating the mean's sensitivity to the larger value.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-014",
    "unit": "U1",
    "topicCode": "1.7",
    "skill": "3.B",
    "type": "s",
    "q": "For the ordered data 4, 6, 7, 8, 9, 12, 30, what is the median?",
    "o": [
      "9, the next ordered observation",
      "8",
      "10",
      "12"
    ],
    "c": [
      1
    ],
    "e": "There are seven ordered observations, so the median is the fourth value, 8. The high value 30 affects the mean substantially but does not change which observation occupies the middle rank.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-015",
    "unit": "U1",
    "topicCode": "1.7",
    "skill": "3.B",
    "type": "s",
    "q": "In a boxplot, Q1 = 12, the median = 18, and Q3 = 27. Using the 1.5×IQR rule, which value would be flagged as a high outlier?",
    "o": [
      "35",
      "40",
      "52",
      "Q3 + 1.5(IQR) = 49.5"
    ],
    "c": [
      2
    ],
    "e": "The IQR is 27 − 12 = 15, so the upper fence is 27 + 1.5(15) = 49.5. Of the listed values, only 52 exceeds the upper fence.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-016",
    "unit": "U1",
    "topicCode": "1.8",
    "skill": "4.A",
    "type": "s",
    "q": "A boxplot has minimum 4, Q1=10, median=14, Q3=22, and maximum 30, with no flagged outliers. Which description is supported by the graph?",
    "o": [
      "The middle 50% of observations lies from 10 to 22.",
      "Exactly 50% of the observations must equal the median value 14 because the median divides the ordered data into halves.",
      "The interquartile range is displayed from 4 to 30.",
      "The upper 25% of observations lies from 10 to 14."
    ],
    "c": [
      0
    ],
    "e": "In a boxplot, the box extends from Q1 to Q3 and therefore contains the middle 50% of observations. Here that interval is 10 to 22; the whiskers represent values outside the quartiles.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-017",
    "unit": "U1",
    "topicCode": "1.9",
    "skill": "4.C",
    "type": "s",
    "q": "A runner's time is 68 seconds in a population with mean 72 and standard deviation 2, while a swimmer's time is 55 seconds in a population with mean 60 and standard deviation 4. Which performance is farther below its population mean in standard-deviation units?",
    "o": [
      "The runner, with z = −2 compared with the swimmer's z = −1.25",
      "The swimmer, because 55 is numerically farther from 60 than 68 is from 72",
      "They are equally far below their means because both times are below average",
      "The swimmer, with z = −4/5 compared with the runner's z = −2/72"
    ],
    "c": [
      0
    ],
    "e": "Standardization uses z = (x − μ)/σ. The runner has (68−72)/2 = −2; the swimmer has (55−60)/4 = −1.25. The runner is farther below the relevant mean.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-018",
    "unit": "U1",
    "topicCode": "1.9",
    "skill": "3.B",
    "type": "s",
    "q": "A score of 86 comes from a distribution with mean 74 and standard deviation 8. What is the score’s standardized value?",
    "o": [
      "12, the unstandardized distance above the mean",
      "1.5",
      "0.67",
      "−1.5"
    ],
    "c": [
      1
    ],
    "e": "The standardized value is z=(86−74)/8=12/8=1.5. Thus the score lies 1.5 standard deviations above the population mean; subtracting without dividing would leave the result in raw score units.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-019",
    "unit": "U1",
    "topicCode": "1.10",
    "skill": "1.A",
    "type": "s",
    "q": "A researcher plans to estimate the mean weekly exercise time of adults in a county. Which wording most clearly identifies the population parameter in the investigative question?",
    "o": [
      "What is the mean weekly exercise time, x̄, among the sampled adults?",
      "How many sampled adults exercise at least 150 minutes per week?",
      "What is the mean weekly exercise time, μ, for all adults in the county?",
      "Does every adult in the county exercise the same number of minutes?"
    ],
    "c": [
      2
    ],
    "e": "The target parameter is the population mean μ for all county adults. The sample mean x̄ is a statistic computed after sampling and is not the unknown population quantity being estimated.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-020",
    "unit": "U1",
    "topicCode": "1.10",
    "skill": "1.A",
    "type": "s",
    "q": "A study will compare blood-pressure change for two treatments. Which investigative question most directly states the statistical comparison?",
    "o": [
      "What proportion of patients received Treatment A?",
      "Is the overall mean final blood pressure exactly 120 mm Hg?",
      "Why do clinicians prefer one treatment to the other?",
      "How do distributions of blood-pressure change compare between patients receiving the two treatments?"
    ],
    "c": [
      3
    ],
    "e": "Blood-pressure change is quantitative and treatment is the grouping variable. A comparative investigative question about the two response distributions directly frames the intended analysis; the alternatives concern allocation, a fixed pooled value, or an unmeasured preference.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-021",
    "unit": "U1",
    "topicCode": "1.11",
    "skill": "2.A",
    "type": "s",
    "q": "A university has 8 residence halls. Investigators randomly select 2 halls and survey every resident in those halls. What sampling method is used?",
    "o": [
      "Cluster random sampling",
      "Stratified random sampling",
      "Simple random sampling of individual students",
      "Systematic random sampling"
    ],
    "c": [
      0
    ],
    "e": "The residence halls act as clusters: entire randomly selected groups are surveyed. Stratified sampling would instead sample some individuals from every stratum.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-022",
    "unit": "U1",
    "topicCode": "1.11",
    "skill": "2.B",
    "type": "s",
    "q": "A district wants student opinions represented from elementary, middle, and high schools even though the groups differ greatly in size. Which design best guarantees representation from all three levels?",
    "o": [
      "Randomly choose several schools and survey the students present in those schools.",
      "Take a random sample separately within each school level.",
      "Post an online survey and analyze the first 500 responses.",
      "Select every 50th student from one alphabetized district list without stratifying by level."
    ],
    "c": [
      1
    ],
    "e": "Stratifying by school level and randomly sampling within every level guarantees each level is represented. Cluster, voluntary-response, or unstratified systematic designs do not provide that guarantee.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-023",
    "unit": "U1",
    "topicCode": "1.12",
    "skill": "2.A",
    "type": "s",
    "q": "A news site asks readers to click a link to vote on whether a new tax should pass. Why is the resulting percentage a poor estimate of support among all voters?",
    "o": [
      "The sample is too large for random sampling to work.",
      "The percentage cannot estimate a population proportion because the response is categorical.",
      "Likely voluntary-response bias from systematic differences between responders and other voters",
      "Any online survey automatically has a 50% nonresponse rate."
    ],
    "c": [
      2
    ],
    "e": "Participants self-select into a voluntary-response sample. People with stronger opinions or different online behavior can be overrepresented, producing systematic bias that sample size alone does not remove.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-024",
    "unit": "U1",
    "topicCode": "1.12",
    "skill": "2.A",
    "type": "s",
    "q": "A telephone survey randomly samples registered voters, but only 38% of those contacted complete the interview. Which concern is most relevant?",
    "o": [
      "Undercoverage because no sampled voter had a chance to respond",
      "Response bias caused solely by using a random sample",
      "Sampling variability disappears because fewer people responded",
      "Potential nonresponse bias if respondents and nonrespondents differ in opinion"
    ],
    "c": [
      3
    ],
    "e": "Low response creates potential nonresponse bias when respondents differ systematically from nonrespondents on the variable of interest. Random selection does not eliminate this post-selection problem.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-025",
    "unit": "U1",
    "topicCode": "1.13",
    "skill": "2.B",
    "type": "s",
    "q": "A company tests two package designs. Within each of 20 stores, customers are randomly assigned to see Design A or Design B, and purchase rate is recorded. Why block by store?",
    "o": [
      "Blocking store can reduce variation caused by store-to-store differences.",
      "Blocking makes the customers representative of consumers outside the sampled stores.",
      "Blocking by store is sufficient by itself to establish causation.",
      "Blocking makes random assignment within each store unnecessary."
    ],
    "c": [
      0
    ],
    "e": "Store characteristics can influence the response. Blocking separates that source of variation, while random assignment within each store supports a causal comparison of designs.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-026",
    "unit": "U1",
    "topicCode": "1.13",
    "skill": "2.B",
    "type": "s",
    "q": "In a randomized experiment on a pain treatment, neither participants nor the clinicians evaluating pain know which treatment each participant receives. What is the primary purpose of this double masking?",
    "o": [
      "To make the treatment groups representative of the national population",
      "To reduce bias from expectations of participants and evaluators",
      "To ensure exactly equal sample sizes in the treatment groups",
      "To replace random assignment with a stronger form of control"
    ],
    "c": [
      1
    ],
    "e": "Masking reduces the possibility that expectations influence reported or assessed responses. It does not create population representativeness and does not substitute for random assignment.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u2-001",
    "unit": "U2",
    "topicCode": "2.1",
    "skill": "4.A",
    "type": "s",
    "q": "A two-way table compares pet ownership (yes/no) with housing type (apartment/house). Which comparison best describes whether the two categorical variables are associated?",
    "o": [
      "Compare the conditional pet-ownership percentages within apartment and house residents.",
      "Compare only the two marginal housing percentages.",
      "Compare the grand total with the total number of pet owners.",
      "Compare two raw cell counts without accounting for different housing-group totals."
    ],
    "c": [
      0
    ],
    "e": "Association between two categorical variables is described by comparing conditional distributions across groups. Marginal totals or isolated raw counts do not make the relevant within-group comparison.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u2-002",
    "unit": "U2",
    "topicCode": "2.2",
    "skill": "3.B",
    "type": "s",
    "q": "Among 250 students, 80 of 100 students who participate in a school club report attending the dance, while 75 of 150 students who do not participate in a club attend. What proportion of club participants attended the dance?",
    "o": [
      "80/250 = 0.32, using all surveyed students rather than conditioning on club participation",
      "80/100 = 0.80",
      "155/250 = 0.62",
      "100/250 = 0.40"
    ],
    "c": [
      1
    ],
    "e": "The requested conditional relative frequency uses club participants as the denominator. Of the 100 club participants, 80 attended, so the conditional proportion is 80/100 = 0.80.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u2-003",
    "unit": "U2",
    "topicCode": "2.6",
    "skill": "3.C",
    "type": "s",
    "q": "A school reports that 30% of students take an arts course and 18% both take an arts course and play a school sport. Given that a student takes an arts course, what is the probability the student plays a school sport?",
    "o": [
      "0.18",
      "0.30",
      "0.60",
      "0.48, from adding the arts-course percentage and the joint percentage"
    ],
    "c": [
      2
    ],
    "e": "Conditional probability divides the joint probability by the probability of the condition: P(sport | arts)=P(sport ∩ arts)/P(arts)=0.18/0.30=0.60.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u2-004",
    "unit": "U2",
    "topicCode": "2.1",
    "skill": "4.B",
    "type": "s",
    "q": "In a two-way table, the conditional distribution of preferred payment method is nearly identical for customers under 40 and customers 40 or older. Which conclusion is most appropriate?",
    "o": [
      "Age group causes customers to choose the same payment method.",
      "Little evidence of association between age group and payment preference",
      "The variables are mutually exclusive because their conditional distributions are similar.",
      "The marginal distributions must each be 50%-50%."
    ],
    "c": [
      1
    ],
    "e": "When conditional distributions across groups are similar, the data show little evidence of association. Causation cannot be inferred from a two-way observational summary, and marginal distributions need not be equal.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u2-005",
    "unit": "U2",
    "topicCode": "2.2",
    "skill": "3.B",
    "type": "s",
    "q": "Among 300 survey respondents, 90 are renters and support a proposal, 60 are renters and oppose it, 75 are homeowners and support it, and 75 are homeowners and oppose it. What is the joint relative frequency of being a renter who supports the proposal?",
    "o": [
      "135/300 = 0.45",
      "90/150 = 0.60",
      "0.30",
      "150/300 = 0.50"
    ],
    "c": [
      2
    ],
    "e": "A joint relative frequency uses the grand total: 90/300 = 0.30. Values such as 90/150 = 0.60 are conditional on renter status rather than joint.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u2-006",
    "unit": "U2",
    "topicCode": "2.6",
    "skill": "3.C",
    "type": "s",
    "q": "Suppose P(A ∩ B) = 0.18 and P(B) = 0.30. What is P(A | B)?",
    "o": [
      "0.18(0.30)=0.054",
      "0.30−0.18=0.12",
      "0.30/0.12=2.50",
      "0.60"
    ],
    "c": [
      3
    ],
    "e": "Conditional probability is P(A | B) = P(A ∩ B)/P(B) = 0.18/0.30 = 0.60. Multiplying rather than dividing would answer a different probability question.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u2-007",
    "unit": "U2",
    "topicCode": "2.3",
    "skill": "3.C",
    "type": "s",
    "q": "A simulation uses digits 0–9, with 0–2 representing a defective item and 3–9 representing a nondefective item. Five digits form one simulated shipment. What event should be counted to estimate the probability a shipment has at least two defective items?",
    "o": [
      "Trials in which at least two of the five digits are 0, 1, or 2",
      "Trials in which exactly two digits are 0, 1, or 2",
      "Trials in which the first two digits are both 0, 1, or 2",
      "Trials in which at least two digits are 3 through 9"
    ],
    "c": [
      0
    ],
    "e": "Digits 0–2 model defect with probability 0.3, and a five-digit trial models five items. 'At least two' includes two, three, four, or five defective outcomes, not only exactly two.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u2-008",
    "unit": "U2",
    "topicCode": "2.4",
    "skill": "3.C",
    "type": "s",
    "q": "A fair six-sided die is rolled twice. What is the probability that at least one roll is a 6?",
    "o": [
      "1/6",
      "11/36",
      "1/36",
      "(5/6)^2 = 25/36"
    ],
    "c": [
      1
    ],
    "e": "Use the complement: P(at least one 6) = 1 − P(no 6 on either roll) = 1 − (5/6)^2 = 11/36. The 1/36 value is the probability of two sixes.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u2-009",
    "unit": "U2",
    "topicCode": "2.4",
    "skill": "3.C",
    "type": "s",
    "q": "An event E has probability 0.27. What is the probability that E does not occur?",
    "o": [
      "P(E)=0.27",
      "1−0.63=0.37",
      "0.73",
      "1+0.27=1.27"
    ],
    "c": [
      2
    ],
    "e": "An event and its complement exhaust the sample space, so their probabilities sum to 1. Thus P(Eᶜ) = 1 − 0.27 = 0.73.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u2-010",
    "unit": "U2",
    "topicCode": "2.5",
    "skill": "4.B",
    "type": "s",
    "q": "For events A and B, P(A) = 0.40, P(B) = 0.35, and P(A ∩ B) = 0. Which statement is correct?",
    "o": [
      "A and B are independent.",
      "P(A ∪ B) = 0.14.",
      "A and B must have equal probabilities.",
      "A and B are mutually exclusive."
    ],
    "c": [
      3
    ],
    "e": "Events are mutually exclusive when they cannot occur together, so P(A ∩ B)=0. Because both events have positive probability, independence would require P(A ∩ B)=0.40(0.35)=0.14, not zero.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u2-011",
    "unit": "U2",
    "topicCode": "2.7",
    "skill": "3.C",
    "type": "s",
    "q": "If P(A) = 0.55, P(B) = 0.30, and A and B are mutually exclusive, what is P(A ∪ B)?",
    "o": [
      "0.85",
      "0.55−0.30=0.25",
      "0.55(0.30)=0.165",
      "1.00 because the events are disjoint"
    ],
    "c": [
      0
    ],
    "e": "For mutually exclusive events, the intersection probability is zero. Therefore P(A ∪ B) = P(A)+P(B) = 0.55+0.30 = 0.85.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u2-012",
    "unit": "U2",
    "topicCode": "2.7",
    "skill": "3.C",
    "type": "s",
    "q": "Events A and B are independent with P(A)=0.60 and P(B)=0.25. What is P(A ∩ B)?",
    "o": [
      "0.60+0.25=0.85",
      "0.15",
      "0.60−0.25=0.35",
      "0.60/0.25=2.40"
    ],
    "c": [
      1
    ],
    "e": "For independent events, P(A ∩ B)=P(A)P(B)=0.60(0.25)=0.15. Adding the probabilities would not compute the intersection.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u2-013",
    "unit": "U2",
    "topicCode": "2.7",
    "skill": "3.C",
    "type": "s",
    "q": "Suppose P(A)=0.50, P(B)=0.40, and P(A ∩ B)=0.10. What is P(A ∪ B)?",
    "o": [
      "0.50+0.40=0.90",
      "0.50−0.40+0.10=0.20",
      "0.80",
      "0.50"
    ],
    "c": [
      2
    ],
    "e": "The general addition rule gives P(A ∪ B)=0.50+0.40−0.10=0.80. The intersection must be subtracted because it is included in both marginal probabilities.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u2-014",
    "unit": "U2",
    "topicCode": "2.8",
    "skill": "3.A",
    "type": "s",
    "q": "A random variable X can take values 0, 1, and 2 with probabilities 0.50, 0.30, and 0.20. Which proposed table correctly represents its probability distribution?",
    "o": [
      "x: 0,1,2 with P(X=x): 0.50,0.30,0.20",
      "x: 0,1,2 with P(X=x): 0.50,0.30,0.30",
      "x: 0,1,2 with P(X=x): 0.50,−0.10,0.60",
      "x: 0,1,2 with P(X=x): 1.00,0.30,0.20"
    ],
    "c": [
      0
    ],
    "e": "A valid representation assigns each possible value a probability between 0 and 1 and the probabilities sum to 1. Only 0.50, 0.30, and 0.20 satisfy both requirements.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u2-015",
    "unit": "U2",
    "topicCode": "2.9",
    "skill": "3.B",
    "type": "s",
    "q": "A random variable X takes values 0, 1, 2, and 3 with probabilities 0.50, 0.30, 0.15, and 0.05. What is E(X)?",
    "o": [
      "0.50",
      "0.75",
      "1.00",
      "1.50"
    ],
    "c": [
      1
    ],
    "e": "The expected value is the probability-weighted mean: 0(0.50)+1(0.30)+2(0.15)+3(0.05)=0.75. It represents the long-run average value of X.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u2-016",
    "unit": "U2",
    "topicCode": "2.10",
    "skill": "3.C",
    "type": "s",
    "q": "For X ~ Binomial(n=10, p=0.30), which expression gives P(X=3)?",
    "o": [
      "(0.30)^3(0.70)^7",
      "10(0.30)^3(0.70)^7",
      "C(10,3)(0.30)^3(0.70)^7",
      "C(10,3)(0.30)^7(0.70)^3"
    ],
    "c": [
      2
    ],
    "e": "A binomial probability for exactly three successes is C(10,3)p^3(1−p)^7. The combination factor counts which three of the ten trials are successes.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u2-017",
    "unit": "U2",
    "topicCode": "2.8",
    "skill": "3.A",
    "type": "s",
    "q": "A game pays X = $0, $5, or $20 with probabilities 0.70, 0.25, and 0.05, respectively. Which quantity is a random variable?",
    "o": [
      "The fixed probability 0.70",
      "The list of all three probabilities",
      "The dollar amount X paid on one play",
      "The statement that the game has three outcomes"
    ],
    "c": [
      2
    ],
    "e": "A random variable assigns a numerical value to the outcome of a random process. The payment X varies from play to play according to the stated probability distribution.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u2-018",
    "unit": "U2",
    "topicCode": "2.9",
    "skill": "3.B",
    "type": "s",
    "q": "A random variable X takes values 0, 2, and 5 with probabilities 0.50, 0.30, and 0.20. What is E(X)?",
    "o": [
      "2.0",
      "2.5",
      "0.8",
      "1.6"
    ],
    "c": [
      3
    ],
    "e": "Expected value is the probability-weighted average: E(X)=0(0.50)+2(0.30)+5(0.20)=0+0.6+1.0=1.6. It is a long-run mean and need not be one of the possible single-trial outcomes.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u2-019",
    "unit": "U2",
    "topicCode": "2.10",
    "skill": "3.D",
    "type": "s",
    "q": "For X ~ Binomial(n = 80, p = 0.25), what are the mean and standard deviation of X?",
    "o": [
      "μ = 20 and σ = √15 ≈ 3.87",
      "μ = 20 and σ = √20 ≈ 4.47",
      "μ = 60 and σ = √15 ≈ 3.87",
      "μ = 0.25 and σ = √0.1875 ≈ 0.433"
    ],
    "c": [
      0
    ],
    "e": "For a binomial random variable, μ=np=80(0.25)=20 and σ=√[np(1−p)]=√[80(0.25)(0.75)]=√15≈3.87.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u2-020",
    "unit": "U2",
    "topicCode": "2.11",
    "skill": "3.C",
    "type": "s",
    "q": "Adult heights are approximately normal with mean 170 cm and standard deviation 6 cm. Approximately what proportion lies between 158 cm and 182 cm?",
    "o": [
      "About 68%, the one-standard-deviation empirical-rule value",
      "About 95%",
      "About 99.7%, the three-standard-deviation empirical-rule value",
      "About 50%, because the interval is centered at the mean"
    ],
    "c": [
      1
    ],
    "e": "The interval 158 to 182 is μ ± 2σ because 170 ± 12 = 170 ± 2(6). By the empirical rule, about 95% of a normal distribution lies within two standard deviations.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u2-021",
    "unit": "U2",
    "topicCode": "2.12",
    "skill": "4.C",
    "type": "s",
    "q": "The population distribution is strongly right-skewed with finite mean μ and standard deviation σ. What happens to the sampling distribution of x̄ as the sample size increases substantially?",
    "o": [
      "Its mean increases toward the population maximum and its standard deviation remains σ.",
      "Its mean remains μ but its standard deviation increases as σ√n.",
      "Center μ, decreasing SD σ/√n, and increasingly normal shape",
      "Its shape becomes more right-skewed because averaging preserves every population feature."
    ],
    "c": [
      2
    ],
    "e": "For independent sampling, x̄ is centered at μ with standard deviation σ/√n. The central limit theorem says its distribution becomes approximately normal for sufficiently large n even when the population is skewed.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u2-022",
    "unit": "U2",
    "topicCode": "2.12",
    "skill": "4.C",
    "type": "s",
    "q": "A population has mean 50 and standard deviation 18. Which description correctly compares sampling distributions of x̄ for simple random samples of sizes 16 and 64?",
    "o": [
      "Both are centered at 50, and the n=64 distribution has half the standard deviation of the n=16 distribution.",
      "Both are centered at 50, and the n=64 distribution has twice the standard deviation because it contains four times as many observations.",
      "The n=64 distribution is centered at 64 while the n=16 distribution is centered at 16.",
      "Increasing sample size changes the center from the population mean toward zero."
    ],
    "c": [
      0
    ],
    "e": "Sampling distributions of x̄ are centered at the population mean. Their standard deviation is σ/√n, so increasing n from 16 to 64 doubles √n and halves the sampling-distribution spread.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u2-023",
    "unit": "U2",
    "topicCode": "2.12",
    "skill": "4.C",
    "type": "s",
    "q": "A population is strongly right-skewed. Which statement best describes the shape of the sampling distribution of x̄ as the random-sample size becomes large?",
    "o": [
      "It tends to become approximately normal even though the population is skewed.",
      "It becomes more right-skewed than the population as sample size grows.",
      "It becomes uniform because sample means are averages.",
      "Its shape remains approximately the same as the population shape regardless of larger sample sizes."
    ],
    "c": [
      0
    ],
    "e": "The central limit theorem says that, under appropriate random/independence conditions, the sampling distribution of x̄ becomes approximately normal as sample size grows, even for a skewed population.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u2-024",
    "unit": "U2",
    "topicCode": "2.12",
    "skill": "4.C",
    "type": "s",
    "q": "Two sampling distributions of x̄ come from the same population, one using n=25 and one using n=100. How do their centers and spreads compare?",
    "o": [
      "They have the same center, and the n=100 distribution has half the standard deviation.",
      "They have the same center, and the n=100 distribution has twice the standard deviation because the larger sample contains more individual variation.",
      "The n=100 distribution has twice the center and the same standard deviation.",
      "The n=25 distribution has half the center and one-fourth the standard deviation."
    ],
    "c": [
      0
    ],
    "e": "Both sampling distributions are centered at the population mean. Since SD(x̄)=σ/√n, increasing n from 25 to 100 doubles √n and therefore halves the standard deviation.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-001",
    "unit": "U3",
    "topicCode": "3.1",
    "skill": "3.D",
    "type": "s",
    "q": "Estimator A has sampling-distribution standard deviation 0.030 and Estimator B has standard deviation 0.045. What is the ratio SD(A)/SD(B)?",
    "o": [
      "3/2",
      "0.015",
      "2/3",
      "1.5"
    ],
    "c": [
      2
    ],
    "e": "The requested ratio is 0.030/0.045=30/45=2/3. The smaller sampling-distribution standard deviation indicates less sampling variability, but the calculation itself is simply the ratio of the two reported spreads.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-002",
    "unit": "U3",
    "topicCode": "3.1",
    "skill": "4.B",
    "type": "s",
    "q": "A statistic T has a sampling distribution centered 4 units above the parameter it estimates. What does this indicate?",
    "o": [
      "T is unbiased because its sampling distribution has a fixed center.",
      "T has a standard error of 4 units.",
      "T overestimates the parameter in every possible sample.",
      "T is biased upward by 4 units."
    ],
    "c": [
      3
    ],
    "e": "Bias is the difference between the expected value of an estimator and the parameter. A center 4 units too high indicates upward bias of 4; individual samples may still fall below the parameter.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-003",
    "unit": "U3",
    "topicCode": "3.2",
    "skill": "3.D",
    "type": "s",
    "q": "A population has proportion p = 0.36. For random samples of size n = 100, what are the mean and standard deviation of the sampling distribution of p̂?",
    "o": [
      "Mean 0.36 and SD √[0.36(0.64)/100] = 0.048",
      "Mean 36 and SD 0.048",
      "Mean 0.36 and SD √[0.36(0.64)] = 0.48",
      "Mean 0.64 and SD √[0.36(0.64)/100] = 0.048"
    ],
    "c": [
      0
    ],
    "e": "For a sample proportion, E(p̂)=p and SD(p̂)=√[p(1−p)/n] when the observations are suitably independent. Substitution gives √0.002304 = 0.048.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-004",
    "unit": "U3",
    "topicCode": "3.2",
    "skill": "4.E",
    "type": "s",
    "q": "For a sample of size 40 from a population with p = 0.08, why is a normal model for p̂ questionable?",
    "o": [
      "The sample size exceeds 30, which violates the normal condition for proportions.",
      "np = 3.2 is too small for the usual large-counts condition.",
      "The population proportion is less than 0.5, so p̂ cannot be approximately normal.",
      "The standard error can be computed, so a normal model is automatically valid."
    ],
    "c": [
      1
    ],
    "e": "A normal approximation for p̂ generally requires both np and n(1−p) to be sufficiently large. Here np = 3.2 is small, so the sampling distribution can be strongly skewed.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-005",
    "unit": "U3",
    "topicCode": "3.3",
    "skill": "2.C",
    "type": "s",
    "q": "A random sample of 250 voters contains 145 who support a bond issue. Which procedure is appropriate for estimating the population proportion who support it?",
    "o": [
      "A one-sample t-interval for a population mean",
      "A two-sample z-interval for a difference in proportions",
      "A one-sample z-interval for a population proportion",
      "A chi-square test for independence"
    ],
    "c": [
      2
    ],
    "e": "There is one random sample, one binary response, and the target parameter is a single population proportion. That matches a one-sample z-interval for a proportion.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-006",
    "unit": "U3",
    "topicCode": "3.3",
    "skill": "3.E",
    "type": "s",
    "q": "A sample proportion is p̂ = 0.58 with estimated standard error 0.031. Using z* = 1.96, which 95% confidence interval is closest?",
    "o": [
      "(0.549, 0.611)",
      "(0.500, 0.660)",
      "(0.420, 0.740)",
      "(0.519, 0.641)"
    ],
    "c": [
      3
    ],
    "e": "The margin of error is 1.96(0.031)=0.06076. Thus the interval is 0.58 ± 0.06076, or approximately (0.519, 0.641).",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-007",
    "unit": "U3",
    "topicCode": "3.4",
    "skill": "4.F",
    "type": "s",
    "q": "A 95% confidence interval for the proportion of all customers satisfied with a service is (0.71, 0.79). Which interpretation is correct?",
    "o": [
      "We are 95% confident that 0.71 to 0.79 contains the population satisfaction proportion.",
      "There is a 95% probability that this fixed interval contains the fixed population proportion.",
      "Exactly 95% of customers have satisfaction values between 0.71 and 0.79.",
      "If the survey is repeated, 95% of future sample proportions will lie inside this one interval."
    ],
    "c": [
      0
    ],
    "e": "The confidence procedure has long-run capture rate 95%; after the interval is computed, the parameter is fixed and the interval either contains it or not. The standard contextual wording is '95% confident.'",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-008",
    "unit": "U3",
    "topicCode": "3.4",
    "skill": "4.G",
    "type": "s",
    "q": "A 90% confidence interval for a population proportion is (0.42, 0.49). A manager claims that a majority of the population supports a proposal. What does the interval suggest?",
    "o": [
      "The claim is proved because 0.49 is close to 0.50.",
      "It does not support a majority because the entire interval is below 0.50.",
      "The claim is supported because a 90% interval excludes 0.",
      "No claim can ever be assessed using a confidence interval."
    ],
    "c": [
      1
    ],
    "e": "A majority corresponds to p > 0.50. Because the entire interval is below 0.50, the data are inconsistent with a majority at the confidence level represented by the interval.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-009",
    "unit": "U3",
    "topicCode": "3.5",
    "skill": "2.E",
    "type": "s",
    "q": "A manufacturer claims that fewer than 2% of its batteries fail during the warranty period. Which hypotheses appropriately test the claim?",
    "o": [
      "H₀: p < 0.02 versus Hₐ: p = 0.02",
      "H₀: p̂ = 0.02 versus Hₐ: p̂ < 0.02",
      "H₀: p = 0.02 versus Hₐ: p < 0.02",
      "H₀: p = 0.02 versus Hₐ: p > 0.02"
    ],
    "c": [
      2
    ],
    "e": "Hypotheses are statements about the population parameter p, not the sample statistic p̂. The phrase 'fewer than' determines a left-tailed alternative p < 0.02.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-010",
    "unit": "U3",
    "topicCode": "3.5",
    "skill": "4.E",
    "type": "s",
    "q": "A one-sample z-test for a proportion uses H₀: p = 0.40 with n = 50. Which condition check should use the null value 0.40?",
    "o": [
      "The 10% condition, which becomes 50 < 0.40N",
      "The randomization condition, which requires 40% of subjects be randomly assigned",
      "The significance level, which must equal 0.40",
      "The large-counts check: 50(0.40) and 50(0.60)"
    ],
    "c": [
      3
    ],
    "e": "For a one-proportion significance test, the null model determines the standard error and large-counts check, so np₀ and n(1−p₀) are used. Random sampling and the 10% condition are assessed separately.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-011",
    "unit": "U3",
    "topicCode": "3.6",
    "skill": "4.F",
    "type": "s",
    "q": "A hypothesis test reports p-value = 0.018. Which interpretation is correct?",
    "o": [
      "Assuming H₀, a result at least this extreme in the Hₐ direction has probability 0.018.",
      "The probability that the null hypothesis is true is 0.018.",
      "The probability that the alternative hypothesis is false is 0.018.",
      "Exactly 1.8% of the population contradicts the null hypothesis."
    ],
    "c": [
      0
    ],
    "e": "A p-value is computed under the assumption that H₀ is true. It measures how unusual the observed statistic, or something more extreme in the alternative direction, would be under that null model.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-012",
    "unit": "U3",
    "topicCode": "3.6",
    "skill": "4.F",
    "type": "s",
    "q": "Two studies test the same null and alternative hypotheses. Study A has p-value 0.004 and Study B has p-value 0.08. Which statement is justified?",
    "o": [
      "Study A proves H₀ is false while Study B proves H₀ is true.",
      "Study A provides stronger evidence against H₀ than Study B.",
      "Study B has a larger effect size because its p-value is larger.",
      "The p-values show that Study A's population parameter is 0.004."
    ],
    "c": [
      1
    ],
    "e": "Smaller p-values indicate data less compatible with the null model, so Study A provides stronger evidence against H₀. P-values do not by themselves prove hypotheses or measure effect size.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-013",
    "unit": "U3",
    "topicCode": "3.7",
    "skill": "3.E",
    "type": "s",
    "q": "In a test of H₀: p = 0.50, a sample of n = 200 has p̂ = 0.57. What is the z test statistic?",
    "o": [
      "About 0.14",
      "About 2.80",
      "About 1.98",
      "About 4.04"
    ],
    "c": [
      2
    ],
    "e": "Under H₀, SE = √[0.50(0.50)/200] ≈ 0.03536. Thus z = (0.57−0.50)/0.03536 ≈ 1.98. The positive statistic reflects that the observed sample proportion is above the null value.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-014",
    "unit": "U3",
    "topicCode": "3.7",
    "skill": "3.E",
    "type": "s",
    "q": "For H₀: p=0.30, a sample has p̂=0.36 and null standard error 0.025. What is the z test statistic?",
    "o": [
      "0.06",
      "14.4",
      "1.2",
      "2.4"
    ],
    "c": [
      3
    ],
    "e": "The test statistic is z=(p̂−p₀)/SE₀=(0.36−0.30)/0.025=0.06/0.025=2.4. It measures how many null-model standard errors the observed sample proportion lies above the hypothesized value.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-015",
    "unit": "U3",
    "topicCode": "3.8",
    "skill": "2.D",
    "type": "s",
    "q": "For H₀: p = 0.60 versus Hₐ: p > 0.60, what is a Type I error?",
    "o": [
      "Concluding that p > 0.60 when in fact p = 0.60",
      "Failing to conclude p > 0.60 when in fact p > 0.60",
      "Concluding p = 0.60 after the null hypothesis has been proven",
      "Using a sample proportion different from 0.60"
    ],
    "c": [
      0
    ],
    "e": "A Type I error is rejecting a true null hypothesis. Here that means claiming the population proportion exceeds 0.60 when the null value 0.60 is actually correct.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-016",
    "unit": "U3",
    "topicCode": "3.8",
    "skill": "2.D",
    "type": "s",
    "q": "For a fixed alternative value, which change generally increases the power of a significance test without changing the significance level?",
    "o": [
      "Decrease the sample size.",
      "Increase the sample size.",
      "Make the null and alternative parameter values closer together.",
      "Increase sampling variability while keeping n fixed."
    ],
    "c": [
      1
    ],
    "e": "A larger sample size reduces standard error, making a real departure from H₀ easier to detect. Power also tends to increase for larger effect sizes, while added variability reduces power.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-017",
    "unit": "U3",
    "topicCode": "3.9",
    "skill": "3.D",
    "type": "s",
    "q": "Independent populations have p₁ = 0.40 and p₂ = 0.25. Samples of sizes n₁ = 100 and n₂ = 150 are taken. What is the mean of the sampling distribution of p̂₁ − p̂₂?",
    "o": [
      "0 under an equal-proportions null",
      "(0.40+0.25)/2=0.325",
      "0.15",
      "0.40+0.25=0.65"
    ],
    "c": [
      2
    ],
    "e": "The expected value of a difference in sample proportions is the difference in population proportions: E(p̂₁−p̂₂)=p₁−p₂=0.40−0.25=0.15.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-018",
    "unit": "U3",
    "topicCode": "3.9",
    "skill": "3.D",
    "type": "s",
    "q": "For independent samples, which expression is the standard deviation of p̂₁ − p̂₂ when population proportions p₁ and p₂ are known?",
    "o": [
      "√[(p₁−p₂)(1−p₁+p₂)/(n₁+n₂)]",
      "p₁(1−p₁)/n₁ + p₂(1−p₂)/n₂",
      "√[p₁(1−p₁)/n₁] − √[p₂(1−p₂)/n₂]",
      "√[p₁(1−p₁)/n₁ + p₂(1−p₂)/n₂]"
    ],
    "c": [
      3
    ],
    "e": "For independent sample proportions, variances add when taking a difference. Therefore the variance is the sum of the two component variances and the standard deviation is the square root of that sum.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-019",
    "unit": "U3",
    "topicCode": "3.10",
    "skill": "2.C",
    "type": "s",
    "q": "Two independent random samples estimate the difference p₁ − p₂ between population proportions. Which interval procedure is appropriate?",
    "o": [
      "A two-sample z-interval for p₁ − p₂",
      "A paired t-interval for a mean difference",
      "A one-sample z-interval for a single proportion",
      "A chi-square goodness-of-fit interval"
    ],
    "c": [
      0
    ],
    "e": "The target is the difference between two population proportions based on independent samples, so the appropriate method is a two-sample z-interval for p₁−p₂.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-020",
    "unit": "U3",
    "topicCode": "3.10",
    "skill": "3.E",
    "type": "s",
    "q": "Sample 1 has p̂₁ = 0.62 with n₁ = 200, and Sample 2 has p̂₂ = 0.54 with n₂ = 180. What is the point estimate for p₁ − p₂?",
    "o": [
      "(0.62+0.54)/2=0.58",
      "0.08",
      "0.54−0.62=−0.08",
      "0.62+0.54=1.16"
    ],
    "c": [
      1
    ],
    "e": "The point estimate for a difference in population proportions is the corresponding difference in sample proportions: p̂₁−p̂₂=0.62−0.54=0.08.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-021",
    "unit": "U3",
    "topicCode": "3.11",
    "skill": "4.F",
    "type": "s",
    "q": "A 95% confidence interval for p₁ − p₂ is (0.03, 0.14). Which interpretation is appropriate?",
    "o": [
      "There is a 95% probability that p₁ − p₂ changes from 0.03 to 0.14.",
      "Exactly 95% of individual observations in population 1 exceed those in population 2.",
      "We are 95% confident that p₁ is between 0.03 and 0.14 greater than p₂.",
      "The two population proportions are equal because 0 lies near the interval."
    ],
    "c": [
      2
    ],
    "e": "The interval estimates the fixed population difference p₁−p₂. Because the entire interval is positive, it indicates population 1's proportion is plausibly 0.03 to 0.14 higher than population 2's.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-022",
    "unit": "U3",
    "topicCode": "3.11",
    "skill": "4.G",
    "type": "s",
    "q": "A confidence interval for p₁ − p₂ is (−0.04, 0.09). What does it imply about a claim that the two population proportions differ?",
    "o": [
      "The interval proves the proportions are exactly equal.",
      "The positive endpoint proves p₁ > p₂.",
      "The negative endpoint proves p₁ < p₂.",
      "Including 0 means the interval does not give convincing evidence of a difference."
    ],
    "c": [
      3
    ],
    "e": "A zero difference is among the plausible parameter values in the interval. Thus the interval does not supply convincing evidence of a nonzero difference, although it does not prove equality.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-023",
    "unit": "U3",
    "topicCode": "3.12",
    "skill": "2.E",
    "type": "s",
    "q": "Researchers compare response rates p₁ and p₂ for two populations and suspect p₁ is lower. Which hypotheses are appropriate?",
    "o": [
      "H₀: p₁ − p₂ = 0 versus Hₐ: p₁ − p₂ < 0",
      "H₀: p̂₁ − p̂₂ = 0 versus Hₐ: p̂₁ − p̂₂ < 0",
      "H₀: p₁ − p₂ < 0 versus Hₐ: p₁ − p₂ = 0",
      "H₀: p₁ + p₂ = 0 versus Hₐ: p₁ + p₂ < 0"
    ],
    "c": [
      0
    ],
    "e": "Hypotheses concern population parameters. 'Population 1 is lower' translates to p₁−p₂<0, while the null represents no population difference.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-024",
    "unit": "U3",
    "topicCode": "3.12",
    "skill": "4.E",
    "type": "s",
    "q": "For a two-proportion z-test of H₀: p₁ = p₂, which proportion is used in the standard error of the test statistic?",
    "o": [
      "Each sample proportion separately, exactly as in a confidence interval",
      "The pooled sample proportion because H₀ assumes a common population proportion",
      "The arithmetic mean (p̂₁+p̂₂)/2 regardless of sample sizes",
      "The null difference 0 used as though it were a probability"
    ],
    "c": [
      1
    ],
    "e": "Under H₀ the groups share one common proportion, estimated by pooling successes across both samples. A confidence interval does not impose equality and therefore uses separate sample proportions in its standard error.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-025",
    "unit": "U3",
    "topicCode": "3.13",
    "skill": "3.E",
    "type": "s",
    "q": "Two samples yield x₁=84 of n₁=120 successes and x₂=63 of n₂=110. For testing H₀: p₁=p₂, what pooled proportion should be used?",
    "o": [
      "84/120 = 0.700",
      "63/110 ≈ 0.573",
      "147/230 ≈ 0.639",
      "(0.700+0.573)/2 ≈ 0.636"
    ],
    "c": [
      2
    ],
    "e": "The pooled estimate combines successes and observations under the common-proportion null: (84+63)/(120+110)=147/230≈0.639. An unweighted average of sample proportions is not generally the pooled estimate.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-026",
    "unit": "U3",
    "topicCode": "3.13",
    "skill": "4.G",
    "type": "s",
    "q": "A two-proportion z-test gives z = 2.45 and a two-sided p-value of 0.014. At α = 0.01, what is the appropriate decision?",
    "o": [
      "Reject H₀ because |2.45| is greater than 2.",
      "Reject H₀ because 0.014 < 0.05 even though α = 0.01.",
      "Accept H₀ and conclude the proportions are identical.",
      "Fail to reject H₀ because 0.014 > 0.01."
    ],
    "c": [
      3
    ],
    "e": "The stated decision rule compares the p-value with the chosen significance level. Since 0.014 exceeds 0.01, the result is not significant at 1%, so H₀ is not rejected.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-027",
    "unit": "U3",
    "topicCode": "3.14",
    "skill": "2.C",
    "type": "s",
    "q": "A random sample classifies each person by political affiliation (three categories) and preferred news source (four categories). Which procedure tests whether the two categorical variables are associated in the population?",
    "o": [
      "A chi-square test of independence",
      "A one-proportion z-test",
      "A two-sample t-test",
      "A chi-square goodness-of-fit test"
    ],
    "c": [
      0
    ],
    "e": "With one random sample and two categorical variables recorded on each individual, a chi-square test of independence assesses whether the variables are associated in the population.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-028",
    "unit": "U3",
    "topicCode": "3.14",
    "skill": "2.C",
    "type": "s",
    "q": "Two independent random samples classify people into the same four response categories. Which inference procedure compares the category distributions across the two populations?",
    "o": [
      "A chi-square test of independence for one sample with two variables",
      "A chi-square test for homogeneity",
      "A two-sample t test for population means",
      "A two-proportion z test restricted to two categories"
    ],
    "c": [
      1
    ],
    "e": "With separate random samples from two populations and one categorical response recorded in the same categories, a chi-square test for homogeneity compares the population distributions.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-029",
    "unit": "U3",
    "topicCode": "3.14",
    "skill": "4.E",
    "type": "s",
    "q": "For a chi-square test of independence, a row total is 80, a column total is 45, and the grand total is 200. Which expected count should be used for that cell when checking the expected-count condition?",
    "o": [
      "16",
      "22.5",
      "18",
      "36"
    ],
    "c": [
      2
    ],
    "e": "Under the null model of independence, the expected count is (row total)(column total)/(grand total) = 80(45)/200 = 18. Expected counts, not observed counts, are used when checking whether the chi-square approximation is appropriate.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-030",
    "unit": "U3",
    "topicCode": "3.15",
    "skill": "3.E",
    "type": "s",
    "q": "A chi-square statistic is the sum of which quantities across all cells?",
    "o": [
      "observed − expected",
      "(observed − expected)^2 / observed",
      "expected^2 / observed",
      "(observed − expected)^2 / expected"
    ],
    "c": [
      3
    ],
    "e": "Each cell contributes the squared discrepancy between observed and expected counts divided by the expected count. Summing those nonnegative contributions gives the chi-square statistic.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-031",
    "unit": "U3",
    "topicCode": "3.14",
    "skill": "2.E",
    "type": "s",
    "q": "For a chi-square test of independence between two categorical variables, which null hypothesis is appropriate?",
    "o": [
      "The two categorical variables are independent in the population.",
      "The sample counts are equal across the cells of the table.",
      "The two variables have a linear correlation of zero.",
      "Each category has the same population proportion."
    ],
    "c": [
      0
    ],
    "e": "A chi-square test of independence begins with the population-level claim that the two categorical variables are independent; the alternative states that they are associated.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u3-032",
    "unit": "U3",
    "topicCode": "3.8",
    "skill": "4.D",
    "type": "s",
    "q": "In a chi-square test of independence, what would a Type I error mean?",
    "o": [
      "Concluding the variables are independent when they are actually associated.",
      "Concluding the variables are associated when they are actually independent.",
      "Computing an expected count that differs from its observed count.",
      "Using a sample size that is larger than necessary."
    ],
    "c": [
      1
    ],
    "e": "A Type I error is rejecting a true null hypothesis. Here the null states independence, so the error is claiming an association that does not actually exist in the population.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u4-001",
    "unit": "U4",
    "topicCode": "4.9",
    "skill": "2.C",
    "type": "s",
    "q": "Two independent random samples provide quantitative outcomes and the population standard deviations are unknown. Which test compares the population means?",
    "o": [
      "A paired t test on matched differences",
      "A two-proportion z test",
      "A two-sample t test for μ₁−μ₂",
      "A chi-square test for homogeneity"
    ],
    "c": [
      2
    ],
    "e": "Independent quantitative samples with unknown population standard deviations call for a two-sample t procedure when comparing the two population means.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u4-002",
    "unit": "U4",
    "topicCode": "4.1",
    "skill": "3.D",
    "type": "s",
    "q": "A population has mean 64 and standard deviation 15. For random samples of size 25, what are the mean and standard deviation of the sampling distribution of x̄?",
    "o": [
      "Mean 64 and standard deviation 15",
      "Mean 25 and standard deviation 3",
      "Mean 64 and standard deviation 0.6",
      "Mean 64 and standard deviation 3"
    ],
    "c": [
      3
    ],
    "e": "The sampling distribution of x̄ is centered at the population mean, 64, and its standard deviation is σ/√n = 15/5 = 3. Sampling changes the variability of the mean but not its expected center.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u4-003",
    "unit": "U4",
    "topicCode": "4.2",
    "skill": "2.C",
    "type": "s",
    "q": "Which procedure is appropriate for estimating a population mean when σ is unknown and observations come from one random sample?",
    "o": [
      "A one-sample t interval for μ",
      "A one-proportion z interval",
      "A paired t test",
      "A chi-square test of independence"
    ],
    "c": [
      0
    ],
    "e": "A single quantitative sample with unknown population standard deviation calls for a one-sample t interval, provided independence and shape/sample-size conditions are reasonable.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u4-004",
    "unit": "U4",
    "topicCode": "4.10",
    "skill": "4.G",
    "type": "s",
    "q": "A two-sample t test gives p = 0.008 for H₀: μ₁−μ₂=0 versus a two-sided alternative. At α=0.05, which conclusion is justified?",
    "o": [
      "Fail to reject H₀ because 0.008 is less than the null difference 0.",
      "Reject H₀; the data provide convincing evidence that the population means differ.",
      "Accept H₀ and conclude the population means are exactly equal.",
      "Reject H₀ and conclude every observation in population 1 differs from every observation in population 2."
    ],
    "c": [
      1
    ],
    "e": "Because 0.008 is below the significance level 0.05, the null hypothesis is rejected. The conclusion is evidence of a difference between population means; a significance test neither proves exact equality nor makes claims about every individual observation.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u4-005",
    "unit": "U4",
    "topicCode": "4.2",
    "skill": "4.C",
    "type": "s",
    "q": "Compared with a t distribution having 8 degrees of freedom, how does a t distribution with 40 degrees of freedom differ?",
    "o": [
      "It has heavier tails and a larger spread because the degrees of freedom are larger.",
      "It becomes left-skewed while the 8-degree distribution is symmetric.",
      "It has lighter tails and is closer to the standard normal distribution.",
      "It has a different mean because the degrees of freedom determine the center."
    ],
    "c": [
      2
    ],
    "e": "All t distributions are symmetric and centered at 0. As degrees of freedom increase, their tails become lighter and the distribution approaches the standard normal distribution; the center does not shift and the shape does not become skewed.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u4-006",
    "unit": "U4",
    "topicCode": "4.3",
    "skill": "2.D",
    "type": "s",
    "q": "A researcher is planning a confidence interval for a population mean and wants the interval to be more precise at the same confidence level. Which design change helps?",
    "o": [
      "Decrease the random-sample size.",
      "Collect measurements with greater variability if possible.",
      "Replace quantitative measurements with category labels.",
      "Increase the random-sample size."
    ],
    "c": [
      3
    ],
    "e": "Increasing the sample size reduces the standard error of the sample mean, which reduces the margin of error and gives a more precise confidence interval at the same confidence level.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u4-007",
    "unit": "U4",
    "topicCode": "4.4",
    "skill": "2.E",
    "type": "s",
    "q": "A company claims the mean fill volume is 500 mL. An auditor suspects underfilling. Which hypotheses are appropriate?",
    "o": [
      "H0: μ=500 versus Ha: μ<500",
      "H0: x̄=500 versus Ha: x̄<500",
      "H0: μ<500 versus Ha: μ=500",
      "H0: μ=500 versus Ha: μ≠500"
    ],
    "c": [
      0
    ],
    "e": "Hypotheses are about the population mean μ. Because the auditor specifically suspects underfilling, the alternative is μ<500 and the null uses equality at the claimed value.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u4-008",
    "unit": "U4",
    "topicCode": "4.4",
    "skill": "4.E",
    "type": "s",
    "q": "A one-sample t test for a population mean is planned from a random sample of n=12. The sample data are strongly skewed with two extreme outliers. Which statement best assesses the method?",
    "o": [
      "The t test is questionable because a small sample with severe skewness and outliers does not satisfy the sample-data condition.",
      "The t test is automatically valid whenever observations come from a random sample, even when a small sample contains severe skewness and extreme outliers.",
      "The t test is invalid because the population standard deviation is unknown.",
      "The t test requires the sample mean to equal the null mean before testing."
    ],
    "c": [
      0
    ],
    "e": "For a small sample, a one-sample t procedure requires data without strong skewness or outliers. Random sampling addresses randomization, but it does not repair a severe small-sample shape problem.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u4-009",
    "unit": "U4",
    "topicCode": "4.5",
    "skill": "3.E",
    "type": "s",
    "q": "A sample gives x̄=53, s=8, n=16 for testing H0: μ=50. What is the t statistic?",
    "o": [
      "0.375",
      "3.0",
      "1.5",
      "6.0"
    ],
    "c": [
      2
    ],
    "e": "The standard error is 8/√16=2. The test statistic is (53−50)/2=1.5, measuring the observed mean 1.5 standard errors above the null value.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u4-010",
    "unit": "U4",
    "topicCode": "4.5",
    "skill": "4.F",
    "type": "s",
    "q": "A one-sample t test for H₀: μ=50 versus Hₐ: μ>50 gives p=0.21. Which interpretation of the test result is appropriate?",
    "o": [
      "The null hypothesis has a 21% probability of being true.",
      "Exactly 21% of population values exceed 50.",
      "The population mean is proven to equal 50 because the result is not significant.",
      "The sample does not provide convincing evidence that the population mean exceeds 50."
    ],
    "c": [
      3
    ],
    "e": "A p-value of 0.21 is not small relative to common significance levels, so the data are not sufficiently inconsistent with H₀ to provide convincing evidence for μ>50. The p-value is not a probability that H₀ is true and failure to reject does not prove equality.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u4-011",
    "unit": "U4",
    "topicCode": "4.6",
    "skill": "3.D",
    "type": "s",
    "q": "Two independent sample means have standard errors based on s1=10,n1=25 and s2=12,n2=36. What is the estimated standard error of x̄1−x̄2?",
    "o": [
      "√8 ≈ 2.83",
      "√2 ≈ 1.41",
      "22/61 ≈ 0.36",
      "8"
    ],
    "c": [
      0
    ],
    "e": "For independent samples, estimated variances add: 10^2/25 + 12^2/36 = 4+4=8, giving standard error √8≈2.83.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u4-012",
    "unit": "U4",
    "topicCode": "4.6",
    "skill": "4.E",
    "type": "s",
    "q": "Two independent samples of sizes 18 and 22 are used to study x̄₁−x̄₂. Both sample distributions are strongly skewed and contain extreme outliers. Why is a normal model for the sampling distribution questionable?",
    "o": [
      "The two sample sizes are unequal, which by itself invalidates the model.",
      "Both samples are small and their data show strong skewness and outliers.",
      "The population means are unknown, which prevents use of a sampling distribution.",
      "Independent samples require the two sample standard deviations to be exactly equal."
    ],
    "c": [
      1
    ],
    "e": "When both samples are below about 30, strong skewness and extreme outliers make a normal approximation for the difference in sample means questionable. Unequal sample sizes, unknown means, and unequal standard deviations do not by themselves invalidate the sampling-distribution framework.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u4-013",
    "unit": "U4",
    "topicCode": "4.7",
    "skill": "2.C",
    "type": "s",
    "q": "Which procedure estimates μ1−μ2 from two independent random samples when both population standard deviations are unknown?",
    "o": [
      "A paired t interval",
      "A two-proportion z interval",
      "A two-sample t interval for μ1−μ2",
      "A chi-square interval"
    ],
    "c": [
      2
    ],
    "e": "Two independent quantitative samples with unknown population standard deviations call for a two-sample t interval. A paired procedure would instead analyze within-pair differences.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u4-014",
    "unit": "U4",
    "topicCode": "4.7",
    "skill": "3.E",
    "type": "s",
    "q": "A 95% confidence interval for μ1−μ2 is reported as (1.4,6.6). What is the point estimate?",
    "o": [
      "2.6",
      "5.2",
      "8.0",
      "4.0"
    ],
    "c": [
      3
    ],
    "e": "A standard confidence interval is symmetric around its point estimate. The midpoint is (1.4+6.6)/2=4.0, which estimates μ1−μ2.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u4-015",
    "unit": "U4",
    "topicCode": "4.2",
    "skill": "2.C",
    "type": "s",
    "q": "The same patients have blood pressure measured before and after treatment. Which procedure is appropriate for constructing a confidence interval for the population mean change?",
    "o": [
      "Use a one-sample t interval on the within-patient differences.",
      "Treat all before values and all after values as independent samples.",
      "Use a two-proportion z interval after classifying each blood pressure as high or low.",
      "Use a chi-square interval based on the paired measurements."
    ],
    "c": [
      0
    ],
    "e": "Before and after measurements on the same patient are paired. Subtracting within each patient produces one sample of differences, so a one-sample t interval for the population mean difference is appropriate.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u4-016",
    "unit": "U4",
    "topicCode": "4.8",
    "skill": "4.F",
    "type": "s",
    "q": "A 95% confidence interval for μ₁−μ₂ is (−1.8, 4.6). Which interpretation is appropriate?",
    "o": [
      "There is a 95% probability that the fixed parameter μ₁−μ₂ moves between −1.8 and 4.6.",
      "We are 95% confident that the interval from −1.8 to 4.6 contains the population mean difference μ₁−μ₂.",
      "Exactly 95% of observations from population 1 are between 1.8 below and 4.6 above observations from population 2.",
      "Because 0 is in the interval, the two population means are proven exactly equal."
    ],
    "c": [
      1
    ],
    "e": "The interval estimates the fixed population difference μ₁−μ₂ using a method with 95% long-run coverage. It does not assign a probability to the fixed parameter, describe 95% of individual observations, or prove equality merely because 0 is plausible.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u4-017",
    "unit": "U4",
    "topicCode": "4.9",
    "skill": "2.E",
    "type": "s",
    "q": "Researchers suspect a new treatment lowers mean recovery time relative to standard care. Which alternative hypothesis matches μnew−μstandard?",
    "o": [
      "Ha: μnew−μstandard>0",
      "Ha: μnew−μstandard=0",
      "Ha: μnew−μstandard<0",
      "Ha: x̄new−x̄standard<0"
    ],
    "c": [
      2
    ],
    "e": "A lower mean for the new treatment corresponds to μnew<μstandard, or equivalently μnew−μstandard<0. Hypotheses concern population means, not sample means.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u4-018",
    "unit": "U4",
    "topicCode": "4.9",
    "skill": "4.E",
    "type": "s",
    "q": "Two groups were formed by random assignment of 20 subjects to each treatment. Their quantitative responses show no extreme outliers. What supports use of a two-sample t test?",
    "o": [
      "Knowing both population standard deviations exactly",
      "Having categorical rather than quantitative responses",
      "Forcing both sample means to be equal under H0",
      "Independent randomized groups and reasonably well-behaved sample distributions"
    ],
    "c": [
      3
    ],
    "e": "Random assignment supports independence between treatment groups, and the absence of extreme outliers helps justify t procedures at these sample sizes. Population standard deviations need not be known.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u4-019",
    "unit": "U4",
    "topicCode": "4.10",
    "skill": "3.E",
    "type": "s",
    "q": "For testing H0: μ1−μ2=0, the observed difference is 6 and its estimated standard error is 2. What is the t statistic?",
    "o": [
      "3",
      "12",
      "0.33",
      "8"
    ],
    "c": [
      0
    ],
    "e": "The test statistic standardizes the observed difference relative to the null difference: (6−0)/2=3. Thus the sample difference is three estimated standard errors from the null.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u4-020",
    "unit": "U4",
    "topicCode": "4.10",
    "skill": "4.G",
    "type": "s",
    "q": "A two-sample t test produces a very small p-value, but the study used volunteers rather than random sampling. Which conclusion is safest?",
    "o": [
      "The small p-value automatically makes the sample representative.",
      "There is evidence of a difference for the studied groups, but generalization to a broader population is limited.",
      "The result proves the treatment caused the difference in every population.",
      "Volunteer sampling has no effect on scope of inference."
    ],
    "c": [
      1
    ],
    "e": "A small p-value addresses evidence against the null under the model, but nonrandom sampling limits how broadly results can be generalized. Scope of inference depends on study design as well as significance.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u4-021",
    "unit": "U4",
    "topicCode": "4.3",
    "skill": "2.D",
    "type": "s",
    "q": "Holding confidence level and sample variability fixed, what happens to the margin of error for a mean when sample size is quadrupled?",
    "o": [
      "It doubles.",
      "It is unchanged.",
      "It is cut in half.",
      "It is divided by four."
    ],
    "c": [
      2
    ],
    "e": "Standard error for a mean is proportional to 1/√n. Quadrupling n doubles √n, so the standard error and hence the margin of error are halved.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u4-022",
    "unit": "U4",
    "topicCode": "4.4",
    "skill": "4.E",
    "type": "s",
    "q": "A one-sample t test for a population mean uses n=18 observations. The sample distribution is strongly right-skewed with two extreme outliers. Which condition is the main concern?",
    "o": [
      "A known population standard deviation is required before using this procedure.",
      "The response is categorical rather than quantitative.",
      "The sample mean is constrained to equal the null mean before carrying out the test.",
      "With a small sample, the severe skewness and outliers make the t-model condition questionable."
    ],
    "c": [
      3
    ],
    "e": "For a small sample, a t procedure is sensitive to strong skewness and extreme outliers. Unknown population standard deviation is expected in a t procedure, the response should be quantitative, and the sample mean need not equal the null value.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u4-023",
    "unit": "U4",
    "topicCode": "4.5",
    "skill": "3.E",
    "type": "s",
    "q": "For testing H₀: μ=40, a sample has x̄=43 and estimated standard error 1.2. What is the t statistic?",
    "o": [
      "2.5",
      "3.6",
      "0.4",
      "35.8"
    ],
    "c": [
      0
    ],
    "e": "The t statistic is (x̄−μ₀)/SE=(43−40)/1.2=3/1.2=2.5. Standardizing by the estimated standard error expresses the sample-mean departure from the null value in t-statistic units.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u4-024",
    "unit": "U4",
    "topicCode": "4.2",
    "skill": "2.C",
    "type": "s",
    "q": "Measurements are taken before and after an intervention on the same 24 people. Which confidence-interval procedure respects the paired design?",
    "o": [
      "A two-sample t interval treating before and after as independent",
      "A one-sample t interval applied to the 24 within-person differences",
      "A chi-square interval because there are two measurement occasions",
      "A one-proportion z interval for the proportion whose value decreased"
    ],
    "c": [
      1
    ],
    "e": "Each person supplies a matched pair. The appropriate confidence interval is a one-sample t interval applied to the within-person differences, preserving the dependence between the two measurements.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u4-025",
    "unit": "U4",
    "topicCode": "4.7",
    "skill": "3.E",
    "type": "s",
    "q": "A two-sample mean estimate is x̄₁−x̄₂=5.0 with estimated standard error 2.0. Using t*=2.10, what confidence interval results?",
    "o": [
      "(2.9, 7.1)",
      "(1.0, 9.0)",
      "(0.8, 9.2)",
      "(−4.2, 14.2)"
    ],
    "c": [
      2
    ],
    "e": "The margin of error is t*SE=2.10(2.0)=4.2. Centering that margin at the estimate 5.0 gives 5.0±4.2, or (0.8,9.2). The critical value is multiplied by the standard error, not added to it.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u5-001",
    "unit": "U5",
    "topicCode": "5.3",
    "skill": "3.B",
    "type": "s",
    "q": "A least-squares line is ŷ=20+1.5x. What response is predicted when x=4?",
    "o": [
      "21.5",
      "6",
      "80",
      "26"
    ],
    "c": [
      3
    ],
    "e": "Substituting x=4 gives ŷ=20+1.5(4)=26. The fitted value is the model prediction for the response at that explanatory-variable value.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u5-002",
    "unit": "U5",
    "topicCode": "5.4",
    "skill": "3.B",
    "type": "s",
    "q": "A model predicts y=42 for an observation whose actual value is 37. What is the residual?",
    "o": [
      "−5",
      "5",
      "79",
      "0.88"
    ],
    "c": [
      0
    ],
    "e": "Residual equals observed minus predicted, so 37−42=−5. A negative residual means the observed response lies below the fitted regression line.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u5-003",
    "unit": "U5",
    "topicCode": "5.5",
    "skill": "3.B",
    "type": "s",
    "q": "If sx=4, sy=10, and r=0.60, what is the least-squares slope?",
    "o": [
      "0.24",
      "1.5",
      "6.0",
      "4.0"
    ],
    "c": [
      1
    ],
    "e": "For simple linear regression, b1=r(sy/sx)=0.60(10/4)=1.5. The slope combines the standardized association with the scales of y and x.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u5-004",
    "unit": "U5",
    "topicCode": "5.5",
    "skill": "3.B",
    "type": "s",
    "q": "A least-squares line has slope 1.5 and passes through (x̄,ȳ)=(4,26). What is its intercept?",
    "o": [
      "32",
      "22",
      "20",
      "5.5"
    ],
    "c": [
      2
    ],
    "e": "The least-squares line passes through (x̄,ȳ). Using 26=b0+1.5(4) gives b0=20. This result follows from the least-squares model and the definitions of fitted values, residuals, and regression summaries.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u5-005",
    "unit": "U5",
    "topicCode": "5.3",
    "skill": "3.B",
    "type": "s",
    "q": "Why is predicting at x=45 risky when the observed x-values range only from 2 to 14?",
    "o": [
      "Regression predictions are invalid whenever x is positive.",
      "The least-squares line cannot be evaluated numerically at x=45.",
      "A large x-value automatically makes the residual zero.",
      "It is extrapolation far beyond the observed data range."
    ],
    "c": [
      3
    ],
    "e": "A fitted relationship is supported by the range of x-values actually observed. Extending it far beyond that range assumes the same pattern continues, an assumption that may be unjustified.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u2-025",
    "unit": "U2",
    "topicCode": "2.2",
    "skill": "3.B",
    "type": "s",
    "q": "Using the commuter table, what is P(public transit)?",
    "o": [
      "116/400 = 0.29",
      "72/400 = 0.18",
      "116/284 ≈ 0.408",
      "284/400 = 0.71"
    ],
    "c": [
      0
    ],
    "e": "The marginal total for public transit is 116 out of 400 commuters, so the unconditional probability is 116/400=0.29.",
    "statsSetType": "probability",
    "stimulusGroupId": "apstats-prob-set-1",
    "__stimulusIndex": 0
  },
  {
    "id": "apstats-u2-026",
    "unit": "U2",
    "topicCode": "2.2",
    "skill": "4.A",
    "type": "s",
    "q": "Using the commuter table, compare public-transit use for trips before 7:00 a.m. with trips at 7:00 a.m. or later.",
    "o": [
      "Both groups have the same conditional proportion, 0.29.",
      "The earlier group has the higher conditional proportion: 72/180=0.40 versus 44/220=0.20.",
      "The later group is higher because 176 exceeds 108.",
      "The comparison cannot be made from a two-way table."
    ],
    "c": [
      1
    ],
    "e": "Conditional proportions compare within each departure-time group. Public transit is 72/180=0.40 before 7 and 44/220=0.20 later, so the earlier group has the higher rate.",
    "statsSetType": "probability",
    "stimulusGroupId": "apstats-prob-set-1",
    "__stimulusIndex": 0
  },
  {
    "id": "apstats-u2-027",
    "unit": "U2",
    "topicCode": "2.6",
    "skill": "3.C",
    "type": "s",
    "q": "Using the commuter table, what is P(before 7:00 a.m. | public transit)?",
    "o": [
      "72/180 = 0.400",
      "116/400 = 0.290",
      "72/116 ≈ 0.621",
      "180/400 = 0.450"
    ],
    "c": [
      2
    ],
    "e": "Conditioning on public transit restricts the denominator to the 116 public-transit commuters. Of those, 72 traveled before 7, giving 72/116≈0.621.",
    "statsSetType": "probability",
    "stimulusGroupId": "apstats-prob-set-1",
    "__stimulusIndex": 0
  },
  {
    "id": "apstats-u5-006",
    "unit": "U5",
    "topicCode": "5.1",
    "skill": "4.A",
    "type": "s",
    "q": "Using the delivery data, which description best summarizes the association between distance and time?",
    "o": [
      "A strong negative curved association",
      "No visible association",
      "A perfect horizontal relationship",
      "A very strong positive roughly linear association"
    ],
    "c": [
      3
    ],
    "e": "As distance increases, delivery time also increases and the points lie close to an upward-sloping line, indicating a very strong positive approximately linear relationship.",
    "statsSetType": "regression",
    "stimulusGroupId": "apstats-reg-set-1",
    "__stimulusIndex": 1
  },
  {
    "id": "apstats-u5-007",
    "unit": "U5",
    "topicCode": "5.5",
    "skill": "4.D",
    "type": "s",
    "q": "For the delivery data, software gives r≈0.996. What is the best interpretation of r²?",
    "o": [
      "About 99.1% of the variability in delivery time is explained by its linear relationship with distance.",
      "About 99.6% of deliveries take the same amount of time.",
      "Distance causes 99.1% of delivery time.",
      "The regression slope is approximately 0.991."
    ],
    "c": [
      0
    ],
    "e": "Squaring r gives about 0.991. In simple linear regression, r² is the proportion of response variation accounted for by the fitted linear relationship with the explanatory variable.",
    "statsSetType": "regression",
    "stimulusGroupId": "apstats-reg-set-1",
    "__stimulusIndex": 1
  },
  {
    "id": "apstats-u5-008",
    "unit": "U5",
    "topicCode": "5.3",
    "skill": "3.B",
    "type": "s",
    "q": "For the delivery data, the least-squares line is ŷ=13.10+2.649x. What is the predicted time for a 9-mile delivery?",
    "o": [
      "About 23.8 minutes",
      "About 36.9 minutes",
      "About 49.0 minutes",
      "About 11.8 minutes"
    ],
    "c": [
      1
    ],
    "e": "Substituting x=9 gives ŷ=13.10+2.649(9)=36.941, so the predicted delivery time is about 36.9 minutes.",
    "statsSetType": "regression",
    "stimulusGroupId": "apstats-reg-set-1",
    "__stimulusIndex": 1
  },
  {
    "id": "apstats-u5-009",
    "unit": "U5",
    "topicCode": "5.4",
    "skill": "3.B",
    "type": "s",
    "q": "A regression model predicts 112 kg for a tree whose observed mass is 104 kg. What is the residual?",
    "o": [
      "8 kg",
      "216 kg",
      "−8 kg",
      "0.93 kg"
    ],
    "c": [
      2
    ],
    "e": "A residual is observed minus predicted, so 104−112=−8 kg. The negative sign indicates the observed response lies below its fitted value; reversing the subtraction would give the wrong sign.",
    "statsSetType": "regression",
    "stimulusGroupId": "apstats-reg-set-2",
    "__stimulusIndex": 2
  },
  {
    "id": "apstats-u5-010",
    "unit": "U5",
    "topicCode": "5.5",
    "skill": "4.D",
    "type": "s",
    "q": "Regression software reports r²=0.886 for predicting tree mass from diameter. What does this mean?",
    "o": [
      "Diameter explains exactly 88.6 kg of mass.",
      "The correlation must equal 0.886.",
      "The slope is 88.6% per centimeter.",
      "About 88.6% of the sample variation in tree mass is explained by the fitted linear relationship with diameter."
    ],
    "c": [
      3
    ],
    "e": "The coefficient of determination is a proportion of response variation explained by the fitted linear model. It is not a slope, a response amount, or the correlation itself.",
    "statsSetType": "regression",
    "stimulusGroupId": "apstats-reg-set-2",
    "__stimulusIndex": 2
  },
  {
    "id": "apstats-u2-028",
    "unit": "U2",
    "topicCode": "2.8",
    "skill": "3.A",
    "type": "s",
    "q": "Which bar graph description correctly represents the device-failure probability distribution?",
    "o": [
      "Bars at x=0,1,2,3 with heights 0.50,0.30,0.15,0.05",
      "Bars at x=0,1,2,3 with heights 0.05,0.15,0.30,0.50",
      "Four equal-height bars of 0.25",
      "A continuous histogram with density extending beyond x=3"
    ],
    "c": [
      0
    ],
    "e": "A discrete probability distribution is represented with separate bars at its possible values, with each bar height equal to that value’s probability. The table gives heights 0.50, 0.30, 0.15, and 0.05.",
    "statsSetType": "probability",
    "stimulusGroupId": "apstats-prob-set-2",
    "__stimulusIndex": 3
  },
  {
    "id": "apstats-u2-029",
    "unit": "U2",
    "topicCode": "2.9",
    "skill": "3.B",
    "type": "s",
    "q": "Using the device-failure distribution, what is E(X)?",
    "o": [
      "0.50",
      "0.75",
      "1.50",
      "2.00"
    ],
    "c": [
      1
    ],
    "e": "The expected value is the probability-weighted average: 0(0.50)+1(0.30)+2(0.15)+3(0.05)=0.75 failures.",
    "statsSetType": "probability",
    "stimulusGroupId": "apstats-prob-set-2",
    "__stimulusIndex": 3
  },
  {
    "id": "apstats-u2-030",
    "unit": "U2",
    "topicCode": "2.6",
    "skill": "3.C",
    "type": "s",
    "q": "Given that at least one device fails, what is P(X=2)?",
    "o": [
      "0.15",
      "0.20",
      "0.30",
      "0.50"
    ],
    "c": [
      2
    ],
    "e": "Conditioning on at least one failure restricts the sample space to X=1,2,3, whose total probability is 0.50. Therefore P(X=2 | X≥1)=0.15/0.50=0.30; using 0.15 would ignore the conditioning.",
    "statsSetType": "probability",
    "stimulusGroupId": "apstats-prob-set-2",
    "__stimulusIndex": 3
  },
  {
    "id": "apstats-u2-031",
    "unit": "U2",
    "topicCode": "2.12",
    "skill": "4.C",
    "type": "s",
    "q": "Which simulated sampling distribution has the smallest standard deviation?",
    "o": [
      "The distribution for n=4",
      "The distribution for n=16",
      "All three have the same standard deviation",
      "The distribution for n=64"
    ],
    "c": [
      3
    ],
    "e": "The simulation reports standard deviations 9, 4.5, and 2.25 for n=4,16,64 respectively, so the largest sample size has the smallest sampling variability.",
    "statsSetType": "probability",
    "stimulusGroupId": "apstats-prob-set-3",
    "__stimulusIndex": 4
  },
  {
    "id": "apstats-u2-032",
    "unit": "U2",
    "topicCode": "2.12",
    "skill": "4.C",
    "type": "s",
    "q": "Which simulated sampling distribution is closest to normal in shape?",
    "o": [
      "The distribution for n=64",
      "The distribution for n=4",
      "The distribution for n=16 only because its mean is 50",
      "None can approach normal from a skewed population"
    ],
    "c": [
      0
    ],
    "e": "As sample size grows, the central limit theorem makes the sampling distribution of the sample mean more nearly normal; the n=64 simulation is described as approximately normal.",
    "statsSetType": "probability",
    "stimulusGroupId": "apstats-prob-set-3",
    "__stimulusIndex": 4
  },
  {
    "id": "apstats-u2-033",
    "unit": "U2",
    "topicCode": "2.12",
    "skill": "4.C",
    "type": "s",
    "q": "Across the three simulations, what value is the sampling distribution of x̄ centered near?",
    "o": [
      "2.25",
      "50",
      "18",
      "64"
    ],
    "c": [
      1
    ],
    "e": "The sample mean is an unbiased estimator of the population mean, so each simulated sampling distribution is centered near μ=50 despite differing sample sizes.",
    "statsSetType": "probability",
    "stimulusGroupId": "apstats-prob-set-3",
    "__stimulusIndex": 4
  },
  {
    "id": "apstats-u5-011",
    "unit": "U5",
    "topicCode": "5.5",
    "skill": "4.D",
    "type": "s",
    "q": "Regression output gives a diameter coefficient of 4.72. How should that slope be interpreted?",
    "o": [
      "Predicted diameter rises 4.72 cm per kilogram of mass.",
      "The correlation between diameter and mass equals 4.72.",
      "Predicted mass rises about 4.72 kg per additional centimeter of diameter.",
      "A tree with zero diameter has predicted mass 4.72 kg."
    ],
    "c": [
      2
    ],
    "e": "The diameter coefficient is the fitted slope, so it gives the change in predicted response, measured in kilograms, for each one-centimeter increase in diameter.",
    "statsSetType": "regression",
    "stimulusGroupId": "apstats-reg-set-2",
    "__stimulusIndex": 2
  },
  {
    "id": "apstats-u5-012",
    "unit": "U5",
    "topicCode": "5.1",
    "skill": "4.A",
    "type": "s",
    "q": "Using the scatterplot, which description best fits the overall pattern?",
    "o": [
      "Strong negative, roughly linear association",
      "No association between the variables",
      "Perfect positive association with no unusual point",
      "Strong positive, roughly linear association"
    ],
    "c": [
      3
    ],
    "e": "Most points follow an upward, approximately linear pattern, although one point near nine study hours has an unusually low quiz score.",
    "statsSetType": "regression",
    "stimulusGroupId": "apstats-reg-set-3",
    "__stimulusIndex": 5
  },
  {
    "id": "apstats-u5-013",
    "unit": "U5",
    "topicCode": "5.2",
    "skill": "4.D",
    "type": "s",
    "q": "What effect does the unusually low point near nine study hours most likely have on correlation?",
    "o": [
      "It weakens the positive correlation.",
      "It makes the correlation exactly 1.",
      "It changes a positive association to a negative one.",
      "It has no possible effect on correlation."
    ],
    "c": [
      0
    ],
    "e": "The point lies well below the prevailing positive linear pattern, increasing scatter around a line and therefore reducing the magnitude of the positive correlation.",
    "statsSetType": "regression",
    "stimulusGroupId": "apstats-reg-set-3",
    "__stimulusIndex": 5
  },
  {
    "id": "apstats-u5-014",
    "unit": "U5",
    "topicCode": "5.4",
    "skill": "3.B",
    "type": "s",
    "q": "Relative to a fitted line through the main pattern, what sign would the residual of the unusually low point have?",
    "o": [
      "Positive",
      "Negative",
      "Zero",
      "Undefined"
    ],
    "c": [
      1
    ],
    "e": "A residual is observed minus predicted. The unusual point lies below the fitted line, so its observed quiz score is less than its predicted score and the residual is negative.",
    "statsSetType": "regression",
    "stimulusGroupId": "apstats-reg-set-3",
    "__stimulusIndex": 5
  },
  {
    "id": "apstats-u1-027",
    "unit": "U1",
    "topicCode": "1.1",
    "skill": "1.A",
    "type": "s",
    "q": "A school wants to compare commute-time distributions for students who ride the bus and students who are driven. Which investigative question is best aligned with that purpose?",
    "o": [
      "What proportion of all students ride the bus to school?",
      "Is the mean commute time for all students exactly 18 minutes?",
      "How do commute-time distributions compare for bus riders and students who are driven?",
      "Why do some families choose to drive rather than use the bus?"
    ],
    "c": [
      2
    ],
    "e": "The goal is comparative and the response variable is quantitative, so the investigative question should compare the commute-time distributions of the two transportation groups rather than ask about only one proportion, a fixed value, or an unmeasurable cause.",
    "statsSetType": "standalone",
    "variantGroupId": "apstats-v-u1-investigative-comparison"
  },
  {
    "id": "apstats-u1-028",
    "unit": "U1",
    "topicCode": "1.1",
    "skill": "1.A",
    "type": "s",
    "q": "A coach wants to characterize free-throw performance for players on the team. Which investigative question most clearly anticipates variability in a quantitative response?",
    "o": [
      "What proportion of players are listed as guards on the roster?",
      "Did the team captain make the final free throw in yesterday’s game?",
      "Is the regulation free-throw line 15 feet from the backboard?",
      "How is free-throw percentage distributed across players on the team?"
    ],
    "c": [
      3
    ],
    "e": "Free-throw percentage is a quantitative variable that varies from player to player. Asking about its distribution identifies both the observational units and the variable whose variability will be studied; the other choices ask about a different variable or a single fixed fact.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-029",
    "unit": "U1",
    "topicCode": "1.10",
    "skill": "1.A",
    "type": "s",
    "q": "A city planner wants to estimate a population proportion related to household recycling. Which investigative question identifies the parameter most directly?",
    "o": [
      "What proportion of all city households recycle at least once in a typical week?",
      "How many households happened to recycle on one selected Tuesday?",
      "Which neighborhood has the closest recycling drop-off center?",
      "Do households that recycle use larger bins than households that do not?"
    ],
    "c": [
      0
    ],
    "e": "The requested parameter is a population proportion, so the question must refer to the proportion of all city households meeting a defined recycling criterion. The other choices concern a one-day sample count, location information, or a different comparative variable.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-030",
    "unit": "U1",
    "topicCode": "1.11",
    "skill": "2.A",
    "type": "s",
    "q": "A county roster lists 12,000 adults. Investigators choose a random starting number from 1 to 150 and then select every 150th person on the ordered roster. Which sampling method is described?",
    "o": [
      "A stratified random sample",
      "A systematic random sample",
      "A cluster random sample",
      "A voluntary-response sample"
    ],
    "c": [
      1
    ],
    "e": "A systematic random sample uses a random starting point followed by a fixed periodic interval. Selecting every 150th person after a random start matches that definition; the design does not sample within strata, choose whole clusters, or rely on volunteers.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-031",
    "unit": "U1",
    "topicCode": "1.12",
    "skill": "2.A",
    "type": "s",
    "q": "A principal estimates lunch-line wait time by surveying only students who remain in the cafeteria after the lunch period ends. Why is this sampling plan problematic?",
    "o": [
      "It guarantees a simple random sample because every student could choose to remain.",
      "It eliminates sampling variability because the survey occurs after lunch.",
      "It can create selection bias because students who remain after lunch may have systematically different wait times from students who leave promptly.",
      "It is a matched-pairs design because each student reports one wait time."
    ],
    "c": [
      2
    ],
    "e": "The sampling frame is restricted to students still present after lunch, and that group may differ systematically from students who leave promptly. This creates a plausible selection or undercoverage bias; convenience does not make the sample random, remove variability, or create pairing.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-032",
    "unit": "U1",
    "topicCode": "1.13",
    "skill": "2.B",
    "type": "s",
    "q": "A manufacturer compares two battery-saving settings by randomly assigning 120 otherwise identical phones to Setting A or Setting B, then running the same workload on each phone. What is the main statistical purpose of random assignment?",
    "o": [
      "It makes the tested phones representative of future customers’ phones.",
      "It forces the two treatment groups to have matching average battery life.",
      "It makes control of the workload unnecessary once the settings have been assigned.",
      "It helps balance other phone-to-phone differences between the treatment groups, supporting a causal comparison of the settings."
    ],
    "c": [
      3
    ],
    "e": "Random assignment tends to balance lurking phone-to-phone characteristics across the treatment groups, so a difference in battery life can be attributed more credibly to the assigned setting. It does not create population representativeness, force equal outcomes, or replace experimental control.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-033",
    "unit": "U1",
    "topicCode": "1.1",
    "skill": "1.A",
    "type": "s",
    "q": "A teacher wants to compare quiz-score distributions for first-period and sixth-period classes. Which investigative question is best aligned with that comparison?",
    "o": [
      "How do the quiz-score distributions differ between first period and sixth period?",
      "What proportion of all students completed the quiz?",
      "Is the combined mean score for both periods exactly 82?",
      "Which classroom is used for first period?"
    ],
    "c": [
      0
    ],
    "e": "The stated purpose is to compare a quantitative response across two groups, so the aligned investigative question compares the two score distributions. A completion proportion, a fixed-value claim about the pooled mean, and a room assignment do not address that comparison.",
    "statsSetType": "standalone",
    "variantGroupId": "apstats-v-u1-investigative-comparison"
  },
  {
    "id": "apstats-u1-034",
    "unit": "U1",
    "topicCode": "1.10",
    "skill": "1.A",
    "type": "s",
    "q": "A health researcher wants to describe weekly exercise time among adults in a county. Which investigative question is statistical and identifies the quantitative variable of interest?",
    "o": [
      "What proportion of adults belong to a local recreation center?",
      "How is weekly exercise time distributed among adults in the county?",
      "Did one selected adult exercise yesterday?",
      "At what time does the recreation center open on Saturday?"
    ],
    "c": [
      1
    ],
    "e": "Weekly exercise time is quantitative and is expected to vary across adults, so a question about its population distribution is statistical and directly matches the goal. The other choices address a different categorical variable, one individual, or a fixed facility schedule.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-035",
    "unit": "U1",
    "topicCode": "1.11",
    "skill": "2.A",
    "type": "s",
    "q": "A school wants a simple random sample of 80 students from a roster of 1,600. Which method best implements that design?",
    "o": [
      "Survey the first 80 students entering the cafeteria.",
      "Ask for 80 volunteers through a schoolwide message.",
      "Number all 1,600 students and use a random-number generator to select 80 distinct numbers.",
      "Choose the 80 students with the highest attendance."
    ],
    "c": [
      2
    ],
    "e": "A simple random sample gives every set of 80 students an equal chance to be selected, which can be implemented by numbering the full roster and randomly choosing distinct labels.",
    "statsSetType": "standalone"
  },
  {
    "id": "apstats-u1-036",
    "unit": "U1",
    "topicCode": "1.12",
    "skill": "2.A",
    "type": "s",
    "q": "A website posts a poll and lets any visitor choose whether to respond. What sampling problem is most immediate?",
    "o": [
      "Undercoverage because every visitor is forced to respond.",
      "A matched-pairs design because responses come in pairs.",
      "Blocking because visitors are randomly assigned to groups.",
      "Voluntary-response bias because people with stronger opinions may be more likely to participate."
    ],
    "c": [
      3
    ],
    "e": "A voluntary-response sample is self-selected. People motivated to answer can differ systematically from those who do not respond, so the resulting sample may not represent the target population.",
    "statsSetType": "standalone"
  }
];
for(const q of Q){if(Number.isInteger(q.__stimulusIndex)){q.stimulus=STIMULI[q.__stimulusIndex];delete q.__stimulusIndex;}}
window.QUESTIONS_AP_STATISTICS=Q;
})();
