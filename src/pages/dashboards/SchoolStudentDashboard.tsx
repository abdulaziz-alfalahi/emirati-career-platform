import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';

export default function SchoolStudentDashboard() {
  return (
    <DashboardLayout>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#007A3D' }}>School Student Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {/* Academic Performance Card */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#007A3D' }}>Academic Performance</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Mathematics</span>
            <span style={{ fontWeight: 'bold' }}>92%</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Science</span>
            <span style={{ fontWeight: 'bold' }}>88%</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>English</span>
            <span style={{ fontWeight: 'bold' }}>95%</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Arabic</span>
            <span style={{ fontWeight: 'bold' }}>90%</span>
          </div>
          <button style={{ marginTop: '1rem', backgroundColor: '#007A3D', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer' }}>
            View Full Report
          </button>
        </div>
        
        {/* Career Exploration Card */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#007A3D' }}>Career Exploration</h2>
          <p>Based on your interests and academic performance, explore these career paths:</p>
          <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
            <li>Engineering</li>
            <li>Medicine</li>
            <li>Computer Science</li>
            <li>Business Administration</li>
          </ul>
          <button style={{ marginTop: '1rem', backgroundColor: '#007A3D', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer' }}>
            Take Career Assessment
          </button>
        </div>
        
        {/* Upcoming Workshops Card */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#007A3D' }}>Upcoming Workshops</h2>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 'bold' }}>Robotics Workshop</h3>
            <p>April 15, 2025 | 10:00 AM - 12:00 PM</p>
            <p>Dubai Knowledge Park</p>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 'bold' }}>Coding for Beginners</h3>
            <p>April 22, 2025 | 2:00 PM - 4:00 PM</p>
            <p>Online</p>
          </div>
          <button style={{ marginTop: '1rem', backgroundColor: '#007A3D', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer' }}>
            Register Now
          </button>
        </div>
        
        {/* Summer Programs Card */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#007A3D' }}>Summer Programs</h2>
          <p>Explore these summer programs to enhance your skills:</p>
          <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
            <li>STEM Summer Camp</li>
            <li>Leadership Development Program</li>
            <li>Entrepreneurship for Youth</li>
            <li>Creative Arts Workshop</li>
          </ul>
          <button style={{ marginTop: '1rem', backgroundColor: '#007A3D', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer' }}>
            Browse Programs
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
