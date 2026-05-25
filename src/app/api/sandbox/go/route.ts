export const runtime = 'edge';

interface GoEvent {
  Kind: string;
  Message: string;
  Delay?: number;
}

interface GoCompileResponse {
  Errors?: string;
  Events?: GoEvent[];
}

export async function POST(req: Request) {
  let code: string;
  try {
    const body = await req.json() as { code?: unknown };
    if (typeof body.code !== 'string' || body.code.length > 5000) {
      return Response.json({ error: 'invalid' }, { status: 400 });
    }
    code = body.code;
  } catch {
    return Response.json({ error: 'invalid json' }, { status: 400 });
  }

  const formBody = new URLSearchParams();
  formBody.set('version', '2');
  formBody.set('body', code);
  formBody.set('withVet', 'true');

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15_000);
  try {
    const upstream = await fetch('https://go.dev/_/compile?backend=', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formBody.toString(),
      signal: ctrl.signal,
    });
    if (!upstream.ok) {
      return Response.json({ error: 'upstream' }, { status: 502 });
    }
    const data = await upstream.json() as GoCompileResponse;
    if (data.Errors) {
      return Response.json({ stdout: '', stderr: data.Errors });
    }
    const stdout = (data.Events ?? [])
      .filter((e) => e.Kind === 'stdout')
      .map((e) => e.Message)
      .join('');
    const stderr = (data.Events ?? [])
      .filter((e) => e.Kind === 'stderr')
      .map((e) => e.Message)
      .join('');
    return Response.json({ stdout, stderr });
  } catch (e) {
    if ((e as Error)?.name === 'AbortError') {
      return Response.json({ error: 'timeout' }, { status: 504 });
    }
    return Response.json({ error: 'upstream' }, { status: 502 });
  } finally {
    clearTimeout(timer);
  }
}
