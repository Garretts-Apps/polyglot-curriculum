# Curriculum authoring spec (read fully before writing)

You are authoring ONE language course for the Polyglot Curriculum — a
self-study tracker. Your output must match the depth and quality of the
existing courses. **Before writing, read these for reference:**

1. `src/curriculum/types.ts` — the exact TypeScript schema you must satisfy.
2. `src/curriculum/go.ts` (levels 0–3) — the QUALITY BAR for tone, depth, intro
   length, topic notes, MCQ distractor quality, and explanation richness.
   Also skim `src/curriculum/python.ts` for scenario-style MCQs.
3. The transpiler for YOUR language in `src/lib/runner.ts` (see the
   per-language constraints below) — your code checks MUST run through it.
4. `scripts/validate-checks.mjs` — the validator you will run.

## File to produce

Write `src/curriculum/<LANG>.ts` exporting `export const <CAMEL>Phases: Phase[]`.
(Replace the existing stub file completely.) Import the type:
`import type { Phase } from './types';`

## Structure — 11 phases, levels 0 through 10

Mirror the existing courses exactly:

- **Level 0** — "Setup & Hello World": ~0.5–1 hours. Install/toolchain + first
  program. 3 checks (1 code hello-world + 2 MCQ).
- **Levels 1–10** — progressive depth, ~4–8 hours each. Each phase:
  - `id`: `"<LANG>-<level>"` (e.g. `"ruby-0"` … `"ruby-10"`). `language: "<LANG>"`.
  - `title`: concrete, e.g. "Ruby Basics — Objects, Blocks & Symbols".
  - `timeEstimate`: e.g. `"4-6 hours"`.
  - `intro`: 1–2 rich paragraphs (markdown, backticks for code). Tell the
    learner what they'll be able to DO by the end + a concrete local exercise.
  - `topics`: 4–8 items, each `{ label, url, note }`. **URLs must be real,
    canonical, https** (official docs, language reference, well-known guides).
    Do NOT invent URLs — use ones you are confident exist.
  - `video` (optional but include on most phases): a real YouTube resource
    `{ title, youtubeId, channelName, duration }`. Only use youtubeIds you are
    confident are correct; if unsure, OMIT the video entirely (never guess an id).
  - `deliverable`: a concrete project artifact sentence.
  - `checks`: **4–6 per phase**, at least 1 `code` and at least 2 `mcq`.

### MCQ checks
`{ kind:'mcq', id, prompt, options:[3–4], correctIndex, explanation }`
- `id`: `"<LANG>-<level>-mcq-<n>"`, unique within the phase.
- Distractors must be plausible (common misconceptions), not obviously wrong.
- `explanation`: 2–4 sentences, teach WHY; cite a doc inline where natural.
- Use markdown + fenced code blocks in prompts for "what does this print?" style.

### Code checks
`{ kind:'code', id, prompt, boilerplate, expectedOutput, explanation, testCases? }`
- `id`: `"<LANG>-<level>-code-<n>"`.
- `boilerplate`: a COMPLETE, runnable program in your language. The learner
  edits/runs it. It must compile-and-print under the transpiler constraints
  below — write print-based programs.
- `expectedOutput`: a substring that appears in stdout when the boilerplate is
  run. Matching is case-insensitive substring. Keep it a stable, distinctive
  line (e.g. `"Hello, World!"` or `"sum=42"`).
- Optional `testCases: [{ input?, expectedOutput, description }]`. `input` is
  appended as extra source after the boilerplate (use to call a function with
  args). Each test's expectedOutput must appear in that run's stdout.
- `explanation`: what the code demonstrates + the key concept.

## HARD CONSTRAINT — code checks must execute

Your `code` checks run through a regex transpiler to JavaScript (or SQLite/VM)
and execute in a sandbox. **They are mechanically validated.** Keep code
tasks PRINT-BASED and within the supported subset (below). Anything fancier
should be taught via an MCQ ("what does this print?", "which is correct?")
rather than a runnable code task. This is exactly how the existing Go/Rust/C#
courses work — lean on MCQs for advanced topics.

After writing, RUN:  `node scripts/validate-checks.mjs <LANG>`
Fix every failure until it prints "All validations passed." Then stop.

## Quality rules
- Technical accuracy is paramount. Every fact, output, and API must be correct.
- No invented URLs or YouTube ids.
- Vary check types; make explanations genuinely educational.
- Match the existing courses' professional, concise, slightly-opinionated tone.
- Do NOT add a badges entry (handled separately). Only write the curriculum file.

## Per-language transpiler constraints (CRITICAL for code checks)

Find YOUR language's section. The transpiler is a regex translator to JS — it
handles SIMPLE print-based programs only. Stay inside the supported subset.

### ruby
- Output: `puts ...` / `print ...` / `p ...` → console.log. `"...#{expr}..."`
  interpolation works (double quotes only). String concat with `+`.
- `def name(args) ... end` and `def name ... end` → functions. `end` closes blocks.
- `n.times do |i| ... end` and `(a..b).each do |i| ... end` loops supported.
- AVOID: classes, modules, requires, hashes/symbols as runnable output, `case/when`.
  Teach those via MCQ. Keep runnable code to defs + puts + simple loops/arithmetic.

### javascript
- Native JS — runs as-is via Function(). Use `console.log`. Full ES2020 is fine
  (let/const, arrow fns, template literals, array methods, classes, etc.).
- This is the "JavaScript" course (no types). Keep examples idiomatic modern JS.

### typescript-js  (NOTE: code execution is NOT auto-validated for this language)
- Compiled by the in-browser TypeScript compiler; the Node validator SKIPS
  execution. Still write correct, runnable TS boilerplate (it transpiles to JS
  and runs in the app). Use `console.log`. Assume an audience that already
  knows JavaScript — focus every phase on the TYPE SYSTEM (annotations,
  interfaces, unions, narrowing, generics, utility types, etc.).

### java
- Output: `System.out.println(...)` / `System.out.print(...)` → console.log;
  `System.out.printf("%d %s", a, b)` supported (`%d %s %f`). String `+` concat.
- `public class Main { public static void main(String[] args) { ... } }` scaffold
  is stripped; `main()` auto-runs. Typed method decls `static int add(int a,int b)`
  → functions. Typed locals `int x = 5;` → `let`. `for (int i=0; ...)` works.
- AVOID: imports/collections/generics/streams as runnable code → use MCQ.

### zig
- Output: `std.debug.print("fmt {d}\n", .{args})` with `{}`/`{s}`/`{d}` placeholders
  → console.log (no implicit newline; include `\n` yourself if needed, but
  expectedOutput matching ignores trailing newline). `const std = @import("std");`
  is stripped.
- `pub fn name(args) ret { }` and `fn` → functions. `const/var x: T = v` → `let`.
  `while (cond) { }` works.
- AVOID: comptime, allocators, error unions as runnable code → MCQ.

### lua
- Output: `print(...)` → console.log. String concat `..` → `+`. `~=` → `!==`.
- `local x = v`, `local function f(a,b) ... end`, `function f() ... end`,
  `for i = a, b do ... end` (also `for i=a,b,step do`), `while cond do ... end`,
  `if cond then ... elseif ... else ... end` all supported. `end` closes blocks.
- AVOID: tables-as-output, metatables, pcall → MCQ.

### lisp  (Common Lisp subset)
- Output ONLY via `(format t "...~a...~%" args)` (`~a`/`~d` placeholders, `~%`
  newline) and `(print expr)` / `(princ expr)`. Arithmetic `(+ a b)` `(- ...)`
  `(* ...)` `(/ ...)` supported inside print/format args.
- This is a NARROW subset. Keep runnable code to format/print of literals and
  simple arithmetic. Teach defun/let/recursion/macros/lists via MCQ ("what does
  this print?" with the code in the prompt).

### c
- Output: `printf("%d\n", x)` (`%d %s %f`), `puts("...")` → console.log.
  `#include` and `#define NAME val` handled. `int main(void){...return 0;}` →
  main(). Typed fn decls `int add(int a,int b){}` → functions. Typed locals
  `int x=5;` → `let`. `for(int i=0;...)` works.
- AVOID: pointers/arrays/structs/malloc as runnable output → MCQ. Arithmetic and
  function calls with printf are fine.

### cpp
- Output: `std::cout << a << " " << b << std::endl;` (or `using namespace std;`
  then `cout`) → console.log; also `printf(...)`. `#include` stripped.
  `int main(){...}` → main(). Typed fns/locals like C. `for(int i=0;...)`.
- AVOID: templates/STL containers/classes as runnable output → MCQ. Keep cout
  chains of literals/variables/arithmetic.

### haskell  (narrow subset)
- Output via `main = do` block lines: `putStrLn "..."`, `print expr`. `let x = v`
  inside do. `++` string concat. `show x`. Top-level `name = expr` bindings.
- VERY narrow. Keep runnable code to a `main = do` that putStrLn/print literals,
  simple arithmetic, and let-bound values. Teach types/typeclasses/laziness/
  pattern-matching/recursion via MCQ with code in the prompt.
- The `main :: IO ()` signature line is fine (ignored).

### assembly  (NASM-ish, runs on an educational register VM)
- Registers: rax rbx rcx rdx rsi rdi (eax/ebx/ecx/edx alias the r-versions).
- Instructions: `mov dst, src`, `add`, `sub`, `mul`/`imul`, `inc`, `dec`,
  `cmp a, b`, jumps `jmp/je/jz/jne/jnz/jg/jl/jge/jle <label>`, `push`/`pop`,
  `ret`/`hlt`. Labels are `name:` on their own line. `;` starts a comment.
- Output ONLY via the pseudo-ops `print <reg|imm>` or `print "literal"`
  (and `out`). e.g. `mov rax, 5` / `add rax, 3` / `print rax` → prints 8.
- expectedOutput is the printed register value or literal. Teach real-ISA
  detail (calling conventions, addressing modes, syscalls) via MCQ; keep
  runnable code to this VM subset.

### tsql  (NOTE: runs on SQLite via sql.js; execution NOT auto-validated in Node)
- Code checks execute as SQLite SQL in the browser. Output is the result set
  rendered as a text table (column headers + ` | ` separated rows).
- Write PORTABLE SQL for runnable checks: `SELECT`, `CREATE TABLE`, `INSERT`,
  `WHERE`, `JOIN`, `GROUP BY`, `ORDER BY`, CTEs (`WITH`), subqueries — these run
  on SQLite. `expectedOutput` = a value/header that appears in the rendered table
  (e.g. a column alias or a cell value). A self-contained check should CREATE +
  INSERT + SELECT so it returns rows.
- Teach T-SQL-SPECIFIC syntax (`DECLARE @v`, `PRINT`, `TOP`, `IDENTITY`,
  `ISNULL`, `IIF`, `TRY...CATCH`, window fns with `OVER`, stored procs) via MCQ,
  since SQLite won't run all of it. Make the course genuinely about T-SQL/SQL
  Server even though runnable checks use the portable subset.

### postgresql  (NOTE: runs on SQLite via sql.js; execution NOT auto-validated in Node)
- Same execution model as tsql (portable SQLite subset for runnable checks).
- Teach PostgreSQL-SPECIFIC features (`SERIAL`/`GENERATED`, `RETURNING`, arrays,
  `jsonb`, `ILIKE`, `DISTINCT ON`, `generate_series`, CTEs, window functions,
  `plpgsql` functions, `EXPLAIN ANALYZE`) via MCQ. Runnable checks use portable
  SELECT/CREATE/INSERT that SQLite accepts.
