import React from 'react';
import { FileText, Download, Save } from 'lucide-react';

interface HeaderProps {
  onSave: () => void;
  onDownload: () => void;
  isLoading?: boolean;
}

export default function Header({ onSave, onDownload, isLoading }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Resume Editor</h1>
              <p className="text-sm text-gray-500">AI-Powered Resume Builder</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onSave}
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Resume
            </button>
            
            <button
              onClick={onDownload}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
            >
              <Download className="h-4 w-4 mr-2" />
              Download JSON
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}