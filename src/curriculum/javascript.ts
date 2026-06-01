import type { Phase } from './types';

export const javascriptPhases: Phase[] = [
  // ─── Level 0 ─────────────────────────────────────────────────────────────
  {
    id: 'javascript-0',
    language: 'javascript',
    level: 0,
    title: 'Setup & Hello World',
    timeEstimate: '0.5-1 hours',
    intro:
      "Welcome to JavaScript! It is the only language that runs natively in every web browser, and — via Node.js — on servers, build tools, and the command line too. In this level you'll run your first program in two places: the browser DevTools console (`F12` → Console) and Node.js (`node hello.js`). Absolute beginners start here.",
    topics: [
      {
        label: 'MDN — What is JavaScript?',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript',
        note: 'A gentle overview of the language and where it runs.',
      },
      {
        label: 'Node.js download',
        url: 'https://nodejs.org/en/download',
        note: 'Install the Node.js runtime so you can run JS outside a browser.',
      },
      {
        label: 'MDN — console.log()',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/console/log_static',
        note: 'The standard way to print output to the console.',
      },
    ],
    deliverable: 'Open your browser DevTools console and run a print statement; also create hello.js and run it with `node hello.js`.',
    checks: [
      {
        kind: 'code',
        id: 'javascript-0-code-1',
        prompt: 'Use `console.log()` to print `Hello, World!` to the console.',
        boilerplate: '// Print a greeting to the console.\nconsole.log("Hello, World!");\n',
        expectedOutput: 'Hello, World!',
        explanation: '`console.log()` writes its arguments to the console — the DevTools console in a browser, or standard output under Node.js. It is the workhorse of quick debugging in JavaScript.',
      },
      {
        kind: 'mcq',
        id: 'javascript-0-mcq-1',
        prompt: 'Which runtime lets you execute a `.js` file from your terminal, outside any browser?',
        options: ['Node.js', 'jQuery', 'Babel', 'WebAssembly'],
        correctIndex: 0,
        explanation: 'Node.js embeds the V8 JavaScript engine and adds APIs for files, networking, and processes, so you can run JavaScript on a server or from the command line with `node file.js`. Browsers run the same language but expose web APIs (the DOM) instead.',
      },
      {
        kind: 'mcq',
        id: 'javascript-0-mcq-2',
        prompt: 'In a web page, where does `console.log("hi")` send its output?',
        options: [
          'To the visible page body, as HTML text.',
          "To the browser's DevTools console (e.g. the Console tab).",
          'To a file named console.log on disk.',
          'Nowhere — console.log only works under Node.js.',
        ],
        correctIndex: 1,
        explanation: 'In a browser, `console.log` writes to the developer-tools Console panel, not to the visible page. To change what the user sees you manipulate the DOM. `console.log` is for diagnostics and is available in both the browser and Node.js.',
      },
    ],
  },

  // ─── Level 1 ─────────────────────────────────────────────────────────────
  {
    id: 'javascript-1',
    language: 'javascript',
    level: 1,
    title: 'Values, Types & Coercion — == vs ===',
    timeEstimate: '4-6 hours',
    intro: `By the end of this phase you'll predict the result of any \`typeof\`, any \`==\` vs \`===\` comparison, and any sneaky coercion (\`"5" + 1\` vs \`"5" - 1\`). JavaScript has exactly seven primitive types — \`string\`, \`number\`, \`boolean\`, \`undefined\`, \`null\`, \`bigint\`, \`symbol\` — plus objects. Numbers are all IEEE-754 doubles, which is why \`0.1 + 0.2 !== 0.3\`.

To build the muscle, write a tiny \`describe.js\` locally that takes a few values and logs each one's \`typeof\` and whether it is "truthy". Run it with \`node describe.js\` and confirm your predictions. The golden rule you'll adopt: **always use \`===\`** unless you have a deliberate reason not to.`,
    video: {
      title: 'JavaScript Programming - Full Course',
      youtubeId: 'jS4aFq5-91M',
      channelName: 'freeCodeCamp.org',
      duration: '8 hours',
    },
    topics: [
      { label: 'MDN — Data types & structures', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures', note: 'The seven primitives plus objects.' },
      { label: 'MDN — typeof', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof', note: 'Including the famous typeof null quirk.' },
      { label: 'MDN — Equality comparisons', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness', note: '== vs === vs Object.is.' },
      { label: 'MDN — Type coercion', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion', note: 'How JS converts types implicitly.' },
      { label: 'MDN — Truthy', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Truthy', note: 'Which values are truthy and falsy.' },
      { label: 'MDN — Number', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number', note: 'IEEE-754 doubles, NaN, Infinity.' },
    ],
    deliverable: 'Write describe.js that logs typeof and truthiness for a handful of mixed values.',
    checks: [
      {
        kind: 'mcq',
        id: 'javascript-1-mcq-1',
        prompt: `What does this print?

\`\`\`js
console.log(typeof null);
\`\`\``,
        options: ['"null"', '"object"', '"undefined"', '"boolean"'],
        correctIndex: 1,
        explanation: '`typeof null` returns `"object"` — a bug baked into the language since 1995 and never fixed for backwards compatibility. To check specifically for null, use `value === null`. See [MDN — typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof).',
      },
      {
        kind: 'mcq',
        id: 'javascript-1-mcq-2',
        prompt: `What does this print?

\`\`\`js
console.log("5" + 1);
console.log("5" - 1);
\`\`\``,
        options: ['`6` then `4`', '`"51"` then `4`', '`"51"` then `"4"`', '`6` then `"4"`'],
        correctIndex: 1,
        explanation: 'The `+` operator is overloaded: if either operand is a string it does string concatenation, so `"5" + 1` is `"51"`. The `-` operator has no string meaning, so both operands are coerced to numbers and `"5" - 1` is `4`. This asymmetry is the root of countless coercion bugs. See [MDN — Type coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion).',
      },
      {
        kind: 'mcq',
        id: 'javascript-1-mcq-3',
        prompt: `Which comparisons are \`true\`?

\`\`\`js
console.log(0 == "");      // A
console.log(0 == "0");     // B
console.log("" == "0");    // C
\`\`\``,
        options: [
          'Only A and B are true; C is false.',
          'All three are true.',
          'Only A is true.',
          'None are true.',
        ],
        correctIndex: 0,
        explanation: 'Loose equality (`==`) coerces operands to numbers when comparing a string to a number: `0 == ""` becomes `0 == 0` (true) and `0 == "0"` becomes `0 == 0` (true). But `"" == "0"` compares two strings with no coercion, and `""` is not `"0"` (false). This non-transitivity is exactly why the advice is to always use `===`. See [MDN — Equality comparisons](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness).',
      },
      {
        kind: 'mcq',
        id: 'javascript-1-mcq-4',
        prompt: 'Which of these values is **truthy**?',
        options: ['`""` (empty string)', '`0`', '`"0"` (string zero)', '`NaN`'],
        correctIndex: 2,
        explanation: 'The falsy values are exactly: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, and `NaN`. Everything else is truthy — including the non-empty string `"0"`, empty arrays `[]`, and empty objects `{}`. See [MDN — Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy).',
      },
      {
        kind: 'code',
        id: 'javascript-1-code-1',
        prompt: 'Run this program. It demonstrates floating-point imprecision and how to test near-equality. Confirm it prints `close enough`.',
        boilerplate: 'const sum = 0.1 + 0.2;\nconsole.log("sum is", sum);\nconsole.log("exactly 0.3?", sum === 0.3);\nif (Math.abs(sum - 0.3) < Number.EPSILON) {\n  console.log("close enough");\n} else {\n  console.log("not equal");\n}\n',
        expectedOutput: 'close enough',
        explanation: 'All JavaScript numbers are IEEE-754 double-precision floats, so `0.1 + 0.2` is `0.30000000000000004`, and `=== 0.3` is `false`. To compare floats, test that the absolute difference is below a small tolerance such as `Number.EPSILON`.',
      },
    ],
  },

  // ─── Level 2 ─────────────────────────────────────────────────────────────
  {
    id: 'javascript-2',
    language: 'javascript',
    level: 2,
    title: 'Functions, Scope, Hoisting & Closures',
    timeEstimate: '5-7 hours',
    intro: `By the end of this phase you'll explain the difference between function declarations and expressions, why \`var\` is function-scoped while \`let\`/\`const\` are block-scoped, what "hoisting" actually moves, and how a closure captures variables (not values). These four ideas underpin every callback, module pattern, and React hook you'll ever write.

To build the muscle, write a \`counter.js\` locally that returns a function which increments and returns a private count each time it's called — a closure. Call it a few times and log the results. Then try the classic \`for (var i...)\` vs \`for (let i...)\` loop-with-callbacks puzzle and see the difference for yourself.`,
    video: {
      title: 'JavaScript Programming - Full Course',
      youtubeId: 'jS4aFq5-91M',
      channelName: 'freeCodeCamp.org',
      duration: '8 hours',
    },
    topics: [
      { label: 'MDN — Functions guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions', note: 'Declarations, expressions, parameters, arrow functions.' },
      { label: 'MDN — Closures', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures', note: 'The canonical explanation with examples.' },
      { label: 'MDN — Hoisting', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Hoisting', note: 'What gets hoisted and what the TDZ is.' },
      { label: 'MDN — var', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var', note: 'Function scope and why let/const replaced it.' },
      { label: 'MDN — Arrow functions', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions', note: 'Concise syntax and lexical this.' },
    ],
    deliverable: 'Write counter.js using a closure to keep a private, persistent count.',
    checks: [
      {
        kind: 'code',
        id: 'javascript-2-code-1',
        prompt: 'Complete `makeCounter` so it returns a function that increments and returns a private counter on each call. Calling the returned function three times should log 1, 2, 3.',
        boilerplate: 'function makeCounter() {\n  let count = 0;\n  // Return a function that increments and returns count.\n  return function () {\n    count += 1;\n    return count;\n  };\n}\n\nconst next = makeCounter();\nconsole.log(next());\nconsole.log(next());\nconsole.log(next());\n',
        expectedOutput: '3',
        explanation: 'The inner function "closes over" the `count` variable from its enclosing scope. That variable lives on as long as the returned function exists, giving each counter its own private, persistent state — the foundation of the module pattern and many React hooks.',
      },
      {
        kind: 'mcq',
        id: 'javascript-2-mcq-1',
        prompt: `What does this print?

\`\`\`js
console.log(typeof greet);
function greet() { return "hi"; }
\`\`\``,
        options: ['`"undefined"`', '`"function"`', 'A ReferenceError is thrown.', '`"object"`'],
        correctIndex: 1,
        explanation: 'Function *declarations* are fully hoisted — both the name and the body are available before the line where they appear in source. So `typeof greet` is `"function"` even though the call site is above the declaration. A function *expression* (`const greet = function(){}`) would not be, because only the `const` binding is hoisted (into the temporal dead zone). See [MDN — Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting).',
      },
      {
        kind: 'mcq',
        id: 'javascript-2-mcq-2',
        prompt: `What does this loop log?

\`\`\`js
const fns = [];
for (let i = 0; i < 3; i++) {
  fns.push(() => i);
}
console.log(fns[0](), fns[1](), fns[2]());
\`\`\``,
        options: ['`0 1 2`', '`3 3 3`', '`0 0 0`', '`undefined undefined undefined`'],
        correctIndex: 0,
        explanation: '`let` creates a *new* binding of `i` for each loop iteration, so each closure captures its own `i`: 0, 1, 2. If this used `var i`, all three closures would share one function-scoped `i` whose final value is `3`, logging `3 3 3` — the classic interview bug. See [MDN — Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures).',
      },
      {
        kind: 'mcq',
        id: 'javascript-2-mcq-3',
        prompt: `What happens here?

\`\`\`js
console.log(x);
let x = 5;
\`\`\``,
        options: [
          'Logs `undefined`, because `x` is hoisted.',
          'Logs `5`.',
          'Throws a ReferenceError: cannot access `x` before initialization.',
          'Logs `null`.',
        ],
        correctIndex: 2,
        explanation: '`let` and `const` declarations are hoisted to the top of their block but are not initialized — they sit in the "temporal dead zone" until execution reaches the declaration. Accessing the variable in the TDZ throws a ReferenceError. Only `var` would log `undefined` here. See [MDN — let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz).',
      },
      {
        kind: 'mcq',
        id: 'javascript-2-mcq-4',
        prompt: 'What is the scope of a variable declared with `var` inside an `if` block (but not a function)?',
        options: [
          'Block scope — limited to the `if` block.',
          'Function scope — visible throughout the enclosing function (or globally).',
          'It throws a SyntaxError; `var` is not allowed in blocks.',
          'Module scope only.',
        ],
        correctIndex: 1,
        explanation: '`var` ignores block boundaries; it is scoped to the nearest enclosing function, or to the global scope if there is none. This surprises people coming from block-scoped languages and is precisely why `let`/`const` (which are block-scoped) are preferred in modern code. See [MDN — var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var).',
      },
    ],
  },

  // ─── Level 3 ─────────────────────────────────────────────────────────────
  {
    id: 'javascript-3',
    language: 'javascript',
    level: 3,
    title: 'Arrays & the Functional Toolkit — map, filter, reduce',
    timeEstimate: '5-7 hours',
    intro: `By the end of this phase you'll transform data fluently with \`map\`, select with \`filter\`, aggregate with \`reduce\`, and know which array methods mutate (\`push\`, \`splice\`, \`sort\`) versus return a new array (\`map\`, \`filter\`, \`slice\`, \`concat\`). You'll also know when to reach for \`find\`, \`some\`, \`every\`, \`includes\`, and \`flatMap\`.

To build the muscle, write a \`stats.js\` locally that takes an array of numbers and prints the sum (via \`reduce\`), the evens (via \`filter\`), and the doubled values (via \`map\`). Chain them: \`nums.filter(...).map(...).reduce(...)\` to compute a single aggregate in one expression.`,
    video: {
      title: 'JavaScript Programming - Full Course',
      youtubeId: 'jS4aFq5-91M',
      channelName: 'freeCodeCamp.org',
      duration: '8 hours',
    },
    topics: [
      { label: 'MDN — Array', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array', note: 'The full array API reference.' },
      { label: 'MDN — Array.prototype.map()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map', note: 'Transform each element into a new array.' },
      { label: 'MDN — Array.prototype.filter()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter', note: 'Keep elements that pass a test.' },
      { label: 'MDN — Array.prototype.reduce()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce', note: 'Fold an array into a single value.' },
      { label: 'MDN — Array.prototype.sort()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort', note: 'Mutating sort with a comparator; default is lexicographic.' },
    ],
    deliverable: 'Write stats.js that chains filter/map/reduce over an array of numbers.',
    checks: [
      {
        kind: 'code',
        id: 'javascript-3-code-1',
        prompt: 'Use `filter`, `map`, and `reduce` to compute the sum of the squares of the even numbers in `nums`. The result should be `20` (2² + 4² = 4 + 16).',
        boilerplate: 'const nums = [1, 2, 3, 4, 5];\nconst result = nums\n  .filter((n) => n % 2 === 0)\n  .map((n) => n * n)\n  .reduce((acc, n) => acc + n, 0);\nconsole.log("result =", result);\n',
        expectedOutput: 'result = 20',
        explanation: '`filter` keeps the evens `[2, 4]`, `map` squares them to `[4, 16]`, and `reduce` folds them to `20` starting from an initial accumulator of `0`. Chaining these non-mutating methods reads top-to-bottom as a data pipeline and is the idiomatic functional style in modern JavaScript.',
      },
      {
        kind: 'mcq',
        id: 'javascript-3-mcq-1',
        prompt: `What does this print?

\`\`\`js
console.log([3, 20, 100, 1].sort());
\`\`\``,
        options: ['`[1, 3, 20, 100]`', '`[1, 100, 20, 3]`', '`[1, 3, 100, 20]`', '`[100, 20, 3, 1]`'],
        correctIndex: 2,
        explanation: 'By default `sort()` converts elements to strings and compares them lexicographically (by UTF-16 code units), so `"100"` sorts before `"20"` because `"1"` < `"2"`. To sort numbers correctly, pass a comparator: `arr.sort((a, b) => a - b)`. Note `sort` also mutates the array in place. See [MDN — Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).',
      },
      {
        kind: 'mcq',
        id: 'javascript-3-mcq-2',
        prompt: 'Which of these methods **mutates** the array it is called on?',
        options: [
          '`map`',
          '`filter`',
          '`push`',
          '`slice`',
        ],
        correctIndex: 2,
        explanation: '`push` (along with `pop`, `shift`, `unshift`, `splice`, `sort`, and `reverse`) mutates the array in place and returns the new length. In contrast, `map`, `filter`, `slice`, and `concat` return a brand-new array and leave the original untouched. Knowing which is which prevents accidental shared-state bugs. See [MDN — Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#copying_methods_and_mutating_methods).',
      },
      {
        kind: 'mcq',
        id: 'javascript-3-mcq-3',
        prompt: `What does this print?

\`\`\`js
const r = [1, 2, 3].reduce((acc, n) => acc + n);
console.log(r);
\`\`\``,
        options: ['`6`', '`5`', '`undefined`', 'A TypeError is thrown.'],
        correctIndex: 0,
        explanation: 'With no initial value, `reduce` uses the first element (`1`) as the starting accumulator and begins iterating from the second element, giving `1 + 2 + 3 = 6`. Beware: calling `reduce` with no initial value on an *empty* array throws a TypeError — always pass an initial value when the array might be empty. See [MDN — reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).',
      },
      {
        kind: 'mcq',
        id: 'javascript-3-mcq-4',
        prompt: 'You need the *first* element matching a condition, or `undefined` if none match. Which method fits best?',
        options: ['`filter`', '`find`', '`some`', '`map`'],
        correctIndex: 1,
        explanation: '`find` returns the first element for which the callback returns truthy, or `undefined` if none do — and it stops early. `filter` would return an array of all matches (wasteful if you only want one), `some` returns a boolean, and `map` transforms every element. See [MDN — Array.prototype.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find).',
      },
    ],
  },

  // ─── Level 4 ─────────────────────────────────────────────────────────────
  {
    id: 'javascript-4',
    language: 'javascript',
    level: 4,
    title: 'Objects, Prototypes & this',
    timeEstimate: '5-7 hours',
    intro: `By the end of this phase you'll create and inspect objects, understand that property lookup walks the *prototype chain*, and — crucially — predict what \`this\` refers to in any call site. \`this\` is dynamically bound: it depends on *how* a function is called, not where it's defined. Arrow functions are the one exception (they capture \`this\` lexically).

To build the muscle, write an \`account.js\` locally with an object that has a \`balance\` and a \`deposit\` method, then deliberately break \`this\` by extracting the method into a bare variable and calling it — watch it fail — then fix it with \`bind\` or an arrow function. Use \`Object.keys\`, \`Object.entries\`, and the spread operator to copy and merge objects.`,
    topics: [
      { label: 'MDN — Working with objects', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects', note: 'Creating, accessing, and iterating objects.' },
      { label: 'MDN — Inheritance and the prototype chain', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain', note: 'How property lookup actually works.' },
      { label: 'MDN — this', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this', note: 'The full set of binding rules.' },
      { label: 'MDN — Object', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object', note: 'Object.keys, entries, assign, freeze, and more.' },
      { label: 'MDN — Function.prototype.bind()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind', note: 'Pin this permanently to a function.' },
    ],
    deliverable: 'Write account.js demonstrating a method, a broken `this`, and a bind/arrow fix.',
    checks: [
      {
        kind: 'code',
        id: 'javascript-4-code-1',
        prompt: 'Complete the `account` object so that calling `account.deposit(50)` adds to the balance and the program logs `balance = 150`.',
        boilerplate: 'const account = {\n  balance: 100,\n  deposit(amount) {\n    this.balance += amount;\n    return this.balance;\n  },\n};\n\naccount.deposit(50);\nconsole.log("balance =", account.balance);\n',
        expectedOutput: 'balance = 150',
        explanation: 'When you call `account.deposit(50)`, the method-call syntax binds `this` to the object left of the dot (`account`), so `this.balance` refers to `account.balance`. Mutating `this.balance` updates the object. If you extracted `deposit` into a standalone variable and called it, `this` would be `undefined` (strict mode) and throw.',
      },
      {
        kind: 'mcq',
        id: 'javascript-4-mcq-1',
        prompt: `What does this print?

\`\`\`js
const user = {
  name: "Ada",
  greet() { return "Hi " + this.name; },
};
const fn = user.greet;
console.log(fn());
\`\`\``,
        options: [
          '`"Hi Ada"`',
          '`"Hi undefined"` (or a TypeError in strict mode)',
          '`"Hi "`',
          '`"Hi null"`',
        ],
        correctIndex: 1,
        explanation: 'Detaching the method into `fn` and calling it as a bare function means there is no object to the left of the dot, so `this` is `undefined` (in strict/module code) or the global object (in sloppy mode). Reading `this.name` then yields `undefined` or throws. Fix with `user.greet.bind(user)` or an arrow wrapper. See [MDN — this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this).',
      },
      {
        kind: 'mcq',
        id: 'javascript-4-mcq-2',
        prompt: `What does this print?

\`\`\`js
const obj = {};
console.log(typeof obj.toString);
\`\`\``,
        options: [
          '`"undefined"`',
          '`"function"` (inherited from `Object.prototype`)',
          '`"object"`',
          'A TypeError is thrown.',
        ],
        correctIndex: 1,
        explanation: 'Even an empty object literal `{}` inherits from `Object.prototype`. When a property is missing on the object itself, lookup walks up the prototype chain — so `obj.toString` resolves to the function defined on `Object.prototype`, and `typeof` reports `"function"`. The chain ends at `null`. See [MDN — Prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain).',
      },
      {
        kind: 'mcq',
        id: 'javascript-4-mcq-3',
        prompt: 'Inside a callback, an **arrow function** determines `this` by…',
        options: [
          'how the arrow function is called (dynamic binding).',
          'the lexical scope where the arrow was defined (it captures the surrounding `this`).',
          'always being `undefined`.',
          'always being the global object.',
        ],
        correctIndex: 1,
        explanation: 'Arrow functions do not have their own `this`; they capture `this` from the enclosing lexical scope at definition time. This is exactly why arrows are convenient for callbacks inside methods — `this` stays pointing at the surrounding object instead of being rebound. See [MDN — Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#cannot_be_used_as_methods).',
      },
      {
        kind: 'mcq',
        id: 'javascript-4-mcq-4',
        prompt: `What does this print?

\`\`\`js
const a = { x: 1 };
const b = { ...a, y: 2 };
console.log(b.x, b.y);
\`\`\``,
        options: ['`1 2`', '`undefined 2`', '`1 undefined`', 'A SyntaxError.'],
        correctIndex: 0,
        explanation: 'The object spread `{ ...a, y: 2 }` copies all of `a`\'s own enumerable properties into a new object, then adds `y: 2`. This produces a *shallow* copy `{ x: 1, y: 2 }`. Spread is the idiomatic way to clone and extend objects immutably. See [MDN — Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax).',
      },
    ],
  },

  // ─── Level 5 ─────────────────────────────────────────────────────────────
  {
    id: 'javascript-5',
    language: 'javascript',
    level: 5,
    title: 'Modern JavaScript — let/const, Destructuring, Spread, Modules',
    timeEstimate: '5-7 hours',
    intro: `By the end of this phase you'll write fluent ES2015+ JavaScript: \`const\` by default and \`let\` when you must reassign, destructuring to unpack arrays and objects, default parameters, rest/spread (\`...\`), template literals, and the import/export module system. These features are the everyday vocabulary of modern codebases.

To build the muscle, split a small program into two ES modules locally: \`math.mjs\` that \`export\`s an \`add\` function, and \`main.mjs\` that \`import\`s and uses it. Run with \`node main.mjs\`. Then refactor a function to take an options object and destructure it with defaults: \`function f({ retries = 3 } = {}) {}\`.`,
    topics: [
      { label: 'MDN — Destructuring assignment', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment', note: 'Unpack arrays and objects into variables.' },
      { label: 'MDN — Spread syntax', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax', note: 'Expand iterables and object properties.' },
      { label: 'MDN — Template literals', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals', note: 'Backtick strings with ${} interpolation.' },
      { label: 'MDN — JavaScript modules', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules', note: 'import/export and how modules are scoped.' },
      { label: 'MDN — Default parameters', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters', note: 'Fallback values for missing arguments.' },
      { label: 'MDN — const', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const', note: 'Block-scoped, must be initialized, binding is immutable.' },
    ],
    deliverable: 'Split a program into math.mjs and main.mjs using import/export.',
    checks: [
      {
        kind: 'code',
        id: 'javascript-5-code-1',
        prompt: 'Use array and object destructuring plus a template literal so the program logs `Ada scored 95`.',
        boilerplate: 'const data = { name: "Ada", scores: [95, 80] };\nconst { name, scores } = data;\nconst [top] = scores;\nconsole.log(`${name} scored ${top}`);\n',
        expectedOutput: 'Ada scored 95',
        explanation: 'Object destructuring `{ name, scores }` pulls properties into same-named variables; array destructuring `[top]` grabs the first element. Template literals interpolate any expression inside `${...}` and span multiple lines. Together they make extracting and formatting data concise.',
      },
      {
        kind: 'mcq',
        id: 'javascript-5-mcq-1',
        prompt: `What does this print?

\`\`\`js
const arr = [1, 2, 3, 4];
const [first, ...rest] = arr;
console.log(first, rest.length);
\`\`\``,
        options: ['`1 3`', '`1 4`', '`[1] 3`', '`1 [2,3,4]`'],
        correctIndex: 0,
        explanation: 'The rest element `...rest` in a destructuring pattern collects the remaining elements into a new array, so `first` is `1` and `rest` is `[2, 3, 4]` whose `length` is `3`. Rest in a *pattern* gathers; spread in a *literal/call* expands — same `...` token, opposite directions. See [MDN — Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment).',
      },
      {
        kind: 'mcq',
        id: 'javascript-5-mcq-2',
        prompt: `What does this print? (Both \`obj\` and \`arr\` were declared with \`const\`.)

\`\`\`js
const obj = { a: 1 };
obj.a = 2;
const arr = [1];
arr.push(9);
console.log(obj.a, arr.length);
\`\`\``,
        options: [
          'It throws: cannot mutate a const.',
          '`2 2`',
          '`1 1`',
          '`2 1`',
        ],
        correctIndex: 1,
        explanation: '`const` makes the *binding* immutable, not the value. You cannot reassign `obj` to a different object, but you can freely mutate the object it points to (`obj.a = 2`) and the array (`arr.push(9)`). To make the value itself immutable you would need `Object.freeze`. See [MDN — const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const).',
      },
      {
        kind: 'mcq',
        id: 'javascript-5-mcq-3',
        prompt: `What does this print?

\`\`\`js
function f(a, b = a * 2) {
  return a + b;
}
console.log(f(3));
\`\`\``,
        options: ['`9`', '`NaN`', '`3`', 'A ReferenceError.'],
        correctIndex: 0,
        explanation: 'Default parameter expressions are evaluated left to right at call time, and later defaults may reference earlier parameters. With `f(3)`, `b` defaults to `a * 2 = 6`, so the function returns `3 + 6 = 9`. See [MDN — Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters).',
      },
      {
        kind: 'mcq',
        id: 'javascript-5-mcq-4',
        prompt: 'In native ES modules (`.mjs` files / `type: "module"`), which statement is true?',
        options: [
          'Variables declared at the top level of a module are global, like in a classic script.',
          'Each module has its own scope; you must explicitly `export`/`import` to share bindings, and modules run in strict mode.',
          'You can place a static `import x from "y"` declaration anywhere, even conditionally inside a function.',
          'Modules run in sloppy mode by default.',
        ],
        correctIndex: 1,
        explanation: 'Every ES module has its own top-level scope — nothing leaks to the global object. You share values explicitly via `export`, and consume them via `import`. Modules also run in strict mode automatically, and static `import` declarations must be at the top level (use the dynamic `import()` function for conditional loading). See [MDN — JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).',
      },
    ],
  },

  // ─── Level 6 ─────────────────────────────────────────────────────────────
  {
    id: 'javascript-6',
    language: 'javascript',
    level: 6,
    title: 'Classes & Prototypal Inheritance',
    timeEstimate: '5-7 hours',
    intro: `By the end of this phase you'll define \`class\`es with constructors, instance methods, \`static\` members, getters/setters, and private fields (\`#count\`), and you'll \`extends\` a base class and call \`super\`. Critically, you'll understand that \`class\` is *syntactic sugar* over the prototype system from Level 4 — \`class\` methods live on the prototype, and \`extends\` just wires up the prototype chain.

To build the muscle, write a \`shapes.js\` locally with a base \`Shape\` class and a \`Circle extends Shape\` subclass that overrides an \`area()\` method and calls \`super(...)\` in its constructor. Instantiate a few and log their areas.`,
    topics: [
      { label: 'MDN — Classes', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes', note: 'Full class syntax reference.' },
      { label: 'MDN — Using classes', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes', note: 'Guided tour: fields, methods, inheritance.' },
      { label: 'MDN — extends', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends', note: 'Subclassing and how the prototype chain is set up.' },
      { label: 'MDN — super', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super', note: 'Call the parent constructor and methods.' },
      { label: 'MDN — Private properties', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties', note: 'The # private fields and methods.' },
    ],
    deliverable: 'Write shapes.js with a base Shape class and a Circle subclass overriding area().',
    checks: [
      {
        kind: 'code',
        id: 'javascript-6-code-1',
        prompt: 'Complete the `Circle` subclass so it calls `super` and overrides `area()`. With radius 2 it should log `area = 12.57` (rounded to 2 decimals).',
        boilerplate: 'class Shape {\n  constructor(name) {\n    this.name = name;\n  }\n  area() {\n    return 0;\n  }\n}\n\nclass Circle extends Shape {\n  constructor(radius) {\n    super("circle");\n    this.radius = radius;\n  }\n  area() {\n    return Math.PI * this.radius ** 2;\n  }\n}\n\nconst c = new Circle(2);\nconsole.log("area =", c.area().toFixed(2));\n',
        expectedOutput: 'area = 12.57',
        explanation: 'A subclass constructor must call `super(...)` before using `this` — `super` runs the parent constructor. Overriding `area()` in `Circle` shadows the base version because instance-method lookup walks the prototype chain and finds `Circle.prototype.area` first. `**` is exponentiation and `toFixed(2)` formats to two decimals.',
      },
      {
        kind: 'mcq',
        id: 'javascript-6-mcq-1',
        prompt: `What does this print?

\`\`\`js
class A {}
const a = new A();
console.log(typeof A, a instanceof A);
\`\`\``,
        options: ['`class true`', '`function true`', '`object true`', '`function false`'],
        correctIndex: 1,
        explanation: 'A `class` declaration creates a function under the hood — `typeof A` is `"function"`. `class` is sugar over constructor functions and prototypes. `a instanceof A` is `true` because `A.prototype` is in `a`\'s prototype chain. See [MDN — Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).',
      },
      {
        kind: 'mcq',
        id: 'javascript-6-mcq-2',
        prompt: `What happens here?

\`\`\`js
class Counter {
  #count = 0;
  inc() { this.#count++; return this.#count; }
}
const c = new Counter();
console.log(c.inc());
console.log(c.#count);
\`\`\``,
        options: [
          'Logs `1` then `1`.',
          'Logs `1`, then throws a SyntaxError on `c.#count` (private field accessed outside the class).',
          'Logs `1` then `undefined`.',
          'Logs `0` then `0`.',
        ],
        correctIndex: 1,
        explanation: 'Fields prefixed with `#` are truly private: they can only be referenced from inside the class body. `c.inc()` returns `1`, but `c.#count` outside the class is a SyntaxError (it is rejected at parse time, so the whole script fails to run). This is real encapsulation, unlike the older underscore-prefix convention. See [MDN — Private properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties).',
      },
      {
        kind: 'mcq',
        id: 'javascript-6-mcq-3',
        prompt: 'Where do regular (non-static, non-field) methods defined inside a `class` body actually live?',
        options: [
          'On each instance, copied per object.',
          "On the class's `prototype` object, shared by all instances.",
          'On the global object.',
          'Inside a closure unique to each method call.',
        ],
        correctIndex: 1,
        explanation: 'Class methods are placed on `ClassName.prototype`, so every instance shares one function object via the prototype chain rather than each instance carrying its own copy — this is memory-efficient. (Class *fields*, including methods assigned as arrow-function fields, are created per instance instead.) See [MDN — Using classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes).',
      },
      {
        kind: 'mcq',
        id: 'javascript-6-mcq-4',
        prompt: 'In a subclass constructor, what happens if you reference `this` *before* calling `super()`?',
        options: [
          '`this` is `undefined` until `super()` runs.',
          'A ReferenceError is thrown — `this` is not initialized until `super()` is called.',
          'Nothing special; `this` is the parent instance.',
          'It silently creates a new empty object.',
        ],
        correctIndex: 1,
        explanation: 'In a derived class, `this` is uninitialized until `super()` runs the parent constructor; touching `this` beforehand throws a ReferenceError. This is why `super(...)` must come first. A base (non-derived) class has no such restriction. See [MDN — super](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super).',
      },
    ],
  },

  // ─── Level 7 ─────────────────────────────────────────────────────────────
  {
    id: 'javascript-7',
    language: 'javascript',
    level: 7,
    title: 'Asynchronous JavaScript — Callbacks, Promises & async/await',
    timeEstimate: '6-8 hours',
    intro: `By the end of this phase you'll understand JavaScript's single-threaded, non-blocking model: the call stack, the task and microtask queues, and the event loop. You'll move from callback-based async to Promises (\`.then\`/\`.catch\`) to \`async\`/\`await\`, and you'll know why \`await\` only pauses the *async function*, never the whole program. You'll also know that Promise callbacks (microtasks) run before \`setTimeout\` callbacks (macrotasks).

To build the muscle, write a \`fetchUser.js\` locally that returns a Promise resolving after a short \`setTimeout\`, then consume it two ways — once with \`.then()\` and once with \`await\` inside an \`async\` function. Add a rejection path and handle it with \`try/catch\`.`,
    video: {
      title: 'JavaScript Programming - Full Course',
      youtubeId: 'jS4aFq5-91M',
      channelName: 'freeCodeCamp.org',
      duration: '8 hours',
    },
    topics: [
      { label: 'MDN — Asynchronous JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous', note: 'The full async learning path.' },
      { label: 'MDN — Using promises', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises', note: 'then/catch/finally and chaining.' },
      { label: 'MDN — async function', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function', note: 'async/await syntax and semantics.' },
      { label: 'MDN — The event loop', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop', note: 'Call stack, queues, run-to-completion.' },
      { label: 'MDN — Promise', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise', note: 'Promise.all, race, allSettled, and more.' },
    ],
    deliverable: 'Write fetchUser.js returning a Promise, consumed via both .then() and await.',
    checks: [
      {
        kind: 'code',
        id: 'javascript-7-code-1',
        prompt: 'A Promise is a *placeholder* for a future value with three states: pending, fulfilled, rejected. Run this program, which inspects a resolved Promise and logs `is a promise: true`.',
        boilerplate: 'function getAnswer() {\n  return Promise.resolve(42);\n}\n\nconst p = getAnswer();\nconsole.log("is a promise:", p instanceof Promise);\n// We consume the value with .then; the callback is a microtask.\np.then((value) => {\n  console.log("got:", value);\n});\nconsole.log("this logs before the .then callback runs");\n',
        expectedOutput: 'is a promise: true',
        explanation: '`Promise.resolve(42)` creates an already-resolved Promise — an object, not the raw value. Its `.then` callback runs as a *microtask* only after the current synchronous code finishes, which is why `"this logs before…"` prints before `got: 42` would. This deferred scheduling is the foundation that `async/await` is built on.',
      },
      {
        kind: 'code',
        id: 'javascript-7-code-2',
        prompt: 'A `then`/`catch` chain handles success and failure. Run this program that builds and inspects a chain and logs `chained: true`. (`await` is just syntactic sugar over this `.then` chaining.)',
        boilerplate: 'function getTen() {\n  return Promise.resolve(10);\n}\n\nconst chain = getTen()\n  .then((n) => n * 2)\n  .catch((err) => console.log("error:", err));\n\nconsole.log("chained:", chain instanceof Promise);\nchain.then((doubled) => console.log("doubled:", doubled));\n',
        expectedOutput: 'chained: true',
        explanation: 'Each `.then` returns a *new* Promise, so calls chain. The value returned from one `.then` callback becomes the input to the next; a thrown error skips ahead to the nearest `.catch`. `async`/`await` is sugar over exactly this — `await p` is conceptually `p.then(...)`, letting asynchronous code read top-to-bottom while staying non-blocking.',
      },
      {
        kind: 'mcq',
        id: 'javascript-7-mcq-1',
        prompt: `What is the output order?

\`\`\`js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
\`\`\``,
        options: ['`A B C D`', '`A D C B`', '`A D B C`', '`A C D B`'],
        correctIndex: 1,
        explanation: 'Synchronous code runs first (`A`, `D`). Then the microtask queue drains before the next macrotask — Promise `.then` callbacks are microtasks, so `C` runs before the `setTimeout` callback `B`, which is a macrotask. The order is `A D C B`. See [MDN — The event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop).',
      },
      {
        kind: 'mcq',
        id: 'javascript-7-mcq-2',
        prompt: 'What does an `async` function always return?',
        options: [
          'Whatever value you return, unwrapped.',
          'A Promise that resolves with the returned value (or rejects if it throws).',
          '`undefined` unless you call `.resolve()`.',
          'A generator object.',
        ],
        correctIndex: 1,
        explanation: 'An `async` function always returns a Promise. Returning a plain value resolves that Promise with the value; throwing inside it rejects the Promise. That is why the caller must use `await` or `.then` to get the result. See [MDN — async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).',
      },
      {
        kind: 'mcq',
        id: 'javascript-7-mcq-3',
        prompt: 'You have three independent async calls and want to run them concurrently and wait for all to finish. Which is best?',
        options: [
          '`await a(); await b(); await c();`',
          '`await Promise.all([a(), b(), c()]);`',
          '`Promise.race([a(), b(), c()]);`',
          'Wrap each in its own `setTimeout`.',
        ],
        correctIndex: 1,
        explanation: 'Calling `a()`, `b()`, `c()` (which starts them) and passing the resulting promises to `Promise.all` runs them concurrently and resolves with an array of all results once every promise settles — rejecting fast if any rejects. Sequential `await`s would needlessly wait for each before starting the next; `Promise.race` resolves on the *first* to settle. See [MDN — Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all).',
      },
    ],
  },

  // ─── Level 8 ─────────────────────────────────────────────────────────────
  {
    id: 'javascript-8',
    language: 'javascript',
    level: 8,
    title: 'The Browser — DOM, Events, fetch & JSON',
    timeEstimate: '5-7 hours',
    intro: `By the end of this phase you'll understand how JavaScript talks to a web page (the DOM), responds to user actions (events), and exchanges data with servers (\`fetch\` + JSON). Because the sandbox has no DOM, this phase teaches those browser APIs conceptually via MCQs, and uses runnable code only for the parts that run anywhere — \`JSON.parse\`/\`JSON.stringify\`.

To build the muscle, create a tiny HTML file locally with a button and a \`<p id="out">\`; in a \`<script>\`, add an event listener that, on click, \`fetch\`es \`https://jsonplaceholder.typicode.com/todos/1\`, parses the JSON, and writes a field into the paragraph's \`textContent\`.`,
    topics: [
      { label: 'MDN — DOM introduction', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction', note: 'How the page becomes a tree of nodes.' },
      { label: 'MDN — EventTarget.addEventListener()', url: 'https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener', note: 'Registering event handlers.' },
      { label: 'MDN — Using the Fetch API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch', note: 'Make HTTP requests that return Promises.' },
      { label: 'MDN — JSON', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON', note: 'parse and stringify.' },
      { label: 'MDN — Document.querySelector()', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector', note: 'Select elements with CSS selectors.' },
    ],
    deliverable: 'Build an HTML page with a button that fetches JSON and renders a field into the DOM.',
    checks: [
      {
        kind: 'code',
        id: 'javascript-8-code-1',
        prompt: 'Parse the JSON string, mutate one field, and re-serialize it. The program should log a string containing `"done":true`.',
        boilerplate: 'const text = \'{"id":1,"title":"learn JS","done":false}\';\nconst obj = JSON.parse(text);\nobj.done = true;\nconst out = JSON.stringify(obj);\nconsole.log(out);\n',
        expectedOutput: '"done":true',
        explanation: '`JSON.parse` turns a JSON text string into a JavaScript object; `JSON.stringify` does the reverse. This round-trip is exactly what happens when you `fetch` data, read `await res.json()`, modify it, and `POST` it back. Note `JSON.stringify` omits `undefined` values and functions.',
      },
      {
        kind: 'mcq',
        id: 'javascript-8-mcq-1',
        prompt: 'What does `fetch(url)` return?',
        options: [
          'The response body as a string, synchronously.',
          'A Promise that resolves to a `Response` object (you then call `.json()` or `.text()`).',
          'The parsed JSON object directly.',
          'An XMLHttpRequest instance.',
        ],
        correctIndex: 1,
        explanation: '`fetch` returns a Promise that resolves to a `Response`. The body is read separately and asynchronously — typically `const data = await res.json()`. Importantly, `fetch` only rejects on network failure; an HTTP 404 or 500 still *resolves*, so you must check `res.ok`. See [MDN — Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).',
      },
      {
        kind: 'mcq',
        id: 'javascript-8-mcq-2',
        prompt: 'Which call selects the first element with `class="item"` from the page?',
        options: [
          '`document.querySelector(".item")`',
          '`document.querySelector("#item")`',
          '`document.getElement("item")`',
          '`document.querySelector("item")`',
        ],
        correctIndex: 0,
        explanation: '`querySelector` takes a CSS selector and returns the first match (or `null`). A class is selected with a leading dot (`.item`); `#item` would match an `id`, and a bare `item` would match `<item>` tags. Use `querySelectorAll` to get all matches as a NodeList. See [MDN — querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector).',
      },
      {
        kind: 'mcq',
        id: 'javascript-8-mcq-3',
        prompt: `What does this print?

\`\`\`js
const o = { a: 1, b: undefined, c: () => 1 };
console.log(JSON.stringify(o));
\`\`\``,
        options: [
          '`{"a":1,"b":undefined,"c":null}`',
          '`{"a":1}`',
          '`{"a":1,"b":null,"c":null}`',
          'A TypeError is thrown.',
        ],
        correctIndex: 1,
        explanation: '`JSON.stringify` skips object properties whose value is `undefined` or a function entirely, so only `a` survives, giving `{"a":1}`. (In *arrays*, such values become `null` instead.) This silent dropping is a common source of "where did my field go?" bugs. See [MDN — JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).',
      },
      {
        kind: 'mcq',
        id: 'javascript-8-mcq-4',
        prompt: 'To change the visible text of an element without it being interpreted as HTML, you should set…',
        options: [
          '`element.innerHTML`',
          '`element.textContent`',
          '`element.value`',
          '`element.outerHTML`',
        ],
        correctIndex: 1,
        explanation: 'Setting `textContent` inserts the value as plain text — safe from HTML/script injection. `innerHTML` parses the string as markup, which can introduce XSS vulnerabilities if the content is user-supplied. Prefer `textContent` unless you specifically need to render trusted HTML. See [MDN — Node.textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent).',
      },
    ],
  },

  // ─── Level 9 ─────────────────────────────────────────────────────────────
  {
    id: 'javascript-9',
    language: 'javascript',
    level: 9,
    title: 'Iterators, Generators, Map, Set & Symbol',
    timeEstimate: '5-7 hours',
    intro: `By the end of this phase you'll understand the iteration protocol that powers \`for...of\` and spread, write \`function*\` generators that lazily \`yield\` values, and choose the right collection: \`Map\` (any-keyed, ordered, sized) and \`Set\` (unique values) over plain objects and arrays. You'll also see what \`Symbol\` is for — unique, non-colliding keys like \`Symbol.iterator\`.

To build the muscle, write a \`range.js\` locally with a \`function* range(start, end)\` generator and consume it with \`for...of\` and \`[...range(1, 5)]\`. Then deduplicate an array with \`[...new Set(arr)]\` and count word frequencies with a \`Map\`.`,
    topics: [
      { label: 'MDN — Iteration protocols', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols', note: 'The iterable and iterator contracts.' },
      { label: 'MDN — Generators (function*)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*', note: 'Lazy, pausable functions that yield.' },
      { label: 'MDN — Map', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map', note: 'Keyed collection with any key type, insertion order.' },
      { label: 'MDN — Set', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set', note: 'Collection of unique values.' },
      { label: 'MDN — Symbol', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol', note: 'Unique primitive values used as keys.' },
    ],
    deliverable: 'Write range.js with a generator, plus dedup-with-Set and count-with-Map snippets.',
    checks: [
      {
        kind: 'code',
        id: 'javascript-9-code-1',
        prompt: 'Write a generator `range(start, end)` that yields each integer from `start` up to but not including `end`. Spreading `range(1, 5)` should produce `[1,2,3,4]`, and the program should log `sum = 10`.',
        boilerplate: 'function* range(start, end) {\n  for (let i = start; i < end; i++) {\n    yield i;\n  }\n}\n\nconst nums = [...range(1, 5)];\nconst sum = nums.reduce((a, b) => a + b, 0);\nconsole.log("values =", nums.join(","));\nconsole.log("sum =", sum);\n',
        expectedOutput: 'sum = 10',
        explanation: 'A generator function (`function*`) returns an iterator; each `yield` produces a value and pauses until the next request. Because generators are iterable, spread `[...range(1,5)]` drains them into an array `[1,2,3,4]`, summing to `10`. Generators are lazy — values are computed on demand, which is great for infinite or expensive sequences.',
      },
      {
        kind: 'code',
        id: 'javascript-9-code-2',
        prompt: 'Use a `Set` to remove duplicates from the array, then log the count of unique values as `unique = 3`.',
        boilerplate: 'const arr = [1, 2, 2, 3, 3, 3];\nconst unique = [...new Set(arr)];\nconsole.log("values =", unique.join(","));\nconsole.log("unique =", unique.length);\n',
        expectedOutput: 'unique = 3',
        explanation: 'A `Set` stores only unique values (compared with SameValueZero). Passing an array to `new Set` deduplicates it; spreading back into an array gives `[1, 2, 3]`, whose `.length` is `3`. (A `Set` itself exposes `.size`, not `.length`.) This `[...new Set(arr)]` idiom is the standard one-liner for deduplication.',
      },
      {
        kind: 'mcq',
        id: 'javascript-9-mcq-1',
        prompt: 'Which is a genuine advantage of `Map` over a plain object for a lookup table?',
        options: [
          'Map keys can be any value (including objects and functions), it preserves insertion order, and it exposes a `.size`.',
          'Map is always faster for every operation.',
          'Map automatically serializes to JSON with `JSON.stringify`.',
          'Map keys are limited to strings, like objects.',
        ],
        correctIndex: 0,
        explanation: 'A `Map` accepts keys of *any* type (objects, functions, numbers — not just strings/symbols like object keys), iterates in insertion order, exposes a `.size`, and has no inherited prototype keys to collide with. Note `JSON.stringify(map)` yields `{}` — Maps are not directly JSON-serializable. See [MDN — Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).',
      },
      {
        kind: 'mcq',
        id: 'javascript-9-mcq-2',
        prompt: 'What makes a JavaScript object *iterable* (usable with `for...of` and spread)?',
        options: [
          'Having a numeric `length` property.',
          'Implementing a method keyed by `Symbol.iterator` that returns an iterator.',
          'Being an instance of `Array`.',
          'Having a `next()` method directly on the object.',
        ],
        correctIndex: 1,
        explanation: 'An object is iterable if it has a `[Symbol.iterator]()` method returning an iterator (an object with a `next()` returning `{ value, done }`). Arrays, strings, Maps, Sets, and generator results all implement this protocol, which is why `for...of` and spread work on them. See [MDN — Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).',
      },
      {
        kind: 'mcq',
        id: 'javascript-9-mcq-3',
        prompt: `What does this print?

\`\`\`js
const s = Symbol("id");
const t = Symbol("id");
console.log(s === t);
\`\`\``,
        options: ['`true`', '`false`', '`undefined`', 'A TypeError.'],
        correctIndex: 1,
        explanation: 'Every `Symbol()` call produces a brand-new, unique value — the string passed is only a description for debugging, not an identity. So two symbols with the same description are never equal. This uniqueness makes symbols ideal for collision-free object keys and well-known protocol hooks like `Symbol.iterator`. See [MDN — Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol).',
      },
    ],
  },

  // ─── Level 10 ────────────────────────────────────────────────────────────
  {
    id: 'javascript-10',
    language: 'javascript',
    level: 10,
    title: 'Performance, the Event Loop In Depth, Memory & Tooling',
    timeEstimate: '6-8 hours',
    intro: `By the end of this phase you'll reason about JavaScript at production scale: how the event loop's microtask vs macrotask queues affect responsiveness, how the garbage collector and closures cause (and fix) memory leaks, why \`WeakMap\`/\`WeakRef\` exist, and how modern tooling (bundlers, tree-shaking, source maps, ESM vs CommonJS) shapes the code you ship. You'll also pick up performance habits: avoid blocking the main thread, debounce, and prefer immutable updates.

To build the muscle, profile a small script locally with \`node --prof\` or the browser Performance panel, then convert a CPU-heavy loop to chunk its work across \`setTimeout(…, 0)\` so it stops freezing the UI. Add a debounce wrapper around a function and observe how often it actually runs.`,
    topics: [
      { label: 'MDN — The event loop', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop', note: 'Run-to-completion, microtasks, macrotasks.' },
      { label: 'MDN — Memory management', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management', note: 'Reachability-based garbage collection.' },
      { label: 'MDN — WeakMap', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap', note: 'Weakly-held keys that do not block GC.' },
      { label: 'MDN — queueMicrotask()', url: 'https://developer.mozilla.org/en-US/docs/Web/API/queueMicrotask', note: 'Schedule work onto the microtask queue.' },
      { label: 'MDN — JavaScript modules', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules', note: 'ESM vs CommonJS, tree-shaking implications.' },
      { label: 'TC39 — Proposals', url: 'https://github.com/tc39/proposals', note: 'How the language evolves through the proposal process.' },
    ],
    deliverable: 'Profile a script, chunk a heavy loop across the event loop, and add a debounce wrapper.',
    checks: [
      {
        kind: 'code',
        id: 'javascript-10-code-1',
        prompt: 'A real debounce uses `setTimeout`/`clearTimeout`. To model the core idea without timers, complete `makeDebounced` so each call stores the latest argument as the "pending" value (overwriting the previous one); only the last survives. After three calls the program should log `pending: lastly`.',
        boilerplate: 'function makeDebounced() {\n  let pending = null;\n  return {\n    call(arg) {\n      // Each call overwrites the previous pending value.\n      pending = arg;\n    },\n    flush() {\n      return pending;\n    },\n  };\n}\n\nconst d = makeDebounced();\nd.call("first");\nd.call("second");\nd.call("lastly");\nconsole.log("pending:", d.flush());\n',
        expectedOutput: 'pending: lastly',
        explanation: 'Debounce coalesces a burst of calls into one: each call replaces the previous pending invocation, so only the final call survives the quiet period (the `flush`/timer firing). It is the standard fix for expensive handlers on `resize`, `scroll`, or keystroke `input` events. A production version schedules `fn` via `setTimeout(fn, delay)` and `clearTimeout`s the prior timer on each call.',
      },
      {
        kind: 'mcq',
        id: 'javascript-10-mcq-1',
        prompt: 'After the current synchronous task finishes, the event loop will…',
        options: [
          'process the next macrotask, then drain microtasks.',
          'drain the entire microtask queue first, then process one macrotask, then drain microtasks again.',
          'process macro and micro tasks in strict FIFO interleaving.',
          'always run setTimeout callbacks before Promise callbacks.',
        ],
        correctIndex: 1,
        explanation: 'After each macrotask (and after the initial script), the event loop fully drains the microtask queue (Promise reactions, `queueMicrotask`) before rendering or picking up the next macrotask (timers, I/O, events). This is why a flood of microtasks can starve rendering, and why Promise callbacks always run before a `setTimeout(…, 0)`. See [MDN — The event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop).',
      },
      {
        kind: 'mcq',
        id: 'javascript-10-mcq-2',
        prompt: 'Which scenario is a classic JavaScript memory leak?',
        options: [
          'A local variable inside a function that returns immediately.',
          'An event listener (or a long-lived array/closure) that keeps references to DOM nodes or large objects that are otherwise no longer needed.',
          'Using `const` instead of `let`.',
          'Calling `JSON.parse` on a large string once.',
        ],
        correctIndex: 1,
        explanation: 'JavaScript GC frees objects that are no longer *reachable*. Leaks happen when something long-lived (a global array, a closure, a never-removed event listener, a `Map` keyed by objects) keeps references alive past their usefulness. `WeakMap`/`WeakRef` exist precisely so caches can hold references that do not prevent collection. See [MDN — Memory management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management).',
      },
      {
        kind: 'mcq',
        id: 'javascript-10-mcq-3',
        prompt: 'Why do ES modules (ESM) enable better tree-shaking than CommonJS (`require`)?',
        options: [
          'ESM is always smaller on disk.',
          'ESM `import`/`export` are static and analyzable at build time, so bundlers can prove which exports are unused and drop them.',
          'CommonJS cannot be minified.',
          'ESM runs faster at runtime in all engines.',
        ],
        correctIndex: 1,
        explanation: 'ESM `import`/`export` bindings are static — determinable without running the code — so a bundler can build the dependency graph at compile time and eliminate exports that are never imported (tree-shaking). CommonJS `require` is a dynamic function call that can appear anywhere, making such static analysis unreliable. See [MDN — JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).',
      },
      {
        kind: 'mcq',
        id: 'javascript-10-mcq-4',
        prompt: 'A CPU-heavy `for` loop running for 2 seconds on the browser main thread will…',
        options: [
          'run in the background without affecting the page.',
          'block the main thread, freezing rendering and input until it finishes (offload it to a Web Worker or chunk it).',
          'automatically be split across multiple threads by the engine.',
          'be paused by `await` automatically.',
        ],
        correctIndex: 1,
        explanation: 'JavaScript on the main thread is single-threaded and runs to completion, so a long synchronous loop blocks rendering, events, and animation until it returns — the page appears frozen. Fixes: move the work to a Web Worker (a true parallel thread), or chunk it across `setTimeout`/`requestIdleCallback` so the loop yields back to the event loop. See [MDN — The event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop).',
      },
    ],
  },
];
