import React, { useState } from 'react';
import '../../styles/theme.css';

interface LinkedInProfile {
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

const LinkedInService = {
  async getProfileByUsername(username: string): Promise<LinkedInProfile> {
    // This would be replaced with actual LinkedIn API integration
    // For demonstration purposes, we're using a mock implementation
    
    // In a real implementation, we would use the LinkedIn API or the data API provided
    // const response = await fetch(`/api/linkedin/profile?username=${username}`);
    // if (!response.ok) {
    //   throw new Error('Failed to fetch LinkedIn profile');
    // }
    // return await response.json();
    
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response based on LinkedIn's data structure
    return {
      id: "abc123456",
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
  },
  
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
};

const LinkedInIntegrationComponent: React.FC = () => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<LinkedInProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const fetchProfile = async () => {
    if (!username) {
      setError('Please enter a LinkedIn username');
      return;
    }

    setIsLoading(true);
    setError(null);
    setProfile(null);
    setImportSuccess(false);

    try {
      const data = await LinkedInService.getProfileByUsername(username);
      setProfile(data);
    } catch (err) {
      setError('Failed to fetch LinkedIn profile. Please check the username and try again.');
      console.error('LinkedIn profile fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const importToResume = async () => {
    if (!profile) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await LinkedInService.importProfileToResume(profile);
      setImportSuccess(true);
    } catch (err) {
      setError('Failed to import LinkedIn profile to resume. Please try again.');
      console.error('LinkedIn import error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-primary mb-4">LinkedIn Integration</h2>
        <p className="text-gray-600">Import your professional information from LinkedIn to enhance your profile and resume.</p>
      </div>

      <div className="relative">
        <div className="absolute inset-0 arabesque-geometric" style={{ opacity: 0.1 }}></div>
        
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Connect with LinkedIn</h3>
          
          <div className="mb-6">
            <label htmlFor="linkedin-username" className="block text-gray-700 mb-2">LinkedIn Username</label>
            <div className="flex">
              <input
                type="text"
                id="linkedin-username"
                className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., johndoe"
                value={username}
                onChange={handleUsernameChange}
              />
              <button 
                className="btn-accent rounded-l-none"
                onClick={fetchProfile}
                disabled={isLoading}
              >
                {isLoading ? 'Fetching...' : 'Fetch Profile'}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">Enter your LinkedIn username to fetch your profile information.</p>
          </div>
          
          {error && (
            <div className="bg-red-100 text-accent p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          {importSuccess && (
            <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4">
              LinkedIn profile successfully imported to your resume!
            </div>
          )}
        </div>
        
        {profile && (
          <div className="bg-white shadow-sm rounded-lg p-6 mt-6">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-semibold text-primary">LinkedIn Profile Preview</h3>
              <button 
                className="btn-primary"
                onClick={importToResume}
                disabled={isLoading}
              >
                {isLoading ? 'Importing...' : 'Import to Resume'}
              </button>
            </div>
            
            <div className="flex items-start mb-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full mr-4 flex-shrink-0">
                {/* This would be the profile picture in a real implementation */}
                <div className="w-full h-full rounded-full flex items-center justify-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold">{profile.firstName} {profile.lastName}</h4>
                <p className="text-gray-600">{profile.headline}</p>
                <p className="text-gray-500 text-sm">{profile.location}</p>
                <p className="text-gray-500 text-sm mt-1">{profile.connections} connections</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-highlight mb-3">Experience</h4>
                <div className="space-y-4">
                  {profile.experience.map((exp, index) => (
                    <div key={index} className="border-l-4 border-primary p-3 bg-beige-light rounded-r-md">
                      <p className="font-medium">{exp.title}</p>
                      <p className="text-gray-700">{exp.company}</p>
                      <p className="text-gray-500 text-sm">{exp.startDate} - {exp.endDate}</p>
                      <p className="text-gray-600 text-sm mt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-highlight mb-3">Education</h4>
                <div className="space-y-4">
                  {profile.education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-primary p-3 bg-beige-light rounded-r-md">
                      <p className="font-medium">{edu.institution}</p>
                      <p className="text-gray-700">{edu.degree}, {edu.fieldOfStudy}</p>
                      <p className="text-gray-500 text-sm">{edu.startDate} - {edu.endDate}</p>
                    </div>
                  ))}
                </div>
                
                <h4 className="font-semibold text-highlight mb-3 mt-6">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span key={index} className="bg-beige-light px-3 py-1 rounded-full text-sm text-gray-700">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <h4 className="font-semibold text-highlight mb-3 mt-6">Languages</h4>
                <div className="space-y-2">
                  {profile.languages.map((lang, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-700">{lang.language}</span>
                      <span className="text-gray-500 text-sm">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
                
                <h4 className="font-semibold text-highlight mb-3 mt-6">Certifications</h4>
                <div className="space-y-2">
                  {profile.certifications.map((cert, index) => (
                    <div key={index} className="border-l-4 border-highlight p-3 bg-beige-light rounded-r-md">
                      <p className="font-medium">{cert.name}</p>
                      <p className="text-gray-700">{cert.issuingOrganization}</p>
                      <p className="text-gray-500 text-sm">Issued: {cert.issueDate}</p>
                      {cert.expirationDate && (
                        <p className="text-gray-500 text-sm">Expires: {cert.expirationDate}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedInIntegrationComponent;
