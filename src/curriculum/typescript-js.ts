import type { Phase } from './types';

export const typescriptJsPhases: Phase[] = [
  // ─── Level 0 ─────────────────────────────────────────────────────────────
  {
    id: 'typescript-js-0',
    language: 'typescript-js',
    level: 0,
    title: 'Setup & Hello World — "JS Is Already Valid TS"',
    timeEstimate: '0.5-1 hours',
    intro: `You already write JavaScript, so the first thing to internalise is the most reassuring fact about TypeScript: **every \`.js\` file is already a valid \`.ts\` file.** Rename \`app.js\` to \`app.ts\` and it still works — TypeScript is JavaScript *plus* an optional layer of **types** that the compiler checks and then throws away. Nothing you already know stops being true; you're only adding a checker on top.

**What is a type annotation?** It's a *compile-time contract* you attach to a value with a colon, e.g. \`const greeting: string = "Hello, World!"\`. Read it left to right:
- \`const greeting\` — ordinary JS: declare a constant named \`greeting\` (you've done this a thousand times).
- \`: string\` — this is the *annotation*. The colon means "and its type is", and \`string\` means "text". So you're promising: *greeting will always be text*.
- \`= "Hello, World!"\` — the value, exactly as in JS.

The annotation is **optional**. Write \`const greeting = "Hello, World!"\` with no \`: string\` and TypeScript *infers* the type \`string\` for you from the value — you get the same checking with less typing. You annotate only where inference can't help (more on that next level).

**Types vanish at runtime — the crucial mental model.** A type is not a value. It exists *only while the compiler is looking*. \`tsc\` (the TypeScript compiler) reads your \`.ts\`, checks every annotation, and **emits plain \`.js\` with all the types deleted**. The line above compiles to exactly \`const greeting = "Hello, World!";\` — the \`: string\` is gone. There is no \`.ts\` runtime, no type information in the running program; Node and browsers run the same JavaScript they always did. Types have **zero runtime cost** and **zero runtime effect**.

**So what do types actually buy you?** They turn a class of bugs into *compile errors* you see before you ship. If you write \`const greeting: string = 42\`, that is **not** a runtime crash — the program would happily run \`const greeting = 42\` in plain JS. Instead \`tsc\` *refuses*: it reports \`Type 'number' is not assignable to type 'string'\` and (by default) won't emit clean output. That's the whole deal — \`tsc\` never changes what your code *does*; it only warns/refuses when the annotations don't add up.

**Try it locally.** \`npm i -D typescript\`, then \`npx tsc --init\` to generate a \`tsconfig.json\` (the project's compiler settings file). Write \`hello.ts\`, run \`npx tsc hello.ts\` to produce \`hello.js\`, then \`node hello.js\`. Run \`npx tsc --noEmit\` to *type-check only* — it reports errors but writes no \`.js\` (this is how CI guards correctness when a separate bundler does the actual transpiling). Everything in this course transpiles in the browser too, so you can just hit Run.`,
    topics: [
      { label: 'TypeScript — Get Started', url: 'https://www.typescriptlang.org/download/', note: 'Install via npm and run tsc' },
      { label: 'TS for JS Programmers', url: 'https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html', note: 'The canonical "you already know most of this" intro' },
      { label: 'TypeScript Playground', url: 'https://www.typescriptlang.org/play', note: 'Type-check and see emitted JS live in your browser' },
      { label: 'tsc CLI options', url: 'https://www.typescriptlang.org/docs/handbook/compiler-options.html', note: 'Reference for tsc flags like --noEmit and --strict' },
    ],
    deliverable: 'Run tsc --version locally, generate a tsconfig.json, and print a typed greeting to the console.',
    checks: [
      {
        kind: 'code',
        id: 'typescript-js-0-code-1',
        prompt: 'Run this program. It declares a `string`-typed variable and prints a greeting. Note that the `: string` annotation disappears entirely once transpiled to JavaScript.',
        boilerplate: 'const message: string = "Hello, TypeScript!";\nconsole.log(message);\n',
        expectedOutput: 'Hello, TypeScript!',
        explanation: 'Read `const message: string = "Hello, TypeScript!"` token by token. `const message` is plain JS — declare a constant. `:` means "and its type is". `string` is the type "text". `= "..."` is the value. So the `: string` is a *type annotation*: a compile-time promise that `message` holds text. `tsc` checks that promise, then **erases it** — the emitted JS is exactly `const message = "Hello, TypeScript!";` with no `: string` left. At runtime there is just a string in memory; the type carried zero cost. The annotation here is even optional: with `const message = "..."`, TypeScript would *infer* `string` and check it identically.',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-0-mcq-1',
        prompt: 'Which statement about the relationship between JavaScript and TypeScript is correct?',
        options: [
          'TypeScript is a separate runtime that executes `.ts` files directly.',
          'TypeScript is a superset of JavaScript: valid JS is (almost always) valid TS, and types are erased before running.',
          'TypeScript replaces JavaScript at runtime with a strongly-typed VM.',
          'TypeScript requires you to annotate every variable or it will not compile.',
        ],
        correctIndex: 1,
        explanation: 'TypeScript is a *typed superset* of JavaScript. You compile (transpile) `.ts` to `.js`, and the JS runs on the exact same engines (Node, browsers). Types exist only at compile time and are erased — there is no `.ts` runtime. See [TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-0-mcq-2',
        prompt: 'You run `npx tsc --noEmit` on a project. What does it do?',
        options: [
          'Type-checks every file but produces no `.js` output.',
          'Emits `.js` files but skips type-checking for speed.',
          'Deletes all previously emitted `.js` files.',
          'Runs the program and prints its output.',
        ],
        correctIndex: 0,
        explanation: '`--noEmit` makes `tsc` act as a pure type-checker: it reports errors but writes no JavaScript. This is common in projects where a bundler (esbuild, swc, Vite) does the actual transpilation, and `tsc --noEmit` only guards correctness in CI. See [Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-0-mcq-3',
        prompt: 'What does `npx tsc --init` create?',
        options: [
          'A new Node.js project with `package.json`.',
          'A `tsconfig.json` file with commented compiler options.',
          'A compiled `index.js` from your entry file.',
          'A `node_modules` folder containing the TypeScript runtime.',
        ],
        correctIndex: 1,
        explanation: '`tsc --init` scaffolds a `tsconfig.json` — the project configuration file `tsc` reads to know which files to compile, the target ECMAScript version, the module system, and strictness flags. Its presence is what makes a directory a "TypeScript project". See [tsconfig reference](https://www.typescriptlang.org/tsconfig).',
      },
    ],
  },

  // ─── Level 1 ─────────────────────────────────────────────────────────────
  {
    id: 'typescript-js-1',
    language: 'typescript-js',
    level: 1,
    title: 'Annotations & Inference — Let It Infer',
    timeEstimate: '4-6 hours',
    intro: `Coming from dynamic JavaScript, a "type" can feel abstract, so pin it down: **a type is the set of values a binding is allowed to hold, plus the operations that are legal on it.** \`number\` is "any numeric value, and you may do \`+ - * /\` on it"; \`string\` is "any text, and you may call \`.toUpperCase()\` on it". In JS a variable can hold *anything* and you find out about mismatches when the program crashes; in TS the type pins down what's allowed and the compiler tells you *before* you run.

**Inference vs. annotation — let it infer.** Your JS instinct may be to label everything, but TypeScript usually already knows. From the *value* you assign, it works out the type automatically:
- \`const x = 5\` → type \`5\` (a \`const\` primitive can never change, so TS keeps the exact *literal* type).
- \`let x = 5\` → type \`number\` (a \`let\` is reassignable, so TS *widens* to the general type so you can later write \`x = 6\`).
- \`const name = "Ada"\` → type \`"Ada"\`; \`let name = "Ada"\` → type \`string\`.

So most of the time you write the same code you'd write in JS and get checking for free. You only *annotate* where inference can't see the value: **function parameters** (TS can't guess what callers will pass — \`function f(x) {}\` would make \`x\` an untyped \`any\`), **empty containers** (\`const items = []\` infers the useless \`any[]\`; write \`const items: string[] = []\`), and **public API boundaries** where you want to lock the contract. A redundant annotation on something already inferred — \`const id: number = 42\` — is just noise (it even *widens* away the precise \`42\`).

**The structural-typing mindset.** This is the deepest shift for a dynamic-JS brain. TypeScript doesn't care what a type is *named* or whether you ever declared a value to "be" a certain type — it only cares about the *shape*. If a value has at least the properties some function needs, it's accepted ("if it walks like a duck, it's a duck"). This mirrors how you already think in JS — you pass any object that "has the right fields" — except now the compiler verifies the shape matches up front. (You'll see this in full next level.)

**\`any\` vs \`unknown\`.** When a value's type truly isn't known (e.g. \`JSON.parse\`), you'll meet two top types. \`any\` switches the checker *off* for that value — anything goes, bugs slip through; it's an escape hatch, not a goal. \`unknown\` is the safe version: you can store anything in it, but TS won't let you *use* it until you prove what it is (by narrowing). Prefer \`unknown\` at untyped boundaries.

Locally, hover any variable in VS Code (or the Playground) to see the inferred type. Write \`const config = { retries: 3, url: "x" }\` and hover — TS infers the whole object shape \`{ retries: number; url: string }\`. Then write \`config.retries = "oops"\` and watch the squiggle: a *compile* error, not a runtime one.`,
    topics: [
      { label: 'Everyday Types', url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html', note: 'string, number, boolean, arrays, any' },
      { label: 'Type Inference', url: 'https://www.typescriptlang.org/docs/handbook/type-inference.html', note: 'When TS infers types for you' },
      { label: 'The any type', url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any', note: 'The escape hatch that disables checking' },
      { label: 'unknown vs any', url: 'https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown', note: 'The type-safe counterpart to any' },
      { label: 'Do not over-annotate', url: 'https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html', note: 'Idiomatic guidance on letting inference win' },
    ],
    deliverable: 'Write a small typed module where every function parameter is annotated but every local variable relies on inference; verify with tsc --noEmit.',
    checks: [
      {
        kind: 'code',
        id: 'typescript-js-1-code-1',
        prompt: 'Annotate the parameters of `area` so it compiles cleanly, then print the result. Local variables should rely on inference (no annotation needed).',
        boilerplate: 'function area(width: number, height: number): number {\n  const result = width * height; // inferred as number\n  return result;\n}\n\nconsole.log("area=" + area(4, 5));\n',
        expectedOutput: 'area=20',
        explanation: 'Parameters need annotations because TS cannot guess what a caller will pass. The local `result` does not — TS infers `number` from `width * height`. The return type `: number` is also inferable here, but annotating it documents intent and catches accidental changes.',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-1-mcq-1',
        prompt: 'What type does TypeScript infer for each binding?\n\n```typescript\nconst a = 5;\nlet b = 5;\nconst c = "hi";\n```',
        options: [
          '`a: number`, `b: number`, `c: string`',
          '`a: 5`, `b: number`, `c: "hi"`',
          '`a: 5`, `b: 5`, `c: "hi"`',
          '`a: number`, `b: number`, `c: "hi"`',
        ],
        correctIndex: 1,
        explanation: '`const` bindings of primitives get the *literal* type (`5`, `"hi"`) because the value can never change. `let` bindings get the *widened* type (`number`) since they are reassignable. This literal-vs-widened distinction is the foundation for literal types and `as const` later. See [Literal Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-1-mcq-2',
        prompt: 'What is the key difference between `any` and `unknown`?',
        options: [
          'They are identical; `unknown` is just an alias for `any`.',
          '`any` disables type-checking entirely; `unknown` accepts any value but forbids using it until you narrow it.',
          '`unknown` disables type-checking; `any` is the safe one.',
          '`any` can only hold primitives; `unknown` can hold objects.',
        ],
        correctIndex: 1,
        explanation: '`any` is an escape hatch that turns *off* the type checker for that value — you can call anything on it, and bugs slip through. `unknown` is the type-safe top type: you can assign anything *to* it, but you must narrow (via `typeof`, a guard, etc.) before you can read or call it. Prefer `unknown` at untyped boundaries like `JSON.parse`. See [unknown](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-1-mcq-3',
        prompt: 'Does this compile? If not, why?\n\n```typescript\nlet count = 0;\ncount = "three";\n```',
        options: [
          'Yes — `count` is `any` so any value is allowed.',
          "No — `count` was inferred as `number`, so assigning a `string` is an error.",
          'Yes — TypeScript coerces `"three"` to a number.',
          'No — `let` bindings cannot be reassigned at all.',
        ],
        correctIndex: 1,
        explanation: 'Even without an explicit annotation, `let count = 0` infers `count: number` from its initializer. Assigning a `string` then produces `Type \'string\' is not assignable to type \'number\'`. The inferred type locks in the moment the binding is initialized — you never typed `: number`, but the check is identical to having done so. See [Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-1-mcq-4',
        prompt: 'Which annotation is redundant noise that idiomatic TS would omit?\n\n```typescript\nconst names = ["Ada", "Bo"];          // L1\nconst id: number = 42;                 // L2\nlet items: string[] = [];              // L3\nfunction f(x): void {}                 // L4\n```',
        options: [
          'L1 — the array literal needs an annotation.',
          'L2 — `const id = 42` already infers a precise type, so `: number` is redundant.',
          'L3 — an empty array must never be annotated.',
          'L4 — `void` is never needed on functions.',
        ],
        correctIndex: 1,
        explanation: 'On L2, inference already gives `id` the literal type `42`; the explicit `: number` actually *widens* it and adds noise. L3 is the opposite case where annotation is *required* — an empty `[]` would otherwise infer `any[]`. The handbook explicitly advises against annotating obvious local initializers. See [Do\'s and Don\'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-1-mcq-5',
        prompt: 'A JS dev writes `const data = JSON.parse(raw)`. What type does `data` have, and what is the safest fix?',
        options: [
          'It is `object`; no fix needed.',
          'It is `any` — every access on it is unchecked; assign or assert it to a known shape (or `unknown` then narrow) before use.',
          'It is `string` because JSON is text.',
          'It is `unknown` by default, so it is already safe.',
        ],
        correctIndex: 1,
        explanation: '`JSON.parse` is typed to return `any`, which silently disables checking on everything you read from `data`. The disciplined pattern is to immediately give it a real type — `const data: Config = JSON.parse(raw)` (you vouch for it) or validate it with a schema library that narrows from `unknown`. This is one of the most common ways `any` leaks into a "strict" codebase.',
      },
    ],
  },

  // ─── Level 2 ─────────────────────────────────────────────────────────────
  {
    id: 'typescript-js-2',
    language: 'typescript-js',
    level: 2,
    title: 'Object Shapes — Interfaces vs Type Aliases',
    timeEstimate: '4-6 hours',
    intro: `In JS an object is just a bag of properties; in TS you describe its *shape*. You'll learn the two tools for this — \`interface\` and \`type\` — when they're interchangeable (most of the time) and where they differ (declaration merging, extends vs intersection). Crucially you'll meet **structural typing**: TS doesn't care what you *named* a type, only whether the shape matches ("if it walks like a duck"). You'll also handle optional (\`?\`) and \`readonly\` properties and learn why **excess property checks** reject stray keys on object literals.

Locally, model a \`User\` with \`interface\`, then re-express it as a \`type\`, and try passing an object with an extra property directly versus through a variable — observe that only the literal is rejected.`,
    topics: [
      { label: 'Object Types', url: 'https://www.typescriptlang.org/docs/handbook/2/objects.html', note: 'Optional, readonly, index signatures' },
      { label: 'Interfaces vs Type Aliases', url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces', note: 'The official side-by-side comparison' },
      { label: 'Structural Typing', url: 'https://www.typescriptlang.org/docs/handbook/type-compatibility.html', note: 'Why shape, not name, determines compatibility' },
      { label: 'Excess Property Checks', url: 'https://www.typescriptlang.org/docs/handbook/2/objects.html#excess-property-checks', note: 'Why extra keys on literals are flagged' },
      { label: 'Extending interfaces', url: 'https://www.typescriptlang.org/docs/handbook/2/objects.html#extending-types', note: 'extends vs intersection (&)' },
    ],
    deliverable: 'Define a User shape with required, optional, and readonly fields, then write a function that takes it and prints a formatted line.',
    checks: [
      {
        kind: 'code',
        id: 'typescript-js-2-code-1',
        prompt: 'Define an `interface User` with `name: string`, optional `nickname?: string`, and `readonly id: number`. Implement `describe` and print the result.',
        boilerplate: 'interface User {\n  readonly id: number;\n  name: string;\n  nickname?: string;\n}\n\nfunction describe(u: User): string {\n  const display = u.nickname ?? u.name;\n  return `#${u.id} ${display}`;\n}\n\nconsole.log(describe({ id: 7, name: "Ada", nickname: "Countess" }));\n',
        expectedOutput: '#7 Countess',
        explanation: 'The `?` marks `nickname` optional (its type is `string | undefined`), so `??` falls back to `name`. `readonly id` means TS rejects `u.id = ...` after construction. This shape-first modeling is the everyday core of TS.',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-2-mcq-1',
        prompt: 'Which difference between `interface` and `type` is real?',
        options: [
          'Only `interface` can describe object shapes.',
          'Only `type` can be used as a function parameter type.',
          '`interface` supports declaration merging (re-opening to add members); a `type` alias does not.',
          '`type` is checked at runtime while `interface` is erased.',
        ],
        correctIndex: 2,
        explanation: 'For object shapes the two are nearly interchangeable. The genuine differences: `interface` declarations with the same name *merge* (useful for augmenting library types), while `type` cannot be redeclared; and `type` can alias unions, primitives, and tuples that `interface` cannot. Both are fully erased at runtime. See [Differences](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-2-mcq-2',
        prompt: 'Given structural typing, does this compile?\n\n```typescript\ninterface Point { x: number; y: number; }\nfunction plot(p: Point) {}\nconst loc = { x: 1, y: 2, label: "home" };\nplot(loc);\n```',
        options: [
          'No — `loc` was never declared as a `Point`.',
          'No — `loc` has an extra `label` property.',
          'Yes — `loc` has at least the `x` and `y` that `Point` requires, and it is passed via a variable (no excess-property check).',
          'Yes — but only because TypeScript ignores object types.',
        ],
        correctIndex: 2,
        explanation: 'TypeScript is *structurally* typed: `loc` is compatible with `Point` because it has the required `x` and `y` (extra members are fine). The excess-property check that would reject `label` only fires on *fresh object literals* passed directly, not on values passed through a variable. See [Type Compatibility](https://www.typescriptlang.org/docs/handbook/type-compatibility.html).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-2-mcq-3',
        prompt: 'Which line errors?\n\n```typescript\ninterface Point { x: number; y: number; }\nfunction plot(p: Point) {}\nplot({ x: 1, y: 2, label: "home" });   // L1\nconst p = { x: 1, y: 2, label: "home" };\nplot(p);                                // L2\n```',
        options: [
          'L1 — excess-property check rejects the extra `label` on the literal.',
          'L2 — passing a variable with extra keys is rejected.',
          'Both L1 and L2 error.',
          'Neither errors.',
        ],
        correctIndex: 0,
        explanation: 'L1 passes a *fresh object literal* directly, so the excess-property check fires and flags `label` (TS assumes a typo). L2 passes through a variable, suppressing that check, so it compiles. This asymmetry surprises many JS devs — the rule exists to catch misspelled optional props. See [Excess Property Checks](https://www.typescriptlang.org/docs/handbook/2/objects.html#excess-property-checks).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-2-mcq-4',
        prompt: 'What does `readonly` on a property guarantee?',
        options: [
          'The property is deeply immutable, including nested objects.',
          'The property cannot be *reassigned* after the object is created — but a referenced object is not frozen.',
          'It is a runtime `Object.freeze` applied automatically.',
          'The property can only be read inside the same module.',
        ],
        correctIndex: 1,
        explanation: '`readonly` is a *compile-time* shallow constraint: `obj.id = 2` is rejected, but if the property holds an object you can still mutate that object\'s contents. It is erased at runtime (no `Object.freeze`). For deep immutability you nest `readonly`/`Readonly<>` or use `as const`. See [readonly Properties](https://www.typescriptlang.org/docs/handbook/2/objects.html#readonly-properties).',
      },
    ],
  },

  // ─── Level 3 ─────────────────────────────────────────────────────────────
  {
    id: 'typescript-js-3',
    language: 'typescript-js',
    level: 3,
    title: 'Unions, Literals & Narrowing — Where TS Earns Its Keep',
    timeEstimate: '5-7 hours',
    intro: `This is the phase that converts JS skeptics. Union types (\`A | B\`) let you say "a value is one of these", and **narrowing** is how TS follows your control flow to figure out which one it is *right here*. The runtime checks you already write — \`typeof x === "string"\`, \`if (user)\`, \`Array.isArray(x)\`, \`"prop" in obj\` — all double as *type narrowers*. You'll also meet literal types (\`type Dir = "n" | "s" | "e" | "w"\`) that turn magic strings into a closed set, and write your own **user-defined type guard** (\`x is Foo\`).

Locally, write a function that takes \`string | number\` and branches on \`typeof\`; hover inside each branch to watch the type narrow. Then build a \`Dir\` union and watch TS reject \`"north"\`.`,
    topics: [
      { label: 'Narrowing', url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html', note: 'typeof, truthiness, in, instanceof, type guards' },
      { label: 'Union Types', url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types', note: 'A | B values' },
      { label: 'Literal Types', url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types', note: 'Specific string/number literals as types' },
      { label: 'Type Predicates', url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates', note: 'Custom x is T guard functions' },
      { label: 'Truthiness Narrowing', url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html#truthiness-narrowing', note: 'How if (x) narrows out null/undefined' },
    ],
    deliverable: 'Write a formatId(id: string | number) that narrows with typeof and a user-defined isError(x): x is Error guard.',
    checks: [
      {
        kind: 'code',
        id: 'typescript-js-3-code-1',
        prompt: 'Implement `formatId` so that a `number` is prefixed with `#` and a `string` is uppercased. Narrow with `typeof`.',
        boilerplate: 'function formatId(id: string | number): string {\n  if (typeof id === "number") {\n    return "#" + id; // here id is narrowed to number\n  }\n  return id.toUpperCase(); // here id is narrowed to string\n}\n\nconsole.log(formatId(42));\nconsole.log(formatId("abc"));\n',
        expectedOutput: '#42',
        testCases: [
          { input: 'console.log("guard:" + formatId("xy"));', expectedOutput: 'guard:XY', description: 'String branch uppercases' },
        ],
        explanation: 'Inside the `typeof id === "number"` block TS knows `id: number`; after the early return only `string` remains, so `.toUpperCase()` is allowed. This control-flow analysis means you write ordinary JS checks and TS tracks the type for free.',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-3-mcq-1',
        prompt: 'Inside the marked block, what is the type of `value`?\n\n```typescript\nfunction f(value: string | number | null) {\n  if (value) {\n    // <-- here\n  }\n}\n```',
        options: [
          '`string | number | null`',
          '`string | number`',
          '`string`',
          '`null`',
        ],
        correctIndex: 1,
        explanation: 'Truthiness narrowing removes `null` from the union inside the `if (value)` block, leaving `string | number`. (Note `0` and `""` would not enter the block at runtime, but their *types* remain since the union still includes them.) See [Truthiness Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#truthiness-narrowing).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-3-mcq-2',
        prompt: 'What is the return type of this guard, and why does it matter?\n\n```typescript\nfunction isString(x: unknown): x is string {\n  return typeof x === "string";\n}\n```',
        options: [
          'It returns `boolean`, so calling it has no effect on narrowing.',
          'It returns `x is string` (a type predicate), so `if (isString(v))` narrows `v` to `string` in the true branch.',
          'It returns `string`, the value being checked.',
          'It returns `unknown`, so the caller must cast.',
        ],
        correctIndex: 1,
        explanation: 'The `x is string` annotation is a *type predicate*. To the runtime the function returns a plain boolean, but to the type system it tells TS "if this is true, treat the argument as `string`". This lets you factor reusable narrowing logic out of `if` blocks. See [Type Predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-3-mcq-3',
        prompt: 'Does this compile?\n\n```typescript\ntype Dir = "north" | "south" | "east" | "west";\nfunction move(d: Dir) {}\nmove("up");\n```',
        options: [
          'Yes — any string is assignable to a string-literal union.',
          'No — `"up"` is not one of the four allowed literals.',
          'Yes — TypeScript widens `"up"` to `string`.',
          'No — literal unions are not allowed as parameters.',
        ],
        correctIndex: 1,
        explanation: 'A string-literal union is a *closed set*. `"up"` is not a member of `Dir`, so TS reports `Argument of type \'"up"\' is not assignable to parameter of type \'Dir\'`. This is how you replace stringly-typed APIs with checked enumerations — and you get editor autocomplete for free. See [Literal Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-3-mcq-4',
        prompt: 'Which check correctly narrows `pet: Bird | Fish` to `Fish` when neither is a class?\n\n```typescript\ninterface Bird { fly(): void; }\ninterface Fish { swim(): void; }\n```',
        options: [
          '`if (pet instanceof Fish)`',
          '`if (typeof pet === "Fish")`',
          '`if ("swim" in pet)`',
          '`if (pet === Fish)`',
        ],
        correctIndex: 2,
        explanation: '`instanceof` only works on classes/constructors, and `typeof` only yields JS primitives like `"object"`. For plain interface shapes, the `in` operator narrows: `"swim" in pet` tells TS that in the true branch `pet` is `Fish`. See [Narrowing — the in operator](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-in-operator-narrowing).',
      },
    ],
  },

  // ─── Level 4 ─────────────────────────────────────────────────────────────
  {
    id: 'typescript-js-4',
    language: 'typescript-js',
    level: 4,
    title: 'Typing Functions — Params, Returns, Overloads & this',
    timeEstimate: '5-7 hours',
    intro: `Functions are where types pay off daily. You'll annotate parameters and returns, type *function values* themselves (\`(a: number) => number\`), handle optional and default and rest parameters, and learn why \`void\` return types are deliberately loose. You'll meet **call signatures** and **overloads** for APIs whose return type depends on their arguments, the \`this\` parameter for callbacks, and contextual typing (TS infers a callback's parameter types from the function you pass it to).

Locally, type a \`map\`-style helper and watch TS infer the callback's element type. Then write two overload signatures for a \`reverse\` that returns a \`string\` for strings and an array for arrays.`,
    topics: [
      { label: 'More on Functions', url: 'https://www.typescriptlang.org/docs/handbook/2/functions.html', note: 'Call signatures, overloads, this, rest params' },
      { label: 'Function Type Expressions', url: 'https://www.typescriptlang.org/docs/handbook/2/functions.html#function-type-expressions', note: 'The (a: T) => U syntax' },
      { label: 'Overloads', url: 'https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads', note: 'Multiple signatures, one implementation' },
      { label: 'void return type', url: 'https://www.typescriptlang.org/docs/handbook/2/functions.html#assignability-of-functions', note: 'Why void is intentionally loose' },
      { label: 'this parameters', url: 'https://www.typescriptlang.org/docs/handbook/2/functions.html#declaring-this-in-a-function', note: 'Typing the this context' },
    ],
    deliverable: 'Type a higher-order applyTwice(f, x) and write an overloaded format() that returns string for numbers and string[] for arrays.',
    checks: [
      {
        kind: 'code',
        id: 'typescript-js-4-code-1',
        prompt: 'Type the parameter `transform` as a function `(n: number) => number`, then apply it twice to `x`.',
        boilerplate: 'function applyTwice(transform: (n: number) => number, x: number): number {\n  return transform(transform(x));\n}\n\nconsole.log("result=" + applyTwice((n) => n + 3, 10));\n',
        expectedOutput: 'result=16',
        explanation: 'The parameter type `(n: number) => number` is a *function type expression*. Because `transform` is typed, the inline arrow `(n) => n + 3` gets its `n` inferred as `number` via contextual typing — you do not re-annotate it. `((10+3)+3) = 16`.',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-4-mcq-1',
        prompt: 'In `arr.forEach((item) => ...)` on a `string[]`, you do not annotate `item`. Why is it still typed as `string`?',
        options: [
          'Because `forEach` always passes strings.',
          'Because of *contextual typing*: TS infers the callback parameter from the expected function type of the position it is passed to.',
          'Because TS defaults all callback parameters to `string`.',
          'It is actually `any`; you must annotate it.',
        ],
        correctIndex: 1,
        explanation: 'Contextual typing flows the *expected* type into the callback. Since `Array<string>.forEach` expects `(value: string, ...) => void`, TS infers `item: string` without an annotation. This is why idiomatic TS rarely annotates inline callbacks. See [More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-4-mcq-2',
        prompt: 'Why does this compile, given `void` return types?\n\n```typescript\nconst nums: number[] = [];\n[1, 2, 3].forEach((n) => nums.push(n));\n```',
        options: [
          '`push` returns `void`, matching `forEach`.',
          'A callback typed to return `void` may return *any* value — the return is simply ignored — so `push` returning a `number` is fine.',
          'It does not compile; `push` returns a number.',
          '`forEach` rewrites the return type to `number`.',
        ],
        correctIndex: 1,
        explanation: 'A `void`-returning function type means "the caller will not use the return value", so a callback that *does* return something (like `push` returning the new length) is still assignable. This deliberate looseness lets you pass existing functions to `forEach`/`then` without wrapping them. See [Assignability of Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html#assignability-of-functions).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-4-mcq-3',
        prompt: 'In an overloaded function, which signature does the *caller* see?\n\n```typescript\nfunction len(x: string): number;\nfunction len(x: any[]): number;\nfunction len(x: string | any[]): number { return x.length; }\n```',
        options: [
          'The implementation signature `(x: string | any[])`.',
          'Only the two overload signatures; the implementation signature is not callable from outside.',
          'All three signatures equally.',
          'None — overloads are a runtime-only feature.',
        ],
        correctIndex: 1,
        explanation: 'The *implementation* signature (the one with a body) is hidden from callers — it exists only to satisfy the compiler internally. Callers may only invoke the listed *overload* signatures. This lets you expose a tight public contract while writing one permissive implementation. See [Function Overloads](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-4-mcq-4',
        prompt: 'What does a leading `this` parameter compile to?\n\n```typescript\nfunction handler(this: HTMLButtonElement, e: Event) { /* ... */ }\n```',
        options: [
          'An extra first argument every caller must pass.',
          'Nothing at runtime — `this` is a *fake* first parameter, erased by the compiler, used only to type the `this` context.',
          'A runtime `bind(this)` call.',
          'A compile error; `this` cannot be a parameter.',
        ],
        correctIndex: 1,
        explanation: 'A `this` parameter must be listed first and is purely a typing device: it tells TS what `this` refers to inside the function and is fully erased in the emitted JS (callers still call `handler(e)`). It catches bugs where a method loses its `this` binding. See [Declaring this](https://www.typescriptlang.org/docs/handbook/2/functions.html#declaring-this-in-a-function).',
      },
    ],
  },

  // ─── Level 5 ─────────────────────────────────────────────────────────────
  {
    id: 'typescript-js-5',
    language: 'typescript-js',
    level: 5,
    title: 'Generics — Functions & Types That Stay Honest',
    timeEstimate: '5-7 hours',
    intro: `Generics let you write code that works over *any* type while preserving the relationship between inputs and outputs. The JS dev's identity helper \`(x) => x\` becomes \`<T>(x: T) => T\` — call it with a \`string\` and you get a \`string\` back, not \`any\`. You'll learn type parameters, how TS *infers* them from arguments (you rarely pass them explicitly), constraints (\`<T extends { id: number }>\`), default type params, and generic interfaces/classes. The mantra: a generic with only one use of its parameter is usually a mistake.

Locally, write \`first<T>(arr: T[]): T | undefined\` and call it on \`number[]\` and \`string[]\` — hover the result and watch the type change. Then add an \`extends\` constraint and feel the editor reject bad arguments.`,
    topics: [
      { label: 'Generics', url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html', note: 'Type parameters, inference, constraints' },
      { label: 'Generic Constraints', url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints', note: '<T extends ...>' },
      { label: 'Generic Classes', url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-classes', note: 'Box<T> style containers' },
      { label: 'Type Parameter Defaults', url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-parameter-defaults', note: '<T = string>' },
      { label: 'Using Type Parameters in Constraints', url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html#using-type-parameters-in-generic-constraints', note: 'keyof-style constraints between params' },
    ],
    deliverable: 'Write a generic Stack<T> wrapper (push/pop) and a getProp<T, K extends keyof T>(obj, key) that returns the precise property type.',
    checks: [
      {
        kind: 'code',
        id: 'typescript-js-5-code-1',
        prompt: 'Make `identity` generic so the return type matches the argument type. Call it and print the result.',
        boilerplate: 'function identity<T>(x: T): T {\n  return x;\n}\n\nconst s = identity("typed"); // T inferred as string\nconsole.log("value=" + s + " len=" + s.length);\n',
        expectedOutput: 'value=typed len=5',
        explanation: 'TS infers `T = string` from the argument `"typed"`, so `s: string` and `.length` is allowed. With a non-generic `(x: any) => any` you would lose `.length` checking entirely. Generics preserve the input/output type relationship.',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-5-mcq-1',
        prompt: 'What is the inferred type of `r`?\n\n```typescript\nfunction first<T>(arr: T[]): T | undefined {\n  return arr[0];\n}\nconst r = first([true, false]);\n```',
        options: [
          '`boolean | undefined`',
          '`boolean[]`',
          '`any`',
          '`true | false | undefined` widened to `unknown`',
        ],
        correctIndex: 0,
        explanation: 'From the argument `boolean[]`, TS infers `T = boolean`, so the return type `T | undefined` becomes `boolean | undefined`. You did not pass `<boolean>` explicitly — *inference* derived it from the argument. See [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-5-mcq-2',
        prompt: 'Why does this fail to compile?\n\n```typescript\nfunction longest<T>(a: T, b: T): T {\n  return a.length >= b.length ? a : b;\n}\n```',
        options: [
          'You cannot compare two values of type `T`.',
          '`T` is unconstrained, so TS does not know it has a `.length` property.',
          'Generic functions cannot use the ternary operator.',
          'It compiles fine.',
        ],
        correctIndex: 1,
        explanation: 'An unconstrained `T` could be *anything* (a `number`, `boolean`, etc.), so accessing `.length` is rejected. The fix is a constraint: `function longest<T extends { length: number }>(...)`, which guarantees the property exists. See [Generic Constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-5-mcq-3',
        prompt: 'What does the `K extends keyof T` constraint accomplish here?\n\n```typescript\nfunction getProp<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n```',
        options: [
          'It allows any string as `key`.',
          'It restricts `key` to actual keys of `obj`, and types the return as the precise property type `T[K]`.',
          'It forces `T` and `K` to be the same type.',
          'It makes the function return `any`.',
        ],
        correctIndex: 1,
        explanation: '`keyof T` is the union of `T`\'s property names; constraining `K` to it means `getProp(user, "emial")` is rejected (typo caught), and the return type `T[K]` is the *exact* type of that property — `getProp(user, "age")` yields `number`. This is the canonical type-safe property accessor. See [Type Parameters in Constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#using-type-parameters-in-generic-constraints).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-5-mcq-4',
        prompt: 'When should you reach for a generic type parameter?',
        options: [
          'On every function, for safety.',
          'When a type relationship must be *preserved* between inputs and outputs (or across parameters) — not when the parameter is used only once.',
          'Only inside classes.',
          'Whenever you would otherwise use `unknown`.',
        ],
        correctIndex: 1,
        explanation: 'A generic earns its place when it *links* types — e.g. "return the same type that came in" or "the key must belong to the object". A type parameter that appears only once (e.g. `function f<T>(x: T): void`) gives you nothing over a plain parameter and is a known anti-pattern. See [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html).',
      },
    ],
  },

  // ─── Level 6 ─────────────────────────────────────────────────────────────
  {
    id: 'typescript-js-6',
    language: 'typescript-js',
    level: 6,
    title: 'Arrays, Tuples, readonly & as const',
    timeEstimate: '4-6 hours',
    intro: `JS has one list type; TS distinguishes the homogeneous **array** (\`number[]\`) from the fixed-length, position-typed **tuple** (\`[string, number]\`) — exactly what \`useState\` returns. You'll learn tuple labels, optional and rest elements in tuples, \`readonly\` arrays/tuples (and why they're not assignable to mutable ones), and the game-changer **\`as const\`**, which freezes a literal into its narrowest readonly form. \`as const\` is how you derive a union type from a runtime array of values without writing the union twice.

Locally, type a \`[name, age]\` tuple, then build \`const ROLES = ["admin", "user"] as const\` and derive \`type Role = typeof ROLES[number]\` — you now have a single source of truth for both the runtime list and the type.`,
    topics: [
      { label: 'Tuple Types', url: 'https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types', note: 'Fixed-length, position-typed lists' },
      { label: 'readonly Tuple Types', url: 'https://www.typescriptlang.org/docs/handbook/2/objects.html#readonly-tuple-types', note: 'ReadonlyArray<T> and readonly tuples' },
      { label: 'const Assertions', url: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions', note: 'The as const feature' },
      { label: 'Indexed Access Types', url: 'https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html', note: 'typeof ARR[number] to derive a union' },
      { label: 'Everyday Types — Arrays', url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays', note: 'number[] vs Array<number>' },
    ],
    deliverable: 'Define a tuple [string, number], an as const array of roles, and derive a union Role from it so adding a role updates the type automatically.',
    checks: [
      {
        kind: 'code',
        id: 'typescript-js-6-code-1',
        prompt: 'Type `pair` as a tuple `[string, number]` and print its parts. Destructuring keeps each element\'s type.',
        boilerplate: 'const pair: [string, number] = ["age", 30];\nconst [label, value] = pair; // label: string, value: number\nconsole.log(label + "=" + value);\n',
        expectedOutput: 'age=30',
        explanation: 'A tuple fixes both the length (2) and the type at each position. Destructuring `pair` gives `label: string` and `value: number` — unlike a plain `(string | number)[]` array where each element would be the union. Tuples are how `useState` returns `[state, setState]` with distinct types.',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-6-mcq-1',
        prompt: 'What type does TS infer here, and what does `as const` change?\n\n```typescript\nconst a = [10, 20];                 // L1\nconst b = [10, 20] as const;        // L2\n```',
        options: [
          'L1: `number[]`; L2: `readonly [10, 20]`',
          'L1: `[10, 20]`; L2: `number[]`',
          'L1: `readonly number[]`; L2: `number[]`',
          'Both are `(10 | 20)[]`',
        ],
        correctIndex: 0,
        explanation: 'Without `as const`, the array literal widens to the mutable `number[]`. `as const` makes it a `readonly` *tuple* of the exact literal types `readonly [10, 20]`. This narrowing-plus-freezing is what lets you derive precise union types from runtime data. See [const assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-6-mcq-2',
        prompt: 'What is `Role`?\n\n```typescript\nconst ROLES = ["admin", "editor", "viewer"] as const;\ntype Role = typeof ROLES[number];\n```',
        options: [
          '`string`',
          '`"admin" | "editor" | "viewer"`',
          '`readonly string[]`',
          '`number`',
        ],
        correctIndex: 1,
        explanation: '`typeof ROLES` is `readonly ["admin", "editor", "viewer"]`; indexing it with `[number]` (any numeric index) yields the union of all element types: `"admin" | "editor" | "viewer"`. Now the runtime array and the type stay in lockstep — add a role to the array and the union updates automatically. See [Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-6-mcq-3',
        prompt: 'Why does this error?\n\n```typescript\nconst nums: readonly number[] = [1, 2, 3];\nfunction sum(xs: number[]): number { return xs.reduce((a, b) => a + b, 0); }\nsum(nums);\n```',
        options: [
          'A `readonly number[]` is not assignable to a mutable `number[]`, because `sum` could mutate it.',
          'You cannot call `.reduce` on a readonly array.',
          '`readonly` arrays cannot be passed to functions at all.',
          'It compiles fine.',
        ],
        correctIndex: 0,
        explanation: 'A mutable `number[]` has methods like `push` that a `readonly number[]` does not, so a readonly array is *not* assignable to a mutable parameter (the function might mutate it). The fix is to widen the parameter to `readonly number[]`. This directionality surprises JS devs who expect arrays to be freely interchangeable. See [readonly tuple/array types](https://www.typescriptlang.org/docs/handbook/2/objects.html#readonly-tuple-types).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-6-mcq-4',
        prompt: 'How does a tuple differ from an array of a union, e.g. `[string, number]` vs `(string | number)[]`?',
        options: [
          'They are identical.',
          'The tuple fixes length and per-position types; the union array allows any length with each element being either type.',
          'The union array fixes the length; the tuple does not.',
          'Tuples are a runtime construct; union arrays are compile-time only.',
        ],
        correctIndex: 1,
        explanation: '`[string, number]` means exactly two elements where index 0 is `string` and index 1 is `number`. `(string | number)[]` means any number of elements, each independently a `string` or a `number`. Use tuples for fixed records like coordinate pairs or `[value, setter]`. See [Tuple Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types).',
      },
    ],
  },

  // ─── Level 7 ─────────────────────────────────────────────────────────────
  {
    id: 'typescript-js-7',
    language: 'typescript-js',
    level: 7,
    title: 'Utility Types, keyof & typeof — Don\'t Repeat Your Types',
    timeEstimate: '5-7 hours',
    intro: `Just as you DRY up JS code, TS lets you DRY up *types*. The built-in utility types transform existing types so you never restate a shape: \`Partial<T>\` makes everything optional (perfect for update payloads), \`Pick<T, K>\` / \`Omit<T, K>\` slice a shape, \`Record<K, V>\` builds a dictionary type, \`Readonly<T>\` freezes it, and \`ReturnType<F>\` / \`Parameters<F>\` extract a function's types. The glue is the **type-query** operators: \`keyof T\` (the union of keys) and the *type-level* \`typeof value\` (the type of a runtime binding).

Locally, define one \`User\` interface and derive \`Partial<User>\`, \`Pick<User, "id" | "name">\`, and \`Record<Role, User[]>\` from it. Add a field to \`User\` and watch every derived type update.`,
    topics: [
      { label: 'Utility Types', url: 'https://www.typescriptlang.org/docs/handbook/utility-types.html', note: 'Partial, Pick, Omit, Record, ReturnType, etc.' },
      { label: 'keyof Type Operator', url: 'https://www.typescriptlang.org/docs/handbook/2/keyof-types.html', note: 'Union of a type\'s property names' },
      { label: 'typeof Type Operator', url: 'https://www.typescriptlang.org/docs/handbook/2/typeof-types.html', note: 'Get the type of a runtime value' },
      { label: 'Indexed Access Types', url: 'https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html', note: 'T[K] lookups' },
    ],
    deliverable: 'From a single User interface, derive an update DTO (Partial), a summary (Pick), a grouping (Record<Role, User[]>), and extract a function\'s ReturnType.',
    checks: [
      {
        kind: 'code',
        id: 'typescript-js-7-code-1',
        prompt: 'Use `Partial<User>` to type a patch object, merge it into a base user, and print the result.',
        boilerplate: 'interface User {\n  id: number;\n  name: string;\n  active: boolean;\n}\n\nfunction applyPatch(base: User, patch: Partial<User>): User {\n  return { ...base, ...patch };\n}\n\nconst updated = applyPatch({ id: 1, name: "Ada", active: false }, { active: true });\nconsole.log(updated.name + " active=" + updated.active);\n',
        expectedOutput: 'Ada active=true',
        explanation: '`Partial<User>` makes every field optional, so a patch may set just `active`. Spreading `{...base, ...patch}` overrides only provided keys while the result type stays `User`. This is the canonical typed "update" pattern, derived from one source interface.',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-7-mcq-1',
        prompt: 'What does this resolve to?\n\n```typescript\ninterface User { id: number; name: string; email: string; }\ntype Preview = Pick<User, "id" | "name">;\n```',
        options: [
          '`{ id: number; name: string; email: string }`',
          '`{ id: number; name: string }`',
          '`{ email: string }`',
          '`"id" | "name"`',
        ],
        correctIndex: 1,
        explanation: '`Pick<User, "id" | "name">` constructs a new type with *only* those two properties. Its complement is `Omit<User, "email">`, which removes keys instead. Both derive from `User`, so changing `User` flows through automatically. See [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-7-mcq-2',
        prompt: 'What is `Keys`?\n\n```typescript\ninterface Config { host: string; port: number; tls: boolean; }\ntype Keys = keyof Config;\n```',
        options: [
          '`string`',
          '`"host" | "port" | "tls"`',
          '`{ host: string; port: number; tls: boolean }`',
          '`string | number | boolean`',
        ],
        correctIndex: 1,
        explanation: '`keyof Config` produces the union of its property *names* as string-literal types: `"host" | "port" | "tls"`. This is what powers type-safe key access and `Record`/`Pick`/`Omit`. See [keyof Type Operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-7-mcq-3',
        prompt: 'What does `Record<Role, number>` produce here?\n\n```typescript\ntype Role = "admin" | "user";\ntype Counts = Record<Role, number>;\n```',
        options: [
          '`{ admin?: number; user?: number }`',
          '`{ admin: number; user: number }`',
          '`{ [key: string]: number }`',
          '`number[]`',
        ],
        correctIndex: 1,
        explanation: '`Record<K, V>` builds an object type with one *required* property per key in `K`, each of type `V`. So `Record<Role, number>` is `{ admin: number; user: number }` — and TS will error if you forget a role. It is the idiomatic way to type "a dictionary keyed by a known set". See [Record](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-7-mcq-4',
        prompt: 'What is `R`, and what is the role of the *type-level* `typeof`?\n\n```typescript\nfunction makeUser(name: string) {\n  return { name, createdAt: Date.now() };\n}\ntype R = ReturnType<typeof makeUser>;\n```',
        options: [
          '`R` is `string`; `typeof` gets the runtime value.',
          '`R` is `{ name: string; createdAt: number }`; `typeof makeUser` yields the function\'s *type* so `ReturnType` can read its return.',
          '`R` is `void`.',
          '`typeof makeUser` returns the string `"function"`.',
        ],
        correctIndex: 1,
        explanation: 'In a *type* position, `typeof makeUser` produces the function\'s type signature (not the JS string `"function"`). `ReturnType<...>` then extracts its return type, `{ name: string; createdAt: number }`. This lets a type track an implementation automatically — no manual restating. See [typeof Type Operator](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html) and [ReturnType](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype).',
      },
    ],
  },

  // ─── Level 8 ─────────────────────────────────────────────────────────────
  {
    id: 'typescript-js-8',
    language: 'typescript-js',
    level: 8,
    title: 'Conditional & Mapped Types — Building the Utilities Yourself',
    timeEstimate: '6-8 hours',
    intro: `Now you go under the hood. **Mapped types** iterate over keys to transform a shape (\`{ [K in keyof T]: ... }\`) — that's literally how \`Partial\`, \`Readonly\`, and \`Record\` are defined. **Conditional types** branch at the type level (\`T extends U ? X : Y\`), and with the \`infer\` keyword you can *extract* pieces of a type (that's how \`ReturnType\` works). You'll also meet key remapping (\`as\`), template-literal types, and how conditional types *distribute* over unions. This is the deep end — most checks here are "what does this resolve to?".

Locally, re-implement \`MyPartial<T>\` and \`MyReturnType<F>\` from scratch in the Playground and confirm they match the built-ins. Then write a mapped type that prefixes every key with \`get\`.`,
    topics: [
      { label: 'Mapped Types', url: 'https://www.typescriptlang.org/docs/handbook/2/mapped-types.html', note: '{ [K in keyof T]: ... } and modifiers' },
      { label: 'Conditional Types', url: 'https://www.typescriptlang.org/docs/handbook/2/conditional-types.html', note: 'T extends U ? X : Y and infer' },
      { label: 'Template Literal Types', url: 'https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html', note: 'String manipulation at the type level' },
      { label: 'Key Remapping via as', url: 'https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as', note: 'Rename keys in a mapped type' },
      { label: 'Distributive Conditional Types', url: 'https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types', note: 'How conditionals spread over unions' },
    ],
    deliverable: 'Re-implement Partial<T>, Readonly<T>, and ReturnType<F> from scratch with mapped/conditional types and verify they equal the built-ins.',
    checks: [
      {
        kind: 'code',
        id: 'typescript-js-8-code-1',
        prompt: 'A mapped type `Stringify<T>` makes every property a `string`. Here it is applied; run the runtime demo that builds such an object and prints a field.',
        boilerplate: 'type Stringify<T> = { [K in keyof T]: string };\n\ninterface Point { x: number; y: number; }\n\nconst labels: Stringify<Point> = { x: "ten", y: "twenty" };\nconsole.log("x=" + labels.x);\n',
        expectedOutput: 'x=ten',
        explanation: 'The mapped type `{ [K in keyof T]: string }` iterates every key `K` of `T` and sets its value type to `string`, producing `{ x: string; y: string }`. Mapped types are the engine behind `Partial`, `Readonly`, and `Record`. The annotation is erased; the object is plain JS at runtime.',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-8-mcq-1',
        prompt: 'Which mapped type is the correct definition of `Partial<T>`?',
        options: [
          '`type Partial<T> = { [K in keyof T]: T[K] | undefined }`',
          '`type Partial<T> = { [K in keyof T]?: T[K] }`',
          '`type Partial<T> = { readonly [K in keyof T]: T[K] }`',
          '`type Partial<T> = T | undefined`',
        ],
        correctIndex: 1,
        explanation: 'The `?` *modifier* in a mapped type makes each property optional — that is exactly the built-in `Partial`. Note option A is subtly different: `T[K] | undefined` makes the value possibly undefined but still *required* (you must provide the key). Modifiers like `?` and `readonly` (and their removals `-?`, `-readonly`) are unique to mapped types. See [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-8-mcq-2',
        prompt: 'What does `Unwrap` resolve to?\n\n```typescript\ntype Unwrap<T> = T extends Promise<infer U> ? U : T;\ntype A = Unwrap<Promise<string>>;\ntype B = Unwrap<number>;\n```',
        options: [
          '`A = Promise<string>`, `B = number`',
          '`A = string`, `B = number`',
          '`A = string`, `B = never`',
          '`A = unknown`, `B = unknown`',
        ],
        correctIndex: 1,
        explanation: 'The conditional `T extends Promise<infer U>` matches `Promise<string>` and *infers* `U = string`, so `A = string`. For `number`, the `extends Promise<...>` test fails, so the `: T` branch returns `number`. `infer` is how built-ins like `ReturnType` and `Awaited` pull types out. See [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-8-mcq-3',
        prompt: 'Conditional types *distribute* over unions. What is `T`?\n\n```typescript\ntype NonNull<X> = X extends null | undefined ? never : X;\ntype T = NonNull<string | null | number>;\n```',
        options: [
          '`never`',
          '`string | number`',
          '`string | null | number`',
          '`string | number | never`',
        ],
        correctIndex: 1,
        explanation: 'A *naked* type parameter in a conditional distributes: the check is applied to each union member separately, giving `NonNull<string> | NonNull<null> | NonNull<number>` = `string | never | number`. Since `never` is absorbed in unions, the result is `string | number` (this is essentially the built-in `NonNullable`). See [Distributive Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-8-mcq-4',
        prompt: 'What key type does this template-literal + remapped mapped type produce?\n\n```typescript\ntype Getters<T> = { [K in keyof T & string as `get${Capitalize<K>}`]: () => T[K] };\ntype G = Getters<{ name: string }>;\n```',
        options: [
          '`{ name: () => string }`',
          '`{ getName: () => string }`',
          '`{ get: () => string }`',
          '`{ getname: () => string }`',
        ],
        correctIndex: 1,
        explanation: 'Key remapping via `as` rewrites each key; the template literal `get${Capitalize<K>}` turns `"name"` into `"getName"`, and the value becomes a getter `() => string`. Template-literal types plus key remapping let you build APIs like event-handler or getter/setter shapes entirely in the type system. See [Key Remapping via as](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as).',
      },
    ],
  },

  // ─── Level 9 ─────────────────────────────────────────────────────────────
  {
    id: 'typescript-js-9',
    language: 'typescript-js',
    level: 9,
    title: 'Discriminated Unions, Exhaustiveness, never & Assertions',
    timeEstimate: '5-7 hours',
    intro: `This is the pattern that makes TS feel like a different language from JS: the **discriminated (tagged) union**. Give each member of a union a common literal field (\`kind\`/\`type\`/\`status\`) and a \`switch\` on it narrows perfectly in each branch — no casts. Pair it with the **\`never\`** type in a \`default\` to get compile-time **exhaustiveness**: add a new variant and TS *forces* you to handle it. You'll also learn **assertion functions** (\`asserts x is T\`) for validation boundaries, and why \`as\` casts and the non-null \`!\` are sharp tools you should reach for last.

Locally, model a \`Shape = Circle | Square | Triangle\` tagged union, write an \`area\` switch with a \`never\` default, then add \`Triangle\` and watch the compiler point at the unhandled case.`,
    topics: [
      { label: 'Discriminated Unions', url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions', note: 'Tagged unions and switch narrowing' },
      { label: 'The never type', url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type', note: 'Exhaustiveness checking' },
      { label: 'Assertion Functions', url: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions', note: 'asserts x is T' },
      { label: 'Type Assertions (as)', url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions', note: 'When to use as and its limits' },
      { label: 'Non-null assertion (!)', url: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator', note: 'The ! operator and its risks' },
    ],
    deliverable: 'Model a Shape tagged union, write area() with a switch + never default, and add a new variant to confirm the exhaustiveness error fires.',
    checks: [
      {
        kind: 'code',
        id: 'typescript-js-9-code-1',
        prompt: 'Implement `area` over a discriminated union by switching on `kind`. Print the area of a circle (use 3.14 for pi).',
        boilerplate: 'type Shape =\n  | { kind: "circle"; radius: number }\n  | { kind: "square"; side: number };\n\nfunction area(s: Shape): number {\n  switch (s.kind) {\n    case "circle":\n      return 3.14 * s.radius * s.radius; // s narrowed to circle\n    case "square":\n      return s.side * s.side;            // s narrowed to square\n  }\n}\n\nconsole.log("area=" + area({ kind: "circle", radius: 10 }));\n',
        expectedOutput: 'area=314',
        explanation: 'The shared literal field `kind` is the *discriminant*. Switching on it narrows `s` to the exact member in each case, so `s.radius` is available only in the circle branch and `s.side` only in the square branch — with zero casts. This is the safest way to model "one of several variants".',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-9-mcq-1',
        prompt: 'What makes a union "discriminated" (tagged)?',
        options: [
          'Every member is an interface.',
          'Each member shares a common property whose type is a distinct *literal* (e.g. `kind: "a"` vs `kind: "b"`), letting a check on it narrow the union.',
          'The members all have the same properties.',
          'It is declared with `enum` instead of `type`.',
        ],
        correctIndex: 1,
        explanation: 'The defining feature is a shared *singleton* (literal) property — the discriminant — that differs across members. Switching or branching on it lets TS narrow to one member. Without a distinct literal tag, TS cannot tell the members apart in a `switch`. See [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-9-mcq-2',
        prompt: 'How does the `never` type give you exhaustiveness checking?\n\n```typescript\nfunction area(s: Shape): number {\n  switch (s.kind) {\n    case "circle": return Math.PI * s.radius ** 2;\n    case "square": return s.side ** 2;\n    default:\n      const _exhaustive: never = s;\n      return _exhaustive;\n  }\n}\n```',
        options: [
          'It throws at runtime if an unknown shape appears.',
          'If every case is handled, `s` in `default` is narrowed to `never` and assigning it to a `never` variable compiles; add an unhandled variant and `s` is no longer `never`, producing a compile error.',
          '`never` makes the function return `void`.',
          'It disables the `default` branch entirely.',
        ],
        correctIndex: 1,
        explanation: 'After exhaustively handling every member, the type of `s` in `default` is `never` (no values left), so `const _exhaustive: never = s` type-checks. The moment you add a new variant to `Shape`, `s` in `default` is that new member — not assignable to `never` — and TS errors, pointing you at the missing case. This turns "add a variant" into a compile-time TODO list. See [the never type](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-9-mcq-3',
        prompt: 'What is special about an *assertion function*?\n\n```typescript\nfunction assertIsString(x: unknown): asserts x is string {\n  if (typeof x !== "string") throw new Error("not a string");\n}\n```',
        options: [
          'It returns a boolean used in `if` statements.',
          'After it is called (and does not throw), TS treats the argument as `string` for the rest of the scope.',
          'It converts its argument to a string at runtime.',
          'It is identical to a `x is string` type guard.',
        ],
        correctIndex: 1,
        explanation: 'An `asserts x is T` function narrows by *control flow after the call*: if `assertIsString(v)` returns normally, TS knows `v` is `string` from that point on (because the only other outcome is a thrown error). Unlike a `x is T` predicate (used in an `if`), an assertion function narrows the surrounding scope directly. See [Assertion Functions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-9-mcq-4',
        prompt: 'Why are `as` casts and the non-null `!` operator considered risky?',
        options: [
          'They slow down compilation significantly.',
          'They override the type checker without any runtime check — if you are wrong, the bug surfaces later as a runtime error.',
          'They are removed in strict mode.',
          'They cause the value to be deep-frozen.',
        ],
        correctIndex: 1,
        explanation: '`x as Foo` and `x!` tell TS "trust me" and suppress checking, but they emit *no* runtime validation — a wrong assertion just defers the crash (e.g. a real `undefined` slips past `!` and throws on access). Prefer narrowing, guards, or assertion *functions* (which actually check) over bare casts. See [Type Assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions).',
      },
    ],
  },

  // ─── Level 10 ────────────────────────────────────────────────────────────
  {
    id: 'typescript-js-10',
    language: 'typescript-js',
    level: 10,
    title: 'Declaration Files, Modules, Strictness & Migrating JS→TS',
    timeEstimate: '6-8 hours',
    intro: `The capstone: shipping TS in the real world. You'll learn **declaration files** (\`.d.ts\`) — how types are distributed for libraries, what \`@types/*\` packages and DefinitelyTyped are, and how \`declare\` describes ambient JS. You'll nail down **module resolution** (ESM vs CommonJS, \`import type\`, \`moduleResolution\`), the **strictness flags** that actually matter (\`strict\`, \`strictNullChecks\`, \`noUncheckedIndexedAccess\`, \`noImplicitAny\`), and a pragmatic **JS→TS migration** path (rename, \`allowJs\`, \`// @ts-check\` in JSDoc, fix the loose types incrementally). End state: you can adopt TS in an existing JS codebase without a big-bang rewrite.

Locally, take a small JS file, add \`// @ts-check\` at the top, and watch TS find bugs *without renaming*. Then flip on \`strictNullChecks\` and triage the new errors one by one.`,
    topics: [
      { label: 'Declaration Files Intro', url: 'https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html', note: 'What .d.ts files are and how to consume them' },
      { label: 'tsconfig Reference', url: 'https://www.typescriptlang.org/tsconfig', note: 'Every compiler option, including strict flags' },
      { label: 'Modules', url: 'https://www.typescriptlang.org/docs/handbook/2/modules.html', note: 'ESM/CommonJS, import type, resolution' },
      { label: 'Migrating from JavaScript', url: 'https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html', note: 'allowJs, @ts-check, incremental adoption' },
      { label: 'DefinitelyTyped (@types)', url: 'https://github.com/DefinitelyTyped/DefinitelyTyped', note: 'Community type definitions for JS libraries' },
    ],
    deliverable: 'Add // @ts-check to a JS file, install an @types package, and enable strictNullChecks in a sample project, resolving the resulting errors.',
    checks: [
      {
        kind: 'code',
        id: 'typescript-js-10-code-1',
        prompt: 'With `strictNullChecks` in mind, write a function whose return type is `string | undefined` and handle the undefined case at the call site with `??`. Print the result.',
        boilerplate: 'function findName(id: number): string | undefined {\n  const names: Record<number, string> = { 1: "Ada", 2: "Bo" };\n  return names[id]; // may be undefined\n}\n\nconst name = findName(99) ?? "anonymous";\nconsole.log("name=" + name);\n',
        expectedOutput: 'name=anonymous',
        explanation: 'Under `strictNullChecks`, `undefined` is not silently part of every type — the return is explicitly `string | undefined`, forcing the caller to handle the missing case (here with `?? "anonymous"`). This is the single most valuable strict flag for catching real bugs.',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-10-mcq-1',
        prompt: 'You install a JS-only library and `import` it; TS errors "Could not find a declaration file". What is the standard fix?',
        options: [
          'Rewrite the library in TypeScript.',
          'Install its types from DefinitelyTyped, e.g. `npm i -D @types/the-lib` (or add a local `.d.ts` / `declare module`).',
          'Add `// @ts-ignore` to every import permanently.',
          'Switch the whole project to `allowJs: false`.',
        ],
        correctIndex: 1,
        explanation: 'Many JS libraries ship without bundled `.d.ts` files; the community maintains type definitions on DefinitelyTyped, published as `@types/<name>`. Installing that package gives the import full type information. If no `@types` package exists, you write a minimal `declare module "the-lib";` ambient declaration. See [Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-10-mcq-2',
        prompt: 'What does `noUncheckedIndexedAccess` change?',
        options: [
          'It forbids using index access entirely.',
          'It adds `| undefined` to the result of indexing arrays/records by a key, forcing you to handle the "missing element" case.',
          'It makes all array access throw at runtime on out-of-bounds.',
          'It disables `strictNullChecks`.',
        ],
        correctIndex: 1,
        explanation: 'By default `arr[i]` is typed as the element type even though it can be `undefined` at runtime. `noUncheckedIndexedAccess` makes the type `T | undefined`, reflecting reality and forcing a guard. It is stricter than the base `strict` preset and catches a whole class of "off-by-one"/"missing key" bugs. See [tsconfig reference](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-10-mcq-3',
        prompt: 'You want to adopt TS in a large JS codebase *without* a big rewrite. Which approach is the recommended first step?',
        options: [
          'Rename every `.js` to `.ts` at once and turn on `strict` immediately.',
          'Add `// @ts-check` comments (or a JSDoc-typed setup) with `allowJs`, fixing errors incrementally before renaming files.',
          'Delete all the JS and rewrite from scratch.',
          'Set `noImplicitAny: true` first so nothing compiles until fully typed.',
        ],
        correctIndex: 1,
        explanation: 'The official migration path is gradual: enable `allowJs`, sprinkle `// @ts-check` (and JSDoc types) so TS checks `.js` files in place, fix issues, then rename to `.ts` file-by-file and tighten flags last. A big-bang rename with full `strict` floods you with thousands of errors at once. See [Migrating from JavaScript](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-10-mcq-4',
        prompt: 'What is the purpose of `import type { Foo } from "./foo"` instead of a plain `import`?',
        options: [
          'It imports the value faster at runtime.',
          'It marks the import as *type-only*, so it is guaranteed to be erased from the emitted JS (avoiding accidental runtime dependencies and circular-import side effects).',
          'It is required for all interface imports or they fail.',
          'It converts a value into a type.',
        ],
        correctIndex: 1,
        explanation: '`import type` tells TS the binding is used only in type positions, so the entire import is erased from emitted JS. This prevents pulling a module in at runtime just for its types (which can cause side effects or break tree-shaking) and makes intent explicit. See [Modules — import type](https://www.typescriptlang.org/docs/handbook/2/modules.html).',
      },
      {
        kind: 'mcq',
        id: 'typescript-js-10-mcq-5',
        prompt: 'In a `.d.ts` declaration file, why can you write `export declare function greet(name: string): string;` with no function body?',
        options: [
          'Declaration files may contain only one declaration each.',
          'A `.d.ts` describes the *types* of code that exists elsewhere (the real implementation is in JS); it contains no implementations and emits no JS.',
          'The body is optional in all TypeScript files.',
          '`declare` generates an empty function at runtime.',
        ],
        correctIndex: 1,
        explanation: 'A `.d.ts` file is *ambient*: it declares the shape/types of values whose implementation lives in separately-shipped JavaScript. It contains no executable code and produces no output — its only job is to give the type checker information about external code. This is exactly what `@types/*` packages are made of. See [Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html).',
      },
    ],
  },
];
