'use client';

import { useState } from 'react';
import { Markdown } from '@/components/ui/Markdown';

interface NotesEditorProps {
  value: string;
  onChange: (notes: string) => void;
}

export function NotesEditor({ value, onChange }: NotesEditorProps) {
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  // NOTE: `value` is a fully-controlled prop (parent owns the notes state via
  // useProgress). No local useState for the note content is needed — React
  // re-renders the textarea automatically when `value` changes after
  // useProgress hydrates from localStorage in its useEffect.

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] overflow-hidden">
      {/* Toolbar */}
      <div
        className="flex items-center gap-1 border-b px-3 py-2"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-elevated)' }}
      >
        <span className="text-xs font-mono mr-2" style={{ color: 'var(--fg-muted)' }}>Notes</span>
        <button
          onClick={() => setMode('edit')}
          className="px-3 py-1 text-xs rounded-[var(--radius-sm)] transition-colors duration-100"
          style={{
            backgroundColor: mode === 'edit' ? 'var(--border-hover)' : 'transparent',
            color: mode === 'edit' ? 'var(--fg)' : 'var(--fg-muted)',
            minHeight: '44px',
          }}
        >
          Edit
        </button>
        <button
          onClick={() => setMode('preview')}
          className="px-3 py-1 text-xs rounded-[var(--radius-sm)] transition-colors duration-100"
          style={{
            backgroundColor: mode === 'preview' ? 'var(--border-hover)' : 'transparent',
            color: mode === 'preview' ? 'var(--fg)' : 'var(--fg-muted)',
            minHeight: '44px',
          }}
        >
          Preview
        </button>
      </div>

      {/* Content */}
      {mode === 'edit' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Add notes in markdown…"
          rows={8}
          aria-label="Phase notes (Markdown supported)"
          className="w-full resize-y p-4 text-sm font-mono bg-transparent outline-none"
          style={{
            color: 'var(--fg)',
            caretColor: 'var(--fg)',
            minHeight: '160px',
          }}
        />
      ) : (
        <div className="p-4 min-h-[160px]">
          {value.trim() ? (
            <Markdown content={value} />
          ) : (
            <p className="text-sm italic" style={{ color: 'var(--fg-muted)' }}>
              Nothing to preview yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
