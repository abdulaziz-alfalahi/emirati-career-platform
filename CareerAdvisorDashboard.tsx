import React from 'react';

const CareerAdvisorDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Career Advisor Dashboard</h2>
        <p className="text-gray-600">Welcome to your career advisor dashboard. Interact with advisees and provide professional career guidance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Advisee Management */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">My Advisees</h3>
          <p className="text-gray-600 mb-4">View and manage your current advisees.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Advisees
          </button>
        </div>

        {/* Advisory Sessions */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Advisory Sessions</h3>
          <p className="text-gray-600 mb-4">Schedule and manage career advisory sessions.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Sessions
          </button>
        </div>

        {/* Career Assessments */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Career Assessments</h3>
          <p className="text-gray-600 mb-4">Administer and review career assessments.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Assessments
          </button>
        </div>

        {/* Career Pathways */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Career Pathways</h3>
          <p className="text-gray-600 mb-4">Create and visualize career pathways for advisees.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Pathways
          </button>
        </div>

        {/* Job Market Insights */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Job Market Insights</h3>
          <p className="text-gray-600 mb-4">Access job market trends and industry insights.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View Insights
          </button>
        </div>

        {/* Resource Library */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Resource Library</h3>
          <p className="text-gray-600 mb-4">Access career advisory resources and materials.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Browse Resources
          </button>
        </div>

        {/* Video Conferencing */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Video Conferencing</h3>
          <p className="text-gray-600 mb-4">Conduct online advisory sessions with your advisees.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Start Session
          </button>
        </div>

        {/* Resume Review */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Resume Review</h3>
          <p className="text-gray-600 mb-4">Review and provide feedback on advisee resumes.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Review Resumes
          </button>
        </div>

        {/* Analytics & Reports */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Analytics & Reports</h3>
          <p className="text-gray-600 mb-4">View advisory analytics and generate reports.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerAdvisorDashboard;
