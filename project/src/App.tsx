import React, { useState } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import PersonalInfo from './components/PersonalInfo';
import SummarySection from './components/SummarySection';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';
import { Resume } from './types/resume';
import { getMockResume } from './data/mockResume';
import { api } from './services/api';

export default function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resume, setResume] = useState<Resume>(getMockResume());

  const handleFileUpload = () => {
    setResume(getMockResume());
    setIsEditing(true);
  };

  const updateResumeField = (field: keyof Resume, value: any) => {
    setResume(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await api.saveResume(resume);
      // Show success notification
      alert('Resume saved successfully!');
    } catch (error) {
      alert('Failed to save resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify(resume, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `resume_${resume.name.replace(/\s+/g, '_').toLowerCase()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (!isEditing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header onSave={handleSave} onDownload={handleDownload} isLoading={isLoading} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Build Your Perfect Resume
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upload your existing resume or start fresh. Our AI-powered editor will help you create a compelling, professional resume that stands out.
            </p>
          </div>
          
          <FileUpload onFileUpload={handleFileUpload} />
          
          <div className="mt-16 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="p-6">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Upload Resume</h3>
                <p className="text-gray-600 text-sm">Upload your existing resume or start with our template</p>
              </div>
              
              <div className="p-6">
                <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Edit & Enhance</h3>
                <p className="text-gray-600 text-sm">Use our AI-powered tools to enhance your content</p>
              </div>
              
              <div className="p-6">
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Download</h3>
                <p className="text-gray-600 text-sm">Save and download your polished resume</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header onSave={handleSave} onDownload={handleDownload} isLoading={isLoading} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <PersonalInfo
            name={resume.name}
            email={resume.email}
            phone={resume.phone}
            onChange={updateResumeField}
          />
          
          <SummarySection
            summary={resume.summary}
            onChange={(value) => updateResumeField('summary', value)}
          />
          
          <ExperienceSection
            experience={resume.experience}
            onChange={(value) => updateResumeField('experience', value)}
          />
          
          <EducationSection
            education={resume.education}
            onChange={(value) => updateResumeField('education', value)}
          />
          
          <SkillsSection
            skills={resume.skills}
            onChange={(value) => updateResumeField('skills', value)}
          />
        </div>
      </main>
    </div>
  );
}