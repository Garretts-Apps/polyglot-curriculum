import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { getAllPhases } from '@/curriculum/phases';
import { LANGUAGES } from '@/curriculum/types';
import { PHASE_BADGES } from '@/curriculum/badges';
import { CertViewer } from './CertViewer';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ id: string }>;
}

type Credential = {
  id: string;
  language: string;
  phase_level: number;
  earner_handle: string;
  issued_at: string;
};

async function getCredential(id: string): Promise<Credential | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('credentials')
    .select('id, language, phase_level, earner_handle, issued_at')
    .eq('id', id)
    .maybeSingle();
  return data ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const credential = await getCredential(id);
  if (!credential) return { title: 'Credential Not Found — polyglot@terminal' };

  const badge = PHASE_BADGES[`${credential.language}-${credential.phase_level}`];
  const langMeta = LANGUAGES.find((l) => l.id === credential.language);
  const title = badge?.title ?? `${langMeta?.name ?? credential.language} Phase ${credential.phase_level}`;

  return {
    title: `${title} — polyglot@terminal`,
    description: `${credential.earner_handle} demonstrated: ${badge?.skills.join('; ') ?? title}`,
    openGraph: {
      title: `${title} — polyglot@terminal`,
      description: badge?.skills[0] ?? title,
      siteName: 'polyglot@terminal',
    },
  };
}

export default async function CertPage({ params }: Props) {
  const { id } = await params;
  const credential = await getCredential(id);
  if (!credential) notFound();

  const phase = getAllPhases().find(
    (p) => p.language === credential.language && p.level === credential.phase_level
  );
  const langMeta = LANGUAGES.find((l) => l.id === credential.language);
  const badge = PHASE_BADGES[`${credential.language}-${credential.phase_level}`];

  return (
    <CertViewer
      credentialId={credential.id}
      earnerHandle={credential.earner_handle}
      issuedAt={credential.issued_at}
      languageName={langMeta?.name ?? credential.language}
      languageAccentVar={langMeta?.accentVar ?? '--accent-prompt'}
      phaseTitle={badge?.title ?? phase?.title ?? `Phase ${credential.phase_level}`}
      skills={badge?.skills ?? []}
    />
  );
}
