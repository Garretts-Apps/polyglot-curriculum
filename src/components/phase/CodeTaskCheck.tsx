'use client';

import dynamic from 'next/dynamic';
import type { CodeTaskCheck as CodeTaskType } from '@/curriculum/types';
import type { Language } from '@/curriculum/types';
import type { RunOutcome } from '@/lib/sandbox/types';
import { Markdown } from '@/components/ui/Markdown';

const sandboxComponents: Record<
  Language,
  React.ComponentType<{
    starterCode: string;
    expectedOutput?: string;
    assertions?: string;
    onResult?: (outcome: RunOutcome) => void;
  }>
> = {
  python: dynamic(() => import('@/components/sandbox/PythonSandbox'), { ssr: false }),
  typescript: dynamic(() => import('@/components/sandbox/JsSandbox'), { ssr: false }),
  rust: dynamic(() => import('@/components/sandbox/RustSandbox'), { ssr: false }),
  go: dynamic(() => import('@/components/sandbox/GoSandbox'), { ssr: false }),
  fsharp: dynamic(() => import('@/components/sandbox/FSharpSandbox'), { ssr: false }),
  csharp: dynamic(() => import('@/components/sandbox/CSharpSandbox'), { ssr: false }),
};

interface CodeTaskCheckProps {
  check: CodeTaskType;
  language: Language;
  checkResult?: { status: 'pass' | 'fail' | 'pending' };
  onResult: (checkId: string, status: 'pass' | 'fail') => void;
}

export function CodeTaskCheck({ check, language, onResult }: CodeTaskCheckProps) {
  const SandboxComponent = sandboxComponents[language];

  function handleResult(outcome: RunOutcome) {
    if (outcome.kind === 'pass') {
      onResult(check.id, 'pass');
    } else if (outcome.kind === 'fail' || outcome.kind === 'error') {
      onResult(check.id, 'fail');
    }
  }

  return (
    <div
      className="border border-t-0 font-mono"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-elevated)' }}
    >
      {/* Prompt — Task: <markdown> */}
      <div
        className="px-4 py-3 border-b grid items-start gap-2"
        style={{ borderColor: 'var(--border)', gridTemplateColumns: 'auto 1fr' }}
      >
        <span
          className="text-sm font-semibold leading-snug pt-px"
          style={{ color: 'var(--accent-warn)' }}
          aria-hidden="true"
        >
          ::
        </span>
        <div className="min-w-0">
          <Markdown content={check.prompt} className="prose-terminal" />
        </div>
      </div>

      {/* Hint — collapsible */}
      {check.hint && (
        <details
          className="border-b hint-details"
          style={{ borderColor: 'var(--border)' }}
        >
          <summary
            className="cursor-pointer text-xs select-none px-4 py-2 inline-flex items-center gap-2 transition-colors duration-100 hover:bg-[var(--bg-overlay)] w-full"
            style={{ color: 'var(--accent-warn)' }}
          >
            <span
              aria-hidden="true"
              className="font-mono text-xs hint-glyph"
              style={{ color: 'var(--fg-dim)' }}
            >
              ▶
            </span>
            <span>hint</span>
            <span style={{ color: 'var(--fg-dim)' }} className="text-[10px]">
              // toggle to reveal
            </span>
          </summary>
          <div
            className="px-4 pb-3 pt-1 border-l-2 mx-3 mb-3 text-sm leading-snug"
            style={{ borderLeftColor: 'var(--accent-warn)', color: 'var(--fg-muted)' }}
          >
            <span
              style={{ color: 'var(--accent-warn)' }}
              className="mr-1"
              aria-hidden="true"
            >
              ?
            </span>
            {check.hint}
          </div>
        </details>
      )}

      {/* Sandbox region — has its own internal chrome */}
      <div className="p-3">
        <SandboxComponent
          starterCode={check.starterCode}
          expectedOutput={check.expectedOutput}
          assertions={check.assertions}
          onResult={handleResult}
        />
      </div>
    </div>
  );
}
