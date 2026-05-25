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
      'Python is designed for readability — indentation is syntax, and the language ships with a rich standard library out of the box. This phase covers the absolute essentials: how Python programs are structured, the built-in scalar types (int, float, str, bool, None), how to branch with if/elif/else, loop with for and while, and how to define and call functions.\n\nBy the end you will build locally a `greet.py` CLI that takes a name argument and prints a personalised greeting along with the current time. Everything else in the curriculum builds on these primitives, so take time to fully understand variable binding, truthiness, and how Python\'s indentation-based block structure works.',
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
      "Python's built-in collection types — lists, dicts, sets, and tuples — cover the vast majority of everyday data-wrangling needs. Knowing which to reach for (and why) is one of the skills that separates fluent Python from code that works but feels clunky. This phase covers slicing, mutation vs immutability, the full dict/set API, and the wonderfully expressive list/dict/set comprehension syntax.\n\nBy the end you will build locally a `wordcount.py` CLI that reads stdin or a file and prints the top-10 most common words with frequency, using comprehensions, generators, and `collections.Counter` patterns.",
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
        prompt: 'Which statement about Python tuples is correct?',
        options: [
          'Tuples are immutable; you cannot reassign their elements after creation.',
          'Tuples support item assignment: `t[0] = 1` is valid.',
          'Tuples cannot contain mutable objects like lists.',
          'A tuple with one element is written as `(1)` with no trailing comma needed.',
        ],
        correctIndex: 0,
        explanation:
          'Tuples are immutable — `t[0] = 1` raises `TypeError`. They can contain mutable objects (only the tuple structure itself is fixed; `t = ([1, 2], 3); t[0].append(99)` works fine). A single-element tuple requires a trailing comma: `(1,)`, not `(1)` which is just a parenthesised integer.',
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
          'What is the time complexity of `x in s` for a Python set `s` of size n?',
        options: [
          'O(1) average — sets are backed by a hash table.',
          'O(n) — Python must scan every element.',
          'O(log n) — sets are balanced trees.',
          'O(n log n) — Python sorts before searching.',
        ],
        correctIndex: 0,
        explanation:
          'Python sets (and dicts) use open-addressing hash tables, so membership tests are O(1) on average and O(n) only in pathological collision scenarios. Lists use O(n) linear scan for `in`. If you find yourself doing `x in some_list` repeatedly, convert to a set first.',
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
      'Real Python programs are split across multiple files. This phase teaches you how the import system works — relative vs absolute imports, `__init__.py`, and how `sys.path` is resolved — and how to manage dependencies with virtual environments and pip. You will also cover file I/O (text and binary modes, context managers), structured exception handling with try/except/else/finally, and the basics of object-oriented programming.\n\nBy the end you will build locally a `contacts.py` CLI: a contact book that stores entries as class instances, persists them to a JSON file, and supports add/list/search/delete subcommands with custom exception classes for duplicate and not-found cases.',
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
      "Python's standard library is huge; knowing the right module saves you from re-inventing the wheel. This phase surveys the most-used modules: `pathlib` for filesystem paths, `os`/`shutil` for process/file ops, `json` and `csv` for serialisation, `datetime`, `collections` (Counter, defaultdict, deque, namedtuple), `itertools`, and `functools`. It also introduces static typing with PEP 484 hints, `@dataclass`, and pytest.\n\nBy the end you will build locally a `notes.py` CLI with subcommands (`add`, `list`, `find`, `done`) backed by a JSON file, using `argparse`, `pathlib`, dataclasses, and full type hints. You will write a pytest suite covering each subcommand.",
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
      "Python's type system has grown dramatically with each release. This phase covers the advanced constructs that make large codebases maintainable: Generic classes and functions, Protocol for structural subtyping, TypedDict for typed dictionaries, Literal for narrowing to specific values, TypeGuard, and the newer PEP 695 type-parameter syntax (Python 3.12+). It also covers Python 3.10+ structural pattern matching (match/case).\n\nBy the end you will build locally a `result.py` library: a typed `Result[T, E]` generic class (Ok/Err variants) with `map`, `flat_map`, and `unwrap_or`, plus a `Mappable` Protocol. Use PEP 695 syntax and ship a pytest suite.",
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
          'Which pattern correctly matches a list of EXACTLY two integers and binds them to `a` and `b`?',
        options: [
          '`case [a, b] if isinstance(a, int) and isinstance(b, int):`',
          '`case (a, b):`',
          '`case [int(a), int(b), *_]:`',
          '`case {"a": a, "b": b}:`',
        ],
        correctIndex: 0,
        explanation:
          'The sequence pattern `[a, b]` matches any sequence with exactly two elements. The `if` guard narrows further to require both be ints. Option 2 also matches tuples but does not check type. Option 3 uses `*_` which would also accept longer sequences. Option 4 matches a mapping (dict), not a list.',
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
      "Python's async model is cooperative: a single thread runs an event loop that suspends coroutines at await points and resumes them when I/O is ready. This phase covers event loops, tasks, futures, `asyncio.gather` vs `asyncio.wait`, queues, locks, semaphores, and `contextvars`. Sync and async context managers (`__enter__`/`__exit__`, `__aenter__`/`__aexit__`, `@contextmanager`/`@asynccontextmanager`) are covered as the idiomatic resource-management pattern.\n\nBy the end you will build locally an async `linkcheck.py` CLI: given a list of URLs (file or argv), fetch them concurrently with `httpx.AsyncClient`, limit concurrency with a `Semaphore`, collect status codes, and print a report.",
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
          'Which protocol defines an ASYNC context manager (usable with `async with`)?',
        options: [
          '`__aenter__` and `__aexit__`',
          '`__enter__` and `__exit__`',
          '`__anext__` and `__aiter__`',
          '`__await__` only',
        ],
        correctIndex: 0,
        explanation:
          '`async with` calls `__aenter__()` (awaiting the result) on entry and `__aexit__()` on exit. `__enter__`/`__exit__` are the sync equivalents. `__aiter__`/`__anext__` define async ITERATORS, used with `async for`. `__await__` is what makes an object awaitable.',
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
      "Writing correct Python is necessary; writing fast Python requires knowing where to look. This phase teaches systematic profiling with cProfile and pstats, sampling profilers like py-spy, memory profiling with tracemalloc, and using the `dis` module to inspect bytecode. You will also learn the key CPython implementation details that affect performance: the GIL, reference counting, the cyclic garbage collector, and why threads cannot parallelise CPU-bound work in CPython.\n\nBy the end you will build locally a `matmul_bench.py` script that compares a naive pure-Python nested-loop matrix multiplication against a NumPy version, profiles both with cProfile, and prints a side-by-side timing report.",
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
      'FastAPI has become the de-facto standard for Python web APIs: it combines Pydantic validation, async support, OpenAPI generation, and dependency injection into a cohesive framework. This phase goes beyond "hello world" to cover advanced dependency injection patterns, custom exception handlers, middleware, background tasks, lifespan events, and deployment with Uvicorn. The data layer uses SQLModel (SQLAlchemy 2 + Pydantic) with async sessions.\n\nBy the end you will build locally a FastAPI service `bookmarks.py` with `/add`, `/list`, `/delete` endpoints, SQLite-backed via SQLModel, async sessions, and integration tests using `httpx.AsyncClient`.',
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
      'Production systems need visibility. This phase covers the OpenTelemetry Python SDK for distributed tracing and metrics, structured logging (replacing printf-style logs with JSON-serialisable records), and how to correlate logs and traces. On the testing side you will move beyond basic pytest to advanced fixtures, parametrize, and coverage analysis with pytest-cov. The standout topic is Hypothesis — property-based testing that generates adversarial inputs automatically.\n\nBy the end you will build locally an `observable_api.py`: take the Level 8 bookmarks service, instrument it with OpenTelemetry tracing and structured JSON logging, and ship a Hypothesis-based test suite (4+ properties) targeting 90%+ branch coverage.',
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
      'When pure Python is not fast enough and you have exhausted NumPy and the GIL-releasing standard library, you extend Python with compiled code. This phase covers two paths: Cython (annotated Python compiled to C) and PyO3 (Rust bindings with Cargo). You will also learn modern Python packaging: writing `pyproject.toml`, building with `hatch` or `uv`, creating platform wheels with manylinux, and publishing to PyPI.\n\nBy the end you will build locally a `fastcount` Cython OR PyO3 extension that exposes a fast `count_words(text: str) -> dict[str, int]` function to Python, packaged with a working `pyproject.toml` and built with `pip install -e .` or `maturin develop`.',
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
    ],
  },
];
