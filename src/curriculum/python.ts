import type { Phase } from './types';

export const pythonPhases: Phase[] = [
  // ─── Level 0 ─────────────────────────────────────────────────────────────
  {
    id: 'python-0',
    language: 'python',
    level: 0,
    title: 'Setup & Hello World',
    timeEstimate: '0.5-1 hours',
    intro:
      "Welcome to Python! If you have never written a line of code before, you are in exactly the right place. By the end of this level you'll have run your very first program and you'll understand every single piece of it. We'll also verify your local Python setup. Nothing here is assumed — we'll explain every word and symbol.\n\n" +
      "Your first program is one line:\n\n" +
      "```python\nprint(\"Hello, World!\")\n```\n\n" +
      "When you run it, the computer displays the text `Hello, World!` on the screen. That's it. Now let's slow all the way down and read it the way the computer does: left to right, one token at a time. (A \"token\" is just one meaningful chunk of the line.)\n\n" +
      "```\nprint ( \"Hello, World!\" )\n^^^^^ ^ ^^^^^^^^^^^^^^^ ^\n  |   |        |        |\n  |   |        |        +-- closing parenthesis: end of the information\n  |   |        +----------- the string: the text to display\n  |   +-------------------- opening parenthesis: start of the information\n  +------------------------ print: the named action that displays text\n```\n\n" +
      "**Token 1 — `print`**\n" +
      "1. *What it means:* `print` is the name of a built-in *function*. A function is a named action — a ready-made command that does one job. \"Built-in\" means it comes with Python; you don't have to create it. The job of `print` is to display text on the screen.\n" +
      "2. *Why it's here:* it's the verb of the sentence. Without a verb, nothing happens. `print` is what makes text actually appear.\n" +
      "3. *What changes if removed:* if you delete `print` and just write `(\"Hello, World!\")`, Python evaluates the text but never shows it — you'd see nothing. The word `print` is what turns a value into something visible.\n" +
      "4. *What's in memory at runtime:* `print` refers to a function object that Python loaded before your program started. The name `print` points at that action, ready to be triggered.\n\n" +
      "**Tokens 2 & 4 — the parentheses `(` and `)`**\n" +
      "1. *What they mean:* parentheses are how you *hand information to a function* — they are the function's \"inbox.\" `print( ... )` says \"run print, and here is what to print.\"\n" +
      "2. *Why they're here:* writing the name `print` by itself only *refers* to the action; it doesn't *do* it. The parentheses are the trigger that says \"go — call this function now.\" Whatever sits between `(` and `)` is the information (called an *argument*) passed in.\n" +
      "3. *What changes if removed:* without parentheses, `print \"Hello, World!\"` is a syntax error — Python can't tell you're trying to call the function. With empty parentheses, `print()` runs but prints a blank line because you handed it nothing.\n" +
      "4. *What's in memory at runtime:* the parentheses aren't a value themselves — they're punctuation that tells Python \"take the value inside and feed it to print.\" At runtime the value `\"Hello, World!\"` flows through them into the function.\n\n" +
      "**Token 3 — `\"Hello, World!\"` (and the quotes around it)**\n" +
      "1. *What it means:* the double quotes `\"` mark the start and end of a *string*. A string is simply a piece of text — a sequence of characters like letters, spaces, and punctuation. Everything between the quotes (`Hello, World!`) is the text itself; the quotes are not part of the text, they're the fences that say \"text starts here\" and \"text ends here.\"\n" +
      "2. *Why it's here:* this is the actual information you're handing to `print` — the message you want shown.\n" +
      "3. *What changes if removed:* remove the quotes and write `print(Hello, World!)` and Python thinks `Hello` and `World` are names of things (variables) it should look up, finds nothing, and errors. The quotes are what tell Python \"treat this literally as text, don't try to interpret it.\" You can change the text to anything — `print(\"Bonjour!\")` prints `Bonjour!`. Single quotes work too: `'Hello, World!'` means the same thing.\n" +
      "4. *What's in memory at runtime:* Python builds a string value in memory holding the 13 characters `H e l l o ,  W o r l d !`. That value is passed to `print`, which writes it to the screen.\n\n" +
      "Put together: \"call the built-in `print` function (parentheses), handing it the text string `Hello, World!` (quotes), and it displays that text.\" Run it in the box below to see it work.",
    topics: [
      {
        label: 'Python Installation Guide',
        url: 'https://realpython.com/installing-python/',
        note: 'Official and community installation guides for all operating systems.'
      },
      {
        label: 'Online Python Sandbox',
        url: 'https://www.python.org/shell/',
        note: 'Run Python code directly in your browser without any setup.'
      }
    ],
    deliverable: 'Verify python --version in your command line and run a print statement in the browser console.',
    checks: [
      {
        kind: 'code',
        id: 'python-0-code-1',
        prompt: 'Use the `print()` function to output `Hello, World!` to the console.',
        boilerplate: '# Output: Hello, World!\n',
        expectedOutput: 'Hello, World!',
        explanation:
          "Reading `print(\"Hello, World!\")` token by token: `print` is a built-in function — a named, ready-made action whose job is to display text on the screen. The parentheses `( )` are how you hand information to that function; they trigger the action and carry the argument inside. The double quotes `\" \"` mark a string — a piece of text — and `Hello, World!` is the text itself (the quotes are fences, not part of the text). So the whole line means: \"call print, hand it the text string Hello, World!, and display it.\" Single quotes (`'Hello, World!'`) are equally valid string delimiters in Python. Remove the quotes and Python would try to look up `Hello` and `World` as variable names and fail; remove `print` and the text would be evaluated but never shown."
      },
      {
        kind: 'mcq',
        id: 'python-0-mcq-1',
        prompt: 'What is the standard file extension used for Python scripts?',
        options: ['.py', '.pyt', '.python', '.txt'],
        correctIndex: 0,
        explanation: 'Python scripts use the `.py` file extension. You run them with the terminal command `python filename.py`.'
      },
      {
        kind: 'mcq',
        id: 'python-0-mcq-2',
        prompt: 'Which command is typically typed in the terminal to verify your Python installation version?',
        options: ['python --version', 'python run', 'print python', 'py version'],
        correctIndex: 0,
        explanation: 'Running `python --version` (or `python3 --version`) outputs the active Python version to verify the setup.'
      }
    ]
  },
  // ─── Level 1 ─────────────────────────────────────────────────────────────
  {
    id: 'python-1',
    language: 'python',
    level: 1,
    title: 'Foundations: Syntax, Types, and Control Flow',
    timeEstimate: '6-10 hours',
    intro:
      "Before we read real programs, let's build up four bedrock ideas from absolute zero. Every program is made of these, so we'll define each one before using it.\n\n" +
      "**1. A value (and its type).** A *value* is a single piece of data — a specific thing the program works with. The number `7`, the text `\"cat\"`, the answer `True` are all values. Every value has a *type*, which is the *kind* of thing it is. The types you'll meet first:\n" +
      "- `int` — a whole number, like `7` or `-3` (\"int\" is short for *integer*).\n" +
      "- `float` — a number with a decimal point, like `3.14` or `0.5` (\"float\" refers to *floating-point*, the way computers store decimals).\n" +
      "- `str` — a *string*, meaning text, like `\"hello\"` (you met strings in Level 0). It's always written inside quotes.\n\n" +
      "Type matters because it decides what an operation *does*. The same `+` symbol behaves differently depending on the types around it. With two numbers, `+` adds: `2 + 2` gives `4`. With two strings, `+` *joins them end to end* (this is called *concatenation*): `\"2\" + \"2\"` gives `\"22\"` — Python glues the two text characters together, it does not do math, because `\"2\"` is text, not a number. The quotes are the whole difference: `2` is the number two; `\"2\"` is the character two. Mixing them, like `2 + \"2\"`, is an error, because Python won't guess whether you meant math or text.\n\n" +
      "**2. A variable.** A *variable* is a named box that stores a value so you can use it later by name. You create one with `=`:\n\n" +
      "```python\nage = 30\n```\n\n" +
      "Here is the single most important thing for a beginner: in programming, `=` does **not** mean \"equals\" the way it does in math. It means **\"store\"** (or \"assign\"). Read `age = 30` as a command, left to right reversed: *\"take the value 30 and store it in a box named `age`.\"* After that line runs, the name `age` points at the value `30` in memory; anywhere you later write `age`, Python swaps in `30`. You can re-store at any time: `age = 31` throws away the old value and puts `31` in the box. The name on the left is *not* a fact being declared true — it's a label being attached to a value.\n\n" +
      "**3. A function.** A *function* is a named, reusable action — a mini-program you can run by name. You already used the built-in function `print` in Level 0: writing `print(\"hi\")` *calls* (runs) it and hands it the value `\"hi\"`. The parentheses are how you trigger the action and pass information in. In this phase you'll also *define your own* functions with `def`, so you can give a name to a chunk of work and reuse it instead of repeating yourself.\n\n" +
      "**4. A statement.** A *statement* is one complete instruction — one step the program performs, like one sentence in a recipe. `age = 30` is a statement (store a value). `print(age)` is a statement (do an action). A program is just a list of statements that Python runs top to bottom, one after another. In Python, you normally write one statement per line, and there's no semicolon needed at the end.\n\n" +
      "With those four ideas in hand: by the end of this phase, you'll read short Python programs — if/elif chains, for/while loops, simple functions — and predict their output before running them. You'll know how indentation (the spaces at the start of a line) drives block structure, what counts as truthy, and how default arguments behave. To build the muscle, you'll write a `greet.py` CLI locally that takes a name and prints a personalised greeting with the current time — writing is how reading sticks.",
    video: {
      title: 'Python for Beginners - Full Course',
      youtubeId: '_uQrJ0TkZlc',
      channelName: 'Programming with Mosh',
      duration: '6 hours',
    },
    topics: [
      {
        label: 'The Python Tutorial (Chapters 1-5)',
        url: 'https://docs.python.org/3/tutorial/index.html',
        note: 'Official tutorial covering syntax, data types, control flow, and functions',
      },
      {
        label: 'Built-in Types reference',
        url: 'https://docs.python.org/3/library/stdtypes.html',
        note: 'int, float, str, bool, None — full API reference',
      },
      {
        label: 'Defining Functions',
        url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions',
        note: 'Function signatures, default arguments, *args, **kwargs',
      },
      {
        label: 'f-strings (PEP 498)',
        url: 'https://docs.python.org/3/reference/lexical_analysis.html#f-strings',
        note: 'Formatted string literals — the modern way to interpolate values',
      },
      {
        label: 'Python Style Guide (PEP 8)',
        url: 'https://peps.python.org/pep-0008/',
        note: 'Naming conventions, indentation rules, line length — the community standard',
      },
    ],
    deliverable:
      'Build locally: a `greet.py` CLI that takes a name argument (via `sys.argv` or `input()`) and prints a personalised greeting along with the current time using `datetime.now()`. Should handle missing arguments gracefully.',
    checks: [
      {
        kind: 'code',
        id: 'python-1-code-1',
        prompt: 'Write a program that uses a `for` loop to print numbers from `1` to `3` (each on a new line).',
        boilerplate: `# Write a for loop to print numbers 1, 2, and 3\nfor i in range(0, 0):\n    print(i)\n`,
        expectedOutput: '1\n2\n3',
        explanation: 'Using `for i in range(1, 4):` iterates over `1`, `2`, and `3`. The `range` function stops before the upper bound (4).'
      },
      {
        kind: 'mcq',
        id: 'python-1-mcq-1',
        prompt: 'Which of the following is a valid Python f-string?',
        options: [
          '`f"Hello, {name}!"`',
          '`f"Hello, $name!"`',
          '`"Hello, %s!" % name`',
          '`"Hello, " + {name} + "!"`',
        ],
        correctIndex: 0,
        explanation:
          'f-strings use `{}` to interpolate any expression. `$name` is JavaScript/shell syntax. `%s` is old-style printf formatting (still valid but legacy). The last option is a syntax error because `{name}` outside an f-string is a set literal, not interpolation, and you cannot concatenate a string with a set.',
      },
      {
        kind: 'mcq',
        id: 'python-1-mcq-2',
        prompt:
          'What does this program print?\n```python\ndef main() -> None:\n    x = 5\n    if x > 3:\n        print("A")\n    elif x > 1:\n        print("B")\n    else:\n        print("C")\n\nif __name__ == "__main__":\n    main()\n```',
        options: ['`A`', '`B`', '`A` then `B`', '`C`'],
        correctIndex: 0,
        explanation:
          'Python evaluates `if`/`elif`/`else` top-to-bottom and stops at the first truthy branch. Since `5 > 3` is True, it prints `A` and skips the remaining branches entirely. `elif` is mutually exclusive with the preceding `if`, so `B` never runs even though `5 > 1` is also true.',
      },
      {
        kind: 'mcq',
        id: 'python-1-mcq-3',
        prompt: 'Which of the following values is **falsy** in Python?',
        options: ['`0`', '`"False"`', '`[0]`', '`1`'],
        correctIndex: 0,
        explanation:
          '`0` is falsy. The string `"False"` is truthy (any non-empty string is truthy regardless of content). `[0]` is a list with one element — also truthy. `1` is truthy. The complete falsy set is: `0`, `0.0`, `""`, `[]`, `{}`, `set()`, `None`, and `False`.',
      },
      {
        kind: 'mcq',
        id: 'python-1-mcq-4',
        prompt:
          'What does this FizzBuzz program print for `n = 15`?\n```python\ndef fizzbuzz(n: int) -> str:\n    if n % 15 == 0:\n        return "FizzBuzz"\n    if n % 3 == 0:\n        return "Fizz"\n    if n % 5 == 0:\n        return "Buzz"\n    return str(n)\n\nif __name__ == "__main__":\n    print(fizzbuzz(15))\n```',
        options: ['`FizzBuzz`', '`Fizz`', '`Buzz`', '`15`'],
        correctIndex: 0,
        explanation:
          '`15 % 15 == 0` is True, so the first branch fires and returns `"FizzBuzz"`. Order matters: if you checked `n % 3` first you would incorrectly return `"Fizz"` because 15 is also divisible by 3. Always check the most specific condition first when branches are not mutually exclusive.',
      },
      {
        kind: 'mcq',
        id: 'python-1-mcq-5',
        prompt:
          'What does this program print?\n```python\ndef greet(name: str = "World") -> str:\n    return f"Hello, {name}!"\n\nif __name__ == "__main__":\n    print(greet())\n    print(greet("Ada"))\n```',
        options: [
          '`Hello, World!` then `Hello, Ada!`',
          '`Hello, name!` then `Hello, Ada!`',
          '`Hello, !` then `Hello, Ada!`',
          'TypeError: greet() missing 1 required positional argument',
        ],
        correctIndex: 0,
        explanation:
          'The parameter `name` has a default value `"World"`. Calling `greet()` with no argument uses the default. Calling `greet("Ada")` passes `"Ada"` as the positional argument. Default values are evaluated once at function-definition time, so they should never be mutable objects like `[]` or `{}`.',
      },
      {
        kind: 'mcq',
        id: 'python-1-mcq-6',
        prompt:
          'Which expression correctly checks that a string variable `s` is non-empty AND starts with the letter `A`?',
        options: [
          '`s and s.startswith("A")`',
          '`s.startswith("A") and s`',
          '`s != "" or s[0] == "A"`',
          '`s.length > 0 && s[0] == "A"`',
        ],
        correctIndex: 0,
        explanation:
          'The idiomatic check uses short-circuit `and`: if `s` is empty (falsy), the right side never runs, avoiding an `IndexError` from `s.startswith` on a bad value. Option 2 reverses the order and would crash on an empty string. Option 3 uses `or` which is wrong logically. Option 4 uses JavaScript syntax (`&&`, `.length`) which Python does not support.',
      },
      {
        kind: 'mcq',
        id: 'python-1-mcq-7',
        prompt:
          'Sentry shows 4.2K errors/hour from `/api/feed`. A customer complains: "my most recent post never shows up on the homepage". The trace points at this handler:\n```\nTraceback (most recent call last):\n  File "/app/api/feed.py", line 38, in get_latest\n    latest = posts[len(posts)]\n             ~~~~~^^^^^^^^^^^^^\nIndexError: list index out of range\n```\nThe file:\n```python\n# /app/api/feed.py\nfrom fastapi import APIRouter, HTTPException\nfrom app.services.posts import fetch_recent_posts\n\nrouter = APIRouter(prefix="/api/feed")\n\n@router.get("/latest")\ndef get_latest(user_id: int) -> dict:\n    """Return the user\'s most recent post for the homepage card."""\n    posts = fetch_recent_posts(user_id, limit=10)\n    if not posts:\n        raise HTTPException(status_code=404, detail="no posts yet")\n    # line 38 — pick the newest post\n    latest = posts[len(posts)]\n    return {"user_id": user_id, "post": latest}\n```\nWhich 1-line fix unbreaks production?',
        options: [
          'Change `items[len(items)]` to `items[len(items) - 1]` (or `items[-1]`).',
          'Change `items[len(items)]` to `items[len(items) + 1]`.',
          'Wrap the list literal in `list(...)`.',
          'Change `len(items)` to `len(items) * 2`.',
        ],
        correctIndex: 0,
        explanation:
          'Python lists are zero-indexed: valid indices for a 3-element list are 0, 1, 2. `len(items)` returns 3, which is out of range. The last index is `len(items) - 1`, or you can use the idiomatic `items[-1]` to grab the last element. Adding to the index makes the error worse.',
      },
      {
        kind: 'mcq',
        id: 'python-1-mcq-8',
        prompt:
          'Users report intermittent 500s on `/api/checkout` whenever a regional tax rate is sourced from a YAML config (which loads numbers as strings unless quoted right). Sentry trace:\n```\nTraceback (most recent call last):\n  File "/app/api/checkout.py", line 54, in checkout\n    grand_total = compute_total(line_item.price, region.tax_rate)\n  File "/app/services/pricing.py", line 18, in compute_total\n    return price + (price * tax_rate)\nTypeError: unsupported operand type(s) for +: \'int\' and \'str\'\n```\nThe service module:\n```python\n# /app/services/pricing.py\nfrom decimal import Decimal\n\n# Called from /api/checkout for every cart line.\n# `tax_rate` is loaded from regions.yaml — recently re-edited by ops.\ndef compute_total(price: int, tax_rate: str) -> int:\n    """Return price plus tax. Treats tax_rate as a multiplier."""\n    return price + (price * tax_rate)  # line 18\n```\nGiven the trace, what is the most likely root cause AND the right fix?',
        options: [
          'The caller passes `"0.08"` as a string. Pass `0.08` as a float and accept `tax_rate: float`.',
          'The bug is `return price + (price * tax_rate)`. Use `str(price * tax_rate)`.',
          'The bug is `def total`. Use `lambda` instead.',
          "Python cannot multiply int by string at all — use `int(tax_rate)` to fix it.",
        ],
        correctIndex: 0,
        explanation:
          'Python can multiply `int * str` — `100 * "0.08"` repeats the string 100 times. The crash actually happens at the `+`, because adding an int to that long string is invalid. The real fix is to use a numeric type for a numeric quantity: pass `0.08` (float) and update the annotation to `tax_rate: float`. Stringly-typed numbers are a classic source of these errors.',
      },
      {
        kind: 'mcq',
        id: 'python-1-mcq-9',
        prompt:
          'CI is red on every PR — the test suite never even starts:\n```\n$ pytest tests/ -q\nERROR collecting tests/unit/test_sign.py\n  File "/app/services/math_utils.py", line 9\n    if x > 0\n            ^\nSyntaxError: expected \':\'\n!!! Interrupted: 1 error during collection !!!\n```\nThe file under test:\n```python\n# /app/services/math_utils.py\n"""Pure-function helpers used by the order-pricing pipeline."""\nfrom __future__ import annotations\n\n\ndef sign(x: int) -> str:\n    """Return "positive", "negative", or "zero" for the given int."""\n    if x > 0\n        return "positive"\n    if x < 0:\n        return "negative"\n    return "zero"\n```\nWhere would you look FIRST AND what is the fix?',
        options: [
          'Line 3 — missing colon after `if x > 0`.',
          'Line 4 — the `return` is indented too deeply.',
          'Line 5 — `x < 0` should be `x <= 0`.',
          'Line 1 — type annotations are not allowed on functions.',
        ],
        correctIndex: 0,
        explanation:
          'Every `if`, `elif`, `else`, `for`, `while`, `def`, and `class` header in Python ends with a colon — the parser uses it to know the header is complete and a new block starts. The error message even tells you `expected \':\'`. Type annotations on functions are perfectly valid Python.',
      },
    ],
  },

  // ─── Level 2 ─────────────────────────────────────────────────────────────
  {
    id: 'python-2',
    language: 'python',
    level: 2,
    title: 'Data Structures, Comprehensions, and Iterators',
    timeEstimate: '8-12 hours',
    intro:
      "By the end of this phase, you'll read list/dict/set comprehensions, generator expressions, and slicing patterns and predict their output without running them. You'll know when to reach for a dict vs a list and how Python's iterator protocol underpins `for` loops. To build the muscle, you'll write a `wordcount.py` CLI locally that reads stdin or a file and prints the top-10 most common words — writing is how reading sticks.",
    topics: [
      {
        label: 'Data Structures (Python Tutorial Chapter 5)',
        url: 'https://docs.python.org/3/tutorial/datastructures.html',
        note: 'Lists, dicts, sets, tuples — official tutorial with examples',
      },
      {
        label: 'Dictionary Merging and Updating (PEP 584)',
        url: 'https://peps.python.org/pep-0584/',
        note: 'Using the | and |= operators to merge dictionaries in Python 3.9+',
      },
      {
        label: 'List Comprehensions',
        url: 'https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions',
        note: 'Compact syntax for building lists from iterables',
      },
      {
        label: 'Iterators and Generators',
        url: 'https://docs.python.org/3/tutorial/classes.html#iterators',
        note: '__iter__/__next__ protocol and the yield keyword',
      },
      {
        label: 'Built-in Functions reference',
        url: 'https://docs.python.org/3/library/functions.html',
        note: 'enumerate, zip, map, filter, sorted, reversed, range, len, sum, min, max',
      },
      {
        label: 'Sequence Types — slice notation',
        url: 'https://docs.python.org/3/library/stdtypes.html#common-sequence-operations',
        note: 'a[start:stop:step] — full slice semantics',
      },
    ],
    deliverable:
      'Build locally: a `wordcount.py` CLI that reads stdin (or a file path argument) and prints the top-10 most common words with their frequencies. Use comprehensions for tokenisation and `collections.Counter` for counting.',
    checks: [
      {
        kind: 'mcq',
        id: 'python-2-mcq-1',
        prompt:
          'What does this program print?\n```python\ndef main() -> None:\n    result = [x ** 2 for x in range(5) if x % 2 == 0]\n    print(result)\n\nif __name__ == "__main__":\n    main()\n```',
        options: ['`[0, 4, 16]`', '`[0, 1, 4, 9, 16]`', '`[4, 16]`', '`[0, 2, 4]`'],
        correctIndex: 0,
        explanation:
          '`range(5)` yields `0,1,2,3,4`. The `if x % 2 == 0` filter keeps only the even numbers: `0, 2, 4`. Squaring those gives `[0, 4, 16]`. The filter is applied BEFORE the expression on the left, which is the opposite of how SQL `SELECT ... WHERE` is written.',
      },
      {
        kind: 'mcq',
        id: 'python-2-mcq-2',
        prompt:
          'What does this program print?\n```python\ndef invert(d: dict) -> dict:\n    return {v: k for k, v in d.items()}\n\nif __name__ == "__main__":\n    print(invert({"a": 1, "b": 2}))\n```',
        options: [
          '`{1: \'a\', 2: \'b\'}`',
          '`{\'a\': 1, \'b\': 2}`',
          '`[(\'a\', 1), (\'b\', 2)]`',
          'TypeError: dict keys must be hashable',
        ],
        correctIndex: 0,
        explanation:
          'A dict comprehension `{v: k for k, v in d.items()}` swaps keys and values. The integers `1` and `2` become the new keys (integers are hashable). If values were unhashable (e.g. lists), Python would raise `TypeError`. If two original values were the same, you would silently lose entries.',
      },
      {
        kind: 'mcq',
        id: 'python-2-mcq-3',
        prompt:
          "What does `users.get('email')` return when `'email'` is NOT a key in the dict `users`?",
        options: [
          '`None` — `.get()` returns None by default if the key is missing.',
          'Raises `KeyError` exactly like `users[\'email\']`.',
          'Raises `AttributeError` because dicts have no `.get`.',
          'Returns an empty string.',
        ],
        correctIndex: 0,
        explanation:
          '`dict.get(key)` returns `None` for missing keys; `dict.get(key, default)` lets you supply a different sentinel. By contrast `dict[key]` raises `KeyError` on missing keys. Use `.get` when absence is expected (lookups against partial data); use `[]` when absence is a bug you want to surface loudly.',
      },
      {
        kind: 'mcq',
        id: 'python-2-mcq-4',
        prompt:
          'What does this program print?\n```python\ndef main() -> None:\n    print(list(zip([1, 2, 3], ["a", "b"])))\n\nif __name__ == "__main__":\n    main()\n```',
        options: [
          "`[(1, 'a'), (2, 'b')]`",
          "`[(1, 'a'), (2, 'b'), (3, None)]`",
          "`[[1, 'a'], [2, 'b']]`",
          'ValueError due to mismatched lengths',
        ],
        correctIndex: 0,
        explanation:
          '`zip` stops at the shortest iterable by default, so the third element `3` is silently dropped. Use `itertools.zip_longest(..., fillvalue=None)` if you want the longer-iterable fill behaviour. `zip` returns tuples (not lists), and it never raises on length mismatch in Python 3.9 — though `zip(..., strict=True)` (3.10+) does.',
      },
      {
        kind: 'mcq',
        id: 'python-2-mcq-5',
        prompt:
          'What does this generator output?\n```python\ndef running_total(numbers: list[int]):\n    total = 0\n    for n in numbers:\n        total += n\n        yield total\n\nif __name__ == "__main__":\n    print(list(running_total([1, 2, 3, 4])))\n```',
        options: [
          '`[1, 3, 6, 10]`',
          '`[1, 2, 3, 4]`',
          '`[10]`',
          '`<generator object running_total at 0x...>`',
        ],
        correctIndex: 0,
        explanation:
          'Each iteration adds to `total` and yields the new running sum: 1, 1+2=3, 3+3=6, 6+4=10. `yield` makes the function a generator; wrapping it in `list()` materialises all values. Without `list()` you would print the generator object itself (option 4).',
      },
      {
        kind: 'mcq',
        id: 'python-2-mcq-6',
        prompt:
          'You see this exception in your logs:\n```\nTraceback (most recent call last):\n  File "cache.py", line 6, in <module>\n    print(lookup(cache, "missing"))\n  File "cache.py", line 3, in lookup\n    return d[key]\nKeyError: \'missing\'\n```\nThe code is:\n```python\ndef lookup(d: dict, key: str) -> str:\n    return d[key]\n\nif __name__ == "__main__":\n    cache = {"hit": "value"}\n    print(lookup(cache, "missing"))\n```\nThe caller wants `None` for missing keys (not a crash). Which fix is correct?',
        options: [
          'Replace `d[key]` with `d.get(key)` — returns `None` when absent.',
          'Wrap the return in `str(d[key])`.',
          'Add `d.append(key)` before the return.',
          'Change `key: str` to `key: any` in the type annotation.',
        ],
        correctIndex: 0,
        explanation:
          '`dict[key]` raises `KeyError` when the key is absent. `dict.get(key)` returns `None` (or a supplied default). Use `[]` when absence is a bug; use `.get` when missing is a normal outcome you want to handle. Type annotations are static hints — they do not change runtime behaviour.',
      },
      {
        kind: 'mcq',
        id: 'python-2-mcq-7',
        prompt:
          'A QA engineer files: "Even-numbered transaction IDs are supposed to be excluded from the nightly export, but a few keep sneaking through. Looks random." Reproducing locally with a synthetic batch:\n```\n$ python -m jobs.export.repro\nInput  : [1, 2, 3, 4]\nExpected (odd-only): [1, 3]\nActual : [1, 3, 4]   # the trailing 4 survived\n```\nThe step that prunes evens:\n```python\n# /jobs/export/clean.py\nfrom __future__ import annotations\n\n\ndef remove_evens(xs: list[int]) -> list[int]:\n    """Drop every even transaction id in place and return the list.\n\n    Used as the last filter before writing the nightly CSV — running on a\n    list of ~50K ids in production.\n    """\n    for x in xs:\n        if x % 2 == 0:\n            xs.remove(x)\n    return xs\n```\nGiven the input/output, what is the root cause AND the safer rewrite?',
        options: [
          'Do not mutate `xs` while iterating it. Build a new list: `return [x for x in xs if x % 2 != 0]`.',
          'Change `xs.remove(x)` to `xs.pop(x)`.',
          'Loop with `while xs:` instead of `for x in xs:`.',
          'Add `xs.sort()` before the loop.',
        ],
        correctIndex: 0,
        explanation:
          'Mutating a list while iterating it skips elements: when `remove(2)` shifts everything left, the iterator advances past the new element at that index. The `4` is missed and survives. The standard fix is to build a new list with a comprehension (or iterate over `xs[:]` — a shallow copy).',
      },
      {
        kind: 'mcq',
        id: 'python-2-mcq-8',
        prompt:
          'A new feature-flag dumper crashes the startup job on every deploy. Logs:\n```\n2026-05-24T14:02:11Z [config-dump] starting...\nTraceback (most recent call last):\n  File "/app/scripts/dump_flags.py", line 22, in main\n    dump_flags(load_flags())\n  File "/app/scripts/dump_flags.py", line 14, in dump_flags\n    for k, v in flags:\nValueError: too many values to unpack (expected 2)\n```\nThe script:\n```python\n# /app/scripts/dump_flags.py\n"""Print every feature flag in `name=value` form for the boot log."""\nfrom __future__ import annotations\n\n\ndef load_flags() -> dict[str, bool]:\n    return {"checkout_v2": True, "new_search": False, "ai_summary": True}\n\n\ndef dump_flags(flags: dict[str, bool]) -> None:\n    for k, v in flags:\n        print(f"{k}={v}")\n\n\ndef main() -> None:\n    dump_flags(load_flags())\n\n\nif __name__ == "__main__":\n    main()\n```\nWhich line is the bug AND what is the 1-line fix?',
        options: [
          'Line `for k, v in d:` — iterating a dict yields KEYS only. Use `d.items()` to get `(key, value)` pairs.',
          'Line `d = {"key1": "alpha", ...}` — the dict literal is invalid.',
          'The print is malformed — use `%s` instead of f-string.',
          'Python dicts must be declared with `dict()` not `{}`.',
        ],
        correctIndex: 0,
        explanation:
          'Iterating a dict directly (`for x in d`) yields KEYS, not key/value pairs. Each key is a string like `"key1"` — unpacking `"key1"` into `k, v` fails because the string has 4 characters, not 2. Use `for k, v in d.items()` to iterate over `(key, value)` tuples.',
      },
      {
        kind: 'mcq',
        id: 'python-2-mcq-9',
        prompt:
          'A user files: "When I add an item to my cart on the storefront, the SAME item appears in the admin preview cart too." The integration test that exposes it:\n```\n$ pytest tests/integration/test_cart.py::test_independent_carts -q\n>       assert customer_cart == [1]\nE       assert [1, 99] == [1]\nE         Left contains 1 more item: 99\n```\nThe service factory:\n```python\n# /app/services/cart_factory.py\nfrom __future__ import annotations\n\n\ndef build_pair() -> tuple[list[int], list[int]]:\n    """Return (customer_cart, admin_preview_cart) — must be INDEPENDENT.\n\n    The admin preview is allowed to mutate its own cart for what-if pricing\n    without touching the customer\'s real cart.\n    """\n    base: list[int] = [1]\n    customer_cart = base\n    admin_preview_cart = base\n    admin_preview_cart.append(99)  # admin tweak\n    return customer_cart, admin_preview_cart\n```\nWhat\'s the root cause AND the right fix?',
        options: [
          '`a` and `b` reference the SAME list. Use `a = base.copy(); b = base.copy()` (or `list(base)`).',
          'Use `b = base.append(99)` directly.',
          'Add `del base` after the assignments.',
          'Annotate `base` as `final base: list[int]`.',
        ],
        correctIndex: 0,
        explanation:
          'In Python, `a = base; b = base` makes both names point to the SAME list object. Mutating through one name is visible through the other. To get independent lists make explicit copies with `.copy()`, `list(base)`, or `base[:]`. This aliasing bug is one of the most common sources of "spooky action at a distance" in Python code.',
      },
      {
        kind: 'mcq',
        id: 'python-2-mcq-10',
        prompt:
          'How do you sort a list of dictionaries `data = [{"name": "A", "age": 30}, {"name": "B", "age": 25}]` by the "age" key in ascending order?',
        options: [
          '`sorted(data, key=lambda x: x["age"])`',
          '`data.sort(key="age")`',
          '`sorted(data, by="age")`',
          '`data.sort_by("age")`',
        ],
        correctIndex: 0,
        explanation:
          'The `sorted()` function (and `list.sort()` method) accepts a `key` parameter which must be a callable that extracts the comparison key from each element. `lambda x: x["age"]` is the idiomatic way to sort by a dictionary key.',
      },
      {
        kind: 'code',
        id: 'python-2-code-1',
        prompt: 'Modify the list comprehension to square only the odd numbers from `1` to `5` (inclusive), then print the resulting list.',
        boilerplate: '# Modify the list comprehension to square only odd numbers from 1 to 5 (inclusive)\nresult = [x for x in range(1, 6) if x % 2 == 0]\n',
        expectedOutput: '[1, 9, 25]',
        explanation: 'A list comprehension follows the format `[expression for item in iterable if condition]`. To get the squares of odd numbers, we square `x` (`x**2`) and check if `x % 2 != 0`.'
      }
    ],
  },

  // ─── Level 3 ─────────────────────────────────────────────────────────────
  {
    id: 'python-3',
    language: 'python',
    level: 3,
    title: 'Modules, Packages, OOP, File I/O, and Exceptions',
    timeEstimate: '10-14 hours',
    intro:
      "By the end of this phase, you'll read multi-file projects — imports, class hierarchies, file handling with `with`, and `try/except/else/finally` blocks — and predict how exceptions propagate. You'll know when an `open()` leaks a file handle and what `__name__ == '__main__'` actually guards. To build the muscle, you'll write a `contacts.py` CLI locally backed by a JSON file, with custom exception classes for duplicate and not-found cases — writing is how reading sticks.",
    topics: [
      {
        label: 'Modules (Python Tutorial Chapter 6)',
        url: 'https://docs.python.org/3/tutorial/modules.html',
        note: 'import system, packages, __init__.py, __all__',
      },
      {
        label: 'Command-Line Arguments and Environment Variables',
        url: 'https://docs.python.org/3/library/sys.html#sys.argv',
        note: 'Reading basic command-line arguments via sys.argv and configuration via os.environ',
      },
      {
        label: 'Virtual Environments and Packages (Tutorial Chapter 12)',
        url: 'https://docs.python.org/3/tutorial/venv.html',
        note: 'python -m venv, pip install, requirements.txt',
      },
      {
        label: 'Reading and Writing Files (Tutorial Chapter 7)',
        url: 'https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files',
        note: 'open(), modes, with statement, read/write/readline',
      },
      {
        label: 'Errors and Exceptions (Tutorial Chapter 8)',
        url: 'https://docs.python.org/3/tutorial/errors.html',
        note: 'try/except/else/finally, raising exceptions, custom exception classes',
      },
      {
        label: 'Classes (Tutorial Chapter 9)',
        url: 'https://docs.python.org/3/tutorial/classes.html',
        note: 'class definition, __init__, inheritance, @property, __repr__/__str__',
      },
    ],
    deliverable:
      'Build locally: a `contacts.py` CLI that stores contacts as class instances, persists them to a JSON file, supports `add`/`list`/`search`/`delete` subcommands, and raises custom exceptions (`DuplicateContactError`, `ContactNotFoundError`) for invalid operations.',
    checks: [
      {
        kind: 'mcq',
        id: 'python-3-mcq-1',
        prompt:
          'Which exception is raised when you try to open a file that does not exist?',
        options: ['`FileNotFoundError`', '`IOError`', '`OSError`', '`ValueError`'],
        correctIndex: 0,
        explanation:
          '`FileNotFoundError` is the specific exception for missing files. It is a subclass of `OSError` (and `IOError` is an alias for `OSError` since Python 3.3), so catching `OSError` also works — but `FileNotFoundError` is the most precise and idiomatic choice.',
      },
      {
        kind: 'mcq',
        id: 'python-3-mcq-2',
        prompt:
          'What does this program print?\n```python\nclass BankAccount:\n    def __init__(self, owner: str, balance: float = 0) -> None:\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount: float) -> None:\n        if amount <= 0:\n            raise ValueError("amount must be positive")\n        self.balance += amount\n\n    def __repr__(self) -> str:\n        return f"BankAccount(owner={self.owner!r}, balance={self.balance})"\n\nif __name__ == "__main__":\n    acc = BankAccount("Alice", 100)\n    acc.deposit(50)\n    print(repr(acc))\n```',
        options: [
          "`BankAccount(owner='Alice', balance=150)`",
          "`BankAccount(owner=Alice, balance=150)`",
          "`BankAccount(owner='Alice', balance=100)`",
          'ValueError: amount must be positive',
        ],
        correctIndex: 0,
        explanation:
          'After `deposit(50)` the balance becomes 150. The `!r` conversion in the f-string calls `repr()` on the value, which adds quotes around the string `\'Alice\'`. `__repr__` is the canonical machine-readable representation — `repr(acc)` calls it explicitly.',
      },
      {
        kind: 'mcq',
        id: 'python-3-mcq-3',
        prompt:
          'What does this program print?\n```python\ndef safe_divide(a: float, b: float) -> float | None:\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return None\n\nif __name__ == "__main__":\n    print(safe_divide(10, 2))\n    print(safe_divide(5, 0))\n```',
        options: [
          '`5.0` then `None`',
          '`5` then `None`',
          '`5.0` then `0`',
          'ZeroDivisionError on second call',
        ],
        correctIndex: 0,
        explanation:
          'In Python 3 the `/` operator always returns a float, so `10 / 2` is `5.0` (not `5`). Use `//` for integer division. The second call divides by zero, which raises `ZeroDivisionError`; the `except` clause catches it and returns `None`.',
      },
      {
        kind: 'mcq',
        id: 'python-3-mcq-4',
        prompt:
          'What is the purpose of `if __name__ == "__main__":` at the bottom of a module?',
        options: [
          'It ensures the block only runs when the file is executed directly, not when imported.',
          "It declares the module's public API.",
          'It prevents the file from being imported at all.',
          'It is required for all Python scripts to run correctly.',
        ],
        correctIndex: 0,
        explanation:
          'When Python imports a module, `__name__` is set to the module name (e.g. `"contacts"`). When the file is run directly, `__name__` is `"__main__"`. This guard lets the same file act as both a runnable script AND an importable library without side effects on import.',
      },
      {
        kind: 'mcq',
        id: 'python-3-mcq-5',
        prompt:
          'In a `try`/`except`/`else`/`finally` block, when does the `else` branch run?',
        options: [
          'When the `try` block completes successfully without raising an exception.',
          'When an exception is caught by `except`.',
          'When the `finally` block raises an exception.',
          'It runs every time, regardless of exceptions.',
        ],
        correctIndex: 0,
        explanation:
          'The `else` clause runs only if the `try` block finished without raising. This lets you separate "code that might raise" from "code that runs on success" — keeping the `try` body minimal and avoiding accidentally catching exceptions raised by post-success logic. `finally` always runs.',
      },
      {
        kind: 'mcq',
        id: 'python-3-mcq-6',
        prompt:
          'Why should you prefer `with open(path) as f:` over `f = open(path); ... ; f.close()`?',
        options: [
          'The `with` statement guarantees `f.close()` runs even if an exception is raised inside the block.',
          'It is slightly faster because Python skips reference counting.',
          'The `with` form is required — `open()` cannot be called without it.',
          'It enables async file I/O automatically.',
        ],
        correctIndex: 0,
        explanation:
          '`with` is a context manager that calls `__exit__` (and thus `close()`) on normal exit, return, or exception propagation. Manual `f.close()` is easy to forget after a `return` statement, and an exception between `open()` and `close()` leaks the file descriptor. Always use `with` for files, sockets, locks, and database connections.',
      },
      {
        kind: 'mcq',
        id: 'python-3-mcq-7',
        prompt:
          'On-call ticket: "Nightly export occasionally produces empty/truncated CSVs and `lsof` shows leaked file descriptors on the worker pod." Sentry trace from one of the failing runs:\n```\nTraceback (most recent call last):\n  File "/srv/jobs/exports/csv_writer.py", line 19, in save_lines\n    raise ValueError("blank line")\nValueError: blank line\n```\nThe writer:\n```python\n# /srv/jobs/exports/csv_writer.py\n"""Write export rows to disk. Called from the nightly Celery beat schedule."""\nfrom __future__ import annotations\n\n\ndef save_lines(path: str, lines: list[str]) -> None:\n    """Write each line to `path` (utf-8, newline-terminated).\n\n    Raises ValueError if any line is blank — blank lines indicate a bug\n    upstream in the row builder and must abort the export.\n    """\n    f = open(path, "w", encoding="utf-8")\n    for line in lines:\n        f.write(line + "\\n")\n        if not line:\n            raise ValueError("blank line")\n    f.close()\n```\nWhy is the file leaked AND what is the 1-line fix?',
        options: [
          'The manual `open` / `close` leaks the file on the `raise`. Use `with open(path, "w", encoding="utf-8") as f:` so close runs on exception.',
          'Change `"w"` to `"a"` (append mode).',
          'Add `f.flush()` after the for loop.',
          'Replace the f-string `+ "\\n"` with `format()`.',
        ],
        correctIndex: 0,
        explanation:
          'When `raise ValueError("blank line")` fires, control jumps past `f.close()`, so the file handle is leaked and buffered data may never be flushed. `with` registers `__exit__` (which calls close) for ANY exit path — normal, return, or exception. Always use `with` for files.',
      },
      {
        kind: 'mcq',
        id: 'python-3-mcq-8',
        prompt:
          'After merging a "tiny refactor", the entire web service refuses to boot in staging:\n```\n[2026-05-24T09:11:02Z] gunicorn: starting api.wsgi:application\nTraceback (most recent call last):\n  File "/app/api/wsgi.py", line 3, in <module>\n    from app.models import User\n  File "/app/app/models.py", line 4, in <module>\n    from app.services import notify\n  File "/app/app/services.py", line 3, in <module>\n    from app.models import User\nImportError: cannot import name \'User\' from partially initialized module \'app.models\' (most likely due to a circular import) (/app/app/models.py)\n```\nThe two modules:\n```python\n# /app/app/models.py\nfrom __future__ import annotations\nfrom dataclasses import dataclass\nfrom app.services import notify  # used by User.save()\n\n\n@dataclass\nclass User:\n    id: int\n    email: str\n\n    def save(self) -> None:\n        # persist then notify subscribers\n        notify(self)\n```\n```python\n# /app/app/services.py\nfrom __future__ import annotations\nfrom app.models import User  # used in the type hint below\n\n\ndef notify(u: User) -> None:\n    """Push a `user.saved` event onto the bus."""\n    print(f"event: user.saved id={u.id}")\n```\nWhich fix unbreaks staging without losing the type hint?',
        options: [
          'Break the cycle: import `User` inside the `notify` function body (`def notify(u): from models import User; ...`) or move the shared type to a third module.',
          'Add `import sys; sys.path.append(...)` to both files.',
          'Rename `services.py` to `_services.py`.',
          'Delete the `class User:` definition.',
        ],
        correctIndex: 0,
        explanation:
          'When `models.py` is partway through import, importing `services.py` triggers `from models import User` — but `User` is not yet defined. The clean fix is to break the cycle: either defer the import to function scope (so it runs after both modules are fully loaded) or pull the shared definitions into a third leaf module that both can import.',
      },
      {
        kind: 'mcq',
        id: 'python-3-mcq-9',
        prompt:
          'A junior dev opened a PR and CI fails with a single error before any test runs:\n```\n$ pytest tests/unit/test_catalog.py::test_create_item -q\n>       item = Item("widget", 10)\nE       TypeError: Item.__init__() takes 2 positional arguments but 3 were given\n\ntests/unit/test_catalog.py:14: TypeError\n```\nThe model under test:\n```python\n# /app/catalog/models.py\nfrom __future__ import annotations\nfrom dataclasses import dataclass\n\n\nclass Item:\n    """Catalog item — name + price in cents.\n\n    Manually written (not @dataclass) because we needed custom validation.\n    """\n\n    def __init__(name: str, price: float) -> None:\n        if price < 0:\n            raise ValueError("price must be non-negative")\n        self.name = name\n        self.price = price\n\n    def __repr__(self) -> str:\n        return f"Item(name={self.name!r}, price={self.price})"\n```\nWhich line is the bug AND the 1-character fix?',
        options: [
          '`def __init__(name: str, price: float)` is missing the explicit `self` parameter. Should be `def __init__(self, name: str, price: float)`.',
          'The class needs `@classmethod` on `__init__`.',
          'The `-> None` annotation is invalid.',
          'You must use `super().__init__()` even with no base class.',
        ],
        correctIndex: 0,
        explanation:
          'Python instance methods take an explicit first parameter (conventionally `self`). When you call `Item("widget", 10)`, Python prepends the instance, so the method actually receives THREE arguments — but the signature only declares two. The error message counts the call-site arguments, not the missing `self`. Add `self` as the first parameter.',
      },
      {
        kind: 'mcq',
        id: 'python-3-mcq-10',
        prompt:
          'How do you retrieve the value of an environment variable named `DATABASE_URL` in Python, providing a default if it is not set?',
        options: [
          '`import os; os.environ.get("DATABASE_URL", "default_val")`',
          '`import os; os.environ["DATABASE_URL"] ?? "default_val"`',
          '`import sys; sys.env["DATABASE_URL"]`',
          '`os.getenv("DATABASE_URL") or raise`',
        ],
        correctIndex: 0,
        explanation:
          '`os.environ` is a dict-like object representing environment variables. Using `.get()` allows retrieving a value with an optional default. `os.getenv("DATABASE_URL", "default_val")` is also equivalent.',
      },
      {
        kind: 'code',
        id: 'python-3-code-1',
        prompt: 'Define a custom exception named `NegativeValueError` that inherits from `ValueError`. Then, modify the `verify_positive` function to raise `NegativeValueError` if the input `n` is negative.',
        boilerplate: '# Define NegativeValueError inheriting from ValueError\nclass NegativeValueError(Exception):\n    pass\n\ndef verify_positive(n: int) -> int:\n    # Raise NegativeValueError if n is negative\n    if n < 0:\n        pass\n    return n\n\ntry:\n    verify_positive(-10)\nexcept NegativeValueError:\n    print("Caught NegativeValueError successfully")\n',
        expectedOutput: 'Caught NegativeValueError successfully',
        explanation: 'Custom exceptions are defined by creating a class that inherits from `Exception` or any of its subclasses (like `ValueError`). They are raised using the `raise` keyword.'
      }
    ],
  },

  // ─── Level 4 ─────────────────────────────────────────────────────────────
  {
    id: 'python-4',
    language: 'python',
    level: 4,
    title: 'Standard Library, Type Hints, Dataclasses, and pytest',
    timeEstimate: '12-16 hours',
    intro:
      "By the end of this phase, you'll read code using `pathlib`, `collections`, `itertools`, `functools`, `@dataclass`, and pytest fixtures and predict their behaviour. You'll know when mypy will complain about an `Optional` dereference and how parametrize collapses six tests into one. To build the muscle, you'll write a `notes.py` CLI locally with full type hints and a pytest suite — writing is how reading sticks.",
    topics: [
      {
        label: 'pathlib — Object-oriented filesystem paths',
        url: 'https://docs.python.org/3/library/pathlib.html',
        note: 'Path(), read_text(), write_text(), glob(), iterdir()',
      },
      {
        label: 'argparse — Command-line option and argument parsing',
        url: 'https://docs.python.org/3/library/argparse.html',
        note: 'Writing robust, self-documenting CLI scripts with arguments and flags',
      },
      {
        label: 'subprocess — Subprocess management',
        url: 'https://docs.python.org/3/library/subprocess.html',
        note: 'Running external system commands, capturing output, and handling return codes',
      },
      {
        label: 'requests / httpx — Consuming Web APIs',
        url: 'https://www.python-httpx.org/',
        note: 'Making HTTP requests (GET, POST), handling headers, query params, and JSON responses',
      },
      {
        label: 'collections — Specialised container datatypes',
        url: 'https://docs.python.org/3/library/collections.html',
        note: 'Counter, defaultdict, deque, namedtuple, OrderedDict',
      },
      {
        label: 'itertools — Iterator building blocks',
        url: 'https://docs.python.org/3/library/itertools.html',
        note: 'chain, islice, product, groupby, accumulate, combinations, permutations',
      },
      {
        label: 'typing — Type hints (PEP 484)',
        url: 'https://docs.python.org/3/library/typing.html',
        note: 'List, Dict, Optional, Union, Callable, Tuple, TypeVar, Generic',
      },
      {
        label: 'dataclasses — @dataclass decorator',
        url: 'https://docs.python.org/3/library/dataclasses.html',
        note: 'Automatic __init__, __repr__, __eq__; field(), frozen=True, slots=True',
      },
      {
        label: 'pytest — Getting Started',
        url: 'https://docs.pytest.org/en/stable/getting-started.html',
        note: 'Writing test functions, assert rewriting, fixtures, parametrize',
      },
    ],
    deliverable:
      'Build locally: a `notes.py` CLI with subcommands (`add`, `list`, `find`, `done`) backed by a JSON file. Use `argparse`, `pathlib`, `@dataclass`, and full type hints. Cover behaviour with pytest.',
    checks: [
      {
        kind: 'mcq',
        id: 'python-4-mcq-1',
        prompt:
          'What does this program print?\n```python\nfrom collections import Counter\n\ndef main() -> None:\n    c = Counter("abracadabra")\n    print(c.most_common(2))\n\nif __name__ == "__main__":\n    main()\n```',
        options: [
          "`[('a', 5), ('b', 2)]`",
          "`[('a', 5), ('r', 2)]`",
          "`{'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1}`",
          "`[('a', 5), ('b', 2), ('r', 2)]`",
        ],
        correctIndex: 0,
        explanation:
          '`Counter` counts each character: a=5, b=2, r=2, c=1, d=1. `.most_common(2)` returns the two most-common pairs in descending order, breaking ties by insertion order. Since `b` is encountered before `r` in `"abracadabra"`, `b` wins the tie.',
      },
      {
        kind: 'mcq',
        id: 'python-4-mcq-2',
        prompt:
          'What does this program print?\n```python\nfrom dataclasses import dataclass\nimport math\n\n@dataclass\nclass Point:\n    x: float\n    y: float\n\n    def distance_to(self, other: "Point") -> float:\n        return math.hypot(self.x - other.x, self.y - other.y)\n\nif __name__ == "__main__":\n    print(Point(0, 0).distance_to(Point(3, 4)))\n```',
        options: ['`5.0`', '`7.0`', '`25.0`', '`(3, 4)`'],
        correctIndex: 0,
        explanation:
          '`math.hypot(3, 4)` computes `sqrt(3² + 4²) = sqrt(25) = 5.0` — the classic 3-4-5 right triangle. `@dataclass` auto-generates `__init__`, `__repr__`, and `__eq__` from the type-annotated fields, so we did not need to write `__init__` ourselves.',
      },
      {
        kind: 'mcq',
        id: 'python-4-mcq-3',
        prompt:
          'Which type annotation best describes a function that accepts a list of strings and returns an optional integer (the modern Python 3.10+ style)?',
        options: [
          '`def f(items: list[str]) -> int | None:`',
          '`def f(items: List) -> Optional:`',
          '`def f(items: list) -> int?:`',
          '`def f(items: str[]) -> int | None:`',
        ],
        correctIndex: 0,
        explanation:
          'Since Python 3.9, `list[str]` (lowercase, no import) replaces `typing.List[str]`. Since Python 3.10, `int | None` (PEP 604) replaces `Optional[int]`. `int?` is not Python syntax. `str[]` is C/Java/TypeScript syntax. The old `typing.List`/`Optional` still works but is considered legacy.',
      },
      {
        kind: 'mcq',
        id: 'python-4-mcq-4',
        prompt:
          'What does this program print?\n```python\nfrom functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n: int) -> int:\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nif __name__ == "__main__":\n    print(fib(10))\n```',
        options: ['`55`', '`89`', '`10`', '`RecursionError`'],
        correctIndex: 0,
        explanation:
          'The Fibonacci sequence is 0,1,1,2,3,5,8,13,21,34,55,89,... so `fib(10) = 55`. `@lru_cache(maxsize=None)` memoises results, turning the naive O(2^n) recursion into O(n) by reusing previously computed values. Without the cache, `fib(35)` already takes seconds; with it, even `fib(1000)` is instant.',
      },
      {
        kind: 'mcq',
        id: 'python-4-mcq-5',
        prompt:
          'What does this program print?\n```python\nfrom pathlib import Path\n\ndef main() -> None:\n    p = Path("/tmp/data/file.txt")\n    print(p.stem, p.suffix, p.parent.name)\n\nif __name__ == "__main__":\n    main()\n```',
        options: [
          '`file .txt data`',
          '`file.txt . /tmp/data`',
          '`file txt data`',
          '`file.txt txt /tmp`',
        ],
        correctIndex: 0,
        explanation:
          '`Path.stem` strips the suffix and returns `"file"`. `Path.suffix` includes the leading dot: `".txt"`. `Path.parent` is `Path("/tmp/data")`, and its `.name` is the last component: `"data"`. `pathlib` is the modern replacement for the older `os.path` string-based API.',
      },
      {
        kind: 'mcq',
        id: 'python-4-mcq-6',
        prompt:
          'Which pytest feature lets you run the SAME test function with multiple different input/expected combinations?',
        options: [
          '`@pytest.mark.parametrize`',
          '`@pytest.fixture`',
          '`@pytest.skip`',
          '`@pytest.mark.xfail`',
        ],
        correctIndex: 0,
        explanation:
          '`@pytest.mark.parametrize("input,expected", [(1, 2), (3, 6), ...])` reruns the test once per tuple. Fixtures provide reusable setup data. `skip` and `xfail` mark tests as not-to-be-run or expected-to-fail. Parametrize is the single biggest productivity boost over `unittest.TestCase` style.',
      },
      {
        kind: 'mcq',
        id: 'python-4-mcq-7',
        prompt:
          'A user reports their search history accumulates duplicates ACROSS sessions: "I searched X yesterday, log out, log back in fresh, and my history still shows X." Sentry shows no errors. Repro:\n```\n>>> from app.search.history import add_item\n>>> add_item("first_user_query")\n[\'first_user_query\']\n>>> # imagine a brand new request from a different user...\n>>> add_item("second_user_query")\n[\'first_user_query\', \'second_user_query\']   # expected just [\'second_user_query\']\n```\nThe helper:\n```python\n# /app/search/history.py\nfrom __future__ import annotations\n\n\ndef add_item(item: str, items: list[str] = []) -> list[str]:\n    """Append `item` to the per-request history list and return it.\n\n    Each call should start from an empty list when no explicit `items`\n    is passed in.\n    """\n    items.append(item)\n    return items\n```\nWhat is the root cause AND the correct rewrite?',
        options: [
          'The mutable default `items: list[str] = []` is evaluated ONCE at definition and shared by every call. Use `items: list[str] | None = None` and inside the function do `if items is None: items = []`.',
          'The `append` should be `extend`.',
          'Type hints `list[str]` are not allowed as defaults.',
          'The function must return `None` not a list.',
        ],
        correctIndex: 0,
        explanation:
          "Default argument values are evaluated once at function-definition time, so a mutable default (`[]`, `{}`, `set()`) becomes shared state across calls. Standard fix: use `None` as the sentinel and create the fresh list inside. This is one of Python's most famous gotchas — show it in interviews.",
      },
      {
        kind: 'mcq',
        id: 'python-4-mcq-8',
        prompt:
          'CI fails 1/20 runs with a flaky-looking dict-merge test — but the failure is deterministic on the runner that finally caught it:\n```\n$ pytest tests/unit/test_config_merge.py::test_merge -q\n>       assert result == expected\nE       AssertionError: assert {\'a\': 1, \'b\': 2} == {\'a\': 1, \'b\': 2, \'c\': 3}\nE         Common items: {\'a\': 1, \'b\': 2}\nE         Right contains 1 more item: {\'c\': 3}\nE         Use -v to see the full diff\n\ntests/unit/test_config_merge.py:11: AssertionError\n```\nThe test:\n```python\n# /tests/unit/test_config_merge.py\n"""Verify the env-var override merge that ships config to /etc/app.toml."""\nfrom __future__ import annotations\n\n\ndef test_merge() -> None:\n    a: dict[str, int] = {"a": 1}\n    b: dict[str, int] = {"b": 2, "c": 3}\n    expected = {"a": 1, "b": 2, "c": 3}\n    result = a | {"b": 2}\n    assert result == expected\n```\nWhich line is the bug AND the fix?',
        options: [
          '`result = a | {"b": 2}` only merges one key. Should be `result = a | b` to include both `b` and `c`.',
          'Dict union `|` is not allowed; use `dict.update`.',
          'The assertion is reversed — should be `expected == result`.',
          '`pytest` cannot compare dicts; convert to `list(...)` first.',
        ],
        correctIndex: 0,
        explanation:
          "pytest's `assert` rewriter shows you the actual diff: result is missing key `c`. The test merges `a` with a literal `{\"b\": 2}` instead of the full `b` dict that contains both `b` and `c`. Fix the call to merge `a | b`. Note that `|` for dict union is the Python 3.9+ syntax (PEP 584).",
      },
      {
        kind: 'mcq',
        id: 'python-4-mcq-9',
        prompt:
          'A CI gate (`mypy --strict`) blocks the PR that introduces a new user-normalisation step:\n```\n$ mypy --strict apps/web/lib/users.py\napps/web/lib/users.py:14: error: Item "None" of "str | None" has no attribute "upper"  [union-attr]\nFound 1 error in 1 file (checked 1 source file)\n```\nAnd a teammate notes "we already had a NoneType crash in prod last quarter from the same shape." The file:\n```python\n# /apps/web/lib/users.py\nfrom __future__ import annotations\nfrom typing import Any\n\n\ndef get_email(user: dict[str, Any]) -> str | None:\n    """Return user[\'email\'] if present, else None."""\n    return user.get("email")\n\n\ndef normalise(user: dict[str, Any]) -> str:\n    """Return the email upper-cased for downstream matching."""\n    email = get_email(user)\n    return email.upper()  # line 14\n```\nWhich fix satisfies mypy AND avoids the runtime `AttributeError`?',
        options: [
          'Guard before dereferencing: `if email is None: raise ValueError("missing email"); return email.upper()` — mypy narrows `email` to `str` after the check.',
          'Cast: `return cast(str, email).upper()` — silences mypy without runtime safety.',
          'Use `email!.upper()` — TypeScript-style non-null assertion.',
          'Remove the `-> str | None` annotation from `get_email`.',
        ],
        correctIndex: 0,
        explanation:
          'mypy is correct: `email` could be `None`, and calling `.upper()` on `None` raises `AttributeError`. The fix is to narrow with a runtime check; after `if email is None: raise`, mypy knows `email: str` in the next statement. `cast` lies to the type checker without actually changing runtime behaviour — never use it to silence a legitimate complaint.',
      },
      {
        kind: 'mcq',
        id: 'python-4-mcq-10',
        prompt:
          'What is the recommended, secure way to run a system command like `git status` and capture its text output in Python?',
        options: [
          '`subprocess.run(["git", "status"], capture_output=True, text=True)`',
          '`os.system("git status")`',
          '`subprocess.popen("git status")`',
          '`subprocess.check_output("git status")`',
        ],
        correctIndex: 0,
        explanation:
          '`subprocess.run` with a list of arguments is the modern, secure way to execute processes (avoiding shell injection vulnerabilities). `capture_output=True` captures stdout/stderr, and `text=True` decodes the bytes to strings automatically.',
      },
      {
        kind: 'code',
        id: 'python-4-code-1',
        prompt: 'Define a frozen dataclass named `Book` with two fields: `title` (a string) and `author` (a string). Ensure the dataclass is frozen (immutable).',
        boilerplate: 'from dataclasses import dataclass\n\n# Define a frozen dataclass Book with title (str) and author (str)\nclass Book:\n    title: str\n    author: str\n\ntry:\n    book = Book("1984", "George Orwell")\n    print(book)\n    book.title = "Animal Farm"\nexcept Exception as e:\n    print("Dataclass is frozen")\n',
        expectedOutput: 'Book(title=\'1984\', author=\'George Orwell\')\nDataclass is frozen',
        explanation: 'Decorating a class with `@dataclass(frozen=True)` generates an immutable dataclass. Modifying any field on a frozen instance raises a `FrozenInstanceError`.'
      }
    ],
  },

  // ─── Level 5 ─────────────────────────────────────────────────────────────
  {
    id: 'python-5',
    language: 'python',
    level: 5,
    title: 'Advanced Typing, Generics, Protocols, and Pattern Matching',
    timeEstimate: '14-18 hours',
    intro:
      "By the end of this phase, you'll read code using `Generic[T]`, `Protocol`, `TypedDict`, `TypeGuard`, and `match`/`case` and predict what mypy says about each line. You'll know how structural subtyping differs from inheritance and when an exhaustiveness check protects you. To build the muscle, you'll write a `result.py` library locally — a typed `Result[T, E]` generic with `Ok`/`Err` variants — writing is how reading sticks.",
    topics: [
      {
        label: 'Generics in Python (typing.Generic & PEP 695)',
        url: 'https://docs.python.org/3/library/typing.html#generics',
        note: 'TypeVar, Generic[T], PEP 695 type-parameter syntax (3.12+)',
      },
      {
        label: 'typing.Protocol — Structural subtyping',
        url: 'https://docs.python.org/3/library/typing.html#typing.Protocol',
        note: 'Duck typing with static type support, @runtime_checkable',
      },
      {
        label: 'TypedDict',
        url: 'https://docs.python.org/3/library/typing.html#typing.TypedDict',
        note: 'Type-safe dictionaries, total=False for optional keys',
      },
      {
        label: 'Structural Pattern Matching (PEP 634)',
        url: 'https://peps.python.org/pep-0634/',
        note: 'match/case: literal, capture, OR, AS, guard, class, sequence, mapping patterns',
      },
      {
        label: 'ParamSpec (PEP 612)',
        url: 'https://peps.python.org/pep-0612/',
        note: 'Typing decorators and higher-order functions that preserve callable signatures',
      },
    ],
    deliverable:
      'Build locally: a `result.py` library exposing a typed `Result[T, E]` generic with `Ok`/`Err` variants and `map`/`flat_map`/`unwrap_or` methods. Use PEP 695 `class Result[T, E]:` syntax and ship a pytest suite covering all branches.',
    checks: [
      {
        kind: 'mcq',
        id: 'python-5-mcq-1',
        prompt:
          'What is the key difference between `typing.Protocol` and an abstract base class (ABC)?',
        options: [
          'Protocol uses structural subtyping — a class satisfies a Protocol if it has the right methods, without explicit inheritance.',
          'Protocol requires explicit inheritance, just like ABC.',
          'Protocol only works at runtime, not with static type checkers.',
          'Protocol classes cannot have method implementations.',
        ],
        correctIndex: 0,
        explanation:
          'This is structural (duck-type) subtyping: any class with the right shape satisfies the Protocol without `class Foo(MyProtocol)`. ABCs require explicit `class Foo(MyABC)`. Protocols are checked statically by tools like mypy/pyright; `@runtime_checkable` is needed only for `isinstance` checks at runtime.',
      },
      {
        kind: 'mcq',
        id: 'python-5-mcq-2',
        prompt:
          'What does this program print?\n```python\ndef first[T](items: list[T]) -> T | None:\n    return items[0] if items else None\n\nif __name__ == "__main__":\n    print(first([10, 20, 30]))\n    print(first([]))\n```',
        options: [
          '`10` then `None`',
          '`10` then `IndexError`',
          '`30` then `None`',
          '`[10, 20, 30]` then `[]`',
        ],
        correctIndex: 0,
        explanation:
          'The PEP 695 syntax `def first[T](...)` declares a generic type parameter inline — no need to import `TypeVar`. The conditional `items[0] if items else None` short-circuits on an empty list (which is falsy), returning `None` without raising. With `[10, 20, 30]` it returns the first element `10`.',
      },
      {
        kind: 'mcq',
        id: 'python-5-mcq-3',
        prompt:
          'What does this program print?\n```python\ndef describe(shape: dict) -> str:\n    match shape:\n        case {"kind": "circle", "radius": r}:\n            return f"Circle with radius {r}"\n        case {"kind": "rect", "w": w, "h": h}:\n            return f"Rectangle {w}x{h}"\n        case _:\n            return "Unknown shape"\n\nif __name__ == "__main__":\n    print(describe({"kind": "circle", "radius": 5}))\n    print(describe({"kind": "rect", "w": 3, "h": 4}))\n```',
        options: [
          '`Circle with radius 5` then `Rectangle 3x4`',
          '`Circle with radius 5` then `Unknown shape`',
          '`Unknown shape` then `Rectangle 3x4`',
          'SyntaxError: match is not a Python keyword',
        ],
        correctIndex: 0,
        explanation:
          'Mapping patterns in `match`/`case` (PEP 634, Python 3.10+) destructure dicts: `{"kind": "circle", "radius": r}` matches any dict containing those keys and binds `r` to the value. Extra keys in the input are ignored (unlike strict matching). `case _:` is the wildcard catch-all.',
      },
      {
        kind: 'mcq',
        id: 'python-5-mcq-4',
        prompt:
          'What does `TypeGuard[T]` as a return type tell the type checker?',
        options: [
          "If the function returns True, the type checker narrows the argument's type to T in the succeeding branch.",
          'The function always returns a value of type T.',
          'The function raises an exception if the argument is not of type T.',
          'It is equivalent to `bool` — there is no narrowing effect.',
        ],
        correctIndex: 0,
        explanation:
          "`TypeGuard[T]` (PEP 647) is a special return type for user-defined type predicates. If the guard returns True, type checkers treat the guarded argument as `T` in the `if` branch. It is analogous to TypeScript's `arg is T`. Without `TypeGuard`, mypy treats the function as plain `bool` with no narrowing.",
      },
      {
        kind: 'mcq',
        id: 'python-5-mcq-5',
        prompt:
          'What does this program print?\n```python\nfrom typing import TypedDict\n\nclass User(TypedDict):\n    name: str\n    age: int\n\ndef greet(u: User) -> str:\n    return f"{u[\'name\']} is {u[\'age\']}"\n\nif __name__ == "__main__":\n    print(greet({"name": "Ada", "age": 36}))\n```',
        options: [
          '`Ada is 36`',
          "`{'name': 'Ada', 'age': 36}`",
          '`User(name=\'Ada\', age=36)`',
          'TypeError: TypedDict is not subscriptable',
        ],
        correctIndex: 0,
        explanation:
          '`TypedDict` is purely a type-checker hint: at runtime, the instance is a regular `dict`. So `u["name"]` and `u["age"]` work like any dict access. TypedDict shines in mypy/pyright by enforcing the keys and types at static-analysis time. Use it when you have JSON-like data with a known shape.',
      },
      {
        kind: 'mcq',
        id: 'python-5-mcq-6',
        prompt:
          'mypy reports `error: Missing return statement` on the function below despite all "obvious" cases being covered:\n```python\nfrom typing import Literal\n\ndef rate(grade: Literal["A", "B", "C"]) -> int:\n    match grade:\n        case "A":\n            return 4\n        case "B":\n            return 3\n        case "C":\n            return 2\n```\nWhat is happening AND how do you make mypy verify exhaustiveness?',
        options: [
          'mypy is conservative: add a default `case _:` that calls `typing.assert_never(grade)`. If a new Literal value is added later, mypy will flag the assert_never call as an error.',
          'mypy is wrong — there is no fix; suppress with `# type: ignore`.',
          'Replace `Literal` with `str` and add `else: return 0`.',
          'Add `from __future__ import exhaustive_match` at the top.',
        ],
        correctIndex: 0,
        explanation:
          '`assert_never(x)` is a type-checker primitive: if mypy thinks any value of `x` could reach this line, it errors. After matching `"A"`, `"B"`, `"C"`, mypy narrows `grade` to `Never` — so reaching `assert_never(grade)` is statically impossible AND mypy considers all paths returned. Add a fourth Literal later and mypy will immediately surface the unhandled case.',
      },
      {
        kind: 'mcq',
        id: 'python-5-mcq-7',
        prompt:
          'A PR adding a generic `Box` to the shared types lib fails CI on the type-check job:\n```\n$ mypy --strict packages/shared/box.py\npackages/shared/box.py:24: error: Incompatible types in assignment (expression has type "Box[Dog]", variable has type "Box[Animal]")  [assignment]\nFound 1 error in 1 file (checked 1 source file)\n```\nThe module:\n```python\n# /packages/shared/box.py\n"""Tiny mutable container used by the inventory matcher."""\nfrom __future__ import annotations\nfrom dataclasses import dataclass\n\n\n@dataclass\nclass Animal:\n    name: str\n\n\n@dataclass\nclass Dog(Animal):\n    breed: str = "mutt"\n\n\nclass Box[T]:\n    def __init__(self, value: T) -> None:\n        self.value = value\n\n    def replace(self, new: T) -> None:\n        self.value = new\n\n\ndog_box: Box[Dog] = Box(Dog(name="Rex"))\n# line 24 — should this be allowed?\nanimal_box: Box[Animal] = dog_box\n```\nWhy is mypy correct to reject this AND what would make it safe?',
        options: [
          '`Box[T]` is INVARIANT in T (the default). Mutable containers cannot be covariant — `animal_box.replace(Cat())` would corrupt the Dog-only invariant. To allow covariance you would need a read-only Protocol with `T` covariant.',
          'mypy is buggy — `Dog` is a subclass of `Animal`, so `Box[Dog]` is a `Box[Animal]`.',
          'The bug is `@dataclass` on `Animal` — dataclasses cannot be generic.',
          'You forgot `from typing import TypeVar`.',
        ],
        correctIndex: 0,
        explanation:
          'Variance rules: a mutable generic container is invariant — `Box[Dog]` is NOT a `Box[Animal]` even though `Dog` is an `Animal`. If it were, callers could write `animal_box.replace(Cat())`, putting a Cat into a Box that promises Dogs. Covariance is only sound when the type appears in OUTPUT positions only (read-only sequences, return types).',
      },
      {
        kind: 'mcq',
        id: 'python-5-mcq-8',
        prompt:
          'A pricing rule that uses `match` returns `0` for every rectangle SKU — production invoices are silently zeroing out. Local repro:\n```\n$ python -m apps.pricing.area_repro\narea(Rectangle(3, 4)) -> 0   # expected 12\n```\nThe pricing module:\n```python\n# /apps/pricing/shapes.py\nfrom __future__ import annotations\nfrom dataclasses import dataclass\n\n\n@dataclass\nclass Rectangle:\n    w: int\n    h: int\n\n\ndef area(shape: object) -> int:\n    """Return area in mm^2 for the supported shape kinds."""\n    match shape:\n        case Rectangle(w, h):\n            return w * h\n        case _:\n            return 0\n\n\nif __name__ == "__main__":\n    print(f"area(Rectangle(3, 4)) -> {area(Rectangle(3, 4))}")\n```\nWhy does the `Rectangle` branch never match AND what is the safest rewrite?',
        options: [
          'Positional class patterns need `__match_args__`. `@dataclass` sets it automatically — but `Rectangle(w, h)` only works if `__match_args__ = ("w", "h")` exists. Older Python (<3.10) lacks this. On 3.10+, the fix is to ensure no module shadowing AND use keyword patterns: `case Rectangle(w=w, h=h):`.',
          'You must register `Rectangle` with `match.register` before use.',
          'The bug is `return w * h` — should be `return w + h`.',
          'Pattern matching only supports dicts, never classes.',
        ],
        correctIndex: 0,
        explanation:
          "Class patterns like `Rectangle(w, h)` use the class's `__match_args__` tuple to map positional patterns to attributes. `@dataclass` populates this automatically on 3.10+. If a local variable named `Rectangle` shadows the class, the pattern silently becomes a CAPTURE pattern (binding any value to a variable). Using keyword patterns (`Rectangle(w=w, h=h)`) is unambiguous and recommended in scripts where shadowing is possible.",
      },
      {
        kind: 'mcq',
        id: 'python-5-mcq-9',
        prompt:
          'Boundary code that ingests an external webhook (Stripe payload) fails the strict type-check gate:\n```\n$ mypy --strict apps/web/webhooks/stripe.py\napps/web/webhooks/stripe.py:18: error: Incompatible return value type (got "dict[str, object]", expected "User")  [return-value]\nFound 1 error in 1 file (checked 1 source file)\n```\nThe handler:\n```python\n# /apps/web/webhooks/stripe.py\n"""Parse the customer payload off the incoming Stripe webhook body."""\nfrom __future__ import annotations\nimport json\nfrom typing import TypedDict\n\n\nclass User(TypedDict):\n    name: str\n    age: int\n\n\ndef parse(raw_body: bytes) -> User:\n    """Decode `raw_body` (JSON) into our internal User TypedDict."""\n    raw: dict[str, object] = json.loads(raw_body)\n    # line 18 — we trust Stripe… right?\n    return raw\n```\nWhy is mypy correct to reject this AND what is the safe boundary fix?',
        options: [
          'TypedDict is structural — mypy needs proof that the keys and value types match. Validate at the boundary: `if "name" in raw and isinstance(raw["name"], str) and ...: return User(name=..., age=...)`. For real boundaries, use Pydantic.',
          'Add `User.from_dict(raw)` — mypy treats classmethods as authoritative.',
          'Use `cast(User, raw)` and rely on it at runtime.',
          'Make `User` a dataclass instead.',
        ],
        correctIndex: 0,
        explanation:
          "TypedDict is a STATIC check; mypy refuses to upcast `dict[str, object]` because the runtime values' types are unknown. The honest fix at I/O boundaries is to validate explicitly with `isinstance` checks, or use Pydantic which generates the validation code for you. `cast` would silence mypy but leave the runtime exposed to bad data.",
      },
      {
        kind: 'code',
        id: 'python-5-code-1',
        prompt: 'Write a function `process_command(cmd: tuple[str, int]) -> str` that uses structural pattern matching (`match`/`case`) to handle commands: `"up"` and `"down"` with their associated values. Any other command should return `"Unknown command"`.',
        boilerplate: 'def process_command(cmd: tuple[str, int]) -> str:\n    # Use match/case to handle ("up", value) and ("down", value)\n    match cmd:\n        case _:\n            return "Unknown command"\n\nif __name__ == "__main__":\n    process_command(("up", 10))\n    process_command(("down", 5))\n    process_command(("left", 2))\n',
        expectedOutput: 'Moving up by 10\nMoving down by 5\nUnknown command',
        explanation: 'Structural pattern matching (introduced in Python 3.10) using `match` and `case` allows matching the structure of sequences and binding matched values directly to local variables.'
      }
    ],
  },

  // ─── Level 6 ─────────────────────────────────────────────────────────────
  {
    id: 'python-6',
    language: 'python',
    level: 6,
    title: 'Async/Await, asyncio Internals, and Context Managers',
    timeEstimate: '14-20 hours',
    intro:
      "By the end of this phase, you'll read async code — `gather`, `TaskGroup`, semaphores, `async with` — and predict whether a coroutine actually awaits, never awaits (a silent bug), or deadlocks waiting for itself. You'll know why missing `await` is the single most common async bug. To build the muscle, you'll write an async `linkcheck.py` CLI locally that fetches URLs concurrently with a semaphore — writing is how reading sticks.",
    topics: [
      {
        label: 'asyncio — Coroutines and Tasks',
        url: 'https://docs.python.org/3/library/asyncio-task.html',
        note: 'asyncio.run, create_task, gather, wait, sleep, timeout, TaskGroup',
      },
      {
        label: 'asyncio — Synchronisation Primitives',
        url: 'https://docs.python.org/3/library/asyncio-sync.html',
        note: 'Lock, Event, Semaphore, Queue, BoundedSemaphore',
      },
      {
        label: 'contextvars — Context Variables',
        url: 'https://docs.python.org/3/library/contextvars.html',
        note: 'ContextVar, Token — task-local storage that works with asyncio',
      },
      {
        label: 'contextlib — Context Manager Utilities',
        url: 'https://docs.python.org/3/library/contextlib.html',
        note: '@contextmanager, @asynccontextmanager, suppress, ExitStack',
      },
      {
        label: 'asyncio — Event Loop internals',
        url: 'https://docs.python.org/3/library/asyncio-eventloop.html',
        note: 'get_event_loop, run_until_complete, call_soon, call_later',
      },
    ],
    deliverable:
      'Build locally: a `linkcheck.py` async CLI that reads URLs from a file or argv, fetches them concurrently with `httpx.AsyncClient`, caps concurrency via `asyncio.Semaphore`, and prints status codes plus elapsed time per URL.',
    checks: [
      {
        kind: 'mcq',
        id: 'python-6-mcq-1',
        prompt:
          'What is the difference between `asyncio.gather(*coros)` and `asyncio.wait(coros)`?',
        options: [
          '`gather` returns results in input order and raises on first exception by default; `wait` returns two sets (done/pending) and does not raise.',
          '`gather` is sequential; `wait` is concurrent.',
          'They are interchangeable — `wait` is just an older alias.',
          '`wait` returns results in input order; `gather` returns sets.',
        ],
        correctIndex: 0,
        explanation:
          '`asyncio.gather` collects results in original input order and propagates the first exception (cancelling others unless `return_exceptions=True`). `asyncio.wait` is lower-level: it returns `(done, pending)` sets, supports `return_when=FIRST_COMPLETED`/`FIRST_EXCEPTION`/`ALL_COMPLETED`, and never implicitly propagates exceptions.',
      },
      {
        kind: 'mcq',
        id: 'python-6-mcq-2',
        prompt:
          'What does this program print?\n```python\nimport asyncio\n\nasync def square(d: int) -> int:\n    await asyncio.sleep(0)\n    return d * d\n\nasync def total(delays: list[int]) -> int:\n    results = await asyncio.gather(*(square(d) for d in delays))\n    return sum(results)\n\nif __name__ == "__main__":\n    print(asyncio.run(total([1, 2, 3])))\n```',
        options: ['`14`', '`6`', '`9`', '`[1, 4, 9]`'],
        correctIndex: 0,
        explanation:
          'Each call to `square(d)` returns `d*d`. For `[1, 2, 3]` that gives `[1, 4, 9]`, and `sum([1, 4, 9]) == 14`. `asyncio.gather` waits for all coroutines and returns results in input order. `asyncio.sleep(0)` is a zero-delay yield that gives the event loop a chance to schedule other tasks.',
      },
      {
        kind: 'mcq',
        id: 'python-6-mcq-3',
        prompt:
          'What output does this program produce?\n```python\nfrom contextlib import contextmanager\nimport time\n\n@contextmanager\ndef timer(label: str):\n    start = time.perf_counter()\n    yield\n    elapsed_ms = (time.perf_counter() - start) * 1000\n    print(f"{label}: done in {elapsed_ms:.0f}ms")\n\nif __name__ == "__main__":\n    with timer("sum"):\n        _ = sum(range(1000))\n```',
        options: [
          'A line starting with `sum: done in ` and ending in `ms`.',
          'A line starting with `sum: started ` and ending in `ms`.',
          'No output — `yield` is not allowed inside context managers.',
          'A line containing `start: 0.0` and `elapsed: 0.0`.',
        ],
        correctIndex: 0,
        explanation:
          '`@contextmanager` turns a generator into a context manager. Code before `yield` runs on `__enter__`, code after `yield` runs on `__exit__`. The timer records `start` on entry and prints elapsed milliseconds on exit. The `{elapsed_ms:.0f}` format strips decimals.',
      },
      {
        kind: 'mcq',
        id: 'python-6-mcq-4',
        prompt: 'Which statement about `contextvars.ContextVar` is correct?',
        options: [
          'Each asyncio Task gets its own copy of ContextVar values, so setting in one task does not affect another.',
          'ContextVar values are global — all tasks share the same value.',
          'ContextVar is only useful with threads, not async tasks.',
          'You must explicitly copy context between tasks; it is not automatic.',
        ],
        correctIndex: 0,
        explanation:
          "When asyncio creates a Task, it copies the current Context automatically. Setting a ContextVar inside the task only modifies that task's copy, keeping other tasks isolated. This is the intended use case for request-scoped data like request IDs in async web frameworks (FastAPI, Starlette).",
      },
      {
        kind: 'mcq',
        id: 'python-6-mcq-5',
        prompt:
          'Why would you wrap network calls with `asyncio.Semaphore(10)` even when using `asyncio.gather`?',
        options: [
          'To cap how many requests run truly in parallel and avoid overwhelming the remote server or local file descriptors.',
          '`asyncio.gather` requires a Semaphore — it raises otherwise.',
          'It makes the calls run faster by sharing connections.',
          'It is the only way to await multiple coroutines.',
        ],
        correctIndex: 0,
        explanation:
          '`asyncio.gather` starts every coroutine immediately. With 10,000 URLs you would open 10,000 sockets simultaneously, crushing the server and exhausting OS file descriptors. A `Semaphore(N)` guards an `async with sem:` block so only N coroutines hold the semaphore at once.',
      },
      {
        kind: 'mcq',
        id: 'python-6-mcq-6',
        prompt:
          'You see this warning at exit and the result list is empty:\n```\nsys:1: RuntimeWarning: coroutine \'fetch\' was never awaited\nRuntimeWarning: Enable tracemalloc to get the object allocation traceback\n```\nThe code:\n```python\nimport asyncio\n\nasync def fetch(url: str) -> str:\n    return f"data:{url}"\n\nasync def main() -> list[str]:\n    return [fetch(u) for u in ["a", "b", "c"]]\n\nif __name__ == "__main__":\n    print(asyncio.run(main()))\n```\nWhich line is the bug?',
        options: [
          '`return [fetch(u) for u in ...]` produces coroutines but never awaits them. Use `return await asyncio.gather(*(fetch(u) for u in [...]))`.',
          '`async def fetch` should be `def fetch`.',
          'Replace `asyncio.run(main())` with `main()` directly.',
          'Add `await` in front of the list literal: `await [fetch(u) ...]`.',
        ],
        correctIndex: 0,
        explanation:
          "Calling an async function returns a coroutine OBJECT — it doesn't run until awaited. The list comprehension builds three coroutines and discards them without awaiting, so the function bodies never execute. `asyncio.gather` schedules all coroutines on the loop and awaits their results. (`await [...]` on a literal list is a TypeError.)",
      },
      {
        kind: 'mcq',
        id: 'python-6-mcq-7',
        prompt:
          'A new background ingestion worker never exits — Kubernetes kills the pod after the 5-minute grace period on every deploy. The supervisor log shows it pegged at "running" forever:\n```\n[ingest-worker] 2026-05-24T08:00:01Z  starting batch\n[ingest-worker] 2026-05-24T08:00:02Z  scheduled slow_task(1.0)\n[ingest-worker] 2026-05-24T08:05:00Z  SIGTERM (k8s preStop)\n[ingest-worker] 2026-05-24T08:05:30Z  SIGKILL (terminationGracePeriodSeconds)\n```\nThe entrypoint:\n```python\n# /services/ingest/worker.py\n"""Long-running ingestion worker. Should drain a batch then exit cleanly."""\nfrom __future__ import annotations\nimport asyncio\n\n\nasync def slow_task(d: float) -> None:\n    """Simulate one unit of work."""\n    await asyncio.sleep(d)\n\n\nasync def main() -> None:\n    async with asyncio.TaskGroup() as tg:\n        tg.create_task(slow_task(1.0))\n        # "stay alive until shutdown signal"\n        await asyncio.Event().wait()\n\n\nif __name__ == "__main__":\n    asyncio.run(main())\n```\nWhy does the worker never exit AND what is the correct shutdown pattern?',
        options: [
          '`asyncio.Event().wait()` waits forever on an Event that is never set. The `async with TaskGroup` does not exit until ALL tasks AND the body complete, so the body itself blocks forever.',
          '`TaskGroup` cannot be used with `async with`.',
          '`asyncio.sleep(1.0)` requires `await asyncio.sleep(1)` (integer only).',
          'The bug is `tg.create_task(slow(1.0))` — should be `tg.add(slow(1.0))`.',
        ],
        correctIndex: 0,
        explanation:
          'A `TaskGroup` block exits only after its body returns AND every child task is done. A fresh `Event` is never set, so `await asyncio.Event().wait()` blocks indefinitely, the body never returns, the group never exits. Either set the event from a task or remove that line. TaskGroups (3.11+) are the structured-concurrency replacement for raw `gather`.',
      },
      {
        kind: 'mcq',
        id: 'python-6-mcq-8',
        prompt:
          'A FastAPI endpoint that writes an audit log crashes on the first request after deploy:\n```\nTraceback (most recent call last):\n  File "/app/api/audit.py", line 22, in log_event\n    await f.write(msg + "\\n")\nTypeError: object NoneType can\'t be used in \'await\' expression\n\nINFO:     127.0.0.1:51422 - "POST /api/events HTTP/1.1" 500 Internal Server Error\n```\nThe helper:\n```python\n# /app/api/audit.py\n"""Append-only audit log for compliance. Called from every mutating endpoint."""\nfrom __future__ import annotations\nimport asyncio\n\n\nasync def write_log(path: str, msg: str) -> None:\n    """Append `msg` (plus newline) to the audit log at `path`.\n\n    Called from request handlers — must not block the event loop noticeably.\n    """\n    with open(path, "a") as f:\n        await f.write(msg + "\\n")  # line 22\n\n\nasync def log_event(event: str) -> None:\n    await write_log("/var/log/app/audit.log", event)\n```\nWhich line is the bug AND what is the right fix for an async handler?',
        options: [
          'Built-in `open()` is SYNC — `f.write` returns `None`, not a coroutine. Either drop `await` (sync I/O inside async is bad but works for tiny writes) or use the async-friendly `aiofiles.open(...)` library.',
          'Change `"a"` to `"ab"` (binary append).',
          'Move `import asyncio` inside the function.',
          'Use `await write_log(...)` instead of `asyncio.run`.',
        ],
        correctIndex: 0,
        explanation:
          "Standard `open` is synchronous and `f.write` returns the number of characters written — `await None` raises `TypeError`. Sync I/O blocks the event loop, but for tiny writes it's tolerable. For real async file I/O use the third-party `aiofiles` package (or `anyio.open_file`). The same trap applies to using `requests` instead of `httpx`/`aiohttp` inside async code.",
      },
      {
        kind: 'mcq',
        id: 'python-6-mcq-9',
        prompt:
          'Under sustained load the API leaks DB connections. After ~20 minutes the pool is exhausted and `/api/orders` starts returning 503s. Per-request log:\n```\n[2026-05-24T11:14:02Z] WARN  sqlalchemy.pool: connection pool exhausted (10/10 in use)\n[2026-05-24T11:14:02Z] ERROR /api/orders -> 503 (timeout waiting for connection)\n[2026-05-24T11:14:02Z] sys:1: ResourceWarning: unclosed connection <Connection ...>\n```\nThe session helper:\n```python\n# /app/db/session.py\n"""Async session factory used by every route via Depends(get_session)."""\nfrom __future__ import annotations\nfrom contextlib import asynccontextmanager\nfrom typing import AsyncIterator\nfrom app.db.engine import open_session, AsyncSession\n\n\n@asynccontextmanager\nasync def session() -> AsyncIterator[AsyncSession]:\n    """Yield a session that MUST be closed when the request ends."""\n    s = await open_session()\n    yield s\n    await s.close()\n```\nWhy is `close()` being skipped AND what is the standard fix?',
        options: [
          'Wrap with try/finally so close runs even on exception: `try: yield s\\nfinally: s.close()`.',
          'Replace `@asynccontextmanager` with `@contextmanager`.',
          'Call `s.close()` BEFORE `yield`.',
          'Use `async with s:` inside the function instead of `yield`.',
        ],
        correctIndex: 0,
        explanation:
          "`@asynccontextmanager` generators must run the cleanup block — but if the caller's `async with` body raises, control returns to the generator AT the `yield` point as an exception. Without a `try/finally`, the line after `yield` is skipped and `close()` never runs. Always wrap the `yield` of a context-manager generator in `try/finally`.",
      },
      {
        kind: 'code',
        id: 'python-6-code-1',
        prompt: 'Write an asynchronous function `fetch_data(delay: float, value: int) -> int` that awaits `asyncio.sleep(delay)` and then returns `value`. Then, run two calls concurrently using `asyncio.gather` and print the sum of their returned values.',
        boilerplate: 'import asyncio\n\n# Complete the async function to sleep and return the value\nasync def fetch_data(delay: float, value: int) -> int:\n    return value\n\nasync def main() -> None:\n    # Run fetch_data(0.01, 10) and fetch_data(0.02, 20) concurrently\n    results = await asyncio.gather(\n        fetch_data(0.01, 10),\n        fetch_data(0.02, 20)\n    )\n    print(sum(results))\n\nif __name__ == "__main__":\n    asyncio.run(main())\n',
        expectedOutput: '30',
        explanation: 'An `async def` function returns a coroutine. Awaiting `asyncio.sleep` yields control back to the event loop. `asyncio.gather` allows multiple coroutines to run concurrently.'
      }
    ],
  },

  // ─── Level 7 ─────────────────────────────────────────────────────────────
  {
    id: 'python-7',
    language: 'python',
    level: 7,
    title: 'Performance, Profiling, and CPython Internals',
    timeEstimate: '16-22 hours',
    intro:
      "By the end of this phase, you'll read cProfile output and `dis` bytecode and predict where the hot loop is. You'll know why threads cannot parallelise CPU work in CPython and how to spot a memory leak from `tracemalloc` snapshots. To build the muscle, you'll write a `matmul_bench.py` script locally that profiles a naive nested-loop matrix multiplication against NumPy — writing is how reading sticks.",
    topics: [
      {
        label: 'cProfile and pstats — Profiling Python Programs',
        url: 'https://docs.python.org/3/library/profile.html',
        note: 'python -m cProfile, pstats.Stats, sort_stats, print_stats',
      },
      {
        label: 'tracemalloc — Memory Allocation Tracing',
        url: 'https://docs.python.org/3/library/tracemalloc.html',
        note: 'take_snapshot, compare_to, top statistics by file/line',
      },
      {
        label: 'dis — Python Bytecode Disassembler',
        url: 'https://docs.python.org/3/library/dis.html',
        note: 'dis.dis(), dis.code_info() — read CPython bytecode instructions',
      },
      {
        label: 'Python GIL — Global Interpreter Lock',
        url: 'https://wiki.python.org/moin/GlobalInterpreterLock',
        note: 'What the GIL is, when it matters, multiprocessing as an alternative',
      },
      {
        label: 'timeit — Precise timing of small code snippets',
        url: 'https://docs.python.org/3/library/timeit.html',
        note: 'python -m timeit, timeit.timeit(), avoid common pitfalls',
      },
      {
        label: 'py-spy — Sampling profiler for Python',
        url: 'https://github.com/benfred/py-spy',
        note: 'py-spy record / top — profile running processes without code changes',
      },
    ],
    deliverable:
      'Build locally: a `matmul_bench.py` that benchmarks a pure-Python nested-loop matrix multiply against a NumPy `@` operation, profiles both with `cProfile`, and prints a side-by-side timing report with speedup factor.',
    checks: [
      {
        kind: 'mcq',
        id: 'python-7-mcq-1',
        prompt: 'What is the GIL and when does it matter most?',
        options: [
          'A CPython mutex that prevents multiple threads from executing Python bytecode simultaneously — it matters for CPU-bound multi-threaded code but not I/O-bound code.',
          'A lock that prevents multiple processes from running Python at once.',
          'A compiler optimisation that prevents code from running slower than expected.',
          'The GIL only existed in Python 2; Python 3 removed it.',
        ],
        correctIndex: 0,
        explanation:
          'The GIL serialises bytecode execution across threads, so CPU-bound threads do not actually run in parallel within one process. I/O-bound threads release the GIL while waiting for the kernel, so `threading` is fine for I/O concurrency. For CPU parallelism use `multiprocessing`, native extensions that release the GIL (NumPy, Cython `nogil`), or Python 3.13+ free-threaded builds (PEP 703).',
      },
      {
        kind: 'mcq',
        id: 'python-7-mcq-2',
        prompt:
          'Which approach is fastest for building a string of all integers 0..999?',
        options: [
          '`"".join(str(i) for i in range(1000))`',
          'Repeated `s += str(i)` in a `for` loop with `s = ""` start.',
          '`reduce(lambda a, b: a + str(b), range(1000), "")`',
          '`"".join([])` followed by 1000 calls to `s.replace`.',
        ],
        correctIndex: 0,
        explanation:
          '`str.join` over a generator is O(n) — it computes total length once and allocates a single output buffer. Repeated `+=` is O(n²) in the worst case because each concatenation may copy the entire prefix (though CPython has a special-case optimisation for the local variable, do not rely on it). `reduce` with `+` has the same quadratic risk.',
      },
      {
        kind: 'mcq',
        id: 'python-7-mcq-3',
        prompt:
          'What does the `dis` module help you analyse?\n```python\nimport dis\n\ndef double_plus_one(x: int) -> int:\n    return x * 2 + 1\n\nif __name__ == "__main__":\n    dis.dis(double_plus_one)\n```',
        options: [
          'The CPython bytecode instructions a function compiles to.',
          'How much memory the function allocates.',
          'How many times the function has been called.',
          'The runtime type of each variable.',
        ],
        correctIndex: 0,
        explanation:
          '`dis.dis(f)` prints the bytecode instructions (LOAD_FAST, BINARY_OP, RETURN_VALUE, ...) of a function. It is invaluable for understanding what the interpreter actually executes — e.g. comparing a list comprehension to an equivalent for-loop reveals very different instruction counts.',
      },
      {
        kind: 'mcq',
        id: 'python-7-mcq-4',
        prompt:
          'Which tool would you use to profile a Python web server in production WITHOUT restarting or modifying its code?',
        options: [
          'py-spy — it attaches to a running process by PID using sampling.',
          'cProfile — just add `python -m cProfile myserver.py` to the launch command.',
          'tracemalloc — it works in-process but requires no code changes.',
          'memory_profiler — its `@profile` decorator works without restarting.',
        ],
        correctIndex: 0,
        explanation:
          "py-spy is a sampling profiler implemented in Rust that reads the target process's memory without any code changes, restarts, or instrumentation overhead. cProfile must wrap the process launch. tracemalloc must be `start()`ed inside the process. `memory_profiler` requires decorators in the source.",
      },
      {
        kind: 'mcq',
        id: 'python-7-mcq-5',
        prompt:
          'For a CPU-bound numeric workload (matrix math, image processing), which approach gives the BEST parallel speedup?',
        options: [
          '`multiprocessing` or a vectorised library like NumPy that releases the GIL inside C.',
          '`threading.Thread` with many threads.',
          'Run the workload inside a single `async def` function with `await`.',
          'Wrap each iteration with `functools.lru_cache`.',
        ],
        correctIndex: 0,
        explanation:
          'CPU-bound Python is GIL-bound. `multiprocessing` sidesteps the GIL by spawning separate processes (each with its own interpreter). NumPy/SciPy/PyTorch release the GIL while running their C/Fortran kernels, so they parallelise inside a thread. `threading` and `asyncio` are designed for I/O concurrency, not CPU.',
      },
      {
        kind: 'mcq',
        id: 'python-7-mcq-6',
        prompt:
          'The nightly analytics ETL ballooned from 8 minutes to 42 minutes after a "small refactor". cProfile on a 1M-row slice:\n```\n$ python -m cProfile -s cumulative -o etl.prof jobs/etl/run.py\n$ python -c "import pstats; pstats.Stats(\'etl.prof\').sort_stats(\'cumulative\').print_stats(8)"\n         42_482_004 function calls in 38.221 seconds\n\n   Ordered by: cumulative time\n   ncalls  tottime   cumtime  filename:lineno(function)\n        1   0.012    38.221   jobs/etl/run.py:48(main)\n        1   0.420    34.180   jobs/etl/transform.py:22(transform_rows)\n  1000000   0.852     1.205   jobs/etl/query.py:14(_to_dict)\n  1000000   0.391     0.391   jobs/etl/query.py:18(<dictcomp>)\n  ...\n```\nThe hot function:\n```python\n# /jobs/etl/query.py\nfrom __future__ import annotations\n\nCOLUMNS: list[str] = ["id", "user_id", "amount_cents", "currency", "..."]  # 50 cols\n\n\ndef _to_dict(row: tuple) -> dict[str, object]:\n    """Pivot one DB row tuple into a dict keyed by column name."""\n    return {col: row[col] for col in COLUMNS}  # line 18\n```\nCalled 1M times per run. What\'s the highest-impact optimisation — and what is a common DISTRACTOR fix?',
        options: [
          'Call this function fewer times — process the data in batches with NumPy/pandas instead of row-by-row. The micro-optimisation `dict(zip(COLUMNS, row))` is marginal; the cure is to vectorise.',
          'Replace the dict comprehension with `for` loop and `dict.__setitem__`.',
          'Add `@lru_cache` to the function.',
          'Switch from `dict` to `OrderedDict`.',
        ],
        correctIndex: 0,
        explanation:
          'When a profile flags a function called millions of times, the dominant fix is usually to reduce the call count (vectorise) rather than shave nanoseconds off each call. `lru_cache` is wrong here — each `row` is unique. Profiling lesson #1: optimise call count and algorithmic complexity before micro-tuning the inner expression.',
      },
      {
        kind: 'mcq',
        id: 'python-7-mcq-7',
        prompt:
          'Memory grows ~50 MB/hr in production but not in dev — the worker pod is OOMKilled every 36 hours and PagerDuty pages every other night. After enabling `tracemalloc` and taking two snapshots 1 hour apart:\n```\n$ python -m diag.mem_diff snapshots/a.bin snapshots/b.bin\nTop 5 differences (by size):\n  /app/services/cache.py:23: size=1.4 GiB (+1.2 GiB), count=12000 (+10000), average=124 KiB\n  /app/services/cache.py:24: size=14 MiB (+12 MiB), count=12000 (+10000)\n  ...\n```\nThe cache module:\n```python\n# /app/services/cache.py\n"""Process-local memo for expensive S3 blobs."""\nfrom __future__ import annotations\n\n_CACHE: dict[str, bytes] = {}\n\n\ndef remember(key: str, blob: bytes) -> None:\n    """Store `blob` under `key` so subsequent requests skip S3."""\n    _CACHE[key] = blob          # line 23\n    _CACHE[f"{key}.meta"] = b"" # line 24\n\n\ndef recall(key: str) -> bytes | None:\n    return _CACHE.get(key)\n```\nWhat is the correct fix AND what is a common WRONG fix that wastes a sprint?',
        options: [
          'Bound the cache: replace `_CACHE: dict` with `functools.lru_cache` on a wrapping function, or use `cachetools.LRUCache(maxsize=...)`. An unbounded dict grows forever.',
          'Call `del _CACHE` periodically from another thread.',
          'Change `dict[str, bytes]` to `dict[str, bytearray]`.',
          'Run `gc.collect()` after every insert.',
        ],
        correctIndex: 0,
        explanation:
          'tracemalloc shows the growth is concentrated in one dict that has no eviction policy. Caches MUST have a bound (size, TTL, or both) in long-running processes; `gc.collect()` does nothing for objects still referenced by `_CACHE`. Use an LRU or TTL cache to bound the working set.',
      },
      {
        kind: 'mcq',
        id: 'python-7-mcq-8',
        prompt:
          'A data-science engineer reports: "I added threads to my hashing pipeline expecting a 16x speedup on this 16-core box. Wall-clock is IDENTICAL to single-threaded." `htop` during the run:\n```\nCPU0 [|||||||||||||||||||||||||||||  100%]\nCPU1 [                                  1%]\nCPU2 [                                  0%]\n... (CPU3-CPU15 all idle)\n```\nThe script:\n```python\n# /jobs/analytics/burn.py\n"""Compute a derived metric — should saturate every core."""\nfrom __future__ import annotations\nimport threading\n\n\ndef burn() -> None:\n    """Tight pure-Python CPU loop (no C-extension calls)."""\n    n = 0\n    for _ in range(50_000_000):\n        n += 1\n\n\nif __name__ == "__main__":\n    threads = [threading.Thread(target=burn) for _ in range(8)]\n    for t in threads:\n        t.start()\n    for t in threads:\n        t.join()\n```\nWhat is the diagnostic signature, the root cause, AND the actual fix?',
        options: [
          'Use `multiprocessing.Process` (or `concurrent.futures.ProcessPoolExecutor`). The GIL serialises Python bytecode across threads in one interpreter; only separate processes truly parallelise pure-Python CPU work.',
          'Replace `range(50_000_000)` with `range(50_000_000, 1)` for a fast path.',
          'Add `daemon=True` to each Thread.',
          'Call `gc.disable()` before the loop.',
        ],
        correctIndex: 0,
        explanation:
          'The single-core-pegged signature is the GIL diagnostic. Threads share one interpreter, and only one holds the GIL at a time for pure-Python bytecode. `multiprocessing` spawns separate interpreters, each on its own core. Workloads that release the GIL (NumPy, hashlib, zlib, file I/O) bypass this and DO speed up under threads.',
      },
      {
        kind: 'mcq',
        id: 'python-7-mcq-9',
        prompt: 'What is the time complexity of `list.append(x)` in CPython?',
        options: [
          'O(1) amortised — the list reallocates with geometric growth on overflow.',
          'O(n) — Python copies the entire list each append.',
          'O(log n) — Python uses a balanced tree.',
          'O(n²) — Python sorts after each append.',
        ],
        correctIndex: 0,
        explanation:
          'CPython lists are dynamic arrays with geometric over-allocation (~1.125x growth). Most appends just write to a pre-allocated slot in O(1); occasional reallocations copy O(n) elements, but the amortised cost per append is still O(1). This is why `list` is preferred over `collections.deque` unless you also need O(1) `popleft`.',
      },
      {
        kind: 'code',
        id: 'python-7-code-1',
        prompt: 'Optimise string construction: modify the `build_string` function to construct a string containing the string representation of all numbers from `0` to `n-1` joined by commas, using the efficient `\',\'.join()` method with a generator expression.',
        boilerplate: 'def build_string(n: int) -> str:\n    # Use \',\'.join() to join stringified numbers\n    return "".join(str(i) for i in range(n))\n\nif __name__ == "__main__":\n    build_string(5)\n',
        expectedOutput: '0,1,2,3,4',
        explanation: 'Using `\',\'.join(...)` is much more efficient than using `+=` inside a loop because it calculates the total size of the final string and makes a single allocation, whereas `+=` triggers multiple copies and allocations.'
      }
    ],
  },

  // ─── Level 8 ─────────────────────────────────────────────────────────────
  {
    id: 'python-8',
    language: 'python',
    level: 8,
    title: 'Production Web: FastAPI Advanced and SQLModel/SQLAlchemy 2',
    timeEstimate: '18-26 hours',
    intro:
      "By the end of this phase, you'll read FastAPI route handlers, Pydantic models, and SQLAlchemy 2 async sessions and predict the request/response flow. You'll know why a 422 means validation failed and how `Depends` resolution becomes a dependency cycle. To build the muscle, you'll write a `bookmarks.py` FastAPI service locally with async SQLModel and integration tests — writing is how reading sticks.",
    topics: [
      {
        label: 'FastAPI — Advanced Dependencies',
        url: 'https://fastapi.tiangolo.com/tutorial/dependencies/',
        note: 'Depends(), sub-dependencies, classes as dependencies, lifespan',
      },
      {
        label: 'FastAPI — Middleware',
        url: 'https://fastapi.tiangolo.com/tutorial/middleware/',
        note: 'BaseHTTPMiddleware, CORS, GZip, TrustedHost middleware',
      },
      {
        label: 'FastAPI — Background Tasks',
        url: 'https://fastapi.tiangolo.com/tutorial/background-tasks/',
        note: 'BackgroundTasks, starlette task limitations, Celery/ARQ alternatives',
      },
      {
        label: 'SQLModel — Define Models',
        url: 'https://sqlmodel.tiangolo.com/tutorial/create-db-and-table/',
        note: 'SQLModel class, Field(), table=True, relationships',
      },
      {
        label: 'SQLAlchemy 2 — Async ORM',
        url: 'https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html',
        note: 'AsyncSession, async_sessionmaker, select(), scalars()',
      },
      {
        label: 'Uvicorn — ASGI Server',
        url: 'https://www.uvicorn.org/',
        note: 'uvicorn.run(), --workers, --reload, config, logging',
      },
    ],
    deliverable:
      'Build locally: a FastAPI service `bookmarks.py` exposing `/add`, `/list`, `/delete` endpoints, SQLite-backed via SQLModel with async sessions, plus integration tests using `httpx.AsyncClient` and `pytest-asyncio`.',
    checks: [
      {
        kind: 'mcq',
        id: 'python-8-mcq-1',
        prompt: 'In FastAPI, what is the `Depends()` mechanism used for?',
        options: [
          'Dependency injection — declare shared logic (DB sessions, auth, config) once and have FastAPI resolve and inject it into route functions.',
          'Importing external packages at runtime.',
          'Declaring async background jobs that run after the response is sent.',
          'Middleware that runs before every request.',
        ],
        correctIndex: 0,
        explanation:
          "`Depends()` is FastAPI's dependency injection system. You declare a function (or class `__init__`) as a dependency, and FastAPI automatically calls it and injects the result. Dependencies can themselves depend on other dependencies, enabling clean composition of DB sessions, authentication, rate limiting, etc.",
      },
      {
        kind: 'mcq',
        id: 'python-8-mcq-2',
        prompt:
          'What does this program print?\n```python\nfrom pydantic import BaseModel, Field\n\nclass Task(BaseModel):\n    id: int\n    title: str = Field(min_length=1)\n    done: bool = False\n\nif __name__ == "__main__":\n    t = Task(id=1, title="Buy milk")\n    print(t.model_dump_json())\n```',
        options: [
          '`{"id":1,"title":"Buy milk","done":false}`',
          '`{"id": 1, "title": "Buy milk", "done": False}`',
          '`Task(id=1, title=\'Buy milk\', done=False)`',
          'ValidationError: done is required',
        ],
        correctIndex: 0,
        explanation:
          '`model_dump_json()` (Pydantic v2) serialises to JSON. JSON uses lowercase `false` (not Python `False`) and double quotes. Output has no extra whitespace by default. `done` has a default value `False`, so it is not required at construction. Pydantic v1\'s `.json()` is now deprecated in favour of `model_dump_json()`.',
      },
      {
        kind: 'mcq',
        id: 'python-8-mcq-3',
        prompt:
          'What does this program print?\n```python\nimport asyncio\n\nasync def fetch_one(url: str) -> str:\n    return f"fetched:{url}"\n\nasync def fetch_all(urls: list[str]) -> list[str]:\n    return await asyncio.gather(*(fetch_one(u) for u in urls))\n\nif __name__ == "__main__":\n    print(asyncio.run(fetch_all(["https://a.com", "https://b.com"])))\n```',
        options: [
          "`['fetched:https://a.com', 'fetched:https://b.com']`",
          "`['https://a.com', 'https://b.com']`",
          "`'fetched:https://a.com fetched:https://b.com'`",
          'A coroutine object that is never awaited.',
        ],
        correctIndex: 0,
        explanation:
          '`asyncio.gather` returns a list of results in input order. Each `fetch_one(u)` returns the string `"fetched:" + u`. `asyncio.run` is the canonical top-level driver — it creates a new event loop, runs the coroutine to completion, and closes the loop. You typically only call it once per program.',
      },
      {
        kind: 'mcq',
        id: 'python-8-mcq-4',
        prompt: 'What is the FastAPI `lifespan` parameter used for?',
        options: [
          'Running startup/shutdown code (DB connections, model loading) in an async context manager tied to the application lifecycle.',
          'Setting the maximum request timeout.',
          'Configuring how long responses are cached.',
          "Defining the application's API version deprecation period.",
        ],
        correctIndex: 0,
        explanation:
          '`lifespan` replaces the deprecated `on_startup`/`on_shutdown` event hooks. You pass an async context manager: code before `yield` runs at startup, code after `yield` runs at shutdown. This is the idiomatic way to manage resources (DB pools, caches, ML models) that should live for the full application lifetime.',
      },
      {
        kind: 'mcq',
        id: 'python-8-mcq-5',
        prompt:
          'Why does SQLAlchemy 2 / SQLModel require `await session.commit()` instead of plain `session.commit()` in async code?',
        options: [
          'The async engine performs the commit on the underlying DB driver via `await`, allowing the event loop to run other tasks during the I/O.',
          'It is purely a syntactic choice — both work identically.',
          'Async commits prevent SQL injection.',
          'Sync `.commit()` is forbidden in FastAPI for security reasons.',
        ],
        correctIndex: 0,
        explanation:
          'A DB commit involves disk I/O (or network I/O for remote DBs). The async API yields the event loop during that wait, letting other coroutines (other HTTP requests) make progress. Mixing sync `Session` with FastAPI works but blocks the event loop, eliminating the concurrency benefit.',
      },
      {
        kind: 'mcq',
        id: 'python-8-mcq-6',
        prompt:
          'Which HTTP status code is the most appropriate for a successful `POST /tasks` that creates a new resource?',
        options: [
          '`201 Created` (and a `Location` header pointing at the new resource).',
          '`200 OK`',
          '`204 No Content`',
          '`202 Accepted`',
        ],
        correctIndex: 0,
        explanation:
          'RFC 9110 specifies `201 Created` for successful resource creation, ideally with a `Location` header and the new resource representation in the body. `200 OK` is fine for in-place updates. `204 No Content` is for successful requests that return no body (e.g. DELETE). `202 Accepted` is for async work that has been queued but not yet completed.',
      },
      {
        kind: 'mcq',
        id: 'python-8-mcq-7',
        prompt:
          'A mobile-team engineer pings: "POST /api/tasks is giving us a 422 we don\'t understand — Sentry shows 1.8K of these in the last hour from the iOS app." The response body:\n```json\nHTTP/1.1 422 Unprocessable Entity\ncontent-type: application/json\n\n{\n  "detail": [\n    {\n      "type": "missing",\n      "loc": ["body", "title"],\n      "msg": "Field required",\n      "input": {"description": "buy milk"}\n    }\n  ]\n}\n```\nThe route + model on the server side:\n```python\n# /services/tasks/api.py\nfrom __future__ import annotations\nfrom fastapi import APIRouter, status\nfrom pydantic import BaseModel\n\nrouter = APIRouter(prefix="/api/tasks")\n\n\nclass TaskCreate(BaseModel):\n    title: str\n    description: str | None = None\n\n\nclass TaskOut(BaseModel):\n    id: int\n    title: str\n    description: str | None\n\n\n@router.post("", status_code=status.HTTP_201_CREATED, response_model=TaskOut)\nasync def create_task(payload: TaskCreate) -> TaskOut:\n    """Create a task. `title` required, `description` optional."""\n    return TaskOut(id=1, title=payload.title, description=payload.description)\n```\nWhat does the 422 mean AND what should the mobile client do?',
        options: [
          'The request body is missing the required `title` field. Pydantic validation rejected it before the route function ran. The client must send `{"title": "...", "description": "..."}`.',
          'The server hit a database error. The client should retry.',
          'The Pydantic model is broken. The server team must redeploy.',
          'The client used the wrong HTTP method. Try GET instead of POST.',
        ],
        correctIndex: 0,
        explanation:
          'FastAPI returns 422 (Unprocessable Entity) when Pydantic validation fails. The `detail` array tells you which fields and what kind of error. `loc: ["body", "title"]` means the missing field is in the JSON body, at key `title`. The client (or whoever wrote the request) must supply it. 422 is for malformed requests; 4xx tells the client to fix the request rather than retry.',
      },
      {
        kind: 'mcq',
        id: 'python-8-mcq-8',
        prompt:
          'A FastAPI service crashes during gunicorn boot — every replica enters a CrashLoopBackOff:\n```\n$ kubectl logs -n prod orders-api-7f9c -p\n[2026-05-24T07:02:01Z] INFO  gunicorn.error: starting gunicorn 22.0.0\n[2026-05-24T07:02:01Z] INFO  uvicorn: started server process [12]\n[2026-05-24T07:02:01Z] ERROR Traceback (most recent call last):\n  File "/app/api/main.py", line 7, in <module>\n    from app.api.deps import get_db\n  File "/app/api/deps.py", line 14, in <module>\n    def get_db(session = Depends(get_db)):\nRecursionError: maximum recursion depth exceeded\n```\nThe (broken) deps module:\n```python\n# /app/api/deps.py\n"""Shared FastAPI dependencies (DB session, current user, ...)."""\nfrom __future__ import annotations\nfrom fastapi import Depends\nfrom app.db.engine import AsyncSession\n\n\n# Intent: every route does `session: AsyncSession = Depends(get_db)`\ndef get_db(session: AsyncSession = Depends(get_db)) -> AsyncSession:\n    return session\n```\nWhy does FastAPI/Python explode here AND what is the proper provider pattern?',
        options: [
          'A dependency cannot depend on itself — that creates an infinite resolution cycle. Inject the underlying session-maker instead: `def get_db(maker = Depends(get_sessionmaker)): yield maker()`.',
          'Add `@functools.lru_cache` to `get_db`.',
          'Move `from fastapi import Depends` to the bottom of the file.',
          'Rename `get_db` to `_get_db`.',
        ],
        correctIndex: 0,
        explanation:
          "FastAPI resolves `Depends(get_db)` by calling `get_db(...)` — which itself depends on `get_db`, and so on. The fix is to break the cycle by depending on a different, more primitive provider (a session factory, an engine, or config). This is the same kind of cycle you'd hit with manual dependency injection.",
      },
      {
        kind: 'mcq',
        id: 'python-8-mcq-9',
        prompt:
          'A new GET endpoint returns 500 for every call after deploy. Client sees:\n```\nHTTP/1.1 500 Internal Server Error\n{"detail": "Internal Server Error"}\n```\nServer log:\n```\n[2026-05-24T13:08:11Z] ERROR uvicorn.error: Exception in ASGI application\nTraceback (most recent call last):\n  File "/app/api/items.py", line 21, in read_item\n    item = session.get(Item, id)\n  File "/usr/local/lib/python3.12/site-packages/sqlalchemy/orm/session.py", line 3403, in get\n    ...\nsqlalchemy.exc.MissingGreenlet: greenlet_spawn has not been called; can\'t call await_only() here. Was IO attempted in an unexpected place? (Background on this error at: https://sqlalche.me/e/20/xd2s)\n```\nThe handler + deps:\n```python\n# /app/api/items.py\nfrom __future__ import annotations\nfrom fastapi import APIRouter, Depends\nfrom sqlalchemy.ext.asyncio import AsyncSession\nfrom app.api.deps import get_session  # yields an AsyncSession\nfrom app.models import Item\n\nrouter = APIRouter(prefix="/items")\n\n\n@router.get("/{id}")\ndef read_item(id: int, session: AsyncSession = Depends(get_session)) -> Item | None:\n    """Look up a single item by id."""\n    item = session.get(Item, id)  # line 21\n    return item\n```\nWhich line is the bug AND what are the two possible fixes?',
        options: [
          '`def read_item` is a sync function but `get_session` returns an `AsyncSession`. Either make the route `async def` and `await session.get(...)`, or use a sync session.',
          'Replace `session.get(Item, id)` with `session.fetch(Item, id)`.',
          'Add `await` before `Depends(get_session)`.',
          'Pin SQLAlchemy to version 1.4.',
        ],
        correctIndex: 0,
        explanation:
          "The `MissingGreenlet` exception is SQLAlchemy's signal that you used an `AsyncSession` from a sync context (or vice versa). FastAPI runs sync routes in a thread pool, but `AsyncSession`'s coroutines can only be awaited from a running event loop. Pick one mode and stick with it consistently across the request path.",
      },
      {
        kind: 'code',
        id: 'python-8-code-1',
        prompt: 'Define a Pydantic model named `Item` with `id` (int), `name` (str), and `price` (float, default 0.0) fields. Modify the `parse_item` function to correctly instantiate the `Item` model using dict unpacking.',
        boilerplate: 'from pydantic import BaseModel\n\n# Define a Pydantic model named Item with id (int), name (str), and price (float, default 0.0)\nclass Item(BaseModel):\n    id: int\n    name: str\n    price: float = 0.0\n\ndef parse_item(data: dict) -> Item:\n    # Use dict unpacking to instantiate the Item model\n    return Item(data)\n\nif __name__ == "__main__":\n    item = parse_item({"id": 101, "name": "Laptop"})\n',
        expectedOutput: 'Laptop: 0.0',
        explanation: 'Pydantic models inherit from `BaseModel`. You can instantiate them using keyword arguments, or by unpacking a dictionary with the `**` operator.'
      }
    ],
  },

  // ─── Level 9 ─────────────────────────────────────────────────────────────
  {
    id: 'python-9',
    language: 'python',
    level: 9,
    title: 'Observability, Advanced Testing, and Property-Based Testing',
    timeEstimate: '20-28 hours',
    intro:
      "By the end of this phase, you'll read OpenTelemetry instrumentation, structured logs, and Hypothesis property tests and predict which inputs shrink to the minimal failing case. You'll know what trace-log correlation looks like in a real incident. To build the muscle, you'll write an `observable_api.py` locally that instruments the Level 8 service with OpenTelemetry and a Hypothesis test suite — writing is how reading sticks.",
    topics: [
      {
        label: 'OpenTelemetry Python — Getting Started',
        url: 'https://opentelemetry-python.readthedocs.io/en/latest/getting-started.html',
        note: 'Tracer, Span, Meter, instrumentation libraries, exporters',
      },
      {
        label: 'Python logging — Structured logging',
        url: 'https://docs.python.org/3/library/logging.html',
        note: 'Logger hierarchy, Handlers, Formatters, json-log-formatter pattern',
      },
      {
        label: 'Hypothesis — Property-Based Testing',
        url: 'https://hypothesis.readthedocs.io/en/latest/quickstart.html',
        note: '@given, strategies (integers, text, lists), assume(), settings()',
      },
      {
        label: 'pytest — Advanced Fixtures',
        url: 'https://docs.pytest.org/en/stable/reference/fixtures.html',
        note: 'Scope (function/class/module/session), yield fixtures, conftest.py',
      },
      {
        label: 'pytest-cov — Coverage for pytest',
        url: 'https://pytest-cov.readthedocs.io/en/latest/',
        note: '--cov, --cov-report, branch coverage, coverage thresholds',
      },
    ],
    deliverable:
      'Build locally: `observable_api.py` — extend the Level 8 bookmarks service with OpenTelemetry tracing, structured JSON logging that correlates with trace IDs, and a Hypothesis test suite covering 4+ invariants. Target 90%+ branch coverage via `pytest --cov`.',
    checks: [
      {
        kind: 'mcq',
        id: 'python-9-mcq-1',
        prompt:
          'In Hypothesis, what does `@given(st.lists(st.integers()))` mean on a test function?',
        options: [
          'Hypothesis automatically generates many different lists of integers and runs the test body with each, looking for inputs that cause a failure.',
          'The test receives one fixed example list defined in the decorator.',
          'The test will only run once with an empty list.',
          'Hypothesis replays previously failing examples only.',
        ],
        correctIndex: 0,
        explanation:
          'Hypothesis generates up to `max_examples` (default 100) random inputs satisfying the strategy, including edge cases like empty lists, very large integers, and negative numbers. If any input fails, Hypothesis SHRINKS it to the smallest failing example and reports it — typically reducing a 50-element list to 2 elements that still trigger the bug.',
      },
      {
        kind: 'mcq',
        id: 'python-9-mcq-2',
        prompt:
          'What does this program print?\n```python\ndef stats(numbers: list[float]) -> dict[str, float]:\n    if not numbers:\n        raise ValueError("empty input")\n    return {\n        "mean": sum(numbers) / len(numbers),\n        "min": min(numbers),\n        "max": max(numbers),\n    }\n\nif __name__ == "__main__":\n    r = stats([1.0, 2.0, 3.0])\n    print(r["mean"], r["min"], r["max"])\n```',
        options: [
          '`2.0 1.0 3.0`',
          '`2 1 3`',
          '`6.0 1.0 3.0`',
          'ValueError: empty input',
        ],
        correctIndex: 0,
        explanation:
          '`sum([1.0, 2.0, 3.0]) == 6.0`; divided by `len == 3` gives `2.0`. `min` and `max` return the smallest/largest values as floats. Since input was non-empty, the `ValueError` branch was not taken. `dict` access syntax `r["mean"]` works because `stats` returned a dict.',
      },
      {
        kind: 'mcq',
        id: 'python-9-mcq-3',
        prompt:
          'In OpenTelemetry, what is the difference between a Trace, a Span, and a Meter?',
        options: [
          'A Trace is a collection of Spans representing one end-to-end request; a Span is a single timed operation within a trace; a Meter records numeric measurements for metrics.',
          'A Trace is a single database query; a Span is a whole HTTP request; a Meter is a synonym for Span.',
          'Spans and Traces are for logging; Meters are for tracing.',
          'A Trace is a metric; a Span is a log line; a Meter is a trace.',
        ],
        correctIndex: 0,
        explanation:
          'OpenTelemetry separates three signals: Traces (distributed request flows made of Spans connected by trace IDs and parent-span IDs), Metrics (numeric measurements via Meters and Instruments like Counter/Histogram), and Logs. A Span has a start time, end time, attributes, events, and links to other spans.',
      },
      {
        kind: 'mcq',
        id: 'python-9-mcq-4',
        prompt:
          'What is the default ROOT logger level in Python\'s `logging` module if you call `logging.info("hi")` BEFORE any configuration?',
        options: [
          '`WARNING` — INFO messages are suppressed by default.',
          '`DEBUG` — every message prints.',
          '`INFO` — INFO and above print.',
          '`CRITICAL` — only critical errors print.',
        ],
        correctIndex: 0,
        explanation:
          'The root logger defaults to `WARNING`, so `logging.info(...)` and `logging.debug(...)` are silently dropped until you call `logging.basicConfig(level=logging.INFO)` or configure a handler explicitly. This is a frequent surprise for newcomers wondering why their `print`-replacement logs do not appear.',
      },
      {
        kind: 'mcq',
        id: 'python-9-mcq-5',
        prompt:
          'Which pytest fixture scope ensures the fixture is created ONCE per test module and shared across all tests in that module?',
        options: [
          '`@pytest.fixture(scope="module")`',
          '`@pytest.fixture(scope="function")`',
          '`@pytest.fixture(scope="session")`',
          '`@pytest.fixture(scope="package")`',
        ],
        correctIndex: 0,
        explanation:
          '`scope="module"` constructs the fixture once when the first test in the module needs it and tears it down after the last test in that module. `function` (default) creates a fresh fixture per test. `session` shares one fixture for the whole pytest invocation. `package` shares within a single package directory.',
      },
      {
        kind: 'mcq',
        id: 'python-9-mcq-6',
        prompt:
          'What is the BEST way to correlate a log line with the OpenTelemetry trace that produced it?',
        options: [
          'Include the current `trace_id` and `span_id` as fields in the structured log record (often via a logging processor that reads `trace.get_current_span()`).',
          'Use `print(span)` inside every function.',
          'Trace and log timestamps will be close enough for grep.',
          'Replace logging with `OpenTelemetry.log`, which is the only supported approach.',
        ],
        correctIndex: 0,
        explanation:
          'Trace-log correlation works by injecting the active `trace_id`/`span_id` into log records, so log aggregators (Datadog, Honeycomb, Loki) can pivot from a log line to the originating trace. The OpenTelemetry `logging` instrumentation does this automatically, or you can write a `logging.Filter` that reads `trace.get_current_span().get_span_context()`.',
      },
      {
        kind: 'mcq',
        id: 'python-9-mcq-7',
        prompt:
          'A Hypothesis property test you wrote last week is finally failing on the strict CI run (max_examples=5000):\n```\n$ pytest tests/property/test_token_codec.py -q\nFalsifying example: test_round_trip(\n    s=\'\\x00\',\n)\nE  AssertionError: assert decode(encode(s)) == s\nE   +  where None = decode(...)\n\ntests/property/test_token_codec.py:11: AssertionError\n```\nThe utility under test (used to encode share-link tokens):\n```python\n# /app/security/token_codec.py\n"""Base64 codec for opaque share-link tokens.\n\nDocs claim: "round-trips any user string".\n"""\nfrom __future__ import annotations\nimport base64\n\n\ndef encode(s: str) -> str:\n    return base64.b64encode(s.encode("ascii")).decode("ascii")\n\n\ndef decode(s: str) -> str:\n    return base64.b64decode(s).decode("ascii")\n```\nThe test:\n```python\n# /tests/property/test_token_codec.py\nfrom hypothesis import given, strategies as st\nfrom app.security.token_codec import encode, decode\n\n\n@given(s=st.text())\ndef test_round_trip(s: str) -> None:\n    assert decode(encode(s)) == s\n```\nWhat does the `\\x00` shrunk example tell you AND what is the correct fix (not "delete the test")?',
        options: [
          'The code assumes ASCII-only input. `\\x00` (NUL byte) round-trips through base64, but non-ASCII input would crash `s.encode("ascii")`. Add input validation or use `"utf-8"` everywhere.',
          'Hypothesis is buggy — it should not generate `\\x00`.',
          'base64 cannot encode any control characters; this is unfixable.',
          '`b64encode` requires bytes input; this code is fine.',
          'The test should be deleted because edge cases are unrealistic.',
        ],
        correctIndex: 0,
        explanation:
          'Hypothesis shrinking is a feature, not a bug — it tells you the smallest input that breaks the assumption. The `\\x00` case actually does round-trip in base64; what it usually exposes is that you have a stricter contract than you realised (ASCII-only). The fix is to either declare and enforce the input contract or broaden the implementation to handle UTF-8.',
      },
      {
        kind: 'mcq',
        id: 'python-9-mcq-8',
        prompt:
          'CI runners keep filling up `/tmp` and failing later jobs with `No space left on device`. The test suite uses a per-test temp DB fixture:\n```\n$ df -h /tmp\nFilesystem      Size  Used Avail Use% Mounted on\ntmpfs           2.0G  2.0G     0 100% /tmp\n\n$ ls /tmp/tmp* | wc -l\n8421\n```\nThe fixture (no failures in the tests themselves — they all pass):\n```python\n# /tests/integration/conftest.py\n"""Shared fixtures for the integration suite."""\nfrom __future__ import annotations\nimport os\nimport tempfile\nimport pytest\n\n\n@pytest.fixture(scope="function")\ndef temp_db() -> str:\n    """Create a temp file to back a per-test sqlite DB, clean up after."""\n    f = tempfile.NamedTemporaryFile(delete=False, suffix=".sqlite")\n    return f.name\n    # cleanup\n    os.unlink(f.name)\n```\nWhich line is the bug AND what is the idiomatic pytest fix?',
        options: [
          'Code after `return` never runs. Use `yield` for fixture teardown: `yield f.name` then `os.unlink(f.name)` after.',
          'Add `del f` after the return.',
          'Change `scope="function"` to `scope="session"`.',
          'Replace `tempfile.NamedTemporaryFile` with `tempfile.mktemp`.',
        ],
        correctIndex: 0,
        explanation:
          'pytest fixtures separate setup from teardown via `yield`. Code before `yield` is setup; the yielded value is what the test receives; code AFTER `yield` is teardown. `return` exits the fixture immediately — anything below is dead code. Always use `yield` when a fixture needs cleanup.',
      },
      {
        kind: 'mcq',
        id: 'python-9-mcq-9',
        prompt:
          'Datadog shows your service\'s logs as un-parsed text instead of structured JSON — the search bar can find them by substring but `@user_id:42` filters return nothing. A dev claims "but JSON prints correctly to the terminal in dev." Container stdout in prod:\n```\n2026-05-24T15:01:12Z app: user logged in\n2026-05-24T15:01:13Z app: order 88241 created\n```\nThe logging setup:\n```python\n# /app/observability/logging_setup.py\n"""Process-wide logging config. Imported from app.main on boot."""\nfrom __future__ import annotations\nimport json\nimport logging\nfrom typing import Any\n\n\nclass JsonFormatter(logging.Formatter):\n    """Emit each record as a single-line JSON object Datadog can parse."""\n\n    def format(self, record: logging.LogRecord) -> str:\n        payload: dict[str, Any] = {\n            "level": record.levelname,\n            "msg": record.getMessage(),\n            "logger": record.name,\n        }\n        return json.dumps(payload)\n\n\ndef configure_logging() -> None:\n    log = logging.getLogger("app")\n    log.setLevel(logging.INFO)\n    log.addHandler(logging.StreamHandler())\n```\nWhich line is the bug AND the 1-line fix?',
        options: [
          'The handler has no formatter set. Add `handler.setFormatter(JsonFormatter())` before `addHandler`. Without it, the handler uses the default text formatter and your JSON formatter never runs.',
          '`json.dumps` cannot handle `record.args`.',
          'Replace `StreamHandler` with `FileHandler`.',
          'Datadog only parses YAML — switch the format.',
        ],
        correctIndex: 0,
        explanation:
          'A `Formatter` only takes effect when attached to a Handler via `handler.setFormatter(...)`. Forgetting that step is one of the most common Python logging mistakes — the formatter class is correct, but the handler still uses the default plain-text formatter. Set the formatter on the handler BEFORE adding the handler to the logger.',
      },
      {
        kind: 'code',
        id: 'python-9-code-1',
        prompt: 'Create a generator context manager using `@contextmanager` named `resource` that prints `"setup"`, yields the string `"data"`, and ensures `"teardown"` is printed on exit using a `try`/`finally` block.',
        boilerplate: 'from contextlib import contextmanager\n\n@contextmanager\ndef resource():\n    print("setup")\n    # Yield "data" and ensure "teardown" is printed even on error\n    try:\n        pass\n    finally:\n        print("teardown")\n\nif __name__ == "__main__":\n    with resource() as r:\n        print(r)\n',
        expectedOutput: 'setup\ndata\nteardown',
        explanation: 'Using the `@contextmanager` decorator, a generator can be used as a context manager. The code before the `yield` runs on entry, and the code after `yield` runs on exit. A `try/finally` block ensures that cleanup code runs even if exceptions are raised.'
      }
    ],
  },

  // ─── Level 10 ────────────────────────────────────────────────────────────
  {
    id: 'python-10',
    language: 'python',
    level: 10,
    title: 'Extending Python: Cython, PyO3, Packaging, and Wheels',
    timeEstimate: '22-32 hours',
    intro:
      "By the end of this phase, you'll read Cython `.pyx` files, PyO3 Rust modules, and `pyproject.toml` build configs and predict whether a wheel will build cleanly on Linux, macOS, and Windows. You'll know what manylinux solves and what a PyO3 panic looks like. To build the muscle, you'll write a `fastcount` extension locally (Cython OR PyO3) packaged with a working `pyproject.toml` — writing is how reading sticks.",
    topics: [
      {
        label: 'Cython — Getting Started',
        url: 'https://cython.readthedocs.io/en/latest/src/quickstart/overview.html',
        note: '.pyx files, cdef, cpdef, cython types, building with setup.py / Cython.Build',
      },
      {
        label: 'PyO3 — Rust extensions for Python',
        url: 'https://pyo3.rs/latest/',
        note: '#[pyfunction], #[pymodule], maturin develop/build, GIL handle',
      },
      {
        label: 'pyproject.toml — Python Packaging Guide',
        url: 'https://packaging.python.org/en/latest/guides/writing-pyproject-toml/',
        note: '[project], [build-system], optional-dependencies, entry-points',
      },
      {
        label: 'uv — An extremely fast Python package manager',
        url: 'https://docs.astral.sh/uv/',
        note: 'uv venv, uv add, uv build, uv publish — Rust-based pip/venv replacement',
      },
      {
        label: 'manylinux — Building portable Linux wheels',
        url: 'https://github.com/pypa/manylinux',
        note: 'manylinux2014/manylinux_2_28 Docker images, cibuildwheel integration',
      },
      {
        label: 'hatch — Modern Python build backend',
        url: 'https://hatch.pypa.io/latest/',
        note: 'hatch new, hatch build, hatch publish, environments, versioning',
      },
    ],
    deliverable:
      'Build locally: a `fastcount` extension (Cython OR PyO3) that exposes `count_words(text: str) -> dict[str, int]` to Python, packaged with `pyproject.toml`. Benchmark it against a pure-Python baseline and include the build instructions in a README.',
    checks: [
      {
        kind: 'mcq',
        id: 'python-10-mcq-1',
        prompt:
          'What does declaring a variable with `cdef int x` in a Cython .pyx file do?',
        options: [
          "It declares x as a C int at compile time, bypassing Python's PyObject overhead for that variable.",
          'It declares a Python-accessible class attribute.',
          'It is equivalent to a Python type annotation and has no runtime effect.',
          'It prevents the variable from being used in Python (only accessible from C code).',
        ],
        correctIndex: 0,
        explanation:
          "`cdef int x` tells Cython to allocate a native C int rather than a Python int object. Arithmetic on cdef variables compiles to direct C operations without Python's boxing/unboxing overhead, often yielding 10-100x speedups in tight loops. `cdef` declarations are NOT accessible from Python by default — use `cpdef` if you want both.",
      },
      {
        kind: 'mcq',
        id: 'python-10-mcq-2',
        prompt:
          'What does this program print?\n```python\nimport tomllib\n\nTOML = """\n[project]\nname = "mylib"\nversion = "0.1.0"\n"""\n\nif __name__ == "__main__":\n    data = tomllib.loads(TOML)\n    print(data["project"]["name"], data["project"]["version"])\n```',
        options: [
          '`mylib 0.1.0`',
          '`mylib"" 0.1.0""`',
          'ModuleNotFoundError: tomllib',
          'KeyError: project',
        ],
        correctIndex: 0,
        explanation:
          '`tomllib` is the stdlib TOML parser added in Python 3.11 (PEP 680). `tomllib.loads` parses a TOML string into a dict-of-dicts; `tomllib.load` reads from a binary file. The TOML strings `"mylib"` parse as plain Python strings without quotes. For writing TOML you still need a third-party library like `tomli-w` or `tomlkit`.',
      },
      {
        kind: 'mcq',
        id: 'python-10-mcq-3',
        prompt:
          'What does this program print?\n```python\nfrom collections import Counter\n\ndef count_words(text: str) -> dict[str, int]:\n    return dict(Counter(text.lower().split()))\n\nif __name__ == "__main__":\n    print(count_words("Hello hello WORLD"))\n```',
        options: [
          "`{'hello': 2, 'world': 1}`",
          "`{'Hello': 1, 'hello': 1, 'WORLD': 1}`",
          "`{'hello': 1, 'world': 1}`",
          'TypeError: Counter is not callable',
        ],
        correctIndex: 0,
        explanation:
          '`.lower()` normalises to `"hello hello world"`, `.split()` splits on whitespace to `["hello", "hello", "world"]`, `Counter` tallies frequencies, and `dict()` converts the Counter (a dict subclass) to a plain dict for the return type. Note that `Counter` and `dict()` are both callable — option 4 is a distractor.',
      },
      {
        kind: 'mcq',
        id: 'python-10-mcq-4',
        prompt:
          'When building a Python extension wheel targeting Linux, what problem does manylinux solve?',
        options: [
          'It provides Docker images that build against an old enough glibc so the resulting wheel runs on many Linux distributions, not just the one it was built on.',
          'It packages the wheel as a Docker image for deployment.',
          'It is a Python package manager that replaces pip on Linux.',
          'It compiles Python to native machine code for Linux only.',
        ],
        correctIndex: 0,
        explanation:
          "A wheel compiled on Ubuntu 24.04 links against a recent glibc and won't run on older distros. manylinux Docker images (e.g. `manylinux_2_28`) link against a guaranteed-old glibc so the wheel runs on any reasonably modern Linux. `cibuildwheel` automates running these images in CI for matrix builds.",
      },
      {
        kind: 'mcq',
        id: 'python-10-mcq-5',
        prompt:
          'Which section of `pyproject.toml` declares the BUILD-time dependencies (e.g. Cython, setuptools) needed before the package can be installed?',
        options: [
          '`[build-system]` with `requires = [...]` and `build-backend = "..."`.',
          '`[project.dependencies]`',
          '`[tool.poetry.dependencies]`',
          '`[project.optional-dependencies]`',
        ],
        correctIndex: 0,
        explanation:
          'PEP 518 defined `[build-system]` so installers (pip, uv) know which packages to install in an isolated build env BEFORE invoking the build backend. `[project.dependencies]` are RUNTIME deps. The Poetry-specific table is non-standard. `optional-dependencies` are extras like `mylib[dev]` that callers opt into.',
      },
      {
        kind: 'mcq',
        id: 'python-10-mcq-6',
        prompt:
          'For a PyO3 Rust extension, which tool is the standard way to build and install the extension into the current virtualenv during development?',
        options: [
          '`maturin develop`',
          '`cargo build --release`',
          '`pip install rust`',
          '`python setup.py build_rust`',
        ],
        correctIndex: 0,
        explanation:
          '`maturin develop` (from the maturin tool) compiles the Rust crate with Cargo and installs the resulting `.so`/`.pyd` into the active venv as an editable install — the Rust equivalent of `pip install -e .`. `maturin build` produces a wheel for distribution. Plain `cargo build` does not install anything for Python to import.',
      },
      {
        kind: 'mcq',
        id: 'python-10-mcq-7',
        prompt:
          'A new contributor opens an issue: "Following the README, `pip install -e .` fails immediately on macOS and on a fresh Ubuntu 24.04 box."\n```\n$ pip install -e .\nProcessing /home/dev/fastcount\n  Installing build dependencies ... done\n  Getting requirements to build editable ... done\n  Preparing editable metadata (pyproject.toml) ... done\nBuilding wheels for collected packages: fastcount\n  Building editable for fastcount (pyproject.toml) ... error\n  error: subprocess-exited-with-error\n  \n  fastcount/_count.c: No such file or directory\n  ... gcc: error: fastcount/_count.c: No such file or directory\nERROR: Failed building wheel for fastcount\n```\nThe source layout:\n```\nfastcount/\n├── pyproject.toml\n├── setup.py\n└── fastcount/\n    ├── __init__.py\n    └── _count.pyx       # Cython source — should compile to _count.c then .so\n```\n`pyproject.toml`:\n```toml\n[build-system]\nrequires = ["setuptools>=64", "wheel"]\nbuild-backend = "setuptools.build_meta"\n\n[project]\nname = "fastcount"\nversion = "0.1.0"\nrequires-python = ">=3.11"\n```\nWhere would you look FIRST AND what is the fix?',
        options: [
          '`requires` is missing Cython. Add `"Cython>=3.0"`. The build backend cannot compile `.pyx` to `.c` without it, and the C compiler is failing on an absent intermediate file.',
          '`build-backend` should be `"cython.build_meta"`.',
          'Cython requires Visual Studio specifically; install MSVC.',
          'Remove the `[build-system]` table entirely.',
        ],
        correctIndex: 0,
        explanation:
          "When a build-system table is present, pip creates an isolated env with ONLY the listed packages. Without Cython in `requires`, there's no `.pyx → .c` compiler in the build env. The C compiler error is downstream noise. Always list every build-time dependency (Cython, numpy, setuptools-rust, etc.) in `requires`.",
      },
      {
        kind: 'mcq',
        id: 'python-10-mcq-8',
        prompt:
          'A PyO3 extension that you ship to a data team takes down their Jupyter kernel whenever a notebook cell calls `fastcount.first([])`:\n```\nIn [3]: fastcount.first([])\nthread \'<unnamed>\' panicked at \'index out of bounds: the len is 0 but the index is 0\', src/lib.rs:7:5\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\nfatal runtime error: failed to initiate panic, error 5\n[I 2026-05-24 16:02:11.014 ServerApp] KernelRestarter: restarting kernel (1/5), keep random ports\n```\nThe Rust source:\n```rust\n// fastcount/src/lib.rs\nuse pyo3::prelude::*;\n\n#[pyfunction]\nfn first(items: Vec<i64>) -> i64 {\n    items[0]               // line 7 — panics on empty input\n}\n\n#[pymodule]\nfn fastcount(_py: Python<\'_>, m: &PyModule) -> PyResult<()> {\n    m.add_function(wrap_pyfunction!(first, m)?)?;\n    Ok(())\n}\n```\nWhy does this kill the whole interpreter (not just raise an exception) AND what is the idiomatic PyO3 fix?',
        options: [
          'A Rust panic crosses the FFI boundary as an abort and kills the interpreter. Return a `PyResult<i64>` and raise a Python exception on empty input: `if items.is_empty() { return Err(PyValueError::new_err("empty")); }`.',
          'Wrap the call site with `try/except`.',
          'Replace `i64` with `i32`.',
          'Add `#[no_panic]` above the function.',
        ],
        correctIndex: 0,
        explanation:
          "PyO3 catches Rust panics and translates them to `PyRuntimeError` — but this aborts mid-call and leaves the interpreter in a fragile state. Idiomatic PyO3 code returns `PyResult<T>` and explicitly raises Python exceptions (`PyValueError`, `PyKeyError`, etc.) for expected error cases. Reserve `panic!` for truly unexpected invariants.",
      },
      {
        kind: 'mcq',
        id: 'python-10-mcq-9',
        prompt:
          'GitHub Issues fills up within an hour of publishing v0.1.0 — Apple Silicon (M-series) Mac users all hit the same error:\n```\n$ pip install fastcount==0.1.0\nLooking in indexes: https://pypi.org/simple\nCollecting fastcount==0.1.0\n  Downloading fastcount-0.1.0.tar.gz (12 kB)\nERROR: fastcount-0.1.0-cp311-cp311-macosx_14_0_x86_64.whl is not a supported wheel on this platform.\n```\n`pip debug --verbose` on the user box:\n```\nCompatible tags: 312 (truncated)\n  cp312-cp312-macosx_14_0_arm64\n  cp312-cp312-macosx_14_0_universal2\n  cp311-cp311-macosx_14_0_arm64\n  ...\n```\nThe project\'s release workflow only runs `python -m build` on the maintainer\'s Intel iMac. What went wrong AND what is the durable fix for v0.1.1?',
        options: [
          'Only an x86_64 macOS wheel was published. Apple Silicon needs an arm64 (or universal2) wheel. Use `cibuildwheel` in CI to build the full matrix: cp3X manylinux2014_{x86_64,aarch64}, macosx_{x86_64,arm64,universal2}, win_amd64.',
          'macOS 14 specifically blocks Python wheels.',
          'The user must compile from source — there is no fix.',
          'Rename the wheel to `.tar.gz`.',
        ],
        correctIndex: 0,
        explanation:
          'Wheel filenames encode the (Python tag, ABI tag, platform tag). `macosx_14_0_x86_64` is Intel-only — Apple Silicon Macs need `macosx_*_arm64` or a `universal2` wheel that contains both architectures. The canonical solution is `cibuildwheel` (matrix CI build) so every supported platform is covered automatically on each release.',
      },
      {
        kind: 'code',
        id: 'python-10-code-1',
        prompt: 'Use the standard library `tomllib` module to parse a TOML-formatted configuration string and retrieve the project version from the `[project]` table.',
        boilerplate: 'import tomllib\n\ndef parse_version(toml_str: str) -> str:\n    # Parse the TOML string and return the project version\n    data = tomllib.loads(toml_str)\n    return ""\n\nif __name__ == "__main__":\n    toml_config = \'[project]\\nname = "fastcount"\\nversion = "0.1.1"\'\n    parse_version(toml_config)\n',
        expectedOutput: '0.1.1',
        explanation: 'The `tomllib` module (available in Python 3.11+) provides the `loads` function to parse TOML-formatted strings into standard Python dictionaries.'
      }
    ],
  },
];
