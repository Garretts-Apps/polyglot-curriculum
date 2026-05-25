'use client';

import type { KnowledgeCheck } from '@/curriculum/types';
import type { Language } from '@/curriculum/types';
import type { CheckResult } from '@/lib/storage';
import { MultipleChoiceCheck } from './MultipleChoiceCheck';
import { CodeTaskCheck } from './CodeTaskCheck';

interface CheckRendererProps {
  check: KnowledgeCheck;
  language: Language;
  checkResult?: CheckResult;
  onResult: (checkId: string, status: 'pass' | 'fail') => void;
}

export function CheckRenderer({ check, language, checkResult, onResult }: CheckRendererProps) {
  if (check.kind === 'mcq') {
    return (
      <MultipleChoiceCheck
        check={check}
        checkResult={checkResult}
        onResult={onResult}
      />
    );
  }
  if (check.kind === 'code') {
    return (
      <CodeTaskCheck
        check={check}
        language={language}
        checkResult={checkResult}
        onResult={onResult}
      />
    );
  }
  return null;
}
