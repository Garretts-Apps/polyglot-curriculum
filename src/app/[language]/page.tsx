import { notFound } from 'next/navigation';
import { LANGUAGES } from '@/curriculum/types';
import { AppShell } from '@/components/layout/AppShell';
import { LanguagePageClient } from './LanguagePageClient';

type Props = {
  params: Promise<{ language: string }>;
};

export default async function LanguagePage({ params }: Props) {
  const { language } = await params;

  const langMeta = LANGUAGES.find((l) => l.id === language);
  if (!langMeta) notFound();

  return (
    <AppShell>
      <LanguagePageClient langMeta={langMeta} />
    </AppShell>
  );
}

export function generateStaticParams() {
  return LANGUAGES.map((l) => ({ language: l.id }));
}
