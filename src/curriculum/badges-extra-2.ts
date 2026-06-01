import type { BadgeData } from './badges';

export const badgesExtra2: Record<string, BadgeData> = {
  // ── Zig ─────────────────────────────────────────────────────────────────────
  'zig-0': {
    title: 'Zig: Setup & Hello World',
    skills: [
      'Installed the Zig toolchain and verified the release with zig version',
      'Compiled and ran a program in one step with zig run',
      'Produced console output using std.debug.print with an empty argument tuple',
    ],
  },
  'zig-1': {
    title: 'Zig: const/var, Integer Types & Overflow',
    skills: [
      'Declared immutable const and mutable var bindings, letting the compiler reject unmutated vars',
      'Chose sized integer types like u8, i32, and usize for values and indices',
      'Explained how safe builds trap integer overflow and opted into wraparound with +%',
    ],
  },
  'zig-2': {
    title: 'Zig: Control Flow & Functions',
    skills: [
      'Branched and looped with if, while, and for-over-range using bool-only conditions',
      'Used if and switch as value-producing expressions',
      'Defined functions with explicit parameter and return types, including recursion',
    ],
  },
  'zig-3': {
    title: 'Zig: Arrays, Slices & Sentinel-Terminated Pointers',
    skills: [
      'Distinguished fixed-length arrays from slices that carry a runtime .len',
      'Iterated slices with for (slice) |v| under bounds-checked indexing',
      'Explained sentinel-terminated string literals and their C-string interop',
    ],
  },
  'zig-4': {
    title: 'Zig: Optionals & Null Safety',
    skills: [
      'Modeled possibly-absent values with the optional type ?T instead of null pointers',
      'Unwrapped optionals with orelse defaults, if-capture, and the .? assertion',
      'Expressed nullable pointers as ?*T while keeping bare *T non-null',
    ],
  },
  'zig-5': {
    title: 'Zig: Error Handling — Error Unions, try, catch & errdefer',
    skills: [
      'Defined error sets and returned recoverable failure as error unions E!T',
      'Propagated errors with try and handled them with catch fallbacks',
      'Released partially-acquired resources on the error path using errdefer',
    ],
  },
  'zig-6': {
    title: 'Zig: Structs, Enums, Unions & Tagged Unions',
    skills: [
      'Defined structs with fields and methods, using @This() for the enclosing type',
      'Declared enums and read their integer tags with @intFromEnum',
      'Switched exhaustively over tagged union(enum) variants with payload capture',
    ],
  },
  'zig-7': {
    title: 'Zig: comptime & Generics',
    skills: [
      'Evaluated ordinary Zig at compile time with comptime expressions',
      'Wrote generic functions taking a comptime T: type parameter',
      'Used anytype and functions that return types, as in std.ArrayList(T)',
    ],
  },
  'zig-8': {
    title: 'Zig: Allocators & Manual Memory Management',
    skills: [
      'Passed std.mem.Allocator explicitly to any code needing heap memory',
      'Paired allocator.alloc with defer allocator.free to guarantee release',
      'Chose between GeneralPurposeAllocator, ArenaAllocator, and FixedBufferAllocator',
    ],
  },
  'zig-9': {
    title: 'Zig: The Build System, Testing & C Interop',
    skills: [
      'Constructed a build graph in build.zig using std.Build',
      'Wrote test blocks with std.testing assertions and ran zig build test',
      'Imported and called C declarations with @cImport and used zig cc as a C compiler',
    ],
  },
  'zig-10': {
    title: 'Zig: Packed Structs, SIMD & Performance',
    skills: [
      'Laid out bit-precise fields with packed struct for protocols and registers',
      'Computed SIMD operations using @Vector and @reduce',
      'Compared Debug, ReleaseSafe, ReleaseFast, and ReleaseSmall safety and speed tradeoffs',
    ],
  },

  // ── Lisp ────────────────────────────────────────────────────────────────────
  'lisp-0': {
    title: 'Lisp: Setup & Hello World',
    skills: [
      'Installed SBCL and started the interactive Read-Eval-Print Loop',
      'Evaluated expressions live at the REPL one form at a time',
      'Printed a line of text from a Common Lisp program',
    ],
  },
  'lisp-1': {
    title: 'Lisp: S-Expressions, Atoms & the Reader',
    skills: [
      'Read and wrote prefix-notation s-expressions for arithmetic and lists',
      'Distinguished atoms from lists and quoted data with quote',
      'Explained how the reader turns text into evaluable list structure',
    ],
  },
  'lisp-2': {
    title: 'Lisp: Definitions & Bindings',
    skills: [
      'Defined functions with defun and globals with defvar/defparameter',
      'Introduced local bindings with let and let*',
      'Applied the variadic numeric tower of integers, ratios, and floats',
    ],
  },
  'lisp-3': {
    title: 'Lisp: Lists & Cons Cells',
    skills: [
      'Built and decomposed lists using cons, car, and cdr',
      'Traced chains of car/cdr calls over nested cons-cell structure',
      'Explained why nil terminates every proper list',
    ],
  },
  'lisp-4': {
    title: 'Lisp: Conditionals & Truthiness',
    skills: [
      'Branched with if, cond, when, and unless',
      'Applied the rule that everything except nil is true, with nil as the empty list',
      'Used predicates ending in p such as evenp, null, and zerop',
    ],
  },
  'lisp-5': {
    title: 'Lisp: Recursion & Higher-Order Functions',
    skills: [
      'Wrote anonymous functions with lambda and mapped them over lists with mapcar',
      'Folded lists to a single value with reduce',
      'Processed recursive list structures with recursive functions',
    ],
  },
  'lisp-6': {
    title: 'Lisp: The format Directive Language',
    skills: [
      'Formatted output with directives ~a, ~d, ~s, and ~%',
      'Iterated over lists inside a control string with ~{...~}',
      'Pluralized and aligned output with ~:p and column directives',
    ],
  },
  'lisp-7': {
    title: 'Lisp: Macros & Code-as-Data',
    skills: [
      'Wrote macros with defmacro that receive their arguments unevaluated',
      'Assembled expansion forms with backquote, comma, and splice ,@',
      'Inspected expansions with macroexpand-1 and avoided capture using gensym',
    ],
  },
  'lisp-8': {
    title: 'Lisp: Structures & CLOS',
    skills: [
      'Defined record types with defstruct and classes with defclass',
      'Declared generic functions with defgeneric and per-class methods with defmethod',
      'Predicted multiple-dispatch method selection and built instances with make-instance',
    ],
  },
  'lisp-9': {
    title: 'Lisp: Conditions & Restarts',
    skills: [
      'Defined conditions with define-condition and signaled them on bad input',
      'Published named recovery strategies using restart-case',
      'Distinguished handler-case unwinding from handler-bind resuming in place',
    ],
  },
  'lisp-10': {
    title: 'Lisp: Packages, Standard & Optimization',
    skills: [
      'Organized symbols into packages with defpackage and in-package and built systems with ASDF',
      'Added optimize (speed 3) declarations and measured speedups with time',
      'Contrasted Common Lisp with Scheme and Clojure within the Lisp family',
    ],
  },

  // ── Lua ─────────────────────────────────────────────────────────────────────
  'lua-0': {
    title: 'Lua: Setup & Hello World',
    skills: [
      'Installed Lua and checked the version with lua -v',
      'Executed a Lua script from the terminal',
      'Printed a greeting with the print function',
    ],
  },
  'lua-1': {
    title: 'Lua: Values, Types & Variables',
    skills: [
      'Declared local variables holding each of Lua\'s basic value types',
      'Inspected values with type(x) and measured length with the # operator',
      'Concatenated strings and observed implicit number-to-string coercion',
    ],
  },
  'lua-2': {
    title: 'Lua: Control Flow & the Two for Loops',
    skills: [
      'Branched with if/elseif/else and looped with while',
      'Counted with the numeric for loop',
      'Implemented FizzBuzz and summed a numeric range',
    ],
  },
  'lua-3': {
    title: 'Lua: Functions — Multiple Returns & Varargs',
    skills: [
      'Returned multiple values from a single function',
      'Accepted a variable number of arguments with the ... vararg',
      'Wrote a recursive function such as factorial',
    ],
  },
  'lua-4': {
    title: 'Lua: Tables — The One and Only Data Structure',
    skills: [
      'Built array-like lists and key/value maps using tables',
      'Iterated tables with pairs and ipairs',
      'Modeled records as tables of named fields',
    ],
  },
  'lua-5': {
    title: 'Lua: Strings & Lua Patterns',
    skills: [
      'Matched and extracted text with Lua patterns via gmatch',
      'Word-counted a paragraph by iterating pattern matches',
      'Formatted numbers and strings with string.format',
    ],
  },
  'lua-6': {
    title: 'Lua: Closures, First-Class Functions & Scope',
    skills: [
      'Created closures that capture independent upvalues, such as a counter factory',
      'Passed and returned functions as first-class values',
      'Composed functions and wrapped them with a memoize helper',
    ],
  },
  'lua-7': {
    title: 'Lua: Metatables, Metamethods & OOP',
    skills: [
      'Customized table behavior with metatables and metamethods like __add and __tostring',
      'Built classes using __index for method lookup',
      'Defined and called methods using the colon syntax',
    ],
  },
  'lua-8': {
    title: 'Lua: Modules, require & the Standard Library',
    skills: [
      'Authored a module that returns a table of helpers',
      'Loaded modules across files with require',
      'Used standard-library functions to complete a multi-file program',
    ],
  },
  'lua-9': {
    title: 'Lua: Coroutines — Cooperative Multitasking',
    skills: [
      'Created coroutines and drove them with resume and yield',
      'Built a generator with coroutine.wrap, such as a Fibonacci sequence',
      'Implemented a producer/consumer pipeline with cooperative scheduling',
    ],
  },
  'lua-10': {
    title: 'Lua: The C API, Embedding & LuaJIT',
    skills: [
      'Embedded Lua in a C host by creating a lua_State',
      'Ran a script with luaL_dostring and read values back from the stack',
      'Explained Lua performance and the role of LuaJIT',
    ],
  },

  // ── C ───────────────────────────────────────────────────────────────────────
  'c-0': {
    title: 'C: Setup & Hello World',
    skills: [
      'Compiled and ran a hello.c program with gcc or clang',
      'Defined the int main(void) entry point that returns an integer',
      'Produced console output from a C program',
    ],
  },
  'c-1': {
    title: 'C: Types, Variables & printf Formatting',
    skills: [
      'Declared variables of C\'s scalar types',
      'Formatted output with printf conversion specifiers',
      'Printed a Celsius-to-Fahrenheit table with aligned formatting',
    ],
  },
  'c-2': {
    title: 'C: Control Flow & Functions',
    skills: [
      'Branched and looped with if, switch, while, and for',
      'Defined functions with typed parameters and return values',
      'Refactored a divisibility test into a bool helper function',
    ],
  },
  'c-3': {
    title: 'C: Pointers & the Memory Model',
    skills: [
      'Took addresses with & and dereferenced pointers with *',
      'Mutated a caller\'s variables by passing pointers',
      'Explained C\'s memory model of addresses and indirection',
    ],
  },
  'c-4': {
    title: 'C: Arrays, Strings & Pointer Arithmetic',
    skills: [
      'Walked a char array using pointer arithmetic',
      'Worked with null-terminated C strings',
      'Counted words in text by scanning for separators',
    ],
  },
  'c-5': {
    title: 'C: Structs, Unions, Enums & typedef',
    skills: [
      'Defined struct, union, and enum types and named them with typedef',
      'Wrote functions operating on struct values such as a distance computation',
      'Inspected layout with sizeof and offsetof',
    ],
  },
  'c-6': {
    title: 'C: Dynamic Memory — malloc, free & the Heap',
    skills: [
      'Allocated and resized heap memory with malloc and realloc',
      'Released memory with free to avoid leaks',
      'Verified a program had no leaks under valgrind',
    ],
  },
  'c-7': {
    title: 'C: The Preprocessor, Headers & Multi-File Builds',
    skills: [
      'Split code across header and source files with include guards',
      'Used preprocessor directives for macros and conditional compilation',
      'Built a multi-file project with a Makefile',
    ],
  },
  'c-8': {
    title: 'C: File I/O & the Standard Library',
    skills: [
      'Opened and closed files with fopen and fclose',
      'Read input line by line with fgets',
      'Checked and handled I/O errors',
    ],
  },
  'c-9': {
    title: 'C: Undefined Behavior, Debugging & Common Bugs',
    skills: [
      'Diagnosed memory and undefined-behavior bugs with -fsanitize=address,undefined',
      'Recognized and fixed common C pitfalls',
      'Stepped through a program with gdb to locate faults',
    ],
  },
  'c-10': {
    title: 'C: Bit Manipulation, Performance & Systems Foundations',
    skills: [
      'Set, cleared, and toggled flag bits with bitwise operators',
      'Printed binary representations and counted set bits',
      'Inspected compiler output by disassembling a function with -O2 -S',
    ],
  },
};
