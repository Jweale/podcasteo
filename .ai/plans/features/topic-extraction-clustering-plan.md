# Feature Plan: F-2 Topic Extraction & Clustering

## Purpose
Extract key themes and clusters from podcast transcripts to create a map of search intents, enabling downstream content generation to cover what people actually search for.

## User Story
*As a marketer, I want the system to identify key themes so the generated article covers what people actually search for.*

## Functional Requirements
- Accepts transcript text (up to 15,000 words).
- Uses embeddings (OpenAI `text-embedding-3-small` or equivalent) to represent transcript segments.
- Clusters segments into topics using cosine similarity.
- Returns at least 3 topic clusters, each with at least 2 keywords/phrases.
- Pipeline completes in under 30 seconds for a 10,000-word transcript.
- Stores topics and clusters in the `topics` table for later analytics.

## Acceptance Criteria
1. Pipeline finishes in < 30 seconds for 10k words.
2. Returns ≥ 3 topic clusters, each ≥ 2 keywords.
3. Topics stored in `topics` table for later analytics.

## Technical Approach
- **Embeddings:** Use OpenAI `text-embedding-3-small` to generate vector representations for transcript segments (e.g., sentences or paragraphs).
- **Clustering:** Apply cosine similarity and a clustering algorithm (e.g., K-means, Agglomerative) to group similar segments into topics.
- **Keyword Extraction:** For each cluster, extract representative keywords/phrases (e.g., via TF-IDF or similar method).
- **Storage:** Persist clusters and keywords in the `topics` table, linked to the job/transcript.
- **Performance:** Optimize batching and parallelization to ensure sub-30s runtime for large transcripts.

## Open Questions / Risks
- What is the optimal segment size for embeddings (sentence, paragraph, sliding window)?
- How to determine the number of clusters dynamically?
- Handling edge cases: very short or very long transcripts, highly repetitive content.
- Cost management for embedding API usage.

## Milestones / Deliverables
- [ ] Define schema for `topics` table.
- [ ] Implement embedding and clustering pipeline.
- [ ] Integrate with transcript upload flow.
- [ ] Store and expose topic clusters for downstream use.
- [ ] Test performance and accuracy on sample transcripts.

---

*Last updated: {{date}}* 