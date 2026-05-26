import type { ProgressState } from './storage';
import type { Language } from '@/curriculum/types';
import { getPhasesForLanguage } from '@/curriculum/phases';

export interface GamificationStats {
  xp: number;
  streak: number;
  rank: string;
  rankIndex: number;
  nextRankXp: number;
  prevRankXp: number;
  percentToNext: number;
}

const RANKS = [
  { name: 'guest@polyglot', xp: 0 },
  { name: 'script-kiddie', xp: 1 },
  { name: 'byte-hacker', xp: 250 },
  { name: 'stack-pointer', xp: 750 },
  { name: 'buffer-overflow', xp: 1500 },
  { name: 'kernel-panic', xp: 3000 },
  { name: 'shellcode-wizard', xp: 5000 },
  { name: 'garbage-collector', xp: 8000 },
  { name: 'compiler-compiler', xp: 12000 },
  { name: 'category-theorist', xp: 18000 },
  { name: 'root@polyglot', xp: 25000 },
];

const XP_MCQ = 25;
const XP_CODE = 75;
const XP_PHASE = 250;

/**
 * Calculates user gamification metrics dynamically from their progress state.
 * Only checks that currently exist in the curriculum are counted — stale stored
 * results (from removed or renamed checks) are silently ignored.
 */
export function calculateGamification(state: ProgressState): GamificationStats {
  let xp = 0;
  const activeDates = new Set<string>();

  // Build a lookup of every check currently in the curriculum, keyed by check ID.
  // This is the authoritative set — stored results outside this set don't earn XP.
  const checkKindById = new Map<string, 'mcq' | 'code'>();
  const seenLanguages = new Set<Language>();
  for (const progress of Object.values(state.phases)) {
    if (!seenLanguages.has(progress.language)) {
      seenLanguages.add(progress.language);
      for (const phase of getPhasesForLanguage(progress.language)) {
        for (const check of phase.checks) {
          checkKindById.set(check.id, check.kind);
        }
      }
    }
  }

  // 1. Calculate XP & gather activity timestamps
  for (const [, progress] of Object.entries(state.phases)) {
    if (progress.completed) {
      xp += XP_PHASE;
      if (progress.completedAt) {
        const dateStr = progress.completedAt.split('T')[0];
        if (dateStr) activeDates.add(dateStr);
      }
    }

    for (const [, check] of Object.entries(progress.checkResults)) {
      if (check.status !== 'pass') continue;
      const kind = checkKindById.get(check.checkId);
      if (!kind) continue; // orphaned result — check no longer in curriculum

      xp += kind === 'code' ? XP_CODE : XP_MCQ;

      if (check.lastAttemptAt) {
        const dateStr = check.lastAttemptAt.split('T')[0];
        if (dateStr) activeDates.add(dateStr);
      }
    }
  }

  // 2. Calculate Streak
  let streak = 0;
  if (activeDates.size > 0) {
    const sortedDates = Array.from(activeDates).sort();
    const todayStr = new Date().toISOString().split('T')[0];
    
    // Yesterday calculation in local time
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // Find the latest active date
    const latestDateStr = sortedDates[sortedDates.length - 1];
    
    if (latestDateStr === todayStr || latestDateStr === yesterdayStr) {
      streak = 1;
      const curr = new Date(latestDateStr + 'T00:00:00');
      
      // Look back day by day
      while (true) {
        curr.setDate(curr.getDate() - 1);
        const checkStr = curr.toISOString().split('T')[0]!;
        if (activeDates.has(checkStr)) {
          streak++;
        } else {
          break;
        }
      }
    }
  }

  // 3. Determine Rank
  let rankIndex = 0;
  for (let i = 0; i < RANKS.length; i++) {
    const r = RANKS[i];
    if (r && xp >= r.xp) {
      rankIndex = i;
    } else {
      break;
    }
  }

  const currentRank = RANKS[rankIndex] ?? RANKS[0]!;
  const nextRank = RANKS[rankIndex + 1];

  let percentToNext = 100;
  let nextRankXp = currentRank.xp;
  const prevRankXp = currentRank.xp;

  if (nextRank) {
    nextRankXp = nextRank.xp;
    const range = nextRank.xp - currentRank.xp;
    const currentProgress = xp - currentRank.xp;
    percentToNext = Math.min(100, Math.max(0, Math.round((currentProgress / range) * 100)));
  }

  return {
    xp,
    streak,
    rank: currentRank.name,
    rankIndex,
    nextRankXp,
    prevRankXp,
    percentToNext,
  };
}

/**
 * Generates contextual reminder texts to motivate users.
 */
export function getContextualReminder(state: ProgressState): { title: string; body: string } {
  const stats = calculateGamification(state);
  
  // Find highest level incomplete phase to encourage resuming it
  let targetLang: Language = 'python';
  let targetLevel = 1;
  let highestCompletedLevel = 0;

  for (const [, progress] of Object.entries(state.phases)) {
    if (progress.completed) {
      highestCompletedLevel = Math.max(highestCompletedLevel, progress.level);
    } else {
      targetLang = progress.language;
      targetLevel = progress.level;
    }
  }

  const langNames: Record<Language, string> = {
    python: 'Python',
    typescript: 'TypeScript',
    go: 'Go',
    rust: 'Rust',
    csharp: 'C#',
    fsharp: 'F#',
  };

  const name = langNames[targetLang] || 'coding';

  if (stats.streak > 0) {
    return {
      title: 'Keep the Streak Alive! 🔥',
      body: `Your ${stats.streak}-day coding streak is active. Solve a task in ${name} to level up your ${stats.rank} rank!`,
    };
  }

  if (highestCompletedLevel > 0) {
    return {
      title: 'Resume your learning path 💻',
      body: `You are currently a ${stats.rank}. Hop back in and check out Level ${targetLevel} of ${name}!`,
    };
  }

  return {
    title: 'Start your polyglot coding quest! 🚀',
    body: 'Complete your first Level 0 hello-world or quiz to begin earning XP and ranking up.',
  };
}
