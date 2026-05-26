import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'Terms of Use - Polyglot Curriculum',
  description: 'Terms of Use policy for Polyglot Curriculum tracker, presented as a terminal man-page.',
};

export default function TermsPage() {
  return (
    <div className="min-h-dvh flex flex-col font-mono text-sm leading-relaxed" style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}>
      <main className="flex-1 max-w-3xl mx-auto w-full px-3 sm:px-6 py-10 flex flex-col justify-between">
        <div>
          {/* Man Header */}
          <div className="flex justify-between border-b pb-2 mb-8 uppercase text-[11px]" style={{ borderColor: 'var(--border)', color: 'var(--fg-dim)' }}>
            <span>TERMS(7)</span>
            <span>Polyglot Curriculum Manual</span>
            <span>TERMS(7)</span>
          </div>

          {/* Section: NAME */}
          <section className="mb-6">
            <h2 className="font-bold text-[var(--accent-prompt)] uppercase mb-2">Name</h2>
            <p className="pl-4">
              <strong className="text-[var(--fg)]">terms</strong> - Terms of Use for the Polyglot Curriculum self-study tracker.
            </p>
          </section>

          {/* Section: SYNOPSIS */}
          <section className="mb-6">
            <h2 className="font-bold text-[var(--accent-prompt)] uppercase mb-2">Synopsis</h2>
            <p className="pl-4 font-semibold text-[var(--accent-info)]">
              polyglot-curriculum --show-policy=terms
            </p>
          </section>

          {/* Section: DESCRIPTION */}
          <section className="mb-6">
            <h2 className="font-bold text-[var(--accent-prompt)] uppercase mb-2">Description</h2>
            <p className="pl-4 text-[var(--fg-muted)]">
              By registering an account or accessing the Polyglot Curriculum tracker, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.
            </p>
          </section>

          {/* Section: USER ACCOUNTS */}
          <section className="mb-6">
            <h2 className="font-bold text-[var(--accent-prompt)] uppercase mb-2">User Accounts</h2>
            <p className="pl-4 text-[var(--fg-muted)] mb-3">
              To save progress across sessions, users must create an account. You agree to:
            </p>
            <ul className="pl-8 list-disc text-[var(--fg-muted)] space-y-1">
              <li>Provide a valid, active email address.</li>
              <li>Keep your password secure and confidential.</li>
              <li>Not share your account credentials with other users.</li>
            </ul>
          </section>

          {/* Section: CODE EXECUTION */}
          <section className="mb-6">
            <h2 className="font-bold text-[var(--accent-prompt)] uppercase mb-2">Code Execution Policy</h2>
            <p className="pl-4 text-[var(--fg-muted)] mb-3">
              The curriculum features an interactive code runner terminal. All compiled, transpiled, or executed code runs **locally in your browser** inside a sandboxed frame:
            </p>
            <ul className="pl-8 list-disc text-[var(--fg-muted)] space-y-1">
              <li>You are solely responsible for the scripts and logic you write.</li>
              <li>Running recursive loops or memory-heavy scripts is done at your own risk (this may freeze your browser window or tab).</li>
              <li>Any attempt to execute malicious code, escape the iframe sandbox, or bypass storage security is strictly prohibited.</li>
            </ul>
          </section>

          {/* Section: WARRANTY DISCLAIMER */}
          <section className="mb-6">
            <h2 className="font-bold text-[var(--accent-prompt)] uppercase mb-2">Disclaimer of Warranties</h2>
            <p className="pl-4 text-[var(--fg-muted)] mb-3">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot;, WITHOUT WARRANTY OF ANY KIND:
            </p>
            <ul className="pl-8 list-disc text-[var(--fg-muted)] space-y-1">
              <li>We do not guarantee that the curriculum is completely accurate, error-free, or up-to-date.</li>
              <li>We do not guarantee that completing these levels will lead to job placement, certification, or commercial outcomes.</li>
              <li>Progress state storage is provided for convenience. We are not liable for any progress data loss or database disruptions.</li>
            </ul>
          </section>

          {/* Section: LIMITATION OF LIABILITY */}
          <section className="mb-6">
            <h2 className="font-bold text-[var(--accent-prompt)] uppercase mb-2">Limitation of Liability</h2>
            <p className="pl-4 text-[var(--fg-muted)]">
              In no event shall Polyglot Curriculum or its developers be liable for any direct, indirect, incidental, special, or consequential damages (including, but not limited to, loss of data, browser crashes, CPU overheating, or study disruptions) arising out of the use or inability to use this platform.
            </p>
          </section>

          {/* Man Footer */}
          <div className="flex justify-between border-t pt-2 mt-8 uppercase text-[11px]" style={{ borderColor: 'var(--border)', color: 'var(--fg-dim)' }}>
            <span>Page 1</span>
            <span>2026-05-25</span>
            <span>TERMS(7)</span>
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
