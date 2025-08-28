"""
AI-powered resume parsing and matching system
Uses spaCy for NLP processing and skill extraction
"""

import spacy
import json
import re
from typing import Dict, List, Tuple, Any
from datetime import datetime
import PyPDF2
import docx
from io import BytesIO

# Load spaCy model (requires: python -m spacy download en_core_web_sm)
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    print("spaCy model not found. Please install with: python -m spacy download en_core_web_sm")
    nlp = None

class ResumeParser:
    def __init__(self):
        self.skills_database = {
            "programming_languages": [
                "python", "javascript", "java", "c++", "c#", "ruby", "php", "go", "rust", "swift",
                "kotlin", "typescript", "scala", "r", "matlab", "perl", "shell", "bash"
            ],
            "web_technologies": [
                "html", "css", "react", "angular", "vue", "node.js", "express", "django", "flask",
                "spring", "laravel", "rails", "next.js", "nuxt.js", "svelte", "jquery", "bootstrap",
                "tailwind", "sass", "less", "webpack", "vite", "parcel"
            ],
            "databases": [
                "mysql", "postgresql", "mongodb", "redis", "elasticsearch", "sqlite", "oracle",
                "sql server", "cassandra", "dynamodb", "firebase", "supabase", "prisma"
            ],
            "cloud_platforms": [
                "aws", "azure", "gcp", "google cloud", "heroku", "vercel", "netlify", "digitalocean",
                "kubernetes", "docker", "terraform", "ansible", "jenkins", "gitlab ci", "github actions"
            ],
            "data_science": [
                "pandas", "numpy", "scikit-learn", "tensorflow", "pytorch", "keras", "matplotlib",
                "seaborn", "plotly", "jupyter", "tableau", "power bi", "spark", "hadoop", "airflow"
            ],
            "soft_skills": [
                "leadership", "communication", "teamwork", "problem solving", "project management",
                "agile", "scrum", "mentoring", "collaboration", "analytical thinking", "creativity"
            ]
        }
        
        # Flatten skills for easier matching
        self.all_skills = []
        for category, skills in self.skills_database.items():
            self.all_skills.extend(skills)
    
    def extract_text_from_pdf(self, pdf_content: bytes) -> str:
        """Extract text from PDF resume"""
        try:
            pdf_reader = PyPDF2.PdfReader(BytesIO(pdf_content))
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
            return text
        except Exception as e:
            print(f"Error extracting PDF text: {e}")
            return ""
    
    def extract_text_from_docx(self, docx_content: bytes) -> str:
        """Extract text from DOCX resume"""
        try:
            doc = docx.Document(BytesIO(docx_content))
            text = ""
            for paragraph in doc.paragraphs:
                text += paragraph.text + "\n"
            return text
        except Exception as e:
            print(f"Error extracting DOCX text: {e}")
            return ""
    
    def extract_contact_info(self, text: str) -> Dict[str, str]:
        """Extract contact information from resume text"""
        contact_info = {}
        
        # Email extraction
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        emails = re.findall(email_pattern, text)
        if emails:
            contact_info['email'] = emails[0]
        
        # Phone extraction
        phone_pattern = r'(\+?1[-.\s]?)?$$?([0-9]{3})$$?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})'
        phones = re.findall(phone_pattern, text)
        if phones:
            contact_info['phone'] = ''.join(phones[0])
        
        # LinkedIn extraction
        linkedin_pattern = r'linkedin\.com/in/[\w-]+'
        linkedin_matches = re.findall(linkedin_pattern, text.lower())
        if linkedin_matches:
            contact_info['linkedin'] = f"https://{linkedin_matches[0]}"
        
        return contact_info
    
    def extract_skills(self, text: str) -> List[str]:
        """Extract skills from resume text using NLP and keyword matching"""
        if not nlp:
            return []
        
        text_lower = text.lower()
        found_skills = []
        
        # Direct keyword matching
        for skill in self.all_skills:
            if skill.lower() in text_lower:
                found_skills.append(skill.title())
        
        # NLP-based extraction for more complex patterns
        doc = nlp(text)
        
        # Look for skill patterns in noun phrases
        for chunk in doc.noun_chunks:
            chunk_text = chunk.text.lower()
            for skill in self.all_skills:
                if skill.lower() in chunk_text and skill.title() not in found_skills:
                    found_skills.append(skill.title())
        
        return list(set(found_skills))  # Remove duplicates
    
    def extract_experience(self, text: str) -> Dict[str, Any]:
        """Extract work experience information"""
        experience_info = {
            'total_years': 0,
            'positions': []
        }
        
        # Look for year patterns to estimate experience
        year_pattern = r'\b(19|20)\d{2}\b'
        years = [int(year) for year in re.findall(year_pattern, text)]
        
        if years:
            current_year = datetime.now().year
            min_year = min(years)
            # Estimate total experience (rough calculation)
            experience_info['total_years'] = max(0, current_year - min_year)
        
        # Extract job titles (simplified pattern matching)
        title_patterns = [
            r'(senior|lead|principal|staff)\s+(developer|engineer|manager|designer|analyst)',
            r'(software|web|frontend|backend|full.?stack)\s+(developer|engineer)',
            r'(product|project|program)\s+manager',
            r'(data|business)\s+(scientist|analyst)',
            r'(ux|ui)\s+designer'
        ]
        
        positions = []
        for pattern in title_patterns:
            matches = re.findall(pattern, text.lower())
            for match in matches:
                title = ' '.join(match).title()
                if title not in positions:
                    positions.append(title)
        
        experience_info['positions'] = positions
        return experience_info
    
    def extract_education(self, text: str) -> Dict[str, Any]:
        """Extract education information"""
        education_info = {
            'degrees': [],
            'institutions': [],
            'fields': []
        }
        
        # Degree patterns
        degree_patterns = [
            r'\b(bachelor|master|phd|doctorate|associate)\s*(of|in)?\s*(science|arts|engineering|business|computer)',
            r'\b(bs|ba|ms|ma|mba|phd)\b',
            r'\b(b\.s\.|b\.a\.|m\.s\.|m\.a\.|ph\.d\.)\b'
        ]
        
        for pattern in degree_patterns:
            matches = re.findall(pattern, text.lower())
            for match in matches:
                degree = ' '.join(match) if isinstance(match, tuple) else match
                education_info['degrees'].append(degree.title())
        
        # University/College patterns
        university_pattern = r'\b(university|college|institute|school)\s+of\s+\w+|\w+\s+(university|college|institute)'
        universities = re.findall(university_pattern, text.lower())
        education_info['institutions'] = [uni[0] if isinstance(uni, tuple) else uni for uni in universities]
        
        return education_info

class JobMatcher:
    def __init__(self):
        self.parser = ResumeParser()
    
    def calculate_skill_match(self, resume_skills: List[str], job_skills: List[str]) -> float:
        """Calculate skill matching percentage"""
        if not job_skills:
            return 0.0
        
        resume_skills_lower = [skill.lower() for skill in resume_skills]
        job_skills_lower = [skill.lower() for skill in job_skills]
        
        matched_skills = set(resume_skills_lower) & set(job_skills_lower)
        return (len(matched_skills) / len(job_skills_lower)) * 100
    
    def calculate_experience_match(self, resume_experience: int, required_experience: int) -> float:
        """Calculate experience matching percentage"""
        if required_experience == 0:
            return 100.0
        
        if resume_experience >= required_experience:
            return 100.0
        else:
            return (resume_experience / required_experience) * 100
    
    def calculate_overall_score(self, skill_match: float, experience_match: float, 
                              education_match: float, weights: Dict[str, float] = None) -> float:
        """Calculate overall matching score"""
        if weights is None:
            weights = {'skills': 0.4, 'experience': 0.35, 'education': 0.25}
        
        overall_score = (
            skill_match * weights['skills'] +
            experience_match * weights['experience'] +
            education_match * weights['education']
        )
        
        return min(100.0, overall_score)
    
    def match_resume_to_job(self, resume_text: str, job_requirements: Dict[str, Any]) -> Dict[str, Any]:
        """Match a resume against job requirements"""
        # Parse resume
        contact_info = self.parser.extract_contact_info(resume_text)
        skills = self.parser.extract_skills(resume_text)
        experience = self.parser.extract_experience(resume_text)
        education = self.parser.extract_education(resume_text)
        
        # Calculate matches
        skill_match = self.calculate_skill_match(skills, job_requirements.get('required_skills', []))
        experience_match = self.calculate_experience_match(
            experience['total_years'], 
            job_requirements.get('min_experience', 0)
        )
        
        # Simple education match (can be enhanced)
        education_match = 80.0 if education['degrees'] else 60.0
        
        # Calculate overall score
        overall_score = self.calculate_overall_score(skill_match, experience_match, education_match)
        
        # Find matched and missing skills
        resume_skills_lower = [skill.lower() for skill in skills]
        job_skills_lower = [skill.lower() for skill in job_requirements.get('required_skills', [])]
        
        matched_skills = [skill for skill in job_requirements.get('required_skills', []) 
                         if skill.lower() in resume_skills_lower]
        missing_skills = [skill for skill in job_requirements.get('required_skills', []) 
                         if skill.lower() not in resume_skills_lower]
        
        return {
            'contact_info': contact_info,
            'skills': skills,
            'experience': experience,
            'education': education,
            'scores': {
                'overall': round(overall_score, 1),
                'skills_match': round(skill_match, 1),
                'experience_match': round(experience_match, 1),
                'education_match': round(education_match, 1)
            },
            'matched_skills': matched_skills,
            'missing_skills': missing_skills,
            'summary': self.generate_summary(overall_score, matched_skills, missing_skills)
        }
    
    def generate_summary(self, overall_score: float, matched_skills: List[str], 
                        missing_skills: List[str]) -> str:
        """Generate a summary of the candidate match"""
        if overall_score >= 85:
            base = "Excellent candidate with strong alignment to job requirements."
        elif overall_score >= 70:
            base = "Good candidate with solid qualifications for the role."
        else:
            base = "Candidate may need additional training or experience."
        
        if matched_skills:
            skills_text = f" Strong in {', '.join(matched_skills[:3])}."
        else:
            skills_text = ""
        
        if missing_skills:
            missing_text = f" Would benefit from experience in {', '.join(missing_skills[:2])}."
        else:
            missing_text = ""
        
        return base + skills_text + missing_text

# Example usage
def process_resume_batch(resumes: List[Dict], job_requirements: Dict) -> List[Dict]:
    """Process multiple resumes against job requirements"""
    matcher = JobMatcher()
    results = []
    
    for resume_data in resumes:
        try:
            # Extract text based on file type
            if resume_data['file_type'] == 'pdf':
                text = matcher.parser.extract_text_from_pdf(resume_data['content'])
            elif resume_data['file_type'] == 'docx':
                text = matcher.parser.extract_text_from_docx(resume_data['content'])
            else:
                text = resume_data['content']  # Plain text
            
            # Match against job
            match_result = matcher.match_resume_to_job(text, job_requirements)
            match_result['candidate_id'] = resume_data['candidate_id']
            match_result['candidate_name'] = resume_data['candidate_name']
            
            results.append(match_result)
            
        except Exception as e:
            print(f"Error processing resume for {resume_data.get('candidate_name', 'Unknown')}: {e}")
            continue
    
    # Sort by overall score
    results.sort(key=lambda x: x['scores']['overall'], reverse=True)
    return results

# Example job requirements
sample_job_requirements = {
    'title': 'Senior Frontend Developer',
    'required_skills': ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Jest'],
    'preferred_skills': ['Node.js', 'AWS', 'Docker'],
    'min_experience': 5,
    'education_required': True
}

# Example usage
if __name__ == "__main__":
    # Sample resume text for testing
    sample_resume = """
    John Doe
    Senior Frontend Developer
    john.doe@email.com
    (555) 123-4567
    linkedin.com/in/johndoe
    
    EXPERIENCE
    Senior Frontend Developer at TechCorp (2020-Present)
    - Developed React applications using TypeScript and Next.js
    - Implemented GraphQL APIs and wrote comprehensive Jest tests
    - Led a team of 5 developers in agile environment
    
    Frontend Developer at StartupABC (2018-2020)
    - Built responsive web applications using React and JavaScript
    - Collaborated with design team on UI/UX improvements
    
    EDUCATION
    Bachelor of Science in Computer Science
    University of Technology (2014-2018)
    
    SKILLS
    React, TypeScript, Next.js, GraphQL, Jest, Node.js, HTML, CSS, JavaScript
    """
    
    matcher = JobMatcher()
    result = matcher.match_resume_to_job(sample_resume, sample_job_requirements)
    
    print("Resume Matching Result:")
    print(f"Overall Score: {result['scores']['overall']}%")
    print(f"Skills Match: {result['scores']['skills_match']}%")
    print(f"Experience Match: {result['scores']['experience_match']}%")
    print(f"Matched Skills: {', '.join(result['matched_skills'])}")
    print(f"Missing Skills: {', '.join(result['missing_skills'])}")
    print(f"Summary: {result['summary']}")
