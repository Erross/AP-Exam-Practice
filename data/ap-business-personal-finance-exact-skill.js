// AP Business with Personal Finance — final exact-skill curation.
// This layer executes after classification/answer-cue hardening so the final
// browser-effective items perform the precise Fall 2026 CED subskill named.
(() => {
  "use strict";
  const bank = window.QUESTIONS_AP_BUSINESS_PERSONAL_FINANCE;
  if (!Array.isArray(bank)) throw new Error("AP Business bank must load before exact-skill curation");

  function item(id) {
    const q = bank.find((candidate) => candidate.id === id);
    if (!q) throw new Error(`AP Business question not found: ${id}`);
    return q;
  }
  function replaceDistractors(id, values) {
    const q = item(id);
    const slots = [0,1,2,3].filter((i) => i !== q.c[0]);
    values.forEach((value,i) => { q.o[slots[i]] = value; });
  }
  function replaceChoices(id, answer, distractors) {
    const q = item(id);
    q.o[q.c[0]] = answer;
    replaceDistractors(id, distractors);
  }
  function rewrite(id, skill, stem, answer, distractors, explanation) {
    const q = item(id);
    q.skill = skill;
    q.q = stem;
    replaceChoices(id, answer, distractors);
    q.e = explanation;
  }

  // Skill 2.B: formulate AND test a business hypothesis.
  rewrite(
    "apbpf-set-u1-market-2",
    "2.B",
    "Which hypothesis and test would provide the strongest next evidence about actual demand for the proposed service?",
    "Hypothesize that target customers will purchase and reuse the service, then run a limited pilot and measure paid purchases and repeat use.",
    [
      "Hypothesize that customers value convenience, then repeat the existing importance survey without offering the service for purchase.",
      "Hypothesize that the service name drives demand, then test logo recognition without measuring purchases or repeat use.",
      "Treat the current preference ratings as proof of demand and launch broadly without stating or testing a behavioral hypothesis."
    ],
    "Skill 2.B requires a testable business hypothesis and evidence that can confirm or challenge it. A paid pilot measuring both purchase and repeat-use behavior directly tests the stated demand hypothesis."
  );

  // Skill 3.B: explain HOW a potential course of action could solve a problem or
  // capitalize on an opportunity. Each keyed option therefore carries the causal
  // connection rather than merely naming an action.
  rewrite(
    "apbpf-set-u2-segment-2",
    "3.B",
    "Which explanation best shows how a product change could address the early-career segment's stated problem?",
    "Allow variable automatic transfers with a pre-transfer low-balance warning, because flexibility and advance notice reduce the risk that irregular income will strain checking.",
    [
      "Require one fixed weekly transfer with no warning, because consistency should take priority over the segment's stated need for flexibility.",
      "Increase every automatic transfer amount, because faster saving would remove the need to account for irregular income or checking balances.",
      "Disable automatic transfers and require manual deposits, because removing automation would address the segment's desire to save automatically with more control."
    ],
    "The segment values automatic saving but needs flexibility and advance warning when cash is tight. Variable transfers plus a low-balance warning explain how the product can preserve automation while addressing that problem."
  );

  rewrite(
    "apbpf-set-u3-saving-2",
    "3.B",
    "Which explanation best shows how an action could help the saver reach the car-purchase goal on time?",
    "Automate the calculated $150 monthly deposit into a liquid account for the car goal, because regular dedicated transfers align the saving behavior with the required amount and time horizon.",
    [
      "Make deposits only when extra cash happens to remain each month, because an unspecified schedule provides more certainty than the calculated monthly amount.",
      "Move the goal balance into a highly volatile short-term investment, because greater price risk is the most direct way to protect a two-year purchase date.",
      "Postpone saving until the final months, because concentrating deposits near the deadline reduces the amount that ultimately has to be saved."
    ],
    "The calculation establishes the required monthly amount and the two-year horizon. Automating that amount in a liquid goal account explains how the saver can make the planned behavior more consistent with the stated goal."
  );

  rewrite(
    "apbpf-set-u4-kpi-2",
    "3.B",
    "Which explanation best shows how a course of action could address the customer-experience problem shown by the dashboard?",
    "Investigate the retention shortfall and slow support response together, because both miss their targets and may reveal a shared customer-experience problem before unrelated revenue goals are changed.",
    [
      "Raise the recurring-revenue target first, because the one KPI already above target should receive priority over both customer-experience gaps.",
      "Lower the retention and response-time targets to current performance, because redefining success would remove the need to diagnose why both measures miss target.",
      "Investigate support response only and ignore retention, because a percentage KPI cannot provide useful evidence alongside a time-based KPI."
    ],
    "Skill 3.B asks how an action could solve the problem. Investigating the two related customer-experience misses together is causally connected to diagnosing the problem the dashboard reveals; changing an unrelated favorable KPI is not."
  );

  rewrite(
    "apbpf-set2-u1-pestel-2",
    "3.B",
    "Which explanation best shows how management could respond to the external changes before revising the business plan?",
    "Estimate how each external change affects demand, cost, compliance, and competitive position, because those impacts show which opportunities or problems the revised plan needs to address.",
    [
      "Treat every external change as equally important, because equal weighting avoids having to assess which changes actually affect the business.",
      "Ignore the safety ordinance and focus only on internal strengths, because regulatory changes cannot alter costs or operating choices.",
      "Copy the rival's route-prediction feature immediately, because matching one competitor action resolves the effects of all political, economic, social, and technological changes."
    ],
    "Connecting each external change to business consequences explains how management can identify the opportunities and problems that matter before choosing a response. That causal use of the analysis is the Skill 3.B task."
  );

  rewrite(
    "apbpf-set2-u1-structure-2",
    "3.B",
    "Which explanation best shows how a management action could solve the studio's duplicated and delayed decisions?",
    "Define approval authority and reporting responsibilities for recurring decisions, because clear decision rights tell employees who owns vendor, hiring, and discount approvals.",
    [
      "Add another management layer while leaving approval boundaries informal, because more managers would resolve ambiguity without defining who can decide.",
      "Centralize every approval with one senior leader, because a single bottleneck would make the growing studio's recurring decisions faster and more distributed.",
      "Delegate all contract and hiring approvals broadly without limits, because maximum discretion would remove uncertainty about accountability and authority."
    ],
    "The problem is unclear authority. Defining recurring approval and reporting responsibilities directly explains how the organization can reduce duplicate work and delays rather than merely adding hierarchy or unbounded discretion."
  );

  rewrite(
    "apbpf-set2-u2-research-3",
    "3.B",
    "Which explanation best shows how the next research action could address the evidence problem before a broader launch?",
    "Run a more representative test with remote workers at the proposed price, because it follows the strongest observed segment signal while reducing the convenience sample's generalizability problem.",
    [
      "Launch broadly to remote workers immediately, because the observed 60% interest rate proves the convenience sample represents all remote workers in the city.",
      "Repeat the same convenience-sampling method with more respondents, because a larger sample automatically removes selection bias from how participants are recruited.",
      "Ignore the remote-worker signal and test every segment identically, because using observed differences to focus follow-up research would make the evidence less informative."
    ],
    "The initial results identify a promising segment but use a convenience sample. A more representative follow-up in that segment explains how management can preserve the useful signal while addressing the evidence limitation."
  );

  rewrite(
    "apbpf-set2-u4-leadership-2",
    "3.B",
    "Which explanation best shows how a leadership action in the pilot could address a warehouse performance problem?",
    "Give the team authority to propose process changes, because employees doing the work can surface practical changes that reduce errors or pick time while increasing involvement.",
    [
      "Record order-error and pick-time totals more often, because measurement by itself changes the process that produces the measured results.",
      "Set a faster pick-time target without changing work practices, because a more demanding target automatically supplies employees with the process improvements needed to meet it.",
      "Limit improvement suggestions to senior managers, because reducing frontline participation makes it easier to discover operational problems experienced by frontline employees."
    ],
    "Employee authority to propose process changes is not merely a leadership label: it explains how frontline knowledge can be converted into operational improvements. The alternatives measure or demand performance without explaining a mechanism for improvement."
  );

  // The existing clean-room leadership item already states the mechanism in its
  // keyed answer; tighten the stem so the task explicitly asks for that Skill 3.B explanation.
  item("apbpf-set3-u4-leadership-1").q = "Which explanation best shows how a course of action could address the customer-service performance problem?";

  // Skill 3.D: the recommendation itself must include supporting reasoning and
  // evidence, not rely on the post-answer rationale to supply the support.
  rewrite(
    "apbpf-set-u4-strategy-2",
    "3.D",
    "Which recommendation is best supported by the stated priorities and evidence?",
    "Add same-day local delivery using the current store's available capacity, because it addresses observed convenience demand while avoiding the larger fixed commitment of a second location.",
    [
      "Open a second location because expanding physical capacity is preferable even though the current store has unused capacity and the option requires the largest fixed commitment.",
      "Renovate the existing retail space because improving appearance should take priority even though the research identifies convenience rather than store appearance as the unmet demand.",
      "Make no capital change because any strategic choice creates risk, even though the scenario provides customer-demand evidence and unused capacity that can support a bounded response."
    ],
    "The recommendation uses both stated criteria and scenario evidence: delivery responds to convenience demand, uses unused capacity, and avoids the largest fixed commitment. The competing recommendations conflict with one or more of those facts."
  );

  rewrite(
    "apbpf-set2-u4-framework-2",
    "3.D",
    "Which recommendation is best supported if management wants to learn about local demand before making a major commitment?",
    "Run the small pilot with preset customer-acquisition and unit-economics criteria, because it limits commitment while testing whether the company's brand and sales strengths can overcome the incumbent's local coverage.",
    [
      "Commit to the full regional launch because the region is growing, even though this uses the major commitment before testing how the incumbent affects customer acquisition and economics.",
      "Delay entry until the incumbent weakens because competition creates uncertainty, even though waiting indefinitely would collect no evidence about whether the company's strengths can support entry.",
      "Run the small pilot without preset success criteria because flexibility is highest when management decides what counts as success only after seeing the results."
    ],
    "A bounded pilot with criteria is a decisive recommendation supported by the opportunity, threat, internal capabilities, and desire to learn before committing fully. Preset criteria prevent the evidence from being judged only after outcomes are known."
  );

  rewrite(
    "apbpf-set3-u4-strategy-3",
    "3.D",
    "If management values flexibility now but wants a path to broader growth after evidence is collected, which recommendation is best supported?",
    "Begin with the pilot and expand only if predefined targets are met, because its lower investment and higher exit flexibility let management gather regional evidence before committing to additional markets.",
    [
      "Begin with the full launch because its higher projected revenue should outweigh the much larger initial commitment and lower ability to exit under the stated flexibility priority.",
      "Begin with the pilot but define success only after results are observed, because post-hoc criteria preserve discretion even though they weaken disciplined evidence-based decision making.",
      "Avoid entry permanently because incumbent coverage creates uncertainty, even though a limited pilot is specifically available to collect evidence with lower commitment."
    ],
    "The recommendation explicitly connects the staged action to the evidence: the pilot requires less capital, preserves exit flexibility, and can produce information for a later expansion decision. That is the support required by Skill 3.D."
  );

  // This owners' statement is an authentic business communication, not a data-
  // presentation task, so it belongs to 4.B rather than 4.A.
  item("apbpf-set-u3-capital-3").skill = "4.B";
})();
