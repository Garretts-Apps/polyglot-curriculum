import type { Phase } from './types';

export const rubyPhases: Phase[] = [
  // ─── Level 0 ─────────────────────────────────────────────────────────────
  {
    id: 'ruby-0',
    language: 'ruby',
    level: 0,
    title: 'Setup & Hello World',
    timeEstimate: '0.5-1 hours',
    intro:
      "Welcome to Ruby — a language famously \"optimised for programmer happiness.\" In this level you'll confirm Ruby is installed (`ruby -v`), meet the interactive shell `irb`, and run your first script. Absolute beginners start here. Ruby ships with macOS and most Linux distributions, and Windows users install it via RubyInstaller.",
    topics: [
      {
        label: 'Installing Ruby',
        url: 'https://www.ruby-lang.org/en/documentation/installation/',
        note: 'Official install guide (rbenv, RVM, package managers, RubyInstaller).',
      },
      {
        label: 'Ruby in Twenty Minutes',
        url: 'https://www.ruby-lang.org/en/documentation/quickstart/',
        note: 'The canonical first-tour of the language and irb.',
      },
      {
        label: 'TryRuby (online REPL)',
        url: 'https://try.ruby-lang.org/',
        note: 'Run Ruby in the browser with no install.',
      },
    ],
    deliverable: 'Run `ruby -v` and `irb` locally, then print a greeting from a `main.rb` script.',
    checks: [
      {
        kind: 'code',
        id: 'ruby-0-code-1',
        prompt: 'Run the starter program so it prints `Hello, World!` to standard output.',
        boilerplate: 'puts "Hello, World!"\n',
        expectedOutput: 'Hello, World!',
        explanation:
          '`puts` ("put string") writes its argument to standard output followed by a newline. Unlike many languages, Ruby needs no `main` function, no imports, and no semicolons — a single statement in a `.rb` file is a complete program.',
      },
      {
        kind: 'mcq',
        id: 'ruby-0-mcq-1',
        prompt: 'Which command starts Ruby\'s interactive shell, where you can type expressions and see their results immediately?',
        options: ['`irb`', '`ruby repl`', '`gem console`', '`rb -i`'],
        correctIndex: 0,
        explanation:
          '`irb` (Interactive Ruby) is the REPL bundled with every Ruby install. It echoes the return value of each expression with `=>`, which makes it ideal for experimentation. Modern Ruby also ships `rdbg` for debugging.',
      },
      {
        kind: 'mcq',
        id: 'ruby-0-mcq-2',
        prompt: 'What is the conventional file extension for a Ruby source file?',
        options: ['`.rb`', '`.ruby`', '`.rby`', '`.r`'],
        correctIndex: 0,
        explanation:
          'Ruby scripts use the `.rb` extension and are run with `ruby main.rb`. (`.r` belongs to the R language, and `.gemspec`/`.rake` are specialised Ruby-adjacent files.)',
      },
    ],
  },

  // ─── Level 1 ─────────────────────────────────────────────────────────────
  {
    id: 'ruby-1',
    language: 'ruby',
    level: 1,
    title: 'Ruby Basics — Variables, Strings & Methods',
    timeEstimate: '4-6 hours',
    intro: `By the end of this phase you'll read short Ruby programs and predict their output, focusing on the things that surprise newcomers: everything returns a value, methods need no \`return\` for their last expression, and strings interpolate with \`#{}\` only inside double quotes. You'll learn variable naming conventions (\`snake_case\`), the difference between \`puts\`, \`print\`, and \`p\`, and how to define methods with \`def ... end\`.

To build the muscle, write a small script locally: a \`tip_calculator.rb\` that defines a \`total(bill, percent)\` method and prints the bill, tip, and grand total using string interpolation. Run it with \`ruby tip_calculator.rb\` and experiment in \`irb\` by calling the method with different arguments.`,
    video: {
      title: 'Ruby Programming Language - Full Course',
      youtubeId: 't_ispmWmdjY',
      channelName: 'freeCodeCamp.org',
      duration: '3 hours',
    },
    topics: [
      { label: 'Ruby in Twenty Minutes', url: 'https://www.ruby-lang.org/en/documentation/quickstart/', note: 'Variables, methods, and strings hands-on.' },
      { label: 'String class reference', url: 'https://docs.ruby-lang.org/en/master/String.html', note: 'Every string method, with examples.' },
      { label: 'Integer & Float', url: 'https://docs.ruby-lang.org/en/master/Integer.html', note: 'Numeric types and arithmetic.' },
      { label: 'Kernel#puts / print / p', url: 'https://docs.ruby-lang.org/en/master/Kernel.html#method-i-puts', note: 'The three core output methods and how they differ.' },
      { label: 'Ruby Style Guide', url: 'https://rubystyle.guide/', note: 'Community conventions: snake_case, 2-space indent, etc.' },
      { label: 'Defining methods', url: 'https://docs.ruby-lang.org/en/master/syntax/methods_rdoc.html', note: 'def/end, default args, implicit return.' },
    ],
    deliverable: 'Write a `tip_calculator.rb` that prints bill, tip, and total via string interpolation.',
    checks: [
      {
        kind: 'code',
        id: 'ruby-1-code-1',
        prompt: 'Finish the `greet` method so the program prints `Hello, Ada!`. Use string interpolation with `#{name}`.',
        boilerplate: 'def greet(name)\n  puts "Hello, #{name}!"\nend\n\ngreet("Ada")\n',
        expectedOutput: 'Hello, Ada!',
        explanation:
          'Inside double-quoted strings, `#{...}` evaluates any Ruby expression and inserts its `to_s` value. Single-quoted strings do NOT interpolate — `\'Hello, #{name}\'` would print the literal `#{name}`. This is one of the most common beginner gotchas.',
        testCases: [
          { input: 'greet("Ruby")', expectedOutput: 'Hello, Ruby!', description: 'Interpolates a different name' },
        ],
      },
      {
        kind: 'code',
        id: 'ruby-1-code-2',
        prompt: 'Complete `total` so it returns the bill plus a tip. The program should print `total=23` for a $20 bill at 15%.',
        boilerplate: 'def total(bill, percent)\n  return bill + bill * percent / 100\nend\n\nputs "total=#{total(20, 15)}"\n',
        expectedOutput: 'total=23',
        explanation:
          'Integer arithmetic in Ruby truncates: `20 * 15 / 100` is `300 / 100 = 3`, so the total is `23`. The `return` keyword is optional here — a method returns the value of its last evaluated expression automatically, so `bill + bill * percent / 100` alone would work too.',
      },
      {
        kind: 'mcq',
        id: 'ruby-1-mcq-1',
        prompt: `What does this program print?

\`\`\`ruby
name = 'Ada'
puts 'Hello, #{name}'
\`\`\``,
        options: [
          '`Hello, #{name}`',
          '`Hello, Ada`',
          '`Hello, `',
          'A syntax error',
        ],
        correctIndex: 0,
        explanation:
          'Single-quoted strings in Ruby are nearly literal: they do not perform `#{}` interpolation and only honour `\\\\` and `\\\'` escapes. To interpolate you must use double quotes: `"Hello, #{name}"`. See the [String literals documentation](https://docs.ruby-lang.org/en/master/syntax/literals_rdoc.html#label-Strings).',
      },
      {
        kind: 'mcq',
        id: 'ruby-1-mcq-2',
        prompt: `What is the difference between \`puts [1, 2]\` and \`p [1, 2]\`?`,
        options: [
          'They are identical — both print `[1, 2]`.',
          '`puts` prints each element on its own line; `p` prints the inspected form `[1, 2]` and returns the array.',
          '`p` raises an error because it only accepts strings.',
          '`puts` returns the array while `p` returns nil.',
        ],
        correctIndex: 1,
        explanation:
          '`puts` calls `to_s` and, given an array, prints each element on its own line, returning `nil`. `p` calls `inspect` (showing `[1, 2]` with brackets and quotes around strings) and conveniently returns its argument, which makes `p` ideal for debugging. See [Kernel#p](https://docs.ruby-lang.org/en/master/Kernel.html#method-i-p).',
      },
      {
        kind: 'mcq',
        id: 'ruby-1-mcq-3',
        prompt: `What does this method return when called as \`describe(5)\`?

\`\`\`ruby
def describe(n)
  result = n * 2
  "doubled"
end
\`\`\``,
        options: [
          '`10`',
          '`"doubled"`',
          '`nil`',
          '`5`',
        ],
        correctIndex: 1,
        explanation:
          'A Ruby method returns the value of its LAST evaluated expression. Here the last line is the string literal `"doubled"`, so that is the return value — the earlier assignment to `result` is computed but discarded. Explicit `return` is only needed for early exits.',
      },
    ],
  },

  // ─── Level 2 ─────────────────────────────────────────────────────────────
  {
    id: 'ruby-2',
    language: 'ruby',
    level: 2,
    title: 'Collections — Arrays, Hashes, Blocks & Iterators',
    timeEstimate: '4-6 hours',
    intro: `This phase is where Ruby starts to feel like Ruby. You'll work with \`Array\` and \`Hash\` and — crucially — learn **blocks**, the chunks of code you pass to iterators like \`each\`, \`map\`, and \`select\`. By the end you'll prefer \`numbers.map { |n| n * 2 }\` over manual index loops, and you'll understand the two block syntaxes (\`{ ... }\` vs \`do ... end\`).

To practise locally, write \`word_count.rb\`: split a sentence into words with \`String#split\`, count them, and print each word with its length using \`each_with_index\`. Experiment with \`map\`, \`select\`, and \`reduce\` in \`irb\` until chaining them feels natural.`,
    video: {
      title: 'Ruby Programming Language - Full Course',
      youtubeId: 't_ispmWmdjY',
      channelName: 'freeCodeCamp.org',
      duration: '3 hours',
    },
    topics: [
      { label: 'Array class reference', url: 'https://docs.ruby-lang.org/en/master/Array.html', note: 'map, select, reject, reduce, each, and friends.' },
      { label: 'Hash class reference', url: 'https://docs.ruby-lang.org/en/master/Hash.html', note: 'Key/value collections and their iterators.' },
      { label: 'Blocks, Procs & Lambdas', url: 'https://docs.ruby-lang.org/en/master/syntax/proc_rdoc.html', note: 'How blocks attach to method calls.' },
      { label: 'Enumerable module', url: 'https://docs.ruby-lang.org/en/master/Enumerable.html', note: 'The mixin that powers map/select/etc. on any collection.' },
      { label: 'Integer#times / Range#each', url: 'https://docs.ruby-lang.org/en/master/Integer.html#method-i-times', note: 'Counting iterators used throughout Ruby.' },
    ],
    deliverable: 'Write `word_count.rb` that splits a sentence, counts words, and prints each word with its length.',
    checks: [
      {
        kind: 'code',
        id: 'ruby-2-code-1',
        prompt: 'Use a range iterator to print the squares of 1 through 4. The output should include `4 squared is 16`.',
        boilerplate: '(1..4).each do |n|\n  puts "#{n} squared is #{n * n}"\nend\n',
        expectedOutput: '4 squared is 16',
        explanation:
          '`(1..4)` is an inclusive `Range`; calling `.each` with a block runs the block once per element, binding the block parameter `n` between the pipes `| |`. This is the idiomatic Ruby loop — you almost never write a C-style `for` index loop.',
      },
      {
        kind: 'code',
        id: 'ruby-2-code-2',
        prompt: 'Use `5.times` to print a step log. The output must include `step 4 of 5`.',
        boilerplate: '5.times do |i|\n  puts "step #{i} of 5"\nend\n',
        expectedOutput: 'step 4 of 5',
        explanation:
          'Integers respond to `times`, which yields `0` up to `n - 1`. Because everything in Ruby is an object, even a literal like `5` has methods. The block variable `i` therefore ranges 0..4 here.',
      },
      {
        kind: 'mcq',
        id: 'ruby-2-mcq-1',
        prompt: `What does this print?

\`\`\`ruby
nums = [1, 2, 3, 4]
result = nums.select { |n| n.even? }
p result
\`\`\``,
        options: [
          '`[2, 4]`',
          '`[1, 3]`',
          '`true`',
          '`[1, 2, 3, 4]`',
        ],
        correctIndex: 0,
        explanation:
          '`select` (alias `filter`) keeps the elements for which the block returns a truthy value. `n.even?` is true for `2` and `4`, so they are kept. Its opposite is `reject`. See [Enumerable#select](https://docs.ruby-lang.org/en/master/Enumerable.html#method-i-select).',
      },
      {
        kind: 'mcq',
        id: 'ruby-2-mcq-2',
        prompt: `What does this print?

\`\`\`ruby
prices = { coffee: 3, tea: 2 }
puts prices[:coffee]
puts prices[:water]
\`\`\``,
        options: [
          '`3` then a blank line',
          '`3` then `0`',
          '`3` then `nil` printed as the word nil',
          'A KeyError is raised on the second lookup',
        ],
        correctIndex: 0,
        explanation:
          'Hash lookup with `[]` returns `nil` for a missing key (it does NOT raise — that is `fetch` without a default). `puts nil` prints an empty line. The keys here are *symbols* (`:coffee`), the conventional choice for fixed hash keys. See [Hash#[]](https://docs.ruby-lang.org/en/master/Hash.html#method-i-5B-5D).',
      },
      {
        kind: 'mcq',
        id: 'ruby-2-mcq-3',
        prompt: `What does this print?

\`\`\`ruby
total = [1, 2, 3, 4].reduce(0) { |acc, n| acc + n }
puts total
\`\`\``,
        options: [
          '`10`',
          '`24`',
          '`[1, 2, 3, 4]`',
          '`0`',
        ],
        correctIndex: 0,
        explanation:
          '`reduce` (alias `inject`) folds the collection into a single value. Starting from the seed `0`, it accumulates `0+1+2+3+4 = 10`. You can also write the common sum as `[1,2,3,4].reduce(:+)` or just `.sum`. See [Enumerable#reduce](https://docs.ruby-lang.org/en/master/Enumerable.html#method-i-reduce).',
      },
    ],
  },

  // ─── Level 3 ─────────────────────────────────────────────────────────────
  {
    id: 'ruby-3',
    language: 'ruby',
    level: 3,
    title: 'Object-Oriented Ruby — Classes, Modules & Mixins',
    timeEstimate: '5-7 hours',
    intro: `Ruby is object-oriented to its core. In this phase you'll define classes with \`initialize\`, instance variables (\`@name\`), and \`attr_accessor\`; understand the difference between instance and class methods; and learn **modules** both as namespaces and as **mixins** included with \`include\`. You'll also meet inheritance with \`<\` and \`super\`.

Build locally a small \`shapes.rb\`: a \`Shape\` base class with an \`area\` method, subclasses \`Circle\` and \`Square\`, and a \`Describable\` module mixed in to give each shape a \`describe\` method. Most of these constructs go beyond the runnable subset here, so this phase leans on "what does this print?" reasoning — write and run the real classes locally to confirm.`,
    topics: [
      { label: 'Classes and modules', url: 'https://docs.ruby-lang.org/en/master/syntax/modules_and_classes_rdoc.html', note: 'Defining classes, modules, and constants.' },
      { label: 'Object class reference', url: 'https://docs.ruby-lang.org/en/master/Object.html', note: 'new, initialize, and the object lifecycle.' },
      { label: 'Module class reference', url: 'https://docs.ruby-lang.org/en/master/Module.html', note: 'include, extend, prepend, and namespacing.' },
      { label: 'attr_accessor & friends', url: 'https://docs.ruby-lang.org/en/master/Module.html#method-i-attr_accessor', note: 'Generating getters/setters for instance variables.' },
      { label: 'Comparable mixin', url: 'https://docs.ruby-lang.org/en/master/Comparable.html', note: 'A classic mixin: define <=> and get <, >, == for free.' },
      { label: 'Method visibility', url: 'https://docs.ruby-lang.org/en/master/syntax/modules_and_classes_rdoc.html#label-Visibility', note: 'public, private, and protected methods.' },
    ],
    deliverable: 'Build `shapes.rb` with a Shape base class, Circle/Square subclasses, and a Describable mixin module.',
    checks: [
      {
        kind: 'code',
        id: 'ruby-3-code-1',
        prompt: 'Methods bundle behaviour with data. Complete `area_of_square` so the program prints `area=25` for a side of 5.',
        boilerplate: 'def area_of_square(side)\n  return side * side\nend\n\nputs "area=#{area_of_square(5)}"\n',
        expectedOutput: 'area=25',
        explanation:
          'Before classes, it helps to think in plain methods. A real `Square` class would wrap this as `def area; @side * @side; end`, storing `@side` in `initialize`. The arithmetic and interpolation are identical — the class just bundles the data (`@side`) with the behaviour (`area`).',
      },
      {
        kind: 'mcq',
        id: 'ruby-3-mcq-1',
        prompt: `What does this print?

\`\`\`ruby
class Dog
  def initialize(name)
    @name = name
  end

  def speak
    "#{@name} says woof"
  end
end

puts Dog.new("Rex").speak
\`\`\``,
        options: [
          '`Rex says woof`',
          '`@name says woof`',
          '`says woof`',
          'An error: @name is undefined',
        ],
        correctIndex: 0,
        explanation:
          '`Dog.new("Rex")` calls `initialize`, storing `"Rex"` in the instance variable `@name`. Instance variables start with `@`, are private to each object, and default to `nil` until assigned. `speak` interpolates `@name` into the returned string. See [Classes documentation](https://docs.ruby-lang.org/en/master/syntax/modules_and_classes_rdoc.html).',
      },
      {
        kind: 'mcq',
        id: 'ruby-3-mcq-2',
        prompt: `What does \`attr_reader :name\` generate inside a class?`,
        options: [
          'A public getter method `name` that returns `@name`.',
          'Both a getter `name` and a setter `name=`.',
          'A class-level constant called NAME.',
          'A private instance variable; you must still write the getter by hand.',
        ],
        correctIndex: 0,
        explanation:
          '`attr_reader :name` defines a getter `name` returning `@name`. `attr_writer` defines the setter `name=`, and `attr_accessor` defines both. They are themselves methods (from `Module`) that metaprogram the accessors at class-definition time, saving boilerplate. See [attr_accessor](https://docs.ruby-lang.org/en/master/Module.html#method-i-attr_accessor).',
      },
      {
        kind: 'mcq',
        id: 'ruby-3-mcq-3',
        prompt: `What does this print?

\`\`\`ruby
module Greet
  def hello
    "hi from #{self.class}"
  end
end

class Robot
  include Greet
end

puts Robot.new.hello
\`\`\``,
        options: [
          '`hi from Robot`',
          '`hi from Greet`',
          '`hi from Module`',
          'A NoMethodError — hello is not defined on Robot',
        ],
        correctIndex: 0,
        explanation:
          '`include Greet` mixes the module\'s instance methods into `Robot`, so `Robot.new` responds to `hello`. Inside the method, `self` is the `Robot` instance, and `self.class` is `Robot`. Mixins are Ruby\'s answer to multiple inheritance. See [Module#include](https://docs.ruby-lang.org/en/master/Module.html#method-i-include).',
      },
      {
        kind: 'mcq',
        id: 'ruby-3-mcq-4',
        prompt: `In \`class Square < Shape\`, what does calling \`super\` (no parentheses) inside \`Square#initialize\` do?`,
        options: [
          'Calls `Shape#initialize`, forwarding the same arguments by default.',
          'Creates a new `Shape` object and discards it.',
          'Refers to the `Square` class object itself.',
          'Raises an error unless `Shape` is a module.',
        ],
        correctIndex: 0,
        explanation:
          '`super` with no parentheses calls the superclass method of the same name, passing along the *same arguments* the current method received. `super()` with empty parens passes no arguments. This lets a subclass extend rather than fully replace inherited behaviour. See [Method calls](https://docs.ruby-lang.org/en/master/syntax/calling_methods_rdoc.html).',
      },
    ],
  },

  // ─── Level 4 ─────────────────────────────────────────────────────────────
  {
    id: 'ruby-4',
    language: 'ruby',
    level: 4,
    title: 'Everything Is an Object — Symbols, Truthiness & nil',
    timeEstimate: '4-6 hours',
    intro: `Ruby takes "everything is an object" further than almost any mainstream language: integers, \`nil\`, \`true\`, classes themselves, and even methods are objects. This phase clarifies the mental model that makes Ruby predictable: **only \`false\` and \`nil\` are falsy** (so \`0\` and \`""\` are truthy), symbols (\`:name\`) are immutable interned identifiers, and operators like \`+\` are really method calls.

Locally, open \`irb\` and probe the object model: try \`5.class\`, \`nil.class\`, \`:sym.object_id == :sym.object_id\`, and \`1.+(2)\`. Write a tiny \`truthiness.rb\` that prints which of \`0\`, \`""\`, \`nil\`, and \`false\` your code treats as "yes".`,
    topics: [
      { label: 'Symbol class reference', url: 'https://docs.ruby-lang.org/en/master/Symbol.html', note: 'Immutable, interned names — cheaper than strings as keys.' },
      { label: 'NilClass', url: 'https://docs.ruby-lang.org/en/master/NilClass.html', note: 'nil is the single instance of NilClass.' },
      { label: 'TrueClass / FalseClass', url: 'https://docs.ruby-lang.org/en/master/TrueClass.html', note: 'true and false are objects with methods like & and |.' },
      { label: 'Control expressions', url: 'https://docs.ruby-lang.org/en/master/syntax/control_expressions_rdoc.html', note: 'How if/unless/&&/|| evaluate truthiness.' },
      { label: 'Object class reference', url: 'https://docs.ruby-lang.org/en/master/Object.html', note: 'The root of the object hierarchy below BasicObject.' },
    ],
    deliverable: 'Write `truthiness.rb` that prints, for 0/""/nil/false, whether each is treated as truthy.',
    checks: [
      {
        kind: 'code',
        id: 'ruby-4-code-1',
        prompt: 'Because operators are methods, `+` works on objects. Print the result so the output includes `sum=7`.',
        boilerplate: 'a = 3\nb = 4\nputs "sum=#{a + b}"\n',
        expectedOutput: 'sum=7',
        explanation:
          'In Ruby `a + b` is syntactic sugar for `a.+(b)` — `+` is an actual method defined on `Integer`. That is why you can define `+` on your own classes. Even `3` is an instance of `Integer`, which descends from `Object`.',
      },
      {
        kind: 'mcq',
        id: 'ruby-4-mcq-1',
        prompt: `What does this print?

\`\`\`ruby
if 0
  puts "zero is truthy"
else
  puts "zero is falsy"
end
\`\`\``,
        options: [
          '`zero is truthy`',
          '`zero is falsy`',
          'Nothing — 0 is neither',
          'A TypeError',
        ],
        correctIndex: 0,
        explanation:
          'In Ruby the ONLY falsy values are `false` and `nil`. Everything else — including `0`, `""`, and `[]` — is truthy. This differs sharply from C, Python, and JavaScript, where `0` and empty containers are falsy. See [Control expressions](https://docs.ruby-lang.org/en/master/syntax/control_expressions_rdoc.html).',
      },
      {
        kind: 'mcq',
        id: 'ruby-4-mcq-2',
        prompt: `What does this print?

\`\`\`ruby
puts :hello.object_id == :hello.object_id
puts "hello".object_id == "hello".object_id
\`\`\``,
        options: [
          '`true` then `false`',
          '`true` then `true`',
          '`false` then `false`',
          '`false` then `true`',
        ],
        correctIndex: 0,
        explanation:
          'Symbols are *interned*: every occurrence of `:hello` is the exact same object, so their `object_id`s match. Two `"hello"` string literals create two distinct (mutable) objects with different ids. This is why symbols are preferred as hash keys and identifiers. See [Symbol](https://docs.ruby-lang.org/en/master/Symbol.html).',
      },
      {
        kind: 'mcq',
        id: 'ruby-4-mcq-3',
        prompt: `What does \`name = user.profile&.email\` do if \`user.profile\` is \`nil\`?`,
        options: [
          'Assigns `nil` to `name` without calling `email`, avoiding a NoMethodError.',
          'Raises a NoMethodError on nil.',
          'Returns the string `"nil"`.',
          'Calls `email` on the literal nil object.',
        ],
        correctIndex: 0,
        explanation:
          'The safe-navigation operator `&.` (introduced in Ruby 2.3) short-circuits to `nil` when the receiver is `nil`, instead of raising `NoMethodError: undefined method \'email\' for nil`. It is Ruby\'s equivalent of optional chaining. See [Calling methods](https://docs.ruby-lang.org/en/master/syntax/calling_methods_rdoc.html).',
      },
      {
        kind: 'mcq',
        id: 'ruby-4-mcq-4',
        prompt: `What does this print?

\`\`\`ruby
config = nil
port = config || 8080
puts port
\`\`\``,
        options: [
          '`8080`',
          '`nil`',
          '`0`',
          'A NoMethodError',
        ],
        correctIndex: 0,
        explanation:
          '`||` returns its first truthy operand. Since `config` is `nil` (falsy), the expression evaluates to `8080`. This "or-default" idiom is everywhere in Ruby; the in-place version `config ||= 8080` assigns only when `config` is `nil`/`false`. See [Control expressions](https://docs.ruby-lang.org/en/master/syntax/control_expressions_rdoc.html).',
      },
    ],
  },

  // ─── Level 5 ─────────────────────────────────────────────────────────────
  {
    id: 'ruby-5',
    language: 'ruby',
    level: 5,
    title: 'Blocks, Procs, Lambdas & yield',
    timeEstimate: '5-7 hours',
    intro: `Blocks are the soul of Ruby's expressiveness, and this phase digs into how they really work. You'll learn \`yield\` (how a method invokes the block it was given), \`block_given?\`, capturing a block as a \`&block\` parameter, and the three "callable" objects: blocks, **Procs**, and **lambdas**. The key distinctions — lambdas check arity and \`return\` from the lambda, while Procs are lax and \`return\` from the enclosing method — trip up even experienced developers.

Locally, write a \`my_each.rb\` that reimplements \`each\` on an array using \`yield\`, then build a \`repeat(n) { ... }\` method that yields \`n\` times. Compare \`lambda { return 1 }\` vs \`proc { return 1 }\` behaviour in \`irb\`.`,
    topics: [
      { label: 'Procs and blocks', url: 'https://docs.ruby-lang.org/en/master/syntax/proc_rdoc.html', note: 'yield, block_given?, and &block conversion.' },
      { label: 'Proc class reference', url: 'https://docs.ruby-lang.org/en/master/Proc.html', note: 'Proc.new, lambda, call, and arity rules.' },
      { label: 'Method class reference', url: 'https://docs.ruby-lang.org/en/master/Method.html', note: 'Objectified methods you can pass around.' },
      { label: 'Procs, Lambdas and Blocks (guide)', url: 'https://www.honeybadger.io/blog/using-procs-lambdas-and-blocks-in-ruby/', note: 'Clear walkthrough of the differences.' },
    ],
    deliverable: 'Write `my_each.rb` reimplementing each via yield, plus a repeat(n) { } helper.',
    checks: [
      {
        kind: 'code',
        id: 'ruby-5-code-1',
        prompt: 'Simulate a block-driven repeat using `times`. The output should include `tick 2`.',
        boilerplate: 'def repeat(n)\n  n.times do |i|\n    puts "tick #{i}"\n  end\nend\n\nrepeat(3)\n',
        expectedOutput: 'tick 2',
        explanation:
          'Here `times` does the yielding for us, running its block once per count. In a hand-rolled version you would write `def repeat(n); i = 0; while i < n; yield i; i += 1; end; end` and call it as `repeat(3) { |i| puts "tick #{i}" }` — `yield` invokes whatever block the caller passed.',
      },
      {
        kind: 'mcq',
        id: 'ruby-5-mcq-1',
        prompt: `What does this print?

\`\`\`ruby
def run
  return "no block" unless block_given?
  yield
end

puts run { "from block" }
puts run
\`\`\``,
        options: [
          '`from block` then `no block`',
          '`no block` then `from block`',
          '`from block` then `from block`',
          'A LocalJumpError on the second call',
        ],
        correctIndex: 0,
        explanation:
          '`block_given?` reports whether a block was passed. The first call supplies a block, so `yield` runs it and returns `"from block"`. The second call has no block, so the guard returns `"no block"` before reaching `yield` (which would otherwise raise `LocalJumpError`). See [Proc documentation](https://docs.ruby-lang.org/en/master/syntax/proc_rdoc.html).',
      },
      {
        kind: 'mcq',
        id: 'ruby-5-mcq-2',
        prompt: `What is the key behavioural difference between a lambda and a (non-lambda) Proc?`,
        options: [
          'Lambdas check argument count and `return` only from the lambda; Procs ignore extra/missing args and `return` from the enclosing method.',
          'There is no difference; `lambda` is just an alias for `Proc.new`.',
          'Procs cannot be stored in variables, lambdas can.',
          'Lambdas run asynchronously while Procs run synchronously.',
        ],
        correctIndex: 0,
        explanation:
          'Lambdas enforce arity (wrong argument count raises `ArgumentError`) and a `return` inside them returns from the lambda. Procs are lenient about arguments (extras dropped, missing ones become `nil`) and a `return` inside a Proc returns from the *enclosing method*. `lambda.lambda?` is `true`; a plain Proc\'s is `false`. See [Proc](https://docs.ruby-lang.org/en/master/Proc.html).',
      },
      {
        kind: 'mcq',
        id: 'ruby-5-mcq-3',
        prompt: `What does this print?

\`\`\`ruby
double = ->(x) { x * 2 }
puts double.call(21)
puts double.(21)
puts double[21]
\`\`\``,
        options: [
          '`42` three times',
          '`42` then two errors',
          '`21` three times',
          '`<Proc>` three times',
        ],
        correctIndex: 0,
        explanation:
          '`->(x) { ... }` is the "stabby lambda" literal. All three forms — `.call(...)`, `.(...)`, and `[...]` — invoke it identically, each returning `42`. The `.()` and `[]` forms are sugar for `call`. See [Proc#call](https://docs.ruby-lang.org/en/master/Proc.html#method-i-call).',
      },
      {
        kind: 'mcq',
        id: 'ruby-5-mcq-4',
        prompt: `What does \`[1, 2, 3].map(&:to_s)\` return, and why?`,
        options: [
          '`["1", "2", "3"]` — `&:to_s` converts the symbol to a block calling `to_s` on each element.',
          '`[1, 2, 3]` — the symbol has no effect.',
          '`":to_s"` repeated three times.',
          'An ArgumentError — map needs a block, not a symbol.',
        ],
        correctIndex: 0,
        explanation:
          'The `&` before a symbol calls `to_proc`, producing a block equivalent to `{ |x| x.to_s }`. So `map(&:to_s)` maps each element through its `to_s`. This symbol-to-proc shorthand is one of Ruby\'s most-loved idioms. See [Symbol#to_proc](https://docs.ruby-lang.org/en/master/Symbol.html#method-i-to_proc).',
      },
    ],
  },

  // ─── Level 6 ─────────────────────────────────────────────────────────────
  {
    id: 'ruby-6',
    language: 'ruby',
    level: 6,
    title: 'Metaprogramming — method_missing & define_method',
    timeEstimate: '5-7 hours',
    intro: `Metaprogramming is Ruby writing Ruby. This phase covers the techniques that power frameworks like Rails: \`define_method\` (creating methods at runtime), \`method_missing\` (intercepting calls to undefined methods), \`respond_to_missing?\`, \`send\`/\`public_send\` (calling methods by name), and \`instance_variable_get\`/\`set\`. You'll see how \`attr_accessor\` and ActiveRecord's dynamic finders are "just" metaprogramming.

Locally, build a \`config.rb\` "open struct" that uses \`method_missing\` to treat any \`config.foo = 1\` / \`config.foo\` pair as dynamic attribute access, backed by a hash. Add \`respond_to_missing?\` so introspection stays honest. These constructs exceed the runnable subset, so reason through the MCQs and verify locally.`,
    topics: [
      { label: 'BasicObject#method_missing', url: 'https://docs.ruby-lang.org/en/master/BasicObject.html#method-i-method_missing', note: 'The hook called when a method is not found.' },
      { label: 'Module#define_method', url: 'https://docs.ruby-lang.org/en/master/Module.html#method-i-define_method', note: 'Define methods programmatically from a block.' },
      { label: 'Object#send / public_send', url: 'https://docs.ruby-lang.org/en/master/Object.html#method-i-send', note: 'Invoke a method by its name (symbol/string).' },
      { label: 'Object#respond_to?', url: 'https://docs.ruby-lang.org/en/master/Object.html#method-i-respond_to-3F', note: 'Pair with respond_to_missing? for honest introspection.' },
      { label: 'Ruby metaprogramming (guide)', url: 'https://www.honeybadger.io/blog/ruby-metaprogramming/', note: 'Practical tour of the dynamic toolkit.' },
    ],
    deliverable: 'Build `config.rb`, a method_missing-backed open struct with respond_to_missing? support.',
    checks: [
      {
        kind: 'code',
        id: 'ruby-6-code-1',
        prompt: 'Dynamic dispatch starts with the basics: build a method name at runtime so the output includes `method: greet_user`.',
        boilerplate: 'action = "greet"\ntarget = "user"\nname = action + "_" + target\nputs "method: #{name}"\n',
        expectedOutput: 'method: greet_user',
        explanation:
          'Metaprogramming often builds method *names* as strings/symbols and then calls them with `send(name)` or defines them with `define_method(name) { ... }`. This snippet just constructs the name; in a real class you might loop over a list of names and `define_method` each one to avoid repetitive boilerplate.',
      },
      {
        kind: 'mcq',
        id: 'ruby-6-mcq-1',
        prompt: `What does this print?

\`\`\`ruby
class Ghost
  def method_missing(name, *args)
    "you called #{name} with #{args.inspect}"
  end
end

puts Ghost.new.anything(1, 2)
\`\`\``,
        options: [
          '`you called anything with [1, 2]`',
          'A NoMethodError for `anything`',
          '`you called method_missing with [1, 2]`',
          '`nil`',
        ],
        correctIndex: 0,
        explanation:
          'When a method is not found, Ruby calls `method_missing(name, *args, &block)` on the receiver before raising `NoMethodError`. Here `name` is `:anything` and `args` is `[1, 2]`. Overriding it lets objects respond to arbitrary messages — the basis of dynamic proxies. See [method_missing](https://docs.ruby-lang.org/en/master/BasicObject.html#method-i-method_missing).',
      },
      {
        kind: 'mcq',
        id: 'ruby-6-mcq-2',
        prompt: `What does this print?

\`\`\`ruby
class Widget
  [:start, :stop].each do |action|
    define_method(action) { "#{action}!" }
  end
end

w = Widget.new
puts w.start
puts w.stop
\`\`\``,
        options: [
          '`start!` then `stop!`',
          '`action!` then `action!`',
          'A NoMethodError on `start`',
          '`:start` then `:stop`',
        ],
        correctIndex: 0,
        explanation:
          '`define_method` creates a real instance method from the block; the loop generates `start` and `stop` at class-definition time. The block is a closure, so it captures the current `action`. This is exactly how Rails generates dozens of similar methods without repetition. See [define_method](https://docs.ruby-lang.org/en/master/Module.html#method-i-define_method).',
      },
      {
        kind: 'mcq',
        id: 'ruby-6-mcq-3',
        prompt: `Why should a class that overrides \`method_missing\` also override \`respond_to_missing?\`?`,
        options: [
          'So that `respond_to?` and tools like `method(:foo)` correctly report the dynamically-handled methods.',
          'Because `method_missing` will not run otherwise.',
          'To prevent infinite recursion in `initialize`.',
          'It is required syntax; Ruby raises an error without it.',
        ],
        correctIndex: 0,
        explanation:
          'If you only override `method_missing`, then `obj.respond_to?(:foo)` still returns `false` and `obj.method(:foo)` raises — the object lies about its capabilities. Implementing `respond_to_missing?(name, include_private)` keeps introspection honest. See [respond_to?](https://docs.ruby-lang.org/en/master/Object.html#method-i-respond_to-3F).',
      },
      {
        kind: 'mcq',
        id: 'ruby-6-mcq-4',
        prompt: `What does this print?

\`\`\`ruby
s = "hello"
puts s.send(:upcase)
puts s.public_send(:length)
\`\`\``,
        options: [
          '`HELLO` then `5`',
          '`hello` then `5`',
          '`upcase` then `length`',
          'A NoMethodError',
        ],
        correctIndex: 0,
        explanation:
          '`send` invokes a method by its name given as a symbol or string, so `s.send(:upcase)` is `s.upcase` → `"HELLO"`. `public_send` is the same but refuses to call private methods, which is safer when the name comes from user input. See [Object#send](https://docs.ruby-lang.org/en/master/Object.html#method-i-send).',
      },
    ],
  },

  // ─── Level 7 ─────────────────────────────────────────────────────────────
  {
    id: 'ruby-7',
    language: 'ruby',
    level: 7,
    title: 'Exceptions & Enumerable Mastery',
    timeEstimate: '5-7 hours',
    intro: `This phase pairs robust error handling with deep collection fluency. You'll learn the \`begin\`/\`rescue\`/\`ensure\`/\`else\` structure, \`raise\`, custom exception classes (subclassing \`StandardError\`), \`retry\`, and the crucial rule that a bare \`rescue\` catches \`StandardError\` — *not* low-level errors like \`SystemExit\`. On the data side, you'll master \`Enumerable\`: \`map\`, \`select\`, \`reduce\`, \`group_by\`, \`each_with_object\`, \`flat_map\`, \`partition\`, and lazy enumerators.

Locally, write \`stats.rb\` that reads numbers, uses \`group_by(&:even?)\` and \`reduce\` to compute sums, and wraps parsing in \`begin\`/\`rescue ArgumentError\`. Define a \`ValidationError < StandardError\` and \`raise\` it with a message.`,
    topics: [
      { label: 'Exceptions', url: 'https://docs.ruby-lang.org/en/master/syntax/exceptions_rdoc.html', note: 'begin/rescue/ensure/else, raise, retry.' },
      { label: 'Exception class hierarchy', url: 'https://docs.ruby-lang.org/en/master/Exception.html', note: 'StandardError vs Exception and why it matters.' },
      { label: 'Enumerable module', url: 'https://docs.ruby-lang.org/en/master/Enumerable.html', note: 'The full toolbox: group_by, partition, each_with_object, etc.' },
      { label: 'Enumerator::Lazy', url: 'https://docs.ruby-lang.org/en/master/Enumerator/Lazy.html', note: 'Lazy chains over large or infinite sequences.' },
      { label: 'Comparable', url: 'https://docs.ruby-lang.org/en/master/Comparable.html', note: 'min/max/sort rely on <=>.' },
    ],
    deliverable: 'Write `stats.rb` using group_by/reduce plus begin/rescue and a custom ValidationError.',
    checks: [
      {
        kind: 'code',
        id: 'ruby-7-code-1',
        prompt: 'Reduce a range to a sum. Print the result so the output includes `total=15`.',
        boilerplate: 'total = 0\n(1..5).each do |n|\n  total = total + n\nend\nputs "total=#{total}"\n',
        expectedOutput: 'total=15',
        explanation:
          'This is the manual form of `(1..5).reduce(:+)` or `(1..5).sum`. `Enumerable` provides dozens of such methods so you rarely write the accumulator loop by hand — but understanding the loop clarifies what `reduce` does under the hood.',
      },
      {
        kind: 'mcq',
        id: 'ruby-7-mcq-1',
        prompt: `What does this print?

\`\`\`ruby
def risky
  raise "boom"
rescue => e
  puts "rescued: #{e.message}"
ensure
  puts "cleanup"
end

risky
\`\`\``,
        options: [
          '`rescued: boom` then `cleanup`',
          '`cleanup` then `rescued: boom`',
          'Only `rescued: boom`',
          'The program crashes with an unhandled exception',
        ],
        correctIndex: 0,
        explanation:
          'A bare `rescue => e` catches `StandardError` (and `RuntimeError`, which `raise "boom"` creates). The handler runs first, then `ensure` ALWAYS runs — for cleanup like closing files — whether or not an error occurred. Note a method body can host `rescue`/`ensure` directly without an explicit `begin`. See [Exceptions](https://docs.ruby-lang.org/en/master/syntax/exceptions_rdoc.html).',
      },
      {
        kind: 'mcq',
        id: 'ruby-7-mcq-2',
        prompt: `Why is \`rescue => e\` (which catches \`StandardError\`) preferred over \`rescue Exception => e\`?`,
        options: [
          '`rescue Exception` also swallows `SignalException`, `SystemExit`, and `NoMemoryError`, which you almost never want to catch.',
          'They are identical; `Exception` is just more explicit.',
          '`rescue Exception` is a syntax error in modern Ruby.',
          '`StandardError` cannot be raised manually.',
        ],
        correctIndex: 0,
        explanation:
          '`Exception` is the root of the hierarchy, so `rescue Exception` traps Ctrl-C (`SignalException`), `exit` (`SystemExit`), and `NoMemoryError` — interfering with the program\'s ability to shut down. Application errors descend from `StandardError`, which a bare `rescue` targets. See [Exception hierarchy](https://docs.ruby-lang.org/en/master/Exception.html).',
      },
      {
        kind: 'mcq',
        id: 'ruby-7-mcq-3',
        prompt: `What does this print?

\`\`\`ruby
result = [1, 2, 3, 4, 5].partition { |n| n.odd? }
p result
\`\`\``,
        options: [
          '`[[1, 3, 5], [2, 4]]`',
          '`[1, 3, 5]`',
          '`[[2, 4], [1, 3, 5]]`',
          '`[1, 2, 3, 4, 5]`',
        ],
        correctIndex: 0,
        explanation:
          '`partition` splits a collection into two arrays: the first holds elements for which the block is truthy (the odds), the second holds the rest (the evens). It returns `[matching, non_matching]`. See [Enumerable#partition](https://docs.ruby-lang.org/en/master/Enumerable.html#method-i-partition).',
      },
      {
        kind: 'mcq',
        id: 'ruby-7-mcq-4',
        prompt: `What does this print?

\`\`\`ruby
words = %w[apple bee cat dog]
grouped = words.group_by { |w| w.length }
p grouped[3]
\`\`\``,
        options: [
          '`["bee", "cat", "dog"]`',
          '`["apple"]`',
          '`3`',
          '`{ 3 => 3 }`',
        ],
        correctIndex: 0,
        explanation:
          '`group_by` returns a hash whose keys are the block results and whose values are arrays of the matching elements. The three-letter words `bee`, `cat`, and `dog` all map to key `3`. (`%w[...]` is the whitespace-delimited word-array literal.) See [Enumerable#group_by](https://docs.ruby-lang.org/en/master/Enumerable.html#method-i-group_by).',
      },
    ],
  },

  // ─── Level 8 ─────────────────────────────────────────────────────────────
  {
    id: 'ruby-8',
    language: 'ruby',
    level: 8,
    title: 'Gems, Bundler & File I/O',
    timeEstimate: '5-7 hours',
    intro: `Real Ruby projects depend on **gems** managed by **Bundler**. This phase covers \`gem install\`, the \`Gemfile\` and \`Gemfile.lock\`, \`bundle install\`/\`bundle exec\`, semantic version constraints (\`~>\`), and \`require\`/\`require_relative\`. You'll also handle files: \`File.read\`, \`File.open ... do |f|\` blocks (which auto-close), \`File.write\`, and reading line-by-line with \`each_line\`.

Locally, run \`bundle init\`, add a gem (e.g. \`gem "rainbow"\`), \`bundle install\`, and write \`reader.rb\` that opens a text file with a block, counts its lines, and writes a summary to a second file. Note how the block form guarantees the file is closed even if an exception is raised.`,
    topics: [
      { label: 'RubyGems basics', url: 'https://guides.rubygems.org/rubygems-basics/', note: 'Installing, using, and finding gems.' },
      { label: 'Bundler — Getting Started', url: 'https://bundler.io/guides/getting_started.html', note: 'Gemfile, bundle install, bundle exec.' },
      { label: 'Gemfile / version constraints', url: 'https://bundler.io/guides/gemfile.html', note: 'The ~> pessimistic operator and groups.' },
      { label: 'File class reference', url: 'https://docs.ruby-lang.org/en/master/File.html', note: 'read, write, open with blocks, exist?.' },
      { label: 'Kernel#require', url: 'https://docs.ruby-lang.org/en/master/Kernel.html#method-i-require', note: 'require vs require_relative vs load.' },
    ],
    deliverable: 'Set up a Gemfile + bundle install, then write reader.rb that line-counts a file via a block.',
    checks: [
      {
        kind: 'code',
        id: 'ruby-8-code-1',
        prompt: 'Simulate counting lines. Print the count so the output includes `lines=3`.',
        boilerplate: 'count = 0\n3.times do |i|\n  count = count + 1\nend\nputs "lines=#{count}"\n',
        expectedOutput: 'lines=3',
        explanation:
          'Reading a real file is `count = File.readlines("data.txt").size` or, streaming, `File.foreach("data.txt") { count += 1 }`. The block form `File.open(path) { |f| ... }` is preferred because Ruby closes the file automatically when the block ends, even on error — no manual `f.close` needed.',
      },
      {
        kind: 'mcq',
        id: 'ruby-8-mcq-1',
        prompt: `What does the version constraint \`gem "rails", "~> 7.1"\` permit?`,
        options: [
          'Any 7.x version `>= 7.1` and `< 8.0`.',
          'Only exactly version 7.1.',
          'Any version `>= 7.1`, including 8.0 and beyond.',
          'Any version `< 7.1`.',
        ],
        correctIndex: 0,
        explanation:
          'The pessimistic operator `~>` ("twiddle-wakka") allows the last specified digit to increase. `~> 7.1` means `>= 7.1, < 8.0`; `~> 7.1.2` would mean `>= 7.1.2, < 7.2.0`. It lets you accept compatible updates while avoiding breaking major bumps. See [Gemfile docs](https://bundler.io/guides/gemfile.html).',
      },
      {
        kind: 'mcq',
        id: 'ruby-8-mcq-2',
        prompt: `What is the purpose of the \`Gemfile.lock\` file?`,
        options: [
          'It records the exact resolved versions of every gem (and dependency) so installs are reproducible across machines.',
          'It lists which gems are allowed to be installed, like a firewall.',
          'It is a backup copy of the Gemfile.',
          'It stores your RubyGems.org credentials.',
        ],
        correctIndex: 0,
        explanation:
          '`bundle install` resolves the `Gemfile` to a concrete dependency graph and writes the exact versions to `Gemfile.lock`. Committing the lock file means every developer and your CI/production server install identical versions. You update it deliberately with `bundle update`. See [Bundler guide](https://bundler.io/guides/getting_started.html).',
      },
      {
        kind: 'mcq',
        id: 'ruby-8-mcq-3',
        prompt: `What is the difference between \`require "json"\` and \`require_relative "helpers"\`?`,
        options: [
          '`require` searches the load path ($LOAD_PATH / installed gems); `require_relative` resolves the path relative to the current file.',
          'They are identical aliases.',
          '`require_relative` searches installed gems; `require` only works for standard library.',
          '`require` can only be called once per program.',
        ],
        correctIndex: 0,
        explanation:
          '`require` looks the name up on `$LOAD_PATH`, which is how it finds stdlib and installed gems, and it loads each file only once. `require_relative` resolves relative to the requiring file\'s directory — ideal for loading your own project files without manipulating the load path. See [Kernel#require](https://docs.ruby-lang.org/en/master/Kernel.html#method-i-require).',
      },
      {
        kind: 'mcq',
        id: 'ruby-8-mcq-4',
        prompt: `Why is \`File.open("x.txt") { |f| f.read }\` preferred over \`f = File.open("x.txt"); f.read\`?`,
        options: [
          'The block form automatically closes the file when the block exits, even if an exception is raised.',
          'The block form reads the file faster.',
          'The non-block form is a syntax error.',
          'The block form keeps the file open for the rest of the program.',
        ],
        correctIndex: 0,
        explanation:
          'When `File.open` is given a block, it yields the file handle, then guarantees `f.close` once the block finishes — even on error. The non-block form returns the open handle and leaves closing to you, risking leaked file descriptors. This "resource management via blocks" pattern is pervasive in Ruby. See [File.open](https://docs.ruby-lang.org/en/master/File.html#method-c-open).',
      },
    ],
  },

  // ─── Level 9 ─────────────────────────────────────────────────────────────
  {
    id: 'ruby-9',
    language: 'ruby',
    level: 9,
    title: 'Testing & Idioms — Minitest, RSpec & Clean Ruby',
    timeEstimate: '5-7 hours',
    intro: `Professional Ruby is tested Ruby. This phase covers the two dominant frameworks: **Minitest** (bundled with Ruby, assertion- and spec-style) and **RSpec** (the expressive \`describe\`/\`it\`/\`expect\` DSL). You'll learn assertions vs expectations, test setup, and the red-green-refactor loop. Alongside testing, you'll absorb idioms that mark fluent Ruby: guard clauses, \`unless\`, the safe navigation operator, \`Enumerable\` over manual loops, and "tell, don't ask."

Locally, create a \`Stack\` class and test it both ways: a Minitest \`test_push_pop\` with \`assert_equal\`, and an RSpec \`it "pops the last item"\` with \`expect(...).to eq(...)\`. Run them with \`ruby test_stack.rb\` and \`rspec\`.`,
    topics: [
      { label: 'Minitest docs', url: 'https://docs.seattlerb.org/minitest/', note: 'The lightweight test framework shipped with Ruby.' },
      { label: 'RSpec documentation', url: 'https://rspec.info/documentation/', note: 'The describe/it/expect BDD framework.' },
      { label: 'rspec-expectations', url: 'https://github.com/rspec/rspec-expectations', note: 'Matchers: eq, be, include, raise_error, etc.' },
      { label: 'Better Specs', url: 'https://www.betterspecs.org/', note: 'Community conventions for readable specs.' },
      { label: 'Ruby Style Guide', url: 'https://rubystyle.guide/', note: 'Idioms: guard clauses, unless, predicate methods.' },
    ],
    deliverable: 'Build a Stack class with both a Minitest test file and an RSpec spec file, run green.',
    checks: [
      {
        kind: 'code',
        id: 'ruby-9-code-1',
        prompt: 'Write a tiny assertion reporter. `check` should print the expected and actual values; the program should print `expected=4 actual=4`.',
        boilerplate: 'def check(expected, actual)\n  puts "expected=#{expected} actual=#{actual}"\nend\n\ncheck(4, 2 + 2)\n',
        expectedOutput: 'expected=4 actual=4',
        explanation:
          'This mimics the heart of any test framework: report an expected value alongside the actual one. Minitest\'s real `assert_equal(expected, actual)` follows the same argument order (expected first) and raises a failure when they differ instead of printing. RSpec phrases the same idea as `expect(2 + 2).to eq(4)`.',
        testCases: [
          { input: 'check(10, 5 + 5)', expectedOutput: 'expected=10 actual=10', description: 'Reports a different sum' },
        ],
      },
      {
        kind: 'mcq',
        id: 'ruby-9-mcq-1',
        prompt: `In Minitest, which method name pattern makes a method run as a test inside a \`Minitest::Test\` subclass?`,
        options: [
          'Methods beginning with `test_`.',
          'Methods annotated with `@test`.',
          'Methods ending in `_test`.',
          'Any method, as long as it contains an assertion.',
        ],
        correctIndex: 0,
        explanation:
          'Minitest automatically runs every public instance method whose name starts with `test_` (e.g. `def test_push; ...; end`). This convention-over-configuration approach means no registration or annotations. RSpec instead uses `it "..." do ... end` blocks. See [Minitest docs](https://docs.seattlerb.org/minitest/).',
      },
      {
        kind: 'mcq',
        id: 'ruby-9-mcq-2',
        prompt: `In RSpec, what does \`expect(stack.pop).to eq(3)\` assert?`,
        options: [
          'That the value returned by `stack.pop` is equal (via `==`) to `3`.',
          'That `stack.pop` is the same object (identity) as `3`.',
          'That `stack` has a method named `pop`.',
          'That `3` is greater than the popped value.',
        ],
        correctIndex: 0,
        explanation:
          'The `eq` matcher uses `==` for value equality. (Use `equal` or `be` for object identity, and `eql` for stricter type-aware equality.) `expect(...).to <matcher>` reads almost like English, the goal of RSpec\'s BDD style. See [rspec-expectations](https://github.com/rspec/rspec-expectations).',
      },
      {
        kind: 'mcq',
        id: 'ruby-9-mcq-3',
        prompt: `Which is the more idiomatic Ruby rewrite of \`if !user.admin?\` ... \`end\`?`,
        options: [
          '`unless user.admin?` ... `end`',
          '`if user.admin? == false` ... `end`',
          '`while !user.admin?` ... `end`',
          '`if not not user.admin?` ... `end`',
        ],
        correctIndex: 0,
        explanation:
          '`unless cond` is Ruby sugar for `if !cond` and reads more naturally for a single negative condition. The style guide recommends `unless` for simple negatives but advises against `unless ... else` (which is confusing) — invert to `if` in that case. Predicate methods ending in `?` (like `admin?`) pair well with it. See the [Ruby Style Guide](https://rubystyle.guide/).',
      },
      {
        kind: 'mcq',
        id: 'ruby-9-mcq-4',
        prompt: `What is a "guard clause," and why is it idiomatic?

\`\`\`ruby
def withdraw(amount)
  return "invalid" if amount <= 0
  # main logic
end
\`\`\``,
        options: [
          'An early `return`/`raise` at the top that handles edge cases first, avoiding deep nesting in the main logic.',
          'A `begin/rescue` block that guards against exceptions.',
          'A private method that validates instance variables.',
          'A constant that locks a value against reassignment.',
        ],
        correctIndex: 0,
        explanation:
          'A guard clause exits early for invalid or edge-case input, so the rest of the method can read top-to-bottom without nested `if`/`else` pyramids. The trailing-`if` modifier form (`return ... if cond`) is the idiomatic one-liner. See the [Ruby Style Guide](https://rubystyle.guide/#no-nested-conditionals).',
      },
    ],
  },

  // ─── Level 10 ────────────────────────────────────────────────────────────
  {
    id: 'ruby-10',
    language: 'ruby',
    level: 10,
    title: 'Performance, Concurrency & Internals',
    timeEstimate: '6-8 hours',
    intro: `The capstone: how Ruby actually runs and how to make it fast and concurrent. You'll learn the **GVL** (Global VM Lock) and why threads help with I/O but not CPU-bound work; **Fibers** for cooperative concurrency; **Ractors** (Ruby 3's true-parallel actors with isolated state); and the **YJIT** just-in-time compiler. You'll meet \`frozen_string_literal: true\`, the difference between \`dup\`/\`clone\`/\`freeze\`, garbage collection, and \`Benchmark\` for measuring before optimising.

Locally, benchmark two implementations with the \`benchmark\` stdlib (\`Benchmark.bm\`), enable YJIT with \`ruby --yjit\` (or \`RUBY_YJIT_ENABLE=1\`), and experiment with a \`Ractor.new { ... }\` plus a \`Fiber\` that yields values. Confirm with \`RubyVM::YJIT.enabled?\` in \`irb\`.`,
    topics: [
      { label: 'Ractor class reference', url: 'https://docs.ruby-lang.org/en/master/Ractor.html', note: 'Actor-based true parallelism with isolated state.' },
      { label: 'Fiber class reference', url: 'https://docs.ruby-lang.org/en/master/Fiber.html', note: 'Cooperative, resumable lightweight concurrency.' },
      { label: 'Thread class reference', url: 'https://docs.ruby-lang.org/en/master/Thread.html', note: 'Why threads overlap I/O but not CPU work in CRuby.' },
      { label: 'YJIT documentation', url: 'https://docs.ruby-lang.org/en/master/yjit/yjit_md.html', note: 'Ruby\'s in-process just-in-time compiler.' },
      { label: 'Benchmark module', url: 'https://docs.ruby-lang.org/en/master/Benchmark.html', note: 'Measure real/user/system time before optimising.' },
      { label: 'Object#freeze', url: 'https://docs.ruby-lang.org/en/master/Object.html#method-i-freeze', note: 'Immutability and the frozen_string_literal pragma.' },
    ],
    deliverable: 'Benchmark two implementations with Benchmark.bm, then parallelise CPU work across Ractors.',
    checks: [
      {
        kind: 'code',
        id: 'ruby-10-code-1',
        prompt: 'Accumulate work across "iterations." Print the result so the output includes `work=4950`.',
        boilerplate: 'sum = 0\n(0..99).each do |i|\n  sum = sum + i\nend\nputs "work=#{sum}"\n',
        expectedOutput: 'work=4950',
        explanation:
          'Summing 0..99 yields 4950 (the classic `n*(n-1)/2`). When benchmarking you wrap such a loop in `Benchmark.bm { |x| x.report("loop") { ... } }` to measure it. The first rule of optimisation is to MEASURE — profile before you change anything, because intuition about Ruby hot spots is often wrong.',
      },
      {
        kind: 'mcq',
        id: 'ruby-10-mcq-1',
        prompt: `Why do multiple Ruby (CRuby/MRI) threads NOT speed up a CPU-bound computation?`,
        options: [
          'The Global VM Lock (GVL) ensures only one thread executes Ruby bytecode at a time.',
          'Ruby does not support threads at all.',
          'Threads run slower than a single sequential loop.',
          'CPU-bound work is automatically moved to a Fiber.',
        ],
        correctIndex: 0,
        explanation:
          'CRuby\'s Global VM Lock (GVL, formerly GIL) lets only one thread run Ruby bytecode at any instant. Threads still help with I/O-bound work because the lock is released during blocking I/O, but they do not give CPU parallelism. For true parallel CPU work you use Ractors or multiple processes. See [Thread docs](https://docs.ruby-lang.org/en/master/Thread.html).',
      },
      {
        kind: 'mcq',
        id: 'ruby-10-mcq-2',
        prompt: `What problem do Ractors (Ruby 3+) solve that threads do not?`,
        options: [
          'They run Ruby code in parallel across CPU cores by isolating each Ractor\'s objects, sidestepping the GVL.',
          'They make single-threaded code automatically faster.',
          'They replace garbage collection.',
          'They allow unrestricted shared mutable state between workers.',
        ],
        correctIndex: 0,
        explanation:
          'Each Ractor has its own GVL and isolated object space, so Ractors can execute Ruby in parallel. The trade-off is that objects are not freely shared: only frozen/shareable objects can cross Ractor boundaries, and other objects are copied or moved by message passing. This isolation is what makes the parallelism safe. See [Ractor docs](https://docs.ruby-lang.org/en/master/Ractor.html).',
      },
      {
        kind: 'mcq',
        id: 'ruby-10-mcq-3',
        prompt: `What does this print?

\`\`\`ruby
fib = Fiber.new do
  a, b = 0, 1
  loop do
    Fiber.yield a
    a, b = b, a + b
  end
end

3.times { print fib.resume, " " }
\`\`\``,
        options: [
          '`0 1 1 `',
          '`0 1 2 `',
          '`1 1 2 `',
          'An infinite loop that never prints',
        ],
        correctIndex: 0,
        explanation:
          'A Fiber is cooperative: `fib.resume` runs it until `Fiber.yield` pauses and returns a value, remembering the local state for next time. The Fibonacci sequence yields `0`, then `1`, then `1`. Fibers underpin Ruby\'s async I/O scheduler and never run in parallel — they hand control back explicitly. See [Fiber docs](https://docs.ruby-lang.org/en/master/Fiber.html).',
      },
      {
        kind: 'mcq',
        id: 'ruby-10-mcq-4',
        prompt: `What is the effect of the magic comment \`# frozen_string_literal: true\` at the top of a file?`,
        options: [
          'Every string literal in the file becomes frozen (immutable), reducing object allocation and preventing accidental mutation.',
          'It freezes the entire program so it cannot be edited.',
          'It disables garbage collection for the file.',
          'It makes all variables constants.',
        ],
        correctIndex: 0,
        explanation:
          'With this pragma, string literals are frozen, so repeated literals can be reused instead of allocating new objects, and attempts to mutate them raise `FrozenError`. It is a common performance and safety practice. Use `+"..."` or `.dup` when you need a mutable copy. See [Object#freeze](https://docs.ruby-lang.org/en/master/Object.html#method-i-freeze).',
      },
    ],
  },
];
