type KvShape = {
  get: (k: string) => Promise<unknown>;
  set: (k: string, v: unknown) => Promise<unknown>;
};

let cached: KvShape | null | undefined; // undefined = not tried; null = unavailable

export async function getKv(): Promise<KvShape | null> {
  if (cached !== undefined) return cached;
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    cached = null;
    return null;
  }
  try {
    const mod = await import('@vercel/kv');
    cached = mod.kv as unknown as KvShape;
    return cached;
  } catch {
    cached = null;
    return null;
  }
}
