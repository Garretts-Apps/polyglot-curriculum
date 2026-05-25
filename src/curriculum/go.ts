import type { Phase } from './types';

export const goPhases: Phase[] = [
  {
    id: 'go-1',
    language: 'go',
    level: 1,
    title: 'Go Basics — Setup, Packages, Types, and Errors',
    timeEstimate: '4-6 hours',
    intro: `Go is a statically typed, compiled language designed for simplicity and productivity. In this phase you will install the toolchain, understand the package system, learn the basic types, write control flow, declare functions, and handle errors the idiomatic Go way — checking \`if err != nil\`.

Work through A Tour of Go (chapters 1 and the basics section) to build your mental model. Every Go program starts with \`package main\` and a \`main()\` function. The compiler enforces that every import is used and every declared variable is used — lean into these constraints early.`,
    topics: [
      { label: 'Installing Go', url: 'https://go.dev/doc/install', note: 'Official install guide for all platforms' },
      { label: 'A Tour of Go — Basics', url: 'https://go.dev/tour/basics/1', note: 'Interactive tour of packages, variables, functions' },
      { label: 'Go Specification — Types', url: 'https://go.dev/ref/spec#Types', note: 'Full type system specification' },
      { label: 'Effective Go', url: 'https://go.dev/doc/effective_go', note: 'Canonical style and idiom guide' },
      { label: 'Error handling and Go', url: 'https://go.dev/blog/error-handling-and-go', note: 'Official blog post on if err != nil pattern' },
      { label: 'pkg fmt', url: 'https://pkg.go.dev/fmt', note: 'Standard formatting and printing package' },
    ],
    deliverable: 'A standalone `package main` program that declares variables of multiple types, performs arithmetic, uses a for-loop, defines a function that returns (value, error), and prints results with fmt.Println.',
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
        explanation: 'The Go compiler treats an unused import as a hard error. This keeps code clean and forces you to remove dead imports immediately.',
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
        explanation: '`:=` is the short variable declaration operator. It both declares a new variable and assigns its initial value, with the type inferred from the right-hand side.',
      },
      {
        kind: 'code',
        id: 'go-1-code-1',
        prompt: 'Write a Go program that defines a function `divide(a, b float64) (float64, error)`. If `b` is 0, return an error using `errors.New("division by zero")`. Otherwise return the result. In `main`, call it with 10 and 2, then with 10 and 0. When successful, print just the number. When there is an error, print just the error message on its own line (e.g. `fmt.Println(err)`).',
        starterCode: `package main

import (
	"errors"
	"fmt"
)

func divide(a, b float64) (float64, error) {
	// TODO: implement
	return 0, nil
}

func main() {
	// Call divide(10, 2) and divide(10, 0)
}
`,
        expectedOutput: `5
division by zero`,
        hint: 'Use `if b == 0 { return 0, errors.New(...) }`. Print the success result with `fmt.Println(result)` (Go prints `5` for `float64(5)`) and the error with `fmt.Println(err)`.',
      },
      {
        kind: 'code',
        id: 'go-1-code-2',
        prompt: 'Write a Go program that uses a for-loop to compute the sum of integers 1 through 10 and prints it.',
        starterCode: `package main

import "fmt"

func main() {
	sum := 0
	// TODO: loop from 1 to 10
	fmt.Println(sum)
}
`,
        expectedOutput: `55`,
        hint: 'Go only has one loop keyword: `for`. Use `for i := 1; i <= 10; i++ { sum += i }`.',
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

Understanding interface satisfaction is crucial: if a type has all the methods an interface requires, it automatically satisfies it — no \`implements\` keyword. Embedding lets you compose types by including one struct inside another, promoting its fields and methods.`,
    topics: [
      { label: 'A Tour of Go — Structs and Methods', url: 'https://go.dev/tour/moretypes/1', note: 'Pointers, structs, arrays, slices, maps, closures' },
      { label: 'A Tour of Go — Interfaces', url: 'https://go.dev/tour/methods/1', note: 'Interface satisfaction, type assertions, Stringer' },
      { label: 'Go Specification — Struct Types', url: 'https://go.dev/ref/spec#Struct_types', note: 'Embedding and field promotion rules' },
      { label: 'Go Slices: usage and internals', url: 'https://go.dev/blog/slices-intro', note: 'How slices work under the hood' },
      { label: 'Go Maps in action', url: 'https://go.dev/blog/maps', note: 'Idiomatic map usage patterns' },
      { label: 'pkg sort', url: 'https://pkg.go.dev/sort', note: 'Sorting slices with sort.Slice and sort.SliceStable' },
    ],
    deliverable: 'A program that defines a `Shape` interface with `Area() float64`, implements it for `Circle` and `Rectangle` structs, stores several shapes in a slice, and prints each area.',
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
        explanation: 'Go uses structural (implicit) interface satisfaction. Any type that has all the required methods satisfies the interface — no declaration needed.',
      },
      {
        kind: 'mcq',
        id: 'go-2-mcq-2',
        prompt: 'What happens when you access a key that does not exist in a Go map?',
        options: [
          'A panic is raised.',
          'An error is returned as the second return value.',
          'The zero value of the map\'s value type is returned.',
          'nil is always returned regardless of value type.',
        ],
        correctIndex: 2,
        explanation: 'Go maps return the zero value for the value type when a key is missing. Use the two-value form `v, ok := m[key]` to distinguish a missing key from a key whose value is the zero value.',
      },
      {
        kind: 'code',
        id: 'go-2-code-1',
        prompt: 'Define a `Stringer` interface with a `String() string` method. Create a struct `Person` with fields `Name string` and `Age int`. Implement `String()` on `Person` so it returns "Name: Alice, Age: 30". In main, create a Person and print it via the interface.',
        starterCode: `package main

import "fmt"

type Stringer interface {
	String() string
}

type Person struct {
	Name string
	Age  int
}

// TODO: implement String() on Person

func main() {
	p := Person{Name: "Alice", Age: 30}
	var s Stringer = p
	fmt.Println(s.String())
}
`,
        expectedOutput: `Name: Alice, Age: 30`,
        hint: 'Define `func (p Person) String() string { return fmt.Sprintf(...) }`. Note: use a value receiver since Person has no pointer-only state.',
      },
      {
        kind: 'code',
        id: 'go-2-code-2',
        prompt: 'Write a program that counts word frequencies in the string "the cat sat on the mat the cat". Use a `map[string]int`. Print each unique word and its count in the order: "cat", "mat", "on", "sat", "the".',
        starterCode: `package main

import (
	"fmt"
	"strings"
)

func main() {
	sentence := "the cat sat on the mat the cat"
	words := strings.Fields(sentence)
	freq := make(map[string]int)
	// TODO: count frequencies
	// Print in order: cat, mat, on, sat, the
	for _, w := range []string{"cat", "mat", "on", "sat", "the"} {
		fmt.Printf("%s: %d\n", w, freq[w])
	}
}
`,
        expectedOutput: `cat: 2
mat: 1
on: 1
sat: 1
the: 3`,
        hint: 'Iterate `words` with `for _, w := range words { freq[w]++ }`.',
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

This phase covers A Tour of Go chapter 3 — goroutines, buffered and unbuffered channels, channel direction, the select statement — plus \`context.Context\`, which is the idiomatic way to carry deadlines, cancellation signals, and request-scoped values across API boundaries.`,
    topics: [
      { label: 'A Tour of Go — Concurrency', url: 'https://go.dev/tour/concurrency/1', note: 'Goroutines, channels, select, sync.Mutex' },
      { label: 'Go Concurrency Patterns', url: 'https://go.dev/blog/pipelines', note: 'Pipelines and cancellation with channels' },
      { label: 'context package', url: 'https://pkg.go.dev/context', note: 'WithCancel, WithTimeout, WithValue, Background' },
      { label: 'Go Concurrency Patterns: Context', url: 'https://go.dev/blog/context', note: 'How to pass context through a call tree' },
      { label: 'Go Specification — Channel types', url: 'https://go.dev/ref/spec#Channel_types', note: 'Send-only and receive-only channel types' },
    ],
    deliverable: 'A fan-out/fan-in pipeline: a generator goroutine sends integers 1-5 on a channel; three worker goroutines each square their input; results are collected and printed.',
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
        explanation: 'Unbuffered channels provide synchronous communication: the sender blocks until a receiver is ready, and vice versa. This is the basis of Go\'s CSP-style synchronisation.',
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
        explanation: '`context.WithCancel` returns a child context and a `CancelFunc`. Calling `CancelFunc` closes the context\'s `Done` channel, signalling all holders to abandon their work. This is the standard cancellation mechanism in Go.',
      },
      {
        kind: 'code',
        id: 'go-3-code-1',
        prompt: 'Write a program that starts two goroutines. Each goroutine sends one string on a channel: goroutine 1 sends "ping", goroutine 2 sends "pong". The main function receives both messages using a select statement inside a loop (2 iterations) and prints each message. Both "ping" and "pong" must appear in the output (order may vary).',
        starterCode: `package main

import "fmt"

func main() {
	ch1 := make(chan string, 1)
	ch2 := make(chan string, 1)

	go func() { ch1 <- "ping" }()
	go func() { ch2 <- "pong" }()

	// Use select in a loop to receive both messages
	for i := 0; i < 2; i++ {
		select {
		// TODO: receive from ch1 or ch2 and print
		}
	}
}
`,
        assertions: `
// Check that both "ping" and "pong" appear somewhere in the output (order is non-deterministic with select)
if !strings.Contains(output, "ping") {
    t.Errorf("expected output to contain \\"ping\\" but got: %s", output)
}
if !strings.Contains(output, "pong") {
    t.Errorf("expected output to contain \\"pong\\" but got: %s", output)
}
`,
        hint: 'Add `case msg := <-ch1: fmt.Println(msg)` and `case msg := <-ch2: fmt.Println(msg)` inside select. Buffered channels ensure both goroutines can send before the loop starts. Go\'s select is non-deterministic when multiple cases are ready, so the order of "ping" and "pong" may vary between runs.',
      },
      {
        kind: 'code',
        id: 'go-3-code-2',
        prompt: 'Write a program that uses `context.WithTimeout` (1 millisecond) to cancel work. A worker function receives a context and tries to do "work" by calling `time.Sleep(10 * time.Millisecond)`. Use a select to either complete the sleep or respect context cancellation. Print "timeout" when the context expires.',
        starterCode: `package main

import (
	"context"
	"fmt"
	"time"
)

func work(ctx context.Context) {
	select {
	case <-time.After(10 * time.Millisecond):
		fmt.Println("done")
	case <-ctx.Done():
		// TODO: print the reason
	}
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Millisecond)
	defer cancel()
	work(ctx)
}
`,
        expectedOutput: `timeout`,
        hint: 'In the `ctx.Done()` case, print `ctx.Err().Error()` — for a timeout that returns "context deadline exceeded". Or just `fmt.Println("timeout")` to match expected output.',
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

Table-driven tests are idiomatic Go: define a slice of test-case structs, loop over them, and call \`t.Run\` for each — giving you clear failure messages and the ability to run individual cases with \`-run\`.`,
    topics: [
      { label: 'net/http package', url: 'https://pkg.go.dev/net/http', note: 'ServeMux, Handler, Client, Request, Response' },
      { label: 'encoding/json package', url: 'https://pkg.go.dev/encoding/json', note: 'Marshal, Unmarshal, Decoder, Encoder' },
      { label: 'testing package', url: 'https://pkg.go.dev/testing', note: 'T, B, F — unit tests, benchmarks, fuzzing' },
      { label: 'Table-driven tests in Go', url: 'https://go.dev/wiki/TableDrivenTests', note: 'Canonical pattern for writing multiple test cases' },
      { label: 'Using Go Modules', url: 'https://go.dev/blog/using-go-modules', note: 'go.mod, go.sum, go get, versioning' },
      { label: 'JSON and Go', url: 'https://go.dev/blog/json', note: 'Struct tags, nested types, streaming JSON' },
    ],
    deliverable: 'An HTTP server with a `/greet?name=X` endpoint that returns JSON `{"message":"Hello, X!"}`. Include a table-driven test for the handler covering: empty name returns "Hello, World!", non-empty name returns the correct greeting.',
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
        explanation: 'The `json:"fieldname"` struct tag tells `encoding/json` to use "fieldname" as the key when marshalling/unmarshalling. Adding `,omitempty` skips zero-value fields.',
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
        explanation: '`go get example.com/pkg` resolves the latest compatible version, adds it to go.mod, and updates go.sum. `go install` is for installing binary tools, not library dependencies.',
      },
      {
        kind: 'code',
        id: 'go-4-code-1',
        prompt: 'Write a program that defines a struct `Person` with JSON tags `name` and `age`. Marshal a `Person{Name:"Alice", Age:30}` to JSON and print it, then unmarshal the JSON string `{"name":"Bob","age":25}` into a new Person and print its Name field.',
        starterCode: `package main

import (
	"encoding/json"
	"fmt"
)

type Person struct {
	Name string \`json:"name"\`
	Age  int    \`json:"age"\`
}

func main() {
	// Marshal Alice to JSON and print
	// Unmarshal Bob from JSON string and print Name
}
`,
        expectedOutput: `{"name":"Alice","age":30}
Bob`,
        hint: 'Use `json.Marshal` and convert bytes to string. Use `json.Unmarshal([]byte(s), &p)` to decode.',
      },
      {
        kind: 'code',
        id: 'go-4-code-2',
        prompt: 'Write a program that starts an HTTP server on port 8080 with a handler at `/hello` that responds with the plain text "Hello, Go!". Then use `http.Get` to call it and print the response body. (Use a goroutine for the server so main can also run the client.)',
        starterCode: `package main

import (
	"fmt"
	"io"
	"net/http"
	"time"
)

func main() {
	http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
		// TODO: write response
	})

	go http.ListenAndServe(":8080", nil)
	time.Sleep(10 * time.Millisecond) // let server start

	resp, err := http.Get("http://localhost:8080/hello")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer resp.Body.Close()
	body, _ := io.ReadAll(resp.Body)
	fmt.Println(string(body))
}
`,
        expectedOutput: `Hello, Go!`,
        hint: 'Use `fmt.Fprintf(w, "Hello, Go!")` inside the handler.',
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

The Go memory model defines when one goroutine is guaranteed to see writes made by another. Without synchronisation, the compiler and CPU can reorder operations. Running the race detector (\`go test -race\` or \`go run -race\`) is non-negotiable for catching data races. The \`golang.org/x/sync/errgroup\` package combines WaitGroup with error propagation.`,
    topics: [
      { label: 'sync package', url: 'https://pkg.go.dev/sync', note: 'Mutex, RWMutex, WaitGroup, Once, Cond, Map, Pool' },
      { label: 'sync/atomic package', url: 'https://pkg.go.dev/sync/atomic', note: 'Lock-free integer and pointer operations' },
      { label: 'The Go Memory Model', url: 'https://go.dev/ref/mem', note: 'Happens-before, channel rules, sync guarantees' },
      { label: 'Introducing the Go Race Detector', url: 'https://go.dev/blog/race-detector', note: 'How to detect and interpret data races' },
      { label: 'errgroup package', url: 'https://pkg.go.dev/golang.org/x/sync/errgroup', note: 'Goroutine group with error collection and cancellation' },
    ],
    deliverable: 'A concurrent counter protected by `sync.Mutex` that is incremented by 100 goroutines (each incrementing 10 times). A separate implementation uses `sync/atomic`. Both print the final count of 1000.',
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
        explanation: '`RWMutex` allows multiple concurrent readers (`RLock`) but only one writer (`Lock`). It provides better throughput than a plain `Mutex` when reads dominate.',
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
        explanation: '`sync.Once` ensures `f` is executed exactly once, regardless of how many goroutines call `Do` concurrently. Subsequent calls are no-ops. All callers block until the first invocation completes.',
      },
      {
        kind: 'code',
        id: 'go-5-code-1',
        prompt: 'Write a program that uses `sync.WaitGroup` to start 5 goroutines, each printing its index (0–4). Wait for all to complete before the program exits. Print "done" after all goroutines finish.',
        starterCode: `package main

import (
	"fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup
	for i := 0; i < 5; i++ {
		// TODO: add to wg, launch goroutine, print i, call Done
	}
	wg.Wait()
	fmt.Println("done")
}
`,
        expectedOutput: `0
1
2
3
4
done`,
        hint: 'Call `wg.Add(1)` before `go func(i int) { defer wg.Done(); fmt.Println(i) }(i)`. Pass `i` as an argument to avoid the closure variable capture bug.',
      },
      {
        kind: 'code',
        id: 'go-5-code-2',
        prompt: 'Write a program that uses `sync/atomic` to increment a counter 1000 times across 10 goroutines (each incrementing 100 times). Print the final value.',
        starterCode: `package main

import (
	"fmt"
	"sync"
	"sync/atomic"
)

func main() {
	var counter int64
	var wg sync.WaitGroup
	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for j := 0; j < 100; j++ {
				// TODO: atomically increment counter
			}
		}()
	}
	wg.Wait()
	fmt.Println(counter)
}
`,
        expectedOutput: `1000`,
        hint: 'Use `atomic.AddInt64(&counter, 1)` inside the loop.',
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

The key judgment is knowing *when not* to use generics: prefer them when you have type-safe containers or algorithms over multiple types, but avoid them when interfaces or code generation would be simpler. The official introduction blog post is the authoritative guide.`,
    topics: [
      { label: 'An Introduction to Generics', url: 'https://go.dev/blog/intro-generics', note: 'Official blog: type parameters, constraints, type sets' },
      { label: 'Tutorial: Getting started with generics', url: 'https://go.dev/doc/tutorial/generics', note: 'Step-by-step walkthrough' },
      { label: 'constraints package (golang.org/x/exp)', url: 'https://pkg.go.dev/golang.org/x/exp/constraints', note: 'Ordered, Integer, Float, Complex pre-built constraints' },
      { label: 'Go Specification — Type parameter declarations', url: 'https://go.dev/ref/spec#Type_parameter_declarations', note: 'Formal spec for type parameters' },
      { label: 'When To Use Generics', url: 'https://go.dev/blog/when-generics', note: 'Official guidance on appropriate generic use' },
    ],
    deliverable: 'A generic `Stack[T any]` type with `Push`, `Pop` (returns T and bool), and `Len` methods, plus a generic `Map[T, U any]` function that transforms a slice. Tests cover int and string stacks.',
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
        explanation: '`comparable` is a built-in constraint that includes all types that support `==` and `!=`. This is necessary to use a type parameter as a map key or in equality checks.',
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
        explanation: 'If you need to store values of different types together at runtime (e.g., `[]Animal` holding both `Dog` and `Cat`), an interface is the right tool. Generics are instantiated per type at compile time, so a `[]T` is a homogeneous slice.',
      },
      {
        kind: 'code',
        id: 'go-6-code-1',
        prompt: 'Write a generic function `Filter[T any](slice []T, predicate func(T) bool) []T` that returns a new slice containing only the elements for which `predicate` returns true. In main, filter a []int for even numbers and print the result.',
        starterCode: `package main

import "fmt"

func Filter[T any](slice []T, predicate func(T) bool) []T {
	// TODO: implement
	return nil
}

func main() {
	nums := []int{1, 2, 3, 4, 5, 6}
	even := Filter(nums, func(n int) bool { return n%2 == 0 })
	fmt.Println(even)
}
`,
        expectedOutput: `[2 4 6]`,
        hint: 'Iterate with `for _, v := range slice`, append to a result slice when `predicate(v)` is true.',
      },
      {
        kind: 'code',
        id: 'go-6-code-2',
        prompt: 'Write a generic `Min[T interface{ ~int | ~float64 | ~string }](a, b T) T` function that returns the smaller of two values. In main, call it for ints (3, 7) and strings ("apple", "banana"), printing both results.',
        starterCode: `package main

import "fmt"

func Min[T interface{ ~int | ~float64 | ~string }](a, b T) T {
	// TODO: implement
	var zero T
	return zero
}

func main() {
	fmt.Println(Min(3, 7))
	fmt.Println(Min("apple", "banana"))
}
`,
        expectedOutput: `3
apple`,
        hint: 'Use a simple `if a < b { return a }; return b`. The union constraint `~int | ~float64 | ~string` allows `<` because all three support ordering.',
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

\`go generate\` is a build tool directive: embed \`//go:generate cmd args\` in source files and run \`go generate ./...\` to invoke code generators. The \`go/ast\`, \`go/parser\`, and \`go/token\` packages in the standard library expose Go's AST for writing your own tools — linters, doc generators, and scaffolding scripts.`,
    topics: [
      { label: 'reflect package', url: 'https://pkg.go.dev/reflect', note: 'Value, Type, Kind, StructField, MethodByName' },
      { label: 'The Laws of Reflection', url: 'https://go.dev/blog/laws-of-reflection', note: 'Official blog: three laws, interfaces, settability' },
      { label: 'go generate command', url: 'https://go.dev/blog/generate', note: 'How and when to use go:generate directives' },
      { label: 'go/ast package', url: 'https://pkg.go.dev/go/ast', note: 'AST node types, File, Decl, Stmt, Expr' },
      { label: 'go/parser package', url: 'https://pkg.go.dev/go/parser', note: 'ParseFile, ParseDir, modes' },
      { label: 'stringer tool', url: 'https://pkg.go.dev/golang.org/x/tools/cmd/stringer', note: 'Canonical go:generate example — auto String() for enums' },
    ],
    deliverable: 'A function `StructFields(v any) []string` using reflect that returns a slice of "FieldName: value" strings for each exported field of a struct. Demonstrate with a `Config` struct having three fields.',
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
        explanation: '`CanSet` returns false when the Value is not addressable (you must pass a pointer and call `.Elem()`) AND for unexported fields even on addressable structs. Both conditions must be met for a field to be settable.',
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
        explanation: '`go generate` is NOT part of `go build`. It is a separate command that reads `//go:generate` directives and runs the specified tool. Developers run it deliberately when they need to regenerate code.',
      },
      {
        kind: 'code',
        id: 'go-7-code-1',
        prompt: 'Write a program that uses `reflect` to print the type name and kind of a `float64` value (3.14), a `string` value ("hello"), and a `[]int` value. For each print "type: X, kind: Y".',
        starterCode: `package main

import (
	"fmt"
	"reflect"
)

func printTypeKind(v any) {
	t := reflect.TypeOf(v)
	// TODO: print type name and kind
}

func main() {
	printTypeKind(3.14)
	printTypeKind("hello")
	printTypeKind([]int{1, 2, 3})
}
`,
        expectedOutput: `type: float64, kind: float64
type: string, kind: string
type: []int, kind: slice`,
        hint: 'Use `t.Name()` for the type name and `t.Kind().String()` for the kind. Note: `[]int` has no name (`t.Name()` returns ""), so use `t.String()` for the full representation.',
      },
      {
        kind: 'code',
        id: 'go-7-code-2',
        prompt: 'Write a program that uses reflect to iterate the exported fields of a struct `Config{Host: "localhost", Port: 8080, Debug: true}` and prints each field name and value on a separate line as "FieldName=value".',
        starterCode: `package main

import (
	"fmt"
	"reflect"
)

type Config struct {
	Host  string
	Port  int
	Debug bool
}

func main() {
	cfg := Config{Host: "localhost", Port: 8080, Debug: true}
	t := reflect.TypeOf(cfg)
	v := reflect.ValueOf(cfg)
	for i := 0; i < t.NumField(); i++ {
		// TODO: print field name and value
	}
}
`,
        expectedOutput: `Host=localhost
Port=8080
Debug=true`,
        hint: 'Use `t.Field(i).Name` for the name and `v.Field(i).Interface()` for the value.',
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

Understanding when *not* to use Cgo is as important as knowing how. For pure-Go replacements of common C libraries, prefer Go implementations. Use Cgo when you must — for OS-level APIs, hardware drivers, or pre-existing C libraries with no Go equivalent.`,
    topics: [
      { label: 'Cgo documentation', url: 'https://pkg.go.dev/cmd/cgo', note: 'Official Cgo reference: preamble, types, rules' },
      { label: 'C? Go? Cgo!', url: 'https://go.dev/blog/cgo', note: 'Introductory blog post with examples' },
      { label: 'Go Wiki — cgo', url: 'https://go.dev/wiki/cgo', note: 'Community guide: gotchas, pointers, memory rules' },
      { label: 'Go specification — Cgo pointer passing rules', url: 'https://pkg.go.dev/cmd/cgo#hdr-Passing_pointers', note: 'Critical rules about passing pointers between Go and C' },
    ],
    deliverable: 'A Go program that calls the C standard library `abs()` function via Cgo to compute the absolute value of -42, and prints the result. Include a comment explaining the Cgo pointer-passing rule.',
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
        explanation: 'The key Cgo pointer rule: a Go pointer passed to C must not point to Go memory that contains other Go pointers. This is because the Go garbage collector can move Go objects, and C code must not hold a stale pointer.',
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
        explanation: 'Cgo requires a C compiler (gcc/clang) for the target architecture and OS. In typical cross-compile setups you only have a compiler for the build host, making CGO_ENABLED=0 the common workaround.',
      },
      {
        kind: 'code',
        id: 'go-8-code-1',
        prompt: 'Write a Go program using Cgo that calls the C `strlen` function to measure the length of the string "Hello, Cgo!" and prints the length as an integer.',
        starterCode: `package main

/*
#include <string.h>
#include <stdlib.h>
*/
import "C"

import (
	"fmt"
	"unsafe"
)

func main() {
	s := "Hello, Cgo!"
	// TODO: convert s to a C string, remember to free it, call C.strlen, and print the result as int
}
`,
        expectedOutput: `11`,
        hint: 'Convert with `cstr := C.CString(s)` then immediately defer its release with `defer C.free(unsafe.Pointer(cstr))`. Then call `int(C.strlen(cstr))` and print the result. Always free C strings created with `C.CString` to avoid memory leaks.',
      },
      {
        kind: 'mcq',
        id: 'go-8-mcq-3',
        prompt: 'What build tag disables Cgo entirely, allowing pure-Go cross-compilation?',
        options: [
          '`//go:build !cgo`',
          '`CGO_ENABLED=0` environment variable during `go build`',
          '`//go:build pure`',
          '`go build -nocgo`',
        ],
        correctIndex: 1,
        explanation: 'Setting `CGO_ENABLED=0` in the environment before invoking `go build` disables Cgo globally. The standard library then uses Go-only fallbacks (e.g., pure-Go DNS resolver). There is no `-nocgo` flag.',
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

Escape analysis determines whether a value lives on the stack or heap. Heap allocations cost more — they pressure the garbage collector. Use \`go build -gcflags="-m"\` to see what escapes. Knowing these tools turns guesswork into measurement.`,
    topics: [
      { label: 'Profiling Go programs', url: 'https://go.dev/blog/pprof', note: 'Official blog: CPU and memory profiling with pprof' },
      { label: 'testing package — Benchmarks', url: 'https://pkg.go.dev/testing#hd-Benchmarks', note: 'testing.B, b.ResetTimer, b.ReportAllocs' },
      { label: 'Go Fuzzing', url: 'https://go.dev/doc/fuzz/', note: 'testing.F, f.Add, f.Fuzz — fuzzing since Go 1.18' },
      { label: 'Compiler Explorer — escape analysis', url: 'https://go.dev/doc/gc-guide', note: 'GC guide covering stack vs heap allocation' },
      { label: 'net/http/pprof package', url: 'https://pkg.go.dev/net/http/pprof', note: 'HTTP endpoint for runtime profiles on live servers' },
    ],
    deliverable: 'Two implementations of string concatenation: one using `+` in a loop (slow) and one using `strings.Builder` (fast). A benchmark for each. Annotate which allocates less using `-benchmem` output.',
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
        explanation: '`b.ResetTimer()` is called after setup code (allocating test data, opening files, etc.) to exclude that time from the benchmark measurement. Only the time spent in the `for i := 0; i < b.N; i++` loop is reported.',
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
        explanation: 'Escape analysis runs at compile time. If the compiler can prove a variable\'s lifetime is bounded by the enclosing function, it goes on the stack (fast, no GC pressure). If it might outlive the function (returned pointer, captured in closure, passed to interface), it escapes to the heap.',
      },
      {
        kind: 'code',
        id: 'go-9-code-1',
        prompt: 'Write a program that concatenates 1000 copies of "go" using `strings.Builder` and prints the length of the result.',
        starterCode: `package main

import (
	"fmt"
	"strings"
)

func main() {
	var b strings.Builder
	for i := 0; i < 1000; i++ {
		// TODO: write "go" to builder
	}
	fmt.Println(len(b.String()))
}
`,
        expectedOutput: `2000`,
        hint: 'Use `b.WriteString("go")` inside the loop. `strings.Builder` grows internally without creating a new string on every concatenation.',
      },
      {
        kind: 'code',
        id: 'go-9-code-2',
        prompt: 'Write a program that demonstrates `strings.Builder` is more efficient than naive `+` concatenation by computing both results and printing their lengths (both should be 100).',
        starterCode: `package main

import (
	"fmt"
	"strings"
)

func withPlus(n int) string {
	s := ""
	for i := 0; i < n; i++ {
		s += "x"
	}
	return s
}

func withBuilder(n int) string {
	var b strings.Builder
	for i := 0; i < n; i++ {
		b.WriteString("x")
	}
	return b.String()
}

func main() {
	fmt.Println(len(withPlus(100)))
	fmt.Println(len(withBuilder(100)))
}
`,
        expectedOutput: `100
100`,
        hint: 'Both functions are already implemented in the starter. Just make sure `withBuilder` uses `b.WriteString("x")` and returns `b.String()`.',
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

Graceful shutdown is a common production gap: when Kubernetes sends SIGTERM, your server should stop accepting new connections, drain in-flight requests, and exit cleanly. Understanding the server lifecycle — from \`ListenAndServe\` to \`Shutdown(ctx)\` — is essential for zero-downtime deployments.`,
    topics: [
      { label: 'log/slog package', url: 'https://pkg.go.dev/log/slog', note: 'Structured, levelled logging built into Go 1.21+' },
      { label: 'OpenTelemetry Go — Getting Started', url: 'https://opentelemetry.io/docs/languages/go/getting-started/', note: 'Traces, metrics, and logs with the OTel Go SDK' },
      { label: 'net/http — Server.Shutdown', url: 'https://pkg.go.dev/net/http#Server.Shutdown', note: 'Graceful shutdown: drain requests, close listeners' },
      { label: 'gRPC Go quick start', url: 'https://grpc.io/docs/languages/go/quickstart/', note: 'Protocol Buffers, generated stubs, server and client' },
      { label: 'os/signal package', url: 'https://pkg.go.dev/os/signal', note: 'signal.NotifyContext for SIGTERM/SIGINT handling' },
      { label: 'Structured Logging with slog', url: 'https://go.dev/blog/slog', note: 'Official blog announcing and explaining slog' },
    ],
    deliverable: 'An HTTP server with graceful shutdown: listens for SIGINT/SIGTERM via `signal.NotifyContext`, calls `server.Shutdown(ctx)` on signal, and logs start/stop events using `slog.Info` with structured key-value pairs.',
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
        explanation: '`Shutdown` is graceful: it closes the listener (refusing new connections) but lets in-flight requests complete until the context expires or all requests finish. `Close` forcibly closes all connections immediately.',
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
        explanation: 'A span represents a single unit of work or operation. Spans have a name, start/end timestamps, attributes, and can be nested. A tree of spans forms a trace, visualising the path of a request through a distributed system.',
      },
      {
        kind: 'code',
        id: 'go-10-code-1',
        prompt: 'Write a program that uses `log/slog` to log a structured Info message with the fields `service="api"` and `version="1.0"`, then log a Warning with `error="not found"`. Use the default text handler. The output will contain timestamps so exact matching is not checked — the program must compile, run without panicking, and produce two log lines containing `service=api` and `error=not found` respectively.',
        starterCode: `package main

import (
	"log/slog"
	"os"
)

func main() {
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	// TODO: log Info with service and version fields
	// TODO: log Warn with error field
}
`,
        expectedOutput: ``,
        assertions: `
// Verify the output contains the required structured fields (timestamps differ per run)
if !strings.Contains(output, "service=api") {
    t.Errorf("expected output to contain service=api, got: %s", output)
}
if !strings.Contains(output, "error=not found") {
    t.Errorf("expected output to contain error=not found, got: %s", output)
}
`,
        hint: 'Use `logger.Info("started", "service", "api", "version", "1.0")` and `logger.Warn("lookup failed", "error", "not found")`. slog accepts alternating key/value pairs after the message.',
      },
      {
        kind: 'code',
        id: 'go-10-code-2',
        prompt: 'Write a program that demonstrates graceful HTTP server shutdown. Start a server on :9090, then immediately send a shutdown signal by cancelling a context with a 50ms timeout. Print "server stopped" after Shutdown returns.',
        starterCode: `package main

import (
	"context"
	"fmt"
	"net/http"
	"time"
)

func main() {
	srv := &http.Server{Addr: ":9090"}
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "hello")
	})

	go func() {
		srv.ListenAndServe()
	}()

	time.Sleep(10 * time.Millisecond) // let server start

	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
	defer cancel()

	// TODO: call srv.Shutdown(ctx)
	fmt.Println("server stopped")
}
`,
        expectedOutput: `server stopped`,
        hint: 'Call `srv.Shutdown(ctx)` (you can ignore the error for this exercise). After it returns, the server is no longer accepting connections.',
      },
    ],
  },
];
