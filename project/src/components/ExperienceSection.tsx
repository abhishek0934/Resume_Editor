import React from 'react';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { Experience } from '../types/resume';
import AIEnhanceButton from './AIEnhanceButton';
import { api } from '../services/api';

interface ExperienceSectionProps {
  experience: Experience[];
  onChange: (experience: Experience[]) => void;
}

export default function ExperienceSection({ experience, onChange }: ExperienceSectionProps) {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    onChange([...experience, newExperience]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    const updated = experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onChange(updated);
  };

  const removeExperience = (id: string) => {
    onChange(experience.filter(exp => exp.id !== id));
  };

  const enhanceDescription = async (id: string, description: string) => {
    try {
      const enhanced = await api.enhanceWithAI('experience', description);
      updateExperience(id, 'description', enhanced);
    } catch (error) {
      console.error('Failed to enhance experience:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
          Work Experience
        </h2>
        <button
          onClick={addExperience}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </button>
      </div>

      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={exp.id} className="border border-gray-200 rounded-lg p-4 relative">
            {experience.length > 1 && (
              <button
                onClick={() => removeExperience(exp.id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Company name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position
                </label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Job title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Present"
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <AIEnhanceButton 
                  onEnhance={() => enhanceDescription(exp.id, exp.description)}
                  className="text-xs"
                />
              </div>
              <textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                placeholder="Describe your responsibilities and achievements..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}