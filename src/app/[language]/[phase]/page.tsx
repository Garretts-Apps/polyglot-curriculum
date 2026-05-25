import { notFound } from 'next/navigation';
import { LANGUAGES } from '@/curriculum/types';
import { AppShell } from '@/components/layout/AppShell';
import { PhaseView } from '@/components/phase/PhaseView';
import { getPhasesForLanguage } from '@/curriculum/phases';

type Props = {
  params: Promise<{ language: string; phase: string }>;
};

export default async function PhasePage({ params }: Props) {
  const { language, phase: phaseParam } = await params;

  const langMeta = LANGUAGES.find((l) => l.id === language);
  if (!langMeta) notFound();

  if (!/^\d+$/.test(phaseParam)) notFound();
  const phaseLevel = parseInt(phaseParam, 10);
  if (isNaN(phaseLevel)) notFound();

  const phases = getPhasesForLanguage(langMeta.id);
  const phase = phases.find((p) => p.level === phaseLevel);
  if (!phase) notFound();

  return (
    <AppShell>
      <PhaseView phase={phase} langMeta={langMeta} />
    </AppShell>
  );
}

export function generateStaticParams() {
  const out: { language: string; phase: string }[] = [];
  for (const lang of LANGUAGES) {
    const phases = getPhasesForLanguage(lang.id);
    for (const p of phases) {
      out.push({ language: lang.id, phase: String(p.level) });
    }
  }
  return out;
}
