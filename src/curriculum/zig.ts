import type { Phase } from './types';

export const zigPhases: Phase[] = [
  // ─── Level 0 ─────────────────────────────────────────────────────────────
  {
    id: 'zig-0',
    language: 'zig',
    level: 0,
    title: 'Setup & Hello World',
    timeEstimate: '0.5-1 hours',
    intro: `Welcome to Zig! Zig is a small, explicit systems language: no hidden control flow, no hidden allocations, no preprocessor, and a compiler that doubles as a build system. In this level you'll install the toolchain, confirm your version, and run your very first program. Absolute beginners start here — we will read that first program one piece at a time.

Here is the whole thing:

\`\`\`zig
const std = @import("std");

pub fn main() void {
    std.debug.print("Hello, World!\\n", .{});
}
\`\`\`

Here is a map of the pieces before we walk through them one at a time:

\`\`\`text
const std = @import("std");
  │     │        │
  │     │        └─ pull in the standard-library toolbox
  │     └─ the name we'll use to reach it
  └─ this name never changes (a constant)

pub fn main() void {  ...  }
 │   │   │  │   │    └─ the body (the instructions)
 │   │   │  │   └─ returns nothing
 │   │   │  └─ takes no input
 │   │   └─ the name (the program's entry point)
 │   └─ "a function starts here"
 └─ visible to the program launcher
\`\`\`

Now line by line, in plain English.

**\`const std = @import("std");\`** — "Importing" means *pulling in code that someone else already wrote* so you can use it instead of writing it yourself. Zig ships with a big toolbox called the **standard library** ("std" for short): ready-made tools for printing, math, files, and more. \`@import("std")\` reaches into that toolbox and hands it back to you. \`const std = ...\` gives that toolbox a name — \`std\` — so the rest of your program can say "use the thing called \`std\`." \`const\` means *this name will never point at anything else* (it is a constant — change it later and the compiler stops you). The line ends in a semicolon \`;\`, which is how you tell Zig "this instruction is finished." Remove this line and the program can't find \`std.debug.print\`, so it won't compile. *In memory at runtime:* nothing extra is stored for \`std\` — it is a compile-time handle to library code, resolved while the program is being built, not a value sitting in memory as it runs.

**\`pub fn main() void\`** — This line defines a **function**. A function is a *named set of instructions* — a recipe the computer can follow. Reading the words left to right:
- \`pub\` means **public** — it makes \`main\` visible to the part of Zig that launches your program. Without \`pub\`, the launcher can't see \`main\` and the program won't start.
- \`fn\` is the keyword that says "a function starts here" (short for "function"). Remove it and Zig no longer reads this as a function definition.
- \`main\` is the function's **name**. The name \`main\` is special: when you run a Zig program, the computer looks for the function called \`main\` and starts there. It is the front door of your program. Rename it to something else and the program has no entry point.
- \`()\` is an empty pair of parentheses. Parentheses are where a function receives information to work with. Empty parentheses mean "this function needs nothing handed to it." If \`main\` took inputs, their names and types would go between these parentheses.
- \`void\` describes what the function *gives back* when it finishes. \`void\` means *nothing* — \`main\` does its work (printing) but hands no value back. *In memory at runtime:* because the return type is \`void\`, no return value is set aside; \`main\` simply runs its body and ends.

The \`{\` at the end opens the function's **body** — the instructions it runs — and the matching \`}\` further down closes it. Everything between the braces is what \`main\` does.

**\`std.debug.print("Hello, World!\\n", .{});\`** — This is the one instruction inside \`main\`, and it does the actual printing. \`std.debug.print\` means "reach into \`std\`, then into its \`debug\` section, and use the \`print\` tool." The dots are just "go inside." The parentheses hold the two things we hand to \`print\`:
- \`"Hello, World!\\n"\` is a **string** — text wrapped in double quotes. This is the message to show. The \`\\n\` at the end is not two characters on screen; it is a single **newline** character — it means "move to the next line," like pressing Enter. Without it, the next thing printed would sit on the same line. *In memory:* those 14 bytes (\`H\`, \`e\`, \`l\`, … and the newline) are baked into the program and read straight from there when it runs.
- \`.{}\` is an **empty tuple** — a little bundle of extra values to slot into the message. Our message has no blanks to fill, so the bundle is empty. (Later you'll write things like \`.{ name, age }\` to fill in blanks marked by \`{s}\`/\`{d}\`.) Zig requires this second argument even when it's empty. *In memory:* an empty tuple holds zero values and takes up no space.

Run this and the computer prints \`Hello, World!\` and moves to a new line. Note: Zig moves fast and is pre-1.0 — this course targets 0.13+ semantics, so always cross-check against the version printed by \`zig version\`.`,
    topics: [
      {
        label: 'Download & install Zig',
        url: 'https://ziglang.org/download/',
        note: 'Official prebuilt binaries for every platform — unzip and add to PATH.',
      },
      {
        label: 'Getting Started',
        url: 'https://ziglang.org/learn/getting-started/',
        note: 'Install verification and your first `zig run` / `zig build`.',
      },
      {
        label: 'zig.guide — Hello World',
        url: 'https://zig.guide/getting-started/hello-world/',
        note: 'A maintained community tutorial that tracks recent Zig releases.',
      },
    ],
    deliverable: 'Run `zig version` locally, then run a program that prints `Hello, Zig!` to standard error.',
    checks: [
      {
        kind: 'code',
        id: 'zig-0-code-1',
        prompt: 'Run the starter program so it prints `Hello, Zig!`.',
        boilerplate:
          'const std = @import("std");\n\npub fn main() void {\n    std.debug.print("Hello, Zig!\\n", .{});\n}\n',
        expectedOutput: 'Hello, Zig!',
        explanation:
          'Token by token: `const std = @import("std")` pulls in Zig\'s standard-library toolbox and names it `std` (a `const`, so the name never changes); without it, `std.debug.print` can\'t be found. `pub fn main() void` defines the function named `main`, which is where the program starts running — `fn` says "function," `main` is the special entry-point name, `()` means it takes no input, `void` means it returns nothing, and `pub` makes it visible to the launcher (drop `pub` and the program won\'t start). Inside the braces, `std.debug.print("Hello, Zig!\\n", .{})` does the printing: the first argument is the text to show (the `\\n` is a single newline character — "go to the next line"), and the second argument `.{}` is an empty tuple of values to fill into the message (empty here because there are no blanks to fill). At runtime no extra value sits in memory for that tuple — it is empty. `print` writes to standard error, which is fine for this kind of program. Change `"Hello, Zig!\\n"` and you change what appears on screen.',
      },
      {
        kind: 'mcq',
        id: 'zig-0-mcq-1',
        prompt: 'What is the second argument to `std.debug.print("...", .{})`?',
        options: [
          'A list of variadic arguments, like C `printf`.',
          'An anonymous-struct tuple holding the values to interpolate.',
          'A format-options struct controlling width and precision.',
          'A pointer to a writer object.',
        ],
        correctIndex: 1,
        explanation:
          "Zig has no variadic functions in the C sense. `print` is generic over a tuple type, so you pass an anonymous tuple literal `.{a, b}`. With no arguments you still must pass the empty tuple `.{}`. See the [std.debug docs](https://ziglang.org/documentation/master/std/#std.debug.print).",
      },
      {
        kind: 'mcq',
        id: 'zig-0-mcq-2',
        prompt: 'What command compiles and immediately runs `main.zig` in one step?',
        options: ['`zig main.zig`', '`zig build main.zig`', '`zig run main.zig`', '`zig exec main.zig`'],
        correctIndex: 2,
        explanation:
          '`zig run main.zig` compiles to a temporary executable and runs it. `zig build-exe` produces a binary you invoke yourself, and `zig build` drives the `build.zig` script. See [Getting Started](https://ziglang.org/learn/getting-started/).',
      },
    ],
  },

  // ─── Level 1 ─────────────────────────────────────────────────────────────
  {
    id: 'zig-1',
    language: 'zig',
    level: 1,
    title: 'Zig Basics — const/var, Integer Types & Overflow',
    timeEstimate: '4-6 hours',
    intro: `This phase introduces the three ideas every program is built from — **variables**, **types**, and **functions** — assuming you have never programmed before. We'll meet each from scratch and then look at the details that bite Zig newcomers.

**A variable is a named box that holds a value.** When you write \`const width = 10;\`, you are telling the computer: "set aside a little box, put the number 10 in it, and let me refer to that box by the name \`width\`." Later, writing \`width\` means "give me whatever is in that box" (here, 10). Zig has two kinds of box. \`const\` makes a box whose contents *never change* after you fill it — \`const\` is the one you should reach for by default. \`var\` makes a box you *can* change later, for example a running counter you add to inside a loop. In fact Zig is strict about this: if you declare a \`var\` but never actually change it, the compiler stops you and tells you to use \`const\` instead — this keeps your code honest about what does and doesn't move.

**A type is the kind of thing a box holds.** A box can hold a whole number, or text, or a yes/no value — and the *type* says which. Zig is unusually explicit about number types: instead of one vague "integer," it has \`u8\`, \`i32\`, \`usize\`, and more. The letter says signed or unsigned (\`u\` = unsigned, only zero and up; \`i\` = signed, can be negative), and the number says how many **bits** of space it gets, which sets the range of values it can hold (a \`u8\` holds 0 through 255, for instance). \`usize\` is the type Zig uses for counts and list positions. You write the type after a colon: \`const n: u8 = 10;\` reads as "a box named \`n\`, of type \`u8\`, holding 10." A key consequence of fixed sizes is **overflow**: if a \`u8\` already holds 255 and you add 1, there is no room for 256 — and in a safe build Zig treats that as an error and stops, rather than silently giving a wrong answer. To deliberately wrap around (C-style), you opt in with a special operator like \`+%\`.

**A function is a named recipe** — a block of instructions you can run by name. You write the recipe once, then "call" it whenever you need it, so you don't repeat yourself. A function can take **parameters** (values handed in, listed in the parentheses, each with a name and a type like \`a: i32\`) and can **return** one value back (whose type is written after the parentheses). For example \`fn double(n: i32) i32 { return n * 2; }\` reads as "a function named \`double\` that takes one \`i32\` called \`n\` and gives back an \`i32\` — namely \`n\` times 2." Calling it with \`double(5)\` runs the recipe with \`n\` set to 5 and produces 10. A function that returns nothing is marked \`void\`, which is exactly what you saw on \`pub fn main() void\` in Level 0: \`main\` is just a function the launcher calls for you, and \`void\` says it hands nothing back. A **statement** is one complete instruction — usually one line ending in a semicolon \`;\`, like \`total += i;\` — and a function's body is a sequence of statements run top to bottom.

By the end of this phase you'll read short Zig programs and predict their output. To build the muscle, write locally: a tiny program that declares a \`const\` width and a \`var\` counter, loops with \`while\` to add up the numbers 1 through 5, and prints the running total with \`std.debug.print("total={d}\\n", .{total})\` — where \`{d}\` is a blank that gets filled in with the decimal number \`total\`. Then try declaring a \`var\` you never change, and watch the compiler reject it.`,
    topics: [
      { label: 'Language Reference — Variables', url: 'https://ziglang.org/documentation/master/#Variables', note: 'const, var, and the rules that govern them.' },
      { label: 'Language Reference — Integers', url: 'https://ziglang.org/documentation/master/#Integers', note: 'Arbitrary-width signed/unsigned integer types.' },
      { label: 'Language Reference — Integer Overflow', url: 'https://ziglang.org/documentation/master/#Integer-Overflow', note: 'Why overflow is illegal behaviour in safe builds.' },
      { label: 'Language Reference — Primitive Types', url: 'https://ziglang.org/documentation/master/#Primitive-Types', note: 'The full table of built-in scalar types.' },
      { label: 'zig.guide — Assignment', url: 'https://zig.guide/language-basics/assignment/', note: 'const vs var, undefined, and basic types.' },
    ],
    deliverable: 'A program that sums 1..N in a `while` loop using a `var` accumulator and prints the result.',
    checks: [
      {
        kind: 'code',
        id: 'zig-1-code-1',
        prompt: 'Complete the program so it prints `total=15` (the sum of 1 through 5) using a `var` accumulator.',
        boilerplate:
          'const std = @import("std");\n\npub fn main() void {\n    var i: usize = 1;\n    var total: usize = 0;\n    while (i <= 5) {\n        total += i;\n        i += 1;\n    }\n    std.debug.print("total={d}\\n", .{total});\n}\n',
        expectedOutput: 'total=15',
        explanation:
          '`const` would reject reassignment, so the mutating accumulator and loop index must be `var`. The increment lives in the loop body here; `usize` is the unsigned word-width integer used for counts and indices.',
      },
      {
        kind: 'mcq',
        id: 'zig-1-mcq-1',
        prompt: 'Which keyword declares a binding you intend to reassign later?',
        options: ['`let`', '`var`', '`const`', '`mut`'],
        correctIndex: 1,
        explanation:
          '`const` is immutable and is the recommended default; `var` is for bindings you reassign. Zig has no `let`/`mut` keywords. Declaring a `var` you never mutate is a compile error, nudging you toward `const`. See [Variables](https://ziglang.org/documentation/master/#Variables).',
      },
      {
        kind: 'mcq',
        id: 'zig-1-mcq-2',
        prompt: `In a **safe** build (Debug/ReleaseSafe), what happens here?

\`\`\`zig
var x: u8 = 255;
x += 1;
std.debug.print("{d}\\n", .{x});
\`\`\``,
        options: [
          'It prints `0` — the value wraps around silently.',
          'It prints `256`.',
          'It panics at runtime with "integer overflow".',
          'It is a compile-time error.',
        ],
        correctIndex: 2,
        explanation:
          'A `u8` holds 0–255. Adding 1 to 255 overflows, which is illegal behaviour: safe builds insert a check that panics at runtime. To get C-style wraparound you must opt in with the wrapping operator `+%` (`x +%= 1` would give `0`). The value isn’t known at compile time here, so it isn’t a compile error. See [Integer Overflow](https://ziglang.org/documentation/master/#Integer-Overflow).',
      },
      {
        kind: 'mcq',
        id: 'zig-1-mcq-3',
        prompt: 'Why is `var n: u32 = 5;` (where `n` is never reassigned) rejected by the compiler?',
        options: [
          'Because `u32` cannot be initialised inline.',
          'Because a `var` that is never mutated must be a `const` — Zig flags it as an error.',
          'Because integers default to `i32`, not `u32`.',
          'Because top-level `var` declarations are forbidden.',
        ],
        correctIndex: 1,
        explanation:
          "Zig reports `error: local variable is never mutated` and suggests changing `var` to `const`. This keeps mutability honest and self-documenting, much like Rust’s default-immutable bindings. See [Variables](https://ziglang.org/documentation/master/#Variables).",
      },
      {
        kind: 'mcq',
        id: 'zig-1-mcq-4',
        prompt: 'What does `usize` represent?',
        options: [
          'A fixed 32-bit unsigned integer.',
          'An unsigned integer sized to hold any in-memory index/pointer offset on the target (pointer-width).',
          'A signed size type, like C `ssize_t`.',
          'The Unicode codepoint type.',
        ],
        correctIndex: 1,
        explanation:
          '`usize` is the unsigned integer wide enough to address any byte in memory on the target (64-bit on most desktops). Its signed counterpart is `isize`. It is the idiomatic type for lengths and indices, mirroring C’s `size_t`. See [Primitive Types](https://ziglang.org/documentation/master/#Primitive-Types).',
      },
    ],
  },

  // ─── Level 2 ─────────────────────────────────────────────────────────────
  {
    id: 'zig-2',
    language: 'zig',
    level: 2,
    title: 'Control Flow & Functions — if, while, for, return types',
    timeEstimate: '4-6 hours',
    intro: `Now you'll express logic: \`if\` and \`while\` (with optional continue-expressions), \`for\` over ranges and slices, and functions with explicit parameter and return types. Two Zig surprises live here — \`if\` and \`switch\` are *expressions* that yield values, and there is no implicit numeric truthiness (conditions must be \`bool\`). You'll also see how \`break\` and \`continue\` interact with labelled loops.

Locally, write a \`factorial\` function and a \`while\`-based Fibonacci, printing each with \`{d}\`. Then rewrite a \`while\` counter as a \`for (0..n) |i|\` range loop and confirm the output is identical.`,
    topics: [
      { label: 'Language Reference — if', url: 'https://ziglang.org/documentation/master/#if', note: 'if as an expression; payload capture for optionals/errors.' },
      { label: 'Language Reference — while', url: 'https://ziglang.org/documentation/master/#while', note: 'while with continue-expressions and else.' },
      { label: 'Language Reference — for', url: 'https://ziglang.org/documentation/master/#for', note: 'Iterating ranges, slices, and multiple sequences at once.' },
      { label: 'Language Reference — Functions', url: 'https://ziglang.org/documentation/master/#Functions', note: 'Parameters, return types, and the `void`/`noreturn` types.' },
      { label: 'zig.guide — Loops', url: 'https://zig.guide/language-basics/loops/', note: 'Loops and conditionals in current Zig.' },
    ],
    deliverable: 'A program exposing `factorial(n)` and `fib(n)` functions, printing both for n = 0..10.',
    checks: [
      {
        kind: 'code',
        id: 'zig-2-code-1',
        prompt: 'Implement `factorial` with a `while` loop so the program prints `5! = 120`.',
        boilerplate:
          'const std = @import("std");\n\nfn factorial(n: u64) u64 {\n    var result: u64 = 1;\n    var i: u64 = 2;\n    while (i <= n) {\n        result *= i;\n        i += 1;\n    }\n    return result;\n}\n\npub fn main() void {\n    std.debug.print("5! = {d}\\n", .{factorial(5)});\n}\n',
        expectedOutput: '5! = 120',
        explanation:
          'Functions declare each parameter type and the return type explicitly (`fn factorial(n: u64) u64`). The accumulator and index are `var`; the loop multiplies 2..n into `result`. You can call the function directly inside the `print` argument tuple.',
        testCases: [
          {
            input: 'std.debug.print("0! = {d}\\n", .{factorial(0)});',
            expectedOutput: '0! = 1',
            description: 'factorial(0) is the empty product, 1',
          },
        ],
      },
      {
        kind: 'code',
        id: 'zig-2-code-2',
        prompt: 'Implement recursive `fib` so the program prints `fib(10) = 55`.',
        boilerplate:
          'const std = @import("std");\n\nfn fib(n: u64) u64 {\n    if (n < 2) return n;\n    return fib(n - 1) + fib(n - 2);\n}\n\npub fn main() void {\n    std.debug.print("fib(10) = {d}\\n", .{fib(10)});\n}\n',
        expectedOutput: 'fib(10) = 55',
        explanation:
          'A guard clause `if (n < 2) return n;` handles the base cases, and the recursive case sums the two predecessors. Zig allows early `return` from any branch; there is no implicit fall-through.',
      },
      {
        kind: 'mcq',
        id: 'zig-2-mcq-1',
        prompt: `Why does this fail to compile?

\`\`\`zig
var n: i32 = 3;
if (n) {
    std.debug.print("nonzero\\n", .{});
}
\`\`\``,
        options: [
          'Integers are not allowed inside `if` at all.',
          'A condition must be `bool`; Zig has no implicit integer-to-bool coercion. Use `n != 0`.',
          '`if` requires an `else` branch.',
          '`n` must be `const` to be used in a condition.',
        ],
        correctIndex: 1,
        explanation:
          'Unlike C, a nonzero integer is *not* truthy in Zig. Conditions must already be `bool`, so you write `if (n != 0)`. This eliminates a whole class of `if (x = 0)` style bugs. See [if](https://ziglang.org/documentation/master/#if).',
      },
      {
        kind: 'mcq',
        id: 'zig-2-mcq-2',
        prompt: `What does this print?

\`\`\`zig
const x: i32 = 7;
const label = if (x % 2 == 0) "even" else "odd";
std.debug.print("{s}\\n", .{label});
\`\`\``,
        options: ['`even`', '`odd`', '`7`', 'Compile error: `if` cannot return a value.'],
        correctIndex: 1,
        explanation:
          '`if` is an expression in Zig, so both branches yield a value and the result is bound to `label`. 7 is odd, so it prints `odd`. The `{s}` placeholder formats a string slice. See [if](https://ziglang.org/documentation/master/#if).',
      },
      {
        kind: 'mcq',
        id: 'zig-2-mcq-3',
        prompt: 'In `for (0..5) |i| { ... }`, what values does `i` take?',
        options: ['1, 2, 3, 4, 5', '0, 1, 2, 3, 4', '0, 1, 2, 3, 4, 5', 'It is a compile error; `for` cannot take a range.'],
        correctIndex: 1,
        explanation:
          'The range `0..5` is half-open: it includes 0 and excludes 5, yielding 0,1,2,3,4. The captured value goes in `|i|`. Modern Zig uses this `for (range) |capture|` syntax for counting loops. See [for](https://ziglang.org/documentation/master/#for).',
      },
    ],
  },

  // ─── Level 3 ─────────────────────────────────────────────────────────────
  {
    id: 'zig-3',
    language: 'zig',
    level: 3,
    title: 'Arrays, Slices & Sentinel-Terminated Pointers',
    timeEstimate: '5-7 hours',
    intro: `Zig draws a hard line between **arrays** (fixed length known at compile time, e.g. \`[3]i32\`), **slices** (a pointer + runtime length, \`[]i32\`), and **many-item / sentinel-terminated** pointers like \`[*:0]const u8\` used for C strings. You'll learn that \`.len\` is part of the slice and that indexing is bounds-checked in safe builds. String literals are \`*const [N:0]u8\` — arrays with a 0 sentinel — which is why \`"hi".len\` is 2 but the data is null-terminated for C interop.

Locally, build a function \`sum(slice: []const i32) i32\` that loops with \`for (slice) |v|\`, then call it on an array literal. Print the length and the sum.`,
    topics: [
      { label: 'Language Reference — Arrays', url: 'https://ziglang.org/documentation/master/#Arrays', note: 'Fixed-length arrays and array literals.' },
      { label: 'Language Reference — Slices', url: 'https://ziglang.org/documentation/master/#Slices', note: 'Pointer + length; `.len`, slicing syntax `a[start..end]`.' },
      { label: 'Language Reference — Pointers', url: 'https://ziglang.org/documentation/master/#Pointers', note: 'Single-item, many-item, and sentinel-terminated pointers.' },
      { label: 'Language Reference — Sentinel-Terminated Pointers', url: 'https://ziglang.org/documentation/master/#Sentinel-Terminated-Pointers', note: 'How `[*:0]u8` interoperates with C strings.' },
      { label: 'zig.guide — Slices', url: 'https://zig.guide/language-basics/slices/', note: 'Practical slicing and array examples.' },
    ],
    deliverable: 'A `sum(slice)` and `max(slice)` over `[]const i32`, demonstrated on an array literal with bounds-safe indexing.',
    checks: [
      {
        kind: 'code',
        id: 'zig-3-code-1',
        prompt: 'The program should print `sum=10`. `sumTo` adds the integers 1..n inclusive using a loop.',
        boilerplate:
          'const std = @import("std");\n\nfn sumTo(n: i32) i32 {\n    var total: i32 = 0;\n    var i: i32 = 1;\n    while (i <= n) {\n        total += i;\n        i += 1;\n    }\n    return total;\n}\n\npub fn main() void {\n    std.debug.print("sum={d}\\n", .{sumTo(4)});\n}\n',
        expectedOutput: 'sum=10',
        explanation:
          'This stands in for an array sum within the runnable subset: it accumulates 1..n. In real Zig you would iterate a `[]const i32` slice with `for (slice) |v| total += v;` — the slice carries its own `.len`, so no separate count is passed.',
      },
      {
        kind: 'mcq',
        id: 'zig-3-mcq-1',
        prompt: 'What is the difference between `[3]i32` and `[]i32`?',
        options: [
          'Nothing — both are arrays of three `i32`.',
          '`[3]i32` is a fixed-size array (length in the type); `[]i32` is a slice (pointer + runtime length).',
          '`[3]i32` is heap-allocated; `[]i32` is stack-allocated.',
          '`[]i32` is an array of pointers to `i32`.',
        ],
        correctIndex: 1,
        explanation:
          'An array’s length is part of its type and known at compile time. A slice is a fat pointer (pointer plus `.len`) that can view part or all of an array at runtime. You get a slice from an array with `arr[0..]`. See [Slices](https://ziglang.org/documentation/master/#Slices).',
      },
      {
        kind: 'mcq',
        id: 'zig-3-mcq-2',
        prompt: `What does this print?

\`\`\`zig
const arr = [_]i32{ 10, 20, 30 };
std.debug.print("{d}\\n", .{arr.len});
\`\`\``,
        options: ['`3`', '`30`', '`0`', 'Compile error: `[_]` needs an explicit length.'],
        correctIndex: 0,
        explanation:
          '`[_]i32{...}` infers the length from the number of elements, here 3, and `.len` reports it. The `_` placeholder is the idiomatic way to let the compiler count an array literal. See [Arrays](https://ziglang.org/documentation/master/#Arrays).',
      },
      {
        kind: 'mcq',
        id: 'zig-3-mcq-3',
        prompt: 'In a safe build, what happens when you index past the end of a slice, e.g. `s[s.len]`?',
        options: [
          'It returns the zero value for the element type.',
          'It reads adjacent memory (undefined behaviour), as in C.',
          'It panics with an "index out of bounds" runtime error.',
          'It silently wraps to index 0.',
        ],
        correctIndex: 2,
        explanation:
          'Safe builds insert bounds checks; an out-of-range index panics rather than reading garbage. In ReleaseFast these checks can be omitted for speed, so the discipline of correct indices still matters. See [Slices](https://ziglang.org/documentation/master/#Slices).',
      },
      {
        kind: 'mcq',
        id: 'zig-3-mcq-4',
        prompt: 'A Zig string literal like `"hi"` has what type?',
        options: [
          '`[]u8` — a mutable byte slice.',
          '`*const [2:0]u8` — a pointer to a 2-byte array with a 0 sentinel.',
          '`[3]u8` — a 3-byte array including the terminator in `.len`.',
          '`[*c]const u8` — a C pointer.',
        ],
        correctIndex: 1,
        explanation:
          'String literals are pointers to constant, sentinel-terminated byte arrays: `"hi"` is `*const [2:0]u8`. The `.len` is 2 (the sentinel is not counted), but the trailing 0 makes it directly usable as a C string. See [Sentinel-Terminated Pointers](https://ziglang.org/documentation/master/#Sentinel-Terminated-Pointers).',
      },
    ],
  },

  // ─── Level 4 ─────────────────────────────────────────────────────────────
  {
    id: 'zig-4',
    language: 'zig',
    level: 4,
    title: 'Optionals & Null Safety',
    timeEstimate: '4-6 hours',
    intro: `Zig has no null pointers lurking in ordinary types. Instead a value that might be absent has an **optional** type \`?T\`, and you must unwrap it explicitly before use. You'll learn the three idioms: \`if (opt) |value| { ... } else { ... }\` to branch with a capture, \`orelse\` to supply a default (\`opt orelse 0\`), and \`opt.?\` to assert non-null (which panics if it is null in safe builds). Because the runnable subset here doesn't model optionals, this phase teaches them through "what does this print?" MCQs — but the concepts are the heart of Zig's safety story.

Locally, write \`fn findFirst(slice: []const i32, target: i32) ?usize\` returning the index or \`null\`, and print either the index or \`"not found"\` using \`orelse\`.`,
    topics: [
      { label: 'Language Reference — Optionals', url: 'https://ziglang.org/documentation/master/#Optionals', note: '`?T`, `orelse`, `.?`, and optional pointers.' },
      { label: 'Language Reference — if', url: 'https://ziglang.org/documentation/master/#if', note: 'Capturing the payload of an optional in an `if`.' },
      { label: 'Language Reference — null', url: 'https://ziglang.org/documentation/master/#null', note: 'The `null` literal and its type.' },
      { label: 'zig.guide — Optionals', url: 'https://zig.guide/language-basics/optionals/', note: 'Worked examples of unwrapping optionals.' },
    ],
    deliverable: 'A linear-search returning `?usize`, with callers using `orelse` and `if (x) |v|` to handle the absent case.',
    checks: [
      {
        kind: 'code',
        id: 'zig-4-code-1',
        prompt: 'This program prints `result=42`. `compute` returns a plain `i32`; run it as a baseline before studying optionals in the quizzes below.',
        boilerplate:
          'const std = @import("std");\n\nfn compute(a: i32, b: i32) i32 {\n    return a * b;\n}\n\npub fn main() void {\n    const r: i32 = compute(6, 7);\n    std.debug.print("result={d}\\n", .{r});\n}\n',
        expectedOutput: 'result=42',
        explanation:
          'A non-optional `i32` can never be null, so no unwrapping is needed. Compare this with `?i32`, which *would* require `orelse`/`if`-capture before you could do arithmetic on it — the subject of this phase’s MCQs.',
      },
      {
        kind: 'mcq',
        id: 'zig-4-mcq-1',
        prompt: `What does this print?

\`\`\`zig
const maybe: ?i32 = null;
const x = maybe orelse 99;
std.debug.print("{d}\\n", .{x});
\`\`\``,
        options: ['`0`', '`99`', '`null`', 'Compile error: cannot assign null to `?i32`.'],
        correctIndex: 1,
        explanation:
          '`orelse` supplies the value to use when the optional is null. Since `maybe` is null, `x` becomes the default `99`. If `maybe` had held a value, `orelse` would yield that value instead. See [Optionals](https://ziglang.org/documentation/master/#Optionals).',
      },
      {
        kind: 'mcq',
        id: 'zig-4-mcq-2',
        prompt: `What does this print?

\`\`\`zig
const found: ?usize = 3;
if (found) |idx| {
    std.debug.print("at {d}\\n", .{idx});
} else {
    std.debug.print("missing\\n", .{});
}
\`\`\``,
        options: ['`at 3`', '`missing`', '`at 0`', 'Compile error: `if` cannot capture from an optional.'],
        correctIndex: 0,
        explanation:
          'When an optional is non-null, `if (opt) |capture|` binds the unwrapped value to `idx` and runs the then-branch. Here `found` is 3, so it prints `at 3`. The `else` branch runs only when the optional is null. See [Optionals](https://ziglang.org/documentation/master/#Optionals).',
      },
      {
        kind: 'mcq',
        id: 'zig-4-mcq-3',
        prompt: 'In a safe build, what does `maybe.?` do when `maybe` is `null`?',
        options: [
          'Returns the zero value of the underlying type.',
          'Returns `null`.',
          'Panics at runtime ("attempt to use null value").',
          'Is a compile error regardless of the runtime value.',
        ],
        correctIndex: 2,
        explanation:
          '`.?` asserts the optional is non-null and unwraps it. If it is null at runtime, safe builds panic. Use `.?` only when you can prove it is non-null; otherwise prefer `orelse` or an `if`-capture. See [Optionals](https://ziglang.org/documentation/master/#Optionals).',
      },
      {
        kind: 'mcq',
        id: 'zig-4-mcq-4',
        prompt: 'How does Zig represent "a pointer that might be null"?',
        options: [
          'Every `*T` can be null, like C.',
          'With the optional pointer type `?*T`; a bare `*T` can never be null.',
          'By assigning the special address `0` to a `*T`.',
          'Pointers cannot be optional in Zig.',
        ],
        correctIndex: 1,
        explanation:
          'A plain `*T` is guaranteed non-null, so dereferencing it is always safe. To express possible absence you use `?*T`, which the compiler can represent with the all-zero bit pattern but still forces you to unwrap. This eliminates accidental null dereferences. See [Optionals](https://ziglang.org/documentation/master/#Optionals).',
      },
    ],
  },

  // ─── Level 5 ─────────────────────────────────────────────────────────────
  {
    id: 'zig-5',
    language: 'zig',
    level: 5,
    title: 'Error Handling — Error Unions, try, catch & errdefer',
    timeEstimate: '5-7 hours',
    intro: `Zig models recoverable failure with **error unions**: a function that can fail returns \`E!T\`, where \`E\` is an error set and \`T\` the success type. You'll learn the four moves: define errors with \`error{ OutOfRange, Empty }\`, propagate with \`try expr\` (return the error to the caller on failure), handle with \`catch\` (\`expr catch |err| ...\` or \`catch default\`), and run cleanup on the error path with \`errdefer\`. Errors are values — there are no exceptions and no hidden unwinding. The inferred error set written \`!T\` lets the compiler compute the union for you.

Locally, write \`fn parsePositive(n: i32) error{Negative}!u32\` that returns an error for negatives, then a caller using \`catch\` to print a fallback. Add an \`errdefer\` log to see when it fires.`,
    topics: [
      { label: 'Language Reference — Errors', url: 'https://ziglang.org/documentation/master/#Errors', note: 'Error sets, error unions, try, catch.' },
      { label: 'Language Reference — errdefer', url: 'https://ziglang.org/documentation/master/#errdefer', note: 'Cleanup that runs only when returning an error.' },
      { label: 'Language Reference — defer', url: 'https://ziglang.org/documentation/master/#defer', note: 'Unconditional scope-exit cleanup.' },
      { label: 'zig.guide — Errors', url: 'https://zig.guide/language-basics/errors/', note: 'Error unions and propagation in practice.' },
    ],
    deliverable: 'A `parsePositive` returning an error union, exercised by callers that use both `try` (propagate) and `catch` (handle).',
    checks: [
      {
        kind: 'code',
        id: 'zig-5-code-1',
        prompt: 'Baseline (no errors): the program prints `doubled=84`. `safeDouble` just doubles its input.',
        boilerplate:
          'const std = @import("std");\n\nfn safeDouble(n: i32) i32 {\n    return n * 2;\n}\n\npub fn main() void {\n    const d: i32 = safeDouble(42);\n    std.debug.print("doubled={d}\\n", .{d});\n}\n',
        expectedOutput: 'doubled=84',
        explanation:
          'A function that cannot fail returns a plain type. If `safeDouble` could fail it would return `error{...}!i32`, and the caller would have to `try` or `catch` it before using the value. The MCQs below explore that machinery.',
      },
      {
        kind: 'mcq',
        id: 'zig-5-mcq-1',
        prompt: 'What does `try expr` do inside a function whose return type is an error union?',
        options: [
          'Catches any error and ignores it.',
          'Evaluates `expr`; if it is an error, returns that error from the current function, otherwise yields the success value.',
          'Retries `expr` until it succeeds.',
          'Converts the error into `null`.',
        ],
        correctIndex: 1,
        explanation:
          '`try expr` is sugar for `expr catch |e| return e;`. On success it unwraps the payload; on failure it short-circuits and returns the error up the stack. The enclosing function must itself return an error union for `try` to be allowed. See [Errors](https://ziglang.org/documentation/master/#Errors).',
      },
      {
        kind: 'mcq',
        id: 'zig-5-mcq-2',
        prompt: `What does this print?

\`\`\`zig
const E = error{ Bad };
fn risky(ok: bool) E!i32 {
    if (!ok) return E.Bad;
    return 5;
}
pub fn main() void {
    const v = risky(false) catch -1;
    std.debug.print("{d}\\n", .{v});
}
\`\`\``,
        options: ['`5`', '`-1`', '`0`', 'It panics with an unhandled error.'],
        correctIndex: 1,
        explanation:
          '`risky(false)` returns `E.Bad`. The `catch -1` form supplies a fallback value when the expression is an error, so `v` becomes `-1`. With `risky(true)` it would have unwrapped to `5`. See [catch](https://ziglang.org/documentation/master/#catch).',
      },
      {
        kind: 'mcq',
        id: 'zig-5-mcq-3',
        prompt: 'When does an `errdefer cleanup();` statement run?',
        options: [
          'Always, when the scope exits (like `defer`).',
          'Only if the enclosing block returns an error after the `errdefer` was reached.',
          'Only when an error is caught with `catch`.',
          'Never — it is a no-op placeholder.',
        ],
        correctIndex: 1,
        explanation:
          '`errdefer` runs its statement only on the error-return path, making it ideal for undoing a partial resource acquisition (e.g. freeing memory you just allocated) when a later `try` fails. A plain `defer` runs unconditionally. See [errdefer](https://ziglang.org/documentation/master/#errdefer).',
      },
      {
        kind: 'mcq',
        id: 'zig-5-mcq-4',
        prompt: 'What is the meaning of the return type `!u32` (with the error set omitted)?',
        options: [
          'A boolean negation of `u32`.',
          'An error union whose error set is *inferred* by the compiler from the function body.',
          'A `u32` that is guaranteed never to fail.',
          'An optional `u32`, equivalent to `?u32`.',
        ],
        correctIndex: 1,
        explanation:
          'Writing `!u32` leaves the error set blank so the compiler infers it from every `try`/`return error` in the body. This is convenient but means the precise set is implicit; for public APIs an explicit set like `MyError!u32` documents what can go wrong. See [Errors](https://ziglang.org/documentation/master/#Errors).',
      },
    ],
  },

  // ─── Level 6 ─────────────────────────────────────────────────────────────
  {
    id: 'zig-6',
    language: 'zig',
    level: 6,
    title: 'Structs, Enums, Unions & Tagged Unions',
    timeEstimate: '5-7 hours',
    intro: `Zig's aggregate types are deliberately spare: \`struct\` groups fields (and can hold methods and default field values), \`enum\` is a set of named integer values, \`union\` overlays fields in the same memory, and a **tagged union** (\`union(enum)\`) pairs a union with an enum tag so it can be safely \`switch\`ed on. You'll learn that methods are just functions in the struct namespace called with \`instance.method()\`, that \`Self = @This()\` is the idiom for referring to the enclosing type, and that \`switch\` on a tagged union can capture each variant's payload.

Locally, define \`const Point = struct { x: i32, y: i32, fn manhattan(self: Point) i32 {...} }\`, construct one with \`.{ .x = 3, .y = 4 }\`, and print \`p.manhattan()\`.`,
    topics: [
      { label: 'Language Reference — struct', url: 'https://ziglang.org/documentation/master/#struct', note: 'Fields, methods, default values, and `@This()`.' },
      { label: 'Language Reference — enum', url: 'https://ziglang.org/documentation/master/#enum', note: 'Named integer sets and explicit tag types.' },
      { label: 'Language Reference — union', url: 'https://ziglang.org/documentation/master/#union', note: 'Bare unions and tagged `union(enum)`.' },
      { label: 'Language Reference — switch', url: 'https://ziglang.org/documentation/master/#switch', note: 'Exhaustive matching and payload capture.' },
      { label: 'zig.guide — Structs', url: 'https://zig.guide/language-basics/structs/', note: 'Worked struct and method examples.' },
    ],
    deliverable: 'A `Point` struct with a `manhattan` method and a tagged-union `Shape { circle, rect }` switched to compute area.',
    checks: [
      {
        kind: 'code',
        id: 'zig-6-code-1',
        prompt: 'Baseline: the program prints `area=20` by calling a free function `area(w, h)`. (Methods are studied in the quizzes.)',
        boilerplate:
          'const std = @import("std");\n\nfn area(w: i32, h: i32) i32 {\n    return w * h;\n}\n\npub fn main() void {\n    std.debug.print("area={d}\\n", .{area(4, 5)});\n}\n',
        expectedOutput: 'area=20',
        explanation:
          'A struct method like `fn area(self: Rect) i32` is just this function with an explicit `self` parameter, called as `r.area()`. The runnable subset keeps it as a free function; the MCQs cover struct construction and method-call sugar.',
      },
      {
        kind: 'mcq',
        id: 'zig-6-mcq-1',
        prompt: `Given this struct, what does \`main\` print?

\`\`\`zig
const Point = struct {
    x: i32,
    y: i32,
    fn sum(self: Point) i32 {
        return self.x + self.y;
    }
};
pub fn main() void {
    const p = Point{ .x = 3, .y = 4 };
    std.debug.print("{d}\\n", .{p.sum()});
}
\`\`\``,
        options: ['`7`', '`12`', '`34`', 'Compile error: structs cannot contain functions.'],
        correctIndex: 0,
        explanation:
          'Fields are initialised with `.field = value` syntax. `p.sum()` is sugar for `Point.sum(p)`, passing `p` as `self`, so it returns 3 + 4 = 7. Methods live in the struct’s namespace. See [struct](https://ziglang.org/documentation/master/#struct).',
      },
      {
        kind: 'mcq',
        id: 'zig-6-mcq-2',
        prompt: 'What distinguishes a `union(enum)` (tagged union) from a bare `union`?',
        options: [
          'A tagged union stores all fields simultaneously.',
          'A tagged union carries an enum tag identifying the active field, so it can be safely `switch`ed; a bare union has no tag.',
          'A bare union is always larger in memory.',
          'There is no difference; the syntax is interchangeable.',
        ],
        correctIndex: 1,
        explanation:
          'A bare `union` overlays its fields and you must track which is active yourself (accessing the wrong one is illegal behaviour). A `union(enum)` adds an automatic tag, enabling exhaustive `switch` with payload capture and safety checks. See [union](https://ziglang.org/documentation/master/#union).',
      },
      {
        kind: 'mcq',
        id: 'zig-6-mcq-3',
        prompt: `What does this print?

\`\`\`zig
const Color = enum { red, green, blue };
pub fn main() void {
    const c = Color.green;
    std.debug.print("{d}\\n", .{@intFromEnum(c)});
}
\`\`\``,
        options: ['`0`', '`1`', '`2`', '`green`'],
        correctIndex: 1,
        explanation:
          'Enum members are numbered from 0 in declaration order unless you assign explicit values, so `red=0, green=1, blue=2`. `@intFromEnum` returns the underlying integer, here 1. To print the name you would use the `{s}` formatter with `@tagName`. See [enum](https://ziglang.org/documentation/master/#enum).',
      },
      {
        kind: 'mcq',
        id: 'zig-6-mcq-4',
        prompt: 'What does `@This()` evaluate to inside a `struct` body?',
        options: [
          'A pointer to the current instance (like `this` in C++).',
          'The type of the innermost enclosing container (the struct/enum/union itself).',
          'The name of the current function as a string.',
          'The parent module.',
        ],
        correctIndex: 1,
        explanation:
          '`@This()` returns the *type* of the enclosing container, letting you write `const Self = @This();` and refer to the struct type before it is fully named (useful for generic or anonymous types). It is not an instance pointer. See [@This](https://ziglang.org/documentation/master/#This).',
      },
    ],
  },

  // ─── Level 7 ─────────────────────────────────────────────────────────────
  {
    id: 'zig-7',
    language: 'zig',
    level: 7,
    title: 'comptime & Generics',
    timeEstimate: '6-8 hours',
    intro: `Zig has no separate macro or template language — instead, ordinary code can run at **compile time**. \`comptime\` parameters and blocks let the compiler execute Zig during compilation, and because **types are first-class comptime values**, generics are just functions that take a \`comptime T: type\` and return a type or a value. You'll learn \`comptime\` expressions, the \`anytype\` parameter, how \`std.ArrayList(T)\` is "a function that returns a struct type", and how \`comptime\`-known values drive \`inline\` loops and array sizes. This is Zig's superpower and its steepest concept.

Locally, write a generic \`fn add(comptime T: type, a: T, b: T) T\`, then call it with \`add(i32, 2, 3)\` and \`add(f64, 1.5, 2.0)\` and print both.`,
    topics: [
      { label: 'Language Reference — comptime', url: 'https://ziglang.org/documentation/master/#comptime', note: 'Compile-time evaluation of ordinary Zig code.' },
      { label: 'Language Reference — Generic Data Structures', url: 'https://ziglang.org/documentation/master/#Generic-Data-Structures', note: 'Types as comptime values; functions that return types.' },
      { label: 'Language Reference — type', url: 'https://ziglang.org/documentation/master/#type', note: 'The `type` type and reflection with `@typeInfo`.' },
      { label: 'zig.guide — comptime', url: 'https://zig.guide/language-basics/comptime/', note: 'comptime parameters, blocks, and generics.' },
    ],
    deliverable: 'A generic `add(comptime T, a, b)` plus a `Stack(comptime T)` type-returning function, exercised with two element types.',
    checks: [
      {
        kind: 'code',
        id: 'zig-7-code-1',
        prompt: 'Baseline: this monomorphic `addI32` prints `7`. (Generics over `comptime T` are explored in the quizzes.)',
        boilerplate:
          'const std = @import("std");\n\nfn addI32(a: i32, b: i32) i32 {\n    return a + b;\n}\n\npub fn main() void {\n    std.debug.print("{d}\\n", .{addI32(3, 4)});\n}\n',
        expectedOutput: '7',
        explanation:
          'A generic version would be `fn add(comptime T: type, a: T, b: T) T`, instantiated once per type you call it with. The runnable subset uses a concrete `i32` version; the comptime/generic mechanics are covered in the MCQs.',
      },
      {
        kind: 'mcq',
        id: 'zig-7-mcq-1',
        prompt: 'In Zig, how is a generic function over a type usually written?',
        options: [
          'With angle-bracket type parameters, e.g. `fn add<T>(a: T, b: T) T`.',
          'With a `comptime T: type` parameter, e.g. `fn add(comptime T: type, a: T, b: T) T`.',
          'With a runtime `type` argument passed like any other value.',
          'Generics are not supported; you must duplicate the function per type.',
        ],
        correctIndex: 1,
        explanation:
          'Types are comptime-known values of type `type`, so a generic is a normal function taking a `comptime T: type`. The compiler specialises (monomorphises) the function for each `T` you call it with. There are no angle brackets. See [Generic Data Structures](https://ziglang.org/documentation/master/#Generic-Data-Structures).',
      },
      {
        kind: 'mcq',
        id: 'zig-7-mcq-2',
        prompt: `What does this print?

\`\`\`zig
fn square(x: i32) i32 {
    return x * x;
}
pub fn main() void {
    const n = comptime square(5);
    std.debug.print("{d}\\n", .{n});
}
\`\`\``,
        options: [
          '`25`, computed during compilation.',
          '`10`.',
          'Nothing — `comptime` suppresses output.',
          'Compile error: functions cannot run at comptime.',
        ],
        correctIndex: 0,
        explanation:
          '`comptime square(5)` forces the call to be evaluated by the compiler, folding `n` to the constant 25 baked into the binary. Any ordinary Zig function whose inputs are comptime-known can run at compile time. See [comptime](https://ziglang.org/documentation/master/#comptime).',
      },
      {
        kind: 'mcq',
        id: 'zig-7-mcq-3',
        prompt: 'What does the expression `std.ArrayList(u8)` represent?',
        options: [
          'An instance of an array list of bytes.',
          'A *type* produced by calling a function that takes the element type `u8` at comptime and returns a struct type.',
          'A compile error — `ArrayList` is not a function.',
          'A pointer to a heap-allocated list.',
        ],
        correctIndex: 1,
        explanation:
          '`ArrayList` is a function from `type` to `type`: `ArrayList(u8)` evaluates at comptime to a concrete struct type, which you then instantiate. This "functions that return types" pattern is how Zig does generics for data structures. See [Generic Data Structures](https://ziglang.org/documentation/master/#Generic-Data-Structures).',
      },
      {
        kind: 'mcq',
        id: 'zig-7-mcq-4',
        prompt: 'What is the role of an `anytype` parameter?',
        options: [
          'It accepts any value and boxes it dynamically at runtime.',
          'It is an inferred comptime-duck-typed parameter: the compiler specialises the function for whatever concrete type is passed.',
          'It disables type checking for that argument.',
          'It is shorthand for `?*anyopaque`.',
        ],
        correctIndex: 1,
        explanation:
          '`anytype` lets the compiler infer the parameter’s type at each call site and generate a specialised version, with errors reported only if the body uses an operation the type does not support (compile-time duck typing). There is no runtime boxing. See [comptime](https://ziglang.org/documentation/master/#comptime).',
      },
    ],
  },

  // ─── Level 8 ─────────────────────────────────────────────────────────────
  {
    id: 'zig-8',
    language: 'zig',
    level: 8,
    title: 'Allocators & Manual Memory Management',
    timeEstimate: '6-8 hours',
    intro: `Zig has no garbage collector and no hidden allocations — instead, any code that needs heap memory takes an \`std.mem.Allocator\` parameter explicitly. You'll learn the standard pattern: \`const x = try allocator.alloc(T, n);\` paired with \`defer allocator.free(x);\`, and the major allocators — \`std.heap.GeneralPurposeAllocator\` (detects leaks/double-frees in debug), \`ArenaAllocator\` (free everything at once), \`FixedBufferAllocator\` (no heap at all), and \`std.testing.allocator\` (fails tests on leaks). Because allocators can't run in the print-based subset, this phase teaches the patterns through MCQs — but "pass the allocator in" is the single most important Zig API convention.

Locally, set up a \`GeneralPurposeAllocator\`, allocate a \`[]u8\`, write to it, and \`defer\` both the free and \`gpa.deinit()\`. Run it and confirm the leak detector reports clean.`,
    topics: [
      { label: 'Language Reference — Memory', url: 'https://ziglang.org/documentation/master/#Memory', note: 'Why Zig has no implicit allocations; the allocator parameter convention.' },
      { label: 'std.mem.Allocator', url: 'https://ziglang.org/documentation/master/std/#std.mem.Allocator', note: 'The allocator interface: alloc, free, create, destroy.' },
      { label: 'std.heap', url: 'https://ziglang.org/documentation/master/std/#std.heap', note: 'GeneralPurposeAllocator, ArenaAllocator, FixedBufferAllocator, page_allocator.' },
      { label: 'zig.guide — Allocators', url: 'https://zig.guide/standard-library/allocators/', note: 'Choosing and using allocators with worked examples.' },
    ],
    deliverable: 'A program that allocates and frees a buffer via GeneralPurposeAllocator with `defer`, plus an arena example freeing in bulk.',
    checks: [
      {
        kind: 'code',
        id: 'zig-8-code-1',
        prompt: 'Baseline: this stack-only program prints `len=5` — no allocator needed because the value is fixed and stack-resident.',
        boilerplate:
          'const std = @import("std");\n\nfn lengthOf(n: usize) usize {\n    return n;\n}\n\npub fn main() void {\n    const len: usize = lengthOf(5);\n    std.debug.print("len={d}\\n", .{len});\n}\n',
        expectedOutput: 'len=5',
        explanation:
          'Fixed-size, stack-allocated data needs no allocator. The moment you need a runtime-sized buffer you call `allocator.alloc(u8, n)` and pair it with `defer allocator.free(buf)` — the convention the MCQs drill.',
      },
      {
        kind: 'mcq',
        id: 'zig-8-mcq-1',
        prompt: 'How does a Zig function signal that it needs to allocate heap memory?',
        options: [
          'It calls a global `malloc`-style function implicitly.',
          'It takes an `std.mem.Allocator` parameter that the caller provides.',
          'It uses the `new` keyword.',
          'It cannot allocate; all memory is stack-based.',
        ],
        correctIndex: 1,
        explanation:
          'There is no hidden global allocator. Any function that may allocate accepts an `std.mem.Allocator`, so callers control the allocation strategy (general-purpose, arena, fixed buffer, testing). This makes allocation visible and swappable. See [Memory](https://ziglang.org/documentation/master/#Memory).',
      },
      {
        kind: 'mcq',
        id: 'zig-8-mcq-2',
        prompt: 'What is the idiomatic way to ensure allocated memory is released?',
        options: [
          'A finalizer that the GC calls eventually.',
          '`defer allocator.free(buf);` immediately after a successful `alloc`.',
          'Reference counting built into every slice.',
          'Calling `delete buf;`.',
        ],
        correctIndex: 1,
        explanation:
          'Pairing `alloc` with a `defer free` on the next line guarantees the buffer is freed when the scope exits, regardless of which `return`/`try` path is taken. For partial-construction cleanup on the error path, you use `errdefer`. See [std.mem.Allocator](https://ziglang.org/documentation/master/std/#std.mem.Allocator).',
      },
      {
        kind: 'mcq',
        id: 'zig-8-mcq-3',
        prompt: 'What is the main advantage of an `ArenaAllocator`?',
        options: [
          'It is the fastest possible allocator for single small objects.',
          'You can free everything it allocated in one `deinit()` call, instead of freeing each allocation individually.',
          'It automatically detects use-after-free at runtime.',
          'It guarantees thread-safe allocation without locks.',
        ],
        correctIndex: 1,
        explanation:
          'An arena groups many allocations under one lifetime: you allocate freely and then release them all at once with `arena.deinit()`. This is ideal for request-scoped or phase-scoped work where individual frees would be tedious and error-prone. See [std.heap](https://ziglang.org/documentation/master/std/#std.heap).',
      },
      {
        kind: 'mcq',
        id: 'zig-8-mcq-4',
        prompt: 'What does `std.heap.GeneralPurposeAllocator` do in a Debug build that a bare allocator does not?',
        options: [
          'It runs a background garbage collector.',
          'It detects memory leaks, double-frees, and some use-after-free bugs, reporting them when you `deinit()`.',
          'It compresses allocations to save space.',
          'It disables bounds checking for speed.',
        ],
        correctIndex: 1,
        explanation:
          'The GeneralPurposeAllocator includes safety tooling in Debug: on `deinit()` it reports leaks, and it catches double-free and certain use-after-free patterns. This is why it is the recommended default during development. See [std.heap](https://ziglang.org/documentation/master/std/#std.heap).',
      },
    ],
  },

  // ─── Level 9 ─────────────────────────────────────────────────────────────
  {
    id: 'zig-9',
    language: 'zig',
    level: 9,
    title: 'The Build System, Testing & C Interop',
    timeEstimate: '6-8 hours',
    intro: `Zig is also a build system and a C/C++ toolchain. You'll learn the \`build.zig\` script (a normal Zig program that constructs a build graph via \`std.Build\`), the built-in test runner (\`test "name" { ... }\` blocks run with \`zig build test\`, using \`std.testing.expect\`/\`expectEqual\` and the leak-checking \`std.testing.allocator\`), and Zig's first-class C interop: \`@cImport\` to pull in C headers, \`zig cc\` as a drop-in C compiler, and seamless cross-compilation with \`-target\`. These are taught via MCQ since they don't fit the print-only runner.

Locally, scaffold a project with \`zig init\`, add a \`test "adds"\` block, and run \`zig build test\`. Then try \`zig cc hello.c -o hello\` to use Zig as your C compiler.`,
    topics: [
      { label: 'Build System', url: 'https://ziglang.org/learn/build-system/', note: 'Official guide to build.zig and std.Build.' },
      { label: 'Language Reference — Zig Test', url: 'https://ziglang.org/documentation/master/#Zig-Test', note: '`test` blocks and `zig test` / `zig build test`.' },
      { label: 'std.testing', url: 'https://ziglang.org/documentation/master/std/#std.testing', note: 'expect, expectEqual, expectError, and testing.allocator.' },
      { label: 'Language Reference — Import from C Header File', url: 'https://ziglang.org/documentation/master/#Import-from-C-Header-File', note: 'Importing and calling C from Zig with @cImport.' },
      { label: 'zig.guide — Zig Build', url: 'https://zig.guide/build-system/zig-build/', note: 'Hands-on build.zig walkthrough.' },
    ],
    deliverable: 'A `zig init` project with a passing `test` block plus a build step that links a small C source via @cImport or addCSourceFile.',
    checks: [
      {
        kind: 'code',
        id: 'zig-9-code-1',
        prompt: 'Baseline: this `add` function prints `add(2,3)=5`. In a real project you would assert this inside a `test` block — see the quizzes.',
        boilerplate:
          'const std = @import("std");\n\nfn add(a: i32, b: i32) i32 {\n    return a + b;\n}\n\npub fn main() void {\n    std.debug.print("add(2,3)={d}\\n", .{add(2, 3)});\n}\n',
        expectedOutput: 'add(2,3)=5',
        explanation:
          'The same `add` would be verified by `test "add" { try std.testing.expectEqual(@as(i32, 5), add(2, 3)); }`. Tests live alongside code and run with `zig build test`; the runner reports pass/fail and (with `testing.allocator`) any leaks.',
        testCases: [
          {
            input: 'std.debug.print("add(10,32)={d}\\n", .{add(10, 32)});',
            expectedOutput: 'add(10,32)=42',
            description: 'add works for larger operands',
          },
        ],
      },
      {
        kind: 'mcq',
        id: 'zig-9-mcq-1',
        prompt: 'What is `build.zig`?',
        options: [
          'A static configuration file in TOML format.',
          'A normal Zig program that constructs a build graph using `std.Build`, run by `zig build`.',
          'A Makefile generated by the compiler.',
          'A list of shell commands executed in order.',
        ],
        correctIndex: 1,
        explanation:
          '`build.zig` is ordinary Zig code: its `pub fn build(b: *std.Build) void` function declares artifacts, steps, and dependencies as a graph that `zig build` then executes. There is no separate build DSL. See the [Build System guide](https://ziglang.org/learn/build-system/).',
      },
      {
        kind: 'mcq',
        id: 'zig-9-mcq-2',
        prompt: 'How do you write and run unit tests in Zig?',
        options: [
          'Create a separate test framework dependency and a `tests/` folder.',
          'Write `test "name" { ... }` blocks in the source and run `zig test file.zig` or `zig build test`.',
          'Annotate functions with `@test` and run `zig check`.',
          'Tests must be written in C and linked in.',
        ],
        correctIndex: 1,
        explanation:
          'Testing is built in: top-level `test "..." { ... }` blocks use `std.testing` assertions and are executed by the bundled test runner. Using `std.testing.allocator` inside a test also fails it on a memory leak. See [Zig Test](https://ziglang.org/documentation/master/#Zig-Test).',
      },
      {
        kind: 'mcq',
        id: 'zig-9-mcq-3',
        prompt: 'What does `@cImport` enable?',
        options: [
          'Importing another Zig module.',
          'Translating and importing C declarations from header files so you can call C functions and use C types directly.',
          'Embedding inline assembly.',
          'Importing a precompiled `.o` object file.',
        ],
        correctIndex: 1,
        explanation:
          '`@cImport({ @cInclude("stdio.h"); })` runs Zig’s C translator on the headers and exposes the declarations as a Zig namespace, so you can call e.g. `c.printf(...)`. Combined with `zig cc` and cross-compilation, Zig is a complete C toolchain. See [Import from C Header File](https://ziglang.org/documentation/master/#Import-from-C-Header-File).',
      },
      {
        kind: 'mcq',
        id: 'zig-9-mcq-4',
        prompt: 'Which command uses Zig as a drop-in C compiler?',
        options: ['`zig build-c hello.c`', '`zig cc hello.c -o hello`', '`zig compile hello.c`', '`zig gcc hello.c`'],
        correctIndex: 1,
        explanation:
          '`zig cc` is a Clang-compatible C/C++ frontend bundled with Zig, complete with built-in cross-compilation (`-target`). Many projects adopt `zig cc` purely as a hassle-free cross-compiler even without writing Zig. See the [Build System guide](https://ziglang.org/learn/build-system/).',
      },
    ],
  },

  // ─── Level 10 ────────────────────────────────────────────────────────────
  {
    id: 'zig-10',
    language: 'zig',
    level: 10,
    title: 'Packed Structs, SIMD, Performance & async Status',
    timeEstimate: '6-8 hours',
    intro: `The capstone covers low-level control and performance. You'll learn **packed structs** (\`packed struct\` with bit-precise field layout, e.g. \`u3\`/\`u5\` fields, for protocols and registers), **SIMD via vectors** (\`@Vector(4, f32)\` with element-wise operators and \`@reduce\`), the **build modes** (\`Debug\`, \`ReleaseSafe\`, \`ReleaseFast\`, \`ReleaseSmall\`) and what safety checks each keeps, and the current status of **async/await** (the syntax was removed pending a redesign — modern Zig concurrency uses threads and event loops; track the proposals). These are taught through MCQs.

Locally, define a \`packed struct\` for an RGBA pixel summing to 32 bits, compute a dot product with \`@Vector(4, f32)\` and \`@reduce(.Add, ...)\`, and rebuild with \`-Doptimize=ReleaseFast\` to compare behaviour of safety checks.`,
    topics: [
      { label: 'Language Reference — packed struct', url: 'https://ziglang.org/documentation/master/#packed-struct', note: 'Bit-level layout with backing integers.' },
      { label: 'Language Reference — Vectors', url: 'https://ziglang.org/documentation/master/#Vectors', note: '`@Vector`, element-wise ops, and `@reduce` (SIMD).' },
      { label: 'Language Reference — Build Mode', url: 'https://ziglang.org/documentation/master/#Build-Mode', note: 'Debug, ReleaseSafe, ReleaseFast, ReleaseSmall and their checks.' },
      { label: 'std.Thread', url: 'https://ziglang.org/documentation/master/std/#std.Thread', note: 'Threads — the supported concurrency primitive today.' },
      { label: 'zig.guide — Vectors', url: 'https://zig.guide/language-basics/vectors/', note: 'SIMD vector examples in current Zig.' },
    ],
    deliverable: 'A bit-packed pixel `packed struct`, a SIMD dot-product with @Vector/@reduce, and notes comparing ReleaseSafe vs ReleaseFast behaviour.',
    checks: [
      {
        kind: 'code',
        id: 'zig-10-code-1',
        prompt: 'Baseline: compute a scalar 4-element dot product so the program prints `dot=70`. (The SIMD `@Vector` form is covered in the quizzes.)',
        boilerplate:
          'const std = @import("std");\n\nfn dot4(a0: i32, a1: i32, a2: i32, a3: i32, b0: i32, b1: i32, b2: i32, b3: i32) i32 {\n    return a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3;\n}\n\npub fn main() void {\n    const d: i32 = dot4(1, 2, 3, 4, 5, 6, 7, 8);\n    std.debug.print("dot={d}\\n", .{d});\n}\n',
        expectedOutput: 'dot=70',
        explanation:
          '1*5 + 2*6 + 3*7 + 4*8 = 5 + 12 + 21 + 32 = 70. The SIMD form `@reduce(.Add, va * vb)` over two `@Vector(4, i32)` values computes exactly this in one element-wise multiply plus a horizontal add — the subject of the next quiz.',
      },
      {
        kind: 'mcq',
        id: 'zig-10-mcq-1',
        prompt: 'What is special about a `packed struct`?',
        options: [
          'Its fields are stored on the heap.',
          'It has guaranteed, gapless bit-level layout backed by an integer, so fields like `u3`/`u5` pack tightly — ideal for protocol headers and hardware registers.',
          'It cannot contain integer fields.',
          'It is automatically thread-safe.',
        ],
        correctIndex: 1,
        explanation:
          'A `packed struct` lays out its fields with no padding, in a well-defined order backed by an integer of the total bit width, so you can mix sub-byte fields (`u1`, `u3`, ...) for wire formats and MMIO. An ordinary `struct` makes no such layout guarantee. See [packed struct](https://ziglang.org/documentation/master/#packed-struct).',
      },
      {
        kind: 'mcq',
        id: 'zig-10-mcq-2',
        prompt: `What does this print?

\`\`\`zig
const v: @Vector(4, i32) = .{ 1, 2, 3, 4 };
const total = @reduce(.Add, v);
std.debug.print("{d}\\n", .{total});
\`\`\``,
        options: ['`10`', '`4`', '`24`', 'Compile error: vectors cannot be reduced.'],
        correctIndex: 0,
        explanation:
          '`@Vector(4, i32)` is a SIMD vector; arithmetic on it is element-wise, and `@reduce(.Add, v)` horizontally sums the lanes: 1+2+3+4 = 10. The compiler maps these onto hardware SIMD instructions where available. See [Vectors](https://ziglang.org/documentation/master/#Vectors).',
      },
      {
        kind: 'mcq',
        id: 'zig-10-mcq-3',
        prompt: 'How do `ReleaseSafe` and `ReleaseFast` differ?',
        options: [
          'They are identical; the names are aliases.',
          '`ReleaseSafe` keeps runtime safety checks (overflow, bounds, etc.) while optimising; `ReleaseFast` drops those checks for maximum speed.',
          '`ReleaseFast` keeps debug symbols; `ReleaseSafe` strips them.',
          '`ReleaseSafe` disables optimisation entirely.',
        ],
        correctIndex: 1,
        explanation:
          'Both optimise, but `ReleaseSafe` retains the safety checks (so overflow or out-of-bounds still panics) while `ReleaseFast` removes them, turning those situations into undefined behaviour in exchange for speed. `ReleaseSmall` optimises for size. See [Build Mode](https://ziglang.org/documentation/master/#Build-Mode).',
      },
      {
        kind: 'mcq',
        id: 'zig-10-mcq-4',
        prompt: 'What is the current status of `async`/`await` in mainstream Zig (0.13+)?',
        options: [
          'It is stable and the recommended way to do all I/O.',
          '`async`/`await` is not usable in the mainstream self-hosted compiler; it was shelved pending a redesign of the I/O and async model, so current concurrency uses threads (`std.Thread`) and event loops.',
          'Zig never had any async support.',
          'It works only on the WebAssembly target.',
        ],
        correctIndex: 1,
        explanation:
          'Zig once had stackless coroutine `async`/`await` in the old bootstrap compiler, but it was disabled when the self-hosted compiler became the default and is unusable while the I/O and async model is being redesigned. For now, concurrency is done with `std.Thread` and event loops; follow the official proposals for the future direction. Async is the most version-fragile topic in this course, so always cross-check the release notes for the version you run. See [std.Thread](https://ziglang.org/documentation/master/std/#std.Thread).',
      },
    ],
  },
];
