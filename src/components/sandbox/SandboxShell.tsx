'use client';

import { useState } from 'react';
import type { RunOutcome, SandboxProps } from '@/lib/sandbox/types';
import CodeEditor from './CodeEditor';
import type { EditorLanguage } from './CodeEditor';

interface SandboxShellProps extends SandboxProps {
  hint?: string;
  /** The actual execution component renders inside this shell via children */
  onRun: (code: string) => Promise<RunOutcome>;
}

const LANGUAGE_LABELS: Record<string, string> = {
  python: 'Python',
  typescript: 'TypeScript',
  rust: 'Rust',
  go: 'Go',
  fsharp: 'F#',
  csharp: 'C#',
};

const LANGUAGE_ACCENT: Record<string, string> = {
  python: 'var(--accent-python)',
  typescript: 'var(--accent-typescript)',
  rust: 'var(--accent-rust)',
  go: 'var(--accent-go)',
  fsharp: 'var(--accent-fsharp)',
  csharp: 'var(--accent-csharp)',
};

function ResultPanel({ outcome }: { outcome: RunOutcome }) {
  if (outcome.kind === 'pending') return null;

  if (outcome.kind === 'pass') {
    return (
      <div className="mt-3 rounded border border-green-700 bg-green-950/40 px-4 py-3 text-sm text-green-400">
        Passed
      </div>
    );
  }

  if (outcome.kind === 'fail') {
    return (
      <div className="mt-3 rounded border border-red-700 bg-red-950/40 px-4 py-3 text-sm text-red-400">
        <p className="font-semibold">Failed</p>
        <p className="mt-1">
          <span className="text-[var(--muted)]">Expected:</span>{' '}
          <code className="font-mono">{outcome.expected}</code>
        </p>
        <p className="mt-0.5">
          <span className="text-[var(--muted)]">Got:</span>{' '}
          <code className="font-mono">{outcome.actual}</code>
        </p>
      </div>
    );
  }

  // error
  return (
    <div className="mt-3 rounded border border-yellow-700 bg-yellow-950/40 px-4 py-3 text-sm text-yellow-400">
      <p className="font-semibold">Runtime error</p>
      <pre className="mt-1 whitespace-pre-wrap font-mono text-xs">{outcome.message}</pre>
    </div>
  );
}

export default function SandboxShell({
  language,
  starterCode,
  hint,
  onRun,
  onResult,
}: SandboxShellProps) {
  const [code, setCode] = useState(starterCode);
  const [outcome, setOutcome] = useState<RunOutcome>({ kind: 'pending' });
  const [running, setRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const accent = LANGUAGE_ACCENT[language] ?? 'var(--accent-typescript)';
  const label = LANGUAGE_LABELS[language] ?? language;

  async function handleRun() {
    setRunning(true);
    setOutcome({ kind: 'pending' });
    try {
      const result = await onRun(code);
      setOutcome(result);
      onResult?.(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const errOutcome: RunOutcome = { kind: 'error', message };
      setOutcome(errOutcome);
      onResult?.(errOutcome);
    } finally {
      setRunning(false);
    }
  }

  function handleReset() {
    setCode(starterCode);
    setOutcome({ kind: 'pending' });
  }

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[#13131a] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-2">
        <span
          className="rounded px-2 py-0.5 text-xs font-semibold"
          style={{ background: accent, color: '#0f0f11' }}
        >
          {label}
        </span>
        <span className="flex-1" />
        <button
          onClick={handleReset}
          className="text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
          title="Reset code"
        >
          Reset
        </button>
        {hint && (
          <button
            onClick={() => setShowHint((v) => !v)}
            className="text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
          >
            {showHint ? 'Hide hint' : 'Hint'}
          </button>
        )}
      </div>

      {/* Hint */}
      {showHint && hint && (
        <div className="border-b border-[var(--border)] bg-[#1a1a2e] px-4 py-3 text-sm text-[var(--muted)]">
          {hint}
        </div>
      )}

      {/* Editor */}
      <div className="px-0 py-0">
        <CodeEditor
          language={language as EditorLanguage}
          value={code}
          onChange={setCode}
        />
      </div>

      {/* Run button */}
      <div className="flex items-center gap-3 border-t border-[var(--border)] px-4 py-3">
        <button
          onClick={handleRun}
          disabled={running}
          className="flex items-center gap-2 rounded px-4 py-1.5 text-sm font-semibold transition-opacity disabled:opacity-50"
          style={{ background: accent, color: '#0f0f11' }}
        >
          {running ? (
            <>
              <span
                className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
                aria-hidden="true"
              />
              Running…
            </>
          ) : (
            'Run'
          )}
        </button>
      </div>

      {/* Result panel */}
      <div className="px-4 pb-4">
        <ResultPanel outcome={outcome} />
      </div>
    </div>
  );
}
