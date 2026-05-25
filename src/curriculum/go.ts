import type { Phase } from './types';

export const goPhases: Phase[] = [
  {
    id: 'go-1',
    language: 'go',
    level: 1,
    title: 'Go Basics — Packages, Zero Values, and Error Returns',
    timeEstimate: '4-6 hours',
    intro: `By the end of this phase, you'll read short Go programs and predict their runtime output — focusing on the things that bite newcomers: unused imports/variables as hard compile errors, zero values, and the \`if err != nil\` return pattern that pervades every API. You'll learn the package system, the basic types, and how \`go run\`/\`go build\`/\`go fmt\`/\`go vet\` fit together.

To build the muscle, you'll write locally: a \`greet\` CLI that parses a \`-name\` flag with \`flag.String\` and prints a greeting alongside \`time.Now()\`. Bootstrap with \`go mod init example.com/greet\`, then \`go run main.go -name=Ada\`. Use \`fmt.Printf("%T\\n", x)\` whenever you want to confirm a value's type — no IDE required.`,
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
    ],
  },
];
