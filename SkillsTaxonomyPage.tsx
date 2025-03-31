import React from 'react';
import { useNavigate } from 'react-router-dom';
import SkillsTaxonomyComponent from '../components/skills/SkillsTaxonomyComponent';
import '../../styles/theme.css';

const SkillsTaxonomyPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-primary hover:text-green-dark transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Dashboard
        </button>
      </div>
      
      <SkillsTaxonomyComponent />
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-bold text-primary mb-4">Why Skills Matter</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-beige-light p-4 rounded-lg">
            <h3 className="font-semibold text-highlight mb-2">Better Job Matching</h3>
            <p className="text-gray-700">A comprehensive skills profile helps match you with the most suitable job opportunities in the UAE market.</p>
          </div>
          
          <div className="bg-beige-light p-4 rounded-lg">
            <h3 className="font-semibold text-highlight mb-2">Career Development</h3>
            <p className="text-gray-700">Identify skill gaps and growth opportunities to advance your career in your chosen field.</p>
          </div>
          
          <div className="bg-beige-light p-4 rounded-lg">
            <h3 className="font-semibold text-highlight mb-2">Industry Insights</h3>
            <p className="text-gray-700">Understand which skills are in demand and growing in the UAE job market to stay competitive.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-bold text-primary mb-4">Skills Development Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-highlight mb-2">UAE Training Programs</h3>
            <p className="text-gray-700 mb-3">Access government-sponsored training programs designed to enhance Emirati workforce skills.</p>
            <button className="btn-primary text-sm">Explore Programs</button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-highlight mb-2">Online Learning Platforms</h3>
            <p className="text-gray-700 mb-3">Discover online courses and certifications to develop your skills at your own pace.</p>
            <button className="btn-primary text-sm">Browse Courses</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsTaxonomyPage;
