import React from 'react';

const ParentDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Parent Dashboard</h2>
        <p className="text-gray-600">Welcome to your parent dashboard. Access resources to help your children make the right decisions and leverage platform resources.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Children Profiles */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Children Profiles</h3>
          <p className="text-gray-600 mb-4">View and manage your children's profiles and academic progress.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View Profiles
          </button>
        </div>

        {/* Academic Performance */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Academic Performance</h3>
          <p className="text-gray-600 mb-4">Monitor your children's grades, reports, and academic achievements.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View Performance
          </button>
        </div>

        {/* Educational Resources */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Educational Resources</h3>
          <p className="text-gray-600 mb-4">Access resources to support your children's education.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Browse Resources
          </button>
        </div>

        {/* Career Guidance */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Career Guidance</h3>
          <p className="text-gray-600 mb-4">Help your children explore potential career paths and opportunities.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Explore Careers
          </button>
        </div>

        {/* Workshops and Events */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Workshops & Events</h3>
          <p className="text-gray-600 mb-4">Discover workshops and events for both parents and children.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View Calendar
          </button>
        </div>

        {/* Scholarship Opportunities */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Scholarships</h3>
          <p className="text-gray-600 mb-4">Find scholarship opportunities for your children's education.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Find Scholarships
          </button>
        </div>

        {/* Summer Camps */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Summer Camps</h3>
          <p className="text-gray-600 mb-4">Explore summer knowledge camps for your children.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Browse Camps
          </button>
        </div>

        {/* Mentorship Programs */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Mentorship</h3>
          <p className="text-gray-600 mb-4">Connect your children with mentors in their areas of interest.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Find Mentors
          </button>
        </div>

        {/* Parent Community */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Parent Community</h3>
          <p className="text-gray-600 mb-4">Connect with other parents to share experiences and advice.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Join Community
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
