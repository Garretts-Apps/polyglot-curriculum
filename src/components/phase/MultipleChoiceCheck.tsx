'use client';

import { useEffect, useState, useCallback } from 'react';
import type { MultipleChoiceCheck as MCQType } from '@/curriculum/types';
import { Markdown } from '@/components/ui/Markdown';
import { Button } from '@/components/ui/Button';
import { StatusTag } from '@/components/ui/StatusTag';

interface MultipleChoiceCheckProps {
  check: MCQType;
  checkResult?: { status: 'pass' | 'fail' | 'pending' };
  onResult: (checkId: string, status: 'pass' | 'fail') => void;
}

export function MultipleChoiceCheck({
  check,
  checkResult,
  onResult,
}: MultipleChoiceCheckProps) {
  const alreadyPassed = checkResult?.status === 'pass';
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(alreadyPassed);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(alreadyPassed ? true : null);

  const handleSubmit = useCallback(() => {
    if (selected === null) return;
    const correct = selected === check.correctIndex;
    setSubmitted(true);
    setWasCorrect(correct);
    onResult(check.id, correct ? 'pass' : 'fail');
  }, [selected, check.correctIndex, check.id, onResult]);

  // Keyboard nav: 1-9 to select an option, Enter to submit
  useEffect(() => {
    if (submitted && wasCorrect) return;
    function onKey(e: KeyboardEvent) {
      // Only when no input is focused
      const tag = (e.target as HTMLElement | null)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
      const idx = parseInt(e.key, 10);
      if (Number.isInteger(idx) && idx >= 1 && idx <= check.options.length) {
        setSelected(idx - 1);
        e.preventDefault();
        return;
      }
      if (e.key === 'Enter' && selected !== null && !submitted) {
        handleSubmit();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, submitted, wasCorrect, check.options.length, handleSubmit]);

  function handleRetry() {
    setSubmitted(false);
    setSelected(null);
    setWasCorrect(null);
  }

  return (
    <div
      className="border border-t-0 font-mono"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-elevated)' }}
    >
      {/* Prompt — Q. <markdown> */}
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
          <Markdown content={check.prompt} className="prose-terminal" />
        </div>
      </div>

      {/* Options — TUI radio group */}
      <fieldset
        className="px-4 py-3 space-y-0.5"
        disabled={submitted && wasCorrect === true}
      >
        <legend className="sr-only">Select an answer</legend>
        {check.options.map((option, i) => {
          let textColor = 'var(--fg)';
          let bracketColor = 'var(--fg-dim)';
          let bgColor = 'transparent';
          let cursorGlyph: string | null = null;
          let cursorColor = 'var(--accent-prompt)';
          let suffix: string | null = null;

          if (submitted) {
            if (i === check.correctIndex) {
              textColor = 'var(--accent-prompt)';
              bracketColor = 'var(--accent-prompt)';
              bgColor = 'color-mix(in srgb, var(--accent-prompt) 10%, transparent)';
              cursorGlyph = '✓';
              cursorColor = 'var(--accent-prompt)';
              suffix = '← correct';
            } else if (i === selected && selected !== check.correctIndex) {
              textColor = 'var(--accent-error)';
              bracketColor = 'var(--accent-error)';
              bgColor = 'color-mix(in srgb, var(--accent-error) 8%, transparent)';
              cursorGlyph = '✗';
              cursorColor = 'var(--accent-error)';
              suffix = '← your pick';
            } else {
              textColor = 'var(--fg-muted)';
            }
          } else if (selected === i) {
            textColor = 'var(--accent-prompt)';
            bracketColor = 'var(--accent-prompt)';
            bgColor = 'color-mix(in srgb, var(--accent-prompt) 7%, transparent)';
            cursorGlyph = '▸';
            suffix = '← selected';
          }

          return (
            <label
              key={i}
              className={[
                'grid items-start gap-3 px-2 py-1.5 text-sm leading-snug',
                'transition-colors duration-100 select-none',
                'focus-within:ring-1 focus-within:ring-[var(--accent-prompt)] focus-within:outline-none',
                submitted ? 'cursor-default' : 'cursor-pointer hover:bg-[var(--bg-overlay)]',
              ].join(' ')}
              style={{
                backgroundColor: bgColor,
                color: textColor,
                gridTemplateColumns: 'auto 1ch 1fr auto',
              }}
            >
              <input
                type="radio"
                name={`mcq-${check.id}`}
                value={i}
                checked={selected === i}
                onChange={() => !submitted && setSelected(i)}
                className="sr-only"
              />
              {/* [n] bracket label */}
              <span
                aria-hidden="true"
                className="font-mono text-xs tabular-nums pt-0.5"
                style={{ color: bracketColor }}
              >
                [{i + 1}]
              </span>
              {/* selection cursor column — keeps text aligned */}
              <span
                aria-hidden="true"
                className="font-mono text-xs pt-0.5 text-center"
                style={{ color: cursorColor }}
              >
                {cursorGlyph ?? ' '}
              </span>
              <span className="min-w-0">{option}</span>
              {suffix && (
                <span
                  className="text-[10px] uppercase tracking-wider pt-1"
                  style={{ color: bracketColor }}
                  aria-hidden="true"
                >
                  {suffix}
                </span>
              )}
            </label>
          );
        })}

        {!submitted && (
          <p className="pt-3 px-2 text-[11px]" style={{ color: 'var(--fg-dim)' }}>
            <span style={{ color: 'var(--fg-muted)' }}>{'// '}</span>
            press{' '}
            <kbd
              className="px-1 border tabular-nums"
              style={{ borderColor: 'var(--border)', color: 'var(--accent-prompt)' }}
            >
              1-{check.options.length}
            </kbd>{' '}
            to pick,{' '}
            <kbd
              className="px-1 border"
              style={{ borderColor: 'var(--border)', color: 'var(--accent-prompt)' }}
            >
              enter
            </kbd>{' '}
            to submit
          </p>
        )}
      </fieldset>

      {/* Action row */}
      {!submitted && (
        <div
          className="px-4 py-3 border-t flex items-center gap-2"
          style={{ borderColor: 'var(--border)' }}
        >
          <Button onClick={handleSubmit} disabled={selected === null} variant="primary" size="sm">
            submit
          </Button>
          <Button
            onClick={() => setSelected(null)}
            disabled={selected === null}
            variant="ghost"
            size="sm"
          >
            skip
          </Button>
        </div>
      )}

      {/* Result feedback — terminal style */}
      <div role="status" aria-live="polite" aria-atomic="true">
        {submitted && (
          <div
            className="border-t px-4 py-3"
            style={{
              borderColor: wasCorrect ? 'var(--accent-prompt)' : 'var(--accent-error)',
              backgroundColor: wasCorrect
                ? 'color-mix(in srgb, var(--accent-prompt) 4%, transparent)'
                : 'color-mix(in srgb, var(--accent-error) 4%, transparent)',
            }}
          >
            <p
              className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-wider"
              style={{
                color: wasCorrect ? 'var(--accent-prompt)' : 'var(--accent-error)',
              }}
            >
              <StatusTag status={wasCorrect ? 'pass' : 'fail'} />
              <span>{wasCorrect ? 'answer accepted' : 'answer rejected'}</span>
            </p>
            <div
              className="border-l-2 pl-3 text-sm flex items-start gap-2"
              style={{
                borderLeftColor: wasCorrect
                  ? 'var(--accent-prompt)'
                  : 'var(--accent-error)',
              }}
            >
              <span
                className="text-[12px] flex-shrink-0 pt-px"
                style={{
                  color: wasCorrect ? 'var(--accent-prompt)' : 'var(--accent-error)',
                }}
                aria-hidden="true"
              >
                &gt;
              </span>
              <div className="min-w-0 flex-1">
                <Markdown content={check.explanation} className="prose-terminal" />
              </div>
            </div>
            {!wasCorrect && (
              <div className="mt-3">
                <Button
                  onClick={handleRetry}
                  variant="ghost"
                  size="sm"
                >
                  try again
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
