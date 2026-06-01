import type { Phase } from './types';

export const assemblyPhases: Phase[] = [
  // ─── Level 0 ─────────────────────────────────────────────────────────────
  {
    id: 'assembly-0',
    language: 'assembly',
    level: 0,
    title: 'Setup & Hello World',
    timeEstimate: '0.5-1 hours',
    intro:
      "Welcome to x86-64 assembly! Assembly is the human-readable form of the machine code your CPU actually executes — every high-level language ultimately compiles down to instructions like these. In this course we use **NASM syntax** (`destination, source` order) targeting 64-bit Linux. To follow along on your own machine you'll install the NASM assembler and the GNU linker, then assemble and link a program with `nasm -f elf64 main.asm -o main.o && ld main.o -o main`. The checks in this app run on a small educational register VM that simulates a handful of registers and instructions and adds a teaching-only `print` pseudo-op — so you can experiment with the core mechanics instantly, while we teach the full real ISA (syscalls, addressing modes, calling conventions) through reading exercises.",
    topics: [
      { label: 'NASM Documentation', url: 'https://www.nasm.us/docs.php', note: 'Official manual for the Netwide Assembler.' },
      { label: 'Felix Cloutier x86 Instruction Reference', url: 'https://www.felixcloutier.com/x86/', note: 'Searchable reference for every x86/x86-64 instruction.' },
      { label: 'GDB Documentation', url: 'https://sourceware.org/gdb/current/onlinedocs/gdb/', note: 'The GNU debugger — step through instructions and inspect registers.' },
    ],
    deliverable: 'Install NASM + ld locally and assemble a first program; run a print statement on the VM here.',
    checks: [
      {
        kind: 'code',
        id: 'assembly-0-code-1',
        prompt: 'Run the starter program. It moves a value into a register and prints a greeting. Press run to see `Hello, World!` on standard output.',
        boilerplate: '; main.asm — first program on the register VM\nmov rax, 1        ; load 1 into the rax register\nprint "Hello, World!"\nhlt               ; stop the program\n',
        expectedOutput: 'Hello, World!',
        explanation: 'In NASM, instructions are written one per line. `mov rax, 1` copies the immediate `1` into register `rax`. The `print` pseudo-op here is a teaching aid that writes text to stdout; on a real Linux system you would instead invoke the `write` syscall. `hlt` halts execution. Comments begin with `;`.',
      },
      {
        kind: 'mcq',
        id: 'assembly-0-mcq-1',
        prompt: 'In NASM syntax, what is the operand order for `mov rax, rbx`?',
        options: [
          'It copies `rax` into `rbx` (source, destination).',
          'It copies `rbx` into `rax` (destination, source).',
          'It adds `rax` and `rbx` together.',
          'It compares `rax` with `rbx`.',
        ],
        correctIndex: 1,
        explanation: 'NASM (and Intel syntax generally) uses `destination, source` order, so `mov rax, rbx` copies the contents of `rbx` into `rax`. This is the opposite of AT&T/GAS syntax, which writes `movq %rbx, %rax` (source first). See the [NASM manual](https://www.nasm.us/docs.php).',
      },
      {
        kind: 'mcq',
        id: 'assembly-0-mcq-2',
        prompt: 'What does the command `nasm -f elf64 main.asm -o main.o` produce?',
        options: [
          'A finished, runnable executable.',
          'A 64-bit ELF object file that still must be linked.',
          'A disassembly listing of the source.',
          'A 32-bit Windows executable.',
        ],
        correctIndex: 1,
        explanation: 'NASM *assembles* source into an object file (`.o`). The `-f elf64` flag selects the 64-bit ELF object format used by Linux. You then *link* it into an executable with `ld main.o -o main`. Assembling and linking are two distinct steps.',
      },
      {
        kind: 'mcq',
        id: 'assembly-0-mcq-3',
        prompt: 'Which character begins a comment in NASM source?',
        options: ['`//`', '`#`', '`;`', '`--`'],
        correctIndex: 2,
        explanation: 'NASM uses the semicolon `;` to start a comment that runs to the end of the line. This is consistent across most assemblers in the Intel-syntax tradition.',
      },
    ],
  },

  // ─── Level 1 ─────────────────────────────────────────────────────────────
  {
    id: 'assembly-1',
    language: 'assembly',
    level: 1,
    title: 'Registers & the MOV Instruction',
    timeEstimate: '4-6 hours',
    intro:
      "Registers are the CPU's tiny, ultra-fast storage slots — there is no faster memory in the machine. x86-64 gives you sixteen 64-bit general-purpose registers: `rax`, `rbx`, `rcx`, `rdx`, `rsi`, `rdi`, `rbp`, `rsp`, and `r8`–`r15`. Each has narrower aliases that view the *same* bits: `eax` is the low 32 bits of `rax`, `ax` the low 16, `al` the low 8. The workhorse instruction `mov` copies data between registers and immediates. By the end of this phase you'll predict the contents of any register after a sequence of `mov`s, and know which aliases overlap.\n\nLocally, build a tiny program that loads several constants into registers and inspect them in GDB with `info registers` after setting a breakpoint at `_start`. On the VM here you'll use `print rax` to read a register's value.",
    video: {
      title: 'Intro to x86 Assembly Language (Part 1)',
      youtubeId: 'wLXIWKUWpSs',
      channelName: 'Davy Wybiral',
    },
    topics: [
      { label: 'NASM — Registers & Operands', url: 'https://www.nasm.us/doc/nasmdoc3.html', note: 'How NASM names registers and operands.' },
      { label: 'MOV — Felix Cloutier', url: 'https://www.felixcloutier.com/x86/mov', note: 'Full semantics and encodings of the mov instruction.' },
      { label: 'x86-64 Register Overview (OSDev)', url: 'https://wiki.osdev.org/CPU_Registers_x86-64', note: 'Diagram of all 64/32/16/8-bit register aliases.' },
      { label: 'Intel 64 SDM (Architecture Manual)', url: 'https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html', note: 'The authoritative architecture manual.' },
    ],
    deliverable: 'A program that loads constants into rax/rbx/rcx and a written note mapping each 64/32/16/8-bit alias.',
    checks: [
      {
        kind: 'code',
        id: 'assembly-1-code-1',
        prompt: 'Load the value `42` into `rax`, copy it into `rbx`, then print `rbx`.',
        boilerplate: '; copy a value between registers\nmov rax, 42\nmov rbx, rax     ; rbx now holds a copy of rax\nprint rbx\nhlt\n',
        expectedOutput: '42',
        explanation: '`mov rax, 42` loads an immediate; `mov rbx, rax` copies the *contents* of `rax` into `rbx`. `mov` never modifies its source — `rax` still holds 42 afterward. Registers are independent storage slots, so changing `rbx` later would not affect `rax`.',
      },
      {
        kind: 'code',
        id: 'assembly-1-code-2',
        prompt: 'Use registers as scratch space: load 7 into rax, 100 into rcx, then overwrite rax with rcx and print rax.',
        boilerplate: '; registers are reusable scratch space\nmov rax, 7\nmov rcx, 100\nmov rax, rcx     ; overwrite rax\nprint rax\nhlt\n',
        expectedOutput: '100',
        explanation: 'Registers can be freely reused. The second `mov rax, rcx` discards the previous value 7 and replaces it with 100. There are only a handful of registers, so real assembly constantly shuffles values between them and memory.',
      },
      {
        kind: 'mcq',
        id: 'assembly-1-mcq-1',
        prompt: 'On x86-64, the register `eax` refers to which part of `rax`?',
        options: [
          'A completely separate 32-bit register.',
          'The low 32 bits of the 64-bit `rax`.',
          'The high 32 bits of `rax`.',
          'The low 16 bits of `rax`.',
        ],
        correctIndex: 1,
        explanation: '`eax` is the low 32 bits of `rax` — they share storage. Writing to `eax` actually *zero-extends* into the upper 32 bits of `rax` (a 64-bit quirk), whereas writing `ax` (16-bit) or `al` (8-bit) leaves the higher bits untouched. See the [OSDev register chart](https://wiki.osdev.org/CPU_Registers_x86-64).',
      },
      {
        kind: 'mcq',
        id: 'assembly-1-mcq-2',
        prompt: `After this real NASM sequence, what is in \`rax\`?

\`\`\`asm
mov rax, 0xFFFFFFFFFFFFFFFF
mov eax, 5
\`\`\``,
        options: [
          '`0xFFFFFFFF00000005` — the upper 32 bits are preserved.',
          '`0x0000000000000005` — writing eax zero-extends the upper 32 bits.',
          '`0x00000005FFFFFFFF`',
          '`0xFFFFFFFFFFFFFFFF` — eax cannot change rax.',
        ],
        correctIndex: 1,
        explanation: 'A unique x86-64 rule: any write to a 32-bit register (`eax`) clears the upper 32 bits of the full 64-bit register. So `rax` becomes `0x0000000000000005`. By contrast, 8-bit and 16-bit writes do *not* clear the high bits. This is a frequent source of subtle bugs.',
      },
      {
        kind: 'mcq',
        id: 'assembly-1-mcq-3',
        prompt: 'Which of these `mov` instructions is **illegal** on x86-64?',
        options: [
          '`mov rax, rbx` — register to register.',
          '`mov rax, 5` — immediate to register.',
          '`mov [rsi], [rdi]` — memory directly to memory.',
          '`mov rax, [rsi]` — memory to register.',
        ],
        correctIndex: 2,
        explanation: 'x86 `mov` cannot have *both* operands be memory — there is no memory-to-memory move. You must load into a register first (`mov rax, [rdi]`) then store (`mov [rsi], rax`). Register/immediate combinations and a single memory operand are all fine. See [MOV](https://www.felixcloutier.com/x86/mov).',
      },
    ],
  },

  // ─── Level 2 ─────────────────────────────────────────────────────────────
  {
    id: 'assembly-2',
    language: 'assembly',
    level: 2,
    title: 'Integer Arithmetic — ADD, SUB, MUL, INC, DEC',
    timeEstimate: '4-6 hours',
    intro:
      "Now we make the CPU compute. `add dst, src` accumulates `src` into `dst`; `sub` subtracts; `inc`/`dec` adjust by one (cheaply, common in loops). Multiplication is subtler: the one-operand `mul`/`imul` multiplies `rax` by the operand and the full result lands in `rdx:rax`, while the modern two-operand `imul dst, src` computes `dst = dst * src` into a single register. By the end you'll translate small arithmetic expressions into instruction sequences and know why `imul` is preferred for ordinary signed math.\n\nLocally, write a program that computes `(3 + 4) * 5` step by step and verify the result `35` in GDB. On the VM, `print rax` reveals the accumulated result.",
    video: {
      title: 'Intro to x86 Assembly Language (Part 1)',
      youtubeId: 'wLXIWKUWpSs',
      channelName: 'Davy Wybiral',
    },
    topics: [
      { label: 'ADD — Felix Cloutier', url: 'https://www.felixcloutier.com/x86/add', note: 'Addition and the flags it sets.' },
      { label: 'IMUL — Felix Cloutier', url: 'https://www.felixcloutier.com/x86/imul', note: 'Signed multiply, including 2- and 3-operand forms.' },
      { label: 'MUL — Felix Cloutier', url: 'https://www.felixcloutier.com/x86/mul', note: 'Unsigned multiply into rdx:rax.' },
      { label: 'INC / DEC — Felix Cloutier', url: 'https://www.felixcloutier.com/x86/inc', note: 'Increment/decrement and their effect on flags.' },
    ],
    deliverable: 'A program that evaluates an arithmetic expression like (3+4)*5 into a register and prints the result.',
    checks: [
      {
        kind: 'code',
        id: 'assembly-2-code-1',
        prompt: 'Compute `(3 + 4) * 5` and print the result (35). The skeleton adds into rax then multiplies by rbx.',
        boilerplate: '; evaluate (3 + 4) * 5\nmov rax, 3\nadd rax, 4       ; rax = 7\nmov rbx, 5\nimul rax, rbx    ; rax = 7 * 5\nprint rax\nhlt\n',
        expectedOutput: '35',
        explanation: 'We accumulate `3 + 4 = 7` in `rax`, then use the two-operand `imul rax, rbx` to compute `rax = rax * rbx = 35`. The two-operand form keeps the product in a single named register, which is what compilers emit for normal signed multiplication.',
      },
      {
        kind: 'code',
        id: 'assembly-2-code-2',
        prompt: 'Start rax at 10, subtract 3, then decrement twice. Print rax. (Expected: 5)',
        boilerplate: '; subtraction and dec\nmov rax, 10\nsub rax, 3       ; rax = 7\ndec rax          ; rax = 6\ndec rax          ; rax = 5\nprint rax\nhlt\n',
        expectedOutput: '5',
        explanation: '`sub rax, 3` computes `rax = rax - 3`. `dec rax` subtracts one and is encoded more compactly than `sub rax, 1`; notably `inc`/`dec` leave the carry flag unchanged, which matters in multi-word arithmetic.',
      },
      {
        kind: 'mcq',
        id: 'assembly-2-mcq-1',
        prompt: `In real x86-64, after the one-operand form below, where is the 128-bit product stored?

\`\`\`asm
mov rax, 1000000000
mov rbx, 1000000000
mul rbx
\`\`\``,
        options: [
          'Entirely in `rax`; overflow is discarded.',
          'In `rdx:rax` — high 64 bits in `rdx`, low 64 bits in `rax`.',
          'In `rbx`.',
          'In `rcx:rax`.',
        ],
        correctIndex: 1,
        explanation: 'The one-operand `mul`/`imul` multiplies the accumulator (`rax`) by the operand and writes the full double-width product to `rdx:rax`: the high 64 bits go in `rdx`, the low 64 in `rax`. This is how you get a correct result when the product overflows 64 bits. See [MUL](https://www.felixcloutier.com/x86/mul).',
      },
      {
        kind: 'mcq',
        id: 'assembly-2-mcq-2',
        prompt: 'What is the practical difference between `mul` and `imul`?',
        options: [
          '`mul` is for floats, `imul` is for integers.',
          '`mul` treats operands as unsigned; `imul` treats them as signed (two’s complement).',
          'They are identical aliases.',
          '`imul` only works on immediates.',
        ],
        correctIndex: 1,
        explanation: '`mul` performs *unsigned* multiplication; `imul` performs *signed* multiplication. For values that fit in the destination the low bits are identical, but the high bits and flag behavior differ. `imul` also offers convenient two- and three-operand forms that `mul` lacks. See [IMUL](https://www.felixcloutier.com/x86/imul).',
      },
      {
        kind: 'mcq',
        id: 'assembly-2-mcq-3',
        prompt: 'Why might a compiler emit `inc rax` instead of `add rax, 1`?',
        options: [
          '`inc` can add any constant, `add` cannot.',
          '`inc` is a shorter encoding for adding one and is idiomatic in loops, though it does not update the carry flag.',
          '`inc` works on memory but `add` does not.',
          'There is no difference at all in any respect.',
        ],
        correctIndex: 1,
        explanation: '`inc` is a compact, dedicated increment-by-one instruction. The key semantic difference from `add rax, 1` is that `inc`/`dec` preserve the **carry flag** (CF) while updating the other flags. That preservation is occasionally useful, but it also creates partial-flag-update hazards on some microarchitectures. See [INC](https://www.felixcloutier.com/x86/inc).',
      },
    ],
  },

  // ─── Level 3 ─────────────────────────────────────────────────────────────
  {
    id: 'assembly-3',
    language: 'assembly',
    level: 3,
    title: 'The Flags Register & Comparison (CMP)',
    timeEstimate: '4-6 hours',
    intro:
      "The CPU records the side effects of arithmetic in **RFLAGS**: the Zero Flag (ZF) when a result is zero, the Sign Flag (SF) when it is negative, the Carry Flag (CF) for unsigned overflow, and the Overflow Flag (OF) for signed overflow. The `cmp a, b` instruction computes `a - b` purely to set these flags — it throws the subtraction result away. Conditional jumps then read the flags. By the end of this phase you'll know exactly which flags `cmp` sets and how the signed (`jg`/`jl`) versus unsigned (`ja`/`jb`) jump families test them.\n\nLocally, single-step a `cmp`/`jcc` pair in GDB and watch the `eflags` field change. On the VM, set up comparisons that route to one of two labels and print which branch ran.",
    video: {
      title: 'Intro to x86 Assembly Language (Part 1)',
      youtubeId: 'wLXIWKUWpSs',
      channelName: 'Davy Wybiral',
    },
    topics: [
      { label: 'CMP — Felix Cloutier', url: 'https://www.felixcloutier.com/x86/cmp', note: 'Compare: subtracts and sets flags, discards the result.' },
      { label: 'EFLAGS / RFLAGS (OSDev)', url: 'https://wiki.osdev.org/CPU_Registers_x86', note: 'Bit layout of the flags register.' },
      { label: 'Jcc — Felix Cloutier', url: 'https://www.felixcloutier.com/x86/jcc', note: 'How each conditional jump reads the flags.' },
    ],
    deliverable: 'A program that compares two registers and prints 1 or 0 depending on which is larger.',
    checks: [
      {
        kind: 'code',
        id: 'assembly-3-code-1',
        prompt: 'Compare rax (8) with 5. If rax is greater, print 1; otherwise print 0. The skeleton uses cmp + jg.',
        boilerplate: '; is rax > 5 ?\nmov rax, 8\ncmp rax, 5       ; sets flags from rax - 5\njg greater       ; jump if rax > 5 (signed)\nmov rbx, 0\njmp done\ngreater:\nmov rbx, 1\ndone:\nprint rbx\nhlt\n',
        expectedOutput: '1',
        explanation: '`cmp rax, 5` computes `8 - 5 = 3`, setting ZF=0 and SF=0. `jg` (jump if greater, signed) is taken in that case, so control flows to `greater:` and `rbx` becomes 1. `cmp` itself does not store the difference anywhere — only the flags survive.',
      },
      {
        kind: 'code',
        id: 'assembly-3-code-2',
        prompt: 'Compare two equal values with cmp and use je to detect equality. Print 1 when equal. (rax=4, compared to 4)',
        boilerplate: '; equality test with je\nmov rax, 4\ncmp rax, 4\nje equal         ; jump if Zero Flag set (a == b)\nmov rcx, 0\njmp out\nequal:\nmov rcx, 1\nout:\nprint rcx\nhlt\n',
        expectedOutput: '1',
        explanation: '`cmp rax, 4` computes `4 - 4 = 0`, which sets the Zero Flag (ZF=1). `je` (alias `jz`) is taken when ZF=1, so the `equal:` branch runs and prints 1. Equality is just "the difference was zero."',
      },
      {
        kind: 'mcq',
        id: 'assembly-3-mcq-1',
        prompt: 'After `cmp rax, rbx` where `rax == rbx`, which flag is set?',
        options: [
          'The Sign Flag (SF).',
          'The Zero Flag (ZF), because the subtraction yields zero.',
          'The Carry Flag (CF).',
          'No flags are affected by cmp.',
        ],
        correctIndex: 1,
        explanation: '`cmp` performs `rax - rbx` and sets flags accordingly. When the operands are equal the result is zero, so the Zero Flag (ZF) is set. The conditional jump `je`/`jz` tests exactly this flag. See [CMP](https://www.felixcloutier.com/x86/cmp).',
      },
      {
        kind: 'mcq',
        id: 'assembly-3-mcq-2',
        prompt: 'Why are there separate jump families `jg`/`jl` and `ja`/`jb`?',
        options: [
          '`jg`/`jl` are for 64-bit values, `ja`/`jb` for 32-bit.',
          '`jg`/`jl` interpret the comparison as signed; `ja`/`jb` interpret it as unsigned.',
          'They are duplicates kept only for backward compatibility.',
          '`ja`/`jb` are for floating point.',
        ],
        correctIndex: 1,
        explanation: 'Greater/Less (`jg`/`jl`/`jge`/`jle`) test the *signed* relationship using SF, OF, and ZF. Above/Below (`ja`/`jb`/`jae`/`jbe`) test the *unsigned* relationship using CF and ZF. Choosing the wrong family is a classic bug, e.g. treating `0xFFFFFFFF` as a large positive number versus `-1`. See [Jcc](https://www.felixcloutier.com/x86/jcc).',
      },
      {
        kind: 'mcq',
        id: 'assembly-3-mcq-3',
        prompt: 'What is the key difference between `cmp` and `sub`?',
        options: [
          'They are identical in every way.',
          '`cmp` sets flags but discards the numeric result; `sub` sets flags *and* writes the difference to the destination.',
          '`cmp` cannot use immediates.',
          '`sub` does not affect any flags.',
        ],
        correctIndex: 1,
        explanation: 'Both compute `dst - src` and set the same flags, but `cmp` is purely for testing: it does not modify the destination register. `sub` stores the difference. So `cmp` is `sub` without the write-back — perfect for branching without clobbering your operand.',
      },
    ],
  },

  // ─── Level 4 ─────────────────────────────────────────────────────────────
  {
    id: 'assembly-4',
    language: 'assembly',
    level: 4,
    title: 'Control Flow — Labels, Jumps & Loops',
    timeEstimate: '5-7 hours',
    intro:
      "There are no `if`, `while`, or `for` keywords in assembly — only **labels** and **jumps**. A label `loop:` marks an address; `jmp loop` is an unconditional branch to it; conditional jumps (`je`, `jne`, `jg`, `jl`, …) branch only when the flags satisfy a condition. Every high-level loop and `if` you've ever written compiles into exactly this `cmp` + `jcc` + `jmp` pattern. By the end of this phase you'll hand-compile a counting loop and an `if/else`, and recognize the standard \"test at the bottom\" loop shape compilers prefer.\n\nLocally, write a loop that sums 1..N and confirm the result in GDB. On the VM, build a summation loop with a decrementing counter and print the total.",
    video: {
      title: 'Intro to x86 Assembly Language (Part 1)',
      youtubeId: 'wLXIWKUWpSs',
      channelName: 'Davy Wybiral',
    },
    topics: [
      { label: 'JMP — Felix Cloutier', url: 'https://www.felixcloutier.com/x86/jmp', note: 'Unconditional jump.' },
      { label: 'Jcc — Felix Cloutier', url: 'https://www.felixcloutier.com/x86/jcc', note: 'The full table of conditional jumps.' },
      { label: 'NASM — Labels', url: 'https://www.nasm.us/doc/nasmdoc3.html', note: 'How labels and local labels work in NASM.' },
      { label: 'LOOP — Felix Cloutier', url: 'https://www.felixcloutier.com/x86/loop', note: 'The dedicated (and usually avoided) loop instruction.' },
    ],
    deliverable: 'A loop that sums the integers 1..N into a register and prints the total.',
    checks: [
      {
        kind: 'code',
        id: 'assembly-4-code-1',
        prompt: 'Sum the integers 5 + 4 + 3 + 2 + 1 using a loop with a decrementing counter. Print the total (15).',
        boilerplate: '; sum 1..5 with a counting-down loop\nmov rax, 0       ; accumulator\nmov rcx, 5       ; counter\nloop:\nadd rax, rcx     ; rax += rcx\ndec rcx          ; rcx -= 1\ncmp rcx, 0       ; done when counter hits 0\njg loop          ; repeat while rcx > 0\nprint rax\nhlt\n',
        expectedOutput: '15',
        explanation: 'This is the canonical assembly loop: a body, a counter update (`dec rcx`), a `cmp` against the bound, and a conditional `jg` back to the top. It adds 5+4+3+2+1 = 15. Notice there is no loop keyword — just a label and a jump that the flags decide.',
      },
      {
        kind: 'code',
        id: 'assembly-4-code-2',
        prompt: 'Implement an if/else: if rax (3) equals 3, set rbx to 100, else 200. Print rbx.',
        boilerplate: '; if (rax == 3) rbx = 100 else rbx = 200\nmov rax, 3\ncmp rax, 3\njne else_branch\nmov rbx, 100\njmp end_if\nelse_branch:\nmov rbx, 200\nend_if:\nprint rbx\nhlt\n',
        expectedOutput: '100',
        explanation: 'An `if/else` compiles to: compare, jump-if-NOT-condition to the else label, run the then-block, then `jmp` over the else. Here `rax == 3` so `jne` is not taken, `rbx` becomes 100, and the unconditional `jmp end_if` skips the else block.',
      },
      {
        kind: 'mcq',
        id: 'assembly-4-mcq-1',
        prompt: 'What distinguishes `jmp` from `je`?',
        options: [
          '`jmp` always branches; `je` branches only if the Zero Flag is set.',
          '`jmp` is slower than `je`.',
          '`jmp` can only jump forward; `je` only backward.',
          'They are synonyms.',
        ],
        correctIndex: 0,
        explanation: '`jmp` is *unconditional* — it always transfers control. `je` (jump if equal / zero) is *conditional* — it branches only when ZF=1, typically right after a `cmp`. All structured control flow is built from these two kinds of jump. See [JMP](https://www.felixcloutier.com/x86/jmp) and [Jcc](https://www.felixcloutier.com/x86/jcc).',
      },
      {
        kind: 'mcq',
        id: 'assembly-4-mcq-2',
        prompt: `How many times does the body run?

\`\`\`asm
    mov rcx, 3
.loop:
    ; ... body ...
    dec rcx
    jnz .loop
\`\`\``,
        options: ['2 times', '3 times', '4 times', 'Infinitely'],
        correctIndex: 1,
        explanation: 'The body runs, then `dec rcx; jnz .loop` repeats while `rcx` is non-zero. Starting at 3, the counter takes the values 2, 1, 0 after each `dec`; the jump is taken on 2 and 1 but not on 0, so the body executes exactly 3 times. `.loop` is a NASM local label.',
      },
      {
        kind: 'mcq',
        id: 'assembly-4-mcq-3',
        prompt: 'Compilers often place the loop *condition test at the bottom* and `jmp` to it first. Why?',
        options: [
          'It is required by the CPU.',
          'A bottom-tested loop needs only one branch per iteration in the steady state, improving branch prediction and removing a jump from the hot path.',
          'Top-tested loops cannot use `cmp`.',
          'It makes the binary smaller in all cases.',
        ],
        correctIndex: 1,
        explanation: 'With the test at the bottom, each iteration executes the body then one conditional jump back — a single, highly predictable branch in the steady state. A naive top-tested loop needs both a conditional skip and an unconditional back-jump each iteration. The classic layout is an initial `jmp` to the condition, the body, then the test. See [Jcc](https://www.felixcloutier.com/x86/jcc).',
      },
    ],
  },

  // ─── Level 5 ─────────────────────────────────────────────────────────────
  {
    id: 'assembly-5',
    language: 'assembly',
    level: 5,
    title: 'The Stack — PUSH, POP & Calling Conventions',
    timeEstimate: '5-7 hours',
    intro:
      "The **stack** is a region of memory that grows *downward* (toward lower addresses) and is anchored by the stack pointer `rsp`. `push rax` decrements `rsp` by 8 and stores `rax` there; `pop rbx` loads from `[rsp]` into `rbx` and increments `rsp`. It's the CPU's scratchpad for saving registers and passing data — last-in, first-out. The **System V AMD64 ABI** (used by Linux/macOS) standardizes how functions share the stack and registers: integer arguments go in `rdi, rsi, rdx, rcx, r8, r9`; the return value comes back in `rax`. By the end you'll predict the order values come off a stack and name the argument registers.\n\nLocally, push a few values then pop them and watch `rsp` move by 8 each time in GDB. On the VM, `push`/`pop` model the LIFO behavior so you can verify the reversal.",
    video: {
      title: 'Intro to x86 Assembly Language (Part 1)',
      youtubeId: 'wLXIWKUWpSs',
      channelName: 'Davy Wybiral',
    },
    topics: [
      { label: 'PUSH — Felix Cloutier', url: 'https://www.felixcloutier.com/x86/push', note: 'Decrement rsp and store.' },
      { label: 'POP — Felix Cloutier', url: 'https://www.felixcloutier.com/x86/pop', note: 'Load and increment rsp.' },
      { label: 'System V AMD64 ABI', url: 'https://gitlab.com/x86-psABIs/x86-64-ABI', note: 'Official processor supplement: argument registers, alignment, red zone.' },
      { label: 'x86 Calling Conventions (Wikipedia)', url: 'https://en.wikipedia.org/wiki/X86_calling_conventions', note: 'Comparison of System V vs Microsoft x64 conventions.' },
    ],
    deliverable: 'A program that pushes several values and pops them in reverse, printing the LIFO order.',
    checks: [
      {
        kind: 'code',
        id: 'assembly-5-code-1',
        prompt: 'Push 10 then 20 onto the stack, then pop into rcx and rdx. Print rcx (the first pop). Expect 20.',
        boilerplate: '; LIFO: last pushed is first popped\nmov rax, 10\nmov rbx, 20\npush rax         ; stack: [10]\npush rbx         ; stack: [10, 20]\npop rcx          ; rcx = 20 (last in, first out)\npop rdx          ; rdx = 10\nprint rcx\nhlt\n',
        expectedOutput: '20',
        explanation: 'The stack is last-in, first-out. We push 10 then 20, so 20 is on top. The first `pop` therefore retrieves 20 into `rcx`, and the second retrieves 10 into `rdx`. On real hardware each `push` lowers `rsp` by 8 and each `pop` raises it by 8.',
      },
      {
        kind: 'code',
        id: 'assembly-5-code-2',
        prompt: 'Use the stack to swap two registers: push rax then rbx, then pop them into the opposite registers. Print rax. (rax starts 1, rbx starts 2)',
        boilerplate: '; swap rax and rbx via the stack\nmov rax, 1\nmov rbx, 2\npush rax         ; [1]\npush rbx         ; [1, 2]\npop rax          ; rax = 2\npop rbx          ; rbx = 1\nprint rax\nhlt\n',
        expectedOutput: '2',
        explanation: 'Pushing `rax` then `rbx` puts 2 on top. Popping into `rax` first gives it 2; popping into `rbx` gives it 1 — a swap. This LIFO ordering is exactly why nested function calls save and restore registers cleanly.',
      },
      {
        kind: 'mcq',
        id: 'assembly-5-mcq-1',
        prompt: 'In which direction does the stack grow on x86-64, and what does `push` do to `rsp`?',
        options: [
          'Upward; `push` increases `rsp` by 8.',
          'Downward; `push` decreases `rsp` by 8 and stores the value at the new top.',
          'It does not move `rsp` at all.',
          'Downward; `push` increases `rsp` by 8.',
        ],
        correctIndex: 1,
        explanation: 'The x86-64 stack grows toward *lower* addresses. `push` first subtracts 8 from `rsp` (one 64-bit slot), then writes the operand at `[rsp]`. `pop` reads `[rsp]` and then adds 8. See [PUSH](https://www.felixcloutier.com/x86/push).',
      },
      {
        kind: 'mcq',
        id: 'assembly-5-mcq-2',
        prompt: 'Under the System V AMD64 ABI, where is the **first integer argument** to a function passed?',
        options: [
          'On the stack at `[rsp]`.',
          'In `rax`.',
          'In `rdi`.',
          'In `rbx`.',
        ],
        correctIndex: 2,
        explanation: 'System V AMD64 passes the first six integer/pointer arguments in `rdi, rsi, rdx, rcx, r8, r9` (in that order); further arguments spill to the stack. The return value comes back in `rax`. Memorizing the order `rdi, rsi, rdx, rcx, r8, r9` is essential for calling C functions. See the [System V ABI](https://gitlab.com/x86-psABIs/x86-64-ABI).',
      },
      {
        kind: 'mcq',
        id: 'assembly-5-mcq-3',
        prompt: 'In the System V ABI, which registers must a *callee* preserve (save and restore) if it uses them?',
        options: [
          '`rax, rcx, rdx` — the caller-saved set.',
          '`rbx, rbp, r12–r15` (and `rsp`) — the callee-saved set.',
          'All sixteen registers.',
          'None; the caller always saves everything.',
        ],
        correctIndex: 1,
        explanation: 'Callee-saved (non-volatile) registers are `rbx`, `rbp`, `r12`, `r13`, `r14`, `r15`, plus `rsp`. A function that clobbers any of them must `push` them on entry and `pop` them before `ret`. The rest (`rax`, `rcx`, `rdx`, `rsi`, `rdi`, `r8`–`r11`) are caller-saved/volatile. See the [System V ABI](https://gitlab.com/x86-psABIs/x86-64-ABI).',
      },
    ],
  },

  // ─── Level 6 ─────────────────────────────────────────────────────────────
  {
    id: 'assembly-6',
    language: 'assembly',
    level: 6,
    title: 'Memory Addressing Modes & the Data Section',
    timeEstimate: '5-7 hours',
    intro:
      "Registers aren't enough — real programs touch memory. NASM splits a program into **sections**: `.text` holds code, `.data` holds initialized data (`msg db \"hi\", 0`), and `.bss` reserves uninitialized space (`buf resb 64`). To read or write memory you use brackets: `mov rax, [rsi]` loads the 8 bytes at the address in `rsi`. x86 offers a powerful general addressing form `[base + index*scale + displacement]`, e.g. `mov rax, [rdi + rcx*8]` to index an array of 64-bit values. By the end you'll decode any addressing expression and pick the right size directive (`db`/`dw`/`dd`/`dq`). (The VM here doesn't model memory, so this phase is taught and assessed through reading real NASM and computing addresses arithmetically.)",
    topics: [
      { label: 'NASM — Effective Addresses', url: 'https://www.nasm.us/doc/nasmdoc3.html', note: 'Bracket syntax and the [base+index*scale+disp] form.' },
      { label: 'NASM — Pseudo-Instructions (db/dw/dd/dq, resb)', url: 'https://www.nasm.us/doc/nasmdoc3.html', note: 'Declaring and reserving data.' },
      { label: 'LEA — Felix Cloutier', url: 'https://www.felixcloutier.com/x86/lea', note: 'Compute an address (or do arithmetic) without touching memory.' },
      { label: 'NASM — Sections / SECTION', url: 'https://www.nasm.us/doc/nasmdoc8.html', note: 'The SECTION directive and the standardized .text, .data, and .bss section names.' },
    ],
    deliverable: 'A written breakdown of [rdi + rcx*8 + 16] and a .data section declaring an array of qwords.',
    checks: [
      {
        kind: 'code',
        id: 'assembly-6-code-1',
        prompt: 'The VM has no real memory, so simulate "indexing" with arithmetic: a base value 100 plus index 2 times element-size 8. Print the computed address. (Expect 116)',
        boilerplate: '; simulate base + index*scale: 100 + 2*8\nmov rax, 2       ; index\nmov rbx, 8       ; scale (element size)\nimul rax, rbx    ; index * scale = 16\nadd rax, 100     ; + base = 116\nprint rax\nhlt\n',
        expectedOutput: '116',
        explanation: 'On real hardware `mov rax, [100 + rcx*8]` would *load from* the address `100 + index*8`. Here we just compute that address arithmetically (`2*8 + 100 = 116`) to illustrate the `base + index*scale + displacement` formula the CPU evaluates for every memory operand.',
      },
      {
        kind: 'mcq',
        id: 'assembly-6-mcq-1',
        prompt: `What does this real NASM instruction do, assuming \`rdi\` points to an array of 64-bit integers and \`rcx\` is an index?

\`\`\`asm
mov rax, [rdi + rcx*8]
\`\`\``,
        options: [
          'Stores `rax` into the array at index `rcx`.',
          'Loads `rax` with the array element at index `rcx` (the value at address `rdi + rcx*8`).',
          'Multiplies `rdi` by `rcx`.',
          'Loads the *address* `rdi + rcx*8` into `rax`.',
        ],
        correctIndex: 1,
        explanation: 'The brackets mean "the memory at this address." With base `rdi`, index `rcx`, and scale 8 (the size of a qword), the effective address is `rdi + rcx*8`, so this loads the `rcx`-th 64-bit element into `rax`. To get just the address you would use `lea` instead. See [NASM addressing](https://www.nasm.us/doc/nasmdoc3.html).',
      },
      {
        kind: 'mcq',
        id: 'assembly-6-mcq-2',
        prompt: 'Which NASM section is appropriate for a 64-byte uninitialized buffer, declared with `buf resb 64`?',
        options: [
          'The `.text` section.',
          'The `.data` section.',
          'The `.bss` section.',
          'The `.got` section.',
        ],
        correctIndex: 2,
        explanation: '`.bss` holds *uninitialized* data; it occupies no space in the file (the loader zero-fills it). You reserve space there with `resb`/`resw`/`resd`/`resq`. Initialized data with explicit bytes (`db`, `dq`, …) goes in `.data`; executable code goes in `.text`. See [NASM sections](https://www.nasm.us/doc/nasmdoc8.html).',
      },
      {
        kind: 'mcq',
        id: 'assembly-6-mcq-3',
        prompt: `What is the difference between these two real instructions?

\`\`\`asm
mov rax, [rbx]
lea rax, [rbx]
\`\`\``,
        options: [
          'They are identical.',
          '`mov` loads the *value* stored at address `rbx`; `lea` loads the *address* `rbx` itself (no memory access).',
          '`lea` loads the value; `mov` loads the address.',
          '`lea` only works with immediates.',
        ],
        correctIndex: 1,
        explanation: '`mov rax, [rbx]` dereferences — it reads memory at address `rbx`. `lea` (Load Effective Address) computes the address expression and stores the *address* without touching memory, e.g. `lea rax, [rbx + rcx*4 + 8]`. Because of this, `lea` is also a popular trick for fast arithmetic. See [LEA](https://www.felixcloutier.com/x86/lea).',
      },
      {
        kind: 'mcq',
        id: 'assembly-6-mcq-4',
        prompt: 'In `[rdi + rcx*8 + 16]`, the value `8` is the *scale*. Which scale values are legal in x86-64 addressing?',
        options: [
          'Any positive integer.',
          'Only 1, 2, 4, or 8.',
          'Only powers of two up to 64.',
          'Only 4 and 8.',
        ],
        correctIndex: 1,
        explanation: 'The scale factor in a memory operand must be exactly 1, 2, 4, or 8 — matching the sizes of a byte, word, dword, and qword. The displacement (`16` here) is a constant added in, `rdi` is the base, and `rcx` the index. See [NASM effective addresses](https://www.nasm.us/doc/nasmdoc3.html).',
      },
    ],
  },

  // ─── Level 7 ─────────────────────────────────────────────────────────────
  {
    id: 'assembly-7',
    language: 'assembly',
    level: 7,
    title: 'Functions — CALL, RET & Stack Frames',
    timeEstimate: '5-7 hours',
    intro:
      "A function call needs two things the CPU provides directly: `call label` pushes the address of the *next* instruction (the return address) onto the stack and jumps to `label`; `ret` pops that address back into `rip` and resumes. Between them, a function typically sets up a **stack frame** — `push rbp; mov rbp, rsp` — so local variables and arguments can be referenced at fixed offsets like `[rbp-8]`. By the end you'll trace what `call`/`ret` do to the stack and read a standard prologue/epilogue. (`call`/`ret` and `[rbp-8]` aren't modeled by this VM, so we assess them by reading real NASM; the runnable check below mimics a call/return using the System V argument and return registers.)",
    video: {
      title: 'Intro to x86 Assembly Language (Part 1)',
      youtubeId: 'wLXIWKUWpSs',
      channelName: 'Davy Wybiral',
    },
    topics: [
      { label: 'CALL — Felix Cloutier', url: 'https://www.felixcloutier.com/x86/call', note: 'Pushes the return address and jumps.' },
      { label: 'RET — Felix Cloutier', url: 'https://www.felixcloutier.com/x86/ret', note: 'Pops the return address and resumes.' },
      { label: 'LEAVE — Felix Cloutier', url: 'https://www.felixcloutier.com/x86/leave', note: 'Tears down a stack frame: mov rsp, rbp; pop rbp.' },
      { label: 'System V AMD64 ABI', url: 'https://gitlab.com/x86-psABIs/x86-64-ABI', note: 'Frame layout, alignment, and the red zone.' },
    ],
    deliverable: 'A hand-written function with a proper prologue/epilogue that returns a value in rax, plus a trace of the stack across call/ret.',
    checks: [
      {
        kind: 'code',
        id: 'assembly-7-code-1',
        prompt: 'Model a function that adds 3 to its argument. Put the "argument" 39 in rdi, compute the result in rax, and print it. (Expect 42 — like a return value in rax.)',
        boilerplate: '; mimic: int add3(int x) { return x + 3; }\nmov rdi, 39      ; first argument (System V) goes in rdi\nmov rax, rdi     ; move arg into rax to compute the result\nadd rax, 3       ; rax = rdi + 3\nprint rax        ; return value lives in rax\nhlt\n',
        expectedOutput: '42',
        explanation: 'This mirrors the System V convention: the first integer argument arrives in `rdi`, and the return value departs in `rax`. A real function body would be reached by `call` and end with `ret`; here we inline it because the VM does not model the call stack for arguments, but the register usage is authentic.',
      },
      {
        kind: 'mcq',
        id: 'assembly-7-mcq-1',
        prompt: 'What exactly does the `call` instruction do?',
        options: [
          'It jumps to the target without saving anything.',
          'It pushes the address of the following instruction (the return address) onto the stack, then jumps to the target.',
          'It pops a return address and jumps there.',
          'It only sets a flag.',
        ],
        correctIndex: 1,
        explanation: '`call target` pushes `rip` (pointing at the instruction *after* the call) onto the stack, then sets `rip` to `target`. The matching `ret` pops that saved address back into `rip`, resuming right after the call. This push/pop of the return address is what makes nested and recursive calls work. See [CALL](https://www.felixcloutier.com/x86/call).',
      },
      {
        kind: 'mcq',
        id: 'assembly-7-mcq-2',
        prompt: `What is the purpose of this standard function *prologue*?

\`\`\`asm
push rbp
mov rbp, rsp
sub rsp, 16
\`\`\``,
        options: [
          'It returns from the function.',
          'It saves the old base pointer, sets up a new frame pointer, and reserves 16 bytes for locals.',
          'It pushes the function arguments.',
          'It zeroes all registers.',
        ],
        correctIndex: 1,
        explanation: 'The prologue saves the caller’s `rbp`, points `rbp` at the current stack top to anchor the frame, then `sub rsp, 16` carves out space for local variables (kept 16-byte aligned). Locals are then addressed as `[rbp-8]`, `[rbp-16]`, etc. The epilogue (`leave; ret` or `mov rsp,rbp; pop rbp; ret`) reverses it. See [LEAVE](https://www.felixcloutier.com/x86/leave).',
      },
      {
        kind: 'mcq',
        id: 'assembly-7-mcq-3',
        prompt: 'A function does `push rbx` on entry but forgets the matching `pop rbx` before `ret`. What happens at `ret`?',
        options: [
          'Nothing — `ret` ignores extra stack data.',
          '`ret` pops the wrong value (the pushed `rbx`) as the return address and jumps to a garbage location, likely crashing.',
          'The program prints a warning and continues.',
          'The CPU automatically balances the stack.',
        ],
        correctIndex: 1,
        explanation: '`ret` blindly pops whatever is on top of the stack into `rip`. If you left an unbalanced `push` on the stack, `ret` treats that value as the return address and jumps somewhere bogus — a classic source of crashes and the mechanism behind stack-smashing exploits. Stack discipline (every push has a matching pop before `ret`) is mandatory. See [RET](https://www.felixcloutier.com/x86/ret).',
      },
    ],
  },

  // ─── Level 8 ─────────────────────────────────────────────────────────────
  {
    id: 'assembly-8',
    language: 'assembly',
    level: 8,
    title: 'The Syscall Interface — write & exit on Linux',
    timeEstimate: '5-7 hours',
    intro:
      "To actually do anything observable — print text, read a file, exit cleanly — a Linux program asks the kernel via the **`syscall`** instruction. The convention differs from a function call: the syscall *number* goes in `rax`, and arguments go in `rdi, rsi, rdx, r10, r8, r9` (note `r10`, not `rcx`, because `syscall` clobbers `rcx`). To print, you invoke `write` (number 1) with fd 1 (stdout), a buffer pointer, and a length; to terminate you invoke `exit` (number 60). By the end you'll write a real \"Hello, World\" using only syscalls and know why `rcx`/`r11` are special. (Syscalls aren't available on this VM — the `print` pseudo-op stands in for `write` — so this phase is taught and tested by reading real NASM.)",
    topics: [
      { label: 'SYSCALL — Felix Cloutier', url: 'https://www.felixcloutier.com/x86/syscall', note: 'How the syscall instruction transfers to the kernel; rcx/r11 behavior.' },
      { label: 'syscalls(2) — Full Syscall List', url: 'https://man7.org/linux/man-pages/man2/syscalls.2.html', note: 'The complete list of Linux system calls; write, read, and exit among them.' },
      { label: 'syscall(2) man page', url: 'https://man7.org/linux/man-pages/man2/syscall.2.html', note: 'The Linux syscall calling convention per architecture.' },
      { label: 'write(2) man page', url: 'https://man7.org/linux/man-pages/man2/write.2.html', note: 'The write system call semantics.' },
    ],
    deliverable: 'A complete NASM "Hello, World" using only the write and exit syscalls, assembled and run on Linux.',
    checks: [
      {
        kind: 'code',
        id: 'assembly-8-code-1',
        prompt: 'On this VM the `print` pseudo-op stands in for the write syscall. Print the greeting that a real `write(1, msg, len)` would output.',
        boilerplate: '; stand-in for: write(fd=1, buf=msg, len) then exit(0)\nmov rax, 1       ; (on real Linux: syscall number for write)\nmov rdi, 1       ; (fd 1 = stdout)\nprint "Hello from a syscall!"\nhlt              ; (on real Linux: this would be exit, syscall 60)\n',
        expectedOutput: 'Hello from a syscall!',
        explanation: 'On real Linux you would set `rax=1` (write), `rdi=1` (stdout), `rsi=msg`, `rdx=len`, then execute `syscall`; to terminate you set `rax=60` (exit), `rdi=0`, `syscall`. The VM has no kernel, so `print` emulates the visible effect of `write`. The MCQs below cover the real mechanics.',
      },
      {
        kind: 'mcq',
        id: 'assembly-8-mcq-1',
        prompt: 'In the Linux x86-64 syscall convention, which register holds the **syscall number**?',
        options: ['`rdi`', '`rax`', '`rcx`', '`rbx`'],
        correctIndex: 1,
        explanation: 'The syscall number goes in `rax` (e.g. 1 for `write`, 60 for `exit`). The arguments go in `rdi, rsi, rdx, r10, r8, r9`. The kernel returns the result in `rax`. This differs from the user-space function ABI, where `rax` is the *return* value rather than a selector. See [syscall(2)](https://man7.org/linux/man-pages/man2/syscall.2.html).',
      },
      {
        kind: 'mcq',
        id: 'assembly-8-mcq-2',
        prompt: 'Why does the Linux syscall ABI use `r10` for the 4th argument instead of `rcx` (which the function-call ABI uses)?',
        options: [
          'Because `rcx` does not exist in 64-bit mode.',
          'Because the `syscall` instruction itself destroys `rcx` (it stores the return address there) and `r11` (the flags).',
          'Because `r10` is faster than `rcx`.',
          'It is an arbitrary historical accident with no reason.',
        ],
        correctIndex: 1,
        explanation: 'The `syscall` instruction saves the return RIP into `rcx` and the RFLAGS into `r11` as part of its operation, clobbering both. Since `rcx` can’t survive the transition, the kernel ABI substitutes `r10` as the fourth argument register. See [SYSCALL](https://www.felixcloutier.com/x86/syscall).',
      },
      {
        kind: 'mcq',
        id: 'assembly-8-mcq-3',
        prompt: `What does this real NASM snippet do?

\`\`\`asm
mov rax, 60       ; exit
mov rdi, 0        ; status
syscall
\`\`\``,
        options: [
          'Prints the number 60.',
          'Calls a function named exit.',
          'Terminates the process with exit status 0 (success).',
          'Reads input into rdi.',
        ],
        correctIndex: 2,
        explanation: 'Syscall number 60 is `exit`. With `rdi=0` it terminates the process with status 0 (success). Every assembly program must end with an `exit` syscall; otherwise execution would run off the end of your code into garbage. See [syscalls(2)](https://man7.org/linux/man-pages/man2/syscalls.2.html).',
      },
    ],
  },

  // ─── Level 9 ─────────────────────────────────────────────────────────────
  {
    id: 'assembly-9',
    language: 'assembly',
    level: 9,
    title: 'Data Structures in Memory — Arrays & Structs by Offset',
    timeEstimate: '5-7 hours',
    intro:
      "There are no `array[i]` or `obj.field` syntaxes at the machine level — only addresses and offsets. An **array** of N-byte elements is laid out contiguously, so element `i` lives at `base + i*N`; you reach it with `[base + index*scale]`. A **struct** is just a block of bytes where each field sits at a fixed *displacement* from the start, e.g. a `{ int id; long balance; }` might place `id` at offset 0 and `balance` at offset 8 (after alignment padding). By the end you'll compute element addresses, understand why the compiler inserts padding, and read field accesses like `[rdi + 8]`. (Memory isn't modeled by the VM, so we assess this by reading real NASM and computing offsets arithmetically.)",
    topics: [
      { label: 'NASM — Effective Addresses', url: 'https://www.nasm.us/doc/nasmdoc3.html', note: 'Array indexing with base+index*scale.' },
      { label: 'Data Structure Alignment (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Data_structure_alignment', note: 'Why fields get padded and how offsets are chosen.' },
      { label: 'System V AMD64 ABI', url: 'https://gitlab.com/x86-psABIs/x86-64-ABI', note: 'Aggregate (struct) layout and alignment rules.' },
      { label: 'MOVZX / MOVSX — Felix Cloutier', url: 'https://www.felixcloutier.com/x86/movzx', note: 'Loading narrow fields into wide registers with zero/sign extension.' },
    ],
    deliverable: 'A note computing the byte offset of every element of a qword array and the field offsets (with padding) of a small struct.',
    checks: [
      {
        kind: 'code',
        id: 'assembly-9-code-1',
        prompt: 'Compute the address of element index 3 in an array of 4-byte ints whose base address is 200 (offset = base + index*4). Print it. (Expect 212)',
        boilerplate: '; address of int_array[3], base=200, element size 4\nmov rax, 3       ; index\nmov rbx, 4       ; element size (dword)\nimul rax, rbx    ; index * size = 12\nadd rax, 200     ; + base\nprint rax\nhlt\n',
        expectedOutput: '212',
        explanation: 'Array indexing is pure arithmetic: `element_addr = base + index * element_size`. For `int_array[3]` with 4-byte ints and base 200, that is `200 + 3*4 = 212`. The CPU does this automatically inside `[200 + rcx*4]`; here we spell it out.',
      },
      {
        kind: 'code',
        id: 'assembly-9-code-2',
        prompt: 'A struct { int id; long balance; } places balance at offset 8. Given a base address 500, compute the address of `balance` and print it. (Expect 508)',
        boilerplate: '; struct Account { int id; (4 bytes + 4 pad) long balance @ offset 8 }\nmov rax, 500     ; base address of the struct\nadd rax, 8       ; + offset of balance field\nprint rax\nhlt\n',
        expectedOutput: '508',
        explanation: 'Field access compiles to `base + field_offset`. `id` (a 4-byte int) sits at offset 0; `balance` (an 8-byte long) must be 8-byte aligned, so the compiler inserts 4 bytes of padding and places `balance` at offset 8. The address is therefore `500 + 8 = 508`.',
      },
      {
        kind: 'mcq',
        id: 'assembly-9-mcq-1',
        prompt: `\`rsi\` points to the start of an array of 64-bit integers. What is at \`[rsi + 16]\`?

\`\`\`asm
mov rax, [rsi + 16]
\`\`\``,
        options: [
          'Element index 16.',
          'Element index 2 (since each element is 8 bytes, 16 / 8 = 2).',
          'The address rsi + 16.',
          'The first element.',
        ],
        correctIndex: 1,
        explanation: 'Each 64-bit element is 8 bytes wide, so a displacement of 16 bytes lands on element `16 / 8 = 2` (the third element). Equivalently the compiler could emit `[rsi + rcx*8]` with `rcx=2`. Byte offsets, not element indices, appear in machine code. See [NASM addressing](https://www.nasm.us/doc/nasmdoc3.html).',
      },
      {
        kind: 'mcq',
        id: 'assembly-9-mcq-2',
        prompt: 'In a C struct `struct S { char c; int x; };`, why does `x` typically sit at offset 4 rather than offset 1?',
        options: [
          'Compilers always waste space.',
          'Because of alignment: a 4-byte `int` must start at a 4-byte boundary, so 3 padding bytes follow the `char`.',
          'Because `char` is actually 4 bytes.',
          '`x` is stored before `c` in memory.',
        ],
        correctIndex: 1,
        explanation: 'Alignment rules require an N-byte scalar to sit at an address that is a multiple of N (for performance and, on some ISAs, correctness). The 1-byte `char` at offset 0 is followed by 3 bytes of padding so the 4-byte `int` can begin at offset 4. Reordering fields large-to-small minimizes such padding. See [Data structure alignment](https://en.wikipedia.org/wiki/Data_structure_alignment).',
      },
      {
        kind: 'mcq',
        id: 'assembly-9-mcq-3',
        prompt: 'You need to load a single unsigned byte from `[rdi]` into the full 64-bit `rax` with the upper bits cleared. Which instruction is correct?',
        options: [
          '`mov rax, [rdi]` — loads 8 bytes.',
          '`movzx rax, byte [rdi]` — zero-extends the byte into rax.',
          '`movsx rax, byte [rdi]` — sign-extends the byte.',
          '`lea rax, [rdi]` — computes the address.',
        ],
        correctIndex: 1,
        explanation: '`movzx` (move with zero-extend) reads the narrow source (here a byte) and fills the upper bits of the destination with zeros — exactly right for an *unsigned* byte. `movsx` would replicate the sign bit (for signed values), and a plain `mov rax, [rdi]` would read 8 bytes, not 1. See [MOVZX](https://www.felixcloutier.com/x86/movzx).',
      },
    ],
  },

  // ─── Level 10 ────────────────────────────────────────────────────────────
  {
    id: 'assembly-10',
    language: 'assembly',
    level: 10,
    title: 'SIMD, Optimization & Reading Compiler Output',
    timeEstimate: '6-8 hours',
    intro:
      "The final phase looks outward: how modern code actually runs fast, and how to read what compilers produce. **SIMD** (Single Instruction, Multiple Data) lets one instruction operate on several values at once — SSE uses 128-bit `xmm` registers (e.g. `paddd xmm0, xmm1` adds four 32-bit ints in parallel), AVX widens this to 256-bit `ymm` and AVX-512 to 512-bit `zmm`. You'll also learn to read disassembly and **Compiler Explorer (godbolt.org)** output, recognizing idioms like `xor eax, eax` (the fastest way to zero a register) and `lea` used for arithmetic. By the end you'll interpret optimized assembly and explain common compiler tricks. (SIMD and these idioms exceed the VM; the runnable check shows one lane's result, while MCQs cover the real instructions.)",
    topics: [
      { label: 'PADDB/PADDW/PADDD/PADDQ — Felix Cloutier', url: 'https://www.felixcloutier.com/x86/paddb:paddw:paddd:paddq', note: 'Packed integer addition (SSE/AVX SIMD).' },
      { label: 'Intel Intrinsics Guide', url: 'https://www.intel.com/content/www/us/en/docs/intrinsics-guide/index.html', note: 'Searchable reference for SSE/AVX/AVX-512 instructions and intrinsics.' },
      { label: 'Compiler Explorer (godbolt.org)', url: 'https://godbolt.org/', note: 'See the assembly your C/C++/Rust compiles to, live.' },
      { label: 'XOR — Felix Cloutier', url: 'https://www.felixcloutier.com/x86/xor', note: 'Why `xor eax, eax` is the idiomatic register-zeroing trick.' },
      { label: 'Agner Fog — Optimization Manuals', url: 'https://www.agner.org/optimize/', note: 'Authoritative low-level optimization and instruction-timing guides.' },
    ],
    deliverable: 'Paste a small loop into Compiler Explorer at -O2, identify the SIMD/vectorized instructions, and annotate three compiler idioms you recognize.',
    checks: [
      {
        kind: 'code',
        id: 'assembly-10-code-1',
        prompt: 'A SIMD lane adds two values in parallel; simulate ONE lane: add 10 + 20 and print the result (30). (Real `paddd` would do four such adds at once.)',
        boilerplate: '; one lane of a packed add (paddd does 4 lanes simultaneously)\nmov rax, 10\nmov rbx, 20\nadd rax, rbx     ; this lane: 10 + 20\nprint rax\nhlt\n',
        expectedOutput: '30',
        explanation: 'SIMD does not change the arithmetic of a single lane — it just performs many lanes at once. `paddd xmm0, xmm1` computes four independent 32-bit additions in parallel. Here we show one lane (`10+20=30`) on the scalar VM; the speedup on real hardware comes from doing four (or eight, or sixteen) at the same time.',
      },
      {
        kind: 'mcq',
        id: 'assembly-10-mcq-1',
        prompt: `Optimized x86-64 code routinely begins a function with this. Why?

\`\`\`asm
xor eax, eax
\`\`\``,
        options: [
          'It is a no-op the compiler forgot to remove.',
          'It is the smallest, fastest way to set `rax` to 0 (and writing `eax` zeros the upper 32 bits too).',
          'It compares `eax` with itself.',
          'It negates `eax`.',
        ],
        correctIndex: 1,
        explanation: 'XORing a register with itself yields zero, and `xor eax, eax` encodes in just 2 bytes versus 5+ for `mov eax, 0`. The CPU also special-cases it as a zeroing idiom (breaking dependency chains), and writing the 32-bit `eax` clears the full 64-bit `rax`. That is why compilers prefer it. See [XOR](https://www.felixcloutier.com/x86/xor).',
      },
      {
        kind: 'mcq',
        id: 'assembly-10-mcq-2',
        prompt: 'What does the SIMD instruction `paddd xmm0, xmm1` do?',
        options: [
          'Adds two 64-bit scalars.',
          'Adds four pairs of packed 32-bit integers (four lanes) in parallel, lane by lane.',
          'Adds the floating-point doubles in xmm0 and xmm1.',
          'Concatenates xmm0 and xmm1.',
        ],
        correctIndex: 1,
        explanation: 'A 128-bit `xmm` register holds four 32-bit integers. `paddd` (Packed ADD Dword) adds them lane-wise: `xmm0[0]+xmm1[0]`, `xmm0[1]+xmm1[1]`, and so on, producing four sums with one instruction. AVX `vpaddd` on `ymm`/`zmm` extends this to 8 or 16 lanes. See [PADDD](https://www.felixcloutier.com/x86/paddb:paddw:paddd:paddq).',
      },
      {
        kind: 'mcq',
        id: 'assembly-10-mcq-3',
        prompt: 'In optimized output you see `lea rax, [rdi + rdi*2]`. What is the compiler doing?',
        options: [
          'Loading a value from memory at `rdi*3`.',
          'Computing `rax = rdi * 3` cheaply, using the address-calculation unit instead of a multiply.',
          'Adding `rdi` to itself once.',
          'Comparing `rdi` to `rax`.',
        ],
        correctIndex: 1,
        explanation: '`lea` computes an address *expression* without dereferencing memory, so compilers exploit it for arithmetic: `[rdi + rdi*2]` equals `rdi*3`, computed in one fast instruction on the address-generation unit (often cheaper than `imul`). Spotting `lea` used for math is a hallmark of optimized code. See [LEA](https://www.felixcloutier.com/x86/lea).',
      },
      {
        kind: 'mcq',
        id: 'assembly-10-mcq-4',
        prompt: 'When a compiler turns a scalar loop into SIMD instructions, this transformation is called what?',
        options: [
          'Inlining',
          'Auto-vectorization',
          'Constant folding',
          'Tail-call optimization',
        ],
        correctIndex: 1,
        explanation: 'Auto-vectorization is the compiler optimization that converts a scalar loop (one element per iteration) into SIMD form (several elements per iteration) using vector instructions like `paddd`/`vpaddd`. You can observe it on [Compiler Explorer](https://godbolt.org/) by compiling a summation loop at `-O3` and watching `xmm`/`ymm` registers appear. The other options are unrelated optimizations.',
      },
    ],
  },
];
