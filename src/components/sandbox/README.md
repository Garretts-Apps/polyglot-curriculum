# Sandbox Components

Per-language interactive code sandboxes for the Polyglot Curriculum.

## Architecture

Each language has a dedicated sandbox component. All sandboxes share:
- `SandboxShell` — outer UI wrapper (editor + run button + result panel)
- `CodeEditor` — CodeMirror 6 editor with per-language syntax highlighting

## Language Implementation Summary

| Language   | Strategy              | Notes |
|------------|-----------------------|-------|
| Python     | Pyodide (CDN, lazy)   | ~8 MB first load; stdout captured via `setStdout` |
| TypeScript | esbuild-wasm (CDN)    | Transpile TS→JS, execute via `Function()` |
| Rust       | Server proxy          | POST `/api/sandbox/rust` → `play.rust-lang.org` |
| Go         | Server proxy          | POST `/api/sandbox/go` → `go.dev/_/compile` |
| F#         | iframe (fable.io/repl)| **Compromise — see below** |
| C#         | iframe (dotnetfiddle) | **Compromise — see below** |

## F# and C# — Known Compromise

F# and C# cannot be executed inline in the browser without a large custom
toolchain (e.g., running the full .NET runtime via Blazor WebAssembly, which
is hundreds of MB).

**Current approach:** Embed the external REPL in an iframe and ask the user
to manually verify output and click "Mark as Reviewed". The starter code is
displayed read-only so the user can copy it into the embedded editor.

**Limitations:**
- Cross-origin restrictions prevent programmatic result reading
- The "pass" state is user-confirmed, not verified
- External sites may change their embed policies

**Future upgrade path:**
- Use Blazor WASM for true in-browser C# execution
- Use a self-hosted F# compiler endpoint
- Use dotnet-wasm / Pyodide-style CDN loading when available

## API Routes

- `POST /api/sandbox/rust` — proxies to `play.rust-lang.org/execute`
- `POST /api/sandbox/go` — proxies to `go.dev/_/compile`

Both routes run on the Edge runtime and enforce a 5000-character code limit.
