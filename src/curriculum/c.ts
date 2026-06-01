import type { Phase } from './types';

export const cPhases: Phase[] = [
  // ─── Level 0 ─────────────────────────────────────────────────────────────
  {
    id: 'c-0',
    language: 'c',
    level: 0,
    title: 'Setup & Hello World',
    timeEstimate: '0.5-1 hours',
    intro: `Welcome to C — the small, sharp language that the operating systems, databases, and interpreters you use every day are written in. In this level you'll install a compiler (\`gcc\` or \`clang\`), translate a source file into a native executable, and run your first program. Unlike scripting languages, C is *compiled ahead of time*: a \`.c\` file becomes machine code before it runs.

Locally, save a file \`hello.c\`, build it with \`gcc hello.c -o hello\` (or \`clang hello.c -o hello\`), then run \`./hello\`. Confirm your toolchain with \`gcc --version\`. The browser check below runs a simplified C subset so you can verify the shape of a program before you compile it for real.`,
    topics: [
      { label: 'GCC — the GNU Compiler Collection', url: 'https://gcc.gnu.org/', note: 'The most common open-source C compiler.' },
      { label: 'Clang / LLVM', url: 'https://clang.llvm.org/', note: 'A modern C compiler with excellent diagnostics.' },
      { label: 'cppreference — C language', url: 'https://en.cppreference.com/w/c/language', note: 'The canonical C language reference.' },
    ],
    deliverable: 'Compile and run a hello.c with gcc/clang locally, and run the print statement in the browser sandbox.',
    checks: [
      {
        kind: 'code',
        id: 'c-0-code-1',
        prompt: 'Run the starter program. It must print `Hello, World!` to standard output.',
        boilerplate: '#include <stdio.h>\n\nint main(void) {\n    printf("Hello, World!\\n");\n    return 0;\n}\n',
        expectedOutput: 'Hello, World!',
        explanation: 'Every hosted C program begins execution at `main`. `#include <stdio.h>` brings in the declaration of `printf`, and `return 0;` reports success to the operating system. The `\\n` emits a newline.',
      },
      {
        kind: 'mcq',
        id: 'c-0-mcq-1',
        prompt: 'What does `gcc hello.c -o hello` do?',
        options: [
          'Runs `hello.c` directly through an interpreter.',
          'Compiles and links `hello.c` into an executable named `hello`.',
          'Opens `hello.c` in an editor named `hello`.',
          'Downloads a package called `hello`.',
        ],
        correctIndex: 1,
        explanation: 'C is compiled ahead of time. `gcc` preprocesses, compiles, and links the source into a native executable; `-o hello` names the output file. You then run it with `./hello`. There is no interpreter step at runtime.',
      },
      {
        kind: 'mcq',
        id: 'c-0-mcq-2',
        prompt: 'What is the return type and value convention of `main` in a standard hosted C program?',
        options: [
          'It returns `void`; no value is reported.',
          'It returns `int`, where `0` conventionally means success.',
          'It returns `string`, the program name.',
          'It returns `bool`, where `true` means success.',
        ],
        correctIndex: 1,
        explanation: '`main` returns an `int` that becomes the process exit status. `0` (or `EXIT_SUCCESS`) signals success to the shell; non-zero signals failure. See [cppreference — main function](https://en.cppreference.com/w/c/language/main_function).',
      },
    ],
  },

  // ─── Level 1 ─────────────────────────────────────────────────────────────
  {
    id: 'c-1',
    language: 'c',
    level: 1,
    title: 'Types, Variables & printf Formatting',
    timeEstimate: '4-6 hours',
    intro: `By the end of this phase you'll declare variables of C's fundamental types (\`int\`, \`double\`, \`char\`), reason about *integer vs. floating-point* arithmetic, and drive \`printf\` with the right conversion specifiers. C is statically and weakly typed: every variable has a fixed type chosen at declaration, but the language will happily let one type bleed into another (integer division truncates, \`char\` is just a small integer).

Build locally: a tiny \`convert.c\` that reads no input but prints a table — Celsius to Fahrenheit for a few hardcoded values — using \`printf("%d -> %.1f\\n", c, f)\`. Experiment with \`%d\`, \`%f\`, \`%c\`, \`%x\`, and width/precision flags like \`%5.2f\` to internalise how formatting works.`,
    video: {
      title: 'C Programming Tutorial for Beginners',
      youtubeId: 'KJgsSFOSQv0',
      channelName: 'freeCodeCamp.org',
      duration: '3 hours',
    },
    topics: [
      { label: 'cppreference — Fundamental types', url: 'https://en.cppreference.com/w/c/language/arithmetic_types', note: 'int, char, float, double and their sizes.' },
      { label: 'cppreference — printf', url: 'https://en.cppreference.com/w/c/io/fprintf', note: 'Conversion specifiers and formatting flags.' },
      { label: 'cppreference — Integer constants', url: 'https://en.cppreference.com/w/c/language/integer_constant', note: 'Literal suffixes and bases.' },
      { label: 'cppreference — Implicit conversions', url: 'https://en.cppreference.com/w/c/language/conversion', note: 'Usual arithmetic conversions and promotions.' },
      { label: 'C Operator Precedence', url: 'https://en.cppreference.com/w/c/language/operator_precedence', note: 'A reference table you will consult often.' },
    ],
    deliverable: 'Write convert.c that prints a small Celsius-to-Fahrenheit table using printf formatting.',
    checks: [
      {
        kind: 'code',
        id: 'c-1-code-1',
        prompt: 'Fix the program so it prints `area=78.5` — the area of a circle with radius 5 using `pi = 3.14`.',
        boilerplate: '#include <stdio.h>\n\nint main(void) {\n    double pi = 3.14;\n    double r = 5.0;\n    double area = pi * r * r;\n    printf("area=%f\\n", area);\n    return 0;\n}\n',
        expectedOutput: 'area=78.5',
        explanation: 'Multiplying `double` values keeps the result a `double`. `3.14 * 5 * 5` is `78.5`. The `%f` specifier prints a floating-point value; in real C it defaults to six decimal places (`78.500000`), which still contains the substring `78.5`.',
      },
      {
        kind: 'code',
        id: 'c-1-code-2',
        prompt: 'Complete the program so it prints `sum=42` and `product=440` for `a=22` and `b=20`.',
        boilerplate: '#include <stdio.h>\n\nint main(void) {\n    int a = 22;\n    int b = 20;\n    printf("sum=%d\\n", a + b);\n    printf("product=%d\\n", a * b);\n    return 0;\n}\n',
        expectedOutput: 'sum=42',
        explanation: '`%d` formats a signed decimal integer. Arithmetic on two `int` operands yields an `int`. This program demonstrates the basic declare-then-compute-then-print loop at the heart of every C program.',
        testCases: [
          { expectedOutput: 'sum=42', description: 'sum line' },
          { expectedOutput: 'product=440', description: 'product line' },
        ],
      },
      {
        kind: 'mcq',
        id: 'c-1-mcq-1',
        prompt: `What does this program print?

\`\`\`c
#include <stdio.h>

int main(void) {
    int a = 7;
    int b = 2;
    printf("%d\\n", a / b);
    return 0;
}
\`\`\``,
        options: ['3.5', '3', '4', '3.50000'],
        correctIndex: 1,
        explanation: 'Both operands are `int`, so `/` performs *integer division*, which truncates toward zero: `7 / 2` is `3`, not `3.5`. To get `3.5` you must make at least one operand floating point, e.g. `(double)a / b`. This truncation is one of the most common beginner surprises. See [cppreference — arithmetic operators](https://en.cppreference.com/w/c/language/operator_arithmetic).',
      },
      {
        kind: 'mcq',
        id: 'c-1-mcq-2',
        prompt: `What does this program print?

\`\`\`c
#include <stdio.h>

int main(void) {
    char c = 'A';
    printf("%d\\n", c + 1);
    return 0;
}
\`\`\``,
        options: ['B', '66', '65', 'A1'],
        correctIndex: 1,
        explanation: 'A `char` is an integer type holding a character code. `\'A\'` is `65` in ASCII, so `c + 1` is `66`, and `%d` prints it as the integer `66`. To print the *character* `B` you would use `%c`. See [cppreference — character constant](https://en.cppreference.com/w/c/language/character_constant).',
      },
      {
        kind: 'mcq',
        id: 'c-1-mcq-3',
        prompt: 'You declare `int x;` as a local variable inside a function and read it before assigning a value. What does the C standard say its value is?',
        options: [
          'It is guaranteed to be `0`.',
          'It is indeterminate — reading it is undefined behavior.',
          'It is `NULL`.',
          'The compiler refuses to build the program.',
        ],
        correctIndex: 1,
        explanation: 'Unlike Go or Java, C does *not* zero-initialise automatic (local) variables. Their value is indeterminate, and reading it before initialisation is undefined behavior. Only objects with static storage duration (globals, `static` locals) are zero-initialised. Always initialise your locals.',
      },
      {
        kind: 'mcq',
        id: 'c-1-mcq-4',
        prompt: 'Which `printf` call correctly prints the `double` value `3.14159` rounded to two decimal places (`3.14`)?',
        options: [
          '`printf("%d\\n", 3.14159);`',
          '`printf("%.2f\\n", 3.14159);`',
          '`printf("%2f\\n", 3.14159);`',
          '`printf("%c\\n", 3.14159);`',
        ],
        correctIndex: 1,
        explanation: 'The precision field `.2` in `%.2f` requests two digits after the decimal point, printing `3.14`. `%2f` sets a *minimum field width* of 2 (not precision). Using `%d` on a `double` is undefined behavior — the specifier must match the argument type. See [cppreference — printf](https://en.cppreference.com/w/c/io/fprintf).',
      },
    ],
  },

  // ─── Level 2 ─────────────────────────────────────────────────────────────
  {
    id: 'c-2',
    language: 'c',
    level: 2,
    title: 'Control Flow & Functions',
    timeEstimate: '4-6 hours',
    intro: `This phase covers the structured-programming core of C: \`if\`/\`else\`, \`while\`, \`do/while\`, \`for\`, \`switch\`, and how to factor logic into functions with prototypes. You'll learn that C requires a function to be *declared before it is called* (hence header prototypes), that arguments are passed *by value*, and that \`switch\` falls through cases unless you \`break\`.

Build locally: a \`fizzbuzz.c\` that loops 1..100, printing "Fizz", "Buzz", or "FizzBuzz" using the modulo operator \`%\`. Then refactor the divisibility test into a \`bool divides(int n, int d)\` helper (include \`<stdbool.h>\`). Run it and verify the output against a reference.`,
    video: {
      title: 'C Programming Full Course',
      youtubeId: '87SH2Cn0s9A',
      channelName: 'freeCodeCamp.org',
      duration: '15 hours',
    },
    topics: [
      { label: 'cppreference — if statement', url: 'https://en.cppreference.com/w/c/language/if', note: 'Conditional branching.' },
      { label: 'cppreference — for loop', url: 'https://en.cppreference.com/w/c/language/for', note: 'The three-clause counting loop.' },
      { label: 'cppreference — switch', url: 'https://en.cppreference.com/w/c/language/switch', note: 'Multi-way branch with fallthrough.' },
      { label: 'cppreference — Functions', url: 'https://en.cppreference.com/w/c/language/functions', note: 'Definitions, prototypes, and parameters.' },
      { label: 'cppreference — Operator precedence', url: 'https://en.cppreference.com/w/c/language/operator_precedence', note: 'Includes && || ! and short-circuit rules.' },
    ],
    deliverable: 'Write fizzbuzz.c (1..100) and refactor the divisibility test into a bool divides(int, int) helper.',
    checks: [
      {
        kind: 'code',
        id: 'c-2-code-1',
        prompt: 'Complete `factorial` so the program prints `5!=120`. Use a `for` loop.',
        boilerplate: '#include <stdio.h>\n\nint factorial(int n) {\n    int result = 1;\n    for (int i = 2; i <= n; i++) {\n        result = result * i;\n    }\n    return result;\n}\n\nint main(void) {\n    printf("5!=%d\\n", factorial(5));\n    return 0;\n}\n',
        expectedOutput: '5!=120',
        explanation: 'A `for` loop bundles initialisation, condition, and update. Multiplying `2*3*4*5` (starting from `result = 1`) gives `120`. The function returns an `int`, which `main` formats with `%d`.',
        testCases: [
          { expectedOutput: '5!=120', description: 'factorial of 5' },
          { input: 'printf("6!=%d\\n", factorial(6));', expectedOutput: '6!=720', description: 'factorial of 6' },
        ],
      },
      {
        kind: 'code',
        id: 'c-2-code-2',
        prompt: 'Complete `max` so it returns the larger of two ints. The program should print `max=42`.',
        boilerplate: '#include <stdio.h>\n\nint max(int a, int b) {\n    if (a > b) {\n        return a;\n    }\n    return b;\n}\n\nint main(void) {\n    printf("max=%d\\n", max(17, 42));\n    return 0;\n}\n',
        expectedOutput: 'max=42',
        explanation: 'An early `return` inside the `if` exits the function immediately; otherwise control falls through to the final `return b`. C functions return exactly one value, and arguments are passed by value (copies).',
        testCases: [
          { expectedOutput: 'max=42', description: 'b is larger' },
          { input: 'printf("max=%d\\n", max(99, 3));', expectedOutput: 'max=99', description: 'a is larger' },
        ],
      },
      {
        kind: 'mcq',
        id: 'c-2-mcq-1',
        prompt: `What does this program print?

\`\`\`c
#include <stdio.h>

int main(void) {
    int x = 2;
    switch (x) {
        case 1: printf("one\\n");
        case 2: printf("two\\n");
        case 3: printf("three\\n");
        default: printf("other\\n");
    }
    return 0;
}
\`\`\``,
        options: ['two', 'two, three, other', 'two, three', 'other'],
        correctIndex: 1,
        explanation: 'C `switch` *falls through*: once a matching `case` is found, execution continues into every subsequent case until a `break` or the end of the block. Matching `case 2` runs `two`, then `three`, then `other` (each on its own line). Add `break;` after each case to stop fallthrough. See [cppreference — switch](https://en.cppreference.com/w/c/language/switch).',
      },
      {
        kind: 'mcq',
        id: 'c-2-mcq-2',
        prompt: `What does this loop print?

\`\`\`c
#include <stdio.h>

int main(void) {
    int i = 0;
    do {
        printf("%d ", i);
        i++;
    } while (i < 3);
    return 0;
}
\`\`\``,
        options: ['0 1 2 3', '0 1 2', '1 2 3', '(nothing)'],
        correctIndex: 1,
        explanation: 'A `do/while` loop always executes its body at least once, *then* tests the condition at the bottom. It prints `0`, `1`, `2`; when `i` becomes `3` the condition `i < 3` is false and the loop ends. Compare with a `while` loop, which tests first.',
      },
      {
        kind: 'mcq',
        id: 'c-2-mcq-3',
        prompt: `Why might this code be considered incorrect even though it compiles?

\`\`\`c
int abs_val(int n) {
    if (n < 0) {
        return -n;
    }
}
\`\`\``,
        options: [
          'It is fine; the compiler inserts `return 0` automatically.',
          'When `n >= 0` it reaches the end without a `return`, so the returned value is indeterminate (undefined behavior if used).',
          '`-n` is not a valid expression in C.',
          '`int` functions cannot contain an `if` statement.',
        ],
        correctIndex: 1,
        explanation: 'Flowing off the end of a non-`void` function and then *using* the return value is undefined behavior. For non-negative `n` there is no `return`, so the caller reads garbage. Most compilers warn with `-Wreturn-type`. Add `return n;` for the non-negative path.',
      },
    ],
  },

  // ─── Level 3 ─────────────────────────────────────────────────────────────
  {
    id: 'c-3',
    language: 'c',
    level: 3,
    title: 'Pointers & the Memory Model',
    timeEstimate: '5-7 hours',
    intro: `Pointers are the defining feature of C. A pointer is a variable whose value is a *memory address*. This phase builds the mental model: \`&x\` takes the address of \`x\`, \`*p\` dereferences a pointer to read or write the pointed-to object, and a pointer's type (\`int *\`, \`double *\`) tells the compiler how big the pointed-to object is. You'll learn why "pass by reference" in C is really "pass a pointer by value", and how \`NULL\` and dangling pointers cause crashes.

Because the browser sandbox does **not** model memory addresses, every pointer behaviour below is taught with "what does this print?" MCQs — trace them by hand. Locally, write a \`swap.c\` with \`void swap(int *a, int *b)\` and confirm that passing \`&x, &y\` actually swaps the caller's variables (whereas a by-value \`swap(int a, int b)\` does not).`,
    topics: [
      { label: 'cppreference — Pointer declaration', url: 'https://en.cppreference.com/w/c/language/pointer', note: 'Syntax and semantics of pointers.' },
      { label: 'cppreference — Member access operators', url: 'https://en.cppreference.com/w/c/language/operator_member_access', note: 'The & address-of and * indirection operators.' },
      { label: 'cppreference — NULL', url: 'https://en.cppreference.com/w/c/types/NULL', note: 'The null pointer constant.' },
      { label: 'Pointers — Beej\'s Guide to C', url: 'https://beej.us/guide/bgc/html/split/pointers.html', note: 'A friendly, thorough explanation.' },
    ],
    deliverable: 'Write swap.c with void swap(int *a, int *b) and prove it mutates the caller\'s variables via addresses.',
    checks: [
      {
        kind: 'code',
        id: 'c-3-code-1',
        prompt: 'This program uses only value arithmetic (no pointers, which the sandbox cannot model). Complete it so it prints `doubled=20`.',
        boilerplate: '#include <stdio.h>\n\nint times_two(int n) {\n    return n * 2;\n}\n\nint main(void) {\n    int x = 10;\n    printf("doubled=%d\\n", times_two(x));\n    return 0;\n}\n',
        expectedOutput: 'doubled=20',
        explanation: 'C passes arguments *by value*: `times_two` receives a copy of `x`. To let a function modify the caller\'s variable you must pass its address (`int *`) and dereference it — covered in the MCQs below, since the sandbox does not model addresses.',
      },
      {
        kind: 'mcq',
        id: 'c-3-mcq-1',
        prompt: `What does this program print?

\`\`\`c
#include <stdio.h>

void inc(int n) {
    n = n + 1;
}

int main(void) {
    int x = 5;
    inc(x);
    printf("%d\\n", x);
    return 0;
}
\`\`\``,
        options: ['6', '5', '0', 'garbage'],
        correctIndex: 1,
        explanation: '`inc` receives a *copy* of `x`. Incrementing the copy has no effect on the caller\'s `x`, which is still `5`. To actually mutate it you must pass `&x` to a `void inc(int *n)` and write `*n = *n + 1;`. This is the difference between pass-by-value and passing a pointer.',
      },
      {
        kind: 'mcq',
        id: 'c-3-mcq-2',
        prompt: `What does this program print?

\`\`\`c
#include <stdio.h>

int main(void) {
    int x = 10;
    int *p = &x;
    *p = 42;
    printf("%d\\n", x);
    return 0;
}
\`\`\``,
        options: ['10', '42', 'the address of x', 'garbage'],
        correctIndex: 1,
        explanation: '`p` holds the address of `x`. Writing through the pointer with `*p = 42` modifies the very object `p` points at — namely `x`. So `x` becomes `42`. The `*` in `int *p` declares a pointer; the `*` in `*p = 42` dereferences it. See [cppreference — pointer](https://en.cppreference.com/w/c/language/pointer).',
      },
      {
        kind: 'mcq',
        id: 'c-3-mcq-3',
        prompt: 'On a typical 64-bit system, what does `sizeof(int *)` evaluate to?',
        options: [
          'The size of an `int` (usually 4 bytes).',
          'The size of a pointer (usually 8 bytes), regardless of what it points to.',
          'Always 1 byte.',
          'It is a compile error — you cannot take `sizeof` a pointer type.',
        ],
        correctIndex: 1,
        explanation: 'A pointer stores a memory address, and on a 64-bit platform addresses are 8 bytes. `sizeof(int *)`, `sizeof(double *)`, and `sizeof(char *)` are all the same (the pointer size), even though the *pointed-to* objects differ in size.',
      },
      {
        kind: 'mcq',
        id: 'c-3-mcq-4',
        prompt: 'What typically happens at runtime when you dereference a null pointer, e.g. `int *p = NULL; *p = 5;`?',
        options: [
          'The compiler silently sets `p` to a valid address first.',
          'It is undefined behavior; on most systems it triggers a segmentation fault and crashes.',
          'It always prints `0`.',
          'It is guaranteed to do nothing.',
        ],
        correctIndex: 1,
        explanation: 'Dereferencing a null (or otherwise invalid) pointer is undefined behavior. In practice the OS\'s memory protection traps the access to address 0 and delivers SIGSEGV, crashing the program. Always check pointers for `NULL` before dereferencing them when they may be null.',
      },
    ],
  },

  // ─── Level 4 ─────────────────────────────────────────────────────────────
  {
    id: 'c-4',
    language: 'c',
    level: 4,
    title: 'Arrays, Strings & Pointer Arithmetic',
    timeEstimate: '5-7 hours',
    intro: `Arrays and pointers are deeply intertwined in C. An array name *decays* to a pointer to its first element in most expressions, and \`a[i]\` is literally defined as \`*(a + i)\`. Strings are just \`char\` arrays terminated by a \`'\\0'\` byte — there is no separate string type. This phase covers indexing, iteration, pointer arithmetic, and the standard \`<string.h>\` functions (\`strlen\`, \`strcpy\`, \`strcmp\`).

Because arrays and strings live in memory the sandbox cannot model, the array/string behaviour is taught via "what does this print?" MCQs — trace them carefully. Locally, write a \`wordcount.c\` that walks a hardcoded \`char[]\` and counts spaces to estimate word count, using pointer arithmetic to advance through the buffer.`,
    video: {
      title: 'C Programming Tutorial for Beginners',
      youtubeId: 'KJgsSFOSQv0',
      channelName: 'freeCodeCamp.org',
      duration: '3 hours',
    },
    topics: [
      { label: 'cppreference — Array declaration', url: 'https://en.cppreference.com/w/c/language/array', note: 'Fixed-size arrays and decay rules.' },
      { label: 'cppreference — String library', url: 'https://en.cppreference.com/w/c/string/byte', note: 'strlen, strcpy, strcmp, and friends.' },
      { label: 'cppreference — strlen', url: 'https://en.cppreference.com/w/c/string/byte/strlen', note: 'Counts bytes up to the null terminator.' },
      { label: 'Arrays — Beej\'s Guide to C', url: 'https://beej.us/guide/bgc/html/split/arrays.html', note: 'Arrays, decay, and pointer arithmetic.' },
    ],
    deliverable: 'Write wordcount.c that walks a char[] with pointer arithmetic and counts words by spaces.',
    checks: [
      {
        kind: 'code',
        id: 'c-4-code-1',
        prompt: 'Without using an array (which the sandbox cannot model), sum the integers 1..10 with a loop and print `sum=55`.',
        boilerplate: '#include <stdio.h>\n\nint main(void) {\n    int total = 0;\n    for (int i = 1; i <= 10; i++) {\n        total = total + i;\n    }\n    printf("sum=%d\\n", total);\n    return 0;\n}\n',
        expectedOutput: 'sum=55',
        explanation: 'Iterating over a range and accumulating into a running total is the same loop you would use to sum an array `for (int i = 0; i < n; i++) total += a[i];`. The arithmetic `1+2+...+10` is `55`.',
      },
      {
        kind: 'mcq',
        id: 'c-4-mcq-1',
        prompt: `What does this program print?

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char s[] = "hello";
    printf("%zu\\n", strlen(s));
    return 0;
}
\`\`\``,
        options: ['6', '5', '4', 'undefined'],
        correctIndex: 1,
        explanation: '`strlen` counts the characters *before* the terminating `\'\\0\'`. The literal `"hello"` is five letters plus a hidden null byte, so the array has 6 bytes but `strlen` returns `5`. `sizeof(s)` would be `6` because it includes the terminator. See [cppreference — strlen](https://en.cppreference.com/w/c/string/byte/strlen).',
      },
      {
        kind: 'mcq',
        id: 'c-4-mcq-2',
        prompt: `What does this program print?

\`\`\`c
#include <stdio.h>

int main(void) {
    int a[5] = {10, 20, 30, 40, 50};
    printf("%d\\n", *(a + 2));
    return 0;
}
\`\`\``,
        options: ['10', '20', '30', 'the address of a[2]'],
        correctIndex: 2,
        explanation: 'In an expression, `a` decays to a pointer to its first element. `a + 2` advances by two `int`s, and `*(a + 2)` is exactly `a[2]`, which is `30`. Indexing is defined as `a[i] == *(a + i)` — that is why `2[a]` also compiles and equals `30`. See [cppreference — array](https://en.cppreference.com/w/c/language/array).',
      },
      {
        kind: 'mcq',
        id: 'c-4-mcq-3',
        prompt: 'What does `strcmp("apple", "banana")` return (sign-wise)?',
        options: [
          'A positive value, because "apple" is shorter.',
          'A negative value, because \'a\' < \'b\' at the first differing byte.',
          '`0`, because both are valid strings.',
          '`1` always, when the strings differ.',
        ],
        correctIndex: 1,
        explanation: '`strcmp` compares byte by byte and returns a value whose sign reflects the first differing pair. `\'a\'` (97) is less than `\'b\'` (98), so it returns a negative number. It returns `0` only for equal strings. Do not assume the magnitude is `1` — only the sign is specified.',
      },
      {
        kind: 'mcq',
        id: 'c-4-mcq-4',
        prompt: `What is the danger in this code?

\`\`\`c
char dst[4];
strcpy(dst, "hello");
\`\`\``,
        options: [
          'Nothing — `strcpy` resizes `dst` automatically.',
          'A buffer overflow: `"hello"` needs 6 bytes but `dst` holds only 4, so `strcpy` writes past the end (undefined behavior).',
          '`strcpy` truncates to fit and is safe.',
          'It is a compile error.',
        ],
        correctIndex: 1,
        explanation: '`strcpy` copies until the null terminator with no bounds checking. `"hello"` is 6 bytes (5 chars + `\\0`) but `dst` is only 4 bytes, so the copy overruns the buffer — a classic source of crashes and security vulnerabilities. Use a bounded copy like `snprintf(dst, sizeof dst, "%s", src)` instead.',
      },
    ],
  },

  // ─── Level 5 ─────────────────────────────────────────────────────────────
  {
    id: 'c-5',
    language: 'c',
    level: 5,
    title: 'Structs, Unions, Enums & typedef',
    timeEstimate: '4-6 hours',
    intro: `C lets you build aggregate types: \`struct\` groups named fields into one object, \`union\` overlays fields in the same storage, \`enum\` names integer constants, and \`typedef\` gives types convenient aliases. You'll learn member access with \`.\` (on a value) versus \`->\` (through a pointer), why struct *layout* includes padding for alignment, and how a \`union\` only holds one member at a time.

Because structs live in memory and the sandbox does not model them, the struct/union behaviour is taught via MCQs. Locally, define \`typedef struct { double x, y; } Point;\` and a \`double dist(Point a, Point b)\` function, then print distances to verify your geometry. Inspect layout with \`sizeof\` and \`offsetof\`.`,
    video: {
      title: 'C Programming Full Course',
      youtubeId: '87SH2Cn0s9A',
      channelName: 'freeCodeCamp.org',
      duration: '15 hours',
    },
    topics: [
      { label: 'cppreference — struct', url: 'https://en.cppreference.com/w/c/language/struct', note: 'Defining and using structures.' },
      { label: 'cppreference — union', url: 'https://en.cppreference.com/w/c/language/union', note: 'Overlapping storage for members.' },
      { label: 'cppreference — enum', url: 'https://en.cppreference.com/w/c/language/enum', note: 'Named integer constants.' },
      { label: 'cppreference — typedef', url: 'https://en.cppreference.com/w/c/language/typedef', note: 'Creating type aliases.' },
      { label: 'cppreference — offsetof', url: 'https://en.cppreference.com/w/c/types/offsetof', note: 'Inspecting struct member offsets.' },
    ],
    deliverable: 'Define a Point struct and a dist() function; print distances and inspect sizeof/offsetof.',
    checks: [
      {
        kind: 'code',
        id: 'c-5-code-1',
        prompt: 'Compute a squared distance with plain doubles (no structs, which the sandbox cannot model). For a 3-4 right triangle the result should print `distsq=25`.',
        boilerplate: '#include <stdio.h>\n\ndouble dist_sq(double dx, double dy) {\n    return dx * dx + dy * dy;\n}\n\nint main(void) {\n    printf("distsq=%f\\n", dist_sq(3.0, 4.0));\n    return 0;\n}\n',
        expectedOutput: 'distsq=25',
        explanation: 'A struct would normally bundle `x` and `y`, but the arithmetic is identical: `3*3 + 4*4 = 25`. In real code you would pass a `Point` and access `p.x`, `p.y`. The MCQs cover struct member access and layout, which the sandbox cannot execute.',
      },
      {
        kind: 'mcq',
        id: 'c-5-mcq-1',
        prompt: `What does this program print?

\`\`\`c
#include <stdio.h>

struct Point { int x; int y; };

int main(void) {
    struct Point p = {3, 7};
    struct Point *pp = &p;
    printf("%d %d\\n", p.x, pp->y);
    return 0;
}
\`\`\``,
        options: ['3 7', '7 3', '3 3', '7 7'],
        correctIndex: 0,
        explanation: 'Use `.` to access a member of a struct *value* (`p.x` is `3`) and `->` to access a member *through a pointer* (`pp->y` is `(*pp).y`, which is `7`). `pp->y` is just shorthand for dereference-then-dot. See [cppreference — struct](https://en.cppreference.com/w/c/language/struct).',
      },
      {
        kind: 'mcq',
        id: 'c-5-mcq-2',
        prompt: `Given this enum, what is the value of \`BLUE\`?

\`\`\`c
enum Color { RED, GREEN = 5, BLUE };
\`\`\``,
        options: ['2', '6', '5', '0'],
        correctIndex: 1,
        explanation: 'Enumerators start at `0` and increment by one unless you assign a value. `RED` is `0`, `GREEN` is explicitly `5`, and `BLUE` continues from there as `6`. An `enum` is really a set of named `int` constants. See [cppreference — enum](https://en.cppreference.com/w/c/language/enum).',
      },
      {
        kind: 'mcq',
        id: 'c-5-mcq-3',
        prompt: `What is true about this \`union\`?

\`\`\`c
union Value {
    int i;
    float f;
};
\`\`\``,
        options: [
          'It stores both an `int` and a `float` simultaneously, like a struct.',
          'Its members share the same storage; writing `i` and then reading `f` reinterprets the same bytes.',
          'It is illegal to put different types in a union.',
          'Its size is `sizeof(int) + sizeof(float)`.',
        ],
        correctIndex: 1,
        explanation: 'A `union` overlays all members in one region of memory big enough for its largest member. Only one member is meaningfully "active" at a time; writing one member and reading another reinterprets the underlying bytes (type punning). This is the key difference from a `struct`, which gives every member its own storage. See [cppreference — union](https://en.cppreference.com/w/c/language/union).',
      },
      {
        kind: 'mcq',
        id: 'c-5-mcq-4',
        prompt: `On a typical platform, what is \`sizeof(struct S)\` for the following, and why?

\`\`\`c
struct S {
    char c;
    int n;
};
\`\`\``,
        options: [
          '5 bytes — exactly `sizeof(char) + sizeof(int)`.',
          '8 bytes — padding is inserted after `c` so `n` is 4-byte aligned.',
          '4 bytes — the `char` is ignored.',
          '2 bytes — both members are packed into a short.',
        ],
        correctIndex: 1,
        explanation: 'The compiler inserts *padding* so each member meets its alignment requirement: `int` typically needs 4-byte alignment, so 3 padding bytes follow the 1-byte `char`, giving 8 bytes total. Reordering members (largest first) or `#pragma pack` can reduce padding. Use `sizeof`/`offsetof` to inspect real layouts.',
      },
    ],
  },

  // ─── Level 6 ─────────────────────────────────────────────────────────────
  {
    id: 'c-6',
    language: 'c',
    level: 6,
    title: 'Dynamic Memory — malloc, free & the Heap',
    timeEstimate: '5-7 hours',
    intro: `C gives you manual control over the *heap*: \`malloc\` requests a block of bytes and returns a \`void *\` (or \`NULL\` on failure), \`calloc\` does the same but zero-initialises, \`realloc\` resizes, and \`free\` returns the block to the allocator. You — not a garbage collector — are responsible for freeing every allocation exactly once. This phase covers the lifecycle, the classic bugs (leaks, double-free, use-after-free), and why you should always check \`malloc\`'s result.

Heap behaviour cannot run in the sandbox, so it is taught via MCQs. Locally, write a \`grow.c\` that \`malloc\`s an array, fills it, \`realloc\`s it larger, and \`free\`s it — then run it under \`valgrind\` (covered more in Level 9) to confirm "no leaks are possible".`,
    topics: [
      { label: 'cppreference — malloc', url: 'https://en.cppreference.com/w/c/memory/malloc', note: 'Allocate uninitialised heap memory.' },
      { label: 'cppreference — free', url: 'https://en.cppreference.com/w/c/memory/free', note: 'Return memory to the allocator.' },
      { label: 'cppreference — calloc', url: 'https://en.cppreference.com/w/c/memory/calloc', note: 'Allocate and zero-initialise.' },
      { label: 'cppreference — realloc', url: 'https://en.cppreference.com/w/c/memory/realloc', note: 'Resize an existing allocation.' },
      { label: 'Memory — Beej\'s Guide to C', url: 'https://beej.us/guide/bgc/html/split/manual-memory-allocation.html', note: 'Manual memory allocation explained.' },
    ],
    deliverable: 'Write grow.c that malloc/realloc/free an int array; verify it under valgrind with no leaks.',
    checks: [
      {
        kind: 'code',
        id: 'c-6-code-1',
        prompt: 'No heap here (the sandbox cannot model it). Simulate filling a 4-element buffer with `i*i` and print the last value: `last=9`.',
        boilerplate: '#include <stdio.h>\n\nint main(void) {\n    int last = 0;\n    for (int i = 0; i < 4; i++) {\n        last = i * i;\n    }\n    printf("last=%d\\n", last);\n    return 0;\n}\n',
        expectedOutput: 'last=9',
        explanation: 'With a real heap array you would `int *a = malloc(4 * sizeof(int));` then write `a[i] = i*i;` and finally `free(a);`. The last squared value for `i = 3` is `9`. The MCQs cover the allocation lifecycle the sandbox cannot run.',
      },
      {
        kind: 'mcq',
        id: 'c-6-mcq-1',
        prompt: 'What is the correct, idiomatic way to allocate space for `n` ints on the heap?',
        options: [
          '`int *a = malloc(n);`',
          '`int *a = malloc(n * sizeof(int));`',
          '`int *a = malloc(sizeof(int *));`',
          '`int *a = new int[n];`',
        ],
        correctIndex: 1,
        explanation: '`malloc` takes a size *in bytes*, so you must multiply the element count by `sizeof(int)`. `malloc(n)` would allocate only `n` bytes (room for ~`n/4` ints). `new` is C++, not C. Many style guides prefer `malloc(n * sizeof *a)` so the type can never drift out of sync. See [cppreference — malloc](https://en.cppreference.com/w/c/memory/malloc).',
      },
      {
        kind: 'mcq',
        id: 'c-6-mcq-2',
        prompt: 'After `free(p);`, what must you avoid doing with `p`?',
        options: [
          'Setting `p = NULL;`.',
          'Dereferencing it or freeing it again — both are undefined behavior (use-after-free / double-free).',
          'Passing `NULL` to a later `free`.',
          'Reusing the variable name in a new `malloc`.',
        ],
        correctIndex: 1,
        explanation: 'Once memory is freed, the pointer is *dangling*. Reading/writing through it (use-after-free) or calling `free` again (double-free) is undefined behavior and a common security bug. A good habit is to set `p = NULL;` after freeing — `free(NULL)` is explicitly a safe no-op. See [cppreference — free](https://en.cppreference.com/w/c/memory/free).',
      },
      {
        kind: 'mcq',
        id: 'c-6-mcq-3',
        prompt: 'What distinguishes `calloc(n, size)` from `malloc(n * size)`?',
        options: [
          'They are identical in every respect.',
          '`calloc` zero-initialises the memory and guards against multiplication overflow; `malloc` leaves the bytes indeterminate.',
          '`calloc` allocates on the stack, `malloc` on the heap.',
          '`calloc` never returns `NULL`.',
        ],
        correctIndex: 1,
        explanation: '`calloc(n, size)` allocates `n * size` bytes, sets them all to zero, and computes the product safely (detecting overflow). `malloc` leaves the contents uninitialised (indeterminate). Both can return `NULL` on failure and both allocate from the heap. See [cppreference — calloc](https://en.cppreference.com/w/c/memory/calloc).',
      },
      {
        kind: 'mcq',
        id: 'c-6-mcq-4',
        prompt: `What is the subtle bug in this \`realloc\` usage?

\`\`\`c
p = realloc(p, new_size);
if (p == NULL) {
    return -1;
}
\`\`\``,
        options: [
          'None — this is the recommended pattern.',
          'If `realloc` returns `NULL`, the original block is *not* freed, but you have overwritten `p` and leaked it.',
          '`realloc` cannot grow a block, only shrink it.',
          '`realloc` always invalidates the pointer, so the check is pointless.',
        ],
        correctIndex: 1,
        explanation: 'On failure `realloc` returns `NULL` but leaves the *original* allocation intact. Assigning straight back to `p` overwrites the only pointer to that block, leaking it. The fix is to use a temporary: `void *tmp = realloc(p, new_size); if (!tmp) { /* p still valid */ } else { p = tmp; }`. See [cppreference — realloc](https://en.cppreference.com/w/c/memory/realloc).',
      },
    ],
  },

  // ─── Level 7 ─────────────────────────────────────────────────────────────
  {
    id: 'c-7',
    language: 'c',
    level: 7,
    title: 'The Preprocessor, Headers & Multi-File Builds',
    timeEstimate: '4-6 hours',
    intro: `Before the compiler proper runs, the C *preprocessor* performs textual transformations: \`#include\` pastes in header files, \`#define\` creates macros, and \`#ifdef\`/\`#ifndef\` enable conditional compilation. This phase teaches the difference between object-like and function-like macros, why header *include guards* (or \`#pragma once\`) prevent duplicate definitions, and how a project splits into \`.h\` declarations and \`.c\` definitions linked together — orchestrated by a \`Makefile\`.

Locally, build a two-file project: \`mathutils.h\` declaring \`int square(int);\`, \`mathutils.c\` defining it, and \`main.c\` using it. Compile with \`gcc main.c mathutils.c -o app\`, then write a \`Makefile\` so \`make\` rebuilds only what changed.`,
    topics: [
      { label: 'cppreference — Preprocessor', url: 'https://en.cppreference.com/w/c/preprocessor', note: 'Directives overview.' },
      { label: 'cppreference — #include', url: 'https://en.cppreference.com/w/c/preprocessor/include', note: 'Source file inclusion.' },
      { label: 'cppreference — Macros (#define)', url: 'https://en.cppreference.com/w/c/preprocessor/replace', note: 'Object-like and function-like macros.' },
      { label: 'cppreference — Conditional inclusion', url: 'https://en.cppreference.com/w/c/preprocessor/conditional', note: '#ifdef, #ifndef, #if, include guards.' },
      { label: 'GNU Make Manual', url: 'https://www.gnu.org/software/make/manual/make.html', note: 'Automating multi-file builds.' },
    ],
    deliverable: 'Build a 2-file project (mathutils.h/.c + main.c) with an include guard and a Makefile.',
    checks: [
      {
        kind: 'code',
        id: 'c-7-code-1',
        prompt: 'Use a `#define` macro for a constant. The program should print `circumference=31.4` for radius 5 with `PI 3.14`.',
        boilerplate: '#include <stdio.h>\n#define PI 3.14\n\nint main(void) {\n    double r = 5.0;\n    double c = 2 * PI * r;\n    printf("circumference=%f\\n", c);\n    return 0;\n}\n',
        expectedOutput: 'circumference=31.4',
        explanation: '`#define PI 3.14` is an *object-like macro*: before compilation, every token `PI` is textually replaced with `3.14`. So `2 * PI * r` becomes `2 * 3.14 * 5.0 = 31.4`. Macros are pure text substitution and obey no scoping rules. See [cppreference — replace](https://en.cppreference.com/w/c/preprocessor/replace).',
      },
      {
        kind: 'mcq',
        id: 'c-7-mcq-1',
        prompt: `What does this program print?

\`\`\`c
#include <stdio.h>
#define SQUARE(x) x * x

int main(void) {
    printf("%d\\n", SQUARE(1 + 2));
    return 0;
}
\`\`\``,
        options: ['9', '5', '6', '7'],
        correctIndex: 1,
        explanation: 'Macros expand textually, so `SQUARE(1 + 2)` becomes `1 + 2 * 1 + 2`, which by precedence is `1 + 2 + 2 = 5`, not `9`. The fix is to parenthesise everything: `#define SQUARE(x) ((x) * (x))`. This footgun is exactly why function-like macros must wrap parameters and the whole body in parentheses. See [cppreference — replace](https://en.cppreference.com/w/c/preprocessor/replace).',
      },
      {
        kind: 'mcq',
        id: 'c-7-mcq-2',
        prompt: 'What is the purpose of an include guard like `#ifndef FOO_H` / `#define FOO_H` / `#endif` in a header?',
        options: [
          'To make the header compile faster.',
          'To prevent the header\'s contents from being included more than once in a single translation unit, avoiding duplicate-definition errors.',
          'To hide the header from other files.',
          'To mark the header as the program entry point.',
        ],
        correctIndex: 1,
        explanation: 'If a header is `#include`d twice (often transitively), its declarations would be processed twice — redefining types and causing errors. The guard defines a sentinel macro the first time and skips the body on subsequent includes. `#pragma once` is a common non-standard shorthand. See [cppreference — conditional inclusion](https://en.cppreference.com/w/c/preprocessor/conditional).',
      },
      {
        kind: 'mcq',
        id: 'c-7-mcq-3',
        prompt: 'In a multi-file project, what typically goes in the `.h` header versus the `.c` source file?',
        options: [
          'The `.h` holds full function bodies; the `.c` holds only `main`.',
          'The `.h` holds declarations/prototypes and type definitions; the `.c` holds the function definitions (implementations).',
          'They are interchangeable; the split is purely stylistic.',
          'The `.h` is compiled, the `.c` is only `#include`d.',
        ],
        correctIndex: 1,
        explanation: 'Headers expose an *interface*: prototypes, `struct`/`enum`/`typedef` definitions, and `extern` declarations, so other translation units know how to call your code. The `.c` file provides the *implementation*. Each `.c` is compiled to an object file, then the linker resolves the cross-file references. Putting non-`inline` function bodies in a header included by multiple `.c` files causes duplicate-symbol link errors.',
      },
      {
        kind: 'mcq',
        id: 'c-7-mcq-4',
        prompt: `In a Makefile rule, what does this express?

\`\`\`
app: main.o util.o
	gcc main.o util.o -o app
\`\`\``,
        options: [
          'A variable named `app` is set to the string `main.o util.o`.',
          'A target `app` that depends on `main.o` and `util.o`; if either is newer than `app`, the recipe relinks them.',
          'A comment describing the build.',
          'A command that compiles `app.c`.',
        ],
        correctIndex: 1,
        explanation: 'A Make rule has the form `target: prerequisites` followed by a TAB-indented recipe. Make rebuilds `app` only when a prerequisite (`main.o` or `util.o`) is newer than the target, enabling fast incremental builds. The recipe line must begin with a literal tab. See [GNU Make Manual](https://www.gnu.org/software/make/manual/make.html).',
      },
    ],
  },

  // ─── Level 8 ─────────────────────────────────────────────────────────────
  {
    id: 'c-8',
    language: 'c',
    level: 8,
    title: 'File I/O & the Standard Library',
    timeEstimate: '4-6 hours',
    intro: `The C standard library is small but powerful. This phase covers stream I/O via \`<stdio.h>\` (\`fopen\`, \`fgets\`, \`fprintf\`, \`fclose\`), reading numbers with \`scanf\`/\`sscanf\` and the pitfalls thereof, plus useful utilities from \`<stdlib.h>\` (\`atoi\`, \`strtol\`, \`qsort\`, \`rand\`) and \`<ctype.h>\` (\`isdigit\`, \`toupper\`). You'll learn the \`FILE *\` abstraction, why you must check return values, and the difference between text and binary modes.

Locally, write a \`tac.c\` that opens a file with \`fopen(path, "r")\`, reads it line-by-line with \`fgets\` into a buffer, and prints the lines. Always check that \`fopen\` did not return \`NULL\`, and \`fclose\` when done.`,
    topics: [
      { label: 'cppreference — fopen', url: 'https://en.cppreference.com/w/c/io/fopen', note: 'Open a file stream; check for NULL.' },
      { label: 'cppreference — fgets', url: 'https://en.cppreference.com/w/c/io/fgets', note: 'Read a line into a bounded buffer.' },
      { label: 'cppreference — scanf', url: 'https://en.cppreference.com/w/c/io/fscanf', note: 'Formatted input and its hazards.' },
      { label: 'cppreference — strtol', url: 'https://en.cppreference.com/w/c/string/byte/strtol', note: 'Robust string-to-integer conversion.' },
      { label: 'cppreference — qsort', url: 'https://en.cppreference.com/w/c/algorithm/qsort', note: 'Generic sorting with a comparator.' },
    ],
    deliverable: 'Write a program that opens a file with fopen, reads it via fgets, checks for errors, and fcloses.',
    checks: [
      {
        kind: 'code',
        id: 'c-8-code-1',
        prompt: 'Use `fprintf(stdout, ...)` semantics via a plain `printf` to format two values: print `record: id=7 score=95`.',
        boilerplate: '#include <stdio.h>\n\nint main(void) {\n    int id = 7;\n    int score = 95;\n    printf("record: id=%d score=%d\\n", id, score);\n    return 0;\n}\n',
        expectedOutput: 'record: id=7 score=95',
        explanation: '`printf("...", ...)` is equivalent to `fprintf(stdout, "...", ...)` — `stdout` is the default stream. The same conversion specifiers (`%d`, `%s`, `%f`) work for writing to files via `fprintf`. Real file I/O (`fopen`/`fgets`/`fclose`) is covered in the MCQs since the sandbox has no filesystem.',
      },
      {
        kind: 'mcq',
        id: 'c-8-mcq-1',
        prompt: 'Why must you check the return value of `fopen` before using the `FILE *` it returns?',
        options: [
          '`fopen` is slow, so checking caches the result.',
          '`fopen` returns `NULL` on failure (missing file, no permission); using a `NULL` stream is undefined behavior.',
          '`fopen` returns the file size, which you need.',
          'You do not need to — `fopen` aborts the program on failure.',
        ],
        correctIndex: 1,
        explanation: '`fopen` returns `NULL` when it cannot open the file (e.g., the path does not exist or you lack permission). Passing that `NULL` to `fgets`/`fprintf` is undefined behavior and typically crashes. Always write `FILE *f = fopen(path, "r"); if (!f) { perror(path); return 1; }`. See [cppreference — fopen](https://en.cppreference.com/w/c/io/fopen).',
      },
      {
        kind: 'mcq',
        id: 'c-8-mcq-2',
        prompt: 'Why is `gets()` removed from modern C, and what should replace it?',
        options: [
          '`gets` is too slow; use `scanf` instead.',
          '`gets` cannot limit how many bytes it reads, so any long line overflows the buffer — use `fgets`, which takes a size.',
          '`gets` only reads integers; use `fgets` for text.',
          'There is no problem with `gets`; it is still recommended.',
        ],
        correctIndex: 1,
        explanation: '`gets` has no way to know the size of the destination buffer, so a line longer than the buffer overflows it — a notorious source of exploits. It was removed in C11. `fgets(buf, sizeof buf, stdin)` takes the buffer size and stops safely. See [cppreference — fgets](https://en.cppreference.com/w/c/io/fgets).',
      },
      {
        kind: 'mcq',
        id: 'c-8-mcq-3',
        prompt: 'Why is `strtol` generally preferred over `atoi` for parsing integers from strings?',
        options: [
          '`atoi` is faster but less portable.',
          '`strtol` reports errors (via `endptr` and `errno`) and handles overflow, whereas `atoi` returns `0` on invalid input with no way to tell the difference.',
          '`strtol` parses floats; `atoi` only parses integers.',
          'They are identical; `strtol` is just the newer name.',
        ],
        correctIndex: 1,
        explanation: '`atoi("abc")` and `atoi("0")` both return `0`, so you cannot distinguish an error from a legitimate zero, and `atoi` has undefined behavior on overflow. `strtol` sets `*endptr` to the first unparsed character and sets `errno` to `ERANGE` on overflow, giving you real error handling. See [cppreference — strtol](https://en.cppreference.com/w/c/string/byte/strtol).',
      },
      {
        kind: 'mcq',
        id: 'c-8-mcq-4',
        prompt: '`qsort` takes a comparator function. What must that comparator return to sort *ascending*?',
        options: [
          '`true` if the first element is larger.',
          'A negative, zero, or positive value when the first argument is respectively less than, equal to, or greater than the second.',
          'The index of the larger element.',
          'Always `1` to indicate a swap is needed.',
        ],
        correctIndex: 1,
        explanation: 'The `qsort` comparator has signature `int cmp(const void *a, const void *b)` and follows the `strcmp` convention: return `<0`, `0`, or `>0`. For ascending order you typically `return (*ia > *ib) - (*ia < *ib);` after casting the `void *` arguments. See [cppreference — qsort](https://en.cppreference.com/w/c/algorithm/qsort).',
      },
    ],
  },

  // ─── Level 9 ─────────────────────────────────────────────────────────────
  {
    id: 'c-9',
    language: 'c',
    level: 9,
    title: 'Undefined Behavior, Debugging & Common Bugs',
    timeEstimate: '5-7 hours',
    intro: `C trades safety for speed: many mistakes are *undefined behavior* (UB), meaning the standard imposes no requirements at all — the program may crash, corrupt data, or appear to work until it does not. This phase catalogues the classic UB (signed overflow, out-of-bounds access, use-after-free, reading uninitialised memory, strict-aliasing violations) and the tools that catch them: \`-Wall -Wextra\`, \`gdb\` for stepping, \`valgrind\` for memory errors, and AddressSanitizer (\`-fsanitize=address\`).

Locally, compile a deliberately buggy program with \`gcc -g -fsanitize=address,undefined bug.c\` and watch the sanitizer pinpoint a heap-buffer-overflow. Then step through it in \`gdb\`: \`break main\`, \`run\`, \`next\`, \`print var\`. Building this debugging reflex is what separates working C from crashing C.`,
    topics: [
      { label: 'cppreference — Undefined behavior', url: 'https://en.cppreference.com/w/c/language/behavior', note: 'What UB means and why it is dangerous.' },
      { label: 'GDB Documentation', url: 'https://www.gnu.org/software/gdb/documentation/', note: 'The GNU debugger manual.' },
      { label: 'Valgrind Quick Start', url: 'https://valgrind.org/docs/manual/quick-start.html', note: 'Detecting leaks and invalid accesses.' },
      { label: 'AddressSanitizer', url: 'https://clang.llvm.org/docs/AddressSanitizer.html', note: 'Fast memory-error detector.' },
      { label: 'GCC Warning Options', url: 'https://gcc.gnu.org/onlinedocs/gcc/Warning-Options.html', note: '-Wall, -Wextra, and friends.' },
    ],
    deliverable: 'Compile a buggy program with -fsanitize=address,undefined and fix every diagnostic; step through it in gdb.',
    checks: [
      {
        kind: 'code',
        id: 'c-9-code-1',
        prompt: 'Avoid the classic off-by-one: loop the *correct* number of times so this prints `count=5` (iterate i from 0 while i < 5).',
        boilerplate: '#include <stdio.h>\n\nint main(void) {\n    int count = 0;\n    for (int i = 0; i < 5; i++) {\n        count++;\n    }\n    printf("count=%d\\n", count);\n    return 0;\n}\n',
        expectedOutput: 'count=5',
        explanation: 'The half-open range `0 <= i < 5` runs exactly five times (i = 0,1,2,3,4). Using `<=` here would run six times — the off-by-one that, with an array, becomes an out-of-bounds write and undefined behavior. Match the loop bound to the array length.',
      },
      {
        kind: 'mcq',
        id: 'c-9-mcq-1',
        prompt: 'What does the C standard say about signed integer overflow, e.g. `INT_MAX + 1`?',
        options: [
          'It wraps around to `INT_MIN`, which is guaranteed.',
          'It is undefined behavior — the compiler may assume it never happens and optimise accordingly.',
          'It saturates at `INT_MAX`.',
          'It raises a catchable exception.',
        ],
        correctIndex: 1,
        explanation: 'Signed overflow is undefined behavior in C. Compilers exploit this: they may assume `x + 1 > x` always holds and delete "impossible" branches, producing surprising results. (Unsigned overflow, by contrast, is well-defined modular arithmetic.) Use `-fsanitize=undefined` to catch it, or checked-arithmetic builtins.',
      },
      {
        kind: 'mcq',
        id: 'c-9-mcq-2',
        prompt: 'Which tool is best suited to detect memory leaks and invalid reads/writes at runtime in a compiled C program?',
        options: [
          '`gcc -E` (the preprocessor).',
          'Valgrind (or AddressSanitizer via `-fsanitize=address`).',
          '`make clean`.',
          'The `sizeof` operator.',
        ],
        correctIndex: 1,
        explanation: 'Valgrind\'s memcheck tool instruments the binary to flag invalid reads/writes, use-after-free, and unfreed allocations. AddressSanitizer (`-fsanitize=address`) does similar checks with much lower overhead at compile time. `gcc -E` only runs the preprocessor; `sizeof` is unrelated. See [Valgrind Quick Start](https://valgrind.org/docs/manual/quick-start.html).',
      },
      {
        kind: 'mcq',
        id: 'c-9-mcq-3',
        prompt: 'A program crashes with SIGSEGV. You rebuild it. Which compile flags best help you debug it in `gdb`?',
        options: [
          '`-O3` for maximum optimisation.',
          '`-g` to include debug symbols (often with `-O0` so the code maps cleanly to source lines).',
          '`-w` to suppress all warnings.',
          '`-static` to bundle libraries.',
        ],
        correctIndex: 1,
        explanation: '`-g` embeds debugging information (variable names, line numbers) so `gdb` can show source, set line breakpoints, and print locals. Disabling optimisation with `-O0` keeps the generated code aligned with your source so stepping is not confusing. `-O3` and `-w` make debugging harder. See [GDB Documentation](https://www.gnu.org/software/gdb/documentation/).',
      },
      {
        kind: 'mcq',
        id: 'c-9-mcq-4',
        prompt: `What is wrong with returning the address of a local variable?

\`\`\`c
int *make(void) {
    int x = 42;
    return &x;
}
\`\`\``,
        options: [
          'Nothing; the value is copied out safely.',
          '`x` lives on the stack and its lifetime ends when `make` returns, so the caller holds a dangling pointer (use-after-return is undefined behavior).',
          'You cannot take the address of an `int`.',
          'The function should return `int`, not `int *`.',
        ],
        correctIndex: 1,
        explanation: 'Automatic (local) variables live only for the duration of their enclosing block. When `make` returns, `x`\'s storage is reclaimed, so the returned pointer dangles — dereferencing it is undefined behavior. To return a value that outlives the function, either return the `int` by value or `malloc` it on the heap and let the caller `free` it.',
      },
    ],
  },

  // ─── Level 10 ────────────────────────────────────────────────────────────
  {
    id: 'c-10',
    language: 'c',
    level: 10,
    title: 'Bit Manipulation, Performance & Systems Foundations',
    timeEstimate: '5-7 hours',
    intro: `This capstone connects C to the hardware beneath it. You'll work with the bitwise operators (\`&\`, \`|\`, \`^\`, \`~\`, \`<<\`, \`>>\`) to pack flags and twiddle bits, reason about *endianness*, and understand why \`unsigned\` overflow is defined while signed is not. On the performance side you'll meet the cache hierarchy (why row-major traversal beats column-major), the cost of branch mispredictions, and how \`const\`/\`restrict\` and \`-O2\` help the optimiser. Finally you'll glimpse systems concepts: the System V calling convention (arguments in registers, the stack, the red zone) and how libc wraps raw syscalls.

Locally, write a \`bits.c\` that prints a number in binary by shifting and masking, sets/clears/toggles individual flag bits, and uses \`__builtin_popcount\` to count set bits. Then disassemble a small function with \`gcc -O2 -S\` (or \`objdump -d\`) and find your code in the generated assembly.`,
    topics: [
      { label: 'cppreference — Bitwise operators', url: 'https://en.cppreference.com/w/c/language/operator_arithmetic', note: '&, |, ^, ~, <<, >> semantics.' },
      { label: 'cppreference — Integer types', url: 'https://en.cppreference.com/w/c/types/integer', note: 'Fixed-width types from <stdint.h>.' },
      { label: 'What Every Programmer Should Know About Memory', url: 'https://people.freebsd.org/~lstewart/articles/cpumemory.pdf', note: 'Ulrich Drepper on caches and memory.' },
      { label: 'System V AMD64 ABI', url: 'https://gitlab.com/x86-psABIs/x86-64-ABI', note: 'The calling convention on Linux/macOS x86-64.' },
      { label: 'ISO/IEC 9899 (C standard) overview', url: 'https://www.iso.org/standard/82075.html', note: 'The official C23 standard listing.' },
    ],
    deliverable: 'Write bits.c that prints binary, sets/clears/toggles flag bits, and counts set bits; disassemble a function with -O2 -S.',
    checks: [
      {
        kind: 'code',
        id: 'c-10-code-1',
        prompt: 'Use bit shifting in arithmetic: `1 << 4` is two-to-the-fourth. Make the program print `power=16`.',
        boilerplate: '#include <stdio.h>\n\nint main(void) {\n    int power = 1 << 4;\n    printf("power=%d\\n", power);\n    return 0;\n}\n',
        expectedOutput: 'power=16',
        explanation: 'Left-shifting `1` by `n` bits multiplies by 2^n, so `1 << 4` is `16`. Shifts are the foundation of bit manipulation; combined with `&`, `|`, `^`, and `~` they let you pack many boolean flags into a single integer. See [cppreference — bitwise operators](https://en.cppreference.com/w/c/language/operator_arithmetic).',
      },
      {
        kind: 'code',
        id: 'c-10-code-2',
        prompt: 'Combine flags with bitwise OR: set bit 0 and bit 2 (`1 | 4`) and print `flags=5`.',
        boilerplate: '#include <stdio.h>\n\nint main(void) {\n    int flags = 1 | 4;\n    printf("flags=%d\\n", flags);\n    return 0;\n}\n',
        expectedOutput: 'flags=5',
        explanation: '`|` sets bits: `0b001 | 0b100` is `0b101`, which is `5`. To test a flag you use `flags & MASK`, to clear one you use `flags & ~MASK`, and to toggle one you use `flags ^ MASK`. This is how C represents compact sets of options.',
      },
      {
        kind: 'mcq',
        id: 'c-10-mcq-1',
        prompt: `What does this print?

\`\`\`c
#include <stdio.h>

int main(void) {
    unsigned int x = 0xF0;
    unsigned int y = 0x0F;
    printf("%u\\n", x ^ y);
    return 0;
}
\`\`\``,
        options: ['0', '15', '240', '255'],
        correctIndex: 3,
        explanation: 'XOR (`^`) sets each result bit where exactly one operand has a `1`. `0xF0` is `11110000` and `0x0F` is `00001111`; they share no bits, so the XOR is `11111111` = `0xFF` = `255`. XOR is also the basis of the in-place swap trick and simple ciphers.',
      },
      {
        kind: 'mcq',
        id: 'c-10-mcq-2',
        prompt: 'What does *endianness* describe?',
        options: [
          'Whether a CPU is 32-bit or 64-bit.',
          'The order in which the bytes of a multi-byte value are stored in memory — little-endian stores the least-significant byte first.',
          'Whether integers are signed or unsigned.',
          'The number of cores a processor has.',
        ],
        correctIndex: 1,
        explanation: 'Endianness is the byte order of multi-byte scalars. Little-endian (x86, most ARM) stores the least-significant byte at the lowest address; big-endian (network byte order, some MIPS) stores the most-significant byte first. It matters when you serialise binary data or cast between pointer types. Use `htons`/`ntohl` for network byte order.',
      },
      {
        kind: 'mcq',
        id: 'c-10-mcq-3',
        prompt: 'Why does iterating a 2-D array in *row-major* order (`a[i][j]` with `j` innermost) typically run faster than column-major on modern CPUs?',
        options: [
          'Row-major uses fewer instructions.',
          'It accesses memory sequentially, which is cache-friendly — each cache line load brings in the next elements you will use.',
          'The compiler forbids column-major access.',
          'Row-major avoids integer overflow.',
        ],
        correctIndex: 1,
        explanation: 'C stores 2-D arrays in row-major order, so consecutive `a[i][j]` for increasing `j` are adjacent in memory. The CPU fetches memory in cache-line-sized chunks (e.g. 64 bytes), so sequential access reuses each line fully, while column-major access jumps across rows and thrashes the cache. Spatial locality is one of the biggest real-world performance levers.',
      },
      {
        kind: 'mcq',
        id: 'c-10-mcq-4',
        prompt: 'On the System V AMD64 ABI (Linux/macOS x86-64), where are the first several integer/pointer function arguments passed?',
        options: [
          'All arguments are pushed onto the stack in order.',
          'In registers (rdi, rsi, rdx, rcx, r8, r9), with additional arguments spilled to the stack.',
          'In a single global variable.',
          'Always in rax.',
        ],
        correctIndex: 1,
        explanation: 'The System V AMD64 calling convention passes the first six integer/pointer arguments in `rdi, rsi, rdx, rcx, r8, r9`, floating-point args in `xmm0`–`xmm7`, and the return value in `rax`. Extra arguments go on the stack. Knowing this lets you read disassembly and understand FFI/syscall mechanics. See the [System V AMD64 ABI](https://gitlab.com/x86-psABIs/x86-64-ABI).',
      },
    ],
  },
];
