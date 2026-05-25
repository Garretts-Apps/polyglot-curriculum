import type { Phase } from './types';

export const typescriptPhases: Phase[] = [
  // ─── L1: JS Fundamentals reframed in TypeScript ───────────────────────────
  {
    id: 'typescript-1',
    language: 'typescript',
    level: 1,
    title: 'JS Fundamentals, TypeScript Style',
    timeEstimate: '4–6 hours',
    intro: `TypeScript is a typed superset of JavaScript that compiles to plain JS. Before diving into its type system, you need a solid grip on the JavaScript fundamentals that sit underneath — primitive values, \`const\`/\`let\`, control flow, functions, and basic Node CLI I/O — because TypeScript simply adds type annotations on top of code you already understand.

In this phase you write valid TypeScript from day one: every variable gets an explicit type annotation or a clear inferred type, and you use \`tsc --strict\` to catch mistakes before runtime. **Build locally**: a \`cli/greet.ts\` Node CLI (\`tsx\` or \`bun run\`) that takes argv name and prints greeting with ISO timestamp. By the end you can write a small CLI, describe all its data with primitive types, and explain why TypeScript is worth the extra characters.`,
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
        kind: 'mcq',
        id: 'ts1-mcq1',
        prompt: 'Which TypeScript type annotation correctly describes a variable that holds a whole number?',
        options: ['`int`', '`number`', '`integer`', '`float`'],
        correctIndex: 1,
        explanation:
          "TypeScript inherits JavaScript's single `number` type (IEEE 754 double), which covers integers and floats. There is no `int` or `integer` primitive. See the TS Handbook → Everyday Types.",
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
    ],
  },

  // ─── L2: TypeScript Type System Core ──────────────────────────────────────
  {
    id: 'typescript-2',
    language: 'typescript',
    level: 2,
    title: 'The TypeScript Type System',
    timeEstimate: '5–8 hours',
    intro: `TypeScript's type system is structural, not nominal — types are compatible when their shapes match. This phase covers the constructs you reach for every day: interfaces and type aliases, union and intersection types, literal types, and the narrowing / type-guard patterns that let you write safe code without runtime bloat.

You will also explore array methods (\`map\`, \`filter\`, \`reduce\`) with proper generic type annotations, and learn when to prefer an \`interface\` over a \`type\` alias. **Build locally**: a \`cart.ts\` Node CLI that models a small e-commerce cart with \`Product\`, \`CartItem\`, and \`Cart\` types, a \`total()\` function, and a discriminated union for \`PaymentMethod\`. By the end you can model any real-world data domain and write functions that TypeScript can verify exhaustively.`,
    topics: [
      {
        label: 'Interfaces',
        url: 'https://www.typescriptlang.org/docs/handbook/2/objects.html',
        note: 'Object shapes, optional/readonly properties, index signatures',
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
    ],
  },

  // ─── L3: Modules, Async, Fetch ────────────────────────────────────────────
  {
    id: 'typescript-3',
    language: 'typescript',
    level: 3,
    title: 'Modules, Async/Await & Error Handling',
    timeEstimate: '6–8 hours',
    intro: `Modern TypeScript is written in ES modules (\`import\`/\`export\`), runs asynchronous code with \`async\`/\`await\`, and fetches remote data with the global Fetch API (Node 18+). This phase closes the gap between "I can write typed functions" and "I can build a real networked app."

You will learn how \`Promise<T>\` is typed, how \`async\` functions return \`Promise<T>\` automatically, how to model errors with discriminated unions, and how to use \`AbortController\` for timeouts. **Build locally**: a \`fetcher.ts\` CLI that fetches a URL, parses JSON, prints top-level keys, with proper error handling and \`AbortController\` timeout.`,
    topics: [
      {
        label: 'ES Modules in TypeScript',
        url: 'https://www.typescriptlang.org/docs/handbook/2/modules.html',
        note: 'import/export, type-only imports, module resolution strategies',
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
          'Which `tsconfig` option enables the whole suite of strict checks (noImplicitAny, strictNullChecks, etc.) with a single flag?',
        options: [
          '`"noImplicitAny": true`',
          '`"strict": true`',
          '`"esModuleInterop": true`',
          '`"isolatedModules": true`',
        ],
        correctIndex: 1,
        explanation:
          '`"strict": true` is the umbrella flag that activates `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`, and several others at once. See tsconfig reference.',
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
    ],
  },

  // ─── L4: Generics & Utility Types ─────────────────────────────────────────
  {
    id: 'typescript-4',
    language: 'typescript',
    level: 4,
    title: 'Generics, Utility Types & Testing',
    timeEstimate: '8–10 hours',
    intro: `Generics are TypeScript's answer to reusability without sacrificing type safety. A single \`Stack<T>\` implementation works for numbers, strings, or any other type — and the compiler tracks which \`T\` you used. This phase covers generic functions, generic interfaces, constraints (\`extends\`), mapped types, conditional types, and the built-in utility types (\`Partial\`, \`Required\`, \`Pick\`, \`Omit\`, \`Record\`, \`ReturnType\`…).

**Build locally**: a generic \`db.ts\` typed wrapper around an in-memory store with \`add<T>\`, \`find<T>\`, \`delete<T>\` and full type narrowing. You'll also get your first taste of the testing ecosystem with Vitest.`,
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
          'What does `type Keys<T> = keyof T` produce when `T = { name: string; age: number }`?',
        options: [
          '`string | number` (the value types)',
          '`"name" | "age"` (a union of the key names)',
          '`{ name: string; age: number }` (the same type)',
          '`Array<string>` (an array of key strings)',
        ],
        correctIndex: 1,
        explanation:
          '`keyof T` produces a union of the literal key names of `T`. For `{ name: string; age: number }` that is `"name" | "age"`. See TS Handbook → Keyof Type Operator.',
      },
      {
        kind: 'mcq',
        id: 'ts4-mcq2',
        prompt: 'Which utility type makes all properties of `T` optional?',
        options: ['`Required<T>`', '`Partial<T>`', '`Readonly<T>`', '`Pick<T, K>`'],
        correctIndex: 1,
        explanation:
          '`Partial<T>` maps every property of `T` to its optional (`?`) equivalent. `Required<T>` does the opposite. See TS Handbook → Utility Types.',
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
          'Given `type User = { id: number; name: string; email: string; password: string }`, what is `Omit<User, "password" | "email">`?',
        options: [
          '`{ password: string; email: string }`',
          '`{ id: number; name: string }`',
          '`{ id: number; name: string; email: string; password: string }`',
          '`never`',
        ],
        correctIndex: 1,
        explanation:
          '`Omit<T, K>` returns a type identical to `T` minus the keys in `K`. Removing `password` and `email` leaves `{ id; name }`. See TS Handbook → Utility Types.',
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
    ],
  },

  // ─── L5: Advanced Type-Level Programming ──────────────────────────────────
  {
    id: 'typescript-5',
    language: 'typescript',
    level: 5,
    title: 'Advanced Types & Type-Level Programming',
    timeEstimate: '10–14 hours',
    intro: `TypeScript 4.x–5.x introduced features that blur the line between types and computation: template literal types, recursive types, distributive conditional types, variance annotations, and \`infer\` patterns that let you extract type information from deeply nested structures.

**Build locally**: a \`type-lab.ts\` Node script that defines and exercises five type utilities (\`DeepPartial<T>\`, \`FlattenPromise<T>\`, \`UnionToIntersection<U>\`, \`PathsOf<T>\`, and a re-implementation of \`Awaited<T>\`), each with a \`satisfies\`-based type test. The script logs a small sanity-check value to stdout for each utility.`,
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
    ],
  },

  // ─── L6: Library Authoring ────────────────────────────────────────────────
  {
    id: 'typescript-6',
    language: 'typescript',
    level: 6,
    title: 'Library Authoring & Declaration Files',
    timeEstimate: '8–12 hours',
    intro: `Writing a library is a different discipline from writing an application: every type you expose becomes a public contract that consumers depend on. This phase covers the full publishing pipeline — strict \`tsconfig\` settings, hand-crafting \`.d.ts\` declaration files, dual ESM/CJS output with the \`exports\` field in \`package.json\`, type-only imports and exports to keep bundles lean, and declaration merging to extend third-party types.

**Build locally**: a tiny utility library (\`packages/tiny-utils\`) with \`src/index.ts\`, dual ESM/CJS output, a hand-written \`.d.ts\` entry, and TSDoc comments on every export. A consumer script demonstrates \`import type\` usage and verifies the package via \`node\` after \`tsc --build\`.`,
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
        note: '@param, @returns, @remarks — drives IntelliSense hover docs',
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
          'Which export is *erased* at compile time and never appears in the emitted JS?',
        options: [
          '`export function helper() {}`',
          '`export const VERSION = "1.0";`',
          '`export type Foo = string;`',
          '`export default class A {}`',
        ],
        correctIndex: 2,
        explanation:
          '`export type` (and `export interface`) are type-only constructs and are stripped at compile time. The other forms produce runtime JavaScript exports.',
      },
      {
        kind: 'mcq',
        id: 'ts6-mcq6',
        prompt:
          'Which TSDoc tag adds a `@deprecated` marker that VS Code will visually strike through at call sites?',
        options: ['`@obsolete`', '`@deprecated`', '`@removed`', '`@warning`'],
        correctIndex: 1,
        explanation:
          '`@deprecated` is recognised by the TypeScript language service and surfaces in editor tooling. See tsdoc.org for the full tag list.',
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
    intro: `React 19 and Next.js 16 App Router introduce a new mental model: components can be async, data fetching happens on the server, and the client bundle ships only the JS users actually need. This phase maps TypeScript concepts onto that model — typing \`use()\`, server/client component boundaries, Suspense boundaries, transitions, and the React Compiler's assumptions about pure functions.

**Build locally**: a Next.js App Router blog with RSC, dynamic routes, server actions for comments, and Suspense streaming. Full strict TypeScript, \`params\` typed as \`Promise<{ slug: string }>\`, and a typed server action calling \`revalidatePath\`.`,
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
    ],
  },

  // ─── L8: State Machines, Testing & Accessibility ──────────────────────────
  {
    id: 'typescript-8',
    language: 'typescript',
    level: 8,
    title: 'State Machines, Advanced Testing & Accessibility',
    timeEstimate: '12–16 hours',
    intro: `Production-grade UIs have states that are hard to reason about — loading, error, empty, populated, editing. XState models these explicitly as finite state machines or statecharts, and TypeScript types each state and event, making impossible states truly impossible to represent in code.

**Build locally**: a \`forms-machine.ts\` Node script that defines a typed XState v5 machine for a multi-step form (\`idle → filling → submitting → success | error\`) and runs Vitest unit tests for each transition. A Playwright spec runs against a small Next.js page that drives the same machine in the browser.`,
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
          'Which aria attribute is correctly typed by `lib.dom.d.ts` and the right choice for a busy-state region (e.g. loading spinner) per WCAG 2.2?',
        options: [
          '`aria-busy="true"`',
          '`aria-loading="spinner"`',
          '`role="loading"`',
          '`data-busy`',
        ],
        correctIndex: 0,
        explanation:
          '`aria-busy="true"` informs assistive technologies that the element is currently being updated. `aria-loading` is not a real ARIA attribute, and `data-busy` is not semantic.',
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
    ],
  },

  // ─── L9: Build Tooling Internals ──────────────────────────────────────────
  {
    id: 'typescript-9',
    language: 'typescript',
    level: 9,
    title: 'Build Tooling Internals',
    timeEstimate: '14–20 hours',
    intro: `Modern TypeScript projects are compiled by tools that are not \`tsc\`: esbuild, swc, Vite, and Turbopack all transpile TypeScript orders of magnitude faster than the compiler, because they skip type checking and operate on each file independently. Understanding that pipeline — what is stripped (type annotations), what is transformed (decorators, JSX), and what errors can only be caught by \`tsc\` — makes you a far more effective engineer.

**Build locally**: a tiny ts-to-js transformer with the TS Compiler API that strips type annotations from a single file. The CLI accepts an input path and writes the stripped output to stdout, exiting non-zero on parse errors.`,
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
    ],
  },

  // ─── L10: Compiler Plugins & Deep TS Internals ────────────────────────────
  {
    id: 'typescript-10',
    language: 'typescript',
    level: 10,
    title: 'Compiler Plugins, Language Service & TS Internals',
    timeEstimate: '20–30 hours',
    intro: `The final level is about understanding TypeScript from the inside out: how the checker resolves types, how language service plugins add custom diagnostics and completions, and how to contribute to — or at least intelligently read — the TypeScript source itself.

**Build locally**: a TS Language Service plugin (npm package) that adds a custom diagnostic when a Promise is awaited inside a loop (e.g. \`for (const x of xs) await fn(x)\`). The plugin registers via \`tsconfig.json#plugins\` and surfaces the warning in any TypeScript-aware editor.`,
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
    ],
  },
];
