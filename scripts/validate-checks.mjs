#!/usr/bin/env node
/**
 * Curriculum validation harness.
 *
 * For every Phase in the requested language(s) this script checks:
 *   - structural integrity (unique ids, >=3 checks, >=1 code check, MCQ shape,
 *     correctIndex in range, topics have https urls, required fields present);
 *   - that every code check's boilerplate, run through the SAME transpiler the
 *     app uses (src/lib/runner.ts), actually executes and prints its
 *     expectedOutput (and each testCase's expectedOutput).
 *
 * Languages whose runtime cannot execute in plain Node (python → Pyodide,
 * sql → sql.js, typescript/-js → in-browser tsc) are structurally validated
 * but their code execution is reported as SKIPPED rather than failed.
 *
 * Usage:  node scripts/validate-checks.mjs [lang ...]
 *         (no args → validates every NEW language course)
 */
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import vm from 'node:vm';
import ts from 'typescript';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const tmp = mkdtempSync(join(tmpdir(), 'curric-'));

const NEW_LANGS = {
  ruby: 'rubyPhases',
  javascript: 'javascriptPhases',
  'typescript-js': 'typescriptJsPhases',
  java: 'javaPhases',
  zig: 'zigPhases',
  lisp: 'lispPhases',
  lua: 'luaPhases',
  c: 'cPhases',
  cpp: 'cppPhases',
  tsql: 'tsqlPhases',
  postgresql: 'postgresqlPhases',
  haskell: 'haskellPhases',
  assembly: 'assemblyPhases',
};

// Runtimes we can actually execute inside this Node harness.
const RUNTIME = {
  ruby: 'js', javascript: 'js', java: 'js', zig: 'js', lua: 'js',
  lisp: 'js', c: 'js', cpp: 'js', haskell: 'js', assembly: 'js',
  'typescript-js': 'skip', typescript: 'skip', python: 'skip',
  tsql: 'skip', postgresql: 'skip',
};

function compileToMjs(srcPath, outName) {
  const source = readFileSync(srcPath, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext },
    fileName: srcPath,
  });
  const outPath = join(tmp, outName);
  writeFileSync(outPath, outputText);
  return pathToFileURL(outPath).href;
}

async function loadRunner() {
  // runner.ts has only type imports → self-contained once transpiled.
  const url = compileToMjs(join(ROOT, 'src/lib/runner.ts'), 'runner.mjs');
  return import(url);
}

async function loadPhases(lang) {
  const url = compileToMjs(join(ROOT, `src/curriculum/${lang}.ts`), `${lang.replace(/[^a-z]/g, '_')}.mjs`);
  const mod = await import(url);
  return mod[NEW_LANGS[lang]];
}

function runJs(code) {
  const logs = [];
  const sandbox = {
    console: {
      log: (...a) => logs.push(a.map((x) => (typeof x === 'object' ? JSON.stringify(x) : String(x))).join(' ')),
      error: (...a) => logs.push(a.map(String).join(' ')),
      warn: (...a) => logs.push(a.map(String).join(' ')),
    },
    process: { stdout: { write: (s) => logs.push(String(s)) } },
  };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { timeout: 5000 });
  return logs.join('\n');
}

let totalChecks = 0, totalCode = 0, ran = 0, skipped = 0;
const failures = [];

function fail(loc, msg) {
  failures.push(`  ✗ ${loc}: ${msg}`);
}

async function validateLang(lang, runner) {
  const phases = await loadPhases(lang);
  if (!Array.isArray(phases)) { fail(lang, 'phases export is not an array'); return; }
  if (phases.length === 0) { console.log(`  · ${lang}: (empty — not yet authored)`); return; }

  const seenPhaseIds = new Set();
  const runtime = RUNTIME[lang];

  for (const p of phases) {
    const ploc = `${lang} ${p.id}`;
    if (seenPhaseIds.has(p.id)) fail(ploc, 'duplicate phase id');
    seenPhaseIds.add(p.id);
    if (p.language !== lang) fail(ploc, `phase.language="${p.language}" != "${lang}"`);
    if (typeof p.level !== 'number') fail(ploc, 'missing level');
    for (const f of ['title', 'timeEstimate', 'intro', 'deliverable']) {
      if (!p[f] || typeof p[f] !== 'string') fail(ploc, `missing/empty ${f}`);
    }
    if (!Array.isArray(p.topics) || p.topics.length < 3) fail(ploc, 'needs >=3 topics');
    for (const t of p.topics || []) {
      if (!t.url || !/^https:\/\//.test(t.url)) fail(ploc, `topic url not https: ${t.label}`);
    }
    if (!Array.isArray(p.checks) || p.checks.length < 3) fail(ploc, 'needs >=3 checks');
    const codeChecks = (p.checks || []).filter((c) => c.kind === 'code');
    if (codeChecks.length < 1) fail(ploc, 'needs >=1 code check');

    const seenCheckIds = new Set();
    for (const c of p.checks || []) {
      totalChecks++;
      if (seenCheckIds.has(c.id)) fail(ploc, `duplicate check id ${c.id}`);
      seenCheckIds.add(c.id);
      if (!c.prompt) fail(ploc, `check ${c.id} missing prompt`);
      if (!c.explanation) fail(ploc, `check ${c.id} missing explanation`);

      if (c.kind === 'mcq') {
        if (!Array.isArray(c.options) || c.options.length < 3 || c.options.length > 4)
          fail(ploc, `mcq ${c.id} needs 3-4 options`);
        if (typeof c.correctIndex !== 'number' || c.correctIndex < 0 || c.correctIndex >= (c.options || []).length)
          fail(ploc, `mcq ${c.id} correctIndex out of range`);
      } else if (c.kind === 'code') {
        totalCode++;
        if (!c.boilerplate) { fail(ploc, `code ${c.id} missing boilerplate`); continue; }
        if (c.expectedOutput === undefined) fail(ploc, `code ${c.id} missing expectedOutput`);

        if (runtime === 'skip') { skipped++; continue; }

        // Execute boilerplate (and each test case) like the app does.
        const cases = (c.testCases && c.testCases.length)
          ? c.testCases
          : [{ expectedOutput: c.expectedOutput, description: 'default' }];
        for (const tc of cases) {
          const combined = tc.input ? `${c.boilerplate}\n${tc.input}` : c.boilerplate;
          let out, err;
          try {
            const { transpiledCode, error } = await runner.transpileCode(lang, combined);
            if (error) { err = error; }
            else { out = runJs(transpiledCode); ran++; }
          } catch (e) { err = e.message || String(e); }
          if (err) { fail(ploc, `code ${c.id} [${tc.description || ''}] threw: ${err}`); continue; }
          const expected = String(tc.expectedOutput).trim().toLowerCase();
          const actual = String(out).trim().toLowerCase();
          if (!actual.includes(expected)) {
            fail(ploc, `code ${c.id} [${tc.description || ''}] expected substring ${JSON.stringify(tc.expectedOutput)} but got ${JSON.stringify(out)}`);
          }
        }
      }
    }
  }
  const note = runtime === 'skip' ? ' (code exec skipped — non-Node runtime)' : '';
  console.log(`  ✓ ${lang}: ${phases.length} phases validated${note}`);
}

const args = process.argv.slice(2);
const langs = args.length ? args : Object.keys(NEW_LANGS);
const runner = await loadRunner();

console.log(`Validating: ${langs.join(', ')}\n`);
for (const lang of langs) {
  if (!NEW_LANGS[lang]) { console.log(`  ? unknown language ${lang}`); continue; }
  try { await validateLang(lang, runner); }
  catch (e) { fail(lang, `load error: ${e.message || e}`); }
}

console.log(`\nchecks: ${totalChecks} | code checks: ${totalCode} | executed: ${ran} | skipped: ${skipped}`);
if (failures.length) {
  console.log(`\n${failures.length} FAILURE(S):`);
  console.log(failures.join('\n'));
  process.exit(1);
} else {
  console.log('\nAll validations passed. ✓');
}
