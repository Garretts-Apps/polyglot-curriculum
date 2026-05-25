import type { Metadata, Viewport } from 'next';
import { Fraunces, Geist, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz'],
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Polyglot Curriculum',
  description: 'Personalized self-study tracker for six languages.',
};

export const viewport: Viewport = {
  themeColor: '#0B0A09',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${fraunces.variable} ${geist.variable} ${mono.variable}`}
    >
      <body className="min-h-dvh flex flex-col antialiased">{children}</body>
    </html>
  );
}
