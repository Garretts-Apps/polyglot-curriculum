import type { Phase } from './types';

export const haskellPhases: Phase[] = [
  // ─── Level 0 ─────────────────────────────────────────────────────────────
  {
    id: 'haskell-0',
    language: 'haskell',
    level: 0,
    title: 'Setup & Hello World',
    timeEstimate: '0.5-1 hours',
    intro: `Welcome to Haskell — a purely functional, lazily evaluated, statically typed language. If you have never written a line of code before, that is fine: this level installs the tools and walks you through your very first program word by word. First, the toolchain. The modern way to get GHC (the **G**lasgow **H**askell **C**ompiler — the program that turns your text into something the machine runs), GHCi (an interactive playground for trying snippets), and the \`cabal\`/\`stack\` build tools is **GHCup**. Run its one-line installer, then confirm it worked by typing \`ghc --version\` in your terminal, and try the playground with \`ghci\`.

Now the program itself. Create a file \`Main.hs\` containing these two lines:

\`\`\`haskell
main :: IO ()
main = do
  putStrLn "Hello, World!"
\`\`\`

This looks unusual compared to other languages, and that is on purpose — Haskell is honest about which parts of a program can talk to the outside world (printing, reading files) and which parts are pure calculation. Let us read it left to right, token by token. For each piece we will ask the same four questions: what does it *mean*, what *job* does it do on that line, what *changes if you remove it*, and what is actually *in memory* when the program runs.

- **\`main\`** is a *name* you are defining. A name is just a label you stick on something so you can refer to it later. Its job: \`main\` is the one special name the program looks for and runs when it starts — the **entry point**. If you remove it (or misspell it), there is nothing to run and the program won't build. At runtime, \`main\` *is* the whole printing action below; the running program "is" \`main\` being carried out.
- **\`::\`** reads aloud as "**has the type**". Its only job is to introduce a *type signature* — it separates a name on the left from a description of what kind of thing it is on the right. Remove the \`::\` and the line becomes nonsense to the compiler. It holds no value in memory at all; it is punctuation that talks *about* \`main\` rather than being part of what runs.
- **\`IO ()\`** is that type — the description sitting to the right of \`::\`. \`IO\` stands for **I**nput/**O**utput: talking to the outside world (screen, keyboard, files). The \`()\` (pronounced "**unit**") means "nothing useful is handed back". Together \`IO ()\` means "an action that does some input/output and returns no meaningful value" — exactly what printing is (it changes the screen but hands nothing back). Its job is to *describe* \`main\`, not to do anything. If you delete the entire \`main :: IO ()\` line, the program still runs, because the compiler can figure the type out on its own — but writing it down documents your intent and is considered good style. At runtime there is no separate "\`IO ()\` value" in memory; it is a label the compiler checked before the program ever started.
- **\`=\`** means **definition** — "the name on the left IS the thing on the right." This is *not* assignment and *not* "becomes equal to": once \`main\` is defined it never changes, because Haskell has no re-assigning. Remove the \`=\` and the compiler cannot tell what \`main\` is defined as. In memory, the \`=\` ties the name \`main\` permanently to the action that follows.
- **\`do\`** introduces a *block* of actions to perform one after another, top to bottom. Its job is to let you list several steps; with only one step we could technically drop \`do\`, but it is the normal shape and we will add more lines soon. If you remove it while there are multiple lines, they no longer sequence correctly. At runtime, \`do\` bundles the lines beneath it into a single combined action — here, just the one \`putStrLn\` action.
- **\`putStrLn\`** is a built-in *function* — a named action. Its job: take a piece of text and print it to the screen, then move to a new line (\`Ln\` is short for "line"). Remove it and nothing is printed. At runtime, \`putStrLn\` is handed the text below and the value it produces is the act of writing those characters plus a newline to standard output. (There is also \`putStr\`, which prints *without* the newline.)
- **\`"Hello, World!"\`** is a *string* — literally the characters between the double quotes. The quotes are not printed; they only mark where the text starts and ends. Its job is to be the value handed to \`putStrLn\` to display. Remove or empty it and a blank line (or an error) results. In memory at runtime, this is the actual sequence of characters \`H\`, \`e\`, \`l\`, \`l\`, \`o\`, ... that gets sent to the screen.

Save the file, then run it one of two ways: \`runghc Main.hs\` interprets it on the spot, or \`ghc Main.hs && ./Main\` compiles a native program and runs it. Either way you will see \`Hello, World!\` printed.`,
    topics: [
      { label: 'GHCup — install GHC, cabal, stack', url: 'https://www.haskell.org/ghcup/', note: 'The recommended installer for the whole Haskell toolchain.' },
      { label: 'Haskell.org — Get Started', url: 'https://www.haskell.org/get-started/', note: 'Official quick-start: install, REPL, first program.' },
      { label: 'GHCi User Guide', url: 'https://downloads.haskell.org/ghc/latest/docs/users_guide/ghci.html', note: 'How the interactive REPL works (:t, :i, :l, :r).' },
    ],
    deliverable: 'Confirm `ghc --version` locally, then run a `main` that prints a greeting to standard output.',
    checks: [
      {
        kind: 'code',
        id: 'haskell-0-code-1',
        prompt: 'Run the starter program to print `Hello, World!` to standard output.',
        boilerplate: 'main :: IO ()\nmain = do\n  putStrLn "Hello, World!"\n',
        expectedOutput: 'Hello, World!',
        explanation: 'Token by token: **`main`** is the name the program runs first — it is the entry point, and every Haskell program must define it. **`main :: IO ()`** is its type signature; `::` means "has the type", and `IO ()` means "an action that does input/output and returns nothing useful" (the `()` is the empty "unit" value). This line only DESCRIBES `main`; if you delete it the program still runs because GHC can infer the type, but writing it is good practice and documents intent. **`=`** means *definition* ("`main` IS this"), not assignment — Haskell names never change after they are defined. **`do`** starts a block of actions performed top to bottom. **`putStrLn`** is a function that prints a string and adds a newline (`Ln` = line); remove it and nothing is printed. **`"Hello, World!"`** is the string value — the characters inside the quotes (the quotes themselves are not printed). At runtime the value handed to `putStrLn` is the text `Hello, World!`, which then appears on standard output.',
      },
      {
        kind: 'mcq',
        id: 'haskell-0-mcq-1',
        prompt: 'Which command launches GHC\'s interactive REPL?',
        options: ['`ghci`', '`ghc --repl`', '`haskell`', '`cabal shell`'],
        correctIndex: 0,
        explanation: 'GHCi (the **G**lasgow **H**askell **C**ompiler **i**nteractive) is started with `ghci`. Inside it you can evaluate expressions, query types with `:t`, load a file with `:l File.hs`, and reload with `:r`. See the [GHCi User Guide](https://downloads.haskell.org/ghc/latest/docs/users_guide/ghci.html).',
      },
      {
        kind: 'mcq',
        id: 'haskell-0-mcq-2',
        prompt: 'What is the type of `main` in a runnable Haskell program?',
        options: ['`IO ()`', '`String`', '`void`', '`Main`'],
        correctIndex: 0,
        explanation: '`main :: IO ()` — an I/O action returning the unit value `()`. The runtime evaluates `main` to perform its effects. Haskell keeps effects in the type system: a value of type `IO a` *describes* an effectful computation rather than running it on the spot.',
      },
    ],
  },

  // ─── Level 1 ─────────────────────────────────────────────────────────────
  {
    id: 'haskell-1',
    language: 'haskell',
    level: 1,
    title: 'Expressions, Types & GHCi',
    timeEstimate: '4-6 hours',
    intro: `Before we go fast, let us pin down four words you will hear constantly. **(1) An expression** is any piece of code that has a *value* — something the computer can work out the answer to. \`5\` is an expression (its value is 5); so is \`2 + 3\` (value 5) and \`"hi"\` (value: the text "hi"). **(2) A statement**, by contrast, is an instruction that *does* something but has no value of its own (like "print this" in many languages). Here is the surprise for newcomers: Haskell is **expression-oriented** — it is built almost entirely out of expressions, not statements. Even an \`if\` in Haskell produces a value. So your main job, reading Haskell, is to ask "what value does this expression evaluate to?"

**(3) A function** is a named rule that turns input values into an output value, like a recipe: feed it ingredients, get back a dish. \`square x = x * x\` is a function; \`square 4\` is an expression whose value is \`16\`. In Haskell functions are **pure**: given the same input they always return the same output and they never secretly change anything elsewhere (no surprise side effects). That predictability is a core promise of the language. **(4) A type** is a label that says *what kind* of value something is — text, a whole number, a true/false flag, and so on. \`True\` has type \`Bool\` (the type of booleans, whose only values are \`True\` and \`False\`); \`"hello"\` has type \`String\` (text). Every value and every expression in Haskell has a type, fixed and checked *before* the program runs, so whole categories of mistakes are caught early.

The fastest way to learn is the **REPL** — **R**ead, **E**valuate, **P**rint, **L**oop — a prompt where you type one expression and immediately see its value. Haskell's REPL is **GHCi**; start it by typing \`ghci\` in your terminal. Type an expression and press Enter to see its value (\`2 + 3\` gives \`5\`); type \`:t expr\` to ask for an expression's *type* instead of its value (\`:t True\` prints \`True :: Bool\`). One thing that catches beginners: numeric literals are *polymorphic* — \`5\` can be a whole number or a decimal depending on context — which is why \`/\` (decimal division) and \`div\` (whole-number division) behave differently. By the end of this phase you will read a short Haskell expression and predict both its value and its type.

To build intuition, open \`ghci\` and explore: \`:t (+)\`, \`:t "hello"\`, \`5 / 2\`, \`5 \\\`div\\\` 2\`, and \`let x = 3 in x * x\`. Then write a \`Main.hs\` with a few top-level bindings like \`answer = 6 * 7\` and print them from \`main\`. Use \`:i\` to inspect a name and \`:r\` to reload after edits.`,
    topics: [
      { label: 'Learn You a Haskell — Starting Out', url: 'https://learnyouahaskell.github.io/starting-out', note: 'Arithmetic, booleans, and your first functions.' },
      { label: 'Haskell.org — Documentation', url: 'https://www.haskell.org/documentation/', note: 'Index of tutorials, the Report, and library docs.' },
      { label: 'Hoogle', url: 'https://hoogle.haskell.org/', note: 'Search the standard library by name OR by type signature.' },
      { label: 'GHCi User Guide', url: 'https://downloads.haskell.org/ghc/latest/docs/users_guide/ghci.html', note: 'REPL commands: :t, :i, :k, :l, :r.' },
      { label: 'Prelude — base', url: 'https://hackage.haskell.org/package/base/docs/Prelude.html', note: 'The default-imported standard library.' },
    ],
    deliverable: 'A `Main.hs` with several top-level bindings (arithmetic, a string greeting) printed from `main`.',
    checks: [
      {
        kind: 'code',
        id: 'haskell-1-code-1',
        prompt: 'Compute and print arithmetic. The program defines top-level bindings and prints them. Make the output include `area=50`.',
        boilerplate: 'width :: Int\nwidth = 10\n\nheight :: Int\nheight = 5\n\nmain :: IO ()\nmain = do\n  let area = width * height\n  putStrLn ("area=" ++ show area)\n',
        expectedOutput: 'area=50',
        explanation: 'Top-level bindings like `width = 10` are pure values. Inside `do`, `let area = width * height` binds a name to an expression. `show` converts a number to its `String` form, and `++` concatenates strings — the bread and butter of building output.',
      },
      {
        kind: 'mcq',
        id: 'haskell-1-mcq-1',
        prompt: `What does GHCi print for the type query?

\`\`\`haskell
ghci> :t True && False
\`\`\``,
        options: ['`True && False :: Bool`', '`True && False :: Boolean`', '`False`', '`True && False :: Int`'],
        correctIndex: 0,
        explanation: '`:t` reports the *type*, not the value. `(&&) :: Bool -> Bool -> Bool`, so the whole expression has type `Bool`. To see the value you would just evaluate `True && False`, which yields `False`. Haskell\'s boolean type is `Bool` (constructors `True`/`False`), not `Boolean`.',
      },
      {
        kind: 'mcq',
        id: 'haskell-1-mcq-2',
        prompt: `What is the result of evaluating this in GHCi?

\`\`\`haskell
ghci> 7 \\\`div\\\` 2
\`\`\``,
        options: ['`3`', '`3.5`', '`4`', '`2`'],
        correctIndex: 0,
        explanation: '`div` is integer (floor) division, so `7 \\`div\\` 2` is `3`. The backticks turn the prefix function `div` into an infix operator. For fractional division you would use `/`, but `7 / 2 :: Double` is `3.5` and requires a `Fractional` type — you cannot use `/` on `Int`.',
      },
      {
        kind: 'mcq',
        id: 'haskell-1-mcq-3',
        prompt: `Why does this expression fail to type-check?

\`\`\`haskell
ghci> (5 :: Int) / 2
\`\`\``,
        options: [
          'Division by a non-zero literal is forbidden.',
          '`/` requires a `Fractional` instance, and `Int` has none — use `div` for integer division.',
          '`5` must be written `5.0`.',
          'It type-checks fine and yields `2`.',
        ],
        correctIndex: 1,
        explanation: '`(/) :: Fractional a => a -> a -> a`. `Int` is a `Num` but not a `Fractional`, so GHC reports `No instance for (Fractional Int)`. Integer division uses `div`/`quot`; fractional division needs `Double`, `Float`, or `Rational`. This separation is enforced by the typeclass system, covered in Level 6.',
      },
      {
        kind: 'mcq',
        id: 'haskell-1-mcq-4',
        prompt: `What does this print?

\`\`\`haskell
main :: IO ()
main = do
  let x = 3
      y = x + 4
  print (x * y)
\`\`\``,
        options: ['`21`', '`12`', '`7`', '`xy`'],
        correctIndex: 0,
        explanation: 'A `let` in a `do` block can bind several names; layout aligns `y` under `x`. `y = 3 + 4 = 7`, then `x * y = 3 * 7 = 21`. `print` is `putStrLn . show`, so it shows the number and adds a newline. Bindings in a `let` are mutually recursive and order-independent — they describe values, not assignments.',
      },
    ],
  },

  // ─── Level 2 ─────────────────────────────────────────────────────────────
  {
    id: 'haskell-2',
    language: 'haskell',
    level: 2,
    title: 'Functions — Pattern Matching, Guards & Recursion',
    timeEstimate: '4-6 hours',
    intro: `Functions are the heart of Haskell, and you define them by *equations*. The same function can have multiple equations that **pattern match** on the shape of arguments (\`fib 0 = 0\`, \`fib 1 = 1\`, \`fib n = ...\`), matched top to bottom. **Guards** (\`| cond = ...\`) let one equation branch on boolean conditions, and \`where\`/\`let\` introduce local helper bindings. Because there are no loops, **recursion** is how you iterate — and the base case must come first.

In GHCi, define small functions and test them: \`let square x = x * x\`, then \`square 9\`. Write a \`Main.hs\` with a recursive \`factorial\` and a guard-based \`grade\` function, and call them from \`main\`. Watch for *non-exhaustive patterns* warnings (compile with \`-Wall\`) — they mean some input shape has no matching equation and will crash at runtime.`,
    topics: [
      { label: 'Learn You a Haskell — Syntax in Functions', url: 'https://learnyouahaskell.github.io/syntax-in-functions', note: 'Pattern matching, guards, where, case.' },
      { label: 'Learn You a Haskell — Recursion', url: 'https://learnyouahaskell.github.io/recursion', note: 'Thinking recursively with base and recursive cases.' },
      { label: 'Haskell Wikibook — Pattern matching', url: 'https://en.wikibooks.org/wiki/Haskell/Pattern_matching', note: 'How GHC matches constructors and literals.' },
      { label: 'GHC warning flags', url: 'https://downloads.haskell.org/ghc/latest/docs/users_guide/using-warnings.html', note: 'Turn on -Wall to catch non-exhaustive patterns.' },
    ],
    deliverable: 'A `Main.hs` with a recursive `factorial`, a guarded `grade`, and a pattern-matching helper, exercised from `main`.',
    checks: [
      {
        kind: 'code',
        id: 'haskell-2-code-1',
        prompt: 'Print a computed value. Keep it within the runnable subset: bind values with `let` and print them. Make the output include `result=120`.',
        boilerplate: 'main :: IO ()\nmain = do\n  let result = 1 * 2 * 3 * 4 * 5\n  putStrLn ("result=" ++ show result)\n',
        expectedOutput: 'result=120',
        explanation: 'This mirrors what a recursive `factorial 5` would compute (`5! = 120`), written here as a direct product so it runs in the print-based subset. In real code you would write `factorial 0 = 1; factorial n = n * factorial (n - 1)` and call `factorial 5`.',
      },
      {
        kind: 'mcq',
        id: 'haskell-2-mcq-1',
        prompt: `What does \`f 0\` return?

\`\`\`haskell
f :: Int -> String
f 0 = "zero"
f 1 = "one"
f _ = "many"
\`\`\``,
        options: ['`"zero"`', '`"many"`', '`"one"`', 'Runtime error: overlapping patterns'],
        correctIndex: 0,
        explanation: 'Equations are tried top to bottom. `f 0` matches the first equation literally, returning `"zero"`. The wildcard `_` in the last equation matches anything, which is why it must come last — otherwise it would shadow the specific cases. Ordering matters in pattern matching.',
      },
      {
        kind: 'mcq',
        id: 'haskell-2-mcq-2',
        prompt: `What does \`classify (-3)\` return?

\`\`\`haskell
classify :: Int -> String
classify n
  | n < 0     = "negative"
  | n == 0    = "zero"
  | otherwise = "positive"
\`\`\``,
        options: ['`"negative"`', '`"zero"`', '`"positive"`', 'No matching guard'],
        correctIndex: 0,
        explanation: 'Guards are evaluated top to bottom; the first one whose condition is `True` wins. `-3 < 0` is `True`, so the result is `"negative"`. `otherwise` is literally defined as `True` in the Prelude, making it a catch-all final guard. If no guard matched, you would get a runtime "non-exhaustive guards" error.',
      },
      {
        kind: 'mcq',
        id: 'haskell-2-mcq-3',
        prompt: `What does \`go 3\` evaluate to?

\`\`\`haskell
go :: Int -> Int
go 0 = 0
go n = n + go (n - 1)
\`\`\``,
        options: ['`6`', '`3`', '`9`', 'Infinite loop'],
        correctIndex: 0,
        explanation: 'This is a sum-to-`n` recursion: `go 3 = 3 + go 2 = 3 + 2 + go 1 = 3 + 2 + 1 + go 0 = 3 + 2 + 1 + 0 = 6`. The base case `go 0 = 0` terminates the recursion. Without a reachable base case it *would* loop forever — base cases are mandatory.',
      },
      {
        kind: 'mcq',
        id: 'haskell-2-mcq-4',
        prompt: `What happens at runtime when you call \`safe\` on the empty list, i.e. \`safe []\`?

\`\`\`haskell
safe :: [Int] -> Int
safe (x:_) = x
\`\`\``,
        options: [
          'Returns `0`.',
          'Returns `[]`.',
          'Throws a runtime exception: non-exhaustive patterns in `safe`.',
          'Returns `Nothing`.',
        ],
        correctIndex: 2,
        explanation: 'The only equation matches a non-empty list `(x:_)`. The empty list `[]` has no matching equation, so calling `safe []` throws `Non-exhaustive patterns in function safe`. Compiling with `-Wall` warns about this at compile time. The idiomatic fix is to return `Maybe Int` (Level 5) so emptiness is encoded in the type.',
      },
    ],
  },

  // ─── Level 3 ─────────────────────────────────────────────────────────────
  {
    id: 'haskell-3',
    language: 'haskell',
    level: 3,
    title: 'Lists, Ranges, Comprehensions & Laziness',
    timeEstimate: '4-6 hours',
    intro: `Lists are Haskell's workhorse data structure: singly-linked, homogeneous, and built from \`[]\` (empty) and \`(:)\` (cons). You'll meet **ranges** (\`[1..10]\`, \`[2,4..20]\`, \`['a'..'z']\`), **list comprehensions** (\`[x*x | x <- [1..5], even x]\`), and the standard toolkit (\`length\`, \`sum\`, \`take\`, \`drop\`, \`reverse\`, \`zip\`, \`++\`). Crucially, Haskell is **lazy**: \`[1..]\` is an infinite list that is fine to build, and \`take 5 [1..]\` only forces the first five elements.

In GHCi, play with \`take 10 (cycle [1,2,3])\`, \`[ (x,y) | x <- [1..3], y <- "ab" ]\`, and \`sum [1..100]\`. Then write a \`Main.hs\` that builds a list with a comprehension and prints \`sum\`/\`length\`/\`take\` results. Remember strings *are* lists of \`Char\`, so all list functions work on them too.`,
    topics: [
      { label: 'Learn You a Haskell — Starting Out (Lists & Ranges)', url: 'https://learnyouahaskell.github.io/starting-out', note: 'Lists, ranges, and list comprehensions.' },
      { label: 'Data.List — base', url: 'https://hackage.haskell.org/package/base/docs/Data-List.html', note: 'The full standard list API.' },
      { label: 'Haskell Wikibook — Lazy evaluation', url: 'https://en.wikibooks.org/wiki/Haskell/Laziness', note: 'Why infinite lists and take work.' },
      { label: 'Wiki — List comprehension', url: 'https://wiki.haskell.org/List_comprehension', note: 'Generators, guards, and multiple bindings.' },
    ],
    deliverable: 'A `Main.hs` that builds a list via comprehension and prints its sum, length, and the first few elements.',
    checks: [
      {
        kind: 'code',
        id: 'haskell-3-code-1',
        prompt: 'Print the sum of the first five squares. Compute it as a value and print with a label. Output should include `sumSquares=55`.',
        boilerplate: 'main :: IO ()\nmain = do\n  let sumSquares = 1 + 4 + 9 + 16 + 25\n  putStrLn ("sumSquares=" ++ show sumSquares)\n',
        expectedOutput: 'sumSquares=55',
        explanation: 'In real Haskell you would write `sum [x*x | x <- [1..5]]`, which evaluates to `1+4+9+16+25 = 55`. Here we precompute the sum so it runs in the print-based subset, but the value is exactly what the comprehension produces.',
      },
      {
        kind: 'mcq',
        id: 'haskell-3-mcq-1',
        prompt: `What does this evaluate to?

\`\`\`haskell
ghci> [x * 2 | x <- [1..5], even x]
\`\`\``,
        options: ['`[4,8]`', '`[2,4,6,8,10]`', '`[1,2,3,4,5]`', '`[4,8,12]`'],
        correctIndex: 0,
        explanation: 'The guard `even x` keeps only `x` in `{2,4}`. Doubling them gives `[4,8]`. List comprehensions read as "for each `x` drawn from `[1..5]`, where `x` is even, yield `x*2`". The generator, guard, and output expression mirror set-builder notation.',
      },
      {
        kind: 'mcq',
        id: 'haskell-3-mcq-2',
        prompt: `What does this evaluate to?

\`\`\`haskell
ghci> take 5 [1..]
\`\`\``,
        options: ['`[1,2,3,4,5]`', 'Hangs forever building an infinite list', '`[]`', 'Error: range has no upper bound'],
        correctIndex: 0,
        explanation: '`[1..]` is the infinite list of integers from 1. Thanks to **lazy evaluation**, only as much is computed as is demanded: `take 5` forces exactly the first five elements, giving `[1,2,3,4,5]`. This is a defining feature of Haskell — you can define infinite structures and consume finite prefixes of them.',
      },
      {
        kind: 'mcq',
        id: 'haskell-3-mcq-3',
        prompt: `What is the value of this expression?

\`\`\`haskell
ghci> 1 : 2 : 3 : []
\`\`\``,
        options: ['`[1,2,3]`', '`[3,2,1]`', '`[[1],[2],[3]]`', '`6`'],
        correctIndex: 0,
        explanation: 'The cons operator `(:)` prepends an element to a list and is right-associative, so `1 : (2 : (3 : []))` builds `[1,2,3]`. The literal `[1,2,3]` is just sugar for this chain of conses ending in the empty list `[]`. Every Haskell list is a nested sequence of cons cells.',
      },
      {
        kind: 'mcq',
        id: 'haskell-3-mcq-4',
        prompt: `What does this print?

\`\`\`haskell
main :: IO ()
main = do
  let xs = [1..10]
  print (sum xs)
\`\`\``,
        options: ['`55`', '`10`', '`45`', '`100`'],
        correctIndex: 0,
        explanation: '`[1..10]` is `[1,2,...,10]`, and `sum` adds them: `10 * 11 / 2 = 55`. Ranges with `..` are inclusive on both ends. `sum`, `product`, `length`, and `maximum` are common list aggregations from the Prelude.',
      },
      {
        kind: 'mcq',
        id: 'haskell-3-mcq-5',
        prompt: `What does this evaluate to?

\`\`\`haskell
ghci> zip [1,2,3] "ab"
\`\`\``,
        options: ['`[(1,\'a\'),(2,\'b\')]`', '`[(1,\'a\'),(2,\'b\'),(3,\'c\')]`', 'Error: lists have different lengths', '`[(1,2,3),("a","b")]`'],
        correctIndex: 0,
        explanation: '`zip` pairs elements positionally and stops at the **shorter** list, so the extra `3` is dropped. A `String` is `[Char]`, hence `"ab"` is `[\'a\',\'b\']`. The result is a list of tuples `[(1,\'a\'),(2,\'b\')]`. Laziness means `zip` can even pair a finite list against an infinite one.',
      },
    ],
  },

  // ─── Level 4 ─────────────────────────────────────────────────────────────
  {
    id: 'haskell-4',
    language: 'haskell',
    level: 4,
    title: 'Higher-Order Functions, Currying & Partial Application',
    timeEstimate: '5-7 hours',
    intro: `Functions are first-class values: you pass them as arguments, return them, and store them. The classic trio is \`map f xs\` (transform each element), \`filter p xs\` (keep elements satisfying \`p\`), and \`foldr\`/\`foldl\` (collapse a list to a single value). Every Haskell function is **curried**: \`add :: Int -> Int -> Int\` is really \`Int -> (Int -> Int)\`, so applying one argument yields a function — this is **partial application** (\`add 5\` is a function awaiting one more \`Int\`). **Lambdas** (\`\\x -> x + 1\`), **sections** (\`(+1)\`, \`(*2)\`, \`(>0)\`), and **composition** (\`f . g\`) make point-free style natural.

In GHCi, try \`map (*2) [1,2,3]\`, \`filter even [1..10]\`, \`foldr (+) 0 [1..5]\`, and \`(map (+10) . filter odd) [1..6]\`. Then write a \`Main.hs\` that pipelines a list through \`filter\` then \`map\` and prints the \`sum\`.`,
    topics: [
      { label: 'Learn You a Haskell — Higher Order Functions', url: 'https://learnyouahaskell.github.io/higher-order-functions', note: 'Curried functions, lambdas, maps, filters, folds.' },
      { label: 'Wiki — Fold', url: 'https://wiki.haskell.org/Fold', note: 'foldr vs foldl and how folds generalise iteration.' },
      { label: 'Wiki — Currying', url: 'https://wiki.haskell.org/Currying', note: 'Why every function takes one argument.' },
      { label: 'Wiki — Function composition', url: 'https://wiki.haskell.org/Function_composition', note: 'The (.) operator and point-free style.' },
      { label: 'Data.List — base', url: 'https://hackage.haskell.org/package/base/docs/Data-List.html', note: 'map, filter, foldr, foldl, and friends.' },
    ],
    deliverable: 'A `Main.hs` that filters then maps a list and prints the resulting sum, plus a partially-applied helper.',
    checks: [
      {
        kind: 'code',
        id: 'haskell-4-code-1',
        prompt: 'A pipeline `filter even` then `map (*3)` over `[1..6]` keeps `[2,4,6]` and triples them to `[6,12,18]`, summing to 36. Print the precomputed result with label `total=36`.',
        boilerplate: 'main :: IO ()\nmain = do\n  let total = 6 + 12 + 18\n  putStrLn ("total=" ++ show total)\n',
        expectedOutput: 'total=36',
        explanation: 'The real expression is `sum (map (*3) (filter even [1..6]))`. `filter even [1..6] = [2,4,6]`, `map (*3)` gives `[6,12,18]`, and `sum` is `36`. We precompute it here to stay in the print-based subset; the arithmetic is identical to the pipeline\'s output.',
      },
      {
        kind: 'mcq',
        id: 'haskell-4-mcq-1',
        prompt: `What does this evaluate to?

\`\`\`haskell
ghci> map (\\x -> x * x) [1,2,3,4]
\`\`\``,
        options: ['`[1,4,9,16]`', '`[2,4,6,8]`', '`[1,2,3,4]`', '`30`'],
        correctIndex: 0,
        explanation: '`map` applies the lambda `\\x -> x * x` to each element, squaring them: `[1,4,9,16]`. A lambda `\\x -> ...` is an anonymous function. `map :: (a -> b) -> [a] -> [b]` preserves length and never reorders elements.',
      },
      {
        kind: 'mcq',
        id: 'haskell-4-mcq-2',
        prompt: `What is the type of \`add 5\` given the definition below?

\`\`\`haskell
add :: Int -> Int -> Int
add x y = x + y
\`\`\``,
        options: ['`Int -> Int`', '`Int`', '`Int -> Int -> Int`', 'Type error: too few arguments'],
        correctIndex: 0,
        explanation: 'Functions are curried: `Int -> Int -> Int` parses as `Int -> (Int -> Int)`. Applying one argument (`add 5`) returns a function of type `Int -> Int` that adds 5 to its argument. This is **partial application** — there is no such thing as "too few arguments" in Haskell.',
      },
      {
        kind: 'mcq',
        id: 'haskell-4-mcq-3',
        prompt: `What does this evaluate to?

\`\`\`haskell
ghci> foldr (+) 0 [1,2,3,4]
\`\`\``,
        options: ['`10`', '`0`', '`24`', '`[1,2,3,4]`'],
        correctIndex: 0,
        explanation: '`foldr f z [a,b,c,d] = f a (f b (f c (f d z)))`. With `(+)` and seed `0` this is `1 + (2 + (3 + (4 + 0))) = 10`. `foldr` collapses a list from the right; `foldl` associates from the left. Many list functions (`sum`, `map`, `++`) can be expressed as folds.',
      },
      {
        kind: 'mcq',
        id: 'haskell-4-mcq-4',
        prompt: `What does this evaluate to?

\`\`\`haskell
ghci> filter (> 3) [1,2,3,4,5]
\`\`\``,
        options: ['`[4,5]`', '`[1,2,3]`', '`[3,4,5]`', '`True`'],
        correctIndex: 0,
        explanation: '`(> 3)` is a **section** — a partially applied operator equivalent to `\\x -> x > 3`. `filter` keeps only elements for which the predicate is `True`, so `[4,5]` survives. Sections like `(+1)`, `(*2)`, `(10-)`, and `(>3)` are concise predicates and transformers.',
      },
      {
        kind: 'mcq',
        id: 'haskell-4-mcq-5',
        prompt: `What does this evaluate to?

\`\`\`haskell
ghci> (filter odd . map (+1)) [1,2,3,4]
\`\`\``,
        options: ['`[3,5]`', '`[2,4]`', '`[1,3]`', '`[2,3,4,5]`'],
        correctIndex: 0,
        explanation: 'Composition `(f . g) x = f (g x)`, so `g = map (+1)` runs first: `[2,3,4,5]`. Then `f = filter odd` keeps the odds: `[3,5]`. Composition reads right-to-left, which trips up newcomers — `map (+1)` is applied *before* `filter odd`.',
      },
    ],
  },

  // ─── Level 5 ─────────────────────────────────────────────────────────────
  {
    id: 'haskell-5',
    language: 'haskell',
    level: 5,
    title: 'Algebraic Data Types, Maybe & Either',
    timeEstimate: '5-7 hours',
    intro: `**Algebraic data types** (ADTs) are how you model your domain. \`data\` declares a new type with one or more **constructors**: \`data Shape = Circle Double | Rect Double Double\` is a *sum* of two *product* alternatives. You destructure them with pattern matching (often via \`case ... of\`). Record syntax (\`data Person = Person { name :: String, age :: Int }\`) auto-generates field accessors. The standard library leans on two ADTs everywhere: \`Maybe a\` (\`Nothing | Just a\`) for optional values, and \`Either e a\` (\`Left e | Right a\`) for computations that can fail with a reason — together they replace null and exceptions.

In GHCi, explore \`:i Maybe\`, evaluate \`fromMaybe 0 (Just 7)\`, \`fromMaybe 0 Nothing\`, and \`map fst [(1,"a"),(2,"b")]\`. Then write a \`Main.hs\` with your own \`data\` type, a \`case\` that produces a string per constructor, and prints it.`,
    topics: [
      { label: 'Learn You a Haskell — Making Our Own Types', url: 'https://learnyouahaskell.github.io/making-our-own-types-and-typeclasses', note: 'data, constructors, records, and type synonyms.' },
      { label: 'Data.Maybe — base', url: 'https://hackage.haskell.org/package/base/docs/Data-Maybe.html', note: 'maybe, fromMaybe, mapMaybe, catMaybes.' },
      { label: 'Data.Either — base', url: 'https://hackage.haskell.org/package/base/docs/Data-Either.html', note: 'either, lefts, rights, partitionEithers.' },
      { label: 'Haskell Wikibook — Other data structures', url: 'https://en.wikibooks.org/wiki/Haskell/Other_data_structures', note: 'Recursive ADTs like trees.' },
    ],
    deliverable: 'A `Main.hs` defining a custom `data` type and a `case` expression that prints a description per constructor.',
    checks: [
      {
        kind: 'code',
        id: 'haskell-5-code-1',
        prompt: 'Model a `Just 7` optional value defaulting to `0` when absent. `fromMaybe 0 (Just 7)` is `7`. Print the result with label `value=7`.',
        boilerplate: 'main :: IO ()\nmain = do\n  let value = 7\n  putStrLn ("value=" ++ show value)\n',
        expectedOutput: 'value=7',
        explanation: 'The concept being modelled is `fromMaybe 0 (Just 7) == 7` (and `fromMaybe 0 Nothing == 0`). `Maybe` encodes optionality in the type system, so the compiler forces you to handle the `Nothing` case. We print the unwrapped value here to stay in the runnable subset.',
      },
      {
        kind: 'mcq',
        id: 'haskell-5-mcq-1',
        prompt: `What does this evaluate to?

\`\`\`haskell
ghci> fromMaybe 0 Nothing
\`\`\``,
        options: ['`0`', '`Nothing`', '`Just 0`', 'Runtime error'],
        correctIndex: 0,
        explanation: '`fromMaybe :: a -> Maybe a -> a` returns the wrapped value for `Just x`, or the default for `Nothing`. So `fromMaybe 0 Nothing` is `0`, while `fromMaybe 0 (Just 9)` would be `9`. It is the safe way to escape a `Maybe` with a fallback. See [Data.Maybe](https://hackage.haskell.org/package/base/docs/Data-Maybe.html).',
      },
      {
        kind: 'mcq',
        id: 'haskell-5-mcq-2',
        prompt: `What does \`area (Rect 3 4)\` return?

\`\`\`haskell
data Shape = Circle Double | Rect Double Double

area :: Shape -> Double
area (Circle r) = 3.14 * r * r
area (Rect w h) = w * h
\`\`\``,
        options: ['`12.0`', '`7.0`', '`12`', 'Type error'],
        correctIndex: 0,
        explanation: '`Rect 3 4` matches the second equation, binding `w = 3` and `h = 4`, so `area = w * h = 12.0`. The result is a `Double` (note the `.0`). This is a **sum type**: a `Shape` is *either* a `Circle` *or* a `Rect`, and pattern matching dispatches on which constructor was used.',
      },
      {
        kind: 'mcq',
        id: 'haskell-5-mcq-3',
        prompt: `Why is \`Maybe\` preferred over a null/sentinel value for "lookup might fail"?

\`\`\`haskell
lookup :: Eq k => k -> [(k, v)] -> Maybe v
\`\`\``,
        options: [
          'It is faster at runtime than returning a sentinel.',
          'The type `Maybe v` forces callers to handle the `Nothing` case, eliminating null-dereference bugs at compile time.',
          'It automatically retries the lookup until it succeeds.',
          'It allows lookups on lists of any length, unlike sentinels.',
        ],
        correctIndex: 1,
        explanation: 'Returning `Maybe v` makes "no result" a value the type system tracks. To use the result you must pattern match or use `maybe`/`fromMaybe`, so the compiler rejects code that forgets the failure case. This is Haskell\'s answer to the "billion-dollar mistake" of null references.',
      },
      {
        kind: 'mcq',
        id: 'haskell-5-mcq-4',
        prompt: `What does \`describe (Left "boom")\` return?

\`\`\`haskell
describe :: Either String Int -> String
describe (Left e)  = "error: " ++ e
describe (Right n) = "ok: " ++ show n
\`\`\``,
        options: ['`"error: boom"`', '`"ok: boom"`', '`"boom"`', 'Type error: Left holds a String, Right an Int'],
        correctIndex: 0,
        explanation: '`Either e a` is a sum type with `Left e` (conventionally the failure/error branch) and `Right a` (the success branch). `Left "boom"` matches the first equation, producing `"error: boom"`. The two type parameters can differ — here `Left` carries `String` and `Right` carries `Int`, which is exactly the point of `Either`.',
      },
    ],
  },

  // ─── Level 6 ─────────────────────────────────────────────────────────────
  {
    id: 'haskell-6',
    language: 'haskell',
    level: 6,
    title: 'Typeclasses — Eq, Ord, Show, Num',
    timeEstimate: '5-7 hours',
    intro: `**Typeclasses** are Haskell's mechanism for ad-hoc polymorphism — interfaces that types can *implement* (become *instances* of). \`Eq\` provides \`==\`/\`/=\`, \`Ord\` provides \`<\`, \`compare\`, \`max\`; \`Show\` provides \`show\` (value → String) and \`Read\` parses back; \`Num\` provides \`+\`, \`*\`, \`abs\`, \`fromInteger\`. A type signature like \`elem :: Eq a => a -> [a] -> Bool\` has a **class constraint** (\`Eq a =>\`) meaning "for any \`a\` that is comparable for equality". You can \`deriving (Eq, Ord, Show)\` to get sensible instances for free on your own \`data\` types.

In GHCi, run \`:i Ord\`, \`compare 3 5\`, \`maximum "haskell"\`, \`show [1,2,3]\`, and \`sort [3,1,2]\` (after \`import Data.List\`). Then add \`deriving (Show, Eq)\` to a \`data\` type and \`print\` a value of it — \`deriving Show\` is what lets \`print\` work on custom types.`,
    topics: [
      { label: 'Learn You a Haskell — Typeclasses 101', url: 'https://learnyouahaskell.github.io/types-and-typeclasses', note: 'Eq, Ord, Show, Read, Enum, Bounded, Num.' },
      { label: 'Learn You a Haskell — Making typeclasses', url: 'https://learnyouahaskell.github.io/making-our-own-types-and-typeclasses', note: 'class/instance and deriving.' },
      { label: 'Data.Ord — base', url: 'https://hackage.haskell.org/package/base/docs/Data-Ord.html', note: 'Ordering, comparing, the Ord class.' },
      { label: 'Wiki — Type class', url: 'https://wiki.haskell.org/Type_class', note: 'The mechanics and dictionary-passing model.' },
    ],
    deliverable: 'A `Main.hs` with a `data` type `deriving (Show, Eq, Ord)`, demonstrating `==`, `compare`, and `show` via `print`.',
    checks: [
      {
        kind: 'code',
        id: 'haskell-6-code-1',
        prompt: 'Demonstrate an `Ord` comparison as a boolean. `3 < 5` is `True`. Print a label line `cmp=True`.',
        boilerplate: 'main :: IO ()\nmain = do\n  let cmp = 3 < 5\n  putStrLn ("cmp=" ++ show cmp)\n',
        expectedOutput: 'cmp=True',
        explanation: '`(<) :: Ord a => a -> a -> Bool` comes from the `Ord` typeclass, and `3 < 5` is `True`. `show` (from the `Show` class) renders the `Bool` as the text `True`. These two classes — `Ord` for ordering and `Show` for display — are among the most-used in everyday Haskell.',
      },
      {
        kind: 'mcq',
        id: 'haskell-6-mcq-1',
        prompt: `What does this evaluate to?

\`\`\`haskell
ghci> compare 7 7
\`\`\``,
        options: ['`EQ`', '`True`', '`0`', '`LT`'],
        correctIndex: 0,
        explanation: '`compare :: Ord a => a -> a -> Ordering` returns one of `LT`, `EQ`, or `GT`. Since `7 == 7`, the result is `EQ`. `Ordering` is itself an ordinary ADT (`data Ordering = LT | EQ | GT`), which is why it shows as a constructor name rather than a number.',
      },
      {
        kind: 'mcq',
        id: 'haskell-6-mcq-2',
        prompt: `What does the constraint mean here?

\`\`\`haskell
elem :: Eq a => a -> [a] -> Bool
\`\`\``,
        options: [
          '`a` must be a list type.',
          '`a` can be any type that is an instance of `Eq` (supports `==`).',
          '`a` is always `Int`.',
          'The function returns an `Eq` value.',
        ],
        correctIndex: 1,
        explanation: 'The part before `=>` is a **class constraint**. `Eq a =>` says `elem` works for *any* type `a` that has an `Eq` instance, because internally it uses `==` to test membership. Constraints make polymorphism principled: you can only use operations the constraints guarantee.',
      },
      {
        kind: 'mcq',
        id: 'haskell-6-mcq-3',
        prompt: `What does \`Red == Red\` evaluate to, and why does it compile?

\`\`\`haskell
data Colour = Red | Green | Blue deriving (Eq, Show)
\`\`\``,
        options: [
          '`True`, because `deriving Eq` generates a structural `==` for `Colour`.',
          'Compile error: you cannot compare constructors.',
          '`False`, constructors are never equal to themselves.',
          '`Red`, comparison returns the left operand.',
        ],
        correctIndex: 0,
        explanation: '`deriving Eq` makes GHC synthesise an `Eq` instance comparing constructors (and any fields) structurally, so `Red == Red` is `True`. Without the `deriving` clause, `==` on `Colour` would be a type error. `deriving (Eq, Ord, Show, Read, Enum, Bounded)` is the idiomatic way to get standard instances.',
      },
      {
        kind: 'mcq',
        id: 'haskell-6-mcq-4',
        prompt: `What does this evaluate to?

\`\`\`haskell
ghci> maximum [3, 1, 4, 1, 5, 9, 2, 6]
\`\`\``,
        options: ['`9`', '`6`', '`3`', '`[9]`'],
        correctIndex: 0,
        explanation: '`maximum :: Ord a => [a] -> a` returns the largest element, `9`, using the `Ord` instance for the element type. It is partial: `maximum []` throws an error because there is no largest element of an empty list. `minimum`, `sort`, and `compare` are all powered by `Ord`.',
      },
    ],
  },

  // ─── Level 7 ─────────────────────────────────────────────────────────────
  {
    id: 'haskell-7',
    language: 'haskell',
    level: 7,
    title: 'Functor, Applicative & Monad',
    timeEstimate: '6-8 hours',
    intro: `This is the famous trio. **Functor** generalises "mapping over a structure": \`fmap :: (a -> b) -> f a -> f b\`, with \`<$>\` as its operator (\`(+1) <$> Just 4 == Just 5\`). **Applicative** lets you apply a *wrapped* function to *wrapped* arguments: \`pure\` lifts a value and \`<*>\` applies (\`Just (+3) <*> Just 4 == Just 7\`). **Monad** sequences computations where each step depends on the previous result: \`>>=\` ("bind", \`m a -> (a -> m b) -> m b\`) and \`return\`. \`Maybe\`, \`Either\`, lists, and \`IO\` are all monads, which is why the same \`do\` syntax works for all of them — short-circuiting on \`Nothing\`/\`Left\`, branching for lists.

You won't run these in the sandbox, but predicting their results is the whole game. In GHCi, try \`(*2) <$> [1,2,3]\`, \`Just (+1) <*> Just 10\`, \`Just 3 >>= \\x -> Just (x + 1)\`, and \`Nothing >>= \\x -> Just (x + 1)\`. Notice how \`Nothing\` propagates automatically.`,
    topics: [
      { label: 'Learn You a Haskell — Functors, Applicative Functors and Monoids', url: 'https://learnyouahaskell.github.io/functors-applicative-functors-and-monoids', note: 'fmap, <$>, pure, <*>.' },
      { label: 'Learn You a Haskell — A Fistful of Monads', url: 'https://learnyouahaskell.github.io/a-fistful-of-monads', note: 'The Monad class, >>=, and Maybe as a monad.' },
      { label: 'Wiki — Typeclassopedia', url: 'https://wiki.haskell.org/Typeclassopedia', note: 'The definitive map of Functor/Applicative/Monad and laws.' },
      { label: 'Control.Monad — base', url: 'https://hackage.haskell.org/package/base/docs/Control-Monad.html', note: '>>=, >>, return, mapM, when, sequence.' },
    ],
    deliverable: 'A `Main.hs` that prints a value computed in the spirit of `fmap`/`<*>`, plus written notes predicting several `>>=` chains.',
    checks: [
      {
        kind: 'code',
        id: 'haskell-7-code-1',
        prompt: 'Model `(+1) <$> Just 4`, which yields `Just 5`. Print the unwrapped inner value with label `mapped=5`.',
        boilerplate: 'main :: IO ()\nmain = do\n  let mapped = 4 + 1\n  putStrLn ("mapped=" ++ show mapped)\n',
        expectedOutput: 'mapped=5',
        explanation: '`fmap`/`<$>` applies a function *inside* a structure without unwrapping it: `(+1) <$> Just 4 == Just 5`. We print the inner `5` to stay in the runnable subset. The key idea is that `fmap` leaves the `Just` wrapper intact while transforming its contents — and `(+1) <$> Nothing` would stay `Nothing`.',
      },
      {
        kind: 'mcq',
        id: 'haskell-7-mcq-1',
        prompt: `What does this evaluate to?

\`\`\`haskell
ghci> (*2) <$> Just 5
\`\`\``,
        options: ['`Just 10`', '`10`', '`Just 5`', '`Nothing`'],
        correctIndex: 0,
        explanation: '`<$>` is infix `fmap`. For `Maybe`, `fmap f (Just x) = Just (f x)`, so `(*2) <$> Just 5 = Just 10`. The wrapper is preserved. If the value were `Nothing`, the result would be `Nothing` — `fmap` over `Nothing` does nothing.',
      },
      {
        kind: 'mcq',
        id: 'haskell-7-mcq-2',
        prompt: `What does this evaluate to?

\`\`\`haskell
ghci> Just (+3) <*> Just 4
\`\`\``,
        options: ['`Just 7`', '`Just 12`', '`7`', 'Type error'],
        correctIndex: 0,
        explanation: '`<*>` (from `Applicative`) applies a wrapped function to a wrapped argument: `Just (+3) <*> Just 4 = Just (4 + 3) = Just 7`. If either side were `Nothing`, the result would be `Nothing`. Applicative lets you combine multiple independent effectful values, e.g. `(+) <$> Just 2 <*> Just 5 = Just 7`.',
      },
      {
        kind: 'mcq',
        id: 'haskell-7-mcq-3',
        prompt: `What does this evaluate to?

\`\`\`haskell
ghci> Nothing >>= \\x -> Just (x + 1)
\`\`\``,
        options: ['`Nothing`', '`Just 1`', '`Just 0`', 'Type error'],
        correctIndex: 0,
        explanation: 'For the `Maybe` monad, `Nothing >>= f = Nothing` — bind short-circuits, never calling `f`. This automatic propagation of failure is the whole appeal: a chain `a >>= b >>= c` stops at the first `Nothing`. `Just x >>= f` would instead evaluate `f x`.',
      },
      {
        kind: 'mcq',
        id: 'haskell-7-mcq-4',
        prompt: `What does this \`do\` block in the \`Maybe\` monad produce?

\`\`\`haskell
result :: Maybe Int
result = do
  x <- Just 10
  y <- Just 5
  return (x - y)
\`\`\``,
        options: ['`Just 5`', '`5`', '`Nothing`', '`Just 15`'],
        correctIndex: 0,
        explanation: '`do` notation desugars to `>>=`. `x <- Just 10` binds `x = 10`, `y <- Just 5` binds `y = 5`, and `return (x - y)` is `Just 5`. Because both binds succeeded, the whole computation succeeds. If any bind were `Nothing`, the entire block would be `Nothing` — same `do` syntax, monad-specific behaviour.',
      },
      {
        kind: 'mcq',
        id: 'haskell-7-mcq-5',
        prompt: `What does this evaluate to?

\`\`\`haskell
ghci> [1,2] >>= \\x -> [x, x * 10]
\`\`\``,
        options: ['`[1,10,2,20]`', '`[1,2,10,20]`', '`[10,20]`', '`[[1,10],[2,20]]`'],
        correctIndex: 0,
        explanation: 'The list monad models nondeterminism: `xs >>= f = concatMap f xs`. Applying `\\x -> [x, x*10]` to `1` gives `[1,10]`, to `2` gives `[2,20]`, and bind concatenates them: `[1,10,2,20]`. This is why list comprehensions and the list monad are interchangeable.',
      },
    ],
  },

  // ─── Level 8 ─────────────────────────────────────────────────────────────
  {
    id: 'haskell-8',
    language: 'haskell',
    level: 8,
    title: 'IO & the IO Monad — do-notation',
    timeEstimate: '5-7 hours',
    intro: `Haskell is **pure**: a function given the same inputs always returns the same output, with no hidden side effects. So how do you print, read files, or get the time? Through the \`IO\` monad. A value of type \`IO a\` is a *description* of an effect that produces an \`a\` when run by the runtime — building it is pure, executing it is the runtime's job (\`main :: IO ()\`). **do-notation** sequences \`IO\` actions: \`<-\` binds an action's result (\`name <- getLine\`), and bare actions like \`putStrLn "hi"\` run for their effect. \`let\` (no \`<-\`) binds pure values inside \`do\`.

In GHCi, run \`:t putStrLn\`, \`:t getLine\`, and a tiny interactive program. Then write a \`Main.hs\` that uses \`let\` bindings and several \`putStrLn\`/\`print\` lines — exactly the runnable subset here. Note: \`getLine\`-style input isn't available in this sandbox, so test those locally with \`runghc\`.`,
    topics: [
      { label: 'Learn You a Haskell — Input and Output', url: 'https://learnyouahaskell.github.io/input-and-output', note: 'main, do, getLine, return, putStr/putStrLn.' },
      { label: 'System.IO — base', url: 'https://hackage.haskell.org/package/base/docs/System-IO.html', note: 'Handles, files, buffering, hPutStrLn.' },
      { label: 'Wiki — Introduction to IO', url: 'https://wiki.haskell.org/Introduction_to_IO', note: 'Why IO is a monad and how purity is preserved.' },
      { label: 'Wiki — IO inside', url: 'https://wiki.haskell.org/IO_inside', note: 'How IO actions are values and how purity is kept.' },
    ],
    deliverable: 'A `Main.hs` that sequences multiple `putStrLn`/`print` actions and `let`-bound values inside a single `do` block.',
    checks: [
      {
        kind: 'code',
        id: 'haskell-8-code-1',
        prompt: 'Write a `do` block that greets a hard-coded name and prints a computed count. Include the line `Hello, Ada!` and a line `lines=3`.',
        boilerplate: 'main :: IO ()\nmain = do\n  let name = "Ada"\n  putStrLn ("Hello, " ++ name ++ "!")\n  let lineCount = 1 + 1 + 1\n  putStrLn ("lines=" ++ show lineCount)\n  print (lineCount * 2)\n',
        expectedOutput: 'Hello, Ada!',
        explanation: 'A `do` block sequences `IO` actions top to bottom. `let` binds pure values (no `<-` needed). `putStrLn` prints strings built with `++`, and `print x` is `putStrLn (show x)`. Building these actions is pure; the runtime executes them when it evaluates `main`.',
        testCases: [
          { expectedOutput: 'lines=3', description: 'Computed count is printed' },
          { expectedOutput: '6', description: 'print (lineCount * 2) outputs 6' },
        ],
      },
      {
        kind: 'mcq',
        id: 'haskell-8-mcq-1',
        prompt: 'What is the type of `getLine`?',
        options: ['`IO String`', '`String`', '`String -> IO ()`', '`IO ()`'],
        correctIndex: 0,
        explanation: '`getLine :: IO String` is an action that, when run, reads a line from stdin and yields a `String`. You extract that `String` with `<-` inside a `do` block: `name <- getLine`. The `IO` wrapper marks it as effectful, keeping the rest of the language pure.',
      },
      {
        kind: 'mcq',
        id: 'haskell-8-mcq-2',
        prompt: `What is the difference between \`<-\` and \`let\` inside a \`do\` block?

\`\`\`haskell
main = do
  x <- getLine        -- (A)
  let y = "constant"  -- (B)
  putStrLn (x ++ y)
\`\`\``,
        options: [
          '`<-` binds the *result* of running an `IO` action; `let` binds a *pure* value without running any action.',
          'They are interchangeable; `let` is just older syntax.',
          '`let` runs the action and `<-` defines a constant.',
          '`<-` can only appear once per `do` block.',
        ],
        correctIndex: 0,
        explanation: '`x <- getLine` executes the action `getLine` and binds its produced `String` to `x`. `let y = "constant"` binds a pure value and runs no effect — there is no action to run. Using `let` where you need `<-` (or vice versa) is a common beginner type error.',
      },
      {
        kind: 'mcq',
        id: 'haskell-8-mcq-3',
        prompt: `Why does this fail to type-check?

\`\`\`haskell
main :: IO ()
main = do
  let n = getLine
  putStrLn n
\`\`\``,
        options: [
          '`let` cannot appear in a `do` block.',
          '`n` is bound to the *action* `getLine :: IO String`, but `putStrLn` expects a `String`; you needed `n <- getLine`.',
          '`getLine` is not in scope without an import.',
          'It type-checks and prints an empty line.',
        ],
        correctIndex: 1,
        explanation: '`let n = getLine` makes `n :: IO String` — the action itself, not its result. `putStrLn :: String -> IO ()` then rejects it. To get the `String` you must *run* the action with `n <- getLine`. This captures the central distinction: an `IO` value is a recipe, and `<-` is how you run it and grab the result.',
      },
      {
        kind: 'mcq',
        id: 'haskell-8-mcq-4',
        prompt: `What does this print?

\`\`\`haskell
main :: IO ()
main = do
  putStr "a"
  putStr "b"
  putStrLn "c"
\`\`\``,
        options: ['`abc`', '`a b c`', '`a` then `b` then `c` on separate lines', '`c`'],
        correctIndex: 0,
        explanation: '`putStr` writes without a trailing newline; only `putStrLn` adds one. So the three actions run in sequence and produce `abc` followed by a single newline. `do` is just sugar for sequencing with `>>`; the order of actions is exactly their textual order.',
      },
    ],
  },

  // ─── Level 9 ─────────────────────────────────────────────────────────────
  {
    id: 'haskell-9',
    language: 'haskell',
    level: 9,
    title: 'Laziness, Evaluation, Strictness & Space',
    timeEstimate: '6-8 hours',
    intro: `Haskell evaluates **lazily** (non-strict, call-by-need): expressions become **thunks** (deferred computations) that are forced only when their value is demanded, and once forced, shared. This enables infinite data and elegant control flow, but it has a dark side: **space leaks**. A lazy \`foldl (+) 0 [1..10000000]\` builds a giant chain of unevaluated additions before collapsing it, blowing the stack/heap. The cures are **strictness**: \`foldl'\` (from \`Data.List\`) forces the accumulator each step, \`seq\` forces a value to **weak head normal form** (WHNF), and the \`BangPatterns\`/\`$!\` tools force arguments. \`undefined\`/\`error\` only blow up when *forced*, so \`fst (1, undefined)\` is perfectly fine.

You'll reason about *when* things evaluate. In GHCi, try \`take 3 (repeat 7)\`, \`fst (1, undefined)\`, and contrast \`foldl (+) 0 [1..1000000]\` (slow, leaky) with \`foldl' (+) 0 [1..1000000]\` (constant space). Use \`:sprint\` to watch thunks force.`,
    topics: [
      { label: 'Haskell Wikibook — Laziness', url: 'https://en.wikibooks.org/wiki/Haskell/Laziness', note: 'Thunks, WHNF, and call-by-need explained.' },
      { label: 'Wiki — Performance/Laziness', url: 'https://wiki.haskell.org/Performance/Laziness', note: 'Space leaks and how to fix them.' },
      { label: 'Wiki — Weak head normal form', url: 'https://wiki.haskell.org/Weak_head_normal_form', note: 'What seq actually forces.' },
      { label: 'Data.List — base', url: 'https://hackage.haskell.org/package/base/docs/Data-List.html', note: 'foldl\' — the strict left fold you usually want.' },
    ],
    deliverable: 'A `Main.hs` printing values that demonstrate finite consumption of lazy structures, plus notes contrasting `foldl` and `foldl\'`.',
    checks: [
      {
        kind: 'code',
        id: 'haskell-9-code-1',
        prompt: 'Demonstrate that `take 3 (repeat 7)` is `[7,7,7]`, summing to 21 — a finite slice of an infinite list. Print the precomputed sum with label `taken=21`.',
        boilerplate: 'main :: IO ()\nmain = do\n  let taken = 7 + 7 + 7\n  putStrLn ("taken=" ++ show taken)\n',
        expectedOutput: 'taken=21',
        explanation: '`repeat 7` is the infinite list `[7,7,7,...]`. Laziness lets `take 3` force only three elements, giving `[7,7,7]` whose sum is `21`. We precompute the sum here for the runnable subset, but the value is exactly what the lazy expression produces — the infinite tail is never evaluated.',
      },
      {
        kind: 'mcq',
        id: 'haskell-9-mcq-1',
        prompt: `What does this evaluate to?

\`\`\`haskell
ghci> fst (1, undefined)
\`\`\``,
        options: ['`1`', 'Runtime error: undefined', '`(1, undefined)`', '`undefined`'],
        correctIndex: 0,
        explanation: 'Laziness means `undefined` is only evaluated when *forced*. `fst` returns the first component and never demands the second, so the `undefined` thunk is discarded unevaluated. The result is `1`. This is why "bottom" (`⊥`) can sit harmlessly in unused positions.',
      },
      {
        kind: 'mcq',
        id: 'haskell-9-mcq-2',
        prompt: 'Why can `foldl (+) 0 [1..10000000]` cause a space leak while `foldl\' (+) 0 [1..10000000]` does not?',
        options: [
          '`foldl` is recursive and `foldl\'` is iterative.',
          '`foldl` builds a chain of unevaluated thunks for the accumulator; `foldl\'` forces the accumulator to WHNF each step, using constant space.',
          '`foldl\'` uses a different, faster addition operator.',
          '`foldl` traverses the list twice.',
        ],
        correctIndex: 1,
        explanation: 'Lazy `foldl` defers the additions, accumulating `(((0+1)+2)+3)+...` as nested thunks that only collapse at the end — O(n) heap that often overflows. `foldl\'` (note the prime) forces the accumulator strictly on each step, so it runs in constant space. For strict left accumulation, reach for `foldl\'` from `Data.List`.',
      },
      {
        kind: 'mcq',
        id: 'haskell-9-mcq-3',
        prompt: 'What does `seq a b` do?',
        options: [
          'Returns `b`, but first forces `a` to weak head normal form.',
          'Returns `a` and discards `b`.',
          'Runs `a` and `b` in parallel.',
          'Compares `a` and `b` for equality.',
        ],
        correctIndex: 0,
        explanation: '`seq :: a -> b -> b` evaluates its first argument to WHNF (just enough to expose the outermost constructor), then returns the second. It is the primitive tool for adding strictness, e.g. to defeat thunk build-up. `x \\`seq\\` y` is also written `seq x y`; `$!` is strict application built on it.',
      },
      {
        kind: 'mcq',
        id: 'haskell-9-mcq-4',
        prompt: `What does this evaluate to?

\`\`\`haskell
ghci> take 4 (cycle [1,2])
\`\`\``,
        options: ['`[1,2,1,2]`', '`[1,2]`', 'Hangs forever', '`[1,1,2,2]`'],
        correctIndex: 0,
        explanation: '`cycle [1,2]` is the infinite list `[1,2,1,2,1,2,...]`. Laziness lets `take 4` force just four elements: `[1,2,1,2]`. Without lazy evaluation, building `cycle`\'s result would never terminate — non-strict semantics are what make this productive.',
      },
    ],
  },

  // ─── Level 10 ────────────────────────────────────────────────────────────
  {
    id: 'haskell-10',
    language: 'haskell',
    level: 10,
    title: 'Monad Transformers, Type-Level Programming & GHC Performance',
    timeEstimate: '6-8 hours',
    intro: `The capstone. Real programs need to combine effects — state *and* IO *and* failure. **Monad transformers** stack monads: \`StateT s IO\`, \`ReaderT env (ExceptT e IO)\`, etc., from the \`mtl\`/\`transformers\` libraries, with \`lift\` to reach inner layers and the \`MonadIO\` class (\`liftIO\`) to run \`IO\` from anywhere in the stack. On the types side, GHC extensions unlock **type-level programming**: \`GADTs\`, \`DataKinds\`, type families, and phantom types let you push invariants into types the compiler checks. Finally, performance: GHC compiles via Core with aggressive **inlining**, **fusion** (eliminating intermediate lists), and strictness analysis; you tune with \`-O2\`, \`{-# INLINE #-}\`/\`{-# SPECIALIZE #-}\` pragmas, profiling (\`-prof\`), and strict data fields.

This level is conceptual — predict behaviour and pick the right tool. Skim the docs below, then locally try building a tiny \`StateT Int IO\` counter and compile something with \`-O2\` to see fusion in action.`,
    topics: [
      { label: 'transformers — Hackage', url: 'https://hackage.haskell.org/package/transformers', note: 'StateT, ReaderT, ExceptT, MaybeT, lift.' },
      { label: 'mtl — Hackage', url: 'https://hackage.haskell.org/package/mtl', note: 'MonadState/MonadReader classes that avoid manual lifts.' },
      { label: 'Wiki — Monad Transformers', url: 'https://wiki.haskell.org/Monad_Transformers', note: 'Why and how to stack monads.' },
      { label: 'GHC Users Guide — Optimisation', url: 'https://downloads.haskell.org/ghc/latest/docs/users_guide/using-optimisation.html', note: '-O2, inlining, fusion, and tuning flags.' },
      { label: 'GHC Language Extensions', url: 'https://downloads.haskell.org/ghc/latest/docs/users_guide/exts.html', note: 'GADTs, DataKinds, TypeFamilies, and more.' },
    ],
    deliverable: 'A `Main.hs` printing a value from a conceptual stateful computation, plus written notes choosing transformers and GHC flags for given scenarios.',
    checks: [
      {
        kind: 'code',
        id: 'haskell-10-code-1',
        prompt: 'A `StateT Int` counter incremented three times from `0` ends at `3`. Print the final count with label `count=3`.',
        boilerplate: 'main :: IO ()\nmain = do\n  let count = 0 + 1 + 1 + 1\n  putStrLn ("count=" ++ show count)\n',
        expectedOutput: 'count=3',
        explanation: 'A `StateT Int IO` computation threading an `Int` and doing three `modify (+1)` steps from `0` would yield a final state of `3`. We print the arithmetic result directly to stay in the runnable subset; the transformer machinery is what lets you carry that mutable-feeling state purely on top of `IO`.',
      },
      {
        kind: 'mcq',
        id: 'haskell-10-mcq-1',
        prompt: 'What problem do monad transformers solve?',
        options: [
          'They make pure functions run faster.',
          'They let you combine the capabilities of several monads (e.g. state, error, and IO) into one stack you can program against.',
          'They convert any type into a monad automatically.',
          'They replace the need for the IO monad entirely.',
        ],
        correctIndex: 1,
        explanation: 'A single monad gives one kind of effect. Transformers like `StateT`, `ReaderT`, and `ExceptT` wrap an inner monad to *add* a capability, so `StateT s (ExceptT e IO) a` has state, typed errors, and IO at once. `lift` (or `mtl`\'s typeclasses) routes operations to the right layer. See [Monad Transformers](https://wiki.haskell.org/Monad_Transformers).',
      },
      {
        kind: 'mcq',
        id: 'haskell-10-mcq-2',
        prompt: 'In a transformer stack such as `StateT Int IO`, what does `liftIO` do?',
        options: [
          'Runs an `IO` action from within the transformer stack by lifting it through the layers.',
          'Converts an `IO` action into pure code.',
          'Removes the `StateT` layer.',
          'Forces strict evaluation of the state.',
        ],
        correctIndex: 0,
        explanation: '`liftIO :: MonadIO m => IO a -> m a` lifts a raw `IO` action (like `putStrLn`) so it can run inside a monad transformer stack whose base is `IO`. It generalises repeated `lift`s for the common case of reaching `IO`. The `MonadIO` class is what makes `liftIO` work for any IO-based stack.',
      },
      {
        kind: 'mcq',
        id: 'haskell-10-mcq-3',
        prompt: 'What does compiling with `-O2` plus list fusion primarily achieve for `sum (map (*2) (filter even [1..n]))`?',
        options: [
          'It parallelises the computation across CPU cores.',
          'It eliminates the intermediate lists so the pipeline runs in a single pass with no allocation of temporaries.',
          'It memoises the result for repeated calls.',
          'It switches the list to a mutable array.',
        ],
        correctIndex: 1,
        explanation: 'GHC\'s **fusion** (e.g. foldr/build or stream fusion) rewrites composed `map`/`filter`/`fold` pipelines so the intermediate lists are never materialised — the whole thing becomes one loop. `-O2` enables the aggressive inlining and rewrite rules that make fusion fire. It is a key reason idiomatic, composed Haskell can be fast.',
      },
      {
        kind: 'mcq',
        id: 'haskell-10-mcq-4',
        prompt: `What capability does the \`DataKinds\` extension primarily add?

\`\`\`haskell
{-# LANGUAGE DataKinds #-}
\`\`\``,
        options: [
          'It lets data constructors and types be promoted to the type level, so values like `True` or a `Nat` can appear in types.',
          'It allows mutable data fields.',
          'It enables deriving for all typeclasses automatically.',
          'It turns off lazy evaluation for data types.',
        ],
        correctIndex: 0,
        explanation: '`DataKinds` *promotes* ordinary data types to **kinds** and their constructors to **type-level values**, enabling type-level programming (e.g. length-indexed vectors with `Nat`). Combined with `GADTs` and type families, it lets you encode and statically check invariants in types. See [GHC Language Extensions](https://downloads.haskell.org/ghc/latest/docs/users_guide/exts.html).',
      },
    ],
  },
];
