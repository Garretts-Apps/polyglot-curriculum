import { AppShell } from '@/components/layout/AppShell';
import { SettingsForm } from '@/components/settings/SettingsForm';
import { ShellPrompt } from '@/components/ui/ShellPrompt';

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-2xl px-3 sm:px-6 py-8 sm:py-12">
        <header className="mb-8">
          <h1
            className="text-xl sm:text-2xl font-semibold mb-2"
            style={{ color: 'var(--fg)' }}
          >
            <ShellPrompt minimal command=" config --edit" />
          </h1>
          <p className="text-sm font-mono" style={{ color: 'var(--fg-muted)' }}>
            // preferences, progress, and local storage management
          </p>
        </header>

        <SettingsForm />
      </div>
    </AppShell>
  );
}
