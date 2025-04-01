import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://awyosxxqnqxmuoowjwyf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3eW9zeHhxbnF4bXVvb3dqd3lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MjkwMzUsImV4cCI6MjA1OTAwNTAzNX0.Omb_mkDDwhBRbk7q-Ierae9mtWOLsCoTsWqAo9syf00';
const supabase = createClient(supabaseUrl, supabaseKey);

// Affinda API configuration
const AFFINDA_API_KEY = 'aff_35922432d78218f8b5474c5674f3fc3327a13369';
const AFFINDA_API_URL = 'https://api.affinda.com/v3';

// Define types for Affinda responses
interface AffindaResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface ResumeData {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
  skills: Skill[];
  workExperience: WorkExperience[];
  education: Education[];
  certifications: Certification[];
  languages: Language[];
}

interface Skill {
  name: string;
  level?: string;
  yearsOfExperience?: number;
}

interface WorkExperience {
  jobTitle: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
  skills?: string[];
}

interface Education {
  institution: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
}

interface Certification {
  name: string;
  issuer?: string;
  date?: string;
  expirationDate?: string;
}

interface Language {
  name: string;
  proficiency?: string;
}

interface JobMatch {
  jobId: string;
  title: string;
  company: string;
  location: string;
  matchScore: number;
  matchedSkills: Skill[];
  missingSkills: Skill[];
}

// Affinda API Service
const AffindaService = {
  /**
   * Parse a resume file and extract structured data
   * @param file The resume file to parse
   * @returns Structured resume data
   */
  parseResume: async (base64Data: string, name: string, type: string, file: File): Promise<AffindaResponse<ResumeData>> => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${AFFINDA_API_URL}/resumes`, formData, {
        headers: {
          'Authorization': `Bearer ${AFFINDA_API_KEY}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Map Affinda response to our ResumeData structure
      const resumeData: ResumeData = {
        name: response.data.data.name?.raw,
        email: response.data.data.emails?.[0],
        phone: response.data.data.phoneNumbers?.[0]?.raw,
        location: response.data.data.location?.raw,
        summary: response.data.data.summary,
        skills: (response.data.data.skills || []).map((skill: any) => ({
          name: skill.name,
          level: skill.level,
          yearsOfExperience: skill.yearsOfExperience
        })),
        workExperience: (response.data.data.workExperience || []).map((exp: any) => ({
          jobTitle: exp.jobTitle?.raw || 'Unknown Position',
          company: exp.organization?.raw || 'Unknown Company',
          location: exp.location?.raw,
          startDate: exp.dates?.startDate || '',
          endDate: exp.dates?.endDate,
          description: exp.description,
          skills: exp.skills
        })),
        education: (response.data.data.education || []).map((edu: any) => ({
          institution: edu.organization?.raw || 'Unknown Institution',
          degree: edu.accreditation?.education,
          fieldOfStudy: edu.accreditation?.educationLevel,
          startDate: edu.dates?.startDate,
          endDate: edu.dates?.endDate,
          gpa: edu.grade
        })),
        certifications: (response.data.data.certifications || []).map((cert: any) => ({
          name: cert.name,
          issuer: cert.issuer,
          date: cert.date,
          expirationDate: cert.expirationDate
        })),
        languages: (response.data.data.languages || []).map((lang: any) => ({
          name: lang.name,
          proficiency: lang.proficiency
        }))
      };

      return {
        success: true,
        data: resumeData
      };
    } catch (error: any) {
      console.error('Error parsing resume:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to parse resume'
      };
    }
  },

  /**
   * Extract skills from a resume or job description text
   * @param text The text to extract skills from
   * @returns List of extracted skills
   */
  extractSkills: async (text: string): Promise<AffindaResponse<{ skills: Skill[] }>> => {
    try {
      const response = await axios.post(`${AFFINDA_API_URL}/skills/extract`, 
        { text },
        {
          headers: {
            'Authorization': `Bearer ${AFFINDA_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const skills = (response.data.data || []).map((skill: any) => ({
        name: skill.name,
        level: skill.level || undefined,
        yearsOfExperience: skill.yearsOfExperience || undefined
      }));

      return {
        success: true,
        data: { skills }
      };
    } catch (error: any) {
      console.error('Error extracting skills:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to extract skills'
      };
    }
  },

  /**
   * Match a user's resume against job postings to find suitable matches
   * @param userId The user ID to match jobs for
   * @param limit The maximum number of job matches to return
   * @returns List of job matches with match scores
   */
  matchJobs: async (userId: string, limit: number = 10): Promise<AffindaResponse<{ matches: JobMatch[] }>> => {
    try {
      // Get user's resume data from Supabase
      const { data: resumeData, error: resumeError } = await supabase
        .from('user_resumes')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (resumeError || !resumeData) {
        throw new Error('Resume not found for user');
      }

      // Get available jobs from Supabase
      const { data: jobs, error: jobsError } = await supabase
        .from('job_postings')
        .select('*')
        .eq('status', 'active')
        .limit(50);

      if (jobsError || !jobs) {
        throw new Error('Failed to fetch jobs');
      }

      // Extract user skills
      const userSkills: Skill[] = resumeData.skills || [];
      
      // Match jobs based on skills
      const matches: JobMatch[] = [];
      
      for (const job of jobs) {
        // Extract job skills if not already available
        let jobSkills: Skill[] = job.skills || [];
        
        if (!jobSkills.length && job.description) {
          const skillsResponse = await AffindaService.extractSkills(job.description);
          jobSkills = skillsResponse.data?.skills || [];
          
          // Update job with extracted skills for future use
          await supabase
            .from('job_postings')
            .update({ skills: jobSkills })
            .eq('id', job.id);
        }
        
        // Calculate match score based on skills overlap
        const matchedSkills: Skill[] = [];
        const missingSkills: Skill[] = [];
        
        // Find matching skills
        userSkills.forEach((userSkill: Skill) => {
          const matchingSkill = jobSkills.find(jobSkill => (userSkill as Skill).name.toLowerCase() === jobSkill.name.toLowerCase());
          if (matchingSkill) {
            matchedSkills.push(matchingSkill);
          }
        });
        
        // Find missing skills
        jobSkills.forEach(jobSkill => {
          const hasSkill = userSkills.some(userSkill => userSkill.name.toLowerCase() === jobSkill.name.toLowerCase());
          if (!hasSkill) {
            missingSkills.push(jobSkill);
          }
        });
        
        // Calculate match score (0-100)
        const matchScore = jobSkills.length > 0 
          ? Math.round((matchedSkills.length / jobSkills.length) * 100) 
          : 0;
        
        matches.push({
          jobId: job.id,
          title: job.title,
          company: job.company,
          location: job.location,
          matchScore,
          matchedSkills,
          missingSkills
        });
      }
      
      // Sort by match score (highest first) and limit results
      matches.sort((a, b) => b.matchScore - a.matchScore);
      const limitedMatches = matches.slice(0, limit);
      
      return {
        success: true,
        data: { matches: limitedMatches }
      };
    } catch (error: any) {
      console.error('Error matching jobs:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to match jobs'
      };
    }
  },

  /**
   * Store resume data in the database for a user
   * @param userId The user ID to store resume data for
   * @param resumeData The resume data to store
   * @returns Success status
   */
  storeResumeData: async (userId: string, resumeData: ResumeData): Promise<AffindaResponse<null>> => {
    try {
      // Check if user already has a resume
      const { data: existingResume, error: checkError } = await supabase
        .from('user_resumes')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "not found" error
        throw new Error('Failed to check existing resume');
      }

      // Update or insert resume data
      if (existingResume) {
        const { error: updateError } = await supabase
          .from('user_resumes')
          .update({
            name: resumeData.name,
            email: resumeData.email,
            phone: resumeData.phone,
            location: resumeData.location,
            summary: resumeData.summary,
            skills: resumeData.skills,
            work_experience: resumeData.workExperience,
            education: resumeData.education,
            certifications: resumeData.certifications,
            languages: resumeData.languages,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingResume.id);

        if (updateError) {
          throw new Error('Failed to update resume data');
        }
      } else {
        const { error: insertError } = await supabase
          .from('user_resumes')
          .insert({
            user_id: userId,
            name: resumeData.name,
            email: resumeData.email,
            phone: resumeData.phone,
            location: resumeData.location,
            summary: resumeData.summary,
            skills: resumeData.skills,
            work_experience: resumeData.workExperience,
            education: resumeData.education,
            certifications: resumeData.certifications,
            languages: resumeData.languages,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (insertError) {
          throw new Error('Failed to insert resume data');
        }
      }

      return {
        success: true,
        data: null
      };
    } catch (error: any) {
      console.error('Error storing resume data:', error);
      return {
        success: false,
        error: error.message || 'Failed to store resume data'
      };
    }
  }
};

export default AffindaService;
