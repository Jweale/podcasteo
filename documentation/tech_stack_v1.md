## **`tech_stack.md`**

```markdown
# Podcasteo Tech-Stack Blueprint – v0.2  
*Transcript-Only Bootstrap*  
_Last updated 22 Jun 2025_

---

## 0 · Guiding Principles
Unchanged (lean cost, single-dev friendly, swap-out later).

---

## 1 · MVP Architecture

```mermaid
flowchart TD
  FE[Next.js (Vercel Hobby)] --JWT--> Edge[Edge API (Vercel Fn)]
  Edge --> DB[Supabase Postgres (free)]
  Edge --> LLM[OpenAI GPT-4o + Embeds]
  Edge --> CMS[WordPress / Markdown export]
2 · Component Table
Layer	Bootstrap Pick	$0 Cap / Free tier	Variable Cost	Rationale
Front-end + API	Vercel Hobby	100 GB & 100 invokes/day	$0.65/GB egress	One dashboard
Database	Supabase Postgres	0.5 GB storage	$0.15/GB-mo beyond	Click-create
Storage	None (text in DB)	–	–	No audio
LLM	OpenAI GPT-4o	–	~$0.005 / 1 k tok	Quality
Auth	NextAuth email	SES sandbox	$0.10 / 1 k emails	Free to start
Billing	Stripe metered	Free	2.9 % + $0.30	–
Observability	Vercel Analytics	Free	–	Enough

3 · Cost per 6 k-word transcript
Component	Cost
OpenAI	~$0.03
DB store	~$0.0005
Vercel	$0
Total	≈ $0.03

4 · Scale-up Triggers
Trigger	Action
>100 GB egress / mo	Vercel Pro or Fly.io
DB >0.5 GB	Supabase Pro $25
Token spend >$150 / mo	Fine-tune cheaper model
Need global edge latency	Reintroduce Cloudflare Worker

Appendix A – Full Audio-Pipeline Stack
(kept exactly from v0.1: Workers, R2, RunPod GPU, cost charts, etc.)


