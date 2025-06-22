import React, { useCallback, useState } from 'react';
import { Button } from './ui/button';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

interface FileUploadAreaProps {
  onFileUpload: (file: File | null) => void;
  error: string | null;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({ onFileUpload, error }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    const allowedTypes = ['.md', '.txt', '.vtt'];
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      return `Invalid file type. Please upload ${allowedTypes.join(', ')} files only.`;
    }
    
    if (file.size > maxSize) {
      return 'File size exceeds 2MB limit. Please choose a smaller file.';
    }
    
    return null;
  };

  const handleFileSelection = useCallback((file: File) => {
    const validation = validateFile(file);
    
    if (validation) {
      setFileError(validation);
      setUploadedFile(null);
      onFileUpload(null);
    } else {
      setFileError(null);
      setUploadedFile(file);
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  }, [handleFileSelection]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200 ${
          isDragOver 
            ? 'border-brand-primary bg-brand-primary/5' 
            : uploadedFile 
              ? 'border-brand-accent bg-brand-accent/5' 
              : fileError
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 hover:border-brand-secondary bg-gray-50'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
      >
        {uploadedFile ? (
          <div className="space-y-3">
            <CheckCircle className="mx-auto h-12 w-12 text-brand-accent" />
            <div>
              <p className="text-lg font-semibold text-brand-accent">File uploaded successfully!</p>
              <p className="text-sm text-gray-600 mt-1">{uploadedFile.name}</p>
              <p className="text-xs text-gray-500">{formatFileSize(uploadedFile.size)}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setUploadedFile(null);
                onFileUpload(null);
                setFileError(null);
              }}
            >
              Choose Different File
            </Button>
          </div>
        ) : fileError ? (
          <div className="space-y-3">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
            <div>
              <p className="text-lg font-semibold text-red-600">Upload Error</p>
              <p className="text-sm text-red-600 mt-1">{fileError}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className={`mx-auto h-12 w-12 ${isDragOver ? 'text-brand-primary' : 'text-gray-400'}`} />
            <div>
              <p className="text-lg font-semibold text-gray-700">
                {isDragOver ? 'Drop your file here' : 'Drag and drop your transcript file'}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Supported formats: .md, .txt, .vtt • Maximum size: 2MB
              </p>
            </div>
          </div>
        )}
      </div>

      {!uploadedFile && !fileError && (
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>
          
          <div className="mt-4">
            <label htmlFor="file-upload">
              <Button variant="outline" className="cursor-pointer" asChild>
                <span>
                  <Upload className="mr-2 h-4 w-4" />
                  Select a file
                </span>
              </Button>
              <input
                id="file-upload"
                type="file"
                accept=".md,.txt,.vtt"
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadArea;
