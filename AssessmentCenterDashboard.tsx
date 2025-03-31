import React from 'react';

const AssessmentCenterDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Assessment Center Dashboard</h2>
        <p className="text-gray-600">Welcome to your assessment center dashboard. List your assessment programs and monitor engagement.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Assessment Programs */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Assessment Programs</h3>
          <p className="text-gray-600 mb-4">Manage and list your assessment programs.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Programs
          </button>
        </div>

        {/* Create New Assessment */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Create New Assessment</h3>
          <p className="text-gray-600 mb-4">Create a new assessment program (psychometric, IQ, EQ, functional).</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Create Assessment
          </button>
        </div>

        {/* Participant Management */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Participant Management</h3>
          <p className="text-gray-600 mb-4">Manage participants taking your assessments.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Participants
          </button>
        </div>

        {/* Results Management */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Results Management</h3>
          <p className="text-gray-600 mb-4">View and manage assessment results and reports.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Results
          </button>
        </div>

        {/* Feedback Management */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Feedback Management</h3>
          <p className="text-gray-600 mb-4">Provide and manage feedback for assessment participants.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Feedback
          </button>
        </div>

        {/* Assessment Templates */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Assessment Templates</h3>
          <p className="text-gray-600 mb-4">Manage and create assessment templates.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Templates
          </button>
        </div>

        {/* Question Bank */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Question Bank</h3>
          <p className="text-gray-600 mb-4">Manage assessment questions and categories.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Questions
          </button>
        </div>

        {/* Schedule Management */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Schedule Management</h3>
          <p className="text-gray-600 mb-4">Manage assessment schedules and sessions.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Schedules
          </button>
        </div>

        {/* Analytics & Reports */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Analytics & Reports</h3>
          <p className="text-gray-600 mb-4">View assessment analytics and generate reports.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentCenterDashboard;
