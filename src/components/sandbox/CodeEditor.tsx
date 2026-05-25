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
    // No dedicated CodeMirror extension for C# or F#; fall back to JS highlighting
    case 'csharp':
    case 'fsharp':
      return javascript();
  }
}

export default function CodeEditor({ language, value, onChange, readOnly = false }: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  // Initialize editor once
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
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync external value changes (e.g. reset) without re-creating the editor
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
    <div
      ref={containerRef}
      className="w-full overflow-auto rounded border border-[var(--border)] text-sm"
      style={{ fontFamily: 'var(--font-mono)', minHeight: '200px' }}
    />
  );
}
