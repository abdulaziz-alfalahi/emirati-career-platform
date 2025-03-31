import React from 'react';

const EducationalInstitutionDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Educational Institution Dashboard</h2>
        <p className="text-gray-600">Welcome to your educational institution dashboard. Manage student records, upload grades, and track academic progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Student Records */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Student Records</h3>
          <p className="text-gray-600 mb-4">View and manage student profiles and academic records.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Records
          </button>
        </div>

        {/* Upload Grades */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Upload Grades</h3>
          <p className="text-gray-600 mb-4">Upload and manage student grades and academic reports.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Upload Grades
          </button>
        </div>

        {/* Track Students */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Student Tracking</h3>
          <p className="text-gray-600 mb-4">Monitor student progress and academic achievements.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Track Students
          </button>
        </div>

        {/* Scholarship Opportunities */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Scholarships</h3>
          <p className="text-gray-600 mb-4">Manage and list scholarship opportunities for students.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Scholarships
          </button>
        </div>

        {/* Apprenticeship Opportunities */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Apprenticeships</h3>
          <p className="text-gray-600 mb-4">Manage apprenticeship opportunities for students.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Apprenticeships
          </button>
        </div>

        {/* Internship Tracking */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Internship Tracking</h3>
          <p className="text-gray-600 mb-4">Monitor student internship progress and performance.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Track Internships
          </button>
        </div>

        {/* Academic Calendar */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Academic Calendar</h3>
          <p className="text-gray-600 mb-4">Manage academic calendar and important events.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View Calendar
          </button>
        </div>

        {/* Course Management */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Course Management</h3>
          <p className="text-gray-600 mb-4">Manage courses, curriculum, and academic programs.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Manage Courses
          </button>
        </div>

        {/* Analytics & Reports */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Analytics & Reports</h3>
          <p className="text-gray-600 mb-4">View academic analytics and generate reports.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationalInstitutionDashboard;
