import { badgesExtra1 } from './badges-extra-1';
import { badgesExtra2 } from './badges-extra-2';
import { badgesExtra3 } from './badges-extra-3';
import { badgesExtra4 } from './badges-extra-4';

export interface BadgeData {
  title: string;
  skills: string[];
}

const OWN_BADGES: Record<string, BadgeData> = {
  // ── Python ────────────────────────────────────────────────────────────────
  'python-0': {
    title: 'Python: Setup & Hello World',
    skills: [
      'Installed the Python interpreter and configured a local development environment',
      'Ran code interactively using the Python REPL',
      'Produced program output with the print() built-in',
    ],
  },
  'python-1': {
    title: 'Python: Foundations',
    skills: [
      'Declared variables and worked with built-in primitive data types',
      'Controlled program flow with if/elif/else branches and for/while loops',
      'Wrote and called functions with positional and keyword arguments',
    ],
  },
  'python-2': {
    title: 'Python: Data Structures & Comprehensions',
    skills: [
      'Stored and transformed data using lists, dicts, sets, and tuples',
      'Wrote list and dict comprehensions for concise data transformation',
      'Iterated over sequences using Python\'s iterator protocol',
    ],
  },
  'python-3': {
    title: 'Python: Modules, OOP & Exceptions',
    skills: [
      'Defined classes with attributes, methods, inheritance, and polymorphism',
      'Imported from the standard library and organized code into modules',
      'Handled exceptions with try/except/finally and read/wrote text files',
    ],
  },
  'python-4': {
    title: 'Python: Type Hints, Dataclasses & Testing',
    skills: [
      'Annotated function signatures and variables with PEP 484 type hints',
      'Defined structured data containers using @dataclass',
      'Wrote automated unit tests and executed them with pytest',
    ],
  },
  'python-5': {
    title: 'Python: Generics, Protocols & Pattern Matching',
    skills: [
      'Wrote generic functions and classes with TypeVar and Generic',
      'Defined structural interfaces with Protocol for duck-typed APIs',
      'Applied structural pattern matching with the match/case statement',
    ],
  },
  'python-6': {
    title: 'Python: Async/Await & Context Managers',
    skills: [
      'Wrote concurrent I/O-bound code with async/await and asyncio.gather',
      'Authored reusable resource managers using @contextmanager',
      'Explained how Python\'s cooperative event loop schedules coroutines',
    ],
  },
  'python-7': {
    title: 'Python: Performance & CPython Internals',
    skills: [
      'Profiled programs with cProfile and identified bottlenecks from flame graphs',
      'Optimized hot paths using vectorization, caching, and data-structure choices',
      'Described the GIL, CPython\'s object model, and reference counting',
    ],
  },
  'python-8': {
    title: 'Python: Production Web with FastAPI',
    skills: [
      'Built type-safe REST APIs with FastAPI, Pydantic, and dependency injection',
      'Modeled and queried relational data with SQLModel and SQLAlchemy 2',
      'Handled API validation, background tasks, and auto-generated OpenAPI docs',
    ],
  },
  'python-9': {
    title: 'Python: Observability & Advanced Testing',
    skills: [
      'Generated edge-case test suites with Hypothesis property-based testing',
      'Instrumented applications with structured logging and distributed tracing',
      'Applied advanced pytest patterns: parametrize, fixtures, and mocking',
    ],
  },
  'python-10': {
    title: 'Python: Extensions & Packaging',
    skills: [
      'Built a compiled extension module with PyO3 (Rust) or Cython',
      'Packaged and published a Python library using pyproject.toml and hatchling',
      'Explained the Python C API and the wheel distribution mechanism',
    ],
  },

  // ── C# ────────────────────────────────────────────────────────────────────
  'csharp-0': {
    title: 'C#: Setup & Hello World',
    skills: [
      'Installed the .NET SDK and configured a C# development environment',
      'Compiled and executed a C# program from the command line',
      'Used Console.WriteLine to produce formatted program output',
    ],
  },
  'csharp-1': {
    title: 'C#: Fundamentals',
    skills: [
      'Declared variables using value types, reference types, and var inference',
      'Controlled program flow with if/switch expressions and loops',
      'Defined and invoked methods with typed parameters and return values',
    ],
  },
  'csharp-2': {
    title: 'C#: Object-Oriented Programming',
    skills: [
      'Designed class hierarchies using inheritance and method overriding',
      'Implemented interfaces and abstract base classes for polymorphism',
      'Encapsulated state with access modifiers, properties, and constructors',
    ],
  },
  'csharp-3': {
    title: 'C#: Collections, LINQ, Generics & Async',
    skills: [
      'Queried and transformed data with LINQ method and query syntax',
      'Used generic collections: List<T>, Dictionary<TKey,TValue>, IEnumerable<T>',
      'Wrote non-blocking I/O code with async, await, and Task<T>',
    ],
  },
  'csharp-4': {
    title: 'C#: Records, Patterns & Minimal APIs',
    skills: [
      'Modeled immutable value objects with record and record struct types',
      'Matched complex shapes using positional, property, and list patterns',
      'Built lightweight HTTP services with ASP.NET Core Minimal APIs',
    ],
  },
  'csharp-5': {
    title: 'C#: Spans, Generics & IAsyncEnumerable',
    skills: [
      'Wrote allocation-free buffer code using Span<T> and Memory<T>',
      'Applied generic constraints and variance rules to flexible type designs',
      'Streamed large result sets lazily with IAsyncEnumerable<T>',
    ],
  },
  'csharp-6': {
    title: 'C#: Performance & Thread-Safe Patterns',
    skills: [
      'Measured and reduced allocations with BenchmarkDotNet and memory profilers',
      'Coordinated async work with CancellationToken, ValueTask, and Channels',
      'Applied lock-free patterns using Interlocked and concurrent collections',
    ],
  },
  'csharp-7': {
    title: 'C#: Entity Framework Core & Dependency Injection',
    skills: [
      'Defined a database schema and applied migrations with EF Core',
      'Resolved typed dependencies via the built-in ASP.NET Core DI container',
      'Implemented repository and unit-of-work patterns for testable data access',
    ],
  },
  'csharp-8': {
    title: 'C#: Middleware, Auth, gRPC & SignalR',
    skills: [
      'Authored custom middleware and action filter pipelines in ASP.NET Core',
      'Secured endpoints with JWT bearer authentication and policy-based authorization',
      'Built real-time bidirectional features with SignalR and contract-first gRPC',
    ],
  },
  'csharp-9': {
    title: 'C#: Roslyn Analyzers, Source Generators & AOT',
    skills: [
      'Wrote a Roslyn diagnostic analyzer and a companion code fix provider',
      'Implemented an incremental source generator using IIncrementalGenerator',
      'Compiled and published a Native AOT application',
    ],
  },
  'csharp-10': {
    title: 'C#: .NET Internals & Unsafe Code',
    skills: [
      'Described the generational garbage collector and JIT compilation pipeline',
      'Used unsafe code, pointer arithmetic, and fixed-pinning safely',
      'Profiled and reduced allocations using dotMemory and ETW traces',
    ],
  },

  // ── TypeScript ────────────────────────────────────────────────────────────
  'typescript-0': {
    title: 'TypeScript: Setup & Hello World',
    skills: [
      'Installed Node.js and initialized a TypeScript project with tsconfig.json',
      'Compiled a .ts file with tsc and executed the output with Node',
      'Wrote a typed program that produces output on the console',
    ],
  },
  'typescript-1': {
    title: 'TypeScript: JS Fundamentals',
    skills: [
      'Used let, const, destructuring, and spread with TypeScript type annotations',
      'Applied template literals, optional chaining, and nullish coalescing',
      'Understood how TypeScript\'s type layer compiles down to JavaScript',
    ],
  },
  'typescript-2': {
    title: 'TypeScript: The Type System',
    skills: [
      'Defined object types, union types, intersections, and type aliases',
      'Narrowed union types with typeof, in, and discriminated union patterns',
      'Extended types with interface inheritance and declaration merging',
    ],
  },
  'typescript-3': {
    title: 'TypeScript: Modules, Async & Error Handling',
    skills: [
      'Organized code with ES module import/export and path aliases',
      'Wrote typed async functions with try/catch and Promise combinators',
      'Modeled typed error states with discriminated result types',
    ],
  },
  'typescript-4': {
    title: 'TypeScript: Generics, Utility Types & Testing',
    skills: [
      'Wrote generic functions, classes, and interfaces with type constraints',
      'Transformed types with Partial, Required, Pick, Omit, and ReturnType',
      'Wrote unit and integration tests with typed mocks and coverage reports',
    ],
  },
  'typescript-5': {
    title: 'TypeScript: Advanced Types',
    skills: [
      'Authored conditional types, infer, and template literal type transformations',
      'Built type-safe APIs using mapped types, key remapping, and variadic tuples',
      'Explained distributive conditional types and recursive type definitions',
    ],
  },
  'typescript-6': {
    title: 'TypeScript: Library Authoring & Declaration Files',
    skills: [
      'Authored .d.ts declaration files for JavaScript packages without types',
      'Published a typed npm package with dual CJS and ESM output via tsup',
      'Configured composite projects, path aliases, and project references',
    ],
  },
  'typescript-7': {
    title: 'TypeScript: Modern React & Next.js',
    skills: [
      'Built type-safe React components with hooks, generics, and event types',
      'Implemented server components, server actions, and App Router file conventions',
      'Integrated typed client state with React Query, Zustand, or tRPC',
    ],
  },
  'typescript-8': {
    title: 'TypeScript: State Machines, Testing & Accessibility',
    skills: [
      'Modeled UI state explicitly with XState finite state machines',
      'Generated edge-case test suites using fast-check property-based testing',
      'Audited and fixed accessibility violations with axe and keyboard navigation',
    ],
  },
  'typescript-9': {
    title: 'TypeScript: Build Tooling Internals',
    skills: [
      'Configured Vite or webpack with plugins, code splitting, and tree shaking',
      'Wrote a custom Rollup or esbuild plugin for build pipeline transformations',
      'Analyzed and optimized bundle size using sourcemap explorer tools',
    ],
  },

  // ── Rust ──────────────────────────────────────────────────────────────────
  'rust-0': {
    title: 'Rust: Setup & Hello World',
    skills: [
      'Installed Rust using rustup and created a new Cargo project',
      'Compiled and executed a Rust program',
      'Used the println! macro to produce formatted console output',
    ],
  },
  'rust-1': {
    title: 'Rust: Hello Cargo',
    skills: [
      'Managed project dependencies and build profiles with Cargo.toml',
      'Organized Rust code into modules with pub visibility rules',
      'Wrote and executed unit tests using the #[test] attribute',
    ],
  },
  'rust-2': {
    title: 'Rust: Ownership, Borrowing & Slices',
    skills: [
      'Applied Rust\'s ownership rules to ensure memory safety without a GC',
      'Borrowed values with immutable (&T) and mutable (&mut T) references',
      'Used string slices (&str) and array slices (&[T]) as view types',
    ],
  },
  'rust-3': {
    title: 'Rust: Structs, Enums & Error Handling',
    skills: [
      'Defined struct types with impl blocks, methods, and associated functions',
      'Modeled sum types with enum variants and matched them exhaustively',
      'Propagated errors idiomatically using Result<T, E> and the ? operator',
    ],
  },
  'rust-4': {
    title: 'Rust: Generics, Traits, Closures & Iterators',
    skills: [
      'Wrote generic structs, enums, and functions with trait bounds',
      'Implemented standard traits: Display, From, Into, and Iterator',
      'Composed iterator adaptors for zero-allocation, lazy data pipelines',
    ],
  },
  'rust-5': {
    title: 'Rust: Concurrency — Threads, Channels & Shared State',
    skills: [
      'Spawned OS threads and communicated safely with mpsc channels',
      'Shared mutable state across threads using Arc<Mutex<T>>',
      'Explained how the borrow checker statically prevents data races',
    ],
  },
  'rust-6': {
    title: 'Rust: Smart Pointers & Interior Mutability',
    skills: [
      'Selected the right pointer type: Box<T>, Rc<T>, Arc<T>, and Weak<T>',
      'Applied RefCell<T> and Cell<T> for interior mutability patterns',
      'Implemented Deref and Drop for custom smart pointer types',
    ],
  },
  'rust-7': {
    title: 'Rust: Async — Futures, tokio & Cancellation',
    skills: [
      'Wrote async functions and composed futures in a tokio async runtime',
      'Launched concurrent async tasks with tokio::spawn and JoinSet',
      'Cancelled async work cooperatively using CancellationToken',
    ],
  },
  'rust-8': {
    title: 'Rust: Macros — Declarative & Procedural',
    skills: [
      'Authored macro_rules! macros for compile-time code generation',
      'Implemented a #[derive] procedural macro using syn and quote',
      'Explained Rust\'s macro hygiene model and expansion phases',
    ],
  },
  'rust-9': {
    title: 'Rust: Unsafe, FFI & Embedded',
    skills: [
      'Called C functions from Rust across the FFI boundary with extern blocks',
      'Used unsafe blocks to manipulate raw pointers with correct invariants',
      'Compiled and ran code in a no_std embedded or WASM environment',
    ],
  },
  'rust-10': {
    title: 'Rust: Performance, Benchmarking & Advanced Traits',
    skills: [
      'Benchmarked code with Criterion and interpreted profiling results',
      'Designed trait hierarchies using associated types and GATs',
      'Applied SIMD intrinsics or profile-guided optimization to hot paths',
    ],
  },

  // ── F# ────────────────────────────────────────────────────────────────────
  'fsharp-0': {
    title: 'F#: Setup & Hello World',
    skills: [
      'Installed the .NET SDK and created an F# project',
      'Used printfn to produce formatted output',
      'Ran code interactively in the F# interactive REPL (dotnet fsi)',
    ],
  },
  'fsharp-1': {
    title: 'F#: Fundamentals — let, Inference & Pipelines',
    skills: [
      'Defined immutable bindings with let and relied on type inference',
      'Composed functions fluently using the |> forward pipe operator',
      'Understood F#\'s expression-oriented evaluation and purity defaults',
    ],
  },
  'fsharp-2': {
    title: 'F#: Records, Discriminated Unions & Pattern Matching',
    skills: [
      'Defined record types with structural equality and copy-update syntax',
      'Modeled domain concepts as discriminated union cases',
      'Wrote exhaustive, nested match expressions over union shapes',
    ],
  },
  'fsharp-3': {
    title: 'F#: Modules, Classes & I/O',
    skills: [
      'Organized F# code with module and namespace declarations',
      'Wrote classes and interfaces for idiomatic .NET interoperability',
      'Performed file and console I/O using F# standard library functions',
    ],
  },
  'fsharp-4': {
    title: 'F#: Generics, HOFs, Currying & Computation Expressions',
    skills: [
      'Wrote generic functions and types with explicit type parameters',
      'Applied higher-order functions — map, filter, fold — to collections',
      'Used built-in computation expressions: seq, async, and option',
    ],
  },
  'fsharp-5': {
    title: 'F#: Type Providers — JSON, CSV & SQL',
    skills: [
      'Consumed JSON and CSV sources with compile-time-typed type providers',
      'Queried a relational database using the SQL type provider',
      'Explained how type providers generate types at compile time',
    ],
  },
  'fsharp-6': {
    title: 'F#: Authoring Computation Expressions',
    skills: [
      'Implemented Bind and Return to define a custom monad',
      'Built a result CE for railway-oriented error handling',
      'Applied the builder pattern to abstract arbitrary control flow',
    ],
  },
  'fsharp-7': {
    title: 'F#: Web with Giraffe & Saturn',
    skills: [
      'Built a type-safe HTTP API with Giraffe or Saturn on ASP.NET Core',
      'Handled routing, JSON serialization, and middleware in idiomatic F#',
      'Applied the functional pipeline model to compose HTTP handlers',
    ],
  },
  'fsharp-8': {
    title: 'F#: Parser Combinators with FParsec',
    skills: [
      'Wrote a grammar using FParsec combinator primitives',
      'Parsed structured text into typed AST nodes',
      'Handled backtracking and produced meaningful parse-error messages',
    ],
  },
  'fsharp-9': {
    title: 'F#: Concurrency — MailboxProcessor & Channels',
    skills: [
      'Built actor-model concurrency with MailboxProcessor',
      'Used System.Threading.Channels for producer/consumer pipelines',
      'Reasoned about thread safety in concurrent F# programs',
    ],
  },
  'fsharp-10': {
    title: 'F#: Domain Modeling, DDD & Fable Full-Stack',
    skills: [
      'Encoded domain invariants directly in the F# type system',
      'Applied Domain-Driven Design tactical patterns in F#',
      'Shared business logic between server and browser with the Fable compiler',
    ],
  },

  // ── Go ────────────────────────────────────────────────────────────────────
  'go-0': {
    title: 'Go: Setup & Hello World',
    skills: [
      'Installed Go, created a module with go mod init, and wrote a Hello World',
      'Compiled and executed a Go program from the command line',
      'Used fmt.Println to produce formatted program output',
    ],
  },
  'go-1': {
    title: 'Go: Packages, Zero Values & Error Returns',
    skills: [
      'Organized Go code into packages and used the import mechanism',
      'Relied on zero values to avoid explicitly initializing variables',
      'Returned and handled errors as (T, error) value pairs',
    ],
  },
  'go-2': {
    title: 'Go: Structs, Methods, Interfaces, Slices & Maps',
    skills: [
      'Defined struct types and attached methods with value or pointer receivers',
      'Implemented interfaces implicitly for duck-typed polymorphism',
      'Operated on slices and maps using idiomatic Go patterns',
    ],
  },
  'go-3': {
    title: 'Go: Concurrency — Goroutines, Channels & Context',
    skills: [
      'Launched lightweight goroutines for concurrent work',
      'Communicated between goroutines using typed channels and select',
      'Cancelled and timed out concurrent work with context.Context',
    ],
  },
  'go-4': {
    title: 'Go: Standard Library — HTTP, JSON & Testing',
    skills: [
      'Handled HTTP requests and built a simple server with net/http',
      'Encoded and decoded JSON using encoding/json and struct tags',
      'Wrote table-driven tests using the testing package',
    ],
  },
  'go-5': {
    title: 'Go: Advanced Concurrency & Memory Model',
    skills: [
      'Coordinated shared state with sync.Mutex, RWMutex, and sync.Once',
      'Applied atomic operations from sync/atomic for lock-free patterns',
      'Managed groups of goroutines and propagated errors with errgroup',
    ],
  },
  'go-6': {
    title: 'Go: Generics — Type Parameters & Constraints',
    skills: [
      'Wrote generic functions and data structures with type parameter syntax',
      'Authored constraints using interface composition and comparable',
      'Leveraged type inference to minimize generic invocation boilerplate',
    ],
  },
  'go-7': {
    title: 'Go: Reflection, go generate & AST Manipulation',
    skills: [
      'Inspected and modified values at runtime using the reflect package',
      'Drove code generation workflows with go:generate directives',
      'Parsed and transformed Go source code using the go/ast package',
    ],
  },
  'go-8': {
    title: 'Go: Cgo — Calling C from Go',
    skills: [
      'Called C functions from Go using import "C" and Cgo preamble comments',
      'Passed data between Go and C while respecting memory ownership rules',
      'Explained Cgo\'s call overhead and when pure Go alternatives are preferred',
    ],
  },
  'go-9': {
    title: 'Go: Performance — pprof, Benchmarks & Fuzzing',
    skills: [
      'Profiled CPU and memory allocation with pprof and the trace tool',
      'Wrote table-driven benchmarks with testing.B and interpreted results',
      'Used go test -fuzz to discover edge-case bugs automatically',
    ],
  },
  'go-10': {
    title: 'Go: Production Patterns — slog, Error Wrapping & OTel',
    skills: [
      'Structured application logging with the slog package',
      'Wrapped errors with context using fmt.Errorf and %w for stack inspection',
      'Implemented graceful HTTP server shutdown with os/signal handling',
    ],
  },
};

/**
 * All phase badges: the original languages above, merged with the newer
 * language courses (kept in separate files to keep this module manageable).
 */
export const PHASE_BADGES: Record<string, BadgeData> = {
  ...OWN_BADGES,
  ...badgesExtra1,
  ...badgesExtra2,
  ...badgesExtra3,
  ...badgesExtra4,
};
