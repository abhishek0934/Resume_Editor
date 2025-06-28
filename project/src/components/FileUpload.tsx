import React, { useCallback, useState } from 'react';
import { Upload, FileText, CheckCircle } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: () => void;
}

export default function FileUpload({ onFileUpload }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect();
  }, []);

  const handleFileSelect = () => {
    setIsUploaded(true);
    setTimeout(() => {
      onFileUpload();
    }, 1500);
  };

  if (isUploaded) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Resume Uploaded Successfully!</h3>
            <p className="text-gray-500 mt-2">Processing your resume and loading editor...</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 ${
          isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleFileSelect}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full">
            <Upload className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Upload Your Resume</h3>
            <p className="text-gray-500 mt-2">
              Drag and drop your resume file here, or click to browse
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Supports PDF and DOCX files
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <FileText className="h-4 w-4" />
              <span>PDF</span>
            </div>
            <div className="flex items-center space-x-1">
              <FileText className="h-4 w-4" />
              <span>DOCX</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}