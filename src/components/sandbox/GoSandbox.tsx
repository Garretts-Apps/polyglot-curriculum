'use client';

import type { SandboxProps, RunOutcome } from '@/lib/sandbox/types';
import { outputsMatch } from '@/lib/sandbox/types';
import SandboxShell from './SandboxShell';

type GoSandboxProps = Omit<SandboxProps, 'language'>;

export default function GoSandbox({
  starterCode,
  expectedOutput,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  assertions: _assertions,
  onResult,
}: GoSandboxProps) {
  async function runCode(code: string): Promise<RunOutcome> {
    let data: { stdout: string; stderr: string };

    try {
      const res = await fetch('/api/sandbox/go', {
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

    if (data.stderr) {
      return { kind: 'error', message: data.stderr };
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
      language="go"
      starterCode={starterCode}
      expectedOutput={expectedOutput}
      onResult={onResult}
      onRun={runCode}
    />
  );
}
