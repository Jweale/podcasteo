import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Link } from 'lucide-react';

interface UrlInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  error: string | null;
}

const UrlInputField: React.FC<UrlInputFieldProps> = ({ value, onChange, error }) => {
  const isValidUrl = (url: string): boolean => {
    if (!url.trim()) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const showValidation = value.trim() && !isValidUrl(value);

  return (
    <div className="space-y-2">
      <Label htmlFor="canonical-url" className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Link className="h-4 w-4" />
        Original Episode URL *
      </Label>
      
      <Input
        id="canonical-url"
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://example.com/podcast/episode-123"
        className={`${
          showValidation ? 'border-amber-300 focus:border-amber-500' : ''
        }`}
      />
      
      <div className="text-sm text-gray-600">
        <p>Provide the URL where this podcast episode was originally published for proper attribution.</p>
      </div>

      {showValidation && (
        <p className="text-sm text-amber-600">
          Please enter a valid URL (e.g., https://example.com/episode)
        </p>
      )}
    </div>
  );
};

export default UrlInputField;
