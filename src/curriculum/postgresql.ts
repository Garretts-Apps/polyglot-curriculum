import type { Phase } from './types';

export const postgresqlPhases: Phase[] = [
  // ─── Level 0 ─────────────────────────────────────────────────────────────
  {
    id: 'postgresql-0',
    language: 'postgresql',
    level: 0,
    title: 'Setup & Your First SELECT',
    timeEstimate: '0.5-1 hours',
    intro: `Welcome to PostgreSQL — "the world's most advanced open-source relational database." If you have never written code before, start right here; we assume nothing.

**What is a database?** A *database* is an organised store of information. PostgreSQL organises that information into **tables**. A table is just a grid, like a spreadsheet: it has named **columns** (the vertical headings, e.g. \`title\`, \`price\`) and **rows** (each horizontal record, e.g. one specific book). One little box where a row and column meet — say the price of one particular book — is a **cell** (also called a *field* or *value*). A whole database is a collection of such tables that can refer to each other. This is what "relational" means.

**What is SQL, and what is a query?** You talk to the database in a language called **SQL** (Structured Query Language). A *query* is one instruction you send — most often a request to read some data back. The most important word in SQL is \`SELECT\`, which means "fetch and show me this." SQL is **declarative**: you describe *what* result you want, not the step-by-step *how*. You write "give me the in-print books cheaper than 20, sorted by price," and the database figures out the most efficient way to do it for you. Compare that to most programming languages, where you must spell out every loop and step.

**Postgres is a server.** Unlike a file you open, Postgres is a long-running program (the \`postgres\` process) that waits for *clients* to connect over a network socket. You type queries into a client; the server runs them and sends back rows. The standard text client is \`psql\`.

Locally: install via \`brew install postgresql@16\` (macOS), the EDB installer (Windows), or \`apt install postgresql\` (Linux), then start the service and run \`psql postgres\`. Try \`SELECT version();\` and the classic first query \`SELECT 'Hello, World!' AS greeting;\` — dissected token-by-token in the exercise below. The runnable checks here execute on an in-browser SQLite engine using portable SQL, but every concept is pure Postgres.`,
    topics: [
      { label: 'Download PostgreSQL', url: 'https://www.postgresql.org/download/', note: 'Official installers for every platform.' },
      { label: 'psql — the interactive terminal', url: 'https://www.postgresql.org/docs/current/app-psql.html', note: 'The canonical CLI client; learn its backslash meta-commands.' },
      { label: 'pgAdmin', url: 'https://www.pgadmin.org/', note: 'The official graphical administration tool.' },
      { label: 'Tutorial: Getting Started', url: 'https://www.postgresql.org/docs/current/tutorial-start.html', note: 'The official hands-on introduction.' },
    ],
    deliverable: 'Connect with psql, run SELECT version(), and return a one-row greeting result.',
    checks: [
      {
        kind: 'code',
        id: 'postgresql-0-code-1',
        prompt: 'Run this query to return a single row with a column aliased as `greeting`. The result table header should read `greeting`.',
        boilerplate: "SELECT 'Hello, World!' AS greeting;",
        expectedOutput: 'greeting',
        explanation: `Let's read \`SELECT 'Hello, World!' AS greeting;\` left-to-right, one token at a time, like teaching a first program.

\`\`\`
SELECT   'Hello, World!'   AS   greeting   ;
  │             │           │       │      │
keyword      literal     keyword  alias  end of
"fetch"    the text we   "rename  name   statement
           want returned  it"
\`\`\`

- **\`SELECT\`** — a *keyword* (a reserved word the database understands). In plain English it means "fetch and show me." It is the verb of the sentence; it is the job-word that tells Postgres you want to *read* a result. Remove it and there is no command at all — the line is meaningless and errors. By itself \`SELECT\` produces no value; it just announces what comes next is a list of things to compute and return.
- **\`'Hello, World!'\`** — a *string literal*. The single quotes \`'...'\` mean "this is a piece of literal text, exactly these characters, not the name of anything." (Single quotes are for text values; double quotes \`"..."\` mean something different — a column/table *name* — which is why we use single here.) At runtime the actual value living in memory for this is the 13-character text \`Hello, World!\`. Because we gave Postgres a literal instead of a column, the result is one row with one column. Remove it and \`SELECT AS greeting\` has nothing to return → error.
- **\`AS\`** — a keyword meaning "rename the thing on my left to the name on my right." The new name is called an **alias**. Its job is purely cosmetic: it labels the output column. Remove \`AS greeting\` and the query still runs and still returns \`Hello, World!\`, but the column header would be an ugly auto-generated label like \`?column?\` instead of the tidy \`greeting\`.
- **\`greeting\`** — the alias itself: the name we want the output column to have. It is just an identifier we chose; we could have written \`AS message\`. At runtime no separate value is stored for it — it is only the *label* printed atop the column of results.
- **\`;\`** — the semicolon *terminates* the statement: it tells Postgres "this command is complete, run it now." In \`psql\` you can spread a query across many lines; nothing executes until the \`;\`. Remove it and \`psql\` keeps waiting for more input (you'll see a \`...\` continuation prompt).

Key insight for beginners: a \`SELECT\` does **not** need a table. Here we select a constant, so it returns exactly one row containing the text we typed. The result renders as a one-row, one-column table whose header reads \`greeting\` — which is the substring the check looks for.`
      },
      {
        kind: 'mcq',
        id: 'postgresql-0-mcq-1',
        prompt: 'Which command-line client is the standard interactive terminal that ships with PostgreSQL?',
        options: ['`psql`', '`mysql`', '`sqlcmd`', '`pgcli`'],
        correctIndex: 0,
        explanation: '`psql` is the official terminal-based front-end. `sqlcmd` is for SQL Server, `mysql` for MySQL, and `pgcli` is a popular third-party client with autocompletion — but `psql` is what ships with Postgres. See the [psql docs](https://www.postgresql.org/docs/current/app-psql.html).'
      },
      {
        kind: 'mcq',
        id: 'postgresql-0-mcq-2',
        prompt: 'In `psql`, what does the meta-command `\\dt` do?',
        options: [
          'Lists the tables in the current database.',
          'Drops the current table.',
          'Describes the current transaction state.',
          'Displays the data types of a column.',
        ],
        correctIndex: 0,
        explanation: 'Backslash commands are `psql` meta-commands (not SQL). `\\dt` lists tables, `\\d tablename` describes one, `\\l` lists databases, and `\\q` quits. These are a defining feature of the `psql` workflow.'
      }
    ]
  },

  // ─── Level 1 ─────────────────────────────────────────────────────────────
  {
    id: 'postgresql-1',
    language: 'postgresql',
    level: 1,
    title: 'SELECT, WHERE, ORDER BY & Postgres Data Types',
    timeEstimate: '4-6 hours',
    intro: `By the end of this phase you'll write the core read query — choosing columns, filtering rows with \`WHERE\`, and sorting with \`ORDER BY\` — and you'll understand Postgres's built-in **types**.

**First, the bedrock vocabulary (assuming you have never coded).** A **table** is a grid of data with a name (e.g. \`book\`). Each **column** is a named, typed slot that every row fills in — like the headings \`title\` and \`price\`. Each **row** is one complete record — one specific book and all its column values. A **query** is one instruction you send to the database; a \`SELECT\` query asks it to read rows back and hand them to you. So "table = the grid, row = one line in it, column = one labelled field, query = a question you ask of the grid."

**What is a type?** Every column declares what *kind* of value it may hold — its **data type**. This is a promise the database enforces. A column declared \`integer\` (whole numbers like \`42\`) will *reject* the text \`'abc'\`; you cannot accidentally store a word where a number belongs. Postgres is *strictly, statically typed*, so these rules are checked up front. The types you'll use constantly:
- **\`integer\`** (also \`int\`) — whole numbers, e.g. \`-3\`, \`0\`, \`2024\`.
- **\`numeric(6,2)\`** — exact decimal numbers, e.g. money like \`18.50\` (here, up to 6 digits with 2 after the point). Exact = no rounding surprises.
- **\`text\`** — variable-length words/sentences, e.g. \`'Postgres Up & Running'\`. Always written in single quotes.
- **\`boolean\`** — a true/false flag. Postgres has a real native \`boolean\` (values \`true\`/\`false\`), unlike some databases that fake it with 0/1. (Note: the in-browser engine these exercises run on *does* store booleans as \`1\`/\`0\`, which is why the code check compares \`in_print = 1\`.)

**The shape of a read query.** Almost every read you write follows this skeleton, in this order:
\`\`\`
SELECT   title, price      -- WHICH columns to show (or * for all)
FROM     book              -- WHICH table to read from
WHERE    price < 20        -- keep only rows matching this test (filter)
ORDER BY price DESC;       -- sort the surviving rows (DESC = high→low, ASC = low→high)
\`\`\`
\`SELECT\` lists the columns; \`FROM\` names the table; \`WHERE\` throws away rows that fail its test; \`ORDER BY\` sorts what's left; \`;\` ends the statement. SQL is *declarative* — you state the result you want and Postgres decides how to fetch it efficiently.

Locally: create \`book(id int, title text, price numeric(6,2), in_print boolean)\`, \`INSERT\` a few rows, then run \`SELECT title, price FROM book WHERE in_print ORDER BY price DESC\`. One Postgres quirk to internalise early: it folds *unquoted* identifiers to **lowercase** (the opposite of the SQL standard's uppercase), so \`Title\` and \`title\` name the same column — unless you wrap a name in double quotes \`"Title"\`, which forces exact case.`,
    video: {
      title: 'Learn PostgreSQL Tutorial - Full Course for Beginners',
      youtubeId: 'qw--VYLpxG4',
      channelName: 'freeCodeCamp.org',
      duration: '4 hours',
    },
    topics: [
      { label: 'SELECT', url: 'https://www.postgresql.org/docs/current/sql-select.html', note: 'The full reference for the SELECT statement.' },
      { label: 'Data Types', url: 'https://www.postgresql.org/docs/current/datatype.html', note: 'The complete catalogue: numeric, character, boolean, date/time, and more.' },
      { label: 'Numeric Types', url: 'https://www.postgresql.org/docs/current/datatype-numeric.html', note: 'integer, bigint, numeric/decimal, real, double precision.' },
      { label: 'Character Types', url: 'https://www.postgresql.org/docs/current/datatype-character.html', note: 'text, varchar(n), char(n) — and why text is usually best.' },
      { label: 'Identifiers and case', url: 'https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-IDENTIFIERS', note: 'Why unquoted names fold to lowercase.' },
    ],
    deliverable: 'A book catalogue table with filtered, sorted SELECT queries over typed columns.',
    checks: [
      {
        kind: 'code',
        id: 'postgresql-1-code-1',
        prompt: 'Create a `book` table, insert three rows, then select the title and price of in-print books costing under 20, ordered by price ascending. The result header should include `title`.',
        boilerplate: `CREATE TABLE book (id INTEGER, title TEXT, price NUMERIC(6,2), in_print BOOLEAN);
INSERT INTO book VALUES (1, 'Postgres Up & Running', 18.50, 1);
INSERT INTO book VALUES (2, 'The Manual', 45.00, 1);
INSERT INTO book VALUES (3, 'Old Edition', 9.99, 0);
SELECT title, price FROM book WHERE in_print = 1 AND price < 20 ORDER BY price ASC;`,
        expectedOutput: 'title',
        explanation: 'This is the canonical read shape: project columns, filter with `WHERE`, sort with `ORDER BY ... ASC`. In real Postgres `in_print` is a native `BOOLEAN` and you would write `WHERE in_print` directly; the in-browser SQLite engine stores booleans as 0/1, so we compare against `1` here.'
      },
      {
        kind: 'mcq',
        id: 'postgresql-1-mcq-1',
        prompt: 'In PostgreSQL, which character type is recommended for general variable-length strings with no length limit?',
        options: ['`text`', '`char(255)`', '`string`', '`nvarchar`'],
        correctIndex: 0,
        explanation: 'Postgres recommends `text` for variable-length strings; there is no performance penalty versus `varchar(n)`, and no arbitrary cap. There is no `string` or `nvarchar` type (the latter is SQL Server). See [Character Types](https://www.postgresql.org/docs/current/datatype-character.html).'
      },
      {
        kind: 'mcq',
        id: 'postgresql-1-mcq-2',
        prompt: "What does the query `SELECT 'abc' = 'abc ' AS eq;` return in PostgreSQL?",
        options: [
          '`false` — comparison of `text` values is exact, so the trailing space matters.',
          '`true` — Postgres trims trailing spaces before comparing.',
          'An error — strings cannot be compared with `=`.',
          '`NULL` — whitespace makes the result unknown.',
        ],
        correctIndex: 0,
        explanation: 'For `text`/`varchar`, Postgres compares strings byte-for-byte, so a trailing space makes them unequal → `false`. (The space-trimming behaviour only applies to the fixed-length `char(n)` type, which is one reason `char(n)` is discouraged.)'
      },
      {
        kind: 'mcq',
        id: 'postgresql-1-mcq-3',
        prompt: 'Given an unquoted column `Total_Price`, which statement is true about how PostgreSQL treats the identifier?',
        options: [
          'It is folded to lowercase `total_price`; `SELECT total_price` works, but `SELECT "Total_Price"` errors.',
          'It is stored exactly as typed and is case-sensitive everywhere.',
          'It is folded to UPPERCASE `TOTAL_PRICE` per the SQL standard.',
          'Mixed-case identifiers are rejected at table creation.',
        ],
        correctIndex: 0,
        explanation: 'Postgres folds *unquoted* identifiers to lowercase (the SQL standard says uppercase, but Postgres chose lowercase). So `Total_Price` becomes `total_price`. Only a double-quoted `"Total_Price"` preserves case — and then you must always quote it. See [Lexical Structure](https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-IDENTIFIERS).'
      },
      {
        kind: 'mcq',
        id: 'postgresql-1-mcq-4',
        prompt: 'You need a money column that stores exact decimal amounts with no floating-point rounding error. Which type should you choose?',
        options: ['`numeric(10,2)`', '`real`', '`double precision`', '`float`'],
        correctIndex: 0,
        explanation: '`numeric`/`decimal` is an exact, arbitrary-precision type — ideal for currency. `real` and `double precision` (a.k.a. `float`) are binary floating-point and introduce rounding errors (e.g. `0.1 + 0.2 ≠ 0.3`). See [Numeric Types](https://www.postgresql.org/docs/current/datatype-numeric.html).'
      }
    ]
  },

  // ─── Level 2 ─────────────────────────────────────────────────────────────
  {
    id: 'postgresql-2',
    language: 'postgresql',
    level: 2,
    title: 'Filtering, NULL, COALESCE & Casting with ::',
    timeEstimate: '4-6 hours',
    intro: `This phase is about the subtleties that separate working queries from *correct* ones: three-valued logic. In SQL, \`NULL\` means "unknown," so \`NULL = NULL\` is not true — it's \`NULL\`. You'll master \`IS NULL\`, \`IS DISTINCT FROM\`, \`COALESCE\`, and \`NULLIF\`, plus Postgres's signature cast operator \`::\` (e.g. \`'42'::int\`, \`now()::date\`). You'll also meet \`ILIKE\` for case-insensitive pattern matching — a Postgres extension you won't find in the SQL standard.

Locally: build a \`contact(id, name, email, phone)\` table where some \`phone\` values are \`NULL\`, then write \`SELECT name, COALESCE(phone, 'no phone') FROM contact\` and observe how \`WHERE phone = NULL\` returns *nothing* (you must use \`IS NULL\`). Experiment with \`SELECT '3.14'::numeric * 2;\` to feel how \`::\` differs from a function call.`,
    topics: [
      { label: 'Comparison Functions & Operators', url: 'https://www.postgresql.org/docs/current/functions-comparison.html', note: 'IS NULL, IS DISTINCT FROM, BETWEEN, IN.' },
      { label: 'COALESCE / NULLIF / GREATEST', url: 'https://www.postgresql.org/docs/current/functions-conditional.html', note: 'Conditional expressions and NULL handling.' },
      { label: 'Type Casts', url: 'https://www.postgresql.org/docs/current/sql-expressions.html#SQL-SYNTAX-TYPE-CASTS', note: 'The CAST(x AS t) form and the :: shorthand.' },
      { label: 'Pattern Matching (LIKE / ILIKE)', url: 'https://www.postgresql.org/docs/current/functions-matching.html', note: 'LIKE, ILIKE, SIMILAR TO, and POSIX regex.' },
    ],
    deliverable: 'A contacts query handling NULL phone numbers with COALESCE and casting input strings with ::.',
    checks: [
      {
        kind: 'code',
        id: 'postgresql-2-code-1',
        prompt: 'Create a `contact` table where some phones are NULL. Return each name with a fallback string when the phone is missing, aliased as `phone`. The header should include `phone`.',
        boilerplate: `CREATE TABLE contact (id INTEGER, name TEXT, phone TEXT);
INSERT INTO contact VALUES (1, 'Ada', '555-0100');
INSERT INTO contact VALUES (2, 'Linus', NULL);
INSERT INTO contact VALUES (3, 'Grace', NULL);
SELECT name, COALESCE(phone, 'no phone') AS phone FROM contact ORDER BY name;`,
        expectedOutput: 'no phone',
        explanation: '`COALESCE(a, b, ...)` returns the first non-NULL argument. It is the standard way to supply defaults for missing values. Here rows with `NULL` phone render `no phone`. `COALESCE` is portable SQL and behaves identically in Postgres.'
      },
      {
        kind: 'code',
        id: 'postgresql-2-code-2',
        prompt: "Use a cast to turn the text `'2024'` into an integer and add 1, aliasing the result as `next_year`. The header should read `next_year`.",
        boilerplate: "SELECT CAST('2024' AS INTEGER) + 1 AS next_year;",
        expectedOutput: 'next_year',
        explanation: "In standard SQL you cast with `CAST(value AS type)`. PostgreSQL also offers the terse `value::type` shorthand — so `'2024'::int + 1` is equivalent. The `::` operator is one of the most recognisable bits of Postgres syntax."
      },
      {
        kind: 'mcq',
        id: 'postgresql-2-mcq-1',
        prompt: 'What does `SELECT count(*) FROM contact WHERE phone = NULL;` return, assuming some rows have NULL phones?',
        options: [
          '`0` — `= NULL` is never true; you must use `IS NULL`.',
          'The number of rows whose phone is NULL.',
          'The total number of rows.',
          'An error — `NULL` cannot appear on the right of `=`.',
        ],
        correctIndex: 0,
        explanation: 'Comparing anything to `NULL` with `=` yields `NULL` (unknown), never `true`, so no rows match → `0`. To test for NULL you must write `WHERE phone IS NULL`. This three-valued logic is the most common SQL pitfall. See [Comparison Operators](https://www.postgresql.org/docs/current/functions-comparison.html).'
      },
      {
        kind: 'mcq',
        id: 'postgresql-2-mcq-2',
        prompt: 'Which PostgreSQL operator performs a *case-insensitive* pattern match (e.g. matching both `Postgres` and `postgres`)?',
        options: ['`ILIKE`', '`LIKE`', '`MATCH`', '`=~`'],
        correctIndex: 0,
        explanation: "`ILIKE` is a PostgreSQL extension that does case-insensitive `LIKE` matching: `name ILIKE 'post%'`. Plain `LIKE` is case-sensitive. (`~*` is the case-insensitive POSIX-regex operator; `=~` is not Postgres syntax.) See [Pattern Matching](https://www.postgresql.org/docs/current/functions-matching.html)."
      },
      {
        kind: 'mcq',
        id: 'postgresql-2-mcq-3',
        prompt: 'What is the result of `SELECT NULLIF(10, 10), NULLIF(10, 5);`?',
        options: [
          '`NULL` and `10`',
          '`10` and `NULL`',
          '`0` and `5`',
          '`NULL` and `NULL`',
        ],
        correctIndex: 0,
        explanation: '`NULLIF(a, b)` returns `NULL` when `a = b`, otherwise it returns `a`. So `NULLIF(10,10)` → `NULL` and `NULLIF(10,5)` → `10`. It is handy for turning sentinel values into NULL or guarding division by zero (`x / NULLIF(y,0)`).'
      }
    ]
  },

  // ─── Level 3 ─────────────────────────────────────────────────────────────
  {
    id: 'postgresql-3',
    language: 'postgresql',
    level: 3,
    title: 'JOINs — Combining Tables',
    timeEstimate: '5-7 hours',
    intro: `Relational power comes from *joining* normalised tables back together. This phase covers \`INNER JOIN\`, \`LEFT\`/\`RIGHT\`/\`FULL OUTER JOIN\`, \`CROSS JOIN\`, and self-joins, plus the difference between the \`ON\` and \`USING\` clauses. You'll learn how outer joins introduce NULLs for non-matching rows and how to filter them. Postgres also supports \`NATURAL JOIN\` (discouraged) and lateral joins (covered later).

Locally: model \`author(id, name)\` and \`book(id, author_id, title)\`, then list every author *and* their books with a \`LEFT JOIN\` so authors with no books still appear (with NULL titles). Predict what a \`FULL OUTER JOIN\` adds. Aliasing tables (\`FROM author a JOIN book b ON b.author_id = a.id\`) keeps queries readable.`,
    topics: [
      { label: 'Table Joins (Tutorial)', url: 'https://www.postgresql.org/docs/current/tutorial-join.html', note: 'The official walkthrough of join types.' },
      { label: 'FROM clause & JOIN syntax', url: 'https://www.postgresql.org/docs/current/sql-select.html#SQL-FROM', note: 'INNER/LEFT/RIGHT/FULL, ON vs USING, NATURAL.' },
      { label: 'Joined Tables', url: 'https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-JOIN', note: 'Conceptual explanation of how joins build the row set.' },
      { label: 'Visual JOIN guide', url: 'https://blog.codinghorror.com/a-visual-explanation-of-sql-joins/', note: 'A classic visual mental model for join types.' },
    ],
    deliverable: 'A query listing all authors and their books via LEFT JOIN, preserving authorless rows.',
    checks: [
      {
        kind: 'code',
        id: 'postgresql-3-code-1',
        prompt: 'Create `author` and `book` tables. Use a LEFT JOIN to list every author name with each book title, so an author with no books still appears (with NULL title). Alias the title column as `title`.',
        boilerplate: `CREATE TABLE author (id INTEGER, name TEXT);
CREATE TABLE book (id INTEGER, author_id INTEGER, title TEXT);
INSERT INTO author VALUES (1, 'Kafka'), (2, 'Borges'), (3, 'Newcomer');
INSERT INTO book VALUES (10, 1, 'The Trial'), (11, 2, 'Ficciones');
SELECT a.name, b.title AS title
FROM author a
LEFT JOIN book b ON b.author_id = a.id
ORDER BY a.name;`,
        expectedOutput: 'title',
        explanation: 'A `LEFT JOIN` keeps every row from the left table (`author`); where no matching `book` exists, the right-side columns are `NULL`. So `Newcomer` appears with a NULL title. An `INNER JOIN` would have dropped that author entirely.'
      },
      {
        kind: 'mcq',
        id: 'postgresql-3-mcq-1',
        prompt: 'A `LEFT JOIN` between `orders` (left) and `shipments` (right) produces NULLs in which columns when an order has no shipment?',
        options: [
          'The `shipments` columns are NULL; the `orders` columns keep their values.',
          'The `orders` columns are NULL.',
          'Both sides are NULL for that row.',
          'No row is produced at all for an unshipped order.',
        ],
        correctIndex: 0,
        explanation: 'A LEFT (OUTER) JOIN preserves all left-side rows. When the right side (`shipments`) has no match, its columns are filled with NULL while the left side keeps its data. This lets you find "orders with no shipment" via `WHERE shipments.id IS NULL`.'
      },
      {
        kind: 'mcq',
        id: 'postgresql-3-mcq-2',
        prompt: 'What is the difference between `JOIN ... ON a.dept_id = b.id` and `JOIN ... USING (dept_id)`?',
        options: [
          '`USING (dept_id)` requires the column to be named identically in both tables and merges it into one output column.',
          'They are identical in every respect.',
          '`USING` performs an outer join; `ON` performs an inner join.',
          '`USING` cannot be combined with a `WHERE` clause.',
        ],
        correctIndex: 0,
        explanation: '`USING (col)` is shorthand for an equi-join on a commonly-named column, and it *coalesces* the join column into a single output column (no need to qualify it). `ON` is fully general and keeps both columns. See [JOIN syntax](https://www.postgresql.org/docs/current/sql-select.html#SQL-FROM).'
      },
      {
        kind: 'mcq',
        id: 'postgresql-3-mcq-3',
        prompt: 'How many rows does a `CROSS JOIN` of a 4-row table and a 3-row table produce?',
        options: ['12', '7', '4', '1'],
        correctIndex: 0,
        explanation: 'A `CROSS JOIN` is the Cartesian product: every row of one table paired with every row of the other, so 4 × 3 = 12 rows. It has no `ON` clause. Accidentally omitting a join condition produces an unintended cross join — a classic source of runaway result sets.'
      },
      {
        kind: 'mcq',
        id: 'postgresql-3-mcq-4',
        prompt: 'You want all rows from BOTH tables, matched where possible and NULL-padded where not. Which join do you use?',
        options: ['`FULL OUTER JOIN`', '`INNER JOIN`', '`LEFT JOIN`', '`CROSS JOIN`'],
        correctIndex: 0,
        explanation: 'A `FULL OUTER JOIN` returns matched rows plus unmatched rows from *both* sides (NULL-padded on the missing side). PostgreSQL fully supports it. `LEFT`/`RIGHT` preserve only one side; `INNER` preserves neither unmatched side.'
      }
    ]
  },

  // ─── Level 4 ─────────────────────────────────────────────────────────────
  {
    id: 'postgresql-4',
    language: 'postgresql',
    level: 4,
    title: 'Aggregation — GROUP BY, HAVING & FILTER',
    timeEstimate: '5-7 hours',
    intro: `Aggregation collapses many rows into summary values. This phase covers \`count\`, \`sum\`, \`avg\`, \`min\`, \`max\`, the \`GROUP BY\` clause, and the \`HAVING\` clause that filters *groups* (versus \`WHERE\`, which filters rows before grouping). You'll meet two PostgreSQL-flavoured tools: the SQL-standard \`FILTER (WHERE ...)\` clause for conditional aggregation, and \`string_agg\`/\`array_agg\` for stitching grouped values together.

Locally: build a \`sale(id, region, amount)\` table and compute \`SELECT region, sum(amount) FROM sale GROUP BY region HAVING sum(amount) > 100\`. Then rewrite a "count only big sales per region" query using \`count(*) FILTER (WHERE amount > 50)\` — far cleaner than \`sum(CASE WHEN ...)\`.`,
    topics: [
      { label: 'Aggregate Functions', url: 'https://www.postgresql.org/docs/current/functions-aggregate.html', note: 'count, sum, avg, array_agg, string_agg, and FILTER.' },
      { label: 'GROUP BY and HAVING', url: 'https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-GROUP', note: 'How grouping reshapes the result set.' },
      { label: 'GROUPING SETS / ROLLUP / CUBE', url: 'https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-GROUPING-SETS', note: 'Multi-level subtotals in one query.' },
      { label: 'Aggregate Expressions (FILTER)', url: 'https://www.postgresql.org/docs/current/sql-expressions.html#SYNTAX-AGGREGATES', note: 'The FILTER (WHERE ...) clause for conditional aggregation.' },
    ],
    deliverable: 'Per-region sales totals filtered by HAVING, plus a conditional count using FILTER.',
    checks: [
      {
        kind: 'code',
        id: 'postgresql-4-code-1',
        prompt: 'Create a `sale` table and compute the total `amount` per `region`, keeping only regions whose total exceeds 100. Alias the total as `total`. The header should include `total`.',
        boilerplate: `CREATE TABLE sale (id INTEGER, region TEXT, amount INTEGER);
INSERT INTO sale VALUES (1, 'North', 80), (2, 'North', 50), (3, 'South', 30), (4, 'East', 200);
SELECT region, sum(amount) AS total
FROM sale
GROUP BY region
HAVING sum(amount) > 100
ORDER BY total DESC;`,
        expectedOutput: 'total',
        explanation: '`GROUP BY region` collapses rows into one per region; `sum(amount)` aggregates within each group. `HAVING` filters the *groups* after aggregation (you cannot use `WHERE sum(...)` because `WHERE` runs before grouping). North (130) and East (200) qualify; South (30) is dropped.'
      },
      {
        kind: 'mcq',
        id: 'postgresql-4-mcq-1',
        prompt: 'What is the key difference between `WHERE` and `HAVING`?',
        options: [
          '`WHERE` filters individual rows before grouping; `HAVING` filters groups after aggregation.',
          '`HAVING` filters rows; `WHERE` filters groups.',
          'They are interchangeable in all cases.',
          '`WHERE` can use aggregate functions; `HAVING` cannot.',
        ],
        correctIndex: 0,
        explanation: '`WHERE` is applied to raw rows *before* `GROUP BY`, so it cannot reference aggregates. `HAVING` is applied to the grouped results, so it *can* use aggregates like `sum()` or `count()`. See [GROUP BY and HAVING](https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-GROUP).'
      },
      {
        kind: 'mcq',
        id: 'postgresql-4-mcq-2',
        prompt: 'In PostgreSQL, what does `count(*) FILTER (WHERE amount > 50)` compute when grouped by region?',
        options: [
          'Per region, the count of rows where `amount > 50` only.',
          'The total row count per region (FILTER is ignored).',
          'A syntax error — FILTER is not valid PostgreSQL.',
          'The sum of amounts greater than 50.',
        ],
        correctIndex: 0,
        explanation: 'The `FILTER (WHERE ...)` clause restricts which rows feed a *single* aggregate, without affecting other aggregates in the same query. It is the clean, standard replacement for `count(CASE WHEN amount > 50 THEN 1 END)`. PostgreSQL has supported it since 9.4. See [Aggregate Expressions](https://www.postgresql.org/docs/current/sql-expressions.html#SYNTAX-AGGREGATES).'
      },
      {
        kind: 'mcq',
        id: 'postgresql-4-mcq-3',
        prompt: 'Why does `SELECT region, amount, sum(amount) FROM sale GROUP BY region;` raise an error in PostgreSQL?',
        options: [
          'The bare `amount` is neither in `GROUP BY` nor wrapped in an aggregate.',
          '`sum` cannot be combined with `GROUP BY`.',
          '`region` must be aliased.',
          'You cannot select more than one column with `GROUP BY`.',
        ],
        correctIndex: 0,
        explanation: 'Every selected column must either appear in `GROUP BY` or be inside an aggregate function. The bare `amount` is neither (only `sum(amount)` is aggregated), so Postgres cannot decide which `amount` to show per region and rejects the query. (Postgres is stricter here than MySQL\'s legacy behaviour.)'
      },
      {
        kind: 'mcq',
        id: 'postgresql-4-mcq-4',
        prompt: 'Which aggregate concatenates the grouped values of a text column into one delimited string in PostgreSQL?',
        options: ["`string_agg(name, ', ')`", '`group_concat(name)`', '`concat_ws(name)`', '`listagg(name)`'],
        correctIndex: 0,
        explanation: '`string_agg(expr, delimiter)` is PostgreSQL\'s grouped string concatenation aggregate. `group_concat` is MySQL\'s spelling; `listagg` is Oracle\'s. For arrays, use `array_agg(name)`. See [Aggregate Functions](https://www.postgresql.org/docs/current/functions-aggregate.html).'
      }
    ]
  },

  // ─── Level 5 ─────────────────────────────────────────────────────────────
  {
    id: 'postgresql-5',
    language: 'postgresql',
    level: 5,
    title: 'Subqueries & CTEs (WITH, Recursive)',
    timeEstimate: '5-7 hours',
    intro: `This phase teaches you to compose queries: scalar subqueries, \`IN\`/\`EXISTS\`/\`ANY\`/\`ALL\` predicate subqueries, and Common Table Expressions (\`WITH\`) that name a subquery for readability and reuse. The headline PostgreSQL feature is the **recursive CTE** (\`WITH RECURSIVE\`), which walks hierarchies (org charts, category trees, graph paths) and generates sequences. You'll also meet \`generate_series\`, Postgres's set-returning workhorse.

Locally: write a \`WITH RECURSIVE nums AS (SELECT 1 AS n UNION ALL SELECT n+1 FROM nums WHERE n < 5) SELECT * FROM nums;\` to produce 1–5. Then model an \`employee(id, manager_id, name)\` table and recurse from the CEO down to print each person's depth in the hierarchy.`,
    topics: [
      { label: 'WITH Queries (CTEs)', url: 'https://www.postgresql.org/docs/current/queries-with.html', note: 'Including WITH RECURSIVE and the MATERIALIZED keyword.' },
      { label: 'Subquery Expressions', url: 'https://www.postgresql.org/docs/current/functions-subquery.html', note: 'EXISTS, IN, ANY/SOME, ALL.' },
      { label: 'Set Returning Functions', url: 'https://www.postgresql.org/docs/current/functions-srf.html', note: 'generate_series and friends for generating rows.' },
      { label: 'Scalar Subqueries', url: 'https://www.postgresql.org/docs/current/sql-expressions.html#SQL-SYNTAX-SCALAR-SUBQUERIES', note: 'Subqueries that return a single value.' },
    ],
    deliverable: 'A recursive CTE that generates a number series and one that walks an org-chart hierarchy.',
    checks: [
      {
        kind: 'code',
        id: 'postgresql-5-code-1',
        prompt: 'Write a recursive CTE named `nums` that produces the integers 1 through 5 in a column aliased `n`. The header should read `n`.',
        boilerplate: `WITH RECURSIVE nums AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM nums WHERE n < 5
)
SELECT n FROM nums;`,
        expectedOutput: 'n',
        explanation: 'A recursive CTE has an *anchor* (`SELECT 1`) and a *recursive term* (`SELECT n+1 ... WHERE n < 5`) combined with `UNION ALL`. Postgres repeatedly feeds the previous result back in until the recursive term returns no rows. This runs on SQLite too, which adopted the same `WITH RECURSIVE` syntax.'
      },
      {
        kind: 'code',
        id: 'postgresql-5-code-2',
        prompt: 'Using a CTE, find employees whose salary is above the company average. Create `emp`, define a CTE for the average, then select names. Alias the name column `name`.',
        boilerplate: `CREATE TABLE emp (id INTEGER, name TEXT, salary INTEGER);
INSERT INTO emp VALUES (1, 'Ann', 50), (2, 'Bob', 70), (3, 'Cy', 90), (4, 'Di', 30);
WITH avg_sal AS (
  SELECT avg(salary) AS a FROM emp
)
SELECT name FROM emp, avg_sal WHERE salary > a ORDER BY name;`,
        expectedOutput: 'name',
        explanation: 'The CTE `avg_sal` computes the average once and names it; the main query joins against it to keep employees above average (Bob 70, Cy 90). CTEs make multi-step logic readable and can be referenced multiple times. The same query works as an uncorrelated subquery, but the CTE reads more clearly.'
      },
      {
        kind: 'mcq',
        id: 'postgresql-5-mcq-1',
        prompt: 'In a `WITH RECURSIVE` CTE, what are the two required parts joined by `UNION ALL`?',
        options: [
          'A non-recursive anchor term and a recursive term that references the CTE.',
          'Two recursive terms that reference each other.',
          'A SELECT and a matching INSERT.',
          'A base table and an index.',
        ],
        correctIndex: 0,
        explanation: 'A recursive CTE = anchor (the seed rows, no self-reference) `UNION ALL` recursive term (references the CTE name and is re-evaluated until it yields no new rows). Forgetting a terminating condition in the recursive term causes infinite recursion. See [WITH Queries](https://www.postgresql.org/docs/current/queries-with.html).'
      },
      {
        kind: 'mcq',
        id: 'postgresql-5-mcq-2',
        prompt: 'What does `SELECT n FROM generate_series(2, 10, 2) AS n;` return in PostgreSQL?',
        options: [
          'The rows 2, 4, 6, 8, 10.',
          'The rows 2 through 10 (every integer).',
          'A single row containing the array {2,10,2}.',
          'An error — generate_series needs exactly two arguments.',
        ],
        correctIndex: 0,
        explanation: '`generate_series(start, stop, step)` is a set-returning function emitting one row per value. With step 2 it yields 2, 4, 6, 8, 10. It is invaluable for generating date ranges, filling gaps, and test data. See [Set Returning Functions](https://www.postgresql.org/docs/current/functions-srf.html).'
      },
      {
        kind: 'mcq',
        id: 'postgresql-5-mcq-3',
        prompt: 'When is `EXISTS (subquery)` generally preferable to `IN (subquery)`?',
        options: [
          'When you only need to test for the presence of *any* matching row; `EXISTS` can short-circuit and handles NULLs predictably.',
          'Never — `IN` is always faster.',
          'Only when the subquery returns more than 1000 rows.',
          '`EXISTS` and `IN` are byte-for-byte equivalent in every case.',
        ],
        correctIndex: 0,
        explanation: '`EXISTS` stops as soon as one matching row is found and is unaffected by NULLs in the subquery, whereas `NOT IN` with a NULL in the list silently returns no rows (a notorious bug). The planner often treats them similarly, but `EXISTS`/`NOT EXISTS` is the safer default. See [Subquery Expressions](https://www.postgresql.org/docs/current/functions-subquery.html).'
      }
    ]
  },

  // ─── Level 6 ─────────────────────────────────────────────────────────────
  {
    id: 'postgresql-6',
    language: 'postgresql',
    level: 6,
    title: 'Writing Data — INSERT, UPDATE, DELETE, RETURNING, UPSERT & Transactions',
    timeEstimate: '5-7 hours',
    intro: `Now you mutate data. This phase covers \`INSERT\` (including multi-row), \`UPDATE ... SET\`, \`DELETE\`, and three PostgreSQL hallmarks: the \`RETURNING\` clause (get the affected rows back in the *same* statement — no second round-trip), \`INSERT ... ON CONFLICT\` (the "UPSERT" for idempotent writes), and explicit transactions (\`BEGIN\`/\`COMMIT\`/\`ROLLBACK\`, plus \`SAVEPOINT\`). Postgres is fully ACID and uses MVCC so readers never block writers (explored in L10).

Locally: \`INSERT INTO account(id, balance) VALUES (1, 100) RETURNING *;\`, then run a transfer inside \`BEGIN; UPDATE ...; UPDATE ...; COMMIT;\` and practise \`ROLLBACK\`. Try \`INSERT ... ON CONFLICT (id) DO UPDATE SET balance = EXCLUDED.balance\` to make a write idempotent.`,
    topics: [
      { label: 'INSERT (incl. ON CONFLICT)', url: 'https://www.postgresql.org/docs/current/sql-insert.html', note: 'Multi-row inserts, RETURNING, and ON CONFLICT upserts.' },
      { label: 'UPDATE', url: 'https://www.postgresql.org/docs/current/sql-update.html', note: 'SET, FROM (update-from-join), and RETURNING.' },
      { label: 'DELETE', url: 'https://www.postgresql.org/docs/current/sql-delete.html', note: 'USING joins and RETURNING.' },
      { label: 'Transactions Tutorial', url: 'https://www.postgresql.org/docs/current/tutorial-transactions.html', note: 'BEGIN/COMMIT/ROLLBACK and SAVEPOINT.' },
      { label: 'RETURNING', url: 'https://www.postgresql.org/docs/current/dml-returning.html', note: 'Returning rows from data-modifying statements.' },
    ],
    deliverable: 'An account-transfer transaction with RETURNING and an idempotent upsert via ON CONFLICT.',
    checks: [
      {
        kind: 'code',
        id: 'postgresql-6-code-1',
        prompt: 'Create an `account` table, insert two rows, run an UPDATE that moves 30 from account 1 to account 2, then select both balances aliased `balance`. The header should include `balance`.',
        boilerplate: `CREATE TABLE account (id INTEGER, balance INTEGER);
INSERT INTO account VALUES (1, 100), (2, 50);
UPDATE account SET balance = balance - 30 WHERE id = 1;
UPDATE account SET balance = balance + 30 WHERE id = 2;
SELECT id, balance FROM account ORDER BY id;`,
        expectedOutput: 'balance',
        explanation: 'Two `UPDATE` statements implement a transfer; in real Postgres you would wrap them in `BEGIN ... COMMIT` so they succeed or fail atomically. After running, account 1 has 70 and account 2 has 80. The `RETURNING` clause (taught via MCQ) could surface the new balances without a second `SELECT`.'
      },
      {
        kind: 'mcq',
        id: 'postgresql-6-mcq-1',
        prompt: 'What does the PostgreSQL `RETURNING` clause do in `INSERT INTO account (id, balance) VALUES (3, 200) RETURNING id, balance;`?',
        options: [
          'Returns the inserted row(s) as a result set from the same statement.',
          'Validates that the row already exists before inserting.',
          'Rolls back the insert if a constraint fails.',
          'Logs the insert to a separate audit table automatically.',
        ],
        correctIndex: 0,
        explanation: '`RETURNING` makes `INSERT`/`UPDATE`/`DELETE` emit the affected rows (including server-generated values like `SERIAL`/identity ids or defaults) in one round-trip — no follow-up `SELECT` needed. This is a signature PostgreSQL convenience. See [RETURNING](https://www.postgresql.org/docs/current/dml-returning.html).'
      },
      {
        kind: 'mcq',
        id: 'postgresql-6-mcq-2',
        prompt: 'What does `INSERT INTO product (id, name, qty) VALUES (1, \'Widget\', 5) ON CONFLICT (id) DO UPDATE SET qty = EXCLUDED.qty;` do if a row with `id = 1` already exists?',
        options: [
          "Updates the existing row's `qty` to 5 instead of failing on the unique violation.",
          'Raises a duplicate-key error and aborts.',
          'Silently inserts a second row with id 1.',
          'Deletes the existing row and inserts a new one.',
        ],
        correctIndex: 0,
        explanation: 'This is the PostgreSQL UPSERT. `ON CONFLICT (id) DO UPDATE` catches the unique/PK violation and updates instead; `EXCLUDED` refers to the row that *would* have been inserted. `DO NOTHING` is the other option. It makes writes idempotent. See [INSERT](https://www.postgresql.org/docs/current/sql-insert.html#SQL-ON-CONFLICT).'
      },
      {
        kind: 'mcq',
        id: 'postgresql-6-mcq-3',
        prompt: 'Inside a transaction you run two UPDATEs, then issue `ROLLBACK`. What is the state of the data?',
        options: [
          'Both UPDATEs are undone — the data is exactly as before `BEGIN`.',
          'Only the second UPDATE is undone.',
          'Both UPDATEs are kept; ROLLBACK only affects DELETEs.',
          'The transaction commits automatically because UPDATEs are durable.',
        ],
        correctIndex: 0,
        explanation: '`ROLLBACK` discards every change made since `BEGIN`, restoring the pre-transaction state — the atomicity guarantee of ACID. `COMMIT` would have made them durable. `SAVEPOINT` allows partial rollback within a transaction. See [Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html).'
      },
      {
        kind: 'mcq',
        id: 'postgresql-6-mcq-4',
        prompt: 'Which statement removes ALL rows from a large table fastest, without scanning row-by-row, while still being transaction-safe in PostgreSQL?',
        options: ['`TRUNCATE table_name;`', '`DELETE FROM table_name;`', '`DROP TABLE table_name;`', '`UPDATE table_name SET deleted = true;`'],
        correctIndex: 0,
        explanation: '`TRUNCATE` removes all rows by deallocating data pages rather than deleting individually, so it is far faster on big tables. In PostgreSQL `TRUNCATE` is transactional (it can be rolled back). `DROP TABLE` removes the table itself. See [TRUNCATE](https://www.postgresql.org/docs/current/sql-truncate.html).'
      }
    ]
  },

  // ─── Level 7 ─────────────────────────────────────────────────────────────
  {
    id: 'postgresql-7',
    language: 'postgresql',
    level: 7,
    title: 'Postgres Types Deep-Dive — Identity, Arrays, JSON/JSONB, Enums',
    timeEstimate: '6-8 hours',
    intro: `This phase is where PostgreSQL pulls away from a plain SQL engine. You'll learn auto-incrementing keys via legacy \`SERIAL\` and the modern SQL-standard \`GENERATED ... AS IDENTITY\`; native **array** columns (\`integer[]\`, with \`ANY\`, \`@>\`, \`unnest\`); the **\`jsonb\`** type with its operator arsenal (\`->\`, \`->>\`, \`@>\`, \`?\`, \`jsonb_set\`); and user-defined **enum** types. These let Postgres model semi-structured and set-valued data without leaving the relational world.

Locally: \`CREATE TABLE post(id int GENERATED ALWAYS AS IDENTITY, tags text[], body jsonb);\` then insert \`ARRAY['sql','pg']\` and \`'{"views": 10}'::jsonb\`. Query \`WHERE 'pg' = ANY(tags)\` and \`WHERE body->>'views' = '10'\`. Create \`CREATE TYPE mood AS ENUM ('sad','ok','happy');\` and use it as a column type.`,
    topics: [
      { label: 'JSON Types (json / jsonb)', url: 'https://www.postgresql.org/docs/current/datatype-json.html', note: 'jsonb vs json and when to use each.' },
      { label: 'JSON Functions & Operators', url: 'https://www.postgresql.org/docs/current/functions-json.html', note: '->, ->>, @>, ?, jsonb_set, jsonb_path_query.' },
      { label: 'Arrays', url: 'https://www.postgresql.org/docs/current/arrays.html', note: 'Declaring, querying (ANY/@>), and unnesting arrays.' },
      { label: 'Identity Columns', url: 'https://www.postgresql.org/docs/current/ddl-identity-columns.html', note: 'GENERATED ALWAYS/BY DEFAULT AS IDENTITY.' },
      { label: 'SERIAL Types', url: 'https://www.postgresql.org/docs/current/datatype-numeric.html#DATATYPE-SERIAL', note: 'The legacy auto-increment shorthand.' },
      { label: 'Enumerated Types', url: 'https://www.postgresql.org/docs/current/datatype-enum.html', note: 'CREATE TYPE ... AS ENUM.' },
    ],
    deliverable: 'A posts table using an identity key, a text[] tags column, and a jsonb body queried by key.',
    checks: [
      {
        kind: 'code',
        id: 'postgresql-7-code-1',
        prompt: 'Simulate a surrogate key with an integer PRIMARY KEY: create a `tag` table, insert rows, and count them aliased `total`. The header should include `total`.',
        boilerplate: `CREATE TABLE tag (id INTEGER PRIMARY KEY, label TEXT);
INSERT INTO tag VALUES (1, 'sql'), (2, 'postgres'), (3, 'jsonb');
SELECT count(*) AS total FROM tag;`,
        expectedOutput: 'total',
        explanation: 'In real Postgres you would declare `id INTEGER GENERATED ALWAYS AS IDENTITY` (or legacy `SERIAL`) so ids auto-assign. The browser engine lacks identity columns, so we supply ids manually here; the *concept* — a surrogate key — is identical. The identity/SERIAL distinction is taught in the MCQs below.'
      },
      {
        kind: 'mcq',
        id: 'postgresql-7-mcq-1',
        prompt: 'In modern PostgreSQL, what is the recommended way to declare an auto-incrementing primary key?',
        options: [
          '`id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY`',
          '`id serial PRIMARY KEY` is the only correct option',
          '`id integer AUTO_INCREMENT PRIMARY KEY`',
          '`id integer IDENTITY(1,1) PRIMARY KEY`',
        ],
        correctIndex: 0,
        explanation: 'The SQL-standard `GENERATED ALWAYS AS IDENTITY` is now preferred over the older `SERIAL`. `AUTO_INCREMENT` is MySQL and `IDENTITY(1,1)` is SQL Server — neither is PostgreSQL syntax. `SERIAL` still works but creates an implicit sequence with ownership quirks. See [Identity Columns](https://www.postgresql.org/docs/current/ddl-identity-columns.html).'
      },
      {
        kind: 'mcq',
        id: 'postgresql-7-mcq-2',
        prompt: 'Given `tags text[]` holding `{sql,pg,db}`, which predicate finds rows containing the value `pg`?',
        options: [
          "`WHERE 'pg' = ANY(tags)`",
          "`WHERE tags = 'pg'`",
          "`WHERE tags CONTAINS 'pg'`",
          "`WHERE 'pg' IN tags`",
        ],
        correctIndex: 0,
        explanation: "`'pg' = ANY(tags)` tests whether any array element equals `'pg'`. Alternatively `tags @> ARRAY['pg']` (the containment operator) works and can use a GIN index. Direct `=` would compare the whole array. See [Arrays](https://www.postgresql.org/docs/current/arrays.html)."
      },
      {
        kind: 'mcq',
        id: 'postgresql-7-mcq-3',
        prompt: 'What is the practical difference between the `json` and `jsonb` types?',
        options: [
          '`jsonb` stores a decomposed binary form: faster to query/index, but loses key order and duplicate keys; `json` stores exact text.',
          'They are aliases for the same type.',
          '`json` supports indexing with GIN; `jsonb` does not.',
          '`jsonb` can only store arrays, not objects.',
        ],
        correctIndex: 0,
        explanation: '`jsonb` parses and stores JSON in a binary format, enabling fast operators (`@>`, `?`) and GIN indexing, at the cost of not preserving insignificant whitespace, key order, or duplicate keys. `json` keeps the exact input text and is faster to insert but slower to process. Prefer `jsonb` unless you need verbatim text. See [JSON Types](https://www.postgresql.org/docs/current/datatype-json.html).'
      },
      {
        kind: 'mcq',
        id: 'postgresql-7-mcq-4',
        prompt: "For a `jsonb` column `body` holding `{\"views\": 10}`, what does `body->>'views'` return, and of what type?",
        options: [
          "The text `'10'` (the `->>` operator extracts a field as `text`).",
          'The integer `10` (a numeric value).',
          'The jsonb fragment `{"views": 10}`.',
          'An error — `->>` only works on arrays.',
        ],
        correctIndex: 0,
        explanation: "`->` returns a `jsonb` value; `->>` returns the value as **text**. So `body->>'views'` yields the string `'10'`; to compare numerically you cast: `(body->>'views')::int > 5`. The arrow operators are central to working with `jsonb`. See [JSON Functions](https://www.postgresql.org/docs/current/functions-json.html)."
      }
    ]
  },

  // ─── Level 8 ─────────────────────────────────────────────────────────────
  {
    id: 'postgresql-8',
    language: 'postgresql',
    level: 8,
    title: 'Window Functions — OVER, PARTITION BY, ROW_NUMBER, RANK, LAG',
    timeEstimate: '6-8 hours',
    intro: `Window functions compute across a set of rows *related to the current row* while still returning every row — unlike \`GROUP BY\`, which collapses them. This phase covers the \`OVER (PARTITION BY ... ORDER BY ...)\` clause, ranking functions (\`row_number\`, \`rank\`, \`dense_rank\`, \`ntile\`), offset functions (\`lag\`, \`lead\`), running aggregates (\`sum() OVER\`), and frame clauses (\`ROWS BETWEEN ...\`). PostgreSQL also offers \`DISTINCT ON\`, a Postgres-only shortcut for "first row per group."

Locally: build \`sale(region, day, amount)\` and compute a running total per region with \`sum(amount) OVER (PARTITION BY region ORDER BY day)\`, then rank salespeople with \`rank() OVER (ORDER BY amount DESC)\`. Compare \`rank\` vs \`dense_rank\` on ties, and use \`lag(amount) OVER (ORDER BY day)\` to compute day-over-day deltas.`,
    topics: [
      { label: 'Window Functions (Tutorial)', url: 'https://www.postgresql.org/docs/current/tutorial-window.html', note: 'The official introduction with worked examples.' },
      { label: 'Window Function Calls', url: 'https://www.postgresql.org/docs/current/sql-expressions.html#SYNTAX-WINDOW-FUNCTIONS', note: 'OVER, PARTITION BY, ORDER BY, frame clauses.' },
      { label: 'Window Function List', url: 'https://www.postgresql.org/docs/current/functions-window.html', note: 'row_number, rank, dense_rank, lag, lead, ntile, etc.' },
      { label: 'DISTINCT ON', url: 'https://www.postgresql.org/docs/current/sql-select.html#SQL-DISTINCT', note: 'The PostgreSQL-only "first row per group" shortcut.' },
    ],
    deliverable: 'A running-total-per-region report and a ranked leaderboard using window functions.',
    checks: [
      {
        kind: 'code',
        id: 'postgresql-8-code-1',
        prompt: 'Create a `sale` table and compute a running total of `amount` ordered by `day`, aliased `running`. The header should include `running`. (Window functions run on the in-browser SQLite engine too.)',
        boilerplate: `CREATE TABLE sale (day INTEGER, amount INTEGER);
INSERT INTO sale VALUES (1, 10), (2, 20), (3, 5), (4, 15);
SELECT day, amount,
       sum(amount) OVER (ORDER BY day) AS running
FROM sale
ORDER BY day;`,
        expectedOutput: 'running',
        explanation: 'A window function `sum(amount) OVER (ORDER BY day)` produces a *running total*: each row sees the sum of all rows up to and including itself in the ordering, while every input row is still returned. This is the defining difference from `GROUP BY`.'
      },
      {
        kind: 'code',
        id: 'postgresql-8-code-2',
        prompt: 'Rank rows by `amount` descending using `row_number()`, aliasing the rank `rn`. The header should include `rn`.',
        boilerplate: `CREATE TABLE score (name TEXT, amount INTEGER);
INSERT INTO score VALUES ('A', 30), ('B', 50), ('C', 20);
SELECT name, amount,
       row_number() OVER (ORDER BY amount DESC) AS rn
FROM score;`,
        expectedOutput: 'rn',
        explanation: '`row_number() OVER (ORDER BY amount DESC)` assigns 1, 2, 3 by descending amount (B, A, C). Unlike `rank()`, `row_number()` never ties — every row gets a distinct number. SQLite implements the same window-function syntax as PostgreSQL.'
      },
      {
        kind: 'mcq',
        id: 'postgresql-8-mcq-1',
        prompt: 'What does `PARTITION BY region` do inside an `OVER` clause?',
        options: [
          'Restarts the window calculation independently for each region.',
          'Filters out all regions except the first.',
          'Sorts the final output by region.',
          'Collapses each region to a single summary row.',
        ],
        correctIndex: 0,
        explanation: '`PARTITION BY` divides rows into independent groups for the window function; the calculation (e.g. running sum or rank) restarts within each partition. Crucially, unlike `GROUP BY`, all rows are still returned. See [Window Functions](https://www.postgresql.org/docs/current/tutorial-window.html).'
      },
      {
        kind: 'mcq',
        id: 'postgresql-8-mcq-2',
        prompt: 'Two rows tie for 2nd place by amount. How do `rank()` and `dense_rank()` number the row that follows the tie?',
        options: [
          '`rank()` skips to 4; `dense_rank()` gives 3 (no gap).',
          'Both give 3.',
          'Both give 4.',
          '`rank()` gives 3; `dense_rank()` gives 4.',
        ],
        correctIndex: 0,
        explanation: 'With a tie at rank 2 (two rows both rank 2), `rank()` leaves a gap and resumes at 4, while `dense_rank()` has no gaps and resumes at 3. `row_number()` would have given the tied rows distinct 2 and 3 arbitrarily. See [Window Functions list](https://www.postgresql.org/docs/current/functions-window.html).'
      },
      {
        kind: 'mcq',
        id: 'postgresql-8-mcq-3',
        prompt: 'You want exactly one row per `customer_id` — the most recent order. Which PostgreSQL-specific construct does this most directly?',
        options: [
          '`SELECT DISTINCT ON (customer_id) * FROM orders ORDER BY customer_id, ordered_at DESC`',
          '`SELECT DISTINCT customer_id, * FROM orders`',
          '`GROUP BY customer_id` with no aggregates',
          '`SELECT TOP 1 ... PER customer_id`',
        ],
        correctIndex: 0,
        explanation: '`DISTINCT ON (expr)` is a PostgreSQL extension that keeps the first row of each group as defined by the `ORDER BY`. Ordering by `customer_id, ordered_at DESC` makes "first" mean "newest order per customer." It is more concise than a `row_number()` filter for this idiom. See [DISTINCT ON](https://www.postgresql.org/docs/current/sql-select.html#SQL-DISTINCT).'
      }
    ]
  },

  // ─── Level 9 ─────────────────────────────────────────────────────────────
  {
    id: 'postgresql-9',
    language: 'postgresql',
    level: 9,
    title: 'Indexes, EXPLAIN ANALYZE & Query Planning',
    timeEstimate: '6-8 hours',
    intro: `Performance is where database expertise shows. This phase covers PostgreSQL's index types — the default **B-tree** (equality and range), **GIN** (jsonb, arrays, full-text), **GiST** (geometric, ranges, nearest-neighbour), plus BRIN and Hash — and how to read the query planner with \`EXPLAIN\` and \`EXPLAIN ANALYZE\`. You'll learn why a sequential scan can beat an index scan on small tables, what partial and expression indexes are, and why \`ANALYZE\` (statistics) matters.

Locally: on a large table run \`EXPLAIN ANALYZE SELECT * FROM big WHERE email = 'x';\`, observe the *Seq Scan*, add \`CREATE INDEX ON big (email);\`, and re-run to watch it become an *Index Scan* with a far lower cost. For a \`jsonb\` or array column, reach for \`CREATE INDEX ... USING GIN\`.`,
    topics: [
      { label: 'Indexes (overview)', url: 'https://www.postgresql.org/docs/current/indexes.html', note: 'The full chapter: when and how indexes help.' },
      { label: 'Index Types', url: 'https://www.postgresql.org/docs/current/indexes-types.html', note: 'B-tree, Hash, GiST, SP-GiST, GIN, BRIN.' },
      { label: 'EXPLAIN', url: 'https://www.postgresql.org/docs/current/sql-explain.html', note: 'Reading the planner output and ANALYZE.' },
      { label: 'Using EXPLAIN', url: 'https://www.postgresql.org/docs/current/using-explain.html', note: 'How to interpret cost, rows, and node types.' },
      { label: 'Partial Indexes', url: 'https://www.postgresql.org/docs/current/indexes-partial.html', note: 'Index only the rows you query.' },
    ],
    deliverable: 'A before/after EXPLAIN ANALYZE showing a sequential scan replaced by an index scan.',
    checks: [
      {
        kind: 'code',
        id: 'postgresql-9-code-1',
        prompt: 'Demonstrate a query that an index would accelerate: create a `users` table, insert rows, and select the row where `email` matches, aliasing the name `name`. The header should include `name`.',
        boilerplate: `CREATE TABLE users (id INTEGER, email TEXT, name TEXT);
INSERT INTO users VALUES (1, 'a@x.com', 'Ann'), (2, 'b@x.com', 'Bob'), (3, 'c@x.com', 'Cy');
SELECT name FROM users WHERE email = 'b@x.com';`,
        expectedOutput: 'name',
        explanation: 'This equality lookup on `email` is exactly the access pattern a B-tree index optimises. In real Postgres `CREATE INDEX idx_users_email ON users(email);` lets the planner switch from a sequential scan to an index scan — visible in `EXPLAIN ANALYZE`. The browser engine runs the query the same way logically.'
      },
      {
        kind: 'mcq',
        id: 'postgresql-9-mcq-1',
        prompt: 'Which index type is the PostgreSQL *default*, and is best for equality and range comparisons (`=`, `<`, `>`, `BETWEEN`, `ORDER BY`)?',
        options: ['B-tree', 'GIN', 'GiST', 'BRIN'],
        correctIndex: 0,
        explanation: 'A plain `CREATE INDEX` builds a B-tree, which handles equality, range scans, and ordered retrieval. GIN suits multi-valued columns (jsonb, arrays, full-text), GiST suits geometric/range/nearest-neighbour data, and BRIN suits very large, naturally-ordered tables. See [Index Types](https://www.postgresql.org/docs/current/indexes-types.html).'
      },
      {
        kind: 'mcq',
        id: 'postgresql-9-mcq-2',
        prompt: 'You frequently query a `jsonb` column with the containment operator `@>`. Which index type should you create?',
        options: ['GIN', 'B-tree', 'Hash', 'BRIN'],
        correctIndex: 0,
        explanation: 'GIN (Generalized Inverted Index) is designed for columns containing multiple component values — `jsonb`, arrays, and `tsvector` full-text. It accelerates `@>`, `?`, and array membership. A B-tree cannot index inside a jsonb document. See [Index Types](https://www.postgresql.org/docs/current/indexes-types.html).'
      },
      {
        kind: 'mcq',
        id: 'postgresql-9-mcq-3',
        prompt: 'What is the difference between `EXPLAIN` and `EXPLAIN ANALYZE`?',
        options: [
          '`EXPLAIN` shows the planner\'s estimated plan without running the query; `EXPLAIN ANALYZE` actually executes it and reports real timings and row counts.',
          'They are identical aliases.',
          '`EXPLAIN ANALYZE` only works on SELECT, `EXPLAIN` on any statement.',
          '`EXPLAIN` runs the query; `EXPLAIN ANALYZE` only estimates.',
        ],
        correctIndex: 0,
        explanation: '`EXPLAIN` prints the chosen plan with *estimated* costs/rows. `EXPLAIN ANALYZE` truly runs the statement, so it reports *actual* time and rows — invaluable for spotting bad estimates. Because it executes, wrap data-modifying statements in a transaction you `ROLLBACK`. See [Using EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html).'
      },
      {
        kind: 'mcq',
        id: 'postgresql-9-mcq-4',
        prompt: 'Why might the PostgreSQL planner choose a *sequential scan* even when a usable index exists?',
        options: [
          'On a small table (or when a large fraction of rows match), a seq scan is cheaper than the random I/O of an index scan plus heap fetches.',
          'Indexes are never used for SELECT, only for joins.',
          'The planner only uses indexes after `VACUUM FULL`.',
          'A sequential scan is always faster than an index scan.',
        ],
        correctIndex: 0,
        explanation: 'The cost-based planner estimates that for small tables or low-selectivity predicates, reading the whole table sequentially beats jumping through an index and then fetching heap rows. Indexes pay off mainly for selective lookups on large tables. Keeping statistics current with `ANALYZE` helps the planner choose well. See [Using EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html).'
      }
    ]
  },

  // ─── Level 10 ────────────────────────────────────────────────────────────
  {
    id: 'postgresql-10',
    language: 'postgresql',
    level: 10,
    title: 'PL/pgSQL, Triggers, Extensions & MVCC Concurrency',
    timeEstimate: '6-8 hours',
    intro: `The capstone: server-side programming and concurrency. You'll write functions in **PL/pgSQL** (\`CREATE FUNCTION ... LANGUAGE plpgsql\` with \`DECLARE\`/\`BEGIN\`/\`RETURN\`), attach **triggers** that fire on \`INSERT\`/\`UPDATE\`/\`DELETE\`, load **extensions** (\`CREATE EXTENSION\` — e.g. \`pg_trgm\`, \`postgis\`, \`uuid-ossp\`), and understand **MVCC** (Multi-Version Concurrency Control): how Postgres gives each transaction a consistent snapshot so readers never block writers, the cost of dead tuples, and why \`VACUUM\`/autovacuum exist. You'll also meet isolation levels and \`SELECT ... FOR UPDATE\` row locking.

Locally: write a \`plpgsql\` function \`add(a int, b int) RETURNS int\`, a \`BEFORE INSERT\` trigger that stamps \`created_at\`, and \`CREATE EXTENSION pg_trgm;\` for fuzzy text search. Open two \`psql\` sessions to watch MVCC: an uncommitted \`UPDATE\` in one is invisible to the other until \`COMMIT\`.`,
    topics: [
      { label: 'PL/pgSQL', url: 'https://www.postgresql.org/docs/current/plpgsql.html', note: 'The procedural language: variables, control flow, functions.' },
      { label: 'CREATE FUNCTION', url: 'https://www.postgresql.org/docs/current/sql-createfunction.html', note: 'Defining functions in plpgsql, sql, and other languages.' },
      { label: 'Triggers', url: 'https://www.postgresql.org/docs/current/triggers.html', note: 'BEFORE/AFTER/INSTEAD OF, row vs statement triggers.' },
      { label: 'MVCC (Concurrency Control)', url: 'https://www.postgresql.org/docs/current/mvcc.html', note: 'Snapshots, isolation levels, and how readers avoid blocking writers.' },
      { label: 'CREATE EXTENSION', url: 'https://www.postgresql.org/docs/current/sql-createextension.html', note: 'Loading packaged add-ons like pg_trgm and PostGIS.' },
      { label: 'VACUUM', url: 'https://www.postgresql.org/docs/current/sql-vacuum.html', note: 'Reclaiming space from dead tuples produced by MVCC.' },
    ],
    deliverable: 'A PL/pgSQL function plus a BEFORE-INSERT trigger that auto-populates a column, with notes on MVCC.',
    checks: [
      {
        kind: 'code',
        id: 'postgresql-10-code-1',
        prompt: 'Show the *logic* a PL/pgSQL `add` function would implement, using a portable query: select the sum of two literals aliased `result`. The header should include `result`.',
        boilerplate: 'SELECT 2 + 3 AS result;',
        expectedOutput: 'result',
        explanation: 'In Postgres you would wrap this as `CREATE FUNCTION add(a int, b int) RETURNS int LANGUAGE plpgsql AS $$ BEGIN RETURN a + b; END; $$;` and call `SELECT add(2,3);`. The browser engine cannot define plpgsql functions, so we show the equivalent expression; the function syntax is drilled in the MCQs.'
      },
      {
        kind: 'mcq',
        id: 'postgresql-10-mcq-1',
        prompt: 'Which is a correct PL/pgSQL function definition?',
        options: [
          '`CREATE FUNCTION inc(n int) RETURNS int LANGUAGE plpgsql AS $$ BEGIN RETURN n + 1; END; $$;`',
          '`CREATE FUNCTION inc(n int) { return n + 1; }`',
          '`DEFINE FUNCTION inc(n) AS RETURN n + 1`',
          '`CREATE PROC inc @n int AS SELECT @n + 1`',
        ],
        correctIndex: 0,
        explanation: 'PL/pgSQL functions use `CREATE FUNCTION ... RETURNS ... LANGUAGE plpgsql AS $$ ... $$;` with a `BEGIN ... END;` block; `$$` is dollar-quoting that avoids escaping. The `CREATE PROC @n` form is T-SQL (SQL Server). See [PL/pgSQL](https://www.postgresql.org/docs/current/plpgsql.html).'
      },
      {
        kind: 'mcq',
        id: 'postgresql-10-mcq-2',
        prompt: 'A row-level `BEFORE INSERT` trigger function in PostgreSQL must return what, to let the (possibly modified) row proceed?',
        options: [
          '`RETURN NEW;` — the row to be inserted.',
          '`RETURN OLD;`',
          '`RETURN TRUE;`',
          '`RETURN NULL;` to always continue.',
        ],
        correctIndex: 0,
        explanation: 'A `BEFORE INSERT`/`UPDATE` row trigger returns `NEW` (the incoming row, which it may have modified, e.g. to stamp `created_at`). Returning `NULL` *cancels* the operation for that row. `OLD` is meaningful for `UPDATE`/`DELETE`. See [Trigger Procedures](https://www.postgresql.org/docs/current/plpgsql-trigger.html).'
      },
      {
        kind: 'mcq',
        id: 'postgresql-10-mcq-3',
        prompt: 'Under PostgreSQL\'s MVCC at READ COMMITTED isolation, what happens when transaction A reads a row that transaction B has updated but not yet committed?',
        options: [
          'A sees the old (committed) version of the row; B\'s uncommitted change is invisible until B commits.',
          'A blocks until B commits or rolls back.',
          'A sees B\'s uncommitted change immediately (dirty read).',
          'A raises a serialization error.',
        ],
        correctIndex: 0,
        explanation: 'MVCC keeps multiple row versions so each transaction sees a consistent snapshot. At the default READ COMMITTED level, A reads the last *committed* version and is not blocked by B\'s in-progress write — readers don\'t block writers and vice versa. Dirty reads never occur in Postgres. The trade-off is dead tuples that `VACUUM` must reclaim. See [MVCC](https://www.postgresql.org/docs/current/mvcc.html).'
      },
      {
        kind: 'mcq',
        id: 'postgresql-10-mcq-4',
        prompt: 'How do you enable the `pg_trgm` extension (for trigram-based fuzzy text matching) in a database?',
        options: [
          '`CREATE EXTENSION IF NOT EXISTS pg_trgm;`',
          '`INSTALL pg_trgm;`',
          '`IMPORT EXTENSION pg_trgm;`',
          '`LOAD MODULE pg_trgm;`',
        ],
        correctIndex: 0,
        explanation: '`CREATE EXTENSION [IF NOT EXISTS] name;` loads a packaged extension\'s objects into the current database. `pg_trgm` adds similarity operators and GIN/GiST trigram index support for fuzzy `LIKE`/`ILIKE` searches. Other popular extensions include `postgis`, `uuid-ossp`, and `hstore`. See [CREATE EXTENSION](https://www.postgresql.org/docs/current/sql-createextension.html).'
      }
    ]
  }
];
