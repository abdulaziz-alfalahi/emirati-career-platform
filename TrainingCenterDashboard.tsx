import React from 'react';

const TrainingCenterDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Training Center Dashboard</h2>
        <p className="text-gray-600">Welcome to your training center dashboard. List your training programs and monitor engagement.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Training Programs */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Training Programs</h3>
          <p className="text-gray-600 mb-4">Manage and list your training programs.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Programs
          </button>
        </div>

        {/* Create New Program */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Create New Program</h3>
          <p className="text-gray-600 mb-4">Create a new training program with detailed information.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Create Program
          </button>
        </div>

        {/* Enrollment Management */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Enrollment Management</h3>
          <p className="text-gray-600 mb-4">Manage participant enrollments in your programs.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Enrollments
          </button>
        </div>

        {/* Participant Tracking */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Participant Tracking</h3>
          <p className="text-gray-600 mb-4">Monitor participant progress and completion rates.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Track Participants
          </button>
        </div>

        {/* Certification Management */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Certification Management</h3>
          <p className="text-gray-600 mb-4">Manage and issue certificates for completed programs.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Certificates
          </button>
        </div>

        {/* Instructor Management */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Instructor Management</h3>
          <p className="text-gray-600 mb-4">Manage instructors and assign them to programs.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Instructors
          </button>
        </div>

        {/* Schedule Management */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Schedule Management</h3>
          <p className="text-gray-600 mb-4">Manage program schedules and session timings.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Schedules
          </button>
        </div>

        {/* Resource Management */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Resource Management</h3>
          <p className="text-gray-600 mb-4">Manage training materials and resources.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Resources
          </button>
        </div>

        {/* Analytics & Reports */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Analytics & Reports</h3>
          <p className="text-gray-600 mb-4">View program analytics and generate reports.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingCenterDashboard;
