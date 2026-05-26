'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LANGUAGES } from '@/curriculum/types';
import type { Language } from '@/curriculum/types';
import type { IntakeAnswers } from '@/lib/storage';
import { Button } from '@/components/ui/Button';
import { BlockProgress } from '@/components/ui/BlockProgress';
import { LanguagePill } from '@/components/ui/LanguagePill';
import { ShellPrompt } from '@/components/ui/ShellPrompt';
import { useProgress } from '@/lib/use-progress';

type LevelMap = Record<Language, number>;

const ALL_LANGS = LANGUAGES.map((l) => l.id);
const RANK_OPTIONS = ['1st', '2nd', '3rd', '4th', '5th', '6th'];

interface IntakeFormProps {
  existing?: IntakeAnswers;
}

export function IntakeForm({ existing }: IntakeFormProps) {
  const router = useRouter();
  const { setIntake } = useProgress();

  const defaultStart = Object.fromEntries(
    LANGUAGES.map((l) => [l.id, existing?.startLevels[l.id] ?? l.defaultStartLevel]),
  ) as LevelMap;

  const defaultTarget = Object.fromEntries(
    LANGUAGES.map((l) => [l.id, existing?.targetLevels[l.id] ?? Math.max(l.defaultStartLevel + 1, 4)]),
  ) as LevelMap;

  const [startLevels, setStartLevels] = useState<LevelMap>(defaultStart);
  const [targetLevels, setTargetLevels] = useState<LevelMap>(defaultTarget);
  const [weeklyHours, setWeeklyHours] = useState(existing?.weeklyHours ?? 8);
  const [priorities, setPriorities] = useState<Language[]>(
    existing?.priorities ?? ALL_LANGS,
  );

  function validateAndSubmit() {
    const intake: IntakeAnswers = {
      startLevels,
      targetLevels,
      weeklyHours,
      priorities,
      completedAt: existing?.completedAt ?? new Date().toISOString(),
    };
    setIntake(intake);
    router.push('/');
  }

  function handleRankChange(lang: Language, rankIdx: number) {
    const newPriorities = [...priorities];
    const langCurrentIdx = newPriorities.indexOf(lang);
    if (langCurrentIdx < 0) return;
    const displaced = newPriorities[rankIdx];
    if (displaced === undefined) return;
    newPriorities[langCurrentIdx] = displaced;
    newPriorities[rankIdx] = lang;
    setPriorities(newPriorities as Language[]);
  }

  return (
    <div className="space-y-10 font-mono">
      {/* Language levels */}
      <section>
        <h2 className="text-sm font-semibold mb-4">
          <ShellPrompt minimal command=" set --levels-per-language" />
        </h2>
        <div className="space-y-3">
          {LANGUAGES.map((lang) => (
            <div
              key={lang.id}
              className="p-4 border"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-elevated)' }}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 min-w-0">
                  <LanguagePill language={lang.id} name={lang.name.toLowerCase()} />
                  <span
                    className="text-xs truncate"
                    style={{ color: 'var(--fg-muted)' }}
                    title={lang.blurb}
                  >
                    {lang.blurb}
                  </span>
                </div>
                <span className="text-[11px]" style={{ color: 'var(--fg-dim)' }}>
                  L{startLevels[lang.id]}
                  <span style={{ color: 'var(--fg-dim)' }}> → </span>
                  <span style={{ color: `var(--accent-${lang.id})` }}>
                    L{targetLevels[lang.id]}
                  </span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`start-${lang.id}`}
                    className="block text-[11px] mb-1.5"
                    style={{ color: 'var(--fg-muted)' }}
                  >
                    current_level ={' '}
                    <span style={{ color: 'var(--accent-prompt)' }} className="font-semibold">
                      {startLevels[lang.id]}
                    </span>
                  </label>
                  <input
                    id={`start-${lang.id}`}
                    type="range"
                    min={0}
                    max={10}
                    value={startLevels[lang.id]}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setStartLevels((prev) => ({ ...prev, [lang.id]: val }));
                      if (targetLevels[lang.id] <= val) {
                        setTargetLevels((prev) => ({ ...prev, [lang.id]: val + 1 }));
                      }
                    }}
                    className="w-full"
                  />
                  <div className="mt-1">
                    <BlockProgress
                      value={startLevels[lang.id] / 10}
                      color="var(--accent-prompt)"
                      width={20}
                      showPercent={false}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor={`target-${lang.id}`}
                    className="block text-[11px] mb-1.5"
                    style={{ color: 'var(--fg-muted)' }}
                  >
                    target_level ={' '}
                    <span style={{ color: `var(--accent-${lang.id})` }} className="font-semibold">
                      {targetLevels[lang.id]}
                    </span>
                  </label>
                  <input
                    id={`target-${lang.id}`}
                    type="range"
                    min={1}
                    max={10}
                    value={targetLevels[lang.id]}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setTargetLevels((prev) => ({ ...prev, [lang.id]: val }));
                    }}
                    style={{ accentColor: `var(${lang.accentVar})` }}
                    className="w-full"
                  />
                  <div className="mt-1">
                    <BlockProgress
                      value={targetLevels[lang.id] / 10}
                      color={`var(--accent-${lang.id})`}
                      width={20}
                      showPercent={false}
                    />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Weekly hours */}
      <section>
        <h2 className="text-sm font-semibold mb-3">
          <ShellPrompt minimal command=" set --weekly-hours" />
        </h2>
        <div className="flex items-center gap-3">
          <label htmlFor="weekly-hours" className="text-xs" style={{ color: 'var(--fg-muted)' }}>
            hours_per_week =
          </label>
          <input
            id="weekly-hours"
            type="number"
            min={1}
            max={80}
            value={weeklyHours}
            onChange={(e) => setWeeklyHours(Math.max(1, Number(e.target.value)))}
            className="w-20 border px-2 py-1.5 text-sm bg-transparent text-center"
            style={{
              borderColor: 'var(--border-active)',
              color: 'var(--accent-prompt)',
            }}
          />
          <span className="text-xs" style={{ color: 'var(--fg-muted)' }}>
            {/* 1-80 */}
          </span>
        </div>
      </section>

      {/* Priority ranking */}
      <section>
        <h2 className="text-sm font-semibold mb-3">
          <ShellPrompt minimal command=" set --priority-order" />
        </h2>
        <p className="text-xs mb-4" style={{ color: 'var(--fg-muted)' }}>
          {/* rank 1st = highest priority, 6th = lowest */}
        </p>
        <div className="space-y-1">
          {LANGUAGES.map((lang) => {
            const currentRank = priorities.indexOf(lang.id);
            return (
              <div
                key={lang.id}
                className="flex items-center gap-3 py-1.5 px-2 hover:bg-[var(--bg-elevated)] transition-colors"
              >
                <span
                  className="font-mono text-xs w-3 select-none"
                  style={{ color: 'var(--fg-dim)' }}
                  aria-hidden="true"
                >
                  $
                </span>
                <LanguagePill language={lang.id} name={lang.name.toLowerCase()} />
                <span className="flex-1" />
                <label
                  htmlFor={`rank-${lang.id}`}
                  className="text-xs"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  rank =
                </label>
                <select
                  id={`rank-${lang.id}`}
                  value={currentRank}
                  onChange={(e) => handleRankChange(lang.id, Number(e.target.value))}
                  className="border px-2 py-1 text-xs bg-[var(--bg-elevated)] cursor-pointer font-mono"
                  style={{
                    borderColor: 'var(--border-active)',
                    color: 'var(--accent-prompt)',
                    minHeight: '36px',
                  }}
                >
                  {RANK_OPTIONS.map((label, i) => (
                    <option key={i} value={i}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      </section>

      {/* Submit */}
      <div
        className="pt-4 border-t flex items-center justify-between gap-3 flex-wrap"
        style={{ borderColor: 'var(--border)' }}
      >
        <p className="text-xs" style={{ color: 'var(--fg-dim)' }}>
          {'// hit '}<span style={{ color: 'var(--accent-prompt)' }}>[ {existing ? 'save changes' : 'continue'} ]</span>{existing ? ' to update goals · progress preserved' : ' to write /progress'}
        </p>
        <Button onClick={validateAndSubmit} variant="primary" size="lg">
          {existing ? 'save changes →' : 'continue →'}
        </Button>
      </div>
    </div>
  );
}
