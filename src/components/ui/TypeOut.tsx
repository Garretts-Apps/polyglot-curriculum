'use client';

import { useEffect, useRef, useState } from 'react';
import { TerminalCursor } from './TerminalCursor';

interface TypeOutProps {
  text: string;
  /** ms per character */
  speed?: number;
  /** ms before the first character appears */
  delay?: number;
  /** unique key — if the same key was already typed in this session, render instantly */
  sessionKey?: string;
  /** Show a blinking cursor at the end while typing */
  showCursor?: boolean;
  /** Keep the cursor blinking after typing finishes */
  cursorAfterDone?: boolean;
  /** Called after the full string is rendered */
  onDone?: () => void;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

function reducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

function alreadyTyped(key?: string): boolean {
  if (!key || typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(`typeout:${key}`) === '1';
  } catch {
    return false;
  }
}

function markTyped(key?: string) {
  if (!key || typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(`typeout:${key}`, '1');
  } catch {
    /* ignore */
  }
}

/**
 * Typewriter effect — renders `text` character-by-character on mount.
 * - Respects `prefers-reduced-motion` (renders instantly).
 * - Skips animation on subsequent visits when `sessionKey` is set.
 *
 *   <TypeOut text="loading..." speed={40} sessionKey="home-hero" />
 */
export function TypeOut({
  text,
  speed = 55,
  delay = 0,
  sessionKey,
  showCursor = true,
  cursorAfterDone = true,
  onDone,
  className = '',
  as: Tag = 'span',
}: TypeOutProps) {
  // Start fully-typed on the server to avoid hydration jitter; animate on mount only.
  const [shown, setShown] = useState(text);
  const [done, setDone] = useState(true);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    if (reducedMotion() || alreadyTyped(sessionKey)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration only, runs once on mount for reduced-motion/already-typed path
      setShown(text);
      setDone(true);
      onDone?.();
      return;
    }

    setShown('');
    setDone(false);
    let cancelled = false;
    let i = 0;
    const tick = () => {
      if (cancelled) return;
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        setDone(true);
        markTyped(sessionKey);
        onDone?.();
        return;
      }
      window.setTimeout(tick, speed);
    };
    const initial = window.setTimeout(tick, Math.max(0, delay));
    return () => {
      cancelled = true;
      window.clearTimeout(initial);
    };
    // text/speed/delay/sessionKey are stable per render — re-running would
    // restart the typewriter. We intentionally lock to first mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderCursor = showCursor && (!done || cursorAfterDone);

  return (
    <Tag className={className}>
      <span style={{ whiteSpace: 'pre-wrap' }}>{shown}</span>
      {renderCursor && <TerminalCursor thin={!done} />}
    </Tag>
  );
}
