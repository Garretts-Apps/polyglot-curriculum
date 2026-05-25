import type { Phase } from './types';

export const pythonPhases: Phase[] = [
  // ─── Level 1 ─────────────────────────────────────────────────────────────
  {
    id: 'python-1',
    language: 'python',
    level: 1,
    title: 'Foundations: Syntax, Types, and Control Flow',
    timeEstimate: '6-10 hours',
    intro:
      'Python is designed for readability — indentation is syntax, and the language ships with a rich standard library out of the box. This phase covers the absolute essentials: how Python programs are structured, the built-in scalar types (int, float, str, bool, None), how to branch with if/elif/else, loop with for and while, and how to define and call functions.\n\nBy the end of this phase you will be able to write small self-contained scripts that read input, perform calculations, and print results. Everything else in the curriculum builds on these primitives, so take time to fully understand variable binding, truthiness, and how Python\'s indentation-based block structure works.',
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
      'Write a CLI number-guessing game: the program picks a random integer 1-100, the user types guesses until correct, and the program prints "Too high", "Too low", or "Correct! You guessed in N tries."',
    checks: [
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
          'f-strings use {} to interpolate any expression. $name is JavaScript/shell syntax. %s is old-style printf formatting. The last option is a syntax error because {name} outside an f-string is a set literal, not interpolation.',
      },
      {
        kind: 'mcq',
        id: 'python-1-mcq-2',
        prompt:
          'What does this code print?\n```python\nx = 5\nif x > 3:\n    print("A")\nelif x > 1:\n    print("B")\nelse:\n    print("C")\n```',
        options: ['"A"', '"B"', '"A" then "B"', '"C"'],
        correctIndex: 0,
        explanation:
          'Python evaluates if/elif/else top-to-bottom and stops at the first truthy branch. Since 5 > 3 is True, it prints "A" and skips the remaining branches entirely.',
      },
      {
        kind: 'code',
        id: 'python-1-code-1',
        prompt:
          'Write a function `greet(name)` that returns `"Hello, <name>!"`. Then print `greet("World")`.',
        starterCode: 'def greet(name):\n    pass\n\nprint(greet("World"))\n',
        expectedOutput: 'Hello, World!\n',
        hint: 'Use an f-string: f"Hello, {name}!"',
      },
      {
        kind: 'code',
        id: 'python-1-code-2',
        prompt:
          'Write a function `fizzbuzz(n)` that returns:\n- "FizzBuzz" if n is divisible by both 3 and 5\n- "Fizz" if divisible by 3 only\n- "Buzz" if divisible by 5 only\n- The number as a string otherwise\n\nPrint results for 1..15, one per line.',
        starterCode: 'def fizzbuzz(n):\n    pass\n\nfor i in range(1, 16):\n    print(fizzbuzz(i))\n',
        expectedOutput:
          '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n',
        hint: 'Check divisibility by 15 first (or use and), then 3, then 5.',
      },
      {
        kind: 'mcq',
        id: 'python-1-mcq-3',
        prompt: 'Which of the following values is **falsy** in Python?',
        options: ['`0`', '`"False"`', '`[0]`', '`1`'],
        correctIndex: 0,
        explanation:
          '0 is falsy. The string "False" is truthy (any non-empty string is truthy). [0] is a list with one element — also truthy. 1 is truthy. Falsy values include 0, 0.0, "", [], {}, None, and False.',
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
      "Python's built-in collection types — lists, dicts, sets, and tuples — cover the vast majority of everyday data-wrangling needs. Knowing which to reach for (and why) is one of the skills that separates fluent Python from code that works but feels clunky. This phase covers slicing, mutation vs immutability, the full dict/set API, and the wonderfully expressive list/dict/set comprehension syntax.\n\nIterators and generators round out the phase: understanding that for loops work over any iterable, and that yield lets you produce values lazily, unlocks patterns that are both memory-efficient and clean to read.",
    topics: [
      {
        label: 'Data Structures (Python Tutorial Chapter 5)',
        url: 'https://docs.python.org/3/tutorial/datastructures.html',
        note: 'Lists, dicts, sets, tuples — official tutorial with examples',
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
      'Build a word-frequency counter: read a multi-line string of text, compute a dict of word to count, and print the top-10 words sorted by frequency descending. Use comprehensions and built-in sort.',
    checks: [
      {
        kind: 'mcq',
        id: 'python-2-mcq-1',
        prompt: 'What is the output of `[x**2 for x in range(5) if x % 2 == 0]`?',
        options: ['`[0, 4, 16]`', '`[0, 1, 4, 9, 16]`', '`[4, 16]`', '`[0, 2, 4]`'],
        correctIndex: 0,
        explanation:
          'range(5) produces 0,1,2,3,4. The if x % 2 == 0 filter keeps 0, 2, 4. Squaring those gives [0, 4, 16].',
      },
      {
        kind: 'code',
        id: 'python-2-code-1',
        prompt:
          'Write a function `invert(d)` that takes a dict and returns a new dict with keys and values swapped. Assume values are unique.\n\nExample: invert({"a": 1, "b": 2}) should return {1: "a", 2: "b"}',
        starterCode: 'def invert(d):\n    pass\n\nprint(invert({"a": 1, "b": 2}))\n',
        assertions:
          'assert invert({"a": 1, "b": 2}) == {1: "a", 2: "b"}\nassert invert({}) == {}\nassert invert({"x": 99}) == {99: "x"}\n',
        hint: 'A dict comprehension {v: k for k, v in d.items()} does this in one line.',
      },
      {
        kind: 'code',
        id: 'python-2-code-2',
        prompt:
          'Write a generator function `running_total(numbers)` that yields the cumulative sum at each step.\n\nExample: list(running_total([1, 2, 3, 4])) should give [1, 3, 6, 10]',
        starterCode: 'def running_total(numbers):\n    pass\n\nprint(list(running_total([1, 2, 3, 4])))\n',
        expectedOutput: '[1, 3, 6, 10]\n',
        hint: 'Keep a running total variable and yield it after each addition.',
      },
      {
        kind: 'mcq',
        id: 'python-2-mcq-2',
        prompt: 'Which statement about Python tuples is correct?',
        options: [
          'Tuples are immutable; you cannot change their elements after creation.',
          'Tuples support item assignment: t[0] = 1 is valid.',
          'Tuples cannot contain mutable objects like lists.',
          'A tuple with one element is written as (1) with no trailing comma needed.',
        ],
        correctIndex: 0,
        explanation:
          'Tuples are immutable — t[0] = 1 raises TypeError. They can contain mutable objects (the tuple itself just cannot be reassigned). A single-element tuple requires a trailing comma: (1,), not (1) which is just a parenthesised integer.',
      },
      {
        kind: 'mcq',
        id: 'python-2-mcq-3',
        prompt: 'What does `list(zip([1,2,3], ["a","b"]))` return?',
        options: [
          '`[(1, "a"), (2, "b")]`',
          '`[(1, "a"), (2, "b"), (3, None)]`',
          '`[[1, "a"], [2, "b"]]`',
          'ValueError due to mismatched lengths',
        ],
        correctIndex: 0,
        explanation:
          'zip stops at the shortest iterable by default, so the third element 3 is silently dropped. Use itertools.zip_longest if you want None fill.',
      },
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
      'Real Python programs are split across multiple files. This phase teaches you how the import system works — relative vs absolute imports, __init__.py, and how sys.path is resolved — and how to manage dependencies with virtual environments and pip. You will also cover file I/O (text and binary modes, context managers), structured exception handling with try/except/else/finally, and the basics of object-oriented programming: classes, inheritance, dunder methods, and @property.\n\nAfter this phase you can build multi-file projects, read and write files safely, handle errors gracefully, and model domain objects with classes.',
    topics: [
      {
        label: 'Modules (Python Tutorial Chapter 6)',
        url: 'https://docs.python.org/3/tutorial/modules.html',
        note: 'import system, packages, __init__.py, __all__',
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
      'Build a small contact-book CLI: store contacts as class instances, persist them to a JSON file, support add/list/search/delete commands, and raise custom exceptions for duplicates and not-found cases.',
    checks: [
      {
        kind: 'mcq',
        id: 'python-3-mcq-1',
        prompt: 'Which exception is raised when you try to open a file that does not exist?',
        options: ['`FileNotFoundError`', '`IOError`', '`OSError`', '`ValueError`'],
        correctIndex: 0,
        explanation:
          'FileNotFoundError is the specific exception for missing files. It is a subclass of OSError (which is an alias for IOError), so catching OSError also works — but FileNotFoundError is the most precise and idiomatic choice.',
      },
      {
        kind: 'code',
        id: 'python-3-code-1',
        prompt:
          'Define a class `BankAccount` with:\n- __init__(self, owner, balance=0)\n- deposit(amount) — adds to balance, raises ValueError if amount <= 0\n- withdraw(amount) — subtracts from balance, raises ValueError if amount > balance\n- __repr__ returning "BankAccount(owner=\'<owner>\', balance=<balance>)"\n\nCreate an account for "Alice" with balance 100, deposit 50, and print repr(acc).',
        starterCode:
          'class BankAccount:\n    pass\n\nacc = BankAccount("Alice", 100)\nacc.deposit(50)\nprint(repr(acc))\n',
        expectedOutput: "BankAccount(owner='Alice', balance=150)\n",
        hint: 'Store owner and balance as instance attributes in __init__.',
      },
      {
        kind: 'code',
        id: 'python-3-code-2',
        prompt:
          'Write a function `safe_divide(a, b)` that returns `a / b`, but catches `ZeroDivisionError` and returns `None` instead of crashing.',
        starterCode:
          'def safe_divide(a, b):\n    pass\n\nprint(safe_divide(10, 2))\nprint(safe_divide(5, 0))\n',
        expectedOutput: '5.0\nNone\n',
      },
      {
        kind: 'mcq',
        id: 'python-3-mcq-2',
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
          'When Python imports a module, __name__ is set to the module name. When the file is run directly, __name__ is "__main__". This guard lets the same file act as both a runnable script and an importable library.',
      },
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
      "Python's standard library is huge; knowing the right module saves you from re-inventing the wheel. This phase surveys the most-used modules: pathlib for filesystem paths, os and shutil for process/file ops, json and csv for serialisation, datetime for dates and times, collections (Counter, defaultdict, deque, namedtuple), itertools, and functools (partial, lru_cache, reduce).\n\nThe phase also introduces static typing with PEP 484 type hints and the typing module, @dataclass for concise data-holding classes, and pytest for writing and running unit tests. Type-annotated, tested code is the baseline expectation for all professional Python work.",
    topics: [
      {
        label: 'pathlib — Object-oriented filesystem paths',
        url: 'https://docs.python.org/3/library/pathlib.html',
        note: 'Path(), read_text(), write_text(), glob(), iterdir()',
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
      'Build a CSV to JSON converter CLI using pathlib + csv + json + dataclasses. Each CSV row maps to a dataclass; the tool validates required fields, collects errors, and writes a JSON array. Add at least 5 pytest tests covering happy path and error cases.',
    checks: [
      {
        kind: 'mcq',
        id: 'python-4-mcq-1',
        prompt: 'What does `collections.Counter("abracadabra")` return?',
        options: [
          'Counter({"a": 5, "b": 2, "r": 2, "c": 1, "d": 1})',
          '{"a": 5, "b": 2, "r": 2, "c": 1, "d": 1} (a plain dict)',
          '[("a", 5), ("b", 2), ...] (a list of tuples)',
          '5 — the count of the most common element',
        ],
        correctIndex: 0,
        explanation:
          'Counter returns a Counter object (a dict subclass) mapping each element to its count. It is not a plain dict, though it behaves like one. .most_common() gives the list of tuples form.',
      },
      {
        kind: 'code',
        id: 'python-4-code-1',
        prompt:
          'Use @dataclass to define a `Point` class with fields `x: float` and `y: float`. Add a method `distance_to(other: "Point") -> float` that returns the Euclidean distance.\n\nPrint Point(0, 0).distance_to(Point(3, 4)) — expected: 5.0',
        starterCode:
          'from dataclasses import dataclass\nimport math\n\n@dataclass\nclass Point:\n    pass\n\nprint(Point(0, 0).distance_to(Point(3, 4)))\n',
        expectedOutput: '5.0\n',
        hint: 'Use math.sqrt((self.x - other.x)**2 + (self.y - other.y)**2) or math.hypot.',
      },
      {
        kind: 'code',
        id: 'python-4-code-2',
        prompt:
          'Use `functools.lru_cache` to memoize a recursive `fib(n)` function and print `fib(35)`.',
        starterCode:
          'from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n: int) -> int:\n    pass\n\nprint(fib(35))\n',
        expectedOutput: '9227465\n',
        hint: 'Base cases: fib(0) = 0, fib(1) = 1. Recursive case: fib(n-1) + fib(n-2).',
      },
      {
        kind: 'mcq',
        id: 'python-4-mcq-2',
        prompt:
          'Which type annotation best describes a function that accepts a list of strings and returns an optional integer?',
        options: [
          '`def f(items: list[str]) -> int | None:`',
          '`def f(items: List) -> Optional:`',
          '`def f(items: list) -> int?:`',
          '`def f(items: str[]) -> int | None:`',
        ],
        correctIndex: 0,
        explanation:
          'Since Python 3.10, list[str] and int | None are the modern built-in forms (no import needed). Optional[int] from typing also works but is now considered legacy style. int? and str[] are not valid Python syntax.',
      },
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
      "Python's type system has grown dramatically with each release. This phase covers the advanced constructs that make large codebases maintainable: Generic classes and functions, Protocol for structural subtyping (duck typing with type-checker support), TypedDict for typed dictionaries, Literal for narrowing to specific values, TypeGuard for narrowing in conditionals, and the newer ParamSpec (PEP 612) and TypeVarTuple (PEP 646) for typed higher-order functions and variadic generics.\n\nThe phase also covers Python 3.10+ structural pattern matching (match/case) — which goes far beyond a simple switch statement — and how it integrates with dataclasses and TypedDicts.",
    topics: [
      {
        label: 'Generics in Python (typing.Generic)',
        url: 'https://docs.python.org/3/library/typing.html#generics',
        note: 'TypeVar, Generic[T], covariance, contravariance',
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
      'Write a typed Result[T, E] generic class (Ok/Err variants) with map, flat_map, and unwrap_or. Use Protocol to define a Mappable protocol. Add full type hints and a pytest test suite with at least 6 tests.',
    checks: [
      {
        kind: 'mcq',
        id: 'python-5-mcq-1',
        prompt:
          'What is the key difference between `typing.Protocol` and an abstract base class (ABC)?',
        options: [
          'Protocol uses structural subtyping — a class satisfies a Protocol if it has the right methods, even without explicitly inheriting from it.',
          'Protocol requires explicit inheritance, just like ABC.',
          'Protocol only works at runtime, not with static type checkers.',
          'Protocol classes cannot have method implementations.',
        ],
        correctIndex: 0,
        explanation:
          'This is structural (duck-type) subtyping: any class with the right shape satisfies the Protocol without inheriting from it. ABCs require explicit class Foo(MyABC). Protocols work best with static type checkers; @runtime_checkable is needed for isinstance checks at runtime.',
      },
      {
        kind: 'code',
        id: 'python-5-code-1',
        prompt:
          'Write a generic function `first(items: list[T]) -> T | None` that returns the first element or None if the list is empty. Use TypeVar.\n\nPrint first([10, 20, 30]) and first([]).',
        starterCode:
          'from typing import TypeVar\n\nT = TypeVar("T")\n\ndef first(items: list[T]) -> T | None:\n    pass\n\nprint(first([10, 20, 30]))\nprint(first([]))\n',
        expectedOutput: '10\nNone\n',
      },
      {
        kind: 'code',
        id: 'python-5-code-2',
        prompt:
          'Use match/case to write a function `describe_shape(shape)` that takes a dict and returns:\n- "Circle with radius <r>" for {"kind": "circle", "radius": r}\n- "Rectangle <w>x<h>" for {"kind": "rect", "w": w, "h": h}\n- "Unknown shape" for anything else\n\nPrint results for a circle (radius 5) and a rectangle (3x4).',
        starterCode:
          'def describe_shape(shape):\n    pass\n\nprint(describe_shape({"kind": "circle", "radius": 5}))\nprint(describe_shape({"kind": "rect", "w": 3, "h": 4}))\n',
        expectedOutput: 'Circle with radius 5\nRectangle 3x4\n',
        hint: 'Use mapping patterns: case {"kind": "circle", "radius": r}:',
      },
      {
        kind: 'mcq',
        id: 'python-5-mcq-2',
        prompt: 'What does `TypeGuard[T]` as a return type tell the type checker?',
        options: [
          "If the function returns True, the type checker narrows the argument's type to T in the succeeding branch.",
          'The function always returns a value of type T.',
          'The function raises an exception if the argument is not of type T.',
          'It is equivalent to bool — there is no narrowing effect.',
        ],
        correctIndex: 0,
        explanation:
          "TypeGuard[T] is a special return type for type-narrowing predicate functions. If the guard function returns True, the type checker treats the guarded argument as type T in the if branch. It is analogous to TypeScript's `is T` type predicate.",
      },
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
      "Python's async model is cooperative: a single thread runs an event loop that suspends coroutines at await points and resumes them when I/O is ready. This phase goes beyond just adding async/await to explain the machinery: event loops, tasks, futures, asyncio.gather vs asyncio.wait, queues, locks, semaphores, and the asyncio.streams API for TCP. You will also study contextvars for task-local state.\n\nSync and async context managers (__enter__/__exit__, __aenter__/__aexit__, and @contextmanager/@asynccontextmanager) are covered here because they are the idiomatic way to manage resources in async code. Code tasks in this phase target asyncio features available in Pyodide.",
    topics: [
      {
        label: 'asyncio — Coroutines and Tasks',
        url: 'https://docs.python.org/3/library/asyncio-task.html',
        note: 'asyncio.run, create_task, gather, wait, sleep, timeout',
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
      'Build an async HTTP link-checker: given a list of URLs, fetch them concurrently (limit concurrency with a Semaphore), collect status codes, and print a report. Use httpx[async] or aiohttp.',
    checks: [
      {
        kind: 'mcq',
        id: 'python-6-mcq-1',
        prompt:
          'What is the difference between `asyncio.gather(*coros)` and `asyncio.wait(coros)`?',
        options: [
          'gather returns results in input order and raises on first exception; wait returns two sets (done/pending) and does not raise by default.',
          'gather is sequential; wait is concurrent.',
          'They are interchangeable — wait is just an older alias.',
          'wait returns results in input order; gather returns sets.',
        ],
        correctIndex: 0,
        explanation:
          'asyncio.gather collects results in the original input order and propagates exceptions by default. asyncio.wait gives you fine-grained control via return_when (FIRST_COMPLETED, FIRST_EXCEPTION, ALL_COMPLETED) and returns sets of done/pending tasks — no implicit exception propagation.',
      },
      {
        kind: 'code',
        id: 'python-6-code-1',
        prompt:
          'Write an async function `concurrent_sum(delays)` that creates one task per delay value, each sleeping for that many seconds, then returning the delay value squared. Gather all tasks and return the sum.\n\nPrint asyncio.run(concurrent_sum([0, 0, 0])) — should be 0.\nPrint asyncio.run(concurrent_sum([1, 2, 3])) — should be 14.',
        starterCode:
          'import asyncio\n\nasync def concurrent_sum(delays):\n    pass\n\nprint(asyncio.run(concurrent_sum([0, 0, 0])))\nprint(asyncio.run(concurrent_sum([1, 2, 3])))\n',
        expectedOutput: '0\n14\n',
        hint: 'Create an inner coroutine that does await asyncio.sleep(d) then returns d**2. Use asyncio.gather to run all.',
      },
      {
        kind: 'code',
        id: 'python-6-code-2',
        prompt:
          'Use `contextlib.contextmanager` to write a `timer()` context manager that prints how many milliseconds elapsed in the block.\n\nThe output line should start with "Elapsed:" and end with "ms".',
        starterCode:
          'from contextlib import contextmanager\nimport time\n\n@contextmanager\ndef timer():\n    pass\n\nwith timer():\n    total = sum(range(100_000))\n',
        assertions:
          'from io import StringIO\nimport contextlib\n\nbuf = StringIO()\nwith contextlib.redirect_stdout(buf):\n    with timer():\n        _ = sum(range(1000))\noutput = buf.getvalue()\nassert output.startswith("Elapsed:"), f"Expected \'Elapsed:\', got: {output!r}"\nassert "ms" in output, "Expected \'ms\' in output"\n',
        hint: 'Record start = time.perf_counter() before yield, then compute elapsed after.',
      },
      {
        kind: 'mcq',
        id: 'python-6-mcq-2',
        prompt: 'Which statement about `contextvars.ContextVar` is correct?',
        options: [
          'Each asyncio Task gets its own copy of ContextVar values, so setting a variable in one task does not affect another.',
          'ContextVar values are global — all tasks share the same value.',
          'ContextVar is only useful with threads, not async tasks.',
          'You must explicitly copy context between tasks; it is not automatic.',
        ],
        correctIndex: 0,
        explanation:
          "When asyncio creates a Task, it copies the current Context automatically. Setting a ContextVar inside the task only modifies that task's copy, keeping other tasks isolated. This is the intended use case for request-scoped data like request IDs in async web frameworks.",
      },
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
      "Writing correct Python is necessary; writing fast Python requires knowing where to look. This phase teaches systematic profiling with cProfile and the pstats module, sampling profilers like py-spy for production, memory profiling with memory_profiler and tracemalloc, and using the dis module to inspect bytecode. You will also learn the key CPython implementation details that affect performance: the GIL, reference counting, the cyclic garbage collector, and why threads cannot parallelise CPU-bound work in CPython.\n\nArmed with measurement tools and a mental model of CPython's execution, you will know why a piece of code is slow and what the realistic remedies are.",
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
      'Profile a naive implementation of matrix multiplication (pure Python nested loops), identify the bottleneck with cProfile, then replace the hot loop with a NumPy vectorised version and show the speedup. Write a short profiling report in a docstring.',
    checks: [
      {
        kind: 'mcq',
        id: 'python-7-mcq-1',
        prompt: 'What is the GIL and when does it matter most?',
        options: [
          'A CPython mutex that prevents multiple threads from executing Python bytecode simultaneously — it matters for CPU-bound multi-threaded code but not for I/O-bound code.',
          'A lock that prevents multiple processes from running Python at once.',
          'A compiler optimisation that prevents code from running slower than expected.',
          'The GIL only existed in Python 2; Python 3 removed it.',
        ],
        correctIndex: 0,
        explanation:
          'The GIL serialises bytecode execution across threads, so CPU-bound threads do not actually run in parallel. I/O-bound threads release the GIL while waiting, so threading is fine for I/O concurrency. For CPU parallelism use multiprocessing or extension modules that release the GIL.',
      },
      {
        kind: 'code',
        id: 'python-7-code-1',
        prompt:
          'Use `timeit.timeit` to compare two ways of building a string from range(1000):\n1. "".join(str(i) for i in range(1000))\n2. String concatenation in a loop\n\nPrint both timings rounded to 4 decimal places and which approach is faster.',
        starterCode:
          'import timeit\n\njoin_time = timeit.timeit(\n    \'"\".join(str(i) for i in range(1000))\',\n    number=1000\n)\n\ndef concat_approach():\n    s = ""\n    for i in range(1000):\n        s += str(i)\n    return s\n\nconcat_time = timeit.timeit(concat_approach, number=1000)\n\nprint("join:", round(join_time, 4), "s")\nprint("concat:", round(concat_time, 4), "s")\nif join_time < concat_time:\n    print("join is faster")\nelse:\n    print("concat is faster")\n',
        assertions:
          'import timeit\njt = timeit.timeit(\'"\".join(str(i) for i in range(1000))\', number=500)\nassert jt > 0, "join_time should be positive"\n',
        hint: 'Both approaches produce the same string — this exercise is about measurement, not correctness.',
      },
      {
        kind: 'code',
        id: 'python-7-code-2',
        prompt:
          'Use the `dis` module to get the bytecode instructions for `lambda x: x * 2 + 1` and print the number of instructions.',
        starterCode:
          'import dis\n\nf = lambda x: x * 2 + 1\ninstructions = list(dis.get_instructions(f))\nprint(len(instructions))\n',
        assertions:
          'import dis\nf = lambda x: x * 2 + 1\ninstructions = list(dis.get_instructions(f))\nassert len(instructions) > 0, "Should have at least one instruction"\n',
        hint: 'dis.get_instructions(f) is a generator; wrap in list() to count.',
      },
      {
        kind: 'mcq',
        id: 'python-7-mcq-2',
        prompt:
          'Which tool would you use to profile a Python server in production without restarting or modifying the process?',
        options: [
          'py-spy — it attaches to a running process by PID using sampling.',
          'cProfile — just add python -m cProfile myserver.py to the launch command.',
          'tracemalloc — it works in-process but requires no code changes.',
          'memory_profiler — its @profile decorator works without restarting.',
        ],
        correctIndex: 0,
        explanation:
          "py-spy is a sampling profiler that reads the target process's memory without any code changes or restarts. cProfile requires running the script through the profiler from the start. tracemalloc and memory_profiler need to be enabled in the running process.",
      },
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
      'FastAPI has become the de-facto standard for Python web APIs: it combines Pydantic validation, async support, OpenAPI generation, and dependency injection into a cohesive framework. This phase goes beyond "hello world" to cover advanced dependency injection patterns, custom exception handlers, middleware, background tasks, lifespan events, and deployment with Uvicorn/Gunicorn. The data layer uses SQLModel (built on SQLAlchemy 2 + Pydantic) for type-safe ORM models with async sessions.\n\nBecause FastAPI and SQLModel cannot run in-browser, code checks in this phase focus on the underlying Python language features — Pydantic models, async coroutines, dataclasses — that you would use inside a FastAPI project.',
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
      'Build a REST API for a task manager: POST/GET/PATCH/DELETE /tasks, authentication via Bearer token using Depends, async SQLite via SQLModel, background task that logs task creation, and a health endpoint. Write integration tests with httpx.AsyncClient.',
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
          "Depends() is FastAPI's dependency injection system. You declare a function (or class __init__) as a dependency, and FastAPI automatically calls it and injects the result. Dependencies can themselves depend on other dependencies, enabling clean composition of DB sessions, authentication, rate limiting, etc.",
      },
      {
        kind: 'code',
        id: 'python-8-code-1',
        prompt:
          'Define a Pydantic BaseModel for a task:\n- id: int\n- title: str (min length 1)\n- done: bool = False\n\nCreate an instance Task(id=1, title="Buy milk") and print its JSON using .model_dump_json().',
        starterCode:
          'from pydantic import BaseModel, Field\n\nclass Task(BaseModel):\n    pass\n\nt = Task(id=1, title="Buy milk")\nprint(t.model_dump_json())\n',
        assertions:
          'from pydantic import BaseModel, Field\nimport json\n\nclass Task(BaseModel):\n    id: int\n    title: str = Field(min_length=1)\n    done: bool = False\n\nt = Task(id=1, title="Buy milk")\ndata = json.loads(t.model_dump_json())\nassert data["id"] == 1\nassert data["title"] == "Buy milk"\nassert data["done"] == False\n',
        hint: 'Pydantic v2 uses model_dump_json() (not .json() which was Pydantic v1).',
      },
      {
        kind: 'code',
        id: 'python-8-code-2',
        prompt:
          'Write an async function `fetch_all(urls: list[str]) -> list[str]` that simulates fetching each URL by returning "fetched:<url>". Use asyncio.gather to run all concurrently.\n\nPrint asyncio.run(fetch_all(["https://a.com", "https://b.com"])).',
        starterCode:
          'import asyncio\n\nasync def fetch_all(urls: list[str]) -> list[str]:\n    pass\n\nprint(asyncio.run(fetch_all(["https://a.com", "https://b.com"])))\n',
        expectedOutput: "['fetched:https://a.com', 'fetched:https://b.com']\n",
      },
      {
        kind: 'mcq',
        id: 'python-8-mcq-2',
        prompt: 'What is the FastAPI `lifespan` parameter used for?',
        options: [
          'Running startup/shutdown code (e.g. connecting to DB, loading ML models) in an async context manager tied to the application lifecycle.',
          'Setting the maximum request timeout.',
          'Configuring how long responses are cached.',
          "Defining the application's API version deprecation period.",
        ],
        correctIndex: 0,
        explanation:
          'lifespan replaces the deprecated on_startup/on_shutdown event hooks. You pass an async context manager: code before yield runs at startup, code after yield runs at shutdown. This is the idiomatic way to manage resources (DB pools, caches, ML models) that should live for the full application lifetime.',
      },
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
      'Production systems need visibility. This phase covers the OpenTelemetry Python SDK for distributed tracing and metrics, structured logging (replacing printf-style logs with JSON-serialisable records), and how to correlate logs and traces. On the testing side, you will move beyond basic pytest to advanced fixtures, parametrize, custom plugins, and coverage analysis with pytest-cov. The standout topic is Hypothesis — a property-based testing library that generates adversarial inputs automatically, finding edge cases you would not think to write by hand.\n\nBy the end of this phase, your Python services will be observable in production and your test suites will be robust against unexpected inputs.',
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
      'Add OpenTelemetry tracing and structured JSON logging to the Level 8 FastAPI task manager. Write a property-based Hypothesis test suite for your data-validation logic (at least 4 properties). Aim for 90%+ branch coverage.',
    checks: [
      {
        kind: 'mcq',
        id: 'python-9-mcq-1',
        prompt:
          'In Hypothesis, what does `@given(st.lists(st.integers()))` mean on a test function?',
        options: [
          'Hypothesis will automatically generate many different lists of integers and run the test body with each, looking for inputs that cause a failure.',
          'The test receives a fixed example list of integers defined in the decorator.',
          'The test will only run once with an empty list.',
          'Hypothesis replays previously failing examples only.',
        ],
        correctIndex: 0,
        explanation:
          'Hypothesis generates up to max_examples (default 100) random inputs that satisfy the strategy, and also includes edge cases like empty lists, very large integers, etc. If any input fails, Hypothesis shrinks it to the smallest failing example and reports it.',
      },
      {
        kind: 'code',
        id: 'python-9-code-1',
        prompt:
          'Write a function `stats(numbers: list[float]) -> dict` that returns {"mean": float, "min": float, "max": float} for a non-empty list. Raise ValueError for empty input.\n\nVerify it works on [1.0, 2.0, 3.0] with three assertions.',
        starterCode:
          'def stats(numbers: list[float]) -> dict:\n    pass\n\nresult = stats([1.0, 2.0, 3.0])\nassert result["mean"] == 2.0\nassert result["min"] == 1.0\nassert result["max"] == 3.0\nprint("all assertions passed")\n',
        expectedOutput: 'all assertions passed\n',
        hint: 'Use sum(numbers) / len(numbers), min(numbers), max(numbers).',
      },
      {
        kind: 'code',
        id: 'python-9-code-2',
        prompt:
          'Use Python\'s logging module to create a logger named "app", set its level to DEBUG, add a StreamHandler, and log one message at each level: debug, info, warning.\n\nThen print the logger\'s level as an integer.',
        starterCode:
          'import logging\n\nlogger = logging.getLogger("app")\nlogger.setLevel(logging.DEBUG)\nhandler = logging.StreamHandler()\nlogger.addHandler(handler)\n\nlogger.debug("debug message")\nlogger.info("info message")\nlogger.warning("warning message")\n\nprint("logger level:", logger.level)\n',
        assertions:
          'import logging\nlogger2 = logging.getLogger("app")\nassert logger2.level == logging.DEBUG, f"Expected DEBUG (10), got {logger2.level}"\n',
        hint: 'logging.DEBUG == 10. Set with setLevel(logging.DEBUG).',
      },
      {
        kind: 'mcq',
        id: 'python-9-mcq-2',
        prompt:
          'In OpenTelemetry, what is the difference between a Trace, a Span, and a Meter?',
        options: [
          'A Trace is a collection of Spans representing one end-to-end request; a Span is a single timed operation within a trace; a Meter records numeric measurements (counters, histograms) for metrics.',
          'A Trace is a single database query; a Span is a whole HTTP request; a Meter is a synonym for Span.',
          'Spans and Traces are used for logging; Meters are used for tracing.',
          'A Trace is a metric; a Span is a log line; a Meter is a trace.',
        ],
        correctIndex: 0,
        explanation:
          'OpenTelemetry separates three signals: Traces (distributed request flows made of Spans), Metrics (numeric measurements via Meters/Instruments), and Logs. A Trace groups related Spans with a shared trace ID, enabling you to see the full call path across services.',
      },
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
      'When pure Python is not fast enough and you have exhausted NumPy and the GIL-releasing standard library, you extend Python with compiled code. This phase covers two paths: Cython (annotated Python compiled to C, gentle learning curve) and PyO3 (Rust bindings with Cargo, maximum performance and safety). You will also learn modern Python packaging: writing pyproject.toml, building with hatch or uv, creating platform wheels with manylinux docker images, and publishing to PyPI.\n\nCode checks for this phase focus on pure-Python concepts around packaging metadata and Cython-like type annotations, since compiling C extensions requires a native toolchain that is not available in-browser.',
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
      'Write a Cython extension that accelerates a pure-Python inner-product function, benchmark it against the Python baseline, and package the whole thing with a pyproject.toml that specifies Cython as a build dependency. Also write a minimal PyO3 Rust extension (a hello(name: str) -> str function) and document how to build it with maturin.',
    checks: [
      {
        kind: 'mcq',
        id: 'python-10-mcq-1',
        prompt:
          'What does declaring a variable with `cdef int x` in a Cython .pyx file do?',
        options: [
          "It declares x as a C int at compile time, bypassing Python's object overhead for that variable.",
          'It declares a Python-accessible class attribute.',
          'It is equivalent to a Python type annotation and has no runtime effect.',
          'It prevents the variable from being used in Python (only accessible from C code).',
        ],
        correctIndex: 0,
        explanation:
          "cdef int x tells Cython to allocate a native C int rather than a Python int object. Arithmetic on cdef variables compiles to direct C operations without Python's boxing/unboxing overhead, often yielding 10-100x speedups in tight loops.",
      },
      {
        kind: 'code',
        id: 'python-10-code-1',
        prompt:
          'Write a valid minimal pyproject.toml content as a Python string and parse it with the `tomllib` standard-library module (Python 3.11+). The TOML should define [project] with name = "mylib" and version = "0.1.0".\n\nPrint the name and version.',
        starterCode:
          'import tomllib\n\ntoml_content = """\n[project]\nname = "mylib"\nversion = "0.1.0"\n"""\n\ndata = tomllib.loads(toml_content)\nprint(data["project"]["name"])\nprint(data["project"]["version"])\n',
        expectedOutput: 'mylib\n0.1.0\n',
        hint: 'tomllib.loads(str) parses a TOML string. Available in stdlib since Python 3.11.',
      },
      {
        kind: 'code',
        id: 'python-10-code-2',
        prompt:
          'Write a function `inner_product(a: list[float], b: list[float]) -> float` that computes the dot product (sum of element-wise products).\n\nPrint inner_product([1.0, 2.0, 3.0], [4.0, 5.0, 6.0]) — expected: 32.0',
        starterCode:
          'def inner_product(a: list[float], b: list[float]) -> float:\n    pass\n\nprint(inner_product([1.0, 2.0, 3.0], [4.0, 5.0, 6.0]))\n',
        expectedOutput: '32.0\n',
        hint: 'Use sum(x * y for x, y in zip(a, b)) or a for loop.',
      },
      {
        kind: 'mcq',
        id: 'python-10-mcq-2',
        prompt:
          'When building a Python extension wheel targeting Linux, what problem does manylinux solve?',
        options: [
          "It provides Docker images that build against old enough glibc versions so the resulting wheel is compatible with many Linux distributions, not just the one it was built on.",
          'It packages the wheel as a Docker image for deployment.',
          'It is a Python package manager that replaces pip on Linux.',
          'It compiles Python to native machine code for Linux only.',
        ],
        correctIndex: 0,
        explanation:
          "A wheel compiled on Ubuntu 24.04 links against a recent glibc and won't run on older distros. manylinux Docker images (e.g. manylinux_2_28) link against a guaranteed-old glibc so the wheel runs on any reasonably modern Linux. cibuildwheel automates running these images in CI.",
      },
    ],
  },
];
