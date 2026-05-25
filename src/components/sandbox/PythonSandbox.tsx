'use client';

import { useRef, useState } from 'react';
import type { SandboxProps, RunOutcome } from '@/lib/sandbox/types';
import { outputsMatch } from '@/lib/sandbox/types';
import { loadPyodideInstance } from '@/lib/sandbox/pyodide-loader';
import SandboxShell from './SandboxShell';

type PythonSandboxProps = Omit<SandboxProps, 'language'>;

export default function PythonSandbox({
  starterCode,
  expectedOutput,
  assertions,
  onResult,
}: PythonSandboxProps) {
  const [loadingPyodide, setLoadingPyodide] = useState(false);
  // Track whether Pyodide has been loaded at least once
  const pyodideReadyRef = useRef(false);

  async function runCode(code: string): Promise<RunOutcome> {
    if (!pyodideReadyRef.current) {
      setLoadingPyodide(true);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let pyodide: any;
    try {
      pyodide = await loadPyodideInstance();
      pyodideReadyRef.current = true;
    } finally {
      setLoadingPyodide(false);
    }

    // Capture stdout
    const stdoutLines: string[] = [];
    pyodide.setStdout({
      batched: (line: string) => {
        stdoutLines.push(line);
      },
    });

    // Build code to run
    let codeToRun = code;
    if (assertions) {
      codeToRun = `${code}\n${assertions}`;
    }

    try {
      await pyodide.runPythonAsync(codeToRun);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { kind: 'error', message };
    }

    const actual = stdoutLines.join('\n').trimEnd();

    if (expectedOutput !== undefined) {
      if (outputsMatch(actual, expectedOutput)) {
        return { kind: 'pass' };
      }
      return { kind: 'fail', expected: expectedOutput.trim(), actual };
    }

    // No expected output specified — if we got here without an exception, it's a pass
    return { kind: 'pass' };
  }

  return (
    <div>
      {loadingPyodide && (
        <div className="mb-2 rounded bg-[#1a1a2e] px-4 py-2 text-sm text-[var(--muted)]">
          Loading Python runtime (~8 MB, first run only)…
        </div>
      )}
      <SandboxShell
        language="python"
        starterCode={starterCode}
        expectedOutput={expectedOutput}
        assertions={assertions}
        onResult={onResult}
        onRun={runCode}
      />
    </div>
  );
}
