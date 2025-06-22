'use server';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function GET(
  req: Request,
  { params }
) {
  const jobId = params.id;
  console.log(`[Transcript API] GET request for jobId: ${jobId}`);

  if (!jobId) {
    console.error('[Transcript API] Missing jobId parameter');
    return NextResponse.json({ error: 'Job ID is required.' }, { status: 400 });
  }

  try {
    // Fetch transcript from Supabase
    const { data, error } = await supabase
      .from('transcripts')
      .select('text_md, word_count')
      .eq('job_id', jobId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // Not found
        console.warn(`[Transcript API] Transcript not found for jobId: ${jobId}`);
        return NextResponse.json({ error: 'Transcript not found.' }, { status: 404 });
      }
      console.error(`[Transcript API] Supabase error for jobId: ${jobId}`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      console.warn(`[Transcript API] No data returned for jobId: ${jobId}`);
      return NextResponse.json({ error: 'Transcript not found.' }, { status: 404 });
    }

    console.log(`[Transcript API] Successfully retrieved transcript for jobId: ${jobId}`);
    return NextResponse.json({ transcript: data.text_md, word_count: data.word_count }, { status: 200 });
  } catch (err) {
    console.error(`[Transcript API] Unexpected error for jobId: ${jobId}`, err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 