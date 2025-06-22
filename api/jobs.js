import { createClient } from '@supabase/supabase-js';
import { ulid } from 'ulid';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { title, text_md, language } = req.body;

    // Basic validation
    if (!title || !text_md) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }
    if (typeof text_md !== 'string' || text_md.length > 2 * 1024 * 1024) {
      return res.status(400).json({ error: 'Transcript too large (max 2MB).' });
    }
    const wordCount = text_md.trim().split(/\s+/).length;
    if (wordCount > 15000) {
      return res.status(400).json({ error: 'Transcript exceeds 15,000 words.' });
    }

    // Generate a ULID for the job id
    const jobId = ulid();
    const orgId = 'demo-org'; // Hardcoded for testing/demo

    // Create job
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .insert([{ id: jobId, org_id: orgId, title, language, state: 'queued', word_count: wordCount }])
      .select()
      .single();

    if (jobError) {
      return res.status(500).json({ error: jobError.message });
    }

    // Create transcript
    const { error: transcriptError } = await supabase
      .from('transcripts')
      .insert([{ job_id: jobId, text_md, word_count: wordCount }]);

    if (transcriptError) {
      return res.status(500).json({ error: transcriptError.message });
    }

    return res.status(201).json({ job_id: jobId });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
} 