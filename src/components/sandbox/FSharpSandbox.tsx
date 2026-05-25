'use client';

/**
 * F# Sandbox — iframe compromise.
 * Embeds the Fable REPL because F# can't run inline in the browser.
 */

import { useState } from 'react';
import type { SandboxProps, RunOutcome } from '@/lib/sandbox/types';
import CodeEditor from './CodeEditor';
import { StatusTag } from '@/components/ui/StatusTag';

type FSharpSandboxProps = Omit<SandboxProps, 'language'>;

export default function FSharpSandbox({ starterCode, onResult }: FSharpSandboxProps) {
  const [marked, setMarked] = useState(false);

  function handleMarkReviewed() {
    setMarked(true);
    const outcome: RunOutcome = { kind: 'pass' };
    onResult?.(outcome);
  }

  return (
    <div className="border font-mono" style={{ borderColor: 'var(--border)' }}>
      <div
        className="flex items-center gap-2 border-b px-3 py-1.5 text-[11px]"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-overlay)' }}
      >
        <span style={{ color: 'var(--accent-fsharp)' }} className="glow-soft">●</span>
        <span style={{ color: 'var(--fg)' }}>fsharp/main.fs</span>
        <span className="flex-1" />
        <span style={{ color: 'var(--fg-dim)' }}>// external REPL</span>
      </div>

      <div
        className="border-b px-3 py-2 text-xs border-l-2"
        style={{
          borderColor: 'var(--border)',
          borderLeftColor: 'var(--accent-warn)',
          color: 'var(--fg-muted)',
          backgroundColor: 'var(--bg-elevated)',
        }}
      >
        <span style={{ color: 'var(--accent-warn)' }}>note:</span> F# runs in the embedded
        Fable REPL. Copy starter code, click <code className="px-1">Run</code>, verify output,
        then <code className="px-1">[ mark reviewed ]</code>.
      </div>

      <div className="border-b" style={{ borderColor: 'var(--border)' }}>
        <p className="px-3 pt-2 pb-1 text-[11px]" style={{ color: 'var(--fg-dim)' }}>
          // starter code — copy into the REPL below
        </p>
        <CodeEditor language="fsharp" value={starterCode} readOnly />
      </div>

      <div
        className="relative"
        style={{ height: '480px', backgroundColor: 'var(--bg-elevated)' }}
      >
        <iframe
          src="https://fable.io/repl/"
          title="F# Fable REPL"
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-forms"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>

      <div
        className="flex items-center justify-between gap-3 border-t px-3 py-2"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-overlay)' }}
      >
        <span className="text-[11px]" style={{ color: 'var(--fg-dim)' }}>
          // manual confirmation
        </span>
        <button
          type="button"
          onClick={handleMarkReviewed}
          disabled={marked}
          className="inline-flex items-center justify-center gap-1.5 font-mono font-semibold text-xs leading-none px-3 py-2 border transition-colors duration-100 disabled:opacity-50 focus-visible:outline-1 focus-visible:outline-offset-2 hover:bg-[var(--accent-fsharp)] hover:text-[var(--bg)]"
          style={{ color: 'var(--accent-fsharp)', borderColor: 'var(--accent-fsharp)' }}
        >
          <span aria-hidden="true" className="opacity-60">[</span>
          {marked ? (
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden="true">✓</span>reviewed
            </span>
          ) : (
            'mark reviewed'
          )}
          <span aria-hidden="true" className="opacity-60">]</span>
        </button>
      </div>

      {marked && (
        <div
          className="px-3 py-2 flex items-center gap-2"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <StatusTag status="pass" />
          <span className="text-xs" style={{ color: 'var(--accent-prompt)' }}>
            marked as reviewed
          </span>
        </div>
      )}
    </div>
  );
}
