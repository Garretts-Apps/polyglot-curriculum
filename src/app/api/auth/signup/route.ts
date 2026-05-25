import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

interface SignupBody {
  email?: unknown;
  password?: unknown;
}

export async function POST(req: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return Response.json(
      { error: 'auth service misconfigured' },
      { status: 503 }
    );
  }

  let body: SignupBody;
  try {
    body = (await req.json()) as SignupBody;
  } catch {
    return Response.json({ error: 'invalid request body' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!email || !password) {
    return Response.json(
      { error: 'email and password are required' },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return Response.json(
      { error: 'password must be at least 6 characters long' },
      { status: 400 }
    );
  }

  // Basic email regex sanity check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Response.json(
      { error: 'invalid email address format' },
      { status: 400 }
    );
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Check if the user needs to confirm their email
    const sessionActive = data.session !== null;
    return Response.json({
      ok: true,
      sessionActive,
      message: sessionActive ? 'signup-success' : 'confirmation-required',
    });
  } catch (err) {
    console.error('Signup error:', err);
    return Response.json(
      { error: 'internal server error during registration' },
      { status: 500 }
    );
  }
}
