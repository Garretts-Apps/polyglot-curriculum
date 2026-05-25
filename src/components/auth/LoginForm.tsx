'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ShellPrompt } from '@/components/ui/ShellPrompt';
import { StatusTag } from '@/components/ui/StatusTag';
import { TerminalCursor } from '@/components/ui/TerminalCursor';

export function LoginForm() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? 'creds-mismatch — check username and password');
        setSubmitting(false);
        return;
      }
      // Use full reload so the proxy re-reads the new cookie.
      const target = from && from.startsWith('/') ? from : '/';
      window.location.assign(target);
    } catch {
      setError('network-error — could not reach auth service');
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-mono" noValidate>
      <div>
        <h2 className="text-sm font-semibold mb-3">
          <ShellPrompt
            minimal
            command={` login --user=${username || '<input>'} --password=${password ? '••••' : '<input>'}`}
          />
        </h2>
      </div>

      <div
        className="p-4 border space-y-4"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-elevated)' }}
      >
        <div>
          <label
            htmlFor="login-username"
            className="block text-[11px] mb-1.5"
            style={{ color: 'var(--fg-muted)' }}
          >
            username =
          </label>
          <div className="flex items-center gap-1">
            <span aria-hidden="true" style={{ color: 'var(--fg-dim)' }}>
              [
            </span>
            <input
              id="login-username"
              name="username"
              type="text"
              autoComplete="username"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={submitting}
              className="flex-1 border px-2 py-2 text-sm bg-transparent font-mono"
              style={{
                borderColor: 'var(--border-active)',
                color: 'var(--accent-prompt)',
                minHeight: '40px',
              }}
            />
            <span aria-hidden="true" style={{ color: 'var(--fg-dim)' }}>
              ]
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="login-password"
            className="block text-[11px] mb-1.5"
            style={{ color: 'var(--fg-muted)' }}
          >
            password =
          </label>
          <div className="flex items-center gap-1">
            <span aria-hidden="true" style={{ color: 'var(--fg-dim)' }}>
              [
            </span>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={submitting}
              className="flex-1 border px-2 py-2 text-sm bg-transparent font-mono"
              style={{
                borderColor: 'var(--border-active)',
                color: 'var(--accent-prompt)',
                minHeight: '40px',
              }}
            />
            <span aria-hidden="true" style={{ color: 'var(--fg-dim)' }}>
              ]
            </span>
          </div>
        </div>
      </div>

      {error && (
        <p
          className="text-xs flex items-center gap-2"
          style={{ color: 'var(--accent-error)' }}
          role="alert"
        >
          <StatusTag status="fail" />
          {error}
        </p>
      )}

      <div className="flex items-center justify-between gap-3 pt-2">
        <p className="text-[11px]" style={{ color: 'var(--fg-dim)' }}>
          <span style={{ color: 'var(--accent-prompt)' }}>&gt;</span> session ttl = 30d
          <TerminalCursor thin />
        </p>
        <Button type="submit" variant="primary" size="lg" disabled={submitting}>
          {submitting ? 'authenticating...' : '▶ login'}
        </Button>
      </div>
    </form>
  );
}
