// AP Computer Science A — original, unofficial practice bank for the revised framework effective Fall 2025.
// The course remains draft until the full bank and all release gates pass.
(function(){
  "use strict";
  window.AP_COMPUTER_SCIENCE_A_TOPICS = [
    ["U1","1.1","Introduction to Algorithms, Programming, and Compilers"],
    ["U1","1.2","Variables and Data Types"],
    ["U1","1.3","Expressions and Output"],
    ["U1","1.4","Assignment Statements and Input"],
    ["U1","1.5","Casting and Range of Variables"],
    ["U1","1.6","Compound Assignment Operators"],
    ["U1","1.7","Application Program Interface (API) and Libraries"],
    ["U1","1.8","Documentation with Comments"],
    ["U1","1.9","Method Signatures"],
    ["U1","1.10","Calling Class Methods"],
    ["U1","1.11","Math Class"],
    ["U1","1.12","Objects: Instances of Classes"],
    ["U1","1.13","Object Creation and Storage (Instantiation)"],
    ["U1","1.14","Calling Instance Methods"],
    ["U1","1.15","String Manipulation"],
    ["U2","2.1","Algorithms with Selection and Repetition"],
    ["U2","2.2","Boolean Expressions"],
    ["U2","2.3","if Statements"],
    ["U2","2.4","Nested if Statements"],
    ["U2","2.5","Compound Boolean Expressions"],
    ["U2","2.6","Comparing Boolean Expressions"],
    ["U2","2.7","while Loops"],
    ["U2","2.8","for Loops"],
    ["U2","2.9","Implementing Selection and Iteration Algorithms"],
    ["U2","2.10","Implementing String Algorithms"],
    ["U2","2.11","Nested Iteration"],
    ["U2","2.12","Informal Run-Time Analysis"],
    ["U3","3.1","Abstraction and Program Design"],
    ["U3","3.2","Impact of Program Design"],
    ["U3","3.3","Anatomy of a Class"],
    ["U3","3.4","Constructors"],
    ["U3","3.5","Methods: How to Write Them"],
    ["U3","3.6","Methods: Passing and Returning References of an Object"],
    ["U3","3.7","Class Variables and Methods"],
    ["U3","3.8","Scope and Access"],
    ["U3","3.9","this Keyword"],
    ["U4","4.1","Ethical and Social Issues Around Data Collection"],
    ["U4","4.2","Introduction to Using Data Sets"],
    ["U4","4.3","Array Creation and Access"],
    ["U4","4.4","Array Traversals"],
    ["U4","4.5","Implementing Array Algorithms"],
    ["U4","4.6","Using Text Files"],
    ["U4","4.7","Wrapper Classes"],
    ["U4","4.8","ArrayList Methods"],
    ["U4","4.9","ArrayList Traversals"],
    ["U4","4.10","Implementing ArrayList Algorithms"],
    ["U4","4.11","2D Array Creation and Access"],
    ["U4","4.12","2D Array Traversals"],
    ["U4","4.13","Implementing 2D Array Algorithms"],
    ["U4","4.14","Searching Algorithms"],
    ["U4","4.15","Sorting Algorithms"],
    ["U4","4.16","Recursion"],
    ["U4","4.17","Recursive Searching and Sorting"],
  ];
  window.QUESTIONS_AP_COMPUTER_SCIENCE_A = [];
  const titleByCode=new Map(window.AP_COMPUTER_SCIENCE_A_TOPICS.map(x=>[x[1],x[2]]));
  window.__APCSA_ADD=function(q){
    const key=q.correctIndex==null?0:q.correctIndex;
    const options=q.options||[q.correct,...q.distractors];
    window.QUESTIONS_AP_COMPUTER_SCIENCE_A.push({
      id:q.id, unit:q.unit, topicCode:q.topicCode, topic:titleByCode.get(q.topicCode), skill:String(q.skill),
      type:"s", stimulusGroupId:q.stimulusGroupId||null, stimulus:q.stimulus||null,
      provenance:q.provenance||"Original AP Exam Practice item aligned to the AP Computer Science A CED effective Fall 2025.",
      q:q.q, o:options, c:[key], e:q.e
    });
  };
})();
