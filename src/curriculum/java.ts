import type { Phase } from './types';

export const javaPhases: Phase[] = [
  // ─── Level 0 ─────────────────────────────────────────────────────────────
  {
    id: 'java-0',
    language: 'java',
    level: 0,
    title: 'Setup & Hello World',
    timeEstimate: '0.5-1 hours',
    intro: `Welcome to Java — and, if this is your very first program ever, welcome to programming! A program is just a list of instructions you write in a text file; a tool then turns those instructions into something the computer can carry out. Java does this in two steps: you write **source code** (human-readable text), the \`javac\` **compiler** turns it into **bytecode** (a compact set of instructions), and the **JVM** (Java Virtual Machine — a program that pretends to be a computer) runs that bytecode. Because every operating system ships its own JVM, the same bytecode runs unchanged on Windows, macOS, and Linux — the famous "write once, run anywhere" promise.

Here is the entire first program. Every Java program is built from these pieces, so it is worth meeting each one slowly:

\`\`\`java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

Read left to right, this says: *make a public thing called \`Main\`; inside it put an action called \`main\`; when that action runs, print the text \`Hello, World!\`.* Now the token-by-token tour. (A **token** is just one indivisible "word" or symbol of code.)

**\`class\`** — A class is a **container** that holds your code. In Java *all* code must live inside a class; you cannot have a loose instruction floating in a file. Think of it as a labelled box. For now it is just scaffolding. *If you remove it:* the program will not compile — there is nowhere for the code to live.

**\`Main\`** — This is the **name** you gave the box. You chose it; it is not a special Java word. The one rule for the file you save: the file name must match the public class name, so this class must be saved as \`Main.java\`. *If you rename it* to \`Hello\`, you must also save the file as \`Hello.java\`.

**\`public\`** — An **access keyword** meaning "anyone is allowed to use this." The JVM lives "outside" your class, so it needs public permission to reach in and start the program. *If you remove it:* the JVM may not be allowed to find your starting point.

**\`{ ... }\`** — A pair of **curly braces** marks the **start and end of a block** — everything that belongs to the class (or, further in, to the method). Braces always come in matched pairs, like opening and closing a container. The outer pair holds the class body; the inner pair holds the method body.

**\`main\`** — This is a **method**: a named action, a reusable chunk of instructions. (Other languages call this a "function.") \`main\` is special: it is the **entry point**, the one method the JVM looks for and runs first when you launch the program. *If you misspell it* (e.g. \`mian\`) the JVM cannot find where to begin and refuses to start. The parentheses \`( )\` right after \`main\` are where information can be *handed in* to the action.

**\`static\`** — Means this method belongs to the **class itself**, not to any particular object made from the class. The JVM has to call \`main\` before it has created a single object, so \`main\` must be \`static\` — callable directly on the class. *If you remove it:* the JVM would need an object to call \`main\` on, but none exists yet, so it errors.

**\`void\`** — The method's **return type**: the kind of answer it hands back when it finishes. \`void\` means **"nothing"** — \`main\` does its work (printing) but returns no value. (A method that added two numbers might instead say \`int\` here, meaning "I hand back a whole number.")

**\`String[] args\`** — This sits inside \`main\`'s parentheses and *describes* the information handed in. Break it down: **\`String\`** means **text**, like \`"Hello"\`. The **\`[]\`** means an **array** — an ordered list of several values. So \`String[]\` is "a list of text values" such as \`["apple", "banana"]\`. **\`args\`** is just the **variable name** holding that list (short for "arguments" — extra pieces of info passed in from the command line). Key insight: \`String[] args\` is not *doing* anything — it *describes* a slot. At runtime, launching \`java Main apple banana\` makes \`args\` hold \`["apple", "banana"]\` before \`main\` starts; launching plain \`java Main\` makes \`args\` an empty list. This program ignores \`args\`, but the slot must still be declared because that is the exact shape the JVM expects \`main\` to have.

**\`System.out.println("Hello, World!")\`** — The one line that actually *does* something visible. Read it right to left for meaning: \`"Hello, World!"\` is a **string literal** — the exact text to show, with the double quotes marking where the text begins and ends (the quotes are not printed). \`System\` is a built-in class Java provides; \`System.out\` is its connection to **standard output** (your terminal/console); \`println\` is a method on it that **prints** its argument and then moves to a new line (the "ln" = "line"). \`System.out.print\` (no \`ln\`) would print without the newline. The semicolon \`;\` ends the **statement** — like a full stop ending a sentence; every Java statement needs one.

What is in memory when this runs: the JVM loads the \`Main\` class, sees \`main\`, sets up \`args\` (an empty list here), then executes the one statement inside — sending the characters \`Hello, World!\` to standard output, followed by a newline.

Locally: install a modern LTS JDK (21 is the current long-term-support release), then run \`java --version\` and \`javac --version\` to confirm both the runtime and the compiler are on your \`PATH\`. Save the program above as \`Main.java\`, compile with \`javac Main.java\` (producing \`Main.class\`), and run with \`java Main\`. (Since JDK 11 you can also run a single file directly with \`java Main.java\`, skipping the explicit compile step.)`,
    topics: [
      {
        label: 'Download the JDK',
        url: 'https://www.oracle.com/java/technologies/downloads/',
        note: 'Official Oracle JDK downloads for all platforms.',
      },
      {
        label: 'Adoptium / Eclipse Temurin',
        url: 'https://adoptium.net/',
        note: 'Free, widely-used OpenJDK builds (recommended for most users).',
      },
      {
        label: 'The Java Tutorials — Getting Started',
        url: 'https://docs.oracle.com/javase/tutorial/getStarted/index.html',
        note: 'Official "Hello World" walkthrough for the command line.',
      },
    ],
    deliverable: 'Confirm `java --version` in your terminal and run a program that prints a greeting.',
    checks: [
      {
        kind: 'code',
        id: 'java-0-code-1',
        prompt: 'Run the starter program below to print `Hello, World!` to standard output.',
        boilerplate:
          'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}\n',
        expectedOutput: 'Hello, World!',
        explanation:
          'Read this program token by token. **`class Main`** — a *class* is a labelled box that holds code; in Java every instruction must live inside one. `Main` is the name you chose (not a keyword); the file must be saved as `Main.java` to match it. **`public`** — an access keyword meaning "anyone may use this"; the JVM lives outside your class and needs that permission to reach the start point. **`static`** — this method belongs to the *class itself*, not to an object made from it; the JVM calls `main` before any object exists, so it must be static. **`void`** — the *return type*, the kind of answer the method hands back; `void` means "nothing" (it prints, it does not return a value). **`main`** — a *method* (a named, reusable action); `main` is special — it is the *entry point* the JVM runs first. **`String[] args`** — describes the information handed in: `String` means text, `[]` means an *array* (an ordered list), `args` is just the variable name holding the command-line arguments. Running `java Main apple banana` makes `args` hold `["apple","banana"]`; plain `java Main` makes it an empty list. **`System.out.println("Hello, World!")`** — `System.out` is the connection to standard output (your console); `println` prints its argument and then a newline; `"Hello, World!"` is the literal text (the quotes mark where it begins and ends and are not printed). The **`;`** ends the statement, like a full stop. At runtime the JVM loads `Main`, finds `main`, sets up `args`, then runs the one statement, sending `Hello, World!` to the console.',
      },
      {
        kind: 'mcq',
        id: 'java-0-mcq-1',
        prompt: 'What does the `javac` command do?',
        options: [
          'It compiles `.java` source files into `.class` bytecode files.',
          'It runs already-compiled bytecode on the JVM.',
          'It downloads and installs the JDK.',
          'It formats Java source code.',
        ],
        correctIndex: 0,
        explanation:
          '`javac` is the Java compiler: it turns `.java` source into `.class` files containing JVM bytecode. The separate `java` command launches the JVM to *run* that bytecode. See the [Getting Started tutorial](https://docs.oracle.com/javase/tutorial/getStarted/cupojava/index.html).',
      },
      {
        kind: 'mcq',
        id: 'java-0-mcq-2',
        prompt: 'What is the JVM responsible for?',
        options: [
          'Executing compiled Java bytecode on whatever hardware/OS it runs on.',
          'Translating Java directly into machine code at install time.',
          'Storing your source files in a central repository.',
          'Replacing the operating system entirely.',
        ],
        correctIndex: 0,
        explanation:
          'The Java Virtual Machine executes platform-independent bytecode, providing the "write once, run anywhere" portability. The same `.class` files run on Windows, macOS, and Linux because each platform ships its own JVM implementation.',
      },
    ],
  },

  // ─── Level 1 ─────────────────────────────────────────────────────────────
  {
    id: 'java-1',
    language: 'java',
    level: 1,
    title: 'Java Basics — Types, Variables, Operators & Output',
    timeEstimate: '4-6 hours',
    intro: `Before any of the Java-specific details, four bedrock ideas — if you have never programmed, read these slowly.

A **statement** is one complete instruction, like one sentence. In Java every statement ends with a semicolon \`;\`. The program runs statements one after another, top to bottom.

A **variable** is a *named box that holds a value*. \`int score = 10;\` makes a box called \`score\`, puts the number \`10\` in it, and you can read or change it later by name. The \`=\` is **assignment** — "put the value on the right into the box on the left" — not the "equals" of mathematics. Writing \`score = score + 1;\` means "take what's in \`score\`, add one, put the result back," so \`score\` becomes \`11\`.

A **type** is *what kind of value a box may hold*. Java is **statically typed**: every box's type is fixed when you create it and checked by the compiler before the program runs. \`int score\` may hold only whole numbers; you cannot later put text in it. This catches whole categories of mistakes early. The word right before the variable name (\`int\`, \`double\`, \`String\`, \`boolean\`) *is* the type.

A **method** is a *named, reusable action* (other languages say "function"). You met \`main\` in Level 0. A method can take inputs (in its parentheses) and hand back one answer (its **return type** — \`void\` means it returns nothing). You "call" a method by writing its name and parentheses, e.g. \`System.out.println("hi")\`.

With those in hand: by the end of this phase you'll read short Java programs and predict their output, with a firm grasp of Java's **primitive-vs-reference** world. You'll learn the eight **primitive types** — \`int\` (whole numbers), \`long\` (bigger whole numbers), \`double\` (numbers with a fractional part like \`3.14\`), \`boolean\` (\`true\`/\`false\`), \`char\` (a single character), and the rarer \`byte\`, \`short\`, \`float\` — which hold their value *directly* in the box. You'll meet \`String\` (text), which is a *reference* type: the box holds a pointer to text stored elsewhere. You'll see the difference between a primitive \`int\` and the object wrapper \`Integer\` (which can also be \`null\`, meaning "no value at all"), the surprise of integer vs floating-point division, and how \`+\` does double duty — arithmetic on numbers, but *concatenation* (gluing text together) the moment a \`String\` is involved.

Locally: write a small \`Temperature\` program that declares a \`double celsius\`, converts it to Fahrenheit with \`celsius * 9 / 5 + 32\`, and prints both with \`System.out.printf\`. Experiment with what happens when you divide two \`int\`s versus an \`int\` and a \`double\` — the surprising results teach you Java's numeric promotion rules.`,
    video: {
      title: 'Java Full Course for free',
      youtubeId: 'xk4_1vDrzzo',
      channelName: 'Bro Code',
      duration: '12 hours',
    },
    topics: [
      { label: 'Primitive Data Types', url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html', note: 'The eight primitives and their ranges.' },
      { label: 'Variables', url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/variables.html', note: 'Declaration, initialisation, and naming.' },
      { label: 'Operators', url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/operators.html', note: 'Arithmetic, relational, logical, and assignment operators.' },
      { label: 'Autoboxing and Unboxing', url: 'https://docs.oracle.com/javase/tutorial/java/data/autoboxing.html', note: 'Conversion between primitives and their wrapper classes.' },
      { label: 'dev.java — Language Basics', url: 'https://dev.java/learn/language-basics/', note: 'Modern overview of values, variables, and types.' },
    ],
    deliverable: 'Write a `Temperature` program that converts Celsius to Fahrenheit and prints both values with printf.',
    checks: [
      {
        kind: 'code',
        id: 'java-1-code-1',
        prompt:
          'Complete the program so it prints `area=50`. Compute the area of a rectangle with width 10 and height 5 using `int` arithmetic.',
        boilerplate:
          'public class Main {\n    public static void main(String[] args) {\n        int width = 10;\n        int height = 5;\n        int area = width * height;\n        System.out.println("area=" + area);\n    }\n}\n',
        expectedOutput: 'area=50',
        explanation:
          'The `+` operator concatenates because the left operand is a `String`. Java evaluates `width * height` first (arithmetic), then converts the `int` result to text to build the output string. This left-to-right, type-driven behaviour of `+` is a frequent source of bugs (see the MCQ on `1 + 2 + "x"`).',
      },
      {
        kind: 'code',
        id: 'java-1-code-2',
        prompt:
          'Compute the remainder of `17 % 5` and the exact integer quotient, and print `quotient=3 remainder=2` using `printf` with `%d`. (Take the quotient as `(17 - r) / 5` so it stays exact.)',
        boilerplate:
          'public class Main {\n    public static void main(String[] args) {\n        int r = 17 % 5;\n        int q = (17 - r) / 5;\n        System.out.printf("quotient=%d remainder=%d\\n", q, r);\n    }\n}\n',
        expectedOutput: 'quotient=3 remainder=2',
        explanation:
          'In Java, integer division truncates toward zero, so `17 / 5` is `3` (not `3.4`) and the modulo operator `%` gives the remainder `2`. Here we recover the same quotient as `(17 - 2) / 5 = 3`. `printf` substitutes the `%d` placeholders with the integer arguments in order. To get a fractional result you would need at least one operand to be a `double`.',
      },
      {
        kind: 'mcq',
        id: 'java-1-mcq-1',
        prompt: 'What does this program print?\n\n```java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(1 + 2 + "x" + 1 + 2);\n    }\n}\n```',
        options: ['`3x12`', '`12x3`', '`3x3`', '`1 + 2 + x + 1 + 2`'],
        correctIndex: 0,
        explanation:
          '`+` is left-associative. `1 + 2` is arithmetic (`3`), then `3 + "x"` switches to string concatenation (`"3x"`), and every `+` after that stays string concatenation: `"3x" + 1` → `"3x1"` → `"3x12"`. Once a `String` enters the chain, the rest is concatenation.',
      },
      {
        kind: 'mcq',
        id: 'java-1-mcq-2',
        prompt: 'What is the value and type of `result`?\n\n```java\ndouble result = 7 / 2;\n```',
        options: [
          '`3.5` — division happens in floating point because the target is `double`.',
          '`3.0` — `7 / 2` is computed as integer division (`3`), then widened to `double`.',
          '`3` — the result is an `int`.',
          'A compile error — you cannot assign an `int` expression to a `double`.',
        ],
        correctIndex: 1,
        explanation:
          'Both `7` and `2` are `int` literals, so `7 / 2` is *integer* division yielding `3`. Only afterwards is that `3` widened to the `double` `3.0`. The assignment target type does not retroactively change how the right-hand side is evaluated. Writing `7.0 / 2` would give `3.5`.',
      },
      {
        kind: 'mcq',
        id: 'java-1-mcq-3',
        prompt: 'Which statement about `int` versus `Integer` is correct?',
        options: [
          '`int` is a primitive holding a value directly; `Integer` is an object wrapper that can also be `null`.',
          'They are identical aliases for the same type.',
          '`Integer` is a primitive and `int` is the object form.',
          '`int` can be `null` but `Integer` cannot.',
        ],
        correctIndex: 0,
        explanation:
          '`int` is one of the eight primitive types and stores its value inline. `Integer` is a reference type (a wrapper class) whose instances live on the heap and can be `null`. Autoboxing converts between them automatically, but unboxing a `null` `Integer` throws a `NullPointerException`. See [Autoboxing](https://docs.oracle.com/javase/tutorial/java/data/autoboxing.html).',
      },
    ],
  },

  // ─── Level 2 ─────────────────────────────────────────────────────────────
  {
    id: 'java-2',
    language: 'java',
    level: 2,
    title: 'Control Flow & Methods',
    timeEstimate: '4-6 hours',
    intro: `This phase covers the imperative core of Java: \`if\`/\`else\`, \`switch\`, the three loop forms (\`for\`, \`while\`, \`do-while\`), and how to factor logic into **static methods** with typed parameters and return values. You'll learn method overloading, the difference between \`break\` and \`continue\`, and why \`switch\` traditionally "falls through" without \`break\` (and how modern \`switch\` expressions with \`->\` fix that).

Locally: build a tiny \`FizzBuzz\` and a recursive \`factorial(int n)\` method. Then extract a \`boolean isPrime(int n)\` helper and loop from 2 to 50 printing the primes. Practise reading method signatures aloud — "static, returns int, takes two ints" — until the type-first declaration order feels natural.`,
    video: {
      title: 'Java Full Course for Beginners',
      youtubeId: 'eIrMbAQSU34',
      channelName: 'Programming with Mosh',
      duration: '2.5 hours',
    },
    topics: [
      { label: 'The if-then and if-then-else Statements', url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/if.html', note: 'Conditional branching basics.' },
      { label: 'The switch Statement', url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html', note: 'Fall-through and the modern arrow syntax.' },
      { label: 'The for Statement', url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/for.html', note: 'Classic and enhanced for loops.' },
      { label: 'Defining Methods', url: 'https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html', note: 'Signatures, parameters, and return types.' },
      { label: 'Passing Information to a Method', url: 'https://docs.oracle.com/javase/tutorial/java/javaOO/arguments.html', note: 'Pass-by-value semantics and overloading.' },
    ],
    deliverable: 'Write a program with `isPrime(int n)` and a loop that prints every prime from 2 to 50.',
    checks: [
      {
        kind: 'code',
        id: 'java-2-code-1',
        prompt:
          'Implement `factorial` using a loop so the program prints `5! = 120`. The method should multiply 1 through n.',
        boilerplate:
          'public class Main {\n    static int factorial(int n) {\n        int result = 1;\n        for (int i = 2; i <= n; i++) {\n            result = result * i;\n        }\n        return result;\n    }\n\n    public static void main(String[] args) {\n        System.out.println("5! = " + factorial(5));\n    }\n}\n',
        expectedOutput: '5! = 120',
        explanation:
          'A static method belongs to the class, not an instance, so `main` can call it directly. The loop accumulates the product in `result`. `factorial(5)` returns `120`, which is concatenated into the output string.',
        testCases: [
          { input: 'System.out.println("3! = " + factorial(3));', expectedOutput: '3! = 6', description: 'factorial of 3' },
          { input: 'System.out.println("0! = " + factorial(0));', expectedOutput: '0! = 1', description: 'factorial of 0 is 1 (empty product)' },
        ],
      },
      {
        kind: 'code',
        id: 'java-2-code-2',
        prompt:
          'Count how many numbers from 1 to 100 are divisible by 7, and print `count=14`.',
        boilerplate:
          'public class Main {\n    public static void main(String[] args) {\n        int count = 0;\n        for (int i = 1; i <= 100; i++) {\n            if (i % 7 == 0) {\n                count++;\n            }\n        }\n        System.out.println("count=" + count);\n    }\n}\n',
        expectedOutput: 'count=14',
        explanation:
          'The loop tests each value with the modulo operator; `i % 7 == 0` is true exactly when `i` is a multiple of 7. There are 14 such values (7, 14, …, 98). `count++` is shorthand for `count = count + 1`.',
      },
      {
        kind: 'mcq',
        id: 'java-2-mcq-1',
        prompt: 'What does this classic `switch` print?\n\n```java\nint day = 2;\nswitch (day) {\n    case 1:\n        System.out.print("Mon ");\n    case 2:\n        System.out.print("Tue ");\n    case 3:\n        System.out.print("Wed ");\n        break;\n    default:\n        System.out.print("?");\n}\n```',
        options: ['`Tue Wed `', '`Tue `', '`Tue Wed ?`', '`Mon Tue Wed `'],
        correctIndex: 0,
        explanation:
          'A traditional `switch` with `:` labels *falls through* until it hits a `break`. Matching `case 2` runs its body and then continues into `case 3` (printing `Tue Wed `) before the `break` stops it. The modern arrow form `case 2 -> ...` does not fall through. See [The switch Statement](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html).',
      },
      {
        kind: 'mcq',
        id: 'java-2-mcq-2',
        prompt: 'Java passes arguments by value. What does this print?\n\n```java\nstatic void tryChange(int x) { x = 99; }\n\npublic static void main(String[] args) {\n    int n = 5;\n    tryChange(n);\n    System.out.println(n);\n}\n```',
        options: ['`5`', '`99`', '`0`', 'A compile error.'],
        correctIndex: 0,
        explanation:
          'Java is strictly pass-by-value. `tryChange` receives a *copy* of `n`; reassigning the parameter `x` has no effect on the caller. So `n` is still `5`. (For object references, the *reference* is copied — you can mutate the pointed-to object, but reassigning the parameter still does not affect the caller.)',
      },
      {
        kind: 'mcq',
        id: 'java-2-mcq-3',
        prompt: 'Which difference between `while` and `do-while` is correct?',
        options: [
          'A `do-while` loop always executes its body at least once; a `while` loop may execute zero times.',
          'A `while` loop always runs at least once; a `do-while` may run zero times.',
          'They are identical; `do-while` is just an alias.',
          '`do-while` cannot contain a `break` statement.',
        ],
        correctIndex: 0,
        explanation:
          'A `do-while` checks its condition *after* the body, guaranteeing at least one execution. A `while` checks *before*, so if the condition is initially false the body never runs. Use `do-while` when you must run the body once before testing (e.g. reading at least one input).',
      },
    ],
  },

  // ─── Level 3 ─────────────────────────────────────────────────────────────
  {
    id: 'java-3',
    language: 'java',
    level: 3,
    title: 'Classes, Objects & Encapsulation',
    timeEstimate: '5-7 hours',
    intro: `Java is fundamentally object-oriented. This phase introduces **classes** as blueprints, **objects** as instances, constructors, instance fields, and the \`this\` reference. You'll learn **encapsulation**: making fields \`private\` and exposing controlled access through getters/setters, plus the role of \`static\` members shared across all instances versus per-instance state.

Locally: model a \`BankAccount\` with a private \`balance\`, a constructor, and \`deposit\`/\`withdraw\` methods that validate input. Add a \`static int accountCount\` that increments in the constructor. Override \`toString()\` so printing an account shows its balance. These exercises run best in a real JDK; here we reinforce the *behaviour* through "what does this print?" MCQs since the in-browser runner does not model object instances.`,
    topics: [
      { label: 'Classes and Objects', url: 'https://docs.oracle.com/javase/tutorial/java/javaOO/index.html', note: 'The core OOP tutorial trail.' },
      { label: 'Providing Constructors for Your Classes', url: 'https://docs.oracle.com/javase/tutorial/java/javaOO/constructors.html', note: 'Initialising new objects.' },
      { label: 'Controlling Access to Members of a Class', url: 'https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html', note: 'public, private, protected, package-private.' },
      { label: 'Understanding Class Members (static)', url: 'https://docs.oracle.com/javase/tutorial/java/javaOO/classvars.html', note: 'static fields and methods shared by all instances.' },
      { label: 'dev.java — Classes and Objects', url: 'https://dev.java/learn/classes-objects/', note: 'Modern guide to defining and using classes.' },
    ],
    deliverable: 'Model a `BankAccount` class with a private balance, validating deposit/withdraw methods, and a static account counter.',
    checks: [
      {
        kind: 'code',
        id: 'java-3-code-1',
        prompt:
          'Static methods simulate "behaviour" without instances. Implement `applyInterest(double balance, double rate)` returning `balance + balance * rate`, and print `new balance=105` for 100 at 5% (0.05).',
        boilerplate:
          'public class Main {\n    static double applyInterest(double balance, double rate) {\n        return balance + balance * rate;\n    }\n\n    public static void main(String[] args) {\n        double result = applyInterest(100, 0.05);\n        System.out.println("new balance=" + result);\n    }\n}\n',
        expectedOutput: 'new balance=105',
        explanation:
          'This mirrors what an instance method would compute, but as a pure static function. In a real class, `balance` would be a private field and `applyInterest` an instance method using `this.balance`. The principle — bundle data with the operations on it — is the heart of encapsulation.',
      },
      {
        kind: 'mcq',
        id: 'java-3-mcq-1',
        prompt: 'Why make instance fields `private` and expose them through getter/setter methods?',
        options: [
          'To encapsulate state, so the class can validate changes and change its internal representation without breaking callers.',
          'Because `private` fields are faster to access than `public` ones.',
          'Because Java forbids `public` fields entirely.',
          'To reduce the size of the compiled `.class` file.',
        ],
        correctIndex: 0,
        explanation:
          'Encapsulation hides internal representation behind a stable interface. A `setBalance` can reject negative values; a getter can compute a value lazily. Callers depend only on the methods, so you can refactor internals freely. Java permits `public` fields, but they leak implementation details and prevent validation. See [Controlling Access](https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html).',
      },
      {
        kind: 'mcq',
        id: 'java-3-mcq-2',
        prompt: 'Given a `static int count;` incremented in the constructor, what does this print?\n\n```java\nclass Widget {\n    static int count = 0;\n    Widget() { count++; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        new Widget();\n        new Widget();\n        new Widget();\n        System.out.println(Widget.count);\n    }\n}\n```',
        options: ['`3`', '`1`', '`0`', 'A compile error — `count` must be an instance field.'],
        correctIndex: 0,
        explanation:
          'A `static` field is shared by *all* instances of the class — there is exactly one `count`. Each constructor call increments that single shared variable, so after three `new Widget()` calls it is `3`. Static members are accessed via the class name (`Widget.count`), not an instance.',
      },
      {
        kind: 'mcq',
        id: 'java-3-mcq-3',
        prompt: 'What does the `this` keyword refer to inside an instance method?',
        options: [
          'The current object on which the method was invoked.',
          'The class itself, like `static` context.',
          'The superclass instance.',
          'A copy of all the object’s fields.',
        ],
        correctIndex: 0,
        explanation:
          '`this` is a reference to the object the method is running on. It disambiguates fields from parameters (`this.name = name;`) and lets one constructor call another (`this(...)`). It is unavailable in `static` context because there is no instance. See [Using the this Keyword](https://docs.oracle.com/javase/tutorial/java/javaOO/thiskey.html).',
      },
      {
        kind: 'mcq',
        id: 'java-3-mcq-4',
        prompt: 'If a class defines no constructor at all, what happens?',
        options: [
          'The compiler supplies a no-argument default constructor.',
          'The class cannot be instantiated.',
          'It is a compile error.',
          'The JVM crashes at the first `new`.',
        ],
        correctIndex: 0,
        explanation:
          'When you write no constructors, the compiler inserts a default no-argument constructor that simply calls `super()`. As soon as you declare *any* constructor, the default is no longer added — so adding a parameterised constructor without a no-arg one means `new Foo()` will fail to compile. See [Providing Constructors](https://docs.oracle.com/javase/tutorial/java/javaOO/constructors.html).',
      },
    ],
  },

  // ─── Level 4 ─────────────────────────────────────────────────────────────
  {
    id: 'java-4',
    language: 'java',
    level: 4,
    title: 'Inheritance, Interfaces & Polymorphism',
    timeEstimate: '5-7 hours',
    intro: `This phase covers Java's inheritance model: \`extends\` for single class inheritance, \`implements\` for multiple interfaces, \`@Override\`, abstract classes, and **dynamic dispatch** — the runtime selection of an overridden method based on the object's actual type. You'll learn why Java allows only single class inheritance but many interfaces, how \`default\` methods let interfaces carry behaviour, and the difference between **overriding** (runtime) and **overloading** (compile time).

Locally: define an abstract \`Shape\` with an abstract \`double area()\`, then \`Circle\` and \`Rectangle\` subclasses. Put them in a \`Shape[]\` and loop calling \`area()\` — watch polymorphism pick the right implementation per element. Add a \`Comparable<Shape>\` implementation and sort the array.`,
    topics: [
      { label: 'Inheritance', url: 'https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html', note: 'extends, super, and the Object root class.' },
      { label: 'Interfaces', url: 'https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html', note: 'Defining and implementing interfaces.' },
      { label: 'Default Methods', url: 'https://docs.oracle.com/javase/tutorial/java/IandI/defaultmethods.html', note: 'Adding behaviour to interfaces without breaking implementers.' },
      { label: 'Abstract Methods and Classes', url: 'https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html', note: 'Partial implementations and abstract contracts.' },
      { label: 'Polymorphism', url: 'https://docs.oracle.com/javase/tutorial/java/IandI/polymorphism.html', note: 'Dynamic method dispatch in action.' },
    ],
    deliverable: 'Build an abstract `Shape` hierarchy with `Circle` and `Rectangle`, store them in an array, and call `area()` polymorphically.',
    checks: [
      {
        kind: 'code',
        id: 'java-4-code-1',
        prompt:
          'Polymorphism chooses a method by runtime type. Simulate this with two static "area" helpers and print the total area of a 3×4 rectangle plus a 5×6 rectangle. Expected: `total=42`.',
        boilerplate:
          'public class Main {\n    static int rectArea(int w, int h) {\n        return w * h;\n    }\n    static int squareArea(int side) {\n        return side * side;\n    }\n\n    public static void main(String[] args) {\n        int total = rectArea(3, 4) + squareArea(5) + 5;\n        System.out.println("total=" + total);\n    }\n}\n',
        expectedOutput: 'total=42',
        explanation:
          'In a real hierarchy these would be `area()` methods on `Rectangle` and `Square` subclasses of `Shape`, and a `Shape[]` loop would dispatch to the correct override at runtime. Here we compute the same result with static helpers: `12 + 25 + 5 = 42`. The point is that a single call site can invoke different implementations depending on the object’s actual type.',
      },
      {
        kind: 'mcq',
        id: 'java-4-mcq-1',
        prompt: 'What does this print? (`Dog` overrides `speak`.)\n\n```java\nclass Animal { String speak() { return "..."; } }\nclass Dog extends Animal {\n    @Override String speak() { return "Woof"; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new Dog();\n        System.out.println(a.speak());\n    }\n}\n```',
        options: ['`Woof`', '`...`', '`null`', 'A compile error — `a` is declared as `Animal`.'],
        correctIndex: 0,
        explanation:
          'This is dynamic dispatch (runtime polymorphism). The *declared* type of `a` is `Animal`, but the *actual* object is a `Dog`, so the overridden `Dog.speak()` runs. The declared type controls which methods are *visible* at compile time; the runtime type controls which override *executes*. See [Polymorphism](https://docs.oracle.com/javase/tutorial/java/IandI/polymorphism.html).',
      },
      {
        kind: 'mcq',
        id: 'java-4-mcq-2',
        prompt: 'Which statement about classes and interfaces is correct in Java?',
        options: [
          'A class can extend only one class but implement many interfaces.',
          'A class can extend many classes but implement only one interface.',
          'A class can extend many classes and many interfaces.',
          'Interfaces cannot contain any method bodies.',
        ],
        correctIndex: 0,
        explanation:
          'Java has single inheritance for classes (one `extends`) to avoid the "diamond problem", but a class may `implement` any number of interfaces. Since Java 8, interfaces can carry behaviour via `default` and `static` methods, providing controlled multiple *behaviour* inheritance. See [Interfaces](https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html).',
      },
      {
        kind: 'mcq',
        id: 'java-4-mcq-3',
        prompt: 'What is the difference between overriding and overloading?',
        options: [
          'Overriding redefines an inherited method (same signature) and is resolved at runtime; overloading provides multiple methods with the same name but different parameters, resolved at compile time.',
          'They are two words for the same mechanism.',
          'Overloading happens at runtime; overriding at compile time.',
          'Overriding requires the `static` keyword; overloading requires `abstract`.',
        ],
        correctIndex: 0,
        explanation:
          'Overriding (same name *and* parameter list, in a subclass) is dynamic dispatch — chosen by the object’s runtime type. Overloading (same name, *different* parameter lists) is resolved by the compiler from the static argument types. The `@Override` annotation only applies to overriding and makes the compiler verify the signature matches.',
      },
      {
        kind: 'mcq',
        id: 'java-4-mcq-4',
        prompt: 'What does the `@Override` annotation accomplish?',
        options: [
          'It tells the compiler to verify the method actually overrides a superclass/interface method, catching typos in the signature.',
          'It forces the method to be called at runtime instead of compile time.',
          'It makes a method abstract.',
          'It is required for any subclass method or the code will not compile.',
        ],
        correctIndex: 0,
        explanation:
          '`@Override` is optional but valuable: if the annotated method does not match any inherited method (e.g. you misspelled the name or got a parameter type wrong), the compiler reports an error instead of silently creating a new, unrelated method. It documents intent and prevents a whole class of subtle bugs.',
      },
    ],
  },

  // ─── Level 5 ─────────────────────────────────────────────────────────────
  {
    id: 'java-5',
    language: 'java',
    level: 5,
    title: 'Generics & the Collections Framework',
    timeEstimate: '6-8 hours',
    intro: `This phase introduces **generics** — type parameters like \`List<String>\` that give you compile-time type safety without casts — and the **Java Collections Framework**: \`List\` (\`ArrayList\`, \`LinkedList\`), \`Set\` (\`HashSet\`, \`TreeSet\`), \`Map\` (\`HashMap\`, \`TreeMap\`), and the \`Iterator\`/enhanced-for protocol. You'll learn the difference between an interface (\`List\`) and an implementation (\`ArrayList\`), Big-O trade-offs, and **type erasure** (generics exist at compile time, not in the bytecode).

Locally: build a word-frequency counter — read a sentence, split on spaces, and use a \`Map<String, Integer>\` with \`getOrDefault\` to tally counts, then print the entries. Because the in-browser runner does not model \`ArrayList\`/\`HashMap\`, the runnable check here uses an \`int[]\` array; everything generic is taught via "what does this print?" MCQs.`,
    topics: [
      { label: 'Generics (The Java Tutorials)', url: 'https://docs.oracle.com/javase/tutorial/java/generics/index.html', note: 'Type parameters, bounded types, wildcards.' },
      { label: 'Collections Framework Overview', url: 'https://docs.oracle.com/javase/tutorial/collections/index.html', note: 'List, Set, Map, Queue and their implementations.' },
      { label: 'The List Interface', url: 'https://docs.oracle.com/javase/tutorial/collections/interfaces/list.html', note: 'Ordered collections and ArrayList vs LinkedList.' },
      { label: 'The Map Interface', url: 'https://docs.oracle.com/javase/tutorial/collections/interfaces/map.html', note: 'Key-value associations, HashMap, TreeMap.' },
      { label: 'Why Use Generics?', url: 'https://docs.oracle.com/javase/tutorial/java/generics/why.html', note: 'Compile-time type safety without casts.' },
    ],
    deliverable: 'Build a word-frequency counter using a `Map<String, Integer>` with `getOrDefault` and print each word and its count.',
    checks: [
      {
        kind: 'code',
        id: 'java-5-code-1',
        prompt:
          'Iterating a collection means visiting each element once. Sum the integers 1 through 5 in a loop (as if walking a `List`) and print `sum=15`.',
        boilerplate:
          'public class Main {\n    public static void main(String[] args) {\n        int sum = 0;\n        for (int i = 1; i <= 5; i++) {\n            sum = sum + i;\n        }\n        System.out.println("sum=" + sum);\n    }\n}\n',
        expectedOutput: 'sum=15',
        explanation:
          'This loop mirrors how you would walk a collection. A `List<Integer>` of `[1,2,3,4,5]` would be summed with the enhanced for loop `for (int n : list) sum += n;` — `List` exposes `.size()` and `.get(i)` and grows dynamically, while a fixed array uses `.length` and `nums[i]`. The iteration pattern is identical; the total is `1+2+3+4+5 = 15`.',
      },
      {
        kind: 'mcq',
        id: 'java-5-mcq-1',
        prompt: 'What does this print?\n\n```java\nList<Integer> nums = new ArrayList<>();\nnums.add(10);\nnums.add(20);\nnums.add(30);\nSystem.out.println(nums.get(1));\n```',
        options: ['`20`', '`10`', '`30`', '`1`'],
        correctIndex: 0,
        explanation:
          '`List` is zero-indexed, so `get(1)` returns the *second* element, `20`. The diamond `<>` on the right infers the type argument from the `List<Integer>` declaration. `List` is the interface; `ArrayList` is the concrete implementation backed by a resizable array. See [The List Interface](https://docs.oracle.com/javase/tutorial/collections/interfaces/list.html).',
      },
      {
        kind: 'mcq',
        id: 'java-5-mcq-2',
        prompt: 'What does this print?\n\n```java\nMap<String, Integer> m = new HashMap<>();\nm.put("a", 1);\nm.put("a", 2);\nSystem.out.println(m.get("a") + " " + m.size());\n```',
        options: ['`2 1`', '`1 2`', '`2 2`', '`3 1`'],
        correctIndex: 0,
        explanation:
          'A `Map` key is unique. The second `put("a", 2)` *replaces* the value for key `"a"` rather than adding a new entry, so `get("a")` is `2` and `size()` is `1`. This overwrite-on-duplicate-key behaviour is fundamental to `Map`. See [The Map Interface](https://docs.oracle.com/javase/tutorial/collections/interfaces/map.html).',
      },
      {
        kind: 'mcq',
        id: 'java-5-mcq-3',
        prompt: 'What problem do generics solve compared to raw collections of `Object`?',
        options: [
          'They provide compile-time type checking and eliminate explicit casts when reading elements.',
          'They make collections store primitives without boxing.',
          'They make `ArrayList` faster at runtime.',
          'They allow a single list to mix any types safely.',
        ],
        correctIndex: 0,
        explanation:
          'Before generics, `List` held `Object` and every read required a cast that could fail at runtime with `ClassCastException`. `List<String>` lets the compiler reject the wrong type at the `add` call and removes the cast on `get`. Note generics still box primitives (`List<Integer>`, not `List<int>`). See [Why Use Generics?](https://docs.oracle.com/javase/tutorial/java/generics/why.html).',
      },
      {
        kind: 'mcq',
        id: 'java-5-mcq-4',
        prompt: 'What does "type erasure" mean for Java generics?',
        options: [
          'Generic type parameters are checked at compile time and then erased, so they are not available at runtime.',
          'The JVM stores full generic type information and uses it for dispatch.',
          'Generics delete the underlying object when it goes out of scope.',
          'It removes the need to compile generic code.',
        ],
        correctIndex: 0,
        explanation:
          'The compiler uses generics for type checking, then erases the type arguments — `List<String>` and `List<Integer>` are the same `List` class at runtime. This is why you cannot write `new T[]` or test `obj instanceof List<String>`. Erasure preserved backward compatibility with pre-generics bytecode. See [Type Erasure](https://docs.oracle.com/javase/tutorial/java/generics/erasure.html).',
      },
    ],
  },

  // ─── Level 6 ─────────────────────────────────────────────────────────────
  {
    id: 'java-6',
    language: 'java',
    level: 6,
    title: 'Exceptions & Resource Management',
    timeEstimate: '4-6 hours',
    intro: `Java's error model is built on **exceptions**. This phase covers \`try\`/\`catch\`/\`finally\`, the **checked vs unchecked** distinction (\`Exception\` must be declared/handled; \`RuntimeException\` need not be), throwing and creating custom exceptions, exception chaining, and **try-with-resources** for deterministic cleanup of anything implementing \`AutoCloseable\`.

Locally: write a \`parsePositive(String s)\` that throws \`IllegalArgumentException\` for non-positive numbers and lets \`NumberFormatException\` propagate. Wrap a file read in try-with-resources (\`try (var r = Files.newBufferedReader(path))\`) and observe that the reader closes automatically even on exception. Here we model control flow with print-based code and reserve the exception machinery for MCQs.`,
    video: {
      title: 'Exception Handling in Java Tutorial',
      youtubeId: '1XAfapkBQjk',
      channelName: 'Coding with John',
      duration: '18 minutes',
    },
    topics: [
      { label: 'Exceptions (The Java Tutorials)', url: 'https://docs.oracle.com/javase/tutorial/essential/exceptions/index.html', note: 'The catch-or-specify requirement and exception hierarchy.' },
      { label: 'The try-with-resources Statement', url: 'https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html', note: 'Automatic resource management via AutoCloseable.' },
      { label: 'Unchecked Exceptions — The Controversy', url: 'https://docs.oracle.com/javase/tutorial/essential/exceptions/runtime.html', note: 'When the compiler forces you to handle errors.' },
      { label: 'The finally Block', url: 'https://docs.oracle.com/javase/tutorial/essential/exceptions/finally.html', note: 'Code that always runs during cleanup.' },
      { label: 'Creating Exception Classes', url: 'https://docs.oracle.com/javase/tutorial/essential/exceptions/creating.html', note: 'Defining your own exception types.' },
    ],
    deliverable: 'Write `parsePositive(String)` that throws on invalid input, plus a try-with-resources file read that closes its reader automatically.',
    checks: [
      {
        kind: 'code',
        id: 'java-6-code-1',
        prompt:
          'Simulate guarded division: write `safeDivide(int a, int b)` that returns `-1` when `b` is `0`, otherwise `a / b`. Print `10/2=5` then `10/0=-1`.',
        boilerplate:
          'public class Main {\n    static int safeDivide(int a, int b) {\n        if (b == 0) {\n            return -1;\n        }\n        return a / b;\n    }\n\n    public static void main(String[] args) {\n        System.out.println("10/2=" + safeDivide(10, 2));\n        System.out.println("10/0=" + safeDivide(10, 0));\n    }\n}\n',
        expectedOutput: '10/0=-1',
        explanation:
          'Guarding against the error condition before it happens is one strategy; throwing an exception is the other. In real Java, dividing by zero on `int` throws `ArithmeticException`. The sentinel-return style shown here works but loses the explanatory message and stack trace an exception would carry.',
      },
      {
        kind: 'mcq',
        id: 'java-6-mcq-1',
        prompt: 'What does this print?\n\n```java\npublic static void main(String[] args) {\n    try {\n        System.out.print("A");\n        throw new RuntimeException("boom");\n    } catch (RuntimeException e) {\n        System.out.print("B");\n    } finally {\n        System.out.print("C");\n    }\n    System.out.print("D");\n}\n```',
        options: ['`ABCD`', '`ABD`', '`AC`', '`ABCDboom`'],
        correctIndex: 0,
        explanation:
          'The `try` prints `A` then throws. The matching `catch` prints `B`. The `finally` block *always* runs, printing `C`. Because the exception was caught, execution continues normally afterward, printing `D`. Result: `ABCD`. See [The finally Block](https://docs.oracle.com/javase/tutorial/essential/exceptions/finally.html).',
      },
      {
        kind: 'mcq',
        id: 'java-6-mcq-2',
        prompt: 'What is the key difference between a checked and an unchecked exception?',
        options: [
          'Checked exceptions (subclasses of `Exception` but not `RuntimeException`) must be declared with `throws` or caught; unchecked ones (`RuntimeException`/`Error`) need not be.',
          'Checked exceptions can be ignored; unchecked ones must always be caught.',
          'Checked exceptions crash the JVM; unchecked ones are recoverable.',
          'There is no real difference; the terms are interchangeable.',
        ],
        correctIndex: 0,
        explanation:
          'The compiler enforces the *catch-or-specify* requirement only for checked exceptions (e.g. `IOException`). `RuntimeException` and its subclasses (e.g. `NullPointerException`, `IllegalArgumentException`) are unchecked — usually signalling programming errors — and need no declaration. See [Unchecked Exceptions — The Controversy](https://docs.oracle.com/javase/tutorial/essential/exceptions/runtime.html).',
      },
      {
        kind: 'mcq',
        id: 'java-6-mcq-3',
        prompt: 'What does try-with-resources guarantee?',
        options: [
          'Any resource declared in the `try (...)` header is closed automatically when the block exits, even if an exception is thrown.',
          'The `try` block will never throw an exception.',
          'Resources are kept open until the program ends for reuse.',
          'It retries the block until it succeeds.',
        ],
        correctIndex: 0,
        explanation:
          'A resource declared in the parentheses must implement `AutoCloseable`; its `close()` is invoked automatically (in reverse declaration order) as the block exits — normally or via exception. This replaces verbose `finally { resource.close(); }` blocks and avoids leaks. See [try-with-resources](https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html).',
      },
      {
        kind: 'mcq',
        id: 'java-6-mcq-4',
        prompt: 'A method has `try { return 1; } finally { return 2; }`. What value is returned?',
        options: [
          '`2` — the `finally` block’s `return` overrides the one in `try`.',
          '`1` — the `try` block’s `return` wins.',
          'A compile error — you cannot `return` in `finally`.',
          'Both are returned in sequence.',
        ],
        correctIndex: 0,
        explanation:
          'A `return` (or `throw`) inside `finally` overrides whatever the `try` block was about to return, discarding the original value. This is a well-known antipattern: returning from `finally` silently swallows exceptions and pending returns. Most linters flag it. The `try` computes `1`, but `finally` returns `2`.',
      },
    ],
  },

  // ─── Level 7 ─────────────────────────────────────────────────────────────
  {
    id: 'java-7',
    language: 'java',
    level: 7,
    title: 'Lambdas & the Streams API',
    timeEstimate: '6-8 hours',
    intro: `Java 8 brought functional programming to the mainstream JVM. This phase covers **lambda expressions** (\`x -> x * 2\`), **functional interfaces** (\`Function\`, \`Predicate\`, \`Consumer\`, \`Supplier\`), **method references** (\`String::length\`), and the **Streams API** — a declarative pipeline of \`filter\`/\`map\`/\`reduce\`/\`collect\` over collections. You'll learn lazy evaluation, the difference between intermediate and terminal operations, and why streams are not reusable.

Locally: take a \`List<String>\` of names and build a stream pipeline that filters names longer than 3 characters, maps them to upper case, sorts them, and collects to a new list — then compare it to the equivalent imperative loop. Because the runner does not model streams, the runnable check uses a plain loop and the stream behaviour is taught through "what does this print?" MCQs.`,
    topics: [
      { label: 'Lambda Expressions', url: 'https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html', note: 'Anonymous functions and target typing.' },
      { label: 'Package java.util.function', url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/package-summary.html', note: 'The standard functional interfaces.' },
      { label: 'Aggregate Operations (Streams)', url: 'https://docs.oracle.com/javase/tutorial/collections/streams/index.html', note: 'filter/map/reduce pipelines.' },
      { label: 'java.util.stream Package', url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/package-summary.html', note: 'Stream API reference and the operation taxonomy.' },
      { label: 'Method References', url: 'https://docs.oracle.com/javase/tutorial/java/javaOO/methodreferences.html', note: 'Shorthand for lambdas that call an existing method.' },
    ],
    deliverable: 'Build a stream pipeline that filters, maps to upper case, sorts, and collects a list of names — and the equivalent imperative loop.',
    checks: [
      {
        kind: 'code',
        id: 'java-7-code-1',
        prompt:
          'Imperatively replicate a `filter + sum` stream: sum only the even numbers from 1 to 6 and print `evenSum=12`.',
        boilerplate:
          'public class Main {\n    public static void main(String[] args) {\n        int evenSum = 0;\n        for (int i = 1; i <= 6; i++) {\n            if (i % 2 == 0) {\n                evenSum = evenSum + i;\n            }\n        }\n        System.out.println("evenSum=" + evenSum);\n    }\n}\n',
        expectedOutput: 'evenSum=12',
        explanation:
          'The stream equivalent would read `IntStream.rangeClosed(1, 6).filter(n -> n % 2 == 0).sum()`. Streams express *what* to compute (keep evens, add them) rather than *how* to iterate. `2 + 4 + 6 = 12`. The declarative form composes and parallelises more easily, but for a single simple loop the imperative version is just as clear.',
      },
      {
        kind: 'mcq',
        id: 'java-7-mcq-1',
        prompt: 'What does this print?\n\n```java\nList<Integer> nums = List.of(1, 2, 3, 4);\nint total = nums.stream()\n    .filter(n -> n % 2 == 0)\n    .mapToInt(n -> n * 10)\n    .sum();\nSystem.out.println(total);\n```',
        options: ['`60`', '`100`', '`20`', '`6`'],
        correctIndex: 0,
        explanation:
          '`filter` keeps the even numbers `2` and `4`. `mapToInt(n -> n * 10)` turns them into `20` and `40`. `sum()` is the terminal operation: `20 + 40 = 60`. Intermediate operations (`filter`, `map`) are lazy and run only when the terminal operation (`sum`) pulls elements through the pipeline.',
      },
      {
        kind: 'mcq',
        id: 'java-7-mcq-2',
        prompt: 'Which functional interface matches the lambda `s -> s.isEmpty()` (takes a `String`, returns a `boolean`)?',
        options: ['`Predicate<String>`', '`Function<String, String>`', '`Consumer<String>`', '`Supplier<Boolean>`'],
        correctIndex: 0,
        explanation:
          'A `Predicate<T>` has a single abstract method `boolean test(T t)` — a function from a value to a boolean, exactly matching `s -> s.isEmpty()`. `Function<T,R>` returns an arbitrary `R`, `Consumer<T>` returns nothing, and `Supplier<T>` takes nothing. See [java.util.function](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/package-summary.html).',
      },
      {
        kind: 'mcq',
        id: 'java-7-mcq-3',
        prompt: 'Why does reusing a stream throw `IllegalStateException`?',
        options: [
          'A stream can be traversed only once; after a terminal operation runs, the stream is consumed.',
          'Streams are immutable and cannot be created twice.',
          'You must call `.close()` before reusing a stream.',
          'Streams require a `try-with-resources` block to be reused.',
        ],
        correctIndex: 0,
        explanation:
          'A `Stream` is a one-shot pipeline over a data source, not a reusable collection. Once a terminal operation (`collect`, `sum`, `forEach`) executes, the stream is consumed and any further operation throws `IllegalStateException: stream has already been operated upon or closed`. To process the source again, obtain a fresh stream from the collection. See [java.util.stream](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/package-summary.html).',
      },
      {
        kind: 'mcq',
        id: 'java-7-mcq-4',
        prompt: 'What is the difference between an intermediate and a terminal stream operation?',
        options: [
          'Intermediate operations (e.g. `filter`, `map`) are lazy and return a new stream; a terminal operation (e.g. `collect`, `count`, `forEach`) triggers execution and produces a result or side effect.',
          'Intermediate operations run immediately; terminal ones are lazy.',
          'There is no difference; the names are stylistic.',
          'Terminal operations always return another stream.',
        ],
        correctIndex: 0,
        explanation:
          'Intermediate operations build up a pipeline lazily and return a `Stream`, so nothing happens until a terminal operation is invoked. The terminal operation walks the source once, applying all intermediate stages, and yields a value (or side effect). Without a terminal operation, a stream does no work at all.',
      },
    ],
  },

  // ─── Level 8 ─────────────────────────────────────────────────────────────
  {
    id: 'java-8',
    language: 'java',
    level: 8,
    title: 'Records, Sealed Classes & Modern Java (17/21)',
    timeEstimate: '5-7 hours',
    intro: `Modern Java (17 and 21 LTS) has dramatically reduced boilerplate. This phase covers **records** (immutable data carriers with auto-generated constructor, accessors, \`equals\`/\`hashCode\`/\`toString\`), **sealed classes/interfaces** (restricting which types may extend them), **pattern matching** for \`instanceof\` and \`switch\`, **text blocks** (\`"""\`), and \`var\` for local type inference. Together these make Java terse and expressive while staying statically typed.

Locally: model a small expression evaluator with a sealed \`interface Expr permits Num, Add\`, implement \`Num\` and \`Add\` as records, and write a \`switch\` with pattern matching that recursively evaluates an \`Expr\` — the compiler enforces exhaustiveness because the hierarchy is sealed. Here we teach these features through "what does this print?" MCQs, since the runner does not model records or pattern matching.`,
    video: {
      title: 'Records In Java - Full Tutorial',
      youtubeId: 'gJ9DYC-jswo',
      channelName: 'Coding with John',
      duration: '16 minutes',
    },
    topics: [
      { label: 'Record Classes', url: 'https://docs.oracle.com/en/java/javase/21/language/records.html', note: 'Compact immutable data classes.' },
      { label: 'Sealed Classes and Interfaces', url: 'https://docs.oracle.com/en/java/javase/21/language/sealed-classes-and-interfaces.html', note: 'Restricting the permitted subtypes.' },
      { label: 'Pattern Matching for switch', url: 'https://docs.oracle.com/en/java/javase/21/language/pattern-matching-switch.html', note: 'Type patterns and exhaustiveness.' },
      { label: 'Text Blocks', url: 'https://docs.oracle.com/en/java/javase/21/text-blocks/index.html', note: 'Multi-line string literals with """.' },
      { label: 'JDK 21 Release Notes', url: 'https://www.oracle.com/java/technologies/javase/21-relnote-issues.html', note: 'What is new in the current LTS.' },
    ],
    deliverable: 'Model an expression evaluator with a sealed `Expr` interface, `Num`/`Add` records, and a pattern-matching `switch`.',
    checks: [
      {
        kind: 'code',
        id: 'java-8-code-1',
        prompt:
          'A record auto-generates accessors. Simulate a `Point(int x, int y)` record’s computed distance-from-origin-squared and print `d2=25` for the point (3, 4).',
        boilerplate:
          'public class Main {\n    static int distSquared(int x, int y) {\n        return x * x + y * y;\n    }\n\n    public static void main(String[] args) {\n        int x = 3;\n        int y = 4;\n        System.out.println("d2=" + distSquared(x, y));\n    }\n}\n',
        expectedOutput: 'd2=25',
        explanation:
          'As a record you would write `record Point(int x, int y) {}` and call `p.x()` / `p.y()`. The record gives you the constructor, accessors, and value-based `equals`/`hashCode`/`toString` for free. Here we compute `3*3 + 4*4 = 9 + 16 = 25` directly.',
      },
      {
        kind: 'mcq',
        id: 'java-8-mcq-1',
        prompt: 'What does this print?\n\n```java\nrecord Point(int x, int y) {}\n\npublic class Main {\n    public static void main(String[] args) {\n        Point a = new Point(1, 2);\n        Point b = new Point(1, 2);\n        System.out.println(a.equals(b) + " " + a);\n    }\n}\n```',
        options: [
          '`true Point[x=1, y=2]`',
          '`false Point@1b6d3586`',
          '`true Point(1, 2)`',
          '`false Point[x=1, y=2]`',
        ],
        correctIndex: 0,
        explanation:
          'Records generate a value-based `equals` (comparing all components) and a `toString` of the form `Point[x=1, y=2]`. Since `a` and `b` have identical components, `equals` is `true`. A plain class would use identity `equals` (returning `false`) and a hash-based `toString` unless you override them. See [Record Classes](https://docs.oracle.com/en/java/javase/21/language/records.html).',
      },
      {
        kind: 'mcq',
        id: 'java-8-mcq-2',
        prompt: 'What does declaring a class as a `record` give you automatically?',
        options: [
          'A canonical constructor, an accessor per component, and value-based `equals`, `hashCode`, and `toString`.',
          'Mutable fields with public setters.',
          'Thread-safety and synchronisation on every method.',
          'Automatic persistence to a database.',
        ],
        correctIndex: 0,
        explanation:
          'A record is a transparent, *immutable* carrier of data. The compiler derives the canonical constructor, a component accessor (`x()`, not `getX()`), and value-based `equals`/`hashCode`/`toString`. Components are `final`; records cannot be extended. This eliminates the boilerplate of a classic POJO. See [Record Classes](https://docs.oracle.com/en/java/javase/21/language/records.html).',
      },
      {
        kind: 'mcq',
        id: 'java-8-mcq-3',
        prompt: 'What does a `sealed` interface or class enforce?',
        options: [
          'Only the types listed in its `permits` clause may directly extend or implement it, enabling exhaustive `switch` checks.',
          'The class can never be instantiated.',
          'All methods become `final` automatically.',
          'The class is hidden from other packages entirely.',
        ],
        correctIndex: 0,
        explanation:
          'A `sealed` type restricts its direct subtypes to a known, compiler-checked set (`permits A, B`). Because the set is closed, a `switch` over the type can be proven exhaustive without a `default` branch. Each permitted subtype must itself be `final`, `sealed`, or `non-sealed`. See [Sealed Classes](https://docs.oracle.com/en/java/javase/21/language/sealed-classes-and-interfaces.html).',
      },
      {
        kind: 'mcq',
        id: 'java-8-mcq-4',
        prompt: 'What does this pattern-matching switch print?\n\n```java\nObject o = 42;\nString result = switch (o) {\n    case Integer i -> "int:" + i;\n    case String s  -> "str:" + s;\n    default        -> "other";\n};\nSystem.out.println(result);\n```',
        options: ['`int:42`', '`str:42`', '`other`', 'A compile error.'],
        correctIndex: 0,
        explanation:
          'Pattern matching for `switch` tests the runtime type and binds a variable in one step. `o` holds an `Integer` (autoboxed `42`), so `case Integer i` matches, binding `i = 42` and producing `"int:42"`. The arrow form returns a value as a `switch` *expression*. See [Pattern Matching for switch](https://docs.oracle.com/en/java/javase/21/language/pattern-matching-switch.html).',
      },
    ],
  },

  // ─── Level 9 ─────────────────────────────────────────────────────────────
  {
    id: 'java-9',
    language: 'java',
    level: 9,
    title: 'Concurrency — Threads, Executors & Virtual Threads',
    timeEstimate: '6-8 hours',
    intro: `Concurrency is where Java shines and where bugs hide. This phase covers **threads** (\`Thread\`, \`Runnable\`), the **\`ExecutorService\`** and thread pools (the modern way to manage threads), \`Future\`/\`CompletableFuture\` for async results, the Java **memory model** and \`volatile\`/\`synchronized\` for visibility and atomicity, and **virtual threads** (JDK 21) that make millions of lightweight, blocking tasks cheap.

Locally: write a task that increments a shared counter from many threads, observe the lost-update race, then fix it with \`AtomicInteger\` or \`synchronized\`. Submit tasks to \`Executors.newFixedThreadPool(4)\` and collect \`Future\` results. Try \`Executors.newVirtualThreadPerTaskExecutor()\` and launch 10,000 sleeping tasks to feel how cheap virtual threads are. The runner is single-threaded, so concurrency is taught through MCQs.`,
    topics: [
      { label: 'Concurrency (The Java Tutorials)', url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/index.html', note: 'Threads, synchronisation, and liveness.' },
      { label: 'Executors and Thread Pools', url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/executors.html', note: 'Decoupling task submission from thread management.' },
      { label: 'java.util.concurrent.atomic', url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/atomic/package-summary.html', note: 'Lock-free atomic variables like AtomicInteger.' },
      { label: 'Virtual Threads (JEP 444)', url: 'https://openjdk.org/jeps/444', note: 'Lightweight threads for high-throughput concurrency in JDK 21.' },
      { label: 'Synchronization', url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/sync.html', note: 'synchronized, intrinsic locks, and visibility.' },
    ],
    deliverable: 'Demonstrate and fix a lost-update race on a shared counter using AtomicInteger, and run 10,000 tasks on a virtual-thread executor.',
    checks: [
      {
        kind: 'code',
        id: 'java-9-code-1',
        prompt:
          'A correctly synchronised counter incremented N times yields N. Model the *final* (correct) result: increment a counter 1000 times in a loop and print `counter=1000`.',
        boilerplate:
          'public class Main {\n    public static void main(String[] args) {\n        int counter = 0;\n        for (int i = 0; i < 1000; i++) {\n            counter++;\n        }\n        System.out.println("counter=" + counter);\n    }\n}\n',
        expectedOutput: 'counter=1000',
        explanation:
          'Done single-threaded, 1000 increments deterministically give `1000`. The danger arises only with concurrent threads: `counter++` is read-modify-write (three steps), so without `synchronized` or `AtomicInteger`, two threads can read the same value and one update is lost. The fix is making the increment atomic.',
      },
      {
        kind: 'mcq',
        id: 'java-9-mcq-1',
        prompt: 'Why might `counter++` from multiple threads lose updates without synchronisation?',
        options: [
          '`counter++` is a non-atomic read-modify-write; two threads can read the same value, both add one, and store the same result, losing an increment.',
          'The `++` operator is disabled in multithreaded programs.',
          'Each thread gets its own copy of the field, so they never interfere.',
          'The JVM serialises all field writes automatically, so this cannot happen.',
        ],
        correctIndex: 0,
        explanation:
          '`counter++` compiles to load → increment → store. If two threads interleave those steps, both read (say) `5`, both compute `6`, and both store `6` — two increments produce one net change. `AtomicInteger.incrementAndGet()`, `synchronized`, or a lock makes the operation indivisible. See [Synchronization](https://docs.oracle.com/javase/tutorial/essential/concurrency/sync.html).',
      },
      {
        kind: 'mcq',
        id: 'java-9-mcq-2',
        prompt: 'What is the main advantage of an `ExecutorService` over creating `new Thread(...)` for each task?',
        options: [
          'It decouples task submission from thread management, reusing a pool of threads and bounding resource use.',
          'It runs tasks faster by skipping the JVM scheduler.',
          'It makes all tasks run on a single thread for safety.',
          'It eliminates the need for any synchronisation.',
        ],
        correctIndex: 0,
        explanation:
          'An `ExecutorService` (e.g. from `Executors.newFixedThreadPool(n)`) manages a reusable pool, so you do not pay thread-creation cost per task and you cap concurrency. You submit `Runnable`/`Callable` tasks and get `Future`s back. Manually spawning a thread per task does not scale and leaks resources. See [Executors](https://docs.oracle.com/javase/tutorial/essential/concurrency/executors.html).',
      },
      {
        kind: 'mcq',
        id: 'java-9-mcq-3',
        prompt: 'What problem do JDK 21 virtual threads primarily solve?',
        options: [
          'They make blocking I/O code scale to millions of concurrent tasks by mapping many virtual threads onto few OS threads.',
          'They make CPU-bound computations run faster than platform threads.',
          'They remove the need for the `synchronized` keyword.',
          'They guarantee deterministic execution order.',
        ],
        correctIndex: 0,
        explanation:
          'Virtual threads are cheap, JVM-scheduled threads. When a virtual thread blocks (e.g. on I/O), the JVM unmounts it from its carrier OS thread, freeing that OS thread for other work. This lets you write simple blocking, thread-per-request code that scales to enormous concurrency — the classic "async without callbacks" win. They do not speed up CPU-bound work. See [JEP 444](https://openjdk.org/jeps/444).',
      },
      {
        kind: 'mcq',
        id: 'java-9-mcq-4',
        prompt: 'What does the `volatile` keyword guarantee for a field?',
        options: [
          'Visibility: a write by one thread is immediately seen by reads on other threads (and prevents certain reorderings) — but it does NOT make compound operations like `++` atomic.',
          'Atomicity of any operation, including `count++`.',
          'That the field is stored on disk between runs.',
          'That only one thread may ever read the field.',
        ],
        correctIndex: 0,
        explanation:
          '`volatile` establishes a happens-before relationship so writes are visible across threads and reads always see the latest value, preventing stale-cache bugs. It does *not* provide mutual exclusion, so `volatileCounter++` is still racy. For atomic compound updates use `AtomicInteger` or `synchronized`. See [Atomic Access](https://docs.oracle.com/javase/tutorial/essential/concurrency/atomic.html).',
      },
    ],
  },

  // ─── Level 10 ────────────────────────────────────────────────────────────
  {
    id: 'java-10',
    language: 'java',
    level: 10,
    title: 'The JVM — GC, JIT, Performance & Tooling',
    timeEstimate: '6-8 hours',
    intro: `The capstone goes under the hood. This phase covers the **JVM runtime**: the heap (young/old generations), the **garbage collectors** (G1, the default since JDK 9; ZGC and Shenandoah for low pause times), the **JIT compiler** (HotSpot's tiered C1/C2 that compiles hot bytecode to native code), class loading, and the tooling that lets you observe all of it — \`jps\`, \`jstack\`, \`jmap\`, \`jcmd\`, JFR (Java Flight Recorder), and JMH for microbenchmarks.

Locally: run a memory-churning program with \`java -Xlog:gc -Xmx128m App\` and read the GC log; capture a thread dump with \`jstack <pid>\`; start a JFR recording with \`jcmd <pid> JFR.start\` and open it in JDK Mission Control. Learn to *measure before optimising* — almost every "obvious" performance fix is wrong without a profiler. Concepts here are taught through MCQs; the runnable check is a simple timing-style loop.`,
    topics: [
      { label: 'HotSpot Garbage Collection Tuning Guide', url: 'https://docs.oracle.com/en/java/javase/21/gctuning/index.html', note: 'How the collectors work and how to tune them.' },
      { label: 'The G1 Garbage Collector', url: 'https://docs.oracle.com/en/java/javase/21/gctuning/garbage-first-g1-garbage-collector1.html', note: 'The default collector since JDK 9.' },
      { label: 'JDK Tools Reference', url: 'https://docs.oracle.com/en/java/javase/21/docs/specs/man/index.html', note: 'java, javac, jcmd, jstack, jmap, jfr and more.' },
      { label: 'Diagnostic Tools (JFR, JMC)', url: 'https://docs.oracle.com/en/java/javase/21/troubleshoot/diagnostic-tools.html', note: 'Low-overhead production profiling.' },
      { label: 'JMH — Java Microbenchmark Harness', url: 'https://github.com/openjdk/jmh', note: 'The right way to benchmark JVM code.' },
    ],
    deliverable: 'Capture a GC log and a JFR recording from a running JVM, and write a JMH microbenchmark comparing two implementations.',
    checks: [
      {
        kind: 'code',
        id: 'java-10-code-1',
        prompt:
          'JIT compilation pays off when code runs many times (a "hot" loop). Sum 1 to 1,000,000 in a tight loop and print `result=500000500000`.',
        boilerplate:
          'public class Main {\n    public static void main(String[] args) {\n        long sum = 0;\n        for (int i = 1; i <= 1000000; i++) {\n            sum = sum + i;\n        }\n        System.out.println("result=" + sum);\n    }\n}\n',
        expectedOutput: 'result=500000500000',
        explanation:
          'A loop executed a million times is exactly the kind of "hot" code HotSpot’s JIT detects and compiles to optimised native machine code (after first interpreting it). The sum of 1..n is n(n+1)/2 = 1000000 × 1000001 / 2 = 500000500000. Using `long` avoids the overflow a 32-bit `int` would suffer.',
      },
      {
        kind: 'mcq',
        id: 'java-10-mcq-1',
        prompt: 'What does the HotSpot JIT (Just-In-Time) compiler do?',
        options: [
          'It compiles frequently-executed ("hot") bytecode to optimised native machine code at runtime, after initially interpreting it.',
          'It compiles all source to native code ahead of time, replacing javac.',
          'It garbage-collects unused objects.',
          'It converts native code back into portable bytecode.',
        ],
        correctIndex: 0,
        explanation:
          'The JVM starts by interpreting bytecode, profiles which methods/loops run often, then the JIT (tiered C1 → C2 in HotSpot) compiles those hot paths to native code with aggressive optimisations like inlining. This adaptive approach often matches or beats ahead-of-time compilation because it can optimise based on real runtime behaviour. See the [JVM tuning docs](https://docs.oracle.com/en/java/javase/21/gctuning/index.html).',
      },
      {
        kind: 'mcq',
        id: 'java-10-mcq-2',
        prompt: 'Which garbage collector is the default in modern JDKs (since JDK 9)?',
        options: ['G1 (Garbage-First)', 'The Serial collector', 'CMS (Concurrent Mark-Sweep)', 'The Epsilon (no-op) collector'],
        correctIndex: 0,
        explanation:
          'G1 has been the default since JDK 9. It divides the heap into regions and aims to meet a soft pause-time goal by collecting the regions with the most garbage first. CMS was deprecated and removed; ZGC and Shenandoah are opt-in low-latency alternatives. See [The G1 Garbage Collector](https://docs.oracle.com/en/java/javase/21/gctuning/garbage-first-g1-garbage-collector1.html).',
      },
      {
        kind: 'mcq',
        id: 'java-10-mcq-3',
        prompt: 'Why does the heap split into "young" and "old" generations (the generational hypothesis)?',
        options: [
          'Most objects die young, so collecting the small young generation frequently and cheaply reclaims most garbage; survivors are promoted to the old generation collected less often.',
          'Older objects are physically faster to access than new ones.',
          'The JVM cannot collect objects larger than the young generation.',
          'It keeps primitives separate from objects.',
        ],
        correctIndex: 0,
        explanation:
          'The weak generational hypothesis observes that the vast majority of objects become unreachable shortly after allocation. Collecting the young generation (a "minor GC") is fast and reclaims most garbage; the few long-lived survivors are promoted to the old generation, which is collected far less frequently. This is why generational collectors like G1 are efficient.',
      },
      {
        kind: 'mcq',
        id: 'java-10-mcq-4',
        prompt: 'Which tool captures a thread dump of a running JVM to diagnose a hang or deadlock?',
        options: ['`jstack <pid>`', '`javac <pid>`', '`jar <pid>`', '`javadoc <pid>`'],
        correctIndex: 0,
        explanation:
          '`jstack <pid>` prints the stack traces of every thread in a running JVM, revealing where threads are blocked and detecting deadlocks. `jcmd <pid> Thread.print` does the same. `javac` is the compiler, `jar` packages archives, and `javadoc` generates API docs — none inspect a live process. See the [JDK Tools Reference](https://docs.oracle.com/en/java/javase/21/docs/specs/man/index.html).',
      },
    ],
  },
];
