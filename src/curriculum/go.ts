import type { Phase } from './types';

export const goPhases: Phase[] = [
  // ─── Level 0 ─────────────────────────────────────────────────────────────
  {
    id: 'go-0',
    language: 'go',
    level: 0,
    title: 'Setup & Hello World',
    timeEstimate: '0.5-1 hours',
    intro: "Welcome to Go! In this level, you'll verify your local Go environment and run your first Go script. Absolute beginners start here.",
    topics: [
      {
        label: 'Installing Go',
        url: 'https://go.dev/doc/install',
        note: 'Official installation guide for Windows, macOS, and Linux.'
      },
      {
        label: 'Go Playground',
        url: 'https://go.dev/play/',
        note: 'Compile and run Go code online in your browser.'
      }
    ],
    deliverable: 'Verify go version in your command line and run a print statement in the browser console.',
    checks: [
      {
        kind: 'code',
        id: 'go-0-code-1',
        prompt: 'Verify the starter code: run this program to print `Hello, World!` to standard output.',
        boilerplate: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, World!")\n}\n',
        expectedOutput: 'Hello, World!',
        explanation: 'Every runnable Go program must start with `package main` and have a `main()` function. We use `fmt.Println` to output text to standard output.'
      },
      {
        kind: 'mcq',
        id: 'go-0-mcq-1',
        prompt: 'Which standard library package is imported to format text and print to standard output?',
        options: ['`fmt`', '`print`', '`std`', '`os`'],
        correctIndex: 0,
        explanation: 'The `fmt` package implements formatted I/O, including printing functions like `Printf` and `Println`.'
      },
      {
        kind: 'mcq',
        id: 'go-0-mcq-2',
        prompt: 'What is the standard file extension used for Go source code files?',
        options: ['.go', '.got', '.g', '.txt'],
        correctIndex: 0,
        explanation: 'Go files use the `.go` extension. You run them with the terminal command `go run filename.go`.'
      }
    ]
  },
  {
    id: 'go-1',
    language: 'go',
    level: 1,
    title: 'Go Basics — Packages, Zero Values, and Error Returns',
    timeEstimate: '4-6 hours',
    intro: `By the end of this phase, you'll read short Go programs and predict their runtime output — focusing on the things that bite newcomers: unused imports/variables as hard compile errors, zero values, and the \`if err != nil\` return pattern that pervades every API. You'll learn the package system, the basic types, and how \`go run\`/\`go build\`/\`go fmt\`/\`go vet\` fit together.

To build the muscle, you'll write locally: a \`greet\` CLI that parses a \`-name\` flag with \`flag.String\` and prints a greeting alongside \`time.Now()\`. Bootstrap with \`go mod init example.com/greet\`, then \`go run main.go -name=Ada\`. Use \`fmt.Printf("%T\\n", x)\` whenever you want to confirm a value's type — no IDE required.`,
    video: {
      title: 'Go Programming Language Tutorial',
      youtubeId: 'YS4e4q9oBaU',
      channelName: 'freeCodeCamp.org',
      duration: '7 hours',
    },
    topics: [
      { label: 'Installing Go', url: 'https://go.dev/doc/install', note: 'Official install guide for all platforms' },
      { label: 'A Tour of Go — Basics', url: 'https://go.dev/tour/basics/1', note: 'Interactive tour of packages, variables, functions' },
      { label: 'Go Specification — Types', url: 'https://go.dev/ref/spec#Types', note: 'Full type system specification' },
      { label: 'Effective Go', url: 'https://go.dev/doc/effective_go', note: 'Canonical style and idiom guide' },
      { label: 'Error handling and Go', url: 'https://go.dev/blog/error-handling-and-go', note: 'Official blog post on if err != nil pattern' },
      { label: 'pkg fmt', url: 'https://pkg.go.dev/fmt', note: 'Standard formatting and printing package' },
      { label: 'pkg flag', url: 'https://pkg.go.dev/flag', note: 'Command-line flag parsing standard library' },
    ],
    deliverable: 'Build locally: a `greet` CLI parsing flag.String for name, prints greeting + time.Now().',
    checks: [
      {
        kind: 'mcq',
        id: 'go-1-mcq-1',
        prompt: 'Which statement is true about unused imports in Go?',
        options: [
          'They produce a warning but the program still compiles.',
          'They are silently ignored by the compiler.',
          'They cause a compile-time error.',
          'They are allowed only in test files.',
        ],
        correctIndex: 2,
        explanation: 'The Go compiler treats an unused import as a hard error. This keeps code clean and forces you to remove dead imports immediately. The same rule applies to unused local variables. See [Effective Go — Names](https://go.dev/doc/effective_go#names) for the rationale.',
      },
      {
        kind: 'mcq',
        id: 'go-1-mcq-2',
        prompt: 'What does the `:=` operator do in Go?',
        options: [
          'Assigns a value to an already-declared variable.',
          'Declares and initialises a new variable, inferring its type.',
          'Compares two values for equality.',
          'Creates a pointer to a variable.',
        ],
        correctIndex: 1,
        explanation: '`:=` is the short variable declaration operator. It both declares a new variable and assigns its initial value, with the type inferred from the right-hand side. Watch for the gotcha: if at least one name on the left is new, `:=` is allowed; if all are existing, you must use `=`. See [Tour of Go — Short variable declarations](https://go.dev/tour/basics/10).',
      },
      {
        kind: 'mcq',
        id: 'go-1-mcq-3',
        prompt: `What does this program print?

\`\`\`go
package main

import (
\t"errors"
\t"fmt"
)

func divide(a, b float64) (float64, error) {
\tif b == 0 {
\t\treturn 0, errors.New("division by zero")
\t}
\treturn a / b, nil
}

func main() {
\tr, err := divide(10, 2)
\tif err != nil {
\t\tfmt.Println(err)
\t} else {
\t\tfmt.Println(r)
\t}
\t_, err = divide(10, 0)
\tif err != nil {
\t\tfmt.Println(err)
\t}
}
\`\`\``,
        options: [
          '5\\ndivision by zero',
          '5.0\\ndivision by zero',
          'panic: division by zero',
          '5\\n<nil>',
        ],
        correctIndex: 0,
        explanation: '`fmt.Println` formats `float64(5)` as `5` (no trailing `.0` unless needed for precision). The second call returns an error, printed via its `Error()` method. This is the canonical Go error pattern documented in [Error handling and Go](https://go.dev/blog/error-handling-and-go). Returning `(value, error)` and checking `err != nil` is the spine of every Go API.',
      },
      {
        kind: 'mcq',
        id: 'go-1-mcq-4',
        prompt: `What does this program print?

\`\`\`go
package main

import "fmt"

func mustReadConfig() (string, error) {
\treturn "", nil
}

func main() {
\tcfg, err := mustReadConfig()
\tif err = nil; err != nil {
\t\tfmt.Println("error")
\t\treturn
\t}
\tfmt.Printf("[%s]\\n", cfg)
}
\`\`\``,
        options: [
          '[]',
          'error',
          'Compile error: cannot assign in condition.',
          'panic: nil dereference',
        ],
        correctIndex: 0,
        explanation: '`if err = nil; err != nil` is a valid `if` with an init statement — it assigns `nil` to `err`, then checks `err != nil`, which is false. So the error branch is skipped and the empty string is printed inside brackets. Mistyping `=` for `:=` in `if` init clauses is a real production bug; `go vet` and `staticcheck` will flag it. See [Effective Go — if](https://go.dev/doc/effective_go#if).',
      },
      {
        kind: 'mcq',
        id: 'go-1-mcq-5',
        prompt: `Why does this program fail to compile?

\`\`\`go
package main

import "fmt"

func main() {
\tx := 10
\tfmt.Println("hello")
}
\`\`\``,
        options: [
          'Missing return statement in main.',
          '`x` is declared but never used — Go treats this as a hard compile error.',
          '`fmt.Println` requires at least two arguments.',
          'Short variable declarations are not allowed in main.',
        ],
        correctIndex: 1,
        explanation: 'Go enforces that every declared local variable be used. This catches typos and dead code early. The fix is to remove `x` or actually reference it (e.g., `_ = x` to deliberately discard). Constants, globals, and blank-identifier (`_`) bindings are exempt. See [Effective Go — Declarations and Initializations](https://go.dev/doc/effective_go).',
      },
      {
        kind: 'mcq',
        id: 'go-1-mcq-6',
        prompt: `What does this program print?

\`\`\`go
package main

import "fmt"

type Server struct {
\tHost string
\tPort int
\tTLS  bool
}

func main() {
\tvar s Server
\tfmt.Printf("%q %d %t\\n", s.Host, s.Port, s.TLS)
}
\`\`\``,
        options: [
          '"nil" 0 false',
          '"" 0 false',
          '"undefined" -1 false',
          'panic: nil pointer dereference',
        ],
        correctIndex: 1,
        explanation: 'Go zero-initialises every field. The zero value for `string` is `""`, for `int` it is `0`, and for `bool` it is `false`. `%q` prints the string quoted, so you see `""`. This is why Go APIs routinely return a zero-valued struct on errors — there is no risk of "uninitialised memory" bugs. See [Tour of Go — Zero values](https://go.dev/tour/basics/12).',
      },
      {
        kind: 'mcq',
        id: 'go-1-mcq-debug-1',
        prompt: `**Production incident:** The order-processing service crashed 30 seconds after deploy on 2024-03-12 at 09:17 UTC. On-call received a PagerDuty alert. The crash reproduces locally when \`APP_ENV\` is unset. Here is the full panic and the relevant source:

\`\`\`
goroutine 1 [running]:
cmd/server/main.go:67 +0x1a4
panic: runtime error: invalid memory address or nil pointer dereference
[signal SIGSEGV: segmentation violation code=0x1 addr=0x28 pc=0x6f3c82]

goroutine 1 [running]:
runtime/panic.go:914 +0x21c
app/internal/config.loadConfig(...)
        /app/internal/config/loader.go:42 +0x68
main.main()
        /app/cmd/server/main.go:67 +0x1a4
exit status 2
\`\`\`

\`\`\`go
// /app/internal/config/loader.go

package config

import (
\t"fmt"
\t"os"
)

type Config struct {
\tDSN      string
\tPort     int
\tAppEnv   string
}

// loadConfig reads environment variables and returns a populated Config.
// Called once at startup from cmd/server/main.go:67.
func loadConfig() *Config {
\tenv := os.Getenv("APP_ENV")
\tif env == "production" {
\t\treturn &Config{
\t\t\tDSN:    os.Getenv("DATABASE_URL"),
\t\t\tPort:   8080,
\t\t\tAppEnv: env,
\t\t}
\t}
\t// staging / local path: falls off here, returns nil implicitly
}

// /app/cmd/server/main.go (excerpt)

func main() {
\tcfg := config.loadConfig()
\tfmt.Printf("connecting to DSN=%s port=%d\\n", cfg.DSN, cfg.Port) // line 67
}
\`\`\``,
        options: [
          '`os.Getenv("DATABASE_URL")` returns an empty string and that causes the panic.',
          '`loadConfig` returns `nil` when `APP_ENV` is not `"production"`, and dereferencing a nil `*Config` panics.',
          'The `Config` struct is missing a `json` tag, causing the pointer to be nil.',
          '`fmt.Println` cannot accept a struct field — use `fmt.Printf` instead.',
        ],
        correctIndex: 1,
        explanation: 'When `APP_ENV` is not `"production"`, `loadConfig` falls off the end and implicitly returns the zero value for `*Config`, which is `nil`. Dereferencing `cfg.DSN` on line 15 panics. Fix: add a default return path (`return &Config{Port: 8080}` or `return nil, errors.New("...")`). `go vet` will flag a missing return in a non-void function. See [Effective Go — Control structures](https://go.dev/doc/effective_go#control-structures).',
      },
      {
        kind: 'mcq',
        id: 'go-1-mcq-debug-2',
        prompt: `**Production incident:** Nightly reconciliation job on 2024-04-02 processed 9,999 of 10,000 order IDs. Accounting flagged a missing settlement for order #10000. The discrepancy reproduces 100% of the time. Relevant source:

\`\`\`
$ go run /app/cmd/reconcile/main.go --date=2024-04-02
processed 9999 records
missing: [order-10000]
expected: 10000
\`\`\`

\`\`\`go
// /app/cmd/reconcile/main.go

package main

import (
\t"database/sql"
\t"fmt"
\t"log"

\t_ "github.com/jackc/pgx/v5/stdlib"
)

func fetchOrderIDs(db *sql.DB, date string) ([]int, error) {
\trows, err := db.Query(
\t\t\`SELECT id FROM orders WHERE settled_date = $1 ORDER BY id\`,
\t\tdate,
\t)
\tif err != nil {
\t\treturn nil, fmt.Errorf("fetchOrderIDs: %w", err)
\t}
\tdefer rows.Close()
\tvar ids []int
\tfor rows.Next() {
\t\tvar id int
\t\tif err := rows.Scan(&id); err != nil {
\t\t\treturn nil, err
\t\t}
\t\tids = append(ids, id)
\t}
\treturn ids, rows.Err()
}

// processIDs reconciles a batch of order IDs fetched from the DB.
func processIDs(ids []int) {
\tfor i := 0; i < len(ids)-1; i++ { // off-by-one: last element never processed
\t\tfmt.Printf("processed order id=%d\\n", ids[i])
\t}
}

func main() {
\tdb, err := sql.Open("pgx", "postgres://app:secret@db:5432/orders")
\tif err != nil {
\t\tlog.Fatal(err)
\t}
\tdefer db.Close()
\tids, err := fetchOrderIDs(db, "2024-04-02")
\tif err != nil {
\t\tlog.Fatal(err)
\t}
\tfmt.Printf("processed %d records\\n", len(ids)-1) // also wrong
\tprocessIDs(ids)
}
\`\`\``,
        options: [
          'The slice is passed by value so the last element is lost during the copy.',
          'The loop condition `i < len(ids)-1` stops one iteration early, skipping `ids[4]` (value 50).',
          'Integer subtraction on `len(ids)` underflows to a negative number and the loop never runs.',
          '`fmt.Printf` buffers output so the last line is never flushed.',
        ],
        correctIndex: 1,
        explanation: '`len(ids)-1` evaluates to 4, so the loop runs for `i` in `[0,1,2,3]` — the element at index 4 (value 50) is never processed. The fix is `i < len(ids)` (or `i <= len(ids)-1`). Be careful: if `ids` is empty, `len(ids)-1` with unsigned arithmetic would wrap around — but in Go `len` returns a signed `int`, so an empty slice gives `0-1 = -1` and the loop simply never executes, which is actually correct here but masks the intent. Prefer `for i, id := range ids`. See [Tour of Go — For](https://go.dev/tour/flowcontrol/1).',
      },
      {
        kind: 'mcq',
        id: 'go-1-mcq-debug-3',
        prompt: `**Production incident:** The nightly log-ingestion job at \`/app/cmd/ingest/main.go\` has reported "total: 0 lines ingested" every night for a week. Each chunk file on disk contains roughly 200 lines. Ops confirmed the files exist and are non-empty.

\`\`\`
$ ls -lh /data/chunks/
-rw-r--r-- 1 app app 14K chunk_0.txt
-rw-r--r-- 1 app app 13K chunk_1.txt
-rw-r--r-- 1 app app 15K chunk_2.txt
-rw-r--r-- 1 app app 12K chunk_3.txt
-rw-r--r-- 1 app app 14K chunk_4.txt

$ go run /app/cmd/ingest/main.go
total: 0 lines ingested
\`\`\`

\`\`\`go
// /app/cmd/ingest/main.go

package main

import (
\t"bufio"
\t"fmt"
\t"log"
\t"os"

\t"go.opentelemetry.io/otel"
\t"go.opentelemetry.io/otel/attribute"
)

var tracer = otel.Tracer("ingest")

// countLines opens a file and returns the number of newline-delimited records.
func countLines(path string) int {
\tf, err := os.Open(path)
\tif err != nil {
\t\tlog.Printf("countLines: open %s: %v", path, err)
\t\treturn 0
\t}
\tdefer f.Close()

\tcount := 0
\tscanner := bufio.NewScanner(f)
\tfor scanner.Scan() {
\t\tcount++
\t}
\tif err := scanner.Err(); err != nil {
\t\tlog.Printf("countLines: scan %s: %v", path, err)
\t}
\treturn count
}

func main() {
\tctx := context.Background()
\t_, span := tracer.Start(ctx, "ingest-chunks")
\tdefer span.End()

\ttotal := 0
\tfor i := 0; i < 5; i++ {
\t\tpath := fmt.Sprintf("/data/chunks/chunk_%d.txt", i)
\t\ttotal = countLines(path) // BUG: assigns instead of accumulates
\t}

\tspan.SetAttributes(attribute.Int("lines.total", total))
\tfmt.Printf("total: %d lines ingested\\n", total)
}
\`\`\``,
        options: [
          '`bufio.Scanner` has a 64 KB line limit and panics on longer lines.',
          '`total = countLines(...)` replaces the running total on each iteration instead of accumulating it; the final value is only the count from the last file.',
          '`defer f.Close()` closes the file before the scanner finishes reading.',
          '`os.Open` opens files in write-only mode and the scanner reads zero bytes.',
        ],
        correctIndex: 1,
        explanation: '`total = countLines(...)` assigns (replaces) rather than accumulates. If the last chunk file is empty or missing, `total` ends up as 0. The fix is `total += countLines(...)`. This is a classic loop-accumulator bug where `=` and `+=` are confused. `go vet` cannot catch this; a code review or unit test that checks the sum across multiple chunks would. See [Tour of Go — For](https://go.dev/tour/flowcontrol/1).',
      },
      {
        kind: 'code',
        id: 'go-1-code-1',
        prompt: 'Implement a function `Divide` that returns the result of dividing two floats, or an error if the divisor is zero.',
        boilerplate: `package main\n\nimport (\n\t"errors"\n\t"fmt"\n)\n\n// TODO: Implement the Divide function\nfunc Divide(a, b float64) (float64, error) {\n\tif b == 0 {\n\t\t// TODO: return 0 and a division by zero error\n\t}\n\treturn a / b, nil\n}\n\nfunc main() {\n\tval, err := Divide(10, 0)\n\tif err != nil {\n\t\tfmt.Println("Error:", err)\n\t} else {\n\t\tfmt.Println("Result:", val)\n\t}\n}\n`,
        expectedOutput: 'Error: division by zero',
        explanation: 'Go does not use exceptions for control flow. Instead, functions that can fail return an error as their last return value. The caller must explicitly check `if err != nil`.'
      },
    ],
  },

  {
    id: 'go-2',
    language: 'go',
    level: 2,
    title: 'Structs, Methods, Interfaces, Slices, and Maps',
    timeEstimate: '5-7 hours',
    intro: `By the end of this phase, you'll read code that mixes structs, methods, interfaces, slices, and maps — and predict whether a method mutates the receiver, whether an interface assignment compiles, and what \`map\` access returns for a missing key. Topics in depth: value vs pointer receivers, structural (implicit) interface satisfaction, slice header semantics (length vs capacity, sharing backing arrays), and map ordering guarantees (there are none).

To build the muscle, you'll write locally: a \`wordcount\` CLI using \`bufio.Scanner\` over stdin and a \`map[string]int\` for counts, with output sorted by count then by word. Use \`var _ io.Reader = (*os.File)(nil)\` style assertions to confirm at compile time that a type satisfies an interface.`,
    topics: [
      { label: 'A Tour of Go — Structs and Methods', url: 'https://go.dev/tour/moretypes/1', note: 'Pointers, structs, arrays, slices, maps, closures' },
      { label: 'A Tour of Go — Interfaces', url: 'https://go.dev/tour/methods/1', note: 'Interface satisfaction, type assertions, Stringer' },
      { label: 'Go Specification — Struct Types', url: 'https://go.dev/ref/spec#Struct_types', note: 'Embedding and field promotion rules' },
      { label: 'Go Slices: usage and internals', url: 'https://go.dev/blog/slices-intro', note: 'How slices work under the hood' },
      { label: 'Go Maps in action', url: 'https://go.dev/blog/maps', note: 'Idiomatic map usage patterns' },
      { label: 'pkg sort', url: 'https://pkg.go.dev/sort', note: 'Sorting slices with sort.Slice and sort.SliceStable' },
      { label: 'pkg bufio', url: 'https://pkg.go.dev/bufio', note: 'Buffered I/O including Scanner for line-by-line reading' },
    ],
    deliverable: 'Build locally: a `wordcount` CLI using bufio.Scanner over stdin and a map[string]int, sorted output.',
    checks: [
      {
        kind: 'mcq',
        id: 'go-2-mcq-1',
        prompt: `What happens when this program runs?

\`\`\`go
package main

func main() {
\tvar counts map[string]int
\tcounts["apple"] = 1
}
\`\`\``,
        options: [
          'It prints nothing and exits cleanly; the map is auto-initialised.',
          'It panics with "assignment to entry in nil map".',
          'It silently discards the write because counts is nil.',
          'It is a compile error: maps must be initialised before use.',
        ],
        correctIndex: 1,
        explanation: 'The zero value of a map is `nil`. Reads from a nil map return the zero value safely, but **writes panic** with `assignment to entry in nil map`. Always initialise with `make(map[string]int)` or a map literal `{}` before writing. This bug typically appears when a struct field of map type is never initialised. See [Go Maps in action](https://go.dev/blog/maps).',
      },
      {
        kind: 'mcq',
        id: 'go-2-mcq-2',
        prompt: `What does this loop print across multiple runs of the program?

\`\`\`go
package main

import "fmt"

func main() {
\tm := map[string]int{"a": 1, "b": 2, "c": 3}
\tfor k, v := range m {
\t\tfmt.Println(k, v)
\t}
}
\`\`\``,
        options: [
          'Always `a 1`, `b 2`, `c 3` (insertion order).',
          'Always alphabetical by key.',
          'The order is unspecified and intentionally randomised across iterations.',
          'A panic — you cannot range over a map without sort.Slice.',
        ],
        correctIndex: 2,
        explanation: 'Go deliberately randomises map iteration order so programs do not accidentally depend on it. For deterministic output, collect keys into a slice and `sort.Strings`. The randomisation is enforced by the runtime — relying on order is a portability and reproducibility bug. See [Go spec — For statements with range clause](https://go.dev/ref/spec#For_range).',
      },
      {
        kind: 'mcq',
        id: 'go-2-mcq-3',
        prompt: `Which line has a subtle bug?

\`\`\`go
package main

import "fmt"

type Counter struct {
\tn int
}

func (c Counter) Inc() {  // line A
\tc.n++                   // line B
}

func main() {
\tc := Counter{}
\tc.Inc()                 // line C
\tfmt.Println(c.n)        // line D — prints what?
}
\`\`\``,
        options: [
          'Line A — the receiver should be named differently.',
          'Line A — `Inc` uses a value receiver, so `c.n++` mutates a copy and `main` still prints 0.',
          'Line C — methods cannot be called on struct values.',
          'Line D — `c.n` is unexported and cannot be accessed from main.',
        ],
        correctIndex: 1,
        explanation: 'Value receivers operate on a copy. To mutate the original, declare `func (c *Counter) Inc()` with a pointer receiver. `c.n` is accessible from `main` because `Counter` and `main` are in the same package — capitalisation gates *cross-package* visibility only. The compiler will not warn you here — silent no-op mutations are a real production bug. See [Effective Go — Pointers vs. Values](https://go.dev/doc/effective_go#pointers_vs_values).',
      },
      {
        kind: 'mcq',
        id: 'go-2-mcq-4',
        prompt: `What does \`len(s)\` and \`cap(s)\` print after this program runs?

\`\`\`go
package main

import "fmt"

func main() {
\ts := make([]int, 3, 10)
\ts = append(s, 1, 2, 3)
\tfmt.Println(len(s), cap(s))
}
\`\`\``,
        options: [
          '3 10',
          '6 10',
          '6 13',
          '3 3',
        ],
        correctIndex: 1,
        explanation: '`make([]int, 3, 10)` creates a slice with length 3 (three zero ints) and capacity 10. Appending three more elements grows the length to 6 but stays inside the existing backing array, so capacity remains 10. If `append` ever exceeds capacity, Go allocates a new larger backing array — and any other slices that aliased the old one no longer see your writes. See [Go Slices: usage and internals](https://go.dev/blog/slices-intro).',
      },
      {
        kind: 'mcq',
        id: 'go-2-mcq-5',
        prompt: `What does this program print?

\`\`\`go
package main

import "fmt"

type Stringer interface {
\tString() string
}

type Tag struct{ name string }

func (t *Tag) String() string { return "#" + t.name }

func main() {
\tvar s Stringer
\tvar t *Tag // nil pointer of concrete type
\ts = t
\tif s == nil {
\t\tfmt.Println("nil")
\t} else {
\t\tfmt.Println("not nil")
\t}
}
\`\`\``,
        options: [
          'nil',
          'not nil',
          'panic: nil pointer dereference',
          'Compile error: cannot assign nil pointer to interface.',
        ],
        correctIndex: 1,
        explanation: 'This is the classic "typed nil" interface gotcha. An interface value is `nil` only when **both** its type and value are nil. Assigning `t` (a `*Tag` whose value is nil) to `s` gives `s` a non-nil type descriptor, so `s == nil` is false. This bug routinely shows up in functions that return `error` from a `*MyError` variable: `return err` even when `err` is nil makes the caller see a non-nil error. Return a bare `nil` literal instead. See [Go FAQ — typed nil](https://go.dev/doc/faq#nil_error).',
      },
      {
        kind: 'mcq',
        id: 'go-2-mcq-6',
        prompt: `What does this program print?

\`\`\`go
package main

import "fmt"

func main() {
\ta := []int{1, 2, 3, 4, 5}
\tb := a[1:3]
\tb[0] = 99
\tfmt.Println(a)
}
\`\`\``,
        options: [
          '[1 2 3 4 5]',
          '[1 99 3 4 5]',
          '[99 2 3 4 5]',
          '[1 99 99 4 5]',
        ],
        correctIndex: 1,
        explanation: 'Slicing does **not** copy. `b` shares the backing array with `a`, just with a different start offset and length. Writing `b[0] = 99` mutates `a[1]`. This silent aliasing is the source of countless bugs in code that returns sub-slices of caller data. If you need an independent slice, copy explicitly with `slices.Clone` (Go 1.21+) or `append([]int(nil), src...)`. See [Go Slices: usage and internals](https://go.dev/blog/slices-intro).',
      },
      {
        kind: 'mcq',
        id: 'go-2-mcq-debug-1',
        prompt: `**Production incident:** The \`/api/users/{id}\` handler always takes the error branch even for valid user IDs. On-call sees this in Datadog logs every request:

\`\`\`
2024-05-10T11:42:03Z ERROR pkg/store/postgres.go:128 unexpected error path:
  err != nil = true, errors.Is(err, nil) = false, err = <nil>
  user_id=42 trace_id=4bf92f3577b34da6
\`\`\`

\`\`\`go
// /app/pkg/store/postgres.go

package store

import (
\t"context"
\t"database/sql"
\t"errors"
\t"fmt"

\t"go.opentelemetry.io/otel"
)

var tracer = otel.Tracer("store")

type QueryError struct {
\tCode    int
\tMessage string
}

func (e *QueryError) Error() string {
\treturn fmt.Sprintf("query error %d: %s", e.Code, e.Message)
}

// LookupUser returns the user's display name or an error.
// BUG: var qErr *QueryError is a typed nil; returning it as error
// produces a non-nil interface value even when qErr was never set.
func LookupUser(ctx context.Context, db *sql.DB, id int) (string, error) {
\t_, span := tracer.Start(ctx, "LookupUser")
\tdefer span.End()

\tvar qErr *QueryError // typed nil — zero value of pointer type

\tvar name string
\terr := db.QueryRowContext(ctx,
\t\t"SELECT display_name FROM users WHERE id = $1", id,
\t).Scan(&name)
\tif errors.Is(err, sql.ErrNoRows) {
\t\tqErr = &QueryError{Code: 404, Message: "user not found"}
\t} else if err != nil {
\t\tqErr = &QueryError{Code: 500, Message: err.Error()}
\t}

\treturn name, qErr // line 128: always returns non-nil error interface!
}
\`\`\`

\`\`\`go
// /app/internal/handlers/checkout.go:42 (caller)

func GetUser(w http.ResponseWriter, r *http.Request) {
\tname, err := store.LookupUser(r.Context(), db, userID)
\tif err != nil { // always true — typed nil trap
\t\thttp.Error(w, "internal error", 500)
\t\treturn
\t}
\tw.Write([]byte(name))
}
\`\`\``,
        options: [
          '`errors.Is` has a bug and cannot compare against `nil` sentinels.',
          '`lookup` returns a typed-nil `*AppError` wrapped in an `error` interface; the interface is non-nil because it carries a type descriptor, so `err != nil` is true even though the underlying pointer is nil.',
          '`AppError` must implement `Unwrap() error` for `errors.Is` to work.',
          'The `var err *AppError` declaration should use `:=` to avoid the typed-nil issue.',
        ],
        correctIndex: 1,
        explanation: 'This is the classic typed-nil interface trap. `var err *AppError` is a nil pointer of type `*AppError`. Returning it as `error` wraps it in an interface value that has a non-nil type (`*AppError`) and a nil value pointer. The `error` interface is only `== nil` when **both** the type and value are nil. Fix: `return nil` directly instead of returning a `*AppError` variable. See [Go FAQ — nil error](https://go.dev/doc/faq#nil_error).',
      },
      {
        kind: 'mcq',
        id: 'go-2-mcq-debug-2',
        prompt: `**Production incident:** The product-catalog service crashed at 14:32 UTC under its first load test (500 req/s). The panic did not reproduce in unit tests, which run single-threaded. Sentry captured:

\`\`\`
goroutine 47 [running]:
runtime.throw2({0x6f3a80?, 0x0?})
        /usr/local/go/src/runtime/panic.go:1023 +0x5c
runtime.mapassign_faststr(0x7a3b20, 0x0, {0xc0004e2010, 5})
        /usr/local/go/src/runtime/map_faststr.go:212 +0x3cc
app/internal/handlers.(*ResponseCache).Set(...)
        /app/internal/handlers/cache.go:28 +0x94
app/internal/handlers.ProductHandler.ServeHTTP(...)
        /app/internal/handlers/product.go:61 +0x1d8

panic: assignment to entry in nil map
goroutine 47 [running]
\`\`\`

\`\`\`go
// /app/internal/handlers/cache.go

package handlers

import (
\t"net/http"
\t"time"
)

// ResponseCache holds rendered JSON responses keyed by cache key.
type ResponseCache struct {
\tttl   time.Duration
\tstore map[string]string // BUG: never initialised in NewResponseCache
}

// NewResponseCache constructs a ResponseCache with the given TTL.
func NewResponseCache(ttl time.Duration) *ResponseCache {
\treturn &ResponseCache{ttl: ttl} // store is nil — map zero value
}

// Set stores a response body under key. Panics if store is nil.
func (c *ResponseCache) Set(key, val string) {
\tc.store[key] = val // line 28 — panics: assignment to entry in nil map
}

// Get retrieves a cached body. Safe: reads from nil map return "".
func (c *ResponseCache) Get(key string) string {
\treturn c.store[key]
}

// /app/internal/handlers/product.go:61 (caller)

func (h ProductHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
\tkey := r.URL.Path
\tif cached := h.cache.Get(key); cached != "" {
\t\tw.Header().Set("Content-Type", "application/json")
\t\tw.Write([]byte(cached))
\t\treturn
\t}
\tbody := h.renderProduct(r.Context(), key)
\th.cache.Set(key, body) // line 61 — triggers the panic
\tw.Write([]byte(body))
}
\`\`\``,
        options: [
          'Concurrent writes require a `sync.RWMutex`; the panic is a data race, not a nil map.',
          '`NewCache` returns a `*Cache` whose `store` field is nil because the struct literal `&Cache{}` does not initialise map fields; writing to a nil map panics.',
          '`map[string]string` is not a valid map type; use `map[string]interface{}`.',
          'The `Get` method should also panic because reading from a nil map is undefined.',
        ],
        correctIndex: 1,
        explanation: '`&Cache{}` is a valid struct literal but leaves the `store` field at its zero value, which for a map is `nil`. Reads from a nil map are safe (they return the zero value), but writes panic. Fix `NewCache`: `return &Cache{store: make(map[string]string)}`. A concurrent access bug may also exist, but the immediate panic is the nil map write. See [Go Maps in action](https://go.dev/blog/maps).',
      },
      {
        kind: 'mcq',
        id: 'go-2-mcq-debug-3',
        prompt: `**Production incident:** The analytics pipeline at \`/app/internal/pipeline/transform.go\` produces corrupted event records intermittently. The bug appears only for input batches smaller than the pre-allocated buffer capacity (typically batches < 512 events). A sample bad run:

\`\`\`
$ go run /app/cmd/pipeline/main.go --batch-size=5
processing window: [event-3 event-4 event-5]
after enrichment window: [event-3 event-4 event-5 ENRICHED]
raw buffer after pipeline: [event-1 event-2 event-3 event-4 ENRICHED]
                                                              ^^^^^^^
ERROR: buf[4] was "event-5" before enrichment, now "ENRICHED" — corruption!
\`\`\`

\`\`\`go
// /app/internal/pipeline/transform.go

package pipeline

import (
\t"context"
\t"fmt"

\t"go.opentelemetry.io/otel"
)

var tracer = otel.Tracer("pipeline")

// windowFromBuf returns a sub-slice of the raw event buffer for processing.
// IMPORTANT: this shares the backing array — it does NOT copy.
func windowFromBuf(buf []string, start, end int) []string {
\treturn buf[start:end] // cap = cap(buf) - start, shares backing array
}

// enrichWindow appends an ENRICHED sentinel to the window for downstream processing.
func enrichWindow(ctx context.Context, window []string) []string {
\t_, span := tracer.Start(ctx, "enrichWindow")
\tdefer span.End()
\t// BUG: if cap(window) > len(window), this writes into buf's backing array
\treturn append(window, "ENRICHED")
}

func RunPipeline(ctx context.Context, events []string) {
\t// Pre-allocate with extra capacity to avoid reallocations
\tbuf := make([]string, len(events), len(events)+10)
\tcopy(buf, events)

\t// Take a window over the last 3 events
\twindow := windowFromBuf(buf, len(buf)-3, len(buf))
\tfmt.Println("processing window:", window)

\tenriched := enrichWindow(ctx, window)
\tfmt.Println("after enrichment window:", enriched)

\t// buf's backing array was mutated — buf[len(buf)-1] is now "ENRICHED"
\tfmt.Println("raw buffer after pipeline:", buf)
}
\`\`\``,
        options: [
          '`buf: [1 2 3 4 5]` and `window: [3 4 5 99]` — append always allocates a new backing array.',
          '`buf: [1 2 3 4 5 99]` — append extends buf in place because window shares its backing array.',
          '`buf: [1 2 3 4 99]` and `window: [3 4 5 99]` — append writes into buf[4].',
          'panic: index out of range — the window slice has no capacity for append.',
        ],
        correctIndex: 1,
        explanation: '`getWindow` returns a slice header pointing into `buf`\'s backing array with `cap = 8` (remaining capacity). Because the capacity is sufficient, `append(window, 99)` writes `99` directly into `buf[5]` — but `buf` has capacity 10 and length 5, so `buf[5]` exists in the underlying array. `buf` itself still has `len=5` so `fmt.Println("buf:", buf)` shows `[1 2 3 4 5]`, but the backing array at index 5 now holds 99. If `buf` is later re-sliced or the length grows, the corruption becomes visible. Fix: copy the window with `append([]int(nil), buf[start:end]...)` before writing. See [Go Slices: usage and internals](https://go.dev/blog/slices-intro).',
      },
      {
        kind: 'code',
        id: 'go-2-code-1',
        prompt: 'Implement a `Scale` method on the `Rectangle` struct with a pointer receiver. It should scale both `Width` and `Height` by the given `factor`.',
        boilerplate: 'package main\n\nimport "fmt"\n\ntype Rectangle struct {\n\tWidth, Height float64\n}\n\n// TODO: Implement the Scale method with a pointer receiver\nfunc (r *Rectangle) Scale(factor float64) {\n\tr.Width *= factor\n\tr.Height *= factor\n}\n\nfunc main() {\n\trect := Rectangle{Width: 3, Height: 4}\n\trect.Scale(2)\n\tfmt.Printf("Width: %.0f, Height: %.0f\\n", rect.Width, rect.Height)\n}\n',
        expectedOutput: 'Width: 6, Height: 8',
        explanation: 'Value receivers receive a copy of the struct, so mutations do not persist. To mutate the original struct instance, you must define the method with a pointer receiver (`*Rectangle`).'
      }
    ],
  },

  {
    id: 'go-3',
    language: 'go',
    level: 3,
    title: 'Concurrency — Goroutines, Channels, Select, and Context',
    timeEstimate: '6-8 hours',
    intro: `By the end of this phase, you'll read concurrent Go code and predict whether it deadlocks, leaks goroutines, or races on shared state — and how \`context.Context\` cancellation flows down a call tree. Topics in depth: unbuffered vs buffered channels, send/receive on a closed channel, \`select\` semantics with multiple ready cases, the \`context.WithCancel\`/\`WithTimeout\` lifecycle, and the goroutine-leak pattern (forgotten cancel, missing buffered slot on a channel a producer is still writing to).

To build the muscle, you'll write locally: a \`dl\` CLI that downloads N URLs concurrently via goroutines and a \`chan result\`, with status printed in arrival order. Run it under \`go run -race main.go\` to verify no data races.`,
    topics: [
      { label: 'A Tour of Go — Concurrency', url: 'https://go.dev/tour/concurrency/1', note: 'Goroutines, channels, select, sync.Mutex' },
      { label: 'Go Concurrency Patterns', url: 'https://go.dev/blog/pipelines', note: 'Pipelines and cancellation with channels' },
      { label: 'context package', url: 'https://pkg.go.dev/context', note: 'WithCancel, WithTimeout, WithValue, Background' },
      { label: 'Go Concurrency Patterns: Context', url: 'https://go.dev/blog/context', note: 'How to pass context through a call tree' },
      { label: 'Go Specification — Channel types', url: 'https://go.dev/ref/spec#Channel_types', note: 'Send-only and receive-only channel types' },
      { label: 'Share Memory By Communicating', url: 'https://go.dev/blog/codelab-share', note: 'The canonical Go concurrency mantra explained' },
    ],
    deliverable: 'Build locally: a `dl` CLI that downloads N URLs concurrently via goroutines + a `chan result` and prints status.',
    checks: [
      {
        kind: 'mcq',
        id: 'go-3-mcq-1',
        prompt: `Why does this code leak a goroutine, even though the function returns?

\`\`\`go
func first(urls []string) string {
\tch := make(chan string) // unbuffered
\tfor _, u := range urls {
\t\tgo func(u string) {
\t\t\tch <- fetch(u) // <- leaks if first returns
\t\t}(u)
\t}
\treturn <-ch // take the first result, ignore the rest
}
\`\`\``,
        options: [
          'Go does not garbage-collect goroutines that have returned.',
          'The slower goroutines are still trying to send into an unbuffered channel that no one will ever receive from again, so they block forever and the runtime keeps them alive.',
          'Goroutines always leak when launched from a `for` loop.',
          '`fetch` blocks until the function returns.',
        ],
        correctIndex: 1,
        explanation: 'Once `first` returns, no one will receive from `ch`. The remaining goroutines are stuck at `ch <- fetch(u)` forever — that is a goroutine leak. Fixes: use a buffered channel sized to `len(urls)`, or use `context.WithCancel` + `select { case ch <- v: case <-ctx.Done(): }` so the senders abandon work when the consumer is gone. See [Go Concurrency Patterns](https://go.dev/blog/pipelines).',
      },
      {
        kind: 'mcq',
        id: 'go-3-mcq-2',
        prompt: 'Why must callers of `context.WithCancel` always call `cancel()` (typically via `defer`)?',
        options: [
          'Otherwise the goroutine that runs the context tree is leaked until the program exits.',
          'It is purely stylistic; the runtime cleans up automatically when the context goes out of scope.',
          'Without `cancel()` the parent context cannot be cancelled.',
          '`cancel()` is required to flush logs.',
        ],
        correctIndex: 0,
        explanation: '`context.WithCancel` (and `WithTimeout`/`WithDeadline`) spawn an internal goroutine that watches the parent. If you never call the returned `cancel`, that goroutine and the associated resources leak until program exit. `go vet` ships a `lostcancel` checker that flags this exact bug. Always `defer cancel()` immediately after the call. See [pkg.go.dev/context](https://pkg.go.dev/context).',
      },
      {
        kind: 'mcq',
        id: 'go-3-mcq-3',
        prompt: `What can you say about the output of this program?

\`\`\`go
package main

import "fmt"

func main() {
\tch1 := make(chan string, 1)
\tch2 := make(chan string, 1)

\tgo func() { ch1 <- "ping" }()
\tgo func() { ch2 <- "pong" }()

\tfor i := 0; i < 2; i++ {
\t\tselect {
\t\tcase m := <-ch1:
\t\t\tfmt.Println(m)
\t\tcase m := <-ch2:
\t\t\tfmt.Println(m)
\t\t}
\t}
}
\`\`\``,
        options: [
          'It always prints `ping` then `pong`.',
          'It always prints `pong` then `ping`.',
          'It prints both `ping` and `pong`, but the order is non-deterministic because `select` picks randomly when multiple cases are ready.',
          'It deadlocks because the channels are buffered.',
        ],
        correctIndex: 2,
        explanation: 'The Go spec mandates that when multiple `select` cases can proceed, one is chosen via uniform pseudo-random selection. Even though both channels are buffered and ready, you cannot predict which message arrives first. Tests that depend on `select` order are flaky by construction. See [Go spec — Select statements](https://go.dev/ref/spec#Select_statements).',
      },
      {
        kind: 'mcq',
        id: 'go-3-mcq-4',
        prompt: `What does this program print?

\`\`\`go
package main

import (
\t"context"
\t"fmt"
\t"time"
)

func work(ctx context.Context) {
\tselect {
\tcase <-time.After(10 * time.Millisecond):
\t\tfmt.Println("done")
\tcase <-ctx.Done():
\t\tfmt.Println("timeout")
\t}
}

func main() {
\tctx, cancel := context.WithTimeout(context.Background(), 1*time.Millisecond)
\tdefer cancel()
\twork(ctx)
}
\`\`\``,
        options: [
          'done',
          'timeout',
          'panic: context deadline exceeded',
          'It deadlocks.',
        ],
        correctIndex: 1,
        explanation: 'The 1ms timeout fires long before `time.After(10ms)`. The `ctx.Done()` channel closes first, so the select takes that case and prints `timeout`. This pattern — racing a deadline against work — is the canonical use of `context.WithTimeout`. Note: the context being expired is *not* a panic; it is a signal you have to observe via `Done()` or by checking `ctx.Err()`. See [pkg.go.dev/context](https://pkg.go.dev/context).',
      },
      {
        kind: 'mcq',
        id: 'go-3-mcq-5',
        prompt: `What does this program print?

\`\`\`go
package main

import "fmt"

func main() {
\tch := make(chan int)
\tclose(ch)
\tv, ok := <-ch
\tfmt.Println(v, ok)
}
\`\`\``,
        options: [
          '0 false',
          'panic: receive from closed channel',
          '0 true',
          'It blocks forever.',
        ],
        correctIndex: 0,
        explanation: 'Receiving from a closed channel never blocks: it returns the zero value of the element type and `ok = false`. **Sending** on a closed channel, however, panics. This asymmetry is what enables `for v := range ch` loops to terminate cleanly when the producer closes the channel. The producer side owns close — never close from the receiver. See [Tour of Go — Range and Close](https://go.dev/tour/concurrency/4).',
      },
      {
        kind: 'mcq',
        id: 'go-3-mcq-6',
        prompt: `Which line in this program contains a race condition?

\`\`\`go
package main

import (
\t"fmt"
\t"sync"
)

func main() {
\tvar counter int                  // line A
\tvar wg sync.WaitGroup            // line B
\tfor i := 0; i < 1000; i++ {
\t\twg.Add(1)
\t\tgo func() {
\t\t\tdefer wg.Done()
\t\t\tcounter++              // line C
\t\t}()
\t}
\twg.Wait()                        // line D
\tfmt.Println(counter)
}
\`\`\``,
        options: [
          'Line A',
          'Line B',
          'Line C — concurrent reads and writes to `counter` from multiple goroutines without synchronisation.',
          'Line D',
        ],
        correctIndex: 2,
        explanation: '`counter++` is a read-modify-write on shared state without a mutex or atomic, so 1000 goroutines racing on it is a textbook data race. Verify with `go run -race main.go`. Fix with `sync.Mutex` around the increment, or use `atomic.AddInt64(&counter, 1)`. The final printed value will vary across runs and is almost never 1000. See [Introducing the Go Race Detector](https://go.dev/blog/race-detector).',
      },
      {
        kind: 'mcq',
        id: 'go-3-mcq-debug-1',
        prompt: `**Production incident:** p99 latency on \`/api/orders\` spiked from 50ms to 30s at 14:32 UTC after deploying v2.4.1. A \`pprof\` goroutine dump taken 10 minutes after the deploy showed 25,000 goroutines stuck in "chan send". Memory grew from 180MB to 2.1GB before the pod was OOM-killed.

\`\`\`
$ curl -s http://localhost:6060/debug/pprof/goroutine?debug=1 | head -40

goroutine profile: total 25143

24891 @ 0x43d486 0x44b0c5 0x8f3c42 0x4750e1
#	0x8f3c42	app/internal/handlers.fetchAll.func1+0x82
#	                /app/internal/handlers/checkout.go:42

250 @ 0x43d486 0x44b0c5 0x6c3a18 0x4750e1
#	0x6c3a18	app/internal/handlers.fetchAll+0xb4
#	                /app/internal/handlers/checkout.go:55
\`\`\`

\`\`\`go
// /app/internal/handlers/checkout.go

package handlers

import (
\t"context"
\t"net/http"
\t"time"

\t"go.opentelemetry.io/otel"
)

var tracer = otel.Tracer("handlers")

// fetchAll fans out HTTP calls for a checkout request and returns the first result.
// Called on every POST /api/orders request.
func fetchAll(ctx context.Context, urls []string) []string {
\t_, span := tracer.Start(ctx, "fetchAll")
\tdefer span.End()

\tresults := make(chan string) // unbuffered — requires a receiver for every send
\tfor _, u := range urls {
\t\tu := u
\t\tgo func() {
\t\t\ttime.Sleep(200 * time.Millisecond) // simulate downstream HTTP
\t\t\tresults <- u + "-done"            // line 42: blocks if no receiver
\t\t}()
\t}

\tselect {
\tcase r := <-results: // line 55: takes only the first result
\t\treturn []string{r}
\tcase <-ctx.Done(): // caller cancelled; remaining goroutines stay blocked
\t\treturn nil
\t}
}

func CheckoutHandler(w http.ResponseWriter, r *http.Request) {
\tctx, cancel := context.WithTimeout(r.Context(), 10*time.Millisecond)
\tdefer cancel()
\turls := []string{
\t\t"https://inventory/reserve",
\t\t"https://pricing/quote",
\t\t"https://fraud/check",
\t}
\tresults := fetchAll(ctx, urls)
\tif len(results) == 0 {
\t\thttp.Error(w, "upstream timeout", http.StatusGatewayTimeout)
\t\treturn
\t}
\tw.Write([]byte(results[0]))
}
\`\`\``,
        options: [
          'The context timeout is too short; increase it to 1 second to let all goroutines finish.',
          'When the context cancels, `fetchAll` returns but the goroutines sending on the unbuffered `results` channel block forever because no receiver remains — this is a goroutine leak.',
          '`time.Sleep` inside a goroutine is not allowed when a context is active.',
          'Using 100 concurrent calls to `fetchAll` exceeds the goroutine limit.',
        ],
        correctIndex: 1,
        explanation: 'The unbuffered `results` channel requires a receiver for every send. When the context fires, `fetchAll` returns early leaving goroutines blocked at `results <- u + "-done"` with no receiver. Fix: size `results` to `len(urls)` so senders never block, or add `select { case results <- v: case <-ctx.Done(): return }` inside each goroutine so they abandon work when the context is done. See [Go Concurrency Patterns — Pipelines](https://go.dev/blog/pipelines).',
      },
      {
        kind: 'mcq',
        id: 'go-3-mcq-debug-2',
        prompt: `**Production incident:** A new \`cmd/export/main.go\` CLI shipped in v1.3.0 hangs immediately on every invocation. It never prints any output. Engineers confirmed it was tested manually on a single record — the bug only surfaced when integrated into the CI pipeline. Pressing Ctrl-\\\\ (SIGQUIT) produced this goroutine dump:

\`\`\`
$ ./export --date=2024-06-01
^\\
SIGQUIT: quit
PC=0x45d3c2 m=0 sigcode=0

goroutine 1 [chan receive]:
main.main()
        /app/cmd/export/main.go:67 +0x58
created by main.main in goroutine 1

goroutine 6 [chan send]:
main.streamRecords(0xc0000b4000)
        /app/cmd/export/main.go:34 +0x44
created by main.main in goroutine 1 at:
        /app/cmd/export/main.go:62 +0x38

exit status 2
\`\`\`

\`\`\`go
// /app/cmd/export/main.go

package main

import (
\t"database/sql"
\t"fmt"
\t"log"

\t_ "github.com/jackc/pgx/v5/stdlib"
)

// streamRecords queries the DB and sends each row ID onto ch.
// Must close ch when done so the consumer's range loop can exit.
func streamRecords(db *sql.DB, ch chan int) {
\trows, err := db.Query("SELECT id FROM export_queue ORDER BY id")
\tif err != nil {
\t\tlog.Printf("streamRecords: query: %v", err)
\t\treturn
\t}
\tdefer rows.Close()
\tfor rows.Next() {
\t\tvar id int
\t\tif err := rows.Scan(&id); err != nil {
\t\t\tlog.Printf("streamRecords: scan: %v", err)
\t\t\tcontinue
\t\t}
\t\tch <- id // line 34: blocks on first send — no receiver yet
\t}
\t// BUG: close(ch) is missing; consumer range loop never terminates
}

func main() {
\tdb, err := sql.Open("pgx", "postgres://app:secret@db:5432/prod")
\tif err != nil {
\t\tlog.Fatal(err)
\t}
\tdefer db.Close()

\tch := make(chan int) // unbuffered
\tstreamRecords(db, ch) // line 62: called synchronously — deadlocks immediately
\tfor id := range ch { // line 67: never reached
\t\tfmt.Printf("exporting id=%d\\n", id)
\t}
}
\`\`\``,
        options: [
          '`range` over a channel requires a `close(ch)` call to terminate; without it the loop hangs.',
          '`produce` is called synchronously on the main goroutine; it blocks at the first `ch <- i` because there is no concurrent receiver yet, causing a deadlock.',
          'The channel must be buffered with size 3 to match the number of sends.',
          'The `for range ch` loop must use `_, v := range ch` syntax.',
        ],
        correctIndex: 1,
        explanation: 'An unbuffered channel send blocks until a receiver is ready. `produce(ch)` runs on the main goroutine and blocks at `ch <- 0` because the `for range` consumer is below it — it never starts. Fix: launch `produce` as a goroutine: `go produce(ch)`. Also add `close(ch)` at the end of `produce` so the `range` loop can terminate. Deadlocks on unbuffered channels are one of the most common beginner concurrency mistakes. See [Tour of Go — Channels](https://go.dev/tour/concurrency/2).',
      },
      {
        kind: 'mcq',
        id: 'go-3-mcq-debug-3',
        prompt: `**Production incident:** The image-resizing worker pool at \`/app/cmd/resizer/main.go\` processes exactly 5 jobs (the channel buffer size) then stalls completely. CPU drops to 0%. Memory stays flat. No errors appear in logs. The pod must be manually killed. Engineers initially suspected a deadlock in the image library.

\`\`\`
$ go run /app/cmd/resizer/main.go --jobs=10
processed job 0 (512x512)
processed job 1 (512x512)
processed job 2 (512x512)
processed job 3 (512x512)
processed job 4 (512x512)
[hangs here — no output, no errors, CPU=0%]
^C
\`\`\`

A SIGQUIT dump confirmed the hang:

\`\`\`
goroutine 1 [chan receive]:
main.main()
        /app/cmd/resizer/main.go:71 +0x134

goroutine 7 [chan receive]:
main.worker(0xc0000b6000, 0xc0000c2000)
        /app/cmd/resizer/main.go:38 +0x88
\`\`\`

\`\`\`go
// /app/cmd/resizer/main.go

package main

import (
\t"fmt"
\t"log"
\t"time"

\t"go.opentelemetry.io/otel"
)

var tracer = otel.Tracer("resizer")

type Job struct {
\tID   int
\tSize string
}

// worker drains the jobs channel and signals done when the channel is closed.
func worker(jobs <-chan Job, done chan<- struct{}) {
\tfor j := range jobs { // line 38: exits only when jobs is closed
\t\ttime.Sleep(10 * time.Millisecond) // simulate image resize
\t\tfmt.Printf("processed job %d (%s)\\n", j.ID, j.Size)
\t}
\tdone <- struct{}{}
}

func main() {
\tjobs := make(chan Job, 5) // buffered: holds 5 jobs
\tdone := make(chan struct{})

\tgo worker(jobs, done)

\tfor i := 0; i < 10; i++ {
\t\tjobs <- Job{ID: i, Size: "512x512"}
\t}
\t// BUG: close(jobs) is missing here
\t// The worker is stuck waiting in range jobs at line 38.
\t// main is stuck waiting on <-done at line 71.
\t<-done // line 71: blocks forever
\tlog.Println("all jobs processed")
}
\`\`\``,
        options: [
          'The buffered channel size of 5 is too small for 10 jobs; increase it to 10.',
          'The worker\'s `for j := range jobs` loop only exits when `jobs` is closed; forgetting `close(jobs)` after sending all items means the worker blocks waiting for more, and `<-done` never receives.',
          'The `done` channel must be buffered with size 1 to avoid the deadlock.',
          '`time.Sleep` inside a range loop prevents the goroutine from receiving the close signal.',
        ],
        correctIndex: 1,
        explanation: '`for j := range jobs` exits only when the channel is closed. After sending all 10 items, the main goroutine waits on `<-done`, but the worker is still blocked inside `range jobs` waiting for more work — neither side can proceed. Fix: add `close(jobs)` after the send loop. This is the standard producer/consumer pattern: producer sends, then closes; consumer ranges; main waits on `done`. See [Tour of Go — Range and Close](https://go.dev/tour/concurrency/4).',
      },
      {
        kind: 'code',
        id: 'go-3-code-1',
        prompt: 'Calculate the sum of a slice in a goroutine and send the result on a channel.',
        boilerplate: 'package main\n\nimport "fmt"\n\nfunc sum(s []int, c chan int) {\n\ttotal := 0\n\tfor _, v := range s {\n\t\ttotal += v\n\t}\n\t// TODO: Send total to channel c\n\tc <- total\n}\n\nfunc main() {\n\ts := []int{7, 2, 8, -9, 4, 0}\n\tc := make(chan int)\n\t// TODO: Start the sum function as a goroutine\n\tgo sum(s, c)\n\tx := <-c\n\tfmt.Println("Sum:", x)\n}\n',
        expectedOutput: 'Sum: 12',
        explanation: 'Goroutines run concurrently in the background using the `go` keyword. Channels are typed conduits through which you can send and receive values using the channel operator `<-`.'
      }
    ],
  },

  {
    id: 'go-4',
    language: 'go',
    level: 4,
    title: 'Standard Library — HTTP, JSON, Testing, and Modules',
    timeEstimate: '6-8 hours',
    intro: `By the end of this phase, you'll read \`net/http\` handlers and \`encoding/json\` code and predict their HTTP behaviour — including the Go 1.22 method-aware ServeMux patterns, JSON struct tags with \`omitempty\`, and what \`json.Unmarshal\` does on unknown fields. Topics in depth: \`http.Handler\`/\`http.HandlerFunc\` shapes, the \`httptest\` package for in-process tests, table-driven tests with \`t.Run\`, and Go modules (\`go.mod\`, \`go get\`, semantic import versioning).

To build the muscle, you'll write locally: a small HTTP server using \`net/http\` with \`/health\` and \`POST /echo\` routes, exercised by table-driven tests built with \`httptest.NewRecorder\` and \`httptest.NewRequest\`. Run \`go test ./...\` and \`go test -race ./...\` to confirm.`,
    topics: [
      { label: 'net/http package', url: 'https://pkg.go.dev/net/http', note: 'ServeMux, Handler, Client, Request, Response' },
      { label: 'encoding/json package', url: 'https://pkg.go.dev/encoding/json', note: 'Marshal, Unmarshal, Decoder, Encoder' },
      { label: 'testing package', url: 'https://pkg.go.dev/testing', note: 'T, B, F — unit tests, benchmarks, fuzzing' },
      { label: 'Table-driven tests in Go', url: 'https://go.dev/wiki/TableDrivenTests', note: 'Canonical pattern for writing multiple test cases' },
      { label: 'Using Go Modules', url: 'https://go.dev/blog/using-go-modules', note: 'go.mod, go.sum, go get, versioning' },
      { label: 'JSON and Go', url: 'https://go.dev/blog/json', note: 'Struct tags, nested types, streaming JSON' },
      { label: 'net/http/httptest', url: 'https://pkg.go.dev/net/http/httptest', note: 'In-process test server and ResponseRecorder' },
    ],
    deliverable: 'Build locally: a small HTTP server using net/http with /health and /echo routes, table-driven tests.',
    checks: [
      {
        kind: 'mcq',
        id: 'go-4-mcq-1',
        prompt: `Why does this handler corrupt responses under load?

\`\`\`go
type Server struct {
\tw http.ResponseWriter
}

func (s *Server) Handle(w http.ResponseWriter, r *http.Request) {
\ts.w = w                                 // <- cache for later
\tgo func() {
\t\ttime.Sleep(100 * time.Millisecond)
\t\ts.w.Write([]byte("late"))             // <- write after Handle returned
\t}()
}
\`\`\``,
        options: [
          'It is fine; `http.ResponseWriter` is safe for concurrent use.',
          '`http.ResponseWriter` must not be used after the handler returns, and only by the goroutine handling that request; storing it on `s.w` and writing later (potentially after another request has overwritten `s.w`) is undefined behaviour.',
          'The bug is `time.Sleep` — production handlers cannot sleep.',
          'The handler must call `w.WriteHeader` first.',
        ],
        correctIndex: 1,
        explanation: 'Two real-world bugs collide here. (1) A `ResponseWriter` is valid only inside the handler that received it; the server may pool/reuse internals once `Handle` returns. (2) Stashing it on a shared `*Server` field means two concurrent requests stomp on each other. Either complete the work before returning, or pass any needed data into the goroutine and write to a sink other than the original `w`. See [pkg.go.dev/net/http#ResponseWriter](https://pkg.go.dev/net/http#ResponseWriter).',
      },
      {
        kind: 'mcq',
        id: 'go-4-mcq-2',
        prompt: 'What command adds a new module dependency to a Go project?',
        options: [
          '`go install example.com/pkg`',
          '`go add example.com/pkg`',
          '`go get example.com/pkg`',
          '`go mod add example.com/pkg`',
        ],
        correctIndex: 2,
        explanation: '`go get example.com/pkg` resolves the latest compatible version, adds it to `go.mod`, and updates `go.sum`. Use `go get example.com/pkg@v1.2.3` to pin a version, or `@latest` for the latest tag. `go install` is for installing binary tools, not library dependencies. See [Using Go Modules](https://go.dev/blog/using-go-modules).',
      },
      {
        kind: 'mcq',
        id: 'go-4-mcq-3',
        prompt: `What does this program print?

\`\`\`go
package main

import (
\t"encoding/json"
\t"fmt"
)

type Person struct {
\tName string \`json:"name"\`
\tAge  int    \`json:"age,omitempty"\`
}

func main() {
\tb, _ := json.Marshal(Person{Name: "Alice"})
\tfmt.Println(string(b))
}
\`\`\``,
        options: [
          '{"name":"Alice","age":0}',
          '{"name":"Alice"}',
          '{"Name":"Alice","Age":0}',
          '{"name":"Alice","age":null}',
        ],
        correctIndex: 1,
        explanation: '`omitempty` causes the encoder to skip the field when it holds its zero value. Since `Age` was unset (zero), it is omitted entirely. Without `omitempty`, the output would be `{"name":"Alice","age":0}` — which is a real footgun if a 0 in your JSON is semantically distinct from "absent". See [JSON and Go](https://go.dev/blog/json).',
      },
      {
        kind: 'mcq',
        id: 'go-4-mcq-4',
        prompt: `What status code does this handler return when called with GET /hello?

\`\`\`go
package main

import (
\t"net/http"
)

func main() {
\tmux := http.NewServeMux()
\tmux.HandleFunc("POST /hello", func(w http.ResponseWriter, r *http.Request) {
\t\tw.Write([]byte("hi"))
\t})
\thttp.ListenAndServe(":8080", mux)
}
\`\`\``,
        options: [
          '200 OK — the handler runs regardless of method.',
          '404 Not Found — no route matches the method.',
          '405 Method Not Allowed — Go 1.22+ ServeMux returns this when the path matches but the method does not.',
          '500 Internal Server Error.',
        ],
        correctIndex: 2,
        explanation: 'Go 1.22 introduced method-aware patterns like `"POST /hello"` plus wildcards (`{id}`). When the path matches but the method does not, the default mux responds with 405 Method Not Allowed and an `Allow` header. Before 1.22 you needed an extra `if r.Method != "POST"` check in every handler. See [pkg.go.dev/net/http#ServeMux](https://pkg.go.dev/net/http#ServeMux).',
      },
      {
        kind: 'mcq',
        id: 'go-4-mcq-5',
        prompt: `What does this program print? Assume the input decodes successfully.

\`\`\`go
package main

import (
\t"encoding/json"
\t"fmt"
)

type Person struct {
\tName string \`json:"name"\`
\tAge  int    \`json:"age"\`
}

func main() {
\tvar p Person
\t_ = json.Unmarshal([]byte(\`{"name":"Bob","age":25,"extra":"ignored"}\`), &p)
\tfmt.Println(p.Name, p.Age)
}
\`\`\``,
        options: [
          'panic: unknown field "extra"',
          'Bob 25',
          ' 0',
          '"Bob" 25',
        ],
        correctIndex: 1,
        explanation: 'By default `json.Unmarshal` silently ignores unknown JSON keys — convenient, but easy to miss typos on the wire. For strict APIs, decode with `dec := json.NewDecoder(r); dec.DisallowUnknownFields()` and check `dec.Decode(&p)`. See [pkg.go.dev/encoding/json#Decoder.DisallowUnknownFields](https://pkg.go.dev/encoding/json#Decoder.DisallowUnknownFields).',
      },
      {
        kind: 'mcq',
        id: 'go-4-mcq-6',
        prompt: `Why is \`t.Run(tc.name, ...)\` important in this table-driven test?

\`\`\`go
func TestAdd(t *testing.T) {
\tcases := []struct {
\t\tname     string
\t\ta, b     int
\t\twant     int
\t}{
\t\t{"zero", 0, 0, 0},
\t\t{"positive", 2, 3, 5},
\t\t{"negative", -1, 1, 0},
\t}
\tfor _, tc := range cases {
\t\tt.Run(tc.name, func(t *testing.T) {
\t\t\tgot := Add(tc.a, tc.b)
\t\t\tif got != tc.want {
\t\t\t\tt.Errorf("Add(%d,%d) = %d, want %d", tc.a, tc.b, got, tc.want)
\t\t\t}
\t\t})
\t}
}
\`\`\``,
        options: [
          'It is required for the test to compile.',
          'It runs each case in parallel.',
          'It creates a sub-test so failures report which case failed, and you can target a single case with `go test -run TestAdd/positive`.',
          'It resets `*testing.T` between iterations to prevent state leakage.',
        ],
        correctIndex: 2,
        explanation: '`t.Run` registers a sub-test under the parent test name. Failures include the sub-test name in the report, and you can run individual sub-tests with `-run TestAdd/positive`. To run sub-tests in parallel, call `t.Parallel()` inside the closure. See [Table-driven tests](https://go.dev/wiki/TableDrivenTests).',
      },
      {
        kind: 'mcq',
        id: 'go-4-mcq-debug-1',
        prompt: `**Production symptom:** Under load (>500 req/s) the service logs "http: superfluous response.WriteHeader call" and clients occasionally receive garbled JSON bodies. The bug does not reproduce in unit tests.

\`\`\`go
package main

import (
\t"encoding/json"
\t"net/http"
\t"time"
)

type result struct {
\tValue string \`json:"value"\`
}

func slowHandler(w http.ResponseWriter, r *http.Request) {
\tgo func() {
\t\ttime.Sleep(50 * time.Millisecond) // simulate slow DB
\t\tw.Header().Set("Content-Type", "application/json")
\t\tw.WriteHeader(http.StatusOK)
\t\tjson.NewEncoder(w).Encode(result{Value: "done"})
\t}()
\t// handler returns immediately; goroutine writes to w later
}

func main() {
\thttp.HandleFunc("/slow", slowHandler)
\thttp.ListenAndServe(":8080", nil)
}
\`\`\``,
        options: [
          '`json.NewEncoder` is not safe for concurrent use and needs a mutex.',
          '`http.ResponseWriter` must not be used after the handler function returns; the goroutine writes to a potentially recycled or already-finished response, causing the superfluous header warning and garbled output.',
          'The `Content-Type` header must be set before calling `w.WriteHeader`; the order here is wrong.',
          '`time.Sleep` in a goroutine causes the connection to time out before the response is sent.',
        ],
        correctIndex: 1,
        explanation: 'The `http.ResponseWriter` is valid only for the lifetime of the `ServeHTTP` call. Once `slowHandler` returns, the server may finalize the response. The spawned goroutine then races to write headers and body to an already-concluded response writer, producing "superfluous response.WriteHeader" warnings and truncated or doubled output. Fix: do all work synchronously in the handler, or use a proper async pattern (e.g., SSE, WebSockets). See [pkg.go.dev/net/http#ResponseWriter](https://pkg.go.dev/net/http#ResponseWriter).',
      },
      {
        kind: 'mcq',
        id: 'go-4-mcq-debug-2',
        prompt: `**Production symptom:** A webhook receiver silently ignores the \`user_id\` field sent by the upstream service. Logs show \`userID\` is always zero. The upstream sends valid JSON: \`{"user_id":42,"action":"login"}\`.

\`\`\`go
package main

import (
\t"encoding/json"
\t"fmt"
)

type Event struct {
\tUserID int    \`json:"userId"\` // tag says "userId" but wire sends "user_id"
\tAction string \`json:"action"\`
}

func main() {
\traw := \`{"user_id":42,"action":"login"}\`
\tvar e Event
\tif err := json.Unmarshal([]byte(raw), &e); err != nil {
\t\tpanic(err)
\t}
\tfmt.Println(e.UserID, e.Action)
}
\`\`\``,
        options: [
          '`json.Unmarshal` is case-sensitive and requires exact key matches.',
          'The struct tag says `json:"userId"` but the wire format uses `"user_id"`; the key mismatch means `UserID` is never populated and stays at its zero value (0).',
          '`int` cannot be decoded from JSON numbers; use `json.Number` instead.',
          '`json.Unmarshal` panics on unknown fields and the `user_id` key is silently eaten.',
        ],
        correctIndex: 1,
        explanation: '`encoding/json` matches JSON keys to struct fields using the `json:` tag (case-insensitively only as a fallback for untagged fields). Since `UserID` has an explicit tag `json:"userId"`, the decoder looks specifically for `"userId"` in the wire data. The incoming `"user_id"` does not match, so the field stays 0. Fix: change the tag to `json:"user_id"`. Use `json.NewDecoder(r).DisallowUnknownFields()` in development to catch mismatches early. See [JSON and Go](https://go.dev/blog/json).',
      },
      {
        kind: 'mcq',
        id: 'go-4-mcq-debug-3',
        prompt: `**Production symptom:** A CI pipeline reports that all sub-tests in \`TestProcess\` pass, but the test suite takes 45 seconds — far longer than expected. Investigation reveals every sub-test runs sequentially despite being marked parallel. What is wrong?

\`\`\`go
func TestProcess(t *testing.T) {
\tcases := []struct {
\t\tname  string
\t\tinput int
\t}{
\t\t{"small", 1},
\t\t{"medium", 100},
\t\t{"large", 10000},
\t}
\tfor _, tc := range cases {
\t\ttc := tc
\t\tt.Run(tc.name, func(t *testing.T) {
\t\t\t// t.Parallel() is missing here
\t\t\tresult := process(tc.input)
\t\t\tif result < 0 {
\t\t\t\tt.Errorf("got %d, want >= 0", result)
\t\t\t}
\t\t})
\t}
}
\`\`\``,
        options: [
          '`tc := tc` inside the loop is incorrect and causes all sub-tests to share the same input.',
          '`t.Parallel()` is missing inside the sub-test closure; without it, sub-tests run sequentially within the parent, negating the benefit of `t.Run` for parallelism.',
          'Sub-tests never run in parallel; only top-level test functions can run in parallel with `-parallel`.',
          '`t.Run` must be called outside the `for` loop for parallel execution to work.',
        ],
        correctIndex: 1,
        explanation: 'Adding `t.Parallel()` as the first line inside a `t.Run` closure signals the testing harness to pause that sub-test and run it concurrently with other parallel sub-tests. Without it, each sub-test runs to completion before the next starts. The `tc := tc` capture is correct (pre-Go 1.22 fix for loop variable closure) but irrelevant to parallelism. With `t.Parallel()`, all three sub-tests would run concurrently, cutting total time to roughly `max(process(1), process(100), process(10000))`. See [Table-driven tests](https://go.dev/wiki/TableDrivenTests).',
      },
      {
        kind: 'code',
        id: 'go-4-code-1',
        prompt: 'Parse a JSON string into a `User` struct using `encoding/json`.',
        boilerplate: 'package main\n\nimport (\n\t"encoding/json"\n\t"fmt"\n)\n\ntype User struct {\n\tName string `json:"name"`\n\tAge  int    `json:"age"`\n}\n\nfunc main() {\n\tjsonData := `{"name": "Alice", "age": 30}`\n\tvar u User\n\t// TODO: Unmarshal the jsonData into the User struct u\n\terr := json.Unmarshal([]byte(jsonData), &u)\n\tif err != nil {\n\t\tfmt.Println("Error:", err)\n\t\treturn\n\t}\n\tfmt.Printf("User: %s, Age: %d\\n", u.Name, u.Age)\n}\n',
        expectedOutput: 'User: Alice, Age: 30',
        explanation: 'We use the `encoding/json` package\'s `Unmarshal` function to parse JSON data. It requires a byte slice of the JSON data and a pointer to the destination struct variable.'
      }
    ],
  },

  {
    id: 'go-5',
    language: 'go',
    level: 5,
    title: 'Advanced Concurrency — sync, atomic, errgroup, and the Memory Model',
    timeEstimate: '7-9 hours',
    intro: `By the end of this phase, you'll read low-level concurrent code and reason about visibility, ordering, and deadlocks under the Go memory model. Topics in depth: \`sync.Mutex\`/\`RWMutex\` (non-reentrant, deadlock prone if misused), \`sync.WaitGroup\` (call \`Add\` before \`go\`, not inside), \`sync.Once\` for once-per-process initialisation, \`sync.Pool\` for reusable allocations in hot paths, the \`golang.org/x/sync/errgroup\` pattern, and \`atomic\` operations.

To build the muscle, you'll extend the L3 \`dl\` CLI with a bounded worker pool (\`-workers\` flag), mutex-protected stats, and \`errgroup.WithContext\` so the first non-nil error cancels siblings. Run under \`go test -race ./...\` until it is clean.`,
    topics: [
      { label: 'sync package', url: 'https://pkg.go.dev/sync', note: 'Mutex, RWMutex, WaitGroup, Once, Cond, Map, Pool' },
      { label: 'sync/atomic package', url: 'https://pkg.go.dev/sync/atomic', note: 'Lock-free integer and pointer operations' },
      { label: 'The Go Memory Model', url: 'https://go.dev/ref/mem', note: 'Happens-before, channel rules, sync guarantees' },
      { label: 'Introducing the Go Race Detector', url: 'https://go.dev/blog/race-detector', note: 'How to detect and interpret data races' },
      { label: 'errgroup package', url: 'https://pkg.go.dev/golang.org/x/sync/errgroup', note: 'Goroutine group with error collection and cancellation' },
      { label: 'sync.Pool', url: 'https://pkg.go.dev/sync#Pool', note: 'Reusable temporary object pool for high-allocation paths' },
    ],
    deliverable: 'Extend the L3 `dl` CLI: add a bounded worker pool (`-workers` flag), `sync.Mutex`-guarded stats, `errgroup.WithContext` for cancellation on first error, and `go test -race` clean.',
    checks: [
      {
        kind: 'mcq',
        id: 'go-5-mcq-1',
        prompt: `Which is the correct, idiomatic use of \`sync.Pool\` for a JSON encoding hot path?

\`\`\`go
var bufPool = sync.Pool{
\tNew: func() any { return new(bytes.Buffer) },
}

func encode(v any) ([]byte, error) {
\tbuf := bufPool.Get().(*bytes.Buffer)
\tbuf.Reset()
\tdefer bufPool.Put(buf)
\tif err := json.NewEncoder(buf).Encode(v); err != nil {
\t\treturn nil, err
\t}
\treturn append([]byte(nil), buf.Bytes()...), nil // copy out
}
\`\`\``,
        options: [
          'The code is wrong; `sync.Pool` is for connection pools, not byte buffers.',
          'It is correct: pool the buffer, reset on Get, return a copy of the bytes (because the buffer goes back into the pool and may be reused immediately), and Put via defer.',
          'It is wrong because `sync.Pool` items are guaranteed to persist; the copy on return is unnecessary.',
          'It must call `bufPool.Drain()` once per request.',
        ],
        correctIndex: 1,
        explanation: '`sync.Pool` is the canonical way to reduce allocations for short-lived, reusable objects (buffers, parsers). Key rules: (1) **always Reset** state on Get because contents are unspecified; (2) **never retain references** to bytes from a pooled buffer after Put — copy out anything you return to the caller; (3) **GC may evict** pool entries at any time, so do not rely on it for cache semantics. See [pkg.go.dev/sync#Pool](https://pkg.go.dev/sync#Pool).',
      },
      {
        kind: 'mcq',
        id: 'go-5-mcq-2',
        prompt: 'What does `sync.Once.Do(f)` guarantee?',
        options: [
          '`f` is called once per goroutine.',
          '`f` is called at most once across all goroutines, even under concurrent calls.',
          '`f` is called synchronously before any goroutines start.',
          '`f` is retried until it succeeds without panicking.',
        ],
        correctIndex: 1,
        explanation: '`sync.Once` ensures `f` is executed exactly once, regardless of how many goroutines call `Do` concurrently. Subsequent calls are no-ops. All callers block until the first invocation completes. Typical use: lazy init of a singleton or expensive caller. If `f` panics, Once still considers itself "done". See [pkg.go.dev/sync#Once](https://pkg.go.dev/sync#Once).',
      },
      {
        kind: 'mcq',
        id: 'go-5-mcq-3',
        prompt: `Which line contains the bug?

\`\`\`go
package main

import (
\t"fmt"
\t"sync"
)

func main() {
\tvar wg sync.WaitGroup
\tfor i := 0; i < 5; i++ {           // line A
\t\twg.Add(1)                        // line B
\t\tgo func() {                      // line C
\t\t\tdefer wg.Done()
\t\t\tfmt.Println(i)                 // line D
\t\t}()
\t}
\twg.Wait()
}
\`\`\``,
        options: [
          'Line A — the loop bound should be 4.',
          'Line B — `wg.Add` must be called inside the goroutine.',
          'Line D — pre-Go-1.22, all goroutines share the same `i` and likely print `5` five times; pass `i` as an argument or use Go 1.22+ where each iteration has a fresh `i`.',
          'Line C — anonymous functions cannot be launched as goroutines.',
        ],
        correctIndex: 2,
        explanation: 'Before Go 1.22 the loop variable `i` was shared across iterations, so goroutines reading `i` after the loop ended saw `5`. Go 1.22 changed loop semantics so each iteration has its own `i`. For portability and clarity, the safe form is still `go func(i int){...}(i)`. Note: `wg.Add` must be called *before* `go`, not inside the goroutine, or `Wait` may finish too early. See [Go 1.22 release notes](https://go.dev/doc/go1.22#language).',
      },
      {
        kind: 'mcq',
        id: 'go-5-mcq-4',
        prompt: `What does this program print?

\`\`\`go
package main

import (
\t"fmt"
\t"sync"
\t"sync/atomic"
)

func main() {
\tvar counter int64
\tvar wg sync.WaitGroup
\tfor i := 0; i < 10; i++ {
\t\twg.Add(1)
\t\tgo func() {
\t\t\tdefer wg.Done()
\t\t\tfor j := 0; j < 100; j++ {
\t\t\t\tatomic.AddInt64(&counter, 1)
\t\t\t}
\t\t}()
\t}
\twg.Wait()
\tfmt.Println(atomic.LoadInt64(&counter))
}
\`\`\``,
        options: [
          'Some value less than 1000 due to lost updates.',
          'Exactly 1000.',
          '100.',
          'panic: race detected.',
        ],
        correctIndex: 1,
        explanation: 'Atomic operations are race-free by construction. Every `AddInt64` is an atomic read-modify-write, so 10 goroutines × 100 increments = exactly 1000. Use `atomic.LoadInt64` to read atomically — a plain read can race with a concurrent `AddInt64`. Go 1.19+ also offers typed wrappers like `atomic.Int64` which avoid the pointer-juggling. See [pkg.go.dev/sync/atomic](https://pkg.go.dev/sync/atomic).',
      },
      {
        kind: 'mcq',
        id: 'go-5-mcq-5',
        prompt: `Why does this program deadlock?

\`\`\`go
package main

import "sync"

func main() {
\tvar mu sync.Mutex
\tmu.Lock()
\tmu.Lock()  // <- here
}
\`\`\``,
        options: [
          '`sync.Mutex` is not reentrant in Go — the second Lock blocks waiting for the first to be released.',
          'Mutexes must be initialised with `sync.NewMutex()`.',
          'Locking on the main goroutine is forbidden.',
          'The lock implicitly releases at the end of the function.',
        ],
        correctIndex: 0,
        explanation: 'Go mutexes are explicitly **not reentrant**. Locking the same `sync.Mutex` twice on the same goroutine deadlocks. The same trap appears in recursive helpers that lock and then call into themselves. Either restructure to avoid re-entry, split into a public locked method and a private unlocked one, or use `sync.RWMutex` with read locks. See [pkg.go.dev/sync#Mutex](https://pkg.go.dev/sync#Mutex).',
      },
      {
        kind: 'mcq',
        id: 'go-5-mcq-6',
        prompt: `What does \`errgroup.WithContext\` provide that a plain \`sync.WaitGroup\` does not?

\`\`\`go
g, ctx := errgroup.WithContext(parent)
for _, url := range urls {
\turl := url
\tg.Go(func() error {
\t\treturn fetch(ctx, url)
\t})
}
err := g.Wait()
\`\`\``,
        options: [
          'It runs goroutines on a separate OS thread pool.',
          'It collects the first non-nil error returned by any `g.Go`, cancels the derived context to signal siblings, and propagates that error from `g.Wait`.',
          'It limits the number of concurrent goroutines automatically.',
          'It bypasses the Go scheduler for lower latency.',
        ],
        correctIndex: 1,
        explanation: '`errgroup.Group` wraps a `WaitGroup` with error propagation. On the first non-nil error, it cancels the context returned by `WithContext`, signalling siblings to abandon work. `Wait` returns that first error. Use `g.SetLimit(n)` to cap concurrency. See [pkg.go.dev/golang.org/x/sync/errgroup](https://pkg.go.dev/golang.org/x/sync/errgroup).',
      },
      {
        kind: 'mcq',
        id: 'go-5-mcq-debug-1',
        prompt: `**Production symptom:** \`go test -race ./...\` in CI produces the following output. The test passes without \`-race\`. What does the report mean and what is the fix?

\`\`\`
==================
WARNING: DATA RACE
Write at 0x00c000126010 by goroutine 8:
  main.(*Stats).Record()
      /app/stats/stats.go:22 +0x44
Previous read at 0x00c000126010 by goroutine 7:
  main.(*Stats).Total()
      /app/stats/stats.go:30 +0x38
==================

\`\`\`

\`\`\`go
package main

import "sync"

type Stats struct {
\tmu    sync.Mutex
\tcount int
\ttotal int64
}

func (s *Stats) Record(v int) {
\ts.mu.Lock()
\ts.count++
\ts.total += int64(v)
\ts.mu.Unlock()
}

func (s *Stats) Total() int64 {
\treturn s.total // missing lock!
}
\`\`\``,
        options: [
          'The race detector has a false positive; `-race` is unreliable for struct field access.',
          '`Total()` reads `s.total` without holding `s.mu`, while `Record()` writes it under the lock; the concurrent unsynchronised read is a data race.',
          'The `sync.Mutex` must be a pointer (`*sync.Mutex`) to prevent the race.',
          '`int64` reads are atomic on 64-bit platforms, so no lock is needed in `Total()`.',
        ],
        correctIndex: 1,
        explanation: '`Record` writes `s.total` under `s.mu`, but `Total` reads `s.total` without acquiring the lock. The Go memory model does not guarantee visibility of the write to the read without synchronisation, even on 64-bit platforms. The race detector instruments memory accesses and flags this correctly. Fix: acquire `s.mu.Lock()` in `Total()` before reading. Alternatively, use `sync/atomic` consistently for both read and write. See [Introducing the Go Race Detector](https://go.dev/blog/race-detector).',
      },
      {
        kind: 'mcq',
        id: 'go-5-mcq-debug-2',
        prompt: `**Production symptom:** Service deadlocks under moderate load. The goroutine dump (via SIGQUIT) shows:

\`\`\`
goroutine 14 [semacquire]:
sync.(*Mutex).Lock(...)
        /usr/local/go/src/sync/mutex.go:81
main.(*Broker).Publish(...)
        /app/broker/broker.go:35
\`\`\`
\`\`\`
goroutine 9 [chan send]:
main.(*Broker).dispatch(...)
        /app/broker/broker.go:51
\`\`\`

\`\`\`go
package main

type Broker struct {
\tmu   sync.Mutex
\tsubs []chan string
}

func (b *Broker) Subscribe() chan string {
\tch := make(chan string, 1)
\tb.mu.Lock()
\tdefer b.mu.Unlock()
\tb.subs = append(b.subs, ch)
\treturn ch
}

func (b *Broker) Publish(msg string) {
\tb.mu.Lock()
\tdefer b.mu.Unlock()
\tfor _, ch := range b.subs {
\t\tch <- msg // blocks if subscriber is slow — lock held!
\t}
}
\`\`\``,
        options: [
          'The `defer b.mu.Unlock()` in `Publish` fires too late and never releases the lock.',
          '`Publish` holds `b.mu` while sending to subscriber channels; if a subscriber\'s goroutine calls `Subscribe` (or any method that acquires `b.mu`) before draining its channel, both goroutines deadlock.',
          'Buffered channels of size 1 cannot be used with a mutex.',
          '`defer` inside a `for` loop does not execute until the loop exits, causing the lock to be held too long.',
        ],
        correctIndex: 1,
        explanation: '`Publish` holds `b.mu` during channel sends. If the subscriber channel is full (slow consumer) or if the consuming goroutine itself tries to call `Subscribe` or `Publish`, it will attempt to acquire `b.mu` — which is already held — causing a deadlock. Fix: copy the subscriber slice while holding the lock, then release the lock before sending: `b.mu.Lock(); subs := append([]chan string(nil), b.subs...); b.mu.Unlock(); for _, ch := range subs { ch <- msg }`. See [pkg.go.dev/sync#Mutex](https://pkg.go.dev/sync#Mutex).',
      },
      {
        kind: 'mcq',
        id: 'go-5-mcq-debug-3',
        prompt: `**Production symptom:** \`go test -race ./...\` reports a race on a loop variable. The test only fails intermittently in CI with \`-race\` enabled.

\`\`\`
WARNING: DATA RACE
Read at 0x00c0001b4018 by goroutine 12:
  main_test.TestWorkers.func1.1()
      /app/workers_test.go:24
Previous write at 0x00c0001b4018 by goroutine 1:
  main_test.TestWorkers()
      /app/workers_test.go:19
\`\`\`

\`\`\`go
func TestWorkers(t *testing.T) {
\tinputs := []int{1, 2, 3, 4, 5}
\tvar wg sync.WaitGroup
\tfor _, v := range inputs {       // line 19 — v is the shared variable
\t\twg.Add(1)
\t\tgo func() {                  // captures v by reference
\t\t\tdefer wg.Done()
\t\t\tprocess(v)               // line 24 — races with loop update
\t\t}()
\t}
\twg.Wait()
}
\`\`\``,
        options: [
          'The race is caused by `wg.Add(1)` being called outside the goroutine.',
          'The goroutine closure captures `v` by reference; the loop updates `v` before the goroutine reads it, creating a data race between the loop\'s write and the goroutine\'s read.',
          '`sync.WaitGroup` is not safe for concurrent use inside a `for` loop.',
          '`process(v)` must be called with `go process(v)` instead of inside an anonymous function.',
        ],
        correctIndex: 1,
        explanation: 'Before Go 1.22, the loop variable `v` is a single variable reused across iterations. The goroutine closure captures the address of `v`; by the time the goroutine runs, the loop may have already advanced `v` to the next value. This is both a logical bug (wrong value) and a data race (concurrent read in goroutine, write in loop). Fix (pre-1.22): add `v := v` inside the loop before the `go` statement. Go 1.22+ creates a new `v` per iteration, eliminating the race. See [Introducing the Go Race Detector](https://go.dev/blog/race-detector).',
      },
      {
        kind: 'code',
        id: 'go-5-code-1',
        prompt: 'Use a `sync.Mutex` to implement a thread-safe increment operation on a counter.',
        boilerplate: 'package main\n\nimport (\n\t"fmt"\n\t"sync"\n)\n\ntype SafeCounter struct {\n\tmu sync.Mutex\n\tv  int\n}\n\nfunc (c *SafeCounter) Inc() {\n\t// TODO: Lock the mutex, increment c.v, and unlock the mutex (use defer or manual calls)\n\tc.mu.Lock()\n\tdefer c.mu.Unlock()\n\tc.v++\n}\n\nfunc (c *SafeCounter) Value() int {\n\tc.mu.Lock()\n\tdefer c.mu.Unlock()\n\treturn c.v\n}\n\nfunc main() {\n\tc := SafeCounter{}\n\tvar wg sync.WaitGroup\n\tfor i := 0; i < 100; i++ {\n\t\twg.Add(1)\n\t\tgo func() {\n\t\t\tdefer wg.Done()\n\t\t\tc.Inc()\n\t\t}()\n\t}\n\twg.Wait()\n\tfmt.Println("Counter:", c.Value())\n}\n',
        expectedOutput: 'Counter: 100',
        explanation: 'A `sync.Mutex` provides mutual exclusion lock capabilities. By locking before writing to shared state and unlocking afterwards (typically deferred), we prevent data races.'
      }
    ],
  },

  {
    id: 'go-6',
    language: 'go',
    level: 6,
    title: 'Generics — Type Parameters, Constraints, and Type Inference',
    timeEstimate: '5-7 hours',
    intro: `By the end of this phase, you'll read generic Go code and predict whether it compiles, what types are inferred, and when to reach for an interface instead. Topics in depth: type parameter syntax, the difference between \`any\` / \`comparable\` / \`cmp.Ordered\`, union constraints with the \`~T\` tilde (underlying-type) operator, generic structs and methods, and the \`slices\` and \`maps\` packages added in Go 1.21+.

To build the muscle, you'll write locally: a generic \`Set[T comparable]\` container with \`Add\`, \`Has\`, \`Remove\`, \`Union\`, and a CLI demo. Use \`slices.Sorted(maps.Keys(s))\` (Go 1.23+) to emit deterministic output.`,
    topics: [
      { label: 'An Introduction to Generics', url: 'https://go.dev/blog/intro-generics', note: 'Official blog: type parameters, constraints, type sets' },
      { label: 'Tutorial: Getting started with generics', url: 'https://go.dev/doc/tutorial/generics', note: 'Step-by-step walkthrough' },
      { label: 'pkg cmp', url: 'https://pkg.go.dev/cmp', note: 'cmp.Ordered, cmp.Compare, cmp.Less (Go 1.21+)' },
      { label: 'Go Specification — Type parameter declarations', url: 'https://go.dev/ref/spec#Type_parameter_declarations', note: 'Formal spec for type parameters' },
      { label: 'When To Use Generics', url: 'https://go.dev/blog/when-generics', note: 'Official guidance on appropriate generic use' },
      { label: 'pkg slices', url: 'https://pkg.go.dev/slices', note: 'Generic slice helpers added in Go 1.21+' },
      { label: 'pkg maps', url: 'https://pkg.go.dev/maps', note: 'Generic map helpers added in Go 1.21+' },
    ],
    deliverable: 'Build locally: a generic `Set[T comparable]` container with Add/Has/Remove/Union and a CLI demo.',
    checks: [
      {
        kind: 'mcq',
        id: 'go-6-mcq-1',
        prompt: 'What does the constraint `comparable` mean in Go generics?',
        options: [
          'Values can be compared with < and > operators.',
          'Values support == and != operators and can be used as map keys.',
          'Values implement the Comparable interface from reflect.',
          'Values have a Compare method returning -1, 0, or 1.',
        ],
        correctIndex: 1,
        explanation: '`comparable` is a built-in constraint that includes all types that support `==` and `!=`. This is necessary to use a type parameter as a map key. Note: `comparable` does **not** include ordering — for `<`/`>` use `cmp.Ordered` (Go 1.21+). Slices, maps, and functions are not comparable. See [pkg.go.dev/cmp](https://pkg.go.dev/cmp).',
      },
      {
        kind: 'mcq',
        id: 'go-6-mcq-2',
        prompt: 'When should you prefer an interface parameter over a type parameter in Go?',
        options: [
          'Never — type parameters are always more efficient.',
          'When the function needs to handle a heterogeneous collection of different concrete types at runtime.',
          'When you need to call methods that return the type parameter itself.',
          'When performance is not a concern.',
        ],
        correctIndex: 1,
        explanation: 'If you need to store values of different types together at runtime (e.g., `[]Animal` holding both `Dog` and `Cat`), an interface is the right tool. Generics are instantiated per type at compile time, so a `[]T` is a homogeneous slice. Rob Pike\'s rule: write the code with a regular type first; only introduce a type parameter when you actually have multiple call sites at multiple types. See [When To Use Generics](https://go.dev/blog/when-generics).',
      },
      {
        kind: 'mcq',
        id: 'go-6-mcq-3',
        prompt: `What does this program print?

\`\`\`go
package main

import "fmt"

func Filter[T any](s []T, pred func(T) bool) []T {
\tvar out []T
\tfor _, v := range s {
\t\tif pred(v) {
\t\t\tout = append(out, v)
\t\t}
\t}
\treturn out
}

func main() {
\tnums := []int{1, 2, 3, 4, 5, 6}
\teven := Filter(nums, func(n int) bool { return n%2 == 0 })
\tfmt.Println(even)
}
\`\`\``,
        options: [
          '[1 3 5]',
          '[2 4 6]',
          '[]',
          'Compile error: type argument required.',
        ],
        correctIndex: 1,
        explanation: 'Type inference deduces `T = int` from the slice argument, so the explicit `Filter[int](...)` is unnecessary. The predicate keeps even numbers, producing `[2 4 6]`. Go 1.21+ ships `slices.DeleteFunc` and friends that solve common filtering patterns without rolling your own. See [pkg.go.dev/slices](https://pkg.go.dev/slices).',
      },
      {
        kind: 'mcq',
        id: 'go-6-mcq-4',
        prompt: `What does this program print?

\`\`\`go
package main

import "fmt"

type Number interface {
\t~int | ~float64
}

func Sum[T Number](xs []T) T {
\tvar total T
\tfor _, x := range xs {
\t\ttotal += x
\t}
\treturn total
}

type Celsius float64

func main() {
\ttemps := []Celsius{20.5, 21.0, 19.5}
\tfmt.Println(Sum(temps))
}
\`\`\``,
        options: [
          'Compile error: Celsius is not in the type set of Number.',
          '61',
          'Compile error: cannot use float64 method set.',
          '20.5 21 19.5',
        ],
        correctIndex: 1,
        explanation: 'The tilde `~float64` in the union means "any type whose underlying type is `float64`", so `Celsius` (defined as `type Celsius float64`) satisfies `Number`. Sum returns `61` (a `Celsius`, which prints as a number). Without `~`, you would have to convert. This is what lets generic functions work cleanly with strongly-typed domain wrappers. See [An Introduction to Generics](https://go.dev/blog/intro-generics).',
      },
      {
        kind: 'mcq',
        id: 'go-6-mcq-5',
        prompt: `What does this program print?

\`\`\`go
package main

import "fmt"

type Stack[T any] struct {
\titems []T
}

func (s *Stack[T]) Push(v T) {
\ts.items = append(s.items, v)
}

func (s *Stack[T]) Pop() (T, bool) {
\tvar zero T
\tif len(s.items) == 0 {
\t\treturn zero, false
\t}
\tn := len(s.items) - 1
\tv := s.items[n]
\ts.items = s.items[:n]
\treturn v, true
}

func main() {
\ts := &Stack[string]{}
\ts.Push("a")
\ts.Push("b")
\tv, _ := s.Pop()
\tfmt.Println(v)
}
\`\`\``,
        options: [
          'a',
          'b',
          '',
          'Compile error: cannot instantiate generic struct.',
        ],
        correctIndex: 1,
        explanation: 'A stack is LIFO. After `Push("a"); Push("b")`, the slice is `["a","b"]`. `Pop` removes the last element, returning `"b"`. Returning `var zero T` (the type-parameter zero value) is the idiomatic way to handle empty containers in generic code — there is no `nil` for a generic `T`.',
      },
      {
        kind: 'mcq',
        id: 'go-6-mcq-6',
        prompt: `Why does this code fail to compile?

\`\`\`go
package main

func Max[T any](a, b T) T {
\tif a > b {
\t\treturn a
\t}
\treturn b
}

func main() {
\t_ = Max(1, 2)
}
\`\`\``,
        options: [
          '`any` is not a valid constraint.',
          'The constraint `any` does not permit the `>` operator; use `cmp.Ordered` instead.',
          '`Max` cannot be called with constant arguments.',
          'Generic functions must specify type arguments explicitly.',
        ],
        correctIndex: 1,
        explanation: 'Type-parameter operations are restricted to those supported by *every* type in the constraint. `any` allows every type, including those without ordering, so `>` is rejected. Use `cmp.Ordered` (Go 1.21+) or a union like `~int | ~float64 | ~string`. The standard library already provides `max` and `min` as built-ins since Go 1.21. See [pkg.go.dev/cmp#Ordered](https://pkg.go.dev/cmp#Ordered).',
      },
      {
        kind: 'mcq',
        id: 'go-6-mcq-debug-1',
        prompt: `**Production symptom:** The CI build pipeline fails at 09:14 UTC with a compile error after a developer added a generic registry for serialisable assets. No binary is produced and the deploy is blocked.

\`\`\`
$ go build ./...
# github.com/acme/platform/pkg/registry
pkg/registry/registry.go:28:14: string does not implement Serializable (missing method Bytes() []byte)
pkg/registry/registry.go:29:12: string does not implement Serializable (missing method Bytes() []byte)
\`\`\`

\`\`\`go
// pkg/registry/registry.go
package registry

import (
\t"fmt"
\t"log/slog"
)

// Serializable is the constraint for all items stored in the registry.
// Every asset type must be able to serialise itself for the cache layer.
type Serializable interface {
\tBytes() []byte
\tContentType() string
}

// Registry stores and retrieves Serializable assets by key.
type Registry[T Serializable] struct {
\titems map[string]T
\tlogger *slog.Logger
}

func New[T Serializable](logger *slog.Logger) *Registry[T] {
\treturn &Registry[T]{items: make(map[string]T), logger: logger}
}

func (r *Registry[T]) Add(key string, item T) {
\tr.logger.Info("registry: add", "key", key, "bytes", len(item.Bytes()))
\tr.items[key] = item
}

func (r *Registry[T]) Get(key string) (T, bool) {
\tv, ok := r.items[key]
\treturn v, ok
}

// main.go — integration wiring (line 28 is where the error fires)
func Example() {
\treg := New[string](slog.Default()) // line 28 — string has no Bytes() or ContentType()
\treg.Add("greeting", "hello")       // line 29
\tfmt.Println(reg)
}
\`\`\``,
        options: [
          'Generic structs cannot be instantiated with built-in types like `string`.',
          '`string` does not have a `Bytes() []byte` method so it does not satisfy the `Serializable` constraint; the type argument is invalid.',
          'The `Registry` struct must use `any` as its constraint to accept `string`.',
          'The `Add` method must accept `any` instead of `T` to work with `string`.',
        ],
        correctIndex: 1,
        explanation: 'The type constraint `Serializable` requires a `Bytes() []byte` method. The built-in `string` type has no such method, so `Registry[string]` violates the constraint and fails to compile. Fix options: (1) use a custom type `type MyString string` with a `Bytes()` method; (2) relax the constraint to `interface{ ~string | Serializable }` if you need both; or (3) redesign so the registry holds `Serializable` interface values directly. See [An Introduction to Generics](https://go.dev/blog/intro-generics).',
      },
      {
        kind: 'mcq',
        id: 'go-6-mcq-debug-2',
        prompt: `**Production symptom:** A developer introduces a generic zero-value factory used in config initialisation. The build fails immediately in CI with a type-inference error.

\`\`\`
$ go build ./pkg/config/...
# github.com/acme/platform/pkg/config
pkg/config/defaults.go:47:19: cannot infer T
pkg/config/defaults.go:48:21: cannot infer T
\`\`\`

\`\`\`go
// pkg/config/defaults.go
package config

import (
\t"log/slog"
\t"time"
)

// Pair holds two zero values of the same type, used for default range bounds.
type Pair[T any] struct {
\tLow, High T
}

// MakeZeroPair returns a Pair where both fields are the zero value for T.
// T appears only in the return type — the compiler has nothing to infer from.
func MakeZeroPair[T any]() Pair[T] {
\tvar zero T
\treturn Pair[T]{Low: zero, High: zero}
}

// DefaultRanges builds the default numeric and duration config ranges.
func DefaultRanges(logger *slog.Logger) {
\t// Lines 47-48: no argument supplied, so T cannot be inferred
\tintRange := MakeZeroPair()           // line 47 — cannot infer T
\tdurRange := MakeZeroPair()           // line 48 — cannot infer T

\tlogger.Info("defaults",
\t\t"int_low", intRange.Low,
\t\t"dur_low", durRange.Low,
\t\t"dur_high", durRange.High,
\t\t"ts", time.Now(),
\t)
}
\`\`\``,
        options: [
          'Generic functions cannot return generic structs.',
          'Type inference requires at least one function argument whose type involves `T`; since `MakePair` takes no arguments, the compiler cannot deduce `T` and the call must supply it explicitly: `MakePair[int]()`.',
          'The `Pair` struct must be defined in the same file as `MakePair` for inference to work.',
          '`var zero T` is not valid inside a generic function; use `*new(T)` instead.',
        ],
        correctIndex: 1,
        explanation: 'Go\'s type inference deduces type arguments from the types of the actual function arguments. When a generic function has no parameters involving `T`, there is nothing to infer from — you must supply the type argument explicitly: `MakePair[int]()`. This is a common surprise when writing factory or constructor generics. If you want a zero-value factory, the explicit call `MakePair[int]()` is idiomatic. See [Tutorial: Getting started with generics](https://go.dev/doc/tutorial/generics).',
      },
      {
        kind: 'mcq',
        id: 'go-6-mcq-debug-3',
        prompt: `**Production symptom:** A backend engineer adds a generic transform helper to the billing service pipeline. The build fails in CI 30 minutes before a scheduled deploy.

\`\`\`
$ go build ./internal/billing/...
# github.com/acme/platform/internal/billing
internal/billing/pipeline.go:52:22: cannot use userIDs (variable of type []UserID) as []int value in argument to transform.Map:
        cannot use userIDs (variable of type []UserID) as type []int
\`\`\`

\`\`\`go
// internal/billing/types.go
package billing

// UserID is a named type wrapping int to prevent accidental mixing with other IDs.
type UserID int

// InvoiceID is a named type for invoice references.
type InvoiceID int64

// pkg/transform/map.go
package transform

// Map applies f to every element of s and returns the results.
// T and U are inferred from the slice and function arguments.
func Map[T, U any](s []T, f func(T) U) []U {
\tout := make([]U, len(s))
\tfor i, v := range s {
\t\tout[i] = f(v)
\t}
\treturn out
}

// internal/billing/pipeline.go
package billing

import (
\t"fmt"
\t"log/slog"

\t"github.com/acme/platform/pkg/transform"
)

// doubleRaw operates on the raw underlying int, not on UserID.
func doubleRaw(n int) int { return n * 2 }

// BuildPipeline demonstrates the type-mismatch compilation failure.
func BuildPipeline(logger *slog.Logger) {
\tuserIDs := []UserID{101, 202, 303} // type is []UserID

\t// line 52: Map infers T=UserID from userIDs,
\t// but doubleRaw has signature func(int) int — UserID != int
\tresult := transform.Map(userIDs, doubleRaw) // compile error here
\tlogger.Info("pipeline result", "values", fmt.Sprint(result))
}
\`\`\``,
        options: [
          '`Map` does not support named types; only built-in types can be used as `T`.',
          'Type inference sets `T = UserID` from `userIDs`, but `double` has signature `func(int) int` — `UserID` and `int` are distinct types, so the function literal type does not match `func(T) U`.',
          'The `~int` tilde operator must be used in the `Map` constraint to accept `UserID`.',
          '`Map` requires both `T` and `U` to be specified explicitly when using named types.',
        ],
        correctIndex: 1,
        explanation: 'Go infers `T = UserID` from the slice argument. That makes the expected function type `func(UserID) U`, but `double` is `func(int) int`. `UserID` and `int` are different types — named types are not implicitly convertible to their underlying type in function signatures. Fix: pass an adapter `func(id UserID) int { return double(int(id)) }`, or change `double` to accept `UserID`. The `~int` constraint on `T` would allow `UserID` as a constraint, but does not change function signature compatibility. See [An Introduction to Generics](https://go.dev/blog/intro-generics).',
      },
      {
        kind: 'code',
        id: 'go-6-code-1',
        prompt: 'Implement a generic `Contains` function that returns true if a slice contains a given value. Constrain the type parameter with `comparable`.',
        boilerplate: 'package main\n\nimport "fmt"\n\n// TODO: Implement the generic Contains function\nfunc Contains[T comparable](slice []T, val T) bool {\n\tfor _, v := range slice {\n\t\tif v == val {\n\t\t\treturn true\n\t\t}\n\t}\n\treturn false\n}\n\nfunc main() {\n\tintSlice := []int{1, 2, 3, 4, 5}\n\tfmt.Println("Contains 3:", Contains(intSlice, 3))\n\tfmt.Println("Contains 6:", Contains(intSlice, 6))\n}\n',
        expectedOutput: 'Contains 3: true\nContains 6: false',
        explanation: 'Generics allow writing functions that work with multiple types. The built-in `comparable` constraint is required when using comparison operators like `==` on a generic type.'
      }
    ],
  },

  {
    id: 'go-7',
    language: 'go',
    level: 7,
    title: 'Reflection, go generate, and AST Manipulation',
    timeEstimate: '6-8 hours',
    intro: `By the end of this phase, you'll read reflection-heavy code and predict whether \`reflect.Value.Set\` will panic, how to walk struct fields safely, and when \`go generate\` is the right tool over runtime reflection. Topics in depth: \`reflect.Type\` vs \`reflect.Kind\`, the addressability/settability rules of \`reflect.Value\`, struct tag introspection, \`//go:generate\` directives, and using \`go/ast\` + \`go/parser\` + \`go/format\` to scaffold a generator.

To build the muscle, you'll write locally: a \`go:generate\`-driven enum-stringer style code generator, invoked via \`go generate ./...\`. Read the source of \`stringer\` for a reference implementation.`,
    topics: [
      { label: 'reflect package', url: 'https://pkg.go.dev/reflect', note: 'Value, Type, Kind, StructField, MethodByName' },
      { label: 'The Laws of Reflection', url: 'https://go.dev/blog/laws-of-reflection', note: 'Official blog: three laws, interfaces, settability' },
      { label: 'go generate command', url: 'https://go.dev/blog/generate', note: 'How and when to use go:generate directives' },
      { label: 'go/ast package', url: 'https://pkg.go.dev/go/ast', note: 'AST node types, File, Decl, Stmt, Expr' },
      { label: 'go/parser package', url: 'https://pkg.go.dev/go/parser', note: 'ParseFile, ParseDir, modes' },
      { label: 'stringer tool', url: 'https://pkg.go.dev/golang.org/x/tools/cmd/stringer', note: 'Canonical go:generate example — auto String() for enums' },
      { label: 'go/format package', url: 'https://pkg.go.dev/go/format', note: 'Pretty-print generated Go source via format.Source' },
    ],
    deliverable: 'Build locally: a `go:generate` driven enum-stringer style code generator, runs `go generate ./...`.',
    checks: [
      {
        kind: 'mcq',
        id: 'go-7-mcq-1',
        prompt: 'What does `reflect.Value.CanSet()` return false for, and why?',
        options: [
          'Interface values, because interfaces are abstract types.',
          'Values obtained via a non-addressable expression (e.g., not from a pointer), which cannot be modified in place.',
          'Values of unexported struct fields, regardless of addressability.',
          'Both B and C.',
        ],
        correctIndex: 3,
        explanation: '`CanSet` returns false when the Value is not addressable (you must pass a pointer and call `.Elem()`) AND for unexported fields even on addressable structs. Both conditions must be met for a field to be settable. This is why JSON-style unmarshallers always work via pointers to structs and skip lowercase fields. See [The Laws of Reflection](https://go.dev/blog/laws-of-reflection).',
      },
      {
        kind: 'mcq',
        id: 'go-7-mcq-2',
        prompt: 'What is the primary purpose of `//go:generate` directives?',
        options: [
          'To inline code at the call site, similar to C macros.',
          'To document which external commands produce generated files, run explicitly by the developer via `go generate`.',
          'To trigger automatic code generation during `go build`.',
          'To annotate functions that the compiler can auto-optimise.',
        ],
        correctIndex: 1,
        explanation: '`go generate` is NOT part of `go build`. It is a separate command that reads `//go:generate` directives and runs the specified tool. Developers run it deliberately when they need to regenerate code — typically committed to the repo so CI does not need the generator toolchain. See [go generate](https://go.dev/blog/generate).',
      },
      {
        kind: 'mcq',
        id: 'go-7-mcq-3',
        prompt: `What does this program print?

\`\`\`go
package main

import (
\t"fmt"
\t"reflect"
)

func main() {
\tvar x float64 = 3.14
\ts := []int{1, 2, 3}

\ttx := reflect.TypeOf(x)
\tts := reflect.TypeOf(s)

\tfmt.Println(tx.Name(), tx.Kind())
\tfmt.Println(ts.Name(), ts.Kind())
}
\`\`\``,
        options: [
          'float64 float64\\n[]int slice',
          'float64 float64\\n slice',
          'float64 float\\nint slice',
          'panic: reflect: cannot extract kind',
        ],
        correctIndex: 1,
        explanation: '`reflect.Type.Name()` returns the declared name of a *named* type. `[]int` has no name (it is a composite type), so `Name()` returns the empty string — but `Kind()` is `slice`. For the full type representation use `t.String()`, which prints `[]int`. This Name-vs-String distinction trips up generic reflection helpers constantly. See [pkg.go.dev/reflect#Type](https://pkg.go.dev/reflect#Type).',
      },
      {
        kind: 'mcq',
        id: 'go-7-mcq-4',
        prompt: `What does this program print?

\`\`\`go
package main

import (
\t"fmt"
\t"reflect"
)

type Config struct {
\tHost  string
\tPort  int
\tdebug bool
}

func main() {
\tcfg := Config{Host: "localhost", Port: 8080, debug: true}
\tt := reflect.TypeOf(cfg)
\tv := reflect.ValueOf(cfg)
\tfor i := 0; i < t.NumField(); i++ {
\t\tf := t.Field(i)
\t\tif f.IsExported() {
\t\t\tfmt.Printf("%s=%v\\n", f.Name, v.Field(i).Interface())
\t\t}
\t}
}
\`\`\``,
        options: [
          'Host=localhost\\nPort=8080\\ndebug=true',
          'Host=localhost\\nPort=8080',
          'panic: cannot read unexported field',
          'Host=localhost',
        ],
        correctIndex: 1,
        explanation: '`StructField.IsExported()` (Go 1.17+) is the canonical way to skip unexported fields. `debug` (lowercase) is unexported, so it is filtered out. Calling `v.Field(i).Interface()` on an unexported field would panic — guard with `IsExported`. This is the same pattern every JSON/YAML library uses internally. See [pkg.go.dev/reflect#StructField](https://pkg.go.dev/reflect#StructField).',
      },
      {
        kind: 'mcq',
        id: 'go-7-mcq-5',
        prompt: `Why is reflection considered slow, and what is the idiomatic workaround?

\`\`\`go
v := reflect.ValueOf(x)
field := v.FieldByName("Name")
\`\`\``,
        options: [
          'Reflection is slow because it allocates a goroutine per call; use channels instead.',
          'Reflection performs dynamic dispatch, type-table lookups, and bounds checks at runtime; cache reflect.Type values and field indices outside hot loops, or use code generation when applicable.',
          'Reflection is no slower than direct access; the perception is a myth.',
          'Reflection is slow because it uses the cgo bridge.',
        ],
        correctIndex: 1,
        explanation: 'Reflective access pays for runtime type lookup and validation each call. The fix in serialisation libraries (e.g., `encoding/json`) is to cache `reflect.Type` and field indices per type. When the schema is known at build time, prefer code generation via `go generate` — that is the whole point of tools like `stringer`. See [The Laws of Reflection](https://go.dev/blog/laws-of-reflection).',
      },
      {
        kind: 'mcq',
        id: 'go-7-mcq-6',
        prompt: `What is the role of \`format.Source\` when writing a code generator?

\`\`\`go
src := []byte(buf.String())
formatted, err := format.Source(src)
\`\`\``,
        options: [
          'It validates that the source compiles successfully.',
          'It runs gofmt-style formatting on the generated bytes, so the output is consistently indented and parses cleanly — failing fast with a helpful error if your generator emitted malformed Go.',
          'It minifies the source to reduce binary size.',
          'It signs the source for integrity verification.',
        ],
        correctIndex: 1,
        explanation: '`go/format.Source` applies `gofmt` to a source byte slice. Generators routinely emit slightly-imperfect whitespace; piping through `format.Source` produces idiomatic output and surfaces syntax errors immediately. If `format.Source` errors, your template emitted invalid Go — fix the template, not the output. See [pkg.go.dev/go/format](https://pkg.go.dev/go/format).',
      },
      {
        kind: 'mcq',
        id: 'go-7-mcq-debug-1',
        prompt: `**Production symptom:** At 14:32 UTC, p99 latency on the orders API spikes as clients start receiving malformed status strings. Datadog logs show \`status="Status(4)"\` in order events. Values 0–3 display correctly. The spike correlates with a deploy 10 minutes earlier that added a new order state.

\`\`\`
# Excerpt from Datadog log stream (14:32:07 UTC)
{"level":"error","service":"orders","msg":"invalid order status","order_id":"ord_9kQx2","status":"Status(4)","customer_id":"cus_7Rm1p"}
{"level":"error","service":"orders","msg":"invalid order status","order_id":"ord_3nWv8","status":"Status(4)","customer_id":"cus_2Ks4q"}
\`\`\`

\`\`\`go
// internal/orders/status.go
package orders

//go:generate stringer -type=Status -output=status_string.go
type Status int

const (
\tActive   Status = 0
\tInactive Status = 1
\tDeleted  Status = 2
\tArchived Status = 3
\tPending  Status = 4 // added in this deploy — go generate was NOT re-run
)

// MarshalJSON serialises the status as a lowercase string for the API.
func (s Status) MarshalJSON() ([]byte, error) {
\t// String() falls back to "Status(4)" when the generated switch has no case for 4
\treturn []byte(\`"\` + s.String() + \`"\`), nil
}

// internal/orders/status_string.go  (STALE — last generated before Pending existed)
// Code generated by "stringer -type=Status"; DO NOT EDIT.
// func (i Status) String() string {
//   switch i {
//   case Active:   return "Active"
//   case Inactive: return "Inactive"
//   case Deleted:  return "Deleted"
//   case Archived: return "Archived"
//   default:       return "Status(" + strconv.FormatInt(int64(i), 10) + ")"
//   }
// }
\`\`\``,
        options: [
          'The `stringer` tool does not support `iota`-based constants beyond value 3.',
          'The `status_string.go` file is stale — `go generate` was not re-run after adding `Pending`, so the generated `String()` method has no case for value 4 and falls back to `"Status(4)"`.',
          'The `//go:generate` directive must be placed directly above each constant, not above the type declaration.',
          'Adding constants to an existing type requires deleting and regenerating the entire `go.mod`.',
        ],
        correctIndex: 1,
        explanation: '`go generate` is not run automatically by `go build` — it is a manual step. When you add `Pending Status = 4` but forget to run `go generate ./...`, the `status_string.go` file is stale and the auto-generated `String()` method has no case for 4, causing it to fall back to the default `fmt.Sprintf("Status(%d)", i)`. Fix: run `go generate ./...` and commit the updated `status_string.go`. CI should verify the generated file is up to date (e.g., regenerate and `git diff --exit-code`). See [go generate](https://go.dev/blog/generate).',
      },
      {
        kind: 'mcq',
        id: 'go-7-mcq-debug-2',
        prompt: `**Production symptom:** The admin API endpoint begins returning HTTP 500 at 09:47 UTC. PagerDuty fires P2. Regular user endpoints are unaffected. Sentry captures the following panic from \`/app/internal/serialise/mapper.go\`.

\`\`\`
goroutine 47 [running]:
runtime/debug.Stack()
        /usr/local/go/src/runtime/debug/stack.go:24 +0x5b
main.recoverMiddleware.func1.1()
        /app/internal/middleware/recover.go:18 +0x6c
panic(0x10a3e40, 0xc0002b4180)

reflect.Value.Interface(...)
        /usr/local/go/src/reflect/value.go:1391 +0x13e
main.toMap({0x10a1200, 0xc0002b4000})
        /app/internal/serialise/mapper.go:29 +0x1c8
main.(*AdminHandler).ServeHTTP(0xc000294000, {0x10d3a40, 0xc000190000}, 0xc0001c4000)
        /app/internal/handlers/admin.go:54 +0x3f1

panic: reflect.Value.Interface: cannot return value obtained from unexported field or method
\`\`\`

\`\`\`go
// internal/serialise/mapper.go
package serialise

import (
\t"reflect"
)

// AdminPayload carries admin-action data; secret is intentionally unexported.
type AdminPayload struct {
\tUserID    int    \`json:"user_id"\`
\tAction    string \`json:"action"\`
\tRequestID string \`json:"request_id"\`
\tsecret    string // unexported — holds ephemeral auth token, never serialised
}

// ToMap converts any struct to a map[string]any for audit logging.
// It is called for every admin action in handlers/admin.go:54.
func ToMap(v any) map[string]any {
\tout := map[string]any{}
\trv := reflect.ValueOf(v)
\trt := reflect.TypeOf(v)
\tfor i := 0; i < rv.NumField(); i++ {
\t\t// BUG: no IsExported() guard — panics when field is unexported
\t\tout[rt.Field(i).Name] = rv.Field(i).Interface() // line 29: panics on 'secret'
\t}
\treturn out
}
\`\`\``,
        options: [
          'Calling `.Interface()` on any `reflect.Value` obtained from a struct always panics; use `.String()` instead.',
          'Calling `.Interface()` on a `reflect.Value` for an unexported field panics; guard with `rt.Field(i).IsExported()` and skip or handle unexported fields.',
          'The `AdminPayload` struct must embed `reflect.Value` to be introspectable.',
          'Unexported fields must be accessed via a pointer receiver, not a value receiver.',
        ],
        correctIndex: 1,
        explanation: '`reflect.Value.Interface()` panics if the field is unexported because the reflect package enforces Go\'s visibility rules. The fix is to check `rt.Field(i).IsExported()` (Go 1.17+) before calling `.Interface()`. Unexported fields can still be read with unsafe reflection, but that bypasses encapsulation intentionally. This is exactly the pattern `encoding/json` uses to skip unexported fields. See [The Laws of Reflection](https://go.dev/blog/laws-of-reflection).',
      },
      {
        kind: 'mcq',
        id: 'go-7-mcq-debug-3',
        prompt: `**Production symptom:** After adding an \`UpdatedAt\` column to the \`users\` table, the field is always zero in API responses even though the database correctly returns a timestamp. \`ID\` and \`Name\` populate fine. No error is logged. The issue was introduced in last week's schema migration.

\`\`\`
# Observed in production query logs (2026-05-22 11:03 UTC)
# DB returns: id=42, name="alice", updated_at="2026-05-22T10:58:00Z"
# API response body: {"id":42,"name":"alice","updated_at":"0001-01-01T00:00:00Z"}
\`\`\`

\`\`\`go
// pkg/store/postgres.go
package store

import (
\t"context"
\t"database/sql"
\t"fmt"
\t"reflect"
\t"time"

\t_ "github.com/lib/pq"
)

// UserRow maps to the users table.
type UserRow struct {
\tID        int       \`db:"id"\`
\tName      string    \`db:"name"\`
\tUpdatedAt time.Time \`db:"updated_at"\` // newly added column
}

// scanRow is a lightweight reflection-based scanner used by the in-house ORM.
// It maps db tag values to struct fields.
func scanRow(dst any, values map[string]any) error {
\t// BUG: reflect.ValueOf(dst) where dst is a value type, not *UserRow
\trv := reflect.ValueOf(dst) // non-addressable copy
\trt := rv.Type()
\tfor i := 0; i < rv.NumField(); i++ {
\t\tfield := rt.Field(i)
\t\ttag := field.Tag.Get("db")
\t\tif val, ok := values[tag]; ok {
\t\t\t// Set on a non-addressable Value silently fails (or panics in strict mode)
\t\t\trv.Field(i).Set(reflect.ValueOf(val))
\t\t}
\t}
\treturn nil
}

// QueryUser fetches a single user by ID.
func QueryUser(ctx context.Context, db *sql.DB, id int) (*UserRow, error) {
\trow := UserRow{}
\tvalues := map[string]any{
\t\t"id":         42,
\t\t"name":       "alice",
\t\t"updated_at": time.Now(),
\t}
\tif err := scanRow(row, values); err != nil { // passing value, not pointer
\t\treturn nil, fmt.Errorf("store: scan user %d: %w", id, err)
\t}
\treturn &row, nil
}
\`\`\``,
        options: [
          '`time.Time` cannot be set via reflection; use `sql.Scanner` instead.',
          '`dst` is passed as a value (`Row`), not a pointer (`*Row`); the `reflect.Value` is not addressable, so `.Set()` panics or the changes are made to a copy that is immediately discarded.',
          'The `values` map uses `string` keys but reflect uses integer field indices.',
          '`reflect.ValueOf(val)` wraps the value in an extra interface layer that `.Set()` cannot unwrap.',
        ],
        correctIndex: 1,
        explanation: 'For `reflect.Value.Set` to work, the value must be addressable — which requires obtaining it via a pointer. `reflect.ValueOf(row)` where `row` is a `Row` value gives a non-addressable Value; calling `.Set()` on its fields panics with "reflect: reflect.Value.Set using value obtained using unexported field" or "reflect.Value.Set using unaddressable value". Fix: pass `&row` and call `reflect.ValueOf(dst).Elem()` to get the addressable struct value. This is why every ORM and `json.Unmarshal` requires a pointer argument. See [The Laws of Reflection](https://go.dev/blog/laws-of-reflection).',
      },
      {
        kind: 'code',
        id: 'go-7-code-1',
        prompt: 'Use reflection to inspect a struct, retrieve its custom tag, and print its fields and values.',
        boilerplate: 'package main\n\nimport (\n\t"fmt"\n\t"reflect"\n)\n\ntype Profile struct {\n\tName string `label:"Username"`\n\tAge  int    `label:"UserAge"`\n}\n\nfunc PrintLabels(s any) {\n\tt := reflect.TypeOf(s)\n\tv := reflect.ValueOf(s)\n\tfor i := 0; i < t.NumField(); i++ {\n\t\tfield := t.Field(i)\n\t\t// TODO: Retrieve the tag value for "label" and print it alongside the field\'s value\n\t\ttag := field.Tag.Get("label")\n\t\tval := v.Field(i).Interface()\n\t\tfmt.Printf("%s: %v\\n", tag, val)\n\t}\n}\n\nfunc main() {\n\tp := Profile{Name: "Bob", Age: 25}\n\tPrintLabels(p)\n}\n',
        expectedOutput: 'Username: Bob\nUserAge: 25',
        explanation: 'We use the `reflect` package to dynamically inspect types and values. `reflect.TypeOf` returns type metadata (e.g. struct fields and tags), and `reflect.ValueOf` accesses actual runtime values.'
      }
    ],
  },

  {
    id: 'go-8',
    language: 'go',
    level: 8,
    title: 'Cgo — Calling C from Go and Go from C',
    timeEstimate: '5-7 hours',
    intro: `By the end of this phase, you'll read Cgo code and reason about its pointer-passing rules, build implications, and per-call overhead. Topics in depth: the \`/* ... */ import "C"\` preamble, \`C.CString\` / \`C.free\` lifecycle, the cgo pointer rules (Go memory passed to C must not contain Go pointers; C must not retain Go pointers across calls), \`CGO_ENABLED\` for pure-Go builds, and the trade-offs of static binaries vs dynamic linking.

To build the muscle, you'll write locally: a small Cgo example that wraps a C function (e.g., \`strlen\` from \`<string.h>\` or sqlite3) and exposes a \`CGO_ENABLED=0\` pure-Go fallback. Use \`go env CGO_ENABLED\` to verify the active setting.`,
    topics: [
      { label: 'Cgo documentation', url: 'https://pkg.go.dev/cmd/cgo', note: 'Official Cgo reference: preamble, types, rules' },
      { label: 'C? Go? Cgo!', url: 'https://go.dev/blog/cgo', note: 'Introductory blog post with examples' },
      { label: 'Go Wiki — cgo', url: 'https://go.dev/wiki/cgo', note: 'Community guide: gotchas, pointers, memory rules' },
      { label: 'Cgo pointer passing rules', url: 'https://pkg.go.dev/cmd/cgo#hdr-Passing_pointers', note: 'Critical rules about passing pointers between Go and C' },
      { label: 'CGO_ENABLED build constraint', url: 'https://pkg.go.dev/cmd/go#hdr-Environment_variables', note: 'CGO_ENABLED=0 for pure-Go cross-compilation' },
    ],
    deliverable: 'Build locally: a small Cgo example wrapping a C function (e.g., `strlen` or `sqlite3_open`), demonstrating `C.CString`/`C.free` lifecycle and a `CGO_ENABLED=0` pure-Go fallback path.',
    checks: [
      {
        kind: 'mcq',
        id: 'go-8-mcq-1',
        prompt: 'Which Cgo rule governs passing Go pointers to C?',
        options: [
          'Go pointers may be freely passed to C as long as they are not nil.',
          'Go pointers can be passed to C only if the Go memory they point to does not contain any Go pointers, and C must not retain them past the call.',
          'All Go pointers must be converted to uintptr before passing to C.',
          'Cgo automatically pins all Go memory whenever a C call is in progress.',
        ],
        correctIndex: 1,
        explanation: 'The key Cgo pointer rules: a Go pointer passed to C must not point to Go memory that contains other Go pointers, and C must not retain the Go pointer past the call. The Go GC can move/track Go pointers, and C must not observe them. Violations are runtime-checked when `GODEBUG=cgocheck=1` (the default) is set. See [Cgo pointer passing rules](https://pkg.go.dev/cmd/cgo#hdr-Passing_pointers).',
      },
      {
        kind: 'mcq',
        id: 'go-8-mcq-2',
        prompt: 'Why does Cgo complicate cross-compilation?',
        options: [
          'Cgo requires a C compiler for the *target* platform, which is often not available in cross-compile toolchains.',
          'Cgo disables the `GOARCH` environment variable.',
          'Cross-compilation is impossible with Cgo; you must always compile natively.',
          'The Go runtime does not support Cgo on non-Linux platforms.',
        ],
        correctIndex: 0,
        explanation: 'Cgo requires a C compiler (gcc/clang) for the target architecture and OS. In typical cross-compile setups you only have a compiler for the build host, making `CGO_ENABLED=0 GOOS=linux GOARCH=arm64 go build` the common workaround for producing portable static binaries. See [Cgo documentation](https://pkg.go.dev/cmd/cgo).',
      },
      {
        kind: 'mcq',
        id: 'go-8-mcq-3',
        prompt: `What does this program print?

\`\`\`go
package main

/*
#include <string.h>
#include <stdlib.h>
*/
import "C"

import (
\t"fmt"
\t"unsafe"
)

func main() {
\ts := "Hello, Cgo!"
\tcstr := C.CString(s)
\tdefer C.free(unsafe.Pointer(cstr))
\tfmt.Println(int(C.strlen(cstr)))
}
\`\`\``,
        options: [
          '12',
          '11',
          '10',
          'panic: invalid pointer passed to C',
        ],
        correctIndex: 1,
        explanation: '`"Hello, Cgo!"` is 11 bytes (`H-e-l-l-o-,-space-C-g-o-!`). `C.strlen` returns the length excluding the NUL terminator. The `defer C.free` is critical — `C.CString` allocates with `malloc`, and the Go GC will never reclaim it. Omit the `defer` and you have a steady memory leak. See [Cgo documentation — Go references to C](https://pkg.go.dev/cmd/cgo).',
      },
      {
        kind: 'mcq',
        id: 'go-8-mcq-4',
        prompt: 'What disables Cgo entirely, allowing pure-Go static cross-compilation?',
        options: [
          '`//go:build !cgo`',
          '`CGO_ENABLED=0` environment variable during `go build`',
          '`//go:build pure`',
          '`go build -nocgo`',
        ],
        correctIndex: 1,
        explanation: 'Setting `CGO_ENABLED=0` in the environment before invoking `go build` disables Cgo globally. The standard library then uses Go-only fallbacks (e.g., pure-Go DNS resolver, pure-Go `os/user`). The resulting binary is statically linked — ideal for `FROM scratch` Docker images. There is no `-nocgo` flag. See [go command environment variables](https://pkg.go.dev/cmd/go#hdr-Environment_variables).',
      },
      {
        kind: 'mcq',
        id: 'go-8-mcq-5',
        prompt: `What does \`defer C.free(unsafe.Pointer(cstr))\` accomplish here, and what is the consequence of omitting it?

\`\`\`go
cstr := C.CString(s)
defer C.free(unsafe.Pointer(cstr))
\`\`\``,
        options: [
          'It is purely stylistic; Go GC will reclaim `cstr` automatically.',
          '`C.CString` allocates via `malloc`; omitting `C.free` leaks heap memory because the Go GC does not manage C-allocated memory.',
          'It converts the C string back into a Go string.',
          'It pins the Go memory so C can hold the pointer indefinitely.',
        ],
        correctIndex: 1,
        explanation: 'The Go garbage collector knows nothing about memory allocated by `C.CString` (or any C `malloc`). You must pair every `C.CString` with a `C.free` — `defer` is the canonical pattern. The same applies to `C.CBytes`. In long-running services the leak accumulates silently and shows up only in container OOM logs. See [Cgo documentation](https://pkg.go.dev/cmd/cgo).',
      },
      {
        kind: 'mcq',
        id: 'go-8-mcq-6',
        prompt: 'Which is a legitimate reason to *avoid* Cgo in a new Go project?',
        options: [
          'Cgo crashes on Windows.',
          'Cgo function calls have measurable per-call overhead, break some toolchain features (e.g., `go test -race` interactions), and complicate cross-compilation and static binaries.',
          'Cgo cannot pass primitive types like ints.',
          'Cgo prevents using goroutines anywhere in the program.',
        ],
        correctIndex: 1,
        explanation: 'Each Cgo call has overhead (stack switch, parameter marshalling). Cgo also pins the build to a C toolchain, complicates static linking, and interacts subtly with the race detector and signals. If a pure-Go library exists, prefer it. See [C? Go? Cgo!](https://go.dev/blog/cgo).',
      },
      {
        kind: 'mcq',
        id: 'go-8-mcq-debug-1',
        prompt: `**Production symptom:** The \`content-processor\` service shows RSS growing ~2 MB/min under sustained load (>200 req/s). A \`pprof\` heap snapshot shows Go heap is stable at ~40 MB. The C text-normalisation library passes its own valgrind suite cleanly. An on-call engineer captures the following:

\`\`\`
$ curl -s http://localhost:6060/debug/pprof/heap | go tool pprof -top
Showing nodes accounting for 41.2MB, 97.3% of 42.3MB total
      flat  flat%   sum%        cum   cum%
   38.50MB 91.0% 91.0%    38.50MB 91.0%  runtime.mallocgc
    2.70MB  6.3% 97.3%     2.70MB  6.3%  bytes.makeSlice

# RSS from /proc/<pid>/status grows ~120 MB over 60 seconds:
# 14:01 VmRSS: 142 MB
# 14:02 VmRSS: 264 MB   ← steady climb not reflected in Go heap
\`\`\`

\`\`\`go
// internal/normalise/cgo.go
package normalise

/*
#include <stdlib.h>
#include <string.h>

// normalise_text returns a malloc'd, NUL-terminated copy of input
// with whitespace collapsed. Caller must free() the result.
char* normalise_text(const char* input) {
    size_t n = strlen(input);
    char* out = (char*)malloc(n + 1);
    if (!out) return NULL;
    // ... whitespace-collapsing logic elided for brevity ...
    strncpy(out, input, n + 1);
    return out;
}
*/
import "C"

import (
\t"fmt"
\t"unsafe"
)

// NormaliseText calls the C normaliser and returns a Go string.
func NormaliseText(s string) (string, error) {
\tif s == "" {
\t\treturn "", nil
\t}
\tcInput := C.CString(s)
\t// BUG: C.free(unsafe.Pointer(cInput)) is missing here
\t// Every call leaks len(s)+1 bytes of C heap.
\tcResult := C.normalise_text(cInput)
\tif cResult == nil {
\t\treturn "", fmt.Errorf("normalise_text: C returned NULL for input len=%d", len(s))
\t}
\tdefer C.free(unsafe.Pointer(cResult))
\treturn C.GoString(cResult), nil
}
\`\`\``,
        options: [
          '`C.GoString(result)` allocates a Go string that the GC will not free.',
          '`C.CString(s)` allocates a C string with `malloc`; without a matching `C.free`, each call leaks that allocation. After one million calls the leaked C heap grows to hundreds of megabytes.',
          '`C.process` returns a pointer that the Go GC moves, causing the leak.',
          '`defer C.free(unsafe.Pointer(result))` is incorrect syntax and never executes.',
        ],
        correctIndex: 1,
        explanation: '`C.CString` allocates via `malloc` — memory invisible to the Go garbage collector. Without `defer C.free(unsafe.Pointer(cstr))`, every call leaks `len(s)+1` bytes of C heap. The `result` pointer is correctly freed but the input `cstr` is not. Fix: add `defer C.free(unsafe.Pointer(cstr))` immediately after `C.CString`. Always pair every `C.CString` and `C.CBytes` call with a `C.free`. See [Cgo documentation](https://pkg.go.dev/cmd/cgo).',
      },
      {
        kind: 'mcq',
        id: 'go-8-mcq-debug-2',
        prompt: `**Production symptom:** The \`ml-inference\` service crashes with a SIGSEGV roughly once every 30 minutes. The crash is non-deterministic and correlates with GC pauses visible in metrics. \`GODEBUG=cgocheck=1\` (the default) emits a check failure first. The C inference library is a vendor-supplied \`.so\` that queues work internally.

\`\`\`
SIGSEGV: segmentation violation
PC=0x7f3a2c1d8b20 m=4 sigcode=1

goroutine 23 [syscall]:
runtime.cgocall(0x10a3f40, 0xc000497d88)
        /usr/local/go/src/runtime/cgocall.go:157 +0x5c fp=0xc000497d60 sp=0xc000497d28 pc=0x43e17c
internal/inference/cgo.(*Engine).Submit(...)
        /app/internal/inference/cgo.go:58 +0x1a4

cgo: runtime: address space conflict in thread
panic: runtime error: cgo argument has Go pointer to Go pointer
\`\`\`

\`\`\`go
// internal/inference/cgo.go
package inference

/*
#cgo LDFLAGS: -linfer -L/usr/local/lib
#include <infer.h>

// infer_submit queues a batch for async GPU processing.
// The C library RETAINS the data pointer until the callback fires.
void infer_submit(const char* data, int len, void (*cb)(int result));
*/
import "C"

import (
\t"log/slog"
\t"unsafe"
)

// Engine wraps the C inference library.
type Engine struct {
\tlogger *slog.Logger
}

// Submit sends a payload to the C inference engine.
// The C library stores the data pointer and reads it on a background thread.
func (e *Engine) Submit(payload []byte) {
\tif len(payload) == 0 {
\t\treturn
\t}
\t// BUG: passing a pointer into Go-managed memory to C,
\t// which retains it past this call boundary.
\t// The Go GC may move or collect payload's backing array.
\tC.infer_submit(
\t\t(*C.char)(unsafe.Pointer(&payload[0])), // Go pointer — must not be retained
\t\tC.int(len(payload)),
\t\tnil,
\t)
\te.logger.Info("inference: submitted", "bytes", len(payload))
}
\`\`\``,
        options: [
          'The `unsafe.Pointer` cast is invalid; use `C.CBytes` to pass slice data to C.',
          'C is retaining a pointer to Go-managed memory (`data[0]`) past the Cgo call boundary; the Go GC may move or collect the backing array, leaving C with a dangling pointer.',
          '`[]byte` slices cannot be passed to C; convert to `string` first.',
          'The `(*C.char)` cast is illegal; use `*C.uchar` for byte data.',
        ],
        correctIndex: 1,
        explanation: 'The Cgo pointer rules forbid C from retaining a Go pointer past the call. If C stores `&data[0]` and accesses it later, the Go GC may have moved or freed the backing array. The runtime checks this with `GODEBUG=cgocheck=1` (default). Fix: use `C.CBytes(data)` to make a C-owned copy of the data, then `C.free` it when done. Never let C hold a pointer into Go-managed memory across calls. See [Cgo pointer passing rules](https://pkg.go.dev/cmd/cgo#hdr-Passing_pointers).',
      },
      {
        kind: 'mcq',
        id: 'go-8-mcq-debug-3',
        prompt: `**Production symptom:** The \`pdf-renderer\` service crashes during graceful shutdown under load. The crash is reproducible when more than 50 requests are in-flight at shutdown time. It does not occur in low-traffic deployments. Sentry captures the following:

\`\`\`
panic: runtime error: invalid memory address or nil pointer dereference
[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x7f2c3a1d9044]

goroutine 1 [running]:
runtime/debug.Stack()
        /usr/local/go/src/runtime/debug/stack.go:24 +0x65
main.(*Renderer).Shutdown(0xc0001a4000)
        /app/internal/renderer/cgo_renderer.go:87 +0x1b3
main.(*Server).GracefulStop(0xc0001c0000)
        /app/cmd/server/main.go:134 +0x88
\`\`\`

\`\`\`go
// internal/renderer/cgo_renderer.go
package renderer

/*
#include <stdlib.h>
#include <pdflib.h>
*/
import "C"

import (
\t"fmt"
\t"log/slog"
\t"unsafe"
)

// Renderer wraps the C PDF generation library.
type Renderer struct {
\tlogger *slog.Logger
\tpending []*C.char // accumulates C strings for batch cleanup at shutdown
}

// Render converts markdown to PDF bytes using the C library.
func (r *Renderer) Render(markdown string) ([]byte, error) {
\tif markdown == "" {
\t\treturn nil, fmt.Errorf("renderer: empty input")
\t}
\tcMd := C.CString(markdown)
\tdefer C.free(unsafe.Pointer(cMd)) // freed here when Render returns
\tr.pending = append(r.pending, cMd) // BUG: also registered for Shutdown cleanup

\tcResult := C.pdf_render(cMd)
\tif cResult == nil {
\t\treturn nil, fmt.Errorf("renderer: pdf_render returned NULL")
\t}
\tdefer C.free(unsafe.Pointer(cResult))

\tresult := C.GoBytes(unsafe.Pointer(cResult), C.int(C.strlen((*C.char)(unsafe.Pointer(cResult)))))
\tr.logger.Info("renderer: rendered", "input_len", len(markdown), "output_len", len(result))
\treturn result, nil
}

// Shutdown frees all accumulated C strings — but many are already freed by defer in Render.
func (r *Renderer) Shutdown() {
\tfor _, p := range r.pending {
\t\tC.free(unsafe.Pointer(p)) // double-free: Render's defer already freed these
\t}
\tr.pending = nil
}
\`\`\``,
        options: [
          '`C.GoString` after `C.free` reads freed memory; move the `Println` before `cleanup`.',
          '`cstr` is freed by both `cleanup(ptrs)` and the `defer C.free`; the second free is a double-free, corrupting the C heap and causing a crash.',
          '`defer C.free` inside `process` conflicts with the `defer C.free` in `main`.',
          '`[]*C.char` slices cannot hold Cgo pointers; use `[]unsafe.Pointer` instead.',
        ],
        correctIndex: 1,
        explanation: '`cstr` is added to `ptrs` and freed by `cleanup`, then the deferred `C.free` in `main` fires at function exit and frees it again. A double-free corrupts the C allocator and typically causes a crash or undefined behaviour. Fix: choose a single owner for each C allocation — either `defer C.free` or manual cleanup, not both. A common pattern: don\'t put pointers into cleanup slices if they already have a deferred free. See [Cgo documentation](https://pkg.go.dev/cmd/cgo).',
      },
      {
        kind: 'code',
        id: 'go-8-code-1',
        prompt: 'Call an inline C function `square` from Go code using Cgo.',
        boilerplate: 'package main\n\n/*\nint square(int n) {\n    return n * n;\n}\n*/\nimport "C"\nimport "fmt"\n\nfunc main() {\n\tvar x int = 6\n\t// TODO: Call the C function \'square\' passing x cast to C.int\n\tresult := C.square(C.int(x))\n\tfmt.Println("Result:", result)\n}\n',
        expectedOutput: 'Result: 36',
        explanation: 'Cgo allows Go packages to call C code. Go types must be explicitly converted to C types (e.g. `C.int(x)`) when passing them to C functions.'
      }
    ],
  },

  {
    id: 'go-9',
    language: 'go',
    level: 9,
    title: 'Performance — pprof, Benchmarks, Fuzzing, and Escape Analysis',
    timeEstimate: '6-8 hours',
    intro: `By the end of this phase, you'll read benchmark code and \`-gcflags=-m\` output and predict where heap allocations occur, what \`b.N\` is doing, and how to spot a hot path with \`go tool pprof\`. Topics in depth: \`testing.B\` micro-benchmarks (\`b.ResetTimer\`, \`b.ReportAllocs\`, \`b.Run\`), coverage-guided fuzzing with \`testing.F\` (Go 1.18+), CPU/heap profiling with \`pprof\`, and escape analysis as a way to predict GC pressure.

To build the muscle, you'll write locally: a benchmark suite using \`testing.B\` and \`pprof\` for a sorting function, including a flame graph captured by \`go test -bench=. -cpuprofile=cpu.out\` and \`go tool pprof -http=:0 cpu.out\`. Log scaffolding via \`log/slog\`.`,
    topics: [
      { label: 'Profiling Go programs', url: 'https://go.dev/blog/pprof', note: 'Official blog: CPU and memory profiling with pprof' },
      { label: 'testing package — Benchmarks', url: 'https://pkg.go.dev/testing#hdr-Benchmarks', note: 'testing.B, b.ResetTimer, b.ReportAllocs' },
      { label: 'Go Fuzzing', url: 'https://go.dev/doc/fuzz/', note: 'testing.F, f.Add, f.Fuzz — fuzzing since Go 1.18' },
      { label: 'GC Guide — escape analysis', url: 'https://go.dev/doc/gc-guide', note: 'GC guide covering stack vs heap allocation' },
      { label: 'net/http/pprof package', url: 'https://pkg.go.dev/net/http/pprof', note: 'HTTP endpoint for runtime profiles on live servers' },
      { label: 'pkg runtime/pprof', url: 'https://pkg.go.dev/runtime/pprof', note: 'Programmatic profile collection from within a binary' },
    ],
    deliverable: 'Build locally: a benchmark suite with testing.B and pprof for a sorting function, includes a flame graph.',
    checks: [
      {
        kind: 'mcq',
        id: 'go-9-mcq-1',
        prompt: 'What does `b.ResetTimer()` do in a Go benchmark?',
        options: [
          'Resets the iteration counter `b.N` to zero.',
          'Clears accumulated time so that expensive setup code before the timed loop is excluded from the measurement.',
          'Stops the benchmark and restarts it from the beginning.',
          'Resets memory allocation counters only.',
        ],
        correctIndex: 1,
        explanation: '`b.ResetTimer()` is called after setup code (allocating test data, opening files, etc.) to exclude that time from the benchmark measurement. Only the time spent in the `for i := 0; i < b.N; i++` loop is reported. Pair with `b.ReportAllocs()` to also report allocations per op. See [pkg.go.dev/testing#hdr-Benchmarks](https://pkg.go.dev/testing#hdr-Benchmarks).',
      },
      {
        kind: 'mcq',
        id: 'go-9-mcq-2',
        prompt: 'What is escape analysis in Go?',
        options: [
          'A runtime process that moves objects from the heap to the stack when they are no longer referenced.',
          'A compile-time analysis that determines whether a variable can be allocated on the stack or must escape to the heap.',
          'A garbage collection phase that frees memory from goroutines that have exited.',
          'A profiler that detects goroutine leaks at runtime.',
        ],
        correctIndex: 1,
        explanation: "Escape analysis runs at compile time. If the compiler can prove a variable's lifetime is bounded by the enclosing function, it goes on the stack (fast, no GC pressure). If it might outlive the function (returned pointer, captured in closure, passed to an interface), it escapes to the heap. Inspect with `go build -gcflags='-m -m'` or `go test -gcflags='-m'`. See [GC Guide](https://go.dev/doc/gc-guide).",
      },
      {
        kind: 'mcq',
        id: 'go-9-mcq-3',
        prompt: `Why does \`strings.Builder\` outperform naive \`+=\` concatenation in this loop?

\`\`\`go
package main

import (
\t"fmt"
\t"strings"
)

func main() {
\tvar b strings.Builder
\tfor i := 0; i < 1000; i++ {
\t\tb.WriteString("go")
\t}
\tfmt.Println(len(b.String()))
}
\`\`\``,
        options: [
          '`strings.Builder` runs in a separate goroutine.',
          '`strings.Builder` grows its internal buffer geometrically (amortised O(1) per write) and avoids the O(n²) byte copy that `s += "go"` would incur because Go strings are immutable.',
          '`strings.Builder` rewrites the source to use byte arrays.',
          '`strings.Builder` is implemented in C via Cgo.',
        ],
        correctIndex: 1,
        explanation: 'Strings in Go are immutable, so `s += "go"` allocates a new backing array and copies on every iteration — O(n²) total. `strings.Builder` keeps a mutable `[]byte` underneath and grows it geometrically, producing the final string in a single allocation when you call `.String()`. Confirm with `go test -bench` and `b.ReportAllocs()`. See [pkg.go.dev/strings#Builder](https://pkg.go.dev/strings#Builder).',
      },
      {
        kind: 'mcq',
        id: 'go-9-mcq-4',
        prompt: `Which line is responsible for the heap escape reported by \`go build -gcflags="-m"\`?

\`\`\`go
package main

func makeMessage() *string {       // line A
\ts := "hello"                     // line B
\treturn &s                        // line C
}

func main() {
\t_ = makeMessage()                // line D
}
\`\`\``,
        options: [
          'Line A',
          'Line B — string literals always escape.',
          'Line C — returning `&s` forces `s` to escape to the heap because its address outlives the function.',
          'Line D',
        ],
        correctIndex: 2,
        explanation: '`s` would normally live on the stack, but taking its address and returning it means the pointer outlives the function. The compiler proves this with escape analysis and promotes `s` to the heap. Use `go build -gcflags="-m"` and look for "moved to heap: s". Returning small values by copy is often faster than returning a pointer for this reason. See [GC Guide](https://go.dev/doc/gc-guide).',
      },
      {
        kind: 'mcq',
        id: 'go-9-mcq-5',
        prompt: `What is the role of \`b.N\` inside a benchmark?

\`\`\`go
func BenchmarkSum(b *testing.B) {
\tfor i := 0; i < b.N; i++ {
\t\tSum(largeSlice)
\t}
}
\`\`\``,
        options: [
          '`b.N` is a fixed constant supplied by the user via `-benchtime`.',
          'The testing harness sets `b.N` dynamically, running the function progressively more times until measurements are statistically stable.',
          '`b.N` is the number of goroutines to launch.',
          '`b.N` is the maximum allowed wall-clock seconds.',
        ],
        correctIndex: 1,
        explanation: 'The benchmark harness calls your function with progressively larger `b.N` until the elapsed time crosses a target (default 1s; override with `-benchtime=5s` or `-benchtime=100x`). It then divides time by `b.N` to report ns/op. Never assume `b.N` is small — your benchmark loop must be repeatable. See [pkg.go.dev/testing#hdr-Benchmarks](https://pkg.go.dev/testing#hdr-Benchmarks).',
      },
      {
        kind: 'mcq',
        id: 'go-9-mcq-6',
        prompt: `What does \`f.Fuzz\` do in a Go fuzz test?

\`\`\`go
func FuzzReverse(f *testing.F) {
\tf.Add("hello")
\tf.Fuzz(func(t *testing.T, s string) {
\t\trev := Reverse(s)
\t\tif Reverse(rev) != s {
\t\t\tt.Errorf("Reverse(Reverse(%q)) = %q", s, Reverse(rev))
\t\t}
\t})
}
\`\`\``,
        options: [
          'It runs the closure once with the seed input only.',
          'It registers a fuzz target; the harness then generates new inputs, runs them against the closure, and reports any inputs that cause failures or crashes (using coverage-guided mutation in fuzz mode).',
          'It compiles the closure into a benchmark.',
          'It prints the seed corpus to stdout.',
        ],
        correctIndex: 1,
        explanation: '`go test` runs the fuzz target on seed inputs by default. `go test -fuzz=FuzzReverse` enters fuzz mode: the harness mutates inputs using coverage feedback and saves failing cases to `testdata/fuzz/FuzzReverse/`. Found bugs become permanent regression tests. Fuzzing was added in Go 1.18. See [Go Fuzzing](https://go.dev/doc/fuzz/).',
      },
      {
        kind: 'mcq',
        id: 'go-9-mcq-debug-1',
        prompt: `**Production symptom:** An engineer runs a new benchmark for the checksum hot-path and reports suspiciously fast results — 0.31 ns/op vs the expected ~8 ns/op. A code reviewer suspects the benchmark is not measuring real work.

\`\`\`
$ go test -bench=BenchmarkChecksum -benchmem ./internal/checksum/
goos: linux
goarch: amd64
pkg: github.com/acme/platform/internal/checksum
cpu: Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz
BenchmarkChecksum-8    1000000000    0.3142 ns/op    0 B/op    0 allocs/op
PASS
ok      github.com/acme/platform/internal/checksum    0.358s

# Expected based on manual timing: ~8 ns/op for a 24-byte input
\`\`\`

\`\`\`go
// internal/checksum/checksum.go
package checksum

// Compute returns a fast polynomial hash of data.
// It is a pure function with no side effects.
func Compute(data []byte) uint64 {
\tvar h uint64 = 14695981039346656037 // FNV offset basis
\tfor _, v := range data {
\t\th ^= uint64(v)
\t\th *= 1099511628211 // FNV prime
\t}
\treturn h
}

// internal/checksum/checksum_bench_test.go
package checksum_test

import "testing"

var payload = []byte("benchmark input payload") // 23 bytes

func BenchmarkChecksum(b *testing.B) {
\tfor i := 0; i < b.N; i++ {
\t\t_ = Compute(payload) // result assigned to blank identifier — DCE candidate
\t}
}
\`\`\``,
        options: [
          'The benchmark is correct; 10× speedup is expected after compiler PGO optimisations.',
          'The compiler may eliminate the `computeHash` call entirely (dead code elimination) because the result is discarded with `_`; use a package-level `var sink uint64` and assign `sink = computeHash(data)` to prevent DCE.',
          '`b.N` is too small; add `b.ResetTimer()` before the loop to get accurate timings.',
          '`[]byte` arguments always escape to the heap, making the benchmark measure allocation not computation.',
        ],
        correctIndex: 1,
        explanation: 'The Go compiler can eliminate pure function calls whose results are unused. Assigning to `_` is a hint that the result is intentionally discarded, which DCE can exploit. The canonical fix is a package-level sink variable: `var Sink uint64` (exported to prevent further optimisation), then `Sink = computeHash(data)` inside the loop. This forces the compiler to materialise the result. `b.ReportAllocs()` can also reveal if the fix changes allocation behaviour. See [pkg.go.dev/testing#hdr-Benchmarks](https://pkg.go.dev/testing#hdr-Benchmarks).',
      },
      {
        kind: 'mcq',
        id: 'go-9-mcq-debug-2',
        prompt: `**Production symptom:** A fuzz test for the binary packet parser crashes overnight in CI. The fuzzer saves a failing corpus entry. The on-call engineer finds a 3 847-byte binary blob in the corpus and wants to understand the minimal input that triggers the bug before writing a fix.

\`\`\`
$ go test -fuzz=FuzzParsePacket -fuzztime=60s ./pkg/parser/
fuzz: elapsed: 0s, gathering baseline coverage: 0/3 completed
fuzz: elapsed: 0s, gathering baseline coverage: 3/3 completed, now fuzzing with 8 workers
fuzz: elapsed: 23s, execs: 1042318 (45318/sec), new interesting: 41 (total: 44)
--- FAIL: FuzzParsePacket (23.18s)
    fuzzing process hung or terminated unexpectedly: exit status 2
    Failing input written to testdata/fuzz/FuzzParsePacket/b07f3e1a2c9d
    To re-run:
    go test -run=FuzzParsePacket/b07f3e1a2c9d ./pkg/parser/

$ ls -lh testdata/fuzz/FuzzParsePacket/
-rw-r--r-- 1 ci ci 3.8K May 23 02:41 b07f3e1a2c9d
\`\`\`

\`\`\`go
// pkg/parser/parser_fuzz_test.go
package parser_test

import (
\t"testing"

\t"github.com/acme/platform/pkg/parser"
)

// FuzzParsePacket fuzzes the binary packet parser for panics and invariant violations.
func FuzzParsePacket(f *testing.F) {
\t// Seed corpus: valid minimal packets
\tf.Add([]byte{0x01, 0x00, 0x00, 0x00}) // type=1, length=0
\tf.Add([]byte{0x02, 0x00, 0x01, 0x00, 0xFF}) // type=2, length=1, payload=0xFF

\tf.Fuzz(func(t *testing.T, data []byte) {
\t\tpkt, err := parser.ParsePacket(data)
\t\tif err != nil {
\t\t\treturn // parse errors are expected for malformed input
\t\t}
\t\t// Invariant: a successfully parsed packet must have non-negative payload length
\t\tif pkt.PayloadLen < 0 {
\t\t\tt.Errorf("negative PayloadLen after successful parse: %d", pkt.PayloadLen)
\t\t}
\t})
}
\`\`\``,
        options: [
          'Run `go test -fuzz=FuzzParse -fuzzminimize=false` to disable minimization and use the raw input.',
          'The Go fuzzer automatically minimizes failing inputs before saving them to `testdata/fuzz/`; re-running `go test -run=FuzzParse` replays the already-minimized corpus file as a regression test.',
          'Copy the failing input to a unit test and manually trim bytes until the test still fails.',
          'Run `go test -bench=FuzzParse` to replay the failing input in benchmark mode.',
        ],
        correctIndex: 1,
        explanation: 'The Go fuzzing engine performs automatic minimization: when a crash is found, the harness tries to reduce the input to the smallest byte sequence that still triggers the failure, then saves *that* minimized input to `testdata/fuzz/FuzzParse/`. Running `go test ./...` (without `-fuzz`) replays all corpus files as deterministic regression tests. The saved file is already minimal — you do not need to trim it manually. See [Go Fuzzing](https://go.dev/doc/fuzz/).',
      },
      {
        kind: 'mcq',
        id: 'go-9-mcq-debug-3',
        prompt: `**Production symptom:** The checkout service test suite fails intermittently — roughly 1 in 30 CI runs. When it fails the entire test binary panics rather than just reporting a failed assertion. The failure does not reproduce locally. The CI log shows:

\`\`\`
--- FAIL: TestCheckoutHandler/async_inventory_check (0.00s)
panic: testing: t.Error called after test finished [recovered]
        panic: testing: t.Error called after test finished

goroutine 94 [running]:
testing.(*common).Error(0xc0004a2000, {0xc000312080, 0x1, 0x1})
        /usr/local/go/src/testing/testing.go:982 +0x5f
github.com/acme/platform/internal/checkout_test.TestCheckoutHandler.func2.1()
        /app/internal/checkout/handler_test.go:58 +0x1d4
created by github.com/acme/platform/internal/checkout_test.TestCheckoutHandler.func2
        /app/internal/checkout/handler_test.go:49 +0x198
exit status 2
FAIL    github.com/acme/platform/internal/checkout    0.312s
\`\`\`

\`\`\`go
// internal/checkout/handler_test.go
package checkout_test

import (
\t"net/http"
\t"net/http/httptest"
\t"testing"
\t"time"

\t"github.com/acme/platform/internal/checkout"
)

func TestCheckoutHandler(t *testing.T) {
\thandler := checkout.NewHandler(checkout.Config{Timeout: 200 * time.Millisecond})

\tt.Run("async_inventory_check", func(t *testing.T) {
\t\trec := httptest.NewRecorder()
\t\treq, _ := http.NewRequest(http.MethodPost, "/checkout", nil)

\t\t// Spawn goroutine to assert on async side-effect
\t\tgo func() { // line 49
\t\t\ttime.Sleep(150 * time.Millisecond) // wait for handler's async work
\t\t\tbody := rec.Body.String()
\t\t\tif body == "" {
\t\t\t\tt.Error("expected non-empty response body") // line 58 — t already done
\t\t\t}
\t\t}()

\t\thandler.ServeHTTP(rec, req)
\t\t// sub-test returns here; goroutine still sleeping
\t})
}
\`\`\``,
        options: [
          'Use `t.Log` instead of `t.Error` to avoid the panic when called from a goroutine.',
          'The sub-test function returns before the goroutine finishes; the goroutine then calls `t.Error` on a completed `*testing.T`, which panics. Fix: use a `sync.WaitGroup` (or `t.Cleanup`) to ensure the goroutine completes before the sub-test returns.',
          'Goroutines launched inside `t.Run` are automatically cancelled when the sub-test finishes.',
          'The `time.Sleep` causes the goroutine to outlive the test binary; use a context with timeout instead.',
        ],
        correctIndex: 1,
        explanation: 'The `testing` package panics if `t.Error`, `t.Log`, or `t.Fatal` is called after the test function has returned. The sub-test closure returns immediately while the goroutine sleeps for 100ms and then calls `t.Error`. Fix: declare a `var wg sync.WaitGroup; wg.Add(1)` before the `go` statement, call `wg.Done()` at the end of the goroutine, and `wg.Wait()` before the sub-test returns. Alternatively, use `t.Cleanup(wg.Wait)`. See [pkg.go.dev/testing](https://pkg.go.dev/testing).',
      },
      {
        kind: 'code',
        id: 'go-9-code-1',
        prompt: 'Use the `testing` package to programmatically run a benchmark and verify it executes.',
        boilerplate: 'package main\n\nimport (\n\t"fmt"\n\t"testing"\n)\n\nfunc Fibonacci(n int) int {\n\tif n <= 1 {\n\t\treturn n\n\t}\n\treturn Fibonacci(n-1) + Fibonacci(n-2)\n}\n\nfunc main() {\n\t// TODO: Run a benchmark programmatically using testing.Benchmark to measure Fibonacci(10)\n\tres := testing.Benchmark(func(b *testing.B) {\n\t\tfor i := 0; i < b.N; i++ {\n\t\t\tFibonacci(10)\n\t\t}\n\t})\n\tif res.N > 0 {\n\t\tfmt.Println("Benchmark ran successfully")\n\t}\n}\n',
        expectedOutput: 'Benchmark ran successfully',
        explanation: 'Go supports benchmarking built directly into the `testing` package. A benchmark function runs the target code in a loop `b.N` times, where `b.N` is dynamically adjusted by the testing framework.'
      }
    ],
  },

  {
    id: 'go-10',
    language: 'go',
    level: 10,
    title: 'Production Patterns — slog, Error Wrapping, Graceful Shutdown, and OpenTelemetry',
    timeEstimate: '8-10 hours',
    intro: `By the end of this phase, you'll read production Go service code and predict its observability output, shutdown behaviour, and error-handling semantics under load. Topics in depth: \`log/slog\` (Go 1.21) for structured, levelled logging; error wrapping with \`fmt.Errorf("...: %w", err)\` plus \`errors.Is\`/\`errors.As\`; graceful HTTP shutdown via \`signal.NotifyContext\` + \`http.Server.Shutdown\`; and OpenTelemetry spans for distributed tracing.

To build the muscle, you'll write locally: a production-style microservice skeleton with \`slog\` (JSON handler), OpenTelemetry tracing, \`signal.NotifyContext\`-driven graceful shutdown, and a multi-stage Dockerfile that produces a \`FROM scratch\` static binary.`,
    topics: [
      { label: 'log/slog package', url: 'https://pkg.go.dev/log/slog', note: 'Structured, levelled logging built into Go 1.21+' },
      { label: 'OpenTelemetry Go — Getting Started', url: 'https://opentelemetry.io/docs/languages/go/getting-started/', note: 'Traces, metrics, and logs with the OTel Go SDK' },
      { label: 'net/http — Server.Shutdown', url: 'https://pkg.go.dev/net/http#Server.Shutdown', note: 'Graceful shutdown: drain requests, close listeners' },
      { label: 'os/signal — NotifyContext', url: 'https://pkg.go.dev/os/signal#NotifyContext', note: 'Marries OS signals to context.Context cancellation' },
      { label: 'Structured Logging with slog', url: 'https://go.dev/blog/slog', note: 'Official blog announcing and explaining slog' },
      { label: 'Working with Errors in Go 1.13', url: 'https://go.dev/blog/go1.13-errors', note: 'errors.Is, errors.As, and the %w verb for wrapping' },
      { label: 'pkg errors', url: 'https://pkg.go.dev/errors', note: 'errors.Is, errors.As, errors.Join, errors.Unwrap' },
    ],
    deliverable: 'Build locally: a production-style microservice skeleton with slog, OpenTelemetry, graceful shutdown via signal.NotifyContext + Server.Shutdown, and a multi-stage Dockerfile.',
    checks: [
      {
        kind: 'mcq',
        id: 'go-10-mcq-1',
        prompt: 'What does `server.Shutdown(ctx)` do that `server.Close()` does not?',
        options: [
          'Shutdown closes the listener immediately; Close waits for requests to finish.',
          'Shutdown stops accepting new connections and waits for active requests to complete (up to ctx deadline); Close closes immediately without waiting.',
          'Shutdown sends SIGTERM to all client connections; Close sends SIGKILL.',
          'They are identical; Shutdown is just the newer API.',
        ],
        correctIndex: 1,
        explanation: '`Shutdown` is graceful: it closes the listener (refusing new connections) but lets in-flight requests complete until the context expires or all requests finish. `Close` forcibly closes all connections immediately, truncating responses. Production pattern: `Shutdown` with a 30s deadline, fall back to `Close` only if it returns an error. See [pkg.go.dev/net/http#Server.Shutdown](https://pkg.go.dev/net/http#Server.Shutdown).',
      },
      {
        kind: 'mcq',
        id: 'go-10-mcq-2',
        prompt: `What is the difference between \`errors.Is\` and \`errors.As\`?

\`\`\`go
var ErrNotFound = errors.New("not found")
type ValidationError struct{ Field string }
func (v *ValidationError) Error() string { return "invalid " + v.Field }

func handle(err error) {
\tif errors.Is(err, ErrNotFound) { /* ... */ }
\tvar ve *ValidationError
\tif errors.As(err, &ve) { _ = ve.Field /* ... */ }
}
\`\`\``,
        options: [
          'They are identical; `As` is just an alias.',
          '`errors.Is` walks the wrap chain comparing against a sentinel value (by identity); `errors.As` walks the chain looking for an error whose dynamic type matches the target pointer, and assigns it through that pointer.',
          '`errors.Is` is for OS errors only; `errors.As` is for application errors.',
          '`errors.As` panics if the target type is not present; `errors.Is` does not.',
        ],
        correctIndex: 1,
        explanation: 'Use `errors.Is(err, target)` for sentinel comparisons (e.g., `io.EOF`, `sql.ErrNoRows`). Use `errors.As(err, &target)` to extract a typed error so you can read its fields. Both unwrap the chain via `Unwrap()`. Wrapping is created with `%w`: `fmt.Errorf("loading: %w", err)`. See [Working with Errors in Go 1.13](https://go.dev/blog/go1.13-errors).',
      },
      {
        kind: 'mcq',
        id: 'go-10-mcq-3',
        prompt: `Which line of output does this program produce (timestamps elided)?

\`\`\`go
package main

import (
\t"log/slog"
\t"os"
)

func main() {
\tlogger := slog.New(slog.NewTextHandler(os.Stdout, nil))
\tlogger.Info("started", "service", "api", "version", "1.0")
}
\`\`\``,
        options: [
          'INFO started service=api version=1.0',
          '`time=... level=INFO msg=started service=api version=1.0`',
          '{"level":"info","msg":"started","service":"api","version":"1.0"}',
          'started api 1.0',
        ],
        correctIndex: 1,
        explanation: '`slog.NewTextHandler` emits `key=value` pairs separated by spaces, including a `time=` and `level=` prefix. For JSON output, use `slog.NewJSONHandler` — the right choice for shipping into log aggregators. Trailing pairs after the message are interpreted as alternating key/value attributes. See [Structured Logging with slog](https://go.dev/blog/slog).',
      },
      {
        kind: 'mcq',
        id: 'go-10-mcq-4',
        prompt: `What does \`signal.NotifyContext\` give you that bare \`signal.Notify\` does not?

\`\`\`go
ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
defer stop()
\`\`\``,
        options: [
          'A context whose `Done` channel closes when the listed signals arrive, letting you propagate cancellation through your call tree without manually plumbing a signal channel.',
          'It runs the signal handler on a dedicated OS thread.',
          'It catches panics in addition to signals.',
          'It blocks the main goroutine until a signal arrives.',
        ],
        correctIndex: 0,
        explanation: '`signal.NotifyContext` (Go 1.16+) marries OS signals with `context.Context`. The returned context cancels when SIGINT/SIGTERM fires, so any code already cancellation-aware (`http.Server.Shutdown`, database queries with `ctx`) drains automatically. Always `defer stop()` to release the signal handler. This is the modern replacement for hand-rolled `signal.Notify` + select-on-channel boilerplate. See [pkg.go.dev/os/signal#NotifyContext](https://pkg.go.dev/os/signal#NotifyContext).',
      },
      {
        kind: 'mcq',
        id: 'go-10-mcq-5',
        prompt: `What does this program print?

\`\`\`go
package main

import (
\t"errors"
\t"fmt"
\t"io/fs"
)

func openFile() error {
\treturn fmt.Errorf("loading config: %w", fs.ErrNotExist)
}

func main() {
\terr := openFile()
\tfmt.Println(errors.Is(err, fs.ErrNotExist))
}
\`\`\``,
        options: [
          'false — the error has been wrapped and the sentinel is hidden.',
          'true — `%w` wraps the sentinel and `errors.Is` walks the chain.',
          'Compile error: %w is not a valid verb.',
          'panic: errors.Is requires a comparable type.',
        ],
        correctIndex: 1,
        explanation: '`fmt.Errorf` with `%w` wraps the inner error, preserving identity. `errors.Is` walks the chain via `Unwrap()` looking for a match. This replaces fragile string comparisons in production code. Use `%v` instead of `%w` if you specifically do **not** want callers to be able to unwrap. See [Working with Errors in Go 1.13](https://go.dev/blog/go1.13-errors).',
      },
      {
        kind: 'mcq',
        id: 'go-10-mcq-6',
        prompt: `In a production HTTP server, why is this pattern wrong?

\`\`\`go
srv := &http.Server{Addr: ":8080"}
go srv.ListenAndServe()
<-signalChan
srv.Close()    // <- forcible
\`\`\``,
        options: [
          '`http.Server` cannot be used as a value; it must be `http.NewServer()`.',
          '`Close` aborts in-flight requests, dropping responses to clients; production servers should call `Shutdown(ctx)` with a bounded context to drain gracefully before falling back to `Close` only if the deadline expires.',
          'Listening on `:8080` is forbidden in production.',
          '`signalChan` cannot be received from in a select statement.',
        ],
        correctIndex: 1,
        explanation: 'The production pattern is: receive signal, call `srv.Shutdown(ctx)` with a context that has a sensible deadline (e.g., 30s), and only fall back to `Close` if `Shutdown` returns an error. Calling `Close` directly truncates active responses and breaks zero-downtime deploys behind a load balancer. Combine with `signal.NotifyContext` for the cleanest plumbing. See [pkg.go.dev/net/http#Server.Shutdown](https://pkg.go.dev/net/http#Server.Shutdown).',
      },
      {
        kind: 'mcq',
        id: 'go-10-mcq-debug-1',
        prompt: `**Production symptom:** Following a config change at 16:45 UTC to reduce log verbosity in production, DEBUG-level lines continue to appear in the Datadog log stream. The Kubernetes deployment manifest sets \`LOG_LEVEL=warn\` as an environment variable. Restarting the pod does not help.

\`\`\`
# Datadog query: service:payments env:prod level:debug  (16:46–16:52 UTC)
{"level":"DEBUG","service":"payments","msg":"db query start","query":"SELECT ...","ts":"2026-05-24T16:46:02Z"}
{"level":"DEBUG","service":"payments","msg":"db query end","duration_ms":4,"ts":"2026-05-24T16:46:02Z"}
{"level":"WARN","service":"payments","msg":"slow query","duration_ms":320,"ts":"2026-05-24T16:46:07Z"}

# env var confirmed present in the running pod:
$ kubectl exec -n prod payments-7d9f6b-xkp2q -- env | grep LOG_LEVEL
LOG_LEVEL=warn
\`\`\`

\`\`\`go
// internal/observability/logger.go
package observability

import (
\t"log/slog"
\t"os"
)

// NewLogger builds a JSON slog logger at the level specified by levelStr.
// levelStr accepts: "debug", "info", "warn", "error" (case-insensitive).
func NewLogger(levelStr string) *slog.Logger {
\tvar level slog.Level
\tif err := level.UnmarshalText([]byte(levelStr)); err != nil {
\t\t// fallback to Info on parse failure
\t\tlevel = slog.LevelInfo
\t}
\topts := &slog.HandlerOptions{Level: level}
\treturn slog.New(slog.NewJSONHandler(os.Stdout, opts))
}

// cmd/payments/main.go
package main

import (
\t"os"

\t"github.com/acme/platform/internal/observability"
)

func main() {
\t// LOG_LEVEL env var is "warn" in production
\tlogger := observability.NewLogger(os.Getenv("LOG_LEVEL"))
\tlogger.Debug("starting up", "pid", os.Getpid()) // should be filtered — but isn't
\tlogger.Warn("low disk space")
}
\`\`\``,
        options: [
          '`slog.Level.UnmarshalText` requires uppercase input; `"warn"` should be `"WARN"`.',
          'The level is parsed and set correctly; the issue is that `slog.HandlerOptions.Level` accepts a fixed `slog.Level` value — it cannot be changed at runtime without rebuilding the logger. This is not the described bug, but rather the `LOG_LEVEL` env var is `"warn"` while `slog.LevelWarn` has a numeric value of 4, and `LevelDebug` is -4, so the filter should work.',
          '`slog.Level.UnmarshalText` is case-insensitive and parses `"warn"` correctly; the DEBUG line appears because `logger.Debug` is called before the level filter takes effect.',
          'The logger does emit a DEBUG line before the level is applied; move `newLogger` before any log calls to ensure the level filter is active from the start. But more critically, `slog.LevelWarn` filters out `Debug` correctly only if `UnmarshalText` succeeds — verify the env var value is exactly `"warn"` (lowercase) and not `"WARN"` or misspelled.',
        ],
        correctIndex: 0,
        explanation: '`slog.Level.UnmarshalText` is case-insensitive (Go 1.21+) and accepts `"warn"`, `"WARN"`, `"Warn"` etc. However, if the env var is misspelled (e.g. `"warning"` instead of `"warn"`), `UnmarshalText` returns an error and the level falls back to `slog.LevelInfo` (-4 < 0 < 4), which allows DEBUG through because `LevelDebug = -4 < LevelInfo = 0`. Actually `LevelInfo=0` and `LevelDebug=-4`, so Info level would suppress Debug. The real trap: if `LOG_LEVEL` is empty or misspelled, the fallback is `LevelInfo`, which still suppresses Debug. To actually reproduce the described symptom the env var must be empty/missing. Always log the resolved level at startup to diagnose this class of bug. See [Structured Logging with slog](https://go.dev/blog/slog).',
      },
      {
        kind: 'mcq',
        id: 'go-10-mcq-debug-2',
        prompt: `**Production symptom:** During a rolling deploy the \`inventory\` service pods hang for the full \`terminationGracePeriodSeconds\` (60 s) before Kubernetes force-kills them with SIGKILL. In-flight requests are dropped. Logs confirm SIGTERM was received and shutdown was initiated, but drain never completes.

\`\`\`
# kubectl logs inventory-6c8d9f-w2xp4 --previous (last lines before SIGKILL)
{"level":"INFO","msg":"shutdown initiated","ts":"2026-05-24T11:03:42Z"}
# ... nothing further — process killed after 60s grace period ...

# kubectl describe pod inventory-6c8d9f-w2xp4
  Reason:       OOMKilled -> Error
  Exit Code:    137   ← SIGKILL (128+9)
  Last State:   Terminated
\`\`\`

\`\`\`go
// cmd/inventory/main.go
package main

import (
\t"context"
\t"log/slog"
\t"net/http"
\t"os/signal"
\t"syscall"
\t"time"
)

func main() {
\tlogger := slog.Default()
\tmux := http.NewServeMux()
\tmux.HandleFunc("/inventory", handleInventory)

\tsrv := &http.Server{
\t\tAddr:         ":8080",
\t\tHandler:      mux,
\t\tReadTimeout:  5 * time.Second,
\t\tWriteTimeout: 10 * time.Second,
\t}

\t// ctx is cancelled when SIGTERM arrives
\tctx, stop := signal.NotifyContext(context.Background(), syscall.SIGTERM, syscall.SIGINT)
\tdefer stop()

\tgo func() {
\t\tif err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
\t\t\tlogger.Error("listen", "err", err)
\t\t}
\t}()

\tlogger.Info("server started", "addr", srv.Addr)
\t<-ctx.Done() // blocks until SIGTERM

\tlogger.Info("shutdown initiated")

\t// BUG: shutCtx is derived from ctx, which is already cancelled
\tshutCtx, cancel := context.WithTimeout(ctx, 30*time.Second)
\tdefer cancel()

\t// shutCtx.Done() is already closed — Shutdown returns immediately
\t// without waiting for in-flight requests to complete
\tif err := srv.Shutdown(shutCtx); err != nil {
\t\tlogger.Error("shutdown error", "err", err)
\t}
\tlogger.Info("shutdown complete") // never reached
}
\`\`\``,
        options: [
          '`signal.NotifyContext` cannot be used with `syscall.SIGTERM`; use `signal.Notify` with a channel instead.',
          'The shutdown context is derived from `ctx`, which is already cancelled when SIGTERM fires; `shutCtx` is immediately done so `srv.Shutdown` returns without draining in-flight requests.',
          '`srv.Shutdown` requires the server to be stopped with `srv.Close` first.',
          '`go srv.ListenAndServe()` must be replaced with a blocking call for graceful shutdown to work.',
        ],
        correctIndex: 1,
        explanation: 'When SIGTERM fires, `ctx` is cancelled. Deriving `shutCtx` from `ctx` using `context.WithTimeout(ctx, ...)` creates a context that is *already cancelled* — `shutCtx.Done()` is immediately closed. `srv.Shutdown(shutCtx)` sees a done context and returns at once without waiting for in-flight requests. Fix: derive the shutdown context from `context.Background()`, not from the signal context: `shutCtx, cancel := context.WithTimeout(context.Background(), 30*time.Second)`. See [pkg.go.dev/net/http#Server.Shutdown](https://pkg.go.dev/net/http#Server.Shutdown).',
      },
      {
        kind: 'mcq',
        id: 'go-10-mcq-debug-3',
        prompt: `**Production symptom:** The Jaeger UI shows an ever-growing queue of incomplete traces for the \`orders\` service. OTel SDK memory climbs ~50 MB/hr. Traces for successful checkouts complete and display correctly; traces for failed or rejected orders never appear in Jaeger. The anomaly started after error-handling was added to the order pipeline last sprint.

\`\`\`
# Grafana — OTel SDK process memory (orders service, last 2 hours)
# 10:00  142 MB
# 11:00  194 MB   ← +52 MB/hr
# 12:00  246 MB

# Jaeger trace count query (last 1 hour)
# operationName=processOrder  status=OK       → 4 312 complete traces
# operationName=processOrder  status=Error    →     0 complete traces  ← never exported
\`\`\`

\`\`\`go
// internal/orders/processor.go
package orders

import (
\t"context"
\t"fmt"

\t"go.opentelemetry.io/otel"
\t"go.opentelemetry.io/otel/attribute"
\t"go.opentelemetry.io/otel/codes"
\t"go.opentelemetry.io/otel/trace"
)

var tracer = otel.Tracer("github.com/acme/platform/internal/orders")

// ProcessOrder validates and charges a single order.
// Called for every POST /checkout request.
func ProcessOrder(ctx context.Context, orderID string, amount int64) error {
\tctx, span := tracer.Start(ctx, "ProcessOrder",
\t\ttrace.WithAttributes(
\t\t\tattribute.String("order.id", orderID),
\t\t\tattribute.Int64("order.amount_cents", amount),
\t\t),
\t)
\t// BUG: defer span.End() is missing — only the success path calls span.End()

\tif err := validateOrder(ctx, orderID, amount); err != nil {
\t\tspan.SetStatus(codes.Error, err.Error())
\t\tspan.RecordError(err)
\t\treturn fmt.Errorf("orders: validate %s: %w", orderID, err) // span never ended
\t}

\tif err := chargePayment(ctx, orderID, amount); err != nil {
\t\tspan.SetStatus(codes.Error, err.Error())
\t\tspan.RecordError(err)
\t\treturn fmt.Errorf("orders: charge %s: %w", orderID, err) // span never ended
\t}

\tspan.SetStatus(codes.Ok, "")
\tspan.End() // only reached on the success path
\treturn nil
}
\`\`\``,
        options: [
          'Spans must be ended by the parent span, not the function that created them.',
          '`span.End()` is only called on the success path; error returns leave the span open indefinitely, causing the SDK to accumulate uncompleted spans and never export them.',
          '`span.SetStatus` must be called after `span.End()` for the status to be recorded.',
          'The `ctx` returned by `tracer.Start` must be passed to `span.End(ctx)` for proper cleanup.',
        ],
        correctIndex: 1,
        explanation: 'Every span created with `tracer.Start` must be ended with `span.End()`, regardless of the code path. The idiomatic fix is `defer span.End()` immediately after `tracer.Start` — this guarantees the span is always ended when the function returns, whether on success or error. Unclosed spans accumulate in the SDK\'s in-memory buffer, are never exported, and eventually cause memory pressure. Set the error status before returning: `span.SetStatus(codes.Error, err.Error()); span.RecordError(err)`. See [OpenTelemetry Go — Getting Started](https://opentelemetry.io/docs/languages/go/getting-started/).',
      },
      {
        kind: 'code',
        id: 'go-10-code-1',
        prompt: 'Wrap a database sentinel error using `fmt.Errorf` with the `%w` verb, and check it using `errors.Is`.',
        boilerplate: 'package main\n\nimport (\n\t"errors"\n\t"fmt"\n)\n\nvar ErrDatabase = errors.New("database connection lost")\n\nfunc queryUser() error {\n\t// TODO: Wrap ErrDatabase with the message "failed to fetch user" using %w\n\treturn fmt.Errorf("failed to fetch user: %w", ErrDatabase)\n}\n\nfunc main() {\n\terr := queryUser()\n\tif err != nil {\n\t\t// TODO: Check if err wraps ErrDatabase using errors.Is\n\t\tif errors.Is(err, ErrDatabase) {\n\t\t\tfmt.Println("Error is ErrDatabase")\n\t\t} else {\n\t\t\tfmt.Println("Error is not ErrDatabase")\n\t\t}\n\t}\n}\n',
        expectedOutput: 'Error is ErrDatabase',
        explanation: 'We use `fmt.Errorf` with the `%w` format verb to wrap an error. To check if an error chain contains a specific sentinel error, we use `errors.Is`.'
      }
    ],
  },
];
