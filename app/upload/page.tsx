'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_WORDS = 15000;
const ALLOWED_TYPES = ['text/markdown', 'text/plain', 'text/vtt', '.md', '.txt', '.vtt'];

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>('');
  const [wordCount, setWordCount] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setSuccess('');
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      // Validate file type
      if (!ALLOWED_TYPES.some(type => f.type === type || f.name.endsWith(type.replace('text/', '.')))) {
        setError('Invalid file type. Only .md, .txt, .vtt allowed.');
        setFile(null);
        return;
      }
      // Validate file size
      if (f.size > MAX_FILE_SIZE) {
        setError('File is too large (max 2MB).');
        setFile(null);
        return;
      }
      setFile(f);
      setText('');
      setWordCount(0);
    } else {
      setFile(null);
    }
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setError('');
    setSuccess('');
    const value = e.target.value;
    const words = value.trim().split(/\s+/).filter(Boolean);
    setText(value);
    setWordCount(words.length);
    setFile(null);
    if (words.length > MAX_WORDS) {
      setError('Text exceeds 15,000 word limit.');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    let payload: { title: string; text_md: string; language: string } = {
      title: 'Uploaded Transcript',
      text_md: '',
      language: 'en',
    };

    if (file) {
      // Read file as text
      try {
        const textContent = await file.text();
        const words = textContent.trim().split(/\s+/).filter(Boolean);
        if (words.length > MAX_WORDS) {
          setError('File transcript exceeds 15,000 word limit.');
          setLoading(false);
          return;
        }
        payload.text_md = textContent;
      } catch (err) {
        setError('Failed to read file.');
        setLoading(false);
        return;
      }
    } else if (text) {
      if (wordCount > MAX_WORDS) {
        setError('Text exceeds 15,000 word limit.');
        setLoading(false);
        return;
      }
      payload.text_md = text;
    } else {
      setError('Please upload a file or paste transcript text.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Upload failed.');
      } else {
        setSuccess('Transcript uploaded successfully!');
        setFile(null);
        setText('');
        setWordCount(0);
      }
    } catch (err: any) {
      setError('Network or server error.');
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled =
    loading ||
    (!!file && error !== '') ||
    (!!text && (error !== '' || wordCount > MAX_WORDS)) ||
    (!file && !text);

  return (
    <main style={{ maxWidth: 500, margin: '2rem auto', padding: 24 }}>
      <h1>Upload Transcript</h1>
      <form onSubmit={handleSubmit}>
        <label>
          File Upload (.md, .txt, .vtt, ≤2MB):
          <input type="file" accept=".md,.txt,.vtt" onChange={handleFileChange} />
        </label>
        <div style={{ margin: '1rem 0' }}>or</div>
        <label>
          Paste Transcript (≤15,000 words):
          <textarea
            rows={8}
            value={text}
            onChange={handleTextChange}
            placeholder="Paste your transcript here..."
            style={{ width: '100%' }}
          />
        </label>
        <div>Word count: {wordCount}</div>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
        <button type="submit" style={{ marginTop: 16 }} disabled={isSubmitDisabled}>
          {loading ? 'Uploading...' : 'Submit'}
        </button>
      </form>
    </main>
  );
} 