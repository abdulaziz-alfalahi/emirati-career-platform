import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './EmployerDashboard.css';

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// Interface for Job Posting
interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary_range?: string;
  employment_type: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience_level: 'entry' | 'mid' | 'senior' | 'executive';
  posted_at: string;
  expires_at: string;
  status: 'active' | 'closed' | 'draft';
  applicants_count: number;
}

// Interface for Job Application
interface JobApplication {
  id: string;
  job_id: string;
  applicant_id: string;
  applicant_name: string;
  applicant_email: string;
  resume_url?: string;
  cover_letter?: string;
  applied_at: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  applicant_profile?: {
    experience: string[];
    education: string[];
    skills: string[];
    profile_image?: string;
  };
}

// Interface for Employer Profile
interface EmployerProfile {
  id: string;
  company_name: string;
  industry: string;
  company_size: string;
  location: string;
  website?: string;
  description?: string;
  logo_url?: string;
}

const EmployerDashboard: React.FC = () => {
  // State variables
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [employerProfile, setEmployerProfile] = useState<EmployerProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'applications' | 'profile'>('overview');
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [showJobFormModal, setShowJobFormModal] = useState<boolean>(false);
  const [jobFormData, setJobFormData] = useState<Partial<JobPosting>>({
    title: '',
    company: '',
    location: '',
    description: '',
    requirements: [],
    salary_range: '',
    employment_type: 'full-time',
    experience_level: 'mid',
    status: 'draft'
  });
  const [requirementInput, setRequirementInput] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Fetch employer data on component mount
  useEffect(() => {
    fetchEmployerData();
  }, []);

  // Function to fetch all employer-related data from Supabase
  const fetchEmployerData = async () => {
    try {
      setLoading(true);
      
      // Get current user ID (employer ID)
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData.session) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }
      
      const employerId = sessionData.session.user.id;
      
      if (!employerId) {
        setError('User ID not found');
        setLoading(false);
        return;
      }
      
      // Fetch employer profile
      const { data: profileData, error: profileError } = await supabase
        .from('employer_profiles')
        .select('*')
        .eq('id', employerId)
        .single();
      
      if (profileData) {
        setEmployerProfile(profileData);
      } else if (profileError) {
        console.error('Error fetching employer profile:', profileError);
      }
      
      // Fetch job postings
      const { data: jobsData, error: jobsError } = await supabase
        .from('job_postings')
        .select('*, applications:job_applications(count)')
        .eq('employer_id', employerId);
      
      if (jobsError) {
        console.error('Error fetching job postings:', jobsError);
        setError(jobsError.message);
      } else if (jobsData) {
        // Transform the data to match our JobPosting interface
        const jobsList = jobsData.map((job: any) => ({
          id: job.id,
          title: job.title,
          company: job.company,
          location: job.location,
          description: job.description,
          requirements: job.requirements || [],
          salary_range: job.salary_range,
          employment_type: job.employment_type,
          experience_level: job.experience_level,
          posted_at: job.posted_at,
          expires_at: job.expires_at,
          status: job.status,
          applicants_count: job.applications?.count || 0
        }));
        
        setJobPostings(jobsList);
      }
      
      // Fetch job applications for all jobs
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('job_applications')
        .select(`
          *,
          job:job_postings(id, title),
          applicant:profiles(id, full_name, email, avatar_url, experience, education, skills)
        `)
        .in('job_id', jobsData?.map((job: any) => job.id) || []);
      
      if (applicationsError) {
        console.error('Error fetching job applications:', applicationsError);
      } else if (applicationsData) {
        // Transform the data to match our JobApplication interface
        const applicationsList = applicationsData.map((app: any) => ({
          id: app.id,
          job_id: app.job_id,
          applicant_id: app.applicant_id,
          applicant_name: app.applicant?.full_name || 'Unknown Applicant',
          applicant_email: app.applicant?.email || '',
          resume_url: app.resume_url,
          cover_letter: app.cover_letter,
          applied_at: app.applied_at,
          status: app.status,
          applicant_profile: {
            experience: app.applicant?.experience || [],
            education: app.applicant?.education || [],
            skills: app.applicant?.skills || [],
            profile_image: app.applicant?.avatar_url
          }
        }));
        
        setApplications(applicationsList);
      }
      
      setLoading(false);
    } catch (err: any) {
      console.error('Error fetching employer data:', err);
      setError(err.message || 'Failed to fetch employer data');
      setLoading(false);
    }
  };

  // Handle creating a new job posting
  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Get current user ID (employer ID)
      const { data: sessionData } = await supabase.auth.getSession();
      const employerId = sessionData.session?.user?.id;
      
      if (!employerId) {
        throw new Error('User not authenticated');
      }
      
      // Prepare job data
      const now = new Date();
      const expiresAt = new Date();
      expiresAt.setDate(now.getDate() + 30); // Default expiry is 30 days
      
      const jobData = {
        ...jobFormData,
        employer_id: employerId,
        company: employerProfile?.company_name || jobFormData.company,
        posted_at: now.toISOString(),
        expires_at: expiresAt.toISOString(),
        created_at: now.toISOString(),
        updated_at: now.toISOString()
      };
      
      // Insert job posting
      const { data: newJob, error } = await supabase
        .from('job_postings')
        .insert(jobData)
        .select();
      
      if (error) throw error;
      
      // Reset form and close modal
      setJobFormData({
        title: '',
        company: '',
        location: '',
        description: '',
        requirements: [],
        salary_range: '',
        employment_type: 'full-time',
        experience_level: 'mid',
        status: 'draft'
      });
      setShowJobFormModal(false);
      
      // Refresh job postings
      fetchEmployerData();
      
    } catch (err: any) {
      console.error('Error creating job posting:', err);
      setError(err.message || 'Failed to create job posting');
    }
  };

  // Handle updating job status
  const handleUpdateJobStatus = async (jobId: string, status: 'active' | 'closed' | 'draft') => {
    try {
      const { error } = await supabase
        .from('job_postings')
        .update({
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId);
      
      if (error) throw error;
      
      // Update local state
      setJobPostings(jobPostings.map(job => 
        job.id === jobId ? { ...job, status } : job
      ));
      
      // If we're viewing a job, update that too
      if (selectedJob && selectedJob.id === jobId) {
        setSelectedJob({ ...selectedJob, status });
      }
      
    } catch (err: any) {
      console.error('Error updating job status:', err);
      setError(err.message || 'Failed to update job status');
    }
  };

  // Handle updating application status
  const handleUpdateApplicationStatus = async (applicationId: string, status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired') => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', applicationId);
      
      if (error) throw error;
      
      // Update local state
      setApplications(applications.map(app => 
        app.id === applicationId ? { ...app, status } : app
      ));
      
      // If we're viewing an application, update that too
      if (selectedApplication && selectedApplication.id === applicationId) {
        setSelectedApplication({ ...selectedApplication, status });
      }
      
    } catch (err: any) {
      console.error('Error updating application status:', err);
      setError(err.message || 'Failed to update application status');
    }
  };

  // Handle adding a requirement to the job form
  const handleAddRequirement = () => {
    if (requirementInput.trim() !== '') {
      setJobFormData({
        ...jobFormData,
        requirements: [...(jobFormData.requirements || []), requirementInput.trim()]
      });
      setRequirementInput('');
    }
  };

  // Handle removing a requirement from the job form
  const handleRemoveRequirement = (index: number) => {
    const updatedRequirements = [...(jobFormData.requirements || [])];
    updatedRequirements.splice(index, 1);
    setJobFormData({
      ...jobFormData,
      requirements: updatedRequirements
    });
  };

  // Handle form input changes for job posting
  const handleJobFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setJobFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Filter applications by job
  const getApplicationsForJob = (jobId: string) => {
    return applications.filter(app => app.job_id === jobId);
  };

  // Filter jobs by status
  const getFilteredJobs = () => {
    if (filterStatus === 'all') {
      return jobPostings;
    }
    return jobPostings.filter(job => job.status === filterStatus);
  };

  // Render loading state
  if (loading) {
    return (
      <div className="employer-dashboard loading">
        <div className="loading-spinner"></div>
        <p>Loading employer dashboard...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="employer-dashboard error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => {
          setError(null);
          fetchEmployerData();
        }}>Retry</button>
      </div>
    );
  }

  // Render dashboard content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="dashboard-overview">
            <div className="dashboard-stats">
              <div className="stat-card">
                <h3>Active Jobs</h3>
                <p className="stat-value">{jobPostings.filter(job => job.status === 'active').length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Applications</h3>
                <p className="stat-value">{applications.length}</p>
              </div>
              <div className="stat-card">
                <h3>Pending Review</h3>
                <p className="stat-value">{applications.filter(app => app.status === 'pending').length}</p>
              </div>
              <div className="stat-card">
                <h3>Shortlisted</h3>
                <p className="stat-value">{applications.filter(app => app.status === 'shortlisted').length}</p>
              </div>
            </div>
            
            <div className="recent-jobs">
              <div className="section-header">
                <h3>Recent Job Postings</h3>
                <button 
                  className="btn-primary"
                  onClick={() => setShowJobFormModal(true)}
                >
                  Post New Job
                </button>
              </div>
              
              {jobPostings.length > 0 ? (
                <div className="jobs-list">
                  {jobPostings.slice(0, 3).map(job => (
                    <div key={job.id} className="job-card">
                      <div className="job-header">
                        <h4>{job.title}</h4>
                        <span className={`status-badge ${job.status}`}>
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </span>
                      </div>
                      <div className="job-details">
                        <p><strong>Location:</strong> {job.location}</p>
                        <p><strong>Type:</strong> {job.employment_type.replace('-', ' ')}</p>
                        <p><strong>Applications:</strong> {job.applicants_count}</p>
                      </div>
                      <div className="job-actions">
                        <button 
                          className="btn-secondary"
                          onClick={() => setSelectedJob(job)}
                        >
                          View Details
                        </button>
                        {job.status === 'draft' && (
                          <button 
                            className="btn-primary"
                            onClick={() => handleUpdateJobStatus(job.id, 'active')}
                          >
                            Publish
                          </button>
                        )}
                        {job.status === 'active' && (
                          <button 
                            className="btn-danger"
                            onClick={() => handleUpdateJobStatus(job.id, 'closed')}
                          >
                            Close
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">No job postings yet. Create your first job posting!</p>
              )}
            </div>
            
            <div className="recent-applications">
              <h3>Recent Applications</h3>
              
              {applications.length > 0 ? (
                <div className="applications-list">
                  {applications.slice(0, 5).map(app => (
                    <div key={app.id} className="application-card">
                      <div className="applicant-info">
                        <div className="applicant-avatar">
                          {app.applicant_profile?.profile_image ? (
                            <img src={app.applicant_profile.profile_image} alt={app.applicant_name} />
                          ) : (
                            <div className="avatar-placeholder">
                              {app.applicant_name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <h4>{app.applicant_name}</h4>
                          <p className="job-title">
                            Applied for: {jobPostings.find(job => job.id === app.job_id)?.title || 'Unknown Job'}
                          </p>
                          <p className="application-date">
                            {new Date(app.applied_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="application-status">
                        <span className={`status-badge ${app.status}`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </div>
                      <div className="application-actions">
                        <button 
                          className="btn-secondary"
                          onClick={() => setSelectedApplication(app)}
                        >
                          View Application
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">No applications received yet.</p>
              )}
            </div>
          </div>
        );
        
      case 'jobs':
        return (
          <div className="jobs-management">
            <div className="section-header">
              <h3>Manage Job Postings</h3>
              <div className="actions-container">
                <div className="filter-container">
                  <label htmlFor="status-filter">Filter by status:</label>
                  <select 
                    id="status-filter" 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Jobs</option>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <button 
                  className="btn-primary"
                  onClick={() => setShowJobFormModal(true)}
                >
                  Post New Job
                </button>
              </div>
            </div>
            
            {getFilteredJobs().length > 0 ? (
              <div className="jobs-table">
                <div className="table-header">
                  <div className="col-title">Job Title</div>
                  <div className="col-location">Location</div>
                  <div className="col-type">Type</div>
                  <div className="col-date">Posted Date</div>
                  <div className="col-applicants">Applicants</div>
                  <div className="col-status">Status</div>
                  <div className="col-actions">Actions</div>
                </div>
                
                {getFilteredJobs().map(job => (
                  <div key={job.id} className="table-row">
                    <div className="col-title">{job.title}</div>
                    <div className="col-location">{job.location}</div>
                    <div className="col-type">
                      {job.employment_type.replace('-', ' ')}
                    </div>
                    <div className="col-date">
                      {new Date(job.posted_at).toLocaleDateString()}
                    </div>
                    <div className="col-applicants">
                      {job.applicants_count}
                    </div>
                    <div className="col-status">
                      <span className={`status-badge ${job.status}`}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </div>
                    <div className="col-actions">
                      <button 
                        className="btn-icon" 
                        title="View Details"
                        onClick={() => setSelectedJob(job)}
                      >
                        👁️
                      </button>
                      
                      {job.status === 'draft' && (
                        <button 
                          className="btn-icon" 
                          title="Publish Job"
                          onClick={() => handleUpdateJobStatus(job.id, 'active')}
                        >
                          📢
                        </button>
                      )}
                      
                      {job.status === 'active' && (
                        <button 
                          className="btn-icon" 
                          title="Close Job"
                          onClick={() => handleUpdateJobStatus(job.id, 'closed')}
                        >
                          🛑
                        </button>
                      )}
                      
                      {job.status === 'closed' && (
                        <button 
                          className="btn-icon" 
                          title="Reopen Job"
                          onClick={() => handleUpdateJobStatus(job.id, 'active')}
                        >
                          🔄
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No job postings match the selected filter.</p>
            )}
          </div>
        );
        
      case 'applications':
        return (
          <div className="applications-management">
            <h3>Manage Applications</h3>
            
            {applications.length > 0 ? (
              <>
                <div className="filter-container">
                  <label htmlFor="job-filter">Filter by job:</label>
                  <select 
                    id="job-filter"
                    onChange={(e) => {
                      if (e.target.value === 'all') {
                        // Show all applications
                      } else {
                        // Filter by job ID
                        const jobId = e.target.value;
                        const job = jobPostings.find(j => j.id === jobId);
                        if (job) {
                          setSelectedJob(job);
                        }
                      }
                    }}
                  >
                    <option value="all">All Jobs</option>
                    {jobPostings.map(job => (
                      <option key={job.id} value={job.id}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="applications-table">
                  <div className="table-header">
                    <div className="col-applicant">Applicant</div>
                    <div className="col-job">Job</div>
                    <div className="col-date">Applied Date</div>
                    <div className="col-status">Status</div>
                    <div className="col-actions">Actions</div>
                  </div>
                  
                  {applications.map(app => (
                    <div key={app.id} className="table-row">
                      <div className="col-applicant">
                        <div className="applicant-info">
                          <div className="applicant-avatar">
                            {app.applicant_profile?.profile_image ? (
                              <img src={app.applicant_profile.profile_image} alt={app.applicant_name} />
                            ) : (
                              <div className="avatar-placeholder">
                                {app.applicant_name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="applicant-name">{app.applicant_name}</div>
                            <div className="applicant-email">{app.applicant_email}</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-job">
                        {jobPostings.find(job => job.id === app.job_id)?.title || 'Unknown Job'}
                      </div>
                      <div className="col-date">
                        {new Date(app.applied_at).toLocaleDateString()}
                      </div>
                      <div className="col-status">
                        <span className={`status-badge ${app.status}`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </div>
                      <div className="col-actions">
                        <button 
                          className="btn-icon" 
                          title="View Application"
                          onClick={() => setSelectedApplication(app)}
                        >
                          👁️
                        </button>
                        
                        {app.status === 'pending' && (
                          <button 
                            className="btn-icon" 
                            title="Mark as Reviewed"
                            onClick={() => handleUpdateApplicationStatus(app.id, 'reviewed')}
                          >
                            ✓
                          </button>
                        )}
                        
                        {(app.status === 'pending' || app.status === 'reviewed') && (
                          <button 
                            className="btn-icon" 
                            title="Shortlist"
                            onClick={() => handleUpdateApplicationStatus(app.id, 'shortlisted')}
                          >
                            ⭐
                          </button>
                        )}
                        
                        {app.status !== 'rejected' && app.status !== 'hired' && (
                          <button 
                            className="btn-icon" 
                            title="Reject"
                            onClick={() => handleUpdateApplicationStatus(app.id, 'rejected')}
                          >
                            ❌
                          </button>
                        )}
                        
                        {app.status === 'shortlisted' && (
                          <button 
                            className="btn-icon" 
                            title="Hire"
                            onClick={() => handleUpdateApplicationStatus(app.id, 'hired')}
                          >
                            🎉
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="no-data">No applications received yet.</p>
            )}
          </div>
        );
        
      case 'profile':
        return (
          <div className="employer-profile">
            <h3>Company Profile</h3>
            
            {employerProfile ? (
              <div className="profile-container">
                <div className="profile-header">
                  <div className="company-logo">
                    {employerProfile.logo_url ? (
                      <img src={employerProfile.logo_url} alt={employerProfile.company_name} />
                    ) : (
                      <div className="logo-placeholder">
                        {employerProfile.company_name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="company-info">
                    <h2>{employerProfile.company_name}</h2>
                    <p className="company-industry">{employerProfile.industry}</p>
                    <p className="company-location">{employerProfile.location}</p>
                    {employerProfile.website && (
                      <p className="company-website">
                        <a href={employerProfile.website} target="_blank" rel="noopener noreferrer">
                          {employerProfile.website}
                        </a>
                      </p>
                    )}
                  </div>
                  <button className="btn-secondary">Edit Profile</button>
                </div>
                
                <div className="profile-details">
                  <div className="detail-section">
                    <h4>Company Description</h4>
                    <p>{employerProfile.description || 'No company description provided.'}</p>
                  </div>
                  
                  <div className="detail-section">
                    <h4>Company Size</h4>
                    <p>{employerProfile.company_size}</p>
                  </div>
                </div>
                
                <div className="profile-stats">
                  <div className="stat-card">
                    <h4>Total Jobs Posted</h4>
                    <p className="stat-value">{jobPostings.length}</p>
                  </div>
                  <div className="stat-card">
                    <h4>Active Jobs</h4>
                    <p className="stat-value">{jobPostings.filter(job => job.status === 'active').length}</p>
                  </div>
                  <div className="stat-card">
                    <h4>Total Applications</h4>
                    <p className="stat-value">{applications.length}</p>
                  </div>
                  <div className="stat-card">
                    <h4>Hired Candidates</h4>
                    <p className="stat-value">{applications.filter(app => app.status === 'hired').length}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="profile-setup">
                <h4>Complete Your Company Profile</h4>
                <p>Set up your company profile to attract the best candidates.</p>
                <button className="btn-primary">Create Profile</button>
              </div>
            )}
          </div>
        );
        
      default:
        return <div>Select a tab to view content</div>;
    }
  };

  // Main dashboard render
  return (
    <div className="employer-dashboard">
      <header className="dashboard-header">
        <h1>Employer Dashboard</h1>
        <div className="company-profile">
          <span className="company-name">
            {employerProfile?.company_name || 'Your Company'}
          </span>
          <div className="company-logo">
            {employerProfile?.logo_url ? (
              <img src={employerProfile.logo_url} alt="Company Logo" />
            ) : (
              <div className="logo-placeholder">
                {(employerProfile?.company_name || 'C').charAt(0)}
              </div>
            )}
          </div>
        </div>
      </header>
      
      <nav className="dashboard-nav">
        <ul>
          <li>
            <button 
              className={activeTab === 'overview' ? 'active' : ''} 
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
          </li>
          <li>
            <button 
              className={activeTab === 'jobs' ? 'active' : ''} 
              onClick={() => setActiveTab('jobs')}
            >
              Jobs
            </button>
          </li>
          <li>
            <button 
              className={activeTab === 'applications' ? 'active' : ''} 
              onClick={() => setActiveTab('applications')}
            >
              Applications
            </button>
          </li>
          <li>
            <button 
              className={activeTab === 'profile' ? 'active' : ''} 
              onClick={() => setActiveTab('profile')}
            >
              Company Profile
            </button>
          </li>
        </ul>
      </nav>
      
      <main className="dashboard-content">
        {renderContent()}
      </main>
      
      {/* Job Details Modal */}
      {selectedJob && (
        <div className="modal job-details-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Job Details</h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedJob(null)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="job-title-header">
                <h3>{selectedJob.title}</h3>
                <span className={`status-badge ${selectedJob.status}`}>
                  {selectedJob.status.charAt(0).toUpperCase() + selectedJob.status.slice(1)}
                </span>
              </div>
              
              <div className="job-meta">
                <div className="meta-item">
                  <span className="meta-label">Company:</span>
                  <span className="meta-value">{selectedJob.company}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Location:</span>
                  <span className="meta-value">{selectedJob.location}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Employment Type:</span>
                  <span className="meta-value">{selectedJob.employment_type.replace('-', ' ')}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Experience Level:</span>
                  <span className="meta-value">{selectedJob.experience_level}</span>
                </div>
                {selectedJob.salary_range && (
                  <div className="meta-item">
                    <span className="meta-label">Salary Range:</span>
                    <span className="meta-value">{selectedJob.salary_range}</span>
                  </div>
                )}
                <div className="meta-item">
                  <span className="meta-label">Posted:</span>
                  <span className="meta-value">{new Date(selectedJob.posted_at).toLocaleDateString()}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Expires:</span>
                  <span className="meta-value">{new Date(selectedJob.expires_at).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="job-description">
                <h4>Description</h4>
                <p>{selectedJob.description}</p>
              </div>
              
              <div className="job-requirements">
                <h4>Requirements</h4>
                {selectedJob.requirements && selectedJob.requirements.length > 0 ? (
                  <ul>
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No specific requirements listed.</p>
                )}
              </div>
              
              <div className="job-applications">
                <h4>Applications ({getApplicationsForJob(selectedJob.id).length})</h4>
                {getApplicationsForJob(selectedJob.id).length > 0 ? (
                  <div className="applications-list">
                    {getApplicationsForJob(selectedJob.id).map(app => (
                      <div key={app.id} className="application-item">
                        <div className="applicant-info">
                          <div className="applicant-avatar">
                            {app.applicant_profile?.profile_image ? (
                              <img src={app.applicant_profile.profile_image} alt={app.applicant_name} />
                            ) : (
                              <div className="avatar-placeholder">
                                {app.applicant_name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <h5>{app.applicant_name}</h5>
                            <p className="application-date">
                              Applied on {new Date(app.applied_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="application-status">
                          <span className={`status-badge ${app.status}`}>
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </span>
                        </div>
                        <button 
                          className="btn-secondary"
                          onClick={() => {
                            setSelectedApplication(app);
                            setSelectedJob(null);
                          }}
                        >
                          View Application
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No applications received for this job yet.</p>
                )}
              </div>
            </div>
            <div className="modal-footer">
              {selectedJob.status === 'draft' && (
                <button 
                  className="btn-primary"
                  onClick={() => handleUpdateJobStatus(selectedJob.id, 'active')}
                >
                  Publish Job
                </button>
              )}
              {selectedJob.status === 'active' && (
                <button 
                  className="btn-danger"
                  onClick={() => handleUpdateJobStatus(selectedJob.id, 'closed')}
                >
                  Close Job
                </button>
              )}
              {selectedJob.status === 'closed' && (
                <button 
                  className="btn-primary"
                  onClick={() => handleUpdateJobStatus(selectedJob.id, 'active')}
                >
                  Reopen Job
                </button>
              )}
              <button 
                className="btn-secondary"
                onClick={() => setSelectedJob(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="modal application-details-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Application Details</h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedApplication(null)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="applicant-header">
                <div className="applicant-avatar large">
                  {selectedApplication.applicant_profile?.profile_image ? (
                    <img src={selectedApplication.applicant_profile.profile_image} alt={selectedApplication.applicant_name} />
                  ) : (
                    <div className="avatar-placeholder">
                      {selectedApplication.applicant_name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="applicant-details">
                  <h3>{selectedApplication.applicant_name}</h3>
                  <p className="applicant-email">{selectedApplication.applicant_email}</p>
                  <p className="application-meta">
                    Applied for: {jobPostings.find(job => job.id === selectedApplication.job_id)?.title || 'Unknown Job'}
                  </p>
                  <p className="application-meta">
                    Date: {new Date(selectedApplication.applied_at).toLocaleDateString()}
                  </p>
                  <div className="application-status">
                    <span className={`status-badge ${selectedApplication.status}`}>
                      {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              {selectedApplication.resume_url && (
                <div className="resume-section">
                  <h4>Resume</h4>
                  <div className="resume-preview">
                    <a 
                      href={selectedApplication.resume_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      View Resume
                    </a>
                  </div>
                </div>
              )}
              
              {selectedApplication.cover_letter && (
                <div className="cover-letter-section">
                  <h4>Cover Letter</h4>
                  <div className="cover-letter-content">
                    <p>{selectedApplication.cover_letter}</p>
                  </div>
                </div>
              )}
              
              <div className="applicant-profile-section">
                <h4>Applicant Profile</h4>
                
                <div className="profile-section">
                  <h5>Skills</h5>
                  <div className="skills-tags">
                    {selectedApplication.applicant_profile?.skills && 
                     selectedApplication.applicant_profile.skills.length > 0 ? (
                      selectedApplication.applicant_profile.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))
                    ) : (
                      <p>No skills listed</p>
                    )}
                  </div>
                </div>
                
                <div className="profile-section">
                  <h5>Experience</h5>
                  {selectedApplication.applicant_profile?.experience && 
                   selectedApplication.applicant_profile.experience.length > 0 ? (
                    <ul className="experience-list">
                      {selectedApplication.applicant_profile.experience.map((exp, index) => (
                        <li key={index}>{exp}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No experience listed</p>
                  )}
                </div>
                
                <div className="profile-section">
                  <h5>Education</h5>
                  {selectedApplication.applicant_profile?.education && 
                   selectedApplication.applicant_profile.education.length > 0 ? (
                    <ul className="education-list">
                      {selectedApplication.applicant_profile.education.map((edu, index) => (
                        <li key={index}>{edu}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No education listed</p>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {selectedApplication.status === 'pending' && (
                <button 
                  className="btn-primary"
                  onClick={() => handleUpdateApplicationStatus(selectedApplication.id, 'reviewed')}
                >
                  Mark as Reviewed
                </button>
              )}
              
              {(selectedApplication.status === 'pending' || selectedApplication.status === 'reviewed') && (
                <button 
                  className="btn-primary"
                  onClick={() => handleUpdateApplicationStatus(selectedApplication.id, 'shortlisted')}
                >
                  Shortlist Candidate
                </button>
              )}
              
              {selectedApplication.status === 'shortlisted' && (
                <button 
                  className="btn-success"
                  onClick={() => handleUpdateApplicationStatus(selectedApplication.id, 'hired')}
                >
                  Hire Candidate
                </button>
              )}
              
              {selectedApplication.status !== 'rejected' && selectedApplication.status !== 'hired' && (
                <button 
                  className="btn-danger"
                  onClick={() => handleUpdateApplicationStatus(selectedApplication.id, 'rejected')}
                >
                  Reject Application
                </button>
              )}
              
              <button 
                className="btn-secondary"
                onClick={() => setSelectedApplication(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* New Job Form Modal */}
      {showJobFormModal && (
        <div className="modal job-form-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Post New Job</h2>
              <button 
                className="close-btn"
                onClick={() => setShowJobFormModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleCreateJob}>
                <div className="form-group">
                  <label htmlFor="title">Job Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={jobFormData.title}
                    onChange={handleJobFormChange}
                    required
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={jobFormData.location}
                    onChange={handleJobFormChange}
                    required
                    placeholder="e.g., Dubai, UAE"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="employment_type">Employment Type</label>
                    <select
                      id="employment_type"
                      name="employment_type"
                      value={jobFormData.employment_type}
                      onChange={handleJobFormChange}
                      required
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="experience_level">Experience Level</label>
                    <select
                      id="experience_level"
                      name="experience_level"
                      value={jobFormData.experience_level}
                      onChange={handleJobFormChange}
                      required
                    >
                      <option value="entry">Entry Level</option>
                      <option value="mid">Mid Level</option>
                      <option value="senior">Senior Level</option>
                      <option value="executive">Executive Level</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="salary_range">Salary Range (Optional)</label>
                  <input
                    type="text"
                    id="salary_range"
                    name="salary_range"
                    value={jobFormData.salary_range}
                    onChange={handleJobFormChange}
                    placeholder="e.g., AED 15,000 - 20,000 per month"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Job Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={jobFormData.description}
                    onChange={handleJobFormChange}
                    required
                    placeholder="Describe the job responsibilities, qualifications, and other details"
                    rows={6}
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label>Requirements</label>
                  <div className="requirements-input">
                    <input
                      type="text"
                      value={requirementInput}
                      onChange={(e) => setRequirementInput(e.target.value)}
                      placeholder="Add a requirement and press Enter"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddRequirement();
                        }
                      }}
                    />
                    <button 
                      type="button" 
                      className="btn-add"
                      onClick={handleAddRequirement}
                    >
                      Add
                    </button>
                  </div>
                  
                  <div className="requirements-list">
                    {jobFormData.requirements && jobFormData.requirements.length > 0 ? (
                      <ul>
                        {jobFormData.requirements.map((req, index) => (
                          <li key={index}>
                            {req}
                            <button 
                              type="button" 
                              className="btn-remove"
                              onClick={() => handleRemoveRequirement(index)}
                            >
                              ✕
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="no-requirements">No requirements added yet</p>
                    )}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="status">Initial Status</label>
                  <select
                    id="status"
                    name="status"
                    value={jobFormData.status}
                    onChange={handleJobFormChange}
                    required
                  >
                    <option value="draft">Save as Draft</option>
                    <option value="active">Publish Immediately</option>
                  </select>
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    {jobFormData.status === 'draft' ? 'Save as Draft' : 'Publish Job'}
                  </button>
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => setShowJobFormModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;
