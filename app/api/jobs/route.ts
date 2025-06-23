import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { ulid } from 'ulid';
import { extractAndStoreTopicsFromTranscript } from '@/app/lib/topicExtraction';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { title, text_md, language } = await req.json();

    // Basic validation
    if (!title || !text_md) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }
    if (typeof text_md !== 'string' || text_md.length > 2 * 1024 * 1024) {
      return NextResponse.json({ error: 'Transcript too large (max 2MB).' }, { status: 400 });
    }
    const wordCount = text_md.trim().split(/\s+/).length;
    if (wordCount > 15000) {
      return NextResponse.json({ error: 'Transcript exceeds 15,000 words.' }, { status: 400 });
    }

    // Generate a ULID for the job id
    const jobId = ulid();
    const orgId = 'demo-org'; // Hardcoded for testing/demo
    const createdAt = new Date().toISOString(); // Use ISO string for timestamptz

    // Create job
    const { error: jobError } = await supabase
      .from('jobs')
      .insert([{ id: jobId, org_id: orgId, title, language, state: 'queued', word_count: wordCount, created_at: createdAt }]);

    if (jobError) {
      return NextResponse.json({ error: jobError.message }, { status: 500 });
    }

    // Create transcript
    const { error: transcriptError } = await supabase
      .from('transcripts')
      .insert([{ job_id: jobId, text_md, word_count: wordCount }]);

    if (transcriptError) {
      return NextResponse.json({ error: transcriptError.message }, { status: 500 });
    }

    // Trigger topic extraction pipeline in the background
    setImmediate(async () => {
      try {
        await extractAndStoreTopicsFromTranscript({
          transcript: text_md,
          job_id: jobId,
          org_id: orgId,
          // user_id: null, // Add user_id if available
        });
        await supabase.from('jobs').update({ state: 'ready' }).eq('id', jobId);
        console.log(`[Job ${jobId}] Topic extraction complete.`);
      } catch (err) {
        await supabase.from('jobs').update({ state: 'error', error_msg: String(err) }).eq('id', jobId);
        console.error(`[Job ${jobId}] Topic extraction failed:`, err);
      }
    });

    return NextResponse.json({ job_id: jobId }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
} 