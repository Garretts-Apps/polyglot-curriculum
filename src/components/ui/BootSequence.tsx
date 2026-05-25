'use client';

import { useEffect, useRef, useState } from 'react';
import { TerminalCursor } from './TerminalCursor';

interface BootLine {
  text: string;
  /** ms per char while typing this line. Defaults to 18. */
  speed?: number;
  /** ms to wait after this line completes before starting the next. */
  pause?: number;
  /** color override */
  color?: string;
  /** Suppress the leading "> " prefix */
  raw?: boolean;
}

interface BootSequenceProps {
  lines: BootLine[];
  /** Total ms after last line before calling onComplete */
  tail?: number;
  /** Called when boot sequence is finished (or skipped) */
  onComplete?: () => void;
  /** Skip animation and immediately call onComplete (e.g. via sessionStorage check) */
  skip?: boolean;
}

function reducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

/**
 * Plays a short fake-boot terminal animation:
 *
 *   > boot polyglot-curriculum v1.0.0
 *   > loading curriculum...
 *   > 6 languages loaded
 *   > 60 phases ready
 *   > READY.
 *
 * Calls `onComplete` when done (or instantly if `skip` is true or
 * `prefers-reduced-motion` is set).
 */
export function BootSequence({ lines, tail = 350, onComplete, skip = false }: BootSequenceProps) {
  const [renderedLines, setRenderedLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [done, setDone] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    if (skip || reducedMotion()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration only, runs once on mount when skip/reduced-motion
      setDone(true);
      onComplete?.();
      return;
    }

    let cancelled = false;
    let lineIdx = 0;
    let charIdx = 0;
    let buffer = '';

    const finish = () => {
      if (cancelled) return;
      setDone(true);
      window.setTimeout(() => {
        if (!cancelled) onComplete?.();
      }, tail);
    };

    const step = () => {
      if (cancelled) return;
      if (lineIdx >= lines.length) {
        finish();
        return;
      }
      const line = lines[lineIdx];
      if (!line) {
        finish();
        return;
      }
      const prefix = line.raw ? '' : '> ';
      const full = prefix + line.text;
      if (charIdx <= full.length) {
        buffer = full.slice(0, charIdx);
        setCurrentText(buffer);
        charIdx += 1;
        window.setTimeout(step, line.speed ?? 18);
      } else {
        setRenderedLines((prev) => [...prev, full]);
        setCurrentText('');
        lineIdx += 1;
        charIdx = 0;
        window.setTimeout(step, line.pause ?? 90);
      }
    };

    window.setTimeout(step, 80);
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentLineMeta = lines[renderedLines.length];

  return (
    <pre
      aria-label="boot sequence"
      className="font-mono text-sm leading-relaxed whitespace-pre-wrap"
      style={{
        background: 'transparent',
        border: 'none',
        padding: 0,
        margin: 0,
        color: 'var(--fg)',
      }}
    >
      {renderedLines.map((l, i) => (
        <div key={i}>
          <span style={{ color: 'var(--accent-prompt)' }}>
            {l.startsWith('> ') ? '> ' : ''}
          </span>
          <span>{l.startsWith('> ') ? l.slice(2) : l}</span>
        </div>
      ))}
      {!done && (
        <div>
          <span style={{ color: 'var(--accent-prompt)' }}>
            {currentLineMeta?.raw ? '' : currentText.startsWith('> ') ? '> ' : ''}
          </span>
          <span style={{ color: currentLineMeta?.color }}>
            {currentText.startsWith('> ') ? currentText.slice(2) : currentText}
          </span>
          <TerminalCursor thin />
        </div>
      )}
    </pre>
  );
}
