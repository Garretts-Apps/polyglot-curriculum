'use client';

import { useEffect, useState } from 'react';
import { TerminalCursor } from '@/components/ui/TerminalCursor';

interface CertViewerProps {
  credentialId: string;
  earnerHandle: string;
  issuedAt: string;
  languageName: string;
  languageAccentVar: string;
  phaseTitle: string;
  skills: string[];
}

const VERIFY_STEPS = [
  { delay: 320,  text: '> querying credential registry...' },
  { delay: 700,  text: '> validating earner record...' },
  { delay: 1050, text: '> checking cryptographic signature...' },
  { delay: 1400, text: '✓ credential found · no expiry', accent: true },
];

function useReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

export function CertViewer({
  credentialId,
  earnerHandle,
  issuedAt,
  languageName,
  languageAccentVar,
  phaseTitle,
  skills,
}: CertViewerProps) {
  const [step, setStep] = useState(-1);
  const [showCert, setShowCert] = useState(false);
  const instant = useReducedMotion();

  useEffect(() => {
    if (instant) {
      setStep(VERIFY_STEPS.length - 1);
      setShowCert(true);
      return;
    }

    VERIFY_STEPS.forEach((s, i) => {
      window.setTimeout(() => setStep(i), s.delay);
    });

    const last = VERIFY_STEPS[VERIFY_STEPS.length - 1]!.delay;
    window.setTimeout(() => setShowCert(true), last + 400);
  }, [instant]);

  const accent = `var(${languageAccentVar})`;
  const issuedDate = new Date(issuedAt).toISOString().slice(0, 10);

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-start px-4 py-10 font-mono"
      style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}
    >
      {/* Terminal window */}
      <div
        className="w-full max-w-2xl border"
        style={{ borderColor: 'var(--border)' }}
      >
        {/* Window chrome */}
        <div
          className="px-4 py-2 flex items-center justify-between text-[11px] tracking-wider border-b"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--bg-elevated)',
            color: 'var(--fg-muted)',
          }}
        >
          <span>
            <span style={{ color: accent }}>●</span>
            {' '}polyglot@terminal — credential registry
          </span>
          <span style={{ color: 'var(--fg-dim)' }}>tty1</span>
        </div>

        {/* Terminal body */}
        <div className="px-5 py-5 space-y-1 text-sm">
          {/* Command */}
          <p style={{ color: 'var(--fg-muted)' }}>
            <span style={{ color: accent }}>$</span>
            {' verify --credential '}
            <span style={{ color: 'var(--fg)' }}>{credentialId}</span>
          </p>

          {/* Verification steps */}
          {VERIFY_STEPS.map((s, i) => (
            <p
              key={i}
              className="transition-opacity duration-300"
              style={{
                opacity: step >= i ? 1 : 0,
                color: s.accent ? accent : 'var(--fg-muted)',
              }}
            >
              {s.text}
            </p>
          ))}

          {/* Certificate card */}
          {showCert && (
            <div
              className="mt-6 border px-5 py-6 space-y-5 transition-opacity duration-500"
              style={{ borderColor: accent, opacity: showCert ? 1 : 0 }}
            >
              {/* Header */}
              <div>
                <p
                  className="text-[10px] uppercase tracking-[0.2em] mb-1"
                  style={{ color: 'var(--fg-dim)' }}
                >
                  polyglot terminal — issued credential
                </p>
                <div
                  className="h-px w-full"
                  style={{ backgroundColor: accent, opacity: 0.35 }}
                />
              </div>

              {/* Earner */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] mb-1" style={{ color: 'var(--fg-dim)' }}>
                  awarded to
                </p>
                <p className="text-xl font-semibold" style={{ color: accent }}>
                  {earnerHandle}
                </p>
              </div>

              {/* Credential title */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] mb-1" style={{ color: 'var(--fg-dim)' }}>
                  credential
                </p>
                <p className="text-base" style={{ color: 'var(--fg)' }}>
                  <span style={{ color: accent }}>{languageName}</span>
                  {' · '}
                  {phaseTitle}
                </p>
              </div>

              {/* Skills */}
              {skills.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--fg-dim)' }}>
                    demonstrated
                  </p>
                  <ul className="space-y-1">
                    {skills.map((skill, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span style={{ color: accent }} aria-hidden="true">✓</span>
                        <span style={{ color: 'var(--fg-muted)' }}>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Dates */}
              <div className="flex gap-10">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] mb-0.5" style={{ color: 'var(--fg-dim)' }}>
                    issued
                  </p>
                  <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>{issuedDate}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] mb-0.5" style={{ color: 'var(--fg-dim)' }}>
                    expires
                  </p>
                  <p className="text-sm" style={{ color: 'var(--fg-dim)' }}>never</p>
                </div>
              </div>

              {/* Credential ID */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] mb-1" style={{ color: 'var(--fg-dim)' }}>
                  credential id
                </p>
                <p
                  className="text-xs break-all"
                  style={{ color: 'var(--fg-muted)', letterSpacing: '0.04em' }}
                >
                  {credentialId}
                </p>
              </div>
            </div>
          )}

          {/* Final prompt with blinking cursor */}
          <p className="pt-2 text-sm" style={{ color: 'var(--fg-muted)' }}>
            <span style={{ color: accent }}>$</span>
            {' '}
            <TerminalCursor />
          </p>
        </div>
      </div>

      {/* Footer */}
      <p
        className="mt-6 text-[11px] text-center"
        style={{ color: 'var(--fg-dim)' }}
      >
        <a
          href="/"
          className="hover:underline"
          style={{ color: 'var(--fg-dim)' }}
        >
          polyglot@terminal
        </a>
        {' · '}
        verified credential · no expiry
      </p>
    </div>
  );
}
