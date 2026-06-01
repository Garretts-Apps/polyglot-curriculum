import type { Phase } from './types';

export const rustPhases: Phase[] = [
  // ─── L0: Setup & Hello World ────────────────────────────────────────────────
  {
    id: 'rust-0',
    language: 'rust',
    level: 0,
    title: 'Setup & Hello World',
    timeEstimate: '0.5-1 hours',
    intro: `Welcome to Rust! If you've never written a single line of code in your life, this is exactly where you should start. We will not skip anything. By the end you'll have \`rustc\` (the Rust compiler) working on your machine, and you'll have run your very first program.\n\nA *program* is just a list of written instructions for the computer to follow, top to bottom. Here is the whole first program — every Rust program you ever write starts looking something like this:\n\n\`\`\`rust\nfn main() {\n    println!("Hello, World!");\n}\n\`\`\`\n\nThat is five tiny pieces of punctuation and three words, and it can look like noise the first time you see it. So let's read it the way the computer does — left to right, one token at a time. (A *token* is just one indivisible piece of the text: a word, a symbol, a bracket.) For each one we'll ask four questions: **What does it mean? Why is it here? What breaks if I remove it? What is actually in the computer's memory when it runs?**\n\n\`\`\`\nfn  main  ()  {        println!  ( "Hello, World!" )  ;        }\n│    │    │   │            │      │       │         │  │        │\n│    │    │   │            │      │       └ the text └ ends     └ end of\n│    │    │   │            │      └ hands text to     statement   the body\n│    │    │   │            └ a printing macro         the macro\n│    │    │   └ start of the function's body (its instructions)\n│    │    └ parentheses: where inputs go (here: none)\n│    └ the name of this function: "main"\n└ the keyword that says "I am declaring a function"\n\`\`\`\n\n**\`fn\`** — short for "function". A *function* is a named, reusable action: a labeled box of instructions. \`fn\` is a *keyword* (a word Rust reserves for itself) that announces "what follows is a function definition." *Why here:* every function in Rust must begin with \`fn\` so the compiler knows your intent. *Remove it* and the compiler sees a bare word \`main\` and gives up with an error like "expected \`!\` or \`::\`" — it no longer knows you meant to define a function. *In memory:* \`fn\` itself holds no value; it's an instruction to the compiler, gone by the time the program runs.\n\n**\`main\`** — the *name* of this function. The name \`main\` is special: it is the **entry point**, the one function the program automatically starts running first. Think of it as the front door. *Why here:* the system needs to know where to begin; it always begins at \`main\`. *Remove/rename it* (say to \`start\`) and you get a "main function not found" error — the program has no front door, so it can't launch. *In memory:* the name is a label for a chunk of machine instructions; at runtime the computer jumps to that chunk to begin.\n\n**\`()\`** — a pair of *parentheses*. This is where *inputs* (called arguments) would be listed — extra information handed to the function. Here they're empty, meaning "\`main\` takes no inputs." *Why here:* every function declaration needs this slot, even when it's empty, so Rust can tell a function from an ordinary name. *Remove them* and it's no longer a valid function declaration — compile error. *In memory:* nothing — empty parentheses pass no values.\n\n**\`{ }\`** — *curly braces*. They open and close the function's **body**: everything between them is the list of instructions \`main\` runs, in order, when called. Think of them as the lid of the box. *Why here:* they mark exactly where the function's instructions start and stop. *Remove them* and Rust can't tell which lines belong to the function — compile error. *In memory:* the braces are structure for the compiler; they hold no value themselves.\n\n**\`println!\`** — the action that prints a line of text to the screen (the terminal), then moves to a new line ("print-line"). The trailing **\`!\`** matters: it means \`println!\` is a **macro**, not a plain function. A *macro* is code that writes code — before your program is compiled, Rust expands \`println!\` into the longer set of real instructions needed to format and print text. You don't need to understand how that expansion works yet; just read the \`!\` as "this is a built-in printing tool." *Why here:* it's what actually produces visible output. *Remove it* and the text never reaches the screen. *In memory at runtime:* it causes the characters of your text to be written out to the terminal's output stream.\n\n**\`("Hello, World!")\`** — the parentheses after \`println!\` hand it the thing to print. Inside, **\`"Hello, World!"\`** is a *string*: the double quotes \`"\` mark the start and end of a piece of literal text. Everything between the quotes is printed exactly as written. *Why here:* it's the message you chose. *Change it* and you print something else; *remove the quotes* and Rust tries to read \`Hello, World!\` as code (names and commands) and errors. *In memory at runtime:* the 13 characters \`H e l l o ,  ␣ W o r l d !\` sit in memory as text, and \`println!\` copies them to the screen.\n\n**\`;\`** — a *semicolon*. It marks the **end of a statement** (one complete instruction), like a period ending a sentence. *Why here:* it tells Rust "this instruction is finished; the next one can begin." *Remove it* and Rust thinks the instruction continues onto the next line and reports an error. *In memory:* nothing — it's punctuation for the compiler.\n\nPut together: "Define a function named \`main\` (the program's starting point) that takes no inputs; its body runs one instruction — use the \`println!\` macro to print the text \`Hello, World!\` to the screen." That's the entire program. Now let's run it.`,
    topics: [
      {
        label: 'Install Rust',
        url: 'https://www.rust-lang.org/tools/install',
        note: 'Official rustup installer for all platforms',
      },
      {
        label: 'Rust Playground',
        url: 'https://play.rust-lang.org/',
        note: 'Run Rust code in the browser — no install needed',
      },
    ],
    deliverable:
      'Verify rustc --version in your command line and run a print statement in the browser console.',
    checks: [
      {
        id: 'rust-0-code-1',
        kind: 'code',
        prompt: 'Run the program below so it prints exactly `Hello, World!` to standard output.',
        boilerplate: 'fn main() {\n    println!("Hello, World!");\n}\n',
        expectedOutput: 'Hello, World!',
        explanation:
          'Reading it token by token: `fn` declares a function (a named action); `main` is the special name of the program\'s entry point — the function that runs first; the empty `()` is the slot for inputs (here there are none); the `{ }` braces hold the function\'s body, its list of instructions. Inside, `println!` is a macro (the `!` marks it as a macro — code that expands into the real printing instructions — not a plain function) that prints a line of text. The `"Hello, World!"` in double quotes is a string: the literal text to print, exactly as written. The `;` ends the statement, like a period ending a sentence. At runtime the 13 characters of "Hello, World!" sit in memory as text and `println!` copies them to standard output, then adds a newline. This is the simplest Rust program you can write.',
      },
      {
        id: 'rust-0-mcq-1',
        kind: 'mcq',
        prompt: 'What macro is used to print text to standard output in Rust?',
        options: ['println!', 'print()', 'echo()', 'console.log()'],
        correctIndex: 0,
        explanation:
          '`println!` is a Rust macro (note the trailing `!`) that prints a line to standard output.',
      },
      {
        id: 'rust-0-mcq-2',
        kind: 'mcq',
        prompt: 'What is the standard file extension for Rust source files?',
        options: ['.rs', '.rust', '.rt', '.r'],
        correctIndex: 0,
        explanation:
          'Rust source files use the `.rs` extension by convention.',
      },
    ],
  },
  // ─── L1: Hello Cargo ────────────────────────────────────────────────────────
  {
    id: 'rust-1',
    language: 'rust',
    level: 1,
    title: 'Hello Cargo',
    timeEstimate: '4-6 hours',
    intro: `Before we touch any tools, let's nail down four words you'll use in every program from now on. We'll define each one *before* using it, assuming you've never programmed.\n\n**Value.** A *value* is a single piece of data the computer can hold: the number \`5\`, the text \`"hello"\`, the answer \`true\`. That's it — a value is just a "thing" the program works with.\n\n**Type.** A *type* is the *kind* of a value — it tells Rust how to store and use it. \`5\` is a whole number (Rust calls one common whole-number type \`i32\`, a 32-bit signed integer); \`"hello"\` is text (a string); \`true\` is a yes/no value (\`bool\`). The type matters because you can add two numbers but you can't sensibly add a number to a yes/no answer — Rust uses types to catch mistakes like that *before* the program runs.\n\n**Variable.** A *variable* is a *name* you attach to a value so you can refer to it later, like labeling a jar. You create one with the keyword \`let\`:\n\n\`\`\`rust\nlet x = 5;\n\`\`\`\n\nRead this as "let the name \`x\` stand for the value \`5\`." After this line, writing \`x\` means \`5\`. Here's a Rust surprise that trips up newcomers from other languages: **in Rust, variables are immutable by default** — once \`x\` is set to \`5\`, you are *not* allowed to change it to something else. Try \`x = 6;\` afterward and the compiler refuses. This is deliberate: code that can't change underneath you is easier to reason about. When you genuinely need a value you can change, you opt in with \`mut\` (short for "mutable" = changeable):\n\n\`\`\`rust\nlet mut count = 0;  // this one CAN change\ncount = count + 1;  // now count is 1 — allowed because of mut\n\`\`\`\n\nSo \`let x = 5;\` makes a fixed binding, and \`let mut x = 5;\` makes a changeable one. (Note: the value's type — like \`i32\` — is usually figured out by Rust automatically, so you rarely write it; but you can: \`let x: i32 = 5;\`.)\n\n**Function.** A *function* is a named, reusable block of instructions — you met \`fn main()\` in Level 0. Functions can take *inputs* (listed in the parentheses) and hand back a *result*. For example:\n\n\`\`\`rust\nfn double(n: i32) -> i32 {\n    n * 2\n}\n\`\`\`\n\nHere \`double\` takes one input \`n\` of type \`i32\`, and the \`-> i32\` says "it gives back an \`i32\`." Calling \`double(4)\` produces the value \`8\`.\n\n**Statement vs expression.** This distinction is central to Rust, so meet it now. An *expression* is anything that *produces a value*: \`5\`, \`2 + 3\`, \`double(4)\` are all expressions (they evaluate to \`5\`, \`5\`, and \`8\`). A *statement* is a complete instruction that *does* something but does not itself produce a value to hand back — for example \`let x = 5;\` is a statement. Here is the key Rust rule: **the last expression in a function's body, written WITHOUT a trailing semicolon, becomes the function's return value.** That's why \`double\` above ends with \`n * 2\` and no semicolon — that bare expression *is* the result. Add a semicolon (\`n * 2;\`) and you turn it into a statement that throws the value away, so the function would return \`()\` (the "unit" type — Rust's "nothing useful" value) instead, and the compiler would complain that it expected an \`i32\`. Watch the semicolons; in Rust they decide whether a value escapes a block or is discarded.\n\nWith those four concepts in hand, the goal of this phase: you'll read short Rust programs and predict what the compiler will say — missing semicolons that turn an expression into a unit return, \`let\` vs \`let mut\`, shadowing (re-declaring a name with a fresh \`let\`) vs mutation, and the difference between expression-bodied and statement-bodied functions. The tooling is your terminal: \`rustup\` for toolchains, \`cargo new\` / \`cargo build\` / \`cargo run\` / \`cargo check\` / \`cargo clippy -- -W clippy::pedantic\` for the build-test-lint loop. When you want to see what a value's type is, drop in \`let _: () = x;\` and read the compiler's "expected (), found …" error — that trick costs nothing and tells you everything.\n\nTo build the muscle, you'll write a \`cargo new greet\` CLI locally that takes a \`--name\` flag (clap derive) and prints a greeting plus the current UTC timestamp — writing it yourself is how the reading sticks.`,
    video: {
      title: 'Rust Programming Course for Beginners',
      youtubeId: 'br3G9tBmyGs',
      channelName: 'freeCodeCamp.org',
      duration: '6 hours',
    },
    topics: [
      {
        label: 'Installing Rust with rustup',
        url: 'https://doc.rust-lang.org/book/ch01-01-installation.html',
        note: 'The Book ch 1.1',
      },
      {
        label: 'Hello, Cargo!',
        url: 'https://doc.rust-lang.org/book/ch01-03-hello-cargo.html',
        note: 'The Book ch 1.3',
      },
      {
        label: 'Variables and Mutability',
        url: 'https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html',
        note: 'The Book ch 3.1',
      },
      {
        label: 'Data Types',
        url: 'https://doc.rust-lang.org/book/ch03-02-data-types.html',
        note: 'The Book ch 3.2',
      },
      {
        label: 'Functions',
        url: 'https://doc.rust-lang.org/book/ch03-03-how-functions-work.html',
        note: 'The Book ch 3.3',
      },
      {
        label: 'Control Flow',
        url: 'https://doc.rust-lang.org/book/ch03-05-control-flow.html',
        note: 'The Book ch 3.5',
      },
      {
        label: 'clap derive tutorial',
        url: 'https://docs.rs/clap/latest/clap/_derive/_tutorial/index.html',
        note: 'docs.rs/clap — Derive tutorial',
      },
    ],
    deliverable:
      'Build locally: a `cargo new greet` CLI with clap derive parsing `--name` and printing a greeting plus a UTC timestamp.',
    checks: [
      {
        kind: 'mcq',
        id: 'rust-1-mcq-1',
        prompt:
          'Which command creates a new Rust binary project named `my_app`?',
        options: [
          '`rust new my_app`',
          '`cargo new my_app`',
          '`cargo init my_app --bin`',
          '`rustup new my_app`',
        ],
        correctIndex: 1,
        explanation:
          '`cargo new my_app` creates a new binary crate by default. `cargo init` operates on an existing directory, not a new one. There is no `rust new` or `rustup new` command.',
      },
      {
        kind: 'mcq',
        id: 'rust-1-mcq-2',
        prompt:
          'What is the difference between `let x = 5;` and `let mut x = 5;` in Rust?',
        options: [
          'No difference — Rust ignores `mut` on stack integers.',
          '`let x` creates a constant; `let mut x` creates a variable.',
          '`let x` creates an immutable binding; you cannot reassign it. `let mut x` allows reassignment.',
          '`mut` is only needed for heap-allocated values.',
        ],
        correctIndex: 2,
        explanation:
          'Rust bindings are immutable by default. Adding `mut` opts the binding into mutability. This is separate from `const` which requires a type annotation and a compile-time value. See Rust Book Ch 3.1.',
      },
      {
        kind: 'mcq',
        id: 'rust-1-mcq-3',
        prompt:
          'What does the following Rust program print?\n```rust\nfn main() {\n    let x = 5;\n    let x = x + 1;\n    let x = x * 2;\n    println!("{}", x);\n}\n```',
        options: ['5', '6', '12', 'compile error: x is not mut'],
        correctIndex: 2,
        explanation:
          'Each `let x` *shadows* the previous binding rather than mutating it. Shadowing is distinct from `mut`: you create a new variable with the same name. So 5 + 1 = 6, then 6 * 2 = 12. See Rust Book Ch 3.1.',
      },
      {
        kind: 'mcq',
        id: 'rust-1-mcq-4',
        prompt:
          'What is the return type of a Rust function with no explicit return value and no `-> Type` annotation?',
        options: ['`null`', '`void`', '`()` (the unit type)', '`None`'],
        correctIndex: 2,
        explanation:
          'Rust functions that do not return a meaningful value implicitly return `()`, the unit type (an empty tuple). This is analogous to `void` in C, but is a real type. See Rust Book Ch 3.3.',
      },
      {
        kind: 'mcq',
        id: 'rust-1-mcq-5',
        prompt:
          'Which `for` loop syntax prints the numbers 1, 2, 3, 4, 5?\n```rust\nfn main() {\n    for i in /* ??? */ {\n        println!("{}", i);\n    }\n}\n```',
        options: ['`1..5`', '`1..=5`', '`1...5`', '`range(1, 6)`'],
        correctIndex: 1,
        explanation:
          '`1..=5` is an inclusive range covering 1 through 5. `1..5` is an exclusive range covering 1 through 4. `range()` is a Python function and does not exist in Rust. See Rust Book Ch 3.5.',
      },
      {
        kind: 'mcq',
        id: 'rust-1-mcq-6',
        prompt:
          'A new hire opens a PR and CI fails on `cargo build --release` inside the `pricing-utils` workspace crate:\n```\n   Compiling pricing-utils v0.3.1 (/builds/checkout/crates/pricing-utils)\nerror[E0308]: mismatched types\n  --> crates/pricing-utils/src/discount.rs:14:18\n   |\n13 | pub fn apply_discount(subtotal_cents: i64, pct: u8) -> i64 {\n   |                                                        --- expected `i64` because of return type\n14 |     let off = subtotal_cents * pct as i64 / 100;\n15 |     subtotal_cents - off;\n   |                          - help: remove this semicolon to return this value\n   |\n   = note:   expected type `i64`\n           found unit type `()`\n\nerror: could not compile `pricing-utils` (lib) due to 1 previous error\n```\nThe file:\n```rust\n// crates/pricing-utils/src/discount.rs\nuse crate::Money;\n\n/// Apply a percentage discount to a subtotal expressed in cents.\n/// Returns the discounted subtotal in cents.\npub fn apply_discount(subtotal_cents: i64, pct: u8) -> i64 {\n    let off = subtotal_cents * pct as i64 / 100;\n    subtotal_cents - off;\n}\n\npub fn money_off(subtotal: Money, pct: u8) -> Money {\n    Money::from_cents(apply_discount(subtotal.cents(), pct))\n}\n```\nWhich fix unblocks the PR with the smallest diff and preserves the function signature?',
        options: [
          'Annotate the call site in `money_off`: `let _: () = apply_discount(subtotal.cents(), pct);`.',
          'Remove the trailing semicolon on line 15 so `subtotal_cents - off` becomes the function\'s tail expression.',
          'Wrap the body: `return (subtotal_cents - off);` but keep the semicolon on the original line.',
          'Change the signature to `-> ()` and have callers read the result from a `static mut LAST_DISCOUNT: i64`.',
        ],
        correctIndex: 1,
        explanation:
          'In Rust the final expression of a block is its value *only if there is no trailing semicolon*. `subtotal_cents - off;` is a statement that evaluates the difference and discards it — the block then returns `()`, which collides with the declared `-> i64`. The compiler even prints `help: remove this semicolon to return this value`. `return subtotal_cents - off;` (with the `return` keyword) is also valid because `return` is itself an expression — but the minimal diff is to drop the semicolon.',
      },
      {
        kind: 'mcq',
        id: 'rust-1-mcq-7',
        prompt:
          'A teammate ports an `examples/hello.rs` snippet from a Stack Overflow answer into a fresh `cargo new hello-svc` project. `cargo run` fails:\n```\n$ cargo run\n   Compiling hello-svc v0.1.0 (/Users/dev/work/hello-svc)\nerror: expected one of `!` or `::`, found `main`\n --> src/main.rs:3:1\n  |\n3 | main() {\n  | ^^^^ expected one of `!` or `::`\n  |\nerror: could not compile `hello-svc` (bin "hello-svc") due to 1 previous error\n```\nThe file:\n```rust\n// src/main.rs\nuse std::env;\n\nmain() {\n    let who = env::var("WHO").unwrap_or_else(|_| "world".to_string());\n    println!("hello, {who}!");\n}\n```\nWhich fix gets `cargo run` printing `hello, world!`?',
        options: [
          'Add a return type: change line 3 to `main() -> () {`.',
          'Rename the function to `_main()` so the linker can pick it up.',
          'Prefix with `fn`: change line 3 to `fn main() {` (Rust function definitions always start with the `fn` keyword).',
          'Add `#[entry_point]` above `main` — the attribute supplies the missing keyword.',
        ],
        correctIndex: 2,
        explanation:
          'Every Rust function definition must start with the `fn` keyword. The parser sees `main(...)` without `fn` and tries to interpret it as a macro call or path, hence the "expected `!` or `::`" diagnostic. Cargo binary crates require an `fn main()` entry point (or `async fn main()` under `#[tokio::main]` etc.). `#[entry_point]` is not a stable attribute and does not replace `fn`.',
      },
      {
        kind: 'mcq',
        id: 'rust-1-mcq-8',
        prompt:
          'A small CLI built with `clap` increments a retry counter. `cargo build` fails:\n```\n$ cargo build\n   Compiling retry-cli v0.1.0 (/work/retry-cli)\nerror[E0384]: cannot assign twice to immutable variable `attempts`\n --> src/main.rs:7:5\n  |\n5 |     let attempts: u32 = args.start;\n  |         --------\n  |         |\n  |         first assignment to `attempts`\n  |         help: consider making this binding mutable: `mut attempts`\n6 |     // bump the counter once per retry\n7 |     attempts = attempts + 1;\n  |     ^^^^^^^^^^^^^^^^^^^^^^^ cannot assign twice to immutable variable\n\nerror: could not compile `retry-cli` (bin "retry-cli") due to 1 previous error\n```\nThe file:\n```rust\n// src/main.rs\nuse clap::Parser;\n\n#[derive(Parser)]\nstruct Args { #[arg(long, default_value_t = 0)] start: u32 }\n\nfn main() {\n    let args = Args::parse();\n    let attempts: u32 = args.start;\n    // bump the counter once per retry\n    attempts = attempts + 1;\n    println!("attempts={attempts}");\n}\n```\nWhich of the following will compile and print `attempts=1` when invoked as `cargo run -- --start 0`?',
        options: [
          'Change line 5 to `let mut attempts: u32 = args.start;` — mutate the same binding (this is what the compiler suggests).',
          'Replace line 7 with `let attempts = attempts + 1;` only, keeping line 5 unchanged — this *shadows* the binding with a new immutable one whose value is 1.',
          'Replace line 5 with `const attempts: u32 = args.start;` — `const` makes the binding rebindable.',
          'Both A and B compile and produce `attempts=1`; C does not compile because `const` requires a compile-time-constant initializer (and `args.start` is not one).',
        ],
        correctIndex: 3,
        explanation:
          'Two idiomatic fixes exist. (A) `let mut attempts = ...; attempts = attempts + 1;` mutates the same binding — this is what the compiler\'s `help` suggests. (B) Replacing the second line with `let attempts = attempts + 1;` *shadows* the binding with a new immutable one whose value is 1. Both print `attempts=1`. (C) is wrong on two counts: `const` items require an explicit type *and* a constant-expression initializer (`args.start`, a runtime value, is not allowed), and even if they were allowed, `const` does not make a binding rebindable.',
      },
      {
        kind: 'code',
        id: 'rust-1-code-1',
        prompt:
          'Complete the `char_count` function so it takes a `&str` and returns the number of characters in it. The `main` function will call it with `"Hello, Cargo!"` and print the result.',
        boilerplate:
          'fn char_count(s: &str) -> usize {\n    // TODO: return the number of characters in `s`\n    // Hint: use the .chars().count() method chain\n}\n\nfn main() {\n    let result = char_count("Hello, Cargo!");\n    println!("{}", result);\n}\n',
        expectedOutput: '13',
        explanation:
          'The `.chars().count()` method chain iterates over the Unicode scalar values in the string and counts them. For ASCII strings like "Hello, Cargo!", this equals the byte length, but for multi-byte UTF-8 strings they can differ.',
      },
    ],
  },

  // ─── L2: Ownership ──────────────────────────────────────────────────────────
  {
    id: 'rust-2',
    language: 'rust',
    level: 2,
    title: 'Ownership, Borrowing & Slices',
    timeEstimate: '6-8 hours',
    intro: `By the end of this phase, you'll read code that touches the borrow checker and predict whether it compiles — moves, copies, immutable vs mutable borrows, the rule that "shared XOR mutable" applies *across overlapping lifetimes*, lifetime elision in function signatures (and what happens when elision picks the wrong lifetime), and \`String\` vs \`&str\`. You'll learn to debug borrow errors by reading the spans the compiler points at: "borrow occurs here", "first borrow ends here", "second borrow occurs here". The trick for confirming a type is \`println!("{:?}", x)\` plus \`dbg!(x)\` for in-place printf-debugging.\n\nTo build the muscle, you'll write a \`wordcount\` binary that reads lines from stdin into a \`HashMap<String, usize>\` and prints the top 10 — small enough to fit on a screen, full enough to exercise owning a \`String\` while iterating immutably and then sorting mutably.`,
    topics: [
      {
        label: 'What Is Ownership?',
        url: 'https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html',
        note: 'The Book ch 4.1',
      },
      {
        label: 'References and Borrowing',
        url: 'https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html',
        note: 'The Book ch 4.2',
      },
      {
        label: 'The Slice Type',
        url: 'https://doc.rust-lang.org/book/ch04-03-slices.html',
        note: 'The Book ch 4.3',
      },
      {
        label: 'String vs &str — Rust By Example',
        url: 'https://doc.rust-lang.org/rust-by-example/std/str.html',
        note: 'When to take which',
      },
      {
        label: 'Lifetime Elision Rules',
        url: 'https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html#lifetime-elision',
        note: 'The Book ch 10.3 — Elision section',
      },
      {
        label: 'Defining Structs (intro to Chapter 5)',
        url: 'https://doc.rust-lang.org/book/ch05-01-defining-structs.html',
        note: 'The Book ch 5.1',
      },
    ],
    deliverable:
      'Build locally: a `wordcount` binary using `std::io::stdin` reading lines into a `HashMap<String, usize>` and printing the top 10 words by count.',
    checks: [
      {
        kind: 'mcq',
        id: 'rust-2-mcq-1',
        prompt:
          'Why does the following code fail to compile?\n```rust\nfn main() {\n    let s1 = String::from("hello");\n    let s2 = s1;\n    println!("{}", s1);\n}\n```',
        options: [
          'Strings cannot be printed with `{}`.',
          'The value was moved into `s2`; `s1` is no longer valid.',
          '`s1` must be declared `mut` to be used after assignment.',
          'This is valid Rust — it prints "hello".',
        ],
        correctIndex: 1,
        explanation:
          '`String` does not implement `Copy`, so `let s2 = s1` moves ownership into `s2`. Using `s1` afterwards is a compile error because its value has been moved. Use `.clone()` if you need both variables. See Rust Book Ch 4.1.',
      },
      {
        kind: 'mcq',
        id: 'rust-2-mcq-2',
        prompt:
          'When would you prefer accepting `&str` over `String` in a function parameter?',
        options: [
          'Never — `String` is always preferred because it owns its data.',
          'When the function only needs to read the string; `&str` accepts both `&String` and string literals without forcing the caller to allocate.',
          'Only when the string contains ASCII; `String` is required for UTF-8.',
          'When the function needs to mutate the string.',
        ],
        correctIndex: 1,
        explanation:
          'A `&str` parameter is the most flexible read-only interface: it accepts `&String` (via deref coercion), `&str` slices, and string literals (`&\'static str`) with no allocation at the call site. Take `String` only when the function needs to own the data (e.g. store it in a struct). For mutation, take `&mut String`.',
      },
      {
        kind: 'mcq',
        id: 'rust-2-mcq-3',
        prompt:
          'What is the type inferred for `x` here?\n```rust\nlet s = String::from("hello");\nlet x = &s[1..3];\n```',
        options: ['`String`', '`&String`', '`&str`', '`[u8]`'],
        correctIndex: 2,
        explanation:
          'Slicing a `String` with `&s[..]` yields a `&str` — a string slice. This is a reference into the `String`\'s heap buffer with a length. It is not a `String` (owned) or `&String` (reference to the whole owned string). See Rust Book Ch 4.3.',
      },
      {
        kind: 'mcq',
        id: 'rust-2-mcq-4',
        prompt:
          'What does this function return for `s = "hello world"`?\n```rust\nfn first_word(s: &str) -> &str {\n    let bytes = s.as_bytes();\n    for (i, &item) in bytes.iter().enumerate() {\n        if item == b\' \' {\n            return &s[0..i];\n        }\n    }\n    &s[..]\n}\n```',
        options: ['"hello world"', '"hello"', '"world"', '"h"'],
        correctIndex: 1,
        explanation:
          'The function scans for a space byte (`b\' \'`). The first space in "hello world" is at index 5, so it returns `&s[0..5]` which is `"hello"`. If no space is found it returns the whole string slice. See Rust Book Ch 4.3.',
      },
      {
        kind: 'mcq',
        id: 'rust-2-mcq-5',
        prompt:
          'How many mutable references to the same value can exist with overlapping lifetimes in Rust?',
        options: ['Unlimited', 'Two', 'Exactly one', 'Zero'],
        correctIndex: 2,
        explanation:
          'Rust enforces "shared XOR mutable": at any point you can have *either* any number of `&T` references *or* exactly one `&mut T` reference — never both for overlapping lifetimes. NLL (non-lexical lifetimes) means the borrow ends at the last *use* of the reference, not at the end of its lexical scope, so the rule is less restrictive than it sounds.',
      },
      {
        kind: 'mcq',
        id: 'rust-2-mcq-6',
        prompt:
          'A nightly job that ingests inventory rows fails to compile after a refactor:\n```\n$ cargo build --release\n   Compiling inventory-ingest v0.6.2 (/srv/jobs/inventory-ingest)\nerror[E0502]: cannot borrow `rows` as mutable because it is also borrowed as immutable\n  --> src/jobs/ingest.rs:22:5\n   |\n20 |     let head = &rows[0];\n   |                 ---- immutable borrow occurs here\n21 |     // append the late-arriving row from the dead-letter queue\n22 |     rows.push(late_row);\n   |     ^^^^^^^^^^^^^^^^^^^ mutable borrow occurs here\n23 |     tracing::info!(?head, "head row before late append");\n   |                    ----- immutable borrow later used here\n\nerror: could not compile `inventory-ingest` (lib) due to 1 previous error\n```\nThe relevant function:\n```rust\n// src/jobs/ingest.rs\nuse crate::model::Row;\n\npub fn ingest(mut rows: Vec<Row>, late_row: Row) {\n    let head = &rows[0];\n    // append the late-arriving row from the dead-letter queue\n    rows.push(late_row);\n    tracing::info!(?head, "head row before late append");\n}\n```\nWhich fix is **correct and minimal** without changing the function signature?',
        options: [
          'Wrap `rows` in `Rc<RefCell<Vec<Row>>>` so the borrow checker is satisfied.',
          'Move the `tracing::info!(?head, ...)` call *before* the `rows.push(late_row);` so the immutable borrow ends before the push.',
          'Borrow the pushed value: `rows.push(&late_row);`.',
          'Replace `let head = &rows[0];` with `let head = rows[0];` to copy the value out — works regardless of whether `Row` implements `Copy`.',
        ],
        correctIndex: 1,
        explanation:
          'Root cause: `Vec::push` may reallocate the backing buffer, which would invalidate `head` (a pointer into the old buffer). The minimal correct fix is to finish using `head` before mutating `rows` — move the `tracing::info!` above the `push`. Option D (`let head = rows[0]`) only works when `Row: Copy`, which most domain structs are not, so it is not a general fix. `Rc<RefCell<...>>` is wildly overkill and changes the public API. `rows.push(&late_row)` does not type-check (`push` takes `T`, not `&T`).',
      },
      {
        kind: 'mcq',
        id: 'rust-2-mcq-7',
        prompt:
          'A teammate\'s PR fails CI with:\n```\nerror[E0382]: borrow of moved value: `items`\n  --> src/services/cart.rs:24:22\n   |\n21 | pub fn audit(items: Vec<Item>) {\n   |              ----- move occurs because `items` has type `Vec<Item>`, which does not implement the `Copy` trait\n22 |     let first = &items[0];\n   |                  ----- borrow of `items` occurs here\n23 |     for it in items {\n   |               ----- `items` moved due to this implicit call to `.into_iter()`\n24 |     tracing::info!(?first, "first item");\n   |                    ^^^^^ borrow used here after move\n\nerror: aborting due to previous error\n```\nThe handler:\n```rust\n// src/services/cart.rs\nuse crate::model::Item;\n\npub fn audit(items: Vec<Item>) {\n    let first = &items[0];\n    for it in items {\n        tracing::debug!(?it, "processing");\n    }\n    tracing::info!(?first, "first item");\n}\n```\nWhich fix unblocks the PR without changing the public signature of `audit`?',
        options: [
          'Change `for it in items` to `for it in &items` so the loop borrows the vector instead of consuming it — `first` stays valid for the final log line.',
          'Wrap `items` in a `Box`: `let items = Box::new(items);` before the loop — `Box` blocks the move.',
          'Add `let first = first.clone();` after the loop.',
          'Move `let first = &items[0];` *inside* the loop body so it is re-created on every iteration.',
        ],
        correctIndex: 0,
        explanation:
          '`for it in items` is sugar for `IntoIterator::into_iter(items)`, which *consumes* the vector. While `first` is still live (used on the final `tracing::info!` line), you cannot move `items`. Iterating by reference — `for it in &items` — keeps `items` alive and the borrow valid. (B) `Box<Vec<T>>` does not change ownership rules; you can still move out of a `Box`. (C) `first` has already been invalidated by the move, so cloning it later is too late. (D) moving the binding inside the loop still leaves `items` consumed when the loop ends.',
      },
      {
        kind: 'mcq',
        id: 'rust-2-mcq-8',
        prompt:
          'A logging utility in your shared `crates/log-util/src/format.rs` won\'t compile after being extracted from a binary into a library crate:\n```\n$ cargo check -p log-util\n   Compiling log-util v0.1.0 (/workspace/crates/log-util)\nerror[E0106]: missing lifetime specifier\n  --> crates/log-util/src/format.rs:8:42\n   |\n8 | pub fn longer_field(a: &str, b: &str) -> &str {\n   |                        ----     ----     ^ expected named lifetime parameter\n   |\n   = help: this function\'s return type contains a borrowed value, but the signature does not say whether it is borrowed from `a` or `b`\nhelp: consider introducing a named lifetime parameter\n   |\n8 | pub fn longer_field<\'a>(a: &\'a str, b: &\'a str) -> &\'a str {\n   |                    ++++     ++          ++          ++\n```\nThe file:\n```rust\n// crates/log-util/src/format.rs\n\n/// Returns whichever field renders longer in a log line, preferring `a` on ties.\n///\n/// Used by `tracing` field formatters to pick the more informative variant\n/// of two human-readable strings (e.g. \"order_id\" vs \"correlation_id\").\npub fn longer_field(a: &str, b: &str) -> &str {\n    if a.len() >= b.len() { a } else { b }\n}\n```\nWhich signature compiles, matches the function\'s actual behaviour, and keeps the API maximally usable?',
        options: [
          '`pub fn longer_field<\'a>(a: &\'a str, b: &str) -> &\'a str` — tie the return to just `a`.',
          '`pub fn longer_field<\'a>(a: &\'a str, b: &\'a str) -> &\'a str` — both inputs share `\'a`; the return is `\'a`.',
          '`pub fn longer_field(a: &\'static str, b: &\'static str) -> &\'static str` — require `\'static` strings.',
          '`pub fn longer_field(a: String, b: String) -> String` — take ownership and return a fresh `String`.',
        ],
        correctIndex: 1,
        explanation:
          'Lifetime elision has no rule that picks between two input references for an output reference, so the compiler asks for an explicit annotation. Since the body can return either `a` or `b`, both must have the same lifetime `\'a`, and the return must also be `\'a`. (A) would fail at the `else` branch because `b: &str` has a *different* (unnamed) lifetime that does not satisfy the `\'a` return contract. (C) forces every caller to hand in `\'static` strings — fine in tests, hostile in real code. (D) changes the API to take ownership unnecessarily, allocating and copying on every call.',
      },
      {
        kind: 'code',
        id: 'rust-2-code-1',
        prompt:
          'Complete the `sum` function so it borrows a `Vec<i32>` (without taking ownership) and returns the sum of all elements.',
        boilerplate:
          'fn sum(numbers: &Vec<i32>) -> i32 {\n    // TODO: iterate over `numbers` and return the sum\n    // Hint: you can use .iter().sum() or a manual fold\n}\n\nfn main() {\n    let nums = vec![10, 20, 30, 40];\n    let total = sum(&nums);\n    println!("{}", total);\n    // `nums` is still usable here because `sum` only borrowed it\n    println!("len={}", nums.len());\n}\n',
        expectedOutput: '100',
        explanation:
          'By taking `&Vec<i32>`, the function borrows the vector without moving it. Calling `.iter().sum()` iterates over the references and computes the sum. The caller retains ownership of the vector after the call.',
      },
    ],
  },

  // ─── L3: Structs, Enums & Error Handling ────────────────────────────────────
  {
    id: 'rust-3',
    language: 'rust',
    level: 3,
    title: 'Structs, Enums, Pattern Matching & Error Handling',
    timeEstimate: '6-8 hours',
    intro: `By the end of this phase, you'll read \`match\` arms and predict which fires (including guards and \`@\` bindings), spot non-exhaustive matches before the compiler does, read \`?\`-propagating code and know which \`From\` impl the compiler will call to convert error types, and recognise the panics that hide behind \`unwrap()\` and \`expect()\` in production code. You'll learn to debug \`Result\`/\`Option\` flow with \`dbg!\` (it returns its argument so you can wrap an expression mid-chain) and to read \`match\` exhaustiveness errors as the compiler showing you a state your code has not handled.\n\nTo build the muscle, you'll write a \`shapes\` CLI that parses \`"circle 5.0"\` / \`"rect 3 4"\` lines from stdin, computes areas via a \`Shape\` enum, and surfaces parse errors with a custom \`Error\` type plus \`?\` propagation.`,
    topics: [
      {
        label: 'Defining and Instantiating Structs',
        url: 'https://doc.rust-lang.org/book/ch05-01-defining-structs.html',
        note: 'The Book ch 5',
      },
      {
        label: 'The Enum Type',
        url: 'https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html',
        note: 'The Book ch 6.1',
      },
      {
        label: 'The match Control Flow Construct',
        url: 'https://doc.rust-lang.org/book/ch06-02-match.html',
        note: 'The Book ch 6.2',
      },
      {
        label: 'Managing Growing Projects with Modules',
        url: 'https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html',
        note: 'The Book ch 7',
      },
      {
        label: 'Error Handling with Result',
        url: 'https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html',
        note: 'The Book ch 9.2',
      },
      {
        label: 'The ? Operator and From conversions',
        url: 'https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html#a-shortcut-for-propagating-errors-the--operator',
        note: 'The Book ch 9.2 — ? section',
      },
    ],
    deliverable:
      'Build locally: a `shapes` CLI that reads "circle 5.0" / "rect 3.0 4.0" lines from stdin, computes areas with a `Shape` enum, and reports parse errors cleanly using `Result` and `?`.',
    checks: [
      {
        kind: 'mcq',
        id: 'rust-3-mcq-1',
        prompt:
          'What does `Option<T>` represent in Rust?',
        options: [
          'A value that may be on the heap or the stack.',
          'A value that is either `Some(T)` (present) or `None` (absent) — Rust\'s null-safe alternative.',
          'An optional function parameter.',
          'A lazy-evaluated value.',
        ],
        correctIndex: 1,
        explanation:
          '`Option<T>` is an enum with two variants: `Some(T)` when a value is present and `None` when it is absent. It replaces nullable pointers and forces the caller to handle both cases explicitly. See Rust Book Ch 6.1.',
      },
      {
        kind: 'mcq',
        id: 'rust-3-mcq-2',
        prompt:
          'In a function that returns `Result<T, MyError>`, the `?` operator applied to a `Result<U, std::io::Error>` works only if:',
        options: [
          'You first call `.unwrap()` on the inner result.',
          'There is an `impl From<std::io::Error> for MyError` in scope — `?` calls `From::from` to convert the error.',
          'The two error types have the same memory representation.',
          'You annotate `?` with the target type as `?::<MyError>`.',
        ],
        correctIndex: 1,
        explanation:
          'On `Err(e)`, `?` returns `Err(From::from(e))`. So `?` works across heterogeneous error types provided a `From<SourceError> for TargetError` exists. This is why custom error enums often use `#[derive(thiserror::Error)]` plus `#[from]` to auto-generate `From` impls. See Rust Book Ch 9.2.',
      },
      {
        kind: 'mcq',
        id: 'rust-3-mcq-3',
        prompt:
          'What does this program print?\n```rust\nfn main() {\n    let x: Option<i32> = Some(7);\n    match x {\n        Some(n) if n > 5 => println!("big: {}", n),\n        Some(n) => println!("small: {}", n),\n        None => println!("nothing"),\n    }\n}\n```',
        options: ['"big: 7"', '"small: 7"', '"nothing"', 'compile error: match is not exhaustive'],
        correctIndex: 0,
        explanation:
          'The first arm uses a match guard (`if n > 5`). Since `x` is `Some(7)` and `7 > 5` is true, the first arm matches and prints "big: 7". Match guards add a boolean filter on top of pattern matching. See Rust Book Ch 6.2.',
      },
      {
        kind: 'mcq',
        id: 'rust-3-mcq-4',
        prompt:
          'What happens at runtime when you call `.unwrap()` on an `Err` value?',
        options: [
          'Returns the default value for the type.',
          'Silently ignores the error and returns `None`.',
          'Panics with a message showing the error value.',
          'Converts the `Err` to an `Ok` with the error as the value.',
        ],
        correctIndex: 2,
        explanation:
          '`.unwrap()` on `Err(e)` panics with the message "called `Result::unwrap()` on an `Err` value: {e:?}". Use `.expect("message")` for a custom panic message, or `?` / explicit matching in production code. See Rust Book Ch 9.2.',
      },
      {
        kind: 'mcq',
        id: 'rust-3-mcq-5',
        prompt:
          'What is the type inferred for `result` here?\n```rust\nfn parse_int(s: &str) -> Result<i32, std::num::ParseIntError> {\n    s.trim().parse::<i32>()\n}\nlet result = parse_int("42");\n```',
        options: [
          '`i32`',
          '`Option<i32>`',
          '`Result<i32, std::num::ParseIntError>`',
          '`Result<&str, std::num::ParseIntError>`',
        ],
        correctIndex: 2,
        explanation:
          '`parse_int` returns `Result<i32, std::num::ParseIntError>`, so `result` has that type. The value is `Ok(42)`. You must match on it or call `.unwrap()` / `?` to extract the `i32`. See Rust Book Ch 9.2.',
      },
      {
        kind: 'mcq',
        id: 'rust-3-mcq-6',
        prompt:
          'After a teammate adds a `Refunded` state to the `OrderStatus` enum, the workspace fails to build:\n```\n$ cargo build -p orders\n   Compiling orders v1.4.0 (/workspace/crates/orders)\nerror[E0004]: non-exhaustive patterns: `OrderStatus::Refunded` not covered\n  --> crates/orders/src/labels.rs:11:11\n   |\n11 |     match status {\n   |           ^^^^^^ pattern `OrderStatus::Refunded` not covered\n   |\nnote: `OrderStatus` defined here\n  --> crates/orders/src/lib.rs:6:1\n   |\n6  | pub enum OrderStatus { Pending, Paid, Shipped, Cancelled, Refunded }\n   | ^^^^^^^^^^^^^^^^^^^^                                       --------- not covered\n```\nThe relevant file:\n```rust\n// crates/orders/src/labels.rs\nuse crate::OrderStatus;\n\n/// Human-readable label for the customer-facing status badge.\npub fn label(status: OrderStatus) -> &\'static str {\n    match status {\n        OrderStatus::Pending => "Pending payment",\n        OrderStatus::Paid if true => "Paid",\n        OrderStatus::Shipped => "Shipped",\n        OrderStatus::Cancelled => "Cancelled",\n    }\n}\n```\nWhich fix is **correct** and keeps exhaustiveness checking on for the *next* time someone adds a variant?',
        options: [
          'Add `_ => "Unknown",` as the final arm — quickest unblock, but the compiler will no longer warn when a new variant is added later.',
          'Add explicit arms for both: `OrderStatus::Paid => "Paid",` (to cover the case where the always-true guard is false) and `OrderStatus::Refunded => "Refunded",`.',
          'Remove only the `if true` guard from the `Paid` arm.',
          'Both B and C resolve the *Refunded* error, but only B addresses the second exhaustiveness gap the compiler will report (the guarded `Paid` arm leaves `Paid` uncovered when the guard is false).',
        ],
        correctIndex: 3,
        explanation:
          'Match exhaustiveness ignores guards — `OrderStatus::Paid if true` does not cover `OrderStatus::Paid` (the compiler conservatively assumes the guard could be false). To make this compile cleanly you need both an arm for `Refunded` *and* an unconditional arm for `Paid` (either by removing the guard or by adding a fallback). (A) "fixes" the build but disables enum exhaustiveness checks — the next variant addition will silently fall through to `"Unknown"`. (C) addresses only one half. (B) does both and preserves future-variant safety. See Rust Book Ch 6.2.',
      },
      {
        kind: 'mcq',
        id: 'rust-3-mcq-7',
        prompt:
          'An on-call engineer pages you: the `doubler` CLI tool, invoked from a deploy script, crashes if the script forgets the argument and the Pod restarts in a loop:\n```\n$ cargo run --release\n   Compiling doubler v0.2.0 (/usr/src/doubler)\n    Finished `release` profile [optimized] target(s) in 1.84s\n     Running `target/release/doubler`\nthread \'main\' panicked at src/main.rs:8:43:\ncalled `Option::unwrap()` on a `None` value\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\nerror: process didn\'t exit successfully: `target/release/doubler` (exit status: 101)\n```\nThe file:\n```rust\n// src/main.rs\nuse std::env;\n\nfn main() {\n    let args: Vec<String> = env::args().collect();\n\n    // expect a single positional integer arg, double it, and print.\n    // example: `doubler 21` -> `42`\n    let n: i32 = args.get(1).unwrap().parse().unwrap();\n\n    println!("{}", n * 2);\n}\n```\nProduction needs the binary to exit with a non-zero status *and a readable stderr message* instead of dumping a panic. Which fix is most idiomatic?',
        options: [
          'Replace both `.unwrap()` calls with `.expect("expected one numeric arg")` — nicer message but still a panic and still exit status 101.',
          'Change `main` to return `Result<(), Box<dyn std::error::Error>>` and propagate with `?`: `let n: i32 = args.get(1).ok_or("missing arg")?.parse()?;`.',
          'Wrap in `if let Some(s) = args.get(1) { … }` with no `else` branch — exits silently with status 0 when the arg is missing.',
          'Add `#[panic = "abort"]` to silence the backtrace.',
        ],
        correctIndex: 1,
        explanation:
          'The idiomatic Rust pattern is to make `main` return a `Result` and let `?` propagate errors. `.ok_or("missing arg")` converts `Option::None` to `Err(&\'static str)`, and `.parse::<i32>()?` propagates `ParseIntError`. Both errors auto-box into `Box<dyn std::error::Error>` via the blanket `From` impls. The runtime then prints `Error: <message>` to stderr and exits with status 1 — exactly the behaviour the deploy script expects. (A) still panics. (C) silently exits 0 on missing input — a worse bug. (D) is not valid Rust syntax.',
      },
      {
        kind: 'mcq',
        id: 'rust-3-mcq-8',
        prompt:
          'A library crate `crates/configloader` uses a hand-rolled `ConfigError` enum. After adding a new TOML field parsed with `i64::from_str`, `cargo check` fails:\n```\n$ cargo check -p configloader\n   Compiling configloader v0.4.0 (/workspace/crates/configloader)\nerror[E0277]: `?` couldn\'t convert the error to `ConfigError`\n  --> crates/configloader/src/parse.rs:18:46\n   |\n14 | pub fn parse_max_conns(s: &str) -> Result<i64, ConfigError> {\n   |                                    ----------------------- expected `ConfigError` because of this\n...\n18 |     let n: i64 = s.trim().parse()?;\n   |                                   ^ the trait `From<ParseIntError>` is not implemented for `ConfigError`\n   |\n   = help: the following other types implement trait `From<T>`:\n             <ConfigError as From<std::io::Error>>\n```\nThe file:\n```rust\n// crates/configloader/src/parse.rs\n\n#[derive(Debug)]\npub enum ConfigError {\n    Io(std::io::Error),\n}\n\nimpl From<std::io::Error> for ConfigError {\n    fn from(e: std::io::Error) -> Self { ConfigError::Io(e) }\n}\n\n/// Parse the `max_conns` field from a raw TOML string value.\npub fn parse_max_conns(s: &str) -> Result<i64, ConfigError> {\n    // strip whitespace from line-buffered input then parse\n    let n: i64 = s.trim().parse()?;\n    Ok(n)\n}\n```\nWhich fix is correct, idiomatic, and keeps `parse_max_conns` returning `Result<i64, ConfigError>`?',
        options: [
          'Add a `Parse(std::num::ParseIntError)` variant to `ConfigError` and an `impl From<std::num::ParseIntError> for ConfigError` — `?` then converts automatically.',
          'Change the return type to `Result<i64, Box<dyn std::error::Error>>` and erase the typed error from the public API.',
          'Use `s.trim().parse().map_err(|_| ConfigError::Io(std::io::Error::other("parse failed")))?` — squash the parse error into the existing `Io` variant.',
          'Both A and C compile, but A is the right extensible fix because it preserves the original error provenance and matches the existing pattern of the enum.',
        ],
        correctIndex: 3,
        explanation:
          '`?` desugars to `match expr { Ok(v) => v, Err(e) => return Err(From::from(e)) }`, so it needs an `impl From<ParseIntError> for ConfigError`. The idiomatic fix is to add a `Parse(ParseIntError)` variant and either write the `From` impl by hand or derive it with `thiserror::Error` + `#[from]`. (C) compiles but throws away the original error chain *and* lies about what happened (an `Io` variant for a parse failure). (B) erases the typed error from a library API — acceptable in binaries with `anyhow::Result`, hostile in a `crates/` library.',
      },
      {
        kind: 'code',
        id: 'rust-3-code-1',
        prompt:
          'Define a `Shape` enum with variants `Circle(f64)` (radius) and `Rectangle(f64, f64)` (width, height). Implement an `area` method that returns the area. Use `match` to compute the correct area for each variant.',
        boilerplate:
          'use std::f64::consts::PI;\n\nenum Shape {\n    Circle(f64),\n    Rectangle(f64, f64),\n}\n\nimpl Shape {\n    fn area(&self) -> f64 {\n        // TODO: match on `self` and compute the area\n        // Circle area = PI * radius * radius\n        // Rectangle area = width * height\n    }\n}\n\nfn main() {\n    let c = Shape::Circle(5.0);\n    let r = Shape::Rectangle(3.0, 4.0);\n    println!("{:.2}", c.area());\n    println!("{:.2}", r.area());\n}\n',
        expectedOutput: '78.54',
        explanation:
          'Pattern matching with `match` on an enum lets you destructure each variant and compute different logic per case. `Circle(5.0)` has area π × 25 ≈ 78.54, and `Rectangle(3.0, 4.0)` has area 12.00.',
      },
    ],
  },

  // ─── L4: Generics, Traits & Iterators ───────────────────────────────────────
  {
    id: 'rust-4',
    language: 'rust',
    level: 4,
    title: 'Generics, Traits, Closures & Iterators',
    timeEstimate: '8-10 hours',
    intro: `By the end of this phase, you'll read a generic signature like \`fn save<P: AsRef<Path>>(path: P, body: impl Into<String>) -> io::Result<()>\` and immediately know what callers can pass (\`&str\`, \`String\`, \`PathBuf\`, \`&Path\`) and why. You'll read trait bound errors and recognise the three classic failures: bound not satisfied, conflicting blanket impl, and \`impl Trait\` return types that secretly disagree across branches (forcing \`Box<dyn Trait>\`). You'll read iterator chains and predict the laziness: which adapter forces evaluation (\`collect\`, \`for_each\`, \`sum\`) and which is lazy (\`map\`, \`filter\`, \`flat_map\`). For type debugging the trick is \`let _: () = chain;\` — the compiler tells you "expected (), found ChainTypeYouCannotName".\n\nTo build the muscle, you'll write a \`notes\` CLI: serde JSON persistence, clap derive subcommands (\`add\`, \`list\`, \`find\`, \`done\`), and anyhow error handling — small but real.`,
    topics: [
      {
        label: 'Generic Data Types',
        url: 'https://doc.rust-lang.org/book/ch10-01-syntax.html',
        note: 'The Book ch 10.1',
      },
      {
        label: 'Traits: Defining Shared Behaviour',
        url: 'https://doc.rust-lang.org/book/ch10-02-traits.html',
        note: 'The Book ch 10.2',
      },
      {
        label: 'Closures: Anonymous Functions',
        url: 'https://doc.rust-lang.org/book/ch13-01-closures.html',
        note: 'The Book ch 13.1',
      },
      {
        label: 'Processing a Series of Items with Iterators',
        url: 'https://doc.rust-lang.org/book/ch13-02-iterators.html',
        note: 'The Book ch 13.2',
      },
      {
        label: 'serde — overview',
        url: 'https://serde.rs/',
        note: 'serde.rs — the canonical guide',
      },
      {
        label: 'anyhow crate',
        url: 'https://docs.rs/anyhow/latest/anyhow/',
        note: 'docs.rs/anyhow',
      },
      {
        label: 'clap derive tutorial',
        url: 'https://docs.rs/clap/latest/clap/_derive/_tutorial/index.html',
        note: 'docs.rs/clap',
      },
    ],
    deliverable:
      'Build locally: a `notes` CLI with serde JSON persistence, clap derive subcommands (add, list, find, done), anyhow error handling.',
    checks: [
      {
        kind: 'mcq',
        id: 'rust-4-mcq-1',
        prompt:
          'What is the difference between `impl Trait` and `dyn Trait` in a function return position?',
        options: [
          'There is no difference — they compile to the same code.',
          '`impl Trait` is static dispatch (monomorphised at compile time, zero overhead); `dyn Trait` is dynamic dispatch (vtable pointer, heap allocation often required).',
          '`impl Trait` requires `Box<>` wrapping; `dyn Trait` does not.',
          '`dyn Trait` is faster because the compiler can inline it.',
        ],
        correctIndex: 1,
        explanation:
          '`impl Trait` in return position means the concrete type is known at compile time (the compiler may monomorphise). `dyn Trait` uses a vtable and allows heterogeneous collections of trait objects, at the cost of a pointer indirection per call. See Rust Book Ch 10.2.',
      },
      {
        kind: 'mcq',
        id: 'rust-4-mcq-2',
        prompt:
          'A function takes a path argument and is declared `fn read<P: AsRef<Path>>(p: P)`. Which call sites compile?',
        options: [
          'Only `read("foo")` — `&str` is the only valid argument.',
          'Only `read(PathBuf::from("foo"))`.',
          '`read("foo")`, `read(&"foo".to_string())`, `read(Path::new("foo"))`, and `read(PathBuf::from("foo"))` all compile because each type implements `AsRef<Path>`.',
          'None — `AsRef<Path>` is a sealed trait users cannot satisfy.',
        ],
        correctIndex: 2,
        explanation:
          '`AsRef<Path>` is implemented for `&str`, `String`, `&Path`, `PathBuf`, `OsString`, and `&OsStr`. Accepting `P: AsRef<Path>` is the canonical way to write filesystem-style APIs that "just work" with whatever string-like the caller has. Inside the function you call `p.as_ref()` once and work with `&Path`.',
      },
      {
        kind: 'mcq',
        id: 'rust-4-mcq-3',
        prompt:
          'Which iterator adapter lazily doubles every element of a `Vec<i32>` without allocating until `.collect()` is called?',
        options: [
          '`v.iter().for_each(|x| x * 2)`',
          '`v.iter().map(|x| x * 2)`',
          '`v.iter().filter(|x| x * 2)`',
          '`v.iter().fold(0, |acc, x| acc + x * 2)`',
        ],
        correctIndex: 1,
        explanation:
          '`map` returns a lazy `Map` iterator — nothing is computed until you consume it (e.g. with `.collect()`). `for_each` is eager but does not produce a new iterator. `filter` keeps/removes elements rather than transforming them. See Rust Book Ch 13.2.',
      },
      {
        kind: 'mcq',
        id: 'rust-4-mcq-4',
        prompt:
          'What does this program print?\n```rust\nfn main() {\n    let nums = vec![1, 2, 3, 4, 5, 6];\n    let result: i32 = nums.iter()\n        .filter(|&&x| x % 2 == 0)\n        .map(|&x| x * x)\n        .sum();\n    println!("{}", result);\n}\n```',
        options: ['`91`', '`56`', '`44`', '`14`'],
        correctIndex: 1,
        explanation:
          'Even numbers are 2, 4, 6. Their squares are 4, 16, 36. Sum = 4 + 16 + 36 = 56. The double-deref `&&x` in the filter is needed because `.iter()` yields `&i32` and `.filter` then passes another `&` to the closure. See Rust Book Ch 13.2.',
      },
      {
        kind: 'mcq',
        id: 'rust-4-mcq-5',
        prompt:
          'What does `move` do in `let add_n = move |x| x + n;`?',
        options: [
          'Makes the closure return by move instead of by reference.',
          'Transfers ownership of captured variables (`n`) into the closure rather than borrowing them.',
          'Marks the closure as `Send + Sync`.',
          'Prevents the closure from being called more than once.',
        ],
        correctIndex: 1,
        explanation:
          '`move` forces the closure to take ownership of all captured variables. Here `n` is copied (if `Copy`) or moved into the closure. This is required when the closure must outlive the scope where the captures live — e.g. when passing to `thread::spawn` or `tokio::spawn`. See Rust Book Ch 13.1.',
      },
      {
        kind: 'mcq',
        id: 'rust-4-mcq-6',
        prompt:
          'A small numeric utility in `crates/metrics-tools/src/peak.rs` is being made generic so it can pick the peak value out of either `Vec<f64>` (latency samples) or `Vec<u64>` (RPS samples). The current attempt:\n```\n$ cargo check -p metrics-tools\nerror[E0369]: binary operation `>` cannot be applied to type `T`\n  --> crates/metrics-tools/src/peak.rs:7:21\n   |\n7  |         if sample > peak {\n   |            ------ ^ ---- T\n   |            |\n   |            T\n   |\nhelp: consider restricting type parameter `T`\n   |\n3  | pub fn peak<T: std::cmp::PartialOrd>(samples: &[T]) -> T {\n   |              +++++++++++++++++++++++\n```\nAdding the compiler\'s suggested bound then yields:\n```\nerror[E0508]: cannot move out of type `[T]`, a non-copy slice\n  --> crates/metrics-tools/src/peak.rs:5:23\n   |\n5  |     let mut peak = samples[0];\n   |                       ^^^^^^^^^^ cannot move out of here\n   |\n   = note: move occurs because `samples[0]` has type `T`, which does not implement the `Copy` trait\n```\nThe file:\n```rust\n// crates/metrics-tools/src/peak.rs\n\n/// Returns the largest sample. Used by the dashboard renderer to label spikes.\npub fn peak<T>(samples: &[T]) -> T {\n    let mut peak = samples[0];\n    for &sample in samples.iter() {\n        if sample > peak {\n            peak = sample;\n        }\n    }\n    peak\n}\n```\nWhat is the **smallest** set of bounds that makes the *current* implementation compile for the call sites `peak::<f64>` and `peak::<u64>`?',
        options: [
          '`T: PartialOrd` alone',
          '`T: PartialOrd + Copy`',
          '`T: Ord + Clone`',
          '`T: PartialOrd + Display`',
        ],
        correctIndex: 1,
        explanation:
          'The `>` comparison requires `PartialOrd`. Reading `samples[0]` (and the `&sample` pattern destructuring then re-binding by value) is a move out of a slice — for that to be legal on a generic `T`, you need `T: Copy`. Both `f64` and `u64` implement `Copy + PartialOrd`, so the call sites compile. `Ord` is strictly stronger than `PartialOrd` (and `f64` does not implement `Ord` because `NaN` breaks total ordering — so picking `Ord` would actually drop the `f64` call site). `Clone` would work *if* you rewrote the body to `.clone()` each candidate, but that is not the minimal fix for the *current* code.',
      },
      {
        kind: 'mcq',
        id: 'rust-4-mcq-7',
        prompt:
          'A reporting handler in your axum web service returns one of two iterator chains depending on a feature flag. `cargo build` fails:\n```\n$ cargo build -p reports\n   Compiling reports v0.9.0 (/workspace/crates/reports)\nerror[E0308]: `if` and `else` have incompatible types\n  --> crates/reports/src/handlers/daily.rs:16:9\n   |\n14 |       if feature_flags.use_legacy {\n   |       -------------------------- `if` and `else` have incompatible types\n15 |           legacy_ids.into_iter()\n   |           ---------------------- expected because of this\n16 | /         (0..total)\n17 | |             .filter(|&id| !blocked.contains(&id))\n   | |_________________________________________________^ expected `std::vec::IntoIter<u64>`, found `Filter<Range<u64>, ...>`\n   |\n   = note:   expected struct `std::vec::IntoIter<u64>`\n               found struct `Filter<Range<u64>, [closure@crates/reports/src/handlers/daily.rs:17:21]>`\n```\nThe handler:\n```rust\n// crates/reports/src/handlers/daily.rs\nuse crate::{flags::FeatureFlags, ids::BlockList};\n\n/// Pick the order-id iterator the daily-report job should walk.\npub fn order_ids(\n    feature_flags: &FeatureFlags,\n    blocked: &BlockList,\n    legacy_ids: Vec<u64>,\n    total: u64,\n) -> impl Iterator<Item = u64> {\n    if feature_flags.use_legacy {\n        legacy_ids.into_iter()\n    } else {\n        (0..total)\n            .filter(|&id| !blocked.contains(&id))\n    }\n}\n```\nWhich statement is correct?',
        options: [
          'Add `.collect::<Vec<_>>().into_iter()` to both branches so they yield the same concrete `IntoIter<u64>` — costs one full collection per call.',
          'Change the return type to `Box<dyn Iterator<Item = u64>>` and `Box::new(...)` each branch — one heap allocation per call, dynamic dispatch per `.next()`.',
          'Define an `enum Either<L, R> { L(L), R(R) }` (or use `either::Either`), `impl Iterator` on it, and wrap each branch — zero heap allocations, monomorphised.',
          'All of A/B/C compile, but B is the idiomatic minimal fix when the two iterator types are unrelated; C is what you reach for when you measure allocations are hot.',
        ],
        correctIndex: 3,
        explanation:
          '`impl Trait` in return position requires a *single* concrete type. Two different iterator combinator chains have different anonymous types, so the function cannot return either one from different branches. (A) collects into `Vec` and yields `vec::IntoIter` — correct but allocates. (B) erases to `Box<dyn Iterator<Item = u64>>` — one heap allocation per call plus dynamic dispatch per `.next()`. (C) wraps in an `Either` enum and hand-rolls `Iterator::next` — zero heap allocations and statically dispatched, at the cost of one tiny enum. The `either` crate provides this for free.',
      },
      {
        kind: 'mcq',
        id: 'rust-4-mcq-8',
        prompt:
          'A new domain model lands in your `domain/` crate, and the build breaks:\n```\n$ cargo build -p domain\n   Compiling domain v0.12.0 (/workspace/crates/domain)\nerror[E0119]: conflicting implementations of trait `From<UserId>` for type `UserId`\n  --> crates/domain/src/ids.rs:18:1\n   |\n18 | impl From<UserId> for UserId {\n   | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n   |\nnote: conflicting implementation in crate `core`:\n        - impl<T> From<T> for T;\n\nerror: could not compile `domain` (lib) due to 1 previous error\n```\nThe file:\n```rust\n// crates/domain/src/ids.rs\nuse serde::{Deserialize, Serialize};\n\n#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]\npub struct UserId(pub u64);\n\nimpl UserId {\n    pub fn new(raw: u64) -> Self { Self(raw) }\n}\n\n// Helper: the team thought they had to "register" the identity conversion\n// so callers could write `UserId::from(u)` for an existing UserId.\nimpl From<UserId> for UserId {\n    fn from(x: UserId) -> UserId { x }\n}\n```\nWhich statement is correct?',
        options: [
          'The standard library provides a blanket `impl<T> From<T> for T` (the identity conversion). The hand-written impl duplicates it — delete it; `UserId::from(u)` is already available for any existing `UserId`.',
          '`From` is sealed — only the standard library is allowed to implement it.',
          'You must use `#[derive(From)]` from `derive_more` instead of writing the impl by hand.',
          'Add a generic parameter to the impl: `impl<U> From<U> for UserId` — the orphan rule then resolves the conflict.',
        ],
        correctIndex: 0,
        explanation:
          'The standard library provides a blanket reflexive `impl<T> From<T> for T` — the identity conversion — so any user-written `impl From<X> for X` collides with it. The fix is to delete the redundant impl; `UserId::from(existing_user_id)` already works via the blanket impl. (B) is false: `From` is not sealed; user crates implement it constantly. (C) is unnecessary work — the blanket impl already covers identity. (D) does not resolve the conflict (it still collides with the blanket impl when `U = UserId`) *and* violates the orphan rule unless `UserId` is local. Reading "conflicting implementations" errors is a real skill — they always cite *both* impls so you can pick which to remove.',
      },
      {
        kind: 'code',
        id: 'rust-4-code-1',
        prompt:
          'Write a generic function `largest` that takes a slice of items implementing `PartialOrd + Copy` and returns the largest element. Complete the function body using the trait bounds.',
        boilerplate:
          'fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {\n    // TODO: find and return the largest element in `list`\n    // Hint: start with list[0] and iterate, comparing with >\n}\n\nfn main() {\n    let numbers = vec![34, 50, 25, 100, 65];\n    println!("{}", largest(&numbers));\n\n    let chars = vec![\'y\', \'m\', \'z\', \'a\'];\n    println!("{}", chars[0]);\n}\n',
        expectedOutput: '100',
        explanation:
          'The `PartialOrd` bound enables the `>` operator and `Copy` allows reading elements out of the slice by value. This is the canonical Rust Book example of generics with trait bounds (Ch 10.1).',
      },
    ],
  },

  // ─── L5: Concurrency & Error Crates ─────────────────────────────────────────
  {
    id: 'rust-5',
    language: 'rust',
    level: 5,
    title: 'Concurrency: Threads, Channels & Shared State',
    timeEstimate: '8-10 hours',
    intro: `By the end of this phase, you'll read multi-threaded Rust and predict where the borrow checker draws the line: \`Send\` lets a type *move* to another thread, \`Sync\` lets a \`&T\` be *shared* with another thread, and \`Rc\` is \`!Send\` on purpose. You'll read \`Arc<Mutex<T>>\` and \`Arc<RwLock<T>>\` and know when to reach for each (RwLock when reads vastly outnumber writes; Mutex when contention is low or writes dominate). You'll read panicked-thread mutex code and know about poisoning; you'll read \`mpsc\` code and know that unbuffered channels backpressure the sender. When debugging concurrent code, you'll \`dbg!\` inside the critical section and inspect \`thread::current().id()\`.\n\nTo build the muscle, you'll write a multi-threaded \`parallel-grep\` CLI: one thread per file, regex per line, results streamed back over an \`mpsc::sync_channel\`, and \`anyhow\` for error propagation.`,
    topics: [
      {
        label: 'Using Threads to Run Code Simultaneously',
        url: 'https://doc.rust-lang.org/book/ch16-01-threads.html',
        note: 'The Book ch 16.1',
      },
      {
        label: 'Message Passing with Channels',
        url: 'https://doc.rust-lang.org/book/ch16-02-message-passing.html',
        note: 'The Book ch 16.2',
      },
      {
        label: 'Shared-State Concurrency (Mutex, Arc)',
        url: 'https://doc.rust-lang.org/book/ch16-03-shared-state.html',
        note: 'The Book ch 16.3',
      },
      {
        label: 'Extensible Concurrency: Send and Sync',
        url: 'https://doc.rust-lang.org/book/ch16-04-extensible-concurrency-sync-and-send.html',
        note: 'The Book ch 16.4',
      },
      {
        label: 'RwLock vs Mutex — std docs',
        url: 'https://doc.rust-lang.org/std/sync/struct.RwLock.html',
        note: 'std::sync::RwLock',
      },
      {
        label: 'anyhow crate',
        url: 'https://docs.rs/anyhow/latest/anyhow/',
        note: 'docs.rs/anyhow',
      },
      {
        label: 'thiserror crate',
        url: 'https://docs.rs/thiserror/latest/thiserror/',
        note: 'docs.rs/thiserror',
      },
    ],
    deliverable:
      'Build locally: a multi-threaded `parallel-grep` CLI that spawns one thread per file argument, searches for a pattern with `regex`, sends matches over `mpsc`, and prints results with `anyhow` error handling.',
    checks: [
      {
        kind: 'mcq',
        id: 'rust-5-mcq-1',
        prompt:
          'When would you prefer `Arc<RwLock<T>>` over `Arc<Mutex<T>>`?',
        options: [
          'Always — `RwLock` is strictly faster than `Mutex`.',
          'When reads vastly outnumber writes — `RwLock` allows many concurrent readers and one exclusive writer; under read-heavy workloads it scales much better than `Mutex` which serialises every access.',
          'Only when the inner type is `Copy`.',
          'When you need to share data across processes, not just threads.',
        ],
        correctIndex: 1,
        explanation:
          '`Mutex` is unconditional exclusion: one thread at a time, read or write. `RwLock` distinguishes shared (`read()`) and exclusive (`write()`) access — many readers OR one writer. For write-heavy or low-contention workloads `Mutex` is often *faster* because `RwLock` has higher per-acquisition overhead. Measure with `criterion`. Note that `parking_lot::RwLock` is often preferred over `std::sync::RwLock` for performance and a poison-free API.',
      },
      {
        kind: 'mcq',
        id: 'rust-5-mcq-2',
        prompt:
          'When should you prefer `thiserror` over `anyhow` for error handling?',
        options: [
          'In application code where you only need to propagate and display errors.',
          'In library crates where callers need to match on specific error variants programmatically.',
          '`thiserror` is always preferred because it is more explicit.',
          '`anyhow` is only for async code; `thiserror` is for synchronous code.',
        ],
        correctIndex: 1,
        explanation:
          '`thiserror` derives `std::error::Error` on your custom enum, giving callers typed variants to match against — essential for libraries. `anyhow` erases the type into `anyhow::Error` and is best for application code that just needs to propagate and display errors. A common pattern: libraries use `thiserror`, applications use `anyhow` over them.',
      },
      {
        kind: 'mcq',
        id: 'rust-5-mcq-3',
        prompt:
          'What does this program print?\n```rust\nuse std::thread;\n\nfn main() {\n    let handles: Vec<_> = (1..=4)\n        .map(|i| thread::spawn(move || i * i))\n        .collect();\n    let sum: i32 = handles.into_iter().map(|h| h.join().unwrap()).sum();\n    println!("{}", sum);\n}\n```',
        options: ['`10`', '`24`', '`30`', '`100`'],
        correctIndex: 2,
        explanation:
          '1² + 2² + 3² + 4² = 1 + 4 + 9 + 16 = 30. Each `thread::spawn` gets a copy of `i` via `move`. `join().unwrap()` retrieves the `i32` result. The `move` keyword is required because `i` must be owned by the closure to cross the thread boundary. See Rust Book Ch 16.1.',
      },
      {
        kind: 'mcq',
        id: 'rust-5-mcq-4',
        prompt:
          'What is the type inferred for `rx` in `let (tx, rx) = std::sync::mpsc::channel::<String>();`?',
        options: [
          '`std::sync::mpsc::Sender<String>`',
          '`std::sync::mpsc::Receiver<String>`',
          '`std::sync::mpsc::Channel<String>`',
          '`Arc<Mutex<String>>`',
        ],
        correctIndex: 1,
        explanation:
          '`mpsc::channel()` returns a `(Sender<T>, Receiver<T>)` tuple. The destructuring assigns `tx` to the `Sender` and `rx` to the `Receiver`. Only `Sender` can be cloned (for multiple producers); there is only ever one `Receiver`. `mpsc::sync_channel(n)` returns a bounded version of the same pair.',
      },
      {
        kind: 'mcq',
        id: 'rust-5-mcq-5',
        prompt:
          'The compiler reports:\n```\nerror[E0277]: `Rc<i32>` cannot be sent between threads safely\n --> src/main.rs:5:5\n  |\n5 |     thread::spawn(move || {\n  |     ^^^^^^^^^^^^^ `Rc<i32>` cannot be sent between threads safely\n  |\nnote: the trait `Send` is not implemented for `Rc<i32>`\nhelp: consider using `Arc` instead\n```\nThe code is:\n```rust\nuse std::rc::Rc;\nuse std::thread;\n\nfn main() {\n    let counter = Rc::new(0);\n    let c = Rc::clone(&counter);\n    thread::spawn(move || {\n        println!("{c}");\n    }).join().unwrap();\n}\n```\nWhich is the correct minimal fix?',
        options: [
          'Replace `Rc::new` / `Rc::clone` with `Arc::new` / `Arc::clone` — `Arc` is the thread-safe (atomic) reference counter.',
          'Wrap the `Rc` in a `Mutex<Rc<i32>>` so it becomes `Send`.',
          'Add `unsafe impl Send for Rc<i32> {}` — `Rc` is actually safe to send.',
          'Use `std::thread::scope` so `Rc` does not need to be `Send`.',
        ],
        correctIndex: 0,
        explanation:
          '`Rc<T>` uses non-atomic refcount increments and is *deliberately* `!Send` to prevent data races on the refcount itself. `Arc<T>` uses atomic increments and *is* `Send + Sync`. (B) compiles only if the `Rc<T>` itself can be `Send`, which it cannot. (C) is undefined behaviour — never `unsafe impl Send` for `Rc`. (D) `scope` still requires captured types to satisfy whatever bounds the thread closure imposes; `Rc` would still be rejected for the same reason.',
      },
      {
        kind: 'mcq',
        id: 'rust-5-mcq-6',
        prompt:
          'Pager wakes you at 02:14 UTC: a long-running ingest worker started crash-looping after a deploy. The main thread aborts with:\n```\n2026-05-24T02:14:08.412Z ERROR ingest::worker: thread \'ingest-main\' panicked at \'called `Result::unwrap()` on an `Err` value: PoisonError { .. }\', crates/ingest/src/worker.rs:84:34\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\nthread \'ingest-main\' panicked while panicking. aborting.\n```\nThe offending code:\n```rust\n// crates/ingest/src/worker.rs\nuse std::sync::{Arc, Mutex};\nuse std::thread;\nuse crate::model::IngestState;\n\npub fn run(state: Arc<Mutex<IngestState>>) {\n    let workers: Vec<_> = (0..8).map(|i| {\n        let s = Arc::clone(&state);\n        thread::spawn(move || {\n            let mut guard = s.lock().unwrap();\n            // an earlier deploy added a parse step that can panic on malformed input\n            guard.process_batch(i);\n        })\n    }).collect();\n    for w in workers { let _ = w.join(); }\n\n    // main loop continues after workers finish\n    let g = state.lock().unwrap();              // line 84: panic here\n    tracing::info!(rows = g.rows_ingested, "ingest cycle complete");\n}\n```\nGrafana shows one worker panicked mid-`process_batch`. Which statement most accurately describes what happened and how to recover?',
        options: [
          'The mutex is permanently corrupted — there is no recovery API and the process must abort.',
          '`std::sync::Mutex` marks itself *poisoned* when a thread panics while holding the guard. Subsequent `.lock()` returns `Err(PoisonError<MutexGuard<T>>)`. You can recover with `.unwrap_or_else(|e| e.into_inner())` — but only after auditing that `IngestState` is safe to read after a mid-write panic. If poisoning is more pain than safety here, `parking_lot::Mutex` deliberately does not poison.',
          'Poisoning is automatically cleared on the next successful `.lock()` — the panic is unrelated.',
          'Poisoning means the mutex\'s internal state machine is broken; even calling `Mutex::clear_poison()` would not let `.lock()` succeed again until the OS reaps the underlying primitive.',
        ],
        correctIndex: 1,
        explanation:
          'When a thread panics while holding a `MutexGuard`, `std::sync::Mutex` marks itself *poisoned*. Subsequent `.lock()` calls return `Err(PoisonError<MutexGuard<T>>)` so that other threads see the failure rather than silently observing a half-updated invariant. You can recover the guard via `.into_inner()` on the error if you have audited the data structure for mid-write robustness. `parking_lot::Mutex` deliberately omits poisoning (one of its selling points). (D) is wrong: `Mutex::clear_poison` (stable in Rust 1.77) re-allows `.lock()` to succeed without ever reaping any OS primitive — but using it without auditing the data is the same gamble as `.into_inner()`.',
      },
      {
        kind: 'mcq',
        id: 'rust-5-mcq-7',
        prompt:
          'A producer-consumer pipeline in your CSV ingest job randomly crashes whenever the consumer hits a corrupt row and exits early. Pod logs:\n```\n2026-05-24T11:02:33.901Z ERROR ingest::pipeline: thread \'producer-3\' panicked at \'called `Result::unwrap()` on an `Err` value: SendError { .. }\', crates/ingest/src/pipeline.rs:21:30\nthread \'producer-3\' panicked while panicking. aborting.\nerror: process didn\'t exit successfully: `target/release/ingest` (signal: 6, SIGABRT)\n```\nThe pipeline:\n```rust\n// crates/ingest/src/pipeline.rs\nuse std::sync::mpsc;\nuse std::thread;\nuse crate::row::Row;\n\npub fn run(rows: Vec<Row>) {\n    let (tx, rx) = mpsc::channel::<Row>();\n\n    // consumer: stops on first malformed row\n    let consumer = thread::spawn(move || {\n        for row in rx {\n            if row.is_malformed() { return; }       // <-- drops `rx`\n            row.write_to_sink();\n        }\n    });\n\n    // producer: streams every row at the consumer\n    let producer = thread::spawn(move || {\n        for row in rows {\n            tx.send(row).unwrap();                  // line 21\n        }\n    });\n\n    producer.join().unwrap();\n    consumer.join().unwrap();\n}\n```\nWhich statement most accurately diagnoses the SIGABRT and points at the correct fix?',
        options: [
          '`tx.send` panics whenever the channel buffer is full — switch to `sync_channel(8)` with backpressure to drain the buffer.',
          '`mpsc::Sender::send` returns `Err(SendError)` once *all* receivers have been dropped (here, the consumer\'s early `return` drops `rx`). The producer should branch on `if tx.send(row).is_err() { break; }` and exit cleanly instead of `.unwrap()`-ing.',
          'You must use `sync_channel` for senders to detect a closed channel at all — `mpsc::channel` will block forever instead.',
          'The fix is to call `tx.flush()` before sending so the consumer gets a chance to register itself.',
        ],
        correctIndex: 1,
        explanation:
          '`mpsc::Sender::send` returns `Err(SendError(value))` exactly when all `Receiver`s for the channel have been dropped — which is what happens when the consumer\'s `return` runs on a malformed row. `mpsc::channel` is unbounded, so a full buffer is not a thing here; only `sync_channel(n)` exposes back-pressure (option A). `mpsc::channel` *does* detect channel closure (option C is wrong). `tx.flush()` does not exist on `mpsc::Sender` (option D). The correct fix: `if tx.send(row).is_err() { break; }` so the producer terminates cleanly when the consumer exits.',
      },
      {
        kind: 'mcq',
        id: 'rust-5-mcq-8',
        prompt:
          'You\'re reviewing a PR that adds a new `JobHandle` type. CI fails with:\n```\n$ cargo test -p jobs\n   Compiling jobs v0.7.0 (/workspace/crates/jobs)\nerror[E0277]: `Rc<JobState>` cannot be sent between threads safely\n  --> crates/jobs/src/handle.rs:24:18\n   |\n24 |     thread::spawn(move || handle.run());\n   |     ------------- ^^^^^^^^^^^^^^^^^^^^^ `Rc<JobState>` cannot be sent between threads safely\n   |     |\n   |     required by a bound introduced by this call\n   |\n   = help: within `JobHandle`, the trait `Send` is not implemented for `Rc<JobState>`\nnote: required because it appears within the type `JobHandle`\n```\nThe file:\n```rust\n// crates/jobs/src/handle.rs\nuse std::rc::Rc;\nuse std::thread;\nuse crate::state::JobState;\n\npub struct JobHandle {\n    state: Rc<JobState>,\n}\n\nimpl JobHandle {\n    pub fn run(&self) { /* ... */ }\n\n    pub fn spawn_background(self) {\n        let handle = self;\n        // we want this work to happen off the request thread\n        thread::spawn(move || handle.run());\n    }\n}\n```\nWhich trait must `JobHandle` implement for the closure passed to `std::thread::spawn` to compile, and what is the canonical Rust fix here?',
        options: [
          '`Clone` — derive `Clone` on `JobHandle` so the value can be sent.',
          '`Copy` — derive `Copy` on `JobHandle` so the value is bitwise duplicated across threads.',
          '`Send` — and the canonical fix is to swap `Rc<JobState>` for `Arc<JobState>`, because `Arc<T>` is `Send + Sync` (atomic refcount) while `Rc<T>` is deliberately `!Send` to avoid data races on its non-atomic refcount.',
          '`Sync` — and you should wrap the whole `JobHandle` in `Arc<Mutex<JobHandle>>`.',
        ],
        correctIndex: 2,
        explanation:
          '`std::thread::spawn` requires its closure to be `Send + \'static`. `Send` is the marker trait for "can be transferred between threads". `JobHandle` becomes `!Send` because it contains `Rc<JobState>` — `Rc` uses non-atomic refcount increments and is deliberately `!Send` to prevent data races on the refcount itself. The canonical, minimal fix is to swap `Rc` for `Arc`, which uses atomic refcount and *is* `Send + Sync`. `Sync` is the related marker for "can be shared by reference between threads" — different question. Cloning or copying does not change a `!Send` type into a `Send` one.',
      },
      {
        kind: 'code',
        id: 'rust-5-code-1',
        prompt:
          'Use `std::sync::mpsc::channel` to send a message from a spawned thread back to the main thread. The spawned thread should send the string `"hello from thread"` and the main thread should receive and print it.',
        boilerplate:
          'use std::sync::mpsc;\nuse std::thread;\n\nfn main() {\n    let (tx, rx) = mpsc::channel();\n\n    thread::spawn(move || {\n        // TODO: send the string "hello from thread" through `tx`\n        // Hint: tx.send("hello from thread").unwrap();\n    });\n\n    let received = rx.recv().unwrap();\n    println!("{}", received);\n}\n',
        expectedOutput: 'hello from thread',
        explanation:
          '`mpsc::channel()` creates a (Sender, Receiver) pair. The `move` closure transfers ownership of `tx` to the spawned thread. `tx.send()` sends the value, and `rx.recv()` blocks until a message arrives. This is the core message-passing concurrency pattern in Rust (Book Ch 16.2).',
      },
    ],
  },

  // ─── L6: Smart Pointers & Interior Mutability ────────────────────────────────
  {
    id: 'rust-6',
    language: 'rust',
    level: 6,
    title: 'Smart Pointers & Interior Mutability',
    timeEstimate: '6-8 hours',
    intro: `By the end of this phase, you'll read code that uses \`Box\`, \`Rc\`, \`Arc\`, \`RefCell\`, \`Cell\`, and \`Cow\` and predict the runtime cost (heap allocation, atomic refcount bumps, runtime borrow tracking). You'll spot \`Rc\` cycles in tree/graph structures and know to break them with \`Weak\`. You'll predict where a \`RefCell::borrow_mut()\` will panic because an outstanding \`borrow()\` is still alive. You'll read \`Pin<Box<T>>\` and \`Pin<&mut T>\` and know what they forbid (movement) and what they enable (self-referential structs, async state machines). When debugging interior mutability, you'll add \`println!("strong={} weak={}", Rc::strong_count(&r), Rc::weak_count(&r))\` and \`cargo expand\` to see what derives expanded to.\n\nTo build the muscle, you'll write a \`todo-tree\` CLI: nodes stored as \`Rc<RefCell<Node>>\` with \`Weak<RefCell<Node>>\` parent links, plus \`add-child\`, \`mark-done\`, \`print-tree\` subcommands.`,
    topics: [
      {
        label: 'Box<T> — Heap Allocation',
        url: 'https://doc.rust-lang.org/book/ch15-01-box.html',
        note: 'The Book ch 15.1',
      },
      {
        label: 'Rc<T> — Reference Counted Smart Pointer',
        url: 'https://doc.rust-lang.org/book/ch15-04-rc.html',
        note: 'The Book ch 15.4',
      },
      {
        label: 'RefCell<T> and Interior Mutability',
        url: 'https://doc.rust-lang.org/book/ch15-05-interior-mutability.html',
        note: 'The Book ch 15.5',
      },
      {
        label: 'std::borrow::Cow',
        url: 'https://doc.rust-lang.org/std/borrow/enum.Cow.html',
        note: 'std docs',
      },
      {
        label: 'std::pin::Pin',
        url: 'https://doc.rust-lang.org/std/pin/index.html',
        note: 'std docs — foundational for async',
      },
      {
        label: 'Reference Cycles and Memory Leaks (Weak<T>)',
        url: 'https://doc.rust-lang.org/book/ch15-06-reference-cycles.html',
        note: 'The Book ch 15.6',
      },
    ],
    deliverable:
      'Build locally: a `todo-tree` CLI with task nodes stored as `Rc<RefCell<Node>>`, `Weak<RefCell<Node>>` parent pointers, and `add-child` / `mark-done` / `print-tree` subcommands.',
    checks: [
      {
        kind: 'mcq',
        id: 'rust-6-mcq-1',
        prompt:
          'Why can\'t you define `enum List { Cons(i32, List), Nil }` without `Box`?',
        options: [
          'Enums cannot contain other enums of the same type.',
          'The size of `List` would be infinite because `Cons` contains a `List` which contains a `Cons` which…',
          '`Box` is needed to make the type implement `Copy`.',
          'You can — Rust handles recursive enums natively.',
        ],
        correctIndex: 1,
        explanation:
          'Rust must know the size of every type at compile time. A recursive type without indirection has infinite size. `Box<List>` has a fixed size (one pointer) that breaks the recursion. The compiler gives a helpful error suggesting `Box`. See Rust Book Ch 15.1.',
      },
      {
        kind: 'mcq',
        id: 'rust-6-mcq-2',
        prompt:
          'What does `RefCell<T>` provide that `Cell<T>` does not?',
        options: [
          '`RefCell<T>` is thread-safe; `Cell<T>` is not.',
          '`RefCell<T>` allows borrowing references (`&T` and `&mut T`) with runtime borrow checking; `Cell<T>` only allows copying/replacing the entire value.',
          '`RefCell<T>` works on types that do not implement `Copy`; `Cell<T>` requires `Copy`.',
          'Both B and C are correct.',
        ],
        correctIndex: 3,
        explanation:
          '`Cell<T>` is limited to `Copy` types and only offers `get`/`set`. `RefCell<T>` works with non-`Copy` types and provides `borrow()` → `Ref<T>` and `borrow_mut()` → `RefMut<T>`, enforcing borrowing rules at runtime instead of compile time. See Rust Book Ch 15.5.',
      },
      {
        kind: 'mcq',
        id: 'rust-6-mcq-3',
        prompt:
          'What does this program print?\n```rust\nuse std::rc::Rc;\n\nfn main() {\n    let a = Rc::new(vec![1, 2, 3]);\n    println!("count after a = {}", Rc::strong_count(&a));\n    let b = Rc::clone(&a);\n    println!("count after b = {}", Rc::strong_count(&a));\n    drop(b);\n    println!("count after drop b = {}", Rc::strong_count(&a));\n}\n```',
        options: [
          '"count after a = 0\\ncount after b = 1\\ncount after drop b = 0"',
          '"count after a = 1\\ncount after b = 2\\ncount after drop b = 1"',
          '"count after a = 1\\ncount after b = 1\\ncount after drop b = 0"',
          '"count after a = 2\\ncount after b = 2\\ncount after drop b = 1"',
        ],
        correctIndex: 1,
        explanation:
          '`Rc::new` sets the count to 1. `Rc::clone` increments it to 2 (both `a` and `b` point to the same allocation). `drop(b)` decrements it back to 1. When `a` goes out of scope the count reaches 0 and the allocation is freed. See Rust Book Ch 15.4.',
      },
      {
        kind: 'mcq',
        id: 'rust-6-mcq-4',
        prompt:
          'What is the type inferred for `x` here and what does it print?\n```rust\nuse std::borrow::Cow;\n\nfn greet(name: &str) -> Cow<str> {\n    if name.is_empty() {\n        Cow::Owned(String::from("World"))\n    } else {\n        Cow::Borrowed(name)\n    }\n}\n\nfn main() {\n    let x = greet("Alice");\n    println!("{}", x);\n}\n```',
        options: [
          '`String` — prints "Alice"',
          '`Cow<str>` — prints "Alice"',
          '`&str` — prints "Alice"',
          '`Cow<str>` — prints "World"',
        ],
        correctIndex: 1,
        explanation:
          '`greet` returns `Cow<str>`. Since `"Alice"` is not empty, it returns `Cow::Borrowed("Alice")` — no heap allocation. `Cow` implements `Display` by delegating to the inner string, so it prints "Alice". The key benefit of `Cow` is avoiding allocation when the original data suffices.',
      },
      {
        kind: 'mcq',
        id: 'rust-6-mcq-5',
        prompt:
          'A `todo-tree` CLI builds nodes as `Rc<RefCell<Node>>` where each `Node` has `children: Vec<Rc<RefCell<Node>>>` *and* `parent: Rc<RefCell<Node>>`. After the program exits, valgrind reports memory leaks. What\'s the root cause and the standard fix?',
        options: [
          '`Rc` has a known memory leak bug — use `Box` instead.',
          '`Rc<RefCell<Node>>` parent + child links form a cycle: parent\'s `strong_count` never reaches 0 because the child holds an `Rc` to it, and vice versa. Replace `parent` with `Weak<RefCell<Node>>` so it does not contribute to the strong count.',
          '`RefCell::borrow` leaks unless paired with `drop`.',
          'Use `Arc` instead of `Rc` — `Arc` has a built-in cycle collector.',
        ],
        correctIndex: 1,
        explanation:
          'Classic `Rc` cycle: parent holds child via `Rc` and child holds parent via `Rc`. Neither refcount ever reaches 0, so the allocations leak. `Weak<T>` is the partner of `Rc<T>`: it does not contribute to the strong count. Upgrade with `.upgrade()` which returns `Option<Rc<T>>` (None if the strong count has hit 0). (D) is wrong: `Arc` is not a tracing collector. See Rust Book Ch 15.6.',
      },
      {
        kind: 'mcq',
        id: 'rust-6-mcq-6',
        prompt:
          'A single-threaded scene-graph cache in `crates/render/src/cache.rs` started panicking after someone refactored the dirty-tracking pass to be more granular. The customer-facing crash report:\n```\n2026-05-24T09:41:02.117Z ERROR render::cache: thread \'render-main\' panicked at \'already borrowed: BorrowMutError\', crates/render/src/cache.rs:18:30\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n```\nThe code:\n```rust\n// crates/render/src/cache.rs\nuse std::cell::RefCell;\nuse crate::node::Node;\n\npub struct Scene {\n    nodes: RefCell<Vec<Node>>,\n}\n\nimpl Scene {\n    /// Append a node, logging the new size for diagnostics.\n    pub fn append(&self, node: Node) {\n        let read = self.nodes.borrow();\n        tracing::debug!(current_len = read.len(), "scene cache before append");\n        // bug: `read` is still live below\n        self.nodes.borrow_mut().push(node);   // line 18\n        tracing::debug!(new_len = self.nodes.borrow().len(), "scene cache after append");\n    }\n}\n```\nWhich fix resolves the panic and is the most robust against future edits to the function?',
        options: [
          'Wrap the read in a block so the `Ref<Vec<Node>>` is dropped before `borrow_mut`: `{ let read = self.nodes.borrow(); tracing::debug!(current_len = read.len(), ...); }` then call `self.nodes.borrow_mut().push(node);`.',
          'Replace `RefCell::new` with `Cell::new` — `Cell` does not panic on overlapping borrows.',
          'Insert `drop(read);` before the `borrow_mut` — also works, but only because `read` is no longer used after the diagnostic log.',
          'Both A and C resolve the panic; A is the idiomatic block-scoped fix and is harder to break when someone later adds another use of `read` in between.',
        ],
        correctIndex: 3,
        explanation:
          '`RefCell` enforces "shared XOR mutable" at runtime. The panic means a `Ref<Vec<Node>>` from `.borrow()` was still alive when `.borrow_mut()` was called. The fix is to end the read borrow first — either with an explicit scope (A) or an explicit `drop(read)` (C). (B) is wrong: `Cell` only supports `Copy` types and cannot hold `Vec<Node>`. The block-scoped form (A) is more resilient to later edits because adding another use of `read` below the diagnostic log would naturally fall outside the scope. Newer non-lexical lifetimes sometimes end the borrow at its last use, but relying on NLL precision for correctness is fragile — be explicit.',
      },
      {
        kind: 'mcq',
        id: 'rust-6-mcq-7',
        prompt:
          'A teammate is hand-rolling a `Future` adapter that wraps a downstream future and adds a deadline. `cargo build` fails:\n```\n$ cargo build -p net-extras\nerror[E0599]: the method `poll` exists for struct `Pin<Box<dyn Future<Output = u32>>>`, but its trait bounds were not satisfied\n  --> crates/net-extras/src/deadline.rs:34:33\n   |\n34 |         let fut: Pin<Box<dyn Future<Output = u32>>> = self.inner.poll(cx);\n   |                                 ^^^^ method cannot be called on `Pin<Box<dyn Future<Output = u32>>>` due to unsatisfied trait bounds\n   |\n   = note: the following trait bounds were not satisfied:\n           `dyn Future<Output = u32>: Unpin`\n           which is required by `Pin<Box<dyn Future<Output = u32>>>: DerefMut`\nhelp: consider further restricting the associated type\n   |\n34 |         let fut: Pin<Box<dyn Future<Output = u32> + Unpin>> = ...\n```\nThe inner future is generated by `async fn fetch_rate() -> u32 { ... }`. Which statement is correct?',
        options: [
          '`Pin<Box<T>>` forbids dropping the value — that is why `poll` cannot run.',
          '`Pin<Box<T>>` guarantees the wrapped `T` is never moved after it is pinned. For types that are *not* `Unpin` — like the state machine generated by an `async fn`, which may have self-references across `.await` points — `Pin` is the type-level proof callers need to safely call `Future::poll`. The right move here is to keep the pinned box and call `self.inner.as_mut().poll(cx)`, not to add `+ Unpin`.',
          '`Pin<Box<T>>` forbids cloning.',
          '`Pin<Box<T>>` is equivalent to `Box<T>` plus `#[no_mangle]`.',
        ],
        correctIndex: 1,
        explanation:
          'Pinning is about *address stability*: once a value is pinned, its memory address must not change for the rest of its life. The state machine an `async fn` desugars to may hold references *between its own fields* across `.await` points; moving the struct would invalidate those internal references. `Pin` enforces that invariant at the type level. Types that opt out are `Unpin`; most ordinary types (primitives, `Box<T>`, `String`, `Vec<T>`) are `Unpin`, but the compiler-generated future is not. The diagnostic\'s `+ Unpin` suggestion would compile only if you forced the inner future to be unpinnable — which it generally is not. The correct pattern is `self.inner.as_mut().poll(cx)`.',
      },
      {
        kind: 'mcq',
        id: 'rust-6-mcq-8',
        prompt:
          'Heaptrack on the desktop build shows a steadily-growing arena over a 10-minute UI session — every time the user opens and closes a side panel, ~80 nodes leak. The grep below shows the suspect type:\n```rust\n// crates/ui-tree/src/node.rs\nuse std::cell::RefCell;\nuse std::rc::Rc;\n\npub struct Node {\n    pub label: String,\n    pub children: RefCell<Vec<Rc<Node>>>,\n    pub parent: RefCell<Option<Rc<Node>>>,  // <-- back-pointer\n}\n\nimpl Node {\n    pub fn new(label: impl Into<String>) -> Rc<Self> {\n        Rc::new(Self {\n            label: label.into(),\n            children: RefCell::new(Vec::new()),\n            parent: RefCell::new(None),\n        })\n    }\n\n    pub fn attach(parent: &Rc<Self>, child: Rc<Self>) {\n        *child.parent.borrow_mut() = Some(Rc::clone(parent));\n        parent.children.borrow_mut().push(child);\n    }\n}\n```\nWhich statement most accurately diagnoses the leak and points at the canonical fix?',
        options: [
          '`Weak<T>` is faster than `Rc<T>` for read-heavy workloads, so swapping in `Weak` makes the side panel cheaper.',
          'Parent holds `Rc` to child *and* child holds `Rc` to parent — neither strong count can reach 0, so the whole subtree leaks. Change `parent: RefCell<Option<Rc<Node>>>` to `parent: RefCell<Weak<Node>>`, store `Rc::downgrade(parent)` in `attach`, and `.upgrade()` to walk upward.',
          '`Weak<T>` automatically drops child nodes when the parent is dropped — switching to `Weak` cascades the deletion.',
          '`Rc<T>` cannot hold the same type that holds an `Rc<T>` (the compiler rejects cycles), so this code does not actually compile.',
        ],
        correctIndex: 1,
        explanation:
          '`Rc<T>` back-pointers create reference cycles: parent holds `Rc` to child, child holds `Rc` to parent. Neither strong count can ever reach 0, so the whole subtree leaks — exactly what heaptrack shows. `Weak<T>` does not contribute to the strong count, so it breaks the cycle. The canonical pattern is `parent: RefCell<Weak<Node>>`, populated via `Rc::downgrade(parent)`, and consumed via `.upgrade()` which returns `Option<Rc<Node>>` (`None` once the parent is dropped). The compiler does *not* reject `Rc` cycles (it has no way to know your code constructs one), so option D is wrong.',
      },
      {
        kind: 'code',
        id: 'rust-6-code-1',
        prompt:
          'Use `Rc<RefCell<Vec<String>>>` to create a shared, mutable list. Add items from two different "owners" (variables holding `Rc` clones) and print the final list length.',
        boilerplate:
          'use std::cell::RefCell;\nuse std::rc::Rc;\n\nfn main() {\n    let shared_list: Rc<RefCell<Vec<String>>> = Rc::new(RefCell::new(Vec::new()));\n\n    // Clone the Rc for a second owner\n    let owner2 = Rc::clone(&shared_list);\n\n    // TODO: push "alpha" into shared_list via borrow_mut()\n    // TODO: push "beta" into owner2 via borrow_mut()\n    // Hint: shared_list.borrow_mut().push("alpha".to_string());\n\n    println!("len={}", shared_list.borrow().len());\n    println!("owners={}", Rc::strong_count(&shared_list));\n}\n',
        expectedOutput: 'len=2',
        explanation:
          '`Rc` provides shared ownership (reference counting) and `RefCell` provides interior mutability with runtime borrow checking. Together, `Rc<RefCell<T>>` lets multiple owners mutate the same data — the single-threaded counterpart of `Arc<Mutex<T>>`. See Rust Book Ch 15.5.',
      },
    ],
  },

  // ─── L7: Async Rust ──────────────────────────────────────────────────────────
  {
    id: 'rust-7',
    language: 'rust',
    level: 7,
    title: 'Async Rust: Futures, tokio & Cancellation',
    timeEstimate: '10-12 hours',
    intro: `By the end of this phase, you'll read async code and predict the four classic foot-guns: (1) calling \`std::fs::read\` inside an \`async fn\` (blocks the executor thread; use \`tokio::fs\` or \`spawn_blocking\`), (2) dropping a \`JoinHandle\` without awaiting it (task either continues detached or is cancelled — runtime dependent), (3) \`select!\` without a cancellation branch (long-running futures can never be cancelled), (4) buffered channels obscuring backpressure. You'll read \`Pin<&mut Self>\` in a hand-rolled \`Future::poll\` and know why moves are forbidden after polling starts. To debug an async program you'll add \`tokio-console\` or \`tracing\` spans, and you'll print \`tokio::runtime::Handle::current().metrics()\` when you suspect a stuck task.\n\nTo build the muscle, you'll write a \`tokio\` TCP echo server: accept loop, per-connection task with line-buffered echo, graceful shutdown on Ctrl-C via \`tokio::signal\` + \`select!\`.`,
    topics: [
      {
        label: 'Async Book — Under the Hood: Futures and Tasks',
        url: 'https://rust-lang.github.io/async-book/02_execution/01_chapter.html',
        note: 'Async Book ch 2',
      },
      {
        label: 'Async Book — Pinning',
        url: 'https://rust-lang.github.io/async-book/04_pinning/01_chapter.html',
        note: 'Async Book ch 4',
      },
      {
        label: 'tokio Tutorial — Hello Tokio',
        url: 'https://tokio.rs/tokio/tutorial/hello-tokio',
        note: 'tokio.rs tutorial',
      },
      {
        label: 'tokio Tutorial — Spawning',
        url: 'https://tokio.rs/tokio/tutorial/spawning',
        note: 'tokio.rs tutorial',
      },
      {
        label: 'tokio Tutorial — Channels & Backpressure',
        url: 'https://tokio.rs/tokio/tutorial/channels',
        note: 'tokio.rs tutorial',
      },
      {
        label: 'tokio::select! macro',
        url: 'https://tokio.rs/tokio/tutorial/select',
        note: 'tokio.rs tutorial',
      },
      {
        label: 'tokio::task::spawn_blocking',
        url: 'https://docs.rs/tokio/latest/tokio/task/fn.spawn_blocking.html',
        note: 'For blocking ops inside async',
      },
    ],
    deliverable:
      'Build locally: a `tokio` TCP echo server that accepts connections and echoes lines back, with graceful Ctrl-C shutdown via `tokio::signal` inside `select!`.',
    checks: [
      {
        kind: 'mcq',
        id: 'rust-7-mcq-1',
        prompt:
          'What does the `Future` trait\'s `poll` method return?',
        options: [
          '`Ok(T)` or `Err(E)`',
          '`Poll::Pending` if not ready, `Poll::Ready(T)` if the value is available',
          '`true` if ready, `false` otherwise',
          'A new `Future` to chain',
        ],
        correctIndex: 1,
        explanation:
          '`Future::poll` returns `Poll<Self::Output>`. If the work is complete it returns `Poll::Ready(value)`; otherwise it returns `Poll::Pending` and arranges for the `Waker` inside the `Context` to be invoked when progress can be made. See Async Book Ch 2.',
      },
      {
        kind: 'mcq',
        id: 'rust-7-mcq-2',
        prompt:
          'Why does async Rust require `Pin<&mut Self>` in the `Future::poll` signature?',
        options: [
          'To ensure the future is not copied, only moved.',
          'Because async state machines may contain self-referential pointers (e.g. references to local variables across await points); moving them after polling would invalidate those pointers.',
          'To satisfy the `Sync` bound required by multithreaded runtimes.',
          '`Pin` is a performance optimisation — it is not strictly required.',
        ],
        correctIndex: 1,
        explanation:
          'The compiler-generated async state machine can hold references into itself across `await` points. Moving such a struct would invalidate those references. `Pin<P>` guarantees the value will not be moved once it has been pinned. See Async Book Ch 4.',
      },
      {
        kind: 'mcq',
        id: 'rust-7-mcq-3',
        prompt:
          'What does this async program print?\n```rust\n#[tokio::main]\nasync fn main() {\n    let result = double(21).await;\n    println!("{}", result);\n}\n\nasync fn double(x: u32) -> u32 {\n    x * 2\n}\n```',
        options: ['"21"', '"42"', '"0"', 'compile error: `await` not in async context'],
        correctIndex: 1,
        explanation:
          '`double(21)` returns a `Future<Output = u32>`. `.await` polls it to completion, yielding 21 * 2 = 42. The `#[tokio::main]` attribute macro transforms `main` into a synchronous entry point that creates a tokio runtime. See tokio tutorial.',
      },
      {
        kind: 'mcq',
        id: 'rust-7-mcq-4',
        prompt:
          'What happens at runtime when using `tokio::select!` with two branches and one completes first?',
        options: [
          'Both branches are awaited to completion; the first result is used.',
          'The first branch to complete wins; the other future is dropped (cancelled).',
          'The program panics because only one branch can be active.',
          'The winning branch is re-polled until the other branch also completes.',
        ],
        correctIndex: 1,
        explanation:
          '`select!` polls all listed futures and returns when the *first* one completes. The remaining futures are dropped — their async operations are cancelled. This is the idiomatic way to race futures or implement timeouts (`tokio::time::timeout` uses this internally). Cancellation in async Rust means *the future is dropped before completion*. See tokio select! tutorial.',
      },
      {
        kind: 'mcq',
        id: 'rust-7-mcq-5',
        prompt:
          'What is the type inferred for `handle` in `let handle = tokio::spawn(async { 42u32 });`?',
        options: [
          '`Future<Output = u32>`',
          '`tokio::task::JoinHandle<u32>`',
          '`std::thread::JoinHandle<u32>`',
          '`Pin<Box<dyn Future<Output = u32>>>`',
        ],
        correctIndex: 1,
        explanation:
          '`tokio::spawn` returns a `JoinHandle<T>` where `T` is the output type of the spawned future. `handle.await` returns `Result<u32, JoinError>` — the `Result` accounts for the task panicking. This is distinct from `std::thread::JoinHandle` which is synchronous.',
      },
      {
        kind: 'mcq',
        id: 'rust-7-mcq-6',
        prompt:
          'On-call ticket: the `pricing` axum service freezes under load on staging at ~02:14 UTC. `tokio-prometheus` shows handler latency spiked from p99 ~14 ms to p99 ~12 s. `tokio-console` shows all 8 workers parked inside a single span. The flame graph fingers this handler:\n```rust\n// src/handlers/checkout.rs\nuse axum::{extract::State, Json};\nuse serde::{Deserialize, Serialize};\nuse crate::AppState;\n\n#[derive(Deserialize)]\npub struct CheckoutReq { pub cart_id: String }\n\n#[derive(Serialize)]\npub struct CheckoutResp { pub total_cents: i64 }\n\n/// Re-reads pricing config on every request so promo overrides take effect immediately.\npub async fn checkout(\n    State(state): State<AppState>,\n    Json(req): Json<CheckoutReq>,\n) -> Result<Json<CheckoutResp>, axum::http::StatusCode> {\n    // BUG: synchronous filesystem call inside the request path\n    let bytes = std::fs::read("/etc/pricing/config.json")\n        .map_err(|_| axum::http::StatusCode::INTERNAL_SERVER_ERROR)?;\n    let cfg: PricingConfig = serde_json::from_slice(&bytes)\n        .map_err(|_| axum::http::StatusCode::INTERNAL_SERVER_ERROR)?;\n\n    let total = state.engine.price(&req.cart_id, &cfg).await\n        .map_err(|_| axum::http::StatusCode::INTERNAL_SERVER_ERROR)?;\n\n    Ok(Json(CheckoutResp { total_cents: total.cents() }))\n}\n```\nThe runtime is `#[tokio::main]` (multi-thread, 8 workers) on a 4-vCPU pod. Which statement most accurately diagnoses the freeze and prescribes the right fix?',
        options: [
          'Swap the blocking call for `tokio::fs::read("/etc/pricing/config.json").await` — the tokio variant offloads to an internal blocking pool so request workers stay free.',
          'If a synchronous-only API must be called, wrap it: `tokio::task::spawn_blocking(|| std::fs::read("/etc/pricing/config.json")).await??` — moves the blocking call onto tokio\'s blocking pool.',
          'Both A and B fix the freeze; A is the idiomatic choice when a tokio equivalent exists, B is the general escape hatch for any blocking library call.',
          'Switch the runtime to `#[tokio::main(flavor = "current_thread")]` so the blocking call only stalls one virtual worker.',
        ],
        correctIndex: 2,
        explanation:
          'Classic async foot-gun: `std::fs::read` blocks the calling OS thread synchronously. Inside the tokio runtime, that thread is one of N executor workers — blocking it starves every other task scheduled on it. Under sustained load, all 8 workers end up stuck in the same `read` syscall and the service freezes — exactly matching the symptom. (A) `tokio::fs::read` delegates internally to a blocking pool so the worker thread stays available. (B) `tokio::task::spawn_blocking` is the generic escape hatch for any sync library. Both are correct; A is more idiomatic when a tokio equivalent exists. (D) is strictly worse — a single-threaded runtime blocked by one task freezes everything immediately, not gracefully.',
      },
      {
        kind: 'mcq',
        id: 'rust-7-mcq-7',
        prompt:
          'A flaky integration test in `crates/api/tests/audit.rs` fails ~1 in 20 runs with a missing log line. The test asserts that a background audit logger emitted both `"audit start"` and `"audit done"` after a request finishes. The test code:\n```rust\n// crates/api/tests/audit.rs\nuse tracing_test::traced_test;\n\n#[traced_test]\n#[tokio::test]\nasync fn audit_logs_both_lines() {\n    run_request().await;\n    assert!(logs_contain("audit start"));\n    assert!(logs_contain("audit done"));   // <-- intermittently fails\n}\n```\nThe production handler in `crates/api/src/audit.rs`:\n```rust\npub async fn fire_and_forget_audit(req: AuditReq) {\n    tokio::spawn(async move {\n        tracing::info!(?req, "audit start");\n        do_audit_work(req).await;       // ~30 ms of I/O\n        tracing::info!("audit done");\n    });\n    // returns immediately, JoinHandle dropped on the floor\n}\n```\nA reviewer asks: *why is the `"audit done"` line sometimes missing, and what is the canonical fix*?',
        options: [
          'Dropping the `JoinHandle` immediately cancels the task — that is why the second log line is missing. Keep the handle in a local to delay cancellation until the next `.await` point.',
          'When the test\'s `#[tokio::test]` returns, the per-test tokio runtime is dropped, and dropping the runtime drops every still-running task — so a slow background task may be cut off between `"audit start"` and `"audit done"`. The fix is to collect the `JoinHandle` (and `.await` it before the test ends), or use `tokio::task::JoinSet` for structured concurrency. *Dropping a `JoinHandle` does not cancel — runtime shutdown does.*',
          '`tokio::spawn` requires `\'static + Send`; the failure has nothing to do with task lifecycles.',
          'You must store every `JoinHandle` in a global `Lazy<Mutex<Vec<_>>>` to keep tasks alive in tests.',
        ],
        correctIndex: 1,
        explanation:
          'Two separate, frequently-confused facts. (1) Dropping a `JoinHandle` does *not* cancel the task — the task is *detached* and continues running. (2) When the runtime itself is dropped (because the `#[tokio::test]` function returned, or `#[tokio::main]` returned), it cancels every still-running task. The intermittent failure here is the second fact: sometimes `do_audit_work` finishes inside the 30 ms the test takes, sometimes it does not. The structured-concurrency fix is to return the `JoinHandle` (or push it into a `tokio::task::JoinSet`) and `.await` completion before the test exits. This is the canonical "fire-and-forget surprised me" async bug.',
      },
      {
        kind: 'mcq',
        id: 'rust-7-mcq-8',
        prompt:
          'You\'re reviewing a PR that adds graceful shutdown to the `echo-server` example. The current server in `examples/server/main.rs` keeps accepting connections forever — when ops sends `kill -INT`, the container takes the full 30s SIGTERM grace period before being SIGKILLed:\n```rust\n// examples/server/main.rs\nuse tokio::net::TcpListener;\nuse tokio::io::{AsyncReadExt, AsyncWriteExt};\n\nasync fn handle(mut socket: tokio::net::TcpStream) -> std::io::Result<()> {\n    let mut buf = [0u8; 1024];\n    loop {\n        let n = socket.read(&mut buf).await?;\n        if n == 0 { return Ok(()); }\n        socket.write_all(&buf[..n]).await?;\n    }\n}\n\n#[tokio::main]\nasync fn main() -> std::io::Result<()> {\n    let listener = TcpListener::bind("0.0.0.0:6379").await?;\n    tracing::info!("listening on 0.0.0.0:6379");\n    loop {\n        let (socket, _) = listener.accept().await?;   // line 22: no cancellation point\n        tokio::spawn(async move {\n            if let Err(e) = handle(socket).await {\n                tracing::warn!(error = %e, "connection ended in error");\n            }\n        });\n    }\n}\n```\nWhich rewrite of the accept loop is the **idiomatic tokio fix** for "exit promptly on Ctrl-C and stop accepting new connections"?',
        options: [
          'Wrap the loop body in `tokio::select!` racing the accept against `tokio::signal::ctrl_c()`:\n```rust\nloop {\n    tokio::select! {\n        res = listener.accept() => {\n            let (socket, _) = res?;\n            tokio::spawn(async move { let _ = handle(socket).await; });\n        }\n        _ = tokio::signal::ctrl_c() => {\n            tracing::info!("ctrl-c received, shutting down accept loop");\n            break;\n        }\n    }\n}\n```',
          'Install a sync signal handler with `std::process::exit(0)` so it tears down the process even from inside a blocking `accept`.',
          'Wrap the accept with `tokio::time::timeout(Duration::from_secs(1), listener.accept())` so the loop polls a shutdown flag every second.',
          'Set `RUST_LOG=info` and rely on the tokio runtime to translate SIGINT into a graceful shutdown automatically.',
        ],
        correctIndex: 0,
        explanation:
          'A naked `loop { listener.accept().await?; }` has no cancellation point — Ctrl-C never reaches the accept future on its own. The idiomatic tokio pattern is `tokio::select!` racing `listener.accept()` against `tokio::signal::ctrl_c()`. When the signal future completes first, the select arm drops the in-flight accept future (cancelling it cleanly because tokio futures are cancel-safe at await points) and breaks the loop. This is the foundation of graceful shutdown in tokio servers and is what hyper/axum/tonic all use under the hood. (B) is the "tear it all down" anti-pattern — no graceful close of in-flight connections. (C) wastes CPU and still has a 1-second worst-case shutdown delay. (D) is wishful thinking — the runtime does not auto-translate signals into loop exits.',
      },
      {
        kind: 'code',
        id: 'rust-7-code-1',
        prompt:
          'Write a basic async function `fetch_value` that returns a `u32`. Call it from an async `main` using `#[tokio::main]` and print the result. (For this exercise, just return a literal value — no I/O needed.)',
        boilerplate:
          '// Note: in a real project you would add `tokio = { version = "1", features = ["full"] }` to Cargo.toml\n\nasync fn fetch_value() -> u32 {\n    // TODO: return the value 42\n    // Hint: just write the value as the last expression (no semicolon)\n}\n\n#[tokio::main]\nasync fn main() {\n    let val = fetch_value().await;\n    println!("value={}", val);\n}\n',
        expectedOutput: 'value=42',
        explanation:
          'An `async fn` returns a `Future` that must be `.await`-ed to get the result. `#[tokio::main]` sets up a tokio runtime and converts `async fn main()` into a synchronous entry point. This is the foundation of all async Rust programs.',
      },
    ],
  },

  // ─── L8: Macros ─────────────────────────────────────────────────────────────
  {
    id: 'rust-8',
    language: 'rust',
    level: 8,
    title: 'Macros: Declarative and Procedural',
    timeEstimate: '8-10 hours',
    intro: `By the end of this phase, you'll read a \`macro_rules!\` definition and predict the expansion (\`cargo expand\` will let you confirm), spot hygiene leaks where an identifier introduced inside the macro accidentally collides with caller code, read a proc-macro \`TokenStream\` and predict the AST \`syn\` will parse it into, and read \`quote! { ... }\` blocks and know which \`#identifier\` substitutions reference which captured values. You'll learn that proc-macros run *during compilation* — so a \`panic!\` inside one is a compile-time error visible to the user, and that \`cargo expand\` plus \`println!\`-to-\`eprintln!\` (output goes to the build log) are your main debugging tools.\n\nTo build the muscle, you'll write a tiny \`#[derive(Builder)]\` proc-macro crate using \`syn\` + \`quote\`, plus a consumer binary that uses the generated builder.`,
    topics: [
      {
        label: 'Macros — Declarative Macros with macro_rules!',
        url: 'https://doc.rust-lang.org/book/ch20-06-macros.html',
        note: 'The Book ch 20.6',
      },
      {
        label: 'The Little Book of Rust Macros',
        url: 'https://veykril.github.io/tlborm/',
        note: 'Comprehensive macro_rules! reference',
      },
      {
        label: 'Procedural Macros — The Reference',
        url: 'https://doc.rust-lang.org/reference/procedural-macros.html',
        note: 'Rust Reference — proc-macro chapter',
      },
      {
        label: 'syn crate — Rust syntax parsing',
        url: 'https://docs.rs/syn/latest/syn/',
        note: 'docs.rs/syn',
      },
      {
        label: 'quote crate — quasi-quoting for proc-macros',
        url: 'https://docs.rs/quote/latest/quote/',
        note: 'docs.rs/quote',
      },
      {
        label: 'cargo-expand',
        url: 'https://github.com/dtolnay/cargo-expand',
        note: 'See what your macros expand to',
      },
    ],
    deliverable:
      'Build locally: a small `#[derive(Builder)]` proc-macro crate using `syn` + `quote`, with a consumer binary demonstrating the generated builder.',
    checks: [
      {
        kind: 'mcq',
        id: 'rust-8-mcq-1',
        prompt:
          'What is the key difference between a `macro_rules!` macro and a procedural macro?',
        options: [
          '`macro_rules!` macros are faster at runtime; procedural macros are faster at compile time.',
          '`macro_rules!` macros match token patterns and substitute; procedural macros are Rust programs that receive and emit `TokenStream` values, enabling arbitrary code generation.',
          '`macro_rules!` macros can only be used in `main.rs`; procedural macros can be used anywhere.',
          'There is no practical difference — they compile to the same code.',
        ],
        correctIndex: 1,
        explanation:
          '`macro_rules!` is a pattern-matching system built into the compiler. Procedural macros are compiled Rust programs (in a special `proc-macro` crate) that operate on `TokenStream` — they can parse the full Rust AST via `syn` and generate arbitrary code via `quote`. See Rust Book Ch 20.6.',
      },
      {
        kind: 'mcq',
        id: 'rust-8-mcq-2',
        prompt:
          'Which `macro_rules!` fragment specifier matches a Rust expression?',
        options: ['`:ty`', '`:ident`', '`:expr`', '`:stmt`'],
        correctIndex: 2,
        explanation:
          '`:expr` matches a Rust expression (e.g. `1 + 2`, `foo()`, `if x { y } else { z }`). `:ident` matches an identifier, `:ty` matches a type, and `:stmt` matches a statement. Choosing the wrong specifier is a common macro bug.',
      },
      {
        kind: 'mcq',
        id: 'rust-8-mcq-3',
        prompt:
          'What does this program print?\n```rust\nmacro_rules! my_vec {\n    ( $( $x:expr ),* ) => {\n        {\n            let mut v = Vec::new();\n            $( v.push($x); )*\n            v\n        }\n    };\n}\n\nfn main() {\n    let v: Vec<i32> = my_vec![10, 20, 30];\n    let sum: i32 = v.iter().sum();\n    println!("{}", sum);\n}\n```',
        options: ['"10"', '"30"', '"60"', 'compile error: macro_rules! does not support iteration'],
        correctIndex: 2,
        explanation:
          'The `$( $x:expr ),*` pattern matches zero-or-more comma-separated expressions. The `$( v.push($x); )*` repetition expands to three `push` calls: 10, 20, 30. Sum = 60. This is the canonical "implement vec!" exercise. See The Little Book of Rust Macros.',
      },
      {
        kind: 'mcq',
        id: 'rust-8-mcq-4',
        prompt:
          'What Cargo.toml setting is *required* to create a procedural macro crate?',
        options: [
          '`edition = "2021"` in `[package]`',
          '`proc-macro = true` in `[lib]`',
          '`crate-type = ["cdylib"]` in `[lib]`',
          '`features = ["proc-macro"]` in `[dependencies]`',
        ],
        correctIndex: 1,
        explanation:
          'A proc-macro crate must declare `proc-macro = true` under `[lib]` in Cargo.toml. This tells the compiler to build it as a special dynamic library that is loaded during compilation of dependent crates. Without this flag, `proc_macro::TokenStream` is unavailable.',
      },
      {
        kind: 'mcq',
        id: 'rust-8-mcq-5',
        prompt:
          'In a derive proc-macro, what does the `syn` crate parse the `TokenStream` input into?',
        options: [
          'A `String` of the source code',
          'A `Vec<Token>` of raw tokens',
          'A `DeriveInput` — a typed AST representing the struct/enum the derive was applied to',
          'An `Ident` representing only the item name',
        ],
        correctIndex: 2,
        explanation:
          '`syn::parse_macro_input!(input as syn::DeriveInput)` produces a `DeriveInput` that contains the item\'s name, generics, and data (fields for structs, variants for enums). This typed AST is far easier to work with than raw tokens. `quote!` then converts your generated code back to a `TokenStream`.',
      },
      {
        kind: 'mcq',
        id: 'rust-8-mcq-6',
        prompt:
          'A junior engineer wrote a "convenience" `swap!` macro in `crates/utils/src/macros.rs` and a unit test for the new feature flag flipper:\n```rust\n// crates/utils/src/macros.rs\n#[macro_export]\nmacro_rules! swap {\n    ($a:expr, $b:expr) => {{\n        let tmp = $a;\n        $a = $b;\n        $b = tmp;\n    }};\n}\n```\n```rust\n// crates/utils/tests/swap.rs\nuse utils::swap;\n\n#[test]\nfn swap_two_variables() {\n    let mut tmp = 1;\n    let mut x = 2;\n    swap!(tmp, x);\n    assert_eq!(tmp, 2);\n    assert_eq!(x, 1);\n}\n```\nThe test fails:\n```\nrunning 1 test\nthread \'swap_two_variables\' panicked at crates/utils/tests/swap.rs:9:5:\nassertion `left == right` failed\n  left: 2\n right: 1\n```\nActual: `tmp=2, x=2`. Which statement most accurately diagnoses the bug?',
        options: [
          'Macro hygiene is *not* broken here — the bug is unrelated to identifier scoping. Use distinct names or replace with `mem::swap`.',
          '`macro_rules!` is hygienic for *new* identifiers — `let tmp = $a;` inside the macro is a *different* `tmp` than the caller\'s. But after substitution `$a = $b;` becomes `tmp = x;` referring to the *caller\'s* `tmp`, which by then has been shadowed in the inner block. Net effect: the inner shadow swallows the assignment and the caller\'s `tmp` never gets written. Fix: pick a never-going-to-collide internal name (e.g. `__swap_tmp_$_macro`) or — far better — call `std::mem::swap(&mut $a, &mut $b);`.',
          'The bug is unrelated to hygiene — it is an iterator-invalidation issue.',
          'You must call `swap!` inside an `unsafe` block; macro substitution requires it.',
        ],
        correctIndex: 1,
        explanation:
          '`macro_rules!` *is* hygienic for identifiers introduced *inside* the macro (`let tmp = $a;` introduces a `tmp` that does not collide with the caller\'s). But the macro\'s use of the bare identifier `tmp` on the second line refers to the macro-introduced `tmp`, while `$a = $b;` after substitution becomes `tmp = x;` — which the caller reads as their own outer `tmp`. The two `tmp`s interact in the exact order: read caller `tmp` into inner shadow → assign `x` into caller `tmp` → assign inner shadow back into `x`. Result: `tmp` = old `x` = `2`, `x` is also overwritten back to `2`. The reliable fix is `std::mem::swap(&mut $a, &mut $b)`. See The Little Book of Rust Macros — "Hygiene".',
      },
      {
        kind: 'mcq',
        id: 'rust-8-mcq-7',
        prompt:
          'Your `#[derive(Builder)]` proc-macro lives in `crates/builder-derive/`. A consumer applies it to an enum by accident, and `cargo build -p consumer` prints:\n```\n$ cargo build -p consumer\n   Compiling consumer v0.2.0 (/workspace/crates/consumer)\nerror: proc-macro derive panicked\n --> crates/consumer/src/types.rs:5:10\n  |\n5 | #[derive(Builder)]\n  |          ^^^^^^^\n  |\n  = help: message: called `Result::unwrap()` on an `Err` value: Error("expected struct, got enum")\n\nerror: could not compile `consumer` (lib) due to 1 previous error\n```\nThe proc-macro source:\n```rust\n// crates/builder-derive/src/lib.rs\nuse proc_macro::TokenStream;\nuse syn::{parse_macro_input, Data, DeriveInput};\nuse quote::quote;\n\n#[proc_macro_derive(Builder)]\npub fn derive_builder(input: TokenStream) -> TokenStream {\n    let input = parse_macro_input!(input as DeriveInput);\n    let fields = match input.data {\n        Data::Struct(s) => s.fields,\n        _ => panic!("expected struct, got enum"),    // <-- ugly diagnostic\n    };\n    let name = &input.ident;\n    quote! {\n        impl #name {\n            // ... builder methods ...\n        }\n    }.into()\n}\n```\nWhich rewrite produces a *user-friendly* compile error that points at the consumer\'s offending `enum` instead of a "proc-macro derive panicked"?',
        options: [
          'Return a `TokenStream` from a `syn::Error` instead of panicking: `let fields = match input.data { Data::Struct(s) => s.fields, _ => return syn::Error::new(input.ident.span(), "Builder only supports structs").to_compile_error().into(), };`.',
          'Wrap the whole macro body in `std::panic::catch_unwind` so panics become recoverable values.',
          'Add `#[allow(panic)]` to the function body so the compiler downgrades the panic to a warning.',
          'Use `eprintln!("expected struct");` instead of `panic!`; eprintln output replaces the diagnostic.',
        ],
        correctIndex: 0,
        explanation:
          'A proc-macro that panics surfaces a "proc-macro derive panicked" diagnostic with the raw panic message — useless to consumers and pointing at the `#[derive]` token rather than the offending input. The user-friendly pattern is to return a `TokenStream` containing a `syn::Error::new(span, "message").to_compile_error()`. This produces a normal compile error pointing at a span you choose (typically `input.ident.span()`). Well-behaved derive crates (serde, thiserror) do exactly this. (B) compiles but the macro framework treats `catch_unwind` output as a still-panicked macro. (C) and (D) are not real Rust mechanisms for proc-macro error reporting.',
      },
      {
        kind: 'mcq',
        id: 'rust-8-mcq-8',
        prompt:
          'After the team merges a `User` struct with a private `email` field, the example binary that previously compiled now errors:\n```\n$ cargo build -p consumer\n   Compiling consumer v0.3.0 (/workspace/crates/consumer)\nerror[E0616]: field `email` of struct `User` is private\n  --> crates/consumer/src/main.rs:14:7\n   |\n14 |     u.email = "a@b.com".to_string();\n   |       ^^^^^ private field\n\nerror[E0451]: field `email` of struct `User` is private\n  --> crates/consumer/src/main.rs:18:32\n   |\n18 |     let u2 = UserBuilder::new().email("c@d.com").build();\n   |                                ^^^^^^^^^^^^^^^^^ private field accessed by name\n```\nThe relevant code:\n```rust\n// crates/users/src/lib.rs\n#[derive(builder_derive::Builder, Debug)]\npub struct User {\n    pub id: u64,\n    email: String,           // private field — only `email()` setter should access\n}\n```\n```rust\n// crates/consumer/src/main.rs\nuse users::User;\n\nfn main() {\n    let mut u = User { id: 1, email: String::new() };\n    u.email = "a@b.com".to_string();                   // line 14: direct private write\n    let u2 = UserBuilder::new().email("c@d.com").build(); // line 18: setter touching private\n}\n```\nThe proc-macro currently generates `pub fn email(mut self, v: String) -> Self { self.email = v; self }`. Why does the *setter* call also fail and what is the canonical fix?',
        options: [
          'Derive proc-macros run inside the consumer crate, so they cannot see private fields at all. Move the derive to the defining crate to fix it.',
          'Derive proc-macros generate code that is *spliced next to the struct definition*, so the generated `impl` *can* freely access private fields of `User`. Line 14 fails because the consumer is writing the field directly from outside the defining module. Line 18 fails because the user wrote `UserBuilder` themselves and assigned `self.email` from a module that does not have access. Canonical fix: have the proc-macro emit the `impl UserBuilder { pub fn email(...) }` *inside the same module as `User`* — that impl can legally touch private fields — and let consumers call the public method instead of poking the field directly.',
          'Add `#[builder(private)]` to skip private fields entirely.',
          'Mark the entire `User` struct `pub` to bypass per-field visibility.',
        ],
        correctIndex: 1,
        explanation:
          'Proc-macro derives produce `impl` blocks that are emitted into the *module where the derive is applied* — so they have full access to that struct\'s private fields. The compiler errors are reported at the *consumer* site, not at the impl: line 14 directly writes `u.email` from outside the defining module; line 18 fails because the setter shown is not the one generated by the derive — the snippet in the question text models what the consumer wrote, which assigns `self.email` from outside the defining module. The fix is to let the derive own the public setter (a public `fn email(self, v: String) -> Self { self.email = v; self }` next to `User`) so consumers go through it, and to stop the consumer from touching `u.email` directly. Reading "field is private" errors requires distinguishing the *site of the error* (consumer code) from the *site of the field declaration* (defining module).',
      },
      {
        kind: 'code',
        id: 'rust-8-code-1',
        prompt:
          'Write a declarative macro `repeat_print!` that takes an expression and a count, and prints the expression that many times. Use `macro_rules!` with a repetition pattern.',
        boilerplate:
          'macro_rules! repeat_print {\n    ($val:expr, $count:expr) => {\n        // TODO: use a for loop to print $val exactly $count times\n        // Hint: for _ in 0..$count { println!("{}", $val); }\n    };\n}\n\nfn main() {\n    repeat_print!("hello", 3);\n}\n',
        expectedOutput: 'hello\nhello\nhello',
        explanation:
          '`macro_rules!` macros use pattern matching on token trees. The `$val:expr` and `$count:expr` fragment specifiers capture Rust expressions. The macro body expands at compile time, and the generated code runs the loop. This is a simple but practical example of declarative macros.',
      },
    ],
  },

  // ─── L9: Unsafe Rust & FFI ──────────────────────────────────────────────────
  {
    id: 'rust-9',
    language: 'rust',
    level: 9,
    title: 'Unsafe Rust, FFI & Embedded (no_std)',
    timeEstimate: '10-12 hours',
    intro: `By the end of this phase, you'll read \`unsafe\` blocks and recognise the four superpowers (deref raw pointers, call unsafe fns, access mut statics, impl unsafe traits) plus the invariants you must uphold for each. You'll read \`extern "C"\` blocks and know that calling them is implicitly \`unsafe\`, that all data crossing the boundary must be \`#[repr(C)]\`, and that C strings must be null-terminated (\`CString\` / \`CStr\`, not \`String\` / \`&str\`). You'll read \`mem::transmute\` and \`MaybeUninit\` and immediately reach for the Nomicon to check whether the cast is sound. For debugging UB, you'll learn that Miri (run via \`cargo +nightly miri test\`) detects most cases that escape the compiler.\n\nTo build the muscle, you'll write a \`ffi-demo\` CLI that wraps C's \`qsort\` and a custom C \`add\` function via \`extern "C"\`, with safe Rust wrappers, documented safety invariants, and \`cargo test\`.`,
    topics: [
      {
        label: 'Unsafe Rust — The Book',
        url: 'https://doc.rust-lang.org/book/ch20-01-unsafe-rust.html',
        note: 'The Book ch 20.1',
      },
      {
        label: 'The Rustonomicon — Unsafe Rust deep-dive',
        url: 'https://doc.rust-lang.org/nomicon/',
        note: 'Nomicon — read ch 1-4',
      },
      {
        label: 'Calling C code from Rust (extern "C")',
        url: 'https://doc.rust-lang.org/nomicon/ffi.html',
        note: 'Nomicon — FFI chapter',
      },
      {
        label: 'CString and CStr — null-terminated FFI strings',
        url: 'https://doc.rust-lang.org/std/ffi/struct.CString.html',
        note: 'std::ffi::CString',
      },
      {
        label: 'bindgen — auto-generate Rust FFI bindings',
        url: 'https://rust-lang.github.io/rust-bindgen/',
        note: 'rust-lang.github.io/rust-bindgen',
      },
      {
        label: 'no_std and the Embedded Rust Book',
        url: 'https://docs.rust-embedded.org/book/',
        note: 'docs.rust-embedded.org/book',
      },
      {
        label: 'Miri — UB detector',
        url: 'https://github.com/rust-lang/miri',
        note: 'github.com/rust-lang/miri',
      },
    ],
    deliverable:
      'Build locally: a `ffi-demo` CLI that wraps C\'s `qsort` and a custom C `add` function via `extern "C"`, with safe Rust wrappers, documented safety invariants, and `cargo test` coverage.',
    checks: [
      {
        kind: 'mcq',
        id: 'rust-9-mcq-1',
        prompt:
          'Which of the following is NOT something you can do inside an `unsafe` block that you cannot do in safe Rust?',
        options: [
          'Dereference raw pointers.',
          'Call functions or methods marked `unsafe`.',
          'Access or modify mutable static variables.',
          'Panic with a custom message using `panic!()`.',
        ],
        correctIndex: 3,
        explanation:
          '`panic!()` is perfectly safe — it unwinds or aborts the process cleanly through Rust\'s defined panic mechanism. The four genuine unsafe superpowers are: dereference raw pointers, call unsafe functions/methods, access/modify mutable statics, and implement unsafe traits. See Rust Book Ch 20.1.',
      },
      {
        kind: 'mcq',
        id: 'rust-9-mcq-2',
        prompt:
          'What must every `extern "C"` block\'s function declaration include that a normal Rust `fn` does not?',
        options: [
          'A return type annotation — foreign functions always return `i32`.',
          'The function body.',
          'The `unsafe` keyword on the `fn` — all FFI functions are implicitly unsafe to call.',
          'A `#[no_mangle]` attribute.',
        ],
        correctIndex: 2,
        explanation:
          'All functions declared in `extern "C"` blocks are automatically considered `unsafe` to call because Rust cannot verify the safety guarantees of foreign code. You must call them inside an `unsafe` block. `#[no_mangle]` is required when *exporting* a Rust function to C, not when importing. See Nomicon FFI chapter.',
      },
      {
        kind: 'mcq',
        id: 'rust-9-mcq-3',
        prompt:
          'What does this program print?\n```rust\nfn main() {\n    let x: i32 = 99;\n    let raw = &x as *const i32;\n    unsafe {\n        println!("{}", *raw);\n    }\n}\n```',
        options: ['"0"', '"99"', 'undefined behaviour — may print anything', 'compile error: raw pointers require `mut`'],
        correctIndex: 1,
        explanation:
          'Creating a raw pointer from a valid reference and dereferencing it immediately is well-defined (though it requires `unsafe`). The raw pointer points to `x` on the stack. `*raw` dereferences it, yielding 99. The `unsafe` block is required by the compiler because raw pointer dereferences bypass borrow checking. See Rust Book Ch 20.1.',
      },
      {
        kind: 'mcq',
        id: 'rust-9-mcq-4',
        prompt:
          'What does the `#[no_mangle]` attribute do when applied to a Rust function?',
        options: [
          'Prevents the function from being optimised away by the compiler.',
          'Tells the linker to preserve the exact function name as written, preventing Rust\'s name mangling — required for C to call the function by name.',
          'Marks the function as `unsafe` for callers.',
          'Disables inlining for the function.',
        ],
        correctIndex: 1,
        explanation:
          'Rust normally mangles function names to encode type information (similar to C++). `#[no_mangle]` disables this so the exported symbol has the exact name you wrote. This is required when writing Rust functions meant to be called from C via a header. The counterpart on the C side uses the plain function name.',
      },
      {
        kind: 'mcq',
        id: 'rust-9-mcq-5',
        prompt:
          'In a `no_std` Rust crate, which of the following is NOT available?',
        options: [
          'The `core` crate (primitive operations, iterators, slices)',
          'The `alloc` crate (when a global allocator is provided)',
          'Stack-allocated arrays and `&[T]` slices',
          'The `std::fs` file system API',
        ],
        correctIndex: 3,
        explanation:
          '`no_std` removes the `std` crate which depends on OS services (file system, networking, threads, heap). `core` is always available — it has no OS or allocator dependencies. `alloc` is available if you provide a `#[global_allocator]`. Stack allocation and slices work fine without `std`. See the Embedded Rust Book.',
      },
      {
        kind: 'mcq',
        id: 'rust-9-mcq-6',
        prompt:
          'On-call: a thin C-interop wrapper used by your `legacy-bridge` service occasionally segfaults under load. Customer logs show:\n```\n[2026-05-24T11:02:33Z] level=ERROR svc=legacy-bridge req=4f1d... pod=bridge-7ff\nthread \'tokio-runtime-worker\' caught fatal signal: 11 (SIGSEGV) address=0x000000010ab74000\n  0: <unknown>\n  1: bridge::ffi::cstr_len::h12ab\n  2: bridge::handlers::lookup::h034c\n```\nThe wrapper:\n```rust\n// crates/legacy-bridge/src/ffi.rs\nuse libc::{c_char, size_t};\n\nextern "C" {\n    fn strlen(s: *const c_char) -> size_t;\n}\n\n/// Walks the C string `s` and returns its length in bytes.\n///\n/// Used to compute the truncation point before forwarding a customer ID\n/// to the legacy session service.\npub fn cstr_len(s: &str) -> usize {\n    unsafe { strlen(s.as_ptr() as *const c_char) }\n}\n```\nWhich statement diagnoses the root cause?',
        options: [
          'Rust `&str` is a pointer + length and is *not* null-terminated. Passing its raw pointer to C\'s `strlen` is UB: `strlen` keeps scanning past the slice end until it stumbles on a stray `\\0` (sometimes inside the same page, sometimes off the end into an unmapped page — hence the intermittent SIGSEGV). The fix is `std::ffi::CString::new(s)?` to build a null-terminated copy, then `strlen(c.as_ptr())`.',
          'The cast `as *const c_char` is wrong; you must use `as *mut c_char`.',
          '`strlen` requires `unsafe impl Send` on the wrapper before tokio will schedule it.',
          'The fix is to allocate the string in a `Box<str>` first; that adds the missing null byte.',
        ],
        correctIndex: 0,
        explanation:
          'Rust strings are pointer + length and are deliberately *not* null-terminated. Passing `&str`\'s raw pointer to any C function expecting a `const char *` is UB — `strlen` scans forward until it stumbles on a zero byte. Sometimes it finds one in the next allocation and "works" (returning a too-large length); sometimes it walks into an unmapped page and segfaults. The canonical fix is `std::ffi::CString::new(s)?` (copies the bytes and appends `\\0`), then call `strlen(cstring.as_ptr())`. The reverse direction (C → Rust) is `CStr::from_ptr`. This is the single most common FFI bug. See the Nomicon FFI chapter.',
      },
      {
        kind: 'mcq',
        id: 'rust-9-mcq-7',
        prompt:
          'A new test pipeline runs the bridge crate under `--release` and the result is nonsense — debug builds pass, release builds fail:\n```\n$ cargo test --release -p bridge-aliasing -- --nocapture\n   Compiling bridge-aliasing v0.1.0\n    Finished `release` profile [optimized] target(s)\n     Running unittests src/lib.rs\n\nrunning 1 test\nexpected: 2, got: 1\nthread \'main\' panicked at \'assertion `left == right` failed\', tests/aliasing.rs:14:5\n\n$ cargo +nightly miri test -p bridge-aliasing\nerror: Undefined Behavior: trying to retag from <2918> for Unique permission at alloc1234[0x0], but that tag does not exist in the borrow stack for this location\n  --> crates/bridge-aliasing/src/lib.rs:5:5\n   |\n5  |     *b = 2;\n   |     ^^^^^^ trying to retag from <2918> for Unique permission\n```\nThe code:\n```rust\n// crates/bridge-aliasing/src/lib.rs\npub fn alias_two_mut(a: &mut u32, b: &mut u32) {\n    *a = 1;\n    *b = 2;\n}\n\npub fn run() -> u32 {\n    let mut x = 0u32;\n    let p = &mut x as *mut u32;\n    // \"both pointers really do alias\" — that\'s the intent of the test fixture\n    unsafe { alias_two_mut(&mut *p, &mut *p); }\n    x\n}\n```\nWhich statement diagnoses the root cause?',
        options: [
          'The Rust optimiser is miscompiling the program; file a `rustc` issue.',
          'Constructing two simultaneous `&mut u32` to the same memory is **Undefined Behaviour** under Rust\'s aliasing rules — even when produced through raw pointers and `unsafe`. The optimiser is entitled to assume `a` and `b` do not alias (LLVM `noalias`), so it may reorder, fold, or skip the writes. Miri\'s borrow-stack diagnostic confirms it. Safe fix: keep raw pointers (`*mut u32`) throughout and dereference them inline, or wrap the storage in `UnsafeCell<u32>` to opt out of `noalias`.',
          'Add `#[inline(never)]` to `alias_two_mut`; the issue is purely an inlining heuristic.',
          'Wrap `x` in a `Mutex<u32>` — `Mutex` makes aliasing legal at runtime.',
        ],
        correctIndex: 1,
        explanation:
          'Rust\'s aliasing rules constrain *references themselves*, not just code written in safe blocks. Creating two `&mut T` to the same memory is UB regardless of whether the construction site used `unsafe`. The optimiser exploits the implied LLVM `noalias` attribute — in `--release` it may reorder, fold, or skip writes, producing exactly the "expected 2, got 1" symptom. The Miri trace ("trying to retag … that tag does not exist in the borrow stack") is the standard diagnostic for this class of bug. To legitimately share writes through two pointers, keep them as raw `*mut T` and never materialise both as `&mut` simultaneously, or wrap the storage in `UnsafeCell<T>`, which opts the location out of `noalias`. See Nomicon — "Aliasing".',
      },
      {
        kind: 'mcq',
        id: 'rust-9-mcq-8',
        prompt:
          'Your firmware crate `crates/firmware-router` targets an STM32F4 board (`thumbv7em-none-eabihf`). After a teammate adds a small lookup helper, the cross-compile fails:\n```\n$ cargo build --release -p firmware-router --target thumbv7em-none-eabihf\n   Compiling firmware-router v0.4.1 (/workspace/crates/firmware-router)\nerror[E0463]: can\'t find crate for `std`\n --> crates/firmware-router/src/lookup.rs:1:5\n  |\n1 | use std::collections::HashMap;\n  |     ^^^ can\'t find crate\n  |\n  = note: the `thumbv7em-none-eabihf` target may not support the standard library\n  = help: did you mean to use `alloc::collections::BTreeMap`?\n\nerror: could not compile `firmware-router` (lib) due to 1 previous error\n```\nThe crate root has `#![no_std]` and the lookup module:\n```rust\n// crates/firmware-router/src/lookup.rs\nuse std::collections::HashMap;\nuse crate::message::MsgId;\n\npub struct Router {\n    routes: HashMap<MsgId, fn(&[u8])>,\n}\n```\nWhich is the *correct minimal fix* that keeps the embedded target compiling?',
        options: [
          'Remove `#![no_std]` from the crate root — embedded crates always have `std` available on `thumbv7em-none-eabihf`.',
          'Replace `std::collections::HashMap` with a `no_std`-compatible alternative — `hashbrown::HashMap` (the actual implementation backing `std::collections::HashMap`, standalone-usable in `no_std` once you supply a hasher) for hashing, or `alloc::collections::BTreeMap` if you can tolerate O(log n) and only need `alloc`.',
          'Switch the build target to `x86_64-unknown-linux-gnu` so `std` is available.',
          'Add `extern crate std;` at the top of `lib.rs` to override the `#![no_std]` attribute.',
        ],
        correctIndex: 1,
        explanation:
          '`#![no_std]` removes the `std` crate. `std::collections::HashMap` depends on OS-provided RNG seeding for its `RandomState`, which is not available without `std`. On `no_std` the idiomatic choices are: (1) `hashbrown::HashMap` (the actual implementation backing `std::collections::HashMap`, standalone with `no_std` support — you supply a hasher), or (2) `alloc::collections::BTreeMap` (needs only `alloc`, O(log n)). (A) breaks the embedded target. (C) defeats the entire purpose. (D) does not work — `extern crate std;` on a target without an `std` crate still fails. See the Embedded Rust Book.',
      },
      {
        kind: 'code',
        id: 'rust-9-code-1',
        prompt:
          'Use `unsafe` to dereference a raw pointer. Create an `i32` variable, obtain a `*const i32` raw pointer to it, then dereference the pointer inside an `unsafe` block to read the value.',
        boilerplate:
          'fn main() {\n    let x: i32 = 42;\n    let raw_ptr: *const i32 = &x as *const i32;\n\n    // TODO: dereference `raw_ptr` inside an unsafe block and print the value\n    // Hint: unsafe { println!("{}", *raw_ptr); }\n}\n',
        expectedOutput: '42',
        explanation:
          'Creating a raw pointer from a valid reference is safe, but dereferencing it requires `unsafe` because the compiler cannot guarantee the pointer is valid at that point. This is one of the four "unsafe superpowers" in Rust (Book Ch 20.1).',
      },
    ],
  },

  // ─── L10: Performance & Advanced Traits ─────────────────────────────────────
  {
    id: 'rust-10',
    language: 'rust',
    level: 10,
    title: 'Performance, Benchmarking & Advanced Trait Design',
    timeEstimate: '12-15 hours',
    intro: `By the end of this phase, you'll read a flamegraph and identify hot frames by width, read \`criterion\` output and distinguish a real regression from noise (overlapping confidence intervals), read \`cargo expand\` output to confirm a macro is generating what you expect, and read \`perf stat\` counters to tell a cache-miss problem from a branch-mispredict problem. You'll read advanced trait signatures: HRTBs (\`for<'a>\`), sealed traits (private super-trait pattern), GATs (\`type Item<'a>\`), and type-state patterns where the state is a generic parameter. For perf debugging, \`cargo flamegraph\` is the first hammer; \`heaptrack\` for allocations; \`cargo bench\` (criterion) for micro-benchmarks; \`perf stat -e cache-misses,branch-misses,cycles\` for the underlying CPU counters.\n\nTo build the muscle, you'll write a CLI tool benchmarked with criterion, flamegraph-profiled, with custom alloc stats via jemallocator — and a \`BENCH.md\` documenting before/after.`,
    topics: [
      {
        label: 'cargo flamegraph',
        url: 'https://github.com/flamegraph-rs/flamegraph',
        note: 'flamegraph-rs/flamegraph on GitHub',
      },
      {
        label: 'criterion — statistical benchmarking',
        url: 'https://docs.rs/criterion/latest/criterion/',
        note: 'docs.rs/criterion',
      },
      {
        label: 'The Rust Performance Book',
        url: 'https://nnethercote.github.io/perf-book/',
        note: 'nnethercote.github.io/perf-book',
      },
      {
        label: 'Higher-Ranked Trait Bounds (HRTBs)',
        url: 'https://doc.rust-lang.org/nomicon/hrtb.html',
        note: 'Nomicon — HRTB chapter',
      },
      {
        label: 'Generic Associated Types (GATs)',
        url: 'https://blog.rust-lang.org/2022/10/28/gats-stabilization.html',
        note: 'Rust blog — GAT stabilization',
      },
      {
        label: 'Advanced Traits — The Book',
        url: 'https://doc.rust-lang.org/book/ch20-02-advanced-traits.html',
        note: 'The Book ch 20.2',
      },
      {
        label: 'tikv-jemallocator — faster allocator on Linux',
        url: 'https://docs.rs/tikv-jemallocator/',
        note: 'docs.rs/tikv-jemallocator',
      },
    ],
    deliverable:
      'Build locally: a CLI tool benchmarked with criterion, flamegraph profiled, custom alloc stats via jemallocator, before/after documented in `BENCH.md`.',
    checks: [
      {
        kind: 'mcq',
        id: 'rust-10-mcq-1',
        prompt:
          'Why does `criterion` use statistical sampling rather than running a benchmark once and measuring total time?',
        options: [
          'Because Rust benchmarks are non-deterministic.',
          'To amortise OS scheduling jitter, CPU frequency scaling, and cache effects — a single measurement is unreliable; criterion runs hundreds of iterations and computes mean ± standard deviation.',
          'Because `cargo test` does not support single-run benchmarks.',
          'To work around the fact that Rust functions cannot be timed directly.',
        ],
        correctIndex: 1,
        explanation:
          'Modern hardware introduces significant variance (cache misses, branch predictor warm-up, OS preemption). Criterion runs the benchmark in a tight loop, collects samples, and reports mean, median, and confidence intervals — making it much harder to draw wrong conclusions from lucky or unlucky timing.',
      },
      {
        kind: 'mcq',
        id: 'rust-10-mcq-2',
        prompt:
          'What does a Higher-Ranked Trait Bound `where F: for<\'a> Fn(&\'a str) -> &\'a str` express?',
        options: [
          '`F` must work for one specific lifetime `\'a` chosen by the caller.',
          '`F` must be a closure, not a function pointer.',
          '`F` must work for *any* lifetime `\'a` — the bound is universally quantified over all lifetimes.',
          '`F` must return a `\'static` reference.',
        ],
        correctIndex: 2,
        explanation:
          'HRTBs (`for<\'a>`) express that the bound must hold for every possible lifetime. This is needed for closures that borrow their argument and return it, because the lifetime is not fixed at the call site — it varies with each invocation. See Nomicon HRTB chapter.',
      },
      {
        kind: 'mcq',
        id: 'rust-10-mcq-3',
        prompt:
          'What does this program print?\n```rust\nfn sum_to_n(n: u64) -> u64 {\n    n * (n + 1) / 2\n}\n\nfn main() {\n    println!("{}", sum_to_n(100));\n}\n```',
        options: ['"100"', '"5000"', '"5050"', '"10100"'],
        correctIndex: 2,
        explanation:
          'The Gaussian formula n*(n+1)/2 gives the sum of integers 1 through n. For n=100: 100 * 101 / 2 = 10100 / 2 = 5050. This is O(1) vs the O(n) loop, and criterion benchmarks typically show the formula is dramatically faster for large n.',
      },
      {
        kind: 'mcq',
        id: 'rust-10-mcq-4',
        prompt:
          'The "newtype pattern" in Rust wraps an existing type in a single-field tuple struct. What problem does it solve?',
        options: [
          'It makes the wrapped type implement `Copy` automatically.',
          'It allows implementing foreign traits on foreign types, working around the orphan rule, and creating distinct types with the same representation for type safety.',
          'It prevents the inner type from being accessed at all.',
          'It is a performance optimisation — newtypes are always stack-allocated.',
        ],
        correctIndex: 1,
        explanation:
          'Rust\'s coherence rules (orphan rule) prevent implementing a foreign trait on a foreign type directly. Wrapping in a newtype (`struct Meters(f64)`) creates a locally-owned type on which you can freely implement any trait. It also provides type safety — `Meters` and `Seconds` have the same representation but cannot be mixed. See Rust Book Ch 20.2.',
      },
      {
        kind: 'mcq',
        id: 'rust-10-mcq-5',
        prompt:
          'What is the type-state pattern in Rust, and what does it enforce?',
        options: [
          'A pattern where enum variants hold different `Box<dyn State>` values at runtime.',
          'A pattern where the state of an object is encoded in its type parameter, making illegal state transitions compile errors.',
          'A pattern for sharing state between threads using `Arc<Mutex<State>>`.',
          'A pattern where `impl Trait` is used to hide the concrete state type.',
        ],
        correctIndex: 1,
        explanation:
          'In the type-state pattern, you define zero-sized marker types (e.g. `Locked`, `Unlocked`) and parameterise your struct: `Door<Locked>`, `Door<Unlocked>`. Methods that only make sense in one state are only `impl`-ed for that state — `door.open()` only exists on `Door<Locked>`. The compiler rejects invalid transitions at compile time with zero runtime overhead.',
      },
      {
        kind: 'mcq',
        id: 'rust-10-mcq-6',
        prompt:
          'Your CI job posts a `criterion` perf regression on every PR. Yesterday\'s comment on PR #4711:\n```\n$ cargo bench --bench sort -- --save-baseline pr-4711\n   Compiling sort-bench v0.5.0 (/workspace/benches/sort-bench)\n    Finished `bench` profile [optimized] target(s) in 7.42s\n     Running benches/sort.rs (target/release/deps/sort-7a9c1d)\nGnuplot not found, using plotters backend\nsort/randomised\n                        time:   [12.296 ms 12.512 ms 12.728 ms]\n                        change: [+0.81% +1.52% +2.28%] (p = 0.04 < 0.05)\n                        Performance has regressed.\nBenchmarking sort/randomised: Analyzing\nFound 7 outliers among 100 measurements (7.00%)\n  4 (4.00%) high mild\n  3 (3.00%) high severe\n```\nThe previous baseline `main`:\n```\nsort/randomised         time:   [12.082 ms 12.314 ms 12.546 ms]\n```\nThe PR only touches a markdown doc comment in `src/sort.rs`. Which interpretation should you post back on the PR?',
        options: [
          'The regression is real — criterion\'s 95% confidence intervals do not overlap heavily and p < 0.05. Block the PR and ask the author to optimise.',
          'The regression is almost certainly noise. The two 95% CIs ([12.30..12.73] vs [12.08..12.55]) overlap by ~0.25 ms — roughly half the width of either CI. A statistically significant 1.5% delta with 7% outliers, on a noisy shared CI runner that only changed a doc comment, is below the practical noise floor. Pin CPU frequency, isolate the runner, lift the sample count, and adopt a >5% (or >3σ) threshold before flagging regressions.',
          'You should immediately `git bisect` from the previous baseline to PR #4711 to locate the offending commit.',
          'Switch the harness from criterion to bare `Instant::now()` calls — criterion is known to over-report regressions.',
        ],
        correctIndex: 1,
        explanation:
          'Reading criterion output requires checking *how much* the 95% CIs overlap, not just the p-value. The new and previous CIs overlap by ~0.25 ms, almost half the width of either interval. The outlier count (7%) signals high run-to-run variance. A statistically significant 1.5% delta on a noisy desktop or shared CI runner is usually below the *practical* noise floor — especially when the PR diff only touches a doc comment. Best practice: pin CPU frequency (`cpupower frequency-set --governor performance`), disable turbo, run on a dedicated bench host, increase sample size, and adopt a project-wide minimum-delta threshold (often >5% or >3σ from the baseline). Treating every flagged regression as real causes alarm fatigue.',
      },
      {
        kind: 'mcq',
        id: 'rust-10-mcq-7',
        prompt:
          'A perf engineer A/B-tested two allocator configurations on the production `pricing-api` (axum, 16 worker threads, ~25 kRPS, heavy small-allocation churn from per-request JSON parsing). The results:\n```\n$ wrk -t8 -c512 -d 60s http://localhost:8080/quote\nRunning 60s test @ http://localhost:8080/quote (system glibc malloc)\n  Latency  p50 4.2 ms  p99 19 ms\n  Req/sec  24,910\n\nRunning 60s test @ http://localhost:8080/quote (jemalloc via tikv_jemallocator)\n  Latency  p50 3.0 ms  p99 11 ms\n  Req/sec  32,420  (+30%)\n```\nThe one-line allocator swap in `src/main.rs`:\n```rust\n#[global_allocator]\nstatic GLOBAL: tikv_jemallocator::Jemalloc = tikv_jemallocator::Jemalloc;\n```\nWhich statement is the *most likely* explanation for the +30% on this workload?',
        options: [
          'jemalloc is always 30% faster than the system allocator on every workload.',
          'Multi-threaded services with heavy small-allocation churn (like per-request JSON parsing) are commonly bottlenecked on lock contention inside the system allocator. jemalloc uses per-thread arenas to eliminate that contention, so workloads with this pattern see large wins. Allocation-light or single-threaded workloads see little or no improvement.',
          'jemalloc disables `Drop` calls under the hood, which is why allocations are faster.',
          'jemalloc allocates on the stack instead of the heap.',
        ],
        correctIndex: 1,
        explanation:
          'jemalloc is not magic. Its main advantage on multi-threaded servers is per-thread arenas that remove the bottleneck of a single global lock guarding the allocator (historically a real issue with glibc malloc on Linux). For services that allocate frequently across many threads — exactly the per-request JSON parsing fingerprint of this pricing API — the improvement is often dramatic; for CPU-bound, allocation-free workloads it is negligible. Always measure first with `heaptrack` or `cargo flamegraph` to confirm you are allocator-bound before swapping allocators. Tail-latency wins (p99 19 → 11 ms) are a hallmark of removing lock contention.',
      },
      {
        kind: 'mcq',
        id: 'rust-10-mcq-8',
        prompt:
          'A batch ETL job in `crates/etl/src/process.rs` runs slower than expected (~28 s per 1 M rows, 4× the budget). `cargo flamegraph --release --bin etl` shows a suspiciously wide frame at the top of the stack labelled `__memcpy_avx_unaligned_erms` consuming ~38% of total samples. The hot caller:\n```rust\n// crates/etl/src/process.rs\nuse crate::record::Record;        // 256-byte struct with 8 fixed-size fields\n\n/// Filter, transform, and aggregate records read from the upstream Kafka source.\npub fn process(items: &[Record]) -> Vec<Record> {\n    let mut out: Vec<Record> = Vec::new();        // <-- no with_capacity\n    for r in items {\n        if !r.is_valid() { continue; }\n        let mut x = r.clone();                    // <-- 256-byte clone per accepted row\n        x.normalise();\n        out.push(x);                              // <-- another 256-byte copy on grow\n    }\n    out.sort_by_key(|r| r.timestamp);             // <-- 256-byte swaps during sort\n    out\n}\n```\nWhich interpretation is most useful?',
        options: [
          'A `memcpy` hot spot inside Rust code almost always means **value-typed data is being copied implicitly**. For a 256-byte `Record` every `clone()`, `push` (especially during a `Vec` regrowth), and `sort_by_key` swap copies the whole 256 bytes. Fixes (in order of cheapness): (1) `Vec::with_capacity(items.len())` to skip log(n) reallocs (each grow `memcpy`s the entire buffer); (2) store and sort by `usize` indices into the input, or by `Box<Record>` so swaps move 8-byte pointers; (3) consider "struct of arrays" if the hot pass only touches 1–2 fields.',
          'The flamegraph is misleading — `__memcpy_avx_unaligned_erms` belongs to glibc, not to your code.',
          'Disable SIMD via `RUSTFLAGS="-C target-feature=-sse4.2"`; AVX `memcpy` variants are slower than the scalar one for short copies.',
          'Recompile with `RUSTFLAGS="-C opt-level=3"`; the default `--release` profile uses `opt-level=2`.',
        ],
        correctIndex: 0,
        explanation:
          'Wide `memcpy` frames in a Rust flamegraph almost always mean *value-typed data is being copied implicitly*. With a 256-byte `Record`, every `r.clone()`, every `Vec::push` that triggers a regrowth, and every comparison-swap during `sort_by_key` copies the full 256 bytes. Standard remediations, in order: pre-allocate with `Vec::with_capacity(items.len())` to remove regrowths (each regrowth `memcpy`s the entire buffer); store `Box<Record>` so reorderings move 8-byte pointers; sort indices `Vec<usize>` instead of values; partition the struct into a "struct of arrays" layout when the hot pass only reads a couple of fields. (B) is wrong: `__memcpy_avx_unaligned_erms` may live in glibc but it is being called from *your* code path. (C) and (D) misdiagnose the root cause — the regression is volume of bytes copied, not the memcpy implementation or optimisation level.',
      },
      {
        kind: 'code',
        id: 'rust-10-code-1',
        prompt:
          'Write a custom iterator adapter. Implement a `Doubler` struct that wraps any `Iterator<Item = i32>` and yields each element multiplied by 2. Then use it to double the values `[1, 2, 3, 4, 5]` and print their sum.',
        boilerplate:
          'struct Doubler<I: Iterator<Item = i32>> {\n    inner: I,\n}\n\nimpl<I: Iterator<Item = i32>> Iterator for Doubler<I> {\n    type Item = i32;\n\n    fn next(&mut self) -> Option<Self::Item> {\n        // TODO: call self.inner.next() and map the value to double it\n        // Hint: self.inner.next().map(|x| x * 2)\n    }\n}\n\nfn main() {\n    let nums = vec![1, 2, 3, 4, 5];\n    let doubled = Doubler { inner: nums.into_iter() };\n    let sum: i32 = doubled.sum();\n    println!("{}", sum);\n}\n',
        expectedOutput: '30',
        explanation:
          'Custom iterator adapters implement the `Iterator` trait by wrapping an inner iterator and transforming its output. `Doubler` delegates to `self.inner.next()` and maps the result. The sum of [2,4,6,8,10] = 30. This pattern is how the standard library builds adapters like `Map`, `Filter`, etc.',
      },
    ],
  },
];
