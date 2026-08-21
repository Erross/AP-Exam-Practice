// AP Cybersecurity — clean-room distractor curation for generated standalones.
// Replace short/absolute first-pass distractors with plausible same-domain
// misconceptions of comparable depth. Source-set questions are separately
// authored and are not rewritten here.
(function () {
  "use strict";
  const bank = window.QUESTIONS_AP_CYBERSECURITY;
  if (!Array.isArray(bank)) throw new Error("AP Cybersecurity base bank must load before quality curation");

  const distractors = {
    "1.1":[
      "Social engineering is mainly a software-exploitation technique in which malicious code bypasses access controls without depending on a person's decision or response.",
      "An urgent request from a familiar role is reasonably trustworthy when the message contains organization-specific details that an outside attacker would be unlikely to know.",
      "Human-targeted attacks have limited effect on authentication because credentials and verification codes are technical controls rather than information a victim can disclose.",
      "A request appearing to come from a senior leader can be treated as verified when the displayed sender identity matches an expected organizational name."
    ],
    "1.2":[
      "Several rapid failed logins are more consistent with ordinary password mistakes than credential attacks when the attempts originate from one unfamiliar external source.",
      "Reusing one strong password across services reduces compromise risk because attackers must discover the same high-complexity credential before accessing any account.",
      "A memorable password built from personal details can resist guessing better than a long random password because meaningful patterns are harder for automated tools to model.",
      "Multifactor authentication increases account exposure because each factor becomes an alternative credential that an attacker may use independently to complete login."
    ],
    "1.3":[
      "An access point using the expected network name is likely to be legitimate because wireless clients receive the SSID directly from the organization operating that network.",
      "Wireless jamming primarily captures encrypted traffic for later decryption, so its main security effect is loss of confidentiality rather than disrupted availability.",
      "Sensitive activity is reasonably protected on public Wi-Fi when the network requires a password, even if users have not verified who operates the access point.",
      "A VPN removes the need to trust any network or service provider because encrypted traffic has no endpoint at which it can be decrypted or processed."
    ],
    "1.4":[
      "AI-generated phishing is less effective than manually written phishing because automated text lacks the personalization needed to influence a recipient's decisions.",
      "An AI-assisted attack becomes a cybersecurity concern mainly when the AI system itself obtains privileged access to the victim's operating system or network.",
      "Sensitive information entered into an AI tool remains local to the user's session because prompt content is not part of the provider's data-processing environment.",
      "A high-confidence AI security recommendation provides sufficient evidence for a production change when the system was trained on a large technical corpus."
    ],
    "1.5":[
      "AI-assisted configuration review is safest when suggested changes are applied immediately, because delaying for analyst verification preserves known configuration weaknesses.",
      "Automated event triage adds little defensive value unless analysts independently inspect the complete event stream before the system assigns priorities or risk scores.",
      "Human review can be reduced substantially for high-confidence AI alerts because model confidence directly measures whether the observed activity is actually malicious.",
      "False-positive and false-negative rates are secondary concerns for AI detection when the model evaluates more events than a human team could process manually."
    ],
    "2.1":[
      "Cyber risk can be ranked from vulnerability severity alone because asset value, adversary capability, likelihood, and business consequence affect response planning rather than risk itself.",
      "A vulnerability with severe theoretical impact represents high operational risk even when the vulnerable component is unreachable in the organization's deployed configuration.",
      "Organizations reduce cyber risk primarily by removing vulnerable assets, while acceptance, transfer, and mitigation are accounting choices rather than risk-management strategies.",
      "Defense in depth favors one highly effective security control because overlapping protections complicate operations and create additional paths an adversary can exploit."
    ],
    "2.2":[
      "Tailgating is a network-layer attack in which an unauthorized packet follows legitimate traffic through an access-control device before the device can evaluate its source.",
      "Physical compromise has limited cybersecurity impact when servers use digital authentication, because building access does not affect devices, media, documents, or network connections.",
      "An unlocked entrance presents comparable risk in most locations because physical vulnerability severity depends mainly on the weakness rather than the assets beyond the door.",
      "A physical-risk report can prioritize remediation from the observed weakness itself, while likelihood and business impact are more relevant after an incident has occurred."
    ],
    "2.3":[
      "Applying the strongest available physical control at each entrance produces the best security outcome because operational needs should be adjusted after protection requirements are set.",
      "An access-control vestibule improves throughput by allowing groups to move through one authentication event, reducing the need to verify individuals at restricted boundaries.",
      "Unused removable-media ports are low risk when endpoint anti-malware is installed, so disabling ports adds little protection against data removal or malicious devices.",
      "A UPS provides continuous resilience through extended utility outages because temporary battery backup allows connected equipment to operate independently of external power duration."
    ],
    "2.4":[
      "A detective physical control is effective when it deters visible intrusion attempts, even if it produces little evidence that responders can use after an event occurs.",
      "Cameras and sensors are most useful away from obvious entrances because attackers expect monitoring near controlled doors and may behave more naturally elsewhere.",
      "Access records and video evidence should be investigated separately so one evidence source does not bias interpretation of events recorded by the other control.",
      "A detector's alert volume is a useful measure of effectiveness because response delay and false alarms matter less when the system observes a high-value area."
    ],
    "3.1":[
      "ARP poisoning strengthens local address resolution by adding redundant IP-to-MAC mappings, reducing the chance that traffic is delivered to the wrong network interface.",
      "MAC flooding causes a switch to become more selective by filling its address table with candidate entries that help the device identify legitimate source ports.",
      "A denial-of-service attack primarily threatens confidentiality because the adversary needs to inspect protected user data before network availability can be disrupted.",
      "Network attack severity can be assessed from the attack technique alone because the same technique produces similar consequences regardless of the asset or security objective affected."
    ],
    "3.2":[
      "Network policies should describe acceptable use broadly and leave minimum technical requirements to individual administrators so controls can adapt independently across systems.",
      "Open wireless access can provide stronger confidentiality than encrypted enterprise wireless because users avoid sharing encryption settings that an adversary could capture.",
      "Enterprise wireless authentication is most secure when users share one centrally managed credential, preventing individual account differences from creating inconsistent access behavior.",
      "Split tunneling sends remote traffic through organizational security controls before using a local Internet path, so it reduces exposure compared with a full-tunnel configuration."
    ],
    "3.3":[
      "Segmentation improves internal communication security by placing systems with different sensitivity in one broadly reachable network where monitoring can observe their shared traffic.",
      "A screened subnet is appropriate for the organization's most sensitive internal databases because its external reachability gives administrators more direct control over access attempts.",
      "Lateral movement is reduced when internal zones allow direct communication, because an attacker encounters fewer routing devices that could be misconfigured between compromised systems.",
      "Switch port security helps availability by accepting additional source addresses during address-table pressure, allowing legitimate traffic to continue during a MAC-flooding event."
    ],
    "3.4":[
      "Firewall filtering is primarily based on user identity and physical device location, while network addresses, protocols, ports, and direction provide limited policy information.",
      "In a first-match access-control list, later rules refine earlier broad matches, so the last applicable rule represents the firewall's final decision for the traffic.",
      "A firewall provides the most coverage when positioned inside a trusted zone after traffic has crossed the network boundary, because internal placement exposes more packet context.",
      "A permissive firewall policy reduces security risk when application requirements are uncertain, because unexpected services remain available while administrators collect usage evidence."
    ],
    "3.5":[
      "Signature detection is well suited to novel attacks because previously unseen behavior tends to reuse enough known malicious indicators to match an existing rule set.",
      "Anomaly detection produces few false positives when a baseline is well trained, because legitimate behavior that changes over time remains similar to the original baseline.",
      "Combining signature and anomaly detection reduces operational cost because overlapping methods eliminate the need to tune alerts or process events through more than one detector.",
      "A high-severity network alert can be treated as confirmed compromise when the detector has a strong historical accuracy rate, reducing the need for corroborating evidence."
    ],
    "4.1":[
      "Endpoint vulnerabilities are primarily network-routing weaknesses, so a device with current network controls has limited exposure from local configuration, privileges, or outdated software.",
      "Ransomware mainly copies confidential files for later sale, while encryption of the victim's files is a defensive behavior used by anti-malware containment tools.",
      "A worm depends on a user running a disguised installer on each destination, while a Trojan is characterized by autonomous propagation between reachable systems.",
      "Device risk can be prioritized from malware type without considering the endpoint's business role, stored data, network exposure, or importance to organizational operations."
    ],
    "4.2":[
      "Password hashing is a reversible storage method that lets authorized administrators recover a user's plaintext credential when account verification or recovery is required.",
      "Password spraying is mainly an offline technique in which captured hashes are compared with candidate passwords without sending authentication requests to active accounts.",
      "Providing the same password through two different login fields creates two authentication factors because each entry is collected and validated separately.",
      "Lockout thresholds and multifactor settings have limited effect on credential attacks because adversaries can test credentials without interacting with the authentication system."
    ],
    "4.3":[
      "Endpoint policy is most flexible when users select their own security settings, because central baselines can prevent specialized devices from receiving updates appropriate to their work.",
      "Anti-malware signature databases should change infrequently, since adding new signatures increases the chance that older known malware will no longer match its original indicator.",
      "Delaying a published security patch can reduce exploitation risk because attackers have less incentive to target a vulnerability after the vendor has acknowledged and fixed it.",
      "A host firewall should permit broad inbound connectivity when application requirements are uncertain, allowing legitimate services to operate while endpoint monitoring identifies unnecessary traffic."
    ],
    "4.4":[
      "Endpoint authentication logs are most useful for confirming successful access, while failed attempts and unusual sources provide little evidence about credential attacks without a confirmed compromise.",
      "The most comprehensive detector is appropriate for resource-constrained devices because detection coverage should take precedence over processing, storage, and performance limitations.",
      "A high false-positive rate improves defensive visibility by ensuring suspicious activity is included in the alert stream, even when responders spend more time on benign events.",
      "A false negative occurs when legitimate behavior is not alerted, while a malicious event that receives an incorrect warning is classified as a false positive."
    ],
    "5.1":[
      "SQL injection is mitigated by placing user input directly into database commands, because the database engine can distinguish intended values from control syntax in the same string.",
      "Directory traversal sequences are useful defensive path markers that cause a server to remain inside the intended directory while normalizing requested file locations.",
      "Cross-site scripting is primarily a server-hardware attack in which an adversary changes browser behavior by modifying memory or storage components on the web server.",
      "Application vulnerability severity can be evaluated independently of permissions and data sensitivity because input-handling flaws produce similar organizational impact across applications."
    ],
    "5.2":[
      "Data classification is mainly an inventory label and should not influence handling, access, retention, or monitoring because consistent controls reduce administrative complexity.",
      "Least privilege favors broad baseline access so authorized work is not interrupted, with audit logs used later to identify permissions that turned out to be unnecessary.",
      "Rule-based access control assigns permissions from a person's permanent organizational role, while time, location, and device state are generally outside authorization decisions.",
      "Linux file permissions provide one access level for a file and rely on application logic to distinguish read, write, and execute rights for owners and other users."
    ],
    "5.3":[
      "Symmetric encryption uses a public encryption key and a separate private decryption key, removing the need for participants to protect a shared secret.",
      "AES is primarily an integrity hash used to detect file changes, while confidentiality of stored data is provided by algorithms such as SHA-256.",
      "Encrypted stored data can be recovered by any authorized account without access to key material because authorization and encryption are independent protections.",
      "Increasing an encryption key's length changes storage format but has little effect on brute-force work or computational cost within the same algorithm."
    ],
    "5.4":[
      "Asymmetric cryptography is strongest when both participants publish their private keys, allowing senders and recipients to verify that the same key pair is being used.",
      "For confidential public-key encryption, a sender uses the sender's public key so the recipient can recover the data with the recipient's unrelated private key.",
      "RSA and elliptic-curve cryptography are symmetric designs that require participants to establish the same shared secret before encrypted communication can begin.",
      "Raw key length is directly comparable across cryptographic algorithms, so doubling the bit count represents a similar increase in security regardless of the design used."
    ],
    "5.5":[
      "Secure-by-design development postpones security decisions until functional requirements stabilize, reducing the chance that early threat assumptions constrain product features unnecessarily.",
      "Secure-by-default software starts with minimal protective restrictions so users can enable security controls that match their environment after deployment.",
      "Input sanitization preserves control characters while documenting their origin, allowing database and browser interpreters to distinguish malicious input from legitimate commands.",
      "A well-designed authentication layer provides sufficient application security, making least privilege, patching, input handling, testing, and monitoring secondary controls."
    ],
    "5.6":[
      "A changed cryptographic hash identifies the actor responsible for modifying a file because different attackers produce distinguishable digest values for the same altered content.",
      "Data-loss-prevention tools primarily block physical device theft, while honeypots store production secrets so attackers reveal which confidential information they are seeking.",
      "Malicious web input is normally removed before a server creates a request record, so application logs provide little evidence about attempted injection or traversal activity.",
      "Detection effectiveness is best measured by alert count because coverage, latency, false positives, false negatives, and operating cost are downstream response concerns."
    ]
  };

  function rotate(values, shift) {
    const n = ((shift % values.length) + values.length) % values.length;
    return values.slice(n).concat(values.slice(0, n));
  }

  bank.filter((q) => !q.stimulusGroupId).forEach((question) => {
    const pool = distractors[question.topicCode];
    if (!pool) throw new Error(`${question.id}: no curated Cybersecurity distractor pool for ${question.topicCode}`);
    const suffix = Number((question.id.match(/-v(\d+)$/) || [])[1] || 0);
    const rotated = rotate(pool, suffix);
    let next = 0;
    question.o = question.o.map((option, index) => index === question.c[0] ? option : rotated[next++]);
  });
})();
