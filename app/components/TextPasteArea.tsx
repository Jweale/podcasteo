import React, { useState, useEffect } from 'react';
import { Textarea } from './ui/textarea';
import { AlertCircle, Type } from 'lucide-react';

interface TextPasteAreaProps {
  onTextChange: (text: string) => void;
  error: string | null;
}

const TextPasteArea: React.FC<TextPasteAreaProps> = ({ onTextChange, error }) => {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [textError, setTextError] = useState<string | null>(null);

  const MAX_WORDS = 15000;

  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    setWordCount(words);

    if (words > MAX_WORDS) {
      setTextError(`Text exceeds the ${MAX_WORDS.toLocaleString()} word limit. Please reduce the content.`);
    } else {
      setTextError(null);
    }

    onTextChange(text);
  }, [text, onTextChange]);

  const getWordCountColor = () => {
    const percentage = (wordCount / MAX_WORDS) * 100;
    if (percentage >= 100) return 'text-red-600';
    if (percentage >= 90) return 'text-amber-600';
    return 'text-gray-600';
  };

  const getWordCountBackground = () => {
    const percentage = (wordCount / MAX_WORDS) * 100;
    if (percentage >= 100) return 'bg-red-50 border-red-200';
    if (percentage >= 90) return 'bg-amber-50 border-amber-200';
    return 'bg-gray-50 border-gray-200';
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Type className="h-4 w-4" />
          Paste Your Transcript
        </div>
        
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your podcast transcript here. The text should be the spoken content from your podcast episode..."
          className={`min-h-[300px] resize-y ${
            textError ? 'border-red-300 focus:border-red-500' : ''
          }`}
        />
      </div>

      <div className={`flex items-center justify-between p-3 rounded-lg border ${getWordCountBackground()}`}>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Word Count:</span>
          <span className={`text-lg font-bold ${getWordCountColor()}`}>
            {wordCount.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">
            / {MAX_WORDS.toLocaleString()} words
          </span>
        </div>

        {wordCount > 0 && (
          <div className="flex items-center gap-2">
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  wordCount >= MAX_WORDS 
                    ? 'bg-red-500' 
                    : wordCount >= MAX_WORDS * 0.9 
                      ? 'bg-amber-500' 
                      : 'bg-brand-accent'
                }`}
                style={{ width: `${Math.min((wordCount / MAX_WORDS) * 100, 100)}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">
              {Math.round((wordCount / MAX_WORDS) * 100)}%
            </span>
          </div>
        )}
      </div>

      {textError && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-600">{textError}</p>
        </div>
      )}

      {wordCount > 0 && !textError && (
        <div className="text-sm text-gray-600">
          <p>✓ Ready to process. Estimated reading time: ~{Math.ceil(wordCount / 200)} minutes</p>
        </div>
      )}
    </div>
  );
};

export default TextPasteArea;
