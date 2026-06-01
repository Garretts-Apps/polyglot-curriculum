import type { Phase } from './types';

export const lispPhases: Phase[] = [
  // ─── Level 0 ─────────────────────────────────────────────────────────────
  {
    id: 'lisp-0',
    language: 'lisp',
    level: 0,
    title: 'Setup & Hello World',
    timeEstimate: '0.5-1 hours',
    intro: `Welcome to Common Lisp — one of the oldest and most influential programming languages, and the one where "code is data". A *program* is just a list of instructions you write in a text file (or type live), and the computer carries them out top to bottom. In this level you'll install a Common Lisp implementation (SBCL is the canonical choice), start the interactive **REPL** (Read-Eval-Print Loop — a prompt that runs one expression at a time and shows the result), and print your very first line of text. Absolute beginners start here; we assume you have never written code before.

Here is the whole program you'll run: \`(format t "Hello, Lisp!~%")\`. It looks alien, so let's take it apart slowly, left to right.

- **The outer parentheses \`( ... )\`** are the single most important thing in Lisp. In most languages you'd write something like \`format("Hello")\`. In Lisp, the parentheses come *first* and the thing you want to do goes *inside them, at the front*. So \`(format t "Hello, Lisp!~%")\` means: "**call** the action named \`format\`, and hand it three pieces of information: \`t\`, the text, and nothing else." This "operator first, then its inputs" style is called **prefix notation**, and the parenthesised thing as a whole is called an **s-expression** (symbolic expression). Every action in Lisp is written this way: the verb, then its inputs, all wrapped in one pair of parentheses.
- **\`format\`** is the name of a built-in tool (a *function*) whose job is to print text. Think of it as the word "print" — though it can do much fancier formatting too, which is why it has a more general name.
- **\`t\`** tells \`format\` *where* to send the text. \`t\` here means "the screen" (technically *standard output*, the console window). It is the **destination**. If you wrote \`nil\` instead of \`t\`, \`format\` would build the text but hand it back to you quietly instead of showing it on screen.
- **\`"Hello, Lisp!~%"\`** is the actual message. The double quotes mark the start and end of a piece of **text** (called a *string*) — everything between them is printed literally. Quotes are not printed; they just say "the text is this".
- **\`~%\`** lives inside the string but is *not* printed as the characters tilde-percent. It is a **directive** — a little instruction to \`format\` meaning "start a new line here" (a newline). It's the portable Lisp way of doing what pressing Enter does. Without it, the next thing printed would sit on the same line.

Run it and you'll see \`Hello, Lisp!\` appear, followed by the cursor dropping to a fresh line. That's your first program.`,
    topics: [
      {
        label: 'Steel Bank Common Lisp (SBCL)',
        url: 'https://www.sbcl.org/',
        note: 'The most widely used open-source Common Lisp compiler; download and install for your OS.',
      },
      {
        label: 'The Common Lisp Cookbook — Getting Started',
        url: 'https://lispcookbook.github.io/cl-cookbook/getting-started.html',
        note: 'Installing an implementation, picking an editor, and starting a REPL.',
      },
      {
        label: 'Practical Common Lisp — Introduction',
        url: 'https://gigamonkeys.com/book/introduction-why-lisp.html',
        note: "Peter Seibel's free book; the standard modern introduction.",
      },
    ],
    deliverable: 'Install SBCL, start a REPL with `sbcl`, and run a program that prints `Hello, Lisp!`.',
    checks: [
      {
        kind: 'code',
        id: 'lisp-0-code-1',
        prompt: 'Run the starter code: it prints `Hello, Lisp!` to standard output using `format`.',
        boilerplate: '(format t "Hello, Lisp!~%")\n',
        expectedOutput: 'Hello, Lisp!',
        explanation:
          'Let\'s read `(format t "Hello, Lisp!~%")` one token at a time. **The outer `( ... )`** mark a single *function call*: in Lisp the operator (the verb) comes first and its inputs follow, all inside one pair of parentheses — this is *prefix notation*. Remove a parenthesis and the program no longer reads as a complete call and errors. **`format`** is the function whose job is to produce output; it is what does the printing. **`t`** answers "print *where*?" — `t` means standard output, the screen. Change it to `nil` and nothing appears on screen (the text is returned to the caller instead); remove it and `format` has no destination and errors. **`"Hello, Lisp!~%"`** is the *string* — the literal text to print; the double quotes are delimiters that mark where the text starts and ends and are not themselves printed. **`~%`** is a *directive*: not the two characters tilde-percent, but an instruction meaning "emit a newline". Drop it and the output still says `Hello, Lisp!` but the cursor stays on the same line. At runtime, the value in memory is the string `"Hello, Lisp!\\n"` being sent character by character to the console; `format` itself returns `nil` after printing. (`~%` is preferred over a literal `\\n` because it is portable across all Lisp implementations.)',
      },
      {
        kind: 'mcq',
        id: 'lisp-0-mcq-1',
        prompt: 'In `(format t "Hello~%")`, what does the first argument `t` mean?',
        options: [
          'The boolean true value being printed.',
          'Standard output — write the text to the console.',
          'A type annotation requesting text output.',
          'A template flag enabling tilde directives.',
        ],
        correctIndex: 1,
        explanation:
          'When the destination argument to `format` is `t`, output goes to `*standard-output*` (the console). If it were `nil`, `format` would instead return the formatted text as a string. See the [HyperSpec entry for FORMAT](https://www.lispworks.com/documentation/HyperSpec/Body/f_format.htm).',
      },
      {
        kind: 'mcq',
        id: 'lisp-0-mcq-2',
        prompt: 'Which implementation is the standard, widely used open-source Common Lisp compiler started in this course?',
        options: ['SBCL', 'GHC', 'CPython', 'Node.js'],
        correctIndex: 0,
        explanation:
          'SBCL (Steel Bank Common Lisp) is a high-performance, native-compiling implementation of ANSI Common Lisp and the most common choice for new projects. GHC is for Haskell, CPython for Python, and Node.js runs JavaScript.',
      },
    ],
  },

  // ─── Level 1 ─────────────────────────────────────────────────────────────
  {
    id: 'lisp-1',
    language: 'lisp',
    level: 1,
    title: 'S-Expressions — Prefix Notation, Atoms, Lists & the Reader',
    timeEstimate: '4-6 hours',
    intro: `Before going further we need four bedrock ideas. Take them slowly — once they click, all of Lisp follows.

**1. An expression is a piece of code that has a value.** \`5\` is an expression whose value is 5. \`(+ 2 3)\` is an expression whose value is 5 too. Almost everything you write in Lisp is an expression with a value.

**2. S-expressions: atoms vs lists.** Lisp has almost no syntax — *everything you write is an "s-expression"* (symbolic expression), and an s-expression is one of just two things. An **atom** is a single, indivisible thing: a number like \`42\`, a piece of text (string) like \`"hi"\`, or a *symbol* (a bare name) like \`hello\` or \`+\`. A **list** is zero or more s-expressions written inside parentheses, separated by spaces: \`(1 2 3)\`, \`(+ 2 3)\`, \`(a (b c) d)\`. Lists can contain other lists, nested as deep as you like. So \`(* 3 4)\` is a list of three atoms: the symbol \`*\`, the number \`3\`, and the number \`4\`.

**3. Evaluating means "working out the value".** When you hand Lisp an expression, it **evaluates** it — figures out what it's worth. The rule for a list is the heart of the language: treat the **first element as a function (an action) and the rest as its inputs**, written in **prefix notation** (operator first). So evaluating \`(+ 1 2 3)\` means "apply the \`+\` function to 1, 2 and 3", giving 6. To evaluate \`(+ 1 2 (* 3 4))\`, Lisp first evaluates the inner list \`(* 3 4)\` to get 12, then computes \`(+ 1 2 12)\` = 15. An atom evaluates to itself (numbers and strings) — except a bare symbol, which evaluates to whatever value it currently names.

**4. Functions and variables.** A **function** is a named action that takes inputs and produces a value — \`+\`, \`*\`, \`format\`, and \`list\` are all functions. A **variable** is a name that stands for a value, so \`x\` might name 10. When you write a bare symbol like \`x\`, Lisp looks up the value it names; when you write \`(f a b)\`, Lisp uses \`f\` as the function to call. (You'll meet how to *create* your own functions and variables in the next level.)

By the end of this phase you'll be able to look at any Lisp form, say whether it's an atom or a list, and predict its value. One last tool you'll need: the **quote** \`'\`. Normally Lisp evaluates a list as a function call, but putting a \`'\` in front says "don't evaluate this — give me the literal list as data". So \`(list 1 2 3)\` and \`'(1 2 3)\` both produce the list \`(1 2 3)\`, but the first *runs* the \`list\` function while the second hands you the list verbatim. To build the muscle, open a REPL and type \`(+ 1 2 (* 3 4))\`, \`'(a b c)\`, and \`(list 1 2 3)\`, and watch which give atoms and which give lists.`,
    topics: [
      {
        label: 'Practical Common Lisp — Syntax and Semantics',
        url: 'https://gigamonkeys.com/book/syntax-and-semantics.html',
        note: 'How the reader and evaluator turn text into objects and then run them.',
      },
      {
        label: 'HyperSpec — Symbols',
        url: 'https://www.lispworks.com/documentation/HyperSpec/Body/26_glo_s.htm',
        note: 'Glossary entry for symbols, atoms, and related reader concepts.',
      },
      {
        label: 'Common Lisp Cookbook — Numbers',
        url: 'https://lispcookbook.github.io/cl-cookbook/numbers.html',
        note: 'Integers, ratios, and floats — the numeric atoms of Lisp.',
      },
      {
        label: 'HyperSpec — Reader Syntax',
        url: 'https://www.lispworks.com/documentation/HyperSpec/Body/02_a.htm',
        note: 'The full specification of how characters are read into objects.',
      },
    ],
    deliverable: 'In the REPL, evaluate ten s-expressions mixing prefix arithmetic, quoted lists, and `list`; note which return atoms vs lists.',
    checks: [
      {
        kind: 'code',
        id: 'lisp-1-code-1',
        prompt: 'Use prefix arithmetic. Print the result of `7 * 6` using `print`.',
        boilerplate: '(print (* 7 6))\n',
        expectedOutput: '42',
        explanation:
          'In prefix notation the operator comes first: `(* 7 6)` multiplies. `print` evaluates the inner form and writes the resulting object (42) to standard output. Arithmetic operators like `*` and `+` are ordinary functions that accept any number of arguments.',
      },
      {
        kind: 'mcq',
        id: 'lisp-1-mcq-1',
        prompt: `What does this evaluate to?

\`\`\`lisp
(+ 1 2 (* 3 4))
\`\`\``,
        options: ['15', '21', '24', 'an error — too many arguments'],
        correctIndex: 0,
        explanation:
          'Lisp evaluates the inner form first: `(* 3 4)` is 12, then `(+ 1 2 12)` is 15. Arithmetic functions are variadic, so `(+ 1 2 12)` is perfectly legal. Prefix notation makes operator precedence explicit through nesting.',
      },
      {
        kind: 'mcq',
        id: 'lisp-1-mcq-2',
        prompt: `What is the difference between \`(list 1 2 3)\` and \`'(1 2 3)\`?`,
        options: [
          'They are identical in every way and always interchangeable.',
          "Both build the list `(1 2 3)`; `list` evaluates its arguments first, whereas `'` returns the literal unevaluated list.",
          "`'(1 2 3)` is a syntax error; only `list` can build lists.",
          "`list` returns a vector, while `'` returns a list.",
        ],
        correctIndex: 1,
        explanation:
          "Both produce a list `(1 2 3)`. `(list 1 2 3)` is a function call that evaluates each argument, so `(list 1 (+ 1 1) 3)` gives `(1 2 3)`. The quote `'` suppresses evaluation entirely, so `'(1 (+ 1 1) 3)` is the literal list `(1 (+ 1 1) 3)`. See [Practical Common Lisp — Syntax and Semantics](https://gigamonkeys.com/book/syntax-and-semantics.html).",
      },
      {
        kind: 'mcq',
        id: 'lisp-1-mcq-3',
        prompt: 'Which of these is an **atom** (not a list)?',
        options: ['`(a b c)`', '`(1 2 3)`', '`hello`', '`(+ 1 2)`'],
        correctIndex: 2,
        explanation:
          'An atom is anything that is not a non-empty cons (list) — numbers, strings, characters, and symbols are all atoms. `hello` is a symbol, hence an atom. The other three are lists. Notably, the empty list `nil` is *both* an atom and a list.',
      },
      {
        kind: 'mcq',
        id: 'lisp-1-mcq-4',
        prompt: `What does the reader produce when it reads the text \`(quote x)\` versus \`'x\`?`,
        options: [
          "Different objects — `'x` is a special character, not a form.",
          "The same object — `'x` is reader shorthand that expands to `(quote x)`.",
          '`(quote x)` errors because `quote` needs two arguments.',
          "`'x` evaluates `x` while `(quote x)` does not.",
        ],
        correctIndex: 1,
        explanation:
          "The reader macro `'` expands `'x` into the list `(quote x)` before evaluation even begins. They are literally the same object once read. `quote` is a special operator that returns its single argument unevaluated. See [HyperSpec — quote](https://www.lispworks.com/documentation/HyperSpec/Body/s_quote.htm).",
      },
    ],
  },

  // ─── Level 2 ─────────────────────────────────────────────────────────────
  {
    id: 'lisp-2',
    language: 'lisp',
    level: 2,
    title: 'Definitions & Bindings — defun, defvar, let & Arithmetic',
    timeEstimate: '4-6 hours',
    intro: `Now you'll name things. \`defun\` defines a function, \`defvar\`/\`defparameter\` define global (dynamic) variables, and \`let\`/\`let*\` introduce local bindings. Common Lisp has a rich numeric tower — integers of unbounded size, exact ratios like \`1/3\`, and floats — and the arithmetic functions are variadic. By the end you'll be able to read a \`defun\` with \`let\` bindings and predict exactly what it returns.

Locally, write a \`square\` and an \`average\` function in a \`.lisp\` file, then \`(load "math.lisp")\` into the REPL and call them. Watch how \`(/ 1 3)\` returns the exact ratio \`1/3\`, not \`0.333\`.`,
    topics: [
      {
        label: 'Practical Common Lisp — Functions',
        url: 'https://gigamonkeys.com/book/functions.html',
        note: 'defun, parameter lists, optional/keyword/rest parameters.',
      },
      {
        label: 'Practical Common Lisp — Variables',
        url: 'https://gigamonkeys.com/book/variables.html',
        note: 'let, let*, dynamic vs lexical variables, defvar/defparameter.',
      },
      {
        label: 'HyperSpec — let / let*',
        url: 'https://www.lispworks.com/documentation/HyperSpec/Body/s_let_l.htm',
        note: 'Precise semantics of parallel (let) vs sequential (let*) binding.',
      },
      {
        label: 'Common Lisp Cookbook — Numbers',
        url: 'https://lispcookbook.github.io/cl-cookbook/numbers.html',
        note: 'The numeric tower: integers, ratios, floats, and coercion.',
      },
    ],
    deliverable: 'Write `square`, `cube`, and `average` with `defun`; use `let` for an intermediate value; load and test in the REPL.',
    checks: [
      {
        kind: 'code',
        id: 'lisp-2-code-1',
        prompt: 'Print the sum `10 + 20 + 30` using `print` and prefix arithmetic.',
        boilerplate: '(print (+ 10 20 30))\n',
        expectedOutput: '60',
        explanation:
          'The `+` function is variadic — it accepts any number of arguments and returns their sum. `print` then writes the resulting value. Later you will wrap such expressions inside a `defun` so you can name and reuse them.',
      },
      {
        kind: 'mcq',
        id: 'lisp-2-mcq-1',
        prompt: `What does this print?

\`\`\`lisp
(defun square (x) (* x x))
(format t "~a~%" (square 5))
\`\`\``,
        options: ['10', '25', '`(* 5 5)`', 'nil'],
        correctIndex: 1,
        explanation:
          '`defun` defines a function with parameter list `(x)` and body `(* x x)`. The body is the return value, so `(square 5)` is `(* 5 5)` = 25. `~a` in `format` prints the value in human-readable ("aesthetic") form. See [Practical Common Lisp — Functions](https://gigamonkeys.com/book/functions.html).',
      },
      {
        kind: 'mcq',
        id: 'lisp-2-mcq-2',
        prompt: `What does this return?

\`\`\`lisp
(let ((x 3)
      (y 4))
  (+ (* x x) (* y y)))
\`\`\``,
        options: ['7', '14', '25', 'an error — x is unbound'],
        correctIndex: 2,
        explanation:
          '`let` binds `x` to 3 and `y` to 4 within its body, then evaluates `(+ 9 16)` = 25. The body of a `let` may contain several forms; the value of the last one is returned. See [HyperSpec — let](https://www.lispworks.com/documentation/HyperSpec/Body/s_let_l.htm).',
      },
      {
        kind: 'mcq',
        id: 'lisp-2-mcq-3',
        prompt: `What is the difference between \`let\` and \`let*\` here?

\`\`\`lisp
(let* ((x 2)
       (y (* x 10)))
  y)
\`\`\``,
        options: [
          'Nothing — `let` and `let*` are aliases.',
          '`let*` binds sequentially, so `y` can see `x` (= 2) and becomes 20; with plain `let`, `y` could not refer to the new `x`.',
          '`let*` returns a list of both bindings.',
          '`let*` makes the variables global instead of local.',
        ],
        correctIndex: 1,
        explanation:
          "In `let`, all initial-value forms are evaluated in the *outer* environment in parallel, so a later binding cannot use an earlier one. `let*` binds sequentially, so `y`'s init form sees the just-bound `x`. Here `y` = `(* 2 10)` = 20. See [HyperSpec — let*](https://www.lispworks.com/documentation/HyperSpec/Body/s_let_l.htm).",
      },
      {
        kind: 'mcq',
        id: 'lisp-2-mcq-4',
        prompt: `What does \`(/ 10 4)\` return in Common Lisp?`,
        options: ['`2`', '`2.5`', '`5/2`', '`2.0`'],
        correctIndex: 2,
        explanation:
          'Common Lisp has *exact* rational arithmetic. Dividing two integers that do not divide evenly yields a ratio in lowest terms: `10/4` reduces to `5/2`. To get a float you would write `(/ 10.0 4)` → `2.5`. See [Common Lisp Cookbook — Numbers](https://lispcookbook.github.io/cl-cookbook/numbers.html).',
      },
      {
        kind: 'mcq',
        id: 'lisp-2-mcq-5',
        prompt: `What is the practical difference between \`defvar\` and \`defparameter\` for a global?`,
        options: [
          'They are identical.',
          '`defvar` only assigns the value if the variable is currently unbound; `defparameter` always (re)assigns.',
          '`defparameter` creates a constant that cannot change.',
          '`defvar` creates a lexical variable; `defparameter` a global.',
        ],
        correctIndex: 1,
        explanation:
          '`defvar` is "define if not already bound" — reloading a file will not clobber its value, which is handy for state you want to preserve. `defparameter` always sets the value, so it is right for configuration you intend to reset on reload. Both create *special* (dynamically scoped) variables, conventionally named with `*earmuffs*`. See [Practical Common Lisp — Variables](https://gigamonkeys.com/book/variables.html).',
      },
    ],
  },

  // ─── Level 3 ─────────────────────────────────────────────────────────────
  {
    id: 'lisp-3',
    language: 'lisp',
    level: 3,
    title: 'Lists & Cons Cells — car, cdr, cons & List Processing',
    timeEstimate: '4-6 hours',
    intro: `Lists are the beating heart of Lisp, and they are built from **cons cells** — pairs with two slots, traditionally called the *car* and the *cdr*. A list \`(1 2 3)\` is really \`(cons 1 (cons 2 (cons 3 nil)))\`. \`car\` returns the first element, \`cdr\` returns the rest, and \`cons\` prepends. By the end you'll trace any chain of \`car\`/\`cdr\`/\`cons\` calls and know why the empty list \`nil\` terminates every proper list.

Locally, build \`(cons 1 (cons 2 (cons 3 nil)))\` and confirm it prints as \`(1 2 3)\`; then take it apart with \`(first ...)\`, \`(rest ...)\`, and \`(nth 1 ...)\`.`,
    topics: [
      {
        label: 'Practical Common Lisp — They Called It LISP for a Reason',
        url: 'https://gigamonkeys.com/book/they-called-it-lisp-for-a-reason-list-processing.html',
        note: 'Cons cells, proper lists, and the car/cdr abstraction.',
      },
      {
        label: 'Common Lisp Cookbook — Data Structures',
        url: 'https://lispcookbook.github.io/cl-cookbook/data-structures.html',
        note: 'Working with lists, cons, and the sequence functions.',
      },
      {
        label: 'HyperSpec — cons',
        url: 'https://www.lispworks.com/documentation/HyperSpec/Body/f_cons.htm',
        note: 'The fundamental pair constructor.',
      },
      {
        label: 'HyperSpec — car / cdr',
        url: 'https://www.lispworks.com/documentation/HyperSpec/Body/f_car_c.htm',
        note: 'Accessors for the two halves of a cons cell.',
      },
    ],
    deliverable: 'Write functions `my-second` and `my-last` using only car/cdr; verify against built-in `second` and `car (last ...)`.',
    checks: [
      {
        kind: 'code',
        id: 'lisp-3-code-1',
        prompt: 'Print the three elements `1 2 3` on one line using `format` with three `~a` directives.',
        boilerplate: '(format t "~a ~a ~a~%" 1 2 3)\n',
        expectedOutput: '1 2 3',
        explanation:
          'These three values are exactly what a list `(1 2 3)` holds — internally three chained cons cells terminated by `nil`. Here we print the elements directly; the questions below show how `cons`, `car`, and `cdr` build and take apart that same list.',
      },
      {
        kind: 'mcq',
        id: 'lisp-3-mcq-1',
        prompt: `What does \`(car '(a b c))\` return, and what does \`(cdr '(a b c))\` return?`,
        options: [
          '`car` → `(a)`, `cdr` → `(b c)`',
          '`car` → `a`, `cdr` → `(b c)`',
          '`car` → `a`, `cdr` → `c`',
          '`car` → `(b c)`, `cdr` → `a`',
        ],
        correctIndex: 1,
        explanation:
          '`car` returns the first element (the symbol `a`), and `cdr` returns the rest of the list — everything after the first cons cell, which is `(b c)`. The synonyms `first` and `rest` read more naturally for list code. See [HyperSpec — car/cdr](https://www.lispworks.com/documentation/HyperSpec/Body/f_car_c.htm).',
      },
      {
        kind: 'mcq',
        id: 'lisp-3-mcq-2',
        prompt: `What does this evaluate to?

\`\`\`lisp
(cons 1 (cons 2 (cons 3 nil)))
\`\`\``,
        options: ['`(1 2 3)`', '`(1 (2 (3)))`', '`(1 . (2 . (3 . nil)))`', '`6`'],
        correctIndex: 0,
        explanation:
          'A chain of `cons` cells ending in `nil` *is* a proper list. `(cons 1 (cons 2 (cons 3 nil)))` builds and prints as `(1 2 3)`. The dotted notation `(1 . (2 . (3 . nil)))` denotes the very same object, but Lisp prefers the list notation. See [Practical Common Lisp — List Processing](https://gigamonkeys.com/book/they-called-it-lisp-for-a-reason-list-processing.html).',
      },
      {
        kind: 'mcq',
        id: 'lisp-3-mcq-3',
        prompt: `What does \`(cons 1 2)\` print as?`,
        options: ['`(1 2)`', '`(1 . 2)`', '`3`', 'an error — cdr must be a list'],
        correctIndex: 1,
        explanation:
          'When the cdr of a cons cell is not another list (or nil), you have a *dotted pair*, printed as `(1 . 2)`. This is a perfectly valid cons cell — it just is not a proper list. Proper lists require the final cdr to be `nil`.',
      },
      {
        kind: 'mcq',
        id: 'lisp-3-mcq-4',
        prompt: `What does this return?

\`\`\`lisp
(car (cdr '(10 20 30)))
\`\`\``,
        options: ['10', '20', '30', '`(20 30)`'],
        correctIndex: 1,
        explanation:
          '`(cdr \'(10 20 30))` is `(20 30)`; taking the `car` of that gives `20`. This nested-accessor idiom is so common that Lisp provides `cadr` (and `caddr`, etc.) as shorthands — `(cadr lst)` equals `(car (cdr lst))`. The function `second` is the readable name.',
      },
      {
        kind: 'mcq',
        id: 'lisp-3-mcq-5',
        prompt: 'What is `(car nil)` and `(cdr nil)` in Common Lisp?',
        options: [
          'Both signal an error — nil is empty.',
          'Both return `nil` — taking car/cdr of the empty list is defined to be nil.',
          'Both return `0`.',
          '`car` errors but `cdr` returns nil.',
        ],
        correctIndex: 1,
        explanation:
          'Unusually, Common Lisp defines `(car nil)` and `(cdr nil)` to both return `nil` rather than erroring. This makes many recursive list algorithms cleaner because you can walk off the end of a list without a special case. See [HyperSpec — car/cdr](https://www.lispworks.com/documentation/HyperSpec/Body/f_car_c.htm).',
      },
    ],
  },

  // ─── Level 4 ─────────────────────────────────────────────────────────────
  {
    id: 'lisp-4',
    language: 'lisp',
    level: 4,
    title: 'Conditionals & Truthiness — if, cond, when, unless & Predicates',
    timeEstimate: '4-6 hours',
    intro: `Common Lisp's notion of truth is delightfully simple: **everything except \`nil\` is true**, and the canonical true value is \`t\`. The empty list \`()\` *is* \`nil\`, so "false" and "empty list" are the same object. You'll meet \`if\` (one then-form, one else-form), \`cond\` (multi-branch), and the one-armed \`when\`/\`unless\`. Predicates by convention end in \`p\` or \`-p\` (\`evenp\`, \`null\`, \`zerop\`). By the end you'll predict which branch any conditional takes.

Locally, write \`(classify n)\` that returns \`:negative\`, \`:zero\`, or \`:positive\` with a \`cond\`, and test the boundary at 0.`,
    topics: [
      {
        label: 'Practical Common Lisp — Numbers, Characters, and Strings',
        url: 'https://gigamonkeys.com/book/numbers-characters-and-strings.html',
        note: 'Comparison and equality predicates for the common data types.',
      },
      {
        label: 'HyperSpec — if',
        url: 'https://www.lispworks.com/documentation/HyperSpec/Body/s_if.htm',
        note: 'The two-branch conditional special operator.',
      },
      {
        label: 'HyperSpec — cond',
        url: 'https://www.lispworks.com/documentation/HyperSpec/Body/m_cond.htm',
        note: 'Multi-clause conditional; the workhorse of branching.',
      },
      {
        label: 'Common Lisp Cookbook — Conses',
        url: 'https://lispcookbook.github.io/cl-cookbook/conses.html',
        note: 'nil, t, and how truthiness drives control flow.',
      },
    ],
    deliverable: 'Write `classify` (cond with three clauses) and `safe-div` (use `if` to guard against division by zero); test both in the REPL.',
    checks: [
      {
        kind: 'code',
        id: 'lisp-4-code-1',
        prompt: 'Print the result of `(- 8 8)` (which is 0) using `print`.',
        boilerplate: '(print (- 8 8))\n',
        expectedOutput: '0',
        explanation:
          'This computes `8 - 8` = 0. In a real predicate you would wrap such an expression in `(zerop ...)` or `(evenp 8)`; those higher-level forms are taught via the questions below since they evaluate to `t`/`nil` rather than a printable number here.',
      },
      {
        kind: 'mcq',
        id: 'lisp-4-mcq-1',
        prompt: `What does this return?

\`\`\`lisp
(if (> 3 5)
    'bigger
    'smaller)
\`\`\``,
        options: ['`bigger`', '`smaller`', '`t`', '`nil`'],
        correctIndex: 1,
        explanation:
          '`(> 3 5)` is false (`nil`), so `if` evaluates the else-form, returning the symbol `smaller`. `if` takes exactly one then-form and an optional else-form; for multiple statements per branch you use `progn` or reach for `cond`/`when`. See [HyperSpec — if](https://www.lispworks.com/documentation/HyperSpec/Body/s_if.htm).',
      },
      {
        kind: 'mcq',
        id: 'lisp-4-mcq-2',
        prompt: `In Common Lisp, which of the following is **false** (logically nil)?`,
        options: ['`0`', '`""` (the empty string)', "`'()` (the empty list)", '`"nil"` (the string)'],
        correctIndex: 2,
        explanation:
          'Only `nil` is false, and the empty list `()` *is* `nil`. Crucially, `0`, the empty string `""`, and the string `"nil"` are all non-nil, hence true. This trips up programmers from C or Python where `0`/`""` are falsy. See [Common Lisp Cookbook — Conses](https://lispcookbook.github.io/cl-cookbook/conses.html).',
      },
      {
        kind: 'mcq',
        id: 'lisp-4-mcq-3',
        prompt: `What does this return?

\`\`\`lisp
(cond ((= 2 3) 'a)
      ((< 2 3) 'b)
      (t 'c))
\`\`\``,
        options: ['`a`', '`b`', '`c`', '`nil`'],
        correctIndex: 1,
        explanation:
          '`cond` tries each clause\'s test in order. The first, `(= 2 3)`, is nil; the second, `(< 2 3)`, is true, so its body runs and `cond` returns `b`. The trailing `(t ...)` clause is the conventional catch-all "else". See [HyperSpec — cond](https://www.lispworks.com/documentation/HyperSpec/Body/m_cond.htm).',
      },
      {
        kind: 'mcq',
        id: 'lisp-4-mcq-4',
        prompt: `What does \`(when (> 5 3) (format t "yes~%") 99)\` return (ignoring any printed text)?`,
        options: ['`t`', '`nil`', '`99`', '`yes`'],
        correctIndex: 2,
        explanation:
          '`when` evaluates its body only if the test is true, and returns the value of the *last* body form. Here the test holds, so it prints `yes` and returns `99`. If the test were false, `when` would return `nil` without evaluating the body. `unless` is the mirror image (body runs when the test is false).',
      },
      {
        kind: 'mcq',
        id: 'lisp-4-mcq-5',
        prompt: 'Which predicate correctly tests whether `x` is the empty list / nil?',
        options: ['`(empty? x)`', '`(null x)`', '`(nil? x)`', '`(== x nil)`'],
        correctIndex: 1,
        explanation:
          '`(null x)` returns `t` exactly when `x` is `nil` (which is also the empty list). There is no `empty?` or `nil?` in Common Lisp, and equality uses `eq`/`eql`/`equal`, not `==`. By convention `null` is preferred for the "is it the empty list?" question. See [Practical Common Lisp](https://gigamonkeys.com/book/numbers-characters-and-strings.html).',
      },
    ],
  },

  // ─── Level 5 ─────────────────────────────────────────────────────────────
  {
    id: 'lisp-5',
    language: 'lisp',
    level: 5,
    title: 'Recursion & Higher-Order Functions — mapcar, reduce & lambda',
    timeEstimate: '5-7 hours',
    intro: `Lisp pioneered higher-order programming. \`lambda\` makes anonymous functions, \`mapcar\` applies a function across lists, \`reduce\` folds a list down to a single value, and \`remove-if\`/\`find-if\` filter and search. Because lists are recursive structures, *recursion* is the natural way to process them. By the end you'll trace a recursive \`defun\` and predict the output of a \`mapcar\`/\`reduce\` pipeline.

Locally, write a recursive \`my-length\` and a \`sum-list\` using \`reduce\`, then compare \`(mapcar (lambda (x) (* x x)) '(1 2 3 4))\` against a hand-written recursion. Note that \`#'\` (function quote) is how you pass a named function as a value.`,
    topics: [
      {
        label: 'Practical Common Lisp — Functions',
        url: 'https://gigamonkeys.com/book/functions.html',
        note: 'lambda, function objects, funcall and apply — first-class functions.',
      },
      {
        label: 'HyperSpec — mapcar',
        url: 'https://www.lispworks.com/documentation/HyperSpec/Body/f_mapc_.htm',
        note: 'Mapping a function over one or more lists.',
      },
      {
        label: 'HyperSpec — reduce',
        url: 'https://www.lispworks.com/documentation/HyperSpec/Body/f_reduce.htm',
        note: 'Folding a sequence with a binary function and optional initial value.',
      },
      {
        label: 'Common Lisp Cookbook — Functions',
        url: 'https://lispcookbook.github.io/cl-cookbook/functions.html',
        note: 'Closures, higher-order helpers, and the mapping family.',
      },
    ],
    video: {
      title: 'Structure and Interpretation of Computer Programs — Lecture 1A',
      youtubeId: '-J_xL4IGhJA',
      channelName: 'MIT OpenCourseWare',
      duration: '1 hour',
    },
    deliverable: 'Implement `factorial` recursively, then re-implement it with `reduce`; map a `lambda` over a list and confirm both factorials agree.',
    checks: [
      {
        kind: 'code',
        id: 'lisp-5-code-1',
        prompt: 'Compute `5! = 120` by printing the product `(* 1 2 3 4 5)`. Use `print`.',
        boilerplate: '(print (* 1 2 3 4 5))\n',
        expectedOutput: '120',
        explanation:
          'This shows the result a recursive `factorial` or a `reduce` with `*` would produce: 120. The variadic `*` lets us spell the whole product in one call here; the questions below cover the recursive and `reduce`-based definitions.',
      },
      {
        kind: 'mcq',
        id: 'lisp-5-mcq-1',
        prompt: `What does this return?

\`\`\`lisp
(mapcar (lambda (x) (* x x)) '(1 2 3 4))
\`\`\``,
        options: ['`(1 2 3 4)`', '`(1 4 9 16)`', '`30`', '`(2 4 6 8)`'],
        correctIndex: 1,
        explanation:
          '`mapcar` applies the function to each element and collects the results into a new list. The lambda squares its argument, so `(1 2 3 4)` becomes `(1 4 9 16)`. `mapcar` can take several lists and steps through them in parallel. See [HyperSpec — mapcar](https://www.lispworks.com/documentation/HyperSpec/Body/f_mapc_.htm).',
      },
      {
        kind: 'mcq',
        id: 'lisp-5-mcq-2',
        prompt: `What does this return?

\`\`\`lisp
(reduce #'+ '(1 2 3 4 5))
\`\`\``,
        options: ['`15`', '`120`', '`(1 2 3 4 5)`', '`5`'],
        correctIndex: 0,
        explanation:
          '`reduce` folds the list left-to-right with `+`: `((((1+2)+3)+4)+5)` = 15. The `#\'+` is the function object for `+`. With `:initial-value` you can seed the accumulator, e.g. `(reduce #\'* lst :initial-value 1)`. See [HyperSpec — reduce](https://www.lispworks.com/documentation/HyperSpec/Body/f_reduce.htm).',
      },
      {
        kind: 'mcq',
        id: 'lisp-5-mcq-3',
        prompt: `What does this recursive function return for \`(fact 4)\`?

\`\`\`lisp
(defun fact (n)
  (if (<= n 1)
      1
      (* n (fact (- n 1)))))
\`\`\``,
        options: ['`10`', '`24`', '`16`', 'a stack overflow — no base case'],
        correctIndex: 1,
        explanation:
          'The base case `(<= n 1)` returns 1, so the recursion bottoms out. `(fact 4)` = `4 * 3 * 2 * 1` = 24. The `if` provides the terminating condition that prevents infinite recursion. This is the classic recursive factorial.',
      },
      {
        kind: 'mcq',
        id: 'lisp-5-mcq-4',
        prompt: `What is the purpose of \`#'\` in \`(reduce #'+ lst)\`?`,
        options: [
          'It comments out the `+`.',
          'It is the function namespace operator — it retrieves the *function* named `+` so it can be passed as a value.',
          'It quotes the list `lst`.',
          'It negates the addition.',
        ],
        correctIndex: 1,
        explanation:
          "Common Lisp is a Lisp-2: symbols have separate value and function cells. `#'foo` is shorthand for `(function foo)`, which fetches the function object bound to `foo` so you can pass it to higher-order functions like `reduce`, `mapcar`, or `funcall`. See [Common Lisp Cookbook — Functions](https://lispcookbook.github.io/cl-cookbook/functions.html).",
      },
      {
        kind: 'mcq',
        id: 'lisp-5-mcq-5',
        prompt: `What does this return?

\`\`\`lisp
(remove-if #'oddp '(1 2 3 4 5 6))
\`\`\``,
        options: ['`(1 3 5)`', '`(2 4 6)`', '`(1 2 3 4 5 6)`', '`nil`'],
        correctIndex: 1,
        explanation:
          '`remove-if` removes every element for which the predicate is true. `oddp` is true for odd numbers, so they are removed, leaving the evens `(2 4 6)`. Its sibling `remove-if-not` keeps the matching elements instead.',
      },
    ],
  },

  // ─── Level 6 ─────────────────────────────────────────────────────────────
  {
    id: 'lisp-6',
    language: 'lisp',
    level: 6,
    title: 'The format Directive Language',
    timeEstimate: '4-6 hours',
    intro: `\`format\` is a tiny language of its own embedded in strings, controlled by *directives* that start with \`~\`. You already know \`~a\` (aesthetic), \`~%\` (newline), and \`~d\` (decimal integer). There is far more: \`~s\` (machine-readable), \`~r\` (numbers as English words), \`~{...~}\` (iterate over a list), \`~:p\` (pluralize), and \`~t\` (column tabbing). By the end you'll read a \`format\` control string and predict its output character-for-character.

Locally, experiment in the REPL: try \`(format t "~r~%" 42)\`, \`(format t "~{~a, ~}~%" '(a b c))\`, and \`(format nil "~a" 99)\` to capture output as a string instead of printing it.`,
    topics: [
      {
        label: 'Practical Common Lisp — A Few FORMAT Recipes',
        url: 'https://gigamonkeys.com/book/a-few-format-recipes.html',
        note: 'A practical tour of the most useful format directives.',
      },
      {
        label: 'HyperSpec — Formatted Output',
        url: 'https://www.lispworks.com/documentation/HyperSpec/Body/22_c.htm',
        note: 'The complete reference for every format directive.',
      },
      {
        label: 'HyperSpec — format',
        url: 'https://www.lispworks.com/documentation/HyperSpec/Body/f_format.htm',
        note: 'The format function itself and its destination argument.',
      },
      {
        label: 'Common Lisp Cookbook — Strings',
        url: 'https://lispcookbook.github.io/cl-cookbook/strings.html',
        note: 'Building strings, including with format nil.',
      },
    ],
    deliverable: 'Write a `report` function using `~a`, `~d`, `~{~}` list iteration, and `~:p` pluralization; produce a neatly formatted multi-line report.',
    checks: [
      {
        kind: 'code',
        id: 'lisp-6-code-1',
        prompt: 'Use `format` with two `~a` directives to print `name: Ada, age: 36`.',
        boilerplate: '(format t "name: ~a, age: ~a~%" "Ada" 36)\n',
        expectedOutput: 'name: Ada, age: 36',
        explanation:
          'Each `~a` consumes the next argument and prints it in aesthetic (human) form: the string `"Ada"` prints without quotes, and `36` prints as a number. The directives are filled left-to-right, and `~%` ends the line.',
      },
      {
        kind: 'mcq',
        id: 'lisp-6-mcq-1',
        prompt: `What is the difference between \`~a\` and \`~s\` for the value \`"hi"\`?`,
        options: [
          'No difference — both print `hi`.',
          '`~a` prints `hi` (aesthetic); `~s` prints `"hi"` with quotes (a readable, re-readable representation).',
          '`~s` prints `hi`; `~a` prints `"hi"`.',
          '`~s` is for symbols only and would error on a string.',
        ],
        correctIndex: 1,
        explanation:
          '`~a` produces human-friendly output (`princ`-style), so a string loses its quotes. `~s` produces machine-readable output (`prin1`-style) that the reader could read back, so the string keeps its quotes. See [Practical Common Lisp — FORMAT Recipes](https://gigamonkeys.com/book/a-few-format-recipes.html).',
      },
      {
        kind: 'mcq',
        id: 'lisp-6-mcq-2',
        prompt: `What does this print?

\`\`\`lisp
(format t "~{~a ~}~%" '(1 2 3))
\`\`\``,
        options: ['`(1 2 3)`', '`1 2 3 ` (each followed by a space)', '`123`', 'an error — ~{ needs a count'],
        correctIndex: 1,
        explanation:
          '`~{ ... ~}` iterates over a list argument, applying the enclosed directives to each element. Here `~a ` prints each element followed by a space, producing `1 2 3 `. This is the idiomatic way to print every element of a list. See [HyperSpec — Formatted Output](https://www.lispworks.com/documentation/HyperSpec/Body/22_c.htm).',
      },
      {
        kind: 'mcq',
        id: 'lisp-6-mcq-3',
        prompt: `What does \`(format t "~r" 42)\` print?`,
        options: ['`42`', '`forty-two`', '`XLII`', '`101010`'],
        correctIndex: 1,
        explanation:
          '`~r` (with no radix prefix) spells a number in English words: `42` becomes `forty-two`. With a prefix like `~8r` it prints in that radix; `~:r` produces ordinals (`forty-second`) and `~@r` Roman numerals (`XLII`). It is one of format\'s most surprising directives.',
      },
      {
        kind: 'mcq',
        id: 'lisp-6-mcq-4',
        prompt: `What does the destination \`nil\` do, as in \`(format nil "x=~a" 5)\`?`,
        options: [
          'Prints `x=5` to the console.',
          'Returns the string `"x=5"` instead of printing.',
          'Discards the output entirely.',
          'Signals an error — nil is not a valid stream.',
        ],
        correctIndex: 1,
        explanation:
          'When the destination is `nil`, `format` does not write anywhere; it *returns* the formatted text as a fresh string. This makes `format` Common Lisp\'s primary string-building tool. With `t` it writes to standard output and returns `nil`. See [HyperSpec — format](https://www.lispworks.com/documentation/HyperSpec/Body/f_format.htm).',
      },
      {
        kind: 'mcq',
        id: 'lisp-6-mcq-5',
        prompt: `What does this print?

\`\`\`lisp
(format t "~d file~:p~%" 1)
\`\`\``,
        options: ['`1 files`', '`1 file`', '`1 file(s)`', 'an error'],
        correctIndex: 1,
        explanation:
          '`~:p` emits an `s` for pluralization *unless* the most recent numeric argument was 1. Since the argument is `1`, no `s` is added, giving `1 file`. With an argument of 2 it would print `2 files`. This avoids ugly "1 file(s)" output. See [Practical Common Lisp — FORMAT Recipes](https://gigamonkeys.com/book/a-few-format-recipes.html).',
      },
    ],
  },

  // ─── Level 7 ─────────────────────────────────────────────────────────────
  {
    id: 'lisp-7',
    language: 'lisp',
    level: 7,
    title: 'Macros & Code-as-Data — defmacro, quote & quasiquote',
    timeEstimate: '6-8 hours',
    intro: `This is Lisp's superpower. Because code is just lists (s-expressions), you can write programs that *write programs*. A **macro** receives its arguments *unevaluated* (as code/data) and returns a new form to be evaluated in its place — all at compile time. The toolkit is \`defmacro\`, the backquote (quasiquote), comma \`,\` (unquote), and \`,@\` (splice). By the end you'll predict what a macro *expands into* and why that differs from a function call.

Locally, write \`(my-unless test body)\` as a macro that expands to \`(if (not test) body)\`, and inspect the expansion with \`(macroexpand-1 '(my-unless ...))\`. Compare with a function version to see why ordering of evaluation differs.`,
    topics: [
      {
        label: 'Practical Common Lisp — Macros: Defining Your Own',
        url: 'https://gigamonkeys.com/book/macros-defining-your-own.html',
        note: 'defmacro, backquote, and the macro-writing workflow.',
      },
      {
        label: 'Practical Common Lisp — Macros: Standard Control Constructs',
        url: 'https://gigamonkeys.com/book/macros-standard-control-constructs.html',
        note: 'How when, unless, dolist, and dotimes are themselves macros.',
      },
      {
        label: 'HyperSpec — defmacro',
        url: 'https://www.lispworks.com/documentation/HyperSpec/Body/m_defmac.htm',
        note: 'The macro definition special form.',
      },
      {
        label: 'HyperSpec — Backquote',
        url: 'https://www.lispworks.com/documentation/HyperSpec/Body/02_df.htm',
        note: 'The reader syntax for quasiquote, unquote, and splicing.',
      },
    ],
    deliverable: 'Write `swap` and `my-when` macros with backquote; verify their expansions with `macroexpand-1`; show one bug that `gensym` fixes.',
    checks: [
      {
        kind: 'code',
        id: 'lisp-7-code-1',
        prompt: 'Use `format` to print the line `macros transform code into code` (the slogan of metaprogramming).',
        boilerplate: '(format t "macros transform code into code~%")\n',
        expectedOutput: 'macros transform code into code',
        explanation:
          'A macro is a function from code to code: it takes forms as *data* and returns a new form to be evaluated. We print the slogan here; the questions below show real `defmacro`, backquote, and `macroexpand-1` examples that build and transform those forms programmatically.',
      },
      {
        kind: 'mcq',
        id: 'lisp-7-mcq-1',
        prompt: 'How does a macro differ fundamentally from a function?',
        options: [
          'A macro runs faster but is otherwise identical.',
          'A macro receives its arguments *unevaluated* as code and returns a new form to be evaluated in its place; a function receives already-evaluated values.',
          'A macro can only be called once per program.',
          'A function can return code, but a macro cannot.',
        ],
        correctIndex: 1,
        explanation:
          'Functions get evaluated arguments and return values. Macros get the raw, unevaluated source forms and run at *macro-expansion time*, returning a replacement form. That is why a macro like `unless` can choose *not* to evaluate part of its argument. See [Practical Common Lisp — Macros](https://gigamonkeys.com/book/macros-defining-your-own.html).',
      },
      {
        kind: 'mcq',
        id: 'lisp-7-mcq-2',
        prompt: `Using a backquote template, what does this evaluate to?

\`\`\`lisp
(let ((x 10))
  \`(value is ,x))
\`\`\``,
        options: ['`(value is x)`', '`(value is 10)`', '`(value is ,x)`', '`10`'],
        correctIndex: 1,
        explanation:
          'Backquote builds a list template; a comma (`,`) marks a spot to *evaluate and insert*. So `,x` becomes the value `10`, yielding `(value is 10)`. Without the comma, `x` would be inserted literally as a symbol. See [HyperSpec — Backquote](https://www.lispworks.com/documentation/HyperSpec/Body/02_df.htm).',
      },
      {
        kind: 'mcq',
        id: 'lisp-7-mcq-3',
        prompt: `What does \`(macroexpand-1 '(my-unless cold (wear-coat)))\` produce, given:

\`\`\`lisp
(defmacro my-unless (test &body body)
  \`(if (not ,test) (progn ,@body)))
\`\`\``,
        options: [
          '`(if (not cold) (progn (wear-coat)))`',
          '`(if cold (wear-coat))`',
          '`(not cold)`',
          '`nil`',
        ],
        correctIndex: 0,
        explanation:
          'The macro substitutes `,test` → `cold` and splices `,@body` → `(wear-coat)` into the `progn`, expanding to `(if (not cold) (progn (wear-coat)))`. `macroexpand-1` shows exactly this transformation without evaluating it — the essential debugging tool for macros. See [Practical Common Lisp — Standard Control Constructs](https://gigamonkeys.com/book/macros-standard-control-constructs.html).',
      },
      {
        kind: 'mcq',
        id: 'lisp-7-mcq-4',
        prompt: 'What does `,@` (comma-at / unquote-splicing) do inside a backquote?',
        options: [
          'Inserts a value as a single element.',
          'Splices the elements of a list into the surrounding list, removing one level of parentheses.',
          'Comments out the rest of the template.',
          'Quotes the following symbol.',
        ],
        correctIndex: 1,
        explanation:
          '`,@expr` evaluates `expr` (which must be a list) and *splices* its elements into the enclosing template. So if `body` is `((a) (b))`, then a backquoted `(progn ,@body)` becomes `(progn (a) (b))`, not `(progn ((a) (b)))`. This is essential for macros that take a `&body`. See [HyperSpec — Backquote](https://www.lispworks.com/documentation/HyperSpec/Body/02_df.htm).',
      },
      {
        kind: 'mcq',
        id: 'lisp-7-mcq-5',
        prompt: 'Why do macro authors use `(gensym)` for temporary variable names?',
        options: [
          'To make the macro run faster.',
          'To create unique symbol names that cannot accidentally clash with (capture) variables in the user’s code.',
          'Because macros cannot use `let`.',
          'To document the macro for other programmers.',
        ],
        correctIndex: 1,
        explanation:
          "`gensym` returns a fresh, uninterned symbol guaranteed unique. If a macro introduced a binding named, say, `temp`, and the caller also used `temp`, the macro would *capture* it and cause subtle bugs. Generating unique names avoids this *unintended variable capture* — Common Lisp's manual approach to macro hygiene. See [Practical Common Lisp — Macros](https://gigamonkeys.com/book/macros-defining-your-own.html).",
      },
    ],
  },

  // ─── Level 8 ─────────────────────────────────────────────────────────────
  {
    id: 'lisp-8',
    language: 'lisp',
    level: 8,
    title: 'Structures & CLOS — Classes, Generic Functions & Methods',
    timeEstimate: '6-8 hours',
    intro: `Common Lisp ships with two ways to model data: lightweight \`defstruct\` records and the full **Common Lisp Object System (CLOS)** — one of the most powerful object systems ever designed. CLOS separates **classes** (\`defclass\`, holding slots) from **behaviour**: a **generic function** (\`defgeneric\`) is a single named operation whose **methods** (\`defmethod\`) are selected by the *types of all their arguments* (multiple dispatch). By the end you'll predict which method a call dispatches to and what \`make-instance\` builds.

Locally, define a \`point\` with \`defstruct\`, then model \`circle\` and \`square\` classes with a \`(defgeneric area (shape))\` and two \`defmethod\`s; call \`(area (make-instance 'circle :radius 2))\`.`,
    topics: [
      {
        label: 'Practical Common Lisp — Object Reorientation: Classes',
        url: 'https://gigamonkeys.com/book/object-reorientation-classes.html',
        note: 'defclass, slots, accessors, and make-instance.',
      },
      {
        label: 'Practical Common Lisp — Object Reorientation: Generic Functions',
        url: 'https://gigamonkeys.com/book/object-reorientation-generic-functions.html',
        note: 'defgeneric, defmethod, and multiple dispatch.',
      },
      {
        label: 'Common Lisp Cookbook — CLOS',
        url: 'https://lispcookbook.github.io/cl-cookbook/clos.html',
        note: 'A modern, hands-on tour of classes, methods, and method combination.',
      },
      {
        label: 'HyperSpec — defstruct',
        url: 'https://www.lispworks.com/documentation/HyperSpec/Body/m_defstr.htm',
        note: 'The lightweight record facility and its auto-generated accessors.',
      },
    ],
    deliverable: 'Define `shape` classes (`circle`, `rectangle`) and an `area` generic function with a method per class; instantiate and compute areas in the REPL.',
    checks: [
      {
        kind: 'code',
        id: 'lisp-8-code-1',
        prompt: 'Compute the area of a 3-by-4 rectangle by printing `(* 3 4)`. Use `print`.',
        boilerplate: '(print (* 3 4))\n',
        expectedOutput: '12',
        explanation:
          'This is the body an `area` method for a rectangle would compute: width times height. In real CLOS code you would read the slots with accessors, e.g. `(* (width r) (height r))`; the dispatch machinery itself is covered in the questions below.',
      },
      {
        kind: 'mcq',
        id: 'lisp-8-mcq-1',
        prompt: `What does \`(make-instance 'circle :radius 5)\` do, given \`(defclass circle () ((radius :initarg :radius :accessor radius)))\`?`,
        options: [
          'Defines the circle class.',
          'Creates a new circle object whose `radius` slot is initialised to 5.',
          'Returns the number 5.',
          'Calls a function named circle with argument 5.',
        ],
        correctIndex: 1,
        explanation:
          '`make-instance` allocates a new object of the named class. The `:radius 5` initarg fills the slot declared with `:initarg :radius`. You would then read it with the accessor `(radius obj)`. `defclass` (done earlier) only *defines* the class. See [Practical Common Lisp — Classes](https://gigamonkeys.com/book/object-reorientation-classes.html).',
      },
      {
        kind: 'mcq',
        id: 'lisp-8-mcq-2',
        prompt: 'How does CLOS differ from typical class-based OOP (e.g. Java) in where methods "live"?',
        options: [
          'CLOS methods live inside classes, exactly like Java.',
          'CLOS methods belong to *generic functions*, not to classes, and are selected by the types of *all* arguments (multiple dispatch).',
          'CLOS has no methods, only functions.',
          'CLOS dispatches only on the return type.',
        ],
        correctIndex: 1,
        explanation:
          'In CLOS, a generic function is the named operation, and its methods are defined separately and dispatched on the classes of *all* required arguments — not just a single receiver. This *multiple dispatch* lets `(collide ship asteroid)` pick a method based on both arguments’ types. See [Practical Common Lisp — Generic Functions](https://gigamonkeys.com/book/object-reorientation-generic-functions.html).',
      },
      {
        kind: 'mcq',
        id: 'lisp-8-mcq-3',
        prompt: `Given two \`defmethod area\` definitions specialised on \`circle\` and \`square\`, which runs for \`(area sq)\` where \`sq\` is a \`square\`?`,
        options: [
          'Both methods run in definition order.',
          'The method specialised on `square`, because dispatch selects the most specific applicable method by argument type.',
          'The `circle` method, because it was defined first.',
          'Neither — you must call the method directly.',
        ],
        correctIndex: 1,
        explanation:
          'Calling the generic function `area` with a `square` argument makes CLOS find all *applicable* methods and run the most specific one — here the `square` method. The class precedence list breaks ties when several methods apply. See [Practical Common Lisp — Generic Functions](https://gigamonkeys.com/book/object-reorientation-generic-functions.html).',
      },
      {
        kind: 'mcq',
        id: 'lisp-8-mcq-4',
        prompt: `For \`(defstruct point x y)\`, which function reads the \`x\` slot of a point \`p\`?`,
        options: ['`(x p)`', '`(point-x p)`', '`(get p :x)`', '`(slot p x)`'],
        correctIndex: 1,
        explanation:
          '`defstruct point` auto-generates accessors named `<struct>-<slot>`, so the reader for slot `x` is `point-x`, used as `(point-x p)`. It also generates `make-point`, `point-p` (a type predicate), and `copy-point`. See [HyperSpec — defstruct](https://www.lispworks.com/documentation/HyperSpec/Body/m_defstr.htm).',
      },
      {
        kind: 'mcq',
        id: 'lisp-8-mcq-5',
        prompt: 'What is the role of `defgeneric` relative to `defmethod`?',
        options: [
          '`defgeneric` declares the generic function (its name and lambda list); `defmethod` adds a concrete implementation for particular argument types.',
          'They are synonyms.',
          '`defgeneric` defines a class; `defmethod` defines a slot.',
          '`defgeneric` is required before every function call.',
        ],
        correctIndex: 0,
        explanation:
          '`defgeneric` introduces the named operation and its parameter list (optionally with documentation and a default method-combination). `defmethod` then attaches implementations specialised on argument types. Defining a method with `defmethod` will implicitly create the generic function if it does not yet exist. See [Common Lisp Cookbook — CLOS](https://lispcookbook.github.io/cl-cookbook/clos.html).',
      },
    ],
  },

  // ─── Level 9 ─────────────────────────────────────────────────────────────
  {
    id: 'lisp-9',
    language: 'lisp',
    level: 9,
    title: 'Conditions & Restarts — Lisp’s Condition System',
    timeEstimate: '5-7 hours',
    intro: `Common Lisp's **condition system** is strictly more powerful than the try/catch of most languages. The key insight: *signalling* a condition and *deciding what to do about it* are separated. When an error is signalled, handlers run **without unwinding the stack**, and they can choose among **restarts** — named recovery strategies the low-level code published. This lets a high-level policy resume a deep computation. By the end you'll distinguish \`handler-case\` (catch-and-unwind) from \`handler-bind\` + \`restart-case\` (resume in place).

Locally, write \`(parse-int s)\` that signals an error on bad input, wrap callers in \`handler-case\`, then add a \`use-value\` restart and invoke it from a \`handler-bind\` to recover without aborting the whole batch.`,
    topics: [
      {
        label: 'Practical Common Lisp — Beyond Exception Handling',
        url: 'https://gigamonkeys.com/book/beyond-exception-handling-conditions-and-restarts.html',
        note: 'The canonical explanation of conditions, handlers, and restarts.',
      },
      {
        label: 'Common Lisp Cookbook — Error Handling',
        url: 'https://lispcookbook.github.io/cl-cookbook/error_handling.html',
        note: 'Practical handler-case, handler-bind, and defining conditions.',
      },
      {
        label: 'HyperSpec — handler-case',
        url: 'https://www.lispworks.com/documentation/HyperSpec/Body/m_hand_1.htm',
        note: 'The unwinding, try/catch-style handler macro.',
      },
      {
        label: 'HyperSpec — restart-case',
        url: 'https://www.lispworks.com/documentation/HyperSpec/Body/m_rst_ca.htm',
        note: 'Establishing named restarts that callers can invoke.',
      },
    ],
    deliverable: 'Build a batch parser that uses `define-condition`, signals on bad rows, and offers a `skip-row` restart so a supervising loop can continue past errors.',
    checks: [
      {
        kind: 'code',
        id: 'lisp-9-code-1',
        prompt: 'Print a status line `processed=99 errors=0` using two `~a` directives in `format`.',
        boilerplate: '(format t "processed=~a errors=~a~%" 99 0)\n',
        expectedOutput: 'processed=99 errors=0',
        explanation:
          'This is the kind of summary a batch job prints after recovering from errors via restarts. The condition-system machinery (signal/handler/restart) is non-printing control flow, so it is taught through the questions below; here we just format the resulting counters.',
      },
      {
        kind: 'mcq',
        id: 'lisp-9-mcq-1',
        prompt: 'What is the defining feature of the Lisp condition system compared with ordinary try/catch?',
        options: [
          'It is exactly the same as try/catch, just renamed.',
          'Handlers run *before the stack unwinds*, so they can choose a restart and resume the computation at a lower level instead of always aborting.',
          'It cannot recover from errors at all.',
          'It only works at compile time.',
        ],
        correctIndex: 1,
        explanation:
          'When a condition is signalled, applicable handlers run while the signalling context is still on the stack. A handler may transfer control to a *restart* established deeper in the call chain, resuming work rather than unwinding. Try/catch can only unwind. See [Practical Common Lisp — Beyond Exception Handling](https://gigamonkeys.com/book/beyond-exception-handling-conditions-and-restarts.html).',
      },
      {
        kind: 'mcq',
        id: 'lisp-9-mcq-2',
        prompt: `What does this return?

\`\`\`lisp
(handler-case (/ 10 0)
  (division-by-zero () 'caught))
\`\`\``,
        options: ['`0`', '`caught`', 'an unhandled error', '`nil`'],
        correctIndex: 1,
        explanation:
          'Dividing by zero signals a `division-by-zero` condition. `handler-case` matches that type, unwinds the stack, and evaluates its clause body, returning the symbol `caught`. This is the close analogue of try/catch. See [HyperSpec — handler-case](https://www.lispworks.com/documentation/HyperSpec/Body/m_hand_1.htm).',
      },
      {
        kind: 'mcq',
        id: 'lisp-9-mcq-3',
        prompt: 'What is the difference between `handler-case` and `handler-bind`?',
        options: [
          'They are identical.',
          '`handler-case` unwinds the stack before running its handler; `handler-bind` runs the handler *in the dynamic context of the signal*, allowing it to invoke a restart and continue.',
          '`handler-bind` is for compile-time only.',
          '`handler-case` cannot match condition types.',
        ],
        correctIndex: 1,
        explanation:
          "`handler-case` is the unwinding, try/catch-style form. `handler-bind` installs a handler that runs *without* unwinding, so it can inspect the condition and call a restart (e.g. `(invoke-restart 'use-value 0)`) to resume the deep computation. See [Common Lisp Cookbook — Error Handling](https://lispcookbook.github.io/cl-cookbook/error_handling.html).",
      },
      {
        kind: 'mcq',
        id: 'lisp-9-mcq-4',
        prompt: 'What does `restart-case` establish?',
        options: [
          'A loop that retries forever.',
          'Named recovery strategies that *higher-level* handlers can choose to invoke, letting low-level code offer options without deciding policy.',
          'A new thread of execution.',
          'A compile-time assertion.',
        ],
        correctIndex: 1,
        explanation:
          '`restart-case` wraps a body and publishes named restarts (like `retry`, `use-value`, `skip`). The low-level code thereby *offers choices*; a handler far up the stack picks the right one for the situation. This separation of mechanism (restarts) from policy (handlers) is the system’s great strength. See [HyperSpec — restart-case](https://www.lispworks.com/documentation/HyperSpec/Body/m_rst_ca.htm).',
      },
      {
        kind: 'mcq',
        id: 'lisp-9-mcq-5',
        prompt: 'What does `define-condition` create?',
        options: [
          'A new global variable.',
          'A new condition *type* (a class in the condition hierarchy) that can carry data slots and be signalled and handled by type.',
          'A restart.',
          'A macro.',
        ],
        correctIndex: 1,
        explanation:
          '`define-condition` defines a condition class, typically inheriting from `error` or `warning`, with slots for relevant data (like the offending value). You then `signal`, `error`, or `warn` with it and match it by type in handlers. It is to conditions what `defclass` is to ordinary objects. See [Common Lisp Cookbook — Error Handling](https://lispcookbook.github.io/cl-cookbook/error_handling.html).',
      },
    ],
  },

  // ─── Level 10 ────────────────────────────────────────────────────────────
  {
    id: 'lisp-10',
    language: 'lisp',
    level: 10,
    title: 'Packages, the ANSI Standard, Optimization & the Lisp Family',
    timeEstimate: '5-7 hours',
    intro: `The capstone. Real Lisp programs are organised into **packages** (namespaces of symbols) and built/distributed with **ASDF** and **Quicklisp**. Common Lisp is an *ANSI standard* (X3.226-1994) with many conforming implementations (SBCL, CCL, ECL, Allegro, LispWorks), so portable code outlives any single vendor. You'll also meet performance tools — \`declaim\`/\`declare\` with \`(optimize (speed 3))\`, \`(disassemble #'f)\`, and \`time\` — and place Common Lisp within the wider family: **Scheme** (minimalist, one namespace) and **Clojure** (Lisp on the JVM, immutable-by-default). By the end you'll explain how a symbol is resolved across packages and how the dialects differ.

Locally, \`(ql:quickload :alexandria)\`, define your own package with \`defpackage\`/\`in-package\`, and benchmark a tight loop with \`time\` before and after adding type declarations.`,
    topics: [
      {
        label: 'Practical Common Lisp — Programming in the Large: Packages',
        url: 'https://gigamonkeys.com/book/programming-in-the-large-packages-and-symbols.html',
        note: 'How packages, symbols, exports, and use-lists work.',
      },
      {
        label: 'Quicklisp',
        url: 'https://www.quicklisp.org/beta/',
        note: 'The de facto library manager for Common Lisp.',
      },
      {
        label: 'Common Lisp Cookbook — Performance Tuning',
        url: 'https://lispcookbook.github.io/cl-cookbook/performance.html',
        note: 'declaim/declare optimize qualities, disassemble, and profiling.',
      },
      {
        label: 'The Common Lisp HyperSpec',
        url: 'https://www.lispworks.com/documentation/HyperSpec/Front/index.htm',
        note: 'The hyperlinked ANSI Common Lisp standard — the ultimate reference.',
      },
      {
        label: 'Clojure — Rationale',
        url: 'https://clojure.org/about/rationale',
        note: 'A modern JVM Lisp; contrast its immutability and single namespace with CL.',
      },
    ],
    deliverable: 'Package a small library with `defpackage`/`in-package` and an ASDF `.asd` system; add `(optimize (speed 3))` declarations and measure the speedup with `time`.',
    checks: [
      {
        kind: 'code',
        id: 'lisp-10-code-1',
        prompt: 'Print a build banner line `Polyglot Lisp v1` using `format`.',
        boilerplate: '(format t "Polyglot Lisp v~a~%" 1)\n',
        expectedOutput: 'Polyglot Lisp v1',
        explanation:
          'A simple banner a packaged application might print at startup. The `~a` fills in the version number. Real distribution uses `defpackage`/`in-package` and ASDF systems, which are covered in the questions below since they produce no printable value here.',
      },
      {
        kind: 'mcq',
        id: 'lisp-10-mcq-1',
        prompt: 'What does the `:foo` syntax (a leading colon) denote in Common Lisp?',
        options: [
          'A string literal.',
          'A *keyword* symbol — interned in the `KEYWORD` package, self-evaluating, commonly used for initargs and options.',
          'A comment.',
          'A type declaration.',
        ],
        correctIndex: 1,
        explanation:
          'A leading colon makes a keyword symbol such as `:radius` or `:speed`. Keywords live in the `KEYWORD` package, evaluate to themselves, and are the conventional vocabulary for named arguments (initargs, plist keys, options). See [Practical Common Lisp — Packages](https://gigamonkeys.com/book/programming-in-the-large-packages-and-symbols.html).',
      },
      {
        kind: 'mcq',
        id: 'lisp-10-mcq-2',
        prompt: 'What is the difference between `package:symbol` and `package::symbol`?',
        options: [
          'Nothing — both are the same.',
          'A single colon accesses an *exported* (external) symbol; a double colon reaches *any* symbol, including internal ones not meant to be public.',
          'Double colon is a syntax error.',
          'Single colon is for keywords only.',
        ],
        correctIndex: 1,
        explanation:
          'The single-colon form `pkg:sym` is the supported way to reference a symbol the package *exported*. The double-colon form `pkg::sym` bypasses the export list to reach internal symbols — a deliberate "I know this is private" escape hatch. Relying on `::` couples you to another package’s internals. See [Practical Common Lisp — Packages](https://gigamonkeys.com/book/programming-in-the-large-packages-and-symbols.html).',
      },
      {
        kind: 'mcq',
        id: 'lisp-10-mcq-3',
        prompt: 'What does `(declaim (optimize (speed 3) (safety 0)))` request from the compiler?',
        options: [
          'It defines a function named optimize.',
          'It sets global compilation policy to favour execution speed maximally and to omit runtime safety checks.',
          'It runs the program three times.',
          'It enables debugging output.',
        ],
        correctIndex: 1,
        explanation:
          '`declaim` makes a global declaration; the `optimize` qualities (`speed`, `safety`, `debug`, `space`, `compilation-speed`) range 0–3 and tell the compiler what to prioritise. `(speed 3) (safety 0)` produces the fastest, least-checked code — use sparingly and only in hot paths. See [Common Lisp Cookbook — Performance](https://lispcookbook.github.io/cl-cookbook/performance.html).',
      },
      {
        kind: 'mcq',
        id: 'lisp-10-mcq-4',
        prompt: 'Which statement about Scheme versus Common Lisp is correct?',
        options: [
          'Scheme is a Lisp-2 like Common Lisp.',
          'Scheme is a Lisp-1: a single namespace shares values and functions, so `(f x)` and passing `f` as a value use the same binding (no function-quote needed).',
          'Scheme has no lambda.',
          'Scheme and Common Lisp are byte-compatible.',
        ],
        correctIndex: 1,
        explanation:
          "Scheme is a *Lisp-1*: functions and variables share one namespace, so you never need a function-quote (`#'`) or `funcall` — a function is just a value bound to a name. Common Lisp is a *Lisp-2* with separate value and function cells. Scheme also emphasises minimalism and proper tail calls. See [Clojure — Rationale](https://clojure.org/about/rationale) for another point of contrast.",
      },
      {
        kind: 'mcq',
        id: 'lisp-10-mcq-5',
        prompt: 'What is Quicklisp?',
        options: [
          'A faster Common Lisp compiler.',
          'The de facto library manager that downloads, installs, and loads Common Lisp libraries (e.g. `(ql:quickload :alexandria)`).',
          'A REPL replacement.',
          'A dialect of Lisp.',
        ],
        correctIndex: 1,
        explanation:
          'Quicklisp is the community library manager: `(ql:quickload :name)` fetches a library and its dependencies and loads them into your image. Projects usually pair it with ASDF, which defines build systems via `.asd` files. See [Quicklisp](https://www.quicklisp.org/beta/).',
      },
    ],
  },
];
