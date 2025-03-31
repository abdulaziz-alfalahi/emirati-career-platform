import React from 'react';
import { useNavigate } from 'react-router-dom';
import ResumeParsingComponent from '../components/resume/ResumeParsingComponent';
import '../../styles/theme.css';

const ResumePage: React.FC = () => {
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
      
      <ResumeParsingComponent />
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-bold text-primary mb-4">Resume Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-highlight mb-2">Best Practices</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Keep your resume concise and relevant</li>
              <li>Tailor your resume for each job application</li>
              <li>Highlight achievements rather than just responsibilities</li>
              <li>Use action verbs to describe your experience</li>
              <li>Include keywords from the job description</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-highlight mb-2">Common Mistakes to Avoid</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Typos and grammatical errors</li>
              <li>Including irrelevant information</li>
              <li>Using generic statements without specifics</li>
              <li>Inconsistent formatting</li>
              <li>Outdated or irrelevant contact information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
