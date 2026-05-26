import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'Privacy Policy - Polyglot Curriculum',
  description: 'Privacy policy for Polyglot Curriculum tracker, presented as a terminal man-page.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-dvh flex flex-col font-mono text-sm leading-relaxed" style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}>
      <main className="flex-1 max-w-3xl mx-auto w-full px-3 sm:px-6 py-10 flex flex-col justify-between">
        <div>
          {/* Man Header */}
          <div className="flex justify-between border-b pb-2 mb-8 uppercase text-[11px]" style={{ borderColor: 'var(--border)', color: 'var(--fg-dim)' }}>
            <span>PRIVACY(7)</span>
            <span>Polyglot Curriculum Manual</span>
            <span>PRIVACY(7)</span>
          </div>

          {/* Section: NAME */}
          <section className="mb-6">
            <h2 className="font-bold text-[var(--accent-prompt)] uppercase mb-2">Name</h2>
            <p className="pl-4">
              <strong className="text-[var(--fg)]">privacy</strong> - Privacy Policy and data protection manifest for the Polyglot Curriculum tracker.
            </p>
          </section>

          {/* Section: SYNOPSIS */}
          <section className="mb-6">
            <h2 className="font-bold text-[var(--accent-prompt)] uppercase mb-2">Synopsis</h2>
            <p className="pl-4 font-semibold text-[var(--accent-info)]">
              polyglot-curriculum --show-policy=privacy
            </p>
          </section>

          {/* Section: DESCRIPTION */}
          <section className="mb-6">
            <h2 className="font-bold text-[var(--accent-prompt)] uppercase mb-2">Description</h2>
            <p className="pl-4 text-[var(--fg-muted)] mb-3">
              Polyglot Curriculum is a self-study tracking platform designed to help developers learn programming languages. This document outlines how user data is collected, stored, and protected.
            </p>
            <p className="pl-4 text-[var(--fg-muted)]">
              We believe in minimal data footprint. We do not track you across the web, we do not sell your data, and we do not utilize any advertising or analytics trackers.
            </p>
          </section>

          {/* Section: DATA COLLECTION */}
          <section className="mb-6">
            <h2 className="font-bold text-[var(--accent-prompt)] uppercase mb-2">Data Collection & Storage</h2>
            <div className="pl-4 space-y-3">
              <div>
                <h3 className="font-bold text-[var(--fg)] mb-1">1. User Credentials (Email & Password)</h3>
                <p className="text-[var(--fg-muted)]">
                  Your email address and password are collected during registration. This data is handled exclusively by Supabase Auth (GoTrue API). Passwords are encrypted in transit and salted and hashed using Bcrypt before database write. Plaintext passwords are never accessible to administrators.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[var(--fg)] mb-1">2. Curriculum Progress</h3>
                <p className="text-[var(--fg-muted)]">
                  To save your progress across devices, your level completions, settings, notes, and quiz checks are stored in a secure Supabase PostgreSQL database under the `user_progress` table.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[var(--fg)] mb-1">3. Cookies</h3>
                <p className="text-[var(--fg-muted)]">
                  We use cookies strictly for authentication session tracking (Supabase auth tokens). These cookies are secure, HTTP-only, and are not used for advertising or cross-site tracking.
                </p>
              </div>
            </div>
          </section>

          {/* Section: SECURITY */}
          <section className="mb-6">
            <h2 className="font-bold text-[var(--accent-prompt)] uppercase mb-2">Security</h2>
            <p className="pl-4 text-[var(--fg-muted)] mb-3">
              We secure data using strict, modern standards:
            </p>
            <ul className="pl-8 list-disc text-[var(--fg-muted)] space-y-1">
              <li>All connections utilize HTTPS / TLS encryption in transit.</li>
              <li>Row Level Security (RLS) is enabled on all tables in Supabase, preventing users from accessing or modifying other users&apos; progress.</li>
              <li>JSON inputs are sanitized against prototype pollution before database upserts.</li>
            </ul>
          </section>

          {/* Section: USER RIGHTS */}
          <section className="mb-6">
            <h2 className="font-bold text-[var(--accent-prompt)] uppercase mb-2">User Rights & Control</h2>
            <p className="pl-4 text-[var(--fg-muted)]">
              You retain complete ownership of your data. You can export a JSON backup of your progress or delete your account along with all associated progress data at any time via the Settings page (`rm -rf account`).
            </p>
          </section>

          {/* Section: THIRD PARTIES */}
          <section className="mb-6">
            <h2 className="font-bold text-[var(--accent-prompt)] uppercase mb-2">Third Party Services</h2>
            <p className="pl-4 text-[var(--fg-muted)] mb-2">
              Our infrastructure is powered by:
            </p>
            <ul className="pl-8 list-disc text-[var(--fg-muted)] space-y-1">
              <li><strong className="text-[var(--fg)]">Supabase</strong> (Database, Auth)</li>
              <li><strong className="text-[var(--fg)]">Vercel</strong> (Web Hosting, Edge Functions)</li>
            </ul>
          </section>

          {/* Man Footer */}
          <div className="flex justify-between border-t pt-2 mt-8 uppercase text-[11px]" style={{ borderColor: 'var(--border)', color: 'var(--fg-dim)' }}>
            <span>Page 1</span>
            <span>2026-05-25</span>
            <span>PRIVACY(7)</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button as="link" href="/login" variant="secondary" size="sm">
            ◀ return to terminal login
          </Button>
        </div>
      </main>
    </div>
  );
}
