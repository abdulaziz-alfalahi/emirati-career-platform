import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// API Base URLs
const API_URLS = {
  SUPABASE: process.env.REACT_APP_SUPABASE_URL || 'https://your-supabase-url.supabase.co',
  AFFINDA: 'https://api.affinda.com/v2',
  OPENAI: 'https://api.openai.com/v1',
  MAPBOX: 'https://api.mapbox.com',
  LINKEDIN: '/api/linkedin' // This would be a proxy endpoint in your backend
};

// API Keys
const API_KEYS = {
  SUPABASE: process.env.REACT_APP_SUPABASE_KEY || 'your-supabase-key',
  AFFINDA: process.env.REACT_APP_AFFINDA_KEY || 'your-affinda-key',
  OPENAI: process.env.REACT_APP_OPENAI_KEY || 'your-openai-key',
  MAPBOX: process.env.REACT_APP_MAPBOX_KEY || 'your-mapbox-key',
  LINKEDIN: process.env.REACT_APP_LINKEDIN_KEY || 'your-linkedin-key'
};

// Create API instances
const createAPIInstance = (baseURL: string, headers: Record<string, string> = {}): AxiosInstance => {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  });
};

// Supabase API instance
const supabaseAPI = createAPIInstance(API_URLS.SUPABASE, {
  'apikey': API_KEYS.SUPABASE,
  'Authorization': `Bearer ${API_KEYS.SUPABASE}`
});

// Affinda API instance
const affindaAPI = createAPIInstance(API_URLS.AFFINDA, {
  'Authorization': `Bearer ${API_KEYS.AFFINDA}`
});

// OpenAI API instance
const openaiAPI = createAPIInstance(API_URLS.OPENAI, {
  'Authorization': `Bearer ${API_KEYS.OPENAI}`
});

// Mapbox API instance
const mapboxAPI = createAPIInstance(API_URLS.MAPBOX);

// LinkedIn API instance (via proxy)
const linkedinAPI = createAPIInstance(API_URLS.LINKEDIN);

// Generic API response interface
interface APIResponse<T> {
  data: T;
  status: number;
  message?: string;
  error?: any;
}

// Generic API error interface
interface APIError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

// API request handler with error handling
const handleAPIRequest = async <T>(
  apiCall: Promise<AxiosResponse<any>>,
  errorMessage: string = 'API request failed'
): Promise<APIResponse<T>> => {
  try {
    const response = await apiCall;
    return {
      data: response.data,
      status: response.status
    };
  } catch (error: any) {
    console.error(`API Error: ${errorMessage}`, error);
    
    const apiError: APIError = {
      message: errorMessage,
      status: error.response?.status,
      code: error.response?.data?.code || error.code,
      details: error.response?.data || error.message
    };
    
    return {
      data: null as unknown as T,
      status: error.response?.status || 500,
      message: errorMessage,
      error: apiError
    };
  }
};

// API Integration Framework
const APIService = {
  // Auth API
  auth: {
    signUp: async (email: string, password: string, userData: any) => {
      return handleAPIRequest(
        supabaseAPI.post('/auth/v1/signup', { email, password, ...userData }),
        'Failed to sign up'
      );
    },
    
    signIn: async (email: string, password: string) => {
      return handleAPIRequest(
        supabaseAPI.post('/auth/v1/token?grant_type=password', { email, password }),
        'Failed to sign in'
      );
    },
    
    signOut: async () => {
      return handleAPIRequest(
        supabaseAPI.post('/auth/v1/logout', {}),
        'Failed to sign out'
      );
    },
    
    resetPassword: async (email: string) => {
      return handleAPIRequest(
        supabaseAPI.post('/auth/v1/recover', { email }),
        'Failed to send password reset email'
      );
    },
    
    updatePassword: async (accessToken: string, password: string) => {
      return handleAPIRequest(
        supabaseAPI.put('/auth/v1/user', 
          { password },
          { headers: { 'Authorization': `Bearer ${accessToken}` } }
        ),
        'Failed to update password'
      );
    }
  },
  
  // User API
  user: {
    getProfile: async (userId: string) => {
      return handleAPIRequest(
        supabaseAPI.get(`/rest/v1/profiles?id=eq.${userId}&select=*`),
        'Failed to get user profile'
      );
    },
    
    updateProfile: async (userId: string, profileData: any) => {
      return handleAPIRequest(
        supabaseAPI.patch(`/rest/v1/profiles?id=eq.${userId}`, profileData),
        'Failed to update user profile'
      );
    },
    
    getUserSkills: async (userId: string) => {
      return handleAPIRequest(
        supabaseAPI.get(`/rest/v1/user_skills?user_id=eq.${userId}&select=*,skills(*)`),
        'Failed to get user skills'
      );
    },
    
    addUserSkill: async (userId: string, skillId: string, level: string) => {
      return handleAPIRequest(
        supabaseAPI.post('/rest/v1/user_skills', { user_id: userId, skill_id: skillId, level }),
        'Failed to add user skill'
      );
    },
    
    removeUserSkill: async (userId: string, skillId: string) => {
      return handleAPIRequest(
        supabaseAPI.delete(`/rest/v1/user_skills?user_id=eq.${userId}&skill_id=eq.${skillId}`),
        'Failed to remove user skill'
      );
    }
  },
  
  // Resume API
  resume: {
    parseResume: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      
      return handleAPIRequest(
        affindaAPI.post('/resumes', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }),
        'Failed to parse resume'
      );
    },
    
    saveResume: async (userId: string, resumeData: any) => {
      return handleAPIRequest(
        supabaseAPI.post('/rest/v1/resumes', { user_id: userId, ...resumeData }),
        'Failed to save resume'
      );
    },
    
    getResume: async (userId: string) => {
      return handleAPIRequest(
        supabaseAPI.get(`/rest/v1/resumes?user_id=eq.${userId}&select=*`),
        'Failed to get resume'
      );
    },
    
    updateResume: async (resumeId: string, resumeData: any) => {
      return handleAPIRequest(
        supabaseAPI.patch(`/rest/v1/resumes?id=eq.${resumeId}`, resumeData),
        'Failed to update resume'
      );
    }
  },
  
  // Career Recommendations API
  career: {
    getRecommendations: async (resumeData: any) => {
      return handleAPIRequest(
        openaiAPI.post('/chat/completions', {
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are a career advisor specializing in the UAE job market. Analyze the resume data and provide career recommendations."
            },
            {
              role: "user",
              content: `Resume data: ${JSON.stringify(resumeData)}`
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        }),
        'Failed to get career recommendations'
      );
    }
  },
  
  // LinkedIn API
  linkedin: {
    getProfile: async (username: string) => {
      return handleAPIRequest(
        linkedinAPI.get(`/profile?username=${username}`),
        'Failed to get LinkedIn profile'
      );
    },
    
    importProfile: async (profile: any) => {
      return handleAPIRequest(
        linkedinAPI.post('/import', { profile }),
        'Failed to import LinkedIn profile'
      );
    }
  },
  
  // Skills API
  skills: {
    getSkillCategories: async () => {
      return handleAPIRequest(
        supabaseAPI.get('/rest/v1/skill_categories?select=*'),
        'Failed to get skill categories'
      );
    },
    
    getSkillsByCategory: async (categoryId: string) => {
      return handleAPIRequest(
        supabaseAPI.get(`/rest/v1/skills?category_id=eq.${categoryId}&select=*`),
        'Failed to get skills by category'
      );
    },
    
    searchSkills: async (query: string) => {
      return handleAPIRequest(
        supabaseAPI.get(`/rest/v1/skills?or=(name.ilike.%${query}%,description.ilike.%${query}%)&select=*`),
        'Failed to search skills'
      );
    },
    
    getRecommendedSkills: async (userId: string) => {
      return handleAPIRequest(
        supabaseAPI.get(`/rest/v1/recommended_skills?user_id=eq.${userId}&select=*,skills(*)`),
        'Failed to get recommended skills'
      );
    }
  },
  
  // Location API
  location: {
    searchLocations: async (lat: number, lng: number, radius: number, types?: string[]) => {
      let url = `/rest/v1/locations?select=*&and=(lat.gte.${lat-0.1},lat.lte.${lat+0.1},lng.gte.${lng-0.1},lng.lte.${lng+0.1})`;
      
      if (types && types.length > 0) {
        url += `&type=in.(${types.join(',')})`;
      }
      
      return handleAPIRequest(
        supabaseAPI.get(url),
        'Failed to search locations'
      );
    },
    
    getLocationDetails: async (locationId: string) => {
      return handleAPIRequest(
        supabaseAPI.get(`/rest/v1/locations?id=eq.${locationId}&select=*`),
        'Failed to get location details'
      );
    }
  },
  
  // Job API
  job: {
    searchJobs: async (params: any) => {
      let url = '/rest/v1/jobs?select=*';
      
      // Add query parameters based on search params
      if (params.query) {
        url += `&or=(title.ilike.%${params.query}%,description.ilike.%${params.query}%)`;
      }
      
      if (params.location) {
        url += `&location.ilike.%${params.location}%`;
      }
      
      if (params.type) {
        url += `&type=eq.${params.type}`;
      }
      
      return handleAPIRequest(
        supabaseAPI.get(url),
        'Failed to search jobs'
      );
    },
    
    getJobDetails: async (jobId: string) => {
      return handleAPIRequest(
        supabaseAPI.get(`/rest/v1/jobs?id=eq.${jobId}&select=*`),
        'Failed to get job details'
      );
    },
    
    applyForJob: async (userId: string, jobId: string, applicationData: any) => {
      return handleAPIRequest(
        supabaseAPI.post('/rest/v1/job_applications', { 
          user_id: userId, 
          job_id: jobId, 
          ...applicationData 
        }),
        'Failed to apply for job'
      );
    },
    
    getApplications: async (userId: string) => {
      return handleAPIRequest(
        supabaseAPI.get(`/rest/v1/job_applications?user_id=eq.${userId}&select=*,jobs(*)`),
        'Failed to get job applications'
      );
    }
  },
  
  // Education API
  education: {
    getInstitutions: async (params: any) => {
      let url = '/rest/v1/educational_institutions?select=*';
      
      if (params.query) {
        url += `&or=(name.ilike.%${params.query}%,description.ilike.%${params.query}%)`;
      }
      
      if (params.location) {
        url += `&location.ilike.%${params.location}%`;
      }
      
      if (params.type) {
        url += `&type=eq.${params.type}`;
      }
      
      return handleAPIRequest(
        supabaseAPI.get(url),
        'Failed to get educational institutions'
      );
    },
    
    getInstitutionDetails: async (institutionId: string) => {
      return handleAPIRequest(
        supabaseAPI.get(`/rest/v1/educational_institutions?id=eq.${institutionId}&select=*`),
        'Failed to get institution details'
      );
    },
    
    getPrograms: async (institutionId: string) => {
      return handleAPIRequest(
        supabaseAPI.get(`/rest/v1/educational_programs?institution_id=eq.${institutionId}&select=*`),
        'Failed to get educational programs'
      );
    }
  },
  
  // Training API
  training: {
    getTrainingCenters: async (params: any) => {
      let url = '/rest/v1/training_centers?select=*';
      
      if (params.query) {
        url += `&or=(name.ilike.%${params.query}%,description.ilike.%${params.query}%)`;
      }
      
      if (params.location) {
        url += `&location.ilike.%${params.location}%`;
      }
      
      return handleAPIRequest(
        supabaseAPI.get(url),
        'Failed to get training centers'
      );
    },
    
    getTrainingPrograms: async (centerId: string) => {
      return handleAPIRequest(
        supabaseAPI.get(`/rest/v1/training_programs?center_id=eq.${centerId}&select=*`),
        'Failed to get training programs'
      );
    },
    
    enrollInProgram: async (userId: string, programId: string, enrollmentData: any) => {
      return handleAPIRequest(
        supabaseAPI.post('/rest/v1/program_enrollments', { 
          user_id: userId, 
          program_id: programId, 
          ...enrollmentData 
        }),
        'Failed to enroll in program'
      );
    }
  },
  
  // Assessment API
  assessment: {
    getAssessmentCenters: async (params: any) => {
      let url = '/rest/v1/assessment_centers?select=*';
      
      if (params.query) {
        url += `&or=(name.ilike.%${params.query}%,description.ilike.%${params.query}%)`;
      }
      
      if (params.location) {
        url += `&location.ilike.%${params.location}%`;
      }
      
      return handleAPIRequest(
        supabaseAPI.get(url),
        'Failed to get assessment centers'
      );
    },
    
    getAssessments: async (centerId: string) => {
      return handleAPIRequest(
        supabaseAPI.get(`/rest/v1/assessments?center_id=eq.${centerId}&select=*`),
        'Failed to get assessments'
      );
    },
    
    scheduleAssessment: async (userId: string, assessmentId: string, schedulingData: any) => {
      return handleAPIRequest(
        supabaseAPI.post('/rest/v1/assessment_bookings', { 
          user_id: userId, 
          assessment_id: assessmentId, 
          ...schedulingData 
        }),
        'Failed to schedule assessment'
      );
    }
  },
  
  // Interview API
  interview: {
    scheduleInterview: async (userId: string, jobId: string, interviewData: any) => {
      return handleAPIRequest(
        supabaseAPI.post('/rest/v1/interviews', { 
          user_id: userId, 
          job_id: jobId, 
          ...interviewData 
        }),
        'Failed to schedule interview'
      );
    },
    
    getInterviews: async (userId: string) => {
      return handleAPIRequest(
        supabaseAPI.get(`/rest/v1/interviews?user_id=eq.${userId}&select=*,jobs(*)`),
        'Failed to get interviews'
      );
    },
    
    updateInterviewStatus: async (interviewId: string, status: string) => {
      return handleAPIRequest(
        supabaseAPI.patch(`/rest/v1/interviews?id=eq.${interviewId}`, { status }),
        'Failed to update interview status'
      );
    }
  }
};

export default APIService;
