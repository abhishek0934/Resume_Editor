const API_BASE_URL = 'http://localhost:8000';

export const api = {
  async enhanceWithAI(section: string, content: string): Promise<string> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai-enhance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ section, content }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to enhance content');
      }
      
      const data = await response.json();
      return data.enhanced_content;
    } catch (error) {
      console.error('AI Enhancement error:', error);
      throw error;
    }
  },

  async saveResume(resume: any): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/save-resume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resume),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save resume');
      }
    } catch (error) {
      console.error('Save resume error:', error);
      throw error;
    }
  }
};