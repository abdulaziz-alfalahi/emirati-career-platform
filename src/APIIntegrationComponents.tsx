import React, { useState, useEffect } from 'react';
import supabase from './supabase';
import OpenAIService from './openai_integration';
import AffindaService from './affinda_integration';
import MapboxService from './mapbox_integration';
import './APIIntegrationComponents.css';

// Career Advice Component
export const CareerAdviceComponent: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [careerGoals, setCareerGoals] = useState<string>('');
  const [currentRole, setCurrentRole] = useState<string>('');
  const [advice, setAdvice] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get current user ID
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        setUserId(session.user.id);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await OpenAIService.getCareerAdvice(userId, careerGoals, currentRole);
      
      if (response.success && response.data) {
        setAdvice(response.data);
      } else {
        setError(response.error || 'Failed to get career advice');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="career-advice-container">
      <h2>Personalized Career Advice</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="currentRole">Current Role</label>
          <input
            type="text"
            id="currentRole"
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            placeholder="e.g., Software Developer"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="careerGoals">Career Goals</label>
          <textarea
            id="careerGoals"
            value={careerGoals}
            onChange={(e) => setCareerGoals(e.target.value)}
            placeholder="Describe your career goals and aspirations..."
            required
          />
        </div>
        
        <button type="submit" disabled={loading || !userId}>
          {loading ? 'Getting Advice...' : 'Get Career Advice'}
        </button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      
      {advice && (
        <div className="advice-results">
          <h3>Your Personalized Career Advice</h3>
          
          <div className="advice-section">
            <h4>Advice</h4>
            <p>{advice.advice}</p>
          </div>
          
          <div className="advice-section">
            <h4>Next Steps</h4>
            <ul>
              {advice.nextSteps.map((step: string, index: number) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
          
          <div className="advice-section">
            <h4>Recommended Resources</h4>
            <ul className="resources-list">
              {advice.resources.map((resource: any, index: number) => (
                <li key={index}>
                  <strong>{resource.title}</strong>
                  {resource.url && (
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      Visit Resource
                    </a>
                  )}
                  <p>{resource.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// Resume Parser Component
export const ResumeParserComponent: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [resumeData, setResumeData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    // Get current user ID
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        setUserId(session.user.id);
      }
    };

    fetchUser();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a resume file');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        try {
          // Extract base64 data
          const base64Data = reader.result?.toString().split(',')[1];
          
          if (!base64Data) {
            throw new Error('Failed to read file');
          }
          
          // Call Affinda service to parse resume
          const response = await AffindaService.parseResume(
            base64Data,
            file.name,
            file.type
          );
          
          if (response.success && response.data) {
            setResumeData(response.data);
            
            // Store resume data in Supabase
            if (userId) {
              const storeResponse = await AffindaService.storeResumeData(userId, response.data);
              
              if (storeResponse.success) {
                setSuccess(true);
              } else {
                setError(storeResponse.error || 'Failed to store resume data');
              }
            }
          } else {
            setError(response.error || 'Failed to parse resume');
          }
        } catch (err: any) {
          setError(err.message || 'An unexpected error occurred');
        } finally {
          setLoading(false);
        }
      };
      
      reader.onerror = () => {
        setError('Failed to read file');
        setLoading(false);
      };
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="resume-parser-container">
      <h2>Resume Parser</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="resumeFile">Upload Your Resume</label>
          <input
            type="file"
            id="resumeFile"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            required
          />
          <small>Supported formats: PDF, DOC, DOCX</small>
        </div>
        
        <button type="submit" disabled={loading || !userId || !file}>
          {loading ? 'Parsing Resume...' : 'Parse Resume'}
        </button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Resume parsed and stored successfully!</div>}
      
      {resumeData && (
        <div className="resume-results">
          <h3>Parsed Resume Data</h3>
          
          <div className="resume-section">
            <h4>Personal Information</h4>
            <p><strong>Name:</strong> {resumeData.name}</p>
            {resumeData.email && <p><strong>Email:</strong> {resumeData.email}</p>}
            {resumeData.phone && <p><strong>Phone:</strong> {resumeData.phone}</p>}
            {resumeData.location && <p><strong>Location:</strong> {resumeData.location}</p>}
          </div>
          
          {resumeData.education && resumeData.education.length > 0 && (
            <div className="resume-section">
              <h4>Education</h4>
              <ul>
                {resumeData.education.map((edu: any, index: number) => (
                  <li key={index}>
                    <p><strong>{edu.institution}</strong></p>
                    {edu.degree && <p>{edu.degree}</p>}
                    {edu.date && <p>{edu.date}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {resumeData.workExperience && resumeData.workExperience.length > 0 && (
            <div className="resume-section">
              <h4>Work Experience</h4>
              <ul>
                {resumeData.workExperience.map((exp: any, index: number) => (
                  <li key={index}>
                    <p><strong>{exp.position}</strong> at {exp.company}</p>
                    {exp.date && <p>{exp.date}</p>}
                    {exp.description && <p>{exp.description}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div className="resume-section">
              <h4>Skills</h4>
              <div className="skills-list">
                {resumeData.skills.map((skill: string, index: number) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Location Search Component
export const LocationSearchComponent: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [radius, setRadius] = useState<number>(10);
  const [jobType, setJobType] = useState<string>('all');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mapVisible, setMapVisible] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await MapboxService.searchJobsByLocation(location, radius, jobType);
      
      if (response.success && response.data) {
        setSearchResults(response.data);
        setMapVisible(true);
      } else {
        setError(response.error || 'Failed to search jobs by location');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="location-search-container">
      <h2>Search Jobs by Location</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Dubai, UAE"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="radius">Search Radius (km)</label>
          <input
            type="range"
            id="radius"
            min="1"
            max="50"
            value={radius}
            onChange={(e) => setRadius(parseInt(e.target.value))}
          />
          <span>{radius} km</span>
        </div>
        
        <div className="form-group">
          <label htmlFor="jobType">Job Type</label>
          <select
            id="jobType"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="all">All Job Types</option>
            <option value="fulltime">Full Time</option>
            <option value="parttime">Part Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>
        
        <button type="submit" disabled={loading || !location}>
          {loading ? 'Searching...' : 'Search Jobs'}
        </button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      
      {mapVisible && (
        <div className="map-container">
          <h3>Job Opportunities Near {location}</h3>
          <div id="map" className="map"></div>
          
          {searchResults.length > 0 ? (
            <div className="search-results">
              <h4>{searchResults.length} Jobs Found</h4>
              <ul className="job-list">
                {searchResults.map((job, index) => (
                  <li key={index} className="job-item">
                    <h5>{job.title}</h5>
                    <p className="company">{job.company}</p>
                    <p className="location">{job.location} ({job.distance.toFixed(1)} km away)</p>
                    <p className="job-type">{job.jobType}</p>
                    <a href={job.url} target="_blank" rel="noopener noreferrer" className="view-job">
                      View Job
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="no-results">No jobs found in this area. Try expanding your search radius.</p>
          )}
        </div>
      )}
    </div>
  );
};
