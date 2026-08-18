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

  replaceOptions("apcsa-u1-12",
    "The value produced by expression must be assignment-compatible with result's declared type.",
    [
      "The expression must evaluate to the same primitive type as every variable previously declared in the method.",
      "The assignment is valid whenever result was initialized earlier, regardless of the type produced by expression.",
      "The expression may produce any reference type because Java converts reference values to the target type automatically."
    ]);

  replaceOptions("apcsa-u1-19",
    "It describes available constructors and methods, including their parameters, return values, and intended behavior.",
    [
      "It specifies the internal algorithm used to implement each documented library method.",
      "It chooses a method at run time without considering the method name or argument types.",
      "It permits required arguments to be omitted when a documented method is called."
    ]);

  replaceOptions("apcsa-u1-22",
    "// Returns the total number of seconds represented by the given minute count.",
    [
      "// Converts the parameter by multiplying minutes by 60 inside this method implementation.",
      "// Receives an integer parameter and performs arithmetic before returning from the method.",
      "// Uses Java statements to compute a numeric result for the caller of convertMinutes."
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
      "Math.random() is an instance method, so a newly constructed Math receiver is required before the call.",
      "Math.random() returns an integral numeric value, but the assignment fails because int variables require decimal notation.",
      "A static library method may appear in an expression, but its result must first be stored in a String variable."
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

  replaceOptions("apcsa-u2-01",
    "Repeat reading values until the sentinel; for each ordinary value, use a selection to increment the count when the value is below zero.",
    [
      "Read values until the sentinel, but increment the counter before checking whether each value satisfies the negative-value condition.",
      "Use a selection to test the first input value, then reuse that single result for the rest of the input sequence.",
      "Continue reading values until the sentinel while changing each negative input to zero instead of updating a separate counter."
    ]);

  replaceOptions("apcsa-u2-03",
    "The order determines when decisions are made relative to each repeated input or state update.",
    [
      "Placing selection before repetition causes the same initial decision to govern later iterations even when the repeated state changes.",
      "Placing repetition first causes Java to postpone evaluating its contained selection until the loop has already terminated.",
      "The two structures produce identical behavior whenever they use the same condition text, regardless of their nesting order."
    ]);

  replaceOptions("apcsa-u2-12",
    "The nearest preceding unmatched if.",
    [
      "The outermost preceding if in the same method.",
      "Each preceding if in the nested statement receives the same else branch.",
      "The preceding if at the smallest indentation level, regardless of braces."
    ]);

  replaceOptions("apcsa-u2-21",
    "The loop condition stays true and the body never changes any state that can make it false.",
    [
      "The loop condition begins true, but the body changes a control value so the condition eventually becomes false.",
      "The condition is reevaluated after each iteration and depends on a variable that moves toward its terminating boundary.",
      "The body contains several arithmetic statements, so the number of iterations is determined by statement count rather than the condition."
    ]);

  replaceOptions("apcsa-u2-25",
    "Initialize count to 0; loop i from 1 through n; increment count when i % 2 == 0.",
    [
      "Initialize count to n; loop across the range and decrement count when the current value of i is odd.",
      "Start i at 1 and continue while i is even, incrementing both i and count after each iteration.",
      "Increment count during each iteration and use the parity test only to decide whether i should be advanced."
    ]);

  replaceOptions("apcsa-u2-27",
    "Once the first qualifying value is identified, later values cannot change which value was first.",
    [
      "Because the sequence is increasing, the first value above 100 proves that the next value must equal that same value.",
      "Stopping at the first match is valid because a search loop changes later sequence values after a qualifying element is encountered.",
      "The loop may stop because values following the first match are outside the sequence and therefore are not legal search candidates."
    ]);

  replaceOptions("apcsa-u2-30",
    "The largest i is length() - 1, making the exclusive end index i + 1 equal to length(), which is valid.",
    [
      "substring treats its second index as inclusive, so length() identifies the final character rather than the boundary after it.",
      "The loop omits the iteration with i equal to length() - 1, so the expression i + 1 stays below length().",
      "String indexing begins with position 1, making i + 1 the valid index of the character currently being examined."
    ]);

  replaceOptions("apcsa-u2-34",
    "Algorithm B's work grows much faster because its nested comparisons are proportional to n squared.",
    [
      "The algorithms grow at approximately the same rate because each eventually examines the same collection of n elements.",
      "Algorithm A grows faster because a single traversal repeats its comparison operation more often than a nested traversal does.",
      "Algorithm B approaches constant work for large n because the inner comparisons are absorbed into one outer iteration."
    ]);

  replaceOptions("apcsa-u3-01",
    "Define an Account class with private balance data and public methods such as deposit and getBalance.",
    [
      "Keep account balances in separate variables and let each client operation decide independently how those variables should be updated.",
      "Expose the balance field publicly and require client code to reproduce the validation rules before changing account state.",
      "Represent account behavior in comments while storing the associated data in unrelated variables outside any account-specific abstraction."
    ]);

  replaceOptions("apcsa-u3-03",
    "Client code should depend on the method's contract so the implementation can change without requiring client changes.",
    [
      "Client code should reproduce the current method body so later calls remain correct if the method implementation is revised.",
      "The implementation statements define the public interface, so clients should rely on their exact order rather than documented behavior.",
      "Private implementation details become part of the method contract whenever a client calls the method from another class."
    ]);

  replaceOptions("apcsa-u3-06",
    "Early design can make the interface and data model support a broader range of users without costly structural changes later.",
    [
      "Accessibility can be postponed because interface structure has little effect on which users can interact effectively with the program.",
      "Adding accessibility after implementation requires no design changes because Java automatically adapts interfaces to different user needs.",
      "Considering accessibility early mainly reduces source-file size rather than affecting interfaces, data representation, or user interaction."
    ]);

  replaceOptions("apcsa-u3-09",
    "It restricts direct client access so the class can control how its internal state is read or changed.",
    [
      "It prevents methods in the defining class from reading the field unless those methods first create a separate accessor object.",
      "It causes the field to be recreated as a method-local variable whenever an instance method begins executing.",
      "It makes the field immutable after construction, so setter methods cannot change the stored value later."
    ]);

  replaceOptions("apcsa-u3-11",
    "Memory is allocated for a Counter object, its constructor initializes the object, and a reference to it is produced.",
    [
      "The constructor evaluates to the primitive argument value 5, which is returned in place of a Counter reference.",
      "The expression creates a reference variable but postpones constructing the Counter object until an instance method is called.",
      "The constructor initializes class-level data while the new expression returns a reference to the Counter class definition itself."
    ]);

  replaceOptions("apcsa-u3-14",
    "There is an execution path for x <= 0 that reaches the end without returning an int value.",
    [
      "The method is invalid because an if statement in a nonvoid method must include an else branch even when later code returns a value.",
      "The method is invalid because an int parameter cannot be compared with the literal 0 inside a conditional expression.",
      "The return statement is invalid because a nonvoid method must store its result in a local variable before returning it."
    ]);

  replaceOptions("apcsa-u3-15",
    "It is a local variable initialized with the corresponding argument value for that invocation.",
    [
      "It is an alias for any instance field named radius, so assignments to the parameter directly change that field.",
      "It is a class-level variable shared by different invocations of the method until another argument replaces its value.",
      "It is a temporary reference to the caller's argument variable, so reassigning the parameter reassigns the caller's variable."
    ]);

  replaceOptions("apcsa-u3-17",
    "The caller's variable is not reassigned; only the method's local copy of the reference changes.",
    [
      "The caller's reference is reassigned because the parameter and caller variable are two names for the same variable storage.",
      "The original Point object is converted into a new object in place, so both references retain the same variable value.",
      "The assignment changes the declared type of the caller's variable to match the newly constructed Point object."
    ]);

  replaceOptions("apcsa-u3-21",
    "A static method belongs to the class and has no particular current instance whose instance field should be used.",
    [
      "Instance fields exist only during constructor execution, so no method can read them after object construction has finished.",
      "Static methods can read local and static variables but are prohibited from receiving an object reference as a parameter.",
      "An instance field is treated as a compile-time constant unless the method accessing it was declared in the constructor."
    ]);

  replaceOptions("apcsa-u3-22",
    "From its declaration through the end of that enclosing block.",
    [
      "From the start of the surrounding method through its closing brace, including statements before the declaration.",
      "From the declaration through the end of the class, because block-local variables become class members after declaration.",
      "Within sibling blocks of the method as long as those blocks execute after the block containing the declaration."
    ]);

  replaceOptions("apcsa-u3-23",
    "Use an appropriate public method provided by the class, if its interface permits that access.",
    [
      "Copy the private field name into the client class and use that matching declaration to obtain the original object's value.",
      "Cast obj to Object before selecting secret, because the broader reference type bypasses the original class's access restriction.",
      "Declare a local variable named secret in the client and expect Java to bind that variable to the object's hidden field."
    ]);

  replaceOptions("apcsa-u3-27",
    "The parameter named value.",
    [
      "The instance variable named value, because fields take precedence over parameters when an identifier is not qualified with this.",
      "A class variable named value, created implicitly when the parameter and instance field share the same identifier.",
      "A compile-time ambiguity between the parameter and field that requires the method to rename one declaration before it can compile."
    ]);

  replaceOptions("apcsa-u4-03",
    "The system's accuracy and impact may differ across groups because the data are not representative.",
    [
      "The underrepresented population will receive the same accuracy as other groups because model behavior depends on code rather than data coverage.",
      "Increasing the number of source-code statements corrects representation problems even when the training examples remain distributed the same way.",
      "Declaring the training fields private removes representation bias because access control changes how frequently each population appears in the data."
    ]);

  replaceOptions("apcsa-u4-04",
    "Identify what each field represents, its data type, and which records are needed for the intended question.",
    [
      "Treat the fields as interchangeable numeric values first, then infer their meanings from whichever calculations produce convenient results.",
      "Discard column metadata and decide how to interpret each value solely from its position in the first record.",
      "Convert the observations to one common data type before determining whether temperature and precipitation represent different measured quantities."
    ]);

  replaceOptions("apcsa-u4-12",
    "The loop variable receives each element value but does not provide the element's array index for assignment.",
    [
      "An enhanced for loop exposes the array index but makes the loop variable read-only, preventing assignments through that index.",
      "An enhanced for loop copies the entire array before traversal, so changing an indexed element would update only the copy.",
      "The loop variable acts as a reference to each primitive array slot, but assignments are deferred until traversal has finished."
    ]);

  replaceOptions("apcsa-u4-13",
    "Initialize count to 0; traverse a; increment count whenever the current element is less than 0.",
    [
      "Initialize count to a.length; traverse a; decrement count when the current element is negative, then return the result.",
      "Initialize count to 0; inspect the first element and use that sign test to decide how many later elements to count.",
      "Initialize count to 0; traverse the indices and increment count when the index rather than the element value is negative."
    ]);

  replaceOptions("apcsa-u4-18",
    "It tests whether another item is available before the loop attempts to read it.",
    [
      "It rewinds the scanner to the start of the file before each iteration so the next token can be read again.",
      "It converts the upcoming token to an int while checking availability, allowing the body to call nextInt without parsing.",
      "It guarantees that mixing token-oriented and line-oriented Scanner calls preserves the intended whitespace behavior in the remaining input."
    ]);

  replaceOptions("apcsa-u4-27",
    "A removal shifts later elements left, so incrementing the index immediately can skip the element that shifted into the removed position.",
    [
      "A removal shifts later elements right, so the next indexed access revisits the element that was examined before the removal.",
      "Removing an element leaves the list size unchanged until traversal finishes, so indices temporarily refer to empty positions.",
      "The remove method resets the loop-control variable to zero, which can cause earlier elements to be processed a second time."
    ]);

  replaceOptions("apcsa-u4-28",
    "Traverse from the last index down to 0 and remove an element when it is negative.",
    [
      "Traverse from index 0 upward and increment the index an extra time after a removal so shifted elements are not revisited.",
      "Traverse from index 0 upward and replace each negative element with zero, then remove the zeros after the traversal completes.",
      "Traverse the indices in increasing order while removing a negative element and leaving the next index unchanged only for positive values."
    ]);

  replaceOptions("apcsa-u4-30",
    "Traverse the original list carefully by index and advance past both the inserted \"x\" and the original \"a\" after each insertion.",
    [
      "Traverse forward and advance one index after insertion, so the newly inserted element becomes the next element examined by the algorithm.",
      "Use an enhanced for loop and insert into the same ArrayList during traversal because the loop automatically resynchronizes its iterator.",
      "Repeatedly search from index 0 after each insertion without recording processed positions, so earlier matching elements may be handled again."
    ]);

  replaceOptions("apcsa-u4-36",
    "Column-major traversal holds a column fixed while visiting rows before moving to the next column.",
    [
      "Column-major traversal fixes a row and visits its columns before advancing to the next row of the array.",
      "Column-major traversal visits cells in diagonal groups while row-major traversal visits cells in rectangular blocks.",
      "Column-major traversal changes the array's dimensions during iteration so each former row becomes a column before values are read."
    ]);

  replaceOptions("apcsa-u4-37",
    "Initialize sum to 0 and use nested loops to add every grid[r][c] exactly once.",
    [
      "Initialize sum to grid[0][0] and add that same first element once for each remaining row and column position.",
      "Initialize sum to the number of rows plus the number of columns, then return that value without reading the cells.",
      "Initialize sum to 0 and assign each visited cell the current sum before adding the cell's newly assigned value."
    ]);

  replaceOptions("apcsa-u4-39",
    "Initialize max to an actual element such as grid[0][0], then compare all elements.",
    [
      "Initialize max to 0 and compare the elements, which is safe because a nonempty int array necessarily contains a nonnegative value.",
      "Initialize max to the number of rows plus columns, then update it only when an element exceeds that dimension total.",
      "Initialize max to Integer.MIN_VALUE only after the first row has been processed, using 0 while examining that first row."
    ]);

  replaceOptions("apcsa-u4-41",
    "The searchable values must be ordered according to the comparison being used.",
    [
      "The collection must contain a power-of-two number of elements so each midpoint divides the remaining interval evenly.",
      "The target must be present in the collection before the search begins, otherwise the midpoint comparisons are undefined.",
      "The values must be stored in an ArrayList rather than an array because binary search requires resizable storage."
    ]);

  replaceOptions("apcsa-u4-42",
    "The portion strictly to the right of the middle element.",
    [
      "The portion strictly to the left, because larger target values are represented by smaller indices in ascending order.",
      "Both remaining portions, because the midpoint comparison does not provide information about where a larger target could occur.",
      "No remaining portion, because a target greater than the midpoint value indicates that the target is absent from sorted data."
    ]);

  replaceOptions("apcsa-u4-44",
    "It inserts the next value into its appropriate position within the already sorted prefix.",
    [
      "It discards the sorted prefix after comparing the next value and rebuilds that prefix from the unsorted suffix.",
      "It exchanges the first and last elements during each pass, then treats both positions as permanently sorted.",
      "It performs a binary search for each value and leaves the array unchanged when that search finds an insertion position."
    ]);

  replaceOptions("apcsa-u4-45",
    "Correctness is defined by the required final ordering, while algorithms may use different sequences of comparisons and moves.",
    [
      "Two sorting algorithms are considered equivalent only when their comparisons occur in the same order, even if both final arrays are sorted.",
      "Java converts different sorting implementations into a common run-time procedure before execution, so their intermediate states need not match.",
      "A sorting algorithm is correct when it performs the expected number of comparisons, even if its final element ordering differs from another algorithm."
    ]);

  replaceOptions("apcsa-u4-47",
    "A base case and recursive calls that make progress toward that base case.",
    [
      "A constructor that creates a fresh object on each call and a loop that continues until the object becomes null.",
      "A static field storing the call count and an exception handler that terminates the program after a chosen depth.",
      "A sorting step performed before each call and a file-reading step that supplies the argument for the next call."
    ]);

  replaceOptions("apcsa-u4-49",
    "Each nonterminal comparison can discard about half of the remaining interval.",
    [
      "Each recursive call scans the current interval from both ends, discarding one element from each side before the next call.",
      "Each call copies the remaining values into a smaller physical array whose length decreases by one before the next comparison.",
      "Each comparison causes the recursive method to sort the remaining interval, making later searches operate on progressively shorter unsorted data."
    ]);

  replaceOptions("apcsa-u4-51",
    "Binary search locates a target in ordered data, while merge sort recursively rearranges all data into sorted order.",
    [
      "Binary search rearranges the collection around a midpoint, while merge sort locates one requested target without changing element order.",
      "Both algorithms primarily locate a single target, but merge sort uses recursion while binary search must use iteration.",
      "Binary search and merge sort perform the same sorting task; they differ mainly in whether their comparisons begin at the midpoint or the ends."
    ]);
})();
