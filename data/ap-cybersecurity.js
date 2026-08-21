// AP Cybersecurity — original Section I practice bank.
//
// Topic coverage and content alignment checked 2026-08-20 against the College
// Board AP Cybersecurity CED effective Fall 2026:
// https://apcentral.collegeboard.org/media/pdf/ap-cybersecurity-course-and-exam-description.pdf
//
// Each CED topic has four distinct assessed facets, each with two alternate
// variants sharing a variantGroupId. This provides depth without allowing a
// delivered form to serve two near-duplicate versions of the same narrow task.
(function () {
  "use strict";

  const profiles = [
    {
      unit:"U1", code:"1.1", topic:"Understanding Social Engineering", skills:["1.A","1.A","1.A","1.A"],
      context:"An employee receives a message claiming to be from a senior executive. It demands an immediate confidential file transfer and warns that delay will jeopardize a contract.",
      evidence:"The message uses a powerful identity, an artificial deadline, and a threatened negative consequence to push the recipient to act before independently verifying the request.",
      truths:[
        "Social engineering manipulates people through psychological tactics such as urgency, authority, familiarity, scarcity, intimidation, or consensus.",
        "A request that pressures a target to act quickly before verifying the sender is a common indicator of social-engineering risk.",
        "Victims of social engineering can expose personal information, authentication codes, credentials, or install malicious software through actions the adversary induces.",
        "Evaluating a suspicious request should consider both the message content and whether the claimed identity or request can be verified through a trusted channel."
      ],
      wrongs:[
        "Social engineering succeeds only by exploiting a software bug and does not depend on influencing a person's behavior.",
        "A short deadline proves that a message is legitimate because real organizations never give users time to verify urgent requests.",
        "Social-engineering attacks cannot affect authentication because they target people rather than computing systems.",
        "If a sender uses the correct name of an executive, no additional verification of the request is needed."
      ],
      why:"The CED treats social engineering as manipulation of human decision-making; indicators and impact must be evaluated in context rather than assumed from technical appearance alone."
    },
    {
      unit:"U1", code:"1.2", topic:"Suspicious Website Logins", skills:["1.A","1.A","2.A","2.A"],
      context:"An account log shows dozens of failed sign-ins within minutes, attempts from unfamiliar devices, and successful access shortly after midnight even though the user normally signs in during school hours.",
      evidence:"A service reports repeated authentication attempts against many accounts using a small set of common passwords, followed by several lockouts.",
      truths:[
        "Many failed logins in a short period, unusual times, or unknown devices can be indicators of a password attack.",
        "Weak or reused passwords give adversaries more opportunities to guess credentials or reuse credentials exposed by another service.",
        "Long, random, unique passwords or passphrases reduce guessing and credential-reuse risk compared with predictable personal patterns.",
        "Multifactor authentication adds protection because a stolen password alone may be insufficient to complete authentication."
      ],
      wrongs:[
        "A password attack normally produces one failed login and then stops, so repeated failures are evidence against an attack.",
        "Reusing the same password across services reduces risk because the user has fewer credentials that could be exposed.",
        "A predictable password containing a pet name and birth year is stronger than a long random password because it is meaningful to the user.",
        "Multifactor authentication weakens account security by requiring evidence from more than one authentication factor."
      ],
      why:"Authentication risk is evaluated through login evidence and credential practices. Strong unique passwords and additional factors reduce the chance that one guessed or stolen secret is enough for access."
    },
    {
      unit:"U1", code:"1.3", topic:"Best Practices for Public Networks", skills:["1.A","1.A","2.A","2.A"],
      context:"At an airport, a traveler sees two Wi-Fi networks with nearly identical names. One is operated by the airport and the other was created by an unknown party nearby.",
      evidence:"A nearby access point copies a trusted SSID to attract users, while encrypted HTTPS traffic remains unreadable to the access-point operator even though some other metadata may still be visible.",
      truths:[
        "An evil-twin attack uses a malicious wireless access point with a name similar or identical to a trusted network so victims may connect to it.",
        "Wireless attacks can include jamming that disrupts legitimate radio communication and war driving that searches for discoverable wireless networks.",
        "Users should verify the intended network name, favor encrypted protocols, and consider the sensitivity of information before using an untrusted public network.",
        "A VPN encrypts traffic between the user and the VPN provider, shifting some trust from the local network provider to the VPN operator rather than eliminating trust entirely."
      ],
      wrongs:[
        "An evil twin is a legitimate backup access point that automatically improves the security of the original wireless network.",
        "Wireless jamming reads encrypted application content by decrypting each packet with the attacker's radio signal.",
        "Public Wi-Fi becomes safe for sensitive activity whenever the network name looks familiar, even if its operator has not been verified.",
        "Using a VPN means no provider anywhere can observe or process the user's traffic because the VPN has no endpoint."
      ],
      why:"Public-network safety depends on recognizing wireless attack patterns and applying layered protections; encrypted protocols and VPNs reduce particular exposures but do not make every network or provider inherently trustworthy."
    },
    {
      unit:"U1", code:"1.4", topic:"AI-Based Cybersecurity Attacks", skills:["1.A","1.A","2.A","2.A"],
      context:"An adversary uses an AI tool to produce convincing voice clips of a manager, rapidly customize phishing messages, and generate plausible false content about an organization.",
      evidence:"A large language model response includes a confident technical recommendation, but the claim conflicts with stable vendor documentation and no independent source supports it.",
      truths:[
        "AI-powered tools can augment social engineering by generating convincing text, voice, images, or other content at greater speed and scale.",
        "Adversaries can use AI tools to automate or adapt parts of attacks, so defenders should evaluate the resulting behavior and evidence rather than assuming AI-generated content is trustworthy.",
        "Sensitive information supplied to an AI system can create exposure risk depending on how the system stores, processes, or uses submitted data.",
        "Security-relevant AI output should be checked against reputable, stable sources and human judgment before consequential changes are implemented."
      ],
      wrongs:[
        "AI-powered tools cannot affect social engineering because they operate only on numerical data and cannot produce convincing language or media.",
        "An attack produced with AI is harmless unless the AI system itself gains administrator privileges on the target computer.",
        "Entering sensitive information into any AI system is risk-free because prompts can never be retained, processed, or exposed beyond the user's screen.",
        "A confident AI response should replace independent verification because confidence proves that the underlying information is correct."
      ],
      why:"The CED frames AI as an amplifier for both adversaries and defenders. Cybersecurity decisions still require evidence, data-handling awareness, verification, and human review of consequential recommendations."
    },
    {
      unit:"U1", code:"1.5", topic:"Leveraging AI in Cyber Defense", skills:["2.A","3.A","2.A","3.A"],
      context:"A security team uses an AI-assisted tool to compare current firewall and access-control settings with policy, prioritize unusual events, and recommend changes for analyst review.",
      evidence:"The automated system flags thousands of events, ranks a small subset as likely malicious, and provides supporting features so analysts can investigate before blocking traffic or changing accounts.",
      truths:[
        "AI-powered tools can help defenders review configurations and recommend security improvements, but consequential changes should still be evaluated before deployment.",
        "AI-assisted detection can help sort large volumes of events and prioritize activity that is more likely to warrant human investigation.",
        "Human review remains important because automated recommendations can be incomplete, incorrect, or inappropriate for an organization's specific context.",
        "The value of AI-assisted threat detection depends on factors such as data quality, false positives, false negatives, transparency, and how alerts are incorporated into response processes."
      ],
      wrongs:[
        "AI defense tools should automatically apply every suggested configuration change to production systems without testing because automation removes error risk.",
        "AI-assisted detection is useful only when analysts manually inspect every event before the tool performs any prioritization.",
        "Human review should be removed from security decisions whenever an AI tool produces a recommendation with a high confidence score.",
        "False positives and false negatives are irrelevant to AI-assisted detection because machine-generated classifications are inherently objective."
      ],
      why:"AI can accelerate configuration review and event triage, but it is a decision-support mechanism rather than a guarantee. Detection quality and operational consequences still require human and organizational evaluation."
    },
    {
      unit:"U2", code:"2.1", topic:"Cyber Foundations", skills:["1.A","1.A","2.A","2.A"],
      context:"A company identifies an exposed asset, estimates the likelihood that a threat will exploit the vulnerability, evaluates the potential impact, and chooses how to manage the resulting risk.",
      evidence:"A high-value system has a remotely exploitable vulnerability, credible adversaries are actively targeting similar systems, and successful compromise would stop a critical business process.",
      truths:[
        "Cybersecurity risk assessment considers assets, threats, vulnerabilities, likelihood, and impact rather than treating the existence of any vulnerability as the complete risk determination.",
        "Risk generally becomes more serious when exploitation is more likely and the potential impact on important assets is greater.",
        "Organizations can manage risk by strategies such as mitigation, avoidance, transfer, or acceptance depending on context and tolerance.",
        "Defense in depth combines multiple security controls so bypassing one protection does not necessarily give an adversary unrestricted access to the asset."
      ],
      wrongs:[
        "A risk assessment needs only the name of the vulnerability because asset value, likelihood, and impact do not affect risk.",
        "A vulnerability with severe potential impact is automatically high risk even when exploitation is impossible in the system's actual configuration.",
        "Risk can be managed only by eliminating the asset; mitigation, transfer, and acceptance are not valid strategies.",
        "Defense in depth means selecting one strong control and removing other layers so users encounter a single security mechanism."
      ],
      why:"Cyber foundations connect threats and vulnerabilities to business impact and likelihood, then use appropriate risk responses and layered controls rather than relying on a single universal protection."
    },
    {
      unit:"U2", code:"2.2", topic:"Physical Vulnerabilities and Attacks", skills:["1.A","1.A","1.A","1.A"],
      context:"A restricted server room is beside an unlocked exterior door, employees sometimes hold the secure door for unknown people, and discarded documents are placed in an open recycling area.",
      evidence:"A visitor follows closely behind an authorized employee through a badge-controlled door without presenting a credential, then photographs information visible on an unattended desk.",
      truths:[
        "Tailgating occurs when an unauthorized person follows an authorized person into a restricted area without completing the required access control.",
        "Physical attacks can exploit exposed information through techniques such as shoulder surfing, dumpster diving, theft, or unauthorized entry.",
        "Physical risk depends on both the vulnerability and the value and consequence of the assets that an adversary could reach through that weakness.",
        "Documenting a physical vulnerability should identify the exposed asset, plausible threat, likelihood, potential impact, and evidence supporting the assessment."
      ],
      wrongs:[
        "Tailgating is a network attack in which a router adds unauthorized packets to the end of a legitimate data stream.",
        "Physical attacks cannot expose digital systems because servers and devices become immune to compromise when the attack begins in a building.",
        "Every unlocked door creates identical risk regardless of what area it protects, who can reach it, or what assets are located beyond it.",
        "A physical risk report should list the vulnerability but omit impact and likelihood because those factors are unrelated to security decisions."
      ],
      why:"Physical security is part of cybersecurity because attackers can exploit people, spaces, devices, and discarded information to reach digital assets; risk analysis still depends on likelihood and impact."
    },
    {
      unit:"U2", code:"2.3", topic:"Protecting Physical Spaces", skills:["2.A","2.A","2.A","2.A"],
      context:"A research lab needs layered controls for a public lobby, employee offices, a restricted equipment room, portable media, and continued operation during brief power failures.",
      evidence:"The organization combines badges, a controlled vestibule, locked equipment cabinets, disabled unused USB ports, visitor procedures, and backup power for critical devices.",
      truths:[
        "Physical security controls should be selected according to the asset, threat, environment, and required level of access rather than using the same control everywhere.",
        "Access-control vestibules and turnstiles can reduce unauthorized entry by limiting how people move from a less secure area into a restricted area.",
        "Disabling unnecessary removable-media ports can reduce the opportunity for unapproved devices to introduce malicious software or remove data.",
        "An uninterruptible power supply can provide temporary backup power so a critical device can continue operating or shut down safely during a power interruption."
      ],
      wrongs:[
        "The strongest physical control should be placed at every doorway regardless of asset value, user needs, or operational impact.",
        "A controlled vestibule is designed to help one authorized person admit as many unverified visitors as possible through a restricted entrance.",
        "Leaving unused USB ports enabled prevents malware because removable media can communicate only with authorized software.",
        "A UPS prevents every long-duration outage by generating unlimited power without batteries, fuel, or other energy sources."
      ],
      why:"Physical mitigation is risk-based and layered. Access controls, media restrictions, and power resilience address different physical threats and must be chosen for the asset and operational context."
    },
    {
      unit:"U2", code:"2.4", topic:"Detecting Physical Attacks", skills:["3.A","3.A","3.A","3.A"],
      context:"A warehouse has a fenced perimeter, two public entrances, a restricted loading area, and a high-value storage room that has experienced attempted unauthorized access.",
      evidence:"A door alarm records repeated after-hours openings at one restricted entrance, while camera footage shows the same unknown person approaching the area shortly before each event.",
      truths:[
        "Detective physical controls such as alarms, cameras, sensors, guards, and access logs can provide evidence that a physical security event occurred or is occurring.",
        "Placement of detective controls should focus on paths, entrances, perimeters, and assets where an attack is plausible and useful evidence can be captured.",
        "Correlating access records with camera or sensor evidence can strengthen an investigation by connecting events from independent detection sources.",
        "A detective control should be evaluated for factors such as coverage, response time, false alarms, cost, and whether it produces evidence useful to responders."
      ],
      wrongs:[
        "A detective physical control prevents every intrusion before it begins and therefore does not need to generate evidence or alerts.",
        "Camera placement is most effective when cameras avoid entrances and critical assets so an adversary cannot know where monitoring occurs.",
        "Access logs and camera footage should never be compared because independent evidence becomes less useful when events are correlated.",
        "False alarms and response time do not affect a detective control because any alert is equally useful regardless of accuracy or delay."
      ],
      why:"Physical detection is evidence-driven: controls must be placed where meaningful events can be observed, and analysts correlate and evaluate alerts rather than assuming detection automatically prevents intrusion."
    },
    {
      unit:"U3", code:"3.1", topic:"Network Vulnerabilities and Attacks", skills:["1.A","1.A","1.A","1.A"],
      context:"A local network accepts falsified address-resolution information, a switch learns a flood of fabricated source addresses, and users intermittently lose network availability.",
      evidence:"A device begins associating the gateway's IP address with an unexpected MAC address shortly before traffic is redirected through an unauthorized host.",
      truths:[
        "ARP poisoning uses falsified address-resolution information to create incorrect IP-to-MAC associations and can redirect local-network traffic through an adversary-controlled device.",
        "MAC flooding attempts to overwhelm a switch's address table so traffic may be forwarded in a less selective way that can aid interception.",
        "Denial-of-service attacks target availability by consuming or disrupting resources so legitimate users cannot reliably access a network or service.",
        "Network risk assessment should connect an observed vulnerability or attack path with the affected confidentiality, integrity, or availability of important assets."
      ],
      wrongs:[
        "ARP poisoning protects a local network by cryptographically verifying every IP-to-MAC mapping before the switch accepts it.",
        "MAC flooding strengthens switch isolation by limiting each port to one verified hardware address and discarding all fabricated addresses.",
        "A denial-of-service attack is successful only when the adversary reads confidential application data from every affected user.",
        "Network attacks should be assessed without considering which security objective or asset is affected because all attacks have identical impact."
      ],
      why:"Network attacks exploit protocol, configuration, or capacity weaknesses in different ways. Analysts identify the mechanism and connect it to concrete confidentiality, integrity, or availability risk."
    },
    {
      unit:"U3", code:"3.2", topic:"Protecting Networks: Managerial Controls and Wireless Security", skills:["2.A","2.A","2.A","2.A"],
      context:"An organization is revising remote-access and wireless policies after discovering unmanaged access points and employees using weak wireless settings.",
      evidence:"The proposed standard requires approved wireless equipment, authenticated enterprise access, modern encryption, documented remote-access rules, and prohibits split tunneling for high-risk connections.",
      truths:[
        "Managerial controls such as network, remote-access, and wireless-security policies define approved behavior and minimum security requirements for users and administrators.",
        "Modern wireless protection should use strong authentication and encryption appropriate to the organization rather than open or obsolete security settings.",
        "Enterprise wireless authentication can use an approved authentication service so access is tied to authorized users or devices rather than one widely shared password.",
        "Remote-access policy can restrict split tunneling when the organization needs remote traffic to pass through approved security controls instead of simultaneously using untrusted local paths."
      ],
      wrongs:[
        "A managerial network policy should avoid specifying minimum security requirements because technical staff cannot be expected to follow organizational rules.",
        "An open wireless network provides stronger confidentiality than modern encrypted wireless because users do not share any encryption settings.",
        "Enterprise authentication is designed to give every user the same permanent anonymous credential so access cannot be associated with authorized identities.",
        "Split tunneling always forces every remote packet through the organization's security controls and therefore cannot create a parallel untrusted path."
      ],
      why:"Network mitigation combines policy with secure configuration. Authentication, encryption, approved devices, and remote-access rules reduce exposure by controlling how users and traffic enter organizational networks."
    },
    {
      unit:"U3", code:"3.3", topic:"Protecting Networks: Segmentation", skills:["2.A","2.A","2.A","2.A"],
      context:"A company separates public web services, employee workstations, payment systems, and laboratory equipment into different network zones with different access rules.",
      evidence:"After one employee workstation is compromised, firewall and VLAN boundaries prevent the host from directly reaching the payment database or laboratory-control subnet.",
      truths:[
        "Network segmentation divides a network into zones so different security policies and controls can be applied to systems with different risk or access requirements.",
        "A screened subnet or DMZ can place externally accessible services in a separate zone so compromise does not automatically provide direct access to the internal LAN.",
        "Segmentation can limit lateral movement by requiring traffic between zones to pass through defined controls instead of allowing unrestricted internal communication.",
        "Switch port security can limit the number or identity of addresses allowed on a port, reducing some attacks that rely on flooding the switch's address table."
      ],
      wrongs:[
        "Network segmentation improves security by placing every system on one unrestricted broadcast domain with identical access to all other systems.",
        "A DMZ is the most trusted internal zone and should contain sensitive databases that must never be reachable from externally facing services.",
        "Segmentation increases lateral movement by removing security boundaries between network zones and allowing compromised hosts to reach every subnet directly.",
        "Port security protects a switch by accepting an unlimited number of new source addresses on each port during a MAC-flooding attack."
      ],
      why:"Segmentation creates security boundaries among systems with different exposure and trust. DMZs, VLANs, controlled routing, and port security can reduce direct reachability and lateral movement."
    },
    {
      unit:"U3", code:"3.4", topic:"Protecting Networks: Firewalls", skills:["2.A","2.A","2.A","2.A"],
      context:"A firewall rule list checks traffic in order. An early rule denies HTTPS from a broad internal address range, while a later rule would allow HTTPS from all sources.",
      evidence:"A connection matches rule 3, which denies its protocol, destination port, and source range. A later allow rule also appears relevant but is never reached because the earlier match has already decided the traffic.",
      truths:[
        "A firewall can allow or deny traffic based on criteria such as direction, protocol, source or destination address, port, service, or application.",
        "When an access-control list uses first-match processing, rule order matters because the first matching rule determines what happens to the traffic.",
        "Firewalls should be placed at meaningful network boundaries and ingress or egress points where policy requires traffic to be inspected or restricted.",
        "A secure firewall configuration should implement the stated communication requirements while blocking traffic that is unnecessary or inconsistent with policy."
      ],
      wrongs:[
        "A firewall can filter only by the physical color of the network cable and cannot use addresses, protocols, ports, or traffic direction.",
        "Firewall rule order is irrelevant because every matching rule is applied and the last rule always overrides all earlier decisions.",
        "A firewall is most effective when placed where no traffic crosses a network boundary, because then it can inspect every external connection indirectly.",
        "A secure firewall should allow every possible protocol and port so legitimate applications never encounter a restriction."
      ],
      why:"Firewall behavior follows explicit policy and ordered rules. Analysts must reason about where the firewall sits, what traffic matches each criterion, and whether the resulting access is actually required."
    },
    {
      unit:"U3", code:"3.5", topic:"Detecting Network Attacks", skills:["3.A","3.A","3.A","3.A"],
      context:"A monitoring system compares traffic with known malicious signatures and also learns normal traffic patterns so it can flag unusual behavior that has no known signature.",
      evidence:"A signature detector misses a novel attack, while an anomaly detector raises several alerts on unusual but legitimate backup traffic in addition to identifying the attack.",
      truths:[
        "Signature-based detection is effective for recognized attack patterns but can miss novel or modified attacks that do not match known signatures.",
        "Anomaly-based detection can identify previously unseen behavior that differs from a baseline, but it can produce more false positives when legitimate activity changes.",
        "Hybrid detection combines multiple approaches and can improve coverage while increasing cost, processing, tuning, or operational complexity.",
        "Network logs and alerts should be analyzed for indicators of compromise and interpreted with context so responders distinguish malicious activity from benign events."
      ],
      wrongs:[
        "Signature-based detection reliably identifies every zero-day attack because unknown activity always matches an existing malicious signature.",
        "Anomaly-based detection produces no false positives because anything unusual on a network is necessarily malicious.",
        "Hybrid detection is cheaper and simpler than either component because combining systems removes all processing and tuning requirements.",
        "A network alert should be treated as confirmed compromise without examining logs, context, baselines, or corroborating evidence."
      ],
      why:"Detection methods trade coverage, cost, speed, and error rates. Analysts interpret signatures, anomalies, logs, and corroborating evidence rather than assuming an alert or absence of an alert is conclusive."
    },
    {
      unit:"U4", code:"4.1", topic:"Device Vulnerabilities and Attacks", skills:["1.A","1.A","1.A","1.A"],
      context:"A workstation runs outdated software, allows unnecessary services, and is infected by a malicious program that encrypts local files and demands payment for restoration.",
      evidence:"The affected executable spread from one machine to another without users manually copying it, while a different malicious program disguised itself as a legitimate installer.",
      truths:[
        "Device vulnerabilities can include unpatched software, insecure configuration, excessive privileges, unnecessary services, or weakly protected local data.",
        "Ransomware attempts to deny access to data or systems, commonly by encrypting files and demanding payment or another action from the victim.",
        "A worm is capable of self-propagating between systems, while a Trojan disguises malicious functionality as or within software a user is induced to run.",
        "Device risk assessment should consider the vulnerable device's function, exposed data, attack likelihood, and consequences to the organization."
      ],
      wrongs:[
        "A device is secure whenever it powers on successfully because vulnerabilities exist only in network routers and never in endpoints.",
        "Ransomware protects availability by creating encrypted backups that remain freely accessible to the victim after the attack.",
        "A worm requires a user to manually copy it to every target, while a Trojan is defined by automatically replicating itself across the network.",
        "Device risk is identical for every computer regardless of the services it provides, data it stores, exposure, or business criticality."
      ],
      why:"Endpoint security begins by identifying device types, vulnerabilities, and malware behavior, then connecting the attack path to the specific confidentiality, integrity, or availability consequences of compromise."
    },
    {
      unit:"U4", code:"4.2", topic:"Authentication", skills:["1.A","1.A","2.A","2.A"],
      context:"An organization stores salted password hashes, requires users to provide a password plus an authenticator app code, and locks accounts after repeated failed attempts.",
      evidence:"An attacker obtains password hashes from a database and uses an offline tool to hash candidate passwords for comparison, while another attacker tries one common password across many active accounts.",
      truths:[
        "Password hashes let a system verify a password by comparing derived values without storing the original password in plaintext.",
        "Offline password attacks compare hashes of candidate passwords with captured password hashes, while password spraying tries a small number of common passwords across many live accounts.",
        "Multifactor authentication requires evidence from more than one authentication factor, such as something a user knows plus something the user has or is.",
        "Login controls such as minimum password requirements, lockout thresholds, and multifactor authentication can reduce the likelihood or impact of credential attacks when configured appropriately."
      ],
      wrongs:[
        "Password hashing is reversible encryption whose purpose is to let administrators recover every user's plaintext password whenever needed.",
        "Password spraying is an offline attack that never contacts an authentication service and uses only captured password hashes.",
        "Entering a password twice counts as multifactor authentication because two entries always represent two independent authentication factors.",
        "Account lockout and multifactor settings have no effect on credential attacks because login configuration is unrelated to authentication risk."
      ],
      why:"Authentication combines secure credential storage, recognition of attack methods, independent factors, and sensible login policy. The protections address different ways adversaries obtain or test credentials."
    },
    {
      unit:"U4", code:"4.3", topic:"Protecting Devices", skills:["2.A","2.A","2.A","2.A"],
      context:"An endpoint-security baseline restricts software installation, deploys anti-malware scanning, installs vendor patches promptly, and configures a host firewall to limit unnecessary inbound services.",
      evidence:"A vendor publishes a patch for a known vulnerability that is already being exploited, while one department delays the update because its devices are not centrally managed.",
      truths:[
        "Device-security policies can define approved software, update requirements, configuration baselines, and user responsibilities for organizational endpoints.",
        "Signature-based anti-malware tools compare files or activity with known malicious indicators and may quarantine items that match recognized malware.",
        "Installing supported security patches reduces exposure to known vulnerabilities that adversaries could otherwise continue exploiting.",
        "A host-based firewall can restrict network traffic to or from an individual device according to the services that device legitimately requires."
      ],
      wrongs:[
        "A device-security policy is unnecessary when users have administrator access because individual preference always produces a consistent secure baseline.",
        "Anti-malware signature databases should never be updated because new signatures make known malicious files harder to recognize.",
        "Delaying a patch makes a known vulnerability less exploitable because attackers lose interest once a vendor publishes a fix.",
        "A host firewall improves security by allowing every inbound service so applications can accept connections without restriction."
      ],
      why:"Endpoint protection uses managerial and technical controls together. Policies, anti-malware, patching, and host firewalls reduce different attack opportunities and should match the device's legitimate function."
    },
    {
      unit:"U4", code:"4.4", topic:"Detecting Attacks on Devices", skills:["3.A","3.A","3.A","3.A"],
      context:"An analyst reviews endpoint authentication logs after a compromise and finds repeated failed logins from unfamiliar sources followed by one successful login and execution of an unexpected process.",
      evidence:"A device detector raises many alerts on a resource-constrained embedded system. Most are benign, and the excessive alert volume causes responders to delay investigating a later genuine event.",
      truths:[
        "Device logs can reveal indicators such as repeated authentication failures, unusual login sources or times, unexpected processes, configuration changes, or other behavior requiring investigation.",
        "Detective controls on devices should be selected with regard to effectiveness, resource cost, response needs, and the kinds of attacks the device is expected to face.",
        "High false-positive rates can waste investigative resources and contribute to alert fatigue, reducing the practical effectiveness of a detection process.",
        "A false negative occurs when malicious activity is not detected, so evaluating a device detection method must consider both missed attacks and incorrect alerts."
      ],
      wrongs:[
        "Authentication logs are useful only for recording successful legitimate users and cannot contain indicators of attempted credential attacks.",
        "The most resource-intensive detector should be installed on every device regardless of processing limits because performance impact cannot affect security operations.",
        "False positives improve detection quality because responders become more accurate as the number of benign alerts increases without limit.",
        "A false negative means a benign event was incorrectly flagged as malicious, while a true attack was successfully detected."
      ],
      why:"Device detection is an evidence and tradeoff problem. Analysts inspect endpoint events and evaluate detection coverage, resource use, false positives, false negatives, and response consequences."
    },
    {
      unit:"U5", code:"5.1", topic:"Application and Data Vulnerabilities and Attacks", skills:["1.A","1.A","1.A","1.A"],
      context:"A web application passes untrusted form input directly to a database query, exposes files beyond the intended directory when path strings are manipulated, and runs with more file permissions than it needs.",
      evidence:"A server log shows input containing SQL control syntax and a separate request containing repeated ../ path sequences immediately before restricted files are accessed.",
      truths:[
        "SQL injection exploits unsafely handled input so database commands or query logic can be altered from what the application developer intended.",
        "Directory traversal attacks manipulate path input to attempt access to files outside the directory the application is supposed to expose.",
        "Cross-site scripting exploits insufficient handling of untrusted content so malicious script can be delivered or executed in a user's browser context.",
        "Application and data risk increases when software has excessive privileges, accepts unsanitized input, exposes sensitive files, or lacks controls appropriate to the data's value and classification."
      ],
      wrongs:[
        "SQL injection is prevented by concatenating all user input directly into database commands without validation because the database can infer safe intent.",
        "Directory traversal protects file confidentiality by restricting a user to the current directory whenever ../ appears in a request.",
        "Cross-site scripting is a physical attack that requires an adversary to install additional memory chips in the victim's web browser.",
        "Application risk is unaffected by permissions and data sensitivity because software vulnerabilities have the same consequence for every application."
      ],
      why:"Application attacks exploit input handling, path handling, browser content, permissions, and exposed data. Analysts connect the mechanism to the application context and the resulting risk to data and services."
    },
    {
      unit:"U5", code:"5.2", topic:"Protecting Applications and Data: Managerial Controls and Access Controls", skills:["2.A","2.A","2.A","2.A"],
      context:"A research organization classifies data by sensitivity, grants users only the permissions needed for their roles, and configures Linux file permissions for owners, groups, and other users.",
      evidence:"An internal transaction system should allow access only for approved employees during business hours from managed corporate devices, while a separate research directory should be editable only by one team.",
      truths:[
        "Data classification helps determine the degree of protection, handling, access, retention, and monitoring appropriate for information with different sensitivity or regulatory requirements.",
        "The principle of least privilege grants users or processes only the access needed to perform their authorized function and no more.",
        "Rule-based access control can make authorization decisions from conditions such as time, location, or device characteristics rather than solely from a user's job role.",
        "Linux file permissions distinguish read, write, and execute access for categories such as the owner, group, and others, allowing access to be configured according to policy."
      ],
      wrongs:[
        "Data classification should have no relationship to access or monitoring because every file requires exactly the same security controls.",
        "Least privilege means granting every authenticated user administrator access so no legitimate task is ever blocked by permissions.",
        "Rule-based access control ignores conditions and can authorize users only by a fixed job title assigned permanently to each account.",
        "Linux file permissions provide only one all-or-nothing setting and cannot distinguish read, write, or execute access among different user categories."
      ],
      why:"Application and data protection combines managerial classification with technical authorization. Least privilege, access-control models, and file permissions translate policy into specific allowed actions."
    },
    {
      unit:"U5", code:"5.3", topic:"Protecting Stored Data with Cryptography", skills:["2.A","2.A","2.A","2.A"],
      context:"A company encrypts sensitive backup files with AES before storing them and manages the encryption key separately from the encrypted data.",
      evidence:"Two authorized systems must use the same secret key to encrypt and decrypt a protected file, and increasing key length raises brute-force resistance while also increasing computational work.",
      truths:[
        "Symmetric encryption uses the same shared secret key for encryption and decryption, so protecting and distributing that key is a central security requirement.",
        "AES is a commonly used symmetric encryption algorithm for protecting data such as files, disks, wireless traffic, and other binary information.",
        "Encryption can protect confidentiality of stored data when unauthorized parties obtain the encrypted file but do not possess the required decryption key.",
        "Longer keys within an encryption algorithm generally increase resistance to brute-force guessing while also affecting computation and key-management requirements."
      ],
      wrongs:[
        "Symmetric encryption uses one public key for encryption and an unrelated private key for decryption, so the two parties never share any secret.",
        "AES is a cryptographic hash function designed only to detect changes in files and cannot be used to encrypt data.",
        "Encrypting a file makes the key unnecessary because the encrypted data can be decrypted by any authorized user without possessing cryptographic material.",
        "Key length has no relationship to brute-force resistance or computation because every key in a given algorithm provides identical security."
      ],
      why:"Symmetric cryptography protects confidentiality through a shared secret key. Effective use depends on an appropriate algorithm, key strength, and secure key handling rather than encryption alone."
    },
    {
      unit:"U5", code:"5.4", topic:"Asymmetric Cryptography", skills:["2.A","2.A","2.A","2.A"],
      context:"Two engineers need to exchange confidential information without first sharing one secret encryption key, so each generates a related public and private key pair.",
      evidence:"A sender encrypts data using the recipient's public key; the matching private key is retained by the recipient and is required to decrypt that ciphertext.",
      truths:[
        "Asymmetric cryptography uses a mathematically related public and private key pair so one key can be distributed while the corresponding private key remains protected.",
        "To send confidential data to a recipient using public-key encryption, the sender can encrypt with the recipient's public key so the recipient's private key is needed for decryption.",
        "RSA and elliptic-curve cryptography are examples of asymmetric algorithms used in applications such as secure key exchange, certificates, and digital signatures.",
        "Key lengths from different cryptographic algorithms cannot be compared directly as if the same number of bits always represented the same security strength."
      ],
      wrongs:[
        "Asymmetric cryptography requires both users to publish their private keys so anyone can decrypt messages sent to them.",
        "To keep a message confidential for a recipient, the sender should encrypt with the sender's public key because only the recipient knows what it is.",
        "RSA and elliptic-curve cryptography are symmetric ciphers that require every participant to use one identical shared secret key.",
        "A 4096-bit key in any algorithm is exactly twice as secure as a 2048-bit key in every other algorithm because bit lengths are directly comparable across designs."
      ],
      why:"Public-key cryptography separates a shareable public key from a protected private key. Correct key choice depends on the operation, and security strength cannot be inferred by comparing raw bit lengths across different algorithms."
    },
    {
      unit:"U5", code:"5.5", topic:"Protecting Applications", skills:["2.A","2.A","2.A","2.A"],
      context:"A development team designs a new application so security requirements are considered before coding begins, secure settings are enabled for new installations, and input is validated before reaching sensitive operations.",
      evidence:"The application rejects input containing unexpected control characters and database syntax instead of concatenating the raw string into a command sent to the database.",
      truths:[
        "Secure by design means security requirements and threat considerations are incorporated throughout design and development rather than added only after deployment.",
        "Secure by default means a product begins with protective settings enabled so users are not required to discover and activate essential security controls before safe use.",
        "Input validation and sanitization can reduce attacks such as SQL injection, cross-site scripting, and directory traversal by rejecting or safely handling malicious control data.",
        "Application security should combine secure design, appropriate defaults, least privilege, input handling, testing, patching, and monitoring rather than relying on one isolated control."
      ],
      wrongs:[
        "Secure by design means developers should ignore security until the final release so early requirements cannot interfere with feature development.",
        "Secure by default means all protective settings should begin disabled so every user can decide later whether basic security is necessary.",
        "Input sanitization increases injection risk by intentionally preserving every control character and sending raw input directly to sensitive interpreters.",
        "One security control is sufficient for every application because secure design, permissions, testing, and monitoring are redundant once a login screen exists."
      ],
      why:"Secure applications use layered development and runtime controls. Security begins with design and defaults, while safe input handling and other controls address specific vulnerabilities throughout the application lifecycle."
    },
    {
      unit:"U5", code:"5.6", topic:"Detecting Attacks on Data and Applications", skills:["3.A","3.A","3.A","3.A"],
      context:"A security team compares file hashes with known-good values, monitors data movement, operates a decoy service, and reviews web logs for malicious input patterns.",
      evidence:"A file's SHA-256 digest differs from the previously recorded digest, while application logs also show requests containing ../ path sequences and SQL control syntax from the same source.",
      truths:[
        "Comparing a current cryptographic hash with a trusted earlier hash can reveal that a file changed, although the hash alone does not explain why the change occurred.",
        "Data-loss-prevention tools can monitor data access, use, or transmission for suspicious behavior, while honeypots can provide evidence when adversaries interact with decoy resources.",
        "Application logs can contain indicators such as SQL control syntax, script tags, unusually long input, or directory-traversal path sequences that warrant investigation.",
        "Detection methods should be evaluated for timeliness, coverage, cost, false positives, false negatives, and whether the method can observe the specific attack behavior of concern."
      ],
      wrongs:[
        "If a file hash changes, the hash proves which attacker changed the file and provides the complete motive and attack path without other evidence.",
        "Data-loss-prevention tools are preventive locks that cannot monitor data use or transmission, while honeypots are production databases that must contain real secrets.",
        "Web application logs cannot reveal attack indicators because malicious input is removed from all requests before any server can record it.",
        "A detection method is effective whenever it produces many alerts, so delay, cost, coverage, and error rates do not need to be considered."
      ],
      why:"Application and data detection relies on observable evidence and method limitations. Hashes, DLP, honeypots, and logs reveal different behaviors, so analysts correlate signals and evaluate coverage and error tradeoffs."
    }
  ];

  function rotate(values, shift) {
    const n = ((shift % values.length) + values.length) % values.length;
    return values.slice(n).concat(values.slice(0, n));
  }

  function arrange(options, correctIndex, shift) {
    const entries = options.map((text, index) => ({ text, correct:index === correctIndex }));
    const moved = rotate(entries, shift);
    return {
      o:moved.map((entry) => entry.text),
      c:moved.map((entry, index) => entry.correct ? index : null).filter((index) => index !== null),
    };
  }

  function rationale(profile, truth) {
    return `${truth} ${profile.why} The alternatives either reverse the security relationship, make an unsupported guarantee, or describe a different control or attack mechanism.`;
  }

  const questions = [];
  profiles.forEach((profile, topicIndex) => {
    const idStem = `apcyber-${profile.code.replace(".", "-")}`;
    const facets = [
      {
        stems:[
          `Which statement most accurately describes ${profile.topic}?`,
          `A junior analyst is reviewing ${profile.topic}. Which statement would best correct a misconception about this topic?`,
        ],
        options:[profile.truths[0], profile.wrongs[1], profile.wrongs[2], profile.wrongs[3]],
        truth:profile.truths[0], skill:profile.skills[0],
      },
      {
        stems:[
          `${profile.context} Which conclusion or action is best supported by the relevant cybersecurity principle?`,
          `Consider this cybersecurity situation: ${profile.context} Which interpretation is most defensible?`,
        ],
        options:[profile.truths[1], profile.wrongs[0], profile.wrongs[2], profile.wrongs[3]],
        truth:profile.truths[1], skill:profile.skills[1],
      },
      {
        stems:[
          `${profile.evidence} Which conclusion is best supported by this evidence?`,
          `An analyst must reason from the following evidence: ${profile.evidence} Which conclusion should guide the analysis?`,
        ],
        options:[profile.truths[2], profile.wrongs[0], profile.wrongs[1], profile.wrongs[3]],
        truth:profile.truths[2], skill:profile.skills[2],
      },
      {
        stems:[
          `Which additional statement about ${profile.topic} is accurate?`,
          `Which statement would be appropriate to include in a security report or recommendation concerning ${profile.topic}?`,
        ],
        options:[profile.truths[3], profile.wrongs[0], profile.wrongs[1], profile.wrongs[2]],
        truth:profile.truths[3], skill:profile.skills[3],
      },
    ];

    facets.forEach((facet, facetIndex) => {
      facet.stems.forEach((stem, wordingIndex) => {
        const variantNumber = facetIndex * 2 + wordingIndex + 1;
        const answer = arrange(facet.options, 0, topicIndex + variantNumber);
        questions.push({
          id:`${idStem}-v${variantNumber}`,
          unit:profile.unit,
          topicCode:profile.code,
          topic:profile.topic,
          skill:facet.skill,
          type:"s",
          variantGroupId:`${idStem}-facet-${facetIndex + 1}`,
          q:stem,
          o:answer.o,
          c:answer.c,
          e:rationale(profile, facet.truth),
        });
      });
    });
  });

  window.QUESTIONS_AP_CYBERSECURITY = questions;
})();
