import { Resume } from '../types/resume';

export const getMockResume = (): Resume => ({
  name: "John Smith",
  email: "john.smith@email.com",
  phone: "+1 (555) 123-4567",
  summary: "Experienced software developer with 5+ years in full-stack development. Passionate about creating scalable web applications and leading development teams.",
  experience: [
    {
      id: "1",
      company: "Tech Solutions Inc.",
      position: "Senior Software Developer",
      startDate: "2021-01",
      endDate: "Present",
      description: "Lead development of React applications and microservices architecture. Mentored junior developers and improved team productivity by 30%."
    },
    {
      id: "2",
      company: "Digital Innovations",
      position: "Software Developer",
      startDate: "2019-06",
      endDate: "2020-12",
      description: "Developed and maintained web applications using React, Node.js, and PostgreSQL. Collaborated with cross-functional teams to deliver high-quality software solutions."
    }
  ],
  education: [
    {
      id: "1",
      institution: "University of Technology",
      degree: "Bachelor of Science",
      field: "Computer Science",
      graduationDate: "2019-05",
      gpa: "3.8"
    }
  ],
  skills: [
    "JavaScript", "TypeScript", "React", "Node.js", "Python", "PostgreSQL", 
    "MongoDB", "Docker", "AWS", "Git", "Agile Development"
  ]
});