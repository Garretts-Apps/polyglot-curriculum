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

  // Convert C# interpolated strings $"...{expr}..." to JS template literals
  js = js.replace(/\$"([^"]*)"/g, (_m, content: string) => {
    const tpl = content.replace(/\{([^}]+)\}/g, '${$1}');
    return '`' + tpl + '`';
  });

  // Console statements
  js = js.replace(/Console\.WriteLine\("([^"]*)"(?:,\s*([^)]*))?\)/g, (match, fmtStr, argsStr) => {
    if (!argsStr) return `console.log("${fmtStr}")`;
    return `console.log(${formatStringToJS(fmtStr, argsStr)})`;
  });
  js = js.replace(/Console\.WriteLine\(([^)]*)\)/g, 'console.log($1)');
  js = js.replace(/Console\.Write\(([^)]*)\)/g, 'console.log($1)');

  // Convert Main entry points
  js = js.replace(/(?:public\s+|private\s+)?static\s+void\s+Main\s*\([^)]*\)\s*\{/g, 'function main() {');
  js = js.replace(/(?:public\s+|private\s+)?void\s+Main\s*\([^)]*\)\s*\{/g, 'function main() {');

  // Convert other typed function declarations (including top-level local functions):
  // <return-type> Name(<type> p, <type> q) {  ->  function Name(p, q) {
  js = js.replace(
    /(?:public\s+|private\s+|protected\s+|internal\s+)?(?:static\s+)?\b(?:int|string|double|float|bool|void|char|long|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)\s*\{/g,
    (_m, name: string, params: string) => {
      const clean = params
        .split(',')
        .map((p) => {
          const tokens = p.trim().split(/\s+/);
          return tokens.length >= 2 ? tokens[1] : tokens[0];
        })
        .filter(Boolean)
        .join(', ');
      return `function ${name}(${clean}) {`;
    }
  );

  // Convert typical declarations
  js = js.replace(/\b(?:int|string|double|float|bool|var|auto|char|long)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g, 'let $1 =');
  
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

/**
 * Ruby → JS. Handles puts/print/p, `#{}` interpolation, `def`/`end` blocks,
 * `.times do |i|` loops, string concat with `+`, and `attr` style getters at a
 * shallow level — enough for the print-based exercises in the curriculum.
 */
function transpileRubyToJS(code: string): string {
  let js = code;

  // "#{expr}" interpolation inside double-quoted strings → `${expr}`
  js = js.replace(/"([^"]*)"/g, (_m, body: string) => {
    if (!body.includes('#{')) return `"${body}"`;
    const tpl = body.replace(/#\{([^}]+)\}/g, '${$1}');
    return '`' + tpl + '`';
  });

  // puts / print / p  →  console.log
  js = js.replace(/\b(?:puts|print|p)\s+(.+)$/gm, 'console.log($1);');

  // n.times do |i| ... end  →  for (let i = 0; i < n; i++) { ... }
  js = js.replace(/([a-zA-Z0-9_().]+)\.times\s+do\s*\|\s*([a-zA-Z_]\w*)\s*\|/g, 'for (let $2 = 0; $2 < $1; $2++) {');

  // (a..b).each do |i|  →  for (let i = a; i <= b; i++) {
  js = js.replace(/\(\s*(\d+)\s*\.\.\s*(\d+)\s*\)\.each\s+do\s*\|\s*([a-zA-Z_]\w*)\s*\|/g, 'for (let $3 = $1; $3 <= $2; $3++) {');

  // def name(args) → function name(args) {   ;   bare def name → function name() {
  js = js.replace(/\bdef\s+([a-zA-Z_]\w*[?!]?)\s*\(([^)]*)\)/g, 'function $1($2) {');
  js = js.replace(/\bdef\s+([a-zA-Z_]\w*[?!]?)\s*$/gm, 'function $1() {');

  // `end` → `}`
  js = js.replace(/^\s*end\s*$/gm, '}');

  return js;
}

/** Java → JS. System.out.println/print, strip class/main scaffolding, typed decls. */
function transpileJavaToJS(code: string): string {
  let js = code;

  js = js.replace(/\bimport\s+[^;]+;/g, '');
  js = js.replace(/\bpackage\s+[^;]+;/g, '');

  // System.out.printf("fmt", args)
  js = js.replace(/System\.out\.printf\("([^"]*)"(?:,\s*([^)]*))?\)/g, (match, fmtStr, argsStr) => {
    if (!argsStr) return `process_out("${fmtStr}")`;
    return `process_out(${formatStringToJS(fmtStr, argsStr)})`;
  });
  js = js.replace(/System\.out\.println\(([^;]*)\)/g, 'console.log($1)');
  js = js.replace(/System\.out\.print\(([^;]*)\)/g, 'console.log($1)');

  // String.format → template
  js = js.replace(/String\.format\("([^"]*)"(?:,\s*([^)]*))?\)/g, (match, fmtStr, argsStr) => formatStringToJS(fmtStr, argsStr));

  // public static void main(String[] args) {  →  function main() {
  js = js.replace(/(?:public\s+|private\s+|protected\s+)?static\s+void\s+main\s*\([^)]*\)\s*\{/g, 'function main() {');

  // typed method decls: <ret> name(<type> a, <type> b) {  →  function name(a, b) {
  js = js.replace(
    /(?:public\s+|private\s+|protected\s+|static\s+)+(?:int|long|double|float|boolean|char|String|void)\s+([a-zA-Z_]\w*)\s*\(([^)]*)\)\s*\{/g,
    (_m, name: string, params: string) => {
      const clean = params
        .split(',')
        .map((p) => p.trim().split(/\s+/).pop() || '')
        .filter(Boolean)
        .join(', ');
      return `function ${name}(${clean}) {`;
    }
  );

  // typed local var decls: int x = 5;  →  let x = 5;
  js = js.replace(/\b(?:int|long|double|float|boolean|char|String|var)\s+([a-zA-Z_]\w*)\s*=/g, 'let $1 =');
  // typed for-loop headers: for (int i = 0; ...)  →  for (let i = 0; ...)
  js = js.replace(/for\s*\(\s*(?:int|long|double|float)\s+/g, 'for (let ');

  // strip class header (keep its body)
  js = js.replace(/(?:public\s+|final\s+|abstract\s+)*class\s+[A-Za-z_]\w*(?:\s+extends\s+[\w.]+)?(?:\s+implements\s+[\w.,\s]+)?\s*\{/g, '');

  // brace balancer (drop trailing unmatched `}` left by the class strip)
  js = balanceBraces(js);

  // printf shim + entrypoint
  if (js.includes('process_out(')) {
    js = 'let __buf="";function process_out(s){__buf+=s;const parts=__buf.split("\\n");for(let i=0;i<parts.length-1;i++)console.log(parts[i]);__buf=parts[parts.length-1];}\n' + js;
  }
  if (js.includes('function main()')) js += '\nmain();';
  return js;
}

/** Zig → JS. std.debug.print("fmt {s}", .{args}) and basic control flow. */
function transpileZigToJS(code: string): string {
  let js = code;

  js = js.replace(/const\s+std\s*=\s*@import\("std"\);?/g, '');

  // std.debug.print("fmt", .{a, b})  /  std.debug.print("fmt", .{})
  js = js.replace(/std\.debug\.print\(\s*"([^"]*)"\s*,\s*\.\{([^}]*)\}\s*\)/g, (match, fmtStr: string, argsStr: string) => {
    // Zig uses {} / {s} / {d} placeholders, no trailing newline implied.
    const args = argsStr.trim() ? splitArgs(argsStr) : [];
    let i = 0;
    const tpl = fmtStr.replace(/\{[a-z]?\}/g, () => (i < args.length ? `\${${args[i++]}}` : '{}'));
    return 'process_out(`' + tpl + '`)';
  });

  // pub fn name(args) ret {  →  function name(args) {
  js = js.replace(/(?:pub\s+)?fn\s+([a-zA-Z_]\w*)\s*\(([^)]*)\)\s*(?:[!\w.\[\]*]+)?\s*\{/g, (_m, name: string, params: string) => {
    const clean = params
      .split(',')
      .map((p) => (p.split(':')[0] || '').trim())
      .filter(Boolean)
      .join(', ');
    return `function ${name}(${clean}) {`;
  });

  // const/var x: T = v  →  let x = v   ;   const/var x = v → let x = v
  js = js.replace(/\b(?:const|var)\s+([a-zA-Z_]\w*)\s*(?::[^=]+)?=/g, 'let $1 =');

  // while (cond) : (cont) {  →  while (cond) {   (drop the continue-expr)
  js = js.replace(/while\s*\(([^)]*)\)\s*:\s*\([^)]*\)\s*\{/g, 'while ($1) {');

  js = balanceBraces(js);
  if (js.includes('process_out(')) {
    js = 'let __buf="";function process_out(s){__buf+=s;const parts=__buf.split("\\n");for(let i=0;i<parts.length-1;i++)console.log(parts[i]);__buf=parts[parts.length-1];}\n' + js;
  }
  if (js.includes('function main()')) js += '\nmain();';
  return js;
}

/** Lua → JS. print(), `..` concat, local, for/while/if-then-end, functions. */
function transpileLuaToJS(code: string): string {
  let js = code;

  // print(...) is native-compatible; string concat .. → +
  js = js.replace(/\.\./g, '+');

  // local x = v  →  let x = v
  js = js.replace(/\blocal\s+/g, 'let ');

  // function name(args)  →  function name(args) {
  js = js.replace(/\bfunction\s+([a-zA-Z_][\w.]*)\s*\(([^)]*)\)/g, 'function $1($2) {');

  // for i = a, b do  →  for (let i = a; i <= b; i++) {
  js = js.replace(/\bfor\s+([a-zA-Z_]\w*)\s*=\s*([^,]+),\s*([^,\sdo]+)(?:,\s*([^\sdo]+))?\s+do/g, (_m, v, a, b, step) => {
    if (step) return `for (let ${v} = ${a}; ${v} <= ${b}; ${v} += ${step}) {`;
    return `for (let ${v} = ${a}; ${v} <= ${b}; ${v}++) {`;
  });

  // while cond do  →  while (cond) {   ;   if cond then → if (cond) {
  js = js.replace(/\bwhile\s+(.+?)\s+do\b/g, 'while ($1) {');
  js = js.replace(/\bif\s+(.+?)\s+then\b/g, 'if ($1) {');
  js = js.replace(/\belseif\s+(.+?)\s+then\b/g, '} else if ($1) {');
  js = js.replace(/\belse\b/g, '} else {');

  // ~= → !==
  js = js.replace(/~=/g, '!==');

  // end → }
  js = js.replace(/^\s*end\s*$/gm, '}');

  return js;
}

/** Common Lisp / Scheme (subset) → JS. (print x) (format t "~a~%" x) (+ a b) etc. */
function transpileLispToJS(code: string): string {
  // Very small s-expression evaluator producing console output for the
  // print-based exercises used in the curriculum. Supports: print, format
  // (t "~a"/"~d"/"~%"), +,-,*,/ , and literal atoms/strings.
  const lines: string[] = [];

  // (format t "...~a...~%" args)  →  console.log
  let src = code;
  src = src.replace(/\(format\s+t\s+"([^"]*)"\s*([^)]*)\)/g, (_m, fmt: string, argsStr: string) => {
    const args = argsStr.trim() ? splitArgs(argsStr.trim().replace(/\s+/g, ',')) : [];
    let i = 0;
    let out = fmt.replace(/~%/g, '\\n').replace(/~[ad]/gi, () => (i < args.length ? '${' + lispAtom(args[i++] ?? '') + '}' : ''));
    out = out.replace(/\\n$/, '');
    lines.push('console.log(`' + out + '`)');
    return '';
  });

  // (print expr) / (princ expr) / (write expr) — operate on the format-stripped
  // source; the return value is intentionally discarded (we only collect output).
  src.replace(/\((?:print|princ|write|write-line)\s+([^()]*(?:\([^()]*\)[^()]*)*)\)/g, (_m, expr: string) => {
    lines.push('console.log(' + lispExpr(expr.trim()) + ')');
    return '';
  });

  // Anything left that is a bare arithmetic form at top level we ignore;
  // the curriculum drives output exclusively through print/format.
  return lines.join('\n');
}

function lispAtom(tok: string): string {
  tok = tok.trim();
  if (/^["`]/.test(tok)) return JSON.stringify(tok.replace(/^"|"$/g, ''));
  return lispExpr(tok);
}

function lispExpr(expr: string): string {
  expr = expr.trim();
  if (/^"[^"]*"$/.test(expr)) return '`' + expr.slice(1, -1) + '`';
  if (/^-?\d+(\.\d+)?$/.test(expr)) return expr;
  // (op a b c) → (a op b op c)
  const m = expr.match(/^\(\s*([+\-*/])\s+([\s\S]*)\)$/);
  if (m) {
    const op = m[1];
    const parts = splitSexpr(m[2] ?? '').map(lispExpr);
    return '(' + parts.join(` ${op} `) + ')';
  }
  return expr;
}

function splitSexpr(s: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let cur = '';
  for (const ch of s) {
    if (ch === '(') { depth++; cur += ch; }
    else if (ch === ')') { depth--; cur += ch; }
    else if (/\s/.test(ch) && depth === 0) { if (cur.trim()) out.push(cur.trim()); cur = ''; }
    else cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

/** C → JS. printf, strip includes & types, int main(). */
function transpileCToJS(code: string): string {
  let js = code;

  js = js.replace(/#include\s*[<"][^>"]*[>"]/g, '');
  js = js.replace(/#define\s+([A-Za-z_]\w*)\s+(.+)$/gm, 'const $1 = $2;');

  // printf("fmt", args)  →  buffered process_out
  js = js.replace(/printf\(\s*"([^"]*)"(?:,\s*([^;]*))?\)/g, (match, fmtStr, argsStr) => {
    if (!argsStr) return `process_out("${fmtStr}")`;
    return `process_out(${formatStringToJS(fmtStr, argsStr)})`;
  });
  js = js.replace(/puts\(\s*"([^"]*)"\s*\)/g, 'console.log("$1")');

  // int main(void) / int main()  →  function main() {
  js = js.replace(/\bint\s+main\s*\([^)]*\)\s*\{/g, 'function main() {');

  // typed function decls: <type> name(<type> a, ...) {  →  function name(a, ...) {
  js = js.replace(
    /\b(?:int|long|double|float|char|void|unsigned|size_t)\s+\**([a-zA-Z_]\w*)\s*\(([^)]*)\)\s*\{/g,
    (_m, name: string, params: string) => {
      if (name === 'main') return `function main() {`;
      const clean = params
        .split(',')
        .map((p) => (p.trim().replace(/\*/g, '').split(/\s+/).pop() || ''))
        .filter((p) => p && p !== 'void')
        .join(', ');
      return `function ${name}(${clean}) {`;
    }
  );

  // typed local var decls
  js = js.replace(/\b(?:unsigned\s+)?(?:int|long|double|float|char|size_t)\s+\**([a-zA-Z_]\w*)\s*=/g, 'let $1 =');
  js = js.replace(/for\s*\(\s*(?:int|long|size_t|unsigned)\s+/g, 'for (let ');
  js = js.replace(/\breturn\s+0\s*;\s*\}\s*$/, 'return 0;\n}');

  js = balanceBraces(js);
  if (js.includes('process_out(')) {
    js = 'let __buf="";function process_out(s){__buf+=s;const parts=__buf.split("\\n");for(let i=0;i<parts.length-1;i++)console.log(parts[i]);__buf=parts[parts.length-1];}\n' + js;
  }
  if (js.includes('function main()')) js += '\nmain();';
  return js;
}

/** C++ → JS. std::cout << ... << std::endl;, printf, strip includes/using. */
function transpileCppToJS(code: string): string {
  let js = code;

  js = js.replace(/#include\s*[<"][^>"]*[>"]/g, '');
  js = js.replace(/using\s+namespace\s+std\s*;/g, '');

  // std::cout << a << " " << b << std::endl;  →  console.log(a, " ", b)
  js = js.replace(/(?:std::)?cout\s*((?:<<[^;]+)+);/g, (_m, chain: string) => {
    const parts = chain
      .split('<<')
      .map((s) => s.trim())
      .filter(Boolean)
      .filter((s) => !/^(std::)?endl$/.test(s))
      .map((s) => s.replace(/^std::/, ''));
    return `console.log(${parts.join(' + ')});`;
  });
  // a trailing std::endl-only line still needs a newline; console.log adds one.

  // printf fallback
  js = js.replace(/printf\(\s*"([^"]*)"(?:,\s*([^;]*))?\)/g, (match, fmtStr, argsStr) => {
    if (!argsStr) return `process_out("${fmtStr}")`;
    return `process_out(${formatStringToJS(fmtStr, argsStr)})`;
  });

  js = js.replace(/\bint\s+main\s*\([^)]*\)\s*\{/g, 'function main() {');
  js = js.replace(
    /\b(?:int|long|double|float|char|void|bool|auto|size_t|std::string|string)\s+\**([a-zA-Z_]\w*)\s*\(([^)]*)\)\s*\{/g,
    (_m, name: string, params: string) => {
      if (name === 'main') return `function main() {`;
      const clean = params
        .split(',')
        .map((p) => (p.trim().replace(/[*&]/g, '').split(/\s+/).pop() || ''))
        .filter((p) => p && p !== 'void')
        .join(', ');
      return `function ${name}(${clean}) {`;
    }
  );
  js = js.replace(/\b(?:int|long|double|float|char|bool|auto|size_t|std::string|string)\s+\**([a-zA-Z_]\w*)\s*=/g, 'let $1 =');
  js = js.replace(/for\s*\(\s*(?:int|long|size_t|auto)\s+/g, 'for (let ');

  js = balanceBraces(js);
  if (js.includes('process_out(')) {
    js = 'let __buf="";function process_out(s){__buf+=s;const parts=__buf.split("\\n");for(let i=0;i<parts.length-1;i++)console.log(parts[i]);__buf=parts[parts.length-1];}\n' + js;
  }
  if (js.includes('function main()')) js += '\nmain();';
  return js;
}

/** Haskell (subset) → JS. main = do { putStrLn ...; print ... }, let bindings. */
function transpileHaskellToJS(code: string): string {
  const out: string[] = [];
  const lines = code.split('\n');
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('--') || line.startsWith('module') || line.startsWith('import')) continue;
    if (/^main\s*(::|=)/.test(line)) {
      // main :: IO ()   or   main = do
      continue;
    }
    if (line === 'do') continue;

    // putStrLn "x"  /  putStr "x"  /  print expr
    let m = line.match(/^putStrLn\s+(.+)$/);
    if (m) { out.push('console.log(' + haskellExpr(m[1] ?? '') + ');'); continue; }
    m = line.match(/^putStr\s+(.+)$/);
    if (m) { out.push('console.log(' + haskellExpr(m[1] ?? '') + ');'); continue; }
    m = line.match(/^print\s+(.+)$/);
    if (m) { out.push('console.log(' + haskellExpr(m[1] ?? '') + ');'); continue; }

    // let x = expr  (inside do)
    m = line.match(/^let\s+([a-zA-Z_]\w*)\s*=\s*(.+)$/);
    if (m) { out.push(`let ${m[1] ?? ''} = ${haskellExpr(m[2] ?? '')};`); continue; }

    // top-level binding: name = expr
    m = line.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
    if (m) { out.push(`let ${m[1] ?? ''} = ${haskellExpr(m[2] ?? '')};`); continue; }
  }
  return out.join('\n');
}

function haskellExpr(expr: string): string {
  expr = expr.trim();
  // string literal
  if (/^"[^"]*"$/.test(expr)) return '`' + expr.slice(1, -1) + '`';
  // ++ string concat → +
  if (expr.includes('++')) {
    return expr.split('++').map((p) => haskellExpr(p)).join(' + ');
  }
  // show x → String(x)
  const sh = expr.match(/^show\s+(.+)$/);
  if (sh) return `String(${haskellExpr(sh[1] ?? '')})`;
  return expr;
}

/**
 * Assembly → JS. A tiny educational register-VM interpreter, embedded as a JS
 * program that parses the user's assembly source (a NASM-ish subset) and
 * simulates it. Supports: mov, add, sub, mul, inc, dec, cmp, jmp/je/jne/jg/jl
 * (label targets), push/pop, and a `print`/`out` pseudo-op that writes a
 * register or immediate to stdout. Registers: rax, rbx, rcx, rdx (+ eax aliases).
 */
function transpileAssemblyToJS(code: string): string {
  const program = JSON.stringify(code);
  return `
const __src = ${program};
(function runAsm(src){
  const regs = { rax:0, rbx:0, rcx:0, rdx:0, rsi:0, rdi:0 };
  const alias = { eax:'rax', ebx:'rbx', ecx:'rcx', edx:'rdx' };
  const norm = (r) => alias[r] || r;
  const stack = [];
  const lines = src.split('\\n')
    .map(l => l.replace(/;.*$/, '').trim())
    .filter(Boolean);
  // collect labels
  const labels = {};
  const insns = [];
  for (const l of lines) {
    const lm = l.match(/^([A-Za-z_.][\\w.]*):$/);
    if (lm) { labels[lm[1]] = insns.length; continue; }
    insns.push(l);
  }
  const val = (t) => {
    t = t.trim();
    if (t in regs) return regs[t];
    if (norm(t) in regs) return regs[norm(t)];
    return parseInt(t, t.startsWith('0x') ? 16 : 10) || 0;
  };
  let flags = { zero:false, sign:false };
  let ip = 0, steps = 0;
  while (ip < insns.length && steps++ < 100000) {
    const parts = insns[ip].split(/[\\s,]+/).filter(Boolean);
    const op = parts[0].toLowerCase();
    const a = parts[1], b = parts[2];
    const da = a ? norm(a) : null;
    switch (op) {
      case 'mov': regs[da] = val(b); break;
      case 'add': regs[da] += val(b); break;
      case 'sub': regs[da] -= val(b); break;
      case 'mul': case 'imul': regs[da] = (b!==undefined?val(da)*val(b):regs.rax*val(a)); if(b===undefined) regs.rax = regs[da]; break;
      case 'inc': regs[da]++; break;
      case 'dec': regs[da]--; break;
      case 'cmp': { const d = val(a) - val(b); flags.zero = d===0; flags.sign = d<0; break; }
      case 'jmp': ip = labels[a]; continue;
      case 'je': case 'jz': if (flags.zero) { ip = labels[a]; continue; } break;
      case 'jne': case 'jnz': if (!flags.zero) { ip = labels[a]; continue; } break;
      case 'jg': if (!flags.zero && !flags.sign) { ip = labels[a]; continue; } break;
      case 'jl': if (flags.sign) { ip = labels[a]; continue; } break;
      case 'jge': if (!flags.sign) { ip = labels[a]; continue; } break;
      case 'jle': if (flags.zero || flags.sign) { ip = labels[a]; continue; } break;
      case 'push': stack.push(val(a)); break;
      case 'pop': regs[da] = stack.pop() || 0; break;
      case 'print': case 'out': {
        if (a && a.startsWith('"')) console.log(insns[ip].slice(insns[ip].indexOf('"')+1, insns[ip].lastIndexOf('"')));
        else console.log(val(a));
        break;
      }
      case 'ret': case 'hlt': ip = insns.length; continue;
      default: break;
    }
    ip++;
  }
})(__src);
`;
}

/** Balance braces: drop trailing unmatched closing braces left by header strips. */
function balanceBraces(js: string): string {
  let open = 0;
  let out = '';
  for (const ch of js) {
    if (ch === '{') open++;
    if (ch === '}') {
      if (open > 0) { open--; out += ch; }
      else continue;
    } else {
      out += ch;
    }
  }
  return out;
}

export async function transpileCode(
  language: Language,
  code: string
): Promise<{ transpiledCode: string; error?: string }> {
  switch (language) {
    case 'python':
      return { transpiledCode: code };
    case 'javascript':
      return { transpiledCode: code };
    case 'typescript':
    case 'typescript-js':
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
    case 'ruby':
      return { transpiledCode: transpileRubyToJS(code) };
    case 'java':
      return { transpiledCode: transpileJavaToJS(code) };
    case 'zig':
      return { transpiledCode: transpileZigToJS(code) };
    case 'lua':
      return { transpiledCode: transpileLuaToJS(code) };
    case 'lisp':
      return { transpiledCode: transpileLispToJS(code) };
    case 'c':
      return { transpiledCode: transpileCToJS(code) };
    case 'cpp':
      return { transpiledCode: transpileCppToJS(code) };
    case 'haskell':
      return { transpiledCode: transpileHaskellToJS(code) };
    case 'assembly':
      return { transpiledCode: transpileAssemblyToJS(code) };
    case 'tsql':
    case 'postgresql':
      // Executed directly by sql.js in the sandbox; pass through unchanged.
      return { transpiledCode: code };
    default:
      return { transpiledCode: '', error: `Unsupported language: ${language}` };
  }
}
