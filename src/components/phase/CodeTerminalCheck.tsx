'use client';

import { useState, useEffect, useRef } from 'react';
import type { CodeTaskCheck, Language, TestCase } from '@/curriculum/types';
import { getLanguageMeta } from '@/curriculum/types';
import { transpileCode } from '@/lib/runner';
import { Markdown } from '@/components/ui/Markdown';
import { Button } from '@/components/ui/Button';
import { Confetti } from '@/components/ui/Confetti';
import { TerminalCursor } from '@/components/ui/TerminalCursor';

interface CodeTerminalCheckProps {
  check: CodeTaskCheck;
  language: Language;
  checkResult?: { status: 'pass' | 'fail' | 'pending' };
  onResult: (checkId: string, status: 'pass' | 'fail') => void;
}

interface TestCaseResult {
  description: string;
  passed: boolean;
  actualOutput: string;
  expectedOutput: string;
  error?: string;
}

export function CodeTerminalCheck({
  check,
  language,
  checkResult,
  onResult,
}: CodeTerminalCheckProps) {
  const alreadyPassed = checkResult?.status === 'pass';
  const [code, setCode] = useState(check.boilerplate);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSandboxReady, setIsSandboxReady] = useState(false);
  const [validated, setValidated] = useState(alreadyPassed);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(alreadyPassed ? true : null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [testResults, setTestResults] = useState<TestCaseResult[]>([]);
  const [selectedTestIdx, setSelectedTestIdx] = useState<number | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const resolverRef = useRef<((val: { output: string; error?: string }) => void) | null>(null);

  useEffect(() => {
    if (alreadyPassed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional state synchronization from database
      setValidated(true);
      setWasCorrect(true);
    }
  }, [alreadyPassed]);

  // Setup message handler for sandbox
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (!e.data) return;
      if (e.data.action === 'sandbox-ready') {
        setIsSandboxReady(true);
      } else if (e.data.action === 'result') {
        if (resolverRef.current) {
          resolverRef.current({
            output: e.data.output,
            error: e.data.error,
          });
          resolverRef.current = null;
        }
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  // Map a language's declared sandbox runtime to the sandbox iframe's
  // execution channel. 'js' is the default for the regex-transpiled languages.
  const runtime = getLanguageMeta(language)?.runtime ?? 'js';

  const executeInSandbox = (
    transpiledCode: string
  ): Promise<{ output: string; error?: string }> => {
    return new Promise((resolve) => {
      resolverRef.current = resolve;
      const targetLang =
        runtime === 'python'
          ? 'python'
          : runtime === 'sql'
            ? 'sql'
            : 'javascript';
      iframeRef.current?.contentWindow?.postMessage(
        {
          action: 'run',
          language: targetLang,
          code: transpiledCode,
        },
        '*'
      );
    });
  };

  // File name shown in the editor toolbar.
  const getFileName = () => getLanguageMeta(language)?.fileName ?? 'main.code';

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      e.currentTarget.blur();
      e.preventDefault();
      return;
    }
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const val = textarea.value;
      const newValue = val.substring(0, start) + '  ' + val.substring(end);
      setCode(newValue);
      // Reset cursor position
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    setError('');
    setOutput('Executing...');

    // 1. Transpile in main window
    const transpileRes = await transpileCode(language, code);
    if (transpileRes.error) {
      setIsRunning(false);
      setError(transpileRes.error);
      setOutput('');
      return;
    }

    // 2. Run in sandboxed iframe
    const res = await executeInSandbox(transpileRes.transpiledCode);

    setIsRunning(false);
    if (res.error) {
      setError(res.error);
      setOutput('');
    } else {
      setOutput(res.output || '(No output produced)');
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    setError('');
    setOutput('Verifying...');
    setTestResults([]);
    setSelectedTestIdx(null);

    const hasTestCases = check.testCases && check.testCases.length > 0;
    const casesToRun = hasTestCases
      ? check.testCases!
      : [{ expectedOutput: check.expectedOutput, description: 'Default Verification' } as TestCase];

    const results: TestCaseResult[] = [];
    let allPassed = true;

    for (let idx = 0; idx < casesToRun.length; idx++) {
      const tc = casesToRun[idx]!;
      const testDescription = tc.description || `Test case ${idx + 1}`;
      
      // 1. Prepare code to run (append input suffix if provided)
      const combinedCode = tc.input ? `${code}\n${tc.input}` : code;

      // 2. Transpile
      const transpileRes = await transpileCode(language, combinedCode);
      if (transpileRes.error) {
        allPassed = false;
        results.push({
          description: testDescription,
          passed: false,
          actualOutput: '',
          expectedOutput: tc.expectedOutput,
          error: `Transpilation/Compilation Error: ${transpileRes.error}`,
        });
        continue;
      }

      // 3. Run in Sandbox
      const res = await executeInSandbox(transpileRes.transpiledCode);
      
      if (res.error) {
        allPassed = false;
        results.push({
          description: testDescription,
          passed: false,
          actualOutput: '',
          expectedOutput: tc.expectedOutput,
          error: res.error,
        });
      } else {
        const actualOutput = res.output || '';
        const expected = tc.expectedOutput.trim().toLowerCase();
        const actual = actualOutput.trim().toLowerCase();
        const passed = actual.includes(expected);

        if (!passed) allPassed = false;

        results.push({
          description: testDescription,
          passed,
          actualOutput,
          expectedOutput: tc.expectedOutput,
        });
      }
    }

    setIsVerifying(false);
    setTestResults(results);
    setValidated(true);
    setWasCorrect(allPassed);
    
    if (allPassed) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      onResult(check.id, 'pass');
      setOutput('ALL TESTS PASSED! 🎉');
    } else {
      onResult(check.id, 'fail');
      setOutput('SOME TESTS FAILED. See details below.');
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset code editor to boilerplate? This will overwrite your changes.')) {
      setCode(check.boilerplate);
      setOutput('');
      setError('');
      setValidated(false);
      setWasCorrect(null);
    }
  };

  const lineCount = code.length === 0 ? 1 : code.split('\n').length;
  const fileName = getFileName();

  return (
    <div
      className="border border-t-0 font-mono flex flex-col"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-elevated)' }}
    >
      <Confetti active={showConfetti} />

      {/* Sandbox Iframe — strict: scripts only, no same-origin access to /api or storage */}
      <iframe
        ref={iframeRef}
        src="/sandbox.html"
        sandbox="allow-scripts"
        style={{ display: 'none' }}
        title={`Sandbox runner for ${fileName}`}
      />

      {/* 1. Prompt / Challenge Description */}
      <div
        className="px-4 py-3 border-b grid items-start gap-2"
        style={{ borderColor: 'var(--border)', gridTemplateColumns: 'auto 1fr' }}
      >
        <span
          className="text-sm font-semibold leading-snug pt-px"
          style={{ color: 'var(--accent-info)' }}
          aria-hidden="true"
        >
          Q.
        </span>
        <div className="min-w-0">
          <Markdown content={check.prompt} className="prose-terminal text-sm" />
        </div>
      </div>

      {/* 2. Code Editor */}
      <div className="flex flex-col border-b" style={{ borderColor: 'var(--border)' }}>
        {/* Editor Toolbar */}
        <div
          className="flex items-center justify-between gap-2 px-3 py-1.5 border-b text-[11px]"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--bg-overlay)',
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="px-1.5 py-0.5 leading-none uppercase tracking-wider text-[10px]"
              style={{
                color: 'var(--bg)',
                backgroundColor: 'var(--accent-prompt)',
              }}
              aria-hidden="true"
            >
              EDIT
            </span>
            <span style={{ color: 'var(--fg-muted)' }} className="truncate">
              {fileName}
            </span>
          </div>
          <div style={{ color: 'var(--fg-dim)' }}>
            L{lineCount}
          </div>
        </div>

        {/* Text Area Container */}
        <div
          className="relative grid"
          style={{ gridTemplateColumns: '4ch 1fr' }}
        >
          {/* Line gutter */}
          <div
            aria-hidden="true"
            className="select-none text-right text-xs py-3 px-2 tabular-nums leading-[1.6]"
            style={{
              color: 'var(--fg-dim)',
              backgroundColor: 'var(--bg)',
              borderRight: '1px solid var(--border)',
            }}
          >
            {Array.from({ length: Math.max(lineCount, 6) }, (_, i) => (
              <div key={i}>{(i + 1).toString().padStart(2, '0')}</div>
            ))}
          </div>

          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={Math.max(lineCount, 6)}
            aria-label={`Code editor for ${fileName}. Press Escape and then Tab to exit the editor.`}
            className="w-full resize-none px-3 py-3 text-xs font-mono bg-transparent outline-none leading-[1.6]"
            style={{
              color: 'var(--fg)',
              caretColor: 'var(--accent-prompt)',
            }}
            spellCheck={false}
            disabled={isRunning || isVerifying}
          />
        </div>
      </div>

      {/* Test Results Suite */}
      {testResults.length > 0 && (
        <div className="flex flex-col border-b" style={{ borderColor: 'var(--border)' }}>
          <div
            className="flex items-center justify-between px-3 py-1.5 border-b text-[10px] uppercase tracking-wider"
            style={{
              borderColor: 'var(--border)',
              backgroundColor: 'var(--bg-overlay)',
              color: 'var(--fg-muted)',
            }}
          >
            <span>Test Suite Summary</span>
            <span>{testResults.filter(r => r.passed).length} / {testResults.length} Passed</span>
          </div>
          <div className="p-2 grid grid-cols-2 sm:grid-cols-3 gap-2 bg-[var(--bg)]">
            {testResults.map((res, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedTestIdx(selectedTestIdx === i ? null : i)}
                className={`px-2 py-1 text-[11px] font-mono border text-left flex items-center justify-between transition-colors duration-150 cursor-pointer ${
                  res.passed
                    ? 'border-[var(--accent-prompt)] text-[var(--accent-prompt)] hover:bg-[rgba(126,231,135,0.08)]'
                    : 'border-[var(--accent-error)] text-[var(--accent-error)] hover:bg-[rgba(255,123,114,0.08)]'
                } ${selectedTestIdx === i ? 'bg-[var(--bg-overlay)]' : ''}`}
              >
                <span className="truncate">{res.description}</span>
                <span className="ml-1 flex-shrink-0">{res.passed ? '✓' : '✗'}</span>
              </button>
            ))}
          </div>
          {selectedTestIdx !== null && testResults[selectedTestIdx] && (
            <div className="p-3 bg-[var(--bg-elevated)] border-t text-[11px] font-mono leading-relaxed" style={{ borderColor: 'var(--border)' }}>
              <p className="font-semibold" style={{ color: testResults[selectedTestIdx].passed ? 'var(--accent-prompt)' : 'var(--accent-error)' }}>
                {testResults[selectedTestIdx].description}: {testResults[selectedTestIdx].passed ? 'Passed ✓' : 'Failed ✗'}
              </p>
              {testResults[selectedTestIdx].error && (
                <p className="text-[var(--accent-error)] mt-1">Error: {testResults[selectedTestIdx].error}</p>
              )}
              <div className="grid grid-cols-2 gap-4 mt-2 border-t pt-2" style={{ borderColor: 'var(--border)' }}>
                <div>
                  <span className="text-[10px] text-[var(--fg-dim)]">{"// Expected stdout substring:"}</span>
                  <pre className="mt-1 p-1 bg-[var(--bg)] border rounded max-w-full overflow-x-auto text-[var(--fg)]" style={{ borderColor: 'var(--border)' }}>
                    {testResults[selectedTestIdx].expectedOutput}
                  </pre>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--fg-dim)]">{"// Actual stdout:"}</span>
                  <pre className="mt-1 p-1 bg-[var(--bg)] border rounded max-w-full overflow-x-auto text-[var(--fg)]" style={{ borderColor: 'var(--border)' }}>
                    {testResults[selectedTestIdx].actualOutput || '(No output)'}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Terminal Console Output */}
      <div className="flex flex-col border-b" style={{ borderColor: 'var(--border)' }}>
        {/* Terminal Header */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 border-b text-[11px]"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--bg-overlay)',
            color: 'var(--fg-muted)',
          }}
        >
          <span>console.log</span>
        </div>

        {/* Console Box - matches global theme variables */}
        <div
          className="p-3 text-[11px] font-mono min-h-[80px] max-h-[200px] overflow-y-auto leading-relaxed border-none outline-none"
          style={{ backgroundColor: 'var(--bg)', color: 'var(--accent-prompt)' }}
        >
          {error ? (
            <div className="text-[var(--accent-error)] select-text whitespace-pre-wrap">
              {error}{isRunning && <TerminalCursor />}
            </div>
          ) : (
            <div className="select-text whitespace-pre-wrap">
              {output || (isRunning ? '' : '(Terminal is idle)')}
              {isRunning && <TerminalCursor />}
            </div>
          )}
        </div>
      </div>

      {/* 4. Action Footer */}
      <div
        className="px-3 py-2 flex items-center justify-between gap-3 flex-wrap"
        style={{ backgroundColor: 'var(--bg-overlay)' }}
      >
        <div>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleReset}
            disabled={isRunning || isVerifying || !isSandboxReady}
          >
            rm {fileName}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleRun}
            disabled={isRunning || isVerifying || !isSandboxReady}
          >
            {isRunning ? 'running...' : `run ${fileName}`}
          </Button>
          <Button
            size="sm"
            onClick={handleVerify}
            disabled={isRunning || isVerifying || !isSandboxReady}
            style={{
              backgroundColor: validated && wasCorrect === true ? 'var(--accent-prompt)' : undefined,
              color: validated && wasCorrect === true ? 'var(--bg)' : undefined,
            }}
          >
            {isVerifying ? 'verifying...' : validated && wasCorrect === true ? 'verified ✓' : 'verify'}
          </Button>
        </div>
      </div>

      {/* 5. Explanation block (Active ARIA live region for screen-readers) */}
      <div role="status" aria-live="polite" aria-atomic="true">
        {validated && wasCorrect !== null && (
          <div
            className="px-4 py-4 border-t text-xs leading-relaxed"
            style={{
              borderColor: 'var(--border)',
              backgroundColor: wasCorrect
                ? 'color-mix(in srgb, var(--accent-prompt) 5%, var(--bg-elevated))'
                : 'color-mix(in srgb, var(--accent-error) 5%, var(--bg-elevated))',
            }}
          >
            {wasCorrect ? (
              <div className="space-y-2">
                <p className="font-semibold text-[var(--accent-prompt)] flex items-center gap-2">
                  <span>[ SUCCESS: VERIFIED ]</span>
                </p>
                <div className="text-[var(--fg-muted)]">
                  <Markdown content={check.explanation} className="prose-terminal text-[11px]" />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="font-semibold text-[var(--accent-error)]">
                  [ ERROR: VERIFICATION FAILED ]
                </p>
                <p className="text-[var(--fg-muted)]">
                  Output did not match expectation. Expected to find substring:{' '}
                  <code className="px-1 py-0.5 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--fg)]">
                    {check.expectedOutput}
                  </code>{' '}
                  in stdout. Modify your code and try again.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
