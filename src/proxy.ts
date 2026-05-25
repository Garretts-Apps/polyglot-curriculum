import { NextRequest, NextResponse } from 'next/server';
import { PUBLIC_PATHS, SESSION_COOKIE_NAME, verifySession } from '@/lib/auth';

export const config = {
  // PWA assets (manifest, service worker, app icons, apple-touch-icon) are excluded so
  // browsers can fetch them without auth round-trips. The install flow is sensitive
  // to extra challenges on Safari iOS, and these files contain no secrets.
  // `_next/image` is also excluded so Next.js image optimisation doesn't hit auth on
  // every resize request.
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|sw.js|icons|apple-touch-icon.png).*)',
  ],
};

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const expectedUsername = process.env['BASIC_AUTH_USERNAME'];
  const expectedPassword = process.env['BASIC_AUTH_PASSWORD'];
  const secret = process.env['AUTH_SECRET'];

  // Fail closed if env is misconfigured — same posture as the old basic-auth proxy.
  if (!expectedUsername || !expectedPassword || !secret || secret.length < 32) {
    return new NextResponse(
      'Service misconfigured: BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD, and AUTH_SECRET (32+ chars) must be set',
      { status: 503 },
    );
  }

  const { pathname, search } = request.nextUrl;

  // Login page + auth endpoints are always public so the user can authenticate.
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (token) {
    const session = await verifySession(token);
    if (session) {
      return NextResponse.next();
    }
  }

  // No valid session — redirect to /login with `?from=` so we can return after.
  const loginUrl = new URL('/login', request.url);
  const from = `${pathname}${search}`;
  if (from && from !== '/' && from !== '/login') {
    loginUrl.searchParams.set('from', from);
  }
  return NextResponse.redirect(loginUrl);
}
