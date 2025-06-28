# Resume Editor - AI-Powered Resume Builder

A full-stack web application that allows users to upload, edit, and enhance their resumes using AI-powered suggestions.

## Features

- **Resume Upload**: Upload PDF or DOCX files (simulated with mock data)
- **Interactive Editing**: Edit all resume sections with a modern, intuitive interface
- **AI Enhancement**: Improve resume content using AI-powered suggestions
- **Save & Load**: Save resume data and retrieve it later
- **JSON Export**: Download completed resumes as JSON files
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons

### Backend
- **FastAPI** (Python)
- **Pydantic** for data validation
- **Uvicorn** ASGI server
- **CORS** middleware for cross-origin requests

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Start the FastAPI server:
```bash
python main.py
```

Or use uvicorn directly:
```bash
uvicorn main:app --reload --port 8000
```

The backend API will be available at `http://localhost:8000`

### Running Both Services

For convenience, you can start the backend from the frontend directory:
```bash
npm run backend
```

## API Endpoints

### POST /ai-enhance
Enhance resume content using AI suggestions.

**Request Body:**
```json
{
  "section": "summary",
  "content": "Experienced developer with..."
}
```

**Response:**
```json
{
  "enhanced_content": "Dynamic and results-driven professional with proven expertise in..."
}
```

### POST /save-resume
Save complete resume data.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567",
  "summary": "Professional summary...",
  "experience": [...],
  "education": [...],
  "skills": [...]
}
```

### GET /resume/{resume_id}
Retrieve a saved resume by email ID.

### GET /resumes
List all saved resumes.

## File Structure

```
resume-editor/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── FileUpload.tsx
│   │   │   ├── PersonalInfo.tsx
│   │   │   ├── SummarySection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── EducationSection.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   └── AIEnhanceButton.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── resume.ts
│   │   ├── data/
│   │   │   └── mockResume.ts
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── data/ (created automatically)
└── README.md
```

## Usage

1. **Upload Resume**: Click the upload area or drag & drop a resume file (simulation uses mock data)
2. **Edit Sections**: Use the intuitive forms to edit personal information, summary, experience, education, and skills
3. **AI Enhancement**: Click "Enhance with AI" buttons to improve content quality
4. **Save Progress**: Use the "Save Resume" button to persist your changes
5. **Download**: Export your completed resume as a JSON file

## Mock AI Enhancement

The AI enhancement feature uses intelligent mock responses:

- **Summary**: Expands basic descriptions into professional summaries
- **Experience**: Adds impact-oriented bullet points and achievements
- **Skills**: Suggests related technologies and organizes skills effectively

## Assumptions

- File upload is simulated - actual parsing is replaced with mock resume data
- AI enhancement uses mock responses instead of real AI services
- Data persistence uses in-memory storage and local files (no database required)
- CORS is configured for local development (localhost:5173)

## Development Notes

- The application uses TypeScript for type safety
- Components are organized with clear separation of concerns
- Responsive design works across all device sizes
- Error handling is implemented for all API calls
- The design follows modern UI/UX principles with smooth animations

## Future Enhancements

- Real file parsing for PDF/DOCX files
- Integration with actual AI services (OpenAI, etc.)
- Database integration for persistent storage
- PDF generation for resume downloads
- User authentication and multi-resume management
- Template selection and customization
- Real-time collaboration features

## License

This project is for educational and demonstration purposes.