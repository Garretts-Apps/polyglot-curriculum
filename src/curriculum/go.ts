import type { Phase } from './types';

export const goPhases: Phase[] = [
  {
    id: 'go-1',
    language: 'go',
    level: 1,
    title: 'Go Basics — Setup, Packages, Types, and Errors',
    timeEstimate: '4-6 hours',
    intro: `Go is a statically typed, compiled language designed for simplicity and productivity. In this phase you will install the toolchain, understand the package system, learn the basic types, write control flow, declare functions, and handle errors the idiomatic Go way — checking \`if err != nil\`.

Your deliverable is a \`greet\` CLI: parse a \`-name\` flag with \`flag.String\` and print a greeting alongside \`time.Now()\`. Work through A Tour of Go (chapters 1 and the basics section) to build your mental model. Every Go program starts with \`package main\` and a \`main()\` function. The compiler enforces that every import is used and every declared variable is used — lean into these constraints early.`,
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
        explanation: 'The Go compiler treats an unused import as a hard error. This keeps code clean and forces you to remove dead imports immediately. See [Effective Go — Names](https://go.dev/doc/effective_go#names) for the rationale behind these constraints.',
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
        explanation: '`:=` is the short variable declaration operator. It both declares a new variable and assigns its initial value, with the type inferred from the right-hand side. See [Tour of Go — Short variable declarations](https://go.dev/tour/basics/10).',
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
        explanation: '`fmt.Println` formats `float64(5)` as `5` (no trailing `.0` unless needed for precision). The second call returns an error, which is printed via its `Error()` method. This is the canonical Go error pattern documented in [Error handling and Go](https://go.dev/blog/error-handling-and-go).',
      },
      {
        kind: 'mcq',
        id: 'go-1-mcq-4',
        prompt: `What is the value of \`sum\` after this program runs?

\`\`\`go
package main

import "fmt"

func main() {
\tsum := 0
\tfor i := 1; i <= 10; i++ {
\t\tsum += i
\t}
\tfmt.Println(sum)
}
\`\`\``,
        options: [
          '45',
          '55',
          '100',
          '11',
        ],
        correctIndex: 1,
        explanation: 'The loop adds 1+2+...+10 = 55. Note Go only has one loop keyword — `for` — which subsumes while-loops and infinite loops. See [Tour of Go — For](https://go.dev/tour/flowcontrol/1).',
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
        explanation: 'Go enforces that every declared local variable be used. This catches typos and dead code early. The fix is to either remove `x` or actually reference it. Constants and globals are exempt. See [Effective Go — Declarations and Initializations](https://go.dev/doc/effective_go).',
      },
      {
        kind: 'mcq',
        id: 'go-1-mcq-6',
        prompt: `What does this program print?

\`\`\`go
package main

import "fmt"

func main() {
\tvar s string
\tvar i int
\tvar b bool
\tfmt.Println(s, i, b)
}
\`\`\``,
        options: [
          'nil 0 false',
          '"" 0 false',
          ' 0 false',
          'undefined undefined undefined',
        ],
        correctIndex: 2,
        explanation: 'Go zero-initialises every variable. The zero value for `string` is `""` (the empty string), for `int` it is `0`, and for `bool` it is `false`. `fmt.Println` prints the empty string as nothing, separated by spaces — so the output starts with a leading space before `0`. See [Tour of Go — Zero values](https://go.dev/tour/basics/12).',
      },
    ],
  },

  {
    id: 'go-2',
    language: 'go',
    level: 2,
    title: 'Structs, Methods, Interfaces, Slices, and Maps',
    timeEstimate: '5-7 hours',
    intro: `Go does not have classes. Instead it has structs with methods and interfaces that are satisfied implicitly. This phase covers how to define types with struct, attach behaviour with methods, express contracts with interfaces, and work with Go's two most-used composite types — slices and maps.

Your deliverable is a \`wordcount\` CLI using \`bufio.Scanner\` over stdin and a \`map[string]int\` for counts, with sorted output. Understanding interface satisfaction is crucial: if a type has all the methods an interface requires, it automatically satisfies it — no \`implements\` keyword. Embedding lets you compose types by including one struct inside another, promoting its fields and methods.`,
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
        prompt: 'How does a type satisfy an interface in Go?',
        options: [
          'By using the `implements` keyword in the type declaration.',
          'By registering with a central interface registry at init time.',
          'Automatically, by having all the methods the interface requires.',
          'By embedding the interface struct inside the type.',
        ],
        correctIndex: 2,
        explanation: 'Go uses structural (implicit) interface satisfaction. Any type that has all the required methods satisfies the interface — no declaration needed. See [Effective Go — Interfaces](https://go.dev/doc/effective_go#interfaces).',
      },
      {
        kind: 'mcq',
        id: 'go-2-mcq-2',
        prompt: 'What happens when you access a key that does not exist in a Go map?',
        options: [
          'A panic is raised.',
          'An error is returned as the second return value.',
          "The zero value of the map's value type is returned.",
          'nil is always returned regardless of value type.',
        ],
        correctIndex: 2,
        explanation: 'Go maps return the zero value for the value type when a key is missing. Use the two-value form `v, ok := m[key]` to distinguish a missing key from a key whose value is the zero value. See [Go Maps in action](https://go.dev/blog/maps).',
      },
      {
        kind: 'mcq',
        id: 'go-2-mcq-3',
        prompt: `What does this program print?

\`\`\`go
package main

import "fmt"

type Person struct {
\tName string
\tAge  int
}

func (p Person) String() string {
\treturn fmt.Sprintf("Name: %s, Age: %d", p.Name, p.Age)
}

func main() {
\tp := Person{Name: "Alice", Age: 30}
\tfmt.Println(p)
}
\`\`\``,
        options: [
          '{Alice 30}',
          'Name: Alice, Age: 30',
          'Person{Name:"Alice", Age:30}',
          '&{Alice 30}',
        ],
        correctIndex: 1,
        explanation: '`fmt.Println` checks whether the value implements `fmt.Stringer` (a `String() string` method). Since `Person` satisfies it, `Println` calls `String()` instead of using the default struct format. See [pkg.go.dev/fmt#Stringer](https://pkg.go.dev/fmt#Stringer).',
      },
      {
        kind: 'mcq',
        id: 'go-2-mcq-4',
        prompt: `What does \`len(s)\` print after this program runs?

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
        explanation: '`make([]int, 3, 10)` creates a slice with length 3 (three zero ints) and capacity 10. Appending three more elements grows the length to 6 but keeps the same backing array, so capacity remains 10. See [Go Slices: usage and internals](https://go.dev/blog/slices-intro).',
      },
      {
        kind: 'mcq',
        id: 'go-2-mcq-5',
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
\tfmt.Println(c.n)        // line D
}
\`\`\``,
        options: [
          'Line A — the receiver should be named differently.',
          'Line A — `Inc` uses a value receiver, so `c.n++` mutates a copy and the caller sees no change.',
          'Line C — methods cannot be called on struct values.',
          'Line D — `c.n` is unexported and cannot be accessed from main.',
        ],
        correctIndex: 1,
        explanation: 'Value receivers operate on a copy of the receiver. To mutate the original, declare `func (c *Counter) Inc()` with a pointer receiver. `c.n` is accessible because `Counter` and `main` are in the same package — capitalisation only matters across package boundaries. See [Effective Go — Pointers vs. Values](https://go.dev/doc/effective_go#pointers_vs_values).',
      },
      {
        kind: 'mcq',
        id: 'go-2-mcq-6',
        prompt: `What does this program print?

\`\`\`go
package main

import "fmt"

func main() {
\tm := map[string]int{}
\tn := m["missing"]
\tv, ok := m["missing"]
\tfmt.Println(n, v, ok)
}
\`\`\``,
        options: [
          '0 0 false',
          'nil nil false',
          '0 0 true',
          'panic: missing key',
        ],
        correctIndex: 0,
        explanation: 'Map lookups never panic on missing keys. The single-value form returns the zero value (`0` for int). The two-value form returns the zero value plus a boolean `ok` indicating presence. Both `n` and `v` are 0; `ok` is `false`. See [Go Maps in action](https://go.dev/blog/maps).',
      },
    ],
  },

  {
    id: 'go-3',
    language: 'go',
    level: 3,
    title: 'Concurrency — Goroutines, Channels, Select, and Context',
    timeEstimate: '6-8 hours',
    intro: `Go's concurrency model is built on goroutines (lightweight threads managed by the runtime) and channels (typed conduits for communication). The mantra is: *"Do not communicate by sharing memory; instead, share memory by communicating."*

Your deliverable is a \`dl\` CLI that downloads N URLs concurrently via goroutines and a \`chan result\`, then prints status. This phase covers A Tour of Go chapter 3 — goroutines, buffered and unbuffered channels, channel direction, the select statement — plus \`context.Context\`, which is the idiomatic way to carry deadlines, cancellation signals, and request-scoped values across API boundaries.`,
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
        prompt: 'What happens when you send to an unbuffered channel and no goroutine is ready to receive?',
        options: [
          'The value is dropped silently.',
          'A panic is raised immediately.',
          'The sending goroutine blocks until a receiver is ready.',
          'The value is queued in an implicit buffer.',
        ],
        correctIndex: 2,
        explanation: "Unbuffered channels provide synchronous communication: the sender blocks until a receiver is ready, and vice versa. This is the basis of Go's CSP-style synchronisation. See [Tour of Go — Channels](https://go.dev/tour/concurrency/2).",
      },
      {
        kind: 'mcq',
        id: 'go-3-mcq-2',
        prompt: 'What is the purpose of `context.WithCancel`?',
        options: [
          'It creates a context that automatically cancels after a fixed duration.',
          'It returns a derived context and a cancel function; calling cancel signals all code holding the context to stop work.',
          'It cancels the current goroutine without propagating to children.',
          'It replaces panic/recover for error propagation across goroutines.',
        ],
        correctIndex: 1,
        explanation: "`context.WithCancel` returns a child context and a `CancelFunc`. Calling `CancelFunc` closes the context's `Done` channel, signalling all holders to abandon their work. See [Go Concurrency Patterns: Context](https://go.dev/blog/context).",
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
        explanation: 'The Go spec mandates that when multiple `select` cases can proceed, one is chosen via a uniform pseudo-random selection. Even though both channels are buffered and ready, you cannot predict which message arrives first. See [Go spec — Select statements](https://go.dev/ref/spec#Select_statements).',
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
        explanation: 'The 1ms timeout fires long before `time.After(10ms)`. The `ctx.Done()` channel closes first, so the select takes that case and prints `timeout`. This pattern — racing a deadline against work — is the canonical use of `context.WithTimeout`. See [pkg.go.dev/context](https://pkg.go.dev/context).',
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
        explanation: 'Receiving from a closed channel never blocks: it returns the zero value of the element type and `ok = false`. Sending on a closed channel, however, panics. This asymmetry is what enables `for range ch` loops to terminate cleanly. See [Tour of Go — Range and Close](https://go.dev/tour/concurrency/4).',
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
        explanation: '`counter++` is read-modify-write on shared state without a mutex or atomic, so 1000 goroutines racing on it constitutes a data race. Run with `go run -race` to confirm. Fix with `sync.Mutex` or `atomic.AddInt64`. See [Introducing the Go Race Detector](https://go.dev/blog/race-detector).',
      },
    ],
  },

  {
    id: 'go-4',
    language: 'go',
    level: 4,
    title: 'Standard Library — HTTP, JSON, Testing, and Modules',
    timeEstimate: '6-8 hours',
    intro: `Go ships with a rich standard library. This phase focuses on four pillars: \`net/http\` for building and calling HTTP servers, \`encoding/json\` for marshalling and unmarshalling JSON, the \`testing\` package for unit tests and table-driven tests, and Go modules (\`go.mod\`) for dependency management.

Your deliverable is a small HTTP server using \`net/http\` with \`/health\` and \`/echo\` routes plus table-driven tests. Table-driven tests are idiomatic Go: define a slice of test-case structs, loop over them, and call \`t.Run\` for each — giving you clear failure messages and the ability to run individual cases with \`-run\`. Use \`context.Context\` as the first parameter of any function performing I/O.`,
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
        prompt: 'Which struct tag controls the JSON key name for a field?',
        options: [
          '`json:"fieldname"`',
          '`json_key:"fieldname"`',
          '`marshal:"fieldname"`',
          '`encode:"fieldname"`',
        ],
        correctIndex: 0,
        explanation: 'The `json:"fieldname"` struct tag tells `encoding/json` to use "fieldname" as the key when marshalling/unmarshalling. Adding `,omitempty` skips zero-value fields. See [pkg.go.dev/encoding/json](https://pkg.go.dev/encoding/json).',
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
        explanation: '`go get example.com/pkg` resolves the latest compatible version, adds it to go.mod, and updates go.sum. `go install` is for installing binary tools, not library dependencies. See [Using Go Modules](https://go.dev/blog/using-go-modules).',
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
        explanation: '`omitempty` causes the encoder to skip the field when it holds its zero value. Since `Age` was unset (zero), it is omitted entirely. Without `omitempty`, the output would be `{"name":"Alice","age":0}`. See [JSON and Go](https://go.dev/blog/json).',
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
        explanation: 'Go 1.22 introduced method-aware patterns like `"POST /hello"`. When the path matches but the method does not, the default mux responds with 405 Method Not Allowed. See [pkg.go.dev/net/http#ServeMux](https://pkg.go.dev/net/http#ServeMux).',
      },
      {
        kind: 'mcq',
        id: 'go-4-mcq-5',
        prompt: `What does this program print? Assume \`s\` decodes successfully.

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
        explanation: 'By default `json.Unmarshal` silently ignores unknown JSON keys. Use `dec := json.NewDecoder(r); dec.DisallowUnknownFields()` to make unknown fields an error. See [pkg.go.dev/encoding/json#Decoder.DisallowUnknownFields](https://pkg.go.dev/encoding/json#Decoder.DisallowUnknownFields).',
      },
      {
        kind: 'mcq',
        id: 'go-4-mcq-6',
        prompt: `Which of these is the idiomatic structure for a table-driven test?

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
\`\`\`

Why is \`t.Run(tc.name, ...)\` important here?`,
        options: [
          'It is required for the test to compile.',
          'It runs each case in parallel.',
          'It creates a sub-test so failures report which case failed, and you can target a single case with `go test -run TestAdd/positive`.',
          'It resets `*testing.T` between iterations to prevent state leakage.',
        ],
        correctIndex: 2,
        explanation: '`t.Run` registers a sub-test under the parent test name. Failures include the sub-test name, and you can run individual sub-tests with `-run TestAdd/positive`. To run sub-tests in parallel, call `t.Parallel()` inside the closure. See [Table-driven tests](https://go.dev/wiki/TableDrivenTests).',
      },
    ],
  },

  {
    id: 'go-5',
    language: 'go',
    level: 5,
    title: 'Advanced Concurrency — sync, atomic, errgroup, and the Memory Model',
    timeEstimate: '7-9 hours',
    intro: `Beyond channels, Go provides low-level synchronisation primitives in the \`sync\` and \`sync/atomic\` packages. \`sync.Mutex\` and \`sync.RWMutex\` protect shared state. \`sync.WaitGroup\` coordinates goroutine completion. \`sync.Once\` runs initialization exactly once. \`sync.Cond\` enables condition-variable-style waiting.

This phase deepens the L3 deliverable — extend your \`dl\` worker pool with bounded parallelism, mutex-protected stats, and cancellation propagation. The Go memory model defines when one goroutine is guaranteed to see writes made by another. Without synchronisation, the compiler and CPU can reorder operations. Running the race detector (\`go test -race\` or \`go run -race\`) is non-negotiable. The \`golang.org/x/sync/errgroup\` package combines WaitGroup with error propagation and \`context.Context\` cancellation.`,
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
        prompt: 'When should you prefer `sync.RWMutex` over `sync.Mutex`?',
        options: [
          'When all accesses to the shared resource are writes.',
          'When reads are far more frequent than writes and reads are safe to run concurrently.',
          'When you need to lock across multiple goroutines simultaneously.',
          'RWMutex is always faster than Mutex so it should always be preferred.',
        ],
        correctIndex: 1,
        explanation: '`RWMutex` allows multiple concurrent readers (`RLock`) but only one writer (`Lock`). It is more expensive than `Mutex`, so it only wins when reads dominate and contention is real. Profile before reaching for it. See [pkg.go.dev/sync#RWMutex](https://pkg.go.dev/sync#RWMutex).',
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
        explanation: '`sync.Once` ensures `f` is executed exactly once, regardless of how many goroutines call `Do` concurrently. Subsequent calls are no-ops. All callers block until the first invocation completes. See [pkg.go.dev/sync#Once](https://pkg.go.dev/sync#Once).',
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
        explanation: 'Before Go 1.22 the loop variable `i` was shared across iterations, so goroutines reading `i` after the loop ended saw `5`. Go 1.22 changed this so each iteration has its own `i`. For pre-1.22 portability, always pass loop variables as arguments: `go func(i int){...}(i)`. See [Go 1.22 release notes](https://go.dev/doc/go1.22#language).',
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
        explanation: 'Atomic operations are race-free by construction. Every `AddInt64` is an atomic read-modify-write, so 10 goroutines × 100 increments = exactly 1000. Use `atomic.LoadInt64` to read atomically. See [pkg.go.dev/sync/atomic](https://pkg.go.dev/sync/atomic).',
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
        explanation: 'Go mutexes are explicitly **not reentrant**. Locking the same `sync.Mutex` twice on the same goroutine deadlocks. If you need re-entry, restructure the code or use a `sync.RWMutex` with read locks. See [pkg.go.dev/sync#Mutex](https://pkg.go.dev/sync#Mutex).',
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
    intro: `Go 1.18 introduced generics via type parameters. A generic function or type is parameterised over a set of types expressed as a *constraint* (an interface). The compiler infers type arguments in most call sites so you rarely write them explicitly.

Your deliverable is a generic \`Set[T comparable]\` container with \`Add\`, \`Has\`, \`Remove\`, \`Union\` and a CLI demo. The key judgment is knowing *when not* to use generics: prefer them when you have type-safe containers or algorithms over multiple types, but avoid them when interfaces or code generation would be simpler. The official introduction blog post is the authoritative guide.`,
    topics: [
      { label: 'An Introduction to Generics', url: 'https://go.dev/blog/intro-generics', note: 'Official blog: type parameters, constraints, type sets' },
      { label: 'Tutorial: Getting started with generics', url: 'https://go.dev/doc/tutorial/generics', note: 'Step-by-step walkthrough' },
      { label: 'constraints package (golang.org/x/exp)', url: 'https://pkg.go.dev/golang.org/x/exp/constraints', note: 'Ordered, Integer, Float, Complex pre-built constraints' },
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
        explanation: '`comparable` is a built-in constraint that includes all types that support `==` and `!=`. This is necessary to use a type parameter as a map key. Note: `comparable` does **not** include ordering — for `<`/`>` use `cmp.Ordered` (Go 1.21+). See [pkg.go.dev/cmp](https://pkg.go.dev/cmp).',
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
        explanation: 'If you need to store values of different types together at runtime (e.g., `[]Animal` holding both `Dog` and `Cat`), an interface is the right tool. Generics are instantiated per type at compile time, so a `[]T` is a homogeneous slice. See [When To Use Generics](https://go.dev/blog/when-generics).',
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
        explanation: 'Type inference deduces `T = int` from the slice argument, so the explicit `Filter[int](...)` is unnecessary. The predicate keeps even numbers, producing `[2 4 6]`. See [Tour of Go — Generics](https://go.dev/tour/generics/1).',
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
        explanation: 'The tilde `~float64` in the union means "any type whose underlying type is `float64`", so `Celsius` (defined as `type Celsius float64`) satisfies `Number`. Sum returns `61` (a `Celsius`, which prints as a number). Without `~`, you would have to convert. See [An Introduction to Generics](https://go.dev/blog/intro-generics).',
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
        explanation: 'A stack is LIFO. After `Push("a"); Push("b")`, the slice is `["a","b"]`. `Pop` removes the last element, returning `"b"`. Returning `zero` (the type-parameter zero value) is the idiomatic way to handle empty containers in generic code.',
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
        explanation: 'Type-parameter operations are restricted to those supported by *every* type in the constraint. `any` allows every type, including those without ordering, so `>` is rejected. Use `cmp.Ordered` (Go 1.21+) or `~int | ~float64 | ~string`. See [pkg.go.dev/cmp#Ordered](https://pkg.go.dev/cmp#Ordered).',
      },
    ],
  },

  {
    id: 'go-7',
    language: 'go',
    level: 7,
    title: 'Reflection, go generate, and AST Manipulation',
    timeEstimate: '6-8 hours',
    intro: `The \`reflect\` package lets you inspect and manipulate Go values at runtime — their type, kind, fields, and methods. It is powerful but slow; prefer it only when static typing is insufficient (e.g., serialisation frameworks, dependency injection, ORM-style code).

Your deliverable is a \`go:generate\` driven enum-stringer style code generator, invoked via \`go generate ./...\`. \`go generate\` is a build tool directive: embed \`//go:generate cmd args\` in source files and run \`go generate ./...\` to invoke code generators. The \`go/ast\`, \`go/parser\`, and \`go/token\` packages in the standard library expose Go's AST for writing your own tools — linters, doc generators, and scaffolding scripts.`,
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
        explanation: '`CanSet` returns false when the Value is not addressable (you must pass a pointer and call `.Elem()`) AND for unexported fields even on addressable structs. Both conditions must be met for a field to be settable. See [The Laws of Reflection](https://go.dev/blog/laws-of-reflection).',
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
        explanation: '`go generate` is NOT part of `go build`. It is a separate command that reads `//go:generate` directives and runs the specified tool. Developers run it deliberately when they need to regenerate code. See [go generate](https://go.dev/blog/generate).',
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
        explanation: '`reflect.Type.Name()` returns the declared name of a *named* type. `[]int` has no name (it is a composite type), so `Name()` returns the empty string — but `Kind()` is `slice`. For the full type representation use `t.String()`, which prints `[]int`. See [pkg.go.dev/reflect#Type](https://pkg.go.dev/reflect#Type).',
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
        explanation: '`StructField.IsExported()` (Go 1.17+) is the canonical way to skip unexported fields. `debug` (lowercase) is unexported, so it is filtered out. Attempting `v.Field(i).Interface()` on an unexported field would panic — guard with `IsExported`. See [pkg.go.dev/reflect#StructField](https://pkg.go.dev/reflect#StructField).',
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
        explanation: '`go/format.Source` applies `gofmt` to a source byte slice. Generators routinely emit slightly-imperfect whitespace; piping through `format.Source` produces idiomatic output and surfaces syntax errors immediately. If `format.Source` errors, your template emitted invalid Go. See [pkg.go.dev/go/format](https://pkg.go.dev/go/format).',
      },
    ],
  },

  {
    id: 'go-8',
    language: 'go',
    level: 8,
    title: 'Cgo — Calling C from Go and Go from C',
    timeEstimate: '5-7 hours',
    intro: `Cgo lets Go packages call C functions and C code call Go functions. It is the bridge for using C libraries (SQLite, OpenSSL, platform APIs) from Go. Cgo has a real cost: it disables certain Go tooling, increases build times, complicates cross-compilation, and has non-trivial overhead per call.

This phase's deliverable is exploratory rather than CLI-shaped — build a small Cgo example that wraps a C function (e.g., libcrypto, sqlite3, or a hand-written shared library) and document the pointer-passing and build-tag implications. Understanding when *not* to use Cgo is as important as knowing how. For pure-Go replacements of common C libraries, prefer Go implementations. Use Cgo when you must — for OS-level APIs, hardware drivers, or pre-existing C libraries with no Go equivalent.`,
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
          'Go pointers can be passed to C only if the Go memory they point to does not contain any Go pointers.',
          'All Go pointers must be converted to uintptr before passing to C.',
          'C functions must not store the Go pointer beyond the duration of the C call.',
        ],
        correctIndex: 1,
        explanation: 'The key Cgo pointer rule: a Go pointer passed to C must not point to Go memory that contains other Go pointers. The Go GC can move/track Go pointers, and C must not observe them. C also must not retain the Go pointer past the call. See [Cgo pointer passing rules](https://pkg.go.dev/cmd/cgo#hdr-Passing_pointers).',
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
        explanation: 'Cgo requires a C compiler (gcc/clang) for the target architecture and OS. In typical cross-compile setups you only have a compiler for the build host, making `CGO_ENABLED=0` the common workaround. See [Cgo documentation](https://pkg.go.dev/cmd/cgo).',
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
        explanation: '`"Hello, Cgo!"` is 11 bytes (`H-e-l-l-o-,-space-C-g-o-!`). `C.strlen` returns the length excluding the NUL terminator. The `defer C.free` is critical — `C.CString` allocates with `malloc`, and the Go GC will never reclaim it. See [Cgo documentation — Go references to C](https://pkg.go.dev/cmd/cgo).',
      },
      {
        kind: 'mcq',
        id: 'go-8-mcq-4',
        prompt: 'What build tag disables Cgo entirely, allowing pure-Go cross-compilation?',
        options: [
          '`//go:build !cgo`',
          '`CGO_ENABLED=0` environment variable during `go build`',
          '`//go:build pure`',
          '`go build -nocgo`',
        ],
        correctIndex: 1,
        explanation: 'Setting `CGO_ENABLED=0` in the environment before invoking `go build` disables Cgo globally. The standard library then uses Go-only fallbacks (e.g., pure-Go DNS resolver). There is no `-nocgo` flag. See [go command environment variables](https://pkg.go.dev/cmd/go#hdr-Environment_variables).',
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
        explanation: 'The Go garbage collector knows nothing about memory allocated by `C.CString` (or any C `malloc`). You must pair every `C.CString` with a `C.free` — `defer` is the canonical pattern. The same applies to `C.CBytes`. See [Cgo documentation](https://pkg.go.dev/cmd/cgo).',
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
    intro: `Go's performance tooling is built into the standard toolchain. The \`testing.B\` type powers micro-benchmarks run with \`go test -bench\`. The \`testing.F\` type (Go 1.18+) powers coverage-guided fuzzing. \`pprof\` captures CPU and memory profiles that can be visualised with \`go tool pprof\`.

Your deliverable is a benchmark suite using \`testing.B\` and \`pprof\` for a sorting function, including a flame graph. Escape analysis determines whether a value lives on the stack or heap. Heap allocations cost more — they pressure the garbage collector. Use \`go build -gcflags="-m"\` to see what escapes. Knowing these tools turns guesswork into measurement. Use \`log/slog\` (not the legacy \`log\` package) for any logging in your benchmark scaffolding.`,
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
        explanation: '`b.ResetTimer()` is called after setup code (allocating test data, opening files, etc.) to exclude that time from the benchmark measurement. Only the time spent in the `for i := 0; i < b.N; i++` loop is reported. See [pkg.go.dev/testing#hdr-Benchmarks](https://pkg.go.dev/testing#hdr-Benchmarks).',
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
        explanation: "Escape analysis runs at compile time. If the compiler can prove a variable's lifetime is bounded by the enclosing function, it goes on the stack (fast, no GC pressure). If it might outlive the function (returned pointer, captured in closure, passed to interface), it escapes to the heap. See [GC Guide](https://go.dev/doc/gc-guide).",
      },
      {
        kind: 'mcq',
        id: 'go-9-mcq-3',
        prompt: `What does this program print?

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
          '1000',
          '2000',
          '2002',
          '0',
        ],
        correctIndex: 1,
        explanation: '`"go"` is 2 bytes, written 1000 times = 2000 bytes. `strings.Builder` grows its internal buffer geometrically without re-allocating on every write — this is why it crushes naive `+=` concatenation in benchmarks. See [pkg.go.dev/strings#Builder](https://pkg.go.dev/strings#Builder).',
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
        explanation: '`s` would normally live on the stack, but taking its address and returning it means the pointer outlives the function. The compiler proves this with escape analysis and promotes `s` to the heap. Use `go build -gcflags="-m"` to see "moved to heap: s". See [GC Guide](https://go.dev/doc/gc-guide).',
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
        explanation: 'The benchmark harness calls your function with progressively larger `b.N` until the elapsed time crosses a target (default 1s, override with `-benchtime`). It then divides time by `b.N` to report ns/op. Never assume `b.N` is small. See [pkg.go.dev/testing#hdr-Benchmarks](https://pkg.go.dev/testing#hdr-Benchmarks).',
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
        explanation: '`go test` runs the fuzz target on seed inputs by default. `go test -fuzz=FuzzReverse` enters fuzz mode: the harness mutates inputs using coverage feedback and saves failing cases to `testdata/fuzz/FuzzReverse/`. Fuzzing was added in Go 1.18. See [Go Fuzzing](https://go.dev/doc/fuzz/).',
      },
    ],
  },

  {
    id: 'go-10',
    language: 'go',
    level: 10,
    title: 'Production Patterns — Observability, Structured Logging, gRPC, and Lifecycle',
    timeEstimate: '8-10 hours',
    intro: `Production Go services require more than correct logic. This phase covers: \`log/slog\` (Go 1.21) for structured, levelled logging; OpenTelemetry Go for distributed tracing and metrics; graceful HTTP shutdown with context and OS signals; and gRPC for high-performance inter-service communication.

Your deliverable is a production-style microservice skeleton with \`slog\`, OpenTelemetry, graceful shutdown, and a Dockerfile. Graceful shutdown is a common production gap: when Kubernetes sends SIGTERM, your server should stop accepting new connections, drain in-flight requests, and exit cleanly. Understanding the server lifecycle — from \`ListenAndServe\` to \`Shutdown(ctx)\` — is essential for zero-downtime deployments. Always use error wrapping with \`%w\` so callers can \`errors.Is\`/\`errors.As\` your errors.`,
    topics: [
      { label: 'log/slog package', url: 'https://pkg.go.dev/log/slog', note: 'Structured, levelled logging built into Go 1.21+' },
      { label: 'OpenTelemetry Go — Getting Started', url: 'https://opentelemetry.io/docs/languages/go/getting-started/', note: 'Traces, metrics, and logs with the OTel Go SDK' },
      { label: 'net/http — Server.Shutdown', url: 'https://pkg.go.dev/net/http#Server.Shutdown', note: 'Graceful shutdown: drain requests, close listeners' },
      { label: 'gRPC Go quick start', url: 'https://grpc.io/docs/languages/go/quickstart/', note: 'Protocol Buffers, generated stubs, server and client' },
      { label: 'os/signal package', url: 'https://pkg.go.dev/os/signal', note: 'signal.NotifyContext for SIGTERM/SIGINT handling' },
      { label: 'Structured Logging with slog', url: 'https://go.dev/blog/slog', note: 'Official blog announcing and explaining slog' },
      { label: 'Working with Errors in Go 1.13', url: 'https://go.dev/blog/go1.13-errors', note: 'errors.Is, errors.As, and the %w verb for wrapping' },
    ],
    deliverable: 'Build locally: a production-style microservice skeleton with slog, OpenTelemetry, graceful shutdown, and Dockerfile.',
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
        explanation: '`Shutdown` is graceful: it closes the listener (refusing new connections) but lets in-flight requests complete until the context expires or all requests finish. `Close` forcibly closes all connections immediately. See [pkg.go.dev/net/http#Server.Shutdown](https://pkg.go.dev/net/http#Server.Shutdown).',
      },
      {
        kind: 'mcq',
        id: 'go-10-mcq-2',
        prompt: 'In OpenTelemetry, what is a "span"?',
        options: [
          'A time window for aggregating metrics.',
          'A named, timed operation representing a unit of work within a distributed trace.',
          'A sampling configuration that controls what percentage of requests are traced.',
          'A connection pool configuration for exporting telemetry data.',
        ],
        correctIndex: 1,
        explanation: 'A span represents a single unit of work or operation. Spans have a name, start/end timestamps, attributes, and can be nested. A tree of spans forms a trace, visualising the path of a request through a distributed system. See [OpenTelemetry Go — Getting Started](https://opentelemetry.io/docs/languages/go/getting-started/).',
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
        explanation: '`slog.NewTextHandler` emits `key=value` pairs separated by spaces, including a `time=` and `level=` prefix. For JSON output, use `slog.NewJSONHandler`. Trailing pairs after the message are interpreted as alternating key/value attributes. See [Structured Logging with slog](https://go.dev/blog/slog).',
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
        explanation: '`signal.NotifyContext` (Go 1.16+) marries OS signals with `context.Context`. The returned context cancels when SIGINT/SIGTERM fires, so any code already cancellation-aware (`http.Server.Shutdown`, database queries with `ctx`) drains automatically. Always `defer stop()` to release resources. See [pkg.go.dev/os/signal#NotifyContext](https://pkg.go.dev/os/signal#NotifyContext).',
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
        explanation: '`fmt.Errorf` with `%w` wraps the inner error, preserving identity. `errors.Is` walks the chain via `Unwrap()` looking for a match. This replaces fragile string comparisons in production code. Pair with `errors.As` to extract typed errors. See [Working with Errors in Go 1.13](https://go.dev/blog/go1.13-errors).',
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
        explanation: 'The production pattern is: receive signal, call `srv.Shutdown(ctx)` with a context that has a sensible deadline (e.g., 30s), and only fall back to `Close` if `Shutdown` returns an error. Calling `Close` directly truncates active responses and breaks zero-downtime deploys. See [pkg.go.dev/net/http#Server.Shutdown](https://pkg.go.dev/net/http#Server.Shutdown).',
      },
    ],
  },
];
