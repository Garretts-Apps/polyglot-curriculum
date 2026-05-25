'use client';

import { useState } from 'react';
import type { RunOutcome, SandboxProps } from '@/lib/sandbox/types';
import CodeEditor from './CodeEditor';
import type { EditorLanguage } from './CodeEditor';
import { StatusTag } from '@/components/ui/StatusTag';
import { TerminalCursor } from '@/components/ui/TerminalCursor';

interface SandboxShellProps extends SandboxProps {
  hint?: string;
  onRun: (code: string) => Promise<RunOutcome>;
}

const LANGUAGE_FILE_EXT: Record<string, string> = {
  python: 'py',
  typescript: 'ts',
  rust: 'rs',
  go: 'go',
  fsharp: 'fs',
  csharp: 'cs',
};

const LANGUAGE_CMD: Record<string, string> = {
  python: 'python',
  typescript: 'tsx',
  rust: 'cargo run',
  go: 'go run',
  fsharp: 'dotnet fsi',
  csharp: 'dotnet run',
};

const LANGUAGE_ACCENT: Record<string, string> = {
  python: 'var(--accent-python)',
  typescript: 'var(--accent-typescript)',
  rust: 'var(--accent-rust)',
  go: 'var(--accent-go)',
  fsharp: 'var(--accent-fsharp)',
  csharp: 'var(--accent-csharp)',
};

function ResultPanel({ outcome, language }: { outcome: RunOutcome; language: string }) {
  if (outcome.kind === 'pending') return null;
  const ext = LANGUAGE_FILE_EXT[language] ?? 'txt';
  const cmd = LANGUAGE_CMD[language] ?? language;

  if (outcome.kind === 'pass') {
    return (
      <pre
        className="font-mono text-xs leading-relaxed p-3 mt-3 whitespace-pre-wrap"
        style={{
          background: 'var(--bg)',
          border: '1px solid var(--accent-prompt)',
          borderLeft: '2px solid var(--accent-prompt)',
          color: 'var(--fg)',
        }}
      >
        <div>
          <span style={{ color: 'var(--accent-prompt)' }}>$</span>{' '}
          <span style={{ color: 'var(--fg)' }}>{cmd} main.{ext}</span>
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <StatusTag status="pass" />
          <span style={{ color: 'var(--accent-prompt)' }}>all assertions passed</span>
        </div>
      </pre>
    );
  }

  if (outcome.kind === 'fail') {
    return (
      <pre
        className="font-mono text-xs leading-relaxed p-3 mt-3 whitespace-pre-wrap"
        style={{
          background: 'var(--bg)',
          border: '1px solid var(--accent-error)',
          borderLeft: '2px solid var(--accent-error)',
          color: 'var(--fg)',
        }}
      >
        <div>
          <span style={{ color: 'var(--accent-prompt)' }}>$</span>{' '}
          <span style={{ color: 'var(--fg)' }}>{cmd} main.{ext}</span>
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <StatusTag status="fail" />
          <span style={{ color: 'var(--accent-error)' }}>assertion failed</span>
        </div>
        <div className="mt-1.5">
          <span style={{ color: 'var(--fg-muted)' }}>expected: </span>
          <span style={{ color: 'var(--accent-prompt)' }}>{outcome.expected}</span>
        </div>
        <div>
          <span style={{ color: 'var(--fg-muted)' }}>actual:   </span>
          <span style={{ color: 'var(--accent-error)' }}>{outcome.actual}</span>
        </div>
      </pre>
    );
  }

  return (
    <pre
      className="font-mono text-xs leading-relaxed p-3 mt-3 whitespace-pre-wrap"
      style={{
        background: 'var(--bg)',
        border: '1px solid var(--accent-warn)',
        borderLeft: '2px solid var(--accent-warn)',
        color: 'var(--fg)',
      }}
    >
      <div>
        <span style={{ color: 'var(--accent-prompt)' }}>$</span>{' '}
        <span style={{ color: 'var(--fg)' }}>{cmd} main.{ext}</span>
      </div>
      <div className="mt-1.5 flex items-center gap-2">
        <StatusTag status="fail" />
        <span style={{ color: 'var(--accent-warn)' }}>runtime error</span>
      </div>
      <div className="mt-1.5" style={{ color: 'var(--accent-error)' }}>
        {outcome.message}
      </div>
    </pre>
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
  const ext = LANGUAGE_FILE_EXT[language] ?? 'txt';

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
    <div className="border font-mono" style={{ borderColor: 'var(--border)' }}>
      <div
        className="flex items-center justify-between border-b px-3 py-1.5"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-overlay)' }}
      >
        <div className="flex items-center gap-2 text-[11px]">
          <span style={{ color: accent }} className="glow-soft">●</span>
          <span style={{ color: 'var(--fg)' }}>
            {language}/main.{ext}
          </span>
          {running && (
            <span
              className="inline-flex items-center gap-1"
              style={{ color: 'var(--accent-warn)' }}
            >
              <span className="text-[10px]">~ running</span>
              <TerminalCursor thin color="var(--accent-warn)" />
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleReset}
            className="text-[11px] px-2 py-1 border transition-colors duration-100 hover:text-[var(--accent-prompt)] hover:border-[var(--accent-prompt)]"
            style={{ color: 'var(--fg-muted)', borderColor: 'var(--border)' }}
            title="Reset code"
          >
            :reset
          </button>
          {hint && (
            <button
              type="button"
              onClick={() => setShowHint((v) => !v)}
              className="text-[11px] px-2 py-1 border transition-colors duration-100 hover:text-[var(--accent-warn)] hover:border-[var(--accent-warn)]"
              style={{ color: 'var(--fg-muted)', borderColor: 'var(--border)' }}
            >
              {showHint ? ':hide-hint' : ':hint'}
            </button>
          )}
        </div>
      </div>

      {showHint && hint && (
        <div
          className="border-b px-3 py-2 text-xs border-l-2"
          style={{
            borderColor: 'var(--border)',
            borderLeftColor: 'var(--accent-warn)',
            color: 'var(--fg-muted)',
            backgroundColor: 'var(--bg-elevated)',
          }}
        >
          <span style={{ color: 'var(--accent-warn)' }}>hint:</span> {hint}
        </div>
      )}

      <div>
        <CodeEditor language={language as EditorLanguage} value={code} onChange={setCode} />
      </div>

      <div
        className="flex items-center justify-between gap-3 border-t px-3 py-2"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-overlay)' }}
      >
        <span className="text-[11px]" style={{ color: 'var(--fg-dim)' }}>
          press <span style={{ color: 'var(--accent-prompt)' }}>[ run ]</span> to execute
        </span>
        <button
          type="button"
          onClick={handleRun}
          disabled={running}
          className={[
            'inline-flex items-center justify-center gap-1.5',
            'font-mono font-semibold text-xs leading-none px-3 py-2 border',
            'transition-colors duration-100',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'focus-visible:outline-1 focus-visible:outline-offset-2',
          ].join(' ')}
          style={{
            color: running ? 'var(--accent-warn)' : 'var(--accent-prompt)',
            borderColor: running ? 'var(--accent-warn)' : 'var(--accent-prompt)',
          }}
        >
          <span aria-hidden="true" className="opacity-60">[</span>
          {running ? (
            <span className="inline-flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 animate-spin"
                style={{
                  border: '1.5px solid currentColor',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                }}
                aria-hidden="true"
              />
              running…
            </span>
          ) : (
            <span>▶ run</span>
          )}
          <span aria-hidden="true" className="opacity-60">]</span>
        </button>
      </div>

      <div className="px-3 pb-3 pt-0">
        <div role="status" aria-live="polite" aria-atomic="true">
          <ResultPanel outcome={outcome} language={language} />
        </div>
      </div>
    </div>
  );
}
