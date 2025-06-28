import React, { useState } from 'react';
import { Award, Plus, X } from 'lucide-react';
import AIEnhanceButton from './AIEnhanceButton';
import { api } from '../services/api';

interface SkillsSectionProps {
  skills: string[];
  onChange: (skills: string[]) => void;
}

export default function SkillsSection({ skills, onChange }: SkillsSectionProps) {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onChange([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addSkill();
    }
  };

  const enhanceSkills = async () => {
    try {
      const skillsText = skills.join(', ');
      const enhanced = await api.enhanceWithAI('skills', skillsText);
      const enhancedSkills = enhanced.split(',').map(skill => skill.trim()).filter(Boolean);
      onChange(enhancedSkills);
    } catch (error) {
      console.error('Failed to enhance skills:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Award className="h-5 w-5 mr-2 text-blue-600" />
          Skills
        </h2>
        <AIEnhanceButton onEnhance={enhanceSkills} />
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="ml-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          placeholder="Add a skill..."
        />
        <button
          onClick={addSkill}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}