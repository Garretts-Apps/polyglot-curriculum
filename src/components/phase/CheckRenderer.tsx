'use client';

import type { KnowledgeCheck } from '@/curriculum/types';
import type { CheckResult } from '@/lib/storage';
import { MultipleChoiceCheck } from './MultipleChoiceCheck';

interface CheckRendererProps {
  check: KnowledgeCheck;
  checkResult?: CheckResult;
  onResult: (checkId: string, status: 'pass' | 'fail') => void;
}

export function CheckRenderer({ check, checkResult, onResult }: CheckRendererProps) {
  return (
    <MultipleChoiceCheck
      check={check}
      checkResult={checkResult}
      onResult={onResult}
    />
  );
}
