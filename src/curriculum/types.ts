export type Language =
  | 'python'
  | 'csharp'
  | 'typescript'
  | 'rust'
  | 'fsharp'
  | 'go'
  | 'ruby'
  | 'javascript'
  | 'typescript-js'
  | 'java'
  | 'zig'
  | 'lisp'
  | 'lua'
  | 'c'
  | 'cpp'
  | 'tsql'
  | 'postgresql'
  | 'haskell'
  | 'assembly';

export interface Topic {
  label: string;
  url: string;        // https only, opens in new tab
  note?: string;
}

export interface MultipleChoiceCheck {
  kind: 'mcq';
  id: string;                  // unique within phase
  prompt: string;              // markdown allowed
  options: string[];           // 3-4 options
  correctIndex: number;
  explanation: string;         // shown after answer
}

export interface TestCase {
  input?: string;              // optional stdin or parameter
  expectedOutput: string;      // expected output substring in stdout
  description?: string;        // e.g. "Test even numbers"
}

export interface CodeTaskCheck {
  kind: 'code';
  id: string;                  // unique within phase
  prompt: string;              // markdown description of the task
  boilerplate: string;         // prefilled boilerplate code
  expectedOutput: string;      // fallback expected output substring in stdout to pass
  explanation: string;         // shown after code passes validation
  testCases?: TestCase[];      // optional list of test cases
}

export type KnowledgeCheck = MultipleChoiceCheck | CodeTaskCheck;

export interface VideoResource {
  title: string;
  youtubeId: string;    // e.g. "rfscVS0vtbw"
  channelName: string;  // e.g. "freeCodeCamp.org"
  duration?: string;    // e.g. "4 hours"
  isPlaylist?: boolean; // if true, loads a YouTube playlist instead of a video
}

export interface Phase {
  id: string;                  // e.g. 'python-1' through 'python-10'
  language: Language;
  level: number;               // 1..10
  title: string;
  timeEstimate: string;        // e.g. "4-6 hours"
  intro: string;               // 1-2 paragraphs, markdown
  topics: Topic[];             // 3-8 items, each with URL
  video?: VideoResource;       // optional video resource
  deliverable: string;         // concrete project artifact
  checks: KnowledgeCheck[];    // >= 3, at least one CodeTaskCheck
}

/**
 * How a language's code checks are executed inside the in-browser sandbox.
 *  - 'python'   : run as-is on Pyodide (CPython WASM).
 *  - 'js'       : transpiled to JavaScript (regex transpiler in lib/runner.ts)
 *                 and run via Function() in the sandbox iframe.
 *  - 'sql'      : run on sql.js (SQLite WASM) — used by the SQL dialect courses.
 *  - 'asm'      : run on the educational register-VM interpreter (lib/runner.ts).
 */
export type SandboxRuntime = 'python' | 'js' | 'sql' | 'asm';

export interface LanguageMeta {
  id: Language;
  name: string;                // 'Python'
  accentVar: string;           // CSS var name, e.g. '--accent-python'
  defaultStartLevel: number;
  blurb: string;               // 1-sentence pitch
  /** Short canonical glyph rendered in the hero / pills, e.g. 'c++', 'c#', 'rb'. */
  symbol: string;
  /** Source-file name shown in the code editor toolbar, e.g. 'main.rb'. */
  fileName: string;
  /** simple-icons slug used by shields.io badges; '' when no logo exists. */
  shieldsLogo: string;
  /** Accent colour hex WITHOUT the leading '#', mirrors --accent-<id> in globals.css. */
  hexColor: string;
  /** Sandbox runtime used to execute this language's code checks. */
  runtime: SandboxRuntime;
}

export const LANGUAGES: LanguageMeta[] = [
  { id: 'python', name: 'Python', accentVar: '--accent-python', defaultStartLevel: 2, blurb: 'Readable, batteries-included, the lingua franca of data and scripting.', symbol: 'py', fileName: 'main.py', shieldsLogo: 'python', hexColor: 'f0c674', runtime: 'python' },
  { id: 'csharp', name: 'C#', accentVar: '--accent-csharp', defaultStartLevel: 3, blurb: 'Pragmatic, modern, runs on .NET — for backends, games, and desktop.', symbol: 'c#', fileName: 'Program.cs', shieldsLogo: 'c-sharp', hexColor: 'b294bb', runtime: 'js' },
  { id: 'typescript', name: 'TypeScript', accentVar: '--accent-typescript', defaultStartLevel: 1, blurb: 'JavaScript with types — the foundation of modern web and tooling.', symbol: 'ts', fileName: 'solution.ts', shieldsLogo: 'typescript', hexColor: '81a2be', runtime: 'js' },
  { id: 'rust', name: 'Rust', accentVar: '--accent-rust', defaultStartLevel: 0, blurb: 'Memory safety without GC — systems programming reimagined.', symbol: 'rs', fileName: 'main.rs', shieldsLogo: 'rust', hexColor: 'de935f', runtime: 'js' },
  { id: 'fsharp', name: 'F#', accentVar: '--accent-fsharp', defaultStartLevel: 0, blurb: 'Functional-first on .NET — practical, type-safe, beautiful.', symbol: 'f#', fileName: 'Program.fs', shieldsLogo: 'fsharp', hexColor: '8abeb7', runtime: 'js' },
  { id: 'go', name: 'Go', accentVar: '--accent-go', defaultStartLevel: 0, blurb: 'Simple, fast, concurrent — the language of cloud infrastructure.', symbol: 'go', fileName: 'main.go', shieldsLogo: 'go', hexColor: '5fb3b3', runtime: 'js' },
  { id: 'ruby', name: 'Ruby', accentVar: '--accent-ruby', defaultStartLevel: 0, blurb: 'Optimised for developer happiness — elegant, expressive, object-everything.', symbol: 'rb', fileName: 'main.rb', shieldsLogo: 'ruby', hexColor: 'cc6b78', runtime: 'js' },
  { id: 'javascript', name: 'JavaScript', accentVar: '--accent-javascript', defaultStartLevel: 0, blurb: "The language of the web — runs everywhere, from browsers to servers.", symbol: 'js', fileName: 'main.js', shieldsLogo: 'javascript', hexColor: 'e0c46c', runtime: 'js' },
  { id: 'typescript-js', name: 'TypeScript for JS Devs', accentVar: '--accent-typescript-js', defaultStartLevel: 2, blurb: 'Add a type system to the JavaScript you already know — narrowing, generics, and inference.', symbol: 'ts+', fileName: 'solution.ts', shieldsLogo: 'typescript', hexColor: '6cb0e0', runtime: 'js' },
  { id: 'java', name: 'Java', accentVar: '--accent-java', defaultStartLevel: 0, blurb: 'Write once, run anywhere — the JVM workhorse of enterprise and Android.', symbol: 'jv', fileName: 'Main.java', shieldsLogo: 'openjdk', hexColor: 'd99e63', runtime: 'js' },
  { id: 'zig', name: 'Zig', accentVar: '--accent-zig', defaultStartLevel: 0, blurb: 'A modern systems language — no hidden control flow, no hidden allocations.', symbol: 'zig', fileName: 'main.zig', shieldsLogo: 'zig', hexColor: 'e8a849', runtime: 'js' },
  { id: 'lisp', name: 'Lisp', accentVar: '--accent-lisp', defaultStartLevel: 0, blurb: 'Code is data — the homoiconic language that invented half of computing.', symbol: 'λ', fileName: 'main.lisp', shieldsLogo: '', hexColor: 'b59ad6', runtime: 'js' },
  { id: 'lua', name: 'Lua', accentVar: '--accent-lua', defaultStartLevel: 0, blurb: 'Tiny, fast, embeddable — the scripting glue of games and config.', symbol: 'lua', fileName: 'main.lua', shieldsLogo: 'lua', hexColor: '7f9fd6', runtime: 'js' },
  { id: 'c', name: 'C', accentVar: '--accent-c', defaultStartLevel: 0, blurb: 'Close to the metal — the portable assembly that runs the world.', symbol: 'c', fileName: 'main.c', shieldsLogo: 'c', hexColor: '8fb3d9', runtime: 'js' },
  { id: 'cpp', name: 'C++', accentVar: '--accent-cpp', defaultStartLevel: 0, blurb: 'Zero-overhead abstractions — systems power with high-level expressiveness.', symbol: 'c++', fileName: 'main.cpp', shieldsLogo: 'cplusplus', hexColor: '95b8e0', runtime: 'js' },
  { id: 'tsql', name: 'T-SQL', accentVar: '--accent-tsql', defaultStartLevel: 0, blurb: "Microsoft SQL Server's dialect — procedural querying for the enterprise.", symbol: 't-sql', fileName: 'query.sql', shieldsLogo: 'microsoftsqlserver', hexColor: 'd4a85a', runtime: 'sql' },
  { id: 'postgresql', name: 'PostgreSQL', accentVar: '--accent-postgresql', defaultStartLevel: 0, blurb: "The world's most advanced open-source relational database and its SQL.", symbol: 'pg', fileName: 'query.sql', shieldsLogo: 'postgresql', hexColor: '6c9bd0', runtime: 'sql' },
  { id: 'haskell', name: 'Haskell', accentVar: '--accent-haskell', defaultStartLevel: 0, blurb: 'Purely functional, lazy, and ruthlessly type-safe — thinking made formal.', symbol: 'λ>', fileName: 'Main.hs', shieldsLogo: 'haskell', hexColor: 'c79ad6', runtime: 'js' },
  { id: 'assembly', name: 'Assembly', accentVar: '--accent-assembly', defaultStartLevel: 0, blurb: 'The raw instruction stream — registers, the stack, and the bare CPU.', symbol: 'asm', fileName: 'main.asm', shieldsLogo: '', hexColor: 'b0b6bd', runtime: 'asm' },
];

/** Convenience lookup by id. */
export function getLanguageMeta(id: Language): LanguageMeta | undefined {
  return LANGUAGES.find((l) => l.id === id);
}
