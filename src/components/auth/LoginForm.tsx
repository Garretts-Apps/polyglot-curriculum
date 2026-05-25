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

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    setMessage(null);

    const targetUrl = mode === 'login' ? '/api/auth/login' : '/api/auth/signup';

    try {
      const res = await fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? (mode === 'login' ? 'creds-mismatch — check credentials' : 'registration failed — check fields'));
        setSubmitting(false);
        return;
      }

      if (mode === 'login') {
        // Use full reload so the proxy re-reads the new cookie.
        const target = from && from.startsWith('/') ? from : '/';
        window.location.assign(target);
      } else {
        const data = (await res.json()) as { sessionActive: boolean; message: string };
        if (data.sessionActive) {
          // Auto-logged in after signup, redirect home
          const target = from && from.startsWith('/') ? from : '/';
          window.location.assign(target);
        } else {
          setMessage('registration complete — check email to verify account before login');
          setEmail('');
          setPassword('');
          setSubmitting(false);
        }
      }
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
            command={` ${mode === 'login' ? 'login' : 'register'} --email=${email || '<input>'} --password=${password ? '••••' : '<input>'}`}
          />
        </h2>
      </div>

      <div
        className="p-4 border space-y-4"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-elevated)' }}
      >
        <div>
          <label
            htmlFor="login-email"
            className="block text-[11px] mb-1.5"
            style={{ color: 'var(--fg-muted)' }}
          >
            email =
          </label>
          <div className="flex items-center gap-1">
            <span aria-hidden="true" style={{ color: 'var(--fg-dim)' }}>
              [
            </span>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
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

      {message && (
        <p
          className="text-xs flex items-center gap-2"
          style={{ color: 'var(--accent-prompt)' }}
          role="status"
        >
          <StatusTag status="ok" />
          {message}
        </p>
      )}

      <div className="flex flex-col gap-4 pt-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px]" style={{ color: 'var(--fg-dim)' }}>
            <span style={{ color: 'var(--accent-prompt)' }}>&gt;</span>{' '}
            {mode === 'login' ? 'session ttl = 30d' : 'req: email confirmation'}
            <TerminalCursor thin />
          </p>
          <Button type="submit" variant="primary" size="lg" disabled={submitting}>
            {submitting 
              ? (mode === 'login' ? 'authenticating...' : 'registering...') 
              : (mode === 'login' ? '▶ login' : '▶ register')}
          </Button>
        </div>

        <div className="text-center pt-2 text-[11px]" style={{ color: 'var(--fg-muted)' }}>
          {mode === 'login' ? (
            <p>
              no account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError(null);
                  setMessage(null);
                }}
                className="underline hover:text-[var(--accent-prompt)] cursor-pointer bg-transparent border-0 p-0 font-mono text-[11px]"
              >
                [ register new account ]
              </button>
            </p>
          ) : (
            <p>
              have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError(null);
                  setMessage(null);
                }}
                className="underline hover:text-[var(--accent-prompt)] cursor-pointer bg-transparent border-0 p-0 font-mono text-[11px]"
              >
                [ back to login ]
              </button>
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
