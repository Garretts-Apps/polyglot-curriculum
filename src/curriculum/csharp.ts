import type { Phase } from './types';

export const csharpPhases: Phase[] = [
  {
    id: 'csharp-0',
    language: 'csharp',
    level: 0,
    title: 'Setup & Hello World',
    timeEstimate: '0.5-1 hours',
    intro: `Welcome to C#! In this phase you'll verify your local .NET SDK installation and run your first console application. No prior experience is needed — if you have NEVER programmed before, you are in exactly the right place. We are going to read your first program one word at a time.

By the end you'll have the \`dotnet\` CLI working on your machine and will have executed a "Hello, World!" program both locally and in an online playground.

### The classic first program, token by token

For decades, the "full" C# version of Hello World looked like this. You may see it in older tutorials, so let's understand every single piece of it before we simplify:

\`\`\`csharp
using System;
namespace MyApplication
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, World!");
        }
    }
}
\`\`\`

That is a lot of ceremony to print one line! A complete beginner reasonably asks: "what is all this?" Let's go left-to-right and answer, for each piece: **what it means**, **why it's there**, **what happens if you remove it**, and **what (if anything) it becomes in memory while the program runs.**

**\`using System;\`** — Think of \`System\` as a labelled toolbox that ships with C#. Inside it lives \`Console\`, the tool we use to print text. The word \`using\` says "I want to reach into the \`System\` toolbox by short name." The semicolon \`;\` ends the statement (in C#, most lines of instruction end with \`;\`, like a full stop ends a sentence). *Why it's there:* so we can write \`Console\` instead of the long form \`System.Console\`. *Remove it:* you'd have to write \`System.Console.WriteLine(...)\` everywhere, or the compiler complains it doesn't know what \`Console\` is. *In memory:* nothing — it's an instruction to the compiler, not a value.

**\`namespace MyApplication\`** — A \`namespace\` is just a named container, like a folder, that groups related code so names don't collide with code from other libraries. \`MyApplication\` is a name we chose; it could be anything. The \`{ }\` braces right after it wrap everything that belongs inside this container. *Remove it:* the code still runs — a namespace is optional organization, not a requirement. *In memory:* nothing at runtime; it's purely a naming/organization label.

**\`class Program\`** — A \`class\` is a box that holds code and data that belong together. In classic C#, all code had to live inside some class. \`Program\` is just the name we gave this box (again, our choice). The \`{ }\` after it hold the box's contents. *Remove it:* in the classic style the program won't compile, because the \`Main\` method below needs a home. *In memory:* the class itself is a blueprint the runtime knows about; we never make a copy of it here.

**\`static void Main(string[] args)\`** — This is the most important line, and the one beginners find most mysterious. Let's dissect it piece by piece:

\`\`\`
static  void  Main  (  string[]  args  )
  │      │     │    │     │        │    │
  │      │     │    │     │        │    └─ closes the list of inputs
  │      │     │    │     │        └────── the NAME of the input variable
  │      │     │    │     └─────────────── the TYPE of the input: a list of text
  │      │     │    └───────────────────── opens the list of inputs handed in
  │      │     └────────────────────────── the NAME of this action: "Main"
  │      └──────────────────────────────── what this action gives back: nothing
  └─────────────────────────────────────── "belongs to the class, not to a copy"
\`\`\`

- **\`Main\`** is a *function* — a named action, a chunk of work you can run. This particular function is named \`Main\`, and that name is special: when you run the program, the computer looks for \`Main\` and starts there. It is the front door.
- **The parentheses \`( )\`** are where information is *handed in* to the function. Whatever sits between them is the input the function is allowed to use.
- **\`string\`** means *text* — letters and words, like \`"Hello"\`. **\`string[]\`** — the \`[]\` means an *array*, which is simply a *list*. So \`string[]\` is "a list of text values," e.g. \`["apple", "banana"]\`.
- **\`args\`** is just the *variable name* — the label we put on that incoming list so we can refer to it. \`args\` is short for "arguments," meaning the pieces of info passed in when the program starts. So \`string[] args\` together says: "make a variable named \`args\` that holds a list of text values, and let \`Main\` use it."
- **Key insight:** \`string[] args\` is not *doing* anything — it *describes* something. It's the function announcing "I am willing to receive a list of text, and I'll call it \`args\`." The doing happens later, in the body.
- **\`void\`** means this function gives *nothing* back to whoever ran it. (Other functions might hand back a number or some text; this one just does its work and returns nothing.)
- **\`static\`** means \`Main\` belongs to the \`Program\` box itself, not to a particular copy of it. For now, read \`static\` as "you can run this directly without first building an object." We'll properly unpack objects in a later level.

*What's in \`args\` at runtime?* If you launch the program with extra words after it — for example \`dotnet run apple banana orange\` — then before \`Main\` even begins, the computer fills in \`args = ["apple", "banana", "orange"]\`. If you launch it with no extra words, \`args\` is an empty list \`[]\`. Either way, the list genuinely exists in memory the moment \`Main\` starts; our little program just never looks at it.

**\`Console.WriteLine("Hello, World!")\`** — This is the line that actually *does* the visible work. \`Console\` is the screen/terminal tool from the \`System\` toolbox. The dot \`.\` means "reach inside \`Console\` and use the thing named next." \`WriteLine\` is that thing — a function that prints text and then moves to a new line. The parentheses \`( )\` hand it the text to print, and \`"Hello, World!"\` is that text — the double quotes \`" "\` mark where the text starts and ends. The \`;\` ends the statement. *In memory:* the text \`"Hello, World!"\` exists as a string value, which \`WriteLine\` sends to your screen.

**The braces \`{ }\`** appear in nested pairs — namespace contains class, class contains \`Main\`, \`Main\` contains its instructions. Every \`{\` opens a body and its matching \`}\` closes it. They are how C# knows where each piece begins and ends.

### The good news: modern C# is much shorter

Since C# 9, you can skip almost all of that ceremony with **top-level statements** — you just write the instructions directly:

\`\`\`csharp
Console.WriteLine("Hello, World!");
\`\`\`

The compiler quietly wraps this in the \`Main\`/\`class\`/\`namespace\` scaffolding for you. That single line is the program you'll actually write below. We walked through the long version first so that when you meet it in real codebases, none of it is a mystery.`,
    topics: [
      {
        label: 'Download .NET SDK',
        url: 'https://dotnet.microsoft.com/download',
        note: 'Official installer for Windows, macOS, and Linux',
      },
      {
        label: '.NET Fiddle — online playground',
        url: 'https://dotnetfiddle.net/',
        note: 'Run C# snippets in the browser without installing anything',
      },
    ],
    deliverable:
      'Verify dotnet --version in your command line and run a print statement in the browser console.',
    checks: [
      {
        id: 'csharp-0-code-1',
        kind: 'code',
        prompt: 'Write a C# top-level statement that prints "Hello, World!" to the console.',
        boilerplate: '// Output: Hello, World!\nConsole.WriteLine("Hello, World!");\n',
        expectedOutput: 'Hello, World!',
        explanation: 'Reading it token by token: `Console` is the screen tool from the `System` toolbox; the dot `.` means "reach inside it"; `WriteLine` is a function (a named action) that prints text and moves to a new line; the parentheses `( )` hand it the value to print; `"Hello, World!"` is that text (the double quotes mark where the text starts and ends); and the `;` ends the statement like a full stop. You did not write `using System;`, `namespace`, `class Program`, or `static void Main(string[] args)` — top-level statements (C# 9+) let you write executable code directly, and the compiler wraps it in that `Main`/class/namespace scaffolding for you behind the scenes.',
      },
      {
        id: 'csharp-0-mcq-1',
        kind: 'mcq',
        prompt: 'Which command creates a new C# console project?',
        options: ['dotnet new console', 'dotnet create app', 'csharp init', 'dotnet build'],
        correctIndex: 0,
        explanation: 'The command "dotnet new console" initializes a new C# console application project template.',
      },
      {
        id: 'csharp-0-mcq-2',
        kind: 'mcq',
        prompt: 'What is the standard file extension for C# source files?',
        options: ['.cs', '.csharp', '.c#', '.net'],
        correctIndex: 0,
        explanation: 'C# source code files use the extension ".cs".',
      },
    ],
  },
  {
    id: 'csharp-1',
    language: 'csharp',
    level: 1,
    title: 'C# Fundamentals',
    timeEstimate: '6-8 hours',
    intro: `By the end of this phase, you'll read C# programs using top-level statements, value/reference types, control flow, and string interpolation, and predict their behavior. To build the muscle, you'll write a \`greet\` CLI locally with \`dotnet new console\` and \`dotnet run\`.

### Four bedrock ideas — from zero

Before we use these words constantly, let's define them in plain English. If you've never programmed, read this section slowly; everything later builds on it.

**A statement** is a single instruction to the computer — one complete thing to do. In C#, most statements end with a semicolon \`;\`, the way an English sentence ends with a full stop. \`Console.WriteLine("Hi");\` is one statement: "print Hi." A program is mostly a list of statements, run top to bottom in order.

**A variable** is a labelled box that holds a value, so you can store something now and use it by name later. Writing \`int age = 26;\` creates a box labelled \`age\` and puts the number \`26\` inside it. Afterwards, every time you write \`age\` the computer fetches what's in that box. You can also change what's in the box: \`age = 27;\` replaces the contents. "Variable" literally means "the value can vary."

**A type** is the *kind* of value a box is allowed to hold. \`int\` holds whole numbers (\`26\`), \`string\` holds text (\`"hello"\`), \`bool\` holds a true/false yes-or-no (\`true\`). C# is *strongly typed*: every variable has a type, fixed when you create it, and that type decides what you're allowed to do with the value. You can add two \`int\`s, but you cannot subtract one \`string\` from another — the compiler will stop you before the program ever runs. This catches mistakes early. (You can let C# figure out the type for you with \`var name = "Sam";\`, but it's still a fixed type behind the scenes — here, \`string\`.)

**A function** (in C# also called a **method**) is a named, reusable action — a chunk of work you bundle up, give a name, and run whenever you like by writing its name. You met one already: \`Main\` is a function. You can pass information *into* a function through its parentheses (those inputs are called *parameters* or *arguments*), and a function can hand a value *back out* (that's its *return* value). For example:

\`\`\`csharp
int CalculateAge(int birth, int current)
{
    return current - birth;   // hand this number back to whoever called us
}

int age = CalculateAge(2000, 2026);   // age now holds 26
\`\`\`

Here \`CalculateAge\` is the function name, \`birth\` and \`current\` are parameters (boxes filled with \`2000\` and \`2026\` when we call it), and \`return current - birth\` sends \`26\` back, which we store in the variable \`age\`. A function whose return type is \`void\` (like \`Main\`) hands nothing back — it just does its work.

With those four ideas — statement, variable, type, function — you can read almost any small program. The rest of this level shows them combined with *control flow* (making decisions and repeating work, e.g. \`if\` and \`for\`) and *string interpolation* (slotting variables into text with \`$"Hello, {name}!"\`).

C# is a strongly-typed, multi-paradigm language on .NET — every variable has a compile-time type, and that type determines what operations are legal.`,
    video: {
      title: 'C# Tutorial for Beginners',
      youtubeId: 'GhQdlIFylQ8',
      channelName: 'freeCodeCamp.org',
      duration: '4.5 hours',
    },
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
      'Build locally: a `greet` CLI using top-level statements that takes a name argument (and optional birth year), prints a personalized greeting with the current timestamp via `DateTime.Now`, and uses at least one helper method that returns a string.',
    checks: [
      {
        kind: 'mcq',
        id: 'csharp-1-mcq-1',
        prompt: 'Which keyword declares a variable whose type is inferred by the compiler but remains statically typed?',
        options: ['dynamic', 'var', 'object', 'let'],
        correctIndex: 1,
        explanation: '`var` triggers compile-time type inference — the variable type is fixed once inferred. `dynamic` defers resolution to runtime (no compile-time checking), `object` is the universal reference type that requires casting, and `let` is not a C# keyword for variable declaration (it exists only inside LINQ query syntax).',
      },
      {
        kind: 'mcq',
        id: 'csharp-1-mcq-2',
        prompt: `What does this program print?\n\n\`\`\`csharp\nusing System;\n\nstring Greet(string name) => $"Hello, {name}!";\nConsole.WriteLine(Greet("World"));\n\`\`\``,
        options: ['Hello, {name}!', 'Hello, World!', 'Hello, name!', 'Compile error: top-level statements cannot define local functions'],
        correctIndex: 1,
        explanation: 'Top-level statements support local functions, and `$"..."` is an interpolated string — `{name}` is replaced by the value of `name`. The expression-bodied lambda `=> $"Hello, {name}!"` returns the formatted string, so the program prints `Hello, World!`.',
      },
      {
        kind: 'mcq',
        id: 'csharp-1-mcq-3',
        prompt: `What does this program print?\n\n\`\`\`csharp\nusing System;\n\nfor (int i = 1; i <= 5; i++)\n{\n    if (i == 3) continue;\n    Console.Write(i);\n}\n\`\`\``,
        options: ['12345', '1245', '123', '12'],
        correctIndex: 1,
        explanation: '`continue` skips the rest of the loop body for that iteration but does NOT terminate the loop (that is `break`). When `i == 3` the `Console.Write` is skipped, so output is `1245`.',
      },
      {
        kind: 'mcq',
        id: 'csharp-1-mcq-4',
        prompt: `Which line contains a compile error?\n\n\`\`\`csharp\nusing System;\n\nint a = 10;          // line 1\nconst int b = 20;    // line 2\nb = 25;              // line 3\nConsole.WriteLine(a + b);  // line 4\n\`\`\``,
        options: ['line 1', 'line 2', 'line 3', 'line 4'],
        correctIndex: 2,
        explanation: '`const` declares a compile-time constant that cannot be reassigned. Line 3 attempts to reassign `b`, which the compiler rejects with CS0131. For values that should be set once at runtime, use `readonly` on a field instead.',
      },
      {
        kind: 'mcq',
        id: 'csharp-1-mcq-5',
        prompt: 'Which statement about value types and reference types in C# is correct?',
        options: [
          'All structs are reference types because they inherit from System.Object',
          'Value types (struct, int, bool) store their data directly; reference types (class, string, arrays) store a reference to heap-allocated data',
          'Strings are value types because they are immutable',
          'Reference types are always faster than value types',
        ],
        correctIndex: 1,
        explanation: 'Value types live where they are declared (stack for locals, inline for fields). Reference types live on the managed heap and variables hold a reference. `string` is a reference type despite being immutable — immutability is orthogonal to value/reference semantics.',
      },
      {
        kind: 'mcq',
        id: 'csharp-1-debug-1',
        prompt: `Production logs show:\n\`\`\`\nSystem.NullReferenceException: Object reference not set to an instance of an object.\n   at MyApp.Services.GreetService.Format(UserProfile profile) in /src/Services/GreetService.cs:line 12\n\`\`\`\nThe code:\n\`\`\`csharp\nusing System;\nnamespace MyApp.Services;\npublic class GreetService\n{\n    public string Format(UserProfile profile)\n    {\n        return $"Hello, {profile.DisplayName.ToUpper()}!";\n    }\n}\npublic class UserProfile { public string? DisplayName { get; set; } }\n\`\`\`\nWhat is the fix?`,
        options: [
          'Change `UserProfile` to a struct so it cannot be null',
          'Guard both `profile` and `profile.DisplayName` before dereferencing: `if (profile is null || profile.DisplayName is null) return "Hello!";`',
          'Wrap the method body in `try/catch (NullReferenceException)`',
          'Add `#nullable disable` at the top of the file',
        ],
        correctIndex: 1,
        explanation: 'Either `profile` itself or `profile.DisplayName` can be null, causing the NullReferenceException at the `.ToUpper()` call. The correct fix is explicit null guards before dereferencing. Catching NullReferenceException hides the bug. `#nullable disable` removes warnings but does not prevent the runtime crash. Structs cannot be null but `DisplayName` is still a nullable string field.',
      },
      {
        kind: 'mcq',
        id: 'csharp-1-debug-2',
        prompt: `A console app throws at runtime:\n\`\`\`\nSystem.IndexOutOfRangeException: Index was outside the bounds of the array.\n   at MyApp.Program.GetItem(String[] args) in /src/Program.cs:line 6\n\`\`\`\nThe code:\n\`\`\`csharp\nusing System;\nnamespace MyApp;\npublic static class Program\n{\n    public static string GetItem(string[] args)\n    {\n        return args[3];\n    }\n    public static void Main(string[] args)\n    {\n        Console.WriteLine(GetItem(args));\n    }\n}\n\`\`\`\nThe program is run as \`dotnet run -- alpha beta\`. What is the fix?`,
        options: [
          'Change `args[3]` to `args[2]` — arrays are 1-indexed in C#',
          'Guard with `if (args.Length > 3) return args[3]; return string.Empty;`',
          'Catch `IndexOutOfRangeException` and return `null`',
          'Allocate the array with `new string[4]` before calling the method',
        ],
        correctIndex: 1,
        explanation: 'Arrays in C# are 0-indexed, so a two-element array has valid indices 0 and 1. Accessing index 3 on a 2-element array always throws. The fix is to check `args.Length` before indexing. Catching the exception hides the programmer error without fixing it. Changing to `args[2]` would still be out of range for two args.',
      },
      {
        kind: 'mcq',
        id: 'csharp-1-debug-3',
        prompt: `What does this program print, and why?\n\n\`\`\`csharp\nusing System;\nnamespace MyApp;\npublic class Program\n{\n    public static void Main()\n    {\n        int x = 0;\n        string label = x switch\n        {\n            > 0 => "positive",\n            < 0 => "negative",\n        };\n        Console.WriteLine(label);\n    }\n}\n\`\`\``,
        options: [
          'Prints "positive"',
          'Prints "negative"',
          'Compile error: switch expression is not exhaustive — the `0` case is unhandled',
          'Prints an empty string',
        ],
        correctIndex: 2,
        explanation: 'The `switch` expression must be exhaustive; the compiler verifies all inputs are covered. `> 0` and `< 0` do not cover `0`, so CS8509 is emitted. Fix by adding `_ => "zero"` as the final discard arm. This is a compile-time safety guarantee — not a runtime crash.',
      },
      {
        id: 'csharp-1-code-1',
        kind: 'code',
        prompt: 'Complete the `CalculateAge` helper method to return the age given the birth year and current year.',
        boilerplate: 'using System;\n\nint birthYear = 2000;\nint currentYear = 2026;\n\nint age = CalculateAge(birthYear, currentYear);\nConsole.WriteLine($"Age: {age}");\n\nint CalculateAge(int birth, int current)\n{\n    // TODO: Return current minus birth\n    \n}',
        expectedOutput: 'Age: 26',
        explanation: 'Top-level statements support local functions, which can take parameters and return values. This method calculates the difference between current and birth year.',
      },
    ],
  },
  {
    id: 'csharp-2',
    language: 'csharp',
    level: 2,
    title: 'Object-Oriented Programming',
    timeEstimate: '8-10 hours',
    intro: `By the end of this phase, you'll read class hierarchies using \`virtual\`/\`override\`, interface dispatch, primary constructors, and access modifiers, and predict their runtime behavior. C# OOP is comprehensive — understanding the difference between \`virtual\`/\`new\` and between class vs struct is essential for reading any production codebase. To build the muscle, you'll write a runnable inventory CLI locally using \`dotnet new console\` and \`System.CommandLine\`.`,
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
      {
        label: 'Primary constructors (C# 12)',
        url: 'https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/tutorials/primary-constructors',
      },
    ],
    deliverable:
      'Build locally: an `inventory` CLI with a `Product` record (Id, Name, decimal Price), an in-memory `List<Product>`, and `add`, `list`, `find` subcommands implemented via `System.CommandLine`. Include an abstract `Account`-style hierarchy in a separate file to practice virtual/override dispatch.',
    checks: [
      {
        kind: 'mcq',
        id: 'csharp-2-mcq-1',
        prompt: 'Which access modifier makes a member visible to all types in the same assembly but not to external assemblies?',
        options: ['private', 'protected', 'internal', 'public'],
        correctIndex: 2,
        explanation: '`internal` restricts visibility to the declaring assembly (DLL or EXE). `protected` is for subclass access (regardless of assembly), `private` is for the declaring type itself, and `public` is unrestricted. Use `internal` for implementation details that need to be shared across a project but kept out of the public API.',
      },
      {
        kind: 'mcq',
        id: 'csharp-2-mcq-2',
        prompt: `What does this program print?\n\n\`\`\`csharp\nusing System;\n\nclass Animal\n{\n    public virtual string Speak() => "...";\n}\n\nclass Dog : Animal\n{\n    public override string Speak() => "Woof";\n}\n\nAnimal a = new Dog();\nConsole.WriteLine(a.Speak());\n\`\`\``,
        options: ['...', 'Woof', 'Animal', 'Compile error: cannot assign Dog to Animal'],
        correctIndex: 1,
        explanation: 'This is classic polymorphic dispatch. The static type is `Animal` but the runtime type is `Dog`. Because `Speak` is `virtual`/`override`, the CLR resolves the call to `Dog.Speak()` via the method table, printing `Woof`. If `Dog.Speak` had used `new` instead of `override`, the static type would have won and you would have seen `...`.',
      },
      {
        kind: 'mcq',
        id: 'csharp-2-mcq-3',
        prompt: `What does this C# 12 code print?\n\n\`\`\`csharp\nusing System;\n\nclass Circle(double radius)\n{\n    public double Area() => Math.PI * radius * radius;\n}\n\nConsole.WriteLine(new Circle(5).Area().ToString("F2"));\n\`\`\``,
        options: ['25.00', '78.54', '31.42', 'Compile error: class cannot have parameters'],
        correctIndex: 1,
        explanation: 'C# 12 added primary constructors on classes: `Circle(double radius)` is a constructor parameter that is in scope throughout the body. `Math.PI * 5 * 5` ≈ 78.5398 and `"F2"` formats with two decimal places → `78.54`. Primary constructor parameters are NOT auto-properties on a `class` (they are on `record`s) — they are captured fields used by instance members.',
      },
      {
        kind: 'mcq',
        id: 'csharp-2-mcq-4',
        prompt: 'Which combination correctly enforces "the base class cannot be instantiated, derived classes MUST provide an implementation"?',
        options: [
          '`virtual` method on a `sealed` base class',
          '`abstract` method on an `abstract` base class',
          '`override` method on a regular class',
          '`new` method that hides a base method',
        ],
        correctIndex: 1,
        explanation: 'An `abstract` class cannot be instantiated directly. An `abstract` method has no body and forces non-abstract derived classes to provide an `override`. `sealed` does the opposite (prevents inheritance). `new` hides without polymorphism.',
      },
      {
        kind: 'mcq',
        id: 'csharp-2-mcq-5',
        prompt: `Which line is the bug?\n\n\`\`\`csharp\nusing System;\nusing System.Collections.Generic;\n\nstruct Point { public int X; public int Y; }\n\nvar p = new Point { X = 1, Y = 2 };\nvar list = new List<Point> { p };\nlist[0].X = 99;                // line A\nConsole.WriteLine(list[0].X); // line B\n\`\`\``,
        options: [
          'Line A compiles and updates the list — the program prints 99',
          'Line A is a compile error because `list[0]` returns a copy of the struct, not a reference',
          'Line B throws at runtime',
          'Line A and Line B both compile and print 1',
        ],
        correctIndex: 1,
        explanation: 'For value types stored in a `List<T>`, the indexer returns a *copy*. Mutating a field on that copy is meaningless, so the compiler emits CS1612 ("Cannot modify the return value of List<Point>.this[int] because it is not a variable"). With `class Point`, line A would compile and print `99`.',
      },
      {
        kind: 'mcq',
        id: 'csharp-2-debug-1',
        prompt: `A production bug report says "the wrong method is called after refactoring". The code:\n\n\`\`\`csharp\nusing System;\nnamespace MyApp;\npublic class Base\n{\n    public virtual void Log() => Console.WriteLine("Base");\n}\npublic class Derived : Base\n{\n    public new void Log() => Console.WriteLine("Derived");\n}\npublic class Program\n{\n    public static void Main()\n    {\n        Base obj = new Derived();\n        obj.Log();\n    }\n}\n\`\`\`\nWhat does it print and what is the fix?`,
        options: [
          'Prints "Derived" — `new` correctly overrides virtual methods',
          'Prints "Base" — `new` hides the base method without polymorphism; change `new` to `override` to get "Derived"',
          'Prints "Base" — `Derived` cannot override sealed methods',
          'Compile error: `new` and `virtual` cannot be combined',
        ],
        correctIndex: 1,
        explanation: '`new` hides a base member at the static-type level — it does NOT participate in virtual dispatch. When the variable is typed as `Base`, the runtime calls `Base.Log()`. Change `new void Log()` to `override void Log()` so that the virtual dispatch table routes to `Derived.Log()` regardless of the declared type. This is one of the most common OOP bugs in C#.',
      },
      {
        kind: 'mcq',
        id: 'csharp-2-debug-2',
        prompt: `Runtime throws:\n\`\`\`\nSystem.InvalidCastException: Unable to cast object of type 'MyApp.Cat' to type 'MyApp.Dog'.\n   at MyApp.Program.Main() in /src/Program.cs:line 14\n\`\`\`\nThe code:\n\`\`\`csharp\nusing System;\nnamespace MyApp;\npublic class Animal { }\npublic class Dog : Animal { public void Fetch() => Console.WriteLine("fetch"); }\npublic class Cat : Animal { public void Purr() => Console.WriteLine("purr"); }\npublic class Program\n{\n    public static void Main()\n    {\n        Animal a = new Cat();\n        Dog d = (Dog)a;\n        d.Fetch();\n    }\n}\n\`\`\`\nWhat is the fix?`,
        options: [
          'Cast using `(Animal)a` first, then to `(Dog)`',
          'Use `as` with a null check: `Dog? d = a as Dog; if (d is null) return;`',
          'Make `Cat` extend `Dog` so the cast succeeds',
          'Use `dynamic a = new Cat()` to bypass the cast',
        ],
        correctIndex: 1,
        explanation: '`(Dog)a` is a hard cast that throws `InvalidCastException` when the runtime type is `Cat`. The safe pattern is `as` + null check: `a as Dog` returns `null` instead of throwing when the cast fails. Then check before using. Alternatively, use `if (a is Dog d) { d.Fetch(); }` with a pattern-matching is-expression.',
      },
      {
        kind: 'mcq',
        id: 'csharp-2-debug-3',
        prompt: `Interface mismatch at runtime:\n\`\`\`\nSystem.InvalidCastException: Unable to cast object of type 'MyApp.JsonLogger' to type 'MyApp.IFileLogger'.\n\`\`\`\nThe code:\n\`\`\`csharp\nusing System;\nnamespace MyApp;\npublic interface ILogger { void Log(string msg); }\npublic interface IFileLogger : ILogger { void Flush(); }\npublic class JsonLogger : ILogger\n{\n    public void Log(string msg) => Console.WriteLine(msg);\n}\npublic class Program\n{\n    public static void Main()\n    {\n        ILogger logger = new JsonLogger();\n        IFileLogger fileLogger = (IFileLogger)logger;\n        fileLogger.Flush();\n    }\n}\n\`\`\`\nWhat is the correct fix?`,
        options: [
          'Add `implements IFileLogger` to `JsonLogger` so the cast succeeds',
          'Make `JsonLogger` implement `IFileLogger` and add a `Flush()` method, OR check `if (logger is IFileLogger fl)` before casting',
          'Change the variable type to `object` before casting',
          'Use `Activator.CreateInstance<IFileLogger>()` to create a compatible instance',
        ],
        correctIndex: 1,
        explanation: '`JsonLogger` only implements `ILogger`, not `IFileLogger`. Casting to `IFileLogger` throws because the object does not implement that interface. Fix: either make `JsonLogger` implement `IFileLogger` (add `Flush()`), or use the safe pattern `if (logger is IFileLogger fl) { fl.Flush(); }` to conditionally call only when the capability exists.',
      },
      {
        id: 'csharp-2-code-1',
        kind: 'code',
        prompt: 'Implement a derived class `Dog` that overrides the virtual method `MakeSound` from the base class `Animal` to return `"Woof"`.',
        boilerplate: 'using System;\n\nAnimal animal = new Dog();\nConsole.WriteLine(animal.MakeSound());\n\nclass Animal\n{\n    public virtual string MakeSound() => "...";\n}\n\nclass Dog : Animal\n{\n    // TODO: Override MakeSound to return "Woof"\n    \n}',
        expectedOutput: 'Woof',
        explanation: 'The `override` keyword is required in C# to extend or modify the abstract or virtual implementation of an inherited method.',
      },
    ],
  },
  {
    id: 'csharp-3',
    language: 'csharp',
    level: 3,
    title: 'Collections, LINQ, Generics & Async',
    timeEstimate: '10-12 hours',
    intro: `By the end of this phase, you'll read LINQ pipelines (method-chain and query-expression), \`async\`/\`await\` patterns, generic constraints, and \`IDisposable\` usage, and predict their behavior. LINQ's deferred execution and async's continuation model are the two biggest sources of production surprises in C# codebases. To build the muscle, you'll write a \`wordcount\` CLI locally with \`dotnet new console\`.`,
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
      'Build locally: a `wordcount` console app that reads a UTF-8 text file asynchronously with `File.ReadAllLinesAsync`, uses LINQ to compute a `Dictionary<string,int>` of word frequencies, prints the top 10 sorted descending, and wraps `FileNotFoundException` in a custom `FileProcessingException`.',
    checks: [
      {
        kind: 'mcq',
        id: 'csharp-3-mcq-1',
        prompt: 'Which LINQ method returns the first element satisfying a predicate, throwing if none is found?',
        options: ['FirstOrDefault', 'SingleOrDefault', 'First', 'Find'],
        correctIndex: 2,
        explanation: '`First(predicate)` throws `InvalidOperationException` when no match exists. `FirstOrDefault` returns `default(T)` (null for reference types) instead. `Single`/`SingleOrDefault` enforce exactly-one and throw if more than one matches. `Find` is a List<T>-only method (not LINQ) that returns default if missing.',
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
        explanation: '`await` registers a continuation and returns control to the caller without blocking the thread. The runtime resumes the method after the awaited task completes. Calling `.Result` or `.Wait()` would block the thread — and can deadlock in UI/ASP.NET contexts.',
      },
      {
        kind: 'mcq',
        id: 'csharp-3-mcq-3',
        prompt: `What does this LINQ query print?\n\n\`\`\`csharp\nusing System;\nusing System.Linq;\n\nint[] numbers = [1, 2, 3, 4, 5, 6, 7, 8];\nvar result = numbers.Where(n => n % 2 == 0).Select(n => n * 2);\nConsole.WriteLine(string.Join(" ", result));\n\`\`\``,
        options: ['2 4 6 8', '4 8 12 16', '1 3 5 7', '4 8 12 16 20 24 28 32'],
        correctIndex: 1,
        explanation: '`Where(n => n % 2 == 0)` keeps the even numbers `{2,4,6,8}`. `Select(n => n * 2)` doubles each → `{4,8,12,16}`. `string.Join(" ", …)` joins with single spaces. LINQ operators are lazy — both operators run in a single pass when `string.Join` enumerates the result.',
      },
      {
        kind: 'mcq',
        id: 'csharp-3-mcq-4',
        prompt: `What does this async program print?\n\n\`\`\`csharp\nusing System;\nusing System.Threading.Tasks;\n\nasync Task<int> ComputeAsync()\n{\n    var a = Task.FromResult(10);\n    var b = Task.FromResult(32);\n    return await a + await b;\n}\n\nConsole.WriteLine(await ComputeAsync());\n\`\`\``,
        options: ['10', '32', '42', 'Compile error: cannot await in expression position'],
        correctIndex: 2,
        explanation: '`await` is an expression and may appear inside larger expressions. `await a` yields 10, `await b` yields 32, the sum is 42. `Task.FromResult` creates an already-completed task — useful for stubbing async interfaces synchronously.',
      },
      {
        kind: 'mcq',
        id: 'csharp-3-mcq-5',
        prompt: `Which generic constraint will the compiler accept on this method so that \`a.CompareTo(b)\` resolves?\n\n\`\`\`csharp\nstatic T Max<T>(T a, T b) where T : ??? => a.CompareTo(b) > 0 ? a : b;\n\`\`\``,
        options: ['where T : class', 'where T : IComparable<T>', 'where T : new()', 'where T : struct'],
        correctIndex: 1,
        explanation: '`IComparable<T>` exposes `CompareTo(T)`. Without the constraint the compiler does not know `T` has a `CompareTo` method. `class`/`struct` only restrict reference vs value categories, and `new()` requires a parameterless constructor — none expose ordering.',
      },
      {
        kind: 'mcq',
        id: 'csharp-3-debug-1',
        prompt: `A service throws unexpectedly:\n\`\`\`\nSystem.ObjectDisposedException: Cannot access a disposed object.\nObject name: 'StreamReader'.\n   at MyApp.Services.FileService.ReadLines() in /src/Services/FileService.cs:line 14\n\`\`\`\nThe code:\n\`\`\`csharp\nusing System;\nusing System.Collections.Generic;\nusing System.IO;\nnamespace MyApp.Services;\npublic class FileService\n{\n    public IEnumerable<string> ReadLines(string path)\n    {\n        using var reader = new StreamReader(path);\n        foreach (var line in ReadLazy(reader))\n            yield return line;\n    }\n    private IEnumerable<string> ReadLazy(StreamReader reader)\n    {\n        string? line;\n        while ((line = reader.ReadLine()) != null)\n            yield return line;\n    }\n}\n\`\`\`\nWhat is the fix?`,
        options: [
          'Wrap the `foreach` in a `try/catch (ObjectDisposedException)` and swallow it',
          'The `using` block disposes `reader` when `ReadLines` yields control back to the caller before iteration is complete; inline the lazy logic inside the `using` block or use `File.ReadLines` instead',
          'Change `IEnumerable<string>` to `List<string>` and call `.ToList()` inside the using',
          'Move `new StreamReader(path)` outside the method into a field',
        ],
        correctIndex: 1,
        explanation: 'Iterator methods using `yield return` are lazy — `using` disposes `reader` when the `ReadLines` method body exits on first yield, before the caller has finished iterating. The fix is to either: (a) eagerly collect inside the using (`reader.ReadToEnd().Split(...)`) , (b) keep the `yield return` inside the `using` block itself, or (c) use `File.ReadLines(path)` which handles this correctly. Swallowing the exception hides the real bug.',
      },
      {
        kind: 'mcq',
        id: 'csharp-3-debug-2',
        prompt: `A developer complains that a LINQ query runs the database call twice:\n\`\`\`csharp\nusing System;\nusing System.Collections.Generic;\nusing System.Linq;\nnamespace MyApp;\npublic class ReportService\n{\n    public void PrintReport(IEnumerable<string> source)\n    {\n        var filtered = source.Where(s => s.StartsWith("A"));\n        Console.WriteLine($"Count: {filtered.Count()}");\n        foreach (var item in filtered)\n            Console.WriteLine(item);\n    }\n}\n\`\`\`\nWhat is wrong and how do you fix it?`,
        options: [
          'The `Where` predicate has a bug — `StartsWith` is case-sensitive and should use `OrdinalIgnoreCase`',
          'LINQ queries over `IEnumerable<T>` are deferred: `filtered` is re-enumerated by both `Count()` and `foreach`, executing the source query twice. Fix: call `.ToList()` once and store the result.',
          'Use `filtered.Any()` instead of `filtered.Count()` to avoid double-enumeration',
          'Replace `IEnumerable<string>` with `IQueryable<string>` to enable caching',
        ],
        correctIndex: 1,
        explanation: 'LINQ deferred execution means every time you enumerate an `IEnumerable<T>`, the pipeline re-runs from the source. `Count()` triggers one full enumeration; `foreach` triggers another. For remote sources (EF Core, HTTP) this means two round trips. The fix is `var filtered = source.Where(...).ToList();` — materialize once, read many times.',
      },
      {
        kind: 'mcq',
        id: 'csharp-3-debug-3',
        prompt: `Production logs show a deadlock. The code is called from an ASP.NET Core controller:\n\`\`\`csharp\nusing System.Net.Http;\nnamespace MyApp.Services;\npublic class WeatherService\n{\n    private readonly HttpClient _http;\n    public WeatherService(HttpClient http) => _http = http;\n    public string GetForecast()\n    {\n        return _http.GetStringAsync("https://api.weather.example/forecast").Result;\n    }\n}\n\`\`\`\nWhat causes the deadlock and what is the fix?`,
        options: [
          'Replace `HttpClient` with `WebClient` which has a synchronous `DownloadString` method',
          '`.Result` blocks the calling thread while waiting for the Task. In ASP.NET Core with a synchronization context, this deadlocks. Fix: make the method `async Task<string>` and use `await` instead of `.Result`.',
          'Add `ConfigureAwait(false)` after `.Result` to release the context',
          'Increase the thread pool size via `ThreadPool.SetMinThreads`',
        ],
        correctIndex: 1,
        explanation: 'Calling `.Result` on an async Task blocks the current thread. In older ASP.NET (not Core) with a single-threaded synchronization context, this deadlocked because the continuation needed the same thread. In ASP.NET Core this specific deadlock is less common but `.Result` still starves the thread pool under load. The correct fix is always to `async`/`await` all the way up — never block on async code with `.Result` or `.Wait()`.',
      },
      {
        id: 'csharp-3-code-1',
        kind: 'code',
        prompt: 'Use LINQ to filter the even numbers from the array, multiply each by 3, and calculate the sum of the resulting values.',
        boilerplate: 'using System;\nusing System.Linq;\n\nint[] numbers = { 1, 2, 3, 4, 5, 6 };\n\n// TODO: Complete the LINQ chain to multiply each even number by 3 and sum them up\nint result = numbers\n    .Where(n => n % 2 == 0)\n    .Select(n => n * 3)\n    .Sum();\n\nConsole.WriteLine($"Result: {result}");',
        expectedOutput: 'Result: 36',
        explanation: 'LINQ allows chaining operations like `Where`, `Select`, and `Sum` to process collection data declaratively.',
      },
    ],
  },
  {
    id: 'csharp-4',
    language: 'csharp',
    level: 4,
    title: 'Modern C# — Records, Patterns & Minimal APIs',
    timeEstimate: '10-12 hours',
    intro: `By the end of this phase, you'll read nullable reference type annotations, \`record\` types with \`with\`-expressions, pattern-matching \`switch\` expressions, and minimal ASP.NET Core API setup, and predict their behavior. Nullable warnings and pattern exhaustiveness are the two compiler features most teams leave misconfigured — understanding them lets you read warnings correctly. To build the muscle, you'll write a \`todo\` CLI and minimal API locally with \`dotnet new webapi\`.`,
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
      'Build locally: a `todo` CLI with JSON persistence using `System.Text.Json`. The CLI accepts `add`, `list`, `done` subcommands. A `todo serve` subcommand starts a minimal ASP.NET Core API exposing `GET /todos` and `POST /todos`. Cover a `TitleValidator` helper with xUnit tests (empty rejection, 120-char cap) run via `dotnet test`.',
    checks: [
      {
        kind: 'mcq',
        id: 'csharp-4-mcq-1',
        prompt: 'What does the `init` accessor allow that a regular `set` accessor does not?',
        options: [
          'Setting the property at any time',
          'Setting the property only during object initialization (constructor or object initializer)',
          'Setting the property only from derived classes',
          'Making the property thread-safe automatically',
        ],
        correctIndex: 1,
        explanation: '`init` restricts mutation to the object-initializer phase. After construction, the property is effectively read-only. This enables immutable-by-default objects while still permitting concise `new Foo { X = 1, Y = 2 }` initialization. `init` underpins `record` non-destructive mutation.',
      },
      {
        kind: 'mcq',
        id: 'csharp-4-mcq-2',
        prompt: 'Given `record Point(int X, int Y);`, which expression creates a new record identical to `p` except `X` is 10?',
        options: ['p.X = 10', 'p with { X = 10 }', 'new Point(10, p.Y)', 'p.Clone(X: 10)'],
        correctIndex: 1,
        explanation: '`with` expressions perform non-destructive mutation on records — a copy is created with the specified properties replaced. `new Point(10, p.Y)` also works but is verbose and breaks when the record adds fields; `p.X = 10` fails because record positional properties are `init`-only.',
      },
      {
        kind: 'mcq',
        id: 'csharp-4-mcq-3',
        prompt: `What does this program print?\n\n\`\`\`csharp\nusing System;\n\nrecord Shape(string Kind, double Size);\n\nShape s = new("circle", 150);\nstring label = s switch\n{\n    { Size: > 100 } => "big",\n    { Size: > 10 } => "medium",\n    _ => "small"\n};\nConsole.WriteLine(label);\n\`\`\``,
        options: ['small', 'medium', 'big', 'Compile error: switch expression is not exhaustive'],
        correctIndex: 2,
        explanation: 'The `switch` expression evaluates arms top-to-bottom. The first matching arm wins. `{ Size: > 100 }` matches because `Size == 150 > 100`, so `label = "big"`. The `_` discard pattern guarantees exhaustiveness so the compiler is satisfied.',
      },
      {
        kind: 'mcq',
        id: 'csharp-4-mcq-4',
        prompt: `Which line(s) emit a nullable-reference-type warning when \`#nullable enable\` is in effect?\n\n\`\`\`csharp\n#nullable enable\nusing System;\n\nstring? maybe = null;          // line 1\nstring definite = maybe;       // line 2\nConsole.WriteLine(definite.Length);  // line 3\n\`\`\``,
        options: ['line 1 only', 'line 2 only', 'lines 2 and 3', 'line 3 only'],
        correctIndex: 2,
        explanation: 'Line 1 is fine — `string?` opts in to null. Line 2 assigns a possibly-null value to a non-nullable target → CS8600. Line 3 dereferences a value the compiler now considers possibly-null → CS8602. To fix, null-check or use `maybe!` if you can prove non-null.',
      },
      {
        kind: 'mcq',
        id: 'csharp-4-mcq-5',
        prompt: 'Records and classes differ in several ways. Which statement is FALSE?',
        options: [
          'Records provide value-based equality by default; classes use reference equality unless you override `Equals`',
          'Records can be declared with positional syntax `record Foo(int X)` that auto-generates init-only properties',
          'Records support `with` expressions for non-destructive mutation; classes do not (without explicit clone code)',
          'Records are stored on the stack like structs; classes are stored on the heap',
        ],
        correctIndex: 3,
        explanation: 'Records are reference types by default and live on the heap exactly like classes. They differ only in *behaviour* (equality, ToString, with-expression support, primary constructor semantics). For stack-allocated value semantics use `record struct`. The other three statements are accurate.',
      },
      {
        kind: 'mcq',
        id: 'csharp-4-debug-1',
        prompt: `The build emits warning CS8602. The code:\n\`\`\`csharp\n#nullable enable\nusing System;\nnamespace MyApp;\npublic class OrderService\n{\n    public void PrintCustomer(Order? order)\n    {\n        Console.WriteLine(order.CustomerName.ToUpper());\n    }\n}\npublic class Order { public string? CustomerName { get; set; } }\n\`\`\`\nWhat is the correct fix?`,
        options: [
          'Add `#nullable disable` above the method to suppress the warning',
          'Null-check before dereferencing: `if (order?.CustomerName is string name) Console.WriteLine(name.ToUpper());`',
          'Change `order.CustomerName` to `order!.CustomerName!` to suppress with null-forgiving operators',
          'Change `Order?` to `Order` so the parameter cannot be null',
        ],
        correctIndex: 1,
        explanation: 'CS8602 warns that `order` or `order.CustomerName` may be null. The correct fix is a real null guard — using the null-conditional `?.` and a pattern match ensures you only call `ToUpper()` when the value is known non-null. Using `!` (null-forgiving) suppresses the warning but does nothing at runtime — it is appropriate only when you have out-of-band proof the value is non-null. Disabling nullable context removes a valuable safety net.',
      },
      {
        kind: 'mcq',
        id: 'csharp-4-debug-2',
        prompt: `An \`async void\` method crashes the process silently. The code:\n\`\`\`csharp\nusing System;\nusing System.Threading.Tasks;\nnamespace MyApp;\npublic class NotificationService\n{\n    public async void SendAsync(string message)\n    {\n        await Task.Delay(100);\n        throw new InvalidOperationException("Notification failed");\n    }\n    public static void Main()\n    {\n        var svc = new NotificationService();\n        svc.SendAsync("hello");\n        Console.WriteLine("done");\n    }\n}\n\`\`\`\nWhat happens and what is the fix?`,
        options: [
          'Nothing — exceptions in async void are silently swallowed',
          '`async void` exceptions are posted to `SynchronizationContext` and crash the process if unhandled; change the return type to `async Task` so callers can `await` and observe the exception',
          'Add a `try/catch` inside `SendAsync` to prevent the crash',
          'Call `svc.SendAsync("hello").Wait()` to observe the exception',
        ],
        correctIndex: 1,
        explanation: '`async void` was designed only for event handlers. An unhandled exception in an `async void` method is re-thrown on the captured `SynchronizationContext`, which in a console app propagates to `AppDomain.UnhandledException` and terminates the process. Changing to `async Task` makes the exception observable to callers who `await` the call. You cannot call `.Wait()` on `void`.',
      },
      {
        kind: 'mcq',
        id: 'csharp-4-debug-3',
        prompt: `A team gets CS8618 on every \`record\` in a DTO project with \`#nullable enable\`. The pattern:\n\`\`\`csharp\n#nullable enable\nnamespace MyApp.Dtos;\npublic record CreateOrderRequest\n{\n    public string CustomerName { get; init; }\n    public string[] Items { get; init; }\n}\n\`\`\`\nWhich change eliminates the warning without disabling nullable?\n`,
        options: [
          'Add `= null!;` initializers: `public string CustomerName { get; init; } = null!;`',
          'Mark the properties nullable: `public string? CustomerName { get; init; }`',
          'Suppress with `#pragma warning disable CS8618`',
          'Use a primary-constructor record: `public record CreateOrderRequest(string CustomerName, string[] Items);` so the compiler knows they are set at construction',
        ],
        correctIndex: 3,
        explanation: 'CS8618 fires because non-nullable properties might not be set when the object is constructed. Positional record syntax `record CreateOrderRequest(string CustomerName, string[] Items)` generates a constructor that requires both arguments — the compiler can verify they are always initialized. `= null!` suppresses the warning but lies to the compiler. Marking nullable changes the API contract. `#pragma` suppression hides a real gap.',
      },
      {
        id: 'csharp-4-code-1',
        kind: 'code',
        prompt: 'Complete the pattern matching `switch` expression to return `"Adult"` if the person\'s `Age` is 18 or older.',
        boilerplate: 'using System;\n\nvar person = new Person("Alice", 25);\n\n// TODO: Complete the switch expression to handle age >= 18 and return "Adult"\nstring category = person switch\n{\n    { Age: < 18 } => "Child",\n    { Age: >= 18 } => "Adult",\n    _ => "Senior"\n};\n\nConsole.WriteLine(category);\n\nrecord Person(string Name, int Age);',
        expectedOutput: 'Adult',
        explanation: 'Positional records generate init-only properties. Switch expressions with property patterns check values on those properties in a clean, declarative way.',
      },
    ],
  },
  {
    id: 'csharp-5',
    language: 'csharp',
    level: 5,
    title: 'Advanced .NET — Spans, Generics & IAsyncEnumerable',
    timeEstimate: '14-16 hours',
    intro: `By the end of this phase, you'll read \`Span<T>\`/\`Memory<T>\` slicing patterns, \`ArrayPool<T>\` usage, \`IAsyncEnumerable<T>\` producer/consumer code, and generic constraints including static abstract members, and predict their behavior. These APIs appear throughout ASP.NET Core and System.Text.Json internals — understanding them lets you read the runtime source and write zero-allocation hot paths. To build the muscle, you'll write a \`csvparse\` CLI locally with \`dotnet run\`.`,
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
      'Build locally: a `csvparse` CLI that streams rows from a CSV file via `IAsyncEnumerable<string[]>`. The parser walks the line as `ReadOnlySpan<char>` (no substring allocations) and rents reusable buffers from `ArrayPool<char>`. Add a `--bench` flag that compares throughput vs a naive `string.Split` baseline.',
    checks: [
      {
        kind: 'mcq',
        id: 'csharp-5-mcq-1',
        prompt: 'Why can `Span<T>` not be stored as a field in a regular class?',
        options: [
          'It is a value type and value types cannot be fields',
          'It is a ref struct and ref structs may only live on the stack',
          'It requires an unsafe context',
          'It does not implement IDisposable',
        ],
        correctIndex: 1,
        explanation: '`Span<T>` is a `ref struct`. Ref structs cannot be boxed, captured by lambdas, used as type arguments, or stored on the heap (which includes class fields). This guarantees the underlying memory (stack frame, fixed array, etc.) outlives every reference into it.',
      },
      {
        kind: 'mcq',
        id: 'csharp-5-mcq-2',
        prompt: `What does this program print?\n\n\`\`\`csharp\nusing System;\n\nstring csv = "alpha,beta,gamma,delta";\nReadOnlySpan<char> span = csv.AsSpan();\nint count = 0;\nforeach (char c in span)\n    if (c == ',') count++;\nConsole.WriteLine(count);\n\`\`\``,
        options: ['3', '4', '5', '0'],
        correctIndex: 0,
        explanation: '`string.AsSpan()` returns a `ReadOnlySpan<char>` over the original string memory — zero allocation. The string contains three commas (between alpha/beta, beta/gamma, gamma/delta). The foreach iterates char-by-char and counts them.',
      },
      {
        kind: 'mcq',
        id: 'csharp-5-mcq-3',
        prompt: `What does this async-stream program print first when consumed lazily?\n\n\`\`\`csharp\nusing System;\nusing System.Collections.Generic;\nusing System.Threading.Tasks;\n\nstatic async IAsyncEnumerable<int> CountAsync()\n{\n    for (int i = 1; i <= 3; i++)\n    {\n        Console.WriteLine($"yield {i}");\n        yield return i;\n        await Task.Yield();\n    }\n}\n\nawait foreach (var n in CountAsync())\n{\n    Console.WriteLine($"consume {n}");\n    if (n == 2) break;\n}\n\`\`\``,
        options: [
          'yield 1, yield 2, yield 3, then consume 1, consume 2',
          'yield 1, consume 1, yield 2, consume 2 (then break)',
          'consume 1, consume 2, consume 3',
          'yield 1, consume 1, yield 2, consume 2, yield 3, consume 3',
        ],
        correctIndex: 1,
        explanation: 'Async iterators are *pull-based*: the producer yields one value, the consumer prints it, then asks for the next. The loop breaks after `n == 2`, so `yield 3` never executes. Output interleaves yield/consume pairs and stops at the break.',
      },
      {
        kind: 'mcq',
        id: 'csharp-5-mcq-4',
        prompt: 'A method takes `Span<byte>` and another takes `Memory<byte>`. Which statement is correct?',
        options: [
          'They are interchangeable — every `Span<byte>` is convertible to `Memory<byte>` and vice versa',
          '`Span<byte>` is for synchronous, stack-bound APIs; `Memory<byte>` is heap-storable and can survive async boundaries',
          '`Memory<byte>` is a subtype of `Span<byte>`',
          '`Span<byte>` always owns its buffer; `Memory<byte>` never does',
        ],
        correctIndex: 1,
        explanation: '`Span<T>` is a `ref struct` (stack-only, cannot cross `await`). `Memory<T>` is a regular struct that holds a reference plus offset/length — it can live on the heap and be stored as a field, so it works across async boundaries. Inside a synchronous method, call `memory.Span` to convert. Neither owns its buffer; both are views.',
      },
      {
        kind: 'mcq',
        id: 'csharp-5-mcq-5',
        prompt: `Which line is INCORRECT?\n\n\`\`\`csharp\nusing System;\nusing System.Buffers;\n\nchar[] buf = ArrayPool<char>.Shared.Rent(1024);  // line A\nSpan<char> span = buf.AsSpan(0, 100);            // line B\nbuf = null;                                       // line C\nArrayPool<char>.Shared.Return(buf);               // line D\n\`\`\``,
        options: ['line A', 'line B', 'line C', 'line D'],
        correctIndex: 3,
        explanation: 'After `buf = null` (line C), line D passes `null` to `Return`, throwing `ArgumentNullException`. The correct pattern is to keep the array reference, return it (often in a `finally` block), and only THEN drop the reference.',
      },
      {
        kind: 'mcq',
        id: 'csharp-5-debug-1',
        prompt: `A method causes a compiler error CE0618 about a ref struct lifetime:\n\`\`\`csharp\nusing System;\nnamespace MyApp;\npublic class Parser\n{\n    private ReadOnlySpan<char> _cached;\n    public void Cache(string input)\n    {\n        _cached = input.AsSpan();\n    }\n    public int Length => _cached.Length;\n}\n\`\`\`\nWhat is wrong and what is the fix?`,
        options: [
          'Call `AsSpan()` with an explicit length: `input.AsSpan(0, input.Length)`',
          '`ReadOnlySpan<char>` is a ref struct and cannot be stored as a class field; replace the field with `ReadOnlyMemory<char>` which is heap-storable',
          'Make the class a `ref struct` so it can contain a `ReadOnlySpan<char>` field',
          'Store `string` directly and call `.AsSpan()` on demand in `Length`',
        ],
        correctIndex: 1,
        explanation: 'Ref structs cannot be stored as fields of regular classes because they must stay on the stack. `ReadOnlyMemory<char>` is a regular struct that can be a class field, and you can call `.Span` on it inside synchronous methods. Option C (making the class a `ref struct`) would propagate the restriction to all callers — often infeasible. Option D (store string) also works but loses the offset/length metadata.',
      },
      {
        kind: 'mcq',
        id: 'csharp-5-debug-2',
        prompt: `A generic method fails to compile:\n\`\`\`csharp\nusing System;\nnamespace MyApp;\npublic class Factory\n{\n    public static T Create<T>()\n    {\n        return new T();\n    }\n}\n\`\`\`\nError: \`CS0304: Cannot create an instance of the variable type 'T' because it does not have the new() constraint\`. What is the fix?`,
        options: [
          'Change `new T()` to `Activator.CreateInstance<T>()`',
          'Add the `new()` constraint: `static T Create<T>() where T : new()`',
          'Add the `class` constraint: `static T Create<T>() where T : class`',
          'Change the return type to `object` and cast',
        ],
        correctIndex: 1,
        explanation: 'The compiler cannot call `new T()` without the `new()` constraint because it cannot guarantee that `T` has a public parameterless constructor. Adding `where T : new()` tells the compiler — and communicates to callers — that only constructible types are accepted. `Activator.CreateInstance<T>()` also works but skips compile-time validation and is slower; it is the right choice when you cannot add the constraint (e.g., when working with externally-defined types).',
      },
      {
        kind: 'mcq',
        id: 'csharp-5-debug-3',
        prompt: `A high-throughput CSV parser rents a buffer but a load test shows memory growing unboundedly:\n\`\`\`csharp\nusing System;\nusing System.Buffers;\nnamespace MyApp;\npublic class CsvParser\n{\n    public string[] ParseLine(string line)\n    {\n        char[] buf = ArrayPool<char>.Shared.Rent(line.Length * 2);\n        line.CopyTo(buf);\n        var parts = new string(buf).Split(',');\n        return parts;\n    }\n}\n\`\`\`\nWhat is wrong?`,
        options: [
          '`ArrayPool.Rent` returns buffers larger than requested, wasting memory',
          '`buf` is never returned to the pool — `ArrayPool<char>.Shared.Return(buf)` is never called; wrap in try/finally',
          '`new string(buf)` allocates a string — use `Span<char>` instead',
          '`line.CopyTo(buf)` copies bytes incorrectly on non-ASCII input',
        ],
        correctIndex: 1,
        explanation: 'The fundamental `ArrayPool` contract is: Rent → use → **Return**. Without `Return`, the rented array is not given back to the pool and the pool allocates new arrays for every call, growing memory without bound. Fix with try/finally: `try { ... } finally { ArrayPool<char>.Shared.Return(buf); }`. The buffer must be returned even if an exception is thrown.',
      },
      {
        id: 'csharp-5-code-1',
        kind: 'code',
        prompt: 'Complete the `GetExtension` method to return a slice of the input `ReadOnlySpan<char>` containing the file extension (the text after the last dot `.` character).',
        boilerplate: 'using System;\n\nReadOnlySpan<char> path = "src/curriculum/csharp.ts";\nReadOnlySpan<char> extension = GetExtension(path);\nConsole.WriteLine(extension.ToString());\n\nReadOnlySpan<char> GetExtension(ReadOnlySpan<char> path)\n{\n    int dotIndex = path.LastIndexOf(\'.\');\n    if (dotIndex == -1) return ReadOnlySpan<char>.Empty;\n    // TODO: Return the slice from dotIndex + 1\n    return path.Slice(dotIndex + 1);\n}',
        expectedOutput: 'ts',
        explanation: 'ReadOnlySpan<char>.Slice allows referencing a substring of characters without allocating new heap memory.',
      },
    ],
  },
  {
    id: 'csharp-6',
    language: 'csharp',
    level: 6,
    title: 'Performance, Advanced Async & Thread-Safe Patterns',
    timeEstimate: '16-18 hours',
    intro: `By the end of this phase, you'll read BenchmarkDotNet reports, \`ValueTask<T>\` return patterns, \`Channel<T>\` producer/consumer pipelines, and \`Interlocked\`/\`ConcurrentDictionary\` usage, and predict their behavior. Thread-safety bugs and async deadlocks are the hardest class of production incidents — this phase teaches you to spot them in code review. To build the muscle, you'll write a \`pipeline-bench\` CLI locally with \`dotnet run\` and \`dotnet add package BenchmarkDotNet\`.`,
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
      'Build locally: a `pipeline-bench` CLI that runs a bounded `Channel<int>` producer/consumer (1 producer × 1000 messages, 2 consumers accumulating into a `ConcurrentBag<int>`). Verify the sum invariant, then publish BenchmarkDotNet comparisons against a `ConcurrentQueue<int>` + `SpinWait` baseline.',
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
        explanation: '`ValueTask<T>` avoids a heap allocation on the synchronous fast path (e.g., cached reads). However it has consumption rules: a `ValueTask` instance must only be awaited once and must not be stored unless via `.AsTask()`. For multi-await/long-lived async, `Task<T>` is simpler and safer.',
      },
      {
        kind: 'mcq',
        id: 'csharp-6-mcq-2',
        prompt: 'What does the C# compiler do when it sees `await` inside the body of a `lock` statement?',
        options: [
          'Allows it but emits a runtime warning',
          'Emits compile error CS1996 — await cannot appear inside a lock statement',
          'Silently rewrites to SemaphoreSlim',
          'Accepts it without comment',
        ],
        correctIndex: 1,
        explanation: 'The compiler emits CS1996 ("Cannot await in the body of a lock statement"). The underlying reason is a threading mismatch — after resumption the continuation may run on a different thread, and `lock` (Monitor.Enter/Exit) is thread-affine. Use `SemaphoreSlim.WaitAsync` for async-friendly mutual exclusion.',
      },
      {
        kind: 'mcq',
        id: 'csharp-6-mcq-3',
        prompt: `What is the printed result?\n\n\`\`\`csharp\nusing System;\nusing System.Threading;\nusing System.Threading.Tasks;\n\nint counter = 0;\nTask[] tasks = new Task[10];\nfor (int i = 0; i < 10; i++)\n    tasks[i] = Task.Run(() =>\n    {\n        for (int j = 0; j < 100; j++)\n            Interlocked.Increment(ref counter);\n    });\nTask.WaitAll(tasks);\nConsole.WriteLine(counter);\n\`\`\``,
        options: ['Always less than 1000 due to a race condition', 'Exactly 1000', 'Exactly 100', 'Non-deterministic — could be anywhere from 1 to 1000'],
        correctIndex: 1,
        explanation: '`Interlocked.Increment` is an atomic compare-and-swap loop, so concurrent increments do not lose updates. 10 tasks × 100 increments = exactly 1000 every run. Using `counter++` instead would yield a value ≤ 1000 because the read-modify-write is not atomic.',
      },
      {
        kind: 'mcq',
        id: 'csharp-6-mcq-4',
        prompt: `Which line is the bug in this Channel<T> producer?\n\n\`\`\`csharp\nusing System.Threading.Channels;\n\nvar channel = Channel.CreateBounded<int>(10);      // line A\nfor (int i = 0; i < 100; i++)\n    channel.Writer.TryWrite(i);                     // line B\nchannel.Writer.Complete();                          // line C\nawait foreach (var item in channel.Reader.ReadAllAsync())\n    Console.WriteLine(item);                        // line D\n\`\`\``,
        options: [
          'Line A — bounded channels are not allowed',
          'Line B — `TryWrite` silently drops items when the channel is full; should use `WriteAsync` to back-pressure',
          'Line C — must not call Complete before reading',
          'Line D — ReadAllAsync requires CancellationToken',
        ],
        correctIndex: 1,
        explanation: '`Channel.CreateBounded<int>(10)` caps the channel at 10 items. `TryWrite` returns `false` (and discards the value!) when full. With 100 items and no reader yet, you lose most of them. The correct pattern is `await channel.Writer.WriteAsync(i)` which suspends the producer until space is available — true back-pressure.',
      },
      {
        kind: 'mcq',
        id: 'csharp-6-mcq-5',
        prompt: 'A BenchmarkDotNet report shows method A: `Mean = 150 ns, Allocated = 32 B`. Method B: `Mean = 220 ns, Allocated = 0 B`. Under sustained load (millions of calls/s), which is generally better and why?',
        options: [
          'Method A — it is faster, allocations are negligible',
          'Method B — zero allocations avoid GC pressure that becomes the bottleneck at scale, often making the slower wall-clock method faster overall',
          'They are equivalent — only `Mean` matters',
          'Method A — `Allocated` is a benchmark artefact and is misleading',
        ],
        correctIndex: 1,
        explanation: 'At million-calls/s scale, even 32 bytes per call becomes tens of MB/s of allocation, triggering frequent gen-0 GCs that pause every thread and pollute CPU caches. A slightly slower zero-allocation path often wins under steady-state load. This is why `Span<T>`, struct enumerators, and `ArrayPool` exist in hot paths.',
      },
      {
        kind: 'mcq',
        id: 'csharp-6-debug-1',
        prompt: `A service deadlocks in production. The code:\n\`\`\`csharp\nusing System;\nusing System.Threading;\nusing System.Threading.Tasks;\nnamespace MyApp;\npublic class ReportService\n{\n    private readonly SemaphoreSlim _sem = new SemaphoreSlim(1);\n    public async Task GenerateAsync()\n    {\n        await _sem.WaitAsync();\n        try\n        {\n            await Task.Delay(1000);\n        }\n        finally\n        {\n            _sem.Release();\n        }\n    }\n    public void Generate()\n    {\n        _sem.Wait();\n        try\n        {\n            Task.Delay(1000).Wait();\n        }\n        finally\n        {\n            _sem.Release();\n        }\n    }\n}\n\`\`\`\nThread A calls \`GenerateAsync()\`, thread B calls \`Generate()\` while A holds the semaphore. What happens?`,
        options: [
          'Thread B waits correctly until A releases the semaphore, then proceeds',
          'Thread B calls `_sem.Wait()` which blocks the thread. If the runtime needs that thread to schedule the continuation of `GenerateAsync`, a deadlock occurs. Fix: remove `Generate()` and make all callers use `GenerateAsync()`.',
          'Thread B bypasses the semaphore because `_sem.Wait()` is non-blocking',
          'Both threads deadlock immediately because `SemaphoreSlim` does not support mixing sync/async',
        ],
        correctIndex: 1,
        explanation: 'Mixing synchronous `_sem.Wait()` with async `GenerateAsync()` is dangerous. If the thread pool is exhausted or if Thread B holds a resource the async continuation needs, Thread B\'s blocking `.Wait()` prevents the continuation from running — a deadlock. The canonical fix is "async all the way": replace `Generate()` with `await GenerateAsync()`. Never block on async code in thread-pool contexts.',
      },
      {
        kind: 'mcq',
        id: 'csharp-6-debug-2',
        prompt: `An integration test throws after the channel is closed:\n\`\`\`csharp\nusing System;\nusing System.Threading.Channels;\nusing System.Threading.Tasks;\nnamespace MyApp;\npublic class Pipeline\n{\n    public async Task RunAsync()\n    {\n        var ch = Channel.CreateUnbounded<int>();\n        ch.Writer.Complete();\n        await ch.Writer.WriteAsync(42);\n    }\n}\n\`\`\`\nWhat exception is thrown and why?`,
        options: [
          '`InvalidOperationException` — you cannot write to a completed channel',
          '`ChannelClosedException` — the channel is closed before the write',
          '`TaskCanceledException` — write operations time out on closed channels',
          '`NullReferenceException` — `Writer` is null after `Complete()`',
        ],
        correctIndex: 1,
        explanation: '`Channel.Writer.Complete()` signals that no more items will be written. Any subsequent `WriteAsync` throws `ChannelClosedException` (which inherits from `InvalidOperationException`). In production pipelines, call `Complete()` only after all writes are finished — typically in a `finally` block of the producer, or after a `CancellationToken` is triggered.',
      },
      {
        kind: 'mcq',
        id: 'csharp-6-debug-3',
        prompt: `A data-processing service produces incorrect results under load:\n\`\`\`csharp\nusing System;\nusing System.Collections.Generic;\nusing System.Threading.Tasks;\nnamespace MyApp;\npublic class AggregatorService\n{\n    private readonly List<int> _results = new();\n    public async Task ProcessBatchAsync(int[] batch)\n    {\n        var tasks = new Task[batch.Length];\n        for (int i = 0; i < batch.Length; i++)\n        {\n            int val = batch[i];\n            tasks[i] = Task.Run(() => _results.Add(val * 2));\n        }\n        await Task.WhenAll(tasks);\n    }\n}\n\`\`\`\nWhat is wrong?`,
        options: [
          '`Task.Run` cannot accept a lambda with a captured variable',
          '`List<T>.Add` is not thread-safe; concurrent calls from multiple `Task.Run` workers corrupt the list. Replace with `ConcurrentBag<int>` or accumulate per-task and merge after `WhenAll`.',
          'The `await Task.WhenAll` does not wait for all tasks to complete',
          '`int val = batch[i]` captures the wrong loop variable',
        ],
        correctIndex: 1,
        explanation: '`List<T>` is not thread-safe. Concurrent `Add` calls from parallel tasks lead to lost items, duplicate items, or in rare cases a thrown exception from internal array resizing. The fix is either: use `ConcurrentBag<int>` (lock-free for concurrent adds), use `Interlocked` on an array with known indices, or collect results per-task and merge after `WhenAll` to avoid shared mutable state entirely.',
      },
      {
        id: 'csharp-6-code-1',
        kind: 'code',
        prompt: 'Use `Interlocked.Increment` to thread-safely increment the `counter` variable within the parallel tasks.',
        boilerplate: 'using System;\nusing System.Threading;\nusing System.Threading.Tasks;\n\nint counter = 0;\nTask[] tasks = new Task[100];\nfor (int i = 0; i < 100; i++)\n{\n    tasks[i] = Task.Run(() =>\n    {\n        // TODO: Increment counter thread-safely\n        Interlocked.Increment(ref counter);\n    });\n}\nTask.WaitAll(tasks);\nConsole.WriteLine($"Counter: {counter}");',
        expectedOutput: 'Counter: 100',
        explanation: 'The `Interlocked` class provides atomic operations for variables that are shared by multiple threads.',
      },
    ],
  },
  {
    id: 'csharp-7',
    language: 'csharp',
    level: 7,
    title: 'Entity Framework Core & Dependency Injection',
    timeEstimate: '18-20 hours',
    intro: `By the end of this phase, you'll read EF Core queries with change-tracking annotations, DI lifetime registrations, compiled queries, and interceptor patterns, and predict their behavior. EF Core context lifetime bugs and DI captive-dependency problems are among the most common sources of production data corruption — this phase teaches you to spot them. To build the muscle, you'll write a local SQLite-backed API with \`dotnet ef migrations\` and \`dotnet ef database update\`.`,
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
      'Build locally: a `bookmarks` API backed by EF Core + SQLite with full CRUD, a `SlowQueryInterceptor : DbCommandInterceptor` that logs commands exceeding 50ms, an `IBookmarkService` registered `AddScoped`, an `EF.CompileQuery` for "find by tag", and integration tests using `WebApplicationFactory<Program>` against an in-memory SQLite connection run via `dotnet test`.',
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
        explanation: 'For read-only workloads, skipping change tracking avoids allocating identity-map entries and snapshot copies, dramatically reducing GC pressure and CPU. The trade-off is that the returned entities are detached — calling `SaveChanges` will not persist mutations to them.',
      },
      {
        kind: 'mcq',
        id: 'csharp-7-mcq-2',
        prompt: 'Which DI lifetime should a `DbContext` typically use in an ASP.NET Core application?',
        options: ['Singleton', 'Transient', 'Scoped', 'Pooled (replaces Scoped)'],
        correctIndex: 2,
        explanation: '`DbContext` holds state (change tracker, open transaction) that must not be shared across requests. `Scoped` creates one instance per HTTP request — the correct lifetime. `AddDbContextPool` adds pooling at the infrastructure level *while preserving* the Scoped contract — it is an optimisation, not a different lifetime.',
      },
      {
        kind: 'mcq',
        id: 'csharp-7-mcq-3',
        prompt: 'Why does registering a `DbContext` as `Singleton` typically break an ASP.NET Core app?',
        options: [
          'Singleton services cannot be injected into controllers',
          'A single DbContext instance shared by concurrent requests has shared mutable state (change tracker, connection) and will throw "A second operation was started on this context" or corrupt data',
          'EF Core forbids the Singleton lifetime at registration time',
          'Singleton DbContexts cannot be disposed',
        ],
        correctIndex: 1,
        explanation: 'A `DbContext` is not thread-safe. Concurrent requests would race on the change tracker and on the single open connection. EF Core throws `InvalidOperationException: A second operation was started on this context before a previous operation completed`. Use `Scoped` (or `IDbContextFactory` for explicit construction).',
      },
      {
        kind: 'mcq',
        id: 'csharp-7-mcq-4',
        prompt: 'Given the registration `services.AddSingleton<IFoo, Foo>();` and `services.AddScoped<IBar, Bar>();` and `Foo` accepts `IBar` in its constructor — what happens at runtime?',
        options: [
          'Works fine — Singleton can consume Scoped',
          'On the first resolution, the DI container throws `InvalidOperationException` (when validated on scope) because a Singleton would capture a Scoped instance for the app lifetime — a "captive dependency"',
          'IBar is silently replaced with a fresh transient',
          'Compile-time error',
        ],
        correctIndex: 1,
        explanation: 'This is the classic *captive dependency* bug. A Singleton survives the whole app; the Scoped service it captures would outlive its intended scope — defeating the per-request lifetime contract. With scope validation enabled (default in Development), the container throws on resolution. Fix by injecting `IServiceScopeFactory` or making Foo Scoped.',
      },
      {
        kind: 'mcq',
        id: 'csharp-7-mcq-5',
        prompt: `Which compiled query pattern is correct?\n\n\`\`\`csharp\n// option A\nstatic readonly Func<AppDb, string, User?> GetByEmail =\n    EF.CompileQuery((AppDb db, string email) =>\n        db.Users.SingleOrDefault(u => u.Email == email));\n\n// option B\nstatic readonly Func<AppDb, string, User?> GetByEmail =\n    (db, email) => db.Users.SingleOrDefault(u => u.Email == email);\n\`\`\``,
        options: ['Only option A', 'Only option B', 'Both compile and are equivalent', 'Neither — EF.CompileQuery requires an IQueryable return'],
        correctIndex: 0,
        explanation: 'Option A is correct: `EF.CompileQuery` pre-compiles the expression tree once and reuses the plan on every call. Option B is a regular lambda — it re-parses the expression tree on every call, defeating the optimization. The delegate signature `Func<AppDb, string, User?>` is the same; the difference is who does the compilation work.',
      },
      {
        kind: 'mcq',
        id: 'csharp-7-debug-1',
        prompt: `EF Core throws at runtime:\n\`\`\`\nSystem.InvalidOperationException: A second operation was started on this context instance before a previous operation completed.\n\`\`\`\nThe code:\n\`\`\`csharp\nusing System.Linq;\nusing System.Threading.Tasks;\nnamespace MyApp;\npublic class ReportService\n{\n    private readonly AppDbContext _db;\n    public ReportService(AppDbContext db) => _db = db;\n    public async Task<int[]> GetIdsAsync()\n    {\n        return await _db.Orders\n            .Select(o => o.Id)\n            .ToArrayAsync();\n    }\n    public async Task ProcessAllAsync()\n    {\n        var ids = _db.Orders.Select(o => o.Id);\n        await foreach (var id in ids.AsAsyncEnumerable())\n        {\n            var detail = await GetIdsAsync();\n        }\n    }\n}\n\`\`\`\nWhat is the fix?`,
        options: [
          'Register `AppDbContext` as Singleton so one instance handles all calls',
          'EF Core does not support concurrent operations on one context. Materialize the outer query first with `.ToListAsync()` before the loop, or open a second context via `IDbContextFactory<AppDbContext>` for the inner call.',
          'Replace `AsAsyncEnumerable()` with `ToListAsync()` to avoid async streaming',
          'Add `ConfigureAwait(false)` on the inner `await`',
        ],
        correctIndex: 1,
        explanation: 'A `DbContext` cannot run two database operations concurrently. The outer `AsAsyncEnumerable()` holds an open database reader while the inner `GetIdsAsync()` tries to start another command on the same context — EF Core throws. Fix: either materialize the outer query with `.ToListAsync()` before the loop (breaking the reader), or use `IDbContextFactory<T>` to create a separate context for the inner operation.',
      },
      {
        kind: 'mcq',
        id: 'csharp-7-debug-2',
        prompt: `EF Core silently does not save changes:\n\`\`\`csharp\nusing System.Threading.Tasks;\nnamespace MyApp;\npublic class ProductService\n{\n    private readonly AppDbContext _db;\n    public ProductService(AppDbContext db) => _db = db;\n    public async Task UpdatePriceAsync(int id, decimal price)\n    {\n        var product = await _db.Products\n            .AsNoTracking()\n            .FirstOrDefaultAsync(p => p.Id == id);\n        if (product is null) return;\n        product.Price = price;\n        await _db.SaveChangesAsync();\n    }\n}\n\`\`\`\nWhy are changes not persisted?`,
        options: [
          '`FirstOrDefaultAsync` does not load navigation properties',
          '`AsNoTracking()` returns a detached entity — the context does not watch it for changes, so `SaveChangesAsync` has nothing to save. Remove `AsNoTracking()` or re-attach the modified entity with `_db.Update(product)`.',
          '`SaveChangesAsync` must be called with a `CancellationToken`',
          'The `Price` property needs to be declared `virtual` for EF Core to track it',
        ],
        correctIndex: 1,
        explanation: '`AsNoTracking()` returns entities that are not in the change tracker. When you mutate `product.Price` and call `SaveChanges`, EF Core has no record of the entity and saves nothing. Fix: remove `AsNoTracking()` for read-modify-write operations, or explicitly call `_db.Update(product)` to attach and mark it as modified before saving.',
      },
      {
        kind: 'mcq',
        id: 'csharp-7-debug-3',
        prompt: `A unit test fails with:\n\`\`\`\nSystem.InvalidOperationException: Cannot resolve scoped service 'MyApp.Services.IOrderService' from root provider.\n\`\`\`\nThe registration:\n\`\`\`csharp\nbuilder.Services.AddSingleton<ReportGenerator>();\nbuilder.Services.AddScoped<IOrderService, OrderService>();\n\`\`\`\n\`ReportGenerator\` takes \`IOrderService\` in its constructor. What is the fix?`,
        options: [
          'Change `AddScoped<IOrderService>` to `AddSingleton<IOrderService>`',
          'Change `AddSingleton<ReportGenerator>` to `AddScoped<ReportGenerator>`, OR inject `IServiceScopeFactory` into `ReportGenerator` and create a scope per operation',
          'Remove `IOrderService` from `ReportGenerator`\'s constructor and resolve it manually',
          'Register `IOrderService` as both Scoped and Singleton so either lifetime can consume it',
        ],
        correctIndex: 1,
        explanation: 'This is the captive dependency problem: a Singleton cannot directly consume a Scoped service because the Singleton outlives any scope. The DI container throws when scope validation is enabled. Fix options: (1) make `ReportGenerator` Scoped (simplest), (2) inject `IServiceScopeFactory` and call `CreateScope()` per operation (appropriate when the singleton genuinely needs a transient scope), or (3) redesign so `ReportGenerator` depends on a Singleton service.',
      },
      {
        id: 'csharp-7-code-1',
        kind: 'code',
        prompt: 'Register `OrderService` as the implementation for `IOrderService` with a scoped lifetime in the `ServiceCollection`.',
        boilerplate: 'using Microsoft.Extensions.DependencyInjection;\nusing System;\n\nvar services = new ServiceCollection();\n// TODO: Register IOrderService with OrderService as a scoped dependency\nservices.AddScoped<IOrderService, OrderService>();\n\nvar provider = services.BuildServiceProvider();\nusing (var scope = provider.CreateScope())\n{\n    var service = scope.ServiceProvider.GetService<IOrderService>();\n    Console.WriteLine($"Service is: {service?.GetType().Name}");\n}\n\ninterface IOrderService {}\nclass OrderService : IOrderService {}',
        expectedOutput: 'Service is: OrderService',
        explanation: 'AddScoped registers a service that is instantiated once per container scope (such as per HTTP request).',
      },
    ],
  },
  {
    id: 'csharp-8',
    language: 'csharp',
    level: 8,
    title: 'Advanced ASP.NET Core — Middleware, Auth, gRPC & SignalR',
    timeEstimate: '20-22 hours',
    intro: `By the end of this phase, you'll read ASP.NET Core middleware registration order, policy-based authorization handlers, model binding with \`[ApiController]\`, and minimal API endpoint mapping, and predict their behavior. Middleware order bugs are among the hardest to debug because they produce silent misbehavior rather than exceptions. To build the muscle, you'll wire together a local \`notifications\` app with \`dotnet new webapi\`.`,
    topics: [
      {
        label: 'ASP.NET Core middleware',
        url: 'https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/',
      },
      {
        label: 'Policy-based authorization',
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
      'Build locally: a `notifications` ASP.NET Core app combining (1) a `TimingMiddleware` that logs elapsed ms via `ILogger`, (2) a `RequireRolePolicy` protecting an `/admin` endpoint, (3) a SignalR `NotificationsHub` broadcasting to all clients, and (4) a gRPC `EventFeed` service with server-streaming. Wire everything into a single `Program.cs`.',
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
        explanation: '`next(context)` invokes the next delegate in the middleware chain. Middleware can run code BEFORE and AFTER this call, enabling both inbound (request) and outbound (response) processing. Not calling `next` short-circuits the pipeline — useful for auth/blocking middleware.',
      },
      {
        kind: 'mcq',
        id: 'csharp-8-mcq-2',
        prompt: 'What is the primary advantage of `[ApiController]` on a controller class?',
        options: [
          'Enables MVC view rendering',
          'Automatically returns HTTP 400 with ProblemDetails when model validation fails, without manual ModelState checks',
          'Registers the controller as a singleton',
          'Disables routing for the controller',
        ],
        correctIndex: 1,
        explanation: '`[ApiController]` opts into API conventions: automatic `ModelState` validation → 400 ProblemDetails (RFC 9457), implicit `[FromBody]`/`[FromQuery]` parameter binding, and attribute routing requirement. This eliminates repetitive `if (!ModelState.IsValid) return BadRequest()` patterns.',
      },
      {
        kind: 'mcq',
        id: 'csharp-8-mcq-3',
        prompt: 'Why does `app.UseAuthentication()` need to be called BEFORE `app.UseAuthorization()` in `Program.cs`?',
        options: [
          'Because `UseAuthorization` populates `HttpContext.User`, which authentication consumes',
          'Because authentication establishes who the user is (`HttpContext.User`) and authorization decides what they may do — order matters because authorization reads what authentication wrote',
          'Order does not matter — these are equivalent calls',
          'Because both share the same internal state and the second overwrites the first',
        ],
        correctIndex: 1,
        explanation: 'Middleware runs in registration order. `UseAuthentication` parses tokens/cookies and sets `HttpContext.User`. `UseAuthorization` then evaluates policies against that user. Reversing the order means authorization sees an unauthenticated user → 401 even for valid requests.',
      },
      {
        kind: 'mcq',
        id: 'csharp-8-mcq-4',
        prompt: 'In policy-based authorization, where is the business rule for "user must own this resource" best expressed?',
        options: [
          'A custom `IAuthorizationFilter` that runs before model binding',
          'An `IAuthorizationHandler<TRequirement, TResource>` paired with `AuthorizationRequirement`, invoked by `IAuthorizationService.AuthorizeAsync(user, resource, "Policy")`',
          'Inline `if (User.Id != post.OwnerId)` checks in every endpoint',
          'A claim added at login time',
        ],
        correctIndex: 1,
        explanation: 'Resource-based authorization is the canonical pattern: an `IAuthorizationHandler<TRequirement, TResource>` gets the user AND the loaded resource and decides. Call `_authz.AuthorizeAsync(User, resource, "MustOwn")` from the endpoint. This centralises the policy, enables reuse, and keeps endpoints thin.',
      },
      {
        kind: 'mcq',
        id: 'csharp-8-mcq-5',
        prompt: 'SignalR vs gRPC server-streaming for real-time push to browsers — which is the right default and why?',
        options: [
          'gRPC — it is always faster than WebSockets',
          'SignalR — it auto-negotiates the best transport (WebSocket → SSE → long polling) and has a first-class JavaScript client; gRPC-Web is more limited in browsers and lacks streaming over HTTP/1.1',
          'They are interchangeable — pick by personal preference',
          'gRPC — SignalR is deprecated',
        ],
        correctIndex: 1,
        explanation: 'For browser-to-server push, SignalR is the natural choice: transport negotiation, automatic reconnect, hubs/groups, and a stable JS client. gRPC-Web exists but server-streaming over HTTP/1.1 is restricted and bidirectional streaming requires HTTP/2 + special server config — better suited to service-to-service.',
      },
      {
        kind: 'mcq',
        id: 'csharp-8-debug-1',
        prompt: `All requests to the app return 401 Unauthorized even though a valid JWT is sent. The \`Program.cs\`:\n\`\`\`csharp\nvar app = builder.Build();\napp.UseAuthorization();\napp.UseAuthentication();\napp.UseRouting();\napp.MapControllers();\napp.Run();\n\`\`\`\nWhat is wrong and what is the correct order?`,
        options: [
          'Move `MapControllers()` before `UseRouting()`',
          '`UseAuthentication()` must come before `UseAuthorization()`, and both must come after `UseRouting()`. Correct order: `UseRouting → UseAuthentication → UseAuthorization → MapControllers`.',
          'Add `app.UseCors()` before authorization to allow the JWT header through',
          'Replace `UseAuthorization()` with `app.UseJwtAuthentication()`',
        ],
        correctIndex: 1,
        explanation: 'Middleware order is critical. `UseRouting` must run first to determine which endpoint the request matches (authorization policies are endpoint-aware). `UseAuthentication` must run before `UseAuthorization` to populate `HttpContext.User`. The current code calls `UseAuthorization` before authentication, so the user is always unauthenticated → 401. Correct: Routing → Authentication → Authorization → Map.',
      },
      {
        kind: 'mcq',
        id: 'csharp-8-debug-2',
        prompt: `A minimal API endpoint always returns 400 even for valid JSON:\n\`\`\`csharp\nusing Microsoft.AspNetCore.Mvc;\nvar builder = WebApplication.CreateBuilder();\nbuilder.Services.AddControllers();\nvar app = builder.Build();\napp.MapPost("/orders", ([FromBody] CreateOrderRequest req) =>\n{\n    return Results.Ok(req);\n});\napp.Run();\npublic record CreateOrderRequest([Required] string CustomerName, decimal Amount);\n\`\`\`\nThe client sends: \`{"CustomerName":"Alice","Amount":99.99}\`. What is wrong?`,
        options: [
          'Minimal API endpoints do not support `[FromBody]` — use `[AsParameters]` instead',
          '`[Required]` validation attributes are not automatically enforced in minimal APIs the same way as `[ApiController]`. Add `builder.Services.AddEndpointsApiExplorer()` and call `app.UseRouting()` first.',
          'The record uses a primary constructor, which is incompatible with `System.Text.Json` binding',
          'Add `[ApiController]` to `CreateOrderRequest` to enable automatic model validation',
        ],
        correctIndex: 1,
        explanation: 'In minimal APIs, `[ApiController]` auto-validation does not apply — that is an MVC controller convention. Data annotation attributes on the model are not automatically enforced; you need to validate manually or register a validation filter via `app.AddValidation()` / `FluentValidation` integration. `[FromBody]` works fine in minimal APIs. The 400 is likely from a pipeline misconfiguration or a missing `app.UseRouting()` call.',
      },
      {
        kind: 'mcq',
        id: 'csharp-8-debug-3',
        prompt: `An endpoint that should be protected returns 200 without a token:\n\`\`\`csharp\nusing Microsoft.AspNetCore.Authorization;\nvar builder = WebApplication.CreateBuilder();\nbuilder.Services.AddAuthentication().AddJwtBearer();\nbuilder.Services.AddAuthorization();\nvar app = builder.Build();\napp.UseAuthentication();\napp.UseAuthorization();\napp.MapGet("/admin/dashboard", () => "secret data");\napp.Run();\n\`\`\`\nWhat is missing?`,
        options: [
          'Add `app.UseRouting()` before authentication',
          'The endpoint has no `[Authorize]` attribute or `.RequireAuthorization()` call — without it, the endpoint is anonymous by default',
          'Add `builder.Services.AddControllers()` to enable authorization on minimal APIs',
          'Replace `AddJwtBearer()` with `AddJwtBearer("Bearer", ...)` to name the scheme',
        ],
        correctIndex: 1,
        explanation: 'Authorization middleware is in the pipeline, but the endpoint itself is not marked as requiring authorization. In minimal APIs, either call `.RequireAuthorization()` on the endpoint: `app.MapGet("/admin/dashboard", ...).RequireAuthorization()`, or configure a fallback policy that requires authentication for all endpoints via `builder.Services.AddAuthorization(o => o.FallbackPolicy = o.DefaultPolicy)`.',
      },
      {
        id: 'csharp-8-code-1',
        kind: 'code',
        prompt: 'Complete the custom middleware `InvokeAsync` method to call the next middleware in the pipeline using `_next`.',
        boilerplate: 'using Microsoft.AspNetCore.Http;\nusing System;\nusing System.Threading.Tasks;\n\nvar context = new DefaultHttpContext();\nRequestDelegate next = (ctx) => {\n    Console.WriteLine("Request processed");\n    return Task.CompletedTask;\n};\n\nvar middleware = new SimpleMiddleware(next);\nawait middleware.InvokeAsync(context);\n\npublic class SimpleMiddleware\n{\n    private readonly RequestDelegate _next;\n    public SimpleMiddleware(RequestDelegate next) => _next = next;\n\n    public async Task InvokeAsync(HttpContext context)\n    {\n        Console.WriteLine("Before request");\n        // TODO: Invoke the next delegate in the pipeline using _next\n        await _next(context);\n    }\n}',
        expectedOutput: 'Request processed',
        explanation: 'Middleware components are chained together. Awaiting `_next(context)` passes execution control to the next middleware in the ASP.NET Core pipeline.',
      },
    ],
  },
  {
    id: 'csharp-9',
    language: 'csharp',
    level: 9,
    title: 'Roslyn Analyzers, Source Generators & AOT',
    timeEstimate: '22-25 hours',
    intro: `By the end of this phase, you'll read Roslyn diagnostic analyzer registrations, incremental source generator pipelines, \`JsonSerializerContext\` AOT patterns, and trimming annotations, and predict their behavior. AOT trimming warnings are the class of build errors most teams encounter first when adopting Native AOT — understanding them lets you fix them systematically. To build the muscle, you'll write a packaged analyzer NuGet and verify it with \`dotnet pack\` and \`dotnet test\`.`,
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
      'Build locally: a Roslyn analyzer + code-fix NuGet that warns (`AWAIT001`) when a library project calls `await someTask` without `ConfigureAwait(false)` and offers a fix that inserts it. Add an incremental source generator that emits `ToString()` overrides for any class decorated with `[GenerateToString]`. Package via `dotnet pack` and reference from a separate test project to verify the diagnostic fires.',
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
        explanation: 'Native AOT produces native machine code with all types resolved statically. Dynamic assembly loading would require a JIT and IL interpretation infrastructure that is deliberately excluded. Code that needs to ship in an AOT binary must avoid `Assembly.Load`, `Type.GetType("...")`, `Activator.CreateInstance` of unknown types, and reflection-driven serializers — use source generation instead.',
      },
      {
        kind: 'mcq',
        id: 'csharp-9-mcq-2',
        prompt: 'In an incremental source generator, why should you prefer `IncrementalValueProvider` pipelines over `GeneratorExecutionContext.Compilation`?',
        options: [
          'They support more file types',
          'They cache intermediate results, so only changed syntax nodes trigger regeneration — avoiding full re-runs on every keystroke',
          'They are required by the Roslyn API in .NET 8+',
          'They allow async operations inside the generator',
        ],
        correctIndex: 1,
        explanation: 'Incremental generators were introduced specifically to fix the perf problems of V1 (`ISourceGenerator`). Each pipeline stage memoizes its output keyed by input equality, so unchanged inputs reuse cached results. The result is sub-100ms re-generation in the IDE on each keystroke.',
      },
      {
        kind: 'mcq',
        id: 'csharp-9-mcq-3',
        prompt: `What does this program print when AOT-compiled?\n\n\`\`\`csharp\nusing System;\nusing System.Text.Json;\nusing System.Text.Json.Serialization;\n\nrecord Person(string Name, int Age);\n\n[JsonSerializable(typeof(Person))]\npartial class AppJsonContext : JsonSerializerContext { }\n\nPerson p = new("Alice", 30);\nstring json = JsonSerializer.Serialize(p, AppJsonContext.Default.Person);\nConsole.WriteLine(json);\n\`\`\``,
        options: [
          '`{"Name":"Alice","Age":30}`',
          '`{"name":"alice","age":30}`',
          '`Person { Name = Alice, Age = 30 }`',
          'Runtime error: AOT cannot serialize records',
        ],
        correctIndex: 0,
        explanation: 'The `JsonSerializerContext` source generator emits a `TypeInfo<Person>` at compile time. Calling `AppJsonContext.Default.Person` selects the generated metadata — no reflection. The default `JsonNamingPolicy` is PascalCase. AOT happily uses this path; the reflection-based `JsonSerializer.Serialize(p)` overload would warn or fail.',
      },
      {
        kind: 'mcq',
        id: 'csharp-9-mcq-4',
        prompt: 'You write an analyzer rule. Which method must be overridden on `DiagnosticAnalyzer` to register the rule and its callbacks?',
        options: [
          '`SupportedDiagnostics` only',
          '`Initialize(AnalysisContext)` — call `RegisterSyntaxNodeAction` / `RegisterSymbolAction` etc. here, AFTER `EnableConcurrentExecution` and `ConfigureGeneratedCodeAnalysis`',
          '`Execute(GeneratorContext)`',
          '`OnCompilationEnd(Compilation)`',
        ],
        correctIndex: 1,
        explanation: '`Initialize` is the entry point. Best practice is to immediately call `context.EnableConcurrentExecution()` and `context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.None)`, then register actions. `SupportedDiagnostics` exposes the descriptors but does not wire callbacks.',
      },
      {
        kind: 'mcq',
        id: 'csharp-9-mcq-5',
        prompt: 'You ship an analyzer with `DiagnosticSeverity.Warning`. A team using your NuGet wants to make it an error in CI but suppress it for legacy files. What is the cleanest way?',
        options: [
          'Modify the analyzer to read an env var',
          'Use `.editorconfig`: set `dotnet_diagnostic.AWAIT001.severity = error` globally and `[*Legacy*.cs] dotnet_diagnostic.AWAIT001.severity = none` for legacy files',
          'Suppress with `#pragma warning disable AWAIT001` in every file',
          'Add a `[SuppressMessage]` attribute on every offending member',
        ],
        correctIndex: 1,
        explanation: '`.editorconfig` is the canonical Roslyn-aware config: severities are set per-rule and overridable per-file-pattern using INI-style sections like `[*Legacy*.cs]`. This keeps the analyzer DLL config-free and lets every team tune severity without touching code.',
      },
      {
        kind: 'mcq',
        id: 'csharp-9-debug-1',
        prompt: `An analyzer emits a false positive on auto-generated code in obj/. The rule ID is MYLIB001. Users are suppressing it with \`#pragma\` everywhere. What is the right fix in the analyzer itself?`,
        options: [
          'Change `DiagnosticSeverity` to `Hidden` so it never shows up',
          'In `Initialize`, call `context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.None)` to opt out of analyzing generated code',
          'Filter by file path in the action callback: `if (ctx.Node.SyntaxTree.FilePath.Contains("obj")) return;`',
          'Add the rule to `.editorconfig` with `severity = none` for `[*.g.cs]` files',
        ],
        correctIndex: 1,
        explanation: '`ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.None)` is the correct API to prevent the analyzer from running on compiler-generated and designer-generated files. The `.editorconfig` approach works for the consuming team but not transparently for all NuGet consumers. Path filtering is fragile. Hiding the diagnostic removes value for all files.',
      },
      {
        kind: 'mcq',
        id: 'csharp-9-debug-2',
        prompt: `An AOT-published app throws at runtime:\n\`\`\`\nSystem.NotSupportedException: Reflection-based serialization has been disabled.\n\`\`\`\nThe code:\n\`\`\`csharp\nusing System.Text.Json;\nnamespace MyApp;\npublic class ApiClient\n{\n    public string Serialize<T>(T value)\n    {\n        return JsonSerializer.Serialize(value);\n    }\n}\n\`\`\`\nWhat is the fix?`,
        options: [
          'Add `[JsonInclude]` to every property on `T`',
          'Create a `JsonSerializerContext` with `[JsonSerializable(typeof(T))]` and pass `context.Options` to `JsonSerializer.Serialize`. For generic `T`, generate contexts for each concrete type used.',
          'Add `<PublishAot>false</PublishAot>` to the project file to disable AOT',
          'Replace `JsonSerializer` with `System.Xml.Serialization.XmlSerializer`',
        ],
        correctIndex: 1,
        explanation: 'Native AOT disables reflection-based JSON serialization. The fix is source generation: create a `JsonSerializerContext` subclass annotated with `[JsonSerializable(typeof(YourType))]`, then pass `context.Options` or the specific `TypeInfo<T>` to `JsonSerializer.Serialize`. This generates all type metadata at compile time, AOT-compatible.',
      },
      {
        kind: 'mcq',
        id: 'csharp-9-debug-3',
        prompt: `The build emits ILLink/trimmer warning IL2057 on this code:\n\`\`\`csharp\nusing System;\nnamespace MyApp;\npublic class PluginLoader\n{\n    public object? Load(string typeName)\n    {\n        var type = Type.GetType(typeName);\n        return type is null ? null : Activator.CreateInstance(type);\n    }\n}\n\`\`\`\nWhat does IL2057 mean and what is the correct approach?`,
        options: [
          'IL2057 means the type name string is too long; split it across multiple calls',
          'IL2057 warns that `Type.GetType(string)` with a runtime string argument means the trimmer cannot determine which type to preserve; refactor to use a known-type factory or annotate with `[DynamicallyAccessedMembers]` on the parameter',
          'Add `[assembly: TrimmerRootDescriptor("linker.xml")]` to preserve all types',
          'IL2057 is only emitted in Debug builds; publish with `Release` configuration to suppress it',
        ],
        correctIndex: 1,
        explanation: 'IL2057 fires because `Type.GetType(typeName)` with a non-constant string is opaque to the trimmer — it cannot know which types to keep. Solutions: (1) if the type set is known at compile time, use a `switch`/dictionary keyed by string; (2) annotate the `typeName` parameter with `[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicParameterlessConstructor)]` to make the contract explicit; (3) use source generators to avoid reflection entirely.',
      },
      {
        id: 'csharp-9-code-1',
        kind: 'code',
        prompt: 'Add the `JsonSerializable` attribute to the `AppJsonContext` partial class to generate source-generated serialization metadata for the `Person` type.',
        boilerplate: 'using System;\nusing System.Text.Json;\nusing System.Text.Json.Serialization;\n\nvar person = new Person { Name = "Bob" };\nstring json = JsonSerializer.Serialize(person, AppJsonContext.Default.Person);\nConsole.WriteLine(json);\n\npublic class Person\n{\n    public string Name { get; set; } = "";\n}\n\n// TODO: Add the JsonSerializable attribute for the Person class here\n[JsonSerializable(typeof(Person))]\ninternal partial class AppJsonContext : JsonSerializerContext\n{\n}',
        expectedOutput: '{"Name":"Bob"}',
        explanation: 'The `[JsonSerializable]` attribute tells the source generator to generate reflection-free serialization metadata for that type, enabling Native AOT compatibility.',
      },
    ],
  },
  {
    id: 'csharp-10',
    language: 'csharp',
    level: 10,
    title: '.NET Internals — GC, JIT, Unsafe Code & Native AOT',
    timeEstimate: '25-30 hours',
    intro: `By the end of this phase, you'll read GC generation analysis from \`dotnet-counters\` output, P/Invoke marshalling declarations, \`stackalloc\`/\`Unsafe.As\` usage, and tiered-compilation behavior, and predict their performance implications. Runtime internals knowledge separates engineers who fix production hotspots from those who guess. To build the muscle, you'll write a Native AOT CLI locally with \`dotnet publish -r linux-x64 -p:PublishAot=true\` and benchmark with \`hyperfine\`.`,
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
      'Build locally: an AOT-compiled native CLI tool (`PublishAot=true`, `TrimMode=full`) that calls `strlen` from libc (or `msvcrt`) via `[LibraryImport]`, wraps the buffer in a `ReadOnlySpan<byte>`, and prints the result. Verify cold-start under 50ms with `hyperfine`. Produce a `GcReport` showing gen-0/1/2 collection counts under load using `dotnet-counters monitor`.',
    checks: [
      {
        kind: 'mcq',
        id: 'csharp-10-mcq-1',
        prompt: 'What is the Pinned Object Heap (POH) introduced in .NET 5?',
        options: [
          'A heap segment for objects pinned with GCHandle — created on demand',
          'A dedicated heap region for pinned allocations that avoids fragmenting the regular gen-0/1/2 heaps',
          'The Large Object Heap renamed',
          'An off-heap region for native memory allocations',
        ],
        correctIndex: 1,
        explanation: 'The POH solves a long-standing fragmentation problem: when buffers are pinned for P/Invoke or socket I/O, the regular generational heaps cannot compact around them. By segregating pinned objects (via `GC.AllocateArray<T>(length, pinned: true)`) into the POH, the rest of the heap stays compact and the GC stays fast.',
      },
      {
        kind: 'mcq',
        id: 'csharp-10-mcq-2',
        prompt: `What does this program print (space-separated on one line)?\n\n\`\`\`csharp\nusing System;\n\nSpan<int> squares = stackalloc int[4];\nfor (int i = 0; i < squares.Length; i++)\n    squares[i] = i * i;\nforeach (int v in squares)\n    Console.Write(v + " ");\n\`\`\``,
        options: ['0 1 2 3', '0 1 4 9', '1 4 9 16', 'Compile error: stackalloc requires unsafe'],
        correctIndex: 1,
        explanation: '`stackalloc int[4]` allocates 16 bytes on the stack and can be assigned to `Span<int>` without `unsafe` in modern C#. The loop writes squares: `0*0=0`, `1*1=1`, `2*2=4`, `3*3=9`. `Console.Write` joins them with " " producing `0 1 4 9 `.',
      },
      {
        kind: 'mcq',
        id: 'csharp-10-mcq-3',
        prompt: `What does this P/Invoke call print on Linux/macOS?\n\n\`\`\`csharp\nusing System;\nusing System.Runtime.InteropServices;\n\nstatic partial class NativeMethods\n{\n    [LibraryImport("libc", EntryPoint = "abs")]\n    public static partial int Abs(int value);\n}\n\nConsole.WriteLine(NativeMethods.Abs(-42));\n\`\`\``,
        options: ['-42', '42', '0', 'Throws DllNotFoundException'],
        correctIndex: 1,
        explanation: '`[LibraryImport]` (C# 11+) is the source-generated, AOT-friendly replacement for `[DllImport]`. The `static partial` declaration lets the generator emit the marshalling stub. `libc`\'s `abs(-42)` returns 42. On Windows you would use `"msvcrt"` instead of `"libc"`.',
      },
      {
        kind: 'mcq',
        id: 'csharp-10-mcq-4',
        prompt: 'A method spends 95% of its time inside a hot loop. The runtime has tiered compilation enabled. Which statement is most accurate?',
        options: [
          'The JIT compiles the method to optimized code immediately at first call',
          'The first call uses Tier-0 (fast, minimal-opt) machine code; once the method has run enough, the runtime triggers Tier-1 re-compilation with full optimizations and (with dynamic PGO) profile-driven inlining',
          'Tiered compilation has no effect — JIT output is identical at every call',
          'Tier-1 is only used for AOT-compiled methods',
        ],
        correctIndex: 1,
        explanation: 'Tiered compilation starts methods at Tier-0 to minimize startup latency, then promotes hot methods to Tier-1 with full optimisations. With dynamic PGO (default in .NET 8+), profile counters guide devirtualisation and inlining. AOT bypasses this entirely — code is pre-compiled once with full optimisations.',
      },
      {
        kind: 'mcq',
        id: 'csharp-10-mcq-5',
        prompt: 'A `byte[]` instance that exceeds 85,000 bytes is allocated. Which heap does it land in by default and why?',
        options: [
          'Gen-0 — small allocations always start there',
          'The Large Object Heap (LOH) — objects ≥ 85,000 bytes skip gen-0 because copying them during gen-0 compaction would be too expensive; LOH is collected only on gen-2 collections',
          'The Pinned Object Heap — only because byte arrays are pinnable',
          'Off-heap — managed allocations cannot exceed 85,000 bytes',
        ],
        correctIndex: 1,
        explanation: 'The LOH threshold has been 85,000 bytes since .NET Framework 1.0. Large objects skip generational promotion (they would be too costly to copy) and live until a gen-2 (full) collection finds them unreachable. LOH is NOT compacted by default — long-running services that churn LOH should use `ArrayPool<T>` or set `<GCLargeObjectHeapCompactionMode>` to occasionally compact.',
      },
      {
        kind: 'mcq',
        id: 'csharp-10-debug-1',
        prompt: `A load test shows throughput dropping 40% after 10 minutes. \`dotnet-counters monitor\` shows:\n\`\`\`\ngen-0-gc-count                          1200/s\ngen-1-gc-count                           300/s\ngen-2-gc-count                            80/s\nalloc-rate                              450 MB/s\n\`\`\`\nThe hot path:\n\`\`\`csharp\nusing System.Linq;\nnamespace MyApp;\npublic class ReportBuilder\n{\n    public byte[] BuildReport(int[] data)\n    {\n        return data.Select(x => (byte)(x % 256)).ToArray();\n    }\n}\n\`\`\`\nWhat is wrong and how do you fix it?`,
        options: [
          'Use `GC.Collect()` before each call to `BuildReport` to reduce pressure',
          '`ToArray()` allocates a new `byte[]` on every call, driving high gen-0 GC rate. Fix: accept a `Memory<byte>` output buffer from the caller or rent from `ArrayPool<byte>.Shared` and return a count instead.',
          'Replace `Select` with a `for` loop — LINQ has overhead',
          'Increase the server GC thread count via `GCHeapCount` in `runtimeconfig.json`',
        ],
        correctIndex: 1,
        explanation: '1200 gen-0 collections/s at 450 MB/s alloc rate means short-lived allocations are flooding the GC. `ToArray()` on every hot-path call is the source. The canonical fix is the caller-allocated buffer pattern: the caller rents a buffer from `ArrayPool<byte>.Shared`, passes it in, and returns it after use. Calling `GC.Collect()` manually hurts throughput further — it blocks all threads and should never be on a hot path.',
      },
      {
        kind: 'mcq',
        id: 'csharp-10-debug-2',
        prompt: `A P/Invoke call corrupts memory on Windows:\n\`\`\`csharp\nusing System;\nusing System.Runtime.InteropServices;\nnamespace MyApp;\npublic static partial class NativeMethods\n{\n    [LibraryImport("kernel32.dll", EntryPoint = "GetComputerNameW",\n        StringMarshalling = StringMarshalling.Utf16)]\n    public static partial bool GetComputerName(\n        string lpBuffer,\n        ref uint nSize);\n}\npublic class Program\n{\n    public static void Main()\n    {\n        string buf = new string('\\0', 256);\n        uint size = 256;\n        NativeMethods.GetComputerName(buf, ref size);\n        Console.WriteLine(buf.Trim('\\0'));\n    }\n}\n\`\`\`\nWhat is the marshalling bug?`,
        options: [
          '`StringMarshalling.Utf16` should be `StringMarshalling.Utf8` for Windows APIs',
          '`string` is immutable in .NET — passing a `string` as `lpBuffer` for the native function to write into is undefined behavior. Use a `char[]` or `StringBuilder` as the output buffer, or declare the parameter as `Span<char>` with `[MarshalAs(UnmanagedType.LPWStr)]`.',
          'The `ref uint` parameter should be `out uint` to match the Win32 signature',
          '`GetComputerNameW` requires `unsafe` context to call',
        ],
        correctIndex: 1,
        explanation: '.NET strings are immutable. Passing a `string` as a writable buffer to a native function that writes into it via a pointer violates the immutability contract and can corrupt the runtime heap. The correct pattern is a `char[]` of the expected size, or a `StringBuilder`: `var sb = new StringBuilder(256); NativeMethods.GetComputerName(sb, ref size); Console.WriteLine(sb);`. With `[LibraryImport]` and `Span<char>` marshalling, the generator can produce safe stub code.',
      },
      {
        kind: 'mcq',
        id: 'csharp-10-debug-3',
        prompt: `A microservice CPU profile from \`dotnet-trace\` shows 30% of time in \`GC.Collect\`. The relevant code:\n\`\`\`csharp\nusing System;\nnamespace MyApp;\npublic class CacheService\n{\n    private readonly Dictionary<string, byte[]> _cache = new();\n    public void Set(string key, byte[] value)\n    {\n        _cache[key] = value;\n        if (_cache.Count % 100 == 0)\n            GC.Collect(2, GCCollectionMode.Forced);\n    }\n}\n\`\`\`\nWhat is wrong?`,
        options: [
          'Replace `GC.Collect(2)` with `GC.Collect(0)` to only collect gen-0',
          '`GC.Collect(2, GCCollectionMode.Forced)` triggers a full blocking gen-2 collection on every 100th insert, stalling all threads. Remove the explicit `GC.Collect` call — the runtime\'s GC heuristics are far better tuned. If memory is a concern, use `MemoryCache` with size limits instead of a raw dictionary.',
          'Increase `GCHeapHardLimit` in `runtimeconfig.json` to reduce collection frequency',
          'Call `GC.Collect` in a background `Task` so it does not block the hot path',
        ],
        correctIndex: 1,
        explanation: 'Forcing a gen-2 collection suspends all managed threads (stop-the-world) for potentially milliseconds on a large heap. Doing this on every 100th write at scale produces the exact throughput collapse seen here. `GC.Collect` should essentially never appear in library or service code. The .NET GC is adaptive — it collects when memory pressure warrants it. Removing the forced call will immediately improve throughput. For cache size control, `MemoryCache` or `IMemoryCache` with `SizeLimit` is the right tool.',
      },
      {
        id: 'csharp-10-code-1',
        kind: 'code',
        prompt: 'Allocate a block of memory for 3 integers on the stack using `stackalloc` and assign it to the `Span<int>`.',
        boilerplate: 'using System;\n\n// TODO: Allocate a span of 3 integers on the stack using stackalloc\nSpan<int> numbers = stackalloc int[3];\nnumbers[0] = 10;\nnumbers[1] = 20;\nnumbers[2] = 30;\n\nforeach (var val in numbers)\n{\n    Console.Write(val + " ");\n}',
        expectedOutput: '10 20 30',
        explanation: 'Using stackalloc allocates memory on the stack frame of the executing method, which is automatically reclaimed when the method returns, bypasses heap allocation, and is safe when wrapped in a Span.',
      },
    ],
  },
];
