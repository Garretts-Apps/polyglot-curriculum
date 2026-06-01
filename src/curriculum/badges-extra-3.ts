import type { BadgeData } from './badges';

export const badgesExtra3: Record<string, BadgeData> = {
  // ── C++ ─────────────────────────────────────────────────────────────────
  'cpp-0': {
    title: 'C++: Setup & Hello World',
    skills: [
      'Installed a modern C++ compiler (g++/clang++) supporting C++17 or later',
      'Compiled a program with g++ -std=c++20 and ran the resulting executable',
      'Printed text to standard output using std::cout and the << insertion operator',
    ],
  },
  'cpp-1': {
    title: 'C++: Basics — Types, auto, References & Streams',
    skills: [
      'Declared variables of fundamental types (int, double, bool, char) and used auto deduction',
      'Distinguished copies from references and aliased an existing object with int&',
      'Formatted stream output with manipulators like std::boolalpha and std::setprecision',
    ],
  },
  'cpp-2': {
    title: 'C++: Control Flow, Functions & Overloading',
    skills: [
      'Directed program flow with if/else, switch, and for/while loops',
      'Defined functions and passed arguments by value and by reference',
      'Declared overloaded functions and reasoned about overload resolution',
    ],
  },
  'cpp-3': {
    title: 'C++: Classes, RAII, Constructors & Destructors',
    skills: [
      'Defined class and struct types bundling data with constructors and destructors',
      'Initialized members with a member-initializer list ahead of the constructor body',
      'Applied RAII so a destructor releases resources deterministically at end of scope',
    ],
  },
  'cpp-4': {
    title: 'C++: Pointers, References, const & the Memory Model',
    skills: [
      'Distinguished stack from heap storage and raw pointers (T*) from references (T&)',
      'Applied const correctly, separating pointer-to-const from const-pointer',
      'Identified dangling-pointer and null-dereference bugs as undefined behaviour',
    ],
  },
  'cpp-5': {
    title: 'C++: Dynamic Memory & Smart Pointers',
    skills: [
      'Managed heap resources with std::unique_ptr and std::shared_ptr via RAII',
      'Created objects with std::make_unique/make_shared instead of raw new',
      'Broke reference cycles with std::weak_ptr to prevent shared_ptr leaks',
    ],
  },
  'cpp-6': {
    title: 'C++: Templates & Generic Programming',
    skills: [
      'Wrote function and class templates parameterised over types',
      'Relied on template argument deduction and used non-type template parameters',
      'Explained compile-time instantiation (monomorphization) versus Java-style type erasure',
    ],
  },
  'cpp-7': {
    title: 'C++: The STL — Containers, Iterators & Algorithms',
    skills: [
      'Stored data in STL containers: vector, map, set, and unordered_map',
      'Expressed logic with <algorithm> calls like sort, find, and accumulate over iterator ranges',
      'Reasoned about iterator invalidation when a vector reallocates on push_back',
    ],
  },
  'cpp-8': {
    title: 'C++: Move Semantics, Rvalue References & Perfect Forwarding',
    skills: [
      'Implemented move constructors and move assignment to transfer resources cheaply',
      'Applied std::move as a cast to rvalue reference and followed the Rule of Five/Zero',
      'Forwarded arguments while preserving value category with forwarding references and std::forward',
    ],
  },
  'cpp-9': {
    title: 'C++: Operator Overloading, Lambdas & std::function',
    skills: [
      'Overloaded operators such as operator+, operator==, and streaming operator<<',
      'Wrote lambdas with value and reference capture lists for STL algorithms',
      'Stored type-erased callables in std::function for callbacks',
    ],
  },
  'cpp-10': {
    title: 'C++: Concurrency, Performance & Modern C++20',
    skills: [
      'Ran work across std::thread and guarded shared state with std::mutex/lock_guard and std::atomic',
      'Constrained templates with C++20 concepts for clearer compile-time errors',
      'Composed lazy data pipelines using C++20 ranges views like filter and transform',
    ],
  },

  // ── T-SQL ───────────────────────────────────────────────────────────────
  'tsql-0': {
    title: 'T-SQL: Setup & Your First SELECT',
    skills: [
      'Connected to SQL Server with SSMS, Azure Data Studio, or sqlcmd',
      'Returned a single literal value and aliased the output column with AS',
      'Distinguished the client-side GO batch separator and PRINT from result-returning SELECT',
    ],
  },
  'tsql-1': {
    title: 'T-SQL: Basics — SELECT, WHERE, ORDER BY & Data Types',
    skills: [
      'Projected columns and filtered rows with SELECT ... FROM ... WHERE',
      'Sorted results with ORDER BY and limited rows with SELECT TOP (n)',
      'Chose appropriate data types including DECIMAL for money and NVARCHAR for Unicode text',
    ],
  },
  'tsql-2': {
    title: 'T-SQL: Filtering, Operators & NULL Handling',
    skills: [
      'Combined predicates with AND/OR/NOT, BETWEEN, IN, and LIKE wildcard patterns',
      'Applied three-valued logic, testing for NULL with IS NULL rather than = NULL',
      'Substituted defaults for missing values with ISNULL and COALESCE',
    ],
  },
  'tsql-3': {
    title: 'T-SQL: Joining Tables — INNER, OUTER & CROSS JOINs',
    skills: [
      'Combined tables with INNER, LEFT/RIGHT/FULL OUTER, and CROSS joins using aliases',
      'Explained how an unmatched LEFT JOIN row produces NULL-filled columns',
      'Found rows with no match using the LEFT JOIN ... WHERE key IS NULL anti-join',
    ],
  },
  'tsql-4': {
    title: 'T-SQL: Aggregation — GROUP BY, HAVING & Aggregate Functions',
    skills: [
      'Summarised rows with COUNT, SUM, AVG, MIN, and MAX',
      'Bucketed rows with GROUP BY and filtered groups with HAVING',
      'Explained the logical processing order that lets ORDER BY but not WHERE use SELECT aliases',
    ],
  },
  'tsql-5': {
    title: 'T-SQL: Subqueries & Common Table Expressions (WITH)',
    skills: [
      'Wrote scalar, IN/EXISTS, and correlated subqueries',
      'Refactored nested subqueries into readable CTE pipelines with WITH',
      'Generated sequences and walked hierarchies using a recursive CTE',
    ],
  },
  'tsql-6': {
    title: 'T-SQL: Modifying Data — INSERT, UPDATE, DELETE, MERGE & Transactions',
    skills: [
      'Modified data with INSERT, UPDATE, and DELETE using WHERE filters',
      'Upserted rows in one statement with MERGE',
      'Wrapped multi-step changes in BEGIN TRANSACTION with COMMIT and ROLLBACK for atomicity',
    ],
  },
  'tsql-7': {
    title: 'T-SQL: Procedural T-SQL — Variables, Control Flow & Batches',
    skills: [
      'Declared and assigned variables with DECLARE @v, SET, and SELECT',
      'Branched with IF/ELSE and looped with WHILE, emitting diagnostics via PRINT',
      'Explained how GO splits a script into batches that bound variable scope',
    ],
  },
  'tsql-8': {
    title: 'T-SQL: Window Functions — OVER, PARTITION BY, Ranking & Offsets',
    skills: [
      'Computed across related rows with the OVER clause and PARTITION BY',
      'Ranked rows with ROW_NUMBER, RANK, and DENSE_RANK',
      'Built running totals and accessed neighbouring rows with LAG and LEAD',
    ],
  },
  'tsql-9': {
    title: 'T-SQL: Programmable Objects — Procedures, Functions, Views & TRY...CATCH',
    skills: [
      'Authored stored procedures with input and OUTPUT parameters and called them with EXEC',
      'Created views and user-defined functions to package reusable logic',
      'Handled errors with TRY...CATCH and inspected them via ERROR_MESSAGE()',
    ],
  },
  'tsql-10': {
    title: 'T-SQL: Performance — Indexes, Execution Plans & Isolation Levels',
    skills: [
      'Explained clustered and nonclustered indexes and how a missing index forces a table scan',
      'Read execution plans and measured reads with SET STATISTICS IO',
      'Compared transaction isolation levels and the read anomalies each prevents',
    ],
  },

  // ── PostgreSQL ──────────────────────────────────────────────────────────
  'postgresql-0': {
    title: 'PostgreSQL: Setup & Your First SELECT',
    skills: [
      'Installed PostgreSQL and connected to the server with the psql client',
      'Returned a one-row greeting with SELECT and aliased the column with AS',
      'Used psql meta-commands such as \\dt to inspect the database',
    ],
  },
  'postgresql-1': {
    title: 'PostgreSQL: SELECT, WHERE, ORDER BY & Postgres Data Types',
    skills: [
      'Projected columns, filtered rows with WHERE, and sorted with ORDER BY',
      'Chose Postgres types including integer, numeric, text, and native boolean',
      'Explained how Postgres folds unquoted identifiers to lowercase',
    ],
  },
  'postgresql-2': {
    title: 'PostgreSQL: Filtering, NULL, COALESCE & Casting with ::',
    skills: [
      'Handled NULL with IS NULL, IS DISTINCT FROM, COALESCE, and NULLIF',
      'Cast values with CAST(x AS t) and the Postgres :: shorthand',
      'Matched text case-insensitively with the ILIKE operator',
    ],
  },
  'postgresql-3': {
    title: 'PostgreSQL: JOINs — Combining Tables',
    skills: [
      'Combined tables with INNER, LEFT/RIGHT/FULL OUTER, and CROSS joins',
      'Preserved unmatched rows with a LEFT JOIN that NULL-pads the missing side',
      'Distinguished the ON clause from USING, which coalesces the join column',
    ],
  },
  'postgresql-4': {
    title: 'PostgreSQL: Aggregation — GROUP BY, HAVING & FILTER',
    skills: [
      'Aggregated rows with count, sum, avg, min, and max grouped by GROUP BY',
      'Filtered groups after aggregation with HAVING',
      'Wrote conditional aggregates with FILTER (WHERE ...) and concatenated values with string_agg',
    ],
  },
  'postgresql-5': {
    title: 'PostgreSQL: Subqueries & CTEs (WITH, Recursive)',
    skills: [
      'Composed queries with scalar, IN/EXISTS, and ANY/ALL subqueries',
      'Named subqueries for readability with WITH common table expressions',
      'Walked hierarchies and generated series with WITH RECURSIVE and generate_series',
    ],
  },
  'postgresql-6': {
    title: 'PostgreSQL: Writing Data — INSERT, UPDATE, DELETE, RETURNING & UPSERT',
    skills: [
      'Mutated data with INSERT, UPDATE, and DELETE and retrieved affected rows via RETURNING',
      'Made writes idempotent with INSERT ... ON CONFLICT DO UPDATE upserts',
      'Wrapped changes in BEGIN/COMMIT/ROLLBACK transactions with SAVEPOINT',
    ],
  },
  'postgresql-7': {
    title: 'PostgreSQL: Types Deep-Dive — Identity, Arrays, JSON/JSONB, Enums',
    skills: [
      'Declared auto-increment keys with GENERATED ALWAYS AS IDENTITY and SERIAL',
      'Stored and queried array columns with ANY and the @> containment operator',
      'Worked with jsonb using the ->, ->>, and @> operators and defined enum types',
    ],
  },
  'postgresql-8': {
    title: 'PostgreSQL: Window Functions — OVER, PARTITION BY, ROW_NUMBER, RANK, LAG',
    skills: [
      'Computed per-row results over windows with OVER (PARTITION BY ... ORDER BY ...)',
      'Ranked rows with row_number, rank, and dense_rank and offset with lag/lead',
      'Selected the first row per group with the Postgres-only DISTINCT ON',
    ],
  },
  'postgresql-9': {
    title: 'PostgreSQL: Indexes, EXPLAIN ANALYZE & Query Planning',
    skills: [
      'Chose index types including B-tree and GIN for the query at hand',
      'Read planner output with EXPLAIN and EXPLAIN ANALYZE to spot scans versus seeks',
      'Converted a sequential scan into an index scan by adding a targeted index',
    ],
  },
  'postgresql-10': {
    title: 'PostgreSQL: PL/pgSQL, Triggers, Extensions & MVCC Concurrency',
    skills: [
      'Wrote server-side functions in PL/pgSQL with dollar-quoted BEGIN/RETURN blocks',
      'Attached triggers firing on INSERT/UPDATE/DELETE and loaded extensions with CREATE EXTENSION',
      'Explained MVCC snapshots, isolation levels, and why VACUUM reclaims dead tuples',
    ],
  },
};
