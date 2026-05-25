'use client';

import { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { rust } from '@codemirror/lang-rust';
import { go } from '@codemirror/lang-go';

export type EditorLanguage = 'python' | 'typescript' | 'rust' | 'go' | 'csharp' | 'fsharp';

interface CodeEditorProps {
  language: EditorLanguage;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

function getLanguageExtension(lang: EditorLanguage) {
  switch (lang) {
    case 'python':
      return python();
    case 'typescript':
      return javascript({ typescript: true });
    case 'rust':
      return rust();
    case 'go':
      return go();
    case 'csharp':
    case 'fsharp':
      return javascript();
  }
}

export default function CodeEditor({ language, value, onChange, readOnly = false }: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const startState = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        oneDark,
        getLanguageExtension(language),
        EditorView.lineWrapping,
        EditorState.readOnly.of(readOnly),
        EditorView.theme({
          '&': {
            backgroundColor: 'var(--bg-elevated)',
            color: 'var(--fg)',
          },
          '.cm-content': {
            fontFamily: 'var(--font-mono)',
            caretColor: 'var(--accent-prompt)',
            padding: '12px 0',
          },
          '.cm-cursor, .cm-dropCursor': {
            borderLeftColor: 'var(--accent-prompt)',
            borderLeftWidth: '2px',
          },
          '.cm-gutters': {
            backgroundColor: 'var(--bg)',
            borderRight: '1px solid var(--border)',
            color: 'var(--fg-dim)',
          },
          '.cm-activeLine, .cm-activeLineGutter': {
            backgroundColor: 'color-mix(in srgb, var(--accent-prompt) 4%, transparent)',
          },
          '.cm-selectionBackground, ::selection': {
            backgroundColor: 'color-mix(in srgb, var(--accent-prompt) 25%, transparent) !important',
          },
        }),
        ...(onChange
          ? [
              EditorView.updateListener.of((update) => {
                if (update.docChanged) {
                  onChange(update.state.doc.toString());
                }
              }),
            ]
          : []),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: containerRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== value) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      });
    }
  }, [value]);

  return (
    <>
      <div
        ref={containerRef}
        aria-label={`${language} code editor`}
        className="w-full overflow-auto text-sm"
        style={{
          fontFamily: 'var(--font-mono)',
          minHeight: '220px',
          backgroundColor: 'var(--bg-elevated)',
        }}
      />
      <p
        className="text-[10px] px-3 py-1 font-mono"
        style={{
          color: 'var(--fg-dim)',
          borderTop: '1px solid var(--border)',
          backgroundColor: 'var(--bg-overlay)',
        }}
      >
        {'// a11y: press Escape then Tab to exit the editor'}
      </p>
    </>
  );
}
