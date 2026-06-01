import type { Phase, Language } from './types';
import { pythonPhases } from './python';
import { csharpPhases } from './csharp';
import { typescriptPhases } from './typescript';
import { rustPhases } from './rust';
import { fsharpPhases } from './fsharp';
import { goPhases } from './go';
import { rubyPhases } from './ruby';
import { javascriptPhases } from './javascript';
import { typescriptJsPhases } from './typescript-js';
import { javaPhases } from './java';
import { zigPhases } from './zig';
import { lispPhases } from './lisp';
import { luaPhases } from './lua';
import { cPhases } from './c';
import { cppPhases } from './cpp';
import { tsqlPhases } from './tsql';
import { postgresqlPhases } from './postgresql';
import { haskellPhases } from './haskell';
import { assemblyPhases } from './assembly';

const PHASES_BY_LANGUAGE: Record<Language, Phase[]> = {
  python: pythonPhases,
  csharp: csharpPhases,
  typescript: typescriptPhases,
  rust: rustPhases,
  fsharp: fsharpPhases,
  go: goPhases,
  ruby: rubyPhases,
  javascript: javascriptPhases,
  'typescript-js': typescriptJsPhases,
  java: javaPhases,
  zig: zigPhases,
  lisp: lispPhases,
  lua: luaPhases,
  c: cPhases,
  cpp: cppPhases,
  tsql: tsqlPhases,
  postgresql: postgresqlPhases,
  haskell: haskellPhases,
  assembly: assemblyPhases,
};

export function getPhasesForLanguage(language: Language): Phase[] {
  return PHASES_BY_LANGUAGE[language] ?? [];
}

export function getAllPhases(): Phase[] {
  return Object.values(PHASES_BY_LANGUAGE).flat();
}
