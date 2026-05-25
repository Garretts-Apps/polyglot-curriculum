import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS, safeEqual, signSession } from '@/lib/auth';

export const runtime = 'nodejs';

interface LoginBody {
  username?: unknown;
  password?: unknown;
}

export async function POST(req: Request) {
  const expectedUsername = process.env['BASIC_AUTH_USERNAME'];
  const expectedPassword = process.env['BASIC_AUTH_PASSWORD'];
  const secret = process.env['AUTH_SECRET'];

  if (!expectedUsername || !expectedPassword || !secret || secret.length < 32) {
    return Response.json(
      { error: 'auth service misconfigured' },
      { status: 503 },
    );
  }

  let body: LoginBody;
  try {
    body = (await req.json()) as LoginBody;
  } catch {
    return Response.json({ error: 'invalid request body' }, { status: 400 });
  }

  const username = typeof body.username === 'string' ? body.username : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (
    !safeEqual(username, expectedUsername) ||
    !safeEqual(password, expectedPassword)
  ) {
    return Response.json(
      { error: 'creds-mismatch — invalid username or password' },
      { status: 401 },
    );
  }

  const token = await signSession(username);
  const jar = await cookies();
  jar.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return Response.json({ ok: true });
}
