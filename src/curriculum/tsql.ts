import type { Phase } from './types';

export const tsqlPhases: Phase[] = [
  // ─── Level 0 ─────────────────────────────────────────────────────────────
  {
    id: 'tsql-0',
    language: 'tsql',
    level: 0,
    title: 'Setup & Your First SELECT',
    timeEstimate: '0.5-1 hours',
    intro: `Welcome to **T-SQL** — Microsoft's dialect of SQL that powers SQL Server and Azure SQL. If you have never touched a database before, start right here; we assume nothing.

**What is a database, in plain terms?** A *relational database* stores information in **tables**. A table is just a grid, like a spreadsheet. Each **row** is one record (one customer, one order, one product). Each **column** is one piece of information that every row has (a name, a price, a date). Where a row and a column meet sits a single **value** (a *cell*) — e.g. the row for "Pen" might hold the value \`1.75\` in its \`price\` column. That is the entire mental model: tables made of rows, rows made of columns, columns holding values.

**What is SQL?** SQL (Structured Query Language) is the language you use to ask a database questions and to add/change data. A *query* is one such question. SQL is **declarative**: you describe **what** result you want, not **how** the computer should fetch it. You say "give me the products cheaper than 20, sorted by price" — the database engine figures out the *how* (which files to read, in what order) for you. This is the opposite of step-by-step languages like Python or C.

**Your first query, token by token.** The first check below runs this single line:

\`\`\`sql
SELECT 'Hello, T-SQL!' AS greeting;
\`\`\`

- \`SELECT\` — the keyword that means "return some data to me." It is the most common word in SQL. Its job here is to ask the database to evaluate whatever follows and hand back the answer as a result table. Remove it and there is no command at all — the database would reject the line.
- \`'Hello, T-SQL!'\` — a **string literal**: a fixed piece of text. The **single quotes** \`'...'\` tell SQL "this is text, not a column name or a keyword." (In T-SQL, single quotes are for text; double quotes mean something else.) The actual *value* that exists when the query runs is the 13-character text \`Hello, T-SQL!\`. Change the text inside the quotes and the output changes to match.
- \`AS greeting\` — \`AS\` gives the output column a **name** (an *alias*). Without it, the engine would invent an ugly auto-name for the column; with it, the result's column header reads \`greeting\`. \`AS\` is optional sugar — it doesn't change the value, only the label on top of it.
- \`;\` — the **semicolon** ends the statement. It marks where one command stops. With a single statement it is optional in most tools, but it is good habit and required when you run several statements in a row.

Notice there is **no table** in this query: a \`SELECT\` with no \`FROM\` clause just evaluates the expression and returns one row. You'll add real tables in Level 1.

**About this course.** Runnable checks here execute against a portable SQLite engine in your browser, so they use the standard \`CREATE TABLE\` / \`INSERT\` / \`SELECT\` subset every SQL dialect shares. The multiple-choice questions teach the genuinely *SQL-Server-flavored* syntax — \`DECLARE @v\`, \`PRINT\`, \`TOP\`, \`GO\` batches, \`ISNULL\`, \`TRY...CATCH\`, window functions, stored procedures — so you learn real T-SQL as you go. To follow along outside the browser, install a way to talk to a server (SQL Server Express + SQL Server Management Studio, the cross-platform Azure Data Studio, or the \`sqlcmd\` command-line tool).`,
    topics: [
      { label: 'Install SQL Server (Developer/Express)', url: 'https://learn.microsoft.com/en-us/sql/database-engine/install-windows/install-sql-server', note: 'Official install guide; Developer and Express editions are free.' },
      { label: 'Download Azure Data Studio', url: 'https://learn.microsoft.com/en-us/azure-data-studio/download-azure-data-studio', note: 'Cross-platform (Windows/macOS/Linux) query tool for SQL Server.' },
      { label: 'sqlcmd utility', url: 'https://learn.microsoft.com/en-us/sql/tools/sqlcmd/sqlcmd-utility', note: 'Run T-SQL from the command line.' },
      { label: 'T-SQL reference', url: 'https://learn.microsoft.com/en-us/sql/t-sql/language-reference', note: 'The canonical language reference you will live in.' },
    ],
    deliverable: 'Connect to a local SQL Server (or Azure Data Studio) and run SELECT 1 AS answer, then run the browser SELECT below.',
    checks: [
      {
        kind: 'code',
        id: 'tsql-0-code-1',
        prompt: 'Run this query. It selects a single literal value and gives it a column alias of `greeting`. The result table should contain the text `Hello, T-SQL!`.',
        boilerplate: "SELECT 'Hello, T-SQL!' AS greeting;",
        expectedOutput: 'Hello, T-SQL!',
        explanation: `Let's dissect every token of \`SELECT 'Hello, T-SQL!' AS greeting;\`, asking of each: what does it mean, why is it here, what breaks if you remove it, and what value exists at runtime?

\`\`\`
SELECT   'Hello, T-SQL!'   AS   greeting   ;
  │             │           │       │       │
  │             │           │       │       └─ ends the statement
  │             │           │       └───────── the output column's name
  │             │           └───────────────── "name the thing on my left"
  │             └───────────────────────────── the literal text value
  └─────────────────────────────────────────── "return data to me"
\`\`\`

- \`SELECT\` — **Meaning:** the verb "return data to me." **Job:** it tells the engine to evaluate what follows and hand back a result table. **Remove it:** there is no command at all; the database rejects the line. **At runtime:** it produces a one-row, one-column result.
- \`'Hello, T-SQL!'\` — **Meaning:** a **string literal**, a fixed piece of text. **Job:** it is the actual data you are asking for. The **single quotes** \`'...'\` say "this is text, not a column name or keyword." **Remove the quotes** and SQL reads \`Hello\` as a column name and errors (no such column). **At runtime:** the value in memory is the 13-character text \`Hello, T-SQL!\`.
- \`AS greeting\` — **Meaning:** \`AS\` assigns an **alias** (a name). **Job:** it labels the output column \`greeting\`. **Remove it** and the column still appears, just with an auto-generated header. **At runtime:** it changes only the label on the column, never the value beneath it.
- \`;\` — **Meaning:** the **semicolon**, an end-of-statement marker. **Job:** it says "this command is finished." **Remove it:** harmless for a single statement, but required to separate multiple statements. **At runtime:** purely punctuation; it holds no value.

There is no \`FROM\` clause, so the \`SELECT\` just evaluates the expression and returns one row. Try editing the text inside the quotes and re-running — the result follows whatever you type. In SSMS this appears in the Results grid; here it renders as a text table.`,
      },
      {
        kind: 'mcq',
        id: 'tsql-0-mcq-1',
        prompt: 'In SQL Server Management Studio, what does the `GO` keyword do when you type it on its own line?',
        options: [
          'It is a T-SQL statement that commits the current transaction.',
          'It is a batch separator recognised by client tools (SSMS, sqlcmd) — not a T-SQL statement itself.',
          'It executes the query and then disconnects from the server.',
          'It is a comment marker, like `--`.',
        ],
        correctIndex: 1,
        explanation: '`GO` is **not** a T-SQL statement — it is a command recognised by the client tools (SSMS, Azure Data Studio, `sqlcmd`) that signals "send everything above me to the server as one batch." The server never sees `GO`. See [Microsoft Docs — SQL Server Utilities Statements (GO)](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/sql-server-utilities-statements-go).',
      },
      {
        kind: 'mcq',
        id: 'tsql-0-mcq-2',
        prompt: 'Which T-SQL statement prints a message to the *Messages* pane rather than returning a result set?',
        options: [
          '`PRINT \'Hello\';`',
          '`SELECT \'Hello\';`',
          '`ECHO \'Hello\';`',
          '`CONSOLE.LOG \'Hello\';`',
        ],
        correctIndex: 0,
        explanation: '`PRINT` sends a character message to the client Messages tab; it returns no rows. `SELECT` returns a result set to the grid. There is no `ECHO`/`CONSOLE.LOG` in T-SQL. See [Microsoft Docs — PRINT](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/print-transact-sql).',
      },
    ],
  },

  // ─── Level 1 ─────────────────────────────────────────────────────────────
  {
    id: 'tsql-1',
    language: 'tsql',
    level: 1,
    title: 'T-SQL Basics — SELECT, WHERE, ORDER BY & Data Types',
    timeEstimate: '4-6 hours',
    intro: `**Start with the vocabulary.** A **table** is a grid of data — think of one spreadsheet tab, like \`Products\`. Each **row** is one thing the table is about (one product); each **column** is one attribute every row shares (its \`name\`, its \`price\`). Where a row meets a column is a single **value** (a cell). A **query** is a question you ask of a table; the answer comes back as its own little table of rows and columns. That is the whole game: store data in tables, then run queries to pull pieces back out.

**Every column has a data type** — a promise about what kind of value it holds. A type stops you from, say, storing the word "blue" where a price should be. The workhorses you'll meet are \`INT\` (whole numbers like \`42\`), \`DECIMAL(p,s)\` (exact decimals like \`19.99\` — \`p\` total digits, \`s\` after the point), \`VARCHAR(n)\` and \`NVARCHAR(n)\` (text up to \`n\` characters; \`NVARCHAR\` stores any-language Unicode), \`BIT\` (a 0/1 flag standing in for true/false), and the \`DATE\`/\`DATETIME2\` family (calendar dates and timestamps). Picking the right type keeps data correct and queries fast.

**The shape of a query.** Almost every read you write has three parts, in this order: \`SELECT\` *which columns you want*, \`FROM\` *which table*, and an optional \`WHERE\` *which rows to keep*. For example \`SELECT name, price FROM Products WHERE price < 20;\` means "show me the name and price columns, from the Products table, but only rows whose price is under 20." \`SELECT\` chooses columns (left-to-right slices), \`WHERE\` chooses rows (top-to-bottom filter), and you can bolt on \`ORDER BY\` to sort the result or \`SELECT TOP (n)\` to cap how many rows come back.

**By the end of this phase** you'll comfortably read rows out of a table: projecting columns, filtering with \`WHERE\`, sorting with \`ORDER BY\`, and limiting rows with SQL Server's \`SELECT TOP (n)\` (note T-SQL puts \`TOP\` at the *front*, not a trailing \`LIMIT\`). To practise locally, create a \`Products\` table in your own database, insert a dozen rows, and write queries that answer real questions: "the five most expensive products" (\`SELECT TOP (5) ... ORDER BY price DESC\`), "everything cheaper than 20," and "names sorted Z→A."`,
    topics: [
      { label: 'SELECT (Transact-SQL)', url: 'https://learn.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql', note: 'The full anatomy of a SELECT statement.' },
      { label: 'WHERE clause', url: 'https://learn.microsoft.com/en-us/sql/t-sql/queries/where-transact-sql', note: 'Row filtering predicates.' },
      { label: 'ORDER BY clause', url: 'https://learn.microsoft.com/en-us/sql/t-sql/queries/select-order-by-clause-transact-sql', note: 'Sorting and how TOP/OFFSET interact.' },
      { label: 'TOP (Transact-SQL)', url: 'https://learn.microsoft.com/en-us/sql/t-sql/queries/top-transact-sql', note: 'SQL Server way to limit rows.' },
      { label: 'Data types (Transact-SQL)', url: 'https://learn.microsoft.com/en-us/sql/t-sql/data-types/data-types-transact-sql', note: 'Numeric, string, date/time, and more.' },
      { label: 'nchar and nvarchar', url: 'https://learn.microsoft.com/en-us/sql/t-sql/data-types/nchar-and-nvarchar-transact-sql', note: 'Unicode string types vs varchar.' },
    ],
    video: {
      title: 'SQL Server Tutorial for Beginners',
      youtubeId: 'qbZ_5LubP-A',
      channelName: 'freeCodeCamp.org',
      duration: '4 hours',
    },
    deliverable: 'Create a Products table, insert ~12 rows, and write 5 queries: top-N by price, WHERE filters on price and category, and Z→A name sort.',
    checks: [
      {
        kind: 'code',
        id: 'tsql-1-code-1',
        prompt: 'Create a `Products` table, insert four rows, and select the `name` and `price` of every product **cheaper than 20**, sorted by `price` ascending. The result should include the row with name `Pen`.',
        boilerplate: `CREATE TABLE Products (
  id    INTEGER,
  name  TEXT,
  price REAL
);
INSERT INTO Products (id, name, price) VALUES
  (1, 'Notebook', 12.50),
  (2, 'Monitor',  199.00),
  (3, 'Pen',      1.75),
  (4, 'Keyboard', 45.00);

SELECT name, price
FROM Products
WHERE price < 20
ORDER BY price ASC;`,
        expectedOutput: 'Pen',
        explanation: '`WHERE price < 20` filters rows before they reach the result; `ORDER BY price ASC` sorts the survivors. Only `Notebook` (12.50) and `Pen` (1.75) qualify, so `Pen` appears in the table. This portable SQL runs identically on SQL Server and SQLite.',
      },
      {
        kind: 'code',
        id: 'tsql-1-code-2',
        prompt: 'Return the **two most expensive** products. In real T-SQL you would write `SELECT TOP (2) ...`; the portable form below uses `LIMIT 2` so it runs in the browser. Sort by price descending; the top row should be `Monitor`.',
        boilerplate: `CREATE TABLE Products (
  id    INTEGER,
  name  TEXT,
  price REAL
);
INSERT INTO Products (id, name, price) VALUES
  (1, 'Notebook', 12.50),
  (2, 'Monitor',  199.00),
  (3, 'Pen',      1.75),
  (4, 'Keyboard', 45.00);

SELECT name, price
FROM Products
ORDER BY price DESC
LIMIT 2;`,
        expectedOutput: 'Monitor',
        explanation: 'In SQL Server you would write `SELECT TOP (2) name, price FROM Products ORDER BY price DESC;` — `TOP` goes at the front. SQLite uses the ANSI-ish `LIMIT` at the end. Both return `Monitor` (199) and `Keyboard` (45).',
      },
      {
        kind: 'mcq',
        id: 'tsql-1-mcq-1',
        prompt: 'Which T-SQL query returns the 3 highest-priced products?',
        options: [
          '`SELECT name FROM Products ORDER BY price DESC LIMIT 3;`',
          '`SELECT TOP (3) name FROM Products ORDER BY price DESC;`',
          '`SELECT FIRST 3 name FROM Products ORDER BY price DESC;`',
          '`SELECT name FROM Products WHERE ROWNUM <= 3 ORDER BY price DESC;`',
        ],
        correctIndex: 1,
        explanation: 'SQL Server uses `TOP (n)` placed immediately after `SELECT`. `LIMIT` is MySQL/SQLite/PostgreSQL syntax; `ROWNUM` is Oracle. Always pair `TOP` with `ORDER BY`, otherwise *which* rows you get is undefined. See [Microsoft Docs — TOP](https://learn.microsoft.com/en-us/sql/t-sql/queries/top-transact-sql).',
      },
      {
        kind: 'mcq',
        id: 'tsql-1-mcq-2',
        prompt: 'What is the key difference between `VARCHAR(50)` and `NVARCHAR(50)` in SQL Server?',
        options: [
          '`NVARCHAR` can store 50 characters; `VARCHAR` can store only 25.',
          '`NVARCHAR` stores Unicode (UTF-16) and uses ~2 bytes/char; `VARCHAR` stores non-Unicode characters per the column collation.',
          'They are exact synonyms; the `N` is purely decorative.',
          '`VARCHAR` is always faster and should be preferred for all text.',
        ],
        correctIndex: 1,
        explanation: '`NVARCHAR` holds Unicode and reliably stores any language/emoji, at roughly 2 bytes per character; `VARCHAR` is bound by the column collation and may not represent characters outside that code page. This is why N-prefixed literals like `N\'café\'` matter. See [Microsoft Docs — nchar and nvarchar](https://learn.microsoft.com/en-us/sql/t-sql/data-types/nchar-and-nvarchar-transact-sql).',
      },
      {
        kind: 'mcq',
        id: 'tsql-1-mcq-3',
        prompt: 'Which data type is the correct choice for a column storing monetary amounts like `19.99` where exactness is required?',
        options: [
          '`FLOAT` — it has the most range.',
          '`DECIMAL(10, 2)` (a.k.a. `NUMERIC`) — fixed precision and scale, no binary rounding error.',
          '`REAL` — it is the SQL Server default for money.',
          '`INT` — multiply everything by 100 and never use decimals.',
        ],
        correctIndex: 1,
        explanation: '`FLOAT`/`REAL` are approximate binary floating-point types and introduce rounding error — never use them for money. `DECIMAL(p, s)` stores exact fixed-point values (here 10 total digits, 2 after the point). SQL Server also has a dedicated `MONEY` type, but `DECIMAL` is the portable, predictable choice. See [Microsoft Docs — decimal and numeric](https://learn.microsoft.com/en-us/sql/t-sql/data-types/decimal-and-numeric-transact-sql).',
      },
    ],
  },

  // ─── Level 2 ─────────────────────────────────────────────────────────────
  {
    id: 'tsql-2',
    language: 'tsql',
    level: 2,
    title: 'Filtering, Operators & NULL Handling',
    timeEstimate: '4-6 hours',
    intro: `This phase is about expressing *exactly* the rows you want. You'll combine predicates with \`AND\`/\`OR\`/\`NOT\`, match ranges with \`BETWEEN\`, sets with \`IN\`, and patterns with \`LIKE\` (and its wildcards \`%\` and \`_\`). Crucially, you'll master **three-valued logic**: in SQL, comparing anything to \`NULL\` yields *unknown*, not true or false — so \`WHERE x = NULL\` never matches. You filter NULLs with \`IS NULL\` / \`IS NOT NULL\`, and you substitute defaults with T-SQL's \`ISNULL(x, fallback)\` or the ANSI \`COALESCE(a, b, c)\`.

Locally, build a \`Customers\` table where some rows have a \`NULL\` email, then prove to yourself that \`= NULL\`, \`IS NULL\`, \`ISNULL\`, and \`COALESCE\` behave differently. Try \`SELECT COALESCE(email, 'no-email') FROM Customers\` and watch the placeholders fill in.`,
    topics: [
      { label: 'Comparison operators', url: 'https://learn.microsoft.com/en-us/sql/t-sql/language-elements/comparison-operators-transact-sql', note: '=, <>, >, <, and friends.' },
      { label: 'LIKE (Transact-SQL)', url: 'https://learn.microsoft.com/en-us/sql/t-sql/language-elements/like-transact-sql', note: 'Wildcard pattern matching: % and _.' },
      { label: 'NULL and UNKNOWN', url: 'https://learn.microsoft.com/en-us/sql/t-sql/language-elements/null-and-unknown-transact-sql', note: 'Three-valued logic explained.' },
      { label: 'ISNULL (Transact-SQL)', url: 'https://learn.microsoft.com/en-us/sql/t-sql/functions/isnull-transact-sql', note: 'SQL Server two-arg null substitution.' },
      { label: 'COALESCE (Transact-SQL)', url: 'https://learn.microsoft.com/en-us/sql/t-sql/language-elements/coalesce-transact-sql', note: 'ANSI multi-arg first-non-null.' },
      { label: 'IN (Transact-SQL)', url: 'https://learn.microsoft.com/en-us/sql/t-sql/language-elements/in-transact-sql', note: 'Set membership predicate.' },
    ],
    deliverable: 'Build a Customers table with some NULL emails; write queries demonstrating IS NULL, COALESCE, LIKE, IN, and BETWEEN.',
    checks: [
      {
        kind: 'code',
        id: 'tsql-2-code-1',
        prompt: 'Create a `Customers` table where one customer has a missing email (`NULL`). Select the `name` and a `contact` column that substitutes the text `no-email` wherever email is NULL. Use `COALESCE`. The result for the customer named `Bob` should show `no-email`.',
        boilerplate: `CREATE TABLE Customers (
  id    INTEGER,
  name  TEXT,
  email TEXT
);
INSERT INTO Customers (id, name, email) VALUES
  (1, 'Alice', 'alice@example.com'),
  (2, 'Bob',   NULL),
  (3, 'Carol', 'carol@example.com');

SELECT name, COALESCE(email, 'no-email') AS contact
FROM Customers
ORDER BY name;`,
        expectedOutput: 'no-email',
        explanation: '`COALESCE(email, \'no-email\')` returns the first non-NULL argument, so Bob\'s NULL email becomes the literal `no-email`. In T-SQL the two-argument `ISNULL(email, \'no-email\')` does the same; `COALESCE` is ANSI-standard and accepts more than two arguments.',
      },
      {
        kind: 'code',
        id: 'tsql-2-code-2',
        prompt: 'Return everyone whose email is hosted at `example.com` using a `LIKE` pattern, **and** anyone whose email is NULL (use `IS NULL`). The result should contain `Bob` (NULL email) and `Alice`.',
        boilerplate: `CREATE TABLE Customers (
  id    INTEGER,
  name  TEXT,
  email TEXT
);
INSERT INTO Customers (id, name, email) VALUES
  (1, 'Alice', 'alice@example.com'),
  (2, 'Bob',   NULL),
  (3, 'Carol', 'carol@other.org');

SELECT name, email
FROM Customers
WHERE email LIKE '%@example.com' OR email IS NULL
ORDER BY name;`,
        expectedOutput: 'Bob',
        explanation: '`LIKE \'%@example.com\'` matches any string ending in that domain (`%` = any run of characters). Because `email = NULL` is *unknown*, NULL rows would never be caught by a `=` or `LIKE` test — you must add `OR email IS NULL` explicitly. The result includes Alice and Bob.',
      },
      {
        kind: 'mcq',
        id: 'tsql-2-mcq-1',
        prompt: `How many rows does this query return, given a 5-row table where exactly 2 rows have \`status = NULL\`?

\`\`\`sql
SELECT COUNT(*) FROM Orders WHERE status = NULL;
\`\`\``,
        options: [
          '2 — it finds the rows whose status is NULL.',
          '0 — `= NULL` is never true; comparing to NULL yields UNKNOWN, which WHERE treats as not-matched.',
          '5 — NULL equals everything.',
          'It raises an error: "cannot compare to NULL".',
        ],
        correctIndex: 1,
        explanation: 'In SQL\'s three-valued logic, `anything = NULL` evaluates to UNKNOWN, and `WHERE` only keeps rows where the predicate is TRUE. So the query returns 0. To find NULLs you must use `WHERE status IS NULL`. (SQL Server\'s `SET ANSI_NULLS OFF` could change this, but it is deprecated.) See [Microsoft Docs — NULL and UNKNOWN](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/null-and-unknown-transact-sql).',
      },
      {
        kind: 'mcq',
        id: 'tsql-2-mcq-2',
        prompt: 'What is a true difference between `ISNULL` and `COALESCE` in T-SQL?',
        options: [
          'They are identical in every respect.',
          '`COALESCE` accepts two or more arguments and is ANSI-standard; `ISNULL` takes exactly two and is SQL-Server-specific, and the two can differ in the result data type they produce.',
          '`ISNULL` works only on integer columns.',
          '`COALESCE` cannot be used inside a `SELECT` list.',
        ],
        correctIndex: 1,
        explanation: '`ISNULL(a, b)` is a SQL Server function taking exactly two arguments; `COALESCE(a, b, c, ...)` is ANSI SQL and accepts many. They also resolve their result type differently — `ISNULL` uses the type of the first argument, while `COALESCE` uses data-type precedence across all arguments, which can surprise you with truncation. See [Microsoft Docs — ISNULL](https://learn.microsoft.com/en-us/sql/t-sql/functions/isnull-transact-sql).',
      },
      {
        kind: 'mcq',
        id: 'tsql-2-mcq-3',
        prompt: 'Which `LIKE` pattern matches a four-character product code that starts with `A` and ends with `9` (e.g. `AB39`, `AZ09`)?',
        options: [
          "`LIKE 'A__9'`",
          "`LIKE 'A%9'`",
          "`LIKE 'A**9'`",
          "`LIKE 'A?9'`",
        ],
        correctIndex: 0,
        explanation: 'The `_` wildcard matches *exactly one* character, so `A__9` is A + two arbitrary chars + 9 = four characters total. `%` matches any number of characters (so `A%9` would also match `A9` plus longer strings). `*` and `?` are not SQL `LIKE` wildcards. See [Microsoft Docs — LIKE](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/like-transact-sql).',
      },
    ],
  },

  // ─── Level 3 ─────────────────────────────────────────────────────────────
  {
    id: 'tsql-3',
    language: 'tsql',
    level: 3,
    title: 'Joining Tables — INNER, OUTER & CROSS JOINs',
    timeEstimate: '5-7 hours',
    intro: `Real schemas spread data across many tables, and \`JOIN\` is how you stitch them back together. You'll write \`INNER JOIN\` (only matching rows), \`LEFT/RIGHT OUTER JOIN\` (keep all rows from one side, NULL-fill the other), \`FULL OUTER JOIN\`, and \`CROSS JOIN\` (the Cartesian product). You'll learn to alias tables (\`FROM Orders o JOIN Customers c ON o.customer_id = c.id\`), why an unmatched \`LEFT JOIN\` row produces NULLs, and the classic "find rows with no match" anti-join trick (\`LEFT JOIN ... WHERE right.key IS NULL\`).

Locally, model \`Customers\` and \`Orders\` with a foreign key, deliberately leave one customer with no orders, and prove how each join type treats those edge rows. This is the single most important SQL skill — invest the time.`,
    topics: [
      { label: 'FROM and JOIN', url: 'https://learn.microsoft.com/en-us/sql/t-sql/queries/from-transact-sql', note: 'Join syntax and types in the FROM clause.' },
      { label: 'Joins (relational concepts)', url: 'https://learn.microsoft.com/en-us/sql/relational-databases/performance/joins', note: 'How the engine implements joins.' },
      { label: 'Inner joins', url: 'https://learn.microsoft.com/en-us/sql/relational-databases/performance/inner-join', note: 'Matching rows from both tables.' },
      { label: 'Outer joins', url: 'https://learn.microsoft.com/en-us/sql/relational-databases/performance/outer-join', note: 'LEFT/RIGHT/FULL and NULL-filling.' },
      { label: 'Cross joins', url: 'https://learn.microsoft.com/en-us/sql/relational-databases/performance/cross-join', note: 'Cartesian product of two tables.' },
    ],
    deliverable: 'Model Customers and Orders with a foreign key; write INNER, LEFT, and anti-join queries plus a CROSS JOIN demo.',
    checks: [
      {
        kind: 'code',
        id: 'tsql-3-code-1',
        prompt: 'Create `Customers` and `Orders`. With an `INNER JOIN`, list each order\'s `id` alongside the customer `name` who placed it. Customer `Alice` placed order 100, so `Alice` should appear in the result.',
        boilerplate: `CREATE TABLE Customers (
  id   INTEGER,
  name TEXT
);
CREATE TABLE Orders (
  id          INTEGER,
  customer_id INTEGER,
  total       REAL
);
INSERT INTO Customers (id, name) VALUES (1, 'Alice'), (2, 'Bob');
INSERT INTO Orders (id, customer_id, total) VALUES
  (100, 1, 49.90),
  (101, 1, 12.00),
  (102, 2, 5.50);

SELECT o.id AS order_id, c.name AS customer
FROM Orders o
INNER JOIN Customers c ON o.customer_id = c.id
ORDER BY o.id;`,
        expectedOutput: 'Alice',
        explanation: 'The `ON o.customer_id = c.id` predicate pairs each order with its customer. Table aliases (`o`, `c`) keep the query readable. An `INNER JOIN` keeps only rows that match on both sides.',
      },
      {
        kind: 'code',
        id: 'tsql-3-code-2',
        prompt: 'Find customers who have placed **no orders** using a `LEFT JOIN` anti-join: keep all customers, then keep only the rows where the joined order is `NULL`. Customer `Carol` has no orders, so `Carol` should be the result.',
        boilerplate: `CREATE TABLE Customers (
  id   INTEGER,
  name TEXT
);
CREATE TABLE Orders (
  id          INTEGER,
  customer_id INTEGER
);
INSERT INTO Customers (id, name) VALUES (1, 'Alice'), (2, 'Bob'), (3, 'Carol');
INSERT INTO Orders (id, customer_id) VALUES (100, 1), (101, 2);

SELECT c.name AS customer
FROM Customers c
LEFT JOIN Orders o ON o.customer_id = c.id
WHERE o.id IS NULL
ORDER BY c.name;`,
        expectedOutput: 'Carol',
        explanation: 'A `LEFT JOIN` keeps every customer; customers with no matching order get NULLs on the `Orders` side. Filtering `WHERE o.id IS NULL` keeps exactly the unmatched customers — the classic anti-join pattern. Only Carol qualifies.',
      },
      {
        kind: 'mcq',
        id: 'tsql-3-mcq-1',
        prompt: 'A `LEFT JOIN` between `Customers` (3 rows) and `Orders` returns 5 rows, but one customer placed no orders. What appears in the `Orders` columns for that customer\'s row?',
        options: [
          'The row is dropped entirely.',
          'The `Orders` columns are filled with `NULL`.',
          'The `Orders` columns repeat the previous customer\'s values.',
          'The query errors because of the unmatched row.',
        ],
        correctIndex: 1,
        explanation: 'A `LEFT [OUTER] JOIN` preserves every row of the left table. When the right side has no match, its columns are NULL-filled. That is precisely why the anti-join (`WHERE rightTable.key IS NULL`) finds rows with no match. See [Microsoft Docs — Outer Joins](https://learn.microsoft.com/en-us/sql/relational-databases/performance/outer-join).',
      },
      {
        kind: 'mcq',
        id: 'tsql-3-mcq-2',
        prompt: 'If `Colors` has 3 rows and `Sizes` has 4 rows, how many rows does `SELECT * FROM Colors CROSS JOIN Sizes;` return?',
        options: [
          '7 (3 + 4)',
          '4 (the larger of the two)',
          '12 (3 × 4 — the Cartesian product)',
          '0 (there is no ON clause, so nothing matches)',
        ],
        correctIndex: 2,
        explanation: 'A `CROSS JOIN` pairs every left row with every right row — the Cartesian product — so the count is 3 × 4 = 12. It takes no `ON` clause. It is useful for generating combinations (e.g. every color/size variant of a product). See [Microsoft Docs — CROSS JOIN](https://learn.microsoft.com/en-us/sql/relational-databases/performance/cross-join).',
      },
      {
        kind: 'mcq',
        id: 'tsql-3-mcq-3',
        prompt: `What goes wrong with this query that intends to find orders over $100 for each customer, keeping customers with no orders?

\`\`\`sql
SELECT c.name, o.total
FROM Customers c
LEFT JOIN Orders o ON o.customer_id = c.id
WHERE o.total > 100;
\`\`\``,
        options: [
          'Nothing — it works as intended.',
          'The `WHERE o.total > 100` filter discards the NULL-filled rows, effectively turning the LEFT JOIN back into an INNER JOIN (customers with no orders disappear).',
          'You cannot filter on a column from the right table of a LEFT JOIN.',
          'It returns every customer regardless of order total.',
        ],
        correctIndex: 1,
        explanation: 'For customers with no orders, `o.total` is NULL, and `NULL > 100` is UNKNOWN, so those rows are dropped by `WHERE` — silently demoting the LEFT JOIN to an INNER JOIN. If you genuinely want to keep no-order customers, move the condition into the join (`ON o.customer_id = c.id AND o.total > 100`). This is one of the most common SQL bugs. See [Microsoft Docs — Outer Joins](https://learn.microsoft.com/en-us/sql/relational-databases/performance/outer-join).',
      },
    ],
  },

  // ─── Level 4 ─────────────────────────────────────────────────────────────
  {
    id: 'tsql-4',
    language: 'tsql',
    level: 4,
    title: 'Aggregation — GROUP BY, HAVING & Aggregate Functions',
    timeEstimate: '4-6 hours',
    intro: `Aggregation collapses many rows into summary values. You'll use \`COUNT\`, \`SUM\`, \`AVG\`, \`MIN\`, and \`MAX\`, then split rows into buckets with \`GROUP BY\` and filter those buckets with \`HAVING\` (the post-aggregation cousin of \`WHERE\`). You'll learn the cardinal rule: every column in the \`SELECT\` list must either be inside an aggregate or be in the \`GROUP BY\`. You'll also see how \`COUNT(*)\` counts rows while \`COUNT(col)\` ignores NULLs, and how \`COUNT(DISTINCT col)\` counts unique non-NULL values.

Locally, take your \`Orders\` table and answer: revenue per customer, average order value, customers with more than 2 orders. Internalise the logical order: \`FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY\` — it explains why you can't use a \`SELECT\` alias in \`WHERE\` but can in \`ORDER BY\`.`,
    topics: [
      { label: 'GROUP BY clause', url: 'https://learn.microsoft.com/en-us/sql/t-sql/queries/select-group-by-transact-sql', note: 'Bucketing rows for aggregation.' },
      { label: 'HAVING clause', url: 'https://learn.microsoft.com/en-us/sql/t-sql/queries/select-having-transact-sql', note: 'Filtering aggregated groups.' },
      { label: 'Aggregate functions', url: 'https://learn.microsoft.com/en-us/sql/t-sql/functions/aggregate-functions-transact-sql', note: 'COUNT, SUM, AVG, MIN, MAX and more.' },
      { label: 'COUNT (Transact-SQL)', url: 'https://learn.microsoft.com/en-us/sql/t-sql/functions/count-transact-sql', note: 'COUNT(*) vs COUNT(col) vs COUNT(DISTINCT).' },
      { label: 'SELECT logical processing order', url: 'https://learn.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql', note: 'Why WHERE runs before SELECT aliases.' },
    ],
    deliverable: 'On your Orders table, compute revenue per customer, average order value, and list customers with > 2 orders using HAVING.',
    checks: [
      {
        kind: 'code',
        id: 'tsql-4-code-1',
        prompt: 'Create an `Orders` table and compute **total revenue per customer**: group by `customer_id` and `SUM(total)` as `revenue`, sorted by revenue descending. Customer 1\'s revenue is 61.90, so `61.9` should appear in the result table.',
        boilerplate: `CREATE TABLE Orders (
  id          INTEGER,
  customer_id INTEGER,
  total       REAL
);
INSERT INTO Orders (id, customer_id, total) VALUES
  (100, 1, 49.90),
  (101, 1, 12.00),
  (102, 2, 5.50),
  (103, 2, 5.50);

SELECT customer_id, SUM(total) AS revenue
FROM Orders
GROUP BY customer_id
ORDER BY revenue DESC;`,
        expectedOutput: '61.9',
        explanation: '`GROUP BY customer_id` creates one bucket per customer; `SUM(total)` adds the order totals within each bucket. Customer 1: 49.90 + 12.00 = 61.90. Every non-aggregated column in the SELECT (`customer_id`) must appear in `GROUP BY`.',
      },
      {
        kind: 'code',
        id: 'tsql-4-code-2',
        prompt: 'List only customers who placed **more than one order**, with their order count. Use `GROUP BY` plus `HAVING COUNT(*) > 1`. Two sample customers have 2 orders, so the column header `order_count` appears in the result.',
        boilerplate: `CREATE TABLE Orders (
  id          INTEGER,
  customer_id INTEGER
);
INSERT INTO Orders (id, customer_id) VALUES
  (100, 1), (101, 1), (102, 2), (103, 2), (104, 3);

SELECT customer_id, COUNT(*) AS order_count
FROM Orders
GROUP BY customer_id
HAVING COUNT(*) > 1
ORDER BY customer_id;`,
        expectedOutput: 'order_count',
        explanation: '`HAVING` filters *after* grouping, so it can reference aggregates like `COUNT(*)`. `WHERE` could not, because it runs before grouping. Customers 1 and 2 (2 orders each) pass; customer 3 (1 order) is excluded.',
      },
      {
        kind: 'mcq',
        id: 'tsql-4-mcq-1',
        prompt: 'What is the difference between `COUNT(*)` and `COUNT(email)` on a table of 10 rows where 3 emails are NULL?',
        options: [
          'Both return 10.',
          '`COUNT(*)` returns 10 (all rows); `COUNT(email)` returns 7 (non-NULL emails only).',
          '`COUNT(*)` returns 7; `COUNT(email)` returns 10.',
          'Both return 7.',
        ],
        correctIndex: 1,
        explanation: '`COUNT(*)` counts rows regardless of content, so 10. `COUNT(email)` counts only rows where `email` is not NULL, so 7. `COUNT(DISTINCT email)` would further deduplicate. This NULL-skipping behaviour is shared by `SUM`/`AVG` too. See [Microsoft Docs — COUNT](https://learn.microsoft.com/en-us/sql/t-sql/functions/count-transact-sql).',
      },
      {
        kind: 'mcq',
        id: 'tsql-4-mcq-2',
        prompt: `Why does this query fail in SQL Server?

\`\`\`sql
SELECT customer_id, total
FROM Orders
GROUP BY customer_id;
\`\`\``,
        options: [
          '`GROUP BY` is not allowed without `HAVING`.',
          '`total` is neither aggregated nor in the GROUP BY, so the engine cannot decide which `total` to show per group.',
          'You must always `ORDER BY` after `GROUP BY`.',
          'It does not fail; it returns one arbitrary `total` per customer.',
        ],
        correctIndex: 1,
        explanation: 'Unlike MySQL\'s lax default, SQL Server (and ANSI SQL) require every non-aggregated SELECT column to appear in the `GROUP BY`. Otherwise `total` is ambiguous within a group. Fix it with `SUM(total)`/`MAX(total)` or by adding `total` to the `GROUP BY`. See [Microsoft Docs — GROUP BY](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-group-by-transact-sql).',
      },
      {
        kind: 'mcq',
        id: 'tsql-4-mcq-3',
        prompt: 'Given the logical processing order of a SELECT, which clause can reference a column **alias** defined in the SELECT list?',
        options: [
          '`WHERE`',
          '`GROUP BY`',
          '`HAVING`',
          '`ORDER BY`',
        ],
        correctIndex: 3,
        explanation: 'Logical order is roughly `FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY`. Aliases are created in the `SELECT` step, so only `ORDER BY` (which runs afterwards) can use them. `WHERE`, `GROUP BY`, and `HAVING` run before aliases exist and must repeat the underlying expression. See [Microsoft Docs — SELECT](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql).',
      },
    ],
  },

  // ─── Level 5 ─────────────────────────────────────────────────────────────
  {
    id: 'tsql-5',
    language: 'tsql',
    level: 5,
    title: 'Subqueries & Common Table Expressions (WITH)',
    timeEstimate: '5-7 hours',
    intro: `Subqueries let one query feed another. You'll write scalar subqueries (return one value), \`IN\`/\`EXISTS\` subqueries (test membership/existence), and **correlated** subqueries that reference the outer row. Then you'll meet the readability superpower: the Common Table Expression, \`WITH cte AS (SELECT ...) SELECT ... FROM cte\`, which names a query so you can compose pipelines top-to-bottom instead of nesting parentheses. CTEs are also the gateway to *recursive* queries for hierarchies (org charts, bill-of-materials), via \`WITH ... AS (anchor UNION ALL recursive-member)\`.

Locally, rewrite a deeply nested subquery as a chain of CTEs and feel the difference. Then write an \`EXISTS\` query ("customers who have at least one order over 100") and confirm it short-circuits — \`EXISTS\` stops at the first matching row.`,
    topics: [
      { label: 'Subqueries', url: 'https://learn.microsoft.com/en-us/sql/relational-databases/performance/subqueries', note: 'Scalar, IN, and correlated subqueries.' },
      { label: 'WITH common_table_expression', url: 'https://learn.microsoft.com/en-us/sql/t-sql/queries/with-common-table-expression-transact-sql', note: 'Define CTEs and recursive CTEs.' },
      { label: 'EXISTS (Transact-SQL)', url: 'https://learn.microsoft.com/en-us/sql/t-sql/language-elements/exists-transact-sql', note: 'Existence test, often faster than IN.' },
      { label: 'IN (Transact-SQL)', url: 'https://learn.microsoft.com/en-us/sql/t-sql/language-elements/in-transact-sql', note: 'Set membership with a subquery.' },
      { label: 'Aggregate functions', url: 'https://learn.microsoft.com/en-us/sql/t-sql/functions/aggregate-functions-transact-sql', note: 'AVG/SUM used inside scalar subqueries.' },
    ],
    deliverable: 'Rewrite a nested subquery as a CTE chain; write an EXISTS query and a simple recursive CTE that counts 1..5.',
    checks: [
      {
        kind: 'code',
        id: 'tsql-5-code-1',
        prompt: 'Create `Orders` and find orders whose `total` is **above the overall average**. Use a scalar subquery `(SELECT AVG(total) FROM Orders)` in the WHERE clause. Order 100 (49.90) is above the average, so `100` appears in the result.',
        boilerplate: `CREATE TABLE Orders (
  id    INTEGER,
  total REAL
);
INSERT INTO Orders (id, total) VALUES
  (100, 49.90),
  (101, 12.00),
  (102, 5.50),
  (103, 8.00);

SELECT id, total
FROM Orders
WHERE total > (SELECT AVG(total) FROM Orders)
ORDER BY id;`,
        expectedOutput: '49.9',
        explanation: 'The inner `(SELECT AVG(total) FROM Orders)` is a scalar subquery returning one value (the average ≈ 18.85). The outer query keeps rows above it. Order 100 qualifies. The subquery runs first; the outer query compares each row against its result.',
      },
      {
        kind: 'code',
        id: 'tsql-5-code-2',
        prompt: 'Use a CTE to make a query readable. Define `WITH big_orders AS (...)` selecting orders over 10, then select the count from it as `big_count`. Three orders exceed 10, so the column header `big_count` appears.',
        boilerplate: `CREATE TABLE Orders (
  id    INTEGER,
  total REAL
);
INSERT INTO Orders (id, total) VALUES
  (100, 49.90),
  (101, 12.00),
  (102, 5.50),
  (103, 30.00);

WITH big_orders AS (
  SELECT id, total
  FROM Orders
  WHERE total > 10
)
SELECT COUNT(*) AS big_count
FROM big_orders;`,
        expectedOutput: 'big_count',
        explanation: 'A CTE (`WITH name AS (...)`) names a result set you can reference like a table in the statement that immediately follows. It does not create a permanent object and often reads far better than a nested subquery. Three orders (49.90, 12.00, 30.00) exceed 10.',
      },
      {
        kind: 'mcq',
        id: 'tsql-5-mcq-1',
        prompt: 'Which statement about `EXISTS` versus `IN` is accurate?',
        options: [
          '`EXISTS` returns the matched rows themselves; `IN` returns true/false.',
          '`EXISTS (subquery)` is a boolean test that stops at the first row found, and unlike `IN` it is not tripped up by NULLs in the subquery result.',
          '`IN` can only be used with a hard-coded list, never a subquery.',
          'They are interchangeable in every case with identical behaviour and performance.',
        ],
        correctIndex: 1,
        explanation: '`EXISTS` short-circuits on the first matching row and returns TRUE/FALSE. A subtle trap: `x NOT IN (subquery that yields a NULL)` returns UNKNOWN for every row (so no matches), whereas `NOT EXISTS` is unaffected — making `NOT EXISTS` the safer anti-membership test. See [Microsoft Docs — EXISTS](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/exists-transact-sql).',
      },
      {
        kind: 'mcq',
        id: 'tsql-5-mcq-2',
        prompt: `What does this recursive CTE output?

\`\`\`sql
WITH Numbers AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM Numbers WHERE n < 5
)
SELECT n FROM Numbers;
\`\`\``,
        options: [
          'A single row: 1.',
          'The numbers 1, 2, 3, 4, 5 (one per row).',
          'An infinite loop / error.',
          'The numbers 1 through 4.',
        ],
        correctIndex: 1,
        explanation: 'The *anchor* member seeds `n = 1`. The *recursive* member adds `n + 1` while `n < 5`, producing 2, 3, 4, 5, then stops (when n = 5 the WHERE is false). `UNION ALL` accumulates all rows: 1..5. SQL Server defaults to a `MAXRECURSION` of 100 to guard against runaway recursion. See [Microsoft Docs — Recursive CTEs](https://learn.microsoft.com/en-us/sql/t-sql/queries/with-common-table-expression-transact-sql).',
      },
      {
        kind: 'mcq',
        id: 'tsql-5-mcq-3',
        prompt: 'A **correlated** subquery is one that:',
        options: [
          'Can be run independently of the outer query and is evaluated only once.',
          'References columns from the outer query, so it is conceptually re-evaluated for each outer row.',
          'Always returns more than one column.',
          'Must be written inside a CTE.',
        ],
        correctIndex: 1,
        explanation: 'A correlated subquery references a column from the outer query (e.g. `WHERE o.total > (SELECT AVG(total) FROM Orders WHERE customer_id = o.customer_id)`), so logically it depends on the current outer row. Non-correlated subqueries are self-contained and evaluated once. The optimizer may rewrite correlated subqueries into joins for performance. See [Microsoft Docs — Subqueries](https://learn.microsoft.com/en-us/sql/relational-databases/performance/subqueries).',
      },
    ],
  },

  // ─── Level 6 ─────────────────────────────────────────────────────────────
  {
    id: 'tsql-6',
    language: 'tsql',
    level: 6,
    title: 'Modifying Data — INSERT, UPDATE, DELETE, MERGE & Transactions',
    timeEstimate: '5-7 hours',
    intro: `Now you change data, not just read it. You'll \`INSERT\` single and multiple rows, \`UPDATE\` with a \`WHERE\` filter (and learn the terror of forgetting it), \`DELETE\` rows, and use SQL Server's \`MERGE\` to "upsert" (insert-or-update) in one statement. You'll wrap multi-step changes in **transactions** — \`BEGIN TRANSACTION\` ... \`COMMIT\` / \`ROLLBACK\` — so a batch either fully succeeds or leaves the database untouched (the *atomicity* in ACID). You'll also meet SQL Server's \`IDENTITY\` auto-increment columns and the \`OUTPUT\` clause that returns affected rows.

Locally, run an \`UPDATE\` without a \`WHERE\` against a throwaway table and watch every row change — then do it again inside an explicit transaction and \`ROLLBACK\` to undo it. That muscle memory ("wrap risky DML in a transaction") will save your career.`,
    topics: [
      { label: 'INSERT (Transact-SQL)', url: 'https://learn.microsoft.com/en-us/sql/t-sql/statements/insert-transact-sql', note: 'Single, multi-row, and INSERT...SELECT.' },
      { label: 'UPDATE (Transact-SQL)', url: 'https://learn.microsoft.com/en-us/sql/t-sql/queries/update-transact-sql', note: 'Set columns with a WHERE filter.' },
      { label: 'DELETE (Transact-SQL)', url: 'https://learn.microsoft.com/en-us/sql/t-sql/statements/delete-transact-sql', note: 'Remove rows; contrast with TRUNCATE.' },
      { label: 'MERGE (Transact-SQL)', url: 'https://learn.microsoft.com/en-us/sql/t-sql/statements/merge-transact-sql', note: 'Upsert: WHEN MATCHED / WHEN NOT MATCHED.' },
      { label: 'Transactions', url: 'https://learn.microsoft.com/en-us/sql/t-sql/language-elements/transactions-transact-sql', note: 'BEGIN/COMMIT/ROLLBACK atomic units of work.' },
      { label: 'IDENTITY property', url: 'https://learn.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql-identity-property', note: 'Auto-incrementing surrogate keys.' },
    ],
    deliverable: 'Build a table, perform INSERT/UPDATE/DELETE inside an explicit transaction, ROLLBACK once and COMMIT once, verifying row counts.',
    checks: [
      {
        kind: 'code',
        id: 'tsql-6-code-1',
        prompt: 'Create an `Inventory` table, insert three items, then `UPDATE` the quantity of `Widget` to 50. Finally select the row to prove the change. The result should show `Widget` with quantity `50`.',
        boilerplate: `CREATE TABLE Inventory (
  id   INTEGER,
  item TEXT,
  qty  INTEGER
);
INSERT INTO Inventory (id, item, qty) VALUES
  (1, 'Widget', 10),
  (2, 'Gadget', 5),
  (3, 'Gizmo',  0);

UPDATE Inventory
SET qty = 50
WHERE item = 'Widget';

SELECT item, qty
FROM Inventory
WHERE item = 'Widget';`,
        expectedOutput: '50',
        explanation: 'The `WHERE item = \'Widget\'` restricts the `UPDATE` to one row. Omitting the `WHERE` would set *every* row\'s qty to 50 — the classic catastrophic mistake. The follow-up `SELECT` confirms qty is now 50.',
      },
      {
        kind: 'code',
        id: 'tsql-6-code-2',
        prompt: 'Demonstrate a multi-row `INSERT` then `DELETE`. Insert four tasks, delete the ones marked done (`done = 1`), and select the survivors. The still-pending task `Write report` should appear.',
        boilerplate: `CREATE TABLE Tasks (
  id    INTEGER,
  title TEXT,
  done  INTEGER
);
INSERT INTO Tasks (id, title, done) VALUES
  (1, 'Buy milk',      1),
  (2, 'Write report',  0),
  (3, 'Email client',  1),
  (4, 'Plan sprint',   0);

DELETE FROM Tasks
WHERE done = 1;

SELECT id, title
FROM Tasks
ORDER BY id;`,
        expectedOutput: 'Write report',
        explanation: '`DELETE FROM Tasks WHERE done = 1` removes the two completed tasks. The remaining rows (`Write report`, `Plan sprint`) survive. Note `done = 1` here stands in for the SQL Server `BIT` type (which stores 0/1) — SQLite has no native boolean.',
      },
      {
        kind: 'mcq',
        id: 'tsql-6-mcq-1',
        prompt: `A transaction runs three updates. After the second succeeds, the third raises an error. What does this block do?

\`\`\`sql
BEGIN TRY
    BEGIN TRANSACTION;
        UPDATE Accounts SET balance = balance - 100 WHERE id = 1;
        UPDATE Accounts SET balance = balance + 100 WHERE id = 2;
        UPDATE Accounts SET balance = balance / 0  WHERE id = 3; -- errors
    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH
\`\`\``,
        options: [
          'Keeps the first two updates and discards only the third.',
          'Rolls back all three updates — the transaction is atomic, so the CATCH block undoes everything.',
          'Commits all three because COMMIT was reached.',
          'Leaves the database in a half-updated state.',
        ],
        correctIndex: 1,
        explanation: 'The divide-by-zero throws, control jumps to `CATCH`, and `ROLLBACK TRANSACTION` undoes *every* change since `BEGIN TRANSACTION` — the atomicity guarantee. Wrapping money transfers like this prevents debiting one account without crediting the other. See [Microsoft Docs — Transactions](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/transactions-transact-sql).',
      },
      {
        kind: 'mcq',
        id: 'tsql-6-mcq-2',
        prompt: 'In SQL Server, what does the `MERGE` statement do?',
        options: [
          'Combines two tables into one permanent table.',
          'Performs an upsert: `WHEN MATCHED` updates existing rows and `WHEN NOT MATCHED` inserts new ones, comparing a target table against a source in a single statement.',
          'Merges duplicate rows by collapsing them.',
          'Is a synonym for `UNION`.',
        ],
        correctIndex: 1,
        explanation: '`MERGE target USING source ON ... WHEN MATCHED THEN UPDATE ... WHEN NOT MATCHED THEN INSERT ...` synchronises a target table from a source in one statement — the canonical upsert. (Note: Microsoft has documented sharp edges in `MERGE`; many teams still prefer separate `UPDATE`+`INSERT` for correctness.) See [Microsoft Docs — MERGE](https://learn.microsoft.com/en-us/sql/t-sql/statements/merge-transact-sql).',
      },
      {
        kind: 'mcq',
        id: 'tsql-6-mcq-3',
        prompt: 'Which is true of an `IDENTITY(1,1)` column in SQL Server?',
        options: [
          'You must always supply its value in every INSERT.',
          'It auto-generates increasing values; you normally omit it in the INSERT column list, and gaps can appear after rollbacks or failed inserts.',
          'It guarantees there will never be any gaps in the sequence.',
          'It is the same thing as a `PRIMARY KEY`.',
        ],
        correctIndex: 1,
        explanation: '`IDENTITY(seed, increment)` makes SQL Server generate the value automatically — you omit the column from the INSERT (or use `SET IDENTITY_INSERT ON` to override). Values increase but are *not* guaranteed gap-free: a rolled-back transaction still consumes the number. It is independent of `PRIMARY KEY`, though often combined. See [Microsoft Docs — IDENTITY](https://learn.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql-identity-property).',
      },
    ],
  },

  // ─── Level 7 ─────────────────────────────────────────────────────────────
  {
    id: 'tsql-7',
    language: 'tsql',
    level: 7,
    title: 'Procedural T-SQL — Variables, Control Flow & Batches',
    timeEstimate: '5-7 hours',
    intro: `This is where T-SQL stops being "just SQL" and becomes a *procedural language*. You'll declare variables with \`DECLARE @name TYPE\`, assign them with \`SET\` or \`SELECT\`, branch with \`IF ... ELSE\`, and loop with \`WHILE\`. You'll use \`PRINT\` for diagnostics, \`BEGIN ... END\` to group statements into blocks, and understand how the client tool's \`GO\` separator splits your script into *batches* — and why a variable declared in one batch is invisible in the next.

Because SQLite cannot run \`DECLARE @v\` / \`WHILE\` / \`PRINT\`, this phase teaches procedural T-SQL through carefully-read MCQs (with real T-SQL in the prompt) and keeps the single runnable check to portable conditional logic via \`CASE\`. Locally, write a \`WHILE\` loop that prints 1..5 with \`PRINT\`, and a script with two batches separated by \`GO\` to see the variable-scope error first-hand.`,
    topics: [
      { label: 'DECLARE @local_variable', url: 'https://learn.microsoft.com/en-us/sql/t-sql/language-elements/declare-local-variable-transact-sql', note: 'Declaring and typing variables.' },
      { label: 'SET @local_variable', url: 'https://learn.microsoft.com/en-us/sql/t-sql/language-elements/set-local-variable-transact-sql', note: 'Assigning a value to a variable.' },
      { label: 'IF...ELSE', url: 'https://learn.microsoft.com/en-us/sql/t-sql/language-elements/if-else-transact-sql', note: 'Conditional control of flow.' },
      { label: 'WHILE (Transact-SQL)', url: 'https://learn.microsoft.com/en-us/sql/t-sql/language-elements/while-transact-sql', note: 'Looping with BREAK/CONTINUE.' },
      { label: 'BEGIN...END', url: 'https://learn.microsoft.com/en-us/sql/t-sql/language-elements/begin-end-transact-sql', note: 'Grouping statements into a block.' },
      { label: 'CASE expression', url: 'https://learn.microsoft.com/en-us/sql/t-sql/language-elements/case-transact-sql', note: 'In-query conditional values.' },
    ],
    deliverable: 'Write a WHILE loop that PRINTs 1..5, a script split into two GO batches showing variable scope, and a CASE-based categorisation query.',
    checks: [
      {
        kind: 'code',
        id: 'tsql-7-code-1',
        prompt: 'Use a `CASE` expression to label orders. For each order, output `total` and a `tier` of `high` when total >= 50, otherwise `low`. The order with total 80 is `high`, so the label `high` should appear in the result.',
        boilerplate: `CREATE TABLE Orders (
  id    INTEGER,
  total REAL
);
INSERT INTO Orders (id, total) VALUES
  (1, 49.90),
  (2, 80.00),
  (3, 12.00);

SELECT
  id,
  total,
  CASE WHEN total >= 50 THEN 'high' ELSE 'low' END AS tier
FROM Orders
ORDER BY id;`,
        expectedOutput: 'high',
        explanation: '`CASE WHEN condition THEN x ELSE y END` is SQL\'s in-query conditional, valid in any expression position (SELECT, WHERE, ORDER BY). Order 2 (80) is labelled `high`; the others `low`. `CASE` is fully portable across SQL dialects.',
      },
      {
        kind: 'mcq',
        id: 'tsql-7-mcq-1',
        prompt: `What does this T-SQL print?

\`\`\`sql
DECLARE @i INT = 1;
WHILE @i <= 3
BEGIN
    PRINT 'Iteration ' + CAST(@i AS VARCHAR(10));
    SET @i = @i + 1;
END
\`\`\``,
        options: [
          'It prints `Iteration 1`, `Iteration 2`, `Iteration 3` on three lines.',
          'It prints `Iteration 1` once then loops forever.',
          'It errors because you cannot concatenate INT with a string.',
          'It prints nothing because PRINT requires a SELECT.',
        ],
        correctIndex: 0,
        explanation: '`DECLARE @i INT = 1` initialises a variable; the `WHILE` body runs while `@i <= 3`, printing each value and incrementing with `SET`. `CAST(@i AS VARCHAR(10))` converts the INT so `+` does string concatenation (without the cast, `+` would attempt numeric addition and error). See [Microsoft Docs — WHILE](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/while-transact-sql).',
      },
      {
        kind: 'mcq',
        id: 'tsql-7-mcq-2',
        prompt: `Why does the second batch fail?

\`\`\`sql
DECLARE @name NVARCHAR(50) = N'Ada';
PRINT @name;
GO
PRINT @name;  -- second batch
\`\`\``,
        options: [
          '`PRINT` cannot be called twice in one script.',
          '`GO` ends the batch, and variables are scoped to a single batch — `@name` no longer exists after `GO`, so the second `PRINT` raises "Must declare the scalar variable @name".',
          'The `N` prefix is invalid in a PRINT.',
          'It does not fail; it prints `Ada` twice.',
        ],
        correctIndex: 1,
        explanation: 'A local variable\'s scope is the batch in which it is declared. `GO` is a client-side batch separator, so the code after it is a *new* batch where `@name` was never declared, producing error 137 "Must declare the scalar variable". The fix is to keep dependent code in the same batch or re-declare. See [Microsoft Docs — DECLARE @local_variable](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/declare-local-variable-transact-sql).',
      },
      {
        kind: 'mcq',
        id: 'tsql-7-mcq-3',
        prompt: 'What is a key difference between assigning a variable with `SET @x = (SELECT ...)` versus `SELECT @x = col FROM ...`?',
        options: [
          'They are completely identical.',
          '`SET` requires the subquery to return at most one value (it errors on multiple rows); `SELECT` silently keeps the value from the *last* row scanned if multiple rows match.',
          '`SELECT` cannot assign to variables at all.',
          '`SET` can only assign string types.',
        ],
        correctIndex: 1,
        explanation: '`SET @x = (SELECT ...)` enforces a single scalar result and errors if the subquery returns more than one row — safer. `SELECT @x = col FROM t WHERE ...` is more permissive: if multiple rows match, it just keeps the value from whichever row the engine processed last, and if *no* rows match it leaves `@x` unchanged. The `SET` form is preferred when you expect exactly one value. See [Microsoft Docs — SET @local_variable](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/set-local-variable-transact-sql).',
      },
      {
        kind: 'mcq',
        id: 'tsql-7-mcq-4',
        prompt: `What does \`IIF\` do in this expression: \`SELECT IIF(qty = 0, 'OUT', 'OK') AS status FROM Inventory;\`?`,
        options: [
          'It is a typo for `IF`; the query errors.',
          'It is SQL Server\'s shorthand ternary: returns `OUT` when `qty = 0`, otherwise `OK` — equivalent to `CASE WHEN qty = 0 THEN \'OUT\' ELSE \'OK\' END`.',
          'It checks if the column exists.',
          'It returns three values for each row.',
        ],
        correctIndex: 1,
        explanation: '`IIF(boolean_expr, true_value, false_value)` (added in SQL Server 2012) is syntactic sugar over a two-branch `CASE`. Here it labels zero-quantity rows `OUT` and the rest `OK`. It is T-SQL-specific; the portable equivalent is `CASE`. See [Microsoft Docs — IIF](https://learn.microsoft.com/en-us/sql/t-sql/functions/logical-functions-iif-transact-sql).',
      },
    ],
  },

  // ─── Level 8 ─────────────────────────────────────────────────────────────
  {
    id: 'tsql-8',
    language: 'tsql',
    level: 8,
    title: 'Window Functions — OVER, PARTITION BY, Ranking & Offsets',
    timeEstimate: '6-8 hours',
    intro: `Window functions compute across a set of rows *related to the current row* without collapsing them like \`GROUP BY\` does. You'll use the \`OVER()\` clause with \`PARTITION BY\` (restart the calculation per group) and \`ORDER BY\` (define an ordering within the window). You'll rank rows with \`ROW_NUMBER()\`, \`RANK()\`, and \`DENSE_RANK()\`; peek at neighbouring rows with \`LAG()\` and \`LEAD()\`; and compute running totals with \`SUM(...) OVER (ORDER BY ...)\`. The classic use case — "top N per group" — falls out naturally: number rows within each partition and keep \`rn = 1\`.

These are SQLite-compatible too, so several runnable checks here use real window syntax. Locally, build a \`Sales\` table and write a query that, per region, ranks salespeople by revenue and computes each one's share of the running total.`,
    topics: [
      { label: 'OVER clause (Transact-SQL)', url: 'https://learn.microsoft.com/en-us/sql/t-sql/queries/select-over-clause-transact-sql', note: 'PARTITION BY, ORDER BY, and framing.' },
      { label: 'Ranking functions', url: 'https://learn.microsoft.com/en-us/sql/t-sql/functions/ranking-functions-transact-sql', note: 'ROW_NUMBER, RANK, DENSE_RANK, NTILE.' },
      { label: 'ROW_NUMBER (Transact-SQL)', url: 'https://learn.microsoft.com/en-us/sql/t-sql/functions/row-number-transact-sql', note: 'Sequential numbering within a partition.' },
      { label: 'LAG (Transact-SQL)', url: 'https://learn.microsoft.com/en-us/sql/t-sql/functions/lag-transact-sql', note: 'Access a previous row\'s value.' },
      { label: 'LEAD (Transact-SQL)', url: 'https://learn.microsoft.com/en-us/sql/t-sql/functions/lead-transact-sql', note: 'Access a following row\'s value.' },
      { label: 'Analytic functions', url: 'https://learn.microsoft.com/en-us/sql/t-sql/functions/analytic-functions-transact-sql', note: 'FIRST_VALUE, LAST_VALUE, and friends.' },
    ],
    deliverable: 'Build a Sales table; write ROW_NUMBER top-per-group, a running SUM() OVER(ORDER BY), and a LAG month-over-month delta query.',
    checks: [
      {
        kind: 'code',
        id: 'tsql-8-code-1',
        prompt: 'Create a `Sales` table and number salespeople **within each region** by revenue (highest = 1) using `ROW_NUMBER() OVER (PARTITION BY region ORDER BY revenue DESC)`. Output region, name, and the rank as `rn`. The top earner per region gets `rn` = 1.',
        boilerplate: `CREATE TABLE Sales (
  region  TEXT,
  name    TEXT,
  revenue INTEGER
);
INSERT INTO Sales (region, name, revenue) VALUES
  ('East', 'Ana',  500),
  ('East', 'Ben',  300),
  ('West', 'Cleo', 700),
  ('West', 'Dan',  650);

SELECT
  region,
  name,
  ROW_NUMBER() OVER (PARTITION BY region ORDER BY revenue DESC) AS rn
FROM Sales
ORDER BY region, rn;`,
        expectedOutput: 'rn',
        explanation: '`ROW_NUMBER() OVER (PARTITION BY region ORDER BY revenue DESC)` restarts numbering for each region and assigns 1 to the highest earner. Wrapping this query in a CTE and filtering `WHERE rn = 1` is the canonical "top-1-per-group" pattern. Window functions keep every input row, unlike GROUP BY.',
      },
      {
        kind: 'code',
        id: 'tsql-8-code-2',
        prompt: 'Compute a **running total** of daily revenue using `SUM(amount) OVER (ORDER BY day)`. Output each day, its amount, and the cumulative `running`. By day 3 the running total is 60, so `60` should appear in the result.',
        boilerplate: `CREATE TABLE Daily (
  day    INTEGER,
  amount INTEGER
);
INSERT INTO Daily (day, amount) VALUES
  (1, 10),
  (2, 20),
  (3, 30);

SELECT
  day,
  amount,
  SUM(amount) OVER (ORDER BY day) AS running
FROM Daily
ORDER BY day;`,
        expectedOutput: '60',
        explanation: 'A windowed `SUM(...) OVER (ORDER BY day)` accumulates from the first row up to the current row (the default frame is `RANGE UNBOUNDED PRECEDING`). Running totals: 10, 30, 60. Compare to a plain `SUM(amount)` which would collapse everything to a single 60.',
      },
      {
        kind: 'mcq',
        id: 'tsql-8-mcq-1',
        prompt: 'For the values `100, 100, 90` ordered descending, what do `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()` assign respectively?',
        options: [
          'All three give 1, 1, 2.',
          '`ROW_NUMBER` → 1,2,3; `RANK` → 1,1,3; `DENSE_RANK` → 1,1,2.',
          '`ROW_NUMBER` → 1,1,2; `RANK` → 1,2,3; `DENSE_RANK` → 1,1,3.',
          'All three give 1,2,3.',
        ],
        correctIndex: 1,
        explanation: '`ROW_NUMBER` always assigns unique sequential numbers (1,2,3) even for ties. `RANK` gives ties the same rank then *skips* (1,1,3). `DENSE_RANK` gives ties the same rank but does *not* skip (1,1,2). Choosing the wrong one is a frequent reporting bug. See [Microsoft Docs — Ranking functions](https://learn.microsoft.com/en-us/sql/t-sql/functions/ranking-functions-transact-sql).',
      },
      {
        kind: 'mcq',
        id: 'tsql-8-mcq-2',
        prompt: `This query computes a month-over-month change. What does \`LAG(revenue, 1)\` return for the first (earliest) month?

\`\`\`sql
SELECT month, revenue,
       revenue - LAG(revenue, 1) OVER (ORDER BY month) AS delta
FROM MonthlySales;
\`\`\``,
        options: [
          '0',
          'NULL — there is no previous row, so the subtraction yields NULL for the first month (use the 3rd arg of LAG for a default).',
          'The same as the current revenue.',
          'It raises an error on the first row.',
        ],
        correctIndex: 1,
        explanation: '`LAG(revenue, 1)` looks one row back in the window order. The earliest month has no predecessor, so `LAG` returns NULL, and `revenue - NULL` is NULL. Supply a default with `LAG(revenue, 1, 0)` if you want 0 instead. `LEAD` is the symmetric "look forward" function. See [Microsoft Docs — LAG](https://learn.microsoft.com/en-us/sql/t-sql/functions/lag-transact-sql).',
      },
      {
        kind: 'mcq',
        id: 'tsql-8-mcq-3',
        prompt: 'What does `PARTITION BY` do in a window function, compared to `GROUP BY`?',
        options: [
          'They are identical; `PARTITION BY` is just the windowed spelling of `GROUP BY`.',
          '`PARTITION BY` divides rows into independent windows for the calculation but keeps every original row in the output; `GROUP BY` collapses each group to a single summary row.',
          '`PARTITION BY` physically splits the table into separate files.',
          '`PARTITION BY` can only be used with COUNT.',
        ],
        correctIndex: 1,
        explanation: '`GROUP BY` reduces N rows to one per group. `PARTITION BY` within `OVER()` resets the window calculation per group but emits a value on *every* row — so you can show each employee\'s salary next to their department average without losing detail. See [Microsoft Docs — OVER clause](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-over-clause-transact-sql).',
      },
    ],
  },

  // ─── Level 9 ─────────────────────────────────────────────────────────────
  {
    id: 'tsql-9',
    language: 'tsql',
    level: 9,
    title: 'Programmable Objects — Stored Procedures, Functions, Views & TRY...CATCH',
    timeEstimate: '6-8 hours',
    intro: `Now you package logic on the server. You'll write **stored procedures** (\`CREATE PROCEDURE ... AS\`) with input/output parameters, **user-defined functions** (scalar and table-valued), and **views** (\`CREATE VIEW\`) that present a saved query as a virtual table. You'll handle errors robustly with \`BEGIN TRY ... END TRY BEGIN CATCH ... END CATCH\`, inspect failures with \`ERROR_MESSAGE()\` / \`ERROR_NUMBER()\`, and raise your own with \`THROW\` (or the older \`RAISERROR\`). You'll learn when to use a view (encapsulate a query) vs a function (parameterised, reusable in a SELECT) vs a procedure (multi-statement, side effects).

SQLite supports \`CREATE VIEW\`, so the runnable check builds a view; procedures/functions/error-handling are taught via MCQ with real T-SQL. Locally, write a \`usp_GetCustomerOrders @customerId INT\` procedure and call it with \`EXEC\`.`,
    topics: [
      { label: 'CREATE PROCEDURE', url: 'https://learn.microsoft.com/en-us/sql/t-sql/statements/create-procedure-transact-sql', note: 'Define stored procedures with parameters.' },
      { label: 'CREATE FUNCTION', url: 'https://learn.microsoft.com/en-us/sql/t-sql/statements/create-function-transact-sql', note: 'Scalar and table-valued functions.' },
      { label: 'CREATE VIEW', url: 'https://learn.microsoft.com/en-us/sql/t-sql/statements/create-view-transact-sql', note: 'Saved queries as virtual tables.' },
      { label: 'TRY...CATCH (Transact-SQL)', url: 'https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql', note: 'Structured error handling.' },
      { label: 'THROW (Transact-SQL)', url: 'https://learn.microsoft.com/en-us/sql/t-sql/language-elements/throw-transact-sql', note: 'Raise an exception (modern).' },
      { label: 'EXECUTE (EXEC)', url: 'https://learn.microsoft.com/en-us/sql/t-sql/language-elements/execute-transact-sql', note: 'Call a stored procedure.' },
    ],
    deliverable: 'Author a usp_GetCustomerOrders @customerId procedure with TRY...CATCH, a scalar function, and a view summarising orders; call them.',
    checks: [
      {
        kind: 'code',
        id: 'tsql-9-code-1',
        prompt: 'Create an `Orders` table and a `VIEW` named `BigOrders` that selects orders over 100. Then `SELECT` from the view. Order 100 has total 250, so `250` should appear in the result.',
        boilerplate: `CREATE TABLE Orders (
  id    INTEGER,
  total REAL
);
INSERT INTO Orders (id, total) VALUES
  (100, 250.00),
  (101, 50.00),
  (102, 175.00);

CREATE VIEW BigOrders AS
  SELECT id, total
  FROM Orders
  WHERE total > 100;

SELECT id, total
FROM BigOrders
ORDER BY id;`,
        expectedOutput: '250',
        explanation: 'A `VIEW` stores a query under a name and behaves like a read-only virtual table — `SELECT * FROM BigOrders` re-runs the underlying query. Views encapsulate complex logic and centralise business rules. Orders 100 (250) and 102 (175) exceed 100.',
      },
      {
        kind: 'mcq',
        id: 'tsql-9-mcq-1',
        prompt: `What does this stored procedure do when called as \`EXEC usp_AddTax @price = 100, @withTax = @r OUTPUT\`?

\`\`\`sql
CREATE PROCEDURE usp_AddTax
    @price DECIMAL(10,2),
    @withTax DECIMAL(10,2) OUTPUT
AS
BEGIN
    SET @withTax = @price * 1.20;
END
\`\`\``,
        options: [
          'It returns 120.00 directly as a result set.',
          'It sets the OUTPUT parameter `@withTax` to 120.00 in the caller\'s variable `@r`; without the `OUTPUT` keyword on the call, `@r` would stay unchanged.',
          'It errors because procedures cannot do arithmetic.',
          'It prints 120.00 to the Messages pane.',
        ],
        correctIndex: 1,
        explanation: 'An `OUTPUT` parameter passes a value *back* to the caller. The caller declares `DECLARE @r DECIMAL(10,2);` then `EXEC usp_AddTax @price = 100, @withTax = @r OUTPUT;` — the `OUTPUT` keyword on the call is required, otherwise `@r` stays NULL. Procedures can also return result sets via embedded SELECTs and a status code via `RETURN`. See [Microsoft Docs — CREATE PROCEDURE](https://learn.microsoft.com/en-us/sql/t-sql/statements/create-procedure-transact-sql).',
      },
      {
        kind: 'mcq',
        id: 'tsql-9-mcq-2',
        prompt: `Inside a \`BEGIN CATCH\` block, which function returns the human-readable text of the error that triggered it?

\`\`\`sql
BEGIN TRY
    SELECT 1 / 0;
END TRY
BEGIN CATCH
    SELECT ??? AS msg;
END CATCH
\`\`\``,
        options: [
          '`@@ERROR`',
          '`ERROR_MESSAGE()`',
          '`LAST_ERROR()`',
          '`GETERROR()`',
        ],
        correctIndex: 1,
        explanation: '`ERROR_MESSAGE()` returns the message text of the error caught by the current `CATCH` block; companions include `ERROR_NUMBER()`, `ERROR_LINE()`, `ERROR_SEVERITY()`, and `ERROR_PROCEDURE()`. `@@ERROR` only holds the number of the *last* statement\'s error and is easy to lose; `TRY...CATCH` is the modern approach. See [Microsoft Docs — TRY...CATCH](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql).',
      },
      {
        kind: 'mcq',
        id: 'tsql-9-mcq-3',
        prompt: 'When should you prefer a **view** over a **stored procedure**?',
        options: [
          'Always — views are strictly more powerful.',
          'When you want a reusable, named SELECT that can be queried and joined like a table (no parameters, no side effects); a procedure is better for multi-statement logic, parameters, and data modification.',
          'Views can perform INSERT/UPDATE logic; procedures cannot.',
          'There is no practical difference.',
        ],
        correctIndex: 1,
        explanation: 'A view is essentially a saved `SELECT` you can query and join as if it were a table — great for encapsulating and reusing read logic, but it takes no parameters. A stored procedure runs an arbitrary batch (multiple statements, control flow, parameters, DML, transactions). For parameterised read-only logic usable in a SELECT, an inline table-valued *function* is the third option. See [Microsoft Docs — CREATE VIEW](https://learn.microsoft.com/en-us/sql/t-sql/statements/create-view-transact-sql).',
      },
      {
        kind: 'mcq',
        id: 'tsql-9-mcq-4',
        prompt: 'What is a major restriction on a **scalar user-defined function** in SQL Server?',
        options: [
          'It cannot accept any parameters.',
          'It cannot perform side-effecting operations such as INSERT/UPDATE/DELETE on base tables, and historically calling one per-row could badly hurt query performance.',
          'It can only return integers.',
          'It must always be called with EXEC.',
        ],
        correctIndex: 1,
        explanation: 'Functions in SQL Server must be side-effect free — no modifying base table data (only a procedure can do that). A scalar UDF used in a SELECT was traditionally evaluated row-by-row, often killing performance; SQL Server 2019\'s scalar UDF inlining mitigates this. Functions are for computing and returning values, procedures are for *doing* things. See [Microsoft Docs — CREATE FUNCTION](https://learn.microsoft.com/en-us/sql/t-sql/statements/create-function-transact-sql).',
      },
    ],
  },

  // ─── Level 10 ────────────────────────────────────────────────────────────
  {
    id: 'tsql-10',
    language: 'tsql',
    level: 10,
    title: 'Performance — Indexes, Execution Plans & Isolation Levels',
    timeEstimate: '6-8 hours',
    intro: `The final phase is about making queries *fast* and *correct under concurrency*. You'll learn how **indexes** work: a clustered index defines the physical row order (one per table), nonclustered indexes are separate B-tree structures pointing back to rows, and a missing index turns a lookup into a full table scan. You'll read **execution plans** (\`SET STATISTICS IO ON\`, "Display Estimated Execution Plan") to spot scans, seeks, and expensive operators. Finally, you'll reason about **transaction isolation levels** — \`READ COMMITTED\` (default), \`READ UNCOMMITTED\`, \`REPEATABLE READ\`, \`SERIALIZABLE\`, and \`SNAPSHOT\` — and the anomalies they do or don't prevent (dirty reads, non-repeatable reads, phantoms).

The runnable check demonstrates the *kind* of selective query an index accelerates (an indexed-column equality lookup), expressed in portable SQL. The deep SQL-Server-specific tuning knobs are taught via MCQ. Locally, run a query with \`SET STATISTICS IO ON\`, add a nonclustered index on the filtered column, and watch logical reads drop.`,
    topics: [
      { label: 'Clustered and nonclustered indexes', url: 'https://learn.microsoft.com/en-us/sql/relational-databases/indexes/clustered-and-nonclustered-indexes-described', note: 'How SQL Server indexes are structured.' },
      { label: 'CREATE INDEX (Transact-SQL)', url: 'https://learn.microsoft.com/en-us/sql/t-sql/statements/create-index-transact-sql', note: 'Syntax, INCLUDE columns, filtered indexes.' },
      { label: 'Execution plans', url: 'https://learn.microsoft.com/en-us/sql/relational-databases/performance/execution-plans', note: 'Reading estimated and actual plans.' },
      { label: 'SET STATISTICS IO', url: 'https://learn.microsoft.com/en-us/sql/t-sql/statements/set-statistics-io-transact-sql', note: 'Measure logical/physical reads.' },
      { label: 'SET TRANSACTION ISOLATION LEVEL', url: 'https://learn.microsoft.com/en-us/sql/t-sql/statements/set-transaction-isolation-level-transact-sql', note: 'READ COMMITTED, SNAPSHOT, SERIALIZABLE.' },
      { label: 'SQL Server index design guide', url: 'https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-index-design-guide', note: 'Designing indexes the optimizer can use (SARGability).' },
    ],
    deliverable: 'Profile a query with SET STATISTICS IO ON, add a nonclustered index, and document the before/after seek vs scan and logical-read change.',
    checks: [
      {
        kind: 'code',
        id: 'tsql-10-code-1',
        prompt: 'Create an `Employees` table and run a **selective equality lookup** — the kind of query an index on `dept` accelerates. Select names where `dept = \'Sales\'`. Employee `Grace` is in Sales, so `Grace` should appear in the result.',
        boilerplate: `CREATE TABLE Employees (
  id   INTEGER,
  name TEXT,
  dept TEXT
);
INSERT INTO Employees (id, name, dept) VALUES
  (1, 'Grace', 'Sales'),
  (2, 'Heidi', 'Engineering'),
  (3, 'Ivan',  'Sales'),
  (4, 'Judy',  'Marketing');

SELECT name, dept
FROM Employees
WHERE dept = 'Sales'
ORDER BY name;`,
        expectedOutput: 'Grace',
        explanation: 'A predicate like `WHERE dept = \'Sales\'` is *SARGable* (Search-ARGument-able): an index on `dept` lets the engine *seek* directly to matching rows instead of scanning the whole table. In SQL Server you would add `CREATE NONCLUSTERED INDEX IX_Employees_Dept ON Employees(dept);` and confirm a seek in the plan.',
      },
      {
        kind: 'mcq',
        id: 'tsql-10-mcq-1',
        prompt: 'What is the essential difference between a clustered and a nonclustered index in SQL Server?',
        options: [
          'There is no difference; the names are interchangeable.',
          'The clustered index *is* the table — it defines the physical order of the rows (so there is at most one); a nonclustered index is a separate structure that stores the key plus a pointer back to the row.',
          'A table can have many clustered indexes but only one nonclustered index.',
          'Nonclustered indexes physically reorder the table.',
        ],
        correctIndex: 1,
        explanation: 'The clustered index stores the actual data rows in key order at its leaf level, so a table can have only one. Nonclustered indexes are separate B-trees whose leaves hold the index key plus a row locator (the clustering key or a RID), allowing seeks but sometimes requiring a *key lookup* back to the table. See [Microsoft Docs — Clustered and Nonclustered Indexes](https://learn.microsoft.com/en-us/sql/relational-databases/indexes/clustered-and-nonclustered-indexes-described).',
      },
      {
        kind: 'mcq',
        id: 'tsql-10-mcq-2',
        prompt: `Why might this query be unable to use an index on \`order_date\`, causing a scan?

\`\`\`sql
SELECT * FROM Orders WHERE YEAR(order_date) = 2024;
\`\`\``,
        options: [
          'Indexes never work on date columns.',
          'Wrapping the indexed column in a function (`YEAR(order_date)`) makes the predicate non-SARGable, so the optimizer cannot seek; rewrite as a range: `order_date >= \'2024-01-01\' AND order_date < \'2025-01-01\'`.',
          '`SELECT *` is the reason; selecting fewer columns would fix it.',
          'The year 2024 is too large for the index.',
        ],
        correctIndex: 1,
        explanation: 'Applying a function to the indexed column (`YEAR(order_date)`) forces the engine to evaluate it for every row, defeating index seeks — the predicate is non-SARGable. Rewriting it as a half-open range on the bare column lets the optimizer seek the index. This is one of the highest-impact tuning fixes. See [Microsoft Docs — Index Design Guide](https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-index-design-guide).',
      },
      {
        kind: 'mcq',
        id: 'tsql-10-mcq-3',
        prompt: 'Which isolation level allows **dirty reads** — reading data another transaction has written but not yet committed?',
        options: [
          '`SERIALIZABLE`',
          '`READ UNCOMMITTED` (the same effect as the `NOLOCK` hint).',
          '`REPEATABLE READ`',
          '`SNAPSHOT`',
        ],
        correctIndex: 1,
        explanation: '`READ UNCOMMITTED` (and the `WITH (NOLOCK)` hint) lets you read uncommitted changes — fast, but you may read data that is later rolled back (a *dirty read*) or even read rows twice / miss rows. The default `READ COMMITTED` prevents dirty reads; `REPEATABLE READ` also prevents non-repeatable reads; `SERIALIZABLE` additionally prevents phantoms. See [Microsoft Docs — SET TRANSACTION ISOLATION LEVEL](https://learn.microsoft.com/en-us/sql/t-sql/statements/set-transaction-isolation-level-transact-sql).',
      },
      {
        kind: 'mcq',
        id: 'tsql-10-mcq-4',
        prompt: 'In an actual execution plan, you see an **Index Scan** where you expected an **Index Seek** on a highly selective filter. What does this usually indicate?',
        options: [
          'The query is optimal; scans are always preferred.',
          'The optimizer chose (or was forced) to read the whole index rather than navigate directly to matching rows — often due to a non-SARGable predicate, a missing/unsuitable index, stale statistics, or low selectivity estimates.',
          'A scan means the table has no rows.',
          'Index Scan and Index Seek are identical operations.',
        ],
        correctIndex: 1,
        explanation: 'A *seek* navigates the B-tree to just the qualifying rows; a *scan* reads the entire index. Seeing a scan on a selective filter suggests the predicate is non-SARGable, the right index is missing, statistics are stale (fix with `UPDATE STATISTICS`), or the estimated row count is off. Reading actual vs estimated rows in the plan is the core tuning diagnostic. See [Microsoft Docs — Execution plans](https://learn.microsoft.com/en-us/sql/relational-databases/performance/execution-plans).',
      },
    ],
  },
];
