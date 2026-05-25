import type { Phase, Language } from './types';
import { pythonPhases } from './python';
import { csharpPhases } from './csharp';
import { typescriptPhases } from './typescript';
import { rustPhases } from './rust';
import { fsharpPhases } from './fsharp';
import { goPhases } from './go';

const PHASES_BY_LANGUAGE: Record<Language, Phase[]> = {
  python: pythonPhases,
  csharp: csharpPhases,
  typescript: typescriptPhases,
  rust: rustPhases,
  fsharp: fsharpPhases,
  go: goPhases,
};

export function getPhasesForLanguage(language: Language): Phase[] {
  return PHASES_BY_LANGUAGE[language] ?? [];
}
