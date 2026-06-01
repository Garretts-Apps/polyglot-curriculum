import type { Phase } from './types';

export const luaPhases: Phase[] = [
  // ─── Level 0 ─────────────────────────────────────────────────────────────
  {
    id: 'lua-0',
    language: 'lua',
    level: 0,
    title: 'Setup & Hello World',
    timeEstimate: '0.5-1 hours',
    intro: `Welcome to Lua, and welcome to programming! A computer program is just a list of instructions you write down so the computer can follow them, one after another. Lua is a tiny, fast, embeddable scripting language — the glue inside games (Roblox, World of Warcraft), config systems (Redis, Nginx via OpenResty), and embedded devices. Its whole appeal is that it is small and friendly, which makes it a great first language. In this level you'll install the standalone \`lua\` interpreter (the program that *reads* your Lua instructions and *does* them), confirm its version, and write your very first program. If you have never programmed before, you are in exactly the right place — we will not assume you know anything.

Here is the entire first program — one single line:

\`\`\`lua
print("Hello, World!")
\`\`\`

It has just three pieces. Here is what each one is called:

\`\`\`
print ( "Hello, World!" )
└─┬─┘ │ └──────┬──────┘ │
  │   │        │        └─ closing parenthesis
  │   │        └─ a string (the text to show)
  │   └─ opening parenthesis (the "hand-in" slot)
  └─ the name of a built-in function
\`\`\`

Let's read it slowly, left to right, the way the computer does. For each piece we'll answer four questions: *what is this word?*, *what job does it do here?*, *what breaks if I remove it?*, and *what is actually sitting in the computer's memory when the program runs?*

- \`print\` — **What is it?** The name of a *function*: a named action the computer already knows how to do (programmers also call this a "command" or "built-in"). **What job?** The word \`print\` is a bit old-fashioned — it does NOT send anything to a paper printer; it means "show this text on the screen." Lua already has \`print\` built in, so just writing the name is enough for Lua to find it. **Remove it?** Without a function name there is nothing to run — the line is meaningless, or if you mistype it as \`prnt\` Lua stops and complains it has never heard of \`prnt\`. **In memory?** \`print\` is itself a value living in memory — specifically a *function value* — and the name \`print\` points at it, the same way a contact name in your phone points at a phone number.
- \`( )\` — **What are they?** The round brackets (parentheses) right after a function's name. **What job?** They mean "run this function now, and here is the information to run it with." Think of \`print\` as a vending machine and the parentheses as the slot you drop your coin into: whatever you place between \`(\` and \`)\` is handed to \`print\` to work on. Every function call needs this pair, even when nothing is inside them (\`print()\` prints an empty line). **Remove them?** Then \`print\` is only *mentioned*, never *run* — Lua just looks at the function value and shrugs; nothing appears on screen. **In memory?** The parentheses themselves aren't stored — they're an instruction to the interpreter to perform a *call* and to pass along whatever is inside.
- \`"Hello, World!"\` — **What is it?** A piece of text. In programming a piece of text is called a **string** (imagine letters strung together like beads on a string). **What job?** It's the actual information we hand to \`print\`. The double quotes \`"\` are fences that mark exactly where the text starts and stops; everything between them — here the 13 characters \`Hello, World!\` — is the literal text. The quotes are *not* part of the text and never appear on screen. **Remove them?** Delete the quotes and Lua reads \`Hello\` as the name of some command it doesn't recognise, and errors out. **In memory?** While the program runs, the string \`Hello, World!\` exists as a value in memory, and it is that value which gets handed to \`print\`.

Put it together: "Run the built-in \`print\` function, handing it the string \`Hello, World!\`." When the program runs, the words \`Hello, World!\` appear on your screen, followed by Lua moving to a fresh line. That's it — there is no setup, no \`main\`, no imports, and no semicolon needed. To run it, save the line in a file called \`hello.lua\` and type \`lua hello.lua\` in your terminal. Absolute beginners start here.`,
    topics: [
      {
        label: 'Lua download',
        url: 'https://www.lua.org/download.html',
        note: 'Official sources; most platforms install via a package manager (brew install lua, apt install lua5.4).',
      },
      {
        label: 'Lua 5.4 Reference Manual',
        url: 'https://www.lua.org/manual/5.4/',
        note: 'The complete, authoritative language reference — short enough to read end to end.',
      },
      {
        label: 'Programming in Lua (first edition, free online)',
        url: 'https://www.lua.org/pil/contents.html',
        note: "PiL — the canonical book by Lua's lead designer, Roberto Ierusalimschy.",
      },
    ],
    deliverable: 'Run `lua -v` in your terminal, then execute a script that prints a greeting.',
    checks: [
      {
        kind: 'code',
        id: 'lua-0-code-1',
        prompt: 'Run this program to print `Hello, World!` to standard output.',
        boilerplate: 'print("Hello, World!")\n',
        expectedOutput: 'Hello, World!',
        explanation:
          'Reading this one line token by token: `print` is the name of a built-in **function** — a named action Lua already knows. It means "show text on the screen" (not "send to a paper printer"). The `( )` parentheses right after the name are how you **hand information in** to the function; whatever sits between them is the value `print` will work on. Remove the parentheses and `print` is only *named*, never *run*, so nothing appears. `"Hello, World!"` is a **string** — a piece of text. The double quotes `"` are fences marking where the text begins and ends; they are not part of the text and never show on screen. Delete a quote and Lua mistakes `Hello` for a command name and errors. So the whole line says: "run `print`, handing it the text `Hello, World!`." At runtime the characters `Hello, World!` are held in memory as a string value, passed to `print`, and written to standard output followed by a newline. Lua needs no boilerplate at all — no `main`, no imports, no semicolons. (When given several values, `print` separates them with a tab and still ends with one newline.)',
      },
      {
        kind: 'mcq',
        id: 'lua-0-mcq-1',
        prompt: 'How do you run a Lua script file named `hello.lua` from a terminal?',
        options: ['`lua hello.lua`', '`run hello.lua`', '`lua compile hello.lua`', '`./hello.lua` always works without a shebang'],
        correctIndex: 0,
        explanation:
          'The standalone interpreter is invoked as `lua scriptname.lua`. Lua compiles to bytecode internally and runs it immediately — there is no separate compile step like C or Go. See the [Lua manual §7](https://www.lua.org/manual/5.4/manual.html#7) on the standalone interpreter.',
      },
      {
        kind: 'mcq',
        id: 'lua-0-mcq-2',
        prompt: 'Which line writes a single-line comment in Lua?',
        options: ['`# this is a comment`', '`// this is a comment`', '`-- this is a comment`', '`; this is a comment`'],
        correctIndex: 2,
        explanation:
          'Lua uses `--` for line comments and `--[[ ... ]]` for block comments. `#` is reserved for the length operator (and the shebang on line 1), `//` is integer floor-division in Lua 5.3+, and `;` is an optional statement separator.',
      },
    ],
  },

  // ─── Level 1 ─────────────────────────────────────────────────────────────
  {
    id: 'lua-1',
    language: 'lua',
    level: 1,
    title: 'Lua Basics — Values, Types & Variables',
    timeEstimate: '4-6 hours',
    intro: `Before we touch Lua's type system, let's nail down four words you'll hear constantly: *statement*, *value*, *variable*, and *type*. A program is a list of **statements** — single complete instructions, read top to bottom. The line \`print("hi")\` is one statement; so is \`local x = 5\`. (Lua doesn't need a \`;\` at the end of each statement the way some languages do; a new line is enough.) A **value** is a single piece of data the computer is holding right now — the number \`42\`, the text \`"Ada"\`, the truth-fact \`true\`. A **variable** is a *name you give to a value* so you can refer to it later — like sticking a labelled sticky-note onto a box so you can find what's inside without opening it. In Lua you create one by writing \`local name = value\`, for example \`local age = 36\`. Read the \`=\` here as "is set to," not "equals" in the maths sense: it takes the value on the right and stores it under the name on the left. (Testing whether two things are equal is a *different* operator, \`==\`, which you'll meet in the next level.) The word \`local\` is a promise that this name only lives inside the current chunk of code — always start with \`local\`, because a name written *without* it silently becomes a **global** that's visible to your whole program, which is a classic beginner bug. Once declared, you can use \`age\` anywhere a value is expected, e.g. \`print(age)\`, and you can change it later with another \`age = 37\` (no \`local\` needed the second time — it already exists).

A **function** is a reusable mini-program with a name: you hand it some inputs (the values in the parentheses, called *arguments*), it does some work, and it may hand back a result. You already met one — \`print\` — and you'll write your own this level with \`local function name(inputs) ... end\`, where everything between the function's first line and its \`end\` is the work it does. The huge payoff is that you write the steps *once* and then *call* the function by name as many times as you like.

A **type** is simply "what *kind* of value this is." A number behaves differently from a piece of text — you can add two numbers, but adding two sentences makes no sense — so every value carries a type that tells Lua which operations are allowed. You can ask any value its type with the built-in \`type(x)\` function, which hands back a string naming the kind, e.g. \`type(42)\` gives \`"number"\`. Lua has exactly **eight** basic types: \`nil\` (the special "nothing here yet" value), \`boolean\` (\`true\` or \`false\`), \`number\`, \`string\` (text), \`function\` (a named action — yes, functions are values too, which is why \`type(print)\` is \`"function"\`), \`table\` (Lua's all-purpose container, covered later), and the two advanced ones \`userdata\` and \`thread\`.

By the end of this phase you'll predict the output of small Lua programs and explain all eight types. You'll also internalise the rules that trip up newcomers: variables are **global by default** (so use \`local\`!), \`nil\` and \`false\` are the *only* falsy values (\`0\` and the empty string \`""\` are truthy!), and there is exactly one \`number\` type that since Lua 5.3 distinguishes integer and float *subtypes*. One more Lua quirk to meet early: to glue two strings together you use the \`..\` operator (two dots), e.g. \`"Hello, " .. name\`; the plain \`+\` is reserved strictly for adding numbers.

To build the muscle, write a script locally that declares a few \`local\` values, concatenates them with \`..\` (which auto-coerces numbers to text), and uses \`type(x)\` and \`#s\` (the \`#\` operator gives a string's length) to inspect them. Run it with \`lua scratch.lua\` and watch how \`print(1 == 1.0)\` and \`print(10 // 3)\` behave.`,
    topics: [
      { label: 'PiL — Types and Values', url: 'https://www.lua.org/pil/2.html', note: 'The eight basic types, walked through with examples.' },
      { label: 'Manual §2.1 — Values and Types', url: 'https://www.lua.org/manual/5.4/manual.html#2.1', note: 'Authoritative definition of every type, including integer vs float.' },
      { label: 'Manual §3.4.6 — Concatenation', url: 'https://www.lua.org/manual/5.4/manual.html#3.4.6', note: 'The `..` operator and string/number coercion rules.' },
      { label: 'PiL — Numbers', url: 'https://www.lua.org/pil/3.2.html', note: 'Numeric literals, integer/float subtypes, and arithmetic.' },
      { label: 'PiL — Assignment & local variables', url: 'https://www.lua.org/pil/4.2.html', note: 'Why `local` matters and how multiple assignment works.' },
    ],
    video: {
      title: 'Lua in 100 Seconds',
      youtubeId: 'jUuqBZwwkQw',
      channelName: 'Fireship',
      duration: '2 minutes',
    },
    deliverable: 'A scratch.lua that declares locals of each basic type and prints type(x), #s, and a coerced concatenation.',
    checks: [
      {
        kind: 'code',
        id: 'lua-1-code-1',
        prompt: 'Complete the program so it concatenates a string and a number into one line. `..` automatically coerces the number to a string.',
        boilerplate: 'local name = "Ada"\nlocal year = 1815\nprint(name .. " was born in " .. year)\n',
        expectedOutput: 'Ada was born in 1815',
        explanation:
          'The `..` operator concatenates strings, coercing numbers to their textual form automatically. Unlike many languages, Lua does NOT use `+` for strings — `+` always means numeric addition.',
      },
      {
        kind: 'code',
        id: 'lua-1-code-2',
        prompt: 'Compute the perimeter `a + b + c` of a triangle with sides 3, 4, 5 and print `perimeter=...`.',
        boilerplate: 'local a = 3\nlocal b = 4\nlocal c = 5\nlocal p = a + b + c\nprint("perimeter=" .. p)\n',
        expectedOutput: 'perimeter=12',
        explanation:
          'Arithmetic in Lua uses the familiar `+ - * /`. Note that `/` always yields a float in Lua 5.3+ (so `12/1` is `12.0`), while `+` between integers stays an integer. Use `//` for floor division.',
      },
      {
        kind: 'mcq',
        id: 'lua-1-mcq-1',
        prompt: `What does this program print?

\`\`\`lua
if 0 then
  print("truthy")
else
  print("falsy")
end
\`\`\``,
        options: ['`falsy`', '`truthy`', '`0`', 'Error: number is not a boolean'],
        correctIndex: 1,
        explanation:
          'In Lua, **only** `nil` and `false` are falsy. Every other value — including `0`, `""`, and empty tables — is truthy. This is a frequent gotcha for programmers coming from C, Python, or JavaScript. See [PiL §3.3](https://www.lua.org/pil/3.3.html).',
      },
      {
        kind: 'mcq',
        id: 'lua-1-mcq-2',
        prompt: 'A variable assigned at the top level *without* the `local` keyword is…',
        options: [
          'a syntax error — every variable must be declared `local`',
          'a global variable, visible everywhere and stored in the `_G` table',
          'scoped only to the current line',
          'automatically constant (read-only)',
        ],
        correctIndex: 1,
        explanation:
          'Lua variables are global by default; an undeclared name like `x = 5` creates a field `_G.x`. This is a notorious source of bugs (a typo silently creates a new global). Idiomatic Lua marks almost everything `local`, which is also faster. See [PiL §4.2](https://www.lua.org/pil/4.2.html).',
      },
      {
        kind: 'mcq',
        id: 'lua-1-mcq-3',
        prompt: `What does this program print?

\`\`\`lua
print(type(nil), type(10), type("hi"), type(print))
\`\`\``,
        options: [
          '`nil    number    string    function`',
          '`nil    integer    string    closure`',
          '`null    int    str    func`',
          '`0    10    hi    function`',
        ],
        correctIndex: 0,
        explanation:
          '`type()` returns a string naming one of the eight basic types. Note it returns `"number"` (not `"integer"`/`"float"` — those are *subtypes* you query with `math.type`), and functions report as `"function"`. `print` is itself a value of type function.',
      },
    ],
  },

  // ─── Level 2 ─────────────────────────────────────────────────────────────
  {
    id: 'lua-2',
    language: 'lua',
    level: 2,
    title: 'Control Flow — if, while, and the Two for Loops',
    timeEstimate: '4-6 hours',
    intro: `This phase makes you fluent in Lua's control structures. You'll write \`if/elseif/else/end\`, \`while ... do ... end\`, \`repeat ... until cond\` (the only loop whose body runs before the test), and the two flavours of \`for\`: the **numeric** \`for i = start, stop, step do\` and the **generic** \`for k, v in pairs(t) do\`. You'll also learn that Lua has no \`switch\`, no \`continue\` (use \`goto continue\` or restructure), no \`++\`, and that \`and\`/\`or\` return one of their operands — enabling the \`x = a or default\` idiom.

Build it locally: write a FizzBuzz from 1 to 20 using a numeric \`for\` and \`if/elseif\`, then a guessing-style loop using \`while\`. Remember the numeric \`for\` loop's bounds are evaluated **once** and the loop variable is local to the loop body.`,
    topics: [
      { label: 'PiL — Control Structures', url: 'https://www.lua.org/pil/4.3.html', note: 'if, while, repeat, and both for loops with examples.' },
      { label: 'Manual §3.3.4 — Control Structures', url: 'https://www.lua.org/manual/5.4/manual.html#3.3.4', note: 'Exact semantics of if/while/repeat.' },
      { label: 'Manual §3.3.5 — for Statement', url: 'https://www.lua.org/manual/5.4/manual.html#3.3.5', note: 'Numeric vs generic for, evaluation order of bounds.' },
      { label: 'PiL — Logical operators', url: 'https://www.lua.org/pil/3.3.html', note: 'and/or/not and the short-circuit return-operand behaviour.' },
      { label: 'Lua-users wiki — Goto Statement', url: 'https://lua-users.org/wiki/GotoStatement', note: 'How to emulate continue with `goto` (added in 5.2).' },
    ],
    video: {
      title: 'Lua Tutorial',
      youtubeId: 'iMacxZQMPXs',
      channelName: 'Derek Banas',
      duration: '1 hour',
    },
    deliverable: 'A fizzbuzz.lua (1–20) plus a loop that sums the numbers 1..100 with a numeric for.',
    checks: [
      {
        kind: 'code',
        id: 'lua-2-code-1',
        prompt: 'Use a numeric `for` loop to sum the integers from 1 to 100 and print `sum=...`.',
        boilerplate: 'local total = 0\nfor i = 1, 100 do\n  total = total + i\nend\nprint("sum=" .. total)\n',
        expectedOutput: 'sum=5050',
        explanation:
          'The numeric `for i = a, b do` runs with `i` taking each value from `a` to `b` inclusive. The loop variable is implicitly `local` and the bounds are computed once before iteration begins. The default step is 1.',
      },
      {
        kind: 'code',
        id: 'lua-2-code-2',
        prompt: 'Use a numeric `for` with a step to sum only the EVEN numbers from 2 to 20. The third value in `for i = 2, 20, 2` is the step. Print `evens=...`.',
        boilerplate: 'local total = 0\nfor i = 2, 20, 2 do\n  total = total + i\nend\nprint("evens=" .. total)\n',
        expectedOutput: 'evens=110',
        explanation:
          'A third expression in the numeric `for` sets the step. `for i = 2, 20, 2` yields 2, 4, …, 20. A negative step counts down (`for i = 10, 1, -1`). The loop stops once `i` passes the limit.',
      },
      {
        kind: 'code',
        id: 'lua-2-code-3',
        prompt: 'Use a `while` loop to count how many times you can halve 64 before reaching 1. Print `halvings=...`.',
        boilerplate: 'local n = 64\nlocal count = 0\nwhile n > 1 do\n  n = n / 2\n  count = count + 1\nend\nprint("halvings=" .. count)\n',
        expectedOutput: 'halvings=6',
        explanation:
          '`while cond do ... end` tests the condition before each iteration. 64 → 32 → 16 → 8 → 4 → 2 → 1 is six halvings. Note Lua has no `++`; you increment with `count = count + 1`.',
      },
      {
        kind: 'mcq',
        id: 'lua-2-mcq-1',
        prompt: `What does this print?

\`\`\`lua
local function classify(n)
  if n < 0 then
    return "neg"
  elseif n == 0 then
    return "zero"
  else
    return "pos"
  end
end
print(classify(0))
\`\`\``,
        options: ['`zero`', '`neg`', '`pos`', '`nil`'],
        correctIndex: 0,
        explanation:
          'Lua spells the chained branch `elseif` (one word) and closes the whole `if` with a single `end`. There is no `switch` statement — chained `elseif` is the idiomatic substitute. See [PiL §4.3](https://www.lua.org/pil/4.3.html).',
      },
      {
        kind: 'mcq',
        id: 'lua-2-mcq-2',
        prompt: `What is the value of \`x\` after this runs?

\`\`\`lua
local cfg = nil
local x = cfg or "default"
\`\`\``,
        options: ['`"default"`', '`nil`', '`true`', '`false`'],
        correctIndex: 0,
        explanation:
          '`or` returns its first operand if that operand is truthy, otherwise the second. Since `cfg` is `nil` (falsy), `x` becomes `"default"`. This `value or fallback` pattern is the idiomatic Lua way to supply defaults. Symmetrically, `and` returns the first operand if it is falsy, else the second.',
      },
      {
        kind: 'mcq',
        id: 'lua-2-mcq-3',
        prompt: 'Which loop guarantees its body executes at least once, testing the condition only *after* the first pass?',
        options: ['`repeat ... until cond`', '`while cond do ... end`', '`for i = 1, n do ... end`', '`do ... end`'],
        correctIndex: 0,
        explanation:
          '`repeat ... until cond` is Lua\'s post-test loop: the body runs, then `cond` is checked; it loops while the condition is *false* (note: `until`, not `while`). A plain `do ... end` is just a scoping block, not a loop. See [Manual §3.3.4](https://www.lua.org/manual/5.4/manual.html#3.3.4).',
      },
    ],
  },

  // ─── Level 3 ─────────────────────────────────────────────────────────────
  {
    id: 'lua-3',
    language: 'lua',
    level: 3,
    title: 'Functions — Multiple Returns & Varargs',
    timeEstimate: '4-6 hours',
    intro: `Functions are first-class values in Lua and have two superpowers most languages lack: **multiple return values** and **variadic arguments** (\`...\`). By the end of this phase you'll write functions that return several values at once (\`return q, r\`), capture them with multiple assignment (\`local q, r = divmod(17, 5)\`), understand how adjusting the number of values works (extra values are discarded, missing ones become \`nil\`), and use \`...\` plus \`select('#', ...)\` to handle any number of arguments.

Practice locally: write \`divmod(a, b)\` returning quotient and remainder, a \`sum(...)\` that folds over its varargs, and observe the truncation rule — \`print((f()))\` with extra parentheses keeps only the first return value.`,
    topics: [
      { label: 'PiL — Functions', url: 'https://www.lua.org/pil/5.html', note: 'Defining functions, the colon syntax preview, and call conventions.' },
      { label: 'PiL — Multiple Results', url: 'https://www.lua.org/pil/5.1.html', note: 'How multiple return values are adjusted in different contexts.' },
      { label: 'PiL — Variadic Functions', url: 'https://www.lua.org/pil/5.2.html', note: 'The `...` expression and `select`/`table.pack`.' },
      { label: 'Manual §3.4.11 — Function Definitions', url: 'https://www.lua.org/manual/5.4/manual.html#3.4.11', note: 'Syntax of function bodies, parameters, and varargs.' },
      { label: 'Manual §6.1 — select', url: 'https://www.lua.org/manual/5.4/manual.html#pdf-select', note: '`select("#", ...)` counts varargs; `select(n, ...)` skips the first n-1.' },
    ],
    deliverable: 'A small math.lua module with divmod (two returns), sum(...) (varargs), and a recursive factorial.',
    checks: [
      {
        kind: 'code',
        id: 'lua-3-code-1',
        prompt: 'Write a `local function` that returns the square of its argument, then print `sq=...` for 7.',
        boilerplate: 'local function square(n)\n  return n * n\nend\nprint("sq=" .. square(7))\n',
        expectedOutput: 'sq=49',
        explanation:
          '`local function name(args) ... end` defines a local function. `return` exits the function with the given value. Functions are first-class values you can store in variables, pass as arguments, and return from other functions.',
      },
      {
        kind: 'code',
        id: 'lua-3-code-2',
        prompt: 'Write a recursive `factorial(n)`. Base case: `factorial(0)` is 1. Print `fact=...` for 6.',
        boilerplate: 'local function factorial(n)\n  if n == 0 then\n    return 1\n  else\n    return n * factorial(n - 1)\n  end\nend\nprint("fact=" .. factorial(6))\n',
        expectedOutput: 'fact=720',
        explanation:
          'Recursion works because a `local function` name is in scope inside its own body (Lua treats `local function f` as declaring `f` *before* defining it). 6! = 720.',
        testCases: [
          { input: 'print("fact10=" .. factorial(10))', expectedOutput: 'fact10=3628800', description: 'factorial of 10' },
        ],
      },
      {
        kind: 'mcq',
        id: 'lua-3-mcq-1',
        prompt: `What does this print?

\`\`\`lua
local function divmod(a, b)
  return a // b, a % b
end
local q, r = divmod(17, 5)
print(q, r)
\`\`\``,
        options: ['`3    2`', '`3.4`', '`3    2.0`', '`17    5`'],
        correctIndex: 0,
        explanation:
          'A Lua function can return multiple values, listed after `return`. Multiple assignment binds them positionally: `q = 3`, `r = 2`. `print` shows them tab-separated. `//` is integer floor-division and `%` is the modulo. See [PiL §5.1](https://www.lua.org/pil/5.1.html).',
      },
      {
        kind: 'mcq',
        id: 'lua-3-mcq-2',
        prompt: `What does this print?

\`\`\`lua
local function pair()
  return 1, 2
end
local a, b, c = pair()
print(a, b, c)
\`\`\``,
        options: ['`1    2    nil`', '`1    2`', '`1    2    0`', 'Error: too many variables'],
        correctIndex: 0,
        explanation:
          'When a function returns fewer values than variables being assigned, the extras are filled with `nil` — Lua never errors on an arity mismatch. Conversely, extra returns are silently discarded. `print` renders the unset `c` as `nil`.',
      },
      {
        kind: 'mcq',
        id: 'lua-3-mcq-3',
        prompt: `How many arguments does this report?

\`\`\`lua
local function count(...)
  return select("#", ...)
end
print(count(10, nil, 30))
\`\`\``,
        options: ['`3`', '`2`', '`1`', '`nil`'],
        correctIndex: 0,
        explanation:
          '`...` collects all extra arguments. `select("#", ...)` returns the *number* of arguments, and crucially it counts embedded `nil`s — here 3. (Iterating with `ipairs` would stop at the `nil`, which is why `select("#")` is the reliable count.) See [PiL §5.2](https://www.lua.org/pil/5.2.html).',
      },
    ],
  },

  // ─── Level 4 ─────────────────────────────────────────────────────────────
  {
    id: 'lua-4',
    language: 'lua',
    level: 4,
    title: 'Tables — The One and Only Data Structure',
    timeEstimate: '6-8 hours',
    intro: `Tables are Lua's *only* compound data structure — they serve as arrays, dictionaries, sets, objects, namespaces, and modules. By the end of this phase you'll create tables with constructors (\`{}\`, \`{10, 20, 30}\`, \`{name = "Ada"}\`), index them with both \`t[k]\` and the sugar \`t.field\`, understand that **arrays are 1-indexed** by convention, that \`#t\` gives the length of a *sequence* (a gap-free 1..n run), and the difference between iterating with \`ipairs\` (ordered, array part, stops at first nil) and \`pairs\` (every key, unspecified order). You'll also see that a missing key reads as \`nil\`, and assigning \`nil\` deletes a key.

Because the in-browser runner doesn't print tables, you'll *reason* about table behaviour through MCQs here and exercise scalar/loop logic in the code tasks. Locally, build a small phone-book table and iterate it with \`pairs\`.`,
    topics: [
      { label: 'PiL — Tables', url: 'https://www.lua.org/pil/2.5.html', note: 'Tables as the universal data structure.' },
      { label: 'PiL — Table Constructors', url: 'https://www.lua.org/pil/3.6.html', note: 'Array-style, record-style, and mixed constructors.' },
      { label: 'PiL — The # operator & sequences', url: 'https://www.lua.org/pil/19.1.html', note: 'Why # is only well-defined for gap-free sequences.' },
      { label: 'Manual §3.4.9 — Table Constructors', url: 'https://www.lua.org/manual/5.4/manual.html#3.4.9', note: 'Exact constructor and indexing semantics.' },
      { label: 'Manual §6.6 — table library', url: 'https://www.lua.org/manual/5.4/manual.html#6.6', note: 'table.insert, table.remove, table.concat, table.sort.' },
    ],
    deliverable: 'A contacts.lua building a list of records and a name→number map, printing each via pairs/ipairs.',
    checks: [
      {
        kind: 'code',
        id: 'lua-4-code-1',
        prompt: 'Simulate building a table of squares without printing the table itself: loop 1..5 and accumulate the sum of squares into a scalar. Print `sumsq=...`.',
        boilerplate: 'local sumsq = 0\nfor i = 1, 5 do\n  sumsq = sumsq + i * i\nend\nprint("sumsq=" .. sumsq)\n',
        expectedOutput: 'sumsq=55',
        explanation:
          'In real Lua you would store each square in `t[i]` and later read `t[i]`. 1+4+9+16+25 = 55. We keep the runnable check scalar because the sandbox does not render table values, but the loop shape is exactly what you would use to fill an array.',
      },
      {
        kind: 'mcq',
        id: 'lua-4-mcq-1',
        prompt: `What does this print?

\`\`\`lua
local t = {10, 20, 30}
print(t[1], #t)
\`\`\``,
        options: ['`10    3`', '`0    3`', '`20    3`', '`10    2`'],
        correctIndex: 0,
        explanation:
          'Lua arrays are conventionally **1-indexed**: `t[1]` is the first element (`10`), and `t[0]` is unused (would be `nil`). `#t` returns the length of the sequence, `3`. This 1-based indexing is one of Lua\'s most-cited surprises. See [PiL §3.6](https://www.lua.org/pil/3.6.html).',
      },
      {
        kind: 'mcq',
        id: 'lua-4-mcq-2',
        prompt: `What does this print?

\`\`\`lua
local user = {name = "Ada", age = 36}
print(user.name, user["age"])
\`\`\``,
        options: ['`Ada    36`', '`name    age`', '`Ada    Ada`', '`nil    nil`'],
        correctIndex: 0,
        explanation:
          '`user.name` is syntactic sugar for `user["name"]` — both index the table by the string key `"name"`. Record-style constructors (`{name = "Ada"}`) create string keys. So this prints the value `Ada` and `36`.',
      },
      {
        kind: 'mcq',
        id: 'lua-4-mcq-3',
        prompt: `What does this print?

\`\`\`lua
local t = {5, 10, nil, 20}
print(t[3], t[4])
\`\`\``,
        options: ['`nil    20`', '`20    nil`', '`nil    nil`', 'Error: nil cannot be stored'],
        correctIndex: 0,
        explanation:
          'You *can* write `nil` into a constructor; it simply means that key holds no value. `t[3]` reads back `nil` and `t[4]` is `20`. But beware: this table has a *gap*, so `#t` is not well-defined (it may be 2 or 4). For reliable arrays, keep them gap-free. See [PiL §19.1](https://www.lua.org/pil/19.1.html).',
      },
      {
        kind: 'mcq',
        id: 'lua-4-mcq-4',
        prompt: 'What is the difference between `ipairs(t)` and `pairs(t)`?',
        options: [
          '`ipairs` iterates the integer keys 1, 2, 3… in order, stopping at the first nil; `pairs` iterates *all* keys in an unspecified order.',
          'They are identical; `ipairs` is just an alias.',
          '`pairs` only works on arrays and `ipairs` only on dictionaries.',
          '`ipairs` returns keys only, `pairs` returns values only.',
        ],
        correctIndex: 0,
        explanation:
          '`ipairs` walks the *array part*: indices 1, 2, 3, … until it hits the first `nil`. `pairs` uses `next` to visit every key/value pair (string keys included) in an arbitrary, implementation-defined order. Use `ipairs` for ordered lists, `pairs` for general maps. See [Manual §6.1](https://www.lua.org/manual/5.4/manual.html#pdf-ipairs).',
      },
    ],
  },

  // ─── Level 5 ─────────────────────────────────────────────────────────────
  {
    id: 'lua-5',
    language: 'lua',
    level: 5,
    title: 'Strings & Lua Patterns',
    timeEstimate: '5-7 hours',
    intro: `Lua strings are immutable and come with a compact but powerful library. By the end of this phase you'll use \`string.len\`/\`#\`, \`string.sub\`, \`string.upper\`/\`lower\`, \`string.rep\`, \`string.format\` (printf-style), and the method-call sugar \`s:upper()\`. The headline feature is **Lua patterns** — a lightweight regex-like mini-language used by \`string.find\`, \`match\`, \`gmatch\`, and \`gsub\`. Patterns are *not* POSIX/PCRE regex: classes are \`%d %a %s %w\`, the magic characters are \`( ) . % + - * ? [ ] ^ $\`, and \`%\` is the escape, not the backslash.

Practice locally: parse \`"key=value"\` with \`string.match("key=value", "(%w+)=(%w+)")\`, count words with \`gmatch\`, and format numbers with \`string.format("%5.2f", x)\`. Runnable checks here stay with concatenation; pattern semantics are drilled via MCQ.`,
    topics: [
      { label: 'Manual §6.4 — String Manipulation', url: 'https://www.lua.org/manual/5.4/manual.html#6.4', note: 'Every string.* function with signatures.' },
      { label: 'Manual §6.4.1 — Patterns', url: 'https://www.lua.org/manual/5.4/manual.html#6.4.1', note: 'The complete pattern grammar — character classes, captures, anchors.' },
      { label: 'PiL — The String Library', url: 'https://www.lua.org/pil/20.html', note: 'Walkthrough of find/match/gsub/gmatch with examples.' },
      { label: 'PiL — Patterns', url: 'https://www.lua.org/pil/20.2.html', note: 'Pattern items, captures, and common idioms.' },
      { label: 'Lua-users wiki — Patterns Tutorial', url: 'https://lua-users.org/wiki/PatternsTutorial', note: 'Community tutorial contrasting patterns with regex.' },
    ],
    deliverable: 'A textutil.lua that word-counts a paragraph with gmatch and reformats numbers with string.format.',
    checks: [
      {
        kind: 'code',
        id: 'lua-5-code-1',
        prompt: 'Use the `..` operator and a loop to build a row of 5 stars in a string variable, then print `bar=*****`.',
        boilerplate: 'local bar = ""\nfor i = 1, 5 do\n  bar = bar .. "*"\nend\nprint("bar=" .. bar)\n',
        expectedOutput: 'bar=*****',
        explanation:
          'Strings are built with `..`. In production you would prefer `string.rep("*", 5)` (which builds the same string in one call) or `table.concat` for many pieces, but the loop shows the mechanic.',
      },
      {
        kind: 'code',
        id: 'lua-5-code-2',
        prompt: 'Concatenate a greeting from parts. Build `"Hello, " .. who .. "!"` and print it for `who = "Lua"`.',
        boilerplate: 'local who = "Lua"\nlocal msg = "Hello, " .. who .. "!"\nprint(msg)\n',
        expectedOutput: 'Hello, Lua!',
        explanation:
          'Multiple `..` operations chain left-to-right. Because strings are immutable, each `..` produces a new string; for hot loops with many pieces, collect them in a table and call `table.concat` once.',
      },
      {
        kind: 'mcq',
        id: 'lua-5-mcq-1',
        prompt: `What does this print?

\`\`\`lua
local s = "lua"
print(s:upper(), #s)
\`\`\``,
        options: ['`LUA    3`', '`lua    3`', '`LUA    lua`', '`UPPER    3`'],
        correctIndex: 0,
        explanation:
          '`s:upper()` is method-call sugar for `string.upper(s)` — Lua sets a metatable on strings so any `string.*` function is callable with `:`. `#s` is the byte length, 3. See [PiL §20](https://www.lua.org/pil/20.html).',
      },
      {
        kind: 'mcq',
        id: 'lua-5-mcq-2',
        prompt: `What does this print?

\`\`\`lua
local k, v = string.match("color=blue", "(%w+)=(%w+)")
print(k, v)
\`\`\``,
        options: ['`color    blue`', '`color=blue    nil`', '`nil    nil`', '`%w+    %w+`'],
        correctIndex: 0,
        explanation:
          'In Lua patterns `%w` matches an alphanumeric character and `+` means one-or-more. Parentheses are *captures*: `string.match` returns each captured substring. So `k = "color"`, `v = "blue"`. Note patterns use `%` (not the backslash) as the escape. See [Manual §6.4.1](https://www.lua.org/manual/5.4/manual.html#6.4.1).',
      },
      {
        kind: 'mcq',
        id: 'lua-5-mcq-3',
        prompt: 'Which statement about Lua patterns is correct?',
        options: [
          'They are a lightweight pattern syntax, NOT full regular expressions — there is no alternation `|` and no `{n,m}` quantifier.',
          'They are fully PCRE-compatible, including lookahead.',
          'They use the Perl/JavaScript `\\d` and `\\w` escapes.',
          'They support backtracking with nested groups exactly like POSIX ERE.',
        ],
        correctIndex: 0,
        explanation:
          'Lua patterns deliberately omit alternation (`|`) and counted repetition (`{n,m}`) to stay tiny and fast. Character classes are written `%d %a %s %w` (with `%` escaping), and quantifiers are limited to `* + - ?`. For full regex you reach for an external library like LPeg or `lrexlib`. See [Lua-users Patterns Tutorial](https://lua-users.org/wiki/PatternsTutorial).',
      },
    ],
  },

  // ─── Level 6 ─────────────────────────────────────────────────────────────
  {
    id: 'lua-6',
    language: 'lua',
    level: 6,
    title: 'Closures, First-Class Functions & Scope',
    timeEstimate: '5-7 hours',
    intro: `Functions in Lua are first-class values *and* proper lexical closures: a nested function captures the **variables** (not just values) of its enclosing scope, called *upvalues*. By the end of this phase you'll build counters and accumulators that retain private state, write higher-order functions (functions returning functions), and understand that each call to a factory produces a *fresh, independent* set of upvalues. You'll also nail Lua's block scoping — \`local\` is visible from its declaration to the end of the enclosing block — and the difference between defining \`local function f\` (recursion-friendly) and \`local f = function() ... end\`.

Build it locally: a \`makeCounter()\` that returns a function incrementing a private \`count\`, and a \`compose(f, g)\` higher-order function. Confirm two counters don't share state. Runnable checks here use recursion and higher-order calls; closure subtleties are taught via MCQ.`,
    topics: [
      { label: 'PiL — Closures', url: 'https://www.lua.org/pil/6.1.html', note: 'Upvalues and how nested functions capture enclosing locals.' },
      { label: 'PiL — Functions as first-class values', url: 'https://www.lua.org/pil/6.html', note: 'Storing, passing, and returning functions.' },
      { label: 'Manual §3.5 — Visibility Rules', url: 'https://www.lua.org/manual/5.4/manual.html#3.5', note: 'Exact lexical scoping and upvalue semantics.' },
      { label: 'Lua-users wiki — Closures', url: 'https://lua-users.org/wiki/ClosuresTutorial', note: 'Community tutorial with counter and iterator examples.' },
    ],
    deliverable: 'A funcs.lua with makeCounter(), a memoize wrapper, and compose(f, g) demonstrating independent upvalues.',
    checks: [
      {
        kind: 'code',
        id: 'lua-6-code-1',
        prompt: 'Define `local function add(a, b)` and a `local function apply(f, x, y)` that calls `f(x, y)`. Print `r=` the result of applying add to 8 and 9.',
        boilerplate: 'local function add(a, b)\n  return a + b\nend\nlocal function apply(f, x, y)\n  return f(x, y)\nend\nprint("r=" .. apply(add, 8, 9))\n',
        expectedOutput: 'r=17',
        explanation:
          'Functions are first-class: `add` is just a value passed to `apply`, which calls it via the parameter `f`. This is the foundation of higher-order programming — map/filter/reduce all rely on passing functions as arguments.',
      },
      {
        kind: 'code',
        id: 'lua-6-code-2',
        prompt: 'Write a recursive `local function sumTo(n)` that adds 1..n (base case `sumTo(0)` returns 0). Print `s=` for 10.',
        boilerplate: 'local function sumTo(n)\n  if n == 0 then\n    return 0\n  else\n    return n + sumTo(n - 1)\n  end\nend\nprint("s=" .. sumTo(10))\n',
        expectedOutput: 's=55',
        explanation:
          'A `local function` is in scope inside its own body, so recursion works. Each recursive call frame keeps its own `n` — the same per-instantiation variable capture that powers closures. 1+2+…+10 = 55.',
      },
      {
        kind: 'mcq',
        id: 'lua-6-mcq-1',
        prompt: `What does this print?

\`\`\`lua
local function makeCounter()
  local count = 0
  return function()
    count = count + 1
    return count
  end
end
local c = makeCounter()
print(c(), c(), c())
\`\`\``,
        options: ['`1    2    3`', '`1    1    1`', '`0    1    2`', '`3    3    3`'],
        correctIndex: 0,
        explanation:
          'The returned function *closes over* the upvalue `count`. Each call mutates that same captured variable, so successive calls yield 1, 2, 3. `count` is private — unreachable except through the closure. This is the canonical Lua closure example. See [PiL §6.1](https://www.lua.org/pil/6.1.html).',
      },
      {
        kind: 'mcq',
        id: 'lua-6-mcq-2',
        prompt: `What does this print?

\`\`\`lua
local function makeCounter()
  local count = 0
  return function() count = count + 1; return count end
end
local a = makeCounter()
local b = makeCounter()
print(a(), a(), b())
\`\`\``,
        options: ['`1    2    1`', '`1    2    3`', '`1    1    1`', '`2    2    1`'],
        correctIndex: 0,
        explanation:
          'Each call to `makeCounter` creates a *fresh* `count` upvalue, so closures `a` and `b` have independent state. `a()` returns 1 then 2; `b()` starts its own count at 1. Closures capture variables per-instantiation, not globally.',
      },
      {
        kind: 'mcq',
        id: 'lua-6-mcq-3',
        prompt: 'A nested function in Lua captures an enclosing `local` as an *upvalue*. What does it capture?',
        options: [
          'The variable itself (by reference) — mutations are visible to all closures sharing it.',
          'A snapshot copy of the value at the moment the closure is created.',
          'Only globals; locals cannot be captured.',
          'Nothing — Lua has no closures, only function pointers.',
        ],
        correctIndex: 0,
        explanation:
          'Lua closures capture *variables*, not values. Multiple closures created in the same scope share the same upvalue, so one closure\'s mutation is seen by the others. This enables patterns like a getter/setter pair sharing one private variable. See [Manual §3.5](https://www.lua.org/manual/5.4/manual.html#3.5).',
      },
    ],
  },

  // ─── Level 7 ─────────────────────────────────────────────────────────────
  {
    id: 'lua-7',
    language: 'lua',
    level: 7,
    title: 'Metatables, Metamethods & OOP',
    timeEstimate: '6-8 hours',
    intro: `Metatables are Lua's mechanism for overriding the default behaviour of tables. By the end of this phase you'll understand the key metamethods — \`__index\` (fallback lookup, the basis of inheritance), \`__newindex\` (assignment interception), \`__add\`/\`__eq\`/\`__lt\` (operator overloading), \`__tostring\`, and \`__call\` — and how \`setmetatable\`/\`getmetatable\` wire them up. From these primitives Lua builds **object-oriented programming**: a "class" is a table whose \`__index\` points to itself, instances are tables whose metatable is the class, and the colon syntax \`obj:method(args)\` passes the receiver as an implicit \`self\`. Inheritance chains \`__index\` from child to parent.

Because the runner can't print tables or run metatables, this phase is MCQ-heavy "what does this print?" plus a scalar code drill. Locally, build a \`Vector\` class with \`__add\` and \`__tostring\`, then an \`Account\` class with \`deposit\`/\`balance\` methods.`,
    topics: [
      { label: 'PiL — Metatables and Metamethods', url: 'https://www.lua.org/pil/13.html', note: 'The full metamethod table with worked operator-overloading examples.' },
      { label: 'PiL — Object-Oriented Programming', url: 'https://www.lua.org/pil/16.html', note: 'Building classes, self, and the colon syntax.' },
      { label: 'PiL — Inheritance', url: 'https://www.lua.org/pil/16.2.html', note: 'Chaining __index for single inheritance.' },
      { label: 'Manual §2.4 — Metatables and Metamethods', url: 'https://www.lua.org/manual/5.4/manual.html#2.4', note: 'Authoritative list of every metamethod and when it fires.' },
      { label: 'Lua-users wiki — Object-Oriented Programming', url: 'https://lua-users.org/wiki/ObjectOrientedProgramming', note: 'Several idiomatic OOP styles compared.' },
    ],
    deliverable: 'An oop.lua defining a Vector class (with __add, __tostring) and a BankAccount class with methods via the colon syntax.',
    checks: [
      {
        kind: 'code',
        id: 'lua-7-code-1',
        prompt: 'Model a method-like function without tables: write `local function balanceAfter(start, deposit)` returning `start + deposit`. Print `bal=` for start 100, deposit 50.',
        boilerplate: 'local function balanceAfter(start, deposit)\n  return start + deposit\nend\nprint("bal=" .. balanceAfter(100, 50))\n',
        expectedOutput: 'bal=150',
        explanation:
          'In full Lua OOP this becomes `account:deposit(50)`, where `account` is passed as the implicit `self`. The colon syntax `obj:m(x)` is sugar for `obj.m(obj, x)`. Here we isolate the arithmetic the method would perform.',
      },
      {
        kind: 'mcq',
        id: 'lua-7-mcq-1',
        prompt: 'What does the `__index` metamethod do when you read a key that is missing from a table?',
        options: [
          'If `__index` is a table, Lua looks the key up in *that* table; if it is a function, Lua calls it with (table, key).',
          'It raises an error for any missing key.',
          'It returns the default value `0` for any missing key.',
          'It permanently deletes the key from the table.',
        ],
        correctIndex: 0,
        explanation:
          'When a raw lookup fails, Lua consults the metatable\'s `__index`. A *table* `__index` provides a fallback table (this is how inheritance works — the instance falls back to its class); a *function* `__index` is invoked as `__index(t, k)`. This is the single most important metamethod. See [PiL §13.4](https://www.lua.org/pil/13.4.html).',
      },
      {
        kind: 'mcq',
        id: 'lua-7-mcq-2',
        prompt: `Given a metatable with \`__add\`, what does this print?

\`\`\`lua
local mt = {}
mt.__add = function(a, b)
  return setmetatable({x = a.x + b.x}, mt)
end
local p = setmetatable({x = 3}, mt)
local q = setmetatable({x = 4}, mt)
local r = p + q
print(r.x)
\`\`\``,
        options: ['`7`', '`34`', '`nil`', 'Error: cannot add tables'],
        correctIndex: 0,
        explanation:
          'Because `p`\'s metatable defines `__add`, the expression `p + q` calls `mt.__add(p, q)`, which builds a new table with `x = 3 + 4 = 7`. Operator overloading via metamethods (`__add __sub __mul __eq __lt __le __concat`) lets tables behave like numeric or composite types. See [PiL §13.1](https://www.lua.org/pil/13.1.html).',
      },
      {
        kind: 'mcq',
        id: 'lua-7-mcq-3',
        prompt: 'In `obj:greet(name)`, what is the relationship to `obj.greet`?',
        options: [
          '`obj:greet(name)` is sugar for `obj.greet(obj, name)` — the colon passes `obj` as the first parameter `self`.',
          'They are identical; the colon is purely cosmetic.',
          'The colon makes the call asynchronous.',
          '`obj:greet` looks up a *global* function named greet.',
        ],
        correctIndex: 0,
        explanation:
          'The colon syntax is method-call sugar: `obj:greet(name)` expands to `obj.greet(obj, name)`, automatically supplying the receiver as `self`. Likewise, `function obj:greet(name)` defines a function with an implicit `self` parameter. This is the entire basis of Lua OOP. See [PiL §16](https://www.lua.org/pil/16.html).',
      },
      {
        kind: 'mcq',
        id: 'lua-7-mcq-4',
        prompt: 'How is single inheritance typically implemented in Lua?',
        options: [
          "The child class's `__index` is set to the parent class, so missing methods fall through the metatable chain to the parent.",
          'Lua has a built-in `class extends` keyword.',
          'You copy every parent method into the child table at definition time.',
          'Inheritance is impossible without a C extension.',
        ],
        correctIndex: 0,
        explanation:
          'Inheritance is just `__index` chaining: an instance\'s metatable points to its class, and the class\'s metatable\'s `__index` points to the superclass. A missing method on the instance falls through to the class, then to the parent class, and so on. See [PiL §16.2](https://www.lua.org/pil/16.2.html).',
      },
    ],
  },

  // ─── Level 8 ─────────────────────────────────────────────────────────────
  {
    id: 'lua-8',
    language: 'lua',
    level: 8,
    title: 'Modules, require & the Standard Library',
    timeEstimate: '5-7 hours',
    intro: `Real programs span many files. By the end of this phase you'll structure code into **modules** — a Lua module is just a file that returns a table — and load them with \`require "mymod"\`, which searches \`package.path\`, runs the file *once*, and caches the result in \`package.loaded\`. You'll also tour the standard library beyond what you've seen: \`math\` (\`floor\`, \`ceil\`, \`abs\`, \`max\`, \`sqrt\`, \`random\`, \`huge\`, \`pi\`, and \`math.type\`), \`os\` (\`time\`, \`date\`, \`clock\`, \`getenv\`), \`io\` (\`io.write\`, \`io.read\`, file handles), and \`table\` (\`insert\`, \`remove\`, \`sort\`, \`concat\`). You'll also meet error handling with \`pcall\`/\`error\`/\`assert\`.

Build it locally: write \`mathx.lua\` returning a table of helper functions, then a \`main.lua\` that \`require\`s it. Runnable checks here exercise math-style integer logic; module/require/pcall mechanics are taught via MCQ.`,
    topics: [
      { label: 'PiL — Modules and Packages', url: 'https://www.lua.org/pil/15.html', note: 'Writing modules that return a table and loading with require.' },
      { label: 'Manual §6.3 — Modules (require/package)', url: 'https://www.lua.org/manual/5.4/manual.html#6.3', note: 'require, package.path, package.loaded internals.' },
      { label: 'Manual §6.7 — Mathematical Functions', url: 'https://www.lua.org/manual/5.4/manual.html#6.7', note: 'The math library, including math.type and math.maxinteger.' },
      { label: 'Manual §6.9 — Operating System Facilities', url: 'https://www.lua.org/manual/5.4/manual.html#6.9', note: 'os.time, os.date, os.clock, os.getenv.' },
      { label: 'PiL — Error Handling (pcall)', url: 'https://www.lua.org/pil/8.4.html', note: 'pcall, error, and assert for protected calls.' },
    ],
    deliverable: 'A two-file project: mathx.lua (returns a table of helpers) + main.lua that requires it and prints results.',
    checks: [
      {
        kind: 'code',
        id: 'lua-8-code-1',
        prompt: 'Reimplement `math.max` of three values with `if`. Print `max=` for 3, 9, 5.',
        boilerplate: 'local function max3(a, b, c)\n  local m = a\n  if b > m then\n    m = b\n  end\n  if c > m then\n    m = c\n  end\n  return m\nend\nprint("max=" .. max3(3, 9, 5))\n',
        expectedOutput: 'max=9',
        explanation:
          'The standard library would give you `math.max(3, 9, 5)`. Here we reimplement it to show the logic and to stay inside the runnable subset. `math.max`/`math.min` accept any number of arguments.',
      },
      {
        kind: 'code',
        id: 'lua-8-code-2',
        prompt: 'Reimplement `math.abs`: if `n < 0`, negate it. Print `abs=` for -42.',
        boilerplate: 'local function myabs(n)\n  if n < 0 then\n    return -n\n  else\n    return n\n  end\nend\nprint("abs=" .. myabs(-42))\n',
        expectedOutput: 'abs=42',
        explanation:
          'This mirrors `math.abs`. The real `math` library also offers `floor`, `ceil`, `sqrt`, `huge` (infinity), `pi`, and `random`. Since 5.3, `math.type(x)` tells you whether a number is an `"integer"` or `"float"`.',
      },
      {
        kind: 'mcq',
        id: 'lua-8-mcq-1',
        prompt: 'In idiomatic Lua, what does a module file typically do?',
        options: [
          'Builds a local table of functions and `return`s it at the end of the file.',
          'Declares everything as globals and returns nothing.',
          'Must call a special `module()` function (still required in 5.4).',
          'Exports symbols with an `export` keyword.',
        ],
        correctIndex: 0,
        explanation:
          'A modern Lua module is simply a file that assembles a `local M = {}` table, attaches functions to it, and `return M` at the end. The caller does `local mymod = require "mymod"`. The old `module()` function was deprecated in 5.2 and removed. See [PiL §15](https://www.lua.org/pil/15.html).',
      },
      {
        kind: 'mcq',
        id: 'lua-8-mcq-2',
        prompt: 'What is true about calling `require "foo"` twice in the same program?',
        options: [
          'The file `foo` runs only the *first* time; later requires return the cached value from `package.loaded`.',
          'The file re-executes every time, giving a fresh table each call.',
          'The second call raises an "already loaded" error.',
          '`require` always returns `true`, never the module table.',
        ],
        correctIndex: 0,
        explanation:
          '`require` caches the module\'s return value in `package.loaded[modname]`. Subsequent `require` calls return that cached value without re-running the file, so a module\'s top-level code executes exactly once. This makes modules effective singletons. See [Manual §6.3](https://www.lua.org/manual/5.4/manual.html#pdf-require).',
      },
      {
        kind: 'mcq',
        id: 'lua-8-mcq-3',
        prompt: `What does this print?

\`\`\`lua
local ok, err = pcall(function()
  error("boom")
end)
print(ok, err)
\`\`\``,
        options: [
          '`false   input:2: boom`',
          '`true   boom`',
          '`false   nil`',
          'The program crashes with an uncaught error.',
        ],
        correctIndex: 0,
        explanation:
          '`pcall` (protected call) runs a function and *traps* any error. It returns `false` plus the error message (which `error` prefixes with `chunk:line` position info) when the call fails, or `true` plus the function\'s results on success. This is Lua\'s exception mechanism. See [PiL §8.4](https://www.lua.org/pil/8.4.html).',
      },
    ],
  },

  // ─── Level 9 ─────────────────────────────────────────────────────────────
  {
    id: 'lua-9',
    language: 'lua',
    level: 9,
    title: 'Coroutines — Cooperative Multitasking',
    timeEstimate: '5-7 hours',
    intro: `Coroutines are Lua's killer concurrency primitive: collaborative, single-threaded routines that can *suspend* themselves mid-execution and later *resume* exactly where they left off, preserving their entire call stack. By the end of this phase you'll use \`coroutine.create\`/\`wrap\`, \`coroutine.resume\`, \`coroutine.yield\`, and \`coroutine.status\` to build generators, pipelines, and lazy iterators. Crucially, coroutines are **not** OS threads — there is no preemption and no parallelism; control passes explicitly between coroutines via yield/resume, so you never need locks.

Because the runner cannot model coroutine scheduling, this phase teaches through "what does this print?" MCQs and a scalar code drill. Locally, write a generator that yields the Fibonacci sequence with \`coroutine.wrap\`, and a producer/consumer pipe.`,
    topics: [
      { label: 'PiL — Coroutines', url: 'https://www.lua.org/pil/9.html', note: 'The complete coroutine chapter: create, resume, yield, status.' },
      { label: 'PiL — Coroutines as iterators', url: 'https://www.lua.org/pil/9.3.html', note: 'Wrapping a coroutine into a generic-for iterator with coroutine.wrap.' },
      { label: 'Manual §6.2 — Coroutine Manipulation', url: 'https://www.lua.org/manual/5.4/manual.html#6.2', note: 'Full API: create/resume/yield/wrap/status/isyieldable/running.' },
      { label: 'Manual §2.6 — Coroutines (semantics)', url: 'https://www.lua.org/manual/5.4/manual.html#2.6', note: 'The formal model of suspension and resumption.' },
    ],
    deliverable: 'A coroutines.lua with a Fibonacci generator (coroutine.wrap) and a producer/consumer using resume/yield.',
    checks: [
      {
        kind: 'code',
        id: 'lua-9-code-1',
        prompt: 'Coroutines often power generators that produce a sequence. Simulate the *output* of a Fibonacci generator by computing fib iteratively in a loop. Print `fib=` the 10th Fibonacci number (with fib(1)=1, fib(2)=1).',
        boilerplate: 'local a = 0\nlocal b = 1\nfor i = 1, 10 do\n  local nxt = a + b\n  a = b\n  b = nxt\nend\nprint("fib=" .. a)\n',
        expectedOutput: 'fib=55',
        explanation:
          'A coroutine version would `coroutine.yield` each `a` inside an infinite loop, letting the caller pull values lazily one at a time. The arithmetic state (`a`, `b`) is exactly what the coroutine would preserve across yields. The 10th Fibonacci is 55.',
      },
      {
        kind: 'mcq',
        id: 'lua-9-mcq-1',
        prompt: `What does this print?

\`\`\`lua
local co = coroutine.create(function(x)
  print("start", x)
  local y = coroutine.yield(x + 1)
  print("resumed", y)
end)
print(coroutine.resume(co, 10))
print(coroutine.resume(co, 99))
\`\`\``,
        options: [
          '`start   10` / `true   11` / `resumed   99` / `true`',
          '`start   10` / `true   10` / `true`',
          '`start   10` / `11` / `resumed   99`',
          'Error: cannot resume a dead coroutine',
        ],
        correctIndex: 0,
        explanation:
          'First `resume(co, 10)` starts the body with `x=10`, prints `start 10`, then `yield(x+1)` suspends and returns to the caller. `resume` reports `true` plus the yielded value `11`. The second `resume(co, 99)` makes `yield` *return* `99` (so `y=99`), prints `resumed 99`, and the body ends — `resume` returns just `true`. See [PiL §9.1](https://www.lua.org/pil/9.1.html).',
      },
      {
        kind: 'mcq',
        id: 'lua-9-mcq-2',
        prompt: 'How do Lua coroutines differ from OS threads?',
        options: [
          'Coroutines are cooperative and single-threaded — control transfers only at explicit yield/resume points, so they never run in parallel and need no locks.',
          'Coroutines are preemptively scheduled across CPU cores for true parallelism.',
          'Coroutines automatically run on a thread pool managed by the OS.',
          'There is no difference; `coroutine` is an alias for the OS thread API.',
        ],
        correctIndex: 0,
        explanation:
          'Lua coroutines are *cooperative*: exactly one runs at a time and only yields control voluntarily via `coroutine.yield`. There is no preemption or true parallelism, so shared state never races and locks are unnecessary. This makes them ideal for generators, state machines, and async I/O patterns. See [Manual §2.6](https://www.lua.org/manual/5.4/manual.html#2.6).',
      },
      {
        kind: 'mcq',
        id: 'lua-9-mcq-3',
        prompt: 'What is the advantage of `coroutine.wrap(fn)` over `coroutine.create(fn)`?',
        options: [
          '`wrap` returns a *function* that resumes the coroutine and returns the yielded values directly (re-raising errors), making it ideal as a generic-for iterator.',
          '`wrap` runs the coroutine on a separate OS thread.',
          '`wrap` is deprecated and identical to `create`.',
          '`wrap` cannot accept arguments.',
        ],
        correctIndex: 0,
        explanation:
          '`coroutine.wrap` packages the coroutine as a plain callable: each call resumes it and returns the yielded values (no `true`/`false` status prefix), and any error propagates instead of being returned. That signature drops straight into `for v in wrappedCoroutine do ... end`, which is why it is the go-to for iterators. See [PiL §9.3](https://www.lua.org/pil/9.3.html).',
      },
    ],
  },

  // ─── Level 10 ────────────────────────────────────────────────────────────
  {
    id: 'lua-10',
    language: 'lua',
    level: 10,
    title: 'The C API, Embedding, Performance & LuaJIT',
    timeEstimate: '6-8 hours',
    intro: `Lua was designed to be *embedded* in a host C/C++ program — this is why it powers game engines, Redis, Nginx, and Neovim. By the end of this phase you'll understand the **C API**: the central abstraction is a virtual **stack** through which C and Lua exchange all values (\`lua_pushnumber\`, \`lua_tostring\`, \`lua_pcall\`), the \`lua_State\` handle that represents an independent interpreter, and how C functions are registered as Lua-callable closures. You'll also learn the performance story: standard Lua is already among the fastest scripting languages thanks to its register-based bytecode VM, and **LuaJIT** — a separate, blazing tracing JIT compiler for Lua 5.1 — can rival C on hot loops, plus its FFI library lets you call C functions with *no* binding code.

This capstone is mostly conceptual MCQs plus a scalar code drill; you'll do the real embedding work in a local C project. Try compiling a tiny host that creates a \`lua_State\`, runs a string with \`luaL_dostring\`, and reads back a result.`,
    topics: [
      { label: 'PiL — The C API (overview)', url: 'https://www.lua.org/pil/24.html', note: 'The stack model and the C/Lua boundary.' },
      { label: 'PiL — The Stack', url: 'https://www.lua.org/pil/24.2.html', note: 'How every value passes through the virtual stack.' },
      { label: 'Manual §4 — The Application Program Interface', url: 'https://www.lua.org/manual/5.4/manual.html#4', note: 'The complete C API reference: lua_State, stack, lua_pcall.' },
      { label: 'LuaJIT', url: 'https://luajit.org/luajit.html', note: 'The tracing-JIT implementation of Lua 5.1.' },
      { label: 'LuaJIT FFI Library', url: 'https://luajit.org/ext_ffi.html', note: 'Call C functions and use C data structures with no binding glue.' },
      { label: 'The Implementation of Lua 5.0 (paper)', url: 'https://www.lua.org/doc/jucs05.pdf', note: 'How the register-based VM and tables/GC are implemented.' },
    ],
    deliverable: 'A local C host program (host.c) that embeds Lua: create a lua_State, luaL_dostring a script, and read back a value.',
    checks: [
      {
        kind: 'code',
        id: 'lua-10-code-1',
        prompt: 'A JIT shines on tight numeric loops. Simulate one: sum i*i for i in 1..100 in a single loop and print `hot=...`.',
        boilerplate: 'local acc = 0\nfor i = 1, 100 do\n  acc = acc + i * i\nend\nprint("hot=" .. acc)\n',
        expectedOutput: 'hot=338350',
        explanation:
          'A tight, type-stable numeric loop like this is exactly what LuaJIT\'s tracing compiler specialises and turns into near-C machine code. The sum of the first 100 squares is 338350. Keeping loop bodies monomorphic (consistent types) is the key to JIT performance.',
      },
      {
        kind: 'mcq',
        id: 'lua-10-mcq-1',
        prompt: 'In the Lua C API, how do C and Lua exchange values?',
        options: [
          'Through a virtual **stack** owned by the `lua_State`: C pushes/reads values by stack index.',
          'By directly dereferencing Lua C struct pointers.',
          'Through global C variables shared between the two runtimes.',
          'Lua values are copied into fixed CPU registers.',
        ],
        correctIndex: 0,
        explanation:
          'All data crosses the C/Lua boundary via a virtual stack belonging to the `lua_State`. C code calls `lua_pushnumber`, `lua_pushstring`, etc. to push arguments and reads results with `lua_tonumber`/`lua_tostring` by index (positive from the bottom, negative from the top). This stack discipline keeps the API GC-safe. See [PiL §24.2](https://www.lua.org/pil/24.2.html).',
      },
      {
        kind: 'mcq',
        id: 'lua-10-mcq-2',
        prompt: 'What does a `lua_State` represent?',
        options: [
          'An independent Lua interpreter instance with its own global environment, stack, and garbage collector.',
          'A single Lua variable.',
          'The compiled bytecode of one function.',
          'A lock guarding the Lua VM against threads.',
        ],
        correctIndex: 0,
        explanation:
          'A `lua_State *` is the handle to a whole Lua interpreter — its globals, call stack, and GC heap. You create one with `luaL_newstate()`. Coroutines are *threads* within the same state (sharing globals); for true isolation you create separate `lua_State`s. See [Manual §4](https://www.lua.org/manual/5.4/manual.html#4).',
      },
      {
        kind: 'mcq',
        id: 'lua-10-mcq-3',
        prompt: 'What distinguishes LuaJIT from the reference PUC-Lua implementation?',
        options: [
          'LuaJIT is a tracing just-in-time compiler (for the Lua 5.1 language) that can approach C speed and ships an FFI for calling C without binding code.',
          'LuaJIT is a syntactically different language incompatible with Lua.',
          'LuaJIT only interprets bytecode and is slower than PUC-Lua.',
          'LuaJIT replaces tables with fixed C structs.',
        ],
        correctIndex: 0,
        explanation:
          'LuaJIT is an independent, highly optimised implementation that JIT-compiles hot traces of Lua 5.1 bytecode to machine code, often rivalling C. Its FFI library lets Lua call C functions and manipulate C data directly with no glue code. The trade-off is it targets the 5.1 language, lagging the newer 5.3/5.4 features. See [luajit.org](https://luajit.org/luajit.html).',
      },
      {
        kind: 'mcq',
        id: 'lua-10-mcq-4',
        prompt: 'Why is plain (non-JIT) Lua already considered fast among scripting languages?',
        options: [
          'It compiles source to a compact register-based bytecode run by an efficient VM, with an incremental garbage collector — keeping the whole runtime tiny (~hundreds of KB).',
          'It compiles ahead-of-time to native binaries like Go.',
          'It avoids garbage collection entirely by using manual memory management.',
          'It runs every statement through an interpreter written in Python.',
        ],
        correctIndex: 0,
        explanation:
          'Reference Lua compiles to a *register-based* bytecode (fewer instructions than a stack VM) executed by a small, cache-friendly C interpreter, paired with an incremental mark-and-sweep collector. The entire implementation is a few hundred kilobytes, which is also why it embeds so easily. See [The Implementation of Lua 5.0](https://www.lua.org/doc/jucs05.pdf).',
      },
    ],
  },
];
