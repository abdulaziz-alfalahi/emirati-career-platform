import React from 'react';
import { useNavigate } from 'react-router-dom';
import LinkedInIntegrationComponent from '../components/linkedin/LinkedInIntegrationComponent';
import '../../styles/theme.css';

const LinkedInIntegrationPage: React.FC = () => {
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
      
      <LinkedInIntegrationComponent />
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-bold text-primary mb-4">Benefits of LinkedIn Integration</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-beige-light p-4 rounded-lg">
            <h3 className="font-semibold text-highlight mb-2">Enhanced Profile</h3>
            <p className="text-gray-700">Import your professional information to create a comprehensive profile that showcases your skills and experience.</p>
          </div>
          
          <div className="bg-beige-light p-4 rounded-lg">
            <h3 className="font-semibold text-highlight mb-2">Better Job Matches</h3>
            <p className="text-gray-700">Get more accurate job recommendations based on your LinkedIn skills, experience, and connections.</p>
          </div>
          
          <div className="bg-beige-light p-4 rounded-lg">
            <h3 className="font-semibold text-highlight mb-2">Professional Network</h3>
            <p className="text-gray-700">Leverage your professional network to discover new opportunities and connect with potential employers.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-bold text-primary mb-4">Privacy Information</h2>
        <p className="text-gray-700 mb-4">
          We value your privacy and only use your LinkedIn data to enhance your experience on the Emirati Career Journey Platform. 
          Your information is never shared with third parties without your explicit consent.
        </p>
        <div className="bg-beige-light p-4 rounded-lg">
          <h3 className="font-semibold text-highlight mb-2">Data Usage</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Your LinkedIn profile information is used to populate your resume and profile</li>
            <li>Your skills and experience help generate more accurate career recommendations</li>
            <li>Your education and work history improve job matching algorithms</li>
            <li>You can delete imported LinkedIn data from your profile at any time</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LinkedInIntegrationPage;
