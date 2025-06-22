import React from 'react';
import UploadForm from '../components/UploadForm';

const Upload: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-grow flex items-center justify-center">
        <UploadForm />
      </div>
    </div>
  );
};

export default Upload; 