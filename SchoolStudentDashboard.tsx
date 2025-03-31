import React from 'react';
import '../../styles/theme.css';

const SchoolStudentDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-primary mb-4">School Student Dashboard</h2>
        <p className="text-gray-600">Welcome to your personalized school student dashboard. Access resources and opportunities tailored for your educational journey.</p>
      </div>

      <div className="relative">
        {/* Arabesque pattern background */}
        <div className="absolute inset-0 arabesque-floral" style={{ opacity: 0.1 }}></div>
        
        {/* Career Pathway Visualization */}
        <div className="bg-beige shadow-sm rounded-lg p-6 mb-6 relative">
          <h3 className="text-lg font-semibold text-primary mb-3">Career Pathway Visualization</h3>
          <div className="flex items-center justify-between py-4">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-highlight" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">Education</span>
            </div>
            
            <div className="flex-1 h-1 bg-highlight mx-4"></div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-highlight" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">University</span>
            </div>
            
            <div className="flex-1 h-1 bg-highlight mx-4"></div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-highlight" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">Career</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Workshops */}
          <div className="card">
            <h3 className="text-lg font-semibold text-primary mb-3">Workshops</h3>
            <p className="text-gray-600 mb-4">Explore workshops to enhance your skills and knowledge.</p>
            <button className="btn-primary">
              Browse Workshops
            </button>
          </div>

          {/* Summer Knowledge Camps */}
          <div className="card card-accent">
            <h3 className="text-lg font-semibold text-accent mb-3">Summer Knowledge Camps</h3>
            <p className="text-gray-600 mb-4">Discover exciting summer camps to expand your horizons.</p>
            <button className="btn-primary">
              Explore Camps
            </button>
          </div>

          {/* School Grades and Reports */}
          <div className="card">
            <h3 className="text-lg font-semibold text-primary mb-3">Grades & Reports</h3>
            <p className="text-gray-600 mb-4">View your academic performance and progress reports.</p>
            <div className="bg-beige-light p-3 rounded-md mb-4">
              <div className="flex justify-between mb-2">
                <span>Mathematics</span>
                <span className="font-semibold">A</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Science</span>
                <span className="font-semibold">B+</span>
              </div>
              <div className="flex justify-between">
                <span>English</span>
                <span className="font-semibold">A-</span>
              </div>
            </div>
            <button className="btn-primary">
              View Reports
            </button>
          </div>

          {/* Mentors */}
          <div className="card">
            <h3 className="text-lg font-semibold text-primary mb-3">Mentors</h3>
            <p className="text-gray-600 mb-4">Connect with mentors who can guide your educational journey.</p>
            <button className="btn-primary">
              Find Mentors
            </button>
          </div>

          {/* Training Programs */}
          <div className="card">
            <h3 className="text-lg font-semibold text-primary mb-3">Training Programs</h3>
            <p className="text-gray-600 mb-4">Participate in training programs to develop new skills.</p>
            <button className="btn-primary">
              Browse Programs
            </button>
          </div>

          {/* Assessments */}
          <div className="card">
            <h3 className="text-lg font-semibold text-primary mb-3">Assessments</h3>
            <p className="text-gray-600 mb-4">Take assessments to discover your strengths and areas for growth.</p>
            <button className="btn-primary">
              Take Assessments
            </button>
          </div>

          {/* Scholarship Opportunities */}
          <div className="card card-highlight">
            <h3 className="text-lg font-semibold text-highlight mb-3">Scholarships</h3>
            <p className="text-gray-600 mb-4">Explore scholarship opportunities for your future education.</p>
            <button className="btn-secondary">
              Find Scholarships
            </button>
          </div>

          {/* Gig Work */}
          <div className="card">
            <h3 className="text-lg font-semibold text-primary mb-3">Gig Work</h3>
            <p className="text-gray-600 mb-4">Discover age-appropriate gig opportunities to gain experience.</p>
            <button className="btn-primary">
              Explore Opportunities
            </button>
          </div>

          {/* Career Pathway */}
          <div className="card">
            <h3 className="text-lg font-semibold text-primary mb-3">Career Pathway</h3>
            <p className="text-gray-600 mb-4">Visualize potential career paths based on your interests and strengths.</p>
            <button className="btn-primary">
              View Pathways
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolStudentDashboard;
