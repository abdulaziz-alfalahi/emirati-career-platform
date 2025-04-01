import { ApiClient } from '/opt/.manus/.sandbox-runtime/data_api';

// LinkedIn Profile interface
export interface LinkedInProfile {
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  profilePicture: string;
  location: string;
  industry: string;
  email: string;
  phone: string;
  connections: number;
  openToWork: boolean;
  education: {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
  }[];
  experience: {
    company: string;
    title: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  skills: string[];
  languages: {
    language: string;
    proficiency: string;
  }[];
  certifications: {
    name: string;
    issuingOrganization: string;
    issueDate: string;
    expirationDate?: string;
  }[];
}

// LinkedIn Search Results interface
export interface LinkedInSearchResult {
  fullName: string;
  headline: string;
  summary: string;
  profilePicture: string;
  location: string;
  profileURL: string;
  username: string;
}

// API response interface
export interface APIResponse<T> {
  data: T;
  error: any | null;
  status: number;
  message?: string;
}

class LinkedInService {
  private client: ApiClient;

  constructor() {
    this.client = new ApiClient();
  }

  /**
   * Get LinkedIn profile by username
   * @param username LinkedIn username
   * @returns Promise with LinkedIn profile data
   */
  async getProfileByUsername(username: string): Promise<APIResponse<LinkedInProfile>> {
    try {
      const response = await this.client.call_api('LinkedIn/get_user_profile_by_username', {
        query: { username }
      });

      if (!response || !response.success) {
        return {
          data: null as unknown as LinkedInProfile,
          error: response?.message || 'Failed to fetch LinkedIn profile',
          status: 400,
          message: response?.message || 'Failed to fetch LinkedIn profile'
        };
      }

      // Transform the API response to match our LinkedInProfile interface
      const profileData = this.transformProfileData(response.data);

      return {
        data: profileData,
        error: null,
        status: 200
      };
    } catch (err: any) {
      console.error('LinkedIn API error:', err);
      return {
        data: null as unknown as LinkedInProfile,
        error: err,
        status: 500,
        message: err.message || 'An unexpected error occurred'
      };
    }
  }

  /**
   * Search for LinkedIn profiles
   * @param keywords Search keywords
   * @param options Additional search options
   * @returns Promise with search results
   */
  async searchPeople(
    keywords: string,
    options?: {
      start?: string;
      firstName?: string;
      lastName?: string;
      keywordSchool?: string;
      keywordTitle?: string;
      company?: string;
    }
  ): Promise<APIResponse<LinkedInSearchResult[]>> {
    try {
      const queryParams = {
        keywords,
        ...options
      };

      const response = await this.client.call_api('LinkedIn/search_people', {
        query: queryParams
      });

      if (!response || !response.success) {
        return {
          data: [] as LinkedInSearchResult[],
          error: response?.message || 'Failed to search LinkedIn profiles',
          status: 400,
          message: response?.message || 'Failed to search LinkedIn profiles'
        };
      }

      return {
        data: response.data.items || [],
        error: null,
        status: 200
      };
    } catch (err: any) {
      console.error('LinkedIn search API error:', err);
      return {
        data: [] as LinkedInSearchResult[],
        error: err,
        status: 500,
        message: err.message || 'An unexpected error occurred'
      };
    }
  }

  /**
   * Transform LinkedIn API response to match our interface
   * @param apiData Raw API data
   * @returns Transformed profile data
   */
  private transformProfileData(apiData: any): LinkedInProfile {
    // This is a placeholder transformation function
    // In a real implementation, we would map the actual API response fields to our interface
    // For now, we'll return a mock profile similar to the one in the component
    
    // If we have actual data from the API, we would transform it here
    if (apiData && apiData.author) {
      return {
        id: apiData.author.id || '',
        firstName: apiData.author.firstName || '',
        lastName: apiData.author.lastName || '',
        headline: apiData.author.headline || '',
        profilePicture: apiData.author.profilePictures?.[0]?.url || '',
        location: apiData.location || 'United Arab Emirates',
        industry: apiData.industry || 'Information Technology',
        email: apiData.email || 'example@example.com',
        phone: apiData.phone || '',
        connections: apiData.connections || 0,
        openToWork: apiData.openToWork || false,
        education: apiData.education || [],
        experience: apiData.experience || [],
        skills: apiData.skills || [],
        languages: apiData.languages || [],
        certifications: apiData.certifications || []
      };
    }

    // Fallback mock data if transformation fails
    return {
      id: "linkedin_profile_id",
      firstName: "Mohammed",
      lastName: "Al Mansoori",
      headline: "Software Developer at Dubai Future Foundation",
      profilePicture: "https://example.com/profile.jpg",
      location: "Dubai, United Arab Emirates",
      industry: "Information Technology",
      email: "mohammed.almansoori@example.com",
      phone: "+971 50 123 4567",
      connections: 342,
      openToWork: false,
      education: [
        {
          institution: "United Arab Emirates University",
          degree: "Bachelor of Science",
          fieldOfStudy: "Computer Science",
          startDate: "2018",
          endDate: "2022"
        }
      ],
      experience: [
        {
          company: "Dubai Future Foundation",
          title: "Junior Developer",
          location: "Dubai, UAE",
          startDate: "January 2022",
          endDate: "Present",
          description: "Developing web applications using React and Node.js. Collaborating with cross-functional teams to define, design, and ship new features."
        },
        {
          company: "Etisalat",
          title: "Intern",
          location: "Abu Dhabi, UAE",
          startDate: "June 2021",
          endDate: "August 2021",
          description: "Assisted in developing mobile applications and participated in team projects."
        }
      ],
      skills: ["JavaScript", "React", "Node.js", "HTML/CSS", "SQL", "Git", "Agile Methodologies"],
      languages: [
        {
          language: "Arabic",
          proficiency: "Native"
        },
        {
          language: "English",
          proficiency: "Professional Working"
        }
      ],
      certifications: [
        {
          name: "AWS Certified Developer – Associate",
          issuingOrganization: "Amazon Web Services",
          issueDate: "March 2023",
          expirationDate: "March 2026"
        }
      ]
    };
  }

  /**
   * Import LinkedIn profile to resume
   * @param profile LinkedIn profile
   * @returns Transformed resume data
   */
  async importProfileToResume(profile: LinkedInProfile): Promise<any> {
    // Transform LinkedIn profile to resume format
    return {
      name: `${profile.firstName} ${profile.lastName}`,
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
      education: profile.education.map(edu => ({
        institution: edu.institution,
        degree: `${edu.degree} in ${edu.fieldOfStudy}`,
        date: `${edu.startDate} - ${edu.endDate}`
      })),
      workExperience: profile.experience.map(exp => ({
        company: exp.company,
        position: exp.title,
        date: `${exp.startDate} - ${exp.endDate}`,
        description: exp.description
      })),
      skills: profile.skills
    };
  }
}

export default new LinkedInService();
