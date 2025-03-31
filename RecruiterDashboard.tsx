import React from 'react';

const RecruiterDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Private Sector Recruiter Dashboard</h2>
        <p className="text-gray-600">Welcome to your recruiter dashboard. Manage job listings, find candidates, and streamline your recruitment process.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Job Listings */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Job Listings</h3>
          <p className="text-gray-600 mb-4">Manage your full-time, part-time, and gig work listings.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Listings
          </button>
        </div>

        {/* Post New Job */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Post New Job</h3>
          <p className="text-gray-600 mb-4">Create a new job listing with detailed requirements.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Create Listing
          </button>
        </div>

        {/* Internship Opportunities */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Internships</h3>
          <p className="text-gray-600 mb-4">Manage and post internship opportunities.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Internships
          </button>
        </div>

        {/* Scholarship Programs */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Scholarships</h3>
          <p className="text-gray-600 mb-4">Manage scholarship opportunities offered by your organization.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Scholarships
          </button>
        </div>

        {/* Candidate Search */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Candidate Search</h3>
          <p className="text-gray-600 mb-4">Find the best matching candidates through AI matching capabilities.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Search Candidates
          </button>
        </div>

        {/* Applications */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Applications</h3>
          <p className="text-gray-600 mb-4">Review and manage applications for your job listings.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View Applications
          </button>
        </div>

        {/* Interviews */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Interviews</h3>
          <p className="text-gray-600 mb-4">Schedule and conduct video conferencing online interviews.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Interviews
          </button>
        </div>

        {/* Candidate Feedback */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Candidate Feedback</h3>
          <p className="text-gray-600 mb-4">Provide detailed feedback on interview outcomes.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Submit Feedback
          </button>
        </div>

        {/* Analytics */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Recruitment Analytics</h3>
          <p className="text-gray-600 mb-4">View analytics and insights about your recruitment process.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
