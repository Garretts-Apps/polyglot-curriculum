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

    const { data, error } = await supabase
      .from('credentials')
      .upsert(
        { user_id: user.id, language, phase_level: phaseLevel, earner_handle: handle },
        { onConflict: 'user_id,language,phase_level', ignoreDuplicates: false }
      )
      .select('id')
      .single();

    if (error) {
      console.error('Error issuing credential:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ id: data.id }, { status: 201 });
  } catch (err) {
    console.error('Unexpected error issuing credential:', err);
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
