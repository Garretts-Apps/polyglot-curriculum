import type { Phase } from './types';

export const cppPhases: Phase[] = [
  // ─── Level 0 ─────────────────────────────────────────────────────────────
  {
    id: 'cpp-0',
    language: 'cpp',
    level: 0,
    title: 'Setup & Hello World',
    timeEstimate: '0.5-1 hours',
    intro: `Welcome to C++ — and, if this is your very first program, welcome to programming. A *program* is just a list of written instructions that the computer carries out one after another, top to bottom. C++ is one *language* for writing those instructions; a tool called a **compiler** (\`g++\` or \`clang++\`) translates your text into the 1s and 0s the machine actually runs. In this level you'll install a modern compiler, confirm it understands at least the C++17 version of the language, and run a program that prints the words \`Hello, World!\` to the screen.

Here is the whole program. Don't worry that it looks cryptic — we will name every single piece below.

\`\`\`cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
\`\`\`

Read it top to bottom, token by token (a *token* is the smallest meaningful chunk of text — a word or a symbol):

- **\`#include <iostream>\`** — A line starting with \`#\` is a message to the compiler *before* your program is built, telling it to paste in some pre-written code. \`include\` means "bring this in". \`<iostream>\` is the name of a built-in toolbox (the "input/output stream" library). It contains the machinery for printing to the screen. Why is it here? Because the printing tool we use below (\`std::cout\`) lives in that toolbox — without this line the compiler wouldn't know what \`std::cout\` means and would refuse to build. If you remove it: a compile error.
- **\`int main()\`** — This declares a **function**. A function is a named block of instructions. This one is named \`main\`, and \`main\` is special: it is the **starting point** — when you run the program, the computer looks for \`main\` and begins there. The word \`int\` in front is the function's *return type*: it promises to hand back a whole number (\`int\` = "integer", a number with no fractional part) when it finishes. The empty parentheses \`()\` mean "this function takes no information in". The \`{\` and matching \`}\` are braces that fence off the function's body — everything between them is what \`main\` does.
- **\`std::cout << "Hello, World!" << std::endl;\`** — This is the line that actually prints. We break it down fully in the code exercise below, but in short: \`std::cout\` is the screen (the standard output), \`<<\` is the arrow that feeds something into it, \`"Hello, World!"\` is the literal text to print, and \`std::endl\` ends the line. The \`;\` at the end is a **semicolon** — it marks the end of a statement, the way a period ends a sentence. Almost every C++ statement ends with one.
- **\`return 0;\`** — This ends \`main\` and hands the number \`0\` back to the operating system. By convention \`0\` means "everything went fine"; any other number signals an error. This satisfies the \`int\` promise made by \`int main()\`.

Run the program below to see \`Hello, World!\` appear, then read the deep-dive in its explanation. Absolute beginners start here — nothing is assumed.`,
    topics: [
      {
        label: 'Get Started with C++ (isocpp.org)',
        url: 'https://isocpp.org/get-started',
        note: 'The standards committee\'s starting point: compilers, tooling, and learning resources.',
      },
      {
        label: 'Installing GCC / g++',
        url: 'https://gcc.gnu.org/install/',
        note: 'Official GNU Compiler Collection install docs; on Linux/macOS g++ is usually one package away.',
      },
      {
        label: 'cppreference: std::cout',
        url: 'https://en.cppreference.com/w/cpp/io/cout',
        note: 'The canonical reference for the standard output stream object.',
      },
      {
        label: 'Compiler Explorer (godbolt.org)',
        url: 'https://godbolt.org/',
        note: 'Compile C++ online and inspect the generated assembly — invaluable for learning.',
      },
    ],
    deliverable:
      'Run `g++ --version` (expecting GCC 11+ or Clang 14+), compile a hello.cpp with `g++ -std=c++20 hello.cpp -o hello`, and print a greeting in the browser sandbox.',
    checks: [
      {
        kind: 'code',
        id: 'cpp-0-code-1',
        prompt: 'Run the starter program to print `Hello, World!` to standard output.',
        boilerplate:
          '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}\n',
        expectedOutput: 'Hello, World!',
        explanation:
          'Let us dissect the printing line `std::cout << "Hello, World!" << std::endl;` token by token, left to right.\n\n' +
          '`std::cout` — `cout` stands for "character output"; it is the program\'s connection to the screen (technically *standard output*). The `std::` in front is a *namespace* prefix: the standard library keeps all its names inside a labelled box called `std` so they do not clash with your own names. `std::cout` means "the `cout` that lives in the standard library box." Why is it here? It is the *destination* — the thing we want text to flow into. Remove it and there is nowhere for the text to go (compile error). At runtime, `cout` is a real object sitting in memory that knows how to forward characters to your terminal.\n\n' +
          '`<<` — read this as a left-pointing arrow that means "send the thing on my right into the thing on my left." Its formal name is the *stream-insertion operator*. (The same `<<` symbol means a bit-shift on plain numbers, but for `cout` it has been given this special "insert" meaning.) Each `<<` hands back `cout` again, which is why you can chain several in a row on one line. Remove it and the compiler cannot connect the text to `cout`.\n\n' +
          '`"Hello, World!"` — the double quotes make this a *string literal*: a fixed piece of text, exactly the characters between the quotes. This is the actual value that exists in memory and gets printed. Change the characters and the program prints something else; the quotes themselves are not printed.\n\n' +
          '`std::endl` — short for "end line". Sending it to `cout` writes a newline character (moving the cursor to the next line) and then *flushes* the buffer (forces any held-back text out to the screen immediately). Remove it and the text still prints, just without a trailing line break.\n\n' +
          '`;` — the semicolon ends the statement, like a period ends a sentence. Then `return 0;` ends `main` and reports success (`0`) to the operating system. Execution always starts at `main` and runs its statements top to bottom.',
      },
      {
        kind: 'mcq',
        id: 'cpp-0-mcq-1',
        prompt: 'Which command compiles `hello.cpp` into an executable named `hello` using the C++20 standard?',
        options: [
          '`g++ -std=c++20 hello.cpp -o hello`',
          '`g++ hello.cpp --run`',
          '`gcc hello.cpp` (the C compiler is identical for C++)',
          '`c++ compile hello.cpp`',
        ],
        correctIndex: 0,
        explanation:
          '`-std=c++20` selects the language standard, `-o hello` names the output binary. Plain `gcc` defaults to C and will fail to link the C++ standard library; use `g++` (or `clang++`), which links `libstdc++`/`libc++` automatically. See [isocpp.org/get-started](https://isocpp.org/get-started).',
      },
      {
        kind: 'mcq',
        id: 'cpp-0-mcq-2',
        prompt: 'What does the `<<` operator do in the line `std::cout << "Hi";`?',
        options: [
          'It performs a left bit-shift on the string.',
          'It is the stream-insertion operator, writing the right operand into the `cout` stream.',
          'It compares `cout` and the string for ordering.',
          'It redirects the program to read from standard input.',
        ],
        correctIndex: 1,
        explanation:
          'For arithmetic types `<<` is bit-shift, but `std::ostream` *overloads* it to mean "insert into the stream". Each `<<` returns the stream again, which is why you can chain `cout << a << b << c`. This operator overloading is a core C++ idea you\'ll meet again in Level 9.',
      },
    ],
  },

  // ─── Level 1 ─────────────────────────────────────────────────────────────
  {
    id: 'cpp-1',
    language: 'cpp',
    level: 1,
    title: 'C++ Basics — Types, auto, References & Streams',
    timeEstimate: '4-6 hours',
    intro: `Before C++'s type system can mean anything, you need four bedrock ideas. **(1) A statement** is one instruction, ended by a semicolon \`;\` — the program runs statements top to bottom. **(2) A variable** is a named box in memory that holds a value you can read and change. You *declare* one by writing its type, then its name, then optionally \`=\` and a starting value: \`int score = 10;\` creates a box called \`score\` holding the number \`10\`. Later \`score = 20;\` puts a new value in the same box. **(3) A type** is the kind of thing a box can hold — C++ makes you state it up front and checks it at compile time (this is called *static typing*). The everyday types are \`int\` (whole numbers like \`-3\`, \`0\`, \`42\`), \`double\` (numbers with a decimal point, like \`3.14\`), \`bool\` (a truth value, only \`true\` or \`false\`), and \`char\` (a single character like \`'A'\`). The type also fixes how much memory the box uses and what operations are allowed. **(4) A function** is a named, reusable block of statements; you saw \`main\` in Level 0. You can write your own, e.g. \`int square(int n) { return n * n; }\` — it takes an \`int\` named \`n\`, multiplies it by itself, and *returns* the result to whoever called \`square(...)\`.

With those in hand, this phase builds real intuition for C++'s type system: why \`int\` division *truncates* (\`7 / 2\` is \`3\`, not \`3.5\`, because two \`int\`s produce an \`int\`), what the keyword \`auto\` deduces (it tells the compiler "figure out the type from the value I assigned"), and the difference between a **copy** and a **reference**. A reference, written \`int& r = score;\`, is a second *name* for an existing box rather than a new box — change \`r\` and you change \`score\`. By the end you'll read short programs and correctly predict their output, and stream values with \`std::cout\` using *manipulators* like \`std::boolalpha\` and \`std::setprecision\` to control formatting.

To build the muscle locally, write a \`temps.cpp\` that stores a few temperatures as \`double\`, computes an average, and prints it with \`std::cout << std::fixed << std::setprecision(1)\`. Compile with \`g++ -std=c++20 -Wall temps.cpp\` and always keep \`-Wall\` on — the warnings are teaching you.`,
    video: {
      title: 'C++ Tutorial for Beginners — Full Course',
      youtubeId: 'vLnPwxZdW4Y',
      channelName: 'freeCodeCamp.org',
      duration: '4 hours',
    },
    topics: [
      { label: 'cppreference: Fundamental types', url: 'https://en.cppreference.com/w/cpp/language/types', note: 'int, double, bool, char and their guaranteed properties.' },
      { label: 'cppreference: auto specifier', url: 'https://en.cppreference.com/w/cpp/language/auto', note: 'Type deduction rules for auto.' },
      { label: 'cppreference: References', url: 'https://en.cppreference.com/w/cpp/language/reference', note: 'Lvalue and rvalue references explained.' },
      { label: 'cppreference: std::string', url: 'https://en.cppreference.com/w/cpp/string/basic_string', note: 'The standard owning string type.' },
      { label: 'C++ Core Guidelines: ES (Expressions and statements)', url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#es-expressions-and-statements', note: 'Modern advice on initialisation and types.' },
      { label: 'cppreference: I/O manipulators', url: 'https://en.cppreference.com/w/cpp/io/manip', note: 'std::fixed, std::setprecision, std::boolalpha.' },
    ],
    deliverable: 'Build locally: a temps.cpp that averages doubles and prints with std::fixed/std::setprecision.',
    checks: [
      {
        kind: 'code',
        id: 'cpp-1-code-1',
        prompt: 'Complete the program so it computes and prints `sum=30` for the two integers, then `avg=15`.',
        boilerplate:
          '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 10;\n    int b = 20;\n    int sum = a + b;\n    cout << "sum=" << sum << endl;\n    cout << "avg=" << sum / 2 << endl;\n    return 0;\n}\n',
        expectedOutput: 'sum=30',
        explanation:
          'With `using namespace std;` you can write `cout` and `endl` unqualified. Each `<<` chains values into the stream; numbers are converted to text automatically. Note `sum / 2` here is *integer* division (30 / 2 == 15 exactly), a topic explored in the next question.',
      },
      {
        kind: 'mcq',
        id: 'cpp-1-mcq-1',
        prompt: `What does this print?

\`\`\`cpp
#include <iostream>
int main() {
    int a = 7, b = 2;
    std::cout << a / b << " " << a % b << "\\n";
}
\`\`\``,
        options: ['`3 1`', '`3.5 1`', '`3 0`', '`4 1`'],
        correctIndex: 0,
        explanation:
          'Both operands are `int`, so `a / b` is integer division: `7 / 2` truncates toward zero to `3`. The modulo `a % b` gives the remainder `1`. To get `3.5` you would need at least one operand to be floating point, e.g. `a / 2.0`. See [cppreference: arithmetic operators](https://en.cppreference.com/w/cpp/language/operator_arithmetic).',
      },
      {
        kind: 'mcq',
        id: 'cpp-1-mcq-2',
        prompt: `What does \`auto\` deduce for \`x\` here, and what prints?

\`\`\`cpp
#include <iostream>
int main() {
    auto x = 5 / 2;
    auto y = 5.0 / 2;
    std::cout << x << " " << y << "\\n";
}
\`\`\``,
        options: [
          '`x` is `double`; prints `2.5 2.5`',
          '`x` is `int` (deduced from `5/2`); prints `2 2.5`',
          '`x` is `int`; prints `2 2`',
          'Compile error: `auto` needs an explicit type',
        ],
        correctIndex: 1,
        explanation:
          '`auto` deduces from the initialiser\'s type. `5 / 2` is an `int` expression (value `2`), so `x` is `int`. `5.0 / 2` promotes `2` to `double`, giving `2.5`, so `y` is `double`. `auto` removes top-level `const`/references unless you write `const auto&`. See [cppreference: auto](https://en.cppreference.com/w/cpp/language/auto).',
      },
      {
        kind: 'mcq',
        id: 'cpp-1-mcq-3',
        prompt: `What does this print?

\`\`\`cpp
#include <iostream>
int main() {
    int n = 10;
    int& r = n;   // r is a reference to n
    r = 99;
    std::cout << n << "\\n";
}
\`\`\``,
        options: ['`10`', '`99`', '`0`', 'A memory address like `0x7ffd...`'],
        correctIndex: 1,
        explanation:
          'A reference is an *alias* — `r` and `n` name the same object. Writing through `r` modifies `n`, so it prints `99`. Unlike a pointer, a reference cannot be null and cannot be rebound after initialisation. This is why function parameters are often `const T&` (pass by reference, no copy). See [cppreference: References](https://en.cppreference.com/w/cpp/language/reference).',
      },
      {
        kind: 'mcq',
        id: 'cpp-1-mcq-4',
        prompt: `What prints?

\`\`\`cpp
#include <iostream>
int main() {
    bool flag = true;
    std::cout << flag << " ";
    std::cout << std::boolalpha << flag << "\\n";
}
\`\`\``,
        options: ['`true true`', '`1 true`', '`true 1`', '`1 1`'],
        correctIndex: 1,
        explanation:
          'By default `std::cout` prints a `bool` as the integer `1` or `0`. The `std::boolalpha` manipulator switches the stream to print `true`/`false` for all subsequent bool insertions. Manipulators are *sticky* — once set, they persist on that stream. See [cppreference: std::boolalpha](https://en.cppreference.com/w/cpp/io/manip/boolalpha).',
      },
    ],
  },

  // ─── Level 2 ─────────────────────────────────────────────────────────────
  {
    id: 'cpp-2',
    language: 'cpp',
    level: 2,
    title: 'Control Flow, Functions & Overloading',
    timeEstimate: '4-6 hours',
    intro: `This phase covers the imperative core: \`if\`/\`else\`, \`switch\`, \`for\`/\`while\` loops, and functions — including C++'s headline feature here, *function overloading* (several functions sharing a name, distinguished by parameter types). You'll learn pass-by-value vs pass-by-reference, default arguments, and how the compiler resolves an overload set.

Locally, write a small \`calc.cpp\` with overloaded \`add(int,int)\` and \`add(double,double)\`, plus a \`fizzbuzz(int n)\` loop. Compile with \`-Wall -Wextra\` and watch how the compiler reports an *ambiguous* call when an overload can't be uniquely chosen.`,
    video: {
      title: 'C++ Functions',
      youtubeId: 'p8sLBdBPLfw',
      channelName: 'The Cherno',
      duration: '13 minutes',
    },
    topics: [
      { label: 'cppreference: Functions', url: 'https://en.cppreference.com/w/cpp/language/functions', note: 'Declarations, definitions, parameters, return.' },
      { label: 'cppreference: Overload resolution', url: 'https://en.cppreference.com/w/cpp/language/overload_resolution', note: 'How the compiler picks among overloads.' },
      { label: 'cppreference: if statement', url: 'https://en.cppreference.com/w/cpp/language/if', note: 'Including if-with-initializer (C++17).' },
      { label: 'cppreference: switch', url: 'https://en.cppreference.com/w/cpp/language/switch', note: 'Fallthrough and [[fallthrough]].' },
      { label: 'cppreference: for loop', url: 'https://en.cppreference.com/w/cpp/language/for', note: 'Classic counting loop.' },
      { label: 'C++ Core Guidelines: F (Functions)', url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#f-functions', note: 'Parameter-passing and return conventions.' },
    ],
    deliverable: 'Build locally: calc.cpp with overloaded add() and a fizzbuzz loop, compiled with -Wall -Wextra.',
    checks: [
      {
        kind: 'code',
        id: 'cpp-2-code-1',
        prompt: 'Implement the counting loop so the program prints `total=55` (the sum of 1..10).',
        boilerplate:
          '#include <iostream>\nusing namespace std;\n\nint main() {\n    int total = 0;\n    for (int i = 1; i <= 10; i = i + 1) {\n        total = total + i;\n    }\n    cout << "total=" << total << endl;\n    return 0;\n}\n',
        expectedOutput: 'total=55',
        explanation:
          'A classic three-part `for` loop: initialise `i = 1`, test `i <= 10`, and increment after each iteration. Accumulating into `total` gives 1+2+...+10 = 55. In modern C++ you\'d often prefer a range-based `for` over a container, but the counting loop is still the right tool for numeric ranges.',
      },
      {
        kind: 'code',
        id: 'cpp-2-code-2',
        prompt: 'Define a function `square(int n)` that returns `n*n`, then call it. The program should print `square=49`.',
        boilerplate:
          '#include <iostream>\nusing namespace std;\n\nint square(int n) {\n    return n * n;\n}\n\nint main() {\n    int result = square(7);\n    cout << "square=" << result << endl;\n    return 0;\n}\n',
        expectedOutput: 'square=49',
        explanation:
          'A free function is declared with its return type, name, and typed parameters. `square(7)` passes `7` by value (a copy), computes `49`, and returns it. Functions are the primary unit of reuse in C++; in the next phase you\'ll bundle data + functions into classes.',
      },
      {
        kind: 'mcq',
        id: 'cpp-2-mcq-1',
        prompt: `Given these overloads, which is called by \`print(42)\`?

\`\`\`cpp
void print(double d);
void print(int i);
void print(const char* s);
\`\`\``,
        options: [
          '`print(double)` — integers promote to double',
          '`print(int)` — it is an exact match for the literal `42`',
          'Ambiguous — the compiler rejects the call',
          '`print(const char*)` — numbers decay to strings',
        ],
        correctIndex: 1,
        explanation:
          'Overload resolution prefers an *exact match* over a promotion or conversion. The literal `42` is an `int`, so `print(int)` is the exact match and wins over `print(double)` (which would require a standard conversion). See [cppreference: overload resolution](https://en.cppreference.com/w/cpp/language/overload_resolution).',
      },
      {
        kind: 'mcq',
        id: 'cpp-2-mcq-2',
        prompt: `What does this print?

\`\`\`cpp
#include <iostream>
void bump(int& x) { x += 100; }
int main() {
    int v = 5;
    bump(v);
    std::cout << v << "\\n";
}
\`\`\``,
        options: ['`5`', '`105`', '`100`', 'Compile error'],
        correctIndex: 1,
        explanation:
          'Because `bump` takes `int&` (a reference), it operates on the caller\'s actual variable, not a copy. `v` becomes `5 + 100 = 105`. Had the parameter been a plain `int` (pass by value), `v` would stay `5`. Passing by reference is how C++ functions modify their arguments. See [Core Guidelines F.17](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Rf-inout).',
      },
      {
        kind: 'mcq',
        id: 'cpp-2-mcq-3',
        prompt: `What does this print?

\`\`\`cpp
#include <iostream>
int main() {
    int x = 2;
    switch (x) {
        case 1: std::cout << "one";
        case 2: std::cout << "two";
        case 3: std::cout << "three";
        default: std::cout << "!";
    }
    std::cout << "\\n";
}
\`\`\``,
        options: ['`two`', '`twothree!`', '`two!`', '`twothreedefault`'],
        correctIndex: 1,
        explanation:
          'C++ `switch` *falls through*: without a `break`, execution continues into the following cases. Matching `case 2` prints `two`, then falls into `case 3` (`three`) and `default` (`!`), yielding `twothree!`. Add `break;` (or `[[fallthrough]];` when intentional) to control this. See [cppreference: switch](https://en.cppreference.com/w/cpp/language/switch).',
      },
    ],
  },

  // ─── Level 3 ─────────────────────────────────────────────────────────────
  {
    id: 'cpp-3',
    language: 'cpp',
    level: 3,
    title: 'Classes, RAII, Constructors & Destructors',
    timeEstimate: '5-7 hours',
    intro: `This is where C++ gets its character. You'll define \`class\`/\`struct\` types that bundle data with behaviour, write *constructors* (including member-initialiser lists) and *destructors*, and meet **RAII** — Resource Acquisition Is Initialization — the idiom where an object acquires a resource in its constructor and releases it in its destructor, guaranteeing cleanup even when exceptions fly. RAII is the single most important pattern in C++.

Locally, write a \`Timer\` class whose constructor records the start time and whose destructor prints the elapsed duration. Create one inside a scope and watch it report automatically when the scope ends — no manual cleanup call required.`,
    video: {
      title: 'Classes in C++',
      youtubeId: '2BP8NhxjrO0',
      channelName: 'The Cherno',
      duration: '8 minutes',
    },
    topics: [
      { label: 'cppreference: Classes', url: 'https://en.cppreference.com/w/cpp/language/classes', note: 'Members, access, this pointer.' },
      { label: 'cppreference: Constructors', url: 'https://en.cppreference.com/w/cpp/language/constructor', note: 'Including member initializer lists.' },
      { label: 'cppreference: Destructors', url: 'https://en.cppreference.com/w/cpp/language/destructor', note: 'Deterministic cleanup at end of scope.' },
      { label: 'cppreference: RAII', url: 'https://en.cppreference.com/w/cpp/language/raii', note: 'The defining C++ resource-management idiom.' },
      { label: 'C++ Core Guidelines: C (Classes)', url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#c-classes-and-class-hierarchies', note: 'Designing well-behaved class types.' },
    ],
    deliverable: 'Build locally: a Timer class using RAII whose destructor prints elapsed time when its scope ends.',
    checks: [
      {
        kind: 'code',
        id: 'cpp-3-code-1',
        prompt:
          'This program models a class with plain values for the sandbox. Compute `area = width * height` and print `area=24`.',
        boilerplate:
          '#include <iostream>\nusing namespace std;\n\nint main() {\n    int width = 6;\n    int height = 4;\n    int area = width * height;\n    cout << "area=" << area << endl;\n    return 0;\n}\n',
        expectedOutput: 'area=24',
        explanation:
          'A real `Rectangle` class would store `width`/`height` as members and expose an `area()` method, but the logic is identical. Encapsulation lets you guarantee invariants (e.g. non-negative dimensions) in the constructor. The MCQs below explore real class behaviour the sandbox can\'t model.',
      },
      {
        kind: 'mcq',
        id: 'cpp-3-mcq-1',
        prompt: `What does this print?

\`\`\`cpp
#include <iostream>
struct Counter {
    int n;
    Counter(int start) : n(start) {
        std::cout << "ctor ";
    }
    ~Counter() { std::cout << "dtor "; }
};
int main() {
    { Counter c(5); std::cout << c.n << " "; }
    std::cout << "done\\n";
}
\`\`\``,
        options: ['`ctor 5 done`', '`ctor 5 dtor done`', '`5 ctor dtor done`', '`ctor dtor 5 done`'],
        correctIndex: 1,
        explanation:
          'The constructor runs when `c` is created (prints `ctor `), then `c.n` (`5 `) prints. When the inner block `{ ... }` ends, `c` goes out of scope and its destructor runs automatically (`dtor `). Only then does `done` print. This deterministic, scope-bound destruction is the foundation of RAII. See [cppreference: RAII](https://en.cppreference.com/w/cpp/language/raii).',
      },
      {
        kind: 'mcq',
        id: 'cpp-3-mcq-2',
        prompt: 'In a member-initializer list `Point(int x, int y) : x_(x), y_(y) {}`, why is it preferred over assigning in the constructor body?',
        options: [
          'It is purely stylistic; the generated code is identical.',
          'It *initializes* members directly, whereas the body would first default-construct then assign — and `const`/reference members can ONLY be initialized this way.',
          'It is required for the constructor to compile at all.',
          'It runs the destructor first to clear old values.',
        ],
        correctIndex: 1,
        explanation:
          'Members are initialized in declaration order *before* the constructor body runs. The initializer list performs direct initialization; assigning in the body would default-construct the member first, then overwrite it (wasteful for non-trivial types). `const` members and references have no default state, so they *must* use the initializer list. See [cppreference: constructor](https://en.cppreference.com/w/cpp/language/constructor).',
      },
      {
        kind: 'mcq',
        id: 'cpp-3-mcq-3',
        prompt: 'What is the difference between `struct` and `class` in C++?',
        options: [
          '`struct` cannot have methods; `class` can.',
          'Only the *default* access level differs: `struct` members are `public` by default, `class` members are `private`. Otherwise they are identical.',
          '`struct` lives on the stack, `class` on the heap.',
          '`class` supports inheritance; `struct` does not.',
        ],
        correctIndex: 1,
        explanation:
          'In C++ (unlike C) `struct` and `class` are the same feature; the *only* language difference is the default access specifier (and default inheritance access). Both can have methods, constructors, inheritance, and templates. Convention: use `struct` for passive data aggregates, `class` for types with invariants. See [cppreference: Classes](https://en.cppreference.com/w/cpp/language/classes).',
      },
      {
        kind: 'mcq',
        id: 'cpp-3-mcq-4',
        prompt: `When does the destructor of \`a\` run?

\`\`\`cpp
#include <iostream>
struct Noisy { ~Noisy() { std::cout << "~"; } };
int main() {
    Noisy a;
    std::cout << "1";
    Noisy b;
    std::cout << "2";
}
\`\`\``,
        options: [
          'At the closing brace of `main`, in reverse order: `b` then `a`.',
          'Immediately after each is declared.',
          'Never — destructors only run for heap objects.',
          'At the start of `main`, before anything prints.',
        ],
        correctIndex: 0,
        explanation:
          'Local objects are destroyed at the end of their enclosing scope, in *reverse* order of construction (LIFO). So output is `12~~`: `b`\'s destructor runs first, then `a`\'s. This reverse-order guarantee lets later objects safely depend on earlier ones. See [cppreference: destructor](https://en.cppreference.com/w/cpp/language/destructor).',
      },
    ],
  },

  // ─── Level 4 ─────────────────────────────────────────────────────────────
  {
    id: 'cpp-4',
    language: 'cpp',
    level: 4,
    title: 'Pointers, References, const & the Memory Model',
    timeEstimate: '5-7 hours',
    intro: `Now you'll get precise about *where data lives*. You'll distinguish stack vs heap, raw pointers (\`T*\`) from references (\`T&\`), and master \`const\` — including the crucial difference between "pointer to const" (\`const T*\`) and "const pointer" (\`T* const\`). You'll also see why dereferencing a dangling or null pointer is undefined behaviour, and why modern C++ pushes you toward references and smart pointers instead of raw ones.

Locally, write a program that takes a pointer to an \`int\`, prints the address with \`&x\`, dereferences it with \`*p\`, and demonstrates that passing \`&x\` to a function lets it mutate the original. Run it under \`-fsanitize=address\` to see the sanitizer catch a deliberate out-of-bounds access.`,
    video: {
      title: 'Pointers in C++',
      youtubeId: 'DTxHyVn0ODg',
      channelName: 'The Cherno',
      duration: '17 minutes',
    },
    topics: [
      { label: 'cppreference: Pointer declaration', url: 'https://en.cppreference.com/w/cpp/language/pointer', note: 'Raw pointers, &, *, nullptr.' },
      { label: 'cppreference: const type qualifier', url: 'https://en.cppreference.com/w/cpp/language/cv', note: 'const and volatile, including const-correctness.' },
      { label: 'cppreference: nullptr', url: 'https://en.cppreference.com/w/cpp/language/nullptr', note: 'The type-safe null pointer literal (prefer over NULL/0).' },
      { label: 'cppreference: Object lifetime & storage duration', url: 'https://en.cppreference.com/w/cpp/language/lifetime', note: 'Automatic (stack) vs dynamic (heap) lifetime.' },
      { label: 'C++ Core Guidelines: Expressions and statements', url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#es-expressions-and-statements', note: 'When to use raw pointers vs references vs smart pointers.' },
    ],
    deliverable: 'Build locally: a program demonstrating &, *, nullptr, and pointer-vs-reference mutation, run under AddressSanitizer.',
    checks: [
      {
        kind: 'code',
        id: 'cpp-4-code-1',
        prompt:
          'Compute the result of pointer-style arithmetic with plain ints: set `base=100`, add `offset=4*3`, and print `addr=112`.',
        boilerplate:
          '#include <iostream>\nusing namespace std;\n\nint main() {\n    int base = 100;\n    int offset = 4 * 3;\n    int addr = base + offset;\n    cout << "addr=" << addr << endl;\n    return 0;\n}\n',
        expectedOutput: 'addr=112',
        explanation:
          'This mimics the arithmetic behind pointer math: indexing `p[3]` on an `int*` advances by `3 * sizeof(int)` bytes. We model it with plain integers because the sandbox cannot run real pointers. The MCQs below test genuine pointer semantics.',
      },
      {
        kind: 'mcq',
        id: 'cpp-4-mcq-1',
        prompt: 'Which statement best contrasts a reference (`int& r = n;`) with a pointer (`int* p = &n;`)?',
        options: [
          'A reference can be reseated to refer to a different object; a pointer cannot.',
          'A reference must bind to an object at initialization, cannot be null, and cannot be rebound; a pointer can be null and reassigned.',
          'They are identical; `int&` is just syntactic sugar for `int*`.',
          'A pointer cannot be const, but a reference can.',
        ],
        correctIndex: 1,
        explanation:
          'A reference is a permanent alias: it must be bound when declared, can never be null, and never refers elsewhere afterward. A pointer is a separate object holding an address — it can be `nullptr`, reassigned, and pointer-arithmetic\'d. Prefer references when "always valid, never rebinds" fits. See [cppreference: References](https://en.cppreference.com/w/cpp/language/reference).',
      },
      {
        kind: 'mcq',
        id: 'cpp-4-mcq-2',
        prompt: 'What is the difference between `const int* p` and `int* const p`?',
        options: [
          'They are the same; `const` placement is ignored.',
          '`const int* p`: the pointee is const (can\'t change `*p`), but `p` can point elsewhere. `int* const p`: `p` is const (can\'t repoint), but `*p` is mutable.',
          'Both make the pointer and the pointee const.',
          '`const int* p` is illegal syntax.',
        ],
        correctIndex: 1,
        explanation:
          'Read declarations right-to-left. `const int* p` = "p is a pointer to const int" → you can\'t modify `*p`, but can repoint `p`. `int* const p` = "p is a const pointer to int" → you can modify `*p`, but `p` is fixed. `const int* const p` locks both. See [cppreference: cv qualifiers](https://en.cppreference.com/w/cpp/language/cv).',
      },
      {
        kind: 'mcq',
        id: 'cpp-4-mcq-3',
        prompt: `What does this print?

\`\`\`cpp
#include <iostream>
void addFive(int* p) { *p += 5; }
int main() {
    int n = 10;
    int* ptr = &n;
    addFive(ptr);
    std::cout << n << " " << *ptr << "\\n";
}
\`\`\``,
        options: ['`10 10`', '`15 15`', '`10 15`', 'A pair of addresses'],
        correctIndex: 1,
        explanation:
          '`ptr` holds the address of `n`. `addFive` receives a copy of that address, but `*p += 5` dereferences it and modifies the *original* `n`. So both `n` and `*ptr` are `15`. Passing a pointer (or reference) is how a callee mutates a caller\'s object. See [cppreference: Pointer declaration](https://en.cppreference.com/w/cpp/language/pointer).',
      },
      {
        kind: 'mcq',
        id: 'cpp-4-mcq-4',
        prompt: 'Why is returning the address of a local variable (`int* f() { int x = 1; return &x; }`) a serious bug?',
        options: [
          'It is fine; the compiler extends `x`\'s lifetime automatically.',
          '`x` lives on the stack and is destroyed when `f` returns; the returned pointer dangles, and dereferencing it is undefined behaviour.',
          'It leaks memory because `x` is never freed.',
          'It only compiles in C, not C++.',
        ],
        correctIndex: 1,
        explanation:
          '`x` has automatic storage duration — its lifetime ends when `f` returns, reclaiming the stack space. The returned pointer refers to memory that is no longer valid (a *dangling pointer*); using it is undefined behaviour. Return by value, or allocate on the heap (preferably via a smart pointer, next phase). See [cppreference: lifetime](https://en.cppreference.com/w/cpp/language/lifetime).',
      },
    ],
  },

  // ─── Level 5 ─────────────────────────────────────────────────────────────
  {
    id: 'cpp-5',
    language: 'cpp',
    level: 5,
    title: 'Dynamic Memory & Smart Pointers',
    timeEstimate: '5-7 hours',
    intro: `Heap allocation with \`new\`/\`delete\` is powerful and dangerous: forget to \`delete\` and you leak; \`delete\` twice and you corrupt the heap. Modern C++ solves this with **smart pointers** — \`std::unique_ptr\` (sole ownership, zero overhead) and \`std::shared_ptr\` (reference-counted shared ownership). They apply RAII to memory: the destructor frees automatically. The rule of thumb is *never write raw \`new\`/\`delete\` in application code* — use \`std::make_unique\` / \`std::make_shared\`.

Locally, build a tiny resource manager: a \`unique_ptr<Connection>\` that logs "open" in its ctor and "close" in its dtor. Move it into a function and watch ownership transfer; try to copy it and watch the compiler stop you.`,
    video: {
      title: 'Smart Pointers in C++',
      youtubeId: 'UOB7-B2MfwA',
      channelName: 'The Cherno',
      duration: '16 minutes',
    },
    topics: [
      { label: 'cppreference: std::unique_ptr', url: 'https://en.cppreference.com/w/cpp/memory/unique_ptr', note: 'Sole-ownership smart pointer.' },
      { label: 'cppreference: std::shared_ptr', url: 'https://en.cppreference.com/w/cpp/memory/shared_ptr', note: 'Reference-counted shared ownership.' },
      { label: 'cppreference: std::make_unique', url: 'https://en.cppreference.com/w/cpp/memory/unique_ptr/make_unique', note: 'Exception-safe factory; prefer over raw new.' },
      { label: 'cppreference: new expression', url: 'https://en.cppreference.com/w/cpp/language/new', note: 'Raw heap allocation (use sparingly).' },
      { label: 'C++ Core Guidelines: R (Resource management)', url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#r-resource-management', note: 'Ownership rules and smart-pointer guidance.' },
    ],
    deliverable: 'Build locally: a resource manager using unique_ptr with logging ctor/dtor; demonstrate move-only ownership.',
    checks: [
      {
        kind: 'code',
        id: 'cpp-5-code-1',
        prompt:
          'Simulate a reference count: start at 0, increment twice (two shared owners), then decrement once. Print `count=1`.',
        boilerplate:
          '#include <iostream>\nusing namespace std;\n\nint main() {\n    int count = 0;\n    count = count + 1;   // shared_ptr copy 1\n    count = count + 1;   // shared_ptr copy 2\n    count = count - 1;   // one owner destroyed\n    cout << "count=" << count << endl;\n    return 0;\n}\n',
        expectedOutput: 'count=1',
        explanation:
          'This models how `std::shared_ptr` tracks ownership: each copy bumps an atomic reference count; each destruction decrements it; the managed object is freed when the count hits 0. Here two owners then one destruction leaves `count=1`, so the object is still alive. The MCQs test real smart-pointer semantics.',
      },
      {
        kind: 'mcq',
        id: 'cpp-5-mcq-1',
        prompt: 'Why does `std::unique_ptr` not support copying (`auto b = a;` fails to compile)?',
        options: [
          'Copying is too slow, so the standard forbids it for performance.',
          'It enforces *sole ownership*: two unique_ptrs to the same object would both try to delete it (double free). Its copy constructor is deleted; use `std::move` to transfer ownership instead.',
          'unique_ptr can be copied; only shared_ptr cannot.',
          'It is an oversight in the standard library.',
        ],
        correctIndex: 1,
        explanation:
          '`unique_ptr` models exclusive ownership, so copying is `= delete`d — otherwise two owners would each delete the pointee, a double free. Ownership *transfers* via `std::move`, after which the source is null. `shared_ptr` instead permits copies and shares one ref-counted block. See [cppreference: unique_ptr](https://en.cppreference.com/w/cpp/memory/unique_ptr).',
      },
      {
        kind: 'mcq',
        id: 'cpp-5-mcq-2',
        prompt: 'What is the recommended way to create a `unique_ptr<Widget>`, and why?',
        options: [
          '`std::unique_ptr<Widget> p(new Widget());` — the only correct form.',
          '`auto p = std::make_unique<Widget>();` — it avoids a naked `new`, is exception-safe, and writes the type once.',
          '`Widget* p = malloc(sizeof(Widget));` then wrap it.',
          '`auto p = std::shared_unique<Widget>();`',
        ],
        correctIndex: 1,
        explanation:
          '`std::make_unique<Widget>(args...)` (C++14) forwards constructor arguments, performs a single allocation, and avoids the subtle exception-safety hole that arises when `new` appears as a function argument. Reserve raw `new` for the rare cases `make_unique` can\'t express. See [cppreference: make_unique](https://en.cppreference.com/w/cpp/memory/unique_ptr/make_unique).',
      },
      {
        kind: 'mcq',
        id: 'cpp-5-mcq-3',
        prompt: `What does \`use_count()\` print?

\`\`\`cpp
#include <iostream>
#include <memory>
int main() {
    auto a = std::make_shared<int>(7);
    {
        auto b = a;                 // share ownership
        std::cout << a.use_count(); // (1)
    }
    std::cout << a.use_count();     // (2)
}
\`\`\``,
        options: ['Prints `12`', 'Prints `22`', 'Prints `21`', 'Prints `11`'],
        correctIndex: 2,
        explanation:
          'Inside the block, both `a` and `b` own the `int`, so the count is `2` at (1). When the block ends, `b` is destroyed and decrements the count, leaving `1` at (2). Output: `21`. `shared_ptr`\'s control block holds this atomic count. See [cppreference: shared_ptr::use_count](https://en.cppreference.com/w/cpp/memory/shared_ptr/use_count).',
      },
      {
        kind: 'mcq',
        id: 'cpp-5-mcq-4',
        prompt: 'Two `shared_ptr`s point at each other through member fields (a cycle). What happens, and how is it fixed?',
        options: [
          'Nothing special; the garbage collector reclaims them.',
          'The reference counts never reach 0, so the objects leak; break the cycle by making one direction a `std::weak_ptr`.',
          'The program crashes immediately with a double free.',
          'shared_ptr forbids cycles at compile time.',
        ],
        correctIndex: 1,
        explanation:
          'Reference counting cannot reclaim cycles: each object keeps the other\'s count above 0, so neither destructor runs — a leak. The standard fix is `std::weak_ptr` for the back-reference: it observes without owning (doesn\'t bump the strong count), and you `lock()` it to get a temporary `shared_ptr`. See [cppreference: weak_ptr](https://en.cppreference.com/w/cpp/memory/weak_ptr).',
      },
    ],
  },

  // ─── Level 6 ─────────────────────────────────────────────────────────────
  {
    id: 'cpp-6',
    language: 'cpp',
    level: 6,
    title: 'Templates & Generic Programming',
    timeEstimate: '5-7 hours',
    intro: `Templates are how C++ achieves *zero-overhead generics*: you write code once parameterised over a type, and the compiler stamps out a specialised version for each type used — resolved entirely at compile time. You'll write function templates (\`template<typename T> T max(T,T)\`), class templates, and meet *template argument deduction*, non-type template parameters, and the famously verbose error messages that motivated C++20 *concepts* (Level 10).

Locally, write a \`template<typename T> T clamp(T v, T lo, T hi)\` and instantiate it for \`int\` and \`double\`. Inspect the assembly on godbolt.org to confirm each instantiation is a distinct, fully optimised function — no runtime dispatch.`,
    video: {
      title: 'Templates in C++',
      youtubeId: 'I-hZkUa9mIs',
      channelName: 'The Cherno',
      duration: '14 minutes',
    },
    topics: [
      { label: 'cppreference: Templates', url: 'https://en.cppreference.com/w/cpp/language/templates', note: 'Overview of the template system.' },
      { label: 'cppreference: Function templates', url: 'https://en.cppreference.com/w/cpp/language/function_template', note: 'Including argument deduction.' },
      { label: 'cppreference: Class templates', url: 'https://en.cppreference.com/w/cpp/language/class_template', note: 'Parameterised types like vector<T>.' },
      { label: 'cppreference: Template argument deduction', url: 'https://en.cppreference.com/w/cpp/language/template_argument_deduction', note: 'How the compiler infers T.' },
      { label: 'isocpp FAQ: Templates', url: 'https://isocpp.org/wiki/faq/templates', note: 'Common questions and pitfalls.' },
    ],
    deliverable: 'Build locally: a generic clamp<T> function instantiated for int and double; verify distinct instantiations on godbolt.org.',
    checks: [
      {
        kind: 'code',
        id: 'cpp-6-code-1',
        prompt:
          'Model what a `max<int>` instantiation computes: given `a=8` and `b=15`, print `max=15`.',
        boilerplate:
          '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 8;\n    int b = 15;\n    int result = (a > b) ? a : b;\n    cout << "max=" << result << endl;\n    return 0;\n}\n',
        expectedOutput: 'max=15',
        explanation:
          'A `template<typename T> T maxv(T a, T b) { return a > b ? a : b; }` would generate exactly this code for `T = int`. The ternary `?:` picks the larger value. Templates resolve at compile time, so there is no runtime cost versus this hand-written `int` version. The MCQs explore template mechanics.',
      },
      {
        kind: 'mcq',
        id: 'cpp-6-mcq-1',
        prompt: `For \`template<typename T> T addv(T a, T b) { return a + b; }\`, what happens with \`addv(1, 2.0)\`?`,
        options: [
          'It deduces `T = double` and converts `1` to `1.0`.',
          'It is a deduction *conflict*: the first arg implies `T = int`, the second `T = double`. It fails to compile unless you write `addv<double>(1, 2.0)`.',
          'It deduces `T = int` and truncates `2.0` to `2`.',
          'It silently picks `T = int` from the first argument.',
        ],
        correctIndex: 1,
        explanation:
          'Template argument deduction must find *one* `T` consistent with all arguments. `1` (int) and `2.0` (double) give contradictory deductions, so the call is ill-formed. Fixes: specify `addv<double>(...)`, cast an argument, or use two type parameters `template<class A, class B>`. See [cppreference: template argument deduction](https://en.cppreference.com/w/cpp/language/template_argument_deduction).',
      },
      {
        kind: 'mcq',
        id: 'cpp-6-mcq-2',
        prompt: 'When is a function template actually compiled into machine code?',
        options: [
          'Once, when the template is defined.',
          'Only when *instantiated* — i.e. when called/used with concrete types. Each distinct type set produces a separate instantiation.',
          'At runtime, via reflection.',
          'Never; templates are interpreted.',
        ],
        correctIndex: 1,
        explanation:
          'A template is a *recipe*. The compiler instantiates it lazily, generating code only for the type combinations actually used (e.g. `vec<int>` and `vec<string>` are two distinct instantiations). This is why template definitions usually live in headers — the definition must be visible at each instantiation point. See [cppreference: Templates](https://en.cppreference.com/w/cpp/language/templates).',
      },
      {
        kind: 'mcq',
        id: 'cpp-6-mcq-3',
        prompt: 'What is a *non-type template parameter*, as in `template<typename T, std::size_t N> struct Array { T data[N]; };`?',
        options: [
          'A parameter that must itself be a template.',
          'A compile-time *value* (here the size `N`) baked into the type, so `Array<int,3>` and `Array<int,4>` are different types.',
          'A parameter that is deduced at runtime.',
          'Invalid syntax; template parameters must be types.',
        ],
        correctIndex: 1,
        explanation:
          'Templates can be parameterised by values (integers, pointers, enums, and in C++20 some literal class types), not just types. `std::array<T, N>` uses exactly this so the size is part of the type and the storage is stack-allocated with no separate length field. See [cppreference: template parameters](https://en.cppreference.com/w/cpp/language/template_parameters).',
      },
      {
        kind: 'mcq',
        id: 'cpp-6-mcq-4',
        prompt: 'How does a C++ template differ from a Java generic or a C# generic?',
        options: [
          'They are identical mechanisms.',
          'C++ templates are *instantiated* at compile time (monomorphization) producing specialised code with no runtime dispatch or boxing; Java generics use type erasure with a single shared implementation.',
          'C++ templates use type erasure; Java generics are monomorphized.',
          'C++ templates only work with built-in types.',
        ],
        correctIndex: 1,
        explanation:
          'C++ (like Rust) *monomorphizes*: each instantiation is separate optimised code, enabling inlining and zero overhead at the cost of code bloat and compile time. Java erases generic types to a common form (`Object`) with casts/boxing, so there is one implementation but runtime overhead. See [isocpp FAQ: templates](https://isocpp.org/wiki/faq/templates).',
      },
    ],
  },

  // ─── Level 7 ─────────────────────────────────────────────────────────────
  {
    id: 'cpp-7',
    language: 'cpp',
    level: 7,
    title: 'The STL — Containers, Iterators & Algorithms',
    timeEstimate: '6-8 hours',
    intro: `The Standard Template Library is C++'s crown jewel: a coherent toolkit of *containers* (\`vector\`, \`map\`, \`unordered_map\`, \`set\`), *iterators* that generalise pointers, and *algorithms* (\`sort\`, \`find\`, \`accumulate\`, \`transform\`) that operate on any iterator range. Learning to express logic as "container + algorithm + iterator" instead of hand-rolled loops is the leap from writing C-with-classes to writing idiomatic modern C++.

Locally, load words into a \`std::vector<std::string>\`, \`std::sort\` them, count frequencies in a \`std::unordered_map<std::string,int>\`, and print the top entries. Reach for \`<algorithm>\` before writing a raw loop.`,
    video: {
      title: 'C++ STL Tutorial',
      youtubeId: 'RRVYpIET_RU',
      channelName: 'The Cherno',
      duration: '15 minutes',
    },
    topics: [
      { label: 'cppreference: Containers library', url: 'https://en.cppreference.com/w/cpp/container', note: 'vector, map, set, unordered_map, deque...' },
      { label: 'cppreference: std::vector', url: 'https://en.cppreference.com/w/cpp/container/vector', note: 'The default sequence container.' },
      { label: 'cppreference: Algorithms library', url: 'https://en.cppreference.com/w/cpp/algorithm', note: 'sort, find, accumulate, transform, count_if...' },
      { label: 'cppreference: Iterator library', url: 'https://en.cppreference.com/w/cpp/iterator', note: 'begin/end, iterator categories.' },
      { label: 'cppreference: std::map', url: 'https://en.cppreference.com/w/cpp/container/map', note: 'Ordered associative container (red-black tree).' },
    ],
    deliverable: 'Build locally: a word-frequency counter using vector, unordered_map, std::sort, and an <algorithm> call.',
    checks: [
      {
        kind: 'code',
        id: 'cpp-7-code-1',
        prompt:
          'Model `std::accumulate` over the values 3, 5, and 7: sum them and print `sum=15`.',
        boilerplate:
          '#include <iostream>\nusing namespace std;\n\nint main() {\n    int sum = 0;\n    sum = sum + 3;\n    sum = sum + 5;\n    sum = sum + 7;\n    cout << "sum=" << sum << endl;\n    return 0;\n}\n',
        expectedOutput: 'sum=15',
        explanation:
          '`std::accumulate(v.begin(), v.end(), 0)` folds a range into a single value by repeatedly applying `+` (or a custom binary op) starting from an initial value — exactly the running total shown here. Expressing reductions with algorithms makes intent explicit and works over any container. The MCQs cover real STL behaviour.',
      },
      {
        kind: 'mcq',
        id: 'cpp-7-mcq-1',
        prompt: 'What invalidates iterators/pointers into a `std::vector` when you `push_back`?',
        options: [
          'Nothing; vector iterators are always stable.',
          'A reallocation: if size would exceed capacity, the vector moves its elements to a new buffer, invalidating all existing iterators, pointers, and references.',
          'Only the end() iterator is affected.',
          'push_back never reallocates; only insert() does.',
        ],
        correctIndex: 1,
        explanation:
          '`std::vector` stores elements contiguously. When `size() == capacity()`, `push_back` allocates a larger buffer and relocates elements, so every existing iterator/pointer/reference dangles. `reserve()` ahead of time avoids repeated reallocations. (`list`/`deque` have different rules.) See [cppreference: vector](https://en.cppreference.com/w/cpp/container/vector).',
      },
      {
        kind: 'mcq',
        id: 'cpp-7-mcq-2',
        prompt: `What does this print?

\`\`\`cpp
#include <iostream>
#include <map>
#include <string>
int main() {
    std::map<std::string,int> m;
    std::cout << m["missing"] << " " << m.size() << "\\n";
}
\`\`\``,
        options: ['`0 0`', '`0 1`', 'throws std::out_of_range', '`-1 0`'],
        correctIndex: 1,
        explanation:
          '`operator[]` on a `std::map` *inserts* a default-constructed value (here `int{} == 0`) for a missing key and returns a reference to it. So it prints `0`, and the map now has size `1`. To look up without inserting, use `m.find(key)` or `m.at(key)` (which throws if absent). See [cppreference: map::operator[]](https://en.cppreference.com/w/cpp/container/map/operator_at).',
      },
      {
        kind: 'mcq',
        id: 'cpp-7-mcq-3',
        prompt: 'You need average O(1) key lookup and do NOT care about key ordering. Which container fits best?',
        options: [
          '`std::map` — it is the fastest map.',
          '`std::unordered_map` — a hash table with average O(1) lookup/insert.',
          '`std::vector` with linear search.',
          '`std::set` — sets are faster than maps.',
        ],
        correctIndex: 1,
        explanation:
          '`std::map` is a balanced binary tree with O(log n) operations and *sorted* iteration. `std::unordered_map` is a hash table with average O(1) lookup but no ordering guarantee. Choose `unordered_map` when you don\'t need order and want speed; choose `map` when you need sorted traversal or `lower_bound`. See [cppreference: unordered_map](https://en.cppreference.com/w/cpp/container/unordered_map).',
      },
      {
        kind: 'mcq',
        id: 'cpp-7-mcq-4',
        prompt: 'What does the "erase-remove idiom" `v.erase(std::remove(v.begin(), v.end(), 0), v.end());` accomplish?',
        options: [
          'It removes the first `0` from the vector.',
          'It removes *all* elements equal to `0`. `std::remove` shifts kept elements forward and returns a new logical end; `erase` then trims the leftover tail.',
          'It sorts the vector and removes duplicates.',
          'It erases the entire vector.',
        ],
        correctIndex: 1,
        explanation:
          '`std::remove` doesn\'t shrink the container (algorithms can\'t resize what they don\'t own); it compacts the elements you keep to the front and returns an iterator to the new end. The container\'s `erase(first, last)` then physically removes the trailing junk. C++20 adds `std::erase(v, 0)` as a one-liner. See [cppreference: std::remove](https://en.cppreference.com/w/cpp/algorithm/remove).',
      },
    ],
  },

  // ─── Level 8 ─────────────────────────────────────────────────────────────
  {
    id: 'cpp-8',
    language: 'cpp',
    level: 8,
    title: 'Move Semantics, Rvalue References & Perfect Forwarding',
    timeEstimate: '6-8 hours',
    intro: `Move semantics (C++11) let you *transfer* the guts of an object instead of deep-copying — the difference between handing over a suitcase and cloning it. You'll learn rvalue references (\`T&&\`), the move constructor and move assignment, \`std::move\` (a cast, not a move!), the **Rule of Five / Rule of Zero**, and *perfect forwarding* with forwarding references and \`std::forward\`. This is what makes returning a \`std::vector\` by value cheap.

Locally, instrument a class with copy and move constructors that print which one ran. Put instances in a \`vector\`, call \`reserve\`, then \`push_back(std::move(x))\` vs \`push_back(x)\` and watch the log show moves vs copies.`,
    video: {
      title: 'lvalues and rvalues in C++',
      youtubeId: 'fbYknr-HPYE',
      channelName: 'The Cherno',
      duration: '13 minutes',
    },
    topics: [
      { label: 'cppreference: Move constructors', url: 'https://en.cppreference.com/w/cpp/language/move_constructor', note: 'How resources are stolen from an rvalue.' },
      { label: 'cppreference: std::move', url: 'https://en.cppreference.com/w/cpp/utility/move', note: 'An unconditional cast to rvalue reference.' },
      { label: 'cppreference: Value categories', url: 'https://en.cppreference.com/w/cpp/language/value_category', note: 'lvalue, prvalue, xvalue explained.' },
      { label: 'cppreference: std::forward', url: 'https://en.cppreference.com/w/cpp/utility/forward', note: 'Perfect forwarding of arguments.' },
      { label: 'C++ Core Guidelines: C (Classes and class hierarchies)', url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#c-classes-and-class-hierarchies', note: 'Special member functions: Rule of Five / Rule of Zero.' },
    ],
    deliverable: 'Build locally: a class logging copy vs move; demonstrate std::move and reserve()+push_back avoiding copies.',
    checks: [
      {
        kind: 'code',
        id: 'cpp-8-code-1',
        prompt:
          'Model a move: set `src=42`, "move" it into `dst`, then null out the source. Print `dst=42` and `src=0`.',
        boilerplate:
          '#include <iostream>\nusing namespace std;\n\nint main() {\n    int src = 42;\n    int dst = src;   // transfer the value\n    src = 0;         // moved-from source left in a valid, empty state\n    cout << "dst=" << dst << endl;\n    cout << "src=" << src << endl;\n    return 0;\n}\n',
        expectedOutput: 'dst=42',
        explanation:
          'A move constructor transfers ownership of a resource (e.g. a heap buffer pointer) from source to destination, then leaves the source in a valid but unspecified — usually empty — state, exactly as `src` becomes `0` here. For a plain `int` there\'s nothing to steal, so a "move" is just a copy; moves matter for resource-owning types. The MCQs cover the real rules.',
      },
      {
        kind: 'mcq',
        id: 'cpp-8-mcq-1',
        prompt: 'What does `std::move(x)` actually do?',
        options: [
          'It moves `x`\'s data immediately.',
          'Nothing at runtime by itself — it is an unconditional *cast* of `x` to an rvalue reference (`T&&`), enabling a move constructor/assignment to be selected if one exists.',
          'It deletes `x`.',
          'It deep-copies `x` to a new location.',
        ],
        correctIndex: 1,
        explanation:
          '`std::move` is purely a compile-time cast — it produces an xvalue so overload resolution can pick the `T&&` (move) overload. The actual transfer happens inside that move constructor/assignment. If no move overload exists, you silently get a copy. Misnamed but fundamental. See [cppreference: std::move](https://en.cppreference.com/w/cpp/utility/move).',
      },
      {
        kind: 'mcq',
        id: 'cpp-8-mcq-2',
        prompt: 'What is the *Rule of Five*?',
        options: [
          'A class may have at most five member functions.',
          'If you declare any of the destructor, copy constructor, copy assignment, move constructor, or move assignment, you should consider declaring all five — they manage resource ownership together.',
          'Always pass at most five arguments to a constructor.',
          'A class must define exactly five constructors.',
        ],
        correctIndex: 1,
        explanation:
          'The five *special member functions* govern copying, moving, and destruction. Declaring one (e.g. a custom destructor managing a resource) suppresses or complicates the implicit generation of the others, so define/`=default`/`=delete` them coherently. Better still: follow the *Rule of Zero* — own resources via RAII types (smart pointers, containers) so you need none. See [Core Guidelines C.ctor](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#c-classes-and-class-hierarchies).',
      },
      {
        kind: 'mcq',
        id: 'cpp-8-mcq-3',
        prompt: `Why does line (A) NOT call the rvalue overload?

\`\`\`cpp
void sink(Widget&& w);
void f(Widget&& x) {
    sink(x);            // (A)
    sink(std::move(x)); // (B)
}
\`\`\``,
        options: [
          'Both (A) and (B) call the rvalue overload.',
          '`x` is a *named* variable, hence an lvalue, so (A) fails to bind to `Widget&&`; you must write (B) `std::move(x)` to forward it as an rvalue.',
          '(A) compiles and (B) does not.',
          '`x` is always an rvalue because its type is `Widget&&`.',
        ],
        correctIndex: 1,
        explanation:
          'A key subtlety: anything with a *name* is an lvalue, even if its declared type is an rvalue reference. So in (A), `x` is an lvalue and won\'t bind to `Widget&&` (compile error, or it picks a copy). You must `std::move(x)` (B) to re-cast it to an rvalue. This is why generic code uses `std::forward`. See [cppreference: value categories](https://en.cppreference.com/w/cpp/language/value_category).',
      },
      {
        kind: 'mcq',
        id: 'cpp-8-mcq-4',
        prompt: 'In `template<class T> void wrapper(T&& arg) { inner(std::forward<T>(arg)); }`, what is `T&&` called and what does `std::forward` do?',
        options: [
          '`T&&` is always an rvalue reference; `std::forward` always moves.',
          '`T&&` is a *forwarding (universal) reference* in a deduced context; `std::forward<T>` preserves the original value category — moving rvalues, copying lvalues.',
          '`T&&` is a syntax error inside a template.',
          '`std::forward` is identical to `std::move`.',
        ],
        correctIndex: 1,
        explanation:
          'When `T` is deduced, `T&&` is a *forwarding reference*: reference-collapsing makes it bind to lvalues (as `T&`) or rvalues (as `T&&`). `std::forward<T>(arg)` casts back to the original category so `inner` sees an lvalue as an lvalue and an rvalue as an rvalue — "perfect" forwarding. Use `std::forward` only with forwarding references. See [cppreference: std::forward](https://en.cppreference.com/w/cpp/utility/forward).',
      },
    ],
  },

  // ─── Level 9 ─────────────────────────────────────────────────────────────
  {
    id: 'cpp-9',
    language: 'cpp',
    level: 9,
    title: 'Operator Overloading, Lambdas & std::function',
    timeEstimate: '5-7 hours',
    intro: `C++ lets your types behave like built-ins through *operator overloading* (\`operator+\`, \`operator==\`, \`operator<<\` for streaming, and C++20's \`operator<=>\` spaceship). Pair that with **lambdas** — anonymous function objects with capture lists — and \`std::function\` (a type-erased callable wrapper), and you have the expressive toolkit behind STL algorithms, callbacks, and functional-style C++.

Locally, write a \`Money\` type with \`operator+\`, \`operator==\`, and a streaming \`operator<<\`. Then sort a \`vector<Money>\` with a lambda comparator, and store a callback in a \`std::function<void(int)>\`. Experiment with capture-by-value \`[=]\` vs capture-by-reference \`[&]\`.`,
    video: {
      title: 'Lambdas in C++',
      youtubeId: 'mWgmBBz0y8c',
      channelName: 'The Cherno',
      duration: '11 minutes',
    },
    topics: [
      { label: 'cppreference: Operator overloading', url: 'https://en.cppreference.com/w/cpp/language/operators', note: 'Rules and canonical forms for overloaded operators.' },
      { label: 'cppreference: Lambda expressions', url: 'https://en.cppreference.com/w/cpp/language/lambda', note: 'Captures, parameters, mutable, generic lambdas.' },
      { label: 'cppreference: std::function', url: 'https://en.cppreference.com/w/cpp/utility/functional/function', note: 'Type-erased callable wrapper.' },
      { label: 'cppreference: operator<=> (three-way comparison)', url: 'https://en.cppreference.com/w/cpp/language/operator_comparison', note: 'C++20 spaceship operator.' },
      { label: 'C++ Core Guidelines: F (Functions and lambdas)', url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#f-functions', note: 'When to use lambdas and how to capture.' },
    ],
    deliverable: 'Build locally: a Money type with overloaded +, ==, and <<; sort a vector<Money> with a lambda; store a callback in std::function.',
    checks: [
      {
        kind: 'code',
        id: 'cpp-9-code-1',
        prompt:
          'Model an overloaded `operator+` on a Money amount in cents: 175 + 250, then print `total=425`.',
        boilerplate:
          '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 175;   // $1.75 in cents\n    int b = 250;   // $2.50 in cents\n    int total = a + b;   // Money::operator+\n    cout << "total=" << total << endl;\n    return 0;\n}\n',
        expectedOutput: 'total=425',
        explanation:
          'An overloaded `Money operator+(const Money&, const Money&)` would internally add the cent counts just like this. Operator overloading lets `a + b` read naturally for user-defined types while keeping the arithmetic exact (storing cents as `int` avoids floating-point money bugs). The MCQs cover lambdas and operator rules.',
      },
      {
        kind: 'mcq',
        id: 'cpp-9-mcq-1',
        prompt: `What does this print?

\`\`\`cpp
#include <iostream>
int main() {
    int factor = 10;
    auto times = [factor](int x) { return x * factor; };
    factor = 99;
    std::cout << times(5) << "\\n";
}
\`\`\``,
        options: ['`495`', '`50`', '`5`', 'Compile error: cannot capture `factor`'],
        correctIndex: 1,
        explanation:
          'The lambda captures `factor` *by value* (`[factor]`), copying its value (`10`) at the point of definition. The later `factor = 99` does not affect the stored copy, so `times(5)` is `5 * 10 = 50`. Capture by reference (`[&factor]`) would instead read the current `99`, giving `495`. See [cppreference: lambda](https://en.cppreference.com/w/cpp/language/lambda).',
      },
      {
        kind: 'mcq',
        id: 'cpp-9-mcq-2',
        prompt: 'When overloading `operator<<` to stream your type, what is the canonical signature?',
        options: [
          '`std::ostream operator<<(std::ostream os, const T& v)` — by value.',
          '`std::ostream& operator<<(std::ostream& os, const T& v)` — take and return the stream by reference (usually a non-member/friend) so calls chain.',
          '`void T::operator<<(std::ostream& os)` — a member returning void.',
          '`T operator<<(const T& v)` — returns the value.',
        ],
        correctIndex: 1,
        explanation:
          'Stream insertion is a *non-member* (often `friend`) function taking `std::ostream&` and returning it by reference, so that `os << a << b` chains (each call returns the same stream). It can\'t be a member of `T` because the left operand is the stream, not your object. See [cppreference: operator overloading](https://en.cppreference.com/w/cpp/language/operators).',
      },
      {
        kind: 'mcq',
        id: 'cpp-9-mcq-3',
        prompt: 'What is the advantage of a bare lambda over wrapping it in `std::function<int(int)>`?',
        options: [
          'There is none; they are identical.',
          'A lambda has a unique unnamed type and can be inlined with zero overhead; `std::function` is a type-erased wrapper that may heap-allocate and adds an indirect call — convenient for storage, but slower.',
          '`std::function` is always faster because it is part of the standard library.',
          'Lambdas cannot capture variables, but `std::function` can.',
        ],
        correctIndex: 1,
        explanation:
          'Each lambda is its own closure type, so passing it to a template (`std::sort`\'s comparator) lets the compiler inline the call. `std::function` erases that type behind a uniform interface — great for storing heterogeneous callables (e.g. in a `vector<std::function<...>>`) but it may allocate and prevents inlining. Use `auto`/templates for hot paths, `std::function` when you need a concrete storable type. See [cppreference: std::function](https://en.cppreference.com/w/cpp/utility/functional/function).',
      },
      {
        kind: 'mcq',
        id: 'cpp-9-mcq-4',
        prompt: 'What does C++20\'s `auto operator<=>(const T&) const = default;` generate?',
        options: [
          'Only `operator<`.',
          'All four relational operators (`<`, `<=`, `>`, `>=`), plus `==`/`!=` when `==` is also defaulted, derived from member-wise comparison.',
          'A bit-shift operator.',
          'Nothing; `<=>` must always be written by hand.',
        ],
        correctIndex: 1,
        explanation:
          'The defaulted three-way comparison ("spaceship") operator compares members lexicographically and lets the compiler synthesise `<`, `<=`, `>`, `>=` from it; a defaulted `operator==` similarly yields `==`/`!=`. This replaces the old boilerplate of writing all comparison operators by hand. See [cppreference: operator<=>](https://en.cppreference.com/w/cpp/language/operator_comparison).',
      },
    ],
  },

  // ─── Level 10 ────────────────────────────────────────────────────────────
  {
    id: 'cpp-10',
    language: 'cpp',
    level: 10,
    title: 'Concurrency, Performance & Modern C++20 (Concepts, Ranges)',
    timeEstimate: '6-8 hours',
    intro: `The capstone. You'll launch work on \`std::thread\`, protect shared state with \`std::mutex\`/\`std::lock_guard\`, use \`std::atomic\` for lock-free counters, and reason about *data races* and the memory model. Then you'll meet the headline C++20 features that reshape day-to-day code: **concepts** (named compile-time constraints that make template errors readable) and **ranges** (composable, lazy views like \`v | std::views::filter(...) | std::views::transform(...)\`). A few notes on performance — cache locality, avoiding needless allocation, measuring before optimising — round out the course.

Locally, write a program that sums a large \`vector<int>\` across N threads (each handling a slice, results combined under a mutex), compare it against a single-threaded \`std::accumulate\`, and time both. Then rewrite a loop as a ranges pipeline and confirm identical output.`,
    video: {
      title: 'Threads in C++',
      youtubeId: 'wXBcwHwIt_I',
      channelName: 'The Cherno',
      duration: '8 minutes',
    },
    topics: [
      { label: 'cppreference: std::thread', url: 'https://en.cppreference.com/w/cpp/thread/thread', note: 'Launching and joining threads.' },
      { label: 'cppreference: std::mutex', url: 'https://en.cppreference.com/w/cpp/thread/mutex', note: 'Mutual exclusion for shared state.' },
      { label: 'cppreference: std::lock_guard', url: 'https://en.cppreference.com/w/cpp/thread/lock_guard', note: 'RAII lock ownership.' },
      { label: 'cppreference: std::atomic', url: 'https://en.cppreference.com/w/cpp/atomic/atomic', note: 'Lock-free atomic operations and memory order.' },
      { label: 'cppreference: Constraints and concepts', url: 'https://en.cppreference.com/w/cpp/language/constraints', note: 'C++20 concepts for constrained templates.' },
      { label: 'cppreference: Ranges library', url: 'https://en.cppreference.com/w/cpp/ranges', note: 'C++20 views and range adaptors.' },
    ],
    deliverable: 'Build locally: a multi-threaded vector sum using mutex/atomic vs single-threaded accumulate (timed), plus a ranges pipeline rewrite.',
    checks: [
      {
        kind: 'code',
        id: 'cpp-10-code-1',
        prompt:
          'Model two threads each adding their partial sum to a shared total under a mutex: partials 60 and 40. Print `total=100`.',
        boilerplate:
          '#include <iostream>\nusing namespace std;\n\nint main() {\n    int total = 0;\n    int partialA = 60;   // thread A slice\n    int partialB = 40;   // thread B slice\n    total = total + partialA;   // under lock_guard\n    total = total + partialB;   // under lock_guard\n    cout << "total=" << total << endl;\n    return 0;\n}\n',
        expectedOutput: 'total=100',
        explanation:
          'Each thread computes a partial sum over its slice, then adds it to the shared `total` while holding a `std::lock_guard<std::mutex>` so the read-modify-write is not interleaved (which would be a data race). Reducing per-thread and combining once at the end minimises contention. The MCQs cover concurrency and C++20 features.',
      },
      {
        kind: 'mcq',
        id: 'cpp-10-mcq-1',
        prompt: 'Two threads run `++counter;` on a shared `int counter` with no synchronization. What is the result?',
        options: [
          'It is always correct; `++` is atomic in C++.',
          'A *data race* and therefore undefined behaviour — `++` is read-modify-write and can interleave, losing updates; fix with `std::atomic<int>` or a mutex.',
          'The program deadlocks.',
          'The compiler refuses to compile it.',
        ],
        correctIndex: 1,
        explanation:
          'Plain `int` `++` is three steps (load, increment, store) that can interleave across threads, losing increments — and per the C++ memory model, concurrent unsynchronized access where at least one writes is a *data race* = undefined behaviour. Use `std::atomic<int>` (its `++` is atomic) or guard with a mutex. See [cppreference: memory model](https://en.cppreference.com/w/cpp/language/memory_model).',
      },
      {
        kind: 'mcq',
        id: 'cpp-10-mcq-2',
        prompt: 'Why prefer `std::lock_guard<std::mutex> lk(m);` over manual `m.lock(); ...; m.unlock();`?',
        options: [
          'It is faster at runtime.',
          'It is RAII: the lock is released in the guard\'s destructor, so it unlocks even if the protected code throws or returns early — preventing a stuck lock.',
          'It allows the mutex to be copied.',
          'lock_guard locks multiple mutexes automatically by default.',
        ],
        correctIndex: 1,
        explanation:
          'Manual `unlock()` is skipped on any early return or exception, leaving the mutex held forever (deadlock). `std::lock_guard` (or `std::scoped_lock`, which also avoids deadlock across multiple mutexes) unlocks in its destructor at scope exit, guaranteed. This is RAII applied to locking. See [cppreference: lock_guard](https://en.cppreference.com/w/cpp/thread/lock_guard).',
      },
      {
        kind: 'mcq',
        id: 'cpp-10-mcq-3',
        prompt: `What is the main benefit of C++20 *concepts*, as in:

\`\`\`cpp
template<std::integral T>
T addv(T a, T b) { return a + b; }
\`\`\``,
        options: [
          'They make templates run faster at runtime.',
          'They constrain template parameters with named, checkable requirements — so `addv("hi","there")` is rejected at the call site with a clear "constraint not satisfied" message instead of a deep instantiation error.',
          'They replace the need for `template` entirely.',
          'They allow templates to be instantiated at runtime.',
        ],
        correctIndex: 1,
        explanation:
          'Concepts express the requirements a type must meet (`std::integral`, `std::sortable`, custom ones). The compiler checks them at the call site, so misuse produces a short, readable diagnostic rather than pages of nested template errors — and they enable cleaner overloading/constrained `auto`. They don\'t change runtime behaviour. See [cppreference: constraints and concepts](https://en.cppreference.com/w/cpp/language/constraints).',
      },
      {
        kind: 'mcq',
        id: 'cpp-10-mcq-4',
        prompt: `What does this C++20 ranges pipeline conceptually produce?

\`\`\`cpp
auto evens_squared = v
    | std::views::filter([](int x){ return x % 2 == 0; })
    | std::views::transform([](int x){ return x * x; });
\`\`\``,
        options: [
          'A new fully-populated vector computed eagerly.',
          'A *lazy view*: elements are filtered to evens and squared on demand as you iterate, with no intermediate container allocated.',
          'A compile error; `|` is bitwise OR.',
          'It sorts `v` and removes odd numbers in place.',
        ],
        correctIndex: 1,
        explanation:
          'Range adaptors compose into a *view* that computes lazily: nothing happens until you iterate, and no intermediate vector is materialised between `filter` and `transform`. The `|` is the range pipe operator, not bitwise OR. To collect results into a container you\'d use `std::ranges::to` (C++23) or a manual loop. See [cppreference: ranges](https://en.cppreference.com/w/cpp/ranges).',
      },
    ],
  },
];
