import type { Phase } from './types';

export const fsharpPhases: Phase[] = [
  {
    id: 'fsharp-1',
    language: 'fsharp',
    level: 1,
    title: 'F# Fundamentals — let, Inference, Pipelines',
    timeEstimate: '4-6 hours',
    intro: `F# is a functional-first language on .NET. Unlike C# or Java, you rarely write types explicitly — the compiler infers them from usage. The \`let\` keyword binds a name to a value (immutable by default), and the pipe operator \`|>\` threads data through a chain of functions in a readable left-to-right style.\n\nIn this phase you will write your first F# bindings, discover how immutability shapes code structure, build simple functions, and pipe data through transformation chains. Everything runs in the F# REPL at [fable.io/repl](https://fable.io/repl) — paste code, click **Run**, and observe the output in the right panel.`,
    topics: [
      {
        label: 'F# Language Overview (learn.microsoft.com)',
        url: 'https://learn.microsoft.com/en-us/dotnet/fsharp/what-is-fsharp',
      },
      {
        label: 'let Bindings',
        url: 'https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/functions/let-bindings',
      },
      {
        label: 'Type Inference',
        url: 'https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/type-inference',
      },
      {
        label: 'Immutability (fsharp.org tour)',
        url: 'https://fsharp.org/learn/',
      },
      {
        label: 'Functions (fsharpforfunandprofit.com)',
        url: 'https://fsharpforfunandprofit.com/posts/thinking-functionally-intro/',
      },
      {
        label: 'Pipe Operator |>',
        url: 'https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/symbol-and-operator-reference/',
      },
    ],
    deliverable:
      'A working F# script (`.fsx`) containing at least five `let` bindings, two helper functions composed via `|>`, and a pipeline that transforms a list of numbers.',
    checks: [
      {
        kind: 'mcq',
        id: 'fsharp-1-mcq-1',
        prompt:
          'What does the `let` keyword do in F# by default when binding a value like `let x = 42`?',
        options: [
          'Declares a mutable variable that can be reassigned later',
          'Creates an immutable binding — `x` cannot be reassigned',
          'Allocates heap memory and returns a reference',
          'Defines a class property',
        ],
        correctIndex: 1,
        explanation:
          '`let` bindings in F# are immutable by default. To allow mutation you must explicitly write `let mutable x = 42`. This immutability-first approach reduces accidental state bugs.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-1-mcq-2',
        prompt:
          'Which of the following correctly pipes the value `5` through `double` then `addOne` using the F# pipe operator?',
        options: [
          '`5 -> double -> addOne`',
          '`addOne(double(5))`',
          '`5 |> double |> addOne`',
          '`pipe 5 double addOne`',
        ],
        correctIndex: 2,
        explanation:
          '`|>` passes the left-hand value as the last argument to the right-hand function. `5 |> double |> addOne` reads as "take 5, double it, then add one" — identical semantics to `addOne (double 5)` but in natural reading order.',
      },
      {
        kind: 'code',
        id: 'fsharp-1-code-1',
        prompt:
          'Open [fable.io/repl](https://fable.io/repl), paste the starter code, and click **Run**. You should see:\n```\n41\n```\nThe pipeline squares each number in the list (`[1;4;9;16;25]`), keeps only those above 10 (`[16;25]`), and sums the rest (`16 + 25 = 41`). Confirm the output matches, then mark as reviewed.',
        starterCode: `let numbers = [1; 2; 3; 4; 5]

let double x = x * 2
let isAboveTen x = x > 10

let result =
    numbers
    |> List.map (fun x -> x * x)   // square each: [1;4;9;16;25]
    |> List.filter isAboveTen       // keep >10: [16;25]
    |> List.sum                     // sum: 41

printfn "%d" result`,
        hint: 'Read the pipeline top-to-bottom: `List.map (fun x -> x * x)` squares each element, `List.filter isAboveTen` keeps only values greater than 10, and `List.sum` adds the survivors. Make sure you are on fable.io/repl (Fable 4 / F# 8).',
      },
    ],
  },

  {
    id: 'fsharp-2',
    language: 'fsharp',
    level: 2,
    title: 'Records, Discriminated Unions & Pattern Matching',
    timeEstimate: '5-7 hours',
    intro: `F#'s type system is where its expressiveness really shines. **Records** are lightweight named tuples with structural equality and copy-and-update syntax (\`{ record with field = newValue }\`). **Discriminated Unions (DUs)** model data that can be one of several named cases — the functional equivalent of sealed class hierarchies but far more concise.\n\n**Pattern matching** with \`match\` exhaustively deconstructs both record fields and DU cases at compile time. Combined with the \`Option\` and \`Result\` types (built-in DUs), you eliminate null-reference errors and encode errors into the type system itself.`,
    topics: [
      {
        label: 'Records',
        url: 'https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/records',
      },
      {
        label: 'Discriminated Unions',
        url: 'https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/discriminated-unions',
      },
      {
        label: 'Pattern Matching',
        url: 'https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/pattern-matching',
      },
      {
        label: 'Options (fsharpforfunandprofit.com)',
        url: 'https://fsharpforfunandprofit.com/posts/the-option-type/',
      },
      {
        label: 'Lists, Sequences & Arrays',
        url: 'https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/lists',
      },
      {
        label: 'Result Type',
        url: 'https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/results',
      },
    ],
    deliverable:
      'An F# script defining a `Shape` discriminated union (Circle, Rectangle, Triangle), a `area` function using pattern matching, and a list of shapes whose areas are printed using `List.map` and `printfn`.',
    checks: [
      {
        kind: 'mcq',
        id: 'fsharp-2-mcq-1',
        prompt:
          'Given `type Color = Red | Green | Blue`, what does the compiler do if your `match` expression only handles `Red` and `Green`?',
        options: [
          'Throws a runtime exception when `Blue` is encountered',
          'Silently ignores unhandled cases',
          'Emits a compile-time **incomplete pattern match** warning (or error with warnings-as-errors)',
          'Returns the default value of the type',
        ],
        correctIndex: 2,
        explanation:
          'F# exhaustiveness checking happens at compile time. The compiler warns (or errors) when a DU case is not covered, preventing runtime surprises.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-2-mcq-2',
        prompt:
          'What is the idiomatic way to update a single field in an F# record without mutating the original?',
        options: [
          '`record.Field <- newValue`',
          '`{ record with Field = newValue }`',
          '`record.clone(Field = newValue)`',
          '`Record.update record Field newValue`',
        ],
        correctIndex: 1,
        explanation:
          'The `{ record with Field = newValue }` copy-and-update expression creates a new record with all fields copied from the original except the ones explicitly listed.',
      },
      {
        kind: 'code',
        id: 'fsharp-2-code-1',
        prompt:
          'Paste into [fable.io/repl](https://fable.io/repl) and run. Expected output:\n```\nCircle area: 78.54\nRectangle area: 12.00\nTriangle area: 6.00\n```\nConfirm each line matches (values rounded to 2 dp), then mark as reviewed.',
        starterCode: `type Shape =
    | Circle of radius: float
    | Rectangle of width: float * height: float
    | Triangle of baseLen: float * height: float

let area shape =
    match shape with
    | Circle r       -> System.Math.PI * r * r
    | Rectangle(w,h) -> w * h
    | Triangle(b,h)  -> 0.5 * b * h

let shapes = [ Circle 5.0; Rectangle(4.0, 3.0); Triangle(4.0, 3.0) ]
let labels = [ "Circle"; "Rectangle"; "Triangle" ]

List.zip labels shapes
|> List.iter (fun (label, s) -> printfn "%s area: %.2f" label (area s))`,
        hint: 'The Triangle case uses `baseLen` to avoid the reserved keyword `base`. Make sure the Fable REPL is set to F#.',
      },
    ],
  },

  {
    id: 'fsharp-3',
    language: 'fsharp',
    level: 3,
    title: 'Modules, Namespaces, Classes & IO',
    timeEstimate: '5-7 hours',
    intro: `F# code is organised into **modules** (the primary unit) and optionally **namespaces** (for .NET interop). Modules can be opened with \`open\` and nest freely. For .NET interoperability — consuming C# libraries or exposing an API — F# also supports **classes** with members, interfaces, and inheritance, though idiomatic F# prefers modules of functions over classes.\n\n**Exception handling** uses \`try/with\` and the \`exn\` hierarchy. **IO** is done through \`System.IO\` just as in C#, and F# makes simple file processing concise with \`File.ReadAllLines\` piped through list combinators.`,
    topics: [
      {
        label: 'Modules',
        url: 'https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/modules',
      },
      {
        label: 'Namespaces',
        url: 'https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/namespaces',
      },
      {
        label: 'Classes',
        url: 'https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/classes',
      },
      {
        label: 'Exception Handling',
        url: 'https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/exception-handling/',
      },
      {
        label: 'File IO with System.IO',
        url: 'https://learn.microsoft.com/en-us/dotnet/api/system.io.file',
      },
      {
        label: 'F# for fun and profit — Modules',
        url: 'https://fsharpforfunandprofit.com/posts/organizing-functions/',
      },
    ],
    deliverable:
      'An F# script with a `StringUtils` module containing at least three string-processing functions, a `try/with` block that catches `System.FormatException`, and a demonstration of reading lines from a string (simulated file) and filtering them.',
    checks: [
      {
        kind: 'mcq',
        id: 'fsharp-3-mcq-1',
        prompt:
          'In F#, what is the difference between a **module** and a **namespace**?',
        options: [
          'They are identical — the keywords are interchangeable',
          'A namespace can contain values and functions directly; a module cannot',
          'A module can contain values, functions, and types directly; a namespace can only contain modules and types (no bare values)',
          'Namespaces are only used in .NET assemblies; modules are for scripts only',
        ],
        correctIndex: 2,
        explanation:
          'Namespaces in F# are purely organisational containers for types and modules — they cannot hold `let` bindings directly. Modules can hold values, functions, types, and nested modules.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-3-mcq-2',
        prompt:
          'Which syntax correctly catches only `System.DivideByZeroException` in F#?',
        options: [
          '`catch (DivideByZeroException e) { ... }`',
          '`try ... with | :? System.DivideByZeroException as ex -> ...`',
          '`try ... except DivideByZeroException: ...`',
          '`handle DivideByZeroException -> ...`',
        ],
        correctIndex: 1,
        explanation:
          'F# uses `:?` (type test pattern) inside `with` to match a specific .NET exception type. The `as ex` part binds the exception object to a name.',
      },
      {
        kind: 'code',
        id: 'fsharp-3-code-1',
        prompt:
          'Paste into [fable.io/repl](https://fable.io/repl) and run. Expected output:\n```\nHello World\nFsharp Is Great\nError: not a number\n```\nConfirm all three lines appear, then mark as reviewed.',
        starterCode: `module StringUtils =
    let capitalize (s: string) =
        if System.String.IsNullOrEmpty(s) then s
        else System.Char.ToUpper(s.[0]).ToString() + s.[1..].ToLower()

    let titleCase (sentence: string) =
        sentence.Split(' ')
        |> Array.map capitalize
        |> String.concat " "

    let tryParseInt (s: string) =
        try
            Ok(int s)
        with
        | :? System.FormatException -> Error "not a number"

open StringUtils

printfn "%s" (titleCase "hello world")
printfn "%s" (titleCase "FSHARP IS GREAT")

match tryParseInt "abc" with
| Ok n    -> printfn "Parsed: %d" n
| Error e -> printfn "Error: %s" e`,
        hint: 'The `s.[1..]` slice syntax works in Fable. If you see a type error on `s.[0]`, try `s[0]` (F# 6+ index syntax also accepted by Fable).',
      },
    ],
  },

  {
    id: 'fsharp-4',
    language: 'fsharp',
    level: 4,
    title: 'Generics, HOFs, Currying & Computation Expressions',
    timeEstimate: '6-8 hours',
    intro: `F# functions are curried by default — a two-argument function \`f a b\` is actually \`f a\` returning another function that accepts \`b\`. This enables **partial application**: fix some arguments early and pass the resulting function around. Combined with **higher-order functions** (functions that accept or return functions), currying makes F# combinators extremely composable.\n\n**Computation expressions** (CEs) are F#'s mechanism for abstracting over effectful or sequenced computations. The built-in \`async { }\`, \`option { }\` (via community libraries), and \`result { }\` builders let you write imperative-looking code that is actually monadic. This phase also covers **units of measure** — a compile-time type safety feature unique to F# that prevents accidentally mixing metres with feet.`,
    topics: [
      {
        label: 'Generics',
        url: 'https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/generics/',
      },
      {
        label: 'Partial Application & Currying (fsharpforfunandprofit.com)',
        url: 'https://fsharpforfunandprofit.com/posts/partial-application/',
      },
      {
        label: 'Higher-Order Functions',
        url: 'https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/functions/#higher-order-functions',
      },
      {
        label: 'Computation Expressions Introduction',
        url: 'https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/computation-expressions',
      },
      {
        label: 'Async Workflows',
        url: 'https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/async-expressions',
      },
      {
        label: 'Units of Measure',
        url: 'https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/units-of-measure',
      },
    ],
    deliverable:
      'An F# script demonstrating: a generic `swap` function, partial application of `List.filter` to build a reusable predicate, an `option` computation expression that chains two lookups safely, and a unit-of-measure example that prevents mixing `m` and `ft`.',
    checks: [
      {
        kind: 'mcq',
        id: 'fsharp-4-mcq-1',
        prompt:
          'What is the inferred type of `let add x y = x + y` in F# when called as `let addFive = add 5`?',
        options: [
          '`int -> int -> int` — `addFive` is the same as `add`',
          '`int -> int` — `addFive` is a function waiting for one more `int` argument',
          '`unit -> int` — calling `addFive()` returns 5',
          '`int` — partial application evaluates immediately',
        ],
        correctIndex: 1,
        explanation:
          '`add 5` partially applies `add` with `x = 5`, returning a new function of type `int -> int`. This is currying: every multi-argument function in F# is a chain of single-argument functions.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-4-mcq-2',
        prompt:
          'In a `result { }` computation expression, what does `let!` do compared to `let`?',
        options: [
          '`let!` forces async execution; `let` is synchronous',
          '`let!` unwraps the `Ok` value and short-circuits on `Error`; `let` binds an ordinary value without unwrapping',
          '`let!` declares a mutable binding; `let` is immutable',
          '`let!` and `let` are identical inside computation expressions',
        ],
        correctIndex: 1,
        explanation:
          '`let!` is the monadic bind inside a CE. For `Result`, it extracts the `Ok` value or immediately propagates the `Error`, allowing you to chain fallible operations in a sequential style.',
      },
      {
        kind: 'code',
        id: 'fsharp-4-code-1',
        prompt:
          'Paste into [fable.io/repl](https://fable.io/repl) and run. Expected output:\n```\nEvens: [2; 4; 6]\nHello, Alice!\nHello, Bob!\nUser found: Alice\nUser not found\n```\nConfirm all five lines appear, then mark as reviewed.',
        starterCode: `// Partial application
let isEven x = x % 2 = 0
let evens = List.filter isEven [1..6]
printfn "Evens: %A" evens

// Higher-order function returning a function
let greet greeting name = sprintf "%s, %s!" greeting name
let hello = greet "Hello"
List.iter (printfn "%s") (List.map hello ["Alice"; "Bob"])

// Option chaining with built-in Option.bind
let users = Map.ofList [("alice", "Alice"); ("bob", "Bob")]

let findUser key =
    Map.tryFind key users

let lookupAndGreet key =
    findUser key
    |> Option.map (fun name -> sprintf "User found: %s" name)
    |> Option.defaultValue "User not found"

printfn "%s" (lookupAndGreet "alice")
printfn "%s" (lookupAndGreet "charlie")`,
        hint: 'This example uses `Option.bind` / `Option.map` rather than a full CE builder, which is compatible with Fable REPL. For full `result { }` CE syntax you would need FsToolkit.ErrorHandling.',
      },
    ],
  },

  {
    id: 'fsharp-5',
    language: 'fsharp',
    level: 5,
    title: 'Type Providers — JSON, CSV & SQL',
    timeEstimate: '6-8 hours',
    intro: `**Type providers** are one of F#'s killer features: a compiler plugin that generates types at design time by inspecting real data (a JSON file, CSV schema, database connection string). You get full IntelliSense and type safety over external data without hand-writing DTOs.\n\n\`FSharp.Data\` provides the most-used providers: \`JsonProvider\`, \`CsvProvider\`, and \`HtmlProvider\`. \`SQLProvider\` (separate package) generates types from a live database schema. This phase works best in a local dotnet project or VS Code with Ionide; Fable REPL does not support type providers. We cover the API and patterns here, with code tasks designed for a local \`.fsx\` script.`,
    topics: [
      {
        label: 'FSharp.Data — Overview',
        url: 'https://fsprojects.github.io/FSharp.Data/',
      },
      {
        label: 'JSON Type Provider',
        url: 'https://fsprojects.github.io/FSharp.Data/library/JsonProvider.html',
      },
      {
        label: 'CSV Type Provider',
        url: 'https://fsprojects.github.io/FSharp.Data/library/CsvProvider.html',
      },
      {
        label: 'HTML Type Provider',
        url: 'https://fsprojects.github.io/FSharp.Data/library/HtmlProvider.html',
      },
      {
        label: 'SQLProvider (fsprojects.github.io)',
        url: 'https://fsprojects.github.io/SQLProvider/',
      },
      {
        label: 'Type Providers (learn.microsoft.com)',
        url: 'https://learn.microsoft.com/en-us/dotnet/fsharp/tutorials/type-providers/',
      },
    ],
    deliverable:
      'A local `.fsx` script that uses `FSharp.Data.JsonProvider` to parse a hard-coded JSON string of at least three records, filters by a field value, and prints results. Include a `#r "nuget: FSharp.Data"` reference.',
    checks: [
      {
        kind: 'mcq',
        id: 'fsharp-5-mcq-1',
        prompt:
          'What does `JsonProvider<"sample.json">` do at **compile time** in F#?',
        options: [
          'Reads `sample.json` at runtime and parses it into a dictionary',
          'Generates a static type whose properties match the fields of `sample.json` — no runtime reflection needed for field access',
          'Validates that `sample.json` is well-formed but does not generate any types',
          'Creates a mutable schema object that can be updated when the JSON changes',
        ],
        correctIndex: 1,
        explanation:
          'Type providers run inside the F# compiler. `JsonProvider<"sample.json">` reads the sample at compile time, infers a structural type, and makes its fields available as strongly-typed properties — giving you IntelliSense and compile-time safety over JSON.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-5-mcq-2',
        prompt:
          'You have a CSV file with a header row `Name,Age,Score`. With `CsvProvider`, how do you access the `Score` column of the first data row?',
        options: [
          '`rows.[0].["Score"]`',
          '`rows.[0].Score`',
          '`CsvProvider.getColumn rows "Score" 0`',
          '`rows.Head |> Map.find "Score"`',
        ],
        correctIndex: 1,
        explanation:
          'CsvProvider generates a typed row type with a property per column. `row.Score` is strongly typed (inferred as `float` or `int` from the data), eliminating the need for string-keyed lookups.',
      },
      {
        kind: 'code',
        id: 'fsharp-5-code-1',
        prompt:
          'In a local terminal, create `tp-demo.fsx` with the starter code below and run it with `dotnet fsi tp-demo.fsx`. Expected output:\n```\nAlice: 92\nCharlie: 88\n```\nType providers are not supported in Fable REPL, so this exercise requires a local .NET 6+ install. Confirm the output matches, then mark as reviewed.',
        starterCode: `#r "nuget: FSharp.Data, 6.4.0"
open FSharp.Data

type Students = JsonProvider<"""
[
  {"name": "Alice",   "score": 92},
  {"name": "Bob",     "score": 74},
  {"name": "Charlie", "score": 88}
]""">

let data = Students.GetSamples()

data
|> Array.filter (fun s -> s.Score >= 88)
|> Array.iter (fun s -> printfn "%s: %d" s.Name s.Score)`,
        hint: 'If `dotnet fsi` is not found, install .NET SDK from https://dotnet.microsoft.com/download. The `#r "nuget:"` directive downloads FSharp.Data on first run (requires internet).',
      },
    ],
  },

  {
    id: 'fsharp-6',
    language: 'fsharp',
    level: 6,
    title: 'Authoring Computation Expressions',
    timeEstimate: '7-9 hours',
    intro: `Computation expressions are not magic — they are syntactic sugar over a **builder object** with methods like \`Bind\`, \`Return\`, \`Zero\`, and optionally \`Combine\`, \`Delay\`, and \`Run\`. Once you know the protocol, you can build your own CE for any monad-like pattern: validation, logging, state threading, async I/O, etc.\n\nThis phase walks through building a minimal \`ResultBuilder\` from scratch, understanding the desugaring rules, and then extending it to support \`for\` loops and \`while\` loops inside the CE. You will also study monadic patterns such as \`>>=\` (bind), \`>=>\` (Kleisli composition), and the relationship between CEs and the \`Option\`, \`Result\`, and \`Async\` types.`,
    topics: [
      {
        label: 'Computation Expressions — Full Reference',
        url: 'https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/computation-expressions',
      },
      {
        label: 'CE Builder Methods Table',
        url: 'https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/computation-expressions#creating-a-new-type-of-computation-expression',
      },
      {
        label: 'Monadic patterns (fsharpforfunandprofit.com)',
        url: 'https://fsharpforfunandprofit.com/posts/computation-expressions-intro/',
      },
      {
        label: 'Railway Oriented Programming',
        url: 'https://fsharpforfunandprofit.com/rop/',
      },
      {
        label: 'FsToolkit.ErrorHandling (community CE library)',
        url: 'https://github.com/demystifyfp/FsToolkit.ErrorHandling',
      },
    ],
    deliverable:
      'A local `.fsx` that implements a `ResultBuilder` class with `Bind`, `Return`, and `ReturnFrom`, exposes it as `result { }`, and chains at least three fallible operations through the CE.',
    checks: [
      {
        kind: 'mcq',
        id: 'fsharp-6-mcq-1',
        prompt:
          'In a computation expression, `let! x = expr` desugars to which builder method call?',
        options: [
          '`builder.Let(expr, fun x -> ...)`',
          '`builder.Bind(expr, fun x -> ...)`',
          '`builder.Return(expr)`',
          '`builder.Run(expr)`',
        ],
        correctIndex: 1,
        explanation:
          '`let! x = expr in body` desugars to `builder.Bind(expr, fun x -> body)`. This is the core monadic bind — it unwraps the value from the wrapper type and threads it through the continuation.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-6-mcq-2',
        prompt:
          'Which builder method must be implemented so that `return x` works inside a CE?',
        options: [
          '`Bind`',
          '`Zero`',
          '`Return`',
          '`Yield`',
        ],
        correctIndex: 2,
        explanation:
          '`return x` inside a CE desugars to `builder.Return(x)`. `Return` wraps a plain value into the computation type (e.g., `Ok x` for a result builder).',
      },
      {
        kind: 'code',
        id: 'fsharp-6-code-1',
        prompt:
          'Paste into [fable.io/repl](https://fable.io/repl) and run. Expected output:\n```\nOk 30\nError "age must be positive"\n```\nConfirm both lines appear, then mark as reviewed.',
        starterCode: `type ResultBuilder() =
    member _.Bind(m, f) =
        match m with
        | Ok v    -> f v
        | Error e -> Error e
    member _.Return(v) = Ok v
    member _.ReturnFrom(m) = m

let result = ResultBuilder()

let validateAge age =
    if age > 0 then Ok age
    else Error "age must be positive"

let validateName (name: string) =
    if name.Length > 0 then Ok name
    else Error "name is empty"

let processUser name age =
    result {
        let! n = validateName name
        let! a = validateAge age
        return a * n.Length   // trivial combination
    }

printfn "%A" (processUser "Alice" 6)   // Ok 30
printfn "%A" (processUser "Bob" -1)    // Error "age must be positive"`,
        hint: '"Alice".Length is 5, so 5 * 6 = 30. If you see `Ok 18` something changed the age argument. Check the argument order in the last two lines.',
      },
    ],
  },

  {
    id: 'fsharp-7',
    language: 'fsharp',
    level: 7,
    title: 'Web with Giraffe & Saturn',
    timeEstimate: '8-10 hours',
    intro: `**Giraffe** is a thin functional wrapper over ASP.NET Core that exposes HTTP handler composition via the \`>=>\` (fish) operator — each handler is \`HttpContext -> Task<HttpContext option>\`. **Saturn** builds on Giraffe and adds a higher-level opinionated layer with \`router { }\`, \`application { }\`, and \`controller { }\` computation expressions inspired by Phoenix (Elixir).\n\nF# web development is fully .NET-compatible: all ASP.NET middleware, dependency injection, and hosting APIs work. This phase builds a small REST API, covering routing, JSON serialization with System.Text.Json, middleware, and basic DI in F# style. Work is done in a local \`dotnet new web\` project.`,
    topics: [
      {
        label: 'Giraffe Documentation',
        url: 'https://giraffe.wiki',
      },
      {
        label: 'Giraffe GitHub',
        url: 'https://github.com/giraffe-fsharp/Giraffe',
      },
      {
        label: 'Saturn Documentation',
        url: 'https://saturnframework.org/docs/',
      },
      {
        label: 'Saturn GitHub',
        url: 'https://github.com/SaturnFramework/Saturn',
      },
      {
        label: 'Giraffe — Handlers & Routing',
        url: 'https://giraffe.wiki/docs/routing',
      },
      {
        label: 'F# Dependency Injection patterns',
        url: 'https://fsharpforfunandprofit.com/posts/dependency-injection-1/',
      },
    ],
    deliverable:
      'A local Saturn project with at least two routes: `GET /health` returning `{ "status": "ok" }` and `GET /greet/:name` returning a greeting JSON object. The project must start with `dotnet run` and respond correctly to `curl` requests.',
    checks: [
      {
        kind: 'mcq',
        id: 'fsharp-7-mcq-1',
        prompt:
          'In Giraffe, what does the `>=>` (fish / Kleisli) operator do when composing HTTP handlers?',
        options: [
          'It runs both handlers in parallel and races their results',
          'It sequences two handlers — the output `HttpContext` of the first is passed to the second; if the first returns `None` the second is skipped',
          'It tries the left handler and falls back to the right on any error',
          'It is equivalent to `|>` — purely cosmetic',
        ],
        correctIndex: 1,
        explanation:
          '`h1 >=> h2` composes two Giraffe handlers. The second handler only runs if the first returned `Some ctx`. This allows pipeline-style middleware composition (auth check >=> route handler >=> response writer).',
      },
      {
        kind: 'mcq',
        id: 'fsharp-7-mcq-2',
        prompt:
          'In Saturn\'s `router { }` CE, which keyword registers a route for HTTP GET?',
        options: [
          '`route "GET" "/path" handler`',
          '`get "/path" handler`',
          '`map [GET] "/path" handler`',
          '`handle GET "/path" handler`',
        ],
        correctIndex: 1,
        explanation:
          'Saturn\'s router CE exposes `get`, `post`, `put`, `delete`, etc. as direct keywords that bind a path pattern to a handler function.',
      },
      {
        kind: 'code',
        id: 'fsharp-7-code-1',
        prompt:
          'In a local terminal, create a new Saturn project and add the handler below. Start with `dotnet run`, then in another terminal run:\n```\ncurl http://localhost:5000/greet/World\n```\nExpected response:\n```json\n{"message":"Hello, World!"}\n```\nConfirm the response matches, then mark as reviewed.',
        starterCode: `// Program.fs — minimal Saturn app
open Saturn
open Giraffe
open Microsoft.AspNetCore.Http

let greetHandler (name: string) : HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        let msg = {| message = sprintf "Hello, %s!" name |}
        json msg next ctx

let myRouter = router {
    get "/health" (json {| status = "ok" |})
    getf "/greet/%s" greetHandler
}

let app = application {
    use_router myRouter
}

run app`,
        hint: 'Install Saturn with `dotnet add package Saturn`. If port 5000 conflicts, set `ASPNETCORE_URLS=http://localhost:5001` before `dotnet run`. Giraffe is pulled in transitively by Saturn.',
      },
    ],
  },

  {
    id: 'fsharp-8',
    language: 'fsharp',
    level: 8,
    title: 'Parser Combinators with FParsec',
    timeEstimate: '8-10 hours',
    intro: `**FParsec** is an F# port of the Haskell Parsec library. It lets you build parsers by composing small primitive parsers (parse a digit, parse a quoted string, skip whitespace) using operators and combinators — no separate grammar file, no code generation, just ordinary F# values.\n\nTypical applications: expression evaluators, configuration file parsers, small scripting languages, and data format decoders. This phase builds a complete arithmetic expression parser that handles operator precedence and parentheses, producing an AST that is then evaluated.`,
    topics: [
      {
        label: 'FParsec Documentation',
        url: 'https://www.quanttec.com/fparsec/',
      },
      {
        label: 'FParsec Tutorial',
        url: 'https://www.quanttec.com/fparsec/tutorial.html',
      },
      {
        label: 'FParsec Reference — Primitives',
        url: 'https://www.quanttec.com/fparsec/reference/primitives.html',
      },
      {
        label: 'FParsec GitHub',
        url: 'https://github.com/stephan-tolksdorf/fparsec',
      },
      {
        label: 'Parser combinators intro (fsharpforfunandprofit.com)',
        url: 'https://fsharpforfunandprofit.com/series/understanding-parser-combinators/',
      },
    ],
    deliverable:
      'A local `.fsx` using FParsec that parses arithmetic expressions (`+`, `-`, `*`, `/`, parentheses) into an AST DU and evaluates them. Must correctly evaluate `"(3 + 4) * 2"` to `14`.',
    checks: [
      {
        kind: 'mcq',
        id: 'fsharp-8-mcq-1',
        prompt:
          'In FParsec, what does the `<|>` operator do?',
        options: [
          'Sequences two parsers — runs both and returns a tuple',
          'Tries the left parser; if it fails **without consuming input**, tries the right parser',
          'Runs parsers in parallel on separate threads',
          'Applies the left parser as a predicate to filter results of the right parser',
        ],
        correctIndex: 1,
        explanation:
          '`<|>` is the choice combinator. It attempts the left parser; if it fails without consuming any input (backtracking is safe), it tries the right parser. Use `attempt` to enable backtracking after partial consumption.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-8-mcq-2',
        prompt:
          'Which FParsec combinator parses zero or more occurrences of `p` and returns a list?',
        options: [
          '`many p`',
          '`repeat p`',
          '`kleene p`',
          '`opt p`',
        ],
        correctIndex: 0,
        explanation:
          '`many p` applies `p` repeatedly until it fails and returns all results as an `\'a list`. `many1 p` requires at least one success. `opt p` returns `\'a option` for exactly zero or one occurrence.',
      },
      {
        kind: 'code',
        id: 'fsharp-8-code-1',
        prompt:
          'In a local terminal, create `parser-demo.fsx` with the starter code and run with `dotnet fsi parser-demo.fsx`. Expected output:\n```\n14\n7\n```\nConfirm both lines match, then mark as reviewed.',
        starterCode: `#r "nuget: FParsec, 1.1.1"
open FParsec

type Expr =
    | Num of float
    | Add of Expr * Expr
    | Mul of Expr * Expr

// Forward reference for recursive grammar
let expr, exprRef = createParserForwardedToRef<Expr, unit>()

let numExpr = pfloat |>> Num

let parenExpr = between (pchar '(' .>> spaces) (pchar ')') (spaces >>. expr)

let atom = (spaces >>. (numExpr <|> parenExpr) .>> spaces)

let mulExpr =
    chainl1 atom (pchar '*' >>% (fun a b -> Mul(a, b)) .>> spaces)

let addExpr =
    chainl1 mulExpr (pchar '+' >>% (fun a b -> Add(a, b)) .>> spaces)

do exprRef.Value <- addExpr

let rec eval = function
    | Num n      -> n
    | Add(a, b)  -> eval a + eval b
    | Mul(a, b)  -> eval a * eval b

let run input =
    match run expr input with
    | Success(ast, _, _) -> printfn "%g" (eval ast)
    | Failure(msg, _, _) -> printfn "Parse error: %s" msg

run "(3 + 4) * 2"
run "3 + 4"`,
        hint: 'FParsec 1.1.1 targets net6+. If `dotnet fsi` complains about targets, add `--langversion:preview` or use a `.fsproj` project instead. The `chainl1` combinator handles left-associative binary operators.',
      },
    ],
  },

  {
    id: 'fsharp-9',
    language: 'fsharp',
    level: 9,
    title: 'Concurrency — MailboxProcessor & Channels',
    timeEstimate: '7-9 hours',
    intro: `F# has first-class support for the **actor model** through \`MailboxProcessor<'Msg>\` (also called \`Agent\`). Each agent owns its own message queue; other agents or threads post messages to it. Because message processing is sequential within an agent, you avoid shared-state concurrency bugs without locks.\n\nThis phase covers building agents that accumulate state, routing messages between agents, and the relationship with .NET \`System.Threading.Channels\` for high-throughput pipelines. We also touch on Akka.NET's F# API (\`Akka.FSharp\`) for distributed actor systems.`,
    topics: [
      {
        label: 'MailboxProcessor (learn.microsoft.com)',
        url: 'https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/mailbox-processor',
      },
      {
        label: 'Async Workflows',
        url: 'https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/async-expressions',
      },
      {
        label: 'System.Threading.Channels',
        url: 'https://learn.microsoft.com/en-us/dotnet/core/extensions/channels',
      },
      {
        label: 'Akka.NET F# API',
        url: 'https://getakka.net/articles/languages/fsharp.html',
      },
      {
        label: 'MailboxProcessor patterns (fsharpforfunandprofit.com)',
        url: 'https://fsharpforfunandprofit.com/posts/concurrency-actor-model/',
      },
    ],
    deliverable:
      'A local `.fsx` containing a `MailboxProcessor` counter agent that accepts `Increment`, `Decrement`, and `GetCount` (with reply channel) messages, plus a test that posts 100 increments from multiple async workflows and reads back the final count.',
    checks: [
      {
        kind: 'mcq',
        id: 'fsharp-9-mcq-1',
        prompt:
          'Why does `MailboxProcessor` avoid the need for locks around shared state?',
        options: [
          'It uses software transactional memory (STM) internally',
          'Messages are processed **one at a time** by the agent loop — state mutations happen sequentially even when posted from multiple threads',
          'It copies all state on every message to prevent sharing',
          'The F# runtime automatically serialises access to any `mutable` value',
        ],
        correctIndex: 1,
        explanation:
          'The agent\'s `receive` loop is single-threaded: it blocks waiting for the next message and processes it fully before dequeuing the next one. Concurrent producers can post simultaneously, but the consumer processes messages one at a time, so state is never accessed by two threads concurrently.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-9-mcq-2',
        prompt:
          'What is `AsyncReplyChannel<\'T>` used for in a `MailboxProcessor` message type?',
        options: [
          'To broadcast a message to all registered agents',
          'To allow the **caller** to receive a typed reply from the agent asynchronously via `PostAndReply` or `PostAndAsyncReply`',
          'To schedule a message for delivery after a timeout',
          'To pipe the agent\'s output to a .NET `Channel`',
        ],
        correctIndex: 1,
        explanation:
          'Including `AsyncReplyChannel<\'T>` in a message case lets external code call `agent.PostAndAsyncReply(fun ch -> GetCount ch)` and `await` the response. The agent calls `channel.Reply(value)` to send the answer back.',
      },
      {
        kind: 'code',
        id: 'fsharp-9-code-1',
        prompt:
          'Paste into [fable.io/repl](https://fable.io/repl) and run. Expected output:\n```\nCount: 10\n```\nNote: Fable compiles to JS so true multi-threading is not demonstrated here — for real concurrency test on local `dotnet fsi`. Confirm the output matches, then mark as reviewed.',
        starterCode: `type Msg =
    | Increment
    | GetCount of AsyncReplyChannel<int>

let counter = MailboxProcessor.Start(fun inbox ->
    let rec loop count = async {
        let! msg = inbox.Receive()
        match msg with
        | Increment        -> return! loop (count + 1)
        | GetCount channel ->
            channel.Reply(count)
            return! loop count
    }
    loop 0)

// Post 10 increments
for _ in 1 .. 10 do
    counter.Post(Increment)

// Retrieve and print count
let count = counter.PostAndReply(GetCount)
printfn "Count: %d" count`,
        hint: '`PostAndReply` is synchronous — it blocks until the agent calls `channel.Reply`. In a real app prefer `PostAndAsyncReply` inside an `async { }` block.',
      },
    ],
  },

  {
    id: 'fsharp-10',
    language: 'fsharp',
    level: 10,
    title: 'Domain Modeling, DDD & Fable Full-Stack',
    timeEstimate: '10-14 hours',
    intro: `Scott Wlaschin's *Domain Modeling Made Functional* demonstrates how F#'s type system encodes business rules so that **illegal states are unrepresentable**. A \`NonEmptyString\` is a different type than \`string\`; an \`Order\` in state \`Confirmed\` carries different data than one in state \`Pending\`. This phase covers constrained primitive types, state machines as DUs, total functions, and the workflow composition pattern.\n\n**Fable** compiles F# to JavaScript, enabling true full-stack F# with shared domain types between server (Saturn/Giraffe) and client (React via Feliz, or Elmish architecture). We also touch on **performance tuning** with \`ValueType\` structs, \`Span<T>\` interop, and \`inline\` functions.`,
    topics: [
      {
        label: 'Domain Modeling Made Functional (book site)',
        url: 'https://pragprog.com/titles/swdddf/domain-modeling-made-functional/',
      },
      {
        label: 'Making Illegal States Unrepresentable (fsharpforfunandprofit.com)',
        url: 'https://fsharpforfunandprofit.com/posts/designing-with-types-making-illegal-states-unrepresentable/',
      },
      {
        label: 'Fable — F# to JavaScript',
        url: 'https://fable.io',
      },
      {
        label: 'Elmish Architecture',
        url: 'https://elmish.github.io/elmish/',
      },
      {
        label: 'Feliz React bindings',
        url: 'https://zaid-ajaj.github.io/Feliz/',
      },
      {
        label: 'F# Performance & Structs',
        url: 'https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/structs',
      },
    ],
    deliverable:
      'An F# module that models an e-commerce order lifecycle using constrained types (`NonEmptyString`, `PositiveDecimal`) and a DU state machine (`OrderState = Pending | Confirmed | Shipped | Cancelled`), with transition functions that return `Result<OrderState, string>` and reject invalid transitions at the type level.',
    checks: [
      {
        kind: 'mcq',
        id: 'fsharp-10-mcq-1',
        prompt:
          'In DDD F# style, you have `type EmailAddress = private EmailAddress of string`. What does the `private` on the case constructor achieve?',
        options: [
          'It hides the type entirely — external modules cannot reference `EmailAddress`',
          'It prevents external code from constructing `EmailAddress` directly — callers must use a smart constructor that validates the string',
          'It marks the value as mutable within the module only',
          'It makes the type invisible to the F# type provider',
        ],
        correctIndex: 1,
        explanation:
          'Making the DU case constructor `private` means only code within the same file/module can call `EmailAddress "foo@bar.com"` directly. External callers must use a function like `EmailAddress.create : string -> Result<EmailAddress, string>` that validates the input first.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-10-mcq-2',
        prompt:
          'In the Elmish architecture (used with Fable), what is the role of the `update` function?',
        options: [
          'It mutates the model in-place when a message arrives',
          'It is a pure function `(Msg, Model) -> Model * Cmd<Msg>` that returns the next model and any side-effect commands',
          'It subscribes to browser events and posts messages to a mailbox',
          'It renders the virtual DOM from the current model',
        ],
        correctIndex: 1,
        explanation:
          '`update msg model` is a pure reducer: given the current model and an incoming message, it computes the next model and optionally a `Cmd` that triggers further effects (HTTP calls, timeouts). The runtime applies it and re-renders via `view`.',
      },
      {
        kind: 'code',
        id: 'fsharp-10-code-1',
        prompt:
          'Paste into [fable.io/repl](https://fable.io/repl) and run. Expected output:\n```\nOk Confirmed\nError "cannot confirm a cancelled order"\nOk Shipped\n```\nConfirm all three lines match, then mark as reviewed.',
        starterCode: `// Constrained type — only valid positive decimals
type PositiveDecimal = private PositiveDecimal of decimal
module PositiveDecimal =
    let create (v: decimal) =
        if v > 0m then Ok (PositiveDecimal v)
        else Error "must be positive"
    let value (PositiveDecimal v) = v

// Order state machine
type OrderState =
    | Pending
    | Confirmed
    | Shipped
    | Cancelled

type TransitionError = string

let confirm = function
    | Pending   -> Ok Confirmed
    | Cancelled -> Error "cannot confirm a cancelled order"
    | other     -> Error (sprintf "cannot confirm from state %A" other)

let ship = function
    | Confirmed -> Ok Shipped
    | other     -> Error (sprintf "cannot ship from state %A" other)

// Exercise the state machine
printfn "%A" (confirm Pending)
printfn "%A" (confirm Cancelled)

match confirm Pending with
| Ok s  -> printfn "%A" (ship s)
| Error e -> printfn "Error %s" e`,
        hint: 'The third line chains `confirm` then `ship`. If you see `Ok (Ok Shipped)` you may have used `Result.map` instead of direct match — the starter code uses a plain `match` to keep it readable.',
      },
    ],
  },
];
