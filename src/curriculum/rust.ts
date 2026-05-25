import type { Phase } from './types';

export const rustPhases: Phase[] = [
  // ─── L1: Hello Cargo ────────────────────────────────────────────────────────
  {
    id: 'rust-1',
    language: 'rust',
    level: 1,
    title: 'Hello Cargo',
    timeEstimate: '4-6 hours',
    intro: `By the end of this phase, you'll read short Rust programs and predict what the compiler will say — missing semicolons that turn an expression into a unit return, \`let\` vs \`let mut\`, shadowing vs mutation, and the difference between expression-bodied functions and statement-bodied ones. The tooling is your terminal: \`rustup\` for toolchains, \`cargo new\` / \`cargo build\` / \`cargo run\` / \`cargo check\` / \`cargo clippy -- -W clippy::pedantic\` for the build-test-lint loop. When you want to see what a value's type is, drop in \`let _: () = x;\` and read the compiler's "expected (), found …" error — that trick costs nothing and tells you everything.\n\nTo build the muscle, you'll write a \`cargo new greet\` CLI locally that takes a \`--name\` flag (clap derive) and prints a greeting plus the current UTC timestamp — writing it yourself is how the reading sticks.`,
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
          'You run `cargo run` and the compiler prints:\n```\nerror[E0308]: mismatched types\n  --> src/main.rs:2:20\n   |\n 2 |     let x: i32 = add(2, 3);\n   |            ---   ^^^^^^^^^ expected `i32`, found `()`\n   |\nnote: this function returns `()` because of an extra semicolon\n```\nThe code is:\n```rust\nfn add(a: i32, b: i32) -> i32 {\n    a + b;\n}\n```\nWhich fix resolves the error?',
        options: [
          'Annotate the call site: `let x: () = add(2, 3);`',
          'Remove the semicolon after `a + b` so it becomes the return expression.',
          'Wrap the body: `return (a + b);`',
          'Change the signature to `-> ()`.',
        ],
        correctIndex: 1,
        explanation:
          'In Rust the final expression of a block is its value *only if there is no trailing semicolon*. `a + b;` is a statement that evaluates `a + b` and discards it — the block then returns `()`. Dropping the semicolon makes `a + b` the tail expression. `return a + b;` (with the keyword) is also valid because `return` is an expression.',
      },
      {
        kind: 'mcq',
        id: 'rust-1-mcq-7',
        prompt:
          'You compile and see:\n```\nerror: expected one of `!` or `::`, found `main`\n --> src/main.rs:1:1\n  |\n1 | main() {\n  | ^^^^ expected one of `!` or `::`\n```\nThe code is:\n```rust\nmain() {\n    println!("hi");\n}\n```\nWhich fix resolves the error?',
        options: [
          'Add a return type: `main() -> () {`',
          'Rename it to `_main()` so the linker finds it.',
          'Prefix with `fn`: `fn main() { ... }`.',
          'Add `#[entry_point]` above `main`.',
        ],
        correctIndex: 2,
        explanation:
          'Every Rust function definition must start with the `fn` keyword. The parser sees `main(...)` without `fn` and tries to interpret it as a macro call or path, hence the "expected `!` or `::`" error. `#[entry_point]` is a stable Rust attribute for embedded targets but does not replace the `fn` keyword.',
      },
      {
        kind: 'mcq',
        id: 'rust-1-mcq-8',
        prompt:
          'You see this error from `cargo build`:\n```\nerror[E0384]: cannot assign twice to immutable variable `n`\n --> src/main.rs:3:5\n  |\n2 |     let n = 1;\n  |         -\n  |         |\n  |         first assignment to `n`\n  |         help: consider making this binding mutable: `mut n`\n3 |     n = n + 1;\n  |     ^^^^^^^^^ cannot assign twice to immutable variable\n```\nThe code is:\n```rust\nfn main() {\n    let n = 1;\n    n = n + 1;\n    println!("{n}");\n}\n```\nWhich fix follows the compiler\'s suggestion and prints `2`?',
        options: [
          'Replace `let n = 1;` with `let mut n = 1;`.',
          'Replace `n = n + 1;` with `let n = n + 1;` only — keep the original `let n = 1;` unchanged.',
          'Replace `let n = 1;` with `const n: i32 = 1;`.',
          'Both A and B are valid fixes that produce the same output.',
        ],
        correctIndex: 3,
        explanation:
          'Two idiomatic fixes work here. (A) `let mut n = 1; n = n + 1;` mutates the same binding — this is what the compiler suggests. (B) Replacing `n = n + 1;` with `let n = n + 1;` *shadows* the binding with a new immutable one whose value is 2. Both print `2`. `const` requires an explicit type annotation and a compile-time-constant initializer, so option C would itself fail to compile.',
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
          'The compiler reports:\n```\nerror[E0502]: cannot borrow `v` as mutable because it is also borrowed as immutable\n --> src/main.rs:5:5\n  |\n4 |     let first = &v[0];\n  |                  - immutable borrow occurs here\n5 |     v.push(4);\n  |     ^^^^^^^^^ mutable borrow occurs here\n6 |     println!("{}", first);\n  |                    ----- immutable borrow later used here\n```\nThe code is:\n```rust\nfn main() {\n    let mut v = vec![1, 2, 3];\n    let first = &v[0];\n    v.push(4);\n    println!("{}", first);\n}\n```\nWhich fix is **correct and minimal**?',
        options: [
          'Wrap `v` in `Rc<RefCell<...>>` so the borrow checker is satisfied.',
          'Move the `println!("{}", first);` *before* `v.push(4);` so the immutable borrow ends before the push.',
          'Add `&` to the push: `v.push(&4);`.',
          'Declare `first` as `let first = v[0];` to copy the value out — but this fails for non-Copy element types.',
        ],
        correctIndex: 1,
        explanation:
          'The root cause: `v.push(4)` may reallocate the backing buffer, which would invalidate `first` (it points into the old buffer). The minimal fix is to finish using `first` before mutating `v`. Option D (`let first = v[0]`) also works *here* because `i32: Copy`, but breaks for non-Copy element types — so B is the most general minimal fix. `Rc<RefCell>` is wildly overkill.',
      },
      {
        kind: 'mcq',
        id: 'rust-2-mcq-7',
        prompt:
          'The compiler reports:\n```\nerror[E0507]: cannot move out of `v` because it is borrowed\n --> src/main.rs:4:14\n  |\n3 |     let r = &v[0];\n  |              - borrow of `v` occurs here\n4 |     for x in v {\n  |              ^ move out of `v` occurs here\n5 |         println!("{}", x);\n6 |     }\n7 |     println!("{}", r);\n  |                    - borrow later used here\n```\nThe code is:\n```rust\nfn main() {\n    let v = vec![1, 2, 3];\n    let r = &v[0];\n    for x in v {\n        println!("{}", x);\n    }\n    println!("{}", r);\n}\n```\nWhich fix resolves the error?',
        options: [
          'Change `for x in v` to `for x in &v` so the loop borrows instead of consuming.',
          'Wrap `v` in a `Box`: `let v = Box::new(vec![1, 2, 3]);`.',
          'Add `let r = r.clone();` after the loop.',
          'Move `let r = &v[0];` inside the loop body.',
        ],
        correctIndex: 0,
        explanation:
          '`for x in v` is sugar for `IntoIterator::into_iter(v)` which *consumes* `v`. While `r` is still live (used after the loop on line 7), you cannot move `v`. Iterating by reference — `for x in &v` — keeps `v` alive. (B) Box does not change ownership rules. (D) Moving the binding would still drop `r` before its last use because `for x in v` still consumes the vec.',
      },
      {
        kind: 'mcq',
        id: 'rust-2-mcq-8',
        prompt:
          'The compiler reports:\n```\nerror[E0106]: missing lifetime specifier\n --> src/main.rs:1:33\n  |\n1 | fn longest(x: &str, y: &str) -> &str {\n  |               ----     ----     ^ expected named lifetime parameter\n  |\nhelp: this function\'s return type contains a borrowed value, but the signature does not say whether it is borrowed from `x` or `y`\n```\nThe code is:\n```rust\nfn longest(x: &str, y: &str) -> &str {\n    if x.len() > y.len() { x } else { y }\n}\n```\nWhich signature compiles?',
        options: [
          '`fn longest<\'a>(x: &\'a str, y: &str) -> &\'a str`',
          '`fn longest<\'a>(x: &\'a str, y: &\'a str) -> &\'a str`',
          '`fn longest(x: &\'static str, y: &\'static str) -> &\'static str`',
          '`fn longest(x: String, y: String) -> String`',
        ],
        correctIndex: 1,
        explanation:
          'Lifetime elision picks one input lifetime for the output, but with two `&str` parameters it has no rule to decide between them. Since the function can return either `x` or `y`, both must have the *same* lifetime `\'a`, and the return must also be `\'a`. Option A would work only if you also return `y` with lifetime `\'a` — which you do, so it would not compile. Option C demands `\'static` from callers — overly restrictive. Option D changes the API to take ownership unnecessarily.',
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
          'The compiler reports:\n```\nerror[E0004]: non-exhaustive patterns: `Yellow` not covered\n --> src/main.rs:7:11\n  |\n7 |     match c {\n  |           ^ pattern `Yellow` not covered\n  |\nnote: `Color` defined here\n```\nThe code is:\n```rust\nenum Color { Red, Green, Blue, Yellow }\n\nfn name(c: Color) -> &\'static str {\n    match c {\n        Color::Red => "red",\n        Color::Green if true => "green",\n        Color::Blue => "blue",\n    }\n}\n```\nWhich fix is **correct** without silencing the warning?',
        options: [
          'Add `_ => "unknown",` as the final arm — but this defeats exhaustiveness checks if a future variant is added.',
          'Add `Color::Green => "green", Color::Yellow => "yellow",` (the guard on the existing Green arm leaves Green un-handled when the guard is false).',
          'Remove the `if true` guard from the Green arm.',
          'Both B and C resolve the error, but B is required because guards do *not* count as exhaustive even when always-true.',
        ],
        correctIndex: 3,
        explanation:
          'Match exhaustiveness ignores guards — `Color::Green if true` does not cover `Color::Green` (the compiler conservatively assumes the guard could be false). You must either remove the guard *or* add a guard-less fallback arm for `Color::Green`, *and* you must add an arm for `Color::Yellow`. Option B does both. Option A works at runtime but turns enum exhaustiveness off — a future variant addition will silently fall through. See Rust Book Ch 6.2.',
      },
      {
        kind: 'mcq',
        id: 'rust-3-mcq-7',
        prompt:
          'The program panics at runtime:\n```\nthread \'main\' panicked at \'called `Option::unwrap()` on a `None` value\', src/main.rs:4:38\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n```\nThe code is:\n```rust\nfn main() {\n    let args: Vec<String> = std::env::args().collect();\n    // expect a single positional arg\n    let n: i32 = args.get(1).unwrap().parse().unwrap();\n    println!("{}", n * 2);\n}\n```\nRunning `cargo run` (no args) caused the panic. Which fix returns a clean error instead of panicking?',
        options: [
          'Replace `.unwrap()` with `.expect("expected one numeric arg")` — same panic, nicer message; still crashes.',
          'Return `Result<(), Box<dyn std::error::Error>>` from `main` and use `?`: `let n: i32 = args.get(1).ok_or("missing arg")?.parse()?;`.',
          'Wrap the call: `if let Some(s) = args.get(1) { ... }` and ignore the case where no arg was passed.',
          'Add `#[panic = "abort"]` to silence the backtrace.',
        ],
        correctIndex: 1,
        explanation:
          'The idiomatic fix is to make `main` return a `Result` and use `?` to propagate errors. `.ok_or("…")` converts `Option::None` into `Err`, and `.parse()?` propagates `ParseIntError` (auto-boxed via `From` into `Box<dyn Error>`). Option A still crashes. Option C silently does nothing on missing input — a different bug. Option D is fictional Rust syntax.',
      },
      {
        kind: 'mcq',
        id: 'rust-3-mcq-8',
        prompt:
          'The compiler reports:\n```\nerror[E0277]: `?` couldn\'t convert the error to `MyError`\n --> src/main.rs:8:35\n  |\n8 |     let n: i32 = s.trim().parse()?;\n  |                                   ^ the trait `From<ParseIntError>` is not implemented for `MyError`\n```\nThe code is:\n```rust\n#[derive(Debug)]\nenum MyError { Io(std::io::Error) }\n\nfn parse_line(s: &str) -> Result<i32, MyError> {\n    let n: i32 = s.trim().parse()?;\n    Ok(n)\n}\n```\nWhich fix makes `?` work without changing the signature of `parse_line`?',
        options: [
          'Add a `Parse(std::num::ParseIntError)` variant and an `impl From<std::num::ParseIntError> for MyError` — then `?` converts automatically.',
          'Change the return type to `Result<i32, Box<dyn std::error::Error>>`.',
          'Wrap the parse call: `s.trim().parse().map_err(|_| MyError::Io(...))?` — but this loses the original error.',
          'Both A and C compile, but A is the correct extensible fix because it preserves the typed error variant and matches the existing pattern of the enum.',
        ],
        correctIndex: 3,
        explanation:
          '`?` is sugar for `match expr { Ok(v) => v, Err(e) => return Err(From::from(e)) }`. So you need `impl From<ParseIntError> for MyError`. Idiomatically you add a `Parse(ParseIntError)` variant and derive `From` (manually or via `#[from]` in thiserror). Option C compiles but loses error provenance. Option B changes the signature and erases the type — only acceptable in application code, not in this library-shaped function.',
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
          'The compiler reports:\n```\nerror[E0277]: the trait bound `T: PartialOrd` is not satisfied\n --> src/main.rs:4:18\n  |\n4 |         if item > largest {\n  |                  ^ no implementation for `T > T`\nhelp: consider restricting type parameter `T`\n  |\n2 | fn largest<T: PartialOrd>(list: &[T]) -> T {\n```\nThe code is:\n```rust\nfn largest<T>(list: &[T]) -> T {\n    let mut largest = list[0];\n    for &item in list.iter() {\n        if item > largest {\n            largest = item;\n        }\n    }\n    largest\n}\n```\nApplying the compiler\'s hint produces a *new* error: `cannot move out of type [T], a non-copy slice`. What is the smallest set of bounds that makes the original implementation compile?',
        options: [
          '`T: PartialOrd` alone',
          '`T: PartialOrd + Copy`',
          '`T: Ord + Clone`',
          '`T: PartialOrd + Display`',
        ],
        correctIndex: 1,
        explanation:
          'The `>` comparison requires `PartialOrd`. Assigning `list[0]` and `item` to `largest` is a move out of a reference — for that to be legal you need `T: Copy`. `Ord` is strictly stronger than `PartialOrd` (it forbids NaN-like partial orderings). `Clone` would also work *if* you rewrote the body to `.clone()` each candidate, but that is not the minimal fix to the *existing* code. See Rust Book Ch 10.2.',
      },
      {
        kind: 'mcq',
        id: 'rust-4-mcq-7',
        prompt:
          'The compiler reports:\n```\nerror[E0308]: `if` and `else` have incompatible types\n --> src/main.rs:3:9\n  |\n2 |     if cond {\n  |     -------- `if` and `else` have incompatible types\n3 |         vec![1, 2].into_iter()\n  |         ---------------------- expected because of this\n4 |     } else {\n5 |         (0..10).filter(|&x| x % 2 == 0)\n  |         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ expected `IntoIter<i32>`, found `Filter<Range<i32>, ...>`\n```\nThe function signature is `fn pick(cond: bool) -> impl Iterator<Item = i32>`. Which fix is correct?',
        options: [
          'Add `.collect::<Vec<_>>().into_iter()` to both branches so they return the same concrete type.',
          'Change the return type to `Box<dyn Iterator<Item = i32>>` and box each branch with `Box::new(...)`.',
          'Return an enum that implements `Iterator` and dispatches manually.',
          'All of the above work, but B is the idiomatic minimal fix when the two iterators have unrelated concrete types.',
        ],
        correctIndex: 3,
        explanation:
          '`impl Trait` return position requires a *single* concrete type. Two different iterator combinator chains have different anonymous types, so the function cannot return both. Options A, B, and C all work: A forces them into `vec::IntoIter` (allocates), B uses dynamic dispatch (one heap allocation per call), C uses a hand-rolled `Either` enum (zero heap allocation but more boilerplate). For ad-hoc code, B is the idiomatic minimal fix.',
      },
      {
        kind: 'mcq',
        id: 'rust-4-mcq-8',
        prompt:
          'The compiler reports:\n```\nerror[E0119]: conflicting implementations of trait `From<MyType>` for type `MyType`\n --> src/lib.rs:8:1\n  |\n8 | impl From<MyType> for MyType {\n  | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  |\nnote: conflicting implementation in crate `core`:\n        - impl<T> From<T> for T;\n```\nThe code is:\n```rust\nstruct MyType;\n\nimpl From<MyType> for MyType {\n    fn from(x: MyType) -> MyType { x }\n}\n```\nWhy does this conflict, and what is the fix?',
        options: [
          'The standard library has a blanket `impl<T> From<T> for T`, so your impl duplicates it — delete your impl; `MyType::from(x)` already works.',
          '`From` is sealed — only the standard library may implement it.',
          'You must declare `MyType` as `#[derive(From)]` instead.',
          'Add a generic parameter: `impl<U> From<U> for MyType` — the orphan rule then allows it.',
        ],
        correctIndex: 0,
        explanation:
          'The standard library provides a blanket reflexive `impl<T> From<T> for T` (the identity conversion). Any user impl of `From<T> for T` collides with it. The fix is to simply delete the redundant impl; `MyType::from(x)` is already available via the blanket impl. (B) is wrong: `From` is not sealed; you implement it constantly. (D) violates type parameter constraints and the orphan rule. Reading "conflicting implementations" errors is a critical skill — they always point at *both* impls.',
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
          'A thread panics while holding a `MutexGuard`. The main thread later does `let g = m.lock().unwrap();` and panics with:\n```\nthread \'main\' panicked at \'called `Result::unwrap()` on an `Err` value: PoisonError { .. }\'\n```\nWhich statement is accurate?',
        options: [
          'The mutex is corrupted and the only fix is to abort the process — there is no recovery API.',
          'The lock returned `Err(PoisonError)`; you can recover the guard with `.unwrap_or_else(|e| e.into_inner())`, accepting that the protected data may be in an inconsistent state.',
          'Poisoning is automatically cleared on the next successful `lock()`.',
          '`parking_lot::Mutex` poisons exactly like `std::sync::Mutex` does.',
        ],
        correctIndex: 1,
        explanation:
          'When a thread panics while holding `MutexGuard`, std marks the mutex as poisoned. Subsequent `.lock()` calls return `Err(PoisonError<MutexGuard<T>>)`. You can recover with `.into_inner()` on the error if you have audited that your data structure is robust to mid-write panics. `parking_lot::Mutex` deliberately *does not* poison — that is one of its selling points. So if poisoning is causing more pain than safety, `parking_lot` is the standard alternative.',
      },
      {
        kind: 'mcq',
        id: 'rust-5-mcq-7',
        prompt:
          'The program panics:\n```\nthread \'<unnamed>\' panicked at \'send failed\', src/main.rs:12:14\nnote: `SendError { .. }` — sending on a closed channel\n```\nThe code is:\n```rust\nuse std::sync::mpsc;\nuse std::thread;\n\nfn main() {\n    let (tx, rx) = mpsc::channel::<i32>();\n    drop(rx); // simulate consumer exit\n    thread::spawn(move || {\n        for i in 0..3 {\n            tx.send(i).unwrap();\n        }\n    }).join().unwrap();\n}\n```\nWhich is the correct interpretation?',
        options: [
          '`tx.send` panics whenever the channel buffer is full.',
          '`tx.send` returns `Err(SendError)` whenever the receiver has been dropped — the producer should handle the error (e.g. exit cleanly) rather than `.unwrap()`-ing it.',
          'You must use `sync_channel` for senders to detect a closed channel.',
          'The fix is to call `tx.flush()` before sending.',
        ],
        correctIndex: 1,
        explanation:
          '`mpsc::Sender::send` returns `Err(SendError)` when *all* `Receiver`s have been dropped (the channel is closed). It does *not* signal a full buffer — `mpsc::channel` is unbounded by design; only `sync_channel(n)` blocks/errors on backpressure. The bug here is `.unwrap()` on a `send` that may legitimately fail when the consumer exits. The right pattern is `if tx.send(i).is_err() { break; }` so the producer terminates cleanly.',
      },
      {
        kind: 'mcq',
        id: 'rust-5-mcq-8',
        prompt:
          'Which trait must a type implement to be sent across thread boundaries in Rust?',
        options: ['`Clone`', '`Copy`', '`Send`', '`Sync`'],
        correctIndex: 2,
        explanation:
          '`Send` indicates a type can be transferred to another thread. `Sync` indicates a type can be *shared* (via reference) between threads. Most standard types implement both automatically. `Rc<T>` and `RefCell<T>` deliberately do not implement `Send`/`Sync`. See Rust Book Ch 16.4.',
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
          'The program panics:\n```\nthread \'main\' panicked at \'already borrowed: BorrowMutError\', src/main.rs:8:25\n```\nThe code is:\n```rust\nuse std::cell::RefCell;\n\nfn main() {\n    let data = RefCell::new(vec![1, 2, 3]);\n    let borrow = data.borrow();\n    println!("len={}", borrow.len());\n    data.borrow_mut().push(4);\n    println!("done");\n}\n```\nWhich fix resolves the panic and prints both lines?',
        options: [
          'Wrap the read in a block so `borrow` is dropped before `borrow_mut`: `{ let borrow = data.borrow(); println!("len={}", borrow.len()); }` then call `data.borrow_mut().push(4);`.',
          'Replace `RefCell::new` with `Cell::new` — `Cell` does not panic.',
          'Call `drop(borrow);` would also work but only because `borrow` is no longer used after the println.',
          'Both A and C resolve the panic; A is the idiomatic block-scoped fix.',
        ],
        correctIndex: 3,
        explanation:
          '`RefCell` enforces "shared XOR mutable" at runtime. The error means a `Ref<T>` from `.borrow()` was still alive when `.borrow_mut()` was called. The fix is to end the read borrow before starting the write — either with an explicit scope (A) or an explicit `drop()` (C). (B) `Cell` only supports `Copy` types; it cannot hold `Vec`. (NLL ends the lifetime of `borrow` at its last *use*, so in newer compilers this specific snippet may not panic — but rely on explicit scoping, do not depend on NLL precision for correctness.)',
      },
      {
        kind: 'mcq',
        id: 'rust-6-mcq-7',
        prompt:
          'The compiler reports:\n```\nerror[E0277]: `from_iter` is not satisfied for `Pin<Box<dyn Future<Output = u32>>>`\nhelp: `Pin<Box<T>>` does not implement `DerefMut` without `T: Unpin`\n```\nWhat does `Pin<Box<T>>` forbid and why is it the canonical wrapper for self-referential futures?',
        options: [
          '`Pin<Box<T>>` forbids dropping the value.',
          '`Pin<Box<T>>` forbids moving (and therefore obtaining a `&mut T`) for types that are not `Unpin` — async state machines generated by `async fn` contain potential self-references across `.await` points, so moving them after polling would invalidate those internal pointers.',
          '`Pin<Box<T>>` forbids cloning.',
          '`Pin<Box<T>>` is equivalent to `Box<T>` plus `#[no_mangle]`.',
        ],
        correctIndex: 1,
        explanation:
          'Pinning is about *address stability*: once a value is pinned, its memory address must not change for the rest of its life. Async state machines may have fields that reference other fields of the same struct; moving the struct would invalidate those references. `Pin` enforces the contract at the type level. Types that opt out — `Unpin` — promise they are safe to move; most types (including primitives, `Box`, `String`, etc.) are `Unpin`. The state machine generated by `async fn` is *not* `Unpin` in the general case. See `std::pin` docs.',
      },
      {
        kind: 'mcq',
        id: 'rust-6-mcq-8',
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
          'The HTTP service freezes under load. A profile shows all 8 worker threads stuck inside a single function:\n```rust\nasync fn read_config() -> Result<Config, anyhow::Error> {\n    let bytes = std::fs::read("config.json")?;\n    let cfg: Config = serde_json::from_slice(&bytes)?;\n    Ok(cfg)\n}\n```\nThe runtime is `#[tokio::main]` (multi-thread, 8 workers). Which fix is **correct and idiomatic**?',
        options: [
          'Replace `std::fs::read` with `tokio::fs::read("config.json").await?` — the tokio variant uses an internal blocking pool and does not block the runtime worker.',
          'Wrap the blocking call with `tokio::task::spawn_blocking(|| std::fs::read("config.json")).await??` if a non-tokio API must be used.',
          'Both A and B are correct; A is preferred for filesystem ops where a tokio equivalent exists, B is the general escape hatch for sync libraries.',
          'Add `#[tokio::main(flavor = "current_thread")]` so the runtime is single-threaded.',
        ],
        correctIndex: 2,
        explanation:
          'Classic foot-gun: `std::fs::read` blocks the current OS thread synchronously. Inside a tokio worker, that thread is one of N executor threads — blocking it starves all other tasks scheduled on it. (A) `tokio::fs::read` delegates to an internal blocking pool. (B) `spawn_blocking` is the general escape hatch for any blocking call. Both are correct; A is more idiomatic when a tokio equivalent exists. (D) makes the problem strictly worse: a single-threaded runtime blocked by one task freezes the entire program.',
      },
      {
        kind: 'mcq',
        id: 'rust-7-mcq-7',
        prompt:
          'A test reports `tokio` log lines from a background task occasionally not appearing:\n```rust\n#[tokio::main]\nasync fn main() {\n    tokio::spawn(async {\n        tracing::info!("background work starting");\n        do_long_work().await;\n        tracing::info!("background work done");\n    });\n    // main returns here\n}\n```\nWhich statement is accurate?',
        options: [
          'The dropped `JoinHandle` cancels the task. False — the task continues detached.',
          'Returning from `main` shuts down the tokio runtime, which drops all pending tasks (whether or not their `JoinHandle` was kept) — the background task may be cut off mid-execution.',
          '`tokio::spawn` requires the closure to be `\'static + Send`; dropping the handle is unrelated.',
          'You must store the `JoinHandle` in a global to keep the task alive.',
        ],
        correctIndex: 1,
        explanation:
          'Two separate facts. (1) Dropping a `JoinHandle` does *not* cancel the task — it detaches; the task continues. (2) But when `main` returns, the tokio runtime is dropped, and dropping the runtime drops every still-running task. The fix is to keep the `JoinHandle` and `.await` it before `main` returns (or use `tokio::join!`, structured concurrency, or `tokio::task::JoinSet`). This is the canonical "fire-and-forget surprised me" async bug.',
      },
      {
        kind: 'mcq',
        id: 'rust-7-mcq-8',
        prompt:
          'A TCP server loop never exits on Ctrl-C:\n```rust\nloop {\n    let (socket, _) = listener.accept().await?;\n    tokio::spawn(handle(socket));\n}\n```\nWhich rewrite gracefully shuts down on Ctrl-C?',
        options: [
          'Wrap the loop body in `tokio::select!` with a branch on `tokio::signal::ctrl_c()`: `tokio::select! { res = listener.accept() => { /* spawn */ } _ = tokio::signal::ctrl_c() => break, }`.',
          'Call `std::process::exit(0)` from a signal handler thread.',
          'Use `tokio::time::timeout(Duration::from_secs(1), listener.accept())` so the loop wakes periodically.',
          'Set `RUST_LOG=info` and rely on the runtime to catch SIGINT.',
        ],
        correctIndex: 0,
        explanation:
          'A naked `loop { listener.accept().await; }` has no cancellation point — Ctrl-C never reaches the accept future on its own. The idiomatic fix is `tokio::select!` racing the accept against `tokio::signal::ctrl_c()`. When the signal future completes first, the select branch drops the in-flight `accept` future (cancelling it) and breaks the loop. This pattern is the foundation of graceful shutdown in tokio servers. See tokio select! tutorial.',
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
          'A `macro_rules!` macro is causing strange runtime behaviour. The user wrote:\n```rust\nmacro_rules! swap {\n    ($a:expr, $b:expr) => {{\n        let tmp = $a;\n        $a = $b;\n        $b = tmp;\n    }};\n}\n\nfn main() {\n    let mut tmp = 1;\n    let mut x = 2;\n    swap!(tmp, x);\n    println!("tmp={tmp}, x={x}");\n}\n```\nThe user expects `tmp=2, x=1` but the program prints `tmp=2, x=2`. What is happening, and what is the canonical fix?',
        options: [
          'Macro hygiene is *not* broken here — the issue is that `swap!` re-binds `tmp` shadow-style. Use distinct identifiers inside the macro generated via a unique name pattern, or use `mem::swap`.',
          '`macro_rules!` is hygienic with respect to *local* identifiers — `let tmp = $a;` inside the macro is a *different* `tmp` than the caller\'s. The visible bug is from the macro substituting `$a = $b;` as `tmp = x;` — the macro\'s `let tmp` shadowed the caller\'s value before the assignment. Use distinct internal names (e.g. `__swap_tmp`) or `std::mem::swap`.',
          'The bug is unrelated to hygiene — it is an iterator invalidation issue.',
          'You must call `swap!` inside an `unsafe` block.',
        ],
        correctIndex: 1,
        explanation:
          '`macro_rules!` *is* hygienic for *new* identifiers (the `let tmp = $a;` introduces a `tmp` that does not collide with the caller\'s `tmp`). However, when the caller passes `tmp` *as an argument* (`$a`), substitution makes `$a = $b;` expand to `tmp = x;` — and the macro\'s inner `let tmp` shadowed the *caller\'s* `tmp` before that assignment. So `$a = $b;` writes to the macro-local shadow, then the outer `tmp` is unchanged from the original value `2` produced by the prior `let tmp = $a;` line. The reliable fix is `std::mem::swap(&mut $a, &mut $b)`. See The Little Book of Rust Macros — "Hygiene".',
      },
      {
        kind: 'mcq',
        id: 'rust-8-mcq-7',
        prompt:
          'A proc-macro produces this compile error in the *consumer* crate:\n```\nerror: proc-macro derive panicked\n --> consumer/src/main.rs:5:10\n  |\n5 | #[derive(Builder)]\n  |          ^^^^^^^\n  |\n  = help: message: called `Result::unwrap()` on an `Err` value: Error(\"expected struct\")\n```\nThe proc-macro source has `let input = syn::parse_macro_input!(input as DeriveInput); let s = match input.data { Data::Struct(s) => s, _ => panic!("expected struct") };`. What is the correct, user-friendly fix?',
        options: [
          'Replace `panic!` with `syn::Error::new(input.ident.span(), "Builder only supports structs").to_compile_error().into()` — this emits a proper compile error pointing at the user\'s code, not a proc-macro panic.',
          'Wrap the whole macro in `std::panic::catch_unwind` so panics become recoverable.',
          'Add `#[allow(panic)]` to the macro body.',
          'Use `eprintln!` to log instead of panicking.',
        ],
        correctIndex: 0,
        explanation:
          'A proc-macro that panics surfaces an ugly "proc-macro derive panicked" diagnostic with the raw panic message. The user-friendly pattern is to return a `TokenStream` containing a `syn::Error::new(span, "message").to_compile_error()` — this produces a normal compile error with a span pointing at the offending input. This is exactly what well-behaved crates (serde, thiserror) do. See `syn` docs on error reporting.',
      },
      {
        kind: 'mcq',
        id: 'rust-8-mcq-8',
        prompt:
          'A consumer uses your `#[derive(Builder)]` proc-macro on a struct with a private field, and gets:\n```\nerror[E0451]: field `email` of struct `User` is private\n  --> consumer/src/main.rs:12:5\n   |\n12 |     .email("a@b.com".into())\n   |     ^^^^^^^^^^^^^^^^^^^^^^^^ private field\n```\nThe proc-macro generates a setter method that does `self.email = value;`. What is the *root cause*, and what is the canonical fix?',
        options: [
          'Proc-macro derives expand in the same module as the struct, so they can access private fields freely. The error means the derive is not being applied to the same struct — check the import path.',
          'Derive proc-macros generate code that is *spliced into the consumer crate at the module of the derived struct*, so the generated `impl` block sits next to the struct — and *can* access private fields. The error here is from the consumer\'s `main()` calling `.email("..")` from *outside* the struct\'s module. The fix is to make the field `pub(crate)` or for the builder to expose a public `email()` setter that the consumer calls, not a direct field assignment.',
          'Add `#[builder(private)]` to skip private fields.',
          'Mark the entire struct `pub` to bypass field visibility.',
        ],
        correctIndex: 1,
        explanation:
          'Proc-macro derives produce `impl` blocks that appear *next to the struct definition* — they have full access to private fields *of that struct*. The reported error is in `consumer/src/main.rs` calling the generated setter from outside the struct\'s module. Two fixes: (1) the proc-macro could generate setter *methods* with the appropriate `pub` visibility — those methods would assign the private fields *from inside the impl block* (which is legal). (2) The user can move the consumer code inside the struct\'s module or make the field `pub(crate)`. Most builder macros take option (1). Reading "field is private" errors requires distinguishing the *site of the error* (consumer code) from the *site of the field declaration* (the struct module).',
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
          'A wrapper around a C function segfaults at runtime:\n```rust\nextern "C" {\n    fn strlen(s: *const libc::c_char) -> libc::size_t;\n}\n\nfn safe_strlen(s: &str) -> usize {\n    unsafe { strlen(s.as_ptr() as *const libc::c_char) }\n}\n\nfn main() {\n    let n = safe_strlen("hello");\n    println!("{n}");\n}\n```\nWhich statement diagnoses the root cause?',
        options: [
          'Rust `&str` is *not* null-terminated; `strlen` walks past the end of the slice into adjacent memory until it finds a stray `\\0`. The fix is `CString::new(s)?` to construct a null-terminated copy, then call `strlen(c_str.as_ptr())`.',
          'The cast `as *const libc::c_char` is wrong; you must use `as *mut libc::c_char`.',
          '`strlen` requires `unsafe impl Send`.',
          'The fix is to allocate the string in a `Box` first.',
        ],
        correctIndex: 0,
        explanation:
          'Rust strings store a pointer + length; they are *not* null-terminated. Passing `&str` directly to any C function expecting a C string (`const char *` with implicit `\\0` terminator) is UB — `strlen` will scan past the slice end until it stumbles on a zero byte. The canonical fix is `std::ffi::CString::new(s)?` which copies the bytes and appends a `\\0`, then call `.as_ptr()`. `CStr::from_ptr` is the reverse for C→Rust. This is the most common FFI bug. See Nomicon FFI chapter.',
      },
      {
        kind: 'mcq',
        id: 'rust-9-mcq-7',
        prompt:
          'Code that compiles in `--debug` produces nonsense output in `--release`:\n```rust\nfn alias_two_mut(a: &mut u32, b: &mut u32) {\n    *a = 1;\n    *b = 2;\n}\n\nfn main() {\n    let mut x = 0u32;\n    let p = &mut x as *mut u32;\n    unsafe { alias_two_mut(&mut *p, &mut *p); }\n    println!("{x}");\n}\n```\nWhat is the root cause?',
        options: [
          'The Rust optimiser miscompiled the program.',
          'Constructing two `&mut u32` to the same memory is *undefined behaviour* under Rust\'s aliasing rules — even via raw pointers, the moment you produce two simultaneous `&mut` references, the optimiser is free to assume they do not alias and may reorder or fold writes arbitrarily. Use raw pointers throughout or `UnsafeCell`.',
          'You need to add `#[inline(never)]` to `alias_two_mut`.',
          'The fix is to wrap `x` in a `Mutex`.',
        ],
        correctIndex: 1,
        explanation:
          'Rust\'s aliasing rules apply to *references* themselves, not just to safe code. Creating two `&mut T` to the same memory is UB regardless of whether you used `unsafe` to construct them. The optimiser exploits this assumption — in `--release` it may reorder or elide writes. To safely have two pointers to the same memory, keep them as raw pointers (`*mut T`) and never form two simultaneous `&mut`, or use `UnsafeCell<T>` which opts that allocation out of the noalias guarantee. Miri catches this with `cargo +nightly miri run`. See Nomicon — "Aliasing".',
      },
      {
        kind: 'mcq',
        id: 'rust-9-mcq-8',
        prompt:
          'A `no_std` embedded project fails to build:\n```\nerror[E0463]: can\'t find crate for `std`\n --> src/main.rs:1:1\n  |\n1 | use std::collections::HashMap;\n  | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ can\'t find crate\nnote: the `thumbv7em-none-eabihf` target may not support the standard library\n```\nThe crate has `#![no_std]` at the top of `main.rs`. Which is the *correct minimal fix* that keeps the embedded target working?',
        options: [
          'Remove `#![no_std]` — embedded crates always have `std` available.',
          'Replace `std::collections::HashMap` with a hash map from a `no_std`-compatible crate (`hashbrown::HashMap` is the canonical choice; `BTreeMap` from `alloc::collections` works without a hasher if `alloc` is available).',
          'Switch the target to `x86_64-unknown-linux-gnu`.',
          'Add `extern crate std;` to override the `no_std` attribute.',
        ],
        correctIndex: 1,
        explanation:
          '`no_std` removes the `std` crate. `HashMap` lives in `std::collections` and depends on OS-provided RNG seeding for its `RandomState`. On `no_std` you have two idiomatic options: (1) `hashbrown::HashMap` (the actual implementation `std::collections::HashMap` is built on, available standalone with `no_std` support — supply your own hasher), or (2) `alloc::collections::BTreeMap` which needs only `alloc`. Option (D) is wrong: `extern crate std;` on a target without `std` still fails. See the Embedded Rust Book.',
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
          'A criterion benchmark report shows:\n```\nbench/sort     time:   [12.3 ms 12.5 ms 12.7 ms]\n              change: [+0.8% +1.5% +2.3%] (p = 0.04 < 0.05)\n              Performance has regressed.\n```\nAt the same time the previous run was `[12.1 ms 12.3 ms 12.5 ms]`. Which interpretation is most defensible?',
        options: [
          'The regression is real — criterion\'s 95% confidence intervals do not overlap heavily and p < 0.05.',
          'The regression is almost certainly noise because the CIs overlap heavily ([12.3..12.7] vs [12.1..12.5]) — a 1.5% reported change at this overlap is often within the noise floor of a typical desktop machine. Pin CPU frequency, close other apps, run more samples, and consider a >5% threshold before flagging regressions.',
          'You should immediately git-bisect to find the offending commit.',
          'Switch to `Instant::now()` for more reliable timing.',
        ],
        correctIndex: 1,
        explanation:
          'Reading criterion output requires checking *how much* the CIs overlap, not just the p-value. The new range [12.3..12.7] and the old range [12.1..12.5] overlap by 0.2 ms — almost half the total CI width. A statistically significant 1.5% delta on a noisy desktop machine is usually below the practical noise floor. Best practice: pin CPU frequency (`sudo cpupower frequency-set --governor performance`), disable turbo, close other apps, increase sample size, and adopt a project-wide minimum-delta threshold (e.g. ignore <5%). Treating every flagged regression as real causes alarm fatigue.',
      },
      {
        kind: 'mcq',
        id: 'rust-10-mcq-7',
        prompt:
          'Switching the global allocator to jemalloc improves your service throughput by 30%:\n```rust\n#[global_allocator]\nstatic GLOBAL: tikv_jemallocator::Jemalloc = tikv_jemallocator::Jemalloc;\n```\nWhich statement is the *most likely* explanation?',
        options: [
          'jemalloc is always 30% faster than the system allocator on every workload.',
          'Multi-threaded services with frequent small allocations are usually bottlenecked on the allocator\'s lock contention; jemalloc uses per-thread arenas to reduce contention, so workloads with that pattern see large wins. Single-threaded or allocation-light workloads see little or no improvement.',
          'jemalloc disables `Drop` calls, which is why allocations are faster.',
          'jemalloc allocates on the stack instead of the heap.',
        ],
        correctIndex: 1,
        explanation:
          'jemalloc is not magic. Its main advantage on multi-threaded servers is per-thread arenas that eliminate the bottleneck of a single global lock guarding the allocator (which is what glibc\'s `malloc` historically had on Linux). For services that allocate frequently across many threads, the improvement is dramatic; for CPU-bound, allocation-free workloads, it is negligible. Always measure first — `heaptrack` and `cargo flamegraph` will show whether you are allocator-bound before you swap allocators.',
      },
      {
        kind: 'mcq',
        id: 'rust-10-mcq-8',
        prompt:
          '`cargo flamegraph` shows a mysterious wide bar at the top of the stack labelled `__memcpy_avx_unaligned_erms`. The function calling it is `fn process(items: &[Record]) -> Vec<Record>` where `Record` is a 256-byte struct. Which interpretation is most useful?',
        options: [
          'A `memcpy` hot spot inside Rust code usually points to value-typed data being moved or cloned implicitly — e.g. `vec.push(record)` copies all 256 bytes per element. Fixes: use `Vec<Box<Record>>` to copy only an 8-byte pointer; pre-allocate with `Vec::with_capacity(n)` to avoid repeated reallocs (each grow `memcpy`s the whole buffer); use `mem::take` / `swap` instead of clone where possible.',
          'The flamegraph is misleading — `memcpy` is part of glibc and not your code.',
          'The fix is to disable SIMD.',
          'Recompile with `RUSTFLAGS="-C opt-level=3"`.',
        ],
        correctIndex: 0,
        explanation:
          'Wide `memcpy` frames in a Rust flamegraph almost always mean *value-type data is being copied implicitly*. For a 256-byte `Record`, every `push`, `clone`, sort swap, or `Vec` reallocation copies the whole struct. Standard remediations: store `Box<Record>` (8-byte pointer copies), reserve capacity to avoid reallocs, sort indices instead of values, or partition the struct ("struct of arrays" instead of "array of structs"). Reading flamegraphs is mostly pattern-recognising these costs.',
      },
    ],
  },
];
