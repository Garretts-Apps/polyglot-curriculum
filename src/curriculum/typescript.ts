import type { Phase } from './types';

export const typescriptPhases: Phase[] = [
  // ─── Level 0 ─────────────────────────────────────────────────────────────
  {
    id: 'typescript-0',
    language: 'typescript',
    level: 0,
    title: 'Setup & Hello World',
    timeEstimate: '0.5-1 hours',
    intro: "Welcome to TypeScript! In this level, you'll verify your local Node.js environment and compile a basic script. Absolute beginners start here.",
    topics: [
      {
        label: 'Node.js Installation',
        url: 'https://nodejs.org/en/download/package-manager',
        note: 'Install the Node.js runtime and npm package manager.'
      },
      {
        label: 'TypeScript Playground',
        url: 'https://www.typescriptlang.org/play',
        note: 'Write and compile TypeScript directly in the browser.'
      }
    ],
    deliverable: 'Verify node --version in your command line and compile your first TS script.',
    checks: [
      {
        kind: 'code',
        id: 'typescript-0-code-1',
        prompt: 'Use the `console.log()` function to output `Hello, World!` to the console.',
        boilerplate: '// Output: Hello, World!\nconsole.log("");\n',
        expectedOutput: 'Hello, World!',
        explanation: 'In JavaScript/TypeScript, `console.log()` is used to print output to the console.'
      },
      {
        kind: 'mcq',
        id: 'typescript-0-mcq-1',
        prompt: 'What is the command line utility used to compile TypeScript files to JavaScript?',
        options: ['tsc', 'ts-node', 'node', 'compile-ts'],
        correctIndex: 0,
        explanation: '`tsc` (TypeScript Compiler) compiles `.ts` files to `.js` files.'
      },
      {
        kind: 'mcq',
        id: 'typescript-0-mcq-2',
        prompt: 'What is the standard file extension used for TypeScript files?',
        options: ['.ts', '.js', '.tscript', '.tsx'],
        correctIndex: 0,
        explanation: 'TypeScript files use the `.ts` extension (or `.tsx` for files containing JSX elements).'
      }
    ]
  },
  // ─── L1: JS Fundamentals reframed in TypeScript ───────────────────────────
  {
    id: 'typescript-1',
    language: 'typescript',
    level: 1,
    title: 'JS Fundamentals, TypeScript Style',
    timeEstimate: '4–6 hours',
    intro: `By the end of this phase, you'll read everyday TypeScript with confidence — primitive types, \`const\`/\`let\`, control flow, function annotations, and the Node CLI shape that wraps it all. You'll also recognise the difference between \`any\`, \`unknown\`, and an inferred type at a glance. To build the muscle, you'll write \`cli/greet.ts\` locally: a \`tsx\`-runnable Node CLI that reads \`process.argv\`, validates the input, and prints a greeting plus ISO timestamp, with zero \`any\` and a green \`tsc --noEmit --strict\`.`,
    video: {
      title: 'TypeScript Tutorial for Beginners',
      youtubeId: 'd56mG7DezGs',
      channelName: 'Programming with Mosh',
      duration: '1 hour',
    },
    topics: [
      {
        label: 'TypeScript in 5 minutes',
        url: 'https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html',
        note: 'Official quick-start — runs in the browser playground',
      },
      {
        label: 'Basic Types',
        url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html',
        note: 'string, number, boolean, arrays, any, unknown',
      },
      {
        label: 'const and let (MDN)',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const',
        note: 'Block scoping and immutability at the variable binding level',
      },
      {
        label: 'Control flow (MDN)',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling',
        note: 'if/else, switch, ternary, short-circuit evaluation',
      },
      {
        label: 'Functions — TypeScript handbook',
        url: 'https://www.typescriptlang.org/docs/handbook/2/functions.html',
        note: 'Parameter and return type annotations, optional params, overloads',
      },
      {
        label: 'process.argv (Node.js docs)',
        url: 'https://nodejs.org/api/process.html#processargv',
        note: 'How to read command-line arguments in a Node CLI',
      },
    ],
    deliverable:
      'Build locally: a `cli/greet.ts` Node CLI (`tsx` or `bun run`) that takes argv name and prints greeting with ISO timestamp. Zero `any` annotations. Passes `tsc --strict`.',
    checks: [
      {
        kind: 'code',
        id: 'typescript-1-code-1',
        prompt: 'Write a function `sumArray` that takes an array of numbers and returns their sum. Print the result of calling `sumArray([10, 20, 30])` to the console.',
        boilerplate: `function sumArray(numbers: number[]): number {\n  // Sum the numbers in the array\n  return 0;\n}\n\nconsole.log(sumArray([10, 20, 30]));\n`,
        expectedOutput: '60',
        explanation: 'Using `.reduce((acc, curr) => acc + curr, 0)` or a `for...of` loop is the standard way to sum values in an array in TypeScript/JavaScript.'
      },
      {
        kind: 'mcq',
        id: 'ts1-mcq1',
        prompt:
          'A teammate ships this CLI helper under `tsc --strict` and `noUncheckedIndexedAccess`. Which line fails to compile?\n```typescript\nfunction greet(argv: string[]): string {\n  const name: string = argv[2];        // L1\n  if (!name) return "Hello, stranger"; // L2\n  return `Hello, ${name}`;             // L3\n}\n```',
        options: [
          'L1 — `argv[2]` is `string | undefined`, not assignable to `string`',
          'L2 — `string` values cannot be used in a boolean condition',
          'L3 — template literals require an explicit `.toString()` call',
          'No error — the code compiles cleanly',
        ],
        correctIndex: 0,
        explanation:
          'With `noUncheckedIndexedAccess`, indexing an array returns `T | undefined` to reflect that the index might be out of bounds. The fix is `const name = argv[2] ?? "stranger"` (or narrow with `if (typeof argv[2] !== "string") ...`). See TS Handbook → tsconfig → noUncheckedIndexedAccess.',
      },
      {
        kind: 'mcq',
        id: 'ts1-mcq2',
        prompt:
          'What is the key difference between `const` and `let` in TypeScript/JavaScript?',
        options: [
          '`const` is block-scoped; `let` is function-scoped',
          '`const` variables cannot be reassigned after declaration; `let` variables can',
          '`const` only works with primitive types',
          'There is no practical difference — both are interchangeable',
        ],
        correctIndex: 1,
        explanation:
          '`const` prevents reassignment of the binding (though object contents can still mutate). Both are block-scoped; `var` is function-scoped. See MDN → Statements/const.',
      },
      {
        kind: 'mcq',
        id: 'ts1-mcq3',
        prompt:
          'What does this code log?\n```typescript\nfunction greet(name: string): string {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("World"));\n```',
        options: [
          '`Hello, ${name}!`',
          '`Hello, World!`',
          '`Hello, World`',
          'TypeError: name is not defined',
        ],
        correctIndex: 1,
        explanation:
          'Template literals (backticks) interpolate `${expr}`. Calling `greet("World")` substitutes the argument and the function returns `Hello, World!`. See MDN → Template literals.',
      },
      {
        kind: 'mcq',
        id: 'ts1-mcq4',
        prompt:
          'Which line type-errors under `tsc --strict`?\n```typescript\nconst nums: number[] = [1, 2, 3]; // L1\nnums.push(4);                     // L2\nnums.push("5");                   // L3\nconst n: number = nums[0];        // L4\n```',
        options: ['L1', 'L2', 'L3', 'L4'],
        correctIndex: 2,
        explanation:
          'L3 fails: `"5"` is a `string`, but `nums` is `number[]`, so `push` requires a `number`. L4 is only a problem with `noUncheckedIndexedAccess`, which is not part of base `strict`.',
      },
      {
        kind: 'mcq',
        id: 'ts1-mcq5',
        prompt:
          'In a Node CLI run with `tsx cli/greet.ts Ada`, what is the value of `process.argv[2]`?',
        options: ['`"cli/greet.ts"`', '`"tsx"`', '`"Ada"`', '`undefined`'],
        correctIndex: 2,
        explanation:
          '`process.argv[0]` is the Node binary, `argv[1]` is the script path, and the first user-supplied argument starts at `argv[2]` — here, `"Ada"`. See Node.js docs → `process.argv`.',
      },
      {
        kind: 'mcq',
        id: 'ts1-mcq6',
        prompt:
          'What is the inferred type of `person` here?\n```typescript\nconst person = ["Alice", 30] as const;\n```',
        options: [
          '`(string | number)[]`',
          '`[string, number]`',
          '`readonly ["Alice", 30]`',
          '`Array<unknown>`',
        ],
        correctIndex: 2,
        explanation:
          '`as const` produces a deeply readonly tuple of literal types, so the inferred type is `readonly ["Alice", 30]`. Without it, TypeScript widens to `(string | number)[]`.',
      },
      {
        kind: 'mcq',
        id: 'typescript-1-mcq-debug-1',
        prompt:
          '> Production logs show:\n> ```\n> TypeError: Cannot read properties of undefined (reading \'name\')\n>   at Object.greet (/app/src/utils/greet.ts:4:21)\n> ```\n> The code:\n> ```typescript\n> export interface User { name: string; }\n>\n> export function greet(user: User | null): string {\n>   return `Hi, ${user.name}`;\n> }\n>\n> greet(null);\n> ```\n> What is the fix?',
        options: [
          'Change the parameter type to `user: User` so `null` is rejected at compile time under `--strict`',
          'Add a null check: `return user ? \`Hi, ${user.name}\` : "Hi, stranger";`',
          'Cast the argument: `greet(null as User)`',
          'Enable `strictNullChecks: false` in tsconfig to allow the call',
        ],
        correctIndex: 1,
        explanation:
          'With `--strict`, `user` is `User | null` so accessing `user.name` without narrowing is a type error that the compiler flags — but only if you do not cast or disable checks. The runtime crash confirms the null was passed. The correct fix is to guard before accessing the property: `user ? \`Hi, ${user.name}\` : "Hi, stranger"`. Rejecting `null` at the call site (option A) is also valid if the API contract should forbid null, but the existing code is meant to handle it.',
      },
      {
        kind: 'mcq',
        id: 'typescript-1-mcq-debug-2',
        prompt:
          '> A CLI script reads a numeric argument and behaves unexpectedly:\n> ```typescript\n> const raw = process.argv[2];   // "abc"\n> const n = Number(raw);\n> console.log(n + 1);            // logs NaN\n> ```\n> The user passed `"abc"` by mistake. Which guard is the correct fix?',
        options: [
          '`if (n === NaN) { ... }` — compare with `NaN` directly',
          '`if (!n) { ... }` — falsy check catches `NaN` and `0`',
          '`if (Number.isNaN(n)) { console.error("Expected a number"); process.exit(1); }`',
          '`if (typeof n !== "number") { ... }` — `typeof NaN` is `"number"` so this never fires',
        ],
        correctIndex: 2,
        explanation:
          '`NaN !== NaN` is true in JavaScript, so `=== NaN` always returns `false`. A falsy check catches `NaN` but also incorrectly rejects `0`. `typeof NaN` is `"number"`, so a `typeof` guard misses it entirely. The correct API is `Number.isNaN(n)`, which returns `true` only for the actual `NaN` value.',
      },
      {
        kind: 'mcq',
        id: 'typescript-1-mcq-debug-3',
        prompt:
          '> A loop is supposed to print indices 1 through 5 but the last value is missing:\n> ```typescript\n> const items = ["a", "b", "c", "d", "e"];\n> for (let i = 1; i < items.length; i++) {\n>   console.log(i, items[i]);\n> }\n> // Output: 1 b, 2 c, 3 d, 4 e   (index 0 / "a" never printed)\n> ```\n> What is the bug?',
        options: [
          'The loop should use `i <= items.length` as the condition',
          'The loop initialiser starts at `i = 1`, skipping index 0 and the first element `"a"`',
          '`items.length` is off-by-one because TypeScript uses 1-based arrays',
          'The loop body should use `items[i - 1]` to compensate for 1-based indexing',
        ],
        correctIndex: 1,
        explanation:
          'JavaScript arrays are 0-indexed. Starting `i` at `1` skips `items[0]` ("a"). The fix is `for (let i = 0; i < items.length; i++)`. TypeScript does not change array indexing — it is always 0-based like JavaScript.',
      },
    ],
  },

  // ─── L2: TypeScript Type System Core ──────────────────────────────────────
  {
    id: 'typescript-2',
    language: 'typescript',
    level: 2,
    title: 'The TypeScript Type System',
    timeEstimate: '5–8 hours',
    intro: `By the end of this phase, you'll read structural types fluently — TypeScript's type system is structural, not nominal, meaning types are compatible when their shapes match, regardless of declarations. You'll learn interfaces, type aliases, unions and intersections, literal types, and the narrowing patterns (\`typeof\`, \`in\`, discriminated unions) that turn runtime checks into compile-time guarantees. You'll also pick up the \`map\`/\`filter\`/\`reduce\` element-type inference that powers most real codebases. To build the muscle, you'll write \`cart.ts\` locally: a small e-commerce cart with \`Product\`/\`CartItem\`/\`Cart\` types, an exhaustively-checked \`PaymentMethod\` discriminated union, and a \`total()\` function — all under \`tsc --noEmit --strict\`.`,
    topics: [
      {
        label: 'Interfaces',
        url: 'https://www.typescriptlang.org/docs/handbook/2/objects.html',
        note: 'Object shapes, optional/readonly properties, index signatures',
      },
      {
        label: 'Structural Typing',
        url: 'https://www.typescriptlang.org/docs/handbook/type-compatibility.html',
        note: 'Understanding shape-based type compatibility (structural vs nominal systems)',
      },
      {
        label: 'Type Aliases',
        url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases',
        note: 'When to use `type` vs `interface`',
      },
      {
        label: 'Union and Intersection Types',
        url: 'https://www.typescriptlang.org/docs/handbook/2/types-from-types.html',
        note: '`A | B` vs `A & B` — modeling real discriminated unions',
      },
      {
        label: 'Narrowing and Type Guards',
        url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html',
        note: 'typeof, instanceof, in, assertion functions, exhaustiveness checks',
      },
      {
        label: 'Literal Types',
        url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types',
        note: '"red" | "green" | "blue" — turning strings into type-safe enums',
      },
      {
        label: 'Array methods (MDN)',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
        note: 'map, filter, reduce, flatMap — TypeScript infers element types automatically',
      },
    ],
    deliverable:
      'Build locally: a `cart.ts` Node CLI with `Product`, `CartItem`, and `Cart` types, a `total()` function, and a discriminated union for `PaymentMethod`. Prints a receipt to stdout. Zero `any`.',
    checks: [
      {
        kind: 'mcq',
        id: 'ts2-mcq1',
        prompt:
          'Given `type Result = { ok: true; value: number } | { ok: false; error: string }`, what TypeScript feature does this demonstrate?',
        options: [
          'Intersection type',
          'Discriminated union',
          'Mapped type',
          'Conditional type',
        ],
        correctIndex: 1,
        explanation:
          'A discriminated union uses a common literal property (`ok`) as the discriminant. TypeScript narrows the type after a check like `if (result.ok)`. See TS Handbook → Narrowing → Discriminated unions.',
      },
      {
        kind: 'mcq',
        id: 'ts2-mcq2',
        prompt:
          'Which expression correctly narrows `unknown` to `string` in TypeScript?',
        options: [
          '`if (x.isString())`',
          '`if (typeof x === "string")`',
          '`if (x instanceof String)`',
          '`if (x as string)`',
        ],
        correctIndex: 1,
        explanation:
          '`typeof x === "string"` is a type guard that narrows `unknown` to `string` in the true branch. `instanceof String` matches only boxed `String` objects, not primitives, and `x as string` is an unchecked assertion.',
      },
      {
        kind: 'mcq',
        id: 'ts2-mcq3',
        prompt:
          'What does this code log?\n```typescript\ntype Shape =\n  | { kind: "circle"; radius: number }\n  | { kind: "square"; side: number };\n\nfunction area(shape: Shape): number {\n  switch (shape.kind) {\n    case "circle": return Math.PI * shape.radius ** 2;\n    case "square": return shape.side ** 2;\n  }\n}\n\nconsole.log(area({ kind: "square", side: 4 }));\n```',
        options: ['`8`', '`16`', '`12.566...`', '`NaN`'],
        correctIndex: 1,
        explanation:
          'The square branch returns `4 ** 2 === 16`. The switch on `shape.kind` is an exhaustiveness check — the discriminant narrows `shape` so `.side` is type-safe.',
      },
      {
        kind: 'mcq',
        id: 'ts2-mcq4',
        prompt:
          'What is the inferred type of `result`?\n```typescript\nconst nums = [1, 2, 3, 4, 5, 6];\nconst result = nums.filter(n => n % 2 === 0).map(n => n * 2);\n```',
        options: ['`unknown[]`', '`number[]`', '`(number | undefined)[]`', '`Array<{ value: number }>`'],
        correctIndex: 1,
        explanation:
          'TypeScript infers `nums` as `number[]`. `filter` preserves the element type and `map(n => n * 2)` returns `number`, so `result` is `number[]`. See MDN → Array.prototype.map.',
      },
      {
        kind: 'mcq',
        id: 'ts2-mcq5',
        prompt:
          'Which line type-errors?\n```typescript\ninterface User { id: number; name: string }\nconst a: User = { id: 1, name: "Ada" };          // L1\nconst b: Readonly<User> = { id: 2, name: "Bo" }; // L2\nb.name = "Bee";                                  // L3\na.id = 99;                                       // L4\n```',
        options: ['L1', 'L2', 'L3', 'L4'],
        correctIndex: 2,
        explanation:
          '`Readonly<User>` makes every property `readonly`, so reassigning `b.name` (L3) is a compile error. `a` is a mutable `User`, so L4 is allowed.',
      },
      {
        kind: 'mcq',
        id: 'ts2-mcq6',
        prompt:
          'What is the inferred type of `x` inside the `if` block?\n```typescript\nfunction handle(value: string | number) {\n  if (typeof value === "string") {\n    const x = value;\n    // x is here\n  }\n}\n```',
        options: ['`string | number`', '`string`', '`number`', '`never`'],
        correctIndex: 1,
        explanation:
          'The `typeof` type guard narrows `value` to `string` inside the truthy branch, so `x` is inferred as `string`. See TS Handbook → Narrowing.',
      },
      {
        kind: 'mcq',
        id: 'typescript-2-mcq-debug-1',
        prompt:
          '> Runtime error in production:\n> ```\n> TypeError: Cannot read properties of undefined (reading \'email\')\n>   at displayUser (/app/src/user.ts:8:30)\n> ```\n> The code:\n> ```typescript\n> interface User { id: number; name: string; email: string; }\n>\n> const users: User[] = [\n>   { id: 1, name: "Ada", email: "ada@example.com" },\n>   { id: 2, name: "Bo",  email: "bo@example.com"  },\n> ];\n>\n> function displayUser(id: number): string {\n>   const user = users.find(u => u.id === id);\n>   return user.email;   // line 8\n> }\n>\n> displayUser(99);\n> ```\n> What is the root cause and correct fix?',
        options: [
          '`Array.find()` throws when no match is found; wrap in a try/catch',
          '`Array.find()` returns `T | undefined`; access `.email` without a null check causes the crash when `id` 99 is not in the array',
          'The `users` array should be typed as `User[] | undefined` to allow empty lookups',
          'Use `users.filter()` instead; it never returns `undefined`',
        ],
        correctIndex: 1,
        explanation:
          '`Array.prototype.find()` returns `T | undefined` — `undefined` when no element matches. Under `--strict`, TypeScript flags `user.email` as a potential error because `user` could be `undefined`. The fix is to narrow first: `if (!user) throw new Error(\`User ${id} not found\`); return user.email;` or use optional chaining with a fallback.',
      },
      {
        kind: 'mcq',
        id: 'typescript-2-mcq-debug-2',
        prompt:
          '> The following code compiles but produces unexpected output:\n> ```typescript\n> interface Config { host: string; port?: number; }\n>\n> function buildUrl(cfg: Config): string {\n>   return `${cfg.host}:${cfg.port?.toString()}`;\n> }\n>\n> console.log(buildUrl({ host: "localhost" }));\n> // Output: "localhost:undefined"\n> ```\n> What is wrong and how should it be fixed?',
        options: [
          'Remove the optional chain `?.` — it is not valid on a `number` type',
          'The optional chain silences the TypeScript error but at runtime `cfg.port` is `undefined`, so `undefined.toString()` is never called and the template literal coerces it to the string `"undefined"`; use a fallback: `` `${cfg.host}${cfg.port !== undefined ? `:${cfg.port}` : ""}` ``',
          'Change `port?: number` to `port: number | null` — `null` serialises to `"null"` instead of `"undefined"`',
          'Use `cfg.port!.toString()` to assert that `port` is always defined',
        ],
        correctIndex: 1,
        explanation:
          'Optional chaining (`?.`) short-circuits to `undefined` when `cfg.port` is absent — it does not remove the property from the template. The template literal then coerces `undefined` to the string `"undefined"`. The idiomatic fix is a conditional interpolation: `` `${cfg.host}${cfg.port !== undefined ? `:${cfg.port}` : ""}` ``.',
      },
      {
        kind: 'mcq',
        id: 'typescript-2-mcq-debug-3',
        prompt:
          '> Code review comment: "This discriminated union exhaustiveness check is broken."\n> ```typescript\n> type Shape =\n>   | { kind: "circle";   radius: number }\n>   | { kind: "square";   side: number }\n>   | { kind: "triangle"; base: number; height: number };\n>\n> function area(shape: Shape): number {\n>   if (shape.kind === "circle") return Math.PI * shape.radius ** 2;\n>   if (shape.kind === "square") return shape.side ** 2;\n>   // triangle accidentally omitted\n>   return 0;\n> }\n> ```\n> Which change makes TypeScript report a compile error if a new `Shape` variant is added but not handled?',
        options: [
          'Add `as const` to the `Shape` type alias',
          'Add a default branch that passes `shape` to a function typed `(x: never) => never`; TypeScript will error if `shape` is not `never` there',
          'Annotate the return type as `number | undefined` so missing cases return `undefined`',
          'Use `switch (shape.kind)` instead of `if` chains — switches are inherently exhaustive',
        ],
        correctIndex: 1,
        explanation:
          'The exhaustiveness trick is an `assertNever` helper: `function assertNever(x: never): never { throw new Error("Unhandled case: " + (x as any).kind); }`. Place `return assertNever(shape)` in the final else/default. After narrowing all known variants, `shape` must be `never`; if a new variant is added without a handler, `shape` still has that type, and assigning a non-`never` value to a `never` parameter is a compile error.',
      },
      {
        kind: 'mcq',
        id: 'ts2-mcq7',
        prompt:
          'Under TypeScript\'s structural typing rules, which of the following assignments is valid without an explicit cast?',
        options: [
          'Assigning an object of shape `{ name: string; age: number }` to a variable typed as `{ name: string }`',
          'Assigning an object of shape `{ name: string }` to a variable typed as `{ name: string; age: number }`',
          'Assigning an object of shape `{ age: number }` to a variable typed as `{ name: string }`',
          'Only objects created from the same class or interface can be assigned to each other',
        ],
        correctIndex: 0,
        explanation:
          'TypeScript\'s structural type system compares the shapes of types. Since `{ name: string; age: number }` contains all the required properties of `{ name: string }` (and they are compatible types), it is assignable. The reverse is not true because the `age` property would be missing.',
      },
      {
        kind: 'code',
        id: 'typescript-2-code-1',
        prompt: 'Implement type narrowing for the `Shape` discriminated union to calculate the area of a square.',
        boilerplate: `type Shape =\n  | { kind: 'circle'; radius: number }\n  | { kind: 'square'; side: number };\n\nfunction getArea(shape: Shape): number {\n  if (shape.kind === 'circle') {\n    return Math.PI * shape.radius * shape.radius;\n  }\n  // TODO: Return the area of the square\n  return 0;\n}\n\nconsole.log(getArea({ kind: 'square', side: 5 }));\n`,
        expectedOutput: '25',
        explanation: 'TypeScript uses the `kind` property to narrow the union type down to `Square`, letting you safely access the `side` property.'
      },
    ],
  },

  // ─── L3: Modules, Async, Fetch ────────────────────────────────────────────
  {
    id: 'typescript-3',
    language: 'typescript',
    level: 3,
    title: 'Modules, Async/Await & Error Handling',
    timeEstimate: '6–8 hours',
    intro: `By the end of this phase, you'll read async TypeScript with confidence — ES module imports, \`Promise<T>\` typing, \`async\`/\`await\` flow, fetch with \`AbortController\` timeouts, and \`Result\`-style discriminated unions for errors that never \`throw\`. You'll also recognise the difference between \`Promise.all\` and \`Promise.allSettled\` and when each is the right tool. To build the muscle, you'll write \`fetcher.ts\` locally: a CLI that fetches a URL with a 1s abort timeout, narrows the \`Result\` union, parses JSON, and prints top-level keys — runnable via \`tsx fetcher.ts <url>\`.`,
    topics: [
      {
        label: 'ES Modules in TypeScript',
        url: 'https://www.typescriptlang.org/docs/handbook/2/modules.html',
        note: 'import/export, type-only imports, module resolution strategies',
      },
      {
        label: 'TypeScript Target Environments & lib.d.ts',
        url: 'https://www.typescriptlang.org/tsconfig#lib',
        note: 'Configuring compilation targets and environment globals (lib.dom.d.ts vs @types/node)',
      },
      {
        label: 'Async/Await handbook',
        url: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-7.html',
        note: 'async functions, await, Promise<T> typing',
      },
      {
        label: 'Using Fetch (MDN)',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch',
        note: 'fetch(), Response.json(), typed with generics',
      },
      {
        label: 'AbortController (MDN)',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/AbortController',
        note: 'Cancellation tokens for fetch and other long-running APIs',
      },
      {
        label: 'tsconfig reference',
        url: 'https://www.typescriptlang.org/tsconfig',
        note: 'strict, target, module, moduleResolution — the settings that matter most',
      },
      {
        label: 'Iterators and Generators (MDN)',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators',
        note: 'function*, yield, Symbol.iterator, async generators',
      },
    ],
    deliverable:
      'Build locally: a `fetcher.ts` CLI that fetches a URL, parses JSON, prints top-level keys, with proper error handling and `AbortController` timeout.',
    checks: [
      {
        kind: 'mcq',
        id: 'ts3-mcq1',
        prompt: 'What does `async function fetchUser(): Promise<User>` mean?',
        options: [
          'The function runs synchronously and returns a `User`',
          'The function returns a `Promise` that resolves to a `User` when awaited',
          'The function accepts a `Promise<User>` as its argument',
          'TypeScript will throw if the return type is not `User`',
        ],
        correctIndex: 1,
        explanation:
          'An `async` function always returns a `Promise`. The annotation `Promise<User>` tells TypeScript what the resolved value type will be. See TS Handbook release notes — TS 1.7 async/await.',
      },
      {
        kind: 'mcq',
        id: 'ts3-mcq2',
        prompt:
          'You need to fetch three URLs in parallel and surface a per-URL status report — even if some fail. Which call shape is correct?\n```typescript\ntype Outcome = { url: string; ok: boolean; status?: number };\nasync function audit(urls: string[]): Promise<Outcome[]> {\n  // ?\n}\n```',
        options: [
          '`await Promise.all(urls.map(u => fetch(u)))` — rejects the whole batch on the first failure',
          '`await Promise.allSettled(urls.map(u => fetch(u)))` — resolves a per-URL `{ status: "fulfilled" | "rejected" }` array',
          '`await Promise.race(urls.map(u => fetch(u)))` — resolves with the first response and aborts the others',
          '`await Promise.any(urls.map(u => fetch(u)))` — rejects only when every URL fails',
        ],
        correctIndex: 1,
        explanation:
          '`Promise.allSettled` is the right tool when you want per-input outcomes regardless of individual failures. `Promise.all` short-circuits on the first rejection, `Promise.race` and `Promise.any` only return a single result. See MDN → Promise.allSettled.',
      },
      {
        kind: 'mcq',
        id: 'ts3-mcq3',
        prompt:
          'What does this code log?\n```typescript\ntype Result<T, E> = { ok: true; value: T } | { ok: false; error: E };\n\nfunction safeDiv(a: number, b: number): Result<number, string> {\n  if (b === 0) return { ok: false, error: "Division by zero" };\n  return { ok: true, value: a / b };\n}\n\nconst r = safeDiv(10, 0);\nif (!r.ok) console.log(r.error);\n```',
        options: [
          '`5`',
          '`Division by zero`',
          '`undefined`',
          'TypeError: Cannot read property',
        ],
        correctIndex: 1,
        explanation:
          'The dividend `b === 0` triggers the error variant. After `if (!r.ok)`, TypeScript narrows `r` to `{ ok: false; error: string }`, so `r.error` is accessible and logs `Division by zero`.',
      },
      {
        kind: 'mcq',
        id: 'ts3-mcq4',
        prompt:
          'Which Promise pattern is correct for a 1-second fetch timeout using `AbortController`?',
        options: [
          '`setTimeout(() => fetch(url).cancel(), 1000);`',
          '`const c = new AbortController(); setTimeout(() => c.abort(), 1000); fetch(url, { signal: c.signal });`',
          '`fetch(url, { timeout: 1000 });`',
          '`Promise.race([fetch(url), 1000]);`',
        ],
        correctIndex: 1,
        explanation:
          'Pass `controller.signal` to `fetch` and call `controller.abort()` after the timeout. `fetch()` does not have a `timeout` option natively, and `Promise.race` against a number is a type error. See MDN → AbortController.',
      },
      {
        kind: 'mcq',
        id: 'ts3-mcq5',
        prompt:
          'What does this generator log?\n```typescript\nfunction* range(start: number, end: number): Generator<number> {\n  while (start < end) yield start++;\n}\nconsole.log(JSON.stringify([...range(1, 6)]));\n```',
        options: ['`[1,2,3,4,5]`', '`[1,2,3,4,5,6]`', '`[2,3,4,5,6]`', '`[]`'],
        correctIndex: 0,
        explanation:
          '`range(1, 6)` yields integers while `start < end` (exclusive of `end`). The spread collects `1,2,3,4,5`. See MDN → Iterators and generators.',
      },
      {
        kind: 'mcq',
        id: 'ts3-mcq6',
        prompt:
          'Which import is erased entirely at compile time and is required when bundlers like esbuild are running with `isolatedModules`?',
        options: [
          '`import { Foo } from "./foo";`',
          '`import type { Foo } from "./foo";`',
          '`import("./foo");`',
          '`require("./foo");`',
        ],
        correctIndex: 1,
        explanation:
          '`import type` is purely a type-level import and is stripped during transpilation. This is critical for single-file transpilers that cannot resolve whether an import is used as a type or a value. See TS 3.8 release notes.',
      },
      {
        kind: 'mcq',
        id: 'typescript-3-mcq-debug-1',
        prompt:
          '> Node process exits with an unhandled rejection and no useful error message:\n> ```\n> node:internal/process/promises:391\n>   triggerUncaughtException(err, true /* fromPromise */);\n> UnhandledPromiseRejection: FetchError: request to https://api.example.com/data failed\n> ```\n> The code:\n> ```typescript\n> async function loadData(): Promise<void> {\n>   const res = await fetch("https://api.example.com/data");\n>   const json = await res.json();\n>   console.log(json);\n> }\n>\n> loadData();\n> ```\n> What is missing?',
        options: [
          'A `.then()` handler — `async/await` does not catch network errors',
          'The call `loadData()` returns a Promise that is never `.catch()`-ed or `await`-ed at the top level, so rejections are unhandled; wrap in `loadData().catch(console.error)` or use a top-level `try/catch` inside an `async` IIFE',
          'Add `"use strict"` at the top of the file to enable Promise error propagation',
          'Replace `await res.json()` with `JSON.parse(await res.text())` to surface parse errors',
        ],
        correctIndex: 1,
        explanation:
          'Calling an `async` function without `await` or a `.catch()` handler means any rejection silently becomes an `UnhandledPromiseRejection`. The fix is either `await loadData()` inside another async context, `loadData().catch(err => { console.error(err); process.exit(1); })`, or a top-level `try/catch` inside an async IIFE: `(async () => { try { await loadData(); } catch (e) { console.error(e); } })();`.',
      },
      {
        kind: 'mcq',
        id: 'typescript-3-mcq-debug-2',
        prompt:
          '> A CLI tool hangs indefinitely when the remote server is slow:\n> ```typescript\n> import fetch from "node-fetch";\n>\n> async function fetchWithTimeout(url: string): Promise<unknown> {\n>   const res = await fetch(url);\n>   return res.json();\n> }\n> ```\n> The server at `url` accepts the TCP connection but never sends a response. What is the fix?',
        options: [
          'Set `res.timeout = 5000` on the response object after `await fetch()`',
          'Wrap in `Promise.race([fetch(url), new Promise((_, r) => setTimeout(() => r(new Error("timeout")), 5000))])` — this is the recommended pattern',
          'Pass an `AbortController` signal to `fetch`: create `const ac = new AbortController(); setTimeout(() => ac.abort(), 5000);` then `fetch(url, { signal: ac.signal })`',
          'Use `fetch(url, { timeout: 5000 })` — the Fetch API accepts a `timeout` option',
        ],
        correctIndex: 2,
        explanation:
          'The Fetch API does not have a built-in `timeout` option. The standard approach is `AbortController`: create a controller, schedule `controller.abort()` after a deadline, and pass `{ signal: controller.signal }` to `fetch`. When the abort fires, fetch rejects with an `AbortError`. `Promise.race` with a timer works but does not cancel the underlying request, wasting connections.',
      },
      {
        kind: 'mcq',
        id: 'typescript-3-mcq-debug-3',
        prompt:
          '> A function crashes at runtime with:\n> ```\n> SyntaxError: Unexpected token u in JSON at position 0\n> ```\n> The code:\n> ```typescript\n> function parseConfig(raw: unknown): { port: number } {\n>   return JSON.parse(raw as string);\n> }\n>\n> parseConfig(undefined);\n> ```\n> What is the root cause and the correct fix?',
        options: [
          '`JSON.parse` only accepts `Buffer`; convert with `Buffer.from(raw).toString()` first',
          '`raw` is cast to `string` with `as string` which bypasses TypeScript\'s type check, but `undefined` is still `undefined` at runtime; `JSON.parse(undefined)` converts it to the string `"undefined"` which is invalid JSON. Fix: validate before parsing — `if (typeof raw !== "string") throw new TypeError("Expected a string"); return JSON.parse(raw);`',
          'Replace `as string` with `String(raw)` — `String(undefined)` returns `"undefined"` which is valid JSON',
          'Wrap in a try/catch and return a default value on parse failure',
        ],
        correctIndex: 1,
        explanation:
          '`as string` is a compile-time-only assertion; it does not convert the value at runtime. `JSON.parse` coerces its argument with `String()`, turning `undefined` into `"undefined"`, which is not valid JSON — hence the `SyntaxError`. The correct fix is to guard the type before calling `JSON.parse`: `if (typeof raw !== "string") throw new TypeError(...)`. Using `String(raw)` would produce the same bad input.',
      },
      {
        kind: 'mcq',
        id: 'ts3-mcq7',
        prompt:
          'How does TypeScript resolve global variables like `window` in the browser or `process` in Node.js?',
        options: [
          'Through the `lib` configuration in `tsconfig.json` (for browser globals like `window`) and type declarations like `@types/node` (for Node.js globals like `process`)',
          'TypeScript automatically includes both browser and Node.js globals by default in every environment',
          'Global variables are always treated as `any` and cannot be strictly checked',
          'By importing them explicitly from the `"typescript"` core package',
        ],
        correctIndex: 0,
        explanation:
          'TypeScript relies on environment-specific type declarations. Browser globals are provided by the built-in `lib.dom.d.ts` (configured via `lib` in `tsconfig.json`), whereas Node.js globals require installing the `@types/node` package.',
      },
      {
        kind: 'code',
        id: 'typescript-3-code-1',
        prompt: 'Use `async/await` to resolve and log the message returned by the asynchronous `fetchData` function.',
        boilerplate: `async function fetchData(): Promise<string> {\n  return new Promise((resolve) => {\n    setTimeout(() => resolve("Data loaded!"), 10);\n  });\n}\n\nasync function run() {\n  // TODO: Await the call to fetchData() and store the result in the 'result' variable\n  const result = "";\n  console.log(result);\n}\nrun();\n`,
        expectedOutput: 'Data loaded!',
        explanation: 'The `await` keyword pauses execution of the async function until the promise resolves, allowing you to work with the asynchronous value like a synchronous one.'
      },
    ],
  },

  // ─── L4: Generics & Utility Types ─────────────────────────────────────────
  {
    id: 'typescript-4',
    language: 'typescript',
    level: 4,
    title: 'Generics, Utility Types & Testing',
    timeEstimate: '8–10 hours',
    intro: `By the end of this phase, you'll read generic library code with confidence — \`<T extends ...>\` constraints, \`const T\` for literal inference, mapped types, conditional types with \`infer\`, and the utility-type vocabulary (\`Partial\`, \`Pick\`, \`Omit\`, \`Record\`, \`ReturnType\`, \`Parameters\`, \`NonNullable\`). You'll also recognise when widening hurts you and how \`satisfies\` keeps inference narrow. To build the muscle, you'll write \`db.ts\` locally: a typed in-memory store with \`add<T>\`/\`find<T>\`/\`delete<T>\`, plus a Vitest suite that covers the happy path and the not-found case via \`pnpm vitest\`.`,
    topics: [
      {
        label: 'Generics — TypeScript handbook',
        url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html',
        note: 'Generic functions, classes, constraints, default type parameters',
      },
      {
        label: 'Mapped Types',
        url: 'https://www.typescriptlang.org/docs/handbook/2/mapped-types.html',
        note: '`{ [K in keyof T]: ... }` — transforming shapes at the type level',
      },
      {
        label: 'Conditional Types',
        url: 'https://www.typescriptlang.org/docs/handbook/2/conditional-types.html',
        note: '`T extends U ? X : Y` — type-level branching and `infer`',
      },
      {
        label: 'Utility Types reference',
        url: 'https://www.typescriptlang.org/docs/handbook/utility-types.html',
        note: 'Partial, Required, Readonly, Pick, Omit, Record, NonNullable, ReturnType…',
      },
      {
        label: 'Vitest — Getting Started',
        url: 'https://vitest.dev/guide/',
        note: 'Fast ESM-native test runner; works seamlessly with TypeScript',
      },
      {
        label: 'React + TypeScript Quick Start',
        url: 'https://react.dev/learn/typescript',
        note: 'Official guide: typing props, hooks, events in React 19',
      },
    ],
    deliverable:
      'Build locally: a generic `db.ts` typed wrapper around an in-memory store with `add<T>`, `find<T>`, `delete<T>` and full type narrowing. Vitest unit tests cover the happy path and the `not found` case.',
    checks: [
      {
        kind: 'mcq',
        id: 'ts4-mcq1',
        prompt:
          'You are designing a typed `getProp` library helper. What signature makes the third call below a compile error?\n```typescript\nfunction getProp<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\nconst user = { name: "Ada", age: 36 };\ngetProp(user, "name");    // ok → string\ngetProp(user, "age");     // ok → number\ngetProp(user, "missing"); // ?\n```',
        options: [
          'The third call compiles — `"missing"` widens to `string`',
          'The third call type-errors — `"missing"` is not assignable to `"name" | "age"`',
          'The third call returns `undefined` at runtime with no type error',
          'The signature is invalid — `T[K]` is not valid syntax',
        ],
        correctIndex: 1,
        explanation:
          '`K extends keyof T` constrains `K` to the literal union of `T`\'s keys. For `user`, that is `"name" | "age"`, so `"missing"` is rejected at compile time. `T[K]` is an indexed-access type and is the correct return shape. See TS Handbook → Keyof Type Operator and Indexed Access Types.',
      },
      {
        kind: 'mcq',
        id: 'ts4-mcq2',
        prompt:
          'You are writing a React `<Settings>` form that mutates a typed config one field at a time via a typed `update()` helper. Which utility correctly types the `patch` argument?\n```typescript\ninterface Config { theme: "light" | "dark"; volume: number; muted: boolean }\nfunction update(current: Config, patch: ___<Config>): Config {\n  return { ...current, ...patch };\n}\nupdate(cfg, { volume: 80 }); // must compile\nupdate(cfg, {});             // must compile (no-op merge)\n```',
        options: ['`Required<Config>`', '`Partial<Config>`', '`Readonly<Config>`', '`Pick<Config, "volume">`'],
        correctIndex: 1,
        explanation:
          '`Partial<T>` maps every property of `T` to its optional (`?`) equivalent — the canonical "patch" shape for partial-update helpers and `setState` reducers. `Required<T>` does the opposite, `Readonly<T>` blocks reassignment, and `Pick` locks you to one key. See TS Handbook → Utility Types.',
      },
      {
        kind: 'mcq',
        id: 'ts4-mcq3',
        prompt:
          'What does this code log?\n```typescript\nfunction first<T>(arr: readonly T[]): T | undefined {\n  return arr[0];\n}\n\nconsole.log(first([10, 20, 30]));\nconsole.log(first<number>([]));\n```',
        options: [
          '`10\\n0`',
          '`10\\nundefined`',
          '`undefined\\nundefined`',
          'Compile error: cannot index empty array',
        ],
        correctIndex: 1,
        explanation:
          '`arr[0]` for `[10,20,30]` is `10`. For an empty array, indexing returns `undefined`. The return type `T | undefined` reflects this.',
      },
      {
        kind: 'mcq',
        id: 'ts4-mcq4',
        prompt:
          'Which generic constraint correctly limits `T` to objects that have a `length: number` property?',
        options: [
          '`function len<T>(x: T): number`',
          '`function len<T extends number>(x: T): number`',
          '`function len<T extends { length: number }>(x: T): number`',
          '`function len<T: { length: number }>(x: T): number`',
        ],
        correctIndex: 2,
        explanation:
          '`T extends { length: number }` is the standard generic constraint syntax — `T` must be assignable to the constraint shape. Flow-style `T: {…}` is not valid TypeScript.',
      },
      {
        kind: 'mcq',
        id: 'ts4-mcq5',
        prompt:
          'You write a `toPublic()` serializer that must strip sensitive fields before returning a user to an API client. Which utility-type pair correctly enforces "no `password` or `passwordHash` leaks the function"?\n```typescript\ntype User = { id: number; name: string; email: string; password: string; passwordHash: string };\ntype PublicUser = ___<User, "password" | "passwordHash">;\nfunction toPublic(u: User): PublicUser {\n  const { password, passwordHash, ...rest } = u;\n  return rest;\n}\n```',
        options: [
          '`Pick` — selects only `password` and `passwordHash`',
          '`Omit` — returns `User` minus `password` and `passwordHash`',
          '`Partial` — makes the listed keys optional but still present',
          '`Required` — has no effect on field membership',
        ],
        correctIndex: 1,
        explanation:
          '`Omit<T, K>` removes the named keys, producing exactly the public shape the API contract requires. `Pick` would be the inverse (selecting only those keys). This pattern is everywhere in real backends — DB rows in, response DTOs out. See TS Handbook → Utility Types.',
      },
      {
        kind: 'mcq',
        id: 'ts4-mcq6',
        prompt:
          'What is the inferred return type?\n```typescript\nfunction wrap<const T>(value: T) {\n  return { value } satisfies { value: T };\n}\nconst r = wrap("hello");\n```',
        options: [
          '`{ value: string }`',
          '`{ value: "hello" }`',
          '`{ value: any }`',
          '`{ value: unknown }`',
        ],
        correctIndex: 1,
        explanation:
          'The `const` type parameter (TS 5.0) tells TypeScript to infer `T` as the narrowest literal type — `"hello"` rather than the widened `string`. `satisfies` validates the shape without widening.',
      },
      {
        kind: 'mcq',
        id: 'typescript-4-mcq-debug-1',
        prompt:
          '> A settings update function silently drops the `theme` field:\n> ```typescript\n> interface Config {\n>   theme: "light" | "dark";\n>   language: string;\n>   notifications: boolean;\n> }\n>\n> function applyPatch(current: Config, patch: Partial<Config>): Config {\n>   return { ...current, ...patch };\n> }\n>\n> const base: Config = { theme: "light", language: "en", notifications: true };\n> const result = applyPatch(base, { language: "fr" });\n> console.log(result.theme); // "light" — correct\n>\n> // Later, a colleague writes:\n> const bad = applyPatch(base, { theme: undefined });\n> console.log(bad.theme); // undefined — runtime error downstream\n> ```\n> Why does `{ theme: undefined }` compile, and what is the safest fix?',
        options: [
          '`Partial<Config>` makes every property optional (`theme?: "light" | "dark"`), which means `undefined` is a valid value; use `Required<Config>` for the patch parameter instead',
          '`Partial<Config>` makes every property `T | undefined`; explicitly passing `undefined` overwrites `theme` in the spread. Fix: filter out `undefined` values before spreading, or use a stricter patch type that omits `undefined`: `type Patch<T> = { [K in keyof T]?: NonNullable<T[K]> }`',
          'The spread operator `{ ...current, ...patch }` always skips `undefined` values, so `bad.theme` should still be `"light"`',
          'Add a runtime `Object.assign` instead of spread — it handles `undefined` differently',
        ],
        correctIndex: 1,
        explanation:
          '`Partial<T>` expands each property to `T[K] | undefined`, so `{ theme: undefined }` is valid. When spread, the explicit `undefined` overwrites the base value, leaving `theme` as `undefined` at runtime. A stricter patch type excludes `undefined` values: `type Patch<T> = { [K in keyof T]?: NonNullable<T[K]> }`. Alternatively, filter the patch before spreading: `const clean = Object.fromEntries(Object.entries(patch).filter(([, v]) => v !== undefined));`.',
      },
      {
        kind: 'mcq',
        id: 'typescript-4-mcq-debug-2',
        prompt:
          '> A generic cache returns `any` instead of the expected type:\n> ```typescript\n> function createCache<T>() {\n>   const store = new Map();\n>   return {\n>     set(key: string, value: T): void { store.set(key, value); },\n>     get(key: string) { return store.get(key); },\n>   };\n> }\n>\n> const cache = createCache<number>();\n> const val = cache.get("x"); // type is `any`, not `number | undefined`\n> ```\n> What is wrong with the `get` method?',
        options: [
          '`Map` must be typed as `Map<string, T>` and `get` must return `T | undefined` — the untyped `new Map()` defaults to `Map<any, any>`, so `get` returns `any`',
          'Add a `return type: T` annotation on `get` — TypeScript infers `any` without it',
          'Use `WeakMap` instead of `Map` to enable generic inference',
          'Call `store.get(key) as T` to cast the return value to the correct type',
        ],
        correctIndex: 0,
        explanation:
          '`new Map()` without a type argument defaults to `Map<any, any>`, so `.get()` returns `any`. Declaring `const store = new Map<string, T>()` constrains the map to the generic `T`, and `.get()` then returns `T | undefined` as expected. Casting with `as T` would suppress the `undefined` case and is unsafe.',
      },
      {
        kind: 'mcq',
        id: 'typescript-4-mcq-debug-3',
        prompt:
          '> A Vitest test fails with an unexpected type error:\n> ```\n> AssertionError: expected { id: 1, name: \'Ada\' } to deeply equal { id: 1, name: \'Ada\', role: \'admin\' }\n> ```\n> The test:\n> ```typescript\n> import { expect, it } from "vitest";\n> import { createUser } from "./db";\n>\n> it("createUser returns an admin user", () => {\n>   const user = createUser({ name: "Ada", role: "admin" });\n>   expect(user).toEqual({ id: 1, name: "Ada", role: "admin" });\n> });\n> ```\n> `createUser` is typed as:\n> ```typescript\n> function createUser(input: Omit<User, "id">): User {\n>   return { id: nextId++, ...input };\n> }\n> ```\n> What is the most likely root cause?',
        options: [
          '`Omit<User, "id">` removes `role` from the input type, so `role` is silently dropped',
          '`createUser` spreads `input` after `id`, so `role` from the input is present in the returned object — the test is checking for `role: "admin"` but `createUser` is returning only `{ id, name }` because the `User` interface does not include a `role` field',
          'Vitest\'s `toEqual` does a reference check, not a deep equality check',
          '`nextId++` increments before returning, so `id` is `2` not `1`',
        ],
        correctIndex: 1,
        explanation:
          'The assertion error shows the actual object lacks `role`. This means the `User` interface does not include a `role` property, so TypeScript accepts `input` typed as `Omit<User, "id">` without `role`. Fix: add `role: string` (or a union) to the `User` interface. `Omit` only removes the listed keys — it does not add new ones. The test is valid; the type definition is incomplete.',
      },
      {
        kind: 'mcq',
        id: 'ts4-mcq7',
        prompt:
          'What is the purpose of the `extends` keyword in a generic type definition like `<T extends { id: string }>`?',
        options: [
          'It constrains the generic type parameter `T` to be a type that is assignable to `{ id: string }`',
          'It makes `T` inherit all methods from the JavaScript `Object` class',
          'It is used to subclass another generic class at runtime',
          'It forces the compiler to treat `T` as a string type only',
        ],
        correctIndex: 0,
        explanation:
          'Generic constraints restrict the types that can be passed to a generic parameter. In this case, any type passed as `T` must be structurally compatible with `{ id: string }`, ensuring the function can safely access `.id` on values of type `T`.',
      },
      {
        kind: 'code',
        id: 'typescript-4-code-1',
        prompt: 'Complete the generic function `wrapData` to return a `ResponseEnvelope` containing the passed data.',
        boilerplate: `interface ResponseEnvelope<T> {\n  status: 'success';\n  data: T;\n}\n\nfunction wrapData<T>(data: T): ResponseEnvelope<T> {\n  // TODO: Return a ResponseEnvelope<T> with status 'success' and the passed data\n  return {\n    status: 'success',\n    data: data\n  };\n}\n\nconsole.log(JSON.stringify(wrapData("hello")));\n`,
        expectedOutput: '{"status":"success","data":"hello"}',
        explanation: 'Generics allow a type to be parameterized. In this case, `ResponseEnvelope<T>` wraps whatever type of `data` is passed to the function, maintaining strict type safety.'
      },
    ],
  },

  // ─── L5: Advanced Type-Level Programming ──────────────────────────────────
  {
    id: 'typescript-5',
    language: 'typescript',
    level: 5,
    title: 'Advanced Types & Type-Level Programming',
    timeEstimate: '10–14 hours',
    intro: `By the end of this phase, you'll read advanced type-level TypeScript with confidence — template literal types, distributive conditionals, variance annotations (\`in\`/\`out\`), \`infer\` extraction, and recursive mapped types like \`DeepPartial\`. You'll also recognise why \`satisfies\` plus \`as const\` produces narrower inference than either alone. To build the muscle, you'll write \`type-lab.ts\` locally: five utilities (\`DeepPartial<T>\`, \`FlattenPromise<T>\`, \`UnionToIntersection<U>\`, \`PathsOf<T>\`, a re-implemented \`Awaited<T>\`) each gated by a \`satisfies\` type test and a runtime \`console.log\` sanity check.`,
    topics: [
      {
        label: 'Template Literal Types',
        url: 'https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html',
        note: '`\`${A}${B}\`` at the type level — powerful string manipulation',
      },
      {
        label: 'Conditional Types deep dive',
        url: 'https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types',
        note: 'Distributive behaviour, `infer`, recursive depth limits',
      },
      {
        label: 'Variance in TypeScript (MS DevBlog)',
        url: 'https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/#variance-annotations',
        note: '`in`/`out` variance markers introduced in TS 4.7',
      },
      {
        label: 'satisfies operator',
        url: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator',
        note: 'Validate against a type without widening — TS 4.9+',
      },
      {
        label: 'const type parameters (TS 5.0)',
        url: 'https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#const-type-parameters',
        note: 'Infer narrowest literal types in generic calls without `as const`',
      },
      {
        label: 'Type challenges (community)',
        url: 'https://github.com/type-challenges/type-challenges',
        note: 'Open-source collection graded easy → extreme; great practice set',
      },
    ],
    deliverable:
      'Build locally: a `type-lab.ts` Node script with five type utilities — `DeepPartial<T>`, `FlattenPromise<T>`, `UnionToIntersection<U>`, `PathsOf<T>`, and a re-implemented `Awaited<T>`. Each utility has a `satisfies`-based type test and a small runtime log.',
    checks: [
      {
        kind: 'mcq',
        id: 'ts5-mcq1',
        prompt:
          'Given `type IsString<T> = T extends string ? true : false`, what is `IsString<"hello" | 42>`?',
        options: [
          '`false` — because the union contains a non-string',
          '`true | false` — distributive conditional processes each member',
          '`true` — `"hello"` satisfies `extends string`',
          '`never` — unions cannot be used with conditional types',
        ],
        correctIndex: 1,
        explanation:
          'When a conditional type is used with a bare type parameter, it distributes over union members. `"hello" extends string → true`; `42 extends string → false`; result is `true | false`.',
      },
      {
        kind: 'mcq',
        id: 'ts5-mcq2',
        prompt:
          'What does `const routes = ["home", "about"] as const satisfies readonly string[]` guarantee that plain `as const` alone does not?',
        options: [
          'The array is frozen at runtime',
          'TypeScript validates that `routes` matches `readonly string[]` while still inferring the narrowest tuple type',
          'The array becomes a `Set` type',
          'It prevents adding duplicate elements',
        ],
        correctIndex: 1,
        explanation:
          '`satisfies` checks the expression against a type constraint without widening the inferred type. You keep the narrow `["home", "about"]` tuple while confirming it is a valid `readonly string[]`.',
      },
      {
        kind: 'mcq',
        id: 'ts5-mcq3',
        prompt:
          'What is the resulting type?\n```typescript\ntype EventName<T extends string> = `on${Capitalize<T>}`;\ntype Click = EventName<"click">;\n```',
        options: ['`"onclick"`', '`"OnClick"`', '`"onClick"`', '`string`'],
        correctIndex: 2,
        explanation:
          '`Capitalize<"click">` is `"Click"`, so the template literal resolves to `"onClick"`. See TS Handbook → Template Literal Types and the intrinsic string manipulation types.',
      },
      {
        kind: 'mcq',
        id: 'ts5-mcq4',
        prompt:
          'Which `infer` pattern correctly extracts the element type of `T`?',
        options: [
          '`type Elem<T> = T extends Array<infer U> ? U : never`',
          '`type Elem<T> = T extends infer U[] ? U : never`',
          '`type Elem<T> = infer U extends T ? U : never`',
          '`type Elem<T> = T extends infer U ? U[] : never`',
        ],
        correctIndex: 0,
        explanation:
          '`T extends Array<infer U> ? U : never` declares an inference site `U` inside the constraint. The form `T extends infer U[]` is invalid syntax — `infer` must appear in a generic position.',
      },
      {
        kind: 'mcq',
        id: 'ts5-mcq5',
        prompt:
          'What does this evaluate to at the type level?\n```typescript\ntype DeepReadonly<T> = {\n  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];\n};\ntype Result = DeepReadonly<{ a: { b: number } }>;\n```',
        options: [
          '`{ a: { b: number } }`',
          '`{ readonly a: { readonly b: number } }`',
          '`{ readonly a: { b: number } }`',
          '`Readonly<{ a: { b: number } }>`',
        ],
        correctIndex: 1,
        explanation:
          'The mapped type adds `readonly` at every level by recursing whenever the property type extends `object`. Both `a` and `b` end up `readonly`.',
      },
      {
        kind: 'mcq',
        id: 'ts5-mcq6',
        prompt:
          'In TypeScript 4.7+, what does the `in` variance annotation in `interface Box<in T> { setValue(v: T): void }` enforce?',
        options: [
          'It marks `T` as covariant',
          'It marks `T` as contravariant (used only in input positions)',
          'It is purely cosmetic and ignored by the checker',
          'It makes the property `in` operator available on instances',
        ],
        correctIndex: 1,
        explanation:
          '`in` marks a type parameter as contravariant. `out` marks it covariant. The compiler verifies the annotation matches actual usage. See TS 4.7 release notes → Variance annotations.',
      },
      {
        kind: 'mcq',
        id: 'typescript-5-mcq-debug-1',
        prompt:
          '> A utility type produces an unexpected result:\n> ```typescript\n> type IsArray<T> = T extends any[] ? true : false;\n>\n> type A = IsArray<string[] | number>;\n> // Expected: false  (the union contains a non-array)\n> // Actual:   boolean  (true | false)\n> ```\n> Why does `IsArray<string[] | number>` evaluate to `boolean` instead of `false`?',
        options: [
          'The `extends any[]` constraint is too broad and matches all types',
          'Distributive conditional types apply the condition to each union member separately: `string[] extends any[] → true`, `number extends any[] → false`, result is `true | false` which is `boolean`; wrap `T` in a tuple to prevent distribution: `type IsArray<T> = [T] extends [any[]] ? true : false`',
          'TypeScript widens `true | false` to `boolean` for all conditional types regardless of distribution',
          'Add `& {}` to the constraint to disable distribution: `T extends any[] & {}`',
        ],
        correctIndex: 1,
        explanation:
          'Distributive conditional types distribute over union members when the checked type is a bare type parameter. `IsArray<string[] | number>` becomes `IsArray<string[]> | IsArray<number>` = `true | false` = `boolean`. To check the whole union at once, wrap in a tuple: `type IsArray<T> = [T] extends [any[]] ? true : false`. Now `[string[] | number] extends [any[]]` is `false` because `string[] | number` is not assignable to `any[]`.',
      },
      {
        kind: 'mcq',
        id: 'typescript-5-mcq-debug-2',
        prompt:
          '> A type utility fails to extract the inner type:\n> ```typescript\n> type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;\n>\n> type A = UnwrapPromise<Promise<string>>;  // string ✓\n> type B = UnwrapPromise<Promise<Promise<number>>>;  // Promise<number>  ✗ expected: number\n> ```\n> How do you make `UnwrapPromise` recursively unwrap nested Promises?',
        options: [
          'Use `T extends Promise<infer U> ? UnwrapPromise<U> : T` — recurse on the inferred `U`',
          'Use `Awaited<T>` — the built-in utility type already handles nested Promises recursively',
          'Both A and B are correct fixes',
          'Add `& Promise<unknown>` to the constraint to force TypeScript to look deeper',
        ],
        correctIndex: 2,
        explanation:
          'Both fixes work. Recursing on `U` (`T extends Promise<infer U> ? UnwrapPromise<U> : T`) unwraps one layer at a time. The built-in `Awaited<T>` (TS 4.5+) does the same thing and also handles non-Promise thenables. For real codebases, prefer `Awaited<T>` from the standard library over a hand-rolled version.',
      },
      {
        kind: 'mcq',
        id: 'typescript-5-mcq-debug-3',
        prompt:
          '> A template-literal type produces a compile error instead of the expected string union:\n> ```typescript\n> type Axis = "x" | "y" | "z";\n> type Getter = `get${Axis}`;\n> // Error: Type \'Axis\' is not assignable to type \'string | number | bigint | boolean | null | undefined\'.\n> ```\n> Why does this error occur, and what is the fix?',
        options: [
          'Template literal types only work with `string` — change `Axis` to `type Axis = string`',
          'The error does not actually occur — template literal types distribute over string unions automatically; `Getter` resolves to `"getx" | "gety" | "getz"`',
          'Capitalize the interpolated type: `` `get${Capitalize<Axis>}` `` to make the identifiers valid',
          'Template literal types require the `--experimentalDecorators` flag to use union interpolation',
        ],
        correctIndex: 1,
        explanation:
          'This error does not actually occur in TypeScript. Template literal types distribute over string literal unions automatically — `\`get${Axis}\`` resolves to `"getx" | "gety" | "getz"`. If you see this error in practice, the type being interpolated is not a `string | number | bigint | boolean | null | undefined` — for example, it might be an object type or `unknown`. Check what `Axis` is actually resolving to at that point.',
      },
      {
        kind: 'code',
        id: 'typescript-5-code-1',
        prompt: 'Implement a custom mapped type `MyReadonly<T>` that makes all properties of `T` readonly.',
        boilerplate: `type MyReadonly<T> = {\n  // TODO: Make all properties of T readonly\n  [P in keyof T]: T[P];\n};\n\ninterface User {\n  name: string;\n}\n\nconst user: MyReadonly<User> = { name: "Alice" };\n// @ts-expect-error - This reassignment must fail to compile\nuser.name = "Bob";\n\nconsole.log(user.name);\n`,
        expectedOutput: 'Alice',
        explanation: 'Mapped types allow you to create new types based on existing ones. By adding the `readonly` modifier in `{ readonly [P in keyof T]: T[P] }`, you make every property immutable.'
      },
    ],
  },

  // ─── L6: Library Authoring ────────────────────────────────────────────────
  {
    id: 'typescript-6',
    language: 'typescript',
    level: 6,
    title: 'Library Authoring & Declaration Files',
    timeEstimate: '8–12 hours',
    intro: `By the end of this phase, you'll read library code with confidence — hand-written \`.d.ts\` files, the \`exports\` field in \`package.json\` (dual ESM/CJS, conditional resolution), \`import type\` erasure, declaration merging, branded nominal types, and the TSDoc tags (\`@deprecated\`, \`@param\`, \`@returns\`) that drive the TS language service. You'll also recognise why \`isolatedModules\` matters for esbuild/swc consumers. To build the muscle, you'll write \`packages/tiny-utils\` locally: a dual-output library with a hand-written \`.d.ts\` entry, TSDoc on every export, and a consumer script verified via \`node --import=tsx consumer.ts\` after \`pnpm build\`.`,
    topics: [
      {
        label: 'Declaration Files (.d.ts)',
        url: 'https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html',
        note: 'Writing, publishing, and consuming .d.ts files',
      },
      {
        label: 'Declaration Merging',
        url: 'https://www.typescriptlang.org/docs/handbook/declaration-merging.html',
        note: 'Augmenting interfaces, modules, and namespaces',
      },
      {
        label: 'Publishing type-safe packages (Microsoft DevBlog)',
        url: 'https://devblogs.microsoft.com/typescript/announcing-typescript-5-5/',
        note: 'TS 5.5 improvements: inferred type predicates, isolated declarations',
      },
      {
        label: 'package.json `exports` field (Node.js docs)',
        url: 'https://nodejs.org/api/packages.html#exports',
        note: 'Dual ESM/CJS publishing, conditional exports, self-referencing',
      },
      {
        label: 'Type-only imports/exports',
        url: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-exports',
        note: '`import type { Foo }` — erased at compile time, required for `isolatedModules`',
      },
      {
        label: 'TSDoc — JSDoc for TypeScript',
        url: 'https://tsdoc.org/',
        note: '@param, @returns, @remarks, @deprecated — read by `tsserver` and any TSDoc-aware lint rule',
      },
    ],
    deliverable:
      'Build locally: a `packages/tiny-utils` library with dual ESM/CJS output, a hand-written `.d.ts` entry, and TSDoc comments on every export. A consumer script demonstrates `import type` usage.',
    checks: [
      {
        kind: 'mcq',
        id: 'ts6-mcq1',
        prompt:
          'What problem does `"isolatedModules": true` in tsconfig protect against?',
        options: [
          'It prevents circular imports between modules',
          'It ensures every file can be type-checked in isolation without cross-file type information, catching patterns that would break tools like esbuild',
          'It bundles all modules into a single output file',
          'It disables the `import()` dynamic import syntax',
        ],
        correctIndex: 1,
        explanation:
          'Tools like esbuild and swc transpile one file at a time without full type context. `isolatedModules` flags patterns (like re-exporting a `const enum`) that rely on cross-file type resolution.',
      },
      {
        kind: 'mcq',
        id: 'ts6-mcq2',
        prompt:
          'In a `package.json` `exports` field, what is the correct condition to serve ESM to `import` statements and CJS to `require()` calls?',
        options: [
          '`"main"` for CJS, `"module"` for ESM (legacy fields)',
          '`"import"` condition for ESM and `"require"` condition for CJS inside `exports`',
          '`"type": "module"` in package.json forces ESM for all consumers',
          '`"browser"` condition handles both',
        ],
        correctIndex: 1,
        explanation:
          'The `exports` field in package.json supports conditional exports: `"import"` matches `import` statements (ESM) and `"require"` matches `require()` calls (CJS). See Node.js docs → packages → exports.',
      },
      {
        kind: 'mcq',
        id: 'ts6-mcq3',
        prompt:
          'What does this code log?\n```typescript\ninterface Logger { log(msg: string): void; }\ninterface Logger { debug(msg: string): void; }\n\nconst logger: Logger = {\n  log(msg) { console.log("[LOG] " + msg); },\n  debug(msg) { console.log("[DEBUG] " + msg); },\n};\n\nlogger.debug("hi");\n```',
        options: [
          '`[LOG] hi`',
          '`[DEBUG] hi`',
          'Compile error: duplicate identifier `Logger`',
          '`undefined`',
        ],
        correctIndex: 1,
        explanation:
          'Two `interface` declarations with the same name in the same scope are *merged*, not duplicated. The merged `Logger` has both `log` and `debug`. See TS Handbook → Declaration Merging.',
      },
      {
        kind: 'mcq',
        id: 'ts6-mcq4',
        prompt:
          'What is the inferred type of `add`?\n```typescript\nfunction memoize<T extends (...args: any[]) => any>(fn: T): T {\n  const cache = new Map<string, ReturnType<T>>();\n  return ((...args: Parameters<T>) => {\n    const key = JSON.stringify(args);\n    if (!cache.has(key)) cache.set(key, fn(...args));\n    return cache.get(key)!;\n  }) as T;\n}\n\nconst add = memoize((a: number, b: number) => a + b);\n```',
        options: [
          '`(...args: any[]) => any`',
          '`(a: number, b: number) => number`',
          '`unknown`',
          '`Function`',
        ],
        correctIndex: 1,
        explanation:
          '`memoize` returns `T`, and `T` is inferred from the argument as `(a: number, b: number) => number`. The `as T` assertion preserves the signature for callers.',
      },
      {
        kind: 'mcq',
        id: 'ts6-mcq5',
        prompt:
          'You publish a library that exposes `UserId` and `OrderId` — both backed by `string`, but never interchangeable. Which "brand" pattern makes line L3 a compile error without any runtime overhead?\n```typescript\ntype Brand<T, B> = T & { readonly __brand: B };\nexport type UserId = Brand<string, "UserId">;\nexport type OrderId = Brand<string, "OrderId">;\n\ndeclare function getOrder(id: OrderId): void;\nconst rawId: string = "u-42";\ngetOrder(rawId);                      // L1\ngetOrder(rawId as UserId);            // L2\ngetOrder(rawId as OrderId);           // L3 (we want this rejected)\n```',
        options: [
          'Add `as const` to the brand literal',
          'It is impossible — `string & { __brand }` collapses back to `string`',
          'L3 already type-errors only if `Brand` uses a unique symbol or unique private property instead of a writable string literal',
          'L3 is the *correct* pattern — L1 and L2 are the errors; L3 explicitly opts in to the brand',
        ],
        correctIndex: 3,
        explanation:
          'Brand types are entirely type-level — they cost nothing at runtime. L1 fails because a bare `string` is not a branded `OrderId`. L2 wrongly brands as `UserId`, which is also not assignable to `OrderId`. L3 is the explicit, *opt-in* cast you use at trust boundaries (after validation), so it must compile. See TS Handbook → Nominal Types & Branding.',
      },
      {
        kind: 'mcq',
        id: 'ts6-mcq6',
        prompt:
          'You are publishing a library and want callers of an old function to see a strike-through and a console-style warning from the TypeScript Language Service. Which TSDoc tag drives that behaviour?\n```typescript\n/**\n * Adds two numbers.\n * @___ Use `sum(a, b)` instead. Will be removed in v3.0.\n */\nexport function add(a: number, b: number): number {\n  return a + b;\n}\n```',
        options: ['`@obsolete`', '`@deprecated`', '`@removed`', '`@warning`'],
        correctIndex: 1,
        explanation:
          '`@deprecated` is the standard TSDoc tag recognised by the TypeScript Language Service. Any editor that talks to `tsserver` (or `tsc --noEmit` in CI with a TSDoc-aware linter) treats marked symbols as deprecated. See tsdoc.org for the full tag list.',
      },
      {
        kind: 'mcq',
        id: 'typescript-6-mcq-debug-1',
        prompt:
          '> A consumer of your library gets a type error that does not match the `.d.ts` you wrote:\n> ```\n> error TS2345: Argument of type \'string\' is not assignable to parameter of type \'number\'.\n> ```\n> Your source `src/math.ts`:\n> ```typescript\n> export function double(x: number): number { return x * 2; }\n> ```\n> Your hand-written `dist/math.d.ts`:\n> ```typescript\n> export declare function double(x: string): number;\n> ```\n> What is the root cause?',
        options: [
          'The consumer\'s tsconfig has `skipLibCheck: true` which ignores `.d.ts` errors',
          'The hand-written `.d.ts` file declares `x: string` instead of `x: number`, so the declaration drifts from the implementation; TypeScript trusts the `.d.ts` over the source — consumers see the wrong type',
          'The `dist/` directory needs a `package.json` with `"types": "math.d.ts"` to be recognised',
          'Hand-written `.d.ts` files are only valid for JavaScript packages, not TypeScript source',
        ],
        correctIndex: 1,
        explanation:
          'TypeScript always trusts the `.d.ts` file for published packages — it does not re-check the source. A drift between `src/math.ts` (correct) and `dist/math.d.ts` (wrong) means consumers see the wrong type signature. The fix is to let `tsc --declaration` generate the `.d.ts` automatically, or meticulously keep the hand-written declaration in sync with the source. This is why `isolatedDeclarations` (TS 5.5) was introduced: to catch these mismatches at build time.',
      },
      {
        kind: 'mcq',
        id: 'typescript-6-mcq-debug-2',
        prompt:
          '> After publishing a dual ESM/CJS library, a Next.js app throws at runtime:\n> ```\n> Error [ERR_REQUIRE_ESM]: require() of ES Module .../node_modules/my-lib/dist/index.js not supported.\n> ```\n> The `package.json` of `my-lib`:\n> ```json\n> {\n>   "type": "module",\n>   "main": "dist/index.js",\n>   "exports": {\n>     ".": "./dist/index.js"\n>   }\n> }\n> ```\n> What is wrong?',
        options: [
          'The `"type": "module"` field must be removed — it conflicts with `"main"`',
          'The `exports` field is missing the `"require"` condition; all consumers that call `require()` fall through to `"main"`, which is an ESM file. Add `"require": "./dist/index.cjs"` alongside `"import": "./dist/index.js"` in the exports map',
          'Rename `dist/index.js` to `dist/index.mjs` to signal ESM to Node',
          'Add `"module": "dist/index.mjs"` to the `package.json` for bundlers',
        ],
        correctIndex: 1,
        explanation:
          'With `"type": "module"`, `.js` files are treated as ESM. The `exports` map has no `"require"` condition, so CommonJS consumers (`require()`) match the single `"."` entry which points to an ESM file — causing `ERR_REQUIRE_ESM`. The fix is a dual-condition exports entry: `{ ".": { "import": "./dist/index.js", "require": "./dist/index.cjs" } }`, with a separate CJS build output as `dist/index.cjs`.',
      },
      {
        kind: 'mcq',
        id: 'typescript-6-mcq-debug-3',
        prompt:
          '> A colleague reports that importing your library under `isolatedModules: true` fails:\n> ```\n> error TS1205: Re-exporting a type when \'--isolatedModules\' is set requires using \'export type\'.\n> ```\n> Your library\'s `index.ts`:\n> ```typescript\n> export { User } from "./user";\n> ```\n> Where `User` is defined as:\n> ```typescript\n> // user.ts\n> export interface User { id: number; name: string; }\n> ```\n> What is the fix?',
        options: [
          'Change `interface User` to `type User = { id: number; name: string; }` — interfaces cannot be re-exported',
          'Change the re-export to `export type { User } from "./user"` — this tells single-file transpilers the export is type-only and safe to erase',
          'Add `"isolatedModules": false` to the library\'s `tsconfig.json`',
          'Move the `User` interface into `index.ts` directly to avoid the re-export',
        ],
        correctIndex: 1,
        explanation:
          'Tools like esbuild and swc process one file at a time without cross-file type resolution. When they see `export { User }`, they cannot tell if `User` is a value or a type. `export type { User }` is an explicit signal that the export is purely type-level and should be erased. Enabling `isolatedModules: true` in the library\'s own tsconfig catches these at compile time. See TS 3.8 release notes → type-only imports and exports.',
      },
      {
        kind: 'code',
        id: 'typescript-6-code-1',
        prompt: 'Use interface declaration merging to add a `role: string` property to the existing `User` interface.',
        boilerplate: `interface User {\n  name: string;\n}\n\n// TODO: Merge the User interface to add a 'role' property of type 'string'\n\nfunction getUserRole(user: User): string {\n  return user.role;\n}\n\nconst user: User = { name: "Alice", role: "admin" };\nconsole.log(getUserRole(user));\n`,
        expectedOutput: 'admin',
        explanation: 'In TypeScript, interfaces with the same name in the same scope are merged automatically. This declaration merging is commonly used to extend external library types (like adding custom properties to Express\'s Request interface).'
      },
    ],
  },

  // ─── L7: Modern React Patterns ────────────────────────────────────────────
  {
    id: 'typescript-7',
    language: 'typescript',
    level: 7,
    title: 'Modern React & Next.js 16 Patterns',
    timeEstimate: '10–16 hours',
    intro: `By the end of this phase, you'll read React 19 + Next.js 16 App Router code with confidence — async server components, \`params: Promise<{ slug: string }>\`, the \`"use client"\` and \`"use server"\` boundaries, \`use(promise)\` Suspense integration, typed \`<form action={...}>\` server actions, and \`ReactNode\` vs \`JSX.Element\` props. You'll also recognise the prop-typing patterns the React Compiler depends on. To build the muscle, you'll write a Next.js App Router blog locally: RSC pages, dynamic \`[slug]\` routes, a typed server action for comments calling \`revalidatePath\`, and Suspense streaming — all green under \`pnpm typecheck\` and \`pnpm build\`.`,
    topics: [
      {
        label: 'React TypeScript guide (react.dev)',
        url: 'https://react.dev/learn/typescript',
        note: 'Typing hooks, refs, events, and children in React 19',
      },
      {
        label: 'use() hook (React 19)',
        url: 'https://react.dev/reference/react/use',
        note: 'Read a Promise or Context inside any component',
      },
      {
        label: 'React Compiler docs',
        url: 'https://react.dev/learn/react-compiler',
        note: 'Automatic memoization — what it requires of your types and functions',
      },
      {
        label: 'Next.js App Router — Pages',
        url: 'https://nextjs.org/docs/app/api-reference/file-conventions/page',
        note: 'PageProps, LayoutProps, server actions typing (Next.js 16)',
      },
      {
        label: 'React Server Components (Next.js)',
        url: 'https://nextjs.org/docs/app/building-your-application/rendering/server-components',
        note: 'Async components, streaming, "use client" boundary',
      },
      {
        label: 'Suspense reference (React)',
        url: 'https://react.dev/reference/react/Suspense',
        note: 'Fallback UI while children load — typed with ReactNode',
      },
    ],
    deliverable:
      'Build locally: a Next.js App Router blog with RSC, dynamic routes, server actions for comments, Suspense streaming. Zero `any`, `params` typed as `Promise<{ slug: string }>`.',
    checks: [
      {
        kind: 'mcq',
        id: 'ts7-mcq1',
        prompt:
          'In Next.js 16 App Router, what TypeScript type is used for the `params` prop on a dynamic segment page like `app/blog/[slug]/page.tsx`?',
        options: [
          '`{ params: Record<string, string> }`',
          '`{ params: Promise<{ slug: string }> }`',
          '`{ params: URLSearchParams }`',
          '`{ params: string[] }`',
        ],
        correctIndex: 1,
        explanation:
          'From Next.js 15+, `params` and `searchParams` are `Promise`s that must be awaited inside the component body. For `[slug]`, the type is `Promise<{ slug: string }>`.',
      },
      {
        kind: 'mcq',
        id: 'ts7-mcq2',
        prompt:
          'What does the `"use client"` directive at the top of a file tell the Next.js bundler?',
        options: [
          'The file marks the boundary into the client component tree — it and its imports are bundled for the browser',
          'The file uses client-side encryption',
          'The file imports from the `client` npm scope',
          'It enables hot-module replacement for that file only',
        ],
        correctIndex: 0,
        explanation:
          '`"use client"` is a bundler directive that marks the file (and everything it imports) as a client component tree. Without it, components in the App Router are server components by default.',
      },
      {
        kind: 'mcq',
        id: 'ts7-mcq3',
        prompt:
          'What is the return type of this React 19 component?\n```typescript\nimport type { ReactNode } from "react";\ninterface BadgeProps { label: string; count: number }\nfunction Badge({ label, count }: BadgeProps): ReactNode {\n  return `${label} (${count})`;\n}\n```',
        options: ['`string`', '`ReactNode`', '`JSX.Element`', '`void`'],
        correctIndex: 1,
        explanation:
          'The declared return type is `ReactNode`. Modern React allows strings as valid `ReactNode` values, so returning a template literal is type-safe and renderable.',
      },
      {
        kind: 'mcq',
        id: 'ts7-mcq4',
        prompt:
          'Which Promise pattern is correct for awaiting `params` inside a Next.js 16 server page?',
        options: [
          '`export default function Page({ params }) { return params.slug; }`',
          '`export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return slug; }`',
          '`export default function Page({ params }) { return params.then(p => p.slug); }`',
          '`export default function Page() { return useParams().slug; }`',
        ],
        correctIndex: 1,
        explanation:
          'In Next.js 16, async page components await the `params` Promise directly. `useParams` is a client-side hook and `.then` does not return JSX.',
      },
      {
        kind: 'mcq',
        id: 'ts7-mcq5',
        prompt:
          'In React 19, what does the `use()` hook do when given a Promise?',
        options: [
          'Throws a compile error — Promises must be awaited',
          'Suspends the component until the Promise resolves, returning its value synchronously to the caller',
          'Returns the Promise unchanged',
          'Cancels the Promise after the component unmounts',
        ],
        correctIndex: 1,
        explanation:
          '`use(promise)` integrates with Suspense: the component suspends until resolution, then re-renders with the resolved value as if it were synchronous. See react.dev → use().',
      },
      {
        kind: 'mcq',
        id: 'ts7-mcq6',
        prompt:
          'What does this typed server action return?\n```typescript\n"use server";\nexport async function createTodo(data: { title: string; done: boolean }) {\n  return { id: 1, ...data };\n}\n```',
        options: [
          '`{ title: string; done: boolean }`',
          '`Promise<{ id: number; title: string; done: boolean }>`',
          '`Promise<void>`',
          '`{ id: number }`',
        ],
        correctIndex: 1,
        explanation:
          'An `async` function always returns a `Promise`. The inferred element type is the object literal `{ id: 1, ...data }`, widened to `{ id: number; title: string; done: boolean }`.',
      },
      {
        kind: 'mcq',
        id: 'ts7-mcq7',
        prompt:
          'Which line type-errors if `Item` is a *server* component and `Button` is a *client* component (`"use client"`)?\n```typescript\n// In Item (server)\nimport { Button } from "./button";              // L1\nimport { handler } from "./handler";            // L2 — handler is not "use server"\nexport default function Item() {\n  return <Button onClick={handler} />;          // L3\n}\n```',
        options: ['L1', 'L2', 'L3', 'No error'],
        correctIndex: 2,
        explanation:
          'Functions cannot be passed across the server→client boundary unless marked `"use server"`. Importing a client component into a server component is fine; importing a plain function is fine; passing it as a prop is the violation.',
      },
      {
        kind: 'mcq',
        id: 'typescript-7-mcq-debug-1',
        prompt:
          '> A React component shows stale data after state updates:\n> ```typescript\n> "use client";\n> import { useEffect, useState } from "react";\n>\n> export function Counter() {\n>   const [count, setCount] = useState(0);\n>\n>   useEffect(() => {\n>     const id = setInterval(() => {\n>       console.log("count:", count); // always logs 0\n>       setCount(count + 1);          // never increments past 1\n>     }, 1000);\n>     return () => clearInterval(id);\n>   }, []); // empty deps\n>\n>   return <div>{count}</div>;\n> }\n> ```\n> What is the bug?',
        options: [
          'The `setInterval` callback must be declared `async` to read the latest state',
          'The `useEffect` has an empty dependency array, so the callback closes over the initial `count = 0` and never sees updates; use the functional updater form `setCount(c => c + 1)` to avoid the stale closure',
          'Add `count` to the dependency array and recreate the interval on every render',
          '`setInterval` is not supported inside React components; use `setTimeout` recursively',
        ],
        correctIndex: 1,
        explanation:
          'This is the classic stale closure bug. The `useEffect` callback captures `count` at mount time (0) and the empty `[]` dependency array means the effect never re-runs. Every tick reads the stale `0`. Two fixes: (1) functional updater `setCount(c => c + 1)` — no closure over `count` needed; (2) add `count` to deps — re-registers the interval on every count change. Option 1 is preferred because it avoids tearing down and recreating the interval.',
      },
      {
        kind: 'mcq',
        id: 'typescript-7-mcq-debug-2',
        prompt:
          '> A Next.js 16 server action fails at runtime with a serialization error:\n> ```\n> Error: Only plain objects, and a few built-ins, can be passed to Client Components from Server Components.\n> Classes or null prototypes are not supported.\n> ```\n> The server action:\n> ```typescript\n> "use server";\n> import { db } from "@/lib/db";\n>\n> export async function getUser(id: string) {\n>   const user = await db.user.findUnique({ where: { id } });\n>   return user; // Prisma model instance\n> }\n> ```\n> What is the fix?',
        options: [
          'Mark the file with `"use client"` so the Prisma object is handled on the client',
          'Prisma model instances are class instances with non-plain-object prototypes; serialize to a plain object before returning: `return user ? { id: user.id, name: user.name, email: user.email } : null`',
          'Add `JSON.stringify(user)` before returning and `JSON.parse` on the client',
          'Wrap the return in `structuredClone(user)` to produce a plain object copy',
        ],
        correctIndex: 1,
        explanation:
          'React Server Components serialize return values across the server/client boundary using a subset of structured clone. Prisma model instances are class instances (non-plain objects) and cannot be serialized this way. The fix is to map to a plain object DTO before returning. `structuredClone` does not strip the class prototype in all environments. `JSON.stringify`/`JSON.parse` works but is verbose and loses type safety.',
      },
      {
        kind: 'mcq',
        id: 'typescript-7-mcq-debug-3',
        prompt:
          '> A Next.js 16 page throws at runtime:\n> ```\n> Error: Route "/blog/[slug]": params should be awaited before using its properties.\n> ```\n> The page component:\n> ```typescript\n> export default function BlogPost({ params }: { params: { slug: string } }) {\n>   return <h1>{params.slug}</h1>;\n> }\n> ```\n> What is the fix?',
        options: [
          'Destructure `params` directly in the function signature: `{ params: { slug } }`',
          'In Next.js 15+, `params` is a `Promise`; the component must be `async` and `await` the params: `export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; ... }`',
          'Use `useParams()` from `next/navigation` instead of the page prop',
          'Add `export const dynamic = "force-static"` to opt out of dynamic params',
        ],
        correctIndex: 1,
        explanation:
          'Next.js 15 changed `params` and `searchParams` to be Promises to support streaming and partial prerendering. The correct type is `Promise<{ slug: string }>` and the component must be `async` to `await` it. Using `useParams()` is a client-side hook and is not valid in a server component. The old synchronous pattern (`params: { slug: string }`) no longer works in Next.js 15+.',
      },
      {
        kind: 'code',
        id: 'typescript-7-code-1',
        prompt: 'Define the type for the Next.js 16 `PageProps` where `params` is a `Promise` containing the dynamic `slug` parameter as a string. Await `params` in the async `BlogPost` function and return the formatted output.',
        boilerplate: `interface PageProps {\n  // TODO: Define params as a Promise resolving to { slug: string }\n  params: Promise<{ slug: string }>;\n}\n\nasync function BlogPost({ params }: PageProps): Promise<string> {\n  // TODO: Await params and return "Post: " followed by the slug\n  const { slug } = await params;\n  return \`Post: \${slug}\`;\n}\n\nBlogPost({ params: Promise.resolve({ slug: "typescript-rules" }) }).then(console.log);\n`,
        expectedOutput: 'Post: typescript-rules',
        explanation: 'In Next.js 15+, page parameters are passed as a `Promise` to support concurrent rendering. You must declare `params` as a `Promise` and `await` it inside your Server Component.'
      },
    ],
  },

  // ─── L8: State Machines, Testing & Accessibility ──────────────────────────
  {
    id: 'typescript-8',
    language: 'typescript',
    level: 8,
    title: 'State Machines, Advanced Testing & Accessibility',
    timeEstimate: '12–16 hours',
    intro: `By the end of this phase, you'll read production UI state-machine code with confidence — XState v5 \`setup({ types: ... }).createMachine\`, typed events and context, \`assign\` transitions, Vitest \`describe\`/\`it.each\` tables, Playwright locator assertions like \`expect(locator).toBeVisible()\`, and the ARIA attributes (\`aria-busy\`, \`aria-live\`) that lib.dom.d.ts already types for you. You'll also recognise why \`Record<TrafficLight, TrafficLight>\` makes a transition table total. To build the muscle, you'll write \`forms-machine.ts\` locally: a typed XState v5 machine (\`idle → filling → submitting → success | error\`), Vitest tests for each transition (\`pnpm vitest\`), and a Playwright spec (\`pnpm playwright test\`) verifying the happy path against a small Next.js page.`,
    topics: [
      {
        label: 'XState v5 — TypeScript',
        url: 'https://stately.ai/docs/typescript',
        note: 'Typed states, events, and context in XState v5 machines',
      },
      {
        label: 'XState overview',
        url: 'https://stately.ai/docs/xstate',
        note: 'createMachine, send, useMachine — core concepts',
      },
      {
        label: 'Playwright TypeScript guide',
        url: 'https://playwright.dev/docs/intro',
        note: 'Browser automation with full TypeScript types',
      },
      {
        label: 'Vitest advanced features',
        url: 'https://vitest.dev/guide/features.html',
        note: 'Snapshots, coverage, mocking, concurrent tests',
      },
      {
        label: 'axe-core accessibility testing',
        url: 'https://github.com/dequelabs/axe-core',
        note: 'Programmatic a11y audits — integrates with Playwright and Vitest',
      },
      {
        label: 'WCAG 2.2 quick reference',
        url: 'https://www.w3.org/WAI/WCAG22/quickref/',
        note: 'The standard — typed aria attributes are part of lib.dom.d.ts',
      },
    ],
    deliverable:
      'Build locally: a `forms-machine.ts` typed XState v5 machine (`idle → filling → submitting → success | error`), Vitest unit tests for each transition, and a Playwright spec verifying the happy path against a Next.js page.',
    checks: [
      {
        kind: 'mcq',
        id: 'ts8-mcq1',
        prompt:
          'In XState v5, what is the recommended way to type a machine\'s states and events?',
        options: [
          'Manually annotate `StateMachine<TContext, TEvent>` on every call site',
          'Pass an inferred inline object to `createMachine()` and let TypeScript infer all types from the definition, optionally with `setup({ types: { ... } })`',
          'Use `MachineConfig<TContext, TEvent>` imported from `xstate/config`',
          'XState v5 does not support TypeScript inference',
        ],
        correctIndex: 1,
        explanation:
          'XState v5 prefers `setup({ types: { context, events } }).createMachine(...)`. TypeScript then infers all state and transition types from the literal definition. See stately.ai/docs/typescript.',
      },
      {
        kind: 'mcq',
        id: 'ts8-mcq2',
        prompt:
          'Which Playwright assertion is the idiomatic way to wait for an element to be visible (auto-retrying until timeout)?',
        options: [
          '`page.waitForTimeout(1000)`',
          '`page.waitForSelector(".text")`',
          '`await expect(page.getByText("Hello")).toBeVisible()`',
          '`page.on("text", ...)`',
        ],
        correctIndex: 2,
        explanation:
          '`expect(locator).toBeVisible()` auto-retries until the element is visible or the test times out. `waitForTimeout` is brittle and `page.on` is for events, not visibility.',
      },
      {
        kind: 'mcq',
        id: 'ts8-mcq3',
        prompt:
          'What does this code log?\n```typescript\ntype TrafficLight = "green" | "yellow" | "red";\nconst next: Record<TrafficLight, TrafficLight> = { green: "yellow", yellow: "red", red: "green" };\nlet state: TrafficLight = "green";\nstate = next[state];\nstate = next[state];\nconsole.log(state);\n```',
        options: ['`green`', '`yellow`', '`red`', '`undefined`'],
        correctIndex: 2,
        explanation:
          'Starting from `green`: first transition → `yellow`, second → `red`. The `Record<TrafficLight, TrafficLight>` type guarantees the lookup is total.',
      },
      {
        kind: 'mcq',
        id: 'ts8-mcq4',
        prompt:
          'Which generic constraint makes `EventEmitter<Events>` reject a payload of the wrong type at compile time?\n```typescript\nclass TypedEmitter<Events extends Record<string, unknown>> {\n  emit<K extends keyof Events>(event: K, payload: Events[K]): void;\n  emit(event: string, payload: any): void; // <-- this overload\n}\n```',
        options: [
          'Remove the `any` overload',
          'Keep the `any` overload — it preserves type safety',
          'Change the constraint to `Events extends string`',
          'Add `as any` casts internally',
        ],
        correctIndex: 0,
        explanation:
          'The second overload accepts any payload, defeating the typed inference. Removing it forces every call to `emit` to match `payload: Events[K]`.',
      },
      {
        kind: 'mcq',
        id: 'ts8-mcq5',
        prompt:
          'Your React 19 toast region must announce *new* status messages to a screen reader without stealing focus or interrupting the user. Which combination is the correct, lib.dom.d.ts-typed pattern?\n```typescript\n// type: HTMLAttributes<HTMLDivElement>\n<div role="status" aria-live="___" aria-atomic="true">\n  {message}\n</div>\n```',
        options: [
          '`assertive` — interrupts the current screen-reader announcement immediately',
          '`polite` — announces after the current speech finishes, the default for non-critical updates',
          '`off` — disables announcements entirely, used for purely visual changes',
          '`busy` — pauses announcements until the region is no longer loading',
        ],
        correctIndex: 1,
        explanation:
          '`aria-live="polite"` waits for the current announcement to finish — the right default for status messages and toasts. `assertive` is reserved for critical, time-sensitive content (errors, expirations). `aria-atomic="true"` makes the screen reader announce the whole region, not just the diff. See MDN → ARIA: live regions and WCAG 2.2 → Status messages.',
      },
      {
        kind: 'mcq',
        id: 'ts8-mcq6',
        prompt:
          'In Vitest, what does this test do?\n```typescript\nimport { describe, expect, it } from "vitest";\n\ndescribe("math", () => {\n  it.each([[1, 1, 2], [2, 3, 5]])("%i + %i = %i", (a, b, expected) => {\n    expect(a + b).toBe(expected);\n  });\n});\n```',
        options: [
          'It runs a single test with three arguments',
          'It runs three independent tests, one per row, with formatted titles',
          'It fails — `it.each` requires a tagged template',
          'It snapshots the array',
        ],
        correctIndex: 1,
        explanation:
          '`it.each(rows)` (table form) generates a test per row, formatting the title with `printf`-style placeholders. See vitest.dev/api → it.each.',
      },
      {
        kind: 'mcq',
        id: 'typescript-8-mcq-debug-1',
        prompt:
          '> An XState v5 machine never transitions from `idle` to `active` when the `START` event is sent:\n> ```typescript\n> import { createMachine, createActor } from "xstate";\n>\n> const machine = createMachine({\n>   id: "toggle",\n>   initial: "idle",\n>   states: {\n>     idle:   { on: { start: { target: "active" } } },\n>     active: { on: { stop:  { target: "idle"   } } },\n>   },\n> });\n>\n> const actor = createActor(machine).start();\n> actor.send({ type: "START" });\n> console.log(actor.getSnapshot().value); // "idle" — not "active"\n> ```\n> What is the bug?',
        options: [
          'XState v5 requires `setup()` before `createMachine()` for transitions to work',
          'Event types are case-sensitive; the machine defines `"start"` but the code sends `{ type: "START" }` — the event does not match any transition',
          '`actor.send()` is asynchronous; add `await` before reading `.getSnapshot()`',
          'The `target` must use the full state path `"#toggle.active"` instead of `"active"`',
        ],
        correctIndex: 1,
        explanation:
          'XState event types are exact string matches — `"start"` and `"START"` are different events. The machine listens for `"start"` but receives `"START"`, so no transition fires and the state stays `"idle"`. Fix: use consistent casing (`{ type: "start" }` or rename the transition key to `"START"`). A TypeScript-typed machine with `setup({ types: { events: ... } })` would catch this at compile time.',
      },
      {
        kind: 'mcq',
        id: 'typescript-8-mcq-debug-2',
        prompt:
          '> A Playwright test is flaky — it passes locally but fails in CI with:\n> ```\n> Error: locator.click: Error: strict mode violation: getByText("Submit") resolved to 2 elements\n> ```\n> The test:\n> ```typescript\n> import { test, expect } from "@playwright/test";\n>\n> test("submits the form", async ({ page }) => {\n>   await page.goto("/checkout");\n>   await page.getByText("Submit").click();\n>   await expect(page.getByText("Order confirmed")).toBeVisible();\n> });\n> ```\n> What is the fix?',
        options: [
          'Use `page.getByText("Submit").first().click()` to always pick the first match',
          'The locator `getByText("Submit")` matches multiple elements (e.g., a button and a tooltip); use a more specific locator such as `page.getByRole("button", { name: "Submit" })` to uniquely identify the submit button',
          'Add `await page.waitForLoadState("networkidle")` before clicking to wait for the page to settle',
          'Switch from `getByText` to `locator("button:has-text(\'Submit\')")` for CSS selector precision',
        ],
        correctIndex: 1,
        explanation:
          'Playwright strict mode (the default) throws when a locator matches more than one element. `getByText("Submit")` matches any element containing that text — buttons, labels, tooltips, etc. The robust fix is `getByRole("button", { name: "Submit" })`, which targets the semantic role and accessible name, uniquely identifying the button. Using `.first()` hides the ambiguity and may pick the wrong element in CI where layout differs.',
      },
      {
        kind: 'mcq',
        id: 'typescript-8-mcq-debug-3',
        prompt:
          '> A Vitest test for an XState machine assertion fails unexpectedly:\n> ```typescript\n> import { createMachine, createActor } from "xstate";\n> import { expect, it } from "vitest";\n>\n> const machine = createMachine({\n>   initial: "idle",\n>   states: {\n>     idle:     { on: { FETCH: "loading" } },\n>     loading:  { on: { SUCCESS: "done", FAILURE: "error" } },\n>     done:     {},\n>     error:    {},\n>   },\n> });\n>\n> it("transitions idle → loading → done", () => {\n>   const actor = createActor(machine).start();\n>   actor.send({ type: "FETCH" });\n>   actor.send({ type: "SUCCESS" });\n>   expect(actor.getSnapshot().value).toBe("done");\n> });\n> ```\n> The test fails with `expected "loading" to be "done"`. What is the issue?',
        options: [
          'XState processes events asynchronously; the `SUCCESS` event has not been handled yet when `getSnapshot()` is called',
          'The machine is missing a `context` definition, which causes events to be dropped',
          '`actor.send()` in XState v5 is synchronous — the issue is that `SUCCESS` is being sent before the machine has processed `FETCH`; reorder the sends or add synchronous event inspection between them',
          'Events in XState v5 are batched; call `actor.getSnapshot()` inside a `flushSync` callback',
        ],
        correctIndex: 0,
        explanation:
          'In XState v5, actor event processing can be asynchronous when services or promises are involved, but for pure state machines without invoke, `send()` is synchronous and the snapshot should reflect the transition immediately. If the test sees `"loading"` after sending `SUCCESS`, it is likely that `FETCH` was not processed before `SUCCESS` was sent — perhaps due to actor lifecycle timing. Ensure the actor is fully started (`actor.start()`) before sending events, and verify both sends happen in the correct order. In pure machines, both transitions should be synchronous.',
      },
      {
        kind: 'code',
        id: 'typescript-8-code-1',
        prompt: 'Complete the transition function for the traffic light state machine so that the `green` state transitions to `yellow`.',
        boilerplate: `type State = 'red' | 'green' | 'yellow';\ntype Event = 'NEXT';\n\nfunction transition(state: State, event: Event): State {\n  // TODO: Implement state transition logic (red -> green, green -> yellow, yellow -> red)\n  switch (state) {\n    case 'red': return 'green';\n    case 'green':\n      // TODO: Transition to yellow\n      return 'yellow';\n    case 'yellow': return 'red';\n  }\n}\n\nconsole.log(transition('green', 'NEXT'));\n`,
        expectedOutput: 'yellow',
        explanation: 'State transition functions calculate the next state based on the current state and incoming event. This is the underlying mechanic of XState and other finite state machines.'
      },
    ],
  },

  // ─── L9: Build Tooling Internals ──────────────────────────────────────────
  {
    id: 'typescript-9',
    language: 'typescript',
    level: 9,
    title: 'Build Tooling Internals',
    timeEstimate: '14–20 hours',
    intro: `By the end of this phase, you'll read build-tool pipelines with confidence — what esbuild/swc strip per-file vs what only \`tsc --noEmit\` catches, how \`isolatedModules\` keeps single-file transpilers honest, the \`vite.config.ts\` \`plugins\` array vs the \`tsconfig.json\` Language Service \`plugins\` field, and the TS Compiler API entry points (\`ts.createSourceFile\`, \`ts.createProgram\`). You'll also recognise the regex/AST trade-off when grepping source vs walking a syntax tree. To build the muscle, you'll write a tiny ts-to-js transformer locally: a CLI driven by the TS Compiler API that strips type annotations from a single file, writes to stdout, and exits non-zero on parse errors — runnable via \`tsx strip.ts path/to/file.ts\`.`,
    topics: [
      {
        label: 'esbuild — How it works',
        url: 'https://esbuild.github.io/how-it-works/',
        note: 'Single-pass, no type information — fastest TS → JS transpiler',
      },
      {
        label: 'swc — Getting started',
        url: 'https://swc.rs/docs/getting-started',
        note: 'Rust-based transpiler; used by Next.js instead of Babel',
      },
      {
        label: 'Vite — Why Vite',
        url: 'https://vite.dev/guide/why.html',
        note: 'ESM dev server + Rollup production bundler, TypeScript out of the box',
      },
      {
        label: 'Turbopack docs (Next.js)',
        url: 'https://nextjs.org/docs/app/api-reference/turbopack',
        note: 'Incremental bundler written in Rust, successor to Webpack',
      },
      {
        label: 'TypeScript Compiler API',
        url: 'https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API',
        note: 'Programmatic access to the TS AST — parsing, transforming, emitting',
      },
      {
        label: 'TypeScript AST Viewer',
        url: 'https://ts-ast-viewer.com/',
        note: 'Interactive tool to explore the AST of any snippet',
      },
    ],
    deliverable:
      'Build locally: a tiny ts-to-js transformer with the TS Compiler API that strips type annotations from a single file. CLI reads a path, writes stripped output to stdout, exits non-zero on parse errors.',
    checks: [
      {
        kind: 'mcq',
        id: 'ts9-mcq1',
        prompt:
          'Why does esbuild transpile TypeScript significantly faster than `tsc`?',
        options: [
          'It uses WASM to run inside the browser',
          'It processes each file independently in Go with parallelism and skips type checking entirely',
          'It caches all previous outputs permanently on disk',
          'It skips source maps to save time',
        ],
        correctIndex: 1,
        explanation:
          'esbuild is written in Go, processes files in parallel, and strips type annotations without doing full type inference. This is why it cannot catch type errors — that is still `tsc`\'s job. See esbuild.github.io/how-it-works.',
      },
      {
        kind: 'mcq',
        id: 'ts9-mcq2',
        prompt:
          'In the TypeScript Compiler API, what does `ts.createSourceFile()` return?',
        options: [
          'A compiled JavaScript string',
          'A `SourceFile` AST node representing the parsed TypeScript file',
          'A `Program` containing all files in the project',
          'A `TypeChecker` that resolves types for expressions',
        ],
        correctIndex: 1,
        explanation:
          '`ts.createSourceFile()` parses a single TypeScript source text and returns a `SourceFile` node — the root of the AST. A `Program` is created from multiple source files using `ts.createProgram()`.',
      },
      {
        kind: 'mcq',
        id: 'ts9-mcq3',
        prompt:
          'What does this code log?\n```typescript\nfunction countConsoleLogs(src: string): number {\n  const matches = src.match(/console\\.log\\(/g);\n  return matches ? matches.length : 0;\n}\nconst sample = `console.log(1); console.log("a"); const x = 2;`;\nconsole.log(countConsoleLogs(sample));\n```',
        options: ['`0`', '`1`', '`2`', '`3`'],
        correctIndex: 2,
        explanation:
          'The global regex matches `console.log(` twice in the sample. `String.prototype.match(/.../g)` returns an array of all matches (or `null` when there are none).',
      },
      {
        kind: 'mcq',
        id: 'ts9-mcq4',
        prompt:
          'Which type signature is correct for a left-to-right pipe of single-argument functions?',
        options: [
          '`function pipe<T>(...fns: Array<(x: T) => T>): (x: T) => T`',
          '`function pipe<T>(fns: (x: T) => T): (x: T) => T`',
          '`function pipe<T>(fns: Array<T>): T`',
          '`function pipe(...fns: Function[]): unknown`',
        ],
        correctIndex: 0,
        explanation:
          'A variadic pipe collects functions of type `(x: T) => T` and returns a function with the same shape. The other signatures either lose the generic parameter or accept a non-array.',
      },
      {
        kind: 'mcq',
        id: 'ts9-mcq5',
        prompt:
          'Which transformation can `tsc` perform but esbuild cannot?',
        options: [
          'Stripping type annotations',
          'Emitting JSX to `React.createElement` / `_jsx`',
          'Running the full type checker and reporting type errors',
          'Down-leveling ES2022 syntax to ES2015',
        ],
        correctIndex: 2,
        explanation:
          'esbuild deliberately skips type checking — that is what makes it fast. Only `tsc` (or `tsgo`/`tsc --noEmit` in CI) understands the full type system.',
      },
      {
        kind: 'mcq',
        id: 'ts9-mcq6',
        prompt:
          'In a Vite project, where should a TypeScript-aware plugin be registered?',
        options: [
          'In `tsconfig.json` under `plugins`',
          'In `vite.config.ts` inside the `plugins` array',
          'In `package.json` under `vite.plugins`',
          'It is loaded automatically from `node_modules/vite-plugins/`',
        ],
        correctIndex: 1,
        explanation:
          'Vite plugins are registered in the `plugins` array inside `vite.config.ts`. `tsconfig.json#plugins` is for *Language Service* plugins, which serve the editor — not the bundler.',
      },
      {
        kind: 'mcq',
        id: 'typescript-9-mcq-debug-1',
        prompt:
          '> A Node.js script using `tsx` works fine, but when compiled with `tsc` and run with `node dist/index.js` it throws:\n> ```\n> Error [ERR_REQUIRE_ESM]: require() of ES Module dist/utils.js not supported.\n> Please either convert file to CommonJS, or use dynamic import().\n> ```\n> The `tsconfig.json`:\n> ```json\n> {\n>   "compilerOptions": {\n>     "target": "ES2022",\n>     "module": "ESNext",\n>     "outDir": "dist"\n>   }\n> }\n> ```\n> What is the root cause?',
        options: [
          '`tsx` transpiles to CommonJS by default; switch to `ts-node` for ESM output',
          '`"module": "ESNext"` emits ES module syntax (`import`/`export`); but without `"type": "module"` in `package.json`, Node treats `.js` files as CommonJS and fails on the ESM `import` statement. Fix: add `"type": "module"` to `package.json`, or change `"module"` to `"CommonJS"` in tsconfig',
          'Change `"target"` from `"ES2022"` to `"ES5"` to produce compatible output',
          'Rename the output files from `.js` to `.mjs` manually after compilation',
        ],
        correctIndex: 1,
        explanation:
          '`"module": "ESNext"` (or `"ES2020"`) emits `import`/`export` statements. Node.js only executes these as ESM when either the file extension is `.mjs` or `"type": "module"` is set in the nearest `package.json`. Without it, Node tries to interpret the `import` as CJS and throws `ERR_REQUIRE_ESM`. The two clean fixes are: (1) add `"type": "module"` to `package.json`; (2) switch to `"module": "CommonJS"` in tsconfig for a CJS build.',
      },
      {
        kind: 'mcq',
        id: 'typescript-9-mcq-debug-2',
        prompt:
          '> Stack traces in production point to minified line numbers with no file names:\n> ```\n> TypeError: Cannot read properties of undefined\n>     at t.<anonymous> (index-BxK92.js:1:4821)\n> ```\n> The `vite.config.ts` build config:\n> ```typescript\n> export default defineConfig({\n>   build: {\n>     sourcemap: false,\n>     minify: true,\n>   },\n> });\n> ```\n> What single change produces readable stack traces without disabling minification?',
        options: [
          'Set `minify: false` — minification is incompatible with source maps',
          'Set `sourcemap: true` (or `"hidden"`) — Vite generates `.js.map` files; error monitoring tools (Sentry, Datadog) consume hidden source maps server-side while keeping them out of the browser bundle',
          'Add `"inlineSourceMap": true` to `tsconfig.json` — tsc embeds source maps in the JS output',
          'Switch from `esbuild` minifier to `terser` — terser preserves function names in stack traces',
        ],
        correctIndex: 1,
        explanation:
          'Source maps and minification are independent features. Setting `sourcemap: true` generates `.map` files alongside the bundle; `"hidden"` generates the maps without adding the `//# sourceMappingURL` comment, keeping them invisible to browser DevTools but uploadable to error monitoring services. This is the standard production pattern: minify for performance, hidden source maps for debuggability. `tsconfig` `inlineSourceMap` applies to `tsc` output, not Vite\'s bundler output.',
      },
      {
        kind: 'mcq',
        id: 'typescript-9-mcq-debug-3',
        prompt:
          '> A TypeScript file imports a local utility using a path alias, but `tsc --noEmit` passes while `node dist/index.js` throws:\n> ```\n> Error: Cannot find module \'@utils/format\'\n> ```\n> The `tsconfig.json`:\n> ```json\n> {\n>   "compilerOptions": {\n>     "paths": { "@utils/*": ["src/utils/*"] },\n>     "outDir": "dist"\n>   }\n> }\n> ```\n> Why does TypeScript accept the import but Node throws at runtime?',
        options: [
          '`tsc` should have reported an error — the `paths` configuration is wrong',
          'TypeScript `paths` are compile-time aliases for the type checker only; `tsc` does not rewrite import specifiers in the emitted JavaScript. Node sees the literal `@utils/format` string, which has no mapping at runtime. Fix: use a bundler (esbuild, Vite, webpack) that resolves path aliases, or use `tsc-alias` / `tsconfig-paths` to post-process or register the aliases at runtime',
          'Add `"baseUrl": "."` to `tsconfig.json` — without it, `paths` are ignored by the emitter',
          'Rename the alias to use a relative path — Node only resolves `./` and `../` imports natively',
        ],
        correctIndex: 1,
        explanation:
          '`compilerOptions.paths` tells the TypeScript *type checker* how to resolve module specifiers — it has no effect on the emitted JavaScript. `tsc` emits the import as-is (`@utils/format`), and Node has no knowledge of the alias. Solutions: (1) use a bundler that resolves aliases; (2) use `tsconfig-paths/register` at runtime (`node -r tsconfig-paths/register dist/index.js`); (3) use `tsc-alias` as a post-build step to rewrite aliases to relative paths. Adding `baseUrl` alone does not fix the runtime resolution.',
      },
      {
        kind: 'code',
        id: 'typescript-9-code-1',
        prompt: 'Implement the `hasEs2022Target` function to return `true` if the parsed tsconfig compiler option `target` is set to "es2022" (case-insensitive).',
        boilerplate: `interface TsConfig {\n  compilerOptions?: {\n    target?: string;\n  };\n}\n\nfunction hasEs2022Target(configJson: string): boolean {\n  try {\n    const config: TsConfig = JSON.parse(configJson);\n    // TODO: Return true if compilerOptions.target is "es2022" (case-insensitive)\n    return config.compilerOptions?.target?.toLowerCase() === "es2022";\n  } catch {\n    return false;\n  }\n}\n\nconst configStr = '{"compilerOptions": {"target": "ES2022"}}';\nconsole.log(hasEs2022Target(configStr));\n`,
        expectedOutput: 'true',
        explanation: 'Build tooling and transpilers read the `tsconfig.json` file (specifically `compilerOptions.target`) to determine what version of JavaScript syntax the TypeScript files should be compiled down to.'
      },
    ],
  },

  // ─── L10: Compiler Plugins & Deep TS Internals ────────────────────────────
  {
    id: 'typescript-10',
    language: 'typescript',
    level: 10,
    title: 'Compiler Plugins, Language Service & TS Internals',
    timeEstimate: '20–30 hours',
    intro: `By the end of this phase, you'll read TS compiler internals with confidence — \`NoInfer<T>\` and \`const T\` inference control, TS 5.5 inferred type predicates from filter callbacks, contravariance tricks like \`UnionToIntersection\`, Language Service plugin shape (the \`create(info)\` factory and proxied \`getSemanticDiagnostics\`), and the \`tsc --generateTrace\` flag for performance debugging. You'll also recognise the difference between editor-facing \`tsconfig.json#plugins\` and bundler plugins. To build the muscle, you'll write a TS Language Service plugin locally: an npm package that emits a custom diagnostic when a Promise is \`await\`ed inside a loop, registered via \`tsconfig.json#plugins\` and exercised by the TS test runner.`,
    topics: [
      {
        label: 'Writing a TS Language Service Plugin',
        url: 'https://github.com/microsoft/TypeScript/wiki/Writing-a-Language-Service-Plugin',
        note: 'Custom completions, diagnostics, and code fixes inside the editor',
      },
      {
        label: 'TypeScript 5.0 release notes',
        url: 'https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/',
        note: 'const type parameters, decorators (ECMAScript stage 3), bundle-size reductions',
      },
      {
        label: 'TypeScript 5.4 release notes — NoInfer<T>',
        url: 'https://devblogs.microsoft.com/typescript/announcing-typescript-5-4/',
        note: '`NoInfer<T>` prevents a type parameter being inferred from a specific argument',
      },
      {
        label: 'TypeScript 5.5 release notes — inferred type predicates',
        url: 'https://devblogs.microsoft.com/typescript/announcing-typescript-5-5/',
        note: 'TS now infers `x is T` for filter callbacks automatically',
      },
      {
        label: 'TypeScript source on GitHub',
        url: 'https://github.com/microsoft/TypeScript',
        note: 'checker.ts is the heart — search for `getTypeOfExpression` to start exploring',
      },
      {
        label: 'TS --generateTrace for inference debugging',
        url: 'https://github.com/microsoft/TypeScript/wiki/Performance#performance-tracing',
        note: 'Produces a Chrome-trace JSON showing exactly what the checker did',
      },
    ],
    deliverable:
      'Build locally: a TS Language Service plugin that adds a custom diagnostic when a Promise is awaited inside a loop. Registered via `tsconfig.json#plugins`, exercised via the TS test-runner.',
    checks: [
      {
        kind: 'mcq',
        id: 'ts10-mcq1',
        prompt:
          'What does `NoInfer<T>` (TypeScript 5.4) do to a type parameter?',
        options: [
          'It makes `T` invariant so it cannot be narrowed',
          'It prevents TypeScript from using that argument site to infer the type parameter `T`, forcing inference from other call sites',
          'It causes `T` to be inferred as `never` unless explicitly supplied',
          'It removes `T` from the function signature entirely',
        ],
        correctIndex: 1,
        explanation:
          '`NoInfer<T>` is a built-in utility type that opts a specific argument out of inference. The type parameter `T` is still usable — TypeScript just will not infer it from the annotated position. See TS 5.4 release notes.',
      },
      {
        kind: 'mcq',
        id: 'ts10-mcq2',
        prompt:
          'In TypeScript 5.5+, what is the inferred type of `strings`?\n```typescript\nconst mixed: (string | number)[] = ["a", 1, "b", 2];\nconst strings = mixed.filter(x => typeof x === "string");\n```',
        options: [
          '`(string | number)[]`',
          '`string[]`',
          '`unknown[]`',
          'Compile error — explicit type predicate required',
        ],
        correctIndex: 1,
        explanation:
          'TS 5.5 introduced inferred type predicates: when a filter callback is a simple type-narrowing expression, TypeScript automatically infers the `x is string` predicate, so the result is `string[]`.',
      },
      {
        kind: 'mcq',
        id: 'ts10-mcq3',
        prompt:
          'What is the inferred type of `t`?\n```typescript\nfunction tuple<const T extends readonly unknown[]>(...args: T): T {\n  return args;\n}\nconst t = tuple(1, "two", true);\n```',
        options: [
          '`(string | number | boolean)[]`',
          '`readonly [1, "two", true]`',
          '`readonly [number, string, boolean]`',
          '`Array<unknown>`',
        ],
        correctIndex: 1,
        explanation:
          '`const T extends readonly unknown[]` infers literal element types. The result is the narrowest tuple `readonly [1, "two", true]`. See TS 5.0 release notes → const type parameters.',
      },
      {
        kind: 'mcq',
        id: 'ts10-mcq4',
        prompt:
          'What does `UnionToIntersection<{ a: number } | { b: string }>` evaluate to?\n```typescript\ntype UnionToIntersection<U> =\n  (U extends unknown ? (x: U) => void : never) extends (x: infer I) => void ? I : never;\n```',
        options: [
          '`{ a: number } | { b: string }`',
          '`{ a: number } & { b: string }`',
          '`{ a: number; b: string } | never`',
          '`never`',
        ],
        correctIndex: 1,
        explanation:
          'Function parameter positions are *contravariant*, so unifying `(x: A) => void` with `(x: B) => void` yields `(x: A & B) => void`. `infer I` extracts `A & B` — here, `{ a: number } & { b: string }`.',
      },
      {
        kind: 'mcq',
        id: 'ts10-mcq5',
        prompt:
          'Which TypeScript Language Service plugin entry point is called to surface custom diagnostics in the editor?',
        options: [
          '`getCompletionsAtPosition`',
          '`getSemanticDiagnostics` (typically wrapped via a proxy returned from `create()`)',
          '`getQuickInfoAtPosition`',
          '`emitFile`',
        ],
        correctIndex: 1,
        explanation:
          'Custom diagnostics are returned from a proxied `getSemanticDiagnostics`. The plugin module exports an `init` that returns a `create(info)` factory; `info.languageService` is the proxy target.',
      },
      {
        kind: 'mcq',
        id: 'ts10-mcq6',
        prompt:
          'Which flag tells `tsc` to emit a Chrome-trace JSON describing exactly what the checker did during compilation, for performance debugging?',
        options: [
          '`--listFiles`',
          '`--explainFiles`',
          '`--generateTrace ./trace`',
          '`--diagnostics`',
        ],
        correctIndex: 2,
        explanation:
          '`tsc --generateTrace ./trace` writes a Chrome-trace event log to the given directory. Open it with `chrome://tracing` or `https://ui.perfetto.dev/`. See TS Wiki → Performance Tracing.',
      },
      {
        kind: 'mcq',
        id: 'typescript-10-mcq-debug-1',
        prompt:
          '> A TypeScript Language Service plugin causes `tsserver` to crash on every file open:\n> ```\n> [tsserver] TypeError: Cannot read properties of undefined (reading \'getSemanticDiagnostics\')\n>     at Object.create (/project/node_modules/my-ts-plugin/dist/index.js:12:34)\n> ```\n> The plugin entry point:\n> ```typescript\n> import type * as ts from "typescript/lib/tsserverlibrary";\n>\n> function init(modules: { typescript: typeof ts }) {\n>   function create(info: ts.server.PluginCreateInfo) {\n>     const proxy = info.languageService;\n>     proxy.getSemanticDiagnostics = (fileName) => {\n>       return info.languageService.getSemanticDiagnostics(fileName);\n>     };\n>     return proxy;\n>   }\n>   return { create };\n> }\n\nexport = init;\n> ```\n> What is wrong with the proxy pattern?',
        options: [
          'The plugin must use `export default` instead of `export =`',
          'The proxy is mutating `info.languageService` directly instead of creating a new object that delegates to it; mutating the original service object corrupts it for all other plugins. Fix: `const proxy = Object.create(info.languageService)` to create a prototype-chain delegate, then override only the methods you need',
          'The `typescript` module parameter is unused and must be destructured before `create` is called',
          'Language Service plugins cannot override `getSemanticDiagnostics` — use `getCompletionsAtPosition` instead',
        ],
        correctIndex: 1,
        explanation:
          'The standard LS plugin proxy pattern is `const proxy = Object.create(info.languageService)`. This creates an object whose prototype is the original service, so all un-overridden methods delegate transparently. Directly mutating `info.languageService` replaces methods on the shared object, breaking other plugins and potentially causing recursive calls or undefined references. See the TS wiki → Writing a Language Service Plugin.',
      },
      {
        kind: 'mcq',
        id: 'typescript-10-mcq-debug-2',
        prompt:
          '> A generic function infers the wrong type for the default value:\n> ```typescript\n> function getOrDefault<T>(value: T | undefined, fallback: T): T {\n>   return value ?? fallback;\n> }\n>\n> // Caller wants T = string, but TypeScript infers T = string | number\n> const result = getOrDefault(undefined, 42);\n> // result: string | number  (expected: number)\n> ```\n> After reading the TS 5.4 release notes, a colleague suggests wrapping `fallback` with `NoInfer<T>`. What does that fix?',
        options: [
          '`NoInfer<T>` prevents `fallback` from contributing to the inference of `T`, so TypeScript infers `T` solely from `value`; since `value` is `undefined`, `T` cannot be inferred and must be supplied explicitly — this forces callers to write `getOrDefault<string>(undefined, "")` rather than inferring from the fallback',
          '`NoInfer<T>` widens `T` to `unknown` so that any fallback value is accepted',
          '`NoInfer<T>` makes `fallback` optional, allowing the caller to omit it',
          '`NoInfer<T>` is equivalent to `T extends unknown ? T : never` and has no practical effect here',
        ],
        correctIndex: 0,
        explanation:
          '`NoInfer<T>` (TS 5.4) excludes an argument position from inference. Without it, TypeScript infers `T` from both `value` (`undefined` — uninformative) and `fallback` (`42` → `number`), producing `T = number`. With `fallback: NoInfer<T>`, only `value` is used for inference. Since `value` is `undefined`, `T` cannot be inferred and the caller must supply it explicitly: `getOrDefault<number>(undefined, 42)`. This is the canonical use case from the TS 5.4 release notes.',
      },
      {
        kind: 'mcq',
        id: 'typescript-10-mcq-debug-3',
        prompt:
          '> After installing a TS Language Service plugin via `tsconfig.json#plugins`, the custom diagnostics appear in the editor but NOT when running `tsc --noEmit` in CI:\n> ```json\n> // tsconfig.json\n> {\n>   "compilerOptions": {\n>     "plugins": [{ "name": "my-await-in-loop-plugin" }]\n>   }\n> }\n> ```\n> CI output shows zero errors even for code the plugin should flag. What is the root cause?',
        options: [
          'The plugin package is listed in `devDependencies`; move it to `dependencies` for CI to pick it up',
          '`tsconfig.json#plugins` is only loaded by the TypeScript Language Service (i.e., the editor\'s `tsserver`); `tsc` itself does not load or execute Language Service plugins, so plugin diagnostics never appear in CLI builds or CI',
          'Pass `--plugins my-await-in-loop-plugin` on the `tsc` command line to enable it for CLI builds',
          'Add `"skipLibCheck": false` to the tsconfig so `tsc` performs a full diagnostic pass including plugin checks',
        ],
        correctIndex: 1,
        explanation:
          'This is a fundamental limitation of the TS plugin architecture. `tsconfig.json#plugins` wires plugins into the Language Service used by editors (`tsserver`), but the `tsc` CLI does not load them. Plugin diagnostics are editor-only. If you need CI enforcement, you have two options: (1) write an ESLint rule that enforces the same constraint (ESLint runs in both editor and CI); (2) use a custom `tsc` transformer (via `ts-patch` or a build script) that runs as part of the compilation step.',
      },
      {
        kind: 'code',
        id: 'typescript-10-code-1',
        prompt: 'Use the `NoInfer` utility type on the `fallback` parameter of `getOrDefault` so that `T` is only inferred from the first argument.',
        boilerplate: `function getOrDefault<T>(value: T | undefined, fallback: T): T {\n  return value !== undefined ? value : fallback;\n}\n\n// @ts-expect-error - T should be inferred only as string; number fallback should be rejected\nconst res = getOrDefault("hello", 42);\n\nconsole.log(res);\n`,
        expectedOutput: 'hello',
        explanation: 'The `NoInfer<T>` utility type (introduced in TypeScript 5.4) prevents TypeScript from inferring a generic type parameter from the annotated argument position.'
      },
    ],
  },
];
