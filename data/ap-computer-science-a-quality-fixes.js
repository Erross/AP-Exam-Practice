// AP Computer Science A — targeted quality repairs discovered by adversarial release audit.
(function(){
  "use strict";
  const bank = window.QUESTIONS_AP_COMPUTER_SCIENCE_A || [];
  const byId = new Map(bank.map(q => [q.id, q]));

  function replaceOptions(id, correct, distractors) {
    const q = byId.get(id);
    if (!q) throw new Error(`Missing CSA question for quality repair: ${id}`);
    if (!Array.isArray(q.c) || q.c.length !== 1) throw new Error(`Unexpected CSA key shape: ${id}`);
    const key = q.c[0];
    const options = distractors.slice();
    options.splice(key, 0, correct);
    q.o = options;
  }

  replaceOptions("apcsa-u1-19",
    "It describes available constructors and methods, including their parameters, return values, and intended behavior.",
    [
      "It specifies the internal algorithm used to implement each documented library method.",
      "It chooses a method at run time without considering the method name or argument types.",
      "It permits required arguments to be omitted when a documented method is called."
    ]);

  replaceOptions("apcsa-u1-24",
    "Comments are documentation for readers and are not executable program statements.",
    [
      "Comments execute after the surrounding method has finished running.",
      "Comments are evaluated as boolean expressions before ordinary statements execute.",
      "Comments containing arithmetic symbols change the values computed by nearby expressions."
    ]);

  replaceOptions("apcsa-u1-25",
    "The documentation can mislead readers even though the compiler may accept the program.",
    [
      "The stale comment changes the compiled instructions to match the old algorithm.",
      "The JVM executes the comment instead of the updated statements when their descriptions conflict.",
      "Variable declarations are retyped automatically to agree with the wording of the comment."
    ]);

  replaceOptions("apcsa-u1-27",
    "The parameter lists are identical, so the methods have the same signature.",
    [
      "Different return types make two methods overload correctly even when their parameter lists match.",
      "Java reserves method overloading for constructors rather than ordinary methods.",
      "A parameter type may appear in only one method declaration within a class."
    ]);

  replaceOptions("apcsa-u1-29",
    "The method runs, prints Ready, and then control returns to the statement after the call.",
    [
      "The call produces a String value containing Ready that must be stored by the caller.",
      "The static method requires an instance of its class before it can be invoked.",
      "Execution stops permanently after a void method finishes because it cannot return control."
    ]);

  replaceOptions("apcsa-u1-30",
    "Math.random() returns a double, which cannot be assigned directly to int without an explicit narrowing conversion.",
    [
      "Math.random() is an instance method, so the call is missing a Math object receiver.",
      "Math.random() returns a boolean, which cannot be stored in an int variable.",
      "Static method calls are not permitted on the right side of assignment statements."
    ]);

  replaceOptions("apcsa-u1-34",
    "A class defines a type's attributes and behaviors; an object is a particular instance of that class.",
    [
      "A class is one particular run-time instance, while an object is the source-code definition of the type.",
      "A class stores only primitive data, while an object contains only method definitions.",
      "Objects created from the same class must share one common set of instance-variable values."
    ]);

  replaceOptions("apcsa-u1-35",
    "The objects have the same declared type but may hold different instance-variable values.",
    [
      "Objects created from one class use a shared copy of each instance field instead of per-object state.",
      "A reference variable stores the object's field values directly rather than a reference value.",
      "Reassigning one reference variable also reassigns another variable merely because its declared type matches."
    ]);

  replaceOptions("apcsa-u1-38",
    "a and b store references to the same Book object.",
    [
      "The assignment constructs a second Book object for b with copied field values.",
      "b receives a primitive copy of the object's fields rather than a reference value.",
      "The assignment is illegal because Java reference values cannot be assigned between variables of the same type."
    ]);

  replaceOptions("apcsa-u1-39",
    "No reference to a Widget object.",
    [
      "A newly constructed Widget whose fields contain their default values.",
      "The primitive integer value 0 stored as though it were a Widget object.",
      "A reference that will automatically point to the next Widget object the program constructs."
    ]);

  replaceOptions("apcsa-u1-42",
    "obj must refer to an object before the call is made.",
    [
      "The argument 5 must be converted to double regardless of the method's declared parameter type.",
      "process must be changed from a method into an instance variable before the call.",
      "The call must appear earlier in the source file than the declaration of obj."
    ]);
})();
