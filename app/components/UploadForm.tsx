'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import FileUploadArea from './FileUploadArea';
import TextPasteArea from './TextPasteArea';
import UrlInputField from './UrlInputField';
import { Button } from './ui/button';
import ErrorMessage from './ErrorMessage';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_WORDS = 15000;
const ALLOWED_TYPES = ['text/markdown', 'text/plain', 'text/vtt', '.md', '.txt', '.vtt'];


const UploadForm = () => {
    const [file, setFile] = useState<File | null>(null);
    const [text, setText] = useState<string>('');
    const [wordCount, setWordCount] = useState<number>(0);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string>('');
  const [activeTab, setActiveTab] = useState('file');
  const [canonicalUrl, setCanonicalUrl] = useState('');

    const handleFileChange = (uploadedFile: File | null) => {
        setError('');
        setSuccess('');

        if (uploadedFile) {
            // Validate file type
            if (!ALLOWED_TYPES.some(type => uploadedFile.type === type || uploadedFile.name.endsWith(type.replace('text/', '.')))) {
                setError('Invalid file type. Only .md, .txt, .vtt allowed.');
                setFile(null);
                return;
            }
            // Validate file size
            if (uploadedFile.size > MAX_FILE_SIZE) {
                setError('File is too large (max 2MB).');
                setFile(null);
                return;
            }
            setFile(uploadedFile);
            setText('');
            setWordCount(0);
        } else {
            setFile(null);
        }
    };

    const handleTextChange = (value: string) => {
        setError('');
        setSuccess('');
        const words = value.trim().split(/\s+/).filter(Boolean);
        setText(value);
        setWordCount(words.length);
        setFile(null);
        if (words.length > MAX_WORDS) {
            setError('Text exceeds 15,000 word limit.');
        }
  };

    const handleSubmit = async (e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
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
        (activeTab === 'file' && !file) ||
        (activeTab === 'text' && (!text || wordCount > MAX_WORDS)) ||
        error !== '';


  return (
    <Card className="shadow-lg border-0">
      <CardContent className="p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger 
              value="file" 
                            className="data-[state=active]:bg-white data-[state=active]:text-brand-primary data-[state=active]:shadow-sm font-medium data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-500"
            >
              📄 Upload File
            </TabsTrigger>
            <TabsTrigger 
              value="text" 
                            className="data-[state=active]:bg-white data-[state=active]:text-brand-primary data-[state=active]:shadow-sm font-medium data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-500"
            >
              📝 Paste Text
            </TabsTrigger>
          </TabsList>

          <TabsContent value="file" className="space-y-6">
                        <FileUploadArea onFileUpload={handleFileChange} error={error} />
          </TabsContent>

          <TabsContent value="text" className="space-y-6">
                        <TextPasteArea onTextChange={handleTextChange} error={error} />
                        <div>Word count: {wordCount}</div>
          </TabsContent>

          <div className="space-y-6 pt-4 border-t border-gray-200">
            <UrlInputField 
              value={canonicalUrl} 
              onChange={setCanonicalUrl}
              error={error}
            />

            {error && <ErrorMessage message={error} />}
                        {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}


            <div className="flex justify-center">
              <Button 
                                onClick={handleSubmit}
                                disabled={isSubmitDisabled}
                className="px-12 py-3 text-lg font-semibold bg-brand-primary hover:bg-brand-primary/90 text-white"
              >
                                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Processing...
                  </>
                ) : (
                  'Process Transcript'
                )}
              </Button>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UploadForm;
