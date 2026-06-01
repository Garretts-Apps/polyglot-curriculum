import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json() as { language?: unknown; phaseLevel?: unknown; earnerName?: unknown };
    const { language, phaseLevel, earnerName } = body;

    if (typeof language !== 'string' || typeof phaseLevel !== 'number') {
      return Response.json({ error: 'invalid' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: 'unauthorized' }, { status: 401 });
    }

    const handle = typeof earnerName === 'string' && earnerName.trim()
      ? earnerName.trim()
      : (user.email?.split('@')[0] ?? 'user');

    // DO UPDATE so re-claiming with a new name updates earner_handle
    const { data: upserted, error: upsertError } = await supabase
      .from('credentials')
      .upsert(
        { user_id: user.id, language, phase_level: phaseLevel, earner_handle: handle },
        { onConflict: 'user_id,language,phase_level', ignoreDuplicates: false }
      )
      .select('id')
      .maybeSingle();

    if (upsertError) {
      console.error('[credentials] upsert error:', upsertError);
      return Response.json({ error: upsertError.message }, { status: 500 });
    }

    // Fallback: if DO UPDATE returned nothing, fetch existing
    if (!upserted) {
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

    return Response.json({ id: upserted.id }, { status: 201 });
  } catch (err) {
    console.error('[credentials] unexpected error:', err);
    return Response.json({ error: 'internal server error' }, { status: 500 });
  }
}

// Update earner_handle on all credentials for the current user (called when name changes)
export async function PATCH(req: Request) {
  try {
    const body = await req.json() as { earnerName?: unknown };
    const { earnerName } = body;

    if (typeof earnerName !== 'string' || !earnerName.trim()) {
      return Response.json({ error: 'invalid' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: 'unauthorized' }, { status: 401 });
    }

    const { error } = await supabase
      .from('credentials')
      .update({ earner_handle: earnerName.trim() })
      .eq('user_id', user.id);

    if (error) {
      console.error('[credentials] name sync error:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[credentials] patch unexpected error:', err);
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
    console.error('[credentials] fetch unexpected error:', err);
    return Response.json({ error: 'internal server error' }, { status: 500 });
  }
}
