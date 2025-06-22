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
--
-- The `transcripts` table stores the full transcript text (`text_md`) and related
-- assets for each job. It is linked to the `jobs` table by `job_id` (1:1 relationship).
-- The `text_md` field is of type TEXT and can store up to 2MB per transcript.
-- This separation keeps the `jobs` table lean and allows for scalable content storage.
--
CREATE TABLE transcripts (
  job_id      TEXT PRIMARY KEY REFERENCES jobs(id) ON DELETE CASCADE,
  text_md     TEXT NOT NULL,
  faq_json    TEXT,           -- JSON array of { q, a }
  seo_score   REAL,           -- 0-1 helpful-content heuristic
  word_count  INTEGER,
  ready_at    INTEGER
);

-- publish metadata ----------------------------------------
CREATE TABLE cms_posts (
  id            TEXT PRIMARY KEY,
  job_id        TEXT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  cms_type      TEXT CHECK(cms_type IN ('wordpress','ghost','markdown')),
  cms_post_id   TEXT,
  publish_url   TEXT,
  published_at  INTEGER
);

-- metered usage (by WORDS) --------------------------------
CREATE TABLE usage_events (
  id        INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,,
  org_id    TEXT NOT NULL REFERENCES organisations(id),
  job_id    TEXT NOT NULL,
  words     INTEGER NOT NULL,
  event_ts  INTEGER NOT NULL          -- epoch seconds
);
