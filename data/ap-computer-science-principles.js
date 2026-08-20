// AP Computer Science Principles — original Section I practice bank.
//
// Current CED topic/skill alignment was checked 2026-08-20 against:
// https://apcentral.collegeboard.org/media/pdf/ap-computer-science-principles-course-and-exam-description.pdf
// Every topic has four distinct assessed facets. Each facet has two alternate
// wordings in one variantGroupId, so a delivered exam can use at most one form
// of that narrow task while retaining substantial retake diversity.
(function () {
  "use strict";

  const topics = [
    {
      unit:"U1", code:"1.1", topic:"Collaboration", skills:["1.C","1.C","1.C","1.C"],
      context:"A four-person team divides interface, data, testing, and accessibility work, then reviews one another's changes before each release.",
      evidence:"Two teams solve the same design problem. The team that records decisions and solicits feedback from people with different experiences finds several usability assumptions the other team misses.",
      truths:[
        "Collaboration can improve a computing solution by bringing different perspectives, skills, and experiences into the development process.",
        "Useful collaboration includes giving and incorporating feedback rather than merely splitting work into isolated pieces.",
        "A collaborative process benefits from shared conventions and records that help contributors coordinate changes and resolve disagreements.",
        "Crowdsourced or distributed contributions can expand the range of ideas, but the resulting work still needs evaluation and integration."
      ],
      wrongs:[
        "Collaboration guarantees that the final solution is correct because majority agreement eliminates design errors.",
        "Collaboration is effective only when every contributor writes the same portion of the program independently.",
        "Once tasks are divided among team members, feedback between contributors is unnecessary and usually slows development.",
        "Using more contributors removes the need to document decisions because each participant can infer what the others intended."
      ],
      why:"The CED treats collaboration as a development practice whose value comes from complementary perspectives, feedback, and coordinated contributions, not from automatic correctness."
    },
    {
      unit:"U1", code:"1.2", topic:"Program Function and Purpose", skills:["1.A","4.A","3.A","1.A"],
      context:"A transit app accepts a starting stop and destination, consults route data, and displays a suggested trip with estimated transfers.",
      evidence:"A user enters two locations, the program processes stored route information, and the screen displays an itinerary that helps the user choose a trip.",
      truths:[
        "A program's purpose describes the problem it addresses or the experience it provides, while its function describes what the program does to accomplish that purpose.",
        "Inputs supply information to a program and outputs communicate or enact results produced by processing that information.",
        "A code segment can have a specific function that contributes to, but is narrower than, the overall purpose of the complete program.",
        "Describing a program requires distinguishing what information enters it, what processing occurs, and what observable result is produced."
      ],
      wrongs:[
        "A program's purpose is determined solely by the programming language used to implement it.",
        "An output is any value stored internally, even when the program never communicates or uses that value outside the calculation.",
        "Every code segment in a program must independently perform the complete purpose of the entire application.",
        "A program cannot have a meaningful purpose unless every user supplies exactly the same input values."
      ],
      why:"Program analysis separates user-facing purpose from the functions of code and traces how inputs are processed into outputs; implementation language alone does not determine purpose."
    },
    {
      unit:"U1", code:"1.3", topic:"Program Design and Development", skills:["1.B","1.C","4.A","1.B"],
      context:"A student team releases a small prototype, observes where users struggle, revises the interface, and repeats the cycle before adding optional features.",
      evidence:"Early testing shows that users understand the main calculation but repeatedly miss a navigation control. The team moves that control, retests, and documents the change before expanding the program.",
      truths:[
        "An iterative development process creates, tests, and refines portions of a solution repeatedly rather than requiring the entire program to be finished before feedback.",
        "Program requirements and user needs can guide design choices, and prototypes can expose assumptions before a full implementation is complete.",
        "Testing during development can reveal usability and logic problems early enough for the design to be revised deliberately.",
        "Documentation of design decisions and program behavior helps collaborators understand, maintain, and extend a computing solution."
      ],
      wrongs:[
        "An iterative process requires developers to discard the entire program after every round of testing and begin again from nothing.",
        "Program design should avoid user feedback until implementation is complete so requirements cannot change during development.",
        "Testing is useful only after every planned feature has been implemented because partial programs cannot reveal design problems.",
        "Documentation is unnecessary when the original programmer remembers the intended behavior of the current version."
      ],
      why:"The development process is iterative and evidence-driven: requirements, prototypes, testing, feedback, and documentation support purposeful refinement instead of a single irreversible build step."
    },
    {
      unit:"U1", code:"1.4", topic:"Identifying and Correcting Errors", skills:["4.C","4.C","1.B","4.C"],
      context:"A program correctly handles typical positive values but produces an incorrect total when an empty list is supplied, so the developer constructs targeted tests around that condition.",
      evidence:"For three ordinary inputs, actual output equals expected output. For the boundary input 0, the program returns 1 when the specification says it should return 0.",
      truths:[
        "A logic error can allow a program to run while producing behavior or output that does not match the specification.",
        "A useful test case pairs a chosen input with an expected result so actual behavior can be compared with what the algorithm should do.",
        "Boundary and unusual inputs can reveal errors that are not exposed by testing only typical cases.",
        "Debugging can isolate a faulty condition or statement by reproducing an error with controlled inputs and examining intermediate behavior."
      ],
      wrongs:[
        "If a program runs without a syntax error, its algorithm must satisfy the specification for every possible input.",
        "A test case is useful only when the programmer does not know what output the program is expected to produce.",
        "Testing several ordinary values proves that boundary values and empty inputs will behave correctly as well.",
        "The most reliable debugging strategy is to change many unrelated statements at once and keep whichever version happens to run."
      ],
      why:"Correctness is checked against specified behavior, not merely successful execution; deliberate test cases and controlled debugging are needed to expose and isolate logic defects."
    },
    {
      unit:"U2", code:"2.1", topic:"Binary Numbers", skills:["1.D","2.B","3.C","1.D"],
      context:"A sensor stores a nonnegative whole-number reading using a fixed number of bits, with each bit position representing a power of two.",
      evidence:"The bit pattern 10110 uses place values 16, 8, 4, 2, and 1; the positions containing 1 contribute 16 + 4 + 2 to the represented value.",
      truths:[
        "Binary represents values using two symbols, and each position in a binary integer has a place value that is a power of two.",
        "Converting a binary integer to decimal can be done by summing the place values corresponding to bit positions that contain 1.",
        "Using a fixed number of bits limits how many distinct bit patterns, and therefore how many distinct values, can be represented.",
        "Increasing the number of available bits increases the number of distinct values that can be encoded without changing the underlying information represented by existing patterns."
      ],
      wrongs:[
        "Binary place values increase by powers of ten because binary numbers are displayed with decimal digits.",
        "A binary integer is converted to decimal by counting the number of 1 bits and ignoring their positions.",
        "A fixed-width binary representation can encode an unlimited number of distinct nonnegative integers as long as leading zeros are allowed.",
        "Adding a bit to a representation forces every previously representable value to change its mathematical value."
      ],
      why:"Binary is a positional base-two representation. Place values, bit width, and the number of possible patterns determine how integers are encoded and what ranges are representable."
    },
    {
      unit:"U2", code:"2.2", topic:"Data Compression", skills:["1.D","1.D","1.D","1.D"],
      context:"A photo-sharing service must reduce file sizes for transmission while deciding whether every original pixel value must be recoverable after decompression.",
      evidence:"Method A reconstructs the original file exactly but saves less space. Method B produces a much smaller image file while discarding detail that cannot be recovered.",
      truths:[
        "Lossless compression permits the original data to be reconstructed exactly, whereas lossy compression discards some information to reduce size further.",
        "The appropriate compression method depends on requirements such as acceptable quality loss, storage limits, and whether exact reconstruction is necessary.",
        "Compression can exploit repeated or predictable structure in data so that the same information is represented with fewer bits.",
        "A smaller compressed file can reduce storage and transmission requirements, but compression does not create additional information that was absent from the source."
      ],
      wrongs:[
        "Lossy compression guarantees exact reconstruction because the decompressor can infer every discarded detail from the remaining bits.",
        "The best compression method is always the one with the smallest file, regardless of whether the application requires exact recovery.",
        "Compression reduces file size by changing the meaning of all data values rather than by using a more efficient representation.",
        "Compressing a file necessarily increases the amount of information contained in the original data."
      ],
      why:"Compression is a representation tradeoff. Lossless methods preserve exact recoverability; lossy methods may sacrifice detail for size, and suitability depends on the application's requirements."
    },
    {
      unit:"U2", code:"2.3", topic:"Extracting Information from Data", skills:["5.B","5.D","5.B","5.D"],
      context:"A city combines several years of transit records, cleans inconsistent station names, and examines patterns between time of day, delays, and passenger counts.",
      evidence:"After duplicate records are removed, a scatterplot shows that days with heavier ridership often also have longer delays, but the dataset does not record weather or service disruptions.",
      truths:[
        "Cleaning and transforming data can make patterns easier to analyze, but those operations should preserve the meaning of the observations used for the question being studied.",
        "Patterns and correlations in a dataset can generate useful knowledge without by themselves establishing that one measured variable caused another.",
        "The conclusions supported by a dataset depend on what was measured, how the data were collected, and which observations are represented or missing.",
        "Collecting more attributes can enable new analyses while also increasing privacy and interpretation concerns about the gathered data."
      ],
      wrongs:[
        "Once a dataset has been cleaned, every pattern discovered in it can be interpreted as a causal relationship.",
        "A correlation between two measured variables proves that changing the first variable will produce the observed change in the second.",
        "A dataset supports conclusions about any population even when its collection process systematically excludes part of that population.",
        "Gathering additional personal attributes can only improve an analysis and does not introduce any privacy or bias considerations."
      ],
      why:"Data analysis can reveal patterns and support claims, but conclusions remain bounded by collection methods, representation, missing variables, and the distinction between association and causation."
    },
    {
      unit:"U2", code:"2.4", topic:"Using Programs with Data", skills:["2.B","5.B","2.B","5.B"],
      context:"A program imports a table of school-energy readings, filters records to one month, computes daily averages, and creates a chart for comparison.",
      evidence:"The raw file contains timestamps and meter values. A program selects records from weekdays, groups them by date, computes a mean for each date, and outputs a new summary table.",
      truths:[
        "Programs can transform, filter, aggregate, and visualize data to create representations that help answer specific questions.",
        "A data-processing program should apply operations that match the intended analysis; changing which records are included can change the knowledge produced.",
        "Using a structured representation makes it possible for an algorithm to access fields consistently and perform repeated operations across many records.",
        "A program can automate repeated data operations, but the validity of its output still depends on the quality of the input data and the appropriateness of the algorithm."
      ],
      wrongs:[
        "A program that visualizes data automatically proves that every visible pattern is statistically or causally meaningful.",
        "Filtering records cannot affect an analysis because all programs preserve the same conclusions regardless of which data are retained.",
        "Structured data prevents an algorithm from processing multiple records because each field must be interpreted manually by a user.",
        "Automating a data analysis guarantees correct conclusions even when the source data are incomplete or the algorithm answers a different question."
      ],
      why:"Programs are tools for manipulating and representing data. Their outputs reflect both the source data and the chosen transformations, so automation does not remove questions of validity or interpretation."
    },
    {
      unit:"U3", code:"3.1", topic:"Variables and Assignments", skills:["3.A","4.B","4.B","3.A"],
      context:"A program stores score in a variable, increases score after an event, and later uses the updated value when displaying the player's total.",
      evidence:"The code performs x ← 4, then x ← x + 3, then displays x. The second assignment uses the current value of x before replacing it with the new result.",
      truths:[
        "A variable associates a name with a value that a program can use and, when permitted, replace through later assignments.",
        "An assignment evaluates the expression on its right and stores that resulting value in the variable named on its left.",
        "When an assignment uses the variable being updated, the expression is evaluated using the variable's current value before the new value is stored.",
        "Variables provide an abstraction that lets an algorithm refer to changing data by meaningful names instead of hard-coding one value everywhere it is used."
      ],
      wrongs:[
        "Once a variable receives its first value, later assignment statements cannot change the value associated with that variable.",
        "An assignment statement compares two values for equality and never changes the program's stored state.",
        "In x ← x + 3, the new value of x must be known before the expression x + 3 can be evaluated.",
        "Using variables makes an algorithm less general because every occurrence must be replaced manually when input data change."
      ],
      why:"Assignments update program state by evaluating expressions and storing results. Variables abstract data so the same algorithm can operate on values that differ across time or inputs."
    },
    {
      unit:"U3", code:"3.2", topic:"Data Abstraction", skills:["3.A","3.B","3.C","3.B"],
      context:"A program stores hundreds of daily temperatures in one list and passes that list to procedures that compute summaries and locate unusual readings.",
      evidence:"Version A uses separate variables temp1 through temp100 and repeats nearly identical statements. Version B stores all readings in a list and traverses that list with one algorithm.",
      truths:[
        "A list is a data abstraction that can represent multiple related values with one name while allowing elements to be accessed by position.",
        "Using a collection can manage complexity by letting one algorithm operate on many elements instead of requiring separate code for each stored value.",
        "A useful data abstraction hides some representation details so programmers can reason about a collection through supported operations rather than every individual storage decision.",
        "Replacing many individually named values with an appropriate list can make a program easier to scale when the number of data items changes."
      ],
      wrongs:[
        "A list can store only one value at a time, so using it cannot replace multiple related variables.",
        "Using a collection increases complexity because an algorithm must contain a separate hard-coded statement for every possible element.",
        "Data abstraction requires every procedure to know the exact memory location used to store each element in the collection.",
        "A program using a list must be rewritten whenever the list contains a different number of elements, even when the traversal logic is unchanged."
      ],
      why:"Data abstraction groups related values behind a manageable representation. Collections such as lists allow algorithms to operate on variable-size data without duplicating code for each element."
    },
    {
      unit:"U3", code:"3.3", topic:"Mathematical Expressions", skills:["2.A","2.B","4.B","2.B"],
      context:"A pricing program computes a subtotal, applies a percentage discount, and then calculates tax from the discounted amount using arithmetic expressions.",
      evidence:"The expression (8 + 4) * 3 groups the addition before multiplication, while 8 + 4 * 3 follows the language's operator precedence and produces a different result.",
      truths:[
        "Arithmetic expressions combine numeric values and operators, and parentheses can be used to make the intended order of evaluation explicit.",
        "An algorithm can use arithmetic expressions to compute new values from variables rather than requiring each possible result to be stored in advance.",
        "The result of an expression depends on operator semantics and evaluation order, so changing grouping can change the value produced.",
        "Mathematical operations in an algorithm should be selected to model the quantity being computed, including units and any needed conversion or scaling."
      ],
      wrongs:[
        "Parentheses in an arithmetic expression are decorative and cannot affect which operations are evaluated first.",
        "An algorithm can perform arithmetic only on literal constants and cannot use values stored in variables.",
        "Changing the grouping of arithmetic operations never changes the result because addition and multiplication are interchangeable in every expression.",
        "Any arithmetic expression is a valid model for a quantity even when its operations combine incompatible units or apply the wrong scaling."
      ],
      why:"Mathematical expressions are executable parts of algorithms. Correct results depend on operator behavior, grouping, variable values, and whether the expression actually models the intended quantity."
    },
    {
      unit:"U3", code:"3.4", topic:"Strings", skills:["4.B","4.B","4.B","4.B"],
      context:"A program combines a user's first and last names with a separator, extracts selected characters from an identifier, and compares text values.",
      evidence:"If first contains " + JSON.stringify("Ada") + " and last contains " + JSON.stringify("Lovelace") + ", concatenating first, a space, and last produces one longer string while leaving the original variables available.",
      truths:[
        "A string represents a sequence of characters that a program can store, compare, combine, and process using string operations.",
        "Concatenation creates a string by joining character sequences in a specified order rather than performing numeric addition on their text.",
        "String operations can examine or extract portions of text, allowing algorithms to process structured information encoded as characters.",
        "The same visible digits can behave differently when represented as text instead of numeric data because string operations follow character-sequence semantics."
      ],
      wrongs:[
        "A string can contain only alphabetic letters and therefore cannot represent spaces, punctuation, or digit characters.",
        "Concatenating two strings performs ordinary arithmetic whenever either string contains characters that look like numbers.",
        "Programs cannot inspect part of a string; any operation must replace or consume the entire character sequence at once.",
        "The text " + JSON.stringify("12") + " and the number 12 are always interchangeable because their displayed characters look the same."
      ],
      why:"Strings are ordered character sequences with their own operations. Concatenation, comparison, and extraction manipulate text, which is distinct from applying arithmetic to numeric values."
    },
    {
      unit:"U3", code:"3.5", topic:"Boolean Expressions", skills:["2.B","4.B","4.B","2.B"],
      context:"An access rule checks whether a user is an administrator OR is both a project member AND has completed required training.",
      evidence:"For a condition A AND B, the result is true only when both component conditions are true; for A OR B, a true component is sufficient for the compound expression to be true.",
      truths:[
        "A Boolean expression evaluates to true or false and can combine relational comparisons with logical operators such as AND, OR, and NOT.",
        "The meaning of a compound Boolean expression depends on how its component conditions are grouped as well as on the operators connecting them.",
        "NOT reverses a Boolean value, so applying it to a condition changes true to false and false to true.",
        "Boolean expressions allow programs to represent decision criteria explicitly so conditional statements can choose behavior based on current data."
      ],
      wrongs:[
        "A Boolean expression must produce a number, and true or false values cannot be stored or evaluated by a program.",
        "AND and OR always produce the same result because both operators combine two Boolean conditions.",
        "Applying NOT to a condition leaves its truth value unchanged and only changes how the expression is displayed.",
        "Conditional statements cannot use compound Boolean expressions and must compare exactly one variable with one constant."
      ],
      why:"Boolean logic represents decision conditions. Relational results, logical operators, grouping, and negation determine the truth value that controls later program behavior."
    },
    {
      unit:"U3", code:"3.6", topic:"Conditionals", skills:["2.A","2.B","4.B","2.B"],
      context:"A ticketing program applies a student discount when a Boolean eligibility condition is true and otherwise charges the standard price.",
      evidence:"An IF statement executes its first branch when the condition is true; an ELSE branch provides an alternative path when that condition is false.",
      truths:[
        "A conditional allows an algorithm to execute different statements depending on whether a Boolean condition is true or false.",
        "An if/else structure can represent mutually exclusive alternatives when exactly one of two behaviors should occur for a given evaluation.",
        "Determining a conditional's result requires evaluating its condition using the current variable values and then following the corresponding branch.",
        "Conditionals make an algorithm responsive to input or state without requiring separate complete programs for every possible case."
      ],
      wrongs:[
        "A conditional executes all of its branches regardless of the condition because each branch is part of the program text.",
        "An if/else structure requires both branches to run before the program can continue to the next statement.",
        "The result of a conditional can be determined without knowing the values used by its Boolean condition.",
        "Using a conditional prevents a program from responding to different inputs because the chosen branch is fixed before execution begins."
      ],
      why:"Conditionals implement selection. A Boolean condition is evaluated at runtime, and its truth value determines which branch executes and therefore which behavior the algorithm produces."
    },
    {
      unit:"U3", code:"3.7", topic:"Nested Conditionals", skills:["2.B","4.B","4.B","2.B"],
      context:"A shipping program first checks whether an order is international and, only within that branch, checks whether its weight exceeds an additional customs threshold.",
      evidence:"The inner IF statement is reached only after the outer condition selects the branch containing it, so some inputs never evaluate the inner condition at all.",
      truths:[
        "A nested conditional places one conditional inside a branch of another, allowing decisions to depend on an earlier decision path.",
        "To trace nested conditionals, evaluate the outer condition first and then evaluate only conditions in the branch that actually executes.",
        "Nested conditionals can represent multi-stage decision rules when a later criterion is relevant only for some earlier cases.",
        "Changing the nesting or order of conditions can change program behavior when the conditions are not logically equivalent."
      ],
      wrongs:[
        "In nested conditionals, every inner condition is evaluated before the outer condition so the program knows which outer branch to choose.",
        "Tracing nested conditionals requires evaluating conditions in branches that the outer decision did not select.",
        "Nested conditionals cannot represent dependent decisions because every condition must apply to every possible input.",
        "Rearranging nested conditions never changes a program's behavior because all conditional structures with the same comparisons are equivalent."
      ],
      why:"Nesting creates dependent control flow. Only the selected outer path is followed, so tracing and designing the logic requires respecting branch order and which later tests are reachable."
    },
    {
      unit:"U3", code:"3.8", topic:"Iteration", skills:["2.A","2.B","4.B","2.B"],
      context:"A program traverses a list of daily sales and repeatedly adds each value to a running total before computing an average.",
      evidence:"A loop initializes total to 0, repeats once for each list element, adds the current element to total, and then uses the final total after the traversal ends.",
      truths:[
        "Iteration repeats a sequence of statements, either for a specified collection or count or while a continuation condition remains true.",
        "A loop can accumulate information by updating a variable during each repetition, such as adding each list element to a running total.",
        "Tracing a loop requires tracking how relevant variables change from one iteration to the next and when the repetition stops.",
        "Iteration reduces duplicated code when the same operation must be applied repeatedly to different data or until a condition changes."
      ],
      wrongs:[
        "Iteration executes its body exactly once, so repeated processing requires copying the same statements manually.",
        "A running-total variable must be reset to zero inside every loop iteration or no values can be accumulated.",
        "The final result of a loop can be determined without considering updates made during earlier repetitions.",
        "Using a loop increases duplication because the repeated operation must be written separately for every possible element."
      ],
      why:"Iteration is controlled repetition. Loops can traverse collections, maintain changing state such as accumulators, and express repeated work without duplicating the same code."
    },
    {
      unit:"U3", code:"3.9", topic:"Developing Algorithms", skills:["1.D","2.A","2.B","1.D"],
      context:"A team needs an algorithm that finds the largest value in a nonempty list without assuming how many elements the list contains.",
      evidence:"One proposed algorithm initializes best to the first item and scans the remaining items, replacing best whenever a larger value is found; another compares only the first and last items.",
      truths:[
        "An algorithm is a finite sequence of steps that can be followed to accomplish a task or solve a specified problem.",
        "A good algorithm must satisfy the problem's requirements for the relevant range of inputs, not merely work for one example.",
        "Algorithms can be represented in pseudocode or other precise forms without depending on the syntax of a particular programming language.",
        "When several algorithms solve the same problem, requirements such as correctness, efficiency, or resource use can guide which solution is preferable."
      ],
      wrongs:[
        "An algorithm may rely on undefined steps because a computer can infer any missing operation from the intended final answer.",
        "An algorithm is correct if it works for one sample input even when other valid inputs violate its assumptions.",
        "An algorithm cannot be described until a particular programming language and machine instruction set have been chosen.",
        "If two algorithms eventually produce a result, there is no meaningful basis for comparing their suitability for a problem."
      ],
      why:"Algorithm development begins with a well-defined task and requires a finite, precise, correct process. Multiple correct approaches can still differ in efficiency or suitability."
    },
    {
      unit:"U3", code:"3.10", topic:"Lists", skills:["2.B","4.B","4.B","2.B"],
      context:"A playlist program stores song titles in a list, accesses entries by position, appends new titles, and traverses the collection to display every item.",
      evidence:"Starting with [" + JSON.stringify("red") + ", " + JSON.stringify("blue") + "], an append operation adds a new element to the collection while retaining the existing elements in their order.",
      truths:[
        "A list stores an ordered collection of elements that can be accessed and processed through list operations and traversal.",
        "List operations can add, remove, or access elements, and those changes can affect later positions and traversal results.",
        "An algorithm that traverses a list can perform the same operation on each element without knowing every element's value in advance.",
        "Lists support data abstraction by allowing one variable to represent a collection whose contents or length can vary during execution."
      ],
      wrongs:[
        "A list is an unordered single value, so a program cannot distinguish one stored element from another by position.",
        "Adding or removing an element from a list cannot affect later traversal because list contents are fixed when the program begins.",
        "A list traversal requires the programmer to write a separate statement naming the literal value of every element before execution.",
        "A list cannot manage changing collections because its length and contents must remain identical for every run of a program."
      ],
      why:"Lists are ordered collections with operations that support access, modification, and traversal. They let algorithms process variable collections through one abstraction rather than many separate variables."
    },
    {
      unit:"U3", code:"3.11", topic:"Binary Search", skills:["1.A","1.D","1.D","1.A"],
      context:"A program searches a sorted list of 1,024 names by comparing the target with the middle element and discarding the half that cannot contain the target.",
      evidence:"Because the list is sorted, a comparison with the middle element can eliminate roughly half of the remaining candidates after each unsuccessful step.",
      truths:[
        "Binary search relies on the search data being ordered so that one comparison can determine which half of the remaining range may contain the target.",
        "Binary search repeatedly narrows the candidate interval, typically eliminating about half of the remaining elements after each comparison.",
        "For a large sorted list, binary search can require far fewer comparisons than checking elements one by one from the beginning.",
        "If the data are not ordered according to the comparison being used, discarding half the list can remove the target and make binary search invalid."
      ],
      wrongs:[
        "Binary search works the same way on an unsorted list because the middle element always reveals which half contains the target.",
        "Binary search must examine every element in sequence before it can conclude that a target is absent.",
        "Binary search is guaranteed to use more comparisons than a linear scan because it repeatedly computes middle positions.",
        "The order of the data is irrelevant to binary search because the algorithm never uses comparisons to eliminate a range."
      ],
      why:"Binary search gains efficiency from sorted order. Each comparison narrows the valid search interval; without the ordering invariant, eliminating half the candidates is not logically justified."
    },
    {
      unit:"U3", code:"3.12", topic:"Calling Procedures", skills:["3.B","4.B","4.B","3.B"],
      context:"A program defines a procedure calculateArea(width, height) and calls it from several parts of an application with different argument values.",
      evidence:"A call supplies arguments to a named procedure, the procedure executes its defined steps using the corresponding parameters, and it may return a value to the calling code.",
      truths:[
        "Calling a procedure transfers control to the procedure's defined steps and can supply argument values that correspond to its parameters.",
        "A procedure can be called multiple times with different arguments, allowing the same algorithmic behavior to be reused with different data.",
        "A procedure call can return a value that the calling code stores or uses as part of a larger expression when the procedure is defined to produce a result.",
        "Procedural abstraction lets a caller use a named operation without reproducing or reasoning through every implementation step at each call site."
      ],
      wrongs:[
        "Calling a procedure permanently replaces the caller's program with the procedure and prevents execution from continuing afterward.",
        "A procedure can be called only once because its parameter values become fixed after the first invocation.",
        "A procedure that returns a value cannot have that result used by another expression or stored in a variable.",
        "Using a named procedure requires every caller to duplicate all of the procedure's internal statements before the call can execute."
      ],
      why:"Procedure calls reuse defined behavior through parameters, arguments, and optional return values. The abstraction lets calling code depend on what the procedure does without duplicating its implementation."
    },
    {
      unit:"U3", code:"3.13", topic:"Developing Procedures", skills:["3.B","3.C","3.B","3.C"],
      context:"A program has repeated code that validates a score range in five places, so the developer creates one parameterized procedure and calls it wherever validation is needed.",
      evidence:"After common behavior is moved into one procedure, a rule change is implemented once in the procedure rather than through five separate edits that could become inconsistent.",
      truths:[
        "A procedure can encapsulate a named algorithm and use parameters so the same implementation works with different argument values.",
        "Procedural abstraction manages complexity by separating what an operation accomplishes from the details of how its steps are implemented.",
        "Moving repeated behavior into an appropriate procedure can reduce duplicated code and make later changes more consistent.",
        "Well-chosen procedure parameters expose the information an operation needs while avoiding unnecessary dependence on unrelated program state."
      ],
      wrongs:[
        "A useful procedure must contain code copied from every call site and cannot accept parameters that vary between calls.",
        "Procedural abstraction increases complexity by requiring callers to understand every internal statement before using the procedure.",
        "Repeated code is easier to maintain when every copy is edited separately rather than sharing one procedure definition.",
        "A procedure should depend on as much unrelated global state as possible so callers do not need to supply relevant arguments."
      ],
      why:"Procedural abstraction packages reusable behavior behind a meaningful interface. Parameters support generality, while centralizing repeated logic reduces duplication and hides implementation detail from callers."
    },
    {
      unit:"U3", code:"3.14", topic:"Libraries", skills:["2.B","2.B","2.B","2.B"],
      context:"A developer imports a graphics library and calls documented functions for drawing shapes rather than implementing pixel-level rendering from scratch.",
      evidence:"The library exposes a documented interface with function names, parameters, and return behavior while keeping most internal implementation details hidden from the calling program.",
      truths:[
        "A software library provides reusable procedures or other abstractions that programs can use through a documented interface.",
        "Using a library can reduce development effort by allowing programmers to rely on tested functionality instead of reimplementing the same operation.",
        "A caller must use a library operation according to its documented parameters and behavior even when the caller does not know its internal implementation.",
        "Libraries support abstraction because programs can depend on a public interface while the library's internal implementation may change without changing correct callers."
      ],
      wrongs:[
        "A library can be used only after the calling programmer rewrites every internal function in the application's own source code.",
        "Using a library necessarily increases development effort because reusable operations cannot replace code written specifically for the application.",
        "A program may ignore a library's documented parameters because the library automatically infers any missing information from the caller's intent.",
        "Libraries prevent abstraction because every caller must depend on the exact internal implementation of each library routine."
      ],
      why:"Libraries expose reusable functionality through interfaces. Correct callers follow those interfaces while benefiting from abstraction, code reuse, and the ability to change implementation details behind the interface."
    },
    {
      unit:"U3", code:"3.15", topic:"Random Values", skills:["2.B","4.B","4.B","2.B"],
      context:"A game uses a random-number operation to choose one of several possible obstacles so repeated plays do not necessarily produce the same sequence.",
      evidence:"A random operation is specified to return an integer from 1 through 6 with each value possible; repeated calls may produce different results, though a particular value can occur more than once.",
      truths:[
        "Programs can use random-value operations to introduce nondeterministic choices within a defined range or set of possible outcomes.",
        "A random operation can return the same value on consecutive calls; randomness does not require results to alternate or avoid repeats.",
        "When an algorithm uses random values, repeated executions with otherwise identical input can follow different valid paths or produce different outputs.",
        "The range and distribution specified for a random operation matter when the values are used to model choices or simulations."
      ],
      wrongs:[
        "A random operation must return each possible value exactly once before any value may repeat.",
        "Randomness requires consecutive calls to produce different values, so a repeated result proves the operation is not random.",
        "Using a random value cannot affect program output because random operations are ignored by conditional and arithmetic expressions.",
        "The set of possible random outputs is irrelevant to a simulation because every random-number range models the same probabilities."
      ],
      why:"Random operations choose among defined possibilities without requiring a fixed sequence. Repetition is possible, and the specified range or distribution determines how randomness influences program behavior."
    },
    {
      unit:"U3", code:"3.16", topic:"Simulations", skills:["1.A","1.D","1.D","1.A"],
      context:"A researcher models a queue by repeatedly generating random arrival times and service times, then compares simulated waiting times under several staffing plans.",
      evidence:"The simulation reproduces selected features of the real process and can be run many times, but it omits factors such as equipment failures that are outside the model.",
      truths:[
        "A simulation uses a computational model to imitate selected features of a real or hypothetical process so behavior can be explored under controlled assumptions.",
        "Simulation results are limited by the assumptions and variables included in the model; omitted factors can matter when applying conclusions to the real system.",
        "Random values can be used in a simulation to represent uncertain events and to examine a distribution of possible outcomes across repeated trials.",
        "Simulations can be useful when direct experiments are expensive, slow, dangerous, or impractical, provided the model's limitations are considered."
      ],
      wrongs:[
        "A simulation reproduces every property of the real world exactly, so its output can be treated as direct observation without considering assumptions.",
        "If a factor is omitted from a computational model, it cannot affect whether conclusions transfer from the simulation to the real situation.",
        "Random values cannot be used in simulations because a model must produce the identical outcome on every run to be meaningful.",
        "Simulation is useful only when the corresponding real-world experiment is easy and inexpensive to perform repeatedly."
      ],
      why:"Simulations are purposeful models, not perfect copies. They allow controlled and repeated exploration, often with randomness, while conclusions remain bounded by the model's assumptions and omissions."
    },
    {
      unit:"U3", code:"3.17", topic:"Algorithmic Efficiency", skills:["1.D","1.D","1.D","1.D"],
      context:"Two correct algorithms process growing lists: one approximately doubles its work when the list doubles, while the other approximately quadruples its work.",
      evidence:"For input sizes 100, 200, and 400, Algorithm A uses about 100, 200, and 400 key operations; Algorithm B uses about 10,000, 40,000, and 160,000.",
      truths:[
        "Algorithmic efficiency considers how resource use such as time or memory grows as the size of the input grows.",
        "Two algorithms that are both correct can differ substantially in scalability, making one more practical for large inputs.",
        "Comparing growth as input size increases is more informative about scalability than comparing one timing measurement on one small input.",
        "An algorithm with an impractically fast-growing number of steps may become unusable for large inputs even though it eventually produces a correct answer."
      ],
      wrongs:[
        "Algorithmic efficiency is determined only by whether an algorithm produces the correct answer, not by the resources it requires.",
        "If two algorithms are correct on a small input, their resource requirements must grow at the same rate as input size increases.",
        "A single execution time on one computer and one tiny input completely determines how an algorithm scales for all larger inputs.",
        "A correct algorithm is practical for every input size because correctness guarantees that its running time remains small."
      ],
      why:"Efficiency examines growth in computational resources. Correctness is necessary but separate from scalability, and growth behavior becomes especially important as input size increases."
    },
    {
      unit:"U3", code:"3.18", topic:"Undecidable Problems", skills:["1.A","1.A","1.A","1.A"],
      context:"A proposed program is claimed to accept any arbitrary program and input and always decide whether that program will eventually halt.",
      evidence:"Computer science proves that some precisely stated decision problems have no algorithm that can correctly return an answer for every possible input instance.",
      truths:[
        "An undecidable problem is one for which no algorithm can be constructed that always produces a correct yes-or-no answer for every possible input.",
        "Undecidability is different from an algorithm merely being slow; an undecidable problem lacks a universal correct algorithm rather than just an efficient one.",
        "A program may solve restricted instances of an undecidable problem without creating an algorithm that works for every possible instance.",
        "The existence of undecidable problems places theoretical limits on what can be determined by algorithms, even with unlimited willingness to wait for a computation."
      ],
      wrongs:[
        "An undecidable problem is simply a problem whose fastest known algorithm takes more than one second to run.",
        "Every precisely stated computational problem has some algorithm that produces a correct answer for every possible input if enough hardware is available.",
        "Solving several common cases of an undecidable problem proves that one algorithm now solves every possible instance.",
        "Undecidability means that computers lack enough storage today, so the problem becomes decidable automatically when memory capacity increases."
      ],
      why:"Undecidability is a theoretical limit on universal algorithmic solution, not a performance limitation. Restricted cases may be solvable even though no algorithm handles every possible instance."
    },
    {
      unit:"U4", code:"4.1", topic:"The Internet", skills:["5.A","5.A","5.A","5.A"],
      context:"A message is divided into packets that may travel through different routers before the destination reassembles the data according to agreed network protocols.",
      evidence:"When one route becomes congested, routers can forward later packets along other available paths; the destination uses addressing and protocol information to interpret the received packets.",
      truths:[
        "The Internet is a network of interconnected networks that communicate using open protocols governing how data are addressed, transmitted, routed, and received.",
        "Data sent across the Internet can be divided into packets, and different packets from one message may take different routes to the destination.",
        "IP addresses identify network interfaces for routing, while services such as DNS translate human-readable domain names into information used to locate network resources.",
        "Internet routing is designed around connections among many independent networks rather than one single central machine carrying every packet."
      ],
      wrongs:[
        "The Internet is one central computer that stores every webpage and directly connects to each user's device.",
        "All packets in one Internet message must follow the identical physical route or the destination cannot reconstruct the message.",
        "A domain name and an IP address are the same representation, so DNS performs no translation or lookup function.",
        "Internet communication requires every packet to pass through one mandatory global router before reaching any destination."
      ],
      why:"Internet communication is packet-switched and protocol-based across interconnected networks. Addressing, routing, and naming services cooperate without requiring one universal path or central router."
    },
    {
      unit:"U4", code:"4.2", topic:"Fault Tolerance", skills:["1.D","5.A","5.A","1.D"],
      context:"A service stores replicated data in multiple locations and connects its network through several independent paths so one failed component does not necessarily stop access.",
      evidence:"During a link failure, traffic is rerouted through another connection and users continue reaching the service, although capacity is temporarily reduced.",
      truths:[
        "A fault-tolerant system uses redundancy or alternate components so some failures can occur without causing the entire system to stop functioning.",
        "Redundant network paths can improve reliability because traffic may be rerouted when one path becomes unavailable.",
        "Fault tolerance reduces the impact of specified failures but does not mean a system can survive every possible combination of failures.",
        "Adding redundancy can improve availability while also increasing cost, complexity, or resource use, so designs involve tradeoffs."
      ],
      wrongs:[
        "Fault tolerance means a system contains no components that can fail, so redundancy is unnecessary.",
        "A network with two paths is less reliable because traffic cannot be redirected when the primary path fails.",
        "A fault-tolerant design guarantees continued operation under every possible failure, including loss of all redundant components.",
        "Redundancy has no cost or design tradeoff because duplicate resources never require additional hardware, storage, or coordination."
      ],
      why:"Fault tolerance comes from designing for failure through redundancy and alternate paths. It improves resilience for anticipated faults but does not eliminate all failure modes or tradeoffs."
    },
    {
      unit:"U4", code:"4.3", topic:"Parallel and Distributed Computing", skills:["1.D","1.D","1.D","1.D"],
      context:"A large image-processing job is divided into independent chunks that several processors handle at the same time before their partial results are combined.",
      evidence:"A task has 80 seconds of parallelizable work and 20 seconds of inherently sequential setup. Adding processors reduces the parallel portion but cannot remove the sequential portion.",
      truths:[
        "Parallel computing performs portions of a computation at the same time, while distributed computing uses multiple networked computing devices to contribute to a task.",
        "A problem gains the most speed from parallelism when substantial portions can be divided into independent work that can execute concurrently.",
        "Sequential portions and coordination overhead can limit speedup, so doubling the number of processors does not necessarily halve total running time.",
        "Distributed systems can provide additional resources or resilience, but communication latency and coordination among devices can affect performance."
      ],
      wrongs:[
        "Parallel computing requires every operation in an algorithm to execute in one fixed sequence on a single processor.",
        "Any algorithm becomes exactly twice as fast whenever a second processor is added, even when most of the work is sequential.",
        "Increasing processor count always divides total execution time by the same factor because communication and coordination take no time.",
        "Distributed computing removes network latency because devices participating in one computation no longer need to exchange information."
      ],
      why:"Parallel and distributed computing divide work across processing resources, but achievable speedup depends on which work can run concurrently and on sequential, communication, and coordination costs."
    },
    {
      unit:"U5", code:"5.1", topic:"Beneficial and Harmful Effects", skills:["5.C","5.C","5.C","5.C"],
      context:"A navigation service reduces travel uncertainty for many users but also changes traffic patterns and collects detailed location histories.",
      evidence:"Users report faster route planning, while neighborhoods near suggested shortcuts report increased traffic and the service retains location records for personalization.",
      truths:[
        "A computing innovation can produce both beneficial and harmful effects, and those effects may differ across people, groups, and contexts.",
        "Intended benefits do not rule out unintended consequences that emerge after an innovation is deployed at scale.",
        "Evaluating an innovation's impact should identify who receives benefits, who bears costs or risks, and what data or resources the system uses.",
        "The same feature can have different social effects depending on how it is used, who has access, and what incentives surround its deployment."
      ],
      wrongs:[
        "If a computing innovation has one important benefit, it cannot also produce a harmful effect for another group.",
        "Only effects planned by the developers count when evaluating a computing innovation; unintended consequences are outside its impact.",
        "An innovation's impact can be evaluated without considering which groups benefit or bear costs because effects are necessarily uniform.",
        "A computing feature has the same social effect in every context because technical behavior alone determines all consequences."
      ],
      why:"Computing impacts are rarely one-dimensional. AP CSP asks students to consider intended and unintended effects, affected groups, access, data practices, and contextual tradeoffs."
    },
    {
      unit:"U5", code:"5.2", topic:"Digital Divide", skills:["5.C","5.C","5.C","5.C"],
      context:"A city moves permit applications online, but some residents lack reliable broadband, accessible devices, or the digital skills needed to use the service independently.",
      evidence:"Completion rates rise overall after digitization but remain substantially lower in neighborhoods with limited broadband availability and among residents who rely on shared public devices.",
      truths:[
        "The digital divide describes unequal access to computing resources, connectivity, or skills that can affect who benefits from digital opportunities.",
        "Moving a service online can improve access for some users while creating new barriers for people without reliable devices, connectivity, or appropriate accessibility support.",
        "Differences in infrastructure, cost, geography, disability access, and education can all contribute to unequal participation in computing.",
        "Reducing a digital divide can require more than distributing hardware because connectivity, affordability, training, and accessible design also affect meaningful access."
      ],
      wrongs:[
        "The digital divide disappears as soon as any online version of a service exists because every user then has identical access.",
        "Moving a service online necessarily improves access equally for all users regardless of devices, connectivity, disability, or digital skills.",
        "Only personal preference causes unequal participation in computing; infrastructure, cost, and accessibility cannot contribute.",
        "Providing one device automatically resolves every form of digital inequality, including connectivity, affordability, skills, and accessible design."
      ],
      why:"Digital access includes infrastructure, devices, affordability, skills, and accessibility. An innovation can widen or narrow disparities depending on whether those barriers are recognized and addressed."
    },
    {
      unit:"U5", code:"5.3", topic:"Computing Bias", skills:["5.E","5.E","5.E","5.E"],
      context:"A hiring model is trained on historical decisions from a workforce in which some groups were underrepresented, then ranks new applicants using patterns learned from those records.",
      evidence:"Validation shows similar overall accuracy but substantially different false-rejection rates between demographic groups, indicating that aggregate accuracy hides an uneven effect.",
      truths:[
        "Computing bias can arise from data, assumptions, design choices, or deployment context and can produce systematically different outcomes for groups.",
        "Training data that reflect historical inequities can cause a model to reproduce or amplify those patterns unless they are identified and addressed.",
        "Evaluating fairness requires examining relevant subgroup outcomes and error patterns rather than relying only on one overall accuracy measure.",
        "Automating a decision does not make it neutral; designers remain responsible for examining data provenance, criteria, and consequences of the system's use."
      ],
      wrongs:[
        "A computerized decision process cannot be biased because software applies the same mathematical operations to every record.",
        "Historical training data are automatically fair because recorded past decisions contain objective facts rather than human choices or social patterns.",
        "Equal overall accuracy proves that a model has equal error rates and consequences for every demographic or contextual subgroup.",
        "Once a decision is automated, designers no longer need to evaluate data sources or social consequences because the computer is solely responsible."
      ],
      why:"Bias can enter through data, objectives, assumptions, and deployment. Responsible evaluation examines subgroup effects and recognizes that automation can reproduce rather than erase inequity."
    },
    {
      unit:"U5", code:"5.4", topic:"Crowdsourcing", skills:["1.C","1.C","1.C","1.C"],
      context:"A disaster-mapping project invites thousands of volunteers to label satellite images, then combines their contributions with review rules to build a rapidly updated map.",
      evidence:"The project receives far more observations than a small staff could collect alone, but duplicate reports and inconsistent labels require validation before the map is published.",
      truths:[
        "Crowdsourcing obtains information, ideas, or work from a large group of people, often through an online platform, to contribute to a shared task.",
        "Crowdsourcing can expand scale and diversity of contributions while still requiring methods to validate, combine, or moderate the submitted information.",
        "A crowdsourced project can benefit from participants with different local knowledge or perspectives that a small centralized team may not possess.",
        "The quality of a crowdsourced result depends on participation, task design, incentives, and methods for handling inaccurate or conflicting contributions."
      ],
      wrongs:[
        "Crowdsourcing means one expert completes a task privately and publishes the finished answer without receiving outside contributions.",
        "Information from a crowd is automatically correct because a large number of contributors eliminates the need for validation or moderation.",
        "Crowdsourcing reduces the range of perspectives by requiring every participant to have identical local knowledge and experience.",
        "The design of the task and validation process cannot affect crowdsourced quality because the number of participants is the only relevant factor."
      ],
      why:"Crowdsourcing leverages contributions from many participants. Scale and diverse knowledge can be valuable, but quality still depends on participation patterns, task design, and validation."
    },
    {
      unit:"U5", code:"5.5", topic:"Legal and Ethical Concerns", skills:["5.E","5.E","5.E","5.E"],
      context:"A developer wants to reuse a photographer's image and a code library in a commercial app, while the two works have different licenses and attribution requirements.",
      evidence:"One resource is released under a license permitting reuse with attribution; the other explicitly restricts commercial redistribution without permission.",
      truths:[
        "Legal and ethical use of computing resources includes respecting intellectual property, licenses, attribution requirements, privacy, and applicable rules governing data or content.",
        "Public availability on the Internet does not by itself mean that a work has no copyright or may be reused for any purpose without permission.",
        "Open-source and Creative Commons licenses can grant reuse rights under stated conditions, so users must follow the terms of the specific license.",
        "Ethical evaluation can require considering harms, consent, transparency, and affected stakeholders even when a proposed action is technically possible."
      ],
      wrongs:[
        "Any image or program code visible online is automatically in the public domain and can be redistributed without considering license terms.",
        "Copyright applies only to printed works, so software, images, and digital media never carry intellectual-property restrictions.",
        "All open licenses impose identical conditions, making it unnecessary to read whether attribution or commercial-use restrictions apply.",
        "If an action is technically possible to automate, ethical questions about consent, harm, and affected stakeholders no longer apply."
      ],
      why:"Computing operates within legal and ethical frameworks. Rights and responsibilities depend on licenses, privacy, consent, attribution, stakeholder impacts, and context—not merely technical accessibility."
    },
    {
      unit:"U5", code:"5.6", topic:"Safe Computing", skills:["5.D","5.E","5.D","5.E"],
      context:"A user protects an account with a unique long password and multifactor authentication, installs verified updates, and is cautious about links requesting credentials.",
      evidence:"After a breached password from another service is tried against several sites, accounts that reused the password are compromised while an account with a unique password and second factor remains protected.",
      truths:[
        "Safe computing practices reduce risk by combining measures such as strong unique authentication, software updates, cautious handling of untrusted messages, and protection of sensitive data.",
        "Multifactor authentication improves account security because possession of one stolen credential may be insufficient to complete authentication.",
        "Reusing one password across services increases risk because a credential exposed by one breach can be tried against accounts on other services.",
        "Encryption can protect the confidentiality of data in storage or transit when keys and endpoints are managed appropriately, but it does not prevent every form of social engineering or account compromise."
      ],
      wrongs:[
        "Safe computing requires one security measure to be perfect; combining independent protections provides no additional benefit.",
        "Multifactor authentication weakens security because requiring an additional factor makes a stolen password more useful to an attacker.",
        "Password reuse reduces breach impact because the same credential is easier for the legitimate user to remember across many services.",
        "Encrypting network traffic prevents users from being deceived into revealing credentials and therefore eliminates phishing and social-engineering risk."
      ],
      why:"Security is layered risk reduction. Unique credentials, multiple factors, updates, careful user behavior, and encryption address different threats; no single control eliminates every attack path."
    }
  ];

  function rotate(values, shift) {
    const amount = ((shift % values.length) + values.length) % values.length;
    return values.slice(amount).concat(values.slice(0, amount));
  }

  function arranged(options, correctIndices, shift) {
    const indexed = options.map((text, index) => ({ text, correct: correctIndices.includes(index) }));
    const moved = rotate(indexed, shift);
    return {
      options:moved.map((entry) => entry.text),
      correct:moved.map((entry, index) => entry.correct ? index : null).filter((index) => index !== null),
    };
  }

  function rationale(profile, truth) {
    return `${truth} ${profile.why} The competing choices either reverse that relationship, overstate what computing guarantees, or describe a different concept.`;
  }

  const questions = [];
  topics.forEach((profile, topicIndex) => {
    const idStem = `apcsp-${profile.code.replace(".", "-")}`;
    const facets = [
      {
        stems:[
          `Which statement most accurately describes ${profile.topic}?`,
          `A classmate is reviewing ${profile.topic}. Which statement would best correct a misconception about the topic?`,
        ],
        options:[profile.truths[0], profile.wrongs[1], profile.wrongs[2], profile.wrongs[3]],
        truth:profile.truths[0], skill:profile.skills[0],
      },
      {
        stems:[
          `${profile.context} Which statement best applies the relevant computing principle?`,
          `Consider this computing situation: ${profile.context} Which interpretation is best supported?`,
        ],
        options:[profile.truths[1], profile.wrongs[0], profile.wrongs[2], profile.wrongs[3]],
        truth:profile.truths[1], skill:profile.skills[1],
      },
      {
        stems:[
          `${profile.evidence} Which conclusion is most consistent with this evidence?`,
          `A team must reason from the following information: ${profile.evidence} Which conclusion should guide its analysis?`,
        ],
        options:[profile.truths[2], profile.wrongs[0], profile.wrongs[1], profile.wrongs[3]],
        truth:profile.truths[2], skill:profile.skills[2],
      },
    ];

    facets.forEach((facet, facetIndex) => {
      facet.stems.forEach((stem, wordingIndex) => {
        const variant = facetIndex * 2 + wordingIndex + 1;
        const answer = arranged(facet.options, [0], topicIndex + variant);
        questions.push({
          id:`${idStem}-v${variant}`,
          unit:profile.unit,
          topicCode:profile.code,
          topic:profile.topic,
          skill:facet.skill,
          type:"s",
          cspQuestionKind:"single",
          variantGroupId:`${idStem}-facet-${facetIndex + 1}`,
          q:stem,
          o:answer.options,
          c:answer.correct,
          e:rationale(profile, facet.truth),
        });
      });
    });

    const correctPair = `${profile.truths[0]} AND ${profile.truths[3]}`;
    const pairOptions = [
      correctPair,
      `${profile.truths[0]} AND ${profile.wrongs[2]}`,
      `${profile.wrongs[1]} AND ${profile.truths[3]}`,
      `${profile.wrongs[1]} AND ${profile.wrongs[2]}`,
    ];
    const pairAnswer = arranged(pairOptions, [0], topicIndex + 7);
    questions.push({
      id:`${idStem}-v7`,
      unit:profile.unit,
      topicCode:profile.code,
      topic:profile.topic,
      skill:profile.skills[3],
      type:"s",
      cspQuestionKind:"single",
      variantGroupId:`${idStem}-facet-4`,
      q:`Which pair of statements about ${profile.topic} is accurate?`,
      o:pairAnswer.options,
      c:pairAnswer.correct,
      e:rationale(profile, correctPair),
    });

    const multiAnswer = arranged(
      [profile.truths[0], profile.truths[3], profile.wrongs[1], profile.wrongs[2]],
      [0,1],
      topicIndex + 8
    );
    questions.push({
      id:`${idStem}-v8`,
      unit:profile.unit,
      topicCode:profile.code,
      topic:profile.topic,
      skill:profile.skills[3],
      type:"m",
      cspQuestionKind:"multi",
      variantGroupId:`${idStem}-facet-4`,
      q:`Which two statements about ${profile.topic} are accurate? Select two answers.`,
      o:multiAnswer.options,
      c:multiAnswer.correct,
      e:rationale(profile, correctPair),
    });
  });

  window.QUESTIONS_AP_COMPUTER_SCIENCE_PRINCIPLES = questions;
})();
