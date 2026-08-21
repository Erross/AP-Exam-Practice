// AP Cybersecurity — original 3-question scenario/evidence sets.
// The current College Board exam includes individual MCQs and sets of 2, 3, or 4
// questions. Every source below is synthetic and created for this practice bank.
(function () {
  "use strict";
  const bank = window.QUESTIONS_AP_CYBERSECURITY;
  if (!Array.isArray(bank)) throw new Error("AP Cybersecurity base bank must load before source sets");

  const sets = [
    {
      id:"u1-phish", unit:"U1",
      stimulus:{
        type:"text",
        title:"Reported Payroll Verification Email",
        text:"From: Payroll Support\nSubject: FINAL NOTICE — verify before 4:00 PM\n\nYour direct-deposit profile will be suspended today unless you confirm your account immediately. More than 90% of employees have already completed this required verification. Reply with your employee ID and the one-time code that will be sent to your phone. Failure to respond before 4:00 PM may delay your next paycheck.",
        source:"Original synthetic phishing scenario created for AP Exam Practice; not College Board material."
      },
      questions:[
        ["1.1","1.A","Which feature most directly demonstrates the social-engineering tactic of consensus?",["The claim that more than 90% of employees have already completed the action","The warning that the direct-deposit profile could be suspended","The request for an employee ID","The use of the words Payroll Support in the sender name"],0,"Consensus pressure is created by telling the target that most peers have already complied, which can make the requested behavior appear normal or socially expected."],
        ["1.1","1.A","What is the most serious immediate risk of sending the requested one-time code?",["An adversary could use the code as an authentication factor to complete a login as the victim.","The code would permanently disable the victim's phone because one-time codes modify device firmware.","The code would make the victim's employee ID public to everyone on the Internet automatically.","The code would force the payroll system to delete every existing direct-deposit record."],0,"One-time authentication codes are intended as proof of identity. Giving the code to an adversary can let that person complete an authentication flow that the password alone could not satisfy."],
        ["1.1","2.A","Which response best mitigates the risk while preserving legitimate payroll operations?",["Do not reply; verify the request through an independently known payroll contact or official portal before taking action.","Reply with the one-time code but omit the employee ID so the sender receives only one sensitive value.","Forward the message to coworkers and ask them to reply first so consensus can determine whether it is safe.","Disable multifactor authentication so future payroll messages cannot request a one-time code."],0,"Using a trusted, independent channel breaks the attacker's control of the interaction and verifies whether the request is real. Sending any authentication code or weakening MFA would increase risk."],
      ]
    },
    {
      id:"u1-logins", unit:"U1",
      stimulus:{
        type:"quantitative",
        title:"Account Authentication Events",
        columns:["Time","Account","Source","Result"],
        rows:[
          ["09:12","mlopez","Managed laptop","Success"],
          ["09:13","mlopez","203.0.113.44","Failure"],
          ["09:13","jchen","203.0.113.44","Failure"],
          ["09:14","aparker","203.0.113.44","Failure"],
          ["09:14","rgomez","203.0.113.44","Failure"],
          ["09:15","jchen","203.0.113.44","Failure"],
          ["09:17","mlopez","203.0.113.44","Failure"],
        ],
        source:"Original synthetic authentication log created for AP Exam Practice; not College Board material."
      },
      questions:[
        ["1.2","1.A","Which attack pattern is most consistent with the events from 203.0.113.44?",["A small set of password guesses being attempted across several accounts","A successful multifactor-authentication enrollment by each employee","A file-integrity check comparing hashes on one endpoint","A wireless jamming attack preventing all radio communication"],0,"The same source is generating failed authentication attempts across several accounts in a short period, which is consistent with credential guessing such as password spraying rather than normal user behavior."],
        ["1.5","3.A","How could an AI-assisted detection system be most useful with a much larger version of this event stream?",["Prioritize unusual cross-account login patterns for analyst review while providing the events that contributed to the alert","Automatically delete every account that has one failed login because AI classifications do not require human verification","Replace authentication controls entirely because detecting suspicious logins prevents credential misuse","Suppress all failed-login events so analysts are not distracted by evidence that might be malicious"],0,"AI-assisted detection can help triage large event volumes and surface patterns for investigation. It should support evidence-based response rather than automatically treating every failure as confirmed compromise."],
        ["1.2","2.A","Which control would most directly reduce the chance that a guessed password alone results in account takeover?",["Require a second independent authentication factor for account access","Permit unlimited failed logins so legitimate users are never locked out","Encourage employees to reuse the same memorable password across all services","Store each password in plaintext so administrators can verify it manually"],0,"Multifactor authentication requires additional proof beyond the password. Even if a password is guessed or stolen, the adversary may still be unable to satisfy the second factor."],
      ]
    },
    {
      id:"u2-lab", unit:"U2",
      stimulus:{
        type:"text",
        title:"Physical Review of a Prototype Laboratory",
        text:"The laboratory stores unreleased device prototypes in a locked interior room. The main employee entrance uses badges, but employees frequently hold the door for people behind them. A public delivery corridor connects to the employee hallway through a door that has no alarm. The prototype room has one camera aimed at the workbench but not at the doorway. Backup power protects the prototype servers for ten minutes.",
        source:"Original synthetic facility-security scenario created for AP Exam Practice; not College Board material."
      },
      questions:[
        ["2.2","1.A","Which condition creates the clearest tailgating vulnerability?",["Employees routinely hold the badge-controlled entrance for people whose credentials they have not verified.","The prototype servers have ten minutes of backup power.","The camera records the prototype workbench.","The laboratory stores devices in an interior room."],0,"Tailgating exploits an authorized person's entry to let an unauthorized person pass a physical access control without presenting the required credential."],
        ["2.3","2.A","Which control most directly addresses unauthorized movement from the public delivery corridor into the employee hallway?",["Add controlled access at the connecting door, such as badge authentication and an access-control vestibule where risk warrants it.","Remove the lock from the prototype room so employees can move through the building more quickly.","Disable backup power to ensure the servers stop whenever building electricity fluctuates.","Aim the existing camera away from entrances so visitors cannot tell which areas are monitored."],0,"The vulnerability is an uncontrolled path from a public area into employee space. Adding appropriate access control at that boundary directly reduces unauthorized entry while preserving necessary movement."],
        ["2.4","3.A","Which camera change would most improve evidence about unauthorized entry to the prototype room?",["Add or reposition coverage so the doorway and people entering the room are visible rather than monitoring only the workbench.","Point the camera only at the ceiling so it cannot record authorized employees.","Move the camera outside the building where it cannot observe the prototype-room entrance.","Replace the camera with a sign stating that the room is secure and no monitoring is necessary."],0,"Detective control placement should capture the event of concern. Monitoring the entrance can provide evidence of who entered and when, while workbench-only coverage can miss the access event itself."],
      ]
    },
    {
      id:"u2-access", unit:"U2",
      stimulus:{
        type:"quantitative",
        title:"Restricted Door Events",
        columns:["Time","Badge","Door","Event"],
        rows:[
          ["18:41","A104","Lab East","Granted"],
          ["18:41","—","Lab East","Door remained open 19 sec"],
          ["18:42","—","Lab East","Motion detected: 2 persons"],
          ["19:07","B233","Lab East","Denied"],
          ["19:08","B233","Lab East","Denied"],
          ["19:09","SEC01","Lab East","Granted"],
        ],
        source:"Original synthetic physical-access log created for AP Exam Practice; not College Board material."
      },
      questions:[
        ["2.4","3.A","Which event combination most strongly suggests that a second person may have entered without presenting a badge?",["One granted badge event followed by a long-open door event and motion indicating two people","Two denied attempts from badge B233 followed later by a security badge grant","A granted event for security badge SEC01 at 19:09","The fact that the events occurred after 18:00"],0,"The granted entry authorizes one credential, while the door-open duration and two-person motion reading provide independent evidence that an additional person may have passed through during the same access event."],
        ["2.2","1.A","What additional evidence would most help determine the impact of the suspected unauthorized entry?",["Information about what assets are behind Lab East and camera or inventory evidence showing what the second person accessed","The favorite color of the authorized badge holder","The manufacturer of the keyboard used by the security team","The weather forecast for a different building several miles away"],0,"Risk impact depends on what assets could be reached and what actually occurred after entry. Asset sensitivity and corroborating physical evidence are directly relevant to the suspected breach."],
        ["2.3","2.A","Which mitigation best addresses the apparent weakness shown by the 18:41 events?",["Use an anti-tailgating control such as a vestibule or turnstile and alert when occupancy conflicts with authenticated entry.","Increase the amount of time the secure door remains open after each successful badge so groups can enter together.","Remove badge authentication and rely on motion detection as the sole method of deciding who may enter.","Ignore door-held-open events because a successful badge means everyone entering during that interval is authorized."],0,"The evidence suggests multiple-person passage on one credential. Controls that enforce one authorized entry per authentication and detect occupancy mismatches directly address that risk."],
      ]
    },
    {
      id:"u3-firewall", unit:"U3",
      stimulus:{
        type:"quantitative",
        title:"Inbound Firewall Rules — First Match Wins",
        columns:["Rule","Action","Protocol","Port","Source"],
        rows:[
          ["1","Allow","TCP","22","198.51.100.10"],
          ["2","Deny","TCP","443","10.0.0.0/8"],
          ["3","Allow","TCP","443","ALL"],
          ["4","Allow","ICMP","ALL","ALL"],
          ["5","Deny","ALL","ALL","ALL"],
        ],
        source:"Original synthetic firewall table created for AP Exam Practice; not College Board material."
      },
      questions:[
        ["3.4","2.A","What happens to inbound TCP traffic for port 443 from source 10.4.8.20?",["It is denied by rule 2 before the later HTTPS allow rule is reached.","It is allowed by rule 3 because later rules always override earlier matches.","It is allowed by rule 1 because SSH and HTTPS use the same destination port.","It is denied by rule 5 only after both rules 2 and 3 are applied to the same packet."],0,"The ACL uses first-match processing. Source 10.4.8.20 is within 10.0.0.0/8 and matches TCP port 443 at rule 2, so that deny action ends evaluation for the traffic."],
        ["3.4","2.A","Which change would allow HTTPS from 10.4.8.20 while preserving the listed rules' other behavior as directly as possible?",["Move the broad HTTPS allow rule before the internal-range HTTPS deny rule if that access is actually required by policy.","Move the final deny-all rule to the top so all traffic is evaluated by the most restrictive rule first.","Change the SSH rule to deny TCP port 22 because HTTPS depends on the SSH port being closed.","Remove the ICMP rule because ICMP controls whether TCP 443 can match an address range."],0,"Under first-match processing, the ordering of overlapping HTTPS rules decides the outcome. If policy truly requires this source to use HTTPS, an appropriate allow must precede the broader matching deny or be made more specific."],
        ["3.1","1.A","What security risk would result from deleting rule 5 without defining another default-deny behavior?",["Traffic not matched by the earlier explicit rules could be permitted by a permissive default, expanding the attack surface beyond stated requirements.","Deleting the rule would cryptographically encrypt all previously denied traffic.","The firewall would become a physical access-control system rather than a network control.","Every device would automatically receive a new IP address because firewall rules assign addressing."],0,"A final deny rule can enforce a default-deny posture. Removing it without another deny-by-default mechanism may allow unspecified traffic, which conflicts with minimizing unnecessary network exposure."],
      ]
    },
    {
      id:"u3-detect", unit:"U3",
      stimulus:{
        type:"quantitative",
        title:"Network Detection Summary",
        columns:["Detector","True attacks detected","Benign events alerted","Novel attack detected"],
        rows:[
          ["Signature","92 of 100","1 of 1,000","No"],
          ["Anomaly","96 of 100","47 of 1,000","Yes"],
          ["Hybrid","99 of 100","22 of 1,000","Yes"],
        ],
        source:"Original synthetic detection-results table created for AP Exam Practice; not College Board material."
      },
      questions:[
        ["3.5","3.A","Which detector has the lowest false-positive burden in the table?",["Signature, because it alerts on only 1 of 1,000 benign events","Anomaly, because it detects the novel attack","Hybrid, because it detects 99 of 100 true attacks","All three, because false positives are determined only by true-attack detections"],0,"False positives are benign events incorrectly alerted as malicious. The signature detector flags 1 of 1,000 benign events, fewer than the anomaly or hybrid approaches in this synthetic comparison."],
        ["3.5","3.A","Which tradeoff is directly supported by the table?",["The anomaly detector catches the novel attack but generates substantially more benign alerts than the signature detector.","The signature detector has both the highest attack-detection rate and the highest benign-alert rate.","The hybrid detector misses every novel attack because it combines two detection approaches.","The table proves anomaly detection can never produce a false negative."],0,"The anomaly method detects the novel attack, unlike the signature method, but it also raises 47 benign alerts versus 1. The evidence illustrates a coverage-versus-false-positive tradeoff."],
        ["3.1","1.A","If the missed attacks primarily exploit previously unseen network behavior, which risk is most relevant when relying only on the signature detector?",["False negatives may allow novel malicious activity to proceed because no known signature matches it.","False positives will necessarily become zero because every novel attack is benign.","The network will be physically inaccessible because signature detection controls building entrances.","Every legitimate packet will be encrypted with an attacker-controlled key by the detector itself."],0,"Signature detection depends on recognized patterns. Novel or modified attacks can fail to match known signatures, creating false negatives that allow malicious activity to go unalerted."],
      ]
    },
    {
      id:"u3-segment", unit:"U3",
      stimulus:{
        type:"text",
        title:"Three-Zone Network Design",
        text:"A company places its public web server in a screened subnet. Employee laptops are on an internal user VLAN. A finance database is on a separate high-security VLAN that accepts database connections only from one application server. Firewalls control traffic between the Internet, screened subnet, user VLAN, and finance VLAN. Network monitoring sensors collect events at the screened-subnet boundary and before the finance VLAN.",
        source:"Original synthetic network architecture created for AP Exam Practice; not College Board material."
      },
      questions:[
        ["3.3","2.A","What is the primary security benefit of placing the finance database in its own restricted VLAN?",["It limits direct reachability and allows stricter controls between ordinary user devices and the sensitive database.","It makes the database publicly reachable from the Internet without passing through a firewall.","It guarantees the database cannot be attacked because VLAN membership eliminates software vulnerabilities.","It causes all employee laptops to share administrator credentials with the finance server."],0,"Segmentation creates a boundary around a more sensitive asset and allows narrower access policy. It reduces direct paths and lateral movement but does not eliminate application or host vulnerabilities."],
        ["3.1","1.A","If the public web server is compromised, which design feature most directly reduces immediate lateral movement to the finance database?",["The web server is isolated in a screened subnet and traffic toward the finance VLAN must cross additional controlled boundaries.","The web server is public, which automatically makes every internal system invisible to it.","The finance database uses a VLAN, so firewalls between zones are unnecessary and cannot affect lateral movement.","The employee laptops are on a separate VLAN, which gives the web server administrator access to the finance database."],0,"The screened subnet and controlled inter-zone paths create additional boundaries an attacker must cross after compromising the web server, reducing the chance that one exposed service directly reaches the database."],
        ["3.5","3.A","Why is a monitoring sensor before the finance VLAN a useful detective control?",["It can observe attempted traffic toward a high-value zone and generate evidence or alerts when access patterns violate expectations.","It prevents every packet from entering the finance VLAN because monitoring sensors are always blocking devices.","It removes the need for firewall rules because detection and prevention are identical controls.","It guarantees that no authorized finance traffic will ever create an alert regardless of detector configuration."],0,"A sensor near a high-value boundary can observe traffic attempting to reach that zone and support detection. Whether it blocks traffic depends on the control type; monitoring does not replace preventive policy."],
      ]
    },
    {
      id:"u4-auth", unit:"U4",
      stimulus:{
        type:"quantitative",
        title:"Endpoint Authentication Log",
        columns:["Time","User","Source","Result"],
        rows:[
          ["01:14","svc-backup","10.2.4.18","Failure"],
          ["01:14","svc-backup","10.2.4.18","Failure"],
          ["01:15","svc-backup","10.2.4.18","Failure"],
          ["01:15","svc-backup","10.2.4.18","Success"],
          ["01:17","admin","10.2.4.18","Failure"],
          ["01:18","admin","10.2.4.18","Failure"],
        ],
        source:"Original synthetic endpoint authentication log created for AP Exam Practice; not College Board material."
      },
      questions:[
        ["4.2","1.A","Which conclusion is best supported by the sequence for svc-backup?",["Repeated failures followed by a success from the same unusual source warrant investigation for credential guessing or compromise.","The successful login proves the earlier failures were harmless and should be removed from the security record.","The events are evidence of wireless jamming because authentication failures occur only when radio frequencies are blocked.","The log proves the password hash was cryptographically reversed by the endpoint operating system."],0,"A cluster of failures followed by success from one source is a meaningful credential-attack indicator, especially for a service account at an unusual time. It requires context and investigation rather than automatic dismissal."],
        ["4.4","3.A","Which next step would most strengthen the investigation?",["Correlate the source with process, network, and account-activity logs around the successful login to see what occurred afterward.","Delete the successful event so the log contains only failed attempts and is easier to read.","Assume the source is malicious and reimage every device in the organization before gathering additional evidence.","Disable all logging because retaining event evidence can create false positives."],0,"Correlating independent endpoint and network evidence can show whether suspicious activity followed the login and helps distinguish compromise from an authorized but unusual event."],
        ["4.2","2.A","Which configuration most directly reduces automated online guessing against these accounts?",["Use strong unique credentials, an appropriate lockout or throttling policy, and multifactor authentication where the account type supports it.","Remove all password requirements so failed logins cannot occur.","Permit unlimited rapid attempts because lockout and throttling help only offline hash attacks.","Store plaintext passwords in the log so analysts can compare each failed guess with the correct value."],0,"Strong credentials, rate-limiting or lockout, and additional factors reduce the effectiveness of online guessing. Plaintext storage or unlimited attempts would worsen credential exposure."],
      ]
    },
    {
      id:"u4-endpoint", unit:"U4",
      stimulus:{
        type:"text",
        title:"Endpoint Incident Timeline",
        text:"09:03 — User downloads a file presented as a required video codec.\n09:05 — The file launches and creates a new process with a misleading system-like name.\n09:07 — The process changes several user files and begins encrypting documents.\n09:08 — Endpoint protection quarantines the process after matching a newly downloaded malware signature.\n09:11 — Analysts learn the workstation missed the vendor's critical operating-system patch released two weeks earlier.",
        source:"Original synthetic endpoint incident timeline created for AP Exam Practice; not College Board material."
      },
      questions:[
        ["4.1","1.A","Which malware behavior in the timeline is most consistent with ransomware?",["The process encrypts user documents after execution.","The endpoint protection downloads a malware signature update.","The user downloads a file described as a codec.","Analysts review the operating-system patch status."],0,"Ransomware commonly restricts access to data by encrypting files and demanding payment or another action. The encryption behavior is the strongest direct indicator among the listed events."],
        ["4.4","3.A","What allowed endpoint protection to identify the malicious process at 09:08?",["The process matched a malware signature available to the detector after its signature database was updated.","The detector proved every file created by the user was malicious because users cannot launch legitimate software.","The detector used the missing operating-system patch as a cryptographic decryption key for the ransomware.","The endpoint protection blocked the process before the malicious file was ever executed, so the timeline after 09:05 could not occur."],0,"The timeline explicitly states that quarantine followed a match with a newly downloaded malware signature. Signature detection recognizes known malicious indicators rather than inferring that all user-launched software is malicious."],
        ["4.3","2.A","Which preventive improvement is most directly supported by the final event?",["Improve timely patch management so known critical operating-system vulnerabilities are remediated before adversaries can continue exploiting them.","Disable operating-system updates because patches reveal vulnerabilities to attackers who otherwise would not know they exist.","Allow users to postpone critical patches indefinitely because anti-malware signatures eliminate the need to fix known vulnerabilities.","Remove endpoint protection after patching because one patched vulnerability means no other malware technique can succeed."],0,"The workstation missed a known critical patch for two weeks. Timely patch management closes documented vulnerabilities and complements, rather than replaces, other endpoint controls."],
      ]
    },
    {
      id:"u5-permissions", unit:"U5",
      stimulus:{
        type:"quantitative",
        title:"Research File Permission Requirement",
        columns:["Entity","Required access"],
        rows:[
          ["Owner: lead","Read, Write"],
          ["Group: research","Read"],
          ["Others","None"],
        ],
        source:"Original synthetic Linux-permission scenario created for AP Exam Practice; not College Board material."
      },
      questions:[
        ["5.2","2.A","Which numeric permission mode best matches the requirement for an ordinary file that does not need execute permission?",["640","777","444","700"],0,"For owner/group/others, 6 grants read+write, 4 grants read, and 0 grants no permissions. Mode 640 therefore matches the stated requirement without adding execute or broader access."],
        ["5.2","2.A","Which security principle is demonstrated by giving the research group read access but not write access?",["Least privilege, because the group receives the access needed to use the file without unnecessary modification rights","Defense by obscurity, because users are protected by not knowing the file name","Availability maximization, because every user receives full control over the file","Password spraying, because the same permission is tested against multiple accounts"],0,"Least privilege means granting exactly the access needed for authorized work and no more. Read-only group access satisfies the stated need without adding unnecessary write capability."],
        ["5.1","1.A","What risk would mode 777 create relative to the requirement?",["Every user category would receive read, write, and execute permission, greatly exceeding the intended access and increasing unauthorized modification risk.","The owner would lose write permission because 7 represents read-only access.","The research group would receive no access because the middle digit controls network ports rather than file permissions.","The file would become encrypted automatically because execute permission enables symmetric cryptography."],0,"Mode 777 grants rwx to owner, group, and others. That violates the stated access policy and creates unnecessary modification and execution rights for users who should have no access."],
      ]
    },
    {
      id:"u5-weblogs", unit:"U5",
      stimulus:{
        type:"quantitative",
        title:"Web Application Requests",
        columns:["Time","Path / input excerpt","Result"],
        rows:[
          ["14:10","/products?id=184","200"],
          ["14:11","/products?id=184 OR 1=1 --","500"],
          ["14:12","/files?name=../../../../etc/passwd","403"],
          ["14:13","/search?q=notebook","200"],
          ["14:14","/search?q=<script>...","400"],
        ],
        source:"Original synthetic application log created for AP Exam Practice; not College Board material."
      },
      questions:[
        ["5.6","3.A","Which request contains the clearest indicator of an attempted SQL injection?",["The 14:11 product request containing OR 1=1 and a SQL comment marker","The 14:10 request using a numeric product identifier","The 14:13 search for notebook","The 14:12 request containing directory-navigation sequences"],0,"Boolean SQL syntax and a comment marker in an input parameter are indicators that the requester may be trying to change database query logic rather than supply an ordinary product identifier."],
        ["5.1","1.A","Which vulnerability would the 14:12 request attempt to exploit if the application unsafely used the path as supplied?",["Directory traversal that allows a crafted path to reach files outside the intended directory","Wireless jamming that blocks the server's radio frequency","Password spraying against multiple user accounts","ARP poisoning of the application's local address table"],0,"Repeated ../ sequences attempt to move up directory levels so a vulnerable application may expose files outside its intended path. That is characteristic of directory traversal."],
        ["5.6","3.A","What is the strongest interpretation of the 403 and 400 results?",["The application appears to have rejected two suspicious requests, but analysts should still review logs and controls because rejection alone does not prove no attack succeeded elsewhere.","The status codes prove the entire application is immune to all injection, traversal, and scripting attacks.","The rejected requests are necessarily legitimate because malicious requests always return a 200 result.","The server should delete the events because blocked attack attempts cannot provide useful indicators of adversary behavior."],0,"A rejection is encouraging evidence that a control acted on the specific requests, but blocked attempts are still useful indicators and do not prove that every variant or other attack path is covered."],
      ]
    },
    {
      id:"u5-crypto", unit:"U5",
      stimulus:{
        type:"text",
        title:"Secure File Exchange and Integrity Check",
        text:"A researcher sends a confidential file to a colleague. The file itself is encrypted with a randomly generated AES key. That AES key is then encrypted with the colleague's public RSA key. After decryption, the colleague computes the file's SHA-256 hash and compares it with a trusted hash value supplied through an authenticated channel.",
        source:"Original synthetic cryptography scenario created for AP Exam Practice; not College Board material."
      },
      questions:[
        ["5.4","2.A","Why is the colleague's public RSA key appropriate for protecting the AES key in this scenario?",["Data encrypted with the colleague's public key can be decrypted using the corresponding private key that the colleague keeps protected.","The public key is secret, so no other sender can obtain it or encrypt information for the colleague.","RSA public keys are the same shared secret as AES keys, so either key can decrypt the same ciphertext directly.","A public key is used only to calculate file hashes and cannot participate in encryption."],0,"Public-key encryption lets a sender protect data for a recipient using the recipient's shareable public key while the matching private key remains under the recipient's control."],
        ["5.3","2.A","What is the role of the randomly generated AES key?",["It is the shared symmetric secret used to encrypt and decrypt the file's contents efficiently.","It is a public checksum that anyone can use to reverse the SHA-256 hash.","It is the colleague's private RSA key copied into the file for distribution.","It is a firewall access-control rule deciding which network port carries the file."],0,"AES is symmetric encryption, so the same secret key protects and recovers the file contents. The scenario then uses asymmetric encryption to protect delivery of that symmetric key."],
        ["5.6","3.A","What does a mismatch between the computed SHA-256 hash and the trusted value establish?",["The file content differs from the content represented by the trusted hash, so its integrity should be investigated.","The hash mismatch identifies the exact person who altered the file and proves that person's motive.","The mismatch means the AES key is necessarily weak even if the file was changed after legitimate decryption.","The mismatch proves the file was read by an unauthorized party even if its contents were never modified."],0,"A cryptographic hash comparison can reveal that content changed, but it does not by itself identify who changed it, why it changed, or whether an unchanged file was viewed without authorization."],
      ]
    }
  ];

  function rotate(values, shift) {
    const n = ((shift % values.length) + values.length) % values.length;
    return values.slice(n).concat(values.slice(0, n));
  }

  sets.forEach((set, setIndex) => {
    const stimulus = set.stimulus;
    set.questions.forEach((entry, questionIndex) => {
      const [topicCode, skill, stem, options, key, explanation] = entry;
      const entries = options.map((text, index) => ({ text, correct:index === key }));
      const moved = rotate(entries, setIndex + questionIndex);
      bank.push({
        id:`apcyber-set-${set.id}-${questionIndex + 1}`,
        unit:set.unit,
        topicCode,
        topic:topicCode,
        skill,
        type:"s",
        stimulusGroupId:`apcyber-set-${set.id}`,
        stimulus,
        q:stem,
        o:moved.map((item) => item.text),
        c:moved.map((item, index) => item.correct ? index : null).filter((index) => index !== null),
        e:explanation,
      });
    });
  });
})();
