'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { LANGUAGES } from '@/curriculum/types';
import type { Language } from '@/curriculum/types';
import { useProgress } from '@/lib/use-progress';
import { exportJson, importJson, resetLanguage, resetAll } from '@/lib/storage';
import { Button } from '@/components/ui/Button';

const APP_VERSION = '1.0.0';

export function SettingsForm() {
  const { state, resetState, updatePhase } = useProgress();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const intake = state.intake;

  function handleExport() {
    const json = exportJson(state);
    const date = new Date().toISOString().slice(0, 10);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `polyglot-curriculum-progress-${date}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      processImport(text);
    };
    reader.readAsText(file);
  }

  function processImport(text: string) {
    const parsed = importJson(text);
    if (!parsed) {
      setImportError('Invalid or incompatible progress file.');
      setImportSuccess(false);
      return;
    }
    resetState(parsed);
    setImportError(null);
    setImportSuccess(true);
  }

  function handleResetLanguage(lang: Language) {
    const next = resetLanguage(state, lang);
    resetState(next);
  }

  function handleResetAll() {
    if (window.confirm('Reset ALL progress? This cannot be undone.')) {
      resetState(resetAll());
    }
  }

  function handleTargetChange(lang: Language, val: number) {
    if (!intake) return;
    const startLevel = intake.startLevels[lang] ?? 0;
    if (val <= startLevel) return;
    // We patch only the intake portion via setIntake equivalent — use resetState with merged intake
    const newIntake = {
      ...intake,
      targetLevels: { ...intake.targetLevels, [lang]: val },
    };
    resetState({ ...state, intake: newIntake });
  }

  return (
    <div className="space-y-12">
      {/* Intake link */}
      <section>
        <h2 className="text-base font-semibold mb-3" style={{ color: 'var(--fg)', fontFamily: 'var(--font-display)' }}>
          Intake
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--fg-muted)' }}>
          {intake ? 'Your intake is complete.' : 'You have not completed intake yet.'}
        </p>
        <Button as="link" href="/intake" variant="secondary" size="sm">
          {intake ? 'Edit intake answers' : 'Complete intake'}
        </Button>
      </section>

      {/* Target levels */}
      {intake && (
        <section>
          <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--fg)', fontFamily: 'var(--font-display)' }}>
            Target levels
          </h2>
          <div className="space-y-4">
            {LANGUAGES.map((lang) => {
              const startLevel = intake.startLevels[lang.id] ?? 0;
              const targetLevel = intake.targetLevels[lang.id] ?? 4;
              return (
                <div key={lang.id} className="flex items-center gap-4">
                  <span className="w-28 text-sm shrink-0" style={{ color: 'var(--fg)' }}>
                    {lang.name}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                    Current: {startLevel}
                  </span>
                  <div className="flex items-center gap-2 flex-1">
                    <label htmlFor={`tgt-${lang.id}`} className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                      Target:
                    </label>
                    <input
                      id={`tgt-${lang.id}`}
                      type="range"
                      min={startLevel + 1}
                      max={10}
                      value={targetLevel}
                      onChange={(e) => handleTargetChange(lang.id, Number(e.target.value))}
                      style={{ accentColor: `var(${lang.accentVar})`, flex: 1 }}
                    />
                    <span
                      className="text-xs font-mono w-4 text-right"
                      style={{ color: `var(${lang.accentVar})` }}
                    >
                      {targetLevel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Reset per language */}
      <section>
        <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--fg)', fontFamily: 'var(--font-display)' }}>
          Reset progress
        </h2>
        <div className="space-y-2 mb-6">
          {LANGUAGES.map((lang) => (
            <div key={lang.id} className="flex items-center justify-between gap-4 py-2 border-b" style={{ borderColor: 'var(--border)' }}>
              <span className="text-sm" style={{ color: 'var(--fg)' }}>{lang.name}</span>
              <button
                onClick={() => handleResetLanguage(lang.id)}
                className="text-xs px-3 py-1.5 rounded-[var(--radius-md)] border transition-colors hover:bg-[var(--bg-elevated)]"
                style={{ borderColor: 'var(--border)', color: 'var(--fg-muted)', minHeight: '44px' }}
              >
                Reset {lang.name}
              </button>
            </div>
          ))}
        </div>
        <Button onClick={handleResetAll} variant="secondary" size="sm">
          Reset ALL progress
        </Button>
      </section>

      {/* Export */}
      <section>
        <h2 className="text-base font-semibold mb-3" style={{ color: 'var(--fg)', fontFamily: 'var(--font-display)' }}>
          Export
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--fg-muted)' }}>
          Download your progress as a JSON file.
        </p>
        <Button onClick={handleExport} variant="secondary" size="sm">
          Export progress JSON
        </Button>
      </section>

      {/* Import */}
      <section>
        <h2 className="text-base font-semibold mb-3" style={{ color: 'var(--fg)', fontFamily: 'var(--font-display)' }}>
          Import
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--fg-muted)' }}>
          Restore progress from a previously exported file.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleImportFile}
          className="sr-only"
          id="import-file"
        />
        <label
          htmlFor="import-file"
          className="inline-flex items-center gap-2 cursor-pointer px-4 py-2 rounded-[var(--radius-md)] border text-sm font-medium transition-colors hover:bg-[var(--bg-elevated)]"
          style={{ borderColor: 'var(--border)', color: 'var(--fg)', minHeight: '44px' }}
        >
          Choose file to import
        </label>
        {importError && (
          <p className="mt-2 text-sm" style={{ color: '#ef4444' }}>{importError}</p>
        )}
        {importSuccess && (
          <p className="mt-2 text-sm" style={{ color: '#22c55e' }}>Progress imported successfully.</p>
        )}
      </section>

      {/* Version */}
      <footer className="pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <p className="text-xs font-mono" style={{ color: 'var(--fg-muted)' }}>
          Polyglot Curriculum v{APP_VERSION}
        </p>
      </footer>
    </div>
  );
}
