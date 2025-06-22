# Podcasteo – Tech‑Stack Blueprint (Lean Bootstrap Edition)

*Last updated: 22 Jun 2025*

---

## 0. Guiding principles

1. **Zero fixed cloud spend until revenue ≥ \$1 k MRR.**
2. Prefer **usage‑based or generous free tiers** over subscriptions.
3. Keep every component **stateless or easily reprovisioned** → no DevOps babysitting.
4. **Upgrade path baked‑in** – every choice has a clear scale‑up replacement.

---

## 1. High‑level architecture (bootstrap version)

```mermaid
flowchart TD
  FE[Next.js (Vercel hobby)] --> EdgeAPI
  subgraph Cloudflare Edge
    EdgeAPI[Cloudflare Worker API]<--JWT-->Auth[NextAuth (Edge)]
    EdgeAPI --> Kv[Workers KV queue index]
    EdgeAPI --> R2[Cloudflare R2 (Hot storage)]
  end
  Kv --> Batch[RunPod GPU Job]
  Batch --> R2
  Batch --> EdgeAPI
  EdgeAPI --> MD[Markdown Export / CMS Webhook]
```

---

## 2. Component‑by‑component breakdown

| Layer                         | Bootstrap choice                                                       | \$0/mo limits                                                 | Variable cost                                | Why                                                       | Scale‑up swap                                                                   |
| ----------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------- | -------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Front‑end hosting**         | **Vercel Hobby** (Next.js static + edge functions)                     | 100 GB traffic, 100 edge‑function invocations/day             | \$0.65/GB egress beyond limit                | Easiest DX, Git‑push deploy                               | Vercel Pro or self‑host on Fly.io                                               |
| **API runtime**               | **Cloudflare Workers** (Bundled <50 ms CPU)                            | 100 k reqs/day free                                           | \$0.30 per M reqs >100 k                     | Global PoP, negligible cold start                         | Keep Workers; just bump to paid plan                                            |
| **Auth**                      | **NextAuth.js** with **email‑magic‑link** (uses Vercel Edge)           | Totally free                                                  | SMTP (use AWS SES pay‑as‑you‑go: \$0.10/1 k) | Avoids Clerk/Auth0 subscription                           | Clerk (SOC‑2) once enterprise demanded                                          |
| **DB / Session**              | **SQLite (Drizzle) in Cloudflare D1**                                  | 25 MB + 50 k reads/day                                        | \$5 per 2 GB tier                            | SQL + migrations, near‑zero ops                           | Neon Postgres serverless when >2 GB                                             |
| **Object storage**            | **Cloudflare R2**                                                      | 10 GB free, 1 GB egress                                       | \$0.015/GB storage; \$0.015/GB egress        | Same vendor as Workers → zero egress to Workers           | Backblaze B2 (cold), S3 (hot multi‑AZ)                                          |
| **Job queue / Orchestration** | **Workers KV** stores pending job IDs; Worker cron triggers RunPod API | 1 GB KV free                                                  | \$0.50/GB extra                              | Simpler than Rabbit/Redis                                 | Durable Objects queue or Upstash Kafka if throughput ↑                          |
| **GPU transcription**         | **RunPod Spot (A10G 24 GB)** via API; dockerised Whisper               | \$0 fixed; **\$0.15/hr** spot                                 | 60 min audio ≈ 0.06 GPU‑hr → **\$0.009/min** | Cheaper than AWS on‑demand; billed to the minute          | AWS Batch w/ Savings Plan when reliability >95 % needed                         |
| **LLM & embeddings**          | **OpenAI GPT‑4o** & `text‑embedding‑3-small`                           | No free tier; pay‑go \$0.005 /1 k tokens & \$0.02 /1 M tokens | Avg 60 min episode ≈ 6 k tokens = **\$0.03** | Best accuracy/time; no infra                              | Self‑host OpenAI inference endpoint or switch to Anthropic once margin squeezes |
| **CMS integration**           | **Markdown & static HTML export** + **WordPress Webhook (REST)**       | n/a                                                           | n/a                                          | Zero‑plugin option for users, no marketplace listing cost | Build 1st‑class WP/Ghost plugin at scale                                        |
| **Billing**                   | **Stripe Payments + Metered usage**                                    | No monthly fee                                                | 2.9 % + \$0.30/txn                           | Industry standard, pay‑per‑revenue                        | Keep Stripe; add Billing Scales & Stripe Tax                                    |
| **Observability**             | **Logflare** free community (100 MB/day) piping Worker logs            | 100 MB/day                                                    | \$2/GB over                                  | Click‑ops, zero infra                                     | Grafana/Loki on fly.io or Datadog when paying customers demand                  |
| **CI/CD**                     | GitHub Actions (public repo)                                           | 2 k min/month                                                 | \$0.008/min >limit                           | Community cache; integrates with Vercel                   | Use private runner or Buildkite on paid plan                                    |

---

## 3. Cost model per 60‑min episode (bootstrap)

| Component            | Unit cost       | Notes                                    |
| -------------------- | --------------- | ---------------------------------------- |
| GPU inference        | **\$0.009/min** | RunPod spot, 0.06 GPU‑hr × \$0.15/hr     |
| OpenAI tokens        | **\$0.03**      | 6 k prompt/comp tokens                   |
| Storage (hot 7 days) | **\$0.002**     | 100 MB × \$0.015/GB                      |
| Worker + egress      | **\$0.001**     | Within free band initially               |
| **Total variable**   | **≈ \$0.052**   | Room for 4× markup on \$0.20+/min retail |

*Fixed cloud spend = \$0 until Worker or Vercel free tiers exceeded.*

---

## 4. Scale‑up roadmap

| MRR trigger      | Bottleneck                | Upgrade action                    | Est. added monthly cost |
| ---------------- | ------------------------- | --------------------------------- | ----------------------- |
| \$1 k MRR        | Worker CPU >100 k req/day | Cloudflare Workers paid + R2 Pro  | +\$25                   |
| \$5 k MRR        | GPU queue latency >10 min | Migrate to AWS Batch + Spot Fleet | +\$150                  |
| \$10 k MRR       | D1 size >2 GB             | Move to Neon Postgres serverless  | +\$29                   |
| Enterprise logos | SOC‑2, SSO                | Adopt Clerk + Panther auditing    | +\$79                   |

---

## 5. Ops & automation

* **IaC:** Terraform Cloudflare provider + GitHub Actions.
* **Secrets:** GitHub OIDC into Cloudflare / RunPod API keys in Workers secrets.
* **Backups:** Nightly R2 → B2 lifecycle rule; D1 export to R2.
* **Monitoring:** Logflare alerts + Cloudflare Analytics; status page via Upptime (free GitHub Pages).

---

## 6. Open considerations

1. Evaluate **Bark/Whisper JAX** fork for 2× cheaper inference once stable.
2. Check new **Cloudflare AI Gateway** token metering when pricing released → could drop LLM cost.
3. Investigate **Supabase Storage** as multi‑region backup if R2 SLA proves insufficient.

---

*End of Tech‑Stack Blueprint*

## 7. Reference dependency list (bootstrap)

### 7.1 Client (Next.js on Vercel)

| Package                                  | Purpose                                 | Notes                               |
| ---------------------------------------- | --------------------------------------- | ----------------------------------- |
| `next` ^14                               | React framework (SSR + App Router)      | Free on Vercel hobby tier           |
| `react`, `react-dom`                     | UI core                                 | –                                   |
| `typescript`, `@types/react`             | Static typing                           | Zero runtime cost                   |
| `tailwindcss`, `postcss`, `autoprefixer` | Styling via utility classes             | JIT build, no CSS framework lock‑in |
| `@radix-ui/react-*`                      | Accessible primitives                   | Avoids custom JS for menus etc.     |
| `next-auth`                              | Magic‑link email auth (edge‑compatible) | Replaces paid Auth0/Clerk at start  |
| `zod`                                    | Runtime validation & schema sharing     | Shared between FE & Workers         |
| `remark`, `rehype`                       | Markdown to HTML previews               | Small footprint                     |
| `ky`                                     | Tiny Fetch wrapper                      | Edge‑friendly alternative to Axios  |

### 7.2 Edge / API Worker (Cloudflare)

| Package                                 | Purpose                        | Notes                       |
| --------------------------------------- | ------------------------------ | --------------------------- |
| `wrangler` CLI                          | Build & deploy Workers         | Free tier                   |
| `typescript`                            | Type‑safe Worker code          | –                           |
| `undici`                                | Standards‑track Fetch for Node | Needed for local dev        |
| `drizzle-orm`, `@cloudflare/kv-drizzle` | SQL queries over D1            | Lightweight, edge‑ready     |
| `openai`                                | LLM & embeddings API client    | Cached via KV to cut tokens |
| `stripe`                                | Billing API                    | Lazy‑load in edge function  |
| `@aws-sdk/client-ses`                   | Email magic‑link via SES       | Usage‑based (no plan)       |
| `jsonwebtoken`                          | Org API key issue/verify       | 1 kB gzipped                |

### 7.3 GPU batch container (RunPod)

```dockerfile
FROM nvidia/cuda:12.2.0-runtime-ubuntu22.04
RUN apt-get update \
    && apt-get install -y git ffmpeg \
    && pip install --no-cache-dir faster-whisper==1.0 torch==2.2.0 openai boto3
COPY transcribe.py /app/
ENTRYPOINT ["python","/app/transcribe.py"]
```

*Dependencies pinned; image ≈ 5 GB. Builds reproducibly on any CUDA 12 host.*

### 7.4 Dev & CI tooling

| Package              | Purpose                            |
| -------------------- | ---------------------------------- |
| `eslint`, `prettier` | Code quality & auto‑format         |
| `jest`, `vitest`     | Unit tests (Worker stubs)          |
| `turbo`              | Monorepo cache & concurrency       |
| `drizzle-kit`        | Generates type‑safe SQL migrations |

> **Principle:** keep third‑party SDKs minimal; rely on native Fetch & edge runtimes where possible to avoid bloat.

---

*End of Tech‑Stack Blueprint*
