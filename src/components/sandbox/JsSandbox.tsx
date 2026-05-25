'use client';

import { useRef, useState } from 'react';
import type { SandboxProps, RunOutcome } from '@/lib/sandbox/types';
import { outputsMatch } from '@/lib/sandbox/types';
import { loadEsbuild } from '@/lib/sandbox/esbuild-loader';
import SandboxShell from './SandboxShell';

type JsSandboxProps = Omit<SandboxProps, 'language'>;

// NOTE: This sandbox uses Function() for eval — intentional single-user design.
// The user types code themselves; there is no server-side or network-sourced input.

export default function JsSandbox({
  starterCode,
  expectedOutput,
  assertions,
  onResult,
}: JsSandboxProps) {
  const [loadingEsbuild, setLoadingEsbuild] = useState(false);
  const esbuildReadyRef = useRef(false);

  async function runCode(code: string): Promise<RunOutcome> {
    if (!esbuildReadyRef.current) {
      setLoadingEsbuild(true);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let esbuild: any;
    try {
      esbuild = await loadEsbuild();
      esbuildReadyRef.current = true;
    } finally {
      setLoadingEsbuild(false);
    }

    // Transpile TypeScript -> JavaScript
    let js: string;
    try {
      const result = await esbuild.transform(code, {
        loader: 'ts',
        target: 'es2017',
      });
      js = result.code as string;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { kind: 'error', message: `TypeScript error:\n${message}` };
    }

    // Capture console.log output
    const outputLines: string[] = [];
    const origLog = console.log;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.log = (...args: any[]) => {
      outputLines.push(args.map((a) => (typeof a === 'string' ? a : JSON.stringify(a))).join(' '));
    };

    try {
      const toRun = assertions ? `${js}\n${assertions}` : js;
      // User-authored code only; acceptable for this single-user learning app
      const execFn = new Function(toRun); // eslint-disable-line no-new-func
      execFn();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { kind: 'error', message };
    } finally {
      console.log = origLog;
    }

    const actual = outputLines.join('\n').trimEnd();

    if (expectedOutput !== undefined) {
      if (outputsMatch(actual, expectedOutput)) {
        return { kind: 'pass' };
      }
      return { kind: 'fail', expected: expectedOutput.trim(), actual };
    }

    return { kind: 'pass' };
  }

  return (
    <div>
      {loadingEsbuild && (
        <div
          className="mb-2 px-3 py-2 text-xs font-mono border-l-2"
          style={{
            borderLeftColor: 'var(--accent-warn)',
            backgroundColor: 'var(--bg-elevated)',
            color: 'var(--fg-muted)',
          }}
        >
          <span style={{ color: 'var(--accent-warn)' }}>~</span> fetching esbuild-wasm{' '}
          <span style={{ color: 'var(--fg-dim)' }}>(first-run only)</span>…
        </div>
      )}
      <SandboxShell
        language="typescript"
        starterCode={starterCode}
        expectedOutput={expectedOutput}
        assertions={assertions}
        onResult={onResult}
        onRun={runCode}
      />
    </div>
  );
}
