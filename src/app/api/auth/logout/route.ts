import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Logout error:', error);
  }

  // If the form submission accepts HTML (browser default), redirect to /login.
  // For JSON callers, return a tiny ack.
  const accept = req.headers.get('accept') ?? '';
  if (accept.includes('text/html')) {
    const url = new URL('/login', req.url);
    return Response.redirect(url, 303);
  }
  return Response.json({ ok: true });
}
