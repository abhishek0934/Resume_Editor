from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Any
import json
import os

app = FastAPI(title="Resume Editor API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for saved resumes
saved_resumes = {}

class AIEnhanceRequest(BaseModel):
    section: str
    content: str

class AIEnhanceResponse(BaseModel):
    enhanced_content: str

class Experience(BaseModel):
    id: str
    company: str
    position: str
    startDate: str
    endDate: str
    description: str

class Education(BaseModel):
    id: str
    institution: str
    degree: str
    field: str
    graduationDate: str
    gpa: Optional[str] = ""

class Resume(BaseModel):
    name: str
    email: str
    phone: str
    summary: str
    experience: List[Experience]
    education: List[Education]
    skills: List[str]

@app.get("/")
async def root():
    return {"message": "Resume Editor API is running"}

@app.post("/ai-enhance", response_model=AIEnhanceResponse)
async def enhance_with_ai(request: AIEnhanceRequest):
    """
    Mock AI enhancement endpoint that improves the provided content.
    In a real implementation, this would integrate with an AI service like OpenAI GPT.
    """
    try:
        section = request.section.lower()
        content = request.content.strip()
        
        if not content:
            raise HTTPException(status_code=400, detail="Content cannot be empty")
        
        # Mock enhancement logic based on section type
        enhanced_content = ""
        
        if section == "summary":
            enhanced_content = f"Dynamic and results-driven professional with proven expertise in {content.lower()}. Demonstrates exceptional problem-solving abilities and leadership skills, with a track record of delivering high-impact solutions and driving organizational success through innovative approaches and collaborative teamwork."
            
        elif section == "experience":
            enhanced_content = f"• {content}\n• Collaborated with cross-functional teams to drive project success and exceed performance metrics\n• Implemented best practices and innovative solutions that resulted in improved efficiency and quality\n• Mentored team members and contributed to a positive, productive work environment"
            
        elif section == "skills":
            # For skills, we'll add some related technologies and organize them
            skills_list = [skill.strip() for skill in content.split(',')]
            enhanced_skills = []
            
            for skill in skills_list:
                enhanced_skills.append(skill)
                
                # Add related technologies based on the skill
                if 'javascript' in skill.lower():
                    enhanced_skills.extend(['ES6+', 'TypeScript'])
                elif 'react' in skill.lower():
                    enhanced_skills.extend(['Redux', 'React Hooks', 'JSX'])
                elif 'python' in skill.lower():
                    enhanced_skills.extend(['Django', 'Flask', 'Pandas'])
                elif 'node' in skill.lower():
                    enhanced_skills.extend(['Express.js', 'NPM'])
                elif 'docker' in skill.lower():
                    enhanced_skills.extend(['Kubernetes', 'Container Orchestration'])
                elif 'aws' in skill.lower():
                    enhanced_skills.extend(['EC2', 'S3', 'Lambda'])
            
            # Remove duplicates while preserving order
            seen = set()
            unique_skills = []
            for skill in enhanced_skills:
                if skill not in seen:
                    unique_skills.append(skill)
                    seen.add(skill)
            
            enhanced_content = ', '.join(unique_skills)
            
        else:
            # Generic enhancement for other sections
            enhanced_content = f"Enhanced: {content} - Leveraging industry best practices and innovative approaches to deliver exceptional results."
        
        return AIEnhanceResponse(enhanced_content=enhanced_content)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Enhancement failed: {str(e)}")

@app.post("/save-resume")
async def save_resume(resume: Resume):
    """
    Save resume data to in-memory storage.
    In a real implementation, this would save to a database.
    """
    try:
        # Use email as a unique identifier for the resume
        resume_id = resume.email
        
        # Convert resume to dict for storage
        resume_data = resume.dict()
        
        # Save to in-memory storage
        saved_resumes[resume_id] = resume_data
        
        # Optionally save to file for persistence across server restarts
        os.makedirs("data", exist_ok=True)
        with open(f"data/resume_{resume_id.replace('@', '_').replace('.', '_')}.json", "w") as f:
            json.dump(resume_data, f, indent=2)
        
        return {
            "message": "Resume saved successfully",
            "resume_id": resume_id,
            "timestamp": "2025-01-02T12:00:00Z"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save resume: {str(e)}")

@app.get("/resume/{resume_id}")
async def get_resume(resume_id: str):
    """
    Retrieve a saved resume by ID.
    """
    if resume_id not in saved_resumes:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    return saved_resumes[resume_id]

@app.get("/resumes")
async def list_resumes():
    """
    List all saved resumes.
    """
    return {
        "resumes": [
            {"id": resume_id, "name": data.get("name", "Unknown")}
            for resume_id, data in saved_resumes.items()
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)