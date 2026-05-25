export const runtime = 'edge';

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

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15_000);
  try {
    const upstream = await fetch('https://play.rust-lang.org/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        channel: 'stable',
        mode: 'debug',
        edition: '2021',
        crateType: 'bin',
        tests: false,
        code,
        backtrace: false,
      }),
      signal: ctrl.signal,
    });
    if (!upstream.ok) {
      return Response.json({ error: 'upstream' }, { status: 502 });
    }
    const data = await upstream.json() as {
      stdout?: string;
      stderr?: string;
      success?: boolean;
    };
    return Response.json({
      stdout: data.stdout ?? '',
      stderr: data.stderr ?? '',
      success: data.success ?? false,
    });
  } catch (e) {
    if ((e as Error)?.name === 'AbortError') {
      return Response.json({ error: 'timeout' }, { status: 504 });
    }
    return Response.json({ error: 'upstream' }, { status: 502 });
  } finally {
    clearTimeout(timer);
  }
}
