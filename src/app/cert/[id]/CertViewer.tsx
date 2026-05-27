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

/** Build a copyable ASCII badge string matching the canonical layout. */
function buildAsciiBadge(
  earnerHandle: string,
  languageName: string,
  phaseTitle: string,
  issuedDate: string,
  credentialId: string,
  verifyUrl: string,
): string {
  const INNER = 50;       // chars between the two ║
  const LPAD  = 2;        // leading spaces inside each row
  const CW    = INNER - LPAD; // 48 chars for content + right-padding
  const LABEL = 13;       // label column width ("credential   ", "issued       " etc.)

  const row   = (s: string) => `║${' '.repeat(LPAD)}${s.padEnd(CW)}║`;
  const blank = row('');
  const kv    = (label: string, val: string) => row(`${label.padEnd(LABEL)}${val}`);
  const top   = '╔' + '═'.repeat(INNER) + '╗';
  const mid   = '╠' + '═'.repeat(INNER) + '╣';
  const bot   = '╚' + '═'.repeat(INNER) + '╝';

  return [
    top,
    row('polyglot@terminal'),
    row('VERIFIED CREDENTIAL'),
    mid,
    blank,
    row('awarded to'),
    row(earnerHandle),
    blank,
    kv('credential', languageName),
    kv('title', phaseTitle),
    blank,
    kv('issued', issuedDate),
    kv('expires', 'never'),
    blank,
    row('credential id'),
    row(credentialId),
    blank,
    mid,
    row('publicly verifiable'),
    row(verifyUrl),
    bot,
  ].join('\n');
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
  const [copied, setCopied] = useState(false);
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
  const verifyUrl = typeof window !== 'undefined'
    ? `${window.location.host}/cert/${credentialId}`
    : `polyglot-curriculum.vercel.app/cert/${credentialId}`;
  const asciiBadge = buildAsciiBadge(earnerHandle, languageName, phaseTitle, issuedDate, credentialId, verifyUrl);

  function handleCopy() {
    void navigator.clipboard.writeText(asciiBadge).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-start px-4 py-10 font-mono"
      style={{
        backgroundColor: 'var(--bg)',
        backgroundImage: `radial-gradient(circle, color-mix(in srgb, ${accent} 8%, transparent) 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
      }}
    >
      {/* Terminal window */}
      <div
        className="w-full max-w-2xl border transition-all duration-700"
        style={{
          borderColor: accent,
          boxShadow: `0 0 0 1px color-mix(in srgb, ${accent} 30%, transparent),
                      0 0 40px color-mix(in srgb, ${accent} 15%, transparent),
                      inset 0 0 60px color-mix(in srgb, ${accent} 4%, transparent)`,
        }}
      >
        {/* Window chrome */}
        <div
          className="px-4 py-2 flex items-center justify-between text-[11px] tracking-wider border-b"
          style={{
            borderColor: `color-mix(in srgb, ${accent} 30%, var(--border))`,
            backgroundColor: `color-mix(in srgb, ${accent} 6%, var(--bg-elevated))`,
            color: 'var(--fg-muted)',
          }}
        >
          <span className="flex items-center gap-2">
            <span style={{ color: accent, textShadow: `0 0 8px ${accent}` }}>●</span>
            <span>polyglot@terminal</span>
            <span style={{ color: 'var(--fg-dim)' }}>—</span>
            <span style={{ color: accent }}>credential registry</span>
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
                textShadow: s.accent ? `0 0 12px color-mix(in srgb, ${accent} 60%, transparent)` : undefined,
              }}
            >
              {s.text}
            </p>
          ))}

          {/* Certificate card */}
          {showCert && (
            <div
              className="mt-6 space-y-5 transition-opacity duration-500"
              style={{ opacity: showCert ? 1 : 0 }}
            >
              {/* Top accent bar */}
              <div
                className="h-0.5 w-full"
                style={{
                  background: `linear-gradient(90deg, ${accent}, color-mix(in srgb, ${accent} 20%, transparent))`,
                  boxShadow: `0 0 8px color-mix(in srgb, ${accent} 50%, transparent)`,
                }}
              />

              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.2em] mb-1"
                    style={{ color: 'var(--fg-dim)' }}
                  >
                    polyglot terminal — issued credential
                  </p>
                  <p
                    className="text-[10px] uppercase tracking-[0.12em]"
                    style={{ color: `color-mix(in srgb, ${accent} 60%, var(--fg-dim))` }}
                  >
                    {languageName} · verified
                  </p>
                </div>
                {/* Language hex badge */}
                <div
                  className="text-lg shrink-0 select-none"
                  style={{
                    color: accent,
                    textShadow: `0 0 20px ${accent}`,
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  ⬡
                </div>
              </div>

              {/* Earner */}
              <div
                className="border-l-2 pl-4 py-1"
                style={{ borderColor: accent }}
              >
                <p className="text-[10px] uppercase tracking-[0.15em] mb-1" style={{ color: 'var(--fg-dim)' }}>
                  awarded to
                </p>
                <p
                  className="text-2xl font-semibold"
                  style={{
                    color: accent,
                    textShadow: `0 0 20px color-mix(in srgb, ${accent} 50%, transparent)`,
                  }}
                >
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
                  <span style={{ color: 'var(--fg-dim)' }}>{' · '}</span>
                  {phaseTitle}
                </p>
              </div>

              {/* Skills */}
              {skills.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--fg-dim)' }}>
                    demonstrated
                  </p>
                  <ul className="space-y-1.5">
                    {skills.map((skill, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span
                          style={{
                            color: accent,
                            textShadow: `0 0 8px color-mix(in srgb, ${accent} 70%, transparent)`,
                          }}
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                        <span style={{ color: 'var(--fg-muted)' }}>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Dates + ID */}
              <div
                className="pt-3 border-t flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8"
                style={{ borderColor: `color-mix(in srgb, ${accent} 20%, var(--border))` }}
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] mb-0.5" style={{ color: 'var(--fg-dim)' }}>issued</p>
                  <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>{issuedDate}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] mb-0.5" style={{ color: 'var(--fg-dim)' }}>expires</p>
                  <p className="text-sm" style={{ color: 'var(--fg-dim)' }}>never</p>
                </div>
                <div className="sm:ml-auto">
                  <p className="text-[10px] uppercase tracking-[0.15em] mb-0.5" style={{ color: 'var(--fg-dim)' }}>credential id</p>
                  <p className="text-xs break-all" style={{ color: 'var(--fg-dim)', letterSpacing: '0.04em' }}>
                    {credentialId}
                  </p>
                </div>
              </div>

              {/* ASCII Badge */}
              <div
                className="mt-2 border"
                style={{
                  borderColor: `color-mix(in srgb, ${accent} 25%, var(--border))`,
                  backgroundColor: `color-mix(in srgb, ${accent} 4%, var(--bg))`,
                }}
              >
                <div
                  className="px-3 py-1.5 border-b flex items-center justify-between text-[10px] uppercase tracking-widest"
                  style={{
                    borderColor: `color-mix(in srgb, ${accent} 25%, var(--border))`,
                    color: 'var(--fg-dim)',
                  }}
                >
                  <span>ascii badge</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="hover:underline transition-colors duration-100"
                    style={{ color: copied ? accent : 'var(--fg-dim)' }}
                  >
                    {copied ? '✓ copied' : '[ copy ]'}
                  </button>
                </div>
                <pre
                  className="px-4 py-4 text-[11px] leading-[1.55] overflow-x-auto"
                  style={{
                    color: accent,
                    textShadow: `0 0 6px color-mix(in srgb, ${accent} 35%, transparent)`,
                  }}
                >
                  {asciiBadge}
                </pre>
              </div>

              {/* Bottom accent bar */}
              <div
                className="h-px w-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                  opacity: 0.4,
                }}
              />
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
      <p className="mt-6 text-[11px] text-center" style={{ color: 'var(--fg-dim)' }}>
        <a href="/" className="hover:underline" style={{ color: 'var(--fg-dim)' }}>
          polyglot@terminal
        </a>
        {' · '}
        verified credential · no expiry
      </p>
    </div>
  );
}
