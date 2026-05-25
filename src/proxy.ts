import { NextRequest, NextResponse } from "next/server";

export const config = {
  // PWA assets (manifest, service worker, app icons, apple-touch-icon) are excluded so
  // browsers can fetch them without a Basic-Auth round-trip. The install flow is sensitive
  // to extra 401 challenges on Safari iOS, and these files contain no secrets.
  // `_next/image` is also excluded so Next.js image optimisation doesn't hit auth on every
  // resize request.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|sw.js|icons|apple-touch-icon.png).*)",
  ],
};

/** Constant-time string comparison safe for edge runtime (no crypto.timingSafeEqual). */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    // Still iterate to avoid length-based timing leak
    const len = Math.max(a.length, b.length);
    for (let i = 0; i < len; i++) {
      void ((a.charCodeAt(i) ?? 0) ^ (b.charCodeAt(i) ?? 0));
    }
    return false;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= (a.charCodeAt(i) ?? 0) ^ (b.charCodeAt(i) ?? 0);
  }
  return diff === 0;
}

export function proxy(request: NextRequest): NextResponse {
  const expectedUsername = process.env["BASIC_AUTH_USERNAME"];
  const expectedPassword = process.env["BASIC_AUTH_PASSWORD"];

  if (!expectedUsername || !expectedPassword) {
    return new NextResponse("Service misconfigured: BASIC_AUTH env vars not set", { status: 503 });
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader?.startsWith("Basic ")) {
    const base64 = authHeader.slice("Basic ".length);
    const decoded = atob(base64);
    const colonIdx = decoded.indexOf(":");
    if (colonIdx !== -1) {
      const username = decoded.slice(0, colonIdx);
      const password = decoded.slice(colonIdx + 1);
      if (
        safeEqual(username, expectedUsername) &&
        safeEqual(password, expectedPassword)
      ) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Polyglot"',
    },
  });
}
