import { Phase } from './types';

export const csharpPhases: Phase[] = [
  {
    id: 'csharp-1',
    language: 'csharp',
    level: 1,
    title: 'C# Fundamentals',
    timeEstimate: '6-8 hours',
    intro: `C# is a strongly-typed, multi-paradigm language that runs on .NET. In this phase you will write your first programs using top-level statements (introduced in C# 9), explore the built-in value and reference types, control flow constructs, and methods. You will also learn how namespaces and the \`using\` directive organise code, and how to interact with the console for basic I/O.\n\nBy the end of this phase you should be comfortable writing small self-contained programs, understanding the difference between value types (\`int\`, \`bool\`, \`struct\`) and reference types (\`string\`, \`class\`), and calling static methods from the .NET base class library.`,
    topics: [
      {
        label: 'Tour of C#',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/',
        note: 'Official overview of language features',
      },
      {
        label: 'Types and type system',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/',
        note: 'Value types, reference types, built-in types',
      },
      {
        label: 'Control flow — if, switch, loops',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/selection-statements',
      },
      {
        label: 'Methods and parameters',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/methods',
      },
      {
        label: 'Top-level statements (C# 9)',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements',
      },
      {
        label: 'String interpolation and formatting',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/tokens/interpolated',
      },
    ],
    deliverable:
      'Write a top-level-statement program that reads a name and birth year from the console, calculates the user\'s age, and prints a greeting with string interpolation. Include at least one helper method that returns a value.',
    checks: [
      {
        kind: 'mcq',
        id: 'csharp-1-mcq-1',
        prompt: 'Which keyword declares a variable whose type is inferred by the compiler but is still statically typed?',
        options: ['dynamic', 'var', 'object', 'let'],
        correctIndex: 1,
        explanation: '`var` triggers type inference at compile time — the type is fixed after inference, unlike `dynamic` which defers resolution to runtime.',
      },
      {
        kind: 'mcq',
        id: 'csharp-1-mcq-2',
        prompt: 'What is the default value of an unassigned `int` field in a class?',
        options: ['null', 'undefined', '0', '-1'],
        correctIndex: 2,
        explanation: 'Value-type fields are zero-initialised by the runtime. `int` has a default of `0`.',
      },
      {
        kind: 'code',
        id: 'csharp-1-code-1',
        prompt: 'Write a C# program (top-level statements) that prints the numbers 1 through 5, each on its own line, using a `for` loop.',
        starterCode: `for (int i = 1; i <= 5; i++)
{
    Console.WriteLine(i);
}`,
        expectedOutput: `1\n2\n3\n4\n5`,
        hint: 'Use `Console.WriteLine` inside a `for` loop. The loop variable starts at 1 and increments until it exceeds 5.',
      },
      {
        kind: 'code',
        id: 'csharp-1-code-2',
        prompt: 'Define a static method `Greet(string name)` that returns the string `"Hello, {name}!"` using string interpolation, then print the result for the name "World".',
        starterCode: `static string Greet(string name) => $"Hello, {name}!";
Console.WriteLine(Greet("World"));`,
        expectedOutput: 'Hello, World!',
        hint: 'Use the `$"..."` interpolation syntax and an expression-bodied method (`=>`).',
      },
    ],
  },
  {
    id: 'csharp-2',
    language: 'csharp',
    level: 2,
    title: 'Object-Oriented Programming',
    timeEstimate: '8-10 hours',
    intro: `C# was designed as an object-oriented language and its OOP support is comprehensive. In this phase you will learn to define classes and structs, use constructors, properties, and indexers, apply access modifiers, implement interfaces, and build inheritance hierarchies. You will also encounter polymorphism in practice through virtual/override methods and interface dispatch.\n\nPay special attention to the difference between classes (heap-allocated reference semantics) and structs (stack-friendly value semantics). Modern C# also introduces \`record\` types, which you will preview here and deepen in Phase 4.`,
    topics: [
      {
        label: 'Classes and objects',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/classes',
      },
      {
        label: 'Structs',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/struct',
      },
      {
        label: 'Interfaces',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/interfaces',
      },
      {
        label: 'Inheritance',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/object-oriented/inheritance',
      },
      {
        label: 'Properties',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/properties',
      },
      {
        label: 'Polymorphism',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/object-oriented/polymorphism',
      },
    ],
    deliverable:
      'Model a simple bank account system: an abstract `Account` base class with `Deposit`/`Withdraw` virtual methods, a `SavingsAccount` subclass that overrides `Withdraw` to enforce a minimum balance, and an `ITransactionLog` interface implemented by both. Demonstrate polymorphic dispatch via a `List<Account>`.',
    checks: [
      {
        kind: 'mcq',
        id: 'csharp-2-mcq-1',
        prompt: 'Which access modifier makes a member visible to all types in the same assembly but not to external assemblies?',
        options: ['private', 'protected', 'internal', 'public'],
        correctIndex: 2,
        explanation: '`internal` restricts visibility to the declaring assembly. `protected` is for subclass access, `private` for the type itself, and `public` for everyone.',
      },
      {
        kind: 'mcq',
        id: 'csharp-2-mcq-2',
        prompt: 'What keyword must a base-class method be marked with to allow derived classes to override it?',
        options: ['abstract', 'virtual', 'override', 'new'],
        correctIndex: 1,
        explanation: '`virtual` signals that a method participates in polymorphic dispatch and may be overridden. `abstract` also allows overriding but additionally requires it (and cannot have a body).',
      },
      {
        kind: 'code',
        id: 'csharp-2-code-1',
        prompt: 'Define an interface `IShape` with a `double Area()` method, then implement it in a `Circle` class that accepts a radius in its constructor. Print the area of a circle with radius 5 (use `Math.PI`).',
        starterCode: `using System;

interface IShape { double Area(); }

class Circle : IShape
{
    private readonly double _radius;
    public Circle(double radius) => _radius = radius;
    public double Area() => Math.PI * _radius * _radius;
}

Console.WriteLine(new Circle(5).Area().ToString("F2"));`,
        expectedOutput: '78.54',
        hint: 'Use `Math.PI` and format with `"F2"` for two decimal places.',
      },
    ],
  },
  {
    id: 'csharp-3',
    language: 'csharp',
    level: 3,
    title: 'Collections, LINQ, Generics & Async',
    timeEstimate: '10-12 hours',
    intro: `This phase covers the pillars of practical day-to-day C# development. You will work with the generic collections in \`System.Collections.Generic\` (\`List<T>\`, \`Dictionary<TKey,TValue>\`, \`HashSet<T>\`), write LINQ queries in both method-chain and query-expression syntax, and create your own generic classes and methods. Exception handling with \`try/catch/finally\` and custom exception types is also covered here.\n\nThe phase closes with an introduction to the \`async\`/\`await\` model and \`Task<T>\` — C#'s high-level abstraction over asynchronous I/O — so that subsequent phases can build on it naturally.`,
    topics: [
      {
        label: 'Generic collections overview',
        url: 'https://learn.microsoft.com/en-us/dotnet/standard/collections/commonly-used-collection-types',
      },
      {
        label: 'LINQ (Language Integrated Query)',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/linq/',
      },
      {
        label: 'Generics',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/generics',
      },
      {
        label: 'Exception handling',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/exceptions/',
      },
      {
        label: 'File I/O with System.IO',
        url: 'https://learn.microsoft.com/en-us/dotnet/standard/io/',
      },
      {
        label: 'Asynchronous programming — async/await',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/',
      },
    ],
    deliverable:
      'Build a word-frequency analyser: read a text file asynchronously, split into words, use LINQ to produce a `Dictionary<string, int>` of frequencies, then print the top 10 words sorted by count descending. Wrap file-not-found in a custom `FileProcessingException`.',
    checks: [
      {
        kind: 'mcq',
        id: 'csharp-3-mcq-1',
        prompt: 'Which LINQ method returns the first element satisfying a predicate, throwing if none is found?',
        options: ['FirstOrDefault', 'SingleOrDefault', 'First', 'Find'],
        correctIndex: 2,
        explanation: '`First(predicate)` throws `InvalidOperationException` when no match exists. `FirstOrDefault` returns `null`/default instead.',
      },
      {
        kind: 'mcq',
        id: 'csharp-3-mcq-2',
        prompt: 'What does the `await` keyword do when used on a `Task`?',
        options: [
          'Blocks the calling thread until the Task completes',
          'Suspends the async method and releases the thread until the Task completes',
          'Runs the Task on a background thread synchronously',
          'Converts a Task to a synchronous result',
        ],
        correctIndex: 1,
        explanation: '`await` suspends the enclosing async method without blocking the underlying thread. The runtime resumes execution after the awaited task finishes.',
      },
      {
        kind: 'code',
        id: 'csharp-3-code-1',
        prompt: 'Use LINQ to filter a list of integers, keeping only even numbers, double each, then print them space-separated on one line.',
        starterCode: `using System;
using System.Linq;

int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8 };
var result = numbers.Where(n => n % 2 == 0).Select(n => n * 2);
Console.WriteLine(string.Join(" ", result));`,
        expectedOutput: '4 8 12 16',
        hint: 'Chain `.Where()` and `.Select()` before passing to `string.Join`.',
      },
    ],
  },
  {
    id: 'csharp-4',
    language: 'csharp',
    level: 4,
    title: 'Modern C# — Records, Patterns & Minimal APIs',
    timeEstimate: '10-12 hours',
    intro: `C# 8 through 12 introduced a wave of syntax improvements that make code more expressive and safer. In this phase you will master nullable reference types (NRTs) and the null-forgiving operator, positional \`record\` types with value equality and non-destructive mutation via \`with\`, \`init\`-only properties, file-scoped namespaces, and the rich pattern-matching expressions (\`switch\` expression, positional patterns, list patterns).\n\nYou will also write your first unit tests with xUnit and build a minimal ASP.NET Core API — a few lines that expose a JSON endpoint — to see how the platform integrates with modern C# idioms.`,
    topics: [
      {
        label: 'Nullable reference types',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/nullable-references',
      },
      {
        label: 'Records',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/record',
      },
      {
        label: 'Pattern matching',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/functional/pattern-matching',
      },
      {
        label: 'Init-only properties',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/init',
      },
      {
        label: 'Unit testing with xUnit',
        url: 'https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test',
      },
      {
        label: 'ASP.NET Core Minimal APIs',
        url: 'https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis',
      },
    ],
    deliverable:
      'Create a minimal ASP.NET Core API with two endpoints: `GET /todos` (returns a list of `record Todo(int Id, string Title, bool Done)`) and `POST /todos` (adds one). Write xUnit tests for a pure helper that validates a Todo title (no empty strings, max 120 chars).',
    checks: [
      {
        kind: 'mcq',
        id: 'csharp-4-mcq-1',
        prompt: 'What does the `init` accessor allow that a regular `set` accessor does not?',
        options: [
          'Setting the property at any time',
          'Setting the property only during object initialization (constructor or object initializer)',
          'Setting the property only from derived classes',
          'Making the property readonly at compile time',
        ],
        correctIndex: 1,
        explanation: '`init` restricts mutation to the object-initializer phase, enabling immutable-by-default objects while still supporting concise initializer syntax.',
      },
      {
        kind: 'mcq',
        id: 'csharp-4-mcq-2',
        prompt: 'Given `record Point(int X, int Y);`, which expression creates a new record that is identical to `p` except `X` is 10?',
        options: ['p.X = 10', 'p with { X = 10 }', 'new Point(10, p.Y)', 'p.Clone(X: 10)'],
        correctIndex: 1,
        explanation: '`with` expressions perform non-destructive mutation on records — a new instance is created with the specified properties replaced.',
      },
      {
        kind: 'code',
        id: 'csharp-4-code-1',
        prompt: 'Declare a positional record `record Shape(string Kind, double Size)`, then use a `switch` expression to return "big" if Size > 100, otherwise "small". Print the result for `new Shape("circle", 150)`.',
        starterCode: `record Shape(string Kind, double Size);

Shape s = new Shape("circle", 150);
string label = s switch
{
    { Size: > 100 } => "big",
    _ => "small"
};
Console.WriteLine(label);`,
        expectedOutput: 'big',
        hint: 'Property patterns inside a `switch` expression use `{ PropertyName: pattern }` syntax.',
      },
    ],
  },
  {
    id: 'csharp-5',
    language: 'csharp',
    level: 5,
    title: 'Advanced .NET — Spans, Generics & IAsyncEnumerable',
    timeEstimate: '14-16 hours',
    intro: `This phase moves into APIs that unlock low-allocation, high-throughput code. \`Span<T>\` and \`ReadOnlySpan<T>\` let you slice arrays and stack memory without heap allocations. \`ArrayPool<T>\` is the standard way to rent and return reusable buffers. You will also explore \`IAsyncEnumerable<T>\` for streaming async sequences and get an introduction to Roslyn source generators — compile-time code generation that eliminates reflection overhead.\n\nThese tools are widely used in frameworks like ASP.NET Core and System.Text.Json. Understanding them helps you write code that performs well even under load.`,
    topics: [
      {
        label: 'Span<T> and Memory<T>',
        url: 'https://learn.microsoft.com/en-us/dotnet/standard/memory-and-spans/memory-t-usage-guidelines',
      },
      {
        label: 'ArrayPool<T>',
        url: 'https://learn.microsoft.com/en-us/dotnet/api/system.buffers.arraypool-1',
      },
      {
        label: 'IAsyncEnumerable<T> and async streams',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/generate-consume-asynchronous-stream',
      },
      {
        label: 'Generic constraints',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/generics/constraints-on-type-parameters',
      },
      {
        label: 'Introduction to source generators',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/source-generators-overview',
      },
    ],
    deliverable:
      'Write a CSV parser that uses `ReadOnlySpan<char>` to parse lines without allocating substrings. Expose an `IAsyncEnumerable<string[]>` that reads lines asynchronously from a `StreamReader`. Benchmark allocations with dotnet-counters or a simple stopwatch comparison vs a naive `string.Split` version.',
    checks: [
      {
        kind: 'mcq',
        id: 'csharp-5-mcq-1',
        prompt: 'Why can `Span<T>` not be stored as a field in a regular class?',
        options: [
          'It is a value type and value types cannot be fields',
          'It is a ref struct and ref structs may only live on the stack',
          'It requires unsafe context',
          'It does not implement IDisposable',
        ],
        correctIndex: 1,
        explanation: '`Span<T>` is a `ref struct`. The compiler forbids ref structs from appearing on the heap (e.g., as class fields, boxed, or captured by lambdas) to guarantee their stack lifetime.',
      },
      {
        kind: 'mcq',
        id: 'csharp-5-mcq-2',
        prompt: 'Which generic constraint ensures a type parameter has a public parameterless constructor?',
        options: ['where T : struct', 'where T : new()', 'where T : class', 'where T : default'],
        correctIndex: 1,
        explanation: '`new()` constrains T to types that have a public parameterless constructor, allowing `new T()` inside the generic body.',
      },
      {
        kind: 'code',
        id: 'csharp-5-code-1',
        prompt: 'Use `ReadOnlySpan<char>` to count the number of comma characters in a string without allocating any substrings.',
        starterCode: `using System;

string csv = "alpha,beta,gamma,delta";
ReadOnlySpan<char> span = csv.AsSpan();
int count = 0;
foreach (char c in span)
    if (c == ',') count++;
Console.WriteLine(count);`,
        expectedOutput: '3',
        hint: '`string.AsSpan()` returns a `ReadOnlySpan<char>` that can be iterated without heap allocation.',
      },
    ],
  },
  {
    id: 'csharp-6',
    language: 'csharp',
    level: 6,
    title: 'Performance, Advanced Async & Thread-Safe Patterns',
    timeEstimate: '16-18 hours',
    intro: `Writing fast C# means understanding where time goes. BenchmarkDotNet provides the gold standard for micro-benchmarks with statistical rigour and hardware-counter support. Profiling tools (dotnet-trace, dotnet-counters, Visual Studio Profiler) show you the real bottlenecks in running applications.\n\nOn the async side, \`ValueTask<T>\` avoids the \`Task\` allocation when the hot path completes synchronously — critical in tight server loops. \`System.Threading.Channels.Channel<T>\` is the idiomatic producer-consumer pipeline primitive. You will also implement common thread-safe patterns: double-checked locking, \`Interlocked\` operations, \`ConcurrentDictionary\`, and the \`lock\` statement vs \`SemaphoreSlim\` for async contexts.`,
    topics: [
      {
        label: 'BenchmarkDotNet — getting started',
        url: 'https://benchmarkdotnet.org/articles/guides/getting-started.html',
      },
      {
        label: 'ValueTask best practices',
        url: 'https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.valuetask-1',
      },
      {
        label: 'System.Threading.Channels',
        url: 'https://learn.microsoft.com/en-us/dotnet/core/extensions/channels',
      },
      {
        label: 'Thread-safe collections',
        url: 'https://learn.microsoft.com/en-us/dotnet/standard/collections/thread-safe/',
      },
      {
        label: 'Diagnosing .NET apps with dotnet-trace',
        url: 'https://learn.microsoft.com/en-us/dotnet/core/diagnostics/dotnet-trace',
      },
    ],
    deliverable:
      'Implement a bounded producer-consumer pipeline using `Channel<T>`. One producer generates 1000 integers; two consumer tasks read from the channel and accumulate results into a `ConcurrentBag<int>`. Verify the total with an assertion. Add a BenchmarkDotNet benchmark comparing `Channel<T>` throughput vs `ConcurrentQueue<T>` with manual `SpinWait`.',
    checks: [
      {
        kind: 'mcq',
        id: 'csharp-6-mcq-1',
        prompt: 'When should you prefer `ValueTask<T>` over `Task<T>` as a return type?',
        options: [
          'Always — ValueTask is strictly faster',
          'When the method frequently completes synchronously and avoiding a Task allocation matters',
          'When the result may be null',
          'When the method has multiple await points',
        ],
        correctIndex: 1,
        explanation: '`ValueTask<T>` avoids a heap allocation on the synchronous fast path. However, if the task is frequently awaited more than once or stored, `Task<T>` is safer and simpler.',
      },
      {
        kind: 'mcq',
        id: 'csharp-6-mcq-2',
        prompt: 'Why is `lock` unsuitable for protecting an `await` expression inside the guarded block?',
        options: [
          'The compiler forbids await inside a lock statement',
          'The thread that releases the lock after resumption may differ from the thread that acquired it, violating the lock contract',
          'Lock only works with value types',
          'await cannot be used with synchronisation primitives',
        ],
        correctIndex: 1,
        explanation: 'After resuming from `await`, the continuation may run on a different thread. The `lock` statement ties acquisition and release to a single thread — a mismatch that can deadlock. Use `SemaphoreSlim.WaitAsync` instead.',
      },
      {
        kind: 'code',
        id: 'csharp-6-code-1',
        prompt: 'Use `Interlocked.Increment` to safely count iterations across simulated concurrent increments, then print the result.',
        starterCode: `using System;
using System.Threading;
using System.Threading.Tasks;

int counter = 0;
Task[] tasks = new Task[10];
for (int i = 0; i < 10; i++)
    tasks[i] = Task.Run(() =>
    {
        for (int j = 0; j < 100; j++)
            Interlocked.Increment(ref counter);
    });
Task.WaitAll(tasks);
Console.WriteLine(counter);`,
        expectedOutput: '1000',
        hint: '`Interlocked.Increment` performs atomic increment — no race condition regardless of thread interleaving.',
      },
    ],
  },
  {
    id: 'csharp-7',
    language: 'csharp',
    level: 7,
    title: 'Entity Framework Core & Dependency Injection',
    timeEstimate: '18-20 hours',
    intro: `Entity Framework Core is the standard ORM for .NET. Beyond basic CRUD you will explore compiled queries (eliminating per-call expression-tree compilation), interceptors (auditing, soft-delete), the change tracker (tracking vs no-tracking queries, \`AsNoTracking()\`), and convention configuration via \`IEntityTypeConfiguration<T>\`. You will also learn how to write and run migrations in CI/CD pipelines.\n\nDependency injection is first-class in .NET. This phase covers the built-in \`Microsoft.Extensions.DependencyInjection\` container — registering services (\`AddScoped\`, \`AddTransient\`, \`AddSingleton\`), constructor injection, the options pattern (\`IOptions<T>\`), and how to test services by substituting fakes.`,
    topics: [
      {
        label: 'EF Core getting started',
        url: 'https://learn.microsoft.com/en-us/ef/core/get-started/overview/first-app',
      },
      {
        label: 'EF Core interceptors',
        url: 'https://learn.microsoft.com/en-us/ef/core/logging-events-diagnostics/interceptors',
      },
      {
        label: 'Compiled queries',
        url: 'https://learn.microsoft.com/en-us/ef/core/performance/advanced-performance-topics#compiled-queries',
      },
      {
        label: 'Change tracking',
        url: 'https://learn.microsoft.com/en-us/ef/core/change-tracking/',
      },
      {
        label: 'Dependency injection in .NET',
        url: 'https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection',
      },
      {
        label: 'Options pattern',
        url: 'https://learn.microsoft.com/en-us/dotnet/core/extensions/options',
      },
    ],
    deliverable:
      'Build a SQLite-backed blog API using EF Core. Implement a `SoftDeleteInterceptor` that sets a `DeletedAt` timestamp instead of removing rows. Register `BlogService` via DI with `AddScoped`. Write a compiled query for fetching posts by author. Cover the service layer with xUnit tests using an in-memory SQLite context.',
    checks: [
      {
        kind: 'mcq',
        id: 'csharp-7-mcq-1',
        prompt: 'What is the primary benefit of `AsNoTracking()` in an EF Core query?',
        options: [
          'Entities are cached for subsequent queries',
          'The DbContext does not build a change-tracking snapshot, reducing memory and CPU overhead for read-only scenarios',
          'Entities are automatically refreshed on every access',
          'It enables query splitting for collections',
        ],
        correctIndex: 1,
        explanation: 'For read-only workloads, skipping change tracking avoids allocating identity-map entries and snapshot copies, improving throughput and reducing GC pressure.',
      },
      {
        kind: 'mcq',
        id: 'csharp-7-mcq-2',
        prompt: 'Which DI lifetime should a `DbContext` typically be registered with in an ASP.NET Core application?',
        options: ['Singleton', 'Transient', 'Scoped', 'Pooled'],
        correctIndex: 2,
        explanation: '`DbContext` holds state (change tracker, open transaction) that must not be shared across requests. `Scoped` creates one instance per HTTP request — the correct lifetime. `AddDbContextPool` offers pooling at the infrastructure level while preserving the scoped contract.',
      },
      {
        kind: 'code',
        id: 'csharp-7-code-1',
        prompt: 'Show a minimal compiled query that fetches a `User` by email from a `DbContext`. Paste the method signature and `EF.CompileQuery` call (no database required — just the pattern).',
        starterCode: `using System.Linq;
using Microsoft.EntityFrameworkCore;

// Imagine: class AppDb : DbContext { public DbSet<User> Users => Set<User>(); }
// record User(int Id, string Email);

// Compiled query — evaluated once, reused many times
static readonly Func<AppDb, string, User?> GetByEmail =
    EF.CompileQuery((AppDb db, string email) =>
        db.Users.SingleOrDefault(u => u.Email == email));

// Usage:
// User? user = GetByEmail(db, "alice@example.com");
Console.WriteLine("Compiled query defined.");`,
        expectedOutput: 'Compiled query defined.',
        hint: '`EF.CompileQuery` accepts a lambda that will be compiled once to a SQL command. Call the returned delegate like a regular function.',
      },
    ],
  },
  {
    id: 'csharp-8',
    language: 'csharp',
    level: 8,
    title: 'Advanced ASP.NET Core — Middleware, Auth, gRPC & SignalR',
    timeEstimate: '20-22 hours',
    intro: `ASP.NET Core's middleware pipeline is a chain of delegates where each component can inspect, short-circuit, or enrich the request/response. This phase walks through building custom middleware, writing \`IAuthorizationHandler\` implementations for policy-based auth, and leveraging \`ApiController\` conventions (automatic model validation, ProblemDetails responses) alongside minimal APIs.\n\nYou will also implement real-time features with SignalR and explore gRPC streaming (server-streaming and bidirectional). Understanding these primitives lets you build production-grade services rather than just toy demos.`,
    topics: [
      {
        label: 'ASP.NET Core middleware',
        url: 'https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/',
      },
      {
        label: 'Policy-based authorisation',
        url: 'https://learn.microsoft.com/en-us/aspnet/core/security/authorization/policies',
      },
      {
        label: 'ApiController attribute and conventions',
        url: 'https://learn.microsoft.com/en-us/aspnet/core/web-api/#apicontroller-attribute',
      },
      {
        label: 'gRPC for .NET',
        url: 'https://learn.microsoft.com/en-us/aspnet/core/grpc/',
      },
      {
        label: 'SignalR introduction',
        url: 'https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction',
      },
      {
        label: 'Problem Details (RFC 9457)',
        url: 'https://learn.microsoft.com/en-us/aspnet/core/fundamentals/error-handling#problem-details',
      },
    ],
    deliverable:
      'Build a real-time notification service: an ASP.NET Core app with a custom request-timing middleware (logs elapsed ms to ILogger), a `[RequireRole("admin")]` policy protecting a management endpoint, a SignalR hub that broadcasts notifications to all connected clients, and a gRPC service with server-streaming for live event feeds.',
    checks: [
      {
        kind: 'mcq',
        id: 'csharp-8-mcq-1',
        prompt: 'In the ASP.NET Core middleware pipeline, what does calling `await next(context)` do?',
        options: [
          'Terminates the pipeline and returns a 200 response',
          'Passes control to the next middleware component in the chain',
          'Sends the response to the client immediately',
          'Starts a new background thread for the next component',
        ],
        correctIndex: 1,
        explanation: '`next(context)` invokes the next delegate in the middleware chain. Middleware can run code before and after this call, enabling both inbound and outbound processing.',
      },
      {
        kind: 'mcq',
        id: 'csharp-8-mcq-2',
        prompt: 'What is the primary advantage of using `[ApiController]` on a controller class?',
        options: [
          'Enables MVC view rendering',
          'Automatically returns HTTP 400 with ProblemDetails when model validation fails, without manual ModelState checks',
          'Registers the controller as a singleton',
          'Disables routing for the controller',
        ],
        correctIndex: 1,
        explanation: '`[ApiController]` opts into several API-specific behaviours including automatic `ModelState` validation and `ProblemDetails` (RFC 9457) error responses — eliminating repetitive `if (!ModelState.IsValid)` checks.',
      },
      {
        kind: 'code',
        id: 'csharp-8-code-1',
        prompt: 'Write the skeleton of a custom ASP.NET Core middleware class that logs the elapsed time of each request to the console and calls the next middleware.',
        starterCode: `using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

public class TimingMiddleware
{
    private readonly RequestDelegate _next;
    public TimingMiddleware(RequestDelegate next) => _next = next;

    public async Task InvokeAsync(HttpContext context)
    {
        var sw = Stopwatch.StartNew();
        await _next(context);
        sw.Stop();
        Console.WriteLine($"{context.Request.Path} took {sw.ElapsedMilliseconds}ms");
    }
}
// Registration (in Program.cs): app.UseMiddleware<TimingMiddleware>();
Console.WriteLine("Middleware defined.");`,
        expectedOutput: 'Middleware defined.',
        hint: 'Store `RequestDelegate` in the constructor, then `await _next(context)` in `InvokeAsync`. Measure time before and after the call.',
      },
    ],
  },
  {
    id: 'csharp-9',
    language: 'csharp',
    level: 9,
    title: 'Roslyn Analyzers, Source Generators & AOT',
    timeEstimate: '22-25 hours',
    intro: `Roslyn, the .NET compiler platform, exposes full access to the compilation pipeline. In this phase you will write a diagnostic analyzer that flags a custom code smell, pair it with a code fix, and author an incremental source generator that eliminates boilerplate at compile time. You will also learn to write diagnostic suppressors for third-party false positives.\n\nThe second half of the phase covers Native AOT (Ahead-of-Time) compilation (\`PublishAot\`) and trimming. AOT produces self-contained native binaries with faster startup and lower memory, but imposes restrictions — no runtime reflection, no dynamic code generation. You will learn to annotate your code correctly, use source-generated JSON serialisation (\`System.Text.Json\` source gen), and verify AOT compatibility.`,
    topics: [
      {
        label: 'Writing a Roslyn diagnostic analyzer',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/tutorials/how-to-write-csharp-analyzer-code-fix',
      },
      {
        label: 'Incremental source generators',
        url: 'https://github.com/dotnet/roslyn/blob/main/docs/features/incremental-generators.md',
      },
      {
        label: 'Diagnostic suppressors',
        url: 'https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/suppress-warnings',
      },
      {
        label: 'Native AOT deployment',
        url: 'https://learn.microsoft.com/en-us/dotnet/core/deploying/native-aot/',
      },
      {
        label: 'System.Text.Json source generation',
        url: 'https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/source-generation',
      },
      {
        label: 'Trimming warnings and annotations',
        url: 'https://learn.microsoft.com/en-us/dotnet/core/deploying/trimming/trimming-options',
      },
    ],
    deliverable:
      'Create an analyzer `DEMO001` that warns when `string.Concat` is called with more than three arguments (prefer interpolation), plus a code fix that rewrites the call to an interpolated string. Add an incremental source generator that reads `[GenerateToString]` attributes and emits `ToString()` overrides. Publish a minimal console app with `PublishAot=true` and verify the binary starts in under 50ms.',
    checks: [
      {
        kind: 'mcq',
        id: 'csharp-9-mcq-1',
        prompt: 'What is the main reason native AOT-compiled .NET apps cannot use `Assembly.Load` at runtime?',
        options: [
          'AOT binaries do not include the CLR runtime',
          'AOT compilation resolves all types at publish time; runtime IL loading is incompatible with the pre-compiled native code',
          'The GAC is unavailable in AOT mode',
          'Only C# 12+ syntax is supported in AOT',
        ],
        correctIndex: 1,
        explanation: 'Native AOT produces native machine code with all types resolved statically. Dynamic assembly loading would require a JIT and IL interpretation infrastructure that is deliberately excluded from AOT binaries.',
      },
      {
        kind: 'mcq',
        id: 'csharp-9-mcq-2',
        prompt: 'In an incremental source generator, why should you prefer `IncrementalValueProvider` pipelines over `GeneratorExecutionContext.Compilation`?',
        options: [
          'IncrementalValueProvider pipelines support more file types',
          'They cache intermediate results, so only changed syntax nodes trigger regeneration, avoiding full recompilation on every keystroke',
          'They are required by the Roslyn API in .NET 8+',
          'They allow async operations inside the generator',
        ],
        correctIndex: 1,
        explanation: 'Incremental generators were introduced precisely to fix the performance problems of V1 generators — caching at each pipeline stage means the generator only re-runs the stages affected by a change.',
      },
      {
        kind: 'code',
        id: 'csharp-9-code-1',
        prompt: 'Use `System.Text.Json` source generation to serialise a record without runtime reflection. Define a `JsonSerializerContext`, then serialise and print a `Person` record.',
        starterCode: `using System;
using System.Text.Json;
using System.Text.Json.Serialization;

record Person(string Name, int Age);

[JsonSerializable(typeof(Person))]
partial class AppJsonContext : JsonSerializerContext { }

Person p = new("Alice", 30);
string json = JsonSerializer.Serialize(p, AppJsonContext.Default.Person);
Console.WriteLine(json);`,
        expectedOutput: '{"Name":"Alice","Age":30}',
        hint: 'Decorate a `partial class` that extends `JsonSerializerContext` with `[JsonSerializable(typeof(T))]`. Pass the generated `TypeInfo` to `JsonSerializer.Serialize`.',
      },
    ],
  },
  {
    id: 'csharp-10',
    language: 'csharp',
    level: 10,
    title: '.NET Internals — GC, JIT, Unsafe Code & Native AOT',
    timeEstimate: '25-30 hours',
    intro: `This final phase dives into how the .NET runtime works under the hood. You will learn how the generational garbage collector (Server GC vs Workstation GC, LOH, POH) impacts allocation strategies, how to tune GC settings, and how to use GC events via EventPipe to diagnose pressure. On the execution side, you will explore JIT compilation, tiered compilation, and AOT, understanding when each applies and how to read disassembly output with dotnet-disasm or SharpLab.\n\nThe unsafe half of the phase covers raw pointer arithmetic, \`fixed\` statements, \`stackalloc\`, \`Unsafe.As\`, and P/Invoke for calling native libraries. You will also publish a final Native AOT binary, annotate all reflection-using APIs with \`[DynamicallyAccessedMembers]\`, and measure cold-start time. These skills underpin .NET library authorship and high-performance service development.`,
    topics: [
      {
        label: 'GC internals — workstation vs server, LOH, POH',
        url: 'https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/fundamentals',
      },
      {
        label: 'Writing unsafe code in C#',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/unsafe-code',
      },
      {
        label: 'P/Invoke and native interop',
        url: 'https://learn.microsoft.com/en-us/dotnet/standard/native-interop/pinvoke',
      },
      {
        label: 'Tiered compilation and PGO',
        url: 'https://learn.microsoft.com/en-us/dotnet/core/runtime-config/compilation',
      },
      {
        label: 'System.Runtime.CompilerServices.Unsafe',
        url: 'https://learn.microsoft.com/en-us/dotnet/api/system.runtime.compilerservices.unsafe',
      },
      {
        label: 'DynamicallyAccessedMembers for trimming/AOT',
        url: 'https://learn.microsoft.com/en-us/dotnet/core/deploying/trimming/prepare-libraries-for-trimming',
      },
    ],
    deliverable:
      'Write a native interop layer that calls `strlen` from libc (or kernel32 on Windows) via P/Invoke, and implement a safe wrapper that returns a `ReadOnlySpan<byte>` over the native buffer using `MemoryMarshal`. Publish with `PublishAot=true`, measure startup time, and write a GC analysis report showing gen-0/1/2 collection counts under load using `dotnet-counters monitor`.',
    checks: [
      {
        kind: 'mcq',
        id: 'csharp-10-mcq-1',
        prompt: 'What is the Pinned Object Heap (POH) introduced in .NET 5?',
        options: [
          'A heap segment for objects pinned with GCHandle',
          'A dedicated heap region for pinned objects that avoids fragmenting the regular generation heaps',
          'The Large Object Heap renamed',
          'An off-heap region for native memory allocations',
        ],
        correctIndex: 1,
        explanation: 'The POH was introduced to solve GC fragmentation caused by pinned buffers scattering across gen-0/1 heaps. Pinned objects are segregated into their own heap so the main generational heaps remain compact.',
      },
      {
        kind: 'mcq',
        id: 'csharp-10-mcq-2',
        prompt: 'What does `[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors)]` communicate to the trimmer?',
        options: [
          'The annotated parameter or field may be used to reflectively invoke public constructors; the trimmer must preserve them',
          'Public constructors are excluded from trimming',
          'The type must be serializable',
          'The annotated type is AOT-incompatible',
        ],
        correctIndex: 0,
        explanation: 'This attribute is a contract between caller and trimmer: it warns the trimmer to keep public constructors of the annotated type, preventing them from being removed during publish-time tree-shaking.',
      },
      {
        kind: 'code',
        id: 'csharp-10-code-1',
        prompt: 'Use `stackalloc` to allocate a 4-element `Span<int>` on the stack, fill it with squares (0,1,4,9), then print each value.',
        starterCode: `using System;

Span<int> squares = stackalloc int[4];
for (int i = 0; i < squares.Length; i++)
    squares[i] = i * i;
foreach (int v in squares)
    Console.WriteLine(v);`,
        expectedOutput: `0\n1\n4\n9`,
        hint: '`stackalloc` allocates on the stack and can be converted to `Span<T>` without `unsafe` context in modern C#.',
      },
      {
        kind: 'code',
        id: 'csharp-10-code-2',
        prompt: 'Demonstrate a minimal P/Invoke declaration for `abs` from the C runtime (libc on Linux/macOS, msvcrt on Windows) and call it with -42.',
        starterCode: `using System;
using System.Runtime.InteropServices;

static partial class NativeMethods
{
    [LibraryImport("libc", EntryPoint = "abs")]
    public static partial int Abs(int value);
}

Console.WriteLine(NativeMethods.Abs(-42));`,
        expectedOutput: '42',
        hint: '`[LibraryImport]` (C# 11+) is the source-generated, AOT-friendly replacement for `[DllImport]`. On Windows replace `"libc"` with `"msvcrt"`.',
      },
    ],
  },
];
