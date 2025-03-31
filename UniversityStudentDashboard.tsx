import React from 'react';

const UniversityStudentDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">University Student Dashboard</h2>
        <p className="text-gray-600">Welcome to your personalized university student dashboard. Access resources and opportunities tailored for your higher education journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Workshops */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Workshops</h3>
          <p className="text-gray-600 mb-4">Enhance your skills with specialized workshops.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Browse Workshops
          </button>
        </div>

        {/* Internship Opportunities */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Internships</h3>
          <p className="text-gray-600 mb-4">Find internship opportunities related to your field of study.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Explore Internships
          </button>
        </div>

        {/* Part-time Jobs */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Part-time Jobs</h3>
          <p className="text-gray-600 mb-4">Discover part-time employment opportunities that fit your schedule.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Find Jobs
          </button>
        </div>

        {/* Gig Work */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Gig Work</h3>
          <p className="text-gray-600 mb-4">Explore flexible gig opportunities to earn while studying.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Browse Gigs
          </button>
        </div>

        {/* University Grades and Reports */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Grades & Reports</h3>
          <p className="text-gray-600 mb-4">Access your academic records and performance reports.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View Reports
          </button>
        </div>

        {/* Training Programs */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Training Programs</h3>
          <p className="text-gray-600 mb-4">Enhance your skills with specialized training programs.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Browse Programs
          </button>
        </div>

        {/* Assessments */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Assessments</h3>
          <p className="text-gray-600 mb-4">Take assessments to identify your strengths and career fit.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Take Assessments
          </button>
        </div>

        {/* Scholarship Opportunities */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Scholarships</h3>
          <p className="text-gray-600 mb-4">Find scholarships to support your education and research.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Find Scholarships
          </button>
        </div>

        {/* Mentors */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Mentors</h3>
          <p className="text-gray-600 mb-4">Connect with industry professionals and academic mentors.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Find Mentors
          </button>
        </div>

        {/* Career Advisors */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Career Advisors</h3>
          <p className="text-gray-600 mb-4">Get guidance from career advisors to plan your professional future.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Book Advisor
          </button>
        </div>

        {/* Resume Builder */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Resume Builder</h3>
          <p className="text-gray-600 mb-4">Create and update your professional resume.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Build Resume
          </button>
        </div>

        {/* Career Pathway */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Career Pathway</h3>
          <p className="text-gray-600 mb-4">Visualize potential career paths based on your degree and interests.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View Pathways
          </button>
        </div>
      </div>
    </div>
  );
};

export default UniversityStudentDashboard;
