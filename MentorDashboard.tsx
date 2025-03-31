import React from 'react';

const MentorDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Mentor/Coach Dashboard</h2>
        <p className="text-gray-600">Welcome to your mentor dashboard. Interact with mentees and access platform resources to provide effective guidance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Mentee Management */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">My Mentees</h3>
          <p className="text-gray-600 mb-4">View and manage your current mentees.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Mentees
          </button>
        </div>

        {/* Session Management */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Mentoring Sessions</h3>
          <p className="text-gray-600 mb-4">Schedule and manage mentoring sessions.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Sessions
          </button>
        </div>

        {/* Mentee Progress */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Mentee Progress</h3>
          <p className="text-gray-600 mb-4">Track and document mentee progress and achievements.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View Progress
          </button>
        </div>

        {/* Resource Library */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Resource Library</h3>
          <p className="text-gray-600 mb-4">Access mentoring resources and materials.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Browse Resources
          </button>
        </div>

        {/* Mentee Matching */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Mentee Matching</h3>
          <p className="text-gray-600 mb-4">View potential mentees that match your expertise.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View Matches
          </button>
        </div>

        {/* Video Conferencing */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Video Conferencing</h3>
          <p className="text-gray-600 mb-4">Conduct online mentoring sessions with your mentees.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Start Session
          </button>
        </div>

        {/* Feedback Management */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Feedback Management</h3>
          <p className="text-gray-600 mb-4">Provide and manage feedback for your mentees.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Feedback
          </button>
        </div>

        {/* Development Plans */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Development Plans</h3>
          <p className="text-gray-600 mb-4">Create and manage development plans for mentees.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Plans
          </button>
        </div>

        {/* Analytics & Reports */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Analytics & Reports</h3>
          <p className="text-gray-600 mb-4">View mentoring analytics and generate reports.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
