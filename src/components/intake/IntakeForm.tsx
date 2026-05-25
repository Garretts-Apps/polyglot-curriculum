'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LANGUAGES } from '@/curriculum/types';
import type { Language } from '@/curriculum/types';
import type { IntakeAnswers } from '@/lib/storage';
import { Button } from '@/components/ui/Button';
import { useProgress } from '@/lib/use-progress';

type LevelMap = Record<Language, number>;

const ALL_LANGS = LANGUAGES.map((l) => l.id);

const RANK_OPTIONS = ['1st', '2nd', '3rd', '4th', '5th', '6th'];

export function IntakeForm() {
  const router = useRouter();
  const { setIntake } = useProgress();

  // Build default start levels from LANGUAGES metadata
  const defaultStart = Object.fromEntries(
    LANGUAGES.map((l) => [l.id, l.defaultStartLevel]),
  ) as LevelMap;

  const defaultTarget = Object.fromEntries(
    LANGUAGES.map((l) => [l.id, Math.max(l.defaultStartLevel + 1, 4)]),
  ) as LevelMap;

  const [startLevels, setStartLevels] = useState<LevelMap>(defaultStart);
  const [targetLevels, setTargetLevels] = useState<LevelMap>(defaultTarget);
  const [weeklyHours, setWeeklyHours] = useState(8);
  // priorities: index = language, value = rank position (0-based)
  const [priorities, setPriorities] = useState<Language[]>(ALL_LANGS);
  const [errors, setErrors] = useState<Record<Language, string | undefined>>(
    {} as Record<Language, string | undefined>,
  );

  function validateAndSubmit() {
    const newErrors = {} as Record<Language, string | undefined>;
    let hasError = false;
    for (const lang of ALL_LANGS) {
      if ((targetLevels[lang] ?? 0) <= (startLevels[lang] ?? 0)) {
        newErrors[lang] = 'Target must be at least 1 above current level';
        hasError = true;
      }
    }
    setErrors(newErrors);
    if (hasError) return;

    const intake: IntakeAnswers = {
      startLevels,
      targetLevels,
      weeklyHours,
      priorities,
      completedAt: new Date().toISOString(),
    };
    setIntake(intake);
    router.push('/');
  }

  function handleRankChange(lang: Language, rankIdx: number) {
    // Swap the language currently at rankIdx with lang's current position
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
    <div className="space-y-10">
      {/* Language levels */}
      <section>
        <h2
          className="text-base font-semibold mb-5"
          style={{ color: 'var(--fg)', fontFamily: 'var(--font-display)' }}
        >
          Set your level per language
        </h2>
        <div className="space-y-6">
          {LANGUAGES.map((lang) => (
            <div key={lang.id} className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: `var(${lang.accentVar})` }}
                  aria-hidden="true"
                />
                <h3 className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>
                  {lang.name}
                </h3>
                <span className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                  {lang.blurb}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Current level */}
                <div>
                  <label
                    htmlFor={`start-${lang.id}`}
                    className="block text-xs mb-1"
                    style={{ color: 'var(--fg-muted)' }}
                  >
                    Current level: <strong style={{ color: 'var(--fg)' }}>{startLevels[lang.id]}</strong>
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
                      // Auto-bump target if needed
                      if (targetLevels[lang.id] <= val) {
                        setTargetLevels((prev) => ({ ...prev, [lang.id]: val + 1 }));
                      }
                      setErrors((prev) => ({ ...prev, [lang.id]: undefined }));
                    }}
                    className="w-full accent-[var(--fg)]"
                    style={{ accentColor: `var(${lang.accentVar})` }}
                  />
                  <div className="flex justify-between text-xs mt-0.5" style={{ color: 'var(--fg-muted)' }}>
                    <span>0</span><span>10</span>
                  </div>
                </div>

                {/* Target level */}
                <div>
                  <label
                    htmlFor={`target-${lang.id}`}
                    className="block text-xs mb-1"
                    style={{ color: 'var(--fg-muted)' }}
                  >
                    Target level: <strong style={{ color: `var(${lang.accentVar})` }}>{targetLevels[lang.id]}</strong>
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
                      setErrors((prev) => ({ ...prev, [lang.id]: undefined }));
                    }}
                    style={{ accentColor: `var(${lang.accentVar})` }}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs mt-0.5" style={{ color: 'var(--fg-muted)' }}>
                    <span>1</span><span>10</span>
                  </div>
                </div>
              </div>

              {errors[lang.id] && (
                <p className="mt-2 text-xs" style={{ color: '#ef4444' }}>
                  {errors[lang.id]}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Weekly hours */}
      <section>
        <h2
          className="text-base font-semibold mb-3"
          style={{ color: 'var(--fg)', fontFamily: 'var(--font-display)' }}
        >
          Study time per week
        </h2>
        <div className="flex items-center gap-3">
          <input
            id="weekly-hours"
            type="number"
            min={1}
            max={80}
            value={weeklyHours}
            onChange={(e) => setWeeklyHours(Math.max(1, Number(e.target.value)))}
            className="w-24 rounded-[var(--radius-md)] border px-3 py-2 text-sm bg-transparent text-center"
            style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
          />
          <label htmlFor="weekly-hours" className="text-sm" style={{ color: 'var(--fg-muted)' }}>
            hours / week
          </label>
        </div>
      </section>

      {/* Priority ranking */}
      <section>
        <h2
          className="text-base font-semibold mb-3"
          style={{ color: 'var(--fg)', fontFamily: 'var(--font-display)' }}
        >
          Language priority
        </h2>
        <p className="text-xs mb-4" style={{ color: 'var(--fg-muted)' }}>
          Assign each language a rank from 1st (highest) to 6th (lowest).
        </p>
        <div className="space-y-2">
          {LANGUAGES.map((lang) => {
            const currentRank = priorities.indexOf(lang.id);
            return (
              <div key={lang.id} className="flex items-center gap-3">
                <label
                  htmlFor={`rank-${lang.id}`}
                  className="w-24 text-sm"
                  style={{ color: 'var(--fg)' }}
                >
                  {lang.name}
                </label>
                <select
                  id={`rank-${lang.id}`}
                  value={currentRank}
                  onChange={(e) => handleRankChange(lang.id, Number(e.target.value))}
                  className="rounded-[var(--radius-md)] border px-2 py-1.5 text-sm bg-[var(--bg-elevated)] cursor-pointer"
                  style={{ borderColor: 'var(--border)', color: 'var(--fg)', minHeight: '44px' }}
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
      <div className="pt-2">
        <Button onClick={validateAndSubmit} variant="primary" size="lg">
          Save and start learning
        </Button>
      </div>
    </div>
  );
}
