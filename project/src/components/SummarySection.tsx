import React from 'react';
import { FileText } from 'lucide-react';
import AIEnhanceButton from './AIEnhanceButton';
import { api } from '../services/api';

interface SummarySectionProps {
  summary: string;
  onChange: (value: string) => void;
}

export default function SummarySection({ summary, onChange }: SummarySectionProps) {
  const handleEnhance = async () => {
    try {
      const enhanced = await api.enhanceWithAI('summary', summary);
      onChange(enhanced);
    } catch (error) {
      console.error('Failed to enhance summary:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-blue-600" />
          Professional Summary
        </h2>
        <AIEnhanceButton onEnhance={handleEnhance} />
      </div>
      
      <textarea
        value={summary}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
        placeholder="Write a brief summary of your professional background and career objectives..."
      />
    </div>
  );
}