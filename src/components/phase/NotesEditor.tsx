'use client';

import { useEffect, useRef, useState } from 'react';
import { Markdown } from '@/components/ui/Markdown';

interface NotesEditorProps {
  value: string;
  onChange: (notes: string) => void;
  /** Whether the underlying progress store has hydrated yet */
  hydrated?: boolean;
}

type Mode = 'edit' | 'preview';

export function NotesEditor({ value, onChange, hydrated = true }: NotesEditorProps) {
  const [mode, setMode] = useState<Mode>('edit');
  const [draft, setDraft] = useState(value);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep local draft in sync if value changes from outside (e.g. server hydration)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional prop sync, mirrors external value changes into local draft
    setDraft(value);
  }, [value]);

  // Debounced persist + saved indicator
  useEffect(() => {
    if (!hydrated) return;
    if (draft === value) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange(draft);
      setSavedAt(new Date());
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [draft, value, onChange, hydrated]);

  const dirty = draft !== value;
  const lineCount = draft.length === 0 ? 1 : draft.split('\n').length;

  return (
    <div
      className="border font-mono"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-elevated)' }}
    >
      {/* Toolbar — vim status line */}
      <div
        className="flex items-center justify-between gap-2 px-3 py-1.5 border-b text-[11px]"
        style={{
          borderColor: 'var(--border)',
          backgroundColor: 'var(--bg-overlay)',
        }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="px-1.5 py-0.5 leading-none uppercase tracking-wider text-[10px]"
            style={{
              color: 'var(--bg)',
              backgroundColor: mode === 'edit' ? 'var(--accent-prompt)' : 'var(--accent-info)',
            }}
            aria-hidden="true"
          >
            {mode === 'edit' ? '-- INSERT --' : '-- NORMAL --'}
          </span>
          <span style={{ color: 'var(--fg-muted)' }} className="truncate">
            notes.md
          </span>
        </div>

        {/* Export Note */}
        <button
          type="button"
          onClick={() => {
            if (!draft.trim()) return;
            const blob = new Blob([draft], { type: 'text/markdown;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'polyglot-curriculum-notes.md');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          disabled={!draft.trim()}
          className="ml-auto mr-2 px-2 py-0.5 border text-[10px] select-none cursor-pointer border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--accent-info)] hover:border-[var(--accent-info)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Export notes to Markdown file"
        >
          [ EXPORT ]
        </button>

        {/* Mode toggle */}
        <div
          className="inline-flex border"
          style={{ borderColor: 'var(--border)' }}
          role="tablist"
          aria-label="Notes view mode"
        >
          <button
            type="button"
            role="tab"
            id="tab-edit"
            aria-selected={mode === 'edit'}
            aria-controls="panel-edit"
            onClick={() => setMode('edit')}
            className={[
              'px-2 py-0.5 text-[11px] font-mono leading-none transition-colors duration-100',
              mode === 'edit'
                ? 'bg-[var(--accent-prompt)] text-[var(--bg)]'
                : 'bg-transparent text-[var(--fg-muted)] hover:text-[var(--accent-prompt)]',
            ].join(' ')}
          >
            <span aria-hidden="true" className="opacity-60">[</span>
            <span className="px-0.5">EDIT</span>
            <span aria-hidden="true" className="opacity-60">]</span>
          </button>
          <button
            type="button"
            role="tab"
            id="tab-preview"
            aria-selected={mode === 'preview'}
            aria-controls="panel-preview"
            onClick={() => setMode('preview')}
            className={[
              'px-2 py-0.5 text-[11px] font-mono leading-none transition-colors duration-100',
              mode === 'preview'
                ? 'bg-[var(--accent-info)] text-[var(--bg)]'
                : 'bg-transparent text-[var(--fg-muted)] hover:text-[var(--accent-info)]',
            ].join(' ')}
          >
            <span aria-hidden="true" className="opacity-60">[</span>
            <span className="px-0.5">PREVIEW</span>
            <span aria-hidden="true" className="opacity-60">]</span>
          </button>
        </div>
      </div>

      {/* Content area */}
      {mode === 'edit' ? (
        <div
          role="tabpanel"
          id="panel-edit"
          aria-labelledby="tab-edit"
          className="relative grid"
          style={{ gridTemplateColumns: '3.5ch 1fr' }}
        >
          {/* Line gutter */}
          <div
            aria-hidden="true"
            className="select-none text-right text-sm py-3 px-2 tabular-nums leading-[1.6]"
            style={{
              color: 'var(--fg-dim)',
              backgroundColor: 'var(--bg)',
              borderRight: '1px solid var(--border)',
            }}
          >
            {Array.from({ length: Math.max(lineCount, 8) }, (_, i) => (
              <div key={i}>{(i + 1).toString().padStart(2, '0')}</div>
            ))}
          </div>

          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="# scratch notes&#10;//&#10;// jot down stuff here. markdown supported.&#10;// auto-saves after 400ms of idle typing."
            rows={Math.max(lineCount, 8)}
            aria-label="Phase notes (Markdown supported)"
            className="w-full resize-none px-3 py-3 text-sm font-mono bg-transparent outline-none leading-[1.6]"
            style={{
              color: 'var(--fg)',
              caretColor: 'var(--accent-prompt)',
              minHeight: '200px',
            }}
            spellCheck={false}
          />
        </div>
      ) : (
        <div
          role="tabpanel"
          id="panel-preview"
          aria-labelledby="tab-preview"
          className="p-4 min-h-[200px]"
        >
          {draft.trim() ? (
            <Markdown content={draft} className="prose-terminal" />
          ) : (
            <p className="text-xs" style={{ color: 'var(--fg-dim)' }}>
              <span style={{ color: 'var(--fg-muted)' }}>{'// '}</span>
              buffer is empty. switch to{' '}
              <button
                type="button"
                onClick={() => setMode('edit')}
                className="underline underline-offset-2 transition-colors hover:[color:var(--accent-prompt)]"
                style={{ color: 'var(--accent-prompt)' }}
              >
                edit
              </button>{' '}
              to start typing.
            </p>
          )}
        </div>
      )}

      {/* Status line */}
      <div
        className="flex items-center justify-between gap-2 px-3 py-1 text-[10px] font-mono tabular-nums"
        style={{
          borderTop: '1px solid var(--border)',
          backgroundColor: 'var(--bg-overlay)',
          color: 'var(--fg-dim)',
        }}
      >
        <span className="inline-flex items-center gap-3 min-w-0 truncate">
          <span>
            <span style={{ color: 'var(--fg-muted)' }}>L</span>
            {lineCount}
          </span>
          <span style={{ color: 'var(--fg-dim)' }} aria-hidden="true">·</span>
          <span>
            <span style={{ color: 'var(--fg-muted)' }}>B</span>
            {draft.length}
          </span>
          <span style={{ color: 'var(--fg-dim)' }} aria-hidden="true">·</span>
          <span>utf-8</span>
          <span style={{ color: 'var(--fg-dim)' }} aria-hidden="true">·</span>
          <span>markdown</span>
        </span>
        <span className="inline-flex items-center gap-2" aria-live="polite">
          {dirty ? (
            <span
              style={{ color: 'var(--accent-warn)' }}
              className="inline-flex items-center gap-1"
            >
              <span aria-hidden="true">*</span>
              <span>unsaved</span>
            </span>
          ) : savedAt ? (
            <span
              style={{ color: 'var(--accent-prompt)' }}
              className="inline-flex items-center gap-1"
            >
              <span aria-hidden="true">✓</span>
              <span>saved</span>
              <span style={{ color: 'var(--fg-dim)' }}>
                @ {savedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </span>
          ) : (
            <span style={{ color: 'var(--fg-dim)' }}>{'// no edits yet'}</span>
          )}
        </span>
      </div>
    </div>
  );
}
