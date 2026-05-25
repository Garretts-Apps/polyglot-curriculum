'use client';

import { useState } from 'react';
import type { MultipleChoiceCheck as MCQType } from '@/curriculum/types';
import { Markdown } from '@/components/ui/Markdown';

interface MultipleChoiceCheckProps {
  check: MCQType;
  checkResult?: { status: 'pass' | 'fail' | 'pending' };
  onResult: (checkId: string, status: 'pass' | 'fail') => void;
}

export function MultipleChoiceCheck({ check, checkResult, onResult }: MultipleChoiceCheckProps) {
  const alreadyPassed = checkResult?.status === 'pass';
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(alreadyPassed);
  const [wasCorrect, setWasCorrect] = useState(alreadyPassed ? true : null as boolean | null);

  function handleSubmit() {
    if (selected === null) return;
    const correct = selected === check.correctIndex;
    setSubmitted(true);
    setWasCorrect(correct);
    onResult(check.id, correct ? 'pass' : 'fail');
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5">
      <div className="mb-4">
        <Markdown content={check.prompt} />
      </div>

      <fieldset className="space-y-2" disabled={submitted && wasCorrect === true}>
        <legend className="sr-only">Select an answer</legend>
        {check.options.map((option, i) => {
          let borderColor = 'var(--border)';
          let bgColor = 'transparent';
          if (submitted) {
            if (i === check.correctIndex) {
              borderColor = '#22c55e';
              bgColor = 'rgba(34,197,94,0.08)';
            } else if (i === selected && selected !== check.correctIndex) {
              borderColor = '#ef4444';
              bgColor = 'rgba(239,68,68,0.08)';
            }
          } else if (selected === i) {
            borderColor = 'var(--fg-muted)';
          }

          return (
            <label
              key={i}
              className="flex items-start gap-3 cursor-pointer rounded-[var(--radius-md)] border p-3 transition-colors duration-100"
              style={{ borderColor, backgroundColor: bgColor }}
            >
              <input
                type="radio"
                name={`mcq-${check.id}`}
                value={i}
                checked={selected === i}
                onChange={() => !submitted && setSelected(i)}
                className="mt-0.5 accent-[var(--fg)]"
                style={{ minHeight: 0, minWidth: 0 }}
              />
              <span className="text-sm leading-relaxed" style={{ color: 'var(--fg)' }}>
                {option}
              </span>
            </label>
          );
        })}
      </fieldset>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="mt-4 px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-opacity disabled:opacity-40"
          style={{ backgroundColor: 'var(--fg)', color: 'var(--bg)', minHeight: '44px' }}
        >
          Submit answer
        </button>
      )}

      <div role="status" aria-live="polite" aria-atomic="true">
        {submitted && (
          <div
            className="mt-4 rounded-[var(--radius-md)] border p-4 text-sm"
            style={{
              borderColor: wasCorrect ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)',
              backgroundColor: wasCorrect ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.06)',
            }}
          >
            <p className="font-semibold mb-1" style={{ color: wasCorrect ? '#22c55e' : '#ef4444' }}>
              {wasCorrect ? 'Correct!' : 'Incorrect'}
            </p>
            <Markdown content={check.explanation} />
            {!wasCorrect && (
              <button
                onClick={() => { setSubmitted(false); setSelected(null); setWasCorrect(null); }}
                className="mt-2 text-xs underline"
                style={{ color: 'var(--fg-muted)', minHeight: '44px' }}
              >
                Try again
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
