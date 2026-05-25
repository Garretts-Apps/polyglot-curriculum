import type { Phase } from './types';

export const fsharpPhases: Phase[] = [
  {
    id: 'fsharp-1',
    language: 'fsharp',
    level: 1,
    title: 'F# Fundamentals — let, Inference, Pipelines',
    timeEstimate: '4-6 hours',
    intro: `By the end of this phase, you'll read everyday F# fluently — \`let\` bindings, type inference, curried function signatures like \`int -> int -> int\`, and pipelines built from \`|>\` and \`List.map\`/\`filter\`/\`sum\`. You'll predict pipeline output without running it, and tell at a glance whether \`add 5\` is a partial application or a full call. To build the muscle, you'll write \`greet.fsx\` locally with \`dotnet fsi\` — install the .NET SDK from [dotnet.microsoft.com/download](https://dotnet.microsoft.com/download) and run \`dotnet fsi greet.fsx -- Ada\` to see your first F# program in action.`,
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
      'Build locally: a `greet.fsx` script that takes a name argument and prints a greeting + timestamp.',
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
          '`let` bindings in F# are immutable by default. To allow mutation you must explicitly write `let mutable x = 42`. See learn.microsoft.com/fsharp let bindings reference.',
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
        kind: 'mcq',
        id: 'fsharp-1-mcq-3',
        prompt:
          'What does this F# script print?\n```fsharp\nlet numbers = [1; 2; 3; 4; 5]\nlet result =\n    numbers\n    |> List.map (fun x -> x * x)\n    |> List.filter (fun x -> x > 10)\n    |> List.sum\nprintfn "%d" result\n```',
        options: [
          '`15`  (sum of `[1;2;3;4;5]`)',
          '`55`  (sum of squares `[1;4;9;16;25]`)',
          '`41`  (sum of squares > 10, i.e. `16 + 25`)',
          '`[16; 25]`',
        ],
        correctIndex: 2,
        explanation:
          'The pipeline squares each value to `[1;4;9;16;25]`, keeps only `[16;25]` (values > 10), and `List.sum` returns `41`. See fsharpforfunandprofit.com on pipelines.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-1-mcq-4',
        prompt:
          'Given `let add x y = x + y`, what type does the F# compiler infer?',
        options: [
          '`int * int -> int` (takes a tuple)',
          '`int -> int -> int` (curried, two arguments)',
          '`obj -> obj -> obj` (generic object)',
          '`unit -> int`',
        ],
        correctIndex: 1,
        explanation:
          'F# functions are curried by default. `add` has type `int -> int -> int`: a function taking an `int` and returning a function from `int` to `int`. The compiler picks `int` because `+` defaults to `int` when no other constraint is present.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-1-mcq-5',
        prompt:
          'What does this F# program print when run via `dotnet fsi`?\n```fsharp\nlet greet name =\n    sprintf "Hello, %s!" name\n\nlet names = ["Ada"; "Grace"; "Linus"]\nnames\n|> List.map greet\n|> List.iter (printfn "%s")\n```',
        options: [
          '`Hello, Ada!`, `Hello, Grace!`, `Hello, Linus!` on three separate lines',
          '`Hello, Ada! Hello, Grace! Hello, Linus!` on one line',
          'A single line `["Hello, Ada!"; "Hello, Grace!"; "Hello, Linus!"]`',
          'Compilation error: `sprintf` is not curried',
        ],
        correctIndex: 0,
        explanation:
          '`List.map greet` produces a list of three formatted strings; `List.iter (printfn "%s")` prints each on its own line because `printfn` appends a newline. `sprintf` is fully curried — `sprintf "Hello, %s!"` is a function `string -> string`.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-1-mcq-6',
        prompt:
          'Which statement about F# `let` bindings inside a function body is true?',
        options: [
          'They are hoisted to module scope at runtime',
          'They are lexically scoped — the binding is visible only from its declaration to the end of the enclosing block',
          'They are dynamically scoped — visible to any function called from inside',
          'They behave like JavaScript `var` and leak out of `if`/`for` blocks',
        ],
        correctIndex: 1,
        explanation:
          'F# uses lexical scoping with indentation-defined blocks. A `let` binding is visible from the point of declaration until the indentation level drops below the enclosing scope. See learn.microsoft.com/fsharp on let bindings.',
      },
    ],
  },

  {
    id: 'fsharp-2',
    language: 'fsharp',
    level: 2,
    title: 'Records, Discriminated Unions & Pattern Matching',
    timeEstimate: '5-7 hours',
    intro: `By the end of this phase, you'll read F# domain models the way real codebases write them — records with copy-and-update (\`{ user with Age = 31 }\`), discriminated unions for finite states (\`type OrderState = Pending | Confirmed | Shipped\`), and \`match\` expressions that the compiler exhaustively checks. You'll also know when \`Option.map\` is wrong and you need \`Option.bind\` (functor vs monad in practice). To build the muscle, you'll write a \`wordcount\` console app locally with \`dotnet new console -lang F#\`, using \`Seq.groupBy\` + \`Map\` and sorting descending by count.`,
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
      'Build locally: a `wordcount` console app using `Seq.groupBy` and `Map`, sorted descending by count.',
    checks: [
      {
        kind: 'mcq',
        id: 'fsharp-2-mcq-1',
        prompt:
          'Given `type Color = Red | Green | Blue`, what does the compiler do if your `match` expression only handles `Red` and `Green`?',
        options: [
          'Throws a runtime exception when `Blue` is encountered with no warning',
          'Silently ignores unhandled cases',
          'Emits a compile-time **incomplete pattern match** warning (or error with warnings-as-errors)',
          'Returns the default value of the type',
        ],
        correctIndex: 2,
        explanation:
          'F# exhaustiveness checking happens at compile time. The compiler warns (or errors) when a DU case is not covered. See learn.microsoft.com/fsharp pattern matching reference.',
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
        kind: 'mcq',
        id: 'fsharp-2-mcq-3',
        prompt:
          'What does this F# program print?\n```fsharp\ntype Shape =\n    | Circle of radius: float\n    | Rectangle of width: float * height: float\n\nlet area shape =\n    match shape with\n    | Circle r       -> System.Math.PI * r * r\n    | Rectangle(w,h) -> w * h\n\nprintfn "%.2f" (area (Rectangle(4.0, 3.0)))\n```',
        options: [
          '`7.00`',
          '`12.00`',
          '`12`',
          'Compile error: missing case for `Triangle`',
        ],
        correctIndex: 1,
        explanation:
          '`area (Rectangle(4.0, 3.0))` matches the `Rectangle(w,h)` case and returns `4.0 * 3.0 = 12.0`, formatted with `%.2f` as `12.00`. Because `Shape` only has `Circle` and `Rectangle` cases here, the match is exhaustive.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-2-mcq-4',
        prompt:
          'Which DU case is reached when this F# program runs?\n```fsharp\ntype Result =\n    | Found of int\n    | NotFound\n    | Invalid of string\n\nlet lookup key =\n    match key with\n    | k when k < 0  -> Invalid "negative key"\n    | 0             -> NotFound\n    | k             -> Found (k * 10)\n\nprintfn "%A" (lookup 0)\n```',
        options: [
          '`Found 0`',
          '`NotFound`',
          '`Invalid "zero key"`',
          'Compile error: cannot mix literal and variable patterns',
        ],
        correctIndex: 1,
        explanation:
          'The literal pattern `0` matches before the variable pattern `k`, so `lookup 0` returns `NotFound`. F# evaluates match clauses top-down and the first matching pattern wins. See learn.microsoft.com/fsharp pattern matching.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-2-mcq-5',
        prompt:
          'What does this F# program print?\n```fsharp\ntype Person = { Name: string; Age: int }\n\nlet ada = { Name = "Ada"; Age = 36 }\nlet older = { ada with Age = ada.Age + 1 }\n\nprintfn "%s is %d, was %d" ada.Name older.Age ada.Age\n```',
        options: [
          '`Ada is 36, was 37`',
          '`Ada is 37, was 36`',
          '`Ada is 37, was 37` — records are mutable',
          'Compile error: `with` only works on classes',
        ],
        correctIndex: 1,
        explanation:
          'Records are immutable. `{ ada with Age = ada.Age + 1 }` produces a new value `older` with `Age = 37`, leaving the original `ada` unchanged with `Age = 36`. See fsharpforfunandprofit.com on records.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-2-mcq-6',
        prompt:
          'Which Option combinator pattern is correct for chaining two lookups where the second depends on the first?',
        options: [
          '`firstLookup |> Option.map secondLookup` (when `secondLookup : string -> Option<int>`)',
          '`firstLookup |> Option.bind secondLookup` (when `secondLookup : string -> Option<int>`)',
          '`firstLookup |> Option.filter secondLookup`',
          '`firstLookup |> Option.iter secondLookup`',
        ],
        correctIndex: 1,
        explanation:
          '`Option.bind : (\'a -> Option<\'b>) -> Option<\'a> -> Option<\'b>` flattens nested options. Using `Option.map` here would yield `Option<Option<int>>`. `bind` is the monadic combinator for chaining fallible lookups.',
      },
    ],
  },

  {
    id: 'fsharp-3',
    language: 'fsharp',
    level: 3,
    title: 'Modules, Namespaces, Classes & IO',
    timeEstimate: '5-7 hours',
    intro: `By the end of this phase, you'll read multi-file F# projects the way they ship — \`module\` and \`namespace\` declarations, \`open\` directives, \`[<RequireQualifiedAccess>]\` modules, and \`try/with | :? System.IOException as ex ->\` blocks that turn .NET exceptions into \`Result\` values. You'll know when F# code is calling a C#-style class member vs a curried module function. To build the muscle, you'll write a \`wordstats\` console app locally with \`dotnet new console -lang F#\` — it reads a text file via \`System.IO\`, exposes helpers from a \`StringUtils\` module, and converts \`FileNotFoundException\` into a typed error.`,
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
      'Build locally: a `wordstats` console app that reads a text file, uses a `StringUtils` module of helpers, catches `System.IO.FileNotFoundException`, and prints per-line statistics.',
    checks: [
      {
        kind: 'mcq',
        id: 'fsharp-3-mcq-1',
        prompt:
          'What does this F# pipeline print, and why?\n```fsharp\nlet subtract a b = a - b\nlet result = 10 |> subtract 3\nprintfn "%d" result\n```',
        options: [
          '`7`  — the pipe passes `10` as the first argument of `subtract`',
          '`-7` — the pipe passes `10` as the *last* argument, so this is `subtract 3 10` = `3 - 10`',
          'Compile error: `subtract` is not curried',
          '`13`',
        ],
        correctIndex: 1,
        explanation:
          '`x |> f a` desugars to `f a x`, threading `x` as the **final** argument. So `10 |> subtract 3` is `subtract 3 10 = 3 - 10 = -7`. This is the classic pitfall when piping into multi-arg functions — argument order matters. Use a lambda (`fun x -> subtract x 3`) or flip your function definition when this bites.',
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
        kind: 'mcq',
        id: 'fsharp-3-mcq-3',
        prompt:
          'What does this F# program print?\n```fsharp\nmodule StringUtils =\n    let capitalize (s: string) =\n        if System.String.IsNullOrEmpty(s) then s\n        else System.Char.ToUpper(s.[0]).ToString() + s.[1..].ToLower()\n\n    let titleCase (sentence: string) =\n        sentence.Split(\' \')\n        |> Array.map capitalize\n        |> String.concat " "\n\nopen StringUtils\nprintfn "%s" (titleCase "HELLO fsharp world")\n```',
        options: [
          '`HELLO fsharp world`',
          '`Hello Fsharp World`',
          '`hello fsharp world`',
          '`HELLO FSHARP WORLD`',
        ],
        correctIndex: 1,
        explanation:
          '`capitalize` upper-cases the first character and lower-cases the rest. `titleCase` splits on spaces, capitalises each word, and rejoins. Result: `Hello Fsharp World`.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-3-mcq-4',
        prompt:
          'What does this F# program print?\n```fsharp\nlet tryParseInt (s: string) =\n    try\n        Ok(int s)\n    with\n    | :? System.FormatException -> Error "not a number"\n\nmatch tryParseInt "abc" with\n| Ok n    -> printfn "Parsed: %d" n\n| Error e -> printfn "Error: %s" e\n```',
        options: [
          '`Parsed: 0`',
          '`Error: not a number`',
          '`Parsed: NaN`',
          'Unhandled `FormatException` crashes the program',
        ],
        correctIndex: 1,
        explanation:
          '`int "abc"` throws `System.FormatException`, which is caught by the typed pattern `:? System.FormatException` and converted to `Error "not a number"`. The `match` then prints the error branch.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-3-mcq-5',
        prompt:
          'In F#, what does `[<RequireQualifiedAccess>]` on a module do?',
        options: [
          'Makes the module internal to the assembly',
          'Forces callers to write `ModuleName.func` — `open ModuleName` no longer lets you call `func` unqualified',
          'Restricts the module to a single thread',
          'Marks the module for ahead-of-time compilation',
        ],
        correctIndex: 1,
        explanation:
          '`[<RequireQualifiedAccess>]` prevents the names inside the module from being brought into scope by `open`. Callers must qualify each call (e.g. `Map.find`, `List.head`). This is the convention for the F# core library to avoid name collisions.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-3-mcq-6',
        prompt:
          'Which idiomatic F# pattern correctly reads a file and returns `Result<string list, string>`?',
        options: [
          '`try File.ReadAllLines path |> Array.toList |> Ok with ex -> Error ex.Message`',
          '`File.ReadAllLines path |> Ok` (exceptions are auto-wrapped)',
          '`Result.tryWith (File.ReadAllLines path)`',
          '`async { return! File.ReadAllLines path }`',
        ],
        correctIndex: 0,
        explanation:
          'Idiomatic F# wraps a throwing .NET API in `try/with` and converts the exception into an `Error` case. `File.ReadAllLines` returns `string[]`, so `Array.toList` produces the desired `string list`. Result-aware combinator libraries (FsToolkit) provide shortcuts, but the raw pattern is the foundation.',
      },
    ],
  },

  {
    id: 'fsharp-4',
    language: 'fsharp',
    level: 4,
    title: 'Generics, HOFs, Currying & Computation Expressions',
    timeEstimate: '6-8 hours',
    intro: `By the end of this phase, you'll read curried signatures and partial applications without flinching — \`add 5\` returning \`int -> int\`, \`greet "Hello"\` baking a prefix into a \`string -> string\`, and \`List.map (sprintf "id=%d")\` projecting through a partially-applied formatter. You'll also read \`result { let! x = ... }\` and \`async { let! y = ... }\` computation expressions and predict whether they short-circuit, plus tell at a glance why \`float<m> + float<ft>\` is a compile error. To build the muscle, you'll write a \`notes\` CLI locally with \`dotnet new console -lang F#\`, using DUs for commands, partial application for handlers, and \`System.Text.Json\` for persistence.`,
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
      'Build locally: a `notes` CLI using DUs for commands, partial application for handlers, and `System.Text.Json` for persistence.',
    checks: [
      {
        kind: 'mcq',
        id: 'fsharp-4-mcq-1',
        prompt:
          'What is the inferred type of `addFive` here?\n```fsharp\nlet add x y = x + y\nlet addFive = add 5\n```',
        options: [
          '`int -> int -> int` — `addFive` is the same as `add`',
          '`int -> int` — `addFive` is a function waiting for one more `int` argument',
          '`unit -> int` — calling `addFive()` returns 5',
          '`int` — partial application evaluates immediately',
        ],
        correctIndex: 1,
        explanation:
          '`add 5` partially applies `add` with `x = 5`, returning a new function of type `int -> int`. This is currying: every multi-argument function in F# is a chain of single-argument functions. See fsharpforfunandprofit.com on partial application.',
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
          '`let!` is the monadic bind inside a CE. For `Result`, it extracts the `Ok` value or immediately propagates the `Error`, allowing you to chain fallible operations in a sequential style. See learn.microsoft.com/fsharp computation expressions reference.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-4-mcq-3',
        prompt:
          'What does this F# program print?\n```fsharp\nlet isEven x = x % 2 = 0\nlet evens = List.filter isEven [1..6]\nprintfn "%A" evens\n```',
        options: [
          '`[1; 3; 5]`',
          '`[2; 4; 6]`',
          '`[1; 2; 3; 4; 5; 6]`',
          '`[]`',
        ],
        correctIndex: 1,
        explanation:
          '`List.filter` keeps elements where the predicate is true. `[1..6]` is the inclusive range `[1;2;3;4;5;6]`, and the even ones are `[2;4;6]`. `%A` is the generic formatter.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-4-mcq-4',
        prompt:
          'What does this F# program print?\n```fsharp\nlet greet greeting name = sprintf "%s, %s!" greeting name\nlet hello = greet "Hello"\nlet result = ["Ada"; "Bob"] |> List.map hello\nprintfn "%A" result\n```',
        options: [
          '`["Hello, Ada!"; "Hello, Bob!"]`',
          '`["Ada, Hello!"; "Bob, Hello!"]`',
          '`["Hello"; "Hello"]`',
          'Compile error: `hello` has the wrong arity',
        ],
        correctIndex: 0,
        explanation:
          '`greet "Hello"` is partial application: it fixes `greeting = "Hello"` and returns a function `string -> string`. `List.map hello` applies it to each name, producing the formatted strings.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-4-mcq-5',
        prompt:
          'What does this F# program print?\n```fsharp\nlet users = Map.ofList [("ada", "Ada"); ("bob", "Bob")]\n\nlet lookupAndGreet key =\n    Map.tryFind key users\n    |> Option.map (fun name -> sprintf "Hello, %s" name)\n    |> Option.defaultValue "unknown user"\n\nprintfn "%s | %s" (lookupAndGreet "ada") (lookupAndGreet "x")\n```',
        options: [
          '`Hello, Ada | Hello, x`',
          '`Hello, Ada | unknown user`',
          '`Ada | x`',
          '`Some "Hello, Ada" | None`',
        ],
        correctIndex: 1,
        explanation:
          '`Map.tryFind` returns `Option<string>`. `Option.map` transforms the inner value when `Some`. `Option.defaultValue` provides the fallback for `None`. The known key yields `Hello, Ada`; the missing key yields `unknown user`.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-4-mcq-6',
        prompt:
          'What does the following units-of-measure code do?\n```fsharp\n[<Measure>] type m\n[<Measure>] type ft\n\nlet distance = 100.0<m>\nlet altitude = 50.0<ft>\nlet total = distance + altitude\n```',
        options: [
          'Compiles cleanly: F# auto-converts feet to metres',
          'Compiles, but the result has unit `m*ft`',
          'Compile error: `m` and `ft` are different units of measure and cannot be added',
          'Runtime exception: `UnitMismatchException`',
        ],
        correctIndex: 2,
        explanation:
          'Units of measure are checked statically. Adding `float<m>` to `float<ft>` is a compile-time error. You must explicitly convert via a conversion factor, e.g. `altitude * 0.3048<m/ft>`. See learn.microsoft.com/fsharp units of measure.',
      },
    ],
  },

  {
    id: 'fsharp-5',
    language: 'fsharp',
    level: 5,
    title: 'Type Providers — JSON, CSV & SQL',
    timeEstimate: '6-8 hours',
    intro: `By the end of this phase, you'll read F# scripts that use **type providers** — \`JsonProvider<"sample.json">\`, \`CsvProvider<"data.csv">\`, \`SQLProvider<connectionString>\` — and predict the strongly-typed properties they expose at compile time without runtime reflection. You'll know when to prefer a provider over a hand-written DTO, and which trade-offs (compile-time sample dependency, design-time tooling cost on huge schemas) come with the convenience. To build the muscle, you'll write a CSV report tool locally with \`dotnet fsi report.fsx\` — reference the package via \`#r "nuget: FSharp.Data, 6.4.0"\` and pipe \`CsvProvider\` rows through \`Seq.sortByDescending\` and \`Seq.truncate\`.`,
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
      'Build locally: a CSV report tool using `FSharp.Data.CsvProvider` to load + transform + emit a summary.',
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
          'Type providers run inside the F# compiler. `JsonProvider<"sample.json">` reads the sample at compile time, infers a structural type, and makes its fields available as strongly-typed properties — giving you IntelliSense and compile-time safety over JSON. See fsprojects.github.io/FSharp.Data/library/JsonProvider.html.',
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
        kind: 'mcq',
        id: 'fsharp-5-mcq-3',
        prompt:
          'What does this `.fsx` script print when run with `dotnet fsi`?\n```fsharp\n#r "nuget: FSharp.Data, 6.4.0"\nopen FSharp.Data\n\ntype Students = JsonProvider<"""\n[ {"name": "Ada", "score": 92},\n  {"name": "Bob", "score": 74},\n  {"name": "Eve", "score": 88} ]""">\n\nStudents.GetSamples()\n|> Array.filter (fun s -> s.Score >= 88)\n|> Array.iter (fun s -> printfn "%s: %d" s.Name s.Score)\n```',
        options: [
          '`Ada: 92` then `Bob: 74` then `Eve: 88`',
          '`Ada: 92` then `Eve: 88`',
          '`Ada` then `Eve`',
          'Nothing — `JsonProvider` requires a file path, not an inline literal',
        ],
        correctIndex: 1,
        explanation:
          'JsonProvider supports inline samples via triple-quoted strings. The filter keeps `Score >= 88`, leaving Ada (92) and Eve (88). `Array.iter` prints each in order.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-5-mcq-4',
        prompt:
          'For a CSV with header `Country,Population` where the first data row has `Population = 331002651`, what type does `CsvProvider` infer for the `Population` column?',
        options: [
          '`string` — CSV values are always strings',
          '`int` (or `int64` if values exceed `Int32.MaxValue`) — the provider infers numeric columns',
          '`obj` — the provider is dynamic',
          'No type — you must explicitly cast every cell',
        ],
        correctIndex: 1,
        explanation:
          'CsvProvider infers column types by scanning sample rows. Whole-number columns become `int`, or `int64` if any value exceeds `Int32.MaxValue`. Decimals become `decimal` (configurable). See FSharp.Data CsvProvider docs.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-5-mcq-5',
        prompt:
          'Which combinator pattern correctly transforms a `CsvProvider` row collection into the top 3 rows by `Score` descending?',
        options: [
          '`rows |> Seq.sortByDescending (fun r -> r.Score) |> Seq.truncate 3`',
          '`rows |> Seq.sortBy (fun r -> r.Score) |> Seq.take 3`',
          '`rows |> Seq.filter (fun r -> r.Score = 3)`',
          '`rows |> Array.top 3 "Score"`',
        ],
        correctIndex: 0,
        explanation:
          '`Seq.sortByDescending` orders by the projected key in descending order; `Seq.truncate` takes up to N elements without throwing if there are fewer. `Seq.take` would throw if the source has fewer than 3 items.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-5-mcq-6',
        prompt:
          'What is the main downside of type providers compared to hand-written DTOs?',
        options: [
          'They are slower at runtime because they use reflection on every access',
          'They require a representative sample at compile time and re-running the compiler when the schema changes — design-time tooling can be slow on huge schemas',
          'They only work with .NET Framework, not .NET 6+',
          'They cannot be used in script files',
        ],
        correctIndex: 1,
        explanation:
          'Type providers are a design-time feature: they run during compilation and may slow down editor responsiveness on very large schemas. They generate erased or generative types, so runtime access is just normal property access — no reflection cost. See learn.microsoft.com/fsharp type providers tutorial.',
      },
    ],
  },

  {
    id: 'fsharp-6',
    language: 'fsharp',
    level: 6,
    title: 'Authoring Computation Expressions',
    timeEstimate: '7-9 hours',
    intro: `By the end of this phase, you'll read CE-using F# code the way it appears in production — \`result { let! a = parseAge raw; let! b = parseEmail raw; return { Age = a; Email = b } }\` — and trace it to the underlying \`Bind\`/\`Return\` builder methods that drive it. You'll predict whether a hand-written CE short-circuits or accumulates, and recognise the \`>=>\` (Kleisli) composition pattern from *Railway Oriented Programming*. To build the muscle, you'll write a \`result { }\` computation expression locally with \`dotnet new console -lang F#\` — define a \`ResultBuilder\` with \`Bind\`/\`Return\` and a CLI demo that chains validations.`,
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
      'Build locally: a `result {}` computation expression for chained validations, with a CLI demo.',
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
          '`let! x = expr in body` desugars to `builder.Bind(expr, fun x -> body)`. This is the core monadic bind — it unwraps the value from the wrapper type and threads it through the continuation. See learn.microsoft.com/fsharp computation expressions reference.',
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
        kind: 'mcq',
        id: 'fsharp-6-mcq-3',
        prompt:
          'What does this F# program print?\n```fsharp\ntype ResultBuilder() =\n    member _.Bind(m, f) = match m with Ok v -> f v | Error e -> Error e\n    member _.Return(v) = Ok v\n\nlet result = ResultBuilder()\n\nlet validateAge a = if a > 0 then Ok a else Error "age must be positive"\nlet validateName (n: string) = if n.Length > 0 then Ok n else Error "name empty"\n\nlet processUser name age =\n    result {\n        let! n = validateName name\n        let! a = validateAge age\n        return a * n.Length\n    }\n\nprintfn "%A" (processUser "Alice" 6)\n```',
        options: [
          '`Ok 18`',
          '`Ok 30`',
          '`Error "age must be positive"`',
          '`Ok ("Alice", 6)`',
        ],
        correctIndex: 1,
        explanation:
          '`"Alice".Length = 5`, so `a * n.Length = 6 * 5 = 30`. Both validations succeed, so the CE returns `Ok 30`. The `Return` member wraps `30` as `Ok 30`.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-6-mcq-4',
        prompt:
          'What does this F# program print?\n```fsharp\ntype ResultBuilder() =\n    member _.Bind(m, f) = match m with Ok v -> f v | Error e -> Error e\n    member _.Return(v) = Ok v\n\nlet result = ResultBuilder()\nlet validateAge a = if a > 0 then Ok a else Error "age must be positive"\nlet validateName (n: string) = if n.Length > 0 then Ok n else Error "name empty"\n\nlet processUser name age =\n    result {\n        let! n = validateName name\n        let! a = validateAge age\n        return (n, a)\n    }\n\nprintfn "%A" (processUser "Bob" -1)\n```',
        options: [
          '`Ok ("Bob", -1)`',
          '`Error "name empty"`',
          '`Error "age must be positive"`',
          'Unhandled exception',
        ],
        correctIndex: 2,
        explanation:
          '`validateName "Bob"` returns `Ok "Bob"`, so `let! n` proceeds. `validateAge -1` returns `Error "age must be positive"`. The `Bind` method short-circuits: the entire CE evaluates to that `Error`.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-6-mcq-5',
        prompt:
          'What does the Kleisli composition operator `>=>` do for `Result`-returning functions?\n```fsharp\nlet (>=>) f g = fun x -> match f x with Ok v -> g v | Error e -> Error e\n```',
        options: [
          'Runs `f` and `g` in parallel and combines their results',
          'Composes `f : \'a -> Result<\'b, _>` with `g : \'b -> Result<\'c, _>` to give `\'a -> Result<\'c, _>`',
          'Filters the output of `f` using `g` as a predicate',
          'Catches exceptions from `f` and falls back to `g`',
        ],
        correctIndex: 1,
        explanation:
          'Kleisli composition (`>=>`) chains two monadic functions. For Result, the result of `f` is unwrapped (if `Ok`) and passed to `g`; an `Error` from either short-circuits the chain. See fsharpforfunandprofit.com on Railway Oriented Programming.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-6-mcq-6',
        prompt:
          'Inside a CE, what does the `Zero` member let you do?',
        options: [
          'Reset the builder state between expressions',
          'Allow `if ... then` without an `else` branch — `Zero` supplies the value for the missing branch',
          'Construct a default value for any type',
          'Combine two computations sequentially',
        ],
        correctIndex: 1,
        explanation:
          '`Zero` is required when a CE branch produces no value (e.g., a one-armed `if` or an empty `else`). For `option {}` it would typically be `None`; for `result {}` it is often left unimplemented because every branch must produce an explicit value.',
      },
    ],
  },

  {
    id: 'fsharp-7',
    language: 'fsharp',
    level: 7,
    title: 'Web with Giraffe & Saturn',
    timeEstimate: '8-10 hours',
    intro: `By the end of this phase, you'll read Giraffe and Saturn web code fluently — the \`HttpHandler\` signature \`HttpFunc -> HttpContext -> Task<HttpContext option>\`, the \`>=>\` fish composition for sequencing handlers, \`choose [...]\` for first-match routing, and Saturn's \`router { }\`/\`application { }\` computation expressions. You'll predict why a handler chain returns 404 vs 200 by reading the composition alone. To build the muscle, you'll write a Giraffe HTTP server locally with \`dotnet new web -lang F#\`, then add \`/todos\` endpoints with in-memory storage and JSON serialization via the built-in \`System.Text.Json\` integration — \`dotnet run\` serves it.`,
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
        url: 'https://saturnframework.org/docs.html',
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
      'Build locally: a Giraffe HTTP server with /todos endpoints, in-memory storage, JSON serialization.',
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
          '`h1 >=> h2` composes two Giraffe handlers. The second handler only runs if the first returned `Some ctx`. This allows pipeline-style middleware composition (auth check >=> route handler >=> response writer). See giraffe.wiki/docs/routing.',
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
          'Saturn\'s router CE exposes `get`, `post`, `put`, `delete`, etc. as direct keywords that bind a path pattern to a handler function. See saturnframework.org/docs.html.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-7-mcq-3',
        prompt:
          'What HTTP response does this Giraffe handler produce for `GET /greet/World`?\n```fsharp\nopen Giraffe\nopen Microsoft.AspNetCore.Http\n\nlet greetHandler (name: string) : HttpHandler =\n    fun (next: HttpFunc) (ctx: HttpContext) ->\n        let msg = {| message = sprintf "Hello, %s!" name |}\n        json msg next ctx\n\nlet webApp =\n    choose [\n        routef "/greet/%s" greetHandler\n    ]\n```',
        options: [
          '`text/plain` body `Hello, World!`',
          '`application/json` body `{"message":"Hello, World!"}`',
          'HTTP 404 — `routef` does not support string parameters',
          'HTTP 500 — anonymous records cannot be serialised',
        ],
        correctIndex: 1,
        explanation:
          '`routef "/greet/%s"` binds the URL segment to the handler\'s `name` parameter. `json` (Giraffe helper) serialises the anonymous record using the configured `IJsonSerializer` (System.Text.Json by default) and sets Content-Type to `application/json`.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-7-mcq-4',
        prompt:
          'In Giraffe, what is the signature of an `HttpHandler`?',
        options: [
          '`HttpRequest -> HttpResponse`',
          '`HttpFunc -> HttpContext -> Task<HttpContext option>`',
          '`HttpContext -> unit`',
          '`Request -> Response -> Task`',
        ],
        correctIndex: 1,
        explanation:
          'A Giraffe `HttpHandler` is `HttpFunc -> HttpContext -> Task<HttpContext option>`. Returning `Some ctx` continues the pipeline; returning `None` signals "this handler did not match — try the next branch in `choose`".',
      },
      {
        kind: 'mcq',
        id: 'fsharp-7-mcq-5',
        prompt:
          'What does the `choose` combinator do in Giraffe?',
        options: [
          'Runs all handlers in parallel and selects the fastest response',
          'Tries each handler in order; the first to return `Some ctx` wins, the rest are skipped',
          'Selects a handler based on a hash of the URL',
          'Randomly picks one handler from the list',
        ],
        correctIndex: 1,
        explanation:
          '`choose : HttpHandler list -> HttpHandler` builds a router that tries each handler sequentially. The first handler returning `Some` short-circuits; if all return `None`, the request falls through (typically to a 404).',
      },
      {
        kind: 'mcq',
        id: 'fsharp-7-mcq-6',
        prompt:
          'Which Saturn keyword is used to configure overall application services and middleware?',
        options: [
          '`application { }`',
          '`server { }`',
          '`startup { }`',
          '`host { }`',
        ],
        correctIndex: 0,
        explanation:
          'Saturn uses the `application { }` CE to configure the host, services, middleware, and router. It wraps `WebHost.CreateDefaultBuilder` and ASP.NET Core hosting configuration in F# style. See saturnframework.org/docs.html.',
      },
    ],
  },

  {
    id: 'fsharp-8',
    language: 'fsharp',
    level: 8,
    title: 'Parser Combinators with FParsec',
    timeEstimate: '8-10 hours',
    intro: `By the end of this phase, you'll read FParsec parser definitions and predict the language they accept — \`pchar 'a' >>. pchar 'b' <|> pchar 'c'\` accepts \`"ab"\` or \`"c"\`, \`chainl1 term op\` builds a left-associative chain, and \`createParserForwardedToRef\` enables recursive grammars with operator precedence. You'll know when you need \`attempt\` to enable backtracking after partial consumption. To build the muscle, you'll write an FParsec arithmetic expression parser locally with \`dotnet new console -lang F#\` + \`dotnet add package FParsec\`, exposing it as a CLI calculator that handles \`+\`, \`*\`, and parentheses.`,
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
      'Build locally: an FParsec parser for arithmetic expressions, with a CLI calculator.',
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
          '`<|>` is the choice combinator. It attempts the left parser; if it fails without consuming any input (backtracking is safe), it tries the right parser. Use `attempt` to enable backtracking after partial consumption. See quanttec.com/fparsec tutorial.',
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
        kind: 'mcq',
        id: 'fsharp-8-mcq-3',
        prompt:
          'What does this FParsec parser evaluate `"(3 + 4) * 2"` to?\n```fsharp\nopen FParsec\n\ntype Expr =\n    | Num of float\n    | Add of Expr * Expr\n    | Mul of Expr * Expr\n\nlet expr, exprRef = createParserForwardedToRef<Expr, unit>()\nlet numExpr = pfloat |>> Num\nlet parenExpr = between (pchar \'(\' .>> spaces) (pchar \')\') (spaces >>. expr)\nlet atom = (spaces >>. (numExpr <|> parenExpr) .>> spaces)\nlet mulExpr = chainl1 atom (pchar \'*\' >>% (fun a b -> Mul(a,b)) .>> spaces)\nlet addExpr = chainl1 mulExpr (pchar \'+\' >>% (fun a b -> Add(a,b)) .>> spaces)\ndo exprRef.Value <- addExpr\n\nlet rec eval = function\n    | Num n -> n\n    | Add(a,b) -> eval a + eval b\n    | Mul(a,b) -> eval a * eval b\n\nmatch run expr "(3 + 4) * 2" with\n| Success(ast, _, _) -> printfn "%g" (eval ast)\n| Failure(m, _, _) -> printfn "err: %s" m\n```',
        options: [
          '`14`',
          '`11`  (left-to-right ignoring parentheses)',
          '`7`',
          'Parse error: `chainl1` cannot handle parentheses',
        ],
        correctIndex: 0,
        explanation:
          '`mulExpr` has higher precedence than `addExpr` because `addExpr` is built from `mulExpr`-level operands. Parentheses are handled in `parenExpr` via `between`. So `(3 + 4) * 2 = 7 * 2 = 14`.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-8-mcq-4',
        prompt:
          'What does `chainl1` do in FParsec?',
        options: [
          'Parses one or more terms separated by an operator and combines them **left-associatively**',
          'Parses exactly one chain of three operators',
          'Parses terms in any order and returns them sorted',
          'Parses right-associative operators only (e.g., `^`)',
        ],
        correctIndex: 0,
        explanation:
          '`chainl1 term op` parses `term (op term)*` and combines with `op` left-associatively, so `1 - 2 - 3` parses as `(1 - 2) - 3`. For right-associative operators (`^`), use `chainr1`. See quanttec.com/fparsec/reference.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-8-mcq-5',
        prompt:
          'Which combinator in FParsec applies a function to the result of a parser, like `Functor.map`?',
        options: [
          '`>>=` (bind)',
          '`|>>`',
          '`>>.` (sequence, keep right)',
          '`.>>` (sequence, keep left)',
        ],
        correctIndex: 1,
        explanation:
          '`p |>> f` runs parser `p` and applies `f` to its result. In FParsec it is the functor map. `p >>= f` is monadic bind — `f` returns a parser. `>>.` and `.>>` sequence two parsers and keep only one side\'s result.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-8-mcq-6',
        prompt:
          'You write `let p = pchar \'a\' >>. pchar \'b\' <|> pchar \'c\'`. What input does `p` accept?',
        options: [
          '`"ab"` or `"c"`',
          'Only `"abc"`',
          '`"a"` followed by either `"b"` or `"c"`',
          '`"ab"` only — `<|>` is ignored after `>>.`',
        ],
        correctIndex: 0,
        explanation:
          'FParsec operator precedence groups this as `(pchar \'a\' >>. pchar \'b\') <|> pchar \'c\'`. So the parser accepts either the sequence `"ab"` (discarding the `\'a\'` and returning `\'b\'`) or the single character `"c"`. Use parentheses if you want different grouping.',
      },
    ],
  },

  {
    id: 'fsharp-9',
    language: 'fsharp',
    level: 9,
    title: 'Concurrency — MailboxProcessor & Channels',
    timeEstimate: '7-9 hours',
    intro: `By the end of this phase, you'll read F# concurrent code the way it ships — \`MailboxProcessor<Msg>\` agents with \`inbox.Receive()\` loops, \`AsyncReplyChannel<T>\` round-trips via \`PostAndAsyncReply\`, and the difference between cold \`async { }\` (must be started) and hot \`task { }\` (starts immediately, interops with C#). You'll predict whether \`PostAndReply\` deadlocks or returns the right count after a batch of \`Post\`s. To build the muscle, you'll write a MailboxProcessor-based agent pool locally with \`dotnet new console -lang F#\` — a CLI driver that fans out parallel HTTP downloads with bounded concurrency.`,
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
      'Build locally: a MailboxProcessor-based agent pool for parallel HTTP downloads, with a CLI driver.',
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
          'The agent\'s `receive` loop is single-threaded: it blocks waiting for the next message and processes it fully before dequeuing the next one. Concurrent producers can post simultaneously, but the consumer processes messages one at a time. See learn.microsoft.com/fsharp mailbox-processor.',
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
          'Including `AsyncReplyChannel<\'T>` in a message case lets external code call `agent.PostAndAsyncReply(fun ch -> GetCount ch)` and await the response. The agent calls `channel.Reply(value)` to send the answer back.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-9-mcq-3',
        prompt:
          'What does this F# program print?\n```fsharp\ntype Msg =\n    | Increment\n    | GetCount of AsyncReplyChannel<int>\n\nlet counter = MailboxProcessor.Start(fun inbox ->\n    let rec loop count = async {\n        let! msg = inbox.Receive()\n        match msg with\n        | Increment        -> return! loop (count + 1)\n        | GetCount channel ->\n            channel.Reply(count)\n            return! loop count\n    }\n    loop 0)\n\nfor _ in 1 .. 10 do counter.Post(Increment)\n\nlet count = counter.PostAndReply(GetCount)\nprintfn "Count: %d" count\n```',
        options: [
          '`Count: 0`  (messages processed asynchronously, no time to apply)',
          '`Count: 10`',
          '`Count: 1`  (only the last message wins)',
          'Deadlock — `PostAndReply` blocks forever',
        ],
        correctIndex: 1,
        explanation:
          'All `Post` calls are queued first. `PostAndReply` then enqueues `GetCount` and blocks until the agent processes it; by that time the agent has already handled all 10 `Increment` messages, so `count = 10`. The FIFO queue guarantees order.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-9-mcq-4',
        prompt:
          'What does this F# `async` workflow evaluate to?\n```fsharp\nlet work = async {\n    let! a = async { return 10 }\n    let! b = async { return 20 }\n    return a + b\n}\n\nprintfn "%d" (Async.RunSynchronously work)\n```',
        options: [
          '`30`',
          '`10`',
          '`20`',
          'Compile error: `async { return 10 }` is invalid',
        ],
        correctIndex: 0,
        explanation:
          '`async { return 10 }` is an `Async<int>` that yields `10`; `let!` awaits it. The block sequentially evaluates both children and returns their sum. `Async.RunSynchronously` drives the workflow to completion on the calling thread.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-9-mcq-5',
        prompt:
          'What is the key difference between F# `async { }` and `task { }`?',
        options: [
          '`async { }` is .NET-only; `task { }` is for Fable/JavaScript',
          '`async { }` is cold and explicit (must be started); `task { }` returns a hot `Task<T>` that starts immediately and integrates with C# async/await',
          'They are aliases for each other',
          '`task { }` cannot be awaited from another `task { }`',
        ],
        correctIndex: 1,
        explanation:
          '`async { }` produces a cold `Async<T>` — nothing runs until you call `Async.Start` or `Async.RunSynchronously`. `task { }` produces a `Task<T>` that begins executing immediately (hot), matching the C#/CLR `Task` semantics and useful for interop with libraries that expect `Task`. See learn.microsoft.com/fsharp async-expressions.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-9-mcq-6',
        prompt:
          'When should you prefer `System.Threading.Channels` over `MailboxProcessor`?',
        options: [
          'When you need very high throughput with bounded buffering and multiple producers/consumers — channels are heavily optimised and support backpressure',
          'When you need typed messages — `MailboxProcessor` is untyped',
          'When you need persistence — channels write to disk by default',
          'Never — `MailboxProcessor` always outperforms channels',
        ],
        correctIndex: 0,
        explanation:
          '`Channel<T>` from `System.Threading.Channels` provides bounded/unbounded MPSC/MPMC queues with backpressure, optimised for high-throughput pipelines. `MailboxProcessor` is a higher-level actor with a per-agent unbounded queue and is better when you want stateful sequential handlers.',
      },
    ],
  },

  {
    id: 'fsharp-10',
    language: 'fsharp',
    level: 10,
    title: 'Domain Modeling, DDD & Fable Full-Stack',
    timeEstimate: '10-14 hours',
    intro: `By the end of this phase, you'll read DDD-style F# the way Scott Wlaschin writes it — \`type EmailAddress = private EmailAddress of string\` with a smart constructor returning \`Result<EmailAddress, string>\`, state machines as DUs (\`Pending -> Confirmed -> Shipped\`), workflows typed as \`Input -> Async<Result<Output, DomainError>>\`, and \`Result.bind\` chains that short-circuit cleanly. You'll spot the difference between \`Result.map ship\` (returns nested \`Result<Result<_,_>,_>\`) and \`Result.bind ship\` (returns flat \`Result<_,_>\`). To build the muscle, you'll write a domain-modeling exercise locally with \`dotnet new console -lang F#\` — model an order/inventory invariant with DUs + records and a console-app driver that enforces illegal states are unrepresentable.`,
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
      'Build locally: a domain-modeling DDD exercise: model an order/inventory invariant with DUs + records, console-app driver.',
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
          'Making the DU case constructor `private` means only code within the same file/module can call `EmailAddress "foo@bar.com"` directly. External callers must use a function like `EmailAddress.create : string -> Result<EmailAddress, string>` that validates the input first. See fsharpforfunandprofit.com on designing with types.',
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
          '`update msg model` is a pure reducer: given the current model and an incoming message, it computes the next model and optionally a `Cmd` that triggers further effects (HTTP calls, timeouts). The runtime applies it and re-renders via `view`. See elmish.github.io/elmish.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-10-mcq-3',
        prompt:
          'What does this F# program print?\n```fsharp\ntype OrderState =\n    | Pending\n    | Confirmed\n    | Shipped\n    | Cancelled\n\nlet confirm = function\n    | Pending   -> Ok Confirmed\n    | Cancelled -> Error "cannot confirm a cancelled order"\n    | other     -> Error (sprintf "cannot confirm from state %A" other)\n\nlet ship = function\n    | Confirmed -> Ok Shipped\n    | other     -> Error (sprintf "cannot ship from state %A" other)\n\nmatch confirm Pending with\n| Ok s    -> printfn "%A" (ship s)\n| Error e -> printfn "Error %s" e\n```',
        options: [
          '`Ok Confirmed`',
          '`Ok Shipped`',
          '`Error "cannot ship from state Pending"`',
          '`Ok (Ok Shipped)`',
        ],
        correctIndex: 1,
        explanation:
          '`confirm Pending` returns `Ok Confirmed`. The `match` then calls `ship Confirmed`, which returns `Ok Shipped`. `printfn "%A"` prints it as `Ok Shipped`.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-10-mcq-4',
        prompt:
          'Which Result combinator pattern correctly chains `confirm : OrderState -> Result<OrderState, string>` then `ship : OrderState -> Result<OrderState, string>`?',
        options: [
          '`Pending |> confirm |> Result.map ship`  (returns `Result<Result<OrderState, string>, string>`)',
          '`Pending |> confirm |> Result.bind ship`  (returns `Result<OrderState, string>`)',
          '`Pending |> confirm |> Option.bind ship`',
          '`Result.both (confirm Pending) (ship Pending)`',
        ],
        correctIndex: 1,
        explanation:
          '`Result.bind : (\'a -> Result<\'b, _>) -> Result<\'a, _> -> Result<\'b, _>` flattens the nested result. `Result.map` would yield `Result<Result<_,_>,_>` — a tell-tale sign you needed `bind` instead.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-10-mcq-5',
        prompt:
          'Why are F# struct DUs (declared `[<Struct>] type Coord = ...`) useful for performance-sensitive code?',
        options: [
          'They are allocated on the stack and avoid GC pressure for short-lived values',
          'They run on the GPU automatically',
          'They are mutable by default',
          'They bypass type checking for faster compilation',
        ],
        correctIndex: 0,
        explanation:
          'Struct DUs are .NET value types: stack-allocated when used as locals or fields of structs, inlined into arrays, no GC allocation. Use them for small (≤ 16 bytes), frequently-created values like coordinates or measurements. See learn.microsoft.com/fsharp on structs.',
      },
      {
        kind: 'mcq',
        id: 'fsharp-10-mcq-6',
        prompt:
          'In the workflow composition pattern from *Domain Modeling Made Functional*, what is the type of a typical workflow function?',
        options: [
          '`Input -> Output` (a simple pure function)',
          '`Input -> Async<Result<Output, DomainError>>`  (async + explicit errors)',
          '`Input -> void` (workflows produce no output, only side effects)',
          '`Input -> Output option` (always returns optional output)',
        ],
        correctIndex: 1,
        explanation:
          'Workflows encode three concerns: I/O (so they return `Async` or `Task`), failure (so they return `Result` with a domain-specific error DU), and an explicit input-to-object contract. Composing such workflows uses `AsyncResult.bind` or a `asyncResult { }` CE. See *Domain Modeling Made Functional*.',
      },
    ],
  },
];
