# Database Infrastructure & Schema

> **Current focus:** transcript-only MVP.  
> **Audio-ingest tables** remain intact in **Appendix A** so we can revive
> the full pipeline without spelunking through Git history.

---

## 0 · Engine & hosting

| Layer            | Bootstrap pick | Free tier | Notes |
|------------------|---------------|-----------|-------|
| SQL store        | **Supabase Postgres** (14) | 0.5 GB | Easy exports, row-level security later |
| Migration tool   | **DrizzleKit** (`drizzle-kit generate`) | – | Generates type-safe queries |
| Back-ups         | Supabase daily auto-snapshot | Free | Plus weekly `pg_dump` → S3 |

---

## 1 · Core schema (v0.2)

```sql
-- organisations & users unchanged -------------------------
CREATE TABLE organisations (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  plan          TEXT NOT NULL DEFAULT 'starter',
  vat_country   TEXT,
  created_at    INTEGER NOT NULL,
  stripe_cust   TEXT
);

CREATE TABLE users (
  id       TEXT PRIMARY KEY,
  org_id   TEXT NOT NULL REFERENCES organisations(id),
  email    TEXT UNIQUE NOT NULL,
  role     TEXT CHECK(role IN ('owner','editor','viewer')) DEFAULT 'viewer',
  created_at INTEGER NOT NULL
);

-- new, slimmer jobs table ---------------------------------
CREATE TABLE jobs (
  id          TEXT PRIMARY KEY,                        -- ULID
  org_id      TEXT NOT NULL REFERENCES organisations(id),
  title       TEXT NOT NULL,
  language    TEXT DEFAULT 'en',
  word_count  INTEGER,
  state       TEXT CHECK(state IN ('queued','ready','error')) NOT NULL,
  error_msg   TEXT,
  created_at  INTEGER NOT NULL,
  ready_at    INTEGER
);

-- transcript + generated assets ---------------------------
CREATE TABLE tran
