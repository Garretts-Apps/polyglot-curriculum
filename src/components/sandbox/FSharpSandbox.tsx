'use client';

/**
 * F# Sandbox — iframe compromise.
 *
 * F# cannot be executed inline in the browser without a large custom toolchain.
 * We embed the Fable REPL (https://fable.io/repl/) in an iframe.
 *
 * LIMITATION: cross-origin restrictions prevent reading the REPL's output
 * programmatically. The user must run their code in the embedded REPL and
 * manually confirm success by clicking "Mark as Reviewed".
 *
 * The starter code is shown in a read-only CodeMirror editor so the user can
 * copy it into the REPL.
 */

import { useState } from 'react';
import type { SandboxProps, RunOutcome } from '@/lib/sandbox/types';
import CodeEditor from './CodeEditor';

type FSharpSandboxProps = Omit<SandboxProps, 'language'>;

export default function FSharpSandbox({
  starterCode,
  onResult,
}: FSharpSandboxProps) {
  const [marked, setMarked] = useState(false);

  function handleMarkReviewed() {
    setMarked(true);
    const outcome: RunOutcome = { kind: 'pass' };
    onResult?.(outcome);
  }

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[#13131a] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-2">
        <span
          className="rounded px-2 py-0.5 text-xs font-semibold"
          style={{ background: 'var(--accent-fsharp)', color: '#0f0f11' }}
        >
          F#
        </span>
        <span className="flex-1" />
        <span className="text-xs text-[var(--muted)]">External REPL</span>
      </div>

      {/* Notice */}
      <div className="border-b border-[var(--border)] bg-[#1a1a2e] px-4 py-3 text-sm text-[var(--muted)]">
        <strong className="text-[var(--fg)]">Note:</strong> F# runs in the embedded Fable REPL
        below. Copy your starter code into the REPL editor, click{' '}
        <strong className="text-[var(--fg)]">Run</strong>, and verify the output visually. Then
        click <strong className="text-[var(--fg)]">Mark as Reviewed</strong> to proceed.
      </div>

      {/* Starter code (read-only, for copying) */}
      <div className="border-b border-[var(--border)]">
        <div className="px-4 pt-2 pb-1 text-xs text-[var(--muted)]">Starter code (copy into REPL):</div>
        <CodeEditor language="fsharp" value={starterCode} readOnly />
      </div>

      {/* Embedded REPL iframe */}
      <div className="relative" style={{ height: '480px' }}>
        <iframe
          src="https://fable.io/repl/"
          title="F# Fable REPL"
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-forms"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>

      {/* Mark as Reviewed */}
      <div className="flex items-center gap-3 border-t border-[var(--border)] px-4 py-3">
        <button
          onClick={handleMarkReviewed}
          disabled={marked}
          className="rounded px-4 py-1.5 text-sm font-semibold transition-opacity disabled:opacity-50"
          style={{ background: 'var(--accent-fsharp)', color: '#0f0f11' }}
        >
          {marked ? 'Reviewed' : 'Mark as Reviewed'}
        </button>
        {marked && (
          <span className="text-sm text-green-400">Marked as reviewed</span>
        )}
      </div>
    </div>
  );
}
