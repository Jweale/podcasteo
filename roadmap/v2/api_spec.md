# Podcasteo API Contract – v0.1 (Bootstrap)

*Last updated: 22 Jun 2025*

> **Scope:** endpoints exposed by the Cloudflare Worker edge API for the MVP.  All URLs in this spec are relative to the **Base URL**.

```
Base URL (prod):  https://api.podcasteo.ai/v1/
Base URL (staging): https://stg-api.podcasteo.ai/v1/
```

---

## 1. Authentication

| Type                         | Mechanism                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **User JWT**                 | Returned by `POST /auth/magic-link/verify`. Send on every request header:<br>`Authorization: Bearer <token>` |
| **Org API key** (agency use) | Provisioned in dashboard → header:<br>`X-API-Key: <key>`                                                     |

Both methods resolve to an `org_id` and `user_id` internally; rate‑limits apply per org.

---

## 2. Error Envelope

All non‑2xx responses conform to:

```json
{
  "error": {
    "code": "string",   // machine readable, kebab‑case
    "message": "Human explanation"
  }
}
```

| Code               | Meaning                 | HTTP status |
| ------------------ | ----------------------- | ----------- |
| `unauthorized`     | missing/invalid token   | 401         |
| `forbidden`        | plan tier lacks feature | 403         |
| `not-found`        | resource id unknown     | 404         |
| `rate-limit`       | daily quota exhausted   | 429         |
| `validation-error` | body or params invalid  | 400         |
| `server-error`     | unhandled exception     | 500         |

---

## 3. Resources & Endpoints

### 3.1 Audio Jobs

| Method & path                                                                                                 | Description                             | Auth | Body / Params               | Responses                                       |
| ------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ---- | --------------------------- | ----------------------------------------------- |
| **POST `/jobs`**                                                                                              | Submit a new episode for processing     | ✔️   | \`\`\`json                  |                                                 |
| {                                                                                                             |                                         |      |                             |                                                 |
| "source\_url": "[https://example.com/show.mp3](https://example.com/show.mp3)",  // presigned R2 or public mp3 |                                         |      |                             |                                                 |
| "title": "optional string",                                                                                   |                                         |      |                             |                                                 |
| "language": "en" // ISO 639‑1 (defaults en)                                                                   |                                         |      |                             |                                                 |
| }                                                                                                             |                                         |      |                             |                                                 |
| \`\`\`                                                                                                        | `202 Accepted` → `{ "job_id": "ulid" }` |      |                             |                                                 |
| **GET `/jobs/{job_id}`**                                                                                      | Fetch job state & metadata              | ✔️   | path `job_id`               | `200` → `Job` object or 404                     |
| **GET `/jobs`**                                                                                               | List latest jobs (paginated)            | ✔️   | Query: `cursor`, `limit=50` | `200` → list + `next_cursor`                    |
| **DELETE `/jobs/{job_id}`**                                                                                   | Cancel if in `queued`                   | ✔️   | –                           | `204 No Content` or `409` if already processing |

```jsonc
// Job object
{
  "id": "01HS0D2...","+
"  "title": "Episode 42 – AI & SEO",
  "state": "processing",   // queued|processing|ready|error
  "duration_sec": 3540,
  "created_at": 1719051600,
  "updated_at": 1719054600,
  "error_msg": null
}
```

#### 3.1.1 Transcript & Assets

| Method  | Path                    | Purpose                                                |
| ------- | ----------------------- | ------------------------------------------------------ |
| **GET** | `/jobs/{id}/transcript` | Returns Markdown + FAQ JSON + SEO score.               |
| **GET** | `/jobs/{id}/assets/zip` | Pre‑signed ZIP of all deliverables (md, vtt, json‑ld). |

### 3.2 Publishing

| Method   | Path                    | Description                                                                                                                                             |      |            |
| -------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ---------- |
| **POST** | `/jobs/{id}/publish`    | Body `{ "cms_type":"wordpress", "target_url":"https://blog.acme.com", "access_token":"..." }` → queues publish worker. 202 → `{ "publish_id": "ulid" }` |      |            |
| **GET**  | `/publish/{publish_id}` | Returns post URL, status (\`pending                                                                                                                     | live | failed\`). |

### 3.3 Usage & Billing

| Method  | Path             | Description                                         |
| ------- | ---------------- | --------------------------------------------------- |
| **GET** | `/usage/current` | Minutes processed, plan quota, next‑reset ISO date. |
| **GET** | `/invoices`      | Returns Stripe invoice links (latest 12).           |

### 3.4 Webhooks (outbound from Podcasteo)

| Event           | `event.type`   | Sample payload                                                                        |
| --------------- | -------------- | ------------------------------------------------------------------------------------- |
| Job ready       | `job.ready`    | `{ "job_id":"01HS0", "org_id":"01F...", "duration_sec":3540, "transcript_url":"..."}` |
| Job failed      | `job.failed`   | `{ "job_id":"01HS0", "error":"transcription-error"}`                                  |
| Publish success | `publish.live` | `{ "job_id":"...", "publish_url":"https://..." }`                                     |

Webhook retries: exponential back‑off × 5 attempts → `job.failed`.

***Security*** – Each POST includes `X-Podcasteo-Signature: sha256=…` (HMAC‑SHA256 of body using org’s webhook secret).

---

## 4. Rate limits (Starter plan)

| Endpoint group    | Limit             |
| ----------------- | ----------------- |
| Auth              | 10 req/min per IP |
| Job submit        | 30 jobs/day       |
| Job list & status | 120 req/min       |
| Publish           | 30 calls/day      |

429 returns `Retry-After` header (seconds).

---

## 5. Data models (condensed)

```ts
// Transcript
interface Transcript {
  job_id: string;
  text_md: string;
  faq: Array<{ q: string; a: string }>;
  seo_score: number; // 0‑1
  ready_at: number;  // epoch sec
}

// Usage summary
interface UsageCurrent {
  period_start: string; // ISO date
  period_end: string;
  minutes_used: number;
  minutes_quota: number; // null = unlimited
}
```

---

## 6. Versioning & deprecation

* URL namespace `/v1/` immutable after GA. Breaking changes ship under `/v2/`.
* Minor additions (new fields, events) follow **additive only** rule; announced via changelog ≥7 days prior.

---

## 7. Open items

1. Auth flow for agency API keys – scoped to specific shows?
2. Payload size limit for `source_url` (self‑hosted S3 links)
3. International language codes – gate non-English until Q4 roadmap.

---

*End of `api_spec.md`*
