import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { PWARegister } from '@/components/PWARegister';
import { ProgressProvider } from '@/lib/use-progress';

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-feature',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'polyglot@terminal:~$',
  description:
    'A six-language self-study tracker rendered like a developer terminal — phases, knowledge checks, sandboxes.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0d12',
  width: 'device-width',
  initialScale: 1,
  /* iOS notch / Dynamic Island: render under chrome and let CSS env() handle
   * insets. Combined with the dot-grid background-attachment: fixed this gives
   * an edge-to-edge terminal feel without breaking content layout. */
  viewportFit: 'cover',
  /* Match dark terminal palette so the iOS status-bar contrast is correct. */
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${mono.variable}`}>
      <body className="min-h-dvh flex flex-col antialiased">
        <ProgressProvider>
          <PWARegister />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-3 focus:py-2 focus:bg-[var(--accent-prompt)] focus:text-[var(--bg)] focus:font-semibold"
          >
            $ jump --to=#main-content
          </a>
          {children}
        </ProgressProvider>
      </body>
    </html>
  );
}
