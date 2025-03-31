import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';

export default function JobseekerDashboard() {
  return (
    <DashboardLayout>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#007A3D' }}>Jobseeker Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {/* Job Recommendations Card */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#007A3D' }}>Job Recommendations</h2>
          <p>Based on your profile, we've found 15 job matches for you.</p>
          <button style={{ marginTop: '1rem', backgroundColor: '#007A3D', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer' }}>
            View Jobs
          </button>
        </div>
        
        {/* Resume Completion Card */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#007A3D' }}>Resume Completion</h2>
          <div style={{ height: '0.5rem', backgroundColor: '#E0E0E0', borderRadius: '9999px', marginBottom: '0.5rem' }}>
            <div style={{ width: '75%', height: '100%', backgroundColor: '#007A3D', borderRadius: '9999px' }}></div>
          </div>
          <p>Your resume is 75% complete. Add more details to improve your matches.</p>
          <button style={{ marginTop: '1rem', backgroundColor: '#007A3D', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer' }}>
            Complete Resume
          </button>
        </div>
        
        {/* Skills Gap Card */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#007A3D' }}>Skills Gap Analysis</h2>
          <p>We've identified 3 key skills you should develop to improve your job prospects.</p>
          <button style={{ marginTop: '1rem', backgroundColor: '#007A3D', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer' }}>
            View Skills
          </button>
        </div>
        
        {/* Upcoming Interviews Card */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#007A3D' }}>Upcoming Interviews</h2>
          <p>You have 2 upcoming interviews scheduled this week.</p>
          <button style={{ marginTop: '1rem', backgroundColor: '#007A3D', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer' }}>
            View Schedule
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
