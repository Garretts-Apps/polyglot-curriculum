/**
 * Authentication paths configuration.
 *
 * Defines the public paths that bypass the Edge middleware authorization check.
 */

/** Names of public paths that bypass the auth check in `middleware.ts`. */
export const PUBLIC_PATHS = ['/login', '/api/auth/login', '/api/auth/signup', '/api/auth/logout', '/privacy', '/terms', '/cert', '/api/credentials'];
