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
  const LPAD  = 2;
  const RPAD  = 2;
  const LABEL = 13; // "credential   ", "issued       " etc.

  // Pre-compute every content string so we can size the box to fit
  const contentLines = [
    'polyglot@terminal',
    'VERIFIED CREDENTIAL',
    'awarded to',
    earnerHandle,
    `${'credential'.padEnd(LABEL)}${languageName}`,
    `${'title'.padEnd(LABEL)}${phaseTitle}`,
    `${'issued'.padEnd(LABEL)}${issuedDate}`,
    `${'expires'.padEnd(LABEL)}never`,
    'credential id',
    credentialId,
    'publicly verifiable',
    verifyUrl,
  ];

  const INNER = Math.max(50, Math.max(...contentLines.map((l) => l.length)) + LPAD + RPAD);
  const CW    = INNER - LPAD; // content + right-padding width

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
      className="min-h-dvh sm:h-dvh flex flex-col font-mono"
      style={{
        backgroundColor: 'var(--bg)',
        backgroundImage: `radial-gradient(circle, color-mix(in srgb, ${accent} 8%, transparent) 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
      }}
    >
      {/* Terminal window — fills viewport on desktop */}
      <div
        className="flex-1 flex flex-col border-0 sm:border transition-all duration-700"
        style={{
          borderColor: accent,
          boxShadow: `0 0 0 1px color-mix(in srgb, ${accent} 30%, transparent),
                      0 0 60px color-mix(in srgb, ${accent} 12%, transparent),
                      inset 0 0 80px color-mix(in srgb, ${accent} 3%, transparent)`,
        }}
      >
        {/* Window chrome */}
        <div
          className="shrink-0 px-4 sm:px-6 py-2 flex items-center justify-between text-[11px] tracking-wider border-b"
          style={{
            borderColor: `color-mix(in srgb, ${accent} 30%, var(--border))`,
            backgroundColor: `color-mix(in srgb, ${accent} 8%, var(--bg-elevated))`,
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

        {/* Terminal body — scrollable */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-10 py-6 space-y-1 text-sm">
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
              className="mt-5 transition-opacity duration-500 border"
              style={{
                opacity: showCert ? 1 : 0,
                borderColor: accent,
                backgroundColor: `color-mix(in srgb, ${accent} 5%, var(--bg))`,
                boxShadow: `inset 0 0 40px color-mix(in srgb, ${accent} 4%, transparent)`,
              }}
            >
              {/* Card title bar */}
              <div
                className="px-4 sm:px-6 py-2 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] border-b"
                style={{
                  borderColor: `color-mix(in srgb, ${accent} 40%, var(--border))`,
                  backgroundColor: `color-mix(in srgb, ${accent} 10%, var(--bg-elevated))`,
                  color: accent,
                  textShadow: `0 0 8px color-mix(in srgb, ${accent} 50%, transparent)`,
                }}
              >
                <span>polyglot terminal — issued credential</span>
                <span style={{ opacity: 0.7 }}>⬡ {languageName} · verified</span>
              </div>

              {/* Two-column layout on desktop */}
              <div className="md:grid md:grid-cols-2" style={{ borderColor: `color-mix(in srgb, ${accent} 30%, var(--border))` }}>
                {/* Left col: earner + credential + metadata */}
                <div
                  className="px-5 sm:px-8 py-6 space-y-6 md:border-r"
                  style={{ borderColor: `color-mix(in srgb, ${accent} 25%, var(--border))` }}
                >
                  {/* Top accent bar */}
                  <div
                    className="h-px w-full"
                    style={{
                      background: `linear-gradient(90deg, ${accent}, color-mix(in srgb, ${accent} 10%, transparent))`,
                      boxShadow: `0 0 6px color-mix(in srgb, ${accent} 60%, transparent)`,
                    }}
                  />

                  {/* Earner */}
                  <div className="border-l-2 pl-4 py-1" style={{ borderColor: accent }}>
                    <p className="text-[10px] uppercase tracking-[0.18em] mb-1.5" style={{ color: 'var(--accent-warn)' }}>
                      awarded to
                    </p>
                    <p
                      className="text-2xl sm:text-3xl font-semibold"
                      style={{ color: accent, textShadow: `0 0 24px color-mix(in srgb, ${accent} 55%, transparent)` }}
                    >
                      {earnerHandle}
                    </p>
                  </div>

                  {/* Credential title */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] mb-1.5" style={{ color: 'var(--accent-warn)' }}>
                      credential
                    </p>
                    <p className="text-base font-medium" style={{ color: 'var(--fg)' }}>
                      <span style={{ color: accent }}>{languageName}</span>
                      <span style={{ color: 'var(--fg-dim)' }}>{' · '}</span>
                      <span>{phaseTitle}</span>
                    </p>
                  </div>

                  {/* Metadata */}
                  <div
                    className="pt-4 border-t grid grid-cols-2 gap-x-6 gap-y-4"
                    style={{ borderColor: `color-mix(in srgb, ${accent} 25%, var(--border))` }}
                  >
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] mb-0.5" style={{ color: 'var(--accent-info)' }}>issued</p>
                      <p className="text-sm font-medium" style={{ color: 'var(--fg)' }}>{issuedDate}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] mb-0.5" style={{ color: 'var(--accent-info)' }}>expires</p>
                      <p className="text-sm font-medium" style={{ color: 'var(--accent-prompt)' }}>never</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[10px] uppercase tracking-[0.18em] mb-0.5" style={{ color: 'var(--accent-info)' }}>credential id</p>
                      <p className="text-xs break-all" style={{ color: 'var(--fg-muted)', letterSpacing: '0.04em' }}>
                        {credentialId}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right col: demonstrated + ASCII badge */}
                <div
                  className="px-5 sm:px-8 py-6 space-y-6 border-t md:border-t-0"
                  style={{ borderColor: `color-mix(in srgb, ${accent} 25%, var(--border))` }}
                >
                  {/* Skills */}
                  {skills.length > 0 && (
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] mb-3" style={{ color: 'var(--accent-warn)' }}>
                        demonstrated
                      </p>
                      <ul className="space-y-3">
                        {skills.map((skill, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm">
                            <span
                              className="shrink-0 mt-px"
                              style={{ color: 'var(--accent-prompt)', textShadow: '0 0 8px var(--accent-prompt)' }}
                              aria-hidden="true"
                            >
                              ✓
                            </span>
                            <span style={{ color: 'var(--fg)' }}>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* ASCII Badge */}
                  <div
                    className="border"
                    style={{ borderColor: `color-mix(in srgb, ${accent} 35%, var(--border))` }}
                  >
                    <div
                      className="px-3 py-1.5 border-b flex items-center justify-between text-[10px] uppercase tracking-widest"
                      style={{
                        borderColor: `color-mix(in srgb, ${accent} 25%, var(--border))`,
                        backgroundColor: `color-mix(in srgb, ${accent} 8%, var(--bg-elevated))`,
                        color: `color-mix(in srgb, ${accent} 70%, var(--fg-muted))`,
                      }}
                    >
                      <span>ascii badge</span>
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="hover:underline transition-colors duration-100"
                        style={{ color: copied ? 'var(--accent-prompt)' : `color-mix(in srgb, ${accent} 70%, var(--fg-muted))` }}
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
                </div>
              </div>
            </div>
          )}

          {/* Final prompt with blinking cursor */}
          <p className="pt-4 text-sm" style={{ color: 'var(--fg-muted)' }}>
            <span style={{ color: accent }}>$</span>
            {' '}
            <TerminalCursor />
          </p>
        </div>
      </div>
    </div>
  );
}
