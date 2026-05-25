import { getKv } from '@/lib/kv';
import { STORAGE_VERSION } from '@/lib/storage';

export const runtime = 'nodejs';

const KEY = 'progress:singleton';

export async function GET() {
  const kv = await getKv();
  if (!kv) return new Response(null, { status: 204 });
  const data = await kv.get(KEY);
  if (!data) return new Response(null, { status: 204 });
  return Response.json(data);
}

export async function PUT(req: Request) {
  const body = await req.json();
  if (
    typeof body !== 'object' ||
    body == null ||
    (body as { version?: number }).version !== STORAGE_VERSION
  ) {
    return Response.json({ error: 'invalid' }, { status: 400 });
  }
  const kv = await getKv();
  if (!kv) return new Response(null, { status: 204 });
  await kv.set(KEY, body);
  return new Response(null, { status: 204 });
}
