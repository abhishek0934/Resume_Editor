import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface AIEnhanceButtonProps {
  onEnhance: () => Promise<void>;
  className?: string;
}

export default function AIEnhanceButton({ onEnhance, className = '' }: AIEnhanceButtonProps) {
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleEnhance = async () => {
    setIsEnhancing(true);
    try {
      await onEnhance();
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <button
      onClick={handleEnhance}
      disabled={isEnhancing}
      className={`inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-xs font-medium hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 ${className}`}
    >
      {isEnhancing ? (
        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
      ) : (
        <Sparkles className="h-3 w-3 mr-1" />
      )}
      {isEnhancing ? 'Enhancing...' : 'Enhance with AI'}
    </button>
  );
}