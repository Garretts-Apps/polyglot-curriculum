import type { Language } from '@/curriculum/types';

const loadingScripts = new Map<string, Promise<void>>();

function loadScript(src: string): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }
  let promise = loadingScripts.get(src);
  if (promise) return promise;

  if (document.querySelector(`script[src="${src}"]`)) {
    return Promise.resolve();
  }

  promise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => {
      loadingScripts.delete(src);
      reject(new Error(`Failed to load script ${src}`));
    };
    document.head.appendChild(script);
  });
  loadingScripts.set(src, promise);
  return promise;
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

/**
 * Splits print arguments by comma, ignoring commas nested inside quotes, parentheses, brackets, or braces.
 */
function splitArgs(argsStr: string): string[] {
  const result: string[] = [];
  let current = '';
  let depth = 0;
  let inQuote: string | null = null;

  for (let i = 0; i < argsStr.length; i++) {
    const char = argsStr[i];
    if (inQuote) {
      if (char === inQuote && argsStr[i - 1] !== '\\') {
        inQuote = null;
      }
      current += char;
    } else if (char === '"' || char === "'" || char === '`') {
      inQuote = char;
      current += char;
    } else if (char === '(' || char === '[' || char === '{') {
      depth++;
      current += char;
    } else if (char === ')' || char === ']' || char === '}') {
      depth--;
      current += char;
    } else if (char === ',' && depth === 0) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  if (current.trim()) {
    result.push(current.trim());
  }
  return result;
}

function formatStringToJS(fmtStr: string, argsStr?: string): string {
  if (!argsStr) return `\`${fmtStr}\``;
  const args = splitArgs(argsStr);
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
  js = js.replace(/var\s+([a-zA-Z_][a-zA-Z0-9_]*)\s+[a-zA-Z0-9_*\[\]\s]+\s*=\s*/g, 'let $1 = ');
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

  // Strip Rust type annotations: let x: i32 = 5; -> let x = 5;
  js = js.replace(/\blet\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*:[^=]+=/g, 'let $1 =');

  // Strip references and dereferences
  js = js.replace(/\b&([a-zA-Z_][a-zA-Z0-9_]*)\b/g, '$1');
  js = js.replace(/\*([a-zA-Z_][a-zA-Z0-9_]*)\b/g, '$1');

  // Translate fn name(args) -> type { ... }
  // Handles implicit return on last line without a semicolon
  js = js.replace(/fn\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)(?:\s*->\s*[^{]+)?\s*\{([^}]*)\}/g, (match, funcName, args, body) => {
    const cleanArgs = args.split(',').map((arg: string) => {
      const parts = arg.trim().split(':');
      return (parts[0] || '').trim();
    }).join(', ');
    
    // Process implicit returns in body
    let cleanBody = body.trim();
    const lines = cleanBody.split('\n');
    if (lines.length > 0) {
      const lastLineIdx = lines.length - 1;
      const lastLine = lines[lastLineIdx].trim();
      if (lastLine && !lastLine.endsWith(';') && !lastLine.endsWith('}') && !lastLine.startsWith('return ') && !lastLine.startsWith('if') && !lastLine.startsWith('for') && !lastLine.startsWith('while')) {
        lines[lastLineIdx] = 'return ' + lastLine;
      }
    }
    cleanBody = lines.join('\n');
    return `function ${funcName}(${cleanArgs}) {\n${cleanBody}\n}`;
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
  js = js.replace(/(?:public\s+|private\s+)?static\s+void\s+Main\s*\([^)]*\)\s*\{/g, 'function main() {');
  js = js.replace(/(?:public\s+|private\s+)?void\s+Main\s*\([^)]*\)\s*\{/g, 'function main() {');
  
  // Namespace/class header strip
  js = js.replace(/namespace\s+[a-zA-Z0-9_.]+\s*\{/g, '');
  js = js.replace(/class\s+[a-zA-Z0-9_]+\s*\{/g, '');

  // Brace balancer: remove unmatched closing braces at the end of the file
  let openBraces = 0;
  let cleanJs = '';
  for (let i = 0; i < js.length; i++) {
    const char = js[i];
    if (char === '{') openBraces++;
    if (char === '}') {
      if (openBraces > 0) {
        openBraces--;
        cleanJs += char;
      }
    } else {
      cleanJs += char;
    }
  }
  js = cleanJs;

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

  return js;
}

export async function transpileCode(
  language: Language,
  code: string
): Promise<{ transpiledCode: string; error?: string }> {
  switch (language) {
    case 'python':
      return { transpiledCode: code };
    case 'typescript':
      try {
        const ts = await getTS();
        const compiled = ts.transpileModule(code, {
          compilerOptions: {
            target: ts.ScriptTarget.ES2020,
            module: ts.ModuleKind.CommonJS,
          },
        }).outputText;
        return { transpiledCode: compiled };
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return { transpiledCode: '', error: msg };
      }
    case 'go':
      return { transpiledCode: transpileGoToJS(code) };
    case 'rust':
      return { transpiledCode: transpileRustToJS(code) };
    case 'csharp':
      return { transpiledCode: transpileCSharpToJS(code) };
    case 'fsharp':
      return { transpiledCode: transpileFSharpToJS(code) };
    default:
      return { transpiledCode: '', error: `Unsupported language: ${language}` };
  }
}
