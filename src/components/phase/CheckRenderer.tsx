'use client';

import type { KnowledgeCheck, Language } from '@/curriculum/types';
import type { CheckResult } from '@/lib/storage';
import { MultipleChoiceCheck } from './MultipleChoiceCheck';
import { CodeTerminalCheck } from './CodeTerminalCheck';

interface CheckRendererProps {
  check: KnowledgeCheck;
  language: Language;
  checkResult?: CheckResult;
  onResult: (checkId: string, status: 'pass' | 'fail') => void;
}

export function CheckRenderer({
  check,
  language,
  checkResult,
  onResult,
}: CheckRendererProps) {
  if (check.kind === 'code') {
    return (
      <CodeTerminalCheck
        check={check}
        language={language}
        checkResult={checkResult}
        onResult={onResult}
      />
    );
  }

  return (
    <MultipleChoiceCheck
      check={check}
      checkResult={checkResult}
      onResult={onResult}
    />
  );
}
