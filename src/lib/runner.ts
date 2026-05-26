import type { Language } from '@/curriculum/types';

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script ${src}`));
    document.head.appendChild(script);
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pyodidePromise: Promise<any> | null = null;
async function getPyodide() {
  if (pyodidePromise) return pyodidePromise;
  pyodidePromise = (async () => {
    await loadScript('https://cdn.jsdelivr.net/pyodide/v0.26.0/full/pyodide.js');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const py = await (window as any).loadPyodide();
    return py;
  })();
  return pyodidePromise;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let tsPromise: Promise<any> | null = null;
async function getTS() {
  if (tsPromise) return tsPromise;
  tsPromise = (async () => {
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/typescript/5.4.5/typescript.min.js');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (window as any).ts;
  })();
  return tsPromise;
}

function formatStringToJS(fmtStr: string, argsStr?: string): string {
  if (!argsStr) return `\`${fmtStr}\``;
  const args = argsStr.split(',').map((a) => a.trim());
  let jsFmt = fmtStr;
  let argIdx = 0;
  // Replace both Rust {} and Go/C# placeholders %v, %d, %s, {0}, {1} etc.
  jsFmt = jsFmt.replace(/\{\}|\{\:\?\}|\{\d+\}|%[vdsf]/g, () => {
    if (argIdx < args.length) {
      const replacement = `\${${args[argIdx]}}`;
      argIdx++;
      return replacement;
    }
    return '{}';
  });
  return `\`${jsFmt}\``;
}

function runJS(jsCode: string): { output: string; error?: string } {
  const logs: string[] = [];
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;

  console.log = (...args) => {
    logs.push(args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
  };
  console.error = (...args) => {
    logs.push('[ERROR] ' + args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
  };
  console.warn = (...args) => {
    logs.push('[WARN] ' + args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
  };

  try {
    const fn = new Function(jsCode);
    fn();
    return { output: logs.join('\n') };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { output: logs.join('\n'), error: msg };
  } finally {
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
  }
}

async function runPython(code: string): Promise<{ output: string; error?: string }> {
  try {
    const py = await getPyodide();
    const outputBuffer: string[] = [];
    py.setStdout({
      batched: (str: string) => {
        outputBuffer.push(str);
      },
    });
    py.setStderr({
      batched: (str: string) => {
        outputBuffer.push(str);
      },
    });
    await py.runPythonAsync(code);
    return { output: outputBuffer.join('\n') };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { output: '', error: msg };
  }
}

async function runTypeScript(code: string): Promise<{ output: string; error?: string }> {
  try {
    const ts = await getTS();
    const compiled = ts.transpileModule(code, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.CommonJS,
      },
    }).outputText;
    return runJS(compiled);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { output: '', error: msg };
  }
}

function transpileGoToJS(code: string): string {
  let js = code;

  // Remove package & imports
  js = js.replace(/package\s+main\b/g, '');
  js = js.replace(/import\s+\([^)]*\)/g, '');
  js = js.replace(/import\s+"[^"]*"/g, '');

  // Translate variables
  // x := value -> let x = value
  js = js.replace(/([a-zA-Z_][a-zA-Z0-9_]*)\s*:=\s*/g, 'let $1 = ');
  
  // var x type = value -> let x = value
  js = js.replace(/var\s+([a-zA-Z_][a-zA-Z0-9_]*)\s+[a-zA-Z0-9_*\[\]]+\s*=\s*/g, 'let $1 = ');
  js = js.replace(/var\s+([a-zA-Z_][a-zA-Z0-9_]*)\s+(int|string|float64|bool|byte)/g, 'let $1 = null');

  // Translate functions
  // func name(args) type { -> function name(args) {
  js = js.replace(/func\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)\s*(?:[a-zA-Z0-9_*\[\]\s]+)?\s*\{/g, (match, funcName, args) => {
    const cleanArgs = args.split(',').map((arg: string) => {
      const parts = arg.trim().split(/\s+/);
      return (parts[0] || '').trim();
    }).join(', ');
    return `function ${funcName}(${cleanArgs}) {`;
  });

  // Print statements
  js = js.replace(/fmt\.Println\(([^)]*)\)/g, 'console.log($1)');
  js = js.replace(/fmt\.Printf\("([^"]*)"(?:,\s*([^)]*))?\)/g, (match, fmtStr, argsStr) => {
    if (!argsStr) return `console.log("${fmtStr}")`;
    return `console.log(${formatStringToJS(fmtStr, argsStr)})`;
  });
  js = js.replace(/fmt\.Print\(([^)]*)\)/g, 'console.log($1)');

  // Loops
  // for let i = 0; i < 10; i++ { -> for (let i = 0; i < 10; i++) { (since we replaced := earlier)
  js = js.replace(/for\s+let\s+([^;]+);\s*([^;]+);\s*([^{]+)\{/g, 'for (let $1; $2; $3) {');
  // for condition { -> while (condition) {
  js = js.replace(/for\s+([^;{]+)\s*\{/g, 'while ($1) {');
  // Infinite loop
  js = js.replace(/for\s*\{/g, 'while (true) {');

  if (js.includes('function main()')) {
    js += '\nmain();';
  }

  return js;
}

function transpileRustToJS(code: string): string {
  let js = code;

  // let mut x = val -> let x = val
  js = js.replace(/\blet\s+mut\s+/g, 'let ');

  // Translate fn name(args) -> type { -> function name(args) {
  js = js.replace(/fn\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)(?:\s*->\s*[^{]+)?\s*\{/g, (match, funcName, args) => {
    const cleanArgs = args.split(',').map((arg: string) => {
      const parts = arg.trim().split(':');
      return (parts[0] || '').trim();
    }).join(', ');
    return `function ${funcName}(${cleanArgs}) {`;
  });

  // Print statements
  js = js.replace(/println!\("([^"]*)"(?:,\s*([^)]*))?\)/g, (match, fmtStr, argsStr) => {
    if (!argsStr) return `console.log("${fmtStr}")`;
    return `console.log(${formatStringToJS(fmtStr, argsStr)})`;
  });
  js = js.replace(/print!\("([^"]*)"(?:,\s*([^)]*))?\)/g, (match, fmtStr, argsStr) => {
    if (!argsStr) return `console.log("${fmtStr}")`;
    return `console.log(${formatStringToJS(fmtStr, argsStr)})`;
  });

  if (js.includes('function main()')) {
    js += '\nmain();';
  }

  return js;
}

function transpileCSharpToJS(code: string): string {
  let js = code;

  // Remove standard System directives
  js = js.replace(/using\s+System[^;]*;/g, '');

  // Console statements
  js = js.replace(/Console\.WriteLine\("([^"]*)"(?:,\s*([^)]*))?\)/g, (match, fmtStr, argsStr) => {
    if (!argsStr) return `console.log("${fmtStr}")`;
    return `console.log(${formatStringToJS(fmtStr, argsStr)})`;
  });
  js = js.replace(/Console\.WriteLine\(([^)]*)\)/g, 'console.log($1)');
  js = js.replace(/Console\.Write\(([^)]*)\)/g, 'console.log($1)');

  // Convert typical declarations
  js = js.replace(/\b(?:int|string|double|float|bool|var|auto|char|long)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g, 'let $1 =');

  // Convert methods
  js = js.replace(/static\s+void\s+Main\s*\([^)]*\)\s*\{/g, 'function main() {');
  js = js.replace(/void\s+Main\s*\([^)]*\)\s*\{/g, 'function main() {');
  
  // Namespace/class strip
  js = js.replace(/namespace\s+[a-zA-Z0-9_.]+\s*\{/g, '');
  js = js.replace(/class\s+[a-zA-Z0-9_]+\s*\{/g, '');

  if (js.includes('function main()')) {
    js += '\nmain();';
  }

  return js;
}

function transpileFSharpToJS(code: string): string {
  let js = code;

  // Print statements
  js = js.replace(/printfn\s+"([^"]*)"(?:,\s*([^)]*))?/g, (match, fmtStr, argsStr) => {
    if (!argsStr) return `console.log("${fmtStr}")`;
    return `console.log(${formatStringToJS(fmtStr, argsStr)})`;
  });

  // F# simple let conversion
  // let x = 5 -> let x = 5
  // We keep it as is, but we can do a simple match execution for main if needed

  return js;
}

export async function runCode(
  language: Language,
  code: string
): Promise<{ output: string; error?: string }> {
  if (typeof window === 'undefined') {
    return { output: '', error: 'Cannot run code in server-side context.' };
  }
  switch (language) {
    case 'python':
      return runPython(code);
    case 'typescript':
      return runTypeScript(code);
    case 'go':
      return runJS(transpileGoToJS(code));
    case 'rust':
      return runJS(transpileRustToJS(code));
    case 'csharp':
      return runJS(transpileCSharpToJS(code));
    case 'fsharp':
      return runJS(transpileFSharpToJS(code));
    default:
      return { output: '', error: `Unsupported language: ${language}` };
  }
}
