import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const jar = await cookies();
  jar.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  // If the form submission accepts HTML (browser default), redirect to /login.
  // For JSON callers, return a tiny ack.
  const accept = req.headers.get('accept') ?? '';
  if (accept.includes('text/html')) {
    const url = new URL('/login', req.url);
    return Response.redirect(url, 303);
  }
  return Response.json({ ok: true });
}
