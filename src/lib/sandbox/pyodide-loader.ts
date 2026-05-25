// Lazy-loads Pyodide from CDN and caches the instance across runs.
// The first load fetches ~6-10 MB; subsequent calls return instantly.
//
// SRI NOTE: We cannot add an `integrity` attribute to the Pyodide loader script
// because Pyodide internally fetches additional wheel files and wasm blobs that
// do not have public SRI hashes. The CDN (cdn.jsdelivr.net) is therefore a trust
// dependency. Mitigation: the Content-Security-Policy header restricts script-src
// to only this CDN origin, limiting the blast radius of a CDN compromise.

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loadPyodide?: (opts: { indexURL: string }) => Promise<any>;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cachedPyodide: any = null;
let loadPromise: Promise<unknown> | null = null;

const PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loadPyodideInstance(): Promise<any> {
  if (cachedPyodide) return cachedPyodide;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    // Inject the CDN script if not already present
    if (!window.loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `${PYODIDE_CDN}pyodide.js`;
        script.crossOrigin = 'anonymous';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Pyodide script'));
        document.head.appendChild(script);
      });
    }

    if (!window.loadPyodide) {
      throw new Error('loadPyodide not available after script load');
    }

    const pyodide = await window.loadPyodide({ indexURL: PYODIDE_CDN });
    cachedPyodide = pyodide;
    return pyodide;
  })();

  return loadPromise;
}
