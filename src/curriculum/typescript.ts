import type { Phase } from './types';

export const typescriptPhases: Phase[] = [
  // ─── L1: JS Fundamentals reframed in TypeScript ───────────────────────────
  {
    id: 'typescript-1',
    language: 'typescript',
    level: 1,
    title: 'JS Fundamentals, TypeScript Style',
    timeEstimate: '4–6 hours',
    intro: `TypeScript is a typed superset of JavaScript that compiles to plain JS. Before diving into its type system, you need a solid grip on the JavaScript fundamentals that sit underneath — primitive values, \`const\`/\`let\`, control flow, functions, and basic DOM interaction — because TypeScript simply adds type annotations on top of code you already understand.

In this phase you write valid TypeScript from day one: every variable gets an explicit type annotation or a clear inferred type, and you use \`tsc --strict\` (or the playground) to catch mistakes before runtime. By the end you can write a small interactive page, describe all its data with primitive types, and explain why TypeScript is worth the extra characters.`,
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
        label: 'DOM manipulation (MDN)',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/DOM_scripting',
        note: 'querySelector, addEventListener, textContent — typed via lib.dom.d.ts',
      },
    ],
    deliverable:
      'A TypeScript file (no framework) that renders a counter to the DOM using typed event listeners. Zero `any` annotations. Passes `tsc --strict`.',
    checks: [
      {
        kind: 'mcq',
        id: 'ts1-mcq1',
        prompt: 'Which TypeScript type annotation correctly describes a variable that holds a whole number?',
        options: ['`int`', '`number`', '`integer`', '`float`'],
        correctIndex: 1,
        explanation:
          'TypeScript inherits JavaScript\'s single `number` type, which covers integers and floats. There is no `int` or `integer` primitive.',
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
          '`const` prevents reassignment of the binding (though object contents can still mutate). Both are block-scoped; `var` is function-scoped.',
      },
      {
        kind: 'code',
        id: 'ts1-code1',
        prompt:
          'Write a function `greet` that accepts a `name: string` and returns `"Hello, <name>!"`. Call it with `"World"` and log the result.',
        starterCode: `function greet(name: string): string {
  // your code here
  return '';
}

console.log(greet('World'));`,
        expectedOutput: 'Hello, World!\n',
        hint: 'Use a template literal: `` `Hello, ${name}!` ``',
      },
      {
        kind: 'code',
        id: 'ts1-code2',
        prompt:
          'Declare a `readonly` tuple type `[string, number]` called `person` holding your name and age. Log both values on separate lines.',
        starterCode: `const person: readonly [string, number] = ['Alice', 30];
// log name then age
`,
        expectedOutput: 'Alice\n30\n',
        hint: 'Access tuple elements with index 0 and 1.',
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

You will also explore array methods (\`map\`, \`filter\`, \`reduce\`) with proper generic type annotations, and learn when to prefer an \`interface\` over a \`type\` alias. By the end you can model any real-world data domain and write functions that TypeScript can verify exhaustively.`,
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
      'A typed data model for a small e-commerce cart: `Product`, `CartItem`, and `Cart` interfaces; a `total` function; a discriminated union for `PaymentMethod`. Zero `any`.',
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
          'A discriminated union uses a common literal property (`ok`) as the discriminant. TypeScript narrows the type after a check like `if (result.ok)`.',
      },
      {
        kind: 'mcq',
        id: 'ts2-mcq2',
        prompt:
          'Which assertion correctly narrows `unknown` to `string` in TypeScript?',
        options: [
          '`if (x.isString())`',
          '`if (typeof x === "string")`',
          '`if (x instanceof String)`',
          '`if (x as string)`',
        ],
        correctIndex: 1,
        explanation:
          '`typeof x === "string"` is a type guard that narrows `unknown` (or `any`) to `string` in the true branch. `instanceof String` matches boxed String objects, not primitives.',
      },
      {
        kind: 'code',
        id: 'ts2-code1',
        prompt:
          'Define an interface `Shape` with a discriminant field `kind: "circle" | "square"`. For circles add `radius: number`; for squares add `side: number`. Write an `area` function that handles both cases and logs the area of a circle with radius 5 and a square with side 4.',
        starterCode: `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number };

function area(shape: Shape): number {
  // your code here
  return 0;
}

console.log(area({ kind: 'circle', radius: 5 }));
console.log(area({ kind: 'square', side: 4 }));`,
        hint: 'Use `Math.PI * radius ** 2` for circles. The assertions check numeric accuracy so the exact float output format does not matter.',
        assertions: `
const circleArea = area({ kind: 'circle', radius: 5 });
const squareArea = area({ kind: 'square', side: 4 });
if (Math.abs(circleArea - Math.PI * 25) > 0.001) throw new Error('circle area wrong, got ' + circleArea);
if (squareArea !== 16) throw new Error('square area wrong, got ' + squareArea);
`,
      },
      {
        kind: 'code',
        id: 'ts2-code2',
        prompt:
          'Use `Array.prototype.filter` and `map` to extract all even numbers from `[1,2,3,4,5,6]` and double them. Log the result as a JSON array.',
        starterCode: `const nums: number[] = [1, 2, 3, 4, 5, 6];
const result = nums
  .filter(/* your predicate */)
  .map(/* your transform */);
console.log(JSON.stringify(result));`,
        expectedOutput: '[4,8,12]\n',
        hint: '`n % 2 === 0` checks evenness; `n * 2` doubles.',
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
    intro: `Modern TypeScript is written in ES modules (\`import\`/\`export\`), runs asynchronous code with \`async\`/\`await\`, and fetches remote data with the Fetch API. This phase closes the gap between "I can write typed functions" and "I can build a real networked app."

You will learn how \`Promise<T>\` is typed, how \`async\` functions return \`Promise<T>\` automatically, how to model errors with discriminated unions instead of \`try/catch\` swallowing, and how tooling (\`tsconfig.json\`, \`npm\`/\`pnpm\`) ties everything together. Generators are introduced as the low-level primitive behind async iteration.`,
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
        label: 'Iterators and Generators (MDN)',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators',
        note: 'function*, yield, Symbol.iterator, async generators',
      },
      {
        label: 'tsconfig reference',
        url: 'https://www.typescriptlang.org/tsconfig',
        note: 'strict, target, module, moduleResolution — the settings that matter most',
      },
      {
        label: 'pnpm quick start',
        url: 'https://pnpm.io/installation',
        note: 'Faster npm alternative; standard in modern monorepos',
      },
    ],
    deliverable:
      'A typed CLI script (or browser module) that fetches a JSON endpoint, validates the shape with a type guard, and handles errors with a `Result<T, E>` type instead of naked `try/catch`.',
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
          'An `async` function always returns a `Promise`. The annotation `Promise<User>` tells TypeScript what the resolved value type will be.',
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
          '`"strict": true` is the umbrella flag that activates `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`, and several others at once.',
      },
      {
        kind: 'code',
        id: 'ts3-code1',
        prompt:
          'Write a `Result<T, E>` type and a `safeDiv` function that returns `{ ok: true; value: number }` for valid division or `{ ok: false; error: string }` when dividing by zero. Log the `.value` for `safeDiv(10, 2)` and the `.error` for `safeDiv(5, 0)`.',
        starterCode: `type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function safeDiv(a: number, b: number): Result<number, string> {
  // your code here
  return { ok: false, error: 'not implemented' };
}

const r1 = safeDiv(10, 2);
const r2 = safeDiv(5, 0);
if (r1.ok) console.log(r1.value);
if (!r2.ok) console.log(r2.error);`,
        expectedOutput: '5\nDivision by zero\n',
        hint: 'Check `if (b === 0)` and return the error variant.',
      },
      {
        kind: 'code',
        id: 'ts3-code2',
        prompt:
          'Write a generator function `range(start: number, end: number)` that yields integers from `start` up to (but not including) `end`. Collect the values for `range(1, 6)` into an array and log it as JSON.',
        starterCode: `function* range(start: number, end: number): Generator<number> {
  // your code here
}

const values = [...range(1, 6)];
console.log(JSON.stringify(values));`,
        expectedOutput: '[1,2,3,4,5]\n',
        hint: 'Use a `while (start < end)` loop with `yield start++`.',
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

You will also get your first taste of the testing ecosystem — Vitest brings fast ESM-native unit tests — and a brief React/Next.js orientation so you can contextualise where TypeScript sits in a real product stack.`,
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
      'A generic `Queue<T>` class with `enqueue`, `dequeue`, and `peek`, tested with Vitest. Plus a utility type `DeepReadonly<T>` that recursively makes all properties readonly.',
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
          '`keyof T` produces a union of the literal key names of `T`. For `{ name: string; age: number }` that is `"name" | "age"`.',
      },
      {
        kind: 'mcq',
        id: 'ts4-mcq2',
        prompt: 'Which utility type makes all properties of `T` optional?',
        options: ['`Required<T>`', '`Partial<T>`', '`Readonly<T>`', '`Pick<T, K>`'],
        correctIndex: 1,
        explanation:
          '`Partial<T>` maps every property of `T` to its optional (`?`) equivalent. `Required<T>` does the opposite.',
      },
      {
        kind: 'code',
        id: 'ts4-code1',
        prompt:
          'Implement a generic `first<T>(arr: T[]): T | undefined` function. Log the first element of `[10, 20, 30]` and the result of calling it on an empty array.',
        starterCode: `function first<T>(arr: T[]): T | undefined {
  // your code here
}

console.log(first([10, 20, 30]));
console.log(first([]));`,
        expectedOutput: '10\nundefined\n',
        hint: 'Return `arr[0]` — which is `undefined` when the array is empty (with `noUncheckedIndexedAccess` enabled).',
      },
      {
        kind: 'code',
        id: 'ts4-code2',
        prompt:
          'Using `Omit<T, K>`, create a type `UserPreview` from `{ id: number; name: string; email: string; password: string }` that excludes `password` and `email`. Log the keys of a sample object of that type as JSON.',
        starterCode: `type User = { id: number; name: string; email: string; password: string };
type UserPreview = Omit<User, 'password' | 'email'>;

const preview: UserPreview = { id: 1, name: 'Alice' };
console.log(JSON.stringify(Object.keys(preview)));`,
        expectedOutput: '["id","name"]\n',
        hint: '`Omit` takes a type and a union of keys to remove. Just get the object keys right.',
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

This phase treats the type system as a programming language in its own right. You will build type utilities that would have been impossible in TS 3.x, learn why variance matters for function parameters, and understand how distributive conditional types process union members individually — enabling powerful patterns like \`UnionToIntersection<T>\`.`,
    topics: [
      {
        label: 'Template Literal Types',
        url: 'https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html',
        note: '`\`${A}${B}\`` at the type level — powerful string manipulation',
      },
      {
        label: 'Recursive Types and Conditional Types deep dive',
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
      'A set of five type utilities: `DeepPartial<T>`, `FlattenPromise<T>`, `UnionToIntersection<U>`, `PathsOf<T>` (dot-notation string keys), and `Awaited<T>` (re-implement the built-in). Each has a `type` test using `satisfies`.',
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
        kind: 'code',
        id: 'ts5-code1',
        prompt:
          'Use a template literal type to build an `EventName<T extends string>` type that produces `"on${Capitalize<T>}"`. Then write a small runtime function that mirrors this: given a string, return the prefixed event name. Log the result for `"click"` and `"keydown"`.',
        starterCode: `type EventName<T extends string> = \`on\${Capitalize<T>}\`;

// Runtime mirror
function eventName<const T extends string>(event: T): \`on\${Capitalize<T>}\` {
  return \`on\${event.charAt(0).toUpperCase()}\${event.slice(1)}\` as \`on\${Capitalize<T>}\`;
}

console.log(eventName('click'));
console.log(eventName('keydown'));`,
        expectedOutput: 'onClick\nonKeydown\n',
        hint: 'Use `event.charAt(0).toUpperCase() + event.slice(1)` to capitalise at runtime.',
      },
      {
        kind: 'code',
        id: 'ts5-code2',
        prompt:
          'Implement `DeepReadonly<T>` as a recursive mapped type. Apply it to a nested object and log a key to confirm the structure compiles.',
        starterCode: `type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

type Config = DeepReadonly<{
  server: { host: string; port: number };
  debug: boolean;
}>;

const cfg: Config = { server: { host: 'localhost', port: 3000 }, debug: false };
console.log(cfg.server.host);
console.log(cfg.debug);`,
        expectedOutput: 'localhost\nfalse\n',
        hint: 'The recursive branch applies `DeepReadonly` when the property type `extends object`.',
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

You will also learn the ergonomics that distinguish great public APIs: avoiding \`any\` in public signatures, using \`readonly\` arrays for return values, and documenting with JSDoc so VS Code hover cards show rich descriptions.`,
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
      'A minimal utility library (`src/index.ts`) with dual ESM/CJS output. Includes a hand-written `.d.ts` entry, TSDoc comments on every export, and a README snippet showing `import type` usage.',
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
          'The `exports` field in package.json supports conditional exports: `"import"` matches `import` statements (ESM) and `"require"` matches `require()` calls (CJS), enabling dual packages.',
      },
      {
        kind: 'code',
        id: 'ts6-code1',
        prompt:
          'Demonstrate declaration merging: declare an interface `Logger` with a `log(msg: string): void` method. Then merge in a second `debug(msg: string): void` method via a second interface declaration. Create an object satisfying both and call both methods, logging the outputs.',
        starterCode: `interface Logger {
  log(msg: string): void;
}

// Merge a second method in
interface Logger {
  debug(msg: string): void;
}

const logger: Logger = {
  log(msg) { console.log('[LOG] ' + msg); },
  debug(msg) { console.log('[DEBUG] ' + msg); },
};

logger.log('hello');
logger.debug('world');`,
        expectedOutput: '[LOG] hello\n[DEBUG] world\n',
        hint: 'Two `interface Logger` declarations in the same scope merge automatically.',
      },
      {
        kind: 'code',
        id: 'ts6-code2',
        prompt:
          'Write a generic `memoize<T extends (...args: unknown[]) => unknown>(fn: T): T` function that caches results keyed by JSON-stringified arguments. Call it with an `add` function and log the result of two calls to confirm caching works.',
        starterCode: `function memoize<T extends (...args: unknown[]) => unknown>(fn: T): T {
  const cache = new Map<string, unknown>();
  return ((...args: unknown[]) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

const add = memoize((a: number, b: number) => {
  console.log('computing');
  return a + b;
});

console.log(add(2, 3));
console.log(add(2, 3)); // should NOT log 'computing' again`,
        expectedOutput: 'computing\n5\n5\n',
        hint: 'The second call returns the cached result without running the function body again.',
      },
    ],
  },

  // ─── L7: Modern React Patterns ────────────────────────────────────────────
  {
    id: 'typescript-7',
    language: 'typescript',
    level: 7,
    title: 'Modern React & Next.js Patterns',
    timeEstimate: '10–16 hours',
    intro: `React 19 and Next.js App Router introduce a new mental model: components can be async, data fetching happens on the server, and the client bundle ships only the JS users actually need. This phase maps TypeScript concepts onto that model — typing \`use()\`, server/client component boundaries, Suspense boundaries, transitions, and the React Compiler's assumptions about pure functions.

You will learn how to type \`params\` and \`searchParams\` in App Router pages, how to co-locate server actions with their calling components, and why TypeScript's \`strict\` mode is non-negotiable in a codebase this complex.`,
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
        label: 'Next.js App Router — TypeScript',
        url: 'https://nextjs.org/docs/app/api-reference/file-conventions/page',
        note: 'PageProps, LayoutProps, server actions typing',
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
      'A Next.js App Router page with a server component that fetches data (typed with an interface), a client component that handles user interaction, and a Suspense boundary between them. Full strict TypeScript throughout.',
    checks: [
      {
        kind: 'mcq',
        id: 'ts7-mcq1',
        prompt:
          'In Next.js App Router, what TypeScript type is used for the `params` prop on a dynamic segment page?',
        options: [
          '`{ params: Record<string, string> }`',
          '`{ params: Promise<{ [key: string]: string }> }` (Next.js 15+)',
          '`URLSearchParams`',
          '`{ params: string[] }`',
        ],
        correctIndex: 1,
        explanation:
          'From Next.js 15, `params` and `searchParams` are `Promise`s that must be awaited inside the component body. The type is `Promise<{ slug: string }>` for a `[slug]` segment.',
      },
      {
        kind: 'mcq',
        id: 'ts7-mcq2',
        prompt:
          'What does the `"use client"` directive at the top of a file tell the Next.js bundler?',
        options: [
          'The file will only run in the browser; it marks the client component boundary',
          'The file uses client-side encryption',
          'The file imports from the `client` npm scope',
          'It enables hot-module replacement for that file only',
        ],
        correctIndex: 0,
        explanation:
          '`"use client"` is a bundler directive that marks the file (and everything it imports) as a client component tree. Without it, components in the App Router are server components by default.',
      },
      {
        kind: 'code',
        id: 'ts7-code1',
        prompt:
          'Type a React component\'s props using an interface. Write a `Badge` component that accepts `label: string` and `count: number`, and returns a string representation (for the sandbox, log it instead of rendering). Log the output for `{ label: "Alerts", count: 3 }`.',
        starterCode: `interface BadgeProps {
  label: string;
  count: number;
}

function Badge({ label, count }: BadgeProps): string {
  return \`\${label} (\${count})\`;
}

console.log(Badge({ label: 'Alerts', count: 3 }));`,
        expectedOutput: 'Alerts (3)\n',
        hint: 'Use a template literal to combine label and count.',
      },
      {
        kind: 'code',
        id: 'ts7-code2',
        prompt:
          'Simulate a typed server action: write a function `createTodo(formData: { title: string; done: boolean })` that returns a `Promise<{ id: number; title: string; done: boolean }>`. Await it and log the `id` and `title`.',
        starterCode: `interface Todo {
  id: number;
  title: string;
  done: boolean;
}

async function createTodo(data: { title: string; done: boolean }): Promise<Todo> {
  // Simulate async DB insert
  return { id: 1, ...data };
}

async function main() {
  const todo = await createTodo({ title: 'Write tests', done: false });
  console.log(todo.id);
  console.log(todo.title);
}

main();`,
        expectedOutput: '1\nWrite tests\n',
        hint: 'Spread the incoming `data` object and add a static `id: 1`.',
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

This phase also covers advanced testing: Playwright end-to-end tests with proper TypeScript types, Vitest component testing, and accessibility tooling (axe-core, Lighthouse CI). You will learn how accessibility and types reinforce each other — semantic HTML produces fewer TypeScript gymnastics around \`null\` checks.`,
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
      'A typed XState machine for a multi-step form (idle → filling → submitting → success | error). Vitest unit tests for each transition. A Playwright test verifying the happy path in a browser.',
    checks: [
      {
        kind: 'mcq',
        id: 'ts8-mcq1',
        prompt:
          'In XState v5, what TypeScript type represents "an object describing all possible states and their transitions"?',
        options: [
          '`StateMachine<TContext, TEvent>`',
          '`MachineConfig<TContext, TEvent>`',
          'The first argument to `createMachine()` — an inline object literal inferred by TypeScript',
          '`StateChart<TState, TContext>`',
        ],
        correctIndex: 2,
        explanation:
          'XState v5 uses TypeScript inference on the `createMachine()` argument directly — there is no separate `MachineConfig` import needed. TypeScript infers all state and event types from the definition object.',
      },
      {
        kind: 'mcq',
        id: 'ts8-mcq2',
        prompt:
          'What Playwright method waits for a specific text to appear in the DOM before continuing?',
        options: [
          '`page.waitForSelector(".text")`',
          '`page.waitForTimeout(1000)`',
          '`expect(page.getByText("Hello")).toBeVisible()`',
          '`page.on("text", ...)`',
        ],
        correctIndex: 2,
        explanation:
          '`expect(locator).toBeVisible()` auto-waits until the element is visible (or times out). It is the idiomatic Playwright assertion and avoids brittle `waitForTimeout` sleeps.',
      },
      {
        kind: 'code',
        id: 'ts8-code1',
        prompt:
          'Model a traffic-light state machine (without XState) using a discriminated union and a typed `transition` function. Log the sequence: Green → Yellow → Red → Green.',
        starterCode: `type TrafficLight = 'green' | 'yellow' | 'red';

function transition(current: TrafficLight): TrafficLight {
  // your code here
  return current;
}

let state: TrafficLight = 'green';
console.log(state);
state = transition(state);
console.log(state);
state = transition(state);
console.log(state);
state = transition(state);
console.log(state);`,
        expectedOutput: 'green\nyellow\nred\ngreen\n',
        hint: 'Use a switch or object map: green→yellow, yellow→red, red→green.',
      },
      {
        kind: 'code',
        id: 'ts8-code2',
        prompt:
          'Write a typed `EventEmitter<Events>` class where `Events` is a record of event name → callback type. Implement `on` and `emit`. Log messages from two different events.',
        starterCode: `type Listener<T> = (payload: T) => void;

class TypedEmitter<Events extends Record<string, unknown>> {
  private listeners: { [K in keyof Events]?: Listener<Events[K]>[] } = {};

  on<K extends keyof Events>(event: K, fn: Listener<Events[K]>): void {
    (this.listeners[event] ??= []).push(fn);
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    this.listeners[event]?.forEach(fn => fn(payload));
  }
}

type AppEvents = { message: string; count: number };
const emitter = new TypedEmitter<AppEvents>();

emitter.on('message', msg => console.log('msg: ' + msg));
emitter.on('count', n => console.log('count: ' + n));

emitter.emit('message', 'hello');
emitter.emit('count', 42);`,
        expectedOutput: 'msg: hello\ncount: 42\n',
        hint: 'Use `??=` to initialise the listeners array lazily.',
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

This phase also covers the TypeScript compiler API itself: parsing a source file into an AST, traversing nodes, writing a simple code transformation, and understanding how the Language Server Protocol (LSP) connects the compiler to your editor.`,
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
      'A Node.js script using the TypeScript Compiler API that reads a `.ts` file, finds every `console.log` call, and prints the line numbers. Include a Vite `vite.config.ts` for a toy project demonstrating a custom plugin.',
    checks: [
      {
        kind: 'mcq',
        id: 'ts9-mcq1',
        prompt:
          'Why does esbuild transpile TypeScript significantly faster than `tsc`?',
        options: [
          'It uses WASM to run inside the browser',
          'It processes each file independently without performing type checking, written in Go with parallelism',
          'It caches all previous outputs permanently on disk',
          'It skips source maps to save time',
        ],
        correctIndex: 1,
        explanation:
          'esbuild is written in Go, processes files in parallel, and strips type annotations without doing full type inference. This is why it cannot catch type errors — that is still `tsc`\'s job.',
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
        kind: 'code',
        id: 'ts9-code1',
        prompt:
          'Demonstrate simple AST-like analysis without the compiler API: write a function `countConsoleLogs(src: string): number` that counts occurrences of `console.log(` in a source string using a regex. Log the count for a sample string.',
        starterCode: `function countConsoleLogs(src: string): number {
  const matches = src.match(/console\\.log\\(/g);
  return matches ? matches.length : 0;
}

const sample = \`
const x = 1;
console.log(x);
console.log('hello');
const y = 2;
\`;

console.log(countConsoleLogs(sample));`,
        expectedOutput: '2\n',
        hint: 'Use a global regex `/console\\.log\\(/g` and count the match array length.',
      },
      {
        kind: 'code',
        id: 'ts9-code2',
        prompt:
          'Write a typed `pipe<T>(...fns: Array<(x: T) => T>)` function that applies functions left-to-right. Log the result of piping `[x => x + 1, x => x * 2, x => x - 3]` over `5`.',
        starterCode: `function pipe<T>(...fns: Array<(x: T) => T>): (x: T) => T {
  return (x: T) => fns.reduce((acc, fn) => fn(acc), x);
}

const transform = pipe<number>(
  x => x + 1,
  x => x * 2,
  x => x - 3,
);

console.log(transform(5));`,
        expectedOutput: '9\n',
        hint: '(5+1)=6, (6*2)=12, (12-3)=9. Use `Array.prototype.reduce`.',
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

You will write a language service plugin that adds a custom completion entry, explore how \`tsc\` performs type inference (unification, widening, narrowing), and study advanced inference patterns like \`NoInfer<T>\` (TS 5.4) and const type parameters (TS 5.0). By the end you can file a precise TypeScript bug report, read a type inference trace (\`--generateTrace\`), and explain how any given type is resolved.`,
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
      'A TypeScript Language Service Plugin (npm package) that adds a `// @deprecated-hint` diagnostic whenever a function named `legacyFn` is called. Tested with the TypeScript test infrastructure. A written explanation of one non-trivial type inference rule from `checker.ts`.',
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
          '`NoInfer<T>` is a built-in utility type that opts a specific argument out of inference. The type parameter `T` is still usable — TypeScript just will not infer it from the annotated position.',
      },
      {
        kind: 'mcq',
        id: 'ts10-mcq2',
        prompt:
          'In TypeScript 5.5+, what happens when you write `const strings = mixed.filter(x => typeof x === "string")`?',
        options: [
          'TypeScript infers `strings` as `unknown[]` because `filter` returns the same array type',
          'TypeScript infers the predicate as `x is string` automatically, so `strings` is typed as `string[]`',
          'You must write `.filter((x): x is string => ...)` explicitly or get a type error',
          'TypeScript widens the type to `(string | number)[]` to be safe',
        ],
        correctIndex: 1,
        explanation:
          'TS 5.5 introduced inferred type predicates: when a filter callback is a simple type-narrowing expression, TypeScript automatically infers the `x is string` predicate, so the result is `string[]`.',
      },
      {
        kind: 'code',
        id: 'ts10-code1',
        prompt:
          'Use `const` type parameters (TS 5.0) to write a `tuple<const T extends readonly unknown[]>(...args: T): T` function that infers the narrowest possible tuple type. Log the JSON of calling it with `(1, "two", true)`.',
        starterCode: `function tuple<const T extends readonly unknown[]>(...args: T): T {
  return args;
}

const t = tuple(1, 'two', true);
console.log(JSON.stringify(t));`,
        expectedOutput: '[1,"two",true]\n',
        hint: 'The `const` modifier on the type parameter tells TypeScript to infer literal types rather than widening to `number | string | boolean`.',
      },
      {
        kind: 'code',
        id: 'ts10-code2',
        prompt:
          'Implement `UnionToIntersection<U>` using distributive conditional types and the contra-variance of function parameters. Apply it to `{ a: number } | { b: string }` and log a value of the resulting type.',
        starterCode: `type UnionToIntersection<U> =
  (U extends unknown ? (x: U) => void : never) extends (x: infer I) => void
    ? I
    : never;

type Merged = UnionToIntersection<{ a: number } | { b: string }>;

const obj: Merged = { a: 42, b: 'hello' };
console.log(obj.a);
console.log(obj.b);`,
        expectedOutput: '42\nhello\n',
        hint: 'The trick is that a function parameter position is contra-variant, so the intersection is inferred when unifying multiple `(x: T) => void` signatures.',
      },
    ],
  },
];
