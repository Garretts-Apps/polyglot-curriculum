import { jwtVerify, SignJWT } from 'jose';

/**
 * Cookie-based session authentication.
 *
 * Replaces the previous HTTP Basic Auth (which triggered Safari 17+
 * "this site is not secure" warnings on iOS because the password is sent
 * unencrypted with every request). We now show a login form, validate
 * credentials against the existing `BASIC_AUTH_USERNAME` / `BASIC_AUTH_PASSWORD`
 * env vars, and issue a signed HS256 JWT in an HTTP-only cookie.
 *
 * `jose` is used because it works in the edge runtime where `node:crypto`
 * is not available; `proxy.ts` runs at the edge.
 */

export const SESSION_COOKIE_NAME = 'polyglot_session';

/** 30 days in seconds — matches the cookie Max-Age and the JWT `exp` claim. */
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

/** Names of public paths that bypass the auth check in `proxy.ts`. */
export const PUBLIC_PATHS = ['/login', '/api/auth/login', '/api/auth/signup', '/api/auth/logout'];

interface SessionPayload {
  user: string;
  iat: number;
  exp: number;
}

function getSecret(): Uint8Array | null {
  const secret = process.env['AUTH_SECRET'];
  if (!secret || secret.length < 32) return null;
  return new TextEncoder().encode(secret);
}

/** Sign an HS256 session token for `username`. Throws if `AUTH_SECRET` is missing. */
export async function signSession(username: string): Promise<string> {
  const key = getSecret();
  if (!key) throw new Error('AUTH_SECRET missing or too short (need 32+ chars)');
  return new SignJWT({ user: username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(key);
}

/**
 * Verify a signed session token. Returns the payload on success, or `null` on
 * any failure (invalid signature, expired, malformed). Never throws.
 */
export async function verifySession(token: string): Promise<SessionPayload | null> {
  const key = getSecret();
  if (!key) return null;
  try {
    const { payload } = await jwtVerify<SessionPayload>(token, key, {
      algorithms: ['HS256'],
    });
    if (typeof payload.user !== 'string' || payload.user.length === 0) return null;
    return payload;
  } catch {
    return null;
  }
}

/** Constant-time string comparison safe for edge runtime. */
export function safeEqual(a: string, b: string): boolean {
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
