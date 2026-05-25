import { NextRequest, NextResponse } from 'next/server';
import { PUBLIC_PATHS } from '@/lib/auth';
import { updateSession } from '@/lib/supabase/middleware';

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
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Fail closed if env is misconfigured
  if (!supabaseUrl || !supabaseAnonKey) {
    return new NextResponse(
      'Service misconfigured: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set',
      { status: 503 }
    );
  }

  const { pathname, search } = request.nextUrl;

  // Login page + auth endpoints are always public so the user can authenticate.
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Initial pass-through response
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  try {
    // updateSession handles refreshing token and reading/writing Supabase cookies
    const { user, response: supabaseResponse } = await updateSession(request, response);

    if (user) {
      return supabaseResponse;
    }
  } catch (error) {
    console.error('Middleware session verification failed:', error);
  }

  // No valid session — redirect to /login with `?from=` so we can return after.
  const loginUrl = new URL('/login', request.url);
  const from = `${pathname}${search}`;
  if (from && from !== '/' && from !== '/login') {
    loginUrl.searchParams.set('from', from);
  }
  return NextResponse.redirect(loginUrl);
}
