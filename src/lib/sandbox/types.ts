export type RunOutcome =
  | { kind: 'pass' }
  | { kind: 'fail'; expected: string; actual: string }
  | { kind: 'error'; message: string }
  | { kind: 'pending' };

export interface SandboxProps {
  starterCode: string;
  expectedOutput?: string;
  assertions?: string;
  onResult?: (outcome: RunOutcome) => void;
  language: 'python' | 'csharp' | 'typescript' | 'rust' | 'fsharp' | 'go';
}

/**
 * Compare sandbox output robustly — trims leading/trailing whitespace on both
 * sides so that language runtimes that add a trailing newline (Rust println!,
 * Go fmt.Println, etc.) match expectedOutput strings that were written without
 * one.
 */
export function outputsMatch(actual: string, expected: string): boolean {
  return actual.trim() === expected.trim();
}
