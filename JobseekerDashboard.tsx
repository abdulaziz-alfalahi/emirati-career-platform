import React from 'react';
import '../../styles/theme.css';

const JobseekerDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-primary mb-4">Jobseeker Dashboard</h2>
        <p className="text-gray-600">Welcome to your jobseeker dashboard. Build your resume, find job opportunities, and track your applications.</p>
      </div>

      <div className="relative">
        {/* Arabesque pattern background */}
        <div className="absolute inset-0 arabesque-geometric" style={{ opacity: 0.1 }}></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Map with location radius */}
          <div className="md:col-span-2 bg-white shadow-sm rounded-lg p-6 relative">
            <h3 className="text-lg font-semibold text-primary mb-3">Job Location Preferences</h3>
            <div className="bg-gray-100 rounded-lg h-64 relative overflow-hidden">
              {/* This would be replaced with actual Mapbox integration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-4 border-accent opacity-30"></div>
                <div className="absolute w-4 h-4 bg-accent rounded-full"></div>
                <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-md shadow-sm text-sm">
                  <span className="font-semibold text-accent">Dubai</span>
                  <span className="text-gray-500 ml-2">30km radius</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-600 mb-2">Set your preferred job location and commute distance.</p>
              <button className="btn-primary">Update Location</button>
            </div>
          </div>

          {/* Job Recommendations */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold text-primary mb-3">Job Recommendations</h3>
            <div className="space-y-3">
              <div className="border-l-4 border-highlight p-3 bg-beige-light rounded-r-md">
                <div className="font-medium">Marketing Specialist</div>
                <div className="text-sm text-gray-600">Full-Time, Dubai</div>
                <div className="text-sm text-gray-500">15km away</div>
                <button className="btn-secondary text-sm mt-2 px-3 py-1">Apply</button>
              </div>
              <div className="border-l-4 border-highlight p-3 bg-beige-light rounded-r-md">
                <div className="font-medium">Data Analyst</div>
                <div className="text-sm text-gray-600">Part-Time, Abu Dhabi</div>
                <div className="text-sm text-gray-500">25km away</div>
                <button className="btn-secondary text-sm mt-2 px-3 py-1">Apply</button>
              </div>
              <div className="border-l-4 border-highlight p-3 bg-beige-light rounded-r-md">
                <div className="font-medium">UX Designer</div>
                <div className="text-sm text-gray-600">Freelance, Remote</div>
                <div className="text-sm text-gray-500">Work from home</div>
                <button className="btn-secondary text-sm mt-2 px-3 py-1">Apply</button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Resume Builder */}
          <div className="card card-highlight">
            <h3 className="text-lg font-semibold text-primary mb-3">Resume Builder</h3>
            <p className="text-gray-600 mb-4">Create or update your professional resume.</p>
            <div className="flex space-x-2">
              <button className="btn-primary flex-1">Build Resume</button>
              <button className="btn-secondary px-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Upload Resume */}
          <div className="card">
            <h3 className="text-lg font-semibold text-primary mb-3">Upload Resume</h3>
            <p className="text-gray-600 mb-4">Upload an existing resume or import from LinkedIn.</p>
            <div className="flex flex-col space-y-2">
              <button className="btn-primary">Upload File</button>
              <button className="btn-accent flex items-center justify-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                Import from LinkedIn
              </button>
            </div>
          </div>

          {/* Application Tracking */}
          <div className="card">
            <h3 className="text-lg font-semibold text-primary mb-3">Application Tracking</h3>
            <p className="text-gray-600 mb-4">Track the status of all your job applications.</p>
            <div className="bg-beige-light p-3 rounded-md mb-4">
              <div className="text-sm font-medium mb-2">Applications Status</div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Submitted</span>
                <span className="text-sm font-semibold">12</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div className="bg-highlight h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Under Review</span>
                <span className="text-sm font-semibold">5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div className="bg-highlight h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Interview Stage</span>
                <span className="text-sm font-semibold">3</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-highlight h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            <button className="btn-primary">View Applications</button>
          </div>

          {/* Interviews */}
          <div className="card">
            <h3 className="text-lg font-semibold text-primary mb-3">Interviews</h3>
            <p className="text-gray-600 mb-4">Manage your scheduled interviews and prepare for them.</p>
            <div className="bg-beige-light p-3 rounded-md mb-4">
              <div className="font-medium">Upcoming Interviews</div>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Emirates Group</div>
                    <div className="text-sm text-gray-600">April 5, 2025 • 10:00 AM</div>
                  </div>
                  <button className="btn-secondary text-sm px-3 py-1">Prepare</button>
                </div>
                <div className="divider my-2"></div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Dubai Future Foundation</div>
                    <div className="text-sm text-gray-600">April 8, 2025 • 2:30 PM</div>
                  </div>
                  <button className="btn-secondary text-sm px-3 py-1">Prepare</button>
                </div>
              </div>
            </div>
            <button className="btn-primary">Manage Interviews</button>
          </div>

          {/* Skill Development */}
          <div className="card">
            <h3 className="text-lg font-semibold text-primary mb-3">Skill Development</h3>
            <p className="text-gray-600 mb-4">Identify skill gaps and find training opportunities.</p>
            <button className="btn-primary">Develop Skills</button>
          </div>

          {/* Career Pathway */}
          <div className="card">
            <h3 className="text-lg font-semibold text-primary mb-3">Career Pathway</h3>
            <p className="text-gray-600 mb-4">Visualize potential career paths based on your profile.</p>
            <button className="btn-primary">View Pathways</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobseekerDashboard;
