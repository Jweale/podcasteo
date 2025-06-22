# Feature Plan: LLM Drafting (F-3)

## Summary
Generate a publish-ready summary article (600–900 words), FAQ (5+ Q/A), and pull-quotes from each transcript using GPT-4o, ensuring brand-safe, B2B SaaS tone and high-quality output.

## Goals
- Automate the creation of SEO-optimized, brand-safe content from transcripts.
- Provide structured outputs: article, FAQ, and pull-quotes.
- Ensure outputs are concise, accurate, and on-brand.

## User Stories
- **As a marketer,** I want publish-ready copy so I skip manual summarising.
- **As an editor,** I want to review and edit generated content before publishing.

## Acceptance Criteria
1. Output Markdown includes H-tags, bullet lists, and is ≤900 words.
2. At least one FAQ entry per topic cluster.
3. Pull-quotes include speaker name and timestamp if available.
4. LLM run cost ≤40,000 tokens per job.
5. System prompt enforces brand-safe, B2B SaaS tone.

## Technical Notes
- Use GPT-4o for drafting and summarization.
- Structure output for easy review and editing.
- Integrate with brand-safety and review pipelines.
- Optimize prompts for cost and quality.

## Dependencies
- Access to GPT-4o API.
- Integration with topic clusters and transcript data.
- Review UI for editors.

## Open Questions
- Should we allow users to customize the system prompt?
- How do we handle transcripts with multiple speakers or languages?
- Should we support additional output formats (e.g., HTML, PDF)? 