import { createClient } from '@/lib/supabase/server';
import { STORAGE_VERSION, stripDangerousKeys } from '@/lib/storage';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: 'unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('user_progress')
      .select('progress')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching progress from Supabase:', error);
      return new Response(null, { status: 204 });
    }

    if (!data || !data.progress) {
      return new Response(null, { status: 204 });
    }

    return Response.json(data.progress);
  } catch (err) {
    console.error('Unexpected error fetching progress:', err);
    return new Response(null, { status: 204 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (
      typeof body !== 'object' ||
      body == null ||
      (body as { version?: number }).version !== STORAGE_VERSION
    ) {
      return Response.json({ error: 'invalid' }, { status: 400 });
    }

    const sanitizedBody = stripDangerousKeys(body);

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: 'unauthorized' }, { status: 401 });
    }

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        progress: sanitizedBody,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Error upserting progress in Supabase:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return new Response(null, { status: 204 });
  } catch (err) {
    console.error('Unexpected error saving progress:', err);
    return Response.json({ error: 'internal server error' }, { status: 500 });
  }
}
