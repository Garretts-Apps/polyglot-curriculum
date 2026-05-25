'use client';

import dynamic from 'next/dynamic';
import type { CodeTaskCheck as CodeTaskType } from '@/curriculum/types';
import type { Language } from '@/curriculum/types';
import type { RunOutcome } from '@/lib/sandbox/types';
import { Markdown } from '@/components/ui/Markdown';

const sandboxComponents: Record<Language, React.ComponentType<{
  starterCode: string;
  expectedOutput?: string;
  assertions?: string;
  onResult?: (outcome: RunOutcome) => void;
}>> = {
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
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5">
      <div className="mb-4">
        <Markdown content={check.prompt} />
      </div>

      {check.hint && (
        <details className="mb-4">
          <summary
            className="cursor-pointer text-sm select-none"
            style={{ color: 'var(--fg-muted)' }}
          >
            Show hint
          </summary>
          <div className="mt-2 rounded-[var(--radius-md)] border border-[var(--border)] p-3 text-sm" style={{ color: 'var(--fg-muted)' }}>
            {check.hint}
          </div>
        </details>
      )}

      <SandboxComponent
        starterCode={check.starterCode}
        expectedOutput={check.expectedOutput}
        assertions={check.assertions}
        onResult={handleResult}
      />
    </div>
  );
}
