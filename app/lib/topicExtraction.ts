import OpenAI from 'openai';
import { kmeans } from 'ml-kmeans';
import natural from 'natural';
import { createClient } from '@supabase/supabase-js';
import { ulid } from 'ulid';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

/**
 * Topic Extraction & Clustering Pipeline
 *
 * This module implements the core logic for extracting key topics from podcast transcripts.
 *
 * Pipeline Steps:
 * 1. Segmentation: Splits the transcript into longer, meaningful chunks (default: every 3 sentences).
 * 2. Embeddings: Uses OpenAI's text-embedding-3-small model to generate vector embeddings for each segment (batched for efficiency).
 * 3. Clustering: Groups similar segments into topic clusters using K-means (ml-kmeans), with the number of clusters chosen dynamically.
 * 4. Semantic Keyword Extraction: For each cluster, concatenates all segments and uses OpenAI GPT-3.5-turbo to extract the top 3 most important topics or key phrases (prompt-engineered for B2B/SEO relevance).
 * 5. Storage: Stores each cluster's topics/keywords in the 'topics' table, linked to the job, org, and (optionally) user.
 *
 * Design Notes:
 * - The pipeline is designed to run asynchronously (e.g., as a background job after transcript upload).
 * - All OpenAI API keys and credentials are loaded from environment variables.
 * - The pipeline is modular and can be extended with additional post-processing or analytics.
 *
 * Usage:
 *   await extractAndStoreTopicsFromTranscript({ transcript, job_id, org_id, user_id });
 *
 * Environment Variables:
 *   - OPENAI_API_KEY: Your OpenAI API key
 *   - SUPABASE_URL, SUPABASE_ANON_KEY: For database access
 */

// 1. Segment transcript into longer chunks (paragraphs or every 3 sentences)
export function segmentTranscript(text: string, sentencesPerChunk = 3): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const chunks: string[] = [];
  for (let i = 0; i < sentences.length; i += sentencesPerChunk) {
    const chunk = sentences.slice(i, i + sentencesPerChunk).join(' ').trim();
    if (chunk) chunks.push(chunk);
  }
  return chunks;
}

// 2. Remove stopwords from a segment
function removeStopwords(segment: string): string {
  const stopwords = natural.stopwords;
  return segment
    .split(/\s+/)
    .filter(word => !stopwords.includes(word.toLowerCase()))
    .join(' ');
}

// 2. Batch get embeddings for segments
export async function getEmbeddings(segments: string[], batchSize = 16): Promise<number[][]> {
  const embeddings: number[][] = [];
  for (let i = 0; i < segments.length; i += batchSize) {
    const batch = segments.slice(i, i + batchSize);
    try {
      const response = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: batch,
      });
      for (const item of response.data) {
        embeddings.push(item.embedding);
      }
    } catch (err) {
      console.error('OpenAI embedding batch error:', err);
      throw err;
    }
  }
  return embeddings;
}

// 3. Dynamically choose k (number of clusters)
export function chooseK(numSegments: number): number {
  // Heuristic: sqrt(n/2), min 3, max 10
  return Math.max(3, Math.min(10, Math.round(Math.sqrt(numSegments / 2))));
}

// 4. Cluster embeddings
export function clusterEmbeddings(embeddings: number[][], k: number) {
  // ml-kmeans: kmeans(data, k, options)
  return kmeans(embeddings, k, {}).clusters;
}

// 5. Extract semantic keywords for each cluster using OpenAI GPT-3.5-turbo
async function extractSemanticKeywordsForClusters(segments: string[], clusterLabels: number[], numKeywords = 3): Promise<string[][]> {
  // Group segments by cluster
  const clusterSegments: string[][] = Array.from({ length: Math.max(...clusterLabels) + 1 }, () => []);
  clusterLabels.forEach((label, idx) => {
    clusterSegments[label].push(segments[idx]);
  });
  // For each cluster, concatenate segments and call OpenAI
  const keywordsByCluster: string[][] = [];
  for (const segs of clusterSegments) {
    const clusterText = segs.join(' ');
    const prompt = `You are an expert content analyst for B2B SaaS podcasts.
Extract the 3 most important topics or key phrases from the following transcript segment, focusing on themes relevant for SEO and content summarization. 
Ignore filler words, names, and generic terms. Prefer multi-word phrases when possible.
Return only the topics as a comma-separated list.

Segment:
"${clusterText}"`;
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 50,
        temperature: 0.2,
      });
      const text = response.choices[0].message.content || '';
      const keywords = text.split(',').map(k => k.trim()).filter(Boolean);
      keywordsByCluster.push(keywords);
    } catch (err) {
      console.error('OpenAI GPT keyword extraction error:', err);
      keywordsByCluster.push([]); // fallback: empty
    }
  }
  return keywordsByCluster;
}

// 6. Store results in the topics table
export async function storeTopics({
  job_id,
  org_id,
  user_id = null,
  clusters,
}: {
  job_id: string;
  org_id: string;
  user_id?: string | null;
  clusters: string[][];
}) {
  const created_at = new Date().toISOString();
  const rows = clusters.map((keywords, idx) => ({
    id: ulid(), // Generate a ULID for each topic row
    job_id,
    org_id,
    user_id,
    cluster_id: idx + 1,
    keywords,
    extra_data: {},
    created_at,
  }));
  const { data, error } = await supabase.from('topics').insert(rows);
  if (error) {
    console.error('Error inserting topics:', error);
    throw error;
  }
  return data;
}

// 7. Main pipeline function
export async function extractAndStoreTopicsFromTranscript({
  transcript,
  job_id,
  org_id,
  user_id = null,
}: {
  transcript: string;
  job_id: string;
  org_id: string;
  user_id?: string | null;
}) {
  try {
    const segments = segmentTranscript(transcript, 3); // Use longer segments
    const embeddings = await getEmbeddings(segments);
    const k = chooseK(segments.length);
    const clusterLabels = clusterEmbeddings(embeddings, k);
    const keywords = await extractSemanticKeywordsForClusters(segments, clusterLabels); // Use OpenAI for keywords
    const result = await storeTopics({ job_id, org_id, user_id, clusters: keywords });
    console.log('Topics stored:', result);
    return result;
  } catch (err) {
    console.error('Topic extraction pipeline failed:', err);
    throw err;
  }
}

/*
// Usage Example:
(async () => {
  const transcript = "Your full transcript text here...";
  await extractAndStoreTopicsFromTranscript({
    transcript,
    job_id: 'your_job_id',
    org_id: 'your_org_id',
    user_id: 'your_user_id', // optional
  });
})();
*/ 