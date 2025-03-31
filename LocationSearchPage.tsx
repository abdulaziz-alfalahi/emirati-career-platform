import React from 'react';
import { useNavigate } from 'react-router-dom';
import LocationSearchComponent from '../components/map/LocationSearchComponent';
import '../../styles/theme.css';

const LocationSearchPage: React.FC = () => {
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
      
      <LocationSearchComponent />
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-bold text-primary mb-4">Location-Based Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-beige-light p-4 rounded-lg">
            <h3 className="font-semibold text-highlight mb-2">Commute Preferences</h3>
            <p className="text-gray-700">Find job opportunities that match your preferred commute distance and location preferences.</p>
          </div>
          
          <div className="bg-beige-light p-4 rounded-lg">
            <h3 className="font-semibold text-highlight mb-2">Educational Institutions</h3>
            <p className="text-gray-700">Discover universities, colleges, and schools in your area offering programs aligned with your career goals.</p>
          </div>
          
          <div className="bg-beige-light p-4 rounded-lg">
            <h3 className="font-semibold text-highlight mb-2">Training Resources</h3>
            <p className="text-gray-700">Locate nearby training centers and assessment facilities to enhance your skills and certifications.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-bold text-primary mb-4">Remote Work Opportunities</h2>
        <p className="text-gray-700 mb-4">
          Not all opportunities require physical presence. Explore remote work options that allow you to work from anywhere in the UAE.
        </p>
        <button className="btn-primary">Explore Remote Jobs</button>
      </div>
    </div>
  );
};

export default LocationSearchPage;
