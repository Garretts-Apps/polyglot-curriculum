'use client';

import type { SandboxProps, RunOutcome } from '@/lib/sandbox/types';
import { outputsMatch } from '@/lib/sandbox/types';
import SandboxShell from './SandboxShell';

type RustSandboxProps = Omit<SandboxProps, 'language'>;

export default function RustSandbox({
  starterCode,
  expectedOutput,
  assertions: _assertions,
  onResult,
}: RustSandboxProps) {
  async function runCode(code: string): Promise<RunOutcome> {
    let data: { stdout: string; stderr: string; success: boolean };

    try {
      const res = await fetch('/api/sandbox/rust', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      if (!res.ok) {
        const text = await res.text();
        return { kind: 'error', message: `Server error (${res.status}): ${text}` };
      }
      data = await res.json();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { kind: 'error', message };
    }

    if (!data.success) {
      const message = [data.stderr, data.stdout].filter(Boolean).join('\n');
      return { kind: 'error', message: message || 'Compilation failed' };
    }

    const actual = (data.stdout ?? '').trimEnd();

    if (expectedOutput !== undefined) {
      if (outputsMatch(actual, expectedOutput)) {
        return { kind: 'pass' };
      }
      return { kind: 'fail', expected: expectedOutput.trim(), actual };
    }

    return { kind: 'pass' };
  }

  return (
    <SandboxShell
      language="rust"
      starterCode={starterCode}
      expectedOutput={expectedOutput}
      onResult={onResult}
      onRun={runCode}
    />
  );
}
