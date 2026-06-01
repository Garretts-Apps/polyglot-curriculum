import type { BadgeData } from './badges';

export const badgesExtra4: Record<string, BadgeData> = {
  // ── Haskell ─────────────────────────────────────────────────────────────────
  'haskell-0': {
    title: 'Haskell: Setup & Hello World',
    skills: [
      'Installed the Haskell toolchain (GHC, GHCi, cabal/stack) with GHCup',
      'Defined main :: IO () as a program\'s entry point and ran it with runghc or ghc',
      'Printed a greeting to standard output using putStrLn',
    ],
  },
  'haskell-1': {
    title: 'Haskell: Expressions, Types & GHCi',
    skills: [
      'Evaluated expressions and queried their types in the GHCi REPL with :t',
      'Distinguished expression-oriented evaluation from statements and pure functions',
      'Combined top-level bindings, show, and ++ to build labelled console output',
    ],
  },
  'haskell-2': {
    title: 'Haskell: Functions — Pattern Matching, Guards & Recursion',
    skills: [
      'Defined functions with multiple pattern-matching equations tried top to bottom',
      'Branched within an equation using guards and otherwise',
      'Implemented iteration through recursion with a reachable base case',
    ],
  },
  'haskell-3': {
    title: 'Haskell: Lists, Ranges, Comprehensions & Laziness',
    skills: [
      'Built and aggregated lists using ranges, cons, sum, length, take, and zip',
      'Transformed and filtered data with list comprehensions',
      'Consumed finite prefixes of infinite lists thanks to lazy evaluation',
    ],
  },
  'haskell-4': {
    title: 'Haskell: Higher-Order Functions, Currying & Partial Application',
    skills: [
      'Transformed and reduced lists with map, filter, and foldr/foldl',
      'Partially applied curried functions and wrote lambdas and operator sections',
      'Composed pipelines of functions right-to-left with the (.) operator',
    ],
  },
  'haskell-5': {
    title: 'Haskell: Algebraic Data Types, Maybe & Either',
    skills: [
      'Modelled domains with data declarations, sum/product constructors, and records',
      'Destructured values by constructor using case expressions and pattern matching',
      'Represented absence and failure with Maybe and Either instead of null',
    ],
  },
  'haskell-6': {
    title: 'Haskell: Typeclasses — Eq, Ord, Show, Num',
    skills: [
      'Used the Eq, Ord, Show, and Num classes for equality, ordering, and display',
      'Read class constraints such as Eq a => in polymorphic type signatures',
      'Derived standard instances for custom types with deriving (Eq, Ord, Show)',
    ],
  },
  'haskell-7': {
    title: 'Haskell: Functor, Applicative & Monad',
    skills: [
      'Mapped over wrapped structures with fmap and the <$> operator',
      'Applied wrapped functions to wrapped values using pure and <*>',
      'Sequenced dependent computations with >>= and do-notation across Maybe, Either, and lists',
    ],
  },
  'haskell-8': {
    title: 'Haskell: IO & the IO Monad — do-notation',
    skills: [
      'Explained how IO values describe effects while keeping the language pure',
      'Sequenced IO actions in a do block, binding results with <- and pure values with let',
      'Combined putStrLn and print to produce multi-line program output',
    ],
  },
  'haskell-9': {
    title: 'Haskell: Laziness, Evaluation, Strictness & Space',
    skills: [
      'Reasoned about thunks, weak head normal form, and when expressions are forced',
      'Diagnosed and avoided space leaks by choosing foldl\' over lazy foldl',
      'Added strictness with seq, $!, and BangPatterns to control evaluation',
    ],
  },
  'haskell-10': {
    title: 'Haskell: Monad Transformers, Type-Level Programming & GHC Performance',
    skills: [
      'Stacked effects with monad transformers like StateT and ExceptT using lift and liftIO',
      'Encoded invariants in types with GADTs, DataKinds, and type families',
      'Tuned GHC performance via -O2, inlining/specialize pragmas, fusion, and profiling',
    ],
  },

  // ── Assembly (x86-64) ─────────────────────────────────────────────────────
  'assembly-0': {
    title: 'Assembly: Setup & Hello World',
    skills: [
      'Assembled and linked an x86-64 program with nasm -f elf64 and ld',
      'Copied an immediate into a register using mov in NASM destination, source order',
      'Produced console output and halted execution with print and hlt on the VM',
    ],
  },
  'assembly-1': {
    title: 'Assembly: Registers & the MOV Instruction',
    skills: [
      'Loaded immediates and copied values between the general-purpose registers with mov',
      'Predicted register contents by tracing a sequence of mov instructions top to bottom',
      'Mapped the 64/32/16/8-bit aliases (rax/eax/ax/al) and their zero-extension behavior',
    ],
  },
  'assembly-2': {
    title: 'Assembly: Integer Arithmetic — ADD, SUB, MUL, INC, DEC',
    skills: [
      'Translated arithmetic expressions into add, sub, inc, and dec instruction sequences',
      'Multiplied with two-operand imul and explained the one-operand rdx:rax result',
      'Distinguished signed imul from unsigned mul and chose the right form',
    ],
  },
  'assembly-3': {
    title: 'Assembly: The Flags Register & Comparison (CMP)',
    skills: [
      'Identified the RFLAGS bits (ZF, SF, CF, OF) that arithmetic and cmp set',
      'Used cmp to set flags without storing the difference, then branched on them',
      'Selected signed (jg/jl) versus unsigned (ja/jb) conditional jump families correctly',
    ],
  },
  'assembly-4': {
    title: 'Assembly: Control Flow — Labels, Jumps & Loops',
    skills: [
      'Built loops and if/else from labels, jmp, and conditional jumps',
      'Hand-compiled a counting loop using a counter, cmp, dec, and a conditional back-jump',
      'Explained why compilers prefer the bottom-tested loop layout for branch prediction',
    ],
  },
  'assembly-5': {
    title: 'Assembly: The Stack — PUSH, POP & Calling Conventions',
    skills: [
      'Stored and retrieved values with push and pop, tracking rsp moving by 8',
      'Predicted LIFO ordering when popping values pushed onto the stack',
      'Named the System V argument registers (rdi, rsi, rdx, rcx, r8, r9) and callee-saved set',
    ],
  },
  'assembly-6': {
    title: 'Assembly: Memory Addressing Modes & the Data Section',
    skills: [
      'Decoded the [base + index*scale + displacement] effective-address form',
      'Placed data in the .text, .data, and .bss sections with db/dw/dd/dq and resb',
      'Contrasted mov (load the value) with lea (compute the address)',
    ],
  },
  'assembly-7': {
    title: 'Assembly: Functions — CALL, RET & Stack Frames',
    skills: [
      'Explained how call pushes a return address and ret pops it back into rip',
      'Read the standard prologue (push rbp; mov rbp, rsp; sub rsp) and epilogue',
      'Passed an argument in rdi and returned a result in rax per the System V ABI',
    ],
  },
  'assembly-8': {
    title: 'Assembly: The Syscall Interface — write & exit on Linux',
    skills: [
      'Invoked Linux syscalls with the number in rax and arguments in rdi, rsi, rdx, r10, r8, r9',
      'Wrote to stdout via write (1) and terminated cleanly with exit (60)',
      'Explained why the syscall ABI uses r10 because syscall clobbers rcx and r11',
    ],
  },
  'assembly-9': {
    title: 'Assembly: Data Structures in Memory — Arrays & Structs by Offset',
    skills: [
      'Computed array element addresses as base + index * element_size',
      'Determined struct field offsets accounting for alignment padding',
      'Loaded narrow fields into wide registers with movzx and movsx',
    ],
  },
  'assembly-10': {
    title: 'Assembly: SIMD, Optimization & Reading Compiler Output',
    skills: [
      'Explained SIMD packed operations on xmm/ymm/zmm registers like paddd',
      'Read optimized disassembly and Compiler Explorer output at -O2',
      'Recognized compiler idioms such as xor eax, eax zeroing and lea for arithmetic',
    ],
  },
};
