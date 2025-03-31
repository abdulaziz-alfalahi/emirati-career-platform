import React, { useState } from 'react';
import '../../styles/theme.css';

interface AffindaResumeData {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  education?: {
    institution: string;
    degree: string;
    date: string;
  }[];
  workExperience?: {
    company: string;
    position: string;
    date: string;
    description: string;
  }[];
  skills?: string[];
}

const ResumeParserService = {
  async parseResume(file: File): Promise<AffindaResumeData> {
    // This would be replaced with actual Affinda API integration
    // For demonstration purposes, we're using a mock implementation
    
    const formData = new FormData();
    formData.append('file', file);
    
    // In a real implementation, we would make an API call to Affinda
    // const response = await fetch('https://api.affinda.com/v2/resumes', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.REACT_APP_AFFINDA_API_KEY}`
    //   },
    //   body: formData
    // });
    // 
    // if (!response.ok) {
    //   throw new Error('Failed to parse resume');
    // }
    // 
    // const data = await response.json();
    // return transformAffindaResponse(data);
    
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock response based on Affinda's response structure
    return {
      name: 'Mohammed Al Mansoori',
      email: 'mohammed.almansoori@example.com',
      phone: '+971 50 123 4567',
      location: 'Dubai, UAE',
      education: [
        {
          institution: 'United Arab Emirates University',
          degree: 'Bachelor of Science in Computer Science',
          date: '2018 - 2022'
        }
      ],
      workExperience: [
        {
          company: 'Dubai Future Foundation',
          position: 'Junior Developer',
          date: '2022 - Present',
          description: 'Developing web applications using React and Node.js'
        },
        {
          company: 'Etisalat',
          position: 'Intern',
          date: 'Summer 2021',
          description: 'Assisted in developing mobile applications'
        }
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'HTML/CSS', 'SQL', 'Git']
    };
  },
  
  // This function would transform Affinda's response to our application's format
  transformAffindaResponse(data: any): AffindaResumeData {
    // In a real implementation, we would transform the Affinda response
    // to match our application's data structure
    return {
      name: data.name?.raw,
      email: data.emails?.[0]?.raw,
      phone: data.phoneNumbers?.[0]?.raw,
      location: data.location?.raw,
      education: data.education?.map((edu: any) => ({
        institution: edu.organization?.raw,
        degree: edu.accreditation?.education,
        date: `${edu.dates?.startDate?.year || ''} - ${edu.dates?.endDate?.year || 'Present'}`
      })),
      workExperience: data.workExperience?.map((exp: any) => ({
        company: exp.organization?.raw,
        position: exp.jobTitle?.raw,
        date: `${exp.dates?.startDate?.year || ''} - ${exp.dates?.endDate?.year || 'Present'}`,
        description: exp.jobDescription?.raw
      })),
      skills: data.skills?.map((skill: any) => skill.name?.raw)
    };
  }
};

const ResumeParsingComponent: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [resumeData, setResumeData] = useState<AffindaResumeData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const data = await ResumeParserService.parseResume(file);
      setResumeData(data);
    } catch (err) {
      setError('Failed to parse resume. Please try again.');
      console.error('Resume parsing error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-primary mb-4">Resume Parser</h2>
        <p className="text-gray-600">Upload your resume to automatically extract your information using Affinda's AI-powered resume parsing technology.</p>
      </div>

      <div className="relative">
        <div className="absolute inset-0 arabesque-interlacing" style={{ opacity: 0.1 }}></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-primary mb-3">Upload Resume</h3>
            <p className="text-gray-600 mb-4">
              Supported formats: PDF, DOCX, DOC, RTF, TXT
            </p>
            
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="resume-upload"
                className="hidden"
                accept=".pdf,.docx,.doc,.rtf,.txt"
                onChange={handleFileChange}
              />
              <label 
                htmlFor="resume-upload"
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-gray-600 mb-1">Click to select a file</span>
                <span className="text-gray-500 text-sm">or drag and drop</span>
              </label>
            </div>
            
            {file && (
              <div className="bg-beige-light p-3 rounded-md mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-gray-700 truncate flex-1">{file.name}</span>
                <button 
                  className="text-gray-500 hover:text-accent"
                  onClick={() => setFile(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            
            {error && (
              <div className="bg-red-100 text-accent p-3 rounded-md mb-4">
                {error}
              </div>
            )}
            
            <button 
              className={`btn-primary w-full ${isUploading ? 'opacity-75 cursor-not-allowed' : ''}`}
              onClick={handleUpload}
              disabled={isUploading || !file}
            >
              {isUploading ? 'Processing...' : 'Parse Resume'}
            </button>
            
            <div className="mt-4 text-sm text-gray-500">
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Powered by Affinda AI resume parsing technology
              </p>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-primary mb-3">Extracted Information</h3>
            
            {!resumeData && !isUploading && (
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500">Upload a resume to see extracted information</p>
              </div>
            )}
            
            {isUploading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Analyzing your resume...</p>
              </div>
            )}
            
            {resumeData && !isUploading && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-highlight mb-1">Personal Information</h4>
                  <div className="bg-beige-light p-3 rounded-md">
                    <p className="font-medium text-lg">{resumeData.name}</p>
                    <p>{resumeData.email}</p>
                    <p>{resumeData.phone}</p>
                    <p>{resumeData.location}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-highlight mb-1">Education</h4>
                  <div className="bg-beige-light p-3 rounded-md">
                    {resumeData.education?.map((edu, index) => (
                      <div key={index} className={index > 0 ? 'mt-2 pt-2 border-t border-gray-200' : ''}>
                        <p className="font-medium">{edu.institution}</p>
                        <p>{edu.degree}</p>
                        <p className="text-sm text-gray-600">{edu.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-highlight mb-1">Work Experience</h4>
                  <div className="bg-beige-light p-3 rounded-md">
                    {resumeData.workExperience?.map((exp, index) => (
                      <div key={index} className={index > 0 ? 'mt-3 pt-3 border-t border-gray-200' : ''}>
                        <p className="font-medium">{exp.position}</p>
                        <p>{exp.company}</p>
                        <p className="text-sm text-gray-600">{exp.date}</p>
                        <p className="text-sm mt-1">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-highlight mb-1">Skills</h4>
                  <div className="bg-beige-light p-3 rounded-md">
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills?.map((skill, index) => (
                        <span key={index} className="bg-white px-3 py-1 rounded-full text-sm text-primary border border-primary">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="btn-primary flex-1">Save to Profile</button>
                  <button className="btn-secondary flex-1">Edit Information</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeParsingComponent;
