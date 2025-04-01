import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

// OpenAI API configuration
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Response type definitions
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface CareerAdviceResponse {
  advice: string;
  nextSteps: string[];
  resources: {
    title: string;
    url?: string;
    description: string;
  }[];
}

interface SkillsGapResponse {
  currentSkills: string[];
  missingSkills: {
    skill: string;
    importance: number;
    resources: string[];
  }[];
  recommendations: string;
}

interface InterviewPrepResponse {
  commonQuestions: {
    question: string;
    sampleAnswer: string;
  }[];
  tips: string[];
  preparation: string;
}

interface ResumeImprovementResponse {
  strengths: string[];
  weaknesses: string[];
  suggestions: string;
  improvedSections: {
    section: string;
    content: string;
  }[];
}

/**
 * OpenAI Service for the Emirati Career Platform
 * Provides career advice, skills gap analysis, interview preparation, and resume improvement
 */
class OpenAIService {
  private async callOpenAI(messages: any[]): Promise<APIResponse<any>> {
    try {
      const response = await axios.post(
        OPENAI_API_URL,
        {
          model: 'gpt-4',
          messages,
          temperature: 0.7,
          max_tokens: 1500
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
          }
        }
      );

      return {
        success: true,
        data: response.data.choices[0].message.content
      };
    } catch (error: any) {
      console.error('OpenAI API Error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Failed to get response from OpenAI'
      };
    }
  }

  /**
   * Get personalized career advice based on user profile, skills, and career goals
   */
  async getCareerAdvice(
    userId: string,
    careerGoals: string,
    currentRole?: string
  ): Promise<APIResponse<CareerAdviceResponse>> {
    try {
      // Get user profile and skills from Supabase
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (profileError) throw new Error(profileError.message);

      // Get user skills from Supabase
      const { data: skills, error: skillsError } = await supabase
        .from('user_skills')
        .select('skill, proficiency')
        .eq('user_id', userId);

      if (skillsError) throw new Error(skillsError.message);

      // Format skills for the prompt
      const skillsText = skills.map(s => `${s.skill} (Proficiency: ${s.proficiency}/5)`).join(', ');

      // Create prompt for OpenAI
      const messages = [
        {
          role: 'system',
          content: `You are a career advisor for Emirati professionals. Provide personalized career advice based on the user's profile, skills, and career goals. Format your response as JSON with the following structure: { "advice": "detailed career advice", "nextSteps": ["step 1", "step 2", ...], "resources": [{"title": "Resource name", "url": "optional url", "description": "brief description"}] }`
        },
        {
          role: 'user',
          content: `I need career advice. Here's my profile:
          - Education: ${profile.education || 'Not specified'}
          - Experience: ${profile.experience_years || 0} years
          - Current Role: ${currentRole || 'Not specified'}
          - Industry: ${profile.industry || 'Not specified'}
          - Skills: ${skillsText || 'Not specified'}
          - Career Goals: ${careerGoals}
          
          Please provide personalized career advice, next steps, and resources to help me achieve my career goals.`
        }
      ];

      // Call OpenAI API
      const openAIResponse = await this.callOpenAI(messages);

      if (!openAIResponse.success) {
        return {
          success: false,
          error: openAIResponse.error
        };
      }

      // Parse the response as JSON
      try {
        const parsedResponse = JSON.parse(openAIResponse.data);
        return {
          success: true,
          data: parsedResponse as CareerAdviceResponse
        };
      } catch (error) {
        console.error('Failed to parse OpenAI response as JSON:', error);
        return {
          success: false,
          error: 'Failed to parse career advice response'
        };
      }
    } catch (error: any) {
      console.error('Error getting career advice:', error);
      return {
        success: false,
        error: error.message || 'Failed to get career advice'
      };
    }
  }

  /**
   * Analyze skills gap between user's current skills and job requirements
   */
  async analyzeSkillsGap(
    userId: string,
    jobId: string
  ): Promise<APIResponse<SkillsGapResponse>> {
    try {
      // Get user skills from Supabase
      const { data: userSkills, error: userSkillsError } = await supabase
        .from('user_skills')
        .select('skill, proficiency')
        .eq('user_id', userId);

      if (userSkillsError) throw new Error(userSkillsError.message);

      // Get job skills requirements from Supabase
      const { data: jobSkills, error: jobSkillsError } = await supabase
        .from('job_skills')
        .select('skill, importance')
        .eq('job_id', jobId);

      if (jobSkillsError) throw new Error(jobSkillsError.message);

      // Get job details
      const { data: job, error: jobError } = await supabase
        .from('job_postings')
        .select('title, description, requirements')
        .eq('id', jobId)
        .single();

      if (jobError) throw new Error(jobError.message);

      // Format user skills and job skills for the prompt
      const userSkillsText = userSkills.map(s => `${s.skill} (Proficiency: ${s.proficiency}/5)`).join(', ');
      const jobSkillsText = jobSkills.map(s => `${s.skill} (Importance: ${s.importance}/5)`).join(', ');

      // Create prompt for OpenAI
      const messages = [
        {
          role: 'system',
          content: `You are a career development advisor specializing in skills gap analysis. Analyze the gap between a user's current skills and the requirements for a job they're interested in. Format your response as JSON with the following structure: { "currentSkills": ["skill1", "skill2"], "missingSkills": [{"skill": "missing skill", "importance": 5, "resources": ["resource1", "resource2"]}], "recommendations": "detailed recommendations" }`
        },
        {
          role: 'user',
          content: `I want to apply for this job:
          - Job Title: ${job.title}
          - Job Description: ${job.description}
          - Required Skills: ${jobSkillsText}
          
          My current skills are:
          ${userSkillsText}
          
          Please analyze the gap between my skills and the job requirements, and provide recommendations for how I can bridge this gap.`
        }
      ];

      // Call OpenAI API
      const openAIResponse = await this.callOpenAI(messages);

      if (!openAIResponse.success) {
        return {
          success: false,
          error: openAIResponse.error
        };
      }

      // Parse the response as JSON
      try {
        const parsedResponse = JSON.parse(openAIResponse.data);
        return {
          success: true,
          data: parsedResponse as SkillsGapResponse
        };
      } catch (error) {
        console.error('Failed to parse OpenAI response as JSON:', error);
        return {
          success: false,
          error: 'Failed to parse skills gap analysis response'
        };
      }
    } catch (error: any) {
      console.error('Error analyzing skills gap:', error);
      return {
        success: false,
        error: error.message || 'Failed to analyze skills gap'
      };
    }
  }

  /**
   * Generate interview preparation materials for a specific job
   */
  async prepareForInterview(
    userId: string,
    jobId: string
  ): Promise<APIResponse<InterviewPrepResponse>> {
    try {
      // Get job details
      const { data: job, error: jobError } = await supabase
        .from('job_postings')
        .select('title, description, requirements, company')
        .eq('id', jobId)
        .single();

      if (jobError) throw new Error(jobError.message);

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (profileError) throw new Error(profileError.message);

      // Create prompt for OpenAI
      const messages = [
        {
          role: 'system',
          content: `You are an interview coach specializing in career development. Prepare a candidate for a job interview by providing common questions, sample answers, and preparation tips. Format your response as JSON with the following structure: { "commonQuestions": [{"question": "question text", "sampleAnswer": "sample answer"}], "tips": ["tip1", "tip2"], "preparation": "detailed preparation advice" }`
        },
        {
          role: 'user',
          content: `I have an interview for this job:
          - Job Title: ${job.title}
          - Company: ${job.company}
          - Job Description: ${job.description}
          - Requirements: ${job.requirements ? JSON.stringify(job.requirements) : 'Not specified'}
          
          My background:
          - Education: ${profile.education || 'Not specified'}
          - Experience: ${profile.experience_years || 0} years
          - Industry: ${profile.industry || 'Not specified'}
          
          Please help me prepare for this interview with common questions, sample answers tailored to my background, and preparation tips.`
        }
      ];

      // Call OpenAI API
      const openAIResponse = await this.callOpenAI(messages);

      if (!openAIResponse.success) {
        return {
          success: false,
          error: openAIResponse.error
        };
      }

      // Parse the response as JSON
      try {
        const parsedResponse = JSON.parse(openAIResponse.data);
        return {
          success: true,
          data: parsedResponse as InterviewPrepResponse
        };
      } catch (error) {
        console.error('Failed to parse OpenAI response as JSON:', error);
        return {
          success: false,
          error: 'Failed to parse interview preparation response'
        };
      }
    } catch (error: any) {
      console.error('Error preparing for interview:', error);
      return {
        success: false,
        error: error.message || 'Failed to prepare for interview'
      };
    }
  }

  /**
   * Improve resume based on job description and user profile
   */
  async improveResume(
    userId: string,
    resumeText: string,
    jobId?: string
  ): Promise<APIResponse<ResumeImprovementResponse>> {
    try {
      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (profileError) throw new Error(profileError.message);

      // Get job details if jobId is provided
      let jobDetails = '';
      if (jobId) {
        const { data: job, error: jobError } = await supabase
          .from('job_postings')
          .select('title, description, requirements')
          .eq('id', jobId)
          .single();

        if (!jobError && job) {
          jobDetails = `
          I'm applying for this job:
          - Job Title: ${job.title}
          - Job Description: ${job.description}
          - Requirements: ${job.requirements ? JSON.stringify(job.requirements) : 'Not specified'}
          `;
        }
      }

      // Create prompt for OpenAI
      const messages = [
        {
          role: 'system',
          content: `You are a professional resume writer specializing in career development. Analyze and improve a resume based on the user's profile and target job (if provided). Format your response as JSON with the following structure: { "strengths": ["strength1", "strength2"], "weaknesses": ["weakness1", "weakness2"], "suggestions": "detailed suggestions", "improvedSections": [{"section": "section name", "content": "improved content"}] }`
        },
        {
          role: 'user',
          content: `Please review and improve my resume:
          
          ${resumeText}
          
          ${jobDetails}
          
          My background:
          - Education: ${profile.education || 'Not specified'}
          - Experience: ${profile.experience_years || 0} years
          - Industry: ${profile.industry || 'Not specified'}
          
          Please analyze my resume, identify strengths and weaknesses, and provide suggestions for improvement. Also, please provide improved content for key sections.`
        }
      ];

      // Call OpenAI API
      const openAIResponse = await this.callOpenAI(messages);

      if (!openAIResponse.success) {
        return {
          success: false,
          error: openAIResponse.error
        };
      }

      // Parse the response as JSON
      try {
        const parsedResponse = JSON.parse(openAIResponse.data);
        return {
          success: true,
          data: parsedResponse as ResumeImprovementResponse
        };
      } catch (error) {
        console.error('Failed to parse OpenAI response as JSON:', error);
        return {
          success: false,
          error: 'Failed to parse resume improvement response'
        };
      }
    } catch (error: any) {
      console.error('Error improving resume:', error);
      return {
        success: false,
        error: error.message || 'Failed to improve resume'
      };
    }
  }
}

export default new OpenAIService();
