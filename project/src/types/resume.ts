export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  gpa?: string;
}

export interface Resume {
  name: string;
  email: string;
  phone: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
}

export interface AIEnhanceRequest {
  section: string;
  content: string;
}

export interface AIEnhanceResponse {
  enhanced_content: string;
}