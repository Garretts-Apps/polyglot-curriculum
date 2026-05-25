import type { Phase } from './types';

export const rustPhases: Phase[] = [
  // ─── L1: Hello Cargo ────────────────────────────────────────────────────────
  {
    id: 'rust-1',
    language: 'rust',
    level: 1,
    title: 'Hello Cargo',
    timeEstimate: '4-6 hours',
    intro: `Rust begins with tooling: \`rustup\` manages toolchains and \`cargo\` is your all-in-one build system, package manager, and test runner. In this phase you will install the toolchain, create your first project with \`cargo new\`, and learn the core syntax — primitive types (\`i32\`, \`f64\`, \`bool\`, \`char\`, \`&str\`), variables (\`let\` / \`let mut\`), control flow (\`if\`, \`loop\`, \`while\`, \`for\`), and how to define and call functions.\n\nBy the end you'll build a \`cargo new greet\` CLI with clap parsing a \`--name\` argument and printing a greeting with UTC timestamp — exercising everything in chapters 1-3 of *The Rust Programming Language* and forcing you to read the clap derive docs on docs.rs.`,
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
    ],
    deliverable:
      'Build locally: a `cargo new greet` CLI with clap parsing a `--name` argument and printing a greeting with UTC timestamp.',
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
          'What does this program print?\n```rust\nfn add(a: i32, b: i32) -> i32 {\n    a + b\n}\n\nfn main() {\n    println!("{}", add(7, 5));\n}\n```',
        options: ['`a + b`', '`0`', '`12`', 'compile error: missing return statement'],
        correctIndex: 2,
        explanation:
          'In Rust, the last expression in a function body without a trailing semicolon is the implicit return value. `a + b` evaluates to 12. Adding a semicolon (`a + b;`) would make the function return `()` and cause a type error. See Rust Book Ch 3.3.',
      },
      {
        kind: 'mcq',
        id: 'rust-1-mcq-7',
        prompt:
          'What type does Rust infer for `x` in `let x = 42;`?',
        options: ['`u32`', '`i64`', '`i32`', '`usize`'],
        correctIndex: 2,
        explanation:
          'Rust infers integer literals as `i32` by default when no other type information is present. You can override this with a suffix (`42u64`) or a type annotation (`let x: u64 = 42`). See Rust Book Ch 3.2.',
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
    intro: `Ownership is Rust's central innovation: every value has exactly one owner, and when the owner goes out of scope the value is dropped — no GC required. This phase covers the three ownership rules, move semantics, the borrowing rules (any number of shared references *or* exactly one mutable reference), and how lifetimes are inferred by the compiler. You will also learn string slices (\`&str\`) and array slices (\`&[T]\`) which are the canonical way to pass string data without taking ownership.\n\nBy the end you'll build a \`wordcount\` binary using \`std::io::stdin\` that reads lines into a \`HashMap<String, usize>\` and prints the top 10 words by count — putting ownership, borrowing, and slices to immediate practical use.`,
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
        label: 'Defining Structs (intro to Chapter 5)',
        url: 'https://doc.rust-lang.org/book/ch05-01-defining-structs.html',
        note: 'The Book ch 5.1',
      },
      {
        label: 'Validating References with Lifetimes (intro)',
        url: 'https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html',
        note: 'The Book ch 10.3 — first read through "Lifetime Annotations in Function Signatures"',
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
          'How many mutable references to the same value can exist in the same scope in Rust?',
        options: ['Unlimited', 'Two', 'Exactly one', 'Zero'],
        correctIndex: 2,
        explanation:
          'Rust enforces that you can have *either* any number of immutable (`&T`) references *or* exactly one mutable (`&mut T`) reference at a time — never both simultaneously. This prevents data races at compile time. See Rust Book Ch 4.2.',
      },
      {
        kind: 'mcq',
        id: 'rust-2-mcq-3',
        prompt:
          'Which line causes a borrow checker error?\n```rust\nfn main() {                          // line 1\n    let mut s = String::from("hi"); // line 2\n    let r1 = &s;                    // line 3\n    let r2 = &s;                    // line 4\n    let r3 = &mut s;               // line 5\n    println!("{} {} {}", r1, r2, r3); // line 6\n}\n```',
        options: ['Line 3', 'Line 4', 'Line 5', 'Line 6'],
        correctIndex: 2,
        explanation:
          'Line 5 creates a mutable reference while `r1` and `r2` (immutable references) are still in scope and used on line 6. Rust forbids having a `&mut` reference at the same time as any `&` references. See Rust Book Ch 4.2.',
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
          'What is the type inferred for `x` here?\n```rust\nlet s = String::from("hello");\nlet x = &s[1..3];\n```',
        options: ['`String`', '`&String`', '`&str`', '`[u8]`'],
        correctIndex: 2,
        explanation:
          'Slicing a `String` with `&s[..]` yields a `&str` — a string slice. This is a reference into the `String`\'s heap buffer with a length. It is not a `String` (owned) or `&String` (reference to the whole owned string). See Rust Book Ch 4.3.',
      },
      {
        kind: 'mcq',
        id: 'rust-2-mcq-6',
        prompt:
          'What does this program print?\n```rust\nfn change(s: &mut String) {\n    s.push_str(", world");\n}\n\nfn main() {\n    let mut s = String::from("hello");\n    change(&mut s);\n    println!("{}", s);\n}\n```',
        options: ['"hello"', '"hello, world"', 'compile error: cannot mutate through reference', '"hello world"'],
        correctIndex: 1,
        explanation:
          '`change` receives a mutable reference `&mut String`, which allows it to modify the `String` in place. `push_str` appends a string slice. Since `s` was declared `mut` and passed as `&mut s`, this compiles and prints "hello, world". See Rust Book Ch 4.2.',
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
    intro: `Rust's type system shines in its enums: unlike C enums they can carry data, making them algebraic data types. \`Option<T>\` replaces null pointers and \`Result<T, E>\` replaces exceptions — both are enums in the standard library. Pattern matching with \`match\` is exhaustive, so the compiler ensures you handle every variant.\n\nBy the end you'll build a \`shapes\` CLI that parses shape descriptions from stdin, computes areas using a \`Shape\` enum with \`match\`, and propagates parse errors with \`Result\` and the \`?\` operator — putting modules, enums, and error handling together in a real program.`,
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
        label: 'The ? Operator',
        url: 'https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html#a-shortcut-for-propagating-errors-the--operator',
        note: 'The Book ch 9.2 — ? operator section',
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
          'The `?` operator in a function returning `Result<T, E>` does what when applied to a `Result<U, E>` expression?',
        options: [
          'Unwraps the value or panics.',
          'Returns `Ok(value)` upward and returns early with `Err(e)` if the result is an error.',
          'Converts the result into an `Option`.',
          'Retries the expression up to three times.',
        ],
        correctIndex: 1,
        explanation:
          '`?` is syntax sugar: if the `Result` is `Ok(v)` it evaluates to `v`; if it is `Err(e)` it converts `e` (using `From`) and returns early with `Err(converted_e)`. It requires the enclosing function to return a compatible `Result` or `Option`. See Rust Book Ch 9.2.',
      },
      {
        kind: 'mcq',
        id: 'rust-3-mcq-3',
        prompt:
          'What does this program print?\n```rust\nfn main() {\n    let x: Option<i32> = Some(7);\n    match x {\n        Some(n) if n > 5 => println!("big: {}", n),\n        Some(n) => println!("small: {}", n),\n        None => println!("nothing"),\n    }\n}\n```',
        options: ['"big: 7"', '"small: 7"', '"nothing"', 'compile error: match is not exhaustive'],
        correctIndex: 0,
        explanation:
          'The first arm uses a match guard (`if n > 5`). Since `x` is `Some(7)` and `7 > 5` is true, the first arm matches and prints "big: 7". Match guards allow additional conditions on top of pattern matching. See Rust Book Ch 6.2.',
      },
      {
        kind: 'mcq',
        id: 'rust-3-mcq-4',
        prompt:
          'Which line gives a compile error?\n```rust\nstruct Point { x: f64, y: f64 }  // line 1\n\nimpl Point {                       // line 2\n    fn distance(&self) -> f64 {    // line 3\n        (self.x * self.x + self.y * self.y).sqrt() // line 4\n    }                              // line 5\n}                                  // line 6\n\nfn main() {                        // line 7\n    let p = Point { x: 3.0, y: 4.0 }; // line 8\n    p.x = 10.0;                    // line 9\n    println!("{}", p.distance());  // line 10\n}\n```',
        options: ['Line 3', 'Line 4', 'Line 8', 'Line 9'],
        correctIndex: 3,
        explanation:
          'Line 9 attempts to mutate a field of `p`, but `p` is not declared `mut`. To mutate struct fields, the binding must be `let mut p = ...`. Rust\'s mutability is binding-level, not field-level. See Rust Book Ch 5.',
      },
      {
        kind: 'mcq',
        id: 'rust-3-mcq-5',
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
        id: 'rust-3-mcq-6',
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
    ],
  },

  // ─── L4: Generics, Traits & Iterators ───────────────────────────────────────
  {
    id: 'rust-4',
    language: 'rust',
    level: 4,
    title: 'Generics, Traits, Closures & Iterators',
    timeEstimate: '8-10 hours',
    intro: `Traits are Rust's abstraction mechanism — similar to interfaces but more powerful because they support default implementations, blanket implementations, and the \`impl Trait\` / \`dyn Trait\` dispatch choices. Combined with generics, traits let you write zero-cost abstractions: the compiler monomorphises generic code at compile time.\n\nIterators are pervasive in idiomatic Rust. The \`Iterator\` trait's lazy adapter methods (\`map\`, \`filter\`, \`fold\`, \`flat_map\`, \`chain\`, \`zip\`) replace most explicit loops. Closures capture their environment by reference, mutable reference, or value (\`move\`). By the end you'll build a \`notes\` CLI with serde JSON persistence, clap derive subcommands (add, list, find, done), and anyhow error handling — a full idiomatic Rust application.`,
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
        label: 'Writing Automated Tests',
        url: 'https://doc.rust-lang.org/book/ch11-01-writing-tests.html',
        note: 'The Book ch 11',
      },
      {
        label: 'Smart Pointers: Box, Rc, and RefCell',
        url: 'https://doc.rust-lang.org/book/ch15-00-smart-pointers.html',
        note: 'The Book ch 15',
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
        id: 'rust-4-mcq-3',
        prompt:
          'What does this program print?\n```rust\nfn main() {\n    let nums = vec![1, 2, 3, 4, 5, 6];\n    let result: i32 = nums.iter()\n        .filter(|&&x| x % 2 == 0)\n        .map(|&x| x * x)\n        .sum();\n    println!("{}", result);\n}\n```',
        options: ['`91`', '`56`', '`44`', '`14`'],
        correctIndex: 1,
        explanation:
          'Even numbers are 2, 4, 6. Their squares are 4, 16, 36. Sum = 4 + 16 + 36 = 56. The double-deref `&&x` in the filter is needed because `.iter()` yields `&i32` references and the closure captures another `&`. See Rust Book Ch 13.2.',
      },
      {
        kind: 'mcq',
        id: 'rust-4-mcq-4',
        prompt:
          'Which trait bound makes this function compile?\n```rust\nfn largest<T: ???>(list: &[T]) -> T {\n    let mut largest = list[0];\n    for &item in list.iter() {\n        if item > largest {\n            largest = item;\n        }\n    }\n    largest\n}\n```',
        options: ['`T: Clone`', '`T: PartialOrd + Copy`', '`T: Display`', '`T: Eq`'],
        correctIndex: 1,
        explanation:
          'The `>` comparison requires `PartialOrd`. Assigning `list[0]` and `item` to `largest` (moving out of a reference) requires `Copy`. Without `Copy` the compiler would reject the assignment because you cannot move out of a reference. See Rust Book Ch 10.2.',
      },
      {
        kind: 'mcq',
        id: 'rust-4-mcq-5',
        prompt:
          'What is the type inferred for `doubled` here?\n```rust\nlet v = vec![1i32, 2, 3];\nlet doubled: Vec<i32> = v.iter().map(|&x| x * 2).collect();\n```',
        options: [
          '`Map<std::slice::Iter<i32>, _>`',
          '`Vec<i32>`',
          '`[i32; 3]`',
          '`Iterator<Item = i32>`',
        ],
        correctIndex: 1,
        explanation:
          '`.collect()` consumes the iterator and builds a collection. With the type annotation `Vec<i32>`, the compiler knows to collect into a `Vec`. Without the annotation it would be a type inference error because `collect` is generic over many collection types. See Rust Book Ch 13.2.',
      },
      {
        kind: 'mcq',
        id: 'rust-4-mcq-6',
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
          '`move` forces the closure to take ownership of all captured variables. Here `n` is copied (if `Copy`) or moved into the closure. This is required when the closure must outlive the scope where the captures live — e.g. when passing to `thread::spawn`. See Rust Book Ch 13.1.',
      },
    ],
  },

  // ─── L5: Concurrency & Error Crates ─────────────────────────────────────────
  {
    id: 'rust-5',
    language: 'rust',
    level: 5,
    title: 'Concurrency: Threads, Channels & Error Crates',
    timeEstimate: '8-10 hours',
    intro: `Rust's ownership model makes fearless concurrency possible: the \`Send\` and \`Sync\` marker traits are automatically derived and encode thread-safety at the type level. \`std::thread::spawn\` + \`std::sync::{Mutex, RwLock, Arc}\` give you shared-state concurrency, while \`std::sync::mpsc\` channels give you message-passing concurrency — both styles are idiomatic.\n\nBy the end you'll build a multi-threaded \`parallel-grep\` CLI: spawn one thread per file argument, search for a pattern using regex, send matches over an \`mpsc\` channel, and print results in the main thread with \`anyhow\` error handling — putting threads, channels, \`Arc\`, and error crates all to work.`,
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
        label: 'anyhow crate — ergonomic error handling',
        url: 'https://docs.rs/anyhow/latest/anyhow/',
        note: 'crates.io/crates/anyhow',
      },
      {
        label: 'thiserror crate — derive-based typed errors',
        url: 'https://docs.rs/thiserror/latest/thiserror/',
        note: 'crates.io/crates/thiserror',
      },
    ],
    deliverable:
      'Build locally: a multi-threaded `parallel-grep` CLI that spawns one thread per file argument, searches for a pattern, sends matches over `mpsc`, and prints results with `anyhow` error handling.',
    checks: [
      {
        kind: 'mcq',
        id: 'rust-5-mcq-1',
        prompt:
          'Why must shared data wrapped in `Mutex<T>` also be wrapped in `Arc<T>` when accessed from multiple threads?',
        options: [
          '`Mutex` does not implement `Clone`, so `Arc` provides cheap reference counting across threads.',
          '`Arc` is required because `Mutex` allocates on the heap.',
          '`Arc` provides the actual locking; `Mutex` is just a marker.',
          'This is not required — `Rc<Mutex<T>>` works equally well.',
        ],
        correctIndex: 0,
        explanation:
          '`Mutex<T>` alone cannot be shared between threads because it is not `Clone`. `Arc<T>` (atomically reference-counted) allows multiple owners across threads. `Rc<T>` is *not* `Send`, so the compiler rejects it at thread boundaries. See Rust Book Ch 16.3.',
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
          '`thiserror` derives `std::error::Error` on your custom enum, giving callers typed variants to match against — essential for libraries. `anyhow` erases the type into `anyhow::Error` and is best for application code that just needs to propagate and display errors.',
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
          'What happens at runtime if a thread holding a `MutexGuard` panics?',
        options: [
          'The mutex is automatically unlocked and the program continues normally.',
          'The mutex becomes *poisoned*; subsequent calls to `.lock()` return `Err(PoisonError)`.',
          'The entire program terminates immediately.',
          'The panicking thread re-acquires the mutex after the panic is caught.',
        ],
        correctIndex: 1,
        explanation:
          'When a thread panics while holding a `MutexGuard`, Rust marks the mutex as *poisoned*. Future calls to `.lock()` return `Err(PoisonError<MutexGuard<T>>)`. You can recover by calling `.into_inner()` on the error to obtain the guard anyway, accepting that data may be in an inconsistent state. See Rust Book Ch 16.3.',
      },
      {
        kind: 'mcq',
        id: 'rust-5-mcq-5',
        prompt:
          'Which trait must a type implement to be sent across thread boundaries in Rust?',
        options: ['`Clone`', '`Copy`', '`Send`', '`Sync`'],
        correctIndex: 2,
        explanation:
          '`Send` indicates a type can be transferred to another thread. `Sync` indicates a type can be *shared* (via reference) between threads. Most standard types implement both automatically. `Rc<T>` and `RefCell<T>` deliberately do not implement `Send`/`Sync`. See Rust Book Ch 16.4.',
      },
      {
        kind: 'mcq',
        id: 'rust-5-mcq-6',
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
          '`mpsc::channel()` returns a `(Sender<T>, Receiver<T>)` tuple. The destructuring assigns `tx` to the `Sender` and `rx` to the `Receiver`. Only `Sender` can be cloned (for multiple producers); there is only ever one `Receiver`. See Rust Book Ch 16.2.',
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
    intro: `Rust's smart pointer types extend ownership beyond the single-owner rule in controlled ways. \`Box<T>\` allocates on the heap and enables recursive types. \`Rc<T>\` / \`Arc<T>\` enable shared ownership through reference counting (single-threaded vs. thread-safe). \`RefCell<T>\` moves borrow checking to runtime, enabling interior mutability — the ability to mutate data even when you only hold an immutable reference.\n\nBy the end you'll build a \`todo-tree\` CLI: a tree of task nodes stored as \`Rc<RefCell<Node>>\`, supporting add-child, mark-done, and print-tree operations — making interior mutability and shared ownership concrete in a working program.`,
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
      'Build locally: a `todo-tree` CLI with task nodes stored as `Rc<RefCell<Node>>`, supporting add-child, mark-done, and print-tree subcommands.',
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
          'What happens at runtime if you call `borrow_mut()` on a `RefCell<T>` that already has an active `borrow()`?',
        options: [
          'The program deadlocks waiting for the borrow to end.',
          'It returns `None`.',
          'It panics with "already borrowed: BorrowMutError".',
          'It silently returns a mutable reference anyway.',
        ],
        correctIndex: 2,
        explanation:
          '`RefCell` enforces borrow rules at runtime: you cannot have a `&mut T` while any `&T` is live. Violating this panics with `BorrowMutError`. This is the trade-off of interior mutability — correctness is guaranteed but at runtime rather than compile time. See Rust Book Ch 15.5.',
      },
      {
        kind: 'mcq',
        id: 'rust-6-mcq-5',
        prompt:
          'Why should you use `Weak<T>` instead of `Rc<T>` for back-pointers in a tree or graph?',
        options: [
          '`Weak<T>` is faster than `Rc<T>` for read-heavy workloads.',
          'To prevent reference cycles: `Rc<T>` back-pointers would keep the parent alive even after all external owners drop it, creating a memory leak.',
          '`Weak<T>` automatically drops child nodes when the parent is dropped.',
          '`Rc<T>` cannot hold the same type that holds an `Rc<T>` (the compiler rejects cycles).',
        ],
        correctIndex: 1,
        explanation:
          '`Rc<T>` back-pointers create reference cycles: parent holds `Rc` to child, child holds `Rc` to parent. Neither can ever reach count 0, so both leak. `Weak<T>` does not contribute to the strong count, breaking the cycle. You upgrade a `Weak` to `Rc` with `.upgrade()` which returns `Option<Rc<T>>`. See Rust Book Ch 15.6.',
      },
      {
        kind: 'mcq',
        id: 'rust-6-mcq-6',
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
    ],
  },

  // ─── L7: Async Rust ──────────────────────────────────────────────────────────
  {
    id: 'rust-7',
    language: 'rust',
    level: 7,
    title: 'Async Rust: Futures, tokio & select!',
    timeEstimate: '10-12 hours',
    intro: `Async Rust is built on the \`Future\` trait: a state machine polled by a runtime until it produces a value. The \`async\`/\`await\` syntax desugars to these state machines, and \`Pin\` ensures they cannot be moved after being polled. This phase covers the internals (you will implement a trivial \`Future\` by hand) and then moves to the \`tokio\` runtime — the dominant async runtime in the ecosystem.\n\nBy the end you'll build a \`tokio\` TCP echo server that accepts connections and echoes lines back, with graceful Ctrl-C shutdown via \`tokio::signal\` — a canonical async Rust application that exercises spawn, channels, select!, and structured concurrency.`,
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
        label: 'tokio Tutorial — Channels',
        url: 'https://tokio.rs/tokio/tutorial/channels',
        note: 'tokio.rs tutorial',
      },
      {
        label: 'tokio::select! macro',
        url: 'https://tokio.rs/tokio/tutorial/select',
        note: 'tokio.rs tutorial',
      },
    ],
    deliverable:
      'Build locally: a `tokio` TCP echo server that accepts connections and echoes lines back, with graceful Ctrl-C shutdown via `tokio::signal`.',
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
          'Because async state machines contain self-referential pointers (e.g. references to local variables across await points); moving them after polling would invalidate those pointers.',
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
          'What is the key difference between `tokio::spawn` and `tokio::join!` for running multiple async tasks?',
        options: [
          '`tokio::spawn` creates OS threads; `join!` creates green threads.',
          '`tokio::spawn` runs tasks concurrently and independently (detached); `join!` runs futures concurrently but waits for all of them and does not detach.',
          '`join!` is sequential — it awaits one future then the next.',
          '`tokio::spawn` is for CPU-bound work; `join!` is for I/O-bound work.',
        ],
        correctIndex: 1,
        explanation:
          '`tokio::spawn` detaches a task onto the runtime — it runs independently and you get a `JoinHandle` to optionally await later. `join!(a, b)` polls both futures concurrently *within the current task* and returns when both complete. Neither creates OS threads — both use tokio\'s async task scheduler.',
      },
      {
        kind: 'mcq',
        id: 'rust-7-mcq-5',
        prompt:
          'What happens at runtime when using `tokio::select!` with two branches and one completes first?',
        options: [
          'Both branches are awaited to completion; the first result is used.',
          'The first branch to complete wins; the other future is dropped.',
          'The program panics because only one branch can be active.',
          'The winning branch is re-polled until the other branch also completes.',
        ],
        correctIndex: 1,
        explanation:
          '`select!` polls all listed futures and returns when the *first* one completes. The remaining futures are dropped — their async operations are cancelled. This is the idiomatic way to race futures or implement timeouts (`tokio::time::timeout` uses this internally). See tokio select! tutorial.',
      },
      {
        kind: 'mcq',
        id: 'rust-7-mcq-6',
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
    ],
  },

  // ─── L8: Macros ─────────────────────────────────────────────────────────────
  {
    id: 'rust-8',
    language: 'rust',
    level: 8,
    title: 'Macros: Declarative and Procedural',
    timeEstimate: '8-10 hours',
    intro: `Rust has two macro systems. Declarative macros (\`macro_rules!\`) match against token trees with a pattern-based DSL — they are hygienic, expanded at compile time, and cover the majority of metaprogramming needs (think \`vec![]\`, \`println!\`, \`assert_eq!\`). Procedural macros are Rust code that runs at compile time, receives a token stream, and emits a token stream — enabling \`#[derive(...)]\`, attribute macros, and function-like macros.\n\nBy the end you'll build a small \`#[derive(Builder)]\` proc-macro crate using \`syn\` and \`quote\`, with a consumer binary demonstrating the generated builder pattern — the canonical real-world proc-macro exercise.`,
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
        note: 'crates.io/crates/syn',
      },
      {
        label: 'quote crate — quasi-quoting for proc-macros',
        url: 'https://docs.rs/quote/latest/quote/',
        note: 'crates.io/crates/quote',
      },
      {
        label: 'proc-macro2 crate',
        url: 'https://docs.rs/proc-macro2/latest/proc_macro2/',
        note: 'crates.io/crates/proc-macro2',
      },
    ],
    deliverable:
      'Build locally: a small `#[derive(Builder)]` proc-macro crate using syn + quote, with a consumer binary demonstrating the generated builder.',
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
          'What is macro hygiene in Rust\'s `macro_rules!` system?',
        options: [
          'Macros automatically sanitise string inputs to prevent injection attacks.',
          'Identifiers introduced inside a macro expansion do not clash with identifiers in the calling code — each expansion gets its own scope.',
          'Macros are cleaned up (deleted) after the compilation phase.',
          'Hygienic macros can only be called once per scope.',
        ],
        correctIndex: 1,
        explanation:
          'Hygiene means that variable names introduced *inside* a macro do not accidentally capture variables *outside* the macro (and vice versa). Rust\'s `macro_rules!` is hygienic by default. Procedural macros can be unhygienic if you generate identifiers via `quote!` that collide with user code — use `gensym` patterns or unique naming to avoid this.',
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
    intro: `\`unsafe\` is a contract: you assert to the compiler that you have verified invariants it cannot check. Inside an \`unsafe\` block you can dereference raw pointers, call \`unsafe\` functions, implement \`unsafe\` traits, and access mutable statics. The Rustonomicon documents every invariant you must uphold — understanding UB (undefined behaviour) is essential.\n\nBy the end you'll build a \`ffi-demo\` CLI that wraps C's \`qsort\` and a custom C \`add\` function via \`extern "C"\`, with safe Rust wrappers, documented safety invariants, and a \`cargo test\` suite — learning FFI by doing it.`,
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
        label: 'Embassy — async embedded Rust',
        url: 'https://embassy.dev',
        note: 'embassy.dev',
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
          'What is undefined behaviour (UB) in Rust, and why does it matter even in `unsafe` code?',
        options: [
          'UB means the program will crash — Rust always panics on UB.',
          'UB means the compiler is allowed to assume the UB path is unreachable and may generate *any* code, including deleting safety checks, producing wrong output, or corrupting memory.',
          'UB is only possible in FFI; pure Rust `unsafe` blocks cannot have UB.',
          'UB causes a compile error in `--release` builds but not in `debug` builds.',
        ],
        correctIndex: 1,
        explanation:
          'UB is a contract violation with the compiler. When you write UB (e.g. dereference a dangling pointer, create two `&mut` to the same location), the compiler\'s optimiser may exploit the "this is unreachable" assumption to produce code that is completely wrong in non-obvious ways — even eliminating bounds checks far from the UB site. Sanitizers (AddressSanitizer, Miri) help detect UB. See the Rustonomicon.',
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
    intro: `At this level you move from correctness to performance. Rust gives you direct control over allocations, cache layout, and SIMD — but you need profiling data before optimising. \`cargo flamegraph\` (wraps \`perf\` / \`DTrace\`) generates flame graphs; \`criterion\` provides statistically rigorous micro-benchmarks via \`#[bench]\`-style harnesses that run on stable Rust. \`heaptrack\` and DHAT profile allocations.\n\nBy the end you'll build a CLI tool benchmarked with criterion, flamegraph-profiled, with custom alloc stats via jemalloc — documenting findings in a \`BENCH.md\`. Advanced trait topics include type-state patterns, sealed traits, extension traits, higher-ranked trait bounds (HRTBs: \`for<'a>\`), and the newtype pattern.`,
    topics: [
      {
        label: 'cargo flamegraph',
        url: 'https://github.com/flamegraph-rs/flamegraph',
        note: 'flamegraph-rs/flamegraph on GitHub',
      },
      {
        label: 'criterion — statistical benchmarking',
        url: 'https://docs.rs/criterion/latest/criterion/',
        note: 'crates.io/crates/criterion',
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
        label: 'Advanced Traits — The Book',
        url: 'https://doc.rust-lang.org/book/ch20-02-advanced-traits.html',
        note: 'The Book ch 20.2',
      },
      {
        label: 'Rust for Rustaceans — crates.io listing',
        url: 'https://crates.io/crates/rustaceans',
        note: 'Jon Gjengset — No Starch Press',
      },
    ],
    deliverable:
      'Build locally: a CLI tool benchmarked with criterion, flamegraph profiled, custom alloc stats via jemalloc, findings documented in `BENCH.md`.',
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
          'What does `cargo flamegraph` measure, and what tool does it wrap on Linux?',
        options: [
          'Memory allocations — it wraps `valgrind`.',
          'CPU time spent in each function — it wraps `perf record` and generates an SVG flame graph.',
          'Compile times — it wraps `cargo build --timings`.',
          'Async task scheduling — it wraps `tokio-console`.',
        ],
        correctIndex: 1,
        explanation:
          '`cargo flamegraph` wraps Linux `perf record` (or DTrace on macOS) to sample the call stack at high frequency, then uses `inferno` to render an SVG flame graph. Wide bars mean more CPU time. It is the standard first tool to reach for when a Rust program is slower than expected. See flamegraph-rs on GitHub.',
      },
    ],
  },
];
