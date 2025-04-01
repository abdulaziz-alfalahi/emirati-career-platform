import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './MentorDashboard.css';

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://awyosxxqnqxmuoowjwyf.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3eW9zeHhxbnF4bXVvb3dqd3lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MjkwMzUsImV4cCI6MjA1OTAwNTAzNX0.Omb_mkDDwhBRbk7q-Ierae9mtWOLsCoTsWqAo9syf00';
const supabase = createClient(supabaseUrl, supabaseKey);

// Interface for Mentee data
interface Mentee {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  industry?: string;
  currentRole?: string;
  targetRole?: string;
  skills?: string[];
  progress?: number;
  lastActive?: string;
  status: 'active' | 'pending' | 'completed';
}

// Interface for Mentorship Session
interface MentorshipSession {
  id: string;
  menteeId: string;
  menteeName: string;
  scheduledAt: string;
  duration: number;
  topic: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

// Interface for Mentorship Request
interface MentorshipRequest {
  id: string;
  menteeId: string;
  mentorId: string;
  status: 'pending' | 'accepted' | 'rejected';
  requestedAt: string;
  mentee: {
    id: string;
    name: string;
    email: string;
    profileImage?: string;
    industry?: string;
    currentRole?: string;
    targetRole?: string;
    skills?: string[];
  };
}

const MentorDashboard: React.FC = () => {
  // State variables
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<MentorshipSession[]>([]);
  const [pendingRequests, setPendingRequests] = useState<MentorshipRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'mentees' | 'sessions' | 'requests'>('overview');
  const [selectedMentee, setSelectedMentee] = useState<Mentee | null>(null);
  const [mentorProfile, setMentorProfile] = useState<any>(null);
  const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);
  const [selectedMenteeForSession, setSelectedMenteeForSession] = useState<string | null>(null);
  const [sessionFormData, setSessionFormData] = useState({
    topic: '',
    scheduledAt: '',
    duration: 30,
    notes: ''
  });

  // Fetch mentor data on component mount
  useEffect(() => {
    fetchMentorData();
  }, []);

  // Function to fetch all mentor-related data from Supabase
  const fetchMentorData = async () => {
    try {
      setLoading(true);
      
      // Get current user ID (mentor ID)
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }
      
      const mentorId = sessionData.session?.user?.id;
      
      if (!mentorId) {
        setError('User ID not found');
        setLoading(false);
        return;
      }
      
      // Fetch mentor profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', mentorId)
        .single();
      
      if (profileData) {
        setMentorProfile(profileData);
      }
      
      // Fetch mentees (users who have an active mentorship relationship with this mentor)
      const { data: menteesData, error: menteesError } = await supabase
        .from('mentorship_relationships')
        .select('*, mentee:profiles(*)')
        .eq('mentor_id', mentorId)
        .eq('status', 'active');
      
      // Transform the data to match our Mentee interface
      const menteesList = menteesData?.map((relationship: any) => ({
        id: relationship.mentee.id,
        name: relationship.mentee.name || relationship.mentee.full_name,
        email: relationship.mentee.email,
        profileImage: relationship.mentee.avatar_url,
        industry: relationship.mentee.industry,
        currentRole: relationship.mentee.current_role,
        targetRole: relationship.mentee.target_role,
        skills: relationship.mentee.skills,
        progress: relationship.progress || 0,
        lastActive: relationship.mentee.last_active,
        status: relationship.status
      })) || [];
      
      setMentees(menteesList);
      
      // Fetch upcoming sessions
      const now = new Date().toISOString();
      const { data: sessionsData, error: sessionsError } = await supabase
        .from('mentorship_sessions')
        .select('*, mentee:profiles(id, name, full_name, email)')
        .eq('mentor_id', mentorId);
      
      // Transform and sort sessions
      const sessionsList = sessionsData?.map((session: any) => ({
        id: session.id,
        menteeId: session.mentee_id,
        menteeName: session.mentee.name || session.mentee.full_name,
        scheduledAt: session.scheduled_at,
        duration: session.duration,
        topic: session.topic,
        notes: session.notes,
        status: session.status
      })) || [];
      
      // Sort sessions by date (upcoming first)
      const sortedSessions = sessionsList.sort((a, b) => 
        new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
      );
      
      setUpcomingSessions(sortedSessions);
      
      // Fetch pending mentorship requests
      const { data: requestsData, error: requestsError } = await supabase
        .from('mentorship_requests')
        .select('*, mentee:profiles(*)')
        .eq('mentor_id', mentorId)
        .eq('status', 'pending');
      
      // Transform the data to match our MentorshipRequest interface
      const requestsList = requestsData?.map((request: any) => ({
        id: request.id,
        menteeId: request.mentee_id,
        mentorId: request.mentor_id,
        status: request.status,
        requestedAt: request.requested_at,
        mentee: {
          id: request.mentee.id,
          name: request.mentee.name || request.mentee.full_name,
          email: request.mentee.email,
          profileImage: request.mentee.avatar_url,
          industry: request.mentee.industry,
          currentRole: request.mentee.current_role,
          targetRole: request.mentee.target_role,
          skills: request.mentee.skills
        }
      })) || [];
      
      setPendingRequests(requestsList);
      
      setLoading(false);
    } catch (err: any) {
      console.error('Error fetching mentor data:', err);
      setError(err.message || 'Failed to fetch mentor data');
      setLoading(false);
    }
  };

  // Handle accepting a mentorship request
  const handleAcceptRequest = async (requestId: string, menteeId: string) => {
    try {
      // Update request status to 'accepted'
      const { error: updateError } = await supabase
        .from('mentorship_requests')
        .update({ 
          status: 'accepted', 
          updated_at: new Date().toISOString() 
        })
        .eq('id', requestId);
      
      if (updateError) throw updateError;
      
      // Get current user ID (mentor ID)
      const { data: sessionData } = await supabase.auth.getSession();
      const mentorId = sessionData.session?.user?.id;
      
      if (!mentorId) {
        throw new Error('User not authenticated');
      }
      
      // Create new mentorship relationship
      const { error: insertError } = await supabase
        .from('mentorship_relationships')
        .insert({
          mentee_id: menteeId,
          mentor_id: mentorId,
          status: 'active',
          progress: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      
      if (insertError) throw insertError;
      
      // Update local state
      setPendingRequests(pendingRequests.filter(request => request.id !== requestId));
      
      // Refresh mentor data to update mentees list
      fetchMentorData();
      
    } catch (err: any) {
      console.error('Error accepting request:', err);
      setError(err.message || 'Failed to accept request');
    }
  };

  // Handle declining a mentorship request
  const handleDeclineRequest = async (requestId: string) => {
    try {
      // Update request status to 'rejected'
      const { error } = await supabase
        .from('mentorship_requests')
        .update({ 
          status: 'rejected', 
          updated_at: new Date().toISOString() 
        })
        .eq('id', requestId);
      
      if (error) throw error;
      
      // Update local state
      setPendingRequests(pendingRequests.filter(request => request.id !== requestId));
      
    } catch (err: any) {
      console.error('Error declining request:', err);
      setError(err.message || 'Failed to decline request');
    }
  };

  // Handle scheduling a new session
  const handleScheduleSession = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMenteeForSession) {
      setError('No mentee selected for session');
      return;
    }
    
    try {
      // Get current user ID (mentor ID)
      const { data: sessionData } = await supabase.auth.getSession();
      const mentorId = sessionData.session?.user?.id;
      
      if (!mentorId) {
        throw new Error('User not authenticated');
      }
      
      // Create new session
      const { error } = await supabase
        .from('mentorship_sessions')
        .insert({
          mentee_id: selectedMenteeForSession,
          mentor_id: mentorId,
          scheduled_at: sessionFormData.scheduledAt,
          duration: sessionFormData.duration,
          topic: sessionFormData.topic,
          notes: sessionFormData.notes,
          status: 'scheduled',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      
      if (error) throw error;
      
      // Reset form and close modal
      setSessionFormData({
        topic: '',
        scheduledAt: '',
        duration: 30,
        notes: ''
      });
      setShowScheduleModal(false);
      setSelectedMenteeForSession(null);
      
      // Refresh sessions data
      fetchMentorData();
      
    } catch (err: any) {
      console.error('Error scheduling session:', err);
      setError(err.message || 'Failed to schedule session');
    }
  };

  // Handle session status update (complete or cancel)
  const handleUpdateSessionStatus = async (sessionId: string, status: 'completed' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('mentorship_sessions')
        .update({
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', sessionId);
      
      if (error) throw error;
      
      // Update local state
      setUpcomingSessions(upcomingSessions.map(session => 
        session.id === sessionId ? { ...session, status } : session
      ));
      
    } catch (err: any) {
      console.error(`Error ${status === 'completed' ? 'completing' : 'cancelling'} session:`, err);
      setError(err.message || `Failed to ${status === 'completed' ? 'complete' : 'cancel'} session`);
    }
  };

  // Handle updating mentee progress
  const handleUpdateMenteeProgress = async (menteeId: string, progress: number) => {
    try {
      // Get current user ID (mentor ID)
      const { data: sessionData } = await supabase.auth.getSession();
      const mentorId = sessionData.session?.user?.id;
      
      if (!mentorId) {
        throw new Error('User not authenticated');
      }
      
      // Find the relationship record
      const { data: relationshipData, error: relationshipError } = await supabase
        .from('mentorship_relationships')
        .select('id')
        .eq('mentor_id', mentorId)
        .eq('mentee_id', menteeId);
      
      if (relationshipError) throw relationshipError;
      
      if (!relationshipData || relationshipData.length === 0) {
        throw new Error('Mentorship relationship not found');
      }
      
      const relationshipId = relationshipData[0].id;
      
      // Update progress
      const { error: updateError } = await supabase
        .from('mentorship_relationships')
        .update({
          progress,
          updated_at: new Date().toISOString()
        })
        .eq('id', relationshipId);
      
      if (updateError) throw updateError;
      
      // Update local state
      setMentees(mentees.map(mentee => 
        mentee.id === menteeId ? { ...mentee, progress } : mentee
      ));
      
      // If we're viewing a mentee profile, update that too
      if (selectedMentee && selectedMentee.id === menteeId) {
        setSelectedMentee({ ...selectedMentee, progress });
      }
      
    } catch (err: any) {
      console.error('Error updating mentee progress:', err);
      setError(err.message || 'Failed to update mentee progress');
    }
  };

  // Handle form input changes for session scheduling
  const handleSessionFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSessionFormData(prev => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value) : value
    }));
  };

  // Open schedule session modal for a specific mentee
  const openScheduleSessionModal = (menteeId: string) => {
    setSelectedMenteeForSession(menteeId);
    setShowScheduleModal(true);
  };

  // Render loading state
  if (loading) {
    return (
      <div className="mentor-dashboard loading">
        <div className="loading-spinner"></div>
        <p>Loading mentor dashboard...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="mentor-dashboard error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => {
          setError(null);
          fetchMentorData();
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
                <h3>Active Mentees</h3>
                <p className="stat-value">{mentees.filter(m => m.status === 'active').length}</p>
              </div>
              <div className="stat-card">
                <h3>Pending Requests</h3>
                <p className="stat-value">{pendingRequests.length}</p>
              </div>
              <div className="stat-card">
                <h3>Upcoming Sessions</h3>
                <p className="stat-value">{upcomingSessions.filter(s => s.status === 'scheduled').length}</p>
              </div>
              <div className="stat-card">
                <h3>Completed Sessions</h3>
                <p className="stat-value">{upcomingSessions.filter(s => s.status === 'completed').length}</p>
              </div>
            </div>
            
            <div className="upcoming-sessions">
              <h3>Next Sessions</h3>
              {upcomingSessions.filter(s => s.status === 'scheduled').slice(0, 3).map(session => (
                <div key={session.id} className="session-card">
                  <div className="session-header">
                    <h4>{session.topic}</h4>
                    <span className="session-date">
                      {new Date(session.scheduledAt).toLocaleDateString()} at {new Date(session.scheduledAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  <div className="session-details">
                    <p><strong>Mentee:</strong> {session.menteeName}</p>
                    <p><strong>Duration:</strong> {session.duration} minutes</p>
                    {session.notes && <p><strong>Notes:</strong> {session.notes}</p>}
                  </div>
                  <div className="session-actions">
                    <button 
                      className="btn-primary"
                      onClick={() => window.open(`https://meet.google.com/new`, '_blank')}
                    >
                      Join Session
                    </button>
                    <button 
                      className="btn-secondary"
                      onClick={() => handleUpdateSessionStatus(session.id, 'cancelled')}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
              {upcomingSessions.filter(s => s.status === 'scheduled').length === 0 && (
                <p className="no-data">No upcoming sessions scheduled.</p>
              )}
            </div>
            
            <div className="pending-requests">
              <h3>Pending Requests</h3>
              {pendingRequests.slice(0, 3).map(request => (
                <div key={request.id} className="request-card">
                  <div className="request-header">
                    <h4>{request.mentee.name}</h4>
                    <span className="request-role">{request.mentee.currentRole}</span>
                  </div>
                  <div className="request-actions">
                    <button 
                      className="btn-primary" 
                      onClick={() => handleAcceptRequest(request.id, request.menteeId)}
                    >
                      Accept
                    </button>
                    <button 
                      className="btn-secondary" 
                      onClick={() => handleDeclineRequest(request.id)}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
              {pendingRequests.length === 0 && (
                <p className="no-data">No pending mentorship requests.</p>
              )}
            </div>
          </div>
        );
        
      case 'mentees':
        return (
          <div className="mentees-list">
            <h3>Your Mentees</h3>
            {mentees.length > 0 ? (
              <div className="mentees-grid">
                {mentees.map(mentee => (
                  <div key={mentee.id} className="mentee-card">
                    <div className="mentee-header">
                      <div className="mentee-avatar">
                        {mentee.profileImage ? (
                          <img src={mentee.profileImage} alt={mentee.name} />
                        ) : (
                          <div className="avatar-placeholder">
                            {mentee.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="mentee-info">
                        <h4>{mentee.name}</h4>
                        <p className="mentee-role">{mentee.currentRole}</p>
                        <p className="mentee-goal">Goal: {mentee.targetRole || 'Not specified'}</p>
                      </div>
                      <div className="mentee-status">
                        <span className={`status-badge ${mentee.status}`}>
                          {mentee.status.charAt(0).toUpperCase() + mentee.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="mentee-progress">
                      <div className="progress-label">
                        <span>Progress</span>
                        <span>{mentee.progress || 0}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{width: `${mentee.progress || 0}%`}}
                        ></div>
                      </div>
                    </div>
                    <div className="mentee-skills">
                      <h5>Skills Focus</h5>
                      <div className="skills-tags">
                        {mentee.skills && mentee.skills.length > 0 ? (
                          mentee.skills.map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                          ))
                        ) : (
                          <span className="no-skills">No skills specified</span>
                        )}
                      </div>
                    </div>
                    <div className="mentee-actions">
                      <button 
                        className="btn-primary"
                        onClick={() => setSelectedMentee(mentee)}
                      >
                        View Profile
                      </button>
                      <button 
                        className="btn-secondary"
                        onClick={() => openScheduleSessionModal(mentee.id)}
                      >
                        Schedule Session
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">You don't have any mentees yet.</p>
            )}
          </div>
        );
        
      case 'sessions':
        return (
          <div className="sessions-list">
            <h3>Mentorship Sessions</h3>
            <div className="sessions-filter">
              <button className="filter-btn active">All Sessions</button>
              <button className="filter-btn">Upcoming</button>
              <button className="filter-btn">Completed</button>
              <button className="filter-btn">Cancelled</button>
            </div>
            
            {upcomingSessions.length > 0 ? (
              <div className="sessions-table">
                <div className="table-header">
                  <div className="col-date">Date & Time</div>
                  <div className="col-mentee">Mentee</div>
                  <div className="col-topic">Topic</div>
                  <div className="col-duration">Duration</div>
                  <div className="col-status">Status</div>
                  <div className="col-actions">Actions</div>
                </div>
                {upcomingSessions.map(session => (
                  <div key={session.id} className="table-row">
                    <div className="col-date">
                      <div className="date-primary">
                        {new Date(session.scheduledAt).toLocaleDateString()}
                      </div>
                      <div className="date-secondary">
                        {new Date(session.scheduledAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </div>
                    <div className="col-mentee">{session.menteeName}</div>
                    <div className="col-topic">{session.topic}</div>
                    <div className="col-duration">{session.duration} min</div>
                    <div className="col-status">
                      <span className={`status-badge ${session.status}`}>
                        {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                      </span>
                    </div>
                    <div className="col-actions">
                      {session.status === 'scheduled' && (
                        <>
                          <button 
                            className="btn-icon" 
                            title="Join Session"
                            onClick={() => window.open(`https://meet.google.com/new`, '_blank')}
                          >
                            📹
                          </button>
                          <button 
                            className="btn-icon" 
                            title="Mark as Completed"
                            onClick={() => handleUpdateSessionStatus(session.id, 'completed')}
                          >
                            ✓
                          </button>
                          <button 
                            className="btn-icon" 
                            title="Cancel"
                            onClick={() => handleUpdateSessionStatus(session.id, 'cancelled')}
                          >
                            ✕
                          </button>
                        </>
                      )}
                      {session.status === 'completed' && (
                        <button className="btn-icon" title="View Notes">
                          📝
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No sessions found.</p>
            )}
          </div>
        );
        
      case 'requests':
        return (
          <div className="requests-list">
            <h3>Mentorship Requests</h3>
            {pendingRequests.length > 0 ? (
              <div className="requests-container">
                {pendingRequests.map(request => (
                  <div key={request.id} className="request-card detailed">
                    <div className="request-header">
                      <div className="mentee-avatar">
                        {request.mentee.profileImage ? (
                          <img src={request.mentee.profileImage} alt={request.mentee.name} />
                        ) : (
                          <div className="avatar-placeholder">
                            {request.mentee.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="mentee-info">
                        <h4>{request.mentee.name}</h4>
                        <p className="mentee-email">{request.mentee.email}</p>
                        <p className="mentee-role">{request.mentee.currentRole}</p>
                      </div>
                    </div>
                    <div className="request-details">
                      <div className="detail-item">
                        <span className="detail-label">Industry:</span>
                        <span className="detail-value">{request.mentee.industry || 'Not specified'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Current Role:</span>
                        <span className="detail-value">{request.mentee.currentRole || 'Not specified'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Target Role:</span>
                        <span className="detail-value">{request.mentee.targetRole || 'Not specified'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Skills:</span>
                        <div className="skills-tags">
                          {request.mentee.skills && request.mentee.skills.length > 0 ? (
                            request.mentee.skills.map((skill, index) => (
                              <span key={index} className="skill-tag">{skill}</span>
                            ))
                          ) : (
                            <span className="no-skills">No skills specified</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="request-actions">
                      <button 
                        className="btn-primary" 
                        onClick={() => handleAcceptRequest(request.id, request.menteeId)}
                      >
                        Accept Request
                      </button>
                      <button 
                        className="btn-secondary" 
                        onClick={() => handleDeclineRequest(request.id)}
                      >
                        Decline Request
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No pending mentorship requests.</p>
            )}
          </div>
        );
        
      default:
        return <div>Select a tab to view content</div>;
    }
  };

  // Main dashboard render
  return (
    <div className="mentor-dashboard">
      <header className="dashboard-header">
        <h1>Mentor Dashboard</h1>
        <div className="user-profile">
          <span className="user-name">{mentorProfile?.name || mentorProfile?.full_name || 'Mentor'}</span>
          <div className="user-avatar">
            {mentorProfile?.avatar_url ? (
              <img src={mentorProfile.avatar_url} alt="Mentor" />
            ) : (
              <div className="avatar-placeholder">
                {(mentorProfile?.name || mentorProfile?.full_name || 'M').charAt(0)}
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
              className={activeTab === 'mentees' ? 'active' : ''} 
              onClick={() => setActiveTab('mentees')}
            >
              Mentees
            </button>
          </li>
          <li>
            <button 
              className={activeTab === 'sessions' ? 'active' : ''} 
              onClick={() => setActiveTab('sessions')}
            >
              Sessions
            </button>
          </li>
          <li>
            <button 
              className={activeTab === 'requests' ? 'active' : ''} 
              onClick={() => setActiveTab('requests')}
            >
              Requests
            </button>
          </li>
        </ul>
      </nav>
      
      <main className="dashboard-content">
        {renderContent()}
      </main>
      
      {/* Mentee Profile Modal */}
      {selectedMentee && (
        <div className="modal mentee-profile-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Mentee Profile</h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedMentee(null)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="profile-header">
                <div className="profile-avatar">
                  {selectedMentee.profileImage ? (
                    <img src={selectedMentee.profileImage} alt={selectedMentee.name} />
                  ) : (
                    <div className="avatar-placeholder">
                      {selectedMentee.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="profile-info">
                  <h3>{selectedMentee.name}</h3>
                  <p className="profile-email">{selectedMentee.email}</p>
                  <p className="profile-role">{selectedMentee.currentRole}</p>
                </div>
              </div>
              
              <div className="profile-details">
                <div className="detail-section">
                  <h4>Career Information</h4>
                  <div className="detail-item">
                    <span className="detail-label">Industry:</span>
                    <span className="detail-value">{selectedMentee.industry || 'Not specified'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Current Role:</span>
                    <span className="detail-value">{selectedMentee.currentRole || 'Not specified'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Target Role:</span>
                    <span className="detail-value">{selectedMentee.targetRole || 'Not specified'}</span>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Skills</h4>
                  <div className="skills-tags">
                    {selectedMentee.skills && selectedMentee.skills.length > 0 ? (
                      selectedMentee.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))
                    ) : (
                      <span className="no-skills">No skills specified</span>
                    )}
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Mentorship Progress</h4>
                  <div className="progress-bar large">
                    <div 
                      className="progress-fill" 
                      style={{width: `${selectedMentee.progress || 0}%`}}
                    ></div>
                    <span className="progress-text">{selectedMentee.progress || 0}%</span>
                  </div>
                  <div className="progress-update">
                    <label>Update Progress:</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={selectedMentee.progress || 0}
                      onChange={(e) => {
                        const newProgress = parseInt(e.target.value);
                        setSelectedMentee({...selectedMentee, progress: newProgress});
                      }}
                      onMouseUp={(e) => {
                        const newProgress = parseInt((e.target as HTMLInputElement).value);
                        handleUpdateMenteeProgress(selectedMentee.id, newProgress);
                      }}
                    />
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Activity</h4>
                  <div className="detail-item">
                    <span className="detail-label">Last Active:</span>
                    <span className="detail-value">
                      {selectedMentee.lastActive ? new Date(selectedMentee.lastActive).toLocaleDateString() : 'Never'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className={`status-badge ${selectedMentee.status}`}>
                      {selectedMentee.status.charAt(0).toUpperCase() + selectedMentee.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-primary"
                onClick={() => {
                  openScheduleSessionModal(selectedMentee.id);
                  setSelectedMentee(null);
                }}
              >
                Schedule Session
              </button>
              <button 
                className="btn-secondary"
                onClick={() => setSelectedMentee(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Schedule Session Modal */}
      {showScheduleModal && (
        <div className="modal schedule-session-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Schedule Mentorship Session</h2>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowScheduleModal(false);
                  setSelectedMenteeForSession(null);
                }}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleScheduleSession}>
                <div className="form-group">
                  <label htmlFor="topic">Session Topic</label>
                  <input
                    type="text"
                    id="topic"
                    name="topic"
                    value={sessionFormData.topic}
                    onChange={handleSessionFormChange}
                    required
                    placeholder="e.g., Career Planning, Technical Skills Review"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="scheduledAt">Date and Time</label>
                  <input
                    type="datetime-local"
                    id="scheduledAt"
                    name="scheduledAt"
                    value={sessionFormData.scheduledAt}
                    onChange={handleSessionFormChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="duration">Duration (minutes)</label>
                  <select
                    id="duration"
                    name="duration"
                    value={sessionFormData.duration}
                    onChange={handleSessionFormChange}
                    required
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="notes">Session Notes (Optional)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={sessionFormData.notes}
                    onChange={handleSessionFormChange}
                    placeholder="Add any preparation notes or agenda items"
                    rows={4}
                  ></textarea>
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="btn-primary">Schedule Session</button>
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => {
                      setShowScheduleModal(false);
                      setSelectedMenteeForSession(null);
                    }}
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

export default MentorDashboard;
