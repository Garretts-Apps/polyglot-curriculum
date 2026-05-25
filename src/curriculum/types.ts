export type Language = 'python' | 'csharp' | 'typescript' | 'rust' | 'fsharp' | 'go';

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

export interface CodeTaskCheck {
  kind: 'code';
  id: string;
  prompt: string;              // what to implement
  starterCode: string;
  // Either match expected stdout exactly, OR run assertions in the sandbox after user code
  expectedOutput?: string;     // for stdout match (preferred for clarity)
  assertions?: string;         // appended after user code; should throw if fail
  hint?: string;
}

export type KnowledgeCheck = MultipleChoiceCheck | CodeTaskCheck;

export interface Phase {
  id: string;                  // e.g. 'python-1' through 'python-10'
  language: Language;
  level: number;               // 1..10
  title: string;
  timeEstimate: string;        // e.g. "4-6 hours"
  intro: string;               // 1-2 paragraphs, markdown
  topics: Topic[];             // 3-8 items, each with URL
  deliverable: string;         // concrete project artifact
  checks: KnowledgeCheck[];    // >= 3, at least one CodeTaskCheck
}

export interface LanguageMeta {
  id: Language;
  name: string;                // 'Python'
  accentVar: string;           // CSS var name, e.g. '--accent-python'
  sandboxKind: 'pyodide' | 'js-vm' | 'iframe-rust' | 'iframe-go' | 'iframe-fsharp' | 'iframe-csharp';
  defaultStartLevel: number;
  blurb: string;               // 1-sentence pitch
}

export const LANGUAGES: LanguageMeta[] = [
  { id: 'python', name: 'Python', accentVar: '--accent-python', sandboxKind: 'pyodide', defaultStartLevel: 2, blurb: 'Readable, batteries-included, the lingua franca of data and scripting.' },
  { id: 'csharp', name: 'C#', accentVar: '--accent-csharp', sandboxKind: 'iframe-csharp', defaultStartLevel: 3, blurb: 'Pragmatic, modern, runs on .NET — for backends, games, and desktop.' },
  { id: 'typescript', name: 'TypeScript', accentVar: '--accent-typescript', sandboxKind: 'js-vm', defaultStartLevel: 1, blurb: 'JavaScript with types — the foundation of modern web and tooling.' },
  { id: 'rust', name: 'Rust', accentVar: '--accent-rust', sandboxKind: 'iframe-rust', defaultStartLevel: 0, blurb: 'Memory safety without GC — systems programming reimagined.' },
  { id: 'fsharp', name: 'F#', accentVar: '--accent-fsharp', sandboxKind: 'iframe-fsharp', defaultStartLevel: 0, blurb: 'Functional-first on .NET — practical, type-safe, beautiful.' },
  { id: 'go', name: 'Go', accentVar: '--accent-go', sandboxKind: 'iframe-go', defaultStartLevel: 0, blurb: 'Simple, fast, concurrent — the language of cloud infrastructure.' },
];
