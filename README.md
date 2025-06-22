# Podcasteo – Monorepo

> **Turn audio into search‑ready pages.**  This repo houses the bootstrap MVP (front‑end + edge API + GPU worker) for the Podcasteo service.

---

## 1. Repo structure

```
/
├── apps/
│   ├── web/          # Next.js 14 (Vercel)
│   ├── api/          # Cloudflare Worker (TypeScript)
│   └── gpu-worker/   # Python Whisper container
├── packages/
│   ├── ui/           # Radix/Tailwind shared components
│   └── db/           # Drizzle ORM + migrations
└── docs/             # PRD, tech‑stack, api_spec, etc.
```

---

## 2. Prerequisites

| Tool           | Version  | Install                                  |
| -------------- | -------- | ---------------------------------------- |
| **Node.js**    | ≥18 LTS  | [https://nodejs.org](https://nodejs.org) |
| **pnpm**       | ≥8       | `npm i -g pnpm`                          |
| **Wrangler**   | ≥3.0     | `npm i -g wrangler`                      |
| **Docker**     | ≥24      | For GPU container & local R2             |
| **GitHub CLI** | optional | Release & CI helpers                     |

> 🎩 **Mac M‑chip users:** enable Rosetta for Docker images using `softwareupdate --install-rosetta`.

---

## 3. Quick start (local dev)

```bash
# 1. Clone
$ git clone https://github.com/podcasteo/monorepo.git && cd monorepo

# 2. Install packages & build workspace
$ pnpm install && pnpm run build

# 3. Copy env template & fill secrets
$ cp .env.example .env            # NextAuth, OpenAI, Cloudflare acc ID

# 4. Run DB migrations (D1 in-memory)
$ pnpm db:push                    # drizzle-kit push

# 5. Parallel dev servers (tmux/zsh)
$ pnpm dev:web    # Next.js  → http://localhost:3000
$ pnpm dev:api    # Wrangler  → http://localhost:8787
```

### GPU worker (optional smoke‑test)

```bash
$ docker compose -f apps/gpu-worker/docker-compose.yml up --build
```

Processes `/samples/episode.mp3` and posts results back to the local Worker.

---

## 4. Environment variables (excerpt)

| Key                           | Description                 | Example             |
| ----------------------------- | --------------------------- | ------------------- |
| `NEXTAUTH_SECRET`             | JWT signing key             | `super-long-random` |
| `OPENAI_API_KEY`              | LLM calls                   | `sk-...`            |
| `CF_ACCOUNT_ID`               | Cloudflare account          | `123abc456`         |
| `R2_ACCESS_KEY` / `R2_SECRET` | Hot storage                 | –                   |
| `STRIPE_SECRET_KEY`           | Billing                     | `sk_live_...`       |
| `POSTMARK_TOKEN`              | Email magic links (alt SES) | –                   |

See `.env.example` for the full list.  Dev can run with fake keys; billing & email are stubbed.

---

## 5. Running tests & linting

```bash
# Unit tests
$ pnpm test           # vitest + jsdom

# Type‑checks & ESLint/Prettier
$ pnpm run lint
```

CI (GitHub Actions) blocks merge on failing tests or lint.

---

## 6. Deployment (staging → prod)

1. **Vercel** – connect repo → set `PROJECT_ENV=stg` → auto‑deploy `main` to [https://stg.podcasteo.app](https://stg.podcasteo.app).
2. **Cloudflare Worker** – `pnpm deploy:api:stg` (Wrangler) → binds to R2 bucket `podcasteo-stg`.
3. **RunPod GPU** – `docker push` image tag `:stg`, redeployed via Terraform.

Promotion to prod uses GitHub Release labelled `v*.*.*` and matching GitHub Action.

---

## 7. Branching & versioning

* **`main`** – always deployable to staging.
* **feature/**\* – short‑lived branches; squash‑merge.
* **tagged release (`vX.Y.Z`)** – triggers prod deploy, SemVer.

---

## 8. Useful scripts

| Command               | What it does                                      |
| --------------------- | ------------------------------------------------- |
| `pnpm dev:all`        | Runs web & API dev in one pane (concurrently)     |
| `pnpm db:studio`      | Opens Drizzle ER diagram viewer                   |
| `pnpm analyse:tokens` | Prints OpenAI token stats for a sample transcript |

---

## 9. Support & contacts

* ❓ Questions → open GitHub discussion, tag `@maintainers`.
* 🐞 Bugs → create issue with reproduction steps.
* ☕ Chat → #podcasteo‑dev on Slack.

Happy hacking—and welcome aboard!

---

## Testing Setup

### 1. Create a Supabase Test Project
- Go to [Supabase](https://app.supabase.com/) and create a new project dedicated for testing.
- Set up the schema to match your production/development environment.
- Obtain the API URL and anon/public key from the project settings.

### 2. Configure Test Environment Variables
- Create a `.env.test` file in the project root with the following (replace with your test project values):

```
NEXT_PUBLIC_SUPABASE_URL=your-test-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-test-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-test-service-role-key
# Add any other required env vars for your app
```

### 3. Running Tests
- **Unit/Integration:**
  - `npm run test`
- **E2E (Playwright):**
  - `npx playwright test`

### 4. Notes
- The test suites will use `.env.test` automatically if configured in your test runner setup.
- Never use your production credentials for testing.
- For local DB development, you can use the Supabase CLI to run a local instance if desired.

---

*End of README*
