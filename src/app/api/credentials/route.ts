import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json() as { language?: unknown; phaseLevel?: unknown };
    const { language, phaseLevel } = body;

    if (typeof language !== 'string' || typeof phaseLevel !== 'number') {
      return Response.json({ error: 'invalid' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: 'unauthorized' }, { status: 401 });
    }

    const handle = user.email?.split('@')[0] ?? 'user';

    // Try INSERT … ON CONFLICT DO NOTHING (avoids needing an UPDATE RLS policy)
    const { data: inserted, error: insertError } = await supabase
      .from('credentials')
      .upsert(
        { user_id: user.id, language, phase_level: phaseLevel, earner_handle: handle },
        { onConflict: 'user_id,language,phase_level', ignoreDuplicates: true }
      )
      .select('id')
      .maybeSingle();

    if (insertError) {
      console.error('[credentials] upsert error:', insertError);
      return Response.json({ error: insertError.message }, { status: 500 });
    }

    // If there was a conflict the upsert is a no-op — fetch the existing row
    if (!inserted) {
      const { data: existing, error: fetchError } = await supabase
        .from('credentials')
        .select('id')
        .eq('user_id', user.id)
        .eq('language', language)
        .eq('phase_level', phaseLevel)
        .single();

      if (fetchError || !existing) {
        console.error('[credentials] fetch after conflict error:', fetchError);
        return Response.json({ error: 'could not resolve credential' }, { status: 500 });
      }

      return Response.json({ id: existing.id }, { status: 200 });
    }

    return Response.json({ id: inserted.id }, { status: 201 });
  } catch (err) {
    console.error('[credentials] unexpected error:', err);
    return Response.json({ error: 'internal server error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return Response.json({ error: 'missing id' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('credentials')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return Response.json({ error: 'not found' }, { status: 404 });
    }

    return Response.json(data);
  } catch (err) {
    console.error('Unexpected error fetching credential:', err);
    return Response.json({ error: 'internal server error' }, { status: 500 });
  }
}
