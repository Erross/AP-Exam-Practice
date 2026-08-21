// AP Computer Science Principles — clean-room distractor and answer-shape curation.
//
// The generated first pass had two release-quality problems: many distractors
// were short/absolute caricatures, and the v7 single-select partner of each
// select-two item used a conspicuously long compound keyed answer. Replace those
// with plausible same-domain misconceptions of comparable depth while preserving
// the CED topic, skill, and correct concept.
(function () {
  "use strict";
  const bank = window.QUESTIONS_AP_COMPUTER_SCIENCE_PRINCIPLES;
  if (!Array.isArray(bank)) throw new Error("AP CSP base bank must load before quality curation");

  const distractors = {
    "1.1":[
      "Dividing tasks among contributors is sufficient collaboration even when contributors do not exchange feedback or coordinate design decisions.",
      "A larger team reduces the need for shared documentation because more contributors make the intended design easier to infer from source code.",
      "Independent duplicate implementations are the preferred collaboration model because combining perspectives tends to introduce inconsistent requirements.",
      "Agreement among collaborators is strong evidence of correctness, so additional user testing adds little value after the team reaches consensus."
    ],
    "1.2":[
      "A program's purpose is primarily determined by its programming language and interface technology rather than the problem or experience it addresses.",
      "Any value stored in memory counts as program output even when the program neither communicates nor uses that value beyond the calculation.",
      "A code segment should independently accomplish the complete purpose of the application before it can contribute meaningfully to the larger program.",
      "A program has a well-defined purpose when users provide the same inputs, because changing inputs changes the purpose rather than the resulting behavior."
    ],
    "1.3":[
      "Developers should complete the planned implementation before collecting user feedback so early observations do not influence the original requirements.",
      "A useful prototype needs production-level completeness because partial implementations cannot provide evidence about design assumptions or usability.",
      "Testing is most informative after all planned features are integrated, since testing smaller increments provides little evidence about development decisions.",
      "Documentation is mainly a post-release activity because collaborators can rely on the current source code to reconstruct earlier design choices."
    ],
    "1.4":[
      "A program that executes without syntax or runtime errors provides sufficient evidence that its logic satisfies the specification for valid inputs.",
      "Testing several typical inputs is a stronger correctness check than boundary cases because unusual inputs are less representative of intended program use.",
      "Debugging is fastest when several suspected statements are changed together, because a working result identifies the combination that contained the error.",
      "Expected test output should be taken from the program's current result, because matching that result confirms the implementation is behaving consistently."
    ],
    "2.1":[
      "Binary integer place values follow powers of ten, while the two available symbols simply provide a compact way to write the decimal positions.",
      "The decimal value of a binary integer is determined mainly by the number of 1 bits, with their positions affecting formatting rather than value.",
      "A fixed-width binary field can represent additional larger integers by adding leading zeros, because leading zeros increase the number of available patterns.",
      "Adding another bit position changes the numeric value of existing bit patterns, so stored integers need to be recalculated when field width increases."
    ],
    "2.2":[
      "Lossy compression preserves exact reconstruction when the decoder has enough contextual information to estimate details discarded by the encoder.",
      "The most appropriate compression method is the one producing the smallest file, even when the application depends on exact recovery of source data.",
      "Compression reduces storage by changing the underlying meaning of the source values, rather than representing repeated or predictable information more efficiently.",
      "Lossless and lossy compression are interchangeable for archival data because decompression restores equivalent source information from either method."
    ],
    "2.3":[
      "A strong correlation in a cleaned dataset is sufficient evidence that changing one measured variable will cause the associated change in the other.",
      "Cleaning inconsistent records removes concerns about how the data were collected, because a consistent format makes the resulting sample representative.",
      "A sufficiently large dataset eliminates sampling and measurement bias, so missing groups or unmeasured variables matter less as record count increases.",
      "Patterns found in one sampled population can be applied to populations excluded from collection when the same variables could theoretically be measured there."
    ],
    "2.4":[
      "A visualization produced by a program establishes the significance of visible patterns because the software has already converted raw records into evidence.",
      "Filtering a dataset changes presentation but not analytical conclusions, since the retained records still come from the same original source.",
      "Structured data are less suitable for repeated algorithmic processing because field definitions constrain how records can be interpreted across observations.",
      "Automating an analysis makes its conclusions reliable even when source data are incomplete, provided the same transformation is applied consistently."
    ],
    "3.1":[
      "A variable keeps the first value assigned to it, while later assignment statements create temporary expressions without replacing stored program state.",
      "An assignment primarily tests whether two expressions are equal, so executing it does not alter the value associated with the variable on the left.",
      "When x is updated using x plus a value, the updated x is substituted into the expression before the right-hand side is evaluated.",
      "Variables make an algorithm more input-specific because changing a stored value requires editing each statement that refers to the variable's name."
    ],
    "3.2":[
      "A list represents one composite value that cannot expose individual elements by position, so separate variables are still needed for element-level processing.",
      "Collections increase program complexity because an algorithm needs a distinct hard-coded operation for each possible element stored in the collection.",
      "Data abstraction requires procedures to know the underlying storage location of each element so they can correctly operate on the collection.",
      "A list-based algorithm needs structural changes whenever the collection length changes, even when the same traversal should apply to additional elements."
    ],
    "3.3":[
      "Parentheses document an arithmetic expression for readers but do not affect evaluation order when standard arithmetic operators are present.",
      "Arithmetic expressions can combine literal constants but should not contain variables whose values may change while the program is running.",
      "Regrouping addition, subtraction, multiplication, or division preserves the result because operator precedence affects readability rather than computed value.",
      "An arithmetic expression models a quantity correctly when its numerical result is plausible, even if its operations combine incompatible units or scaling."
    ],
    "3.4":[
      "A string is limited to alphabetic characters, so spaces, punctuation, and digit characters need separate numeric or symbol data types.",
      "Concatenating text that contains digit characters performs arithmetic on those digits before the resulting value is converted back into a string.",
      "String processing operates on a complete character sequence at once, so an algorithm cannot compare or extract a selected portion of stored text.",
      "A numeric value and a string displaying the same digits behave interchangeably because their visible representation determines which operations apply."
    ],
    "3.5":[
      "A Boolean expression produces a numeric score representing how strongly a condition is satisfied rather than evaluating to a true-or-false value.",
      "AND and OR are interchangeable when they combine the same two conditions because both operators evaluate whether the conditions are related.",
      "Applying NOT changes how a Boolean condition is written while preserving the original truth value used by the program's decision logic.",
      "Compound conditions are unnecessary in conditional statements because a branch can evaluate one comparison and infer the remaining criteria from context."
    ],
    "3.6":[
      "A conditional evaluates its condition but executes statements from each branch so later code can compare the effects of the alternatives.",
      "An if/else structure is appropriate when both alternatives should run in sequence, with the condition determining which branch executes first.",
      "The branch selected by a conditional can be determined from the program text without knowing the current values used by its Boolean condition.",
      "Conditional logic makes a program less responsive to input because branch structure fixes one behavior before the program begins execution."
    ],
    "3.7":[
      "In a nested conditional, inner conditions are evaluated first so their results can determine which branch of the outer conditional should run.",
      "Tracing nested conditionals requires evaluating conditions in unselected branches because those results may still influence statements after the structure.",
      "Nested decisions are best used for independent criteria that apply to all inputs, while dependent criteria should be placed in separate programs.",
      "Reordering nested conditions preserves behavior whenever the same comparisons appear somewhere in the structure, regardless of which branches contain them."
    ],
    "3.8":[
      "Iteration represents a single execution of a statement sequence, while repeated processing is expressed by writing additional copies of the statements.",
      "A running total should be reinitialized during each repetition so the loop processes the current element without carrying information from earlier iterations.",
      "The final state of a loop depends on its termination condition but not on variable updates performed during intermediate repetitions.",
      "Loop-based code is less reusable than repeated statements because the loop body needs a separate literal operation for each possible data element."
    ],
    "3.9":[
      "An algorithm may leave intermediate operations unspecified when its intended final result is clear enough for a computer to infer the missing steps.",
      "Working for a representative sample input is sufficient evidence of algorithm correctness even when other valid inputs violate assumptions used by the steps.",
      "An algorithm becomes well defined after a programming language is selected, because language syntax supplies the problem-solving steps that pseudocode omits.",
      "Correct algorithms for the same task are functionally equivalent for design purposes, so efficiency and resource requirements provide little basis for choosing among them."
    ],
    "3.10":[
      "A list stores an unordered composite value, so algorithms cannot depend on the relative position of elements during access or traversal.",
      "Adding or removing a list element changes the displayed collection but does not affect later indices or the sequence encountered by a traversal.",
      "A traversal needs each possible element value written into the program in advance, because list iteration cannot operate on values discovered at runtime.",
      "Lists are appropriate for fixed collections but not data that change size, since modifying length requires rewriting the algorithm that processes the collection."
    ],
    "3.11":[
      "Binary search can discard half of an unsorted collection after comparing the middle element because the target's value determines which side is more likely.",
      "Binary search confirms absence by eventually examining the elements sequentially from the beginning, so sorted order mainly improves the first comparison.",
      "For large sorted data, a linear scan uses fewer comparisons because binary search spends additional operations recalculating midpoint positions.",
      "Sorting is unrelated to binary-search correctness because the algorithm uses equality comparisons rather than the relative order of values."
    ],
    "3.12":[
      "Calling a procedure transfers control permanently into that procedure, so execution does not return to statements following the call.",
      "A procedure's parameter values become fixed after its first call, which limits later calls to the same arguments unless the procedure is redefined.",
      "A returned value belongs to the called procedure and cannot be stored or incorporated into an expression in the calling code.",
      "A caller needs the procedure's implementation copied near each call site so the runtime can determine which statements the procedure name represents."
    ],
    "3.13":[
      "A reusable procedure should encode values from each call site directly in its body rather than expose parameters that vary between invocations.",
      "Procedural abstraction is most useful when callers understand the implementation details before using the operation, reducing uncertainty about hidden steps.",
      "Repeated behavior is easier to maintain as separate copies because a change can be tailored independently without affecting other call sites.",
      "A broadly reusable procedure should depend on unrelated global state where possible, reducing the number of arguments callers need to provide explicitly."
    ],
    "3.14":[
      "Using a software library requires copying its implementation into the application so the calling program can execute the library's operations locally.",
      "Library use increases development effort because reusable operations still need to be reimplemented before they can be trusted by an application.",
      "A library's documented parameters are advisory, since the library can infer omitted inputs from the calling program's broader intent.",
      "Library abstraction couples callers to internal implementation details, so changing the library implementation generally requires rewriting correct calling code."
    ],
    "3.15":[
      "A random-value operation cycles through each possible result before repeating, which maintains fairness by preventing the same value from appearing consecutively.",
      "Repeated values from consecutive random calls indicate a defect because a valid random process should produce a different outcome on the next call.",
      "Random values cannot change a program's execution path because conditionals and arithmetic require deterministic inputs to produce meaningful results.",
      "The specified range of a random operation affects display formatting but not the probabilities represented when the values are used in a simulation."
    ],
    "3.16":[
      "A simulation is useful as evidence because it reproduces the real system's relevant and unmodeled properties with the same fidelity as direct observation.",
      "Factors omitted from a model do not affect conclusions drawn from simulated results because the model defines which factors are relevant to the real process.",
      "Random inputs reduce a simulation's validity because a meaningful computational model should reproduce the same outcome for repeated identical starting conditions.",
      "Simulation is most valuable when direct experimentation is easy to repeat, since computational models add unnecessary uncertainty when real observations are difficult to obtain."
    ],
    "3.17":[
      "Algorithmic efficiency is determined by whether a solution returns the correct output, while time and memory use are implementation details outside algorithm comparison.",
      "Two correct algorithms have comparable scalability when they solve the same problem, even if measured operation counts grow at different rates with input size.",
      "A timing result from one small input is sufficient to rank scalability because growth behavior remains proportional as larger inputs are introduced.",
      "Correctness implies practical execution time for valid inputs, so a rapidly growing operation count does not make a correct algorithm unsuitable at scale."
    ],
    "3.18":[
      "An undecidable problem is a decision problem whose best known algorithm is too slow for current computers but would become practical with faster hardware.",
      "A precise computational problem is decidable when sufficient time and memory are available, even if no current implementation can finish on realistic inputs.",
      "Solving many common instances establishes decidability because an algorithm can infer how to extend the successful approach to remaining unusual cases.",
      "Undecidability is primarily a storage limitation, so increasing memory capacity converts the problem into one that an algorithm can resolve for arbitrary input."
    ],
    "4.1":[
      "The Internet functions as a central network service that stores shared addressing and routes each packet through one globally controlled infrastructure path.",
      "Packets from one message need a common route so the receiver can infer ordering and reconstruct the data without additional protocol information.",
      "A domain name is a human-readable form of an IP address with the same stored representation, so DNS mainly checks spelling rather than resolving names.",
      "Internet routing depends on a designated global router that coordinates independent networks before packets can move between different administrative domains."
    ],
    "4.2":[
      "A fault-tolerant design focuses on preventing component failures, making alternate paths or replicated resources less important once reliable hardware is selected.",
      "Redundant network paths decrease reliability because multiple routes create uncertainty about which connection should carry traffic after a link failure.",
      "A fault-tolerant system remains available under any combination of failures as long as at least one component was originally configured as redundant.",
      "Redundancy improves availability without meaningful cost or coordination overhead because duplicate resources remain idle until the primary component fails."
    ],
    "4.3":[
      "Parallel computing improves performance by executing the algorithm's operations sequentially on one faster processor rather than dividing work among processing resources.",
      "Adding a second processor cuts execution time roughly in half for a correct algorithm even when substantial portions of the work depend on earlier sequential results.",
      "Increasing processor count reduces total runtime in direct proportion because communication, coordination, and sequential work become smaller as more processors participate.",
      "Distributed computing removes communication latency by treating networked devices as one processor, so data exchange does not contribute to the system's runtime."
    ],
    "5.1":[
      "A computing innovation with a measurable benefit should be evaluated primarily on that benefit because harmful effects generally indicate incorrect rather than intended use.",
      "Effects not anticipated by developers are separate from the innovation's impact, since evaluation should focus on outcomes represented in the original requirements.",
      "Computing effects can be summarized at the population level without identifying affected groups because technical features tend to distribute benefits and costs similarly.",
      "A feature's technical behavior determines its social effect, so differences in access, incentives, or deployment context have limited relevance to impact analysis."
    ],
    "5.2":[
      "Providing an online version of a service resolves access inequality because availability on the Internet gives users the same practical ability to participate.",
      "Digitizing a service improves access uniformly when the interface is functional, even if users differ in connectivity, devices, disability access, or digital skills.",
      "Differences in computing participation primarily reflect personal preference, while infrastructure, affordability, geography, and accessibility have little effect on meaningful access.",
      "Distributing devices is sufficient to close a digital divide because connectivity, training, affordability, and accessible design are secondary once hardware is present."
    ],
    "5.3":[
      "A computerized decision process is neutral when it applies the same mathematical operations to each record, even if its training data reflect historical disparities.",
      "Historical training data are objective evidence of appropriate decisions, so reproducing patterns in those records is a reliable way to avoid human bias.",
      "Similar overall accuracy is sufficient evidence of fairness because subgroup error rates cannot materially differ when aggregate performance is stable.",
      "Automating a decision transfers responsibility for outcomes to the model, reducing the need for designers to examine data provenance or deployment consequences."
    ],
    "5.4":[
      "Crowdsourcing describes work completed by a small expert team and later published to a large audience for comments after the substantive task is finished.",
      "A large number of contributions provides sufficient quality control because individual errors tend to disappear without explicit validation or moderation.",
      "Crowdsourcing works best when contributors have similar experiences, because diverse local knowledge makes it harder to combine submissions into one result.",
      "Participation volume is the main determinant of crowdsourced quality, so task design, incentives, representation, and validation methods have limited influence."
    ],
    "5.5":[
      "Content that is publicly accessible online can generally be reused in a new product because public availability indicates that restrictive intellectual-property rights were waived.",
      "Copyright applies mainly to printed creative works, while software, photographs, and other digital media are governed by technical access controls rather than intellectual property.",
      "Open-source and Creative Commons resources share a common permission model, so meeting the terms of one open license is sufficient for material under another.",
      "Ethical review is unnecessary for technically permitted automation when the implementation follows applicable law, because legality resolves questions about consent and stakeholder harm."
    ],
    "5.6":[
      "A strong password is sufficient account protection when it is unique, making software updates, phishing resistance, and additional authentication factors largely redundant.",
      "Multifactor authentication increases credential exposure because each added factor creates another independent secret an attacker can substitute for the password.",
      "Password reuse can reduce account risk by making credentials easier to remember accurately, which lowers the chance that users rely on insecure recovery mechanisms.",
      "Encrypted network traffic prevents credential theft through deceptive messages because encryption verifies that the user intended to communicate with the legitimate recipient."
    ]
  };

  function rotate(values, shift) {
    const n = ((shift % values.length) + values.length) % values.length;
    return values.slice(n).concat(values.slice(0, n));
  }

  const multiByGroup = new Map(
    bank.filter((q) => q.type === "m" && q.variantGroupId).map((q) => [q.variantGroupId, q])
  );

  bank.filter((q) => !q.stimulusGroupId).forEach((question) => {
    const pool = distractors[question.topicCode];
    if (!pool) throw new Error(`${question.id}: no curated CSP distractor pool for topic ${question.topicCode}`);

    // v7 is the single-select partner of the select-two v8 item. Use one of the
    // same correct concepts in a normal statement question rather than a compound
    // two-statement keyed option that creates an obvious length cue.
    if (/-v7$/.test(question.id)) {
      const sibling = multiByGroup.get(question.variantGroupId);
      if (!sibling) throw new Error(`${question.id}: missing paired select-two sibling`);
      const correctConcepts = sibling.c.map((index) => sibling.o[index]);
      const chosen = correctConcepts.slice().sort((a, b) => a.length - b.length)[0];
      question.q = `Which statement about ${question.topic} is accurate?`;
      question.o[question.c[0]] = chosen;
    }

    const suffix = Number((question.id.match(/-v(\d+)$/) || [])[1] || 0);
    const rotated = rotate(pool, suffix);
    let distractorIndex = 0;
    question.o = question.o.map((option, index) => {
      if (question.c.includes(index)) return option;
      return rotated[distractorIndex++];
    });
  });
})();
