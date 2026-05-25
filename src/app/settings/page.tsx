import { AppShell } from '@/components/layout/AppShell';
import { SettingsForm } from '@/components/settings/SettingsForm';

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-8 py-10">
        <header className="mb-10">
          <h1
            className="font-serif font-semibold mb-2"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              letterSpacing: '-0.025em',
              color: 'var(--fg)',
            }}
          >
            Settings
          </h1>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
            Manage your preferences, progress, and data.
          </p>
        </header>

        <SettingsForm />
      </div>
    </AppShell>
  );
}
