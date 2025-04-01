import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import OpenAIService from './openai_integration';
import AffindaService from './affinda_integration';
import MapboxService from './mapbox_integration';
import './APIIntegrationComponents.css';

// Initialize Supabase client
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

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
            <p><strong>Email:</strong> {resumeData.email}</p>
            <p><strong>Phone:</strong> {resumeData.phone}</p>
            <p><strong>Location:</strong> {resumeData.location.formatted}</p>
          </div>
          
          {resumeData.summary && (
            <div className="resume-section">
              <h4>Summary</h4>
              <p>{resumeData.summary}</p>
            </div>
          )}
          
          <div className="resume-section">
            <h4>Skills</h4>
            <ul className="skills-list">
              {resumeData.skills.map((skill: any, index: number) => (
                <li key={index}>
                  {skill.name}
                  {skill.level && <span className="skill-level"> ({skill.level})</span>}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="resume-section">
            <h4>Work Experience</h4>
            {resumeData.workExperience.map((exp: any, index: number) => (
              <div key={index} className="experience-item">
                <h5>{exp.jobTitle} at {exp.organization}</h5>
                {(exp.startDate || exp.endDate) && (
                  <p className="date-range">
                    {exp.startDate || 'Unknown'} - {exp.endDate || 'Present'}
                  </p>
                )}
                {exp.location && <p className="location">{exp.location}</p>}
                {exp.description && <p className="description">{exp.description}</p>}
              </div>
            ))}
          </div>
          
          <div className="resume-section">
            <h4>Education</h4>
            {resumeData.education.map((edu: any, index: number) => (
              <div key={index} className="education-item">
                <h5>{edu.degree} at {edu.institution}</h5>
                {(edu.startDate || edu.endDate) && (
                  <p className="date-range">
                    {edu.startDate || 'Unknown'} - {edu.endDate || 'Present'}
                  </p>
                )}
                {edu.gpa && <p className="gpa">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Job Location Search Component
export const JobLocationSearchComponent: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [radius, setRadius] = useState<number>(10);
  const [nearbyJobs, setNearbyJobs] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await MapboxService.findNearbyJobs(location, radius);
      
      if (response.success && response.data) {
        setNearbyJobs(response.data);
      } else {
        setError(response.error || 'Failed to find nearby jobs');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-location-container">
      <h2>Find Jobs Near You</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="location">Your Location</label>
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
            type="number"
            id="radius"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            min="1"
            max="100"
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Find Nearby Jobs'}
        </button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      
      {nearbyJobs && (
        <div className="nearby-jobs-results">
          <h3>Jobs Near {nearbyJobs.userLocation.name}</h3>
          
          {nearbyJobs.jobs.length === 0 ? (
            <p>No jobs found within {radius} km of your location.</p>
          ) : (
            <div className="jobs-list">
              {nearbyJobs.jobs.map((job: any) => (
                <div key={job.id} className="job-card">
                  <h4>{job.title}</h4>
                  <p className="company">{job.company}</p>
                  <p className="location">{job.location}</p>
                  <p className="distance">
                    {(job.distance.value / 1000).toFixed(2)} km away
                  </p>
                  <button 
                    className="view-job-btn"
                    onClick={() => window.location.href = `/jobs/${job.id}`}
                  >
                    View Job
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Commute Calculator Component
export const CommuteCalculatorComponent: React.FC = () => {
  const [homeLocation, setHomeLocation] = useState<string>('');
  const [workLocation, setWorkLocation] = useState<string>('');
  const [mode, setMode] = useState<'driving' | 'walking' | 'cycling'>('driving');
  const [commuteData, setCommuteData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await MapboxService.analyzeCommute(homeLocation, workLocation, mode);
      
      if (response.success && response.data) {
        setCommuteData(response.data);
      } else {
        setError(response.error || 'Failed to analyze commute');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="commute-calculator-container">
      <h2>Commute Calculator</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="homeLocation">Home Location</label>
          <input
            type="text"
            id="homeLocation"
            value={homeLocation}
            onChange={(e) => setHomeLocation(e.target.value)}
            placeholder="e.g., Downtown Dubai"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="workLocation">Work Location</label>
          <input
            type="text"
            id="workLocation"
            value={workLocation}
            onChange={(e) => setWorkLocation(e.target.value)}
            placeholder="e.g., Dubai Media City"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="mode">Transportation Mode</label>
          <select
            id="mode"
            value={mode}
            onChange={(e) => setMode(e.target.value as 'driving' | 'walking' | 'cycling')}
          >
            <option value="driving">Driving</option>
            <option value="walking">Walking</option>
            <option value="cycling">Cycling</option>
          </select>
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Commute'}
        </button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      
      {commuteData && (
        <div className="commute-results">
          <h3>Commute Analysis</h3>
          
          <div className="commute-summary">
            <div className="commute-detail">
              <span className="label">From:</span>
              <span className="value">{commuteData.origin.name}</span>
            </div>
            
            <div className="commute-detail">
              <span className="label">To:</span>
              <span className="value">{commuteData.destination.name}</span>
            </div>
            
            <div className="commute-detail">
              <span className="label">Distance:</span>
              <span className="value">
                {(commuteData.distance.value / 1000).toFixed(2)} km
              </span>
            </div>
            
            <div className="commute-detail">
              <span className="label">Duration:</span>
              <span className="value">
                {Math.floor(commuteData.duration.value / 60)} minutes
              </span>
            </div>
            
            <div className="commute-detail">
              <span className="label">Mode:</span>
              <span className="value">{mode.charAt(0).toUpperCase() + mode.slice(1)}</span>
            </div>
          </div>
          
          <div className="commute-map">
            {/* Map would be rendered here using Mapbox GL JS */}
            <div className="map-placeholder">
              <p>Map visualization would be displayed here</p>
              <p>From: {commuteData.origin.name}</p>
              <p>To: {commuteData.destination.name}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Skills Gap Analysis Component
export const SkillsGapAnalysisComponent: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [jobId, setJobId] = useState<string>('');
  const [jobs, setJobs] = useState<any[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);
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

    // Fetch available jobs
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from('job_postings')
        .select('id, title, company')
        .eq('status', 'active');
        
      if (!error && data) {
        setJobs(data);
      }
    };

    fetchUser();
    fetchJobs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await OpenAIService.analyzeSkillsGap(userId, jobId);
      
      if (response.success && response.data) {
        setAnalysis(response.data);
      } else {
        setError(response.error || 'Failed to analyze skills gap');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="skills-gap-container">
      <h2>Skills Gap Analysis</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="jobId">Select Job</label>
          <select
            id="jobId"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            required
          >
            <option value="">-- Select a job --</option>
            {jobs.map(job => (
              <option key={job.id} value={job.id}>
                {job.title} at {job.company}
              </option>
            ))}
          </select>
        </div>
        
        <button type="submit" disabled={loading || !userId || !jobId}>
          {loading ? 'Analyzing...' : 'Analyze Skills Gap'}
        </button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      
      {analysis && (
        <div className="analysis-results">
          <h3>Skills Gap Analysis</h3>
          
          <div className="analysis-section">
            <h4>Your Current Skills</h4>
            <ul className="skills-list">
              {analysis.currentSkills.map((skill: string, index: number) => (
                <li key={index} className="current-skill">{skill}</li>
              ))}
            </ul>
          </div>
          
          <div className="analysis-section">
            <h4>Missing Skills</h4>
            {analysis.missingSkills.length === 0 ? (
              <p>You have all the required skills for this job!</p>
            ) : (
              <ul className="missing-skills-list">
                {analysis.missingSkills.map((skill: any, index: number) => (
                  <li key={index} className="missing-skill">
                    <div className="skill-header">
                      <span className="skill-name">{skill.skill}</span>
                      <span className="skill-importance">
                        Importance: {skill.importance}/5
                      </span>
                    </div>
                    {skill.resources.length > 0 && (
                      <div className="skill-resources">
                        <strong>Resources to learn:</strong>
                        <ul>
                          {skill.resources.map((resource: string, i: number) => (
                            <li key={i}>{resource}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="analysis-section">
            <h4>Recommendations</h4>
            <p>{analysis.recommendations}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Interview Preparation Component
export const InterviewPrepComponent: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [jobId, setJobId] = useState<string>('');
  const [jobs, setJobs] = useState<any[]>([]);
  const [prepData, setPrepData] = useState<any>(null);
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

    // Fetch available jobs
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from('job_postings')
        .select('id, title, company')
        .eq('status', 'active');
        
      if (!error && data) {
        setJobs(data);
      }
    };

    fetchUser();
    fetchJobs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await OpenAIService.prepareForInterview(userId, jobId);
      
      if (response.success && response.data) {
        setPrepData(response.data);
      } else {
        setError(response.error || 'Failed to prepare for interview');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="interview-prep-container">
      <h2>Interview Preparation</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="jobId">Select Job</label>
          <select
            id="jobId"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            required
          >
            <option value="">-- Select a job --</option>
            {jobs.map(job => (
              <option key={job.id} value={job.id}>
                {job.title} at {job.company}
              </option>
            ))}
          </select>
        </div>
        
        <button type="submit" disabled={loading || !userId || !jobId}>
          {loading ? 'Preparing...' : 'Prepare for Interview'}
        </button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      
      {prepData && (
        <div className="prep-results">
          <h3>Interview Preparation</h3>
          
          <div className="prep-section">
            <h4>Common Questions</h4>
            <div className="questions-list">
              {prepData.commonQuestions.map((item: any, index: number) => (
                <div key={index} className="question-item">
                  <div className="question">
                    <strong>Q: {item.question}</strong>
                  </div>
                  <div className="answer">
                    <p><strong>Sample Answer:</strong> {item.sampleAnswer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="prep-section">
            <h4>Interview Tips</h4>
            <ul className="tips-list">
              {prepData.tips.map((tip: string, index: number) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
          
          <div className="prep-section">
            <h4>Preparation Advice</h4>
            <p>{prepData.preparation}</p>
          </div>
        </div>
      )}
    </div>
  );
};
