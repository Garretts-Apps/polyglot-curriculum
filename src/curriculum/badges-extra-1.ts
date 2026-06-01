import type { BadgeData } from './badges';

export const badgesExtra1: Record<string, BadgeData> = {
  // ── Ruby ────────────────────────────────────────────────────────────────
  'ruby-0': {
    title: 'Ruby: Setup & Hello World',
    skills: [
      'Verified a local Ruby install with ruby -v and explored the irb interactive shell',
      'Ran a .rb script from the command line with the ruby command',
      'Printed a greeting to standard output using the puts method',
    ],
  },
  'ruby-1': {
    title: 'Ruby: Basics — Variables, Strings & Methods',
    skills: [
      'Stored values in snake_case variables and reasoned about Integer, Float, and String types',
      'Defined methods with def/end and relied on implicit return of the last expression',
      'Embedded values into double-quoted strings with #{} interpolation and chose between puts, print, and p',
    ],
  },
  'ruby-2': {
    title: 'Ruby: Collections — Arrays, Hashes, Blocks & Iterators',
    skills: [
      'Transformed and filtered data with Array and Hash methods like map, select, and reduce',
      'Passed blocks to iterators using both { } and do...end syntax with | | parameters',
      'Iterated with each, times, and ranges instead of manual index loops',
    ],
  },
  'ruby-3': {
    title: 'Ruby: Object-Oriented Ruby — Classes, Modules & Mixins',
    skills: [
      'Defined classes with initialize, instance variables, and attr_accessor-generated accessors',
      'Built inheritance hierarchies using < and forwarded arguments with super',
      'Shared behaviour across classes by mixing in modules with include',
    ],
  },
  'ruby-4': {
    title: 'Ruby: Everything Is an Object — Symbols, Truthiness & nil',
    skills: [
      'Applied Ruby truthiness rules, treating only false and nil as falsy (0 and "" as truthy)',
      'Used interned, immutable symbols as identifiers and hash keys',
      'Guarded against nil with the safe-navigation operator &. and the || default idiom',
    ],
  },
  'ruby-5': {
    title: 'Ruby: Blocks, Procs, Lambdas & yield',
    skills: [
      'Invoked passed-in blocks with yield and detected them with block_given?',
      'Distinguished lambda arity and return semantics from those of non-lambda Procs',
      'Created callables with the stabby lambda and applied the &:method symbol-to-proc shorthand',
    ],
  },
  'ruby-6': {
    title: 'Ruby: Metaprogramming — method_missing & define_method',
    skills: [
      'Intercepted calls to undefined methods by overriding method_missing',
      'Generated methods at runtime with define_method and kept introspection honest via respond_to_missing?',
      'Dispatched methods dynamically by name using send and public_send',
    ],
  },
  'ruby-7': {
    title: 'Ruby: Exceptions & Enumerable Mastery',
    skills: [
      'Handled errors with begin/rescue/ensure and defined custom exceptions subclassing StandardError',
      'Explained why a bare rescue catches StandardError rather than the broader Exception hierarchy',
      'Reshaped collections with Enumerable methods such as group_by, partition, and reduce',
    ],
  },
  'ruby-8': {
    title: 'Ruby: Gems, Bundler & File I/O',
    skills: [
      'Managed dependencies with a Gemfile, bundle install, and the ~> version constraint',
      'Explained how Gemfile.lock pins exact versions for reproducible installs',
      'Read and wrote files with the block form of File.open that auto-closes the handle',
    ],
  },
  'ruby-9': {
    title: 'Ruby: Testing & Idioms — Minitest, RSpec & Clean Ruby',
    skills: [
      'Wrote tests with Minitest test_ methods and assertions like assert_equal',
      'Expressed expectations in RSpec with describe/it and expect(...).to eq matchers',
      'Applied idiomatic Ruby: guard clauses, unless, and predicate methods',
    ],
  },
  'ruby-10': {
    title: 'Ruby: Performance, Concurrency & Internals',
    skills: [
      'Explained why the GVL limits CRuby threads to I/O parallelism, not CPU parallelism',
      'Achieved true parallelism with Ractors and cooperative concurrency with Fibers',
      'Measured code with the Benchmark module and reduced allocations via frozen_string_literal',
    ],
  },

  // ── JavaScript ──────────────────────────────────────────────────────────
  'javascript-0': {
    title: 'JavaScript: Setup & Hello World',
    skills: [
      'Ran JavaScript both in the browser DevTools console and from a file with node hello.js',
      'Printed output using console.log and identified where its output appears in each environment',
      'Explained that Node.js executes JavaScript outside the browser via the V8 engine',
    ],
  },
  'javascript-1': {
    title: 'JavaScript: Values, Types & Coercion — == vs ===',
    skills: [
      'Inspected values with typeof and identified the seven primitive types',
      'Predicted implicit coercion results such as "5" + 1 versus "5" - 1',
      'Chose strict === over loose == and tested float near-equality with Number.EPSILON',
    ],
  },
  'javascript-2': {
    title: 'JavaScript: Functions, Scope, Hoisting & Closures',
    skills: [
      'Distinguished function declarations from expressions and explained what hoisting moves',
      'Contrasted function-scoped var with block-scoped let/const and the temporal dead zone',
      'Built closures that capture and persist private state across calls',
    ],
  },
  'javascript-3': {
    title: 'JavaScript: Arrays & the Functional Toolkit — map, filter, reduce',
    skills: [
      'Chained map, filter, and reduce into a top-to-bottom data pipeline',
      'Distinguished mutating array methods (push, splice, sort) from non-mutating ones',
      'Selected the right method among find, some, every, and includes for a task',
    ],
  },
  'javascript-4': {
    title: 'JavaScript: Objects, Prototypes & this',
    skills: [
      'Explained how property lookup walks the prototype chain to Object.prototype',
      'Predicted the value of this from a call site and repaired a detached method with bind',
      'Copied and merged objects with the spread operator and iterated with Object.keys/entries',
    ],
  },
  'javascript-5': {
    title: 'JavaScript: Modern JavaScript — let/const, Destructuring, Spread, Modules',
    skills: [
      'Unpacked arrays and objects with destructuring, defaults, and rest elements',
      'Explained that const fixes the binding, not the mutability of the value it points to',
      'Shared code across files using ES module import/export with isolated module scope',
    ],
  },
  'javascript-6': {
    title: 'JavaScript: Classes & Prototypal Inheritance',
    skills: [
      'Defined classes with constructors, static members, getters/setters, and #private fields',
      'Subclassed with extends and invoked the parent constructor with super before using this',
      'Explained that class is sugar over prototypes, with methods living on the prototype',
    ],
  },
  'javascript-7': {
    title: 'JavaScript: Asynchronous JavaScript — Callbacks, Promises & async/await',
    skills: [
      'Consumed Promises with .then/.catch chains and refactored them to async/await',
      'Ordered output by reasoning about the event loop, microtasks, and macrotasks',
      'Ran independent async work concurrently with Promise.all',
    ],
  },
  'javascript-8': {
    title: 'JavaScript: The Browser — DOM, Events, fetch & JSON',
    skills: [
      'Round-tripped data with JSON.parse and JSON.stringify and noted dropped undefined/function values',
      'Explained that fetch returns a Promise resolving to a Response that needs res.ok and .json()',
      'Selected DOM elements with querySelector and updated text safely via textContent',
    ],
  },
  'javascript-9': {
    title: 'JavaScript: Iterators, Generators, Map, Set & Symbol',
    skills: [
      'Wrote function* generators that lazily yield values consumed by for...of and spread',
      'Chose Map and Set over plain objects/arrays and deduplicated with [...new Set(arr)]',
      'Explained the Symbol.iterator iteration protocol and the uniqueness of every Symbol',
    ],
  },
  'javascript-10': {
    title: 'JavaScript: Performance, the Event Loop In Depth, Memory & Tooling',
    skills: [
      'Explained how the microtask queue drains fully before each macrotask, affecting responsiveness',
      'Identified reachability-based memory leaks and the role of WeakMap/WeakRef',
      'Kept the main thread responsive by chunking heavy loops and debouncing handlers',
    ],
  },

  // ── TypeScript for JS Devs ──────────────────────────────────────────────
  'typescript-js-0': {
    title: 'TypeScript for JS Devs: Setup & Hello World',
    skills: [
      'Explained that every valid .js file is already valid TypeScript with an optional type layer',
      'Generated a tsconfig.json and checked the compiler version with tsc --version',
      'Compiled and ran a typed program that prints a greeting to the console',
    ],
  },
  'typescript-js-1': {
    title: 'TypeScript for JS Devs: Annotations & Inference — Let It Infer',
    skills: [
      'Defined a type as the set of allowed values plus the operations legal on them',
      'Annotated function parameters while letting local variables rely on inference',
      'Verified type correctness with tsc --noEmit before running the code',
    ],
  },
  'typescript-js-2': {
    title: 'TypeScript for JS Devs: Object Shapes — Interfaces vs Type Aliases',
    skills: [
      'Described object shapes with both interface and type and chose between them appropriately',
      'Applied structural typing alongside optional (?) and readonly properties',
      'Explained why excess property checks reject stray keys on object literals',
    ],
  },
  'typescript-js-3': {
    title: 'TypeScript for JS Devs: Unions, Literals & Narrowing — Where TS Earns Its Keep',
    skills: [
      'Modeled values with union and literal types to replace magic strings with a closed set',
      'Narrowed unions using typeof, in, Array.isArray, and truthiness checks',
      'Authored a user-defined type guard with an x is Foo return predicate',
    ],
  },
  'typescript-js-4': {
    title: 'TypeScript for JS Devs: Typing Functions — Params, Returns, Overloads & this',
    skills: [
      'Typed function values, optional/default/rest parameters, and return types including void',
      'Wrote overloaded call signatures whose return type depends on the arguments',
      'Used a this parameter and relied on contextual typing for callback parameters',
    ],
  },
  'typescript-js-5': {
    title: 'TypeScript for JS Devs: Generics — Functions & Types That Stay Honest',
    skills: [
      'Wrote generic functions and types that preserve the input-to-output type relationship',
      'Constrained type parameters with extends and let TypeScript infer them from arguments',
      'Built generic containers and key-aware helpers like getProp<T, K extends keyof T>',
    ],
  },
  'typescript-js-6': {
    title: 'TypeScript for JS Devs: Arrays, Tuples, readonly & as const',
    skills: [
      'Distinguished homogeneous arrays from fixed-length, position-typed tuples',
      'Applied readonly arrays/tuples and explained why they are not assignable to mutable ones',
      'Froze literals with as const and derived a union type from a runtime array of values',
    ],
  },
  'typescript-js-7': {
    title: "TypeScript for JS Devs: Utility Types, keyof & typeof — Don't Repeat Your Types",
    skills: [
      'Transformed shapes with Partial, Pick, Omit, Record, Readonly, and ReturnType',
      'Queried types with keyof and the type-level typeof operators',
      'Derived update DTOs, summaries, and groupings from a single source interface',
    ],
  },
  'typescript-js-8': {
    title: 'TypeScript for JS Devs: Conditional & Mapped Types — Building the Utilities Yourself',
    skills: [
      'Re-implemented Partial, Readonly, and Record using mapped types over keyof',
      'Branched at the type level with conditional types and extracted parts using infer',
      'Applied key remapping, template-literal types, and conditional distribution over unions',
    ],
  },
  'typescript-js-9': {
    title: 'TypeScript for JS Devs: Discriminated Unions, Exhaustiveness, never & Assertions',
    skills: [
      'Modeled tagged unions with a common literal field that narrows in each switch branch',
      'Enforced compile-time exhaustiveness with a never default case',
      'Wrote assertion functions (asserts x is T) and reserved as casts and ! as last resorts',
    ],
  },
  'typescript-js-10': {
    title: 'TypeScript for JS Devs: Declaration Files, Modules, Strictness & Migrating JS→TS',
    skills: [
      'Distributed and consumed types via .d.ts files, declare, and @types packages',
      'Configured module resolution, import type, and strictness flags like strictNullChecks',
      'Migrated a JS codebase incrementally with allowJs and // @ts-check JSDoc checking',
    ],
  },

  // ── Java ──────────────────────────────────────────────────────────────────
  'java-0': {
    title: 'Java: Setup & Hello World',
    skills: [
      'Explained the javac compile-to-bytecode and JVM run pipeline behind write-once-run-anywhere',
      'Confirmed a working install with java --version from the terminal',
      'Compiled and ran a program that prints a greeting to the console',
    ],
  },
  'java-1': {
    title: 'Java: Basics — Types, Variables, Operators & Output',
    skills: [
      'Declared variables with primitive types and applied arithmetic and comparison operators',
      'Produced formatted console output using printf',
      'Wrote a Celsius-to-Fahrenheit conversion program printing both values',
    ],
  },
  'java-2': {
    title: 'Java: Control Flow & Methods',
    skills: [
      'Directed flow with if/else, switch, and for/while/do-while loops',
      'Factored logic into typed static methods and overloaded them by signature',
      'Explained switch fall-through and the arrow (->) form that avoids it',
    ],
  },
  'java-3': {
    title: 'Java: Classes, Objects & Encapsulation',
    skills: [
      'Defined classes with constructors, instance fields, and the this reference',
      'Enforced encapsulation with private fields exposed through getters and setters',
      'Distinguished static members shared across instances from per-instance state',
    ],
  },
  'java-4': {
    title: 'Java: Inheritance, Interfaces & Polymorphism',
    skills: [
      'Built type hierarchies with extends, implements, abstract classes, and @Override',
      'Invoked overridden methods through dynamic dispatch on the runtime type',
      'Distinguished runtime overriding from compile-time overloading and used interface default methods',
    ],
  },
  'java-5': {
    title: 'Java: Generics & the Collections Framework',
    skills: [
      'Used generic type parameters like List<String> for compile-time safety without casts',
      'Selected among List, Set, and Map implementations by their Big-O trade-offs',
      'Built a word-frequency counter with a Map and getOrDefault, and explained type erasure',
    ],
  },
  'java-6': {
    title: 'Java: Exceptions & Resource Management',
    skills: [
      'Handled errors with try/catch/finally and distinguished checked from unchecked exceptions',
      'Threw, chained, and defined custom exception classes',
      'Cleaned up AutoCloseable resources deterministically with try-with-resources',
    ],
  },
  'java-7': {
    title: 'Java: Lambdas & the Streams API',
    skills: [
      'Wrote lambda expressions and method references targeting functional interfaces',
      'Built declarative stream pipelines with filter, map, sorted, and collect',
      'Explained lazy evaluation, intermediate vs terminal operations, and one-shot streams',
    ],
  },
  'java-8': {
    title: 'Java: Records, Sealed Classes & Modern Java (17/21)',
    skills: [
      'Defined records as immutable data carriers with auto-generated accessors and equals/hashCode',
      'Restricted type hierarchies with sealed classes and interfaces',
      'Applied pattern matching for instanceof and switch, text blocks, and var inference',
    ],
  },
  'java-9': {
    title: 'Java: Concurrency — Threads, Executors & Virtual Threads',
    skills: [
      'Managed concurrent work with ExecutorService thread pools and CompletableFuture',
      'Fixed a lost-update race using AtomicInteger and reasoned about volatile/synchronized visibility',
      'Ran thousands of lightweight blocking tasks on a JDK 21 virtual-thread executor',
    ],
  },
  'java-10': {
    title: 'Java: The JVM — GC, JIT, Performance & Tooling',
    skills: [
      'Explained the JVM heap generations and garbage collectors such as G1, ZGC, and Shenandoah',
      'Described how the HotSpot tiered JIT compiles hot bytecode to native code',
      'Observed a running JVM with tools like jstack, jcmd, and JFR and benchmarked with JMH',
    ],
  },
};
