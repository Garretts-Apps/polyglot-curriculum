'use client';

import { useRef, useState } from 'react';
import { LANGUAGES } from '@/curriculum/types';
import type { Language } from '@/curriculum/types';
import { useProgress } from '@/lib/use-progress';
import { exportJson, importJson, resetLanguage, resetAll } from '@/lib/storage';
import { Button } from '@/components/ui/Button';
import { LanguagePill } from '@/components/ui/LanguagePill';
import { ShellPrompt } from '@/components/ui/ShellPrompt';
import { BlockProgress } from '@/components/ui/BlockProgress';
import { StatusTag } from '@/components/ui/StatusTag';

const APP_VERSION = '1.0.0';

export function SettingsForm() {
  const { state, resetState } = useProgress();
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
    const newIntake = {
      ...intake,
      targetLevels: { ...intake.targetLevels, [lang]: val },
    };
    resetState({ ...state, intake: newIntake });
  }

  return (
    <div className="space-y-10 font-mono">
      {/* Intake */}
      <section>
        <h2 className="text-sm font-semibold mb-3">
          <ShellPrompt minimal command=" cat intake.lock" />
        </h2>
        <div
          className="p-4 border flex items-center justify-between flex-wrap gap-3"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-elevated)' }}
        >
          <div className="flex items-center gap-3">
            <StatusTag status={intake ? 'ok' : 'pending'} />
            <span className="text-sm" style={{ color: 'var(--fg)' }}>
              {intake
                ? `initialized ${new Date(intake.completedAt).toLocaleDateString()}`
                : 'not initialized'}
            </span>
          </div>
          <Button as="link" href="/intake" variant="secondary" size="sm">
            {intake ? 'edit intake' : 'run intake'}
          </Button>
        </div>
      </section>

      {/* Target levels */}
      {intake && (
        <section>
          <h2 className="text-sm font-semibold mb-3">
            <ShellPrompt minimal command=" set --target-levels" />
          </h2>
          <div className="space-y-2">
            {LANGUAGES.map((lang) => {
              const startLevel = intake.startLevels[lang.id] ?? 0;
              const targetLevel = intake.targetLevels[lang.id] ?? 4;
              return (
                <div
                  key={lang.id}
                  className="flex items-center gap-3 py-2 px-3 hover:bg-[var(--bg-elevated)] transition-colors"
                >
                  <LanguagePill language={lang.id} name={lang.name.toLowerCase()} />
                  <span className="text-[11px]" style={{ color: 'var(--fg-dim)' }}>
                    L{startLevel}
                    <span style={{ color: 'var(--fg-dim)' }}> → </span>
                    <span style={{ color: `var(--accent-${lang.id})` }}>
                      L{targetLevel}
                    </span>
                  </span>
                  <input
                    id={`tgt-${lang.id}`}
                    aria-label={`target level for ${lang.name}`}
                    type="range"
                    min={startLevel + 1}
                    max={10}
                    value={targetLevel}
                    onChange={(e) => handleTargetChange(lang.id, Number(e.target.value))}
                    className="flex-1"
                    style={{ accentColor: `var(${lang.accentVar})` }}
                  />
                  <BlockProgress
                    value={targetLevel / 10}
                    color={`var(--accent-${lang.id})`}
                    width={10}
                    showPercent={false}
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Reset per language */}
      <section>
        <h2 className="text-sm font-semibold mb-3">
          <ShellPrompt minimal command=" rm -rf ~/progress/<lang>" />
        </h2>
        <div
          className="border"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-elevated)' }}
        >
          {LANGUAGES.map((lang, idx) => (
            <div
              key={lang.id}
              className="flex items-center justify-between gap-3 px-3 py-2"
              style={{
                borderTop: idx === 0 ? 'none' : '1px solid var(--border)',
              }}
            >
              <LanguagePill language={lang.id} name={lang.name.toLowerCase()} />
              <Button onClick={() => handleResetLanguage(lang.id)} variant="ghost" size="sm">
                rm --recursive
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <Button onClick={handleResetAll} variant="danger" size="sm">
            rm -rf /progress
          </Button>
        </div>
      </section>

      {/* Export */}
      <section>
        <h2 className="text-sm font-semibold mb-3">
          <ShellPrompt minimal command=" progress > backup.json" />
        </h2>
        <p className="text-xs mb-3" style={{ color: 'var(--fg-muted)' }}>
          // dump current progress to a portable JSON file
        </p>
        <Button onClick={handleExport} variant="secondary" size="sm">
          export progress.json
        </Button>
      </section>

      {/* Import */}
      <section>
        <h2 className="text-sm font-semibold mb-3">
          <ShellPrompt minimal command=" cat backup.json | restore" />
        </h2>
        <p className="text-xs mb-3" style={{ color: 'var(--fg-muted)' }}>
          // restore progress from a previously exported file
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
          className={[
            'inline-flex items-center justify-center gap-1.5 cursor-pointer',
            'font-mono font-medium leading-none tracking-wide',
            'px-3 py-2 text-sm min-h-[38px] border',
            'border-[var(--border-active)] text-[var(--fg)]',
            'hover:border-[var(--accent-prompt)] hover:text-[var(--accent-prompt)]',
            'transition-colors duration-100',
          ].join(' ')}
        >
          <span aria-hidden="true" className="opacity-60">
            [
          </span>
          <span className="px-0.5">choose file</span>
          <span aria-hidden="true" className="opacity-60">
            ]
          </span>
        </label>
        {importError && (
          <p
            className="mt-3 text-xs flex items-center gap-2"
            style={{ color: 'var(--accent-error)' }}
            role="alert"
          >
            <StatusTag status="fail" />
            {importError}
          </p>
        )}
        {importSuccess && (
          <p
            className="mt-3 text-xs flex items-center gap-2"
            style={{ color: 'var(--accent-prompt)' }}
            role="status"
          >
            <StatusTag status="ok" />
            progress restored
          </p>
        )}
      </section>

      {/* Version footer */}
      <footer
        className="pt-4 border-t flex items-center justify-between gap-3"
        style={{ borderColor: 'var(--border)' }}
      >
        <p className="text-[11px]" style={{ color: 'var(--fg-dim)' }}>
          $ polyglot-curriculum --version
        </p>
        <p className="text-[11px]" style={{ color: 'var(--accent-prompt)' }}>
          v{APP_VERSION}
        </p>
      </footer>
    </div>
  );
}
