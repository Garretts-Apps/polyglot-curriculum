import type { Phase } from './types';

export const rustPhases: Phase[] = [
  // ─── L1: Hello Cargo ────────────────────────────────────────────────────────
  {
    id: 'rust-1',
    language: 'rust',
    level: 1,
    title: 'Hello Cargo',
    timeEstimate: '4-6 hours',
    intro: `Rust begins with tooling: \`rustup\` manages toolchains and \`cargo\` is your all-in-one build system, package manager, and test runner. In this phase you will install the toolchain, create your first project with \`cargo new\`, and learn the core syntax — primitive types (\`i32\`, \`f64\`, \`bool\`, \`char\`, \`&str\`), variables (\`let\` / \`let mut\`), control flow (\`if\`, \`loop\`, \`while\`, \`for\`), and how to define and call functions.\n\nBy the end you will understand why Rust separates \`println!\` (a macro) from a plain function call, how Rust's type inference works, and why shadowing differs from mutation. These fundamentals map directly to chapters 1-3 of *The Rust Programming Language* (a.k.a. "The Book").`,
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
      'A `cargo new hello_rust` project that prints a Fibonacci sequence up to n=10 using a loop, demonstrates at least one shadowed variable, and compiles with `cargo build --release` cleanly.',
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
          '`cargo new my_app` creates a new binary crate. `cargo init` works on an existing directory. There is no `rust new` command.',
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
          'Rust bindings are immutable by default. `mut` opts the binding into mutability. This is separate from constants (`const`) which require a type annotation and a compile-time value.',
      },
      {
        kind: 'code',
        id: 'rust-1-code-1',
        prompt:
          'Write a `fn add(a: i32, b: i32) -> i32` function and call it in `main` to print the sum of 7 and 5.',
        starterCode: `fn add(a: i32, b: i32) -> i32 {
    // your code here
    0
}

fn main() {
    let result = add(7, 5);
    println!("{}", result);
}`,
        expectedOutput: '12',
        hint: 'Return `a + b` from the function body. The last expression in a block is the return value — no semicolon needed.',
      },
      {
        kind: 'code',
        id: 'rust-1-code-2',
        prompt:
          'Use a `for` loop over a range to print the numbers 1 through 5, each on its own line.',
        starterCode: `fn main() {
    // your code here
}`,
        expectedOutput: `1
2
3
4
5`,
        hint: 'Use `for i in 1..=5 { println!("{}", i); }`. The `..=` syntax makes the range inclusive.',
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
    intro: `Ownership is Rust's central innovation: every value has exactly one owner, and when the owner goes out of scope the value is dropped — no GC required. This phase covers the three ownership rules, move semantics, the borrowing rules (any number of shared references *or* exactly one mutable reference), and how lifetimes are inferred by the compiler. You will also learn string slices (\`&str\`) and array slices (\`&[T]\`) which are the canonical way to pass string data without taking ownership.\n\nUnderstanding the borrow checker is the biggest hurdle in learning Rust. Work through The Book chapters 4 and 5 slowly; the animated diagrams in the online version are especially helpful for visualising the stack vs. heap.`,
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
      'A small library (`src/lib.rs`) with functions `first_word(s: &str) -> &str` and `longest<\'a>(x: &\'a str, y: &\'a str) -> &\'a str`, each with a unit test (`#[cfg(test)]`).',
    checks: [
      {
        kind: 'mcq',
        id: 'rust-2-mcq-1',
        prompt:
          'Why does the following code fail to compile?\n```rust\nlet s1 = String::from("hello");\nlet s2 = s1;\nprintln!("{}", s1);\n```',
        options: [
          'Strings cannot be printed with `{}`.',
          'The value was moved into `s2`; `s1` is no longer valid.',
          '`s1` must be declared `mut` to be used after assignment.',
          'This is valid Rust — it prints "hello".',
        ],
        correctIndex: 1,
        explanation:
          '`String` does not implement `Copy`, so `let s2 = s1` moves ownership into `s2`. Using `s1` afterwards is a compile error. Use `.clone()` if you need both variables.',
      },
      {
        kind: 'mcq',
        id: 'rust-2-mcq-2',
        prompt:
          'How many mutable references to the same value can exist in the same scope in Rust?',
        options: ['Unlimited', 'Two', 'Exactly one', 'Zero'],
        correctIndex: 2,
        explanation:
          'Rust enforces that you can have *either* any number of immutable (`&T`) references *or* exactly one mutable (`&mut T`) reference at a time. This prevents data races at compile time.',
      },
      {
        kind: 'code',
        id: 'rust-2-code-1',
        prompt:
          'Implement `fn sum_slice(nums: &[i32]) -> i32` that returns the sum of all elements, then call it with `&[1, 2, 3, 4, 5]` and print the result.',
        starterCode: `fn sum_slice(nums: &[i32]) -> i32 {
    // your code here
    0
}

fn main() {
    let numbers = [1, 2, 3, 4, 5];
    println!("{}", sum_slice(&numbers));
}`,
        expectedOutput: '15',
        hint: 'Iterate with `for n in nums { ... }` or use `.iter().sum()`.',
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
    intro: `Rust's type system shines in its enums: unlike C enums they can carry data, making them algebraic data types. \`Option<T>\` replaces null pointers and \`Result<T, E>\` replaces exceptions — both are enums in the standard library. Pattern matching with \`match\` is exhaustive, so the compiler ensures you handle every variant.\n\nThis phase also introduces modules (\`mod\`, \`pub\`, \`use\`) and the workspace layout conventions that cargo enforces. You will write your first idiomatic error propagation using the \`?\` operator, and learn when to use \`unwrap\` in tests vs. production code.`,
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
      'A `Shape` enum with variants `Circle { radius: f64 }` and `Rectangle { width: f64, height: f64 }`, an `area(&self) -> f64` method, and a `from_str` constructor returning `Result<Shape, String>`. All covered by unit tests.',
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
          '`Option<T>` is an enum with two variants: `Some(T)` when a value is present and `None` when it is absent. It replaces nullable pointers and forces the caller to handle both cases.',
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
          '`?` is syntax sugar: if the `Result` is `Ok(v)` it evaluates to `v`; if it is `Err(e)` it converts `e` (using `From`) and returns early with `Err(converted_e)`. It requires the enclosing function to return a compatible `Result` or `Option`.',
      },
      {
        kind: 'code',
        id: 'rust-3-code-1',
        prompt:
          'Define an enum `Direction` with variants `North`, `South`, `East`, `West`. Write a `fn describe(d: Direction) -> &\'static str` that returns `"north"`, `"south"`, `"east"`, or `"west"` using `match`. Print the result of `describe(Direction::East)`.',
        starterCode: `enum Direction {
    North,
    South,
    East,
    West,
}

fn describe(d: Direction) -> &'static str {
    // your match here
    ""
}

fn main() {
    println!("{}", describe(Direction::East));
}`,
        expectedOutput: 'east',
        hint: 'Use `match d { Direction::North => "north", ... }`.',
      },
      {
        kind: 'code',
        id: 'rust-3-code-2',
        prompt:
          'Write `fn divide(a: f64, b: f64) -> Result<f64, String>` that returns `Err("division by zero".to_string())` when `b == 0.0`, otherwise `Ok(a / b)`. Print the result of `divide(10.0, 2.0).unwrap()`.',
        starterCode: `fn divide(a: f64, b: f64) -> Result<f64, String> {
    // your code here
    Ok(0.0)
}

fn main() {
    println!("{}", divide(10.0, 2.0).unwrap());
}`,
        expectedOutput: '5',
        hint: 'Check `if b == 0.0 { return Err(...) }` at the top of the function.',
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
    intro: `Traits are Rust's abstraction mechanism — similar to interfaces but more powerful because they support default implementations, blanket implementations, and the \`impl Trait\` / \`dyn Trait\` dispatch choices. Combined with generics, traits let you write zero-cost abstractions: the compiler monomorphises generic code at compile time.\n\nIterators are pervasive in idiomatic Rust. The \`Iterator\` trait's lazy adapter methods (\`map\`, \`filter\`, \`fold\`, \`flat_map\`, \`chain\`, \`zip\`) replace most explicit loops. Closures capture their environment by reference, mutable reference, or value (\`move\`). This phase closes with an introduction to \`Box<T>\`, \`Rc<T>\`, and trait objects (\`dyn Trait\`), and covers writing and running unit/integration tests.`,
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
      'A generic `Stack<T>` struct implementing `push`, `pop -> Option<T>`, and `peek -> Option<&T>`, a `Display` impl, and a `from_iter` constructor. Full test suite with `#[test]`.',
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
          '`impl Trait` in return position means the concrete type is known at compile time (the compiler may monomorphise). `dyn Trait` uses a vtable and allows heterogeneous collections of trait objects, at the cost of a pointer indirection per call.',
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
          '`map` returns a lazy `Map` iterator — nothing is computed until you consume it (e.g. with `.collect()`). `for_each` is eager but does not produce a new iterator.',
      },
      {
        kind: 'code',
        id: 'rust-4-code-1',
        prompt:
          'Use iterator adapters to take the vector `[1, 2, 3, 4, 5, 6]`, keep only even numbers, square them, and print their sum.',
        starterCode: `fn main() {
    let nums = vec![1, 2, 3, 4, 5, 6];
    let result: i32 = nums.iter()
        // chain .filter() and .map() here, then .sum()
        .sum();
    println!("{}", result);
}`,
        expectedOutput: '56',
        hint: 'Even numbers are 2, 4, 6. Their squares are 4, 16, 36. Sum = 56. Use `.filter(|&&x| x % 2 == 0).map(|&x| x * x).sum()`.',
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
    intro: `Rust's ownership model makes fearless concurrency possible: the \`Send\` and \`Sync\` marker traits are automatically derived and encode thread-safety at the type level. \`std::thread::spawn\` + \`std::sync::{Mutex, RwLock, Arc}\` give you shared-state concurrency, while \`std::sync::mpsc\` channels give you message-passing concurrency — both styles are idiomatic.\n\nThis phase also introduces the two dominant error-handling crates: \`anyhow\` for application-level error propagation (ergonomic, context-rich) and \`thiserror\` for library crates that need typed, derivable errors. You will learn when each is appropriate and how they compose with the standard \`std::error::Error\` trait.`,
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
      'A multi-threaded word-count program: spawn one thread per line of a hardcoded string slice, count words in each thread, send counts through an `mpsc` channel, and aggregate the total in the main thread. Print the final count.',
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
          '`Mutex<T>` alone cannot be shared between threads because it is not `Clone`. `Arc<T>` (atomically reference-counted) allows multiple owners across threads. `Rc<T>` is *not* `Send`, so it cannot cross thread boundaries.',
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
        kind: 'code',
        id: 'rust-5-code-1',
        prompt:
          'Use `std::thread::spawn` to compute the squares of 1-4 in parallel, join all threads, and print their sum.',
        starterCode: `fn main() {
    let handles: Vec<_> = (1..=4)
        .map(|i| {
            std::thread::spawn(move || i * i)
        })
        .collect();

    let sum: i32 = handles.into_iter()
        // join each handle and unwrap
        .map(|h| h.join().unwrap())
        .sum();

    println!("{}", sum);
}`,
        expectedOutput: '30',
        hint: '1² + 2² + 3² + 4² = 1 + 4 + 9 + 16 = 30. The starter code is nearly complete — just verify the `.map(|h| h.join().unwrap())` line.',
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
    intro: `Rust's smart pointer types extend ownership beyond the single-owner rule in controlled ways. \`Box<T>\` allocates on the heap and enables recursive types. \`Rc<T>\` / \`Arc<T>\` enable shared ownership through reference counting (single-threaded vs. thread-safe). \`RefCell<T>\` moves borrow checking to runtime, enabling interior mutability — the ability to mutate data even when you only hold an immutable reference.\n\nThis phase also covers \`Cow<T>\` (clone-on-write) for efficient APIs that avoid unnecessary allocations, and \`Pin<P>\` which is necessary background for async Rust. You will implement a singly-linked list using \`Box\` and understand why naive implementations with \`Rc<RefCell<T>>\` can create reference cycles.`,
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
      'A `ConsList<T>` recursive enum (`Cons(T, Box<ConsList<T>>)` / `Nil`) with `push` and `to_vec` methods, plus a demonstration of `Rc<RefCell<i32>>` shared mutation between two owners, all tested.',
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
          'Rust must know the size of every type at compile time. A recursive type without indirection has infinite size. `Box<List>` has a fixed size (one pointer) that breaks the recursion.',
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
          '`Cell<T>` is limited to `Copy` types and only offers `get`/`set`. `RefCell<T>` works with non-`Copy` types and provides `borrow()` → `Ref<T>` and `borrow_mut()` → `RefMut<T>`, enforcing borrowing rules at runtime instead of compile time.',
      },
      {
        kind: 'code',
        id: 'rust-6-code-1',
        prompt:
          'Use `Rc::clone` to give two variables ownership of the same `Vec<i32>`. Print the reference count after each clone using `Rc::strong_count`.',
        starterCode: `use std::rc::Rc;

fn main() {
    let a = Rc::new(vec![1, 2, 3]);
    println!("count after a = {}", Rc::strong_count(&a));
    let b = Rc::clone(&a);
    println!("count after b = {}", Rc::strong_count(&a));
    drop(b);
    println!("count after drop b = {}", Rc::strong_count(&a));
}`,
        expectedOutput: `count after a = 1
count after b = 2
count after drop b = 1`,
        hint: 'The starter code is already correct — run it to verify your understanding of reference counting.',
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
    intro: `Async Rust is built on the \`Future\` trait: a state machine polled by a runtime until it produces a value. The \`async\`/\`await\` syntax desugars to these state machines, and \`Pin\` ensures they cannot be moved after being polled. This phase covers the internals (you will implement a trivial \`Future\` by hand) and then moves to the \`tokio\` runtime — the dominant async runtime in the ecosystem.\n\nWith tokio you will learn \`tokio::spawn\` for green threads, \`tokio::sync\` channels (\`mpsc\`, \`oneshot\`, \`broadcast\`) that mirror \`std::sync\`, \`tokio::select!\` for racing futures, and \`tokio::time::{sleep, timeout}\`. The Async Book is the canonical deep-dive; the tokio tutorial provides hands-on exercises. Embassy is briefly mentioned for bare-metal embedded async (\`no_std\`).`,
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
      'A tokio program with two concurrent tasks communicating over an `mpsc` channel: a producer spawns 5 messages with 10ms delays, a consumer receives and prints each; main awaits both. Time the run with `std::time::Instant`.',
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
          '`Future::poll` returns `Poll<Self::Output>`. If the work is complete it returns `Poll::Ready(value)`; otherwise it returns `Poll::Pending` and arranges for the `Waker` inside the `Context` to be invoked when progress can be made.',
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
          'The compiler-generated async state machine can hold references into itself across `await` points. Moving such a struct would invalidate those references. `Pin<P>` guarantees the value will not be moved once it has been pinned.',
      },
      {
        kind: 'code',
        id: 'rust-7-code-1',
        prompt:
          'Write an async function `async fn double(x: u32) -> u32` that returns `x * 2`. Call it in a `#[tokio::main]` main with `x = 21` and print the result.\n\n*Note: The playground proxy supports tokio. Add `tokio = { version = "1", features = ["full"] }` in your local Cargo.toml.*',
        starterCode: `// In the Rust playground, select "Edition: 2021" and add the following
// to Cargo.toml (not shown here) or use the playground's Crates feature:
//   [dependencies]
//   tokio = { version = "1", features = ["full"] }

#[tokio::main]
async fn main() {
    let result = double(21).await;
    println!("{}", result);
}

async fn double(x: u32) -> u32 {
    // your code here
    0
}`,
        expectedOutput: '42',
        hint: 'Return `x * 2` from `double`. The `#[tokio::main]` attribute macro transforms `main` into a tokio runtime entry point.',
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
    intro: `Rust has two macro systems. Declarative macros (\`macro_rules!\`) match against token trees with a pattern-based DSL — they are hygienic, expanded at compile time, and cover the majority of metaprogramming needs (think \`vec![]\`, \`println!\`, \`assert_eq!\`). Procedural macros are Rust code that runs at compile time, receives a token stream, and emits a token stream — enabling \`#[derive(...)]\`, attribute macros, and function-like macros.\n\nBuilding a procedural macro requires a separate crate with \`proc-macro = true\`. The \`syn\` crate parses the input token stream into a Rust AST, and \`quote\` serialises the output back to tokens. This phase walks you through building a \`#[derive(HelloMacro)]\` that prints the struct name at runtime — the canonical introductory procedural macro example from The Book.`,
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
      'A workspace with a `hello_macro` proc-macro crate (derive macro) and a consumer crate that `#[derive(HelloMacro)]` on a `struct Pancakes` and calls `Pancakes::hello_macro()` to print "Hello, Macro! My name is Pancakes!"',
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
          '`macro_rules!` is a pattern-matching system built into the compiler. Procedural macros are compiled Rust programs (in a special `proc-macro` crate) that operate on `TokenStream` — they can parse the full Rust AST via `syn` and generate arbitrary code via `quote`.',
      },
      {
        kind: 'mcq',
        id: 'rust-8-mcq-2',
        prompt:
          'Which `macro_rules!` fragment specifier matches a Rust expression?',
        options: ['`:ty`', '`:ident`', '`:expr`', '`:stmt`'],
        correctIndex: 2,
        explanation:
          '`:expr` matches a Rust expression (e.g. `1 + 2`, `foo()`, `if x { y } else { z }`). `:ident` matches an identifier, `:ty` matches a type, and `:stmt` matches a statement.',
      },
      {
        kind: 'code',
        id: 'rust-8-code-1',
        prompt:
          'Write a `macro_rules! my_vec` that creates a `Vec` from comma-separated values (like the built-in `vec![]`). Use it to create `[10, 20, 30]` and print their sum.',
        starterCode: `macro_rules! my_vec {
    ( $( $x:expr ),* ) => {
        {
            let mut v = Vec::new();
            $( v.push($x); )*
            v
        }
    };
}

fn main() {
    let v: Vec<i32> = my_vec![10, 20, 30];
    let sum: i32 = v.iter().sum();
    println!("{}", sum);
}`,
        expectedOutput: '60',
        hint: 'The starter code contains the complete macro — study the `$( $x:expr ),*` repetition pattern, then verify by running it.',
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
    intro: `\`unsafe\` is a contract: you assert to the compiler that you have verified invariants it cannot check. Inside an \`unsafe\` block you can dereference raw pointers, call \`unsafe\` functions, implement \`unsafe\` traits, and access mutable statics. The Rustonomicon documents every invariant you must uphold — understanding UB (undefined behaviour) is essential.\n\nFFI (Foreign Function Interface) lets Rust call C libraries and vice versa via the \`extern "C"\` ABI. \`bindgen\` auto-generates Rust bindings from C headers; \`cbindgen\` generates C headers from Rust. The \`no_std\` environment strips the standard library (no heap, no OS) and is the foundation of embedded Rust — frameworks like Embassy build async runtimes on top of it. This phase is heavy on reading; the Nomicon and the embedded Rust book are your primary sources.`,
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
      'A Rust program that uses `unsafe` to: (1) create a raw pointer from a reference, dereference it, and print the value; (2) call the C standard library `abs` function via `extern "C"` to compute `abs(-42)` and print it. Document each `unsafe` block with a safety comment.',
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
          '`panic!()` is perfectly safe — it unwinds or aborts the process cleanly. The four unsafe superpowers are: dereference raw pointers, call unsafe functions, access mutable statics, and implement unsafe traits.',
      },
      {
        kind: 'mcq',
        id: 'rust-9-mcq-2',
        prompt:
          'What must every `extern "C"` block\'s function declaration include that a normal Rust `fn` does not?',
        options: [
          'A return type annotation — foreign functions always return `i32`.',
          'The function body.',
          'The `unsafe` keyword on the `fn` — all FFI functions are implicitly unsafe.',
          'A `#[no_mangle]` attribute.',
        ],
        correctIndex: 2,
        explanation:
          'All functions declared in `extern "C"` blocks are automatically `unsafe` because Rust cannot verify the safety guarantees of foreign code. You must call them inside an `unsafe` block. `#[no_mangle]` is required when *exporting* a Rust function to C, not when importing.',
      },
      {
        kind: 'code',
        id: 'rust-9-code-1',
        prompt:
          'Use raw pointers to read and print the value `99i32` through a raw pointer. Create the raw pointer using `as *const i32` and dereference it inside `unsafe`.',
        starterCode: `fn main() {
    let x: i32 = 99;
    let raw = &x as *const i32;
    // dereference raw inside an unsafe block and print the value
    unsafe {
        println!("{}", /* your code here */ 0);
    }
}`,
        expectedOutput: '99',
        hint: 'Dereference a raw pointer with the `*` unary operator: `*raw`.',
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
    intro: `At this level you move from correctness to performance. Rust gives you direct control over allocations, cache layout, and SIMD — but you need profiling data before optimising. \`cargo flamegraph\` (wraps \`perf\` / \`DTrace\`) generates flame graphs; \`criterion\` provides statistically rigorous micro-benchmarks via \`#[bench]\`-style harnesses that run on stable Rust. \`heaptrack\` and DHAT profile allocations.\n\nThe advanced trait topics come from Jon Gjengset's *Rust for Rustaceans*: type-state patterns, sealed traits, extension traits, higher-ranked trait bounds (HRTBs: \`for<'a>\`), associated type defaults, and how to design zero-cost trait hierarchies. You will also revisit the newtype pattern, the coherence rules (orphan rule), and how to work around them idiomatically.`,
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
      'A criterion benchmark comparing three implementations of `sum_to_n(n: u64) -> u64`: (1) a `for` loop, (2) the Gaussian formula `n*(n+1)/2`, (3) an iterator `.fold`. Generate an HTML report with `cargo criterion`. Document findings in a `BENCH.md`.',
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
          'HRTBs (`for<\'a>`) express that the bound must hold for every possible lifetime. This is needed for closures that borrow their argument and return it, because the lifetime is not fixed at the call site — it varies with each invocation.',
      },
      {
        kind: 'code',
        id: 'rust-10-code-1',
        prompt:
          'Implement `fn sum_to_n(n: u64) -> u64` using the Gaussian formula `n * (n + 1) / 2` and print `sum_to_n(100)`.',
        starterCode: `fn sum_to_n(n: u64) -> u64 {
    // your code here
    0
}

fn main() {
    println!("{}", sum_to_n(100));
}`,
        expectedOutput: '5050',
        hint: 'The formula is `n * (n + 1) / 2`. For n=100 this gives 100 * 101 / 2 = 5050.',
      },
      {
        kind: 'mcq',
        id: 'rust-10-mcq-3',
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
          'Rust\'s coherence rules (orphan rule) prevent implementing a foreign trait on a foreign type directly. Wrapping in a newtype (`struct Meters(f64)`) creates a locally-owned type on which you can freely implement any trait. It also provides type safety — `Meters` and `Seconds` have the same representation but cannot be mixed.',
      },
    ],
  },
];
