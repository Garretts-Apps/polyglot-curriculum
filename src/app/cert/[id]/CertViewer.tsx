'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
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

// ── Terminal output types ─────────────────────────────────────────────────────
// Security: all commands are a static lookup table. No eval, no Function(),
// no network calls, no server path. Input never executes — it only selects
// from this pre-defined map of string → ReactNode.

interface Seg  { text: string; color?: string }
interface TLine { segs: Seg[] }

const s    = (text: string, color?: string): Seg  => ({ text, color });
const tl   = (...segs: Seg[]): TLine              => ({ segs });
const plain  = (text: string): TLine              => tl(s(text));
const colored = (color: string, text: string): TLine => tl(s(text, color));
const blank  = (): TLine                          => plain('');

// ── Command definitions ───────────────────────────────────────────────────────

interface Ctx {
  credentialId: string;
  earnerHandle: string;
  issuedDate: string;
  languageName: string;
  phaseTitle: string;
  skills: string[];
  verifyUrl: string;
  accent: string;
}

const FORTUNES = [
  '"The best error message is the one that never shows up." — Thomas Fuchs',
  '"Any fool can write code that a computer can understand. Good programmers write code humans can understand." — Fowler',
  '"First, solve the problem. Then, write the code." — John Johnson',
  '"It works on my machine." — every developer, ever',
  '"99 little bugs in the code. Take one down, patch it around. 127 little bugs in the code."',
  '"There are only two hard things in CS: cache invalidation and naming things." — Phil Karlton',
  '"Talk is cheap. Show me the code." — Linus Torvalds',
  '"Programs must be written for people to read, only incidentally for machines to execute." — Abelson & Sussman',
  '"Make it work, make it right, make it fast." — Kent Beck',
  '"Weeks of coding can save you hours of planning." — unknown',
];

const FILES = ['credential.json', 'skills.txt', 'verify.sh', 'README.md'];
const COMMAND_NAMES = [
  'cat', 'clear', 'exit', 'fortune', 'git', 'help',
  'logout', 'ls', 'neofetch', 'pwd', 'rm', 'sudo', 'verify', 'whoami',
];

function runCommand(raw: string, ctx: Ctx): TLine[] | 'clear' | 'replay' {
  const parts = raw.trim().split(/\s+/);
  const cmd  = (parts[0] ?? '').toLowerCase();
  const args = parts.slice(1);

  const warn   = 'var(--accent-warn)';
  const info   = 'var(--accent-info)';
  const prompt = 'var(--accent-prompt)';
  const muted  = 'var(--fg-muted)';
  const dim    = 'var(--fg-dim)';
  const { accent } = ctx;

  switch (cmd) {
    case 'help':
      return [
        colored(muted, 'available commands:'),
        blank(),
        tl(s('  whoami         ', accent), s('show earner identity',            muted)),
        tl(s('  ls             ', accent), s('list credential files',            muted)),
        tl(s('  cat <file>     ', accent), s('read a file',                      muted)),
        tl(s('  neofetch       ', accent), s('system info panel',                muted)),
        tl(s('  verify         ', accent), s('re-run credential verification',   muted)),
        tl(s('  git log        ', accent), s('commit history',                   muted)),
        tl(s('  fortune        ', accent), s('random programming quote',         muted)),
        tl(s('  pwd            ', accent), s('print working directory',          muted)),
        tl(s('  clear          ', accent), s('clear terminal output',            muted)),
        tl(s('  sudo <cmd>     ', accent), s('attempt superuser command',        muted)),
        blank(),
        colored(dim, '  tab: complete · ↑↓: history'),
      ];

    case 'whoami':
      return [
        colored(accent, ctx.earnerHandle),
        blank(),
        tl(s('credential  ', warn), s(`${ctx.languageName} · ${ctx.phaseTitle}`)),
        tl(s('issued      ', warn), s(ctx.issuedDate)),
        tl(s('id          ', warn), s(ctx.credentialId, muted)),
        tl(s('verify      ', warn), s(ctx.verifyUrl,    muted)),
      ];

    case 'pwd':
      return [
        plain(`/home/${ctx.earnerHandle.toLowerCase().replace(/\s+/g, '.')}/credentials/${ctx.credentialId}`),
      ];

    case 'ls':
      return [tl(
        s('credential.json', info),  s('  '),
        s('skills.txt',      info),  s('  '),
        s('verify.sh',       prompt), s('  '),
        s('README.md',       muted),
      )];

    case 'cat': {
      const file = (args[0] ?? '').replace(/^\.?\//, '');
      switch (file.toLowerCase()) {
        case 'credential.json':
          return [
            colored(dim, '{'),
            tl(s('  "id":          ', warn), s(`"${ctx.credentialId}"`,  info)),
            tl(s('  "earner":      ', warn), s(`"${ctx.earnerHandle}"`,  info)),
            tl(s('  "language":    ', warn), s(`"${ctx.languageName}"`,  info)),
            tl(s('  "phase":       ', warn), s(`"${ctx.phaseTitle}"`,    info)),
            tl(s('  "issued":      ', warn), s(`"${ctx.issuedDate}"`,    info)),
            tl(s('  "expires":     ', warn), s('"never"',               prompt)),
            tl(s('  "verify":      ', warn), s(`"${ctx.verifyUrl}"`,     muted)),
            colored(dim, '}'),
          ];
        case 'skills.txt':
          if (!ctx.skills.length) return [colored(muted, '(no skills on file)')];
          return ctx.skills.map((sk) => tl(s('✓ ', prompt), s(sk)));
        case 'verify.sh':
          return [
            colored(dim,  '#!/bin/sh'),
            blank(),
            tl(s('curl', warn), s(' -s '), s(`https://${ctx.verifyUrl}`, info)),
            tl(s('echo', warn), s(' "✓ credential verified"')),
          ];
        case 'readme.md':
          return [
            tl(s('# ', warn), s(`${ctx.earnerHandle} — ${ctx.languageName} ${ctx.phaseTitle}`)),
            blank(),
            colored(muted, 'Issued by polyglot@terminal.'),
            colored(muted, 'Earned through demonstrated proficiency, not self-attestation.'),
            blank(),
            tl(s('verify  ', info), s(ctx.verifyUrl, muted)),
          ];
        default:
          if (!file) return [tl(s('usage: ', warn), s('cat <file>'), s('  (try: ls)', muted))];
          return [colored(muted, `cat: ${file}: No such file or directory`)];
      }
    }

    case 'neofetch': {
      const title = `${ctx.earnerHandle}@polyglot-terminal`;
      return [
        tl(s(ctx.earnerHandle, accent), s('@polyglot-terminal', muted)),
        colored(dim, '─'.repeat(title.length)),
        tl(s('OS       ', warn), s('polyglot terminal 1.0')),
        tl(s('host     ', warn), s('credential registry')),
        tl(s('kernel   ', warn), s('vercel/edge/2026')),
        tl(s('uptime   ', warn), s(`since ${ctx.issuedDate}`)),
        blank(),
        tl(s('language ', accent), s(ctx.languageName)),
        tl(s('phase    ', accent), s(ctx.phaseTitle)),
        tl(s('skills   ', accent), s(`${ctx.skills.length} demonstrated`)),
        blank(),
        tl(s('issued   ', info), s(ctx.issuedDate)),
        tl(s('expires  ', info), s('never', prompt)),
        tl(s('id       ', info), s(ctx.credentialId, muted)),
      ];
    }

    case 'verify':
      return 'replay';

    case 'fortune': {
      const q = FORTUNES[Math.floor(Math.random() * FORTUNES.length)]!;
      return [colored(muted, q)];
    }

    case 'git':
      if (args[0] === 'log') {
        const short      = ctx.credentialId.slice(0, 7);
        const authorSlug = ctx.earnerHandle.toLowerCase().replace(/\s+/g, '.');
        return [
          tl(s('commit ', dim), s(short, accent), s(' (HEAD -> earned, origin/main)', dim)),
          tl(s('Author: ', warn), s(`${ctx.earnerHandle} <${authorSlug}@polyglot>`)),
          tl(s('Date:   ', warn), s(ctx.issuedDate)),
          blank(),
          plain(`    feat(${ctx.languageName.toLowerCase()}): earn ${ctx.phaseTitle}`),
          ...(ctx.skills.length > 0 ? [
            blank(),
            colored(muted, `    demonstrated: ${ctx.skills.slice(0, 2).join(', ')}${ctx.skills.length > 2 ? ' ...' : ''}`),
          ] : []),
        ];
      }
      return [
        colored(muted, `git: '${args[0] ?? ''}' is not a git command`),
        colored(dim,   "did you mean: git log"),
      ];

    case 'sudo': {
      const firstName = ctx.earnerHandle.split(' ')[0]?.toLowerCase() ?? 'user';
      const sub       = args.join(' ').toLowerCase();
      const pwPrompt  = colored(muted, `[sudo] password for ${firstName}:`);
      if (sub === 'hire me' || sub === 'hire-me') {
        return [
          pwPrompt,
          colored(muted, 'Sorry, try again.'),
          colored(muted, 'Sorry, try again.'),
          colored(muted, `${ctx.earnerHandle} is not in the sudoers file. This incident will be reported.`),
          blank(),
          colored(accent, '(credentials speak louder than sudo — share your cert link)'),
        ];
      }
      if (sub.includes('sandwich')) {
        return [pwPrompt, colored(accent, 'Okay.'), blank(), plain('🥪')];
      }
      if (sub.startsWith('rm')) {
        return [
          pwPrompt,
          colored(muted,  "rm: cannot remove '/': Permission denied"),
          colored(accent, 'earner too valuable to delete'),
        ];
      }
      return [
        pwPrompt,
        colored(muted, `sudo: ${args[0] ?? 'command'}: command not found`),
      ];
    }

    case 'rm':
      return [
        colored(muted, "rm: cannot remove '/': Permission denied"),
        colored(dim,   'nice try'),
      ];

    case 'exit':
    case 'logout':
    case 'quit':
      return [colored(muted, "logout: you can't leave. your credentials live here.")];

    case 'clear':
      return 'clear';

    case '':
      return [];

    default:
      return [
        colored(muted, `command not found: ${cmd}`),
        colored(dim,   "type 'help' for available commands"),
      ];
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export function CertViewer({
  credentialId,
  earnerHandle,
  issuedAt,
  languageName,
  languageAccentVar,
  phaseTitle,
  skills,
}: CertViewerProps) {
  const [verifyStep, setVerifyStep] = useState(-1);
  const [showCert,   setShowCert]   = useState(false);
  const [replayKey,  setReplayKey]  = useState(0);
  const instant = useReducedMotion();

  useEffect(() => {
    if (instant) {
      setVerifyStep(VERIFY_STEPS.length - 1);
      setShowCert(true);
      return;
    }
    setVerifyStep(-1);
    setShowCert(false);
    const timers: number[] = [];
    VERIFY_STEPS.forEach((step, i) => {
      timers.push(window.setTimeout(() => setVerifyStep(i), step.delay));
    });
    const last = VERIFY_STEPS[VERIFY_STEPS.length - 1]!.delay;
    timers.push(window.setTimeout(() => setShowCert(true), last + 400));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [instant, replayKey]);

  const [termHistory, setTermHistory] = useState<Array<{ cmd: string; output: TLine[] }>>([]);
  const [inputVal,    setInputVal]    = useState('');
  const [histIdx,     setHistIdx]     = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef  = useRef<HTMLDivElement>(null);
  const endRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [termHistory]);

  useEffect(() => {
    if (showCert) setTimeout(() => inputRef.current?.focus(), 150);
  }, [showCert]);

  const accent     = `var(${languageAccentVar})`;
  const issuedDate = new Date(issuedAt).toISOString().slice(0, 10);
  const verifyUrl  = typeof window !== 'undefined'
    ? `${window.location.host}/cert/${credentialId}`
    : `polyglot-curriculum.vercel.app/cert/${credentialId}`;

  const ctx: Ctx = { credentialId, earnerHandle, issuedDate, languageName, phaseTitle, skills, verifyUrl, accent };

  function submit() {
    const raw = inputVal.trim();
    setInputVal('');
    setHistIdx(-1);
    const result = runCommand(raw, ctx);
    if (result === 'clear') { setTermHistory([]); return; }
    if (result === 'replay') {
      setTermHistory([]);
      setReplayKey((k) => k + 1);
      bodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setTermHistory((h) => [...h, { cmd: raw, output: result }]);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') { e.preventDefault(); submit(); return; }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const cmds = termHistory.map((h) => h.cmd).filter(Boolean).reverse();
      if (!cmds.length) return;
      const next = Math.min(histIdx + 1, cmds.length - 1);
      setHistIdx(next);
      setInputVal(cmds[next]!);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx <= 0) { setHistIdx(-1); setInputVal(''); return; }
      const cmds = termHistory.map((h) => h.cmd).filter(Boolean).reverse();
      const next = histIdx - 1;
      setHistIdx(next);
      setInputVal(cmds[next] ?? '');
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const val = inputVal;
      if (val.toLowerCase().startsWith('cat ')) {
        const partial = val.slice(4).toLowerCase();
        const matches = FILES.filter((f) => f.toLowerCase().startsWith(partial));
        if (matches.length === 1) { setInputVal(`cat ${matches[0]}`); }
        else if (matches.length > 1) {
          setTermHistory((h) => [...h, { cmd: '', output: [tl(...matches.flatMap((m) => [s(m, accent), s('  ')]))] }]);
        }
        return;
      }
      const matches = COMMAND_NAMES.filter((c) => c.startsWith(val.toLowerCase()));
      if (matches.length === 1) { setInputVal(matches[0]!); }
      else if (matches.length > 1 && val.length > 0) {
        setTermHistory((h) => [...h, { cmd: '', output: [tl(...matches.flatMap((m) => [s(m, accent), s('  ')]))] }]);
      }
    }
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
      <div
        className="flex-1 flex flex-col border-0 sm:border"
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

        {/* Terminal body */}
        <div
          ref={bodyRef}
          className="flex-1 overflow-y-auto px-5 sm:px-10 py-6 text-sm cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Boot command */}
          <p className="mb-1" style={{ color: 'var(--fg-muted)' }}>
            <span style={{ color: accent }}>$</span>
            {' verify --credential '}
            <span style={{ color: 'var(--fg)' }}>{credentialId}</span>
          </p>

          {/* Verify animation */}
          {VERIFY_STEPS.map((step, i) => (
            <p
              key={i}
              className="mb-1 transition-opacity duration-300"
              style={{
                opacity: verifyStep >= i ? 1 : 0,
                color: step.accent ? accent : 'var(--fg-muted)',
                textShadow: step.accent ? `0 0 12px color-mix(in srgb, ${accent} 60%, transparent)` : undefined,
              }}
            >
              {step.text}
            </p>
          ))}

          {/* Cert card */}
          {showCert && (
            <div
              className="mt-4 mb-5 border"
              style={{
                borderColor: accent,
                backgroundColor: `color-mix(in srgb, ${accent} 5%, var(--bg))`,
                boxShadow: `inset 0 0 40px color-mix(in srgb, ${accent} 4%, transparent)`,
              }}
            >
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

              <div className="px-5 sm:px-8 py-6 space-y-6">
                <div
                  className="h-px w-full"
                  style={{
                    background: `linear-gradient(90deg, ${accent}, color-mix(in srgb, ${accent} 10%, transparent))`,
                    boxShadow: `0 0 6px color-mix(in srgb, ${accent} 60%, transparent)`,
                  }}
                />
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
                {skills.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] mb-3" style={{ color: 'var(--accent-warn)' }}>
                      demonstrated
                    </p>
                    <ul className="space-y-3">
                      {skills.map((skill, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span
                            className="shrink-0 mt-px"
                            style={{ color: 'var(--accent-prompt)', textShadow: '0 0 8px var(--accent-prompt)' }}
                            aria-hidden="true"
                          >✓</span>
                          <span style={{ color: 'var(--fg)' }}>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
            </div>
          )}

          {/* Command history */}
          {termHistory.map((entry, i) => (
            <div key={i} className="mt-3">
              {entry.cmd && (
                <p className="mb-1" style={{ color: 'var(--fg-muted)' }}>
                  <span style={{ color: accent }}>$</span>
                  {' '}{entry.cmd}
                </p>
              )}
              {entry.output.map((line, j) => (
                <p key={j} className="leading-relaxed">
                  {line.segs.map((seg, k) => (
                    <span key={k} style={{ color: seg.color ?? 'var(--fg)' }}>{seg.text}</span>
                  ))}
                </p>
              ))}
            </div>
          ))}

          {/* Input line — visual prompt with invisible overlay input.
              The input is the same size as the prompt row and sits on top,
              but is fully transparent (no opacity trick — that leaves iOS
              focus rings). Tapping the row hits the input directly. */}
          <div className="mt-3 relative" style={{ minHeight: '1.5em' }}>
            <div className="flex items-center gap-2 pointer-events-none select-none">
              <span style={{ color: accent }}>$</span>
              <span style={{ color: 'var(--fg)' }}>{inputVal}</span>
              <TerminalCursor color={accent} />
            </div>
            <input
              ref={inputRef}
              value={inputVal}
              onChange={(e) => { setInputVal(e.target.value); setHistIdx(-1); }}
              onKeyDown={handleKeyDown}
              className="absolute inset-0 w-full h-full"
              style={{
                color: 'transparent',
                backgroundColor: 'transparent',
                caretColor: 'transparent',
                border: 'none',
                outline: 'none',
                WebkitAppearance: 'none',
                WebkitTapHighlightColor: 'transparent',
                fontSize: '16px',
                padding: 0,
              }}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="terminal input"
            />
          </div>
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
}
