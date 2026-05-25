// Lazy-loads esbuild-wasm from CDN and caches the initialized instance.

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    esbuild?: any;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cachedEsbuild: any = null;
let initPromise: Promise<unknown> | null = null;

const ESBUILD_CDN = 'https://cdn.jsdelivr.net/npm/esbuild-wasm@0.25.0/esm/browser.min.js';
const ESBUILD_WASM_URL = 'https://cdn.jsdelivr.net/npm/esbuild-wasm@0.25.0/esbuild.wasm';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loadEsbuild(): Promise<any> {
  if (cachedEsbuild) return cachedEsbuild;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    // Dynamically import esbuild-wasm from CDN as an ESM module
    const esbuild = await import(/* webpackIgnore: true */ ESBUILD_CDN);

    await esbuild.initialize({
      wasmURL: ESBUILD_WASM_URL,
    });

    cachedEsbuild = esbuild;
    return esbuild;
  })();

  return initPromise;
}
